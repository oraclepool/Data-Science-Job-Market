/**
 * By Nagaraju
 * Note : We can add utility functionality here.
 * 
 */


/*
 * Function  - Download files using anchor tag href.
 * event     - call event.
 * url       - Rest end point.
 * paramters - request parameters as string. Need to build parameters as per json object format. 
 *             
 *             Example : "{\"fieldId\":1,\"company\":\"orbit analysis\"}"
 *             
 * method    - request method type(POST,GET). By default it is GET.
 * 
 */
function fileDownLoadByHref(event, url, parameters, method) {
    try {
        event && event.preventDefault();
        var parametersObj = {}
        if (parameters && typeof parameters === 'string') {
            parametersObj = JSON.parse(parameters);
        } else if (parameters && typeof parameters === 'object') {
            parametersObj = parameters;
        }
        OrbitUtils && OrbitUtils.fileDownload(url, method, parametersObj, null, null);
    } catch (e) {
        console.log("Error when Downloading file.", e);
    }


}