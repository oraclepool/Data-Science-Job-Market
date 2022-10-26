/*
 Highstock JS v8.1.0 (2020-05-05)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
"use strict";
! function(t, e) {
    "object" == typeof module && module.exports ? (e.default = e, module.exports = t.document ? e(t) : e) : "function" == typeof define && define.amd ? define("highcharts/highstock", function() {
        return e(t)
    }) : (t.Highcharts && t.Highcharts.error(16, !0), t.Highcharts = e(t))
}("undefined" != typeof window ? window : this, function(h) {
    var t = {};

    function e(t, e, i, o) {
        t.hasOwnProperty(e) || (t[e] = o.apply(null, i))
    }
    return e(t, "parts/Globals.js", [], function() {
        var t = void 0 !== h ? h : "undefined" != typeof window ? window : {},
            e = t.document,
            i = "http://www.w3.org/2000/svg",
            o = t.navigator && t.navigator.userAgent || "",
            s = e && e.createElementNS && !!e.createElementNS(i, "svg").createSVGRect,
            r = /(edge|msie|trident)/i.test(o) && !t.opera,
            n = -1 !== o.indexOf("Firefox"),
            a = -1 !== o.indexOf("Chrome"),
            l = n && parseInt(o.split("Firefox/")[1], 10) < 4;
        return {
            product: "Highcharts",
            version: "8.1.0",
            deg2rad: 2 * Math.PI / 360,
            doc: e,
            hasBidiBug: l,
            hasTouch: !!t.TouchEvent,
            isMS: r,
            isWebKit: -1 !== o.indexOf("AppleWebKit"),
            isFirefox: n,
            isChrome: a,
            isSafari: !a && -1 !== o.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(o),
            SVG_NS: i,
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: s,
            win: t,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function() {},
            charts: [],
            dateFormats: {}
        }
    }), e(t, "parts/Utilities.js", [t["parts/Globals.js"]], function(m) {
        m.timers = [];
        var e = m.charts,
            l = m.doc,
            h = m.win,
            n = m.error = function(t, e, i, o) {
                function s() {
                    try {
                        if (e) throw ""
                    } catch (t) {}
                    h.console && console.log(a)
                }
                var r, n = g(t),
                    a = n ? "Highcharts error #" + t + ": www.highcharts.com/errors/" + t + "/" : t.toString();
                void 0 !== o && (r = "", n && (a += "?"), K(o, function(t, e) {
                    r += "\n" + e + ": " + t, n && (a += encodeURI(e) + "=" + encodeURI(t))
                }), a += r), i ? Q(i, "displayError", {
                    code: t,
                    message: a,
                    params: o
                }, s) : s()
            },
            c = (t.prototype.dSetter = function() {
                var t = this.paths,
                    e = t && t[0],
                    i = t && t[1],
                    o = [],
                    s = this.now || 0;
                if (1 !== s && e && i)
                    if (e.length === i.length && s < 1)
                        for (var r = 0; r < i.length; r++) {
                            for (var n = e[r], a = i[r], l = [], h = 0; h < a.length; h++) {
                                var c = n[h],
                                    d = a[h];
                                "number" == typeof c && "number" == typeof d && ("A" !== a[0] || 4 !== h && 5 !== h) ? l[h] = c + s * (d - c) : l[h] = d
                            }
                            o.push(l)
                        } else o = i;
                    else o = this.toD || [];
                this.elem.attr("d", o, void 0, !0)
            }, t.prototype.update = function() {
                var t = this.elem,
                    e = this.prop,
                    i = this.now,
                    o = this.options.step;
                this[e + "Setter"] ? this[e + "Setter"]() : t.attr ? t.element && t.attr(e, i, null, !0) : t.style[e] = i + this.unit, o && o.call(t, i, this)
            }, t.prototype.run = function(t, e, i) {
                var o = this,
                    s = o.options,
                    r = function(t) {
                        return !r.stopped && o.step(t)
                    },
                    n = h.requestAnimationFrame || function(t) {
                        setTimeout(t, 13)
                    },
                    a = function() {
                        for (var t = 0; t < m.timers.length; t++) m.timers[t]() || m.timers.splice(t--, 1);
                        m.timers.length && n(a)
                    };
                t !== e || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = t, this.end = e, this.unit = i, this.now = this.start, this.pos = 0, r.elem = this.elem, r.prop = this.prop, r() && 1 === m.timers.push(r) && n(a)) : (delete s.curAnim[this.prop], s.complete && 0 === Object.keys(s.curAnim).length && s.complete.call(this.elem))
            }, t.prototype.step = function(t) {
                var e, i = +new Date,
                    o = this.options,
                    s = this.elem,
                    r = o.complete,
                    n = o.duration,
                    a = o.curAnim,
                    l = !(s.attr && !s.element || (t || i >= n + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), a[this.prop] = !0, e = !0, K(a, function(t) {
                        !0 !== t && (e = !1)
                    }), e && r && r.call(s), 1) : (this.pos = o.easing((i - this.startTime) / n), this.now = this.start + (this.end - this.start) * this.pos, this.update(), 0)));
                return l
            }, t.prototype.initPath = function(t, e, i) {
                var o, s, r, n, a = t.startX,
                    l = t.endX,
                    h = e && e.slice(),
                    c = i.slice(),
                    d = t.isArea,
                    p = d ? 2 : 1;
                if (!h) return [c, c];

                function u(t, e) {
                    for (; t.length < s;) {
                        var i = t[0],
                            o = e[s - t.length];
                        o && "M" === i[0] && ("C" === o[0] ? t[0] = ["C", i[1], i[2], i[1], i[2], i[1], i[2]] : t[0] = ["L", i[1], i[2]]), t.unshift(i), d && t.push(t[t.length - 1])
                    }
                }

                function f(t) {
                    for (; t.length < s;) {
                        var e, i = t[t.length / p - 1].slice();
                        "C" === i[0] && (i[1] = i[5], i[2] = i[6]), d ? (e = t[t.length / p].slice(), t.splice(t.length / 2, 0, i, e)) : t.push(i)
                    }
                }
                if (a && l) {
                    for (r = 0; r < a.length; r++) {
                        if (a[r] === l[0]) {
                            o = r;
                            break
                        }
                        if (a[0] === l[l.length - a.length + r]) {
                            o = r, n = !0;
                            break
                        }
                        if (a[a.length - 1] === l[l.length - a.length + r]) {
                            o = a.length - r;
                            break
                        }
                    }
                    void 0 === o && (h = [])
                }
                return h.length && g(o) && (s = c.length + o * p, n ? (u(h, c), f(c)) : (u(c, h), f(h))), [h, c]
            }, t.prototype.fillSetter = function() {
                t.prototype.strokeSetter.apply(this, arguments)
            }, t.prototype.strokeSetter = function() {
                this.elem.attr(this.prop, m.color(this.start).tweenTo(m.color(this.end), this.pos), null, !0)
            }, t);

        function t(t, e, i) {
            this.options = e, this.elem = t, this.prop = i
        }

        function d() {
            var t, e, i = arguments,
                o = {},
                s = function(i, o) {
                    return "object" != typeof i && (i = {}), K(o, function(t, e) {
                        !f(t, !0) || a(t) || r(t) ? i[e] = o[e] : i[e] = s(i[e] || {}, t)
                    }), i
                };
            for (!0 === i[0] && (o = i[1], i = Array.prototype.slice.call(i, 2)), e = i.length, t = 0; t < e; t++) o = s(o, i[t]);
            return o
        }
        m.Fx = c, m.merge = d;
        var p = m.pInt = function(t, e) {
                return parseInt(t, e || 10)
            },
            s = m.isString = function(t) {
                return "string" == typeof t
            },
            u = m.isArray = function(t) {
                var e = Object.prototype.toString.call(t);
                return "[object Array]" === e || "[object Array Iterator]" === e
            };

        function f(t, e) {
            return !(!t || "object" != typeof t || e && u(t))
        }
        m.isObject = f;
        var r = m.isDOMElement = function(t) {
                return f(t) && "number" == typeof t.nodeType
            },
            a = m.isClass = function(t) {
                var e = t && t.constructor;
                return !(!f(t, !0) || r(t) || !e || !e.name || "Object" === e.name)
            },
            g = m.isNumber = function(t) {
                return "number" == typeof t && !isNaN(t) && t < 1 / 0 && -1 / 0 < t
            },
            i = m.erase = function(t, e) {
                for (var i = t.length; i--;)
                    if (t[i] === e) {
                        t.splice(i, 1);
                        break
                    }
            },
            x = m.defined = function(t) {
                return null != t
            };

        function o(i, t, e) {
            var o;
            return s(t) ? x(e) ? i.setAttribute(t, e) : i && i.getAttribute && ((o = i.getAttribute(t)) || "class" !== t || (o = i.getAttribute(t + "Name"))) : K(t, function(t, e) {
                0 != t && i.setAttribute(e, t)
            }), o
        }
        m.attr = o;
        var v = m.splat = function(t) {
                return u(t) ? t : [t]
            },
            y = m.syncTimeout = function(t, e, i) {
                return 0 < e ? setTimeout(t, e, i) : (t.call(0, i), -1)
            },
            b = m.clearTimeout = function(t) {
                x(t) && clearTimeout(t)
            },
            k = m.extend = function(t, e) {
                var i;
                for (i in t = t || {}, e) t[i] = e[i];
                return t
            };

        function M() {
            for (var t = arguments, e = t.length, i = 0; i < e; i++) {
                var o = t[i];
                if (null != o) return o
            }
        }
        m.pick = M;
        var w = m.css = function(t, e) {
                m.isMS && !m.svg && e && void 0 !== e.opacity && (e.filter = "alpha(opacity=" + 100 * e.opacity + ")"), k(t.style, e)
            },
            S = m.createElement = function(t, e, i, o, s) {
                var r = l.createElement(t);
                return e && k(r, e), s && w(r, {
                    padding: "0",
                    border: "none",
                    margin: "0"
                }), i && w(r, i), o && o.appendChild(r), r
            },
            A = m.extendClass = function(t, e) {
                function i() {}
                return i.prototype = new t, k(i.prototype, e), i
            },
            T = m.pad = function(t, e, i) {
                return new Array((e || 2) + 1 - String(t).replace("-", "").length).join(i || "0") + t
            },
            P = m.relativeLength = function(t, e, i) {
                return /%$/.test(t) ? e * parseFloat(t) / 100 + (i || 0) : parseFloat(t)
            },
            C = m.wrap = function(t, e, s) {
                var r = t[e];
                t[e] = function() {
                    var t, e = Array.prototype.slice.call(arguments),
                        i = arguments,
                        o = this;
                    return o.proceed = function() {
                        r.apply(o, arguments.length ? arguments : i)
                    }, e.unshift(r), t = s.apply(this, e), o.proceed = null, t
                }
            },
            L = m.format = function(t, e, i) {
                for (var o, s, r, n, a, l = "{", h = !1, c = [], d = /f$/, p = /\.([0-9])/, u = m.defaultOptions.lang, f = i && i.time || m.time, g = i && i.numberFormatter || j; t && -1 !== (o = t.indexOf(l));) {
                    r = t.slice(0, o), h ? (a = H((n = r.split(":")).shift() || "", e), n.length && "number" == typeof a && (r = n.join(":"), d.test(r) ? (s = parseInt((r.match(p) || ["", "-1"])[1], 10), null !== a && (a = g(a, s, u.decimalPoint, -1 < r.indexOf(",") ? u.thousandsSep : ""))) : a = f.dateFormat(r, a)), c.push(a)) : c.push(r), t = t.slice(o + 1), l = (h = !h) ? "}" : "{"
                }
                return c.push(t), c.join("")
            },
            E = m.getMagnitude = function(t) {
                return Math.pow(10, Math.floor(Math.log(t) / Math.LN10))
            },
            O = m.normalizeTickInterval = function(t, e, i, o, s) {
                var r, n = t,
                    a = t / (i = M(i, 1));
                for (e || (e = s ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === o && (1 === i ? e = e.filter(function(t) {
                        return t % 1 == 0
                    }) : i <= .1 && (e = [1 / i]))), r = 0; r < e.length && (n = e[r], !(s && t <= n * i || !s && a <= (e[r] + (e[r + 1] || e[r])) / 2)); r++);
                return n = W(n * i, -Math.round(Math.log(.001) / Math.LN10))
            },
            D = m.stableSort = function(t, i) {
                for (var o, e = t.length, s = 0; s < e; s++) t[s].safeI = s;
                for (t.sort(function(t, e) {
                        return 0 === (o = i(t, e)) ? t.safeI - e.safeI : o
                    }), s = 0; s < e; s++) delete t[s].safeI
            },
            B = m.arrayMin = function(t) {
                for (var e = t.length, i = t[0]; e--;) t[e] < i && (i = t[e]);
                return i
            },
            I = m.arrayMax = function(t) {
                for (var e = t.length, i = t[0]; e--;) t[e] > i && (i = t[e]);
                return i
            },
            z = m.destroyObjectProperties = function(i, o) {
                K(i, function(t, e) {
                    t && t !== o && t.destroy && t.destroy(), delete i[e]
                })
            },
            R = m.discardElement = function(t) {
                var e = (e = m.garbageBin) || S("div");
                t && e.appendChild(t), e.innerHTML = ""
            },
            W = m.correctFloat = function(t, e) {
                return parseFloat(t.toPrecision(e || 14))
            },
            G = m.setAnimation = function(t, e) {
                e.renderer.globalAnimation = M(t, e.options.chart.animation, !0)
            },
            N = m.animObject = function(t) {
                return f(t) ? d(t) : {
                    duration: t ? 500 : 0
                }
            },
            X = m.timeUnits = {
                millisecond: 1,
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: 864e5,
                week: 6048e5,
                month: 24192e5,
                year: 314496e5
            },
            j = m.numberFormat = function(t, e, i, o) {
                t = +t || 0, e = +e;
                var s, r, n, a, l, h = m.defaultOptions.lang,
                    c = (t.toString().split(".")[1] || "").split("e")[0].length,
                    d = t.toString().split("e");
                return -1 === e ? e = Math.min(c, 20) : g(e) ? e && d[1] && d[1] < 0 && (0 <= (l = e + +d[1]) ? (d[0] = (+d[0]).toExponential(l).split("e")[0], e = l) : (d[0] = d[0].split(".")[0] || 0, t = e < 20 ? (d[0] * Math.pow(10, d[1])).toFixed(e) : 0, d[1] = 0)) : e = 2, a = (Math.abs(d[1] ? d[0] : t) + Math.pow(10, -Math.max(e, c) - 1)).toFixed(e), r = 3 < (s = String(p(a))).length ? s.length % 3 : 0, i = M(i, h.decimalPoint), o = M(o, h.thousandsSep), n = t < 0 ? "-" : "", n += r ? s.substr(0, r) + o : "", n += s.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + o), e && (n += i + a.slice(-e)), d[1] && 0 != +n && (n += "e" + d[1]), n
            };

        function H(t, e) {
            if (!t) return e;
            var i = t.split(".").reverse(),
                o = e;
            if (1 === i.length) return o[t];
            for (var s = i.pop(); void 0 !== s && null != o;) o = o[s], s = i.pop();
            return o
        }
        Math.easeInOutSine = function(t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        };
        var Y = m.getStyle = function(t, e, i) {
                var o;
                if ("width" !== e) return "height" === e ? Math.max(0, Math.min(t.offsetHeight, t.scrollHeight) - m.getStyle(t, "padding-top") - m.getStyle(t, "padding-bottom")) : (h.getComputedStyle || n(27, !0), (o = h.getComputedStyle(t, void 0)) && (o = o.getPropertyValue(e), M(i, "opacity" !== e) && (o = p(o))), o);
                var s = Math.min(t.offsetWidth, t.scrollWidth),
                    r = t.getBoundingClientRect && t.getBoundingClientRect().width;
                return r < s && s - 1 <= r && (s = Math.floor(r)), Math.max(0, s - m.getStyle(t, "padding-left") - m.getStyle(t, "padding-right"))
            },
            F = m.inArray = function(t, e, i) {
                return e.indexOf(t, i)
            },
            U = m.find = Array.prototype.find ? function(t, e) {
                return t.find(e)
            } : function(t, e) {
                for (var i = t.length, o = 0; o < i; o++)
                    if (e(t[o], o)) return t[o]
            };
        m.keys = Object.keys;
        var V = m.offset = function(t) {
                var e = l.documentElement,
                    i = t.parentElement || t.parentNode ? t.getBoundingClientRect() : {
                        top: 0,
                        left: 0
                    };
                return {
                    top: i.top + (h.pageYOffset || e.scrollTop) - (e.clientTop || 0),
                    left: i.left + (h.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
                }
            },
            _ = m.stop = function(t, e) {
                for (var i = m.timers.length; i--;) m.timers[i].elem !== t || e && e !== m.timers[i].prop || (m.timers[i].stopped = !0)
            },
            K = m.objectEach = function(t, e, i) {
                for (var o in t) Object.hasOwnProperty.call(t, o) && e.call(i || t[o], t[o], o, t)
            };
        K({
            map: "map",
            each: "forEach",
            grep: "filter",
            reduce: "reduce",
            some: "some"
        }, function(e, t) {
            m[t] = function(t) {
                return Array.prototype[e].apply(t, [].slice.call(arguments, 1))
            }
        });
        var Z, q, $ = m.addEvent = function(t, e, i, o) {
                void 0 === o && (o = {});
                var s = t.addEventListener || m.addEventListenerPolyfill,
                    r = "function" == typeof t && t.prototype ? t.prototype.protoEvents = t.prototype.protoEvents || {} : t.hcEvents = t.hcEvents || {};
                m.Point && t instanceof m.Point && t.series && t.series.chart && (t.series.chart.runTrackerClick = !0), s && s.call(t, e, i, !1), r[e] || (r[e] = []);
                var n = {
                    fn: i,
                    order: "number" == typeof o.order ? o.order : 1 / 0
                };
                return r[e].push(n), r[e].sort(function(t, e) {
                        return t.order - e.order
                    }),
                    function() {
                        J(t, e, i)
                    }
            },
            J = m.removeEvent = function(s, r, n) {
                var a;

                function l(t, e) {
                    var i = s.removeEventListener || m.removeEventListenerPolyfill;
                    i && i.call(s, t, e, !1)
                }

                function h(i) {
                    var t, o;
                    s.nodeName && (r ? (t = {})[r] = !0 : t = i, K(t, function(t, e) {
                        if (i[e])
                            for (o = i[e].length; o--;) l(e, i[e][o].fn)
                    }))
                }["protoEvents", "hcEvents"].forEach(function(t, e) {
                    var i = e ? s : s.prototype,
                        o = i && i[t];
                    o && (r ? (a = o[r] || [], n ? (o[r] = a.filter(function(t) {
                        return n !== t.fn
                    }), l(r, n)) : (h(o), o[r] = [])) : (h(o), i[t] = {}))
                })
            },
            Q = m.fireEvent = function(r, t, n, e) {
                var i, a;
                n = n || {}, l.createEvent && (r.dispatchEvent || r.fireEvent) ? ((i = l.createEvent("Events")).initEvent(t, !0, !0), k(i, n), r.dispatchEvent ? r.dispatchEvent(i) : r.fireEvent(t, i)) : (n.target || k(n, {
                    preventDefault: function() {
                        n.defaultPrevented = !0
                    },
                    target: r,
                    type: t
                }), function(t, e) {
                    void 0 === t && (t = []), void 0 === e && (e = []);
                    var i = 0,
                        o = 0,
                        s = t.length + e.length;
                    for (a = 0; a < s; a++) {
                        !1 === (t[i] && (!e[o] || t[i].order <= e[o].order) ? t[i++] : e[o++]).fn.call(r, n) && n.preventDefault()
                    }
                }(r.protoEvents && r.protoEvents[t], r.hcEvents && r.hcEvents[t])), e && !n.defaultPrevented && e.call(r, n)
            },
            tt = m.animate = function(i, o, s) {
                var r, n, a, t, l = "";
                f(s) || (s = {
                    duration: (t = arguments)[2],
                    easing: t[3],
                    complete: t[4]
                }), g(s.duration) || (s.duration = 400), s.easing = "function" == typeof s.easing ? s.easing : Math[s.easing] || Math.easeInOutSine, s.curAnim = d(o), K(o, function(t, e) {
                    _(i, e), a = new c(i, s, e), n = null, "d" === e && u(o.d) ? (a.paths = a.initPath(i, i.pathArray, o.d), a.toD = o.d, r = 0, n = 1) : i.attr ? r = i.attr(e) : (r = parseFloat(Y(i, e)) || 0, "opacity" !== e && (l = "px")), (n = n || t) && n.match && n.match("px") && (n = n.replace(/px/g, "")), a.run(r, n, l)
                })
            },
            et = m.seriesType = function(t, e, i, o, s) {
                var r = m.getOptions(),
                    n = m.seriesTypes;
                return r.plotOptions[t] = d(r.plotOptions[e], i), n[t] = A(n[e] || function() {}, o), n[t].prototype.type = t, s && (n[t].prototype.pointClass = A(m.Point, s)), n[t]
            },
            it = m.uniqueKey = (Z = Math.random().toString(36).substring(2, 9), q = 0, function() {
                return "highcharts-" + Z + "-" + q++
            }),
            ot = m.isFunction = function(t) {
                return "function" == typeof t
            };
        return h.jQuery && (h.jQuery.fn.highcharts = function() {
            var t = [].slice.call(arguments);
            if (this[0]) return t[0] ? (new(m[s(t[0]) ? t.shift() : "Chart"])(this[0], t[0], t[1]), this) : e[o(this[0], "data-highcharts-chart")]
        }), {
            Fx: m.Fx,
            addEvent: $,
            animate: tt,
            animObject: N,
            arrayMax: I,
            arrayMin: B,
            attr: o,
            clamp: function(t, e, i) {
                return e < t ? t < i ? t : i : e
            },
            clearTimeout: b,
            correctFloat: W,
            createElement: S,
            css: w,
            defined: x,
            destroyObjectProperties: z,
            discardElement: R,
            erase: i,
            error: n,
            extend: k,
            extendClass: A,
            find: U,
            fireEvent: Q,
            format: L,
            getMagnitude: E,
            getNestedProperty: H,
            getStyle: Y,
            inArray: F,
            isArray: u,
            isClass: a,
            isDOMElement: r,
            isFunction: ot,
            isNumber: g,
            isObject: f,
            isString: s,
            merge: d,
            normalizeTickInterval: O,
            numberFormat: j,
            objectEach: K,
            offset: V,
            pad: T,
            pick: M,
            pInt: p,
            relativeLength: P,
            removeEvent: J,
            seriesType: et,
            setAnimation: G,
            splat: v,
            stableSort: D,
            stop: _,
            syncTimeout: y,
            timeUnits: X,
            uniqueKey: it,
            wrap: C
        }
    }), e(t, "parts/Color.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var s = e.isNumber,
            r = e.merge,
            o = e.pInt,
            i = (n.parse = function(t) {
                return new n(t)
            }, n.prototype.init = function(t) {
                var e, i, o, s, r;
                if (this.input = t = n.names[t && t.toLowerCase ? t.toLowerCase() : ""] || t, t && t.stops) this.stops = t.stops.map(function(t) {
                    return new n(t[1])
                });
                else if (t && t.charAt && "#" === t.charAt() && (r = t.length, t = parseInt(t.substr(1), 16), 7 === r ? i = [(16711680 & t) >> 16, (65280 & t) >> 8, 255 & t, 1] : 4 === r && (i = [(3840 & t) >> 4 | (3840 & t) >> 8, (240 & t) >> 4 | 240 & t, (15 & t) << 4 | 15 & t, 1])), !i)
                    for (o = this.parsers.length; o-- && !i;)(e = (s = this.parsers[o]).regex.exec(t)) && (i = s.parse(e));
                this.rgba = i || []
            }, n.prototype.get = function(i) {
                var o, t = this.input,
                    e = this.rgba;
                return void 0 !== this.stops ? ((o = r(t)).stops = [].concat(o.stops), this.stops.forEach(function(t, e) {
                    o.stops[e] = [o.stops[e][0], t.get(i)]
                })) : o = e && s(e[0]) ? "rgb" === i || !i && 1 === e[3] ? "rgb(" + e[0] + "," + e[1] + "," + e[2] + ")" : "a" === i ? e[3] : "rgba(" + e.join(",") + ")" : t, o
            }, n.prototype.brighten = function(e) {
                var t, i = this.rgba;
                if (this.stops) this.stops.forEach(function(t) {
                    t.brighten(e)
                });
                else if (s(e) && 0 !== e)
                    for (t = 0; t < 3; t++) i[t] += o(255 * e), i[t] < 0 && (i[t] = 0), 255 < i[t] && (i[t] = 255);
                return this
            }, n.prototype.setOpacity = function(t) {
                return this.rgba[3] = t, this
            }, n.prototype.tweenTo = function(t, e) {
                var i, o = this.rgba,
                    s = t.rgba,
                    r = s.length && o && o.length ? ((i = 1 !== s[3] || 1 !== o[3]) ? "rgba(" : "rgb(") + Math.round(s[0] + (o[0] - s[0]) * (1 - e)) + "," + Math.round(s[1] + (o[1] - s[1]) * (1 - e)) + "," + Math.round(s[2] + (o[2] - s[2]) * (1 - e)) + (i ? "," + (s[3] + (o[3] - s[3]) * (1 - e)) : "") + ")" : t.input || "none";
                return r
            }, n.names = {
                white: "#ffffff",
                black: "#000000"
            }, n);

        function n(t) {
            if (this.parsers = [{
                    regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                    parse: function(t) {
                        return [o(t[1]), o(t[2]), o(t[3]), parseFloat(t[4], 10)]
                    }
                }, {
                    regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                    parse: function(t) {
                        return [o(t[1]), o(t[2]), o(t[3]), 1]
                    }
                }], this.rgba = [], !(this instanceof n)) return new n(t);
            this.init(t)
        }
        return t.Color = i, t.color = i.parse, t.Color
    }), e(t, "parts/SVGElement.js", [t["parts/Color.js"], t["parts/Globals.js"], t["parts/Utilities.js"]], function(x, l, t) {
        var v = l.deg2rad,
            s = l.doc,
            r = l.hasTouch,
            h = l.isFirefox,
            d = l.noop,
            c = l.svg,
            o = l.SVG_NS,
            e = l.win,
            n = t.animate,
            a = t.animObject,
            f = t.attr,
            i = t.createElement,
            p = t.css,
            y = t.defined,
            u = t.erase,
            b = t.extend,
            k = t.fireEvent,
            g = t.inArray,
            M = t.isArray,
            w = t.isFunction,
            m = t.isNumber,
            S = t.isString,
            A = t.merge,
            T = t.objectEach,
            P = t.pick,
            C = t.pInt,
            L = t.stop,
            E = t.uniqueKey,
            O = (D.prototype._defaultGetter = function(t) {
                var e = P(this[t + "Value"], this[t], this.element ? this.element.getAttribute(t) : null, 0);
                return /^[\-0-9\.]+$/.test(e) && (e = parseFloat(e)), e
            }, D.prototype._defaultSetter = function(t, e, i) {
                i.setAttribute(e, t)
            }, D.prototype.add = function(t) {
                var e, i = this.renderer,
                    o = this.element;
                return t && (this.parentGroup = t), this.parentInverted = t && t.inverted, void 0 !== this.textStr && i.buildText(this), this.added = !0, t && !t.handleZ && !this.zIndex || (e = this.zIndexSetter()), e || (t ? t.element : i.box).appendChild(o), this.onAdd && this.onAdd(), this
            }, D.prototype.addClass = function(t, e) {
                var i = !e && this.attr("class") || "";
                return (t = (t || "").split(/ /g).reduce(function(t, e) {
                    return -1 === i.indexOf(e) && t.push(e), t
                }, i ? [i] : []).join(" ")) !== i && this.attr("class", t), this
            }, D.prototype.afterSetters = function() {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            }, D.prototype.align = function(t, e, i) {
                var o, s, r, n, a, l, h, c = {},
                    d = this.renderer,
                    p = d.alignedObjects;
                return t ? (this.alignOptions = t, this.alignByTranslate = e, i && !S(i) || (this.alignTo = a = i || "renderer", u(p, this), p.push(this), i = void 0)) : (t = this.alignOptions, e = this.alignByTranslate, a = this.alignTo), i = P(i, d[a], d), o = t.align, s = t.verticalAlign, r = (i.x || 0) + (t.x || 0), n = (i.y || 0) + (t.y || 0), "right" === o ? l = 1 : "center" === o && (l = 2), l && (r += (i.width - (t.width || 0)) / l), c[e ? "translateX" : "x"] = Math.round(r), "bottom" === s ? h = 1 : "middle" === s && (h = 2), h && (n += (i.height - (t.height || 0)) / h), c[e ? "translateY" : "y"] = Math.round(n), this[this.placed ? "animate" : "attr"](c), this.placed = !0, this.alignAttr = c, this
            }, D.prototype.alignSetter = function(t) {
                var e = {
                    left: "start",
                    center: "middle",
                    right: "end"
                };
                e[t] && (this.alignValue = t, this.element.setAttribute("text-anchor", e[t]))
            }, D.prototype.animate = function(t, e, i) {
                var o = a(P(e, this.renderer.globalAnimation, !0));
                return P(s.hidden, s.msHidden, s.webkitHidden, !1) && (o.duration = 0), 0 !== o.duration ? (i && (o.complete = i), n(this, t, o)) : (this.attr(t, void 0, i), T(t, function(t, e) {
                    o.step && o.step.call(this, t, {
                        prop: e,
                        pos: 1
                    })
                }, this)), this
            }, D.prototype.applyTextOutline = function(t) {
                var e, o, s, r, i, n, a = this.element; - 1 !== t.indexOf("contrast") && (t = t.replace(/contrast/g, this.renderer.getContrast(a.style.fill))), t = t.split(" "), o = t[t.length - 1], (s = t[0]) && "none" !== s && l.svg && (this.fakeTS = !0, e = [].slice.call(a.getElementsByTagName("tspan")), this.ySetter = this.xSetter, s = s.replace(/(^[\d\.]+)(.*?)$/g, function(t, e, i) {
                    return 2 * e + i
                }), this.removeTextOutline(e), r = !!a.textContent && /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(a.textContent), n = a.firstChild, e.forEach(function(t, e) {
                    var i;
                    0 === e && (t.setAttribute("x", a.getAttribute("x")), e = a.getAttribute("y"), t.setAttribute("y", e || 0), null === e && a.setAttribute("y", 0)), i = t.cloneNode(!0), f(r && !h ? t : i, {
                        class: "highcharts-text-outline",
                        fill: o,
                        stroke: o,
                        "stroke-width": s,
                        "stroke-linejoin": "round"
                    }), a.insertBefore(i, n)
                }), r && h && e[0] && ((i = e[0].cloneNode(!0)).textContent = " ", a.insertBefore(i, n)))
            }, D.prototype.attr = function(i, t, e, o) {
                var s, r, n, a, l = this.element,
                    h = this,
                    c = this.symbolCustomAttribs;
                return "string" == typeof i && void 0 !== t && (s = i, (i = {})[s] = t), "string" == typeof i ? h = (this[i + "Getter"] || this._defaultGetter).call(this, i, l) : (T(i, function(t, e) {
                    n = !1, o || L(this, e), this.symbolName && -1 !== g(e, c) && (r || (this.symbolAttr(i), r = !0), n = !0), !this.rotation || "x" !== e && "y" !== e || (this.doTransform = !0), n || ((a = this[e + "Setter"] || this._defaultSetter).call(this, t, e, l), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(e) && this.updateShadows(e, t, a))
                }, this), this.afterSetters()), e && e.call(this), h
            }, D.prototype.clip = function(t) {
                return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : "none")
            }, D.prototype.crisp = function(t, e) {
                var i;
                return e = e || t.strokeWidth || 0, i = Math.round(e) % 2 / 2, t.x = Math.floor(t.x || this.x || 0) + i, t.y = Math.floor(t.y || this.y || 0) + i, t.width = Math.floor((t.width || this.width || 0) - 2 * i), t.height = Math.floor((t.height || this.height || 0) - 2 * i), y(t.strokeWidth) && (t.strokeWidth = e), t
            }, D.prototype.complexColor = function(t, e, o) {
                var s, r, n, a, l, h, c, d, p, u, f, g = this.renderer,
                    m = [];
                k(this.renderer, "complexColor", {
                    args: arguments
                }, function() {
                    var i;
                    t.radialGradient ? r = "radialGradient" : t.linearGradient && (r = "linearGradient"), r && (n = t[r], l = g.gradients, h = t.stops, p = o.radialReference, M(n) && (t[r] = n = {
                        x1: n[0],
                        y1: n[1],
                        x2: n[2],
                        y2: n[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === r && p && !y(n.gradientUnits) && (n = A(a = n, g.getRadialAttr(p, a), {
                        gradientUnits: "userSpaceOnUse"
                    })), T(n, function(t, e) {
                        "id" !== e && m.push(e, t)
                    }), T(h, function(t) {
                        m.push(t)
                    }), m = m.join(","), l[m] ? u = l[m].attr("id") : (n.id = u = E(), (i = l[m] = g.createElement(r).attr(n).add(g.defs)).radAttr = a, i.stops = [], h.forEach(function(t) {
                        var e;
                        d = 0 === t[1].indexOf("rgba") ? (s = x.parse(t[1]), c = s.get("rgb"), s.get("a")) : (c = t[1], 1), e = g.createElement("stop").attr({
                            offset: t[0],
                            "stop-color": c,
                            "stop-opacity": d
                        }).add(i), i.stops.push(e)
                    })), f = "url(" + g.url + "#" + u + ")", o.setAttribute(e, f), o.gradient = m, t.toString = function() {
                        return f
                    })
                })
            }, D.prototype.css = function(t) {
                var e, i, o = this.styles,
                    s = {},
                    r = this.element,
                    n = "",
                    a = !o,
                    l = ["textOutline", "textOverflow", "width"];
                return t && t.color && (t.fill = t.color), o && T(t, function(t, e) {
                    o && o[e] !== t && (s[e] = t, a = !0)
                }), a && (o && (t = b(o, s)), t && (null === t.width || "auto" === t.width ? delete this.textWidth : "text" === r.nodeName.toLowerCase() && t.width && (e = this.textWidth = C(t.width))), this.styles = t, e && !c && this.renderer.forExport && delete t.width, r.namespaceURI === this.SVG_NS ? (i = function(t, e) {
                    return "-" + e.toLowerCase()
                }, T(t, function(t, e) {
                    -1 === l.indexOf(e) && (n += e.replace(/([A-Z])/g, i) + ":" + t + ";")
                }), n && f(r, "style", n)) : p(r, t), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), t && t.textOutline && this.applyTextOutline(t.textOutline))), this
            }, D.prototype.dashstyleSetter = function(t) {
                var e = this["stroke-width"];
                if ("inherit" === e && (e = 1), t = t && t.toLowerCase()) {
                    for (var i = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","), o = i.length; o--;) i[o] = "" + C(i[o]) * P(e, NaN);
                    t = i.join(",").replace(/NaN/g, "none"), this.element.setAttribute("stroke-dasharray", t)
                }
            }, D.prototype.destroy = function() {
                var t, e, i, o = this,
                    s = o.element || {},
                    r = o.renderer,
                    n = r.isSVG && "SPAN" === s.nodeName && o.parentGroup || void 0,
                    a = s.ownerSVGElement;
                if (s.onclick = s.onmouseout = s.onmouseover = s.onmousemove = s.point = null, L(o), o.clipPath && a && (i = o.clipPath, [].forEach.call(a.querySelectorAll("[clip-path],[CLIP-PATH]"), function(t) {
                        -1 < t.getAttribute("clip-path").indexOf(i.element.id) && t.removeAttribute("clip-path")
                    }), o.clipPath = i.destroy()), o.stops) {
                    for (e = 0; e < o.stops.length; e++) o.stops[e].destroy();
                    o.stops.length = 0, o.stops = void 0
                }
                for (o.safeRemoveChild(s), r.styledMode || o.destroyShadows(); n && n.div && 0 === n.div.childNodes.length;) t = n.parentGroup, o.safeRemoveChild(n.div), delete n.div, n = t;
                o.alignTo && u(r.alignedObjects, o), T(o, function(t, e) {
                    o[e] && o[e].parentGroup === o && o[e].destroy && o[e].destroy(), delete o[e]
                })
            }, D.prototype.destroyShadows = function() {
                (this.shadows || []).forEach(function(t) {
                    this.safeRemoveChild(t)
                }, this), this.shadows = void 0
            }, D.prototype.destroyTextPath = function(t, e) {
                var i, o = t.getElementsByTagName("text")[0];
                if (o) {
                    if (o.removeAttribute("dx"), o.removeAttribute("dy"), e.element.setAttribute("id", ""), this.textPathWrapper && o.getElementsByTagName("textPath").length) {
                        for (i = this.textPathWrapper.element.childNodes; i.length;) o.appendChild(i[0]);
                        o.removeChild(this.textPathWrapper.element)
                    }
                } else(t.getAttribute("dx") || t.getAttribute("dy")) && (t.removeAttribute("dx"), t.removeAttribute("dy"));
                this.textPathWrapper && (this.textPathWrapper = this.textPathWrapper.destroy())
            }, D.prototype.dSetter = function(t, e, i) {
                M(t) && ("string" == typeof t[0] && (t = this.renderer.pathToSegments(t)), t = (this.pathArray = t).reduce(function(t, e, i) {
                    return e && e.join ? (i ? t + " " : "") + e.join(" ") : (e || "").toString()
                }, "")), /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"), this[e] !== t && (i.setAttribute(e, t), this[e] = t)
            }, D.prototype.fadeOut = function(t) {
                var e = this;
                e.animate({
                    opacity: 0
                }, {
                    duration: P(t, 150),
                    complete: function() {
                        e.attr({
                            y: -9999
                        }).hide()
                    }
                })
            }, D.prototype.fillSetter = function(t, e, i) {
                "string" == typeof t ? i.setAttribute(e, t) : t && this.complexColor(t, e, i)
            }, D.prototype.getBBox = function(t, e) {
                var i, o, s, r, n, a, l = this,
                    h = l.renderer,
                    c = l.element,
                    d = l.styles,
                    p = l.textStr,
                    u = h.cache,
                    f = h.cacheKeys,
                    g = c.namespaceURI === l.SVG_NS,
                    m = P(e, l.rotation, 0),
                    x = h.styledMode ? c && D.prototype.getStyle.call(c, "font-size") : d && d.fontSize;
                if (y(p) && (-1 === (s = p.toString()).indexOf("<") && (s = s.replace(/[0-9]/g, "0")), s += ["", m, x, l.textWidth, d && d.textOverflow, d && d.fontWeight].join(",")), s && !t && (i = u[s]), !i) {
                    if (g || h.forExport) {
                        try {
                            o = this.fakeTS && function(e) {
                                [].forEach.call(c.querySelectorAll(".highcharts-text-outline"), function(t) {
                                    t.style.display = e
                                })
                            }, w(o) && o("none"), i = c.getBBox ? b({}, c.getBBox()) : {
                                width: c.offsetWidth,
                                height: c.offsetHeight
                            }, w(o) && o("")
                        } catch (t) {}(!i || i.width < 0) && (i = {
                            width: 0,
                            height: 0
                        })
                    } else i = l.htmlGetBBox();
                    if (h.isSVG && (n = i.width, a = i.height, g && (i.height = a = {
                            "11px,17": 14,
                            "13px,20": 16
                        }[d && d.fontSize + "," + Math.round(a)] || a), m && (r = m * v, i.width = Math.abs(a * Math.sin(r)) + Math.abs(n * Math.cos(r)), i.height = Math.abs(a * Math.cos(r)) + Math.abs(n * Math.sin(r)))), s && 0 < i.height) {
                        for (; 250 < f.length;) delete u[f.shift()];
                        u[s] || f.push(s), u[s] = i
                    }
                }
                return i
            }, D.prototype.getStyle = function(t) {
                return e.getComputedStyle(this.element || this, "").getPropertyValue(t)
            }, D.prototype.hasClass = function(t) {
                return -1 !== ("" + this.attr("class")).split(" ").indexOf(t)
            }, D.prototype.hide = function(t) {
                return t ? this.attr({
                    y: -9999
                }) : this.attr({
                    visibility: "hidden"
                }), this
            }, D.prototype.htmlGetBBox = function() {
                return {
                    height: 0,
                    width: 0,
                    x: 0,
                    y: 0
                }
            }, D.prototype.init = function(t, e) {
                this.element = "span" === e ? i(e) : s.createElementNS(this.SVG_NS, e), this.renderer = t, k(this, "afterInit")
            }, D.prototype.invert = function(t) {
                return this.inverted = t, this.updateTransform(), this
            }, D.prototype.on = function(t, e) {
                var i, o, s = this.element;
                return r && "click" === t ? (s.ontouchstart = function(t) {
                    i = {
                        clientX: t.touches[0].clientX,
                        clientY: t.touches[0].clientY
                    }
                }, s.ontouchend = function(t) {
                    i.clientX && 4 <= Math.sqrt(Math.pow(i.clientX - t.changedTouches[0].clientX, 2) + Math.pow(i.clientY - t.changedTouches[0].clientY, 2)) || e.call(s, t), o = !0, t.preventDefault()
                }, s.onclick = function(t) {
                    o || e.call(s, t)
                }) : s["on" + t] = e, this
            }, D.prototype.opacitySetter = function(t, e, i) {
                this[e] = t, i.setAttribute(e, t)
            }, D.prototype.removeClass = function(t) {
                return this.attr("class", ("" + this.attr("class")).replace(S(t) ? new RegExp(" ?" + t + " ?") : t, ""))
            }, D.prototype.removeTextOutline = function(t) {
                for (var e, i = t.length; i--;) "highcharts-text-outline" === (e = t[i]).getAttribute("class") && u(t, this.element.removeChild(e))
            }, D.prototype.safeRemoveChild = function(t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            }, D.prototype.setRadialReference = function(t) {
                var e = this.element.gradient && this.renderer.gradients[this.element.gradient];
                return this.element.radialReference = t, e && e.radAttr && e.animate(this.renderer.getRadialAttr(t, e.radAttr)), this
            }, D.prototype.setTextPath = function(t, e) {
                var i, o, s, r = this.element,
                    n = {
                        textAnchor: "text-anchor"
                    },
                    a = !1,
                    l = this.textPathWrapper,
                    h = !l,
                    c = (e = A(!0, {
                        enabled: !0,
                        attributes: {
                            dy: -5,
                            startOffset: "50%",
                            textAnchor: "middle"
                        }
                    }, e)).attributes;
                if (t && e && e.enabled) {
                    if (l && null === l.element.parentNode ? (h = !0, l = l.destroy()) : l && this.removeTextOutline.call(l.parentGroup, [].slice.call(r.getElementsByTagName("tspan"))), this.options && this.options.padding && (c.dx = -this.options.padding), l || (this.textPathWrapper = l = this.renderer.createElement("textPath"), a = !0), i = l.element, (o = t.element.getAttribute("id")) || t.element.setAttribute("id", o = E()), h)
                        for (s = r.getElementsByTagName("tspan"); s.length;) s[0].setAttribute("y", 0), m(c.dx) && s[0].setAttribute("x", -c.dx), i.appendChild(s[0]);
                    a && l && l.add({
                        element: this.text ? this.text.element : r
                    }), i.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + o), y(c.dy) && (i.parentNode.setAttribute("dy", c.dy), delete c.dy), y(c.dx) && (i.parentNode.setAttribute("dx", c.dx), delete c.dx), T(c, function(t, e) {
                        i.setAttribute(n[e] || e, t)
                    }), r.removeAttribute("transform"), this.removeTextOutline.call(l, [].slice.call(r.getElementsByTagName("tspan"))), this.text && !this.renderer.styledMode && this.attr({
                        fill: "none",
                        "stroke-width": 0
                    }), this.updateTransform = d, this.applyTextOutline = d
                } else l && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(r, t), this.updateTransform(), this.options && this.options.rotation && this.applyTextOutline(this.options.style.textOutline));
                return this
            }, D.prototype.shadow = function(t, e, i) {
                var o, s, r, n, a, l, h = [],
                    c = this.element,
                    d = !1,
                    p = this.oldShadowOptions,
                    u = {
                        color: "#000000",
                        offsetX: 1,
                        offsetY: 1,
                        opacity: .15,
                        width: 3
                    };
                if (!0 === t ? l = u : "object" == typeof t && (l = b(u, t)), l && (l && p && T(l, function(t, e) {
                        t !== p[e] && (d = !0)
                    }), d && this.destroyShadows(), this.oldShadowOptions = l), l) {
                    if (!this.shadows) {
                        for (n = l.opacity / l.width, a = this.parentInverted ? "translate(-1,-1)" : "translate(" + l.offsetX + ", " + l.offsetY + ")", o = 1; o <= l.width; o++) s = c.cloneNode(!1), r = 2 * l.width + 1 - 2 * o, f(s, {
                            stroke: t.color || "#000000",
                            "stroke-opacity": n * o,
                            "stroke-width": r,
                            transform: a,
                            fill: "none"
                        }), s.setAttribute("class", (s.getAttribute("class") || "") + " highcharts-shadow"), i && (f(s, "height", Math.max(f(s, "height") - r, 0)), s.cutHeight = r), e ? e.element.appendChild(s) : c.parentNode && c.parentNode.insertBefore(s, c), h.push(s);
                        this.shadows = h
                    }
                } else this.destroyShadows();
                return this
            }, D.prototype.show = function(t) {
                return this.attr({
                    visibility: t ? "inherit" : "visible"
                })
            }, D.prototype.strokeSetter = function(t, e, i) {
                this[e] = t, this.stroke && this["stroke-width"] ? (D.prototype.fillSetter.call(this, this.stroke, "stroke", i), i.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === e && 0 === t && this.hasStroke ? (i.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (i.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
            }, D.prototype.strokeWidth = function() {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var t, e = this.getStyle("stroke-width"),
                    i = 0;
                return e.indexOf("px") === e.length - 2 ? i = C(e) : "" !== e && (t = s.createElementNS(o, "rect"), f(t, {
                    width: e,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(t), i = t.getBBox().width, t.parentNode.removeChild(t)), i
            }, D.prototype.symbolAttr = function(e) {
                var i = this;
                ["x", "y", "r", "start", "end", "width", "height", "innerR", "anchorX", "anchorY", "clockwise"].forEach(function(t) {
                    i[t] = P(e[t], i[t])
                }), i.attr({
                    d: i.renderer.symbols[i.symbolName](i.x, i.y, i.width, i.height, i)
                })
            }, D.prototype.textSetter = function(t) {
                t !== this.textStr && (delete this.textPxLength, this.textStr = t, this.added && this.renderer.buildText(this))
            }, D.prototype.titleSetter = function(t) {
                var e = this.element.getElementsByTagName("title")[0];
                e || (e = s.createElementNS(this.SVG_NS, "title"), this.element.appendChild(e)), e.firstChild && e.removeChild(e.firstChild), e.appendChild(s.createTextNode(String(P(t, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
            }, D.prototype.toFront = function() {
                var t = this.element;
                return t.parentNode.appendChild(t), this
            }, D.prototype.translate = function(t, e) {
                return this.attr({
                    translateX: t,
                    translateY: e
                })
            }, D.prototype.updateShadows = function(t, e, i) {
                var o = this.shadows;
                if (o)
                    for (var s = o.length; s--;) i.call(o[s], "height" === t ? Math.max(e - (o[s].cutHeight || 0), 0) : "d" === t ? this.d : e, t, o[s])
            }, D.prototype.updateTransform = function() {
                var t, e = this,
                    i = e.translateX || 0,
                    o = e.translateY || 0,
                    s = e.scaleX,
                    r = e.scaleY,
                    n = e.inverted,
                    a = e.rotation,
                    l = e.matrix,
                    h = e.element;
                n && (i += e.width, o += e.height), t = ["translate(" + i + "," + o + ")"], y(l) && t.push("matrix(" + l.join(",") + ")"), n ? t.push("rotate(90) scale(-1,1)") : a && t.push("rotate(" + a + " " + P(this.rotationOriginX, h.getAttribute("x"), 0) + " " + P(this.rotationOriginY, h.getAttribute("y") || 0) + ")"), (y(s) || y(r)) && t.push("scale(" + P(s, 1) + " " + P(r, 1) + ")"), t.length && h.setAttribute("transform", t.join(" "))
            }, D.prototype.visibilitySetter = function(t, e, i) {
                "inherit" === t ? i.removeAttribute(e) : this[e] !== t && i.setAttribute(e, t), this[e] = t
            }, D.prototype.xGetter = function(t) {
                return "circle" === this.element.nodeName && ("x" === t ? t = "cx" : "y" === t && (t = "cy")), this._defaultGetter(t)
            }, D.prototype.zIndexSetter = function(t, e) {
                var i, o, s, r, n, a = this.renderer,
                    l = this.parentGroup,
                    h = (l || a).element || a.box,
                    c = this.element,
                    d = !1,
                    p = h === a.box,
                    u = this.added;
                if (y(t) ? (c.setAttribute("data-z-index", t), t = +t, this[e] === t && (u = !1)) : y(this[e]) && c.removeAttribute("data-z-index"), this[e] = t, u) {
                    for ((t = this.zIndex) && l && (l.handleZ = !0), n = (i = h.childNodes).length - 1; 0 <= n && !d; n--) s = (o = i[n]).getAttribute("data-z-index"), r = !y(s), o !== c && (t < 0 && r && !p && !n ? (h.insertBefore(c, i[n]), d = !0) : (C(s) <= t || r && (!y(t) || 0 <= t)) && (h.insertBefore(c, i[n + 1] || null), d = !0));
                    d || (h.insertBefore(c, i[p ? 3 : 0] || null), d = !0)
                }
                return d
            }, D);

        function D() {
            this.element = void 0, this.height = void 0, this.opacity = 1, this.renderer = void 0, this.SVG_NS = o, this.symbolCustomAttribs = ["x", "y", "width", "height", "r", "start", "end", "innerR", "anchorX", "anchorY", "rounded"], this.textProps = ["color", "cursor", "direction", "fontFamily", "fontSize", "fontStyle", "fontWeight", "lineHeight", "textAlign", "textDecoration", "textOutline", "textOverflow", "width"], this.width = void 0
        }
        return O.prototype["stroke-widthSetter"] = O.prototype.strokeSetter, O.prototype.yGetter = O.prototype.xGetter, O.prototype.matrixSetter = O.prototype.rotationOriginXSetter = O.prototype.rotationOriginYSetter = O.prototype.rotationSetter = O.prototype.scaleXSetter = O.prototype.scaleYSetter = O.prototype.translateXSetter = O.prototype.translateYSetter = O.prototype.verticalAlignSetter = function(t, e) {
            this[e] = t, this.doTransform = !0
        }, l.SVGElement = O, l.SVGElement
    }), e(t, "parts/SvgRenderer.js", [t["parts/Color.js"], t["parts/Globals.js"], t["parts/SVGElement.js"], t["parts/Utilities.js"]], function(t, e, z, i) {
        var o = t.parse,
            x = i.addEvent,
            C = i.attr,
            g = i.createElement,
            L = i.css,
            R = i.defined,
            s = i.destroyObjectProperties,
            W = (i.erase, i.extend),
            r = i.isArray,
            G = i.isNumber,
            l = i.isObject,
            n = i.isString,
            N = i.merge,
            c = i.objectEach,
            E = i.pick,
            d = i.pInt,
            X = i.removeEvent,
            a = i.splat,
            h = (i.stop, i.uniqueKey),
            m = e.charts,
            p = e.deg2rad,
            O = e.doc,
            u = (e.hasTouch, e.isFirefox),
            v = e.isMS,
            f = e.isWebKit,
            y = e.noop,
            D = e.svg,
            B = e.SVG_NS,
            b = e.symbolSizes,
            k = e.win,
            M = e.SVGRenderer = function() {
                this.init.apply(this, arguments)
            };
        W(M.prototype, {
            Element: z,
            SVG_NS: B,
            init: function(t, e, i, o, s, r, n) {
                var a, l, h, c = this,
                    d = c.createElement("svg").attr({
                        version: "1.1",
                        class: "highcharts-root"
                    });
                n || d.css(this.getStyle(o)), a = d.element, t.appendChild(a), C(t, "dir", "ltr"), -1 === t.innerHTML.indexOf("xmlns") && C(a, "xmlns", this.SVG_NS), c.isSVG = !0, this.box = a, this.boxWrapper = d, c.alignedObjects = [], this.url = (u || f) && O.getElementsByTagName("base").length ? k.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", this.createElement("desc").add().element.appendChild(O.createTextNode("Created with Highcharts 8.1.0")), c.defs = this.createElement("defs").add(), c.allowHTML = r, c.forExport = s, c.styledMode = n, c.gradients = {}, c.cache = {}, c.cacheKeys = [], c.imgCount = 0, c.setSize(e, i, !1), u && t.getBoundingClientRect && ((l = function() {
                    L(t, {
                        left: 0,
                        top: 0
                    }), h = t.getBoundingClientRect(), L(t, {
                        left: Math.ceil(h.left) - h.left + "px",
                        top: Math.ceil(h.top) - h.top + "px"
                    })
                })(), c.unSubPixelFix = x(k, "resize", l))
            },
            definition: function(t) {
                var n = this;
                return function o(t, s) {
                    var r;
                    return a(t).forEach(function(t) {
                        var e = n.createElement(t.tagName),
                            i = {};
                        c(t, function(t, e) {
                            "tagName" !== e && "children" !== e && "textContent" !== e && (i[e] = t)
                        }), e.attr(i), e.add(s || n.defs), t.textContent && e.element.appendChild(O.createTextNode(t.textContent)), o(t.children || [], e), r = e
                    }), r
                }(t)
            },
            getStyle: function(t) {
                return this.style = W({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, t), this.style
            },
            setStyle: function(t) {
                this.boxWrapper.css(this.getStyle(t))
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var t = this,
                    e = t.defs;
                return t.box = null, t.boxWrapper = t.boxWrapper.destroy(), s(t.gradients || {}), t.gradients = null, e && (t.defs = e.destroy()), t.unSubPixelFix && t.unSubPixelFix(), t.alignedObjects = null
            },
            createElement: function(t) {
                var e = new this.Element;
                return e.init(this, t), e
            },
            draw: y,
            getRadialAttr: function(t, e) {
                return {
                    cx: t[0] - t[2] / 2 + e.cx * t[2],
                    cy: t[1] - t[2] / 2 + e.cy * t[2],
                    r: e.r * t[2]
                }
            },
            truncate: function(o, s, r, n, a, t, l) {
                function h(t) {
                    s.firstChild && s.removeChild(s.firstChild), t && s.appendChild(O.createTextNode(t))
                }

                function e(t, e) {
                    var i = e || t;
                    if (void 0 === x[i])
                        if (s.getSubStringLength) try {
                            x[i] = a + s.getSubStringLength(0, n ? i + 1 : i)
                        } catch (t) {} else p.getSpanWidth && (h(l(r || n, t)), x[i] = a + p.getSpanWidth(o, s));
                    return x[i]
                }
                var i, c, d, p = this,
                    u = o.rotation,
                    f = n ? 1 : 0,
                    g = (r || n).length,
                    m = g,
                    x = [];
                if (o.rotation = 0, c = e(s.textContent.length), d = t < a + c) {
                    for (; f <= g;) m = Math.ceil((f + g) / 2), n && (i = l(n, m)), c = e(m, i && i.length - 1), f === g ? f = g + 1 : t < c ? g = m - 1 : f = m;
                    0 === g ? h("") : r && g === r.length - 1 || h(i || l(r || n, m))
                }
                return n && n.splice(0, m), o.actualWidth = c, o.rotation = u, d
            },
            escapes: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                "'": "&#39;",
                '"': "&quot;"
            },
            buildText: function(f) {
                function g(t) {
                    var e;
                    return k.styledMode || (e = /(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : P || k.style.fontSize || 12), s ? d(s) : k.fontMetrics(e, t.getAttribute("style") ? t : b).h
                }

                function m(i, o) {
                    return c(k.escapes, function(t, e) {
                        o && -1 !== o.indexOf(t) || (i = i.toString().replace(new RegExp(t, "g"), e))
                    }), i
                }

                function x(t, e) {
                    var i, o = t.indexOf("<");
                    if (-1 !== (o = (t = t.substring(o, t.indexOf(">") - o)).indexOf(e + "=")) && (o = o + e.length + 1, '"' === (i = t.charAt(o)) || "'" === i)) return (t = t.substring(o + 1)).substring(0, t.indexOf(i))
                }
                var v, y, b = f.element,
                    k = this,
                    M = k.forExport,
                    t = E(f.textStr, "").toString(),
                    e = -1 !== t.indexOf("<"),
                    i = b.childNodes,
                    w = C(b, "x"),
                    o = f.styles,
                    S = f.textWidth,
                    s = o && o.lineHeight,
                    r = o && o.textOutline,
                    A = o && "ellipsis" === o.textOverflow,
                    T = o && "nowrap" === o.whiteSpace,
                    P = o && o.fontSize,
                    n = i.length,
                    a = S && !f.added && this.box,
                    l = /<br.*?>/g,
                    h = [t, A, T, s, r, P, S].join(",");
                if (h !== f.textCache) {
                    for (f.textCache = h; n--;) b.removeChild(i[n]);
                    e || r || A || S || -1 !== t.indexOf(" ") && (!T || l.test(t)) ? (a && a.appendChild(b), (e ? (k.styledMode ? t.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g, '<span class="highcharts-emphasized">') : t.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">')).replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(l) : [t]).filter(function(t) {
                        return "" !== t
                    }).forEach(function(t, c) {
                        var d, p = 0,
                            u = 0;
                        t = t.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||"), (d = t.split("|||")).forEach(function(t) {
                            if ("" !== t || 1 === d.length) {
                                var e, i, o = {},
                                    s = O.createElementNS(k.SVG_NS, "tspan"),
                                    r = x(t, "class");
                                if (r && C(s, "class", r), (e = x(t, "style")) && (e = e.replace(/(;| |^)color([ :])/, "$1fill$2"), C(s, "style", e)), (i = x(t, "href")) && !M && (C(s, "onclick", 'location.href="' + i + '"'), C(s, "class", "highcharts-anchor"), k.styledMode || L(s, {
                                        cursor: "pointer"
                                    })), " " !== (t = m(t.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " "))) {
                                    if (s.appendChild(O.createTextNode(t)), p ? o.dx = 0 : c && null !== w && (o.x = w), C(s, o), b.appendChild(s), !p && y && (!D && M && L(s, {
                                            display: "block"
                                        }), C(s, "dy", g(s))), S) {
                                        var n = t.replace(/([^\^])-/g, "$1- ").split(" "),
                                            a = !T && (1 < d.length || c || 1 < n.length),
                                            l = 0,
                                            h = g(s);
                                        if (A) v = k.truncate(f, s, t, void 0, 0, Math.max(0, S - parseInt(P || 12, 10)), function(t, e) {
                                            return t.substring(0, e) + "…"
                                        });
                                        else if (a)
                                            for (; n.length;) n.length && !T && 0 < l && (s = O.createElementNS(B, "tspan"), C(s, {
                                                dy: h,
                                                x: w
                                            }), e && C(s, "style", e), s.appendChild(O.createTextNode(n.join(" ").replace(/- /g, "-"))), b.appendChild(s)), k.truncate(f, s, null, n, 0 === l ? u : 0, S, function(t, e) {
                                                return n.slice(0, e).join(" ").replace(/- /g, "-")
                                            }), u = f.actualWidth, l++
                                    }
                                    p++
                                }
                            }
                        }), y = y || b.childNodes.length
                    }), A && v && f.attr("title", m(f.textStr, ["&lt;", "&gt;"])), a && a.removeChild(b), r && f.applyTextOutline && f.applyTextOutline(r)) : b.appendChild(O.createTextNode(m(t)))
                }
            },
            getContrast: function(t) {
                return (t = o(t).rgba)[0] *= 1, t[1] *= 1.2, t[2] *= .5, 459 < t[0] + t[1] + t[2] ? "#000000" : "#FFFFFF"
            },
            button: function(t, e, i, o, s, r, n, a, l, h) {
                var c, d, p, u, f = this.label(t, e, i, l, void 0, void 0, h, void 0, "button"),
                    g = 0,
                    m = this.styledMode;
                return f.attr(N({
                    padding: 8,
                    r: 2
                }, s)), m || (s = N({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {
                        color: "#333333",
                        cursor: "pointer",
                        fontWeight: "normal"
                    }
                }, s), c = s.style, delete s.style, r = N(s, {
                    fill: "#e6e6e6"
                }, r), d = r.style, delete r.style, n = N(s, {
                    fill: "#e6ebf5",
                    style: {
                        color: "#000000",
                        fontWeight: "bold"
                    }
                }, n), p = n.style, delete n.style, a = N(s, {
                    style: {
                        color: "#cccccc"
                    }
                }, a), u = a.style, delete a.style), x(f.element, v ? "mouseover" : "mouseenter", function() {
                    3 !== g && f.setState(1)
                }), x(f.element, v ? "mouseout" : "mouseleave", function() {
                    3 !== g && f.setState(g)
                }), f.setState = function(t) {
                    1 !== t && (f.state = g = t), f.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][t || 0]), m || f.attr([s, r, n, a][t || 0]).css([c, d, p, u][t || 0])
                }, m || f.attr(s).css(W({
                    cursor: "default"
                }, c)), f.on("click", function(t) {
                    3 !== g && o.call(f, t)
                })
            },
            crispLine: function(t, e, i) {
                void 0 === i && (i = "round");
                var o = t[0],
                    s = t[1];
                return o[1] === s[1] && (o[1] = s[1] = Math[i](o[1]) - e % 2 / 2), o[2] === s[2] && (o[2] = s[2] = Math[i](o[2]) + e % 2 / 2), t
            },
            path: function(t) {
                var e = this.styledMode ? {} : {
                    fill: "none"
                };
                return r(t) ? e.d = t : l(t) && W(e, t), this.createElement("path").attr(e)
            },
            circle: function(t, e, i) {
                var o = l(t) ? t : void 0 === t ? {} : {
                        x: t,
                        y: e,
                        r: i
                    },
                    s = this.createElement("circle");
                return s.xSetter = s.ySetter = function(t, e, i) {
                    i.setAttribute("c" + e, t)
                }, s.attr(o)
            },
            arc: function(t, e, i, o, s, r) {
                var n, a;
                return l(t) ? (e = (a = t).y, i = a.r, o = a.innerR, s = a.start, r = a.end, t = a.x) : a = {
                    innerR: o,
                    start: s,
                    end: r
                }, (n = this.symbol("arc", t, e, i, i, a)).r = i, n
            },
            rect: function(t, e, i, o, s, r) {
                s = l(t) ? t.r : s;
                var n = this.createElement("rect"),
                    a = l(t) ? t : void 0 === t ? {} : {
                        x: t,
                        y: e,
                        width: Math.max(i, 0),
                        height: Math.max(o, 0)
                    };
                return this.styledMode || (void 0 !== r && (a.strokeWidth = r, a = n.crisp(a)), a.fill = "none"), s && (a.r = s), n.rSetter = function(t, e, i) {
                    n.r = t, C(i, {
                        rx: t,
                        ry: t
                    })
                }, n.rGetter = function() {
                    return n.r
                }, n.attr(a)
            },
            setSize: function(t, e, i) {
                var o = this.alignedObjects,
                    s = o.length;
                for (this.width = t, this.height = e, this.boxWrapper.animate({
                        width: t,
                        height: e
                    }, {
                        step: function() {
                            this.attr({
                                viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")
                            })
                        },
                        duration: E(i, !0) ? void 0 : 0
                    }); s--;) o[s].align()
            },
            g: function(t) {
                var e = this.createElement("g");
                return t ? e.attr({
                    class: "highcharts-" + t
                }) : e
            },
            image: function(e, t, i, o, s, r) {
                function n(t, e) {
                    t.setAttributeNS ? t.setAttributeNS("http://www.w3.org/1999/xlink", "href", e) : t.setAttribute("hc-svg-href", e)
                }

                function a(t) {
                    n(l.element, e), r.call(l, t)
                }
                var l, h, c = {
                    preserveAspectRatio: "none"
                };
                return 1 < arguments.length && W(c, {
                    x: t,
                    y: i,
                    width: o,
                    height: s
                }), l = this.createElement("image").attr(c), r ? (n(l.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="), h = new k.Image, x(h, "load", a), h.src = e, h.complete && a({})) : n(l.element, e), l
            },
            symbol: function(t, e, i, o, s, r) {
                var n, a, l, h, c = this,
                    d = /^url\((.*?)\)$/,
                    p = d.test(t),
                    u = !p && (this.symbols[t] ? t : "circle"),
                    f = u && this.symbols[u];
                return f ? ("number" == typeof e && (a = f.call(this.symbols, Math.round(e || 0), Math.round(i || 0), o, s, r)), n = this.path(a), c.styledMode || n.attr("fill", "none"), W(n, {
                    symbolName: u,
                    x: e,
                    y: i,
                    width: o,
                    height: s
                }), r && W(n, r)) : p && (l = t.match(d)[1], (n = this.image(l)).imgwidth = E(b[l] && b[l].width, r && r.width), n.imgheight = E(b[l] && b[l].height, r && r.height), h = function() {
                    n.attr({
                        width: n.width,
                        height: n.height
                    })
                }, ["width", "height"].forEach(function(t) {
                    n[t + "Setter"] = function(t, e) {
                        var i = {},
                            o = this["img" + e],
                            s = "width" === e ? "translateX" : "translateY";
                        this[e] = t, R(o) && (r && "within" === r.backgroundSize && this.width && this.height && (o = Math.round(o * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(e, o), this.alignByTranslate || (i[s] = ((this[e] || 0) - o) / 2, this.attr(i)))
                    }
                }), R(e) && n.attr({
                    x: e,
                    y: i
                }), n.isImg = !0, R(n.imgwidth) && R(n.imgheight) ? h() : (n.attr({
                    width: 0,
                    height: 0
                }), g("img", {
                    onload: function() {
                        var t = m[c.chartIndex];
                        0 === this.width && (L(this, {
                            position: "absolute",
                            top: "-999em"
                        }), O.body.appendChild(this)), b[l] = {
                            width: this.width,
                            height: this.height
                        }, n.imgwidth = this.width, n.imgheight = this.height, n.element && h(), this.parentNode && this.parentNode.removeChild(this), c.imgCount--, c.imgCount || !t || t.hasLoaded || t.onload()
                    },
                    src: l
                }), this.imgCount++)), n
            },
            symbols: {
                circle: function(t, e, i, o) {
                    return this.arc(t + i / 2, e + o / 2, i / 2, o / 2, {
                        start: .5 * Math.PI,
                        end: 2.5 * Math.PI,
                        open: !1
                    })
                },
                square: function(t, e, i, o) {
                    return [
                        ["M", t, e],
                        ["L", t + i, e],
                        ["L", t + i, e + o],
                        ["L", t, e + o],
                        ["Z"]
                    ]
                },
                triangle: function(t, e, i, o) {
                    return [
                        ["M", t + i / 2, e],
                        ["L", t + i, e + o],
                        ["L", t, e + o],
                        ["Z"]
                    ]
                },
                "triangle-down": function(t, e, i, o) {
                    return [
                        ["M", t, e],
                        ["L", t + i, e],
                        ["L", t + i / 2, e + o],
                        ["Z"]
                    ]
                },
                diamond: function(t, e, i, o) {
                    return [
                        ["M", t + i / 2, e],
                        ["L", t + i, e + o / 2],
                        ["L", t + i / 2, e + o],
                        ["L", t, e + o / 2],
                        ["Z"]
                    ]
                },
                arc: function(t, e, i, o, s) {
                    var r = s.start,
                        n = s.r || i,
                        a = s.r || o || i,
                        l = Math.abs(s.end - s.start - 2 * Math.PI) < .001,
                        h = s.end - .001,
                        c = s.innerR,
                        d = E(s.open, l),
                        p = Math.cos(r),
                        u = Math.sin(r),
                        f = Math.cos(h),
                        g = Math.sin(h),
                        m = E(s.longArc, s.end - r - Math.PI < .001 ? 0 : 1),
                        x = [
                            ["M", t + n * p, e + a * u],
                            ["A", n, a, 0, m, E(s.clockwise, 1), t + n * f, e + a * g]
                        ];
                    return R(c) && x.push(d ? ["M", t + c * f, e + c * g] : ["L", t + c * f, e + c * g], ["A", c, c, 0, m, R(s.clockwise) ? 1 - s.clockwise : 0, t + c * p, e + c * u]), d || x.push(["Z"]), x
                },
                callout: function(t, e, i, o, s) {
                    var r = Math.min(s && s.r || 0, i, o),
                        n = r + 6,
                        a = s && s.anchorX,
                        l = s && s.anchorY,
                        h = [
                            ["M", t + r, e],
                            ["L", t + i - r, e],
                            ["C", t + i, e, t + i, e, t + i, e + r],
                            ["L", t + i, e + o - r],
                            ["C", t + i, e + o, t + i, e + o, t + i - r, e + o],
                            ["L", t + r, e + o],
                            ["C", t, e + o, t, e + o, t, e + o - r],
                            ["L", t, e + r],
                            ["C", t, e, t, e, t + r, e]
                        ];
                    return a && i < a ? e + n < l && l < e + o - n ? h.splice(3, 1, ["L", t + i, l - 6], ["L", t + i + 6, l], ["L", t + i, l + 6], ["L", t + i, e + o - r]) : h.splice(3, 1, ["L", t + i, o / 2], ["L", a, l], ["L", t + i, o / 2], ["L", t + i, e + o - r]) : a && a < 0 ? e + n < l && l < e + o - n ? h.splice(7, 1, ["L", t, l + 6], ["L", t - 6, l], ["L", t, l - 6], ["L", t, e + r]) : h.splice(7, 1, ["L", t, o / 2], ["L", a, l], ["L", t, o / 2], ["L", t, e + r]) : l && o < l && t + n < a && a < t + i - n ? h.splice(5, 1, ["L", a + 6, e + o], ["L", a, e + o + 6], ["L", a - 6, e + o], ["L", t + r, e + o]) : l && l < 0 && t + n < a && a < t + i - n && h.splice(1, 1, ["L", a - 6, e], ["L", a, e - 6], ["L", a + 6, e], ["L", i - r, e]), h
                }
            },
            clipRect: function(t, e, i, o) {
                var s = h() + "-",
                    r = this.createElement("clipPath").attr({
                        id: s
                    }).add(this.defs),
                    n = this.rect(t, e, i, o, 0).add(r);
                return n.id = s, n.clipPath = r, n.count = 0, n
            },
            text: function(t, e, i, o) {
                var s, r = {};
                return !o || !this.allowHTML && this.forExport ? (r.x = Math.round(e || 0), i && (r.y = Math.round(i)), R(t) && (r.text = t), s = this.createElement("text").attr(r), o || (s.xSetter = function(t, e, i) {
                    for (var o, s = i.getElementsByTagName("tspan"), r = i.getAttribute(e), n = 0; n < s.length; n++)(o = s[n]).getAttribute(e) === r && o.setAttribute(e, t);
                    i.setAttribute(e, t)
                }), s) : this.html(t, e, i)
            },
            fontMetrics: function(t, e) {
                var i;
                return t = !this.styledMode && /px/.test(t) || !k.getComputedStyle ? t || e && e.style && e.style.fontSize || this.style && this.style.fontSize : e && z.prototype.getStyle.call(e, "font-size"), {
                    h: i = (t = /px/.test(t) ? d(t) : 12) < 24 ? t + 3 : Math.round(1.2 * t),
                    b: Math.round(.8 * i),
                    f: t
                }
            },
            rotCorr: function(t, e, i) {
                var o = t;
                return e && i && (o = Math.max(o * Math.cos(e * p), 4)), {
                    x: -t / 3 * Math.sin(e * p),
                    y: o
                }
            },
            pathToSegments: function(t) {
                for (var e = [], i = [], o = {
                        A: 8,
                        C: 7,
                        H: 2,
                        L: 3,
                        M: 3,
                        Q: 5,
                        S: 5,
                        T: 3,
                        V: 2
                    }, s = 0; s < t.length; s++) n(i[0]) && G(t[s]) && i.length === o[i[0].toUpperCase()] && t.splice(s, 0, i[0].replace("M", "L").replace("m", "l")), "string" == typeof t[s] && (i.length && e.push(i.slice(0)), i.length = 0), i.push(t[s]);
                return e.push(i.slice(0)), e
            },
            label: function(t, e, i, o, s, r, n, a, l) {
                function h() {
                    return M ? c.strokeWidth() % 2 / 2 : (m ? parseInt(m, 10) : 0) % 2 / 2
                }
                var c, d, p, u, f, g, m, x, v, y, b, k = this,
                    M = k.styledMode,
                    w = k.g("button" !== l && "label"),
                    S = w.text = k.text("", 0, 0, n).attr({
                        zIndex: 1
                    }),
                    A = {
                        width: 0,
                        height: 0,
                        x: 0,
                        y: 0
                    },
                    T = A,
                    P = 0,
                    C = 3,
                    L = 0,
                    E = {},
                    O = /^url\((.*?)\)$/.test(o),
                    D = M || O;
                l && w.addClass("highcharts-" + l), v = function() {
                    var t, e = S.element.style,
                        i = {};
                    T = G(d) && G(p) && !g || !R(S.textStr) ? A : S.getBBox(), w.width = (d || T.width || 0) + 2 * C + L, w.height = (p || T.height || 0) + 2 * C, x = C + Math.min(k.fontMetrics(e && e.fontSize, S).b, T.height || 1 / 0), D && (c || (w.box = c = k.symbols[o] || O ? k.symbol(o) : k.rect(), c.addClass(("button" === l ? "" : "highcharts-label-box") + (l ? " highcharts-" + l + "-box" : "")), c.add(w), t = h(), i.x = t, i.y = (a ? -x : 0) + t), i.width = Math.round(w.width), i.height = Math.round(w.height), c.attr(W(i, E)), E = {})
                }, y = function() {
                    var t = L + C,
                        e = a ? 0 : x;
                    R(d) && T && ("center" === g || "right" === g) && (t += {
                        center: .5,
                        right: 1
                    }[g] * (d - T.width)), t === S.x && e === S.y || (S.attr("x", t), S.hasBoxWidthChanged && (T = S.getBBox(!0), v()), void 0 !== e && S.attr("y", e)), S.x = t, S.y = e
                }, b = function(t, e) {
                    c ? c.attr(t, e) : E[t] = e
                }, w.onAdd = function() {
                    S.add(w), w.attr({
                        text: t || 0 === t ? t : "",
                        x: e,
                        y: i
                    }), c && R(s) && w.attr({
                        anchorX: s,
                        anchorY: r
                    })
                }, w.widthSetter = function(t) {
                    d = G(t) ? t : null
                }, w.heightSetter = function(t) {
                    p = t
                }, w["text-alignSetter"] = function(t) {
                    g = t
                }, w.paddingSetter = function(t) {
                    R(t) && t !== C && (C = w.padding = t, y())
                }, w.paddingLeftSetter = function(t) {
                    R(t) && t !== L && (L = t, y())
                }, w.alignSetter = function(t) {
                    (t = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[t]) !== P && (P = t, T && w.attr({
                        x: u
                    }))
                }, w.textSetter = function(t) {
                    void 0 !== t && S.attr({
                        text: t
                    }), v(), y()
                }, w["stroke-widthSetter"] = function(t, e) {
                    t && (D = !0), m = this["stroke-width"] = t, b(e, t)
                }, M ? w.rSetter = function(t, e) {
                    b(e, t)
                } : w.strokeSetter = w.fillSetter = w.rSetter = function(t, e) {
                    "r" !== e && ("fill" === e && t && (D = !0), w[e] = t), b(e, t)
                }, w.anchorXSetter = function(t, e) {
                    s = w.anchorX = t, b(e, Math.round(t) - h() - u)
                }, w.anchorYSetter = function(t, e) {
                    r = w.anchorY = t, b(e, t - f)
                }, w.xSetter = function(t) {
                    w.x = t, P && (t -= P * ((d || T.width) + 2 * C), w["forceAnimate:x"] = !0), u = Math.round(t), w.attr("translateX", u)
                }, w.ySetter = function(t) {
                    f = w.y = Math.round(t), w.attr("translateY", f)
                }, w.isLabel = !0;
                var B = w.css,
                    I = {
                        css: function(e) {
                            var i, t;
                            return e && (i = {}, e = N(e), w.textProps.forEach(function(t) {
                                void 0 !== e[t] && (i[t] = e[t], delete e[t])
                            }), S.css(i), t = "fontSize" in i || "fontWeight" in i, ("width" in i || t) && (v(), t && y())), B.call(w, e)
                        },
                        getBBox: function() {
                            return {
                                width: T.width + 2 * C,
                                height: T.height + 2 * C,
                                x: T.x - C,
                                y: T.y - C
                            }
                        },
                        destroy: function() {
                            X(w.element, "mouseenter"), X(w.element, "mouseleave"), S && S.destroy(), c = c && c.destroy(), z.prototype.destroy.call(w), w = k = S = v = y = b = null
                        }
                    };
                return w.on = function(e, i) {
                    var t, o = S && "SPAN" === S.element.tagName ? S : void 0;
                    return o && (t = function(t) {
                        ("mouseenter" === e || "mouseleave" === e) && t.relatedTarget instanceof Element && (w.element.contains(t.relatedTarget) || o.element.contains(t.relatedTarget)) || i.call(w.element, t)
                    }, o.on(e, t)), z.prototype.on.call(w, e, t || i), w
                }, M || (I.shadow = function(t) {
                    return t && (v(), c && c.shadow(t)), w
                }), W(w, I)
            }
        }), e.Renderer = M
    }), e(t, "parts/Html.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var c = e.attr,
            d = e.createElement,
            g = e.css,
            m = e.defined,
            p = e.extend,
            n = e.pick,
            x = e.pInt,
            r = t.isFirefox,
            i = t.isMS,
            o = t.isWebKit,
            a = t.SVGElement,
            s = t.SVGRenderer,
            l = t.win;
        p(a.prototype, {
            htmlCss: function(t) {
                var e, i = this,
                    o = "SPAN" === i.element.tagName && t && "width" in t,
                    s = n(o && t.width, void 0);
                return o && (delete t.width, i.textWidth = s, e = !0), t && "ellipsis" === t.textOverflow && (t.whiteSpace = "nowrap", t.overflow = "hidden"), i.styles = p(i.styles, t), g(i.element, t), e && i.htmlUpdateTransform(), i
            },
            htmlGetBBox: function() {
                var t = this.element;
                return {
                    x: t.offsetLeft,
                    y: t.offsetTop,
                    width: t.offsetWidth,
                    height: t.offsetHeight
                }
            },
            htmlUpdateTransform: function() {
                var t, e, i, o, s, r, n, a, l, h, c, d, p, u, f;
                this.added ? (e = (t = this).renderer, i = t.element, o = t.translateX || 0, s = t.translateY || 0, r = t.x || 0, n = t.y || 0, l = {
                    left: 0,
                    center: .5,
                    right: 1
                }[a = t.textAlign || "left"], h = t.styles, c = h && h.whiteSpace, g(i, {
                    marginLeft: o,
                    marginTop: s
                }), !e.styledMode && t.shadows && t.shadows.forEach(function(t) {
                    g(t, {
                        marginLeft: o + 1,
                        marginTop: s + 1
                    })
                }), t.inverted && [].forEach.call(i.childNodes, function(t) {
                    e.invertChild(t, i)
                }), "SPAN" === i.tagName && (d = t.rotation, u = t.textWidth && x(t.textWidth), f = [d, a, i.innerHTML, t.textWidth, t.textAlign].join(","), u !== t.oldTextWidth && (u > t.oldTextWidth || (t.textPxLength || (g(i, {
                    width: "",
                    whiteSpace: c || "nowrap"
                }), i.offsetWidth)) > u) && (/[ \-]/.test(i.textContent || i.innerText) || "ellipsis" === i.style.textOverflow) ? (g(i, {
                    width: u + "px",
                    display: "block",
                    whiteSpace: c || "normal"
                }), t.oldTextWidth = u, t.hasBoxWidthChanged = !0) : t.hasBoxWidthChanged = !1, f !== t.cTT && (p = e.fontMetrics(i.style.fontSize, i).b, !m(d) || d === (t.oldRotation || 0) && a === t.oldAlign || t.setSpanRotation(d, l, p), t.getSpanCorrection(!m(d) && t.textPxLength || i.offsetWidth, p, l, d, a)), g(i, {
                    left: r + (t.xCorr || 0) + "px",
                    top: n + (t.yCorr || 0) + "px"
                }), t.cTT = f, t.oldRotation = d, t.oldAlign = a)) : this.alignOnAdd = !0
            },
            setSpanRotation: function(t, e, i) {
                var o = {},
                    s = this.renderer.getTransformKey();
                o[s] = o.transform = "rotate(" + t + "deg)", o[s + (r ? "Origin" : "-origin")] = o.transformOrigin = 100 * e + "% " + i + "px", g(this.element, o)
            },
            getSpanCorrection: function(t, e, i) {
                this.xCorr = -t * i, this.yCorr = -e
            }
        }), p(s.prototype, {
            getTransformKey: function() {
                return i && !/Edge/.test(l.navigator.userAgent) ? "-ms-transform" : o ? "-webkit-transform" : r ? "MozTransform" : l.opera ? "-o-transform" : ""
            },
            html: function(t, e, i) {
                function l(r, n) {
                    ["opacity", "visibility"].forEach(function(s) {
                        r[s + "Setter"] = function(t, e, i) {
                            var o = r.div ? r.div.style : n;
                            a.prototype[s + "Setter"].call(this, t, e, i), o && (o[e] = t)
                        }
                    }), r.addedSetters = !0
                }
                var h = this.createElement("span"),
                    o = h.element,
                    s = h.renderer,
                    r = s.isSVG;
                return h.textSetter = function(t) {
                    t !== o.innerHTML && (delete this.bBox, delete this.oldTextWidth), this.textStr = t, o.innerHTML = n(t, ""), h.doTransform = !0
                }, r && l(h, h.element.style), h.xSetter = h.ySetter = h.alignSetter = h.rotationSetter = function(t, e) {
                    "align" === e && (e = "textAlign"), h[e] = t, h.doTransform = !0
                }, h.afterSetters = function() {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                }, h.attr({
                    text: t,
                    x: Math.round(e),
                    y: Math.round(i)
                }).css({
                    position: "absolute"
                }), s.styledMode || h.css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                }), o.style.whiteSpace = "nowrap", h.css = h.htmlCss, r && (h.add = function(t) {
                    var r, e, n = s.box.parentNode,
                        a = [];
                    if (this.parentGroup = t) {
                        if (!(r = t.div)) {
                            for (e = t; e;) a.push(e), e = e.parentGroup;
                            a.reverse().forEach(function(i) {
                                var o, e, t = c(i.element, "class");

                                function s(t, e) {
                                    i[e] = t, "translateX" === e ? o.left = t + "px" : o.top = t + "px", i.doTransform = !0
                                }
                                r = i.div = i.div || d("div", t ? {
                                    className: t
                                } : void 0, {
                                    position: "absolute",
                                    left: (i.translateX || 0) + "px",
                                    top: (i.translateY || 0) + "px",
                                    display: i.display,
                                    opacity: i.opacity,
                                    pointerEvents: i.styles && i.styles.pointerEvents
                                }, r || n), o = r.style, p(i, {
                                    classSetter: (e = r, function(t) {
                                        this.element.setAttribute("class", t), e.className = t
                                    }),
                                    on: function() {
                                        return a[0].div && h.on.apply({
                                            element: a[0].div
                                        }, arguments), i
                                    },
                                    translateXSetter: s,
                                    translateYSetter: s
                                }), i.addedSetters || l(i)
                            })
                        }
                    } else r = n;
                    return r.appendChild(o), h.added = !0, h.alignOnAdd && h.htmlUpdateTransform(), h
                }), h
            }
        })
    }), e(t, "parts/Tick.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var l = e.clamp,
            k = e.correctFloat,
            M = e.defined,
            i = e.destroyObjectProperties,
            w = e.extend,
            x = e.fireEvent,
            g = e.isNumber,
            n = e.merge,
            p = e.objectEach,
            S = e.pick,
            y = t.deg2rad,
            o = (s.prototype.addLabel = function() {
                var t, e, i, o, s, r = this,
                    n = r.axis,
                    a = n.options,
                    l = n.chart,
                    h = n.categories,
                    c = n.logarithmic,
                    d = n.names,
                    p = r.pos,
                    u = S(r.options && r.options.labels, a.labels),
                    f = n.tickPositions,
                    g = p === f[0],
                    m = p === f[f.length - 1],
                    x = this.parameters.category || (h ? S(h[p], d[p], p) : p),
                    v = r.label,
                    y = (!u.step || 1 === u.step) && 1 === n.tickInterval,
                    b = f.info;
                n.dateTime && b && (e = (i = l.time.resolveDTLFormat(a.dateTimeLabelFormats[!a.grid && b.higherRanks[p] || b.unitName])).main), r.isFirst = g, r.isLast = m, r.formatCtx = {
                    axis: n,
                    chart: l,
                    isFirst: g,
                    isLast: m,
                    dateTimeLabelFormat: e,
                    tickPositionInfo: b,
                    value: c ? k(c.lin2log(x)) : x,
                    pos: p
                }, t = n.labelFormatter.call(r.formatCtx, this.formatCtx), (s = i && i.list) && (r.shortenLabel = function() {
                    for (o = 0; o < s.length; o++)
                        if (v.attr({
                                text: n.labelFormatter.call(w(r.formatCtx, {
                                    dateTimeLabelFormat: s[o]
                                }))
                            }), v.getBBox().width < n.getSlotWidth(r) - 2 * S(u.padding, 5)) return;
                    v.attr({
                        text: ""
                    })
                }), y && n._addedPlotLB && n.isXAxis && r.moveLabel(t, u), M(v) || r.movedLabel ? v && v.textStr !== t && !y && (!v.textWidth || u.style && u.style.width || v.styles.width || v.css({
                    width: null
                }), v.attr({
                    text: t
                }), v.textPxLength = v.getBBox().width) : (r.label = v = r.createLabel({
                    x: 0,
                    y: 0
                }, t, u), r.rotation = 0)
            }, s.prototype.createLabel = function(t, e, i) {
                var o = this.axis,
                    s = o.chart,
                    r = M(e) && i.enabled ? s.renderer.text(e, t.x, t.y, i.useHTML).add(o.labelGroup) : null;
                return r && (s.styledMode || r.css(n(i.style)), r.textPxLength = r.getBBox().width), r
            }, s.prototype.destroy = function() {
                i(this, this.axis)
            }, s.prototype.getPosition = function(t, e, i, o) {
                var s = this.axis,
                    r = s.chart,
                    n = o && r.oldChartHeight || r.chartHeight,
                    a = {
                        x: t ? k(s.translate(e + i, null, null, o) + s.transB) : s.left + s.offset + (s.opposite ? (o && r.oldChartWidth || r.chartWidth) - s.right - s.left : 0),
                        y: t ? n - s.bottom + s.offset - (s.opposite ? s.height : 0) : k(n - s.translate(e + i, null, null, o) - s.transB)
                    };
                return a.y = l(a.y, -1e5, 1e5), x(this, "afterGetPosition", {
                    pos: a
                }), a
            }, s.prototype.getLabelPosition = function(t, e, i, o, s, r, n, a) {
                var l, h = this.axis,
                    c = h.transA,
                    d = h.isLinked && h.linkedParent ? h.linkedParent.reversed : h.reversed,
                    p = h.staggerLines,
                    u = h.tickRotCorr || {
                        x: 0,
                        y: 0
                    },
                    f = s.y,
                    g = o || h.reserveSpaceDefault ? 0 : -h.labelOffset * ("center" === h.labelAlign ? .5 : 1),
                    m = {};
                return M(f) || (f = 0 === h.side ? i.rotation ? -8 : -i.getBBox().height : 2 === h.side ? u.y + 8 : Math.cos(i.rotation * y) * (u.y - i.getBBox(!1, 0).height / 2)), t = t + s.x + g + u.x - (r && o ? r * c * (d ? -1 : 1) : 0), e = e + f - (r && !o ? r * c * (d ? 1 : -1) : 0), p && (l = n / (a || 1) % p, h.opposite && (l = p - l - 1), e += l * (h.labelOffset / p)), m.x = t, m.y = Math.round(e), x(this, "afterGetLabelPosition", {
                    pos: m,
                    tickmarkOffset: r,
                    index: n
                }), m
            }, s.prototype.getLabelSize = function() {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, s.prototype.getMarkPath = function(t, e, i, o, s, r) {
                return r.crispLine([
                    ["M", t, e],
                    ["L", t + (s ? 0 : -i), e + (s ? i : 0)]
                ], o)
            }, s.prototype.handleOverflow = function(t) {
                var e, i, o = this.axis,
                    s = o.options.labels,
                    r = t.x,
                    n = o.chart.chartWidth,
                    a = o.chart.spacing,
                    l = S(o.labelLeft, Math.min(o.pos, a[3])),
                    h = S(o.labelRight, Math.max(o.isRadial ? 0 : o.pos + o.len, n - a[1])),
                    c = this.label,
                    d = this.rotation,
                    p = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[o.labelAlign || c.attr("align")],
                    u = c.getBBox().width,
                    f = o.getSlotWidth(this),
                    g = f,
                    m = p,
                    x = 1,
                    v = {};
                d || "justify" !== S(s.overflow, "justify") ? d < 0 && r - p * u < l ? i = Math.round(r / Math.cos(d * y) - l) : 0 < d && h < r + p * u && (i = Math.round((n - r) / Math.cos(d * y))) : (e = r + (1 - p) * u, r - p * u < l ? g = t.x + g * (1 - p) - l : h < e && (g = h - t.x + g * p, x = -1), (g = Math.min(f, g)) < f && "center" === o.labelAlign && (t.x += x * (f - g - m * (f - Math.min(u, g)))), (g < u || o.autoRotation && (c.styles || {}).width) && (i = g)), i && (this.shortenLabel ? this.shortenLabel() : (v.width = Math.floor(i) + "px", (s.style || {}).textOverflow || (v.textOverflow = "ellipsis"), c.css(v)))
            }, s.prototype.moveLabel = function(e, t) {
                var i, o, s, r = this,
                    n = r.label,
                    a = !1,
                    l = r.axis,
                    h = l.chart,
                    c = l.reversed,
                    d = h.inverted;
                n && n.textStr === e ? (r.movedLabel = n, a = !0, delete r.label) : p(l.ticks, function(t) {
                    a || t.isNew || t === r || !t.label || t.label.textStr !== e || (r.movedLabel = t.label, a = !0, t.labelPos = r.movedLabel.xy, delete t.label)
                }), a || !r.labelPos && !n || (i = r.labelPos || n.xy, o = d ? i.x : c ? 0 : l.width + l.left, s = d ? c ? l.width + l.left : 0 : i.y, r.movedLabel = r.createLabel({
                    x: o,
                    y: s
                }, e, t), r.movedLabel && r.movedLabel.attr({
                    opacity: 0
                }))
            }, s.prototype.render = function(t, e, i) {
                var o = this,
                    s = o.axis,
                    r = s.horiz,
                    n = o.pos,
                    a = S(o.tickmarkOffset, s.tickmarkOffset),
                    l = o.getPosition(r, n, a, e),
                    h = l.x,
                    c = l.y,
                    d = r && h === s.pos + s.len || !r && c === s.pos ? -1 : 1;
                i = S(i, 1), this.isActive = !0, this.renderGridLine(e, i, d), this.renderMark(l, i, d), this.renderLabel(l, e, i, t), o.isNew = !1, x(this, "afterRender")
            }, s.prototype.renderGridLine = function(t, e, i) {
                var o, s = this,
                    r = s.axis,
                    n = r.options,
                    a = s.gridLine,
                    l = {},
                    h = s.pos,
                    c = s.type,
                    d = S(s.tickmarkOffset, r.tickmarkOffset),
                    p = r.chart.renderer,
                    u = c ? c + "Grid" : "grid",
                    f = n[u + "LineWidth"],
                    g = n[u + "LineColor"],
                    m = n[u + "LineDashStyle"];
                a || (r.chart.styledMode || (l.stroke = g, l["stroke-width"] = f, m && (l.dashstyle = m)), c || (l.zIndex = 1), t && (e = 0), s.gridLine = a = p.path().attr(l).addClass("highcharts-" + (c ? c + "-" : "") + "grid-line").add(r.gridGroup)), a && (o = r.getPlotLinePath({
                    value: h + d,
                    lineWidth: a.strokeWidth() * i,
                    force: "pass",
                    old: t
                })) && a[t || s.isNew ? "attr" : "animate"]({
                    d: o,
                    opacity: e
                })
            }, s.prototype.renderMark = function(t, e, i) {
                var o = this,
                    s = o.axis,
                    r = s.options,
                    n = s.chart.renderer,
                    a = o.type,
                    l = a ? a + "Tick" : "tick",
                    h = s.tickSize(l),
                    c = o.mark,
                    d = !c,
                    p = t.x,
                    u = t.y,
                    f = S(r[l + "Width"], !a && s.isXAxis ? 1 : 0),
                    g = r[l + "Color"];
                h && (s.opposite && (h[0] = -h[0]), d && (o.mark = c = n.path().addClass("highcharts-" + (a ? a + "-" : "") + "tick").add(s.axisGroup), s.chart.styledMode || c.attr({
                    stroke: g,
                    "stroke-width": f
                })), c[d ? "attr" : "animate"]({
                    d: o.getMarkPath(p, u, h[0], c.strokeWidth() * i, s.horiz, n),
                    opacity: e
                }))
            }, s.prototype.renderLabel = function(t, e, i, o) {
                var s = this,
                    r = s.axis,
                    n = r.horiz,
                    a = r.options,
                    l = s.label,
                    h = a.labels,
                    c = h.step,
                    d = S(s.tickmarkOffset, r.tickmarkOffset),
                    p = !0,
                    u = t.x,
                    f = t.y;
                l && g(u) && (l.xy = t = s.getLabelPosition(u, f, l, n, h, d, o, c), s.isFirst && !s.isLast && !S(a.showFirstLabel, 1) || s.isLast && !s.isFirst && !S(a.showLastLabel, 1) ? p = !1 : !n || h.step || h.rotation || e || 0 === i || s.handleOverflow(t), c && o % c && (p = !1), p && g(t.y) ? (t.opacity = i, l[s.isNewLabel ? "attr" : "animate"](t), s.isNewLabel = !1) : (l.attr("y", -9999), s.isNewLabel = !0))
            }, s.prototype.replaceMovedLabel = function() {
                var t, e, i = this,
                    o = i.label,
                    s = i.axis,
                    r = s.reversed,
                    n = i.axis.chart.inverted;
                o && !i.isNew && (t = n ? o.xy.x : r ? s.left : s.width + s.left, e = n ? r ? s.width + s.top : s.top : o.xy.y, o.animate({
                    x: t,
                    y: e,
                    opacity: 0
                }, void 0, o.destroy), delete i.label), s.isDirty = !0, i.label = i.movedLabel, delete i.movedLabel
            }, s);

        function s(t, e, i, o, s) {
            this.isNew = !0, this.isNewLabel = !0, this.axis = t, this.pos = e, this.type = i || "", this.parameters = s || {}, this.tickmarkOffset = this.parameters.tickmarkOffset, this.options = this.parameters.options, x(this, "init"), i || o || this.addLabel()
        }
        return t.Tick = o, t.Tick
    }), e(t, "parts/Time.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var y = e.defined,
            o = e.error,
            b = e.extend,
            i = e.isObject,
            s = e.merge,
            g = e.objectEach,
            m = e.pad,
            k = e.pick,
            r = e.splat,
            M = e.timeUnits,
            x = t,
            n = x.win,
            a = (l.prototype.get = function(t, e) {
                if (this.variableTimezone || this.timezoneOffset) {
                    var i = e.getTime(),
                        o = i - this.getTimezoneOffset(e);
                    e.setTime(o);
                    var s = e["getUTC" + t]();
                    return e.setTime(i), s
                }
                return this.useUTC ? e["getUTC" + t]() : e["get" + t]()
            }, l.prototype.set = function(t, e, i) {
                if (this.variableTimezone || this.timezoneOffset) {
                    if ("Milliseconds" === t || "Seconds" === t || "Minutes" === t) return e["setUTC" + t](i);
                    var o = this.getTimezoneOffset(e),
                        s = e.getTime() - o;
                    e.setTime(s), e["setUTC" + t](i);
                    var r = this.getTimezoneOffset(e),
                        s = e.getTime() + r;
                    return e.setTime(s)
                }
                return this.useUTC ? e["setUTC" + t](i) : e["set" + t](i)
            }, l.prototype.update = function(t) {
                var e = k(t && t.useUTC, !0);
                this.options = t = s(!0, this.options || {}, t), this.Date = t.Date || n.Date || Date, this.useUTC = e, this.timezoneOffset = e && t.timezoneOffset, this.getTimezoneOffset = this.timezoneOffsetFunction(), this.variableTimezone = !(e && !t.getTimezoneOffset && !t.timezone)
            }, l.prototype.makeTime = function(t, e, i, o, s, r) {
                var n, a, l;
                return this.useUTC ? (n = this.Date.UTC.apply(0, arguments), n += a = this.getTimezoneOffset(n), a !== (l = this.getTimezoneOffset(n)) ? n += l - a : a - 36e5 !== this.getTimezoneOffset(n - 36e5) || x.isSafari || (n -= 36e5)) : n = new this.Date(t, e, k(i, 1), k(o, 0), k(s, 0), k(r, 0)).getTime(), n
            }, l.prototype.timezoneOffsetFunction = function() {
                var t = this,
                    e = this.options,
                    i = n.moment;
                if (!this.useUTC) return function(t) {
                    return 6e4 * new Date(t.toString()).getTimezoneOffset()
                };
                if (e.timezone) {
                    if (i) return function(t) {
                        return 6e4 * -i.tz(t, e.timezone).utcOffset()
                    };
                    o(25)
                }
                return this.useUTC && e.getTimezoneOffset ? function(t) {
                    return 6e4 * e.getTimezoneOffset(t.valueOf())
                } : function() {
                    return 6e4 * (t.timezoneOffset || 0)
                }
            }, l.prototype.dateFormat = function(i, o, t) {
                var e;
                if (!y(o) || isNaN(o)) return (null === (e = x.defaultOptions.lang) || void 0 === e ? void 0 : e.invalidDate) || "";
                i = k(i, "%Y-%m-%d %H:%M:%S");
                var s = this,
                    r = new this.Date(o),
                    n = this.get("Hours", r),
                    a = this.get("Day", r),
                    l = this.get("Date", r),
                    h = this.get("Month", r),
                    c = this.get("FullYear", r),
                    d = x.defaultOptions.lang,
                    p = null == d ? void 0 : d.weekdays,
                    u = null == d ? void 0 : d.shortWeekdays,
                    f = b({
                        a: u ? u[a] : p[a].substr(0, 3),
                        A: p[a],
                        d: m(l),
                        e: m(l, 2, " "),
                        w: a,
                        b: d.shortMonths[h],
                        B: d.months[h],
                        m: m(h + 1),
                        o: h + 1,
                        y: c.toString().substr(2, 2),
                        Y: c,
                        H: m(n),
                        k: n,
                        I: m(n % 12 || 12),
                        l: n % 12 || 12,
                        M: m(this.get("Minutes", r)),
                        p: n < 12 ? "AM" : "PM",
                        P: n < 12 ? "am" : "pm",
                        S: m(r.getSeconds()),
                        L: m(Math.floor(o % 1e3), 3)
                    }, x.dateFormats);
                return g(f, function(t, e) {
                    for (; - 1 !== i.indexOf("%" + e);) i = i.replace("%" + e, "function" == typeof t ? t.call(s, o) : t)
                }), t ? i.substr(0, 1).toUpperCase() + i.substr(1) : i
            }, l.prototype.resolveDTLFormat = function(t) {
                return i(t, !0) ? t : {
                    main: (t = r(t))[0],
                    from: t[1],
                    to: t[2]
                }
            }, l.prototype.getTimeTicks = function(t, e, i, o) {
                var s, r, n, a = this,
                    l = a.Date,
                    h = [],
                    c = {},
                    d = new l(e),
                    p = t.unitRange,
                    u = t.count || 1;
                if (o = k(o, 1), y(e)) {
                    a.set("Milliseconds", d, p >= M.second ? 0 : u * Math.floor(a.get("Milliseconds", d) / u)), p >= M.second && a.set("Seconds", d, p >= M.minute ? 0 : u * Math.floor(a.get("Seconds", d) / u)), p >= M.minute && a.set("Minutes", d, p >= M.hour ? 0 : u * Math.floor(a.get("Minutes", d) / u)), p >= M.hour && a.set("Hours", d, p >= M.day ? 0 : u * Math.floor(a.get("Hours", d) / u)), p >= M.day && a.set("Date", d, p >= M.month ? 1 : Math.max(1, u * Math.floor(a.get("Date", d) / u))), p >= M.month && (a.set("Month", d, p >= M.year ? 0 : u * Math.floor(a.get("Month", d) / u)), s = a.get("FullYear", d)), p >= M.year && (s -= s % u, a.set("FullYear", d, s)), p === M.week && (n = a.get("Day", d), a.set("Date", d, a.get("Date", d) - n + o + (n < o ? -7 : 0))), s = a.get("FullYear", d);
                    var f = a.get("Month", d),
                        g = a.get("Date", d),
                        m = a.get("Hours", d);
                    e = d.getTime(), a.variableTimezone && (r = i - e > 4 * M.month || a.getTimezoneOffset(e) !== a.getTimezoneOffset(i));
                    for (var x = d.getTime(), v = 1; x < i;) h.push(x), p === M.year ? x = a.makeTime(s + v * u, 0) : p === M.month ? x = a.makeTime(s, f + v * u) : !r || p !== M.day && p !== M.week ? r && p === M.hour && 1 < u ? x = a.makeTime(s, f, g, m + v * u) : x += p * u : x = a.makeTime(s, f, g + v * u * (p === M.day ? 1 : 7)), v++;
                    h.push(x), p <= M.hour && h.length < 1e4 && h.forEach(function(t) {
                        t % 18e5 == 0 && "000000000" === a.dateFormat("%H%M%S%L", t) && (c[t] = "day")
                    })
                }
                return h.info = b(t, {
                    higherRanks: c,
                    totalRange: p * u
                }), h
            }, l.defaultOptions = {
                Date: void 0,
                getTimezoneOffset: void 0,
                timezone: void 0,
                timezoneOffset: 0,
                useUTC: !0
            }, l);

        function l(t) {
            this.options = {}, this.useUTC = !1, this.variableTimezone = !1, this.Date = n.Date, this.getTimezoneOffset = this.timezoneOffsetFunction(), this.update(t)
        }
        return x.Time = a, x.Time
    }), e(t, "parts/Options.js", [t["parts/Globals.js"], t["parts/Time.js"], t["parts/Color.js"], t["parts/Utilities.js"]], function(o, t, e, i) {
        var s = e.parse,
            r = i.merge,
            n = o.isTouchDevice,
            a = o.svg;
        o.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                decimalPoint: ".",
                numericSymbols: ["k", "M", "G", "T", "P", "E"],
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: t.defaultOptions,
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {
                    theme: {
                        zIndex: 6
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                widthAdjust: -44
            },
            subtitle: {
                text: "",
                align: "center",
                widthAdjust: -44
            },
            caption: {
                margin: 15,
                text: "",
                align: "left",
                verticalAlign: "bottom"
            },
            plotOptions: {},
            labels: {
                style: {
                    position: "absolute",
                    color: "#333333"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {
                    activeColor: "#003399",
                    inactiveColor: "#cccccc"
                },
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {
                    color: "#000000"
                },
                itemHiddenStyle: {
                    color: "#cccccc"
                },
                shadow: !1,
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "#ffffff",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: a,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: n ? 25 : 10,
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
                backgroundColor: s("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#999999",
                    fontSize: "9px"
                },
                text: "Highcharts.com"
            }
        }, o.setOptions = function(t) {
            return o.defaultOptions = r(!0, o.defaultOptions, t), (t.time || t.global) && o.time.update(r(o.defaultOptions.global, o.defaultOptions.time, t.global, t.time)), o.defaultOptions
        }, o.getOptions = function() {
            return o.defaultOptions
        }, o.defaultPlotOptions = o.defaultOptions.plotOptions, o.time = new t(r(o.defaultOptions.global, o.defaultOptions.time)), o.dateFormat = function(t, e, i) {
            return o.time.dateFormat(t, e, i)
        }
    }), e(t, "parts/Axis.js", [t["parts/Color.js"], t["parts/Globals.js"], t["parts/Tick.js"], t["parts/Utilities.js"]], function(c, b, k, t) {
        var a = t.addEvent,
            M = t.animObject,
            g = t.arrayMax,
            m = t.arrayMin,
            w = t.clamp,
            S = t.correctFloat,
            T = t.defined,
            r = t.destroyObjectProperties,
            A = t.error,
            d = t.extend,
            P = t.fireEvent,
            x = t.format,
            C = t.getMagnitude,
            n = t.isArray,
            l = t.isFunction,
            L = t.isNumber,
            v = t.isString,
            h = t.merge,
            E = t.normalizeTickInterval,
            O = t.objectEach,
            D = t.pick,
            p = t.relativeLength,
            u = t.removeEvent,
            f = t.splat,
            B = t.syncTimeout,
            y = b.defaultOptions,
            I = b.deg2rad,
            e = (i.prototype.init = function(t, e) {
                var i = e.isX,
                    o = this;
                o.chart = t, o.horiz = t.inverted && !o.isZAxis ? !i : i, o.isXAxis = i, o.coll = o.coll || (i ? "xAxis" : "yAxis"), P(this, "init", {
                    userOptions: e
                }), o.opposite = e.opposite, o.side = e.side || (o.horiz ? o.opposite ? 0 : 2 : o.opposite ? 1 : 3), o.setOptions(e);
                var s = this.options,
                    r = s.type;
                o.labelFormatter = s.labels.formatter || o.defaultLabelFormatter, o.userOptions = e, o.minPixelPadding = 0, o.reversed = s.reversed, o.visible = !1 !== s.visible, o.zoomEnabled = !1 !== s.zoomEnabled, o.hasNames = "category" === r || !0 === s.categories, o.categories = s.categories || o.hasNames, o.names || (o.names = [], o.names.keys = {}), o.plotLinesAndBandsGroups = {}, o.positiveValuesOnly = !(!o.logarithmic || s.allowNegativeLog), o.isLinked = T(s.linkedTo), o.ticks = {}, o.labelEdge = [], o.minorTicks = {}, o.plotLinesAndBands = [], o.alternateBands = {}, o.len = 0, o.minRange = o.userMinRange = s.minRange || s.maxZoom, o.range = s.range, o.offset = s.offset || 0, o.max = null, o.min = null, o.crosshair = D(s.crosshair, f(t.options.tooltip.crosshairs)[i ? 0 : 1], !1);
                var n = o.options.events; - 1 === t.axes.indexOf(o) && (i ? t.axes.splice(t.xAxis.length, 0, o) : t.axes.push(o), t[o.coll].push(o)), o.series = o.series || [], t.inverted && !o.isZAxis && i && void 0 === o.reversed && (o.reversed = !0), o.labelRotation = o.options.labels.rotation, O(n, function(t, e) {
                    l(t) && a(o, e, t)
                }), P(this, "afterInit")
            }, i.prototype.setOptions = function(t) {
                this.options = h(i.defaultOptions, "yAxis" === this.coll && i.defaultYAxisOptions, [i.defaultTopAxisOptions, i.defaultRightAxisOptions, i.defaultBottomAxisOptions, i.defaultLeftAxisOptions][this.side], h(y[this.coll], t)), P(this, "afterSetOptions", {
                    userOptions: t
                })
            }, i.prototype.defaultLabelFormatter = function() {
                var t, e, i = this.axis,
                    o = this.value,
                    s = i.chart.time,
                    r = i.categories,
                    n = this.dateTimeLabelFormat,
                    a = y.lang,
                    l = a.numericSymbols,
                    h = a.numericSymbolMagnitude || 1e3,
                    c = l && l.length,
                    d = i.options.labels.format,
                    p = i.logarithmic ? Math.abs(o) : i.tickInterval,
                    u = this.chart,
                    f = u.numberFormatter;
                if (d) e = x(d, this, u);
                else if (r) e = o;
                else if (n) e = s.dateFormat(n, o);
                else if (c && 1e3 <= p)
                    for (; c-- && void 0 === e;)(t = Math.pow(h, c + 1)) <= p && 10 * o % t == 0 && null !== l[c] && 0 !== o && (e = f(o / t, -1) + l[c]);
                return void 0 === e && (e = 1e4 <= Math.abs(o) ? f(o, -1) : f(o, -1, void 0, "")), e
            }, i.prototype.getSeriesExtremes = function() {
                var a, l = this,
                    h = l.chart;
                P(this, "getSeriesExtremes", null, function() {
                    l.hasVisibleSeries = !1, l.dataMin = l.dataMax = l.threshold = null, l.softThreshold = !l.isXAxis, l.stacking && l.stacking.buildStacks(), l.series.forEach(function(t) {
                        var e, i, o, s, r, n;
                        !t.visible && h.options.chart.ignoreHiddenSeries || (o = (e = t.options).threshold, l.hasVisibleSeries = !0, l.positiveValuesOnly && o <= 0 && (o = null), l.isXAxis ? (i = t.xData).length && (s = (a = t.getXExtremes(i)).min, r = a.max, L(s) || s instanceof Date || (i = i.filter(L), s = (a = t.getXExtremes(i)).min, r = a.max), i.length && (l.dataMin = Math.min(D(l.dataMin, s), s), l.dataMax = Math.max(D(l.dataMax, r), r))) : (n = t.applyExtremes(), L(n.dataMin) && (s = n.dataMin, l.dataMin = Math.min(D(l.dataMin, s), s)), L(n.dataMax) && (r = n.dataMax, l.dataMax = Math.max(D(l.dataMax, r), r)), T(o) && (l.threshold = o), e.softThreshold && !l.positiveValuesOnly || (l.softThreshold = !1)))
                    })
                }), P(this, "afterGetSeriesExtremes")
            }, i.prototype.translate = function(t, e, i, o, s, r) {
                var n = this.linkedParent || this,
                    a = 1,
                    l = 0,
                    h = o ? n.oldTransA : n.transA,
                    c = o ? n.oldMin : n.min,
                    d = 0,
                    p = n.minPixelPadding,
                    u = (n.isOrdinal || n.brokenAxis && n.brokenAxis.hasBreaks || n.logarithmic && s) && n.lin2val,
                    h = h || n.transA;
                return i && (a *= -1, l = n.len), n.reversed && (l -= (a *= -1) * (n.sector || n.len)), e ? (t = t * a + l, d = (t -= p) / h + c, u && (d = n.lin2val(d))) : (u && (t = n.val2lin(t)), d = L(c) ? a * (t - c) * h + l + a * p + (L(r) ? h * r : 0) : void 0), d
            }, i.prototype.toPixels = function(t, e) {
                return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
            }, i.prototype.toValue = function(t, e) {
                return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
            }, i.prototype.getPlotLinePath = function(t) {
                var e, i, o, s, r, n, a = this,
                    l = a.chart,
                    h = a.left,
                    c = a.top,
                    d = t.old,
                    p = t.value,
                    u = t.translatedValue,
                    f = t.lineWidth,
                    g = t.force,
                    m = d && l.oldChartHeight || l.chartHeight,
                    x = d && l.oldChartWidth || l.chartWidth,
                    v = a.transB;

                function y(t, e, i) {
                    return ("pass" !== g && t < e || i < t) && (g ? t = w(t, e, i) : r = !0), t
                }
                return n = {
                    value: p,
                    lineWidth: f,
                    old: d,
                    force: g,
                    acrossPanes: t.acrossPanes,
                    translatedValue: u
                }, P(this, "getPlotLinePath", n, function(t) {
                    u = D(u, a.translate(p, null, null, d)), u = w(u, -1e5, 1e5), e = o = Math.round(u + v), i = s = Math.round(m - u - v), L(u) ? a.horiz ? (i = c, s = m - a.bottom, e = o = y(e, h, h + a.width)) : (e = h, o = x - a.right, i = s = y(i, c, c + a.height)) : g = !(r = !0), t.path = r && !g ? null : l.renderer.crispLine([
                        ["M", e, i],
                        ["L", o, s]
                    ], f || 1)
                }), n.path
            }, i.prototype.getLinearTickPositions = function(t, e, i) {
                var o, s, r, n = S(Math.floor(e / t) * t),
                    a = S(Math.ceil(i / t) * t),
                    l = [];
                if (S(n + t) === n && (r = 20), this.single) return [e];
                for (o = n; o <= a && (l.push(o), (o = S(o + t, r)) !== s);) s = o;
                return l
            }, i.prototype.getMinorTickInterval = function() {
                var t = this.options;
                return !0 === t.minorTicks ? D(t.minorTickInterval, "auto") : !1 === t.minorTicks ? null : t.minorTickInterval
            }, i.prototype.getMinorTickPositions = function() {
                var t, e = this,
                    i = e.options,
                    o = e.tickPositions,
                    s = e.minorTickInterval,
                    r = [],
                    n = e.pointRangePadding || 0,
                    a = e.min - n,
                    l = e.max + n,
                    h = l - a;
                if (h && h / s < e.len / 3) {
                    var c = e.logarithmic;
                    if (c) this.paddedTicks.forEach(function(t, e, i) {
                        e && r.push.apply(r, c.getLogTickPositions(s, i[e - 1], i[e], !0))
                    });
                    else if (e.dateTime && "auto" === this.getMinorTickInterval()) r = r.concat(e.getTimeTicks(e.dateTime.normalizeTimeTickInterval(s), a, l, i.startOfWeek));
                    else
                        for (t = a + (o[0] - a) % s; t <= l && t !== r[0]; t += s) r.push(t)
                }
                return 0 !== r.length && e.trimTicks(r), r
            }, i.prototype.adjustForMinRange = function() {
                var t, e, i, o, s, r, n, a, l, h, c = this,
                    d = c.options,
                    p = c.min,
                    u = c.max,
                    f = c.logarithmic;
                c.isXAxis && void 0 === c.minRange && !f && (T(d.min) || T(d.max) ? c.minRange = null : (c.series.forEach(function(t) {
                    for (r = t.xData, n = t.xIncrement ? 1 : r.length - 1, o = n; 0 < o; o--) s = r[o] - r[o - 1], (void 0 === i || s < i) && (i = s)
                }), c.minRange = Math.min(5 * i, c.dataMax - c.dataMin))), u - p < c.minRange && (e = c.dataMax - c.dataMin >= c.minRange, a = [p - (t = ((h = c.minRange) - u + p) / 2), D(d.min, p - t)], e && (a[2] = c.logarithmic ? c.logarithmic.log2lin(c.dataMin) : c.dataMin), l = [(p = g(a)) + h, D(d.max, p + h)], e && (l[2] = f ? f.log2lin(c.dataMax) : c.dataMax), (u = m(l)) - p < h && (a[0] = u - h, a[1] = D(d.min, u - h), p = g(a))), c.min = p, c.max = u
            }, i.prototype.getClosest = function() {
                var o;
                return this.categories ? o = 1 : this.series.forEach(function(t) {
                    var e = t.closestPointRange,
                        i = t.visible || !t.chart.options.chart.ignoreHiddenSeries;
                    !t.noSharedTooltip && T(e) && i && (o = T(o) ? Math.min(o, e) : e)
                }), o
            }, i.prototype.nameToX = function(t) {
                var e, i = n(this.categories),
                    o = i ? this.categories : this.names,
                    s = t.options.x;
                return t.series.requireSorting = !1, T(s) || (s = !1 === this.options.uniqueNames ? t.series.autoIncrement() : i ? o.indexOf(t.name) : D(o.keys[t.name], -1)), -1 === s ? i || (e = o.length) : e = s, void 0 !== e && (this.names[e] = t.name, this.names.keys[t.name] = e), e
            }, i.prototype.updateNames = function() {
                var s = this,
                    e = this.names;
                0 < e.length && (Object.keys(e.keys).forEach(function(t) {
                    delete e.keys[t]
                }), e.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function(o) {
                    o.xIncrement = null, o.points && !o.isDirtyData || (s.max = Math.max(s.max, o.xData.length - 1), o.processData(), o.generatePoints()), o.data.forEach(function(t, e) {
                        var i;
                        t && t.options && void 0 !== t.name && void 0 !== (i = s.nameToX(t)) && i !== t.x && (t.x = i, o.xData[e] = i)
                    })
                }))
            }, i.prototype.setAxisTranslation = function(t) {
                var s, e, r = this,
                    i = r.max - r.min,
                    n = r.axisPointRange || 0,
                    a = 0,
                    l = 0,
                    o = r.linkedParent,
                    h = !!r.categories,
                    c = r.transA,
                    d = r.isXAxis;
                (d || h || n) && (s = r.getClosest(), o ? (a = o.minPointOffset, l = o.pointRangePadding) : r.series.forEach(function(t) {
                    var e, i = h ? 1 : d ? D(t.options.pointRange, s, 0) : r.axisPointRange || 0,
                        o = t.options.pointPlacement;
                    n = Math.max(n, i), r.single && !h || (e = t.is("xrange") ? !d : d, a = Math.max(a, e && v(o) ? 0 : i / 2), l = Math.max(l, e && "on" === o ? 0 : i))
                }), e = r.ordinal && r.ordinal.slope && s ? r.ordinal.slope / s : 1, r.minPointOffset = a *= e, r.pointRangePadding = l *= e, r.pointRange = Math.min(n, r.single && h ? 1 : i), d && (r.closestPointRange = s)), t && (r.oldTransA = c), r.translationSlope = r.transA = c = r.staticScale || r.len / (i + l || 1), r.transB = r.horiz ? r.left : r.bottom, r.minPixelPadding = c * a, P(this, "afterSetAxisTranslation")
            }, i.prototype.minFromRange = function() {
                return this.max - this.range
            }, i.prototype.setTickInterval = function(t) {
                var e, i, o, s, r, n, a, l = this,
                    h = l.chart,
                    c = l.logarithmic,
                    d = l.options,
                    p = l.isXAxis,
                    u = l.isLinked,
                    f = d.maxPadding,
                    g = d.minPadding,
                    m = d.tickInterval,
                    x = d.tickPixelInterval,
                    v = l.categories,
                    y = L(l.threshold) ? l.threshold : null,
                    b = l.softThreshold;
                l.dateTime || v || u || this.getTickAmount(), n = D(l.userMin, d.min), a = D(l.userMax, d.max), u ? (l.linkedParent = h[l.coll][d.linkedTo], i = l.linkedParent.getExtremes(), l.min = D(i.min, i.dataMin), l.max = D(i.max, i.dataMax), d.type !== l.linkedParent.options.type && A(11, 1, h)) : (!b && T(y) && (l.dataMin >= y ? (s = y, g = 0) : l.dataMax <= y && (r = y, f = 0)), l.min = D(n, s, l.dataMin), l.max = D(a, r, l.dataMax)), c && (l.positiveValuesOnly && !t && Math.min(l.min, D(l.dataMin, l.min)) <= 0 && A(10, 1, h), l.min = S(c.log2lin(l.min), 16), l.max = S(c.log2lin(l.max), 16)), l.range && T(l.max) && (l.userMin = l.min = n = Math.max(l.dataMin, l.minFromRange()), l.userMax = a = l.max, l.range = null), P(l, "foundExtremes"), l.beforePadding && l.beforePadding(), l.adjustForMinRange(), v || l.axisPointRange || l.stacking && l.stacking.usePercentage || u || !T(l.min) || !T(l.max) || (e = l.max - l.min) && (!T(n) && g && (l.min -= e * g), !T(a) && f && (l.max += e * f)), L(l.userMin) || (L(d.softMin) && d.softMin < l.min && (l.min = n = d.softMin), L(d.floor) && (l.min = Math.max(l.min, d.floor))), L(l.userMax) || (L(d.softMax) && d.softMax > l.max && (l.max = a = d.softMax), L(d.ceiling) && (l.max = Math.min(l.max, d.ceiling))), b && T(l.dataMin) && (y = y || 0, !T(n) && l.min < y && l.dataMin >= y ? l.min = l.options.minRange ? Math.min(y, l.max - l.minRange) : y : !T(a) && l.max > y && l.dataMax <= y && (l.max = l.options.minRange ? Math.max(y, l.min + l.minRange) : y)), l.min === l.max || void 0 === l.min || void 0 === l.max ? l.tickInterval = 1 : u && !m && x === l.linkedParent.options.tickPixelInterval ? l.tickInterval = m = l.linkedParent.tickInterval : l.tickInterval = D(m, this.tickAmount ? (l.max - l.min) / Math.max(this.tickAmount - 1, 1) : void 0, v ? 1 : (l.max - l.min) * x / Math.max(l.len, x)), p && !t && l.series.forEach(function(t) {
                    t.processData(l.min !== l.oldMin || l.max !== l.oldMax)
                }), l.setAxisTranslation(!0), l.beforeSetTickPositions && l.beforeSetTickPositions(), l.ordinal && (l.tickInterval = l.ordinal.postProcessTickInterval(l.tickInterval)), l.pointRange && !m && (l.tickInterval = Math.max(l.pointRange, l.tickInterval)), o = D(d.minTickInterval, l.dateTime && l.closestPointRange), !m && l.tickInterval < o && (l.tickInterval = o), l.dateTime || l.logarithmic || m || (l.tickInterval = E(l.tickInterval, void 0, C(l.tickInterval), D(d.allowDecimals, l.tickInterval < .5 || void 0 !== this.tickAmount), !!this.tickAmount)), this.tickAmount || (l.tickInterval = l.unsquish()), this.setTickPositions()
            }, i.prototype.setTickPositions = function() {
                var t, e = this,
                    i = this.options,
                    o = i.tickPositions,
                    s = this.getMinorTickInterval(),
                    r = i.tickPositioner,
                    n = this.hasVerticalPanning(),
                    a = "colorAxis" === this.coll,
                    l = (a || !n) && i.startOnTick,
                    h = (a || !n) && i.endOnTick;
                this.tickmarkOffset = this.categories && "between" === i.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0, this.minorTickInterval = "auto" === s && this.tickInterval ? this.tickInterval / 5 : s, this.single = this.min === this.max && T(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== i.allowDecimals), this.tickPositions = t = o && o.slice(), t || (e.ordinal && e.ordinal.positions || !((this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200)) ? t = e.dateTime ? e.getTimeTicks(e.dateTime.normalizeTimeTickInterval(this.tickInterval, i.units), this.min, this.max, i.startOfWeek, e.ordinal && e.ordinal.positions, this.closestPointRange, !0) : e.logarithmic ? e.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max) : (t = [this.min, this.max], A(19, !1, this.chart)), t.length > this.len && (t = [t[0], t.pop()])[0] === t[1] && (t.length = 1), this.tickPositions = t, (r = r && r.apply(e, [this.min, this.max])) && (this.tickPositions = t = r)), this.paddedTicks = t.slice(0), this.trimTicks(t, l, h), this.isLinked || (this.single && t.length < 2 && !this.categories && !this.series.some(function(t) {
                    return t.is("heatmap") && "between" === t.options.pointPlacement
                }) && (this.min -= .5, this.max += .5), o || r || this.adjustTickAmount()), P(this, "afterSetTickPositions")
            }, i.prototype.trimTicks = function(t, e, i) {
                var o = t[0],
                    s = t[t.length - 1],
                    r = !this.isOrdinal && this.minPointOffset || 0;
                if (P(this, "trimTicks"), !this.isLinked) {
                    if (e && o !== -1 / 0) this.min = o;
                    else
                        for (; this.min - r > t[0];) t.shift();
                    if (i) this.max = s;
                    else
                        for (; this.max + r < t[t.length - 1];) t.pop();
                    0 === t.length && T(o) && !this.options.tickPositions && t.push((s + o) / 2)
                }
            }, i.prototype.alignToOthers = function() {
                var o, s = {},
                    t = this.options;
                return !1 === this.chart.options.chart.alignTicks || !1 === t.alignTicks || !1 === t.startOnTick || !1 === t.endOnTick || this.logarithmic || this.chart[this.coll].forEach(function(t) {
                    var e = t.options,
                        i = [t.horiz ? e.left : e.top, e.width, e.height, e.pane].join(",");
                    t.series.length && (s[i] ? o = !0 : s[i] = 1)
                }), o
            }, i.prototype.getTickAmount = function() {
                var t = this.options,
                    e = t.tickAmount,
                    i = t.tickPixelInterval;
                !T(t.tickInterval) && !e && this.len < i && !this.isRadial && !this.logarithmic && t.startOnTick && t.endOnTick && (e = 2), !e && this.alignToOthers() && (e = Math.ceil(this.len / i) + 1), e < 4 && (this.finalTickAmt = e, e = 5), this.tickAmount = e
            }, i.prototype.adjustTickAmount = function() {
                var t, e, i, o = this,
                    s = o.options,
                    r = o.tickInterval,
                    n = o.tickPositions,
                    a = o.tickAmount,
                    l = o.finalTickAmt,
                    h = n && n.length,
                    c = D(o.threshold, o.softThreshold ? 0 : null);
                if (o.hasData()) {
                    if (h < a) {
                        for (t = o.min; n.length < a;) n.length % 2 || t === c ? n.push(S(n[n.length - 1] + r)) : n.unshift(S(n[0] - r));
                        o.transA *= (h - 1) / (a - 1), o.min = s.startOnTick ? n[0] : Math.min(o.min, n[0]), o.max = s.endOnTick ? n[n.length - 1] : Math.max(o.max, n[n.length - 1])
                    } else a < h && (o.tickInterval *= 2, o.setTickPositions());
                    if (T(l)) {
                        for (i = e = n.length; i--;)(3 === l && i % 2 == 1 || l <= 2 && 0 < i && i < e - 1) && n.splice(i, 1);
                        o.finalTickAmt = void 0
                    }
                }
            }, i.prototype.setScale = function() {
                var t, e = this,
                    i = !1,
                    o = !1;
                e.series.forEach(function(t) {
                    var e;
                    i = i || t.isDirtyData || t.isDirty, o = o || (null === (e = t.xAxis) || void 0 === e ? void 0 : e.isDirty) || !1
                }), e.oldMin = e.min, e.oldMax = e.max, e.oldAxisLength = e.len, e.setAxisSize(), (t = e.len !== e.oldAxisLength) || i || o || e.isLinked || e.forceRedraw || e.userMin !== e.oldUserMin || e.userMax !== e.oldUserMax || e.alignToOthers() ? (e.stacking && e.stacking.resetStacks(), e.forceRedraw = !1, e.getSeriesExtremes(), e.setTickInterval(), e.oldUserMin = e.userMin, e.oldUserMax = e.userMax, e.isDirty || (e.isDirty = t || e.min !== e.oldMin || e.max !== e.oldMax)) : e.stacking && e.stacking.cleanStacks(), i && e.panningState && (e.panningState.isDirty = !0), P(this, "afterSetScale")
            }, i.prototype.setExtremes = function(t, e, i, o, s) {
                var r = this,
                    n = r.chart;
                i = D(i, !0), r.series.forEach(function(t) {
                    delete t.kdTree
                }), s = d(s, {
                    min: t,
                    max: e
                }), P(r, "setExtremes", s, function() {
                    r.userMin = t, r.userMax = e, r.eventArgs = s, i && n.redraw(o)
                })
            }, i.prototype.zoom = function(t, e) {
                var o = this,
                    s = this.dataMin,
                    r = this.dataMax,
                    i = this.options,
                    n = Math.min(s, D(i.min, s)),
                    a = Math.max(r, D(i.max, r)),
                    l = {
                        newMin: t,
                        newMax: e
                    };
                return P(this, "zoom", l, function(t) {
                    var e = t.newMin,
                        i = t.newMax;
                    e === o.min && i === o.max || (o.allowZoomOutside || (T(s) && (e < n && (e = n), a < e && (e = a)), T(r) && (i < n && (i = n), a < i && (i = a))), o.displayBtn = void 0 !== e || void 0 !== i, o.setExtremes(e, i, !1, void 0, {
                        trigger: "zoom"
                    })), t.zoomed = !0
                }), l.zoomed
            }, i.prototype.setAxisSize = function() {
                var t = this.chart,
                    e = this.options,
                    i = e.offsets || [0, 0, 0, 0],
                    o = this.horiz,
                    s = this.width = Math.round(p(D(e.width, t.plotWidth - i[3] + i[1]), t.plotWidth)),
                    r = this.height = Math.round(p(D(e.height, t.plotHeight - i[0] + i[2]), t.plotHeight)),
                    n = this.top = Math.round(p(D(e.top, t.plotTop + i[0]), t.plotHeight, t.plotTop)),
                    a = this.left = Math.round(p(D(e.left, t.plotLeft + i[3]), t.plotWidth, t.plotLeft));
                this.bottom = t.chartHeight - r - n, this.right = t.chartWidth - s - a, this.len = Math.max(o ? s : r, 0), this.pos = o ? a : n
            }, i.prototype.getExtremes = function() {
                var t = this,
                    e = t.logarithmic;
                return {
                    min: e ? S(e.lin2log(t.min)) : t.min,
                    max: e ? S(e.lin2log(t.max)) : t.max,
                    dataMin: t.dataMin,
                    dataMax: t.dataMax,
                    userMin: t.userMin,
                    userMax: t.userMax
                }
            }, i.prototype.getThreshold = function(t) {
                var e = this,
                    i = e.logarithmic,
                    o = i ? i.lin2log(e.min) : e.min,
                    s = i ? i.lin2log(e.max) : e.max;
                return null === t || t === -1 / 0 ? t = o : t === 1 / 0 ? t = s : t < o ? t = o : s < t && (t = s), e.translate(t, 0, 1, 0, 1)
            }, i.prototype.autoLabelAlign = function(t) {
                var e = (D(t, 0) - 90 * this.side + 720) % 360,
                    i = {
                        align: "center"
                    };
                return P(this, "autoLabelAlign", i, function(t) {
                    15 < e && e < 165 ? t.align = "right" : 195 < e && e < 345 && (t.align = "left")
                }), i.align
            }, i.prototype.tickSize = function(t) {
                var e, i, o = this.options,
                    s = o["tick" === t ? "tickLength" : "minorTickLength"],
                    r = D(o["tick" === t ? "tickWidth" : "minorTickWidth"], "tick" === t && this.isXAxis && !this.categories ? 1 : 0);
                return r && s && ("inside" === o[t + "Position"] && (s = -s), i = [s, r]), P(this, "afterTickSize", e = {
                    tickSize: i
                }), e.tickSize
            }, i.prototype.labelMetrics = function() {
                var t = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[t] && this.ticks[t].label)
            }, i.prototype.unsquish = function() {
                function i(t) {
                    var e = 1 < (e = t / (l || 1)) ? Math.ceil(e) : 1;
                    return p < e * n && t !== 1 / 0 && l != 1 / 0 && p && (e = Math.ceil(p / n)), S(e * n)
                }
                var o, s, t, e = this.options.labels,
                    r = this.horiz,
                    n = this.tickInterval,
                    a = n,
                    l = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / n),
                    h = e.rotation,
                    c = this.labelMetrics(),
                    d = Number.MAX_VALUE,
                    p = this.max - this.min;
                return r ? (t = !e.staggerLines && !e.step && (T(h) ? [h] : l < D(e.autoRotationLimit, 80) && e.autoRotation)) && t.forEach(function(t) {
                    var e;
                    (t === h || t && -90 <= t && t <= 90) && (e = (s = i(Math.abs(c.h / Math.sin(I * t)))) + Math.abs(t / 360)) < d && (d = e, o = t, a = s)
                }) : e.step || (a = i(c.h)), this.autoRotation = t, this.labelRotation = D(o, h), a
            }, i.prototype.getSlotWidth = function(t) {
                var e, i = this.chart,
                    o = this.horiz,
                    s = this.options.labels,
                    r = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1),
                    n = i.margin[3];
                if (t && L(t.slotWidth)) return t.slotWidth;
                if (o && s && (s.step || 0) < 2) return s.rotation ? 0 : (this.staggerLines || 1) * this.len / r;
                if (!o) {
                    var a = null === (e = null == s ? void 0 : s.style) || void 0 === e ? void 0 : e.width;
                    if (void 0 !== a) return parseInt(a, 10);
                    if (n) return n - i.spacing[3]
                }
                return .33 * i.chartWidth
            }, i.prototype.renderUnsquish = function() {
                var r, n, t, e, i, o = this.chart,
                    s = o.renderer,
                    a = this.tickPositions,
                    l = this.ticks,
                    h = this.options.labels,
                    c = h && h.style || {},
                    d = this.horiz,
                    p = this.getSlotWidth(),
                    u = Math.max(1, Math.round(p - 2 * (h.padding || 5))),
                    f = {},
                    g = this.labelMetrics(),
                    m = h.style && h.style.textOverflow,
                    x = 0;
                if (v(h.rotation) || (f.rotation = h.rotation || 0), a.forEach(function(t) {
                        (t = l[t]).movedLabel && t.replaceMovedLabel(), t && t.label && t.label.textPxLength > x && (x = t.label.textPxLength)
                    }), this.maxLabelLength = x, this.autoRotation) u < x && x > g.h ? f.rotation = this.labelRotation : this.labelRotation = 0;
                else if (p && (r = u, !m))
                    for (n = "clip", e = a.length; !d && e--;) i = a[e], (t = l[i].label) && (t.styles && "ellipsis" === t.styles.textOverflow ? t.css({
                        textOverflow: "clip"
                    }) : t.textPxLength > p && t.css({
                        width: p + "px"
                    }), t.getBBox().height > this.len / a.length - (g.h - g.f) && (t.specificTextOverflow = "ellipsis"));
                f.rotation && (r = x > .5 * o.chartHeight ? .33 * o.chartHeight : x, m || (n = "ellipsis")), this.labelAlign = h.align || this.autoLabelAlign(this.labelRotation), this.labelAlign && (f.align = this.labelAlign), a.forEach(function(t) {
                    var e = l[t],
                        i = e && e.label,
                        o = c.width,
                        s = {};
                    i && (i.attr(f), e.shortenLabel ? e.shortenLabel() : r && !o && "nowrap" !== c.whiteSpace && (r < i.textPxLength || "SPAN" === i.element.tagName) ? (s.width = r + "px", m || (s.textOverflow = i.specificTextOverflow || n), i.css(s)) : i.styles && i.styles.width && !s.width && !o && i.css({
                        width: null
                    }), delete i.specificTextOverflow, e.rotation = f.rotation)
                }, this), this.tickRotCorr = s.rotCorr(g.b, this.labelRotation || 0, 0 !== this.side)
            }, i.prototype.hasData = function() {
                return this.series.some(function(t) {
                    return t.hasData()
                }) || this.options.showEmpty && T(this.min) && T(this.max)
            }, i.prototype.addTitle = function(t) {
                var e, i = this,
                    o = i.chart.renderer,
                    s = i.horiz,
                    r = i.opposite,
                    n = i.options.title,
                    a = i.chart.styledMode;
                i.axisTitle || (e = (e = n.textAlign) || (s ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: r ? "right" : "left",
                    middle: "center",
                    high: r ? "left" : "right"
                })[n.align], i.axisTitle = o.text(n.text, 0, 0, n.useHTML).attr({
                    zIndex: 7,
                    rotation: n.rotation || 0,
                    align: e
                }).addClass("highcharts-axis-title"), a || i.axisTitle.css(h(n.style)), i.axisTitle.add(i.axisGroup), i.axisTitle.isNew = !0), a || n.style.width || i.isRadial || i.axisTitle.css({
                    width: i.len + "px"
                }), i.axisTitle[t ? "show" : "hide"](t)
            }, i.prototype.generateTick = function(t) {
                var e = this.ticks;
                e[t] ? e[t].addLabel() : e[t] = new k(this, t)
            }, i.prototype.getOffset = function() {
                var t, e, i, o, s, r = this,
                    n = r.chart,
                    a = n.renderer,
                    l = r.options,
                    h = r.tickPositions,
                    c = r.ticks,
                    d = r.horiz,
                    p = r.side,
                    u = n.inverted && !r.isZAxis ? [1, 0, 3, 2][p] : p,
                    f = 0,
                    g = 0,
                    m = l.title,
                    x = l.labels,
                    v = 0,
                    y = n.axisOffset,
                    b = n.clipOffset,
                    k = [-1, 1, 1, -1][p],
                    M = l.className,
                    w = r.axisParent,
                    S = r.hasData();
                r.showAxis = t = S || D(l.showEmpty, !0), r.staggerLines = r.horiz && x.staggerLines, r.axisGroup || (r.gridGroup = a.g("grid").attr({
                    zIndex: l.gridZIndex || 1
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (M || "")).add(w), r.axisGroup = a.g("axis").attr({
                    zIndex: l.zIndex || 2
                }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (M || "")).add(w), r.labelGroup = a.g("axis-labels").attr({
                    zIndex: x.zIndex || 7
                }).addClass("highcharts-" + r.coll.toLowerCase() + "-labels " + (M || "")).add(w)), S || r.isLinked ? (h.forEach(function(t, e) {
                    r.generateTick(t, e)
                }), r.renderUnsquish(), r.reserveSpaceDefault = 0 === p || 2 === p || {
                    1: "left",
                    3: "right"
                }[p] === r.labelAlign, D(x.reserveSpace, "center" === r.labelAlign || null, r.reserveSpaceDefault) && h.forEach(function(t) {
                    v = Math.max(c[t].getLabelSize(), v)
                }), r.staggerLines && (v *= r.staggerLines), r.labelOffset = v * (r.opposite ? -1 : 1)) : O(c, function(t, e) {
                    t.destroy(), delete c[e]
                }), m && m.text && !1 !== m.enabled && (r.addTitle(t), t && !1 !== m.reserveSpace && (r.titleOffset = f = r.axisTitle.getBBox()[d ? "height" : "width"], e = m.offset, g = T(e) ? 0 : D(m.margin, d ? 5 : 10))), r.renderLine(), r.offset = k * D(l.offset, y[p] ? y[p] + (l.margin || 0) : 0), r.tickRotCorr = r.tickRotCorr || {
                    x: 0,
                    y: 0
                }, s = 0 === p ? -r.labelMetrics().h : 2 === p ? r.tickRotCorr.y : 0, i = Math.abs(v) + g, v && (i -= s, i += k * (d ? D(x.y, r.tickRotCorr.y + 8 * k) : x.x)), r.axisTitleMargin = D(e, i), r.getMaxLabelDimensions && (r.maxLabelDimensions = r.getMaxLabelDimensions(c, h));
                var A = this.tickSize("tick");
                y[p] = Math.max(y[p], r.axisTitleMargin + f + k * r.offset, i, h && h.length && A ? A[0] + k * r.offset : 0), o = l.offset ? 0 : 2 * Math.floor(r.axisLine.strokeWidth() / 2), b[u] = Math.max(b[u], o), P(this, "afterGetOffset")
            }, i.prototype.getLinePath = function(t) {
                var e = this.chart,
                    i = this.opposite,
                    o = this.offset,
                    s = this.horiz,
                    r = this.left + (i ? this.width : 0) + o,
                    n = e.chartHeight - this.bottom - (i ? this.height : 0) + o;
                return i && (t *= -1), e.renderer.crispLine([
                    ["M", s ? this.left : r, s ? n : this.top],
                    ["L", s ? e.chartWidth - this.right : r, s ? n : e.chartHeight - this.bottom]
                ], t)
            }, i.prototype.renderLine = function() {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup), this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            }, i.prototype.getTitlePosition = function() {
                var t = this.horiz,
                    e = this.left,
                    i = this.top,
                    o = this.len,
                    s = this.options.title,
                    r = t ? e : i,
                    n = this.opposite,
                    a = this.offset,
                    l = s.x || 0,
                    h = s.y || 0,
                    c = this.axisTitle,
                    d = this.chart.renderer.fontMetrics(s.style && s.style.fontSize, c),
                    p = Math.max(c.getBBox(null, 0).height - d.h - 1, 0),
                    u = {
                        low: r + (t ? 0 : o),
                        middle: r + o / 2,
                        high: r + (t ? o : 0)
                    }[s.align],
                    f = (t ? i + this.height : e) + (t ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin + [-p, p, d.f, -p][this.side],
                    g = {
                        x: t ? u + l : f + (n ? this.width : 0) + a + l,
                        y: t ? f + h - (n ? this.height : 0) + a : u + h
                    };
                return P(this, "afterGetTitlePosition", {
                    titlePosition: g
                }), g
            }, i.prototype.renderMinorTick = function(t) {
                var e = this.chart.hasRendered && L(this.oldMin),
                    i = this.minorTicks;
                i[t] || (i[t] = new k(this, t, "minor")), e && i[t].isNew && i[t].render(null, !0), i[t].render(null, !1, 1)
            }, i.prototype.renderTick = function(t, e) {
                var i = this,
                    o = i.isLinked,
                    s = i.ticks,
                    r = i.chart.hasRendered && L(i.oldMin);
                (!o || t >= i.min && t <= i.max) && (s[t] || (s[t] = new k(i, t)), r && s[t].isNew && s[t].render(e, !0, -1), s[t].render(e))
            }, i.prototype.render = function() {
                var i, o, t, s = this,
                    r = s.chart,
                    n = s.logarithmic,
                    e = r.renderer,
                    a = s.options,
                    l = s.isLinked,
                    h = s.tickPositions,
                    c = s.axisTitle,
                    d = s.ticks,
                    p = s.minorTicks,
                    u = s.alternateBands,
                    f = a.stackLabels,
                    g = a.alternateGridColor,
                    m = s.tickmarkOffset,
                    x = s.axisLine,
                    v = s.showAxis,
                    y = M(e.globalAnimation);
                s.labelEdge.length = 0, s.overlap = !1, [d, p, u].forEach(function(t) {
                    O(t, function(t) {
                        t.isActive = !1
                    })
                }), (s.hasData() || l) && (s.minorTickInterval && !s.categories && s.getMinorTickPositions().forEach(function(t) {
                    s.renderMinorTick(t)
                }), h.length && (h.forEach(function(t, e) {
                    s.renderTick(t, e)
                }), m && (0 === s.min || s.single) && (d[-1] || (d[-1] = new k(s, -1, null, !0)), d[-1].render(-1))), g && h.forEach(function(t, e) {
                    o = void 0 !== h[e + 1] ? h[e + 1] + m : s.max - m, e % 2 == 0 && t < s.max && o <= s.max + (r.polar ? -m : m) && (u[t] || (u[t] = new b.PlotLineOrBand(s)), i = t + m, u[t].options = {
                        from: n ? n.lin2log(i) : i,
                        to: n ? n.lin2log(o) : o,
                        color: g
                    }, u[t].render(), u[t].isActive = !0)
                }), s._addedPlotLB || ((a.plotLines || []).concat(a.plotBands || []).forEach(function(t) {
                    s.addPlotBandOrLine(t)
                }), s._addedPlotLB = !0)), [d, p, u].forEach(function(t) {
                    var e, i = [],
                        o = y.duration;
                    O(t, function(t, e) {
                        t.isActive || (t.render(e, !1, 0), t.isActive = !1, i.push(e))
                    }), B(function() {
                        for (e = i.length; e--;) t[i[e]] && !t[i[e]].isActive && (t[i[e]].destroy(), delete t[i[e]])
                    }, t !== u && r.hasRendered && o ? o : 0)
                }), x && (x[x.isPlaced ? "animate" : "attr"]({
                    d: this.getLinePath(x.strokeWidth())
                }), x.isPlaced = !0, x[v ? "show" : "hide"](v)), c && v && (t = s.getTitlePosition(), L(t.y) ? (c[c.isNew ? "attr" : "animate"](t), c.isNew = !1) : (c.attr("y", -9999), c.isNew = !0)), f && f.enabled && s.stacking && s.stacking.renderStackTotals(), s.isDirty = !1, P(this, "afterRender")
            }, i.prototype.redraw = function() {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function(t) {
                    t.render()
                })), this.series.forEach(function(t) {
                    t.isDirty = !0
                })
            }, i.prototype.getKeepProps = function() {
                return this.keepProps || i.keepProps
            }, i.prototype.destroy = function(t) {
                var e, i, o = this,
                    s = o.plotLinesAndBands;
                if (P(this, "destroy", {
                        keepEvents: t
                    }), t || u(o), [o.ticks, o.minorTicks, o.alternateBands].forEach(function(t) {
                        r(t)
                    }), s)
                    for (i = s.length; i--;) s[i].destroy();
                for (e in ["axisLine", "axisTitle", "axisGroup", "gridGroup", "labelGroup", "cross", "scrollbar"].forEach(function(t) {
                        o[t] && (o[t] = o[t].destroy())
                    }), o.plotLinesAndBandsGroups) o.plotLinesAndBandsGroups[e] = o.plotLinesAndBandsGroups[e].destroy();
                O(o, function(t, e) {
                    -1 === o.getKeepProps().indexOf(e) && delete o[e]
                })
            }, i.prototype.drawCrosshair = function(t, e) {
                var i, o, s, r, n = this.crosshair,
                    a = D(n.snap, !0),
                    l = this.cross,
                    h = this.chart;
                if (P(this, "drawCrosshair", {
                        e: t,
                        point: e
                    }), t = t || this.cross && this.cross.e, this.crosshair && !1 !== (T(e) || !a)) {
                    if (a ? T(e) && (o = D("colorAxis" !== this.coll ? e.crosshairPos : null, this.isXAxis ? e.plotX : this.len - e.plotY)) : o = t && (this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos), T(o) && (r = {
                            value: e && (this.isXAxis ? e.x : D(e.stackY, e.y)),
                            translatedValue: o
                        }, h.polar && d(r, {
                            isCrosshair: !0,
                            chartX: t && t.chartX,
                            chartY: t && t.chartY,
                            point: e
                        }), i = this.getPlotLinePath(r) || null), !T(i)) return void this.hideCrosshair();
                    s = this.categories && !this.isRadial, l || (this.cross = l = h.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (s ? "category " : "thin ") + n.className).attr({
                        zIndex: D(n.zIndex, 2)
                    }).add(), h.styledMode || (l.attr({
                        stroke: n.color || (s ? c.parse("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": D(n.width, 1)
                    }).css({
                        "pointer-events": "none"
                    }), n.dashStyle && l.attr({
                        dashstyle: n.dashStyle
                    }))), l.show().attr({
                        d: i
                    }), s && !n.width && l.attr({
                        "stroke-width": this.transA
                    }), this.cross.e = t
                } else this.hideCrosshair();
                P(this, "afterDrawCrosshair", {
                    e: t,
                    point: e
                })
            }, i.prototype.hideCrosshair = function() {
                this.cross && this.cross.hide(), P(this, "afterHideCrosshair")
            }, i.prototype.hasVerticalPanning = function() {
                var t, e;
                return /y/.test((null === (e = null === (t = this.chart.options.chart) || void 0 === t ? void 0 : t.panning) || void 0 === e ? void 0 : e.type) || "")
            }, i.defaultOptions = {
                dateTimeLabelFormats: {
                    millisecond: {
                        main: "%H:%M:%S.%L",
                        range: !1
                    },
                    second: {
                        main: "%H:%M:%S",
                        range: !1
                    },
                    minute: {
                        main: "%H:%M",
                        range: !1
                    },
                    hour: {
                        main: "%H:%M",
                        range: !1
                    },
                    day: {
                        main: "%e. %b"
                    },
                    week: {
                        main: "%e. %b"
                    },
                    month: {
                        main: "%b '%y"
                    },
                    year: {
                        main: "%Y"
                    }
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {
                        color: "#666666",
                        cursor: "default",
                        fontSize: "11px"
                    }
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                showEmpty: !0,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {
                    align: "middle",
                    style: {
                        color: "#666666"
                    }
                },
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            }, i.defaultYAxisOptions = {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8
                },
                startOnTick: !0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    allowOverlap: !1,
                    enabled: !1,
                    crop: !0,
                    overflow: "justify",
                    formatter: function() {
                        return (0, this.axis.chart.numberFormatter)(this.total, -1)
                    },
                    style: {
                        color: "#000000",
                        fontSize: "11px",
                        fontWeight: "bold",
                        textOutline: "1px contrast"
                    }
                },
                gridLineWidth: 1,
                lineWidth: 0
            }, i.defaultLeftAxisOptions = {
                labels: {
                    x: -15
                },
                title: {
                    rotation: 270
                }
            }, i.defaultRightAxisOptions = {
                labels: {
                    x: 15
                },
                title: {
                    rotation: 90
                }
            }, i.defaultBottomAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            }, i.defaultTopAxisOptions = {
                labels: {
                    autoRotation: [-45],
                    x: 0
                },
                margin: 15,
                title: {
                    rotation: 0
                }
            }, i.keepProps = ["extKey", "hcEvents", "names", "series", "userMax", "userMin"], i);

        function i(t, e) {
            this.alternateBands = void 0, this.bottom = void 0, this.categories = void 0, this.chart = void 0, this.closestPointRange = void 0, this.coll = void 0, this.hasNames = void 0, this.hasVisibleSeries = void 0, this.height = void 0, this.isLinked = void 0, this.labelEdge = void 0, this.labelFormatter = void 0, this.left = void 0, this.len = void 0, this.max = void 0, this.maxLabelLength = void 0, this.min = void 0, this.minorTickInterval = void 0, this.minorTicks = void 0, this.minPixelPadding = void 0, this.names = void 0, this.offset = void 0, this.oldMax = void 0, this.oldMin = void 0, this.options = void 0, this.overlap = void 0, this.paddedTicks = void 0, this.plotLinesAndBands = void 0, this.plotLinesAndBandsGroups = void 0, this.pointRange = void 0, this.pointRangePadding = void 0, this.pos = void 0, this.positiveValuesOnly = void 0, this.right = void 0, this.series = void 0, this.side = void 0, this.tickAmount = void 0, this.tickInterval = void 0, this.tickmarkOffset = void 0, this.tickPositions = void 0, this.tickRotCorr = void 0, this.ticks = void 0, this.top = void 0, this.transA = void 0, this.transB = void 0, this.translationSlope = void 0, this.userOptions = void 0, this.visible = void 0, this.width = void 0, this.zoomEnabled = void 0, this.init(t, e)
        }
        return b.Axis = e, b.Axis
    }), e(t, "parts/DateTimeAxis.js", [t["parts/Axis.js"], t["parts/Utilities.js"]], function(t, e) {
        var i = e.addEvent,
            a = e.getMagnitude,
            l = e.normalizeTickInterval,
            h = e.timeUnits,
            o = (s.prototype.normalizeTimeTickInterval = function(t, e) {
                for (var i = e || [
                        ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                        ["second", [1, 2, 5, 10, 15, 30]],
                        ["minute", [1, 2, 5, 10, 15, 30]],
                        ["hour", [1, 2, 3, 4, 6, 8, 12]],
                        ["day", [1, 2]],
                        ["week", [1, 2]],
                        ["month", [1, 2, 3, 4, 6]],
                        ["year", null]
                    ], o = h[(n = i[i.length - 1])[0]], s = n[1], r = 0; r < i.length; r++) {
                    var n, o = h[(n = i[r])[0]],
                        s = n[1];
                    if (i[r + 1] && t <= (o * s[s.length - 1] + h[i[r + 1][0]]) / 2) break
                }
                return o === h.year && t < 5 * o && (s = [1, 2, 5]), {
                    unitRange: o,
                    count: l(t / o, s, "year" === n[0] ? Math.max(a(t / o), 1) : 1),
                    unitName: n[0]
                }
            }, s);

        function s(t) {
            this.axis = t
        }
        var r = (n.compose = function(t) {
            t.keepProps.push("dateTime"), t.prototype.getTimeTicks = function() {
                return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
            }, i(t, "init", function(t) {
                "datetime" === t.userOptions.type ? this.dateTime || (this.dateTime = new o(this)) : this.dateTime = void 0
            })
        }, n.AdditionsClass = o, n);

        function n() {}
        return r.compose(t), r
    }), e(t, "parts/LogarithmicAxis.js", [t["parts/Axis.js"], t["parts/Utilities.js"]], function(t, e) {
        var o = e.addEvent,
            M = e.getMagnitude,
            w = e.normalizeTickInterval,
            S = e.pick,
            s = (i.prototype.getLogTickPositions = function(t, e, i, o) {
                var s = this,
                    r = s.axis,
                    n = r.len,
                    a = r.options,
                    l = [];
                if (o || (s.minorAutoInterval = void 0), .5 <= t) t = Math.round(t), l = r.getLinearTickPositions(t, e, i);
                else if (.08 <= t)
                    for (var h, c, d, p, u, f = .3 < t ? [1, 2, 4] : .15 < t ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9], g = Math.floor(e); g < i + 1 && !u; g++)
                        for (c = f.length, h = 0; h < c && !u; h++) e < (d = s.log2lin(s.lin2log(g) * f[h])) && (!o || p <= i) && void 0 !== p && l.push(p), i < p && (u = !0), p = d;
                else {
                    var m = s.lin2log(e),
                        x = s.lin2log(i),
                        v = o ? r.getMinorTickInterval() : a.tickInterval,
                        y = "auto" === v ? null : v,
                        b = a.tickPixelInterval / (o ? 5 : 1),
                        k = o ? n / r.tickPositions.length : n;
                    t = S(y, s.minorAutoInterval, (x - m) * b / (k || 1)), t = w(t, void 0, M(t)), l = r.getLinearTickPositions(t, m, x).map(s.log2lin), o || (s.minorAutoInterval = t / 5)
                }
                return o || (r.tickInterval = t), l
            }, i.prototype.lin2log = function(t) {
                return Math.pow(10, t)
            }, i.prototype.log2lin = function(t) {
                return Math.log(t) / Math.LN10
            }, i);

        function i(t) {
            this.axis = t
        }
        var r = (n.compose = function(t) {
            t.keepProps.push("logarithmic");
            var e = t.prototype,
                i = s.prototype;
            e.log2lin = i.log2lin, e.lin2log = i.lin2log, o(t, "init", function(t) {
                var e = this,
                    i = t.userOptions,
                    o = e.logarithmic;
                "logarithmic" !== i.type ? e.logarithmic = void 0 : (o = o || (e.logarithmic = new s(e)), e.log2lin !== o.log2lin && (o.log2lin = e.log2lin.bind(e)), e.lin2log !== o.lin2log && (o.lin2log = e.lin2log.bind(e)))
            }), o(t, "afterInit", function() {
                var e = this.logarithmic;
                e && (this.lin2val = function(t) {
                    return e.lin2log(t)
                }, this.val2lin = function(t) {
                    return e.log2lin(t)
                })
            })
        }, n);

        function n() {}
        return r.compose(t), r
    }), e(t, "parts/PlotLineOrBand.js", [t["parts/Globals.js"], t["parts/Axis.js"], t["parts/Utilities.js"]], function(w, t, e) {
        var p = e.arrayMax,
            u = e.arrayMin,
            S = e.defined,
            i = e.destroyObjectProperties,
            r = e.erase,
            o = e.extend,
            A = (e.fireEvent, e.merge),
            T = e.objectEach,
            P = e.pick,
            n = (s.prototype.render = function() {
                w.fireEvent(this, "render");
                var t, i = this,
                    e = i.axis,
                    o = e.horiz,
                    s = e.logarithmic,
                    r = i.options,
                    n = r.label,
                    a = i.label,
                    l = r.to,
                    h = r.from,
                    c = r.value,
                    d = S(h) && S(l),
                    p = S(c),
                    u = i.svgElem,
                    f = !u,
                    g = [],
                    m = r.color,
                    x = P(r.zIndex, 0),
                    v = r.events,
                    y = {
                        class: "highcharts-plot-" + (d ? "band " : "line ") + (r.className || "")
                    },
                    b = {},
                    k = e.chart.renderer,
                    M = d ? "bands" : "lines";
                if (s && (h = s.log2lin(h), l = s.log2lin(l), c = s.log2lin(c)), e.chart.styledMode || (p ? (y.stroke = m || "#999999", y["stroke-width"] = P(r.width, 1), r.dashStyle && (y.dashstyle = r.dashStyle)) : d && (y.fill = m || "#e6ebf5", r.borderWidth && (y.stroke = r.borderColor, y["stroke-width"] = r.borderWidth))), M += "-" + (b.zIndex = x), (t = e.plotLinesAndBandsGroups[M]) || (e.plotLinesAndBandsGroups[M] = t = k.g("plot-" + M).attr(b).add()), f && (i.svgElem = u = k.path().attr(y).add(t)), p) g = e.getPlotLinePath({
                    value: c,
                    lineWidth: u.strokeWidth(),
                    acrossPanes: r.acrossPanes
                });
                else {
                    if (!d) return;
                    g = e.getPlotBandPath(h, l, r)
                }
                return (f || !u.d) && g && g.length ? (u.attr({
                    d: g
                }), v && T(v, function(t, e) {
                    u.on(e, function(t) {
                        v[e].apply(i, [t])
                    })
                })) : u && (g ? (u.show(!0), u.animate({
                    d: g
                })) : u.d && (u.hide(), a && (i.label = a = a.destroy()))), n && (S(n.text) || S(n.formatter)) && g && g.length && 0 < e.width && 0 < e.height && !g.isFlat ? (n = A({
                    align: o && d && "center",
                    x: o ? !d && 4 : 10,
                    verticalAlign: !o && d && "middle",
                    y: o ? d ? 16 : 10 : d ? 6 : -4,
                    rotation: o && !d && 90
                }, n), this.renderLabel(n, g, d, x)) : a && a.hide(), i
            }, s.prototype.renderLabel = function(t, e, i, o) {
                var s, r, n, a, l, h, c = this.label,
                    d = this.axis.chart.renderer;
                c || ((s = {
                    align: t.textAlign || t.align,
                    rotation: t.rotation,
                    class: "highcharts-plot-" + (i ? "band" : "line") + "-label " + (t.className || "")
                }).zIndex = o, h = this.getLabelText(t), this.label = c = d.text(h, 0, 0, t.useHTML).attr(s).add(), this.axis.chart.styledMode || c.css(t.style)), r = e.xBounds || [e[0][1], e[1][1], i ? e[2][1] : e[0][1]], n = e.yBounds || [e[0][2], e[1][2], i ? e[2][2] : e[0][2]], a = u(r), l = u(n), c.align(t, !1, {
                    x: a,
                    y: l,
                    width: p(r) - a,
                    height: p(n) - l
                }), c.show(!0)
            }, s.prototype.getLabelText = function(t) {
                return S(t.formatter) ? t.formatter.call(this) : t.text
            }, s.prototype.destroy = function() {
                r(this.axis.plotLinesAndBands, this), delete this.axis, i(this)
            }, s);

        function s(t, e) {
            this.axis = t, e && (this.options = e, this.id = e.id)
        }
        return o(t.prototype, {
            getPlotBandPath: function(t, e) {
                var i, o, s = this.getPlotLinePath({
                        value: e,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    r = this.getPlotLinePath({
                        value: t,
                        force: !0,
                        acrossPanes: this.options.acrossPanes
                    }),
                    n = [],
                    a = this.horiz,
                    l = 1,
                    h = t < this.min && e < this.min || t > this.max && e > this.max;
                if (r && s)
                    for (h && (o = r.toString() === s.toString(), l = 0), i = 0; i < r.length; i += 2) {
                        var c = r[i],
                            d = r[i + 1],
                            p = s[i],
                            u = s[i + 1];
                        "M" !== c[0] && "L" !== c[0] || "M" !== d[0] && "L" !== d[0] || "M" !== p[0] && "L" !== p[0] || "M" !== u[0] && "L" !== u[0] || (a && p[1] === c[1] ? (p[1] += l, u[1] += l) : a || p[2] !== c[2] || (p[2] += l, u[2] += l), n.push(["M", c[1], c[2]], ["L", d[1], d[2]], ["L", u[1], u[2]], ["L", p[1], p[2]], ["Z"])), n.isFlat = o
                    } else r = null;
                return n
            },
            addPlotBand: function(t) {
                return this.addPlotBandOrLine(t, "plotBands")
            },
            addPlotLine: function(t) {
                return this.addPlotBandOrLine(t, "plotLines")
            },
            addPlotBandOrLine: function(t, e) {
                var i, o = new n(this, t).render(),
                    s = this.userOptions;
                return o && (e && ((i = s[e] || []).push(t), s[e] = i), this.plotLinesAndBands.push(o)), o
            },
            removePlotBandOrLine: function(e) {
                for (var t = this.plotLinesAndBands, i = this.options, o = this.userOptions, s = t.length; s--;) t[s].id === e && t[s].destroy();
                [i.plotLines || [], o.plotLines || [], i.plotBands || [], o.plotBands || []].forEach(function(t) {
                    for (s = t.length; s--;)(t[s] || {}).id === e && r(t, t[s])
                })
            },
            removePlotBand: function(t) {
                this.removePlotBandOrLine(t)
            },
            removePlotLine: function(t) {
                this.removePlotBandOrLine(t)
            }
        }), w.PlotLineOrBand = n, w.PlotLineOrBand
    }), e(t, "parts/Tooltip.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(b, x) {
        var J = x.clamp,
            c = x.css,
            d = x.defined,
            t = x.discardElement,
            k = x.extend,
            v = x.fireEvent,
            p = x.format,
            u = x.isNumber,
            M = x.isString,
            e = x.merge,
            Q = (x.offset, x.pick),
            y = x.splat,
            i = x.syncTimeout,
            f = x.timeUnits,
            w = b.doc,
            o = (s.prototype.applyFilter = function() {
                var t = this.chart;
                t.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + t.index,
                    opacity: .5,
                    children: [{
                        tagName: "feGaussianBlur",
                        in: "SourceAlpha",
                        stdDeviation: 1
                    }, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {
                        tagName: "feComponentTransfer",
                        children: [{
                            tagName: "feFuncA",
                            type: "linear",
                            slope: .3
                        }]
                    }, {
                        tagName: "feMerge",
                        children: [{
                            tagName: "feMergeNode"
                        }, {
                            tagName: "feMergeNode",
                            in: "SourceGraphic"
                        }]
                    }]
                }), t.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + t.index + "{filter:url(#drop-shadow-" + t.index + ")}"
                })
            }, s.prototype.bodyFormatter = function(t) {
                return t.map(function(t) {
                    var e = t.series.tooltipOptions;
                    return (e[(t.point.formatPrefix || "point") + "Formatter"] || t.point.tooltipFormatter).call(t.point, e[(t.point.formatPrefix || "point") + "Format"] || "")
                })
            }, s.prototype.cleanSplit = function(i) {
                this.chart.series.forEach(function(t) {
                    var e = t && t.tt;
                    e && (!e.isActive || i ? t.tt = e.destroy() : e.isActive = !1)
                })
            }, s.prototype.defaultFormatter = function(t) {
                var e = this.points || y(this),
                    i = [t.tooltipFooterHeaderFormatter(e[0])];
                return (i = i.concat(t.bodyFormatter(e))).push(t.tooltipFooterHeaderFormatter(e[0], !0)), i
            }, s.prototype.destroy = function() {
                this.label && (this.label = this.label.destroy()), this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy()), this.renderer && (this.renderer = this.renderer.destroy(), t(this.container)), x.clearTimeout(this.hideTimer), x.clearTimeout(this.tooltipTimeout)
            }, s.prototype.getAnchor = function(t, e) {
                var i, o, s = this.chart,
                    r = s.pointer,
                    n = s.inverted,
                    a = s.plotTop,
                    l = s.plotLeft,
                    h = 0,
                    c = 0;
                return t = y(t), (this.followPointer && e ? (void 0 === e.chartX && (e = r.normalize(e)), [e.chartX - l, e.chartY - a]) : t[0].tooltipPos ? t[0].tooltipPos : (t.forEach(function(t) {
                    i = t.series.yAxis, o = t.series.xAxis, h += t.plotX + (!n && o ? o.left - l : 0), c += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!n && i ? i.top - a : 0)
                }), h /= t.length, c /= t.length, [n ? s.plotWidth - c : h, this.shared && !n && 1 < t.length && e ? e.chartY - a : n ? s.plotHeight - h : c])).map(Math.round)
            }, s.prototype.getDateFormat = function(t, e, i, o) {
                var s, r, n = this.chart.time,
                    a = n.dateFormat("%m-%d %H:%M:%S.%L", e),
                    l = "01-01 00:00:00.000",
                    h = {
                        millisecond: 15,
                        second: 12,
                        minute: 9,
                        hour: 6,
                        day: 3
                    },
                    c = "millisecond";
                for (r in f) {
                    if (t === f.week && +n.dateFormat("%w", e) === i && a.substr(6) === l.substr(6)) {
                        r = "week";
                        break
                    }
                    if (f[r] > t) {
                        r = c;
                        break
                    }
                    if (h[r] && a.substr(h[r]) !== l.substr(h[r])) break;
                    "week" !== r && (c = r)
                }
                return r && (s = n.resolveDTLFormat(o[r]).main), s
            }, s.prototype.getLabel = function() {
                var t, e, i, o, s = this,
                    r = this.chart.renderer,
                    n = this.chart.styledMode,
                    a = this.options,
                    l = "tooltip" + (d(a.className) ? " " + a.className : ""),
                    h = (null === (t = a.style) || void 0 === t ? void 0 : t.pointerEvents) || (!this.followPointer && a.stickOnContact ? "auto" : "none");
                return this.label || (this.outside && (this.container = i = b.doc.createElement("div"), i.className = "highcharts-tooltip-container", c(i, {
                    position: "absolute",
                    top: "1px",
                    pointerEvents: h,
                    zIndex: 3
                }), b.doc.body.appendChild(i), this.renderer = r = new b.Renderer(i, 0, 0, null === (e = this.chart.options.chart) || void 0 === e ? void 0 : e.style, void 0, void 0, r.styledMode)), this.split ? this.label = r.g(l) : (this.label = r.label("", 0, 0, a.shape || "callout", null, null, a.useHTML, null, l).attr({
                    padding: a.padding,
                    r: a.borderRadius
                }), n || this.label.attr({
                    fill: a.backgroundColor,
                    "stroke-width": a.borderWidth
                }).css(a.style).css({
                    pointerEvents: h
                }).shadow(a.shadow)), n && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)), s.outside && !s.split && (o = {
                    x: this.label.xSetter,
                    y: this.label.ySetter
                }, this.label.xSetter = function(t, e) {
                    o[e].call(this.label, s.distance), i.style.left = t + "px"
                }, this.label.ySetter = function(t, e) {
                    o[e].call(this.label, s.distance), i.style.top = t + "px"
                }), this.label.on("mouseenter", function() {
                    s.inContact = !0
                }).on("mouseleave", function() {
                    var t = s.chart.hoverSeries;
                    s.inContact = !1, t && t.onMouseOut && t.onMouseOut()
                }).attr({
                    zIndex: 8
                }).add()), this.label
            }, s.prototype.getPosition = function(i, o, s) {
                function u(t) {
                    return d ? t * d.scaleX : t
                }

                function f(t) {
                    return d ? t * d.scaleY : t
                }

                function t(t) {
                    var e = "x" === t;
                    return [t, e ? l : h, e ? i : o].concat(a ? [e ? u(i) : f(o), e ? c.left - g + u(s.plotX + n.plotLeft) : c.top - g + f(s.plotY + n.plotTop), 0, e ? l : h] : [e ? i : o, e ? s.plotX + n.plotLeft : s.plotY + n.plotTop, e ? n.plotLeft : n.plotTop, e ? n.plotLeft + n.plotWidth : n.plotTop + n.plotHeight])
                }

                function e(t) {
                    var e = p;
                    p = v, v = e, r = t
                }
                var r, n = this.chart,
                    g = this.distance,
                    m = {},
                    x = n.inverted && s.h || 0,
                    a = this.outside,
                    l = a ? w.documentElement.clientWidth - 2 * g : n.chartWidth,
                    h = a ? Math.max(w.body.scrollHeight, w.documentElement.scrollHeight, w.body.offsetHeight, w.documentElement.offsetHeight, w.documentElement.clientHeight) : n.chartHeight,
                    c = n.pointer.getChartPosition(),
                    d = n.containerScaling,
                    p = t("y"),
                    v = t("x"),
                    y = !this.followPointer && Q(s.ttBelow, !n.inverted == !!s.negative),
                    b = function() {
                        !1 !== function(t, e, i, o, s, r, n) {
                            var a = ("y" === t ? f : u)(g),
                                l = (i - o) / 2,
                                h = o < s - g,
                                c = s + g + o < e,
                                d = s - a - i + l,
                                p = s + a - l;
                            if (y && c) m[t] = p;
                            else if (!y && h) m[t] = d;
                            else if (h) m[t] = Math.min(n - o, d - x < 0 ? d : d - x);
                            else {
                                if (!c) return !1;
                                m[t] = Math.max(r, e < p + x + i ? p : p + x)
                            }
                        }.apply(0, p) ? !1 !== function(t, e, i, o, s) {
                            var r;
                            return s < g || e - g < s ? r = !1 : m[t] = s < i / 2 ? 1 : e - o / 2 < s ? e - o - 2 : s - i / 2, r
                        }.apply(0, v) || r || (e(!0), b()) : r ? m.x = m.y = 0 : (e(!0), b())
                    };
                return (n.inverted || 1 < this.len) && e(), b(), m
            }, s.prototype.getXDateFormat = function(t, e, i) {
                var o = e.dateTimeLabelFormats,
                    s = i && i.closestPointRange,
                    r = s ? this.getDateFormat(s, t.x, i.options.startOfWeek, o) : o.day;
                return r || o.year
            }, s.prototype.hide = function(t) {
                var e = this;
                x.clearTimeout(this.hideTimer), t = Q(t, this.options.hideDelay, 500), this.isHidden || (this.hideTimer = i(function() {
                    e.getLabel().fadeOut(t ? void 0 : t), e.isHidden = !0
                }, t))
            }, s.prototype.init = function(t, e) {
                this.chart = t, this.options = e, this.crosshairs = [], this.now = {
                    x: 0,
                    y: 0
                }, this.isHidden = !0, this.split = e.split && !t.inverted && !t.polar, this.shared = e.shared || this.split, this.outside = Q(e.outside, Boolean(t.scrollablePixelsX || t.scrollablePixelsY))
            }, s.prototype.isStickyOnContact = function() {
                return !(this.followPointer || !this.options.stickOnContact || !this.inContact)
            }, s.prototype.move = function(t, e, i, o) {
                var s = this,
                    r = s.now,
                    n = !1 !== s.options.animation && !s.isHidden && (1 < Math.abs(t - r.x) || 1 < Math.abs(e - r.y)),
                    a = s.followPointer || 1 < s.len;
                k(r, {
                    x: n ? (2 * r.x + t) / 3 : t,
                    y: n ? (r.y + e) / 2 : e,
                    anchorX: a ? void 0 : n ? (2 * r.anchorX + i) / 3 : i,
                    anchorY: a ? void 0 : n ? (r.anchorY + o) / 2 : o
                }), s.getLabel().attr(r), s.drawTracker(), n && (x.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    s && s.move(t, e, i, o)
                }, 32))
            }, s.prototype.refresh = function(t, e) {
                var i, o, s, r, n, a, l = this,
                    h = this.chart,
                    c = l.options,
                    d = t,
                    p = {},
                    u = [],
                    f = c.formatter || l.defaultFormatter,
                    g = l.shared,
                    m = h.styledMode;
                c.enabled && (x.clearTimeout(this.hideTimer), l.followPointer = y(d)[0].series.tooltipOptions.followPointer, i = (s = l.getAnchor(d, e))[0], o = s[1], !g || d.series && d.series.noSharedTooltip ? p = d.getLabelConfig() : (h.pointer.applyInactiveState(d), d.forEach(function(t) {
                    t.setState("hover"), u.push(t.getLabelConfig())
                }), (p = {
                    x: d[0].category,
                    y: d[0].y
                }).points = u, d = d[0]), this.len = u.length, r = f.call(p, l), n = d.series, this.distance = Q(n.tooltipOptions.distance, 16), !1 === r ? this.hide() : (l.split ? this.renderSplit(r, y(t)) : (a = l.getLabel(), c.style.width && !m || a.css({
                    width: this.chart.spacingBox.width + "px"
                }), a.attr({
                    text: r && r.join ? r.join("") : r
                }), a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + Q(d.colorIndex, n.colorIndex)), m || a.attr({
                    stroke: c.borderColor || d.color || n.color || "#666666"
                }), l.updatePosition({
                    plotX: i,
                    plotY: o,
                    negative: d.negative,
                    ttBelow: d.ttBelow,
                    h: s[2] || 0
                })), l.isHidden && l.label && l.label.attr({
                    opacity: 1
                }).show(), l.isHidden = !1), v(this, "refresh"))
            }, s.prototype.renderSplit = function(t, B) {
                var I = this,
                    e = I.chart,
                    i = I.chart,
                    o = i.chartWidth,
                    s = i.chartHeight,
                    z = i.plotHeight,
                    R = i.plotLeft,
                    W = i.plotTop,
                    r = i.pointer,
                    G = i.renderer,
                    n = i.scrollablePixelsY,
                    N = void 0 === n ? 0 : n,
                    a = i.scrollingContainer,
                    l = void 0 === a ? {
                        scrollLeft: 0,
                        scrollTop: 0
                    } : a,
                    h = l.scrollLeft,
                    X = l.scrollTop,
                    j = i.styledMode,
                    H = I.distance,
                    Y = I.options,
                    F = I.options.positioner,
                    U = {
                        left: h,
                        right: h + o,
                        top: X,
                        bottom: X + s
                    },
                    V = I.getLabel(),
                    _ = Boolean(e.xAxis[0] && e.xAxis[0].opposite),
                    K = W + X,
                    Z = 0,
                    q = z - N;

                function $(t, e, i, o, s) {
                    var r, n;
                    return void 0 === s && (s = !0), {
                        x: n = i ? (r = _ ? 0 : q, J(t - o / 2, U.left, U.right - o)) : (r = e - K, J(n = s ? t - o - H : t + H, s ? n : U.left, U.right)),
                        y: r
                    }
                }
                M(t) && (t = [!1, t]);
                var c = t.slice(0, B.length + 1).reduce(function(t, e, i) {
                    var o, s, r, n, a, l, h, c, d, p, u, f, g, m, x, v, y, b, k, M, w, S, A, T, P, C, L, E, O, D;
                    return !1 !== e && "" !== e && (l = (a = (n = (r = (s = (o = B[i - 1] || {
                        isHeader: !0,
                        plotX: B[0].plotX,
                        plotY: z,
                        series: {}
                    }).isHeader) ? I : o.series).tt = (A = r.tt, P = e, L = A, E = (T = o).isHeader, O = T.series, D = "highcharts-color-" + Q(T.colorIndex, O.colorIndex, "none"), L || (C = {
                        padding: Y.padding,
                        r: Y.borderRadius
                    }, j || (C.fill = Y.backgroundColor, C["stroke-width"] = Y.borderWidth), L = G.label("", 0, 0, Y[E ? "headerShape" : "shape"] || "callout", void 0, void 0, Y.useHTML).addClass((E ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + D).attr(C).add(V)), L.isActive = !0, L.attr({
                        text: P
                    }), j || L.css(Y.style).shadow(Y.shadow).attr({
                        stroke: Y.borderColor || T.color || O.color || "#333333"
                    }), L)).getBBox()).width + n.strokeWidth(), s && (Z = a.height, q += Z, _ && (K -= Z)), y = (f = o).isHeader, b = f.plotX, k = void 0 === b ? 0 : b, M = f.plotY, w = void 0 === M ? 0 : M, S = f.series, y ? (v = R + k, g = W + z / 2) : (m = S.xAxis, x = S.yAxis, v = m.pos + J(k, -H, m.len + H), x.pos + w >= X + W && x.pos + w <= X + W + z - N && (g = x.pos + w)), c = (h = {
                        anchorX: v = J(v, U.left - H, U.right + H),
                        anchorY: g
                    }).anchorX, "number" == typeof(d = h.anchorY) ? (p = a.height + 1, u = F ? F.call(I, l, p, o) : $(c, d, s, l), t.push({
                        align: F ? 0 : void 0,
                        anchorX: c,
                        anchorY: d,
                        boxWidth: l,
                        point: o,
                        rank: Q(u.rank, s ? 1 : 0),
                        size: p,
                        target: u.y,
                        tt: n,
                        x: u.x
                    })) : n.isActive = !1), t
                }, []);
                !F && c.some(function(t) {
                    return t.x < U.left
                }) && (c = c.map(function(t) {
                    var e = $(t.anchorX, t.anchorY, t.point.isHeader, t.boxWidth, !1),
                        i = e.x,
                        o = e.y;
                    return k(t, {
                        target: o,
                        x: i
                    })
                })), I.cleanSplit(), b.distribute(c, q), c.forEach(function(t) {
                    var e = t.anchorX,
                        i = t.anchorY,
                        o = t.pos,
                        s = t.x;
                    t.tt.attr({
                        visibility: void 0 === o ? "hidden" : "inherit",
                        x: s,
                        y: o + K,
                        anchorX: e,
                        anchorY: i
                    })
                });
                var d, p, u, f, g, m, x = I.container,
                    v = I.outside,
                    y = I.renderer;
                v && x && y && (p = (d = V.getBBox()).width, u = d.height, f = d.x, g = d.y, y.setSize(p + f, u + g, !1), m = r.getChartPosition(), x.style.left = m.left + "px", x.style.top = m.top + "px")
            }, s.prototype.drawTracker = function() {
                var t, e, i, o, s, r, n = this;
                !n.followPointer && n.options.stickOnContact ? (t = n.chart, e = n.label, i = t.hoverPoint, e && i && (o = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }, s = this.getAnchor(i), r = e.getBBox(), s[0] += t.plotLeft - e.translateX, s[1] += t.plotTop - e.translateY, o.x = Math.min(0, s[0]), o.y = Math.min(0, s[1]), o.width = s[0] < 0 ? Math.max(Math.abs(s[0]), r.width - s[0]) : Math.max(Math.abs(s[0]), r.width), o.height = s[1] < 0 ? Math.max(Math.abs(s[1]), r.height - Math.abs(s[1])) : Math.max(Math.abs(s[1]), r.height), n.tracker ? n.tracker.attr(o) : (n.tracker = e.renderer.rect(o).addClass("highcharts-tracker").add(e), t.styledMode || n.tracker.attr({
                    fill: "rgba(0,0,0,0)"
                })))) : n.tracker && n.tracker.destroy()
            }, s.prototype.styledModeFormat = function(t) {
                return t.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"')
            }, s.prototype.tooltipFooterHeaderFormatter = function(e, t) {
                var i = t ? "footer" : "header",
                    o = e.series,
                    s = o.tooltipOptions,
                    r = s.xDateFormat,
                    n = o.xAxis,
                    a = n && "datetime" === n.options.type && u(e.key),
                    l = s[i + "Format"],
                    h = {
                        isFooter: t,
                        labelConfig: e
                    };
                return v(this, "headerFormatter", h, function(t) {
                    a && !r && (r = this.getXDateFormat(e, s, n)), a && r && (e.point && e.point.tooltipDateKeys || ["key"]).forEach(function(t) {
                        l = l.replace("{point." + t + "}", "{point." + t + ":" + r + "}")
                    }), o.chart.styledMode && (l = this.styledModeFormat(l)), t.text = p(l, {
                        point: e,
                        series: o
                    }, this.chart)
                }), h.text
            }, s.prototype.update = function(t) {
                this.destroy(), e(!0, this.chart.options.tooltip.userOptions, t), this.init(this.chart, e(!0, this.options, t))
            }, s.prototype.updatePosition = function(t) {
                var e, i, o = this.chart,
                    s = o.pointer,
                    r = this.getLabel(),
                    n = t.plotX + o.plotLeft,
                    a = t.plotY + o.plotTop,
                    l = s.getChartPosition(),
                    h = (this.options.positioner || this.getPosition).call(this, r.width, r.height, t);
                this.outside && (e = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(r.width + e, r.height + e, !1), (i = o.containerScaling) && (c(this.container, {
                    transform: "scale(" + i.scaleX + ", " + i.scaleY + ")"
                }), n *= i.scaleX, a *= i.scaleY), n += l.left - h.x, a += l.top - h.y), this.move(Math.round(h.x), Math.round(h.y || 0), n, a)
            }, s);

        function s(t, e) {
            this.crosshairs = [], this.distance = 0, this.isHidden = !0, this.isSticky = !1, this.now = {}, this.options = {}, this.outside = !1, this.chart = t, this.init(t, e)
        }
        return b.Tooltip = o, b.Tooltip
    }), e(t, "parts/Pointer.js", [t["parts/Globals.js"], t["parts/Utilities.js"], t["parts/Tooltip.js"], t["parts/Color.js"]], function(t, e, i, o) {
        var g = e.addEvent,
            s = e.attr,
            f = e.css,
            m = e.defined,
            x = e.extend,
            v = e.find,
            y = e.fireEvent,
            b = e.isNumber,
            k = e.isObject,
            r = e.objectEach,
            n = e.offset,
            M = e.pick,
            h = e.splat,
            w = o.parse,
            S = t,
            A = S.charts,
            p = S.noop,
            a = (l.prototype.applyInactiveState = function(t) {
                var e, i = [];
                (t || []).forEach(function(t) {
                    e = t.series, i.push(e), e.linkedParent && i.push(e.linkedParent), e.linkedSeries && (i = i.concat(e.linkedSeries)), e.navigatorSeries && i.push(e.navigatorSeries)
                }), this.chart.series.forEach(function(t) {
                    -1 === i.indexOf(t) ? t.setState("inactive", !0) : t.options.inactiveOtherPoints && t.setAllPointsToState("inactive")
                })
            }, l.prototype.destroy = function() {
                var i = this;
                void 0 !== i.unDocMouseMove && i.unDocMouseMove(), this.unbindContainerMouseLeave(), S.chartCount || (S.unbindDocumentMouseUp && (S.unbindDocumentMouseUp = S.unbindDocumentMouseUp()), S.unbindDocumentTouchEnd && (S.unbindDocumentTouchEnd = S.unbindDocumentTouchEnd())), clearInterval(i.tooltipTimeout), r(i, function(t, e) {
                    i[e] = null
                })
            }, l.prototype.drag = function(t) {
                var e, i, o = this.chart,
                    s = o.options.chart,
                    r = t.chartX,
                    n = t.chartY,
                    a = this.zoomHor,
                    l = this.zoomVert,
                    h = o.plotLeft,
                    c = o.plotTop,
                    d = o.plotWidth,
                    p = o.plotHeight,
                    u = this.selectionMarker,
                    f = this.mouseDownX || 0,
                    g = this.mouseDownY || 0,
                    m = k(s.panning) ? s.panning && s.panning.enabled : s.panning,
                    x = s.panKey && t[s.panKey + "Key"];
                u && u.touch || (r < h ? r = h : h + d < r && (r = h + d), n < c ? n = c : c + p < n && (n = c + p), this.hasDragged = Math.sqrt(Math.pow(f - r, 2) + Math.pow(g - n, 2)), 10 < this.hasDragged && (e = o.isInsidePlot(f - h, g - c), o.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !x && (u || (this.selectionMarker = u = o.renderer.rect(h, c, a ? 1 : d, l ? 1 : p, 0).attr({
                    class: "highcharts-selection-marker",
                    zIndex: 7
                }).add(), o.styledMode || u.attr({
                    fill: s.selectionMarkerFill || w("#335cad").setOpacity(.25).get()
                }))), u && a && (i = r - f, u.attr({
                    width: Math.abs(i),
                    x: (0 < i ? 0 : i) + f
                })), u && l && (i = n - g, u.attr({
                    height: Math.abs(i),
                    y: (0 < i ? 0 : i) + g
                })), e && !u && m && o.pan(t, s.panning)))
            }, l.prototype.dragStart = function(t) {
                var e = this.chart;
                e.mouseIsDown = t.type, e.cancelClick = !1, e.mouseDownX = this.mouseDownX = t.chartX, e.mouseDownY = this.mouseDownY = t.chartY
            }, l.prototype.drop = function(r) {
                var n, t, a, l, h, c, d, p = this,
                    e = this.chart,
                    u = this.hasPinched;
                this.selectionMarker && (n = {
                    originalEvent: r,
                    xAxis: [],
                    yAxis: []
                }, t = this.selectionMarker, a = t.attr ? t.attr("x") : t.x, l = t.attr ? t.attr("y") : t.y, h = t.attr ? t.attr("width") : t.width, c = t.attr ? t.attr("height") : t.height, (this.hasDragged || u) && (e.axes.forEach(function(t) {
                    var e, i, o, s;
                    t.zoomEnabled && m(t.min) && (u || p[{
                        xAxis: "zoomX",
                        yAxis: "zoomY"
                    }[t.coll]]) && (e = t.horiz, i = "touchend" === r.type ? t.minPixelPadding : 0, o = t.toValue((e ? a : l) + i), s = t.toValue((e ? a + h : l + c) - i), n[t.coll].push({
                        axis: t,
                        min: Math.min(o, s),
                        max: Math.max(o, s)
                    }), d = !0)
                }), d && y(e, "selection", n, function(t) {
                    e.zoom(x(t, u ? {
                        animation: !1
                    } : null))
                })), b(e.index) && (this.selectionMarker = this.selectionMarker.destroy()), u && this.scaleGroups()), e && b(e.index) && (f(e.container, {
                    cursor: e._cursor
                }), e.cancelClick = 10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            }, l.prototype.findNearestKDPoint = function(t, l, h) {
                var c, e = this.chart,
                    i = e.hoverPoint,
                    o = e.tooltip;
                return i && o && o.isStickyOnContact() ? i : (t.forEach(function(t) {
                    var e, i, o, s, r, n = !(t.noSharedTooltip && l) && t.options.findNearestPointBy.indexOf("y") < 0,
                        a = t.searchPoint(h, n);
                    k(a, !0) && (!k(c, !0) || (i = a, o = (e = c).distX - i.distX, s = e.dist - i.dist, r = (i.series.group && i.series.group.zIndex) - (e.series.group && e.series.group.zIndex), 0 < (0 != o && l ? o : 0 != s ? s : 0 != r ? r : e.series.index > i.series.index ? -1 : 1))) && (c = a)
                }), c)
            }, l.prototype.getChartCoordinatesFromPoint = function(t, e) {
                var i = t.series,
                    o = i.xAxis,
                    s = i.yAxis,
                    r = M(t.clientX, t.plotX),
                    n = t.shapeArgs;
                return o && s ? e ? {
                    chartX: o.len + o.pos - r,
                    chartY: s.len + s.pos - t.plotY
                } : {
                    chartX: r + o.pos,
                    chartY: t.plotY + s.pos
                } : n && n.x && n.y ? {
                    chartX: n.x,
                    chartY: n.y
                } : void 0
            }, l.prototype.getChartPosition = function() {
                return this.chartPosition || (this.chartPosition = n(this.chart.container))
            }, l.prototype.getCoordinates = function(e) {
                var i = {
                    xAxis: [],
                    yAxis: []
                };
                return this.chart.axes.forEach(function(t) {
                    i[t.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: t,
                        value: t.toValue(e[t.horiz ? "chartX" : "chartY"])
                    })
                }), i
            }, l.prototype.getHoverData = function(t, e, i, o, s, r) {
                function n(t) {
                    return t.visible && !(!s && t.directTouch) && M(t.options.enableMouseTracking, !0)
                }
                var a, l, h = [],
                    c = e,
                    d = !(!o || !t),
                    p = c && !c.stickyTracking,
                    u = {
                        chartX: r ? r.chartX : void 0,
                        chartY: r ? r.chartY : void 0,
                        shared: s
                    };
                return y(this, "beforeGetHoverData", u), l = p ? [c] : i.filter(function(t) {
                    return u.filter ? u.filter(t) : n(t) && t.stickyTracking
                }), c = (a = d || !r ? t : this.findNearestKDPoint(l, s, r)) && a.series, a && (s && !c.noSharedTooltip ? (l = i.filter(function(t) {
                    return u.filter ? u.filter(t) : n(t) && !t.noSharedTooltip
                })).forEach(function(t) {
                    var e = v(t.points, function(t) {
                        return t.x === a.x && !t.isNull
                    });
                    k(e) && (t.chart.isBoosting && (e = t.getPoint(e)), h.push(e))
                }) : h.push(a)), y(this, "afterGetHoverData", u = {
                    hoverPoint: a
                }), {
                    hoverPoint: u.hoverPoint,
                    hoverSeries: c,
                    hoverPoints: h
                }
            }, l.prototype.getPointFromEvent = function(t) {
                for (var e, i = t.target; i && !e;) e = i.point, i = i.parentNode;
                return e
            }, l.prototype.onTrackerMouseOut = function(t) {
                var e = this.chart,
                    i = t.relatedTarget || t.toElement,
                    o = e.hoverSeries;
                this.isDirectTouch = !1, !o || !i || o.stickyTracking || this.inClass(i, "highcharts-tooltip") || this.inClass(i, "highcharts-series-" + o.index) && this.inClass(i, "highcharts-tracker") || o.onMouseOut()
            }, l.prototype.inClass = function(t, e) {
                for (var i; t;) {
                    if (i = s(t, "class")) {
                        if (-1 !== i.indexOf(e)) return !0;
                        if (-1 !== i.indexOf("highcharts-container")) return !1
                    }
                    t = t.parentNode
                }
            }, l.prototype.init = function(t, e) {
                this.options = e, this.chart = t, this.runChartClick = e.chart.events && !!e.chart.events.click, this.pinchDown = [], this.lastValidTouch = {}, i && (t.tooltip = new i(t, e.tooltip), this.followTouchMove = M(e.tooltip.followTouchMove, !0)), this.setDOMEvents()
            }, l.prototype.normalize = function(t, e) {
                var i = t.touches,
                    o = i ? i.length ? i.item(0) : i.changedTouches[0] : t;
                e = e || this.getChartPosition();
                var s = o.pageX - e.left,
                    r = o.pageY - e.top,
                    n = this.chart.containerScaling;
                return n && (s /= n.scaleX, r /= n.scaleY), x(t, {
                    chartX: Math.round(s),
                    chartY: Math.round(r)
                })
            }, l.prototype.onContainerClick = function(t) {
                var e = this.chart,
                    i = e.hoverPoint,
                    o = this.normalize(t),
                    s = e.plotLeft,
                    r = e.plotTop;
                e.cancelClick || (i && this.inClass(o.target, "highcharts-tracker") ? (y(i.series, "click", x(o, {
                    point: i
                })), e.hoverPoint && i.firePointEvent("click", o)) : (x(o, this.getCoordinates(o)), e.isInsidePlot(o.chartX - s, o.chartY - r) && y(e, "click", o)))
            }, l.prototype.onContainerMouseDown = function(t) {
                t = this.normalize(t), S.isFirefox && 0 !== t.button && this.onContainerMouseMove(t), void 0 !== t.button && 1 != (1 & (t.buttons || t.button)) || (this.zoomOption(t), this.dragStart(t))
            }, l.prototype.onContainerMouseLeave = function(t) {
                var e = A[M(S.hoverChartIndex, -1)],
                    i = this.chart.tooltip;
                t = this.normalize(t), e && (t.relatedTarget || t.toElement) && (e.pointer.reset(), e.pointer.chartPosition = void 0), i && !i.isHidden && this.reset()
            }, l.prototype.onContainerMouseMove = function(t) {
                var e = this.chart,
                    i = this.normalize(t);
                this.setHoverChartIndex(), i.preventDefault || (i.returnValue = !1), "mousedown" === e.mouseIsDown && this.drag(i), e.openMenu || !this.inClass(i.target, "highcharts-tracker") && !e.isInsidePlot(i.chartX - e.plotLeft, i.chartY - e.plotTop) || this.runPointActions(i)
            }, l.prototype.onDocumentTouchEnd = function(t) {
                A[S.hoverChartIndex] && A[S.hoverChartIndex].pointer.drop(t)
            }, l.prototype.onContainerTouchMove = function(t) {
                this.touch(t)
            }, l.prototype.onContainerTouchStart = function(t) {
                this.zoomOption(t), this.touch(t, !0)
            }, l.prototype.onDocumentMouseMove = function(t) {
                var e = this.chart,
                    i = this.chartPosition,
                    o = this.normalize(t, i),
                    s = e.tooltip;
                !i || s && s.isStickyOnContact() || e.isInsidePlot(o.chartX - e.plotLeft, o.chartY - e.plotTop) || this.inClass(o.target, "highcharts-tracker") || this.reset()
            }, l.prototype.onDocumentMouseUp = function(t) {
                var e = A[M(S.hoverChartIndex, -1)];
                e && e.pointer.drop(t)
            }, l.prototype.pinch = function(t) {
                var e = this,
                    a = e.chart,
                    i = e.pinchDown,
                    o = t.touches || [],
                    s = o.length,
                    r = e.lastValidTouch,
                    n = e.hasZoom,
                    l = e.selectionMarker,
                    h = {},
                    c = 1 === s && (e.inClass(t.target, "highcharts-tracker") && a.runTrackerClick || e.runChartClick),
                    d = {};
                1 < s && (e.initiated = !0), n && e.initiated && !c && t.preventDefault(), [].map.call(o, function(t) {
                    return e.normalize(t)
                }), "touchstart" === t.type ? ([].forEach.call(o, function(t, e) {
                    i[e] = {
                        chartX: t.chartX,
                        chartY: t.chartY
                    }
                }), r.x = [i[0].chartX, i[1] && i[1].chartX], r.y = [i[0].chartY, i[1] && i[1].chartY], a.axes.forEach(function(t) {
                    var e, i, o, s, r, n;
                    t.zoomEnabled && (e = a.bounds[t.horiz ? "h" : "v"], i = t.minPixelPadding, o = t.toPixels(Math.min(M(t.options.min, t.dataMin), t.dataMin)), s = t.toPixels(Math.max(M(t.options.max, t.dataMax), t.dataMax)), r = Math.min(o, s), n = Math.max(o, s), e.min = Math.min(t.pos, r - i), e.max = Math.max(t.pos + t.len, n + i))
                }), e.res = !0) : e.followTouchMove && 1 === s ? this.runPointActions(e.normalize(t)) : i.length && (l || (e.selectionMarker = l = x({
                    destroy: p,
                    touch: !0
                }, a.plotBox)), e.pinchTranslate(i, o, h, l, d, r), e.hasPinched = n, e.scaleGroups(h, d), e.res && (e.res = !1, this.reset(!1, 0)))
            }, l.prototype.pinchTranslate = function(t, e, i, o, s, r) {
                this.zoomHor && this.pinchTranslateDirection(!0, t, e, i, o, s, r), this.zoomVert && this.pinchTranslateDirection(!1, t, e, i, o, s, r)
            }, l.prototype.pinchTranslateDirection = function(t, e, i, o, s, r, n, a) {
                function l() {
                    "number" == typeof C && 20 < Math.abs(A - P) && (k = a || Math.abs(T - C) / Math.abs(A - P)), d = (b - T) / k + A, h = g["plot" + (t ? "Width" : "Height")] / k
                }
                var h, c, d, p, u, f, g = this.chart,
                    m = t ? "x" : "y",
                    x = t ? "X" : "Y",
                    v = "chart" + x,
                    y = t ? "width" : "height",
                    b = g["plot" + (t ? "Left" : "Top")],
                    k = a || 1,
                    M = g.inverted,
                    w = g.bounds[t ? "h" : "v"],
                    S = 1 === e.length,
                    A = e[0][v],
                    T = i[0][v],
                    P = !S && e[1][v],
                    C = !S && i[1][v];
                l(), (c = d) < w.min ? (c = w.min, p = !0) : c + h > w.max && (c = w.max - h, p = !0), p ? (T -= .8 * (T - n[m][0]), "number" == typeof C && (C -= .8 * (C - n[m][1])), l()) : n[m] = [T, C], M || (r[m] = d - b, r[y] = h), f = M ? t ? "scaleY" : "scaleX" : "scale" + x, u = M ? 1 / k : k, s[y] = h, s[m] = c, o[f] = k, o["translate" + x] = u * b + (T - u * A)
            }, l.prototype.reset = function(e, t) {
                var i = this,
                    o = i.chart,
                    s = o.hoverSeries,
                    r = o.hoverPoint,
                    n = o.hoverPoints,
                    a = o.tooltip,
                    l = a && a.shared ? n : r;
                e && l && h(l).forEach(function(t) {
                    t.series.isCartesian && void 0 === t.plotX && (e = !1)
                }), e ? a && l && h(l).length && (a.refresh(l), a.shared && n ? n.forEach(function(t) {
                    t.setState(t.state, !0), t.series.isCartesian && (t.series.xAxis.crosshair && t.series.xAxis.drawCrosshair(null, t), t.series.yAxis.crosshair && t.series.yAxis.drawCrosshair(null, t))
                }) : r && (r.setState(r.state, !0), o.axes.forEach(function(t) {
                    t.crosshair && r.series[t.coll] === t && t.drawCrosshair(null, r)
                }))) : (r && r.onMouseOut(), n && n.forEach(function(t) {
                    t.setState()
                }), s && s.onMouseOut(), a && a.hide(t), i.unDocMouseMove && (i.unDocMouseMove = i.unDocMouseMove()), o.axes.forEach(function(t) {
                    t.hideCrosshair()
                }), i.hoverX = o.hoverPoints = o.hoverPoint = null)
            }, l.prototype.runPointActions = function(o, t) {
                var e, i = this,
                    s = i.chart,
                    r = s.series,
                    n = s.tooltip && s.tooltip.options.enabled ? s.tooltip : void 0,
                    a = !!n && n.shared,
                    l = (d = t || s.hoverPoint) && d.series || s.hoverSeries,
                    h = (!o || "touchmove" !== o.type) && (!!t || l && l.directTouch && i.isDirectTouch),
                    c = this.getHoverData(d, l, r, h, a, o),
                    d = c.hoverPoint,
                    p = c.hoverPoints,
                    u = (l = c.hoverSeries) && l.tooltipOptions.followPointer,
                    f = a && l && !l.noSharedTooltip;
                if (d && (d !== s.hoverPoint || n && n.isHidden)) {
                    if ((s.hoverPoints || []).forEach(function(t) {
                            -1 === p.indexOf(t) && t.setState()
                        }), s.hoverSeries !== l && l.onMouseOver(), i.applyInactiveState(p), (p || []).forEach(function(t) {
                            t.setState("hover")
                        }), s.hoverPoint && s.hoverPoint.firePointEvent("mouseOut"), !d.series) return;
                    d.firePointEvent("mouseOver"), s.hoverPoints = p, s.hoverPoint = d, n && n.refresh(f ? p : d, o)
                } else u && n && !n.isHidden && (e = n.getAnchor([{}], o), n.updatePosition({
                    plotX: e[0],
                    plotY: e[1]
                }));
                i.unDocMouseMove || (i.unDocMouseMove = g(s.container.ownerDocument, "mousemove", function(t) {
                    var e = A[S.hoverChartIndex];
                    e && e.pointer.onDocumentMouseMove(t)
                })), s.axes.forEach(function(e) {
                    var t, i = M((e.crosshair || {}).snap, !0);
                    i && ((t = s.hoverPoint) && t.series[e.coll] === e || (t = v(p, function(t) {
                        return t.series[e.coll] === e
                    }))), t || !i ? e.drawCrosshair(o, t) : e.hideCrosshair()
                })
            }, l.prototype.scaleGroups = function(e, i) {
                var o, s = this.chart;
                s.series.forEach(function(t) {
                    o = e || t.getPlotBox(), t.xAxis && t.xAxis.zoomEnabled && t.group && (t.group.attr(o), t.markerGroup && (t.markerGroup.attr(o), t.markerGroup.clip(i ? s.clipRect : null)), t.dataLabelsGroup && t.dataLabelsGroup.attr(o))
                }), s.clipRect.attr(i || s.clipBox)
            }, l.prototype.setDOMEvents = function() {
                var t = this.chart.container,
                    e = t.ownerDocument;
                t.onmousedown = this.onContainerMouseDown.bind(this), t.onmousemove = this.onContainerMouseMove.bind(this), t.onclick = this.onContainerClick.bind(this), this.unbindContainerMouseLeave = g(t, "mouseleave", this.onContainerMouseLeave.bind(this)), S.unbindDocumentMouseUp || (S.unbindDocumentMouseUp = g(e, "mouseup", this.onDocumentMouseUp.bind(this))), S.hasTouch && (g(t, "touchstart", this.onContainerTouchStart.bind(this)), g(t, "touchmove", this.onContainerTouchMove.bind(this)), S.unbindDocumentTouchEnd || (S.unbindDocumentTouchEnd = g(e, "touchend", this.onDocumentTouchEnd.bind(this))))
            }, l.prototype.setHoverChartIndex = function() {
                var t = this.chart,
                    e = S.charts[M(S.hoverChartIndex, -1)];
                e && e !== t && e.pointer.onContainerMouseLeave({
                    relatedTarget: !0
                }), e && e.mouseIsDown || (S.hoverChartIndex = t.index)
            }, l.prototype.touch = function(t, e) {
                var i, o, s = this.chart;
                this.setHoverChartIndex(), 1 === t.touches.length ? (t = this.normalize(t), s.isInsidePlot(t.chartX - s.plotLeft, t.chartY - s.plotTop) && !s.openMenu ? (e && this.runPointActions(t), "touchmove" === t.type && (i = !!(o = this.pinchDown)[0] && 4 <= Math.sqrt(Math.pow(o[0].chartX - t.chartX, 2) + Math.pow(o[0].chartY - t.chartY, 2))), M(i, !0) && this.pinch(t)) : e && this.reset()) : 2 === t.touches.length && this.pinch(t)
            }, l.prototype.zoomOption = function(t) {
                var e, i, o = this.chart,
                    s = o.options.chart,
                    r = s.zoomType || "",
                    n = o.inverted;
                /touch/.test(t.type) && (r = M(s.pinchType, r)), this.zoomX = e = /x/.test(r), this.zoomY = i = /y/.test(r), this.zoomHor = e && !n || i && n, this.zoomVert = i && !n || e && n, this.hasZoom = e || i
            }, l);

        function l(t, e) {
            this.lastValidTouch = {}, this.pinchDown = [], this.runChartClick = !1, this.chart = t, this.hasDragged = !1, this.options = e, this.unbindContainerMouseLeave = function() {}, this.init(t, e)
        }
        return S.Pointer = a, S.Pointer
    }), e(t, "parts/MSPointer.js", [t["parts/Globals.js"], t["parts/Pointer.js"], t["parts/Utilities.js"]], function(r, t, e) {
        var o, i, s = this && this.__extends || (o = function(t, e) {
                return (o = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, e) {
                        t.__proto__ = e
                    } || function(t, e) {
                        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
                    })(t, e)
            }, function(t, e) {
                function i() {
                    this.constructor = t
                }
                o(t, e), t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
            }),
            n = e.addEvent,
            a = e.css,
            l = e.objectEach,
            h = e.removeEvent,
            c = r.charts,
            d = r.doc,
            p = r.noop,
            u = r.win,
            f = {},
            g = !!u.PointerEvent;

        function m(t, e, i, o) {
            var s;
            "touch" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_TOUCH || !c[r.hoverChartIndex] || (o(t), c[r.hoverChartIndex].pointer[e]({
                type: i,
                target: t.currentTarget,
                preventDefault: p,
                touches: ((s = []).item = function(t) {
                    return this[t]
                }, l(f, function(t) {
                    s.push({
                        pageX: t.pageX,
                        pageY: t.pageY,
                        target: t.target
                    })
                }), s)
            }))
        }

        function x() {
            return null !== i && i.apply(this, arguments) || this
        }
        return s(x, i = t), x.prototype.batchMSEvents = function(t) {
            t(this.chart.container, g ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), t(this.chart.container, g ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), t(d, g ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
        }, x.prototype.destroy = function() {
            this.batchMSEvents(h), i.prototype.destroy.call(this)
        }, x.prototype.init = function(t, e) {
            i.prototype.init.call(this, t, e), this.hasZoom && a(t.container, {
                "-ms-touch-action": "none",
                "touch-action": "none"
            })
        }, x.prototype.onContainerPointerDown = function(t) {
            m(t, "onContainerTouchStart", "touchstart", function(t) {
                f[t.pointerId] = {
                    pageX: t.pageX,
                    pageY: t.pageY,
                    target: t.currentTarget
                }
            })
        }, x.prototype.onContainerPointerMove = function(t) {
            m(t, "onContainerTouchMove", "touchmove", function(t) {
                f[t.pointerId] = {
                    pageX: t.pageX,
                    pageY: t.pageY
                }, f[t.pointerId].target || (f[t.pointerId].target = t.currentTarget)
            })
        }, x.prototype.onDocumentPointerUp = function(t) {
            m(t, "onDocumentTouchEnd", "touchend", function(t) {
                delete f[t.pointerId]
            })
        }, x.prototype.setDOMEvents = function() {
            i.prototype.setDOMEvents.call(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(n)
        }, x
    }), e(t, "parts/Legend.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var i = e.addEvent,
            p = e.animObject,
            a = e.css,
            h = e.defined,
            o = e.discardElement,
            c = e.find,
            u = e.fireEvent,
            s = e.format,
            d = e.isNumber,
            k = e.merge,
            M = e.pick,
            f = e.relativeLength,
            g = e.setAnimation,
            m = e.stableSort,
            x = e.syncTimeout,
            r = e.wrap,
            n = t.isFirefox,
            l = t.marginNames,
            v = t.win,
            y = (b.prototype.init = function(t, e) {
                this.chart = t, this.setOptions(e), e.enabled && (this.render(), i(this.chart, "endResize", function() {
                    this.legend.positionCheckboxes()
                }), this.proximate ? this.unchartrender = i(this.chart, "render", function() {
                    this.legend.proximatePositions(), this.legend.positionItems()
                }) : this.unchartrender && this.unchartrender())
            }, b.prototype.setOptions = function(t) {
                var e = M(t.padding, 8);
                this.options = t, this.chart.styledMode || (this.itemStyle = t.itemStyle, this.itemHiddenStyle = k(this.itemStyle, t.itemHiddenStyle)), this.itemMarginTop = t.itemMarginTop || 0, this.itemMarginBottom = t.itemMarginBottom || 0, this.padding = e, this.initialItemY = e - 5, this.symbolWidth = M(t.symbolWidth, 16), this.pages = [], this.proximate = "proximate" === t.layout && !this.chart.inverted, this.baseline = void 0
            }, b.prototype.update = function(t, e) {
                var i = this.chart;
                this.setOptions(k(!0, this.options, t)), this.destroy(), i.isDirtyLegend = i.isDirtyBox = !0, M(e, !0) && i.redraw(), u(this, "afterUpdate")
            }, b.prototype.colorizeItem = function(t, e) {
                var i, o, s, r, n, a, l, h, c;
                t.legendGroup[e ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"), this.chart.styledMode || (i = this.options, o = t.legendItem, s = t.legendLine, r = t.legendSymbol, n = this.itemHiddenStyle.color, a = e ? i.itemStyle.color : n, l = e && t.color || n, h = t.options && t.options.marker, c = {
                    fill: l
                }, o && o.css({
                    fill: a,
                    color: a
                }), s && s.attr({
                    stroke: l
                }), r && (h && r.isMarker && (c = t.pointAttribs(), e || (c.stroke = c.fill = n)), r.attr(c))), u(this, "afterColorizeItem", {
                    item: t,
                    visible: e
                })
            }, b.prototype.positionItems = function() {
                this.allItems.forEach(this.positionItem, this), this.chart.isResizing || this.positionCheckboxes()
            }, b.prototype.positionItem = function(t) {
                var e = this.options,
                    i = e.symbolPadding,
                    o = !e.rtl,
                    s = t._legendItemPos,
                    r = s[0],
                    n = s[1],
                    a = t.checkbox,
                    l = t.legendGroup;
                l && l.element && l[h(l.translateY) ? "animate" : "attr"]({
                    translateX: o ? r : this.legendWidth - r - 2 * i - 4,
                    translateY: n
                }), a && (a.x = r, a.y = n)
            }, b.prototype.destroyItem = function(e) {
                var t = e.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function(t) {
                    e[t] && (e[t] = e[t].destroy())
                }), t && o(e.checkbox)
            }, b.prototype.destroy = function() {
                function e(t) {
                    this[t] && (this[t] = this[t].destroy())
                }
                this.getAllItems().forEach(function(t) {
                    ["legendItem", "legendGroup"].forEach(e, t)
                }), ["clipRect", "up", "down", "pager", "nav", "box", "title", "group"].forEach(e, this), this.display = null
            }, b.prototype.positionCheckboxes = function() {
                var o, s = this.group && this.group.alignAttr,
                    r = this.clipHeight || this.legendHeight,
                    n = this.titleHeight;
                s && (o = s.translateY, this.allItems.forEach(function(t) {
                    var e, i = t.checkbox;
                    i && (e = o + n + i.y + (this.scrollOffset || 0) + 3, a(i, {
                        left: s.translateX + t.checkboxOffset + i.x - 20 + "px",
                        top: e + "px",
                        display: this.proximate || o - 6 < e && e < o + r - 6 ? "" : "none"
                    }))
                }, this))
            }, b.prototype.renderTitle = function() {
                var t, e = this.options,
                    i = this.padding,
                    o = e.title,
                    s = 0;
                o.text && (this.title || (this.title = this.chart.renderer.label(o.text, i - 3, i - 4, null, null, null, e.useHTML, null, "legend-title").attr({
                    zIndex: 1
                }), this.chart.styledMode || this.title.css(o.style), this.title.add(this.group)), o.width || this.title.css({
                    width: this.maxLegendWidth + "px"
                }), s = (t = this.title.getBBox()).height, this.offsetWidth = t.width, this.contentGroup.attr({
                    translateY: s
                })), this.titleHeight = s
            }, b.prototype.setText = function(t) {
                var e = this.options;
                t.legendItem.attr({
                    text: e.labelFormat ? s(e.labelFormat, t, this.chart) : e.labelFormatter.call(t)
                })
            }, b.prototype.renderItem = function(t) {
                var e, i = this,
                    o = i.chart,
                    s = o.renderer,
                    r = i.options,
                    n = "horizontal" === r.layout,
                    a = i.symbolWidth,
                    l = r.symbolPadding,
                    h = i.itemStyle,
                    c = i.itemHiddenStyle,
                    d = n ? M(r.itemDistance, 20) : 0,
                    p = !r.rtl,
                    u = t.legendItem,
                    f = !t.series,
                    g = !f && t.series.drawLegendSymbol ? t.series : t,
                    m = g.options,
                    x = i.createCheckboxForItem && m && m.showCheckbox,
                    v = a + l + d + (x ? 20 : 0),
                    y = r.useHTML,
                    b = t.options.className;
                u || (t.legendGroup = s.g("legend-item").addClass("highcharts-" + g.type + "-series highcharts-color-" + t.colorIndex + (b ? " " + b : "") + (f ? " highcharts-series-" + t.index : "")).attr({
                    zIndex: 1
                }).add(i.scrollGroup), t.legendItem = u = s.text("", p ? a + l : -l, i.baseline || 0, y), o.styledMode || u.css(k(t.visible ? h : c)), u.attr({
                    align: p ? "left" : "right",
                    zIndex: 2
                }).add(t.legendGroup), i.baseline || (i.fontMetrics = s.fontMetrics(o.styledMode ? 12 : h.fontSize, u), i.baseline = i.fontMetrics.f + 3 + i.itemMarginTop, u.attr("y", i.baseline)), i.symbolHeight = r.symbolHeight || i.fontMetrics.f, g.drawLegendSymbol(i, t), i.setItemEvents && i.setItemEvents(t, u, y)), x && !t.checkbox && i.createCheckboxForItem && i.createCheckboxForItem(t), i.colorizeItem(t, t.visible), !o.styledMode && h.width || u.css({
                    width: (r.itemWidth || i.widthOption || o.spacingBox.width) - v + "px"
                }), i.setText(t), e = u.getBBox(), t.itemWidth = t.checkboxOffset = r.itemWidth || t.legendItemWidth || e.width + v, i.maxItemWidth = Math.max(i.maxItemWidth, t.itemWidth), i.totalItemWidth += t.itemWidth, i.itemHeight = t.itemHeight = Math.round(t.legendItemHeight || e.height || i.symbolHeight)
            }, b.prototype.layoutItem = function(t) {
                var e = this.options,
                    i = this.padding,
                    o = "horizontal" === e.layout,
                    s = t.itemHeight,
                    r = this.itemMarginBottom,
                    n = this.itemMarginTop,
                    a = o ? M(e.itemDistance, 20) : 0,
                    l = this.maxLegendWidth,
                    h = e.alignColumns && this.totalItemWidth > l ? this.maxItemWidth : t.itemWidth;
                o && this.itemX - i + h > l && (this.itemX = i, this.lastLineHeight && (this.itemY += n + this.lastLineHeight + r), this.lastLineHeight = 0), this.lastItemY = n + this.itemY + r, this.lastLineHeight = Math.max(s, this.lastLineHeight), t._legendItemPos = [this.itemX, this.itemY], o ? this.itemX += h : (this.itemY += n + s + r, this.lastLineHeight = s), this.offsetWidth = this.widthOption || Math.max((o ? this.itemX - i - (t.checkbox ? 0 : a) : h) + i, this.offsetWidth)
            }, b.prototype.getAllItems = function() {
                var i = [];
                return this.chart.series.forEach(function(t) {
                    var e = t && t.options;
                    t && M(e.showInLegend, !h(e.linkedTo) && void 0, !0) && (i = i.concat(t.legendItems || ("point" === e.legendType ? t.data : t)))
                }), u(this, "afterGetAllItems", {
                    allItems: i
                }), i
            }, b.prototype.getAlignment = function() {
                var t = this.options;
                return this.proximate ? t.align.charAt(0) + "tv" : t.floating ? "" : t.align.charAt(0) + t.verticalAlign.charAt(0) + t.layout.charAt(0)
            }, b.prototype.adjustMargins = function(i, o) {
                var s = this.chart,
                    r = this.options,
                    n = this.getAlignment();
                n && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function(t, e) {
                    t.test(n) && !h(i[e]) && (s[l[e]] = Math.max(s[l[e]], s.legend[(e + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][e] * r[e % 2 ? "x" : "y"] + M(r.margin, 12) + o[e] + (s.titleOffset[e] || 0)))
                })
            }, b.prototype.proximatePositions = function() {
                var n = this.chart,
                    a = [],
                    l = "left" === this.options.align;
                this.allItems.forEach(function(t) {
                    var e, i, o, s, r = l;
                    t.yAxis && t.points && (t.xAxis.options.reversed && (r = !r), e = c(r ? t.points : t.points.slice(0).reverse(), function(t) {
                        return d(t.plotY)
                    }), i = this.itemMarginTop + t.legendItem.getBBox().height + this.itemMarginBottom, s = t.yAxis.top - n.plotTop, t.visible ? (o = e ? e.plotY : t.yAxis.height, o += s - .3 * i) : o = s + t.yAxis.height, a.push({
                        target: o,
                        size: i,
                        item: t
                    }))
                }, this), t.distribute(a, n.plotHeight), a.forEach(function(t) {
                    t.item._legendItemPos[1] = n.plotTop - n.spacing[0] + t.pos
                })
            }, b.prototype.render = function() {
                var t, e, i, o, s, r = this,
                    n = r.chart,
                    a = n.renderer,
                    l = r.group,
                    h = r.box,
                    c = r.options,
                    d = r.padding;
                r.itemX = d, r.itemY = r.initialItemY, r.offsetWidth = 0, r.lastItemY = 0, r.widthOption = f(c.width, n.spacingBox.width - d), s = n.spacingBox.width - 2 * d - c.x, -1 < ["rm", "lm"].indexOf(r.getAlignment().substring(0, 2)) && (s /= 2), r.maxLegendWidth = r.widthOption || s, l || (r.group = l = a.g("legend").attr({
                    zIndex: 7
                }).add(), r.contentGroup = a.g().attr({
                    zIndex: 1
                }).add(l), r.scrollGroup = a.g().add(r.contentGroup)), r.renderTitle(), t = r.getAllItems(), m(t, function(t, e) {
                    return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
                }), c.reversed && t.reverse(), r.allItems = t, r.display = e = !!t.length, r.lastLineHeight = 0, r.maxItemWidth = 0, r.totalItemWidth = 0, r.itemHeight = 0, t.forEach(r.renderItem, r), t.forEach(r.layoutItem, r), i = (r.widthOption || r.offsetWidth) + d, o = r.lastItemY + r.lastLineHeight + r.titleHeight, o = r.handleOverflow(o), o += d, h || (r.box = h = a.rect().addClass("highcharts-legend-box").attr({
                    r: c.borderRadius
                }).add(l), h.isNew = !0), n.styledMode || h.attr({
                    stroke: c.borderColor,
                    "stroke-width": c.borderWidth || 0,
                    fill: c.backgroundColor || "none"
                }).shadow(c.shadow), 0 < i && 0 < o && (h[h.isNew ? "attr" : "animate"](h.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: i,
                    height: o
                }, h.strokeWidth())), h.isNew = !1), h[e ? "show" : "hide"](), n.styledMode && "none" === l.getStyle("display") && (i = o = 0), r.legendWidth = i, r.legendHeight = o, e && r.align(), this.proximate || this.positionItems(), u(this, "afterRender")
            }, b.prototype.align = function(t) {
                void 0 === t && (t = this.chart.spacingBox);
                var e = this.chart,
                    i = this.options,
                    o = t.y;
                /(lth|ct|rth)/.test(this.getAlignment()) && 0 < e.titleOffset[0] ? o += e.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) && 0 < e.titleOffset[2] && (o -= e.titleOffset[2]), o !== t.y && (t = k(t, {
                    y: o
                })), this.group.align(k(i, {
                    width: this.legendWidth,
                    height: this.legendHeight,
                    verticalAlign: this.proximate ? "top" : i.verticalAlign
                }), !0, t)
            }, b.prototype.handleOverflow = function(t) {
                function e(t) {
                    "number" == typeof t ? f.attr({
                        height: t
                    }) : f && (o.clipRect = f.destroy(), o.contentGroup.clip()), o.contentGroup.div && (o.contentGroup.div.style.clip = t ? "rect(" + d + "px,9999px," + (d + t) + "px,0)" : "auto")
                }

                function i(t) {
                    return o[t] = a.circle(0, 0, 1.3 * x).translate(x / 2, x / 2).add(v), s.styledMode || o[t].attr("fill", "rgba(0,0,0,0.0001)"), o[t]
                }
                var r, n, o = this,
                    s = this.chart,
                    a = s.renderer,
                    l = this.options,
                    h = l.y,
                    c = "top" === l.verticalAlign,
                    d = this.padding,
                    p = s.spacingBox.height + (c ? -h : h) - d,
                    u = l.maxHeight,
                    f = this.clipRect,
                    g = l.navigation,
                    m = M(g.animation, !0),
                    x = g.arrowSize || 12,
                    v = this.nav,
                    y = this.pages,
                    b = this.allItems;
                return "horizontal" !== l.layout || "middle" === l.verticalAlign || l.floating || (p /= 2), u && (p = Math.min(p, u)), y.length = 0, p < t && !1 !== g.enabled ? (this.clipHeight = r = Math.max(p - 20 - this.titleHeight - d, 0), this.currentPage = M(this.currentPage, 1), this.fullHeight = t, b.forEach(function(t, e) {
                    var i = t._legendItemPos[1],
                        o = Math.round(t.legendItem.getBBox().height),
                        s = y.length;
                    (!s || i - y[s - 1] > r && (n || i) !== y[s - 1]) && (y.push(n || i), s++), t.pageIx = s - 1, n && (b[e - 1].pageIx = s - 1), e === b.length - 1 && i + o - y[s - 1] > r && i !== n && (y.push(i), t.pageIx = s), i !== n && (n = i)
                }), f || (f = o.clipRect = a.clipRect(0, d, 9999, 0), o.contentGroup.clip(f)), e(r), v || (this.nav = v = a.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = a.symbol("triangle", 0, 0, x, x).add(v), i("upTracker").on("click", function() {
                    o.scroll(-1, m)
                }), this.pager = a.text("", 15, 10).addClass("highcharts-legend-navigation"), s.styledMode || this.pager.css(g.style), this.pager.add(v), this.down = a.symbol("triangle-down", 0, 0, x, x).add(v), i("downTracker").on("click", function() {
                    o.scroll(1, m)
                })), o.scroll(0), t = p) : v && (e(), this.nav = v.destroy(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0), t
            }, b.prototype.scroll = function(t, e) {
                var i, o = this,
                    s = this.chart,
                    r = this.pages,
                    n = r.length,
                    a = this.currentPage + t,
                    l = this.clipHeight,
                    h = this.options.navigation,
                    c = this.pager,
                    d = this.padding;
                n < a && (a = n), 0 < a && (void 0 !== e && g(e, s), this.nav.attr({
                    translateX: d,
                    translateY: l + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), [this.up, this.upTracker].forEach(function(t) {
                    t.attr({
                        class: 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }), c.attr({
                    text: a + "/" + n
                }), [this.down, this.downTracker].forEach(function(t) {
                    t.attr({
                        x: 18 + this.pager.getBBox().width,
                        class: a === n ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    })
                }, this), s.styledMode || (this.up.attr({
                    fill: 1 === a ? h.inactiveColor : h.activeColor
                }), this.upTracker.css({
                    cursor: 1 === a ? "default" : "pointer"
                }), this.down.attr({
                    fill: a === n ? h.inactiveColor : h.activeColor
                }), this.downTracker.css({
                    cursor: a === n ? "default" : "pointer"
                })), this.scrollOffset = -r[a - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: this.scrollOffset
                }), this.currentPage = a, this.positionCheckboxes(), i = p(M(e, s.renderer.globalAnimation, !0)), x(function() {
                    u(o, "afterScroll", {
                        currentPage: a
                    })
                }, i.duration || 0))
            }, b);

        function b(t, e) {
            this.allItems = [], this.box = void 0, this.contentGroup = void 0, this.display = !1, this.group = void 0, this.initialItemY = 0, this.itemHeight = 0, this.itemMarginBottom = 0, this.itemMarginTop = 0, this.itemX = 0, this.itemY = 0, this.lastItemY = 0, this.lastLineHeight = 0, this.legendHeight = 0, this.legendWidth = 0, this.maxItemWidth = 0, this.maxLegendWidth = 0, this.offsetWidth = 0, this.options = {}, this.padding = 0, this.pages = [], this.proximate = !1, this.scrollGroup = void 0, this.symbolHeight = 0, this.symbolWidth = 0, this.titleHeight = 0, this.totalItemWidth = 0, this.widthOption = 0, this.chart = t, this.init(t, e)
        }
        return (/Trident\/7\.0/.test(v.navigator && v.navigator.userAgent) || n) && r(y.prototype, "positionItem", function(t, e) {
            function i() {
                e._legendItemPos && t.call(o, e)
            }
            var o = this;
            i(), o.bubbleLegend || setTimeout(i)
        }), t.Legend = y, t.Legend
    }), e(t, "parts/Chart.js", [t["parts/Globals.js"], t["parts/Legend.js"], t["parts/MSPointer.js"], t["parts/Pointer.js"], t["parts/Time.js"], t["parts/Utilities.js"]], function(u, d, i, o, l, h) {
        var c = h.addEvent,
            n = h.animate,
            a = h.animObject,
            f = h.attr,
            g = h.createElement,
            m = h.css,
            p = h.defined,
            x = h.discardElement,
            v = h.erase,
            y = h.error,
            b = h.extend,
            r = h.find,
            S = h.fireEvent,
            k = h.getStyle,
            s = h.isArray,
            M = h.isFunction,
            w = h.isNumber,
            A = h.isObject,
            T = h.isString,
            P = h.merge,
            C = h.numberFormat,
            L = h.objectEach,
            E = h.pick,
            O = h.pInt,
            D = h.relativeLength,
            B = h.removeEvent,
            I = h.setAnimation,
            z = h.splat,
            R = h.syncTimeout,
            W = h.uniqueKey,
            G = u.doc,
            N = u.Axis,
            X = u.defaultOptions,
            j = u.charts,
            H = u.marginNames,
            Y = u.seriesTypes,
            F = u.win,
            U = u.Chart = function() {
                this.getArgs.apply(this, arguments)
            };
        u.chart = function(t, e, i) {
            return new U(t, e, i)
        }, b(U.prototype, {
            callbacks: [],
            getArgs: function() {
                var t = [].slice.call(arguments);
                (T(t[0]) || t[0].nodeName) && (this.renderTo = t.shift()), this.init(t[0], t[1])
            },
            init: function(o, s) {
                var r, n = o.series,
                    a = o.plotOptions || {};
                S(this, "init", {
                    args: arguments
                }, function() {
                    o.series = null;
                    var t = (r = P(X, o)).chart || {};
                    L(r.plotOptions, function(t, e) {
                        A(t) && (t.tooltip = a[e] && P(a[e].tooltip) || void 0)
                    }), r.tooltip.userOptions = o.chart && o.chart.forExport && o.tooltip.userOptions || o.tooltip, r.series = o.series = n, this.userOptions = o;
                    var e = t.events;
                    this.margin = [], this.spacing = [], this.bounds = {
                        h: {},
                        v: {}
                    }, this.labelCollectors = [], this.callback = s, this.isResizing = 0, this.options = r, this.axes = [], this.series = [], this.time = o.time && Object.keys(o.time).length ? new l(o.time) : u.time, this.numberFormatter = t.numberFormatter || C, this.styledMode = t.styledMode, this.hasCartesianSeries = t.showAxes;
                    var i = this;
                    i.index = j.length, j.push(i), u.chartCount++, e && L(e, function(t, e) {
                        M(t) && c(i, e, t)
                    }), i.xAxis = [], i.yAxis = [], i.pointCount = i.colorCounter = i.symbolCounter = 0, S(i, "afterInit"), i.firstRender()
                })
            },
            initSeries: function(t) {
                var e, i = this.options.chart,
                    o = t.type || i.type || i.defaultSeriesType,
                    s = Y[o];
                return s || y(17, !0, this, {
                    missingModuleFor: o
                }), (e = new s).init(this, t), e
            },
            setSeriesData: function() {
                this.getSeriesOrderByLinks().forEach(function(t) {
                    t.points || t.data || !t.enabledDataSorting || t.setData(t.options.data, !1)
                })
            },
            getSeriesOrderByLinks: function() {
                return this.series.concat().sort(function(t, e) {
                    return t.linkedSeries.length || e.linkedSeries.length ? e.linkedSeries.length - t.linkedSeries.length : 0
                })
            },
            orderSeries: function(t) {
                for (var e = this.series, i = t || 0; i < e.length; i++) e[i] && (e[i].index = i, e[i].name = e[i].getName())
            },
            isInsidePlot: function(t, e, i) {
                var o = i ? e : t,
                    s = i ? t : e,
                    r = {
                        x: o,
                        y: s,
                        isInsidePlot: 0 <= o && o <= this.plotWidth && 0 <= s && s <= this.plotHeight
                    };
                return S(this, "afterIsInsidePlot", r), r.isInsidePlot
            },
            redraw: function(t) {
                S(this, "beforeRedraw");
                var i, e, o, s, r = this,
                    n = r.axes,
                    a = r.series,
                    l = r.pointer,
                    h = r.legend,
                    c = r.userOptions.legend,
                    d = r.isDirtyLegend,
                    p = r.hasCartesianSeries,
                    u = r.isDirtyBox,
                    f = r.renderer,
                    g = f.isHidden(),
                    m = [];
                for (r.setResponsive && r.setResponsive(!1), I(!!r.hasRendered && t, r), g && r.temporaryDisplay(), r.layOutTitles(), o = a.length; o--;)
                    if ((s = a[o]).options.stacking && (i = !0, s.isDirty)) {
                        e = !0;
                        break
                    }
                if (e)
                    for (o = a.length; o--;)(s = a[o]).options.stacking && (s.isDirty = !0);
                a.forEach(function(t) {
                    t.isDirty && ("point" === t.options.legendType ? (t.updateTotals && t.updateTotals(), d = !0) : c && (c.labelFormatter || c.labelFormat) && (d = !0)), t.isDirtyData && S(t, "updatedData")
                }), d && h && h.options.enabled && (h.render(), r.isDirtyLegend = !1), i && r.getStacks(), p && n.forEach(function(t) {
                    t.updateNames(), t.setScale()
                }), r.getMargins(), p && (n.forEach(function(t) {
                    t.isDirty && (u = !0)
                }), n.forEach(function(t) {
                    var e = t.min + "," + t.max;
                    t.extKey !== e && (t.extKey = e, m.push(function() {
                        S(t, "afterSetExtremes", b(t.eventArgs, t.getExtremes())), delete t.eventArgs
                    })), (u || i) && t.redraw()
                })), u && r.drawChartBox(), S(r, "predraw"), a.forEach(function(t) {
                    (u || t.isDirty) && t.visible && t.redraw(), t.isDirtyData = !1
                }), l && l.reset(!0), f.draw(), S(r, "redraw"), S(r, "render"), g && r.temporaryDisplay(!0), m.forEach(function(t) {
                    t.call()
                })
            },
            get: function(e) {
                var t, i, o = this.series;

                function s(t) {
                    return t.id === e || t.options && t.options.id === e
                }
                for (t = r(this.axes, s) || r(this.series, s), i = 0; !t && i < o.length; i++) t = r(o[i].points || [], s);
                return t
            },
            getAxes: function() {
                var e = this,
                    t = this.options,
                    i = t.xAxis = z(t.xAxis || {}),
                    o = t.yAxis = z(t.yAxis || {});
                S(this, "getAxes"), i.forEach(function(t, e) {
                    t.index = e, t.isX = !0
                }), o.forEach(function(t, e) {
                    t.index = e
                }), i.concat(o).forEach(function(t) {
                    new N(e, t)
                }), S(this, "afterGetAxes")
            },
            getSelectedPoints: function() {
                var e = [];
                return this.series.forEach(function(t) {
                    e = e.concat(t.getPointsCollection().filter(function(t) {
                        return E(t.selectedStaging, t.selected)
                    }))
                }), e
            },
            getSelectedSeries: function() {
                return this.series.filter(function(t) {
                    return t.selected
                })
            },
            setTitle: function(t, e, i) {
                this.applyDescription("title", t), this.applyDescription("subtitle", e), this.applyDescription("caption", void 0), this.layOutTitles(i)
            },
            applyDescription: function(e, t) {
                var i = this,
                    o = "title" === e ? {
                        color: "#333333",
                        fontSize: this.options.isStock ? "16px" : "18px"
                    } : {
                        color: "#666666"
                    },
                    s = this.options[e] = P(!this.styledMode && {
                        style: o
                    }, this.options[e], t),
                    r = this[e];
                r && t && (this[e] = r = r.destroy()), s && !r && ((r = this.renderer.text(s.text, 0, 0, s.useHTML).attr({
                    align: s.align,
                    class: "highcharts-" + e,
                    zIndex: s.zIndex || 4
                }).add()).update = function(t) {
                    i[{
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    }[e]](t)
                }, this.styledMode || r.css(s.style), this[e] = r)
            },
            layOutTitles: function(t) {
                var e, a = [0, 0, 0],
                    l = this.renderer,
                    h = this.spacingBox;
                ["title", "subtitle", "caption"].forEach(function(t) {
                    var e, i, o = this[t],
                        s = this.options[t],
                        r = s.verticalAlign || "top",
                        n = "title" === t ? -3 : "top" === r ? a[0] + 2 : 0;
                    o && (this.styledMode || (e = s.style.fontSize), e = l.fontMetrics(e, o).b, o.css({
                        width: (s.width || h.width + (s.widthAdjust || 0)) + "px"
                    }), i = Math.round(o.getBBox(s.useHTML).height), o.align(b({
                        y: "bottom" === r ? e : n + e,
                        height: i
                    }, s), !1, "spacingBox"), s.floating || ("top" === r ? a[0] = Math.ceil(a[0] + i) : "bottom" === r && (a[2] = Math.ceil(a[2] + i))))
                }, this), a[0] && "top" === (this.options.title.verticalAlign || "top") && (a[0] += this.options.title.margin), a[2] && "bottom" === this.options.caption.verticalAlign && (a[2] += this.options.caption.margin), e = !this.titleOffset || this.titleOffset.join(",") !== a.join(","), this.titleOffset = a, S(this, "afterLayOutTitles"), !this.isDirtyBox && e && (this.isDirtyBox = this.isDirtyLegend = e, this.hasRendered && E(t, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var t = this,
                    e = t.options.chart,
                    i = e.width,
                    o = e.height,
                    s = t.renderTo;
                p(i) || (t.containerWidth = k(s, "width")), p(o) || (t.containerHeight = k(s, "height")), t.chartWidth = Math.max(0, i || t.containerWidth || 600), t.chartHeight = Math.max(0, D(o, t.chartWidth) || (1 < t.containerHeight ? t.containerHeight : 400))
            },
            temporaryDisplay: function(t) {
                var e, i = this.renderTo;
                if (t)
                    for (; i && i.style;) i.hcOrigStyle && (m(i, i.hcOrigStyle), delete i.hcOrigStyle), i.hcOrigDetached && (G.body.removeChild(i), i.hcOrigDetached = !1), i = i.parentNode;
                else
                    for (; i && i.style && (G.body.contains(i) || i.parentNode || (i.hcOrigDetached = !0, G.body.appendChild(i)), "none" !== k(i, "display", !1) && !i.hcOricDetached || (i.hcOrigStyle = {
                            display: i.style.display,
                            height: i.style.height,
                            overflow: i.style.overflow
                        }, e = {
                            display: "block",
                            overflow: "hidden"
                        }, i !== this.renderTo && (e.height = 0), m(i, e), i.offsetWidth || i.style.setProperty("display", "block", "important")), (i = i.parentNode) !== G.body););
            },
            setClassName: function(t) {
                this.container.className = "highcharts-container " + (t || "")
            },
            getContainer: function() {
                var t, e, i, o, s, r, n, a = this,
                    l = a.options,
                    h = l.chart,
                    c = a.renderTo,
                    d = "data-highcharts-chart",
                    p = W();
                if (c || (a.renderTo = c = h.renderTo), T(c) && (a.renderTo = c = G.getElementById(c)), c || y(13, !0, a), o = O(f(c, d)), w(o) && j[o] && j[o].hasRendered && j[o].destroy(), f(c, d, a.index), c.innerHTML = "", h.skipClone || c.offsetWidth || a.temporaryDisplay(), a.getChartSize(), e = a.chartWidth, i = a.chartHeight, m(c, {
                        overflow: "hidden"
                    }), a.styledMode || (r = b({
                        position: "relative",
                        overflow: "hidden",
                        width: e + "px",
                        height: i + "px",
                        textAlign: "left",
                        lineHeight: "normal",
                        zIndex: 0,
                        "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                    }, h.style)), t = g("div", {
                        id: p
                    }, r, c), a.container = t, a._cursor = t.style.cursor, s = u[h.renderer] || u.Renderer, a.renderer = new s(t, e, i, null, h.forExport, l.exporting && l.exporting.allowHTML, a.styledMode), I(void 0, a), a.setClassName(h.className), a.styledMode)
                    for (n in l.defs) this.renderer.definition(l.defs[n]);
                else a.renderer.setStyle(h.style);
                a.renderer.chartIndex = a.index, S(this, "afterGetContainer")
            },
            getMargins: function(t) {
                var e = this.spacing,
                    i = this.margin,
                    o = this.titleOffset;
                this.resetMargins(), o[0] && !p(i[0]) && (this.plotTop = Math.max(this.plotTop, o[0] + e[0])), o[2] && !p(i[2]) && (this.marginBottom = Math.max(this.marginBottom, o[2] + e[2])), this.legend && this.legend.display && this.legend.adjustMargins(i, e), S(this, "getMargins"), t || this.getAxisMargins()
            },
            getAxisMargins: function() {
                function t(t) {
                    t.forEach(function(t) {
                        t.visible && t.getOffset()
                    })
                }
                var i = this,
                    o = i.axisOffset = [0, 0, 0, 0],
                    e = i.colorAxis,
                    s = i.margin;
                i.hasCartesianSeries ? t(i.axes) : e && e.length && t(e), H.forEach(function(t, e) {
                    p(s[e]) || (i[t] += o[e])
                }), i.setChartSize()
            },
            reflow: function(t) {
                var e = this,
                    i = e.options.chart,
                    o = e.renderTo,
                    s = p(i.width) && p(i.height),
                    r = i.width || k(o, "width"),
                    n = i.height || k(o, "height"),
                    a = t ? t.target : F;
                s || e.isPrinting || !r || !n || a !== F && a !== G || (r === e.containerWidth && n === e.containerHeight || (h.clearTimeout(e.reflowTimeout), e.reflowTimeout = R(function() {
                    e.container && e.setSize(void 0, void 0, !1)
                }, t ? 100 : 0)), e.containerWidth = r, e.containerHeight = n)
            },
            setReflow: function(t) {
                var e = this;
                !1 === t || this.unbindReflow ? !1 === t && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = c(F, "resize", function(t) {
                    e.options && e.reflow(t)
                }), c(this, "destroy", this.unbindReflow))
            },
            setSize: function(t, e, i) {
                var o, s = this,
                    r = s.renderer;
                s.isResizing += 1, I(i, s), o = r.globalAnimation, s.oldChartHeight = s.chartHeight, s.oldChartWidth = s.chartWidth, void 0 !== t && (s.options.chart.width = t), void 0 !== e && (s.options.chart.height = e), s.getChartSize(), s.styledMode || (o ? n : m)(s.container, {
                    width: s.chartWidth + "px",
                    height: s.chartHeight + "px"
                }, o), s.setChartSize(!0), r.setSize(s.chartWidth, s.chartHeight, o), s.axes.forEach(function(t) {
                    t.isDirty = !0, t.setScale()
                }), s.isDirtyLegend = !0, s.isDirtyBox = !0, s.layOutTitles(), s.getMargins(), s.redraw(o), s.oldChartHeight = null, S(s, "resize"), R(function() {
                    s && S(s, "endResize", null, function() {
                        --s.isResizing
                    })
                }, a(o).duration || 0)
            },
            setChartSize: function(t) {
                var e, i, o, s, r, n, a, l = this,
                    h = l.inverted,
                    c = l.renderer,
                    d = l.chartWidth,
                    p = l.chartHeight,
                    u = l.options.chart,
                    f = l.spacing,
                    g = l.clipOffset;
                l.plotLeft = o = Math.round(l.plotLeft), l.plotTop = s = Math.round(l.plotTop), l.plotWidth = r = Math.max(0, Math.round(d - o - l.marginRight)), l.plotHeight = n = Math.max(0, Math.round(p - s - l.marginBottom)), l.plotSizeX = h ? n : r, l.plotSizeY = h ? r : n, l.plotBorderWidth = u.plotBorderWidth || 0, l.spacingBox = c.spacingBox = {
                    x: f[3],
                    y: f[0],
                    width: d - f[3] - f[1],
                    height: p - f[0] - f[2]
                }, l.plotBox = c.plotBox = {
                    x: o,
                    y: s,
                    width: r,
                    height: n
                }, a = 2 * Math.floor(l.plotBorderWidth / 2), e = Math.ceil(Math.max(a, g[3]) / 2), i = Math.ceil(Math.max(a, g[0]) / 2), l.clipBox = {
                    x: e,
                    y: i,
                    width: Math.floor(l.plotSizeX - Math.max(a, g[1]) / 2 - e),
                    height: Math.max(0, Math.floor(l.plotSizeY - Math.max(a, g[2]) / 2 - i))
                }, t || l.axes.forEach(function(t) {
                    t.setAxisSize(), t.setAxisTranslation()
                }), S(l, "afterSetChartSize", {
                    skipAxes: t
                })
            },
            resetMargins: function() {
                S(this, "resetMargins");
                var s = this,
                    r = s.options.chart;
                ["margin", "spacing"].forEach(function(i) {
                    var t = r[i],
                        o = A(t) ? t : [t, t, t, t];
                    ["Top", "Right", "Bottom", "Left"].forEach(function(t, e) {
                        s[i][e] = E(r[i + t], o[e])
                    })
                }), H.forEach(function(t, e) {
                    s[t] = E(s.margin[e], s.spacing[e])
                }), s.axisOffset = [0, 0, 0, 0], s.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var t, e, i, o = this,
                    s = o.options.chart,
                    r = o.renderer,
                    n = o.chartWidth,
                    a = o.chartHeight,
                    l = o.chartBackground,
                    h = o.plotBackground,
                    c = o.plotBorder,
                    d = o.styledMode,
                    p = o.plotBGImage,
                    u = s.backgroundColor,
                    f = s.plotBackgroundColor,
                    g = s.plotBackgroundImage,
                    m = o.plotLeft,
                    x = o.plotTop,
                    v = o.plotWidth,
                    y = o.plotHeight,
                    b = o.plotBox,
                    k = o.clipRect,
                    M = o.clipBox,
                    w = "animate";
                l || (o.chartBackground = l = r.rect().addClass("highcharts-background").add(), w = "attr"), d ? t = e = l.strokeWidth() : (e = (t = s.borderWidth || 0) + (s.shadow ? 8 : 0), i = {
                    fill: u || "none"
                }, (t || l["stroke-width"]) && (i.stroke = s.borderColor, i["stroke-width"] = t), l.attr(i).shadow(s.shadow)), l[w]({
                    x: e / 2,
                    y: e / 2,
                    width: n - e - t % 2,
                    height: a - e - t % 2,
                    r: s.borderRadius
                }), w = "animate", h || (w = "attr", o.plotBackground = h = r.rect().addClass("highcharts-plot-background").add()), h[w](b), d || (h.attr({
                    fill: f || "none"
                }).shadow(s.plotShadow), g && (p ? (g !== p.attr("href") && p.attr("href", g), p.animate(b)) : o.plotBGImage = r.image(g, m, x, v, y).add())), k ? k.animate({
                    width: M.width,
                    height: M.height
                }) : o.clipRect = r.clipRect(M), w = "animate", c || (w = "attr", o.plotBorder = c = r.rect().addClass("highcharts-plot-border").attr({
                    zIndex: 1
                }).add()), d || c.attr({
                    stroke: s.plotBorderColor,
                    "stroke-width": s.plotBorderWidth || 0,
                    fill: "none"
                }), c[w](c.crisp({
                    x: m,
                    y: x,
                    width: v,
                    height: y
                }, -c.strokeWidth())), o.isDirtyBox = !1, S(this, "afterDrawChartBox")
            },
            propFromSeries: function() {
                var e, i, o, s = this,
                    r = s.options.chart,
                    n = s.options.series;
                ["inverted", "angular", "polar"].forEach(function(t) {
                    for (e = Y[r.type || r.defaultSeriesType], o = r[t] || e && e.prototype[t], i = n && n.length; !o && i--;)(e = Y[n[i].type]) && e.prototype[t] && (o = !0);
                    s[t] = o
                })
            },
            linkSeries: function() {
                var i = this,
                    t = i.series;
                t.forEach(function(t) {
                    t.linkedSeries.length = 0
                }), t.forEach(function(t) {
                    var e = t.options.linkedTo;
                    T(e) && (e = ":previous" === e ? i.series[t.index - 1] : i.get(e)) && e.linkedParent !== t && (e.linkedSeries.push(t), (t.linkedParent = e).enabledDataSorting && t.setDataSortingOptions(), t.visible = E(t.options.visible, e.options.visible, t.visible))
                }), S(this, "afterLinkSeries")
            },
            renderSeries: function() {
                this.series.forEach(function(t) {
                    t.translate(), t.render()
                })
            },
            renderLabels: function() {
                var s = this,
                    r = s.options.labels;
                r.items && r.items.forEach(function(t) {
                    var e = b(r.style, t.style),
                        i = O(e.left) + s.plotLeft,
                        o = O(e.top) + s.plotTop + 12;
                    delete e.left, delete e.top, s.renderer.text(t.html, i, o).attr({
                        zIndex: 2
                    }).css(e).add()
                })
            },
            render: function() {
                function t(t) {
                    t.forEach(function(t) {
                        t.visible && t.render()
                    })
                }
                var e, i, o, s, r = this,
                    n = r.axes,
                    a = r.colorAxis,
                    l = r.renderer,
                    h = r.options,
                    c = 0;
                r.setTitle(), r.legend = new d(r, h.legend), r.getStacks && r.getStacks(), r.getMargins(!0), r.setChartSize(), e = r.plotWidth, n.some(function(t) {
                    if (t.horiz && t.visible && t.options.labels.enabled && t.series.length) return c = 21, !0
                }), r.plotHeight = Math.max(r.plotHeight - c, 0), i = r.plotHeight, n.forEach(function(t) {
                    t.setScale()
                }), r.getAxisMargins(), o = 1.1 < e / r.plotWidth, s = 1.05 < i / r.plotHeight, (o || s) && (n.forEach(function(t) {
                    (t.horiz && o || !t.horiz && s) && t.setTickInterval(!0)
                }), r.getMargins()), r.drawChartBox(), r.hasCartesianSeries ? t(n) : a && a.length && t(a), r.seriesGroup || (r.seriesGroup = l.g("series-group").attr({
                    zIndex: 3
                }).add()), r.renderSeries(), r.renderLabels(), r.addCredits(), r.setResponsive && r.setResponsive(), r.updateContainerScaling(), r.hasRendered = !0
            },
            addCredits: function(t) {
                var e = this;
                (t = P(!0, this.options.credits, t)).enabled && !this.credits && (this.credits = this.renderer.text(t.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function() {
                    t.href && (F.location.href = t.href)
                }).attr({
                    align: t.position.align,
                    zIndex: 8
                }), e.styledMode || this.credits.css(t.style), this.credits.add().align(t.position), this.credits.update = function(t) {
                    e.credits = e.credits.destroy(), e.addCredits(t)
                })
            },
            updateContainerScaling: function() {
                var t, e, i, o = this.container;
                o.offsetWidth && o.offsetHeight && o.getBoundingClientRect && (e = (t = o.getBoundingClientRect()).width / o.offsetWidth, i = t.height / o.offsetHeight, 1 != e || 1 != i ? this.containerScaling = {
                    scaleX: e,
                    scaleY: i
                } : delete this.containerScaling)
            },
            destroy: function() {
                var t, i = this,
                    e = i.axes,
                    o = i.series,
                    s = i.container,
                    r = s && s.parentNode;
                for (S(i, "destroy"), i.renderer.forExport ? v(j, i) : j[i.index] = void 0, u.chartCount--, i.renderTo.removeAttribute("data-highcharts-chart"), B(i), t = e.length; t--;) e[t] = e[t].destroy();
                for (this.scroller && this.scroller.destroy && this.scroller.destroy(), t = o.length; t--;) o[t] = o[t].destroy();
                ["title", "subtitle", "chartBackground", "plotBackground", "plotBGImage", "plotBorder", "seriesGroup", "clipRect", "credits", "pointer", "rangeSelector", "legend", "resetZoomButton", "tooltip", "renderer"].forEach(function(t) {
                    var e = i[t];
                    e && e.destroy && (i[t] = e.destroy())
                }), s && (s.innerHTML = "", B(s), r && x(s)), L(i, function(t, e) {
                    delete i[e]
                })
            },
            firstRender: function() {
                var e = this,
                    t = e.options;
                e.isReadyToRender && !e.isReadyToRender() || (e.getContainer(), e.resetMargins(), e.setChartSize(), e.propFromSeries(), e.getAxes(), (s(t.series) ? t.series : []).forEach(function(t) {
                    e.initSeries(t)
                }), e.linkSeries(), e.setSeriesData(), S(e, "beforeRender"), o && (u.hasTouch || !F.PointerEvent && !F.MSPointerEvent ? e.pointer = new o(e, t) : e.pointer = new i(e, t)), e.render(), e.renderer.imgCount || e.hasLoaded || e.onload(), e.temporaryDisplay(!0))
            },
            onload: function() {
                this.callbacks.concat([this.callback]).forEach(function(t) {
                    t && void 0 !== this.index && t.apply(this, [this])
                }, this), S(this, "load"), S(this, "render"), p(this.index) && this.setReflow(this.options.chart.reflow), this.hasLoaded = !0
            }
        })
    }), e(t, "parts/ScrollablePlotArea.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(f, t) {
        var g = t.addEvent,
            m = t.createElement,
            x = t.pick,
            v = t.stop,
            e = f.Chart;
        g(e, "afterSetChartSize", function(t) {
            var e, i, r, o = this.options.chart.scrollablePlotArea,
                s = o && o.minWidth,
                n = o && o.minHeight;
            this.renderer.forExport || (s ? (this.scrollablePixelsX = e = Math.max(0, s - this.chartWidth), e && (this.plotWidth += e, this.inverted ? (this.clipBox.height += e, this.plotBox.height += e) : (this.clipBox.width += e, this.plotBox.width += e), r = {
                1: {
                    name: "right",
                    value: e
                }
            })) : n && (this.scrollablePixelsY = i = Math.max(0, n - this.chartHeight), i && (this.plotHeight += i, this.inverted ? (this.clipBox.width += i, this.plotBox.width += i) : (this.clipBox.height += i, this.plotBox.height += i), r = {
                2: {
                    name: "bottom",
                    value: i
                }
            })), r && !t.skipAxes && this.axes.forEach(function(s) {
                r[s.side] ? s.getPlotLinePath = function() {
                    var t, e = r[s.side].name,
                        i = r[s.side].value,
                        o = this[e];
                    return this[e] = o - i, t = f.Axis.prototype.getPlotLinePath.apply(this, arguments), this[e] = o, t
                } : (s.setAxisSize(), s.setAxisTranslation())
            }))
        }), g(e, "render", function() {
            this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        }), e.prototype.setUpScrolling = function() {
            var t = this,
                e = {
                    WebkitOverflowScrolling: "touch",
                    overflowX: "hidden",
                    overflowY: "hidden"
                };
            this.scrollablePixelsX && (e.overflowX = "auto"), this.scrollablePixelsY && (e.overflowY = "auto"), this.scrollingContainer = m("div", {
                className: "highcharts-scrolling"
            }, e, this.renderTo), g(this.scrollingContainer, "scroll", function() {
                t.pointer && delete t.pointer.chartPosition
            }), this.innerContainer = m("div", {
                className: "highcharts-inner-container"
            }, null, this.scrollingContainer), this.innerContainer.appendChild(this.container), this.setUpScrolling = null
        }, e.prototype.moveFixedElements = function() {
            var t, e = this.container,
                i = this.fixedRenderer,
                o = [".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-legend-checkbox", ".highcharts-navigator-series", ".highcharts-navigator-xaxis", ".highcharts-navigator-yaxis", ".highcharts-navigator", ".highcharts-reset-zoom", ".highcharts-scrollbar", ".highcharts-subtitle", ".highcharts-title"];
            this.scrollablePixelsX && !this.inverted ? t = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted || this.scrollablePixelsY && !this.inverted ? t = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (t = ".highcharts-yaxis"), o.push(t, t + "-labels"), o.forEach(function(t) {
                [].forEach.call(e.querySelectorAll(t), function(t) {
                    (t.namespaceURI === i.SVG_NS ? i.box : i.box.parentNode).appendChild(t), t.style.pointerEvents = "auto"
                })
            })
        }, e.prototype.applyFixed = function() {
            var t, e, i, o, s = !this.fixedDiv,
                r = this.options.chart.scrollablePlotArea;
            s ? (this.fixedDiv = m("div", {
                className: "highcharts-fixed"
            }, {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 2
            }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = e = new f.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight, null === (t = this.options.chart) || void 0 === t ? void 0 : t.style), this.scrollableMask = e.path().attr({
                fill: this.options.chart.backgroundColor || "#fff",
                "fill-opacity": x(r.opacity, .85),
                zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(), g(this, "afterShowResetZoom", this.moveFixedElements), g(this, "afterLayOutTitles", this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight), i = this.chartWidth + (this.scrollablePixelsX || 0), o = this.chartHeight + (this.scrollablePixelsY || 0), v(this.container), this.container.style.width = i + "px", this.container.style.height = o + "px", this.renderer.boxWrapper.attr({
                width: i,
                height: o,
                viewBox: [0, 0, i, o].join(" ")
            }), this.chartBackground.attr({
                width: i,
                height: o
            }), this.scrollingContainer.style.height = this.chartHeight + "px", s && (r.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * r.scrollPositionX), r.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * r.scrollPositionY));
            var n = this.axisOffset,
                a = this.plotTop - n[0] - 1,
                l = this.plotLeft - n[3] - 1,
                h = this.plotTop + this.plotHeight + n[2] + 1,
                c = this.plotLeft + this.plotWidth + n[1] + 1,
                d = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
                p = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0),
                u = this.scrollablePixelsX ? [
                    ["M", 0, a],
                    ["L", this.plotLeft - 1, a],
                    ["L", this.plotLeft - 1, h],
                    ["L", 0, h],
                    ["Z"],
                    ["M", d, a],
                    ["L", this.chartWidth, a],
                    ["L", this.chartWidth, h],
                    ["L", d, h],
                    ["Z"]
                ] : this.scrollablePixelsY ? [
                    ["M", l, 0],
                    ["L", l, this.plotTop - 1],
                    ["L", c, this.plotTop - 1],
                    ["L", c, 0],
                    ["Z"],
                    ["M", l, p],
                    ["L", l, this.chartHeight],
                    ["L", c, this.chartHeight],
                    ["L", c, p],
                    ["Z"]
                ] : [
                    ["M", 0, 0]
                ];
            "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({
                d: u
            })
        }
    }), e(t, "parts/StackingAxis.js", [t["parts/Utilities.js"]], function(t) {
        var e = t.addEvent,
            o = t.destroyObjectProperties,
            r = t.fireEvent,
            s = t.objectEach,
            n = t.pick,
            i = (a.prototype.buildStacks = function() {
                var t, e = this.axis,
                    i = e.series,
                    o = n(e.options.reversedStacks, !0),
                    s = i.length;
                if (!e.isXAxis) {
                    for (this.usePercentage = !1, t = s; t--;) i[o ? t : s - t - 1].setStackedPoints();
                    for (t = 0; t < s; t++) i[t].modifyStacks();
                    r(e, "afterBuildStacks")
                }
            }, a.prototype.cleanStacks = function() {
                var t;
                this.axis.isXAxis || (this.oldStacks && (t = this.stacks = this.oldStacks), s(t, function(t) {
                    s(t, function(t) {
                        t.cumulative = t.total
                    })
                }))
            }, a.prototype.resetStacks = function() {
                var o = this,
                    t = o.axis,
                    e = o.stacks;
                t.isXAxis || s(e, function(i) {
                    s(i, function(t, e) {
                        t.touched < o.stacksTouched ? (t.destroy(), delete i[e]) : (t.total = null, t.cumulative = null)
                    })
                })
            }, a.prototype.renderStackTotals = function() {
                var t = this.axis.chart,
                    e = t.renderer,
                    i = this.stacks,
                    o = this.stackTotalGroup = this.stackTotalGroup || e.g("stack-labels").attr({
                        visibility: "visible",
                        zIndex: 6
                    }).add();
                o.translate(t.plotLeft, t.plotTop), s(i, function(t) {
                    s(t, function(t) {
                        t.render(o)
                    })
                })
            }, a);

        function a(t) {
            this.oldStacks = {}, this.stacks = {}, this.stacksTouched = 0, this.axis = t
        }

        function l() {}
        return l.compose = function(t) {
            t.prototype, e(t, "init", l.onInit), e(t, "destroy", l.onDestroy)
        }, l.onDestroy = function() {
            var i, t = this.stacking;
            t && (i = t.stacks, s(i, function(t, e) {
                o(t), i[e] = null
            }), t && t.stackTotalGroup && t.stackTotalGroup.destroy())
        }, l.onInit = function() {
            this.stacking || (this.stacking = new i(this))
        }, l
    }), e(t, "mixins/legend-symbol.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var p = e.merge,
            u = e.pick;
        return t.LegendSymbolMixin = {
            drawRectangle: function(t, e) {
                var i = t.options,
                    o = t.symbolHeight,
                    s = i.squareSymbol,
                    r = s ? o : t.symbolWidth;
                e.legendSymbol = this.chart.renderer.rect(s ? (t.symbolWidth - o) / 2 : 0, t.baseline - o + 1, r, o, u(t.options.symbolRadius, o / 2)).addClass("highcharts-point").attr({
                    zIndex: 3
                }).add(e.legendGroup)
            },
            drawLineMarker: function(t) {
                var e, i, o = this.options,
                    s = o.marker,
                    r = t.symbolWidth,
                    n = t.symbolHeight,
                    a = n / 2,
                    l = this.chart.renderer,
                    h = this.legendGroup,
                    c = t.baseline - Math.round(.3 * t.fontMetrics.b),
                    d = {};
                this.chart.styledMode || (d = {
                    "stroke-width": o.lineWidth || 0
                }, o.dashStyle && (d.dashstyle = o.dashStyle)), this.legendLine = l.path(["M", 0, c, "L", r, c]).addClass("highcharts-graph").attr(d).add(h), s && !1 !== s.enabled && r && (e = Math.min(u(s.radius, a), a), 0 === this.symbol.indexOf("url") && (s = p(s, {
                    width: n,
                    height: n
                }), e = 0), this.legendSymbol = i = l.symbol(this.symbol, r / 2 - e, c - e, 2 * e, 2 * e, s).addClass("highcharts-point").add(h), i.isMarker = !0)
            }
        }, t.LegendSymbolMixin
    }), e(t, "parts/Point.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var h = e.animObject,
            o = e.defined,
            c = e.erase,
            r = e.extend,
            n = e.fireEvent,
            a = e.format,
            i = e.getNestedProperty,
            d = e.isArray,
            p = e.isNumber,
            l = e.isObject,
            u = e.syncTimeout,
            f = e.pick,
            g = e.removeEvent,
            s = e.uniqueKey,
            m = t,
            x = (v.prototype.animateBeforeDestroy = function() {
                var e, i = this,
                    o = {
                        x: i.startXPos,
                        opacity: 0
                    },
                    t = i.getGraphicalProps();
                t.singular.forEach(function(t) {
                    e = "dataLabel" === t, i[t] = i[t].animate(e ? {
                        x: i[t].startXPos,
                        y: i[t].startYPos,
                        opacity: 0
                    } : o)
                }), t.plural.forEach(function(t) {
                    i[t].forEach(function(t) {
                        t.element && t.animate(r({
                            x: i.startXPos
                        }, t.startYPos ? {
                            x: t.startXPos,
                            y: t.startYPos
                        } : {}))
                    })
                })
            }, v.prototype.applyOptions = function(t, e) {
                var i = this,
                    o = i.series,
                    s = o.options.pointValKey || o.pointValKey;
                return t = v.prototype.optionsToObject.call(this, t), r(i, t), i.options = i.options ? r(i.options, t) : t, t.group && delete i.group, t.dataLabels && delete i.dataLabels, s && (i.y = v.prototype.getNestedProperty.call(i, s)), i.isNull = f(i.isValid && !i.isValid(), null === i.x || !p(i.y)), i.formatPrefix = i.isNull ? "null" : "point", i.selected && (i.state = "select"), "name" in i && void 0 === e && o.xAxis && o.xAxis.hasNames && (i.x = o.xAxis.nameToX(i)), void 0 === i.x && o && (i.x = void 0 === e ? o.autoIncrement(i) : e), i
            }, v.prototype.destroy = function() {
                var t, e = this,
                    i = e.series,
                    o = i.chart,
                    s = i.options.dataSorting,
                    r = o.hoverPoints,
                    n = e.series.chart.renderer.globalAnimation,
                    a = h(n);

                function l() {
                    for (t in (e.graphic || e.dataLabel || e.dataLabels) && (g(e), e.destroyElements()), e) e[t] = null
                }
                e.legendItem && o.legend.destroyItem(e), r && (e.setState(), c(r, e), r.length || (o.hoverPoints = null)), e === o.hoverPoint && e.onMouseOut(), s && s.enabled ? (this.animateBeforeDestroy(), u(l, a.duration)) : l(), o.pointCount--
            }, v.prototype.destroyElements = function(t) {
                var e = this,
                    i = e.getGraphicalProps(t);
                i.singular.forEach(function(t) {
                    e[t] = e[t].destroy()
                }), i.plural.forEach(function(t) {
                    e[t].forEach(function(t) {
                        t.element && t.destroy()
                    }), delete e[t]
                })
            }, v.prototype.firePointEvent = function(t, e, i) {
                var o = this,
                    s = this.series.options;
                (s.point.events[t] || o.options && o.options.events && o.options.events[t]) && o.importEvents(), "click" === t && s.allowPointSelect && (i = function(t) {
                    o.select && o.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
                }), n(o, t, e, i)
            }, v.prototype.getClassName = function() {
                var t = this;
                return "highcharts-point" + (t.selected ? " highcharts-point-select" : "") + (t.negative ? " highcharts-negative" : "") + (t.isNull ? " highcharts-null-point" : "") + (void 0 !== t.colorIndex ? " highcharts-color-" + t.colorIndex : "") + (t.options.className ? " " + t.options.className : "") + (t.zone && t.zone.className ? " " + t.zone.className.replace("highcharts-negative", "") : "")
            }, v.prototype.getGraphicalProps = function(i) {
                var t, e, o = this,
                    s = [],
                    r = {
                        singular: [],
                        plural: []
                    };
                for ((i = i || {
                        graphic: 1,
                        dataLabel: 1
                    }).graphic && s.push("graphic", "shadowGroup"), i.dataLabel && s.push("dataLabel", "dataLabelUpper", "connector"), e = s.length; e--;) t = s[e], o[t] && r.singular.push(t);
                return ["dataLabel", "connector"].forEach(function(t) {
                    var e = t + "s";
                    i[t] && o[e] && r.plural.push(e)
                }), r
            }, v.prototype.getLabelConfig = function() {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, v.prototype.getNestedProperty = function(t) {
                if (t) return 0 === t.indexOf("custom.") ? i(t, this.options) : this[t]
            }, v.prototype.getZone = function() {
                for (var t = this.series, e = t.zones, i = t.zoneAxis || "y", o = 0, s = e[o]; this[i] >= s.value;) s = e[++o];
                return this.nonZonedColor || (this.nonZonedColor = this.color), s && s.color && !this.options.color ? this.color = s.color : this.color = this.nonZonedColor, s
            }, v.prototype.hasNewShapeType = function() {
                return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType
            }, v.prototype.init = function(t, e, i) {
                return this.series = t, this.applyOptions(e, i), this.id = o(this.id) ? this.id : s(), this.resolveColor(), t.chart.pointCount++, n(this, "afterInit"), this
            }, v.prototype.optionsToObject = function(t) {
                var e, i = {},
                    o = this.series,
                    s = o.options.keys,
                    r = s || o.pointArrayMap || ["y"],
                    n = r.length,
                    a = 0,
                    l = 0;
                if (p(t) || null === t) i[r[0]] = t;
                else if (d(t))
                    for (!s && t.length > n && ("string" == (e = typeof t[0]) ? i.name = t[0] : "number" == e && (i.x = t[0]), a++); l < n;) s && void 0 === t[a] || (0 < r[l].indexOf(".") ? v.prototype.setNestedProperty(i, t[a], r[l]) : i[r[l]] = t[a]), a++, l++;
                else "object" == typeof t && ((i = t).dataLabels && (o._hasPointLabels = !0), t.marker && (o._hasPointMarkers = !0));
                return i
            }, v.prototype.resolveColor = function() {
                var t, e, i = this.series,
                    o = i.chart.options.chart.colorCount,
                    s = i.chart.styledMode;
                delete this.nonZonedColor, s || this.options.color || (this.color = i.color), i.options.colorByPoint ? (s || (t = i.options.colors || i.chart.options.colors, this.color = this.color || t[i.colorCounter], o = t.length), e = i.colorCounter, i.colorCounter++, i.colorCounter === o && (i.colorCounter = 0)) : e = i.colorIndex, this.colorIndex = f(this.colorIndex, e)
            }, v.prototype.setNestedProperty = function(t, r, e) {
                return e.split(".").reduce(function(t, e, i, o) {
                    var s = o.length - 1 === i;
                    return t[e] = s ? r : l(t[e], !0) ? t[e] : {}, t[e]
                }, t), t
            }, v.prototype.tooltipFormatter = function(e) {
                var t = this.series,
                    i = t.tooltipOptions,
                    o = f(i.valueDecimals, ""),
                    s = i.valuePrefix || "",
                    r = i.valueSuffix || "";
                return t.chart.styledMode && (e = t.chart.tooltip.styledModeFormat(e)), (t.pointArrayMap || ["y"]).forEach(function(t) {
                    t = "{point." + t, (s || r) && (e = e.replace(RegExp(t + "}", "g"), s + t + "}" + r)), e = e.replace(RegExp(t + "}", "g"), t + ":,." + o + "f}")
                }), a(e, {
                    point: this,
                    series: this.series
                }, t.chart)
            }, v);

        function v() {
            this.category = void 0, this.colorIndex = void 0, this.formatPrefix = "point", this.id = void 0, this.isNull = !1, this.name = void 0, this.options = void 0, this.percentage = void 0, this.selected = !1, this.series = void 0, this.total = void 0, this.visible = !0, this.x = void 0
        }
        return m.Point = x, m.Point
    }), e(t, "parts/Series.js", [t["mixins/legend-symbol.js"], t["parts/Globals.js"], t["parts/Point.js"], t["parts/Utilities.js"]], function(t, e, i, l) {
        var n = l.addEvent,
            c = l.animObject,
            b = l.arrayMax,
            k = l.arrayMin,
            C = l.clamp,
            L = l.correctFloat,
            E = l.defined,
            h = l.erase,
            S = l.error,
            x = l.extend,
            d = l.find,
            O = l.fireEvent,
            a = l.getNestedProperty,
            D = l.isArray,
            p = l.isFunction,
            B = l.isNumber,
            A = l.isString,
            u = l.merge,
            f = l.objectEach,
            I = l.pick,
            g = l.removeEvent,
            o = l.seriesType,
            v = l.splat,
            m = l.syncTimeout,
            y = e.defaultOptions,
            s = e.defaultPlotOptions,
            r = e.seriesTypes,
            M = e.SVGElement,
            w = e.win;
        e.Series = o("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            crisp: !0,
            showCheckbox: !1,
            animation: {
                duration: 1e3
            },
            events: {},
            marker: {
                enabledThreshold: 2,
                lineColor: "#ffffff",
                lineWidth: 0,
                radius: 4,
                states: {
                    normal: {
                        animation: !0
                    },
                    hover: {
                        animation: {
                            duration: 50
                        },
                        enabled: !0,
                        radiusPlus: 2,
                        lineWidthPlus: 1
                    },
                    select: {
                        fillColor: "#cccccc",
                        lineColor: "#000000",
                        lineWidth: 2
                    }
                }
            },
            point: {
                events: {}
            },
            dataLabels: {
                align: "center",
                formatter: function() {
                    var t = this.series.chart.numberFormatter;
                    return "number" != typeof this.y ? "" : t(this.y, -1)
                },
                padding: 5,
                style: {
                    fontSize: "11px",
                    fontWeight: "bold",
                    color: "contrast",
                    textOutline: "1px contrast"
                },
                verticalAlign: "bottom",
                x: 0,
                y: 0
            },
            cropThreshold: 300,
            opacity: 1,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {
                    animation: !0
                },
                hover: {
                    animation: {
                        duration: 50
                    },
                    lineWidthPlus: 1,
                    marker: {},
                    halo: {
                        size: 10,
                        opacity: .25
                    }
                },
                select: {
                    animation: {
                        duration: 0
                    }
                },
                inactive: {
                    animation: {
                        duration: 50
                    },
                    opacity: .2
                }
            },
            stickyTracking: !0,
            turboThreshold: 1e3,
            findNearestPointBy: "x"
        }, {
            axisTypes: ["xAxis", "yAxis"],
            coll: "series",
            colorCounter: 0,
            cropShoulder: 1,
            directTouch: !1,
            eventsToUnbind: [],
            isCartesian: !0,
            parallelArrays: ["x", "y"],
            pointClass: i,
            requireSorting: !0,
            sorted: !0,
            init: function(t, e) {
                O(this, "init", {
                    options: e
                });
                var i, o, s = this,
                    r = t.series;
                this.eventOptions = this.eventOptions || {}, s.chart = t, s.options = e = s.setOptions(e), s.linkedSeries = [], s.bindAxes(), x(s, {
                    name: e.name,
                    state: "",
                    visible: !1 !== e.visible,
                    selected: !0 === e.selected
                }), i = e.events, f(i, function(t, e) {
                    p(t) && s.eventOptions[e] !== t && (p(s.eventOptions[e]) && g(s, e, s.eventOptions[e]), s.eventOptions[e] = t, n(s, e, t))
                }), (i && i.click || e.point && e.point.events && e.point.events.click || e.allowPointSelect) && (t.runTrackerClick = !0), s.getColor(), s.getSymbol(), s.parallelArrays.forEach(function(t) {
                    s[t + "Data"] || (s[t + "Data"] = [])
                }), s.isCartesian && (t.hasCartesianSeries = !0), r.length && (o = r[r.length - 1]), s._i = I(o && o._i, -1) + 1, t.orderSeries(this.insert(r)), e.dataSorting && e.dataSorting.enabled ? s.setDataSortingOptions() : s.points || s.data || s.setData(e.data, !1), O(this, "afterInit")
            },
            is: function(t) {
                return r[t] && this instanceof r[t]
            },
            insert: function(t) {
                var e, i = this.options.index;
                if (B(i)) {
                    for (e = t.length; e--;)
                        if (i >= I(t[e].options.index, t[e]._i)) {
                            t.splice(e + 1, 0, this);
                            break
                        } - 1 === e && t.unshift(this), e += 1
                } else t.push(this);
                return I(e, t.length - 1)
            },
            bindAxes: function() {
                var i, o = this,
                    s = o.options,
                    t = o.chart;
                O(this, "bindAxes", null, function() {
                    (o.axisTypes || []).forEach(function(e) {
                        t[e].forEach(function(t) {
                            i = t.options, (s[e] === i.index || void 0 !== s[e] && s[e] === i.id || void 0 === s[e] && 0 === i.index) && (o.insert(t.series), (o[e] = t).isDirty = !0)
                        }), o[e] || o.optionalAxis === e || S(18, !0, t)
                    })
                }), O(this, "afterBindAxes")
            },
            updateParallelArrays: function(i, o) {
                var s = i.series,
                    e = arguments,
                    t = B(o) ? function(t) {
                        var e = "y" === t && s.toYData ? s.toYData(i) : i[t];
                        s[t + "Data"][o] = e
                    } : function(t) {
                        Array.prototype[o].apply(s[t + "Data"], Array.prototype.slice.call(e, 2))
                    };
                s.parallelArrays.forEach(t)
            },
            hasData: function() {
                return this.visible && void 0 !== this.dataMax && void 0 !== this.dataMin || this.visible && this.yData && 0 < this.yData.length
            },
            autoIncrement: function() {
                var t, e, i = this.options,
                    o = this.xIncrement,
                    s = i.pointIntervalUnit,
                    r = this.chart.time,
                    o = I(o, i.pointStart, 0);
                return this.pointInterval = e = I(this.pointInterval, i.pointInterval, 1), s && (t = new r.Date(o), "day" === s ? r.set("Date", t, r.get("Date", t) + e) : "month" === s ? r.set("Month", t, r.get("Month", t) + e) : "year" === s && r.set("FullYear", t, r.get("FullYear", t) + e), e = t.getTime() - o), this.xIncrement = o + e, o
            },
            setDataSortingOptions: function() {
                var t = this.options;
                x(this, {
                    requireSorting: !1,
                    sorted: !1,
                    enabledDataSorting: !0,
                    allowDG: !1
                }), E(t.pointRange) || (t.pointRange = 1)
            },
            setOptions: function(t) {
                var e, i, o, s = this.chart,
                    r = s.options,
                    n = r.plotOptions,
                    a = s.userOptions || {},
                    l = u(t),
                    h = s.styledMode,
                    c = {
                        plotOptions: n,
                        userOptions: l
                    };
                O(this, "setOptions", c);
                var d = c.plotOptions[this.type],
                    p = a.plotOptions || {};
                return this.userOptions = c.userOptions, e = u(d, n.series, a.plotOptions && a.plotOptions[this.type], l), this.tooltipOptions = u(y.tooltip, y.plotOptions.series && y.plotOptions.series.tooltip, y.plotOptions[this.type].tooltip, r.tooltip.userOptions, n.series && n.series.tooltip, n[this.type].tooltip, l.tooltip), this.stickyTracking = I(l.stickyTracking, p[this.type] && p[this.type].stickyTracking, p.series && p.series.stickyTracking, !(!this.tooltipOptions.shared || this.noSharedTooltip) || e.stickyTracking), null === d.marker && delete e.marker, this.zoneAxis = e.zoneAxis, i = this.zones = (e.zones || []).slice(), !e.negativeColor && !e.negativeFillColor || e.zones || (o = {
                    value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
                    className: "highcharts-negative"
                }, h || (o.color = e.negativeColor, o.fillColor = e.negativeFillColor), i.push(o)), i.length && E(i[i.length - 1].value) && i.push(h ? {} : {
                    color: this.color,
                    fillColor: this.fillColor
                }), O(this, "afterSetOptions", {
                    options: e
                }), e
            },
            getName: function() {
                return I(this.options.name, "Series " + (this.index + 1))
            },
            getCyclic: function(t, e, i) {
                var o, s, r = this.chart,
                    n = this.userOptions,
                    a = t + "Index",
                    l = t + "Counter",
                    h = i ? i.length : I(r.options.chart[t + "Count"], r[t + "Count"]);
                e || (s = I(n[a], n["_" + a]), E(s) ? o = s : (r.series.length || (r[l] = 0), n["_" + a] = o = r[l] % h, r[l] += 1), i && (e = i[o])), void 0 !== o && (this[a] = o), this[t] = e
            },
            getColor: function() {
                this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || s[this.type].color, this.chart.options.colors)
            },
            getPointsCollection: function() {
                return (this.hasGroupedData ? this.points : this.data) || []
            },
            getSymbol: function() {
                var t = this.options.marker;
                this.getCyclic("symbol", t.symbol, this.chart.options.symbols)
            },
            findPointIndex: function(e, t) {
                var i, o, s, r, n = e.id,
                    a = e.x,
                    l = this.points,
                    h = this.options.dataSorting;
                if (n) i = this.chart.get(n);
                else if ((this.linkedParent || this.enabledDataSorting) && (r = h && h.matchByName ? "name" : "index", !(i = d(l, function(t) {
                        return !t.touched && t[r] === e[r]
                    })))) return;
                return i && void 0 !== (s = i && i.index) && (o = !0), void 0 === s && B(a) && (s = this.xData.indexOf(a, t)), -1 !== s && void 0 !== s && this.cropped && (s = s >= this.cropStart ? s - this.cropStart : s), !o && l[s] && l[s].touched && (s = void 0), s
            },
            drawLegendSymbol: t.drawLineMarker,
            updateData: function(t, e) {
                var s, i, o, r, n = this.options,
                    a = n.dataSorting,
                    l = this.points,
                    h = [],
                    c = this.requireSorting,
                    d = t.length === l.length,
                    p = !0;
                if (this.xIncrement = null, t.forEach(function(t, e) {
                        var i, o = E(t) && this.pointClass.prototype.optionsToObject.call({
                            series: this
                        }, t) || {};
                        o.id || B(o.x) ? (-1 === (i = this.findPointIndex(o, r)) || void 0 === i ? h.push(t) : l[i] && t !== n.data[i] ? (l[i].update(t, !1, null, !1), l[i].touched = !0, c && (r = i + 1)) : l[i] && (l[i].touched = !0), (!d || e !== i || a && a.enabled || this.hasDerivedData) && (s = !0)) : h.push(t)
                    }, this), s)
                    for (i = l.length; i--;)(o = l[i]) && !o.touched && o.remove && o.remove(!1, e);
                else !d || a && a.enabled ? p = !1 : (t.forEach(function(t, e) {
                    l[e].update && t !== l[e].y && l[e].update(t, !1, null, !1)
                }), h.length = 0);
                return l.forEach(function(t) {
                    t && (t.touched = !1)
                }), !!p && (h.forEach(function(t) {
                    this.addPoint(t, !1, null, null, !1)
                }, this), null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = b(this.xData), this.autoIncrement()), !0)
            },
            setData: function(t, e, i, o) {
                var s, r, n, a = this,
                    l = a.points,
                    h = l && l.length || 0,
                    c = a.options,
                    d = a.chart,
                    p = c.dataSorting,
                    u = null,
                    f = a.xAxis,
                    g = c.turboThreshold,
                    m = this.xData,
                    x = this.yData,
                    v = a.pointArrayMap,
                    y = v && v.length,
                    b = c.keys,
                    k = 0,
                    M = 1,
                    w = (t = t || []).length;
                if (e = I(e, !0), p && p.enabled && (t = this.sortData(t)), !1 !== o && w && h && !a.cropped && !a.hasGroupedData && a.visible && !a.isSeriesBoosting && (n = this.updateData(t, i)), !n) {
                    if (a.xIncrement = null, a.colorCounter = 0, this.parallelArrays.forEach(function(t) {
                            a[t + "Data"].length = 0
                        }), g && g < w)
                        if (u = a.getFirstValidPoint(t), B(u))
                            for (s = 0; s < w; s++) m[s] = this.autoIncrement(), x[s] = t[s];
                        else if (D(u))
                        if (y)
                            for (s = 0; s < w; s++) r = t[s], m[s] = r[0], x[s] = r.slice(1, y + 1);
                        else
                            for (b && (k = 0 <= (k = b.indexOf("x")) ? k : 0, M = 0 <= (M = b.indexOf("y")) ? M : 1), s = 0; s < w; s++) r = t[s], m[s] = r[k], x[s] = r[M];
                    else S(12, !1, d);
                    else
                        for (s = 0; s < w; s++) void 0 !== t[s] && (r = {
                            series: a
                        }, a.pointClass.prototype.applyOptions.apply(r, [t[s]]), a.updateParallelArrays(r, s));
                    for (x && A(x[0]) && S(14, !0, d), a.data = [], a.options.data = a.userOptions.data = t, s = h; s--;) l[s] && l[s].destroy && l[s].destroy();
                    f && (f.minRange = f.userMinRange), a.isDirty = d.isDirtyBox = !0, a.isDirtyData = !!l, i = !1
                }
                "point" === c.legendType && (this.processData(), this.generatePoints()), e && d.redraw(i)
            },
            sortData: function(s) {
                function r(t, e) {
                    return E(e) && t.pointClass.prototype.optionsToObject.call({
                        series: t
                    }, e) || {}
                }
                var i = this,
                    n = i.options.dataSorting.sortKey || "y";
                return s.forEach(function(t, e) {
                    s[e] = r(i, t), s[e].index = e
                }, this), s.concat().sort(function(t, e) {
                    var i = a(n, t),
                        o = a(n, e);
                    return o < i ? -1 : i < o ? 1 : 0
                }).forEach(function(t, e) {
                    t.x = e
                }, this), i.linkedSeries && i.linkedSeries.forEach(function(i) {
                    var t = i.options,
                        o = t.data;
                    t.dataSorting && t.dataSorting.enabled || !o || (o.forEach(function(t, e) {
                        o[e] = r(i, t), s[e] && (o[e].x = s[e].x, o[e].index = e)
                    }), i.setData(o, !1))
                }), s
            },
            getProcessedData: function(t) {
                var e, i, o, s, r, n, a, l, h = this,
                    c = h.xData,
                    d = h.yData,
                    p = c.length,
                    u = 0,
                    f = h.xAxis,
                    g = h.options,
                    m = g.cropThreshold,
                    x = t || h.getExtremesFromAll || g.getExtremesFromAll,
                    v = h.isCartesian,
                    y = f && f.val2lin,
                    b = !(!f || !f.logarithmic),
                    k = h.requireSorting;
                for (f && (a = (n = f.getExtremes()).min, l = n.max), v && h.sorted && !x && (!m || m < p || h.forceCrop) && (c[p - 1] < a || c[0] > l ? (c = [], d = []) : h.yData && (c[0] < a || c[p - 1] > l) && (c = (e = this.cropData(h.xData, h.yData, a, l)).xData, d = e.yData, u = e.start, i = !0)), r = c.length || 1; --r;) 0 < (o = b ? y(c[r]) - y(c[r - 1]) : c[r] - c[r - 1]) && (void 0 === s || o < s) ? s = o : o < 0 && k && (S(15, !1, h.chart), k = !1);
                return {
                    xData: c,
                    yData: d,
                    cropped: i,
                    cropStart: u,
                    closestPointRange: s
                }
            },
            processData: function(t) {
                var e, i = this,
                    o = i.xAxis;
                if (i.isCartesian && !i.isDirty && !o.isDirty && !i.yAxis.isDirty && !t) return !1;
                e = i.getProcessedData(), i.cropped = e.cropped, i.cropStart = e.cropStart, i.processedXData = e.xData, i.processedYData = e.yData, i.closestPointRange = i.basePointRange = e.closestPointRange
            },
            cropData: function(t, e, i, o, s) {
                var r, n, a = t.length,
                    l = 0,
                    h = a;
                for (s = I(s, this.cropShoulder), r = 0; r < a; r++)
                    if (t[r] >= i) {
                        l = Math.max(0, r - s);
                        break
                    }
                for (n = r; n < a; n++)
                    if (t[n] > o) {
                        h = n + s;
                        break
                    }
                return {
                    xData: t.slice(l, h),
                    yData: e.slice(l, h),
                    start: l,
                    end: h
                }
            },
            generatePoints: function() {
                var t, e, i, o, s, r = this,
                    n = r.options,
                    a = n.data,
                    l = r.data,
                    h = r.processedXData,
                    c = r.processedYData,
                    d = r.pointClass,
                    p = h.length,
                    u = r.cropStart || 0,
                    f = r.hasGroupedData,
                    g = n.keys,
                    m = [];
                for (l || f || ((s = []).length = a.length, l = r.data = s), g && f && (r.options.keys = !1), o = 0; o < p; o++) e = u + o, f ? ((i = (new d).init(r, [h[o]].concat(v(c[o])))).dataGroup = r.groupMap[o], i.dataGroup.options && (i.options = i.dataGroup.options, x(i, i.dataGroup.options), delete i.dataLabels)) : (i = l[e]) || void 0 === a[e] || (l[e] = i = (new d).init(r, a[e], h[o])), i && (i.index = e, m[o] = i);
                if (r.options.keys = g, l && (p !== (t = l.length) || f))
                    for (o = 0; o < t; o++) o !== u || f || (o += p), l[o] && (l[o].destroyElements(), l[o].plotX = void 0);
                r.data = l, r.points = m, O(this, "afterGeneratePoints")
            },
            getXExtremes: function(t) {
                return {
                    min: k(t),
                    max: b(t)
                }
            },
            getExtremes: function(t, e) {
                var i, o, s, r, n, a, l, h = this.xAxis,
                    c = this.yAxis,
                    d = this.processedXData || this.xData,
                    p = [],
                    u = 0,
                    f = 0,
                    g = 0,
                    m = this.requireSorting ? this.cropShoulder : 0,
                    x = !!c && c.positiveValuesOnly,
                    v = (t = t || this.stackedYData || this.processedYData || []).length;
                for (h && (f = (i = h.getExtremes()).min, g = i.max), a = 0; a < v; a++)
                    if (r = d[a], n = t[a], o = (B(n) || D(n)) && (n.length || 0 < n || !x), s = e || this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !h || (d[a + m] || r) >= f && (d[a - m] || r) <= g, o && s)
                        if (l = n.length)
                            for (; l--;) B(n[l]) && (p[u++] = n[l]);
                        else p[u++] = n;
                var y = {
                    dataMin: k(p),
                    dataMax: b(p)
                };
                return O(this, "afterGetExtremes", {
                    dataExtremes: y
                }), y
            },
            applyExtremes: function() {
                var t = this.getExtremes();
                return this.dataMin = t.dataMin, this.dataMax = t.dataMax, t
            },
            getFirstValidPoint: function(t) {
                for (var e = null, i = t.length, o = 0; null === e && o < i;) e = t[o], o++;
                return e
            },
            translate: function() {
                this.processedXData || this.processData(), this.generatePoints();
                var t, e, i, o, s = this,
                    r = s.options,
                    n = r.stacking,
                    a = s.xAxis,
                    l = a.categories,
                    h = s.enabledDataSorting,
                    c = s.yAxis,
                    d = s.points,
                    p = d.length,
                    u = !!s.modifyValue,
                    f = s.pointPlacementToXValue(),
                    g = Boolean(f),
                    m = r.threshold,
                    x = r.startFromThreshold ? m : 0,
                    v = this.zoneAxis || "y",
                    y = Number.MAX_VALUE;

                function b(t) {
                    return C(t, -1e5, 1e5)
                }
                for (t = 0; t < p; t++) {
                    var k, M, w = d[t],
                        S = w.x,
                        A = w.y,
                        T = w.low,
                        P = n && c.stacking && c.stacking.stacks[(s.negStacks && A < (x ? 0 : m) ? "-" : "") + s.stackKey];
                    c.positiveValuesOnly && null !== A && A <= 0 && (w.isNull = !0), w.plotX = e = L(b(a.translate(S, 0, 0, 0, 1, f, "flags" === this.type))), n && s.visible && P && P[S] && (o = s.getStackIndicator(o, S, s.index), w.isNull || (M = (k = P[S]).points[o.key])), D(M) && (T = M[0], A = M[1], T === x && o.key === P[S].base && (T = I(B(m) && m, c.min)), c.positiveValuesOnly && T <= 0 && (T = null), w.total = w.stackTotal = k.total, w.percentage = k.total && w.y / k.total * 100, w.stackY = A, s.irregularWidths || k.setOffset(s.pointXOffset || 0, s.barW || 0)), w.yBottom = E(T) ? b(c.translate(T, 0, 1, 0, 1)) : null, u && (A = s.modifyValue(A, w)), w.plotY = "number" == typeof A && A !== 1 / 0 ? b(c.translate(A, 0, 1, 0, 1)) : void 0, w.isInside = this.isPointInside(w), w.clientX = g ? L(a.translate(S, 0, 0, 0, 1, f)) : e, w.negative = w[v] < (r[v + "Threshold"] || m || 0), w.category = l && void 0 !== l[w.x] ? l[w.x] : w.x, w.isNull || !1 === w.visible || (void 0 !== i && (y = Math.min(y, Math.abs(e - i))), i = e), w.zone = this.zones.length && w.getZone(), !w.graphic && s.group && h && (w.isNew = !0)
                }
                s.closestPointRangePx = y, O(this, "afterTranslate")
            },
            getValidPoints: function(t, e, i) {
                var o = this.chart;
                return (t || this.points || []).filter(function(t) {
                    return !(e && !o.isInsidePlot(t.plotX, t.plotY, o.inverted)) && (!1 !== t.visible && (i || !t.isNull))
                })
            },
            getClipBox: function(t, e) {
                var i, o = this.options,
                    s = this.chart,
                    r = s.inverted,
                    n = this.xAxis,
                    a = n && this.yAxis;
                return t && !1 === o.clip && a ? i = r ? {
                    y: -s.chartWidth + a.len + a.pos,
                    height: s.chartWidth,
                    width: s.chartHeight,
                    x: -s.chartHeight + n.len + n.pos
                } : {
                    y: -a.pos,
                    height: s.chartHeight,
                    width: s.chartWidth,
                    x: -n.pos
                } : (i = this.clipBox || s.clipBox, e && (i.width = s.plotSizeX, i.x = 0)), e ? {
                    width: i.width,
                    x: i.x
                } : i
            },
            setClip: function(t) {
                var e = this.chart,
                    i = this.options,
                    o = e.renderer,
                    s = e.inverted,
                    r = this.clipBox,
                    n = this.getClipBox(t),
                    a = this.sharedClipKey || ["_sharedClip", t && t.duration, t && t.easing, n.height, i.xAxis, i.yAxis].join(","),
                    l = e[a],
                    h = e[a + "m"];
                t && (n.width = 0, s && (n.x = e.plotHeight + (!1 !== i.clip ? 0 : e.plotTop))), l ? e.hasLoaded || l.attr(n) : (t && (e[a + "m"] = h = o.clipRect(s ? e.plotSizeX + 99 : -99, s ? -e.plotLeft : -e.plotTop, 99, s ? e.chartWidth : e.chartHeight)), e[a] = l = o.clipRect(n), l.count = {
                    length: 0
                }), t && (l.count[this.index] || (l.count[this.index] = !0, l.count.length += 1)), !1 === i.clip && !t || (this.group.clip(t || r ? l : e.clipRect), this.markerGroup.clip(h), this.sharedClipKey = a), t || (l.count[this.index] && (delete l.count[this.index], --l.count.length), 0 === l.count.length && a && e[a] && (r || (e[a] = e[a].destroy()), e[a + "m"] && (e[a + "m"] = e[a + "m"].destroy())))
            },
            animate: function(t) {
                var e, i, o, s = this.chart,
                    r = c(this.options.animation);
                s.hasRendered || (t ? this.setClip(r) : (e = s[i = this.sharedClipKey], o = this.getClipBox(r, !0), e && e.animate(o, r), s[i + "m"] && s[i + "m"].animate({
                    width: o.width + 99,
                    x: o.x - (s.inverted ? 0 : 99)
                }, r)))
            },
            afterAnimate: function() {
                this.setClip(), O(this, "afterAnimate"), this.finishedAnimating = !0
            },
            drawPoints: function() {
                var t, e, i, o = this,
                    s = o.points,
                    r = o.chart,
                    n = o.options.marker,
                    a = o[o.specialGroup] || o.markerGroup,
                    l = o.xAxis,
                    h = I(n.enabled, !(l && !l.isRadial) || null, o.closestPointRangePx >= n.enabledThreshold * n.radius);
                if (!1 !== n.enabled || o._hasPointMarkers)
                    for (t = 0; t < s.length; t++) {
                        var c, d, p, u = (i = (e = s[t]).graphic) ? "animate" : "attr",
                            f = e.marker || {},
                            g = !!e.marker;
                        (h && void 0 === f.enabled || f.enabled) && !e.isNull && !1 !== e.visible ? (c = I(f.symbol, o.symbol), d = o.markerAttribs(e, e.selected && "select"), o.enabledDataSorting && (e.startXPos = l.reversed ? -d.width : l.width), p = !1 !== e.isInside, i ? i[p ? "show" : "hide"](p).animate(d) : p && (0 < d.width || e.hasImage) && (e.graphic = i = r.renderer.symbol(c, d.x, d.y, d.width, d.height, g ? f : n).add(a), o.enabledDataSorting && r.hasRendered && (i.attr({
                            x: e.startXPos
                        }), u = "animate")), i && "animate" === u && i[p ? "show" : "hide"](p).animate(d), i && !r.styledMode && i[u](o.pointAttribs(e, e.selected && "select")), i && i.addClass(e.getClassName(), !0)) : i && (e.graphic = i.destroy())
                    }
            },
            markerAttribs: function(t, e) {
                var i, o, s, r = this.options,
                    n = r.marker,
                    a = t.marker || {},
                    l = a.symbol || n.symbol,
                    h = I(a.radius, n.radius);
                return e && (i = n.states[e], o = a.states && a.states[e], h = I(o && o.radius, i && i.radius, h + (i && i.radiusPlus || 0))), t.hasImage = l && 0 === l.indexOf("url"), t.hasImage && (h = 0), s = {
                    x: r.crisp ? Math.floor(t.plotX) - h : t.plotX - h,
                    y: t.plotY - h
                }, h && (s.width = s.height = 2 * h), s
            },
            pointAttribs: function(t, e) {
                var i, o, s = this.options.marker,
                    r = t && t.options,
                    n = r && r.marker || {},
                    a = this.color,
                    l = r && r.color,
                    h = t && t.color,
                    c = I(n.lineWidth, s.lineWidth),
                    d = t && t.zone && t.zone.color,
                    p = 1,
                    a = l || d || h || a,
                    u = n.fillColor || s.fillColor || a,
                    f = n.lineColor || s.lineColor || a;
                return (e = e || "normal") && (i = s.states[e], o = n.states && n.states[e] || {}, c = I(o.lineWidth, i.lineWidth, c + I(o.lineWidthPlus, i.lineWidthPlus, 0)), u = o.fillColor || i.fillColor || u, f = o.lineColor || i.lineColor || f, p = I(o.opacity, i.opacity, p)), {
                    stroke: f,
                    "stroke-width": c,
                    fill: u,
                    opacity: p
                }
            },
            destroy: function(i) {
                var t, e, o, s = this,
                    r = s.chart,
                    n = /AppleWebKit\/533/.test(w.navigator.userAgent),
                    a = s.data || [];
                for (O(s, "destroy"), this.removeEvents(i), (s.axisTypes || []).forEach(function(t) {
                        (o = s[t]) && o.series && (h(o.series, s), o.isDirty = o.forceRedraw = !0)
                    }), s.legendItem && s.chart.legend.destroyItem(s), t = a.length; t--;)(e = a[t]) && e.destroy && e.destroy();
                s.points = null, l.clearTimeout(s.animationTimeout), f(s, function(t, e) {
                    t instanceof M && !t.survive && t[n && "group" === e ? "hide" : "destroy"]()
                }), r.hoverSeries === s && (r.hoverSeries = null), h(r.series, s), r.orderSeries(), f(s, function(t, e) {
                    i && "hcEvents" === e || delete s[e]
                })
            },
            getGraphPath: function(n, a, l) {
                var t, h, c = this,
                    d = c.options,
                    p = d.step,
                    u = [],
                    f = [];
                return (t = (n = n || c.points).reversed) && n.reverse(), (p = {
                    right: 1,
                    center: 2
                }[p] || p && 3) && t && (p = 4 - p), (n = this.getValidPoints(n, !1, !(d.connectNulls && !a && !l))).forEach(function(t, e) {
                    var i, o = t.plotX,
                        s = t.plotY,
                        r = n[e - 1];
                    (t.leftCliff || r && r.rightCliff) && !l && (h = !0), h = t.isNull && !E(a) && 0 < e ? !d.connectNulls : !(!t.isNull || a) || (0 === e || h ? i = [
                        ["M", t.plotX, t.plotY]
                    ] : c.getPointSpline ? i = [c.getPointSpline(n, t, e)] : p ? (i = 1 === p ? [
                        ["L", r.plotX, s]
                    ] : 2 === p ? [
                        ["L", (r.plotX + o) / 2, r.plotY],
                        ["L", (r.plotX + o) / 2, s]
                    ] : [
                        ["L", o, r.plotY]
                    ]).push(["L", o, s]) : i = [
                        ["L", o, s]
                    ], f.push(t.x), p && (f.push(t.x), 2 === p && f.push(t.x)), u.push.apply(u, i), !1)
                }), u.xMap = f, c.graphPath = u
            },
            drawGraph: function() {
                var n = this,
                    a = this.options,
                    l = (this.gappedPath || this.getGraphPath).call(this),
                    h = this.chart.styledMode,
                    t = [
                        ["graph", "highcharts-graph"]
                    ];
                h || t[0].push(a.lineColor || this.color || "#cccccc", a.dashStyle), (t = n.getZonesGraphs(t)).forEach(function(t, e) {
                    var i, o = t[0],
                        s = n[o],
                        r = s ? "animate" : "attr";
                    s ? (s.endX = n.preventGraphAnimation ? null : l.xMap, s.animate({
                        d: l
                    })) : l.length && (n[o] = s = n.chart.renderer.path(l).addClass(t[1]).attr({
                        zIndex: 1
                    }).add(n.group)), s && !h && (i = {
                        stroke: t[2],
                        "stroke-width": a.lineWidth,
                        fill: n.fillGraph && n.color || "none"
                    }, t[3] ? i.dashstyle = t[3] : "square" !== a.linecap && (i["stroke-linecap"] = i["stroke-linejoin"] = "round"), s[r](i).shadow(e < 2 && a.shadow)), s && (s.startX = l.xMap, s.isArea = l.isArea)
                })
            },
            getZonesGraphs: function(o) {
                return this.zones.forEach(function(t, e) {
                    var i = ["zone-graph-" + e, "highcharts-graph highcharts-zone-graph-" + e + " " + (t.className || "")];
                    this.chart.styledMode || i.push(t.color || this.color, t.dashStyle || this.options.dashStyle), o.push(i)
                }, this), o
            },
            applyZones: function() {
                var i, o, s, r, n, a, l, h, c, d, p, u = this,
                    f = this.chart,
                    g = f.renderer,
                    t = this.zones,
                    m = this.clips || [],
                    x = this.graph,
                    v = this.area,
                    y = Math.max(f.chartWidth, f.chartHeight),
                    b = this[(this.zoneAxis || "y") + "Axis"],
                    k = f.inverted,
                    M = !1;
                t.length && (x || v) && b && void 0 !== b.min ? (n = b.reversed, a = b.horiz, x && !this.showLine && x.hide(), v && v.hide(), r = b.getExtremes(), t.forEach(function(t, e) {
                    i = n ? a ? f.plotWidth : 0 : !a && b.toPixels(r.min) || 0, i = C(I(o, i), 0, y), o = C(Math.round(b.toPixels(I(t.value, r.max), !0) || 0), 0, y), M && (i = o = b.toPixels(r.max)), l = Math.abs(i - o), h = Math.min(i, o), c = Math.max(i, o), b.isXAxis ? (s = {
                        x: k ? c : h,
                        y: 0,
                        width: l,
                        height: y
                    }, a || (s.x = f.plotHeight - s.x)) : (s = {
                        x: 0,
                        y: k ? c : h,
                        width: y,
                        height: l
                    }, a && (s.y = f.plotWidth - s.y)), k && g.isVML && (s = b.isXAxis ? {
                        x: 0,
                        y: n ? h : c,
                        height: s.width,
                        width: f.chartWidth
                    } : {
                        x: s.y - f.plotLeft - f.spacingBox.x,
                        y: 0,
                        width: s.height,
                        height: f.chartHeight
                    }), m[e] ? m[e].animate(s) : m[e] = g.clipRect(s), d = u["zone-area-" + e], p = u["zone-graph-" + e], x && p && p.clip(m[e]), v && d && d.clip(m[e]), M = t.value > r.max, u.resetZones && 0 === o && (o = void 0)
                }), this.clips = m) : u.visible && (x && x.show(!0), v && v.show(!0))
            },
            invertGroups: function(e) {
                var i = this,
                    o = i.chart;

                function t() {
                    ["group", "markerGroup"].forEach(function(t) {
                        i[t] && (o.renderer.isVML && i[t].attr({
                            width: i.yAxis.len,
                            height: i.xAxis.len
                        }), i[t].width = i.yAxis.len, i[t].height = i.xAxis.len, i[t].invert(!i.isRadialSeries && e))
                    })
                }
                i.xAxis && (i.eventsToUnbind.push(n(o, "resize", t)), t(), i.invertGroups = t)
            },
            plotGroup: function(t, e, i, o, s) {
                var r = this[t],
                    n = !r;
                return n && (this[t] = r = this.chart.renderer.g().attr({
                    zIndex: o || .1
                }).add(s)), r.addClass("highcharts-" + e + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (E(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (r.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0), r.attr({
                    visibility: i
                })[n ? "attr" : "animate"](this.getPlotBox()), r
            },
            getPlotBox: function() {
                var t = this.chart,
                    e = this.xAxis,
                    i = this.yAxis;
                return t.inverted && (e = i, i = this.xAxis), {
                    translateX: e ? e.left : t.plotLeft,
                    translateY: i ? i.top : t.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            removeEvents: function(t) {
                t ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function(t) {
                    t()
                }), this.eventsToUnbind.length = 0) : g(this)
            },
            render: function() {
                var t, e = this,
                    i = e.chart,
                    o = e.options,
                    s = !e.finishedAnimating && i.renderer.isSVG && c(o.animation).duration,
                    r = e.visible ? "inherit" : "hidden",
                    n = o.zIndex,
                    a = e.hasRendered,
                    l = i.seriesGroup,
                    h = i.inverted;
                O(this, "render"), t = e.plotGroup("group", "series", r, n, l), e.markerGroup = e.plotGroup("markerGroup", "markers", r, n, l), s && e.animate && e.animate(!0), t.inverted = !(!e.isCartesian && !e.invertable) && h, e.drawGraph && (e.drawGraph(), e.applyZones()), e.visible && e.drawPoints(), e.drawDataLabels && e.drawDataLabels(), e.redrawPoints && e.redrawPoints(), e.drawTracker && !1 !== e.options.enableMouseTracking && e.drawTracker(), e.invertGroups(h), !1 === o.clip || e.sharedClipKey || a || t.clip(i.clipRect), s && e.animate && e.animate(), a || (e.animationTimeout = m(function() {
                    e.afterAnimate()
                }, s || 0)), e.isDirty = !1, e.hasRendered = !0, O(e, "afterRender")
            },
            redraw: function() {
                var t = this.chart,
                    e = this.isDirty || this.isDirtyData,
                    i = this.group,
                    o = this.xAxis,
                    s = this.yAxis;
                i && (t.inverted && i.attr({
                    width: t.plotWidth,
                    height: t.plotHeight
                }), i.animate({
                    translateX: I(o && o.left, t.plotLeft),
                    translateY: I(s && s.top, t.plotTop)
                })), this.translate(), this.render(), e && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function(t, e) {
                var i = this.xAxis,
                    o = this.yAxis,
                    s = this.chart.inverted;
                return this.searchKDTree({
                    clientX: s ? i.len - t.chartY + i.pos : t.chartX - i.pos,
                    plotY: s ? o.len - t.chartX + o.pos : t.chartY - o.pos
                }, e, t)
            },
            buildKDTree: function(t) {
                this.buildingKdTree = !0;
                var a = this,
                    e = -1 < a.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete a.kdTree, m(function() {
                    a.kdTree = function t(e, i, o) {
                        var s, r, n = e && e.length;
                        if (n) return s = a.kdAxisArray[i % o], e.sort(function(t, e) {
                            return t[s] - e[s]
                        }), {
                            point: e[r = Math.floor(n / 2)],
                            left: t(e.slice(0, r), i + 1, o),
                            right: t(e.slice(r + 1), i + 1, o)
                        }
                    }(a.getValidPoints(null, !a.directTouch), e, e), a.buildingKdTree = !1
                }, a.options.kdNow || t && "touchstart" === t.type ? 0 : 1)
            },
            searchKDTree: function(t, e, i) {
                var x = this,
                    v = this.kdAxisArray[0],
                    y = this.kdAxisArray[1],
                    b = e ? "distX" : "dist",
                    o = -1 < x.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                if (this.kdTree || this.buildingKdTree || this.buildKDTree(i), this.kdTree) return function t(e, i, o, s) {
                    var r, n, a, l, h, c, d, p, u, f = i.point,
                        g = x.kdAxisArray[o % s],
                        m = f;
                    return d = f, p = E((c = e)[v]) && E(d[v]) ? Math.pow(c[v] - d[v], 2) : null, u = (p || 0) + ((E(c[y]) && E(d[y]) ? Math.pow(c[y] - d[y], 2) : null) || 0), d.dist = E(u) ? Math.sqrt(u) : Number.MAX_VALUE, d.distX = E(p) ? Math.sqrt(p) : Number.MAX_VALUE, a = (r = e[g] - f[g]) < 0 ? "right" : "left", i[n = r < 0 ? "left" : "right"] && (m = (l = t(e, i[n], o + 1, s))[b] < m[b] ? l : f), i[a] && Math.sqrt(r * r) < m[b] && (m = (h = t(e, i[a], o + 1, s))[b] < m[b] ? h : m), m
                }(t, this.kdTree, o, o)
            },
            pointPlacementToXValue: function() {
                var t = this.options,
                    e = t.pointPlacement,
                    i = t.pointRange,
                    o = this.xAxis,
                    s = e;
                return "between" === s && (s = o.reversed ? -.5 : .5), B(s) ? s * I(i, o.pointRange) : 0
            },
            isPointInside: function(t) {
                return void 0 !== t.plotY && void 0 !== t.plotX && 0 <= t.plotY && t.plotY <= this.yAxis.len && 0 <= t.plotX && t.plotX <= this.xAxis.len
            }
        })
    }), e(t, "parts/Stacking.js", [t["parts/Axis.js"], t["parts/Globals.js"], t["parts/StackingAxis.js"], t["parts/Utilities.js"]], function(t, e, i, o) {
        var A = o.correctFloat,
            T = o.defined,
            s = o.destroyObjectProperties,
            n = o.format,
            P = o.pick,
            r = e.Chart,
            k = e.Series,
            C = (a.prototype.destroy = function() {
                s(this, this.axis)
            }, a.prototype.render = function(t) {
                var e = this.axis.chart,
                    i = this.options,
                    o = i.format,
                    s = {},
                    r = o ? n(o, this, e) : i.formatter.call(this);
                this.label ? this.label.attr({
                    text: r,
                    visibility: "hidden"
                }) : (this.label = e.renderer.label(r, null, null, i.shape, null, null, i.useHTML, !1, "stack-labels"), s = {
                    r: i.borderRadius || 0,
                    text: r,
                    rotation: i.rotation,
                    padding: P(i.padding, 5),
                    visibility: "hidden"
                }, e.styledMode || (s.fill = i.backgroundColor, s.stroke = i.borderColor, s["stroke-width"] = i.borderWidth, this.label.css(i.style)), this.label.attr(s), this.label.added || this.label.add(t)), this.label.labelrank = e.plotHeight
            }, a.prototype.setOffset = function(t, e, i, o, s) {
                var r, n, a, l, h = this,
                    c = h.axis,
                    d = c.chart,
                    p = c.translate(c.stacking.usePercentage ? 100 : o || h.total, 0, 0, 0, 1),
                    u = c.translate(i || 0),
                    f = T(p) && Math.abs(p - u),
                    g = P(s, d.xAxis[0].translate(h.x)) + t,
                    m = T(p) && h.getStackBox(d, h, g, p, e, f, c),
                    x = h.label,
                    v = h.isNegative,
                    y = "justify" === P(h.options.overflow, "justify"),
                    b = h.textAlign;
                x && m && (r = x.getBBox(), n = x.padding, a = "left" === b ? d.inverted ? -n : n : "right" === b ? r.width : d.inverted && "center" === b || !d.inverted ? r.width / 2 : v ? r.width + n : -n, l = d.inverted ? r.height / 2 : v ? -n : r.height, h.alignOptions.x = P(h.options.x, 0), h.alignOptions.y = P(h.options.y, 0), m.x -= a, m.y -= l, x.align(h.alignOptions, null, m), d.isInsidePlot(x.alignAttr.x + a - h.alignOptions.x, x.alignAttr.y + l - h.alignOptions.y) ? x.show() : y = !(x.alignAttr.y = -9999), y && k.prototype.justifyDataLabel.call(this.axis, x, h.alignOptions, x.alignAttr, r, m), x.attr({
                    x: x.alignAttr.x,
                    y: x.alignAttr.y
                }), P(!y && h.options.crop, !0) && (d.isInsidePlot(x.x - n + x.width, x.y) && d.isInsidePlot(x.x + n, x.y) || x.hide()))
            }, a.prototype.getStackBox = function(t, e, i, o, s, r, n) {
                var a = e.axis.reversed,
                    l = t.inverted,
                    h = n.height + n.pos - (l ? t.plotLeft : t.plotTop),
                    c = e.isNegative && !a || !e.isNegative && a;
                return {
                    x: l ? c ? o - n.right : o - r + n.pos - t.plotLeft : i + t.xAxis[0].transB - t.plotLeft,
                    y: l ? n.height - i - s : c ? h - o - r : h - o,
                    width: l ? r : s,
                    height: l ? s : r
                }
            }, a);

        function a(t, e, i, o, s) {
            var r = t.chart.inverted;
            this.axis = t, this.isNegative = i, this.options = e = e || {}, this.x = o, this.total = null, this.points = {}, this.stack = s, this.leftCliff = 0, this.rightCliff = 0, this.alignOptions = {
                align: e.align || (r ? i ? "left" : "right" : "center"),
                verticalAlign: e.verticalAlign || (r ? "middle" : i ? "bottom" : "top"),
                y: e.y,
                x: e.x
            }, this.textAlign = e.textAlign || (r ? i ? "right" : "left" : "center")
        }
        return r.prototype.getStacks = function() {
            var i = this,
                o = i.inverted;
            i.yAxis.forEach(function(t) {
                t.stacking && t.stacking.stacks && t.hasVisibleSeries && (t.stacking.oldStacks = t.stacking.stacks)
            }), i.series.forEach(function(t) {
                var e = t.xAxis && t.xAxis.options || {};
                !t.options.stacking || !0 !== t.visible && !1 !== i.options.chart.ignoreHiddenSeries || (t.stackKey = [t.type, P(t.options.stack, ""), o ? e.top : e.left, o ? e.height : e.width].join(","))
            })
        }, i.compose(t), k.prototype.setStackedPoints = function() {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var t, e, i, o, s, r, n, a, l, h = this,
                    c = h.processedXData,
                    d = h.processedYData,
                    p = [],
                    u = d.length,
                    f = h.options,
                    g = f.threshold,
                    m = P(f.startFromThreshold && g, 0),
                    x = f.stack,
                    v = f.stacking,
                    y = h.stackKey,
                    b = "-" + y,
                    k = h.negStacks,
                    M = h.yAxis,
                    w = M.stacking.stacks,
                    S = M.stacking.oldStacks;
                for (M.stacking.stacksTouched += 1, n = 0; n < u; n++) a = c[n], l = d[n], r = (t = h.getStackIndicator(t, a, h.index)).key, w[s = (e = k && l < (m ? 0 : g)) ? b : y] || (w[s] = {}), w[s][a] || (S[s] && S[s][a] ? (w[s][a] = S[s][a], w[s][a].total = null) : w[s][a] = new C(M, M.options.stackLabels, e, a, x)), i = w[s][a], null !== l ? (i.points[r] = i.points[h.index] = [P(i.cumulative, m)], T(i.cumulative) || (i.base = r), i.touched = M.stacking.stacksTouched, 0 < t.index && !1 === h.singleStacks && (i.points[r][0] = i.points[h.index + "," + a + ",0"][0])) : i.points[r] = i.points[h.index] = null, "percent" === v ? (o = e ? y : b, k && w[o] && w[o][a] ? (o = w[o][a], i.total = o.total = Math.max(o.total, i.total) + Math.abs(l) || 0) : i.total = A(i.total + (Math.abs(l) || 0))) : i.total = A(i.total + (l || 0)), i.cumulative = P(i.cumulative, m) + (l || 0), null !== l && (i.points[r].push(i.cumulative), p[n] = i.cumulative);
                "percent" === v && (M.stacking.usePercentage = !0), this.stackedYData = p, M.stacking.oldStacks = {}
            }
        }, k.prototype.modifyStacks = function() {
            var r, n = this,
                t = n.yAxis,
                e = n.stackKey,
                a = t.stacking.stacks,
                l = n.processedXData,
                h = n.options.stacking;
            n[h + "Stacker"] && [e, "-" + e].forEach(function(t) {
                for (var e, i, o, s = l.length; s--;) e = l[s], r = n.getStackIndicator(r, e, n.index, t), (o = (i = a[t] && a[t][e]) && i.points[r.key]) && n[h + "Stacker"](o, i, s)
            })
        }, k.prototype.percentStacker = function(t, e, i) {
            var o = e.total ? 100 / e.total : 0;
            t[0] = A(t[0] * o), t[1] = A(t[1] * o), this.stackedYData[i] = t[1]
        }, k.prototype.getStackIndicator = function(t, e, i, o) {
            return !T(t) || t.x !== e || o && t.key !== o ? t = {
                x: e,
                index: 0,
                key: o
            } : t.index++, t.key = [i, e, t.index].join(","), t
        }, e.StackItem = C, e.StackItem
    }), e(t, "parts/Dynamics.js", [t["parts/Globals.js"], t["parts/Point.js"], t["parts/Time.js"], t["parts/Utilities.js"]], function(x, t, f, e) {
        var n = e.addEvent,
            a = e.animate,
            l = e.createElement,
            h = e.css,
            g = e.defined,
            r = e.erase,
            v = e.error,
            y = e.extend,
            b = e.fireEvent,
            c = e.isArray,
            m = e.isNumber,
            d = e.isObject,
            k = e.isString,
            M = e.merge,
            w = e.objectEach,
            S = e.pick,
            A = e.relativeLength,
            p = e.setAnimation,
            T = e.splat,
            u = x.Axis,
            i = x.Chart,
            o = x.Series,
            P = x.seriesTypes;
        x.cleanRecursively = function(o, s) {
            var r = {};
            return w(o, function(t, e) {
                var i;
                d(o[e], !0) && !o.nodeType && s[e] ? (i = x.cleanRecursively(o[e], s[e]), Object.keys(i).length && (r[e] = i)) : !d(o[e]) && o[e] === s[e] || (r[e] = o[e])
            }), r
        }, y(i.prototype, {
            addSeries: function(t, e, i) {
                var o, s = this;
                return t && (e = S(e, !0), b(s, "addSeries", {
                    options: t
                }, function() {
                    o = s.initSeries(t), s.isDirtyLegend = !0, s.linkSeries(), o.enabledDataSorting && o.setData(t.data, !1), b(s, "afterAddSeries", {
                        series: o
                    }), e && s.redraw(i)
                })), o
            },
            addAxis: function(t, e, i, o) {
                return this.createAxis(e ? "xAxis" : "yAxis", {
                    axis: t,
                    redraw: i,
                    animation: o
                })
            },
            addColorAxis: function(t, e, i) {
                return this.createAxis("colorAxis", {
                    axis: t,
                    redraw: e,
                    animation: i
                })
            },
            createAxis: function(t, e) {
                var i = this.options,
                    o = "colorAxis" === t,
                    s = e.axis,
                    r = e.redraw,
                    n = e.animation,
                    a = M(s, {
                        index: this[t].length,
                        isX: "xAxis" === t
                    }),
                    l = o ? new x.ColorAxis(this, a) : new u(this, a);
                return i[t] = T(i[t] || {}), i[t].push(a), o && (this.isDirtyLegend = !0, this.axes.forEach(function(t) {
                    t.series = []
                }), this.series.forEach(function(t) {
                    t.bindAxes(), t.isDirtyData = !0
                })), S(r, !0) && this.redraw(n), l
            },
            showLoading: function(t) {
                function e() {
                    s && h(s, {
                        left: i.plotLeft + "px",
                        top: i.plotTop + "px",
                        width: i.plotWidth + "px",
                        height: i.plotHeight + "px"
                    })
                }
                var i = this,
                    o = i.options,
                    s = i.loadingDiv,
                    r = o.loading;
                s || (i.loadingDiv = s = l("div", {
                    className: "highcharts-loading highcharts-loading-hidden"
                }, null, i.container), i.loadingSpan = l("span", {
                    className: "highcharts-loading-inner"
                }, null, s), n(i, "redraw", e)), s.className = "highcharts-loading", i.loadingSpan.innerHTML = S(t, o.lang.loading, ""), i.styledMode || (h(s, y(r.style, {
                    zIndex: 10
                })), h(i.loadingSpan, r.labelStyle), i.loadingShown || (h(s, {
                    opacity: 0,
                    display: ""
                }), a(s, {
                    opacity: r.style.opacity || .5
                }, {
                    duration: r.showDuration || 0
                }))), i.loadingShown = !0, e()
            },
            hideLoading: function() {
                var t = this.options,
                    e = this.loadingDiv;
                e && (e.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || a(e, {
                    opacity: 0
                }, {
                    duration: t.loading.hideDuration || 100,
                    complete: function() {
                        h(e, {
                            display: "none"
                        })
                    }
                })), this.loadingShown = !1
            },
            propsRequireDirtyBox: ["backgroundColor", "borderColor", "borderWidth", "borderRadius", "plotBackgroundColor", "plotBackgroundImage", "plotBorderColor", "plotBorderWidth", "plotShadow", "shadow"],
            propsRequireReflow: ["margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "spacing", "spacingTop", "spacingRight", "spacingBottom", "spacingLeft"],
            propsRequireUpdateSeries: ["chart.inverted", "chart.polar", "chart.ignoreHiddenSeries", "chart.type", "colors", "plotOptions", "time", "tooltip"],
            collectionsWithUpdate: ["xAxis", "yAxis", "zAxis", "series"],
            update: function(t, e, r, i) {
                var o, s, n, a, l, h, c = this,
                    d = {
                        credits: "addCredits",
                        title: "setTitle",
                        subtitle: "setSubtitle",
                        caption: "setCaption"
                    },
                    p = t.isResponsiveOptions,
                    u = [];
                b(c, "update", {
                    options: t
                }), p || c.setResponsive(!1, !0), t = x.cleanRecursively(t, c.options), M(!0, c.userOptions, t), (o = t.chart) && (M(!0, c.options.chart, o), "className" in o && c.setClassName(o.className), "reflow" in o && c.setReflow(o.reflow), ("inverted" in o || "polar" in o || "type" in o) && (c.propFromSeries(), s = !0), "alignTicks" in o && (s = !0), w(o, function(t, e) {
                    -1 !== c.propsRequireUpdateSeries.indexOf("chart." + e) && (n = !0), -1 !== c.propsRequireDirtyBox.indexOf(e) && (c.isDirtyBox = !0), p || -1 === c.propsRequireReflow.indexOf(e) || (h = !0)
                }), !c.styledMode && "style" in o && c.renderer.setStyle(o.style)), !c.styledMode && t.colors && (this.options.colors = t.colors), t.plotOptions && M(!0, this.options.plotOptions, t.plotOptions), t.time && this.time === x.time && (this.time = new f(t.time)), w(t, function(t, e) {
                    c[e] && "function" == typeof c[e].update ? c[e].update(t, !1) : "function" == typeof c[d[e]] && c[d[e]](t), "chart" !== e && -1 !== c.propsRequireUpdateSeries.indexOf(e) && (n = !0)
                }), this.collectionsWithUpdate.forEach(function(o) {
                    var s;
                    t[o] && ("series" === o && (s = [], c[o].forEach(function(t, e) {
                        t.options.isInternal || s.push(S(t.options.index, e))
                    })), T(t[o]).forEach(function(t, e) {
                        var i = g(t.id) && c.get(t.id) || c[o][s ? s[e] : e];
                        i && i.coll === o && (i.update(t, !1), r && (i.touched = !0)), !i && r && c.collectionsWithInit[o] && (c.collectionsWithInit[o][0].apply(c, [t].concat(c.collectionsWithInit[o][1] || []).concat([!1])).touched = !0)
                    }), r && c[o].forEach(function(t) {
                        t.touched || t.options.isInternal ? delete t.touched : u.push(t)
                    }))
                }), u.forEach(function(t) {
                    t.remove && t.remove(!1)
                }), s && c.axes.forEach(function(t) {
                    t.update({}, !1)
                }), n && c.getSeriesOrderByLinks().forEach(function(t) {
                    t.chart && t.update({}, !1)
                }, this), t.loading && M(!0, c.options.loading, t.loading), a = o && o.width, l = o && o.height, k(l) && (l = A(l, a || c.chartWidth)), h || m(a) && a !== c.chartWidth || m(l) && l !== c.chartHeight ? c.setSize(a, l, i) : S(e, !0) && c.redraw(i), b(c, "afterUpdate", {
                    options: t,
                    redraw: e,
                    animation: i
                })
            },
            setSubtitle: function(t, e) {
                this.applyDescription("subtitle", t), this.layOutTitles(e)
            },
            setCaption: function(t, e) {
                this.applyDescription("caption", t), this.layOutTitles(e)
            }
        }), i.prototype.collectionsWithInit = {
            xAxis: [i.prototype.addAxis, [!0]],
            yAxis: [i.prototype.addAxis, [!1]],
            series: [i.prototype.addSeries]
        }, y(t.prototype, {
            update: function(i, o, s, t) {
                var r, n = this,
                    a = n.series,
                    l = n.graphic,
                    h = a.chart,
                    c = a.options;

                function e() {
                    n.applyOptions(i);
                    var t = l && n.hasDummyGraphic,
                        e = null === n.y ? !t : t;
                    l && e && (n.graphic = l.destroy(), delete n.hasDummyGraphic), d(i, !0) && (l && l.element && i && i.marker && void 0 !== i.marker.symbol && (n.graphic = l.destroy()), i && i.dataLabels && n.dataLabel && (n.dataLabel = n.dataLabel.destroy()), n.connector && (n.connector = n.connector.destroy())), r = n.index, a.updateParallelArrays(n, r), c.data[r] = d(c.data[r], !0) || d(i, !0) ? n.options : S(i, c.data[r]), a.isDirty = a.isDirtyData = !0, !a.fixedBox && a.hasCartesianSeries && (h.isDirtyBox = !0), "point" === c.legendType && (h.isDirtyLegend = !0), o && h.redraw(s)
                }
                o = S(o, !0), !1 === t ? e() : n.firePointEvent("update", {
                    options: i
                }, e)
            },
            remove: function(t, e) {
                this.series.removePoint(this.series.data.indexOf(this), t, e)
            }
        }), y(o.prototype, {
            addPoint: function(t, e, i, o, s) {
                var r, n, a, l, h = this,
                    c = h.options,
                    d = h.data,
                    p = h.chart,
                    u = h.xAxis,
                    f = u && u.hasNames && u.names,
                    g = c.data,
                    m = h.xData;
                if (e = S(e, !0), r = {
                        series: h
                    }, h.pointClass.prototype.applyOptions.apply(r, [t]), l = r.x, a = m.length, h.requireSorting && l < m[a - 1])
                    for (n = !0; a && m[a - 1] > l;) a--;
                h.updateParallelArrays(r, "splice", a, 0, 0), h.updateParallelArrays(r, a), f && r.name && (f[l] = r.name), g.splice(a, 0, t), n && (h.data.splice(a, 0, null), h.processData()), "point" === c.legendType && h.generatePoints(), i && (d[0] && d[0].remove ? d[0].remove(!1) : (d.shift(), h.updateParallelArrays(r, "shift"), g.shift())), !1 !== s && b(h, "addPoint", {
                    point: r
                }), h.isDirty = !0, h.isDirtyData = !0, e && p.redraw(o)
            },
            removePoint: function(t, e, i) {
                function o() {
                    a && a.length === r.length && a.splice(t, 1), r.splice(t, 1), s.options.data.splice(t, 1), s.updateParallelArrays(n || {
                        series: s
                    }, "splice", t, 1), n && n.destroy(), s.isDirty = !0, s.isDirtyData = !0, e && l.redraw()
                }
                var s = this,
                    r = s.data,
                    n = r[t],
                    a = s.points,
                    l = s.chart;
                p(i, l), e = S(e, !0), n ? n.firePointEvent("remove", null, o) : o()
            },
            remove: function(t, e, i, o) {
                var s = this,
                    r = s.chart;

                function n() {
                    s.destroy(o), s.remove = null, r.isDirtyLegend = r.isDirtyBox = !0, r.linkSeries(), S(t, !0) && r.redraw(e)
                }!1 !== i ? b(s, "remove", null, n) : n()
            },
            update: function(e, t) {
                e = x.cleanRecursively(e, this.userOptions), b(this, "update", {
                    options: e
                });
                var i, o, s, r, n = this,
                    a = n.chart,
                    l = n.userOptions,
                    h = n.initialType || n.type,
                    c = e.type || l.type || a.options.chart.type,
                    d = !(this.hasDerivedData || e.dataGrouping || c && c !== this.type || void 0 !== e.pointStart || e.pointInterval || e.pointIntervalUnit || e.keys),
                    p = P[h].prototype,
                    u = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"],
                    f = ["eventOptions", "navigatorSeries", "baseSeries"],
                    g = n.finishedAnimating && {
                        animation: !1
                    },
                    m = {};
                for (i in d && (f.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== e.visible && f.push("area", "graph"), n.parallelArrays.forEach(function(t) {
                        f.push(t + "Data")
                    }), e.data && (e.dataSorting && y(n.options.dataSorting, e.dataSorting), this.setData(e.data, !1))), e = M(l, g, {
                        index: void 0 === l.index ? n.index : l.index,
                        pointStart: S(l.pointStart, n.xData[0])
                    }, !d && {
                        data: n.options.data
                    }, e), d && e.data && (e.data = n.options.data), (f = u.concat(f)).forEach(function(t) {
                        f[t] = n[t], delete n[t]
                    }), n.remove(!1, null, !1, !0), p) n[i] = void 0;
                P[c || h] ? y(n, P[c || h].prototype) : v(17, !0, a, {
                    missingModuleFor: c || h
                }), f.forEach(function(t) {
                    n[t] = f[t]
                }), n.init(a, e), d && this.points && (!1 === (r = n.options).visible ? (m.graphic = 1, m.dataLabel = 1) : n._hasPointLabels || (o = r.marker, s = r.dataLabels, o && (!1 === o.enabled || "symbol" in o) && (m.graphic = 1), s && !1 === s.enabled && (m.dataLabel = 1)), this.points.forEach(function(t) {
                    t && t.series && (t.resolveColor(), Object.keys(m).length && t.destroyElements(m), !1 === r.showInLegend && t.legendItem && a.legend.destroyItem(t))
                }, this)), e.zIndex !== l.zIndex && u.forEach(function(t) {
                    n[t] && n[t].attr({
                        zIndex: e.zIndex
                    })
                }), n.initialType = h, a.linkSeries(), b(this, "afterUpdate"), S(t, !0) && a.redraw(d && void 0)
            },
            setName: function(t) {
                this.name = this.options.name = this.userOptions.name = t, this.chart.isDirtyLegend = !0
            }
        }), y(u.prototype, {
            update: function(t, e) {
                var i = this.chart,
                    o = t && t.events || {};
                t = M(this.userOptions, t), i.options[this.coll].indexOf && (i.options[this.coll][i.options[this.coll].indexOf(this.userOptions)] = t), w(i.options[this.coll].events, function(t, e) {
                    void 0 === o[e] && (o[e] = void 0)
                }), this.destroy(!0), this.init(i, y(t, {
                    events: o
                })), i.isDirtyBox = !0, S(e, !0) && i.redraw()
            },
            remove: function(t) {
                for (var e = this.chart, i = this.coll, o = this.series, s = o.length; s--;) o[s] && o[s].remove(!1);
                r(e.axes, this), r(e[i], this), c(e.options[i]) ? e.options[i].splice(this.options.index, 1) : delete e.options[i], e[i].forEach(function(t, e) {
                    t.options.index = t.userOptions.index = e
                }), this.destroy(), e.isDirtyBox = !0, S(t, !0) && e.redraw()
            },
            setTitle: function(t, e) {
                this.update({
                    title: t
                }, e)
            },
            setCategories: function(t, e) {
                this.update({
                    categories: t
                }, e)
            }
        })
    }), e(t, "parts/AreaSeries.js", [t["parts/Globals.js"], t["parts/Color.js"], t["mixins/legend-symbol.js"], t["parts/Utilities.js"]], function(t, e, i, o) {
        var l = e.parse,
            r = o.objectEach,
            M = o.pick,
            s = o.seriesType,
            w = t.Series;
        s("area", "line", {
            softThreshold: !1,
            threshold: 0
        }, {
            singleStacks: !1,
            getStackPoints: function(t) {
                var h, c, e = [],
                    d = [],
                    i = this.xAxis,
                    o = this.yAxis,
                    p = o.stacking.stacks[this.stackKey],
                    u = {},
                    f = this.index,
                    s = o.series,
                    g = s.length,
                    m = M(o.options.reversedStacks, !0) ? 1 : -1;
                if (t = t || this.points, this.options.stacking) {
                    for (c = 0; c < t.length; c++) t[c].leftNull = t[c].rightNull = void 0, u[t[c].x] = t[c];
                    r(p, function(t, e) {
                        null !== t.total && d.push(e)
                    }), d.sort(function(t, e) {
                        return t - e
                    }), h = s.map(function(t) {
                        return t.visible
                    }), d.forEach(function(r, n) {
                        var a, l, t = 0;
                        if (u[r] && !u[r].isNull) e.push(u[r]), [-1, 1].forEach(function(t) {
                            var e = 1 === t ? "rightNull" : "leftNull",
                                i = 1 === t ? "rightCliff" : "leftCliff",
                                o = 0,
                                s = p[d[n + t]];
                            if (s)
                                for (c = f; 0 <= c && c < g;)(a = s.points[c]) || (c === f ? u[r][e] = !0 : h[c] && (l = p[r].points[c]) && (o -= l[1] - l[0])), c += m;
                            u[r][i] = o
                        });
                        else {
                            for (c = f; 0 <= c && c < g;) {
                                if (a = p[r].points[c]) {
                                    t = a[1];
                                    break
                                }
                                c += m
                            }
                            t = o.translate(t, 0, 1, 0, 1), e.push({
                                isNull: !0,
                                plotX: i.translate(r, 0, 0, 0, 1),
                                x: r,
                                plotY: t,
                                yBottom: t
                            })
                        }
                    })
                }
                return e
            },
            getGraphPath: function(c) {
                function t(t, e, i) {
                    var o, s, r = c[t],
                        n = p && x[r.x].points[m],
                        a = r[i + "Null"] || 0,
                        l = r[i + "Cliff"] || 0,
                        h = !0;
                    l || a ? (o = (a ? n[0] : n[1]) + l, s = n[0] + l, h = !!a) : !p && c[e] && c[e].isNull && (o = s = v), void 0 !== o && (g.push({
                        plotX: d,
                        plotY: null === o ? y : u.getThreshold(o),
                        isNull: h,
                        isCliff: !0
                    }), f.push({
                        plotX: d,
                        plotY: null === s ? y : u.getThreshold(s),
                        doCurve: !1
                    }))
                }
                var e, i, o, s, r, d, n, a, l = w.prototype.getGraphPath,
                    h = this.options,
                    p = h.stacking,
                    u = this.yAxis,
                    f = [],
                    g = [],
                    m = this.index,
                    x = u.stacking.stacks[this.stackKey],
                    v = h.threshold,
                    y = Math.round(u.getThreshold(h.threshold)),
                    b = M(h.connectNulls, "percent" === p);
                for (c = c || this.points, p && (c = this.getStackPoints(c)), s = 0; s < c.length; s++) p || (c[s].leftCliff = c[s].rightCliff = c[s].leftNull = c[s].rightNull = void 0), n = c[s].isNull, d = M(c[s].rectPlotX, c[s].plotX), a = M(c[s].yBottom, y), n && !b || (b || t(s, s - 1, "left"), n && !p && b || (g.push(c[s]), f.push({
                    x: s,
                    plotX: d,
                    plotY: a
                })), b || t(s, s + 1, "right"));
                i = l.call(this, g, !0, !0), f.reversed = !0;
                var k = (o = l.call(this, f, !0, !0))[0];
                return k && "M" === k[0] && (o[0] = ["L", k[1], k[2]]), r = i.concat(o), e = l.call(this, g, !1, b), r.xMap = i.xMap, this.areaPath = r, e
            },
            drawGraph: function() {
                this.areaPath = [], w.prototype.drawGraph.apply(this);
                var r = this,
                    n = this.areaPath,
                    a = this.options,
                    t = this.zones,
                    i = [
                        ["area", "highcharts-area", this.color, a.fillColor]
                    ];
                t.forEach(function(t, e) {
                    i.push(["zone-area-" + e, "highcharts-area highcharts-zone-area-" + e + " " + t.className, t.color || r.color, t.fillColor || a.fillColor])
                }), i.forEach(function(t) {
                    var e = t[0],
                        i = r[e],
                        o = i ? "animate" : "attr",
                        s = {};
                    i ? (i.endX = r.preventGraphAnimation ? null : n.xMap, i.animate({
                        d: n
                    })) : (s.zIndex = 0, (i = r[e] = r.chart.renderer.path(n).addClass(t[1]).add(r.group)).isArea = !0), r.chart.styledMode || (s.fill = M(t[3], l(t[2]).setOpacity(M(a.fillOpacity, .75)).get())), i[o](s), i.startX = n.xMap, i.shiftUnit = a.step ? 2 : 1
                })
            },
            drawLegendSymbol: i.drawRectangle
        })
    }), e(t, "parts/SplineSeries.js", [t["parts/Utilities.js"]], function(t) {
        var v = t.pick;
        (0, t.seriesType)("spline", "line", {}, {
            getPointSpline: function(t, e, i) {
                var o, s, r, n, a, l, h, c, d, p, u = e.plotX || 0,
                    f = e.plotY || 0,
                    g = t[i - 1],
                    m = t[i + 1];

                function x(t) {
                    return t && !t.isNull && !1 !== t.doCurve && !e.isCliff
                }
                return x(g) && x(m) && (s = g.plotX || 0, r = g.plotY || 0, n = m.plotX || 0, l = 0, c = (1.5 * f + r) / 2.5, p = (1.5 * f + (a = m.plotY || 0)) / 2.5, (d = (1.5 * u + n) / 2.5) !== (h = (1.5 * u + s) / 2.5) && (l = (p - c) * (d - u) / (d - h) + f - p), p += l, r < (c += l) && f < c ? p = 2 * f - (c = Math.max(r, f)) : c < r && c < f && (p = 2 * f - (c = Math.min(r, f))), a < p && f < p ? c = 2 * f - (p = Math.max(a, f)) : p < a && p < f && (c = 2 * f - (p = Math.min(a, f))), e.rightContX = d, e.rightContY = p), o = ["C", v(g.rightContX, g.plotX, 0), v(g.rightContY, g.plotY, 0), v(h, u, 0), v(c, f, 0), u, f], g.rightContX = g.rightContY = void 0, o
            }
        })
    }), e(t, "parts/AreaSplineSeries.js", [t["parts/Globals.js"], t["mixins/legend-symbol.js"], t["parts/Utilities.js"]], function(t, e, i) {
        var o = i.seriesType,
            s = t.seriesTypes.area.prototype;
        o("areaspline", "spline", t.defaultPlotOptions.area, {
            getStackPoints: s.getStackPoints,
            getGraphPath: s.getGraphPath,
            drawGraph: s.drawGraph,
            drawLegendSymbol: e.drawRectangle
        })
    }), e(t, "parts/ColumnSeries.js", [t["parts/Globals.js"], t["parts/Color.js"], t["mixins/legend-symbol.js"], t["parts/Utilities.js"]], function(t, e, i, o) {
        var g = e.parse,
            h = o.animObject,
            w = o.clamp,
            S = o.defined,
            c = o.extend,
            A = o.isNumber,
            m = o.merge,
            T = o.pick,
            s = o.seriesType,
            r = t.noop,
            n = t.Series;
        t.svg;
        s("column", "line", {
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    halo: !1,
                    brightness: .1
                },
                select: {
                    color: "#cccccc",
                    borderColor: "#000000"
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                n.prototype.init.apply(this, arguments);
                var e = this,
                    t = e.chart;
                t.hasRendered && t.series.forEach(function(t) {
                    t.type === e.type && (t.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var s, r = this,
                    t = r.options,
                    e = r.xAxis,
                    n = r.yAxis,
                    i = e.options.reversedStacks,
                    o = e.reversed && !i || !e.reversed && i,
                    a = {},
                    l = 0;
                !1 === t.grouping ? l = 1 : r.chart.series.forEach(function(t) {
                    var e, i = t.yAxis,
                        o = t.options;
                    t.type !== r.type || !t.visible && r.chart.options.chart.ignoreHiddenSeries || n.len !== i.len || n.pos !== i.pos || (o.stacking ? (s = t.stackKey, void 0 === a[s] && (a[s] = l++), e = a[s]) : !1 !== o.grouping && (e = l++), t.columnIndex = e)
                });
                var h = Math.min(Math.abs(e.transA) * (e.ordinal && e.ordinal.slope || t.pointRange || e.closestPointRange || e.tickInterval || 1), e.len),
                    c = h * t.groupPadding,
                    d = (h - 2 * c) / (l || 1),
                    p = Math.min(t.maxPointWidth || e.len, T(t.pointWidth, d * (1 - 2 * t.pointPadding))),
                    u = (d - p) / 2 + (c + ((r.columnIndex || 0) + (o ? 1 : 0)) * d - h / 2) * (o ? -1 : 1);
                return r.columnMetrics = {
                    width: p,
                    offset: u
                }, r.columnMetrics
            },
            crispCol: function(t, e, i, o) {
                var s, r, n = this.chart,
                    a = this.borderWidth,
                    l = -(a % 2 ? .5 : 0),
                    h = a % 2 ? .5 : 1;
                return n.inverted && n.renderer.isVML && (h += 1), this.options.crisp && (i = Math.round(t + i) + l - (t = Math.round(t) + l)), s = Math.round(e + o) + h, r = Math.abs(e) <= .5 && .5 < s, o = s - (e = Math.round(e) + h), r && o && (--e, o += 1), {
                    x: t,
                    y: e,
                    width: i,
                    height: o
                }
            },
            translate: function() {
                var d = this,
                    p = d.chart,
                    t = d.options,
                    e = d.dense = d.closestPointRange * d.xAxis.transA < 2,
                    i = d.borderWidth = T(t.borderWidth, e ? 0 : 1),
                    u = d.xAxis,
                    f = d.yAxis,
                    g = t.threshold,
                    m = d.translatedThreshold = f.getThreshold(g),
                    x = T(t.minPointLength, 5),
                    o = d.getColumnMetrics(),
                    v = o.width,
                    y = d.barW = Math.max(v, 1 + 2 * i),
                    b = d.pointXOffset = o.offset,
                    k = d.dataMin,
                    M = d.dataMax;
                p.inverted && (m -= .5), t.pointPadding && (y = Math.ceil(y)), n.prototype.translate.apply(d), d.points.forEach(function(t) {
                    var e, i = T(t.yBottom, m),
                        o = 999 + Math.abs(i),
                        s = v,
                        r = t.plotX,
                        n = w(t.plotY, -o, f.len + o),
                        a = t.plotX + b,
                        l = y,
                        h = Math.min(n, i),
                        c = Math.max(n, i) - h;
                    x && Math.abs(c) < x && (c = x, e = !f.reversed && !t.negative || f.reversed && t.negative, A(g) && A(M) && t.y === g && M <= g && (f.min || 0) < g && k !== M && (e = !e), h = Math.abs(h - m) > x ? i - x : m - (e ? x : 0)), S(t.options.pointWidth) && (s = l = Math.ceil(t.options.pointWidth), a -= Math.round((s - v) / 2)), t.barX = a, t.pointWidth = s, t.tooltipPos = p.inverted ? [f.len + f.pos - p.plotLeft - n, u.len + u.pos - p.plotTop - (r || 0) - b - l / 2, c] : [a + l / 2, n + f.pos - p.plotTop, c], t.shapeType = d.pointClass.prototype.shapeType || "rect", t.shapeArgs = d.crispCol.apply(d, t.isNull ? [a, m, l, 0] : [a, h, l, c])
                })
            },
            getSymbol: r,
            drawLegendSymbol: i.drawRectangle,
            drawGraph: function() {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function(t, e) {
                var i, o, s, r, n = this.options,
                    a = this.pointAttrToOptions || {},
                    l = a.stroke || "borderColor",
                    h = a["stroke-width"] || "borderWidth",
                    c = t && t.color || this.color,
                    d = t && t[l] || n[l] || this.color || c,
                    p = t && t[h] || n[h] || this[h] || 0,
                    u = t && t.options.dashStyle || n.dashStyle,
                    f = T(t && t.opacity, n.opacity, 1);
                return t && this.zones.length && (s = t.getZone(), c = t.options.color || s && (s.color || t.nonZonedColor) || this.color, s && (d = s.borderColor || d, u = s.dashStyle || u, p = s.borderWidth || p)), e && t && (r = (i = m(n.states[e], t.options.states && t.options.states[e] || {})).brightness, c = i.color || void 0 !== r && g(c).brighten(i.brightness).get() || c, d = i[l] || d, p = i[h] || p, u = i.dashStyle || u, f = T(i.opacity, f)), o = {
                    fill: c,
                    stroke: d,
                    "stroke-width": p,
                    opacity: f
                }, u && (o.dashstyle = u), o
            },
            drawPoints: function() {
                var r, n = this,
                    a = this.chart,
                    l = n.options,
                    h = a.renderer,
                    c = l.animationLimit || 250;
                n.points.forEach(function(t) {
                    var e = t.plotY,
                        i = t.graphic,
                        o = !!i,
                        s = i && a.pointCount < c ? "animate" : "attr";
                    A(e) && null !== t.y ? (r = t.shapeArgs, i && t.hasNewShapeType() && (i = i.destroy()), n.enabledDataSorting && (t.startXPos = n.xAxis.reversed ? -(r ? r.width : 0) : n.xAxis.width), i || (t.graphic = i = h[t.shapeType](r).add(t.group || n.group), i && n.enabledDataSorting && a.hasRendered && a.pointCount < c && (i.attr({
                        x: t.startXPos
                    }), o = !0, s = "animate")), i && o && i[s](m(r)), l.borderRadius && i[s]({
                        r: l.borderRadius
                    }), a.styledMode || i[s](n.pointAttribs(t, t.selected && "select")).shadow(!1 !== t.allowShadow && l.shadow, null, l.stacking && !l.borderRadius), i.addClass(t.getClassName(), !0)) : i && (t.graphic = i.destroy())
                })
            },
            animate: function(t) {
                var i, e, o = this,
                    s = this.yAxis,
                    r = o.options,
                    n = this.chart.inverted,
                    a = {},
                    l = n ? "translateX" : "translateY";
                t ? (a.scaleY = .001, e = w(s.toPixels(r.threshold), s.pos, s.pos + s.len), n ? a.translateX = e - s.len : a.translateY = e, o.clipBox && o.setClip(), o.group.attr(a)) : (i = o.group.attr(l), o.group.animate({
                    scaleY: 1
                }, c(h(o.options.animation), {
                    step: function(t, e) {
                        o.group && (a[l] = i + e.pos * (s.pos - i), o.group.attr(a))
                    }
                })))
            },
            remove: function() {
                var e = this,
                    t = e.chart;
                t.hasRendered && t.series.forEach(function(t) {
                    t.type === e.type && (t.isDirty = !0)
                }), n.prototype.remove.apply(e, arguments)
            }
        })
    }), e(t, "parts/BarSeries.js", [t["parts/Utilities.js"]], function(t) {
        (0, t.seriesType)("bar", "column", null, {
            inverted: !0
        })
    }), e(t, "parts/ScatterSeries.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var i = e.addEvent,
            o = e.seriesType,
            s = t.Series;
        o("scatter", "line", {
            lineWidth: 0,
            findNearestPointBy: "xy",
            jitter: {
                x: 0,
                y: 0
            },
            marker: {
                enabled: !0
            },
            tooltip: {
                headerFormat: '<span style="color:{point.color}">●</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function() {
                this.options.lineWidth && s.prototype.drawGraph.call(this)
            },
            applyJitter: function() {
                var d = this,
                    p = this.options.jitter,
                    u = this.points.length;
                p && this.points.forEach(function(h, c) {
                    ["x", "y"].forEach(function(t, e) {
                        var i, o, s, r, n, a, l = "plot" + t.toUpperCase();
                        p[t] && !h.isNull && (i = d[t + "Axis"], r = p[t] * i.transA, i && !i.isLog && (o = Math.max(0, h[l] - r), s = Math.min(i.len, h[l] + r), h[l] = o + (s - o) * (n = c + e * u, (a = 1e4 * Math.sin(n)) - Math.floor(a)), "x" === t && (h.clientX = h.plotX)))
                    })
                })
            }
        }), i(s, "afterTranslate", function() {
            this.applyJitter && this.applyJitter()
        })
    }), e(t, "mixins/centered-series.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var s = e.isNumber,
            u = e.pick,
            f = e.relativeLength,
            r = t.deg2rad;
        t.CenteredSeriesMixin = {
            getCenter: function() {
                var t, e, i, o, s = this.options,
                    r = this.chart,
                    n = 2 * (s.slicedOffset || 0),
                    a = r.plotWidth - 2 * n,
                    l = r.plotHeight - 2 * n,
                    h = s.center,
                    c = Math.min(a, l),
                    d = s.size,
                    p = s.innerSize || 0;
                for ("string" == typeof d && (d = parseFloat(d)), "string" == typeof p && (p = parseFloat(p)), e = [u(h[0], "50%"), u(h[1], "50%"), u(d && d < 0 ? void 0 : s.size, "100%"), u(p && p < 0 ? void 0 : s.innerSize || 0, "0%")], r.angular && (e[3] = 0), i = 0; i < 4; ++i) o = e[i], t = i < 2 || 2 === i && /%$/.test(o), e[i] = f(o, [a, l, c, e[2]][i]) + (t ? n : 0);
                return e[3] > e[2] && (e[3] = e[2]), e
            },
            getStartAndEndRadians: function(t, e) {
                var i = s(t) ? t : 0,
                    o = s(e) && i < e && e - i < 360 ? e : i + 360;
                return {
                    start: r * (i + -90),
                    end: r * (o + -90)
                }
            }
        }
    }), e(t, "parts/PieSeries.js", [t["parts/Globals.js"], t["mixins/legend-symbol.js"], t["parts/Point.js"], t["parts/Utilities.js"]], function(t, e, i, o) {
        var s = o.addEvent,
            n = o.clamp,
            a = o.defined,
            b = o.fireEvent,
            r = o.isNumber,
            d = o.merge,
            k = o.pick,
            M = o.relativeLength,
            l = o.seriesType,
            h = o.setAnimation,
            c = t.CenteredSeriesMixin,
            w = c.getStartAndEndRadians,
            p = t.noop,
            u = t.Series;
        l("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0,
                connectorPadding: 5,
                connectorShape: "fixedOffset",
                crookDistance: "70%",
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.isNull ? void 0 : this.point.name
                },
                softConnector: !0,
                x: 0
            },
            fillColor: void 0,
            ignoreHiddenPoint: !0,
            inactiveOtherPoints: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            },
            borderColor: "#ffffff",
            borderWidth: 1,
            lineWidth: void 0,
            states: {
                hover: {
                    brightness: .1
                }
            }
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: t.seriesTypes.column.prototype.pointAttribs,
            animate: function(t) {
                var o = this,
                    e = o.points,
                    s = o.startAngleRad;
                t || e.forEach(function(t) {
                    var e = t.graphic,
                        i = t.shapeArgs;
                    e && i && (e.attr({
                        r: k(t.startR, o.center && o.center[3] / 2),
                        start: s,
                        end: s
                    }), e.animate({
                        r: i.r,
                        start: i.start,
                        end: i.end
                    }, o.options.animation))
                })
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            updateTotals: function() {
                for (var t, e = 0, i = this.points, o = i.length, s = this.options.ignoreHiddenPoint, r = 0; r < o; r++) t = i[r], e += s && !t.visible || t.isNull ? 0 : t.y;
                for (this.total = e, r = 0; r < o; r++)(t = i[r]).percentage = 0 < e && (t.visible || !s) ? t.y / e * 100 : 0, t.total = e
            },
            generatePoints: function() {
                u.prototype.generatePoints.call(this), this.updateTotals()
            },
            getX: function(t, e, i) {
                var o = this.center,
                    s = this.radii ? this.radii[i.index] : o[2] / 2,
                    r = Math.asin(n((t - o[1]) / (s + i.labelDistance), -1, 1));
                return o[0] + (e ? -1 : 1) * (Math.cos(r) * (s + i.labelDistance)) + (0 < i.labelDistance ? (e ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function(t) {
                this.generatePoints();
                var e, i, o, s, r, n, a, l, h = 0,
                    c = this.options,
                    d = c.slicedOffset,
                    p = d + (c.borderWidth || 0),
                    u = w(c.startAngle, c.endAngle),
                    f = this.startAngleRad = u.start,
                    g = (this.endAngleRad = u.end) - f,
                    m = this.points,
                    x = c.dataLabels.distance,
                    v = c.ignoreHiddenPoint,
                    y = m.length;
                for (t || (this.center = t = this.getCenter()), a = 0; a < y; a++) l = m[a], i = f + h * g, v && !l.visible || (h += l.percentage / 100), o = f + h * g, l.shapeType = "arc", l.shapeArgs = {
                    x: t[0],
                    y: t[1],
                    r: t[2] / 2,
                    innerR: t[3] / 2,
                    start: Math.round(1e3 * i) / 1e3,
                    end: Math.round(1e3 * o) / 1e3
                }, l.labelDistance = k(l.options.dataLabels && l.options.dataLabels.distance, x), l.labelDistance = M(l.labelDistance, l.shapeArgs.r), this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, l.labelDistance), (s = (o + i) / 2) > 1.5 * Math.PI ? s -= 2 * Math.PI : s < -Math.PI / 2 && (s += 2 * Math.PI), l.slicedTranslation = {
                    translateX: Math.round(Math.cos(s) * d),
                    translateY: Math.round(Math.sin(s) * d)
                }, r = Math.cos(s) * t[2] / 2, n = Math.sin(s) * t[2] / 2, l.tooltipPos = [t[0] + .7 * r, t[1] + .7 * n], l.half = s < -Math.PI / 2 || s > Math.PI / 2 ? 1 : 0, l.angle = s, e = Math.min(p, l.labelDistance / 5), l.labelPosition = {
                    natural: {
                        x: t[0] + r + Math.cos(s) * l.labelDistance,
                        y: t[1] + n + Math.sin(s) * l.labelDistance
                    },
                    final: {},
                    alignment: l.labelDistance < 0 ? "center" : l.half ? "right" : "left",
                    connectorPosition: {
                        breakAt: {
                            x: t[0] + r + Math.cos(s) * e,
                            y: t[1] + n + Math.sin(s) * e
                        },
                        touchingSliceAt: {
                            x: t[0] + r,
                            y: t[1] + n
                        }
                    }
                };
                b(this, "afterTranslate")
            },
            drawEmpty: function() {
                var t, e, i = this.options;
                0 === this.total ? (t = this.center[0], e = this.center[1], this.graph || (this.graph = this.chart.renderer.circle(t, e, 0).addClass("highcharts-graph").add(this.group)), this.graph.animate({
                    "stroke-width": i.borderWidth,
                    cx: t,
                    cy: e,
                    r: this.center[2] / 2,
                    fill: i.fillColor || "none",
                    stroke: i.color || "#cccccc"
                }, this.options.animation)) : this.graph && (this.graph = this.graph.destroy())
            },
            redrawPoints: function() {
                var o, s, r, n, a = this,
                    l = a.chart,
                    h = l.renderer,
                    c = a.options.shadow;
                this.drawEmpty(), !c || a.shadowGroup || l.styledMode || (a.shadowGroup = h.g("shadow").attr({
                    zIndex: -1
                }).add(a.group)), a.points.forEach(function(t) {
                    var e, i = {};
                    s = t.graphic, !t.isNull && s ? (n = t.shapeArgs, o = t.getTranslate(), l.styledMode || (e = t.shadowGroup, c && !e && (e = t.shadowGroup = h.g("shadow").add(a.shadowGroup)), e && e.attr(o), r = a.pointAttribs(t, t.selected && "select")), t.delayedRendering ? (s.setRadialReference(a.center).attr(n).attr(o), l.styledMode || s.attr(r).attr({
                        "stroke-linejoin": "round"
                    }).shadow(c, e), t.delayedRendering = !1) : (s.setRadialReference(a.center), l.styledMode || d(!0, i, r), d(!0, i, n, o), s.animate(i)), s.attr({
                        visibility: t.visible ? "inherit" : "hidden"
                    }), s.addClass(t.getClassName())) : s && (t.graphic = s.destroy())
                })
            },
            drawPoints: function() {
                var e = this.chart.renderer;
                this.points.forEach(function(t) {
                    t.graphic && t.hasNewShapeType() && (t.graphic = t.graphic.destroy()), t.graphic || (t.graphic = e[t.shapeType](t.shapeArgs).add(t.series.group), t.delayedRendering = !0)
                })
            },
            searchPoint: p,
            sortByAngle: function(t, i) {
                t.sort(function(t, e) {
                    return void 0 !== t.angle && (e.angle - t.angle) * i
                })
            },
            drawLegendSymbol: e.drawRectangle,
            getCenter: c.getCenter,
            getSymbol: p,
            drawGraph: null
        }, {
            init: function() {
                i.prototype.init.apply(this, arguments);
                var t, e = this;
                return e.name = k(e.name, "Slice"), t = function(t) {
                    e.slice("select" === t.type)
                }, s(e, "select", t), s(e, "unselect", t), e
            },
            isValid: function() {
                return r(this.y) && 0 <= this.y
            },
            setVisible: function(e, t) {
                var i = this,
                    o = i.series,
                    s = o.chart,
                    r = o.options.ignoreHiddenPoint;
                t = k(t, r), e !== i.visible && (i.visible = i.options.visible = e = void 0 === e ? !i.visible : e, o.options.data[o.data.indexOf(i)] = i.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function(t) {
                    i[t] && i[t][e ? "show" : "hide"](!0)
                }), i.legendItem && s.legend.colorizeItem(i, e), e || "hover" !== i.state || i.setState(""), r && (o.isDirty = !0), t && s.redraw())
            },
            slice: function(t, e, i) {
                var o = this,
                    s = o.series,
                    r = s.chart;
                h(i, r), e = k(e, !0), o.sliced = o.options.sliced = t = a(t) ? t : !o.sliced, s.options.data[s.data.indexOf(o)] = o.options, o.graphic && o.graphic.animate(this.getTranslate()), o.shadowGroup && o.shadowGroup.animate(this.getTranslate())
            },
            getTranslate: function() {
                return this.sliced ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }
            },
            haloPath: function(t) {
                var e = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y, e.r + t, e.r + t, {
                    innerR: e.r - 1,
                    start: e.start,
                    end: e.end
                })
            },
            connectorShapes: {
                fixedOffset: function(t, e, i) {
                    var o = e.breakAt,
                        s = e.touchingSliceAt,
                        r = i.softConnector ? ["C", t.x + ("left" === t.alignment ? -5 : 5), t.y, 2 * o.x - s.x, 2 * o.y - s.y, o.x, o.y] : ["L", o.x, o.y];
                    return [
                        ["M", t.x, t.y], r, ["L", s.x, s.y]
                    ]
                },
                straight: function(t, e) {
                    var i = e.touchingSliceAt;
                    return [
                        ["M", t.x, t.y],
                        ["L", i.x, i.y]
                    ]
                },
                crookedLine: function(t, e, i) {
                    var o = e.touchingSliceAt,
                        s = this.series,
                        r = s.center[0],
                        n = s.chart.plotWidth,
                        a = s.chart.plotLeft,
                        l = t.alignment,
                        h = this.shapeArgs.r,
                        c = M(i.crookDistance, 1),
                        d = "left" === l ? r + h + (n + a - r - h) * (1 - c) : a + (r - h) * c,
                        p = ["L", d, t.y],
                        u = !0;
                    ("left" === l ? d > t.x || d < o.x : d < t.x || d > o.x) && (u = !1);
                    var f = [
                        ["M", t.x, t.y]
                    ];
                    return u && f.push(p), f.push(["L", o.x, o.y]), f
                }
            },
            getConnectorPath: function() {
                var t = this.labelPosition,
                    e = this.series.options.dataLabels,
                    i = e.connectorShape,
                    o = this.connectorShapes;
                return o[i] && (i = o[i]), i.call(this, {
                    x: t.final.x,
                    y: t.final.y,
                    alignment: t.alignment
                }, t.connectorPosition, e)
            }
        })
    }), e(t, "parts/DataLabels.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(D, t) {
        var a = t.animObject,
            r = t.arrayMax,
            p = t.clamp,
            B = t.defined,
            w = t.extend,
            l = t.fireEvent,
            S = t.format,
            h = t.isArray,
            I = t.merge,
            A = t.objectEach,
            z = t.pick,
            c = t.relativeLength,
            d = t.splat,
            u = t.stableSort,
            e = D.noop,
            R = D.Series,
            i = D.seriesTypes;
        D.distribute = function(t, i, o) {
            var s, e, r, n = !0,
                a = t,
                l = [],
                h = 0,
                c = a.reducedLen || i;

            function d(t, e) {
                return t.target - e.target
            }
            for (s = t.length; s--;) h += t[s].size;
            if (c < h) {
                for (u(t, function(t, e) {
                        return (e.rank || 0) - (t.rank || 0)
                    }), h = s = 0; h <= c;) h += t[s].size, s++;
                l = t.splice(s - 1, t.length)
            }
            for (u(t, d), t = t.map(function(t) {
                    return {
                        size: t.size,
                        targets: [t.target],
                        align: z(t.align, .5)
                    }
                }); n;) {
                for (s = t.length; s--;) e = t[s], r = (Math.min.apply(0, e.targets) + Math.max.apply(0, e.targets)) / 2, e.pos = p(r - e.size * e.align, 0, i - e.size);
                for (s = t.length, n = !1; s--;) 0 < s && t[s - 1].pos + t[s - 1].size > t[s].pos && (t[s - 1].size += t[s].size, t[s - 1].targets = t[s - 1].targets.concat(t[s].targets), t[s - 1].align = .5, t[s - 1].pos + t[s - 1].size > i && (t[s - 1].pos = i - t[s - 1].size), t.splice(s, 1), n = !0)
            }
            a.push.apply(a, l), s = 0, t.some(function(t) {
                var e = 0;
                if (t.targets.some(function() {
                        return a[s].pos = t.pos + e, void 0 !== o && Math.abs(a[s].pos - a[s].target) > o ? (a.slice(0, s + 1).forEach(function(t) {
                            delete t.pos
                        }), a.reducedLen = (a.reducedLen || i) - .1 * i, a.reducedLen > .1 * i && D.distribute(a, i, o), !0) : (e += a[s].size, void s++)
                    })) return !0
            }), u(a, d)
        }, R.prototype.drawDataLabels = function() {
            var y, b = this,
                k = b.chart,
                M = b.options,
                t = M.dataLabels,
                e = b.points,
                i = b.hasRendered || 0,
                o = a(M.animation).duration,
                s = Math.min(o, 200),
                r = !k.renderer.forExport && z(t.defer, 0 < s),
                w = k.renderer;

            function n(e, i) {
                var t, o = [];
                if (h(e) && !h(i)) o = e.map(function(t) {
                    return I(t, i)
                });
                else if (h(i) && !h(e)) o = i.map(function(t) {
                    return I(e, t)
                });
                else if (h(e) || h(i))
                    for (t = Math.max(e.length, i.length); t--;) o[t] = I(e[t], i[t]);
                else o = I(e, i);
                return o
            }
            t = n(n(k.options.plotOptions && k.options.plotOptions.series && k.options.plotOptions.series.dataLabels, k.options.plotOptions && k.options.plotOptions[b.type] && k.options.plotOptions[b.type].dataLabels), t), l(this, "drawDataLabels"), (h(t) || t.enabled || b._hasPointLabels) && (y = b.plotGroup("dataLabelsGroup", "data-labels", r && !i ? "hidden" : "inherit", t.zIndex || 6), r && (y.attr({
                opacity: +i
            }), i || setTimeout(function() {
                var t = b.dataLabelsGroup;
                t && (b.visible && y.show(!0), t[M.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: s
                }))
            }, o - s)), e.forEach(function(v) {
                d(n(t, v.dlOptions || v.options && v.options.dataLabels)).forEach(function(t, e) {
                    var i, o, s, r, n, a, l, h, c, d, p, u = t.enabled && (!v.isNull || v.dataLabelOnNull) && (l = v, !(p = t.filter) || (h = p.operator, c = l[p.property], d = p.value, ">" === h && d < c || "<" === h && c < d || ">=" === h && d <= c || "<=" === h && c <= d || "==" === h && c == d || "===" === h && c === d)),
                        f = v.dataLabels ? v.dataLabels[e] : v.dataLabel,
                        g = v.connectors ? v.connectors[e] : v.connector,
                        m = z(t.distance, v.labelDistance),
                        x = !f;
                    u && (i = v.getLabelConfig(), o = z(t[v.formatPrefix + "Format"], t.format), s = B(o) ? S(o, i, k) : (t[v.formatPrefix + "Formatter"] || t.formatter).call(i, t), r = t.style, n = t.rotation, k.styledMode || (r.color = z(t.color, r.color, b.color, "#000000"), "contrast" === r.color ? (v.contrastColor = w.getContrast(v.color || b.color), r.color = !B(m) && t.inside || m < 0 || M.stacking ? v.contrastColor : "#000000") : delete v.contrastColor, M.cursor && (r.cursor = M.cursor)), a = {
                        r: t.borderRadius || 0,
                        rotation: n,
                        padding: t.padding,
                        zIndex: 1
                    }, k.styledMode || (a.fill = t.backgroundColor, a.stroke = t.borderColor, a["stroke-width"] = t.borderWidth), A(a, function(t, e) {
                        void 0 === t && delete a[e]
                    })), !f || u && B(s) ? u && B(s) && (f ? a.text = s : (v.dataLabels = v.dataLabels || [], f = v.dataLabels[e] = n ? w.text(s, 0, -9999, t.useHTML).addClass("highcharts-data-label") : w.label(s, 0, -9999, t.shape, null, null, t.useHTML, null, "data-label"), e || (v.dataLabel = f), f.addClass(" highcharts-data-label-color-" + v.colorIndex + " " + (t.className || "") + (t.useHTML ? " highcharts-tracker" : ""))), f.options = t, f.attr(a), k.styledMode || f.css(r).shadow(t.shadow), f.added || f.add(y), t.textPath && !t.useHTML && (f.setTextPath(v.getDataLabelPath && v.getDataLabelPath(f) || v.graphic, t.textPath), v.dataLabelPath && !t.textPath.enabled && (v.dataLabelPath = v.dataLabelPath.destroy())), b.alignDataLabel(v, f, t, null, x)) : (v.dataLabel = v.dataLabel && v.dataLabel.destroy(), v.dataLabels && (1 === v.dataLabels.length ? delete v.dataLabels : delete v.dataLabels[e]), e || delete v.dataLabel, g && (v.connector = v.connector.destroy(), v.connectors && (1 === v.connectors.length ? delete v.connectors : delete v.connectors[e])))
                })
            })), l(this, "afterDrawDataLabels")
        }, R.prototype.alignDataLabel = function(e, i, t, o, s) {
            function r(t) {
                f && d.xAxis && !k && d.setDataLabelStartPos(e, i, s, b, t)
            }
            var n, a, l, h, c, d = this,
                p = this.chart,
                u = this.isCartesian && p.inverted,
                f = this.enabledDataSorting,
                g = z(e.dlBox && e.dlBox.centerX, e.plotX, -9999),
                m = z(e.plotY, -9999),
                x = i.getBBox(),
                v = t.rotation,
                y = t.align,
                b = p.isInsidePlot(g, Math.round(m), u),
                k = "justify" === z(t.overflow, f ? "none" : "justify"),
                M = this.visible && !1 !== e.visible && (e.series.forceDL || f && !k || b || t.inside && o && p.isInsidePlot(g, u ? o.x + 1 : o.y + o.height - 1, u));
            M && (n = p.renderer.fontMetrics(p.styledMode ? void 0 : t.style.fontSize, i).b, o = w({
                x: u ? this.yAxis.len - m : g,
                y: Math.round(u ? this.xAxis.len - g : m),
                width: 0,
                height: 0
            }, o), w(t, {
                width: x.width,
                height: x.height
            }), v ? (k = !1, h = p.renderer.rotCorr(n, v), r(c = {
                x: o.x + t.x + o.width / 2 + h.x,
                y: o.y + t.y + {
                    top: 0,
                    middle: .5,
                    bottom: 1
                }[t.verticalAlign] * o.height
            }), i[s ? "attr" : "animate"](c).attr({
                align: y
            }), l = 180 < (a = (v + 720) % 360) && a < 360, "left" === y ? c.y -= l ? x.height : 0 : "center" === y ? (c.x -= x.width / 2, c.y -= x.height / 2) : "right" === y && (c.x -= x.width, c.y -= l ? 0 : x.height), i.placed = !0, i.alignAttr = c) : (r(o), i.align(t, null, o), c = i.alignAttr), k && 0 <= o.height ? this.justifyDataLabel(i, t, c, x, o, s) : z(t.crop, !0) && (M = p.isInsidePlot(c.x, c.y) && p.isInsidePlot(c.x + x.width, c.y + x.height)), t.shape && !v && i[s ? "attr" : "animate"]({
                anchorX: u ? p.plotWidth - e.plotY : e.plotX,
                anchorY: u ? p.plotHeight - e.plotX : e.plotY
            })), s && f && (i.placed = !1), M || f && !k || (i.hide(!0), i.placed = !1)
        }, R.prototype.setDataLabelStartPos = function(t, e, i, o, s) {
            var r = this.chart,
                n = r.inverted,
                a = this.xAxis,
                l = a.reversed,
                h = n ? e.height / 2 : e.width / 2,
                c = t.pointWidth,
                d = c ? c / 2 : 0,
                p = n ? s.x : l ? -h - d : a.width - h + d,
                u = n ? l ? this.yAxis.height - h + d : -h - d : s.y;
            e.startXPos = p, e.startYPos = u, o ? "hidden" === e.visibility && (e.show(), e.attr({
                opacity: 0
            }).animate({
                opacity: 1
            })) : e.attr({
                opacity: 1
            }).animate({
                opacity: 0
            }, void 0, e.hide), r.hasRendered && (i && e.attr({
                x: e.startXPos,
                y: e.startYPos
            }), e.placed = !0)
        }, R.prototype.justifyDataLabel = function(t, e, i, o, s, r) {
            var n, a = this.chart,
                l = e.align,
                h = e.verticalAlign,
                c = !t.box && t.padding || 0,
                d = i.x + c;
            return d < 0 && ("right" === l ? (e.align = "left", e.inside = !0) : e.x = -d, n = !0), (d = i.x + o.width - c) > a.plotWidth && ("left" === l ? (e.align = "right", e.inside = !0) : e.x = a.plotWidth - d, n = !0), (d = i.y + c) < 0 && ("bottom" === h ? (e.verticalAlign = "top", e.inside = !0) : e.y = -d, n = !0), (d = i.y + o.height - c) > a.plotHeight && ("top" === h ? (e.verticalAlign = "bottom", e.inside = !0) : e.y = a.plotHeight - d, n = !0), n && (t.placed = !r, t.align(e, null, s)), n
        }, i.pie && (i.pie.prototype.dataLabelPositioners = {
            radialDistributionY: function(t) {
                return t.top + t.distributeBox.pos
            },
            radialDistributionX: function(t, e, i, o) {
                return t.getX(i < e.top + 2 || i > e.bottom - 2 ? o : i, e.half, e)
            },
            justify: function(t, e, i) {
                return i[0] + (t.half ? -1 : 1) * (e + t.labelDistance)
            },
            alignToPlotEdges: function(t, e, i, o) {
                var s = t.getBBox().width;
                return e ? s + o : i - s - o
            },
            alignToConnectors: function(t, e, i, o) {
                var s, r = 0;
                return t.forEach(function(t) {
                    s = t.dataLabel.getBBox().width, r < s && (r = s)
                }), e ? r + o : i - r - o
            }
        }, i.pie.prototype.drawDataLabels = function() {
            var c, i, o, d, p, u, f, g, m, x, v, y, b = this,
                t = b.data,
                k = b.chart,
                M = b.options.dataLabels || {},
                w = M.connectorPadding,
                S = k.plotWidth,
                A = k.plotHeight,
                T = k.plotLeft,
                e = Math.round(k.chartWidth / 3),
                P = b.center,
                C = P[2] / 2,
                L = P[1],
                s = [
                    [],
                    []
                ],
                E = [0, 0, 0, 0],
                O = b.dataLabelPositioners;
            b.visible && (M.enabled || b._hasPointLabels) && (t.forEach(function(t) {
                t.dataLabel && t.visible && t.dataLabel.shortened && (t.dataLabel.attr({
                    width: "auto"
                }).css({
                    width: "auto",
                    textOverflow: "clip"
                }), t.dataLabel.shortened = !1)
            }), R.prototype.drawDataLabels.apply(b), t.forEach(function(t) {
                t.dataLabel && (t.visible ? (s[t.half].push(t), t.dataLabel._pos = null, B(M.style.width) || B(t.options.dataLabels && t.options.dataLabels.style && t.options.dataLabels.style.width) || t.dataLabel.getBBox().width > e && (t.dataLabel.css({
                    width: Math.round(.7 * e) + "px"
                }), t.dataLabel.shortened = !0)) : (t.dataLabel = t.dataLabel.destroy(), t.dataLabels && 1 === t.dataLabels.length && delete t.dataLabels))
            }), s.forEach(function(t, e) {
                var i, o, s, r, n, a, l = t.length,
                    h = [];
                if (l)
                    for (b.sortByAngle(t, e - .5), 0 < b.maxLabelDistance && (i = Math.max(0, L - C - b.maxLabelDistance), o = Math.min(L + C + b.maxLabelDistance, k.plotHeight), t.forEach(function(t) {
                            0 < t.labelDistance && t.dataLabel && (t.top = Math.max(0, L - C - t.labelDistance), t.bottom = Math.min(L + C + t.labelDistance, k.plotHeight), n = t.dataLabel.getBBox().height || 21, t.distributeBox = {
                                target: t.labelPosition.natural.y - t.top + n / 2,
                                size: n,
                                rank: t.y
                            }, h.push(t.distributeBox))
                        }), a = o + n - i, D.distribute(h, a, a / 5)), v = 0; v < l; v++) {
                        if (c = t[v], u = c.labelPosition, d = c.dataLabel, x = !1 === c.visible ? "hidden" : "inherit", s = u.natural.y, m = s, h && B(c.distributeBox) && (void 0 === c.distributeBox.pos ? x = "hidden" : (f = c.distributeBox.size, m = O.radialDistributionY(c))), delete c.positionIndex, M.justify) g = O.justify(c, C, P);
                        else switch (M.alignTo) {
                            case "connectors":
                                g = O.alignToConnectors(t, e, S, T);
                                break;
                            case "plotEdges":
                                g = O.alignToPlotEdges(d, e, S, T);
                                break;
                            default:
                                g = O.radialDistributionX(b, c, m, s)
                        }
                        d._attr = {
                            visibility: x,
                            align: u.alignment
                        }, y = c.options.dataLabels || {}, d._pos = {
                            x: g + z(y.x, M.x) + ({
                                left: w,
                                right: -w
                            }[u.alignment] || 0),
                            y: m + z(y.y, M.y) - 10
                        }, u.final.x = g, u.final.y = m, z(M.crop, !0) && (p = d.getBBox().width, r = null, g - p < w && 1 === e ? (r = Math.round(p - g + w), E[3] = Math.max(r, E[3])) : S - w < g + p && 0 === e && (r = Math.round(g + p - S + w), E[1] = Math.max(r, E[1])), m - f / 2 < 0 ? E[0] = Math.max(Math.round(f / 2 - m), E[0]) : A < m + f / 2 && (E[2] = Math.max(Math.round(m + f / 2 - A), E[2])), d.sideOverflow = r)
                    }
            }), 0 !== r(E) && !this.verifyDataLabelOverflow(E) || (this.placeDataLabels(), this.points.forEach(function(t) {
                var e;
                y = I(M, t.options.dataLabels), (i = z(y.connectorWidth, 1)) && (o = t.connector, (d = t.dataLabel) && d._pos && t.visible && 0 < t.labelDistance ? (x = d._attr.visibility, (e = !o) && (t.connector = o = k.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + t.colorIndex + (t.className ? " " + t.className : "")).add(b.dataLabelsGroup), k.styledMode || o.attr({
                    "stroke-width": i,
                    stroke: y.connectorColor || t.color || "#666666"
                })), o[e ? "attr" : "animate"]({
                    d: t.getConnectorPath()
                }), o.attr("visibility", x)) : o && (t.connector = o.destroy()))
            })))
        }, i.pie.prototype.placeDataLabels = function() {
            this.points.forEach(function(t) {
                var e, i = t.dataLabel;
                i && t.visible && ((e = i._pos) ? (i.sideOverflow && (i._attr.width = Math.max(i.getBBox().width - i.sideOverflow, 0), i.css({
                    width: i._attr.width + "px",
                    textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis"
                }), i.shortened = !0), i.attr(i._attr), i[i.moved ? "animate" : "attr"](e), i.moved = !0) : i && i.attr({
                    y: -9999
                })), delete t.distributeBox
            }, this)
        }, i.pie.prototype.alignDataLabel = e, i.pie.prototype.verifyDataLabelOverflow = function(t) {
            var e = this.center,
                i = this.options,
                o = i.center,
                s = i.minSize || 80,
                r = s,
                n = null !== i.size;
            return n || (null !== o[0] ? r = Math.max(e[2] - Math.max(t[1], t[3]), s) : (r = Math.max(e[2] - t[1] - t[3], s), e[0] += (t[3] - t[1]) / 2), null !== o[1] ? r = p(r, s, e[2] - Math.max(t[0], t[2])) : (r = p(r, s, e[2] - t[0] - t[2]), e[1] += (t[0] - t[2]) / 2), r < e[2] ? (e[2] = r, e[3] = Math.min(c(i.innerSize || 0, r), r), this.translate(e), this.drawDataLabels && this.drawDataLabels()) : n = !0), n
        }), i.column && (i.column.prototype.alignDataLabel = function(t, e, i, o, s) {
            var r, n = this.chart.inverted,
                a = t.series,
                l = t.dlBox || t.shapeArgs,
                h = z(t.below, t.plotY > z(this.translatedThreshold, a.yAxis.len)),
                c = z(i.inside, !!this.options.stacking);
            l && ((o = I(l)).y < 0 && (o.height += o.y, o.y = 0), 0 < (r = o.y + o.height - a.yAxis.len) && r < o.height && (o.height -= r), n && (o = {
                x: a.yAxis.len - o.y - o.height,
                y: a.xAxis.len - o.x - o.width,
                width: o.height,
                height: o.width
            }), c || (n ? (o.x += h ? 0 : o.width, o.width = 0) : (o.y += h ? o.height : 0, o.height = 0))), i.align = z(i.align, !n || c ? "center" : h ? "right" : "left"), i.verticalAlign = z(i.verticalAlign, n || c ? "middle" : h ? "top" : "bottom"), R.prototype.alignDataLabel.call(this, t, e, i, o, s), i.inside && t.contrastColor && e.css({
                color: t.contrastColor
            })
        })
    }), e(t, "modules/overlapping-datalabels.src.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var i = e.addEvent,
            f = e.fireEvent,
            s = e.isArray,
            r = e.objectEach,
            n = e.pick,
            o = t.Chart;
        i(o, "render", function() {
            var o = [];
            (this.labelCollectors || []).forEach(function(t) {
                o = o.concat(t())
            }), (this.yAxis || []).forEach(function(t) {
                t.stacking && t.options.stackLabels && !t.options.stackLabels.allowOverlap && r(t.stacking.stacks, function(t) {
                    r(t, function(t) {
                        o.push(t.label)
                    })
                })
            }), (this.series || []).forEach(function(t) {
                var e = t.options.dataLabels;
                t.visible && (!1 !== e.enabled || t._hasPointLabels) && (t.nodes || t.points).forEach(function(i) {
                    i.visible && (s(i.dataLabels) ? i.dataLabels : i.dataLabel ? [i.dataLabel] : []).forEach(function(t) {
                        var e = t.options;
                        t.labelrank = n(e.labelrank, i.labelrank, i.shapeArgs && i.shapeArgs.height), e.allowOverlap || o.push(t)
                    })
                })
            }), this.hideOverlappingLabels(o)
        }), o.prototype.hideOverlappingLabels = function(t) {
            for (var e, i, o, s, r, n, a, l, h = this, c = t.length, d = h.renderer, p = !1, u = 0; u < c; u++)(e = t[u]) && (e.oldOpacity = e.opacity, e.newOpacity = 1, e.absoluteBox = function(t) {
                var e, i, o, s, r, n = !t.box && t.padding || 0,
                    a = 0,
                    l = 0;
                if (t && (!t.alignAttr || t.placed)) return e = t.alignAttr || {
                    x: t.attr("x"),
                    y: t.attr("y")
                }, i = t.parentGroup, t.width || (o = t.getBBox(), t.width = o.width, t.height = o.height, a = d.fontMetrics(null, t.element).h), s = t.width - 2 * n, (r = {
                    left: "0",
                    center: "0.5",
                    right: "1"
                }[t.alignValue]) ? l = r * s : Math.round(t.x) !== t.translateX && (l = t.x - t.translateX), {
                    x: e.x + (i.translateX || 0) + n - l,
                    y: e.y + (i.translateY || 0) + n - a,
                    width: t.width - 2 * n,
                    height: t.height - 2 * n
                }
            }(e));
            for (t.sort(function(t, e) {
                    return (e.labelrank || 0) - (t.labelrank || 0)
                }), u = 0; u < c; u++)
                for (r = (o = t[u]) && o.absoluteBox, i = u + 1; i < c; ++i) n = (s = t[i]) && s.absoluteBox, r && n && o !== s && 0 !== o.newOpacity && 0 !== s.newOpacity && (a = r, (l = n).x > a.x + a.width || l.x + l.width < a.x || l.y > a.y + a.height || l.y + l.height < a.y || ((o.labelrank < s.labelrank ? o : s).newOpacity = 0));
            t.forEach(function(t) {
                var e, i;
                t && (i = t.newOpacity, t.oldOpacity !== i && (t.alignAttr && t.placed ? (t[i ? "removeClass" : "addClass"]("highcharts-data-label-hidden"), e = function() {
                    h.styledMode || t.css({
                        pointerEvents: i ? "auto" : "none"
                    }), t.visibility = i ? "inherit" : "hidden", t.placed = !!i
                }, p = !0, t.alignAttr.opacity = i, t[t.isOld ? "animate" : "attr"](t.alignAttr, null, e), f(h, "afterHideOverlappingLabel")) : t.attr({
                    opacity: i
                })), t.isOld = !0)
            }), p && f(h, "afterHideAllOverlappingLabels")
        }
    }), e(t, "parts/Interaction.js", [t["parts/Globals.js"], t["parts/Legend.js"], t["parts/Point.js"], t["parts/Utilities.js"]], function(A, t, l, e) {
        var o = e.addEvent,
            s = e.createElement,
            r = e.css,
            d = e.defined,
            M = e.extend,
            T = e.fireEvent,
            n = e.isArray,
            a = e.isFunction,
            P = e.isNumber,
            i = e.isObject,
            h = e.merge,
            c = e.objectEach,
            w = e.pick,
            p = A.Chart,
            u = A.defaultOptions,
            S = A.defaultPlotOptions,
            f = A.hasTouch,
            g = A.Series,
            m = A.seriesTypes,
            x = A.svg,
            v = A.TrackerMixin = {
                drawTrackerPoint: function() {
                    function e(t) {
                        var e = s.getPointFromEvent(t);
                        void 0 !== e && (s.isDirectTouch = !0, e.onMouseOver(t))
                    }
                    var t, i = this,
                        o = i.chart,
                        s = o.pointer;
                    i.points.forEach(function(e) {
                        t = n(e.dataLabels) ? e.dataLabels : e.dataLabel ? [e.dataLabel] : [], e.graphic && (e.graphic.element.point = e), t.forEach(function(t) {
                            t.div ? t.div.point = e : t.element.point = e
                        })
                    }), i._hasTracking || (i.trackerGroups.forEach(function(t) {
                        i[t] && (i[t].addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function(t) {
                            s.onTrackerMouseOut(t)
                        }), f && i[t].on("touchstart", e), !o.styledMode && i.options.cursor && i[t].css(r).css({
                            cursor: i.options.cursor
                        }))
                    }), i._hasTracking = !0), T(this, "afterDrawTracker")
                },
                drawTrackerGraph: function() {
                    function e(t) {
                        r.hoverSeries !== i && i.onMouseOver()
                    }
                    var i = this,
                        o = i.options,
                        t = o.trackByArea,
                        s = [].concat(t ? i.areaPath : i.graphPath),
                        r = i.chart,
                        n = r.pointer,
                        a = r.renderer,
                        l = r.options.tooltip.snap,
                        h = i.tracker,
                        c = "rgba(192,192,192," + (x ? 1e-4 : .002) + ")";
                    h ? h.attr({
                        d: s
                    }) : i.graph && (i.tracker = a.path(s).attr({
                        visibility: i.visible ? "visible" : "hidden",
                        zIndex: 2
                    }).addClass(t ? "highcharts-tracker-area" : "highcharts-tracker-line").add(i.group), r.styledMode || i.tracker.attr({
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        stroke: c,
                        fill: t ? c : "none",
                        "stroke-width": i.graph.strokeWidth() + (t ? 0 : 2 * l)
                    }), [i.tracker, i.markerGroup].forEach(function(t) {
                        t.addClass("highcharts-tracker").on("mouseover", e).on("mouseout", function(t) {
                            n.onTrackerMouseOut(t)
                        }), o.cursor && !r.styledMode && t.css({
                            cursor: o.cursor
                        }), f && t.on("touchstart", e)
                    })), T(this, "afterDrawTracker")
                }
            };
        m.column && (m.column.prototype.drawTracker = v.drawTrackerPoint), m.pie && (m.pie.prototype.drawTracker = v.drawTrackerPoint), m.scatter && (m.scatter.prototype.drawTracker = v.drawTrackerPoint), M(t.prototype, {
            setItemEvents: function(o, e, t) {
                var s = this,
                    r = s.chart.renderer.boxWrapper,
                    n = o instanceof l,
                    a = "highcharts-legend-" + (n ? "point" : "series") + "-active",
                    i = s.chart.styledMode;
                (t ? [e, o.legendSymbol] : [o.legendGroup]).forEach(function(t) {
                    t && t.on("mouseover", function() {
                        o.visible && s.allItems.forEach(function(t) {
                            o !== t && t.setState("inactive", !n)
                        }), o.setState("hover"), o.visible && r.addClass(a), i || e.css(s.options.itemHoverStyle)
                    }).on("mouseout", function() {
                        s.chart.styledMode || e.css(h(o.visible ? s.itemStyle : s.itemHiddenStyle)), s.allItems.forEach(function(t) {
                            o !== t && t.setState("", !n)
                        }), r.removeClass(a), o.setState()
                    }).on("click", function(t) {
                        function e() {
                            o.setVisible && o.setVisible(), s.allItems.forEach(function(t) {
                                o !== t && t.setState(o.visible ? "inactive" : "", !n)
                            })
                        }
                        var i = "legendItemClick";
                        r.removeClass(a), t = {
                            browserEvent: t
                        }, o.firePointEvent ? o.firePointEvent(i, t, e) : T(o, i, t, e)
                    })
                })
            },
            createCheckboxForItem: function(i) {
                i.checkbox = s("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: i.selected,
                    defaultChecked: i.selected
                }, this.options.itemCheckboxStyle, this.chart.container), o(i.checkbox, "click", function(t) {
                    var e = t.target;
                    T(i.series || i, "checkboxClick", {
                        checked: e.checked,
                        item: i
                    }, function() {
                        i.select()
                    })
                })
            }
        }), M(p.prototype, {
            showResetZoom: function() {
                var t = this,
                    e = u.lang,
                    i = t.options.chart.resetZoomButton,
                    o = i.theme,
                    s = o.states,
                    r = "chart" === i.relativeTo || "spaceBox" === i.relativeTo ? null : "plotBox";

                function n() {
                    t.zoomOut()
                }
                T(this, "beforeShowResetZoom", null, function() {
                    t.resetZoomButton = t.renderer.button(e.resetZoom, null, null, n, o, s && s.hover).attr({
                        align: i.position.align,
                        title: e.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(i.position, !1, r)
                }), T(this, "afterShowResetZoom")
            },
            zoomOut: function() {
                T(this, "selection", {
                    resetSelection: !0
                }, this.zoom)
            },
            zoom: function(t) {
                var n, e, a = this,
                    l = a.pointer,
                    h = !1,
                    c = a.inverted ? l.mouseDownX : l.mouseDownY;
                !t || t.resetSelection ? (a.axes.forEach(function(t) {
                    n = t.zoom()
                }), l.initiated = !1) : t.xAxis.concat(t.yAxis).forEach(function(t) {
                    var e = t.axis,
                        i = a.inverted ? e.left : e.top,
                        o = a.inverted ? i + e.width : i + e.height,
                        s = e.isXAxis,
                        r = !1;
                    (!s && i <= c && c <= o || s || !d(c)) && (r = !0), l[s ? "zoomX" : "zoomY"] && r && (n = e.zoom(t.min, t.max), e.displayBtn && (h = !0))
                }), e = a.resetZoomButton, h && !e ? a.showResetZoom() : !h && i(e) && (a.resetZoomButton = e.destroy()), n && a.redraw(w(a.options.chart.animation, t && t.animation, a.pointCount < 100))
            },
            pan: function(b, t) {
                var k, M, w = this,
                    e = w.hoverPoints,
                    i = w.options.chart,
                    S = w.options.mapNavigation && w.options.mapNavigation.enabled,
                    o = "object" == typeof t ? t : {
                        enabled: t,
                        type: "x"
                    };
                i && i.panning && (i.panning = o), M = o.type, T(this, "pan", {
                    originalEvent: b
                }, function() {
                    e && e.forEach(function(t) {
                        t.setState()
                    });
                    var t = [1];
                    "xy" === M ? t = [1, 0] : "y" === M && (t = [0]), t.forEach(function(o) {
                        var t, e, i, s = w[o ? "xAxis" : "yAxis"][0],
                            r = s.options,
                            n = s.horiz,
                            a = b[n ? "chartX" : "chartY"],
                            l = n ? "mouseDownX" : "mouseDownY",
                            h = w[l],
                            c = (s.pointRange || 0) / 2,
                            d = s.reversed && !w.inverted || !s.reversed && w.inverted ? -1 : 1,
                            p = s.getExtremes(),
                            u = s.toValue(h - a, !0) + c * d,
                            f = s.toValue(h + s.len - a, !0) - c * d,
                            g = f < u,
                            m = g ? f : u,
                            x = g ? u : f,
                            v = s.hasVerticalPanning(),
                            y = s.panningState;
                        s.series.forEach(function(t) {
                            var e, i;
                            !v || o || y && !y.isDirty || (e = t.getProcessedData(!0), i = t.getExtremes(e.yData, !0), y = y || {
                                startMin: Number.MAX_VALUE,
                                startMax: -Number.MAX_VALUE
                            }, P(i.dataMin) && P(i.dataMax) && (y.startMin = Math.min(i.dataMin, y.startMin), y.startMax = Math.max(i.dataMax, y.startMax)))
                        }), t = Math.min(A.pick(null == y ? void 0 : y.startMin, p.dataMin), c ? p.min : s.toValue(s.toPixels(p.min) - s.minPixelPadding)), e = Math.max(A.pick(null == y ? void 0 : y.startMax, p.dataMax), c ? p.max : s.toValue(s.toPixels(p.max) + s.minPixelPadding)), s.panningState = y, r.ordinal || (0 < (i = t - m) && (x += i, m = t), 0 < (i = x - e) && (x = e, m -= i), (s.series.length && m !== p.min && x !== p.max && o || y && t <= m && x <= e) && (s.setExtremes(m, x, !1, !1, {
                            trigger: "pan"
                        }), w.resetZoomButton || S || !M.match("y") || (w.showResetZoom(), s.displayBtn = !1), k = !0), w[l] = a)
                    }), k && w.redraw(!1), r(w.container, {
                        cursor: "move"
                    })
                })
            }
        }), M(l.prototype, {
            select: function(t, e) {
                var i = this,
                    o = i.series,
                    s = o.chart;
                t = w(t, !i.selected), this.selectedStaging = t, i.firePointEvent(t ? "select" : "unselect", {
                    accumulate: e
                }, function() {
                    i.selected = i.options.selected = t, o.options.data[o.data.indexOf(i)] = i.options, i.setState(t && "select"), e || s.getSelectedPoints().forEach(function(t) {
                        var e = t.series;
                        t.selected && t !== i && (t.selected = t.options.selected = !1, e.options.data[e.data.indexOf(t)] = t.options, t.setState(s.hoverPoints && e.options.inactiveOtherPoints ? "inactive" : ""), t.firePointEvent("unselect"))
                    })
                }), delete this.selectedStaging
            },
            onMouseOver: function(t) {
                var e = this.series.chart,
                    i = e.pointer;
                t = t ? i.normalize(t) : i.getChartCoordinatesFromPoint(this, e.inverted), i.runPointActions(t, this)
            },
            onMouseOut: function() {
                var t = this.series.chart;
                this.firePointEvent("mouseOut"), this.series.options.inactiveOtherPoints || (t.hoverPoints || []).forEach(function(t) {
                    t.setState()
                }), t.hoverPoints = t.hoverPoint = null
            },
            importEvents: function() {
                var i, t;
                this.hasImportedEvents || (t = h((i = this).series.options.point, i.options).events, i.events = t, c(t, function(t, e) {
                    a(t) && o(i, e, t)
                }), this.hasImportedEvents = !0)
            },
            setState: function(t, e) {
                var i, o, s, r, n, a, l, h = this,
                    c = h.series,
                    d = h.state,
                    p = c.options.states[t || "normal"] || {},
                    u = S[c.type].marker && c.options.marker,
                    f = u && !1 === u.enabled,
                    g = u && u.states && u.states[t || "normal"] || {},
                    m = !1 === g.enabled,
                    x = c.stateMarkerGraphic,
                    v = h.marker || {},
                    y = c.chart,
                    b = c.halo,
                    k = u && c.markerAttribs;
                (t = t || "") === h.state && !e || h.selected && "select" !== t || !1 === p.enabled || t && (m || f && !1 === g.enabled) || t && v.states && v.states[t] && !1 === v.states[t].enabled || (h.state = t, k && (o = c.markerAttribs(h, t)), h.graphic ? (d && h.graphic.removeClass("highcharts-point-" + d), t && h.graphic.addClass("highcharts-point-" + t), y.styledMode || (s = c.pointAttribs(h, t), r = w(y.options.chart.animation, p.animation), c.options.inactiveOtherPoints && s.opacity && ((h.dataLabels || []).forEach(function(t) {
                    t && t.animate({
                        opacity: s.opacity
                    }, r)
                }), h.connector && h.connector.animate({
                    opacity: s.opacity
                }, r)), h.graphic.animate(s, r)), o && h.graphic.animate(o, w(y.options.chart.animation, g.animation, u.animation)), x && x.hide()) : (t && g && (n = v.symbol || c.symbol, x && x.currentSymbol !== n && (x = x.destroy()), o && (x ? x[e ? "animate" : "attr"]({
                    x: o.x,
                    y: o.y
                }) : n && (c.stateMarkerGraphic = x = y.renderer.symbol(n, o.x, o.y, o.width, o.height).add(c.markerGroup), x.currentSymbol = n)), !y.styledMode && x && x.attr(c.pointAttribs(h, t))), x && (x[t && h.isInside ? "show" : "hide"](), x.element.point = h)), i = p.halo, l = (a = h.graphic || x) && a.visibility || "inherit", i && i.size && a && "hidden" !== l && !h.isCluster ? (b || (c.halo = b = y.renderer.path().add(a.parentGroup)), b.show()[e ? "animate" : "attr"]({
                    d: h.haloPath(i.size)
                }), b.attr({
                    class: "highcharts-halo highcharts-color-" + w(h.colorIndex, c.colorIndex) + (h.className ? " " + h.className : ""),
                    visibility: l,
                    zIndex: -1
                }), b.point = h, y.styledMode || b.attr(M({
                    fill: h.color || c.color,
                    "fill-opacity": i.opacity
                }, i.attributes))) : b && b.point && b.point.haloPath && b.animate({
                    d: b.point.haloPath(0)
                }, null, b.hide), T(h, "afterSetState"))
            },
            haloPath: function(t) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - t, this.plotY - t, 2 * t, 2 * t)
            }
        }), M(g.prototype, {
            onMouseOver: function() {
                var t = this.chart,
                    e = t.hoverSeries;
                t.pointer.setHoverChartIndex(), e && e !== this && e.onMouseOut(), this.options.events.mouseOver && T(this, "mouseOver"), this.setState("hover"), t.hoverSeries = this
            },
            onMouseOut: function() {
                var t = this.options,
                    e = this.chart,
                    i = e.tooltip,
                    o = e.hoverPoint;
                e.hoverSeries = null, o && o.onMouseOut(), this && t.events.mouseOut && T(this, "mouseOut"), !i || this.stickyTracking || i.shared && !this.noSharedTooltip || i.hide(), e.series.forEach(function(t) {
                    t.setState("", !0)
                })
            },
            setState: function(e, t) {
                var i, o = this,
                    s = o.options,
                    r = o.graph,
                    n = s.inactiveOtherPoints,
                    a = s.states,
                    l = s.lineWidth,
                    h = s.opacity,
                    c = w(a[e || "normal"] && a[e || "normal"].animation, o.chart.options.chart.animation),
                    d = 0;
                if (e = e || "", o.state !== e && ([o.group, o.markerGroup, o.dataLabelsGroup].forEach(function(t) {
                        t && (o.state && t.removeClass("highcharts-series-" + o.state), e && t.addClass("highcharts-series-" + e))
                    }), o.state = e, !o.chart.styledMode)) {
                    if (a[e] && !1 === a[e].enabled) return;
                    if (e && (l = a[e].lineWidth || l + (a[e].lineWidthPlus || 0), h = w(a[e].opacity, h)), r && !r.dashstyle)
                        for (i = {
                                "stroke-width": l
                            }, r.animate(i, c); o["zone-graph-" + d];) o["zone-graph-" + d].attr(i), d += 1;
                    n || [o.group, o.markerGroup, o.dataLabelsGroup, o.labelBySeries].forEach(function(t) {
                        t && t.animate({
                            opacity: h
                        }, c)
                    })
                }
                t && n && o.points && o.setAllPointsToState(e)
            },
            setAllPointsToState: function(e) {
                this.points.forEach(function(t) {
                    t.setState && t.setState(e)
                })
            },
            setVisible: function(e, t) {
                var i, o = this,
                    s = o.chart,
                    r = o.legendItem,
                    n = s.options.chart.ignoreHiddenSeries,
                    a = o.visible;
                o.visible = e = o.options.visible = o.userOptions.visible = void 0 === e ? !a : e, i = e ? "show" : "hide", ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function(t) {
                    o[t] && o[t][i]()
                }), s.hoverSeries !== o && (s.hoverPoint && s.hoverPoint.series) !== o || o.onMouseOut(), r && s.legend.colorizeItem(o, e), o.isDirty = !0, o.options.stacking && s.series.forEach(function(t) {
                    t.options.stacking && t.visible && (t.isDirty = !0)
                }), o.linkedSeries.forEach(function(t) {
                    t.setVisible(e, !1)
                }), n && (s.isDirtyBox = !0), T(o, i), !1 !== t && s.redraw()
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(t) {
                this.selected = t = this.options.selected = void 0 === t ? !this.selected : t, this.checkbox && (this.checkbox.checked = t), T(this, t ? "select" : "unselect")
            },
            drawTracker: v.drawTrackerGraph
        })
    }), e(t, "parts/Responsive.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var l = e.find,
            h = e.isArray,
            c = e.isObject,
            d = e.merge,
            p = e.objectEach,
            o = e.pick,
            u = e.splat,
            f = e.uniqueKey,
            i = t.Chart;
        i.prototype.setResponsive = function(t, e) {
            var i, o, s = this.options.responsive,
                r = [],
                n = this.currentResponsive;
            !e && s && s.rules && s.rules.forEach(function(t) {
                void 0 === t._id && (t._id = f()), this.matchResponsiveRule(t, r)
            }, this);
            var a = d.apply(0, r.map(function(e) {
                return l(s.rules, function(t) {
                    return t._id === e
                }).chartOptions
            }));
            a.isResponsiveOptions = !0, r = r.toString() || void 0, i = n && n.ruleIds, r !== i && (n && this.update(n.undoOptions, t, !0), r ? ((o = this.currentOptions(a)).isResponsiveOptions = !0, this.currentResponsive = {
                ruleIds: r,
                mergedOptions: a,
                undoOptions: o
            }, this.update(a, t, !0)) : this.currentResponsive = void 0)
        }, i.prototype.matchResponsiveRule = function(t, e) {
            var i = t.condition;
            (i.callback || function() {
                return this.chartWidth <= o(i.maxWidth, Number.MAX_VALUE) && this.chartHeight <= o(i.maxHeight, Number.MAX_VALUE) && this.chartWidth >= o(i.minWidth, 0) && this.chartHeight >= o(i.minHeight, 0)
            }).call(this) && e.push(t._id)
        }, i.prototype.currentOptions = function(t) {
            var a = this,
                e = {};
            return function i(t, o, s, r) {
                var n;
                p(t, function(t, e) {
                    if (!r && -1 < a.collectionsWithUpdate.indexOf(e))
                        for (t = u(t), s[e] = [], n = 0; n < t.length; n++) o[e][n] && (s[e][n] = {}, i(t[n], o[e][n], s[e][n], r + 1));
                    else c(t) ? (s[e] = h(t) ? [] : {}, i(t, o[e] || {}, s[e], r + 1)) : void 0 === o[e] ? s[e] = null : s[e] = o[e]
                })
            }(t, this.options, e, 0), e
        }
    }), e(t, "masters/highcharts.src.js", [t["parts/Globals.js"]], function(t) {
        return t
    }), e(t, "parts/NavigatorAxis.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var l = t.isTouchDevice,
            i = e.addEvent,
            d = e.correctFloat,
            p = e.defined,
            u = e.isNumber,
            f = e.pick,
            o = (s.prototype.destroy = function() {
                this.axis = void 0
            }, s.prototype.toFixedRange = function(t, e, i, o) {
                var s = this.axis,
                    r = s.chart,
                    n = r && r.fixedRange,
                    a = (s.pointRange || 0) / 2,
                    l = f(i, s.translate(t, !0, !s.horiz)),
                    h = f(o, s.translate(e, !0, !s.horiz)),
                    c = n && (h - l) / n;
                return p(i) || (l = d(l + a)), p(o) || (h = d(h - a)), .7 < c && c < 1.3 && (o ? l = h - n : h = l + n), u(l) && u(h) || (l = h = void 0), {
                    min: l,
                    max: h
                }
            }, s);

        function s(t) {
            this.axis = t
        }

        function r() {}
        return r.compose = function(t) {
            t.keepProps.push("navigatorAxis"), i(t, "init", function() {
                this.navigatorAxis || (this.navigatorAxis = new o(this))
            }), i(t, "zoom", function(t) {
                var e, i = this.chart.options,
                    o = i.navigator,
                    s = this.navigatorAxis,
                    r = i.chart.pinchType,
                    n = i.rangeSelector,
                    a = i.chart.zoomType;
                this.isXAxis && (o && o.enabled || n && n.enabled) && ("y" === a ? t.zoomed = !1 : (!l && "xy" === a || l && "xy" === r) && this.options.range && (e = s.previousZoom, p(t.newMin) ? s.previousZoom = [this.min, this.max] : e && (t.newMin = e[0], t.newMax = e[1], s.previousZoom = void 0))), void 0 !== t.zoomed && t.preventDefault()
            })
        }, r.AdditionsClass = o, r
    }), e(t, "parts/ScrollbarAxis.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(l, t) {
        var i = t.addEvent,
            c = t.defined,
            d = t.pick;

        function e() {}
        return e.compose = function(t, e) {
            i(t, "afterInit", function() {
                var a = this;
                a.options && a.options.scrollbar && a.options.scrollbar.enabled && (a.options.scrollbar.vertical = !a.horiz, a.options.startOnTick = a.options.endOnTick = !1, a.scrollbar = new e(a.chart.renderer, a.options.scrollbar, a.chart), i(a.scrollbar, "changed", function(t) {
                    var e, i, o = d(a.options && a.options.min, a.min),
                        s = d(a.options && a.options.max, a.max),
                        r = c(a.dataMin) ? Math.min(o, a.min, a.dataMin) : o,
                        n = (c(a.dataMax) ? Math.max(s, a.max, a.dataMax) : s) - r;
                    c(o) && c(s) && (i = a.horiz && !a.reversed || !a.horiz && a.reversed ? (e = r + n * this.to, r + n * this.from) : (e = r + n * (1 - this.from), r + n * (1 - this.to)), d(this.options.liveRedraw, l.svg && !l.isTouchDevice && !this.chart.isBoosting) || "mouseup" === t.DOMType || !c(t.DOMType) ? a.setExtremes(i, e, !0, "mousemove" !== t.DOMType, t) : this.setRange(this.from, this.to))
                }))
            }), i(t, "afterRender", function() {
                var t, e, i, o = this,
                    s = Math.min(d(o.options.min, o.min), o.min, d(o.dataMin, o.min)),
                    r = Math.max(d(o.options.max, o.max), o.max, d(o.dataMax, o.max)),
                    n = o.scrollbar,
                    a = o.axisTitleMargin + (o.titleOffset || 0),
                    l = o.chart.scrollbarsOffsets,
                    h = o.options.margin || 0;
                n && (t = o.horiz ? (o.opposite || (l[1] += a), n.position(o.left, o.top + o.height + 2 + l[1] - (o.opposite ? h : 0), o.width, o.height), o.opposite || (l[1] += h), 1) : (o.opposite && (l[0] += a), n.position(o.left + o.width + 2 + l[0] - (o.opposite ? 0 : h), o.top, o.width, o.height), o.opposite && (l[0] += h), 0), l[t] += n.size + n.options.margin, isNaN(s) || isNaN(r) || !c(o.min) || !c(o.max) || o.min === o.max ? n.setRange(0, 1) : (e = (o.min - s) / (r - s), i = (o.max - s) / (r - s), o.horiz && !o.reversed || !o.horiz && o.reversed ? n.setRange(e, i) : n.setRange(1 - i, 1 - e)))
            }), i(t, "afterGetOffset", function() {
                var t = this.horiz ? 2 : 1,
                    e = this.scrollbar;
                e && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[t] += e.size + e.options.margin)
            })
        }, e
    }), e(t, "parts/Scrollbar.js", [t["parts/Axis.js"], t["parts/Globals.js"], t["parts/ScrollbarAxis.js"], t["parts/Utilities.js"]], function(t, e, i, o) {
        var l = o.addEvent,
            u = o.correctFloat,
            f = o.defined,
            s = o.destroyObjectProperties,
            n = o.fireEvent,
            r = o.merge,
            a = o.pick,
            h = o.removeEvent,
            c = e.defaultOptions,
            d = e.hasTouch,
            p = e.isTouchDevice,
            g = e.swapXY = function(t, e) {
                return e && t.forEach(function(t) {
                    for (var e, i = t.length, o = 0; o < i; o += 2) "number" == typeof(e = t[o + 1]) && (t[o + 1] = t[o + 2], t[o + 2] = e)
                }), t
            },
            m = (x.prototype.addEvents = function() {
                var t = this.options.inverted ? [1, 0] : [0, 1],
                    e = this.scrollbarButtons,
                    i = this.scrollbarGroup.element,
                    o = this.track.element,
                    s = this.mouseDownHandler.bind(this),
                    r = this.mouseMoveHandler.bind(this),
                    n = this.mouseUpHandler.bind(this),
                    a = [
                        [e[t[0]].element, "click", this.buttonToMinClick.bind(this)],
                        [e[t[1]].element, "click", this.buttonToMaxClick.bind(this)],
                        [o, "click", this.trackClick.bind(this)],
                        [i, "mousedown", s],
                        [i.ownerDocument, "mousemove", r],
                        [i.ownerDocument, "mouseup", n]
                    ];
                d && a.push([i, "touchstart", s], [i.ownerDocument, "touchmove", r], [i.ownerDocument, "touchend", n]), a.forEach(function(t) {
                    l.apply(null, t)
                }), this._events = a
            }, x.prototype.buttonToMaxClick = function(t) {
                var e = (this.to - this.from) * a(this.options.step, .2);
                this.updatePosition(this.from + e, this.to + e), n(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: t
                })
            }, x.prototype.buttonToMinClick = function(t) {
                var e = u(this.to - this.from) * a(this.options.step, .2);
                this.updatePosition(u(this.from - e), u(this.to - e)), n(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMEvent: t
                })
            }, x.prototype.cursorToScrollbarPosition = function(t) {
                var e = this.options,
                    i = e.minWidth > this.calculatedWidth ? e.minWidth : 0;
                return {
                    chartX: (t.chartX - this.x - this.xOffset) / (this.barWidth - i),
                    chartY: (t.chartY - this.y - this.yOffset) / (this.barWidth - i)
                }
            }, x.prototype.destroy = function() {
                var t = this.chart.scroller;
                this.removeEvents(), ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function(t) {
                    this[t] && this[t].destroy && (this[t] = this[t].destroy())
                }, this), t && this === t.scrollbar && (t.scrollbar = null, s(t.scrollbarButtons))
            }, x.prototype.drawScrollbarButton = function(t) {
                var e, i = this.renderer,
                    o = this.scrollbarButtons,
                    s = this.options,
                    r = this.size,
                    n = i.g().add(this.group);
                o.push(n), e = i.rect().addClass("highcharts-scrollbar-button").add(n), this.chart.styledMode || e.attr({
                    stroke: s.buttonBorderColor,
                    "stroke-width": s.buttonBorderWidth,
                    fill: s.buttonBackgroundColor
                }), e.attr(e.crisp({
                    x: -.5,
                    y: -.5,
                    width: r + 1,
                    height: r + 1,
                    r: s.buttonBorderRadius
                }, e.strokeWidth())), e = i.path(g([
                    ["M", r / 2 + (t ? -1 : 1), r / 2 - 3],
                    ["L", r / 2 + (t ? -1 : 1), r / 2 + 3],
                    ["L", r / 2 + (t ? 2 : -2), r / 2]
                ], s.vertical)).addClass("highcharts-scrollbar-arrow").add(o[t]), this.chart.styledMode || e.attr({
                    fill: s.buttonArrowColor
                })
            }, x.prototype.init = function(t, e, i) {
                this.scrollbarButtons = [], this.renderer = t, this.userOptions = e, this.options = r(x.defaultOptions, e), this.chart = i, this.size = a(this.options.size, this.options.height), e.enabled && (this.render(), this.addEvents())
            }, x.prototype.mouseDownHandler = function(t) {
                var e = this.chart.pointer.normalize(t),
                    i = this.cursorToScrollbarPosition(e);
                this.chartX = i.chartX, this.chartY = i.chartY, this.initPositions = [this.from, this.to], this.grabbedCenter = !0
            }, x.prototype.mouseMoveHandler = function(t) {
                var e, i = this,
                    o = i.chart.pointer.normalize(t),
                    s = i.options.vertical ? "chartY" : "chartX",
                    r = i.initPositions || [];
                !i.grabbedCenter || t.touches && 0 === t.touches[0][s] || (e = i.cursorToScrollbarPosition(o)[s] - i[s], i.hasDragged = !0, i.updatePosition(r[0] + e, r[1] + e), i.hasDragged && n(i, "changed", {
                    from: i.from,
                    to: i.to,
                    trigger: "scrollbar",
                    DOMType: t.type,
                    DOMEvent: t
                }))
            }, x.prototype.mouseUpHandler = function(t) {
                this.hasDragged && n(this, "changed", {
                    from: this.from,
                    to: this.to,
                    trigger: "scrollbar",
                    DOMType: t.type,
                    DOMEvent: t
                }), this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null
            }, x.prototype.position = function(t, e, i, o) {
                var s = this,
                    r = s.options.vertical,
                    n = o,
                    a = 0,
                    l = s.rendered ? "animate" : "attr";
                s.x = t, s.y = e + this.trackBorderWidth, s.width = i, s.height = o, s.xOffset = n, s.yOffset = a, r ? (s.width = s.yOffset = i = a = s.size, s.xOffset = n = 0, s.barWidth = o - 2 * i, s.x = t += s.options.margin) : (s.height = s.xOffset = o = n = s.size, s.barWidth = i - 2 * o, s.y = s.y + s.options.margin), s.group[l]({
                    translateX: t,
                    translateY: s.y
                }), s.track[l]({
                    width: i,
                    height: o
                }), s.scrollbarButtons[1][l]({
                    translateX: r ? 0 : i - n,
                    translateY: r ? o - a : 0
                })
            }, x.prototype.removeEvents = function() {
                this._events.forEach(function(t) {
                    h.apply(null, t)
                }), this._events.length = 0
            }, x.prototype.render = function() {
                var t, e = this,
                    i = e.renderer,
                    o = e.options,
                    s = e.size,
                    r = this.chart.styledMode;
                e.group = t = i.g("scrollbar").attr({
                    zIndex: o.zIndex,
                    translateY: -99999
                }).add(), e.track = i.rect().addClass("highcharts-scrollbar-track").attr({
                    x: 0,
                    r: o.trackBorderRadius || 0,
                    height: s,
                    width: s
                }).add(t), r || e.track.attr({
                    fill: o.trackBackgroundColor,
                    stroke: o.trackBorderColor,
                    "stroke-width": o.trackBorderWidth
                }), this.trackBorderWidth = e.track.strokeWidth(), e.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                }), e.scrollbarGroup = i.g().add(t), e.scrollbar = i.rect().addClass("highcharts-scrollbar-thumb").attr({
                    height: s,
                    width: s,
                    r: o.barBorderRadius || 0
                }).add(e.scrollbarGroup), e.scrollbarRifles = i.path(g([
                    ["M", -3, s / 4],
                    ["L", -3, 2 * s / 3],
                    ["M", 0, s / 4],
                    ["L", 0, 2 * s / 3],
                    ["M", 3, s / 4],
                    ["L", 3, 2 * s / 3]
                ], o.vertical)).addClass("highcharts-scrollbar-rifles").add(e.scrollbarGroup), r || (e.scrollbar.attr({
                    fill: o.barBackgroundColor,
                    stroke: o.barBorderColor,
                    "stroke-width": o.barBorderWidth
                }), e.scrollbarRifles.attr({
                    stroke: o.rifleColor,
                    "stroke-width": 1
                })), e.scrollbarStrokeWidth = e.scrollbar.strokeWidth(), e.scrollbarGroup.translate(-e.scrollbarStrokeWidth % 2 / 2, -e.scrollbarStrokeWidth % 2 / 2), e.drawScrollbarButton(0), e.drawScrollbarButton(1)
            }, x.prototype.setRange = function(t, e) {
                var i, o, s, r, n, a = this,
                    l = a.options,
                    h = l.vertical,
                    c = l.minWidth,
                    d = a.barWidth,
                    p = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
                f(d) && (t = Math.max(t, 0), i = Math.ceil(d * t), o = d * Math.min(e, 1), a.calculatedWidth = r = u(o - i), r < c && (i = (d - c + r) * t, r = c), s = Math.floor(i + a.xOffset + a.yOffset), n = r / 2 - .5, a.from = t, a.to = e, h ? (a.scrollbarGroup[p]({
                    translateY: s
                }), a.scrollbar[p]({
                    height: r
                }), a.scrollbarRifles[p]({
                    translateY: n
                }), a.scrollbarTop = s, a.scrollbarLeft = 0) : (a.scrollbarGroup[p]({
                    translateX: s
                }), a.scrollbar[p]({
                    width: r
                }), a.scrollbarRifles[p]({
                    translateX: n
                }), a.scrollbarLeft = s, a.scrollbarTop = 0), r <= 12 ? a.scrollbarRifles.hide() : a.scrollbarRifles.show(!0), !1 === l.showFull && (t <= 0 && 1 <= e ? a.group.hide() : a.group.show()), a.rendered = !0)
            }, x.prototype.trackClick = function(t) {
                var e = this,
                    i = e.chart.pointer.normalize(t),
                    o = e.to - e.from,
                    s = e.y + e.scrollbarTop,
                    r = e.x + e.scrollbarLeft;
                e.options.vertical && i.chartY > s || !e.options.vertical && i.chartX > r ? e.updatePosition(e.from + o, e.to + o) : e.updatePosition(e.from - o, e.to - o), n(e, "changed", {
                    from: e.from,
                    to: e.to,
                    trigger: "scrollbar",
                    DOMEvent: t
                })
            }, x.prototype.update = function(t) {
                this.destroy(), this.init(this.chart.renderer, r(!0, this.options, t), this.chart)
            }, x.prototype.updatePosition = function(t, e) {
                1 < e && (t = u(1 - u(e - t)), e = 1), t < 0 && (e = u(e - t), t = 0), this.from = t, this.to = e
            }, x.defaultOptions = {
                height: p ? 20 : 14,
                barBorderRadius: 0,
                buttonBorderRadius: 0,
                liveRedraw: void 0,
                margin: 10,
                minWidth: 6,
                step: .2,
                zIndex: 3,
                barBackgroundColor: "#cccccc",
                barBorderWidth: 1,
                barBorderColor: "#cccccc",
                buttonArrowColor: "#333333",
                buttonBackgroundColor: "#e6e6e6",
                buttonBorderColor: "#cccccc",
                buttonBorderWidth: 1,
                rifleColor: "#333333",
                trackBackgroundColor: "#f2f2f2",
                trackBorderColor: "#f2f2f2",
                trackBorderWidth: 1
            }, x);

        function x(t, e, i) {
            this._events = [], this.chartX = 0, this.chartY = 0, this.from = 0, this.group = void 0, this.scrollbar = void 0, this.scrollbarButtons = [], this.scrollbarGroup = void 0, this.scrollbarLeft = 0, this.scrollbarRifles = void 0, this.scrollbarStrokeWidth = 1, this.scrollbarTop = 0, this.size = 0, this.to = 0, this.track = void 0, this.trackBorderWidth = 1, this.userOptions = {}, this.x = 0, this.y = 0, this.chart = i, this.options = e, this.renderer = i.renderer, this.init(t, e, i)
        }
        return e.Scrollbar || (c.scrollbar = r(!0, m.defaultOptions, c.scrollbar), e.Scrollbar = m, i.compose(t, m)), e.Scrollbar
    }), e(t, "parts/Navigator.js", [t["parts/Axis.js"], t["parts/Color.js"], t["parts/Globals.js"], t["parts/NavigatorAxis.js"], t["parts/Scrollbar.js"], t["parts/Utilities.js"]], function(u, t, h, f, g, e) {
        function m(t) {
            for (var e = [], i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
            var o = [].filter.call(e, C);
            if (o.length) return Math[t].apply(0, o)
        }
        var i = t.parse,
            x = e.addEvent,
            A = e.clamp,
            T = e.correctFloat,
            P = e.defined,
            o = e.destroyObjectProperties,
            s = e.erase,
            v = e.extend,
            r = e.find,
            y = e.isArray,
            C = e.isNumber,
            b = e.merge,
            L = e.pick,
            k = e.removeEvent,
            M = e.splat,
            n = h.Chart,
            w = h.defaultOptions,
            a = h.hasTouch,
            c = h.isTouchDevice,
            l = h.Series,
            d = h.seriesTypes,
            p = void 0 === d.areaspline ? "line" : "areaspline";
        v(w, {
            navigator: {
                height: 40,
                margin: 25,
                maskInside: !0,
                handles: {
                    width: 7,
                    height: 15,
                    symbols: ["navigator-handle", "navigator-handle"],
                    enabled: !0,
                    lineWidth: 1,
                    backgroundColor: "#f2f2f2",
                    borderColor: "#999999"
                },
                maskFill: i("#6685c2").setOpacity(.3).get(),
                outlineColor: "#cccccc",
                outlineWidth: 1,
                series: {
                    type: p,
                    fillOpacity: .05,
                    lineWidth: 1,
                    compare: null,
                    dataGrouping: {
                        approximation: "average",
                        enabled: !0,
                        groupPixelWidth: 2,
                        smoothed: !0,
                        units: [
                            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                            ["second", [1, 2, 5, 10, 15, 30]],
                            ["minute", [1, 2, 5, 10, 15, 30]],
                            ["hour", [1, 2, 3, 4, 6, 8, 12]],
                            ["day", [1, 2, 3, 4]],
                            ["week", [1, 2, 3]],
                            ["month", [1, 3, 6]],
                            ["year", null]
                        ]
                    },
                    dataLabels: {
                        enabled: !1,
                        zIndex: 2
                    },
                    id: "highcharts-navigator-series",
                    className: "highcharts-navigator-series",
                    lineColor: null,
                    marker: {
                        enabled: !1
                    },
                    threshold: null
                },
                xAxis: {
                    overscroll: 0,
                    className: "highcharts-navigator-xaxis",
                    tickLength: 0,
                    lineWidth: 0,
                    gridLineColor: "#e6e6e6",
                    gridLineWidth: 1,
                    tickPixelInterval: 200,
                    labels: {
                        align: "left",
                        style: {
                            color: "#999999"
                        },
                        x: 3,
                        y: -4
                    },
                    crosshair: !1
                },
                yAxis: {
                    className: "highcharts-navigator-yaxis",
                    gridLineWidth: 0,
                    startOnTick: !1,
                    endOnTick: !1,
                    minPadding: .1,
                    maxPadding: .1,
                    labels: {
                        enabled: !1
                    },
                    crosshair: !1,
                    title: {
                        text: null
                    },
                    tickLength: 0,
                    tickWidth: 0
                }
            }
        }), h.Renderer.prototype.symbols["navigator-handle"] = function(t, e, i, o, s) {
            var r = s.width / 2,
                n = Math.round(r / 3) + .5,
                a = s.height || 0;
            return [
                ["M", -r - 1, .5],
                ["L", r, .5],
                ["L", r, a + .5],
                ["L", -r - 1, a + .5],
                ["L", -r - 1, .5],
                ["M", -n, 4],
                ["L", -n, a - 3],
                ["M", n - 1, 4],
                ["L", n - 1, a - 3]
            ]
        };
        var S = (E.prototype.drawHandle = function(t, e, i, o) {
            var s = this.navigatorOptions.handles.height;
            this.handles[e][o](i ? {
                translateX: Math.round(this.left + this.height / 2),
                translateY: Math.round(this.top + parseInt(t, 10) + .5 - s)
            } : {
                translateX: Math.round(this.left + parseInt(t, 10)),
                translateY: Math.round(this.top + this.height / 2 - s / 2 - 1)
            })
        }, E.prototype.drawOutline = function(t, e, i, o) {
            var s, r, n = this.navigatorOptions.maskInside,
                a = this.outline.strokeWidth(),
                l = a / 2,
                h = a % 2 / 2,
                c = this.outlineHeight,
                d = this.scrollbarHeight || 0,
                p = this.size,
                u = this.left - d,
                f = this.top;
            i ? (r = [
                ["M", (u -= l) + c, f - d - h],
                ["L", u + c, s = f + e + h],
                ["L", u, s],
                ["L", u, e = f + t + h],
                ["L", u + c, e],
                ["L", u + c, f + p + d]
            ], n && r.push(["M", u + c, s - l], ["L", u + c, e + l])) : (r = [
                ["M", u, f += l],
                ["L", t += u + d - h, f],
                ["L", t, f + c],
                ["L", e += u + d - h, f + c],
                ["L", e, f],
                ["L", u + p + 2 * d, f]
            ], n && r.push(["M", t - l, f], ["L", e + l, f])), this.outline[o]({
                d: r
            })
        }, E.prototype.drawMasks = function(t, e, i, o) {
            var s, r, n, a = this.left,
                l = this.top,
                h = this.height,
                c = i ? (r = [a, a, a], n = [l, l + t, l + e], s = [h, h, h], [t, e - t, this.size - e]) : (r = [a, a + t, a + e], n = [l, l, l], s = [t, e - t, this.size - e], [h, h, h]);
            this.shades.forEach(function(t, e) {
                t[o]({
                    x: r[e],
                    y: n[e],
                    width: s[e],
                    height: c[e]
                })
            })
        }, E.prototype.renderElements = function() {
            var i, o = this,
                s = o.navigatorOptions,
                t = s.maskInside,
                r = o.chart,
                e = r.inverted,
                n = r.renderer,
                a = {
                    cursor: e ? "ns-resize" : "ew-resize"
                };
            o.navigatorGroup = i = n.g("navigator").attr({
                zIndex: 8,
                visibility: "hidden"
            }).add(), [!t, t, !t].forEach(function(t, e) {
                o.shades[e] = n.rect().addClass("highcharts-navigator-mask" + (1 === e ? "-inside" : "-outside")).add(i), r.styledMode || o.shades[e].attr({
                    fill: t ? s.maskFill : "rgba(0,0,0,0)"
                }).css(1 === e && a)
            }), o.outline = n.path().addClass("highcharts-navigator-outline").add(i), r.styledMode || o.outline.attr({
                "stroke-width": s.outlineWidth,
                stroke: s.outlineColor
            }), s.handles.enabled && [0, 1].forEach(function(t) {
                var e;
                s.handles.inverted = r.inverted, o.handles[t] = n.symbol(s.handles.symbols[t], -s.handles.width / 2 - 1, 0, s.handles.width, s.handles.height, s.handles), o.handles[t].attr({
                    zIndex: 7 - t
                }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][t]).add(i), r.styledMode || (e = s.handles, o.handles[t].attr({
                    fill: e.backgroundColor,
                    stroke: e.borderColor,
                    "stroke-width": e.lineWidth
                }).css(a))
            })
        }, E.prototype.update = function(t) {
            (this.series || []).forEach(function(t) {
                t.baseSeries && delete t.baseSeries.navigatorSeries
            }), this.destroy();
            var e = this.chart.options;
            b(!0, e.navigator, this.options, t), this.init(this.chart)
        }, E.prototype.render = function(t, e, i, o) {
            var s, r, n, a, l, h, c, d, p, u, f = this,
                g = f.chart,
                m = f.scrollbarHeight,
                x = f.xAxis,
                v = x.pointRange || 0,
                y = x.navigatorAxis.fake ? g.xAxis[0] : x,
                b = f.navigatorEnabled,
                k = f.rendered,
                M = g.inverted,
                w = g.xAxis[0].minRange,
                S = g.xAxis[0].options.maxRange;
            if (!this.hasDragged || P(i)) {
                if (t = T(t - v / 2), e = T(e + v / 2), !C(t) || !C(e)) {
                    if (!k) return;
                    i = 0, o = L(x.width, y.width)
                }
                f.left = L(x.left, g.plotLeft + m + (M ? g.plotWidth : 0)), f.size = h = a = L(x.len, (M ? g.plotHeight : g.plotWidth) - 2 * m), s = M ? m : a + 2 * m, i = L(i, x.toPixels(t, !0)), o = L(o, x.toPixels(e, !0)), C(i) && Math.abs(i) !== 1 / 0 || (i = 0, o = s), d = x.toValue(i, !0), p = x.toValue(o, !0), (u = Math.abs(T(p - d))) < w ? this.grabbedLeft ? i = x.toPixels(p - w - v, !0) : this.grabbedRight && (o = x.toPixels(d + w + v, !0)) : P(S) && T(u - v) > S && (this.grabbedLeft ? i = x.toPixels(p - S - v, !0) : this.grabbedRight && (o = x.toPixels(d + S + v, !0))), f.zoomedMax = A(Math.max(i, o), 0, h), f.zoomedMin = A(f.fixedWidth ? f.zoomedMax - f.fixedWidth : Math.min(i, o), 0, h), f.range = f.zoomedMax - f.zoomedMin, h = Math.round(f.zoomedMax), l = Math.round(f.zoomedMin), b && (f.navigatorGroup.attr({
                    visibility: "visible"
                }), c = k && !f.hasDragged ? "animate" : "attr", f.drawMasks(l, h, M, c), f.drawOutline(l, h, M, c), f.navigatorOptions.handles.enabled && (f.drawHandle(l, 0, M, c), f.drawHandle(h, 1, M, c))), f.scrollbar && (M ? (n = f.top - m, r = f.left - m + (b || !y.opposite ? 0 : (y.titleOffset || 0) + y.axisTitleMargin), m = a + 2 * m) : (n = f.top + (b ? f.height : -m), r = f.left - m), f.scrollbar.position(r, n, s, m), f.scrollbar.setRange(f.zoomedMin / (a || 1), f.zoomedMax / (a || 1))), f.rendered = !0
            }
        }, E.prototype.addMouseEvents = function() {
            var t, e, i = this,
                o = i.chart,
                s = o.container,
                r = [];
            i.mouseMoveHandler = t = function(t) {
                i.onMouseMove(t)
            }, i.mouseUpHandler = e = function(t) {
                i.onMouseUp(t)
            }, (r = i.getPartsEvents("mousedown")).push(x(o.renderTo, "mousemove", t), x(s.ownerDocument, "mouseup", e)), a && (r.push(x(o.renderTo, "touchmove", t), x(s.ownerDocument, "touchend", e)), r.concat(i.getPartsEvents("touchstart"))), i.eventsToUnbind = r, i.series && i.series[0] && r.push(x(i.series[0].xAxis, "foundExtremes", function() {
                o.navigator.modifyNavigatorAxisExtremes()
            }))
        }, E.prototype.getPartsEvents = function(o) {
            var s = this,
                r = [];
            return ["shades", "handles"].forEach(function(i) {
                s[i].forEach(function(t, e) {
                    r.push(x(t.element, o, function(t) {
                        s[i + "Mousedown"](t, e)
                    }))
                })
            }), r
        }, E.prototype.shadesMousedown = function(t, e) {
            t = this.chart.pointer.normalize(t);
            var i, o, s, r, n = this,
                a = n.chart,
                l = n.xAxis,
                h = n.zoomedMin,
                c = n.left,
                d = n.size,
                p = n.range,
                u = t.chartX;
            a.inverted && (u = t.chartY, c = n.top), 1 === e ? (n.grabbedCenter = u, n.fixedWidth = p, n.dragOffset = u - h) : (r = u - c - p / 2, 0 === e ? r = Math.max(0, r) : 2 === e && d <= r + p && (r = d - p, n.reversedExtremes ? (r -= p, o = n.getUnionExtremes().dataMin) : i = n.getUnionExtremes().dataMax), r !== h && (n.fixedWidth = p, s = l.navigatorAxis.toFixedRange(r, r + p, o, i), P(s.min) && a.xAxis[0].setExtremes(Math.min(s.min, s.max), Math.max(s.min, s.max), !0, null, {
                trigger: "navigator"
            })))
        }, E.prototype.handlesMousedown = function(t, e) {
            t = this.chart.pointer.normalize(t);
            var i = this,
                o = i.chart,
                s = o.xAxis[0],
                r = i.reversedExtremes;
            0 === e ? (i.grabbedLeft = !0, i.otherHandlePos = i.zoomedMax, i.fixedExtreme = r ? s.min : s.max) : (i.grabbedRight = !0, i.otherHandlePos = i.zoomedMin, i.fixedExtreme = r ? s.max : s.min), o.fixedRange = null
        }, E.prototype.onMouseMove = function(t) {
            var e, i = this,
                o = i.chart,
                s = i.left,
                r = i.navigatorSize,
                n = i.range,
                a = i.dragOffset,
                l = o.inverted;
            t.touches && 0 === t.touches[0].pageX || (e = (t = o.pointer.normalize(t)).chartX, l && (s = i.top, e = t.chartY), i.grabbedLeft ? (i.hasDragged = !0, i.render(0, 0, e - s, i.otherHandlePos)) : i.grabbedRight ? (i.hasDragged = !0, i.render(0, 0, i.otherHandlePos, e - s)) : i.grabbedCenter && (i.hasDragged = !0, e < a ? e = a : r + a - n < e && (e = r + a - n), i.render(0, 0, e - a, e - a + n)), i.hasDragged && i.scrollbar && L(i.scrollbar.options.liveRedraw, h.svg && !c && !this.chart.isBoosting) && (t.DOMType = t.type, setTimeout(function() {
                i.onMouseUp(t)
            }, 0)))
        }, E.prototype.onMouseUp = function(t) {
            var e, i, o, s, r = this,
                n = r.chart,
                a = r.xAxis,
                l = r.scrollbar,
                h = t.DOMEvent || t,
                c = n.inverted,
                d = r.rendered && !r.hasDragged ? "animate" : "attr",
                p = Math.round(r.zoomedMax),
                u = Math.round(r.zoomedMin);
            (!r.hasDragged || l && l.hasDragged) && "scrollbar" !== t.trigger || (e = r.getUnionExtremes(), r.zoomedMin === r.otherHandlePos ? i = r.fixedExtreme : r.zoomedMax === r.otherHandlePos && (o = r.fixedExtreme), r.zoomedMax === r.size && (o = r.reversedExtremes ? e.dataMin : e.dataMax), 0 === r.zoomedMin && (i = r.reversedExtremes ? e.dataMax : e.dataMin), s = a.navigatorAxis.toFixedRange(r.zoomedMin, r.zoomedMax, i, o), P(s.min) && n.xAxis[0].setExtremes(Math.min(s.min, s.max), Math.max(s.min, s.max), !0, !r.hasDragged && null, {
                trigger: "navigator",
                triggerOp: "navigator-drag",
                DOMEvent: h
            })), "mousemove" !== t.DOMType && "touchmove" !== t.DOMType && (r.grabbedLeft = r.grabbedRight = r.grabbedCenter = r.fixedWidth = r.fixedExtreme = r.otherHandlePos = r.hasDragged = r.dragOffset = null), r.navigatorEnabled && (r.shades && r.drawMasks(u, p, c, d), r.outline && r.drawOutline(u, p, c, d), r.navigatorOptions.handles.enabled && Object.keys(r.handles).length === r.handles.length && (r.drawHandle(u, 0, c, d), r.drawHandle(p, 1, c, d)))
        }, E.prototype.removeEvents = function() {
            this.eventsToUnbind && (this.eventsToUnbind.forEach(function(t) {
                t()
            }), this.eventsToUnbind = void 0), this.removeBaseSeriesEvents()
        }, E.prototype.removeBaseSeriesEvents = function() {
            var t = this.baseSeries || [];
            this.navigatorEnabled && t[0] && (!1 !== this.navigatorOptions.adaptToUpdatedData && t.forEach(function(t) {
                k(t, "updatedData", this.updatedDataHandler)
            }, this), t[0].xAxis && k(t[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes))
        }, E.prototype.init = function(a) {
            var t = a.options,
                e = t.navigator,
                i = e.enabled,
                o = t.scrollbar,
                s = o.enabled,
                r = i ? e.height : 0,
                l = s ? o.height : 0;
            this.handles = [], this.shades = [], this.chart = a, this.setBaseSeries(), this.height = r, this.scrollbarHeight = l, this.scrollbarEnabled = s, this.navigatorEnabled = i, this.navigatorOptions = e, this.scrollbarOptions = o, this.outlineHeight = r + l, this.opposite = L(e.opposite, Boolean(!i && a.inverted));
            var n = this,
                h = n.baseSeries,
                c = a.xAxis.length,
                d = a.yAxis.length,
                p = h && h[0] && h[0].xAxis || a.xAxis[0] || {
                    options: {}
                };
            a.isDirtyBox = !0, n.navigatorEnabled ? (n.xAxis = new u(a, b({
                breaks: p.options.breaks,
                ordinal: p.options.ordinal
            }, e.xAxis, {
                id: "navigator-x-axis",
                yAxis: "navigator-y-axis",
                isX: !0,
                type: "datetime",
                index: c,
                isInternal: !0,
                offset: 0,
                keepOrdinalPadding: !0,
                startOnTick: !1,
                endOnTick: !1,
                minPadding: 0,
                maxPadding: 0,
                zoomEnabled: !1
            }, a.inverted ? {
                offsets: [l, 0, -l, 0],
                width: r
            } : {
                offsets: [0, -l, 0, l],
                height: r
            })), n.yAxis = new u(a, b(e.yAxis, {
                id: "navigator-y-axis",
                alignTicks: !1,
                offset: 0,
                index: d,
                isInternal: !0,
                zoomEnabled: !1
            }, a.inverted ? {
                width: r
            } : {
                height: r
            })), h || e.series.data ? n.updateNavigatorSeries(!1) : 0 === a.series.length && (n.unbindRedraw = x(a, "beforeRedraw", function() {
                0 < a.series.length && !n.series && (n.setBaseSeries(), n.unbindRedraw())
            })), n.reversedExtremes = a.inverted && !n.xAxis.reversed || !a.inverted && n.xAxis.reversed, n.renderElements(), n.addMouseEvents()) : (n.xAxis = {
                chart: a,
                navigatorAxis: {
                    fake: !0
                },
                translate: function(t, e) {
                    var i = a.xAxis[0],
                        o = i.getExtremes(),
                        s = i.len - 2 * l,
                        r = m("min", i.options.min, o.dataMin),
                        n = m("max", i.options.max, o.dataMax) - r;
                    return e ? t * n / s + r : s * (t - r) / n
                },
                toPixels: function(t) {
                    return this.translate(t)
                },
                toValue: function(t) {
                    return this.translate(t, !0)
                }
            }, n.xAxis.navigatorAxis.axis = n.xAxis, n.xAxis.navigatorAxis.toFixedRange = f.AdditionsClass.prototype.toFixedRange.bind(n.xAxis.navigatorAxis)), a.options.scrollbar.enabled && (a.scrollbar = n.scrollbar = new g(a.renderer, b(a.options.scrollbar, {
                margin: n.navigatorEnabled ? 0 : 10,
                vertical: a.inverted
            }), a), x(n.scrollbar, "changed", function(t) {
                var e = n.size,
                    i = e * this.to,
                    o = e * this.from;
                n.hasDragged = n.scrollbar.hasDragged, n.render(0, 0, o, i), (a.options.scrollbar.liveRedraw || "mousemove" !== t.DOMType && "touchmove" !== t.DOMType) && setTimeout(function() {
                    n.onMouseUp(t)
                })
            })), n.addBaseSeriesEvents(), n.addChartEvents()
        }, E.prototype.getUnionExtremes = function(t) {
            var e, i = this.chart.xAxis[0],
                o = this.xAxis,
                s = o.options,
                r = i.options;
            return t && null === i.dataMin || (e = {
                dataMin: L(s && s.min, m("min", r.min, i.dataMin, o.dataMin, o.min)),
                dataMax: L(s && s.max, m("max", r.max, i.dataMax, o.dataMax, o.max))
            }), e
        }, E.prototype.setBaseSeries = function(i, t) {
            var e = this.chart,
                o = this.baseSeries = [];
            i = i || e.options && e.options.navigator.baseSeries || (e.series.length ? r(e.series, function(t) {
                return !t.options.isInternal
            }).index : 0), (e.series || []).forEach(function(t, e) {
                t.options.isInternal || !t.options.showInNavigator && (e !== i && t.options.id !== i || !1 === t.options.showInNavigator) || o.push(t)
            }), this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(!0, t)
        }, E.prototype.updateNavigatorSeries = function(t, s) {
            var r, n, a, l = this,
                h = l.chart,
                c = l.baseSeries,
                d = l.navigatorOptions.series,
                p = {
                    enableMouseTracking: !1,
                    index: null,
                    linkedTo: null,
                    group: "nav",
                    padXAxis: !1,
                    xAxis: "navigator-x-axis",
                    yAxis: "navigator-y-axis",
                    showInLegend: !1,
                    stacking: void 0,
                    isInternal: !0,
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                },
                u = l.series = (l.series || []).filter(function(t) {
                    var e = t.baseSeries;
                    return !(c.indexOf(e) < 0 && (e && (k(e, "updatedData", l.updatedDataHandler), delete e.navigatorSeries), t.chart && t.destroy(), 1))
                });
            c && c.length && c.forEach(function(t) {
                var e, i = t.navigatorSeries,
                    o = v({
                        color: t.color,
                        visible: t.visible
                    }, y(d) ? w.navigator.series : d);
                i && !1 === l.navigatorOptions.adaptToUpdatedData || (p.name = "Navigator " + c.length, r = t.options || {}, a = r.navigatorOptions || {}, (n = b(r, p, o, a)).pointRange = L(o.pointRange, a.pointRange, w.plotOptions[n.type || "line"].pointRange), e = a.data || o.data, l.hasNavigatorData = l.hasNavigatorData || !!e, n.data = e || r.data && r.data.slice(0), i && i.options ? i.update(n, s) : (t.navigatorSeries = h.initSeries(n), t.navigatorSeries.baseSeries = t, u.push(t.navigatorSeries)))
            }), (!d.data || c && c.length) && !y(d) || (l.hasNavigatorData = !1, (d = M(d)).forEach(function(t, e) {
                p.name = "Navigator " + (u.length + 1), (n = b(w.navigator.series, {
                    color: h.series[e] && !h.series[e].options.isInternal && h.series[e].color || h.options.colors[e] || h.options.colors[0]
                }, p, t)).data = t.data, n.data && (l.hasNavigatorData = !0, u.push(h.initSeries(n)))
            })), t && this.addBaseSeriesEvents()
        }, E.prototype.addBaseSeriesEvents = function() {
            var e = this,
                t = e.baseSeries || [];
            t[0] && t[0].xAxis && x(t[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes), t.forEach(function(t) {
                x(t, "show", function() {
                    this.navigatorSeries && this.navigatorSeries.setVisible(!0, !1)
                }), x(t, "hide", function() {
                    this.navigatorSeries && this.navigatorSeries.setVisible(!1, !1)
                }), !1 !== this.navigatorOptions.adaptToUpdatedData && t.xAxis && x(t, "updatedData", this.updatedDataHandler), x(t, "remove", function() {
                    this.navigatorSeries && (s(e.series, this.navigatorSeries), P(this.navigatorSeries.options) && this.navigatorSeries.remove(!1), delete this.navigatorSeries)
                })
            }, this)
        }, E.prototype.getBaseSeriesMin = function(t) {
            return this.baseSeries.reduce(function(t, e) {
                return Math.min(t, e.xData ? e.xData[0] : t)
            }, t)
        }, E.prototype.modifyNavigatorAxisExtremes = function() {
            var t, e = this.xAxis;
            void 0 !== e.getExtremes && (!(t = this.getUnionExtremes(!0)) || t.dataMin === e.min && t.dataMax === e.max || (e.min = t.dataMin, e.max = t.dataMax))
        }, E.prototype.modifyBaseAxisExtremes = function() {
            var t, e, i = this,
                o = i.chart.navigator,
                s = i.getExtremes(),
                r = s.min,
                n = s.max,
                a = s.dataMin,
                l = s.dataMax,
                h = n - r,
                c = o.stickToMin,
                d = o.stickToMax,
                p = L(i.options.overscroll, 0),
                u = o.series && o.series[0],
                f = !!i.setExtremes;
            i.eventArgs && "rangeSelectorButton" === i.eventArgs.trigger || (c && (t = (e = a) + h), d && (t = l + p, c || (e = Math.max(a, t - h, o.getBaseSeriesMin(u && u.xData ? u.xData[0] : -Number.MAX_VALUE)))), f && (c || d) && C(e) && (i.min = i.userMin = e, i.max = i.userMax = t)), o.stickToMin = o.stickToMax = null
        }, E.prototype.updatedDataHandler = function() {
            var t = this.chart.navigator,
                e = this.navigatorSeries,
                i = t.getBaseSeriesMin(this.xData[0]);
            t.stickToMax = t.reversedExtremes ? 0 === Math.round(t.zoomedMin) : Math.round(t.zoomedMax) >= Math.round(t.size), t.stickToMin = C(this.xAxis.min) && this.xAxis.min <= i && (!this.chart.fixedRange || !t.stickToMax), e && !t.hasNavigatorData && (e.options.pointStart = this.xData[0], e.setData(this.options.data, !1, null, !1))
        }, E.prototype.addChartEvents = function() {
            this.eventsToUnbind || (this.eventsToUnbind = []), this.eventsToUnbind.push(x(this.chart, "redraw", function() {
                var t = this.navigator,
                    e = t && (t.baseSeries && t.baseSeries[0] && t.baseSeries[0].xAxis || this.xAxis[0]);
                e && t.render(e.min, e.max)
            }), x(this.chart, "getMargins", function() {
                var t = this.navigator,
                    e = t.opposite ? "plotTop" : "marginBottom";
                this.inverted && (e = t.opposite ? "marginRight" : "plotLeft"), this[e] = (this[e] || 0) + (t.navigatorEnabled || !this.inverted ? t.outlineHeight : 0) + t.navigatorOptions.margin
            }))
        }, E.prototype.destroy = function() {
            this.removeEvents(), this.xAxis && (s(this.chart.xAxis, this.xAxis), s(this.chart.axes, this.xAxis)), this.yAxis && (s(this.chart.yAxis, this.yAxis), s(this.chart.axes, this.yAxis)), (this.series || []).forEach(function(t) {
                t.destroy && t.destroy()
            }), ["series", "xAxis", "yAxis", "shades", "outline", "scrollbarTrack", "scrollbarRifles", "scrollbarGroup", "scrollbar", "navigatorGroup", "rendered"].forEach(function(t) {
                this[t] && this[t].destroy && this[t].destroy(), this[t] = null
            }, this), [this.handles].forEach(function(t) {
                o(t)
            }, this)
        }, E);

        function E(t) {
            this.baseSeries = void 0, this.chart = void 0, this.handles = void 0, this.height = void 0, this.left = void 0, this.navigatorEnabled = void 0, this.navigatorGroup = void 0, this.navigatorOptions = void 0, this.navigatorSeries = void 0, this.navigatorSize = void 0, this.opposite = void 0, this.outline = void 0, this.outlineHeight = void 0, this.range = void 0, this.rendered = void 0, this.shades = void 0, this.size = void 0, this.top = void 0, this.xAxis = void 0, this.yAxis = void 0, this.zoomedMax = void 0, this.zoomedMin = void 0, this.init(t)
        }
        return h.Navigator || (h.Navigator = S, f.compose(u), x(n, "beforeShowResetZoom", function() {
            var t = this.options,
                e = t.navigator,
                i = t.rangeSelector;
            if ((e && e.enabled || i && i.enabled) && (!c && "x" === t.chart.zoomType || c && "x" === t.chart.pinchType)) return !1
        }), x(n, "beforeRender", function() {
            var t = this.options;
            (t.navigator.enabled || t.scrollbar.enabled) && (this.scroller = this.navigator = new S(this))
        }), x(n, "afterSetChartSize", function() {
            var t, e, i, o, s = this.legend,
                r = this.navigator;
            r && (e = s && s.options, i = r.xAxis, o = r.yAxis, t = r.scrollbarHeight, this.inverted ? (r.left = r.opposite ? this.chartWidth - t - r.height : this.spacing[3] + t, r.top = this.plotTop + t) : (r.left = this.plotLeft + t, r.top = r.navigatorOptions.top || this.chartHeight - r.height - t - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (e && "bottom" === e.verticalAlign && e.enabled && !e.floating ? s.legendHeight + L(e.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0)), i && o && (this.inverted ? i.options.left = o.options.left = r.left : i.options.top = o.options.top = r.top, i.setAxisSize(), o.setAxisSize()))
        }), x(n, "update", function(t) {
            var e = t.options.navigator || {},
                i = t.options.scrollbar || {};
            this.navigator || this.scroller || !e.enabled && !i.enabled || (b(!0, this.options.navigator, e), b(!0, this.options.scrollbar, i), delete t.options.navigator, delete t.options.scrollbar)
        }), x(n, "afterUpdate", function(t) {
            this.navigator || this.scroller || !this.options.navigator.enabled && !this.options.scrollbar.enabled || (this.scroller = this.navigator = new S(this), L(t.redraw, !0) && this.redraw(t.animation))
        }), x(n, "afterAddSeries", function() {
            this.navigator && this.navigator.setBaseSeries(null, !1)
        }), x(l, "afterUpdate", function() {
            this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, !1)
        }), n.prototype.callbacks.push(function(t) {
            var e, i = t.navigator;
            i && t.xAxis[0] && (e = t.xAxis[0].getExtremes(), i.render(e.min, e.max))
        })), h.Navigator = S, h.Navigator
    }), e(t, "parts/OrdinalAxis.js", [t["parts/Axis.js"], t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, d, e) {
        var s = e.addEvent,
            k = e.css,
            L = e.defined,
            y = e.pick,
            E = e.timeUnits,
            i = d.Chart,
            o = d.Series,
            r = (n.prototype.getExtendedPositions = function() {
                var e, i, o = this,
                    t = o.axis,
                    s = t.constructor.prototype,
                    r = t.chart,
                    n = t.series[0].currentDataGrouping,
                    a = o.index,
                    l = n ? n.count + n.unitName : "raw",
                    h = t.options.overscroll,
                    c = t.getExtremes();
                return (a = a || (o.index = {}))[l] || ((e = {
                    series: [],
                    chart: r,
                    getExtremes: function() {
                        return {
                            min: c.dataMin,
                            max: c.dataMax + h
                        }
                    },
                    options: {
                        ordinal: !0
                    },
                    ordinal: {},
                    ordinal2lin: s.ordinal2lin,
                    val2lin: s.val2lin
                }).ordinal.axis = e, t.series.forEach(function(t) {
                    (i = {
                        xAxis: e,
                        xData: t.xData.slice(),
                        chart: r,
                        destroyGroupedData: d.noop,
                        getProcessedData: d.Series.prototype.getProcessedData
                    }).xData = i.xData.concat(o.getOverscrollPositions()), i.options = {
                        dataGrouping: n ? {
                            enabled: !0,
                            forced: !0,
                            approximation: "open",
                            units: [
                                [n.unitName, [n.count]]
                            ]
                        } : {
                            enabled: !1
                        }
                    }, t.processData.apply(i), e.series.push(i)
                }), t.beforeSetTickPositions.apply(e), a[l] = e.ordinal.positions), a[l]
            }, n.prototype.getGroupIntervalFactor = function(t, e, i) {
                this.axis;
                var o, s, r = i.processedXData,
                    n = r.length,
                    a = [],
                    l = this.groupIntervalFactor;
                if (!l) {
                    for (o = 0; o < n - 1; o++) a[o] = r[o + 1] - r[o];
                    a.sort(function(t, e) {
                        return t - e
                    }), s = a[Math.floor(n / 2)], t = Math.max(t, r[0]), e = Math.min(e, r[n - 1]), this.groupIntervalFactor = l = n * s / (e - t)
                }
                return l
            }, n.prototype.getOverscrollPositions = function() {
                var t = this.axis,
                    e = t.options.overscroll,
                    i = this.overscrollPointsRange,
                    o = [],
                    s = t.dataMax;
                if (L(i))
                    for (o.push(s); s <= t.dataMax + e;) s += i, o.push(s);
                return o
            }, n.prototype.postProcessTickInterval = function(t) {
                var e = this.axis,
                    i = this.slope,
                    o = i ? e.options.breaks ? e.closestPointRange || t : t / (i / e.closestPointRange) : t;
                return o
            }, n);

        function n(t) {
            this.index = {}, this.axis = t
        }
        var a = (l.compose = function(t, e, i) {
            t.keepProps.push("ordinal");
            var o = t.prototype;
            o.beforeSetTickPositions = function() {
                var i, o, t, e, s, r, n, a, l = this,
                    h = l.ordinal,
                    c = [],
                    d = !1,
                    p = l.getExtremes(),
                    u = p.min,
                    f = p.max,
                    g = l.isXAxis && !!l.options.breaks,
                    m = l.options.ordinal,
                    x = Number.MAX_VALUE,
                    v = l.chart.options.chart.ignoreHiddenSeries;
                if (m || g) {
                    if (l.series.forEach(function(t, e) {
                            if (o = [], (!v || !1 !== t.visible) && (!1 !== t.takeOrdinalPosition || g) && (c = c.concat(t.processedXData), i = c.length, c.sort(function(t, e) {
                                    return t - e
                                }), x = Math.min(x, y(t.closestPointRange, x)), i)) {
                                for (e = 0; e < i - 1;) c[e] !== c[e + 1] && o.push(c[e + 1]), e++;
                                o[0] !== c[0] && o.unshift(c[0]), c = o
                            }
                            t.isSeriesBoosting && (a = !0)
                        }), a && (c.length = 0), 2 < (i = c.length)) {
                        for (t = c[1] - c[0], n = i - 1; n-- && !d;) c[n + 1] - c[n] != t && (d = !0);
                        !l.options.keepOrdinalPadding && (c[0] - u > t || f - c[c.length - 1] > t) && (d = !0)
                    } else l.options.overscroll && (2 === i ? x = c[1] - c[0] : 1 === i ? (x = l.options.overscroll, c = [c[0], c[0] + x]) : x = h.overscrollPointsRange);
                    d ? (l.options.overscroll && (h.overscrollPointsRange = x, c = c.concat(h.getOverscrollPositions())), h.positions = c, e = l.ordinal2lin(Math.max(u, c[0]), !0), s = Math.max(l.ordinal2lin(Math.min(f, c[c.length - 1]), !0), 1), h.slope = r = (f - u) / (s - e), h.offset = u - e * r) : (h.overscrollPointsRange = y(l.closestPointRange, h.overscrollPointsRange), h.positions = l.ordinal.slope = h.offset = void 0)
                }
                l.isOrdinal = m && d, h.groupIntervalFactor = null
            }, t.prototype.getTimeTicks = function(t, e, i, o, s, r, n) {
                void 0 === s && (s = []), void 0 === r && (r = 0);
                var a, l, h, c, d, p, u = 0,
                    f = {},
                    g = [],
                    m = -Number.MAX_VALUE,
                    x = this.options.tickPixelInterval,
                    v = this.chart.time,
                    y = [];
                if (!this.options.ordinal && !this.options.breaks || !s || s.length < 3 || void 0 === e) return v.getTimeTicks.apply(v, arguments);
                for (d = s.length, a = 0; a < d; a++) {
                    if (p = a && s[a - 1] > i, s[a] < e && (u = a), a === d - 1 || s[a + 1] - s[a] > 5 * r || p) {
                        if (s[a] > m) {
                            for (l = v.getTimeTicks(t, s[u], s[a], o); l.length && l[0] <= m;) l.shift();
                            l.length && (m = l[l.length - 1]), y.push(g.length), g = g.concat(l)
                        }
                        u = a + 1
                    }
                    if (p) break
                }
                if (c = l.info, n && c.unitRange <= E.hour) {
                    for (a = g.length - 1, u = 1; u < a; u++) v.dateFormat("%d", g[u]) !== v.dateFormat("%d", g[u - 1]) && (f[g[u]] = "day", h = !0);
                    h && (f[g[0]] = "day"), c.higherRanks = f
                }
                if (c.segmentStarts = y, g.info = c, n && L(x)) {
                    for (var b, k, M, w, S, A = g.length, T = A, P = [], C = []; T--;) k = this.translate(g[T]), M && (C[T] = M - k), P[T] = M = k;
                    for (C.sort(), (w = C[Math.floor(C.length / 2)]) < .6 * x && (w = null), T = g[A - 1] > i ? A - 1 : A, M = void 0; T--;) k = P[T], S = Math.abs(M - k), M && S < .8 * x && (null === w || S < .8 * w) ? (f[g[T]] && !f[g[T + 1]] ? (b = T + 1, M = k) : b = T, g.splice(b, 1)) : M = k
                }
                return g
            }, o.lin2val = function(t, e) {
                var i = this.ordinal,
                    o = i.positions;
                if (o) {
                    var s, r, n = i.slope,
                        a = i.offset,
                        l = o.length - 1;
                    if (e) t < 0 ? t = o[0] : l < t ? t = o[l] : r = t - (l = Math.floor(t));
                    else
                        for (; l--;)
                            if ((s = n * l + a) <= t) {
                                r = (t - s) / (n * (l + 1) + a - s);
                                break
                            } return void 0 !== r && void 0 !== o[l] ? o[l] + (r ? r * (o[l + 1] - o[l]) : 0) : t
                }
                return t
            }, o.val2lin = function(t, e) {
                var i, o = this.ordinal,
                    s = o.positions;
                if (s) {
                    for (var r, n = s.length, a = n; a--;)
                        if (s[a] === t) {
                            r = a;
                            break
                        }
                    for (a = n - 1; a--;)
                        if (t > s[a] || 0 === a) {
                            r = a + (t - s[a]) / (s[a + 1] - s[a]);
                            break
                        }
                    i = e ? r : o.slope * (r || 0) + o.offset
                } else i = t;
                return i
            }, o.ordinal2lin = o.val2lin, s(t, "afterInit", function() {
                this.ordinal || (this.ordinal = new r(this))
            }), s(t, "foundExtremes", function() {
                var t = this;
                t.isXAxis && L(t.options.overscroll) && t.max === t.dataMax && (!t.chart.mouseIsDown || t.isInternal) && (!t.eventArgs || t.eventArgs && "navigator" !== t.eventArgs.trigger) && (t.max += t.options.overscroll, !t.isInternal && L(t.userMin) && (t.min += t.options.overscroll))
            }), s(t, "afterSetScale", function() {
                this.horiz && !this.isDirty && (this.isDirty = this.isOrdinal && this.chart.navigator && !this.chart.navigator.adaptToUpdatedData)
            }), s(e, "pan", function(t) {
                var e, i, o, s, r, n, a, l, h, c, d, p, u, f, g, m = this.xAxis[0],
                    x = m.options.overscroll,
                    v = t.originalEvent.chartX,
                    y = this.options.chart && this.options.chart.panning,
                    b = !1;
                y && "y" !== y.type && m.options.ordinal && m.series.length ? (e = this.mouseDownX, o = (i = m.getExtremes()).dataMax, s = i.min, r = i.max, a = this.hoverPoints, l = m.closestPointRange || m.ordinal && m.ordinal.overscrollPointsRange, h = (e - v) / (m.translationSlope * (m.ordinal.slope || l)), c = {
                    ordinal: {
                        positions: m.ordinal.getExtendedPositions()
                    }
                }, u = m.lin2val, f = m.val2lin, c.ordinal.positions ? 1 < Math.abs(h) && (a && a.forEach(function(t) {
                    t.setState()
                }), o > (d = (g = h < 0 ? (p = c, m.ordinal.positions ? m : c) : (p = m.ordinal.positions ? m : c, c)).ordinal.positions)[d.length - 1] && d.push(o), this.fixedRange = r - s, (n = m.navigatorAxis.toFixedRange(null, null, u.apply(p, [f.apply(p, [s, !0]) + h, !0]), u.apply(g, [f.apply(g, [r, !0]) + h, !0]))).min >= Math.min(i.dataMin, s) && n.max <= Math.max(o, r) + x && m.setExtremes(n.min, n.max, !0, !1, {
                    trigger: "pan"
                }), this.mouseDownX = v, k(this.container, {
                    cursor: "move"
                })) : b = !0) : b = !0, b || y && /y/.test(y.type) ? x && (m.max = m.dataMax + x) : t.preventDefault()
            }), s(i, "updatedData", function() {
                var t = this.xAxis;
                t && t.options.ordinal && delete t.ordinal.index
            })
        }, l);

        function l() {}
        return a.compose(t, i, o), a
    }), e(t, "modules/broken-axis.src.js", [t["parts/Axis.js"], t["parts/Globals.js"], t["parts/Utilities.js"], t["parts/Stacking.js"]], function(f, t, e, h) {
        var o = e.addEvent,
            i = e.find,
            g = e.fireEvent,
            s = e.isArray,
            c = e.isNumber,
            m = e.pick,
            r = t.Series,
            n = (x.isInBreak = function(t, e) {
                var i = t.repeat || 1 / 0,
                    o = t.from,
                    s = t.to - t.from,
                    r = o <= e ? (e - o) % i : i - (o - e) % i,
                    n = t.inclusive ? r <= s : r < s && 0 != r;
                return n
            }, x.lin2Val = function(t) {
                var e = this.brokenAxis,
                    i = e && e.breakArray;
                if (!i) return t;
                for (var o, s = t, r = 0; r < i.length && !((o = i[r]).from >= s); r++)(o.to < s || x.isInBreak(o, s)) && (s += o.len);
                return s
            }, x.val2Lin = function(t) {
                var e = this.brokenAxis,
                    i = e && e.breakArray;
                if (!i) return t;
                for (var o, s = t, r = 0; r < i.length; r++)
                    if ((o = i[r]).to <= t) s -= o.len;
                    else {
                        if (o.from >= t) break;
                        if (x.isInBreak(o, t)) {
                            s -= t - o.from;
                            break
                        }
                    }
                return s
            }, x.prototype.findBreakAt = function(e, t) {
                return i(t, function(t) {
                    return t.from < e && e < t.to
                })
            }, x.prototype.isInAnyBreak = function(t, e) {
                var i, o, s, r = this.axis,
                    n = r.options.breaks,
                    a = n && n.length;
                if (a) {
                    for (; a--;) x.isInBreak(n[a], t) && (i = !0, o = o || m(n[a].showPoints, !r.isXAxis));
                    s = i && e ? i && !o : i
                }
                return s
            }, x.prototype.setBreaks = function(t, e) {
                var p = this,
                    u = p.axis,
                    i = s(t) && !!t.length;
                u.isDirty = p.hasBreaks !== i, p.hasBreaks = i, u.options.breaks = u.userOptions.breaks = t, u.forceRedraw = !0, u.series.forEach(function(t) {
                    t.isDirty = !0
                }), i || u.val2lin !== x.val2Lin || (delete u.val2lin, delete u.lin2val), i && (u.userOptions.ordinal = !1, u.lin2val = x.lin2Val, u.val2lin = x.val2Lin, u.setExtremes = function(t, e, i, o, s) {
                    if (p.hasBreaks) {
                        for (var r, n = this.options.breaks; r = p.findBreakAt(t, n);) t = r.to;
                        for (; r = p.findBreakAt(e, n);) e = r.from;
                        e < t && (e = t)
                    }
                    f.prototype.setExtremes.call(this, t, e, i, o, s)
                }, u.setAxisTranslation = function(t) {
                    var e, i, o, s, r, n, a, l, h, c, d;
                    f.prototype.setAxisTranslation.call(this, t), p.unitLength = null, p.hasBreaks && (e = u.options.breaks || [], i = [], o = [], s = 0, a = u.userMin || u.min, l = u.userMax || u.max, h = m(u.pointRangePadding, 0), e.forEach(function(t) {
                        n = t.repeat || 1 / 0, x.isInBreak(t, a) && (a += t.to % n - a % n), x.isInBreak(t, l) && (l -= l % n - t.from % n)
                    }), e.forEach(function(t) {
                        for (c = t.from, n = t.repeat || 1 / 0; a < c - n;) c -= n;
                        for (; c < a;) c += n;
                        for (d = c; d < l; d += n) i.push({
                            value: d,
                            move: "in"
                        }), i.push({
                            value: d + (t.to - t.from),
                            move: "out",
                            size: t.breakSize
                        })
                    }), i.sort(function(t, e) {
                        return t.value === e.value ? ("in" === t.move ? 0 : 1) - ("in" === e.move ? 0 : 1) : t.value - e.value
                    }), r = 0, c = a, i.forEach(function(t) {
                        1 === (r += "in" === t.move ? 1 : -1) && "in" === t.move && (c = t.value), 0 === r && (o.push({
                            from: c,
                            to: t.value,
                            len: t.value - c - (t.size || 0)
                        }), s += t.value - c - (t.size || 0))
                    }), u.breakArray = p.breakArray = o, p.unitLength = l - a - s + h, g(u, "afterBreaks"), u.staticScale ? u.transA = u.staticScale : p.unitLength && (u.transA *= (l - u.min + h) / p.unitLength), h && (u.minPixelPadding = u.transA * u.minPointOffset), u.min = a, u.max = l)
                }), m(e, !0) && u.chart.redraw()
            }, x);

        function x(t) {
            this.hasBreaks = !1, this.axis = t
        }
        var a = (l.compose = function(t, e) {
            t.keepProps.push("brokenAxis");
            var i = r.prototype;
            i.drawBreaks = function(i, t) {
                var o, s, r, n, e, a = this,
                    l = a.points;
                i && i.brokenAxis && i.brokenAxis.hasBreaks && (e = i.brokenAxis, t.forEach(function(t) {
                    o = e && e.breakArray || [], s = i.isXAxis ? i.min : m(a.options.threshold, i.min), l.forEach(function(e) {
                        n = m(e["stack" + t.toUpperCase()], e[t]), o.forEach(function(t) {
                            c(s) && c(n) && (r = !1, s < t.from && n > t.to || s > t.from && n < t.from ? r = "pointBreak" : (s < t.from && n > t.from && n < t.to || s > t.from && n > t.to && n < t.from) && (r = "pointInBreak"), r && g(i, r, {
                                point: e,
                                brk: t
                            }))
                        })
                    })
                }))
            }, i.gappedPath = function() {
                var t = this.currentDataGrouping,
                    e = t && t.gapSize,
                    i = this.options.gapSize,
                    o = this.points.slice(),
                    s = o.length - 1,
                    r = this.yAxis;
                if (i && 0 < s) {
                    "value" !== this.options.gapUnit && (i *= this.basePointRange), e && i < e && e >= this.basePointRange && (i = e);
                    for (var n, a = void 0, l = void 0; s--;) l && !1 !== l.visible || (l = o[s + 1]), a = o[s], !1 !== l.visible && !1 !== a.visible && (l.x - a.x > i && (n = (a.x + l.x) / 2, o.splice(s + 1, 0, {
                        isNull: !0,
                        x: n
                    }), r.stacking && this.options.stacking && ((r.stacking.stacks[this.stackKey][n] = new h(r, r.options.stackLabels, !1, n, this.stack)).total = 0)), l = a)
                }
                return this.getGraphPath(o)
            }, o(t, "init", function() {
                this.brokenAxis || (this.brokenAxis = new n(this))
            }), o(t, "afterInit", function() {
                void 0 !== this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, !1)
            }), o(t, "afterSetTickPositions", function() {
                var t = this.brokenAxis;
                if (t && t.hasBreaks) {
                    for (var e = this.tickPositions, i = this.tickPositions.info, o = [], s = 0; s < e.length; s++) t.isInAnyBreak(e[s]) || o.push(e[s]);
                    this.tickPositions = o, this.tickPositions.info = i
                }
            }), o(t, "afterSetOptions", function() {
                this.brokenAxis && this.brokenAxis.hasBreaks && (this.options.ordinal = !1)
            }), o(e, "afterGeneratePoints", function() {
                var t = this.isDirty,
                    e = this.options.connectNulls,
                    i = this.points,
                    o = this.xAxis,
                    s = this.yAxis;
                if (t)
                    for (var r = i.length; r--;) {
                        var n = i[r],
                            a = !(null === n.y && !1 === e) && (o && o.brokenAxis && o.brokenAxis.isInAnyBreak(n.x, !0) || s && s.brokenAxis && s.brokenAxis.isInAnyBreak(n.y, !0));
                        n.visible = !a && !1 !== n.options.visible
                    }
            }), o(e, "afterRender", function() {
                this.drawBreaks(this.xAxis, ["x"]), this.drawBreaks(this.yAxis, m(this.pointArrayMap, ["y"]))
            })
        }, l);

        function l() {}
        return a.compose(f, r), a
    }), e(t, "masters/modules/broken-axis.src.js", [], function() {}), e(t, "parts/DataGrouping.js", [t["parts/DateTimeAxis.js"], t["parts/Globals.js"], t["parts/Point.js"], t["parts/Tooltip.js"], t["parts/Utilities.js"]], function(P, t, e, i, o) {
        function s(t, e, i, o) {
            var s, r, n, a, l, h, c, d = this,
                p = d.data,
                u = d.options && d.options.data,
                f = [],
                g = [],
                m = [],
                x = t.length,
                v = !!e,
                y = [],
                b = d.pointArrayMap,
                k = b && b.length,
                M = ["x"].concat(b || ["y"]),
                w = 0,
                S = 0;
            for (a = "function" == typeof(c = o) ? c : D[c] ? D[c] : D[d.getDGApproximation && d.getDGApproximation() || "average"], k ? b.forEach(function() {
                    y.push([])
                }) : y.push([]), l = k || 1, h = 0; h <= x && !(t[h] >= i[0]); h++);
            for (; h <= x; h++) {
                for (; void 0 !== i[w + 1] && t[h] >= i[w + 1] || h === x;) {
                    for (s = i[w], d.dataGroupInfo = {
                            start: d.cropStart + S,
                            length: y[0].length
                        }, n = a.apply(d, y), d.pointClass && !L(d.dataGroupInfo.options) && (d.dataGroupInfo.options = O(d.pointClass.prototype.optionsToObject.call({
                            series: d
                        }, d.options.data[d.cropStart + S])), M.forEach(function(t) {
                            delete d.dataGroupInfo.options[t]
                        })), void 0 !== n && (f.push(s), g.push(n), m.push(d.dataGroupInfo)), S = h, C = 0; C < l; C++) y[C].length = 0, y[C].hasNulls = !1;
                    if (w += 1, h === x) break
                }
                if (h === x) break;
                if (b)
                    for (var A, T = d.cropStart + h, P = p && p[T] || d.pointClass.prototype.applyOptions.apply({
                            series: d
                        }, [u[T]]), C = 0; C < k; C++) A = P[b[C]], E(A) ? y[C].push(A) : null === A && (y[C].hasNulls = !0);
                else r = v ? e[h] : null, E(r) ? y[0].push(r) : null === r && (y[0].hasNulls = !0)
            }
            return {
                groupedXData: f,
                groupedYData: g,
                groupMap: m
            }
        }
        var r = o.addEvent,
            n = o.arrayMax,
            a = o.arrayMin,
            l = o.correctFloat,
            L = o.defined,
            h = o.error,
            m = o.extend,
            x = o.format,
            E = o.isNumber,
            O = o.merge,
            C = o.pick,
            c = t.Axis,
            d = t.defaultPlotOptions,
            p = t.Series,
            D = t.approximations = {
                sum: function(t) {
                    var e, i = t.length;
                    if (!i && t.hasNulls) e = null;
                    else if (i)
                        for (e = 0; i--;) e += t[i];
                    return e
                },
                average: function(t) {
                    var e = t.length,
                        i = D.sum(t);
                    return E(i) && e && (i = l(i / e)), i
                },
                averages: function() {
                    var e = [];
                    return [].forEach.call(arguments, function(t) {
                        e.push(D.average(t))
                    }), void 0 === e[0] ? void 0 : e
                },
                open: function(t) {
                    return t.length ? t[0] : t.hasNulls ? null : void 0
                },
                high: function(t) {
                    return t.length ? n(t) : t.hasNulls ? null : void 0
                },
                low: function(t) {
                    return t.length ? a(t) : t.hasNulls ? null : void 0
                },
                close: function(t) {
                    return t.length ? t[t.length - 1] : t.hasNulls ? null : void 0
                },
                ohlc: function(t, e, i, o) {
                    if (t = D.open(t), e = D.high(e), i = D.low(i), o = D.close(o), E(t) || E(e) || E(i) || E(o)) return [t, e, i, o]
                },
                range: function(t, e) {
                    return t = D.low(t), e = D.high(e), E(t) || E(e) ? [t, e] : null === t && null === e ? null : void 0
                }
            },
            u = {
                approximations: D,
                groupData: s
            },
            B = p.prototype,
            I = B.processData,
            f = B.generatePoints,
            v = {
                groupPixelWidth: 2,
                dateTimeLabelFormats: {
                    millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                    second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                    minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                    day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                    month: ["%B %Y", "%B", "-%B %Y"],
                    year: ["%Y", "%Y", "-%Y"]
                }
            },
            g = {
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                arearange: {},
                column: {
                    groupPixelWidth: 10
                },
                columnrange: {
                    groupPixelWidth: 10
                },
                candlestick: {
                    groupPixelWidth: 10
                },
                ohlc: {
                    groupPixelWidth: 5
                }
            },
            z = t.defaultDataGroupingUnits = [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1]],
                ["week", [1]],
                ["month", [1, 3, 6]],
                ["year", null]
            ];
        return B.getDGApproximation = function() {
            return this.is("arearange") ? "range" : this.is("ohlc") ? "ohlc" : this.is("column") ? "sum" : "average"
        }, B.groupData = s, B.processData = function() {
            var t, e, i, o, s = this,
                r = s.chart,
                n = s.options.dataGrouping,
                a = !1 !== s.allowDG && n && C(n.enabled, r.options.isStock),
                l = s.visible || !r.options.chart.ignoreHiddenSeries,
                h = this.currentDataGrouping,
                c = !1;
            if (s.forceCrop = a, s.groupPixelWidth = null, s.hasProcessed = !0, a && !s.requireSorting && (s.requireSorting = c = !0), e = !1 === I.apply(s, arguments) || !a, c && (s.requireSorting = !1), !e) {
                s.destroyGroupedData();
                var d, p = n.groupAll ? s.xData : s.processedXData,
                    u = n.groupAll ? s.yData : s.processedYData,
                    f = r.plotSizeX,
                    g = s.xAxis,
                    m = g.options.ordinal,
                    x = s.groupPixelWidth = g.getGroupPixelWidth && g.getGroupPixelWidth();
                if (x) {
                    t = !0, s.isDirty = !0, s.points = null;
                    var v = g.getExtremes(),
                        y = v.min,
                        b = v.max,
                        k = x * (b - y) / f * (m && g.ordinal && g.ordinal.getGroupIntervalFactor(y, b, s) || 1),
                        M = g.getTimeTicks(P.AdditionsClass.prototype.normalizeTimeTickInterval(k, n.units || z), Math.min(y, p[0]), Math.max(b, p[p.length - 1]), g.options.startOfWeek, p, s.closestPointRange),
                        w = B.groupData.apply(s, [p, u, M, n.approximation]),
                        S = w.groupedXData,
                        A = w.groupedYData,
                        T = 0;
                    if (n.smoothed && S.length) {
                        for (S[d = S.length - 1] = Math.min(S[d], b); d-- && 0 < d;) S[d] += k / 2;
                        S[0] = Math.max(S[0], y)
                    }
                    for (d = 1; d < M.length; d++) M.info.segmentStarts && -1 !== M.info.segmentStarts.indexOf(d) || (T = Math.max(M[d] - M[d - 1], T));
                    (i = M.info).gapSize = T, s.closestPointRange = M.info.totalRange, s.groupMap = w.groupMap, L(S[0]) && S[0] < g.min && l && ((!L(g.options.min) && g.min <= g.dataMin || g.min === g.dataMin) && (g.min = Math.min(S[0], g.min)), g.dataMin = Math.min(S[0], g.dataMin)), n.groupAll && (S = (o = s.cropData(S, A, g.min, g.max, 1)).xData, A = o.yData), s.processedXData = S, s.processedYData = A
                } else s.groupMap = null;
                s.hasGroupedData = t, s.currentDataGrouping = i, s.preventGraphAnimation = (h && h.totalRange) !== (i && i.totalRange)
            }
        }, B.destroyGroupedData = function() {
            this.groupedData && (this.groupedData.forEach(function(t, e) {
                t && (this.groupedData[e] = t.destroy ? t.destroy() : null)
            }, this), this.groupedData.length = 0)
        }, B.generatePoints = function() {
            f.apply(this), this.destroyGroupedData(), this.groupedData = this.hasGroupedData ? this.points : null
        }, r(e, "update", function() {
            if (this.dataGroup) return h(24, !1, this.series.chart), !1
        }), r(i, "headerFormatter", function(t) {
            var e, i, o, s, r, n = this.chart,
                a = n.time,
                l = t.labelConfig,
                h = l.series,
                c = h.options,
                d = h.tooltipOptions,
                p = c.dataGrouping,
                u = d.xDateFormat,
                f = h.xAxis,
                g = d[(t.isFooter ? "footer" : "header") + "Format"];
            f && "datetime" === f.options.type && p && E(l.key) && (i = h.currentDataGrouping, o = p.dateTimeLabelFormats || v.dateTimeLabelFormats, i ? (s = o[i.unitName], 1 === i.count ? u = s[0] : (u = s[1], e = s[2])) : !u && o && (u = this.getXDateFormat(l, d, f)), r = a.dateFormat(u, l.key), e && (r += a.dateFormat(e, l.key + i.totalRange - 1)), h.chart.styledMode && (g = this.styledModeFormat(g)), t.text = x(g, {
                point: m(l.point, {
                    key: r
                }),
                series: h
            }, n), t.preventDefault())
        }), r(p, "destroy", B.destroyGroupedData), r(p, "afterSetOptions", function(t) {
            var e = t.options,
                i = this.type,
                o = this.chart.options.plotOptions,
                s = d[i].dataGrouping,
                r = this.useCommonDataGrouping && v;
            (g[i] || r) && (s = s || O(v, g[i]), e.dataGrouping = O(r, s, o.series && o.series.dataGrouping, o[i].dataGrouping, this.userOptions.dataGrouping))
        }), r(c, "afterSetScale", function() {
            this.series.forEach(function(t) {
                t.hasProcessed = !1
            })
        }), c.prototype.getGroupPixelWidth = function() {
            for (var t, e, i = this.series, o = i.length, s = 0, r = !1, n = o; n--;)(e = i[n].options.dataGrouping) && (s = Math.max(s, C(e.groupPixelWidth, v.groupPixelWidth)));
            for (n = o; n--;)(e = i[n].options.dataGrouping) && i[n].hasProcessed && (t = (i[n].processedXData || i[n].data).length, (i[n].groupPixelWidth || t > this.chart.plotSizeX / s || t && e.forced) && (r = !0));
            return r ? s : 0
        }, c.prototype.setDataGrouping = function(e, t) {
            var i;
            if (t = C(t, !0), e = e || {
                    forced: !1,
                    units: null
                }, this instanceof c)
                for (i = this.series.length; i--;) this.series[i].update({
                    dataGrouping: e
                }, !1);
            else this.chart.options.series.forEach(function(t) {
                t.dataGrouping = e
            }, !1);
            this.ordinal && (this.ordinal.slope = void 0), t && this.chart.redraw()
        }, t.dataGrouping = u
    }), e(t, "parts/OHLCSeries.js", [t["parts/Globals.js"], t["parts/Point.js"], t["parts/Utilities.js"]], function(t, e, i) {
        var o = i.seriesType,
            a = t.seriesTypes;
        o("ohlc", "column", {
            lineWidth: 1,
            tooltip: {
                pointFormat: '<span style="color:{point.color}">●</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
            },
            threshold: null,
            states: {
                hover: {
                    lineWidth: 3
                }
            },
            stickyTracking: !0
        }, {
            directTouch: !1,
            pointArrayMap: ["open", "high", "low", "close"],
            toYData: function(t) {
                return [t.open, t.high, t.low, t.close]
            },
            pointValKey: "close",
            pointAttrToOptions: {
                stroke: "color",
                "stroke-width": "lineWidth"
            },
            init: function() {
                a.column.prototype.init.apply(this, arguments), this.options.stacking = void 0
            },
            pointAttribs: function(t, e) {
                var i = a.column.prototype.pointAttribs.call(this, t, e),
                    o = this.options;
                return delete i.fill, !t.options.color && o.upColor && t.open < t.close && (i.stroke = o.upColor), i
            },
            translate: function() {
                var o = this,
                    s = o.yAxis,
                    r = !!o.modifyValue,
                    n = ["plotOpen", "plotHigh", "plotLow", "plotClose", "yBottom"];
                a.column.prototype.translate.apply(o), o.points.forEach(function(i) {
                    [i.open, i.high, i.low, i.close, i.low].forEach(function(t, e) {
                        null !== t && (r && (t = o.modifyValue(t)), i[n[e]] = s.toPixels(t, !0))
                    }), i.tooltipPos[1] = i.plotHigh + s.pos - o.chart.plotTop
                })
            },
            drawPoints: function() {
                function c(t, e, i) {
                    var o = t[0],
                        s = t[1];
                    "number" == typeof o[2] && (o[2] = Math.max(i + e, o[2])), "number" == typeof s[2] && (s[2] = Math.min(i - e, s[2]))
                }
                var d = this,
                    t = d.points,
                    p = d.chart;
                t.forEach(function(t) {
                    var e, i, o, s, r, n, a, l = t.graphic,
                        h = !l;
                    void 0 !== t.plotY && (l || (t.graphic = l = p.renderer.path().add(d.group)), p.styledMode || l.attr(d.pointAttribs(t, t.selected && "select")), o = (a = l.strokeWidth()) % 2 / 2, n = Math.round(t.plotX) - o, s = Math.round(t.shapeArgs.width / 2), r = [
                        ["M", n, Math.round(t.yBottom)],
                        ["L", n, Math.round(t.plotHigh)]
                    ], null !== t.open && (e = Math.round(t.plotOpen) + o, r.push(["M", n, e], ["L", n - s, e]), c(r, a / 2, e)), null !== t.close && (i = Math.round(t.plotClose) + o, r.push(["M", n, i], ["L", n + s, i]), c(r, a / 2, i)), l[h ? "attr" : "animate"]({
                        d: r
                    }).addClass(t.getClassName(), !0))
                })
            },
            animate: null
        }, {
            getClassName: function() {
                return e.prototype.getClassName.call(this) + (this.open < this.close ? " highcharts-point-up" : " highcharts-point-down")
            }
        })
    }), e(t, "parts/CandlestickSeries.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var i = e.merge,
            o = e.seriesType,
            s = t.defaultPlotOptions,
            a = t.seriesTypes,
            r = {
                states: {
                    hover: {
                        lineWidth: 2
                    }
                },
                tooltip: s.ohlc.tooltip,
                threshold: null,
                lineColor: "#000000",
                lineWidth: 1,
                upColor: "#ffffff",
                stickyTracking: !0
            };
        o("candlestick", "ohlc", i(s.column, r), {
            pointAttribs: function(t, e) {
                var i, o = a.column.prototype.pointAttribs.call(this, t, e),
                    s = this.options,
                    r = t.open < t.close,
                    n = s.lineColor || this.color;
                return o["stroke-width"] = s.lineWidth, o.fill = t.options.color || r && s.upColor || this.color, o.stroke = t.options.lineColor || r && s.upLineColor || n, e && (i = s.states[e], o.fill = i.color || o.fill, o.stroke = i.lineColor || o.stroke, o["stroke-width"] = i.lineWidth || o["stroke-width"]), o
            },
            drawPoints: function() {
                var u = this,
                    t = u.points,
                    f = u.chart,
                    g = u.yAxis.reversed;
                t.forEach(function(t) {
                    var e, i, o, s, r, n, a, l, h, c, d = t.graphic,
                        p = !d;
                    void 0 !== t.plotY && (d || (t.graphic = d = f.renderer.path().add(u.group)), u.chart.styledMode || d.attr(u.pointAttribs(t, t.selected && "select")).shadow(u.options.shadow), a = d.strokeWidth() % 2 / 2, l = Math.round(t.plotX) - a, e = t.plotOpen, i = t.plotClose, o = Math.min(e, i), s = Math.max(e, i), c = Math.round(t.shapeArgs.width / 2), r = g ? s !== t.yBottom : Math.round(o) !== Math.round(t.plotHigh), n = g ? Math.round(o) !== Math.round(t.plotHigh) : s !== t.yBottom, o = Math.round(o) + a, s = Math.round(s) + a, (h = []).push(["M", l - c, s], ["L", l - c, o], ["L", l + c, o], ["L", l + c, s], ["Z"], ["M", l, o], ["L", l, r ? Math.round(g ? t.yBottom : t.plotHigh) : o], ["M", l, s], ["L", l, n ? Math.round(g ? t.plotHigh : t.yBottom) : s]), d[p ? "attr" : "animate"]({
                        d: h
                    }).addClass(t.getClassName(), !0))
                })
            }
        })
    }), e(t, "mixins/on-series.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(t, e) {
        var M = e.defined,
            w = e.stableSort,
            S = t.seriesTypes;
        return {
            getPlotBox: function() {
                return t.Series.prototype.getPlotBox.call(this.options.onSeries && this.chart.get(this.options.onSeries) || this)
            },
            translate: function() {
                S.column.prototype.translate.apply(this);
                var t, o, e, i, s, r, n, a = this,
                    l = a.options,
                    h = a.chart,
                    c = a.points,
                    d = c.length - 1,
                    p = l.onSeries,
                    u = p && h.get(p),
                    f = l.onKey || "y",
                    g = u && u.options.step,
                    m = u && u.points,
                    x = m && m.length,
                    v = h.inverted,
                    y = a.xAxis,
                    b = a.yAxis,
                    k = 0;
                if (u && u.visible && x)
                    for (k = (u.pointXOffset || 0) + (u.barW || 0) / 2, r = u.currentDataGrouping, i = m[x - 1].x + (r ? r.totalRange : 0), w(c, function(t, e) {
                            return t.x - e.x
                        }), f = "plot" + f[0].toUpperCase() + f.substr(1); x-- && c[d] && (e = m[x], (t = c[d]).y = e.y, !(e.x <= t.x && void 0 !== e[f] && (t.x <= i && (t.plotY = e[f], e.x < t.x && !g && (s = m[x + 1]) && void 0 !== s[f] && (n = (t.x - e.x) / (s.x - e.x), t.plotY += n * (s[f] - e[f]), t.y += n * (s.y - e.y))), x++, --d < 0))););
                c.forEach(function(t, e) {
                    var i;
                    t.plotX += k, void 0 !== t.plotY && !v || (0 <= t.plotX && t.plotX <= y.len ? v ? (t.plotY = y.translate(t.x, 0, 1, 0, 1), t.plotX = M(t.y) ? b.translate(t.y, 0, 0, 0, 1) : 0) : t.plotY = (y.opposite ? 0 : a.yAxis.len) + y.offset : t.shapeArgs = {}), (o = c[e - 1]) && o.plotX === t.plotX && (void 0 === o.stackIndex && (o.stackIndex = 0), i = o.stackIndex + 1), t.stackIndex = i
                }), this.onSeries = u
            }
        }
    }), e(t, "parts/FlagsSeries.js", [t["parts/Globals.js"], t["parts/Utilities.js"], t["mixins/on-series.js"]], function(b, t, e) {
        var o = t.addEvent,
            k = t.defined,
            i = t.isNumber,
            M = t.merge,
            w = t.objectEach,
            s = t.seriesType,
            S = t.wrap,
            r = b.noop,
            n = b.Renderer,
            a = b.Series,
            l = b.SVGRenderer,
            h = b.TrackerMixin,
            c = b.VMLRenderer,
            u = l.prototype.symbols;

        function d(p) {
            u[p + "pin"] = function(t, e, i, o, s) {
                var r, n, a, l, h, c = s && s.anchorX,
                    d = s && s.anchorY;
                return "circle" === p && i < o && (t -= Math.round((o - i) / 2), i = o), r = u[p](t, e, i, o), c && d && (n = c, "circle" === p ? n = t + i / 2 : (a = r[0], l = r[1], "M" === a[0] && "L" === l[0] && (n = (a[1] + l[1]) / 2)), h = d < e ? e : e + o, r.push(["M", n, h], ["L", c, d]), r = r.concat(u.circle(c - 1, d - 1, 2, 2))), r
            }
        }
        s("flags", "column", {
            pointRange: 0,
            allowOverlapX: !1,
            shape: "flag",
            stackDistance: 12,
            textAlign: "center",
            tooltip: {
                pointFormat: "{point.text}<br/>"
            },
            threshold: null,
            y: -30,
            fillColor: "#ffffff",
            lineWidth: 1,
            states: {
                hover: {
                    lineColor: "#000000",
                    fillColor: "#ccd6eb"
                }
            },
            style: {
                fontSize: "11px",
                fontWeight: "bold"
            }
        }, {
            sorted: !1,
            noSharedTooltip: !0,
            allowDG: !1,
            takeOrdinalPosition: !1,
            trackerGroups: ["markerGroup"],
            forceCrop: !0,
            init: a.prototype.init,
            pointAttribs: function(t, e) {
                var i = this.options,
                    o = t && t.color || this.color,
                    s = i.lineColor,
                    r = t && t.lineWidth,
                    n = t && t.fillColor || i.fillColor;
                return e && (n = i.states[e].fillColor, s = i.states[e].lineColor, r = i.states[e].lineWidth), {
                    fill: n || o,
                    stroke: s || o,
                    "stroke-width": r || i.lineWidth || 0
                }
            },
            translate: e.translate,
            getPlotBox: e.getPlotBox,
            drawPoints: function() {
                for (var t, e, i, o, s, r, n, a, l, h, c = this.points, d = this.chart, p = d.renderer, u = d.inverted, f = this.options, g = f.y, m = this.yAxis, x = {}, v = [], y = c.length; y--;) o = c[y], l = (u ? o.plotY : o.plotX) > this.xAxis.len, t = o.plotX, r = o.stackIndex, i = o.options.shape || f.shape, void 0 !== (e = o.plotY) && (e = o.plotY + g - (void 0 !== r && r * f.stackDistance)), o.anchorX = r ? void 0 : o.plotX, n = r ? void 0 : o.plotY, h = "flag" !== i, s = o.graphic, void 0 !== e && 0 <= t && !l ? (s || (s = o.graphic = p.label("", null, null, i, null, null, f.useHTML), d.styledMode || s.attr(this.pointAttribs(o)).css(M(f.style, o.style)), s.attr({
                    align: h ? "center" : "left",
                    width: f.width,
                    height: f.height,
                    "text-align": f.textAlign
                }).addClass("highcharts-point").add(this.markerGroup), o.graphic.div && (o.graphic.div.point = o), d.styledMode || s.shadow(f.shadow), s.isNew = !0), 0 < t && (t -= s.strokeWidth() % 2), a = {
                    y: e,
                    anchorY: n
                }, f.allowOverlapX && (a.x = t, a.anchorX = o.anchorX), s.attr({
                    text: o.options.title || f.title || "A"
                })[s.isNew ? "attr" : "animate"](a), f.allowOverlapX || (x[o.plotX] ? x[o.plotX].size = Math.max(x[o.plotX].size, s.width) : x[o.plotX] = {
                    align: h ? .5 : 0,
                    size: s.width,
                    target: t,
                    anchorX: t
                }), o.tooltipPos = [t, e + m.pos - d.plotTop]) : s && (o.graphic = s.destroy());
                f.allowOverlapX || (w(x, function(t) {
                    t.plotX = t.anchorX, v.push(t)
                }), b.distribute(v, u ? m.len : this.xAxis.len, 100), c.forEach(function(t) {
                    var e = t.graphic && x[t.plotX];
                    e && (t.graphic[t.graphic.isNew ? "attr" : "animate"]({
                        x: e.pos + e.align * e.size,
                        anchorX: t.anchorX
                    }), k(e.pos) ? t.graphic.isNew = !1 : (t.graphic.attr({
                        x: -9999,
                        anchorX: -9999
                    }), t.graphic.isNew = !0))
                })), f.useHTML && S(this.markerGroup, "on", function(t) {
                    return b.SVGElement.prototype.on.apply(t.apply(this, [].slice.call(arguments, 1)), [].slice.call(arguments, 1))
                })
            },
            drawTracker: function() {
                var i = this.points;
                h.drawTrackerPoint.apply(this), i.forEach(function(e) {
                    var t = e.graphic;
                    t && o(t.element, "mouseover", function() {
                        0 < e.stackIndex && !e.raised && (e._y = t.y, t.attr({
                            y: e._y - 8
                        }), e.raised = !0), i.forEach(function(t) {
                            t !== e && t.raised && t.graphic && (t.graphic.attr({
                                y: t._y
                            }), t.raised = !1)
                        })
                    })
                })
            },
            animate: function(t) {
                t && this.setClip()
            },
            setClip: function() {
                a.prototype.setClip.apply(this, arguments), !1 !== this.options.clip && this.sharedClipKey && this.markerGroup.clip(this.chart[this.sharedClipKey])
            },
            buildKDTree: r,
            invertGroups: r
        }, {
            isValid: function() {
                return i(this.y) || void 0 === this.y
            }
        }), u.flag = function(t, e, i, o, s) {
            var r = s && s.anchorX || t,
                n = s && s.anchorY || e,
                a = u.circle(r - 1, n - 1, 2, 2);
            return a.push(["M", r, n], ["L", t, e + o], ["L", t, e], ["L", t + i, e], ["L", t + i, e + o], ["L", t, e + o], ["Z"]), a
        }, d("circle"), d("square"), n === c && ["circlepin", "flag", "squarepin"].forEach(function(t) {
            c.prototype.symbols[t] = u[t]
        })
    }), e(t, "parts/RangeSelector.js", [t["parts/Globals.js"], t["parts/Utilities.js"]], function(f, t) {
        var y = t.addEvent,
            j = t.createElement,
            g = t.css,
            n = t.defined,
            o = t.destroyObjectProperties,
            s = t.discardElement,
            m = t.extend,
            a = t.fireEvent,
            C = t.isNumber,
            x = t.merge,
            r = t.objectEach,
            H = t.pick,
            v = t.pInt,
            b = t.splat,
            k = f.Axis,
            e = f.Chart,
            Y = f.defaultOptions;

        function l(t) {
            this.init(t)
        }
        m(Y, {
            rangeSelector: {
                verticalAlign: "top",
                buttonTheme: {
                    width: 28,
                    height: 18,
                    padding: 2,
                    zIndex: 7
                },
                floating: !1,
                x: 0,
                y: 0,
                height: void 0,
                inputPosition: {
                    align: "right",
                    x: 0,
                    y: 0
                },
                buttonPosition: {
                    align: "left",
                    x: 0,
                    y: 0
                },
                labelStyle: {
                    color: "#666666"
                }
            }
        }), Y.lang = x(Y.lang, {
            rangeSelectorZoom: "Zoom",
            rangeSelectorFrom: "From",
            rangeSelectorTo: "To"
        }), l.prototype = {
            clickButton: function(t, e) {
                var i, o, s, r, n, a, l, h = this.chart,
                    c = this.buttonOptions[t],
                    d = h.xAxis[0],
                    p = h.scroller && h.scroller.getUnionExtremes() || d || {},
                    u = p.dataMin,
                    f = p.dataMax,
                    g = d && Math.round(Math.min(d.max, H(f, d.max))),
                    m = c.type,
                    x = c._range,
                    v = c.dataGrouping;
                if (null !== u && null !== f) {
                    if (h.fixedRange = x, v && (this.forcedDataGrouping = !0, k.prototype.setDataGrouping.call(d || {
                            chart: this.chart
                        }, v, !1), this.frozenStates = c.preserveDataGrouping), "month" === m || "year" === m) d ? (a = {
                        range: c,
                        max: g,
                        chart: h,
                        dataMin: u,
                        dataMax: f
                    }, i = d.minFromRange.call(a), C(a.newMax) && (g = a.newMax)) : x = c;
                    else if (x) i = Math.max(g - x, u), g = Math.min(i + x, f);
                    else if ("ytd" === m) {
                        if (!d) return void(this.deferredYTDClick = t);
                        void 0 === f && (u = Number.MAX_VALUE, f = Number.MIN_VALUE, h.series.forEach(function(t) {
                            var e = t.xData;
                            u = Math.min(e[0], u), f = Math.max(e[e.length - 1], f)
                        }), e = !1), i = s = (l = this.getYTDExtremes(f, u, h.time.useUTC)).min, g = l.max
                    } else "all" === m && d && (i = u, g = f);
                    i += c._offsetMin, g += c._offsetMax, this.setSelected(t), d ? d.setExtremes(i, g, H(e, 1), null, {
                        trigger: "rangeSelectorButton",
                        rangeSelectorButton: c
                    }) : (o = b(h.options.xAxis)[0], n = o.range, o.range = x, r = o.min, o.min = s, y(h, "load", function() {
                        o.range = n, o.min = r
                    }))
                }
            },
            setSelected: function(t) {
                this.selected = this.options.selected = t
            },
            defaultButtons: [{
                type: "month",
                count: 1,
                text: "1m"
            }, {
                type: "month",
                count: 3,
                text: "3m"
            }, {
                type: "month",
                count: 6,
                text: "6m"
            }, {
                type: "ytd",
                text: "YTD"
            }, {
                type: "year",
                count: 1,
                text: "1y"
            }, {
                type: "all",
                text: "All"
            }],
            init: function(e) {
                function t() {
                    var t = i.minInput,
                        e = i.maxInput;
                    t && t.blur && a(t, "blur"), e && e.blur && a(e, "blur")
                }
                var i = this,
                    o = e.options.rangeSelector,
                    s = o.buttons || [].concat(i.defaultButtons),
                    r = o.selected;
                i.chart = e, i.options = o, i.buttons = [], i.buttonOptions = s, this.unMouseDown = y(e.container, "mousedown", t), this.unResize = y(e, "resize", t), s.forEach(i.computeButtonRange), void 0 !== r && s[r] && this.clickButton(r, !1), y(e, "load", function() {
                    e.xAxis && e.xAxis[0] && y(e.xAxis[0], "setExtremes", function(t) {
                        this.max - this.min !== e.fixedRange && "rangeSelectorButton" !== t.trigger && "updatedData" !== t.trigger && i.forcedDataGrouping && !i.frozenStates && this.setDataGrouping(!1, !1)
                    })
                })
            },
            updateButtonStates: function() {
                var m = this,
                    t = this.chart,
                    x = t.xAxis[0],
                    v = Math.round(x.max - x.min),
                    y = !x.hasVisibleSeries,
                    e = t.scroller && t.scroller.getUnionExtremes() || x,
                    b = e.dataMin,
                    k = e.dataMax,
                    i = m.getYTDExtremes(k, b, t.time.useUTC),
                    M = i.min,
                    w = i.max,
                    S = m.selected,
                    A = C(S),
                    T = m.options.allButtonsEnabled,
                    P = m.buttons;
                m.buttonOptions.forEach(function(t, e) {
                    var i, o, s = t._range,
                        r = t.type,
                        n = t.count || 1,
                        a = P[e],
                        l = 0,
                        h = t._offsetMax - t._offsetMin,
                        c = e === S,
                        d = k - b < s,
                        p = s < x.minRange,
                        u = !1,
                        f = !1,
                        g = s === v;
                    ("month" === r || "year" === r) && 864e5 * {
                        month: 28,
                        year: 365
                    }[r] * n - h <= v + 36e5 && v - 36e5 <= 864e5 * {
                        month: 31,
                        year: 366
                    }[r] * n + h ? g = !0 : "ytd" === r ? (g = w - M + h === v, u = !c) : "all" === r && (g = x.max - x.min >= k - b, f = !c && A && g), i = !T && (d || p || f || y), o = c && g || g && !A && !u || c && m.frozenStates, i ? l = 3 : o && (A = !0, l = 2), a.state !== l && (a.setState(l), 0 === l && S === e && m.setSelected(null))
                })
            },
            computeButtonRange: function(t) {
                var e = t.type,
                    i = t.count || 1,
                    o = {
                        millisecond: 1,
                        second: 1e3,
                        minute: 6e4,
                        hour: 36e5,
                        day: 864e5,
                        week: 6048e5
                    };
                o[e] ? t._range = o[e] * i : "month" !== e && "year" !== e || (t._range = 24 * {
                    month: 30,
                    year: 365
                }[e] * 36e5 * i), t._offsetMin = H(t.offsetMin, 0), t._offsetMax = H(t.offsetMax, 0), t._range += t._offsetMax - t._offsetMin
            },
            setInputValue: function(t, e) {
                var i = this.chart.options.rangeSelector,
                    o = this.chart.time,
                    s = this[t + "Input"];
                n(e) && (s.previousValue = s.HCTime, s.HCTime = e), s.value = o.dateFormat(i.inputEditDateFormat || "%Y-%m-%d", s.HCTime), this[t + "DateBox"].attr({
                    text: o.dateFormat(i.inputDateFormat || "%b %e, %Y", s.HCTime)
                })
            },
            showInput: function(t) {
                var e = this.inputGroup,
                    i = this[t + "DateBox"];
                g(this[t + "Input"], {
                    left: e.translateX + i.x + "px",
                    top: e.translateY + "px",
                    width: i.width - 2 + "px",
                    height: i.height - 2 + "px",
                    border: "2px solid silver"
                })
            },
            hideInput: function(t) {
                g(this[t + "Input"], {
                    border: 0,
                    width: "1px",
                    height: "1px"
                }), this.setInputValue(t)
            },
            drawInput: function(t) {
                var n, e, i, a = this,
                    l = a.chart,
                    o = l.renderer.style || {},
                    s = l.renderer,
                    h = l.options.rangeSelector,
                    r = Y.lang,
                    c = a.div,
                    d = "min" === t,
                    p = this.inputGroup;

                function u() {
                    var t = n.value,
                        e = (h.inputDateParser || Date.parse)(t),
                        i = l.xAxis[0],
                        o = l.scroller && l.scroller.xAxis ? l.scroller.xAxis : i,
                        s = o.dataMin,
                        r = o.dataMax;
                    e !== n.previousValue && (n.previousValue = e, C(e) || (e = t.split("-"), e = Date.UTC(v(e[0]), v(e[1]) - 1, v(e[2]))), C(e) && (l.time.useUTC || (e += 60 * (new Date).getTimezoneOffset() * 1e3), d ? e > a.maxInput.HCTime ? e = void 0 : e < s && (e = s) : e < a.minInput.HCTime ? e = void 0 : r < e && (e = r), void 0 !== e && i.setExtremes(d ? e : i.min, d ? i.max : e, void 0, void 0, {
                        trigger: "rangeSelectorInput"
                    })))
                }
                this[t + "Label"] = e = s.label(r[d ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).addClass("highcharts-range-label").attr({
                    padding: 2
                }).add(p), p.offset += e.width + 5, this[t + "DateBox"] = i = s.label("", p.offset).addClass("highcharts-range-input").attr({
                    padding: 2,
                    width: h.inputBoxWidth || 90,
                    height: h.inputBoxHeight || 17,
                    "text-align": "center"
                }).on("click", function() {
                    a.showInput(t), a[t + "Input"].focus()
                }), l.styledMode || i.attr({
                    stroke: h.inputBoxBorderColor || "#cccccc",
                    "stroke-width": 1
                }), i.add(p), p.offset += i.width + (d ? 10 : 0), this[t + "Input"] = n = j("input", {
                    name: t,
                    className: "highcharts-range-selector",
                    type: "text"
                }, {
                    top: l.plotTop + "px"
                }, c), l.styledMode || (e.css(x(o, h.labelStyle)), i.css(x({
                    color: "#333333"
                }, o, h.inputStyle)), g(n, m({
                    position: "absolute",
                    border: 0,
                    width: "1px",
                    height: "1px",
                    padding: 0,
                    textAlign: "center",
                    fontSize: o.fontSize,
                    fontFamily: o.fontFamily,
                    top: "-9999em"
                }, h.inputStyle))), n.onfocus = function() {
                    a.showInput(t)
                }, n.onblur = function() {
                    n === f.doc.activeElement && u(), a.hideInput(t), n.blur()
                }, n.onchange = u, n.onkeypress = function(t) {
                    13 === t.keyCode && u()
                }
            },
            getPosition: function() {
                var t = this.chart,
                    e = t.options.rangeSelector,
                    i = "top" === e.verticalAlign ? t.plotTop - t.axisOffset[0] : 0;
                return {
                    buttonTop: i + e.buttonPosition.y,
                    inputTop: i + e.inputPosition.y - 10
                }
            },
            getYTDExtremes: function(t, e, i) {
                var o = this.chart.time,
                    s = new o.Date(t),
                    r = o.get("FullYear", s),
                    n = i ? o.Date.UTC(r, 0, 1) : +new o.Date(r, 0, 1),
                    a = Math.max(e || 0, n),
                    s = s.getTime();
                return {
                    max: Math.min(t || s, s),
                    min: a
                }
            },
            render: function(t, e) {
                var i, o, s, r, n, a, l, h, c, d = this,
                    p = d.chart,
                    u = p.renderer,
                    f = p.container,
                    g = p.options,
                    m = g.exporting && !1 !== g.exporting.enabled && g.navigation && g.navigation.buttonOptions,
                    x = Y.lang,
                    v = d.div,
                    y = g.rangeSelector,
                    b = H(g.chart.style && g.chart.style.zIndex, 0) + 1,
                    k = y.floating,
                    M = d.buttons,
                    w = d.inputGroup,
                    S = y.buttonTheme,
                    A = y.buttonPosition,
                    T = y.inputPosition,
                    P = y.inputEnabled,
                    C = S && S.states,
                    L = p.plotLeft,
                    E = d.buttonGroup,
                    O = d.rendered,
                    D = d.options.verticalAlign,
                    B = p.legend,
                    I = B && B.options,
                    z = A.y,
                    R = T.y,
                    W = p.hasLoaded,
                    G = W ? "animate" : "attr",
                    N = 0,
                    X = 0;
                !1 !== y.enabled && (O || (d.group = o = u.g("range-selector-group").attr({
                    zIndex: 7
                }).add(), d.buttonGroup = E = u.g("range-selector-buttons").add(o), d.zoomText = u.text(x.rangeSelectorZoom, 0, 15).add(E), p.styledMode || (d.zoomText.css(y.labelStyle), S["stroke-width"] = H(S["stroke-width"], 0)), d.buttonOptions.forEach(function(o, s) {
                    M[s] = u.button(o.text, 0, 0, function(t) {
                        var e, i = o.events && o.events.click;
                        i && (e = i.call(o, t)), !1 !== e && d.clickButton(s), d.isActive = !0
                    }, S, C && C.hover, C && C.select, C && C.disabled).attr({
                        "text-align": "center"
                    }).add(E)
                }), !1 !== P && (d.div = v = j("div", null, {
                    position: "relative",
                    height: 0,
                    zIndex: b
                }), f.parentNode.insertBefore(v, f), d.inputGroup = w = u.g("input-group").add(o), w.offset = 0, d.drawInput("min"), d.drawInput("max"))), d.zoomText[G]({
                    x: H(L + A.x, L)
                }), i = H(L + A.x, L) + d.zoomText.getBBox().width + 5, d.buttonOptions.forEach(function(t, e) {
                    M[e][G]({
                        x: i
                    }), i += M[e].width + H(y.buttonSpacing, 5)
                }), L = p.plotLeft - p.spacing[3], d.updateButtonStates(), m && this.titleCollision(p) && "top" === D && "right" === A.align && A.y + E.getBBox().height - 12 < (m.y || 0) + m.height && (N = -40), n = A.x - p.spacing[3], "right" === A.align ? n += N - L : "center" === A.align && (n -= L / 2), E.align({
                    y: A.y,
                    width: E.getBBox().width,
                    align: A.align,
                    x: n
                }, !0, p.spacingBox), d.group.placed = W, d.buttonGroup.placed = W, !1 !== P && (N = m && this.titleCollision(p) && "top" === D && "right" === T.align && T.y - w.getBBox().height - 12 < (m.y || 0) + m.height + p.spacing[0] ? -40 : 0, "left" === T.align ? n = L : "right" === T.align && (n = -Math.max(p.axisOffset[1], -N)), w.align({
                    y: T.y,
                    width: w.getBBox().width,
                    align: T.align,
                    x: T.x + n - 2
                }, !0, p.spacingBox), a = w.alignAttr.translateX + w.alignOptions.x - N + w.getBBox().x + 2, l = w.alignOptions.width, h = E.alignAttr.translateX + E.getBBox().x, c = E.getBBox().width + 20, (T.align === A.align || a < h + c && h < a + l && z < R + w.getBBox().height) && w.attr({
                    translateX: w.alignAttr.translateX + (p.axisOffset[1] >= -N ? 0 : -N),
                    translateY: w.alignAttr.translateY + E.getBBox().height + 10
                }), d.setInputValue("min", t), d.setInputValue("max", e), d.inputGroup.placed = W), d.group.align({
                    verticalAlign: D
                }, !0, p.spacingBox), s = d.group.getBBox().height + 20, r = d.group.alignAttr.translateY, "bottom" === D && (X = r - (s = s + (I && "bottom" === I.verticalAlign && I.enabled && !I.floating ? B.legendHeight + H(I.margin, 10) : 0) - 20) - (k ? 0 : y.y) - (p.titleOffset ? p.titleOffset[2] : 0) - 10), "top" === D ? (k && (X = 0), p.titleOffset && p.titleOffset[0] && (X = p.titleOffset[0]), X += p.margin[0] - p.spacing[0] || 0) : "middle" === D && (R === z ? X = R < 0 ? r + void 0 : r : (R || z) && (R < 0 || z < 0 ? X -= Math.min(R, z) : X = r - s + void 0)), d.group.translate(y.x, y.y + Math.floor(X)), !1 !== P && (d.minInput.style.marginTop = d.group.translateY + "px", d.maxInput.style.marginTop = d.group.translateY + "px"), d.rendered = !0)
            },
            getHeight: function() {
                var t, e = this.options,
                    i = this.group,
                    o = e.inputPosition,
                    s = e.buttonPosition,
                    r = e.y,
                    n = s.y,
                    a = o.y,
                    l = 0;
                return e.height ? e.height : (l = i ? i.getBBox(!0).height + 13 + r : 0, t = Math.min(a, n), (a < 0 && n < 0 || 0 < a && 0 < n) && (l += Math.abs(t)), l)
            },
            titleCollision: function(t) {
                return !(t.options.title.text || t.options.subtitle.text)
            },
            update: function(t) {
                var e = this.chart;
                x(!0, e.options.rangeSelector, t), this.destroy(), this.init(e), e.rangeSelector.render()
            },
            destroy: function() {
                var i = this,
                    t = i.minInput,
                    e = i.maxInput;
                i.unMouseDown(), i.unResize(), o(i.buttons), t && (t.onfocus = t.onblur = t.onchange = null), e && (e.onfocus = e.onblur = e.onchange = null), r(i, function(t, e) {
                    t && "chart" !== e && (t.destroy ? t.destroy() : t.nodeType && s(this[e])), t !== l.prototype[e] && (i[e] = null)
                }, this)
            }
        }, k.prototype.minFromRange = function() {
            function t(t, e) {
                var i = "year" === r ? "FullYear" : "Month",
                    o = new a.Date(t),
                    s = a.get(i, o);
                return a.set(i, o, s + e), s === a.get(i, o) && a.set("Date", o, 0), o.getTime() - t
            }
            var e, i, o, s = this.range,
                r = s.type,
                n = this.max,
                a = this.chart.time;
            return C(s) ? (e = n - s, o = s) : (e = n + t(n, -s.count), this.chart && (this.chart.fixedRange = n - e)), i = H(this.dataMin, Number.MIN_VALUE), C(e) || (e = i), e <= i && (e = i, void 0 === o && (o = t(e, s.count)), this.newMax = Math.min(e + o, this.dataMax)), C(n) || (e = void 0), e
        }, f.RangeSelector || (y(e, "afterGetContainer", function() {
            this.options.rangeSelector.enabled && (this.rangeSelector = new l(this))
        }), y(e, "beforeRender", function() {
            var t, e = this.axes,
                i = this.rangeSelector;
            i && (C(i.deferredYTDClick) && (i.clickButton(i.deferredYTDClick), delete i.deferredYTDClick), e.forEach(function(t) {
                t.updateNames(), t.setScale()
            }), this.getAxisMargins(), i.render(), t = i.options.verticalAlign, i.options.floating || ("bottom" === t ? this.extraBottomMargin = !0 : "middle" !== t && (this.extraTopMargin = !0)))
        }), y(e, "update", function(t) {
            var e, i = t.options.rangeSelector,
                o = this.rangeSelector,
                s = this.extraBottomMargin,
                r = this.extraTopMargin;
            i && i.enabled && !n(o) && (this.options.rangeSelector.enabled = !0, this.rangeSelector = new l(this)), this.extraBottomMargin = !1, this.extraTopMargin = !1, o && (o.render(), e = i && i.verticalAlign || o.options && o.options.verticalAlign, o.options.floating || ("bottom" === e ? this.extraBottomMargin = !0 : "middle" !== e && (this.extraTopMargin = !0)), this.extraBottomMargin === s && this.extraTopMargin === r || (this.isDirtyBox = !0))
        }), y(e, "render", function() {
            var t, e = this.rangeSelector;
            e && !e.options.floating && (e.render(), "bottom" === (t = e.options.verticalAlign) ? this.extraBottomMargin = !0 : "middle" !== t && (this.extraTopMargin = !0))
        }), y(e, "getMargins", function() {
            var t, e = this.rangeSelector;
            e && (t = e.getHeight(), this.extraTopMargin && (this.plotTop += t), this.extraBottomMargin && (this.marginBottom += t))
        }), e.prototype.callbacks.push(function(t) {
            var e, i, o, s, r, n, a = t.rangeSelector;

            function l() {
                e = t.xAxis[0].getExtremes(), s = t.legend, n = null == a ? void 0 : a.options.verticalAlign, C(e.min) && a.render(e.min, e.max), a && s.display && "top" === n && n === s.options.verticalAlign && (r = x(t.spacingBox), "vertical" === s.options.layout ? r.y = t.plotTop : r.y += a.getHeight(), s.group.placed = !1, s.align(r))
            }
            a && (o = y(t.xAxis[0], "afterSetExtremes", function(t) {
                a.render(t.min, t.max)
            }), i = y(t, "redraw", l), l()), y(t, "destroy", function() {
                a && (i(), o())
            })
        }), f.RangeSelector = l)
    }), e(t, "parts/StockChart.js", [t["parts/Axis.js"], t["parts/Globals.js"], t["parts/Point.js"], t["parts/Utilities.js"]], function(t, c, e, i) {
        var o = i.addEvent,
            s = i.arrayMax,
            r = i.arrayMin,
            k = i.clamp,
            S = i.defined,
            A = i.extend,
            M = i.find,
            T = i.format,
            w = i.isNumber,
            P = i.isString,
            d = i.merge,
            C = i.pick,
            p = i.splat,
            u = c.Chart,
            n = (c.Renderer, c.Series),
            a = c.SVGRenderer,
            l = n.prototype,
            h = l.init,
            f = l.processData,
            g = e.prototype.tooltipFormatter;
        c.StockChart = c.stockChart = function(t, e, i) {
            var o, s = P(t) || t.nodeName,
                r = arguments[s ? 1 : 0],
                n = r,
                a = r.series,
                l = c.getOptions(),
                h = C(r.navigator && r.navigator.enabled, l.navigator.enabled, !0);
            return r.xAxis = p(r.xAxis || {}).map(function(t, e) {
                return d({
                    minPadding: 0,
                    maxPadding: 0,
                    overscroll: 0,
                    ordinal: !0,
                    title: {
                        text: null
                    },
                    labels: {
                        overflow: "justify"
                    },
                    showLastLabel: !0
                }, l.xAxis, l.xAxis && l.xAxis[e], t, {
                    type: "datetime",
                    categories: null
                }, h ? {
                    startOnTick: !1,
                    endOnTick: !1
                } : null)
            }), r.yAxis = p(r.yAxis || {}).map(function(t, e) {
                return o = C(t.opposite, !0), d({
                    labels: {
                        y: -2
                    },
                    opposite: o,
                    showLastLabel: !(!t.categories && "category" !== t.type),
                    title: {
                        text: null
                    }
                }, l.yAxis, l.yAxis && l.yAxis[e], t)
            }), r.series = null, (r = d({
                chart: {
                    panning: {
                        enabled: !0,
                        type: "x"
                    },
                    pinchType: "x"
                },
                navigator: {
                    enabled: h
                },
                scrollbar: {
                    enabled: C(l.scrollbar.enabled, !0)
                },
                rangeSelector: {
                    enabled: C(l.rangeSelector.enabled, !0)
                },
                title: {
                    text: null
                },
                tooltip: {
                    split: C(l.tooltip.split, !0),
                    crosshairs: !0
                },
                legend: {
                    enabled: !1
                }
            }, r, {
                isStock: !0
            })).series = n.series = a, s ? new u(t, r, i) : new u(r, e)
        }, o(n, "setOptions", function(t) {
            var e;
            this.chart.options.isStock && (this.is("column") || this.is("columnrange") ? e = {
                borderWidth: 0,
                shadow: !1
            } : this.is("scatter") || this.is("sma") || (e = {
                marker: {
                    enabled: !1,
                    radius: 2
                }
            }), e && (t.plotOptions[this.type] = d(t.plotOptions[this.type], e)))
        }), o(t, "autoLabelAlign", function(t) {
            var e, i = this.chart,
                o = this.options,
                s = i._labelPanes = i._labelPanes || {},
                r = this.options.labels;
            this.chart.options.isStock && "yAxis" === this.coll && !s[e = o.top + "," + o.height] && r.enabled && (15 === r.x && (r.x = 0), void 0 === r.align && (r.align = "right"), s[e] = this, t.align = "right", t.preventDefault())
        }), o(t, "destroy", function() {
            var t = this.chart,
                e = this.options && this.options.top + "," + this.options.height;
            e && t._labelPanes && t._labelPanes[e] === this && delete t._labelPanes[e]
        }), o(t, "getPlotLinePath", function(t) {
            var i, o, s, r, n, a, e, l, h, c = this,
                d = this.isLinked && !this.series ? this.linkedParent.series : this.series,
                p = c.chart,
                u = p.renderer,
                f = c.left,
                g = c.top,
                m = [],
                x = [],
                v = t.translatedValue,
                y = t.value,
                b = t.force;
            (p.options.isStock && !1 !== t.acrossPanes && "xAxis" === c.coll || "yAxis" === c.coll) && (t.preventDefault(), e = c.coll, l = "xAxis" === e ? "yAxis" : "xAxis", h = c.options[l], x = w(h) ? [p[l][h]] : P(h) ? [p.get(h)] : d.map(function(t) {
                return t[l]
            }), (c.isXAxis ? p.yAxis : p.xAxis).forEach(function(t) {
                var e, i;
                S(t.options.id) && -1 !== t.options.id.indexOf("navigator") || (e = t.isXAxis ? "yAxis" : "xAxis", i = S(t.options[e]) ? p[e][t.options[e]] : p[e][0], c === i && x.push(t))
            }), n = x.length ? [] : [c.isXAxis ? p.yAxis[0] : p.xAxis[0]], x.forEach(function(e) {
                -1 !== n.indexOf(e) || M(n, function(t) {
                    return t.pos === e.pos && t.len === e.len
                }) || n.push(e)
            }), a = C(v, c.translate(y, null, null, t.old)), w(a) && (c.horiz ? n.forEach(function(t) {
                var e;
                o = t.pos, r = o + t.len, i = s = Math.round(a + c.transB), "pass" !== b && (i < f || i > f + c.width) && (b ? i = s = k(i, f, f + c.width) : e = !0), e || m.push(["M", i, o], ["L", s, r])
            }) : n.forEach(function(t) {
                var e;
                i = t.pos, s = i + t.len, o = r = Math.round(g + c.height - a), "pass" !== b && (o < g || o > g + c.height) && (b ? o = r = k(o, g, g + c.height) : e = !0), e || m.push(["M", i, o], ["L", s, r])
            })), t.path = 0 < m.length ? u.crispPolyLine(m, t.lineWidth || 1) : null)
        }), a.prototype.crispPolyLine = function(t, e) {
            for (var i = 0; i < t.length; i += 2) {
                var o = t[i],
                    s = t[i + 1];
                o[1] === s[1] && (o[1] = s[1] = Math.round(o[1]) - e % 2 / 2), o[2] === s[2] && (o[2] = s[2] = Math.round(o[2]) + e % 2 / 2)
            }
            return t
        }, o(t, "afterHideCrosshair", function() {
            this.crossLabel && (this.crossLabel = this.crossLabel.hide())
        }), o(t, "afterDrawCrosshair", function(t) {
            var e, i, o, s, r, n, a, l, h, c, d, p, u, f, g, m, x, v, y, b, k, M, w;
            S(this.crosshair.label) && this.crosshair.label.enabled && this.cross && (e = this.chart, i = this.logarithmic, o = this.options.crosshair.label, s = this.horiz, r = this.opposite, n = this.left, a = this.top, l = this.crossLabel, p = o.format, u = "", m = "inside" === this.options.tickPosition, x = !1 !== this.crosshair.snap, y = 0, b = t.e || this.cross && this.cross.e, k = t.point, M = this.min, w = this.max, i && (M = i.lin2log(M), w = i.lin2log(w)), g = s ? "center" : r ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center", l || (l = this.crossLabel = e.renderer.label(null, null, null, o.shape || "callout").addClass("highcharts-crosshair-label" + (this.series[0] && " highcharts-color-" + this.series[0].colorIndex)).attr({
                align: o.align || g,
                padding: C(o.padding, 8),
                r: C(o.borderRadius, 3),
                zIndex: 2
            }).add(this.labelGroup), e.styledMode || l.attr({
                fill: o.backgroundColor || this.series[0] && this.series[0].color || "#666666",
                stroke: o.borderColor || "",
                "stroke-width": o.borderWidth || 0
            }).css(A({
                color: "#ffffff",
                fontWeight: "normal",
                fontSize: "11px",
                textAlign: "center"
            }, o.style))), c = s ? (h = x ? k.plotX + n : b.chartX, a + (r ? 0 : this.height)) : (h = r ? this.width + n : 0, x ? k.plotY + a : b.chartY), p || o.formatter || (this.dateTime && (u = "%b %d, %Y"), p = "{value" + (u ? ":" + u : "") + "}"), v = x ? k[this.isXAxis ? "x" : "y"] : this.toValue(s ? b.chartX : b.chartY), l.attr({
                text: p ? T(p, {
                    value: v
                }, e) : o.formatter.call(this, v),
                x: h,
                y: c,
                visibility: v < M || w < v ? "hidden" : "visible"
            }), d = l.getBBox(), s ? (m && !r || !m && r) && (c = l.y - d.height) : c = l.y - d.height / 2, f = s ? {
                left: n - d.x,
                right: n + this.width - d.x
            } : {
                left: "left" === this.labelAlign ? n : 0,
                right: "right" === this.labelAlign ? n + this.width : e.chartWidth
            }, l.translateX < f.left && (y = f.left - l.translateX), l.translateX + d.width >= f.right && (y = -(l.translateX + d.width - f.right)), l.attr({
                x: h + y,
                y: c,
                anchorX: s ? h : this.opposite ? 0 : e.chartWidth,
                anchorY: s ? this.opposite ? e.chartHeight : 0 : c + d.height / 2
            }))
        }), l.init = function() {
            h.apply(this, arguments), this.setCompare(this.options.compare)
        }, l.setCompare = function(o) {
            this.modifyValue = "value" === o || "percent" === o ? function(t, e) {
                var i = this.compareValue;
                return void 0 !== t && void 0 !== i ? ("value" === o ? t -= i : t = t / i * 100 - (100 === this.options.compareBase ? 0 : 100), e && (e.change = t), t) : 0
            } : null, this.userOptions.compare = o, this.chart.hasRendered && (this.isDirty = !0)
        }, l.processData = function(t) {
            var e, i, o, s, r, n = this,
                a = -1,
                l = !0 === n.options.compareStart ? 0 : 1;
            if (f.apply(this, arguments), n.xAxis && n.processedYData)
                for (i = n.processedXData, s = (o = n.processedYData).length, n.pointArrayMap && (a = n.pointArrayMap.indexOf(n.options.pointValKey || n.pointValKey || "y")), e = 0; e < s - l; e++)
                    if (r = o[e] && -1 < a ? o[e][a] : o[e], w(r) && i[e + l] >= n.xAxis.min && 0 !== r) {
                        n.compareValue = r;
                        break
                    }
        }, o(n, "afterGetExtremes", function(t) {
            var e, i = t.dataExtremes;
            this.modifyValue && i && (e = [this.modifyValue(i.dataMin), this.modifyValue(i.dataMax)], i.dataMin = r(e), i.dataMax = s(e))
        }), t.prototype.setCompare = function(e, t) {
            this.isXAxis || (this.series.forEach(function(t) {
                t.setCompare(e)
            }), C(t, !0) && this.chart.redraw())
        }, e.prototype.tooltipFormatter = function(t) {
            var e = this.series.chart.numberFormatter;
            return t = t.replace("{point.change}", (0 < this.change ? "+" : "") + e(this.change, C(this.series.tooltipOptions.changeDecimals, 2))), g.apply(this, [t])
        }, o(n, "render", function() {
            var t, e, i, o = this.chart;
            o.is3d && o.is3d() || o.polar || !this.xAxis || this.xAxis.isRadial || (i = this.yAxis.len, this.xAxis.axisLine && (t = o.plotTop + o.plotHeight - this.yAxis.pos - this.yAxis.len, e = Math.floor(this.xAxis.axisLine.strokeWidth() / 2), 0 <= t && (i -= Math.max(e - t, 0))), !this.clipBox && this.animate ? (this.clipBox = d(o.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = i) : o[this.sharedClipKey] && (o[this.sharedClipKey].animate({
                width: this.xAxis.len,
                height: i
            }), o[this.sharedClipKey + "m"] && o[this.sharedClipKey + "m"].animate({
                width: this.xAxis.len
            })))
        }), o(u, "update", function(t) {
            var e = t.options;
            "scrollbar" in e && this.navigator && (d(!0, this.options.scrollbar, e.scrollbar), this.navigator.update({}, !1), delete e.scrollbar)
        })
    }), e(t, "masters/modules/stock.src.js", [], function() {}), e(t, "masters/highstock.src.js", [t["masters/highcharts.src.js"]], function(t) {
        return t.product = "Highstock", t
    }), (t["masters/highstock.src.js"]._modules = t)["masters/highstock.src.js"]
});
//# sourceMappingURL=highstock.js.map