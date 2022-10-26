from unittest import result
import psycopg2
import os
import json
import numpy as np
import pandas as pd
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, Column, Integer, String
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin


#################################################
# Database Setup # -------> MAKE SURE the AWS database is set up locally first! <-----------------
#################################################
engine = create_engine("postgresql://krishna:London2022@groupcv2.ci6szv7owa4r.us-east-1.rds.amazonaws.com/groupc?options= -c search_path=dbo,public")
#engine = create_engine("postgresql://postgres:sydney20@localhost/ds_salaries")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
ds_salaries = Base.classes.ds_salaries

#ds_salariesv1 = Base.classes.ds_salariesv1

# This is how we would have made the table 
# If the table is already created this part stay commented out

# Create ds_salaries Table in database
# engine.execute("CREATE TABLE 'ds_salaries")

# class ds_salaries(Base):
#     __tablename__ = 'ds_salaries'
#     id = Column(Integer, primary_key=True)
#     work_year = Column(Integer)
#     experience_level = Column(String)
#     employment_type = Column(String)
#     job_title = Column(String)
#     salary = Column(Integer)
#     salary_currency = Column(String)
#     salary_in_usd = Column(Integer)
#     employee_residence = Column(String)
#     remote_ratio = Column(Integer)
#     company_location = Column(String)
#     company_size = Column(String)
    

# Base.metadata.create_all(engine)

# df = pd.read_csv('Resources/ds_salaries.csv')

# df.to_sql(con=engine, name=ds_salaries.__tablename__, if_exists='append', index=False)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

cors = CORS(app)
#################################################
# Flask Routes
#################################################

# Define what to do when user hits the index route
@app.route("/")
def home():
    # home route
    print('Server received request for "Home" page...')
    return 'Robert Welcome to the Data Science Job API "Home" Page!<br><br> \
        Here are the possible routes you can access:<br> \
            /api/v1.0/data_science_data'

# Data Science Job Route
@app.route("/api/v1.0/data_science_data")
@cross_origin()
def data_science():
    conn = psycopg2.connect(
        host="groupcv2.ci6szv7owa4r.us-east-1.rds.amazonaws.com",
        database="groupc",
        user='krishna',
        password='London2022')
    # create session link from Python to the DB
    #session = Session(engine)
    cur = conn.cursor()

    # perform a query to retrieve the data
    #dataScienceQuery = session.execute('SELECT * FROM "ds_salaries";').fetchall()
    # results = session.query(ds_salaries.work_year).all()
    # print(results)
    # session.close()
    cur.execute('SELECT * FROM "DS_salaries"')
    rows = cur.fetchall()
    dataScienceQuery = list(np.ravel(rows))
    # return jsonify(rows_x)

    # Create dictionary from row data and append to a list 
    all_data = []
    
    for item in rows:
        data_dict = {}
        data_dict['Country_code'] = item[0]
        data_dict['id'] = item[1]
        data_dict['Work_year'] = item[2]
        data_dict['Experience_level'] = item[3]
        data_dict['Employment_Type'] = item[4]
        data_dict['Job_Title'] = item[5]
        data_dict['Salary'] = item[6]
        data_dict['Salary_Currency'] = item[7]
        data_dict['Salary_USD'] = item[8]
        data_dict['Employee_Residence'] = item[9]
        data_dict['Remote_Ratio'] = item[10]
        data_dict['Company_Location'] = item[11]
        data_dict['Company_Size'] = item[12]
        data_dict['Latitude'] = item[13]
        data_dict['Longitude'] = item[14]

    # all_data = []
    # for work_year in results:
    #     data_dict = {}
    #     data_dict['work_year'] = work_year
        all_data.append(data_dict)

    # Convert list of tuples into normal list
    #all_data = json.dumps(results)

    # jsonify
    return jsonify(all_data)
    #return all_data.count('2020')

#######################################################################
if __name__ == "__main__":
    app.run(debug=True)
