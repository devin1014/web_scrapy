(this.webpackJsonpweb = this.webpackJsonpweb || []).push([[0], [, , , , , , , , , function (e, t, n) {
    "use strict";

    function i(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)", "i"),
            n = encodeURI(window.location.search).substr(1).match(t);
        return null != n ? unescape(n[2]) : null
    }

    n.d(t, "a", (function () {
        return i
    }))
}, , function (e, t, n) {
    e.exports = {
        line: "About_line__Ogj73",
        divider: "About_divider__2nnys",
        title: "About_title__dU2D1",
        "p-info": "About_p-info__2hX-e",
        url: "About_url__1lxtd"
    }
}, , , function (e, t, n) {
    "use strict";
    t.a = function e(t, n) {
        var i = document.createElement("script");
        i.src = t, i.onerror = function () {
            -1 === t.indexOf("cntv-203") || e(t.replace("cntv-203", "cntv-201"), n)
        }, document.getElementsByTagName("head")[0].appendChild(i), n && (i.onload = function () {
            return n()
        })
    }
}, , , , , function (e, t, n) {
    e.exports = n.p + "static/media/playStatus.734c44cd.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/full.5d905b20.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/exFull.f2de20e0.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/volume.1b1f4627.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/mute.3b0b84bf.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/pip.cf301161.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/flash.7f3cd450.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/xiaolian.352edfad.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/qq.3a84c751.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/list.25a88895.svg"
}, function (e, t, n) {
    e.exports = n(43)
}, , , , , , function (e, t, n) {
}, , function (e, t, n) {
}, function (e, t, n) {
    e.exports = n.p + "static/media/play.14d4f40b.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/pause.7ef81c54.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/juchang.611ad853.svg"
}, function (e, t, n) {
    e.exports = n.p + "static/media/juchang2.e174d133.svg"
}, function (module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var _loadScript__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14),
        _queryString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
    "1" !== Object(_queryString__WEBPACK_IMPORTED_MODULE_1__.a)("f11") && eval(function (e, t, n, i, o, a) {
        if (o = function (e) {
            return e.toString(20)
        }, !"".replace(/^/, String)) {
            for (; n--;) a[o(n)] = i[n] || o(n);
            i = [function (e) {
                return a[e]
            }], o = function () {
                return "\\w+"
            }, n = 1
        }
        for (; n--;) i[n] && (e = e.replace(new RegExp("\\b" + o(n) + "\\b", "g"), i[n]));
        return e
    }("1 2=c.3('8');4.b(2,'5',{6:7(){1 a=\"\";9(1 i=0;i<d;i++){a=a+i.e();f.g(0,0,a)}}});h.j(2);", 0, 20, " var x createElement Object id get function div for  defineProperty document 1000000 toString history pushState console  log".split(" "), 0, {}))
}, function (e, t, n) {
    "use strict";
    n.r(t);
    var i, o = n(0), a = n.n(o), r = n(15), s = n.n(r), c = (n(35), n(1)), l = n(2), u = n(4), d = n(3), m = n(5),
        p = n(7), h = n.n(p), f = n(12), b = n(10), v = n(6), g = (n(37), function (e) {
            function t(e) {
                var n;
                return Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).state = {drag: !1}, n.setDurationEleWidth = n.setDurationEleWidth.bind(Object(v.a)(n)), n.setCurrEle = n.setCurrEle.bind(Object(v.a)(n)), n.setCurr = n.setCurr.bind(Object(v.a)(n)), n.setDrag = n.setDrag.bind(Object(v.a)(n)), n.setDragCurr = n.setDragCurr.bind(Object(v.a)(n)), n.setClickCurr = n.setClickCurr.bind(Object(v.a)(n)), n.onMouseUp = n.onMouseUp.bind(Object(v.a)(n)), n.moveOut = n.moveOut.bind(Object(v.a)(n)), n
            }

            return Object(m.a)(t, e), Object(l.a)(t, [{
                key: "setDurationEleWidth", value: function (e) {
                    e && (this.durationEleWidth = e.clientWidth, this.duratinEleLeft = e.offsetLeft)
                }
            }, {
                key: "setCurrEle", value: function (e) {
                    e && (this.currEle = e)
                }
            }, {
                key: "setCurr", value: function (e) {
                    this.changeCurr(e)
                }
            }, {
                key: "setClickCurr", value: function (e) {
                    var t = e.clientX - this.duratinEleLeft;
                    t > this.durationEleWidth && (t = this.durationEleWidth), this.setCurr(t / this.durationEleWidth)
                }
            }, {
                key: "setDrag", value: function (e) {
                    this.setState({drag: e})
                }
            }, {
                key: "setDragCurr", value: function (e) {
                    var t = (window.mobile && e.touches ? e.touches[0].clientX : e.clientX) - this.duratinEleLeft;
                    t < 0 ? (t = 0, this.setState({drag: !1})) : t > this.durationEleWidth && (t = this.durationEleWidth, this.setState({drag: !1}));
                    var n = t / this.durationEleWidth;
                    this.moveCurr(n, e), this.state.drag && this.setCurr(n)
                }
            }, {
                key: "onMouseUp", value: function () {
                    this.setDrag(!1)
                }
            }, {
                key: "changeCurr", value: function (e) {
                    this.props.changeCurr(e)
                }
            }, {
                key: "moveCurr", value: function (e, t) {
                    this.props.moveCurr(e, t)
                }
            }, {
                key: "moveOut", value: function () {
                    this.props.moveOut()
                }
            }, {
                key: "render", value: function () {
                    var e = this, t = this.props.curr * this.durationEleWidth, n = this.props.buff * this.durationEleWidth;
                    return a.a.createElement("div", {
                        className: this.props.load && !window.mobile ? "f-progress-loading" : null,
                        style: w.durationBg,
                        ref: function (t) {
                            return e.setDurationEleWidth(t)
                        },
                        onClick: this.setClickCurr,
                        onMouseUp: this.onMouseUp,
                        onMouseMove: this.setDragCurr,
                        onMouseOut: this.moveOut,
                        onTouchMove: this.setDragCurr,
                        onTouchEnd: this.onMouseUp
                    }, a.a.createElement("div", {
                        style: Object(b.a)({}, w.buffBg, {width: n + "px"}),
                        onMouseUp: this.onMouseUp
                    }, a.a.createElement("div", {
                        className: "curr-fire",
                        style: Object(b.a)({}, w.currBg, {width: t + "px"}),
                        ref: this.setCurrEle,
                        onMouseUp: this.onMouseUp
                    }, a.a.createElement("div", {
                        className: "curr-shine",
                        style: Object(b.a)({}, w.curr, {left: t + "px"}),
                        onMouseDown: function () {
                            return e.setDrag(!0)
                        },
                        onMouseUp: this.onMouseUp,
                        onTouchStart: function () {
                            return e.setDrag(!0)
                        },
                        onTouchEnd: this.onMouseUp
                    }))))
                }
            }]), t
        }(o.Component)), w = {
            durationBg: {
                position: "relative",
                display: "inline-block",
                margin: ".1em 1em",
                backgroundColor: "rgba(255, 255, 255, 0.19)",
                height: ".5em",
                borderRadius: "1em",
                boxShadow: "0 1px 1px rgba(0,0,0,.15)",
                cursor: "pointer",
                flex: 1
            },
            currBg: {
                background: "rgb(251, 0, 0)",
                height: "100%",
                borderRadius: "1em",
                boxShadow: "0 1px 1px rgba(0,0,0,.15)"
            },
            buffBg: {
                background: "rgba(255, 255, 255, 0.19)",
                height: "100%",
                borderRadius: "1em",
                boxShadow: "0 1px 1px rgba(0,0,0,.15)"
            },
            curr: {
                width: ".89em",
                height: ".89em",
                background: "#fff",
                borderRadius: "100%",
                marginTop: "-0.19em",
                position: "absolute",
                marginLeft: "-0.5em"
            }
        }, y = g, k = function (e) {
            function t(e) {
                var n;
                return Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).state = {drag: !1}, n.setDurationEleWidth = n.setDurationEleWidth.bind(Object(v.a)(n)), n.setCurrEle = n.setCurrEle.bind(Object(v.a)(n)), n.change = n.change.bind(Object(v.a)(n)), n.setDrag = n.setDrag.bind(Object(v.a)(n)), n.setDragCurr = n.setDragCurr.bind(Object(v.a)(n)), n.setClickCurr = n.setClickCurr.bind(Object(v.a)(n)), n.onMouseUp = n.onMouseUp.bind(Object(v.a)(n)), n
            }

            return Object(m.a)(t, e), Object(l.a)(t, [{
                key: "setDurationEleWidth", value: function (e) {
                    e && (this.durationEleWidth = e.clientWidth, this.duratinEleLeft = e.offsetLeft)
                }
            }, {
                key: "setCurrEle", value: function (e) {
                    e && (this.currEle = e)
                }
            }, {
                key: "setClickCurr", value: function (e) {
                    var t = e.clientX - this.duratinEleLeft;
                    t > this.durationEleWidth && (t = this.durationEleWidth), this.change(t / this.durationEleWidth)
                }
            }, {
                key: "setDrag", value: function (e) {
                    this.setState({drag: e})
                }
            }, {
                key: "setDragCurr", value: function (e) {
                    var t = e.clientX - this.duratinEleLeft;
                    t < 0 ? (t = 0, this.setState({drag: !1})) : t > this.durationEleWidth && (t = this.durationEleWidth, this.setState({drag: !1}));
                    var n = t / this.durationEleWidth;
                    this.state.drag && this.change(n)
                }
            }, {
                key: "onMouseUp", value: function () {
                    this.setDrag(!1)
                }
            }, {
                key: "change", value: function (e) {
                    this.props.change(e)
                }
            }, {
                key: "moveCurr", value: function (e, t) {
                    this.props.moveCurr(e, t)
                }
            }, {
                key: "moveOut", value: function () {
                    this.props.moveOut()
                }
            }, {
                key: "render", value: function () {
                    var e = this, t = this.props.curr * this.durationEleWidth;
                    return a.a.createElement("div", {
                        className: this.props.load ? "f-progress-loading" : null,
                        style: E.durationBg,
                        ref: function (t) {
                            return e.setDurationEleWidth(t)
                        },
                        onClick: this.setClickCurr,
                        onMouseUp: this.onMouseUp,
                        onMouseMove: this.setDragCurr
                    }, a.a.createElement("div", {
                        style: Object(b.a)({}, E.currBg, {width: t + "px"}),
                        ref: this.setCurrEle
                    }, a.a.createElement("div", {
                        style: Object(b.a)({}, E.curr, {left: t + "px"}),
                        onMouseDown: function () {
                            return e.setDrag(!0)
                        },
                        onMouseUp: this.onMouseUp
                    })))
                }
            }]), t
        }(o.Component), E = {
            durationBg: {
                position: "relative",
                display: "inline-block",
                backgroundColor: "rgba(255, 255, 255, 0.19)",
                width: "5em",
                height: ".5em",
                borderRadius: "1em",
                boxShadow: "0 1px 1px rgba(0,0,0,.15)",
                cursor: "pointer",
                bottom: ".9em"
            },
            currBg: {
                background: "rgb(251, 0, 0)",
                height: "100%",
                borderRadius: "1em",
                boxShadow: "0 1px 1px rgba(0,0,0,.15)"
            },
            buffBg: {
                background: "rgba(255, 255, 255, 0.19)",
                height: "100%",
                borderRadius: "1em",
                boxShadow: "0 1px 1px rgba(0,0,0,.15)"
            },
            curr: {
                width: ".89em",
                height: ".89em",
                background: "#fff",
                borderRadius: "100%",
                marginTop: "-0.19em",
                position: "absolute",
                marginLeft: "-0.5em"
            }
        }, x = k, S = n(19), j = n.n(S), O = function (e) {
            function t() {
                return Object(c.a)(this, t), Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
            }

            return Object(m.a)(t, e), Object(l.a)(t, [{
                key: "render", value: function () {
                    return a.a.createElement("img", {style: _.pause, src: j.a, onClick: this.props.onClick})
                }
            }]), t
        }(o.Component), _ = {
            pause: {
                width: "5em",
                height: "5em",
                position: "absolute",
                left: "50%",
                bottom: "50%",
                borderRadius: "100%",
                transform: "translate(-50%,0)",
                background: "rgb(251, 0, 0)",
                opacity: "0.9",
                boxShadow: "0 0px 1px rgba(0,0,0,.15)",
                zIndex: "99",
                cursor: "pointer"
            }
        }, C = O, T = n(13), M = n(11), N = n.n(M), z = function (e) {
            function t(e) {
                var n;
                return Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).search = function () {
                    window.jiexi(n.state.searchText)
                }, n.state = {searchText: ""}, n
            }

            return Object(m.a)(t, e), Object(l.a)(t, [{
                key: "render", value: function () {
                    var e = this;
                    return a.a.createElement("div", {style: R.bg}, a.a.createElement("div", {className: N.a.line}, a.a.createElement("span", {className: N.a.title}, "\u641c\u7d22\u89c6\u9891: "), a.a.createElement("input", {
                        style: R.input,
                        type: "text",
                        placeholder: "\u8bf7\u8f93\u5165\u8981\u641c\u7d22\u7684\u89c6\u9891\u540d\u79f0",
                        onChange: function (t) {
                            return e.setState({searchText: t.target.value})
                        },
                        onKeyDown: function (t) {
                            return 13 === t.keyCode ? e.search : null
                        }
                    }), a.a.createElement("span", {
                        style: R.buttonActive,
                        onClick: this.search
                    }, "\u641c\u7d22")), a.a.createElement("div", {className: N.a.line}, a.a.createElement("span", {className: N.a.title}, "\u64ad\u653e\u901f\u5ea6: "), a.a.createElement("span", {
                        style: .5 === this.props.speed ? R.buttonActive : R.button,
                        onClick: function () {
                            return e.props.setSpeed(.5)
                        }
                    }, "x0.5"), a.a.createElement("span", {
                        style: 1 === this.props.speed ? R.buttonActive : R.button,
                        onClick: function () {
                            return e.props.setSpeed(1)
                        }
                    }, "\u6b63\u5e38"), a.a.createElement("span", {
                        style: 1.25 === this.props.speed ? R.buttonActive : R.button,
                        onClick: function () {
                            return e.props.setSpeed(1.25)
                        }
                    }, "x1.25"), a.a.createElement("span", {
                        style: 1.5 === this.props.speed ? R.buttonActive : R.button,
                        onClick: function () {
                            return e.props.setSpeed(1.5)
                        }
                    }, "x1.5"), a.a.createElement("span", {
                        style: 2 === this.props.speed ? R.buttonActive : R.button,
                        onClick: function () {
                            return e.props.setSpeed(2)
                        }
                    }, "x2")), a.a.createElement("div", {className: N.a.line}, a.a.createElement("span", {className: N.a.title}, "\u81ea\u52a8\u8fde\u64ad\uff0c\u8df3\u8fc7\u7247\u5934\u7247\u5c3e:  \xa0"), a.a.createElement("span", {
                        style: this.props.video_skip ? R.buttonActive : R.button,
                        onClick: function () {
                            return window.set_skip(!0)
                        }
                    }, "\u5f00\u542f"), a.a.createElement("span", {
                        style: this.props.video_skip ? R.button : R.buttonActive,
                        onClick: function () {
                            return window.set_skip(!1)
                        }
                    }, "\u5173\u95ed")), a.a.createElement("div", {className: N.a.line}, a.a.createElement("span", {className: N.a.title}, "\u5feb\u6377\u6309\u952e\uff1a"), a.a.createElement("span", {style: R.text}, "\u2192\u2190 \u5feb\u8fdb\u5feb\u90005\u79d2\uff0c \u2191\u2193 \u8c03\u6574\u97f3\u91cf\uff0c \u70b9\u51fb,\u7a7a\u683c \u6682\u505c/\u64ad\u653e\uff0c\u53cc\u51fb,\u56de\u8f66 \u5168\u5c4f/\u9000\u51fa\u5168\u5c4f")), window.self != window.top || window.mobile ? null : a.a.createElement("div", {className: N.a.line}, a.a.createElement("span", {className: N.a.title}, "\u95ee\u9898\u53cd\u9988: "), a.a.createElement("span", {style: R.text}, " \xa0\xa0QQ\uff1a3366 129 856 \uff08\u975e\u5ba2\u670dQQ! \u5907\u6ce8: \u53cd\u9988+\u8981\u53cd\u9988\u7684\u95ee\u9898\uff09")), window.mobile ? a.a.createElement("div", {className: N.a.divider}) : null, a.a.createElement("div", {
                        className: window.mobile ? null : N.a["p-info"],
                        style: Object(b.a)({marginTop: "1em", textAlign: window.mobile ? "center" : "end"}, R.text)
                    }, a.a.createElement("span", {
                        style: R.text,
                        dangerouslySetInnerHTML: {__html: this.props.p2pInfo}
                    })), a.a.createElement("div", {
                        className: window.mobile ? null : N.a.url,
                        style: Object(b.a)({
                            textAlign: window.mobile ? "center" : "end",
                            marginTop: ".5em",
                            marginBottom: ".5em"
                        }, R.text)
                    }, a.a.createElement("a", {
                        href: "https://mplayer.m1907.cn",
                        target: "_blank"
                    }, "MPlayer - mplayer.m1907.cn"), "\xa0\xa0", a.a.createElement("a", {
                        href: "https://kkvod.aoliooo.com",
                        target: "_blank"
                    }, "\u89c6\u9891\u52a0\u901f\u6280\u672f\u7531 KKVOD \u63d0\u4f9b")), window.mobile ? a.a.createElement("div", {className: N.a.divider}) : null, a.a.createElement("div", {style: {textAlign: "center"}}, a.a.createElement("span", {
                        style: R.buttonActive,
                        onClick: this.props.close
                    }, "\u2716")))
                }
            }]), t
        }(o.Component), D = {
            background: "rgba(0,0,0,.2)",
            position: "absolute",
            right: "15em",
            bottom: "15em",
            left: "15em",
            borderRadius: "2px",
            overflow: "auto",
            padding: "1.5em 1.5em .5em 1.5em",
            color: "rgb(159, 218, 0)",
            fontSize: "0.9em",
            lineHeight: "1.5em",
            boxShadow: "rgb(42, 42, 42) 0px 0px 5px 0px"
        };
    window.mobile && (i = {
        fontSize: "1em",
        background: "rgba(0,0,0,.3)",
        position: "absolute",
        left: "1em",
        right: "1em",
        bottom: "3em",
        borderRadius: "2px",
        overflow: "auto",
        padding: "1em",
        color: "rgb(159, 218, 0)"
    }, Object(T.a)(i, "fontSize", "0.9em"), Object(T.a)(i, "textShadow", "0 1px 1px #00000082"), Object(T.a)(i, "lineHeight", "1.5em"), Object(T.a)(i, "boxShadow", "0 0 5px 0px #383838"), Object(T.a)(i, "textAlign", "center"), D = i);
    var A, P, R = {
            bg: D,
            button: {fontSize: ".87em", padding: "0 1em", cursor: "pointer"},
            buttonActive: {
                padding: ".1em 1em",
                fontSize: ".87em",
                background: "rgb(251, 0, 0)",
                borderRadius: "1em",
                cursor: "pointer"
            },
            text: {fontSize: ".87em"},
            input: {
                marginLeft: ".5em",
                color: "#fff",
                width: "11em",
                background: "none",
                border: "none",
                borderBottom: "1px solid rgb(159, 218, 0)"
            }
        }, L = z, I = (n(38), n(39), n(40), n(41), n(20)), q = n.n(I), B = n(21), F = n.n(B), V = n(22), W = n.n(V),
        H = n(23), U = n.n(H), X = n(24), K = n.n(X), Q = n(25), J = n.n(Q), Y = n(8), G = n.n(Y), $ = n(9), Z = n(14),
        ee = 0, te = 0, ne = 0, ie = 0, oe = [], ae = [];

    function re(e, t) {
        var n = t / 1048576;
        "p2p" === e ? (te += n, ae.push(n)) : ne += n, oe.push({method: e, size: n, timestamp: performance.now()})
    }

    function se(e, t) {
        ie += t / 1048576
    }

    function ce(e) {
        ee++
    }

    function le(e) {
        ee--
    }

    function ue(e) {
        var t = function () {
            for (var e = 0, t = 0, n = performance.now() - 1e4, i = oe.length; i--;) {
                var o = oe[i];
                if (o.timestamp < n) break;
                "p2p" === o.method ? t += o.size : "http" === o.method && (e += o.size)
            }
            return oe.splice(0, i + 1), {http: (e / 10).toFixed(2), p2p: (t / 10).toFixed(2)}
        }();
        e(ie.toFixed(2), te.toFixed(2), ne.toFixed(2), ee, t.http, t.p2p)
    }

    function de(e) {
        for (var t = 0, n = 0; n < e.length; n++) t += e[n];
        return t
    }

    var me = function (e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
        e.on(window.mpe.core.Events.PieceBytesDownloaded, re), e.on(window.mpe.core.Events.PieceBytesUploaded, se), e.on(window.mpe.core.Events.PeerConnect, ce), e.on(window.mpe.core.Events.PeerClose, le), A && clearInterval(A), t && (A = setInterval((function () {
            ue(t)
        }), 500)), P && clearInterval(P), P = setInterval(Object(f.a)(h.a.mark((function e() {
            var t, n, i;
            return h.a.wrap((function (e) {
                for (; ;) switch (e.prev = e.next) {
                    case 0:
                        if (t = ae.splice(0, ae.length), !((n = de(t) / 1024) > 0)) {
                            e.next = 7;
                            break
                        }
                        return (i = new URLSearchParams).set("t", n), e.next = 7, fetch("/api/r", {
                            method: "POST",
                            body: i
                        });
                    case 7:
                    case"end":
                        return e.stop()
                }
            }), e)
        }))), 3e4)
    };

    function pe() {
        var e = G.a.getJSON("play_history");
        return e || {}
    }

    function he() {
        var e = G.a.getJSON("igh"), t = [], n = Date.now() / 1e3;
        return e && e.t > n - 1200 && (t = e.h), t
    }

    var fe = {
        add: function (e) {
            (e = new URL(e).host).length > 7 && (e = e.substr(0, 7));
            var t = he();
            -1 === t.indexOf(e) && t.push(e), G.a.set("igh", JSON.stringify({t: Date.now(), h: t}))
        }, getAll: he
    }, be = !1, ve = !1, ge = !1, we = -1, ye = -1, ke = -1, Ee = -1, xe = 0, Se = function (e) {
        function t(e) {
            var n;
            Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).errAlert = function () {
                if (-1 === ye) if (n.ClearReloadVideo(), Ee = 1, n.props.title) window.location.reload(); else {
                    var e = "\u64ad\u653e\u9519\u8bef, \u89e3\u51b3\u529e\u6cd5: \n 1.\u5c1d\u8bd5\u5237\u65b0\u9875\u9762 \n 2.\u5c1d\u8bd5\u4f7f\u7528\u624b\u673a\u64ad\u653e \n 3.\u6216\u8005\u60a8\u5148\u89c2\u770b\u5176\u5b83\u5f71\u7247... \n\n\u70b9\u51fb\u786e\u5b9a\u540e\u4f1a\u81ea\u52a8\u4e3a\u60a8\u66f4\u6362\u670d\u52a1\u5668\u5e76\u91cd\u65b0\u52a0\u8f7d\u89c6\u9891";
                    "tibet" === Object($.a)("lang") && (e = "\u0f56\u0f62\u0f99\u0f53\u0f0b\u0f63\u0f0b\u0f42\u0f5f\u0f72\u0f42\u0f66\u0f0b\u0f58\u0f72\u0f0b\u0f50\u0f74\u0f56\u0f0b\u0f5a\u0f7a\u0f0b\u0f50\u0f42\u0f0b\u0f42\u0f45\u0f7c\u0f51\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f50\u0f56\u0f66\u0f0d \n \u0f21 \u0f61\u0f44\u0f0b\u0f56\u0f66\u0f90\u0fb1\u0f62\u0f0b\u0f41\u0f0b\u0f60\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f54\u0f0d \n \u0f22 \u0f41\u0f0b\u0f54\u0f62\u0f0b\u0f56\u0f40\u0f7c\u0f63\u0f0b\u0f53\u0f66\u0f0b\u0f42\u0f4f\u0f7c\u0f44\u0f0b\u0f56\u0f0d \n \u0f23 \u0f61\u0f44\u0f0b\u0f53\u0f0b\u0f42\u0fb3\u0f7c\u0f42\u0f0b\u0f56\u0f62\u0f99\u0f53\u0f0b\u0f42\u0f5e\u0f53\u0f0b\u0f63\u0f0b\u0f56\u0f63\u0f9f\u0f0b\u0f56\u0f0d"), alert(e)
                }
            }, n.playCheck = function (e, t) {
                Ee = -1, n.ClearReloadVideo(), n.reloadVideo(), Object(Z.a)("https://cntv-203.m1907.cn/z1/js/ckplayer.js?t=05", (function () {
                    return n.loadHls((function () {
                        if (-1 !== e.indexOf(".m3u8")) {
                            var i = window.Hls.isSupported(), o = !1;
                            try {
                                o = window.mpe.hlsjs.Engine.isSupported()
                            } catch (u) {
                                o = !1
                            }
                            if (!i) return void (n.video.src = e);
                            "update" === t && n.hls && n.hls.destroy();
                            var a = n.props.vip, r = "\u95ea\u7535\u822c\u52a0\u8f7d\u4e2d...";
                            "tibet" === Object($.a)("lang") && (r = "\u0f45\u0f74\u0f44\u0f0b\u0f59\u0f58\u0f0b\u0f66\u0f92\u0f74\u0f42\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d"), n.showLeftMsg(r, "1.3em", 2e3);
                            var s = {debug: !1, maxBufferLength: 3e5, maxBufferSize: 536870912};
                            if (o) {
                                switch ((new Date).getHours()) {
                                    case 18:
                                        3;
                                        break;
                                    case 19:
                                        5, 5;
                                        break;
                                    case 20:
                                    case 21:
                                    case 22:
                                    case 23:
                                        10, 5
                                }
                                var c = {
                                    segments: {forwardSegmentCount: 15e3},
                                    loader: {
                                        vip: a,
                                        skip: n.props.video_skip,
                                        cachedSegmentExpiration: 864e6,
                                        cachedSegmentsCount: 1e4,
                                        requiredSegmentsPriority: a ? 5e3 : 1,
                                        simultaneousHttpDownloads: a ? (window.mobile, 5) : 1,
                                        simultaneousP2PDownloads: a ? 100 : 3,
                                        httpDownloadMaxPriority: 1e3,
                                        httpDownloadProbability: 0,
                                        httpDownloadProbabilityInterval: 1e3,
                                        httpFailedSegmentTimeout: 5e3,
                                        httpDownloadProbabilitySkipIfNoPeers: !0,
                                        trackerAnnounce: ["wss://cntv-21.m1907.cn/s"],
                                        rtcConfig: {iceServers: [{urls: "stun:numb.viagenie.ca:3478"}, {urls: "stun:stun.12voip.com:3478"}, {urls: "stun:stun.3cx.com:3478"}]}
                                    }
                                }, l = new window.mpe.hlsjs.Engine(c);
                                me(l, (function (e, t, i, o, a, r) {
                                    var s, c, l = n.props.src.split("/")[2], u = Number(t) + Number(i);
                                    xe = Number(a) || Number(r), s = a < 1 ? 1024 * a + "Kb/s" : a + "Mb/s", c = r < 1 ? 1024 * r + "Kb/s" : r + "Mb/s";
                                    var d = Math.round(t / u * 100);
                                    if (isNaN(d) || 0 === d ? d = "..." : d += "%", "1" === Object($.a)("f11") || G.a.get("f11") || (l = "-"), "1" === Object($.a)("f11") || G.a.get("f11")) if (0 === o) {
                                        var m = "\u64ad\u653e\u6e90: ".concat(l, " <br>\u4e0b\u8f7d\u901f\u5ea6(\u6e90):  ").concat(s, "<br> ").concat(n.props.vip ? "VIP\u89c6\u9891\u52a0\u901f\u5df2\u5f00\u542f" : "\u514d\u8d39\u89c6\u9891\u52a0\u901f\u5df2\u5f00\u542f", " ");
                                        n.setState({p2pInfo: m})
                                    } else {
                                        var p = "\u64ad\u653e\u6e90: ".concat(l, " <br>\u4e0b\u8f7d\u901f\u5ea6(\u6e90):  ").concat(s, ", \u52a0\u901f: ").concat(c, "<br> \ud83d\ude80 \u5df2\u52a0\u901f: ").concat(d, ", \u4e0b\u8f7d: ").concat(t, "Mb, ").concat(e, "Mb, \u8282\u70b9\u6570\u91cf: ").concat(o, " ");
                                        n.setState({p2pInfo: p})
                                    } else {
                                        var h = window.mobile ? "".concat(n.props.vip ? "\ud83d\ude80 VIP\u89c6\u9891\u52a0\u901f\u5df2\u5f00\u542f" : "\ud83d\ude80 \u514d\u8d39\u89c6\u9891\u52a0\u901f\u5df2\u5f00\u542f", " ") : "<br> <br> ".concat(n.props.vip ? "\ud83d\ude80 VIP\u89c6\u9891\u52a0\u901f\u5df2\u5f00\u542f" : "\ud83d\ude80 \u514d\u8d39\u89c6\u9891\u52a0\u901f\u5df2\u5f00\u542f", " ");
                                        n.setState({p2pInfo: h})
                                    }
                                })), s.loader = l.createLoaderClass()
                            }
                            n.hls = new window.Hls(s), o && window.mpe.hlsjs.initHlsJsPlayer(n.hls), n.hls.loadSource(e), n.hls.attachMedia(n.video), n.hls.on(window.Hls.Events.MANIFEST_PARSED, (function () {
                                this.video.play()
                            })), n.hls.on(window.Hls.Events.ERROR, (function (t, i) {
                                var o = i.type, a = i.details, r = i.fatal;
                                if ("networkError" !== o || "manifestLoadError" !== a || !0 !== r) {
                                    if (i.fatal) switch (i.type) {
                                        case window.Hls.ErrorTypes.NETWORK_ERROR:
                                            n.hls.startLoad();
                                            break;
                                        case window.Hls.ErrorTypes.MEDIA_ERROR:
                                            n.hls.recoverMediaError();
                                            break;
                                        default:
                                            n.hls.destroy(), n.errAlert()
                                    }
                                } else window.mobile ? (n.hls.destroy(), n.video.src = e) : n.errAlert()
                            }))
                        } else n.video.src = e
                    }))
                }))
            }, n.loadHls = function (e) {
                var t = document.createElement("script");
                t.src = "https://cdn.staticfile.org/hls.js/0.13.2/hls.min.js", t.setAttribute("crossorigin", ""), document.getElementsByTagName("head")[0].appendChild(t), t.onload = function () {
                    return e()
                }
            }, n.loadP2p = function () {
                var e = document.createElement("script");
                e.src = "https://cdn.jsdelivr.net/npm/cdnbye@latest/dist/hlsjs-p2p-engine.min.js", e.setAttribute("crossorigin", ""), document.getElementsByTagName("head")[0].appendChild(e)
            }, n.playClick = function () {
                n.state.play ? (n.video.pause(), n.setState({play: !1})) : (n.video.play(), n.setState({play: !0}), n.props.play && n.props.play())
            }, n.forward_vid = function () {
                isNaN(n.video.duration) ? n.showLeftMsg("\u8fd8\u4e0d\u80fd\u524d\u8fdb\u89c6\u9891\uff0c\u89c6\u9891\u8fd8\u5728\u52a0\u8f7d\u4e2d...", "1.3em", 6e3) : (n.video.currentTime = n.state.currTime + 5, n.setState({
                    curr: n.video.currentTime / n.video.duration,
                    buff: n.video.buffered.end(0) / n.video.duration,
                    currTime: n.video.currentTime
                }), n.showLeftMsg("\u524d\u8fdb5\u79d2 >", "1.3em", 6e3))
            }, n.back_vid = function () {
                isNaN(n.video.duration) ? n.showLeftMsg("\u8fd8\u4e0d\u80fd\u56de\u9000\u89c6\u9891\uff0c\u89c6\u9891\u8fd8\u5728\u52a0\u8f7d\u4e2d...", "1.3em", 6e3) : (n.video.currentTime = n.state.currTime - 5, n.setState({
                    curr: n.video.currentTime / n.video.duration,
                    buff: n.video.buffered.end(0) / n.video.duration,
                    currTime: n.video.currentTime
                }), n.showLeftMsg("\u56de\u90005\u79d2 <", "1.3em", 6e3))
            }, n.setFullScreen = function () {
                n.isFullScreen() ? n.exitFullScreen() : n.onFullScreen()
            }, n.fullScreenChange = function () {
                var e = function () {
                    return n.setState({full: n.isFullScreen()})
                };
                document.onfullscreenchange = function (t) {
                    e()
                }, document.onwebkitfullscreenchange = function (t) {
                    e()
                }, document.onmozfullscreenchange = function (t) {
                    e()
                }, document.onmsfullscreenchange = function (t) {
                    e()
                }
            }, n.isFullScreen = function () {
                return document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || !1
            }, n.onFullScreen = function () {
                var e = document.getElementById("s-video"), t = document.documentElement;
                document.requestFullscreen ? t.requestFullscreen() : document.documentElement.webkitRequestFullScreen ? t.webkitRequestFullScreen() : document.documentElement.msRequestFullscreen ? t.msRequestFullscreen() : document.documentElement.mozRequestFullScreen ? t.mozRequestFullScreen() : e.webkitEnterFullscreen && e.webkitEnterFullscreen(), n.setState({full: !0})
            }, n.exitFullScreen = function () {
                document.documentElement;
                document.ExitFullscreen ? document.ele.ExitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen ? document.msExitFullScreen() : document.mozCancelFullScreen && document.mozCancelFullScreen(), n.setState({full: !1})
            }, n.hideQuality = function () {
                n.setState({showQualityModal: !1})
            }, n.onPip = Object(f.a)(h.a.mark((function e() {
                return h.a.wrap((function (e) {
                    for (; ;) switch (e.prev = e.next) {
                        case 0:
                            return e.prev = 0, e.next = 3, n.video.requestPictureInPicture();
                        case 3:
                            e.next = 8;
                            break;
                        case 5:
                            e.prev = 5, e.t0 = e.catch(0), alert("\u89c6\u9891\u7f13\u51b2\u4e2d\uff0c\u8bf7\u7b49\u5f85\u89c6\u9891\u64ad\u653e\u540e\u518d\u542f\u7528\u753b\u4e2d\u753b\u6a21\u5f0f");
                        case 8:
                        case"end":
                            return e.stop()
                    }
                }), e, null, [[0, 5]])
            }))), n.touchStart = function (e) {
                n.setState({toucheX: e.touches[0].pageX})
            }, n.touchMove = function (e) {
                n.setState({toucheXX: e.touches[0].pageX})
            }, n.touchEnd = function (e) {
                n.state.toucheX && n.state.toucheXX && (n.state.toucheXX - n.state.toucheX > 1 ? n.forward_vid() : n.back_vid()), n.setState({
                    toucheX: 0,
                    toucheXX: 0
                })
            }, n.time = function () {
                var e, t, n = new Date;
                return 1 === (e = n.getHours().toString()).length && (e = "0" + e), 1 === (t = n.getMinutes().toString()).length && (t = "0" + t), e + ":" + t
            };
            var i = G.a.get("speed");
            return i = void 0 == i ? 1 : parseFloat(i), n.state = {
                load: !0,
                play: !1,
                mute: !1,
                volume: .5,
                speed: i,
                full: !1,
                juchang: !1,
                showAbout: !1,
                showControl: !1,
                showControlTime: 0,
                curr: 0,
                buff: 0,
                currTime: 0,
                duration: 0,
                showTip: !1,
                TipLeft: "4em",
                TipType: "title",
                tipTitle: "O(\u2229_\u2229)O~",
                p2pInfo: "",
                supportPip: !!document.pictureInPictureEnabled,
                toucheX: 0,
                toucheXX: 0
            }, n.saveHistoryTime = 0, n.loadVideo = n.loadVideo.bind(Object(v.a)(n)), n.updateCurr = n.updateCurr.bind(Object(v.a)(n)), n.changeCurr = n.changeCurr.bind(Object(v.a)(n)), n.moveCurr = n.moveCurr.bind(Object(v.a)(n)), n.moveOut = n.moveOut.bind(Object(v.a)(n)), n.changeVolume = n.changeVolume.bind(Object(v.a)(n)), n.setTip = n.setTip.bind(Object(v.a)(n)), n.showLeftMsg = n.showLeftMsg.bind(Object(v.a)(n)), n.rightMenu = n.rightMenu.bind(Object(v.a)(n)), n.onWaiting = n.onWaiting.bind(Object(v.a)(n)), n.onPlaying = n.onPlaying.bind(Object(v.a)(n)), n.onEnded = n.onEnded.bind(Object(v.a)(n)), n.onError = n.onError.bind(Object(v.a)(n)), n.setSpeed = n.setSpeed.bind(Object(v.a)(n)), n.playClick = n.playClick.bind(Object(v.a)(n)), n.setShowControl = n.setShowControl.bind(Object(v.a)(n)), n
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "componentDidMount", value: function () {
                this.regKey(), this.setShowControl(), this.fullScreenChange(), this.playCheck(this.props.src, "init")
            }
        }, {
            key: "componentWillReceiveProps", value: function (e) {
                if (e.src != this.props.src) return this.setState({
                    load: !0,
                    play: !1,
                    mute: !1,
                    curr: 0,
                    buff: 0,
                    currTime: 0,
                    duration: 0
                }), this.reset_video_skip(), void this.playCheck(e.src, "update")
            }
        }, {
            key: "reloadvideoMsg", value: function () {
                document.write = '<h3 style="color:#fff"> \u91cd\u65b0\u8f7d\u5165\u89c6\u9891 </h3>'
            }
        }, {
            key: "reloadVideo", value: function () {
                var e = this;
                ye = setTimeout((function () {
                    -1 === Ee && (fe.add(e.props.src), e.video.duration || xe || !e.props.title || window.location.reload())
                }), this.props.vip ? 2e4 : 5e4), ke = setTimeout((function () {
                    e.showLeftMsg("\u6b63\u5728\u91cd\u65b0\u8fde\u63a5\u52a0\u901f\u670d\u52a1\u5668\uff0c\u8bf7\u7a0d\u5019...", "1.3em", 3e3)
                }), this.props.vip ? 1e4 : 36e3)
            }
        }, {
            key: "ClearReloadVideo", value: function () {
                ye && (clearTimeout(ye), ye = -1, clearTimeout(ke), ke = -1)
            }
        }, {
            key: "setVideo", value: function (e) {
                e && (this.video = e, this.video.playbackRate = this.state.speed ? this.state.speed : 1)
            }
        }, {
            key: "loadVideo", value: function () {
                this.setState({duration: this.video.duration})
            }
        }, {
            key: "updateCurr", value: function () {
                var e = this.video.duration,
                    t = this.video.buffered.length ? this.video.buffered.end(this.video.buffered.length - 1) / e : 0,
                    n = this.video.currentTime / e;
                this.skip_remember(), this.props.video_skip && this.video.duration >= 1200 && (this.video.currentTime < 60 && !be ? (this.showLeftMsg(">> \u5df2\u4e3a\u60a8\u8df3\u8fc7\u7247\u5934 ", "1.3em", 6e3), be = !0, n = 60 / e, this.video.currentTime = 60) : e - this.video.currentTime <= 60 && !ve && (this.showLeftMsg(">> \u5df2\u4e3a\u60a8\u8df3\u8fc7\u7247\u5c3e ", "1.3em", 6e3), ve = !0, n = (e - 1) / e, this.onEnded(), this.video.currentTime = e - 1)), this.setState({
                    curr: n,
                    buff: t,
                    currTime: this.video.currentTime,
                    duration: e
                }), this.playHistory()
            }
        }, {
            key: "reset_video_skip", value: function () {
                ve = !1, ge = !1, be = !1, this.hiddenSpeedNotice()
            }
        }, {
            key: "skip_remember", value: function () {
                var e = this.props.title;
                if (!ge && "" !== e) {
                    var t = this.props.ep, n = pe()[e];
                    n && n.ep == t && (this.showLeftMsg(">> \u5df2\u4ece\u60a8\u4e0a\u6b21\u89c2\u770b\u7684\u4f4d\u7f6e\u7ee7\u7eed\u64ad\u653e", "1.3em", 6e3), be = !0, this.video.currentTime = n.t), ge = !0
                }
            }
        }, {
            key: "playHistory", value: function () {
                var e = Date.now() / 1e3;
                if (!(e - this.saveHistoryTime < 5)) {
                    var t = this.props.ep;
                    !function (e, t, n) {
                        var i = G.a.getJSON("play_history");
                        if (i || (i = {}), !(i[e] && i[e].ep > t)) {
                            var o = Date.now();
                            i[e] = {ep: t, time: o, t: n};
                            !function () {
                                if (!(Object.keys(i).length < 10)) {
                                    var e = {key: "", time: o};
                                    for (var t in i) if (i.hasOwnProperty(t)) {
                                        var n = i[t];
                                        e.time > n.time && (e = {key: t, time: n.time})
                                    }
                                    delete i[e.key]
                                }
                            }(), G.a.set("play_history", JSON.stringify(i), {
                                expires: 100,
                                sameSite: "None",
                                secure: !0
                            })
                        }
                    }(this.props.title, t, this.video.currentTime), this.saveHistoryTime = e
                }
            }
        }, {
            key: "formatTime", value: function (e) {
                var t, n, i;
                isNaN(e) && (e = 0);
                return t = parseInt(e / 60 / 60), n = parseInt(e / 60 % 60), i = parseInt(e % 60), i = "0".concat(i).slice(-2), t ? t += ":" : t = "", "".concat(t).concat(n, ":").concat(i)
            }
        }, {
            key: "changeCurr", value: function (e) {
                if (!this.video.currentTime) return null;
                var t = e * this.video.duration;
                this.video.currentTime = t, this.setState({curr: e, currTime: this.video.currentTime})
            }
        }, {
            key: "changeVolume", value: function (e) {
                e <= 0 ? (e = 0, this.video.volume = e, this.setState({mute: !0})) : (this.video.volume = e, this.setState({
                    volume: e,
                    mute: !1
                }))
            }
        }, {
            key: "setSpeed", value: function (e) {
                this.video.playbackRate = e, this.setState({speed: e}), G.a.set("speed", e)
            }
        }, {
            key: "moveCurr", value: function (e, t) {
                var n = "\u95ea\u7535\u822c\u52a0\u8f7d\u4e2d...";
                isNaN(this.video.duration) || (n = this.formatTime(e * this.video.duration)), this.setTip(!0, "time", t.clientX, n)
            }
        }, {
            key: "moveOut", value: function () {
                this.setTip(!1)
            }
        }, {
            key: "setTip", value: function () {
                var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                    t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "title",
                    n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "4em",
                    i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
                e ? this.setState({
                    showTip: e,
                    tipType: t,
                    TipLeft: n,
                    tipTitle: i
                }) : this.setState({showTip: !1}), this.setShowControl()
            }
        }, {
            key: "showLeftMsg", value: function (e) {
                var t = this, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "1.6em",
                    i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 2e3;
                this.state.showControl || this.setShowControl(), this.setTip(!0, "title", n, e), setTimeout((function () {
                    t.setTip(!1)
                }), i)
            }
        }, {
            key: "setShowControl", value: function () {
                var e = this;
                this.setState({showControl: !0}), this.showControlTime && clearTimeout(this.showControlTime), this.showControlTime = setTimeout((function () {
                    e.setState({showControl: !1})
                }), window.mobile ? 6e3 : 2e3)
            }
        }, {
            key: "rightMenu", value: function (e) {
                this.state.showAbout ? this.setState({showAbout: !1}) : this.setState({showAbout: !0})
            }
        }, {
            key: "intit", value: function () {
                this.setState({play: !1, curr: 0, currentTime: 0, buff: 0}), this.video.currentTime = 0
            }
        }, {
            key: "clearShowSpeedTimeout", value: function () {
                we && clearTimeout(we)
            }
        }, {
            key: "showSpeedupNotice", value: function () {
                var e = this;
                if (this.clearShowSpeedTimeout(), !this.props.vip && this.props.title) {
                    var t = 2e3;
                    (this.video.currentTime < 3 || 60 === this.video.currentTime) && (t = 3e3), we = setTimeout((function () {
                        e.props.showSpeedupNotice(!0)
                    }), t)
                }
            }
        }, {
            key: "hiddenSpeedNotice", value: function () {
                this.props.vip || (this.clearShowSpeedTimeout(), this.props.showSpeedupNotice(!1))
            }
        }, {
            key: "onWaiting", value: function () {
                document.getElementsByClassName("l")[0].classList.remove("hide"), this.showSpeedupNotice(), this.setState({load: !0})
            }
        }, {
            key: "onPlaying", value: function () {
                document.getElementsByClassName("l")[0].classList.add("hide"), this.hiddenSpeedNotice(), this.setState({load: !1})
            }
        }, {
            key: "onEnded", value: function () {
                this.intit(), this.showLeftMsg("\u64ad\u653e\u5b8c\u6bd5", "1.3em", 1e4), this.props.playEnd && this.props.playEnd()
            }
        }, {
            key: "onError", value: function (e) {
                "" != this.video.src && void 0 != this.videoEle && (this.showLeftMsg("\u89c6\u9891\u64ad\u653e\u51fa\u9519\uff0c\u65e0\u6cd5\u7ee7\u7eed\u64ad\u653e\uff0c\u8bf7\u5c1d\u8bd5\u5237\u65b0\u9875\u9762", "1.3em", 2e4), alert("\u89c6\u9891\u64ad\u653e\u51fa\u9519\uff0c\u8bf7\u5c1d\u8bd5\u5237\u65b0\u9875\u9762\u6216\u66f4\u6362\u6d4f\u89c8\u5668\u8bbf\u95ee"))
            }
        }, {
            key: "regKey", value: function (e) {
                var t = this;
                document.onkeydown = function (e) {
                    if ("text" === (e.srcElement || e.target).type) return !0;
                    switch (e.keyCode || e.which) {
                        case 32:
                            t.state.play ? t.video.pause() : t.video.play(), t.setState({play: !t.state.play});
                            break;
                        case 38:
                            var n = t.state.volume += .05;
                            n > 1 && (n = 1), t.video.volume = n, t.setState({volume: n});
                            break;
                        case 40:
                            var i = t.state.volume -= .05;
                            i < 0 && (i = 0), t.video.volume = i, t.setState({volume: i});
                            break;
                        case 13:
                            t.setFullScreen();
                            break;
                        case 37:
                            t.back_vid();
                            break;
                        case 39:
                            t.forward_vid()
                    }
                }
            }
        }, {
            key: "nativeVideo", value: function () {
                var e = this;
                return a.a.createElement("div", {
                    id: "s-player",
                    style: this.state.juchang ? {position: "absolute", left: 0, top: 0, right: 0, bottom: 0} : {},
                    onContextMenu: this.rightMenu
                }, a.a.createElement("video", {
                    controls: !0,
                    ref: function (t) {
                        return e.setVideo(t)
                    },
                    style: {position: "absolute", width: "100%", height: "100%"},
                    playsInline: "true",
                    "webkit-playsinline": "true",
                    "x-webkit-airplay": "true",
                    "x5-playsinline": "true"
                }), this.state.play ? null : a.a.createElement(C, {
                    onClick: this.playClick,
                    onTouchend: this.playClick
                }), this.state.showAbout ? a.a.createElement(L, {
                    speed: this.state.speed,
                    setSpeed: this.setSpeed,
                    video_skip: this.props.video_skip,
                    p2pInfo: this.state.p2pInfo,
                    close: this.rightMenu,
                    src: this.props.src
                }) : null)
            }
        }, {
            key: "render", value: function () {
                var e = this;
                return "tibet" === Object($.a)("lang") && /MicroMessenger/i.test(navigator.userAgent) ? this.nativeVideo() : "1" === Object($.a)("fs") && /Android/i.test(navigator.userAgent) ? this.nativeVideo() : a.a.createElement("div", {
                    id: "s-player",
                    style: this.state.juchang ? {position: "absolute", left: 0, top: 0, right: 0, bottom: 0} : {},
                    onContextMenu: this.rightMenu
                }, a.a.createElement("div", {
                    style: {cursor: "pointer", zIndex: "1", width: "100%", height: "100%"},
                    onClick: this.playClick,
                    onDoubleClick: this.setFullScreen,
                    onMouseMove: this.setShowControl,
                    onTouchStart: this.touchStart,
                    onTouchMove: this.touchMove,
                    onTouchEnd: this.touchEnd
                }, a.a.createElement("video", {
                    id: "s-video",
                    ref: function (t) {
                        return e.setVideo(t)
                    },
                    onContextMenu: function (e) {
                        return e.preventDefault()
                    },
                    autoPlay: !window.mobile,
                    controls: (window.mobile, !1),
                    preload: "auto",
                    "x-webkit-airplay": "true",
                    poster: "data:image/ico;base64,aWNv",
                    onLoadedMetadata: this.loadVideo,
                    onCanPlay: this.loadVideo,
                    onTimeUpdate: this.updateCurr,
                    onEnded: this.onEnded,
                    onError: this.onError,
                    onWaiting: this.onWaiting,
                    onPlaying: this.onPlaying,
                    onPlay: function () {
                        e.setState({play: !0})
                    },
                    onPaste: function () {
                        e.setState({play: !1})
                    }
                }, "\u60a8\u7684\u6d4f\u89c8\u5668\u7248\u672c\u4e0d\u652f\u6301\uff0c\u65e0\u6cd5\u64ad\u653e\u89c6\u9891\uff01", a.a.createElement("br", null), "\u8bf7\u4f7f\u7528chrome \u706b\u72d0 opera \u7b49\u6d4f\u89c8\u5668\u8bbf\u95ee\u672c\u9875\u9762\u5373\u53ef\u64ad\u653e\u5f53\u524d\u89c6\u9891!!")), this.state.play ? null : a.a.createElement(C, {
                    onClick: this.playClick,
                    onTouchend: this.playClick
                }), a.a.createElement("div", {
                    className: this.state.showControl ? "show" : "hide",
                    style: {position: "absolute", top: "1em", left: "1em", color: "rgba(255,255,255,.7)"}
                }, "tibet" !== Object($.a)("lang") ? this.props.title : ""), a.a.createElement("div", {
                    className: this.state.showControl ? "show" : "hide",
                    style: {position: "absolute", top: "1em", right: "1em", color: "rgba(255,255,255,.5)"}
                }, this.time()), this.renderControls(), this.state.showAbout ? a.a.createElement(L, {
                    speed: this.state.speed,
                    setSpeed: this.setSpeed,
                    video_skip: this.props.video_skip,
                    p2pInfo: this.state.p2pInfo,
                    close: this.rightMenu,
                    src: this.props.src
                }) : null)
            }
        }, {
            key: "renderControls", value: function () {
                var e = this;
                return a.a.createElement("div", {
                    id: "s-controls",
                    className: this.state.showControl ? "show" : "hide"
                }, a.a.createElement("div", {
                    style: {
                        fontSize: "1.1em",
                        marginLeft: "1em",
                        fontFamily: "monospace"
                    }
                }, a.a.createElement("span", null, this.formatTime(this.state.currTime)), a.a.createElement("span", {style: {padding: "0 .2em"}}, "/"), a.a.createElement("span", null, this.state.duration && !isNaN(this.state.duration) ? this.formatTime(this.state.duration) : "-")), a.a.createElement(y, {
                    curr: this.state.curr,
                    buff: this.state.buff,
                    moveCurr: this.moveCurr,
                    moveOut: this.moveOut,
                    changeCurr: this.changeCurr,
                    load: this.state.load
                }), a.a.createElement("span", {
                    style: {
                        marginLeft: window.mobile ? "0" : ".7em",
                        marginRight: window.mobile ? ".5em" : "0",
                        fontSize: ".9em",
                        cursor: "pointer",
                        color: "#dce9ff",
                        textShadow: "1px 1px 1px #b9b9b9"
                    }, onClick: this.rightMenu, onMouseMove: function (t) {
                        return e.setTip(!0, "tip", t.clientX, "\u64ad\u653e\u8bbe\u7f6e")
                    }, onMouseOut: function () {
                        return e.moveOut()
                    }
                }, a.a.createElement("img", {
                    style: je.svgSetting,
                    src: J.a
                })), !window.mobile && this.state.supportPip ? a.a.createElement("span", {
                    style: {
                        marginLeft: ".9em",
                        fontSize: ".9em",
                        cursor: "pointer",
                        color: "#dce9ff",
                        textShadow: "1px 1px 1px #b9b9b9"
                    }, onClick: this.onPip, onMouseMove: function (t) {
                        return e.setTip(!0, "tip", t.clientX, "\u753b\u4e2d\u753b")
                    }, onMouseOut: function () {
                        return e.moveOut()
                    }
                }, a.a.createElement("img", {
                    style: je.svgPip,
                    src: K.a
                })) : null, this.props.children, window.mobile ? null : this.renderVolume(), a.a.createElement("span", {
                    style: {
                        marginLeft: "0.5em",
                        marginRight: "1.5em"
                    }
                }, a.a.createElement("img", {
                    style: je.svg, src: this.state.full ? F.a : q.a, onClick: function () {
                        return e.setFullScreen()
                    }
                })), this.renderTip())
            }
        }, {
            key: "renderVolume", value: function () {
                var e = this;
                return a.a.createElement("div", {
                    style: {
                        marginLeft: "1em",
                        whiteSpace: "nowrap"
                    }
                }, a.a.createElement("img", {
                    style: je.svgYtb,
                    src: this.state.mute ? U.a : W.a,
                    onMouseMove: function (t) {
                        return e.setTip(!0, "tip", t.clientX, e.state.mute ? "\u53d6\u6d88\u9759\u97f3" : "\u9759\u97f3")
                    },
                    onMouseOut: function () {
                        return e.moveOut()
                    },
                    onClick: function () {
                        return e.changeVolume(e.state.mute ? e.state.volume > .05 ? e.state.volume : .5 : 0)
                    }
                }), a.a.createElement(x, {curr: this.state.volume, change: this.changeVolume}))
            }
        }, {
            key: "renderTip", value: function () {
                return this.state.showTip ? "time" === this.state.tipType || "tip" === this.state.tipType ? a.a.createElement("span", {style: Object(b.a)({}, je.tip, {left: this.state.TipLeft})}, this.state.tipTitle, "time" === this.state.tipType ? a.a.createElement("div", {style: je.tipArrowDown}) : null) : a.a.createElement("span", {
                    style: Object(b.a)({}, je.tip, {
                        left: this.state.TipLeft,
                        bottom: "3.2em",
                        transform: "none"
                    })
                }, this.state.tipTitle) : null
            }
        }]), t
    }(o.Component), je = {
        duration: {fontSize: "0.8em", margin: "0 .2em"},
        tip: {
            background: "rgba(255,255,255,.23)",
            color: "#fff",
            padding: "0.2em .6em",
            borderRadius: ".3em",
            fontSize: ".7em",
            position: "absolute",
            bottom: "2.3em",
            transform: "translate(-50%,-50%)"
        },
        tipArrowDown: {
            width: 0,
            height: 0,
            borderColor: "transparent",
            borderStyle: "solid",
            borderWidth: ".3em .3em 0",
            borderTopColor: "rgba(255,255,255,.23)",
            position: "absolute",
            left: "50%",
            marginLeft: "-.3em",
            bottom: "-.3em"
        },
        svgYtb: {width: "2.6em", height: "2.6em", position: "relative", bottom: "-.2em", cursor: "pointer"},
        svg: {width: "1.5em", height: "1.5em", position: "relative", bottom: "-.2em", cursor: "pointer"},
        svgPip: {width: "1.3em", height: "1.3em", position: "relative", bottom: "-.2em", cursor: "pointer"},
        svgSetting: {width: "1.3em", height: "1.3em", position: "relative", bottom: "-.2em", cursor: "pointer"},
        speed: {fontSize: ".8em", marginLeft: ".7em", cursor: "pointer"},
        speenActive: {borderBottom: "1px dashed #fff"}
    }, Oe = Se, _e = function (e) {
        function t() {
            return Object(c.a)(this, t), Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "render", value: function () {
                return a.a.createElement("div", {
                    style: {
                        flex: 1,
                        marginLeft: ".5em"
                    }
                }, a.a.createElement("div", {
                    style: {
                        marginLeft: "-.5em",
                        marginBottom: ".2em"
                    }
                }, "\u7535\u89c6:"), this.props.new_videos.map(this.render_videos))
            }
        }, {
            key: "render_videos", value: function (e, t) {
                return a.a.createElement("div", {
                    key: t,
                    style: {cursor: "pointer", marginBottom: ".1em"}
                }, a.a.createElement("a", {
                    href: "/?jx=" + e.name, onClick: function (t) {
                        t.preventDefault(), window.jiexi(e.name)
                    }
                }, e.name))
            }
        }]), t
    }(o.Component), Ce = function (e) {
        function t() {
            return Object(c.a)(this, t), Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "render", value: function () {
                return a.a.createElement("div", {
                    style: {
                        flex: 1,
                        marginLeft: ".5em",
                        marginRight: ".5em"
                    }
                }, a.a.createElement("div", {
                    style: {
                        marginLeft: "-.5em",
                        marginBottom: ".2em"
                    }
                }, "\u5927\u5bb6\u6b63\u5728\u770b:"), this.props.hot_videos.map(this.render_videos))
            }
        }, {
            key: "render_videos", value: function (e, t) {
                return a.a.createElement("div", {
                    key: t,
                    style: {cursor: "pointer", marginBottom: ".1em"}
                }, a.a.createElement("a", {
                    href: "/?jx=" + e.name, onClick: function (t) {
                        t.preventDefault(), window.jiexi(e.name)
                    }
                }, e.name))
            }
        }]), t
    }(o.Component);
    var Te = {
        line: {height: "1px", background: "rgb(74, 74, 74)", margin: ".5em auto"},
        titlle: {color: "rgb(255, 169, 169)", fontSize: "1em", margin: ".5em 0"},
        content: {fontSize: "1em", margin: ".3em 0", color: "#e4e4e4", textIndent: "1em"},
        about: {fontSize: ".789em", color: "rgb(255, 194, 194)"}
    }, Me = function () {
        return a.a.createElement(a.a.Fragment, null, a.a.createElement("p", {style: Te.titlle}, "\u5f00\u901aVIP\u7248\u89c6\u9891\u52a0\u901f\u670d\u52a1"), a.a.createElement("div", {style: Te.line}), a.a.createElement("p", {style: Object(b.a)({}, Te.content, {textIndent: 0})}, "\u5f00\u901a\u6b65\u9aa4\uff1a"), a.a.createElement("p", {style: Te.content}, "1.\u70b9\u51fb\u5f00\u901a\u6309\u94ae\uff0c\u9009\u62e9\u8981\u8d2d\u4e70\u7684\u5929\u6570\uff0c\u8bbe\u7f6e\u60a8\u7684\u52a0\u901f\u8d26\u53f7"), a.a.createElement("p", {style: Te.content}, "2.\u8d2d\u4e70\u6210\u529f\u540e\uff0c\u70b9\u51fb\u6fc0\u6d3b\u52a0\u901f\u6309\u94ae\uff0c\u8f93\u5165\u60a8\u7684\u52a0\u901f\u8d26\u53f7\uff0c\u518d\u5237\u65b0\u5f53\u524d\u7684\u64ad\u653e\u9875\u9762\u5373\u53ef\u4f7f\u7528\u52a0\u901f\u670d\u52a1\uff01"))
    }, Ne = n(16);

    function ze(e) {
        var t = Object(o.useState)(!0), n = Object(Ne.a)(t, 2), i = n[0], r = n[1];
        return i ? a.a.createElement("div", {
            style: Re.bg,
            id: "msg"
        }, e.content, a.a.createElement("button", {
            style: Re.button,
            onClick: e.onClick
        }, e.confirmTitle), a.a.createElement("button", {
            style: Re.button, onClick: function () {
                return window.location.reload()
            }
        }, "\u5237\u65b0"), a.a.createElement("button", {
            style: Re.button, onClick: function () {
                r(!1)
            }
        }, "\u5173\u95ed")) : null
    }

    var De = function (e) {
        function t() {
            return Object(c.a)(this, t), Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "render", value: function () {
                return a.a.createElement(ze, this.props)
            }
        }]), t
    }(o.Component);
    De.show = function (e, t, n) {
        var i = document.getElementById("message-container");
        i || ((i = document.createElement("div")).id = "message-container", document.body.appendChild(i));
        var o = s.a.createPortal(a.a.createElement(De, {content: e, confirmTitle: t, onClick: n}), i, +new Date);
        s.a.render(o, i)
    };
    var Ae = De, Pe = {
        background: "linear-gradient( rgb(82, 24, 24), rgb(73, 23, 76) )",
        position: "absolute",
        left: "50%",
        top: "2em",
        padding: "1em",
        transform: "translate(-50%, 0%)",
        width: "30em",
        opacity: ".9",
        borderRadius: "2px",
        color: "rgb(129, 255, 35)",
        boxShadow: "0 0 5px #000"
    };
    window.mobile && (Pe.top = "1em", Pe.left = "1em", Pe.right = "1em", Pe.transform = "none", Pe.width = "none", Pe.opacity = 1);
    var Re = {
        bg: Pe,
        titlle: {fontSize: ".9em", margin: ".5em 0"},
        content: {color: "#e4e4e4", fontSize: ".8em", margin: ".2em 0"},
        about: {fontSize: ".789em", color: "rgb(255, 194, 194)"},
        button: {
            marginLeft: ".5em",
            marginTop: ".7em",
            padding: ".1em 1.9em",
            background: "#272727",
            color: "#e4e4e4",
            border: "1px solid",
            borderColor: "#6b6d00",
            float: "right"
        },
        line: {height: "1px", background: "rgb(74, 74, 74)", margin: ".5em auto"}
    };

    function Le(e) {
        var t = "https://z1.m1907.cn/jiasu/index.html";
        if (window.mobile) Be("link", t, "bq1f3pg6kkms2ue2jnag", "http://jiasu.m1907.cn"); else {
            t = "https://z1.m1907.cn/jiasu/index.html";
            Ae.show(a.a.createElement(Me, null), "\u5f00\u901a/\u6fc0\u6d3bVIP\u7248\u52a0\u901f", (function () {
                window.open(t)
            }))
        }
    }

    var Ie, qe, Be = function () {
        var e = Object(f.a)(h.a.mark((function e(t, n, i) {
            var o, a, r, s = arguments;
            return h.a.wrap((function (e) {
                for (; ;) switch (e.prev = e.next) {
                    case 0:
                        return o = s.length > 3 && void 0 !== s[3] ? s[3] : "", e.prev = 1, (a = new URLSearchParams).set("id", i), e.next = 6, fetch("/api/tui/click", {
                            method: "POST",
                            body: a
                        });
                    case 6:
                        e.next = 11;
                        break;
                    case 8:
                        e.prev = 8, e.t0 = e.catch(1), console.log(e.t0);
                    case 11:
                        e.t1 = t, e.next = "link" === e.t1 ? 14 : "text" === e.t1 ? 18 : 20;
                        break;
                    case 14:
                        return r = document.referrer, window.parent === window && (r = window.parent.location.href), window.mobile ? window.open("https://t0ay8.m1907.cn?back=".concat(window.btoa(r), "&link=").concat(window.btoa(n), "&title=").concat(o), "_parent") : window.open(n), e.abrupt("break", 21);
                    case 18:
                        return alert(n), e.abrupt("break", 21);
                    case 20:
                        return e.abrupt("break", 21);
                    case 21:
                    case"end":
                        return e.stop()
                }
            }), e, null, [[1, 8]])
        })));
        return function (t, n, i) {
            return e.apply(this, arguments)
        }
    }(), Fe = function (e) {
        function t() {
            return Object(c.a)(this, t), Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "render", value: function () {
                var e = function () {
                    var e = G.a.getJSON("play_history"), t = [], n = [];
                    for (var i in e) e.hasOwnProperty(i) && n.push({name: i, time: e[i].time});
                    for (var o in n.sort((function (e, t) {
                        return t.time - e.time
                    })), n) {
                        var a = n[o].name;
                        t.push(a)
                    }
                    return t
                }().slice(0, 3);
                return a.a.createElement(a.a.Fragment, null, a.a.createElement("div", {style: Ve.box}, e.map(this.renderHistory)))
            }
        }, {
            key: "renderHistory", value: function (e, t) {
                return a.a.createElement("div", {key: e, style: Ve.text}, a.a.createElement("a", {
                    href: "/?jx=" + e,
                    onClick: function (t) {
                        t.preventDefault(), window.jiexi(e)
                    }
                }, e))
            }
        }]), t
    }(o.Component), Ve = {
        box: {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "15em",
            margin: "auto",
            marginTop: "1em"
        }, text: {marginLeft: ".5em", marginTop: ".5em", textAlign: "center", borderRadius: ".2em", cursor: "pointer"}
    }, We = Fe, He = function (e) {
        function t(e) {
            var n;
            return Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).onChange = function (e) {
                n.setState({searchText: e.target.value}), /Android/i.test(navigator.userAgent) && n.onCompositionEnd(e)
            }, n.onCompositionEnd = function (e) {
                var t = e.target.value;
                n.searchPrompt(t)
            }, n.searchPrompt = function () {
                var e = Object(f.a)(h.a.mark((function e(t) {
                    var i, o;
                    return h.a.wrap((function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                if (!(t.length >= 2)) {
                                    e.next = 16;
                                    break
                                }
                                return e.prev = 1, void 0 !== Ie && Ie.abort(), "AbortController" in window && (Ie = new window.AbortController, qe = Ie.signal), e.next = 6, fetch("/api/search_prompt?k=" + t, {signal: qe});
                            case 6:
                                return i = e.sent, e.next = 9, i.json();
                            case 9:
                                o = e.sent, n.setState({searchPromptData: o}), e.next = 16;
                                break;
                            case 13:
                                e.prev = 13, e.t0 = e.catch(1), console.log(e.t0);
                            case 16:
                            case"end":
                                return e.stop()
                        }
                    }), e, null, [[1, 13]])
                })));
                return function (t) {
                    return e.apply(this, arguments)
                }
            }(), n.renderSearch = function () {
                var e = window.mobile ? "2em" : "4em";
                return a.a.createElement(a.a.Fragment, null, a.a.createElement("div", {
                    style: {
                        textAlign: "center",
                        marginTop: e,
                        display: "flex",
                        justifyContent: "center",
                        fontSize: ".789em"
                    }
                }, a.a.createElement("input", {
                    type: "text",
                    placeholder: "\u60a8\u53ef\u4ee5\u5c1d\u8bd5\u641c\u7d22\u7247\u540d",
                    autoFocus: "autofocus",
                    onChange: n.onChange,
                    onCompositionEnd: n.onCompositionEnd,
                    onKeyDown: function (e) {
                        return 13 === e.keyCode ? n.props.jiexi(n.state.searchText) : null
                    },
                    style: {
                        height: "2.3em",
                        width: "15em",
                        border: "1px solid #ea7070",
                        paddingLeft: ".5em",
                        verticalAlign: "middle",
                        borderRadius: 0,
                        borderTopLeftRadius: ".3em",
                        borderBottomLeftRadius: ".3em",
                        background: "linear-gradient(90deg, rgb(228, 123, 73) 0%, rgb(228, 123, 73) 100%)",
                        outline: "none",
                        fontSize: "100%",
                        boxShadow: "1px 1px 1px #00000080",
                        color: "#fff"
                    }
                }), a.a.createElement("button", {
                    style: {
                        background: "linear-gradient(90deg, #E47B49 0%, #ea4c89 100%)",
                        height: "2.3em",
                        width: "7em",
                        border: "none",
                        verticalAlign: "middle",
                        borderTopRightRadius: ".3em",
                        borderBottomRightRadius: ".3em",
                        color: "rgb(113, 255, 42)",
                        outline: "none",
                        fontSize: "100%",
                        boxShadow: "1px 1px 1px #0009",
                        borderLeft: "1px solid rgb(183, 162, 202)"
                    }, onClick: function () {
                        return n.props.jiexi(n.state.searchText)
                    }
                }, "\u641c\u7d22")), n.state.searchPromptData ? n.renderSearchPrompt() : null)
            }, n.renderSearchPrompt = function () {
                return a.a.createElement("div", {style: Xe.searchPrompt}, n.state.searchPromptData.map(n.renderSearchPromptItem))
            }, n.renderSearchPromptItem = function (e, t) {
                return a.a.createElement("div", {
                    key: t, style: Xe.searchPromptItem, onClick: function () {
                        return window.jiexi(e.name)
                    }
                }, e.name)
            }, n.state = {
                searchText: "",
                searchPromptData: null,
                searchPosition: "bottom"
            }, n.menuEle = a.a.createRef(), n
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "componentDidMount", value: function () {
                this.menuEle.current.clientHeight < 300 && window.mobile && this.setState({searchPosition: "top"})
            }
        }, {
            key: "render", value: function () {
                return a.a.createElement("div", {
                    className: "show",
                    style: Xe.bg,
                    ref: this.menuEle
                }, Object($.a)("jx") ? a.a.createElement("p", {style: {textAlign: "center"}}, "\u50bb\u50bb\u7684\u673a\u5668\u4eba\u6ca1\u6709\u627e\u5230\u5f71\u7247 ", a.a.createElement("br", null), "\u60a8\u53ef\u4ee5\u5728\u4e0b\u65b9\u5c1d\u8bd5\u624b\u52a8\u641c\u7d22") : a.a.createElement("p", {style: {marginTop: "1em"}}), "top" === this.state.searchPosition ? this.renderSearch() : null, a.a.createElement("div", {style: Object(b.a)({}, Xe.list, {marginTop: window.mobile ? "2em" : 0})}, a.a.createElement(Ce, {hot_videos: this.props.hot_videos}), a.a.createElement(_e, {new_videos: this.props.new_videos})), "bottom" === this.state.searchPosition ? this.renderSearch() : null, a.a.createElement(We, null))
            }
        }]), t
    }(o.Component), Ue = {
        background: "linear-gradient(red, #1d1d33)",
        position: "absolute",
        top: "5em",
        right: "5em",
        bottom: "5em",
        borderRadius: "2px",
        overflow: "auto",
        padding: "1em",
        color: "rgb(159, 218, 0)",
        textShadow: "0 1px 1px #00000082"
    };
    window.mobile && (Ue = {
        background: "linear-gradient(red, #1d1d33)",
        position: "absolute",
        top: "1em",
        left: "1em",
        right: "1em",
        bottom: "1em",
        borderRadius: "2px",
        overflow: "auto",
        padding: "1em",
        color: "rgb(159, 218, 0)",
        textShadow: "0 1px 1px #00000082",
        paddingBottom: "5em"
    });
    var Xe = {
        bg: Ue,
        list: {display: "flex", justifyContent: "space-around"},
        searchPrompt: {
            margin: "0 auto",
            width: "21.95em",
            marginTop: "-.2em",
            background: "rgba(255,255,255,.2)",
            padding: ".789em",
            borderRadius: ".1em",
            boxSizing: "border-box",
            fontSize: ".789em"
        },
        searchPromptItem: {textAlign: "left", marginBottom: ".3em", cursor: "pointer", fontSize: "1.3em"}
    }, Ke = He, Qe = n(26), Je = n.n(Qe);
    var Ye = {
        line: {height: "1px", background: "rgb(74, 74, 74)", margin: ".5em auto"},
        titlle: {color: "rgb(255, 169, 169)", fontSize: ".9em", margin: ".5em 0"},
        content: {fontSize: ".8em", margin: ".3em 0", color: "#e4e4e4"},
        about: {fontSize: ".789em", color: "rgb(255, 194, 194)"}
    }, Ge = function () {
        return a.a.createElement(a.a.Fragment, null, a.a.createElement("p", {style: Ye.titlle}, "\u4e0b\u8f7d\u89c6\u9891"), a.a.createElement("div", {style: Ye.line}), a.a.createElement("p", {style: Ye.content}, "\u70b9\u51fb\u64ad\u653e\u754c\u9762\uff0c\u82e5\u5f53\u524d\u6d4f\u89c8\u5668\u5668\u652f\u6301\u4e0b\u8f7d\u6216\u7f13\u5b58\u5c31\u4f1a\u6709\u76f8\u5e94\u7684\u529f\u80fd\u6309\u94ae\uff01"), a.a.createElement("p", {style: Ye.content}, "\u82e5\u4e0d\u652f\u6301\u53ef\u4ee5\u5c1d\u8bd5\u5207\u6362\u6d4f\u89c8\u5668\u8bbf\u95ee"))
    };

    function $e(e) {
        var t = function () {
                d(!1)
            }, n = Object(o.useState)(50), i = Object(Ne.a)(n, 2), r = i[0], s = i[1], c = Object(o.useState)(!0),
            l = Object(Ne.a)(c, 2), u = l[0], d = l[1];
        return Object(o.useEffect)((function () {
            var e = setInterval((function () {
                1 === r ? (clearInterval(e), t()) : s(r - 1)
            }), 1e3);
            return function () {
                clearInterval(e)
            }
        }), [r]), u ? a.a.createElement("div", {
            style: nt.bg,
            id: "msg"
        }, e.content, a.a.createElement("button", {style: nt.button, onClick: t}, "\u786e\u5b9a(", r, ")")) : null
    }

    var Ze = function (e) {
        function t() {
            return Object(c.a)(this, t), Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "render", value: function () {
                return a.a.createElement($e, this.props)
            }
        }]), t
    }(o.Component);
    Ze.show = function (e) {
        var t = document.getElementById("message-container");
        t || ((t = document.createElement("div")).id = "message-container", document.body.appendChild(t));
        var n = s.a.createPortal(a.a.createElement(Ze, {content: e}), t, +new Date);
        s.a.render(n, t)
    };
    var et = Ze, tt = {
        background: "linear-gradient( rgb(82, 24, 24), rgb(73, 23, 76) )",
        position: "absolute",
        left: "50%",
        top: "2em",
        padding: "1em",
        transform: "translate(-50%, 0%)",
        width: "30em",
        opacity: ".9",
        borderRadius: "2px",
        color: "rgb(129, 255, 35)",
        boxShadow: "0 0 5px #000"
    };
    window.mobile && (tt.top = "1em", tt.left = "1em", tt.right = "1em", tt.transform = "none", tt.width = "none", tt.opacity = 1);
    var nt = {
        bg: tt,
        titlle: {fontSize: ".9em", margin: ".5em 0"},
        content: {color: "#e4e4e4", fontSize: ".8em", margin: ".2em 0"},
        about: {fontSize: ".789em", color: "rgb(255, 194, 194)"},
        button: {
            marginTop: ".7em",
            padding: ".1em 1.9em",
            background: "#272727",
            color: "#e4e4e4",
            border: "1px solid",
            borderColor: "#6b6d00",
            float: "right"
        },
        line: {height: "1px", background: "rgb(74, 74, 74)", margin: ".5em auto"}
    }, it = function (e) {
        function t(e) {
            var n;
            return Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).close = function () {
                window.close_switch()
            }, n.move = function () {
                window.set_auto_close_switch()
            }, n.buyVip = function () {
                Le(n.props.vip)
            }, n.state = {
                videos: n.props.videos,
                video: n.props.video,
                closeText: 15
            }, n.render_videos = n.render_videos.bind(Object(v.a)(n)), n.render_qualitys = n.render_qualitys.bind(Object(v.a)(n)), n
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "componentDidMount", value: function () {
                var e = this;
                if (!window.mobile) var t = setInterval((function () {
                    1 === e.state.closeText ? clearInterval(t) : e.setState({closeText: e.state.closeText - 1})
                }), 1e3)
            }
        }, {
            key: "render", value: function () {
                var e = this;
                return a.a.createElement("div", {
                    style: {flex: 1, marginLeft: "1em", marginBottom: "2em"},
                    onMouseMove: this.move
                }, a.a.createElement("div", {
                    style: ot.close,
                    onClick: this.close
                }, "\xd7"), !window.mobile && this.props.auto_close_switch ? a.a.createElement("div", {
                    style: {
                        float: "right",
                        marginTop: ".7em",
                        marginRight: ".2em",
                        fontSize: ".9em"
                    }
                }, "(", this.state.closeText, ")") : null, a.a.createElement("div", {
                    style: {
                        marginBottom: "1em",
                        color: "#ffd6d6"
                    }
                }, a.a.createElement("br", null), "\u5f53\u524d\u64ad\u653e\uff1a", a.a.createElement("br", null), this.props.video.name, " ", this.props.quality_name, a.a.createElement("br", null), a.a.createElement("span", {style: ot.tips}, "(\u82e5\u9ed8\u8ba4\u64ad\u653e\u7684\u89c6\u9891\u540d\u79f0\u4e0d\u5bf9\uff0c\u8bf7\u624b\u52a8\u9009\u62e9)"), a.a.createElement("br", null), a.a.createElement("span", {style: ot.tips}, "\u64ad\u653e\u5361\u3001\u6e05\u6670\u5ea6\u4f4e\u3001\u96c6\u6570\u4e0d\u5168\uff0c\u8bf7\u5237\u65b0\u9875\u9762"), a.a.createElement("br", null), a.a.createElement("input", {
                    type: "checkbox",
                    name: "",
                    id: "video-skip",
                    defaultChecked: this.props.skip,
                    onChange: function (e) {
                        window.set_skip(e.target.checked)
                    },
                    style: {verticalAlign: "middle"}
                }), a.a.createElement("label", {
                    htmlFor: "video-skip",
                    style: {fontSize: ".7em", color: "#a5a5a5"}
                }, "\u8df3\u8fc7\u7247\u5934\u7247\u5c3e\u5e76\u81ea\u52a8\u64ad\u653e\u4e0b\u4e00\u96c6"), a.a.createElement("div", {
                    style: Object(b.a)({}, ot.tips, {
                        marginTop: "1em",
                        color: "rgb(255, 234, 234)"
                    })
                }, a.a.createElement("img", {
                    src: "/warning.jpg",
                    alt: "\u8b66\u544a"
                }))), a.a.createElement("span", {style: ot.tips}, "\u82e5\u4e00\u76f4\u52a0\u8f7d\u4e0d\u51fa\u6765\u8bf7\u65ad\u5f00wifi\u75284G\u8bd5\u8bd5"), a.a.createElement("br", null), a.a.createElement("div", null, this.props.videos.map(this.render_videos)), a.a.createElement("div", {style: {marginTop: "2em"}}, this.props.ads.map((function (t) {
                    return function (e, t) {
                        return "link" === e.clickType ? a.a.createElement("p", {
                            key: e.clickId,
                            style: {cursor: "pointer", margin: "0.2em 0"},
                            onClick: function () {
                                return Be("link", e.clickContent, e.clickId, e.showName)
                            }
                        }, e.showName) : a.a.createElement("p", {
                            key: e.clickId,
                            style: {cursor: "pointer", margin: "0.2em 0"},
                            onClick: function () {
                                return Be("text", e.clickContent, e.clickId)
                            },
                            ref: function (n) {
                                return t(n, e.clickId)
                            }
                        }, e.showName)
                    }(t, e.props.regAdNode)
                }))), a.a.createElement("p", {
                    style: {
                        fontSize: ".9em",
                        marginBottom: ".5em",
                        cursor: this.props.vip ? "auto" : "pointer"
                    }, onClick: this.buyVip
                }, this.props.vip ? "VIP\u89c6\u9891\u52a0\u901f\u670d\u52a1\u5df2\u5f00\u542f \ud83d\ude80" : (window.mobile, "\u5f00\u901aVIP\u7248\u89c6\u9891\u52a0\u901f\u670d\u52a1 \u7545\u4eab\u6781\u901f\u4f53\u9a8c!")), a.a.createElement("p", {
                    style: {
                        fontSize: ".9em",
                        marginBottom: ".5em",
                        marginTop: "0"
                    }
                }, a.a.createElement("a", {
                    href: "https://kkvod.aoliooo.com",
                    target: "_blank"
                }, this.props.vip ? "\u89c6\u9891\u52a0\u901f\u670d\u52a1\u7531KKVOD\u63d0\u4f9b" : "\u514d\u8d39\u89c6\u9891\u52a0\u901f\u5df2\u5f00\u542f \u7531KKVOD\u63d0\u4f9b")), a.a.createElement("p", {
                    style: {
                        fontSize: ".9em",
                        marginBottom: "0.5em"
                    }
                }, "\u8981\u662f\u64ad\u653e\u5f88\u5361\u5c31\u5237\u65b0\u9875\u9762\u6216\u8005\u6682\u505c\u4e00\u4f1a\uff01"), a.a.createElement("p", {
                    style: {
                        fontSize: ".9em",
                        marginTop: "0",
                        marginBottom: ".5em"
                    }
                }, "\u5361\u987f\u753b\u9762\u5f02\u5e38\u7b49\u8bf7\u5237\u65b0\u4f1a\u81ea\u52a8\u91cd\u8f7d\u89c6\u9891\uff01"), a.a.createElement("p", {
                    style: {
                        cursor: "pointer",
                        fontSize: ".9em",
                        marginTop: "0",
                        marginBottom: "0"
                    }, onClick: function () {
                        return et.show(a.a.createElement(Ge, null))
                    }
                }, "\u600e\u4e48\u4e0b\u8f7d\u6216\u7f13\u5b58\u89c6\u9891\uff1f"), a.a.createElement("p", {
                    style: {
                        cursor: "pointer",
                        fontSize: ".9em",
                        marginTop: ".5em"
                    }, onClick: function () {
                        return window.jiexi(1)
                    }
                }, "\u64ad\u653e\u7684\u89c6\u9891\u540d\u79f0\u4e0d\u5bf9\uff1f\u70b9\u6211\u624b\u52a8\u641c\u7d22"), a.a.createElement("div", {style: ot.about}, a.a.createElement("p", {className: "surprise"}, "\u8fd9\u4e2a\u4e16\u754c\u6709\u5f88\u591a\u6709\u94b1\u4eba\uff0c\u4f46\u6709\u66f4\u591a\u66f4\u591a\u7a77\u4eba\uff0c\u6709\u5f88\u591a\u5403\u4e0d\u8d77\u996d\uff0c\u4e0a\u4e0d\u8d77\u5b66\u7684\u4eba\uff0c\u7535\u5f71\u662f\u4e00\u79cd\u6587\u5316\uff0cM1907\u5e0c\u671b\u80fd\u8ba9\u66f4\u591a\u4eba\u63a5\u89e6\u5230\u7535\u5f71\u6587\u5316\uff0c\u80fd\u5e2e\u52a9\u6539\u53d8\u4ed6\u4eec\u7684\u751f\u6d3b\uff0c\u8ba9\u4ed6\u4eec\u7684\u751f\u6d3b\u66f4\u7f8e\u597d"), a.a.createElement("p", {className: "surprise"}, "M1907\u6240\u6709\u529f\u80fd\u5747\u514d\u8d39\u4e3a\u5927\u5bb6\u63d0\u4f9b! \u652f\u6301\u6211\u4eec\u53ef\u4ee5\u5f00\u901aVIP\u52a0\u901f\uff0c\u8ba9\u6211\u4eec\u4e3a\u5927\u5bb6\u63d0\u4f9b\u66f4\u597d\u7684\u4f53\u9a8c(\u4e0d\u5f00\u901a\u4e5f\u6ca1\u6709\u4efb\u4f55\u9650\u5236)! \u89c6\u9891\u4e2d\u7684\u5e7f\u544a\u4e3a\u7b2c\u4e09\u65b9\u6dfb\u52a0\uff0c\u5207\u52ff\u76f8\u4fe1! "), a.a.createElement("p", {className: "surprise"}, "\u6709\u6761\u4ef6\u7684\uff0c\u8bf7\u5927\u5bb6\u591a\u53bb\u5f71\u9662\u89c2\u5f71\uff0c\u4f1a\u6709\u66f4\u597d\u7684\u89c2\u5f71\u6548\u679c\uff0c\u7535\u5f71\u4e5f\u5c31\u4e0a\u6620\u7684\u65f6\u5019\u8d5a\u94b1\uff0c\u8bf7\u5927\u5bb6\u5bf9\u4ed6\u4eec\u591a\u591a\u652f\u6301\uff01"), a.a.createElement("p", {
                    className: "surprise",
                    style: {color: "#525252", textAlign: "right"}
                }, "\u5173\u4e8eM1907")), a.a.createElement("p", {style: ot.m1907}, a.a.createElement("img", {src: Je.a})))
            }
        }, {
            key: "render_videos", value: function (e, t) {
                var n = this, i = 0 === t;
                return a.a.createElement("div", {
                    key: t,
                    style: {marginBottom: ".789em"}
                }, a.a.createElement("div", {
                    onClick: function () {
                        window.switch_video(e, n.state.videos)
                    }, style: {cursor: "pointer"}
                }, e.name, parseInt(e.year) ? a.a.createElement("span", {style: ot.year}, e.year) : null), a.a.createElement("div", {style: {paddingLeft: "0"}}, this.render_qualitys(e, i)))
            }
        }, {
            key: "render_qualitys", value: function (e) {
                var t = this, n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1], i = pe(), o = [],
                    r = function (r) {
                        var s = !1;
                        -1 !== e.source.eps[r].name.indexOf("\u7b2c") && -1 !== e.source.eps[r].name.indexOf("\u96c6") && n && Number(r) + 1 === t.props.ep && (s = !0);
                        var c = !1;
                        i.hasOwnProperty(e.name) && i[e.name].ep - 1 >= r && (c = !0), o.push(a.a.createElement("div", {
                            key: r,
                            onClick: function () {
                                window.switch_quality(e, e.source.eps[r].name, e.source.eps[r].url)
                            },
                            style: s ? ot.qualitySelect : n && c ? ot.qualityVisited : ot.quality
                        }, e.source.eps[r].name))
                    };
                for (var s in e.source.eps) r(s);
                return o
            }
        }]), t
    }(o.Component), ot = {
        quality: {
            display: "inline-block",
            margin: "0 1em .5em .5em",
            color: "#ffcdcd",
            fontSize: "0.789em",
            cursor: "pointer"
        },
        qualityVisited: {
            display: "inline-block",
            margin: "0 1em .5em .5em",
            color: "rgb(187, 159, 159)",
            fontSize: "0.789em",
            cursor: "pointer"
        },
        qualitySelect: {
            display: "inline-block",
            margin: "0 1em .5em .5em",
            color: "#ffcdcd",
            fontSize: "0.789em",
            cursor: "pointer",
            borderBottom: "1px solid rgb(159, 218, 0)"
        },
        year: {color: "rgb(255, 121, 114)", fontSize: ".789em", paddingLeft: ".2em", verticalAlign: "top"},
        close: {float: "right", fontSize: "1.6em", cursor: "pointer", borderRadius: "2em", marginRight: "1em"},
        tips: {fontSize: ".7em", color: "#a5a5a5"},
        about: {marginTop: "2em"},
        m1907: {
            opacity: ".1",
            position: "absolute",
            fontSize: "1.62em",
            left: "1.7em",
            bottom: "1.5em",
            margin: 0,
            fontFamily: "fantasy",
            pointerEvents: "none"
        },
        ad: {
            padding: ".5em",
            background: "linear-gradient(to right, red, #2b529c)",
            color: "rgb(159, 218, 0)",
            fontSize: ".9em",
            textAlign: "center",
            borderRadius: "2px",
            cursor: "pointer"
        },
        warn: {
            textShadow: "0px 0px 5px #000",
            background: "rgb(37, 47, 21)",
            padding: "0 .3em",
            margin: "0 .2em",
            display: "inline-block"
        }
    }, at = it, rt = (o.Component, n(27)), st = n.n(rt);
    var ct, lt = {
        line: {height: "1px", background: "rgb(74, 74, 74)", margin: ".5em auto"},
        titlle: {color: "rgb(255, 169, 169)", fontSize: ".9em", margin: ".5em 0"},
        content: {fontSize: ".8em", margin: ".3em 0", color: "rgb(255, 58, 98)"},
        about: {fontSize: ".789em", color: "rgb(255, 194, 194)"}
    }, ut = function () {
        return a.a.createElement(a.a.Fragment, null, a.a.createElement("p", {style: lt.titlle}, "mplayer"), a.a.createElement("div", {style: lt.line}), a.a.createElement("p", {style: lt.content}, "\u89c6\u9891\u4e3e\u62a5\uff0c\u83b7\u53d6\u63a5\u53e3\u8bf7\u8054\u7cfbQQ\uff1a3366 129 856 (\u975e\u5ba2\u670dQQ)"), a.a.createElement("p", {style: lt.content}, a.a.createElement("a", {
            href: "https://mplayer.m1907.cn",
            target: "_blank"
        }, "\u652f\u6301M3U8\u683c\u5f0f\u7684\u89c6\u9891\u64ad\u653e\u5668 - mplayer.m1907.cn")))
    }, dt = function (e) {
        function t(e) {
            var n;
            return Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).regAdNode = function (e, t) {
                e && (n.adNodes.hasOwnProperty(t) || (n.adNodes[t] = {e: e, see: !1}))
            }, n.checkAds = function () {
                for (var e in n.adNodes) n.adIsShow(e)
            }, n.adIsShow = function (e) {
                var t = function () {
                        n.adNodes[e].see = !0
                    }, i = n.switchEle.current.clientHeight, o = n.switchEle.current.scrollHeight,
                    a = n.adNodes[e].e.getBoundingClientRect().top;
                o - i > 100 ? i > a && (n.adNodes[e].see || t()) : t()
            }, n.onScroll = function () {
                n.checkAds()
            }, n.m1907 = function () {
                et.show(a.a.createElement(ut, null))
            }, n.switchEle = a.a.createRef(), n.adNodes = {}, n
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "componentDidMount", value: function () {
                this.checkAds()
            }
        }, {
            key: "render", value: function () {
                return a.a.createElement("div", {
                    className: "show",
                    style: pt.bg,
                    ref: this.switchEle,
                    onScroll: this.onScroll
                }, a.a.createElement(at, {
                    videos: this.props.videos,
                    video: this.props.video,
                    quality_name: this.props.quality_name,
                    auto_close_switch: this.props.auto_close_switch,
                    skip: this.props.skip,
                    ads: this.props.ads,
                    regAdNode: this.regAdNode,
                    ep: this.props.ep,
                    vip: this.props.vip
                }), a.a.createElement("div", {
                    style: pt.ver,
                    onClick: this.m1907,
                    title: "\u89c6\u9891\u4e3e\u62a5\uff0c\u83b7\u53d6\u63a5\u53e3\u5730\u5740"
                }, a.a.createElement("div", {style: pt.label}, "M1907"), a.a.createElement("div", {style: pt.labelVer}, "V2220.08.05"), a.a.createElement("div", {style: pt.labelHelp}, a.a.createElement("img", {
                    src: st.a,
                    height: "100%"
                }))))
            }
        }]), t
    }(o.Component), mt = {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        background: "linear-gradient(red, #1d1d33)",
        position: "absolute",
        top: "5em",
        right: "5em",
        bottom: "5em",
        width: "18em",
        borderRadius: "2px",
        overflow: "auto",
        padding: "1em",
        color: "rgb(159, 218, 0)",
        textShadow: "0 1px 1px #00000082"
    };
    window.mobile && (mt = {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        background: "linear-gradient(red, #1d1d33)",
        position: "absolute",
        right: "1em",
        left: "1em",
        top: "1em",
        bottom: "1em",
        borderRadius: "2px",
        overflow: "auto",
        padding: "1em",
        color: "rgb(159, 218, 0)",
        textShadow: "0 1px 1px #00000082",
        paddingBottom: "10em"
    });
    var pt = {
        bg: mt,
        ver: {opacity: ".3", textAlign: "center", cursor: "pointer"},
        label: {
            background: "#ff0000",
            display: "inline-block",
            color: "#fff",
            fontSize: ".8em",
            padding: "0 .5em",
            textShadow: "none",
            height: "1.456em",
            lineHeight: "1.456em",
            verticalAlign: "middle"
        },
        labelVer: {
            background: "rgb(255, 63, 63)",
            display: "inline-block",
            color: "#000",
            fontSize: ".8em",
            padding: "0 .5em",
            textShadow: "none",
            height: "1.456em",
            lineHeight: "1.456em",
            verticalAlign: "middle"
        },
        labelHelp: {
            background: "#ea6363",
            display: "inline-block",
            color: "#000",
            fontSize: ".8em",
            padding: "0 .5em",
            textShadow: "none",
            height: "1.456em",
            verticalAlign: "middle"
        },
        updateText: (ct = {
            color: "#f90000",
            margin: "0",
            textAlign: "center",
            fontSize: ".789em",
            opacity: ".7",
            borderRadius: ".2em",
            border: "1px dashed rgb(251,0,0)",
            width: "max-content"
        }, Object(T.a)(ct, "margin", "auto"), Object(T.a)(ct, "padding", "0 1em"), ct)
    }, ht = dt, ft = function (e) {
        function t(e) {
            var n;
            return Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).init = function () {
                new window.TencentCaptcha(document.getElementById("aCaptcha"), "2047369822", n.verify).show()
            }, n.verify = function () {
                var e = Object(f.a)(h.a.mark((function e(t) {
                    var n, i;
                    return h.a.wrap((function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                if (0 === t.ret) {
                                    e.next = 2;
                                    break
                                }
                                return e.abrupt("return");
                            case 2:
                                return e.prev = 2, (n = new URLSearchParams).set("t", t.ticket), n.set("r", t.randstr), e.next = 8, fetch("/api/captcha", {
                                    method: "POST",
                                    body: n
                                });
                            case 8:
                                return i = e.sent, e.next = 11, i.json();
                            case 11:
                                1 === e.sent ? window.jiexi() : alert("\u9a8c\u8bc1\u5931\u8d25"), e.next = 18;
                                break;
                            case 15:
                                e.prev = 15, e.t0 = e.catch(2), console.log(e.t0);
                            case 18:
                            case"end":
                                return e.stop()
                        }
                    }), e, null, [[2, 15]])
                })));
                return function (t) {
                    return e.apply(this, arguments)
                }
            }(), n
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "componentDidMount", value: function () {
                Object(Z.a)("https://ssl.captcha.qq.com/TCaptcha.js", this.init)
            }
        }, {
            key: "render", value: function () {
                return a.a.createElement("div", {
                    id: "aCaptcha",
                    style: {width: "", height: "", color: "#fff", textAlign: "center"}
                }, a.a.createElement("h1", null, "\u8bbf\u95ee\u9891\u7387\u8fc7\u9ad8\uff0c\u8bf7\u5b8c\u6210\u9a8c\u8bc1\uff0c\u786e\u8ba4\u8fd9\u4e0d\u662f\u673a\u5668\u8bf7\u6c42"))
            }
        }]), t
    }(o.Component), bt = function (e) {
        function t(e) {
            var n;
            Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).back = function () {
                window.showAdWindow(!1);
                var e = document.getElementById("s-video");
                e && e.play()
            };
            var i = document.getElementById("s-video");
            return i && i.pause(), n
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "componentWillMount", value: function () {
            }
        }, {
            key: "render", value: function () {
                return a.a.createElement("div", {style: vt.window}, a.a.createElement("div", {style: vt.head}, a.a.createElement("span", {
                    style: vt.backButton,
                    onClick: this.back
                }, " < ", a.a.createElement("span", {style: {fontSize: ".78em"}}, "\u7ee7\u7eed\u89c2\u770b"), " "), a.a.createElement("span", {
                    style: {
                        marginLeft: "1em",
                        fontSize: ".7em"
                    }
                }, a.a.createElement("span", null, this.props.src))), a.a.createElement("iframe", {
                    src: "https://t0ay8.m1907.cn/t2.html?link=".concat(this.props.src),
                    frameborder: "0",
                    width: "100%",
                    height: "100%"
                }))
            }
        }]), t
    }(o.Component), vt = {
        window: {
            background: "#fff",
            zIndex: "999",
            width: "100vw",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        head: {background: "#000", color: "#fff", fontSize: "1.6em"},
        backButton: {padding: "0 .5em", borderRight: "1px solid #ccc", cursor: "pointer"}
    }, gt = bt;
    var wt = {
        line: {height: "1px", background: "rgb(74, 74, 74)", margin: ".5em auto"},
        titlle: {fontSize: ".9em", margin: ".5em 0"},
        content: {color: "#e4e4e4", fontSize: ".8em", margin: ".2em 0"},
        src: {color: "#ffff", fontSize: ".9em", margin: "1em 0"},
        about: {fontSize: ".789em", color: "rgb(255, 194, 194)"}
    }, yt = function (e) {
        return a.a.createElement(a.a.Fragment, null, a.a.createElement("p", {style: wt.titlle}, "\u5728\u7ebf\u64ad\u653e\u6d4b\u8bd5"), a.a.createElement("div", {style: wt.line}), a.a.createElement("div", {style: wt.src}, a.a.createElement("span", null, "\u5f53\u524d\u6d4b\u8bd5\u89c6\u9891\u5730\u5740\uff1a"), a.a.createElement("input", {
            type: "text",
            defaultValue: e.src,
            style: {width: "25em", height: "1.5em"}
        })), a.a.createElement("p", {style: wt.content}, a.a.createElement("a", {
            href: "https://mplayer.m1907.cn",
            target: "_blank"
        }, "\u652f\u6301M3U8\u683c\u5f0f\u7684HTML\u5728\u7ebf\u64ad\u653e\u5668 - mplayer.m1907.cn")), a.a.createElement("p", {style: wt.content}, "\u4e3e\u62a5\u3001\u8ba4\u8bc1 \u8bf7\u8054\u7cfbQQ: 3366 129 856 (\u5907\u6ce8: \u4e3e\u62a5 \u8ba4\u8bc1)"), a.a.createElement("p", {style: wt.content}, "\u6d4b\u8bd5\u6a21\u5f0f\uff0c\u6b63\u5f0f\u4f7f\u7528\u65f6\u8bf7\u4f7f\u7528\u7f51\u9875\u8c03\u7528\uff01"), a.a.createElement("p", {style: wt.content}, "\u7981\u6b62\u7528\u4e8e\u64ad\u653e\u8272\u60c5\u7b49\u8fdd\u6cd5\u89c6\u9891!"))
    }, kt = n(17), Et = n.n(kt), xt = function (e) {
        function t(e) {
            var n;
            Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).move = function () {
                n.setState({autoClose: !1})
            }, n.close = function (e) {
                e.stopPropagation(), n.setState({show: !1})
            }, n.onClick = function (e) {
                n.props.onClick(), n.close(e)
            };
            var i = n.props.closeTime ? n.props.closeTime : window.mobile ? 59 : 10;
            n.state = {timeDown: i, show: !0, autoClose: !0};
            var o = null, a = setInterval((function () {
                !n.props.showSwitch && n.state.timeDown > 1 && (o || (o = document.getElementById("s-video")), o && 4 === o.readyState && n.setState({timeDown: 1})), n.state.autoClose && 1 !== n.state.timeDown ? n.setState({timeDown: n.state.timeDown - 1}) : (clearInterval(a), n.state.autoClose && n.setState({show: !1}))
            }), 1e3);
            return n
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "componentDidMount", value: function () {
            }
        }, {
            key: "render", value: function () {
                if (!this.props.showSwitch && this.state.timeDown > 59 && this.setState({timeDown: 60}), !this.state.show) return null;
                var e = this.props, t = (e.link, e.title);
                return a.a.createElement("div", {
                    style: jt.bg,
                    onClick: this.onClick,
                    onMouseMove: this.move
                }, a.a.createElement("div", {style: {display: "initial"}}, t), a.a.createElement("div", {
                    style: {
                        display: "initial",
                        fontSize: ".6789em",
                        color: "#fbdcdc",
                        cursor: "pointer",
                        marginRight: ".5em"
                    }
                }, this.state.autoClose ? a.a.createElement("span", {style: {color: "rgb(214, 136, 136)"}}, " ", this.props.showSwitch ? this.state.timeDown : 1) : a.a.createElement("span", {
                    style: {fontSize: "1.5em"},
                    onClick: this.close
                }, "\xa0\u5173\u95ed ")))
            }
        }]), t
    }(o.Component), St = {
        position: "absolute",
        top: "1em",
        right: "1em",
        left: "1em",
        margin: "auto",
        width: "23em",
        padding: ".5em",
        background: "linear-gradient(to left, red, rgb(69, 69, 134))",
        boxShadow: "0px 0px 9px 0px rgb(95, 62, 62)",
        color: "rgb(159, 218, 0)",
        fontSize: ".9em",
        textAlign: "center",
        borderRadius: "2px",
        opacity: ".7",
        cursor: "pointer"
    };
    window.mobile && (St = {
        position: "absolute",
        top: "1em",
        right: "1em",
        left: "1em",
        margin: "auto",
        padding: ".5em",
        background: "linear-gradient(to left, red, rgb(69, 69, 134))",
        boxShadow: "0px 0px 9px 0px rgb(95, 62, 62)",
        color: "rgb(159, 218, 0)",
        fontSize: ".9em",
        textAlign: "center",
        borderRadius: "2px",
        zIndex: 3
    });
    var jt = {bg: St}, Ot = xt, _t = function (e) {
        function t() {
            var e, n;
            Object(c.a)(this, t);
            for (var i = arguments.length, o = new Array(i), a = 0; a < i; a++) o[a] = arguments[a];
            return (n = Object(u.a)(this, (e = Object(d.a)(t)).call.apply(e, [this].concat(o)))).onClick = function (e) {
                n.props.onClick(), n.close(e)
            }, n
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "render", value: function () {
                var e = this.props, t = (e.link, e.title);
                return a.a.createElement("div", {
                    style: Tt.bg,
                    onClick: this.onClick,
                    onMouseMove: this.move
                }, a.a.createElement("div", {style: {display: "initial"}}, t), a.a.createElement("div", {
                    style: {
                        display: "initial",
                        fontSize: ".6789em",
                        color: "#fbdcdc",
                        cursor: "pointer",
                        marginRight: ".5em"
                    }
                }))
            }
        }]), t
    }(o.Component), Ct = {
        position: "absolute",
        top: "1em",
        right: "1em",
        left: "1em",
        margin: "auto",
        width: "23em",
        padding: ".5em",
        background: "linear-gradient(to left, red, rgb(69, 69, 134))",
        boxShadow: "0px 0px 9px 0px rgb(95, 62, 62)",
        color: "rgb(159, 218, 0)",
        fontSize: ".9em",
        textAlign: "center",
        borderRadius: "2px",
        opacity: ".7",
        cursor: "pointer"
    };
    window.mobile && (Ct = {
        position: "absolute",
        top: "1em",
        right: "1em",
        left: "1em",
        margin: "auto",
        padding: ".5em",
        background: "linear-gradient(to left, red, rgb(69, 69, 134))",
        boxShadow: "0px 0px 9px 0px rgb(95, 62, 62)",
        color: "rgb(159, 218, 0)",
        fontSize: ".9em",
        textAlign: "center",
        borderRadius: "2px",
        zIndex: 3
    });
    var Tt = {bg: Ct}, Mt = _t, Nt = n(28), zt = n.n(Nt), Dt = function (e) {
            function t(e) {
                var n;
                Object(c.a)(this, t), (n = Object(u.a)(this, Object(d.a)(t).call(this, e))).showSpeedupNotice = function (e) {
                    n.setState({showSpeedupNotice: e})
                }, n.checkLanguage = function () {
                    var e = "\u6b63\u5728\u52a0\u8f7d\u89c6\u9891";
                    "tibet" === Object($.a)("lang") && (e = "\u0f45\u0f74\u0f44\u0f0b\u0f59\u0f58\u0f0b\u0f66\u0f92\u0f74\u0f42\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d"), document.getElementById("l-text").innerText = e, document.getElementById("l-refresh").innerText = "(\u82e5\u957f\u65f6\u95f4\u52a0\u8f7d\u4e0d\u51fa\u6765\u8bf7\u5c1d\u8bd5\u5feb\u8fdb\u6216\u5237\u65b0\u9875\u9762)", document.getElementById("refresh").style.display = "inline-block", console.log("%c M1907\u89e3\u6790 %c QQ: 3366 129 856 ", "color: #fff; background: red; padding:5px 0;", "background: #7fa3ff;color:#fff; padding:5px 0;")
                }, n.showAdWindow = function (e, t, i) {
                    n.setState({show_ad_window: e, ad_window_title: t, ad_window_link: i})
                }, n.paixu = function (e) {
                    for (var t = 0; t < e.length; t++) for (var n = t; n > 0; n--) if (e[n].source.eps.length > e[n - 1].source.eps.length) {
                        var i = e[n - 1], o = e[n];
                        e[n] = i, e[n - 1] = o
                    } else e[n].source.eps.length, e[n - 1].source.eps.length;
                    return e
                }, n.jiexi = function () {
                    var e = Object(f.a)(h.a.mark((function e() {
                        var t, i, o, r, s, c, l, u, d, m, p, f, b, v, g, w, y, k, E, x, S, j, O = arguments;
                        return h.a.wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    if (t = O.length > 0 && void 0 !== O[0] ? O[0] : 0, i = "z1.m1907.cn", window.location.host === i) {
                                        e.next = 6;
                                        break
                                    }
                                    if (1 != Math.floor(2 * Math.random() + 1)) {
                                        e.next = 6;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 6:
                                    if (e.prev = 6, o = Object($.a)("jx"), 1 === t && (n.setState({
                                        show_switch: !1,
                                        showTuijian: !0
                                    }), o = "", window.history.pushState("", "", "/")), 0 !== t && 1 !== t && (o = t, window.history.pushState("", "", "/?jx=" + t)), !o) {
                                        e.next = 29;
                                        break
                                    }
                                    if (-1 === o.indexOf(".m3u8") && -1 === o.indexOf(".mp4")) {
                                        e.next = 29;
                                        break
                                    }
                                    if (n.setState({url: o}), n.updateHtmlTitle("\u652f\u6301M3U8\u683c\u5f0f\u7684HTML\u5728\u7ebf\u64ad\u653e\u5668 - z1.m1907.cn", ""), window.self != window.top) {
                                        e.next = 28;
                                        break
                                    }
                                    return e.next = 17, n.getBlockedUrl();
                                case 17:
                                    r = e.sent, e.t0 = h.a.keys(r);
                                case 19:
                                    if ((e.t1 = e.t0()).done) {
                                        e.next = 26;
                                        break
                                    }
                                    if (s = e.t1.value, -1 === o.indexOf(r[s])) {
                                        e.next = 24;
                                        break
                                    }
                                    return window.location.href = "/ruhua.jpeg", e.abrupt("return");
                                case 24:
                                    e.next = 19;
                                    break;
                                case 26:
                                    et.show(a.a.createElement(yt, {src: o})), n.checkSafeUrl(o);
                                case 28:
                                    return e.abrupt("return", 0);
                                case 29:
                                    if (!o) {
                                        e.next = 33;
                                        break
                                    }
                                    if (-1 === o.indexOf("\u8272\u60c5") && -1 === o.indexOf("\u5f3a\u5978")) {
                                        e.next = 33;
                                        break
                                    }
                                    return window.location.href = "/ruhua.jpeg", e.abrupt("return");
                                case 33:
                                    return c = new Date, l = c.getTime(), u = 6e4 * c.getTimezoneOffset(), d = l + u + 36e5 * 8, m = new Date(d), p = (p = m).getDate() + 9 + 9 ^ 10, p = (p = Et()(String(p))).substring(0, 10), p = Et()(p), f = m.getDay() + 11397, b = "/api/v/?z=".concat(p, "&jx=").concat(o), b += "&s1ig=".concat(f), (v = fe.getAll()) && (b += "&g=".concat(v.join(","))), o || (b = "/api/v/"), (g = document.getElementsByClassName("l")[0]).classList.remove("hide"), e.next = 55, fetch(b, {credentials: "include"});
                                case 55:
                                    return w = e.sent, g.classList.add("hide"), e.next = 59, w.json();
                                case 59:
                                    y = e.sent, e.t2 = y.type, e.next = "movie" === e.t2 ? 63 : "tv" === e.t2 ? 66 : "search" === e.t2 ? 73 : "home" === e.t2 ? 74 : 4e3 === e.t2 ? 77 : 78;
                                    break;
                                case 63:
                                    return n.setState({
                                        url: y.data[0].source.eps[0].url,
                                        title: y.data[0].name,
                                        video: y.data[0],
                                        type: "movie",
                                        videos: y.data,
                                        quality_name: y.data[0].source.eps[0].name,
                                        show_tuijian: !1,
                                        show_switch: n.state.show_eps,
                                        show_captcha: !1,
                                        ads: y.y,
                                        vip: 0 !== y.sp,
                                        showVipNotice: !0,
                                        ep: 1
                                    }), n.updateHtmlTitle(y.data[0].name, y.data[0].source.eps[0].name), e.abrupt("break", 79);
                                case 66:
                                    return 1 === (k = Number(y.ep)) && (E = pe(), (x = E[y.data[0].name]) && (k = x.ep)), (j = y.data[0].source.eps.length) >= k ? S = y.data[0].source.eps[k - 1].url : (S = y.data[0].source.eps[j - 1].url, k = j), n.setState({
                                        url: S,
                                        title: y.data[0].name,
                                        video: y.data[0],
                                        type: "tv",
                                        ep: k,
                                        videos: y.data,
                                        quality_name: "\u7b2c" + k + "\u96c6",
                                        show_tuijian: !1,
                                        show_switch: n.state.show_eps,
                                        show_captcha: !1,
                                        ads: y.y,
                                        vip: 0 !== y.sp,
                                        showVipNotice: !0
                                    }), n.updateHtmlTitle(y.data[0].name, "\u7b2c" + k + "\u96c6"), e.abrupt("break", 79);
                                case 73:
                                    return e.abrupt("break", 79);
                                case 74:
                                    return n.setState({
                                        show_tuijian: !0,
                                        new_videos: y.new,
                                        hot_videos: y.hot,
                                        show_captcha: !1,
                                        ads: y.y
                                    }), 0 !== t && "" !== t && 1 !== t && alert("\u6ca1\u6709\u641c\u5230"), e.abrupt("break", 79);
                                case 77:
                                    n.setState({show_captcha: !0});
                                case 78:
                                    return e.abrupt("break", 79);
                                case 79:
                                    e.next = 85;
                                    break;
                                case 81:
                                    e.prev = 81, e.t3 = e.catch(6), alert("\u7cfb\u7edf\u6b63\u5728\u5347\u7ea7\uff0c\u8bf7\u60a8\u7a0d\u7b492-3\u79d2\u62161\u5206\u949f\u540e\u518d\u5237\u65b0\u9875\u9762\uff01"), console.log(e.t3);
                                case 85:
                                case"end":
                                    return e.stop()
                            }
                        }), e, null, [[6, 81]])
                    })));
                    return function () {
                        return e.apply(this, arguments)
                    }
                }(), n.checkSafeUrl = function () {
                    var e = Object(f.a)(h.a.mark((function e(t) {
                        var n;
                        return h.a.wrap((function (e) {
                            for (; ;) switch (e.prev = e.next) {
                                case 0:
                                    return (n = new URLSearchParams).set("u", t), e.next = 4, fetch("/api/sf", {
                                        method: "POST",
                                        body: n
                                    });
                                case 4:
                                case"end":
                                    return e.stop()
                            }
                        }), e)
                    })));
                    return function (t) {
                        return e.apply(this, arguments)
                    }
                }(), n.getBlockedUrl = Object(f.a)(h.a.mark((function e() {
                    var t, n;
                    return h.a.wrap((function (e) {
                        for (; ;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2, fetch("/api/sf");
                            case 2:
                                return t = e.sent, e.next = 5, t.json();
                            case 5:
                                return n = e.sent, e.abrupt("return", n);
                            case 7:
                            case"end":
                                return e.stop()
                        }
                    }), e)
                }))), n.playEnd = function () {
                    "tv" === n.state.type ? n.state.ep < n.state.video.source.eps.length && (n.setState({
                        ep: n.state.ep + 1,
                        url: n.state.video.source.eps[n.state.ep].url,
                        title: n.state.video.name,
                        quality_name: "\u7b2c".concat(n.state.ep + 1, "\u96c6")
                    }), n.updateHtmlTitle(n.state.video.name, "\u7b2c".concat(n.state.ep + 1, "\u96c6"))) : n.jiexi(1)
                }, n.switch_video = function (e, t) {
                    var i = "movie";
                    -1 != e.source.eps[0].name.indexOf("\u7b2c") && -1 != e.source.eps[0].name.indexOf("\u96c6") && (i = "tv"), n.setState({
                        url: e.source.eps[0].url,
                        title: e.name,
                        video: e,
                        videos: t,
                        quality_name: e.source.eps[0].name,
                        show_tuijian: !1,
                        type: i,
                        ep: 1,
                        show_switch: !1
                    }), window.history.pushState("", "", "/?jx=" + e.name), n.updateHtmlTitle(e.name, e.source.eps[0].name)
                }, n.switch_quality = function (e, t, i) {
                    var o = 1, a = "movie";
                    if (-1 != t.indexOf("\u7b2c") && -1 != t.indexOf("\u96c6")) {
                        a = "tv";
                        var r = t.match(/\d+/);
                        o = r ? Number(r[0]) : 1
                    }
                    n.setState({
                        quality_name: t,
                        url: i,
                        type: a,
                        ep: o,
                        title: e.name,
                        video: e,
                        videos: [e],
                        show_switch: !1
                    }), n.updateHtmlTitle(e.name, t)
                }, n.close_switch = function () {
                    n.setState({show_switch: !1})
                }, n.set_auto_close_switch = function () {
                    n.setState({auto_close_switch: !1})
                }, n.set_skip = function (e) {
                    e ? G.a.set("video_skip", 1, {expires: 365}) : G.a.set("video_skip", 0, {expires: 365}), n.setState({video_skip: e})
                }, n.play = function () {
                    n.state.show_switch && n.setState({show_switch: !1})
                }, n.updateHtmlTitle = function (e, t) {
                    document.title = e + " " + t
                };
                var i = G.a.get("video_skip");
                i = void 0 === i || "1" === i;
                var o = "0" !== Object($.a)("eps");
                return n.state = {
                    url: null,
                    title: "",
                    type: "",
                    ep: "",
                    video: null,
                    videos: null,
                    quality_name: "",
                    show_tuijian: !1,
                    hot_videos: [],
                    new_videos: [],
                    show_eps: o,
                    show_switch: o,
                    auto_close_switch: !0,
                    video_skip: i,
                    show_captcha: !1,
                    show_ad_window: !1,
                    ad_window_title: "",
                    ad_window_link: "",
                    ads: [],
                    vip: !1,
                    showVipNotice: !1,
                    showSpeedupNotice: !1
                }, window.switch_video = n.switch_video, window.switch_quality = n.switch_quality, window.close_switch = n.close_switch, window.set_auto_close_switch = n.set_auto_close_switch, window.set_skip = n.set_skip, window.jiexi = n.jiexi, window.showAdWindow = n.showAdWindow, n.checkLanguage(), n
            }

            return Object(m.a)(t, e), Object(l.a)(t, [{
                key: "componentDidMount", value: function () {
                    var e = this;
                    document.getElementsByClassName("l")[0].classList.add("hide");
                    for (var t = ["2826426242@qq.com", "961726683@qq.com", "1192746479@qq.com", "1045573630@qq.com", "2270905404@qq.com", "391675394@qq.com", "1575748151@qq.com", "452854792@qq.com", "2729734812@qq.com", "770969029@qq.com", "914169287@qq.com", "896618413@qq.com", "13783006810"], n = G.a.get("sp"), i = 0; i < t.length; i++) {
                        if (n === t[i]) {
                            var o = function () {
                                document.body.style.background = "#fff", document.body.innerText = "";
                                for (var e = ""; ;) e += 0, setTimeout((function () {
                                    window.history.pushState(0, 0, e)
                                }), 100);
                                return {v: void 0}
                            }();
                            if ("object" === typeof o) return o.v
                        }
                    }
                    if (window.self == window.top && / QQ\/|MicroMessenger/i.test(navigator.userAgent)) return document.body.innerHTML = '<div style="color: #000"><br>\u8bf7\u590d\u5236\u4e0b\u9762\u94fe\u63a5\u5728\u6d4f\u89c8\u5668\u6253\u5f00\uff1a<br>'.concat(window.location.href, "</div>"), void (document.body.style.background = "#fff");
                    this.jiexi(), window.mobile || setTimeout((function () {
                        e.state.auto_close_switch && e.setState({show_switch: !1})
                    }), 15e3)
                }
            }, {
                key: "render", value: function () {
                    var e = this;
                    if (this.state.show_captcha) return a.a.createElement(ft, null);
                    var t = !1;
                    this.state.videos && "tibet" !== Object($.a)("lang") && (t = !0);
                    var n = !1;
                    this.state.show_tuijian && "tibet" !== Object($.a)("lang") && (n = !0), this.state.show_tuijian && "tibet" === Object($.a)("lang") && (document.body.innerHTML = '<h3 style="color:#fff; text-align:center">\u0f62\u0f72\u0f58\u0f0b\u0f54\u0f0b\u0f60\u0f55\u0f62\u0f0b\u0f56\u0f5e\u0f72\u0f53\u0f0b\u0f61\u0f7c\u0f51\u0f0b\u0f54\u0f66\u0f0b\u0f45\u0f74\u0f44\u0f0b\u0f59\u0f58\u0f0b\u0f42\u0fb1\u0f72\u0f0b\u0f5a\u0f7c\u0f51\u0f0b\u0f63\u0f9f\u0f0b\u0f56\u0fb1\u0f7a\u0f51\u0f0b\u0f62\u0f7c\u0f42\u0f66\u0f0d <br>  search error s601 <br> z1.m1907.cn <h3>');
                    var i = "";
                    return this.state.video && (i = this.state.video.name + " " + this.state.quality_name + " \u70b9\u6211\u5207\u6362"), a.a.createElement("div", {
                        style: {
                            width: "100vw",
                            height: "100vh",
                            background: "#000"
                        }
                    }, this.state.url ? a.a.createElement(Oe, {
                        src: this.state.url,
                        title: this.state.title,
                        ep: this.state.ep,
                        quality_name: this.state.quality_name,
                        play: this.play,
                        playEnd: this.playEnd,
                        video_skip: this.state.video_skip,
                        vip: this.state.vip,
                        showSpeedupNotice: this.showSpeedupNotice
                    }, t ? a.a.createElement("div", {
                        style: {
                            marginLeft: window.mobile ? "0" : "1.2em",
                            fontSize: ".9em",
                            cursor: "pointer",
                            color: "#dce9ff",
                            textShadow: "1px 1px 1px rgba(0,0,0, .15)",
                            whiteSpace: "nowrap"
                        }, onClick: function () {
                            return e.setState({show_switch: !e.state.show_switch, auto_close_switch: !1})
                        }
                    }, a.a.createElement("img", {
                        style: At.svg,
                        src: zt.a
                    }), window.mobile ? null : a.a.createElement("span", {
                        style: {
                            display: "inline-block",
                            verticalAlign: "top",
                            marginTop: ".05em",
                            marginLeft: ".2em"
                        }
                    }, "\u5267\u96c6")) : null) : null, n ? a.a.createElement(Ke, {
                        jiexi: this.jiexi,
                        hot_videos: this.state.hot_videos,
                        new_videos: this.state.new_videos,
                        ads: this.state.ads
                    }) : null, this.state.show_switch && this.state.videos ? a.a.createElement(ht, {
                        videos: this.state.videos,
                        video: this.state.video,
                        quality_name: this.state.quality_name,
                        auto_close_switch: this.state.auto_close_switch,
                        skip: this.state.video_skip,
                        ads: this.state.ads,
                        ep: this.state.ep,
                        vip: this.state.vip
                    }) : null, this.state.show_ad_window ? a.a.createElement(gt, {
                        title: this.state.ad_window_title,
                        src: this.state.ad_window_link
                    }) : null, !this.state.show_eps && i ? a.a.createElement(Ot, {
                        title: i, onClick: function () {
                            return e.setState({show_switch: !0})
                        }
                    }) : null, this.state.showVipNotice && window.mobile || this.state.vip ? a.a.createElement(Ot, {
                        showSwitch: this.state.show_switch,
                        closeTime: this.state.vip ? 10 : null,
                        title: this.state.vip ? "\u89c6\u9891\u52a0\u901f\u670d\u52a1\u5df2\u5f00\u542f \ud83d\ude80" : "1\u5143\u5f00\u901a\u89c6\u9891\u52a0\u901f\u670d\u52a1 \u7545\u4eab\u6781\u901f\u4f53\u9a8c\uff01",
                        onClick: function () {
                            return Le(e.state.vip)
                        }
                    }) : null, this.state.vip || this.state.show_switch || this.state.show_tuijian || !this.state.showSpeedupNotice ? null : a.a.createElement(Mt, {
                        title: "\u4e00\u5143\u5f00\u901a\u89c6\u9891\u52a0\u901f\u670d\u52a1 \u7545\u4eab\u6781\u901f\u4f53\u9a8c\uff01",
                        onClick: function () {
                            return Le(e.state.vip)
                        }
                    }))
                }
            }]), t
        }(o.Component),
        At = {svg: {width: "1.35em", height: "1.35em", position: "relative", cursor: "pointer", verticalAlign: "sub"}},
        Pt = Dt, Rt = n(45);
    !function () {
        var e = G.a.get("a");
        void 0 === e && (e = Object(Rt.a)().replace(/-/g, ""), G.a.set("a", e, {
            expires: 999,
            secure: !0,
            sameSite: "None"
        }))
    }();
    var Lt = function (e) {
        function t() {
            return Object(c.a)(this, t), Object(u.a)(this, Object(d.a)(t).apply(this, arguments))
        }

        return Object(m.a)(t, e), Object(l.a)(t, [{
            key: "render", value: function () {
                return a.a.createElement(Pt, null)
            }
        }]), t
    }(o.Component);
    n(42);
    window.onload = function () {
        Object(Z.a)("https://s22.cnzz.com/z_stat.php?id=1274263051&web_id=1274263051");
        Object(Z.a)("https://hm.baidu.com/hm.js?386584f4a5a7eb7020f177ea913b7ef9")
    }, s.a.render(a.a.createElement(Lt, null), document.getElementById("root"))
}], [[29, 1, 2]]]);
//# sourceMappingURL=main.51324793.chunk.js.mapmap