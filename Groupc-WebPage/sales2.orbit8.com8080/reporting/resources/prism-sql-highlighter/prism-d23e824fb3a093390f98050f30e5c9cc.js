/* PrismJS 1.15.0
https://prismjs.com/download.html#themes=prism&languages=sql */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function() {
        var e = /\blang(?:uage)?-([\w-]+)\b/i,
            t = 0,
            n = _self.Prism = {
                manual: _self.Prism && _self.Prism.manual,
                disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function(e) {
                        return e instanceof r ? new r(e.type, n.util.encode(e.content), e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++t
                        }), e.__id
                    },
                    clone: function(e, t) {
                        var r = n.util.type(e);
                        switch (t = t || {}, r) {
                            case "Object":
                                if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                                var a = {};
                                t[n.util.objId(e)] = a;
                                for (var l in e) e.hasOwnProperty(l) && (a[l] = n.util.clone(e[l], t));
                                return a;
                            case "Array":
                                if (t[n.util.objId(e)]) return t[n.util.objId(e)];
                                var a = [];
                                return t[n.util.objId(e)] = a, e.forEach(function(e, r) {
                                    a[r] = n.util.clone(e, t)
                                }), a
                        }
                        return e
                    }
                },
                languages: {
                    extend: function(e, t) {
                        var r = n.util.clone(n.languages[e]);
                        for (var a in t) r[a] = t[a];
                        return r
                    },
                    insertBefore: function(e, t, r, a) {
                        a = a || n.languages;
                        var l = a[e];
                        if (2 == arguments.length) {
                            r = arguments[1];
                            for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);
                            return l
                        }
                        var o = {};
                        for (var s in l)
                            if (l.hasOwnProperty(s)) {
                                if (s == t)
                                    for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
                                o[s] = l[s]
                            }
                        var u = a[e];
                        return a[e] = o, n.languages.DFS(n.languages, function(t, n) {
                            n === u && t != e && (this[t] = o)
                        }), o
                    },
                    DFS: function(e, t, r, a) {
                        a = a || {};
                        for (var l in e) e.hasOwnProperty(l) && (t.call(e, l, e[l], r || l), "Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])] ? "Array" !== n.util.type(e[l]) || a[n.util.objId(e[l])] || (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, l, a)) : (a[n.util.objId(e[l])] = !0, n.languages.DFS(e[l], t, null, a)))
                    }
                },
                plugins: {},
                highlightAll: function(e, t) {
                    n.highlightAllUnder(document, e, t)
                },
                highlightAllUnder: function(e, t, r) {
                    var a = {
                        callback: r,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    n.hooks.run("before-highlightall", a);
                    for (var l, i = a.elements || e.querySelectorAll(a.selector), o = 0; l = i[o++];) n.highlightElement(l, t === !0, a.callback)
                },
                highlightElement: function(t, r, a) {
                    for (var l, i, o = t; o && !e.test(o.className);) o = o.parentNode;
                    o && (l = (o.className.match(e) || [, ""])[1].toLowerCase(), i = n.languages[l]), t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l, t.parentNode && (o = t.parentNode, /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + l));
                    var s = t.textContent,
                        u = {
                            element: t,
                            language: l,
                            grammar: i,
                            code: s
                        };
                    if (n.hooks.run("before-sanity-check", u), !u.code || !u.grammar) return u.code && (n.hooks.run("before-highlight", u), u.element.textContent = u.code, n.hooks.run("after-highlight", u)), n.hooks.run("complete", u), void 0;
                    if (n.hooks.run("before-highlight", u), r && _self.Worker) {
                        var g = new Worker(n.filename);
                        g.onmessage = function(e) {
                            u.highlightedCode = e.data, n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(u.element), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                        }, g.postMessage(JSON.stringify({
                            language: u.language,
                            code: u.code,
                            immediateClose: !0
                        }))
                    } else u.highlightedCode = n.highlight(u.code, u.grammar, u.language), n.hooks.run("before-insert", u), u.element.innerHTML = u.highlightedCode, a && a.call(t), n.hooks.run("after-highlight", u), n.hooks.run("complete", u)
                },
                highlight: function(e, t, a) {
                    var l = {
                        code: e,
                        grammar: t,
                        language: a
                    };
                    return n.hooks.run("before-tokenize", l), l.tokens = n.tokenize(l.code, l.grammar), n.hooks.run("after-tokenize", l), r.stringify(n.util.encode(l.tokens), l.language)
                },
                matchGrammar: function(e, t, r, a, l, i, o) {
                    var s = n.Token;
                    for (var u in r)
                        if (r.hasOwnProperty(u) && r[u]) {
                            if (u == o) return;
                            var g = r[u];
                            g = "Array" === n.util.type(g) ? g : [g];
                            for (var c = 0; c < g.length; ++c) {
                                var h = g[c],
                                    f = h.inside,
                                    d = !!h.lookbehind,
                                    m = !!h.greedy,
                                    p = 0,
                                    y = h.alias;
                                if (m && !h.pattern.global) {
                                    var v = h.pattern.toString().match(/[imuy]*$/)[0];
                                    h.pattern = RegExp(h.pattern.source, v + "g")
                                }
                                h = h.pattern || h;
                                for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
                                    var w = t[b];
                                    if (t.length > e.length) return;
                                    if (!(w instanceof s)) {
                                        if (m && b != t.length - 1) {
                                            h.lastIndex = k;
                                            var _ = h.exec(e);
                                            if (!_) break;
                                            for (var j = _.index + (d ? _[1].length : 0), P = _.index + _[0].length, A = b, x = k, O = t.length; O > A && (P > x || !t[A].type && !t[A - 1].greedy); ++A) x += t[A].length, j >= x && (++b, k = x);
                                            if (t[b] instanceof s) continue;
                                            I = A - b, w = e.slice(k, x), _.index -= k
                                        } else {
                                            h.lastIndex = 0;
                                            var _ = h.exec(w),
                                                I = 1
                                        }
                                        if (_) {
                                            d && (p = _[1] ? _[1].length : 0);
                                            var j = _.index + p,
                                                _ = _[0].slice(p),
                                                P = j + _.length,
                                                N = w.slice(0, j),
                                                S = w.slice(P),
                                                C = [b, I];
                                            N && (++b, k += N.length, C.push(N));
                                            var E = new s(u, f ? n.tokenize(_, f) : _, y, _, m);
                                            if (C.push(E), S && C.push(S), Array.prototype.splice.apply(t, C), 1 != I && n.matchGrammar(e, t, r, b, k, !0, u), i) break
                                        } else if (i) break
                                    }
                                }
                            }
                        }
                },
                tokenize: function(e, t) {
                    var r = [e],
                        a = t.rest;
                    if (a) {
                        for (var l in a) t[l] = a[l];
                        delete t.rest
                    }
                    return n.matchGrammar(e, r, t, 0, 0, !1), r
                },
                hooks: {
                    all: {},
                    add: function(e, t) {
                        var r = n.hooks.all;
                        r[e] = r[e] || [], r[e].push(t)
                    },
                    run: function(e, t) {
                        var r = n.hooks.all[e];
                        if (r && r.length)
                            for (var a, l = 0; a = r[l++];) a(t)
                    }
                }
            },
            r = n.Token = function(e, t, n, r, a) {
                this.type = e, this.content = t, this.alias = n, this.length = 0 | (r || "").length, this.greedy = !!a
            };
        if (r.stringify = function(e, t, a) {
                if ("string" == typeof e) return e;
                if ("Array" === n.util.type(e)) return e.map(function(n) {
                    return r.stringify(n, t, e)
                }).join("");
                var l = {
                    type: e.type,
                    content: r.stringify(e.content, t, a),
                    tag: "span",
                    classes: ["token", e.type],
                    attributes: {},
                    language: t,
                    parent: a
                };
                if (e.alias) {
                    var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
                    Array.prototype.push.apply(l.classes, i)
                }
                n.hooks.run("wrap", l);
                var o = Object.keys(l.attributes).map(function(e) {
                    return e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
                }).join(" ");
                return "<" + l.tag + ' class="' + l.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + l.content + "</" + l.tag + ">"
            }, !_self.document) return _self.addEventListener ? (n.disableWorkerMessageHandler || _self.addEventListener("message", function(e) {
            var t = JSON.parse(e.data),
                r = t.language,
                a = t.code,
                l = t.immediateClose;
            _self.postMessage(n.highlight(a, n.languages[r], r)), l && _self.close()
        }, !1), _self.Prism) : _self.Prism;
        var a = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
        return a && (n.filename = a.src, n.manual || a.hasAttribute("data-manual") || ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))), _self.Prism
    }();
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.sql = {
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
        lookbehind: !0
    },
    string: {
        pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
        greedy: !0,
        lookbehind: !0
    },
    variable: /@[\w.$]+|@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,
    "function": /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    "boolean": /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
};