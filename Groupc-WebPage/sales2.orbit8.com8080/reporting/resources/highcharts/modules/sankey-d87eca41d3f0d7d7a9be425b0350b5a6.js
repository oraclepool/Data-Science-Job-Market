/*
 Highcharts JS v8.1.0 (2020-05-05)

 Sankey diagram module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(b) {
    "object" === typeof module && module.exports ? (b["default"] = b, module.exports = b) : "function" === typeof define && define.amd ? define("highcharts/modules/sankey", ["highcharts"], function(n) {
        b(n);
        b.Highcharts = n;
        return b
    }) : b("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(b) {
    function n(b, h, k, l) {
        b.hasOwnProperty(h) || (b[h] = l.apply(null, k))
    }
    b = b ? b._modules : {};
    n(b, "mixins/nodes.js", [b["parts/Globals.js"], b["parts/Point.js"], b["parts/Utilities.js"]], function(b, h, k) {
        var l = k.defined,
            u = k.extend,
            q = k.find,
            n = k.pick;
        b.NodesMixin = {
            createNode: function(b) {
                function d(a, d) {
                    return q(a, function(c) {
                        return c.id === d
                    })
                }
                var a = d(this.nodes, b),
                    x = this.pointClass;
                if (!a) {
                    var h = this.options.nodes && d(this.options.nodes, b);
                    a = (new x).init(this, u({
                        className: "highcharts-node",
                        isNode: !0,
                        id: b,
                        y: 1
                    }, h));
                    a.linksTo = [];
                    a.linksFrom = [];
                    a.formatPrefix = "node";
                    a.name = a.name || a.options.id;
                    a.mass = n(a.options.mass, a.options.marker && a.options.marker.radius, this.options.marker && this.options.marker.radius, 4);
                    a.getSum = function() {
                        var d =
                            0,
                            b = 0;
                        a.linksTo.forEach(function(c) {
                            d += c.weight
                        });
                        a.linksFrom.forEach(function(c) {
                            b += c.weight
                        });
                        return Math.max(d, b)
                    };
                    a.offset = function(d, b) {
                        for (var c = 0, e = 0; e < a[b].length; e++) {
                            if (a[b][e] === d) return c;
                            c += a[b][e].weight
                        }
                    };
                    a.hasShape = function() {
                        var d = 0;
                        a.linksTo.forEach(function(a) {
                            a.outgoing && d++
                        });
                        return !a.linksTo.length || d !== a.linksTo.length
                    };
                    this.nodes.push(a)
                }
                return a
            },
            generatePoints: function() {
                var h = this.chart,
                    d = {};
                b.Series.prototype.generatePoints.call(this);
                this.nodes || (this.nodes = []);
                this.colorCounter =
                    0;
                this.nodes.forEach(function(a) {
                    a.linksFrom.length = 0;
                    a.linksTo.length = 0;
                    a.level = a.options.level
                });
                this.points.forEach(function(a) {
                    l(a.from) && (d[a.from] || (d[a.from] = this.createNode(a.from)), d[a.from].linksFrom.push(a), a.fromNode = d[a.from], h.styledMode ? a.colorIndex = n(a.options.colorIndex, d[a.from].colorIndex) : a.color = a.options.color || d[a.from].color);
                    l(a.to) && (d[a.to] || (d[a.to] = this.createNode(a.to)), d[a.to].linksTo.push(a), a.toNode = d[a.to]);
                    a.name = a.name || a.id
                }, this);
                this.nodeLookup = d
            },
            setData: function() {
                this.nodes &&
                    (this.nodes.forEach(function(b) {
                        b.destroy()
                    }), this.nodes.length = 0);
                b.Series.prototype.setData.apply(this, arguments)
            },
            destroy: function() {
                this.data = [].concat(this.points || [], this.nodes);
                return b.Series.prototype.destroy.apply(this, arguments)
            },
            setNodeState: function(b) {
                var d = arguments,
                    a = this.isNode ? this.linksTo.concat(this.linksFrom) : [this.fromNode, this.toNode];
                "select" !== b && a.forEach(function(a) {
                    a && a.series && (h.prototype.setState.apply(a, d), a.isNode || (a.fromNode.graphic && h.prototype.setState.apply(a.fromNode,
                        d), a.toNode && a.toNode.graphic && h.prototype.setState.apply(a.toNode, d)))
                });
                h.prototype.setState.apply(this, d)
            }
        }
    });
    n(b, "mixins/tree-series.js", [b["parts/Color.js"], b["parts/Utilities.js"]], function(b, h) {
        var k = h.extend,
            l = h.isArray,
            n = h.isNumber,
            q = h.isObject,
            u = h.merge,
            r = h.pick;
        return {
            getColor: function(d, a) {
                var x = a.index,
                    h = a.mapOptionsToLevel,
                    k = a.parentColor,
                    l = a.parentColorIndex,
                    c = a.series,
                    e = a.colors,
                    B = a.siblings,
                    m = c.points,
                    g = c.chart.options.chart,
                    w;
                if (d) {
                    m = m[d.i];
                    d = h[d.level] || {};
                    if (h = m && d.colorByPoint) {
                        var f =
                            m.index % (e ? e.length : g.colorCount);
                        var p = e && e[f]
                    }
                    if (!c.chart.styledMode) {
                        e = m && m.options.color;
                        g = d && d.color;
                        if (w = k) w = (w = d && d.colorVariation) && "brightness" === w.key ? b.parse(k).brighten(x / B * w.to).get() : k;
                        w = r(e, g, p, w, c.color)
                    }
                    var t = r(m && m.options.colorIndex, d && d.colorIndex, f, l, a.colorIndex)
                }
                return {
                    color: w,
                    colorIndex: t
                }
            },
            getLevelOptions: function(d) {
                var a = null;
                if (q(d)) {
                    a = {};
                    var b = n(d.from) ? d.from : 1;
                    var h = d.levels;
                    var v = {};
                    var r = q(d.defaults) ? d.defaults : {};
                    l(h) && (v = h.reduce(function(a, e) {
                        if (q(e) && n(e.level)) {
                            var c =
                                u({}, e);
                            var m = "boolean" === typeof c.levelIsConstant ? c.levelIsConstant : r.levelIsConstant;
                            delete c.levelIsConstant;
                            delete c.level;
                            e = e.level + (m ? 0 : b - 1);
                            q(a[e]) ? k(a[e], c) : a[e] = c
                        }
                        return a
                    }, {}));
                    h = n(d.to) ? d.to : 1;
                    for (d = 0; d <= h; d++) a[d] = u({}, r, q(v[d]) ? v[d] : {})
                }
                return a
            },
            setTreeValues: function z(a, b) {
                var h = b.before,
                    l = b.idRoot,
                    c = b.mapIdToNode[l],
                    e = b.points[a.i],
                    B = e && e.options || {},
                    m = 0,
                    g = [];
                k(a, {
                    levelDynamic: a.level - (("boolean" === typeof b.levelIsConstant ? b.levelIsConstant : 1) ? 0 : c.level),
                    name: r(e && e.name, ""),
                    visible: l ===
                        a.id || ("boolean" === typeof b.visible ? b.visible : !1)
                });
                "function" === typeof h && (a = h(a, b));
                a.children.forEach(function(c, e) {
                    var f = k({}, b);
                    k(f, {
                        index: e,
                        siblings: a.children.length,
                        visible: a.visible
                    });
                    c = z(c, f);
                    g.push(c);
                    c.visible && (m += c.val)
                });
                a.visible = 0 < m || a.visible;
                h = r(B.value, m);
                k(a, {
                    children: g,
                    childrenTotal: m,
                    isLeaf: a.visible && !m,
                    val: h
                });
                return a
            },
            updateRootId: function(a) {
                if (q(a)) {
                    var b = q(a.options) ? a.options : {};
                    b = r(a.rootNode, b.rootId, "");
                    q(a.userOptions) && (a.userOptions.rootId = b);
                    a.rootNode = b
                }
                return b
            }
        }
    });
    n(b, "modules/sankey.src.js", [b["parts/Globals.js"], b["parts/Color.js"], b["parts/Point.js"], b["parts/Utilities.js"], b["mixins/tree-series.js"]], function(b, h, k, l, n) {
        var q = l.defined,
            u = l.find,
            r = l.isObject,
            d = l.merge,
            a = l.pick,
            x = l.relativeLength,
            z = l.seriesType,
            v = l.stableSort,
            K = n.getLevelOptions;
        z("sankey", "column", {
            borderWidth: 0,
            colorByPoint: !0,
            curveFactor: .33,
            dataLabels: {
                enabled: !0,
                backgroundColor: "none",
                crop: !1,
                nodeFormat: void 0,
                nodeFormatter: function() {
                    return this.point.name
                },
                format: void 0,
                formatter: function() {},
                inside: !0
            },
            inactiveOtherPoints: !0,
            linkOpacity: .5,
            minLinkWidth: 0,
            nodeWidth: 20,
            nodePadding: 10,
            showInLegend: !1,
            states: {
                hover: {
                    linkOpacity: 1
                },
                inactive: {
                    linkOpacity: .1,
                    opacity: .1,
                    animation: {
                        duration: 50
                    }
                }
            },
            tooltip: {
                followPointer: !0,
                headerFormat: '<span style="font-size: 10px">{series.name}</span><br/>',
                pointFormat: "{point.fromNode.name} \u2192 {point.toNode.name}: <b>{point.weight}</b><br/>",
                nodeFormat: "{point.name}: <b>{point.sum}</b><br/>"
            }
        }, {
            isCartesian: !1,
            invertable: !0,
            forceDL: !0,
            orderNodes: !0,
            pointArrayMap: ["from",
                "to"
            ],
            createNode: b.NodesMixin.createNode,
            searchPoint: b.noop,
            setData: b.NodesMixin.setData,
            destroy: b.NodesMixin.destroy,
            getNodePadding: function() {
                var a = this.options.nodePadding || 0;
                if (this.nodeColumns) {
                    var e = this.nodeColumns.reduce(function(a, c) {
                        return Math.max(a, c.length)
                    }, 0);
                    e * a > this.chart.plotSizeY && (a = this.chart.plotSizeY / e)
                }
                return a
            },
            createNodeColumn: function() {
                var a = this,
                    e = this.chart,
                    b = [];
                b.sum = function() {
                    return this.reduce(function(a, c) {
                        return a + c.getSum()
                    }, 0)
                };
                b.offset = function(c, e) {
                    for (var d =
                            0, f, m = a.nodePadding, g = 0; g < b.length; g++) {
                        f = b[g].getSum();
                        var B = Math.max(f * e, a.options.minLinkWidth);
                        f = f ? B + m : 0;
                        if (b[g] === c) return {
                            relativeTop: d + x(c.options.offset || 0, f)
                        };
                        d += f
                    }
                };
                b.top = function(c) {
                    var b = a.nodePadding,
                        d = this.reduce(function(e, d) {
                            0 < e && (e += b);
                            d = Math.max(d.getSum() * c, a.options.minLinkWidth);
                            return e + d
                        }, 0);
                    return (e.plotSizeY - d) / 2
                };
                return b
            },
            createNodeColumns: function() {
                var a = [];
                this.nodes.forEach(function(c) {
                    var b = -1,
                        e;
                    if (!q(c.options.column))
                        if (0 === c.linksTo.length) c.column = 0;
                        else {
                            for (e =
                                0; e < c.linksTo.length; e++) {
                                var d = c.linksTo[0];
                                if (d.fromNode.column > b) {
                                    var f = d.fromNode;
                                    b = f.column
                                }
                            }
                            c.column = b + 1;
                            f && "hanging" === f.options.layout && (c.hangsFrom = f, e = -1, u(f.linksFrom, function(a, b) {
                                (a = a.toNode === c) && (e = b);
                                return a
                            }), c.column += e)
                        }
                    a[c.column] || (a[c.column] = this.createNodeColumn());
                    a[c.column].push(c)
                }, this);
                for (var b = 0; b < a.length; b++) "undefined" === typeof a[b] && (a[b] = this.createNodeColumn());
                return a
            },
            hasData: function() {
                return !!this.processedXData.length
            },
            pointAttribs: function(c, b) {
                var e =
                    this,
                    d = e.mapOptionsToLevel[(c.isNode ? c.level : c.fromNode.level) || 0] || {},
                    g = c.options,
                    w = d.states && d.states[b] || {};
                b = ["colorByPoint", "borderColor", "borderWidth", "linkOpacity"].reduce(function(c, b) {
                    c[b] = a(w[b], g[b], d[b], e.options[b]);
                    return c
                }, {});
                var f = a(w.color, g.color, b.colorByPoint ? c.color : d.color);
                return c.isNode ? {
                    fill: f,
                    stroke: b.borderColor,
                    "stroke-width": b.borderWidth
                } : {
                    fill: h.parse(f).setOpacity(b.linkOpacity).get()
                }
            },
            generatePoints: function() {
                function a(c, b) {
                    "undefined" === typeof c.level && (c.level =
                        b, c.linksFrom.forEach(function(c) {
                            c.toNode && a(c.toNode, b + 1)
                        }))
                }
                b.NodesMixin.generatePoints.apply(this, arguments);
                this.orderNodes && (this.nodes.filter(function(a) {
                    return 0 === a.linksTo.length
                }).forEach(function(c) {
                    a(c, 0)
                }), v(this.nodes, function(a, c) {
                    return a.level - c.level
                }))
            },
            translateNode: function(c, b) {
                var e = this.translationFactor,
                    m = this.chart,
                    g = this.options,
                    h = c.getSum(),
                    f = Math.max(Math.round(h * e), this.options.minLinkWidth),
                    p = Math.round(g.borderWidth) % 2 / 2,
                    t = b.offset(c, e);
                b = Math.floor(a(t.absoluteTop,
                    b.top(e) + t.relativeTop)) + p;
                p = Math.floor(this.colDistance * c.column + g.borderWidth / 2) + p;
                p = m.inverted ? m.plotSizeX - p : p;
                e = Math.round(this.nodeWidth);
                (c.sum = h) ? (c.shapeType = "rect", c.nodeX = p, c.nodeY = b, c.shapeArgs = m.inverted ? {
                    x: p - e,
                    y: m.plotSizeY - b - f,
                    width: c.options.height || g.height || e,
                    height: c.options.width || g.width || f
                } : {
                    x: p,
                    y: b,
                    width: c.options.width || g.width || e,
                    height: c.options.height || g.height || f
                }, c.shapeArgs.display = c.hasShape() ? "" : "none", g = this.mapOptionsToLevel[c.level], h = c.options, h = r(h) ? h.dataLabels : {}, g = r(g) ? g.dataLabels : {}, g = d({
                    style: {}
                }, g, h), c.dlOptions = g, c.plotY = 1, c.tooltipPos = m.inverted ? [m.plotSizeY - c.shapeArgs.y - c.shapeArgs.height / 2, m.plotSizeX - c.shapeArgs.x - c.shapeArgs.width / 2] : [c.shapeArgs.x + c.shapeArgs.width / 2, c.shapeArgs.y + c.shapeArgs.height / 2]) : c.dlOptions = {
                    enabled: !1
                }
            },
            translateLink: function(a) {
                var b = function(b, c) {
                        var d;
                        c = b.offset(a, c) * h;
                        return Math.min(b.nodeY + c, b.nodeY + (null === (d = b.shapeArgs) || void 0 === d ? void 0 : d.height) - f)
                    },
                    c = a.fromNode,
                    d = a.toNode,
                    g = this.chart,
                    h = this.translationFactor,
                    f = Math.max(a.weight * h, this.options.minLinkWidth),
                    p = (g.inverted ? -this.colDistance : this.colDistance) * this.options.curveFactor,
                    t = b(c, "linksFrom");
                b = b(d, "linksTo");
                var l = c.nodeX,
                    k = this.nodeWidth;
                d = d.column * this.colDistance;
                var n = a.outgoing,
                    q = d > l + k;
                g.inverted && (t = g.plotSizeY - t, b = (g.plotSizeY || 0) - b, d = g.plotSizeX - d, k = -k, f = -f, q = l > d);
                a.shapeType = "path";
                a.linkBase = [t, t + f, b, b + f];
                if (q && "number" === typeof b) a.shapeArgs = {
                    d: [
                        ["M", l + k, t],
                        ["C", l + k + p, t, d - p, b, d, b],
                        ["L", d + (n ? k : 0), b + f / 2],
                        ["L", d, b + f],
                        ["C", d - p, b + f, l + k + p,
                            t + f, l + k, t + f
                        ],
                        ["Z"]
                    ]
                };
                else if ("number" === typeof b) {
                    p = d - 20 - f;
                    n = d - 20;
                    q = d;
                    var r = l + k,
                        A = r + 20,
                        u = A + f,
                        x = t,
                        v = t + f,
                        z = v + 20,
                        C = z + (g.plotHeight - t - f),
                        y = C + 20,
                        E = y + f,
                        F = b,
                        D = F + f,
                        G = D + 20,
                        H = y + .7 * f,
                        I = q - .7 * f,
                        J = r + .7 * f;
                    a.shapeArgs = {
                        d: [
                            ["M", r, x],
                            ["C", J, x, u, v - .7 * f, u, z],
                            ["L", u, C],
                            ["C", u, H, J, E, r, E],
                            ["L", q, E],
                            ["C", I, E, p, H, p, C],
                            ["L", p, G],
                            ["C", p, D - .7 * f, I, F, q, F],
                            ["L", q, D],
                            ["C", n, D, n, D, n, G],
                            ["L", n, C],
                            ["C", n, y, n, y, q, y],
                            ["L", r, y],
                            ["C", A, y, A, y, A, C],
                            ["L", A, z],
                            ["C", A, v, A, v, r, v],
                            ["Z"]
                        ]
                    }
                }
                a.dlBox = {
                    x: l + (d - l + k) / 2,
                    y: t + (b - t) / 2,
                    height: f,
                    width: 0
                };
                a.tooltipPos = g.inverted ? [g.plotSizeY - a.dlBox.y - f / 2, g.plotSizeX - a.dlBox.x] : [a.dlBox.x, a.dlBox.y + f / 2];
                a.y = a.plotY = 1;
                a.color || (a.color = c.color)
            },
            translate: function() {
                var a = this,
                    b = function(b) {
                        for (var c = b.slice(), e = a.options.minLinkWidth || 0, f, k = 0, l, p = h.plotSizeY - g.borderWidth - (b.length - 1) * d.nodePadding; b.length;) {
                            k = p / b.sum();
                            f = !1;
                            for (l = b.length; l--;) b[l].getSum() * k < e && (b.splice(l, 1), p -= e + d.nodePadding, f = !0);
                            if (!f) break
                        }
                        b.length = 0;
                        c.forEach(function(a) {
                            return b.push(a)
                        });
                        return k
                    };
                this.processedXData ||
                    this.processData();
                this.generatePoints();
                this.nodeColumns = this.createNodeColumns();
                this.nodeWidth = x(this.options.nodeWidth, this.chart.plotSizeX);
                var d = this,
                    h = this.chart,
                    g = this.options,
                    k = this.nodeWidth,
                    f = this.nodeColumns;
                this.nodePadding = this.getNodePadding();
                this.translationFactor = f.reduce(function(a, c) {
                    return Math.min(a, b(c))
                }, Infinity);
                this.colDistance = (h.plotSizeX - k - g.borderWidth) / Math.max(1, f.length - 1);
                d.mapOptionsToLevel = K({
                    from: 1,
                    levels: g.levels,
                    to: f.length - 1,
                    defaults: {
                        borderColor: g.borderColor,
                        borderRadius: g.borderRadius,
                        borderWidth: g.borderWidth,
                        color: d.color,
                        colorByPoint: g.colorByPoint,
                        levelIsConstant: !0,
                        linkColor: g.linkColor,
                        linkLineWidth: g.linkLineWidth,
                        linkOpacity: g.linkOpacity,
                        states: g.states
                    }
                });
                f.forEach(function(a) {
                    a.forEach(function(b) {
                        d.translateNode(b, a)
                    })
                }, this);
                this.nodes.forEach(function(a) {
                    a.linksFrom.forEach(function(a) {
                        (a.weight || a.isNull) && a.to && (d.translateLink(a), a.allowShadow = !1)
                    })
                })
            },
            render: function() {
                var a = this.points;
                this.points = this.points.concat(this.nodes || []);
                b.seriesTypes.column.prototype.render.call(this);
                this.points = a
            },
            animate: b.Series.prototype.animate
        }, {
            applyOptions: function(a, b) {
                k.prototype.applyOptions.call(this, a, b);
                q(this.options.level) && (this.options.column = this.column = this.options.level);
                return this
            },
            setState: b.NodesMixin.setNodeState,
            getClassName: function() {
                return (this.isNode ? "highcharts-node " : "highcharts-link ") + k.prototype.getClassName.call(this)
            },
            isValid: function() {
                return this.isNode || "number" === typeof this.weight
            }
        });
        ""
    });
    n(b, "masters/modules/sankey.src.js", [], function() {})
});
//# sourceMappingURL=sankey.js.map