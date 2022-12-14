/*
 Highcharts JS v8.1.0 (2020-05-05)

 (c) 2016-2019 Highsoft AS
 Authors: Jon Arild Nygard

 License: www.highcharts.com/license
*/
(function(d) {
    "object" === typeof module && module.exports ? (d["default"] = d, module.exports = d) : "function" === typeof define && define.amd ? define("highcharts/modules/sunburst", ["highcharts"], function(C) {
        d(C);
        d.Highcharts = C;
        return d
    }) : d("undefined" !== typeof Highcharts ? Highcharts : void 0)
})(function(d) {
    function C(d, b, y, w) {
        d.hasOwnProperty(b) || (d[b] = w.apply(null, y))
    }
    d = d ? d._modules : {};
    C(d, "mixins/draw-point.js", [], function() {
        var d = function(b) {
            var d, w = this,
                u = w.graphic,
                m = b.animatableAttribs,
                l = b.onComplete,
                q = b.css,
                B =
                b.renderer,
                g = null === (d = w.series) || void 0 === d ? void 0 : d.options.animation;
            if (w.shouldDraw()) u || (w.graphic = u = B[b.shapeType](b.shapeArgs).add(b.group)), u.css(q).attr(b.attribs).animate(m, b.isNew ? !1 : g, l);
            else if (u) {
                var t = function() {
                    w.graphic = u = u.destroy();
                    "function" === typeof l && l()
                };
                Object.keys(m).length ? u.animate(m, void 0, function() {
                    t()
                }) : t()
            }
        };
        return function(b) {
            (b.attribs = b.attribs || {})["class"] = this.getClassName();
            d.call(this, b)
        }
    });
    C(d, "mixins/tree-series.js", [d["parts/Color.js"], d["parts/Utilities.js"]],
        function(d, b) {
            var y = b.extend,
                w = b.isArray,
                u = b.isNumber,
                m = b.isObject,
                l = b.merge,
                q = b.pick;
            return {
                getColor: function(b, g) {
                    var t = g.index,
                        l = g.mapOptionsToLevel,
                        B = g.parentColor,
                        w = g.parentColorIndex,
                        m = g.series,
                        F = g.colors,
                        u = g.siblings,
                        v = m.points,
                        G = m.chart.options.chart,
                        E;
                    if (b) {
                        v = v[b.i];
                        b = l[b.level] || {};
                        if (l = v && b.colorByPoint) {
                            var D = v.index % (F ? F.length : G.colorCount);
                            var y = F && F[D]
                        }
                        if (!m.chart.styledMode) {
                            F = v && v.options.color;
                            G = b && b.color;
                            if (E = B) E = (E = b && b.colorVariation) && "brightness" === E.key ? d.parse(B).brighten(t /
                                u * E.to).get() : B;
                            E = q(F, G, y, E, m.color)
                        }
                        var I = q(v && v.options.colorIndex, b && b.colorIndex, D, w, g.colorIndex)
                    }
                    return {
                        color: E,
                        colorIndex: I
                    }
                },
                getLevelOptions: function(b) {
                    var g = null;
                    if (m(b)) {
                        g = {};
                        var d = u(b.from) ? b.from : 1;
                        var q = b.levels;
                        var B = {};
                        var I = m(b.defaults) ? b.defaults : {};
                        w(q) && (B = q.reduce(function(b, g) {
                            if (m(g) && u(g.level)) {
                                var t = l({}, g);
                                var q = "boolean" === typeof t.levelIsConstant ? t.levelIsConstant : I.levelIsConstant;
                                delete t.levelIsConstant;
                                delete t.level;
                                g = g.level + (q ? 0 : d - 1);
                                m(b[g]) ? y(b[g], t) : b[g] = t
                            }
                            return b
                        }, {}));
                        q = u(b.to) ? b.to : 1;
                        for (b = 0; b <= q; b++) g[b] = l({}, I, m(B[b]) ? B[b] : {})
                    }
                    return g
                },
                setTreeValues: function U(b, d) {
                    var g = d.before,
                        l = d.idRoot,
                        t = d.mapIdToNode[l],
                        m = d.points[b.i],
                        w = m && m.options || {},
                        v = 0,
                        u = [];
                    y(b, {
                        levelDynamic: b.level - (("boolean" === typeof d.levelIsConstant ? d.levelIsConstant : 1) ? 0 : t.level),
                        name: q(m && m.name, ""),
                        visible: l === b.id || ("boolean" === typeof d.visible ? d.visible : !1)
                    });
                    "function" === typeof g && (b = g(b, d));
                    b.children.forEach(function(g, l) {
                        var t = y({}, d);
                        y(t, {
                            index: l,
                            siblings: b.children.length,
                            visible: b.visible
                        });
                        g = U(g, t);
                        u.push(g);
                        g.visible && (v += g.val)
                    });
                    b.visible = 0 < v || b.visible;
                    g = q(w.value, v);
                    y(b, {
                        children: u,
                        childrenTotal: v,
                        isLeaf: b.visible && !v,
                        val: g
                    });
                    return b
                },
                updateRootId: function(b) {
                    if (m(b)) {
                        var d = m(b.options) ? b.options : {};
                        d = q(b.rootNode, d.rootId, "");
                        m(b.userOptions) && (b.userOptions.rootId = d);
                        b.rootNode = d
                    }
                    return d
                }
            }
        });
    C(d, "modules/treemap.src.js", [d["parts/Globals.js"], d["mixins/tree-series.js"], d["mixins/draw-point.js"], d["parts/Color.js"], d["mixins/legend-symbol.js"], d["parts/Point.js"], d["parts/Utilities.js"]],
        function(d, b, y, w, u, m, l) {
            var q = w.parse,
                B = l.addEvent,
                g = l.correctFloat,
                t = l.defined,
                I = l.error,
                C = l.extend,
                L = l.fireEvent,
                M = l.isArray,
                F = l.isNumber,
                Q = l.isObject,
                v = l.isString,
                G = l.merge,
                E = l.objectEach,
                D = l.pick;
            w = l.seriesType;
            var R = l.stableSort,
                K = d.seriesTypes;
            l = d.noop;
            var N = b.getColor,
                O = b.getLevelOptions,
                J = d.Series,
                f = function(a, c, e) {
                    e = e || this;
                    E(a, function(p, h) {
                        c.call(e, p, h, a)
                    })
                },
                k = function(a, c, e) {
                    e = e || this;
                    a = c.call(e, a);
                    !1 !== a && k(a, c, e)
                },
                z = b.updateRootId,
                n = !1;
            w("treemap", "scatter", {
                allowTraversingTree: !1,
                animationLimit: 250,
                showInLegend: !1,
                marker: !1,
                colorByPoint: !1,
                dataLabels: {
                    defer: !1,
                    enabled: !0,
                    formatter: function() {
                        var a = this && this.point ? this.point : {};
                        return v(a.name) ? a.name : ""
                    },
                    inside: !0,
                    verticalAlign: "middle"
                },
                tooltip: {
                    headerFormat: "",
                    pointFormat: "<b>{point.name}</b>: {point.value}<br/>"
                },
                ignoreHiddenPoint: !0,
                layoutAlgorithm: "sliceAndDice",
                layoutStartingDirection: "vertical",
                alternateStartingDirection: !1,
                levelIsConstant: !0,
                drillUpButton: {
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                traverseUpButton: {
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                },
                borderColor: "#e6e6e6",
                borderWidth: 1,
                colorKey: "colorValue",
                opacity: .15,
                states: {
                    hover: {
                        borderColor: "#999999",
                        brightness: K.heatmap ? 0 : .1,
                        halo: !1,
                        opacity: .75,
                        shadow: !1
                    }
                }
            }, {
                pointArrayMap: ["value"],
                directTouch: !0,
                optionalAxis: "colorAxis",
                getSymbol: l,
                parallelArrays: ["x", "y", "value", "colorValue"],
                colorKey: "colorValue",
                trackerGroups: ["group", "dataLabelsGroup"],
                getListOfParents: function(a, c) {
                    a = M(a) ? a : [];
                    var e = M(c) ? c : [];
                    c = a.reduce(function(a, c, e) {
                        c = D(c.parent, "");
                        "undefined" === typeof a[c] && (a[c] = []);
                        a[c].push(e);
                        return a
                    }, {
                        "": []
                    });
                    f(c, function(a, c, b) {
                        "" !== c && -1 === e.indexOf(c) && (a.forEach(function(a) {
                            b[""].push(a)
                        }), delete b[c])
                    });
                    return c
                },
                getTree: function() {
                    var a = this.data.map(function(a) {
                        return a.id
                    });
                    a = this.getListOfParents(this.data, a);
                    this.nodeMap = [];
                    return this.buildNode("", -1, 0, a, null)
                },
                hasData: function() {
                    return !!this.processedXData.length
                },
                init: function(a, c) {
                    var e = d.colorMapSeriesMixin;
                    e && (this.colorAttribs = e.colorAttribs);
                    this.eventsToUnbind.push(B(this, "setOptions", function(a) {
                        a =
                            a.userOptions;
                        t(a.allowDrillToNode) && !t(a.allowTraversingTree) && (a.allowTraversingTree = a.allowDrillToNode, delete a.allowDrillToNode);
                        t(a.drillUpButton) && !t(a.traverseUpButton) && (a.traverseUpButton = a.drillUpButton, delete a.drillUpButton)
                    }));
                    J.prototype.init.call(this, a, c);
                    this.options.allowTraversingTree && this.eventsToUnbind.push(B(this, "click", this.onClickDrillToNode))
                },
                buildNode: function(a, c, e, b, h) {
                    var f = this,
                        x = [],
                        p = f.points[c],
                        d = 0,
                        k;
                    (b[a] || []).forEach(function(c) {
                        k = f.buildNode(f.points[c].id, c,
                            e + 1, b, a);
                        d = Math.max(k.height + 1, d);
                        x.push(k)
                    });
                    c = {
                        id: a,
                        i: c,
                        children: x,
                        height: d,
                        level: e,
                        parent: h,
                        visible: !1
                    };
                    f.nodeMap[c.id] = c;
                    p && (p.node = c);
                    return c
                },
                setTreeValues: function(a) {
                    var c = this,
                        e = c.options,
                        b = c.nodeMap[c.rootNode];
                    e = "boolean" === typeof e.levelIsConstant ? e.levelIsConstant : !0;
                    var h = 0,
                        f = [],
                        x = c.points[a.i];
                    a.children.forEach(function(a) {
                        a = c.setTreeValues(a);
                        f.push(a);
                        a.ignore || (h += a.val)
                    });
                    R(f, function(a, c) {
                        return a.sortIndex - c.sortIndex
                    });
                    var d = D(x && x.options.value, h);
                    x && (x.value = d);
                    C(a, {
                        children: f,
                        childrenTotal: h,
                        ignore: !(D(x && x.visible, !0) && 0 < d),
                        isLeaf: a.visible && !h,
                        levelDynamic: a.level - (e ? 0 : b.level),
                        name: D(x && x.name, ""),
                        sortIndex: D(x && x.sortIndex, -d),
                        val: d
                    });
                    return a
                },
                calculateChildrenAreas: function(a, c) {
                    var e = this,
                        b = e.options,
                        h = e.mapOptionsToLevel[a.level + 1],
                        f = D(e[h && h.layoutAlgorithm] && h.layoutAlgorithm, b.layoutAlgorithm),
                        d = b.alternateStartingDirection,
                        k = [];
                    a = a.children.filter(function(a) {
                        return !a.ignore
                    });
                    h && h.layoutStartingDirection && (c.direction = "vertical" === h.layoutStartingDirection ?
                        0 : 1);
                    k = e[f](c, a);
                    a.forEach(function(a, h) {
                        h = k[h];
                        a.values = G(h, {
                            val: a.childrenTotal,
                            direction: d ? 1 - c.direction : c.direction
                        });
                        a.pointValues = G(h, {
                            x: h.x / e.axisRatio,
                            y: 100 - h.y - h.height,
                            width: h.width / e.axisRatio
                        });
                        a.children.length && e.calculateChildrenAreas(a, a.values)
                    })
                },
                setPointValues: function() {
                    var a = this,
                        c = a.xAxis,
                        e = a.yAxis,
                        b = a.chart.styledMode;
                    a.points.forEach(function(h) {
                        var f = h.node,
                            d = f.pointValues;
                        f = f.visible;
                        if (d && f) {
                            f = d.height;
                            var p = d.width,
                                k = d.x,
                                z = d.y,
                                r = b ? 0 : (a.pointAttribs(h)["stroke-width"] ||
                                    0) % 2 / 2;
                            d = Math.round(c.toPixels(k, !0)) - r;
                            p = Math.round(c.toPixels(k + p, !0)) - r;
                            k = Math.round(e.toPixels(z, !0)) - r;
                            f = Math.round(e.toPixels(z + f, !0)) - r;
                            h.shapeArgs = {
                                x: Math.min(d, p),
                                y: Math.min(k, f),
                                width: Math.abs(p - d),
                                height: Math.abs(f - k)
                            };
                            h.plotX = h.shapeArgs.x + h.shapeArgs.width / 2;
                            h.plotY = h.shapeArgs.y + h.shapeArgs.height / 2
                        } else delete h.plotX, delete h.plotY
                    })
                },
                setColorRecursive: function(a, c, e, f, h) {
                    var b = this,
                        d = b && b.chart;
                    d = d && d.options && d.options.colors;
                    if (a) {
                        var p = N(a, {
                            colors: d,
                            index: f,
                            mapOptionsToLevel: b.mapOptionsToLevel,
                            parentColor: c,
                            parentColorIndex: e,
                            series: b,
                            siblings: h
                        });
                        if (c = b.points[a.i]) c.color = p.color, c.colorIndex = p.colorIndex;
                        (a.children || []).forEach(function(c, e) {
                            b.setColorRecursive(c, p.color, p.colorIndex, e, a.children.length)
                        })
                    }
                },
                algorithmGroup: function(a, c, e, f) {
                    this.height = a;
                    this.width = c;
                    this.plot = f;
                    this.startDirection = this.direction = e;
                    this.lH = this.nH = this.lW = this.nW = this.total = 0;
                    this.elArr = [];
                    this.lP = {
                        total: 0,
                        lH: 0,
                        nH: 0,
                        lW: 0,
                        nW: 0,
                        nR: 0,
                        lR: 0,
                        aspectRatio: function(a, c) {
                            return Math.max(a / c, c / a)
                        }
                    };
                    this.addElement =
                        function(a) {
                            this.lP.total = this.elArr[this.elArr.length - 1];
                            this.total += a;
                            0 === this.direction ? (this.lW = this.nW, this.lP.lH = this.lP.total / this.lW, this.lP.lR = this.lP.aspectRatio(this.lW, this.lP.lH), this.nW = this.total / this.height, this.lP.nH = this.lP.total / this.nW, this.lP.nR = this.lP.aspectRatio(this.nW, this.lP.nH)) : (this.lH = this.nH, this.lP.lW = this.lP.total / this.lH, this.lP.lR = this.lP.aspectRatio(this.lP.lW, this.lH), this.nH = this.total / this.width, this.lP.nW = this.lP.total / this.nH, this.lP.nR = this.lP.aspectRatio(this.lP.nW,
                                this.nH));
                            this.elArr.push(a)
                        };
                    this.reset = function() {
                        this.lW = this.nW = 0;
                        this.elArr = [];
                        this.total = 0
                    }
                },
                algorithmCalcPoints: function(a, c, e, f) {
                    var h, b, d, p, k = e.lW,
                        z = e.lH,
                        r = e.plot,
                        n = 0,
                        l = e.elArr.length - 1;
                    if (c) k = e.nW, z = e.nH;
                    else var m = e.elArr[e.elArr.length - 1];
                    e.elArr.forEach(function(a) {
                        if (c || n < l) 0 === e.direction ? (h = r.x, b = r.y, d = k, p = a / d) : (h = r.x, b = r.y, p = z, d = a / p), f.push({
                            x: h,
                            y: b,
                            width: d,
                            height: g(p)
                        }), 0 === e.direction ? r.y += p : r.x += d;
                        n += 1
                    });
                    e.reset();
                    0 === e.direction ? e.width -= k : e.height -= z;
                    r.y = r.parent.y + (r.parent.height -
                        e.height);
                    r.x = r.parent.x + (r.parent.width - e.width);
                    a && (e.direction = 1 - e.direction);
                    c || e.addElement(m)
                },
                algorithmLowAspectRatio: function(a, c, e) {
                    var f = [],
                        h = this,
                        b, d = {
                            x: c.x,
                            y: c.y,
                            parent: c
                        },
                        k = 0,
                        z = e.length - 1,
                        n = new this.algorithmGroup(c.height, c.width, c.direction, d);
                    e.forEach(function(e) {
                        b = e.val / c.val * c.height * c.width;
                        n.addElement(b);
                        n.lP.nR > n.lP.lR && h.algorithmCalcPoints(a, !1, n, f, d);
                        k === z && h.algorithmCalcPoints(a, !0, n, f, d);
                        k += 1
                    });
                    return f
                },
                algorithmFill: function(a, c, e) {
                    var f = [],
                        h, b = c.direction,
                        d = c.x,
                        k = c.y,
                        z = c.width,
                        n = c.height,
                        r, l, g, m;
                    e.forEach(function(e) {
                        h = e.val / c.val * c.height * c.width;
                        r = d;
                        l = k;
                        0 === b ? (m = n, g = h / m, z -= g, d += g) : (g = z, m = h / g, n -= m, k += m);
                        f.push({
                            x: r,
                            y: l,
                            width: g,
                            height: m
                        });
                        a && (b = 1 - b)
                    });
                    return f
                },
                strip: function(a, c) {
                    return this.algorithmLowAspectRatio(!1, a, c)
                },
                squarified: function(a, c) {
                    return this.algorithmLowAspectRatio(!0, a, c)
                },
                sliceAndDice: function(a, c) {
                    return this.algorithmFill(!0, a, c)
                },
                stripes: function(a, c) {
                    return this.algorithmFill(!1, a, c)
                },
                translate: function() {
                    var a = this,
                        c = a.options,
                        e = z(a);
                    J.prototype.translate.call(a);
                    var f = a.tree = a.getTree();
                    var b = a.nodeMap[e];
                    a.renderTraverseUpButton(e);
                    a.mapOptionsToLevel = O({
                        from: b.level + 1,
                        levels: c.levels,
                        to: f.height,
                        defaults: {
                            levelIsConstant: a.options.levelIsConstant,
                            colorByPoint: c.colorByPoint
                        }
                    });
                    "" === e || b && b.children.length || (a.setRootNode("", !1), e = a.rootNode, b = a.nodeMap[e]);
                    k(a.nodeMap[a.rootNode], function(c) {
                        var e = !1,
                            b = c.parent;
                        c.visible = !0;
                        if (b || "" === b) e = a.nodeMap[b];
                        return e
                    });
                    k(a.nodeMap[a.rootNode].children, function(a) {
                        var c = !1;
                        a.forEach(function(a) {
                            a.visible = !0;
                            a.children.length && (c = (c || []).concat(a.children))
                        });
                        return c
                    });
                    a.setTreeValues(f);
                    a.axisRatio = a.xAxis.len / a.yAxis.len;
                    a.nodeMap[""].pointValues = e = {
                        x: 0,
                        y: 0,
                        width: 100,
                        height: 100
                    };
                    a.nodeMap[""].values = e = G(e, {
                        width: e.width * a.axisRatio,
                        direction: "vertical" === c.layoutStartingDirection ? 0 : 1,
                        val: f.val
                    });
                    a.calculateChildrenAreas(f, e);
                    a.colorAxis || c.colorByPoint || a.setColorRecursive(a.tree);
                    c.allowTraversingTree && (c = b.pointValues, a.xAxis.setExtremes(c.x, c.x + c.width, !1), a.yAxis.setExtremes(c.y, c.y + c.height, !1), a.xAxis.setScale(), a.yAxis.setScale());
                    a.setPointValues()
                },
                drawDataLabels: function() {
                    var a = this,
                        c = a.mapOptionsToLevel,
                        e, b;
                    a.points.filter(function(a) {
                        return a.node.visible
                    }).forEach(function(f) {
                        b = c[f.node.level];
                        e = {
                            style: {}
                        };
                        f.node.isLeaf || (e.enabled = !1);
                        b && b.dataLabels && (e = G(e, b.dataLabels), a._hasPointLabels = !0);
                        f.shapeArgs && (e.style.width = f.shapeArgs.width, f.dataLabel && f.dataLabel.css({
                            width: f.shapeArgs.width + "px"
                        }));
                        f.dlOptions = G(e, f.options.dataLabels)
                    });
                    J.prototype.drawDataLabels.call(this)
                },
                alignDataLabel: function(a, c, e) {
                    var f = e.style;
                    !t(f.textOverflow) && c.text && c.getBBox().width > c.text.textWidth && c.css({
                        textOverflow: "ellipsis",
                        width: f.width += "px"
                    });
                    K.column.prototype.alignDataLabel.apply(this, arguments);
                    a.dataLabel && a.dataLabel.attr({
                        zIndex: (a.node.zIndex || 0) + 1
                    })
                },
                pointAttribs: function(a, c) {
                    var e = Q(this.mapOptionsToLevel) ? this.mapOptionsToLevel : {},
                        f = a && e[a.node.level] || {};
                    e = this.options;
                    var b = c && e.states[c] || {},
                        d = a && a.getClassName() || "";
                    a = {
                        stroke: a && a.borderColor || f.borderColor || b.borderColor ||
                            e.borderColor,
                        "stroke-width": D(a && a.borderWidth, f.borderWidth, b.borderWidth, e.borderWidth),
                        dashstyle: a && a.borderDashStyle || f.borderDashStyle || b.borderDashStyle || e.borderDashStyle,
                        fill: a && a.color || this.color
                    }; - 1 !== d.indexOf("highcharts-above-level") ? (a.fill = "none", a["stroke-width"] = 0) : -1 !== d.indexOf("highcharts-internal-node-interactive") ? (c = D(b.opacity, e.opacity), a.fill = q(a.fill).setOpacity(c).get(), a.cursor = "pointer") : -1 !== d.indexOf("highcharts-internal-node") ? a.fill = "none" : c && (a.fill = q(a.fill).brighten(b.brightness).get());
                    return a
                },
                drawPoints: function() {
                    var a = this,
                        c = a.chart,
                        e = c.renderer,
                        f = c.styledMode,
                        b = a.options,
                        d = f ? {} : b.shadow,
                        k = b.borderRadius,
                        z = c.pointCount < b.animationLimit,
                        n = b.allowTraversingTree;
                    a.points.forEach(function(c) {
                        var h = c.node.levelDynamic,
                            p = {},
                            g = {},
                            l = {},
                            m = "level-group-" + h,
                            S = !!c.graphic,
                            x = z && S,
                            T = c.shapeArgs;
                        c.shouldDraw() && (k && (g.r = k), G(!0, x ? p : g, S ? T : {}, f ? {} : a.pointAttribs(c, c.selected && "select")), a.colorAttribs && f && C(l, a.colorAttribs(c)), a[m] || (a[m] = e.g(m).attr({
                            zIndex: 1E3 - h
                        }).add(a.group), a[m].survive = !0));
                        c.draw({
                            animatableAttribs: p,
                            attribs: g,
                            css: l,
                            group: a[m],
                            renderer: e,
                            shadow: d,
                            shapeArgs: T,
                            shapeType: "rect"
                        });
                        n && c.graphic && (c.drillId = b.interactByLeaf ? a.drillToByLeaf(c) : a.drillToByGroup(c))
                    })
                },
                onClickDrillToNode: function(a) {
                    var c = (a = a.point) && a.drillId;
                    v(c) && (a.setState(""), this.setRootNode(c, !0, {
                        trigger: "click"
                    }))
                },
                drillToByGroup: function(a) {
                    var c = !1;
                    1 !== a.node.level - this.nodeMap[this.rootNode].level || a.node.isLeaf || (c = a.id);
                    return c
                },
                drillToByLeaf: function(a) {
                    var c = !1;
                    if (a.node.parent !== this.rootNode &&
                        a.node.isLeaf)
                        for (a = a.node; !c;) a = this.nodeMap[a.parent], a.parent === this.rootNode && (c = a.id);
                    return c
                },
                drillUp: function() {
                    var a = this.nodeMap[this.rootNode];
                    a && v(a.parent) && this.setRootNode(a.parent, !0, {
                        trigger: "traverseUpButton"
                    })
                },
                drillToNode: function(a, c) {
                    I("WARNING: treemap.drillToNode has been renamed to treemap.setRootNode, and will be removed in the next major version.");
                    this.setRootNode(a, c)
                },
                setRootNode: function(a, c, e) {
                    a = C({
                            newRootId: a,
                            previousRootId: this.rootNode,
                            redraw: D(c, !0),
                            series: this
                        },
                        e);
                    L(this, "setRootNode", a, function(a) {
                        var c = a.series;
                        c.idPreviousRoot = a.previousRootId;
                        c.rootNode = a.newRootId;
                        c.isDirty = !0;
                        a.redraw && c.chart.redraw()
                    })
                },
                renderTraverseUpButton: function(a) {
                    var c = this,
                        e = c.options.traverseUpButton,
                        f = D(e.text, c.nodeMap[a].name, "< Back");
                    if ("" === a) c.drillUpButton && (c.drillUpButton = c.drillUpButton.destroy());
                    else if (this.drillUpButton) this.drillUpButton.placed = !1, this.drillUpButton.attr({
                        text: f
                    }).align();
                    else {
                        var b = (a = e.theme) && a.states;
                        this.drillUpButton = this.chart.renderer.button(f,
                            null, null,
                            function() {
                                c.drillUp()
                            }, a, b && b.hover, b && b.select).addClass("highcharts-drillup-button").attr({
                            align: e.position.align,
                            zIndex: 7
                        }).add().align(e.position, !1, e.relativeTo || "plotBox")
                    }
                },
                buildKDTree: l,
                drawLegendSymbol: u.drawRectangle,
                getExtremes: function() {
                    var a = J.prototype.getExtremes.call(this, this.colorValueData),
                        c = a.dataMax;
                    this.valueMin = a.dataMin;
                    this.valueMax = c;
                    return J.prototype.getExtremes.call(this)
                },
                getExtremesFromAll: !0,
                setState: function(a) {
                    this.options.inactiveOtherPoints = !0;
                    J.prototype.setState.call(this,
                        a, !1);
                    this.options.inactiveOtherPoints = !1
                },
                utils: {
                    recursive: k
                }
            }, {
                draw: y,
                setVisible: K.pie.prototype.pointClass.prototype.setVisible,
                getClassName: function() {
                    var a = m.prototype.getClassName.call(this),
                        c = this.series,
                        b = c.options;
                    this.node.level <= c.nodeMap[c.rootNode].level ? a += " highcharts-above-level" : this.node.isLeaf || D(b.interactByLeaf, !b.allowTraversingTree) ? this.node.isLeaf || (a += " highcharts-internal-node") : a += " highcharts-internal-node-interactive";
                    return a
                },
                isValid: function() {
                    return this.id || F(this.value)
                },
                setState: function(a) {
                    m.prototype.setState.call(this, a);
                    this.graphic && this.graphic.attr({
                        zIndex: "hover" === a ? 1 : 0
                    })
                },
                shouldDraw: function() {
                    return F(this.plotY) && null !== this.y
                }
            });
            B(d.Series, "afterBindAxes", function() {
                var a = this.xAxis,
                    c = this.yAxis;
                if (a && c)
                    if (this.is("treemap")) {
                        var b = {
                            endOnTick: !1,
                            gridLineWidth: 0,
                            lineWidth: 0,
                            min: 0,
                            dataMin: 0,
                            minPadding: 0,
                            max: 100,
                            dataMax: 100,
                            maxPadding: 0,
                            startOnTick: !1,
                            title: null,
                            tickPositions: []
                        };
                        C(c.options, b);
                        C(a.options, b);
                        n = !0
                    } else n && (c.setOptions(c.userOptions), a.setOptions(a.userOptions),
                        n = !1)
            });
            ""
        });
    C(d, "modules/sunburst.src.js", [d["parts/Globals.js"], d["parts/Utilities.js"], d["mixins/draw-point.js"], d["mixins/tree-series.js"]], function(d, b, C, w) {
        var u = b.correctFloat,
            m = b.error,
            l = b.extend,
            q = b.isNumber,
            B = b.isObject,
            g = b.isString,
            t = b.merge,
            y = b.seriesType,
            I = b.splat;
        b = d.CenteredSeriesMixin;
        var L = d.Series,
            M = b.getCenter,
            F = w.getColor,
            Q = w.getLevelOptions,
            v = b.getStartAndEndRadians,
            G = 180 / Math.PI,
            E = d.seriesTypes,
            D = w.setTreeValues,
            R = w.updateRootId,
            K = function(b, d) {
                var f = [];
                if (q(b) && q(d) && b <= d)
                    for (; b <=
                        d; b++) f.push(b);
                return f
            },
            N = function(b, d) {
                d = B(d) ? d : {};
                var f = 0,
                    k;
                if (B(b)) {
                    var a = t({}, b);
                    b = q(d.from) ? d.from : 0;
                    var c = q(d.to) ? d.to : 0;
                    var e = K(b, c);
                    b = Object.keys(a).filter(function(a) {
                        return -1 === e.indexOf(+a)
                    });
                    var g = k = q(d.diffRadius) ? d.diffRadius : 0;
                    e.forEach(function(c) {
                        c = a[c];
                        var b = c.levelSize.unit,
                            e = c.levelSize.value;
                        "weight" === b ? f += e : "percentage" === b ? (c.levelSize = {
                            unit: "pixels",
                            value: e / 100 * g
                        }, k -= c.levelSize.value) : "pixels" === b && (k -= e)
                    });
                    e.forEach(function(c) {
                        var b = a[c];
                        "weight" === b.levelSize.unit &&
                            (b = b.levelSize.value, a[c].levelSize = {
                                unit: "pixels",
                                value: b / f * k
                            })
                    });
                    b.forEach(function(c) {
                        a[c].levelSize = {
                            value: 0,
                            unit: "pixels"
                        }
                    })
                }
                return a
            },
            O = function(b) {
                var f = b.level;
                return {
                    from: 0 < f ? f : 1,
                    to: f + b.height
                }
            },
            J = function(b, d) {
                var f = d.mapIdToNode[b.parent],
                    k = d.series,
                    a = k.chart,
                    c = k.points[b.i];
                f = F(b, {
                    colors: k.options.colors || a && a.options.colors,
                    colorIndex: k.colorIndex,
                    index: d.index,
                    mapOptionsToLevel: d.mapOptionsToLevel,
                    parentColor: f && f.color,
                    parentColorIndex: f && f.colorIndex,
                    series: d.series,
                    siblings: d.siblings
                });
                b.color = f.color;
                b.colorIndex = f.colorIndex;
                c && (c.color = b.color, c.colorIndex = b.colorIndex, b.sliced = b.id !== d.idRoot ? c.sliced : !1);
                return b
            };
        y("sunburst", "treemap", {
            center: ["50%", "50%"],
            colorByPoint: !1,
            opacity: 1,
            dataLabels: {
                allowOverlap: !0,
                defer: !0,
                rotationMode: "auto",
                style: {
                    textOverflow: "ellipsis"
                }
            },
            rootId: void 0,
            levelIsConstant: !0,
            levelSize: {
                value: 1,
                unit: "weight"
            },
            slicedOffset: 10
        }, {
            drawDataLabels: d.noop,
            drawPoints: function() {
                var b = this,
                    d = b.mapOptionsToLevel,
                    g = b.shapeRoot,
                    m = b.group,
                    a = b.hasRendered,
                    c =
                    b.rootNode,
                    e = b.idPreviousRoot,
                    p = b.nodeMap,
                    h = p[e],
                    w = h && h.shapeArgs;
                h = b.points;
                var x = b.startAndEndRadians,
                    u = b.chart,
                    v = u && u.options && u.options.chart || {},
                    C = "boolean" === typeof v.animation ? v.animation : !0,
                    r = b.center[3] / 2,
                    D = b.chart.renderer,
                    y = !1,
                    E = !1;
                if (v = !!(C && a && c !== e && b.dataLabelsGroup)) {
                    b.dataLabelsGroup.attr({
                        opacity: 0
                    });
                    var F = function() {
                        y = !0;
                        b.dataLabelsGroup && b.dataLabelsGroup.animate({
                            opacity: 1,
                            visibility: "visible"
                        })
                    }
                }
                h.forEach(function(f) {
                    var h = f.node,
                        k = d[h.level];
                    var z = f.shapeExisting || {};
                    var n =
                        h.shapeArgs || {},
                        v = !(!h.visible || !h.shapeArgs);
                    if (a && C) {
                        var y = {};
                        var P = {
                            end: n.end,
                            start: n.start,
                            innerR: n.innerR,
                            r: n.r,
                            x: n.x,
                            y: n.y
                        };
                        v ? !f.graphic && w && (y = c === f.id ? {
                            start: x.start,
                            end: x.end
                        } : w.end <= n.start ? {
                            start: x.end,
                            end: x.end
                        } : {
                            start: x.start,
                            end: x.start
                        }, y.innerR = y.r = r) : f.graphic && (e === f.id ? P = {
                            innerR: r,
                            r: r
                        } : g && (P = g.end <= z.start ? {
                            innerR: r,
                            r: r,
                            start: x.end,
                            end: x.end
                        } : {
                            innerR: r,
                            r: r,
                            start: x.start,
                            end: x.start
                        }));
                        z = y
                    } else P = n, z = {};
                    y = [n.plotX, n.plotY];
                    if (!f.node.isLeaf)
                        if (c === f.id) {
                            var A = p[c];
                            A = A.parent
                        } else A =
                            f.id;
                    l(f, {
                        shapeExisting: n,
                        tooltipPos: y,
                        drillId: A,
                        name: "" + (f.name || f.id || f.index),
                        plotX: n.plotX,
                        plotY: n.plotY,
                        value: h.val,
                        isNull: !v
                    });
                    A = f.options;
                    h = B(n) ? n : {};
                    A = B(A) ? A.dataLabels : {};
                    k = I(B(k) ? k.dataLabels : {})[0];
                    k = t({
                        style: {}
                    }, k, A);
                    A = k.rotationMode;
                    if (!q(k.rotation)) {
                        if ("auto" === A || "circular" === A)
                            if (1 > f.innerArcLength && f.outerArcLength > h.radius) {
                                var H = 0;
                                f.dataLabelPath && "circular" === A && (k.textPath = {
                                    enabled: !0
                                })
                            } else 1 < f.innerArcLength && f.outerArcLength > 1.5 * h.radius ? "circular" === A ? k.textPath = {
                                enabled: !0,
                                attributes: {
                                    dy: 5
                                }
                            } : A = "parallel" : (f.dataLabel && f.dataLabel.textPathWrapper && "circular" === A && (k.textPath = {
                                enabled: !1
                            }), A = "perpendicular");
                        "auto" !== A && "circular" !== A && (H = h.end - (h.end - h.start) / 2);
                        k.style.width = "parallel" === A ? Math.min(2.5 * h.radius, (f.outerArcLength + f.innerArcLength) / 2) : h.radius;
                        "perpendicular" === A && f.series.chart.renderer.fontMetrics(k.style.fontSize).h > f.outerArcLength && (k.style.width = 1);
                        k.style.width = Math.max(k.style.width - 2 * (k.padding || 0), 1);
                        H = H * G % 180;
                        "parallel" === A && (H -= 90);
                        90 < H ? H -=
                            180 : -90 > H && (H += 180);
                        k.rotation = H
                    }
                    k.textPath && (0 === f.shapeExisting.innerR && k.textPath.enabled ? (k.rotation = 0, k.textPath.enabled = !1, k.style.width = Math.max(2 * f.shapeExisting.r - 2 * (k.padding || 0), 1)) : f.dlOptions && f.dlOptions.textPath && !f.dlOptions.textPath.enabled && "circular" === A && (k.textPath.enabled = !0), k.textPath.enabled && (k.rotation = 0, k.style.width = Math.max((f.outerArcLength + f.innerArcLength) / 2 - 2 * (k.padding || 0), 1)));
                    0 === k.rotation && (k.rotation = .001);
                    f.dlOptions = k;
                    if (!E && v) {
                        E = !0;
                        var V = F
                    }
                    f.draw({
                        animatableAttribs: P,
                        attribs: l(z, !u.styledMode && b.pointAttribs(f, f.selected && "select")),
                        onComplete: V,
                        group: m,
                        renderer: D,
                        shapeType: "arc",
                        shapeArgs: n
                    })
                });
                v && E ? (b.hasRendered = !1, b.options.dataLabels.defer = !0, L.prototype.drawDataLabels.call(b), b.hasRendered = !0, y && F()) : L.prototype.drawDataLabels.call(b)
            },
            pointAttribs: E.column.prototype.pointAttribs,
            layoutAlgorithm: function(b, d, g) {
                var f = b.start,
                    a = b.end - f,
                    c = b.val,
                    e = b.x,
                    k = b.y,
                    h = g && B(g.levelSize) && q(g.levelSize.value) ? g.levelSize.value : 0,
                    m = b.r,
                    l = m + h,
                    z = g && q(g.slicedOffset) ? g.slicedOffset :
                    0;
                return (d || []).reduce(function(b, d) {
                    var g = 1 / c * d.val * a,
                        n = f + g / 2,
                        p = e + Math.cos(n) * z;
                    n = k + Math.sin(n) * z;
                    d = {
                        x: d.sliced ? p : e,
                        y: d.sliced ? n : k,
                        innerR: m,
                        r: l,
                        radius: h,
                        start: f,
                        end: f + g
                    };
                    b.push(d);
                    f = d.end;
                    return b
                }, [])
            },
            setShapeArgs: function(b, d, g) {
                var f = [],
                    a = g[b.level + 1];
                b = b.children.filter(function(a) {
                    return a.visible
                });
                f = this.layoutAlgorithm(d, b, a);
                b.forEach(function(a, b) {
                    b = f[b];
                    var c = b.start + (b.end - b.start) / 2,
                        d = b.innerR + (b.r - b.innerR) / 2,
                        e = b.end - b.start;
                    d = 0 === b.innerR && 6.28 < e ? {
                        x: b.x,
                        y: b.y
                    } : {
                        x: b.x + Math.cos(c) *
                            d,
                        y: b.y + Math.sin(c) * d
                    };
                    var k = a.val ? a.childrenTotal > a.val ? a.childrenTotal : a.val : a.childrenTotal;
                    this.points[a.i] && (this.points[a.i].innerArcLength = e * b.innerR, this.points[a.i].outerArcLength = e * b.r);
                    a.shapeArgs = t(b, {
                        plotX: d.x,
                        plotY: d.y + 4 * Math.abs(Math.cos(c))
                    });
                    a.values = t(b, {
                        val: k
                    });
                    a.children.length && this.setShapeArgs(a, a.values, g)
                }, this)
            },
            translate: function() {
                var b = this,
                    d = b.options,
                    l = b.center = M.call(b),
                    n = b.startAndEndRadians = v(d.startAngle, d.endAngle),
                    a = l[3] / 2,
                    c = l[2] / 2 - a,
                    e = R(b),
                    p = b.nodeMap,
                    h = p && p[e],
                    t = {};
                b.shapeRoot = h && h.shapeArgs;
                L.prototype.translate.call(b);
                var x = b.tree = b.getTree();
                b.renderTraverseUpButton(e);
                p = b.nodeMap;
                h = p[e];
                var u = g(h.parent) ? h.parent : "";
                u = p[u];
                var q = O(h);
                var w = q.from,
                    r = q.to;
                q = Q({
                    from: w,
                    levels: b.options.levels,
                    to: r,
                    defaults: {
                        colorByPoint: d.colorByPoint,
                        dataLabels: d.dataLabels,
                        levelIsConstant: d.levelIsConstant,
                        levelSize: d.levelSize,
                        slicedOffset: d.slicedOffset
                    }
                });
                q = N(q, {
                    diffRadius: c,
                    from: w,
                    to: r
                });
                D(x, {
                    before: J,
                    idRoot: e,
                    levelIsConstant: d.levelIsConstant,
                    mapOptionsToLevel: q,
                    mapIdToNode: p,
                    points: b.points,
                    series: b
                });
                d = p[""].shapeArgs = {
                    end: n.end,
                    r: a,
                    start: n.start,
                    val: h.val,
                    x: l[0],
                    y: l[1]
                };
                this.setShapeArgs(u, d, q);
                b.mapOptionsToLevel = q;
                b.data.forEach(function(a) {
                    t[a.id] && m(31, !1, b.chart);
                    t[a.id] = !0
                });
                t = {}
            },
            alignDataLabel: function(b, d, g) {
                if (!g.textPath || !g.textPath.enabled) return E.treemap.prototype.alignDataLabel.apply(this, arguments)
            },
            animate: function(b) {
                var d = this.chart,
                    f = [d.plotWidth / 2, d.plotHeight / 2],
                    g = d.plotLeft,
                    a = d.plotTop;
                d = this.group;
                b ? (b = {
                    translateX: f[0] + g,
                    translateY: f[1] +
                        a,
                    scaleX: .001,
                    scaleY: .001,
                    rotation: 10,
                    opacity: .01
                }, d.attr(b)) : (b = {
                    translateX: g,
                    translateY: a,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0,
                    opacity: 1
                }, d.animate(b, this.options.animation))
            },
            utils: {
                calculateLevelSizes: N,
                getLevelFromAndTo: O,
                range: K
            }
        }, {
            draw: C,
            shouldDraw: function() {
                return !this.isNull
            },
            isValid: function() {
                return !0
            },
            getDataLabelPath: function(b) {
                var d = this.series.chart.renderer,
                    f = this.shapeExisting,
                    g = f.start,
                    a = f.end,
                    c = g + (a - g) / 2;
                c = 0 > c && c > -Math.PI || c > Math.PI;
                var e = f.r + (b.options.distance || 0);
                g === -Math.PI / 2 && u(a) ===
                    u(1.5 * Math.PI) && (g = -Math.PI + Math.PI / 360, a = -Math.PI / 360, c = !0);
                if (a - g > Math.PI) {
                    c = !1;
                    var l = !0
                }
                this.dataLabelPath && (this.dataLabelPath = this.dataLabelPath.destroy());
                this.dataLabelPath = d.arc({
                    open: !0,
                    longArc: l ? 1 : 0
                }).add(b);
                this.dataLabelPath.attr({
                    start: c ? g : a,
                    end: c ? a : g,
                    clockwise: +c,
                    x: f.x,
                    y: f.y,
                    r: (e + f.innerR) / 2
                });
                return this.dataLabelPath
            }
        })
    });
    C(d, "masters/modules/sunburst.src.js", [], function() {})
});
//# sourceMappingURL=sunburst.js.map