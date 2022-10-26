var sheetjs_loader = function() {
    var me = this;

    /* spreadjs loading items*/
    // me.css = ["./resources/spreadjs/css/gc.spread.sheets.12.1.0.css"];
    // me.js = ["./resources/spreadjs/js/gc.spread.sheets.all.12.1.0.min.js"];

    me.css = ["./resources/spreadjs/css/ej.widgets.core.min.css", "./resources/spreadjs/css/ej.theme.min.css"];
    me.js = ["./resources/spreadjs/js/jquery.globalize.min.js", "./resources/spreadjs/js/jquery.validate.min.js", "./resources/spreadjs/js/jsrender.min.js", "./resources/spreadjs/js/ej.web.all.min.js"];
}

sheetjs_loader.prototype = {
    load_all: function(callback, caller) {
        var me = this;

        if (window._sheetjs_loaded) {
            if (callback && caller) {
                callback.apply(caller);
            }
            return;
        }

        var arr = me.css.concat(me.js);

        me.load_scripts(arr, callback, caller);

        window._sheetjs_loaded = true;
    },
    load_scripts: function(scripts, callback, caller) {
        var loaded = [],
            head = document.head,
            firstScript = document.scripts[0],
            sclength = scripts.length;

        var afterloaded = function() {
            if (loaded.length == sclength) {
                if (callback && caller) {
                    callback.apply(caller);
                }
            }
        }

        // watch scripts load in IE
        var loadScript = function(scs) {
            var sc = scs.shift(),
                script,
                is_css,
                ctag = "script";

            if (!sc) {
                return;
            }

            is_css = sc.indexOf(".css") == sc.length - 4;
            ctag = is_css ? "link" : ctag;

            if ('async' in firstScript) // modern browsers
            {
                script = document.createElement(ctag);

                if (is_css) {
                    script.rel = "stylesheet";
                    script.type = "text/css";
                    script.media = "all";
                } else {
                    script.type = "text/javascript";
                    script.async = false;
                }

                script.onload = function() {
                    loaded.push(sc);
                    afterloaded();
                };

                script.onerror = function() {
                    throw "loader : " + this.src;
                };

                if (is_css) {
                    script.href = sc;
                } else {
                    script.src = sc;
                }

                head.appendChild(script);

                // keep loading scripts
                loadScript(scs);
            } else if (firstScript.readyState) // IE < 10
            {
                // create a script and add it to our toto pile
                script = document.createElement(ctag);
                if (is_css) {
                    script.rel = "stylesheet";
                    script.type = "text/css";
                    script.media = "all";
                } else {
                    script.type = "text/javascript";
                }
                script.onreadystatechange = function() {
                    // execute as many scripts in order as we can
                    if (this.readyState == "loaded" || this.readyState == "complete") {
                        // avoid future loading events from this script (ie if src changes)
                        script.onreadystatechange = null;

                        firstScript.parentNode.insertBefore(script);

                        loaded.push(sc);
                        // async loading
                        // loadScript(scs);

                        afterloaded();
                    }
                };

                if (is_css) {
                    script.href = sc;
                } else {
                    script.src = sc;
                }
                loadScript(src);
            } else {
                document.write("<script src='" + sc + "' type='text/javascript'></script>");
            }
        };

        loadScript(scripts);
    }
}