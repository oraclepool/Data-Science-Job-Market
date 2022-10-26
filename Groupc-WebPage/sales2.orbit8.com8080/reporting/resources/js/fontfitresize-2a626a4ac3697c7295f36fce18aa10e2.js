(function($) {

    $.fn.fontfit = function(options) {

        var settings = $.extend({
            outerResizeDiv: {},
            fontPixelsChange: 3,
            headerTextMinWidth: 130,
            cover: 80,
        }, options);
        var outerResizeDiv = settings.outerResizeDiv;
        var outerResizeDivWidth = outerResizeDiv.contentWidth - settings.cover;
        var outerResizeDivHeight = outerResizeDiv.contentHeight;
        var fontPixelsChange = settings.fontPixelsChange;
        var headerTextMinWidth = settings.headerTextMinWidth;
        var outerDiv = settings.outerDiv;

        return this.each(function() {
            var obj = $(this);
            reduceFontSize(obj);
        });

        function reduceFontSize(v) { //console.log(v.width()+"####"+outerResizeDivWidth);

            if ((outerDiv.height() > outerResizeDivHeight || v.width() > outerResizeDivWidth) && v.width() >= headerTextMinWidth) {
                //console.log("if3:::"+outerDiv.height()+":::"+outerResizeDivHeight);
                v.css('font-size', (parseInt(v.css('font-size')) - fontPixelsChange) + "px");
                if ((outerDiv.height() > outerResizeDivHeight || v.width() > outerResizeDivWidth) && v.width() >= headerTextMinWidth) {
                    reduceFontSize(v)
                }
            } else {
                if (v.width() > outerResizeDivWidth) { //console.log("if1:"+v.width()+"::"+outerResizeDivWidth);
                    v.css('font-size', (parseInt(v.css('font-size')) - fontPixelsChange) + "px");
                    if (v.width() > outerResizeDivWidth) {
                        reduceFontSize(v);
                    }
                } else if (v.width() < outerResizeDivWidth && outerDiv.height() < outerResizeDivHeight && outerResizeDivHeight > headerTextMinWidth) {
                    //console.log("if2::"+outerDiv.height()+"::::"+outerResizeDivHeight);
                    v.css('font-size', (parseInt(v.css('font-size')) + fontPixelsChange) + "px");
                    if (v.width() < outerResizeDivWidth) {
                        reduceFontSize(v);
                    }
                }
            }

        }
    };



    $.fn.fontfitTemplate = function(options) {

        var settings = $.extend({
            numberOfCells: 0,
        }, options);
        var numberOfCells = settings.numberOfCells;
        var containerClass = settings.containerClass;
        var cellClass = settings.cellClass;
        var classesArr = settings.classesArr;
        var cellMinWidth = settings.cellMinWidth;
        var cellMinHeight = settings.cellMinHeight;
        var ratio = (cellMinWidth / cellMinHeight);
        //console.log("numberOfCells::"+numberOfCells)
        return this.each(function() {
            var obj = $(this);
            autoFontSize(obj);
        });

        function autoFontSize(obj) { //console.log(v.width()+"####"+outerResizeDivWidth);
            //event.preventDefault();
            var containerWidth = obj.width();
            var containerHeight = obj.height();

            if (numberOfCells >= 1 && numberOfCells < 4) {

                if (numberOfCells == 1) {
                    containerWidth = containerWidth;
                    containerHeight = containerHeight;
                    obj.find("div").css("border", "0px solid #ccc");
                }
                var cols = numberOfCells;
                var rows = 1;

                var cellWidth = 0;
                var cellHeight = 0;
                cellWidth = (containerWidth / cols).toFixed();
                cellHeight = (containerHeight / rows).toFixed();
                //consoloe.log()
                if (cellWidth / cellHeight < 1 && numberOfCells == 3) { //&& containerWidth/containerHeight<ratio
                    cols = 1;
                    rows = 3;
                    cellHeight = (containerHeight / rows).toFixed();
                    cellWidth = containerWidth;
                    setNewLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellWidth, cellHeight);
                } else if (cellWidth / cellHeight < 1 && numberOfCells == 2) { //&& containerWidth/containerHeight<ratio
                    cols = 1;
                    rows = 2;
                    cellHeight = (containerHeight / rows).toFixed();
                    cellWidth = containerWidth;
                    setNewLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellWidth, cellHeight);
                } else {
                    if (numberOfCells == 1) {
                        cellWidth = containerWidth;
                        cellHeight = containerHeight;
                    }
                    setNewLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellWidth, cellHeight);
                }
            }

            if (numberOfCells >= 4) { //&& numberOfCells<=60

                var cols = numberOfCells;
                var rows = 1;
                if (numberOfCells >= 4) {
                    cols = 4;
                    rows = Math.ceil(numberOfCells / 4);
                }

                var actualHeight = cellMinHeight * rows;
                var actualWidth = cellMinWidth * (cols)

                if (containerHeight > actualHeight && containerWidth < actualWidth) {
                    if (containerWidth > cellMinWidth * 2) {
                        prepareLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellWidth, cellHeight);
                    } else {
                        if (cols == 4 && numberOfCells == 4) {
                            cols = 1;
                            rows = numberOfCells / cols;
                        }
                        var cellHeight = (containerHeight / rows);
                        prepareLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, containerWidth, cellHeight);
                    }
                }
                if (containerHeight < actualHeight && containerWidth < actualWidth) {
                    setNewLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellMinWidth, cellMinHeight);
                }
                if (containerWidth >= actualWidth) {
                    if (numberOfCells > 4) {
                        cols = Math.floor(containerWidth / cellMinWidth);
                        rows = Math.ceil(numberOfCells / cols);
                        if (cols > numberOfCells) {
                            cols = numberOfCells;
                            rows = 1;
                        }
                    }
                    var cellWidth = (containerWidth / cols).toFixed();
                    var cellHeight = Math.ceil(containerHeight / rows);
                    setNewLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellWidth, cellHeight);
                }
                // Added below code for enable scrollbars
                if (containerWidth < actualWidth) {
                    if (numberOfCells > 4) {
                        cols = containerWidth / cellMinWidth;
                        cols = cols > 1 ? Math.floor(cols) : Math.ceil(cols);
                        rows = Math.ceil(numberOfCells / cols);
                        if (cols > numberOfCells) {
                            cols = numberOfCells;
                            rows = 1;
                        }
                        var cellWidth = (containerWidth / cols).toFixed();
                        var cellHeight = Math.ceil(containerHeight / rows);
                        setNewLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellWidth, cellHeight);

                    }
                }
            }

        }

        function prepareLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellWidth, cellHeight) {
            if (cols == 4) {
                cols = 2;
                rows = numberOfCells / 2;
            }
            var cellWidth = 0;
            var cellHeight = 0;
            cellWidth = (containerWidth / cols).toFixed();
            cellHeight = (containerHeight / rows).toFixed();
            setNewLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellWidth, cellHeight);
        }

        function setNewLayout(cols, rows, numberOfCells, containerWidth, containerHeight, obj, cellWidth, cellHeight) {

            $.each(classesArr, function(i, v) {
                var originalfontSize = Number(v.fontSize);
                var className = v.className;
                var ctype = v.ctype;
                var chartHeight = Number(v.chartHeight);
                var minFontSize = Number(v.minFontSize);
                var maxFontSize = 200;
                if (Number(v.maxFontSize) > 0) {
                    maxFontSize = Number(v.maxFontSize);
                }

                if (ctype == "chart" && obj.find(className).html() != "") {
                    obj.find(className + " > div ").css({
                        width: (cellWidth - 20),
                        height: chartHeight
                    })
                    obj.find(className + " svg").css({
                        width: (cellWidth - 20),
                        height: chartHeight
                    })
                }

                var cellWidthIncrease = 100 * (cellWidth - cellMinWidth) / cellMinWidth;
                var cellHeightIncrease = 100 * (cellHeight - cellMinHeight) / cellMinHeight;
                fontsize = 0;
                if (cellWidthIncrease > cellHeightIncrease) {
                    fontsize = originalfontSize + Number(((cellHeightIncrease * originalfontSize) / 150).toFixed());
                }
                if (cellWidthIncrease <= cellHeightIncrease) {
                    fontsize = originalfontSize + Number(((cellWidthIncrease * originalfontSize) / 150).toFixed());
                }
                if (className == ".card-value-field-cnt") {
                    //console.log(".card-value-field-cnt::"+fontsize)
                }
                if (fontsize < minFontSize) {
                    fontsize = minFontSize;
                }
                if (fontsize > maxFontSize) {
                    fontsize = maxFontSize;
                }

                obj.find(className).css({
                    "font-size": fontsize + "px"
                });
                if (obj.find(className).text() != "") {
                    obj.find(className).css("line-height", (fontsize + 2) + "px");
                }
                var divHeight = obj.find(className).height();
                var divWidth = obj.find(className).width();

                var strWidth = getTextWidth(obj.find(className).text(), "bold " + fontsize + "px arial");
                strWidth = strWidth / numberOfCells;
                //console.log("1::::"+cellWidth+":::::"+strWidth+"::::"+fontsizenew+":::"+minFontSize);
                setHorizontalValuesWidth(className, obj, fontsize, numberOfCells);
                if (cellWidth < strWidth + 90 && fontsize > minFontSize) {
                    adjustFontSize(obj, className, fontsize, divHeight, divWidth, cellWidth, cellHeight, minFontSize, numberOfCells, maxFontSize);
                }
            });

            var gtc = "";
            for (var i = 0; i < cols; i++) {
                cellWidth = Number(cellWidth);
                if (cellWidth <= cellMinWidth) {
                    gtc += cellMinWidth + "px ";
                } else {
                    gtc += "auto ";
                }

            }
            var gtr = "";
            var auto = false;
            var cellOriginalHeight = obj.find(".card > div > div").height() + 30;
            if (numberOfCells == 1) {
                cellHeight = (containerHeight / rows) - 7; //cellHeight-4;
                gtr += cellHeight + "px ";
            } else {
                for (var i = 0; i < rows; i++) {

                    cellHeight = (containerHeight / rows);
                    if (cellHeight < cellOriginalHeight) {
                        cellHeight = cellOriginalHeight
                    }
                    if (cellHeight < cellMinHeight) {
                        cellHeight = cellMinHeight
                    }
                    cellHeight = cellHeight - 7;
                    gtr += cellHeight + "px ";

                }
            }
            if (numberOfCells > 20) {
                gtr = "auto";
            }

            //commented below code to remove scrollbars in cards upto 8cards
            //if(numberOfCells<=12){obj.find("div").css("overflow","hidden");}

            obj.find(containerClass).css("grid-template-columns", gtc);
            obj.find(containerClass).css("grid-template-rows", gtr);
            obj.find(cellClass).css("min-height", "100%");

        }

        function getTextWidth(text, font) {
            var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
            var context = canvas.getContext("2d");
            context.font = font;
            var metrics = context.measureText(text);
            return metrics.width;
        };

        function adjustFontSize(obj, className, fontsize, divHeight, divWidth, cellWidth, cellHeight, minFontSize, numberOfCells, maxFontSize) {
            var fontsizenew = fontsize - 1;
            obj.find(className).css({
                "font-size": fontsizenew + "px"
            });
            obj.find(className).css("line-height", (fontsizenew) + "px");
            if (className == '.card-hzt-column' && obj.find('.card-hzt-column').text() != '') {
                obj.find('.card-vtl-tpl-title').css({
                    "font-size": (fontsizenew + 4) + "px"
                });
                obj.find('.card-vtl-tpl-title').css({
                    "line-height": (fontsizenew + 6) + "px"
                });
            }
            var divHeight = obj.find(className).height();
            var divWidth = obj.find(className).width();

            var strWidth = getTextWidth(obj.find(className).text(), "bold " + fontsize + "px arial");
            strWidth = strWidth / numberOfCells
            //console.log(cellWidth+":::::"+strWidth+"::::"+fontsizenew+":::"+minFontSize);
            setHorizontalValuesWidth(className, obj, fontsizenew, numberOfCells);
            if (cellWidth < strWidth + 100 && fontsizenew > minFontSize) {
                adjustFontSize(obj, className, fontsizenew, divHeight, divWidth, cellWidth, cellHeight, minFontSize, numberOfCells, maxFontSize);
            }
        }

        function setHorizontalValuesWidth(className, obj, fontsize, numberOfCells) {
            if (className == '.card-hzt-column' && obj.find('.card-hzt-column').text() != '') {
                //var strWidth1=getTextWidth(obj.find(".card-hzt-value-column:first").text(), "bold "+fontsize+"px arial");
                obj.find(".card-hzt-value-column").css("width", "auto");
                obj.find(".card-hzt-value-column").css("white-space", "nowrap");

                var valueColWidth = obj.find(".card-hzt-value-column").width();
                if (numberOfCells <= 18) {
                    obj.find(".card-hzt-value-column").each(function() {
                        valueColWidth = Math.max(valueColWidth, parseInt($(this).width()));
                    })
                }
                //console.log(numberOfCells)
                var extrawidth = 7;
                if (fontsize < 20 && numberOfCells > 18) {
                    extrawidth = 10
                }
                var rowWidth = obj.find(".card-hzt-row").width();
                var valueColWidthPercentage = ((valueColWidth / rowWidth) * 100) + extrawidth;

                if (valueColWidthPercentage >= 50) {
                    valueColWidthPercentage = 50;
                    obj.find(".card-hzt-value-column").css("white-space", "normal");
                }
                obj.find(".card-hzt-value-column").css("width", valueColWidthPercentage + "%");
                obj.find(".card-hzt-label").css("width", (100 - valueColWidthPercentage) + "%")
            }
        }
    };

}(jQuery));