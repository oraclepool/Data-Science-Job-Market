/**
 * gridstack.js 0.2.6
 * http://troolee.github.io/gridstack.js/
 * (c) 2014-2016 Pavel Reznikov
 * gridstack.js may be freely distributed under the MIT license.
 * @preserve
 */
! function(a) {
    if ("function" == typeof define && define.amd) define(["jquery", "lodash", "jquery-ui/data", "jquery-ui/disable-selection", "jquery-ui/focusable", "jquery-ui/form", "jquery-ui/ie", "jquery-ui/keycode", "jquery-ui/labels", "jquery-ui/jquery-1-7", "jquery-ui/plugin", "jquery-ui/safe-active-element", "jquery-ui/safe-blur", "jquery-ui/scroll-parent", "jquery-ui/tabbable", "jquery-ui/unique-id", "jquery-ui/version", "jquery-ui/widget", "jquery-ui/widgets/mouse", "jquery-ui/widgets/draggable", "jquery-ui/widgets/droppable", "jquery-ui/widgets/resizable"], a);
    else if ("undefined" != typeof exports) {
        try {
            jQuery = require("jquery")
        } catch (b) {}
        try {
            _ = require("lodash")
        } catch (b) {}
        a(jQuery, _)
    } else a(jQuery, _)
}(function(a, b) {
    var c = window,
        d = function(a, b, c) {
            var d = function() {
                return console.warn("gridstack.js: Function `" + b + "` is deprecated as of v0.2.5 and has been replaced with `" + c + "`. It will be **completely** removed in v1.0."), a.apply(this, arguments)
            };
            return d.prototype = a.prototype, d
        },
        e = function(a, b) {
            console.warn("gridstack.js: Option `" + a + "` is deprecated as of v0.2.5 and has been replaced with `" + b + "`. It will be **completely** removed in v1.0.")
        },
        f = {
            isIntercepted: function(a, b) {
                return !(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y)
            },
            sort: function(a, c, d) {
                return d = d || b.chain(a).map(function(a) {
                    return a.x + a.width
                }).max().value(), c = c != -1 ? 1 : -1, b.sortBy(a, function(a) {
                    return c * (a.x + a.y * d)
                })
            },
            createStylesheet: function(a) {
                var b = document.createElement("style");
                return b.setAttribute("type", "text/css"), b.setAttribute("data-gs-style-id", a), b.styleSheet ? b.styleSheet.cssText = "" : b.appendChild(document.createTextNode("")), document.getElementsByTagName("head")[0].appendChild(b), b.sheet
            },
            removeStylesheet: function(b) {
                a("STYLE[data-gs-style-id=" + b + "]").remove()
            },
            insertCSSRule: function(a, b, c, d) {
                "function" == typeof a.insertRule ? a.insertRule(b + "{" + c + "}", d) : "function" == typeof a.addRule && a.addRule(b, c, d)
            },
            toBool: function(a) {
                return "boolean" == typeof a ? a : "string" == typeof a ? (a = a.toLowerCase(), !("" === a || "no" == a || "false" == a || "0" == a)) : Boolean(a)
            },
            _collisionNodeCheck: function(a) {
                return a != this.node && f.isIntercepted(a, this.nn)
            },
            _didCollide: function(a) {
                return f.isIntercepted({
                    x: this.n.x,
                    y: this.newY,
                    width: this.n.width,
                    height: this.n.height
                }, a)
            },
            _isAddNodeIntercepted: function(a) {
                return f.isIntercepted({
                    x: this.x,
                    y: this.y,
                    width: this.node.width,
                    height: this.node.height
                }, a)
            },
            parseHeight: function(a) {
                var c = a,
                    d = "px";
                if (c && b.isString(c)) {
                    var e = c.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw)?$/);
                    if (!e) throw new Error("Invalid height");
                    d = e[2] || "px", c = parseFloat(e[1])
                }
                return {
                    height: c,
                    unit: d
                }
            }
        };
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    f.is_intercepted = d(f.isIntercepted, "is_intercepted", "isIntercepted"), f.create_stylesheet = d(f.createStylesheet, "create_stylesheet", "createStylesheet"), f.remove_stylesheet = d(f.removeStylesheet, "remove_stylesheet", "removeStylesheet"), f.insert_css_rule = d(f.insertCSSRule, "insert_css_rule", "insertCSSRule");
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    var g = 0,
        h = function(a, b, c, d, e) {
            this.width = a, this["float"] = c || !1, this.height = d || 0, this.nodes = e || [], this.onchange = b || function() {}, this._updateCounter = 0, this._float = this["float"], this._addedNodes = [], this._removedNodes = []
        };
    h.prototype.batchUpdate = function() {
            this._updateCounter = 1, this["float"] = !0
        }, h.prototype.commit = function() {
            0 !== this._updateCounter && (this._updateCounter = 0, this["float"] = this._float, this._packNodes(), this._notify())
        },
        // For Meteor support: https://github.com/troolee/gridstack.js/pull/272
        h.prototype.getNodeDataByDOMEl = function(a) {
            return b.find(this.nodes, function(b) {
                return a.get(0) === b.el.get(0)
            })
        }, h.prototype._fixCollisions = function(a) {
            this._sortNodes(-1);
            var c = a,
                d = Boolean(b.find(this.nodes, function(a) {
                    return a.locked
                }));
            for (this["float"] || d || (c = {
                    x: 0,
                    y: a.y,
                    width: this.width,
                    height: a.height
                });;) {
                var e = b.find(this.nodes, b.bind(f._collisionNodeCheck, {
                    node: a,
                    nn: c
                }));
                if ("undefined" == typeof e) return;
                this.moveNode(e, e.x, a.y + a.height, e.width, e.height, !0)
            }
        }, h.prototype.isAreaEmpty = function(a, c, d, e) {
            var g = {
                    x: a || 0,
                    y: c || 0,
                    width: d || 1,
                    height: e || 1
                },
                h = b.find(this.nodes, b.bind(function(a) {
                    return f.isIntercepted(a, g)
                }, this));
            return null === h || "undefined" == typeof h
        }, h.prototype._sortNodes = function(a) {
            this.nodes = f.sort(this.nodes, a, this.width)
        }, h.prototype._packNodes = function() {
            this._sortNodes(), this["float"] ? b.each(this.nodes, b.bind(function(a, c) {
                if (!a._updating && "undefined" != typeof a._origY && a.y != a._origY)
                    for (var d = a.y; d >= a._origY;) {
                        var e = b.chain(this.nodes).find(b.bind(f._didCollide, {
                            n: a,
                            newY: d
                        })).value();
                        e || (a._dirty = !0, a.y = d), --d
                    }
            }, this)) : b.each(this.nodes, b.bind(function(a, c) {
                if (!a.locked)
                    for (; a.y > 0;) {
                        var d = a.y - 1,
                            e = 0 === c;
                        if (c > 0) {
                            var g = b.chain(this.nodes).take(c).find(b.bind(f._didCollide, {
                                n: a,
                                newY: d
                            })).value();
                            e = "undefined" == typeof g
                        }
                        if (!e) break;
                        a._dirty = a.y != d, a.y = d
                    }
            }, this))
        }, h.prototype._prepareNode = function(a, c) {
            return a = b.defaults(a || {}, {
                width: 1,
                height: 1,
                x: 0,
                y: 0
            }), a.x = parseInt("" + a.x), a.y = parseInt("" + a.y), a.width = parseInt("" + a.width), a.height = parseInt("" + a.height), a.autoPosition = a.autoPosition || !1, a.noResize = a.noResize || !1, a.noMove = a.noMove || !1, a.width > this.width ? a.width = this.width : a.width < 1 && (a.width = 1), a.height < 1 && (a.height = 1), a.x < 0 && (a.x = 0), a.x + a.width > this.width && (c ? a.width = this.width - a.x : a.x = this.width - a.width), a.y < 0 && (a.y = 0), a
        }, h.prototype._notify = function() {
            var a = Array.prototype.slice.call(arguments, 0);
            if (a[0] = "undefined" == typeof a[0] ? [] : [a[0]], a[1] = "undefined" == typeof a[1] || a[1], !this._updateCounter) {
                var b = a[0].concat(this.getDirtyNodes());
                this.onchange(b, a[1])
            }
        }, h.prototype.cleanNodes = function() {
            this._updateCounter || b.each(this.nodes, function(a) {
                a._dirty = !1
            })
        }, h.prototype.getDirtyNodes = function() {
            return b.filter(this.nodes, function(a) {
                return a._dirty
            })
        }, h.prototype.addNode = function(a, c) {
            if (a = this._prepareNode(a), "undefined" != typeof a.maxWidth && (a.width = Math.min(a.width, a.maxWidth)), "undefined" != typeof a.maxHeight && (a.height = Math.min(a.height, a.maxHeight)), "undefined" != typeof a.minWidth && (a.width = Math.max(a.width, a.minWidth)), "undefined" != typeof a.minHeight && (a.height = Math.max(a.height, a.minHeight)), a._id = ++g, a._dirty = !0, a.autoPosition) {
                this._sortNodes();
                for (var d = 0;; ++d) {
                    var e = d % this.width,
                        h = Math.floor(d / this.width);
                    if (!(e + a.width > this.width || b.find(this.nodes, b.bind(f._isAddNodeIntercepted, {
                            x: e,
                            y: h,
                            node: a
                        })))) {
                        a.x = e, a.y = h;
                        break
                    }
                }
            }
            return this.nodes.push(a), "undefined" != typeof c && c && this._addedNodes.push(b.clone(a)), this._fixCollisions(a), this._packNodes(), this._notify(), a
        }, h.prototype.removeNode = function(a, c) {
            c = "undefined" == typeof c || c, this._removedNodes.push(b.clone(a)), a._id = null, this.nodes = b.without(this.nodes, a), this._packNodes(), this._notify(a, c)
        }, h.prototype.canMoveNode = function(c, d, e, f, g) {
            var i = Boolean(b.find(this.nodes, function(a) {
                return a.locked
            }));
            if (!this.height && !i) return !0;
            var j, k = new h(this.width, null, this["float"], 0, b.map(this.nodes, function(b) {
                return b == c ? j = a.extend({}, b) : a.extend({}, b)
            }));
            if ("undefined" == typeof j) return !0;
            k.moveNode(j, d, e, f, g);
            var l = !0;
            return i && (l &= !Boolean(b.find(k.nodes, function(a) {
                return a != j && Boolean(a.locked) && Boolean(a._dirty)
            }))), this.height && (l &= k.getGridHeight() <= this.height), l
        }, h.prototype.canBePlacedWithRespectToHeight = function(c) {
            if (!this.height) return !0;
            var d = new h(this.width, null, this["float"], 0, b.map(this.nodes, function(b) {
                return a.extend({}, b)
            }));
            return d.addNode(c), d.getGridHeight() <= this.height
        }, h.prototype.moveNode = function(a, b, c, d, e, f) {
            if ("number" != typeof b && (b = a.x), "number" != typeof c && (c = a.y), "number" != typeof d && (d = a.width), "number" != typeof e && (e = a.height), "undefined" != typeof a.maxWidth && (d = Math.min(d, a.maxWidth)), "undefined" != typeof a.maxHeight && (e = Math.min(e, a.maxHeight)), "undefined" != typeof a.minWidth && (d = Math.max(d, a.minWidth)), "undefined" != typeof a.minHeight && (e = Math.max(e, a.minHeight)), a.x == b && a.y == c && a.width == d && a.height == e) return a;
            var g = a.width != d;
            return a._dirty = !0, a.x = b, a.y = c, a.width = d, a.height = e, a = this._prepareNode(a, g), this._fixCollisions(a), f || (this._packNodes(), this._notify()), a
        }, h.prototype.getGridHeight = function() {
            return b.reduce(this.nodes, function(a, b) {
                return Math.max(a, b.y + b.height)
            }, 0)
        }, h.prototype.beginUpdate = function(a) {
            b.each(this.nodes, function(a) {
                a._origY = a.y
            }), a._updating = !0
        }, h.prototype.endUpdate = function() {
            b.each(this.nodes, function(a) {
                a._origY = a.y
            });
            var a = b.find(this.nodes, function(a) {
                return a._updating
            });
            a && (a._updating = !1)
        };
    var i = function(c, d) {
        var f, g, i = this;
        d = d || {}, this.container = a(c),
            // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
            "undefined" != typeof d.handle_class && (d.handleClass = d.handle_class, e("handle_class", "handleClass")), "undefined" != typeof d.item_class && (d.itemClass = d.item_class, e("item_class", "itemClass")), "undefined" != typeof d.placeholder_class && (d.placeholderClass = d.placeholder_class, e("placeholder_class", "placeholderClass")), "undefined" != typeof d.placeholder_text && (d.placeholderText = d.placeholder_text, e("placeholder_text", "placeholderText")), "undefined" != typeof d.cell_height && (d.cellHeight = d.cell_height, e("cell_height", "cellHeight")), "undefined" != typeof d.vertical_margin && (d.verticalMargin = d.vertical_margin, e("vertical_margin", "verticalMargin")), "undefined" != typeof d.min_width && (d.minWidth = d.min_width, e("min_width", "minWidth")), "undefined" != typeof d.static_grid && (d.staticGrid = d.static_grid, e("static_grid", "staticGrid")), "undefined" != typeof d.is_nested && (d.isNested = d.is_nested, e("is_nested", "isNested")), "undefined" != typeof d.always_show_resize_handle && (d.alwaysShowResizeHandle = d.always_show_resize_handle, e("always_show_resize_handle", "alwaysShowResizeHandle")),
            // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
            d.itemClass = d.itemClass || "grid-stack-item";
        var j = this.container.closest("." + d.itemClass).length > 0;
        if (this.opts = b.defaults(d || {}, {
                width: parseInt(this.container.attr("data-gs-width")) || 12,
                height: parseInt(this.container.attr("data-gs-height")) || 0,
                itemClass: "grid-stack-item",
                placeholderClass: "grid-stack-placeholder",
                placeholderText: "",
                handle: ".grid-stack-item-content",
                handleClass: null,
                cellHeight: 60,
                verticalMargin: 20,
                auto: !0,
                minWidth: 768,
                "float": !1,
                staticGrid: !1,
                _class: "grid-stack-instance-" + (1e4 * Math.random()).toFixed(0),
                animate: Boolean(this.container.attr("data-gs-animate")) || !1,
                alwaysShowResizeHandle: d.alwaysShowResizeHandle || !1,
                resizable: b.defaults(d.resizable || {}, {
                    autoHide: !d.alwaysShowResizeHandle,
                    handles: "se"
                }),
                draggable: b.defaults(d.draggable || {}, {
                    handle: (d.handleClass ? "." + d.handleClass : d.handle ? d.handle : "") || ".grid-stack-item-content",
                    scroll: !1,
                    appendTo: "body"
                }),
                disableDrag: d.disableDrag || !1,
                disableResize: d.disableResize || !1,
                rtl: "auto",
                removable: !1,
                removeTimeout: 2e3,
                verticalMarginUnit: "px",
                cellHeightUnit: "px"
            }), "auto" === this.opts.rtl && (this.opts.rtl = "rtl" === this.container.css("direction")), this.opts.rtl && this.container.addClass("grid-stack-rtl"), this.opts.isNested = j, g = "auto" === this.opts.cellHeight, g ? i.cellHeight(i.cellWidth(), !0) : this.cellHeight(this.opts.cellHeight, !0), this.verticalMargin(this.opts.verticalMargin, !0), this.container.addClass(this.opts._class), this._setStaticClass(), j && this.container.addClass("grid-stack-nested"), this._initStyles(), this.grid = new h(this.opts.width, function(a, c) {
                c = "undefined" == typeof c || c;
                var d = 0;
                b.each(a, function(a) {
                    c && null === a._id ? a.el && a.el.remove() : (a.el.attr("data-gs-x", a.x).attr("data-gs-y", a.y).attr("data-gs-width", a.width).attr("data-gs-height", a.height), d = Math.max(d, a.y + a.height))
                }), i._updateStyles(d + 10)
            }, this.opts["float"], this.opts.height), this.opts.auto) {
            var k = [],
                l = this;
            this.container.children("." + this.opts.itemClass + ":not(." + this.opts.placeholderClass + ")").each(function(b, c) {
                c = a(c), k.push({
                    el: c,
                    i: parseInt(c.attr("data-gs-x")) + parseInt(c.attr("data-gs-y")) * l.opts.width
                })
            }), b.chain(k).sortBy(function(a) {
                return a.i
            }).each(function(a) {
                i._prepareElement(a.el)
            }).value()
        }
        if (this.setAnimation(this.opts.animate), this.placeholder = a('<div class="' + this.opts.placeholderClass + " " + this.opts.itemClass + '"><div class="placeholder-content">' + this.opts.placeholderText + "</div></div>").hide(), this._updateContainerHeight(), this._updateHeightsOnResize = b.throttle(function() {
                i.cellHeight(i.cellWidth(), !1)
            }, 100), this.onResizeHandler = function() {
                if (g && i._updateHeightsOnResize(), i._isOneColumnMode()) {
                    if (f) return;
                    f = !0, i.grid._sortNodes(), b.each(i.grid.nodes, function(a) {
                        i.container.append(a.el), i.opts.staticGrid || ((a.noMove || i.opts.disableDrag) && a.el.draggable("disable"), (a.noResize || i.opts.disableResize) && a.el.resizable("disable"), a.el.trigger("resize"))
                    })
                } else {
                    if (!f) return;
                    if (f = !1, i.opts.staticGrid) return;
                    b.each(i.grid.nodes, function(a) {
                        a.noMove || i.opts.disableDrag || a.el.draggable("enable"), a.noResize || i.opts.disableResize || a.el.resizable("enable"), a.el.trigger("resize")
                    })
                }
            }, a(window).resize(this.onResizeHandler), this.onResizeHandler(), !i.opts.staticGrid && "string" == typeof i.opts.removable) {
            var m = a(i.opts.removable);
            m.data("droppable") || m.droppable({
                accept: "." + i.opts.itemClass
            }), m.on("dropover", function(b, c) {
                var d = a(c.draggable),
                    e = d.data("_gridstack_node");
                e._grid === i && i._setupRemovingTimeout(d)
            }).on("dropout", function(b, c) {
                var d = a(c.draggable),
                    e = d.data("_gridstack_node");
                e._grid === i && i._clearRemovingTimeout(d)
            })
        }
        if (!i.opts.staticGrid && i.opts.acceptWidgets) {
            var n = null,
                o = function(a, b) {
                    var c = n,
                        d = c.data("_gridstack_node"),
                        e = i.getCellFromPixel(b.offset, !0),
                        f = Math.max(0, e.x),
                        g = Math.max(0, e.y);
                    if (d._added) {
                        if (!i.grid.canMoveNode(d, f, g)) return;
                        i.grid.moveNode(d, f, g), i._updateContainerHeight()
                    } else d._added = !0, d.el = c, d.x = f, d.y = g, i.grid.cleanNodes(), i.grid.beginUpdate(d), i.grid.addNode(d), i.container.append(i.placeholder), i.placeholder.attr("data-gs-x", d.x).attr("data-gs-y", d.y).attr("data-gs-width", d.width).attr("data-gs-height", d.height).show(), d.el = i.placeholder, d._beforeDragX = d.x, d._beforeDragY = d.y, i._updateContainerHeight()
                };
            a(i.container).droppable({
                accept: function(b) {
                    b = a(b);
                    var c = b.data("_gridstack_node");
                    return (!c || c._grid !== i) && b.is(i.opts.acceptWidgets === !0 ? ".grid-stack-item" : i.opts.acceptWidgets)
                },
                over: function(b, c) {
                    var d = (i.container.offset(), a(c.draggable)),
                        e = i.cellWidth(),
                        f = i.cellHeight(),
                        g = d.data("_gridstack_node"),
                        h = g ? g.width : Math.ceil(d.outerWidth() / e),
                        j = g ? g.height : Math.ceil(d.outerHeight() / f);
                    n = d;
                    var k = i.grid._prepareNode({
                        width: h,
                        height: j,
                        _added: !1,
                        _temporary: !0
                    });
                    d.data("_gridstack_node", k), d.data("_gridstack_node_orig", g), d.on("drag", o)
                },
                out: function(b, c) {
                    var d = a(c.draggable);
                    d.unbind("drag", o);
                    var e = d.data("_gridstack_node");
                    e.el = null, i.grid.removeNode(e), i.placeholder.detach(), i._updateContainerHeight(), d.data("_gridstack_node", d.data("_gridstack_node_orig"))
                },
                drop: function(b, c) {
                    i.placeholder.detach();
                    var d = a(c.draggable).data("_gridstack_node");
                    d._grid = i;
                    var e = a(c.draggable).clone(!1);
                    e.data("_gridstack_node", d), a(c.draggable).remove(), d.el = e, i.placeholder.hide(), e.attr("data-gs-x", d.x).attr("data-gs-y", d.y).attr("data-gs-width", d.width).attr("data-gs-height", d.height).addClass(i.opts.itemClass).removeAttr("style").enableSelection().removeData("draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled").unbind("drag", o), i.container.append(e), i._prepareElementsByNode(e, d), i._updateContainerHeight(), i._triggerChangeEvent(), i.grid.endUpdate()
                }
            })
        }
    };
    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
    // jscs:enable requireCamelCaseOrUpperCaseIdentifiers
    return i.prototype._triggerChangeEvent = function(a) {
        var b = this.grid.getDirtyNodes(),
            c = !1,
            d = [];
        b && b.length && (d.push(b), c = !0), (c || a === !0) && this.container.trigger("change", d)
    }, i.prototype._triggerAddEvent = function() {
        this.grid._addedNodes && this.grid._addedNodes.length > 0 && (this.container.trigger("added", [b.map(this.grid._addedNodes, b.clone)]), this.grid._addedNodes = [])
    }, i.prototype._triggerRemoveEvent = function() {
        this.grid._removedNodes && this.grid._removedNodes.length > 0 && (this.container.trigger("removed", [b.map(this.grid._removedNodes, b.clone)]), this.grid._removedNodes = [])
    }, i.prototype._initStyles = function() {
        this._stylesId && f.removeStylesheet(this._stylesId), this._stylesId = "gridstack-style-" + (1e5 * Math.random()).toFixed(), this._styles = f.createStylesheet(this._stylesId), null !== this._styles && (this._styles._max = 0)
    }, i.prototype._updateStyles = function(a) {
        if (null !== this._styles && "undefined" != typeof this._styles) {
            var b, c = "." + this.opts._class + " ." + this.opts.itemClass,
                d = this;
            if ("undefined" == typeof a && (a = this._styles._max, this._initStyles(), this._updateContainerHeight()), this.opts.cellHeight && !(0 !== this._styles._max && a <= this._styles._max) && (b = this.opts.verticalMargin && this.opts.cellHeightUnit !== this.opts.verticalMarginUnit ? function(a, b) {
                    return a && b ? "calc(" + (d.opts.cellHeight * a + d.opts.cellHeightUnit) + " + " + (d.opts.verticalMargin * b + d.opts.verticalMarginUnit) + ")" : d.opts.cellHeight * a + d.opts.verticalMargin * b + d.opts.cellHeightUnit
                } : function(a, b) {
                    return d.opts.cellHeight * a + d.opts.verticalMargin * b + d.opts.cellHeightUnit
                }, 0 === this._styles._max && f.insertCSSRule(this._styles, c, "min-height: " + b(1, 0) + ";", 0), a > this._styles._max)) {
                for (var e = this._styles._max; e < a; ++e) f.insertCSSRule(this._styles, c + '[data-gs-height="' + (e + 1) + '"]', "height: " + b(e + 1, e) + ";", e), f.insertCSSRule(this._styles, c + '[data-gs-min-height="' + (e + 1) + '"]', "min-height: " + b(e + 1, e) + ";", e), f.insertCSSRule(this._styles, c + '[data-gs-max-height="' + (e + 1) + '"]', "max-height: " + b(e + 1, e) + ";", e), f.insertCSSRule(this._styles, c + '[data-gs-y="' + e + '"]', "top: " + b(e, e) + ";", e);
                this._styles._max = a
            }
        }
    }, i.prototype._updateContainerHeight = function() {
        if (!this.grid._updateCounter) {
            var a = this.grid.getGridHeight();
            this.container.attr("data-gs-current-height", a), this.opts.cellHeight && (this.opts.verticalMargin ? this.opts.cellHeightUnit === this.opts.verticalMarginUnit ? this.container.css("height", a * (this.opts.cellHeight + this.opts.verticalMargin) - this.opts.verticalMargin + this.opts.cellHeightUnit) : this.container.css("height", "calc(" + (a * this.opts.cellHeight + this.opts.cellHeightUnit) + " + " + (a * (this.opts.verticalMargin - 1) + this.opts.verticalMarginUnit) + ")") : this.container.css("height", a * this.opts.cellHeight + this.opts.cellHeightUnit))
        }
    }, i.prototype._isOneColumnMode = function() {
        return (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= this.opts.minWidth
    }, i.prototype._setupRemovingTimeout = function(b) {
        var c = this,
            d = a(b).data("_gridstack_node");
        !d._removeTimeout && c.opts.removable && (d._removeTimeout = setTimeout(function() {
            b.addClass("grid-stack-item-removing"), d._isAboutToRemove = !0
        }, c.opts.removeTimeout))
    }, i.prototype._clearRemovingTimeout = function(b) {
        var c = a(b).data("_gridstack_node");
        c._removeTimeout && (clearTimeout(c._removeTimeout), c._removeTimeout = null, b.removeClass("grid-stack-item-removing"), c._isAboutToRemove = !1)
    }, i.prototype._prepareElementsByNode = function(c, d) {
        if ("undefined" != typeof a.ui) {
            var e, f, g = this,
                h = function(a, b) {
                    var h, i, j = Math.round(b.position.left / e),
                        k = Math.floor((b.position.top + f / 2) / f);
                    if ("drag" != a.type && (h = Math.round(b.size.width / e), i = Math.round(b.size.height / f)), "drag" == a.type) j < 0 || j >= g.grid.width || k < 0 ? (g.opts.removable === !0 && g._setupRemovingTimeout(c), j = d._beforeDragX, k = d._beforeDragY, g.placeholder.detach(), g.placeholder.hide(), g.grid.removeNode(d), g._updateContainerHeight(), d._temporaryRemoved = !0) : (g._clearRemovingTimeout(c), d._temporaryRemoved && (g.grid.addNode(d), g.placeholder.attr("data-gs-x", j).attr("data-gs-y", k).attr("data-gs-width", h).attr("data-gs-height", i).show(), g.container.append(g.placeholder), d.el = g.placeholder, d._temporaryRemoved = !1));
                    else if ("resize" == a.type && j < 0) return;
                    g.grid.canMoveNode(d, j, k, h, i) && (g.grid.moveNode(d, j, k, h, i), g._updateContainerHeight())
                },
                i = function(b, h) {
                    g.container.append(g.placeholder);
                    var i = a(this);
                    g.grid.cleanNodes(), g.grid.beginUpdate(d), e = g.cellWidth();
                    var j = Math.ceil(i.outerHeight() / i.attr("data-gs-height"));
                    f = g.container.height() / parseInt(g.container.attr("data-gs-current-height")), g.placeholder.attr("data-gs-x", i.attr("data-gs-x")).attr("data-gs-y", i.attr("data-gs-y")).attr("data-gs-width", i.attr("data-gs-width")).attr("data-gs-height", i.attr("data-gs-height")).show(), d.el = g.placeholder, d._beforeDragX = d.x, d._beforeDragY = d.y, c.resizable("option", "minWidth", e * (d.minWidth || 1)), c.resizable("option", "minHeight", j * (d.minHeight || 1)), "resizestart" == b.type && i.find(".grid-stack-item").trigger("resizestart")
                },
                j = function(b, e) {
                    var f = a(this);
                    if (f.data("_gridstack_node")) {
                        var h = !1;
                        g.placeholder.detach(), d.el = f, g.placeholder.hide(), d._isAboutToRemove ? (h = !0, c.removeData("_gridstack_node"), c.remove()) : (g._clearRemovingTimeout(c), d._temporaryRemoved ? (f.attr("data-gs-x", d._beforeDragX).attr("data-gs-y", d._beforeDragY).attr("data-gs-width", d.width).attr("data-gs-height", d.height).removeAttr("style"), d.x = d._beforeDragX, d.y = d._beforeDragY, g.grid.addNode(d)) : f.attr("data-gs-x", d.x).attr("data-gs-y", d.y).attr("data-gs-width", d.width).attr("data-gs-height", d.height).removeAttr("style")), g._updateContainerHeight(), g._triggerChangeEvent(h), g.grid.endUpdate();
                        var i = f.find(".grid-stack");
                        i.length && "resizestop" == b.type && (i.each(function(b, c) {
                            a(c).data("gridstack").onResizeHandler()
                        }), f.find(".grid-stack-item").trigger("resizestop"))
                    }
                };
            c.draggable(b.extend({}, this.opts.draggable, {
                containment: this.opts.isNested ? this.container.parent() : null,
                start: i,
                stop: j,
                drag: h
            })).resizable(b.extend({}, this.opts.resizable, {
                start: i,
                stop: j,
                resize: h
            })), (d.noMove || this._isOneColumnMode() || this.opts.disableDrag) && c.draggable("disable"), (d.noResize || this._isOneColumnMode() || this.opts.disableResize) && c.resizable("disable"), c.attr("data-gs-locked", d.locked ? "yes" : null)
        }
    }, i.prototype._prepareElement = function(b, c) {
        c = "undefined" != typeof c && c;
        var d = this;
        b = a(b), b.addClass(this.opts.itemClass);
        var e = d.grid.addNode({
            x: b.attr("data-gs-x"),
            y: b.attr("data-gs-y"),
            width: b.attr("data-gs-width"),
            height: b.attr("data-gs-height"),
            maxWidth: b.attr("data-gs-max-width"),
            minWidth: b.attr("data-gs-min-width"),
            maxHeight: b.attr("data-gs-max-height"),
            minHeight: b.attr("data-gs-min-height"),
            autoPosition: f.toBool(b.attr("data-gs-auto-position")),
            noResize: f.toBool(b.attr("data-gs-no-resize")),
            noMove: f.toBool(b.attr("data-gs-no-move")),
            locked: f.toBool(b.attr("data-gs-locked")),
            el: b,
            id: b.attr("data-gs-id"),
            _grid: d
        }, c);
        b.data("_gridstack_node", e), this._prepareElementsByNode(b, e)
    }, i.prototype.setAnimation = function(a) {
        a ? this.container.addClass("grid-stack-animate") : this.container.removeClass("grid-stack-animate")
    }, i.prototype.addWidget = function(b, c, d, e, f, g, h, i, j, k, l) {
        return b = a(b), "undefined" != typeof c && b.attr("data-gs-x", c), "undefined" != typeof d && b.attr("data-gs-y", d), "undefined" != typeof e && b.attr("data-gs-width", e), "undefined" != typeof f && b.attr("data-gs-height", f), "undefined" != typeof g && b.attr("data-gs-auto-position", g ? "yes" : null), "undefined" != typeof h && b.attr("data-gs-min-width", h), "undefined" != typeof i && b.attr("data-gs-max-width", i), "undefined" != typeof j && b.attr("data-gs-min-height", j), "undefined" != typeof k && b.attr("data-gs-max-height", k), "undefined" != typeof l && b.attr("data-gs-id", l), this.container.append(b), this._prepareElement(b, !0), this._triggerAddEvent(), this._updateContainerHeight(), this._triggerChangeEvent(!0), b
    }, i.prototype.makeWidget = function(b) {
        return b = a(b), this._prepareElement(b, !0), this._triggerAddEvent(), this._updateContainerHeight(), this._triggerChangeEvent(!0), b
    }, i.prototype.willItFit = function(a, b, c, d, e) {
        var f = {
            x: a,
            y: b,
            width: c,
            height: d,
            autoPosition: e
        };
        return this.grid.canBePlacedWithRespectToHeight(f)
    }, i.prototype.removeWidget = function(b, c) {
        c = "undefined" == typeof c || c, b = a(b);
        var d = b.data("_gridstack_node");
        // For Meteor support: https://github.com/troolee/gridstack.js/pull/272
        d || (d = this.grid.getNodeDataByDOMEl(b)), this.grid.removeNode(d, c), b.removeData("_gridstack_node"), this._updateContainerHeight(), c && b.remove(), this._triggerChangeEvent(!0), this._triggerRemoveEvent()
    }, i.prototype.removeAll = function(a) {
        b.each(this.grid.nodes, b.bind(function(b) {
            this.removeWidget(b.el, a)
        }, this)), this.grid.nodes = [], this._updateContainerHeight()
    }, i.prototype.destroy = function(b) {
        a(window).off("resize", this.onResizeHandler), this.disable(), "undefined" == typeof b || b ? this.container.remove() : (this.removeAll(!1), this.container.removeData("gridstack")), f.removeStylesheet(this._stylesId), this.grid && (this.grid = null)
    }, i.prototype.resizable = function(b, c) {
        var d = this;
        return b = a(b), b.each(function(b, e) {
            e = a(e);
            var f = e.data("_gridstack_node");
            "undefined" != typeof f && null !== f && "undefined" != typeof a.ui && (f.noResize = !c, f.noResize || d._isOneColumnMode() ? e.resizable("disable") : e.resizable("enable"))
        }), this
    }, i.prototype.movable = function(b, c) {
        var d = this;
        return b = a(b), b.each(function(b, e) {
            e = a(e);
            var f = e.data("_gridstack_node");
            "undefined" != typeof f && null !== f && "undefined" != typeof a.ui && (f.noMove = !c, f.noMove || d._isOneColumnMode() ? (e.draggable("disable"), e.removeClass("ui-draggable-handle")) : (e.draggable("enable"), e.addClass("ui-draggable-handle")))
        }), this
    }, i.prototype.enableMove = function(a, b) {
        this.movable(this.container.children("." + this.opts.itemClass), a), b && (this.opts.disableDrag = !a)
    }, i.prototype.enableResize = function(a, b) {
        this.resizable(this.container.children("." + this.opts.itemClass), a), b && (this.opts.disableResize = !a)
    }, i.prototype.disable = function() {
        this.movable(this.container.children("." + this.opts.itemClass), !1), this.resizable(this.container.children("." + this.opts.itemClass), !1), this.container.trigger("disable")
    }, i.prototype.enable = function() {
        this.movable(this.container.children("." + this.opts.itemClass), !0), this.resizable(this.container.children("." + this.opts.itemClass), !0), this.container.trigger("enable")
    }, i.prototype.locked = function(b, c) {
        return b = a(b), b.each(function(b, d) {
            d = a(d);
            var e = d.data("_gridstack_node");
            "undefined" != typeof e && null !== e && (e.locked = c || !1, d.attr("data-gs-locked", e.locked ? "yes" : null))
        }), this
    }, i.prototype.maxHeight = function(b, c) {
        return b = a(b), b.each(function(b, d) {
            d = a(d);
            var e = d.data("_gridstack_node");
            "undefined" != typeof e && null !== e && (isNaN(c) || (e.maxHeight = c || !1, d.attr("data-gs-max-height", c)))
        }), this
    }, i.prototype.minHeight = function(b, c) {
        return b = a(b), b.each(function(b, d) {
            d = a(d);
            var e = d.data("_gridstack_node");
            "undefined" != typeof e && null !== e && (isNaN(c) || (e.minHeight = c || !1, d.attr("data-gs-min-height", c)))
        }), this
    }, i.prototype.maxWidth = function(b, c) {
        return b = a(b), b.each(function(b, d) {
            d = a(d);
            var e = d.data("_gridstack_node");
            "undefined" != typeof e && null !== e && (isNaN(c) || (e.maxWidth = c || !1, d.attr("data-gs-max-width", c)))
        }), this
    }, i.prototype.minWidth = function(b, c) {
        return b = a(b), b.each(function(b, d) {
            d = a(d);
            var e = d.data("_gridstack_node");
            "undefined" != typeof e && null !== e && (isNaN(c) || (e.minWidth = c || !1, d.attr("data-gs-min-width", c)))
        }), this
    }, i.prototype._updateElement = function(b, c) {
        b = a(b).first();
        var d = b.data("_gridstack_node");
        if ("undefined" != typeof d && null !== d) {
            var e = this;
            e.grid.cleanNodes(), e.grid.beginUpdate(d), c.call(this, b, d), e._updateContainerHeight(), e._triggerChangeEvent(), e.grid.endUpdate()
        }
    }, i.prototype.resize = function(a, b, c) {
        this._updateElement(a, function(a, d) {
            b = null !== b && "undefined" != typeof b ? b : d.width, c = null !== c && "undefined" != typeof c ? c : d.height, this.grid.moveNode(d, d.x, d.y, b, c)
        })
    }, i.prototype.move = function(a, b, c) {
        this._updateElement(a, function(a, d) {
            b = null !== b && "undefined" != typeof b ? b : d.x, c = null !== c && "undefined" != typeof c ? c : d.y, this.grid.moveNode(d, b, c, d.width, d.height)
        })
    }, i.prototype.update = function(a, b, c, d, e) {
        this._updateElement(a, function(a, f) {
            b = null !== b && "undefined" != typeof b ? b : f.x, c = null !== c && "undefined" != typeof c ? c : f.y, d = null !== d && "undefined" != typeof d ? d : f.width, e = null !== e && "undefined" != typeof e ? e : f.height, this.grid.moveNode(f, b, c, d, e)
        })
    }, i.prototype.verticalMargin = function(a, b) {
        if ("undefined" == typeof a) return this.opts.verticalMargin;
        var c = f.parseHeight(a);
        this.opts.verticalMarginUnit === c.unit && this.opts.height === c.height || (this.opts.verticalMarginUnit = c.unit, this.opts.verticalMargin = c.height, b || this._updateStyles())
    }, i.prototype.cellHeight = function(a, b) {
        if ("undefined" == typeof a) {
            if (this.opts.cellHeight) return this.opts.cellHeight;
            var c = this.container.children("." + this.opts.itemClass).first();
            return Math.ceil(c.outerHeight() / c.attr("data-gs-height"))
        }
        var d = f.parseHeight(a);
        this.opts.cellHeightUnit === d.heightUnit && this.opts.height === d.height || (this.opts.cellHeightUnit = d.unit, this.opts.cellHeight = d.height, b || this._updateStyles())
    }, i.prototype.cellWidth = function() {
        return Math.round(this.container.outerWidth() / this.opts.width)
    }, i.prototype.getCellFromPixel = function(a, b) {
        var c = "undefined" != typeof b && b ? this.container.offset() : this.container.position(),
            d = a.left - c.left,
            e = a.top - c.top,
            f = Math.floor(this.container.width() / this.opts.width),
            g = Math.floor(this.container.height() / parseInt(this.container.attr("data-gs-current-height")));
        return {
            x: Math.floor(d / f),
            y: Math.floor(e / g)
        }
    }, i.prototype.batchUpdate = function() {
        this.grid.batchUpdate()
    }, i.prototype.commit = function() {
        this.grid.commit(), this._updateContainerHeight()
    }, i.prototype.isAreaEmpty = function(a, b, c, d) {
        return this.grid.isAreaEmpty(a, b, c, d)
    }, i.prototype.setStatic = function(a) {
        this.opts.staticGrid = a === !0, this.enableMove(!a), this.enableResize(!a), this._setStaticClass()
    }, i.prototype._setStaticClass = function() {
        var a = "grid-stack-static";
        this.opts.staticGrid === !0 ? this.container.addClass(a) : this.container.removeClass(a)
    }, i.prototype._updateNodeWidths = function(a, b) {
        this.grid._sortNodes(), this.grid.batchUpdate();
        for (var c = {}, d = 0; d < this.grid.nodes.length; d++) c = this.grid.nodes[d], this.update(c.el, Math.round(c.x * b / a), void 0, Math.round(c.width * b / a), void 0);
        this.grid.commit()
    }, i.prototype.setGridWidth = function(a, b) {
        this.container.removeClass("grid-stack-" + this.opts.width), b !== !0 && this._updateNodeWidths(this.opts.width, a), this.opts.width = a, this.grid.width = a, this.container.addClass("grid-stack-" + a)
    }, h.prototype.batch_update = d(h.prototype.batchUpdate), h.prototype._fix_collisions = d(h.prototype._fixCollisions, "_fix_collisions", "_fixCollisions"), h.prototype.is_area_empty = d(h.prototype.isAreaEmpty, "is_area_empty", "isAreaEmpty"), h.prototype._sort_nodes = d(h.prototype._sortNodes, "_sort_nodes", "_sortNodes"), h.prototype._pack_nodes = d(h.prototype._packNodes, "_pack_nodes", "_packNodes"), h.prototype._prepare_node = d(h.prototype._prepareNode, "_prepare_node", "_prepareNode"), h.prototype.clean_nodes = d(h.prototype.cleanNodes, "clean_nodes", "cleanNodes"), h.prototype.get_dirty_nodes = d(h.prototype.getDirtyNodes, "get_dirty_nodes", "getDirtyNodes"), h.prototype.add_node = d(h.prototype.addNode, "add_node", "addNode, "), h.prototype.remove_node = d(h.prototype.removeNode, "remove_node", "removeNode"), h.prototype.can_move_node = d(h.prototype.canMoveNode, "can_move_node", "canMoveNode"), h.prototype.move_node = d(h.prototype.moveNode, "move_node", "moveNode"), h.prototype.get_grid_height = d(h.prototype.getGridHeight, "get_grid_height", "getGridHeight"), h.prototype.begin_update = d(h.prototype.beginUpdate, "begin_update", "beginUpdate"), h.prototype.end_update = d(h.prototype.endUpdate, "end_update", "endUpdate"), h.prototype.can_be_placed_with_respect_to_height = d(h.prototype.canBePlacedWithRespectToHeight, "can_be_placed_with_respect_to_height", "canBePlacedWithRespectToHeight"), i.prototype._trigger_change_event = d(i.prototype._triggerChangeEvent, "_trigger_change_event", "_triggerChangeEvent"), i.prototype._init_styles = d(i.prototype._initStyles, "_init_styles", "_initStyles"), i.prototype._update_styles = d(i.prototype._updateStyles, "_update_styles", "_updateStyles"), i.prototype._update_container_height = d(i.prototype._updateContainerHeight, "_update_container_height", "_updateContainerHeight"), i.prototype._is_one_column_mode = d(i.prototype._isOneColumnMode, "_is_one_column_mode", "_isOneColumnMode"), i.prototype._prepare_element = d(i.prototype._prepareElement, "_prepare_element", "_prepareElement"), i.prototype.set_animation = d(i.prototype.setAnimation, "set_animation", "setAnimation"), i.prototype.add_widget = d(i.prototype.addWidget, "add_widget", "addWidget"), i.prototype.make_widget = d(i.prototype.makeWidget, "make_widget", "makeWidget"), i.prototype.will_it_fit = d(i.prototype.willItFit, "will_it_fit", "willItFit"), i.prototype.remove_widget = d(i.prototype.removeWidget, "remove_widget", "removeWidget"), i.prototype.remove_all = d(i.prototype.removeAll, "remove_all", "removeAll"), i.prototype.min_height = d(i.prototype.minHeight, "min_height", "minHeight"), i.prototype.min_width = d(i.prototype.minWidth, "min_width", "minWidth"), i.prototype._update_element = d(i.prototype._updateElement, "_update_element", "_updateElement"), i.prototype.cell_height = d(i.prototype.cellHeight, "cell_height", "cellHeight"), i.prototype.cell_width = d(i.prototype.cellWidth, "cell_width", "cellWidth"), i.prototype.get_cell_from_pixel = d(i.prototype.getCellFromPixel, "get_cell_from_pixel", "getCellFromPixel"), i.prototype.batch_update = d(i.prototype.batchUpdate, "batch_update", "batchUpdate"), i.prototype.is_area_empty = d(i.prototype.isAreaEmpty, "is_area_empty", "isAreaEmpty"), i.prototype.set_static = d(i.prototype.setStatic, "set_static", "setStatic"), i.prototype._set_static_class = d(i.prototype._setStaticClass, "_set_static_class", "_setStaticClass"), c.GridStackUI = i, c.GridStackUI.Utils = f, c.GridStackUI.Engine = h, a.fn.gridstack = function(b) {
        return this.each(function() {
            var c = a(this);
            c.data("gridstack") || c.data("gridstack", new i(this, b))
        })
    }, c.GridStackUI
});
//# sourceMappingURL=gridstack.min.map