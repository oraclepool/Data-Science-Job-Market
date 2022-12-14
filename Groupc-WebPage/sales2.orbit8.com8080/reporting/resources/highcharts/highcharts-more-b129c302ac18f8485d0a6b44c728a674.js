/*
 Highcharts JS v8.1.0 (2020-05-05)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(c) {
    "object" === typeof module && module.exports ? (c["default"] = c, module.exports = c) : "function" === typeof define && define.amd ? define("highcharts/highcharts-more", ["highcharts"], function(B) {
        c(B);
        c.Highcharts = B;
        return c
    }) : c("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(c) {
    function B(l, a, d, b) {
        l.hasOwnProperty(a) || (l[a] = b.apply(null, d))
    }
    c = c ? c._modules : {};
    B(c, "parts-more/Pane.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(l, a) {
        function d(g, b, a) {
            return Math.sqrt(Math.pow(g -
                a[0], 2) + Math.pow(b - a[1], 2)) < a[2] / 2
        }
        var b = a.addEvent,
            r = a.extend,
            t = a.merge,
            y = a.pick,
            c = a.splat,
            x = l.CenteredSeriesMixin;
        l.Chart.prototype.collectionsWithUpdate.push("pane");
        a = function() {
            function g(g, b) {
                this.options = this.chart = this.center = this.background = void 0;
                this.coll = "pane";
                this.defaultOptions = {
                    center: ["50%", "50%"],
                    size: "85%",
                    innerSize: "0%",
                    startAngle: 0
                };
                this.defaultBackgroundOptions = {
                    shape: "circle",
                    borderWidth: 1,
                    borderColor: "#cccccc",
                    backgroundColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0,
                                "#ffffff"
                            ],
                            [1, "#e6e6e6"]
                        ]
                    },
                    from: -Number.MAX_VALUE,
                    innerRadius: 0,
                    to: Number.MAX_VALUE,
                    outerRadius: "105%"
                };
                this.init(g, b)
            }
            g.prototype.init = function(g, b) {
                this.chart = b;
                this.background = [];
                b.pane.push(this);
                this.setOptions(g)
            };
            g.prototype.setOptions = function(g) {
                this.options = t(this.defaultOptions, this.chart.angular ? {
                    background: {}
                } : void 0, g)
            };
            g.prototype.render = function() {
                var g = this.options,
                    b = this.options.background,
                    a = this.chart.renderer;
                this.group || (this.group = a.g("pane-group").attr({
                    zIndex: g.zIndex || 0
                }).add());
                this.updateCenter();
                if (b)
                    for (b = c(b), g = Math.max(b.length, this.background.length || 0), a = 0; a < g; a++) b[a] && this.axis ? this.renderBackground(t(this.defaultBackgroundOptions, b[a]), a) : this.background[a] && (this.background[a] = this.background[a].destroy(), this.background.splice(a, 1))
            };
            g.prototype.renderBackground = function(g, b) {
                var a = "animate",
                    k = {
                        "class": "highcharts-pane " + (g.className || "")
                    };
                this.chart.styledMode || r(k, {
                    fill: g.backgroundColor,
                    stroke: g.borderColor,
                    "stroke-width": g.borderWidth
                });
                this.background[b] ||
                    (this.background[b] = this.chart.renderer.path().add(this.group), a = "attr");
                this.background[b][a]({
                    d: this.axis.getPlotBandPath(g.from, g.to, g)
                }).attr(k)
            };
            g.prototype.updateCenter = function(g) {
                this.center = (g || this.axis || {}).center = x.getCenter.call(this)
            };
            g.prototype.update = function(g, b) {
                t(!0, this.options, g);
                t(!0, this.chart.options.pane, g);
                this.setOptions(this.options);
                this.render();
                this.chart.axes.forEach(function(g) {
                    g.pane === this && (g.pane = null, g.update({}, b))
                }, this)
            };
            return g
        }();
        l.Chart.prototype.getHoverPane =
            function(g) {
                var b = this,
                    a;
                g && b.pane.forEach(function(m) {
                    var k = g.chartX - b.plotLeft,
                        u = g.chartY - b.plotTop;
                    d(b.inverted ? u : k, b.inverted ? k : u, m.center) && (a = m)
                });
                return a
            };
        b(l.Chart, "afterIsInsidePlot", function(g) {
            this.polar && (g.isInsidePlot = this.pane.some(function(b) {
                return d(g.x, g.y, b.center)
            }))
        });
        b(l.Pointer, "beforeGetHoverData", function(g) {
            var b = this.chart;
            b.polar && (b.hoverPane = b.getHoverPane(g), g.filter = function(a) {
                return a.visible && !(!g.shared && a.directTouch) && y(a.options.enableMouseTracking, !0) && (!b.hoverPane ||
                    a.xAxis.pane === b.hoverPane)
            })
        });
        b(l.Pointer, "afterGetHoverData", function(g) {
            var b = this.chart;
            g.hoverPoint && g.hoverPoint.plotX && g.hoverPoint.plotY && b.hoverPane && !d(g.hoverPoint.plotX, g.hoverPoint.plotY, b.hoverPane.center) && (g.hoverPoint = void 0)
        });
        l.Pane = a;
        return l.Pane
    });
    B(c, "parts-more/HiddenAxis.js", [], function() {
        return function() {
            function l() {}
            l.init = function(a) {
                a.getOffset = function() {};
                a.redraw = function() {
                    this.isDirty = !1
                };
                a.render = function() {
                    this.isDirty = !1
                };
                a.createLabelCollector = function() {
                    return function() {}
                };
                a.setScale = function() {};
                a.setCategories = function() {};
                a.setTitle = function() {};
                a.isHidden = !0
            };
            return l
        }()
    });
    B(c, "parts-more/RadialAxis.js", [c["parts/Axis.js"], c["parts/Tick.js"], c["parts-more/HiddenAxis.js"], c["parts/Utilities.js"]], function(l, a, d, b) {
        var r = b.addEvent,
            t = b.correctFloat,
            y = b.defined,
            c = b.extend,
            x = b.fireEvent,
            g = b.merge,
            u = b.pick,
            m = b.pInt,
            C = b.relativeLength,
            k = b.wrap;
        b = function() {
            function b() {}
            b.init = function(b) {
                var a = l.prototype;
                b.setOptions = function(e) {
                    e = this.options = g(b.constructor.defaultOptions,
                        this.defaultPolarOptions, e);
                    e.plotBands || (e.plotBands = []);
                    x(this, "afterSetOptions")
                };
                b.getOffset = function() {
                    a.getOffset.call(this);
                    this.chart.axisOffset[this.side] = 0
                };
                b.getLinePath = function(e, h, f) {
                    e = this.pane.center;
                    var p = this.chart,
                        w = u(h, e[2] / 2 - this.offset);
                    "undefined" === typeof f && (f = this.horiz ? 0 : this.center && -this.center[3] / 2);
                    f && (w += f);
                    this.isCircular || "undefined" !== typeof h ? (h = this.chart.renderer.symbols.arc(this.left + e[0], this.top + e[1], w, w, {
                        start: this.startAngleRad,
                        end: this.endAngleRad,
                        open: !0,
                        innerR: 0
                    }), h.xBounds = [this.left + e[0]], h.yBounds = [this.top + e[1] - w]) : (h = this.postTranslate(this.angleRad, w), h = [
                        ["M", this.center[0] + p.plotLeft, this.center[1] + p.plotTop],
                        ["L", h.x, h.y]
                    ]);
                    return h
                };
                b.setAxisTranslation = function() {
                    a.setAxisTranslation.call(this);
                    this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : (this.center[2] - this.center[3]) / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0)
                };
                b.beforeSetTickPositions =
                    function() {
                        this.autoConnect = this.isCircular && "undefined" === typeof u(this.userMax, this.options.max) && t(this.endAngleRad - this.startAngleRad) === t(2 * Math.PI);
                        !this.isCircular && this.chart.inverted && this.max++;
                        this.autoConnect && (this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0)
                    };
                b.setAxisSize = function() {
                    a.setAxisSize.call(this);
                    if (this.isRadial) {
                        this.pane.updateCenter(this);
                        var e = this.center = c([], this.pane.center);
                        if (this.isCircular) this.sector = this.endAngleRad - this.startAngleRad;
                        else {
                            var h = this.postTranslate(this.angleRad, e[3] / 2);
                            e[0] = h.x - this.chart.plotLeft;
                            e[1] = h.y - this.chart.plotTop
                        }
                        this.len = this.width = this.height = (e[2] - e[3]) * u(this.sector, 1) / 2
                    }
                };
                b.getPosition = function(e, h) {
                    e = this.translate(e);
                    return this.postTranslate(this.isCircular ? e : this.angleRad, u(this.isCircular ? h : 0 > e ? 0 : e, this.center[2] / 2) - this.offset)
                };
                b.postTranslate = function(e, h) {
                    var f = this.chart,
                        p = this.center;
                    e = this.startAngleRad + e;
                    return {
                        x: f.plotLeft + p[0] + Math.cos(e) * h,
                        y: f.plotTop + p[1] + Math.sin(e) * h
                    }
                };
                b.getPlotBandPath =
                    function(e, h, f) {
                        var p = this.center,
                            w = this.startAngleRad,
                            v = p[2] / 2,
                            n = [u(f.outerRadius, "100%"), f.innerRadius, u(f.thickness, 10)],
                            g = Math.min(this.offset, 0),
                            b = /%$/;
                        var a = this.isCircular;
                        if ("polygon" === this.options.gridLineInterpolation) n = this.getPlotLinePath({
                            value: e
                        }).concat(this.getPlotLinePath({
                            value: h,
                            reverse: !0
                        }));
                        else {
                            e = Math.max(e, this.min);
                            h = Math.min(h, this.max);
                            a || (n[0] = this.translate(e), n[1] = this.translate(h));
                            n = n.map(function(f) {
                                b.test(f) && (f = m(f, 10) * v / 100);
                                return f
                            });
                            if ("circle" !== f.shape && a) e =
                                w + this.translate(e), h = w + this.translate(h);
                            else {
                                e = -Math.PI / 2;
                                h = 1.5 * Math.PI;
                                var k = !0
                            }
                            n[0] -= g;
                            n[2] -= g;
                            n = this.chart.renderer.symbols.arc(this.left + p[0], this.top + p[1], n[0], n[0], {
                                start: Math.min(e, h),
                                end: Math.max(e, h),
                                innerR: u(n[1], n[0] - n[2]),
                                open: k
                            });
                            a && (a = (h + e) / 2, g = this.left + p[0] + p[2] / 2 * Math.cos(a), n.xBounds = a > -Math.PI / 2 && a < Math.PI / 2 ? [g, this.chart.plotWidth] : [0, g], n.yBounds = [this.top + p[1] + p[2] / 2 * Math.sin(a)], n.yBounds[0] += a > -Math.PI && 0 > a || a > Math.PI ? -10 : 10)
                        }
                        return n
                    };
                b.getCrosshairPosition = function(e, h,
                    f) {
                    var p = e.value,
                        w = this.pane.center;
                    if (this.isCircular) {
                        if (y(p)) e.point && (v = e.point.shapeArgs || {}, v.start && (p = this.chart.inverted ? this.translate(e.point.rectPlotY, !0) : e.point.x));
                        else {
                            var v = e.chartX || 0;
                            var n = e.chartY || 0;
                            p = this.translate(Math.atan2(n - f, v - h) - this.startAngleRad, !0)
                        }
                        e = this.getPosition(p);
                        v = e.x;
                        n = e.y
                    } else y(p) || (v = e.chartX, n = e.chartY), y(v) && y(n) && (f = w[1] + this.chart.plotTop, p = this.translate(Math.min(Math.sqrt(Math.pow(v - h, 2) + Math.pow(n - f, 2)), w[2] / 2) - w[3] / 2, !0));
                    return [p, v || 0, n || 0]
                };
                b.getPlotLinePath =
                    function(e) {
                        var h = this,
                            f = h.pane.center,
                            p = h.chart,
                            w = p.inverted,
                            v = e.value,
                            n = e.reverse,
                            g = h.getPosition(v),
                            b = h.pane.options.background ? h.pane.options.background[0] || h.pane.options.background : {},
                            a = b.innerRadius || "0%",
                            k = b.outerRadius || "100%";
                        b = f[0] + p.plotLeft;
                        var m = f[1] + p.plotTop,
                            q = g.x,
                            d = g.y,
                            u = h.height;
                        g = f[3] / 2;
                        var A;
                        e.isCrosshair && (d = this.getCrosshairPosition(e, b, m), v = d[0], q = d[1], d = d[2]);
                        if (h.isCircular) v = Math.sqrt(Math.pow(q - b, 2) + Math.pow(d - m, 2)), n = "string" === typeof a ? C(a, 1) : a / v, p = "string" === typeof k ?
                            C(k, 1) : k / v, f && g && (v = g / v, n < v && (n = v), p < v && (p = v)), f = [
                                ["M", b + n * (q - b), m - n * (m - d)],
                                ["L", q - (1 - p) * (q - b), d + (1 - p) * (m - d)]
                            ];
                        else if ((v = h.translate(v)) && (0 > v || v > u) && (v = 0), "circle" === h.options.gridLineInterpolation) f = h.getLinePath(0, v, g);
                        else if (f = [], p[w ? "yAxis" : "xAxis"].forEach(function(f) {
                                f.pane === h.pane && (A = f)
                            }), A)
                            for (b = A.tickPositions, A.autoConnect && (b = b.concat([b[0]])), n && (b = b.slice().reverse()), v && (v += g), q = 0; q < b.length; q++) m = A.getPosition(b[q], v), f.push(q ? ["L", m.x, m.y] : ["M", m.x, m.y]);
                        return f
                    };
                b.getTitlePosition =
                    function() {
                        var e = this.center,
                            h = this.chart,
                            f = this.options.title;
                        return {
                            x: h.plotLeft + e[0] + (f.x || 0),
                            y: h.plotTop + e[1] - {
                                high: .5,
                                middle: .25,
                                low: 0
                            }[f.align] * e[2] + (f.y || 0)
                        }
                    };
                b.createLabelCollector = function() {
                    var e = this;
                    return function() {
                        if (e.isRadial && e.tickPositions && !0 !== e.options.labels.allowOverlap) return e.tickPositions.map(function(h) {
                            return e.ticks[h] && e.ticks[h].label
                        }).filter(function(h) {
                            return !!h
                        })
                    }
                }
            };
            b.compose = function(a, m) {
                r(a, "init", function(e) {
                    var h = this.chart,
                        f = h.inverted,
                        p = h.angular,
                        w = h.polar,
                        v = this.isXAxis,
                        n = this.coll,
                        E = p && v,
                        k, m = h.options;
                    e = e.userOptions.pane || 0;
                    e = this.pane = h.pane && h.pane[e];
                    if ("colorAxis" === n) this.isRadial = !1;
                    else {
                        if (p) {
                            if (E ? d.init(this) : b.init(this), k = !v) this.defaultPolarOptions = b.defaultRadialGaugeOptions
                        } else w && (b.init(this), this.defaultPolarOptions = (k = this.horiz) ? b.defaultCircularOptions : g("xAxis" === n ? a.defaultOptions : a.defaultYAxisOptions, b.defaultRadialOptions), f && "yAxis" === n && (this.defaultPolarOptions.stackLabels = a.defaultYAxisOptions.stackLabels));
                        p || w ? (this.isRadial = !0, m.chart.zoomType = null, this.labelCollector || (this.labelCollector = this.createLabelCollector()), this.labelCollector && h.labelCollectors.push(this.labelCollector)) : this.isRadial = !1;
                        e && k && (e.axis = this);
                        this.isCircular = k
                    }
                });
                r(a, "afterInit", function() {
                    var e = this.chart,
                        h = this.options,
                        f = this.pane,
                        p = f && f.options;
                    e.angular && this.isXAxis || !f || !e.angular && !e.polar || (this.angleRad = (h.angle || 0) * Math.PI / 180, this.startAngleRad = (p.startAngle - 90) * Math.PI / 180, this.endAngleRad = (u(p.endAngle, p.startAngle + 360) - 90) * Math.PI /
                        180, this.offset = h.offset || 0)
                });
                r(a, "autoLabelAlign", function(e) {
                    this.isRadial && (e.align = void 0, e.preventDefault())
                });
                r(a, "destroy", function() {
                    if (this.chart && this.chart.labelCollectors) {
                        var e = this.labelCollector ? this.chart.labelCollectors.indexOf(this.labelCollector) : -1;
                        0 <= e && this.chart.labelCollectors.splice(e, 1)
                    }
                });
                r(m, "afterGetPosition", function(e) {
                    this.axis.getPosition && c(e.pos, this.axis.getPosition(this.pos))
                });
                r(m, "afterGetLabelPosition", function(e) {
                    var h = this.axis,
                        f = this.label;
                    if (f) {
                        var p = f.getBBox(),
                            w = h.options.labels,
                            b = w.y,
                            n = 20,
                            g = w.align,
                            a = (h.translate(this.pos) + h.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360,
                            k = Math.round(a),
                            m = "end",
                            q = 0 > k ? k + 360 : k,
                            d = q,
                            A = 0,
                            r = 0,
                            t = null === w.y ? .3 * -p.height : 0;
                        if (h.isRadial) {
                            var l = h.getPosition(this.pos, h.center[2] / 2 + C(u(w.distance, -25), h.center[2] / 2, -h.center[2] / 2));
                            "auto" === w.rotation ? f.attr({
                                rotation: a
                            }) : null === b && (b = h.chart.renderer.fontMetrics(f.styles && f.styles.fontSize).b - p.height / 2);
                            null === g && (h.isCircular ? (p.width > h.len * h.tickInterval / (h.max - h.min) && (n = 0), g = a > n &&
                                a < 180 - n ? "left" : a > 180 + n && a < 360 - n ? "right" : "center") : g = "center", f.attr({
                                align: g
                            }));
                            if ("auto" === g && 2 === h.tickPositions.length && h.isCircular) {
                                90 < q && 180 > q ? q = 180 - q : 270 < q && 360 >= q && (q = 540 - q);
                                180 < d && 360 >= d && (d = 360 - d);
                                if (h.pane.options.startAngle === k || h.pane.options.startAngle === k + 360 || h.pane.options.startAngle === k - 360) m = "start";
                                g = -90 <= k && 90 >= k || -360 <= k && -270 >= k || 270 <= k && 360 >= k ? "start" === m ? "right" : "left" : "start" === m ? "left" : "right";
                                70 < d && 110 > d && (g = "center");
                                15 > q || 180 <= q && 195 > q ? A = .3 * p.height : 15 <= q && 35 >= q ? A = "start" ===
                                    m ? 0 : .75 * p.height : 195 <= q && 215 >= q ? A = "start" === m ? .75 * p.height : 0 : 35 < q && 90 >= q ? A = "start" === m ? .25 * -p.height : p.height : 215 < q && 270 >= q && (A = "start" === m ? p.height : .25 * -p.height);
                                15 > d ? r = "start" === m ? .15 * -p.height : .15 * p.height : 165 < d && 180 >= d && (r = "start" === m ? .15 * p.height : .15 * -p.height);
                                f.attr({
                                    align: g
                                });
                                f.translate(r, A + t)
                            }
                            e.pos.x = l.x + w.x;
                            e.pos.y = l.y + b
                        }
                    }
                });
                k(m.prototype, "getMarkPath", function(e, h, f, p, g, b, n) {
                    var w = this.axis;
                    w.isRadial ? (e = w.getPosition(this.pos, w.center[2] / 2 + p), h = ["M", h, f, "L", e.x, e.y]) : h = e.call(this, h,
                        f, p, g, b, n);
                    return h
                })
            };
            b.defaultCircularOptions = {
                gridLineWidth: 1,
                labels: {
                    align: null,
                    distance: 15,
                    x: 0,
                    y: null,
                    style: {
                        textOverflow: "none"
                    }
                },
                maxPadding: 0,
                minPadding: 0,
                showLastLabel: !1,
                tickLength: 0
            };
            b.defaultRadialGaugeOptions = {
                labels: {
                    align: "center",
                    x: 0,
                    y: null
                },
                minorGridLineWidth: 0,
                minorTickInterval: "auto",
                minorTickLength: 10,
                minorTickPosition: "inside",
                minorTickWidth: 1,
                tickLength: 10,
                tickPosition: "inside",
                tickWidth: 2,
                title: {
                    rotation: 0
                },
                zIndex: 2
            };
            b.defaultRadialOptions = {
                gridLineInterpolation: "circle",
                gridLineWidth: 1,
                labels: {
                    align: "right",
                    x: -3,
                    y: -2
                },
                showLastLabel: !1,
                title: {
                    x: 4,
                    text: null,
                    rotation: 90
                }
            };
            return b
        }();
        b.compose(l, a);
        return b
    });
    B(c, "parts-more/AreaRangeSeries.js", [c["parts/Globals.js"], c["parts/Point.js"], c["parts/Utilities.js"]], function(l, a, d) {
        var b = d.defined,
            r = d.extend,
            t = d.isArray,
            y = d.isNumber,
            c = d.pick;
        d = d.seriesType;
        var x = l.seriesTypes,
            g = l.Series.prototype,
            u = a.prototype;
        d("arearange", "area", {
            lineWidth: 1,
            threshold: null,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
            },
            trackByArea: !0,
            dataLabels: {
                align: null,
                verticalAlign: null,
                xLow: 0,
                xHigh: 0,
                yLow: 0,
                yHigh: 0
            }
        }, {
            pointArrayMap: ["low", "high"],
            pointValKey: "low",
            deferTranslatePolar: !0,
            toYData: function(g) {
                return [g.low, g.high]
            },
            highToXY: function(g) {
                var b = this.chart,
                    a = this.xAxis.postTranslate(g.rectPlotX, this.yAxis.len - g.plotHigh);
                g.plotHighX = a.x - b.plotLeft;
                g.plotHigh = a.y - b.plotTop;
                g.plotLowX = g.plotX
            },
            translate: function() {
                var g = this,
                    b = g.yAxis,
                    a = !!g.modifyValue;
                x.area.prototype.translate.apply(g);
                g.points.forEach(function(k) {
                    var d =
                        k.high,
                        q = k.plotY;
                    k.isNull ? k.plotY = null : (k.plotLow = q, k.plotHigh = b.translate(a ? g.modifyValue(d, k) : d, 0, 1, 0, 1), a && (k.yBottom = k.plotHigh))
                });
                this.chart.polar && this.points.forEach(function(b) {
                    g.highToXY(b);
                    b.tooltipPos = [(b.plotHighX + b.plotLowX) / 2, (b.plotHigh + b.plotLow) / 2]
                })
            },
            getGraphPath: function(g) {
                var b = [],
                    a = [],
                    d, m = x.area.prototype.getGraphPath;
                var q = this.options;
                var e = this.chart.polar && !1 !== q.connectEnds,
                    h = q.connectNulls,
                    f = q.step;
                g = g || this.points;
                for (d = g.length; d--;) {
                    var p = g[d];
                    p.isNull || e || h || g[d + 1] &&
                        !g[d + 1].isNull || a.push({
                            plotX: p.plotX,
                            plotY: p.plotY,
                            doCurve: !1
                        });
                    var w = {
                        polarPlotY: p.polarPlotY,
                        rectPlotX: p.rectPlotX,
                        yBottom: p.yBottom,
                        plotX: c(p.plotHighX, p.plotX),
                        plotY: p.plotHigh,
                        isNull: p.isNull
                    };
                    a.push(w);
                    b.push(w);
                    p.isNull || e || h || g[d - 1] && !g[d - 1].isNull || a.push({
                        plotX: p.plotX,
                        plotY: p.plotY,
                        doCurve: !1
                    })
                }
                g = m.call(this, g);
                f && (!0 === f && (f = "left"), q.step = {
                    left: "right",
                    center: "center",
                    right: "left"
                }[f]);
                b = m.call(this, b);
                a = m.call(this, a);
                q.step = f;
                q = [].concat(g, b);
                !this.chart.polar && a[0] && "M" === a[0][0] &&
                    (a[0] = ["L", a[0][1], a[0][2]]);
                this.graphPath = q;
                this.areaPath = g.concat(a);
                q.isArea = !0;
                q.xMap = g.xMap;
                this.areaPath.xMap = g.xMap;
                return q
            },
            drawDataLabels: function() {
                var b = this.points,
                    a = b.length,
                    k, d = [],
                    u = this.options.dataLabels,
                    q, e = this.chart.inverted;
                if (t(u))
                    if (1 < u.length) {
                        var h = u[0];
                        var f = u[1]
                    } else h = u[0], f = {
                        enabled: !1
                    };
                else h = r({}, u), h.x = u.xHigh, h.y = u.yHigh, f = r({}, u), f.x = u.xLow, f.y = u.yLow;
                if (h.enabled || this._hasPointLabels) {
                    for (k = a; k--;)
                        if (q = b[k]) {
                            var p = h.inside ? q.plotHigh < q.plotLow : q.plotHigh > q.plotLow;
                            q.y = q.high;
                            q._plotY = q.plotY;
                            q.plotY = q.plotHigh;
                            d[k] = q.dataLabel;
                            q.dataLabel = q.dataLabelUpper;
                            q.below = p;
                            e ? h.align || (h.align = p ? "right" : "left") : h.verticalAlign || (h.verticalAlign = p ? "top" : "bottom")
                        }
                    this.options.dataLabels = h;
                    g.drawDataLabels && g.drawDataLabels.apply(this, arguments);
                    for (k = a; k--;)
                        if (q = b[k]) q.dataLabelUpper = q.dataLabel, q.dataLabel = d[k], delete q.dataLabels, q.y = q.low, q.plotY = q._plotY
                }
                if (f.enabled || this._hasPointLabels) {
                    for (k = a; k--;)
                        if (q = b[k]) p = f.inside ? q.plotHigh < q.plotLow : q.plotHigh > q.plotLow,
                            q.below = !p, e ? f.align || (f.align = p ? "left" : "right") : f.verticalAlign || (f.verticalAlign = p ? "bottom" : "top");
                    this.options.dataLabels = f;
                    g.drawDataLabels && g.drawDataLabels.apply(this, arguments)
                }
                if (h.enabled)
                    for (k = a; k--;)
                        if (q = b[k]) q.dataLabels = [q.dataLabelUpper, q.dataLabel].filter(function(f) {
                            return !!f
                        });
                this.options.dataLabels = u
            },
            alignDataLabel: function() {
                x.column.prototype.alignDataLabel.apply(this, arguments)
            },
            drawPoints: function() {
                var a = this.points.length,
                    d;
                g.drawPoints.apply(this, arguments);
                for (d = 0; d < a;) {
                    var k =
                        this.points[d];
                    k.origProps = {
                        plotY: k.plotY,
                        plotX: k.plotX,
                        isInside: k.isInside,
                        negative: k.negative,
                        zone: k.zone,
                        y: k.y
                    };
                    k.lowerGraphic = k.graphic;
                    k.graphic = k.upperGraphic;
                    k.plotY = k.plotHigh;
                    b(k.plotHighX) && (k.plotX = k.plotHighX);
                    k.y = k.high;
                    k.negative = k.high < (this.options.threshold || 0);
                    k.zone = this.zones.length && k.getZone();
                    this.chart.polar || (k.isInside = k.isTopInside = "undefined" !== typeof k.plotY && 0 <= k.plotY && k.plotY <= this.yAxis.len && 0 <= k.plotX && k.plotX <= this.xAxis.len);
                    d++
                }
                g.drawPoints.apply(this, arguments);
                for (d = 0; d < a;) k = this.points[d], k.upperGraphic = k.graphic, k.graphic = k.lowerGraphic, r(k, k.origProps), delete k.origProps, d++
            },
            setStackedPoints: l.noop
        }, {
            setState: function() {
                var g = this.state,
                    a = this.series,
                    d = a.chart.polar;
                b(this.plotHigh) || (this.plotHigh = a.yAxis.toPixels(this.high, !0));
                b(this.plotLow) || (this.plotLow = this.plotY = a.yAxis.toPixels(this.low, !0));
                a.stateMarkerGraphic && (a.lowerStateMarkerGraphic = a.stateMarkerGraphic, a.stateMarkerGraphic = a.upperStateMarkerGraphic);
                this.graphic = this.upperGraphic;
                this.plotY = this.plotHigh;
                d && (this.plotX = this.plotHighX);
                u.setState.apply(this, arguments);
                this.state = g;
                this.plotY = this.plotLow;
                this.graphic = this.lowerGraphic;
                d && (this.plotX = this.plotLowX);
                a.stateMarkerGraphic && (a.upperStateMarkerGraphic = a.stateMarkerGraphic, a.stateMarkerGraphic = a.lowerStateMarkerGraphic, a.lowerStateMarkerGraphic = void 0);
                u.setState.apply(this, arguments)
            },
            haloPath: function() {
                var g = this.series.chart.polar,
                    b = [];
                this.plotY = this.plotLow;
                g && (this.plotX = this.plotLowX);
                this.isInside && (b = u.haloPath.apply(this,
                    arguments));
                this.plotY = this.plotHigh;
                g && (this.plotX = this.plotHighX);
                this.isTopInside && (b = b.concat(u.haloPath.apply(this, arguments)));
                return b
            },
            destroyElements: function() {
                ["lowerGraphic", "upperGraphic"].forEach(function(g) {
                    this[g] && (this[g] = this[g].destroy())
                }, this);
                this.graphic = null;
                return u.destroyElements.apply(this, arguments)
            },
            isValid: function() {
                return y(this.low) && y(this.high)
            }
        });
        ""
    });
    B(c, "parts-more/AreaSplineRangeSeries.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(l, a) {
        a = a.seriesType;
        a("areasplinerange", "arearange", null, {
            getPointSpline: l.seriesTypes.spline.prototype.getPointSpline
        });
        ""
    });
    B(c, "parts-more/ColumnRangeSeries.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(l, a) {
        var d = a.clamp,
            b = a.merge,
            r = a.pick;
        a = a.seriesType;
        var t = l.defaultPlotOptions,
            y = l.noop,
            c = l.seriesTypes.column.prototype;
        a("columnrange", "arearange", b(t.column, t.arearange, {
            pointRange: null,
            marker: null,
            states: {
                hover: {
                    halo: !1
                }
            }
        }), {
            translate: function() {
                var b = this,
                    g = b.yAxis,
                    a = b.xAxis,
                    m = a.startAngleRad,
                    t, k = b.chart,
                    l = b.xAxis.isRadial,
                    A = Math.max(k.chartWidth, k.chartHeight) + 999,
                    q;
                c.translate.apply(b);
                b.points.forEach(function(e) {
                    var h = e.shapeArgs,
                        f = b.options.minPointLength;
                    e.plotHigh = q = d(g.translate(e.high, 0, 1, 0, 1), -A, A);
                    e.plotLow = d(e.plotY, -A, A);
                    var p = q;
                    var w = r(e.rectPlotY, e.plotY) - q;
                    Math.abs(w) < f ? (f -= w, w += f, p -= f / 2) : 0 > w && (w *= -1, p -= w);
                    l ? (t = e.barX + m, e.shapeType = "arc", e.shapeArgs = b.polarArc(p + w, p, t, t + e.pointWidth)) : (h.height = w, h.y = p, e.tooltipPos = k.inverted ? [g.len + g.pos - k.plotLeft - p - w / 2, a.len + a.pos - k.plotTop -
                        h.x - h.width / 2, w
                    ] : [a.left - k.plotLeft + h.x + h.width / 2, g.pos - k.plotTop + p + w / 2, w])
                })
            },
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            drawGraph: y,
            getSymbol: y,
            crispCol: function() {
                return c.crispCol.apply(this, arguments)
            },
            drawPoints: function() {
                return c.drawPoints.apply(this, arguments)
            },
            drawTracker: function() {
                return c.drawTracker.apply(this, arguments)
            },
            getColumnMetrics: function() {
                return c.getColumnMetrics.apply(this, arguments)
            },
            pointAttribs: function() {
                return c.pointAttribs.apply(this, arguments)
            },
            animate: function() {
                return c.animate.apply(this,
                    arguments)
            },
            polarArc: function() {
                return c.polarArc.apply(this, arguments)
            },
            translate3dPoints: function() {
                return c.translate3dPoints.apply(this, arguments)
            },
            translate3dShapes: function() {
                return c.translate3dShapes.apply(this, arguments)
            }
        }, {
            setState: c.pointClass.prototype.setState
        });
        ""
    });
    B(c, "parts-more/ColumnPyramidSeries.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(l, a) {
        var d = a.clamp,
            b = a.pick;
        a = a.seriesType;
        var r = l.seriesTypes.column.prototype;
        a("columnpyramid", "column", {}, {
            translate: function() {
                var a =
                    this,
                    l = a.chart,
                    c = a.options,
                    x = a.dense = 2 > a.closestPointRange * a.xAxis.transA;
                x = a.borderWidth = b(c.borderWidth, x ? 0 : 1);
                var g = a.yAxis,
                    u = c.threshold,
                    m = a.translatedThreshold = g.getThreshold(u),
                    C = b(c.minPointLength, 5),
                    k = a.getColumnMetrics(),
                    z = k.width,
                    A = a.barW = Math.max(z, 1 + 2 * x),
                    q = a.pointXOffset = k.offset;
                l.inverted && (m -= .5);
                c.pointPadding && (A = Math.ceil(A));
                r.translate.apply(a);
                a.points.forEach(function(e) {
                    var h = b(e.yBottom, m),
                        f = 999 + Math.abs(h),
                        p = d(e.plotY, -f, g.len + f);
                    f = e.plotX + q;
                    var w = A / 2,
                        v = Math.min(p, h);
                    h = Math.max(p,
                        h) - v;
                    var n;
                    e.barX = f;
                    e.pointWidth = z;
                    e.tooltipPos = l.inverted ? [g.len + g.pos - l.plotLeft - p, a.xAxis.len - f - w, h] : [f + w, p + g.pos - l.plotTop, h];
                    p = u + (e.total || e.y);
                    "percent" === c.stacking && (p = u + (0 > e.y) ? -100 : 100);
                    p = g.toPixels(p, !0);
                    var E = (n = l.plotHeight - p - (l.plotHeight - m)) ? w * (v - p) / n : 0;
                    var k = n ? w * (v + h - p) / n : 0;
                    n = f - E + w;
                    E = f + E + w;
                    var r = f + k + w;
                    k = f - k + w;
                    var H = v - C;
                    var t = v + h;
                    0 > e.y && (H = v, t = v + h + C);
                    l.inverted && (r = l.plotWidth - v, n = p - (l.plotWidth - m), E = w * (p - r) / n, k = w * (p - (r - h)) / n, n = f + w + E, E = n - 2 * E, r = f - k + w, k = f + k + w, H = v, t = v + h - C, 0 > e.y && (t = v +
                        h + C));
                    e.shapeType = "path";
                    e.shapeArgs = {
                        x: n,
                        y: H,
                        width: E - n,
                        height: h,
                        d: [
                            ["M", n, H],
                            ["L", E, H],
                            ["L", r, t],
                            ["L", k, t],
                            ["Z"]
                        ]
                    }
                })
            }
        });
        ""
    });
    B(c, "parts-more/GaugeSeries.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(l, a) {
        var d = a.clamp,
            b = a.isNumber,
            r = a.merge,
            t = a.pick,
            c = a.pInt;
        a = a.seriesType;
        var D = l.Series,
            x = l.TrackerMixin;
        a("gauge", "line", {
            dataLabels: {
                borderColor: "#cccccc",
                borderRadius: 3,
                borderWidth: 1,
                crop: !1,
                defer: !1,
                enabled: !0,
                verticalAlign: "top",
                y: 15,
                zIndex: 2
            },
            dial: {},
            pivot: {},
            tooltip: {
                headerFormat: ""
            },
            showInLegend: !1
        }, {
            angular: !0,
            directTouch: !0,
            drawGraph: l.noop,
            fixedBox: !0,
            forceDL: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            translate: function() {
                var g = this.yAxis,
                    a = this.options,
                    m = g.center;
                this.generatePoints();
                this.points.forEach(function(u) {
                    var k = r(a.dial, u.dial),
                        l = c(t(k.radius, "80%")) * m[2] / 200,
                        A = c(t(k.baseLength, "70%")) * l / 100,
                        q = c(t(k.rearLength, "10%")) * l / 100,
                        e = k.baseWidth || 3,
                        h = k.topWidth || 1,
                        f = a.overshoot,
                        p = g.startAngleRad + g.translate(u.y, null, null, null, !0);
                    if (b(f) || !1 === a.wrap) f =
                        b(f) ? f / 180 * Math.PI : 0, p = d(p, g.startAngleRad - f, g.endAngleRad + f);
                    p = 180 * p / Math.PI;
                    u.shapeType = "path";
                    u.shapeArgs = {
                        d: k.path || [
                            ["M", -q, -e / 2],
                            ["L", A, -e / 2],
                            ["L", l, -h / 2],
                            ["L", l, h / 2],
                            ["L", A, e / 2],
                            ["L", -q, e / 2],
                            ["Z"]
                        ],
                        translateX: m[0],
                        translateY: m[1],
                        rotation: p
                    };
                    u.plotX = m[0];
                    u.plotY = m[1]
                })
            },
            drawPoints: function() {
                var g = this,
                    b = g.chart,
                    a = g.yAxis.center,
                    d = g.pivot,
                    k = g.options,
                    l = k.pivot,
                    A = b.renderer;
                g.points.forEach(function(a) {
                    var e = a.graphic,
                        h = a.shapeArgs,
                        f = h.d,
                        p = r(k.dial, a.dial);
                    e ? (e.animate(h), h.d = f) : a.graphic = A[a.shapeType](h).attr({
                        rotation: h.rotation,
                        zIndex: 1
                    }).addClass("highcharts-dial").add(g.group);
                    if (!b.styledMode) a.graphic[e ? "animate" : "attr"]({
                        stroke: p.borderColor || "none",
                        "stroke-width": p.borderWidth || 0,
                        fill: p.backgroundColor || "#000000"
                    })
                });
                d ? d.animate({
                    translateX: a[0],
                    translateY: a[1]
                }) : (g.pivot = A.circle(0, 0, t(l.radius, 5)).attr({
                    zIndex: 2
                }).addClass("highcharts-pivot").translate(a[0], a[1]).add(g.group), b.styledMode || g.pivot.attr({
                    "stroke-width": l.borderWidth || 0,
                    stroke: l.borderColor || "#cccccc",
                    fill: l.backgroundColor || "#000000"
                }))
            },
            animate: function(a) {
                var b =
                    this;
                a || b.points.forEach(function(a) {
                    var g = a.graphic;
                    g && (g.attr({
                        rotation: 180 * b.yAxis.startAngleRad / Math.PI
                    }), g.animate({
                        rotation: a.shapeArgs.rotation
                    }, b.options.animation))
                })
            },
            render: function() {
                this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup);
                D.prototype.render.call(this);
                this.group.clip(this.chart.clipRect)
            },
            setData: function(a, b) {
                D.prototype.setData.call(this, a, !1);
                this.processData();
                this.generatePoints();
                t(b, !0) && this.chart.redraw()
            },
            hasData: function() {
                return !!this.points.length
            },
            drawTracker: x && x.drawTrackerPoint
        }, {
            setState: function(a) {
                this.state = a
            }
        });
        ""
    });
    B(c, "parts-more/BoxPlotSeries.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(l, a) {
        var d = a.pick;
        a = a.seriesType;
        var b = l.noop,
            r = l.seriesTypes;
        a("boxplot", "column", {
            threshold: null,
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>'
            },
            whiskerLength: "50%",
            fillColor: "#ffffff",
            lineWidth: 1,
            medianWidth: 2,
            whiskerWidth: 2
        }, {
            pointArrayMap: ["low", "q1", "median", "q3", "high"],
            toYData: function(a) {
                return [a.low, a.q1, a.median, a.q3, a.high]
            },
            pointValKey: "high",
            pointAttribs: function() {
                return {}
            },
            drawDataLabels: b,
            translate: function() {
                var a = this.yAxis,
                    b = this.pointArrayMap;
                r.column.prototype.translate.apply(this);
                this.points.forEach(function(d) {
                    b.forEach(function(b) {
                        null !== d[b] && (d[b + "Plot"] = a.translate(d[b], 0, 1, 0, 1))
                    });
                    d.plotHigh = d.highPlot
                })
            },
            drawPoints: function() {
                var a =
                    this,
                    b = a.options,
                    r = a.chart,
                    l = r.renderer,
                    g, u, m, c, k, z, A = 0,
                    q, e, h, f, p = !1 !== a.doQuartiles,
                    w, v = a.options.whiskerLength;
                a.points.forEach(function(n) {
                    var E = n.graphic,
                        I = E ? "animate" : "attr",
                        L = n.shapeArgs,
                        H = {},
                        J = {},
                        t = {},
                        K = {},
                        G = n.color || a.color;
                    "undefined" !== typeof n.plotY && (q = Math.round(L.width), e = Math.floor(L.x), h = e + q, f = Math.round(q / 2), g = Math.floor(p ? n.q1Plot : n.lowPlot), u = Math.floor(p ? n.q3Plot : n.lowPlot), m = Math.floor(n.highPlot), c = Math.floor(n.lowPlot), E || (n.graphic = E = l.g("point").add(a.group), n.stem = l.path().addClass("highcharts-boxplot-stem").add(E),
                        v && (n.whiskers = l.path().addClass("highcharts-boxplot-whisker").add(E)), p && (n.box = l.path(void 0).addClass("highcharts-boxplot-box").add(E)), n.medianShape = l.path(void 0).addClass("highcharts-boxplot-median").add(E)), r.styledMode || (J.stroke = n.stemColor || b.stemColor || G, J["stroke-width"] = d(n.stemWidth, b.stemWidth, b.lineWidth), J.dashstyle = n.stemDashStyle || b.stemDashStyle || b.dashStyle, n.stem.attr(J), v && (t.stroke = n.whiskerColor || b.whiskerColor || G, t["stroke-width"] = d(n.whiskerWidth, b.whiskerWidth, b.lineWidth),
                        t.dashstyle = n.whiskerDashStyle || b.whiskerDashStyle || b.dashStyle, n.whiskers.attr(t)), p && (H.fill = n.fillColor || b.fillColor || G, H.stroke = b.lineColor || G, H["stroke-width"] = b.lineWidth || 0, H.dashstyle = n.boxDashStyle || b.boxDashStyle || b.dashStyle, n.box.attr(H)), K.stroke = n.medianColor || b.medianColor || G, K["stroke-width"] = d(n.medianWidth, b.medianWidth, b.lineWidth), K.dashstyle = n.medianDashStyle || b.medianDashStyle || b.dashStyle, n.medianShape.attr(K)), z = n.stem.strokeWidth() % 2 / 2, A = e + f + z, E = [
                        ["M", A, u],
                        ["L", A, m],
                        ["M",
                            A, g
                        ],
                        ["L", A, c]
                    ], n.stem[I]({
                        d: E
                    }), p && (z = n.box.strokeWidth() % 2 / 2, g = Math.floor(g) + z, u = Math.floor(u) + z, e += z, h += z, E = [
                        ["M", e, u],
                        ["L", e, g],
                        ["L", h, g],
                        ["L", h, u],
                        ["L", e, u],
                        ["Z"]
                    ], n.box[I]({
                        d: E
                    })), v && (z = n.whiskers.strokeWidth() % 2 / 2, m += z, c += z, w = /%$/.test(v) ? f * parseFloat(v) / 100 : v / 2, E = [
                        ["M", A - w, m],
                        ["L", A + w, m],
                        ["M", A - w, c],
                        ["L", A + w, c]
                    ], n.whiskers[I]({
                        d: E
                    })), k = Math.round(n.medianPlot), z = n.medianShape.strokeWidth() % 2 / 2, k += z, E = [
                        ["M", e, k],
                        ["L", h, k]
                    ], n.medianShape[I]({
                        d: E
                    }))
                })
            },
            setStackedPoints: b
        });
        ""
    });
    B(c, "parts-more/ErrorBarSeries.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(l, a) {
        a = a.seriesType;
        var d = l.noop,
            b = l.seriesTypes;
        a("errorbar", "boxplot", {
            color: "#000000",
            grouping: !1,
            linkedTo: ":previous",
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
            },
            whiskerWidth: null
        }, {
            type: "errorbar",
            pointArrayMap: ["low", "high"],
            toYData: function(b) {
                return [b.low, b.high]
            },
            pointValKey: "high",
            doQuartiles: !1,
            drawDataLabels: b.arearange ? function() {
                var a = this.pointValKey;
                b.arearange.prototype.drawDataLabels.call(this);
                this.data.forEach(function(b) {
                    b.y = b[a]
                })
            } : d,
            getColumnMetrics: function() {
                return this.linkedParent && this.linkedParent.columnMetrics || b.column.prototype.getColumnMetrics.call(this)
            }
        });
        ""
    });
    B(c, "parts-more/WaterfallSeries.js", [c["parts/Globals.js"], c["parts/Point.js"], c["parts/Utilities.js"], c["parts/Stacking.js"]], function(l, a, d, b) {
        var r = d.addEvent,
            c = d.arrayMax,
            y = d.arrayMin,
            D = d.correctFloat,
            x = d.isNumber,
            g = d.objectEach,
            u = d.pick;
        d = d.seriesType;
        var m = l.Axis,
            C = l.Chart,
            k = l.Series,
            z = l.seriesTypes;
        r(m, "afterInit", function() {
            this.isXAxis || (this.waterfallStacks = {
                changed: !1
            })
        });
        r(m, "afterBuildStacks", function() {
            this.waterfallStacks.changed = !1;
            delete this.waterfallStacks.alreadyChanged
        });
        r(C, "beforeRedraw", function() {
            for (var b = this.axes, a = this.series, e = a.length; e--;) a[e].options.stacking && (b.forEach(function(h) {
                h.isXAxis || (h.waterfallStacks.changed = !0)
            }), e = 0)
        });
        r(m, "afterRender", function() {
            var b = this.options.stackLabels;
            b && b.enabled && this.waterfallStacks && this.renderWaterfallStackTotals()
        });
        m.prototype.renderWaterfallStackTotals = function() {
            var a = this.waterfallStacks,
                d = this.stacking && this.stacking.stackTotalGroup,
                e = new b(this, this.options.stackLabels, !1, 0, void 0);
            this.dummyStackItem = e;
            g(a, function(h) {
                g(h, function(f) {
                    e.total = f.stackTotal;
                    f.label && (e.label = f.label);
                    b.prototype.render.call(e, d);
                    f.label = e.label;
                    delete e.label
                })
            });
            e.total = null
        };
        d("waterfall", "column", {
            dataLabels: {
                inside: !0
            },
            lineWidth: 1,
            lineColor: "#333333",
            dashStyle: "Dot",
            borderColor: "#333333",
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            }
        }, {
            pointValKey: "y",
            showLine: !0,
            generatePoints: function() {
                var b;
                z.column.prototype.generatePoints.apply(this);
                var a = 0;
                for (b = this.points.length; a < b; a++) {
                    var e = this.points[a];
                    var h = this.processedYData[a];
                    if (e.isIntermediateSum || e.isSum) e.y = D(h)
                }
            },
            translate: function() {
                var b = this.options,
                    a = this.yAxis,
                    e, h = u(b.minPointLength, 5),
                    f = h / 2,
                    p = b.threshold,
                    g = b.stacking,
                    v = a.waterfallStacks[this.stackKey];
                z.column.prototype.translate.apply(this);
                var n = e = p;
                var d = this.points;
                var k = 0;
                for (b = d.length; k < b; k++) {
                    var r = d[k];
                    var l = this.processedYData[k];
                    var m = r.shapeArgs;
                    var c = [0, l];
                    var t = r.y;
                    if (g) {
                        if (v) {
                            c = v[k];
                            if ("overlap" === g) {
                                var G = c.stackState[c.stateIndex--];
                                G = 0 <= t ? G : G - t;
                                Object.hasOwnProperty.call(c, "absolutePos") && delete c.absolutePos;
                                Object.hasOwnProperty.call(c, "absoluteNeg") && delete c.absoluteNeg
                            } else 0 <= t ? (G = c.threshold + c.posTotal, c.posTotal -= t) : (G = c.threshold + c.negTotal, c.negTotal -= t, G -= t), !c.posTotal && Object.hasOwnProperty.call(c, "absolutePos") && (c.posTotal = c.absolutePos, delete c.absolutePos), !c.negTotal &&
                                Object.hasOwnProperty.call(c, "absoluteNeg") && (c.negTotal = c.absoluteNeg, delete c.absoluteNeg);
                            r.isSum || (c.connectorThreshold = c.threshold + c.stackTotal);
                            a.reversed ? (l = 0 <= t ? G - t : G + t, t = G) : (l = G, t = G - t);
                            r.below = l <= u(p, 0);
                            m.y = a.translate(l, 0, 1, 0, 1);
                            m.height = Math.abs(m.y - a.translate(t, 0, 1, 0, 1))
                        }
                        if (t = a.dummyStackItem) t.x = k, t.label = v[k].label, t.setOffset(this.pointXOffset || 0, this.barW || 0, this.stackedYNeg[k], this.stackedYPos[k])
                    } else G = Math.max(n, n + t) + c[0], m.y = a.translate(G, 0, 1, 0, 1), r.isSum ? (m.y = a.translate(c[1],
                        0, 1, 0, 1), m.height = Math.min(a.translate(c[0], 0, 1, 0, 1), a.len) - m.y) : r.isIntermediateSum ? (0 <= t ? (l = c[1] + e, t = e) : (l = e, t = c[1] + e), a.reversed && (l ^= t, t ^= l, l ^= t), m.y = a.translate(l, 0, 1, 0, 1), m.height = Math.abs(m.y - Math.min(a.translate(t, 0, 1, 0, 1), a.len)), e += c[1]) : (m.height = 0 < l ? a.translate(n, 0, 1, 0, 1) - m.y : a.translate(n, 0, 1, 0, 1) - a.translate(n - l, 0, 1, 0, 1), n += l, r.below = n < u(p, 0)), 0 > m.height && (m.y += m.height, m.height *= -1);
                    r.plotY = m.y = Math.round(m.y) - this.borderWidth % 2 / 2;
                    m.height = Math.max(Math.round(m.height), .001);
                    r.yBottom =
                        m.y + m.height;
                    m.height <= h && !r.isNull ? (m.height = h, m.y -= f, r.plotY = m.y, r.minPointLengthOffset = 0 > r.y ? -f : f) : (r.isNull && (m.width = 0), r.minPointLengthOffset = 0);
                    m = r.plotY + (r.negative ? m.height : 0);
                    this.chart.inverted ? r.tooltipPos[0] = a.len - m : r.tooltipPos[1] = m
                }
            },
            processData: function(a) {
                var b = this.options,
                    e = this.yData,
                    h = b.data,
                    f = e.length,
                    p = b.threshold || 0,
                    g, v, n, d, m;
                for (m = v = g = n = d = 0; m < f; m++) {
                    var r = e[m];
                    var c = h && h[m] ? h[m] : {};
                    "sum" === r || c.isSum ? e[m] = D(v) : "intermediateSum" === r || c.isIntermediateSum ? (e[m] = D(g), g = 0) : (v +=
                        r, g += r);
                    n = Math.min(v, n);
                    d = Math.max(v, d)
                }
                k.prototype.processData.call(this, a);
                b.stacking || (this.dataMin = n + p, this.dataMax = d)
            },
            toYData: function(a) {
                return a.isSum ? "sum" : a.isIntermediateSum ? "intermediateSum" : a.y
            },
            updateParallelArrays: function(a, b) {
                k.prototype.updateParallelArrays.call(this, a, b);
                if ("sum" === this.yData[0] || "intermediateSum" === this.yData[0]) this.yData[0] = null
            },
            pointAttribs: function(a, b) {
                var e = this.options.upColor;
                e && !a.options.color && (a.color = 0 < a.y ? e : null);
                a = z.column.prototype.pointAttribs.call(this,
                    a, b);
                delete a.dashstyle;
                return a
            },
            getGraphPath: function() {
                return [
                    ["M", 0, 0]
                ]
            },
            getCrispPath: function() {
                var a = this.data,
                    b = this.yAxis,
                    e = a.length,
                    h = Math.round(this.graph.strokeWidth()) % 2 / 2,
                    f = Math.round(this.borderWidth) % 2 / 2,
                    p = this.xAxis.reversed,
                    g = this.yAxis.reversed,
                    v = this.options.stacking,
                    n = [],
                    d;
                for (d = 1; d < e; d++) {
                    var k = a[d].shapeArgs;
                    var m = a[d - 1];
                    var r = a[d - 1].shapeArgs;
                    var c = b.waterfallStacks[this.stackKey];
                    var l = 0 < m.y ? -r.height : 0;
                    c && r && k && (c = c[d - 1], v ? (c = c.connectorThreshold, l = Math.round(b.translate(c,
                        0, 1, 0, 1) + (g ? l : 0)) - h) : l = r.y + m.minPointLengthOffset + f - h, n.push(["M", (r.x || 0) + (p ? 0 : r.width || 0), l], ["L", (k.x || 0) + (p ? k.width || 0 : 0), l]));
                    !v && n.length && r && (0 > m.y && !g || 0 < m.y && g) && (n[n.length - 2][2] += r.height, n[n.length - 1][2] += r.height)
                }
                return n
            },
            drawGraph: function() {
                k.prototype.drawGraph.call(this);
                this.graph.attr({
                    d: this.getCrispPath()
                })
            },
            setStackedPoints: function() {
                function a(f, h, a, b) {
                    if (x)
                        for (a; a < x; a++) t.stackState[a] += b;
                    else t.stackState[0] = f, x = t.stackState.length;
                    t.stackState.push(t.stackState[x - 1] + h)
                }
                var b = this.options,
                    e = this.yAxis.waterfallStacks,
                    h = b.threshold,
                    f = h || 0,
                    p = f,
                    g = this.stackKey,
                    v = this.xData,
                    n = v.length,
                    d, k, m;
                this.yAxis.stacking.usePercentage = !1;
                var r = k = m = f;
                if (this.visible || !this.chart.options.chart.ignoreHiddenSeries) {
                    var c = e.changed;
                    (d = e.alreadyChanged) && 0 > d.indexOf(g) && (c = !0);
                    e[g] || (e[g] = {});
                    d = e[g];
                    for (var l = 0; l < n; l++) {
                        var u = v[l];
                        if (!d[u] || c) d[u] = {
                            negTotal: 0,
                            posTotal: 0,
                            stackTotal: 0,
                            threshold: 0,
                            stateIndex: 0,
                            stackState: [],
                            label: c && d[u] ? d[u].label : void 0
                        };
                        var t = d[u];
                        var y = this.yData[l];
                        0 <= y ? t.posTotal += y : t.negTotal += y;
                        var C = b.data[l];
                        u = t.absolutePos = t.posTotal;
                        var z = t.absoluteNeg = t.negTotal;
                        t.stackTotal = u + z;
                        var x = t.stackState.length;
                        C && C.isIntermediateSum ? (a(m, k, 0, m), m = k, k = h, f ^= p, p ^= f, f ^= p) : C && C.isSum ? (a(h, r, x), f = h) : (a(f, y, 0, r), C && (r += y, k += y));
                        t.stateIndex++;
                        t.threshold = f;
                        f += t.stackTotal
                    }
                    e.changed = !1;
                    e.alreadyChanged || (e.alreadyChanged = []);
                    e.alreadyChanged.push(g)
                }
            },
            getExtremes: function() {
                var a = this.options.stacking;
                if (a) {
                    var b = this.yAxis;
                    b = b.waterfallStacks;
                    var e = this.stackedYNeg = [];
                    var h = this.stackedYPos = [];
                    "overlap" === a ? g(b[this.stackKey], function(f) {
                        e.push(y(f.stackState));
                        h.push(c(f.stackState))
                    }) : g(b[this.stackKey], function(f) {
                        e.push(f.negTotal + f.threshold);
                        h.push(f.posTotal + f.threshold)
                    });
                    return {
                        dataMin: y(e),
                        dataMax: c(h)
                    }
                }
                return {
                    dataMin: this.dataMin,
                    dataMax: this.dataMax
                }
            }
        }, {
            getClassName: function() {
                var b = a.prototype.getClassName.call(this);
                this.isSum ? b += " highcharts-sum" : this.isIntermediateSum && (b += " highcharts-intermediate-sum");
                return b
            },
            isValid: function() {
                return x(this.y) ||
                    this.isSum || !!this.isIntermediateSum
            }
        });
        ""
    });
    B(c, "parts-more/PolygonSeries.js", [c["parts/Globals.js"], c["mixins/legend-symbol.js"], c["parts/Utilities.js"]], function(c, a, d) {
        d = d.seriesType;
        var b = c.Series,
            r = c.seriesTypes;
        d("polygon", "scatter", {
            marker: {
                enabled: !1,
                states: {
                    hover: {
                        enabled: !1
                    }
                }
            },
            stickyTracking: !1,
            tooltip: {
                followPointer: !0,
                pointFormat: ""
            },
            trackByArea: !0
        }, {
            type: "polygon",
            getGraphPath: function() {
                for (var a = b.prototype.getGraphPath.call(this), d = a.length + 1; d--;)(d === a.length || "M" === a[d][0]) && 0 <
                    d && a.splice(d, 0, ["Z"]);
                return this.areaPath = a
            },
            drawGraph: function() {
                this.options.fillColor = this.color;
                r.area.prototype.drawGraph.call(this)
            },
            drawLegendSymbol: a.drawRectangle,
            drawTracker: b.prototype.drawTracker,
            setStackedPoints: c.noop
        });
        ""
    });
    B(c, "parts-more/BubbleLegend.js", [c["parts/Globals.js"], c["parts/Color.js"], c["parts/Legend.js"], c["parts/Utilities.js"]], function(c, a, d, b) {
        "";
        var r = a.parse;
        a = b.addEvent;
        var l = b.arrayMax,
            y = b.arrayMin,
            D = b.isNumber,
            x = b.merge,
            g = b.objectEach,
            u = b.pick,
            m = b.stableSort,
            C = b.wrap,
            k = c.Series,
            z = c.Chart,
            A = c.noop,
            q = c.setOptions;
        q({
            legend: {
                bubbleLegend: {
                    borderColor: void 0,
                    borderWidth: 2,
                    className: void 0,
                    color: void 0,
                    connectorClassName: void 0,
                    connectorColor: void 0,
                    connectorDistance: 60,
                    connectorWidth: 1,
                    enabled: !1,
                    labels: {
                        className: void 0,
                        allowOverlap: !1,
                        format: "",
                        formatter: void 0,
                        align: "right",
                        style: {
                            fontSize: 10,
                            color: void 0
                        },
                        x: 0,
                        y: 0
                    },
                    maxSize: 60,
                    minSize: 10,
                    legendIndex: 0,
                    ranges: {
                        value: void 0,
                        borderColor: void 0,
                        color: void 0,
                        connectorColor: void 0
                    },
                    sizeBy: "area",
                    sizeByAbsoluteValue: !1,
                    zIndex: 1,
                    zThreshold: 0
                }
            }
        });
        q = function() {
            function a(a, f) {
                this.options = this.symbols = this.visible = this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight = this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0;
                this.setState = A;
                this.init(a, f)
            }
            a.prototype.init = function(a, f) {
                this.options = a;
                this.visible = !0;
                this.chart = f.chart;
                this.legend = f
            };
            a.prototype.addToLegend = function(a) {
                a.splice(this.options.legendIndex, 0, this)
            };
            a.prototype.drawLegendSymbol =
                function(a) {
                    var f = this.chart,
                        h = this.options,
                        b = u(a.options.itemDistance, 20),
                        e = h.ranges;
                    var g = h.connectorDistance;
                    this.fontMetrics = f.renderer.fontMetrics(h.labels.style.fontSize.toString() + "px");
                    e && e.length && D(e[0].value) ? (m(e, function(f, a) {
                            return a.value - f.value
                        }), this.ranges = e, this.setOptions(), this.render(), f = this.getMaxLabelSize(), e = this.ranges[0].radius, a = 2 * e, g = g - e + f.width, g = 0 < g ? g : 0, this.maxLabel = f, this.movementX = "left" === h.labels.align ? g : 0, this.legendItemWidth = a + g + b, this.legendItemHeight = a + this.fontMetrics.h /
                        2) : a.options.bubbleLegend.autoRanges = !0
                };
            a.prototype.setOptions = function() {
                var a = this.ranges,
                    f = this.options,
                    b = this.chart.series[f.seriesIndex],
                    e = this.legend.baseline,
                    g = {
                        "z-index": f.zIndex,
                        "stroke-width": f.borderWidth
                    },
                    n = {
                        "z-index": f.zIndex,
                        "stroke-width": f.connectorWidth
                    },
                    d = this.getLabelStyles(),
                    k = b.options.marker.fillOpacity,
                    c = this.chart.styledMode;
                a.forEach(function(h, p) {
                    c || (g.stroke = u(h.borderColor, f.borderColor, b.color), g.fill = u(h.color, f.color, 1 !== k ? r(b.color).setOpacity(k).get("rgba") : b.color),
                        n.stroke = u(h.connectorColor, f.connectorColor, b.color));
                    a[p].radius = this.getRangeRadius(h.value);
                    a[p] = x(a[p], {
                        center: a[0].radius - a[p].radius + e
                    });
                    c || x(!0, a[p], {
                        bubbleStyle: x(!1, g),
                        connectorStyle: x(!1, n),
                        labelStyle: d
                    })
                }, this)
            };
            a.prototype.getLabelStyles = function() {
                var a = this.options,
                    f = {},
                    b = "left" === a.labels.align,
                    e = this.legend.options.rtl;
                g(a.labels.style, function(a, b) {
                    "color" !== b && "fontSize" !== b && "z-index" !== b && (f[b] = a)
                });
                return x(!1, f, {
                    "font-size": a.labels.style.fontSize,
                    fill: u(a.labels.style.color,
                        "#000000"),
                    "z-index": a.zIndex,
                    align: e || b ? "right" : "left"
                })
            };
            a.prototype.getRangeRadius = function(a) {
                var f = this.options;
                return this.chart.series[this.options.seriesIndex].getRadius.call(this, f.ranges[f.ranges.length - 1].value, f.ranges[0].value, f.minSize, f.maxSize, a)
            };
            a.prototype.render = function() {
                var a = this.chart.renderer,
                    f = this.options.zThreshold;
                this.symbols || (this.symbols = {
                    connectors: [],
                    bubbleItems: [],
                    labels: []
                });
                this.legendSymbol = a.g("bubble-legend");
                this.legendItem = a.g("bubble-legend-item");
                this.legendSymbol.translateX =
                    0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function(a) {
                    a.value >= f && this.renderRange(a)
                }, this);
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels()
            };
            a.prototype.renderRange = function(a) {
                var f = this.options,
                    b = f.labels,
                    e = this.chart.renderer,
                    h = this.symbols,
                    g = h.labels,
                    d = a.center,
                    k = Math.abs(a.radius),
                    c = f.connectorDistance || 0,
                    m = b.align,
                    r = b.style.fontSize;
                c = this.legend.options.rtl || "left" === m ? -c : c;
                b = f.connectorWidth;
                var l = this.ranges[0].radius ||
                    0,
                    u = d - k - f.borderWidth / 2 + b / 2;
                r = r / 2 - (this.fontMetrics.h - r) / 2;
                var t = e.styledMode;
                "center" === m && (c = 0, f.connectorDistance = 0, a.labelStyle.align = "center");
                m = u + f.labels.y;
                var q = l + c + f.labels.x;
                h.bubbleItems.push(e.circle(l, d + ((u % 1 ? 1 : .5) - (b % 2 ? 0 : .5)), k).attr(t ? {} : a.bubbleStyle).addClass((t ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " + (f.className || "")).add(this.legendSymbol));
                h.connectors.push(e.path(e.crispLine([
                    ["M", l, u],
                    ["L", l + c, u]
                ], f.connectorWidth)).attr(t ? {} :
                    a.connectorStyle).addClass((t ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (f.connectorClassName || "")).add(this.legendSymbol));
                a = e.text(this.formatLabel(a), q, m + r).attr(t ? {} : a.labelStyle).addClass("highcharts-bubble-legend-labels " + (f.labels.className || "")).add(this.legendSymbol);
                g.push(a);
                a.placed = !0;
                a.alignAttr = {
                    x: q,
                    y: m + r
                }
            };
            a.prototype.getMaxLabelSize = function() {
                var a, f;
                this.symbols.labels.forEach(function(b) {
                    f = b.getBBox(!0);
                    a = a ? f.width > a.width ? f : a :
                        f
                });
                return a || {}
            };
            a.prototype.formatLabel = function(a) {
                var f = this.options,
                    e = f.labels.formatter;
                f = f.labels.format;
                var h = this.chart.numberFormatter;
                return f ? b.format(f, a) : e ? e.call(a) : h(a.value, 1)
            };
            a.prototype.hideOverlappingLabels = function() {
                var a = this.chart,
                    f = this.symbols;
                !this.options.labels.allowOverlap && f && (a.hideOverlappingLabels(f.labels), f.labels.forEach(function(a, b) {
                    a.newOpacity ? a.newOpacity !== a.oldOpacity && f.connectors[b].show() : f.connectors[b].hide()
                }))
            };
            a.prototype.getRanges = function() {
                var a =
                    this.legend.bubbleLegend,
                    f = a.options.ranges,
                    b, e = Number.MAX_VALUE,
                    g = -Number.MAX_VALUE;
                a.chart.series.forEach(function(f) {
                    f.isBubble && !f.ignoreSeries && (b = f.zData.filter(D), b.length && (e = u(f.options.zMin, Math.min(e, Math.max(y(b), !1 === f.options.displayNegative ? f.options.zThreshold : -Number.MAX_VALUE))), g = u(f.options.zMax, Math.max(g, l(b)))))
                });
                var n = e === g ? [{
                    value: g
                }] : [{
                    value: e
                }, {
                    value: (e + g) / 2
                }, {
                    value: g,
                    autoRanges: !0
                }];
                f.length && f[0].radius && n.reverse();
                n.forEach(function(a, b) {
                    f && f[b] && (n[b] = x(!1, f[b], a))
                });
                return n
            };
            a.prototype.predictBubbleSizes = function() {
                var a = this.chart,
                    f = this.fontMetrics,
                    b = a.legend.options,
                    e = "horizontal" === b.layout,
                    g = e ? a.legend.lastLineHeight : 0,
                    n = a.plotSizeX,
                    d = a.plotSizeY,
                    k = a.series[this.options.seriesIndex];
                a = Math.ceil(k.minPxSize);
                var c = Math.ceil(k.maxPxSize);
                k = k.options.maxSize;
                var m = Math.min(d, n);
                if (b.floating || !/%$/.test(k)) f = c;
                else if (k = parseFloat(k), f = (m + g - f.h / 2) * k / 100 / (k / 100 + 1), e && d - f >= n || !e && n - f >= d) f = c;
                return [a, Math.ceil(f)]
            };
            a.prototype.updateRanges = function(a, f) {
                var b =
                    this.legend.options.bubbleLegend;
                b.minSize = a;
                b.maxSize = f;
                b.ranges = this.getRanges()
            };
            a.prototype.correctSizes = function() {
                var a = this.legend,
                    f = this.chart.series[this.options.seriesIndex];
                1 < Math.abs(Math.ceil(f.maxPxSize) - this.options.maxSize) && (this.updateRanges(this.options.minSize, f.maxPxSize), a.render())
            };
            return a
        }();
        a(d, "afterGetAllItems", function(a) {
            var b = this.bubbleLegend,
                f = this.options,
                e = f.bubbleLegend,
                g = this.chart.getVisibleBubbleSeriesIndex();
            b && b.ranges && b.ranges.length && (e.ranges.length &&
                (e.autoRanges = !!e.ranges[0].autoRanges), this.destroyItem(b));
            0 <= g && f.enabled && e.enabled && (e.seriesIndex = g, this.bubbleLegend = new c.BubbleLegend(e, this), this.bubbleLegend.addToLegend(a.allItems))
        });
        z.prototype.getVisibleBubbleSeriesIndex = function() {
            for (var a = this.series, b = 0; b < a.length;) {
                if (a[b] && a[b].isBubble && a[b].visible && a[b].zData.length) return b;
                b++
            }
            return -1
        };
        d.prototype.getLinesHeights = function() {
            var a = this.allItems,
                b = [],
                f = a.length,
                g, d = 0;
            for (g = 0; g < f; g++)
                if (a[g].legendItemHeight && (a[g].itemHeight =
                        a[g].legendItemHeight), a[g] === a[f - 1] || a[g + 1] && a[g]._legendItemPos[1] !== a[g + 1]._legendItemPos[1]) {
                    b.push({
                        height: 0
                    });
                    var v = b[b.length - 1];
                    for (d; d <= g; d++) a[d].itemHeight > v.height && (v.height = a[d].itemHeight);
                    v.step = g
                }
            return b
        };
        d.prototype.retranslateItems = function(a) {
            var b, f, e, g = this.options.rtl,
                d = 0;
            this.allItems.forEach(function(h, p) {
                b = h.legendGroup.translateX;
                f = h._legendItemPos[1];
                if ((e = h.movementX) || g && h.ranges) e = g ? b - h.options.maxSize / 2 : b + e, h.legendGroup.attr({
                    translateX: e
                });
                p > a[d].step && d++;
                h.legendGroup.attr({
                    translateY: Math.round(f +
                        a[d].height / 2)
                });
                h._legendItemPos[1] = f + a[d].height / 2
            })
        };
        a(k, "legendItemClick", function() {
            var a = this.chart,
                b = this.visible,
                f = this.chart.legend;
            f && f.bubbleLegend && (this.visible = !b, this.ignoreSeries = b, a = 0 <= a.getVisibleBubbleSeriesIndex(), f.bubbleLegend.visible !== a && (f.update({
                bubbleLegend: {
                    enabled: a
                }
            }), f.bubbleLegend.visible = a), this.visible = b)
        });
        C(z.prototype, "drawChartBox", function(a, b, f) {
            var e = this.legend,
                h = 0 <= this.getVisibleBubbleSeriesIndex();
            if (e && e.options.enabled && e.bubbleLegend && e.options.bubbleLegend.autoRanges &&
                h) {
                var d = e.bubbleLegend.options;
                h = e.bubbleLegend.predictBubbleSizes();
                e.bubbleLegend.updateRanges(h[0], h[1]);
                d.placed || (e.group.placed = !1, e.allItems.forEach(function(a) {
                    a.legendGroup.translateY = null
                }));
                e.render();
                this.getMargins();
                this.axes.forEach(function(a) {
                    a.visible && a.render();
                    d.placed || (a.setScale(), a.updateNames(), g(a.ticks, function(a) {
                        a.isNew = !0;
                        a.isNewLabel = !0
                    }))
                });
                d.placed = !0;
                this.getMargins();
                a.call(this, b, f);
                e.bubbleLegend.correctSizes();
                e.retranslateItems(e.getLinesHeights())
            } else a.call(this,
                b, f), e && e.options.enabled && e.bubbleLegend && (e.render(), e.retranslateItems(e.getLinesHeights()))
        });
        c.BubbleLegend = q;
        return c.BubbleLegend
    });
    B(c, "parts-more/BubbleSeries.js", [c["parts/Globals.js"], c["parts/Color.js"], c["parts/Point.js"], c["parts/Utilities.js"]], function(c, a, d, b) {
        var r = a.parse,
            l = b.arrayMax,
            y = b.arrayMin,
            D = b.clamp,
            x = b.extend,
            g = b.isNumber,
            u = b.pick,
            m = b.pInt;
        a = b.seriesType;
        b = c.Axis;
        var C = c.noop,
            k = c.Series,
            z = c.seriesTypes;
        a("bubble", "scatter", {
            dataLabels: {
                formatter: function() {
                    return this.point.z
                },
                inside: !0,
                verticalAlign: "middle"
            },
            animationLimit: 250,
            marker: {
                lineColor: null,
                lineWidth: 1,
                fillOpacity: .5,
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                symbol: "circle"
            },
            minSize: 8,
            maxSize: "20%",
            softThreshold: !1,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: "({point.x}, {point.y}), Size: {point.z}"
            },
            turboThreshold: 0,
            zThreshold: 0,
            zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"],
            parallelArrays: ["x", "y", "z"],
            trackerGroups: ["group", "dataLabelsGroup"],
            specialGroup: "group",
            bubblePadding: !0,
            zoneAxis: "z",
            directTouch: !0,
            isBubble: !0,
            pointAttribs: function(a, b) {
                var e = this.options.marker.fillOpacity;
                a = k.prototype.pointAttribs.call(this, a, b);
                1 !== e && (a.fill = r(a.fill).setOpacity(e).get("rgba"));
                return a
            },
            getRadii: function(a, b, e) {
                var g = this.zData,
                    f = this.yData,
                    p = e.minPxSize,
                    d = e.maxPxSize,
                    v = [];
                var n = 0;
                for (e = g.length; n < e; n++) {
                    var k = g[n];
                    v.push(this.getRadius(a, b, p, d, k, f[n]))
                }
                this.radii = v
            },
            getRadius: function(a, b, e, h, f, p) {
                var d = this.options,
                    v = "width" !== d.sizeBy,
                    n = d.zThreshold,
                    k = b - a,
                    c = .5;
                if (null === p || null === f) return null;
                if (g(f)) {
                    d.sizeByAbsoluteValue &&
                        (f = Math.abs(f - n), k = Math.max(b - n, Math.abs(a - n)), a = 0);
                    if (f < a) return e / 2 - 1;
                    0 < k && (c = (f - a) / k)
                }
                v && 0 <= c && (c = Math.sqrt(c));
                return Math.ceil(e + c * (h - e)) / 2
            },
            animate: function(a) {
                !a && this.points.length < this.options.animationLimit && this.points.forEach(function(a) {
                    var b = a.graphic;
                    if (b && b.width) {
                        var g = {
                            x: b.x,
                            y: b.y,
                            width: b.width,
                            height: b.height
                        };
                        b.attr({
                            x: a.plotX,
                            y: a.plotY,
                            width: 1,
                            height: 1
                        });
                        b.animate(g, this.options.animation)
                    }
                }, this)
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            translate: function() {
                var a,
                    b = this.data,
                    e = this.radii;
                z.scatter.prototype.translate.call(this);
                for (a = b.length; a--;) {
                    var h = b[a];
                    var f = e ? e[a] : 0;
                    g(f) && f >= this.minPxSize / 2 ? (h.marker = x(h.marker, {
                        radius: f,
                        width: 2 * f,
                        height: 2 * f
                    }), h.dlBox = {
                        x: h.plotX - f,
                        y: h.plotY - f,
                        width: 2 * f,
                        height: 2 * f
                    }) : h.shapeArgs = h.plotY = h.dlBox = void 0
                }
            },
            alignDataLabel: z.column.prototype.alignDataLabel,
            buildKDTree: C,
            applyZones: C
        }, {
            haloPath: function(a) {
                return d.prototype.haloPath.call(this, 0 === a ? 0 : (this.marker ? this.marker.radius || 0 : 0) + a)
            },
            ttBelow: !1
        });
        b.prototype.beforePadding =
            function() {
                var a = this,
                    b = this.len,
                    e = this.chart,
                    h = 0,
                    f = b,
                    p = this.isXAxis,
                    d = p ? "xData" : "yData",
                    k = this.min,
                    n = {},
                    c = Math.min(e.plotWidth, e.plotHeight),
                    r = Number.MAX_VALUE,
                    t = -Number.MAX_VALUE,
                    C = this.max - k,
                    x = b / C,
                    z = [];
                this.series.forEach(function(f) {
                    var b = f.options;
                    !f.bubblePadding || !f.visible && e.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, z.push(f), p && (["minSize", "maxSize"].forEach(function(a) {
                        var f = b[a],
                            e = /%$/.test(f);
                        f = m(f);
                        n[a] = e ? c * f / 100 : f
                    }), f.minPxSize = n.minSize, f.maxPxSize = Math.max(n.maxSize,
                        n.minSize), f = f.zData.filter(g), f.length && (r = u(b.zMin, D(y(f), !1 === b.displayNegative ? b.zThreshold : -Number.MAX_VALUE, r)), t = u(b.zMax, Math.max(t, l(f))))))
                });
                z.forEach(function(b) {
                    var e = b[d],
                        n = e.length;
                    p && b.getRadii(r, t, b);
                    if (0 < C)
                        for (; n--;)
                            if (g(e[n]) && a.dataMin <= e[n] && e[n] <= a.max) {
                                var v = b.radii ? b.radii[n] : 0;
                                h = Math.min((e[n] - k) * x - v, h);
                                f = Math.max((e[n] - k) * x + v, f)
                            }
                });
                z.length && 0 < C && !this.logarithmic && (f -= b, x *= (b + Math.max(0, h) - Math.min(f, b)) / b, [
                    ["min", "userMin", h],
                    ["max", "userMax", f]
                ].forEach(function(f) {
                    "undefined" ===
                    typeof u(a.options[f[0]], a[f[1]]) && (a[f[0]] += f[2] / x)
                }))
            };
        ""
    });
    B(c, "modules/networkgraph/integrations.js", [c["parts/Globals.js"]], function(c) {
        c.networkgraphIntegrations = {
            verlet: {
                attractiveForceFunction: function(a, d) {
                    return (d - a) / a
                },
                repulsiveForceFunction: function(a, d) {
                    return (d - a) / a * (d > a ? 1 : 0)
                },
                barycenter: function() {
                    var a = this.options.gravitationalConstant,
                        d = this.barycenter.xFactor,
                        b = this.barycenter.yFactor;
                    d = (d - (this.box.left + this.box.width) / 2) * a;
                    b = (b - (this.box.top + this.box.height) / 2) * a;
                    this.nodes.forEach(function(a) {
                        a.fixedPosition ||
                            (a.plotX -= d / a.mass / a.degree, a.plotY -= b / a.mass / a.degree)
                    })
                },
                repulsive: function(a, d, b) {
                    d = d * this.diffTemperature / a.mass / a.degree;
                    a.fixedPosition || (a.plotX += b.x * d, a.plotY += b.y * d)
                },
                attractive: function(a, d, b) {
                    var c = a.getMass(),
                        l = -b.x * d * this.diffTemperature;
                    d = -b.y * d * this.diffTemperature;
                    a.fromNode.fixedPosition || (a.fromNode.plotX -= l * c.fromNode / a.fromNode.degree, a.fromNode.plotY -= d * c.fromNode / a.fromNode.degree);
                    a.toNode.fixedPosition || (a.toNode.plotX += l * c.toNode / a.toNode.degree, a.toNode.plotY += d * c.toNode /
                        a.toNode.degree)
                },
                integrate: function(a, d) {
                    var b = -a.options.friction,
                        c = a.options.maxSpeed,
                        l = (d.plotX + d.dispX - d.prevX) * b;
                    b *= d.plotY + d.dispY - d.prevY;
                    var y = Math.abs,
                        D = y(l) / (l || 1);
                    y = y(b) / (b || 1);
                    l = D * Math.min(c, Math.abs(l));
                    b = y * Math.min(c, Math.abs(b));
                    d.prevX = d.plotX + d.dispX;
                    d.prevY = d.plotY + d.dispY;
                    d.plotX += l;
                    d.plotY += b;
                    d.temperature = a.vectorLength({
                        x: l,
                        y: b
                    })
                },
                getK: function(a) {
                    return Math.pow(a.box.width * a.box.height / a.nodes.length, .5)
                }
            },
            euler: {
                attractiveForceFunction: function(a, d) {
                    return a * a / d
                },
                repulsiveForceFunction: function(a,
                    d) {
                    return d * d / a
                },
                barycenter: function() {
                    var a = this.options.gravitationalConstant,
                        d = this.barycenter.xFactor,
                        b = this.barycenter.yFactor;
                    this.nodes.forEach(function(c) {
                        if (!c.fixedPosition) {
                            var l = c.getDegree();
                            l *= 1 + l / 2;
                            c.dispX += (d - c.plotX) * a * l / c.degree;
                            c.dispY += (b - c.plotY) * a * l / c.degree
                        }
                    })
                },
                repulsive: function(a, d, b, c) {
                    a.dispX += b.x / c * d / a.degree;
                    a.dispY += b.y / c * d / a.degree
                },
                attractive: function(a, d, b, c) {
                    var l = a.getMass(),
                        r = b.x / c * d;
                    d *= b.y / c;
                    a.fromNode.fixedPosition || (a.fromNode.dispX -= r * l.fromNode / a.fromNode.degree,
                        a.fromNode.dispY -= d * l.fromNode / a.fromNode.degree);
                    a.toNode.fixedPosition || (a.toNode.dispX += r * l.toNode / a.toNode.degree, a.toNode.dispY += d * l.toNode / a.toNode.degree)
                },
                integrate: function(a, d) {
                    d.dispX += d.dispX * a.options.friction;
                    d.dispY += d.dispY * a.options.friction;
                    var b = d.temperature = a.vectorLength({
                        x: d.dispX,
                        y: d.dispY
                    });
                    0 !== b && (d.plotX += d.dispX / b * Math.min(Math.abs(d.dispX), a.temperature), d.plotY += d.dispY / b * Math.min(Math.abs(d.dispY), a.temperature))
                },
                getK: function(a) {
                    return Math.pow(a.box.width * a.box.height /
                        a.nodes.length, .3)
                }
            }
        }
    });
    B(c, "modules/networkgraph/QuadTree.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(c, a) {
        a = a.extend;
        var d = c.QuadTreeNode = function(a) {
            this.box = a;
            this.boxSize = Math.min(a.width, a.height);
            this.nodes = [];
            this.body = this.isInternal = !1;
            this.isEmpty = !0
        };
        a(d.prototype, {
            insert: function(a, c) {
                this.isInternal ? this.nodes[this.getBoxPosition(a)].insert(a, c - 1) : (this.isEmpty = !1, this.body ? c ? (this.isInternal = !0, this.divideBox(), !0 !== this.body && (this.nodes[this.getBoxPosition(this.body)].insert(this.body,
                    c - 1), this.body = !0), this.nodes[this.getBoxPosition(a)].insert(a, c - 1)) : (c = new d({
                    top: a.plotX,
                    left: a.plotY,
                    width: .1,
                    height: .1
                }), c.body = a, c.isInternal = !1, this.nodes.push(c)) : (this.isInternal = !1, this.body = a))
            },
            updateMassAndCenter: function() {
                var a = 0,
                    d = 0,
                    c = 0;
                this.isInternal ? (this.nodes.forEach(function(b) {
                    b.isEmpty || (a += b.mass, d += b.plotX * b.mass, c += b.plotY * b.mass)
                }), d /= a, c /= a) : this.body && (a = this.body.mass, d = this.body.plotX, c = this.body.plotY);
                this.mass = a;
                this.plotX = d;
                this.plotY = c
            },
            divideBox: function() {
                var a =
                    this.box.width / 2,
                    c = this.box.height / 2;
                this.nodes[0] = new d({
                    left: this.box.left,
                    top: this.box.top,
                    width: a,
                    height: c
                });
                this.nodes[1] = new d({
                    left: this.box.left + a,
                    top: this.box.top,
                    width: a,
                    height: c
                });
                this.nodes[2] = new d({
                    left: this.box.left + a,
                    top: this.box.top + c,
                    width: a,
                    height: c
                });
                this.nodes[3] = new d({
                    left: this.box.left,
                    top: this.box.top + c,
                    width: a,
                    height: c
                })
            },
            getBoxPosition: function(a) {
                var b = a.plotY < this.box.top + this.box.height / 2;
                return a.plotX < this.box.left + this.box.width / 2 ? b ? 0 : 3 : b ? 1 : 2
            }
        });
        c = c.QuadTree = function(a,
            c, l, y) {
            this.box = {
                left: a,
                top: c,
                width: l,
                height: y
            };
            this.maxDepth = 25;
            this.root = new d(this.box, "0");
            this.root.isInternal = !0;
            this.root.isRoot = !0;
            this.root.divideBox()
        };
        a(c.prototype, {
            insertNodes: function(a) {
                a.forEach(function(a) {
                    this.root.insert(a, this.maxDepth)
                }, this)
            },
            visitNodeRecursive: function(a, d, c) {
                var b;
                a || (a = this.root);
                a === this.root && d && (b = d(a));
                !1 !== b && (a.nodes.forEach(function(a) {
                        if (a.isInternal) {
                            d && (b = d(a));
                            if (!1 === b) return;
                            this.visitNodeRecursive(a, d, c)
                        } else a.body && d && d(a.body);
                        c && c(a)
                    }, this),
                    a === this.root && c && c(a))
            },
            calculateMassAndCenter: function() {
                this.visitNodeRecursive(null, null, function(a) {
                    a.updateMassAndCenter()
                })
            }
        })
    });
    B(c, "modules/networkgraph/layouts.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(c, a) {
        var d = a.addEvent,
            b = a.clamp,
            l = a.defined,
            t = a.extend,
            y = a.isFunction,
            D = a.pick,
            x = a.setAnimation;
        a = c.Chart;
        c.layouts = {
            "reingold-fruchterman": function() {}
        };
        t(c.layouts["reingold-fruchterman"].prototype, {
            init: function(a) {
                this.options = a;
                this.nodes = [];
                this.links = [];
                this.series = [];
                this.box = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                this.setInitialRendering(!0);
                this.integration = c.networkgraphIntegrations[a.integration];
                this.enableSimulation = a.enableSimulation;
                this.attractiveForce = D(a.attractiveForce, this.integration.attractiveForceFunction);
                this.repulsiveForce = D(a.repulsiveForce, this.integration.repulsiveForceFunction);
                this.approximation = a.approximation
            },
            updateSimulation: function(a) {
                this.enableSimulation = D(a, this.options.enableSimulation)
            },
            start: function() {
                var a = this.series,
                    b = this.options;
                this.currentStep = 0;
                this.forces = a[0] && a[0].forces || [];
                this.chart = a[0] && a[0].chart;
                this.initialRendering && (this.initPositions(), a.forEach(function(a) {
                    a.finishedAnimating = !0;
                    a.render()
                }));
                this.setK();
                this.resetSimulation(b);
                this.enableSimulation && this.step()
            },
            step: function() {
                var a = this,
                    b = this.series;
                a.currentStep++;
                "barnes-hut" === a.approximation && (a.createQuadTree(), a.quadTree.calculateMassAndCenter());
                a.forces.forEach(function(b) {
                    a[b + "Forces"](a.temperature)
                });
                a.applyLimits(a.temperature);
                a.temperature =
                    a.coolDown(a.startTemperature, a.diffTemperature, a.currentStep);
                a.prevSystemTemperature = a.systemTemperature;
                a.systemTemperature = a.getSystemTemperature();
                a.enableSimulation && (b.forEach(function(a) {
                    a.chart && a.render()
                }), a.maxIterations-- && isFinite(a.temperature) && !a.isStable() ? (a.simulation && c.win.cancelAnimationFrame(a.simulation), a.simulation = c.win.requestAnimationFrame(function() {
                    a.step()
                })) : a.simulation = !1)
            },
            stop: function() {
                this.simulation && c.win.cancelAnimationFrame(this.simulation)
            },
            setArea: function(a,
                b, d, c) {
                this.box = {
                    left: a,
                    top: b,
                    width: d,
                    height: c
                }
            },
            setK: function() {
                this.k = this.options.linkLength || this.integration.getK(this)
            },
            addElementsToCollection: function(a, b) {
                a.forEach(function(a) {
                    -1 === b.indexOf(a) && b.push(a)
                })
            },
            removeElementFromCollection: function(a, b) {
                a = b.indexOf(a); - 1 !== a && b.splice(a, 1)
            },
            clear: function() {
                this.nodes.length = 0;
                this.links.length = 0;
                this.series.length = 0;
                this.resetSimulation()
            },
            resetSimulation: function() {
                this.forcedStop = !1;
                this.systemTemperature = 0;
                this.setMaxIterations();
                this.setTemperature();
                this.setDiffTemperature()
            },
            setMaxIterations: function(a) {
                this.maxIterations = D(a, this.options.maxIterations)
            },
            setTemperature: function() {
                this.temperature = this.startTemperature = Math.sqrt(this.nodes.length)
            },
            setDiffTemperature: function() {
                this.diffTemperature = this.startTemperature / (this.options.maxIterations + 1)
            },
            setInitialRendering: function(a) {
                this.initialRendering = a
            },
            createQuadTree: function() {
                this.quadTree = new c.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
                this.quadTree.insertNodes(this.nodes)
            },
            initPositions: function() {
                var a = this.options.initialPositions;
                y(a) ? (a.call(this), this.nodes.forEach(function(a) {
                    l(a.prevX) || (a.prevX = a.plotX);
                    l(a.prevY) || (a.prevY = a.plotY);
                    a.dispX = 0;
                    a.dispY = 0
                })) : "circle" === a ? this.setCircularPositions() : this.setRandomPositions()
            },
            setCircularPositions: function() {
                function a(b) {
                    b.linksFrom.forEach(function(b) {
                        r[b.toNode.id] || (r[b.toNode.id] = !0, l.push(b.toNode), a(b.toNode))
                    })
                }
                var b = this.box,
                    d = this.nodes,
                    c = 2 * Math.PI / (d.length + 1),
                    k = d.filter(function(a) {
                        return 0 === a.linksTo.length
                    }),
                    l = [],
                    r = {},
                    q = this.options.initialPositionRadius;
                k.forEach(function(b) {
                    l.push(b);
                    a(b)
                });
                l.length ? d.forEach(function(a) {
                    -1 === l.indexOf(a) && l.push(a)
                }) : l = d;
                l.forEach(function(a, h) {
                    a.plotX = a.prevX = D(a.plotX, b.width / 2 + q * Math.cos(h * c));
                    a.plotY = a.prevY = D(a.plotY, b.height / 2 + q * Math.sin(h * c));
                    a.dispX = 0;
                    a.dispY = 0
                })
            },
            setRandomPositions: function() {
                function a(a) {
                    a = a * a / Math.PI;
                    return a -= Math.floor(a)
                }
                var b = this.box,
                    d = this.nodes,
                    c = d.length + 1;
                d.forEach(function(g, d) {
                    g.plotX = g.prevX = D(g.plotX, b.width * a(d));
                    g.plotY =
                        g.prevY = D(g.plotY, b.height * a(c + d));
                    g.dispX = 0;
                    g.dispY = 0
                })
            },
            force: function(a) {
                this.integration[a].apply(this, Array.prototype.slice.call(arguments, 1))
            },
            barycenterForces: function() {
                this.getBarycenter();
                this.force("barycenter")
            },
            getBarycenter: function() {
                var a = 0,
                    b = 0,
                    d = 0;
                this.nodes.forEach(function(g) {
                    b += g.plotX * g.mass;
                    d += g.plotY * g.mass;
                    a += g.mass
                });
                return this.barycenter = {
                    x: b,
                    y: d,
                    xFactor: b / a,
                    yFactor: d / a
                }
            },
            barnesHutApproximation: function(a, b) {
                var g = this.getDistXY(a, b),
                    d = this.vectorLength(g);
                if (a !== b && 0 !==
                    d)
                    if (b.isInternal)
                        if (b.boxSize / d < this.options.theta && 0 !== d) {
                            var c = this.repulsiveForce(d, this.k);
                            this.force("repulsive", a, c * b.mass, g, d);
                            var l = !1
                        } else l = !0;
                else c = this.repulsiveForce(d, this.k), this.force("repulsive", a, c * b.mass, g, d);
                return l
            },
            repulsiveForces: function() {
                var a = this;
                "barnes-hut" === a.approximation ? a.nodes.forEach(function(b) {
                    a.quadTree.visitNodeRecursive(null, function(g) {
                        return a.barnesHutApproximation(b, g)
                    })
                }) : a.nodes.forEach(function(b) {
                    a.nodes.forEach(function(g) {
                        if (b !== g && !b.fixedPosition) {
                            var d =
                                a.getDistXY(b, g);
                            var c = a.vectorLength(d);
                            if (0 !== c) {
                                var l = a.repulsiveForce(c, a.k);
                                a.force("repulsive", b, l * g.mass, d, c)
                            }
                        }
                    })
                })
            },
            attractiveForces: function() {
                var a = this,
                    b, d, c;
                a.links.forEach(function(g) {
                    g.fromNode && g.toNode && (b = a.getDistXY(g.fromNode, g.toNode), d = a.vectorLength(b), 0 !== d && (c = a.attractiveForce(d, a.k), a.force("attractive", g, c, b, d)))
                })
            },
            applyLimits: function() {
                var a = this;
                a.nodes.forEach(function(b) {
                    b.fixedPosition || (a.integration.integrate(a, b), a.applyLimitBox(b, a.box), b.dispX = 0, b.dispY = 0)
                })
            },
            applyLimitBox: function(a, d) {
                var g = a.radius;
                a.plotX = b(a.plotX, d.left + g, d.width - g);
                a.plotY = b(a.plotY, d.top + g, d.height - g)
            },
            coolDown: function(a, b, d) {
                return a - b * d
            },
            isStable: function() {
                return .00001 > Math.abs(this.systemTemperature - this.prevSystemTemperature) || 0 >= this.temperature
            },
            getSystemTemperature: function() {
                return this.nodes.reduce(function(a, b) {
                    return a + b.temperature
                }, 0)
            },
            vectorLength: function(a) {
                return Math.sqrt(a.x * a.x + a.y * a.y)
            },
            getDistR: function(a, b) {
                a = this.getDistXY(a, b);
                return this.vectorLength(a)
            },
            getDistXY: function(a, b) {
                var d = a.plotX - b.plotX;
                a = a.plotY - b.plotY;
                return {
                    x: d,
                    y: a,
                    absX: Math.abs(d),
                    absY: Math.abs(a)
                }
            }
        });
        d(a, "predraw", function() {
            this.graphLayoutsLookup && this.graphLayoutsLookup.forEach(function(a) {
                a.stop()
            })
        });
        d(a, "render", function() {
            function a(a) {
                a.maxIterations-- && isFinite(a.temperature) && !a.isStable() && !a.enableSimulation && (a.beforeStep && a.beforeStep(), a.step(), d = !1, b = !0)
            }
            var b = !1;
            if (this.graphLayoutsLookup) {
                x(!1, this);
                for (this.graphLayoutsLookup.forEach(function(a) {
                        a.start()
                    }); !d;) {
                    var d = !0;
                    this.graphLayoutsLookup.forEach(a)
                }
                b && this.series.forEach(function(a) {
                    a && a.layout && a.render()
                })
            }
        });
        d(a, "beforePrint", function() {
            this.graphLayoutsLookup.forEach(function(a) {
                a.updateSimulation(!1)
            });
            this.redraw()
        });
        d(a, "afterPrint", function() {
            this.graphLayoutsLookup.forEach(function(a) {
                a.updateSimulation()
            });
            this.redraw()
        })
    });
    B(c, "modules/networkgraph/draggable-nodes.js", [c["parts/Globals.js"], c["parts/Utilities.js"]], function(c, a) {
        var d = a.addEvent;
        a = c.Chart;
        c.dragNodesMixin = {
            onMouseDown: function(a,
                d) {
                d = this.chart.pointer.normalize(d);
                a.fixedPosition = {
                    chartX: d.chartX,
                    chartY: d.chartY,
                    plotX: a.plotX,
                    plotY: a.plotY
                };
                a.inDragMode = !0
            },
            onMouseMove: function(a, d) {
                if (a.fixedPosition && a.inDragMode) {
                    var b = this.chart,
                        c = b.pointer.normalize(d);
                    d = a.fixedPosition.chartX - c.chartX;
                    c = a.fixedPosition.chartY - c.chartY;
                    if (5 < Math.abs(d) || 5 < Math.abs(c)) d = a.fixedPosition.plotX - d, c = a.fixedPosition.plotY - c, b.isInsidePlot(d, c) && (a.plotX = d, a.plotY = c, a.hasDragged = !0, this.redrawHalo(a), this.layout.simulation ? this.layout.resetSimulation() :
                        (this.layout.setInitialRendering(!1), this.layout.enableSimulation ? this.layout.start() : this.layout.setMaxIterations(1), this.chart.redraw(), this.layout.setInitialRendering(!0)))
                }
            },
            onMouseUp: function(a, d) {
                a.fixedPosition && a.hasDragged && (this.layout.enableSimulation ? this.layout.start() : this.chart.redraw(), a.inDragMode = a.hasDragged = !1, this.options.fixedDraggable || delete a.fixedPosition)
            },
            redrawHalo: function(a) {
                a && this.halo && this.halo.attr({
                    d: a.haloPath(this.options.states.hover.halo.size)
                })
            }
        };
        d(a, "load",
            function() {
                var a = this,
                    c, l, y;
                a.container && (c = d(a.container, "mousedown", function(b) {
                    var c = a.hoverPoint;
                    c && c.series && c.series.hasDraggableNodes && c.series.options.draggable && (c.series.onMouseDown(c, b), l = d(a.container, "mousemove", function(a) {
                        return c && c.series && c.series.onMouseMove(c, a)
                    }), y = d(a.container.ownerDocument, "mouseup", function(a) {
                        l();
                        y();
                        return c && c.series && c.series.onMouseUp(c, a)
                    }))
                }));
                d(a, "destroy", function() {
                    c()
                })
            })
    });
    B(c, "parts-more/PackedBubbleSeries.js", [c["parts/Globals.js"], c["parts/Color.js"],
        c["parts/Point.js"], c["parts/Utilities.js"]
    ], function(c, a, d, b) {
        var l = a.parse,
            t = b.addEvent,
            y = b.clamp,
            D = b.defined,
            x = b.extend;
        a = b.extendClass;
        var g = b.fireEvent,
            u = b.isArray,
            m = b.isNumber,
            C = b.merge,
            k = b.pick;
        b = b.seriesType;
        var z = c.Series,
            A = c.Chart,
            q = c.layouts["reingold-fruchterman"],
            e = c.seriesTypes.bubble.prototype.pointClass,
            h = c.dragNodesMixin;
        c.networkgraphIntegrations.packedbubble = {
            repulsiveForceFunction: function(a, b, e, c) {
                return Math.min(a, (e.marker.radius + c.marker.radius) / 2)
            },
            barycenter: function() {
                var a =
                    this,
                    b = a.options.gravitationalConstant,
                    e = a.box,
                    c = a.nodes,
                    h, d;
                c.forEach(function(f) {
                    a.options.splitSeries && !f.isParentNode ? (h = f.series.parentNode.plotX, d = f.series.parentNode.plotY) : (h = e.width / 2, d = e.height / 2);
                    f.fixedPosition || (f.plotX -= (f.plotX - h) * b / (f.mass * Math.sqrt(c.length)), f.plotY -= (f.plotY - d) * b / (f.mass * Math.sqrt(c.length)))
                })
            },
            repulsive: function(a, b, e, c) {
                var f = b * this.diffTemperature / a.mass / a.degree;
                b = e.x * f;
                e = e.y * f;
                a.fixedPosition || (a.plotX += b, a.plotY += e);
                c.fixedPosition || (c.plotX -= b, c.plotY -=
                    e)
            },
            integrate: c.networkgraphIntegrations.verlet.integrate,
            getK: c.noop
        };
        c.layouts.packedbubble = a(q, {
            beforeStep: function() {
                this.options.marker && this.series.forEach(function(a) {
                    a && a.calculateParentRadius()
                })
            },
            setCircularPositions: function() {
                var a = this,
                    b = a.box,
                    e = a.nodes,
                    c = 2 * Math.PI / (e.length + 1),
                    h, d, g = a.options.initialPositionRadius;
                e.forEach(function(f, e) {
                    a.options.splitSeries && !f.isParentNode ? (h = f.series.parentNode.plotX, d = f.series.parentNode.plotY) : (h = b.width / 2, d = b.height / 2);
                    f.plotX = f.prevX = k(f.plotX,
                        h + g * Math.cos(f.index || e * c));
                    f.plotY = f.prevY = k(f.plotY, d + g * Math.sin(f.index || e * c));
                    f.dispX = 0;
                    f.dispY = 0
                })
            },
            repulsiveForces: function() {
                var a = this,
                    b, e, c, h = a.options.bubblePadding;
                a.nodes.forEach(function(f) {
                    f.degree = f.mass;
                    f.neighbours = 0;
                    a.nodes.forEach(function(d) {
                        b = 0;
                        f === d || f.fixedPosition || !a.options.seriesInteraction && f.series !== d.series || (c = a.getDistXY(f, d), e = a.vectorLength(c) - (f.marker.radius + d.marker.radius + h), 0 > e && (f.degree += .01, f.neighbours++, b = a.repulsiveForce(-e / Math.sqrt(f.neighbours), a.k,
                            f, d)), a.force("repulsive", f, b * d.mass, c, d, e))
                    })
                })
            },
            applyLimitBox: function(a) {
                if (this.options.splitSeries && !a.isParentNode && this.options.parentNodeLimit) {
                    var f = this.getDistXY(a, a.series.parentNode);
                    var b = a.series.parentNodeRadius - a.marker.radius - this.vectorLength(f);
                    0 > b && b > -2 * a.marker.radius && (a.plotX -= .01 * f.x, a.plotY -= .01 * f.y)
                }
                q.prototype.applyLimitBox.apply(this, arguments)
            }
        });
        b("packedbubble", "bubble", {
            minSize: "10%",
            maxSize: "50%",
            sizeBy: "area",
            zoneAxis: "y",
            crisp: !1,
            tooltip: {
                pointFormat: "Value: {point.value}"
            },
            draggable: !0,
            useSimulation: !0,
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                parentNodeFormatter: function() {
                    return this.name
                },
                parentNodeTextPath: {
                    enabled: !0
                },
                padding: 0,
                style: {
                    transition: "opacity 2000ms"
                }
            },
            layoutAlgorithm: {
                initialPositions: "circle",
                initialPositionRadius: 20,
                bubblePadding: 5,
                parentNodeLimit: !1,
                seriesInteraction: !0,
                dragBetweenSeries: !1,
                parentNodeOptions: {
                    maxIterations: 400,
                    gravitationalConstant: .03,
                    maxSpeed: 50,
                    initialPositionRadius: 100,
                    seriesInteraction: !0,
                    marker: {
                        fillColor: null,
                        fillOpacity: 1,
                        lineWidth: 1,
                        lineColor: null,
                        symbol: "circle"
                    }
                },
                enableSimulation: !0,
                type: "packedbubble",
                integration: "packedbubble",
                maxIterations: 1E3,
                splitSeries: !1,
                maxSpeed: 5,
                gravitationalConstant: .01,
                friction: -.981
            }
        }, {
            hasDraggableNodes: !0,
            forces: ["barycenter", "repulsive"],
            pointArrayMap: ["value"],
            pointValKey: "value",
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            axisTypes: [],
            noSharedTooltip: !0,
            searchPoint: c.noop,
            accumulateAllPoints: function(a) {
                var f = a.chart,
                    b = [],
                    e, c;
                for (e = 0; e < f.series.length; e++)
                    if (a =
                        f.series[e], a.visible || !f.options.chart.ignoreHiddenSeries)
                        for (c = 0; c < a.yData.length; c++) b.push([null, null, a.yData[c], a.index, c, {
                            id: c,
                            marker: {
                                radius: 0
                            }
                        }]);
                return b
            },
            init: function() {
                z.prototype.init.apply(this, arguments);
                t(this, "updatedData", function() {
                    this.chart.series.forEach(function(a) {
                        a.type === this.type && (a.isDirty = !0)
                    }, this)
                });
                return this
            },
            render: function() {
                var a = [];
                z.prototype.render.apply(this, arguments);
                this.options.dataLabels.allowOverlap || (this.data.forEach(function(b) {
                        u(b.dataLabels) && b.dataLabels.forEach(function(b) {
                            a.push(b)
                        })
                    }),
                    this.options.useSimulation && this.chart.hideOverlappingLabels(a))
            },
            setVisible: function() {
                var a = this;
                z.prototype.setVisible.apply(a, arguments);
                a.parentNodeLayout && a.graph ? a.visible ? (a.graph.show(), a.parentNode.dataLabel && a.parentNode.dataLabel.show()) : (a.graph.hide(), a.parentNodeLayout.removeElementFromCollection(a.parentNode, a.parentNodeLayout.nodes), a.parentNode.dataLabel && a.parentNode.dataLabel.hide()) : a.layout && (a.visible ? a.layout.addElementsToCollection(a.points, a.layout.nodes) : a.points.forEach(function(b) {
                    a.layout.removeElementFromCollection(b,
                        a.layout.nodes)
                }))
            },
            drawDataLabels: function() {
                var a = this.options.dataLabels.textPath,
                    b = this.points;
                z.prototype.drawDataLabels.apply(this, arguments);
                this.parentNode && (this.parentNode.formatPrefix = "parentNode", this.points = [this.parentNode], this.options.dataLabels.textPath = this.options.dataLabels.parentNodeTextPath, z.prototype.drawDataLabels.apply(this, arguments), this.points = b, this.options.dataLabels.textPath = a)
            },
            seriesBox: function() {
                var a = this.chart,
                    b = Math.max,
                    e = Math.min,
                    c, d = [a.plotLeft, a.plotLeft +
                        a.plotWidth, a.plotTop, a.plotTop + a.plotHeight
                    ];
                this.data.forEach(function(a) {
                    D(a.plotX) && D(a.plotY) && a.marker.radius && (c = a.marker.radius, d[0] = e(d[0], a.plotX - c), d[1] = b(d[1], a.plotX + c), d[2] = e(d[2], a.plotY - c), d[3] = b(d[3], a.plotY + c))
                });
                return m(d.width / d.height) ? d : null
            },
            calculateParentRadius: function() {
                var a = this.seriesBox();
                this.parentNodeRadius = y(Math.sqrt(2 * this.parentNodeMass / Math.PI) + 20, 20, a ? Math.max(Math.sqrt(Math.pow(a.width, 2) + Math.pow(a.height, 2)) / 2 + 20, 20) : Math.sqrt(2 * this.parentNodeMass / Math.PI) +
                    20);
                this.parentNode && (this.parentNode.marker.radius = this.parentNode.radius = this.parentNodeRadius)
            },
            drawGraph: function() {
                if (this.layout && this.layout.options.splitSeries) {
                    var a = this.chart,
                        b = this.layout.options.parentNodeOptions.marker;
                    b = {
                        fill: b.fillColor || l(this.color).brighten(.4).get(),
                        opacity: b.fillOpacity,
                        stroke: b.lineColor || this.color,
                        "stroke-width": b.lineWidth
                    };
                    var e = this.visible ? "inherit" : "hidden";
                    this.parentNodesGroup || (this.parentNodesGroup = this.plotGroup("parentNodesGroup", "parentNode", e,
                        .1, a.seriesGroup), this.group.attr({
                        zIndex: 2
                    }));
                    this.calculateParentRadius();
                    e = C({
                        x: this.parentNode.plotX - this.parentNodeRadius,
                        y: this.parentNode.plotY - this.parentNodeRadius,
                        width: 2 * this.parentNodeRadius,
                        height: 2 * this.parentNodeRadius
                    }, b);
                    this.parentNode.graphic || (this.graph = this.parentNode.graphic = a.renderer.symbol(b.symbol).add(this.parentNodesGroup));
                    this.parentNode.graphic.attr(e)
                }
            },
            createParentNodes: function() {
                var a = this,
                    b = a.chart,
                    c = a.parentNodeLayout,
                    d, h = a.parentNode;
                a.parentNodeMass = 0;
                a.points.forEach(function(b) {
                    a.parentNodeMass +=
                        Math.PI * Math.pow(b.marker.radius, 2)
                });
                a.calculateParentRadius();
                c.nodes.forEach(function(b) {
                    b.seriesIndex === a.index && (d = !0)
                });
                c.setArea(0, 0, b.plotWidth, b.plotHeight);
                d || (h || (h = (new e).init(this, {
                    mass: a.parentNodeRadius / 2,
                    marker: {
                        radius: a.parentNodeRadius
                    },
                    dataLabels: {
                        inside: !1
                    },
                    dataLabelOnNull: !0,
                    degree: a.parentNodeRadius,
                    isParentNode: !0,
                    seriesIndex: a.index
                })), a.parentNode && (h.plotX = a.parentNode.plotX, h.plotY = a.parentNode.plotY), a.parentNode = h, c.addElementsToCollection([a], c.series), c.addElementsToCollection([h],
                    c.nodes))
            },
            addSeriesLayout: function() {
                var a = this.options.layoutAlgorithm,
                    b = this.chart.graphLayoutsStorage,
                    e = this.chart.graphLayoutsLookup,
                    d = C(a, a.parentNodeOptions, {
                        enableSimulation: this.layout.options.enableSimulation
                    });
                var h = b[a.type + "-series"];
                h || (b[a.type + "-series"] = h = new c.layouts[a.type], h.init(d), e.splice(h.index, 0, h));
                this.parentNodeLayout = h;
                this.createParentNodes()
            },
            addLayout: function() {
                var a = this.options.layoutAlgorithm,
                    b = this.chart.graphLayoutsStorage,
                    e = this.chart.graphLayoutsLookup,
                    d =
                    this.chart.options.chart;
                b || (this.chart.graphLayoutsStorage = b = {}, this.chart.graphLayoutsLookup = e = []);
                var h = b[a.type];
                h || (a.enableSimulation = D(d.forExport) ? !d.forExport : a.enableSimulation, b[a.type] = h = new c.layouts[a.type], h.init(a), e.splice(h.index, 0, h));
                this.layout = h;
                this.points.forEach(function(a) {
                    a.mass = 2;
                    a.degree = 1;
                    a.collisionNmb = 1
                });
                h.setArea(0, 0, this.chart.plotWidth, this.chart.plotHeight);
                h.addElementsToCollection([this], h.series);
                h.addElementsToCollection(this.points, h.nodes)
            },
            deferLayout: function() {
                var a =
                    this.options.layoutAlgorithm;
                this.visible && (this.addLayout(), a.splitSeries && this.addSeriesLayout())
            },
            translate: function() {
                var a = this.chart,
                    b = this.data,
                    e = this.index,
                    c, h = this.options.useSimulation;
                this.processedXData = this.xData;
                this.generatePoints();
                D(a.allDataPoints) || (a.allDataPoints = this.accumulateAllPoints(this), this.getPointRadius());
                if (h) var d = a.allDataPoints;
                else d = this.placeBubbles(a.allDataPoints), this.options.draggable = !1;
                for (c = 0; c < d.length; c++)
                    if (d[c][3] === e) {
                        var k = b[d[c][4]];
                        var l = d[c][2];
                        h || (k.plotX = d[c][0] - a.plotLeft + a.diffX, k.plotY = d[c][1] - a.plotTop + a.diffY);
                        k.marker = x(k.marker, {
                            radius: l,
                            width: 2 * l,
                            height: 2 * l
                        });
                        k.radius = l
                    }
                h && this.deferLayout();
                g(this, "afterTranslate")
            },
            checkOverlap: function(a, b) {
                var f = a[0] - b[0],
                    e = a[1] - b[1];
                return -.001 > Math.sqrt(f * f + e * e) - Math.abs(a[2] + b[2])
            },
            positionBubble: function(a, b, e) {
                var f = Math.sqrt,
                    c = Math.asin,
                    d = Math.acos,
                    h = Math.pow,
                    g = Math.abs;
                f = f(h(a[0] - b[0], 2) + h(a[1] - b[1], 2));
                d = d((h(f, 2) + h(e[2] + b[2], 2) - h(e[2] + a[2], 2)) / (2 * (e[2] + b[2]) * f));
                c = c(g(a[0] - b[0]) / f);
                a = (0 > a[1] - b[1] ? 0 : Math.PI) + d + c * (0 > (a[0] - b[0]) * (a[1] - b[1]) ? 1 : -1);
                return [b[0] + (b[2] + e[2]) * Math.sin(a), b[1] - (b[2] + e[2]) * Math.cos(a), e[2], e[3], e[4]]
            },
            placeBubbles: function(a) {
                var b = this.checkOverlap,
                    f = this.positionBubble,
                    e = [],
                    c = 1,
                    d = 0,
                    h = 0;
                var g = [];
                var k;
                a = a.sort(function(a, b) {
                    return b[2] - a[2]
                });
                if (a.length) {
                    e.push([
                        [0, 0, a[0][2], a[0][3], a[0][4]]
                    ]);
                    if (1 < a.length)
                        for (e.push([
                                [0, 0 - a[1][2] - a[0][2], a[1][2], a[1][3], a[1][4]]
                            ]), k = 2; k < a.length; k++) a[k][2] = a[k][2] || 1, g = f(e[c][d], e[c - 1][h], a[k]), b(g, e[c][0]) ? (e.push([]),
                            h = 0, e[c + 1].push(f(e[c][d], e[c][0], a[k])), c++, d = 0) : 1 < c && e[c - 1][h + 1] && b(g, e[c - 1][h + 1]) ? (h++, e[c].push(f(e[c][d], e[c - 1][h], a[k])), d++) : (d++, e[c].push(g));
                    this.chart.stages = e;
                    this.chart.rawPositions = [].concat.apply([], e);
                    this.resizeRadius();
                    g = this.chart.rawPositions
                }
                return g
            },
            resizeRadius: function() {
                var a = this.chart,
                    b = a.rawPositions,
                    e = Math.min,
                    c = Math.max,
                    d = a.plotLeft,
                    h = a.plotTop,
                    g = a.plotHeight,
                    k = a.plotWidth,
                    l, m, q;
                var r = l = Number.POSITIVE_INFINITY;
                var t = m = Number.NEGATIVE_INFINITY;
                for (q = 0; q < b.length; q++) {
                    var u =
                        b[q][2];
                    r = e(r, b[q][0] - u);
                    t = c(t, b[q][0] + u);
                    l = e(l, b[q][1] - u);
                    m = c(m, b[q][1] + u)
                }
                q = [t - r, m - l];
                e = e.apply([], [(k - d) / q[0], (g - h) / q[1]]);
                if (1e-10 < Math.abs(e - 1)) {
                    for (q = 0; q < b.length; q++) b[q][2] *= e;
                    this.placeBubbles(b)
                } else a.diffY = g / 2 + h - l - (m - l) / 2, a.diffX = k / 2 + d - r - (t - r) / 2
            },
            calculateZExtremes: function() {
                var a = this.options.zMin,
                    b = this.options.zMax,
                    e = Infinity,
                    c = -Infinity;
                if (a && b) return [a, b];
                this.chart.series.forEach(function(a) {
                    a.yData.forEach(function(a) {
                        D(a) && (a > c && (c = a), a < e && (e = a))
                    })
                });
                a = k(a, e);
                b = k(b, c);
                return [a,
                    b
                ]
            },
            getPointRadius: function() {
                var a = this,
                    b = a.chart,
                    e = a.options,
                    c = e.useSimulation,
                    d = Math.min(b.plotWidth, b.plotHeight),
                    h = {},
                    g = [],
                    k = b.allDataPoints,
                    l, m, q, r;
                ["minSize", "maxSize"].forEach(function(a) {
                    var b = parseInt(e[a], 10),
                        f = /%$/.test(e[a]);
                    h[a] = f ? d * b / 100 : b * Math.sqrt(k.length)
                });
                b.minRadius = l = h.minSize / Math.sqrt(k.length);
                b.maxRadius = m = h.maxSize / Math.sqrt(k.length);
                var t = c ? a.calculateZExtremes() : [l, m];
                (k || []).forEach(function(b, e) {
                    q = c ? y(b[2], t[0], t[1]) : b[2];
                    r = a.getRadius(t[0], t[1], l, m, q);
                    0 === r && (r = null);
                    k[e][2] = r;
                    g.push(r)
                });
                a.radii = g
            },
            redrawHalo: h.redrawHalo,
            onMouseDown: h.onMouseDown,
            onMouseMove: h.onMouseMove,
            onMouseUp: function(a) {
                if (a.fixedPosition && !a.removed) {
                    var b, e, c = this.layout,
                        f = this.parentNodeLayout;
                    f && c.options.dragBetweenSeries && f.nodes.forEach(function(f) {
                        a && a.marker && f !== a.series.parentNode && (b = c.getDistXY(a, f), e = c.vectorLength(b) - f.marker.radius - a.marker.radius, 0 > e && (f.series.addPoint(C(a.options, {
                            plotX: a.plotX,
                            plotY: a.plotY
                        }), !1), c.removeElementFromCollection(a, c.nodes), a.remove()))
                    });
                    h.onMouseUp.apply(this, arguments)
                }
            },
            destroy: function() {
                this.chart.graphLayoutsLookup && this.chart.graphLayoutsLookup.forEach(function(a) {
                    a.removeElementFromCollection(this, a.series)
                }, this);
                this.parentNode && (this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes), this.parentNode.dataLabel && (this.parentNode.dataLabel = this.parentNode.dataLabel.destroy()));
                c.Series.prototype.destroy.apply(this, arguments)
            },
            alignDataLabel: c.Series.prototype.alignDataLabel
        }, {
            destroy: function() {
                this.series.layout &&
                    this.series.layout.removeElementFromCollection(this, this.series.layout.nodes);
                return d.prototype.destroy.apply(this, arguments)
            }
        });
        t(A, "beforeRedraw", function() {
            this.allDataPoints && delete this.allDataPoints
        });
        ""
    });
    B(c, "parts-more/Polar.js", [c["parts/Globals.js"], c["parts/Utilities.js"], c["parts-more/Pane.js"]], function(c, a, d) {
        var b = a.addEvent,
            l = a.animObject,
            t = a.defined,
            y = a.find,
            D = a.isNumber,
            x = a.pick,
            g = a.splat,
            u = a.uniqueKey,
            m = a.wrap,
            C = c.Series,
            k = c.seriesTypes,
            z = C.prototype,
            A = c.Pointer.prototype;
        z.searchPointByAngle =
            function(a) {
                var b = this.chart,
                    e = this.xAxis.pane.center;
                return this.searchKDTree({
                    clientX: 180 + -180 / Math.PI * Math.atan2(a.chartX - e[0] - b.plotLeft, a.chartY - e[1] - b.plotTop)
                })
            };
        z.getConnectors = function(a, b, c, d) {
            var e = d ? 1 : 0;
            var f = 0 <= b && b <= a.length - 1 ? b : 0 > b ? a.length - 1 + b : 0;
            b = 0 > f - 1 ? a.length - (1 + e) : f - 1;
            e = f + 1 > a.length - 1 ? e : f + 1;
            var h = a[b];
            e = a[e];
            var g = h.plotX;
            h = h.plotY;
            var k = e.plotX;
            var p = e.plotY;
            e = a[f].plotX;
            f = a[f].plotY;
            g = (1.5 * e + g) / 2.5;
            h = (1.5 * f + h) / 2.5;
            k = (1.5 * e + k) / 2.5;
            var l = (1.5 * f + p) / 2.5;
            p = Math.sqrt(Math.pow(g - e,
                2) + Math.pow(h - f, 2));
            var m = Math.sqrt(Math.pow(k - e, 2) + Math.pow(l - f, 2));
            g = Math.atan2(h - f, g - e);
            l = Math.PI / 2 + (g + Math.atan2(l - f, k - e)) / 2;
            Math.abs(g - l) > Math.PI / 2 && (l -= Math.PI);
            g = e + Math.cos(l) * p;
            h = f + Math.sin(l) * p;
            k = e + Math.cos(Math.PI + l) * m;
            l = f + Math.sin(Math.PI + l) * m;
            e = {
                rightContX: k,
                rightContY: l,
                leftContX: g,
                leftContY: h,
                plotX: e,
                plotY: f
            };
            c && (e.prevPointCont = this.getConnectors(a, b, !1, d));
            return e
        };
        z.toXY = function(a) {
            var b = this.chart,
                e = this.xAxis;
            var c = this.yAxis;
            var d = a.plotX,
                g = a.plotY,
                k = a.series,
                l = b.inverted,
                m =
                a.y,
                q = l ? d : c.len - g;
            l && k && !k.isRadialBar && (a.plotY = g = "number" === typeof m ? c.translate(m) || 0 : 0);
            a.rectPlotX = d;
            a.rectPlotY = g;
            c.center && (q += c.center[3] / 2);
            c = l ? c.postTranslate(g, q) : e.postTranslate(d, q);
            a.plotX = a.polarPlotX = c.x - b.plotLeft;
            a.plotY = a.polarPlotY = c.y - b.plotTop;
            this.kdByAngle ? (b = (d / Math.PI * 180 + e.pane.options.startAngle) % 360, 0 > b && (b += 360), a.clientX = b) : a.clientX = a.plotX
        };
        k.spline && (m(k.spline.prototype, "getPointSpline", function(a, b, c, d) {
            this.chart.polar ? d ? (a = this.getConnectors(b, d, !0, this.connectEnds),
                a = ["C", a.prevPointCont.rightContX, a.prevPointCont.rightContY, a.leftContX, a.leftContY, a.plotX, a.plotY]) : a = ["M", c.plotX, c.plotY] : a = a.call(this, b, c, d);
            return a
        }), k.areasplinerange && (k.areasplinerange.prototype.getPointSpline = k.spline.prototype.getPointSpline));
        b(C, "afterTranslate", function() {
            var a = this.chart;
            if (a.polar && this.xAxis) {
                (this.kdByAngle = a.tooltip && a.tooltip.shared) ? this.searchPoint = this.searchPointByAngle: this.options.findNearestPointBy = "xy";
                if (!this.preventPostTranslate)
                    for (var d = this.points,
                            f = d.length; f--;) this.toXY(d[f]), !a.hasParallelCoordinates && !this.yAxis.reversed && d[f].y < this.yAxis.min && (d[f].isNull = !0);
                this.hasClipCircleSetter || (this.hasClipCircleSetter = !!this.eventsToUnbind.push(b(this, "afterRender", function() {
                    if (a.polar) {
                        var b = this.yAxis.pane.center;
                        this.clipCircle ? this.clipCircle.animate({
                            x: b[0],
                            y: b[1],
                            r: b[2] / 2,
                            innerR: b[3] / 2
                        }) : this.clipCircle = a.renderer.clipCircle(b[0], b[1], b[2] / 2, b[3] / 2);
                        this.group.clip(this.clipCircle);
                        this.setClip = c.noop
                    }
                })))
            }
        }, {
            order: 2
        });
        m(z, "getGraphPath",
            function(a, b) {
                var e = this,
                    c;
                if (this.chart.polar) {
                    b = b || this.points;
                    for (c = 0; c < b.length; c++)
                        if (!b[c].isNull) {
                            var d = c;
                            break
                        }
                    if (!1 !== this.options.connectEnds && "undefined" !== typeof d) {
                        this.connectEnds = !0;
                        b.splice(b.length, 0, b[d]);
                        var h = !0
                    }
                    b.forEach(function(a) {
                        "undefined" === typeof a.polarPlotY && e.toXY(a)
                    })
                }
                c = a.apply(this, [].slice.call(arguments, 1));
                h && b.pop();
                return c
            });
        var q = function(a, b) {
            var e = this,
                d = this.chart,
                h = this.options.animation,
                g = this.group,
                k = this.markerGroup,
                m = this.xAxis.center,
                q = d.plotLeft,
                r =
                d.plotTop,
                t, u, z, y;
            if (d.polar)
                if (e.isRadialBar) b || (e.startAngleRad = x(e.translatedThreshold, e.xAxis.startAngleRad), c.seriesTypes.pie.prototype.animate.call(e, b));
                else {
                    if (d.renderer.isSVG)
                        if (h = l(h), e.is("column")) {
                            if (!b) {
                                var A = m[3] / 2;
                                e.points.forEach(function(a) {
                                    t = a.graphic;
                                    z = (u = a.shapeArgs) && u.r;
                                    y = u && u.innerR;
                                    t && u && (t.attr({
                                        r: A,
                                        innerR: A
                                    }), t.animate({
                                        r: z,
                                        innerR: y
                                    }, e.options.animation))
                                })
                            }
                        } else b ? (a = {
                            translateX: m[0] + q,
                            translateY: m[1] + r,
                            scaleX: .001,
                            scaleY: .001
                        }, g.attr(a), k && k.attr(a)) : (a = {
                            translateX: q,
                            translateY: r,
                            scaleX: 1,
                            scaleY: 1
                        }, g.animate(a, h), k && k.animate(a, h))
                }
            else a.call(this, b)
        };
        m(z, "animate", q);
        k.column && (C = k.arearange.prototype, k = k.column.prototype, k.polarArc = function(a, b, c, d) {
            var e = this.xAxis.center,
                f = this.yAxis.len,
                h = e[3] / 2;
            b = f - b + h;
            a = f - x(a, f) + h;
            this.yAxis.reversed && (0 > b && (b = h), 0 > a && (a = h));
            return {
                x: e[0],
                y: e[1],
                r: b,
                innerR: a,
                start: c,
                end: d
            }
        }, m(k, "animate", q), m(k, "translate", function(b) {
            var c = this.options,
                e = c.stacking,
                d = this.chart,
                g = this.xAxis,
                k = this.yAxis,
                l = k.reversed,
                m = k.center,
                q = g.startAngleRad,
                r = g.endAngleRad - q;
            this.preventPostTranslate = !0;
            b.call(this);
            if (g.isRadial) {
                b = this.points;
                g = b.length;
                var u = k.translate(k.min);
                var z = k.translate(k.max);
                c = c.threshold || 0;
                if (d.inverted && D(c)) {
                    var y = k.translate(c);
                    t(y) && (0 > y ? y = 0 : y > r && (y = r), this.translatedThreshold = y + q)
                }
                for (; g--;) {
                    c = b[g];
                    var x = c.barX;
                    var A = c.x;
                    var C = c.y;
                    c.shapeType = "arc";
                    if (d.inverted) {
                        c.plotY = k.translate(C);
                        if (e && k.stacking) {
                            if (C = k.stacking.stacks[(0 > C ? "-" : "") + this.stackKey], this.visible && C && C[A] && !c.isNull) {
                                var B = C[A].points[this.getStackIndicator(void 0,
                                    A, this.index).key];
                                var F = k.translate(B[0]);
                                B = k.translate(B[1]);
                                t(F) && (F = a.clamp(F, 0, r))
                            }
                        } else F = y, B = c.plotY;
                        F > B && (B = [F, F = B][0]);
                        if (!l)
                            if (F < u) F = u;
                            else if (B > z) B = z;
                        else {
                            if (B < u || F > z) F = B = 0
                        } else if (B > u) B = u;
                        else if (F < z) F = z;
                        else if (F > u || B < z) F = B = r;
                        k.min > k.max && (F = B = l ? r : 0);
                        F += q;
                        B += q;
                        m && (c.barX = x += m[3] / 2);
                        A = Math.max(x, 0);
                        C = Math.max(x + c.pointWidth, 0);
                        c.shapeArgs = {
                            x: m && m[0],
                            y: m && m[1],
                            r: C,
                            innerR: A,
                            start: F,
                            end: B
                        };
                        c.opacity = F === B ? 0 : void 0;
                        c.plotY = (t(this.translatedThreshold) && (F < this.translatedThreshold ? F : B)) - q
                    } else F =
                        x + q, c.shapeArgs = this.polarArc(c.yBottom, c.plotY, F, F + c.pointWidth);
                    this.toXY(c);
                    d.inverted ? (x = k.postTranslate(c.rectPlotY, x + c.pointWidth / 2), c.tooltipPos = [x.x - d.plotLeft, x.y - d.plotTop]) : c.tooltipPos = [c.plotX, c.plotY];
                    m && (c.ttBelow = c.plotY > m[1])
                }
            }
        }), k.findAlignments = function(a, b) {
            null === b.align && (b.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center");
            null === b.verticalAlign && (b.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle");
            return b
        }, C && (C.findAlignments = k.findAlignments), m(k, "alignDataLabel",
            function(a, b, c, d, g, k) {
                var e = this.chart,
                    f = x(d.inside, !!this.options.stacking);
                e.polar ? (a = b.rectPlotX / Math.PI * 180, e.inverted ? (this.forceDL = e.isInsidePlot(b.plotX, Math.round(b.plotY), !1), f && b.shapeArgs ? (g = b.shapeArgs, g = this.yAxis.postTranslate((g.start + g.end) / 2 - this.xAxis.startAngleRad, b.barX + b.pointWidth / 2), g = {
                    x: g.x - e.plotLeft,
                    y: g.y - e.plotTop
                }) : b.tooltipPos && (g = {
                    x: b.tooltipPos[0],
                    y: b.tooltipPos[1]
                }), d.align = x(d.align, "center"), d.verticalAlign = x(d.verticalAlign, "middle")) : this.findAlignments && (d = this.findAlignments(a,
                    d)), z.alignDataLabel.call(this, b, c, d, g, k), this.isRadialBar && b.shapeArgs && b.shapeArgs.start === b.shapeArgs.end && c.hide(!0)) : a.call(this, b, c, d, g, k)
            }));
        m(A, "getCoordinates", function(a, b) {
            var c = this.chart,
                e = {
                    xAxis: [],
                    yAxis: []
                };
            c.polar ? c.axes.forEach(function(a) {
                var d = a.isXAxis,
                    f = a.center;
                if ("colorAxis" !== a.coll) {
                    var g = b.chartX - f[0] - c.plotLeft;
                    f = b.chartY - f[1] - c.plotTop;
                    e[d ? "xAxis" : "yAxis"].push({
                        axis: a,
                        value: a.translate(d ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)), !0)
                    })
                }
            }) : e = a.call(this,
                b);
            return e
        });
        c.SVGRenderer.prototype.clipCircle = function(a, b, c, d) {
            var e = u(),
                f = this.createElement("clipPath").attr({
                    id: e
                }).add(this.defs);
            a = d ? this.arc(a, b, c, d, 0, 2 * Math.PI).add(f) : this.circle(a, b, c).add(f);
            a.id = e;
            a.clipPath = f;
            return a
        };
        b(c.Chart, "getAxes", function() {
            this.pane || (this.pane = []);
            g(this.options.pane).forEach(function(a) {
                new d(a, this)
            }, this)
        });
        b(c.Chart, "afterDrawChartBox", function() {
            this.pane.forEach(function(a) {
                a.render()
            })
        });
        b(c.Series, "afterInit", function() {
            var a = this.chart;
            a.inverted &&
                a.polar && (this.isRadialSeries = !0, this.is("column") && (this.isRadialBar = !0))
        });
        m(c.Chart.prototype, "get", function(a, b) {
            return y(this.pane, function(a) {
                return a.options.id === b
            }) || a.call(this, b)
        })
    });
    B(c, "masters/highcharts-more.src.js", [], function() {})
});
//# sourceMappingURL=highcharts-more.js.map