/*
 Highmaps JS v8.1.0 (2020-05-05)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b) {
    "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/heatmap", ["highcharts"], function(r) {
        b(r);
        b.Highcharts = r;
        return b
    }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(b) {
    function r(b, h, g, z) {
        b.hasOwnProperty(h) || (b[h] = z.apply(null, g))
    }
    b = b ? b._modules : {};
    r(b, "parts-map/ColorSeriesMixin.js", [b["parts/Globals.js"]], function(b) {
        b.colorPointMixin = {
            setVisible: function(b) {
                var g = this,
                    h = b ? "show" :
                    "hide";
                g.visible = g.options.visible = !!b;
                ["graphic", "dataLabel"].forEach(function(b) {
                    if (g[b]) g[b][h]()
                })
            }
        };
        b.colorSeriesMixin = {
            optionalAxis: "colorAxis",
            colorAxis: 0,
            translateColors: function() {
                var b = this,
                    g = this.options.nullColor,
                    v = this.colorAxis,
                    r = this.colorKey;
                (this.data.length ? this.data : this.points).forEach(function(h) {
                    var p = h.getNestedProperty(r);
                    if (p = h.options.color || (h.isNull || null === h.value ? g : v && "undefined" !== typeof p ? v.toColor(p, h) : h.color || b.color)) h.color = p
                })
            }
        }
    });
    r(b, "parts-map/ColorAxis.js", [b["parts/Axis.js"], b["parts/Color.js"], b["parts/Globals.js"], b["parts/Legend.js"], b["mixins/legend-symbol.js"], b["parts/Point.js"], b["parts/Utilities.js"]], function(b, h, g, z, r, C, p) {
        var v = this && this.__extends || function() {
                var a = function(e, c) {
                    a = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(c, n) {
                        c.__proto__ = n
                    } || function(c, n) {
                        for (var k in n) n.hasOwnProperty(k) && (c[k] = n[k])
                    };
                    return a(e, c)
                };
                return function(e, c) {
                    function k() {
                        this.constructor = e
                    }
                    a(e, c);
                    e.prototype = null === c ? Object.create(c) :
                        (k.prototype = c.prototype, new k)
                }
            }(),
            w = h.parse;
        h = p.addEvent;
        var D = p.erase,
            u = p.extend,
            x = p.Fx,
            a = p.isNumber,
            f = p.merge,
            y = p.pick,
            F = p.splat;
        "";
        p = g.Chart;
        var q = g.Series,
            l = g.colorPointMixin,
            m = g.noop;
        u(q.prototype, g.colorSeriesMixin);
        u(C.prototype, l);
        p.prototype.collectionsWithUpdate.push("colorAxis");
        p.prototype.collectionsWithInit.colorAxis = [p.prototype.addColorAxis];
        var B = function(e) {
            function d(c, k) {
                var n = e.call(this, c, k) || this;
                n.beforePadding = !1;
                n.chart = void 0;
                n.coll = "colorAxis";
                n.dataClasses = void 0;
                n.legendItem =
                    void 0;
                n.legendItems = void 0;
                n.name = "";
                n.options = void 0;
                n.stops = void 0;
                n.visible = !0;
                n.init(c, k);
                return n
            }
            v(d, e);
            d.buildOptions = function(c, k, n) {
                c = c.options.legend || {};
                var t = n.layout ? "vertical" !== n.layout : "vertical" !== c.layout;
                return f(k, {
                    side: t ? 2 : 1,
                    reversed: !t
                }, n, {
                    opposite: !t,
                    showEmpty: !1,
                    title: null,
                    visible: c.enabled && (n ? !1 !== n.visible : !0)
                })
            };
            d.prototype.init = function(c, k) {
                var n = d.buildOptions(c, d.defaultOptions, k);
                this.coll = "colorAxis";
                e.prototype.init.call(this, c, n);
                k.dataClasses && this.initDataClasses(k);
                this.initStops();
                this.horiz = !n.opposite;
                this.zoomEnabled = !1
            };
            d.prototype.initDataClasses = function(c) {
                var k = this.chart,
                    n, t = 0,
                    a = k.options.chart.colorCount,
                    e = this.options,
                    d = c.dataClasses.length;
                this.dataClasses = n = [];
                this.legendItems = [];
                c.dataClasses.forEach(function(c, b) {
                    c = f(c);
                    n.push(c);
                    if (k.styledMode || !c.color) "category" === e.dataClassColor ? (k.styledMode || (b = k.options.colors, a = b.length, c.color = b[t]), c.colorIndex = t, t++, t === a && (t = 0)) : c.color = w(e.minColor).tweenTo(w(e.maxColor), 2 > d ? .5 : b / (d - 1))
                })
            };
            d.prototype.hasData =
                function() {
                    return !!(this.tickPositions || []).length
                };
            d.prototype.setTickPositions = function() {
                if (!this.dataClasses) return e.prototype.setTickPositions.call(this)
            };
            d.prototype.initStops = function() {
                this.stops = this.options.stops || [
                    [0, this.options.minColor],
                    [1, this.options.maxColor]
                ];
                this.stops.forEach(function(c) {
                    c.color = w(c[1])
                })
            };
            d.prototype.setOptions = function(c) {
                e.prototype.setOptions.call(this, c);
                this.options.crosshair = this.options.marker
            };
            d.prototype.setAxisSize = function() {
                var c = this.legendSymbol,
                    k = this.chart,
                    a = k.options.legend || {},
                    t, e;
                c ? (this.left = a = c.attr("x"), this.top = t = c.attr("y"), this.width = e = c.attr("width"), this.height = c = c.attr("height"), this.right = k.chartWidth - a - e, this.bottom = k.chartHeight - t - c, this.len = this.horiz ? e : c, this.pos = this.horiz ? a : t) : this.len = (this.horiz ? a.symbolWidth : a.symbolHeight) || d.defaultLegendLength
            };
            d.prototype.normalizedValue = function(c) {
                this.logarithmic && (c = this.logarithmic.log2lin(c));
                return 1 - (this.max - c) / (this.max - this.min || 1)
            };
            d.prototype.toColor = function(c, k) {
                var a =
                    this.dataClasses,
                    e = this.stops,
                    d;
                if (a)
                    for (d = a.length; d--;) {
                        var b = a[d];
                        var f = b.from;
                        e = b.to;
                        if (("undefined" === typeof f || c >= f) && ("undefined" === typeof e || c <= e)) {
                            var l = b.color;
                            k && (k.dataClass = d, k.colorIndex = b.colorIndex);
                            break
                        }
                    } else {
                        c = this.normalizedValue(c);
                        for (d = e.length; d-- && !(c > e[d][0]););
                        f = e[d] || e[d + 1];
                        e = e[d + 1] || f;
                        c = 1 - (e[0] - c) / (e[0] - f[0] || 1);
                        l = f.color.tweenTo(e.color, c)
                    }
                return l
            };
            d.prototype.getOffset = function() {
                var c = this.legendGroup,
                    k = this.chart.axisOffset[this.side];
                c && (this.axisParent = c, e.prototype.getOffset.call(this),
                    this.added || (this.added = !0, this.labelLeft = 0, this.labelRight = this.width), this.chart.axisOffset[this.side] = k)
            };
            d.prototype.setLegendColor = function() {
                var c = this.reversed,
                    k = c ? 1 : 0;
                c = c ? 0 : 1;
                k = this.horiz ? [k, 0, c, 0] : [0, c, 0, k];
                this.legendColor = {
                    linearGradient: {
                        x1: k[0],
                        y1: k[1],
                        x2: k[2],
                        y2: k[3]
                    },
                    stops: this.stops
                }
            };
            d.prototype.drawLegendSymbol = function(c, k) {
                var e = c.padding,
                    a = c.options,
                    f = this.horiz,
                    b = y(a.symbolWidth, f ? d.defaultLegendLength : 12),
                    l = y(a.symbolHeight, f ? 12 : d.defaultLegendLength),
                    m = y(a.labelPadding, f ? 16 :
                        30);
                a = y(a.itemDistance, 10);
                this.setLegendColor();
                k.legendSymbol = this.chart.renderer.rect(0, c.baseline - 11, b, l).attr({
                    zIndex: 1
                }).add(k.legendGroup);
                this.legendItemWidth = b + e + (f ? a : m);
                this.legendItemHeight = l + e + (f ? m : 0)
            };
            d.prototype.setState = function(c) {
                this.series.forEach(function(a) {
                    a.setState(c)
                })
            };
            d.prototype.setVisible = function() {};
            d.prototype.getSeriesExtremes = function() {
                var c = this.series,
                    a = c.length,
                    e;
                this.dataMin = Infinity;
                for (this.dataMax = -Infinity; a--;) {
                    var d = c[a];
                    var f = d.colorKey = y(d.options.colorKey,
                        d.colorKey, d.pointValKey, d.zoneAxis, "y");
                    var b = d.pointArrayMap;
                    var l = d[f + "Min"] && d[f + "Max"];
                    if (d[f + "Data"]) var m = d[f + "Data"];
                    else if (b) {
                        m = [];
                        b = b.indexOf(f);
                        var g = d.yData;
                        if (0 <= b && g)
                            for (e = 0; e < g.length; e++) m.push(y(g[e][b], g[e]))
                    } else m = d.yData;
                    l ? (d.minColorValue = d[f + "Min"], d.maxColorValue = d[f + "Max"]) : (m = q.prototype.getExtremes.call(d, m), d.minColorValue = m.dataMin, d.maxColorValue = m.dataMax);
                    "undefined" !== typeof d.minColorValue && (this.dataMin = Math.min(this.dataMin, d.minColorValue), this.dataMax = Math.max(this.dataMax,
                        d.maxColorValue));
                    l || q.prototype.applyExtremes.call(d)
                }
            };
            d.prototype.drawCrosshair = function(c, a) {
                var d = a && a.plotX,
                    k = a && a.plotY,
                    f = this.pos,
                    b = this.len;
                if (a) {
                    var l = this.toPixels(a.getNestedProperty(a.series.colorKey));
                    l < f ? l = f - 2 : l > f + b && (l = f + b + 2);
                    a.plotX = l;
                    a.plotY = this.len - l;
                    e.prototype.drawCrosshair.call(this, c, a);
                    a.plotX = d;
                    a.plotY = k;
                    this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, !this.chart.styledMode &&
                        this.crosshair && this.cross.attr({
                            fill: this.crosshair.color
                        }))
                }
            };
            d.prototype.getPlotLinePath = function(c) {
                var d = c.translatedValue;
                return a(d) ? this.horiz ? [
                    ["M", d - 4, this.top - 6],
                    ["L", d + 4, this.top - 6],
                    ["L", d, this.top],
                    ["Z"]
                ] : [
                    ["M", this.left, d],
                    ["L", this.left - 6, d + 6],
                    ["L", this.left - 6, d - 6],
                    ["Z"]
                ] : e.prototype.getPlotLinePath.call(this, c)
            };
            d.prototype.update = function(c, a) {
                var b = this.chart,
                    k = b.legend,
                    l = d.buildOptions(b, {}, c);
                this.series.forEach(function(c) {
                    c.isDirtyData = !0
                });
                (c.dataClasses && k.allItems || this.dataClasses) &&
                this.destroyItems();
                b.options[this.coll] = f(this.userOptions, l);
                e.prototype.update.call(this, l, a);
                this.legendItem && (this.setLegendColor(), k.colorizeItem(this, !0))
            };
            d.prototype.destroyItems = function() {
                var c = this.chart;
                this.legendItem ? c.legend.destroyItem(this) : this.legendItems && this.legendItems.forEach(function(a) {
                    c.legend.destroyItem(a)
                });
                c.isDirtyLegend = !0
            };
            d.prototype.remove = function(c) {
                this.destroyItems();
                e.prototype.remove.call(this, c)
            };
            d.prototype.getDataClassLegendSymbols = function() {
                var c = this,
                    a = c.chart,
                    d = c.legendItems,
                    e = a.options.legend,
                    f = e.valueDecimals,
                    b = e.valueSuffix || "",
                    l;
                d.length || c.dataClasses.forEach(function(e, k) {
                    var n = !0,
                        g = e.from,
                        q = e.to,
                        h = a.numberFormatter;
                    l = "";
                    "undefined" === typeof g ? l = "< " : "undefined" === typeof q && (l = "> ");
                    "undefined" !== typeof g && (l += h(g, f) + b);
                    "undefined" !== typeof g && "undefined" !== typeof q && (l += " - ");
                    "undefined" !== typeof q && (l += h(q, f) + b);
                    d.push(u({
                        chart: a,
                        name: l,
                        options: {},
                        drawLegendSymbol: r.drawRectangle,
                        visible: !0,
                        setState: m,
                        isDataClass: !0,
                        setVisible: function() {
                            n =
                                c.visible = !n;
                            c.series.forEach(function(a) {
                                a.points.forEach(function(a) {
                                    a.dataClass === k && a.setVisible(n)
                                })
                            });
                            a.legend.colorizeItem(this, n)
                        }
                    }, e))
                });
                return d
            };
            d.defaultLegendLength = 200;
            d.defaultOptions = {
                lineWidth: 0,
                minPadding: 0,
                maxPadding: 0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                startOnTick: !0,
                endOnTick: !0,
                offset: 0,
                marker: {
                    animation: {
                        duration: 50
                    },
                    width: .01,
                    color: "#999999"
                },
                labels: {
                    overflow: "justify",
                    rotation: 0
                },
                minColor: "#e6ebf5",
                maxColor: "#003399",
                tickLength: 5,
                showInLegend: !0
            };
            d.keepProps = ["legendGroup",
                "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"
            ];
            return d
        }(b);
        Array.prototype.push.apply(b.keepProps, B.keepProps);
        g.ColorAxis = B;
        ["fill", "stroke"].forEach(function(a) {
            x.prototype[a + "Setter"] = function() {
                this.elem.attr(a, w(this.start).tweenTo(w(this.end), this.pos), null, !0)
            }
        });
        h(p, "afterGetAxes", function() {
            var a = this,
                d = a.options;
            this.colorAxis = [];
            d.colorAxis && (d.colorAxis = F(d.colorAxis), d.colorAxis.forEach(function(c, d) {
                c.index = d;
                new B(a, c)
            }))
        });
        h(q, "bindAxes", function() {
            var a = this.axisTypes;
            a ? -1 === a.indexOf("colorAxis") && a.push("colorAxis") : this.axisTypes = ["colorAxis"]
        });
        h(z, "afterGetAllItems", function(a) {
            var d = [],
                c, e;
            (this.chart.colorAxis || []).forEach(function(e) {
                (c = e.options) && c.showInLegend && (c.dataClasses && c.visible ? d = d.concat(e.getDataClassLegendSymbols()) : c.visible && d.push(e), e.series.forEach(function(d) {
                    if (!d.options.showInLegend || c.dataClasses) "point" === d.options.legendType ? d.points.forEach(function(c) {
                        D(a.allItems, c)
                    }) : D(a.allItems, d)
                }))
            });
            for (e = d.length; e--;) a.allItems.unshift(d[e])
        });
        h(z, "afterColorizeItem", function(a) {
            a.visible && a.item.legendColor && a.item.legendSymbol.attr({
                fill: a.item.legendColor
            })
        });
        h(z, "afterUpdate", function() {
            var a = this.chart.colorAxis;
            a && a.forEach(function(a, c, e) {
                a.update({}, e)
            })
        });
        h(q, "afterTranslate", function() {
            (this.chart.colorAxis && this.chart.colorAxis.length || this.colorAttribs) && this.translateColors()
        });
        return B
    });
    r(b, "parts-map/ColorMapSeriesMixin.js", [b["parts/Globals.js"], b["parts/Point.js"], b["parts/Utilities.js"]], function(b, h, g) {
        var v = g.defined;
        g = b.noop;
        var r = b.seriesTypes;
        b.colorMapPointMixin = {
            dataLabelOnNull: !0,
            isValid: function() {
                return null !== this.value && Infinity !== this.value && -Infinity !== this.value
            },
            setState: function(b) {
                h.prototype.setState.call(this, b);
                this.graphic && this.graphic.attr({
                    zIndex: "hover" === b ? 1 : 0
                })
            }
        };
        b.colorMapSeriesMixin = {
            pointArrayMap: ["value"],
            axisTypes: ["xAxis", "yAxis", "colorAxis"],
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            getSymbol: g,
            parallelArrays: ["x", "y", "value"],
            colorKey: "value",
            pointAttribs: r.column.prototype.pointAttribs,
            colorAttribs: function(b) {
                var g = {};
                v(b.color) && (g[this.colorProp || "fill"] = b.color);
                return g
            }
        }
    });
    r(b, "parts-map/HeatmapSeries.js", [b["parts/Globals.js"], b["mixins/legend-symbol.js"], b["parts/Utilities.js"]], function(b, h, g) {
        var r = g.clamp,
            v = g.extend,
            C = g.fireEvent,
            p = g.isNumber,
            A = g.merge,
            w = g.pick;
        g = g.seriesType;
        var E = b.colorMapPointMixin,
            u = b.Series,
            x = b.SVGRenderer.prototype.symbols;
        g("heatmap", "scatter", {
            animation: !1,
            borderWidth: 0,
            nullColor: "#f7f7f7",
            dataLabels: {
                formatter: function() {
                    return this.point.value
                },
                inside: !0,
                verticalAlign: "middle",
                crop: !1,
                overflow: !1,
                padding: 0
            },
            marker: {
                symbol: "rect",
                radius: 0,
                lineColor: void 0,
                states: {
                    hover: {
                        lineWidthPlus: 0
                    },
                    select: {}
                }
            },
            clip: !0,
            pointRange: null,
            tooltip: {
                pointFormat: "{point.x}, {point.y}: {point.value}<br/>"
            },
            states: {
                hover: {
                    halo: !1,
                    brightness: .2
                }
            }
        }, A(b.colorMapSeriesMixin, {
            pointArrayMap: ["y", "value"],
            hasPointSpecificOptions: !0,
            getExtremesFromAll: !0,
            directTouch: !0,
            init: function() {
                u.prototype.init.apply(this, arguments);
                var a = this.options;
                a.pointRange = w(a.pointRange,
                    a.colsize || 1);
                this.yAxis.axisPointRange = a.rowsize || 1;
                v(x, {
                    ellipse: x.circle,
                    rect: x.square
                })
            },
            getSymbol: u.prototype.getSymbol,
            setClip: function(a) {
                var b = this.chart;
                u.prototype.setClip.apply(this, arguments);
                (!1 !== this.options.clip || a) && this.markerGroup.clip((a || this.clipBox) && this.sharedClipKey ? b[this.sharedClipKey] : b.clipRect)
            },
            translate: function() {
                var a = this.options,
                    b = a.marker && a.marker.symbol || "",
                    g = x[b] ? b : "rect";
                a = this.options;
                var h = -1 !== ["circle", "square"].indexOf(g);
                this.generatePoints();
                this.points.forEach(function(a) {
                    var f =
                        a.getCellAttributes(),
                        m = {
                            x: Math.min(f.x1, f.x2),
                            y: Math.min(f.y1, f.y2),
                            width: Math.max(Math.abs(f.x2 - f.x1), 0),
                            height: Math.max(Math.abs(f.y2 - f.y1), 0)
                        };
                    var q = a.hasImage = 0 === (a.marker && a.marker.symbol || b || "").indexOf("url");
                    if (h) {
                        var e = Math.abs(m.width - m.height);
                        m.x = Math.min(f.x1, f.x2) + (m.width < m.height ? 0 : e / 2);
                        m.y = Math.min(f.y1, f.y2) + (m.width < m.height ? e / 2 : 0);
                        m.width = m.height = Math.min(m.width, m.height)
                    }
                    e = {
                        plotX: (f.x1 + f.x2) / 2,
                        plotY: (f.y1 + f.y2) / 2,
                        clientX: (f.x1 + f.x2) / 2,
                        shapeType: "path",
                        shapeArgs: A(!0, m, {
                            d: x[g](m.x,
                                m.y, m.width, m.height)
                        })
                    };
                    q && (a.marker = {
                        width: m.width,
                        height: m.height
                    });
                    v(a, e)
                });
                C(this, "afterTranslate")
            },
            pointAttribs: function(a, f) {
                var g = u.prototype.pointAttribs.call(this, a, f),
                    h = this.options || {},
                    q = this.chart.options.plotOptions || {},
                    l = q.series || {},
                    m = q.heatmap || {};
                q = h.borderColor || m.borderColor || l.borderColor;
                l = h.borderWidth || m.borderWidth || l.borderWidth || g["stroke-width"];
                g.stroke = a && a.marker && a.marker.lineColor || h.marker && h.marker.lineColor || q || this.color;
                g["stroke-width"] = l;
                f && (a = A(h.states[f],
                    h.marker && h.marker.states[f], a.options.states && a.options.states[f] || {}), f = a.brightness, g.fill = a.color || b.color(g.fill).brighten(f || 0).get(), g.stroke = a.lineColor);
                return g
            },
            markerAttribs: function(a, b) {
                var f = a.marker || {},
                    g = this.options.marker || {},
                    h = a.shapeArgs || {},
                    l = {};
                if (a.hasImage) return {
                    x: a.plotX,
                    y: a.plotY
                };
                if (b) {
                    var m = g.states[b] || {};
                    var p = f.states && f.states[b] || {};
                    [
                        ["width", "x"],
                        ["height", "y"]
                    ].forEach(function(a) {
                        l[a[0]] = (p[a[0]] || m[a[0]] || h[a[0]]) + (p[a[0] + "Plus"] || m[a[0] + "Plus"] || 0);
                        l[a[1]] =
                            h[a[1]] + (h[a[0]] - l[a[0]]) / 2
                    })
                }
                return b ? l : h
            },
            drawPoints: function() {
                var a = this;
                if ((this.options.marker || {}).enabled || this._hasPointMarkers) u.prototype.drawPoints.call(this), this.points.forEach(function(b) {
                    b.graphic && b.graphic[a.chart.styledMode ? "css" : "animate"](a.colorAttribs(b))
                })
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            getValidPoints: function(a, b) {
                return u.prototype.getValidPoints.call(this, a, b, !0)
            },
            getBox: b.noop,
            drawLegendSymbol: h.drawRectangle,
            alignDataLabel: b.seriesTypes.column.prototype.alignDataLabel,
            getExtremes: function() {
                var a = u.prototype.getExtremes.call(this, this.valueData),
                    b = a.dataMin;
                a = a.dataMax;
                p(b) && (this.valueMin = b);
                p(a) && (this.valueMax = a);
                return u.prototype.getExtremes.call(this)
            }
        }), A(E, {
            applyOptions: function(a, f) {
                a = b.Point.prototype.applyOptions.call(this, a, f);
                a.formatPrefix = a.isNull || null === a.value ? "null" : "point";
                return a
            },
            isValid: function() {
                return Infinity !== this.value && -Infinity !== this.value
            },
            haloPath: function(a) {
                if (!a) return [];
                var b = this.shapeArgs;
                return ["M", b.x - a, b.y - a, "L", b.x -
                    a, b.y + b.height + a, b.x + b.width + a, b.y + b.height + a, b.x + b.width + a, b.y - a, "Z"
                ]
            },
            getCellAttributes: function() {
                var a = this.series,
                    b = a.options,
                    g = (b.colsize || 1) / 2,
                    h = (b.rowsize || 1) / 2,
                    q = a.xAxis,
                    l = a.yAxis,
                    m = this.options.marker || a.options.marker;
                a = a.pointPlacementToXValue();
                var p = w(this.pointPadding, b.pointPadding, 0),
                    e = {
                        x1: r(Math.round(q.len - (q.translate(this.x - g, !1, !0, !1, !0, -a) || 0)), -q.len, 2 * q.len),
                        x2: r(Math.round(q.len - (q.translate(this.x + g, !1, !0, !1, !0, -a) || 0)), -q.len, 2 * q.len),
                        y1: r(Math.round(l.translate(this.y -
                            h, !1, !0, !1, !0) || 0), -l.len, 2 * l.len),
                        y2: r(Math.round(l.translate(this.y + h, !1, !0, !1, !0) || 0), -l.len, 2 * l.len)
                    };
                [
                    ["width", "x"],
                    ["height", "y"]
                ].forEach(function(a) {
                    var b = a[0];
                    a = a[1];
                    var d = a + "1",
                        f = a + "2",
                        g = Math.abs(e[d] - e[f]),
                        h = m && m.lineWidth || 0,
                        l = Math.abs(e[d] + e[f]) / 2;
                    m[b] && m[b] < g && (e[d] = l - m[b] / 2 - h / 2, e[f] = l + m[b] / 2 + h / 2);
                    p && ("y" === a && (d = f, f = a + "1"), e[d] += p, e[f] -= p)
                });
                return e
            }
        }));
        ""
    });
    r(b, "masters/modules/heatmap.src.js", [], function() {})
});
//# sourceMappingURL=heatmap.js.map