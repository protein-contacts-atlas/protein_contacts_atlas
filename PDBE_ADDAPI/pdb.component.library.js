function __safeExtends(e, t) {
    function n() {
        this.constructor = e
    }
    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
}(function() {
    "use strict";

    function e(e) {
        return "function" == typeof e || "object" == typeof e && null !== e
    }

    function t(e) {
        return "function" == typeof e
    }

    function n(e) {
        j = e
    }

    function r(e) {
        $ = e
    }

    function i() {
        return function() {
            process.nextTick(c)
        }
    }

    function o() {
        return function() {
            G(c)
        }
    }

    function a() {
        var e = 0,
            t = new Q(c),
            n = document.createTextNode("");
        return t.observe(n, {
                characterData: !0
            }),
            function() {
                n.data = e = ++e % 2
            }
    }

    function s() {
        var e = new MessageChannel;
        return e.port1.onmessage = c,
            function() {
                e.port2.postMessage(0)
            }
    }

    function l() {
        return function() {
            setTimeout(c, 1)
        }
    }

    function c() {
        for (var e = 0; X > e; e += 2) {
            var t = ee[e],
                n = ee[e + 1];
            t(n), ee[e] = void 0, ee[e + 1] = void 0
        }
        X = 0
    }

    function u() {
        try {
            var e = require,
                t = e("vertx");
            return G = t.runOnLoop || t.runOnContext, o()
        } catch (n) {
            return l()
        }
    }

    function d(e, t) {
        var n = this,
            r = new this.constructor(h);
        void 0 === r[re] && R(r);
        var i = n._state;
        if (i) {
            var o = arguments[i - 1];
            $(function() {
                A(i, r, o, n._result)
            })
        } else C(n, r, e, t);
        return r
    }

    function p(e) {
        var t = this;
        if (e && "object" == typeof e && e.constructor === t) return e;
        var n = new t(h);
        return x(n, e), n
    }

    function h() {}

    function m() {
        return new TypeError("You cannot resolve a promise with itself")
    }

    function f() {
        return new TypeError("A promises callback cannot return that same promise.")
    }

    function g(e) {
        try {
            return e.then
        } catch (t) {
            return se.error = t, se
        }
    }

    function y(e, t, n, r) {
        try {
            e.call(t, n, r)
        } catch (i) {
            return i
        }
    }

    function v(e, t, n) {
        $(function(e) {
            var r = !1,
                i = y(n, t, function(n) {
                    r || (r = !0, t !== n ? x(e, n) : E(e, n))
                }, function(t) {
                    r || (r = !0, I(e, t))
                }, "Settle: " + (e._label || " unknown promise"));
            !r && i && (r = !0, I(e, i))
        }, e)
    }

    function b(e, t) {
        t._state === oe ? E(e, t._result) : t._state === ae ? I(e, t._result) : C(t, void 0, function(t) {
            x(e, t)
        }, function(t) {
            I(e, t)
        })
    }

    function w(e, n, r) {
        n.constructor === e.constructor && r === te && constructor.resolve === ne ? b(e, n) : r === se ? I(e, se.error) : void 0 === r ? E(e, n) : t(r) ? v(e, n, r) : E(e, n)
    }

    function x(t, n) {
        t === n ? I(t, m()) : e(n) ? w(t, n, g(n)) : E(t, n)
    }

    function S(e) {
        e._onerror && e._onerror(e._result), T(e)
    }

    function E(e, t) {
        e._state === ie && (e._result = t, e._state = oe, 0 !== e._subscribers.length && $(T, e))
    }

    function I(e, t) {
        e._state === ie && (e._state = ae, e._result = t, $(S, e))
    }

    function C(e, t, n, r) {
        var i = e._subscribers,
            o = i.length;
        e._onerror = null, i[o] = t, i[o + oe] = n, i[o + ae] = r, 0 === o && e._state && $(T, e)
    }

    function T(e) {
        var t = e._subscribers,
            n = e._state;
        if (0 !== t.length) {
            for (var r, i, o = e._result, a = 0; a < t.length; a += 3) r = t[a], i = t[a + n], r ? A(n, r, i, o) : i(o);
            e._subscribers.length = 0
        }
    }

    function M() {
        this.error = null
    }

    function _(e, t) {
        try {
            return e(t)
        } catch (n) {
            return le.error = n, le
        }
    }

    function A(e, n, r, i) {
        var o, a, s, l, c = t(r);
        if (c) {
            if (o = _(r, i), o === le ? (l = !0, a = o.error, o = null) : s = !0, n === o) return void I(n, f())
        } else o = i, s = !0;
        n._state !== ie || (c && s ? x(n, o) : l ? I(n, a) : e === oe ? E(n, o) : e === ae && I(n, o))
    }

    function P(e, t) {
        try {
            t(function(t) {
                x(e, t)
            }, function(t) {
                I(e, t)
            })
        } catch (n) {
            I(e, n)
        }
    }

    function k() {
        return ce++
    }

    function R(e) {
        e[re] = ce++, e._state = void 0, e._result = void 0, e._subscribers = []
    }

    function V(e) {
        return new me(this, e).promise
    }

    function D(e) {
        var t = this;
        return new t(W(e) ? function(n, r) {
            for (var i = e.length, o = 0; i > o; o++) t.resolve(e[o]).then(n, r)
        } : function(e, t) {
            t(new TypeError("You must pass an array to race."))
        })
    }

    function L(e) {
        var t = this,
            n = new t(h);
        return I(n, e), n
    }

    function F() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
    }

    function H() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
    }

    function B(e) {
        this[re] = k(), this._result = this._state = void 0, this._subscribers = [], h !== e && ("function" != typeof e && F(), this instanceof B ? P(this, e) : H())
    }

    function O(e, t) {
        this._instanceConstructor = e, this.promise = new e(h), this.promise[re] || R(this.promise), Array.isArray(t) ? (this._input = t, this.length = t.length, this._remaining = t.length, this._result = new Array(this.length), 0 === this.length ? E(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && E(this.promise, this._result))) : I(this.promise, z())
    }

    function z() {
        return new Error("Array Methods must be provided an Array")
    }

    function q() {
        var e;
        if ("undefined" != typeof global) e = global;
        else if ("undefined" != typeof self) e = self;
        else try {
            e = Function("return this")()
        } catch (t) {
            throw new Error("polyfill failed because global object is unavailable in this environment")
        }
        var n = e.Promise;
        (!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (e.Promise = he)
    }
    var N;
    N = Array.isArray ? Array.isArray : function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    };
    var G, j, U, W = N,
        X = 0,
        $ = function(e, t) {
            ee[X] = e, ee[X + 1] = t, X += 2, 2 === X && (j ? j(c) : U())
        },
        Y = "undefined" != typeof window ? window : void 0,
        Z = Y || {},
        Q = Z.MutationObserver || Z.WebKitMutationObserver,
        J = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
        K = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
        ee = new Array(1e3);
    U = J ? i() : Q ? a() : K ? s() : void 0 === Y && "function" == typeof require ? u() : l();
    var te = d,
        ne = p,
        re = Math.random().toString(36).substring(16),
        ie = void 0,
        oe = 1,
        ae = 2,
        se = new M,
        le = new M,
        ce = 0,
        ue = V,
        de = D,
        pe = L,
        he = B;
    B.all = ue, B.race = de, B.resolve = ne, B.reject = pe, B._setScheduler = n, B._setAsap = r, B._asap = $, B.prototype = {
        constructor: B,
        then: te,
        "catch": function(e) {
            return this.then(null, e)
        }
    };
    var me = O;
    O.prototype._enumerate = function() {
        for (var e = this.length, t = this._input, n = 0; this._state === ie && e > n; n++) this._eachEntry(t[n], n)
    }, O.prototype._eachEntry = function(e, t) {
        var n = this._instanceConstructor,
            r = n.resolve;
        if (r === ne) {
            var i = g(e);
            if (i === te && e._state !== ie) this._settledAt(e._state, t, e._result);
            else if ("function" != typeof i) this._remaining--, this._result[t] = e;
            else if (n === he) {
                var o = new n(h);
                w(o, e, i), this._willSettleAt(o, t)
            } else this._willSettleAt(new n(function(t) {
                t(e)
            }), t)
        } else this._willSettleAt(r(e), t)
    }, O.prototype._settledAt = function(e, t, n) {
        var r = this.promise;
        r._state === ie && (this._remaining--, e === ae ? I(r, n) : this._result[t] = n), 0 === this._remaining && E(r, this._result)
    }, O.prototype._willSettleAt = function(e, t) {
        var n = this;
        C(e, void 0, function(e) {
            n._settledAt(oe, t, e)
        }, function(e) {
            n._settledAt(ae, t, e)
        })
    };
    var fe = q,
        ge = {
            Promise: he,
            polyfill: fe
        };
    "function" == typeof define && define.amd ? define(function() {
        return ge
    }) : "undefined" != typeof module && module.exports ? module.exports = ge : "undefined" != typeof this && (this.ES6Promise = ge), fe()
}).call(this),
    function() {
        var e = 0,
            t = /MSIE (\d+\.\d+);/.test(navigator.userAgent),
            n = !!navigator.userAgent.match(/Trident\/7.0/),
            r = navigator.userAgent.indexOf("rv:11.0");
        t && (e = new Number(RegExp.$1)), -1 != navigator.appVersion.indexOf("MSIE 10") && (e = 10), n && -1 != r && (e = 11), e > 0 && (HTMLElement.prototype.getBoundingClientRect = function() {
            var e = HTMLElement.prototype.getBoundingClientRect;
            return function() {
                try {
                    return e.apply(this, arguments)
                } catch (t) {
                    return {
                        left: "",
                        right: "",
                        top: "",
                        bottom: ""
                    }
                }
            }
        }())
    }(), THREE.TrackballControls = function(e, t) {
        function n(e) {
            d.enabled !== !1 && (window.removeEventListener("keydown", n, !1), window.addEventListener("keyup", r, !1), _prevState = f, f === p.NONE && (e.keyCode !== d.keys[p.ROTATE] || d.noRotate ? e.keyCode !== d.keys[p.ZOOM] || d.noZoom ? e.keyCode !== d.keys[p.PAN] || d.noPan || (f = p.PAN) : f = p.ZOOM : f = p.ROTATE, g = f))
        }

        function r(e) {
            d.enabled !== !1 && (f = _prevState, g = p.NONE, window.removeEventListener("keyup", r, !1), window.addEventListener("keydown", n, !1))
        }

        function i(e) {
            d.enabled !== !1 && (e.preventDefault(), g !== p.NONE && (f = g), f === p.NONE && (f = e.button), f !== p.ROTATE || d.noRotate ? f !== p.ZOOM || d.noZoom ? f !== p.PAN || d.noPan || (_panStart.copy(w(e.pageX, e.pageY)), _panEnd.copy(_panStart)) : (_zoomStart.copy(w(e.pageX, e.pageY)), _zoomEnd.copy(_zoomStart)) : (_rotateStart.copy(x(e.pageX, e.pageY)), _rotateEnd.copy(_rotateStart)), window.addEventListener("mousemove", o, !1), window.addEventListener("mouseup", a, !1), d.dispatchEvent(v))
        }

        function o(e) {
            d.enabled !== !1 && (e.preventDefault(), f !== p.ROTATE || d.noRotate ? f !== p.ZOOM || d.noZoom ? f !== p.PAN || d.noPan || _panEnd.copy(w(e.pageX, e.pageY)) : _zoomEnd.copy(w(e.pageX, e.pageY)) : _rotateEnd.copy(x(e.pageX, e.pageY)), d.update())
        }

        function a(e) {
            d.enabled !== !1 && (e.preventDefault(), f = p.NONE, window.removeEventListener("mousemove", o, !1), window.removeEventListener("mouseup", a, !1), d.dispatchEvent(b))
        }

        function s(e) {
            if (d.enabled !== !1) {
                switch (e.touches.length) {
                    case 1:
                        f = p.TOUCH_ROTATE, _rotateStart.copy(x(e.touches[0].pageX, e.touches[0].pageY)), _rotateEnd.copy(_rotateStart);
                        break;
                    case 2:
                        f = p.TOUCH_ZOOM_PAN;
                        var t = e.touches[0].pageX - e.touches[1].pageX,
                            n = e.touches[0].pageY - e.touches[1].pageY;
                        _touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt(t * t + n * n);
                        var r = (e.touches[0].pageX + e.touches[1].pageX) / 2,
                            i = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                        _panStart.copy(w(r, i)), _panEnd.copy(_panStart);
                        break;
                    default:
                        f = p.NONE
                }
                d.dispatchEvent(v)
            }
        }

        function l(e) {
            if (d.enabled !== !1) switch (e.preventDefault(), e.stopPropagation(), e.touches.length) {
                case 1:
                    _rotateEnd.copy(x(e.touches[0].pageX, e.touches[0].pageY)), d.update();
                    break;
                case 2:
                    var t = e.touches[0].pageX - e.touches[1].pageX,
                        n = e.touches[0].pageY - e.touches[1].pageY;
                    _touchZoomDistanceEnd = Math.sqrt(t * t + n * n);
                    var r = (e.touches[0].pageX + e.touches[1].pageX) / 2,
                        i = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                    _panEnd.copy(w(r, i)), d.update();
                    break;
                default:
                    f = p.NONE
            }
        }

        function c(e) {
            if (d.enabled !== !1) {
                switch (e.touches.length) {
                    case 1:
                        _rotateEnd.copy(x(e.touches[0].pageX, e.touches[0].pageY)), _rotateStart.copy(_rotateEnd);
                        break;
                    case 2:
                        _touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
                        var t = (e.touches[0].pageX + e.touches[1].pageX) / 2,
                            n = (e.touches[0].pageY + e.touches[1].pageY) / 2;
                        _panEnd.copy(w(t, n)), _panStart.copy(_panEnd)
                }
                f = p.NONE, d.dispatchEvent(b)
            }
        }

        function u(e) {
            e.preventDefault()
        }
        var d = this,
            p = {
                NONE: -1,
                ROTATE: 0,
                ZOOM: 2,
                PAN: 1,
                TOUCH_ROTATE: 3,
                TOUCH_ZOOM_PAN: 4
            };
        this.object = e, this.domElement = void 0 !== t ? t : document, this.enabled = !0, this.screen = {
            left: 0,
            top: 0,
            width: 0,
            height: 0
        }, this.rotateSpeed = 1, this.zoomSpeed = 1.2, this.panSpeed = .6, this.noRotate = !1, this.noZoom = !1, this.noPan = !1, this.noRoll = !0, this.staticMoving = !1, this.dynamicDampingFactor = .2, this.minDistance = 2, this.maxDistance = 2e3, this.keys = [65, 83, 68], this.target = new THREE.Vector3;
        var h = 1e-6,
            m = new THREE.Vector3,
            f = p.NONE,
            g = p.NONE;
        _prevState = p.NONE, _eye = new THREE.Vector3, _rotateStart = new THREE.Vector3, _rotateEnd = new THREE.Vector3, _zoomStart = new THREE.Vector2, _zoomEnd = new THREE.Vector2, _touchZoomDistanceStart = 0, _touchZoomDistanceEnd = 0, _panStart = new THREE.Vector2, _panEnd = new THREE.Vector2, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.up0 = this.object.up.clone();
        var y = {
                type: "change"
            },
            v = {
                type: "start"
            },
            b = {
                type: "end"
            };
        this.handleResize = function() {
            if (this.domElement === document) this.screen.left = 0, this.screen.top = 0, this.screen.width = window.innerWidth, this.screen.height = window.innerHeight;
            else {
                var e = this.domElement.getBoundingClientRect(),
                    t = this.domElement.ownerDocument.documentElement;
                this.screen.left = e.left + window.pageXOffset - t.clientLeft, this.screen.top = e.top + window.pageYOffset - t.clientTop, this.screen.width = e.width, this.screen.height = e.height
            }
        }, this.handleEvent = function(e) {
            "function" == typeof this[e.type] && this[e.type](e)
        };
        var w = function() {
                var e = new THREE.Vector2;
                return function(t, n) {
                    return e.set((t - d.screen.left) / d.screen.width, (n - d.screen.top) / d.screen.height), e
                }
            }(),
            x = function() {
                var e = new THREE.Vector3,
                    t = new THREE.Vector3,
                    n = new THREE.Vector3;
                return function(r, i) {
                    var o = d.screen.left + .5 * d.screen.width,
                        a = d.screen.top + .5 * d.screen.height,
                        s = (r - o) / (.5 * d.screen.width),
                        l = -(i - a) / (.5 * d.screen.height);
                    n.set(s, l, 0);
                    var c = n.length();
                    return d.noRoll ? c < Math.SQRT1_2 ? n.z = Math.sqrt(1 - c * c) : n.z = .5 / c : c > 1 ? n.normalize() : n.z = Math.sqrt(1 - c * c), _eye.copy(d.object.position).sub(d.target), e.copy(d.object.up).setLength(n.y), e.add(t.copy(d.object.up).cross(_eye).setLength(n.x)), e.add(_eye.setLength(n.z)), e
                }
            }();
        this.rotateCamera = function() {
            var e = new THREE.Vector3,
                t = new THREE.Quaternion;
            return function() {
                var n = Math.acos(_rotateStart.dot(_rotateEnd) / _rotateStart.length() / _rotateEnd.length());
                n && (e.crossVectors(_rotateStart, _rotateEnd).normalize(), n *= d.rotateSpeed, t.setFromAxisAngle(e, -n), _eye.applyQuaternion(t), d.object.up.applyQuaternion(t), _rotateEnd.applyQuaternion(t), d.staticMoving ? _rotateStart.copy(_rotateEnd) : (t.setFromAxisAngle(e, n * (d.dynamicDampingFactor - 1)), _rotateStart.applyQuaternion(t)))
            }
        }(), this.zoomCamera = function() {
            if (f === p.TOUCH_ZOOM_PAN) {
                var e = _touchZoomDistanceStart / _touchZoomDistanceEnd;
                _touchZoomDistanceStart = _touchZoomDistanceEnd, _eye.multiplyScalar(e)
            } else {
                var e = 1 + (_zoomEnd.y - _zoomStart.y) * d.zoomSpeed;
                1 !== e && e > 0 && (_eye.multiplyScalar(e), d.staticMoving ? _zoomStart.copy(_zoomEnd) : _zoomStart.y += (_zoomEnd.y - _zoomStart.y) * this.dynamicDampingFactor)
            }
        }, this.panCamera = function() {
            var e = new THREE.Vector2,
                t = new THREE.Vector3,
                n = new THREE.Vector3;
            return function() {
                e.copy(_panEnd).sub(_panStart), e.lengthSq() && (e.multiplyScalar(_eye.length() * d.panSpeed), n.copy(_eye).cross(d.object.up).setLength(e.x), n.add(t.copy(d.object.up).setLength(e.y)), d.object.position.add(n), d.target.add(n), d.staticMoving ? _panStart.copy(_panEnd) : _panStart.add(e.subVectors(_panEnd, _panStart).multiplyScalar(d.dynamicDampingFactor)))
            }
        }(), this.panTo = function() {
            var e = new THREE.Vector3;
            return function(t) {
                e.subVectors(t, d.target), d.object.position.add(e), d.object.lookAt(t), d.target.copy(t), _eye.subVectors(d.object.position, d.target), m.copy(d.object.position), d.dispatchEvent(y)
            }
        }(), this.checkDistances = function() {
            d.noZoom && d.noPan || (_eye.lengthSq() > d.maxDistance * d.maxDistance && d.object.position.addVectors(d.target, _eye.setLength(d.maxDistance)), _eye.lengthSq() < d.minDistance * d.minDistance && d.object.position.addVectors(d.target, _eye.setLength(d.minDistance)))
        }, this.update = function() {
            _eye.subVectors(d.object.position, d.target), d.noRotate || d.rotateCamera(), d.noZoom || d.zoomCamera(), d.noPan || d.panCamera(), d.object.position.addVectors(d.target, _eye), d.checkDistances(), d.object.lookAt(d.target), m.distanceToSquared(d.object.position) > h && (d.dispatchEvent(y), m.copy(d.object.position))
        }, this.reset = function() {
            f = p.NONE, _prevState = p.NONE, d.target.copy(d.target0), d.object.position.copy(d.position0), d.object.up.copy(d.up0), _eye.subVectors(d.object.position, d.target), d.object.lookAt(d.target), d.dispatchEvent(y), m.copy(d.object.position)
        }, this.getState = function() {
            return {
                state: f,
                prevState: _prevState,
                target: d.target.clone(),
                objPos: d.object.position.clone(),
                objUp: d.object.up.clone(),
                eye: _eye.clone(),
                lastPosition: m.clone()
            }
        }, this.setState = function(e) {
            f = e.state, _prevState = e.prevState, d.target.copy(e.target), d.object.position.copy(e.objPos), d.object.up.copy(e.objUp), _eye.copy(e.eye), d.object.lookAt(d.target), d.dispatchEvent(y), m.copy(e.lastPosition)
        }, this.domElement.addEventListener("contextmenu", u, !1), this.domElement.addEventListener("mousedown", i, !1), this.domElement.addEventListener("touchstart", s, !1), this.domElement.addEventListener("touchend", c, !1), this.domElement.addEventListener("touchmove", l, !1), window.addEventListener("keydown", n, !1), this.handleResize(), this.update(), this.destroy = function() {
            d.domElement.removeEventListener("contextmenu", u, !1), d.domElement.removeEventListener("mousedown", i, !1), window.removeEventListener("keydown", n, !1), d.domElement.removeEventListener("touchstart", s, !1), d.domElement.removeEventListener("touchend", c, !1), d.domElement.removeEventListener("touchmove", l, !1), d.object = void 0, d.domElement = void 0
        }
    }, THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
var __extends = this && this.__extends || function(e, t) {
        function n() {
            this.constructor = e
        }
        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
        e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    },
    LiteMol;
! function(e) {
    e.VERSION = "1.1.4", e.VERSION_DATE = "Feb 22 2016"
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        "use strict";
        var t = function() {
            function e() {}
            return e.parseInt = function(e, t, n) {
                var r = 0,
                    i = 1;
                for (45 === e.charCodeAt(t) && (i = -1, t++); n > t; t++) {
                    var o = e.charCodeAt(t) - 48;
                    if (o > 9 || 0 > o) return i * r | 0;
                    r = 10 * r + o | 0
                }
                return i * r
            }, e.parseScientific = function(t, n, r, i) {
                return t * Math.pow(10, e.parseInt(n, r, i))
            }, e.parseFloat = function(t, n, r) {
                var i = 1,
                    o = 0,
                    a = 0,
                    s = 1;
                for (45 === t.charCodeAt(n) && (i = -1, ++n); r > n;) {
                    var l = t.charCodeAt(n) - 48;
                    if (!(l >= 0 && 10 > l)) {
                        if (-2 === l) {
                            for (++n; r > n;) {
                                if (l = t.charCodeAt(n) - 48, !(l >= 0 && 10 > l)) return 53 === l || 21 === l ? e.parseScientific(i * (o + a / s), t, n + 1, r) : i * (o + a / s);
                                a = 10 * a + l, s = 10 * s, ++n
                            }
                            return i * (o + a / s)
                        }
                        if (53 === l || 21 === l) return e.parseScientific(i * o, t, n + 1, r);
                        break
                    }
                    o = 10 * o + l, ++n
                }
                return i * o
            }, e
        }();
        e.FastNumberParsers = t
    }(t = e.Utils || (e.Utils = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(t) {
            "use strict";
            var n = function() {
                function e(e) {
                    this.data = e, this.dataBlocks = []
                }
                return e.prototype.addBlock = function(e) {
                    this.dataBlocks[this.dataBlocks.length] = e
                }, e.prototype.toJSON = function() {
                    return this.dataBlocks.map(function(e) {
                        return e.toJSON()
                    })
                }, e
            }();
            t.File = n;
            var r = function() {
                function e(e, t) {
                    this.file = e, this.header = t, this.data = e.data, this.categoryList = [], this.additionalData = {}, this.categoryMap = {}
                }
                return Object.defineProperty(e.prototype, "categories", {
                    get: function() {
                        return this.categoryMap
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.addCategory = function(e) {
                    this.categoryList[this.categoryList.length] = e, this.categoryMap[e.name] = e
                }, e.prototype.getCategory = function(e) {
                    return this.categoryMap[e]
                }, e.prototype.hasCategory = function(e) {
                    return void 0 !== this.categoryMap[e]
                }, e.prototype.toJSON = function() {
                    return {
                        id: this.header,
                        categories: this.categoryList.map(function(e) {
                            return e.toJSON()
                        }),
                        additionalData: this.additionalData
                    }
                }, e
            }();
            t.Block = r;
            var i = function() {
                    function e() {}
                    return e.getString = function(e) {
                        if (e.length > 6) return e;
                        var t = this.strings.get(e);
                        return void 0 !== t ? t : (this.strings.set(e, e), e)
                    }, e.strings = new Map, e
                }(),
                o = function() {
                    function e(e, t) {
                        this.category = e, this.rowNumber = t
                    }
                    return e.prototype.getString = function(e) {
                        return this.category.getStringValue(e, this.rowNumber)
                    }, e.prototype.getInt = function(e) {
                        return this.category.getIntValue(e, this.rowNumber)
                    }, e.prototype.getFloat = function(e) {
                        return this.category.getFloatValue(e, this.rowNumber)
                    }, e
                }();
            t.CategoryQueryRowContext = o;
            var a = function() {
                function e(e, t, n) {
                    this.category = e, this.name = t, this.index = n
                }
                return e.prototype.getString = function(e) {
                    return this.category.getStringValueFromIndex(this.index, e)
                }, e.prototype.getInteger = function(e) {
                    return this.category.getIntValueFromIndex(this.index, e)
                }, e.prototype.getFloat = function(e) {
                    return this.category.getFloatValueFromIndex(this.index, e)
                }, e.prototype.isUndefined = function(e) {
                    return this.category.isValueUndefinedFromIndex(this.index, e)
                }, e
            }();
            t.Column = a;
            var s = function() {
                function t(e, t, n, r, i, o, s) {
                    this.name = t, this.columnNames = i, this.tokens = o, this.data = e.data, this.startIndex = n, this.endIndex = r, this.columnCount = this.columnNames.length, this.rowCount = s / this.columnNames.length | 0, this.columnIndices = {}, this.columnWrappers = {}, this.shortColumnWrappers = {};
                    for (var l = 0; l < this.columnNames.length; l++) {
                        this.columnIndices[this.columnNames[l]] = l;
                        var c = new a(this, this.columnNames[l], l);
                        this.columnWrappers[this.columnNames[l]] = c, this.shortColumnWrappers[this.columnNames[l].substr(t.length + 1)] = c
                    }
                }
                return Object.defineProperty(t.prototype, "columns", {
                    get: function() {
                        return this.shortColumnWrappers
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.getColumnIndex = function(e) {
                    var t = this.columnIndices[e];
                    return void 0 !== t ? t : -1
                }, t.prototype.getColumn = function(e) {
                    return this.columnWrappers[e]
                }, t.prototype.updateTokenRange = function(e, t, n) {
                    var r = 2 * (t * this.columnCount + e);
                    n.start = this.tokens[r], n.end = this.tokens[r + 1]
                }, t.prototype.updateTokenIndexRange = function(e, t) {
                    t.start = this.tokens[2 * e], t.end = this.tokens[2 * e + 1]
                }, t.prototype.isTokenUndefined = function(e) {
                    var t = this.tokens[2 * e];
                    if (this.tokens[2 * e + 1] - t === 1) {
                        var n = this.data.charCodeAt(t);
                        return 46 === n || 63 === n
                    }
                }, t.prototype.isTokenRangeUndefined = function(e, t) {
                    if (t - e === 1) {
                        var n = this.data.charCodeAt(e);
                        return 46 === n || 63 === n
                    }
                }, t.prototype.isValueUndefined = function(e, t) {
                    void 0 === t && (t = 0), t = 0 | t;
                    var n = this.getColumnIndex(e);
                    return 0 > n ? !0 : this.isTokenUndefined(t * this.columnCount + n)
                }, t.prototype.isValueUndefinedFromIndex = function(e, t) {
                    return t = 0 | t, 0 > e ? !0 : this.isTokenUndefined(t * this.columnCount + e)
                }, t.prototype.getStringValueFromToken = function(e) {
                    var t = this.tokens[2 * e],
                        n = this.tokens[2 * e + 1];
                    if (n - t === 1) {
                        var r = this.data.charCodeAt(t);
                        if (46 === r || 63 === r) return null
                    }
                    var o = i.getString(this.data.substring(t, n));
                    return o
                }, t.prototype.getStringValue = function(e, t) {
                    void 0 === t && (t = 0), t = 0 | t;
                    var n = this.getColumnIndex(e);
                    return 0 > n ? null : this.getStringValueFromToken(t * this.columnCount + n)
                }, t.prototype.getStringValueOrDefault = function(e, t, n) {
                    void 0 === t && (t = ""), void 0 === n && (n = 0);
                    var r = this.getStringValue(e, n);
                    return r ? r : t
                }, t.prototype.getFloatValue = function(t, n) {
                    void 0 === n && (n = 0), n = 0 | n;
                    var r = this.getColumnIndex(t);
                    if (0 > r) return NaN;
                    var i = 2 * (n * this.columnCount + r),
                        o = this.tokens[i],
                        a = this.tokens[i + 1];
                    if (a - o === 1) {
                        var s = this.data.charCodeAt(o);
                        if (46 === s || 63 === s) return NaN
                    }
                    return e.Utils.FastNumberParsers.parseFloat(this.data, this.tokens[i], this.tokens[i + 1])
                }, t.prototype.getFloatValueOrDefault = function(e, t, n) {
                    void 0 === t && (t = 0), void 0 === n && (n = 0);
                    var r = this.getFloatValue(e, n);
                    return isNaN(r) ? t : r
                }, t.prototype.getIntValue = function(t, n) {
                    void 0 === n && (n = 0), n = 0 | n;
                    var r = this.getColumnIndex(t);
                    if (0 > r) return NaN;
                    var i = 2 * (n * this.columnCount + r),
                        o = this.tokens[i],
                        a = this.tokens[i + 1];
                    if (a - o === 1) {
                        var s = this.data.charCodeAt(o);
                        if (46 === s || 63 === s) return NaN
                    }
                    return e.Utils.FastNumberParsers.parseInt(this.data, this.tokens[i], this.tokens[i + 1])
                }, t.prototype.getIntValueOrDefault = function(e, t, n) {
                    void 0 === t && (t = 0), void 0 === n && (n = 0);
                    var r = this.getIntValue(e, n);
                    return isNaN(r) ? t : r
                }, t.prototype.getStringValueFromIndex = function(e, t) {
                    if (0 > e) return null;
                    var n = 2 * (t * this.columnCount + e),
                        r = i.getString(this.data.substring(this.tokens[n], this.tokens[n + 1]));
                    return "." === r || "?" === r ? null : r
                }, t.prototype.getIntValueFromIndex = function(t, n) {
                    if (0 > t) return NaN;
                    var r = 2 * (n * this.columnCount + t);
                    return e.Utils.FastNumberParsers.parseInt(this.data, this.tokens[r], this.tokens[r + 1])
                }, t.prototype.getFloatValueFromIndex = function(t, n) {
                    if (0 > t) return NaN;
                    var r = 2 * (n * this.columnCount + t);
                    return e.Utils.FastNumberParsers.parseFloat(this.data, this.tokens[r], this.tokens[r + 1])
                }, t.prototype.getMatrix = function(e, t, n, r) {
                    for (var i, o = [], a = 1; t >= a; a++) {
                        i = [];
                        for (var s = 1; n >= s; s++) {
                            var l = e + "[" + a + "][" + s + "]";
                            if (this.isValueUndefined(l, r)) return void 0;
                            i[s - 1] = this.getFloatValue(l, r)
                        }
                        o[a - 1] = i
                    }
                    return o
                }, t.prototype.getVector = function(e, t, n, r) {
                    for (var i = [], o = 1; t >= o; o++) {
                        var a = e + "[" + o + "]";
                        if (this.isValueUndefined(a, r)) return void 0;
                        i[o - 1] = this.getFloatValue(a, r)
                    }
                    return i
                }, t.prototype.getTransform = function(t, n, r) {
                    var i, o, a, s = e.Geometry.LinearAlgebra.Matrix4.identity();
                    for (i = 1; 3 >= i; i++) {
                        for (o = 1; 3 >= o; o++) {
                            if (a = n + "[" + i + "][" + o + "]", this.isValueUndefined(a, t)) return void 0;
                            e.Geometry.LinearAlgebra.Matrix4.setValue(s, i - 1, o - 1, this.getFloatValue(a, t))
                        }
                        a = r + "[" + i + "]", e.Geometry.LinearAlgebra.Matrix4.setValue(s, i - 1, 3, this.getFloatValue(a, t))
                    }
                    return s
                }, t.prototype.areTokensEqual = function(e, t) {
                    var n = this.tokens[2 * e],
                        r = this.tokens[2 * t],
                        i = this.tokens[2 * e + 1] - n;
                    if (i !== this.tokens[2 * t + 1] - r) return !1;
                    for (var o = 0; i > o; o++)
                        if (this.data.charCodeAt(o + n) !== this.data.charCodeAt(o + r)) return !1;
                    return !0
                }, t.prototype.tokenEqual = function(e, t) {
                    var n = this.tokens[2 * e],
                        r = t.length;
                    if (r !== this.tokens[2 * e + 1] - n) return !1;
                    for (var i = 0; r > i; i++)
                        if (this.data.charCodeAt(i + n) !== t.charCodeAt(i)) return !1;
                    return !0
                }, t.prototype.valueEqual = function(e, t, n) {
                    var r = 2 * (t * this.columnCount + e),
                        i = this.tokens[r],
                        o = n.length;
                    if (o !== this.tokens[r + 1] - i) return !1;
                    for (var a = 0; o > a; a++)
                        if (this.data.charCodeAt(a + i) !== n.charCodeAt(a)) return !1;
                    return !0
                }, t.prototype.select = function(e) {
                    for (var t = [], n = 0; n < this.rowCount; n++) t[n] = e(new o(this, n));
                    return t
                }, t.prototype.selectWhere = function(e, t) {
                    for (var n = [], r = 0; r < this.rowCount; r++) {
                        var i = new o(this, r);
                        e(i) && (n[n.length] = t(i))
                    }
                    return n
                }, t.prototype.toJSON = function() {
                    var e, t, n = [],
                        r = this.data,
                        i = this.tokens;
                    for (e = 0; e < this.rowCount; e++) {
                        var o = {};
                        for (t = 0; t < this.columnCount; t++) {
                            var a = 2 * (e * this.columnCount + t);
                            o[this.columnNames[t]] = r.substring(i[a], i[a + 1])
                        }
                        n[e] = o
                    }
                    return {
                        name: this.name,
                        columns: this.columnNames.slice(0),
                        rows: n
                    }
                }, t
            }();
            t.Category = s
        }(n = t.Cif || (t.Cif = {}))
    }(t = e.Formats || (e.Formats = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        "use strict";
        var t = function() {
            function e(e, t) {
                this.name = e, this.creator = t
            }
            return e
        }();
        e.DataTableColumnDescriptor = t;
        var n = function() {
            function e(e, t) {
                this.count = e, this.indices = new Int32Array(e), this.columns = [];
                for (var n = 0; e > n; n++) this.indices[n] = n;
                if (t)
                    for (var r = 0, i = t.columns; r < i.length; r++) {
                        var o = i[r];
                        Object.defineProperty(this, o.name, {
                            enumerable: !0,
                            configurable: !1,
                            writable: !1,
                            value: t[o.name]
                        }), this.columns[this.columns.length] = o
                    }
            }
            return e.prototype.clone = function() {
                for (var e = new r(this.count), t = [], n = 0, i = this.columns; n < i.length; n++) {
                    var o = i[n];
                    t[t.length] = {
                        src: this[o.name],
                        trg: e.addColumn(o.name, o.creator)
                    }
                }
                for (var a = 0, s = t; a < s.length; a++)
                    for (var o = s[a], l = o.src, c = o.trg, u = 0, d = this.count; d > u; u++) c[u] = l[u];
                return e.seal()
            }, e.prototype.getBuilder = function(e) {
                for (var t = new r(e), n = 0, i = this.columns; n < i.length; n++) {
                    var o = i[n];
                    t.addColumn(o.name, o.creator)
                }
                return t
            }, e.prototype.getRawData = function() {
                var e = this;
                return this.columns.map(function(t) {
                    return e[t.name]
                })
            }, e
        }();
        e.DataTable = n;
        var r = function() {
            function e(e) {
                this.columns = [], this.count = e
            }
            return e.prototype.addColumn = function(e, n) {
                var r = n(this.count);
                return Object.defineProperty(this, e, {
                    enumerable: !0,
                    configurable: !1,
                    writable: !1,
                    value: r
                }), this.columns[this.columns.length] = new t(e, n), r
            }, e.prototype.getRawData = function() {
                var e = this;
                return this.columns.map(function(t) {
                    return e[t.name]
                })
            }, e.prototype.seal = function() {
                return new n(this.count, this)
            }, e
        }();
        e.DataTableBuilder = r,
            function(e) {
                e[e.Polymer = 0] = "Polymer", e[e.NonPolymer = 1] = "NonPolymer", e[e.Water = 2] = "Water", e[e.Unknown = 3] = "Unknown"
            }(e.EntityType || (e.EntityType = {}));
        e.EntityType;
        ! function(e) {
            e[e.None = 0] = "None", e[e.Single = 1] = "Single", e[e.Double = 2] = "Double", e[e.Triple = 3] = "Triple", e[e.Quadruple = 4] = "Quadruple"
        }(e.BondOrder || (e.BondOrder = {}));
        var i = (e.BondOrder, function() {
            function e(e) {
                this.id = e, this.map = new Map
            }
            return e.prototype.add = function(e, t, n, r) {
                void 0 === r && (r = !0);
                var i = this.map.get(e);
                if (void 0 !== i) {
                    var o = i.get(t);
                    void 0 === o && i.set(t, n)
                } else {
                    var a = new Map;
                    a.set(t, n), this.map.set(e, a)
                }
                r && this.add(t, e, n, !1)
            }, e
        }());
        e.ComponentBondInfoEntry = i;
        var o = function() {
            function e() {
                this.entries = new Map
            }
            return e.prototype.newEntry = function(e) {
                var t = new i(e);
                return this.entries.set(e, t), t
            }, e
        }();
        e.ComponentBondInfo = o;
        var a = function() {
            function e(e, t, n) {
                this.asymId = e, this.seqNumber = t, this.insCode = n
            }
            return e.areEqual = function(e, t, n, r, i) {
                return e.asymId === n[t] && e.seqNumber === r[t] && e.insCode === i[t]
            }, e.compare = function(e, t) {
                return e.asymId === t.asymId ? e.seqNumber === t.seqNumber ? e.insCode === t.insCode ? 0 : void 0 === e.insCode ? -1 : void 0 === t.insCode ? 1 : e.insCode < t.insCode ? -1 : 1 : e.seqNumber < t.seqNumber ? -1 : 1 : e.asymId < t.asymId ? -1 : 1
            }, e.compareResidue = function(e, t, n, r, i) {
                return e.asymId === n[t] ? e.seqNumber === r[t] ? e.insCode === i[t] ? 0 : void 0 === e.insCode ? -1 : void 0 === i[t] ? 1 : e.insCode < i[t] ? -1 : 1 : e.seqNumber < r[t] ? -1 : 1 : e.asymId < n[t] ? -1 : 1
            }, e
        }();
        e.PolyResidueIdentifier = a,
            function(e) {
                e[e.None = 0] = "None", e[e.Helix = 1] = "Helix", e[e.Sheet = 2] = "Sheet", e[e.AminoSeq = 3] = "AminoSeq", e[e.Strand = 4] = "Strand"
            }(e.SecondaryStructureType || (e.SecondaryStructureType = {}));
        var s = (e.SecondaryStructureType, function() {
            function e(e, t, n) {
                this.type = e, this.startResidueId = t, this.endResidueId = n, this.startResidueIndex = -1, this.endResidueIndex = -1
            }
            return Object.defineProperty(e.prototype, "length", {
                get: function() {
                    return this.endResidueIndex - this.startResidueIndex
                },
                enumerable: !0,
                configurable: !0
            }), e
        }());
        e.SecondaryStructureElement = s;
        var l = function() {
            function e(e, t, n, r, i) {
                this.spacegroupName = e, this.cellSize = t, this.cellAngles = n, this.toFracTransform = r, this.isNonStandardCrytalFrame = i
            }
            return e
        }();
        e.SymmetryInfo = l;
        var c = function() {
            function e(e, t, n) {
                this.id = e, this.name = t, this.operator = n
            }
            return e
        }();
        e.AssemblyOperator = c;
        var u = function() {
            function e(e, t, n) {
                this.name = e, this.operators = t, this.asymIds = n
            }
            return e
        }();
        e.AssemblyGen = u;
        var d = function() {
            function e(e, t) {
                this.operators = e, this.assemblies = t
            }
            return e
        }();
        e.AssemblyInfo = d;
        var p = function() {
            function t(e, t, n, r, i, o, a, s, l, c) {
                this.id = e, this.modelId = t, this.atoms = n, this.residues = r, this.chains = i, this.entities = o, this.componentBonds = a, this.secondaryStructure = s, this.symmetryInfo = l, this.assemblyInfo = c
            }
            return Object.defineProperty(t.prototype, "queryContext", {
                get: function() {
                    return this._queryContext ? this._queryContext : (this._queryContext = e.Queries.QueryContext.ofStructure(this), this._queryContext)
                },
                enumerable: !0,
                configurable: !0
            }), t.prototype.query = function(e) {
                return e(this.queryContext)
            }, t
        }();
        e.MoleculeModel = p;
        var h = function() {
            function e(e, t) {
                this.id = e, this.models = t
            }
            return e
        }();
        e.Molecule = h
    }(t = e.Structure || (e.Structure = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(t) {
            "use strict";
            var n = function() {
                function t() {}
                return t.getModelEndRow = function(e, t) {
                    var n = t.rowCount,
                        r = t.getColumnIndex("_atom_site.pdbx_PDB_model_num"),
                        i = 0,
                        o = t.columnCount,
                        a = e * o + r,
                        s = 0;
                    if (0 > r) return n;
                    for (s = e; n > s && (i = s * o, t.areTokensEqual(a, i + r)); s++);
                    return s
                }, t.buildModelAtomTable = function(n, r) {
                    for (var i = t.getModelEndRow(n, r), o = r.columnCount, a = new e.Structure.DataTableBuilder(i - n), s = a.addColumn("id", function(e) {
                            return new Int32Array(e)
                        }), l = r.getColumnIndex("_atom_site.id"), c = a.addColumn("x", function(e) {
                            return new Float32Array(e)
                        }), u = r.getColumnIndex("_atom_site.Cartn_x"), d = a.addColumn("y", function(e) {
                            return new Float32Array(e)
                        }), p = r.getColumnIndex("_atom_site.Cartn_y"), h = a.addColumn("z", function(e) {
                            return new Float32Array(e)
                        }), m = r.getColumnIndex("_atom_site.Cartn_z"), f = a.addColumn("altLoc", function(e) {
                            return []
                        }), g = r.getColumnIndex("_atom_site.label_alt_id"), y = a.addColumn("rowIndex", function(e) {
                            return new Int32Array(e)
                        }), v = a.addColumn("residueIndex", function(e) {
                            return new Int32Array(e)
                        }), b = a.addColumn("chainIndex", function(e) {
                            return new Int32Array(e)
                        }), w = a.addColumn("entityIndex", function(e) {
                            return new Int32Array(e)
                        }), x = a.addColumn("name", function(e) {
                            return []
                        }), S = r.getColumnIndex("_atom_site.label_atom_id"), E = a.addColumn("elementSymbol", function(e) {
                            return []
                        }), I = r.getColumnIndex("_atom_site.type_symbol"), C = a.addColumn("occupancy", function(e) {
                            return new Float32Array(e)
                        }), T = r.getColumnIndex("_atom_site.occupancy"), M = a.addColumn("tempFactor", function(e) {
                            return new Float32Array(e)
                        }), _ = r.getColumnIndex("_atom_site.B_iso_or_equiv"), A = r.getColumnIndex("_atom_site.label_seq_id"), P = r.getColumnIndex("_atom_site.label_asym_id"), k = r.getColumnIndex("_atom_site.label_entity_id"), R = r.getColumnIndex("_atom_site.pdbx_PDB_ins_code"), V = r.getColumnIndex("_atom_site.auth_seq_id"), D = r.getColumnIndex("_atom_site.pdbx_PDB_model_num"), L = A, F = P, H = R, B = V, O = k, z = 0, q = !1, N = !1, G = 0, j = 0, U = 0, W = n; i > W; W++) {
                        var X = W - n;
                        z = W * o, s[X] = r.getIntValueFromIndex(l, W), c[X] = r.getFloatValueFromIndex(u, W), d[X] = r.getFloatValueFromIndex(p, W), h[X] = r.getFloatValueFromIndex(m, W), x[X] = r.getStringValueFromIndex(S, W), E[X] = r.getStringValueFromIndex(I, W), f[X] = r.getStringValueFromIndex(g, W), C[X] = r.getFloatValueFromIndex(T, W), M[X] = r.getFloatValueFromIndex(_, W), q = !1, N = !1, q = r.isTokenUndefined(L) ? !r.areTokensEqual(B, z + V) : !r.areTokensEqual(L, z + A) || !r.areTokensEqual(H, z + R), q && (j++, L = z + A, B = z + V, H = z + R), r.areTokensEqual(F, z + P) || (N = !0, G++, F = z + P, q || (q = !0, j++, L = z + A, B = z + V, H = z + R)), r.areTokensEqual(O, z + k) || (U++, O = z + k, N || (N = !0, G++, F = z + P), q || (q = !0, j++, L = z + A, B = z + V, H = z + R)), y[X] = W, v[X] = j, b[X] = G, w[X] = U
                    }
                    var D = r.getColumnIndex("_atom_site.pdbx_PDB_model_num"),
                        $ = r.getStringValue("_atom_site.pdbx_PDB_model_num", n);
                    return 0 > D && ($ = "1"), {
                        atoms: a.seal(),
                        modelId: $,
                        endRow: i
                    }
                }, t.buildStructure = function(t, n) {
                    var r = n.count,
                        i = n.residueIndex,
                        o = n.chainIndex,
                        a = n.entityIndex,
                        s = new e.Structure.DataTableBuilder(n.residueIndex[n.count - 1] + 1),
                        l = new e.Structure.DataTableBuilder(n.chainIndex[n.count - 1] + 1),
                        c = new e.Structure.DataTableBuilder(n.entityIndex[n.count - 1] + 1),
                        u = s.addColumn("name", function(e) {
                            return []
                        }),
                        d = s.addColumn("seqNumber", function(e) {
                            return new Int32Array(e)
                        }),
                        p = s.addColumn("asymId", function(e) {
                            return []
                        }),
                        h = s.addColumn("authName", function(e) {
                            return []
                        }),
                        m = s.addColumn("authSeqNumber", function(e) {
                            return new Int32Array(e)
                        }),
                        f = s.addColumn("authAsymId", function(e) {
                            return []
                        }),
                        g = s.addColumn("insCode", function(e) {
                            return []
                        }),
                        y = s.addColumn("entityId", function(e) {
                            return []
                        }),
                        v = s.addColumn("isHet", function(e) {
                            return new Int8Array(e)
                        }),
                        b = s.addColumn("atomStartIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        w = s.addColumn("atomEndIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        x = s.addColumn("chainIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        S = s.addColumn("entityIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        E = l.addColumn("asymId", function(e) {
                            return []
                        }),
                        I = l.addColumn("entityId", function(e) {
                            return []
                        }),
                        C = l.addColumn("authAsymId", function(e) {
                            return []
                        }),
                        T = l.addColumn("atomStartIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        M = l.addColumn("atomEndIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        _ = l.addColumn("residueStartIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        A = l.addColumn("residueEndIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        P = l.addColumn("entityIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        k = c.addColumn("entityId", function(e) {
                            return []
                        }),
                        R = c.addColumn("entityType", function(e) {
                            return []
                        }),
                        V = c.addColumn("type", function(e) {
                            return []
                        }),
                        D = c.addColumn("atomStartIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        L = c.addColumn("atomEndIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        F = c.addColumn("residueStartIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        H = c.addColumn("residueEndIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        B = c.addColumn("chainStartIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        O = c.addColumn("chainEndIndex", function(e) {
                            return new Int32Array(e)
                        }),
                        z = t.getColumnIndex("_atom_site.label_comp_id"),
                        q = t.getColumnIndex("_atom_site.label_seq_id"),
                        N = t.getColumnIndex("_atom_site.label_asym_id"),
                        G = t.getColumnIndex("_atom_site.auth_comp_id"),
                        j = t.getColumnIndex("_atom_site.auth_seq_id"),
                        U = t.getColumnIndex("_atom_site.auth_asym_id"),
                        W = t.getColumnIndex("_atom_site.group_PDB"),
                        X = t.getColumnIndex("_atom_site.label_entity_id"),
                        $ = t.getColumnIndex("_atom_site.pdbx_PDB_ins_code"),
                        Y = 0,
                        Z = 0,
                        Q = 0,
                        J = 0,
                        K = 0,
                        ee = 0,
                        te = 0,
                        ne = 0,
                        re = 0,
                        ie = 0;
                    for (ie = 0; r > ie; ie++) i[ie] !== i[Y] && (u[te] = t.getStringValueFromIndex(z, Y), d[te] = t.getIntValueFromIndex(q, Y), p[te] = t.getStringValueFromIndex(N, Y), h[te] = t.getStringValueFromIndex(G, Y), m[te] = t.getIntValueFromIndex(j, Y), f[te] = t.getStringValueFromIndex(U, Y), g[te] = t.getStringValueFromIndex($, Y), y[te] = t.getStringValueFromIndex(X, Y), v[te] = t.valueEqual(W, Y, "HETATM") ? 1 : 0, b[te] = Y, w[te] = ie, x[te] = ne, S[te] = re, te++, Y = ie), o[ie] !== o[Z] && (E[ne] = t.getStringValueFromIndex(N, Z), C[ne] = t.getStringValueFromIndex(U, Z), I[ne] = t.getStringValueFromIndex(X, Z), _[ne] = ee, A[ne] = te, T[ne] = Z, M[ne] = ie, P[ne] = re, ne++, Z = ie, ee = te), a[ie] !== a[Q] && (k[re] = t.getStringValueFromIndex(X, Q), R[re] = e.Structure.EntityType.Unknown, V[re] = "unknown", D[re] = Q, L[re] = ie, F[re] = K, H[re] = te, B[re] = J, O[re] = ne, re++, Q = ie, J = ne, K = te);
                    return k[re] = t.getStringValueFromIndex(X, Q), R[re] = e.Structure.EntityType.Unknown, V[re] = "unknown", D[re] = Q, L[re] = ie, F[re] = K, H[re] = te + 1, B[re] = J, O[re] = ne + 1, E[ne] = t.getStringValueFromIndex(N, Z), C[ne] = t.getStringValueFromIndex(U, Z), I[ne] = t.getStringValueFromIndex(X, Z), _[ne] = ee, A[ne] = te + 1, T[ne] = Z, M[ne] = ie, P[ne] = re, u[te] = t.getStringValueFromIndex(z, Y), d[te] = t.getIntValueFromIndex(q, Y), p[te] = t.getStringValueFromIndex(N, Y), h[te] = t.getStringValueFromIndex(G, Y), m[te] = t.getIntValueFromIndex(j, Y), f[te] = t.getStringValueFromIndex(U, Y), g[te] = t.getStringValueFromIndex($, Y), b[te] = Y, w[te] = ie, x[te] = ne, S[te] = re, v[te] = t.valueEqual(W, Y, "HETATM") ? 1 : 0, {
                        residues: s.seal(),
                        chains: l.seal(),
                        entities: c.seal()
                    }
                }, t.assignEntityTypes = function(t, n) {
                    var r;
                    for (r = 0; r < n.count; r++) n.entityType[r] = e.Structure.EntityType.Unknown;
                    if (t) {
                        var i, o = {},
                            a = {};
                        for (r = 0; r < t.rowCount; r++) {
                            var s = (t.getStringValue("_entity.type", r) || "").toLowerCase();
                            switch (s) {
                                case "polymer":
                                    i = e.Structure.EntityType.Polymer;
                                    break;
                                case "non-polymer":
                                    i = e.Structure.EntityType.NonPolymer;
                                    break;
                                case "water":
                                    i = e.Structure.EntityType.Water;
                                    break;
                                default:
                                    i = e.Structure.EntityType.Unknown
                            }
                            var l = t.getStringValue("_entity.id", r);
                            o[l] = i, a[l] = "" !== s ? s : "unknown"
                        }
                        for (r = 0; r < n.count; r++) i = o[n.entityId[r]], void 0 !== i && (n.entityType[r] = i, n.type[r] = a[n.entityId[r]])
                    }
                }, t.residueIdfromColumns = function(t, n, r, i, o) {
                    return new e.Structure.PolyResidueIdentifier(t.getStringValue(r, n), t.getIntValue(i, n), t.getStringValue(o, n))
                }, t.isResidueAminoSeq = function(t, n, r, i) {
                    if (r.entityType[n.entityIndex[i]] !== e.Structure.EntityType.Polymer) return !1;
                    for (var o = !1, a = !1, s = t.name, l = 0, c = n.atomStartIndex[i], u = n.atomEndIndex[i]; u > c; c++) {
                        var d = s[c];
                        if (o || "CA" !== d ? a || "O" !== d || (a = !0, l++) : (o = !0, l++), 2 === l) break
                    }
                    return o && a || o && !n.isHet[i]
                }, t.isResidueNucleotide = function(n, r, i, o) {
                    if (t.aminoAcidNames[r.name[o]] || i.entityType[r.entityIndex[o]] !== e.Structure.EntityType.Polymer) return !1;
                    for (var a = !1, s = !1, l = !1, c = n.name, u = 0, d = r.atomStartIndex[o], p = r.atomEndIndex[o]; p > d; d++) {
                        var h = c[d];
                        if (a || "O5'" !== h ? s || "C3'" !== h ? l || "N3" !== h || (l = !0, u++) : (s = !0, u++) : (a = !0, u++), 3 === u) break
                    }
                    return a && s && l
                }, t.analyzeSecondaryStructure = function(n, r, i, o, a, s) {
                    for (var l = r.asymId, c = r.entityIndex, u = e.Structure.SecondaryStructureType.None, d = o, p = o, h = a; h > d;) {
                        if (t.isResidueNucleotide(n, r, i, d)) {
                            for (p = d + 1; h > p && l[d] === l[p] && c[d] === c[p] && t.isResidueNucleotide(n, r, i, p);) p++;
                            u = e.Structure.SecondaryStructureType.Strand
                        } else if (t.isResidueAminoSeq(n, r, i, d)) {
                            for (p = d + 1; h > p && l[d] === l[p] && c[d] === c[p] && t.isResidueAminoSeq(n, r, i, p);) p++;
                            u = e.Structure.SecondaryStructureType.AminoSeq
                        } else {
                            for (p = d + 1; h > p && l[d] === l[p] && c[d] === c[p] && !t.isResidueNucleotide(n, r, i, p) && !t.isResidueAminoSeq(n, r, i, p);) p++;
                            u = e.Structure.SecondaryStructureType.None
                        }
                        var m = new e.Structure.SecondaryStructureElement(u, new e.Structure.PolyResidueIdentifier(r.asymId[d], r.seqNumber[d], r.insCode[d]), new e.Structure.PolyResidueIdentifier(r.asymId[p - 1], r.seqNumber[p - 1], r.insCode[p - 1]));
                        m.startResidueIndex = d, m.endResidueIndex = p, s[s.length] = m, d = p
                    }
                }, t.updateSSIndicesAndFilterEmpty = function(t, n, r) {
                    for (var i, o = n.residues, a = o.count, s = o.asymId, l = o.seqNumber, c = o.insCode, u = "", d = {}, p = {}, h = 0, m = t; h < m.length; h++) {
                        var f = m[h];
                        u = f.startResidueId.asymId + " " + f.startResidueId.seqNumber, f.startResidueId.insCode && (u += " " + f.startResidueId.insCode), d[u] = f, u = f.endResidueId.asymId + " " + f.endResidueId.seqNumber, f.endResidueId.insCode && (u += " " + f.endResidueId.insCode), p[u] = f
                    }
                    for (var g = 0; a > g; g++) u = s[g] + " " + l[g], c[g] && (u += " " + c[g]), i = d[u], i && (i.startResidueIndex = g), i = p[u], i && (i.endResidueIndex = g + 1);
                    i && (i.endResidueIndex = a);
                    for (var y = 0, v = t; y < v.length; y++) {
                        var f = v[y];
                        f.type === e.Structure.SecondaryStructureType.Sheet && f.length < 3 || f.endResidueIndex >= 0 && f.startResidueIndex >= 0 && (r[r.length] = f)
                    }
                    for (var g = 0; g < r.length - 1; g++) r[g + 1].startResidueIndex - r[g].endResidueIndex === -1 && r[g + 1].startResidueIndex++
                }, t.getSecondaryStructureInfo = function(n, r, i) {
                    var o, a = [],
                        s = [],
                        l = [],
                        c = n.getCategory("_struct_conf"),
                        u = n.getCategory("_struct_sheet_range");
                    if (c)
                        for (o = 0; o < c.rowCount; o++) a[a.length] = new e.Structure.SecondaryStructureElement(e.Structure.SecondaryStructureType.Helix, t.residueIdfromColumns(c, o, "_struct_conf.beg_label_asym_id", "_struct_conf.beg_label_seq_id", "_struct_conf.pdbx_beg_PDB_ins_code"), t.residueIdfromColumns(c, o, "_struct_conf.end_label_asym_id", "_struct_conf.end_label_seq_id", "_struct_conf.pdbx_end_PDB_ins_code"));
                    if (u)
                        for (o = 0; o < u.rowCount; o++) a[a.length] = new e.Structure.SecondaryStructureElement(e.Structure.SecondaryStructureType.Sheet, t.residueIdfromColumns(u, o, "_struct_sheet_range.beg_label_asym_id", "_struct_sheet_range.beg_label_seq_id", "_struct_sheet_range.pdbx_beg_PDB_ins_code"), t.residueIdfromColumns(u, o, "_struct_sheet_range.end_label_asym_id", "_struct_sheet_range.end_label_seq_id", "_struct_sheet_range.pdbx_end_PDB_ins_code"));
                    a.length > 0 && t.updateSSIndicesAndFilterEmpty(a, i, s), s.sort(function(e, t) {
                        return e.startResidueIndex - t.startResidueIndex
                    });
                    var d = i.residues,
                        p = d.count;
                    if (0 === s.length) return t.analyzeSecondaryStructure(r, d, i.entities, 0, p, l), l;
                    var h = s.length - 1;
                    for (s[0].startResidueIndex > 0 && t.analyzeSecondaryStructure(r, d, i.entities, 0, s[0].startResidueIndex, l), o = 0; h > o; o++) l[l.length] = s[o], s[o + 1].startResidueIndex - s[o].endResidueIndex > 0 && t.analyzeSecondaryStructure(r, d, i.entities, s[o].endResidueIndex, s[o + 1].startResidueIndex, l);
                    return l[l.length] = s[h], s[h].endResidueIndex < p && t.analyzeSecondaryStructure(r, d, i.entities, s[h].endResidueIndex, p, l), l
                }, t.parseOperatorList = function(e) {
                    for (var t, n = /\(?([^\(\)]+)\)?]*/g, r = [], i = []; t = n.exec(e);) r[r.length] = t[1];
                    return r.forEach(function(e) {
                        var t = [];
                        e.split(",").forEach(function(e) {
                            var n = e.indexOf("-");
                            if (n > 0)
                                for (var r = parseInt(e.substring(0, n)), i = parseInt(e.substr(n + 1)), o = r; i >= o; o++) t[t.length] = o.toString();
                            else t[t.length] = e.trim()
                        }), i[i.length] = t
                    }), i
                }, t.getAssemblyInfo = function(t) {
                    var n = t.getCategory("_pdbx_struct_assembly"),
                        r = t.getCategory("_pdbx_struct_assembly_gen"),
                        i = t.getCategory("_pdbx_struct_oper_list");
                    if (!n || !r || !i) return null;
                    var o, a = {},
                        s = [];
                    for (o = 0; o < r.rowCount; o++) s[s.length] = new e.Structure.AssemblyGen(r.getStringValue("_pdbx_struct_assembly_gen.assembly_id", o), this.parseOperatorList(r.getStringValue("_pdbx_struct_assembly_gen.oper_expression", o)), r.getStringValue("_pdbx_struct_assembly_gen.asym_id_list", o).split(","));
                    for (o = 0; o < i.rowCount; o++) {
                        var l = i.getTransform(o, "_pdbx_struct_oper_list.matrix", "_pdbx_struct_oper_list.vector");
                        if (!l) return null;
                        var c = new e.Structure.AssemblyOperator(i.getStringValue("_pdbx_struct_oper_list.id", o), i.getStringValue("_pdbx_struct_oper_list.name", o), l);
                        a[c.id] = c
                    }
                    return new e.Structure.AssemblyInfo(a, s)
                }, t.getSymmetryInfo = function(t) {
                    var n = t.getCategory("_cell"),
                        r = t.getCategory("_symmetry"),
                        i = t.getCategory("_atom_sites"),
                        o = "",
                        a = [1, 1, 1],
                        s = [90, 90, 90],
                        l = e.Geometry.LinearAlgebra.Matrix4.identity(),
                        c = !1;
                    if (!n || !r) return null;
                    if (o = r.getStringValue("_symmetry.space_group_name_H-M"), a = [n.getFloatValue("_cell.length_a"), n.getFloatValue("_cell.length_b"), n.getFloatValue("_cell.length_c")], s = [n.getFloatValue("_cell.angle_alpha"), n.getFloatValue("_cell.angle_beta"), n.getFloatValue("_cell.angle_gamma")], r.isValueUndefined("_symmetry.space_group_name_H-M") || n.isValueUndefined("_cell.length_a") || n.isValueUndefined("_cell.length_b") || n.isValueUndefined("_cell.length_c") || n.isValueUndefined("_cell.angle_alpha") || n.isValueUndefined("_cell.angle_beta") || n.isValueUndefined("_cell.angle_gamma")) return null;
                    var u = function(e) {
                            return e * e
                        },
                        d = function(e) {
                            return e * Math.PI / 180
                        },
                        p = a[0],
                        h = a[1],
                        m = a[2],
                        f = d(s[0]),
                        g = d(s[1]),
                        y = d(s[2]),
                        v = p * h * m * Math.sqrt(1 - u(Math.cos(f)) - u(Math.cos(g)) - u(Math.cos(y)) + 2 * Math.cos(f) * Math.cos(g) * Math.cos(y)),
                        b = e.Geometry.LinearAlgebra.Matrix4.ofRows([
                            [p, h * Math.cos(y), m * Math.cos(g), 0],
                            [0, h * Math.sin(y), m * (Math.cos(f) - Math.cos(g) * Math.cos(y)) / Math.sin(y), 0],
                            [0, 0, v / (p * h * Math.sin(y)), 0],
                            [0, 0, 0, 1]
                        ]),
                        w = e.Geometry.LinearAlgebra.Matrix4.identity();
                    if (e.Geometry.LinearAlgebra.Matrix4.invert(w, b), i) {
                        var x = i.getTransform(0, "_atom_sites.fract_transf_matrix", "_atom_sites.fract_transf_vector");
                        x && (l = x, e.Geometry.LinearAlgebra.Matrix4.areEqual(w, x, 1e-4) || (c = !0))
                    } else l = w;
                    return new e.Structure.SymmetryInfo(o, a, s, l, c)
                }, t.getComponentBonds = function(t) {
                    if (!t || !t.rowCount) return void 0;
                    for (var n = new e.Structure.ComponentBondInfo, r = t.getColumnIndex("_chem_comp_bond.comp_id"), i = t.getColumnIndex("_chem_comp_bond.atom_id_1"), o = t.getColumnIndex("_chem_comp_bond.atom_id_2"), a = t.getColumnIndex("_chem_comp_bond.value_order"), s = t.rowCount, l = n.newEntry(t.getStringValueFromIndex(r, 0)), c = 0; s > c; c++) {
                        var u = t.getStringValueFromIndex(r, c),
                            d = t.getStringValueFromIndex(i, c),
                            p = t.getStringValueFromIndex(o, c),
                            h = t.getStringValueFromIndex(a, c);
                        l.id !== u && (l = n.newEntry(u));
                        var m;
                        switch (h.toLowerCase()) {
                            case "sing":
                                m = e.Structure.BondOrder.Single;
                                break;
                            case "doub":
                            case "delo":
                                m = e.Structure.BondOrder.Double;
                                break;
                            case "trip":
                                m = e.Structure.BondOrder.Triple;
                                break;
                            case "quad":
                                m = e.Structure.BondOrder.Quadruple;
                                break;
                            default:
                                m = e.Structure.BondOrder.Single
                        }
                        l.add(d, p, m)
                    }
                    return n
                }, t.getModel = function(n, r) {
                    var i, o = t.buildModelAtomTable(n, r.getCategory("_atom_site")),
                        a = o.atoms,
                        s = o.modelId,
                        l = o.endRow,
                        c = t.buildStructure(r.getCategory("_atom_site"), a),
                        u = r.getCategory("_entry");
                    return i = u && u.getColumnIndex("_entry.id") >= 0 ? u.getStringValue("_entry.id") : r.header, t.assignEntityTypes(r.getCategory("_entity"), c.entities), {
                        model: new e.Structure.MoleculeModel(i, s, a, c.residues, c.chains, c.entities, t.getComponentBonds(r.getCategory("_chem_comp_bond")), t.getSecondaryStructureInfo(r, a, c), t.getSymmetryInfo(r), t.getAssemblyInfo(r)),
                        endRow: l
                    }
                }, t.ofDataBlock = function(n) {
                    var r, i = [],
                        o = n.getCategory("_atom_site"),
                        a = 0,
                        s = n.getCategory("_entry");
                    for (r = s && s.getColumnIndex("_entry.id") >= 0 ? s.getStringValue("_entry.id") : n.header; a < o.rowCount;) {
                        var l = t.getModel(a, n),
                            c = l.model,
                            u = l.endRow;
                        i.push(c), a = u
                    }
                    return new e.Structure.Molecule(r, i)
                }, t.aminoAcidNames = {
                    ALA: !0,
                    ARG: !0,
                    ASP: !0,
                    CYS: !0,
                    GLN: !0,
                    GLU: !0,
                    GLY: !0,
                    HIS: !0,
                    ILE: !0,
                    LEU: !0,
                    LYS: !0,
                    MET: !0,
                    PHE: !0,
                    PRO: !0,
                    SER: !0,
                    THR: !0,
                    TRP: !0,
                    TYR: !0,
                    VAL: !0,
                    ASN: !0,
                    PYL: !0,
                    SEC: !0
                }, t
            }();
            t.mmCif = n
        }(n = t.Cif || (t.Cif = {}))
    }(t = e.Formats || (e.Formats = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(e) {
            "use strict";
            var t = function() {
                    function e(e) {
                        this.count = 0, this.tokens = new Int32Array(e), this.tokensLenMinus2 = e - 2 | 0
                    }
                    return e.prototype.resize = function() {
                        var e = new Int32Array(1.61 * this.tokens.length | 0);
                        e.set(this.tokens), this.tokens = e, this.tokensLenMinus2 = e.length - 2 | 0
                    }, e.prototype.addToken = function(e, t) {
                        this.count >= this.tokensLenMinus2 && this.resize(), this.tokens[this.count++] = e, this.tokens[this.count++] = t
                    }, e
                }(),
                n = function() {
                    function e(e) {
                        this.data = e, this.length = e.length, this.position = 0, this.currentTokenStart = 0, this.currentTokenEnd = 0, this.currentTokenType = 6, this.currentLineNumber = 1, this.isEscaped = !1
                    }
                    return e.prototype.eatValue = function() {
                        for (; this.position < this.length;) switch (this.data.charCodeAt(this.position)) {
                            case 9:
                            case 10:
                            case 13:
                            case 32:
                                return void(this.currentTokenEnd = this.position);
                            default:
                                ++this.position
                        }
                        this.currentTokenEnd = this.position
                    }, e.prototype.eatEscaped = function(e) {
                        var t, n;
                        for (++this.position; this.position < this.length;)
                            if (n = this.data.charCodeAt(this.position), n === e) switch (t = this.data.charCodeAt(this.position + 1)) {
                                case 9:
                                case 10:
                                case 13:
                                case 32:
                                    return this.currentTokenStart++, this.currentTokenEnd = this.position, this.isEscaped = !0, void++this.position;
                                default:
                                    if (void 0 === t) return this.currentTokenStart++, this.currentTokenEnd = this.position, this.isEscaped = !0, void++this.position;
                                    ++this.position
                            } else {
                                if (10 === n || 13 === n) return void(this.currentTokenEnd = this.position);
                                ++this.position
                            }
                            this.currentTokenEnd = this.position
                    }, e.prototype.eatMultiline = function() {
                        for (var e, t = 59, n = this.position; n < this.length;) {
                            if (e = this.data.charCodeAt(n), 59 === e && (10 === t || 13 === t)) {
                                for (this.position = n + 1, this.currentTokenStart++, n--, e = this.data.charCodeAt(n); 10 === e || 13 === e;) n--, e = this.data.charCodeAt(n);
                                return this.currentTokenEnd = n + 1, void(this.isEscaped = !0)
                            }
                            13 === e ? this.currentLineNumber++ : 10 === e && 13 !== t && this.currentLineNumber++, t = e, ++n
                        }
                        return this.position = n, t
                    }, e.prototype.skipCommentLine = function() {
                        for (; this.position < this.length;) {
                            var e = this.data.charCodeAt(this.position);
                            if (10 === e || 13 === e) return;
                            ++this.position
                        }
                    }, e.prototype.skipWhitespace = function() {
                        for (var e = 10; this.position < this.length;) {
                            var t = this.data.charCodeAt(this.position);
                            switch (t) {
                                case 9:
                                case 32:
                                    e = t, ++this.position;
                                    break;
                                case 10:
                                    13 !== e && ++this.currentLineNumber, e = t, ++this.position;
                                    break;
                                case 13:
                                    e = t, ++this.position, ++this.currentLineNumber;
                                    break;
                                default:
                                    return e
                            }
                        }
                        return e
                    }, e.prototype.isData = function() {
                        var e = this.data.charCodeAt(this.currentTokenStart);
                        return 68 !== e && 100 !== e ? !1 : (e = this.data.charCodeAt(this.currentTokenStart + 1), 65 !== e && 97 !== e ? !1 : (e = this.data.charCodeAt(this.currentTokenStart + 2), 84 !== e && 116 !== e ? !1 : (e = this.data.charCodeAt(this.currentTokenStart + 3), 65 !== e && 97 !== e ? !1 : !0)))
                    }, e.prototype.isSave = function() {
                        var e = this.data.charCodeAt(this.currentTokenStart);
                        return 83 !== e && 115 !== e ? !1 : (e = this.data.charCodeAt(this.currentTokenStart + 1), 65 !== e && 97 !== e ? !1 : (e = this.data.charCodeAt(this.currentTokenStart + 2), 86 !== e && 118 !== e ? !1 : (e = this.data.charCodeAt(this.currentTokenStart + 3), 69 !== e && 101 !== e ? !1 : !0)))
                    }, e.prototype.isLoop = function() {
                        if (this.currentTokenEnd - this.currentTokenStart !== 5) return !1;
                        var e = this.data.charCodeAt(this.currentTokenStart);
                        return 76 !== e && 108 !== e ? !1 : (e = this.data.charCodeAt(this.currentTokenStart + 1), 79 !== e && 111 !== e ? !1 : (e = this.data.charCodeAt(this.currentTokenStart + 2), 79 !== e && 111 !== e ? !1 : (e = this.data.charCodeAt(this.currentTokenStart + 3), 80 !== e && 112 !== e ? !1 : !0)))
                    }, e.prototype.isNamespace = function(e, t) {
                        var n, r = t - e,
                            i = this.currentTokenStart - e,
                            o = this.currentTokenEnd - this.currentTokenStart;
                        if (r > o) return !1;
                        for (n = e; t > n; ++n)
                            if (this.data.charCodeAt(n) !== this.data.charCodeAt(n + i)) return !1;
                        return r === o ? !0 : 46 === this.data.charCodeAt(n + i) ? !0 : !1
                    }, e.prototype.getNamespaceEnd = function() {
                        for (var e = this.currentTokenStart; e < this.currentTokenEnd; ++e)
                            if (46 === this.data.charCodeAt(e)) return e;
                        return e
                    }, e.prototype.getNamespace = function(e) {
                        return this.data.substring(this.currentTokenStart, e)
                    }, e.prototype.getTokenString = function() {
                        return this.data.substring(this.currentTokenStart, this.currentTokenEnd)
                    }, e.prototype.moveNextInternal = function() {
                        var e, t = this.skipWhitespace();
                        if (this.position >= this.length) return void(this.currentTokenType = 6);
                        switch (this.currentTokenStart = this.position, this.currentTokenEnd = this.position, this.isEscaped = !1, e = this.data.charCodeAt(this.position)) {
                            case 35:
                                this.skipCommentLine(), this.currentTokenType = 5;
                                break;
                            case 34:
                            case 39:
                                this.eatEscaped(e), this.currentTokenType = 3;
                                break;
                            case 59:
                                10 === t || 13 === t ? this.eatMultiline() : this.eatValue(), this.currentTokenType = 3;
                                break;
                            default:
                                this.eatValue(), this.isEscaped ? this.currentTokenType = 3 : 95 === this.data.charCodeAt(this.currentTokenStart) ? this.currentTokenType = 4 : this.currentTokenEnd - this.currentTokenStart >= 5 && 95 === this.data.charCodeAt(this.currentTokenStart + 4) ? this.isData() ? this.currentTokenType = 0 : this.isSave() ? this.currentTokenType = 1 : this.isLoop() ? this.currentTokenType = 2 : this.currentTokenType = 3 : this.currentTokenType = 3
                        }
                    }, e.prototype.moveNext = function() {
                        for (this.moveNextInternal(); 5 === this.currentTokenType;) this.moveNextInternal()
                    }, e
                }(),
                r = function() {
                    function e(e, t, n, r, i) {
                        this.hasError = e, this.errorMessage = t, this.errorLine = n, this.warnings = r, this.result = i
                    }
                    return e.error = function(t, n) {
                        return void 0 === n && (n = -1), new e(!0, t, n, [], void 0)
                    }, e.success = function(t, n) {
                        return void 0 === n && (n = []), new e(!1, "", -1, n, t)
                    }, e
                }();
            e.ParserResult = r;
            var i = function() {
                function i() {}
                return i.handleSingle = function(n, r) {
                    for (var i, o = n.currentTokenStart, a = n.getNamespaceEnd(), s = n.getNamespace(a), l = [], c = new t(512), u = 0; 4 === n.currentTokenType && n.isNamespace(o, a);) {
                        if (i = n.getTokenString(), n.moveNext(), 3 !== n.currentTokenType) return {
                            hasError: !0,
                            errorLine: n.currentLineNumber,
                            errorMessage: "Expected value."
                        };
                        l[l.length] = i, c.addToken(n.currentTokenStart, n.currentTokenEnd), u++, n.moveNext()
                    }
                    return r.addCategory(new e.Category(r, s, o, n.currentTokenStart, l, c.tokens, u)), {
                        hasError: !1,
                        errorLine: 0,
                        errorMessage: ""
                    }
                }, i.handleLoop = function(n, r) {
                    var i = n.currentTokenStart,
                        o = n.currentLineNumber;
                    n.moveNext();
                    for (var a = n.getNamespace(n.getNamespaceEnd()), s = [], l = new t("_atom_site" === a ? r.data.length / 1.85 | 0 : 1024), c = 0; 4 === n.currentTokenType;) s[s.length] = n.getTokenString(), n.moveNext();
                    for (; 3 === n.currentTokenType;) l.addToken(n.currentTokenStart, n.currentTokenEnd), c++, n.moveNext();
                    return c % s.length !== 0 ? {
                        hasError: !0,
                        errorLine: n.currentLineNumber,
                        errorMessage: "The number of values for loop starting at line " + o + " is not a multiple of the number of columns."
                    } : (r.addCategory(new e.Category(r, a, i, n.currentTokenStart, s, l.tokens, c)), {
                        hasError: !1,
                        errorLine: 0,
                        errorMessage: ""
                    })
                }, i.error = function(e, t) {
                    return r.error(t, e)
                }, i.result = function(e) {
                    return r.success(e)
                }, i.parse = function(t) {
                    var r, o, a, s = new n(t),
                        l = new e.File(t),
                        c = new e.Block(l, "default"),
                        u = new e.Block(l, "empty"),
                        d = !1;
                    for (s.moveNext(); 6 !== s.currentTokenType;) {
                        var p = s.currentTokenType;
                        if (0 === p) {
                            if (d) return i.error(s.currentLineNumber, "Unexpected data block inside a save frame.");
                            c.categoryList.length > 0 && l.addBlock(c), c = new e.Block(l, t.substring(s.currentTokenStart + 5, s.currentTokenEnd)), s.moveNext()
                        } else if (1 === p) {
                            if (o = t.substring(s.currentTokenStart + 5, s.currentTokenEnd), 0 === o.length) u.categoryList.length > 0 && (a = c.additionalData.saveFrames, a || (a = [], c.additionalData.saveFrames = a), a[a.length] = u), d = !1;
                            else {
                                if (d) return i.error(s.currentLineNumber, "Save frames cannot be nested.");
                                d = !0, u = new e.Block(l, o)
                            }
                            s.moveNext()
                        } else if (2 === p) {
                            if (r = i.handleLoop(s, d ? u : c), r.hasError) return i.error(r.errorLine, r.errorMessage)
                        } else {
                            if (4 !== p) return i.error(s.currentLineNumber, "Unexpected token. Expected data_, loop_, or data name.");
                            if (r = i.handleSingle(s, d ? u : c), r.hasError) return i.error(r.errorLine, r.errorMessage)
                        }
                    }
                    return d ? i.error(s.currentLineNumber, "Unfinished save frame (`" + u.header + "`).") : (c.categoryList.length > 0 && l.addBlock(c), i.result(l))
                }, i
            }();
            e.Parser = i
        }(t = e.Cif || (e.Cif = {}))
    }(t = e.Formats || (e.Formats = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(e) {
            var t = function() {
                function e(e, t, n, r, i, o, a, s, l, c) {
                    this.cellSize = e, this.cellAngles = t, this.origin = n, this.hasSkewMatrix = r, this.skewMatrix = i, this.data = o, this.basis = s, this.startOffset = l, this.dataDimensions = a, this.valuesInfo = c
                }
                return e
            }();
            e.ElectronDensityData = t;
            var n = function() {
                function e(e, t, n, r, i) {
                    this.hasError = e, this.errorMessage = t, this.errorLine = n, this.warnings = r, this.result = i
                }
                return e.error = function(t, n) {
                    return void 0 === n && (n = -1), new e(!0, t, n, [], void 0)
                }, e.success = function(t, n) {
                    return void 0 === n && (n = []), new e(!1, "", -1, n, t)
                }, e
            }();
            e.ParserResult = n;
            var r = function() {
                function e() {}
                return e.getArray = function(e, t, n) {
                    for (var r = [], i = 0; n > i; i++) r[i] = e(t + i);
                    return r
                }, e.parse = function(r, i) {
                    void 0 === i && (i = {
                        normalize: !0
                    });
                    var o = 1024,
                        a = !1,
                        s = new DataView(r, 0, o),
                        l = [],
                        c = s.getInt32(12, !1);
                    if (2 !== c && (a = !0, c = s.getInt32(12, !0), 2 !== c)) return n.error("Only CCP4 modes 0 and 2 are supported.");
                    var u = function(e) {
                            return s.getInt32(4 * e, a)
                        },
                        d = function(e) {
                            return s.getFloat32(4 * e, a)
                        },
                        p = {
                            extent: e.getArray(u, 0, 3),
                            mode: c,
                            nxyzStart: e.getArray(u, 4, 3),
                            grid: e.getArray(u, 7, 3),
                            cellDimensions: e.getArray(d, 10, 3),
                            cellAngles: e.getArray(d, 13, 3),
                            crs2xyz: e.getArray(u, 16, 3),
                            min: d(19),
                            max: d(20),
                            mean: d(21),
                            symBytes: u(23),
                            skewFlag: u(24),
                            skewMatrix: e.getArray(d, 25, 9),
                            skewTranslation: e.getArray(d, 34, 3),
                            origin2k: e.getArray(d, 49, 3)
                        },
                        h = r.byteLength - 4 * p.extent[0] * p.extent[1] * p.extent[2];
                    if (h !== o + p.symBytes)
                        if (h === o) l.push("File contains bogus symmetry record.");
                        else {
                            if (o > h) return n.error("File appears truncated and doesn't match header.");
                            if (!(h > o && 1048576 > h)) return n.error("File is MUCH larger than expected and doesn't match header.");
                            h = o + p.symBytes, l.push("File is larger than expected and doesn't match header. Continuing file load, good luck!")
                        }
                    0 === p.grid[0] && p.extent[0] > 0 && (p.grid[0] = p.extent[0] - 1, l.push("Fixed X interval count.")), 0 === p.grid[1] && p.extent[1] > 0 && (p.grid[1] = p.extent[1] - 1, l.push("Fixed Y interval count.")), 0 === p.grid[2] && p.extent[2] > 0 && (p.grid[2] = p.extent[2] - 1, l.push("Fixed Z interval count.")), 0 === p.crs2xyz[0] && 0 === p.crs2xyz[1] && 0 === p.crs2xyz[2] && (l.push("All crs2xyz records are zero. Setting crs2xyz to 1, 2, 3."), p.crs2xyz = [1, 2, 3]), 0 === p.cellDimensions[0] && 0 === p.cellDimensions[1] && 0 === p.cellDimensions[2] && (l.push("Cell dimensions are all zero. Setting to 1.0, 1.0, 1.0. Map file will not align with other structures."), p.cellDimensions[0] = 1, p.cellDimensions[1] = 1, p.cellDimensions[2] = 1);
                    var m = Math.PI / 180 * p.cellAngles[0],
                        f = Math.PI / 180 * p.cellAngles[1],
                        g = Math.PI / 180 * p.cellAngles[2],
                        y = p.cellDimensions[0] / p.grid[0],
                        v = p.cellDimensions[1] / p.grid[1],
                        b = p.cellDimensions[2] / p.grid[2],
                        w = Math.cos(f),
                        x = (Math.cos(m) - Math.cos(f) * Math.cos(g)) / Math.sin(g),
                        S = Math.sqrt(1 - w * w - x * x),
                        E = [y, 0, 0],
                        I = [Math.cos(g) * v, Math.sin(g) * v, 0],
                        C = [w * b, x * b, S * b],
                        T = [0, 0, 0];
                    T[p.crs2xyz[0] - 1] = 0, T[p.crs2xyz[1] - 1] = 1, T[p.crs2xyz[2] - 1] = 2;
                    var M;
                    M = 0 === p.origin2k[0] && 0 === p.origin2k[1] && 0 === p.origin2k[2] ? [E[0] * p.nxyzStart[T[0]] + I[0] * p.nxyzStart[T[1]] + C[0] * p.nxyzStart[T[2]], I[1] * p.nxyzStart[T[1]] + C[1] * p.nxyzStart[T[2]], C[2] * p.nxyzStart[T[2]]] : [p.origin2k[T[0]], p.origin2k[T[1]], p.origin2k[T[2]]];
                    var _, A, P = [p.extent[T[0]], p.extent[T[1]], p.extent[T[2]]],
                        k = new Float32Array(16);
                    for (_ = 0; 3 > _; _++) {
                        for (A = 0; 3 > A; A++) k[4 * A + _] = p.skewMatrix[3 * _ + A];
                        k[12 + _] = p.skewTranslation[_]
                    }
                    var R = 13330 === new Uint16Array(new Uint8Array([18, 52]).buffer)[0],
                        V = a === R ? e.readRawData1(new Float32Array(r, o + p.symBytes, P[0] * P[1] * P[2]), a, P, p.extent, T, p.mean) : e.readRawData(new DataView(r, o + p.symBytes), a, P, p.extent, T, p.mean),
                        D = i.normalize ? e.normalizeData(V.data, p.mean, V.sigma) : {
                            min: p.min,
                            max: p.max
                        },
                        L = new t(p.cellDimensions, p.cellAngles, M, 0 !== p.skewFlag, k, V.data, P, {
                            x: E,
                            y: I,
                            z: C
                        }, [p.nxyzStart[T[0]], p.nxyzStart[T[1]], p.nxyzStart[T[2]]], {
                            min: D.min,
                            max: D.max,
                            mean: p.mean,
                            sigma: V.sigma
                        });
                    return n.success(L, l)
                }, e.normalizeData = function(e, t, n) {
                    for (var r = Number.POSITIVE_INFINITY, i = Number.NEGATIVE_INFINITY, o = 0, a = e.length; a > o; o++) {
                        var s = (e[o] - t) / n;
                        e[o] = s, r > s && (r = s), s > i && (i = s)
                    }
                    return {
                        min: r,
                        max: i
                    }
                }, e.readRawData1 = function(e, t, n, r, i, o) {
                    var a, s, l, c, u, d, p, h, m = new Float32Array(n[0] * n[1] * n[2]),
                        f = [0, 0, 0],
                        g = 0,
                        y = .1,
                        v = 0,
                        b = .1,
                        w = i[0],
                        x = i[1],
                        S = i[2];
                    for (a = r[0], s = r[1], l = r[2], p = n[0], h = n[0] * n[1], d = 0; l > d; d++)
                        for (f[2] = d, u = 0; s > u; u++)
                            for (f[1] = u, c = 0; a > c; c++) f[0] = c, y = e[g], b = y - o, v += b * b, m[f[w] + f[x] * p + f[S] * h] = y, g += 1;
                    return v /= a * s * l, v = Math.sqrt(v), {
                        data: m,
                        sigma: v
                    }
                }, e.readRawData = function(e, t, n, r, i, o) {
                    var a, s, l, c, u, d, p, h, m = new Float32Array(n[0] * n[1] * n[2]),
                        f = [0, 0, 0],
                        g = 0,
                        y = .1,
                        v = 0,
                        b = .1,
                        w = i[0],
                        x = i[1],
                        S = i[2];
                    for (a = r[0], s = r[1], l = r[2], p = n[0], h = n[0] * n[1], d = 0; l > d; d++)
                        for (f[2] = d, u = 0; s > u; u++)
                            for (f[1] = u, c = 0; a > c; c++) f[0] = c, y = e.getFloat32(g, t), b = y - o, v += b * b, m[f[w] + f[x] * p + f[S] * h] = y, g += 4;
                    return v /= a * s * l, v = Math.sqrt(v), {
                        data: m,
                        sigma: v
                    }
                }, e
            }();
            e.Parser = r
        }(t = e.CCP4 || (e.CCP4 = {}))
    }(t = e.Formats || (e.Formats = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(e) {
            var t = "undefined" != typeof Float64Array ? function(e) {
                    return new Float64Array(e)
                } : function(e) {
                    return []
                },
                n = function() {
                    function e() {}
                    return e.empty = function() {
                        return t(16)
                    }, e.identity = function() {
                        var e = t(16);
                        return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
                    }, e.ofRows = function(e) {
                        var n, r, i, o = t(16);
                        for (n = 0; 4 > n; n++)
                            for (i = e[n], r = 0; 4 > r; r++) o[4 * r + n] = i[r];
                        return o
                    }, e.areEqual = function(e, t, n) {
                        for (var r = 0; 16 > r; r++)
                            if (Math.abs(e[r] - t[r]) > n) return !1;
                        return !0
                    }, e.setValue = function(e, t, n, r) {
                        e[4 * n + t] = r
                    }, e.copy = function(e, t) {
                        return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
                    }, e.clone = function(t) {
                        return e.copy(e.empty(), t)
                    }, e.invert = function(e, t) {
                        var n = t[0],
                            r = t[1],
                            i = t[2],
                            o = t[3],
                            a = t[4],
                            s = t[5],
                            l = t[6],
                            c = t[7],
                            u = t[8],
                            d = t[9],
                            p = t[10],
                            h = t[11],
                            m = t[12],
                            f = t[13],
                            g = t[14],
                            y = t[15],
                            v = n * s - r * a,
                            b = n * l - i * a,
                            w = n * c - o * a,
                            x = r * l - i * s,
                            S = r * c - o * s,
                            E = i * c - o * l,
                            I = u * f - d * m,
                            C = u * g - p * m,
                            T = u * y - h * m,
                            M = d * g - p * f,
                            _ = d * y - h * f,
                            A = p * y - h * g,
                            P = v * A - b * _ + w * M + x * T - S * C + E * I;
                        return P ? (P = 1 / P, e[0] = (s * A - l * _ + c * M) * P, e[1] = (i * _ - r * A - o * M) * P, e[2] = (f * E - g * S + y * x) * P, e[3] = (p * S - d * E - h * x) * P, e[4] = (l * T - a * A - c * C) * P, e[5] = (n * A - i * T + o * C) * P, e[6] = (g * w - m * E - y * b) * P, e[7] = (u * E - p * w + h * b) * P, e[8] = (a * _ - s * T + c * I) * P, e[9] = (r * T - n * _ - o * I) * P, e[10] = (m * S - f * w + y * v) * P, e[11] = (d * w - u * S - h * v) * P, e[12] = (s * C - a * M - l * I) * P, e[13] = (n * M - r * C + i * I) * P, e[14] = (f * b - m * x - g * v) * P, e[15] = (u * x - d * b + p * v) * P, e) : null
                    }, e.mul = function(e, t, n) {
                        var r = t[0],
                            i = t[1],
                            o = t[2],
                            a = t[3],
                            s = t[4],
                            l = t[5],
                            c = t[6],
                            u = t[7],
                            d = t[8],
                            p = t[9],
                            h = t[10],
                            m = t[11],
                            f = t[12],
                            g = t[13],
                            y = t[14],
                            v = t[15],
                            b = n[0],
                            w = n[1],
                            x = n[2],
                            S = n[3];
                        return e[0] = b * r + w * s + x * d + S * f, e[1] = b * i + w * l + x * p + S * g, e[2] = b * o + w * c + x * h + S * y, e[3] = b * a + w * u + x * m + S * v, b = n[4], w = n[5], x = n[6], S = n[7], e[4] = b * r + w * s + x * d + S * f, e[5] = b * i + w * l + x * p + S * g, e[6] = b * o + w * c + x * h + S * y, e[7] = b * a + w * u + x * m + S * v, b = n[8], w = n[9], x = n[10], S = n[11], e[8] = b * r + w * s + x * d + S * f, e[9] = b * i + w * l + x * p + S * g, e[10] = b * o + w * c + x * h + S * y, e[11] = b * a + w * u + x * m + S * v, b = n[12], w = n[13], x = n[14], S = n[15], e[12] = b * r + w * s + x * d + S * f, e[13] = b * i + w * l + x * p + S * g, e[14] = b * o + w * c + x * h + S * y, e[15] = b * a + w * u + x * m + S * v, e
                    }, e.translate = function(e, t, n) {
                        var r, i, o, a, s, l, c, u, d, p, h, m, f = n[0],
                            g = n[1],
                            y = n[2];
                        return t === e ? (e[12] = t[0] * f + t[4] * g + t[8] * y + t[12], e[13] = t[1] * f + t[5] * g + t[9] * y + t[13], e[14] = t[2] * f + t[6] * g + t[10] * y + t[14], e[15] = t[3] * f + t[7] * g + t[11] * y + t[15]) : (r = t[0], i = t[1], o = t[2], a = t[3], s = t[4], l = t[5], c = t[6], u = t[7], d = t[8], p = t[9], h = t[10], m = t[11], e[0] = r, e[1] = i, e[2] = o, e[3] = a, e[4] = s, e[5] = l, e[6] = c, e[7] = u, e[8] = d, e[9] = p, e[10] = h, e[11] = m, e[12] = r * f + s * g + d * y + t[12], e[13] = i * f + l * g + p * y + t[13], e[14] = o * f + c * g + h * y + t[14], e[15] = a * f + u * g + m * y + t[15]), e
                    }, e.fromTranslation = function(e, t) {
                        return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = t[0], e[13] = t[1], e[14] = t[2], e[15] = 1, e
                    }, e.transformVector3 = function(e, t, n) {
                        var r = t.x,
                            i = t.y,
                            o = t.z;
                        return e.x = n[0] * r + n[4] * i + n[8] * o + n[12], e.y = n[1] * r + n[5] * i + n[9] * o + n[13], e.z = n[2] * r + n[6] * i + n[10] * o + n[14], e
                    }, e
                }();
            e.Matrix4 = n;
            var r = function() {
                function e() {}
                return e.create = function() {
                    var e = t(4);
                    return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e
                }, e.clone = function(e) {
                    var n = t(4);
                    return n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = e[3], n
                }, e.fromValues = function(e, n, r, i) {
                    var o = t(4);
                    return o[0] = e, o[1] = n, o[2] = r, o[3] = i, o
                }, e.set = function(e, t, n, r, i) {
                    return e[0] = t, e[1] = n, e[2] = r, e[3] = i, e
                }, e.distance = function(e, t) {
                    var n = t[0] - e[0],
                        r = t[1] - e[1],
                        i = t[2] - e[2],
                        o = t[3] - e[3];
                    return Math.sqrt(n * n + r * r + i * i + o * o)
                }, e.squaredDistance = function(e, t) {
                    var n = t[0] - e[0],
                        r = t[1] - e[1],
                        i = t[2] - e[2],
                        o = t[3] - e[3];
                    return n * n + r * r + i * i + o * o
                }, e.length = function(e) {
                    var t = e[0],
                        n = e[1],
                        r = e[2],
                        i = e[3];
                    return Math.sqrt(t * t + n * n + r * r + i * i)
                }, e.squaredLength = function(e) {
                    var t = e[0],
                        n = e[1],
                        r = e[2],
                        i = e[3];
                    return t * t + n * n + r * r + i * i
                }, e.transform = function(e, t, n) {
                    var r = t[0],
                        i = t[1],
                        o = t[2],
                        a = t[3];
                    return e[0] = n[0] * r + n[4] * i + n[8] * o + n[12] * a, e[1] = n[1] * r + n[5] * i + n[9] * o + n[13] * a, e[2] = n[2] * r + n[6] * i + n[10] * o + n[14] * a, e[3] = n[3] * r + n[7] * i + n[11] * o + n[15] * a, e
                }, e
            }();
            e.Vector4 = r
        }(t = e.LinearAlgebra || (e.LinearAlgebra = {}))
    }(t = e.Geometry || (e.Geometry = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t = function() {
            function e(e) {
                1 > e && (e = 1), this.indices = new Int32Array(e), this.count = 0, this.capacity = e, this.hasPriorities = !1, this.priorities = void 0
            }
            return e.prototype.ensureCapacity = function() {
                var e, t = 2 * this.capacity + 1,
                    n = new Int32Array(t);
                if (this.count < 32)
                    for (e = 0; e < this.count; e++) n[e] = this.indices[e];
                else n.set(this.indices);
                this.indices = n, this.capacity = t
            }, e.prototype.add = function(e, t) {
                this.count + 1 >= this.capacity && this.ensureCapacity(), this.indices[this.count++] = t
            }, e.prototype.reset = function() {
                this.count = 0
            }, e
        }();
        e.SubdivisionTree3DResultIndexBuffer = t;
        var n = function() {
            function e(e) {
                1 > e && (e = 1), this.indices = new Int32Array(e), this.count = 0, this.capacity = e, this.hasPriorities = !0, this.priorities = new Float32Array(e)
            }
            return e.prototype.ensureCapacity = function() {
                var e, t = 2 * this.capacity + 1,
                    n = new Int32Array(t),
                    r = new Float32Array(t);
                if (this.count < 32)
                    for (e = 0; e < this.count; e++) n[e] = this.indices[e], r[e] = this.priorities[e];
                else n.set(this.indices), r.set(this.priorities);
                this.indices = n, this.priorities = r, this.capacity = t
            }, e.prototype.add = function(e, t) {
                this.count + 1 >= this.capacity && this.ensureCapacity(), this.priorities[this.count] = e, this.indices[this.count++] = t
            }, e.prototype.reset = function() {
                this.count = 0
            }, e
        }();
        e.SubdivisionTree3DResultPriorityBuffer = n;
        var r = function() {
            function e(e, t) {
                this.tree = e, this.indices = e.indices, this.positions = e.positions, this.buffer = t, this.pivot = [.1, .1, .1], this.radius = 1.1, this.radiusSq = 1.1 * 1.1
            }
            return e.prototype.nearest = function(e, t, n, r) {
                this.pivot[0] = e, this.pivot[1] = t, this.pivot[2] = n, this.radius = r, this.radiusSq = r * r, this.buffer.reset(), this.tree.root.nearest(this, 0)
            }, e.prototype.nearestIndex = function(e, t) {
                this.pivot[0] = this.positions[3 * e], this.pivot[1] = this.positions[3 * e + 1], this.pivot[2] = this.positions[3 * e + 2], this.radius = t, this.radiusSq = t * t, this.buffer.reset(), this.tree.root.nearest(this, 0)
            }, e
        }();
        e.SubdivisionTree3DQueryContext = r;
        var i = function() {
            function e(e, t, n) {
                void 0 === n && (n = 32);
                var r = new l(e, t, n);
                this.data = e, this.root = r.build(), this.indices = r.indices, this.positions = r.positions
            }
            return e.prototype.createContextRadius = function(e, i) {
                return void 0 === i && (i = !1), new r(this, i ? new n(Math.max(e * e | 0, 8)) : new t(Math.max(e * e | 0, 8)))
            }, e
        }();
        e.SubdivisionTree3D = i;
        var o = function() {
            function e(e) {
                this.count = 0, this.data = new Float32Array(3 * e | 0), this.bounds = new s, this.boundsMin = this.bounds.min, this.boundsMax = this.bounds.max
            }
            return e.prototype.add = function(e, t, n) {
                this.data[this.count++] = e, this.data[this.count++] = t, this.data[this.count++] = n, this.boundsMin[0] = Math.min(e, this.boundsMin[0]),
                    this.boundsMin[1] = Math.min(t, this.boundsMin[1]), this.boundsMin[2] = Math.min(n, this.boundsMin[2]), this.boundsMax[0] = Math.max(e, this.boundsMax[0]), this.boundsMax[1] = Math.max(t, this.boundsMax[1]), this.boundsMax[2] = Math.max(n, this.boundsMax[2])
            }, e
        }();
        e.SubdivisionTree3DPositionBuilder = o;
        var a = function() {
            function e(e, t, n, r, i) {
                this.splitValue = e, this.startIndex = t, this.endIndex = n, this.left = r, this.right = i
            }
            return e.prototype.nearestLeaf = function(e) {
                var t, n, r, i, o, a, s = e.pivot,
                    l = e.indices,
                    c = e.positions,
                    u = e.radiusSq;
                for (a = this.startIndex; a < this.endIndex; a++) i = 3 * l[a], t = s[0] - c[i], n = s[1] - c[i + 1], r = s[2] - c[i + 2], o = t * t + n * n + r * r, u >= o && e.buffer.add(o, l[a])
            }, e.prototype.nearestNode = function(e, t) {
                var n = e.pivot[t],
                    r = n < this.splitValue;
                (r ? n + e.radius > this.splitValue : n - e.radius < this.splitValue) ? (this.left.nearest(e, (t + 1) % 3), this.right.nearest(e, (t + 1) % 3)) : r ? this.left.nearest(e, (t + 1) % 3) : this.right.nearest(e, (t + 1) % 3)
            }, e.prototype.nearest = function(e, t) {
                this.startIndex !== this.endIndex && (isNaN(this.splitValue) ? this.nearestLeaf(e) : this.nearestNode(e, t))
            }, e
        }();
        e.SubdivisionTree3DNode = a;
        var s = function() {
            function e() {
                this.min = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE], this.max = [-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE]
            }
            return e
        }();
        e.Box3D = s;
        var l = function() {
            function e(e, t, n) {
                var r, i = new o(e.length),
                    s = new Int32Array(e.length);
                for (r = 0; r < e.length; r++) s[r] = r, t(e[r], i);
                this.leafSize = n, this.positions = i.data, this.indices = s, this.emptyNode = new a(NaN, -1, -1, null, null), this.bounds = i.bounds
            }
            return e.prototype.split = function(e, t, n) {
                var r = t - e + 1;
                if (0 >= r) return this.emptyNode;
                if (r <= this.leafSize) return new a(NaN, e, t + 1, this.emptyNode, this.emptyNode);
                for (var i, o, s, l = this.bounds.min[n], c = this.bounds.max[n], u = .5 * (l + c), d = 0, p = e, h = t; h > p;) {
                    for (i = this.indices[h], this.indices[h] = this.indices[p], this.indices[p] = i; t >= p && this.positions[3 * this.indices[p] + n] <= u;) p++;
                    for (; h >= e && this.positions[3 * this.indices[h] + n] > u;) h--
                }
                return d = p - 1, this.bounds.max[n] = u, o = this.split(e, d, (n + 1) % 3), this.bounds.max[n] = c, this.bounds.min[n] = u, s = this.split(d + 1, t, (n + 1) % 3), this.bounds.min[n] = l, new a(u, e, t + 1, o, s)
            }, e.prototype.build = function() {
                return this.split(0, this.indices.length - 1, 0)
            }, e
        }()
    }(t = e.Geometry || (e.Geometry = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        "use strict";
        var n = e.Geometry.LinearAlgebra.Matrix4,
            r = e.Geometry.LinearAlgebra.Vector4,
            i = function() {
                function e(e) {
                    if (this.info = e, this.temp = n.empty(), this.tempV = new Float64Array(4), void 0 === o.Spacegroup[e.spacegroupName]) throw "'" + e.spacegroupName + "' is not a known spacegroup.";
                    this.space = this.getSpace(), this.operators = this.getOperators()
                }
                return Object.defineProperty(e.prototype, "operatorCount", {
                    get: function() {
                        return this.operators.length
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.getOperatorMatrix = function(e, t, r, i, o) {
                    return this.tempV[0] = t, this.tempV[1] = r, this.tempV[2] = i, n.fromTranslation(this.temp, this.tempV), n.mul(o, n.mul(o, n.mul(o, this.space.fromFrac, this.temp), this.operators[e]), this.space.toFrac), o
                }, e.prototype.getSpace = function() {
                    var e = this.info.toFracTransform,
                        t = n.empty();
                    return n.invert(t, e), {
                        toFrac: e,
                        fromFrac: t,
                        baseX: r.transform(r.create(), r.fromValues(1, 0, 0, 1), e),
                        baseY: r.transform(r.create(), r.fromValues(0, 1, 0, 1), e),
                        baseZ: r.transform(r.create(), r.fromValues(0, 0, 1, 1), e)
                    }
                }, e.getOperator = function(e) {
                    var t = o.Transform[e[0]],
                        r = o.Transform[e[1]],
                        i = o.Transform[e[2]];
                    return n.ofRows([t, r, i, [0, 0, 0, 1]])
                }, e.prototype.getOperators = function() {
                    var t = o.Group[o.Spacegroup[this.info.spacegroupName]];
                    return t.map(function(t) {
                        return e.getOperator(o.Operator[t])
                    })
                }, e
            }();
        t.Spacegroup = i;
        var o;
        ! function(e) {
            e.Transform = [
                [1, 0, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 1, 0],
                [-1, 0, 0, 0],
                [0, -1, 0, 0],
                [0, 0, -1, 0],
                [0, 1, 0, .5],
                [1, 0, 0, .5],
                [-1, 0, 0, .5],
                [0, 0, 1, .5],
                [0, -1, 0, .5],
                [0, 0, -1, .5],
                [1, 0, 0, .25],
                [0, -1, 0, .25],
                [0, 0, 1, .25],
                [-1, 0, 0, .25],
                [0, 1, 0, .25],
                [0, -1, 0, .75],
                [0, 0, 1, .75],
                [0, 1, 0, .75],
                [1, 0, 0, .75],
                [-1, 0, 0, .75],
                [0, 0, -1, .25],
                [0, 0, -1, .75],
                [1, -1, 0, 0],
                [-1, 1, 0, 0],
                [0, 0, 1, .333333333333333],
                [0, 0, 1, .666666666666667],
                [1, 0, 0, .666666666666667],
                [0, 1, 0, .333333333333333],
                [0, -1, 0, .666666666666667],
                [1, -1, 0, .333333333333333],
                [-1, 1, 0, .666666666666667],
                [-1, 0, 0, .333333333333333],
                [1, 0, 0, .333333333333333],
                [0, 1, 0, .666666666666667],
                [0, -1, 0, .333333333333333],
                [1, -1, 0, .666666666666667],
                [-1, 1, 0, .333333333333333],
                [-1, 0, 0, .666666666666667],
                [0, 0, -1, .333333333333333],
                [0, 0, -1, .666666666666667],
                [0, 0, 1, .833333333333333],
                [0, 0, 1, .166666666666667],
                [0, 0, -1, .833333333333333],
                [0, 0, -1, .166666666666667]
            ], e.Operator = [
                [0, 1, 2],
                [3, 4, 5],
                [3, 1, 5],
                [3, 6, 5],
                [7, 6, 2],
                [8, 6, 5],
                [0, 4, 2],
                [0, 4, 9],
                [7, 10, 2],
                [7, 10, 9],
                [0, 10, 2],
                [8, 10, 5],
                [3, 1, 11],
                [3, 6, 11],
                [0, 10, 9],
                [8, 6, 11],
                [3, 4, 2],
                [0, 4, 5],
                [3, 4, 9],
                [7, 10, 5],
                [8, 4, 9],
                [8, 10, 9],
                [8, 10, 2],
                [0, 6, 9],
                [3, 10, 9],
                [0, 10, 11],
                [7, 1, 9],
                [8, 1, 11],
                [7, 4, 11],
                [7, 6, 9],
                [7, 10, 11],
                [3, 10, 2],
                [8, 1, 5],
                [0, 4, 11],
                [3, 1, 2],
                [3, 1, 9],
                [7, 4, 2],
                [8, 1, 2],
                [8, 1, 9],
                [3, 6, 9],
                [7, 4, 9],
                [8, 6, 2],
                [8, 6, 9],
                [3, 6, 2],
                [12, 13, 14],
                [15, 16, 14],
                [12, 17, 18],
                [15, 19, 18],
                [20, 13, 18],
                [21, 16, 18],
                [20, 17, 14],
                [21, 19, 14],
                [0, 1, 5],
                [8, 10, 11],
                [7, 6, 11],
                [7, 6, 5],
                [8, 4, 2],
                [7, 4, 5],
                [7, 1, 5],
                [7, 1, 11],
                [0, 10, 5],
                [0, 1, 11],
                [0, 6, 11],
                [0, 6, 5],
                [3, 10, 11],
                [8, 4, 11],
                [15, 13, 22],
                [12, 16, 22],
                [15, 17, 23],
                [12, 19, 23],
                [21, 13, 23],
                [20, 16, 23],
                [21, 17, 22],
                [20, 19, 22],
                [4, 0, 2],
                [1, 3, 2],
                [4, 0, 14],
                [1, 3, 18],
                [4, 0, 9],
                [1, 3, 9],
                [4, 0, 18],
                [1, 3, 14],
                [10, 7, 9],
                [6, 8, 9],
                [4, 7, 14],
                [6, 3, 18],
                [10, 0, 18],
                [1, 8, 14],
                [1, 3, 5],
                [4, 0, 5],
                [6, 8, 11],
                [10, 7, 11],
                [1, 3, 11],
                [4, 0, 11],
                [10, 7, 2],
                [6, 8, 2],
                [3, 10, 22],
                [7, 1, 23],
                [8, 4, 23],
                [0, 6, 22],
                [1, 0, 5],
                [4, 3, 5],
                [1, 0, 23],
                [4, 3, 22],
                [10, 7, 14],
                [6, 8, 18],
                [8, 6, 22],
                [7, 10, 23],
                [4, 3, 11],
                [1, 0, 11],
                [1, 0, 22],
                [4, 3, 23],
                [10, 7, 18],
                [6, 8, 14],
                [8, 6, 23],
                [7, 10, 22],
                [6, 7, 11],
                [10, 8, 11],
                [8, 1, 23],
                [0, 10, 22],
                [3, 6, 22],
                [7, 4, 23],
                [4, 3, 2],
                [1, 0, 2],
                [10, 8, 2],
                [6, 7, 2],
                [4, 3, 9],
                [1, 0, 9],
                [10, 8, 9],
                [6, 7, 9],
                [4, 8, 14],
                [6, 0, 18],
                [10, 3, 18],
                [1, 7, 14],
                [4, 8, 18],
                [6, 0, 14],
                [10, 3, 14],
                [1, 7, 18],
                [6, 7, 5],
                [10, 8, 5],
                [6, 8, 5],
                [10, 7, 5],
                [8, 1, 22],
                [0, 10, 23],
                [3, 6, 23],
                [7, 4, 22],
                [4, 24, 2],
                [25, 3, 2],
                [4, 24, 26],
                [25, 3, 27],
                [4, 24, 27],
                [25, 3, 26],
                [28, 29, 26],
                [30, 31, 26],
                [32, 33, 26],
                [34, 35, 27],
                [36, 37, 27],
                [38, 39, 27],
                [2, 0, 1],
                [1, 2, 0],
                [1, 25, 5],
                [24, 0, 5],
                [39, 36, 40],
                [35, 38, 40],
                [37, 34, 40],
                [33, 30, 41],
                [29, 32, 41],
                [31, 28, 41],
                [5, 3, 4],
                [4, 5, 3],
                [25, 1, 5],
                [0, 24, 5],
                [24, 4, 5],
                [3, 25, 5],
                [4, 3, 41],
                [25, 1, 40],
                [24, 4, 41],
                [3, 25, 40],
                [4, 3, 40],
                [25, 1, 41],
                [24, 4, 40],
                [3, 25, 41],
                [35, 34, 40],
                [37, 36, 40],
                [39, 38, 40],
                [29, 28, 41],
                [31, 30, 41],
                [33, 32, 41],
                [3, 5, 4],
                [5, 4, 3],
                [25, 1, 2],
                [0, 24, 2],
                [24, 4, 2],
                [3, 25, 2],
                [25, 1, 9],
                [0, 24, 9],
                [24, 4, 9],
                [3, 25, 9],
                [30, 33, 26],
                [32, 29, 26],
                [28, 31, 26],
                [36, 39, 27],
                [38, 35, 27],
                [34, 37, 27],
                [0, 2, 1],
                [2, 1, 0],
                [30, 33, 42],
                [32, 29, 42],
                [28, 31, 42],
                [36, 39, 43],
                [38, 35, 43],
                [34, 37, 43],
                [7, 9, 6],
                [9, 6, 7],
                [25, 1, 11],
                [0, 24, 11],
                [24, 4, 11],
                [3, 25, 11],
                [35, 34, 44],
                [37, 36, 44],
                [39, 38, 44],
                [29, 28, 45],
                [31, 30, 45],
                [33, 32, 45],
                [8, 11, 10],
                [11, 10, 8],
                [1, 25, 2],
                [24, 0, 2],
                [1, 25, 42],
                [24, 0, 43],
                [1, 25, 43],
                [24, 0, 42],
                [1, 25, 27],
                [24, 0, 26],
                [1, 25, 26],
                [24, 0, 27],
                [1, 25, 9],
                [24, 0, 9],
                [4, 24, 5],
                [25, 3, 5],
                [4, 24, 11],
                [25, 3, 11],
                [1, 0, 40],
                [4, 3, 44],
                [0, 24, 45],
                [1, 0, 41],
                [4, 3, 45],
                [0, 24, 44],
                [0, 24, 40],
                [0, 24, 41],
                [2, 3, 4],
                [5, 3, 1],
                [5, 0, 4],
                [4, 2, 3],
                [1, 5, 3],
                [4, 5, 0],
                [2, 7, 6],
                [2, 8, 10],
                [5, 8, 6],
                [5, 7, 10],
                [1, 9, 7],
                [4, 9, 8],
                [1, 11, 8],
                [4, 11, 7],
                [9, 0, 6],
                [9, 3, 10],
                [11, 3, 6],
                [11, 0, 10],
                [6, 2, 7],
                [10, 2, 8],
                [6, 5, 8],
                [10, 5, 7],
                [9, 7, 1],
                [9, 8, 4],
                [11, 8, 1],
                [11, 7, 4],
                [6, 9, 0],
                [10, 9, 3],
                [6, 11, 3],
                [10, 11, 0],
                [9, 7, 6],
                [9, 8, 10],
                [11, 8, 6],
                [11, 7, 10],
                [6, 9, 7],
                [10, 9, 8],
                [6, 11, 8],
                [10, 11, 7],
                [2, 3, 10],
                [5, 8, 1],
                [11, 0, 4],
                [10, 2, 3],
                [1, 5, 8],
                [4, 11, 0],
                [5, 0, 1],
                [2, 0, 4],
                [2, 3, 1],
                [1, 5, 0],
                [4, 2, 0],
                [1, 2, 3],
                [11, 8, 10],
                [11, 7, 6],
                [9, 7, 10],
                [9, 8, 6],
                [10, 11, 8],
                [6, 11, 7],
                [10, 9, 7],
                [6, 9, 8],
                [5, 8, 10],
                [5, 7, 6],
                [2, 7, 10],
                [2, 8, 6],
                [4, 11, 8],
                [1, 11, 7],
                [4, 9, 7],
                [1, 9, 8],
                [11, 3, 10],
                [11, 0, 6],
                [9, 0, 10],
                [9, 3, 6],
                [10, 5, 8],
                [6, 5, 7],
                [10, 2, 7],
                [6, 2, 8],
                [11, 8, 4],
                [11, 7, 1],
                [9, 7, 4],
                [9, 8, 1],
                [10, 11, 3],
                [6, 11, 0],
                [10, 9, 0],
                [6, 9, 3],
                [22, 15, 13],
                [22, 12, 16],
                [14, 12, 13],
                [14, 15, 16],
                [13, 22, 15],
                [16, 22, 12],
                [13, 14, 12],
                [16, 14, 15],
                [22, 21, 17],
                [22, 20, 19],
                [14, 20, 17],
                [14, 21, 19],
                [13, 23, 21],
                [16, 23, 20],
                [13, 18, 20],
                [16, 18, 21],
                [23, 15, 17],
                [23, 12, 19],
                [18, 12, 17],
                [18, 15, 19],
                [17, 22, 21],
                [19, 22, 20],
                [17, 14, 20],
                [19, 14, 21],
                [23, 21, 13],
                [23, 20, 16],
                [18, 20, 13],
                [18, 21, 16],
                [17, 23, 15],
                [19, 23, 12],
                [17, 18, 12],
                [19, 18, 15],
                [5, 0, 6],
                [2, 7, 4],
                [9, 3, 1],
                [6, 5, 0],
                [4, 2, 7],
                [1, 9, 3],
                [0, 2, 4],
                [3, 2, 1],
                [0, 5, 1],
                [2, 1, 3],
                [2, 4, 0],
                [5, 1, 0],
                [7, 9, 10],
                [8, 9, 6],
                [7, 11, 6],
                [9, 6, 8],
                [9, 10, 7],
                [11, 6, 7],
                [1, 7, 11],
                [4, 8, 11],
                [1, 8, 9],
                [4, 7, 9],
                [0, 9, 10],
                [3, 9, 6],
                [3, 11, 10],
                [0, 11, 6],
                [2, 6, 8],
                [2, 10, 7],
                [5, 6, 7],
                [5, 10, 8],
                [6, 0, 11],
                [10, 3, 11],
                [6, 3, 9],
                [10, 0, 9],
                [7, 2, 10],
                [8, 2, 6],
                [8, 5, 10],
                [7, 5, 6],
                [9, 1, 8],
                [9, 4, 7],
                [11, 1, 7],
                [11, 4, 8],
                [7, 9, 4],
                [8, 9, 1],
                [8, 11, 4],
                [7, 11, 1],
                [9, 6, 3],
                [9, 10, 0],
                [11, 6, 0],
                [11, 10, 3],
                [19, 12, 23],
                [13, 15, 22],
                [16, 21, 18],
                [17, 20, 14],
                [20, 14, 17],
                [21, 18, 16],
                [15, 22, 13],
                [12, 23, 19],
                [18, 16, 21],
                [14, 17, 20],
                [23, 19, 12],
                [22, 13, 15],
                [19, 20, 22],
                [13, 21, 23],
                [16, 15, 14],
                [17, 12, 18],
                [20, 18, 13],
                [21, 14, 19],
                [15, 23, 17],
                [12, 22, 16],
                [18, 19, 15],
                [14, 13, 12],
                [23, 16, 20],
                [22, 17, 21],
                [16, 12, 22],
                [17, 15, 23],
                [19, 21, 14],
                [13, 20, 18],
                [12, 14, 13],
                [15, 18, 19],
                [21, 22, 17],
                [20, 23, 16],
                [14, 16, 15],
                [18, 17, 12],
                [22, 19, 20],
                [23, 13, 21],
                [16, 20, 23],
                [17, 21, 22],
                [19, 15, 18],
                [13, 12, 14],
                [12, 18, 17],
                [15, 14, 16],
                [21, 23, 13],
                [20, 22, 19],
                [14, 19, 21],
                [18, 13, 20],
                [22, 16, 12],
                [23, 17, 15],
                [19, 12, 22],
                [17, 21, 23],
                [16, 15, 18],
                [13, 20, 14],
                [20, 14, 13],
                [15, 18, 16],
                [21, 23, 17],
                [12, 22, 19],
                [18, 16, 15],
                [14, 13, 20],
                [22, 19, 12],
                [23, 17, 21],
                [3, 2, 4],
                [3, 5, 1],
                [0, 5, 4],
                [2, 4, 3],
                [5, 1, 3],
                [5, 4, 0],
                [1, 7, 9],
                [4, 8, 9],
                [1, 8, 11],
                [4, 7, 11],
                [0, 9, 6],
                [3, 9, 10],
                [3, 11, 6],
                [0, 11, 10],
                [2, 6, 7],
                [2, 10, 8],
                [5, 6, 8],
                [5, 10, 7],
                [6, 0, 9],
                [10, 3, 9],
                [6, 3, 11],
                [10, 0, 11],
                [7, 2, 6],
                [8, 2, 10],
                [8, 5, 6],
                [7, 5, 10],
                [9, 1, 7],
                [9, 4, 8],
                [11, 1, 8],
                [11, 4, 7],
                [7, 9, 1],
                [8, 9, 4],
                [8, 11, 1],
                [7, 11, 4],
                [9, 6, 0],
                [9, 10, 3],
                [11, 6, 3],
                [11, 10, 0],
                [8, 9, 10],
                [8, 11, 6],
                [7, 11, 10],
                [9, 10, 8],
                [11, 6, 8],
                [11, 10, 7],
                [6, 0, 2],
                [10, 3, 2],
                [6, 3, 5],
                [10, 0, 5],
                [7, 2, 1],
                [8, 2, 4],
                [8, 5, 1],
                [7, 5, 4],
                [9, 1, 0],
                [9, 4, 3],
                [11, 1, 3],
                [11, 4, 0],
                [1, 7, 2],
                [4, 8, 2],
                [1, 8, 5],
                [4, 7, 5],
                [0, 9, 1],
                [3, 9, 4],
                [3, 11, 1],
                [0, 11, 4],
                [2, 6, 0],
                [2, 10, 3],
                [5, 6, 3],
                [5, 10, 0],
                [0, 2, 6],
                [3, 2, 10],
                [3, 5, 6],
                [0, 5, 10],
                [2, 1, 7],
                [2, 4, 8],
                [5, 1, 8],
                [5, 4, 7],
                [16, 12, 14],
                [13, 21, 18],
                [19, 15, 23],
                [17, 20, 22],
                [12, 14, 16],
                [21, 18, 13],
                [15, 23, 19],
                [20, 22, 17],
                [14, 16, 12],
                [18, 13, 21],
                [23, 19, 15],
                [22, 17, 20],
                [19, 20, 18],
                [17, 15, 14],
                [16, 21, 22],
                [13, 12, 23],
                [20, 18, 19],
                [15, 14, 17],
                [21, 22, 16],
                [12, 23, 13],
                [18, 19, 20],
                [14, 17, 15],
                [22, 16, 21],
                [23, 13, 12],
                [6, 0, 5],
                [10, 3, 5],
                [6, 3, 2],
                [10, 0, 2],
                [7, 2, 4],
                [8, 2, 1],
                [8, 5, 4],
                [7, 5, 1],
                [9, 1, 3],
                [9, 4, 0],
                [11, 1, 0],
                [11, 4, 3],
                [1, 7, 5],
                [4, 8, 5],
                [1, 8, 2],
                [4, 7, 2],
                [0, 9, 4],
                [3, 9, 1],
                [3, 11, 4],
                [0, 11, 1],
                [2, 6, 3],
                [2, 10, 0],
                [5, 6, 0],
                [5, 10, 3],
                [0, 2, 10],
                [3, 2, 6],
                [3, 5, 10],
                [0, 5, 6],
                [2, 1, 8],
                [2, 4, 7],
                [5, 1, 7],
                [5, 4, 8],
                [21, 17, 23],
                [20, 16, 22],
                [12, 13, 18],
                [15, 19, 14],
                [23, 21, 17],
                [22, 20, 16],
                [18, 12, 13],
                [14, 15, 19],
                [17, 23, 21],
                [16, 22, 20],
                [13, 18, 12],
                [19, 14, 15],
                [21, 13, 22],
                [20, 19, 23],
                [12, 17, 14],
                [15, 16, 18],
                [23, 15, 13],
                [22, 12, 19],
                [18, 20, 17],
                [14, 21, 16],
                [17, 22, 15],
                [16, 23, 12],
                [13, 14, 20],
                [19, 18, 21],
                [15, 17, 22],
                [12, 16, 23],
                [20, 13, 14],
                [21, 19, 18],
                [22, 21, 13],
                [23, 20, 19],
                [14, 12, 17],
                [18, 15, 16],
                [13, 23, 15],
                [19, 22, 12],
                [17, 18, 20],
                [16, 14, 21],
                [15, 13, 23],
                [12, 19, 22],
                [20, 17, 18],
                [21, 16, 14],
                [22, 15, 17],
                [23, 12, 16],
                [14, 20, 13],
                [18, 21, 19],
                [13, 22, 21],
                [19, 23, 20],
                [17, 14, 12],
                [16, 18, 15],
                [6, 5, 3],
                [4, 9, 3],
                [9, 3, 4],
                [5, 7, 4],
                [4, 5, 7],
                [5, 3, 6]
            ], e.Group = [
                [0],
                [0, 1],
                [0, 2],
                [0, 3],
                [0, 2, 4, 5],
                [0, 6],
                [0, 7],
                [0, 6, 4, 8],
                [0, 7, 4, 9],
                [0, 6, 2, 1],
                [0, 3, 1, 10],
                [0, 6, 2, 1, 4, 8, 5, 11],
                [0, 12, 1, 7],
                [0, 1, 13, 14],
                [0, 12, 1, 7, 4, 15, 11, 9],
                [0, 16, 2, 17],
                [0, 18, 12, 17],
                [0, 16, 5, 19],
                [0, 20, 13, 19],
                [0, 18, 12, 17, 4, 21, 15, 19],
                [0, 16, 2, 17, 4, 22, 5, 19],
                [0, 16, 2, 17, 23, 24, 13, 25, 26, 20, 27, 28, 4, 22, 5, 19],
                [0, 16, 17, 2, 29, 21, 30, 15],
                [0, 20, 13, 19, 29, 31, 32, 33],
                [0, 16, 6, 34],
                [0, 18, 7, 34],
                [0, 16, 7, 35],
                [0, 16, 36, 37],
                [0, 18, 36, 38],
                [0, 16, 14, 39],
                [0, 20, 40, 34],
                [0, 16, 8, 41],
                [0, 18, 8, 42],
                [0, 16, 9, 42],
                [0, 16, 6, 34, 4, 22, 8, 41],
                [0, 18, 7, 34, 4, 21, 9, 41],
                [0, 16, 7, 35, 4, 22, 9, 42],
                [0, 16, 6, 34, 23, 24, 14, 39],
                [0, 16, 10, 43, 23, 24, 7, 35],
                [0, 16, 36, 37, 23, 24, 9, 42],
                [0, 16, 8, 41, 23, 24, 40, 38],
                [0, 16, 6, 34, 23, 24, 14, 39, 26, 20, 40, 38, 4, 22, 8, 41],
                [0, 16, 44, 45, 23, 24, 46, 47, 26, 20, 48, 49, 4, 22, 50, 51],
                [0, 16, 6, 34, 29, 21, 9, 42],
                [0, 16, 8, 41, 29, 21, 7, 35],
                [0, 16, 36, 37, 29, 21, 14, 39],
                [0, 16, 2, 17, 1, 52, 6, 34],
                [0, 16, 2, 17, 53, 54, 9, 42],
                [0, 16, 12, 33, 1, 52, 7, 35],
                [0, 16, 2, 17, 11, 55, 8, 41],
                [0, 56, 2, 57, 1, 58, 6, 37],
                [0, 56, 15, 25, 1, 58, 9, 39],
                [0, 20, 27, 17, 1, 59, 40, 34],
                [0, 56, 12, 28, 1, 58, 7, 38],
                [0, 16, 5, 19, 1, 52, 8, 41],
                [0, 22, 13, 28, 1, 55, 14, 38],
                [0, 18, 13, 60, 1, 61, 14, 43],
                [0, 16, 15, 30, 1, 52, 9, 42],
                [0, 16, 5, 19, 11, 55, 6, 34],
                [0, 21, 12, 19, 1, 54, 7, 41],
                [0, 20, 13, 19, 1, 59, 14, 41],
                [0, 20, 3, 30, 1, 59, 10, 42],
                [0, 18, 12, 17, 1, 61, 7, 34, 4, 21, 15, 19, 11, 54, 9, 41],
                [0, 24, 13, 17, 1, 62, 14, 34, 4, 20, 27, 19, 11, 59, 40, 41],
                [0, 16, 2, 17, 1, 52, 6, 34, 4, 22, 5, 19, 11, 55, 8, 41],
                [0, 16, 12, 33, 1, 52, 7, 35, 4, 22, 15, 30, 11, 55, 9, 42],
                [0, 31, 3, 17, 1, 63, 10, 34, 4, 56, 32, 19, 11, 58, 36, 41],
                [0, 22, 2, 19, 64, 59, 14, 38, 4, 16, 5, 17, 65, 62, 40, 39],
                [0, 16, 2, 17, 1, 52, 6, 34, 23, 24, 13, 25, 64, 62, 14, 39, 26, 20, 27, 28, 65, 59, 40, 38, 4, 22, 5, 19, 11, 55, 8, 41],
                [0, 16, 2, 17, 66, 67, 44, 45, 23, 24, 13, 25, 68, 69, 46, 47, 26, 20, 27, 28, 70, 71, 48, 49, 4, 22, 5, 19, 72, 73, 50, 51],
                [0, 16, 2, 17, 1, 52, 6, 34, 29, 21, 15, 30, 53, 54, 9, 42],
                [0, 16, 5, 19, 1, 52, 8, 41, 29, 21, 12, 33, 53, 54, 7, 35],
                [0, 20, 13, 19, 1, 59, 14, 41, 29, 31, 32, 33, 53, 63, 36, 35],
                [0, 31, 3, 17, 1, 63, 10, 34, 29, 20, 27, 30, 53, 59, 40, 42],
                [0, 16, 74, 75],
                [0, 18, 76, 77],
                [0, 16, 78, 79],
                [0, 18, 80, 81],
                [0, 16, 74, 75, 29, 21, 82, 83],
                [0, 21, 84, 85, 29, 16, 86, 87],
                [0, 16, 88, 89],
                [0, 16, 88, 89, 29, 21, 90, 91],
                [0, 16, 74, 75, 1, 52, 88, 89],
                [0, 16, 78, 79, 1, 52, 92, 93],
                [0, 16, 94, 95, 11, 55, 88, 89],
                [0, 16, 82, 83, 53, 54, 88, 89],
                [0, 16, 74, 75, 1, 52, 88, 89, 29, 21, 82, 83, 53, 54, 90, 91],
                [0, 21, 84, 85, 96, 97, 88, 91, 29, 16, 86, 87, 98, 99, 90, 89],
                [0, 16, 74, 75, 2, 17, 100, 101],
                [0, 16, 94, 95, 5, 19, 100, 101],
                [0, 18, 76, 77, 2, 33, 102, 103],
                [0, 18, 104, 105, 106, 107, 100, 108],
                [0, 16, 78, 79, 2, 17, 109, 108],
                [0, 16, 82, 83, 15, 30, 100, 101],
                [0, 18, 80, 81, 2, 33, 110, 111],
                [0, 18, 112, 113, 114, 115, 100, 108],
                [0, 16, 74, 75, 2, 17, 100, 101, 29, 21, 82, 83, 15, 30, 116, 117],
                [0, 21, 84, 85, 118, 119, 116, 101, 29, 16, 86, 87, 120, 121, 100, 117],
                [0, 16, 74, 75, 6, 34, 122, 123],
                [0, 16, 74, 75, 8, 41, 124, 125],
                [0, 16, 78, 79, 7, 35, 122, 123],
                [0, 16, 82, 83, 9, 42, 122, 123],
                [0, 16, 74, 75, 7, 35, 126, 127],
                [0, 16, 74, 75, 9, 42, 128, 129],
                [0, 16, 78, 79, 6, 34, 126, 127],
                [0, 16, 78, 79, 8, 41, 128, 129],
                [0, 16, 74, 75, 6, 34, 122, 123, 29, 21, 82, 83, 9, 42, 128, 129],
                [0, 16, 74, 75, 7, 35, 126, 127, 29, 21, 82, 83, 8, 41, 124, 125],
                [0, 21, 84, 85, 6, 42, 130, 131, 29, 16, 86, 87, 9, 34, 132, 133],
                [0, 21, 84, 85, 7, 41, 134, 135, 29, 16, 86, 87, 8, 35, 136, 137],
                [0, 16, 89, 88, 2, 17, 122, 123],
                [0, 16, 89, 88, 12, 33, 126, 127],
                [0, 16, 89, 88, 5, 19, 124, 125],
                [0, 16, 89, 88, 15, 30, 128, 129],
                [0, 16, 88, 89, 6, 34, 100, 101],
                [0, 16, 89, 88, 7, 35, 109, 108],
                [0, 16, 89, 88, 8, 41, 138, 139],
                [0, 16, 89, 88, 9, 42, 116, 117],
                [0, 16, 89, 88, 6, 34, 100, 101, 29, 21, 91, 90, 9, 42, 116, 117],
                [0, 16, 89, 88, 7, 35, 109, 108, 29, 21, 91, 90, 8, 41, 138, 139],
                [0, 16, 89, 88, 2, 17, 122, 123, 29, 21, 91, 90, 15, 30, 128, 129],
                [0, 16, 89, 88, 118, 121, 132, 131, 29, 21, 91, 90, 120, 119, 130, 133],
                [0, 16, 74, 75, 2, 17, 100, 101, 1, 52, 88, 89, 6, 34, 122, 123],
                [0, 16, 74, 75, 12, 33, 109, 108, 1, 52, 88, 89, 7, 35, 126, 127],
                [0, 16, 74, 75, 2, 17, 100, 101, 11, 55, 140, 141, 8, 41, 124, 125],
                [0, 16, 74, 75, 2, 17, 100, 101, 53, 54, 90, 91, 9, 42, 128, 129],
                [0, 16, 74, 75, 5, 19, 138, 139, 1, 52, 88, 89, 8, 41, 124, 125],
                [0, 16, 74, 75, 15, 30, 116, 117, 1, 52, 88, 89, 9, 42, 128, 129],
                [0, 16, 94, 95, 5, 19, 100, 101, 11, 55, 88, 89, 6, 34, 124, 125],
                [0, 16, 94, 95, 15, 30, 109, 108, 11, 55, 88, 89, 7, 35, 128, 129],
                [0, 16, 78, 79, 2, 17, 109, 108, 1, 52, 92, 93, 6, 34, 126, 127],
                [0, 16, 78, 79, 12, 33, 100, 101, 1, 52, 92, 93, 7, 35, 122, 123],
                [0, 16, 82, 83, 12, 33, 138, 139, 53, 54, 88, 89, 8, 41, 126, 127],
                [0, 16, 82, 83, 2, 17, 116, 117, 53, 54, 88, 89, 9, 42, 122, 123],
                [0, 16, 78, 79, 5, 19, 116, 117, 1, 52, 92, 93, 8, 41, 128, 129],
                [0, 16, 82, 83, 15, 30, 100, 101, 1, 52, 90, 91, 9, 42, 122, 123],
                [0, 16, 82, 83, 15, 30, 100, 101, 53, 54, 88, 89, 6, 34, 128, 129],
                [0, 16, 82, 83, 5, 19, 109, 108, 53, 54, 88, 89, 7, 35, 124, 125],
                [0, 16, 74, 75, 2, 17, 100, 101, 1, 52, 88, 89, 6, 34, 122, 123, 29, 21, 82, 83, 15, 30, 116, 117, 53, 54, 90, 91, 9, 42, 128, 129],
                [0, 16, 74, 75, 12, 33, 109, 108, 1, 52, 88, 89, 7, 35, 126, 127, 29, 21, 82, 83, 5, 19, 138, 139, 53, 54, 90, 91, 8, 41, 124, 125],
                [0, 21, 84, 85, 118, 119, 116, 101, 96, 97, 88, 91, 9, 34, 132, 133, 29, 16, 86, 87, 120, 121, 100, 117, 98, 99, 90, 89, 6, 42, 130, 131],
                [0, 21, 84, 85, 142, 143, 138, 108, 96, 97, 88, 91, 8, 35, 136, 137, 29, 16, 86, 87, 144, 145, 109, 139, 98, 99, 90, 89, 7, 41, 134, 135],
                [0, 146, 147],
                [0, 148, 149],
                [0, 150, 151],
                [0, 146, 147, 152, 153, 154, 155, 156, 157],
                [0, 158, 159],
                [0, 146, 147, 1, 160, 161],
                [0, 146, 147, 1, 160, 161, 152, 153, 154, 162, 163, 164, 155, 156, 157, 165, 166, 167],
                [0, 158, 159, 1, 168, 169],
                [0, 146, 147, 101, 170, 171],
                [0, 146, 147, 100, 172, 173],
                [0, 148, 149, 174, 175, 171],
                [0, 148, 149, 100, 176, 177],
                [0, 150, 151, 178, 179, 171],
                [0, 150, 151, 100, 180, 181],
                [0, 146, 147, 100, 172, 173, 152, 153, 154, 182, 183, 184, 155, 156, 157, 185, 186, 187],
                [0, 158, 159, 101, 188, 189],
                [0, 146, 147, 122, 190, 191],
                [0, 146, 147, 123, 192, 193],
                [0, 146, 147, 126, 194, 195],
                [0, 146, 147, 127, 196, 197],
                [0, 146, 147, 122, 190, 191, 152, 153, 154, 198, 199, 200, 155, 156, 157, 201, 202, 203],
                [0, 158, 159, 123, 204, 205],
                [0, 146, 147, 126, 194, 195, 152, 153, 154, 206, 207, 208, 155, 156, 157, 209, 210, 211],
                [0, 158, 159, 129, 212, 213],
                [0, 146, 147, 101, 170, 171, 1, 160, 161, 123, 192, 193],
                [0, 146, 147, 108, 214, 215, 1, 160, 161, 127, 196, 197],
                [0, 146, 147, 100, 172, 173, 1, 160, 161, 122, 190, 191],
                [0, 146, 147, 109, 216, 217, 1, 160, 161, 126, 194, 195],
                [0, 146, 147, 100, 172, 173, 1, 160, 161, 122, 190, 191, 152, 153, 154, 182, 183, 184, 162, 163, 164, 198, 199, 200, 155, 156, 157, 185, 186, 187, 165, 166, 167, 201, 202, 203],
                [0, 158, 159, 101, 188, 189, 1, 168, 169, 123, 204, 205],
                [0, 146, 147, 109, 216, 217, 1, 160, 161, 126, 194, 195, 152, 153, 154, 218, 219, 220, 162, 163, 164, 206, 207, 208, 155, 156, 157, 221, 222, 223, 165, 166, 167, 209, 210, 211],
                [0, 158, 159, 117, 224, 225, 1, 168, 169, 129, 212, 213],
                [0, 146, 147, 16, 226, 227],
                [0, 148, 149, 18, 228, 229],
                [0, 150, 151, 18, 230, 231],
                [0, 150, 151, 16, 232, 233],
                [0, 148, 149, 16, 234, 235],
                [0, 146, 147, 18, 236, 237],
                [0, 146, 147, 52, 238, 239],
                [0, 146, 147, 16, 226, 227, 1, 160, 161, 52, 238, 239],
                [0, 146, 147, 18, 236, 237, 1, 160, 161, 61, 240, 241],
                [0, 146, 147, 16, 226, 227, 100, 172, 173, 101, 170, 171],
                [0, 148, 149, 18, 228, 229, 242, 172, 181, 243, 214, 244],
                [0, 150, 151, 18, 230, 231, 245, 172, 177, 246, 214, 247],
                [0, 150, 151, 16, 232, 233, 245, 172, 177, 174, 170, 248],
                [0, 148, 149, 16, 234, 235, 242, 172, 181, 178, 170, 249],
                [0, 146, 147, 18, 236, 237, 100, 172, 173, 108, 214, 215],
                [0, 146, 147, 16, 226, 227, 122, 190, 191, 123, 192, 193],
                [0, 146, 147, 16, 226, 227, 126, 194, 195, 127, 196, 197],
                [0, 146, 147, 18, 236, 237, 126, 194, 195, 123, 192, 193],
                [0, 146, 147, 18, 236, 237, 122, 190, 191, 127, 196, 197],
                [0, 146, 147, 52, 238, 239, 122, 190, 191, 101, 170, 171],
                [0, 146, 147, 61, 240, 241, 126, 194, 195, 101, 170, 171],
                [0, 146, 147, 52, 238, 239, 100, 172, 173, 123, 192, 193],
                [0, 146, 147, 61, 240, 241, 100, 172, 173, 127, 196, 197],
                [0, 146, 147, 16, 226, 227, 100, 172, 173, 101, 170, 171, 1, 160, 161, 52, 239, 238, 122, 190, 191, 123, 192, 193],
                [0, 146, 147, 16, 226, 227, 109, 216, 217, 108, 214, 215, 1, 160, 161, 52, 239, 238, 126, 194, 195, 127, 196, 197],
                [0, 146, 147, 18, 236, 237, 109, 216, 217, 101, 170, 171, 1, 160, 161, 61, 241, 240, 126, 194, 195, 123, 192, 193],
                [0, 146, 147, 18, 236, 237, 100, 172, 173, 108, 214, 215, 1, 160, 161, 61, 241, 240, 122, 190, 191, 127, 196, 197],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 23, 24, 13, 25, 256, 257, 258, 259, 260, 261, 262, 263, 26, 20, 27, 28, 264, 265, 266, 267, 268, 269, 270, 271, 4, 22, 5, 19, 272, 273, 274, 275, 276, 277, 278, 279],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 29, 21, 15, 30, 280, 281, 282, 283, 284, 285, 286, 287],
                [0, 20, 13, 19, 158, 273, 266, 259, 159, 261, 278, 271],
                [0, 20, 13, 19, 158, 273, 266, 259, 159, 261, 278, 271, 29, 31, 32, 33, 280, 288, 289, 290, 284, 291, 292, 293],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 1, 52, 6, 34, 168, 294, 295, 296, 169, 297, 298, 299],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 53, 54, 9, 42, 300, 301, 302, 303, 304, 305, 306, 307],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 1, 52, 6, 34, 168, 294, 295, 296, 169, 297, 298, 299, 23, 24, 13, 25, 256, 257, 258, 259, 260, 261, 262, 263, 64, 62, 14, 39, 308, 309, 310, 311, 312, 313, 314, 315, 26, 20, 27, 28, 264, 265, 266, 267, 268, 269, 270, 271, 65, 59, 40, 38, 316, 317, 318, 319, 320, 321, 322, 323, 4, 22, 5, 19, 272, 273, 274, 275, 276, 277, 278, 279, 11, 55, 8, 41, 324, 325, 326, 327, 328, 329, 330, 331],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 66, 67, 44, 45, 332, 333, 334, 335, 336, 337, 338, 339, 23, 24, 13, 25, 256, 257, 258, 259, 260, 261, 262, 263, 68, 69, 46, 47, 340, 341, 342, 343, 344, 345, 346, 347, 26, 20, 27, 28, 264, 265, 266, 267, 268, 269, 270, 271, 70, 71, 48, 49, 348, 349, 350, 351, 352, 353, 354, 355, 4, 22, 5, 19, 272, 273, 274, 275, 276, 277, 278, 279, 72, 73, 50, 51, 356, 357, 358, 359, 360, 361, 362, 363],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 1, 52, 6, 34, 168, 294, 295, 296, 169, 297, 298, 299, 29, 21, 15, 30, 280, 281, 282, 283, 284, 285, 286, 287, 53, 54, 9, 42, 300, 301, 302, 303, 304, 305, 306, 307],
                [0, 20, 13, 19, 158, 273, 266, 259, 159, 261, 278, 271, 1, 59, 14, 41, 168, 325, 318, 311, 169, 313, 330, 323],
                [0, 20, 13, 19, 158, 273, 266, 259, 159, 261, 278, 271, 1, 59, 14, 41, 168, 325, 318, 311, 169, 313, 330, 323, 29, 31, 32, 33, 280, 288, 289, 290, 284, 291, 292, 293, 53, 63, 36, 35, 300, 364, 365, 366, 304, 367, 368, 369],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 100, 101, 75, 74, 370, 371, 188, 372, 373, 374, 375, 189],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 116, 117, 83, 82, 376, 377, 224, 378, 379, 380, 381, 225],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 100, 101, 75, 74, 370, 371, 188, 372, 373, 374, 375, 189, 23, 24, 13, 25, 256, 257, 258, 259, 260, 261, 262, 263, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 26, 20, 27, 28, 264, 265, 266, 267, 268, 269, 270, 271, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 4, 22, 5, 19, 272, 273, 274, 275, 276, 277, 278, 279, 138, 139, 95, 94, 406, 407, 408, 409, 410, 411, 412, 413],
                [0, 24, 5, 28, 158, 265, 258, 275, 159, 277, 270, 263, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 23, 16, 27, 19, 256, 273, 251, 267, 260, 269, 278, 255, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 26, 22, 13, 17, 264, 250, 274, 259, 268, 261, 254, 279, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 4, 20, 2, 25, 272, 257, 266, 252, 276, 253, 262, 271, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 100, 101, 75, 74, 370, 371, 188, 372, 373, 374, 375, 189, 29, 21, 15, 30, 280, 281, 282, 283, 284, 285, 286, 287, 116, 117, 83, 82, 376, 377, 224, 378, 379, 380, 381, 225],
                [0, 20, 13, 19, 158, 273, 266, 259, 159, 261, 278, 271, 450, 415, 440, 429, 454, 431, 420, 445, 458, 447, 436, 425],
                [0, 20, 13, 19, 158, 273, 266, 259, 159, 261, 278, 271, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473],
                [0, 20, 13, 19, 158, 273, 266, 259, 159, 261, 278, 271, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 29, 31, 32, 33, 280, 288, 289, 290, 284, 291, 292, 293, 450, 415, 440, 429, 454, 431, 420, 445, 458, 447, 436, 425],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 123, 122, 88, 89, 204, 474, 475, 476, 205, 477, 478, 479],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 123, 122, 88, 89, 204, 474, 475, 476, 205, 477, 478, 479, 23, 24, 13, 25, 256, 257, 258, 259, 260, 261, 262, 263, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 26, 20, 27, 28, 264, 265, 266, 267, 268, 269, 270, 271, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 4, 22, 5, 19, 272, 273, 274, 275, 276, 277, 278, 279, 125, 124, 140, 141, 504, 505, 506, 507, 508, 509, 510, 511],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 123, 122, 88, 89, 204, 474, 475, 476, 205, 477, 478, 479, 29, 21, 15, 30, 280, 281, 282, 283, 284, 285, 286, 287, 129, 128, 90, 91, 212, 512, 513, 514, 213, 515, 516, 517],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 129, 128, 90, 91, 212, 512, 513, 514, 213, 515, 516, 517],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 129, 128, 90, 91, 212, 512, 513, 514, 213, 515, 516, 517, 23, 24, 13, 25, 256, 257, 258, 259, 260, 261, 262, 263, 518, 519, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 26, 20, 27, 28, 264, 265, 266, 267, 268, 269, 270, 271, 530, 531, 532, 533, 534, 535, 536, 537, 538, 539, 540, 541, 4, 22, 5, 19, 272, 273, 274, 275, 276, 277, 278, 279, 127, 126, 92, 93, 542, 543, 544, 545, 546, 547, 548, 549],
                [0, 20, 13, 19, 158, 273, 266, 259, 159, 261, 278, 271, 550, 551, 552, 553, 554, 555, 556, 557, 558, 559, 560, 561, 29, 31, 32, 33, 280, 288, 289, 290, 284, 291, 292, 293, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 100, 101, 75, 74, 370, 371, 188, 372, 373, 374, 375, 189, 1, 52, 6, 34, 168, 294, 295, 296, 169, 297, 298, 299, 122, 123, 89, 88, 475, 476, 204, 474, 479, 478, 477, 205],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 100, 101, 75, 74, 370, 371, 188, 372, 373, 374, 375, 189, 53, 54, 9, 42, 300, 301, 302, 303, 304, 305, 306, 307, 128, 129, 91, 90, 513, 514, 212, 512, 517, 516, 515, 213],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 116, 117, 83, 82, 376, 377, 224, 378, 379, 380, 381, 225, 1, 52, 6, 34, 168, 294, 295, 296, 169, 297, 298, 299, 128, 129, 91, 90, 513, 514, 212, 512, 517, 516, 515, 213],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 116, 117, 83, 82, 376, 377, 224, 378, 379, 380, 381, 225, 53, 54, 9, 42, 300, 301, 302, 303, 304, 305, 306, 307, 122, 123, 89, 88, 475, 476, 204, 474, 479, 478, 477, 205],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 100, 101, 75, 74, 370, 371, 188, 372, 373, 374, 375, 189, 1, 52, 6, 34, 168, 294, 295, 296, 169, 297, 298, 299, 122, 123, 89, 88, 475, 476, 204, 474, 479, 478, 477, 205, 23, 24, 13, 25, 256, 257, 258, 259, 260, 261, 262, 263, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 64, 62, 14, 39, 308, 309, 310, 311, 312, 313, 314, 315, 481, 480, 483, 482, 486, 487, 484, 485, 491, 490, 489, 488, 26, 20, 27, 28, 264, 265, 266, 267, 268, 269, 270, 271, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 65, 59, 40, 38, 316, 317, 318, 319, 320, 321, 322, 323, 493, 492, 495, 494, 498, 499, 496, 497, 503, 502, 501, 500, 4, 22, 5, 19, 272, 273, 274, 275, 276, 277, 278, 279, 138, 139, 95, 94, 406, 407, 408, 409, 410, 411, 412, 413, 11, 55, 8, 41, 324, 325, 326, 327, 328, 329, 330, 331, 124, 125, 141, 140, 506, 507, 504, 505, 511, 510, 509, 508],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 116, 117, 83, 82, 376, 377, 224, 378, 379, 380, 381, 225, 1, 52, 6, 34, 168, 294, 295, 296, 169, 297, 298, 299, 128, 129, 91, 90, 513, 514, 212, 512, 517, 516, 515, 213, 23, 24, 13, 25, 256, 257, 258, 259, 260, 261, 262, 263, 574, 575, 576, 577, 578, 579, 580, 581, 582, 583, 584, 585, 64, 62, 14, 39, 308, 309, 310, 311, 312, 313, 314, 315, 519, 518, 521, 520, 524, 525, 522, 523, 529, 528, 527, 526, 26, 20, 27, 28, 264, 265, 266, 267, 268, 269, 270, 271, 586, 587, 588, 589, 590, 591, 592, 593, 594, 595, 596, 597, 65, 59, 40, 38, 316, 317, 318, 319, 320, 321, 322, 323, 531, 530, 533, 532, 536, 537, 534, 535, 541, 540, 539, 538, 4, 22, 5, 19, 272, 273, 274, 275, 276, 277, 278, 279, 109, 108, 79, 78, 598, 599, 600, 601, 602, 603, 604, 605, 11, 55, 8, 41, 324, 325, 326, 327, 328, 329, 330, 331, 126, 127, 93, 92, 544, 545, 542, 543, 549, 548, 547, 546],
                [0, 24, 5, 28, 158, 265, 258, 275, 159, 277, 270, 263, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 66, 69, 50, 49, 332, 349, 342, 359, 336, 361, 354, 347, 493, 123, 483, 140, 498, 507, 204, 485, 503, 490, 509, 205, 23, 16, 27, 19, 256, 273, 251, 267, 260, 269, 278, 255, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 68, 67, 48, 51, 340, 357, 334, 351, 344, 353, 362, 339, 124, 480, 89, 494, 506, 499, 484, 474, 511, 478, 501, 488, 26, 22, 13, 17, 264, 250, 274, 259, 268, 261, 254, 279, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 70, 73, 46, 45, 348, 333, 358, 343, 352, 345, 338, 363, 122, 492, 141, 482, 475, 487, 496, 505, 479, 510, 489, 500, 4, 20, 2, 25, 272, 257, 266, 252, 276, 253, 262, 271, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 72, 71, 44, 47, 356, 341, 350, 335, 360, 337, 346, 355, 481, 125, 495, 88, 486, 476, 504, 497, 491, 502, 477, 508],
                [0, 24, 5, 28, 158, 265, 258, 275, 159, 277, 270, 263, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 606, 607, 608, 609, 610, 611, 612, 613, 614, 615, 616, 617, 531, 129, 521, 92, 536, 545, 212, 523, 541, 528, 547, 213, 23, 16, 27, 19, 256, 273, 251, 267, 260, 269, 278, 255, 426, 427, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 126, 518, 91, 532, 544, 537, 522, 512, 549, 516, 539, 526, 26, 22, 13, 17, 264, 250, 274, 259, 268, 261, 254, 279, 438, 439, 440, 441, 442, 443, 444, 445, 446, 447, 448, 449, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 128, 530, 93, 520, 513, 525, 534, 543, 517, 548, 527, 538, 4, 20, 2, 25, 272, 257, 266, 252, 276, 253, 262, 271, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 519, 127, 533, 90, 524, 514, 542, 535, 529, 540, 515, 546],
                [0, 16, 2, 17, 158, 250, 251, 252, 159, 253, 254, 255, 100, 101, 75, 74, 370, 371, 188, 372, 373, 374, 375, 189, 1, 52, 6, 34, 168, 294, 295, 296, 169, 297, 298, 299, 122, 123, 89, 88, 475, 476, 204, 474, 479, 478, 477, 205, 29, 21, 15, 30, 280, 281, 282, 283, 284, 285, 286, 287, 116, 117, 83, 82, 376, 377, 224, 378, 379, 380, 381, 225, 53, 54, 9, 42, 300, 301, 302, 303, 304, 305, 306, 307, 128, 129, 91, 90, 513, 514, 212, 512, 517, 516, 515, 213],
                [0, 20, 13, 19, 158, 273, 266, 259, 159, 261, 278, 271, 462, 463, 464, 465, 466, 467, 468, 469, 470, 471, 472, 473, 1, 59, 14, 41, 168, 325, 318, 311, 169, 313, 330, 323, 551, 550, 553, 552, 556, 557, 554, 555, 561, 560, 559, 558, 29, 31, 32, 33, 280, 288, 289, 290, 284, 291, 292, 293, 450, 415, 440, 429, 454, 431, 420, 445, 458, 447, 436, 425, 53, 63, 36, 35, 300, 364, 365, 366, 304, 367, 368, 369, 563, 562, 565, 564, 568, 569, 566, 567, 573, 572, 571, 570],
                [0, 16],
                [0, 18],
                [0, 16, 26, 20],
                [0, 2, 23, 13],
                [0, 3, 4, 32],
                [0, 2, 29, 15],
                [0, 3, 29, 27],
                [0, 52],
                [0, 63],
                [0, 52, 26, 59],
                [0, 63, 26, 54],
                [0, 52, 16, 1],
                [0, 18, 1, 61],
                [0, 52, 16, 1, 26, 59, 20, 65],
                [0, 31, 1, 63],
                [0, 1, 24, 62],
                [0, 31, 1, 63, 26, 21, 65, 54],
                [0, 2, 57, 56],
                [0, 60, 3, 16],
                [0, 22, 57, 3],
                [0, 2, 28, 20],
                [0, 17, 13, 24],
                [0, 20, 19, 13, 4, 24, 17, 27],
                [0, 22, 57, 3, 4, 16, 60, 32],
                [0, 22, 57, 3, 23, 20, 30, 12, 26, 24, 33, 15, 4, 16, 60, 32],
                [0, 22, 57, 3, 29, 18, 27, 25],
                [0, 22, 3, 57, 1, 55, 10, 37],
                [0, 22, 385, 396, 3, 57, 109, 117],
                [0, 22, 57, 3, 159, 279, 654, 655, 158, 274, 656, 657, 29, 18, 25, 27, 284, 658, 262, 269, 280, 659, 257, 267]
            ], e.Spacegroup = {
                "P 1": 0,
                "P -1": 1,
                "P 1 2 1": 2,
                "P 1 21 1": 3,
                "C 1 2 1": 4,
                "P 1 m 1": 5,
                "P 1 c 1": 6,
                "C 1 m 1": 7,
                "C 1 c 1": 8,
                "P 1 2/m 1": 9,
                "P 1 21/m 1": 10,
                "C 1 2/m 1": 11,
                "P 1 2/c 1": 12,
                "P 1 21/c 1": 13,
                "C 1 2/c 1": 14,
                "P 2 2 2": 15,
                "P 2 2 21": 16,
                "P 21 21 2": 17,
                "P 21 21 21": 18,
                "C 2 2 21": 19,
                "C 2 2 2": 20,
                "F 2 2 2": 21,
                "I 2 2 2": 22,
                "I 21 21 21": 23,
                "P m m 2": 24,
                "P m c 21": 25,
                "P c c 2": 26,
                "P m a 2": 27,
                "P c a 21": 28,
                "P n c 2": 29,
                "P m n 21": 30,
                "P b a 2": 31,
                "P n a 21": 32,
                "P n n 2": 33,
                "C m m 2": 34,
                "C m c 21": 35,
                "C c c 2": 36,
                "A m m 2": 37,
                "A b m 2": 38,
                "A m a 2": 39,
                "A b a 2": 40,
                "F m m 2": 41,
                "F d d 2": 42,
                "I m m 2": 43,
                "I b a 2": 44,
                "I m a 2": 45,
                "P 2/m 2/m 2/m": 46,
                "P m m m": 46,
                "P 2/n 2/n 2/n": 47,
                "P n n n": 47,
                "P 2/c 2/c 2/m": 48,
                "P c c m": 48,
                "P 2/b 2/a 2/n": 49,
                "P b a n": 49,
                "P 21/m 2/m 2/a": 50,
                "P m m a": 50,
                "P 2/n 21/n 2/a": 51,
                "P n n a": 51,
                "P 2/m 2/n 21/a": 52,
                "P m n a": 52,
                "P 21/c 2/c 2/a": 53,
                "P c c a": 53,
                "P 21/b 21/a 2/m": 54,
                "P b a m": 54,
                "P 21/c 21/c 2/n": 55,
                "P c c n": 55,
                "P 2/b 21/c 21/m": 56,
                "P b c m": 56,
                "P 21/n 21/n 2/m": 57,
                "P n n m": 57,
                "P 21/m 21/m 2/n": 58,
                "P m m n": 58,
                "P 21/b 2/c 21/n": 59,
                "P b c n": 59,
                "P 21/b 21/c 21/a": 60,
                "P b c a": 60,
                "P 21/n 21/m 21/a": 61,
                "P n m a": 61,
                "C 2/m 2/c 21/m": 62,
                "C m c m": 62,
                "C 2/m 2/c 21/a": 63,
                "C m c a": 63,
                "C 2/m 2/m 2/m": 64,
                "C m m m": 64,
                "C 2/c 2/c 2/m": 65,
                "C c c m": 65,
                "C 2/m 2/m 2/a": 66,
                "C m m a": 66,
                "C 2/c 2/c 2/a": 67,
                "C c c a": 67,
                "F 2/m 2/m 2/m": 68,
                "F m m m": 68,
                "F 2/d 2/d 2/d": 69,
                "F d d d": 69,
                "I 2/m 2/m 2/m": 70,
                "I m m m": 70,
                "I 2/b 2/a 2/m": 71,
                "I b a m": 71,
                "I 21/b 21/c 21/a": 72,
                "I b c a": 72,
                "I 21/m 21/m 21/a": 73,
                "I m m a": 73,
                "P 4": 74,
                "P 41": 75,
                "P 42": 76,
                "P 43": 77,
                "I 4": 78,
                "I 41": 79,
                "P -4": 80,
                "I -4": 81,
                "P 4/m": 82,
                "P 42/m": 83,
                "P 4/n": 84,
                "P 42/n": 85,
                "I 4/m": 86,
                "I 41/a": 87,
                "P 4 2 2": 88,
                "P 4 21 2": 89,
                "P 41 2 2": 90,
                "P 41 21 2": 91,
                "P 42 2 2": 92,
                "P 42 21 2": 93,
                "P 43 2 2": 94,
                "P 43 21 2": 95,
                "I 4 2 2": 96,
                "I 41 2 2": 97,
                "P 4 m m": 98,
                "P 4 b m": 99,
                "P 42 c m": 100,
                "P 42 n m": 101,
                "P 4 c c": 102,
                "P 4 n c": 103,
                "P 42 m c": 104,
                "P 42 b c": 105,
                "I 4 m m": 106,
                "I 4 c m": 107,
                "I 41 m d": 108,
                "I 41 c d": 109,
                "P -4 2 m": 110,
                "P -4 2 c": 111,
                "P -4 21 m": 112,
                "P -4 21 c": 113,
                "P -4 m 2": 114,
                "P -4 c 2": 115,
                "P -4 b 2": 116,
                "P -4 n 2": 117,
                "I -4 m 2": 118,
                "I -4 c 2": 119,
                "I -4 2 m": 120,
                "I -4 2 d": 121,
                "P 4/m 2/m 2/m": 122,
                "P4/m m m": 122,
                "P 4/m 2/c 2/c": 123,
                "P4/m c c": 123,
                "P 4/n 2/b 2/m": 124,
                "P4/n b m": 124,
                "P 4/n 2/n 2/c": 125,
                "P4/n n c": 125,
                "P 4/m 21/b 2/m": 126,
                "P4/m b m": 126,
                "P 4/m 21/n 2/c": 127,
                "P4/m n c": 127,
                "P 4/n 21/m 2/m": 128,
                "P4/n m m": 128,
                "P 4/n 2/c 2/c": 129,
                "P4/n c c": 129,
                "P 42/m 2/m 2/c": 130,
                "P42/m m c": 130,
                "P 42/m 2/c 2/m": 131,
                "P42/m c m": 131,
                "P 42/n 2/b 2/c": 132,
                "P42/n b c": 132,
                "P 42/n 2/n 2/m": 133,
                "P42/n n m": 133,
                "P 42/m 21/b 2/c": 134,
                "P42/m b c": 134,
                "P 42/m 21/n 2/m": 135,
                "P42/m n m": 135,
                "P 42/n 21/m 2/c": 136,
                "P42/n m c": 136,
                "P 42/n 21/c 2/m": 137,
                "P42/n c m": 137,
                "I 4/m 2/m 2/m": 138,
                "I4/m m m": 138,
                "I 4/m 2/c 2/m": 139,
                "I4/m c m": 139,
                "I 41/a 2/m 2/d": 140,
                "I41/a m d": 140,
                "I 41/a 2/c 2/d": 141,
                "I41/a c d": 141,
                "P 3": 142,
                "P 31": 143,
                "P 32": 144,
                "H 3": 145,
                "R 3": 146,
                "P -3": 147,
                "H -3": 148,
                "R -3": 149,
                "P 3 1 2": 150,
                "P 3 2 1": 151,
                "P 31 1 2": 152,
                "P 31 2 1": 153,
                "P 32 1 2": 154,
                "P 32 2 1": 155,
                "H 3 2": 156,
                "R 3 2": 157,
                "P 3 m 1": 158,
                "P 3 1 m": 159,
                "P 3 c 1": 160,
                "P 3 1 c": 161,
                "H 3 m": 162,
                "R 3 m": 163,
                "H 3 c": 164,
                "R 3 c": 165,
                "P -3 1 2/m": 166,
                "P -3 1 m": 166,
                "P -3 1 2/c": 167,
                "P -3 1 c": 167,
                "P -3 2/m 1": 168,
                "P -3 m 1": 168,
                "P -3 2/c 1": 169,
                "P -3 c 1": 169,
                "H -3 2/m": 170,
                "H -3 m": 170,
                "R -3 2/m": 171,
                "R -3 m": 171,
                "H -3 2/c": 172,
                "H -3 c": 172,
                "R -3 2/c": 173,
                "R -3 c": 173,
                "P 6": 174,
                "P 61": 175,
                "P 65": 176,
                "P 62": 177,
                "P 64": 178,
                "P 63": 179,
                "P -6": 180,
                "P 6/m": 181,
                "P 63/m": 182,
                "P 6 2 2": 183,
                "P 61 2 2": 184,
                "P 65 2 2": 185,
                "P 62 2 2": 186,
                "P 64 2 2": 187,
                "P 63 2 2": 188,
                "P 6 m m": 189,
                "P 6 c c": 190,
                "P 63 c m": 191,
                "P 63 m c": 192,
                "P -6 m 2": 193,
                "P -6 c 2": 194,
                "P -6 2 m": 195,
                "P -6 2 c": 196,
                "P 6/m 2/m 2/m": 197,
                "P 6/m m m": 197,
                "P 6/m 2/c 2/c": 198,
                "P 6/m c c": 198,
                "P 63/m 2/c 2/m": 199,
                "P 63/m c m": 199,
                "P 63/m 2/m 2/c": 200,
                "P 63/m m c": 200,
                "P 2 3": 201,
                "F 2 3": 202,
                "I 2 3": 203,
                "P 21 3": 204,
                "I 21 3": 205,
                "P 2/m -3": 206,
                "P m -3": 206,
                "P 2/n -3": 207,
                "P n -3": 207,
                "F 2/m -3": 208,
                "F m -3": 208,
                "F 2/d -3": 209,
                "F d -3": 209,
                "I 2/m -3": 210,
                "I m -3": 210,
                "P 21/a -3": 211,
                "P a -3": 211,
                "I 21/a -3": 212,
                "I a -3": 212,
                "P 4 3 2": 213,
                "P 42 3 2": 214,
                "F 4 3 2": 215,
                "F 41 3 2": 216,
                "I 4 3 2": 217,
                "P 43 3 2": 218,
                "P 41 3 2": 219,
                "I 41 3 2": 220,
                "P -4 3 m": 221,
                "F -4 3 m": 222,
                "I -4 3 m": 223,
                "P -4 3 n": 224,
                "F -4 3 c": 225,
                "I -4 3 d": 226,
                "P 4/m -3 2/m": 227,
                "P m -3 m": 227,
                "P 4/n -3 2/n": 228,
                "P n -3 n": 228,
                "P 42/m -3 2/n": 229,
                "P m -3 n": 229,
                "P 42/n -3 2/m": 230,
                "P n -3 m": 230,
                "F 4/m -3 2/m": 231,
                "F m -3 m": 231,
                "F 4/m -3 2/c": 232,
                "F m -3 c": 232,
                "F 41/d -3 2/m": 233,
                "F d -3 m": 233,
                "F 41/d -3 2/c": 234,
                "F d -3 c": 234,
                "I 4/m -3 2/m": 235,
                "I m -3 m": 235,
                "I 41/a -3 2/d": 236,
                "I a -3 d": 236,
                "P 1 1 2": 237,
                "P 1 1 21": 238,
                "B 1 1 2": 239,
                "B 2": 239,
                "A 1 2 1": 240,
                "C 1 21 1": 241,
                "I 1 2 1": 242,
                "I 2": 242,
                "I 1 21 1": 243,
                "P 1 1 m": 244,
                "P 1 1 b": 245,
                "B 1 1 m": 246,
                "B 1 1 b": 247,
                "P 1 1 2/m": 248,
                "P 1 1 21/m": 249,
                "B 1 1 2/m": 250,
                "P 1 1 2/b": 251,
                "P 1 1 21/b": 252,
                "B 1 1 2/b": 253,
                "P 21 2 2": 254,
                "P 2 21 2": 255,
                "P 21 21 2 (a)": 256,
                "P 21 2 21": 257,
                "P 2 21 21": 258,
                "C 2 2 21a)": 259,
                "C 2 2 2a": 260,
                "F 2 2 2a": 261,
                "I 2 2 2a": 262,
                "P 21/m 21/m 2/n a": 263,
                "P 42 21 2a": 264,
                "I 2 3a": 265
            }
        }(o = t.SpacegroupTables || (t.SpacegroupTables = {}))
    }(t = e.Structure || (e.Structure = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        "use strict";

        function n(e, t, n) {
            return r.build(e, t, n)
        }
        var r;
        ! function(n) {
            function r() {
                return {
                    x: 0,
                    y: 0,
                    z: 0
                }
            }

            function i(e, t, n) {
                var r = e.x - n.center.x,
                    i = e.y - n.center.y,
                    o = e.z - n.center.z;
                return Math.sqrt(r * r + i * i + o * o) - (t + n.radius)
            }

            function o(e, t, n, r, o, a) {
                return a.x = n.x[t], a.y = n.y[t], a.z = n.z[t], m.transformVector3(a, a, r), i(a, n.r[t], e) <= o
            }

            function a(e, t, n) {
                var r = n.x[e] - n.cX[t],
                    i = n.y[e] - n.cY[t],
                    o = n.z[e] - n.cZ[t];
                return r * r + i * i + o * o
            }

            function s(e, t, n) {
                var r = n.x[e] - t.x,
                    i = n.y[e] - t.y,
                    o = n.z[e] - t.z;
                return r * r + i * i + o * o
            }

            function l(e, n) {
                for (var i = e.atoms, o = e.residues, l = e.chains, c = e.entities, u = i.x, d = i.y, p = i.z, h = new t.DataTableBuilder(c.count), m = h.addColumn("x", function(e) {
                        return new Float64Array(e)
                    }), y = h.addColumn("y", function(e) {
                        return new Float64Array(e)
                    }), v = h.addColumn("z", function(e) {
                        return new Float64Array(e)
                    }), b = h.addColumn("r", function(e) {
                        return new Float64Array(e)
                    }), w = new t.DataTableBuilder(l.count), x = w.addColumn("x", function(e) {
                        return new Float64Array(e)
                    }), S = w.addColumn("y", function(e) {
                        return new Float64Array(e)
                    }), E = w.addColumn("z", function(e) {
                        return new Float64Array(e)
                    }), I = w.addColumn("r", function(e) {
                        return new Float64Array(e)
                    }), C = new t.DataTableBuilder(o.count), T = C.addColumn("x", function(e) {
                        return new Float64Array(e)
                    }), M = C.addColumn("y", function(e) {
                        return new Float64Array(e)
                    }), _ = C.addColumn("z", function(e) {
                        return new Float64Array(e)
                    }), A = C.addColumn("r", function(e) {
                        return new Float64Array(e)
                    }), P = r(), k = 0, R = r(), V = 0, D = 0, L = r(), F = 0, H = r(), B = 0, O = r(), z = 0, q = 0, N = c.count; N > q; q++) {
                    L.x = 0, L.y = 0, L.z = 0;
                    for (var G = c.chainStartIndex[q], j = c.chainEndIndex[q]; j > G; G++) {
                        H.x = 0, H.y = 0, H.z = 0;
                        for (var U = l.residueStartIndex[G], W = l.residueEndIndex[G]; W > U; U++) {
                            O.x = 0, O.y = 0, O.z = 0;
                            for (var X = o.atomStartIndex[U], $ = o.atomEndIndex[U]; $ > X; X++) O.x += u[X], O.y += d[X], O.z += p[X];
                            P.x += O.x, P.y += O.y, P.z += O.z, D = o.atomEndIndex[U] - o.atomStartIndex[U], H.x += O.x, H.y += O.y, H.z += O.z, T[U] = O.x / D, M[U] = O.y / D, _[U] = O.z / D
                        }
                        L.x += H.x, L.y += H.y, L.z += H.z, D = l.atomEndIndex[G] - l.atomStartIndex[G], x[G] = H.x / D, S[G] = H.y / D, E[G] = H.z / D
                    }
                    D = c.atomEndIndex[q] - c.atomStartIndex[q], m[q] = L.x / D, y[q] = L.y / D, v[q] = L.z / D
                }
                P.x /= i.count, P.y /= i.count, P.z /= i.count;
                for (var Y = 0, Z = n; Y < Z.length; Y++) {
                    var X = Z[Y];
                    R.x += u[X], R.y += d[X], R.z += p[X]
                }
                var Q = n.length > 0 ? n.length : 1;
                R.x /= Q, R.y /= Q, R.z /= Q;
                for (var J = {
                        x: u,
                        y: d,
                        z: p,
                        cX: m,
                        cY: y,
                        cZ: v
                    }, K = {
                        x: u,
                        y: d,
                        z: p,
                        cX: x,
                        cY: S,
                        cZ: E
                    }, ee = {
                        x: u,
                        y: d,
                        z: p,
                        cX: T,
                        cY: M,
                        cZ: _
                    }, q = 0, N = c.count; N > q; q++) {
                    F = 0;
                    for (var G = c.chainStartIndex[q], j = c.chainEndIndex[q]; j > G; G++) {
                        B = 0;
                        for (var U = l.residueStartIndex[G], W = l.residueEndIndex[G]; W > U; U++) {
                            z = 0;
                            for (var X = o.atomStartIndex[U], $ = o.atomEndIndex[U]; $ > X; X++) z = Math.max(z, a(X, U, ee)), B = Math.max(B, a(X, G, K)), F = Math.max(F, a(X, q, J)), k = Math.max(k, s(X, P, ee));
                            z = Math.sqrt(z), A[U] = z
                        }
                        B = Math.sqrt(B), I[G] = B
                    }
                    F = Math.sqrt(F), b[q] = F
                }
                k = Math.sqrt(k);
                for (var te = 0, ne = n; te < ne.length; te++) {
                    var X = ne[te];
                    V = Math.max(V, s(X, R, ee))
                }
                return V = Math.sqrt(V), new g(h.seal(), w.seal(), C.seal(), new f(P, k), new f(R, V))
            }

            function c(e) {
                var t = e.boundingInfo,
                    n = e.spacegroup,
                    r = [];
                e.transform = m.identity(), r[0] = e.getTransform();
                for (var o = -3; 3 >= o; o++)
                    for (var a = -3; 3 >= a; a++)
                        for (var s = -3; 3 >= s; s++)
                            for (var l = 0 === o && 0 === a && 0 === s ? 1 : 0, c = n.operatorCount; c > l; l++) {
                                n.getOperatorMatrix(l, o, a, s, e.transform), e.i = o, e.k = s, e.j = a, e.op = l;
                                var u = e.map(t.allAtoms.center),
                                    d = i(u, t.allAtoms.radius, t.target);
                                d < e.radius && (r[r.length] = e.getTransform())
                            }
                return r
            }

            function u(t, n) {
                for (var r = t.boundingInfo, i = t.radius, a = r.target, s = t.model, l = (s.atoms, s.residues), c = s.chains, u = s.entities, d = new e.Utils.ChunkedArrayBuilder(function(e) {
                        return new Int32Array(e)
                    }, t.model.residues.count, 1), p = new e.Utils.ChunkedArrayBuilder(function(e) {
                        return new Int32Array(e)
                    }, t.model.residues.count, 1), h = {
                        x: 0,
                        y: 0,
                        z: 0
                    }, m = 0, f = 0, g = 0, y = 0, v = u.count; v > y; y++) {
                    m = 0;
                    for (var b = 0, w = n; b < w.length; b++) {
                        for (var x = w[b], S = u.chainStartIndex[y], E = u.chainEndIndex[y]; E > S; S++)
                            if (o(a, S, r.chains, x.transform, i, h)) {
                                for (var I = !1, C = c.residueStartIndex[S], T = c.residueEndIndex[S]; T > C; C++) o(a, C, r.residues, x.transform, i, h) && (d.add(C), p.add(m), f += l.atomEndIndex[C] - l.atomStartIndex[C], I = !0);
                                I && (g += 1)
                            }
                        m++
                    }
                }
                return {
                    residues: d.compact(),
                    operators: p.compact(),
                    atomCount: f,
                    chainCount: g
                }
            }

            function d(e, t, n, r, i) {
                for (var o = 0; i > o; o++) n[o][r] = e[o][t]
            }

            function p(e, n, r) {
                for (var i, o, a, s, l, c, u = e.model, p = u.residues, h = p.chainIndex, f = p.entityIndex, g = p.atomStartIndex, y = p.atomEndIndex, v = u.atoms, b = v.x, w = v.y, x = v.z, S = new t.DataTableBuilder(n.atomCount), E = [], I = u.entities.clone(), C = I.chainStartIndex, T = I.chainEndIndex, M = I.residueStartIndex, _ = I.residueEndIndex, A = I.atomStartIndex, P = I.atomEndIndex, k = 0, R = u.chains.getBuilder(n.chainCount), V = u.chains.getRawData(), D = R.getRawData(), L = R.residueStartIndex, F = R.residueEndIndex, H = R.atomStartIndex, B = R.atomEndIndex, O = R.asymId, z = R.authAsymId, q = 0, N = u.residues.getBuilder(n.residues.length), G = u.residues.getRawData(), j = N.getRawData(), U = N.atomStartIndex, W = N.atomEndIndex, X = N.asymId, $ = N.authAsymId, Y = N.chainIndex, Z = 0, Q = u.atoms.columns; Z < Q.length; Z++) {
                    var J = Q[Z],
                        K = S.addColumn(J.name, J.creator);
                    "x" === J.name ? i = K : "y" === J.name ? o = K : "z" === J.name ? a = K : "residueIndex" === J.name ? l = K : "chainIndex" === J.name ? c = K : "id" === J.name ? s = K : E[E.length] = {
                        src: v[J.name],
                        target: K
                    }
                }
                var ee, te, ne = n.residues,
                    re = n.operators,
                    ie = {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    oe = 0,
                    ae = ne[0],
                    se = h[ae],
                    le = f[ae],
                    ce = re[0];
                C[0] = 0, M[0] = 0, A[0] = 0, d(V, h[ae], D, 0, V.length), L[0] = 0, H[0] = 0, ee = u.chains.asymId[h[ae]], te = u.chains.authAsymId[h[ae]];
                var ue = r[re[0]];
                ue && !ue.isIdentity && (O[q] = u.chains.asymId[h[ae]] + "-" + ue.id, z[q] = u.chains.authAsymId[h[ae]] + "-" + ue.id);
                for (var de = 0, pe = ne.length; pe > de; de++) {
                    ae = ne[de];
                    var he = re[de];
                    ue = r[he], d(G, ae, j, de, j.length);
                    var me = f[ae],
                        fe = h[ae];
                    me !== le ? (F[q] = de, B[q] = oe, q += 1, T[k] = q, _[k] = de, P[k] = oe, k += 1, C[k] = q, M[k] = de, A[k] = oe, d(V, fe, D, q, V.length), L[q] = de, H[q] = oe, ue.isIdentity || (O[q] = u.chains.asymId[fe] + "-" + ue.id, z[q] = u.chains.authAsymId[fe] + "-" + ue.id), ee = u.chains.asymId[fe], te = u.chains.authAsymId[fe]) : fe !== se ? (F[q] = de, B[q] = oe, q += 1, d(V, fe, D, q, V.length), L[q] = de, H[q] = oe, ue.isIdentity || (O[q] = u.chains.asymId[fe] + "-" + ue.id, z[q] = u.chains.authAsymId[fe] + "-" + ue.id), ee = u.chains.asymId[fe], te = u.chains.authAsymId[fe]) : he !== ce && (F[q] = de, B[q] = oe, q += 1, d(V, fe, D, q, V.length), L[q] = de, H[q] = oe, ue.isIdentity || (O[q] = u.chains.asymId[fe] + "-" + ue.id, z[q] = u.chains.authAsymId[fe] + "-" + ue.id), ee = O[q], te = z[q]), se = fe, le = me, ce = he, Y[de] = q, U[de] = oe, X[de] = ee, $[de] = te;
                    for (var ge = g[ae], ye = y[ae]; ye > ge; ge++) {
                        ie.x = b[ge], ie.y = w[ge], ie.z = x[ge], m.transformVector3(ie, ie, ue.transform), i[oe] = ie.x, o[oe] = ie.y, a[oe] = ie.z, s[oe] = oe + 1, l[oe] = de, c[oe] = q;
                        for (var ve = 0, be = E; ve < be.length; ve++) {
                            var we = be[ve];
                            we.target[oe] = we.src[ge]
                        }
                        oe++
                    }
                    W[de] = oe
                }
                T[k] = q + 1, _[k] = ne.length, P[k] = oe, F[q] = ne.length, B[q] = oe;
                var xe = S.seal(),
                    Se = N.seal(),
                    Ee = R.seal(),
                    Ie = I,
                    Ce = new t.SecondaryStructureElement(t.SecondaryStructureType.None, new t.PolyResidueIdentifier("", 0, null), new t.PolyResidueIdentifier("", 0, null));
                return Ce.startResidueIndex = 0, Ce.endResidueIndex = Se.count, new t.MoleculeModel(u.id, u.modelId, xe, Se, Ee, Ie, u.componentBonds, [Ce], void 0, void 0)
            }

            function h(e, n, r) {
                var i = e.symmetryInfo;
                if (!i || "P 1" === i.spacegroupName || i.cellSize[0] < 1.1 && i.cellSize[1] < 1.1 && i.cellSize[2] < 1.1) return e;
                var o;
                o = r ? r(e.queryContext).unionAtomIndices() : e.atoms.indices;
                var a = l(e, o),
                    s = new t.Spacegroup(e.symmetryInfo),
                    d = new y(e, a, s, n),
                    h = c(d),
                    m = u(d, h);
                return p(d, m, h)
            }
            var m = e.Geometry.LinearAlgebra.Matrix4,
                f = function() {
                    function e(e, t) {
                        this.center = e, this.radius = t
                    }
                    return e
                }(),
                g = function() {
                    function e(e, t, n, r, i) {
                        this.entities = e, this.chains = t, this.residues = n, this.allAtoms = r, this.target = i
                    }
                    return e
                }(),
                y = function() {
                    function e(e, t, n, r) {
                        this.model = e, this.boundingInfo = t, this.spacegroup = n, this.radius = r, this.transform = m.empty(), this.transformed = {
                            x: 0,
                            y: 0,
                            z: 0
                        }, this.i = 0, this.j = 0, this.k = 0, this.op = 0
                    }
                    return e.prototype.map = function(e) {
                        return m.transformVector3(this.transformed, e, this.transform)
                    }, e.prototype.getTransform = function() {
                        return new v(this.i, this.j, this.k, this.op, m.clone(this.transform))
                    }, e
                }(),
                v = function() {
                    function e(e, t, n, r, i) {
                        this.i = e, this.j = t, this.k = n, this.opIndex = r, this.transform = i, this._id = null, this.isIdentity = !(e || t || n || r)
                    }
                    return Object.defineProperty(e.prototype, "id", {
                        get: function() {
                            return this._id ? this._id : (this._id = this.opIndex + 1 + "_" + (5 + this.i) + (5 + this.j) + (5 + this.k), this._id)
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e
                }();
            n.build = h
        }(r || (r = {})), t.buildPivotGroupSymmetry = n
    }(t = e.Structure || (e.Structure = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(t) {
            var n = function() {
                function t(e, t, n) {
                    this.structure = e, this.mask = t, this.count = n
                }
                return Object.defineProperty(t.prototype, "tree", {
                    get: function() {
                        return this.lazyTree || this.makeTree(), this.lazyTree
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.hasAtom = function(e) {
                    return 0 !== this.mask[e]
                }, t.prototype.hasRange = function(e, t) {
                    for (var n = e; t > n; n++)
                        if (this.mask[n]) return !0;
                    return !1
                }, t.ofStructure = function(e) {
                    for (var n = e.atoms.count, r = new Int8Array(n), i = 0; n > i; i++) r[i] = 1;
                    return new t(e, r, n)
                }, t.ofFragments = function(e) {
                    var n = e.context.structure.atoms.count,
                        r = new Int8Array(n),
                        i = 0;
                    e.fragments.forEach(function(e) {
                        for (var t = 0, n = e.atomIndices; t < n.length; t++) {
                            var r = n[t];
                            this[r] = 1
                        }
                    }, r);
                    for (var o = 0; n > o; o++) 0 !== r[o] && i++;
                    return new t(e.context.structure, r, i)
                }, t.prototype.makeTree = function() {
                    for (var t = new Int32Array(this.count), n = this.structure.atoms, r = 0, i = n.x, o = n.y, a = n.z, s = 0; s < this.mask.length; s++) this.mask[s] && (t[r++] = s);
                    this.lazyTree = new e.Geometry.SubdivisionTree3D(t, function(e, t) {
                        return t.add(i[e], o[e], a[e])
                    })
                }, t
            }();
            t.QueryContext = n;
            var r = function() {
                function e(e, t, n) {
                    this._hashCode = 0, this._hashComputed = !1, this.context = e, this.tag = t, this.atomIndices = n
                }
                return Object.defineProperty(e.prototype, "hashCode", {
                    get: function() {
                        if (this._hashComputed) return this._hashCode;
                        for (var e = 23, t = 0, n = this.atomIndices; t < n.length; t++) {
                            var r = n[t];
                            e = 31 * e + r | 0
                        }
                        return this._hashCode = e, this._hashComputed = !0, e
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "id", {
                    get: function() {
                        return this.context.structure.id + "_" + this.tag
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "atomCount", {
                    get: function() {
                        return this.atomIndices.length
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "isHet", {
                    get: function() {
                        var e = this.context.structure.atoms.residueIndex[this.tag];
                        return this.context.structure.residues.isHet[e]
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "fingerprint", {
                    get: function() {
                        if (this._fingerprint) return this._fingerprint;
                        var e = this.residueIndices,
                            t = (this.context.structure, this.context.structure.residues),
                            n = t.name,
                            r = t.asymId,
                            i = t.seqNumber,
                            o = t.insCode,
                            a = [];
                        return e.forEach(function(e) {
                            var t = n[e] + " " + r[e] + " " + i[e];
                            o[e] && (t += " i:" + o[e]), a[a.length] = t
                        }), a.join("-")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "authFingerprint", {
                    get: function() {
                        if (this._authFingerprint) return this._authFingerprint;
                        var e = this.residueIndices,
                            t = (this.context.structure, this.context.structure.residues),
                            n = t.authName,
                            r = t.authAsymId,
                            i = t.authSeqNumber,
                            o = t.insCode,
                            a = [];
                        return e.forEach(function(e) {
                            var t = n[e] + " " + r[e] + " " + i[e];
                            o[e] && (t += " i:" + o[e]), a[a.length] = t
                        }), a.join("-")
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "residueIndices", {
                    get: function() {
                        if (this._residueIndices) return this._residueIndices;
                        for (var e = new Set, t = [], n = this.context.structure.atoms.residueIndex, r = (this.context.structure, this.context.structure.residues), i = (r.name, r.asymId, r.seqNumber, 0), o = this.atomIndices; i < o.length; i++) {
                            var a = o[i];
                            e.add(n[a])
                        }
                        return e.forEach(function(e) {
                            this[this.length] = e
                        }, t), t.sort(function(e, t) {
                            return e - t
                        }), t
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.areEqual = function(e, t) {
                    if (e.atomCount !== t.atomCount) return !1;
                    for (var n = e.atomIndices, r = t.atomIndices, i = 0; i < n.length; i++)
                        if (n[i] !== r[i]) return !1;
                    return e.tag === t.tag
                }, e.ofSet = function(t, n) {
                    var r = new Int32Array(n.size);
                    return n.forEach(function(e) {
                        this.array[this.index++] = e
                    }, {
                        array: r,
                        index: 0
                    }), Array.prototype.sort.call(r, function(e, t) {
                        return e - t
                    }), new e(t, r[0], r)
                }, e.ofArray = function(t, n, r) {
                    return new e(t, n, r)
                }, e.ofIndex = function(t, n) {
                    var r = new Int32Array(1);
                    return r[0] = n, new e(t, n, r)
                }, e.ofIndexRange = function(t, n, r) {
                    for (var i = 0, o = n; r > o; o++) t.hasAtom(o) && i++;
                    for (var a = new Int32Array(i), s = 0, o = n; r > o; o++) t.hasAtom(o) && (a[s++] = o);
                    return new e(t, n, a)
                }, e
            }();
            t.Fragment = r;
            var i = function() {
                function e(e, t) {
                    this.context = e, this.fragments = t
                }
                return e.empty = function(t) {
                    return new e(t, [])
                }, Object.defineProperty(e.prototype, "length", {
                    get: function() {
                        return this.fragments.length
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.unionAtomIndices = function() {
                    for (var e = new Int8Array(this.context.structure.atoms.count), t = 0, n = 0, r = this.fragments; n < r.length; n++)
                        for (var i = r[n], o = 0, a = i.atomIndices; o < a.length; o++) {
                            var s = a[o];
                            e[s] = 1
                        }
                    for (var l = 0, c = e; l < c.length; l++) {
                        var s = c[l];
                        t += s
                    }
                    for (var u = new Int32Array(t), d = 0, p = 0, h = e.length; h > p; p++) e[p] && (u[d++] = p);
                    return u
                }, e
            }();
            t.FragmentSeq = i;
            var o = function() {
                function e(e) {
                    this.ctx = e, this.fragments = []
                }
                return e.prototype.add = function(e) {
                    this.fragments[this.fragments.length] = e
                }, e.prototype.getSeq = function() {
                    return new i(this.ctx, this.fragments)
                }, e
            }();
            t.FragmentSeqBuilder = o;
            var a = function() {
                function e(e) {
                    this.ctx = e, this.fragments = [], this.byHash = new Map
                }
                return e.prototype.add = function(e) {
                    var t = e.hashCode;
                    if (this.byHash.has(t)) {
                        for (var n = this.byHash.get(t), i = 0, o = n; i < o.length; i++) {
                            var a = o[i];
                            if (r.areEqual(e, a)) return this
                        }
                        this.fragments[this.fragments.length] = e, n[n.length] = e
                    } else this.fragments[this.fragments.length] = e, this.byHash.set(t, [e]);
                    return this
                }, e.prototype.getSeq = function() {
                    return new i(this.ctx, this.fragments)
                }, e
            }();
            t.HashFragmentSeqBuilder = a
        }(n = t.Queries || (t.Queries = {}))
    }(t = e.Structure || (e.Structure = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(t) {
            var n = function() {
                function e(e) {
                    this.compiler = e
                }
                return e.prototype.ambientResidues = function(t) {
                    var n = this;
                    return new e(function() {
                        return i.compileAmbientResidues(n.compile(), t)
                    })
                }, e.prototype.wholeResidues = function() {
                    var t = this;
                    return new e(function() {
                        return i.compileWholeResidues(t.compile())
                    })
                }, e.prototype.union = function() {
                    var t = this;
                    return new e(function() {
                        return i.compileUnion(t.compile())
                    })
                }, e.prototype.inside = function(t) {
                    var n = this;
                    return new e(function() {
                        return i.compileInside(n.compile(), t.compile())
                    })
                }, e.prototype.compile = function() {
                    return this.compiler()
                }, e.extend = function(t, n) {
                    e.prototype[t] = function() {
                        return new e(n(this))
                    }
                }, e.build = function(t) {
                    return new e(t)
                }, e
            }();
            t.QueryBuilder = n;
            var r;
            ! function(e) {
                function t() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
                    return n.build(function() {
                        return i.compileAtomRanges(!1, e, function(e) {
                            return e.residues
                        })
                    })
                }

                function r() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
                    return n.build(function() {
                        return i.compileAtomRanges(!1, e, function(e) {
                            return e.chains
                        })
                    })
                }

                function o() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
                    return n.build(function() {
                        return i.compileAtomRanges(!1, e, function(e) {
                            return e.entities
                        })
                    })
                }

                function a(e, t, r, o) {
                    return n.build(function() {
                        return i.compileSequence(e, t, r, o)
                    })
                }

                function s() {
                    return n.build(function() {
                        return i.compileHetGroups()
                    })
                }

                function l() {
                    return n.build(function() {
                        return i.compilePolymerNames(["CA", "O", "O5'", "C3'", "N3"], !1)
                    })
                }

                function c() {
                    return n.build(function() {
                        return i.compilePolymerNames(["N", "CA", "C", "O", "P", "OP1", "OP2", "O3'", "O5'", "C3'", "C5'"], !1)
                    })
                }

                function u() {
                    return n.build(function() {
                        return i.compilePolymerNames(["N", "CA", "C", "O", "P", "OP1", "OP2", "O3'", "O5'", "C3'", "C5'"], !0)
                    })
                }

                function d(e, t) {
                    return n.build(function() {
                        return i.compileAtomsInBox(e, t)
                    })
                }

                function p() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t - 0] = arguments[t];
                    return n.build(function() {
                        return i.compileOr(e.map(function(e) {
                            return e.compile()
                        }))
                    })
                }
                e.residues = t, e.chains = r, e.entities = o, e.sequence = a, e.hetGroups = s, e.cartoons = l, e.backbone = c, e.sidechain = u, e.atomsInBox = d, e.or = p
            }(r = t.Generators || (t.Generators = {}));
            var i;
            ! function(n) {
                function r(e, n, r) {
                    return function(i) {
                        for (var o = r(i.structure), a = o.atomStartIndex, s = o.atomEndIndex, l = new t.FragmentSeqBuilder(i), c = o.count, u = !1, d = n.map(function(e) {
                                return new m(e, o)
                            }), p = 0 === d.length, h = 0; c > h; h++)
                            if (i.hasRange(a[h], s[h])) {
                                u = p;
                                for (var f = 0, g = d; f < g.length; f++) {
                                    var y = g[f];
                                    if (y.isSatisfied(h)) {
                                        u = !0;
                                        break
                                    }
                                }
                                e && (u = !u), u && l.add(t.Fragment.ofIndexRange(i, a[h], s[h]))
                            }
                        return l.getSeq()
                    }
                }

                function i(e, n, r, i) {
                    return function(o) {
                        var a = o.structure.residues,
                            s = a.atomStartIndex,
                            l = a.atomEndIndex,
                            c = a.entityId,
                            u = a.asymId,
                            d = a.seqNumber,
                            p = a.count,
                            h = 0,
                            m = -1,
                            f = -1;
                        for (h = 0; p > h; h++)
                            if (c[h] === e && u[h] === n && d[h] >= r.seqNumber) {
                                m = h;
                                break
                            }
                        if (h === p) return t.FragmentSeq.empty(o);
                        for (h = m; p > h; h++) {
                            if (c[h] !== e || u[h] !== n) {
                                h--;
                                break
                            }
                            if (d[h] === i.seqNumber) break
                        }
                        return f = h, o.hasRange(s[m], l[f]) ? new t.FragmentSeq(o, [t.Fragment.ofIndexRange(o, s[m], l[f])]) : t.FragmentSeq.empty(o)
                    }
                }

                function o() {
                    return function(n) {
                        for (var r = n.structure.residues, i = r.atomStartIndex, o = r.atomEndIndex, a = r.isHet, s = r.entityIndex, l = n.structure.entities.entityType, c = e.EntityType.Water, u = new t.FragmentSeqBuilder(n), d = r.count, p = 0; d > p; p++) n.hasRange(i[p], o[p]) && l[s[p]] !== c && a[p] && u.add(t.Fragment.ofIndexRange(n, i[p], o[p]));
                        return u.getSeq()
                    }
                }

                function a(e, n) {
                    return function(r) {
                        for (var i = r.structure.atoms, o = i.x, a = i.y, s = i.z, l = i.count, c = [], u = 0; l > u; u++)
                            if (r.hasAtom(u)) {
                                var d = o[u],
                                    p = a[u],
                                    h = s[u];
                                d >= e.x && d <= n.x && p >= e.y && p <= n.y && h >= e.z && h <= n.z && (c[c.length] = u)
                            }
                        return c.length ? new t.FragmentSeq(r, [new t.Fragment(r, c[0], c)]) : t.FragmentSeq.empty(r)
                    }
                }

                function s(e, n) {
                    return function(r) {
                        return new t.FragmentSeq(r, e(t.QueryContext.ofFragments(n(r))).fragments)
                    }
                }

                function l(e, n) {
                    return function(r) {
                        for (var i, o = e(r).fragments, a = new t.FragmentSeqBuilder(r), s = 0; s < o.length; s++) i = o[s], n(i) && a.add(i);
                        return a.getSeq()
                    }
                }

                function c(e) {
                    return function(n) {
                        for (var r = new t.HashFragmentSeqBuilder(n), i = 0, o = e; i < o.length; i++)
                            for (var a = o[i], s = a(n), l = 0, c = s.fragments; l < c.length; l++) {
                                var u = c[l];
                                r.add(u)
                            }
                        return r.getSeq()
                    }
                }

                function u(e) {
                    return function(n) {
                        for (var r, i = e(n).fragments, o = new Set, a = 0, s = 0; s < i.length; s++)
                            for (r = i[s].atomIndices, a = 0; a < r.length; a++) o.add(r[a]);
                        return 0 === o.size ? t.FragmentSeq.empty(n) : new t.FragmentSeq(n, [t.Fragment.ofSet(n, o)])
                    }
                }

                function d(n, r) {
                    return function(i) {
                        var o = i.structure,
                            a = o.atoms.name,
                            s = [],
                            l = 0,
                            c = new Set(n);
                        if (r) {
                            for (var u = 0; u < o.entities.count; u++)
                                if (o.entities.entityType[u] === e.EntityType.Polymer)
                                    for (var d = o.entities.atomStartIndex[u], p = o.entities.atomEndIndex[u], h = d; p > h; h++) i.hasAtom(h) && !c.has(a[h]) && (s[l++] = h)
                        } else
                            for (var u = 0; u < o.entities.count; u++)
                                if (o.entities.entityType[u] === e.EntityType.Polymer)
                                    for (var d = o.entities.atomStartIndex[u], p = o.entities.atomEndIndex[u], h = d; p > h; h++) i.hasAtom(h) && c.has(a[h]) && (s[l++] = h); return s.length ? new t.FragmentSeq(i, [t.Fragment.ofArray(i, s[0], new Int32Array(s))]) : t.FragmentSeq.empty(i)
                    }
                }

                function p(e, n) {
                    return function(r) {
                        for (var i = e(r), o = r.tree, a = o.createContextRadius(n, !1), s = a.buffer, l = new t.HashFragmentSeqBuilder(r), c = r.structure.atoms.x, u = r.structure.atoms.y, d = r.structure.atoms.z, p = r.structure.atoms.residueIndex, h = r.structure.residues.atomStartIndex, m = r.structure.residues.atomEndIndex, f = new Set, g = 0, y = i.fragments; g < y.length; g++) {
                            var v = y[g];
                            f.clear();
                            for (var b = 0, w = v.atomIndices; b < w.length; b++) {
                                var x = w[b];
                                f.add(p[x]), a.nearest(c[x], u[x], d[x], n);
                                for (var S = 0, E = s.count; E > S; S++) f.add(p[s.indices[S]])
                            }
                            var I = {
                                count: 0,
                                start: h,
                                end: m
                            };
                            f.forEach(function(e) {
                                this.count += this.end[e] - this.start[e]
                            }, I);
                            var C = new Int32Array(I.count),
                                T = {
                                    indices: C,
                                    offset: 0,
                                    start: h,
                                    end: m
                                };
                            f.forEach(function(e) {
                                for (var t = this.start[e], n = this.end[e]; n > t; t++) this.indices[this.offset++] = t
                            }, T), Array.prototype.sort.call(C, function(e, t) {
                                return e - t
                            }), l.add(t.Fragment.ofArray(r, C[0], C))
                        }
                        return l.getSeq()
                    }
                }

                function h(e) {
                    return function(n) {
                        for (var r = e(n), i = new t.HashFragmentSeqBuilder(n), o = n.structure.atoms.residueIndex, a = n.structure.residues.atomStartIndex, s = n.structure.residues.atomEndIndex, l = new Set, c = 0, u = r.fragments; c < u.length; c++) {
                            var d = u[c];
                            l.clear();
                            for (var p = 0, h = d.atomIndices; p < h.length; p++) {
                                var m = h[p];
                                l.add(o[m])
                            }
                            var f = {
                                count: 0,
                                start: a,
                                end: s
                            };
                            l.forEach(function(e) {
                                this.count += this.end[e] - this.start[e]
                            }, f);
                            var g = new Int32Array(f.count),
                                y = {
                                    indices: g,
                                    offset: 0,
                                    start: a,
                                    end: s
                                };
                            l.forEach(function(e) {
                                for (var t = this.start[e], n = this.end[e]; n > t; t++) this.indices[this.offset++] = t
                            }, y), Array.prototype.sort.call(g, function(e, t) {
                                return e - t
                            }), i.add(t.Fragment.ofArray(n, g[0], g))
                        }
                        return i.getSeq()
                    }
                }
                var m = function() {
                    function e(e, t) {
                        this.columns = [];
                        for (var n = 0, r = Object.keys(e); n < r.length; n++) {
                            var i = r[n];
                            void 0 !== e[i] && t[i] && this.columns.push({
                                value: e[i],
                                array: t[i]
                            })
                        }
                    }
                    return e.prototype.isSatisfied = function(e) {
                        for (var t = 0, n = this.columns; t < n.length; t++) {
                            var r = n[t];
                            if (r.value !== r.array[e]) return !1
                        }
                        return !0
                    }, e
                }();
                n.compileAtomRanges = r, n.compileSequence = i, n.compileHetGroups = o, n.compileAtomsInBox = a, n.compileInside = s, n.compileFilter = l, n.compileOr = c, n.compileUnion = u, n.compilePolymerNames = d, n.compileAmbientResidues = p, n.compileWholeResidues = h
            }(i = t.Compiler || (t.Compiler = {}))
        }(t = e.Queries || (e.Queries = {}))
    }(t = e.Structure || (e.Structure = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        function t(e, t, n) {
            for (var r, i = 0, o = Object.keys(t); i < o.length; i++) {
                var a = o[i];
                r = t[a], void 0 !== r ? e[a] = r : n && (e[a] = n[a])
            }
            if (n)
                for (var s = 0, l = Object.keys(n); s < l.length; s++) {
                    var a = l[s];
                    r = e[a], void 0 === r && (e[a] = n[a])
                }
            return e
        }

        function n(e, t) {
            var n, r, i, o, a, s, l, c = 0,
                u = 0,
                d = !0,
                p = !1;
            t = Math.max(0, t) || 0;
            var h = function() {
                    var u = t - (performance.now() - o);
                    if (0 >= u) {
                        r && clearTimeout(r);
                        var d = l;
                        r = s = l = void 0, d && (c = performance.now(), i = e.apply(a, n), s || r || (n = a = null))
                    } else s = setTimeout(h, u)
                },
                m = function() {
                    s && clearTimeout(s), r = s = l = void 0, (d || u !== t) && (c = performance.now(), i = e.apply(a, n), s || r || (n = a = null))
                };
            return function() {
                if (n = arguments, o = performance.now(), a = this, l = d && (s || !p), 0 === u) var f = p && !s;
                else {
                    r || p || (c = o);
                    var g = u - (o - c),
                        y = 0 >= g;
                    y ? (r && (r = clearTimeout(r)), c = o, i = e.apply(a, n)) : r || (r = setTimeout(m, g))
                }
                return y && s ? s = clearTimeout(s) : s || t === u || (s = setTimeout(h, t)), f && (y = !0, i = e.apply(a, n)), !y || s || r || (n = a = null), i
            }
        }
        e.extend = t, e.debounce = n
    }(t = e.Utils || (e.Utils = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t = function() {
            function e(e, t, n) {
                t = 0 | t, 0 >= t && (t = 1), this.elementSize = n, this.chunkSize = t * n, this.creator = e, this.current = e(this.chunkSize), this.parts = [this.current], this.currentIndex = 0, this.elementCount = 0
            }
            return e.prototype.add3 = function(e, t, n) {
                return this.currentIndex >= this.chunkSize && (this.currentIndex = 0, this.current = this.creator(this.chunkSize), this.parts[this.parts.length] = this.current), this.current[this.currentIndex++] = e, this.current[this.currentIndex++] = t, this.current[this.currentIndex++] = n, this.elementCount++
            }, e.prototype.add2 = function(e, t) {
                return this.currentIndex >= this.chunkSize && (this.currentIndex = 0, this.current = this.creator(this.chunkSize), this.parts[this.parts.length] = this.current), this.current[this.currentIndex++] = e, this.current[this.currentIndex++] = t, this.elementCount++
            }, e.prototype.add = function(e) {
                return this.currentIndex >= this.chunkSize && (this.currentIndex = 0, this.current = this.creator(this.chunkSize), this.parts[this.parts.length] = this.current), this.current[this.currentIndex++] = e, this.elementCount++
            }, e.prototype.compact = function() {
                var e, t, n, r = this.creator(this.elementSize * this.elementCount),
                    i = (this.parts.length - 1) * this.chunkSize,
                    o = 0;
                if (this.parts.length > 1)
                    if (this.parts[0].buffer)
                        for (e = 0; e < this.parts.length - 1; e++) r.set(this.parts[e], this.chunkSize * e);
                    else
                        for (e = 0; e < this.parts.length - 1; e++)
                            for (o = this.chunkSize * e, n = this.parts[e], t = 0; t < this.chunkSize; t++) r[o + t] = n[t];
                if (this.current.buffer && this.currentIndex >= this.chunkSize) r.set(this.current, this.chunkSize * (this.parts.length - 1));
                else
                    for (e = 0; e < this.currentIndex; e++) r[i + e] = this.current[e];
                return r
            }, e.forVertex3D = function(t) {
                return void 0 === t && (t = 262144), new e(function(e) {
                    return new Float32Array(e)
                }, t, 3)
            }, e.forIndexBuffer = function(t) {
                return void 0 === t && (t = 262144), new e(function(e) {
                    return new Uint32Array(e)
                }, t, 3)
            }, e.forTokenIndices = function(t) {
                return void 0 === t && (t = 131072), new e(function(e) {
                    return new Int32Array(e)
                }, t, 2)
            }, e.forIndices = function(t) {
                return void 0 === t && (t = 131072), new e(function(e) {
                    return new Int32Array(e)
                }, t, 1)
            }, e.forInt32 = function(t) {
                return void 0 === t && (t = 131072), new e(function(e) {
                    return new Int32Array(e)
                }, t, 1)
            }, e.forFloat32 = function(t) {
                return void 0 === t && (t = 131072), new e(function(e) {
                    return new Float32Array(e)
                }, t, 1)
            }, e.forArray = function(t) {
                return void 0 === t && (t = 131072), new e(function(e) {
                    return []
                }, t, 1)
            }, e
        }();
        e.ChunkedArrayBuilder = t;
        var n = function() {
            function e(e, t, n) {
                t = 0 | t, this.array = e(t * n), this.currentIndex = 0, this.elementCount = 0
            }
            return e.prototype.add3 = function(e, t, n) {
                this.array[this.currentIndex++] = e, this.array[this.currentIndex++] = t, this.array[this.currentIndex++] = n, this.elementCount++
            }, e.prototype.add2 = function(e, t) {
                this.array[this.currentIndex++] = e, this.array[this.currentIndex++] = t, this.elementCount++
            }, e.prototype.add = function(e) {
                this.array[this.currentIndex++] = e, this.elementCount++
            }, e.forVertex3D = function(t) {
                return new e(function(e) {
                    return new Float32Array(e)
                }, t, 3)
            }, e.forIndexBuffer = function(t) {
                return new e(function(e) {
                    return new Int32Array(e)
                }, t, 3)
            }, e.forTokenIndices = function(t) {
                return new e(function(e) {
                    return new Int32Array(e)
                }, t, 2)
            }, e.forIndices = function(t) {
                return new e(function(e) {
                    return new Int32Array(e)
                }, t, 1)
            }, e.forInt32 = function(t) {
                return new e(function(e) {
                    return new Int32Array(e)
                }, t, 1)
            }, e.forFloat32 = function(t) {
                return new e(function(e) {
                    return new Float32Array(e)
                }, t, 1)
            }, e.forArray = function(t) {
                return new e(function(e) {
                    return []
                }, t, 1)
            }, e
        }();
        e.ArrayBuilder = n
    }(t = e.Utils || (e.Utils = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t = function() {
            function e() {}
            return e.getRandomColor = function(t) {
                void 0 === t && (t = 0);
                for (var n = 0;;) {
                    n++;
                    var r = e.randomMix({
                            r: 166 / 255,
                            g: 0,
                            b: 100 / 255
                        }, {
                            r: 1,
                            g: 1,
                            b: 0
                        }, {
                            r: 0,
                            g: 100 / 255,
                            b: 1
                        }, t),
                        i = Math.abs(e.previous.r - r.r) + Math.abs(e.previous.g - r.g) + Math.abs(e.previous.b - r.b);
                    if (i > 100 || 10 === n) return e.previous = r, r
                }
            }, e.randomMix = function(e, t, n, r) {
                var i = 0 | Math.floor(3 * Math.random()),
                    o = 0 === i ? Math.random() * r : Math.random(),
                    a = 1 === i ? Math.random() * r : Math.random(),
                    s = 2 === i ? Math.random() * r : Math.random(),
                    l = o + a + s;
                return o /= l, a /= l, s /= l, {
                    r: o * e.r + a * t.r + s * n.r,
                    g: o * e.g + a * t.g + s * n.g,
                    b: o * e.b + a * t.b + s * n.b
                }
            }, e.previous = e.randomMix({
                r: .75,
                g: 0,
                b: .25
            }, {
                r: 1,
                g: .5,
                b: 0
            }, {
                r: 0,
                g: .35,
                b: 1
            }, .5), e
        }();
        e.Palette = t
    }(t = e.Utils || (e.Utils = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        function t() {
            var e = document.createElement("canvas");
            try {
                var t = e.getContext("webgl") || e.getContext("experimental-webgl");
                return !!t
            } catch (n) {
                return console.log(n), !1
            }
        }
        e.checkWebGL = t;
        var n = function() {
            function e() {}
            return e.setPickBase = function(e, t, n, r) {
                var i = 24,
                    o = e << i - t | n,
                    a = o >> 16 & 255,
                    s = o >> 8 & 255,
                    l = 255 & o;
                r.r = a / 255, r.g = s / 255, r.b = l / 255
            }, e.setPickColor = function(e, t, n, r, i) {
                var o = 24,
                    a = e << o - t | n,
                    s = a >> 16 & 255,
                    l = a >> 8 & 255,
                    c = 255 & a;
                r[i] = s / 255, r[i + 1] = l / 255, r[i + 2] = c / 255
            }, e.getIndexedBufferGeometry = function(e) {
                for (var t = 3 * e.vertices.length, n = new Float32Array(t), r = new Float32Array(t), i = new Uint32Array(3 * e.faces.length), o = Array(e.vertices.length), a = 0; a < e.faces.length; a++) {
                    var s = e.faces[a];
                    o[s.a] = s.vertexNormals[0], o[s.b] = s.vertexNormals[1], o[s.c] = s.vertexNormals[2], i[3 * a] = s.a, i[3 * a + 1] = s.b, i[3 * a + 2] = s.c
                }
                for (var a = 0; a < e.vertices.length; a++) {
                    var l = e.vertices[a];
                    n[3 * a] = l.x, n[3 * a + 1] = l.y, n[3 * a + 2] = l.z;
                    var c = o[a];
                    r[3 * a] = c.x, r[3 * a + 1] = c.y, r[3 * a + 2] = c.z
                }
                var u = new THREE.BufferGeometry;
                return u.addAttribute("position", new THREE.BufferAttribute(n, 3)), u.addAttribute("normal", new THREE.BufferAttribute(r, 3)), u.addAttribute("index", new THREE.BufferAttribute(i, 1)), u
            }, e
        }();
        e.GeometryHelper = n
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t = function() {
            function e() {}
            return e.getPickMaterial = function() {
                return new THREE.ShaderMaterial({
                    attributes: {
                        pColor: {
                            type: "v4",
                            value: []
                        }
                    },
                    vertexShader: e.pickVertexShader,
                    fragmentShader: e.pickFragmentShader,
                    blending: THREE.NoBlending,
                    shading: THREE.FlatShading,
                    side: THREE.DoubleSide
                })
            }, e.getPickExcludeMaterial = function() {
                return new THREE.MeshBasicMaterial({
                    color: THREE.ColorKeywords.white,
                    side: THREE.DoubleSide
                })
            }, e.getMeshMaterial = function() {
                var t = e.shader;
                return new THREE.ShaderMaterial({
                    uniforms: THREE.UniformsUtils.clone(t.uniforms),
                    attributes: {
                        vState: {
                            type: "f",
                            value: []
                        }
                    },
                    lights: !0,
                    fog: !0,
                    vertexShader: t.vertexShader,
                    fragmentShader: t.fragmentShader,
                    blending: THREE.NoBlending,
                    shading: THREE.SmoothShading,
                    side: THREE.FrontSide,
                    vertexColors: THREE.VertexColors
                })
            }, e.getPhongVertexColorMaterial = function() {
                return new THREE.MeshPhongMaterial({
                    specular: 11184810,
                    shininess: 2,
                    shading: THREE.SmoothShading,
                    vertexColors: THREE.VertexColors,
                    side: THREE.DoubleSide,
                    metal: !0
                })
            }, e.getDefaultHighlightMaterial = function() {
                return new THREE.MeshPhongMaterial({
                    color: 16777215,
                    specular: 11184810,
                    shininess: 2,
                    shading: THREE.SmoothShading,
                    side: THREE.DoubleSide,
                    metal: !0
                })
            }, e.applyColorToMap = function(e, t, n, r) {
                for (var i = n.array, o = {
                        r: .45,
                        g: .45,
                        b: .45
                    }, a = e.vertexRanges, s = 0, l = e.elementIndices; s < l.length; s++) {
                    var c = l[s],
                        u = e.elementMap.get(c),
                        d = e.elementRanges[2 * u],
                        p = e.elementRanges[2 * u + 1];
                    if (d !== p) {
                        r(c, o);
                        for (var h = d; p > h; h += 2)
                            for (var m = a[h], f = a[h + 1], g = m; f > g; g++) i[3 * g] = o.r, i[3 * g + 1] = o.g, i[3 * g + 2] = o.b
                    }
                }
                n.needsUpdate = !0
            }, e.pickVertexShader = ["attribute vec4 pColor;", "varying vec4 pC;", "void main() {", "pC = pColor;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"), e.pickFragmentShader = ["varying vec4 pC;", "void main() {", "gl_FragColor = pC;", "}"].join("\n"), e.shader = {
                uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
                    emissive: {
                        type: "c",
                        value: new THREE.Color(0)
                    },
                    specular: {
                        type: "c",
                        value: new THREE.Color(1118481)
                    },
                    shininess: {
                        type: "f",
                        value: 2
                    },
                    wrapRGB: {
                        type: "v3",
                        value: new THREE.Vector3(1, 1, 1)
                    },
                    highlightColor: {
                        type: "v3",
                        value: new THREE.Vector3(1, 1, 0)
                    },
                    selectionColor: {
                        type: "v3",
                        value: new THREE.Vector3(1, 0, 0)
                    }
                }]),
                vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "#ifndef FLAT_SHADED", "	varying vec3 vNormal;", "#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "attribute float vState;", "varying float vS;", "void main() {", "   vS = vState;", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED", "	vNormal = normalize( transformedNormal );", "#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "	vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
                fragmentShader: ["#define PHONG", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", "uniform float opacity;", "uniform vec3 highlightColor;", "uniform vec3 selectionColor;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "varying float vS;", "void main() {", "	vec3 outgoingLight = vec3( 0.0 );", "	vec4 diffuseColor;", "   if (vS < 0.5) { diffuseColor = vec4( vColor, opacity ); }", "   else if (vS < 1.5) { diffuseColor = vec4(selectionColor, 1.0); }", "	else if (vS < 3.5) { diffuseColor = vec4(highlightColor, 1.0); }", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "	gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
            }, e
        }();
        e.MaterialsHelper = t
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t = function() {
            function e() {}
            return e
        }();
        e.GeometryBase = t;
        var n = function() {
            function e() {
                this.disposeList = [], this.sceneId = -1, this.centroid = new THREE.Vector3, this.radius = 0, this.object = void 0, this.pickObject = void 0, this.includeInCentroidComputation = !0, this.theme = void 0
            }
            return e.prototype.updateVisibility = function(e) {
                this.object && (this.object.visible = e), this.pickObject && (this.pickObject.visible = e)
            }, e.prototype.createObjects = function() {
                return void 0
            }, e.prototype.applyTheme = function(e) {
                this.theme = e
            }, e.prototype.addedToScene = function(e) {
                this.sceneId = e, this.addedToSceneInternal()
            }, e.prototype.dispose = function() {
                for (var e = 0, t = this.disposeList; e < t.length; e++) {
                    var n = t[e];
                    n && n.dispose()
                }
                this.disposeList = null, this.disposeList = []
            }, e.prototype.getPickElement = function(e) {
                throw "Not Implemented"
            }, e.prototype.highlightElement = function(e, t) {
                return !1
            }, e.prototype.clearHighlight = function() {
                return !1
            }, e.prototype.applySelection = function(e, t) {
                return !1
            }, e
        }();
        e.Model = n
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(t) {
            "use strict";
            var n = e.Geometry.LinearAlgebra.Matrix4,
                r = e.Structure.SpacegroupTables,
                i = function() {
                    function e(e) {
                        if (this.info = e, this.temp = new THREE.Matrix4, this.tempV = new THREE.Vector3, void 0 === r.Spacegroup[e.spacegroupName]) throw "'" + e.spacegroupName + "' is not a known spacegroup.";
                        this.space = this.getSpace(), this.operators = this.getOperators()
                    }
                    return Object.defineProperty(e.prototype, "operatorCount", {
                        get: function() {
                            return this.operators.length
                        },
                        enumerable: !0,
                        configurable: !0
                    }), e.prototype.getOperatorMatrix = function(e, t, n, r, i) {
                        return this.temp.setPosition(this.tempV.set(t, n, r)), i.copy(this.space.fromFrac).multiply(this.temp).multiply(this.operators[e]).multiply(this.space.toFrac)
                    }, e.prototype.getSpace = function() {
                        var e = this.info.toFracTransform,
                            t = new THREE.Matrix4;
                        t.elements.set(new Float32Array(e));
                        var n = new THREE.Matrix4;
                        return n.getInverse(t), {
                            toFrac: t,
                            fromFrac: n,
                            baseX: new THREE.Vector4(1, 0, 0, 1).applyMatrix4(t),
                            baseY: new THREE.Vector4(0, 1, 0, 1).applyMatrix4(t),
                            baseZ: new THREE.Vector4(0, 0, 1, 1).applyMatrix4(t)
                        }
                    }, e.getOperator = function(e) {
                        var t = r.Transform[e[0]],
                            i = r.Transform[e[1]],
                            o = r.Transform[e[2]],
                            a = n.ofRows([t, i, o, [0, 0, 0, 1]]),
                            s = new THREE.Matrix4;
                        return s.elements.set(new Float32Array(a)), s
                    }, e.prototype.getOperators = function() {
                        var t = r.Group[r.Spacegroup[this.info.spacegroupName]];
                        return t.map(function(t) {
                            return e.getOperator(r.Operator[t])
                        })
                    }, e
                }();
            t.Spacegroup = i
        }(n = t.Molecule || (t.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n = function() {
            function e(e) {
                void 0 === e && (e = {}), void 0 !== e.cameraFOV ? this.cameraFOV = e.cameraFOV : this.cameraFOV = 30, void 0 !== e.clearColor ? this.clearColor = e.clearColor : this.clearColor = {
                    r: 0,
                    g: 0,
                    b: 0
                }, void 0 !== e.alpha ? this.alpha = e.alpha : this.alpha = !1, void 0 !== e.lighting ? this.lighting = e.lighting : this.lighting = null, void 0 !== e.enableFrontClip ? this.enableFrontClip = !!e.enableFrontClip : this.enableFrontClip = !0
            }
            return e.Default = new e, e
        }();
        t.SceneOptions = n;
        var r = function() {
                function e() {
                    this.position = {
                        x: 0,
                        y: 0
                    }, this.lastPosition = {
                        x: 0,
                        y: 0
                    }, this.exactPosition = {
                        x: 0,
                        y: 0
                    }, this.isInside = !1, this.isButtonDown = !1
                }
                return e.prototype.update = function() {
                    return this.lastPosition.x === this.position.x && this.lastPosition.y === this.position.y ? !1 : (this.lastPosition.x = this.position.x, this.lastPosition.y = this.position.y, !0)
                }, e.prototype.setExactPosition = function(e) {
                    for (var t = 0, n = 0; e;) t += e.offsetLeft - e.scrollLeft + e.clientLeft, n += e.offsetTop - e.scrollTop + e.clientTop, e = e === document.body && document.documentElement ? document.documentElement : e.offsetParent;
                    this.exactPosition.x = this.position.x - t, this.exactPosition.y = this.position.y - n
                }, e
            }(),
            i = function() {
                function e() {
                    this.lights = []
                }
                return e.prototype.setup = function(e) {
                    var t = new THREE.PointLight(11184810, .75);
                    t.clone();
                    e.add(t), this.lights = [t];
                    var n = new THREE.AmbientLight(10066329);
                    e.add(n)
                }, e.prototype.update = function(e) {
                    for (var t = 0, n = this.lights; t < n.length; t++) {
                        var r = n[t];
                        r.position.copy(e)
                    }
                }, e
            }();
        t.DefaultLighting = i;
        var o = function() {
                function e() {
                    this.width = 0, this.height = 0, this.resizing = !1, this.rendered = !1, this.lastRenderTime = 0, this.pickDelta = 0, this.animationFrame = 0
                }
                return e
            }(),
            a = function() {
                function a(a, s) {
                    var l = this;
                    void 0 === s && (s = {}), this.renderState = new o, this.mouseInfo = new r, this.pickInfo = new t.PickInfo, this.selectInfo = null, this.unbindEvents = [], this.models = {}, this.events = new THREE.EventDispatcher, this.renderFunc = function(e) {
                        return l.render(e)
                    }, this.pickBuffer = new Uint8Array(4), this.options = new n(s), this.parentElement = a, this.scene = new THREE.Scene, this.pickScene = new THREE.Scene, this.pickTarget = new THREE.WebGLRenderTarget(1, 1, {
                        format: THREE.RGBAFormat,
                        minFilter: THREE.LinearFilter
                    }), this.pickTarget.generateMipmaps = !1, this.renderer = new THREE.WebGLRenderer({
                        antialias: !0
                    }), this.renderer.autoClear = !0, this.renderer.sortObjects = !1, this.camera = new t.Camera(this, this.renderer.domElement, t.CameraTypes.Perspective), this.options.lighting || (this.options.lighting = new i), this.options.lighting.setup(this.scene), this.parentElement.appendChild(this.renderer.domElement);
                    var c = e.Utils.debounce(function() {
                            return l.handleResize()
                        }, 100),
                        u = function() {
                            l.renderState.resizing = !0, c()
                        };
                    window.addEventListener("resize", u), this.renderer.domElement.addEventListener("resize", u), this.unbindEvents.push(function() {
                        return window.removeEventListener("resize", u)
                    }), this.unbindEvents.push(function() {
                        return l.renderer.domElement.removeEventListener("resize", u)
                    }), this.setupMouse(), this.handleResize(), this.renderer.clear(), this.needsRender(), this.renderState.animationFrame = requestAnimationFrame(this.renderFunc)
                }
                return a.prototype.setupMouse = function() {
                    var e = this,
                        t = function(t) {
                            e.mouseInfo.position.x = t.clientX, e.mouseInfo.position.y = t.clientY, e.mouseInfo.isInside = !0
                        };
                    this.parentElement.addEventListener("mousemove", t), this.unbindEvents.push(function() {
                        return e.parentElement.removeEventListener("mousemove", t)
                    });
                    var n = function(t) {
                        e.mouseInfo.isInside = !1, e.clearHighlights()
                    };
                    this.parentElement.addEventListener("mouseleave", n), this.unbindEvents.push(function() {
                        return e.parentElement.removeEventListener("mouseleave", n)
                    });
                    var r = function(t) {
                        e.mouseInfo.isInside ? e.handleSelectStart(t.clientX, t.clientY) : e.selectInfo = null, e.clearHighlights(), e.mouseInfo.isButtonDown = !0
                    };
                    this.parentElement.addEventListener("mousedown", r), this.unbindEvents.push(function() {
                        return e.parentElement.removeEventListener("mousedown", r)
                    });
                    var i = function(t) {
                        e.mouseInfo.isButtonDown = !1, e.needsRender(), e.handleSelectEnd(t.clientX, t.clientY)
                    };
                    window.addEventListener("mouseup", i), this.unbindEvents.push(function() {
                        return window.removeEventListener("mouseup", i)
                    });
                    var o = function(t) {
                        return e.handleMouseWheel(t)
                    };
                    this.parentElement.addEventListener("mousewheel", o), this.parentElement.addEventListener("DOMMouseScroll", o), this.unbindEvents.push(function() {
                        e.parentElement.removeEventListener("mousewheel", o), e.parentElement.removeEventListener("DOMMouseScroll", o)
                    })
                }, a.prototype.handleSelectStart = function(e, t) {
                    this.pickInfo.selectStart(e, t), this.selectInfo = this.pickInfo.getPickInfo()
                }, a.prototype.handleSelectEnd = function(e, t) {
                    this.pickInfo.selectEnd(e, t) && this.selectInfo && this.dispatchSelectEvent(), this.selectInfo = null
                }, a.prototype.handleMouseWheel = function(e) {
                    if (this.options.enableFrontClip) {
                        var t = 0;
                        e.wheelDelta ? t = e.wheelDelta : e.detail && (t = -e.detail), -3 > t ? t = -3 : t > 3 && (t = 3), this.camera.updateNear(t)
                    }
                }, a.prototype.handleResize = function() {
                    var e = this.parentElement.clientWidth,
                        t = this.parentElement.clientHeight;
                    this.renderState.width = e, this.renderState.height = t, this.renderer.setSize(e, t), this.pickTarget = new THREE.WebGLRenderTarget(e, t, {
                        format: THREE.RGBAFormat,
                        minFilter: THREE.LinearFilter
                    }), this.pickTarget.generateMipmaps = !1, this.camera.updateSize(e, t), this.renderState.resizing = !1, this.needsRender()
                }, a.prototype.needsRender = function() {
                    this.renderState.rendered = !1
                }, a.prototype.render = function(e) {
                    if (this.renderState.resizing) return void(this.renderState.animationFrame = requestAnimationFrame(this.renderFunc));
                    var t = e - this.renderState.lastRenderTime;
                    this.renderState.pickDelta += t, this.renderState.lastRenderTime = e, this.renderState.pickDelta > 33.3333333 && (this.renderState.pickDelta = this.renderState.pickDelta % 33.3333333, this.handlePick()), this.renderState.rendered || (this.options.lighting.update(this.camera.position), this.renderer.sortObjects = !0, this.renderer.render(this.scene, this.camera.object), this.renderer.sortObjects = !1, this.renderState.rendered = !0, this.mouseInfo.isButtonDown || (this.renderer.setClearAlpha(1), this.renderer.render(this.pickScene, this.camera.object, this.pickTarget), this.renderer.setClearAlpha(this.options.alpha ? 1 : 0))), this.renderState.animationFrame = requestAnimationFrame(this.renderFunc)
                }, a.prototype.dispatchHoverEvent = function() {
                    this.events.dispatchEvent({
                        type: a.hoverEvent,
                        target: null,
                        data: this.pickInfo.getPickInfo()
                    })
                }, a.prototype.dispatchSelectEvent = function() {
                    this.events.dispatchEvent({
                        type: a.selectEvent,
                        target: null,
                        data: this.selectInfo
                    })
                }, a.prototype.clearHighlights = function(e) {
                    void 0 === e && (e = !0);
                    var t = this.pickInfo,
                        n = this.models[t.currentPickId],
                        r = !1;
                    return n && (r = n.highlightElement(t.currentPickElementId, !1)), r && e && this.needsRender(), this.pickInfo.reset() && this.dispatchHoverEvent(), r
                }, a.prototype.handlePick = function() {
                    if (this.mouseInfo.isInside && !this.mouseInfo.isButtonDown && this.mouseInfo.update()) {
                        this.mouseInfo.setExactPosition(this.parentElement);
                        var e = this.mouseInfo.exactPosition;
                        this.renderer.readRenderTargetPixels(this.pickTarget, e.x, this.pickTarget.height - e.y, 1, 1, this.pickBuffer);
                        var t = this.pickBuffer[3],
                            n = this.pickBuffer[0] << 16 | this.pickBuffer[1] << 8 | this.pickBuffer[2],
                            r = this.pickInfo;
                        if (t !== r.currentPickId || n !== r.currentPickElementId) {
                            var i = this.clearHighlights(!1),
                                o = this.models[t];
                            if (255 === t || !o) return void(i && this.needsRender());
                            r.currentPickId = t, r.currentPickElementId = n, (o.highlightElement(n, !0) || i) && (this.needsRender(), r.current = o.getPickElement(n), this.dispatchHoverEvent())
                        }
                    }
                }, a.prototype.resized = function() {
                    this.handleResize()
                }, a.prototype.forceRender = function() {
                    this.needsRender()
                }, a.prototype.addModel = function(e, t) {
                    void 0 === t && (t = !0);
                    var n = -1,
                        r = Object.keys(this.models).map(function(e) {
                            return +e
                        });
                    if (0 === r.length) n = 1;
                    else {
                        for (var i = r.reduce(function(e, t) {
                                return Math.max(e, t)
                            }, 0), o = 1; i > o; o++)
                            if (!this.models[o]) {
                                n = o;
                                break
                            } - 1 === n && (n = i + 1)
                    }
                    this.models[n] = e, e.addedToScene(n), e.object && this.scene.add(e.object), e.pickObject && this.pickScene.add(e.pickObject), t ? this.camera.reset() : this.needsRender()
                }, a.prototype.removeAndDisposeModel = function(e, t) {
                    void 0 === t && (t = !0), this.models[e.sceneId] && (e.object && this.scene.remove(e.object), e.pickObject && this.pickScene.remove(e.pickObject), e.dispose(), delete this.models[e.sceneId], e.sceneId = -1, t && this.needsRender())
                }, a.prototype.clear = function() {
                    for (var e = 0, n = Object.keys(this.models); e < n.length; e++) {
                        var r = n[e];
                        this.models[+r] instanceof t.Model && this.removeAndDisposeModel(this.models[+r], !1)
                    }
                    this.forceRender()
                }, a.prototype.destroy = function() {
                    for (var e = 0, t = this.unbindEvents; e < t.length; e++) {
                        var n = t[e];
                        try {
                            n()
                        } catch (r) {}
                    }
                    for (this.unbindEvents = [], cancelAnimationFrame(this.renderState.animationFrame), this.scene = null, this.pickScene = null, this.camera.dispose(), this.camera = null, this.renderer && this.renderer.dispose && this.renderer.dispose(), this.renderer = null, this.pickTarget.dispose(), this.pickTarget = null; this.parentElement.lastChild;) this.parentElement.removeChild(this.parentElement.lastChild)
                }, a.hoverEvent = "hover", a.selectEvent = "select", a
            }();
        t.Scene = a
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        ! function(e) {
            e[e.Perspective = 0] = "Perspective", e[e.Orthographic = 1] = "Orthographic"
        }(e.CameraTypes || (e.CameraTypes = {}));
        var t = e.CameraTypes,
            n = function() {
                function e(e, n, r) {
                    void 0 === r && (r = t.Perspective), this.scene = e, this.domElement = n, this._type = r, this.setup()
                }
                return e.prototype.reset = function() {
                    for (var e = new THREE.Vector3, t = 0, n = 0, r = 0, i = Object.keys(this.scene.models); r < i.length; r++) {
                        var o = i[r],
                            a = this.scene.models[+o];
                        a.includeInCentroidComputation && !isNaN(a.centroid.x) && (e.add(a.centroid), t++)
                    }
                    e.multiplyScalar(1 / Math.max(t, 1));
                    for (var s = 0, l = Object.keys(this.scene.models); s < l.length; s++) {
                        var o = l[s],
                            a = this.scene.models[+o];
                        a.includeInCentroidComputation && (n = Math.max(n, (new THREE.Vector3).subVectors(e, a.centroid).length() + a.radius))
                    }
                    this._cameraControls.reset(), this.camera.near = .1, this.camera.updateProjectionMatrix(), t > 0 ? this.camera.position.set(e.x, e.y, e.z - 4 * n) : this.camera.position.set(0, 0, 500), this.camera.lookAt(e), this._cameraControls.target = e, this.scene.forceRender()
                }, e.prototype.snapshot = function() {
                    return this._cameraControls.getState()
                }, e.prototype.restore = function(e) {
                    this._cameraControls.setState(e), this.scene.forceRender()
                }, e.prototype.focusOnModel = function(e) {
                    var t = e.centroid,
                        n = e.radius;
                    this._cameraControls.reset(), this.camera.near = .1, this.camera.updateProjectionMatrix(), this.camera.position.set(t.x, t.y, t.z - 4 * n), this.camera.lookAt(t), this._cameraControls.target = t.clone(), this.scene.forceRender()
                }, e.prototype.focusOnPoint = function(e, t) {
                    this._cameraControls.reset(), this.camera.near = .1, this.camera.updateProjectionMatrix(), this.camera.position.set(e.x, e.y, e.z - 4 * t), this.camera.lookAt(new THREE.Vector3(e.x, e.y, e.z)), this._cameraControls.target = e, this.scene.forceRender()
                }, e.prototype.move = function(e) {
                    this._cameraControls.panTo(e)
                }, e.prototype.updateNear = function(e) {
                    this.camera.near = Math.max(this.camera.near + e, .1), this.camera.updateProjectionMatrix(), this.scene.forceRender()
                }, e.prototype.updateSize = function(e, t) {
                    this.camera.aspect = e / t, this.camera.updateProjectionMatrix(), this._cameraControls.handleResize()
                }, Object.defineProperty(e.prototype, "position", {
                    get: function() {
                        return this.camera.position
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "object", {
                    get: function() {
                        return this.camera
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.dispose = function() {
                    this.unbindCamera && (this.unbindCamera(), this.unbindCamera = void 0), this._cameraControls && (this._cameraControls.destroy(), this._cameraControls = void 0)
                }, Object.defineProperty(e.prototype, "type", {
                    get: function() {
                        return this._type
                    },
                    set: function(e) {
                        this._type = e, this.setup()
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.setup = function() {
                    var e = this;
                    if (this.dispose(), this._type === t.Perspective) this.camera = new THREE.PerspectiveCamera(this.scene.options.cameraFOV, this.scene.parentElement.clientWidth / this.scene.parentElement.clientHeight, .1, 1e4);
                    else {
                        var n = this.scene.parentElement.clientWidth,
                            r = this.scene.parentElement.clientHeight,
                            i = 100,
                            o = r / n * i;
                        this.camera = new THREE.OrthographicCamera(.5 * i / -2, .5 * i / 2, o / 2, o / -2, .1, 1e4)
                    }
                    this.camera.position.set(0, 0, 500), this._cameraControls = new THREE.TrackballControls(this.camera, this.domElement);
                    var a = function() {
                        return e.scene.forceRender()
                    };
                    this._cameraControls.addEventListener("change", a), this.unbindCamera = function() {
                        return e._cameraControls.removeEventListener("change", a)
                    }, this.reset()
                }, e
            }();
        e.Camera = n
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n = function() {
            function e() {
                this.current = null, this.currentPickId = -1, this.currentPickElementId = -1, this.selectPos = {
                    x: 0,
                    y: 0
                }
            }
            return e.prototype.getPickInfo = function() {
                return this.current ? {
                    object: this.current.object,
                    element: this.current.element,
                    elementType: this.current.elementType,
                    tag: this.current.tag
                } : this.current
            }, e.prototype.reset = function() {
                var e = null !== this.current;
                return this.currentPickId = -1, this.currentPickElementId = -1, this.current = null, e
            }, e.prototype.selectStart = function(e, t) {
                this.selectPos.x = e, this.selectPos.y = t
            }, e.prototype.selectEnd = function(e, t) {
                var n = e - this.selectPos.x,
                    r = t - this.selectPos.y;
                return 4.5 > n * n + r * r
            }, e
        }();
        t.PickInfo = n;
        var r = function() {
            function e(e, t) {
                this.value = e, this.width = t
            }
            return e.Empty = new e(0, 0), e
        }();
        t.PickFlagInfo = r,
            function(e) {
                e[e.Atom = 0] = "Atom", e[e.Residue = 1] = "Residue"
            }(t.MoleculeVertexMapType || (t.MoleculeVertexMapType = {}));
        t.MoleculeVertexMapType;
        ! function(e) {
            e[e.None = 0] = "None", e[e.Select = 1] = "Select", e[e.Highlight = 2] = "Highlight", e[e.HighlightSelect = 3] = "HighlightSelect"
        }(t.MoleculeSelectionType || (t.MoleculeSelectionType = {}));
        var i = (t.MoleculeSelectionType, function() {
            function e(e, t) {
                this.atoms = e, this.residues = t
            }
            return e
        }());
        t.MoleculeSelectionIndices = i;
        var o = function() {
            function t(t, n) {
                this.mapType = t, this.elementCount = n, this.elementMap = new Map, this.elementIndex = 0, this.elementRangeIndex = 0, this.rangeIndex = 0, this.added = 0, this.elementIndices = new e.Utils.ChunkedArrayBuilder(function(e) {
                    return new Int32Array(e)
                }, n, 1), this.elementRanges = new Int32Array(2 * n), this.vertexRanges = new e.Utils.ChunkedArrayBuilder(function(e) {
                    return new Int32Array(e)
                }, n, 2)
            }
            return t.prototype.startElement = function(e) {
                this.elementIndex = e, this.elementRangeIndex = this.elementMap.size, this.rangeIndex = this.vertexRanges.elementCount, this.added = 0
            }, t.prototype.addVertexRange = function(e, t) {
                this.added++, this.vertexRanges.add2(e, t)
            }, t.prototype.endElement = function() {
                this.elementIndices.add(this.elementIndex), this.elementMap.set(this.elementIndex, this.elementRangeIndex), this.elementRanges[2 * this.elementRangeIndex] = 2 * this.rangeIndex, this.elementRanges[2 * this.elementRangeIndex + 1] = 2 * (this.rangeIndex + this.added)
            }, t.prototype.getMap = function() {
                return new a(this.mapType, this.elementIndices.compact(), this.elementMap, this.elementRanges, this.vertexRanges.compact())
            }, t
        }();
        t.MoleculeVertexMapBuilder = o;
        var a = function() {
            function e(e, t, n, r, i) {
                this.mapType = e, this.elementIndices = t, this.elementMap = n, this.elementRanges = r, this.vertexRanges = i
            }
            return e
        }();
        t.MoleculeVertexMap = a
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(t) {
            "use strict";
            var n = function(e) {
                function n() {
                    e.apply(this, arguments), this.isTransparent = !1
                }
                return __extends(n, e), n.prototype.addedToSceneInternal = function() {}, n.prototype.applySelection = function(e, t) {
                    return !1
                }, n.prototype.applyTheme = function(t) {
                    e.prototype.applyTheme.call(this, t);
                    var n = {
                        r: 0,
                        g: 0,
                        b: 0
                    };
                    if (this.asSurface) {
                        var r = t.getSurfaceTransparency();
                        t.setSurfaceColor(n), this.material.color = new THREE.Color(n.r, n.g, n.b), this.isTransparent = r.isTransparent, r.isTransparent ? (this.object && (this.object.renderOrder = 1), this.material.depthWrite = !!r.writeDepth, this.material.opacity = r.opacity, this.material.transparent = !0) : (this.object && (this.object.renderOrder = 0), this.material.depthWrite = !0, this.material.opacity = 1, this.material.transparent = !1)
                    } else t.setWireframeColor(n), this.material.color = new THREE.Color(n.r, n.g, n.b);
                    this.material.needsUpdate = !0
                }, n.prototype.createObjects = function() {
                    var e;
                    return e = this.asSurface ? new THREE.Mesh(this.geometry, this.material) : new THREE.Line(this.geometry, this.material, THREE.LinePieces), this.isTransparent && (e.renderOrder = 1), e.matrixAutoUpdate = !1, e.rotationAutoUpdate = !1, e.matrix.copy(this.fromFrac), {
                        main: e,
                        pick: null
                    }
                }, n.prototype.getOffsets = function(e, t, n) {
                    for (var r = n[0] - t[0], i = n[1] - t[1], o = n[2] - t[2], a = [t, [t[0] + r, t[1], t[2]],
                            [t[0], t[1] + i, t[2]],
                            [t[0], t[1], t[2] + o],
                            [t[0] + r, t[1] + i, t[2]],
                            [t[0] + r, t[1], t[2] + o],
                            [t[0], t[1] + i, t[2] + o],
                            [t[0] + r, t[1] + i, t[2] + o]
                        ], s = e.dataDimensions.slice(0), l = [0, 0, 0], c = 0, u = a; c < u.length; c++)
                        for (var d = u[c], p = (new THREE.Vector3).fromArray(d).applyMatrix4(this.toFrac), h = [p.x, p.y, p.z], m = 0; 3 > m; m++) s[m] = Math.max(0, Math.min(s[m], 0 | Math.floor(h[m]))), l[m] = Math.min(e.dataDimensions[m], Math.max(l[m], 0 | Math.ceil(h[m])));
                    return {
                        bottomLeft: s,
                        topRight: l
                    }
                }, n.prototype.getBox = function(e, t) {
                    for (var n = e.atoms, r = (n.count, n.x), i = n.y, o = n.z, a = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE], s = [-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE], l = 0, c = t; l < c.length; l++) {
                        var u = c[l];
                        a[0] = Math.min(r[u], a[0]), a[1] = Math.min(i[u], a[1]), a[2] = Math.min(o[u], a[2]), s[0] = Math.max(r[u], s[0]), s[1] = Math.max(i[u], s[1]), s[2] = Math.max(o[u], s[2])
                    }
                    var d = 3;
                    return a[0] = a[0] - d, a[1] = a[1] - d, a[2] = a[2] - d, s[0] = s[0] + d, s[1] = s[1] + d, s[2] = s[2] + d, {
                        bottomLeft: a,
                        topRight: s
                    }
                }, n.create = function(e, r, i, o, a, s) {
                    var l = new n;
                    l.asSurface = a;
                    var c = i.basis;
                    l.fromFrac = (new THREE.Matrix4).set(c.x[0], c.y[0], c.z[0], 0, 0, c.y[1], c.z[1], 0, 0, 0, c.z[2], 0, 0, 0, 0, 1), l.fromFrac.setPosition(new THREE.Vector3(i.origin[0], i.origin[1], i.origin[2])), l.toFrac = (new THREE.Matrix4).getInverse(l.fromFrac);
                    var u = l.getBox(e, r),
                        d = l.getOffsets(i, u.bottomLeft, u.topRight);
                    if (a) {
                        var p = t.MarchingCubes.compute({
                            dimenstions: i.dataDimensions,
                            isoLevel: o,
                            scalarField: i.data,
                            bottomLeft: d.bottomLeft,
                            topRight: d.topRight
                        });
                        p.laplacianSmooth(), l.isTransparent = !0, l.material = new THREE.MeshPhongMaterial({
                            specular: 11184810,
                            shininess: 1,
                            shading: THREE.FlatShading,
                            side: THREE.DoubleSide
                        }), l.geometry = new THREE.BufferGeometry, l.geometry.addAttribute("position", new THREE.BufferAttribute(p.vertices, 3)), l.geometry.addAttribute("normal", new THREE.BufferAttribute(p.normals, 3)), l.geometry.addAttribute("index", new THREE.BufferAttribute(p.triangleIndices, 1))
                    } else {
                        var h = t.MarchingSquares3D.compute({
                            dimenstions: i.dataDimensions,
                            isoLevel: o,
                            scalarField: i.data,
                            bottomLeft: d.bottomLeft,
                            topRight: d.topRight
                        });
                        l.material = new THREE.LineBasicMaterial, l.geometry = new THREE.BufferGeometry, l.geometry.addAttribute("position", new THREE.BufferAttribute(h.vertices, 3)), l.geometry.addAttribute("index", new THREE.BufferAttribute(h.edgeIndices, 1))
                    }
                    var m = new THREE.Vector3(u.bottomLeft[0], u.bottomLeft[1], u.bottomLeft[2]),
                        f = new THREE.Vector3(u.topRight[0], u.topRight[1], u.topRight[2]);
                    l.centroid = (new THREE.Vector3).add(m).add(f).multiplyScalar(.5), l.radius = l.centroid.distanceTo(m), l.disposeList.push(l.geometry, l.material);
                    var g = l.createObjects();
                    return l.object = g.main, l.pickObject = g.pick, l.applyTheme(s), l.includeInCentroidComputation = !1, l
                }, n
            }(e.Model);
            t.ElectronDensityModel = n
        }(t = e.Density || (e.Density = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(e) {
            var t = function() {
                function e(e, t, n) {
                    this.i = 0 | e, this.j = 0 | t, this.k = 0 | n
                }
                return e
            }();
            e.Index = t;
            var n = function() {
                function e(e, t) {
                    this.a = e, this.b = t
                }
                return e
            }();
            e.IndexPair = n, e.EdgesXY = [
                [],
                [0, 3],
                [0, 1],
                [1, 3],
                [1, 2],
                [0, 1, 1, 2, 2, 3, 0, 3],
                [0, 2],
                [2, 3],
                [2, 3],
                [0, 2],
                [0, 1, 1, 2, 2, 3, 0, 3],
                [1, 2],
                [1, 3],
                [0, 1],
                [0, 3],
                []
            ], e.EdgesXZ = [
                [],
                [0, 8],
                [0, 9],
                [9, 8],
                [9, 4],
                [0, 9, 9, 4, 4, 8, 0, 8],
                [0, 4],
                [4, 8],
                [4, 8],
                [0, 4],
                [0, 9, 9, 4, 4, 8, 0, 8],
                [9, 4],
                [9, 8],
                [0, 9],
                [0, 8],
                []
            ], e.EdgesYZ = [
                [],
                [3, 8],
                [3, 11],
                [11, 8],
                [11, 7],
                [3, 11, 11, 7, 7, 8, 3, 8],
                [3, 7],
                [7, 8],
                [7, 8],
                [3, 7],
                [3, 11, 11, 7, 7, 8, 3, 8],
                [11, 7],
                [11, 8],
                [3, 11],
                [3, 8],
                []
            ], e.CubeVertices = [new t(0, 0, 0), new t(1, 0, 0), new t(1, 1, 0), new t(0, 1, 0), new t(0, 0, 1), new t(1, 0, 1), new t(1, 1, 1), new t(0, 1, 1)], e.CubeEdges = [new n(e.CubeVertices[0], e.CubeVertices[1]), new n(e.CubeVertices[1], e.CubeVertices[2]), new n(e.CubeVertices[2], e.CubeVertices[3]), new n(e.CubeVertices[3], e.CubeVertices[0]), new n(e.CubeVertices[4], e.CubeVertices[5]), new n(e.CubeVertices[5], e.CubeVertices[6]), new n(e.CubeVertices[6], e.CubeVertices[7]), new n(e.CubeVertices[7], e.CubeVertices[4]), new n(e.CubeVertices[0], e.CubeVertices[4]), new n(e.CubeVertices[1], e.CubeVertices[5]), new n(e.CubeVertices[2], e.CubeVertices[6]), new n(e.CubeVertices[3], e.CubeVertices[7])], e.EdgeIdInfo = [{
                i: 0,
                j: 0,
                k: 0,
                e: 0
            }, {
                i: 1,
                j: 0,
                k: 0,
                e: 1
            }, {
                i: 0,
                j: 1,
                k: 0,
                e: 0
            }, {
                i: 0,
                j: 0,
                k: 0,
                e: 1
            }, {
                i: 0,
                j: 0,
                k: 1,
                e: 0
            }, {
                i: 1,
                j: 0,
                k: 1,
                e: 1
            }, {
                i: 0,
                j: 1,
                k: 1,
                e: 0
            }, {
                i: 0,
                j: 0,
                k: 1,
                e: 1
            }, {
                i: 0,
                j: 0,
                k: 0,
                e: 2
            }, {
                i: 1,
                j: 0,
                k: 0,
                e: 2
            }, {
                i: 1,
                j: 1,
                k: 0,
                e: 2
            }, {
                i: 0,
                j: 1,
                k: 0,
                e: 2
            }], e.EdgeTable = [0, 265, 515, 778, 1030, 1295, 1541, 1804, 2060, 2309, 2575, 2822, 3082, 3331, 3593, 3840, 400, 153, 915, 666, 1430, 1183, 1941, 1692, 2460, 2197, 2975, 2710, 3482, 3219, 3993, 3728, 560, 825, 51, 314, 1590, 1855, 1077, 1340, 2620, 2869, 2111, 2358, 3642, 3891, 3129, 3376, 928, 681, 419, 170, 1958, 1711, 1445, 1196, 2988, 2725, 2479, 2214, 4010, 3747, 3497, 3232, 1120, 1385, 1635, 1898, 102, 367, 613, 876, 3180, 3429, 3695, 3942, 2154, 2403, 2665, 2912, 1520, 1273, 2035, 1786, 502, 255, 1013, 764, 3580, 3317, 4095, 3830, 2554, 2291, 3065, 2800, 1616, 1881, 1107, 1370, 598, 863, 85, 348, 3676, 3925, 3167, 3414, 2650, 2899, 2137, 2384, 1984, 1737, 1475, 1226, 966, 719, 453, 204, 4044, 3781, 3535, 3270, 3018, 2755, 2505, 2240, 2240, 2505, 2755, 3018, 3270, 3535, 3781, 4044, 204, 453, 719, 966, 1226, 1475, 1737, 1984, 2384, 2137, 2899, 2650, 3414, 3167, 3925, 3676, 348, 85, 863, 598, 1370, 1107, 1881, 1616, 2800, 3065, 2291, 2554, 3830, 4095, 3317, 3580, 764, 1013, 255, 502, 1786, 2035, 1273, 1520, 2912, 2665, 2403, 2154, 3942, 3695, 3429, 3180, 876, 613, 367, 102, 1898, 1635, 1385, 1120, 3232, 3497, 3747, 4010, 2214, 2479, 2725, 2988, 1196, 1445, 1711, 1958, 170, 419, 681, 928, 3376, 3129, 3891, 3642, 2358, 2111, 2869, 2620, 1340, 1077, 1855, 1590, 314, 51, 825, 560, 3728, 3993, 3219, 3482, 2710, 2975, 2197, 2460, 1692, 1941, 1183, 1430, 666, 915, 153, 400, 3840, 3593, 3331, 3082, 2822, 2575, 2309, 2060, 1804, 1541, 1295, 1030, 778, 515, 265, 0], e.TriTable = [
                [],
                [0, 8, 3],
                [0, 1, 9],
                [1, 8, 3, 9, 8, 1],
                [1, 2, 10],
                [0, 8, 3, 1, 2, 10],
                [9, 2, 10, 0, 2, 9],
                [2, 8, 3, 2, 10, 8, 10, 9, 8],
                [3, 11, 2],
                [0, 11, 2, 8, 11, 0],
                [1, 9, 0, 2, 3, 11],
                [1, 11, 2, 1, 9, 11, 9, 8, 11],
                [3, 10, 1, 11, 10, 3],
                [0, 10, 1, 0, 8, 10, 8, 11, 10],
                [3, 9, 0, 3, 11, 9, 11, 10, 9],
                [9, 8, 10, 10, 8, 11],
                [4, 7, 8],
                [4, 3, 0, 7, 3, 4],
                [0, 1, 9, 8, 4, 7],
                [4, 1, 9, 4, 7, 1, 7, 3, 1],
                [1, 2, 10, 8, 4, 7],
                [3, 4, 7, 3, 0, 4, 1, 2, 10],
                [9, 2, 10, 9, 0, 2, 8, 4, 7],
                [2, 10, 9, 2, 9, 7, 2, 7, 3, 7, 9, 4],
                [8, 4, 7, 3, 11, 2],
                [11, 4, 7, 11, 2, 4, 2, 0, 4],
                [9, 0, 1, 8, 4, 7, 2, 3, 11],
                [4, 7, 11, 9, 4, 11, 9, 11, 2, 9, 2, 1],
                [3, 10, 1, 3, 11, 10, 7, 8, 4],
                [1, 11, 10, 1, 4, 11, 1, 0, 4, 7, 11, 4],
                [4, 7, 8, 9, 0, 11, 9, 11, 10, 11, 0, 3],
                [4, 7, 11, 4, 11, 9, 9, 11, 10],
                [9, 5, 4],
                [9, 5, 4, 0, 8, 3],
                [0, 5, 4, 1, 5, 0],
                [8, 5, 4, 8, 3, 5, 3, 1, 5],
                [1, 2, 10, 9, 5, 4],
                [3, 0, 8, 1, 2, 10, 4, 9, 5],
                [5, 2, 10, 5, 4, 2, 4, 0, 2],
                [2, 10, 5, 3, 2, 5, 3, 5, 4, 3, 4, 8],
                [9, 5, 4, 2, 3, 11],
                [0, 11, 2, 0, 8, 11, 4, 9, 5],
                [0, 5, 4, 0, 1, 5, 2, 3, 11],
                [2, 1, 5, 2, 5, 8, 2, 8, 11, 4, 8, 5],
                [10, 3, 11, 10, 1, 3, 9, 5, 4],
                [4, 9, 5, 0, 8, 1, 8, 10, 1, 8, 11, 10],
                [5, 4, 0, 5, 0, 11, 5, 11, 10, 11, 0, 3],
                [5, 4, 8, 5, 8, 10, 10, 8, 11],
                [9, 7, 8, 5, 7, 9],
                [9, 3, 0, 9, 5, 3, 5, 7, 3],
                [0, 7, 8, 0, 1, 7, 1, 5, 7],
                [1, 5, 3, 3, 5, 7],
                [9, 7, 8, 9, 5, 7, 10, 1, 2],
                [10, 1, 2, 9, 5, 0, 5, 3, 0, 5, 7, 3],
                [8, 0, 2, 8, 2, 5, 8, 5, 7, 10, 5, 2],
                [2, 10, 5, 2, 5, 3, 3, 5, 7],
                [7, 9, 5, 7, 8, 9, 3, 11, 2],
                [9, 5, 7, 9, 7, 2, 9, 2, 0, 2, 7, 11],
                [2, 3, 11, 0, 1, 8, 1, 7, 8, 1, 5, 7],
                [11, 2, 1, 11, 1, 7, 7, 1, 5],
                [9, 5, 8, 8, 5, 7, 10, 1, 3, 10, 3, 11],
                [5, 7, 0, 5, 0, 9, 7, 11, 0, 1, 0, 10, 11, 10, 0],
                [11, 10, 0, 11, 0, 3, 10, 5, 0, 8, 0, 7, 5, 7, 0],
                [11, 10, 5, 7, 11, 5],
                [10, 6, 5],
                [0, 8, 3, 5, 10, 6],
                [9, 0, 1, 5, 10, 6],
                [1, 8, 3, 1, 9, 8, 5, 10, 6],
                [1, 6, 5, 2, 6, 1],
                [1, 6, 5, 1, 2, 6, 3, 0, 8],
                [9, 6, 5, 9, 0, 6, 0, 2, 6],
                [5, 9, 8, 5, 8, 2, 5, 2, 6, 3, 2, 8],
                [2, 3, 11, 10, 6, 5],
                [11, 0, 8, 11, 2, 0, 10, 6, 5],
                [0, 1, 9, 2, 3, 11, 5, 10, 6],
                [5, 10, 6, 1, 9, 2, 9, 11, 2, 9, 8, 11],
                [6, 3, 11, 6, 5, 3, 5, 1, 3],
                [0, 8, 11, 0, 11, 5, 0, 5, 1, 5, 11, 6],
                [3, 11, 6, 0, 3, 6, 0, 6, 5, 0, 5, 9],
                [6, 5, 9, 6, 9, 11, 11, 9, 8],
                [5, 10, 6, 4, 7, 8],
                [4, 3, 0, 4, 7, 3, 6, 5, 10],
                [1, 9, 0, 5, 10, 6, 8, 4, 7],
                [10, 6, 5, 1, 9, 7, 1, 7, 3, 7, 9, 4],
                [6, 1, 2, 6, 5, 1, 4, 7, 8],
                [1, 2, 5, 5, 2, 6, 3, 0, 4, 3, 4, 7],
                [8, 4, 7, 9, 0, 5, 0, 6, 5, 0, 2, 6],
                [7, 3, 9, 7, 9, 4, 3, 2, 9, 5, 9, 6, 2, 6, 9],
                [3, 11, 2, 7, 8, 4, 10, 6, 5],
                [5, 10, 6, 4, 7, 2, 4, 2, 0, 2, 7, 11],
                [0, 1, 9, 4, 7, 8, 2, 3, 11, 5, 10, 6],
                [9, 2, 1, 9, 11, 2, 9, 4, 11, 7, 11, 4, 5, 10, 6],
                [8, 4, 7, 3, 11, 5, 3, 5, 1, 5, 11, 6],
                [5, 1, 11, 5, 11, 6, 1, 0, 11, 7, 11, 4, 0, 4, 11],
                [0, 5, 9, 0, 6, 5, 0, 3, 6, 11, 6, 3, 8, 4, 7],
                [6, 5, 9, 6, 9, 11, 4, 7, 9, 7, 11, 9],
                [10, 4, 9, 6, 4, 10],
                [4, 10, 6, 4, 9, 10, 0, 8, 3],
                [10, 0, 1, 10, 6, 0, 6, 4, 0],
                [8, 3, 1, 8, 1, 6, 8, 6, 4, 6, 1, 10],
                [1, 4, 9, 1, 2, 4, 2, 6, 4],
                [3, 0, 8, 1, 2, 9, 2, 4, 9, 2, 6, 4],
                [0, 2, 4, 4, 2, 6],
                [8, 3, 2, 8, 2, 4, 4, 2, 6],
                [10, 4, 9, 10, 6, 4, 11, 2, 3],
                [0, 8, 2, 2, 8, 11, 4, 9, 10, 4, 10, 6],
                [3, 11, 2, 0, 1, 6, 0, 6, 4, 6, 1, 10],
                [6, 4, 1, 6, 1, 10, 4, 8, 1, 2, 1, 11, 8, 11, 1],
                [9, 6, 4, 9, 3, 6, 9, 1, 3, 11, 6, 3],
                [8, 11, 1, 8, 1, 0, 11, 6, 1, 9, 1, 4, 6, 4, 1],
                [3, 11, 6, 3, 6, 0, 0, 6, 4],
                [6, 4, 8, 11, 6, 8],
                [7, 10, 6, 7, 8, 10, 8, 9, 10],
                [0, 7, 3, 0, 10, 7, 0, 9, 10, 6, 7, 10],
                [10, 6, 7, 1, 10, 7, 1, 7, 8, 1, 8, 0],
                [10, 6, 7, 10, 7, 1, 1, 7, 3],
                [1, 2, 6, 1, 6, 8, 1, 8, 9, 8, 6, 7],
                [2, 6, 9, 2, 9, 1, 6, 7, 9, 0, 9, 3, 7, 3, 9],
                [7, 8, 0, 7, 0, 6, 6, 0, 2],
                [7, 3, 2, 6, 7, 2],
                [2, 3, 11, 10, 6, 8, 10, 8, 9, 8, 6, 7],
                [2, 0, 7, 2, 7, 11, 0, 9, 7, 6, 7, 10, 9, 10, 7],
                [1, 8, 0, 1, 7, 8, 1, 10, 7, 6, 7, 10, 2, 3, 11],
                [11, 2, 1, 11, 1, 7, 10, 6, 1, 6, 7, 1],
                [8, 9, 6, 8, 6, 7, 9, 1, 6, 11, 6, 3, 1, 3, 6],
                [0, 9, 1, 11, 6, 7],
                [7, 8, 0, 7, 0, 6, 3, 11, 0, 11, 6, 0],
                [7, 11, 6],
                [7, 6, 11],
                [3, 0, 8, 11, 7, 6],
                [0, 1, 9, 11, 7, 6],
                [8, 1, 9, 8, 3, 1, 11, 7, 6],
                [10, 1, 2, 6, 11, 7],
                [1, 2, 10, 3, 0, 8, 6, 11, 7],
                [2, 9, 0, 2, 10, 9, 6, 11, 7],
                [6, 11, 7, 2, 10, 3, 10, 8, 3, 10, 9, 8],
                [7, 2, 3, 6, 2, 7],
                [7, 0, 8, 7, 6, 0, 6, 2, 0],
                [2, 7, 6, 2, 3, 7, 0, 1, 9],
                [1, 6, 2, 1, 8, 6, 1, 9, 8, 8, 7, 6],
                [10, 7, 6, 10, 1, 7, 1, 3, 7],
                [10, 7, 6, 1, 7, 10, 1, 8, 7, 1, 0, 8],
                [0, 3, 7, 0, 7, 10, 0, 10, 9, 6, 10, 7],
                [7, 6, 10, 7, 10, 8, 8, 10, 9],
                [6, 8, 4, 11, 8, 6],
                [3, 6, 11, 3, 0, 6, 0, 4, 6],
                [8, 6, 11, 8, 4, 6, 9, 0, 1],
                [9, 4, 6, 9, 6, 3, 9, 3, 1, 11, 3, 6],
                [6, 8, 4, 6, 11, 8, 2, 10, 1],
                [1, 2, 10, 3, 0, 11, 0, 6, 11, 0, 4, 6],
                [4, 11, 8, 4, 6, 11, 0, 2, 9, 2, 10, 9],
                [10, 9, 3, 10, 3, 2, 9, 4, 3, 11, 3, 6, 4, 6, 3],
                [8, 2, 3, 8, 4, 2, 4, 6, 2],
                [0, 4, 2, 4, 6, 2],
                [1, 9, 0, 2, 3, 4, 2, 4, 6, 4, 3, 8],
                [1, 9, 4, 1, 4, 2, 2, 4, 6],
                [8, 1, 3, 8, 6, 1, 8, 4, 6, 6, 10, 1],
                [10, 1, 0, 10, 0, 6, 6, 0, 4],
                [4, 6, 3, 4, 3, 8, 6, 10, 3, 0, 3, 9, 10, 9, 3],
                [10, 9, 4, 6, 10, 4],
                [4, 9, 5, 7, 6, 11],
                [0, 8, 3, 4, 9, 5, 11, 7, 6],
                [5, 0, 1, 5, 4, 0, 7, 6, 11],
                [11, 7, 6, 8, 3, 4, 3, 5, 4, 3, 1, 5],
                [9, 5, 4, 10, 1, 2, 7, 6, 11],
                [6, 11, 7, 1, 2, 10, 0, 8, 3, 4, 9, 5],
                [7, 6, 11, 5, 4, 10, 4, 2, 10, 4, 0, 2],
                [3, 4, 8, 3, 5, 4, 3, 2, 5, 10, 5, 2, 11, 7, 6],
                [7, 2, 3, 7, 6, 2, 5, 4, 9],
                [9, 5, 4, 0, 8, 6, 0, 6, 2, 6, 8, 7],
                [3, 6, 2, 3, 7, 6, 1, 5, 0, 5, 4, 0],
                [6, 2, 8, 6, 8, 7, 2, 1, 8, 4, 8, 5, 1, 5, 8],
                [9, 5, 4, 10, 1, 6, 1, 7, 6, 1, 3, 7],
                [1, 6, 10, 1, 7, 6, 1, 0, 7, 8, 7, 0, 9, 5, 4],
                [4, 0, 10, 4, 10, 5, 0, 3, 10, 6, 10, 7, 3, 7, 10],
                [7, 6, 10, 7, 10, 8, 5, 4, 10, 4, 8, 10],
                [6, 9, 5, 6, 11, 9, 11, 8, 9],
                [3, 6, 11, 0, 6, 3, 0, 5, 6, 0, 9, 5],
                [0, 11, 8, 0, 5, 11, 0, 1, 5, 5, 6, 11],
                [6, 11, 3, 6, 3, 5, 5, 3, 1],
                [1, 2, 10, 9, 5, 11, 9, 11, 8, 11, 5, 6],
                [0, 11, 3, 0, 6, 11, 0, 9, 6, 5, 6, 9, 1, 2, 10],
                [11, 8, 5, 11, 5, 6, 8, 0, 5, 10, 5, 2, 0, 2, 5],
                [6, 11, 3, 6, 3, 5, 2, 10, 3, 10, 5, 3],
                [5, 8, 9, 5, 2, 8, 5, 6, 2, 3, 8, 2],
                [9, 5, 6, 9, 6, 0, 0, 6, 2],
                [1, 5, 8, 1, 8, 0, 5, 6, 8, 3, 8, 2, 6, 2, 8],
                [1, 5, 6, 2, 1, 6],
                [1, 3, 6, 1, 6, 10, 3, 8, 6, 5, 6, 9, 8, 9, 6],
                [10, 1, 0, 10, 0, 6, 9, 5, 0, 5, 6, 0],
                [0, 3, 8, 5, 6, 10],
                [10, 5, 6],
                [11, 5, 10, 7, 5, 11],
                [11, 5, 10, 11, 7, 5, 8, 3, 0],
                [5, 11, 7, 5, 10, 11, 1, 9, 0],
                [10, 7, 5, 10, 11, 7, 9, 8, 1, 8, 3, 1],
                [11, 1, 2, 11, 7, 1, 7, 5, 1],
                [0, 8, 3, 1, 2, 7, 1, 7, 5, 7, 2, 11],
                [9, 7, 5, 9, 2, 7, 9, 0, 2, 2, 11, 7],
                [7, 5, 2, 7, 2, 11, 5, 9, 2, 3, 2, 8, 9, 8, 2],
                [2, 5, 10, 2, 3, 5, 3, 7, 5],
                [8, 2, 0, 8, 5, 2, 8, 7, 5, 10, 2, 5],
                [9, 0, 1, 5, 10, 3, 5, 3, 7, 3, 10, 2],
                [9, 8, 2, 9, 2, 1, 8, 7, 2, 10, 2, 5, 7, 5, 2],
                [1, 3, 5, 3, 7, 5],
                [0, 8, 7, 0, 7, 1, 1, 7, 5],
                [9, 0, 3, 9, 3, 5, 5, 3, 7],
                [9, 8, 7, 5, 9, 7],
                [5, 8, 4, 5, 10, 8, 10, 11, 8],
                [5, 0, 4, 5, 11, 0, 5, 10, 11, 11, 3, 0],
                [0, 1, 9, 8, 4, 10, 8, 10, 11, 10, 4, 5],
                [10, 11, 4, 10, 4, 5, 11, 3, 4, 9, 4, 1, 3, 1, 4],
                [2, 5, 1, 2, 8, 5, 2, 11, 8, 4, 5, 8],
                [0, 4, 11, 0, 11, 3, 4, 5, 11, 2, 11, 1, 5, 1, 11],
                [0, 2, 5, 0, 5, 9, 2, 11, 5, 4, 5, 8, 11, 8, 5],
                [9, 4, 5, 2, 11, 3],
                [2, 5, 10, 3, 5, 2, 3, 4, 5, 3, 8, 4],
                [5, 10, 2, 5, 2, 4, 4, 2, 0],
                [3, 10, 2, 3, 5, 10, 3, 8, 5, 4, 5, 8, 0, 1, 9],
                [5, 10, 2, 5, 2, 4, 1, 9, 2, 9, 4, 2],
                [8, 4, 5, 8, 5, 3, 3, 5, 1],
                [0, 4, 5, 1, 0, 5],
                [8, 4, 5, 8, 5, 3, 9, 0, 5, 0, 3, 5],
                [9, 4, 5],
                [4, 11, 7, 4, 9, 11, 9, 10, 11],
                [0, 8, 3, 4, 9, 7, 9, 11, 7, 9, 10, 11],
                [1, 10, 11, 1, 11, 4, 1, 4, 0, 7, 4, 11],
                [3, 1, 4, 3, 4, 8, 1, 10, 4, 7, 4, 11, 10, 11, 4],
                [4, 11, 7, 9, 11, 4, 9, 2, 11, 9, 1, 2],
                [9, 7, 4, 9, 11, 7, 9, 1, 11, 2, 11, 1, 0, 8, 3],
                [11, 7, 4, 11, 4, 2, 2, 4, 0],
                [11, 7, 4, 11, 4, 2, 8, 3, 4, 3, 2, 4],
                [2, 9, 10, 2, 7, 9, 2, 3, 7, 7, 4, 9],
                [9, 10, 7, 9, 7, 4, 10, 2, 7, 8, 7, 0, 2, 0, 7],
                [3, 7, 10, 3, 10, 2, 7, 4, 10, 1, 10, 0, 4, 0, 10],
                [1, 10, 2, 8, 7, 4],
                [4, 9, 1, 4, 1, 7, 7, 1, 3],
                [4, 9, 1, 4, 1, 7, 0, 8, 1, 8, 7, 1],
                [4, 0, 3, 7, 4, 3],
                [4, 8, 7],
                [9, 10, 8, 10, 11, 8],
                [3, 0, 9, 3, 9, 11, 11, 9, 10],
                [0, 1, 10, 0, 10, 8, 8, 10, 11],
                [3, 1, 10, 11, 3, 10],
                [1, 2, 11, 1, 11, 9, 9, 11, 8],
                [3, 0, 9, 3, 9, 11, 1, 2, 9, 2, 11, 9],
                [0, 2, 11, 8, 0, 11],
                [3, 2, 11],
                [2, 3, 8, 2, 8, 10, 10, 8, 9],
                [9, 10, 2, 0, 9, 2],
                [2, 3, 8, 2, 8, 10, 0, 1, 8, 1, 10, 8],
                [1, 10, 2],
                [1, 3, 8, 9, 1, 8],
                [0, 9, 1],
                [0, 3, 8],
                []
            ]
        }(t = e.Density || (e.Density = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(t) {
            "use strict";
            var n = function() {
                function e(e, t, n) {
                    this.__normals = new Float32Array(0), this.vertexCount = e.length / 3 | 0, this.vertices = e, this.triangleIndices = t, this.annotation = n
                }
                return Object.defineProperty(e.prototype, "normals", {
                    get: function() {
                        return this.__normals.length > 0 ? this.__normals : (this.computeVertexNormals(), this.__normals)
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.computeVertexNormals = function() {
                    var e, t, n = new Float32Array(this.vertices.length),
                        r = this.vertices,
                        i = this.triangleIndices;
                    i.length;
                    for (t = 0; t < i.length; t += 3) {
                        var o = 3 * i[t],
                            a = 3 * i[t + 1],
                            s = 3 * i[t + 2],
                            l = r[o + 2] * (r[a + 1] - r[s + 1]) + r[a + 2] * r[s + 1] - r[a + 1] * r[s + 2] + r[o + 1] * (-r[a + 2] + r[s + 2]),
                            c = -(r[a + 2] * r[s]) + r[o + 2] * (-r[a] + r[s]) + r[o] * (r[a + 2] - r[s + 2]) + r[a] * r[s + 2],
                            u = r[o + 1] * (r[a] - r[s]) + r[a + 1] * r[s] - r[a] * r[s + 1] + r[o] * (-r[a + 1] + r[a + 1]);
                        n[o] += l, n[o + 1] += c, n[o + 2] += u, n[a] += l, n[a + 1] += c, n[a + 2] += u, n[s] += l, n[s + 1] += c, n[s + 2] += u
                    }
                    for (t = 0; t < n.length; t += 3) l = n[t], c = n[t + 1], u = n[t + 2], e = 1 / Math.sqrt(l * l + c * c + u * u), n[t] *= e, n[t + 1] *= e, n[t + 2] *= e;
                    this.__normals = n
                }, e.addVertex = function(e, t, n, r) {
                    n[3 * r] += e[3 * t], n[3 * r + 1] += e[3 * t + 1], n[3 * r + 2] += e[3 * t + 2]
                }, e.prototype.laplacianSmoothIter = function(t, n) {
                    for (var r = this.triangleIndices.length, i = this.vertices, o = 0; r > o; o += 3) {
                        var a = this.triangleIndices[o],
                            s = this.triangleIndices[o + 1],
                            l = this.triangleIndices[o + 2];
                        e.addVertex(i, s, n, a), e.addVertex(i, l, n, a), e.addVertex(i, a, n, s), e.addVertex(i, l, n, s), e.addVertex(i, a, n, l), e.addVertex(i, s, n, l)
                    }
                    for (var o = 0; o < this.vertexCount; o++) {
                        var c = t[o] + 2;
                        n[3 * o] = (n[3 * o] + 2 * i[3 * o]) / c, n[3 * o + 1] = (n[3 * o + 1] + 2 * i[3 * o + 1]) / c,
                            n[3 * o + 2] = (n[3 * o + 2] + 2 * i[3 * o + 2]) / c
                    }
                }, e.prototype.laplacianSmooth = function(e) {
                    void 0 === e && (e = 1), 1 > e && (e = 1);
                    for (var t = new Int32Array(this.vertexCount), n = this.triangleIndices.length, r = 0; n > r; r++) t[this.triangleIndices[r]] += 2;
                    for (var i = new Float32Array(this.vertices.length), r = 0; e > r; r++) {
                        if (r > 0)
                            for (var o = 0, a = i.length; a > o; o++) i[o] = 0;
                        this.laplacianSmoothIter(t, i);
                        var s = this.vertices;
                        this.vertices = i, i = s
                    }
                    this.__normals = new Float32Array(0)
                }, e
            }();
            t.MarchingCubesResult = n;
            var r = function() {
                function t() {}
                return t.compute = function(t) {
                    var r = e.Utils.extend({}, t, {});
                    r.bottomLeft || (r.bottomLeft = [0, 0, 0]), r.topRight || (r.topRight = r.dimenstions);
                    var o, a, s = new i(r),
                        l = r.bottomLeft[0],
                        c = r.bottomLeft[1],
                        u = r.bottomLeft[2],
                        d = r.topRight[0] - 1,
                        p = r.topRight[1] - 1,
                        h = r.topRight[2] - 1,
                        m = 0,
                        f = 0,
                        g = 0;
                    for (g = u; h > g; g++)
                        for (f = c; p > f; f++)
                            for (m = l; d > m; m++) s.processCell(m, f, g);
                    return o = s.vertexBuffer.compact(), a = s.triangleBuffer.compact(), s.vertexBuffer = null, s.verticesOnEdges = null, new n(o, a, s.annotate ? s.annotationBuffer.compact() : null)
                }, t
            }();
            t.MarchingCubes = r;
            var i = function() {
                function n(t) {
                    this.vertList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], this.i = 0, this.j = 0, this.k = 0, this.nX = t.dimenstions[0], this.nY = t.dimenstions[1], this.nZ = t.dimenstions[2], this.isoLevel = t.isoLevel, this.scalarField = t.scalarField, this.annotationField = t.annotationField;
                    var n = t.topRight[0] - t.bottomLeft[0],
                        r = t.topRight[1] - t.bottomLeft[1],
                        i = t.topRight[2] - t.bottomLeft[2],
                        o = Math.min(262144, 0 | Math.max(n * r * i / 16, 1024)),
                        a = Math.min(65536, 4 * o);
                    this.vertexBuffer = e.Utils.ChunkedArrayBuilder.forVertex3D(o), this.triangleBuffer = new e.Utils.ChunkedArrayBuilder(function(e) {
                        return new Uint32Array(e)
                    }, a, 3), this.annotate = !!t.annotationField, this.annotate && (this.annotationBuffer = e.Utils.ChunkedArrayBuilder.forInt32(o)), this.verticesOnEdges = new Int32Array(3 * this.nX * this.nY * this.nZ)
                }
                return n.prototype.getAnnotation = function() {
                    return this.annotationField[this.nX * (this.k * this.nY + this.j) + this.i]
                }, n.prototype.getFieldFromIndices = function(e, t, n) {
                    return this.scalarField[this.nX * (n * this.nY + t) + e]
                }, n.prototype.get3dOffsetFromEdgeInfo = function(e) {
                    return this.nX * ((this.k + e.k) * this.nY + this.j + e.j) + this.i + e.i | 0
                }, n.prototype.interpolate = function(e) {
                    var n = t.EdgeIdInfo[e],
                        r = 3 * this.get3dOffsetFromEdgeInfo(n) + n.e,
                        i = this.verticesOnEdges[r];
                    if (i > 0) return i - 1 | 0;
                    var o = t.CubeEdges[e],
                        a = o.a,
                        s = o.b,
                        l = a.i + this.i,
                        c = a.j + this.j,
                        u = a.k + this.k,
                        d = s.i + this.i,
                        p = s.j + this.j,
                        h = s.k + this.k,
                        m = this.getFieldFromIndices(l, c, u),
                        f = this.getFieldFromIndices(d, p, h),
                        g = (this.isoLevel - m) / (m - f),
                        y = 0 | this.vertexBuffer.add3(l + g * (l - d), c + g * (c - p), u + g * (u - h));
                    return this.verticesOnEdges[r] = y + 1, this.annotate && this.annotationBuffer.add(this.getAnnotation()), y
                }, n.prototype.processCell = function(e, n, r) {
                    var i = 0;
                    if (this.getFieldFromIndices(e, n, r) < this.isoLevel && (i |= 1), this.getFieldFromIndices(e + 1, n, r) < this.isoLevel && (i |= 2), this.getFieldFromIndices(e + 1, n + 1, r) < this.isoLevel && (i |= 4), this.getFieldFromIndices(e, n + 1, r) < this.isoLevel && (i |= 8), this.getFieldFromIndices(e, n, r + 1) < this.isoLevel && (i |= 16), this.getFieldFromIndices(e + 1, n, r + 1) < this.isoLevel && (i |= 32), this.getFieldFromIndices(e + 1, n + 1, r + 1) < this.isoLevel && (i |= 64), this.getFieldFromIndices(e, n + 1, r + 1) < this.isoLevel && (i |= 128), 0 !== i && 255 !== i) {
                        this.i = e, this.j = n, this.k = r;
                        var o = t.EdgeTable[i];
                        (1 & o) > 0 && (this.vertList[0] = this.interpolate(0)), (2 & o) > 0 && (this.vertList[1] = this.interpolate(1)), (4 & o) > 0 && (this.vertList[2] = this.interpolate(2)), (8 & o) > 0 && (this.vertList[3] = this.interpolate(3)), (16 & o) > 0 && (this.vertList[4] = this.interpolate(4)), (32 & o) > 0 && (this.vertList[5] = this.interpolate(5)), (64 & o) > 0 && (this.vertList[6] = this.interpolate(6)), (128 & o) > 0 && (this.vertList[7] = this.interpolate(7)), (256 & o) > 0 && (this.vertList[8] = this.interpolate(8)), (512 & o) > 0 && (this.vertList[9] = this.interpolate(9)), (1024 & o) > 0 && (this.vertList[10] = this.interpolate(10)), (2048 & o) > 0 && (this.vertList[11] = this.interpolate(11));
                        for (var a = t.TriTable[i], s = 0; s < a.length; s += 3) this.triangleBuffer.add3(this.vertList[a[s]], this.vertList[a[s + 1]], this.vertList[a[s + 2]])
                    }
                }, n
            }()
        }(n = t.Density || (t.Density = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(t) {
            "use strict";
            var n = function() {
                function e(e, t) {
                    this.vertexCount = e.length / 3 | 0, this.vertices = e, this.edgeIndices = t
                }
                return e
            }();
            t.MarchingSquares3DResult = n;
            var r = function() {
                function e() {}
                return e.compute = function(e) {
                    var t, r, o = new i(e),
                        a = e.bottomLeft[0],
                        s = e.bottomLeft[1],
                        l = e.bottomLeft[2],
                        c = e.topRight[0] - 1,
                        u = e.topRight[1] - 1,
                        d = e.topRight[2] - 1,
                        p = 0,
                        h = 0,
                        m = 0;
                    for (m = l; d > m; m++)
                        for (h = s; u > h; h++)
                            for (p = a; c > p; p++) o.processCell(p, h, m);
                    for (p = a; c > p; p++)
                        for (o.processCellYZMax(p, u, d), h = s; u > h; h++) o.processCellZMax(p, h, d);
                    for (p = a; c > p; p++)
                        for (m = l; d > m; m++) o.processCellYMax(p, u, m);
                    for (h = s; u > h; h++)
                        for (o.processCellXZMax(c, h, d), m = l; d > m; m++) o.processCellXMax(c, h, m);
                    for (m = l; d > m; m++) o.processCellXYMax(c, u, m);
                    for (m = l; d > m; m++)
                        for (h = s; u > h; h++)
                            for (p = a; c > p; p++) o.marchXY(p, h, m), o.marchXZ(p, h, m), o.marchYZ(p, h, m);
                    return t = o.vertexBuffer.compact(), r = o.edgeBuffer.compact(), o.vertexBuffer = null, o.verticesOnEdges = null, new n(t, r)
                }, e
            }();
            t.MarchingSquares3D = r;
            var i = function() {
                function n(t) {
                    this.verticesOnEdges = new Map, this.edgeId = 0, this.vertexId = 0, this.i = 0, this.j = 0, this.k = 0, this.nX = t.dimenstions[0], this.nY = t.dimenstions[1], this.nZ = t.dimenstions[2], this.isoLevel = t.isoLevel, this.scalarField = t.scalarField;
                    var n = t.topRight[0] - t.bottomLeft[0],
                        r = t.topRight[1] - t.bottomLeft[1],
                        i = t.topRight[2] - t.bottomLeft[2],
                        o = Math.min(262144, 0 | Math.max(n * r * i / 16, 1024)),
                        a = Math.min(65536, 4 * o);
                    this.vertexBuffer = e.Utils.ChunkedArrayBuilder.forVertex3D(o), this.edgeBuffer = new e.Utils.ChunkedArrayBuilder(function(e) {
                        return new Uint16Array(e)
                    }, a, 2)
                }
                return n.prototype.getFieldFromIndices = function(e, t, n) {
                    return this.scalarField[this.nX * (n * this.nY + t) + e]
                }, n.prototype.get3dOffsetFromEdgeInfo = function(e) {
                    return this.nX * ((this.k + e.k) * this.nY + this.j + e.j) + this.i + e.i | 0
                }, n.prototype.getEdgeOffset = function(e) {
                    var n = t.EdgeIdInfo[e],
                        r = this.get3dOffsetFromEdgeInfo(n);
                    return 3 * r + n.e | 0
                }, n.prototype.setEdgeInfo = function(e) {
                    var n = t.EdgeIdInfo[e],
                        r = this.get3dOffsetFromEdgeInfo(n);
                    this.edgeId = 3 * r + n.e | 0, this.vertexId = r
                }, n.prototype.interpolate = function(e) {
                    this.setEdgeInfo(e);
                    var n = this.verticesOnEdges.get(this.edgeId);
                    if (void 0 !== n) return 0 | n;
                    var r = t.CubeEdges[e],
                        i = r.a,
                        o = r.b,
                        a = i.i + this.i,
                        s = i.j + this.j,
                        l = i.k + this.k,
                        c = o.i + this.i,
                        u = o.j + this.j,
                        d = o.k + this.k,
                        p = this.getFieldFromIndices(a, s, l),
                        h = this.getFieldFromIndices(c, u, d),
                        m = (this.isoLevel - p) / (p - h),
                        f = 0 | this.vertexBuffer.add3(a + m * (a - c), s + m * (s - u), l + m * (l - d));
                    return this.verticesOnEdges.set(this.edgeId, f), f
                }, n.prototype.processCell = function(e, t, n) {
                    this.i = e, this.j = t, this.k = n;
                    var r = this.getFieldFromIndices(e, t, n) < this.isoLevel,
                        i = !1;
                    i = this.getFieldFromIndices(e + 1, t, n) < this.isoLevel, r !== i && this.interpolate(0), i = this.getFieldFromIndices(e, t + 1, n) < this.isoLevel, r !== i && this.interpolate(3), i = this.getFieldFromIndices(e, t, n + 1) < this.isoLevel, r !== i && this.interpolate(8)
                }, n.prototype.processCellXMax = function(e, t, n) {
                    this.i = e, this.j = t, this.k = n;
                    var r = this.getFieldFromIndices(e, t, n) < this.isoLevel,
                        i = !1;
                    i = this.getFieldFromIndices(e, t + 1, n) < this.isoLevel, r !== i && this.interpolate(3), i = this.getFieldFromIndices(e, t, n + 1) < this.isoLevel, r !== i && this.interpolate(8)
                }, n.prototype.processCellYMax = function(e, t, n) {
                    this.i = e, this.j = t, this.k = n;
                    var r = this.getFieldFromIndices(e, t, n) < this.isoLevel,
                        i = !1;
                    i = this.getFieldFromIndices(e + 1, t, n) < this.isoLevel, r !== i && this.interpolate(0), i = this.getFieldFromIndices(e, t, n + 1) < this.isoLevel, r !== i && this.interpolate(8)
                }, n.prototype.processCellZMax = function(e, t, n) {
                    this.i = e, this.j = t, this.k = n;
                    var r = this.getFieldFromIndices(e, t, n) < this.isoLevel,
                        i = !1;
                    i = this.getFieldFromIndices(e + 1, t, n) < this.isoLevel, r !== i && this.interpolate(0), i = this.getFieldFromIndices(e, t + 1, n) < this.isoLevel, r !== i && this.interpolate(3)
                }, n.prototype.processCellXYMax = function(e, t, n) {
                    this.i = e, this.j = t, this.k = n;
                    var r = this.getFieldFromIndices(e, t, n) < this.isoLevel,
                        i = !1;
                    i = this.getFieldFromIndices(e, t, n + 1) < this.isoLevel, r !== i && this.interpolate(8)
                }, n.prototype.processCellXZMax = function(e, t, n) {
                    this.i = e, this.j = t, this.k = n;
                    var r = this.getFieldFromIndices(e, t, n) < this.isoLevel,
                        i = !1;
                    i = this.getFieldFromIndices(e, t + 1, n) < this.isoLevel, r !== i && this.interpolate(3)
                }, n.prototype.processCellYZMax = function(e, t, n) {
                    this.i = e, this.j = t, this.k = n;
                    var r = this.getFieldFromIndices(e, t, n) < this.isoLevel,
                        i = !1;
                    i = this.getFieldFromIndices(e + 1, t, n) < this.isoLevel, r !== i && this.interpolate(0)
                }, n.prototype.addEdges = function(e) {
                    for (var t = 0; t < e.length; t += 2) this.edgeBuffer.add2(this.verticesOnEdges.get(this.getEdgeOffset(e[t])), this.verticesOnEdges.get(this.getEdgeOffset(e[t + 1])))
                }, n.prototype.marchXY = function(e, n, r) {
                    var i = 0;
                    this.i = e, this.j = n, this.k = r, this.getFieldFromIndices(e, n, r) < this.isoLevel && (i |= 1), this.getFieldFromIndices(e + 1, n, r) < this.isoLevel && (i |= 2), this.getFieldFromIndices(e + 1, n + 1, r) < this.isoLevel && (i |= 4), this.getFieldFromIndices(e, n + 1, r) < this.isoLevel && (i |= 8), this.addEdges(t.EdgesXY[i])
                }, n.prototype.marchXZ = function(e, n, r) {
                    var i = 0;
                    this.i = e, this.j = n, this.k = r, this.getFieldFromIndices(e, n, r) < this.isoLevel && (i |= 1), this.getFieldFromIndices(e + 1, n, r) < this.isoLevel && (i |= 2), this.getFieldFromIndices(e + 1, n, r + 1) < this.isoLevel && (i |= 4), this.getFieldFromIndices(e, n, r + 1) < this.isoLevel && (i |= 8), this.addEdges(t.EdgesXZ[i])
                }, n.prototype.marchYZ = function(e, n, r) {
                    var i = 0;
                    this.i = e, this.j = n, this.k = r, this.getFieldFromIndices(e, n, r) < this.isoLevel && (i |= 1), this.getFieldFromIndices(e, n + 1, r) < this.isoLevel && (i |= 2), this.getFieldFromIndices(e, n + 1, r + 1) < this.isoLevel && (i |= 4), this.getFieldFromIndices(e, n, r + 1) < this.isoLevel && (i |= 8), this.addEdges(t.EdgesYZ[i])
                }, n
            }()
        }(n = t.Density || (t.Density = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(t) {
            "use strict";
            var n = function(e) {
                function n() {
                    e.apply(this, arguments)
                }
                return __extends(n, e), n.prototype.applySelection = function(e, t) {
                    return this.moleculeModel.applySelection(e, t)
                }, n.prototype.addedToSceneInternal = function() {
                    this.moleculeModel.addedToScene(this.sceneId)
                }, n.prototype.getPickElement = function(e) {
                    return this.moleculeModel.getPickElement(e)
                }, n.prototype.highlightElement = function(e, t) {
                    return this.moleculeModel.highlightElement(e, t)
                }, n.prototype.clearHighlight = function() {
                    return !1
                }, n.prototype.applyTheme = function(t) {
                    return e.prototype.applyTheme.call(this, t), this.moleculeModel.applyTheme(t)
                }, n.prototype.createObjects = function() {
                    for (var e = new THREE.Object3D, t = new THREE.Object3D, n = (new THREE.Matrix4, 0), r = this.matrices; n < r.length; n++) {
                        var i = r[n],
                            o = this.moleculeModel.createObjects();
                        o.main && (o.main.matrixAutoUpdate = !1, o.main.matrix.copy(i), e.add(o.main)), o.pick && (o.pick.matrixAutoUpdate = !1, o.pick.matrix.copy(i), t.add(o.pick))
                    }
                    return {
                        main: e,
                        pick: t
                    }
                }, n.createOperators = function(e, t, r, i) {
                    if (0 > r) return void(t[t.length] = i.slice(0));
                    for (var o = e[r], a = o.length, s = 0; a > s; s++) i[r] = o[s], n.createOperators(e, t, r - 1, i)
                }, n.buildMatrices = function(e, t) {
                    for (var n = [], r = new THREE.Matrix4, i = 0, o = t; i < o.length; i++) {
                        var a = o[i],
                            s = new THREE.Matrix4;
                        s.elements.set(e.operators[a[0]].operator);
                        for (var l = 1; l < a.length; l++) r.elements.set(e.operators[a[l]].operator), s.multiply(r);
                        n[n.length] = s
                    }
                    return n
                }, n.create = function(e, r, i, o) {
                    var a = new n,
                        s = e.assemblyInfo.assemblies.filter(function(e) {
                            return e.name === r
                        })[0],
                        l = e.residues.asymId,
                        c = e.residues.count,
                        u = new Int8Array(c);
                    a.assembly = s;
                    var d = new Set;
                    s.asymIds.forEach(function(e) {
                        return d.add(e)
                    });
                    for (var p = 0; c > p; p++) u[p] = d.has(l[p]);
                    a.moleculeModel = t.MoleculeModel.create(e, u, i, o);
                    for (var h = [], m = [], p = 0; p < s.operators.length; p++) m[p] = "";
                    n.createOperators(s.operators, h, s.operators.length - 1, m), a.matrices = n.buildMatrices(e.assemblyInfo, h);
                    for (var p = 0, f = new THREE.Vector3, g = [], y = 0, v = 0, b = new THREE.Vector3, w = new THREE.Vector3, x = 0, S = a.matrices; x < S.length; x++) {
                        var E = S[x];
                        f.add(b.copy(a.moleculeModel.centroid).applyMatrix4(E)), v++, g[g.length] = b
                    }
                    f.multiplyScalar(1 / v);
                    for (var I = 0, C = g; I < C.length; I++) {
                        var T = C[I];
                        y = Math.max(y, w.subVectors(f, T).length())
                    }
                    a.centroid = f, a.radius = y + a.moleculeModel.radius, a.molecule = e, a.applyTheme(i), a.disposeList.push(a.moleculeModel);
                    var M = a.createObjects();
                    return a.object = M.main, a.pickObject = M.pick, a
                }, n
            }(e.Model);
            t.AssemblyMoleculeModel = n
        }(t = e.Molecule || (e.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(n) {
            "use strict";
            ! function(e) {
                e[e.Cartoons = 0] = "Cartoons", e[e.BallsAndSticks = 1] = "BallsAndSticks", e[e.None = 2] = "None"
            }(n.MoleculeModelPolymerDisplayMode || (n.MoleculeModelPolymerDisplayMode = {}));
            var r = n.MoleculeModelPolymerDisplayMode,
                i = function() {
                    function e(e, t, n, r, i) {
                        this.polymerDisplayType = e, this.showNonPolymer = t, this.showWater = n, this.cartoonParams = r, this.ballsAndSticksParams = i
                    }
                    return e
                }();
            n.MoleculeModelParameters = i;
            var o = function(i) {
                function o() {
                    i.apply(this, arguments)
                }
                return __extends(o, i), o.prototype.applySelection = function(e, t) {
                    var n = !1;
                    return this.polymer && (n = this.polymer.applySelection(e, t)), this.nonPolymer && (n = this.nonPolymer.applySelection(e, t) || n), this.water && (n = this.water.applySelection(e, t) || n), n
                }, o.prototype.addedToSceneInternal = function() {
                    this.polymer && this.polymer.addedToScene(this.sceneId), this.nonPolymer && this.nonPolymer.addedToScene(this.sceneId), this.water && this.water.addedToScene(this.sceneId)
                }, o.prototype.getPickObjectId = function(e) {
                    return e >> 22 & 3
                }, o.prototype.getPickElement = function(e) {
                    switch (this.getPickObjectId(e)) {
                        case 0:
                            return this.polymer.getPickElement(e);
                        case 1:
                            return this.nonPolymer.getPickElement(4194303 & e);
                        case 2:
                            return this.water.getPickElement(4194303 & e);
                        default:
                            return void 0
                    }
                }, o.prototype.highlightElement = function(e, t) {
                    switch (this.getPickObjectId(e)) {
                        case 0:
                            return this.polymer.highlightElement(e, t);
                        case 1:
                            return this.nonPolymer.highlightElement(4194303 & e, t);
                        case 2:
                            return this.water.highlightElement(4194303 & e, t);
                        default:
                            return void 0
                    }
                }, o.prototype.applyTheme = function(e) {
                    i.prototype.applyTheme.call(this, e), this.polymer && this.polymer.applyTheme(e), this.nonPolymer && this.nonPolymer.applyTheme(e), this.water && this.water.applyTheme(e)
                }, o.prototype.createObjects = function() {
                    var e = new THREE.Object3D,
                        t = new THREE.Object3D;
                    if (this.polymer) {
                        var n = this.polymer.createObjects();
                        e.add(n.main), n.pick && t.add(n.pick)
                    }
                    if (this.nonPolymer) {
                        var n = this.nonPolymer.createObjects();
                        e.add(n.main), n.pick && t.add(n.pick)
                    }
                    if (this.water) {
                        var n = this.water.createObjects();
                        e.add(n.main), n.pick && t.add(n.pick)
                    }
                    return {
                        main: 0 === e.children.length ? null : 1 === e.children.length ? e.children[0] : e,
                        pick: 0 === t.children.length ? null : 1 === t.children.length ? t.children[0] : t
                    }
                }, o.checkEmpty = function(e) {
                    return e ? isNaN(e.centroid.x) ? (e.dispose(), !0) : !1 : !0
                }, o.create = function(i, a, s, l) {
                    var c = new o,
                        u = i.residues,
                        d = (u.count, u.entityIndex),
                        p = u.atomStartIndex,
                        h = u.atomEndIndex,
                        m = i.entities,
                        f = new Set;
                    if (m)
                        for (var g = 0; g < m.count; g++) m.entityType[g] === e.Structure.EntityType.Water && f.add(g);
                    if (l.polymerDisplayType === r.Cartoons) c.polymer = n.Cartoons.CartoonsModel.create(i, a, s, l.cartoonParams);
                    else if (l.polymerDisplayType === r.BallsAndSticks) {
                        for (var y = e.Utils.ChunkedArrayBuilder.forIndices(i.atoms.count), v = 0, b = i.secondaryStructure; v < b.length; v++) {
                            var w = b[v];
                            if (w.type !== e.Structure.SecondaryStructureType.None)
                                for (var x = w.startResidueIndex; x < w.endResidueIndex; x++)
                                    if (!(f.has(d[x]) || a && !a[x]))
                                        for (var g = p[x], S = h[x]; S > g; g++) y.add(g)
                        }
                        c.polymer = n.BallsAndSticks.BallsAndSticksModel.create(i, y.compact(), s, l.ballsAndSticksParams)
                    }
                    if (o.checkEmpty(c.polymer) && (c.polymer = void 0), l.showNonPolymer) {
                        for (var E = e.Utils.ChunkedArrayBuilder.forIndices(i.atoms.count / 4 | 0), I = 0, C = i.secondaryStructure; I < C.length; I++) {
                            var w = C[I];
                            if (w.type === e.Structure.SecondaryStructureType.None)
                                for (var x = w.startResidueIndex; x < w.endResidueIndex; x++)
                                    if (!(f.has(d[x]) || a && !a[x]))
                                        for (var g = p[x], S = h[x]; S > g; g++) E.add(g)
                        }
                        E.elementCount > 0 && (c.nonPolymer = n.BallsAndSticks.BallsAndSticksModel.create(i, E.compact(), s, l.ballsAndSticksParams, new t.PickFlagInfo(1, 2)))
                    }
                    if (o.checkEmpty(c.nonPolymer) && (c.nonPolymer = void 0), l.showWater) {
                        for (var T = e.Utils.ChunkedArrayBuilder.forIndices(i.atoms.count / 4 | 0), M = 0, _ = i.secondaryStructure; M < _.length; M++) {
                            var w = _[M];
                            if (w.type === e.Structure.SecondaryStructureType.None)
                                for (var x = w.startResidueIndex; x < w.endResidueIndex; x++)
                                    if (f.has(d[x]) && (!a || a[x]))
                                        for (var g = p[x], S = h[x]; S > g; g++) T.add(g)
                        }
                        T.elementCount > 0 && (c.water = n.BallsAndSticks.BallsAndSticksModel.create(i, T.compact(), s, l.ballsAndSticksParams, new t.PickFlagInfo(2, 2)))
                    }
                    o.checkEmpty(c.water) && (c.water = void 0);
                    var A = c.createObjects();
                    return c.object = A.main, c.pickObject = A.pick, c.polymer ? (c.centroid = c.polymer.centroid, c.radius = c.polymer.radius) : c.nonPolymer ? (c.centroid = c.nonPolymer.centroid, c.radius = c.nonPolymer.radius) : c.water && (c.centroid = c.water.centroid, c.radius = c.water.radius), c.molecule = i, c.theme = s, c.disposeList.push(c.polymer, c.nonPolymer, c.water), c
                }, o
            }(t.Model);
            n.MoleculeModel = o
        }(n = t.Molecule || (t.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(t) {
            "use strict";
            var n = function() {
                function e(e, t, n, r) {
                    void 0 === t && (t = 5), void 0 === n && (n = [-3, -3, -3]), void 0 === r && (r = [3, 3, 3]), this.moleculeParams = e, this.radius = t, this.start = n, this.end = r
                }
                return e
            }();
            t.SymmetryMoleculeModelParameters = n;
            var r = function(e) {
                function n() {
                    e.apply(this, arguments), this.operators = []
                }
                return __extends(n, e), n.prototype.applySelection = function(e, t) {
                    return this.moleculeModel.applySelection(e, t)
                }, n.prototype.addedToSceneInternal = function() {
                    this.moleculeModel.addedToScene(this.sceneId)
                }, n.prototype.getPickElement = function(e) {
                    return this.moleculeModel.getPickElement(e)
                }, n.prototype.highlightElement = function(e, t) {
                    return this.moleculeModel.highlightElement(e, t)
                }, n.prototype.clearHighlight = function() {
                    return !1
                }, n.prototype.applyTheme = function(t) {
                    e.prototype.applyTheme.call(this, t), this.moleculeModel.applyTheme(t)
                }, n.prototype.createObjects = function() {
                    for (var e = new THREE.Object3D, t = new THREE.Object3D, n = 0, r = this.operators; n < r.length; n++) {
                        var i = r[n],
                            o = this.moleculeModel.createObjects();
                        o.main && (o.main.matrixAutoUpdate = !1, o.main.matrix.copy(i), e.add(o.main)), o.pick && (o.pick.matrixAutoUpdate = !1, o.pick.matrix.copy(i), t.add(o.pick))
                    }
                    return {
                        main: e,
                        pick: t
                    }
                }, n.create = function(e, r, i) {
                    var o = t.MoleculeModel.create(e, null, r, i.moleculeParams),
                        a = new n;
                    a.moleculeModel = o, a.spacegroup = new t.Spacegroup(e.symmetryInfo), a.params = i;
                    var s = 0,
                        l = 0,
                        c = 0,
                        u = 0,
                        d = a.spacegroup,
                        p = new THREE.Vector3,
                        h = [],
                        m = 0,
                        f = 0,
                        g = new THREE.Matrix4,
                        y = new THREE.Vector3,
                        v = new THREE.Vector3;
                    for (s = i.start[0]; s <= i.end[0]; s++)
                        for (l = i.start[1]; l <= i.end[1]; l++)
                            for (c = i.start[2]; c <= i.end[2]; c++)
                                for (u = 0; u < d.operatorCount; u++) {
                                    d.getOperatorMatrix(u, s, l, c, g);
                                    var b = y.copy(o.centroid).applyMatrix4(g);
                                    b.distanceTo(o.centroid) - 2 * o.radius > i.radius || (a.operators.push((new THREE.Matrix4).copy(g)), p.add(b), f++, h[h.length] = (new THREE.Vector3).copy(b))
                                }
                    p.multiplyScalar(1 / f);
                    for (var w = 0, x = h; w < x.length; w++) {
                        var S = x[w];
                        m = Math.max(m, v.subVectors(p, S).length())
                    }
                    a.centroid = p, a.radius = m + o.radius, a.molecule = e, a.applyTheme(r), a.disposeList.push(a.moleculeModel);
                    var E = a.createObjects();
                    return a.object = E.main, a.pickObject = E.pick, a
                }, n
            }(e.Model);
            t.SymmetryMoleculeModel = r
        }(t = e.Molecule || (e.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(t) {
            function n() {
                return e.Utils.Palette.getRandomColor()
            }

            function r(e) {
                var n = t.DefaultElementColors[e];
                return n ? n : (n = t.UpperCaseElementColors[e], n ? n : t.DefaultElementColor)
            }
            t.getRandomColor = n, t.getDefaultElementColor = r;
            var i = function() {
                function e() {
                    this.highlightColor = {
                        r: 1,
                        g: 1,
                        b: 0
                    }, this.selectionColor = {
                        r: 1,
                        g: 0,
                        b: 0
                    }
                }
                return e.prototype.setBondColor = function(e, t) {
                    t.r = .8, t.g = .8, t.b = .8
                }, e
            }();
            t.BasicThemeBase = i;
            var o = function(e) {
                function t() {
                    e.call(this), this.color = n()
                }
                return __extends(t, e), t.prototype.setAtomColor = function(e, t) {
                    t.r = this.color.r, t.g = this.color.g, t.b = this.color.b
                }, t.prototype.setResidueColor = function(e, t) {
                    t.r = this.color.r, t.g = this.color.g, t.b = this.color.b
                }, t
            }(i);
            t.RandomUniformColorTheme = o;
            var a = function(e) {
                function t(t) {
                    e.call(this), this.color = t
                }
                return __extends(t, e), t.prototype.setAtomColor = function(e, t) {
                    t.r = this.color.r, t.g = this.color.g, t.b = this.color.b
                }, t.prototype.setResidueColor = function(e, t) {
                    t.r = this.color.r, t.g = this.color.g, t.b = this.color.b
                }, t
            }(i);
            t.UniformColorTheme = a;
            var s = function(e) {
                function n(t) {
                    e.call(this), this.molecule = t, this.colorIndex = 0, this.colors = {}, this.names = t.residues.name, this.elementSymbols = t.atoms.elementSymbol
                }
                return __extends(n, e), n.prototype.setAtomColor = function(e, t) {
                    var n = r(this.elementSymbols[e]);
                    t.r = n.r, t.g = n.g, t.b = n.b
                }, n.prototype.setResidueColor = function(e, n) {
                    var r = this.names[e],
                        i = this.colors[r];
                    i || (this.colorIndex = (this.colorIndex + 1) % t.DefaultPallete.length | 0, i = t.DefaultPallete[this.colorIndex], this.colors[r] = i), n.r = i.r, n.g = i.g, n.b = i.b
                }, n
            }(i);
            t.DefaultPalleteResidueColorTheme = s;
            var l = function(e) {
                function n(t) {
                    e.call(this), this.molecule = t, this.colorIndex = 0, this.colors = {}, this.elementColors = {}, this.names = t.residues.asymId, this.elementSymbols = t.atoms.elementSymbol
                }
                return __extends(n, e), n.prototype.setAtomColor = function(e, t) {
                    var n = r(this.elementSymbols[e]);
                    t.r = n.r, t.g = n.g, t.b = n.b
                }, n.prototype.setResidueColor = function(e, n) {
                    var r = this.names[e],
                        i = this.colors[r];
                    i || (this.colorIndex = (this.colorIndex + 1) % t.DefaultPallete.length | 0, i = t.DefaultPallete[this.colorIndex], this.colors[r] = i), n.r = i.r, n.g = i.g, n.b = i.b
                }, n
            }(i);
            t.DefaultPalleteChainColorTheme = l, t.DefaultElementColor = {
                    r: .6,
                    g: .6,
                    b: .6
                }, t.DefaultElementColors = {
                    Ac: {
                        r: .439215686,
                        g: .670588235,
                        b: .980392157
                    },
                    Al: {
                        r: .749019608,
                        g: .650980392,
                        b: .650980392
                    },
                    Am: {
                        r: .329411765,
                        g: .360784314,
                        b: .949019608
                    },
                    Sb: {
                        r: .619607843,
                        g: .388235294,
                        b: .709803922
                    },
                    Ar: {
                        r: .501960784,
                        g: .819607843,
                        b: .890196078
                    },
                    As: {
                        r: .741176471,
                        g: .501960784,
                        b: .890196078
                    },
                    At: {
                        r: .458823529,
                        g: .309803922,
                        b: .270588235
                    },
                    Ba: {
                        r: 0,
                        g: .788235294,
                        b: 0
                    },
                    Bk: {
                        r: .541176471,
                        g: .309803922,
                        b: .890196078
                    },
                    Be: {
                        r: .760784314,
                        g: 1,
                        b: 0
                    },
                    Bi: {
                        r: .619607843,
                        g: .309803922,
                        b: .709803922
                    },
                    Bh: {
                        r: .878431373,
                        g: 0,
                        b: .219607843
                    },
                    B: {
                        r: 1,
                        g: .709803922,
                        b: .709803922
                    },
                    Br: {
                        r: .650980392,
                        g: .160784314,
                        b: .160784314
                    },
                    Cd: {
                        r: 1,
                        g: .850980392,
                        b: .560784314
                    },
                    Ca: {
                        r: .239215686,
                        g: 1,
                        b: 0
                    },
                    Cf: {
                        r: .631372549,
                        g: .211764706,
                        b: .831372549
                    },
                    C: {
                        r: .45,
                        g: .45,
                        b: .45
                    },
                    Ce: {
                        r: 1,
                        g: 1,
                        b: .780392157
                    },
                    Cs: {
                        r: .341176471,
                        g: .090196078,
                        b: .560784314
                    },
                    Cl: {
                        r: .121568627,
                        g: .941176471,
                        b: .121568627
                    },
                    Cr: {
                        r: .541176471,
                        g: .6,
                        b: .780392157
                    },
                    Co: {
                        r: .941176471,
                        g: .564705882,
                        b: .62745098
                    },
                    Cu: {
                        r: .784313725,
                        g: .501960784,
                        b: .2
                    },
                    Cm: {
                        r: .470588235,
                        g: .360784314,
                        b: .890196078
                    },
                    D: {
                        r: .9,
                        g: .9,
                        b: .9
                    },
                    Db: {
                        r: .819607843,
                        g: 0,
                        b: .309803922
                    },
                    Dy: {
                        r: .121568627,
                        g: 1,
                        b: .780392157
                    },
                    Es: {
                        r: .701960784,
                        g: .121568627,
                        b: .831372549
                    },
                    Er: {
                        r: 0,
                        g: .901960784,
                        b: .458823529
                    },
                    Eu: {
                        r: .380392157,
                        g: 1,
                        b: .780392157
                    },
                    Fm: {
                        r: .701960784,
                        g: .121568627,
                        b: .729411765
                    },
                    F: {
                        r: .701960784,
                        g: 1,
                        b: 1
                    },
                    Fr: {
                        r: .258823529,
                        g: 0,
                        b: .4
                    },
                    Gd: {
                        r: .270588235,
                        g: 1,
                        b: .780392157
                    },
                    Ga: {
                        r: .760784314,
                        g: .560784314,
                        b: .560784314
                    },
                    Ge: {
                        r: .4,
                        g: .560784314,
                        b: .560784314
                    },
                    Au: {
                        r: 1,
                        g: .819607843,
                        b: .137254902
                    },
                    Hf: {
                        r: .301960784,
                        g: .760784314,
                        b: 1
                    },
                    Hs: {
                        r: .901960784,
                        g: 0,
                        b: .180392157
                    },
                    He: {
                        r: .850980392,
                        g: 1,
                        b: 1
                    },
                    Ho: {
                        r: 0,
                        g: 1,
                        b: .611764706
                    },
                    H: {
                        r: .9,
                        g: .9,
                        b: .9
                    },
                    In: {
                        r: .650980392,
                        g: .458823529,
                        b: .450980392
                    },
                    I: {
                        r: .580392157,
                        g: 0,
                        b: .580392157
                    },
                    Ir: {
                        r: .090196078,
                        g: .329411765,
                        b: .529411765
                    },
                    Fe: {
                        r: .698,
                        g: .13,
                        b: .13
                    },
                    Kr: {
                        r: .360784314,
                        g: .721568627,
                        b: .819607843
                    },
                    La: {
                        r: .439215686,
                        g: .831372549,
                        b: 1
                    },
                    Lr: {
                        r: .780392157,
                        g: 0,
                        b: .4
                    },
                    Pb: {
                        r: .341176471,
                        g: .349019608,
                        b: .380392157
                    },
                    Li: {
                        r: .8,
                        g: .501960784,
                        b: 1
                    },
                    Lu: {
                        r: 0,
                        g: .670588235,
                        b: .141176471
                    },
                    Mg: {
                        r: .541176471,
                        g: 1,
                        b: 0
                    },
                    Mn: {
                        r: .611764706,
                        g: .478431373,
                        b: .780392157
                    },
                    Mt: {
                        r: .921568627,
                        g: 0,
                        b: .149019608
                    },
                    Md: {
                        r: .701960784,
                        g: .050980392,
                        b: .650980392
                    },
                    Hg: {
                        r: .721568627,
                        g: .721568627,
                        b: .815686275
                    },
                    Mo: {
                        r: .329411765,
                        g: .709803922,
                        b: .709803922
                    },
                    Nd: {
                        r: .780392157,
                        g: 1,
                        b: .780392157
                    },
                    Ne: {
                        r: .701960784,
                        g: .890196078,
                        b: .960784314
                    },
                    Np: {
                        r: 0,
                        g: .501960784,
                        b: 1
                    },
                    Ni: {
                        r: .31372549,
                        g: .815686275,
                        b: .31372549
                    },
                    Nb: {
                        r: .450980392,
                        g: .760784314,
                        b: .788235294
                    },
                    N: {
                        r: 0,
                        g: .5,
                        b: 1
                    },
                    No: {
                        r: .741176471,
                        g: .050980392,
                        b: .529411765
                    },
                    Os: {
                        r: .149019608,
                        g: .4,
                        b: .588235294
                    },
                    O: {
                        r: 1,
                        g: .3,
                        b: .3
                    },
                    Pd: {
                        r: 0,
                        g: .411764706,
                        b: .521568627
                    },
                    P: {
                        r: 1,
                        g: .501960784,
                        b: 0
                    },
                    Pt: {
                        r: .815686275,
                        g: .815686275,
                        b: .878431373
                    },
                    Pu: {
                        r: 0,
                        g: .419607843,
                        b: 1
                    },
                    Po: {
                        r: .670588235,
                        g: .360784314,
                        b: 0
                    },
                    K: {
                        r: .560784314,
                        g: .250980392,
                        b: .831372549
                    },
                    Pr: {
                        r: .850980392,
                        g: 1,
                        b: .780392157
                    },
                    Pm: {
                        r: .639215686,
                        g: 1,
                        b: .780392157
                    },
                    Pa: {
                        r: 0,
                        g: .631372549,
                        b: 1
                    },
                    Ra: {
                        r: 0,
                        g: .490196078,
                        b: 0
                    },
                    Rn: {
                        r: .258823529,
                        g: .509803922,
                        b: .588235294
                    },
                    Re: {
                        r: .149019608,
                        g: .490196078,
                        b: .670588235
                    },
                    Rh: {
                        r: .039215686,
                        g: .490196078,
                        b: .549019608
                    },
                    Rb: {
                        r: .439215686,
                        g: .180392157,
                        b: .690196078
                    },
                    Ru: {
                        r: .141176471,
                        g: .560784314,
                        b: .560784314
                    },
                    Rf: {
                        r: .8,
                        g: 0,
                        b: .349019608
                    },
                    Sm: {
                        r: .560784314,
                        g: 1,
                        b: .780392157
                    },
                    Sc: {
                        r: .901960784,
                        g: .901960784,
                        b: .901960784
                    },
                    Sg: {
                        r: .850980392,
                        g: 0,
                        b: .270588235
                    },
                    Se: {
                        r: 1,
                        g: .631372549,
                        b: 0
                    },
                    Si: {
                        r: .941176471,
                        g: .784313725,
                        b: .62745098
                    },
                    Ag: {
                        r: .752941176,
                        g: .752941176,
                        b: .752941176
                    },
                    Na: {
                        r: .670588235,
                        g: .360784314,
                        b: .949019608
                    },
                    Sr: {
                        r: 0,
                        g: 1,
                        b: 0
                    },
                    S: {
                        r: .9,
                        g: .775,
                        b: .25
                    },
                    Ta: {
                        r: .301960784,
                        g: .650980392,
                        b: 1
                    },
                    Tc: {
                        r: .231372549,
                        g: .619607843,
                        b: .619607843
                    },
                    Te: {
                        r: .831372549,
                        g: .478431373,
                        b: 0
                    },
                    Tb: {
                        r: .188235294,
                        g: 1,
                        b: .780392157
                    },
                    Tl: {
                        r: .650980392,
                        g: .329411765,
                        b: .301960784
                    },
                    Th: {
                        r: 0,
                        g: .729411765,
                        b: 1
                    },
                    Tm: {
                        r: 0,
                        g: .831372549,
                        b: .321568627
                    },
                    Sn: {
                        r: .4,
                        g: .501960784,
                        b: .501960784
                    },
                    Ti: {
                        r: .749019608,
                        g: .760784314,
                        b: .780392157
                    },
                    W: {
                        r: .129411765,
                        g: .580392157,
                        b: .839215686
                    },
                    U: {
                        r: 0,
                        g: .560784314,
                        b: 1
                    },
                    V: {
                        r: .650980392,
                        g: .650980392,
                        b: .670588235
                    },
                    Xe: {
                        r: .258823529,
                        g: .619607843,
                        b: .690196078
                    },
                    Yb: {
                        r: 0,
                        g: .749019608,
                        b: .219607843
                    },
                    Y: {
                        r: .580392157,
                        g: 1,
                        b: 1
                    },
                    Zn: {
                        r: .490196078,
                        g: .501960784,
                        b: .690196078
                    },
                    Zr: {
                        r: .580392157,
                        g: .878431373,
                        b: .878431373
                    }
                }, t.UpperCaseElementColors = {}, t.DefaultPallete = [],
                function() {
                    for (var e = 0, n = 0, r = Object.keys(t.DefaultElementColors); n < r.length; n++) {
                        var i = r[n];
                        t.UpperCaseElementColors[i.toUpperCase()] = t.DefaultElementColors[i], t.DefaultPallete[e++] = t.DefaultElementColors[i]
                    }
                }()
        }(n = t.Themes || (t.Themes = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(n) {
            var r;
            ! function(n) {
                "use strict";
                var r = function() {
                        function t() {}
                        return t.analyze = function(t, n) {
                            var r, i = 0;
                            if (n) r = n;
                            else {
                                i = t.atoms.count, r = new Int32Array(i);
                                for (var o = 0; i > o; o++) r[o] = o
                            }
                            i = r.length;
                            for (var a = t.atoms, s = a.x, l = a.y, c = a.z, u = a.elementSymbol, d = a.name, p = a.altLoc, h = a.residueIndex, m = t.residues.name, f = 2, g = new e.Geometry.SubdivisionTree3D(r, function(e, t) {
                                    t.add(s[e], l[e], c[e])
                                }), y = t.componentBonds, v = g.createContextRadius(f + 1, !1), b = v.buffer, w = new Set, x = new e.Utils.ChunkedArrayBuilder(function(e) {
                                    return new Int32Array(e)
                                }, 1.33 * r.length | 0, 3), S = new THREE.Vector3, E = new THREE.Vector3, I = 1, C = 0, T = 0, M = 0; i > T;) {
                                var _ = h[r[T]];
                                for (M = T; i > M && h[r[M]] == _;) M++;
                                var A;
                                if (y && (A = y.entries.get(m[h[r[T]]]))) {
                                    for (var P = T; M - 1 > P; P++) {
                                        var k = r[P],
                                            R = d[k],
                                            V = p[k],
                                            D = A.map.get(R);
                                        if (D) {
                                            for (var L = P + 1; M > L; L++) {
                                                var F = r[L],
                                                    H = p[F];
                                                if (V === H) {
                                                    var B = D.get(d[F]);
                                                    B && (x.add3(k, F, B), C += B)
                                                }
                                            }
                                            w.add(k)
                                        }
                                    }
                                    w.add(r[M - 1])
                                }
                                for (var P = T; M > P; P++) {
                                    var O = r[P];
                                    b.reset(), v.nearest(s[O], l[O], c[O], f), S.set(s[O], l[O], c[O]);
                                    for (var z = "H" === u[O], V = p[O], q = b.count, o = 0; q > o; o++) {
                                        var N = r[b.indices[o]];
                                        if (N !== O && !w.has(N)) {
                                            var G = E.set(s[N], l[N], c[N]).sub(S).length(),
                                                j = "H" === u[N];
                                            if (z && j) continue;
                                            if (z || j) {
                                                1.1 > G && (x.add3(O, N, 1), C++);
                                                continue
                                            }
                                            G && V === p[N] && (x.add3(O, N, 1), C++)
                                        }
                                    }
                                    w.add(O)
                                }
                                I++, T = M
                            }
                            return {
                                bonds: x.compact(),
                                atomIndices: r,
                                stickCount: C,
                                residueCount: I
                            }
                        }, t
                    }(),
                    i = function() {
                        function e(e, t, n, r, i, o, a, s) {
                            this.template = e, this.templateVB = t, this.templateNB = n, this.templateIB = r, this.templateVertexCount = i, this.vertices = o, this.normals = a, this.indices = s, this.atomsVector = new THREE.Vector3, this.center = new THREE.Vector3, this.rotationAxis = new THREE.Vector3, this.upVector = new THREE.Vector3(0, 1, 0), this.scaleMatrix = new THREE.Matrix4, this.rotationMatrix = new THREE.Matrix4, this.translationMatrix = new THREE.Matrix4, this.offsetMatrix = new THREE.Matrix4, this.finalMatrix = new THREE.Matrix4, this.sticksDone = 0, this.radius = .15, this.offset = new THREE.Vector3, this.a = new THREE.Vector3, this.b = new THREE.Vector3
                        }
                        return e
                    }(),
                    o = function(o) {
                        function a(a, s, l, c) {
                            void 0 === c && (c = t.PickFlagInfo.Empty), o.call(this);
                            for (var u = e.Utils.extend({}, s, new n.BallsAndSticksModelParameters), d = u.tessalation, p = u.atomRadius, h = u.bondRadius, m = u.hydrogenAtomRadius, f = u.hydrogenBondRadius, g = r.analyze(a, l), y = this.getBondTemplate(1, d), v = this.getAtomTemplate(1, d), b = y.attributes.position.array, w = b.length, x = w / 3 | 0, S = y.attributes.index.array, E = S.length, I = y.attributes.normal.array, C = v.attributes.position.array, T = C.length, M = T / 3 | 0, _ = v.attributes.index.array, A = _.length, P = v.attributes.normal.array, k = T * g.atomIndices.length, R = new Float32Array(k), V = new Float32Array(k), D = new Uint32Array(A * g.atomIndices.length), L = new Float32Array(k), F = new Float32Array(4 * M * g.atomIndices.length), H = w * g.stickCount, B = new Float32Array(H), O = new Float32Array(H), z = new Float32Array(H), q = new Uint32Array(E * g.stickCount), N = a.atoms, G = N.x, j = N.y, U = N.z, W = N.elementSymbol, X = N.residueIndex, $ = 0, Y = 0, Z = (new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3(0, 1, 0), new THREE.Matrix4), Q = (new THREE.Matrix4, new THREE.Matrix4), J = (new THREE.Vector3, new THREE.Vector3, {
                                    r: .1,
                                    g: .1,
                                    b: .1
                                }), K = new t.MoleculeVertexMapBuilder(t.MoleculeVertexMapType.Atom, g.atomIndices.length), ee = new t.MoleculeVertexMapBuilder(t.MoleculeVertexMapType.Atom, g.residueCount), te = 0, ne = g.atomIndices; te < ne.length; te++) {
                                var re = ne[te];
                                K.startElement(re);
                                var ie = "H" !== W[re] ? p : m;
                                Z.makeScale(ie, ie, ie), Q.makeTranslation(G[re], j[re], U[re]).multiply(Z), v.applyMatrix(Q);
                                for (var oe = 0; T > oe; oe++) Y = $ * T + oe, R[Y] = C[oe], V[Y] = P[oe];
                                for (var oe = 0; A > oe; oe++) Y = A * $ + oe, D[Y] = _[oe] + M * $;
                                for (t.GeometryHelper.setPickBase(c.value, c.width, re, J), oe = 0; M > oe; oe++) Y = $ * M * 4 + 4 * oe, F[Y] = J.r, F[Y + 1] = J.g, F[Y + 2] = J.b;
                                Z.getInverse(Q), v.applyMatrix(Z), K.addVertexRange($ * M, ($ + 1) * M), K.endElement(), $++
                            }
                            var ae = X[g.bonds[0]],
                                se = 0,
                                le = 0,
                                ce = new i(y, b, I, S, x, B, O, q),
                                ue = g.bonds.length / 3 | 0;
                            ee.startElement(ae);
                            for (var de = 0; ue > de; de++) {
                                var pe = g.bonds[3 * de],
                                    he = g.bonds[3 * de + 1],
                                    me = g.bonds[3 * de + 2];
                                ae !== X[pe] && (ee.addVertexRange(se, le), se = le, ee.endElement(), ae = X[pe], ee.startElement(ae)), ce.a.set(G[pe], j[pe], U[pe]), ce.b.set(G[he], j[he], U[he]);
                                var ie = "H" === W[pe] || "H" === W[he] ? f : h,
                                    fe = 2 * ie / 3,
                                    ge = ie / 2;
                                switch (me) {
                                    case 2:
                                        ce.radius = ge, ce.offset.x = fe, ce.offset.y = fe, this.addBond(ce), ce.offset.x = -fe, ce.offset.y = -fe, this.addBond(ce);
                                        break;
                                    case 3:
                                        ce.radius = ge, ce.offset.x = 0, ce.offset.y = fe, this.addBond(ce), ce.offset.x = -Math.cos(Math.PI / 3) * fe, ce.offset.y = -Math.sin(Math.PI / 3) * fe, this.addBond(ce), ce.offset.x = -ce.offset.x, this.addBond(ce);
                                        break;
                                    case 4:
                                        ce.radius = ge / 2, ce.offset.x = fe, ce.offset.y = fe, this.addBond(ce), ce.offset.x = -fe, ce.offset.y = -fe, this.addBond(ce), ce.offset.x = -fe, ce.offset.y = fe, this.addBond(ce), ce.offset.x = fe, ce.offset.y = -fe, this.addBond(ce);
                                        break;
                                    default:
                                        ce.radius = ie, ce.offset.x = 0, ce.offset.y = 0, this.addBond(ce)
                                }
                                le += me * w
                            }
                            ee.addVertexRange(se, le), ee.endElement();
                            var ye = new THREE.BufferGeometry;
                            ye.addAttribute("position", new THREE.BufferAttribute(R, 3)), ye.addAttribute("normal", new THREE.BufferAttribute(V, 3)), ye.addAttribute("index", new THREE.BufferAttribute(D, 1)), ye.addAttribute("color", new THREE.BufferAttribute(L, 3));
                            var ve = new Float32Array(R.length);
                            this.vertexStateBuffer = new THREE.BufferAttribute(ve, 1), ye.addAttribute("vState", this.vertexStateBuffer);
                            var be = new THREE.BufferGeometry;
                            be.addAttribute("position", new THREE.BufferAttribute(R, 3)), be.addAttribute("index", new THREE.BufferAttribute(D, 1)), be.addAttribute("pColor", new THREE.BufferAttribute(F, 4));
                            var we = new THREE.BufferGeometry;
                            we.addAttribute("position", new THREE.BufferAttribute(B, 3)), we.addAttribute("normal", new THREE.BufferAttribute(O, 3)), we.addAttribute("index", new THREE.BufferAttribute(q, 1)), we.addAttribute("color", new THREE.BufferAttribute(z, 3)), this.atomsGeometry = ye, this.pickGeometry = be, this.bondsGeometry = we, this.atomVertexMap = K.getMap(), this.bondVertexMap = ee.getMap()
                        }
                        return __extends(a, o), a.prototype.dispose = function() {
                            this.atomsGeometry.dispose(), this.bondsGeometry.dispose(), this.pickGeometry.dispose()
                        }, a.prototype.addBond = function(e) {
                            e.atomsVector.subVectors(e.a, e.b);
                            var t = e.atomsVector.length();
                            e.center.addVectors(e.a, e.b).divideScalar(2), e.rotationAxis.crossVectors(e.atomsVector, e.upVector).normalize();
                            var n = e.atomsVector.angleTo(e.upVector);
                            e.scaleMatrix.makeScale(e.radius, t, e.radius), e.offsetMatrix.makeTranslation(e.offset.x, e.offset.y, e.offset.z), e.rotationMatrix.makeRotationAxis(e.rotationAxis, -n), e.translationMatrix.makeTranslation(e.center.x, e.center.y, e.center.z),
                                e.finalMatrix = e.translationMatrix.multiply(e.rotationMatrix).multiply(e.offsetMatrix).multiply(e.scaleMatrix), e.template.applyMatrix(e.finalMatrix), e.vertices.set(e.templateVB, e.templateVB.length * e.sticksDone), e.normals.set(e.templateNB, e.templateVB.length * e.sticksDone);
                            for (var r = e.templateIB, i = e.indices, o = e.templateIB.length * e.sticksDone, a = e.templateVertexCount * e.sticksDone, s = 0; s < r.length; s++) i[o++] = r[s] + a;
                            e.rotationMatrix.getInverse(e.finalMatrix), e.template.applyMatrix(e.rotationMatrix), e.sticksDone++
                        }, a.prototype.getBondTemplate = function(e, n) {
                            var r;
                            switch (n) {
                                case 0:
                                    r = 2;
                                    break;
                                case 1:
                                    r = 4;
                                    break;
                                case 2:
                                    r = 6;
                                    break;
                                case 3:
                                    r = 8;
                                    break;
                                case 4:
                                    r = 10;
                                    break;
                                case 5:
                                    r = 12;
                                    break;
                                default:
                                    r = 14
                            }
                            var i = t.GeometryHelper.getIndexedBufferGeometry(new THREE.LatheGeometry([new THREE.Vector3(0, e, -0.5), new THREE.Vector3(0, e, .5)], r, Math.PI));
                            return i.applyMatrix((new THREE.Matrix4).makeRotationAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2)), i
                        }, a.prototype.getAtomTemplate = function(e, n) {
                            var r;
                            switch (n) {
                                case 0:
                                    r = new THREE.OctahedronGeometry(e, 0);
                                    break;
                                case 1:
                                    r = new THREE.OctahedronGeometry(e, 1);
                                    break;
                                case 2:
                                    r = new THREE.IcosahedronGeometry(e, 0);
                                    break;
                                case 3:
                                    r = new THREE.IcosahedronGeometry(e, 1);
                                    break;
                                case 4:
                                    r = new THREE.IcosahedronGeometry(e, 1);
                                    break;
                                case 5:
                                    r = new THREE.OctahedronGeometry(e, 2);
                                    break;
                                default:
                                    r = new THREE.IcosahedronGeometry(e, 2)
                            }
                            return r.computeVertexNormals(), t.GeometryHelper.getIndexedBufferGeometry(r)
                        }, a
                    }(t.GeometryBase);
                n.BallsAndSticksGeometry = o
            }(r = n.BallsAndSticks || (n.BallsAndSticks = {}))
        }(n = t.Molecule || (t.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(t) {
            var n;
            ! function(t) {
                "use strict";
                var n = function() {
                    function e(e, t, n, r, i) {
                        void 0 === e && (e = 3), void 0 === t && (t = .4), void 0 === n && (n = .15), void 0 === r && (r = .4), void 0 === i && (i = .15), this.tessalation = e, this.atomRadius = t, this.bondRadius = n, this.hydrogenAtomRadius = r, this.hydrogenBondRadius = i
                    }
                    return e
                }();
                t.BallsAndSticksModelParameters = n;
                var r = function(n) {
                    function r() {
                        n.apply(this, arguments)
                    }
                    return __extends(r, n), r.prototype.applySelection = function(t, n) {
                        for (var r, i = this.ballsAndSticks.vertexStateBuffer, o = i.array, a = this.ballsAndSticks.atomVertexMap, s = a.vertexRanges, l = !1, c = e.MoleculeSelectionType.Select, u = e.MoleculeSelectionType.HighlightSelect, d = n === e.MoleculeSelectionType.Highlight, p = n === e.MoleculeSelectionType.None, h = 0, m = t.atoms; h < m.length; h++) {
                            var f = m[h];
                            if (a.elementMap.has(f)) {
                                var g = a.elementMap.get(f),
                                    y = a.elementRanges[2 * g],
                                    v = a.elementRanges[2 * g + 1];
                                if (y !== v) {
                                    var b = o[s[y]];
                                    r = b === c && d ? u : b === u && p ? c : n, b !== r && (l = !0);
                                    for (var w = y; v > w; w += 2)
                                        for (var x = s[w], S = s[w + 1], E = x; S > E; E++) o[E] = r
                                }
                            }
                        }
                        return l ? (i.needsUpdate = !0, !0) : !1
                    }, r.prototype.addedToSceneInternal = function() {
                        for (var e = this.ballsAndSticks.pickGeometry.attributes.pColor.array, t = Math.floor(e.length / 4), n = 0; t > n; n++) e[4 * n + 3] = this.sceneId / 255;
                        this.ballsAndSticks.pickGeometry.attributes.pColor.needsUpdate = !0
                    }, r.prototype.getPickElement = function(t) {
                        return {
                            object: this.molecule,
                            element: t,
                            tag: this.molecule.id,
                            elementType: e.MoleculeVertexMapType.Atom
                        }
                    }, r.prototype.highlightElement = function(t, n) {
                        return this.applySelection(new e.MoleculeSelectionIndices([t], null), n ? e.MoleculeSelectionType.Highlight : e.MoleculeSelectionType.None)
                    }, r.prototype.clearHighlight = function() {
                        return !1
                    }, r.prototype.applyTheme = function(t) {
                        var r = this;
                        n.prototype.applyTheme.call(this, t);
                        var i = this.ballsAndSticks.atomVertexMap;
                        e.MaterialsHelper.applyColorToMap(i, i.elementIndices, this.ballsAndSticks.atomsGeometry.attributes.color, function(e, t) {
                            return r.theme.setAtomColor(e, t)
                        }), i = this.ballsAndSticks.bondVertexMap, e.MaterialsHelper.applyColorToMap(i, i.elementIndices, this.ballsAndSticks.bondsGeometry.attributes.color, function(e, t) {
                            return r.theme.setBondColor(e, t)
                        }), this.material.uniforms.selectionColor.value = new THREE.Vector3(t.selectionColor.r, t.selectionColor.g, t.selectionColor.b), this.material.uniforms.highlightColor.value = new THREE.Vector3(t.highlightColor.r, t.highlightColor.g, t.highlightColor.b), this.material.needsUpdate = !0
                    }, r.prototype.createObjects = function() {
                        var e = new THREE.Object3D;
                        return e.add(new THREE.Mesh(this.ballsAndSticks.atomsGeometry, this.material)), e.add(new THREE.Mesh(this.ballsAndSticks.bondsGeometry, this.bondsMaterial)), {
                            main: e,
                            pick: new THREE.Mesh(this.ballsAndSticks.pickGeometry, this.pickMaterial)
                        }
                    }, r.create = function(n, i, o, a, s) {
                        void 0 === s && (s = e.PickFlagInfo.Empty);
                        var l = new r;
                        l.ballsAndSticks = new t.BallsAndSticksGeometry(n, a, i, s), l.material = e.MaterialsHelper.getMeshMaterial(), l.bondsMaterial = new THREE.MeshPhongMaterial({
                            specular: 11184810,
                            shininess: 1,
                            shading: THREE.SmoothShading,
                            side: THREE.FrontSide,
                            vertexColors: THREE.VertexColors
                        }), l.pickMaterial = e.MaterialsHelper.getPickMaterial(), l.ballsAndSticks.atomsGeometry.computeBoundingSphere(), l.centroid = l.ballsAndSticks.atomsGeometry.boundingSphere.center, l.radius = l.ballsAndSticks.atomsGeometry.boundingSphere.radius, l.molecule = n, l.applyTheme(o), l.disposeList.push(l.ballsAndSticks, l.material, l.bondsMaterial, l.pickMaterial);
                        var c = l.createObjects();
                        return l.object = c.main, l.pickObject = c.pick, l
                    }, r
                }(e.Model);
                t.BallsAndSticksModel = r
            }(n = t.BallsAndSticks || (t.BallsAndSticks = {}))
        }(t = e.Molecule || (e.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(n) {
            var r;
            ! function(n) {
                var r = function() {
                        function t(t) {
                            this.typeBuilder = e.Utils.ArrayBuilder.forArray(1e4), this.residueType = [], this.uPositions = new Float32Array(0), this.vPositions = new Float32Array(0), this.pPositions = new Float32Array(0), this.dPositions = new Float32Array(0), this.uvLength = 0, this.residueCount = 0, this.typeBuilder = e.Utils.ArrayBuilder.forArray(t + 4), this.uPositionsBuilder = e.Utils.ArrayBuilder.forVertex3D(t + 4), this.vPositionsBuilder = e.Utils.ArrayBuilder.forVertex3D(t + 4), this.pPositionsBuilder = e.Utils.ArrayBuilder.forVertex3D(t + 4), this.dPositionsBuilder = e.Utils.ArrayBuilder.forVertex3D(t + 4), this.typeBuilder.add(e.Structure.SecondaryStructureType.None), this.typeBuilder.add(e.Structure.SecondaryStructureType.None), this.uPositionsBuilder.add3(0, 0, 0), this.uPositionsBuilder.add3(0, 0, 0), this.vPositionsBuilder.add3(0, 0, 0), this.vPositionsBuilder.add3(0, 0, 0)
                        }
                        return t.prototype.addResidue = function(t, n, r) {
                            var i = n.atomStartIndex[t],
                                o = n.atomEndIndex[t],
                                a = !1,
                                s = !1;
                            if (r !== e.Structure.SecondaryStructureType.Strand)
                                for (var l = i; o > l && (a || "CA" !== n.name[l] ? s || "O" !== n.name[l] || (this.vPositionsBuilder.add3(n.x[l], n.y[l], n.z[l]), s = !0) : (this.uPositionsBuilder.add3(n.x[l], n.y[l], n.z[l]), a = !0), !a || !s); l++);
                            else
                                for (var l = i; o > l && (a || "O5'" !== n.name[l] ? s || "C3'" !== n.name[l] || (this.vPositionsBuilder.add3(n.x[l], n.y[l], n.z[l]), s = !0) : (this.uPositionsBuilder.add3(n.x[l], n.y[l], n.z[l]), a = !0), !a || !s); l++);
                            if (!s) {
                                var c = this.pPositionsBuilder.array,
                                    u = c.length;
                                this.vPositionsBuilder.add3(c[u - 3], c[u - 2], c[u - 1])
                            }
                            this.typeBuilder.add(r)
                        }, t.prototype.finishResidues = function() {
                            this.typeBuilder.add(e.Structure.SecondaryStructureType.None), this.typeBuilder.add(e.Structure.SecondaryStructureType.None), this.uPositionsBuilder.add3(0, 0, 0), this.uPositionsBuilder.add3(0, 0, 0), this.vPositionsBuilder.add3(0, 0, 0), this.vPositionsBuilder.add3(0, 0, 0), this.residueType = this.typeBuilder.array, this.uPositions = this.uPositionsBuilder.array, this.vPositions = this.vPositionsBuilder.array, this.typeBuilder = null, this.uPositionsBuilder = null, this.vPositionsBuilder = null, this.uvLength = this.residueType.length, this.residueCount = this.uvLength - 4
                        }, t.prototype.addControlPoint = function(e, t) {
                            this.pPositionsBuilder.add3(e.x, e.y, e.z), this.dPositionsBuilder.add3(t.x, t.y, t.z)
                        }, t.prototype.finishContols = function() {
                            this.pPositions = this.pPositionsBuilder.array, this.dPositions = this.dPositionsBuilder.array, this.pPositionsBuilder = null, this.dPositionsBuilder = null
                        }, t
                    }(),
                    i = function() {
                        function t(t, n, i) {
                            this.molecule = t, this.elements = n, this.linearSegmentCount = i, this.tempA = new THREE.Vector3, this.tempB = new THREE.Vector3, this.tempC = new THREE.Vector3, this.controlPoints = new Float32Array(0), this.torsionVectors = new Float32Array(0), this.normalVectors = new Float32Array(0), this.residueCount = 0, this.structureStarts = new Set, this.structureEnds = new Set, this.residueType = [], this.residueIndex = new Int32Array(0);
                            for (var o = 0, a = this.elements; o < a.length; o++) {
                                var s = a[o];
                                this.residueCount += s.endResidueIndex - s.startResidueIndex
                            }
                            var l = new r(this.residueCount);
                            this.controlPointsBuilder = e.Utils.ArrayBuilder.forVertex3D(this.residueCount * this.linearSegmentCount + 1), this.torsionVectorsBuilder = e.Utils.ArrayBuilder.forVertex3D(this.residueCount * this.linearSegmentCount + 1), this.normalVectorsBuilder = e.Utils.ArrayBuilder.forVertex3D(this.residueCount * this.linearSegmentCount + 1), this.createControlPoints(l)
                        }
                        return t.maskSplit = function(t, n, r) {
                            for (var i = t, o = t.startResidueIndex, a = t.endResidueIndex, s = o; a > s; s++)
                                if (n[s]) {
                                    for (i.startResidueIndex !== s && (i = new e.Structure.SecondaryStructureElement(t.type, t.startResidueId, t.endResidueId), i.startResidueIndex = s); a > s && n[s];) s++;
                                    i.endResidueIndex = s, r[r.length] = i
                                }
                        }, t.buildUnits = function(n, r, i) {
                            var o;
                            if (r) {
                                o = [];
                                for (var a = 0, s = n.secondaryStructure; a < s.length; a++) {
                                    var l = s[a];
                                    t.maskSplit(l, r, o)
                                }
                            } else o = n.secondaryStructure;
                            var c = o[0],
                                u = n.residues.asymId,
                                d = n.residues.authSeqNumber,
                                p = [],
                                h = [],
                                m = e.Structure.SecondaryStructureType.None;
                            c.type === m && (c = null);
                            for (var f = 0, g = o; f < g.length; f++) {
                                var l = g[f];
                                l.type === m ? (p.length > 0 && h.push(new t(n, p, i)), c = null, p = []) : (null === c && (c = l), u[c.endResidueIndex - 1] !== u[l.startResidueIndex] || c !== l && d[l.startResidueIndex] - d[c.endResidueIndex - 1] > 1 || c.startResidueIndex !== l.startResidueIndex && l.startResidueIndex - c.endResidueIndex > 0 ? (p.length > 0 ? h.push(new t(n, p, i)) : null !== c && h.push(new t(n, [c], i)), c = null, p = [l]) : p[p.length] = l), c = l
                            }
                            return p.length > 0 && h.push(new t(n, p, i)), h
                        }, t.prototype.createControlPoints = function(e) {
                            this.initPositions(e), this.initControlsPoints(e), this.computeSplines(e), this.controlPoints = this.controlPointsBuilder.array, this.torsionVectors = this.torsionVectorsBuilder.array, this.normalVectors = this.normalVectorsBuilder.array, this.controlPointsBuilder = null, this.torsionVectorsBuilder = null, this.normalVectorsBuilder = null
                        }, t.prototype.initPositions = function(t) {
                            for (var n = this.molecule.residues, r = this.molecule.atoms, i = {
                                    atomStartIndex: n.atomStartIndex,
                                    atomEndIndex: n.atomEndIndex,
                                    name: r.name,
                                    x: r.x,
                                    y: r.y,
                                    z: r.z
                                }, o = [], a = 0, s = 0, l = 0, c = this.elements; l < c.length; l++) {
                                var u = c[l];
                                for (this.structureStarts.add(u.startResidueIndex), this.structureEnds.add(u.endResidueIndex - 1), s = u.startResidueIndex; s < u.endResidueIndex; s++) t.addResidue(s, i, u.type), o[o.length] = u.type
                            }
                            this.residueIndex = new Int32Array(this.residueCount);
                            for (var d = 0, p = this.elements; d < p.length; d++) {
                                var u = p[d];
                                for (s = u.startResidueIndex; s < u.endResidueIndex; s++) this.residueIndex[a++] = s
                            }
                            this.residueType = o, t.finishResidues();
                            var h = this.residueCount;
                            if (t.residueType[0] = t.residueType[2], t.residueType[1] = t.residueType[3], t.residueType[t.residueType.length - 2] = t.residueType[t.residueType.length - 4], t.residueType[t.residueType.length - 1] = t.residueType[t.residueType.length - 3], h > 2) {
                                var m = 2,
                                    f = 3,
                                    g = 4;
                                t.residueType[0] !== e.Structure.SecondaryStructureType.Strand ? (this.reflectPositions(t.uPositions, 0, 1, m, f, f, g, .4, .6), this.reflectPositions(t.vPositions, 0, 1, m, f, f, g, .4, .6)) : (this.reflectPositions(t.uPositions, 1, 0, m, f, f, g, .5, .5), this.reflectPositions(t.vPositions, 1, 0, m, f, f, g, .5, .5)), m = h + 1, f = h, g = h - 1, t.residueType[h - 1] !== e.Structure.SecondaryStructureType.Strand ? (this.reflectPositions(t.uPositions, h + 2, h + 3, m, f, f, g, .4, .6), this.reflectPositions(t.vPositions, h + 2, h + 3, m, f, f, g, .4, .6)) : (this.reflectPositions(t.uPositions, h + 2, h + 3, m, f, f, g, .5, .5), this.reflectPositions(t.vPositions, h + 2, h + 3, m, f, f, g, .5, .5))
                            } else
                                for (s = 0; 2 > s; s++) t.uPositions[3 * s] = t.uPositions[6], t.uPositions[3 * s + 1] = t.uPositions[7], t.uPositions[3 * s + 2] = t.uPositions[8], t.vPositions[3 * s] = t.vPositions[6], t.vPositions[3 * s + 1] = t.vPositions[7], t.vPositions[3 * s + 2] = t.vPositions[8], t.uPositions[3 * (h + 2) + 3 * s] = t.uPositions[3 * (h + 1)], t.uPositions[3 * (h + 2) + 3 * s + 1] = t.uPositions[3 * (h + 1) + 1], t.uPositions[3 * (h + 2) + 3 * s + 2] = t.uPositions[3 * (h + 1) + 2], t.vPositions[3 * (h + 2) + 3 * s] = t.vPositions[3 * (h + 1)], t.vPositions[3 * (h + 2) + 3 * s + 1] = t.vPositions[3 * (h + 1) + 1], t.vPositions[3 * (h + 2) + 3 * s + 2] = t.vPositions[3 * (h + 1) + 2]
                        }, t.prototype.initControlsPoints = function(t) {
                            for (var n = new THREE.Vector3, r = t.uvLength - 1, i = new THREE.Vector3, o = new THREE.Vector3, a = new THREE.Vector3, s = new THREE.Vector3, l = new THREE.Vector3, c = new THREE.Vector3, u = new THREE.Vector3, d = new THREE.Vector3, p = e.Structure.SecondaryStructureType.Helix, h = 0; r > h; h++) l.set(t.uPositions[3 * h], t.uPositions[3 * h + 1], t.uPositions[3 * h + 2]), c.set(t.vPositions[3 * h], t.vPositions[3 * h + 1], t.vPositions[3 * h + 2]), h++, u.set(t.uPositions[3 * h], t.uPositions[3 * h + 1], t.uPositions[3 * h + 2]), h--, d.set((l.x + u.x) / 2, (l.y + u.y) / 2, (l.z + u.z) / 2), i.subVectors(u, l), o.subVectors(c, l), a.crossVectors(i, o), s.crossVectors(a, i), a.normalize(), s.normalize(), t.residueType[h] === p && t.residueType[h + 1] === p && d.set(d.x + 1.5 * a.x, d.y + 1.5 * a.y, d.z + 1.5 * a.z), h > 0 && s.angleTo(n) > Math.PI / 2 && s.negate(), n.copy(s), i.addVectors(d, s), t.addControlPoint(d, i);
                            t.finishContols()
                        }, t.prototype.computeSplines = function(e) {
                            for (var n = new THREE.Vector3, r = new THREE.Vector3, i = new THREE.Vector3, o = e.residueCount, a = e.pPositions, s = e.dPositions, l = new THREE.Vector3, c = new THREE.Vector3, u = new THREE.Vector3, d = new THREE.Vector3, p = new THREE.Vector3, h = new THREE.Vector3, m = new THREE.Vector3, f = new THREE.Vector3, g = new THREE.Vector3, y = new THREE.Vector3, v = 0; o > v; v++) {
                                l.set(a[3 * v], a[3 * v + 1], a[3 * v + 2]), v++, c.set(a[3 * v], a[3 * v + 1], a[3 * v + 2]), v++, u.set(a[3 * v], a[3 * v + 1], a[3 * v + 2]), v++, d.set(a[3 * v], a[3 * v + 1], a[3 * v + 2]), v -= 3, p.set(s[3 * v], s[3 * v + 1], s[3 * v + 2]), v++, h.set(s[3 * v], s[3 * v + 1], s[3 * v + 2]), v++, m.set(s[3 * v], s[3 * v + 1], s[3 * v + 2]), v++, f.set(s[3 * v], s[3 * v + 1], s[3 * v + 2]), v -= 3;
                                for (var b = 1; b <= this.linearSegmentCount; b++) {
                                    var w = 1 * b / this.linearSegmentCount;
                                    .5 > w ? (t.spline(r, l, c, u, w + .5), t.spline(i, p, h, m, w + .5)) : (t.spline(r, c, u, d, w - .5), t.spline(i, h, m, f, w - .5)), 0 === v && 1 === b && (t.spline(n, l, c, u, .5), t.spline(g, p, h, m, .5), t.reflect(y, n, r, 1), this.addSplineNode(y, n, g)), this.addSplineNode(n, r, i), n.copy(r)
                                }
                            }
                        }, t.prototype.addSplineNode = function(e, t, n) {
                            this.controlPointsBuilder.add3(t.x, t.y, t.z);
                            var r = this.tempA.subVectors(n, t);
                            r.normalize(), this.torsionVectorsBuilder.add3(r.x, r.y, r.z);
                            var i = this.tempB.subVectors(t, e),
                                o = this.tempC.crossVectors(r, i);
                            o.normalize(), this.normalVectorsBuilder.add3(o.x, o.y, o.z)
                        }, t.prototype.reflectPositions = function(e, n, r, i, o, a, s, l, c) {
                            this.tempA.set(e[3 * i], e[3 * i + 1], e[3 * i + 2]), this.tempB.set(e[3 * o], e[3 * o + 1], e[3 * o + 2]), t.reflect(this.tempC, this.tempA, this.tempB, l), e[3 * n] = this.tempC.x, e[3 * n + 1] = this.tempC.y, e[3 * n + 2] = this.tempC.z, this.tempA.set(e[3 * a], e[3 * a + 1], e[3 * a + 2]), this.tempB.set(e[3 * s], e[3 * s + 1], e[3 * s + 2]), t.reflect(this.tempC, this.tempA, this.tempB, c), e[3 * r] = this.tempC.x, e[3 * r + 1] = this.tempC.y, e[3 * r + 2] = this.tempC.z
                        }, t.reflect = function(e, t, n, r) {
                            e.set(t.x - r * (n.x - t.x), t.y - r * (n.y - t.y), t.z - r * (n.z - t.z))
                        }, t.spline = function(e, t, n, r, i) {
                            var o = Math.pow(1 - i, 2) / 2,
                                a = Math.pow(i, 2) / 2,
                                s = 1 - o - a,
                                l = o * t.x + s * n.x + a * r.x,
                                c = o * t.y + s * n.y + a * r.y,
                                u = o * t.z + s * n.z + a * r.z;
                            e.set(l, c, u)
                        }, t
                    }(),
                    o = function() {
                        function e() {
                            this.radialSegmentCount = 10, this.turnWidth = .2, this.strandWidth = .33, this.strandLineWidth = .18, this.helixWidth = 1.4, this.helixHeight = .25, this.sheetWidth = 1.2, this.sheetHeight = .25, this.arrowWidth = 1.6, this.tessalation = 2
                        }
                        return e.Default = new e, e
                    }();
                n.CartoonsGeometryParams = o;
                var a = function() {
                        function n(n, r) {
                            this.params = n, this.residueIndex = 0, this.verticesDone = 0, this.trianglesDone = 0, this.vertexBuffer = e.Utils.ChunkedArrayBuilder.forVertex3D(), this.normalBuffer = e.Utils.ChunkedArrayBuilder.forVertex3D(), this.indexBuffer = e.Utils.ChunkedArrayBuilder.forIndexBuffer(), this.translationMatrix = new THREE.Matrix4, this.scaleMatrix = new THREE.Matrix4, this.rotationMatrix = new THREE.Matrix4, this.invMatrix = new THREE.Matrix4, this.vertexMap = new t.MoleculeVertexMapBuilder(t.MoleculeVertexMapType.Residue, r)
                        }
                        return n.prototype.addVertex = function(e, t) {
                            this.vertexBuffer.add3(e.x, e.y, e.z), this.normalBuffer.add3(t.x, t.y, t.z), this.verticesDone++
                        }, n.prototype.addTriangle = function(e, t, n) {
                            this.indexBuffer.add3(e, t, n), this.trianglesDone++
                        }, n.prototype.addTriangles = function(e, t, n, r, i, o) {
                            this.indexBuffer.add3(e, t, n), this.indexBuffer.add3(r, i, o), this.trianglesDone += 2
                        }, n
                    }(),
                    s = function(n) {
                        function r(s, l, c, u, d, p) {
                            void 0 === p && (p = t.PickFlagInfo.Empty), n.call(this), this.tempVectors = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
                            for (var h, m, f = e.Utils.extend({}, u, o.Default), g = new a(f, s.residues.count), y = i.buildUnits(s, l, c), v = 0, b = !1, w = !1, x = s.residues, S = s.atoms, E = 0, I = y; E < I.length; E++)
                                for (var C = I[E], T = 0, M = C.residueCount; M > T; T++) {
                                    if (g.vertexMap.startElement(C.residueIndex[T]), v = g.verticesDone, g.residueIndex = T, b = C.structureStarts.has(C.residueIndex[T]), w = C.structureEnds.has(C.residueIndex[T]), d) switch (C.residueType[T]) {
                                        case e.Structure.SecondaryStructureType.Strand:
                                            if (this.addTube(C, g, f.strandWidth, f.strandWidth), (b || w) && this.addTubeCap(C, g, f.strandWidth, f.strandWidth, b, w), !h) {
                                                var _ = r.getStrandLineTemplate(f.strandLineWidth, f.tessalation);
                                                h = {
                                                    vertex: _.attributes.position.array,
                                                    normal: _.attributes.normal.array,
                                                    index: _.attributes.index.array,
                                                    geometry: _
                                                }, m = {
                                                    startIndex: x.atomStartIndex,
                                                    endIndex: x.atomEndIndex,
                                                    x: S.x,
                                                    y: S.y,
                                                    z: S.z,
                                                    name: S.name
                                                }
                                            }
                                            this.addStrandLine(C, g, h, m, C.residueIndex[T]);
                                            break;
                                        default:
                                            this.addTube(C, g, f.turnWidth, f.turnWidth), (b || w) && this.addTubeCap(C, g, f.turnWidth, f.turnWidth, b, w)
                                    } else switch (C.residueType[T]) {
                                        case e.Structure.SecondaryStructureType.Helix:
                                            this.addTube(C, g, f.helixWidth, f.helixHeight), b ? this.addTubeCap(C, g, f.helixWidth, f.helixHeight, !0, !1) : w && this.addTubeCap(C, g, f.helixWidth, f.helixHeight, !1, !0);
                                            break;
                                        case e.Structure.SecondaryStructureType.Sheet:
                                            this.addSheet(C, g, b, w), (b || w) && this.addSheetCap(C, g, b, w);
                                            break;
                                        case e.Structure.SecondaryStructureType.Strand:
                                            if (this.addTube(C, g, f.strandWidth, f.strandWidth), (b || w) && this.addTubeCap(C, g, f.strandWidth, f.strandWidth, b, w), !h) {
                                                var _ = r.getStrandLineTemplate(f.strandLineWidth, f.tessalation);
                                                h = {
                                                    vertex: _.attributes.position.array,
                                                    normal: _.attributes.normal.array,
                                                    index: _.attributes.index.array,
                                                    geometry: _
                                                }, m = {
                                                    startIndex: x.atomStartIndex,
                                                    endIndex: x.atomEndIndex,
                                                    x: S.x,
                                                    y: S.y,
                                                    z: S.z,
                                                    name: S.name
                                                }
                                            }
                                            this.addStrandLine(C, g, h, m, C.residueIndex[T]);
                                            break;
                                        default:
                                            this.addTube(C, g, f.turnWidth, f.turnWidth), (b || w) && this.addTubeCap(C, g, f.turnWidth, f.turnWidth, b, w)
                                    }
                                    g.vertexMap.addVertexRange(v, g.verticesDone), g.vertexMap.endElement()
                                }
                            h && h.geometry.dispose(), this.vertexMap = g.vertexMap.getMap(), this.createGeometry(g, p)
                        }
                        return __extends(r, n), r.prototype.dispose = function() {
                            this.geometry.dispose(), this.pickGeometry.dispose()
                        }, r.prototype.createGeometry = function(e, n) {
                            var r = new Float32Array(e.vertexBuffer.compact()),
                                i = new Float32Array(e.normalBuffer.compact()),
                                o = new Float32Array(3 * e.verticesDone),
                                a = new Float32Array(4 * e.verticesDone),
                                s = new Uint32Array(e.indexBuffer.compact()),
                                l = new Float32Array(e.verticesDone),
                                c = new THREE.BufferGeometry;
                            c.addAttribute("position", new THREE.BufferAttribute(r, 3)), c.addAttribute("normal", new THREE.BufferAttribute(i, 3)), c.addAttribute("index", new THREE.BufferAttribute(s, 1)), c.addAttribute("color", new THREE.BufferAttribute(o, 3)), this.vertexStateBuffer = new THREE.BufferAttribute(l, 1), c.addAttribute("vState", this.vertexStateBuffer), this.geometry = c;
                            for (var u = this.vertexMap, d = {
                                    r: .45,
                                    g: .45,
                                    b: .45
                                }, p = u.vertexRanges, h = 0, m = u.elementIndices; h < m.length; h++) {
                                var f = m[h],
                                    g = u.elementMap.get(f),
                                    y = u.elementRanges[2 * g],
                                    v = u.elementRanges[2 * g + 1];
                                if (y !== v) {
                                    t.GeometryHelper.setPickBase(n.value, n.width, f, d);
                                    for (var b = y; v > b; b += 2)
                                        for (var w = p[b], x = p[b + 1], S = w; x > S; S++) a[4 * S] = d.r, a[4 * S + 1] = d.g, a[4 * S + 2] = d.b
                                }
                            }
                            var E = new THREE.BufferGeometry;
                            E.addAttribute("position", new THREE.BufferAttribute(r, 3)), E.addAttribute("index", new THREE.BufferAttribute(s, 1)), E.addAttribute("pColor", new THREE.BufferAttribute(a, 4)), this.pickGeometry = E
                        }, r.prototype.setVector = function(e, t, n) {
                            return n.set(e[3 * t], e[3 * t + 1], e[3 * t + 2]), n
                        }, r.prototype.addTube = function(e, t, n, r) {
                            var i = t.verticesDone,
                                o = 0,
                                a = 0,
                                s = 0,
                                l = this.tempVectors[0],
                                c = this.tempVectors[1],
                                u = this.tempVectors[2],
                                d = this.tempVectors[3],
                                p = this.tempVectors[4],
                                h = this.tempVectors[5],
                                m = this.tempVectors[6],
                                f = t.residueIndex * e.linearSegmentCount,
                                g = f + e.linearSegmentCount,
                                y = e.controlPoints,
                                v = e.linearSegmentCount + 1,
                                b = e.torsionVectors,
                                w = e.normalVectors,
                                x = t.params.radialSegmentCount;
                            for (o = f; g >= o; o++)
                                for (this.setVector(b, o, h), this.setVector(w, o, m), a = 0; x > a; a++) {
                                    var s = 2 * Math.PI * a / x;
                                    d.copy(h), p.copy(m), l.addVectors(d.multiplyScalar(n * Math.cos(s)), p.multiplyScalar(r * Math.sin(s))), d.copy(h), p.copy(m), c.addVectors(d.multiplyScalar(r * Math.cos(s)), p.multiplyScalar(n * Math.sin(s))), c.normalize(), this.setVector(y, o, u), u.add(l), t.addVertex(u, c)
                                }
                            for (o = 0; v - 1 > o; o++)
                                for (a = 0; x > a; a++) t.addTriangles(i + o * x + a, i + (o + 1) * x + (a + 1) % x, i + o * x + (a + 1) % x, i + o * x + a, i + (o + 1) * x + a, i + (o + 1) * x + (a + 1) % x)
                        }, r.prototype.addTubeCap = function(e, t, n, r, i, o) {
                            var a, s = t.verticesDone,
                                l = this.tempVectors[0],
                                c = this.tempVectors[1],
                                u = this.tempVectors[2],
                                d = this.tempVectors[3],
                                p = this.tempVectors[4],
                                h = this.tempVectors[5],
                                m = this.tempVectors[6],
                                f = this.tempVectors[7],
                                g = t.residueIndex * e.linearSegmentCount,
                                y = e.controlPoints,
                                v = e.linearSegmentCount + 1,
                                b = e.torsionVectors,
                                w = e.normalVectors,
                                x = t.params.radialSegmentCount;
                            this.setVector(b, g, m), this.setVector(w, g, f), c.crossVectors(m, f), o && c.negate();
                            var S = g + (i ? 0 : v - 1);
                            this.setVector(y, S, l), t.addVertex(l, c), this.setVector(b, S, p), this.setVector(w, S, h);
                            for (var E = 0; x > E; E++) a = 2 * Math.PI * E / x, u.copy(p), d.copy(h), l.addVectors(u.multiplyScalar(Math.cos(a) * n), d.multiplyScalar(Math.sin(a) * r)), this.setVector(y, S, m), l.add(m), t.addVertex(l, c), i ? t.addTriangle(s, s + E + 1, s + (E + 1) % x + 1) : t.addTriangle(s, s + (E + 1) % x + 1, s + E + 1)
                        }, r.prototype.addSheet = function(e, t, n, r) {
                            var i = t.verticesDone,
                                o = t.params,
                                a = 0,
                                s = 0,
                                l = this.tempVectors[0],
                                c = this.tempVectors[1],
                                u = this.tempVectors[2],
                                d = this.tempVectors[3],
                                p = this.tempVectors[4],
                                h = this.tempVectors[5],
                                m = (this.tempVectors[6], this.tempVectors[7]),
                                f = this.tempVectors[8],
                                g = this.tempVectors[9],
                                y = t.residueIndex * e.linearSegmentCount,
                                v = y + e.linearSegmentCount,
                                b = e.controlPoints,
                                w = (e.linearSegmentCount + 1, e.torsionVectors),
                                x = e.normalVectors,
                                S = (t.params.radialSegmentCount, 0),
                                E = 0;
                            d.set(0, 0, 0);
                            var S = 0;
                            for (r && (this.setVector(b, v, m), this.setVector(b, y, f), S = o.arrowWidth / h.subVectors(m, f).length()), a = y; v >= a; a++) E = r ? o.arrowWidth * (1 - (a - y) / e.linearSegmentCount) : o.sheetWidth, this.setVector(w, a, l), l.multiplyScalar(E), this.setVector(x, a, c), c.multiplyScalar(o.sheetHeight), r && (this.setVector(x, a, m), this.setVector(w, a, f), d.crossVectors(m, f).multiplyScalar(S)), this.setVector(b, a, u), this.setVector(x, a, p), this.setVector(w, a, g), m.copy(u).add(l).add(c), f.copy(p), t.addVertex(m, f), m.copy(u).sub(l).add(c), t.addVertex(m, f), m.copy(u).sub(l).add(c), f.copy(g).negate().add(d), t.addVertex(m, f), m.copy(u).sub(l).sub(c), t.addVertex(m, f), m.copy(u).sub(l).sub(c), f.copy(p).negate(), t.addVertex(m, f), m.copy(u).add(l).sub(c), t.addVertex(m, f), m.copy(u).add(l).sub(c), f.copy(g).add(d), t.addVertex(m, f), m.copy(u).add(l).add(c), t.addVertex(m, f);
                            for (a = 0; a < e.linearSegmentCount; a++)
                                for (s = 0; 4 > s; s++) t.addTriangles(i + 8 * a + 2 * s, i + 8 * (a + 1) + 2 * s + 1, i + 8 * a + 2 * s + 1, i + 8 * a + 2 * s, i + 8 * (a + 1) + 2 * s, i + 8 * (a + 1) + 2 * s + 1)
                        }, r.prototype.addSheetCap = function(e, t, n, r) {
                            var i = t.params,
                                o = t.residueIndex * e.linearSegmentCount,
                                a = this.setVector(e.controlPoints, o, this.tempVectors[0]),
                                s = this.setVector(e.torsionVectors, o, this.tempVectors[1]).multiplyScalar(i.sheetWidth),
                                l = this.setVector(e.normalVectors, o, this.tempVectors[2]).multiplyScalar(i.sheetHeight),
                                c = this.tempVectors[3].addVectors(a, s).add(l),
                                u = this.tempVectors[4].subVectors(a, s).add(l),
                                d = this.tempVectors[5].subVectors(a, s).sub(l),
                                p = this.tempVectors[6].addVectors(a, s).sub(l);
                            if (n) this.addSheepCapSection(t, c, u, d, p);
                            else {
                                var h = this.setVector(e.torsionVectors, o, this.tempVectors[7]).multiplyScalar(i.arrowWidth),
                                    m = this.tempVectors[8].addVectors(a, h).add(l),
                                    f = this.tempVectors[9].subVectors(a, h).add(l),
                                    g = this.tempVectors[10].subVectors(a, h).sub(l),
                                    y = this.tempVectors[11].addVectors(a, h).sub(l);
                                this.addSheepCapSection(t, m, c, p, y), this.addSheepCapSection(t, u, f, g, d)
                            }
                        }, r.prototype.addSheepCapSection = function(e, t, n, r, i) {
                            var o = e.verticesDone,
                                a = this.tempVectors[12].crossVectors(this.tempVectors[13].subVectors(n, t), this.tempVectors[14].subVectors(i, t)).normalize();
                            e.addVertex(t, a), e.addVertex(n, a), e.addVertex(r, a), e.addVertex(i, a), e.addTriangles(o, o + 1, o + 2, o + 2, o + 3, o)
                        }, r.prototype.findN3 = function(e, t, n) {
                            for (var r = t.startIndex[e], i = t.endIndex[e], o = (t.name, r); i > o; o++)
                                if ("N3" === t.name[o]) {
                                    n.set(t.x[o], t.y[o], t.z[o]);
                                    break
                                }
                            return n
                        }, r.prototype.addStrandLine = function(e, t, n, r, i) {
                            var o, a = this.tempVectors[0],
                                s = this.tempVectors[1],
                                l = n.vertex,
                                c = n.normal,
                                u = n.index,
                                d = t.verticesDone,
                                p = l.length,
                                h = u.length,
                                m = t.residueIndex * e.linearSegmentCount + (.5 * e.linearSegmentCount + 1 | 0),
                                f = this.setVector(e.controlPoints, m, this.tempVectors[2]),
                                g = this.findN3(i, r, this.tempVectors[3]).sub(f),
                                y = g.length();
                            for (g.normalize(), t.translationMatrix.makeTranslation(f.x, f.y, f.z), t.scaleMatrix.makeScale(1, 1, y), t.rotationMatrix.makeRotationAxis(new THREE.Vector3(-g.y, g.x, 0), Math.acos(g.z)), t.translationMatrix.multiply(t.rotationMatrix).multiply(t.scaleMatrix), n.geometry.applyMatrix(t.translationMatrix), o = 0; p > o; o += 3) a.set(l[o], l[o + 1], l[o + 2]), s.set(c[o], c[o + 1], c[o + 2]), t.addVertex(a, s);
                            for (o = 0; h > o; o += 3) t.addTriangle(d + u[o], d + u[o + 1], d + u[o + 2]);
                            t.invMatrix.getInverse(t.translationMatrix), n.geometry.applyMatrix(t.invMatrix)
                        }, r.getStrandLineTemplate = function(e, n) {
                            var r, i = 0,
                                o = 0;
                            switch (n) {
                                case 0:
                                    o = 2, i = 1;
                                    break;
                                case 1:
                                    o = 3, i = 2;
                                    break;
                                case 2:
                                    o = 4, i = 2;
                                    break;
                                case 3:
                                    o = 8, i = 4;
                                    break;
                                case 4:
                                    o = 10, i = 6;
                                    break;
                                case 5:
                                    o = 14, i = 6;
                                    break;
                                default:
                                    o = 16, i = 8
                            }
                            for (var a = [], s = Math.PI / 2 / i, l = 0; i >= l; l++) a[l] = new THREE.Vector3(0, e * Math.cos(l * s), .1 * Math.sin(l * s)), a[l].z += .9;
                            return r = new THREE.LatheGeometry([new THREE.Vector3(0, e, 0)].concat(a), o, Math.PI), t.GeometryHelper.getIndexedBufferGeometry(r)
                        }, r
                    }(t.GeometryBase);
                n.CartoonsGeometry = s
            }(r = n.Cartoons || (n.Cartoons = {}))
        }(n = t.Molecule || (t.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(t) {
            var n;
            ! function(t) {
                "use strict";
                ! function(e) {
                    e[e.Default = 0] = "Default", e[e.AlphaTrace = 1] = "AlphaTrace"
                }(t.CartoonsModelType || (t.CartoonsModelType = {}));
                var n = t.CartoonsModelType,
                    r = function() {
                        function e(e, t) {
                            void 0 === e && (e = 3), void 0 === t && (t = n.Default), this.tessalation = e, this.drawingType = t
                        }
                        return e
                    }();
                t.CartoonsModelParameters = r;
                var i = function(r) {
                    function i() {
                        r.apply(this, arguments)
                    }
                    return __extends(i, r), i.prototype.applySelection = function(t, n) {
                        for (var r, i = this.cartoons.vertexStateBuffer, o = i.array, a = this.cartoons.vertexMap, s = a.vertexRanges, l = !1, c = e.MoleculeSelectionType.Select, u = e.MoleculeSelectionType.HighlightSelect, d = n === e.MoleculeSelectionType.Highlight, p = n === e.MoleculeSelectionType.None, h = 0, m = t.residues; h < m.length; h++) {
                            var f = m[h];
                            if (a.elementMap.has(f)) {
                                var g = a.elementMap.get(f),
                                    y = a.elementRanges[2 * g],
                                    v = a.elementRanges[2 * g + 1];
                                if (y !== v) {
                                    var b = o[s[y]];
                                    r = b === c && d ? u : b === u && p ? c : n, b !== r && (l = !0);
                                    for (var w = y; v > w; w += 2)
                                        for (var x = s[w], S = s[w + 1], E = x; S > E; E++) o[E] = r
                                }
                            }
                        }
                        return l ? (i.needsUpdate = !0, !0) : !1
                    }, i.prototype.addedToSceneInternal = function() {
                        for (var e = this.cartoons.pickGeometry.attributes.pColor.array, t = Math.floor(e.length / 4), n = 0; t > n; n++) e[4 * n + 3] = this.sceneId / 255;
                        this.cartoons.pickGeometry.attributes.pColor.needsUpdate = !0
                    }, i.prototype.getPickElement = function(t) {
                        return {
                            object: this.molecule,
                            element: t,
                            tag: this.molecule.id,
                            elementType: e.MoleculeVertexMapType.Residue
                        }
                    }, i.prototype.highlightElement = function(t, n) {
                        return this.applySelection(new e.MoleculeSelectionIndices(null, [t]), n ? e.MoleculeSelectionType.Highlight : e.MoleculeSelectionType.None)
                    }, i.prototype.clearHighlight = function() {
                        return !1
                    }, i.prototype.applyTheme = function(t) {
                        var n = this;
                        r.prototype.applyTheme.call(this, t);
                        var i = this.cartoons.vertexMap;
                        e.MaterialsHelper.applyColorToMap(i, i.elementIndices, this.cartoons.geometry.attributes.color, function(e, t) {
                            return n.theme.setResidueColor(e, t)
                        }), this.material.uniforms.selectionColor.value = new THREE.Vector3(t.selectionColor.r, t.selectionColor.g, t.selectionColor.b), this.material.uniforms.highlightColor.value = new THREE.Vector3(t.highlightColor.r, t.highlightColor.g, t.highlightColor.b), this.material.needsUpdate = !0
                    }, i.prototype.createObjects = function() {
                        return {
                            main: new THREE.Mesh(this.cartoons.geometry, this.material),
                            pick: new THREE.Mesh(this.cartoons.pickGeometry, this.pickMaterial)
                        }
                    }, i.create = function(r, o, a, s, l) {
                        void 0 === l && (l = e.PickFlagInfo.Empty);
                        var c = 0,
                            u = 0;
                        switch (s.tessalation) {
                            case 0:
                                c = 1, u = 2;
                                break;
                            case 1:
                                c = 4, u = 3;
                                break;
                            case 2:
                                c = 6, u = 5;
                                break;
                            case 3:
                                c = 10, u = 8;
                                break;
                            case 4:
                                c = 12, u = 10;
                                break;
                            case 5:
                                c = 16, u = 14;
                                break;
                            default:
                                c = 18, u = 16
                        }
                        var d = new i;
                        d.cartoons = new t.CartoonsGeometry(r, o, c, {
                            radialSegmentCount: u,
                            tessalation: s.tessalation
                        }, s.drawingType === n.AlphaTrace, l), d.material = e.MaterialsHelper.getMeshMaterial(), d.pickMaterial = e.MaterialsHelper.getPickMaterial(), d.cartoons.geometry.computeBoundingSphere(), d.centroid = d.cartoons.geometry.boundingSphere.center, d.radius = d.cartoons.geometry.boundingSphere.radius, d.molecule = r, d.applyTheme(a), d.disposeList.push(d.cartoons, d.material, d.pickMaterial);
                        var p = d.createObjects();
                        return d.object = p.main, d.pickObject = p.pick, d
                    }, i
                }(e.Model);
                t.CartoonsModel = i
            }(n = t.Cartoons || (t.Cartoons = {}))
        }(t = e.Molecule || (e.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(e) {
        var t;
        ! function(t) {
            var n;
            ! function(t) {
                "use strict";
                var n = function(t) {
                    function n(r, i, o, a) {
                        void 0 === a && (a = e.PickFlagInfo.Empty), t.call(this);
                        var s = n.createFieldParams(r, i, o);
                        if (o.length > 0) {
                            var l = e.Density.MarchingCubes.compute(s.data);
                            i.smoothingIterations > 0 && l.laplacianSmooth(i.smoothingIterations);
                            var c = new THREE.BufferGeometry;
                            c.addAttribute("position", new THREE.BufferAttribute(l.vertices, 3)), c.addAttribute("normal", new THREE.BufferAttribute(l.normals, 3)), c.addAttribute("index", new THREE.BufferAttribute(l.triangleIndices, 1)), c.addAttribute("color", new THREE.BufferAttribute(new Float32Array(l.vertices.length), 3)), this.geometry = c, this.bottomLeft = s.bottomLeft, this.topRight = s.topRight, this.transform = s.transform, this.vertexAtomIdMap = l.annotation
                        } else {
                            var c = new THREE.BufferGeometry;
                            c.addAttribute("position", new THREE.BufferAttribute(new Float32Array(0), 3)), c.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(0), 3)), c.addAttribute("index", new THREE.BufferAttribute(new Uint32Array(0), 1)), c.addAttribute("color", new THREE.BufferAttribute(new Float32Array(0), 3)), this.geometry = c, this.bottomLeft = new THREE.Vector3, this.topRight = new THREE.Vector3, this.transform = new THREE.Matrix4, this.vertexAtomIdMap = []
                        }
                    }
                    return __extends(n, t), n.prototype.dispose = function() {
                        this.geometry.dispose()
                    }, n.createFieldParams = function(e, t, n) {
                        function r(e, t, n) {
                            F.i = Math.max(0 | Math.floor((e - d) / _), 0), F.j = Math.max(0 | Math.floor((t - p) / A), 0), F.k = Math.max(0 | Math.floor((n - h) / P), 0)
                        }

                        function i(e, t, n) {
                            H.i = Math.min(0 | Math.ceil((e - d) / _), I), H.j = Math.min(0 | Math.ceil((t - p) / A), C), H.k = Math.min(0 | Math.ceil((n - h) / P), T)
                        }

                        function o(e, t) {
                            var n = t * t,
                                o = s[e],
                                a = l[e],
                                u = c[e];
                            r(o - t, a - t, u - t), i(o + t, a + t, u + t);
                            var m = F.i,
                                f = F.j,
                                g = F.k,
                                y = H.i,
                                v = H.j,
                                b = H.k;
                            o = d - o, a = p - a, u = h - u;
                            for (var w = g; b > w; w++)
                                for (var x = u + w * P, S = x * x, E = w * C, T = f; v > T; T++)
                                    for (var k = a + T * A, D = S + k * k, L = I * (E + T), B = m; y > B; B++) {
                                        var O = o + B * _,
                                            z = D + O * O,
                                            q = L + B,
                                            N = n / (1e-6 + z) - 1;
                                        N > M[q] && (V[q] = e, M[q] = N), N > 0 && (R[q] += N)
                                    }
                        }
                        for (var a = e.atoms, s = a.x, l = a.y, c = a.z, u = a.elementSymbol, d = Number.MAX_VALUE, p = Number.MAX_VALUE, h = Number.MAX_VALUE, m = -Number.MAX_VALUE, f = -Number.MAX_VALUE, g = -Number.MAX_VALUE, y = 0, v = n; y < v.length; y++) {
                            var b = v[y],
                                w = t.exactBoundary ? 0 : t.getRadius(u[b]) + t.probeRadius,
                                x = s[b],
                                S = l[b],
                                E = c[b];
                            d = Math.min(d, x - w), p = Math.min(p, S - w), h = Math.min(h, E - w), m = Math.max(m, x + w), f = Math.max(f, S + w), g = Math.max(g, E + w)
                        }
                        d -= t.boundaryDelta.dx, p -= t.boundaryDelta.dy, h -= t.boundaryDelta.dz, m += t.boundaryDelta.dx, f += t.boundaryDelta.dy, g += t.boundaryDelta.dz;
                        var I = Math.floor((m - d) * t.density),
                            C = Math.floor((f - p) * t.density),
                            T = Math.floor((g - h) * t.density);
                        I = Math.min(I, 333), C = Math.min(C, 333), T = Math.min(T, 333);
                        var M, _ = (m - d) / (I - 1),
                            A = (f - p) / (C - 1),
                            P = (g - h) / (T - 1),
                            k = (Math.max(_, A, P), I * C * T),
                            R = new Float32Array(k),
                            V = void 0;
                        M = new Float32Array(k),
                            V = new Int32Array(k);
                        for (var D = 0, L = V.length; L > D; D++) M[D] = -Number.MAX_VALUE, V[D] = -1;
                        for (var F = {
                                i: 0,
                                j: 0,
                                k: 0
                            }, H = {
                                i: 0,
                                j: 0,
                                k: 0
                            }, B = 0, O = n; B < O.length; B++) {
                            var b = O[B],
                                w = t.getRadius(u[b]) + t.probeRadius;
                            o(b, w)
                        }
                        var z = (new THREE.Matrix4).makeTranslation(d, p, h).multiply((new THREE.Matrix4).makeScale(_, A, P));
                        return {
                            data: {
                                dimenstions: [I, C, T],
                                scalarField: R,
                                annotationField: V,
                                isoLevel: .05
                            },
                            bottomLeft: new THREE.Vector3(d, p, h),
                            topRight: new THREE.Vector3(m, f, g),
                            transform: z
                        }
                    }, n
                }(e.GeometryBase);
                t.MolecularSurfaceGeometry = n
            }(n = t.Surface || (t.Surface = {}))
        }(t = e.Molecule || (e.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    var t;
    ! function(t) {
        var n;
        ! function(n) {
            var r;
            ! function(n) {
                "use strict";
                var r = function() {
                    function t(t) {
                        e.Utils.extend(this, t, {
                            exactBoundary: !1,
                            boundaryDelta: {
                                dx: 1.5,
                                dy: 1.5,
                                dz: 1.5
                            },
                            probeRadius: 1.4,
                            atomRadii: new Map,
                            defaultAtomRadius: 1,
                            density: 1.1,
                            interactive: !1,
                            smoothingIterations: 1
                        }), this.exactBoundary && (this.boundaryDelta = {
                            dx: 0,
                            dy: 0,
                            dz: 0
                        }), this.density < .5 && (this.density = .5), this.probeRadius < 0 && (this.probeRadius = 0)
                    }
                    return t.prototype.getRadius = function(e) {
                        var t = this.atomRadii.get(e);
                        return void 0 !== t ? t : this.defaultAtomRadius
                    }, t
                }();
                n.MolecularSurfaceParameters = r;
                var i = function(e) {
                    function t() {
                        e.apply(this, arguments), this.isTransparent = !1
                    }
                    return __extends(t, e), t.prototype.addedToSceneInternal = function() {}, t.prototype.applySelection = function(e, t) {
                        return !1
                    }, t.prototype.applyTheme = function(t) {
                        e.prototype.applyTheme.call(this, t);
                        var n = {
                                r: 0,
                                g: 0,
                                b: 0
                            },
                            r = t.getSurfaceTransparency();
                        if (this.isTransparent = r.isTransparent, r.isTransparent ? (this.object && (this.object.renderOrder = 1), this.material.depthWrite = !!r.writeDepth, this.material.opacity = r.opacity, this.material.transparent = !0) : (this.object && (this.object.renderOrder = 0), this.material.depthWrite = !0, this.material.opacity = 1, this.material.transparent = !1), t.setAtomColor) {
                            this.material.vertexColors = THREE.VertexColors;
                            for (var i = this.geometry.geometry.attributes.color.array, o = this.geometry.vertexAtomIdMap, a = 0, s = i.length / 3 | 0; s > a; a++) {
                                var l = o[a];
                                0 > l ? (n.r = 0, n.g = 0, n.b = 0) : this.theme.setAtomColor(l, n), i[3 * a] = n.r, i[3 * a + 1] = n.g, i[3 * a + 2] = n.b
                            }
                            this.geometry.geometry.getAttribute("color").needsUpdate = !0, this.material.color = new THREE.Color(16777215)
                        } else this.material.vertexColors = THREE.NoColors, t.setSurfaceColor(n), this.material.color = new THREE.Color(n.r, n.g, n.b);
                        this.material.needsUpdate = !0
                    }, t.prototype.createObjects = function() {
                        var e = new THREE.Mesh(this.geometry.geometry, this.material);
                        return this.isTransparent && (e.renderOrder = 1), e.matrixAutoUpdate = !1, e.rotationAutoUpdate = !1, e.matrix.copy(this.geometry.transform), {
                            main: e,
                            pick: null
                        }
                    }, t.create = function(e, i, o, a) {
                        var s = new t,
                            l = new r(o);
                        s.isTransparent = !1, s.material = new THREE.MeshPhongMaterial({
                            specular: 11184810,
                            shininess: 1,
                            shading: THREE.FlatShading,
                            side: THREE.DoubleSide,
                            vertexColors: THREE.VertexColors
                        }), s.geometry = new n.MolecularSurfaceGeometry(e, l, i), s.centroid = (new THREE.Vector3).add(s.geometry.bottomLeft).add(s.geometry.topRight).multiplyScalar(.5), s.radius = s.centroid.distanceTo(s.geometry.bottomLeft), s.disposeList.push(s.geometry, s.material);
                        var c = s.createObjects();
                        return s.object = c.main, s.pickObject = c.pick, s.applyTheme(a), s.includeInCentroidComputation = !1, s
                    }, t
                }(t.Model);
                n.MolecularSurfaceModel = i
            }(r = n.Surface || (n.Surface = {}))
        }(n = t.Molecule || (t.Molecule = {}))
    }(t = e.Visualization || (e.Visualization = {}))
}(LiteMol || (LiteMol = {}));
var LiteMol;
! function(e) {
    ! function() {
        "undefined" != typeof exports && (exports.__esModule || Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports["default"] = e)
    }()
}(LiteMol || (LiteMol = {}));
var airForceBlue = d3.rgb(93, 138, 168).brighter(),
    fuchsia = d3.rgb(145, 92, 131).brighter(),
    armyGreen = d3.rgb(75, 83, 32).brighter(),
    auburn = d3.rgb(165, 42, 42).brighter(),
    burntOrange = d3.rgb(204, 85, 0),
    burntOrangeBright = d3.rgb(204, 85, 0).brighter(),
    burgundy = d3.rgb(128, 0, 32).brighter(),
    burgundy1 = d3.rgb(205, 127, 50).brighter(),
    lightGray = d3.rgb(105, 105, 105).brighter(),
    brass = d3.rgb(205, 149, 117),
    blueGray = d3.rgb(102, 153, 204),
    bottleGreen = d3.rgb(0, 106, 78).brighter(),
    bronze = d3.rgb(205, 127, 50).brighter(),
    coffee = d3.rgb(111, 78, 55).brighter(),
    coolGray = d3.rgb(140, 146, 172),
    black = d3.rgb(0, 0, 0),
    qualityGreen = d3.rgb(0, 128, 0).brighter(),
    qualityYellow = d3.rgb(255, 255, 53),
    qualityRed = d3.rgb(204, 0, 0),
    testClr = d3.rgb(189.68374033094645, 67.85790768979034, 73.38905580792535),
    colorArr = [airForceBlue, coolGray, fuchsia, coffee, armyGreen, blueGray, brass, bottleGreen];
angular.module("colorpicker.module", []).factory("Helper", function() {
        "use strict";
        return {
            closestSlider: function(e) {
                var t = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector;
                return t.bind(e)("I") ? e.parentNode : e
            },
            getOffset: function(e, t) {
                for (var n = 0, r = 0, i = 0, o = 0; e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);) n += e.offsetLeft, r += e.offsetTop, t || "BODY" !== e.tagName ? (i += e.scrollLeft, o += e.scrollTop) : (i += document.documentElement.scrollLeft || e.scrollLeft, o += document.documentElement.scrollTop || e.scrollTop), e = e.offsetParent;
                return {
                    top: r,
                    left: n,
                    scrollX: i,
                    scrollY: o
                }
            },
            stringParsers: [{
                re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function(e) {
                    return [e[1], e[2], e[3], e[4]]
                }
            }, {
                re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                parse: function(e) {
                    return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                }
            }, {
                re: /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                parse: function(e) {
                    return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                }
            }, {
                re: /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
                parse: function(e) {
                    return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                }
            }]
        }
    }).factory("Color", ["Helper", function(e) {
        "use strict";
        return {
            value: {
                h: 1,
                s: 1,
                b: 1,
                a: 1
            },
            rgb: function() {
                var e = this.toRGB();
                return "rgb(" + e.r + "," + e.g + "," + e.b + ")"
            },
            rgba: function() {
                var e = this.toRGB();
                return "rgba(" + e.r + "," + e.g + "," + e.b + "," + e.a + ")"
            },
            hex: function() {
                return this.toHex()
            },
            RGBtoHSB: function(e, t, n, r) {
                e /= 255, t /= 255, n /= 255;
                var i, o, a, s;
                return a = Math.max(e, t, n), s = a - Math.min(e, t, n), i = 0 === s ? null : a === e ? (t - n) / s : a === t ? (n - e) / s + 2 : (e - t) / s + 4, i = (i + 360) % 6 * 60 / 360, o = 0 === s ? 0 : s / a, {
                    h: i || 1,
                    s: o,
                    b: a,
                    a: r || 1
                }
            },
            setColor: function(t) {
                t = t.toLowerCase();
                for (var n in e.stringParsers)
                    if (e.stringParsers.hasOwnProperty(n)) {
                        var r = e.stringParsers[n],
                            i = r.re.exec(t),
                            o = i && r.parse(i);
                        if (o) return this.value = this.RGBtoHSB.apply(null, o), !1
                    }
            },
            setHue: function(e) {
                this.value.h = 1 - e
            },
            setSaturation: function(e) {
                this.value.s = e
            },
            setLightness: function(e) {
                this.value.b = 1 - e
            },
            setAlpha: function(e) {
                this.value.a = parseInt(100 * (1 - e), 10) / 100
            },
            toRGB: function(e, t, n, r) {
                e || (e = this.value.h, t = this.value.s, n = this.value.b), e *= 360;
                var i, o, a, s, l;
                return e = e % 360 / 60, l = n * t, s = l * (1 - Math.abs(e % 2 - 1)), i = o = a = n - l, e = ~~e, i += [l, s, 0, 0, s, l][e], o += [s, l, l, s, 0, 0][e], a += [0, 0, s, l, l, s][e], {
                    r: Math.round(255 * i),
                    g: Math.round(255 * o),
                    b: Math.round(255 * a),
                    a: r || this.value.a
                }
            },
            toHex: function(e, t, n, r) {
                var i = this.toRGB(e, t, n, r);
                return "#" + (1 << 24 | parseInt(i.r, 10) << 16 | parseInt(i.g, 10) << 8 | parseInt(i.b, 10)).toString(16).substr(1)
            }
        }
    }]).factory("Slider", ["Helper", function(e) {
        "use strict";
        var t = {
                maxLeft: 0,
                maxTop: 0,
                callLeft: null,
                callTop: null,
                knob: {
                    top: 0,
                    left: 0
                }
            },
            n = {};
        return {
            getSlider: function() {
                return t
            },
            getLeftPosition: function(e) {
                return Math.max(0, Math.min(t.maxLeft, t.left + ((e.pageX || n.left) - n.left)))
            },
            getTopPosition: function(e) {
                return Math.max(0, Math.min(t.maxTop, t.top + ((e.pageY || n.top) - n.top)))
            },
            setSlider: function(r, i) {
                var o = e.closestSlider(r.target),
                    a = e.getOffset(o, i),
                    s = o.getBoundingClientRect(),
                    l = r.clientX - s.left,
                    c = r.clientY - s.top;
                t.knob = o.children[0].style, t.left = r.pageX - a.left - window.pageXOffset + a.scrollX, t.top = r.pageY - a.top - window.pageYOffset + a.scrollY, n = {
                    left: r.pageX - (l - t.left),
                    top: r.pageY - (c - t.top)
                }
            },
            setSaturation: function(e, n) {
                t = {
                    maxLeft: 100,
                    maxTop: 100,
                    callLeft: "setSaturation",
                    callTop: "setLightness"
                }, this.setSlider(e, n)
            },
            setHue: function(e, n) {
                t = {
                    maxLeft: 0,
                    maxTop: 100,
                    callLeft: !1,
                    callTop: "setHue"
                }, this.setSlider(e, n)
            },
            setAlpha: function(e, n) {
                t = {
                    maxLeft: 0,
                    maxTop: 100,
                    callLeft: !1,
                    callTop: "setAlpha"
                }, this.setSlider(e, n)
            },
            setKnob: function(e, n) {
                t.knob.top = e + "px", t.knob.left = n + "px"
            }
        }
    }]).directive("colorpicker", ["$document", "$compile", "Color", "Slider", "Helper", function(e, t, n, r, i) {
        "use strict";
        return {
            require: "?ngModel",
            restrict: "A",
            link: function(o, a, s, l) {
                var c, u = s.colorpicker ? s.colorpicker : "hex",
                    d = angular.isDefined(s.colorpickerPosition) ? s.colorpickerPosition : "bottom",
                    p = angular.isDefined(s.colorpickerInline) ? s.colorpickerInline : !1,
                    h = angular.isDefined(s.colorpickerFixedPosition) ? s.colorpickerFixedPosition : !1,
                    m = angular.isDefined(s.colorpickerParent) ? a.parent() : angular.element(document.body),
                    f = angular.isDefined(s.colorpickerWithInput) ? s.colorpickerWithInput : !1,
                    g = f ? '<input type="text" name="colorpicker-input">' : "",
                    y = p ? "" : '<button type="button" class="close close-colorpicker">&times;</button>',
                    v = '<div class="colorpicker dropdown"><div class="dropdown-menu"><colorpicker-saturation><i></i></colorpicker-saturation><colorpicker-hue><i></i></colorpicker-hue><colorpicker-alpha><i></i></colorpicker-alpha><colorpicker-preview></colorpicker-preview>' + g + y + "</div></div>",
                    b = angular.element(v),
                    w = n,
                    x = b.find("colorpicker-hue"),
                    S = b.find("colorpicker-saturation"),
                    E = b.find("colorpicker-preview"),
                    I = b.find("i");
                if (t(b)(o), f) {
                    var C = b.find("input");
                    C.on("mousedown", function(e) {
                        e.stopPropagation()
                    }).on("keyup", function(e) {
                        var t = this.value;
                        a.val(t), l && o.$apply(l.$setViewValue(t)), e.stopPropagation(), e.preventDefault()
                    }), a.on("keyup", function() {
                        C.val(a.val())
                    })
                }
                var T = function() {
                    e.on("mousemove", _), e.on("mouseup", A)
                };
                "rgba" === u && (b.addClass("alpha"), c = b.find("colorpicker-alpha"), c.on("click", function(e) {
                    r.setAlpha(e, h), _(e)
                }).on("mousedown", function(e) {
                    r.setAlpha(e, h), T()
                }).on("mouseup", function(e) {
                    D("colorpicker-selected-alpha")
                })), x.on("click", function(e) {
                    r.setHue(e, h), _(e)
                }).on("mousedown", function(e) {
                    r.setHue(e, h), T()
                }).on("mouseup", function(e) {
                    D("colorpicker-selected-hue")
                }), S.on("click", function(e) {
                    r.setSaturation(e, h), _(e), angular.isDefined(s.colorpickerCloseOnSelect) && L()
                }).on("mousedown", function(e) {
                    r.setSaturation(e, h), T()
                }).on("mouseup", function(e) {
                    D("colorpicker-selected-saturation")
                }), h && b.addClass("colorpicker-fixed-position"), b.addClass("colorpicker-position-" + d), "true" === p && b.addClass("colorpicker-inline"), m.append(b), l && (l.$render = function() {
                    a.val(l.$viewValue)
                }, o.$watch(s.ngModel, function(e) {
                    P(), f && C.val(e)
                })), a.on("$destroy", function() {
                    b.remove()
                });
                var M = function() {
                        try {
                            E.css("backgroundColor", w[u]())
                        } catch (e) {
                            E.css("backgroundColor", w.toHex())
                        }
                        S.css("backgroundColor", w.toHex(w.value.h, 1, 1, 1)), "rgba" === u && (c.css.backgroundColor = w.toHex())
                    },
                    _ = function(e) {
                        var t = r.getLeftPosition(e),
                            n = r.getTopPosition(e),
                            i = r.getSlider();
                        r.setKnob(n, t), i.callLeft && w[i.callLeft].call(w, t / 100), i.callTop && w[i.callTop].call(w, n / 100), M();
                        var s = w[u]();
                        return a.val(s), l && o.$apply(l.$setViewValue(s)), f && C.val(s), !1
                    },
                    A = function() {
                        D("colorpicker-selected"), e.off("mousemove", _), e.off("mouseup", A)
                    },
                    P = function() {
                        w.setColor(a.val()), I.eq(0).css({
                            left: 100 * w.value.s + "px",
                            top: 100 - 100 * w.value.b + "px"
                        }), I.eq(1).css("top", 100 * (1 - w.value.h) + "px"), I.eq(2).css("top", 100 * (1 - w.value.a) + "px"), M()
                    },
                    k = function() {
                        var e, t = i.getOffset(a[0]);
                        return angular.isDefined(s.colorpickerParent) && (t.left = 0, t.top = 0), "top" === d ? e = {
                            top: t.top - 147,
                            left: t.left
                        } : "right" === d ? e = {
                            top: t.top,
                            left: t.left + 126
                        } : "bottom" === d ? e = {
                            top: t.top + a[0].offsetHeight + 2,
                            left: t.left
                        } : "left" === d && (e = {
                            top: t.top,
                            left: t.left - 150
                        }), {
                            top: e.top + "px",
                            left: e.left + "px"
                        }
                    },
                    R = function() {
                        L()
                    },
                    V = function() {
                        b.hasClass("colorpicker-visible") || (P(), b.addClass("colorpicker-visible").css(k()), D("colorpicker-shown"), p === !1 && e.on("mousedown", R), s.colorpickerIsOpen && (o[s.colorpickerIsOpen] = !0, o.$$phase || o.$digest()))
                    };
                p === !1 ? a.on("click", V) : V(), b.on("mousedown", function(e) {
                    e.stopPropagation(), e.preventDefault()
                });
                var D = function(e) {
                        l && o.$emit(e, {
                            name: s.ngModel,
                            value: l.$modelValue
                        })
                    },
                    L = function() {
                        b.hasClass("colorpicker-visible") && (b.removeClass("colorpicker-visible"), D("colorpicker-closed"), e.off("mousedown", R), s.colorpickerIsOpen && (o[s.colorpickerIsOpen] = !1, o.$$phase || o.$digest()))
                    };
                b.find("button").on("click", function() {
                    L()
                }), s.colorpickerIsOpen && o.$watch(s.colorpickerIsOpen, function(e) {
                    e === !0 ? V() : e === !1 && L()
                })
            }
        }
    }]), angular.module("d3Core", []).factory("d3", function() {
        return d3
    }), angular.module("liteMolCore", []).factory("LiteMol", function() {
        return LiteMol
    }),
    function() {
        "use strict";
        angular.module("pdb.common.services", []).service("commonServices", ["$http", "$q", function(e, t) {
            this.apiUrls = {
                summary: "//www.ebi.ac.uk/pdbe/api/pdb/entry/summary/",
                entities: "//www.ebi.ac.uk/pdbe/api/pdb/entry/entities/",
                modifiedResidues: "//www.ebi.ac.uk/pdbe/api/pdb/entry/modified_AA_or_NA/",
                mutatedResidues: "//www.ebi.ac.uk/pdbe/api/pdb/entry/mutated_AA_or_NA/",
                polymerCoverage: "//www.ebi.ac.uk/pdbe/api/pdb/entry/polymer_coverage/",
                polymerCoveragePerChain: "//www.ebi.ac.uk/pdbe/api/pdb/entry/polymer_coverage/",
                bindingSites: "//www.ebi.ac.uk/pdbe/api/pdb/entry/binding_sites/",
                mappings: "//www.ebi.ac.uk/pdbe/api/mappings/",
                residueListing: "//www.ebi.ac.uk/pdbe/api/pdb/entry/residue_listing/",
                secStrutures: "//www.ebi.ac.uk/pdbe/api/pdb/entry/secondary_structure/",
                outliers: "//www.ebi.ac.uk/pdbe/api/validation/residuewise_outlier_summary/entry/",
                topology: "//www.ebi.ac.uk/pdbe/api/topology/entry/",
                molecules: "//www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/",
                uniProtToPfam: "//www.ebi.ac.uk/pdbe/api/mappings/uniprot_to_pfam/",
                observedResidueRatio: "//www.ebi.ac.uk/pdbe/api/pdb/entry/observed_residues_ratio/",
                edm: "//www.ebi.ac.uk/pdbe/coordinates/files/",
                edm_diff: "//www.ebi.ac.uk/pdbe/coordinates/files/"
            }, this.createPromise = function(t, n, r) {
                var i = this.apiUrls,
                    o = n.map(function(n) {
                        return "mappings" === n ? e.get(i[n] + "" + t[0]) : "edm" === n ? e({
                            url: i[n] + "" + t[0] + ".ccp4",
                            method: "GET",
                            responseType: "blob",
                            cache: !0
                        }) : "edm_diff" === n ? e({
                            url: i[n] + "" + t[0] + "_diff.ccp4",
                            method: "GET",
                            responseType: "blob",
                            cache: !0
                        }) : "polymerCoveragePerChain" === n ? e.get(i[n] + "" + t[0] + "/chain/" + r) : e({
                            method: "POST",
                            url: i[n],
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: t.join(",")
                        })
                    });
                return o
            }, this.combinedDataGrabber = function(e, t, n) {
                var r = e.map(function(e) {
                    return e.then(function(e) {
                        return {
                            resolve: !0,
                            result: e
                        }
                    }, function(e) {
                        return {
                            resolve: !1,
                            result: e
                        }
                    })
                });
                return Promise.all(r).then(function(e) {
                    var t = [],
                        n = [],
                        r = !0;
                    if (e.forEach(function(e) {
                            e.resolve && (r = !1), t.push(e.resolve ? e.result : null), n.push(e.resolve ? null : e.result)
                        }), r) throw n;
                    return t
                })
            }, this.colorBox = [
                [
                    [51, 123, 177],
                    [23, 83, 137],
                    [5, 54, 106],
                    [99, 175, 213],
                    [176, 229, 251]
                ],
                [
                    [100, 63, 145],
                    [100, 46, 131],
                    [98, 99, 173],
                    [101, 28, 117],
                    [99, 81, 159]
                ],
                [
                    [154, 69, 21],
                    [118, 39, 21],
                    [83, 10, 21],
                    [189, 98, 21],
                    [224, 127, 21]
                ],
                [
                    [166, 72, 122],
                    [115, 39, 89],
                    [218, 116, 135],
                    [227, 146, 149],
                    [237, 175, 170]
                ],
                [
                    [50, 120, 114],
                    [39, 78, 82],
                    [59, 156, 132],
                    [68, 192, 147],
                    [74, 232, 156]
                ],
                [
                    [97, 97, 26],
                    [73, 73, 25],
                    [48, 48, 20],
                    [118, 118, 23],
                    [134, 134, 16]
                ]
            ], this.colorBox1 = [
                [
                    [0, 55, 55],
                    [0, 75, 75],
                    [0, 94, 94],
                    [0, 35, 35],
                    [0, 114, 114],
                    [0, 133, 133],
                    [0, 153, 153]
                ],
                [
                    [0, 63, 94],
                    [0, 76, 114],
                    [0, 89, 133],
                    [0, 102, 153],
                    [0, 115, 173],
                    [0, 128, 192],
                    [0, 141, 212]
                ],
                [
                    [51, 73, 51],
                    [62, 88, 62],
                    [72, 103, 72],
                    [82, 118, 82],
                    [93, 133, 93],
                    [41, 58, 41],
                    [103, 148, 103]
                ]
            ], this.colorBox2 = [
                [
                    [59, 94, 94],
                    [53, 100, 100],
                    [41, 112, 112],
                    [35, 118, 118],
                    [29, 124, 124],
                    [24, 129, 129],
                    [18, 135, 135],
                    [12, 141, 141],
                    [65, 88, 88]
                ],
                [
                    [59, 82, 94],
                    [53, 84, 100],
                    [47, 86, 106],
                    [24, 94, 129],
                    [12, 98, 141],
                    [65, 80, 88],
                    [0, 102, 153]
                ],
                [
                    [40, 57, 40],
                    [48, 68, 48],
                    [56, 80, 56],
                    [64, 91, 64],
                    [72, 103, 72],
                    [80, 115, 80],
                    [88, 126, 88],
                    [32, 45, 32],
                    [24, 34, 24],
                    [96, 138, 96]
                ]
            ], this.colorBox3 = [
                [
                    [99, 106, 137],
                    [110, 118, 151],
                    [125, 132, 161],
                    [140, 146, 172],
                    [155, 160, 183]
                ],
                [
                    [114, 72, 103],
                    [129, 82, 117],
                    [145, 92, 131],
                    [159, 104, 144],
                    [98, 62, 89],
                    [169, 119, 156]
                ],
                [
                    [111, 78, 55],
                    [128, 90, 63],
                    [145, 102, 72],
                    [94, 66, 47],
                    [77, 54, 38],
                    [60, 42, 30]
                ],
                [
                    [75, 83, 32],
                    [92, 101, 39],
                    [108, 120, 46],
                    [58, 65, 25],
                    [42, 46, 18]
                ],
                [
                    [57, 115, 172],
                    [64, 128, 191],
                    [83, 140, 198],
                    [121, 166, 210],
                    [140, 179, 217]
                ],
                [
                    [0, 81, 59],
                    [0, 106, 78],
                    [0, 132, 97],
                    [0, 55, 40],
                    [0, 157, 116]
                ],
                [
                    [180, 107, 65],
                    [191, 120, 80],
                    [198, 135, 98],
                    [205, 149, 117],
                    [212, 163, 136]
                ]
            ], this.colorGradients = {
                redStack: [
                    [128, 0, 0],
                    [195, 33, 72],
                    [135, 38, 87],
                    [112, 41, 99],
                    [255, 56, 0],
                    [204, 85, 0],
                    [255, 0, 0],
                    [231, 84, 128],
                    [207, 113, 175],
                    [148, 0, 211],
                    [255, 127, 80],
                    [255, 103, 0],
                    [244, 194, 194],
                    [209, 159, 232],
                    [255, 140, 0],
                    [255, 179, 71]
                ],
                greenStack: [
                    [0, 66, 37],
                    [85, 107, 47],
                    [75, 83, 32],
                    [19, 136, 8],
                    [141, 182, 0],
                    [23, 114, 69],
                    [120, 134, 107],
                    [3, 192, 60],
                    [62, 180, 137]
                ],
                darkStack: [
                    [128, 0, 0],
                    [0, 0, 128],
                    [0, 51, 0],
                    [102, 0, 102],
                    [0, 51, 102],
                    [51, 51, 0]
                ]
            }, this.specificColors = {
                lightGray: [105, 105, 105],
                burntOrange: [204, 85, 0],
                burgundy: [128, 0, 0],
                brass: [104, 92, 7],
                airForceBlue: [93, 138, 168],
                qualityGreen: [0, 128, 0],
                qualityYellow: [255, 255, 53],
                qualityRed: [204, 0, 0],
                burntOrangeBright: [204, 85, 0]
            }, this.availableEvents = [], this.createNewEvent = function(e) {
                var t = {};
                return angular.forEach(e, function(e, n) {
                    var r;
                    "function" == typeof MouseEvent ? r = new MouseEvent(e, {
                        view: window,
                        bubbles: !0,
                        cancelable: !0
                    }) : "function" == typeof document.createEvent ? (r = document.createEvent("MouseEvents"), r.initEvent(e, !0, !0)) : "function" == typeof document.createEventObject && (r = document.createEventObject()), t[e] = r
                }), t
            }
        }])
    }(),
    function() {
        angular.module("pdb.slideToggle", []).directive("slideable", function() {
            return {
                restrict: "C",
                compile: function(e, t) {
                    if ("height" === t.slideProperty) {
                        var n = e.html();
                        e.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + n + "</div>")
                    }
                    return function(e, n, r) {
                        r.duration = r.duration ? r.duration : "1s", r.easing = r.easing ? r.easing : "ease-in-out", n.css({
                            "overflow-y": "auto",
                            "z-index": "999",
                            transitionProperty: t.slideProperty,
                            transitionDuration: r.duration,
                            transitionTimingFunction: r.easing
                        })
                    }
                }
            }
        }).directive("slideToggle", function() {
            return {
                restrict: "A",
                link: function(e, t, n) {
                    var r = t[0],
                        i = t.parent().parent()[0].querySelector(n.slideToggle),
                        o = !1;
                    "undefined" != typeof n.expanded && "true" === n.expanded && (o = !0);
                    var a = function(e) {
                        var t = i.querySelector(".slideable_content"),
                            n = i.style.top;
                        if (o) {
                            t.style.border = "1px solid rgba(0,0,0,0)";
                            var a = t.clientHeight;
                            t.style.border = 0, a > 135 && (a = 135), i.style.height = a + "px", r.style.top = parseInt(n.split("px")[0]) + a + 1 + "px", r.innerHTML = '<span class="icon-black icon-functional" data-icon="8">Collapse Controls</span>'
                        } else i.style.height = "0px", r.style.top = n, r.innerHTML = '<span class="icon-black icon-functional" data-icon="9">Expand Controls</span>';
                        o = !o
                    };
                    t.bind("click", function(e) {
                        a(r)
                    }), a(r)
                }
            }
        })
    }(),
    function() {
        angular.module("pdb.litemol.distanceMeasurementService", []).service("distanceMeasurementService", function() {
            this.DistanceMeasurement = function() {
                function e(e, t) {
                    this.app = e, this.initObjects = t, this.lastPick = null, this.isActive = !1
                }
                return e.prototype.update = function(e) {
                    this.isActive = e, this.lastPick = null
                }, e.prototype.click = function(e) {
                    e.elementType === this.initObjects.Visualization.MoleculeVertexMapType.Atom && (this.lastPick && this.isActive ? (this.showDistance(this.lastPick, e), this.lastPick = null) : this.lastPick = e)
                }, e.prototype.showDistance = function(e, t) {
                    var n = e.object,
                        r = t.object;
                    if (n && r) {
                        var i = e.element,
                            o = n.atoms.x[i],
                            a = n.atoms.y[i],
                            s = n.atoms.z[i],
                            l = t.element,
                            c = r.atoms.x[l],
                            u = r.atoms.y[l],
                            d = r.atoms.z[l],
                            p = o - c,
                            h = a - u,
                            m = s - d,
                            f = Math.sqrt(p * p + h * h + m * m),
                            g = "Distance: " + f.toFixed(2) + "Ã… [ " + (n.atoms.elementSymbol[i] + " " + n.atoms.name[i] + " " + n.atoms.id[i] + " (" + n.atoms.x[i].toFixed(2) + " " + n.atoms.y[i].toFixed(2) + " " + n.atoms.z[i].toFixed(2) + ") - ") + (r.atoms.elementSymbol[l] + " " + r.atoms.name[l] + " " + r.atoms.id[l] + " (" + r.atoms.x[l].toFixed(2) + " " + r.atoms.y[l].toFixed(2) + " " + r.atoms.z[l].toFixed(2) + ")") + " ]";
                        window.console && console.log(g)
                    }
                }, e
            }()
        })
    }(),
    function() {
        angular.module("pdb.litemol.electronDensityService", []).service("electronDensityService", ["$filter", function(e) {
            var t = this;
            t.colorToHex = function(e) {
                return "0x" + ((255 * e.r | 0) << 16 | (255 * e.g | 0) << 8 | (255 * e.b | 0) << 0).toString(16)
            }, t.ElectronDensityTheme = function() {
                function e() {
                    this.color = {
                        r: .5,
                        g: .5,
                        b: .5
                    }
                }
                return e.prototype.setWireframeColor = function(e) {
                    e.r = this.color.r, e.g = this.color.g, e.b = this.color.b
                }, e.prototype.setSurfaceColor = function(e) {
                    e.r = this.color.r, e.g = this.color.g, e.b = this.color.b
                }, e.prototype.getSurfaceTransparency = function() {
                    return {
                        isTransparent: !0,
                        opacity: .33,
                        writeDepth: !1
                    }
                }, e
            }(), t.ElectronDensityMap = function() {
                function n(e, n, r, i, o, a) {
                    var s = this;
                    this.data = e, this.filename = n, this.app = r, this.wrapper = i, this.model = null, this.show = !1, "undefined" != typeof a && "true" === a && (this.show = !0), this.asSurface = !1, "2Fo-Fc" === n && (this.asSurface = !0), this.color = t.colorToHex(LiteMol.Utils.Palette.getRandomColor()), "undefined" != typeof o && (this.color = o), this.theme = new t.ElectronDensityTheme, this.isoLevel = s.calculateIsoValue(e, n), this.updateColor()
                }
                return n.prototype.update = function(e) {
                    var t = this.wrapper.atomIndices;
                    if (this.model && (this.app.scene.removeAndDisposeModel(this.model), this.model = null), 0 !== t.length && this.show) {
                        var n = this.wrapper.molecule.initObjects.Density.ElectronDensityModel.create(this.wrapper.molecule.model.ModelWrapper.model, t, this.data, this.isoLevel, this.asSurface, this.theme);
                        this.app.scene.addModel(n, !1), this.model = n, e && this.app.scene.camera.focusOnModel(n)
                    }
                }, n.prototype.clear = function() {
                    this.model && (this.app.scene.removeAndDisposeModel(this.model), this.model = null)
                }, n.prototype.resetValue = function() {
                    this.isoLevel = this.data.valuesInfo.mean + this.data.valuesInfo.sigma
                }, n.prototype.remove = function(e) {
                    this.model && this.app.scene.removeAndDisposeModel(this.model, !1), this.wrapper.maps.splice(e, 1)
                }, n.prototype.updateColor = function() {
                    var e = parseInt(this.color);
                    this.theme.color.r = (e >> 16 & 255) / 255, this.theme.color.g = (e >> 8 & 255) / 255, this.theme.color.b = (255 & e) / 255, this.model && (this.model.applyTheme(this.theme), this.app.scene.forceRender())
                }, n.prototype.calculateIsoValue = function(t, n) {
                    var r = {
                        data: t
                    };
                    switch (n) {
                        case "2Fo-Fc":
                            return e("mathFilter")(r, "model", 1.5);
                        case "Fo-Fc(-ve)":
                            return e("mathFilter")(r, "model", -3);
                        case "Fo-Fc(+ve)":
                            return e("mathFilter")(r, "model", 3);
                        default:
                            return t.valuesInfo.sigma.toFixed(1)
                    }
                }, n
            }(), t.ElectronDensityWrapper = function() {
                function e(e, t) {
                    this.molecule = e, this.app = t, this.maps = [], this.atomIndices = []
                }
                return e.prototype.update = function(e) {
                    this.atomIndices = e;
                    for (var t = 0, n = this.maps; t < n.length; t++) {
                        var r = n[t];
                        r.update(!1)
                    }
                }, e.prototype.clear = function() {
                    for (var e = 0, t = this.maps; e < t.length; e++) {
                        var n = t[e];
                        n.clear()
                    }
                    this.atomIndices = []
                }, e.prototype.add = function(e, n, r, i) {
                    var o = new t.ElectronDensityMap(e, n, this.app, this, r, i);
                    this.maps.push(o), this.atomIndices.length > 0 && o.update(!0)
                }, e
            }()
        }])
    }();
var CustomBondColorTheme = function(e) {
    function t(t, n) {
        e.call(this, t), this.color = n
    }
    return __extends(t, e), t.prototype.setBondColor = function(e, t) {
        t.r = this.color.r, t.g = this.color.g, t.b = this.color.b
    }, t
}(LiteMol.Visualization.Themes.DefaultPalleteResidueColorTheme);
! function() {
    angular.module("pdb.litemol.hetGroupsService", ["pdb.litemol.interactionSurfaceService"]).service("hetGroupsService", ["interactionSurfaceService", function(e) {
        var t = this;
        t.HetGroup = function() {
            function t(t, n, r, i, o) {
                this.index = t, this.fragment = n, this.app = r, this.model = i, this.cameraState = void 0, this.edmMapValues = void 0, this.initObjects = o, this.label = n.fingerprint + " [ auth: " + n.authFingerprint + "], " + n.atomCount + " atom(s)";
                var a = this.getBox(),
                    s = this.initObjects.Queries.Generators.atomsInBox(a.min, a.max).wholeResidues().compile(),
                    l = i.executeQuery(s);
                if (this.groupIndices = n.atomIndices, l.length > 0) {
                    this.boxIndices = l.fragments[0].atomIndices;
                    var c = new Set(Array.prototype.slice.call(n.atomIndices));
                    this.proteinIndices = Array.prototype.filter.call(l.fragments[0].atomIndices, function(e) {
                        return !c.has(e)
                    })
                } else this.boxIndices = n.atomIndices, this.proteinIndices = [];
                this.interactionSurface = new e.InteractionSurface(this.proteinIndices, this.fragment.atomIndices, i.model, r, {
                    color: {
                        r: .7,
                        g: .7,
                        b: .7
                    },
                    isTransparent: !1
                }, {
                    color: {
                        r: .1,
                        g: .3,
                        b: .7
                    },
                    isTransparent: !0
                }, this.initObjects)
            }
            return t.prototype.focus = function(e) {
                void 0 === e && (e = !0);
                var n = this.initObjects.MoleculeVisualization.BallsAndSticks.BallsAndSticksModel.create(this.model.model, this.proteinIndices, new CustomBondColorTheme(this.model.model, t.proteinColor.brown), t.proteinParams);
                n.includeInCentroidComputation = !1, this.app.scene.addModel(n, !1), this.proteinVisual = n, n = this.initObjects.MoleculeVisualization.BallsAndSticks.BallsAndSticksModel.create(this.model.model, this.groupIndices, new CustomBondColorTheme(this.model.model, t.ligandColor.purple), t.ligandParams), n.includeInCentroidComputation = !1, this.app.scene.addModel(n, !1), e && this.app.scene.camera.focusOnModel(n), this.groupVisual = n, this.model.molecule.electronDensity.update(this.fragment.atomIndices), this.groups.showInteractionSurface && this.interactionSurface.update()
            }, t.prototype.clear = function(e) {
                void 0 === e && (e = !0), this.groupVisual && (this.app.scene.removeAndDisposeModel(this.groupVisual, e), this.groupVisual = null), this.proteinVisual && (this.app.scene.removeAndDisposeModel(this.proteinVisual, e), this.proteinVisual = null)
            }, t.prototype.getBox = function(e) {
                var t = this.model.model.atoms,
                    n = (t.count, t.x),
                    r = t.y,
                    i = t.z,
                    o = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE],
                    a = [-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE];
                "undefined" != typeof e && (n = e.x, r = e.y, i = e.z);
                for (var s = 0, l = this.fragment.atomIndices; s < l.length; s++) {
                    var c = l[s];
                    o[0] = Math.min(n[c], o[0]), o[1] = Math.min(r[c], o[1]), o[2] = Math.min(i[c], o[2]), a[0] = Math.max(n[c], a[0]), a[1] = Math.max(r[c], a[1]), a[2] = Math.max(i[c], a[2])
                }
                var u = 3;
                return o[0] = o[0] - u, o[1] = o[1] - u, o[2] = o[2] - u, a[0] = a[0] + u, a[1] = a[1] + u, a[2] = a[2] + u, {
                    min: {
                        x: o[0],
                        y: o[1],
                        z: o[2]
                    },
                    max: {
                        x: a[0],
                        y: a[1],
                        z: a[2]
                    }
                }
            }, t.ligandParams = {
                tessalation: 4,
                atomRadius: .45,
                bondRadius: .16,
                hydrogenAtomRadius: .35,
                hydrogenBondRadius: .13
            }, t.ligandColor = {
                yellow: {
                    r: .8,
                    g: .8,
                    b: 0
                },
                cyan: {
                    r: 0,
                    g: 1,
                    b: 1
                },
                purple: {
                    r: .6,
                    g: .2,
                    b: 1
                }
            }, t.proteinParams = {
                tessalation: 4,
                atomRadius: .2,
                bondRadius: .11,
                hydrogenAtomRadius: .15,
                hydrogenBondRadius: .08
            }, t.proteinColor = {
                grey: {
                    r: .6,
                    g: .2,
                    b: 1
                },
                orange: {
                    r: .8,
                    g: .5,
                    b: 0
                },
                brown: {
                    r: .6,
                    g: .34,
                    b: 0
                }
            }, t
        }(), t.HetGroups = function() {
            function e(e, t, n) {
                this.app = e, this.molecule = t, this.initObjects = n, this.showInteractionSurface = !1, this.groups = [], this.current = void 0, this.previous = null, this._resetCamera = !0, this.create()
            }
            return e.prototype.update = function(e) {
                this.previous && this.previous.clear(this._resetCamera), this.previous = null, e && (this.molecule.ligandInteractions.clear(!1), this.previous = e, e.focus(this._resetCamera))
            }, e.prototype.clear = function(e) {
                void 0 === e && (e = !0), this.previous && this.previous.clear(), this.previous = null, this.current = void 0, this.update(this.current), e && this.app.scene.resetCamera(), this.app.scene.forceRender()
            }, e.prototype.create = function() {
                var e = this,
                    n = this.molecule.model.ModelWrapper,
                    r = n.executeQuery(e.initObjects.Queries.Generators.hetGroups().compile());
                return r ? void(this.groups = r.fragments.map(function(r, i) {
                    return new t.HetGroup(i, r, e.app, n, e.initObjects)
                })) : void(this.groups = [])
            }, e.prototype.modelChanged = function() {
                var e = -1,
                    t = this.current;
                t && (e = t.index, t.clear(!1)), this.create();
                var n = this.groups;
                this._resetCamera = !1, e >= 0 && n.length > e ? this.current = n[e] : this.current = void 0, this.update(this.current), this._resetCamera = !0
            }, e
        }()
    }])
}(),
function() {
    angular.module("pdb.litemol.interactionSurfaceService", []).service("interactionSurfaceService", function() {
        var e = this;
        e.InteractionSurfaceTheme = function() {
            function e() {
                this.color = {
                    r: .5,
                    g: .5,
                    b: .5
                }, this.isTransparent = !1
            }
            return e.prototype.setWireframeColor = function(e) {
                e.r = this.color.r, e.g = this.color.g, e.b = this.color.b
            }, e.prototype.setSurfaceColor = function(e) {
                e.r = this.color.r, e.g = this.color.g, e.b = this.color.b
            }, e.prototype.getSurfaceTransparency = function() {
                return this.isTransparent ? {
                    isTransparent: !0,
                    opacity: .5,
                    writeDepth: !0
                } : {
                    isTransparent: !1,
                    opacity: .5,
                    writeDepth: !0
                }
            }, e
        }(), e.InteractionSurface = function() {
            function t(t, n, r, i, o, a, s) {
                this.fragmentIndices = t, this.ligandIndices = n, this.model = r, this.app = i, this.polymerThemeParams = o, this.ligandThemeParams = a, this.initObjects = s, this.polymerVisual = null, this.ligandVisual = null, this.polymerTheme = new e.InteractionSurfaceTheme, this.polymerTheme.color.r = o.color.r, this.polymerTheme.color.g = o.color.g, this.polymerTheme.color.b = o.color.b, this.polymerTheme.isTransparent = o.isTransparent, this.ligandTheme = new e.InteractionSurfaceTheme, this.ligandTheme.color.r = a.color.r, this.ligandTheme.color.g = a.color.g, this.ligandTheme.color.b = a.color.b, this.ligandTheme.isTransparent = a.isTransparent;
                for (var l = r.atoms.entityIndex, c = r.entities.entityType, u = this.initObjects.Structure.EntityType.Polymer, d = LiteMol.Utils.ChunkedArrayBuilder.forIndices(t.length), p = 0, h = t; p < h.length; p++) {
                    var m = h[p];
                    c[l[m]] === u && d.add(m)
                }
                this.polymerIndices = d.compact()
            }
            return t.prototype.clear = function() {
                this.polymerVisual && (this.app.scene.removeAndDisposeModel(this.polymerVisual), this.polymerVisual = null), this.ligandVisual && (this.app.scene.removeAndDisposeModel(this.ligandVisual), this.ligandVisual = null)
            }, t.prototype.update = function() {
                this.clear();
                var e = this.initObjects.MoleculeVisualization.Surface.MolecularSurfaceModel.create(this.model, this.polymerIndices, {
                    atomRadii: VDWRadii,
                    defaultAtomRadius: 1,
                    density: 2,
                    probeRadius: 0,
                    exactBoundary: !0,
                    smoothingIterations: 3
                }, this.polymerTheme);
                e.includeInCentroidComputation = !1, this.app.scene.addModel(e, !1), this.polymerVisual = e, e = this.initObjects.MoleculeVisualization.Surface.MolecularSurfaceModel.create(this.model, this.ligandIndices, {
                    atomRadii: VDWRadii,
                    defaultAtomRadius: 1,
                    density: 2,
                    probeRadius: 0,
                    exactBoundary: !1,
                    smoothingIterations: 3
                }, this.ligandTheme), e.includeInCentroidComputation = !1, this.app.scene.addModel(e, !1), this.ligandVisual = e
            }, t
        }()
    })
}(),
function() {
    angular.module("pdb.litemol.ligandInteractionService", []).service("ligandInteractionService", ["$filter", function(e) {
        var t = this;
        t.LigandInteraction = function() {
            function e(e, t, n, r, i, o) {
                this.index = e, this.fragment = t, this.app = n, this.model = r, this.cameraState = void 0, this.edmMapValues = void 0, this.interactions = i, this.initObjects = o, this.label = t.fingerprint + " [ auth: " + t.authFingerprint + "], " + t.atomCount + " atom(s)";
                var a = this.getBox(),
                    s = this.initObjects.Queries.Generators.atomsInBox(a.min, a.max).wholeResidues().compile(),
                    l = i.executeQuery(s);
                if (this.groupIndices = t.atomIndices, l.length > 0) {
                    this.boxIndices = l.fragments[0].atomIndices;
                    var c = new Set(Array.prototype.slice.call(t.atomIndices));
                    this.proteinIndices = Array.prototype.filter.call(l.fragments[0].atomIndices, function(e) {
                        return !c.has(e)
                    })
                } else this.boxIndices = t.atomIndices, this.proteinIndices = []
            }
            return e.prototype.focus = function(t) {
                var n = this;
                void 0 === t && (t = !0);
                var r = this.initObjects.MoleculeVisualization.BallsAndSticks.BallsAndSticksModel.create(this.interactions.model, this.proteinIndices, new CustomBondColorTheme(this.interactions.model, e.proteinColor.brown), e.proteinParams);
                r.includeInCentroidComputation = !1, this.app.scene.addModel(r, !1), this.proteinVisual = r, r = this.initObjects.MoleculeVisualization.BallsAndSticks.BallsAndSticksModel.create(this.interactions.model, this.groupIndices, new CustomBondColorTheme(this.interactions.model, e.ligandColor.purple), e.ligandParams), r.includeInCentroidComputation = !1, this.app.scene.addModel(r, !1), t && this.app.scene.camera.focusOnModel(r), this.groupVisual = r;
                var i = this.model.molecule.hetGroups.groups.filter(function(e) {
                    return e.label === n.label
                });
                i.length > 0 ? this.model.molecule.electronDensity.update(i[0].fragment.atomIndices) : this.model.molecule.electronDensity.clear()
            }, e.prototype.clear = function(e) {
                void 0 === e && (e = !0), this.groupVisual && (this.app.scene.removeAndDisposeModel(this.groupVisual, e), this.groupVisual = null), this.proteinVisual && (this.app.scene.removeAndDisposeModel(this.proteinVisual, e), this.proteinVisual = null), this.interactions.showInteractionSurface && this.interactionSurface.update()
            }, e.prototype.getBox = function(e) {
                var t = this.interactions.model.atoms,
                    n = (t.count, t.x),
                    r = t.y,
                    i = t.z,
                    o = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE],
                    a = [-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE];
                "undefined" != typeof e && (n = e.x, r = e.y, i = e.z);
                for (var s = 0, l = this.fragment.atomIndices; s < l.length; s++) {
                    var c = l[s];
                    o[0] = Math.min(n[c], o[0]), o[1] = Math.min(r[c], o[1]), o[2] = Math.min(i[c], o[2]), a[0] = Math.max(n[c], a[0]), a[1] = Math.max(r[c], a[1]), a[2] = Math.max(i[c], a[2])
                }
                var u = 3;
                return o[0] = o[0] - u, o[1] = o[1] - u, o[2] = o[2] - u, a[0] = a[0] + u, a[1] = a[1] + u, a[2] = a[2] + u, {
                    min: {
                        x: o[0],
                        y: o[1],
                        z: o[2]
                    },
                    max: {
                        x: a[0],
                        y: a[1],
                        z: a[2]
                    }
                }
            }, e.ligandParams = {
                tessalation: 4,
                atomRadius: .45,
                bondRadius: .16,
                hydrogenAtomRadius: .35,
                hydrogenBondRadius: .13
            }, e.ligandColor = {
                yellow: {
                    r: .8,
                    g: .8,
                    b: 0
                },
                cyan: {
                    r: 0,
                    g: 1,
                    b: 1
                },
                purple: {
                    r: .6,
                    g: .2,
                    b: 1
                }
            }, e.proteinParams = {
                tessalation: 4,
                atomRadius: .2,
                bondRadius: .11,
                hydrogenAtomRadius: .15,
                hydrogenBondRadius: .08
            }, e.proteinColor = {
                grey: {
                    r: .6,
                    g: .2,
                    b: 1
                },
                orange: {
                    r: .8,
                    g: .5,
                    b: 0
                },
                brown: {
                    r: .6,
                    g: .34,
                    b: 0
                }
            }, e
        }(), t.LigandInteractions = function() {
            function e(e, t, n) {
                this.app = e, this.molecule = t, this.initObjects = n, this.showInteractionSurface = !1, this.groups = [], this.current = void 0, this.previous = null, this._resetCamera = !0, this.model = null, this.queryContext = null, this.create()
            }
            return e.prototype.executeQuery = function(e) {
                try {
                    return e(this.queryContext)
                } catch (t) {
                    return void(window.console && console.log("Error executing query: " + t))
                }
            }, e.prototype.update = function(e) {
                this.previous && this.previous.clear(this._resetCamera), this.previous = null, e && (this.molecule.ligandInteractions.clear(!1), this.previous = e, e.focus(this._resetCamera))
            }, e.prototype.clear = function(e) {
                void 0 === e && (e = !0), this.previous && this.previous.clear(), this.previous = null, this.current = void 0, this.update(this.current), e && this.app.scene.camera.reset(), this.app.scene.forceRender()
            }, e.prototype.create = function() {
                var n, r = this,
                    i = this.molecule.model.ModelWrapper.model,
                    o = i.symmetryInfo;
                n = o && "P 1" !== o.spacegroupName ? r.initObjects.Structure.buildPivotGroupSymmetry(i, e.RADIUS, r.initObjects.Queries.Generators.hetGroups().compile()) : i, this.model = n, this.queryContext = r.initObjects.Queries.QueryContext.ofStructure(n);
                var a = r.initObjects.Queries.Generators.chains.apply(null, i.chains.asymId.map(function(e) {
                        return {
                            asymId: e
                        }
                    })),
                    s = this.executeQuery(r.initObjects.Queries.Generators.hetGroups().inside(a).compile());
                return s ? void(r.groups = s.fragments.map(function(e, n) {
                    return new t.LigandInteraction(n, e, r.app, r.molecule.model.ModelWrapper, r, r.initObjects)
                })) : void(r.groups = [])
            }, e.prototype.modelChanged = function() {
                var e = -1,
                    t = this.current;
                t && (e = t.index, t.clear(!1)), this.create();
                var n = this.groups;
                this._resetCamera = !1, e >= 0 && n.length > e ? this.current = n[e] : this.current = void 0, this._resetCamera = !0
            }, e.RADIUS = 5, e
        }()
    }])
}(),
function() {
    angular.module("pdb.litemol", ["liteMolCore", "pdb.litemol.filters", "pdb.litemol.moleculeService", "pdb.litemol.validationService", "pdb.slideToggle", "pdb.common.services", "colorpicker.module", "pdb.litemol.distanceMeasurementService"]).directive("pdbLiteMol", ["$http", "LiteMol", "$filter", "moleculeService", "validationService", "distanceMeasurementService", "commonServices", "$document", function(e, t, n, r, i, o, a, s) {
        return {
            restrict: "EAC",
            scope: {
                pdbId: "@",
                getComponentDataStr: "@getComponentData",
                getComponentData: "&",
                exposedFn: "&",
                loadEdMaps: "@",
                showEdMaps: "@",
                hideOptions: "@",
                hideControls: "@",
                expandControls: "@",
                enableFrontClip: "@",
                customizeQuery: "@",
                subscribeEvents: "@"
            },
            templateUrl: "template/litemol/pdbLitemol.html",
            link: function(l, c, u) {
                function d(e, t) {
                    function n() {
                        this.constructor = e
                    }
                    for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                    e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
                }

                function p(e, t) {
                    "undefined" == typeof t && (t = {
                        r: 1,
                        g: 1,
                        b: 0
                    });
                    var n = new C(t, e);
                    return l.wrapped.model.ModelWrapper.visual.applyTheme(n), n
                }
                l.overlayText = "Loading...", l.expandedCanvasView = !1, l.showUpdateColoringButton = !0, l.annotationArr = ["Pfam", "InterPro", "CATH", "SCOP", "UniProt"], l.annotationEntryArr = [], l.annotationEntryIndex = 0, l.hetGroupsArr = [], l.edmDataArr = [], l.currentModelIndex = 1, l.showValidationsInForm = !0, l.modelIndex = 0, l.hideOptionsArr = [], l.sceneConfig = {
                    enableFrontClip: !0
                }, l.fullscreenStatus = !1, l.allEdmSelect = !1, "undefined" != typeof l.showEdMaps && "true" === l.showEdMaps && (l.allEdmSelect = !0), "undefined" != typeof l.hideOptions && (l.hideOptionsArr = l.hideOptions.split(",")), "undefined" != typeof l.enableFrontClip && "false" === l.enableFrontClip && (l.sceneConfig = {
                    enableFrontClip: !1
                }), ("undefined" == typeof l.expandControls || "" === l.expandControls || "true" !== l.expandControls) && (l.expandControls = "false"), "undefined" == typeof l.subscribeEvents && (l.subscribeEvents = "true"), l.styles = {
                    litemolOverlay: {
                        width: "90%",
                        height: "100%",
                        "background-color": "rgba(0,0,0,0.5)",
                        color: "#fff",
                        "z-index": 1,
                        position: "absolute",
                        "text-align": "center",
                        padding: "0 5%",
                        "webkit-box-sizing": "content-box",
                        "-moz-box-sizing": "content-box",
                        "box-sizing": "content-box"
                    },
                    litemolOverlayMessage: {
                        display: "inline-block",
                        "margin-top": "45%"
                    }
                };
                var h = t.Structure,
                    m = t.Formats.Cif,
                    f = t.Formats.CCP4,
                    g = t.Structure.Queries,
                    y = t.Visualization,
                    v = t.Visualization.Molecule,
                    b = t.Visualization.Themes,
                    w = t.Visualization.Density,
                    x = {
                        Structure: h,
                        Cif: m,
                        CCP4: f,
                        Queries: g,
                        Visualization: y,
                        MoleculeVisualization: v,
                        Themes: b,
                        Density: w
                    };
                l.pdbevents = a.createNewEvent(["PDB.litemol.click", "PDB.litemol.mouseover", "PDB.litemol.mouseout"]);
                var S = function() {
                    function n() {
                        var e = this;
                        return this.molecule = void 0, this.edmIndexFlag = 0, this.distanceMeasurementActive = !1, this.distanceMeasurement = new o.DistanceMeasurement(this, x), this.cameraSnapshot = void 0, t.Visualization.checkWebGL() ? (this.canvasParentEle = c[0].querySelector(".frameSection"), this.scene = new y.Scene(this.canvasParentEle, l.sceneConfig), this.scene.events.addEventListener("hover", function(t) {
                            var n = e.getDispatchEventData(t);
                            return e.dispatchEvent("PDB.litemol.mouseover", n), e.updateHighlightLabel(t)
                        }), void this.scene.events.addEventListener("select", function(t) {
                            var n = e.getDispatchEventData(t);
                            e.dispatchEvent("PDB.litemol.click", n), t && t.data && e.distanceMeasurement.click(t.data), e.distanceMeasurement.isActive || e.focusCameraOnSelection(t)
                        })) : void(l.overlayText = "Sorry but WebGL is not available in your browser. Check browser version, display drivers, etc...")
                    }
                    return n.prototype.updatePickMode = function() {
                        this.distanceMeasurement.update(!this.distanceMeasurement.isActive), this.distanceMeasurementActive(this.distanceMeasurement.isActive)
                    }, n.prototype.dispatchEvent = function(e, t, n) {
                        var r = c[0];
                        "undefined" != typeof n && (r = n), "undefined" != typeof t && (l.pdbevents[e].eventData = t), r.dispatchEvent(l.pdbevents[e])
                    }, n.prototype.resetCamera = function() {
                        var e = this.molecule;
                        e && (e.hetGroups.clear(!1), e.ligandInteractions.clear(!1), e.electronDensity.clear()), this.scene.camera.reset()
                    }, n.prototype.toggleCameraType = function() {
                        this.scene.camera.type === y.CameraTypes.Perspective ? this.scene.camera.type = y.CameraTypes.Orthographic : this.scene.camera.type = y.CameraTypes.Perspective, this.resetCamera()
                    }, n.prototype.loadMolecule = function(e) {
                        var t = this;
                        l.overlayText = "Parsing...", setTimeout(function() {
                            try {
                                var n = m.Parser.parse(e);
                                if (n.hasError) return console.log("Parsing error: " + (n.errorLine > 0 ? "(line " + n.errorLine + ") " : "") + n.errorMessage), l.overlayText = "Error Parsing file.", void l.$apply();
                                var i = m.mmCif.ofDataBlock(n.result.dataBlocks[0]);
                                if (t.molecule && t.removeMolecule(), l.wrapped = new r.MoleculeWrapper(i, t, !1, x), t.molecule = l.wrapped, l.totalModels = l.wrapped.molecule.models.length, l.coloringTypes = l.wrapped.coloringTypes, l.selectedColorType = l.coloringTypes[0], l.displayTypes = l.wrapped.displayTypes, l.selectedDisplayType = l.displayTypes[0], l.displayModes = l.wrapped.modeMoleculeList, l.selectedDisplayMode = l.displayModes[0], l.displayModesHET = l.wrapped.modeHETList, l.selectedModesHET = l.displayModesHET[1], l.displayModeWaters = l.wrapped.modeWatersList, l.selectedModeWaters = l.displayModeWaters[0], l.hetGroupsArr = l.wrapped.hetGroups.groups, l.interactionsGroupsArr = l.wrapped.ligandInteractions.groups, "undefined" != typeof l.getComponentDataStr && "" !== l.getComponentData) {
                                    var o = {
                                        customizeQuery: l.customizeQuery,
                                        hetGroupsData: l.wrapped.hetGroups.groups,
                                        ligandInteractionsData: l.wrapped.ligandInteractions.groups
                                    };
                                    l.getComponentData({
                                        litemolData: o
                                    })
                                }
                                l.wrapped.updateVisual(!0), l.overlayText = "", l.$apply()
                            } catch (a) {
                                return l.overlayText = "Error while parsing..", void console.log("Unexpected error: " + a)
                            }
                        }, 100)
                    }, n.prototype.loadElectronDensity = function(e, t, n) {
                        var r = this;
                        l.overlayText = "Loading Electron Density Maps...", setTimeout(function() {
                            try {
                                var i = f.Parser.parse(e, {
                                    normalize: !1
                                });
                                if (i.hasError) return void console.log("Parsing error: " + i.errorMessage);
                                r.molecule.electronDensity.add(i.result, t, n, l.showEdMaps), l.edmDataArr = r.molecule.electronDensity.maps, l.overlayText = "", l.$apply()
                            } catch (o) {
                                l.overlayText = "", console.log("Unexpected error: " + o), l.$apply()
                            }
                            i.warnings.length > 0 && console.log("CCP4 warnings: " + i.warnings)
                        }, 100)
                    }, n.prototype.loadCCP4FileFromServer = function(e) {
                        var t = this;
                        l.overlayText = "Downloading Electon Density Maps...";
                        var n = ["edm", "edm_diff"],
                            r = a.createPromise([e], n);
                        a.combinedDataGrabber(r, [e], n).then(function(e) {
                            for (var n = [], r = 0; 3 > r; r++) {
                                var i = r;
                                2 === r && (i = 1), "undefined" != typeof e[i] && "undefined" != typeof e[i].data && e[i].data && (n[r] = new FileReader, n[r].index = r, n[r].onload = function() {
                                    var e = "2Fo-Fc",
                                        n = "0x3362B2";
                                    switch (this.index) {
                                        case 1:
                                            e = "Fo-Fc(-ve)", n = "0xBB3333";
                                            break;
                                        case 2:
                                            e = "Fo-Fc(+ve)", n = "0x33BB33"
                                    }
                                    t.loadElectronDensity(this.result, e, n)
                                }, n[r].readAsArrayBuffer(e[i].data))
                            }
                            l.overlayText = ""
                        }, function() {
                            console.log("Electron Density Map loading Failed"), l.overlayText = "", l.$apply()
                        })
                    }, n.prototype.handleCIFFileSelect = function(e, t) {
                        var n = this,
                            r = t.target.files[0],
                            i = r.name.toLowerCase().indexOf(".cif") > 0,
                            o = r.name.toLowerCase().indexOf(".bcif") > 0;
                        if (i || o) {
                            var a = new FileReader;
                            a.onload = function(e, t) {
                                return function(e) {
                                    n.loadMolecule(e.target.result)
                                }
                            }(r, o), this.overlayMessage("Opening '" + r.name + "'..."), setTimeout(function() {
                                o ? a.readAsArrayBuffer(r) : a.readAsBinaryString(r)
                            }, 100)
                        }
                    }, n.prototype.handleCCP4FileSelect = function(e, t) {
                        var n = this,
                            r = t.files[0];
                        if ("undefined" != typeof r && r.name.toLowerCase().indexOf(".ccp4") > 0) {
                            var i = new FileReader;
                            i.onload = function(e) {
                                return function(t) {
                                    n.loadElectronDensity(t.target.result, e.name)
                                }
                            }(r), setTimeout(function() {
                                r.name.indexOf(".ccp4") > 0 ? i.readAsArrayBuffer(r) : i.readAsBinaryString(r)
                            }, 100)
                        }
                    }, n.prototype.downloadPDB = function(t) {
                        var n = this;
                        try {
                            var r = t.trim();
                            if (4 !== r.length) return void(l.overlayText = "Please enter a 4 letter PDB Id.");
                            l.overlayText = "Downloading '" + r + "'...";
                            var i = "//www.ebi.ac.uk/pdbe/static/entry/" + r.toLowerCase() + "_updated.cif";
                            "undefined" != typeof l.customizeQuery && "" !== l.customizeQuery && (i = "//www.ebi.ac.uk/pdbe/coordinates/" + r.toLowerCase() + "/" + l.customizeQuery), e({
                                url: i,
                                method: "GET",
                                cache: !0
                            }).then(function(e) {
                                n.loadMolecule(e.data), "undefined" != typeof l.loadEdMaps && "true" === l.loadEdMaps ? setTimeout(function() {
                                    n.loadCCP4FileFromServer(r)
                                }, 100) : l.overlayText = ""
                            }, function(e) {
                                l.overlayText = "Download failed."
                            })
                        } catch (o) {
                            console.log(o)
                        }
                    }, n.prototype.removeMolecule = function() {
                        var e = this.molecule;
                        e && e.clear(), this.molecule = void 0
                    }, n.prototype.focusCameraOnSelection = function(e) {
                        var t = e.data;
                        if (t && t.element) {
                            var n = t.object,
                                r = n.atoms,
                                i = t.element;
                            if (t.elementType === y.MoleculeVertexMapType.Atom) this.scene.camera.move({
                                x: r.x[i],
                                y: r.y[i],
                                z: r.z[i]
                            });
                            else if (t.elementType === y.MoleculeVertexMapType.Residue) {
                                for (var o = new THREE.Vector3, a = (new THREE.Vector3, r.x), s = r.y, c = r.z, u = n.residues.atomStartIndex[i], d = n.residues.atomEndIndex[i]; d > u; u++) o.x += a[u], o.y += s[u], o.z += c[u];
                                o.multiplyScalar(1 / (n.residues.atomEndIndex[i] - n.residues.atomStartIndex[i])), this.scene.camera.move(o)
                            }
                            boxCenter = {
                                min: {
                                    x: parseFloat(r.x[i]) - 2,
                                    y: parseFloat(r.y[i]) - 2,
                                    z: parseFloat(r.z[i]) - 2
                                },
                                max: {
                                    x: parseFloat(r.x[i]) + 2,
                                    y: parseFloat(r.y[i]) + 2,
                                    z: parseFloat(r.z[i]) + 2
                                }
                            };
                            var p = x.Queries.Generators.atomsInBox(boxCenter.min, boxCenter.max).ambientResidues(3).compile(),
                                h = this.molecule.model.ModelWrapper.executeQuery(p),
                                m = void 0;
                            h.length > 0 && (m = h.fragments[0].atomIndices, l.wrapped.electronDensity.update(m))
                        }
                    }, n.prototype.updateHighlightLabel = function(e) {
                        var t = e.data,
                            n = "";
                        if (t && t.element) {
                            var r = t.object,
                                o = t.element;
                            if (n = "<b>Id:</b> ", t.elementType === y.MoleculeVertexMapType.Atom) {
                                var a = r.atoms;
                                n += a.elementSymbol[t.element] + " " + a.name[t.element] + " " + a.id[t.element] + " [", o = a.residueIndex[t.element]
                            }
                            var s = r.residues;
                            if (n += s.name[o] + " " + s.asymId[o] + " " + s.seqNumber[o], n += " | auth: " + s.authName[o] + " " + s.authAsymId[o] + " " + s.authSeqNumber[o], t.elementType === y.MoleculeVertexMapType.Atom && (n += "]"), n += " on " + t.tag + " (model: " + r.modelId + ")", this.molecule) {
                                var l = this.molecule.validationReport;
                                if (l.info) {
                                    var u = l.info.getEntry(r.modelId, r.residues.entityId[o], r.residues.asymId[o], i.ValidationReportInfo.getResidueId(r.residues.seqNumber[o], r.residues.insCode[o]));
                                    if (u)
                                        if (1 === u.residues.length) n += "<br/><b>Validation:</b> ", n += u.residues[0].outlier_types.join(", ");
                                        else
                                            for (var d = 0, p = u.residues; d < p.length; d++) {
                                                var h = p[d];
                                                n += "<br/><b>Validation</b> for altLoc " + h.alt_code + ": ", n += h.outlier_types.join(", ")
                                            }
                                }
                            }
                        }
                        var m = c[0].querySelector(".highlight-label");
                        m.innerHTML = n, m.style.display = n.length ? "block" : "none"
                    }, n.prototype.getDispatchEventData = function(e) {
                        var t = {},
                            n = e.data;
                        if (n && n.element) {
                            var r = n.element,
                                i = n.object.residues;
                            t.residuesName = i.name[r], t.chainId = i.asymId[r], t.residueNumber = i.seqNumber[r], t.entityId = i.entityId[r], t.entryId = n.tag
                        }
                        return t
                    }, n.prototype.downloadPDBPart = function(e, t) {
                        try {
                            var n = this.downloadPdbID().trim();
                            if (4 !== n.length) return void console.log("Please enter a 4 letter PDB Id.");
                            l.overlayText = "Downloading '" + n + "' (" + e + ")...", $.ajax({
                                url: "//webchemdev.ncbr.muni.cz/CoordinateServer/" + n.toLowerCase() + "/" + e,
                                cache: !0,
                                dataType: "text",
                                crossDomain: !0
                            }).done(function(e) {
                                t(e)
                            }).fail(function() {
                                console.log("Download failed.")
                            })
                        } catch (r) {
                            this.log(r)
                        }
                    }, n.prototype.addMoleculePart = function(e, t, n) {
                        var i = this;
                        l.overlayText = "Parsing...", setTimeout(function() {
                            try {
                                var t = m.Parser.parse(e);
                                if (t.hasError) return void console.log("Parsing error: " + (t.errorLine > 0 ? "(line " + t.errorLine + ") " : "") + t.errorMessage);
                                if (!t.result.dataBlocks[0].getCategory("_atom_site")) return void console.log("The result contains no atoms.");
                                var o = m.mmCif.ofDataBlock(t.result.dataBlocks[0]),
                                    a = new r.MoleculeWrapper(o, i, !0, x);
                                a.updateVisual(n)
                            } catch (s) {
                                l.overlayText = "Unexpected error: " + s
                            }
                        }, 100)
                    }, n.prototype.downloadCartoon = function() {
                        var e = this;
                        this.downloadPDBPart("cartoon", function(t) {
                            return e.addMoleculePart(t, "cartoon", !0)
                        })
                    }, n.prototype.downloadHet = function() {
                        var e = this;
                        this.downloadPDBPart("het", function(t) {
                            return e.addMoleculePart(t, "het", !1)
                        })
                    }, n.prototype.clearPartScene = function() {
                        this.scene.clear()
                    }, n.prototype.snapCamera = function() {
                        this.cameraSnapshot = this.scene.camera.snapshot()
                    }, n.prototype.restoreCamera = function() {
                        this.scene.camera.restore(this.cameraSnapshot)
                    }, n.prototype.testHetInfo = function() {
                        var e = this.molecule.hetGroupsInfo,
                            t = e[0];
                        console.log(e);
                        var n = this.molecule.initObjects.Queries.Generators.residues({
                                entityId: t.entityId,
                                authAsymId: t.asymId,
                                authSeqNumber: t.seqNumber,
                                insCode: t.insCode
                            }).compile(),
                            r = this.molecule.model.ModelWrapper.selection;
                        r.extractSelection(n), r.focusSelection(n)
                    }, n
                }();
                l.liteMolApp = new S, l.liteMolApp.downloadPDB(l.pdbId);
                var E = c[0].querySelector("canvas").style,
                    I = c[0].querySelector("#visualization-options");
                I.style.top = E.height, I.attributes["data-top"].value = E.height, "true" === l.expandControls ? c[0].querySelector(".menuSlider2").style.top = parseInt(E.height.split("px")[0]) + 136 + "px" : c[0].querySelector(".menuSlider2").style.top = E.height, l.updateColoring = function() {
                    this.wrapped.updateColoring(this.selectedColorType)
                }, l.updateDisplayTheming = function() {
                    var e = {
                        coloringType: this.selectedColorType,
                        displayTypes: this.selectedDisplayType,
                        displayModes: this.selectedDisplayMode,
                        displayModesHET: this.selectedModesHET,
                        displayModeWaters: this.selectedModeWaters
                    };
                    this.wrapped.updateVisual(!0, e)
                }, l.applyValidations = function() {
                    "undefined" != typeof this.wrapped.validationReport.theme && (this.wrapped.applyTheme(this.wrapped.validationReport.theme), l.showUpdateColoringButton = !1)
                }, l.clearValidations = function() {
                    this.wrapped.validationReport.resetTheme(), l.showUpdateColoringButton = !0
                }, l.showAnnotationsDetailSelect = function() {
                    if ("undefined" != typeof l.selectedAnnotation && "" !== l.selectedAnnotation && null !== l.selectedAnnotation) {
                        l.annotationEntryArr = [];
                        for (var e = 0; 5 > e; e++)
                            if ("undefined" != typeof this.wrapped.sequenceAnnotations.annotations[e] && this.wrapped.sequenceAnnotations.annotations[e].id === l.selectedAnnotation) {
                                l.annotationEntryArr = this.wrapped.sequenceAnnotations.annotations[e].entries, l.annotationEntryIndex = e;
                                break
                            }
                    } else l.annotationEntryArr = []
                }, l.applyAnnotations = function() {
                    "undefined" != typeof l.selectedAnnotationEntry && "" !== l.selectedAnnotationEntry && null !== l.selectedAnnotationEntry && this.wrapped.sequenceAnnotations.annotations[0].update(l.selectedAnnotationEntry)
                }, l.clearAnnotations = function() {
                    this.wrapped.sequenceAnnotations.clearSelection()
                }, l.applyHetGroup = function(e) {
                    l.wrapped.hetGroups.update(e)
                }, l.applyInteractionsGroup = function(e) {
                    l.wrapped.ligandInteractions.update(e)
                }, l.showOnlyHetGroup = function(e, t) {
                    if ("undefined" != typeof t && t === !0) {
                        l.edmFullView = !1;
                        var n = l.liteMolApp.scene.camera.snapshot();
                        if (null !== l.wrapped.hetGroups.previous) {
                            l.wrapped.hetGroups.previous.cameraState = n;
                            for (var r = [], i = c[0].querySelectorAll(".edmControlsRow").length, o = 0; i > o; o++) r.push({
                                sliderVal: angular.element(c[0].querySelectorAll("#edmRangeInput" + o)).val(),
                                isoLevel: l.wrapped.electronDensity.maps[o].isoLevel,
                                show: l.wrapped.electronDensity.maps[o].show,
                                asSurface: l.wrapped.electronDensity.maps[o].asSurface
                            });
                            l.wrapped.hetGroups.previous.edmMapValues = r
                        }
                    }
                    l.wrapped.hetGroups.update(e);
                    var a = l.wrapped.model.ModelWrapper.visual;
                    if (a && a.updateVisibility(!1), "undefined" != typeof e && "undefined" != typeof e.cameraState && l.liteMolApp.scene.camera.restore(e.cameraState), "undefined" != typeof e && "undefined" != typeof e.edmMapValues)
                        for (var s = c[0].querySelectorAll(".edmControlsRow"), i = s.length, o = 0; i > o; o++) angular.element(c[0].querySelectorAll("#edmRangeInput" + o)).val(e.edmMapValues[o].sliderVal), angular.element(c[0].querySelectorAll("#edmRangeEle" + o)).val(e.edmMapValues[o].sliderVal), l.wrapped.electronDensity.maps[o].isoLevel = e.edmMapValues[o].isoLevel, l.wrapped.electronDensity.maps[o].show = e.edmMapValues[o].show, l.wrapped.electronDensity.maps[o].asSurface = e.edmMapValues[o].asSurface, l.wrapped.electronDensity.maps[o].update()
                }, l.showLigandInteraction = function(e, t) {
                    if ("undefined" != typeof t && t === !0) {
                        l.edmFullView = !1;
                        var n = l.liteMolApp.scene.camera.snapshot();
                        if (null !== l.wrapped.ligandInteractions.previous) {
                            l.wrapped.ligandInteractions.previous.cameraState = n;
                            for (var r = [], i = c[0].querySelectorAll(".edmControlsRow").length, o = 0; i > o; o++) r.push({
                                sliderVal: angular.element(c[0].querySelectorAll("#edmRangeInput" + o)).val(),
                                isoLevel: l.wrapped.electronDensity.maps[o].isoLevel,
                                show: l.wrapped.electronDensity.maps[o].show,
                                asSurface: l.wrapped.electronDensity.maps[o].asSurface
                            });
                            l.wrapped.ligandInteractions.previous.edmMapValues = r
                        }
                    }
                    l.wrapped.ligandInteractions.update(e);
                    var a = l.wrapped.model.ModelWrapper.visual;
                    if (a && a.updateVisibility(!1), "undefined" != typeof e && "undefined" != typeof e.cameraState && l.liteMolApp.scene.camera.restore(e.cameraState), "undefined" != typeof e && "undefined" != typeof e.edmMapValues)
                        for (var s = c[0].querySelectorAll(".edmControlsRow"), i = s.length, o = 0; i > o; o++) angular.element(c[0].querySelectorAll("#edmRangeInput" + o)).val(e.edmMapValues[o].sliderVal), angular.element(c[0].querySelectorAll("#edmRangeEle" + o)).val(e.edmMapValues[o].sliderVal), l.wrapped.electronDensity.maps[o].isoLevel = e.edmMapValues[o].isoLevel, l.wrapped.electronDensity.maps[o].show = e.edmMapValues[o].show, l.wrapped.electronDensity.maps[o].asSurface = e.edmMapValues[o].asSurface, l.wrapped.electronDensity.maps[o].update()
                }, l.getInsCode = function(e) {
                    return null === e || 0 === e.length ? null : e
                };
                var C = function(e) {
                    function t(e, t) {
                        this.highlightColor = e, this.selectionColor = t
                    }
                    return d(t, e), t.prototype.setColor = function(e) {
                        var n = t.baseColor;
                        e.r = n.r, e.g = n.g, e.b = n.b
                    }, t.prototype.setAtomColor = function(e, t) {
                        this.setColor(t)
                    }, t.prototype.setBondColor = function(e, t) {
                        this.setColor(t)
                    }, t.prototype.setResidueColor = function(e, t) {
                        this.setColor(t)
                    }, t.baseColor = {
                        r: 1,
                        g: 1,
                        b: 1
                    }, t
                }({});
                l.focusSelection = function(e, t, n) {
                    var r = l.wrapped.model.ModelWrapper.selection;
                    r.clearSelection(), r.addSelection(e), r.focusSelection(e), r.removeExtractedSelection(!1), t && r.extractSelection(e, !1), n && r.applyTheme(n)
                };
                var T = function(e, t) {
                        p("undefined" != typeof t ? {
                            r: t.r / 255,
                            g: t.g / 255,
                            b: t.b / 255
                        } : {
                            r: 0,
                            g: 0,
                            b: 1
                        });
                        var n = g.Generators.sequence(e.entity_id.toString(), e.struct_asym_id, {
                            seqNumber: e.start_residue_number,
                            insCode: l.getInsCode(e.start_author_insertion_code)
                        }, {
                            seqNumber: e.end_residue_number,
                            insCode: l.getInsCode(e.end_author_insertion_code)
                        }).compile();
                        l.focusSelection(n, !1, !0)
                    },
                    M = function(e, t) {
                        "undefined" != typeof t && p({
                            r: t.r / 255,
                            g: t.g / 255,
                            b: t.b / 255
                        });
                        var n = g.Generators.residues({
                            entityId: e.entity_id.toString(),
                            asymId: e.struct_asym_id,
                            seqNumber: +e.residue_number
                        }).union().compile();
                        l.focusSelection(n, !0)
                    };
                l.highlightAnnotation = function(e) {
                    switch (e.type) {
                        case "sequence":
                            T(e.queryObj, e.color);
                            break;
                        case "residue":
                            M(e.queryObj, e.color)
                    }
                };
                var _ = {
                    focusHetGroupFn: l.applyHetGroup,
                    showOnlyHetGroupFn: l.showOnlyHetGroup,
                    highlightAnnonationFn: l.highlightAnnotation,
                    showLigandInteractionFn: l.showLigandInteraction
                };
                if (l.exposedFn({
                        exposedFns: _
                    }), "true" == l.subscribeEvents) {
                    s.on("PDB.topologyViewer.click", function(e) {
                        if ("undefined" != typeof e.eventData) {
                            if (e.eventData.entryId != l.pdbId) return;
                            var t = {
                                type: "residue",
                                queryObj: {
                                    entity_id: e.eventData.entityId,
                                    struct_asym_id: e.eventData.structAsymId,
                                    residue_number: e.eventData.residueNumber
                                }
                            };
                            l.highlightAnnotation(t)
                        }
                    });
                    var A = ["uniprot", "pfam", "cath", "scop", "strand", "helice"],
                        P = ["chain", "quality", "quality_outlier", "binding site", "alternate conformer"];
                    s.on("PDB.seqViewer.click", function(e) {
                        if ("undefined" != typeof e.eventData) {
                            if (e.eventData.entryId != l.pdbId || "unipdbViewer" == e.eventData.viewerType) return;
                            if ("undefined" != typeof e.eventData.elementData && P.indexOf(e.eventData.elementData[0].elementType) > -1) {
                                var t = {
                                    type: "residue",
                                    queryObj: {
                                        entity_id: e.eventData.entityId,
                                        struct_asym_id: e.eventData.elementData[0].pathData.struct_asym_id,
                                        residue_number: e.eventData.residueNumber
                                    }
                                };
                                l.highlightAnnotation(t)
                            } else if ("undefined" != typeof e.eventData.elementData && A.indexOf(e.eventData.elementData[0].elementType) > -1) {
                                var n = e.eventData.elementData[0].color,
                                    r = {
                                        type: "sequence",
                                        queryObj: {
                                            entity_id: e.eventData.entityId,
                                            struct_asym_id: e.eventData.elementData[0].pathData.struct_asym_id,
                                            start_residue_number: e.eventData.elementData[0].pathData.start.residue_number,
                                            end_residue_number: e.eventData.elementData[0].pathData.end.residue_number,
                                            start_author_insertion_code: e.eventData.elementData[0].pathData.start.author_insertion_code,
                                            end_author_insertion_code: e.eventData.elementData[0].pathData.end.author_insertion_code
                                        },
                                        color: {
                                            r: n[0],
                                            g: n[1],
                                            b: n[2]
                                        }
                                    };
                                l.highlightAnnotation(r)
                            }
                        }
                    })
                }
                l.resetCamera = function() {
                    l.liteMolApp.resetCamera()
                }, l.hideShowFormOptions = function() {
                    "undefined" == typeof this.wrapped.validationReport.theme && (l.showValidationsInForm = !1)
                }, l.handleCCP4FileSelectFn = function(e) {
                    l.liteMolApp.handleCCP4FileSelect(l.liteMolApp, e)
                }, l.loadPreviousModel = function() {
                    this.wrapped.previousModel(), l.currentModelIndex = this.wrapped.modelIndex
                }, l.loadNextModel = function() {
                    this.wrapped.nextModel(), l.currentModelIndex = this.wrapped.modelIndex
                }, l.play = function() {
                    this.wrapped.play(), l.currentModelIndex = this.wrapped.modelIndex
                }, l.stop = function() {
                    this.wrapped.stop(), l.currentModelIndex = this.wrapped.modelIndex
                }, l.edmRangeChanged = function(e, t, n, r) {
                    if ("reset" === r) document.getElementById("edmRangeInput" + t).value = e, document.getElementById("edmRangeEle" + t).value = e;
                    else {
                        var i = "edmRangeInput";
                        "input" === r && (i = "edmRangeEle"), document.getElementById(i + "" + t).value = e
                    }
                    l.resetEDM(e, t, "isoLevel", n)
                }, l.resetEDM = function(e, t, r, i) {
                    var o = !0,
                        a = !1;
                    if ("isoLevel" === r) {
                        var s = n("mathFilter")(i, "model", e);
                        l.liteMolApp.molecule.electronDensity.maps[t].isoLevel = s
                    } else if ("show" === r)
                        if (l.edmDataArr[t].show = e, l.liteMolApp.molecule.electronDensity.maps[t].show = e, e === !1) l.allEdmSelect = !1;
                        else
                            for (var c = !0, u = l.edmDataArr.length, d = 0; u > d; d++) l.edmDataArr[d].show === !1 && (c = !1), l.allEdmSelect = c;
                    else "asSurface" === r ? l.liteMolApp.molecule.electronDensity.maps[t].asSurface = e : "remove" === r ? (l.liteMolApp.molecule.electronDensity.maps[t].remove(t), o = !1) : "color" === r && (l.liteMolApp.molecule.electronDensity.maps[t].color = e.replace("#", "0x"), o = !1, a = !0);
                    o && l.liteMolApp.molecule.electronDensity.maps[t].update(!1), a && l.liteMolApp.molecule.electronDensity.maps[t].updateColor()
                }, l.getMinEdmVal = function(e) {
                    switch (e.filename) {
                        case "2Fo-Fc":
                            return 0;
                        case "Fo-Fc(-ve)":
                            return -5;
                        case "Fo-Fc(+ve)":
                            return 0;
                        default:
                            return -3
                    }
                }, l.getMaxEdmVal = function(e) {
                    switch (e.filename) {
                        case "2Fo-Fc":
                            return 2;
                        case "Fo-Fc(-ve)":
                            return 0;
                        case "Fo-Fc(+ve)":
                            return 5;
                        default:
                            return 3
                    }
                }, l.getEdmVal = function(e, t) {
                    switch (e.filename) {
                        case "2Fo-Fc":
                            return l.liteMolApp.molecule.electronDensity.maps[t].isoLevel = n("mathFilter")(e, "model", 1.5), 1.5;
                        case "Fo-Fc(-ve)":
                            return l.liteMolApp.molecule.electronDensity.maps[t].isoLevel = n("mathFilter")(e, "model", -3), -3;
                        case "Fo-Fc(+ve)":
                            return l.liteMolApp.molecule.electronDensity.maps[t].isoLevel = n("mathFilter")(e, "model", 3), 3;
                        default:
                            var r = e.data.valuesInfo.sigma.toFixed(1);
                            return l.liteMolApp.molecule.electronDensity.maps[t].isoLevel = r, r
                    }
                }, l.edmSelectAllClicked = function() {
                    for (var e = l.edmDataArr.length, t = 0; e > t; t++) l.edmDataArr[t].show = l.allEdmSelect, l.liteMolApp.molecule.electronDensity.maps[t].show = l.allEdmSelect, l.liteMolApp.molecule.electronDensity.maps[t].update(!1)
                }, l.showFullEdmView = function() {
                    "undefined" != typeof l.customizeQuery && "" !== l.customizeQuery ? l.edmFullView === !0 ? l.wrapped.electronDensity.update(l.wrapped.ligandInteractions.previous.groupIndices) : l.wrapped.electronDensity.update(l.wrapped.ligandInteractions.previous.fragment.atomIndices) : l.edmFullView === !0 ? l.wrapped.electronDensity.update(l.wrapped.hetGroups.previous.proteinIndices) : l.wrapped.electronDensity.update(l.wrapped.hetGroups.previous.fragment.atomIndices)
                }, l.launchIntoFullscreen = function(e) {
                    e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen()
                }, l.changeHandler = function() {
                    var e = c[0].querySelector("#visualization-options"),
                        t = c[0].querySelector(".menuSlider2"),
                        n = (c[0].querySelector(".zoomIcon"), c[0].querySelector(".highlight-label"));
                    l.fullscreenStatus === !0 ? (e.style.top = e.attributes["data-top"].value, e.style.left = "", e.style.width = "", "0px" === e.style.height ? t.style.top = e.style.top : t.style.top = parseInt(e.style.top.split("px")[0]) + 136 + "px", t.left = "", n.style.left = "", V("original")) : (e.style.top = "0px", e.style.left = "0px", e.style.width = "35%", "0px" === e.style.height ? t.style.top = "0px" : t.style.top = "136px", t.style.left = "0px", n.style.left = "36%"), l.fullscreenStatus = !l.fullscreenStatus
                }, document.addEventListener("fullscreenchange", function() {
                    l.changeHandler()
                }, !1), document.addEventListener("webkitfullscreenchange", function() {
                    l.changeHandler()
                }, !1), document.addEventListener("mozfullscreenchange", function() {
                    l.changeHandler()
                }, !1), document.addEventListener("MSFullscreenChange", function() {
                    l.changeHandler()
                }, !1);
                var k = 0;
                l.resizeCanvas = function() {
                    0 == l.fullscreenStatus ? (k = window.pageYOffset, V("top"), l.launchIntoFullscreen(c[0].querySelector(".visualization-normal"))) : document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen && document.webkitExitFullscreen()
                };
                var R = navigator.userAgent.toLowerCase().indexOf("firefox") > -1,
                    V = function(e) {
                        R && ("top" === e ? window.scroll(window.pageXOffset, 0) : window.scroll(window.pageXOffset, k))
                    };
                l.updatePickMode = function() {
                    l.liteMolApp.distanceMeasurement.update(!l.liteMolApp.distanceMeasurement.isActive), l.liteMolApp.distanceMeasurementActive = l.liteMolApp.distanceMeasurement.isActive
                }, l.updateMolSurface = function() {
                    l.wrapped.molecularSurface.update()
                }, l.clearMolSurface = function() {
                    l.wrapped.molecularSurface.clear()
                }, l.adjustColorpickerPosition = function() {
                    setTimeout(function() {
                        var e = document.getElementsByClassName("colorpicker-visible")[0];
                        "undefined" != typeof e && (e.style.top = parseInt(e.style.top) - c[0].querySelector("#visualization-options").scrollTop + "px")
                    }, 100)
                }
            }
        }
    }])
}(),
function() {
    angular.module("pdb.litemol.filters", []).filter("mathFilter", function() {
        return function(e, t, n) {
            var r = e.data;
            if ("min" === t) switch (e.filename) {
                case "2Fo-Fc":
                    return r.valuesInfo.mean;
                case "Fo-Fc(-ve)":
                    return r.valuesInfo.mean - 5 * r.valuesInfo.sigma;
                case "Fo-Fc(+ve)":
                    return r.valuesInfo.mean;
                default:
                    return Math.max(r.valuesInfo.min, r.valuesInfo.mean - 3 * r.valuesInfo.sigma)
            } else if ("max" === t) switch (e.filename) {
                case "2Fo-Fc":
                    return r.valuesInfo.mean + 2 * r.valuesInfo.sigma;
                case "Fo-Fc(-ve)":
                    return r.valuesInfo.mean;
                case "Fo-Fc(+ve)":
                    return r.valuesInfo.mean + 5 * r.valuesInfo.sigma;
                default:
                    return Math.min(r.valuesInfo.max, r.valuesInfo.mean + 3 * r.valuesInfo.sigma)
            } else if ("model" === t) return r.valuesInfo.mean + n * r.valuesInfo.sigma
        }
    })
}(), angular.module("template/litemol/pdbLitemol.html", []).run(["$templateCache", function(e) {
        e.put("template/litemol/pdbLitemol.html", '<div ng-class="{\'visualization-normal\' : !expandedCanvasView, \'visualization-expanded-new\' : expandedCanvasView}"><div ng-style="styles.litemolOverlay" ng-show="overlayText != \'\'"><span ng-style="styles.litemolOverlayMessage">{{overlayText}}</span></div><div class="frameSection"></div><div class="highlight-label"></div><div class="visualization-controls-top-right" ng-show="true"><button class="btn btn-link" title="Reset Camera" ng-click="resetCamera()" ng-show="false"><span style="color: white" class="glyphicon glyphicon-facetime-video"></span></button><span ng-click="updatePickMode()" class="icon icon-functional" data-icon="r" title="Calculate Distance" ng-hide="true"></span><span ng-click="resizeCanvas()" class="icon icon-functional zoomIcon" data-icon="F" title="Fullscreen"></span></div><div class="visualization-controls-bottom-right" ng-show="totalModels > 1"><div><span style="color: white;font-weight: bold">Model </span><button class="btn btn-primary btn-xs" ng-click="loadPreviousModel()" title="Previous Model"><span style="color: white" class="glyphicon glyphicon-chevron-left"></span></button><span style="color: white"> {{currentModelIndex}} of {{totalModels}} </span><button class="btn btn-primary btn-xs" ng-click="loadNextModel()" title="Next Model"><span style="color: white" class="glyphicon glyphicon-chevron-right"></span></button><button class="btn btn-primary btn-xs" ng-click="play()" title="Play" style="margin:0 3px"><span style="color: white" class="glyphicon glyphicon-play"></span></button><button class="btn btn-primary btn-xs" ng-click="stop()" title="Play"><span style="color: white" class="glyphicon glyphicon-stop"></span></button></div></div><div id="visualization-options" data-top="" class="slideable" data-slide-property="height" ng-hide="hideControls == \'true\'"><div class="vis-options-row" ng-show="showUpdateColoringButton && hideOptionsArr.indexOf(\'colour\') === -1"><h4>Colour</h4><div class="vis-options-col-first"><select ng-model="selectedColorType" ng-options="colorType.label for colorType in coloringTypes track by colorType.id"></select></div><div class="vis-options-col-btn"><button ng-click="updateColoring()" title="Update Coloring" style="font-size: 11px;">Update</button></div></div><div class="vis-options-row" ng-hide="hideOptionsArr.indexOf(\'visual\') > -1"><h4>Visual</h4><div class="vis-options-col-first"><select ng-model="selectedDisplayType" ng-options="displayType.label for displayType in displayTypes track by displayType.id"></select></div><div class="vis-options-col"><select ng-model="selectedDisplayMode" ng-options="displayMode.label for displayMode in displayModes track by displayMode.id"></select></div><div class="vis-options-col-first" style="clear:left;"><select ng-model="selectedModesHET" ng-options="modeHET.label for modeHET in displayModesHET track by modeHET.id"></select></div><div class="vis-options-col"><select ng-model="selectedModeWaters" ng-options="ModeWaters.label for ModeWaters in displayModeWaters track by ModeWaters.id"></select></div><div class="vis-options-col-btn"><button ng-click="updateDisplayTheming()" title="Update Visual" style="font-size: 11px;">Update</button></div></div><div class="vis-options-row" ng-show="hetGroupsArr.length > 0 && hideOptionsArr.indexOf(\'het_groups\') === -1"><h4>HET Groups</h4><div class="vis-options-col-first"><select ng-model="selectedHetGroup" ng-options="hetGroup.label for hetGroup in hetGroupsArr" ng-change="applyHetGroup(selectedHetGroup)"><option value="">Select HetGroup</option></select></div><div class="vis-options-col-btn"><button ng-click="resetCamera()" title="Reset Camera" style="font-size: 11px;">Reset Camera</button></div></div><div class="vis-options-row" ng-show="interactionsGroupsArr.length > 0 && hideOptionsArr.indexOf(\'interaction_groups\') === -1"><h4>Ligand Interactions</h4><div class="vis-options-col-first"><select ng-model="selectedInteractionGroup" ng-options="interactionsGroup.label for interactionsGroup in interactionsGroupsArr" ng-change="applyInteractionsGroup(selectedInteractionGroup)"><option value="">Select Interaction Group</option></select></div><div class="vis-options-col-btn"><button ng-click="resetCamera()" title="Reset Camera" style="font-size: 11px;">Reset Camera</button></div></div><div class="vis-options-row" ng-hide="hideOptionsArr.indexOf(\'edm\') > -1"><h4><input type="checkbox" ng-model="allEdmSelect" ng-click="edmSelectAllClicked();" ng-show="edmDataArr.length > 0"> Electron Density Maps</h4><div ng-show="edmDataArr.length > 0" style="margin-bottom:5px;">View electron density maps for the entire structure <input type="checkbox" ng-model="edmFullView" ng-click="showFullEdmView();"/></div><div class="edmControlsRow" ng-repeat="edmRec in edmDataArr"><div ng-init="defaultSigmaVal = edmRec.data.valuesInfo.sigma; initialEdmVal = getEdmVal(edmRec, $index); hexPicker.color$index = edmRec.color.replace(\'0x\',\'#\')"><div class="edmChkBoxWrapper"><input ng-model="edmRec.show" ng-change="$parent.resetEDM(edmRec.show, $index, \'show\')" type="checkbox" title="Toggle show/hide"></div><div class="edmOptionsWrapper" style="font-weight: bold">{{edmRec.filename}}</div><div class="edmOptionsWrapper">&nbsp;[ <a href="javascript:void(0);" title="Resets the value to default" ng-click="$parent.edmRangeChanged(initialEdmVal, $index, edmRec, \'reset\')" type="checkbox">Reset Value</a><span ng-hide="edmRec.filename === \'2Fo-Fc\' || edmRec.filename === \'Fo-Fc(-ve)\' || edmRec.filename === \'Fo-Fc(+ve)\'">&nbsp;|&nbsp;<a href="javascript:void(0);" ng-click="$parent.resetEDM(initialEdmVal, $index, \'remove\')">Remove</a></span>&nbsp;|&nbsp;</div><div class="edmOptionsWrapper"><div class="edmChkBoxWrapper"><input type="checkbox" ng-model="edmRec.asSurface" ng-change="$parent.resetEDM(edmRec.asSurface, $index, \'asSurface\')" title="Toggle surface/wireframe"></div> Surface ]</div><div style="clear:both;"><input class="edmMapRangeSlider" id="edmRangeEle{{$index}}" step="0.1" type="range" min="{{getMinEdmVal(edmRec)}}" max="{{getMaxEdmVal(edmRec)}}" value="{{initialEdmVal}}" onchange="angular.element(this).scope().$parent.edmRangeChanged(this.value, angular.element(this).scope().$index, angular.element(this).scope().edmRec, \'range\')" ><input class="edmIsoValueInput" type="text" id="edmRangeInput{{$index}}" value="{{initialEdmVal}}" onchange="angular.element(this).scope().$parent.edmRangeChanged(this.value, angular.element(this).scope().$index, angular.element(this).scope().edmRec, \'input\')"><span style="float:left;padding-top: 2px;">&nbsp;rmsd&nbsp;&nbsp;</span><input class="edmColorpickerInput" type="text" colorpicker ng-model="hexPicker.color$index" ng-change="$parent.resetEDM(hexPicker.color$index, $index, \'color\')" onclick="angular.element(this).scope().$parent.adjustColorpickerPosition()"><div class="colorpickerPreviewBox" style="background-color:{{hexPicker.color$index}};">&nbsp;</div></div></div></div><div style="clear: both;"><input type="file" ng-model="selectedCCP4File" onchange="angular.element(this).scope().handleCCP4FileSelectFn(this)" style="float:left"><p class="help-block">Open CCP4 file from a local storage. Click on a HET group to view the map.</p></div></div><div class="vis-options-row" ng-show="showValidationsInForm && hideOptionsArr.indexOf(\'validations\') === -1"><h4>Validations</h4><div class="vis-options-col-first"><button ng-click="applyValidations()" title="Apply Validations">Apply Validations</button></div><div class="vis-options-col"><button ng-click="clearValidations()" title="Clear Validations">Clear Validations</button></div></div><div class="vis-options-row" style="margin-bottom:5px" ng-hide="hideOptionsArr.indexOf(\'annotations\') > -1"><h4>Sequence Annotations</h4><div class="vis-options-col-first"><select ng-model="selectedAnnotation" ng-options="annotation for annotation in annotationArr" ng-click="showAnnotationsDetailSelect()"><option value="">Select</option></select></div><div style="max-width:50%" class="vis-options-col" ng-show="annotationEntryArr.length > 0"><select style="max-width:100%" ng-model="selectedAnnotationEntry" ng-options="annotationEntry.label for annotationEntry in annotationEntryArr" ng-change="applyAnnotations()"><option value="">Select Annotation</option></select></div><div class="vis-options-col-btn"><button ng-click="clearAnnotations()" title="Clear Annotations" style="font-size: 11px;">Clear Annotations</button></div></div><div class="vis-options-row" ng-hide="hideOptionsArr.indexOf(\'molSurface\') > -1"><h4>Molecular Surface</h4><div class="vis-options-col-first" style="width:100%"><span style="font-size:12px;">Probe Radius :</span> <input class="edmColorpickerInput" style="float:none" ng-model="wrapped.molecularSurface.probeRadius">&nbsp;&nbsp;&nbsp;<span style="font-size:12px;">Density :</span> <input class="edmColorpickerInput" style="float:none" ng-model="wrapped.molecularSurface.density">&nbsp;&nbsp;&nbsp;<span style="font-size:12px;">Transparent :</span> <input type="checkbox" ng-model="wrapped.molecularSurface.isTransparent" ng-click="updateMolSurface()"></div><div class="vis-options-col"><select ng-model="wrapped.molecularSurface.coloringType" ng-options="colorType.label for colorType in wrapped.molecularSurface.coloringTypes"></select></div><div class="vis-options-col-btn"><button ng-click="updateMolSurface()" title="Update Molecule Surface" style="font-size: 11px;">Update</button></div><div class="vis-options-col-btn"><button ng-click="clearMolSurface()" title="Clear Molecule Surface" style="font-size: 11px;">Clear</button></div></div></div><div class="menuSlider2 slideable" ng-hide="hideControls == \'true\'" data-slide-property="top" slide-toggle="#visualization-options" expanded="{{expandControls}}">Controls</div>');
    }]),
    function() {
        angular.module("pdb.litemol.modelService", ["pdb.litemol.selectionService"]).service("modelService", ["selectionService", function(e) {
            var t = this;
            t.HetGroupInfoEntry = function() {
                function e(e, t, n, r, i) {
                    this.name = e, this.entityId = t, this.asymId = n, this.seqNumber = r, this.insCode = i
                }
                return e
            }(), t.ModelWrapper = function() {
                function t(t, n) {
                    this.model = t, this.molecule = n, this.Visualization = this.molecule.initObjects.Visualization, this.Themes = this.molecule.initObjects.Themes, this.MoleculeVisualization = this.molecule.initObjects.MoleculeVisualization, this.selection = new e.ModelSelectionHelper(this, n.app)
                }
                return Object.defineProperty(t.prototype, "queryContext", {
                    get: function() {
                        return this._queryContext ? this._queryContext : (this._queryContext = this.molecule.initObjects.Queries.QueryContext.ofStructure(this.model), this._queryContext)
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.executeQuery = function(e) {
                    try {
                        return void 0 === e ? void 0 : e(this.queryContext)
                    } catch (t) {
                        return void(window.console && console.log("Error executing query: " + t))
                    }
                }, t.prototype.getQuerySelection = function(e) {
                    var t = this.executeQuery(e);
                    return t && t.fragments.length ? new this.Visualization.MoleculeSelectionIndices(t.fragments[0].atomIndices, t.fragments[0].residueIndices) : new this.Visualization.MoleculeSelectionIndices([], [])
                }, t.prototype.applySelection = function(e, t) {
                    void 0 === t && (t = this.Visualization.MoleculeSelectionType.Select), this.visual && (this.visual.applySelection(e, t), this.molecule.app.scene.forceRender())
                }, t.prototype.applyQuerySelection = function(e, t) {
                    if (void 0 === t && (t = this.Visualization.MoleculeSelectionType.Select), this.visual) {
                        var n = this.getQuerySelection(e);
                        return this.visual.applySelection(n, t), this.molecule.app.scene.forceRender(), n
                    }
                }, t.prototype.clearSelection = function() {
                    this.visual && this.visual.applySelection(new this.Visualization.MoleculeSelectionIndices(this.model.atoms.indices, this.model.residues.indices), this.Visualization.MoleculeSelectionType.None) && this.molecule.app.scene.forceRender()
                }, t.prototype.focusSelection = function(e) {
                    for (var t = new THREE.Vector3, n = new THREE.Vector3, r = 0, i = this.model.atoms, o = i.x, a = i.y, s = i.z, l = 0, c = e.atoms; l < c.length; l++) {
                        var u = c[l];
                        t.x += o[u], t.y += a[u], t.z += s[u]
                    }
                    t = t.multiplyScalar(1 / e.atoms.length);
                    for (var d = 0, p = e.atoms; d < p.length; d++) {
                        var u = p[d];
                        n.set(o[u], a[u], s[u]), r = Math.max(r, t.distanceTo(n))
                    }
                    this.molecule.app.scene.camera.focusOnPoint(t, r)
                }, t.prototype.getTessalation = function() {
                    var e = this.model.atoms.count;
                    return 75e3 > e ? 3 : 25e4 > e ? 2 : 6e5 > e ? 1 : 0
                }, t.prototype.getVisualizationParams = function() {
                    return new this.MoleculeVisualization.MoleculeModelParameters("cartoons" === this.molecule.modeMolecule.id || "c-alpha" === this.molecule.modeMolecule.id ? this.MoleculeVisualization.MoleculeModelPolymerDisplayMode.Cartoons : "ballsAndSticks" === this.molecule.modeMolecule.id ? this.MoleculeVisualization.MoleculeModelPolymerDisplayMode.BallsAndSticks : this.MoleculeVisualization.MoleculeModelPolymerDisplayMode.None, "ballsAndSticks" === this.molecule.modeHET.id, "ballsAndSticks" === this.molecule.modeWaters.id, new this.MoleculeVisualization.Cartoons.CartoonsModelParameters(this.getTessalation(), "c-alpha" === this.molecule.modeMolecule.id ? this.MoleculeVisualization.Cartoons.CartoonsModelType.AlphaTrace : this.MoleculeVisualization.Cartoons.CartoonsModelType.Default), new this.MoleculeVisualization.BallsAndSticks.BallsAndSticksModelParameters(this.getTessalation()))
                }, t.prototype.getTheme = function(e) {
                    switch (void 0 === e || (this.molecule.coloringType = e), this.molecule.coloringType.id) {
                        case "uniform":
                            this.currentTheme = new this.Themes.RandomUniformColorTheme;
                            break;
                        case "residueName":
                            this.currentTheme = new this.Themes.DefaultPalleteResidueColorTheme(this.model);
                            break;
                        case "chainId":
                            this.currentTheme = new this.Themes.DefaultPalleteChainColorTheme(this.model);
                            break;
                        case "white":
                            this.currentTheme = new this.Themes.UniformColorTheme({
                                r: 1,
                                g: 1,
                                b: 1
                            })
                    }
                    return this.currentTheme
                }, t.prototype.updateVisual = function(e, t) {
                    void 0 === e && (e = !1), void 0 === t || (this.molecule.displayType = t.displayTypes, this.molecule.modeMolecule = t.displayModes, this.molecule.coloringType = t.coloringType, this.molecule.modeHET = t.displayModesHET, this.molecule.modeWaters = t.displayModeWaters);
                    var n;
                    switch (this.molecule.displayType.id) {
                        case "asym":
                            n = this.MoleculeVisualization.MoleculeModel.create(this.model, null, this.getTheme(), this.getVisualizationParams());
                            break;
                        case "symm":
                            n = this.MoleculeVisualization.SymmetryMoleculeModel.create(this.model, this.getTheme(), new this.MoleculeVisualization.SymmetryMoleculeModelParameters(this.getVisualizationParams()));
                            break;
                        case "assem":
                            n = this.MoleculeVisualization.AssemblyMoleculeModel.create(this.model, this.molecule.displayType().tag, this.getTheme(), this.getVisualizationParams())
                    }
                    var r = this.molecule.app;
                    e && r.resetCamera(), this.visual && r.scene.removeAndDisposeModel(this.visual, e), r.scene.addModel(n, e), this.visual = n, window.console && console.log("Model of '" + this.molecule.displayType.label + "' created ")
                }, t.prototype.clearVisual = function() {
                    this.visual && this.molecule.app.scene.removeAndDisposeModel(this.visual, !1), this.visual = null
                }, t
            }()
        }]), angular.module("pdb.litemol.selectionService", []).service("selectionService", function() {
            this.ModelSelectionHelper = function() {
                function e(e, t) {
                    this.model = e, this.app = t, this.extractVisual = null
                }
                return e.prototype.addSelection = function(e) {
                    e && this.model.applyQuerySelection(e, this.model.molecule.initObjects.Visualization.MoleculeSelectionType.Select)
                }, e.prototype.removeSelection = function(e) {
                    e && this.model.applyQuerySelection(e, this.model.molecule.initObjects.Visualization.MoleculeSelectionType.None)
                }, e.prototype.clearSelection = function() {
                    this.model.clearSelection()
                }, e.prototype.getTessalation = function(e) {
                    return 1e3 > e ? 3 : 25e3 > e ? 2 : 1e5 > e ? 1 : 0
                }, e.prototype.extractSelection = function(e, t) {
                    this.extractVisual && this.removeExtractedSelection(!1);
                    var n = this.model.getQuerySelection(e),
                        r = this.model.currentTheme;
                    r || (r = this.model.getTheme());
                    var i = this.model.molecule.initObjects.MoleculeVisualization.BallsAndSticks.BallsAndSticksModel.create(this.model.model, n.atoms, r, new this.model.molecule.initObjects.MoleculeVisualization.BallsAndSticks.BallsAndSticksModelParameters(this.getTessalation(n.atoms.length)));
                    i.includeInCentroidComputation = !1, t && this.model.visual && this.model.visual.updateVisibility(!1), this.app.scene.addModel(i, !1), this.extractVisual = i
                }, e.prototype.removeExtractedSelection = function(e) {
                    void 0 === e && (e = !0), this.extractVisual && (this.app.scene.removeAndDisposeModel(this.extractVisual), this.extractVisual = null), e && this.model.visual && this.model.visual.updateVisibility(!0)
                }, e.prototype.focusSelection = function(e) {
                    var t = this.model.getQuerySelection(e);
                    this.model.focusSelection(t)
                }, e.prototype.applyTheme = function(e) {
                    this.extractVisual && this.extractVisual.applyTheme(e)
                }, e
            }()
        })
    }(),
    function() {
        angular.module("pdb.litemol.molecularSurfaceService", []).service("molecularSurfaceService", function() {
            var e = this;
            e.__extends = this && this.__extends || function(e, t) {
                function n() {
                    this.constructor = e
                }
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }, e.MolecularSurfaceThemeBase = function() {
                function e() {
                    this.isTransparent = !1
                }
                return e.prototype.getSurfaceTransparency = function() {
                    return this.isTransparent ? {
                        isTransparent: !0,
                        opacity: .33,
                        writeDepth: !1
                    } : {
                        isTransparent: !1,
                        opacity: .33,
                        writeDepth: !1
                    }
                }, e
            }(), e.MolecularSurfaceTheme = function(t) {
                function n() {
                    t.call(this), this.color = {
                        r: .5,
                        g: .5,
                        b: .5
                    }
                }
                return e.__extends(n, t), n.prototype.setWireframeColor = function(e) {
                    e.r = this.color.r, e.g = this.color.g, e.b = this.color.b
                }, n.prototype.setSurfaceColor = function(e) {
                    e.r = this.color.r, e.g = this.color.g, e.b = this.color.b
                }, n
            }(e.MolecularSurfaceThemeBase), e.MolecularSurfaceVertexColorByAtomTypeTheme = function(t) {
                function n(e, n) {
                    t.call(this), this.molecule = e, this.initObjects = n, this.elementSymbols = e.atoms.elementSymbol
                }
                return e.__extends(n, t), n.prototype.setAtomColor = function(e, t) {
                    var n = this.initObjects.Themes.getDefaultElementColor(this.elementSymbols[e]);
                    t.r = n.r, t.g = n.g, t.b = n.b
                }, n
            }(e.MolecularSurfaceThemeBase), e.MolecularSurfaceVertexColorByAuthAsymIdTheme = function(t) {
                function n(e, n) {
                    t.call(this), this.molecule = e, this.initObjects = n, this.colorIndex = 0, this.colors = new Map, this.chainIndex = e.atoms.chainIndex, this.names = e.chains.authAsymId
                }
                return e.__extends(n, t), n.prototype.setAtomColor = function(e, t) {
                    var n = this.names[this.chainIndex[e]],
                        r = this.colors.get(n);
                    r || (this.colorIndex = (this.colorIndex + 1) % this.initObjects.Themes.DefaultPallete.length | 0, r = this.initObjects.Themes.DefaultPallete[this.colorIndex], this.colors.set(n, r)), t.r = r.r, t.g = r.g, t.b = r.b
                }, n
            }(e.MolecularSurfaceThemeBase), e.MolecularSurfaceVertexColorByResidueNameTheme = function(t) {
                function n(e, n) {
                    t.call(this), this.molecule = e, this.initObjects = n, this.colorIndex = 0, this.colors = new Map, this.residueIndex = e.atoms.residueIndex, this.names = e.residues.name
                }
                return e.__extends(n, t), n.prototype.setAtomColor = function(e, t) {
                    var n = this.names[this.residueIndex[e]],
                        r = this.colors.get(n);
                    r || (this.colorIndex = (this.colorIndex + 1) % this.initObjects.Themes.DefaultPallete.length | 0, r = this.initObjects.Themes.DefaultPallete[this.colorIndex], this.colors.set(n, r)), t.r = r.r, t.g = r.g, t.b = r.b
                }, n
            }(e.MolecularSurfaceThemeBase), e.createVdwRadii = function() {
                var e = {
                        H: 1,
                        D: 1,
                        He: 1.75,
                        Li: 1.82,
                        Be: 1.53,
                        B: .9,
                        C: 1.61,
                        N: 1.55,
                        O: 1.45,
                        F: 1.75,
                        Ne: 1.75,
                        Na: 2.27,
                        Mg: 1.73,
                        Al: 1.84,
                        Si: 1.8,
                        P: 1.9,
                        S: 1.77,
                        Cl: 1.75,
                        Ar: 1.75,
                        K: 2.75,
                        Ca: 2.31,
                        Sc: 1.8,
                        Ti: 1.8,
                        V: 1.8,
                        Cr: 1.8,
                        Mn: 1,
                        Fe: 1.7,
                        Co: 1.8,
                        Ni: 1.8,
                        Cu: 1.8,
                        Zn: 1.8,
                        Ga: 1.8,
                        Ge: 1.75,
                        As: 1.85,
                        Se: 1.9,
                        Br: 1.85,
                        Kr: 1.75,
                        Rb: 1.8,
                        Sr: 2.49,
                        Y: 1.8,
                        Zr: 1.8,
                        Nb: 1.8,
                        Mo: 1.8,
                        Tc: 1.8,
                        Ru: 1.34,
                        Rh: 1.49,
                        Pd: 1.8,
                        Ag: 1.8,
                        Cd: 1.8,
                        In: 1.8,
                        Sn: 1.8,
                        Sb: 1.75,
                        Te: 1,
                        I: 1.85,
                        Xe: 1.75,
                        Cs: 1.8,
                        Ba: 1.8,
                        La: 1.8,
                        Ce: 1.8,
                        Pr: 1.8,
                        Nd: 1.8,
                        Pm: 1.8,
                        Sm: 1.8,
                        Eu: 1.8,
                        Gd: 1.8,
                        Tb: 1.8,
                        Dy: 1.8,
                        Ho: 1.8,
                        Er: 1.8,
                        Tm: 1.8,
                        Yb: 1.8,
                        Lu: 1.8,
                        Hf: 1.59,
                        Ta: 1.8,
                        W: 1.39,
                        Re: 1.8,
                        Os: 1.8,
                        Ir: 1.47,
                        Pt: 1,
                        Au: 1.8,
                        Hg: 1,
                        Tl: 1.8,
                        Pb: 1.8,
                        Bi: 1.8,
                        Po: 1.75,
                        At: 1.75,
                        Rn: 1.75,
                        Fr: 1.8,
                        Ra: 1.8,
                        Ac: 1.8,
                        Th: 1.8,
                        Pa: 1.8,
                        U: 1.8,
                        Np: 1.8,
                        Pu: 1.8,
                        Am: 1.8,
                        Cm: 1.8,
                        Bk: 1.8,
                        Cf: 1.8,
                        Es: 1.8,
                        Fm: 1.8,
                        Md: 1.8,
                        No: 1.8,
                        Lr: 1.8,
                        Rf: 1.8,
                        Db: 1.8,
                        Sg: 1.8,
                        Bh: 1.8,
                        Hs: 1.8,
                        Mt: 1.8
                    },
                    t = new Map;
                for (var n in e) t.set(n, e[n]);
                return t
            }, e.VDWRadii = e.createVdwRadii(), e.MolecularSurfaceWrapper = function() {
                function t(e, t, n) {
                    var r = this;
                    this.initObjects = n, this.molecule = e, this.app = t, this.coloringTypes = [{
                        id: "chainId",
                        label: "Color by Chain ID"
                    }, {
                        id: "residueName",
                        label: "Color by Residue Name"
                    }, {
                        id: "element",
                        label: "Color by Element"
                    }, {
                        id: "uniform",
                        label: "Random Uniform Color"
                    }], this.coloringType = this.coloringTypes[0], this.probeRadius = 1.4, this.density = 1.1, this.isTransparent = !1, this.visual = null, this.isShown = !1;
                    LiteMol.Utils.debounce(function() {
                        return r.updateTheme()
                    }, 10)
                }
                return t.prototype.getTheme = function() {
                    var t;
                    switch (this.coloringType.id) {
                        case "chainId":
                            t = new e.MolecularSurfaceVertexColorByAuthAsymIdTheme(this.molecule.model.ModelWrapper.model, this.initObjects);
                            break;
                        case "residueName":
                            t = new e.MolecularSurfaceVertexColorByResidueNameTheme(this.molecule.model.ModelWrapper.model, this.initObjects);
                            break;
                        case "element":
                            t = new e.MolecularSurfaceVertexColorByAtomTypeTheme(this.molecule.model.ModelWrapper.model, this.initObjects);
                            break;
                        case "uniform":
                            var n = new e.MolecularSurfaceTheme;
                            n.color = this.initObjects.Themes.getRandomColor(), t = n
                    }
                    return t.isTransparent = this.isTransparent, t
                }, t.prototype.clear = function() {
                    this.visual && (this.app.scene.removeAndDisposeModel(this.visual), this.visual = null, this.isShown = !1)
                }, t.prototype.update = function() {
                    this.visual && this.app.scene.removeAndDisposeModel(this.visual), this.updateTheme();
                    for (var t = this.molecule.model.ModelWrapper.model, n = t.atoms.entityIndex, r = t.entities.entityType, i = this.initObjects.Structure.EntityType.Polymer, o = LiteMol.Utils.ChunkedArrayBuilder.forIndices(t.atoms.count), a = 0, s = t.atoms.count; s > a; a++) r[n[a]] === i && o.add(a);
                    var l = this.getTheme(),
                        c = this.initObjects.MoleculeVisualization.Surface.MolecularSurfaceModel.create(this.molecule.model.ModelWrapper.model, o.compact(), {
                            atomRadii: e.VDWRadii,
                            defaultAtomRadius: 1,
                            density: +this.density,
                            probeRadius: +this.probeRadius,
                            smoothingIterations: 3
                        }, l);
                    this.app.scene.addModel(c, !1), this.visual = c, this.isShown = !0
                }, t.prototype.updateTheme = function() {
                    this.visual && (this.visual.applyTheme(this.getTheme()), this.app.scene.forceRender())
                }, t
            }()
        })
    }(),
    function() {
        angular.module("pdb.litemol.moleculeService", ["pdb.litemol.modelService", "pdb.litemol.validationService", "pdb.litemol.annotationService", "pdb.litemol.hetGroupsService", "pdb.litemol.electronDensityService", "pdb.litemol.ligandInteractionService", "pdb.litemol.molecularSurfaceService"]).service("moleculeService", ["modelService", "validationService", "annotationService", "hetGroupsService", "electronDensityService", "ligandInteractionService", "molecularSurfaceService", function(modelService, validationService, annotationService, hetGroupsService, electronDensityService, ligandInteractionService, molecularSurfaceService) {
            this.MoleculeWrapper = function() {
                function MoleculeWrapper(e, t, n, r) {
                    void 0 === n && (n = !1), this.molecule = e, this.app = t, this.initObjects = r, this.coloringTypes = [{
                        id: "chainId",
                        label: "Color by Chain ID"
                    }, {
                        id: "residueName",
                        label: "Color by Residue Name"
                    }, {
                        id: "uniform",
                        label: "Random Uniform Color"
                    }, {
                        id: "white",
                        label: "All White"
                    }], this.modeMoleculeList = MoleculeWrapper.displayModesMolecule, this.modeHETList = MoleculeWrapper.displayModesHET, this.modeWatersList = MoleculeWrapper.displayModesWater, this.displayTypes = [{
                        id: "asym",
                        label: "Asymetric Unit",
                        tag: ""
                    }], this.coloringType = this.coloringTypes[0], this.displayType = this.displayTypes[0], this.modeMolecule = MoleculeWrapper.displayModesMolecule[0], this.modeHET = MoleculeWrapper.displayModesHET[1], this.modeWaters = MoleculeWrapper.displayModesHET[0], this.query = void 0, this.modelIndex = "1", this._modelIndex = 0, this._playback = void 0, this.model = {}, this._hetGroupsInfo = null;
                    var i = e.models[0];
                    if (i.assemblyInfo)
                        for (var o = 0, a = i.assemblyInfo.assemblies; o < a.length; o++) {
                            var s = a[o];
                            this.displayTypes.push({
                                id: "assem",
                                label: "Assembly " + s.name,
                                tag: s.name
                            })
                        }
                    i.symmetryInfo && "P 1" !== i.symmetryInfo.spacegroupName && i.symmetryInfo.cellSize[0] > 1 && i.symmetryInfo.cellSize[1] > 1 && i.symmetryInfo.cellSize[2] > 1 && this.displayTypes.push({
                        id: "symm",
                        label: "Symmetry from _444 to _666",
                        tag: ""
                    }), this.model.ModelWrapper = new modelService.ModelWrapper(i, this), n || (this.sequenceAnnotations = new annotationService.SequenceAnnotation(e.id, t, this), this.validationReport = new validationService.ValidationReport(e.id, t, this), this.hetGroups = new hetGroupsService.HetGroups(t, this, r), this.ligandInteractions = new ligandInteractionService.LigandInteractions(t, this, r), this.electronDensity = new electronDensityService.ElectronDensityWrapper(this, t), this.molecularSurface = new molecularSurfaceService.MolecularSurfaceWrapper(this, t, this.initObjects))
                }
                return MoleculeWrapper.prototype.updateVisual = function(e, t) {
                    void 0 === e && (e = !1), this.model.ModelWrapper.updateVisual(e, t)
                }, MoleculeWrapper.prototype.previousModel = function() {
                    var e = this._modelIndex - 1;
                    0 > e && (e += this.molecule.models.length), this._modelIndex = e, this.modelIndex = (e + 1).toString(), this.modelIndexChanged()
                }, MoleculeWrapper.prototype.nextModel = function() {
                    this._modelIndex = (this._modelIndex + 1) % this.molecule.models.length | 0, this.modelIndex = (this._modelIndex + 1).toString(), this.modelIndexChanged()
                }, MoleculeWrapper.prototype.nextModel1 = function() {
                    this._modelIndex = (this._modelIndex + 1) % this.molecule.models.length | 0, this.modelIndex = (this._modelIndex + 1).toString(), this.modelIndexChanged1()
                }, MoleculeWrapper.prototype.play = function() {
                    var e = this;
                    void 0 !== this._playback && clearInterval(this._playback), this._playback = setInterval(function() {
                        return e.nextModel()
                    }, 150)
                }, MoleculeWrapper.prototype.stop = function() {
                    void 0 !== this._playback && clearInterval(this._playback), this._playback = void 0
                }, MoleculeWrapper.prototype.modelIndexChanged = function() {
                    this.model.ModelWrapper.clearVisual();
                    var e = new modelService.ModelWrapper(this.molecule.models[this._modelIndex], this);
                    e.updateVisual(), this.model.ModelWrapper = e, this.model.ModelWrapper.molecule.sequenceAnnotations.annotations[0].update()
                }, MoleculeWrapper.prototype.modelIndexChanged1 = function() {
                    this.model.ModelWrapper.clearVisual();
                    var e = new modelService.ModelWrapper(this.molecule.models[this._modelIndex], this);
                    e.updateVisual1(), this.model.ModelWrapper = e
                }, MoleculeWrapper.prototype.updateColoring = function(e) {
                    var t = this.model.ModelWrapper.visual;
                    if (!t) return void(window.console && console.log("Nothing to color."));
                    var n = this.model.ModelWrapper.getTheme(e);
                    t.applyTheme(n), window.console && console.log("Theme applied"), this.app.scene.forceRender()
                }, MoleculeWrapper.prototype.applyTheme = function(e) {
                    var t = this.model.ModelWrapper.visual;
                    t && (t.applyTheme(e), this.app.scene.forceRender())
                }, MoleculeWrapper.prototype.getQuery = function() {
                    try {
                        if (void 0 === this.query) return void 0;
                        var queryText = this.query.trim() + ".union()",
                            q;
                        return eval("with (LiteMol.Structure.Queries.Generators) { q = " + queryText + "; }"), q.compile()
                    } catch (e) {
                        return void(window.console && console.log("Error compiling query: " + e))
                    }
                }, MoleculeWrapper.prototype.addSelection = function() {
                    this.model.ModelWrapper.selection.addSelection(this.getQuery())
                }, MoleculeWrapper.prototype.removeSelection = function() {
                    this.model.ModelWrapper.selection.removeSelection(this.getQuery())
                }, MoleculeWrapper.prototype.clearSelection = function(e) {
                    void 0 === e && (e = !0), this.model.ModelWrapper.selection.clearSelection()
                }, MoleculeWrapper.prototype.extractSelection = function() {
                    this.model.ModelWrapper.selection.extractSelection(this.getQuery())
                }, MoleculeWrapper.prototype.removeExtractedSelection = function() {
                    this.model.ModelWrapper.selection.removeExtractedSelection()
                }, MoleculeWrapper.prototype.focusSelection = function() {
                    this.model.ModelWrapper.selection.focusSelection(this.getQuery())
                }, MoleculeWrapper.prototype.clear = function() {
                    void 0 !== this._playback && clearInterval(this._playback), this.model.ModelWrapper.clearVisual(), this.hetGroups.clear(), this.ligandInteractions.clear(), this.electronDensity.clear()
                }, Object.defineProperty(MoleculeWrapper.prototype, "hetGroupsInfo", {
                    get: function() {
                        if (this._hetGroupsInfo) return this._hetGroupsInfo;
                        var e = this.initObjects.Queries.Generators.hetGroups().compile(),
                            t = this.initObjects.Queries.QueryContext.ofStructure(this.molecule.models[0]),
                            n = e(t);
                        return this._hetGroupsInfo = n.fragments.map(function(e) {
                            var t = e.atomIndices[0],
                                n = e.context.structure.atoms,
                                r = e.context.structure.residues,
                                i = e.context.structure.chains,
                                o = n.residueIndex[t];
                            return new modelService.HetGroupInfoEntry(r.authName[o], r.entityId[o], i.authAsymId[r.chainIndex[o]], r.authSeqNumber[o], r.insCode[o])
                        }), this._hetGroupsInfo
                    },
                    enumerable: !0,
                    configurable: !0
                }), MoleculeWrapper.displayModesMolecule = [{
                    id: "cartoons",
                    label: "Cartoons"
                }, {
                    id: "c-alpha",
                    label: "C-alpha Trace"
                }, {
                    id: "ballsAndSticks",
                    label: "Balls and Sticks"
                }, {
                    id: "none",
                    label: "No Polymer"
                }], MoleculeWrapper.displayModesHET = [{
                    id: "no",
                    label: "No HET"
                }, {
                    id: "ballsAndSticks",
                    label: "Balls and Sticks"
                }], MoleculeWrapper.displayModesWater = [{
                    id: "no",
                    label: "No Water"
                }, {
                    id: "ballsAndSticks",
                    label: "Balls and Sticks"
                }], MoleculeWrapper
            }()
        }])
    }(),
    function() {
        angular.module("pdb.litemol.annotationService", []).service("annotationService", ["$http", function(e) {
            var t = this;
            t.getInsCode = function(e) {
                return 0 === e.length ? null : e
            }, t.SequenceAnnotationEntry = function() {
                function e(e, n, r, i) {
                    this.id = e, this.source = n, this.data = r, this.sel = null, this.label = e + ": " + r.identifier, this.query = i.Queries.Generators.or.apply(null, this.data.mappings.map(function(e) {
                        return i.Queries.Generators.sequence(e.entity_id.toString(), e.struct_asym_id, {
                            seqNumber: e.start.residue_number,
                            insCode: t.getInsCode(e.start.author_insertion_code)
                        }, {
                            seqNumber: e.end.residue_number,
                            insCode: t.getInsCode(e.end.author_insertion_code)
                        })
                    })).union().compile()
                }
                return e
            }(), t.SequenceAnnotationWrapper = function() {
                function e(e, n, r) {
                    this.id = e, this.annotation = r, this.initObjects = this.annotation.initObjects, this.current = void 0, this.entries = Object.keys(n).map(function(i) {
                        return new t.SequenceAnnotationEntry(i, e, n[i], r.initObjects)
                    })
                }
                return e.prototype.update = function(e) {
                    void 0 === e || (this.current = e);
                    var t = this.current;
                    if (t) {
                        var n = this.annotation.molecule.model.ModelWrapper;
                        n.clearSelection(), t.sel ? n.applySelection(t.sel, this.initObjects.Visualization.MoleculeSelectionType.Select) : t.sel = n.applyQuerySelection(this.current.query)
                    }
                }, e
            }(), t.SequenceAnnotation = function() {
                function n(e, t, n) {
                    this.pdbId = e, this.app = t, this.molecule = n, this.annotations = [], this.current = void 0, this.state = "empty", this.initObjects = this.molecule.initObjects, this.download()
                }
                return n.prototype.addAnnotations = function(e, n) {
                    var r = this;
                    if (n = n[e.toLowerCase()], !n) return void(this.state = "empty");
                    var i = ["Pfam", "InterPro", "CATH", "SCOP", "UniProt"].filter(function(e) {
                        return !!n[e]
                    }).map(function(e) {
                        return new t.SequenceAnnotationWrapper(e, n[e], r)
                    }).filter(function(e) {
                        return e.entries.length > 0
                    });
                    this.annotations = i, this.state = "available"
                }, n.prototype.download = function() {
                    var t = this;
                    this.clear(), this.state = "downloading", e({
                        url: "//www.ebi.ac.uk/pdbe/api/mappings/" + this.pdbId.toLowerCase(),
                        method: "GET",
                        cache: !0
                    }).then(function(e) {
                        t.addAnnotations(t.pdbId, e.data)
                    }, function(e) {
                        t.state = "failed", window.console && console.log("Failed to download sequence annotations.")
                    })
                }, n.prototype.clearSelection = function() {
                    this.molecule.model.ModelWrapper.clearSelection();
                    for (var e = 0, t = this.annotations; e < t.length; e++) {
                        var n = t[e];
                        n.current = void 0
                    }
                }, n.prototype.clear = function() {
                    this.annotations = [], this.current = void 0, this.state = "empty"
                }, n.prototype.modelChanged = function() {
                    "available" === this.state && this.current && this.current.update()
                }, n
            }()
        }])
    }(),
    function() {
        angular.module("pdb.litemol.validationService", []).service("validationService", ["$http", function(e) {
            var t = this;
            t.__extends = this && this.__extends || function(e, t) {
                function n() {
                    this.constructor = e
                }
                for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
            }, t.ValidationReportInfo = function() {
                function e(t, n) {
                    this.pdbId = t, this.data = n;
                    for (var r = {}, i = 0; i < n.length; i++) {
                        for (var o = n[i], a = {}, s = 0, l = o.chains; s < l.length; s++) {
                            for (var c = l[s], u = {}, d = 0, p = c.models; d < p.length; d++) {
                                for (var h = p[d], m = {}, f = 0, g = h.residues; f < g.length; f++) {
                                    var y = g[f],
                                        v = e.getResidueId(y.residue_number, y.author_insertion_code),
                                        b = m[v];
                                    b ? (b.residues.push(y), b.numIssues = Math.max(b.numIssues, y.outlier_types.length)) : m[v] = {
                                        residues: [y],
                                        numIssues: y.outlier_types.length
                                    }
                                }
                                u[h.model_id.toString()] = m
                            }
                            a[c.struct_asym_id] = u
                        }
                        r[o.entity_id.toString()] = a
                    }
                    this.map = r
                }
                return e.getResidueId = function(e, t) {
                    var n = e.toString();
                    return 0 !== (t || "").length && (n += " " + t), n
                }, e.prototype.getEntry = function(e, t, n, r) {
                    var i = this.map[t];
                    return i && (i = i[n]) ? (i = i[e], i ? i[r] : void 0) : void 0
                }, e
            }(), t.ValidationReportTheme = function(e) {
                function n(t, n) {
                    e.call(this), this.info = t, this.highlightColor = {
                        r: 1,
                        g: 1,
                        b: 1
                    }, this.selectionColor = {
                        r: 0,
                        g: 1,
                        b: 1
                    }, this.modelId = n.modelId, this.seqNumber = n.residues.seqNumber, this.insertionCode = n.residues.insCode, this.asymId = n.residues.asymId, this.entityId = n.residues.entityId, this.isHet = n.residues.isHet, this.atomResidueIndex = n.atoms.residueIndex
                }
                return t.__extends(n, e), n.prototype.getResidueId = function(e) {
                    return t.ValidationReportInfo.getResidueId(this.seqNumber[e], this.insertionCode[e])
                }, n.prototype.setColor = function(e, t) {
                    var r;
                    if (this.isHet[e]) r = n.colorHet;
                    else {
                        var i = this.info.getEntry(this.modelId, this.entityId[e], this.asymId[e], this.getResidueId(e));
                        if (i) switch (i.numIssues) {
                            case 0:
                                r = n.color0;
                                break;
                            case 1:
                                r = n.color1;
                                break;
                            case 2:
                                r = n.color2;
                                break;
                            default:
                                r = n.color3
                        } else r = n.color0
                    }
                    t.r = r.r, t.g = r.g, t.b = r.b
                }, n.prototype.setAtomColor = function(e, t) {
                    this.setColor(this.atomResidueIndex[e], t)
                }, n.prototype.setBondColor = function(e, t) {
                    this.setColor(e, t)
                }, n.prototype.setResidueColor = function(e, t) {
                    this.setColor(e, t)
                }, n.colorHet = {
                    r: .8,
                    g: .8,
                    b: .8
                }, n.color0 = {
                    r: 0,
                    g: 1,
                    b: 0
                }, n.color1 = {
                    r: 1,
                    g: 1,
                    b: 0
                }, n.color2 = {
                    r: 1,
                    g: .5,
                    b: 0
                }, n.color3 = {
                    r: 1,
                    g: 0,
                    b: 0
                }, n
            }(LiteMol.Visualization.Themes.BasicThemeBase), t.ValidationReport = function() {
                function n(e, t, n) {
                    this.pdbId = e, this.app = t, this.molecule = n, this.state = "empty", this.isActive = !1, this.download()
                }
                return n.prototype.process = function(e) {
                    if (e = e[this.pdbId.toLowerCase()], !e) return void(this.state = "empty");
                    try {
                        this.info = new t.ValidationReportInfo(this.pdbId, e.molecules)
                    } catch (n) {
                        return window.console && console.log("Error parsing validation info: " + n), void(this.state = "empty")
                    }
                    this.theme = new t.ValidationReportTheme(this.info, this.molecule.model.ModelWrapper.model), this.state = "available"
                }, n.prototype.download = function() {
                    var t = this;
                    this.clear(), this.state = "downloading", e({
                        url: "//www.ebi.ac.uk/pdbe/api/validation/residuewise_outlier_summary/entry/" + this.pdbId.toLowerCase(),
                        method: "GET",
                        cache: !0
                    }).then(function(e) {
                        t.process(e.data)
                    }, function(e) {
                        t.state = "failed", window.console && console.log("Failed to download the validation report.")
                    })
                }, n.prototype.resetTheme = function() {
                    this.molecule.updateColoring(), window.console && console.log("Coloring reset to a new theme."), this.isActive = !1
                }, n.prototype.applyTheme = function() {
                    this.molecule.sequenceAnnotations.clearSelection(), this.molecule.applyTheme(this.theme), window.console && console.log("Validation coloring applied."), this.isActive = !0
                }, n.prototype.clear = function() {
                    this.state = "empty"
                }, n.prototype.modelChanged = function() {
                    "available" === this.state && (this.theme = new this.ValidationReportTheme(this.info, this.molecule.model().model), this.isActive && this.applyTheme())
                }, n
            }()
        }])
    }(),
    function() {
        "use strict";
        angular.module("pdb.prints", ["pdb.prints.filters", "pdb.prints.services"]).directive("pdbPrints", ["printsService", "$compile", "$filter", function(e, t, n) {
            return {
                restrict: "EAC",
                scope: {
                    pdbIds: "=",
                    settings: "@"
                },
                link: function(r, i, o) {
                    r.config = {
                        picstype: "jslogos",
                        orientation: "horizontal",
                        size: 36,
                        color: "embl_green",
                        targetWindow: "_self",
                        domainUrl: "//www.ebi.ac.uk/pdbe",
                        hideLogo: []
                    }, "undefined" != typeof r.settings && r.settings && angular.extend(r.config, JSON.parse(r.settings));
                    for (var a = [], s = 20, l = r.pdbIds.slice(); l.length > 0;) a.push(l.splice(0, s));
                    angular.forEach(a, function(o, a) {
                        var s = angular.element(document.getElementsByClassName("pdbprints_" + o[0]));
                        s.length && s.html("PDBprints loading....");
                        e.getPrintsData(o).then(function(e) {
                            angular.isUndefined(e.responseHeader.error) ? !angular.isUndefined(e.grouped.pdb_id.groups) && e.grouped.pdb_id.groups && angular.forEach(e.grouped.pdb_id.groups, function(e, o) {
                                var a = n("dataModelFilter")(e, r.config),
                                    s = "<pdb-logos logo-data='" + JSON.stringify(a) + '\' config-data="config" click-action="' + r.clickAction + '"></pdb-logos>',
                                    l = t(s)(r),
                                    c = angular.element(i[0].querySelector(".pdbprints_" + a.PDBeLogo[0]));
                                c.length ? c.html("").append(l) : i.append(l)
                            }) : window.console && console.log("Error data in API response. Error: " + e.responseHeader.error)
                        }, function(e) {
                            window.console && console.log("API request failed. Error: " + e)
                        })
                    })
                }
            }
        }]).directive("pdbLogos", ["printsService", "$filter", function(e, t) {
            return {
                restrict: "EA",
                scope: {
                    logoData1: "@logoData",
                    config: "=configData"
                },
                templateUrl: "template/prints/pdbLogos.html",
                link: function(e, t, n) {
                    e.logoData = JSON.parse(e.logoData1), e.categories = ["PrimaryCitation", "Taxonomy", "Expressed", "Experimental", "Protein", "NucleicAcid", "Ligands"], e.categoryUrl = ["/citations", "/analysis", "/analysis", "/experiment", "/analysis", "/analysis", "/ligands"]
                }
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("pdb.prints.filters", []).filter("dataModelFilter", function() {
            return function(e, t) {
                var n = "",
                    r = {
                        PDBeLogo: [],
                        PrimaryCitation: [],
                        Protein: [],
                        Ligands: [],
                        NucleicAcid: [],
                        Expressed: [],
                        Experimental: [],
                        Taxonomy: []
                    },
                    i = !1,
                    o = "",
                    a = !1,
                    s = "",
                    l = "",
                    c = !1;
                if (angular.forEach(e.doclist.docs, function(t, u) {
                        if (n = t.pdb_id, r.PDBeLogo[0] = n, !angular.isUndefined(t.citation_year) && t.citation_year ? r.PrimaryCitation[0] = "published" : r.PrimaryCitation[0] = "unpublished", !angular.isUndefined(t.number_of_protein_chains) && t.number_of_protein_chains ? r.Protein[0] = "present" : r.Protein[0] = "absent", !angular.isUndefined(t.number_of_bound_entities) && t.number_of_bound_entities ? r.Ligands[0] = "present" : r.Ligands[0] = "absent", !angular.isUndefined(t.number_of_RNA_chains) && t.number_of_RNA_chains || !angular.isUndefined(t.number_of_DNA_chains) && t.number_of_DNA_chains ? r.NucleicAcid[0] = "present" : r.NucleicAcid[0] = "absent", !angular.isUndefined(t.sample_preparation_method) && t.sample_preparation_method) switch ("" === o && (o = t.sample_preparation_method), t.sample_preparation_method !== o && (i = !0), t.sample_preparation_method) {
                            case "Engineered":
                                r.Expressed[0] = "expressed";
                                break;
                            case "Synthetic":
                                r.Expressed[0] = "synthetic";
                                break;
                            case "Natural":
                                r.Expressed[0] = "purified";
                                break;
                            default:
                                r.Expressed[0] = "other"
                        } else {
                            var d = "",
                                p = new RegExp("Synthetic construct", "i");
                            !angular.isUndefined(t.entry_organism_scientific_name) && p.test(t.entry_organism_scientific_name) ? r.Expressed[0] = d = "synthetic" : r.Expressed[0] = "CGIlogoUnknown", r.Expressed[0] !== o && (i = !0, d = "other"), "" === o && (o = d), e.doclist.docs.length > 1 && r.Expressed[1] !== o && (i = !0)
                        }!angular.isUndefined(t.experimental_method) && t.experimental_method ? 1 === t.experimental_method.length ? "x-ray diffraction" === t.experimental_method[0].toLowerCase() ? (r.Experimental[0] = "xray", "y" !== t.experiment_data_available && (r.Experimental[0] = "xrayNoData")) : "solution nmr" === t.experimental_method[0].toLowerCase() || "solid-state nmr" === t.experimental_method[0].toLowerCase() ? (r.Experimental[0] = "nmr", "y" !== t.experiment_data_available && (r.Experimental[0] = "nmrNoData")) : "electron microscopy" === t.experimental_method[0].toLowerCase() ? (r.Experimental[0] = "em", "y" === t.experiment_data_available || t.emdb_id || (r.Experimental[0] = "emNoData")) : r.Experimental[0] = "other" : (r.Experimental[0] = "hybrid", "y" !== t.experiment_data_available && (r.Experimental[0] = "hybridNoData")) : r.Experimental[0] = "CGIlogoUnknown";
                        var h = {
                            Bacteria: "bacteria",
                            Archaea: "archaea",
                            Eukaryota: "eukaryote",
                            Dinophyceae: "algae",
                            Embryophyta: "plant",
                            Streptophyta: "plant",
                            Fungi: "fungi",
                            Ascomycota: "fungi",
                            "Saccharomyces cerevisiae": "yeast",
                            Saccharomyces: "yeast",
                            Drosophila: "fly",
                            "Gallus gallus": "chicken",
                            "Homo sapiens": "human",
                            "Sus scrofa": "pig",
                            "Bos taurus": "cow",
                            "Mus musculus": "mouse",
                            Rattus: "rat",
                            Rat: "rat",
                            Viruses: "virus",
                            Mammalia: "mammal"
                        };
                        if (!angular.isUndefined(typeof t.organism_synonyms) && t.organism_synonyms && (c = !0, angular.forEach(t.organism_synonyms, function(e, t) {
                                return e in h ? ("" === s && (s = e), s !== e && (a = !0), r.Taxonomy[0] = h[e], !1) : void 0
                            }), r.Taxonomy[0] || (r.Taxonomy[0] = "other")), !angular.isUndefined(t.entry_organism_scientific_name) && t.entry_organism_scientific_name) {
                            if (l = t.entry_organism_scientific_name, t.entry_organism_scientific_name.length > 1)
                                if (2 === t.entry_organism_scientific_name.length) {
                                    var m = t.entry_organism_scientific_name[0].toLowerCase(),
                                        f = t.entry_organism_scientific_name[1].toLowerCase(),
                                        g = m.split("|"),
                                        y = f.split("|");
                                    m === f || g[1] && y[1] && g[1] === y[1] || (a = !0)
                                } else a = !0;
                            var p = new RegExp("Synthetic construct", "i");
                            p.test(t.entry_organism_scientific_name) && (r.Taxonomy[0] = "artificial")
                        }
                    }), i && (r.Expressed[0] = "multiple"), "synthetic" === r.Expressed[1]) {
                    var u = new RegExp("Synthetic construct", "i");
                    ("" === l || u.test(l)) && (r.Taxonomy[0] = "artificial", c && (r.Taxonomy[0] = "other"))
                }
                return a && (r.Taxonomy[0] = "multiple"), r
            }
        }).filter("tooltipFilter", function() {
            return function(e) {
                var t = "";
                switch (e[0]) {
                    case "pdbeLogo":
                        t = "For more information about key features of this entry, click on the individual icons.";
                        break;
                    case "PrimaryCitation":
                        switch (e[1]) {
                            case "published":
                                t = "A paper describing this entry has been published.";
                                break;
                            case "unpublished":
                                t = "The PDB does not have any information about a published paper describing this entry.";
                                break;
                            case "CGIlogoUnknown":
                                t = "This icon conveys information about whether or not a paper describing this entry has been published."
                        }
                        break;
                    case "Taxonomy":
                        switch (e[1]) {
                            case "artificial":
                                t = "The biomacromolecules in this entry were artificially designed.";
                                break;
                            case "other":
                                t = "Information about the source organism of the biomacromolecules in this entry can be obtained by clicking on the icon.";
                                break;
                            case "multiple":
                                t = "The biomacromolecules in this entry derive from multiple organisms.";
                                break;
                            case "fly":
                                t = "The source organism of the biomacromolecules in this entry is fruit-fly.";
                                break;
                            case "CGIlogoUnknown":
                                t = "This icon conveys information about the source organism of the biomacromolecules in this entry.";
                                break;
                            default:
                                t = "The source organism of the biomacromolecules in this entry is " + e[1] + "."
                        }
                        break;
                    case "Expressed":
                        switch (e[1]) {
                            case "expressed":
                                t = "The sample of the biomacromolecules in this entry was obtained by expression and purification.";
                                break;
                            case "synthetic":
                                t = "The sample of the biomacromolecules in this entry was obtained by chemical synthesis.";
                                break;
                            case "purified":
                                t = "The sample of the biomacromolecules in this entry was extracted and purified from a biological source.";
                                break;
                            case "multiple":
                                t = "The sample of the biomacromolecules in this entry was obtained using multiple techniques.";
                                break;
                            case "other":
                                t = "The sample of the biomacromolecules in this entry was obtained using techniques other than expression, chemical synthesis or extraction from a biological source.";
                                break;
                            case "CGIlogoUnknown":
                                t = "This icon conveys information about the production techniques used to obtain the biomacromolecular samples for this entry."
                        }
                        break;
                    case "Experimental":
                        switch (e[1]) {
                            case "xray":
                                t = "The structure was determined using X-ray crystallography and experimental data is available.";
                                break;
                            case "nmr":
                                t = "The structure was determined using NMR spectroscopy and experimental data is available.";
                                break;
                            case "em":
                                t = "The structure was determined using Electron Microscopy and experimental data is available.";
                                break;
                            case "multiple":
                                t = "The structure was determined using Electron Crystallography and experimental data is available.";
                                break;
                            case "extal":
                                t = "The sample of the biomacromolecules in this entry was obtained using techniques other than expression, chemical synthesis or extraction from a biological source.";
                                break;
                            case "hybrid":
                                t = "The structure was determined using a hybrid technique and experimental data is available.";
                                break;
                            case "other":
                                t = "The structure was determined using a technique other than X-ray, NMR, EM, or a hybrid thereof and experimental data is available.";
                                break;
                            case "xrayNoData":
                                t = "The structure was determined using X-ray crystallography (no experimental data available).";
                                break;
                            case "nmrNoData":
                                t = "The structure was determined using NMR spectroscopy (no experimental data available).";
                                break;
                            case "emNoData":
                                t = "The structure was determined using Electron Microscopy (no experimental data available).";
                                break;
                            case "extalNoData":
                                this.title = "The structure was determined using Electron Crystallography (no experimental data available).";
                                break;
                            case "hybridNoData":
                                t = "The structure was determined using a hybrid technique (no experimental data available).";
                                break;
                            case "otherNoData":
                                t = "The structure was determined using a technique other than X-ray, NMR, EM, or a hybrid thereof (no experimental data available).";
                                break;
                            case "extalNoData":
                                t = "This icon conveys information about the structure-determination technique for this entry."
                        }
                        break;
                    case "Protein":
                        switch (e[1]) {
                            case "present":
                                t = "This entry contains protein.";
                                break;
                            case "absent":
                                t = "This entry does not contain protein.", "EMD" === e[2].substring(0, 3) && (this.title = "Presence of protein is not annotated for this EMDB entry.");
                                break;
                            case "CGIlogoUnknown":
                                t = "This icon conveys information about the presence of protein in the entry."
                        }
                        break;
                    case "NucleicAcid":
                        switch (e[1]) {
                            case "present":
                                t = "This entry contains nucleic acid (DNA, RNA).";
                                break;
                            case "absent":
                                t = "This entry does not contain nucleic acid (DNA, RNA).", "EMD" === e[2].substring(0, 3) && (t = "Presence of DNA or RNA is not annotated for this EMDB entry.");
                                break;
                            case "CGIlogoUnknown":
                                t = "This icon conveys information about the presence of nucleic acid (DNA, RNA) in the entry."
                        }
                        break;
                    case "Ligands":
                        switch (e[1]) {
                            case "present":
                                t = "This entry contains one or more ligands.";
                                break;
                            case "absent":
                                t = "This entry does not contain any ligands.";
                                break;
                            case "CGIlogoUnknown":
                                t = "This icon conveys information about the presence of ligands in the entry."
                        }
                }
                return t
            }
        })
    }(),
    function() {
        "use strict";
        angular.module("pdb.prints.services", []).service("printsService", ["$http", "$q", function(e, t) {
            this.getPrintsData = function(n) {
                var r = "//www.ebi.ac.uk/pdbe/search/pdb/select?",
                    i = "fl=pdb_id,organism_synonyms,number_of_bound_entities%2C+number_of_protein_chains%2Cexperimental_method%2C+experiment_data_available%2Cexpression_host_sci_name%2C+citation_year%2C+entry_organism_scientific_name,number_of_RNA_chains,number_of_DNA_chains,sample_preparation_method,emdb_id",
                    o = "&group=true&group.field=pdb_id&group.limit=100&rows=1000",
                    a = "&wt=json",
                    s = "&q=pdb_id:(" + n.join(" OR ") + ")",
                    l = r + i + o + a + s,
                    c = t.defer();
                return e.get(l).then(function(e) {
                    c.resolve(e.data)
                }, function(e) {
                    c.reject("fail response")
                }), c.promise
            }
        }])
    }(), angular.module("template/prints/pdbLogos.html", []).run(["$templateCache", function(e) {
        e.put("template/prints/pdbLogos.html", '<div class="pdbLogosWrapper"><div class="widthAuto" ng-class="{\'floatLeft\': config.orientation != \'vertical\'}" style="height:{{config.size}}px;position:relative;" ng-hide="(config.hideLogo.indexOf(\'PDBeLogo\') > -1)"><div class="pdbeLogoCol pdbeLogoCol1" style="font-size:{{ (config.size * 4) / (12-1) }}px"><a target="_self" title="{{ [\'pdbeLogo\'] | tooltipFilter }}"href="{{config.domainUrl}}/entry/pdb/{{logoData.PDBeLogo[0]}}/" ng-click="logoClick(\'pdbeLogo\')"><font face="Courier New"><b>{{logoData.PDBeLogo[0]}}</b></font></a></div><div class="pdbeLogoCol1Bottom"><a target="{{config.targetWindow}}" title="pdbe.org" href="{{config.domainUrl}}"><img border="0" ng-src="//www.ebi.ac.uk/pdbe/widgets/html/PDBeWatermark_horizontal_{{config.size}}.png"></a></div></div><div ng-repeat="category in categories" class="pdbeLogoCol widthAuto" ng-class="{\'floatLeft\': config.orientation != \'vertical\'}" ng-hide="(config.hideLogo.indexOf(category) > -1)" style="height:{{config.size}}px"><a target="pdbprints" ng-attr-title="{{ [ category, logoData[category][0], logoData.PDBeLogo[0] ] | tooltipFilter }}" href="{{config.domainUrl}}/entry/pdb/{{logoData.PDBeLogo[0]}}{{categoryUrl[$index]}}"><img class="pdbLogoImg" ng-src="{{config.domainUrl}}/widgets/pdblogos/{{config.color}}/{{config.size}}/{{category}}_{{logoData[category][0]}}.png" border="0"></a></div></div>')
    }]),
    function() {
        "use strict";
        angular.module("pdb.redo", ["pdb.redo.services", "pdb.common.services"]).directive("pdbRedo", ["pdbRedoService", "commonServices", function(e, t) {
            return {
                restrict: "EAC",
                scope: {
                    pdbId: "@",
                    headingText: "@",
                    errorText: "@",
                    subheadingText: "@"
                },
                templateUrl: "template/pdbRedo/pdbRedo.html",
                link: function(n, r, i) {
                    if (n.showWrapper = !0, n.showGeometry = !0, n.showModelFit = !0, n.showLoader = !0, n.pdbevents = t.createNewEvent(["PDB.pdbRedo.api.loaded", "PDB.pdbRedo.loaded", "PDB.pdbRedo.failed"]), "undefined" == typeof n.pdbId || "" === n.pdbId || 4 !== n.pdbId.length) return n.errorMsg = "Invalid PDB ID!", void n.dispatchEvent("PDB.pdbRedo.failed", {
                        pdbId: n.pdbId,
                        error: n.errorMsg
                    });
                    ("undefined" == typeof n.headingText || "" === n.headingText) && (n.headingText = "PDB_REDO model quality changes"), "undefined" != typeof n.errorText && (n.errorMsg = n.errorText), n.styles = {
                        geometryFrame: {},
                        modelFitFrame: {}
                    }, n.frameWidth = r[0].querySelector(".pcl-pdbRedo-position-frame").offsetWidth;
                    var o = function(e) {
                        var t = !1,
                            i = !1;
                        if (n.frameWidth = r[0].querySelector(".pcl-pdbRedo-position-frame").offsetWidth, "undefined" != typeof e && "undefined" != typeof e.geometry && null !== e.geometry)
                            for (var o = e.geometry["range-upper"] - e.geometry["range-lower"], a = o / 5, s = 1, l = 0; 5 > l; l++) {
                                if (e.geometry.dzscore > e.geometry["range-upper"] - a * s) {
                                    n.styles.geometryFrame = {
                                        right: n.frameWidth * l + "px"
                                    };
                                    break
                                }
                                s++
                            } else t = !0;
                        if ("undefined" != typeof e && "undefined" != typeof e.ddatafit && null !== e.ddatafit) {
                            var c = e.ddatafit["range-upper"] - e.ddatafit["range-lower"],
                                u = c / 5;
                            s = 1;
                            for (var l = 0; 5 > l; l++) {
                                if (e.ddatafit.zdfree > e.ddatafit["range-upper"] - u * s) {
                                    n.styles.modelFitFrame = {
                                        right: n.frameWidth * l + "px"
                                    };
                                    break
                                }
                                s++
                            }
                        } else i = !0;
                        t === !0 && i === !0 ? n.showWrapper = !1 : t === !0 ? (n.showWrapper = !0, n.showGeometry = !1) : i === !0 ? (n.showWrapper = !0, n.showModelFit = !1) : n.showWrapper = !0, n.showLoader = !1, n.$apply()
                    };
                    n.dispatchEvent = function(e, t, i) {
                        var o = r[0];
                        "undefined" != typeof i && (o = i), "undefined" != typeof t && (n.pdbevents[e].eventData = t), o.dispatchEvent(n.pdbevents[e])
                    };
                    e.getApiData(n.pdbId).then(function(e) {
                        n.dispatchEvent("PDB.pdbRedo.api.loaded", {
                            pdbId: n.pdbId
                        }), setTimeout(function() {
                            o(e), 1 == n.showWrapper ? n.dispatchEvent("PDB.pdbRedo.loaded", {
                                pdbId: n.pdbId
                            }) : ("undefined" != typeof n.errorText ? n.errorMsg = n.errorText : n.errorMsg = "Error: Data not Available!", n.dispatchEvent("PDB.pdbRedo.failed", {
                                pdbId: n.pdbId,
                                error: n.errorMsg
                            }))
                        }, 100)
                    }, function(e) {
                        n.showWrapper = !1, window.console && console.log("API request failed. Error: " + e), "undefined" != typeof n.errorText ? n.errorMsg = n.errorText : n.errorMsg = "Error: " + e, n.dispatchEvent("PDB.pdbRedo.failed", {
                            pdbId: n.pdbId,
                            error: n.errorMsg
                        })
                    })
                }
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("pdb.redo.services", []).service("pdbRedoService", ["$http", "$q", function(e, t) {
            this.getApiData = function(n) {
                var r = "//www.cmbi.ru.nl/pdb_redo/cgi-bin/json.pl?id=" + n,
                    i = t.defer();
                return e.get(r).then(function(e) {
                    i.resolve(e.data)
                }, function(e) {
                    i.reject("fail response")
                }), i.promise
            }
        }])
    }(), angular.module("template/pdbRedo/pdbRedo.html", []).run(["$templateCache", function(e) {
        e.put("template/pdbRedo/pdbRedo.html", '<div class="pcl-pdbRedo-wrapper" ng-show="showWrapper"><div class="pcl-pdbRedo-loader" ng-show="showLoader"><img ng-src="//www.ebi.ac.uk/pdbe/widgets/html/loading.gif" border="0"></div><div class="pcl-pdbRedo-heading">{{headingText}}</div><p>{{subheadingText}}</p><div class="pcl-pdbRedo-row"><div class="pcl-pdbRedo-label">Model Geometry</div><div class="pcl-pdbRedo-gradient" ng-show="showGeometry">&nbsp;</div><div class="pcl-pdbRedo-position-frame" ng-style="styles.geometryFrame" ng-show="showGeometry">&nbsp;</div><div class="pcl-pdbRedo-error" ng-hide="showGeometry">Data not available</div></div><div class="pcl-pdbRedo-row"><div class="pcl-pdbRedo-label">Fit model/data</div><div class="pcl-pdbRedo-gradient" ng-show="showModelFit">&nbsp;</div><div class="pcl-pdbRedo-position-frame" ng-style="styles.modelFitFrame" ng-show="showModelFit">&nbsp;</div><div class="pcl-pdbRedo-error" ng-hide="showModelFit">Data not available</div></div><div class="pcl-pdbRedo-link-row"><a target="_blank" href="http://www.cmbi.ru.nl/pdb_redo/cgi-bin/redir2.pl?pdbCode={{pdbId}}">PDB_REDO</a></div></div><div ng-hide="showWrapper">{{errorMsg}}</div>')
    }]),
    function() {
        "use strict";
        angular.module("pdb.sequence.view", ["d3Core", "pdb.sequence.view.filters", "pdb.sequence.view.services", "pdb.common.services"]).directive("pdbSeqViewer", ["d3", "seqViewerService", "$compile", "$filter", "$interval", "commonServices", "$document", "$window", function(e, t, n, r, i, o, a, s) {
            return {
                restrict: "EAC",
                scope: {
                    entryId: "@",
                    entityId: "@",
                    viewerType: "@",
                    settings: "@",
                    updateOptions: "&",
                    getEventDataStr: "@getEventData",
                    getEventData: "&",
                    subscribeEvents: "@"
                },
                templateUrl: function(e, t) {
                    return "unipdbViewer" === t.viewerType ? "template/sequenceView/uniPdb.html" : "template/sequenceView/pdb.html"
                },
                link: function(s, l, c) {
                    var u = e.select(l[0]),
                        d = u.select(".seqViewerWrapper"),
                        p = d.select(".topRightSection"),
                        h = d.select(".bottomRightSection"),
                        m = h.select(".bottomSvg"),
                        f = m.select("g.shapesGrp"),
                        g = p.select("g.scaleGrp"),
                        y = u.node().parentNode.getBoundingClientRect();
                    s.activeViewBtn = "compact", s.showViewBtn = !0, s.allowZoom = !0, s.showLoadMoreLink = !1, s.chainsViewStatus = "fewer", s.showScrollArrow = !1, "undefined" == typeof s.subscribeEvents && (s.subscribeEvents = "true");
                    var v = e.select(".pdbSeqTooltip");
                    null == v[0][0] && (v = e.select("body").append("div").attr("class", "pdbSeqTooltip")), s.showLoader = !0, s.showError = !1;
                    var b = {
                        width: y.width > 230 ? y.width : 230,
                        height: y.height,
                        showLabels: !0,
                        labelWidth: 80,
                        maxZoomed: !1,
                        firstPrintsMarginTop: 3
                    };
                    s.pdbevents = o.createNewEvent(["PDB.seqViewer.click", "PDB.seqViewer.mouseover", "PDB.seqViewer.mouseout"]), "undefined" != typeof s.settings && s.settings && angular.extend(b, JSON.parse(s.settings));
                    var w = !1,
                        x = {};
                    s.expandedView = !1, s.showLabels = b.showLabels, s.printsMarginTop = b.firstPrintsMarginTop;
                    var S = {
                            top: 15,
                            right: 10,
                            bottom: 15,
                            left: 10
                        },
                        E = 45,
                        I = 60,
                        C = 70,
                        T = b.width > 300 ? 210 : 80,
                        M = b.height;
                    "unipdbViewer" !== s.viewerType && (T = b.showLabels ? 80 : 15, I = 35, M = b.height - E);
                    var _ = 25,
                        A = 5,
                        P = b.width,
                        k = P - A,
                        R = M - C - I - S.bottom,
                        V = k - T - _,
                        D = V - 20,
                        L = V / 28;
                    s.styles = {
                        wrapper: {
                            width: P + "px",
                            height: M + "px"
                        },
                        loaderImg: {
                            "margin-top": M / 2 - 30 + "px"
                        },
                        topSection: {
                            height: C + "px",
                            width: k + "px"
                        },
                        topSvg: {
                            height: C + "px",
                            width: V + "px"
                        },
                        bottomSection: {
                            height: R + "px",
                            width: k + "px",
                            "overflow-x": "hidden",
                            "overflow-y": "auto"
                        },
                        bottomSvg: {
                            width: V + "px"
                        },
                        leftSecStyle: {
                            width: T + "px"
                        },
                        loadSecBackground: {
                            width: T - 5 + "px",
                            background: "#DCECD7 none repeat scroll 0% 0%",
                            "padding-right": "5px",
                            height: M + "px",
                            position: "absolute",
                            "z-index": 0
                        },
                        scrollArrowLeft: {
                            position: "absolute",
                            margin: "8px 0 0 " + (T - 10) + "px",
                            "text-decoration": "none",
                            border: "none",
                            outline: "none"
                        },
                        scrollArrowRight: {
                            display: "none",
                            margin: "8px 0 0 20px",
                            "text-decoration": "none",
                            border: "none",
                            outline: "none"
                        },
                        loadMoreStyle: {
                            top: M - 35 + "px",
                            left: P / 2 - 50 + "px"
                        },
                        btnGrp: {
                            "float": "left",
                            "margin-bottom": "5px",
                            width: P + "px",
                            "text-align": "right",
                            overflow: "auto"
                        }
                    }, s.wrapperSize = {
                        width: P,
                        height: M
                    }, "unipdbViewer" !== s.viewerType && (s.styles.leftSecStyle = {
                        width: T - 5 + "px",
                        "text-align": "right",
                        background: "#DCECD7 none repeat scroll 0% 0%",
                        "padding-right": "5px",
                        position: "relative"
                    }, s.styles.scrollArrowLeft = {
                        display: "none",
                        position: "absolute",
                        margin: "8px 0 0 " + (T - 10) + "px",
                        "text-decoration": "none",
                        border: "none",
                        outline: "none"
                    }, s.styles.scrollArrowRight = {
                        display: "none",
                        margin: "8px 0 0 20px",
                        "text-decoration": "none",
                        border: "none",
                        outline: "none"
                    }, b.showLabels || (s.styles.topSvg["margin-left"] = T, s.styles.bottomSvg["margin-left"] = T));
                    var F = function(o) {
                        s.infoIconMsg = o.infoIconMsg, s.pathLeftLabels = o.pathLeftLabels, s.pathMoreLeftLabels = [], s.pdbIdArr = o.pdbIdArr;
                        var c = "['" + o.pdbIdArr.join("','") + "']";
                        s.modelOptions = o.options, s.showTooltip = function(t, n, r) {
                            var i = 0,
                                o = 0;
                            "ng" === n ? (o = r.pageX, i = r.pageY) : (o = e.event.pageX, i = e.event.pageY), v.html(t).style("display", "block").style("top", i + 15 + "px").style("left", o + 10 + "px")
                        }, s.hideTooltip = function() {
                            v.style("display", "none")
                        };
                        var y = function(e, t, n) {
                                var r = e[0];
                                return "circle" !== n && (r = Math.round(Y.invert(e[0]))), "Residue " + (r + 1) + " (" + j[r] + ")"
                            },
                            E = function(e) {
                                var t = 1;
                                return e > 100 && (t = Math.floor(Math.floor(e) / 100)), t
                            },
                            I = function(e, t) {
                                var n = 0;
                                if (t % 100 === 0) n = .2112 * e / E(t);
                                else {
                                    var r = 100 * Math.floor(t / 100);
                                    1 > r && (r = 100);
                                    var i = .2112 * e / E(r),
                                        o = {
                                            100: {
                                                diff: 2,
                                                range: [1, 2, 4, 7, 9]
                                            },
                                            200: {
                                                diff: 1.5,
                                                range: [2, 5]
                                            },
                                            300: {
                                                diff: .9,
                                                range: [4, 9]
                                            },
                                            400: {
                                                diff: .7,
                                                range: [5, 9]
                                            },
                                            500: {
                                                diff: .6,
                                                range: [1, 9]
                                            },
                                            600: {
                                                diff: .45,
                                                range: [8, 9]
                                            },
                                            700: {
                                                diff: .4,
                                                range: [8, 9]
                                            }
                                        };
                                    if (800 > t) {
                                        for (var a = o[r].range.length, s = a - 1; s >= 0; s--)
                                            if (t >= r + 10 * o[r].range[s]) {
                                                n = 0 === s ? i : i - o[r].diff / 100 * e * s;
                                                break
                                            }
                                    } else n = .2112 * e / E(r)
                                }
                                return 0 === n && (n = i), n
                            },
                            C = function(e) {
                                var t = 1 * e;
                                return 1.7 > t ? t = 1.7 : t > 4.5 && (t = 4.5), t
                            };
                        s.dispatchEvent = function(e, t, n) {
                            var r = l[0];
                            "undefined" != typeof n && (r = n), "undefined" != typeof t && (s.pdbevents[e].eventData = t), r.dispatchEvent(s.pdbevents[e])
                        };
                        var T = function(t, n, r) {
                                t.on("click", function() {
                                    var t = e.select(this),
                                        i = t.data(),
                                        o = e.mouse(this),
                                        a = i[0].tooltipMsg,
                                        l = i[0].tooltipPosition;
                                    "circle" === n && (o[0] = i[0].residue_number - 1);
                                    var c = y(o, i, n);
                                    if (angular.isUndefined(a) ? a = c : angular.isUndefined(l) || "prefix" !== l ? angular.isUndefined(l) || "postfix" !== l || (a = c + " " + a) : a = a + " " + c, "path" === n || "circle" === n ? t.attr("stroke", r.brighter()) : "arrow" === n && t.attr("stroke", r.brighter()).attr("fill", r.brighter()), "undefined" != typeof s.getEventDataStr && "" !== s.getEventDataStr) {
                                        var u = {
                                            eventType: "click",
                                            elementData: i,
                                            residueNumber: parseInt(c.split(" ")[1]),
                                            pdbId: s.entryId,
                                            entityId: s.entityId
                                        };
                                        s.getEventData({
                                            eventData: u
                                        })
                                    }
                                    s.dispatchEvent("PDB.seqViewer.click", {
                                        viewerType: s.viewerType,
                                        elementData: i,
                                        residueNumber: parseInt(c.split(" ")[1]),
                                        entryId: s.entryId,
                                        entityId: s.entityId
                                    })
                                }).on("mouseover", function() {
                                    var t = e.select(this),
                                        i = t.data(),
                                        o = e.mouse(this),
                                        a = i[0].tooltipMsg,
                                        l = i[0].tooltipPosition;
                                    "circle" === n && (o[0] = i[0].residue_number - 1), angular.isUndefined(a) ? a = y(o, i, n) : angular.isUndefined(l) || "prefix" !== l ? angular.isUndefined(l) || "postfix" !== l || (a = y(o, i, n) + " " + a) : a = a + " " + y(o, i, n), "path" === n || "circle" === n ? t.attr("stroke", r.brighter()) : "arrow" === n && t.attr("stroke", r.brighter(.1)).attr("fill", r.brighter(.1)), s.showTooltip(a, "d3", o);
                                    var c = y(o, i, n);
                                    s.dispatchEvent("PDB.seqViewer.mouseover", {
                                        viewerType: s.viewerType,
                                        elementData: i,
                                        residueNumber: parseInt(c.split(" ")[1]),
                                        entryId: s.entryId,
                                        entityId: s.entityId
                                    })
                                }).on("mousemove", function() {
                                    var t = e.select(this),
                                        i = t.data(),
                                        o = e.mouse(this),
                                        a = i[0].tooltipMsg,
                                        l = i[0].tooltipPosition;
                                    "circle" === n && (o[0] = i[0].residue_number - 1), angular.isUndefined(a) ? a = y(o, i, n) : "undefined" != typeof l && "prefix" === l ? a = a + " " + y(o, i, n) : "undefined" != typeof l && "postfix" === l && (a = y(o, i, n) + " " + a), "path" === n || "circle" === n ? t.attr("stroke", r.brighter()) : "arrow" === n && t.attr("stroke", r.brighter()).attr("fill", r.brighter()), s.showTooltip(a, "d3", o);
                                    var c = y(o, i, n);
                                    s.dispatchEvent("PDB.seqViewer.mouseover", {
                                        viewerType: s.viewerType,
                                        elementData: i,
                                        residueNumber: parseInt(c.split(" ")[1]),
                                        entryId: s.entryId,
                                        entityId: s.entityId
                                    })
                                }).on("mouseleave", function() {
                                    "path" === n ? e.select(this).attr("stroke", r.darker().brighter()) : "arrow" === n && e.select(this).attr("stroke", r.darker().brighter()).attr("fill", r.darker().brighter()), s.hideTooltip(), s.dispatchEvent("PDB.seqViewer.mouseout", {
                                        viewerType: s.viewerType,
                                        entryId: s.entryId,
                                        entityId: s.entityId
                                    })
                                })
                            },
                            M = function(t, n, r, i, o, a, s, l) {
                                u.select("." + n).attr("clip-path", "url(#" + te + ")").selectAll("path." + r).data(t).enter().append("path").attr("class", function(e, t) {
                                    return "pathEle " + r + "-" + t
                                }).attr("stroke", function(t) {
                                    var n;
                                    if ("undefined" != typeof t.color) {
                                        var r = e.rgb(t.color[0], t.color[1], t.color[2]).brighter();
                                        n = r
                                    } else n = i;
                                    return 1 == l && T(e.select(this), "path", n), n
                                }).attr("stroke-width", o).attr("stroke-opacity", function(e) {
                                    return "undefined" != typeof e.opacity ? e.opacity : 1
                                }).attr("stroke-linecap", s).attr("fill", "none").attr("transform", "translate(0," + a + ")").attr("d", function(e) {
                                    return Z(e.pathRange)
                                })
                            },
                            _ = function(e) {
                                var t = e.split(","),
                                    n = parseFloat(t[0].substring(1)),
                                    r = parseFloat(t[1].substring(2)),
                                    i = r - n + 1,
                                    o = 5;
                                10 > i && (o = i - 2);
                                var a = "M" + n + ",-5L" + (r - o) + ",-5L" + (r - o) + ",-10L" + r + ",0L" + (r - o) + ",10L" + (r - o) + ",5L" + n + ",5";
                                return a
                            },
                            A = function(t, n, r, i, o, a, s, l) {
                                u.select("." + n).attr("clip-path", "url(#" + te + ")").selectAll("path." + r).data(t).enter().append("path").attr("class", function(e, t) {
                                    return "arrowEle " + r + "-" + t
                                }).attr("stroke", function(t) {
                                    var n = e.rgb(t.color[0], t.color[1], t.color[2]).brighter();
                                    return 1 == l && T(e.select(this), "arrow", n), n
                                }).attr("stroke-width", o).attr("stroke-linecap", s).attr("fill", function(t) {
                                    return e.rgb(t.color[0], t.color[1], t.color[2]).brighter()
                                }).attr("transform", "translate(0," + a + ")").attr("d", function(e) {
                                    return _(Z(e.pathRange))
                                })
                            },
                            P = function(e, t, n, r, i) {
                                var o = u.select("." + t).attr("clip-path", "url(#" + te + ")").selectAll("path." + n).data(e).enter().append("text").attr("class", function(e, t) {
                                    return e.textIndex = t, "textEle " + n + " " + n + "-" + t
                                }).attr("x", function(e) {
                                    return Y(e.textRange[0][0])
                                }).attr("y", function(e) {
                                    return e.textRange[1][0]
                                }).attr("fill", "white").text(function(e) {
                                    return e.textString
                                }).style("text-anchor", function(e) {
                                    return "undefined" != typeof e.textAnchor ? e.textAnchor : "middle"
                                }).style("font-family", "Verdana,sans-serif");
                                r === !0 && T(o, "text", "white"), i === !0 && ("unipdbViewer" === s.viewerType ? o.style("display", "block") : k(o))
                            },
                            k = function(t) {
                                t.each(function(t) {
                                    var n = e.select(this),
                                        r = n.data()[0],
                                        i = u.select("." + r.pathClassPrefix + "-" + r.textIndex).node().getBBox().width,
                                        o = n.node().getBBox().width;
                                    if (o > i) {
                                        var a = parseInt(n.style("font-size"));
                                        a > 2 ? (n.style("font-size", a - 2 + "px"), k(n)) : n.style("font-size", "0px")
                                    }
                                })
                            },
                            R = function(e, t) {
                                var n = ["M", "0L", "0L", "3L", "6L", "9L", "12L", "15L", "18L"],
                                    r = 0,
                                    i = "",
                                    o = 5;
                                return "start" === t && (o = -5), angular.forEach(n, function(t, n) {
                                    var a = 0;
                                    0 === r ? (r = 1, a = e) : (r = 0, a = e + o), i += t + "" + a + ","
                                }), i += "18 Z"
                            },
                            F = function(t, n, r, i, o, a, s, l) {
                                u.select("." + n).attr("clip-path", "url(#" + te + ")").selectAll("path." + r).data(t).enter().append("path").attr("class", function(e, t) {
                                    return "linkerPathEle " + r + "-" + t
                                }).attr("stroke", function(t) {
                                    return e.rgb(t.color[0], t.color[1], t.color[2]).brighter()
                                }).attr("stroke-width", 2).attr("stroke-linecap", s).attr("fill", function(t) {
                                    return e.rgb(t.color[0], t.color[1], t.color[2]).brighter()
                                }).attr("transform", "translate(0,-9)").attr("d", function(t) {
                                    if (1 == l) {
                                        var n = e.rgb(t.color[0], t.color[1], t.color[2]).brighter();
                                        T(e.select(this), "path", n)
                                    }
                                    var r = R(Y(t.pathStart), t.pathPosition);
                                    return r
                                })
                            },
                            H = function(t) {
                                return e.svg.symbol().type(t).size(function(e) {
                                    return w ? 40 : 10 * C(Q.scale())
                                })
                            },
                            B = function(t, n, r, i, o, a, s) {
                                x[i] = t;
                                u.select("." + r).attr("clip-path", "url(#" + te + ")").selectAll("otherPathShape path." + i).data(n).enter().append("path").attr("class", i).attr("d", H(t)).attr("fill", function(t) {
                                    var n;
                                    return n = "undefined" != typeof t.color ? e.rgb(t.color[0], t.color[1], t.color[2]).brighter() : o, 1 == a && T(e.select(this), "circle", n), n
                                }).attr("stroke", "none").attr("stroke-width", 0).attr("transform", function(e, t) {
                                    var n = "translate(" + Y(e.residue_number - 1) + ",10)";
                                    return 0 !== s && (n = "translate(" + Y(e.residue_number - 1) + "," + s + ")"), n
                                })
                            },
                            O = function(e, t, n) {
                                u.select("." + e).append("g").attr("class", "seqAxis " + t), u.select("." + t).call(K), n && "undefined" != typeof n && u.select("." + t).attr("transform", "translate(0," + n + ")")
                            },
                            z = function() {
                                if (w || Q.scale() === $) {
                                    u.selectAll(".linkerPathEle").attr("d", function(e) {
                                        var t = 0;
                                        t = "start" === e.pathPosition ? e.pathStart - .1 : e.pathStart + .1;
                                        var n = R(Y(t), e.pathPosition);
                                        return n
                                    }), u.selectAll(".seqPath").attr("d", function(e) {
                                        var t = Z(e.pathRange),
                                            n = t.split(",");
                                        return n[0] = "M" + (parseFloat(n[0].substring(1)) - 5), n[1] = "0L" + (parseFloat(n[1].substring(2)) + 5), n.join(",")
                                    }), u.selectAll(".nonSeqPath").attr("d", function(e) {
                                        var t = Z(e.pathRange),
                                            n = t.split(",");
                                        return parseFloat(n[0].substring(1)) > 0 && (n[0] = "M" + (parseFloat(n[0].substring(1)) + 5)), n[1] = "0L" + (parseFloat(n[1].substring(2)) - 5), n.join(",")
                                    });
                                    var t = u.selectAll(".linePathEle");
                                    t.each(function(t) {
                                        e.select(e.select(this).node()).attr("d", function(e) {
                                            var t = Z(e.pathRange),
                                                n = t.split(","),
                                                r = parseFloat(n[0].substring(1)) + 5,
                                                i = n.length;
                                            n[0] = "M" + r;
                                            var o = parseFloat(n[i - 2].substring(2)) - 5;
                                            return n[i - 2] = "5L" + o, n.join(",")
                                        })
                                    }), u.selectAll(".seqAxis").style("display", "block"), u.selectAll(".hideTextOnZoom").style("display", "none"), u.selectAll(".showTextOnZoom").style("display", "block")
                                } else u.selectAll(".seqAxis").style("display", "none"), u.selectAll(".hideTextOnZoom").style("display", "block"), u.selectAll(".showTextOnZoom").style("display", "none")
                            },
                            q = function() {
                                var e = 20;
                                "unipdbViewer" === s.viewerType && (e = 40), m.select(".seqSvgBg").attr("height", 20);
                                var t = f.node().getBBox();
                                m.attr("height", t.height + e), m.select(".seqSvgBg").attr("height", t.height + e)
                            },
                            N = function() {
                                Q.scale() > 1 ? u.selectAll(".SeqScrollArrow").style("display", "block") : u.selectAll(".SeqScrollArrow").style("display", "none"), s.allowZoom === !1 && Q.scale($);
                                var t = Q.translate(),
                                    n = Q.scale(),
                                    r = Math.min(0, Math.max(D * (1 - n), t[0])),
                                    i = Math.min(0, Math.max(1 * (1 - n), t[1]));
                                Q.translate([r, i]), g.select("g.x.axis").call(J);
                                var o = u.selectAll(".pathEle");
                                o.each(function(t) {
                                    e.select(this).attr("d", Z(t.pathRange))
                                });
                                var a = u.selectAll(".arrowEle");
                                a.each(function(t) {
                                    e.select(this).attr("d", _(Z(t.pathRange)))
                                });
                                var l = u.selectAll(".linkerPathEle");
                                l.each(function(t) {
                                    var n = R(Y(t.pathStart), t.pathPosition);
                                    e.select(e.select(this).node()).attr("d", n)
                                }), u.selectAll(".seqAxis").call(K);
                                for (var c in x) u.selectAll("." + c).attr("d", H(x[c])).attr("transform", function(e, t) {
                                    var n = "translate(" + Y(e.residue_number - 1) + ",10)";
                                    return "undefined" != typeof e.marginTop && 0 !== e.marginTop && (n = "translate(" + Y(e.residue_number - 1) + "," + e.marginTop + ")"), n
                                });
                                z();
                                var d = u.selectAll(".textEle");
                                d.each(function(t) {
                                    var n = e.select(this),
                                        r = n.data()[0];
                                    n.attr("x", function(e) {
                                        return Y(e.textRange[0][0])
                                    }), "undefined" != typeof r && "undefined" != typeof r.fitInPath && r.fitInPath === !0 && (n.style("font-size", "12px"), k(n))
                                })
                            },
                            G = function(e) {
                                for (var t in e)
                                    if ("groups" === t)
                                        for (var n = e[t].length, r = 0; n > r; r++) {
                                            var i = e[t][r]["class"],
                                                o = e[t][r].parentGroup,
                                                a = e[t][r].marginTop,
                                                l = (e[t][r].label, f);
                                            "unipdbViewer" !== s.viewerType || "uniprotGrp" !== o && "uniprotGrp" !== i ? "pdbViewer" !== s.viewerType || "moleculeGrp" !== o && "moleculeGrp" !== i || (l = g) : l = g, "" !== o ? (l.select("." + o).append("g").attr("class", i), "undefined" != typeof a && a && l.select("." + i).attr("transform", "translate(0," + a + ")")) : l.append("g").attr("class", i).attr("transform", "translate(0," + (S.top + a) + ")").attr("clip-path", "url(#" + te + ")")
                                        } else if ("shapes" === t)
                                            for (var c = e[t].length, u = 0; c > u; u++) {
                                                var d = e[t][u].shape,
                                                    p = e[t][u].shapeGroupClass,
                                                    h = e[t][u].shapeClass,
                                                    m = e[t][u].shapeContent,
                                                    y = e[t][u].shapeColour,
                                                    v = e[t][u].shapeHeight,
                                                    b = e[t][u].marginTop,
                                                    w = e[t][u].shapeCap,
                                                    x = e[t][u].showTooltip,
                                                    E = e[t][u].fitInPath;
                                                "undefined" == typeof v && (v = 0), "undefined" == typeof b && (b = 0), "undefined" == typeof w && (w = "butt"), "text" === d ? (P(m, p, h, x, E), z()) : "zigzag" === d ? F(m, p, h, y, v, b, w, x) : "arrow" === d ? A(m, p, h, y, v, b, w, x) : "path" === d ? M(m, p, h, y, v, b, w, x) : "circle" === d || "square" === d || "triangle-up" === d || "triangle-down" === d || "diamond" === d || "cross" === d ? B(d, m, p, h, y, x, b) : "sequence" === d && (O(p, h, b, x), z())
                                            }
                            },
                            j = o.options.seqStr.split("");
                        s.molSeqArr = j;
                        var U = j.length,
                            W = U - 1,
                            X = 1,
                            $ = I(U, D);
                        U <= Math.ceil(L) && (L = U, w = !0);
                        var Y = e.scale.linear().domain([0, W]).range([0, D]),
                            Z = e.svg.line().x(function(e, t) {
                                return Y(e[0])
                            }),
                            Q = e.behavior.zoom().on("zoom", N).x(Y).scaleExtent([X, $]),
                            J = e.svg.axis().scale(Y).orient("top").tickFormat(function(e) {
                                return e + 1
                            }).ticks(L),
                            K = e.svg.axis().scale(Y).orient("top").tickFormat(function(e) {
                                return j[e]
                            }).ticks(L);
                        if ("unipdbViewer" === s.viewerType && (d.select(".headingTxt").html(o.options.unipdbHeading), b.width > 300)) {
                            var ee = d.select(".bottomLeftSection").classed("pdb-prints", !0).attr("pdb-ids", c).attr("settings", '{"orientation": "horizontal", "size": 24, "color": "embl_green", "hideLogo" : ["PDBeLogo","Taxonomy", "Expressed", "Protein"] }');
                            n(ee.node())(s)
                        }
                        p.select(".topSvg").call(Q), h.select(".shapesGrp").call(Q);
                        var te = "clipper_" + Math.floor(500 * Math.random() + 1);
                        m.append("defs").append("clipPath").attr("id", te).append("rect").attr("x", -10).attr("y", -30).attr("width", V + 20).attr("height", 100);
                        var ne = g.select("g.x.axis").call(J);
                        if (U === ne.selectAll("g.tick")[0].length && (w = !0), G(o), "unipdbViewer" === s.viewerType) {
                            setTimeout(function() {
                                var t = u.selectAll(".textEle");
                                t.each(function(t) {
                                    var n = e.select(this),
                                        r = n.data()[0];
                                    n.attr("x", function(e) {
                                        return Y(e.textRange[0][0])
                                    }).style("display", "block"), "undefined" != typeof r && "undefined" != typeof r.fitInPath && r.fitInPath === !0 && (n.style("font-size", "12px"), k(n))
                                })
                            }, 100);
                            var re = ["mutatedResidues", "modifiedResidues", "molecules"],
                                ie = t.createPromise(o.pdbIdArr, re);
                            t.combinedDataGrabber(ie, o.pdbIdArr, re).then(function(e) {
                                var t = r("unipdbModelFilter")(e, S.top, u);
                                G(t)
                            }, function() {
                                window.console && console.log("combined Failed")
                            })
                        } else "true" == s.subscribeEvents && (a.on("PDB.topologyViewer.click", function(e) {
                            if ("undefined" != typeof e.eventData) {
                                if (e.eventData.entryId != s.entryId || e.eventData.entityId != s.entityId) return;
                                if (e.eventData.chainId != s.bestChainId) return;
                                u.selectAll(".selectionPath").remove();
                                var t = r("highlightResideShapeFilter")(e.eventData, "click");
                                G(t)
                            }
                        }), a.on("PDB.topologyViewer.mouseover", function(e) {
                            if ("undefined" != typeof e.eventData) {
                                if (e.eventData.entryId != s.entryId || e.eventData.entityId != s.entityId) return;
                                if (e.eventData.chainId != s.bestChainId) return;
                                u.selectAll(".highlightPath").remove();
                                var t = r("highlightResideShapeFilter")(e.eventData, "mouseover");
                                G(t)
                            }
                        }), a.on("PDB.topologyViewer.mouseout", function(e) {
                            u.selectAll(".highlightPath").remove()
                        }), a.on("PDB.litemol.mouseover", function(e) {
                            if ("undefined" == typeof e.eventData || angular.equals({}, e.eventData)) u.selectAll(".highlightPath").remove();
                            else {
                                if (e.eventData.entryId.toLowerCase() != s.entryId.toLowerCase() || e.eventData.entityId != s.entityId) return;
                                u.selectAll(".highlightPath").remove();
                                var t = r("highlightResideShapeFilter")(e.eventData, "mouseover");
                                G(t)
                            }
                        }), a.on("PDB.litemol.click", function(e) {
                            if ("undefined" != typeof e.eventData && !angular.equals({}, e.eventData)) {
                                if (e.eventData.entryId.toLowerCase() != s.entryId.toLowerCase() || e.eventData.entityId != s.entityId) return;
                                u.selectAll(".selectionPath").remove();
                                var t = r("highlightResideShapeFilter")(e.eventData, "click");
                                G(t)
                            }
                        }));
                        b.maxZoomed && (Q.scale($), N()), s.$watch("activeViewBtn", function() {
                            "expanded" === s.activeViewBtn ? (Q.scale($), N(), s.allowZoom = !1) : (Q.scale(1), s.allowZoom = !0, N())
                        }), w && (s.showViewBtn = !1), q(), s.loadMoreChains = function() {
                            s.showLoadMoreLink = !1;
                            var e = t.createPromise([s.entryId], ["polymerCoverage"]);
                            t.combinedDataGrabber(e, s.entryId, ["polymerCoverage"]).then(function(e) {
                                var t = r("pdbModelFilter")(e, s.outlierApiData, s.bindingSitesApiData, s.residueListingApiData, s.molSeqArr, S.top, s.entryId, s.entityId, u, s.bestChainId, s.bestStructAsymId);
                                G(t), N(), s.pathMoreLeftLabels = s.pathMoreLeftLabels.concat(t.pathLeftLabels), s.chainsViewStatus = "fewer", s.chiansHideShowBtn = !0, s.$apply(), q()
                            }, function() {
                                window.console && console.log("load more chains api failed")
                            })
                        }, s.hideShowChainsFn = function() {
                            "fewer" == s.chainsViewStatus ? (s.chainsViewStatus = "more", m.selectAll(".otherChainPaths").style("display", "none"), u.selectAll(".moreChainLabels").style("display", "none")) : (s.chainsViewStatus = "fewer", m.selectAll(".otherChainPaths").style("display", "block"), u.selectAll(".moreChainLabels").style("display", "block")), q()
                        }, s.showLoader = !1, "unipdbViewer" !== s.viewerType && (s.$apply(), "undefined" != typeof s.updateOptions && "undefined" != typeof s.modelOptions && s.updateOptions({
                            newList: s.modelOptions.uniprotIdArr
                        }));
                        var oe;
                        s.movePan = function(e) {
                            var t = Q.translate();
                            Q.translate([t[0] + e, t[1]]), N(), oe = i(function() {
                                var t = Q.translate();
                                Q.translate([t[0] + e, t[1]]), N()
                            }, 100)
                        }, s.stopMovingPan = function(e) {
                            i.cancel(oe)
                        }
                    };
                    if ("unipdbViewer" === s.viewerType) t.getUnipdbData(s.entryId).then(function(e) {
                        t.getUnipdbPfamData(s.entryId).then(function(t) {
                            var n = r("unpToPfamFilter")(t, s.entryId);
                            s.pfamTooltip = n.shapes[0].infoToolTipMsg, e.shapes.push(n.shapes[0]), e.shapes.push(n.shapes[1]), F(e)
                        }, function(t) {
                            F(e), window.console && console.log("Pfam API request failed. Error: " + t)
                        })
                    }, function(e) {
                        s.showLoader = !1, s.showError = !0, window.console && console.log("Unipdb API request failed. Error: " + e)
                    });
                    else {
                        var H = t.createPromise([s.entryId], ["observedResidueRatio"]);
                        t.combinedDataGrabber(H, s.entryId, ["observedResidueRatio"]).then(function(e) {
                            if ("undefined" != typeof e[s.entryId].observedResidueRatio[s.entityId]) {
                                s.bestChainId = e[s.entryId].observedResidueRatio[s.entityId][0].chain_id, s.bestStructAsymId = e[s.entryId].observedResidueRatio[s.entityId][0].struct_asym_id, e[s.entryId].observedResidueRatio[s.entityId].length > 1 && (s.showLoadMoreLink = !0);
                                var n = ["summary", "entities", "polymerCoveragePerChain", "bindingSites", "mappings", "secStrutures", "outliers", "modifiedResidues", "mutatedResidues", "residueListing"],
                                    i = t.createPromise([s.entryId], n, s.bestChainId, s.bestStructAsymId);
                                t.combinedDataGrabber(i, s.entryId, n).then(function(e) {
                                    s.outlierApiData = e[s.entryId].outliers, s.bindingSitesApiData = e[s.entryId].bindingSites, s.residueListingApiData = e[s.entryId].residueListing;
                                    var t = r("pdbModelFilter")(e, "", "", "", s.molSeqArr, S.top, s.entryId, s.entityId, u, s.bestChainId, s.bestStructAsymId);
                                    F(t)
                                }, function() {
                                    s.showLoader = !1, s.showError = !0, window.console && console.log("combined api call failed")
                                })
                            } else s.showLoader = !1, s.showError = !0, s.$apply(), window.console && console.log("Error: Entity not found!!")
                        }, function() {
                            s.showLoader = !1, s.showError = !0, window.console && console.log("observed residue ratio api failed")
                        })
                    }
                }
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("pdb.sequence.view.filters", ["d3Core", "pdb.sequence.view.services", "pdb.common.services"]).filter("uniProtMappingFilter", ["commonServices", function(e) {
            return function(t) {
                var n = [],
                    r = {};
                if ("undefined" != typeof t.bestStrMappings)
                    for (var i = t.bestStrMappings.length, o = 0; i > o; o++) {
                        var a = t.bestStrMappings[o].pdb_id; - 1 === n.indexOf(a) && (n.push(a), r[a] = t.pdbMappings[a])
                    } else r = t.pdbMappings;
                var s = {
                        options: {
                            seqId: t.uniprotId,
                            seqStr: t.uniprotSeq,
                            unipdbHeading: t.unipdbHeading,
                            totalEntries: 0,
                            totalChains: 0
                        },
                        groups: [{
                            label: t.uniprotId,
                            "class": "uniprotGrp",
                            parentGroup: "",
                            marginTop: 8
                        }, {
                            label: "",
                            "class": "uniprotPathGrp",
                            parentGroup: "uniprotGrp",
                            marginTop: 1
                        }, {
                            label: "",
                            "class": "pfamPathGrp",
                            parentGroup: "uniprotGrp"
                        }, {
                            label: "",
                            "class": "uniprotSeqGrp",
                            parentGroup: "uniprotGrp",
                            marginTop: 14
                        }, {
                            label: "",
                            "class": "pfamLabelGrp",
                            parentGroup: "uniprotGrp",
                            marginTop: 14
                        }],
                        shapes: [{
                            shape: "path",
                            shapeGroupClass: "uniprotPathGrp",
                            shapeClass: "seqPath uniprotPath",
                            shapeHeight: 20,
                            marginTop: 0,
                            showTooltip: !0,
                            shapeContent: [{
                                pathRange: [
                                    [0, 0],
                                    [t.uniprotSeq.length, 0]
                                ],
                                pathData: {
                                    uniprotId: t.uniprotId,
                                    uniprotSeq: t.uniprotSeq
                                },
                                color: e.specificColors.lightGray
                            }]
                        }, {
                            shape: "sequence",
                            shapeGroupClass: "uniprotSeqGrp",
                            shapeClass: "uniprotSeq"
                        }],
                        pdbIdArr: [],
                        infoIconMsg: {}
                    },
                    l = 0,
                    c = 0;
                return angular.forEach(r, function(n, r) {
                    var i = l + 20;
                    s.groups.push({
                        label: r,
                        "class": "pathGrp" + r,
                        parentGroup: "",
                        marginTop: i
                    }), l += 30, s.options.totalEntries++, s.options.totalChains++, s.groups.push({
                        label: "",
                        "class": "seqGrp" + r,
                        parentGroup: "",
                        marginTop: l + 3
                    }), s.shapes.push({
                        shape: "sequence",
                        shapeGroupClass: "seqGrp" + r,
                        shapeClass: "seq" + r
                    });
                    var o = {
                            shape: "path",
                            shapeGroupClass: "pathGrp" + r,
                            shapeClass: "seqPath path" + r + " path" + r,
                            shapeHeight: 20,
                            showTooltip: !0,
                            shapeContent: []
                        },
                        a = {
                            shape: "text",
                            shapeGroupClass: "seqGrp" + r,
                            shapeClass: "hideTextOnZoom chain_id_text",
                            shapeHeight: 15,
                            marginTop: 2,
                            showTooltip: !0,
                            shapeContent: []
                        },
                        u = [],
                        d = "This shows how sequences in PDB entry " + r + " cover the sequence of UniProt entry " + t.uniprotId + ".",
                        p = function(e) {
                            var t = 1;
                            return "-" === e[0] && (t = -1, e = e.substr(1)),
                                function(n, r) {
                                    var i = n[e] < r[e] ? -1 : n[e] > r[e] ? 1 : 0;
                                    return i * t
                                }
                        },
                        h = n.sort(p("unp_start")),
                        m = 0,
                        f = e.colorBox3[c].length;
                    angular.forEach(h, function(t, n) {
                        var r = t.unp_start + "-" + t.unp_end,
                            i = u.indexOf(r); - 1 === i ? (t.pathColor = e.colorBox3[c][m], o.shapeContent.push({
                            pathRange: [
                                [t.unp_start - 1, 0],
                                [t.unp_end - 1, 0]
                            ],
                            pathData: t,
                            color: e.colorBox3[c][m]
                        }), a.shapeContent.push({
                            textRange: [
                                [t.unp_start + 2, 0],
                                [-9, 0]
                            ],
                            textString: t.struct_asym_id,
                            pathData: t,
                            textAnchor: "left"
                        }), u.push(t.unp_start + "-" + t.unp_end), m++, m === f && (m = 0)) : (s.options.totalChains++, o.shapeContent[i].pathData.chainId += "," + t.struct_asym_id, a.shapeContent[i].textString += ", " + t.struct_asym_id), d += "<br>- UniProt range " + t.unp_start + "-" + t.unp_end + " (" + (t.unp_end - t.unp_start + 1) + " residues)corresponds to residues " + t.struct_asym_id + ":" + t.start.residue_number + ": - " + t.struct_asym_id + ":" + t.end.residue_number + ": in PDB entry."
                    }), s.shapes.push(o, a), s.groups.push({
                        label: r,
                        "class": "straightLineGrp" + r,
                        parentGroup: "",
                        marginTop: i
                    }), s.pdbIdArr.push(r), s.infoIconMsg[r] = d, c++, c === e.colorBox3.length && (c = 0)
                }), s
            }
        }]).filter("modifiedResFilter", ["commonServices", function(e) {
            return function(t, n, r, i, o, a, s, l) {
                var c = [],
                    u = function(e, t) {
                        var n = {
                                residueNum: t.residue_number,
                                chainId: t.chain_id,
                                entityId: t.entity_id,
                                structAsymId: t.struct_asym_id
                            },
                            r = -1;
                        return angular.forEach(e, function(e, t) {
                            var i = {
                                pdbStart: e.pathData.start.residue_number,
                                pdbEnd: e.pathData.end.residue_number,
                                unpStart: e.pathRange[0][0] + 1,
                                unpEnd: e.pathRange[1][0] + 1,
                                chainId: e.pathData.chain_id,
                                entityId: e.pathData.entity_id,
                                structAsymId: e.pathData.struct_asym_id
                            };
                            n.residueNum >= i.pdbStart && n.residueNum <= i.pdbEnd && n.structAsymId <= i.structAsymId && n.entityId <= i.entityId && (r = n.residueNum - (i.pdbStart - i.unpStart))
                        }), r
                    },
                    d = {
                        shape: "path",
                        shapeGroupClass: "mutationGrp_" + r,
                        shapeClass: "mutation_" + r,
                        shapeHeight: i,
                        marginTop: o,
                        showTooltip: !0,
                        shapeContent: []
                    },
                    p = {
                        shape: "text",
                        shapeGroupClass: "mutationGrp_" + r,
                        shapeClass: "showTextOnZoom singleTextEle mutation_text_" + r,
                        shapeHeight: i,
                        marginTop: o,
                        showTooltip: !0,
                        shapeContent: []
                    };
                return angular.forEach(t, function(t, r) {
                    var i = t.residue_number;
                    if ("unipdbe" === l) i = u(n, t);
                    else if (t.entity_id != n.entityId) return;
                    var o = "",
                        c = "";
                    "undefined" != typeof t.mutation_details && "mutatedResidues" === s ? (null !== t.mutation_details.from && (o += t.mutation_details.from + " --> "), o += t.mutation_details.to + " (" + t.mutation_details.type + ")", c = t.mutation_details.to) : (o = "Modified Residue: " + t.chem_comp_id, c = ""), i > -1 && (d.shapeContent.push({
                        pathRange: [
                            [i - 1 - .5, 0],
                            [i - 1 + .5, 0]
                        ],
                        tooltipMsg: o,
                        pathData: t,
                        color: e.specificColors.burntOrange
                    }), p.shapeContent.push({
                        textRange: [
                            [i - 1, 0],
                            [a, 0]
                        ],
                        tooltipMsg: o,
                        textString: c,
                        pathData: t,
                        color: e.specificColors.burntOrange
                    }))
                }), d.shapeContent.length > 0 && c.push(d), p.shapeContent.length > 0 && c.push(p), c
            }
        }]).filter("unipdbModelFilter", ["d3", "$filter", function(e, t) {
            return function(n, r, i) {
                var o = {
                    groups: [],
                    shapes: []
                };
                return angular.forEach(n, function(n, r) {
                    var a = i.select(".pathGrp" + r).attr("transform"),
                        s = /\((.+),(.+)\)/,
                        l = a.match(s),
                        c = [l[1], l[2]],
                        u = e.selectAll(".path" + r).data();
                    angular.forEach(n, function(e, n) {
                        if ("undefined" != typeof e && e)
                            if ("modifiedResidues" === n || "mutatedResidues" === n) {
                                var i = t("modifiedResFilter")(e, u, r, 20, 10, 14, n, "unipdbe");
                                i.length > 0 && (o.groups.push({
                                    label: "",
                                    "class": "mutationGrp mutationGrp_" + r,
                                    parentGroup: "",
                                    marginTop: c[1] - 25
                                }), o.shapes = o.shapes.concat(i))
                            } else if ("molecules" === n) {
                            for (var a = {}, s = {}, l = 0, d = 0, p = e.length, h = 0; p > h && (a = {
                                    shape: "zigzag",
                                    shapeGroupClass: "pathGrp" + r,
                                    shapeClass: "linkerPath" + r + " linkerPath" + r,
                                    shapeHeight: 20,
                                    showTooltip: !0,
                                    shapeContent: []
                                }, s = {
                                    shape: "path",
                                    shapeGroupClass: "straightLineGrp" + r,
                                    shapeClass: "linePathEle straightLinePath" + r + " straightLinePath" + r,
                                    shapeHeight: 3,
                                    showTooltip: !0,
                                    shapeContent: []
                                }, angular.forEach(u, function(t, n) {
                                    if (t.pathData.entity_id === e[h].entity_id) {
                                        var r = e[h].length,
                                            i = t.pathData.start.residue_number,
                                            o = t.pathData.end.residue_number;
                                        if (a.shapeColour = t.pathData.pathColor, (0 === d && i > 1 || d > 0 && i > d) && a.shapeContent.push({
                                                pathStart: t.pathData.unp_start - 1,
                                                pathPosition: "start",
                                                tooltipMsg: "Beginning 1 - " + (i - 1) + " residues are not mapped to UniProt",
                                                pathData: t.pathData,
                                                color: t.pathData.pathColor
                                            }), r > o && a.shapeContent.push({
                                                pathStart: t.pathData.unp_end - 1,
                                                pathPosition: "end",
                                                tooltipMsg: "Ending " + (parseInt(o) + 1) + " - " + r + " residues are not mapped to UniProt",
                                                pathData: t.pathData,
                                                color: t.pathData.pathColor
                                            }), l++, "undefined" != typeof u[n + 1] && o <= u[n + 1].pathData.start.residue_number && u[n + 1].pathData.unp_start > t.pathData.unp_end)
                                            if (u[n + 1].pathData.start.residue_number === o + 1) s.shapeContent.push({
                                                pathRange: [
                                                    [t.pathData.unp_end - 1, 0],
                                                    [u[n + 1].pathData.unp_start - 1, 0]
                                                ],
                                                tooltipMsg: "Uniprot Residues" + (parseInt(t.pathData.unp_end) + 1) + "-" + (u[n + 1].pathData.unp_start - 1) + " are deleted",
                                                pathData: t.pathData,
                                                color: [0, 0, 0]
                                            });
                                            else {
                                                var c = (u[n + 1].pathData.unp_start - t.pathData.unp_end) / 4;
                                                s.shapeContent.push({
                                                    pathRange: [
                                                        [t.pathData.unp_end - 1, 0],
                                                        [t.pathData.unp_end - 1 + c, -5],
                                                        [t.pathData.unp_end - 1 + 2 * c, 0],
                                                        [t.pathData.unp_end - 1 + 3 * c, 5],
                                                        [u[n + 1].pathData.unp_start - 1, 0]
                                                    ],
                                                    tooltipMsg: parseInt(o) + 1 + "-" + (u[n + 1].pathData.start.residue_number - 1) + " residues are not mapped to UniProt",
                                                    pathData: t.pathData,
                                                    color: [0, 0, 0]
                                                })
                                            }
                                    }
                                }), l != u.length); h++);
                            s.shapeContent.length > 0 && o.shapes.push(s), a.shapeContent.length > 0 && o.shapes.push(a)
                        }
                    })
                }), o
            }
        }]).filter("unpToPfamFilter", ["commonServices", function(e) {
            return function(t, n) {
                var r = {},
                    i = {};
                if (!angular.isUndefined(t) && t && !angular.isUndefined(t.data) && t.data) {
                    i = {
                        shape: "text",
                        shapeGroupClass: "pfamLabelGrp",
                        shapeClass: "hideTextOnZoom pfam_text",
                        shapeColour: void 0,
                        shapeHeight: 15,
                        marginTop: 2,
                        showTooltip: !0,
                        shapeContent: [],
                        fitInPath: !0
                    }, r = {
                        shape: "path",
                        shapeGroupClass: "pfamPathGrp",
                        shapeClass: "pfamPath",
                        shapeHeight: 30,
                        showTooltip: !0,
                        shapeContent: [],
                        infoToolTipMsg: "This UniProt entry contains the following uniprot domain:"
                    };
                    var o = 0;
                    angular.forEach(t.data[n].Pfam, function(t, n) {
                        var a = t.mappings.length,
                            s = " of " + t.name + " (" + n + ": " + t.description + ") mapping to residues ";
                        angular.forEach(t.mappings, function(l, c) {
                            c > 0 && (s += c === a - 1 ? " and" : ","), s += " " + l.unp_start + "-" + l.unp_end, r.shapeContent.push({
                                pathRange: [
                                    [l.unp_start - 1, 0],
                                    [l.unp_end - 1, 0]
                                ],
                                pathData: {
                                    pfamId: n,
                                    pfamData: t
                                },
                                color: e.colorGradients.redStack[o]
                            }), i.shapeContent.push({
                                textRange: [
                                    [l.unp_start + (l.unp_end - l.unp_start) / 2 - 1, 0],
                                    [-10, 0]
                                ],
                                textString: t.name,
                                pathData: t,
                                pathClassPrefix: "pfamPath",
                                fitInPath: !0
                            }), c === a - 1 && (s = 0 === c ? "<br> - one copy" + s : "<br> - " + a + " copies" + s), o++, o === e.colorGradients.redStack.length && (o = 0)
                        }), r.infoToolTipMsg += s, s = ""
                    })
                }
                return {
                    shapes: [r, i]
                }
            }
        }]).filter("pfamZigzagShapeFilter", [function() {
            return function(e, t, n) {
                var r = {},
                    i = n.selectAll(".pfamPath" + t).data();
                angular.forEach(i, function(e, t) {
                    r[e.domainId] = {
                        start: e.pathData.start.residue_number,
                        end: e.pathData.end.residue_number,
                        color: e.color
                    }
                });
                var o = {},
                    a = n.selectAll(".uniprotPath" + t).data();
                angular.forEach(a, function(e, t) {
                    o[e.domainId] = {
                        start: e.pathData.unp_start,
                        end: e.pathData.unp_end
                    }
                });
                var s = {
                    shape: "zigzag",
                    shapeGroupClass: "pfamPathGrp" + t,
                    shapeClass: "linkerPath" + t + " linkerPath" + t,
                    shapeHeight: 20,
                    showTooltip: !0,
                    shapeContent: []
                };
                return !angular.isUndefined(e) && e && angular.forEach(e, function(e, t) {
                    angular.forEach(e.uniProtToPfam.Pfam, function(e, n) {
                        angular.forEach(e.mappings, function(i, a) {
                            var l = r[n],
                                c = o[t];
                            i.unp_start > c.start && s.shapeContent.push({
                                pathStart: l.start - 1,
                                pathPosition: "start",
                                tooltipMsg: "Missing Uniprot Residues from " + c.start + " to " + (i.unp_start - 1),
                                pathData: e,
                                color: l.color
                            }), i.unp_end < c.end && s.shapeContent.push({
                                pathStart: l.end - 1,
                                pathPosition: "end",
                                tooltipMsg: "Missing Uniprot Residues from " + (i.unp_end + 1) + " to " + c.end,
                                pathData: e,
                                color: l.color
                            })
                        })
                    })
                }), {
                    shapes: [s]
                }
            }
        }]).filter("highlightResideShapeFilter", [function() {
            return function(e, t) {
                var n = "highlightPath highlightPath",
                    r = !1;
                "click" == t && (n = "selectionPath selectionPath", r = !0);
                var i = {
                    shape: "path",
                    shapeGroupClass: "chain" + e.chainId + "PathGrp" + e.entryId.toLowerCase(),
                    shapeClass: n,
                    shapeHeight: 25,
                    marginTop: 0,
                    showTooltip: r,
                    shapeContent: [{
                        pathRange: [
                            [e.residueNumber - 1 - .5, 0],
                            [e.residueNumber - 1 + .5, 0]
                        ],
                        elementType: "ResidueSelection",
                        pathData: e,
                        color: [0, 0, 0],
                        opacity: .5
                    }]
                };
                return {
                    shapes: [i]
                }
            }
        }]).filter("pdbModelFilter", ["$filter", "seqViewerService", "commonServices", function(e, t, n) {
            return function(r, i, o, a, s, l, c, u, d, p, h) {
                var m = function(e, t) {
                        for (var n = e.length, r = 0; n > r; r++)
                            if (e[r].entity_id == t) return e[r]
                    },
                    f = function(e, t, n, r, i) {
                        var o = {
                                idArr: [c],
                                unpShapeObj: {
                                    shape: "path",
                                    shapeGroupClass: n + "PathGrp" + c,
                                    shapeClass: "seqPath " + n + "Path" + c + " " + n + "Path" + c,
                                    shapeHeight: 15,
                                    showTooltip: !0,
                                    shapeContent: []
                                },
                                mappingTextObj: {
                                    shape: "text",
                                    shapeGroupClass: n + "PathGrp" + c,
                                    shapeClass: n + "_text",
                                    shapeHeight: 15,
                                    marginTop: 2,
                                    showTooltip: !0,
                                    shapeContent: [],
                                    fitInPath: !0
                                }
                            },
                            a = r.length,
                            s = {},
                            l = {},
                            u = 0;
                        return angular.forEach(e, function(d, p) {
                            angular.forEach(d.mappings, function(h, m) {
                                if (h.entity_id == t) {
                                    if (("cath" === n || "scop" === n) && h.struct_asym_id != i) return;
                                    var f = h.start.residue_number + "-" + h.end.residue_number;
                                    if (f in s) s[f].tooltipMsg = s[f].tooltipMsg.replace("(chain ", "(chains "), l[f].tooltipMsg = s[f].tooltipMsg.replace("(chain ", "(chains "), s[f].tooltipMsg = s[f].tooltipMsg.replace(")", " " + h.chain_id + ")"), l[f].tooltipMsg = s[f].tooltipMsg.replace(")", " " + h.chain_id + ")");
                                    else {
                                        var g = "";
                                        "uniprot" == n && (g = "<br>UniProt range: " + h.unp_start + " - " + h.unp_end), g += "<br>PDB range: " + h.start.residue_number + " - " + h.end.residue_number + " (chain " + h.chain_id + ")";
                                        var y;
                                        "scop" === n ? (y = e[p].sccs, g += "<br><strong>" + y + "</strong><br>" + d.identifier) : (y = p, g += "<br><strong>" + y + "</strong><br>" + d.identifier, -1 === o.idArr.indexOf(p) && o.idArr.push(p)), s[f] = {
                                            pathRange: [
                                                [h.start.residue_number - 1, 0],
                                                [h.end.residue_number - 1, 0]
                                            ],
                                            tooltipMsg: g,
                                            tooltipPosition: "postfix",
                                            pathData: h,
                                            domainId: y,
                                            elementType: n,
                                            elementColor: r[u],
                                            color: r[u]
                                        }, l[f] = {
                                            textRange: [
                                                [h.start.residue_number + (h.end.residue_number - h.start.residue_number) / 2 - 1, 0],
                                                [5, 0]
                                            ],
                                            textString: d.identifier,
                                            pathData: h,
                                            pathClassPrefix: n + "Path" + c,
                                            fitInPath: !0,
                                            tooltipMsg: g,
                                            tooltipPosition: "postfix",
                                            elementType: n,
                                            elementColor: r[u],
                                            color: r[u]
                                        }, u++, u === a && (u = 0)
                                    }
                                }
                            })
                        }), angular.forEach(s, function(e, t) {
                            o.unpShapeObj.shapeContent.push(e), o.mappingTextObj.shapeContent.push(l[t])
                        }), o
                    },
                    g = function(e, t, r) {
                        var i = [],
                            o = {
                                shape: "path",
                                shapeGroupClass: "secStrPathGrp" + c,
                                shapeClass: "secStrPath" + c + " secStrPath" + c,
                                shapeHeight: 13,
                                showTooltip: !0,
                                shapeContent: []
                            },
                            a = {
                                shape: "arrow",
                                shapeGroupClass: "secStrPathGrp" + c,
                                shapeClass: "arrowPath secStrPath" + c + " secStrPath" + c,
                                shapeHeight: 1,
                                showTooltip: !0,
                                shapeContent: []
                            };
                        return angular.forEach(e, function(e, i) {
                            e.entity_id == t && angular.forEach(e.chains, function(e, t) {
                                e.struct_asym_id == r && angular.forEach(e.secondary_structure, function(t, r) {
                                    "undefined" != typeof t && t && angular.forEach(t, function(t, i) {
                                        var s = {
                                            pathData: {
                                                chain_id: e.chain_id,
                                                struct_asym_id: e.struct_asym_id,
                                                start: t.start,
                                                end: t.end
                                            },
                                            pathRange: [
                                                [t.start.residue_number - 1, 0],
                                                [t.end.residue_number - 1, 0]
                                            ],
                                            tooltipMsg: "",
                                            elementType: r.slice(0, -1)
                                        };
                                        "helices" === r ? (s.tooltipMsg = "A helix in chain " + e.chain_id, s.elementColor = n.specificColors.brass, s.color = n.specificColors.brass, o.shapeContent.push(s)) : "strands" === r && (s.tooltipMsg = "A strand in a sheet in chain " + e.chain_id, s.elementColor = n.specificColors.airForceBlue, s.color = n.specificColors.airForceBlue, a.shapeContent.push(s))
                                    })
                                })
                            })
                        }), o.shapeContent.length > 0 && i.push(o), a.shapeContent.length > 0 && i.push(a), i
                    },
                    y = function(e, t, r, i) {
                        var o = t[0].pathData.chain_id,
                            a = [{
                                shape: "path",
                                shapeGroupClass: "quality" + o + "PathGrp" + i,
                                shapeClass: "quality" + o + "Path" + i + " quality" + o + "Path" + i,
                                shapeHeight: 15,
                                showTooltip: !0,
                                shapeContent: []
                            }];
                        return angular.forEach(t, function(e, t) {
                            var r = {
                                pathData: e.pathData,
                                pathRange: [
                                    [e.pathRange[0][0], 0],
                                    [e.pathRange[1][0], 0]
                                ],
                                tooltipMsg: "No validation issue reported for",
                                tooltipPosition: "prefix",
                                elementType: "quality",
                                color: n.specificColors.qualityGreen
                            };
                            a[0].shapeContent.push(r)
                        }), angular.forEach(e, function(e, t) {
                            e.entity_id == r && angular.forEach(e.chains, function(e, t) {
                                e.chain_id == o && angular.forEach(e.models, function(e, t) {
                                    angular.forEach(e.residues, function(e, t) {
                                        var r = {
                                                shape: "path",
                                                shapeGroupClass: "quality" + o + "PathGrp" + i,
                                                shapeClass: "qualityOverlay" + o + "Path" + i + " qualityOverlay" + o + "Path" + i,
                                                shapeHeight: 15,
                                                showTooltip: !0,
                                                shapeContent: [{
                                                    pathData: e,
                                                    pathRange: [
                                                        [e.residue_number - 1.5, 0],
                                                        [e.residue_number - .5, 0]
                                                    ],
                                                    tooltipMsg: "",
                                                    tooltipPosition: "prefix",
                                                    elementType: "quality_outlier",
                                                    color: n.specificColors.qualityYellow
                                                }]
                                            },
                                            s = "issue";
                                        r.shapeContent[0].pathData.chain_id = o, 1 === e.outlier_types.length && "RSRZ" === e.outlier_types[0] ? (r.shapeContent[0].color = n.specificColors.qualityRed, r.shape = "circle", r.shapeClass = "qualityCircle" + o + i + t, r.marginTop = -13, r.shapeContent[0].residue_number = e.residue_number, r.shapeContent[0].marginTop = -13) : 1 === e.outlier_types.length ? r.shapeContent[0].color = n.specificColors.qualityYellow : 2 === e.outlier_types.length ? (r.shapeContent[0].color = n.specificColors.burntOrangeBright, s = "issues") : (r.shapeContent[0].color = n.specificColors.qualityRed, s = "issues"), r.shapeContent[0].tooltipMsg = "Validation " + s + ": " + e.outlier_types.join(", ") + "<br>", a.push(r)
                                    })
                                })
                            })
                        }), a[0].shapeContent.length > 0 ? a : []
                    },
                    v = function(e, t, r, i, o) {
                        var a = [];
                        return angular.forEach(e, function(e, s) {
                            if (e.entity_id == t) {
                                var l = 0;
                                "other" === i && (l = 1), angular.forEach(e.chains, function(e, s) {
                                    if ("other" !== i || e.struct_asym_id != o) {
                                        for (var c = {
                                                shape: "path",
                                                shapeGroupClass: "chain" + e.chain_id + "PathGrp" + r,
                                                shapeClass: "seqPath chain" + e.chain_id + "Path" + r + " chain" + e.chain_id + "Path" + r,
                                                shapeHeight: 15,
                                                showTooltip: !0,
                                                shapeContent: []
                                            }, u = e.observed.length, d = 0; u > d; d++) c.shapeContent.push({
                                            pathRange: [
                                                [e.observed[d].start.residue_number - 1, 0],
                                                [e.observed[d].end.residue_number - 1, 0]
                                            ],
                                            pathData: {
                                                chain_id: e.chain_id,
                                                struct_asym_id: e.struct_asym_id,
                                                entity_id: t,
                                                chain_range: e.observed[d].start.residue_number + "-" + e.observed[d].end.residue_number
                                            },
                                            elementType: "chain",
                                            color: n.colorGradients.darkStack[l]
                                        });
                                        l++, l === n.colorGradients.darkStack.length && (l = 0), a.push(c)
                                    }
                                })
                            }
                        }), a
                    },
                    b = function(e, t, r, i) {
                        for (var o = {
                                shape: "path",
                                shapeGroupClass: t,
                                shapeClass: "nonSeqPath " + r + "nonSeqPath" + i + " " + r + "nonSeqPath" + i,
                                shapeHeight: 6,
                                showTooltip: !0,
                                shapeContent: []
                            }, a = e.length, s = 0; a > s; s++) "undefined" != typeof e[s + 1] && o.shapeContent.push({
                            pathRange: [
                                [e[s].pathRange[1][0], 0],
                                [e[s + 1].pathRange[0][0], 0]
                            ],
                            pathData: "",
                            elementType: "unobserved residues",
                            color: n.specificColors.lightGray
                        });
                        return o.shapeContent.length > 0 ? o : {}
                    },
                    w = function(e, t, r, i) {
                        var o = {},
                            a = [];
                        angular.forEach(e, function(e, n) {
                            if ("undefined" != typeof e.site_residues && "undefined" != typeof e.ligand_residues) {
                                var r = e.ligand_residues,
                                    i = e.site_residues,
                                    a = [];
                                angular.forEach(r, function(e, t) {
                                    var n = [];
                                    null !== e.chem_comp_id && n.push(e.chem_comp_id), null !== e.chain_id && n.push(e.chain_id), null !== e.author_residue_number && n.push(e.author_residue_number), null !== e.author_insertion_code && n.push(e.author_insertion_code), n.length > 0 && a.push(n.join("-"))
                                }), "undefined" == typeof o[e.site_id] && (o[e.site_id] = {}), "undefined" == typeof o[e.site_id].desc && (o[e.site_id].desc = ""), o[e.site_id].desc = a.join(" :: "), angular.forEach(i, function(n, r) {
                                    n.struct_asym_id == t && ("undefined" == typeof o[e.site_id].ranges && (o[e.site_id].ranges = []), o[e.site_id].ranges.push({
                                        residue_number: n.residue_number,
                                        tooltipMsg: "",
                                        tooltipPosition: "postfix",
                                        marginTop: -13,
                                        elementType: "binding site",
                                        pathData: n,
                                        color: ""
                                    }))
                                })
                            }
                        });
                        var s = {},
                            l = 0,
                            c = n.colorGradients.greenStack.length;
                        return angular.forEach(o, function(e, r) {
                            if ("undefined" != typeof e.ranges && e.ranges.length > 0) {
                                var o = {
                                    shape: "triangle-up",
                                    shapeGroupClass: "bindingSite" + t + "PathGrp" + i,
                                    shapeClass: "bindingSite" + t + "Path" + i,
                                    shapeHeight: 15,
                                    showTooltip: !0,
                                    marginTop: -13,
                                    shapeContent: []
                                };
                                angular.forEach(e.ranges, function(t, r) {
                                    t.tooltipMsg = "is in binding site", "" !== e.desc && (t.tooltipMsg += " of " + e.desc), "" === e.desc ? "undefined" != typeof s["null"] ? t.color = s["null"] : (t.color = n.colorGradients.greenStack[l], s["null"] = t.color, l++) : "undefined" != typeof s[e.desc] ? t.color = s[e.desc] : (t.color = n.colorGradients.greenStack[l], s[e.desc] = t.color, l++), l === c && (l = 0), o.shapeContent.push(t)
                                }), a.push(o)
                            }
                        }), a
                    },
                    x = function(e, t, r, i, o, a, s) {
                        var l = [],
                            c = {
                                shape: "path",
                                shapeGroupClass: r,
                                shapeClass: "hetConformer" + t + "Path" + o,
                                shapeHeight: 15,
                                marginTop: 0,
                                showTooltip: !0,
                                shapeContent: []
                            },
                            u = {
                                shape: "path",
                                shapeGroupClass: r,
                                shapeClass: "altConformer" + t + "Path" + o,
                                shapeHeight: 15,
                                marginTop: 0,
                                showTooltip: !0,
                                shapeContent: []
                            },
                            d = {
                                shape: "text",
                                shapeGroupClass: r,
                                shapeClass: "showTextOnZoom singleTextEle altConformer_text_" + t + "Path" + o,
                                shapeHeight: 15,
                                marginTop: 2,
                                showTooltip: !0,
                                shapeContent: []
                            };
                        return angular.forEach(e, function(e, r) {
                            e.entity_id == i && angular.forEach(e.chains, function(e, r) {
                                e.chain_id == t && angular.forEach(e.residues, function(e, r) {
                                    if ("undefined" != typeof e.multiple_conformers) {
                                        var i = {};
                                        angular.forEach(e.multiple_conformers, function(e, t) {
                                            "undefined" == typeof i[e.chem_comp_id] && (i[e.chem_comp_id] = {}), i[e.chem_comp_id][e.alt_code] = 1
                                        });
                                        var o = "";
                                        e.struct_asym_id = s, e.chain_id = t, Object.keys(i).length > 1 ? (o = " has microheterogeneity.", c.shapeContent.push({
                                            pathRange: [
                                                [e.residue_number - 1 - .5, 0],
                                                [e.residue_number - 1 + .5, 0]
                                            ],
                                            tooltipMsg: o,
                                            tooltipPosition: "postfix",
                                            elementType: "Het Conformer",
                                            pathData: e,
                                            color: n.specificColors.airForceBlue
                                        })) : (o = " has alternate conformers.", u.shapeContent.push({
                                            pathRange: [
                                                [e.residue_number - 1 - .5, 0],
                                                [e.residue_number - 1 + .5, 0]
                                            ],
                                            tooltipMsg: o,
                                            tooltipPosition: "postfix",
                                            elementType: "alternate conformer",
                                            pathData: e,
                                            color: n.specificColors.airForceBlue
                                        })), d.shapeContent.push({
                                            textRange: [
                                                [e.residue_number - 1, 0],
                                                [4, 0]
                                            ],
                                            tooltipMsg: o,
                                            tooltipPosition: "postfix",
                                            textString: a[e.residue_number - 1],
                                            pathData: e
                                        })
                                    }
                                })
                            })
                        }), c.shapeContent.length > 0 && l.push(c), u.shapeContent.length > 0 && l.push(u), d.shapeContent.length > 0 && l.push(d), l
                    },
                    S = {
                        groups: [],
                        shapes: [],
                        pathLeftLabels: []
                    },
                    E = 0,
                    I = 0;
                if ("undefined" != typeof r[c].entities) {
                    S = {
                        options: {
                            seqId: c,
                            seqStr: ""
                        },
                        groups: [{
                            label: "",
                            "class": "moleculeGrp",
                            parentGroup: "",
                            marginTop: 8
                        }, {
                            label: "",
                            "class": "molPathGrp",
                            parentGroup: "moleculeGrp",
                            marginTop: 1
                        }, {
                            label: "",
                            "class": "molSeqGrp",
                            parentGroup: "moleculeGrp",
                            marginTop: 14
                        }],
                        shapes: [{
                            shape: "path",
                            shapeGroupClass: "molPathGrp",
                            shapeClass: "seqPath molPath",
                            shapeHeight: 15,
                            marginTop: 0,
                            showTooltip: !0,
                            shapeContent: [{
                                pathRange: [
                                    [0, 0],
                                    [0, 0]
                                ],
                                pathData: {
                                    pdbId: c,
                                    pdbSeq: ""
                                },
                                elementType: "molecule",
                                color: n.specificColors.lightGray
                            }]
                        }, {
                            shape: "sequence",
                            shapeGroupClass: "molSeqGrp",
                            shapeClass: "molSeq"
                        }],
                        pdbIdArr: [],
                        pathLeftLabels: []
                    };
                    var C = m(r[c].entities, u);
                    S.options.seqStr = S.shapes[0].shapeContent[0].pathData.pdbSeq = C.sequence, S.shapes[0].shapeContent[0].pathRange[1][0] = C.sequence.length
                }
                if ("undefined" != typeof r[c].mappings) {
                    var T = ["UniProt", "Pfam"];
                    angular.forEach(T, function(e, t) {
                        var i = e.toLowerCase();
                        if ("undefined" != typeof r[c].mappings[e] && r[c].mappings[e]) {
                            var o = f(r[c].mappings[e], u, i, n.colorBox3[I], h),
                                a = o.unpShapeObj;
                            "undefined" != typeof a.shapeContent && a.shapeContent.length > 0 && (S.groups.push({
                                label: c,
                                "class": i + "PathGrp" + c,
                                parentGroup: "",
                                marginTop: E + 20
                            }), S.shapes.push(a), S.shapes.push(o.mappingTextObj), E += 30, I++, S.pathLeftLabels.push(e)), o.idArr.length > 0 && "UniProt" === e && (S.options.uniprotIdArr = o.idArr)
                        }
                    })
                }
                var M = "",
                    _ = "other";
                if ("undefined" != typeof r[c].polymerCoveragePerChain) M = r[c].polymerCoveragePerChain, _ = "best";
                else if ("undefined" != typeof r[c].polymerCoverage) {
                    M = r[c].polymerCoverage;
                    for (var A = ["scopPathGrp" + c, "cathPathGrp" + c, "secStrPathGrp" + c, "quality" + p + "PathGrp" + c], P = 0; 3 > P; P++) {
                        var k = d.select("." + A[P]);
                        if (null !== k[0][0]) {
                            var R = k.attr("transform"),
                                V = parseInt(R.substring(R.lastIndexOf(",") + 1, R.lastIndexOf(")"))) - (20 - l);
                            V > E && (E = V)
                        }
                    }
                }
                if ("undefined" != typeof M && "" !== M) {
                    var D = v(M.molecules, u, c, _, h);
                    D.length > 0 && angular.forEach(D, function(e, t) {
                        var n = e.shapeContent[0].pathData.chain_id,
                            l = e.shapeGroupClass;
                        "other" === _ && (l = e.shapeGroupClass + " otherChainPaths"), S.groups.push({
                            label: c,
                            "class": l,
                            parentGroup: "",
                            marginTop: E + 20
                        }), S.shapes.push(e), S.shapes.push({
                            shape: "sequence",
                            marginTop: 13,
                            shapeGroupClass: D[0].shapeGroupClass,
                            shapeClass: "chain" + n,
                            shapeColour: airForceBlue
                        });
                        var d = b(e.shapeContent, e.shapeGroupClass, n, c);
                        d && S.shapes.push(d), E += 30, I++, S.pathLeftLabels.push("Chain " + n);
                        var p = "",
                            h = "quality" + n + "PathGrp" + c;
                        if ("undefined" != typeof r[c].outliers ? p = r[c].outliers : "undefined" != typeof i && "" !== i && (p = i, h = "quality" + n + "PathGrp" + c + " otherChainPaths"), "undefined" != typeof p) {
                            var m = y(p.molecules, e.shapeContent, u, c);
                            m && (S.groups.push({
                                label: c,
                                "class": h,
                                parentGroup: "",
                                marginTop: E + 20
                            }), S.shapes = S.shapes.concat(m), E += 30, I++, S.pathLeftLabels.push("Quality"))
                        }
                        var f = "",
                            g = e.shapeContent[0].pathData.struct_asym_id,
                            v = "bindingSite" + g + "PathGrp" + c;
                        if ("undefined" != typeof r[c].bindingSites ? f = r[c].bindingSites : "undefined" != typeof o && "" !== o && (f = o), "undefined" != typeof f) {
                            var C = w(f, g, u, c);
                            C.length > 0 && (S.groups.push({
                                label: c,
                                "class": v,
                                parentGroup: e.shapeGroupClass,
                                marginTop: 0
                            }), S.shapes = S.shapes.concat(C))
                        }
                        var T = "";
                        if ("undefined" != typeof r[c].residueListing ? T = r[c].residueListing : "undefined" != typeof a && "" !== a && (T = a), "undefined" != typeof T) {
                            var M = [];
                            "undefined" != typeof S.options && "undefined" != typeof S.options.seqStr && "" !== S.options.seqStr ? M = S.options.seqStr.split("") : "undefined" != typeof s && s && (M = s);
                            var A = x(T.molecules, n, e.shapeGroupClass, u, c, M, g);
                            A.length > 0 && (S.groups.push({
                                label: c,
                                "class": e.shapeGroupClass,
                                parentGroup: "",
                                marginTop: 0
                            }), S.shapes = S.shapes.concat(A))
                        }
                    })
                }
                if ("undefined" != typeof r[c].secStrutures && "undefined" != typeof r[c].secStrutures.molecules && r[c].secStrutures.molecules) {
                    var L = g(r[c].secStrutures.molecules, u, h);
                    L && (S.groups.push({
                        label: c,
                        "class": "secStrPathGrp" + c,
                        parentGroup: "",
                        marginTop: E + 20
                    }), S.shapes = S.shapes.concat(L), E += 30, S.pathLeftLabels.push("Sec. Str."))
                }
                if ("undefined" != typeof r[c].mappings) {
                    var F = ["CATH", "SCOP"];
                    angular.forEach(F, function(e, t) {
                        var i = e.toLowerCase();
                        if ("undefined" != typeof r[c].mappings[e] && r[c].mappings[e]) {
                            var o = f(r[c].mappings[e], u, i, n.colorBox3[I], h),
                                a = o.unpShapeObj;
                            "undefined" != typeof a.shapeContent && a.shapeContent.length > 0 && (S.groups.push({
                                label: c,
                                "class": i + "PathGrp" + c,
                                parentGroup: "",
                                marginTop: E + 20
                            }), S.shapes.push(a), S.shapes.push(o.mappingTextObj), E += 30, I++, S.pathLeftLabels.push(e))
                        }
                    })
                }
                if ("undefined" != typeof r[c].mutatedResidues) {
                    var H = e("modifiedResFilter")(r[c].mutatedResidues, {
                        entityId: u
                    }, c, 15, 1, 5, "mutatedResidues", "pdbeSeq");
                    H.length > 0 && (S.groups.push({
                        label: "",
                        "class": "mutationGrp mutationGrp_" + c,
                        parentGroup: "moleculeGrp",
                        marginTop: 8
                    }), S.shapes = S.shapes.concat(H))
                }
                if ("undefined" != typeof r[c].modifiedResidues) {
                    var H = e("modifiedResFilter")(r[c].modifiedResidues, {
                        entityId: u
                    }, c, 15, 1, 5, "modifiedResidues", "pdbeSeq");
                    H.length > 0 && (S.groups.push({
                        label: "",
                        "class": "mutationGrp mutationGrp_" + c,
                        parentGroup: "moleculeGrp",
                        marginTop: 8
                    }), S.shapes = S.shapes.concat(H))
                }
                return t.setPathColorIndex(I), S
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("pdb.sequence.view.services", []).service("seqViewerService", ["$http", "$q", "$filter", function(e, t, n) {
            this.pathColorIndex = 0, this.setPathColorIndex = function(e) {
                this.pathColorIndex = e
            }, this.getPathColorIndex = function() {
                return this.pathColorIndex
            }, this.apiUrls = {
                summary: "//www.ebi.ac.uk/pdbe/api/pdb/entry/summary/",
                entities: "//www.ebi.ac.uk/pdbe/api/pdb/entry/entities/",
                modifiedResidues: "//www.ebi.ac.uk/pdbe/api/pdb/entry/modified_AA_or_NA/",
                mutatedResidues: "//www.ebi.ac.uk/pdbe/api/pdb/entry/mutated_AA_or_NA/",
                polymerCoverage: "//www.ebi.ac.uk/pdbe/api/pdb/entry/polymer_coverage/",
                polymerCoveragePerChain: "//www.ebi.ac.uk/pdbe/api/pdb/entry/polymer_coverage/",
                bindingSites: "//www.ebi.ac.uk/pdbe/api/pdb/entry/binding_sites/",
                mappings: "//www.ebi.ac.uk/pdbe/api/mappings/",
                residueListing: "//www.ebi.ac.uk/pdbe/api/pdb/entry/residue_listing/",
                secStrutures: "//www.ebi.ac.uk/pdbe/api/pdb/entry/secondary_structure/",
                outliers: "//www.ebi.ac.uk/pdbe/api/validation/residuewise_outlier_summary/entry/",
                topology: "//www.ebi.ac.uk/pdbe/api/topology/entry/",
                molecules: "//www.ebi.ac.uk/pdbe/api/pdb/entry/molecules/",
                uniProtToPfam: "//www.ebi.ac.uk/pdbe/api/mappings/uniprot_to_pfam/",
                observedResidueRatio: "//www.ebi.ac.uk/pdbe/api/pdb/entry/observed_residues_ratio/",
                residueListingPerChain: "//www.ebi.ac.uk/pdbe/api/pdb/entry/residue_listing/"
            }, this.createPromise = function(t, n, r) {
                var i = this.apiUrls,
                    o = n.map(function(n) {
                        return "mappings" === n || "uniProtToPfam" === n ? e.get(i[n] + "" + t[0]) : "polymerCoveragePerChain" === n || "topology" === n || "residueListingPerChain" === n ? e.get(i[n] + "" + t[0] + "/chain/" + r) : e({
                            method: "POST",
                            url: i[n],
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            data: t.join(",")
                        })
                    });
                return o
            }, this.combinedDataGrabber = function(e, t, n) {
                var r = e.map(function(e) {
                    return e.then(function(e) {
                        return {
                            resolve: !0,
                            result: e
                        }
                    }, function(e) {
                        return {
                            resolve: !1,
                            result: e
                        }
                    })
                });
                return Promise.all(r).then(function(e) {
                    var t = [],
                        r = [],
                        i = !0;
                    if (e.forEach(function(e) {
                            e.resolve && (i = !1), t.push(e.resolve ? e.result : null), r.push(e.resolve ? null : e.result)
                        }), i) throw r;
                    var o = {};
                    return angular.forEach(t, function(e, t) {
                        null !== e && "undefined" != typeof e && "undefined" != typeof e.data && e.data && angular.forEach(e.data, function(e, r) {
                            var i = "";
                            "undefined" != typeof e && e && (i = e), "undefined" == typeof o[r] && (o[r] = {});
                            var a = n[t];
                            o[r][a] = i
                        })
                    }), o
                })
            }, this.getUnipdbData = function(r) {
                var i = "//www.uniprot.org/uniprot/?query=accession:" + r + "&columns=id,sequence,entry name,protein names,organism,genes&format=tab&limit=1",
                    o = "//www.ebi.ac.uk/pdbe/api/mappings/" + r,
                    a = "//www.ebi.ac.uk/pdbe/api/mappings/best_structures/" + r,
                    s = {
                        uniprotId: r,
                        unipdbHeading: "",
                        uniprotSeq: "",
                        pdbMappings: {},
                        bestStrMappings: void 0
                    },
                    l = t.defer();
                return e.get(i).then(function(t) {
                    var i = t.data.split("\n"),
                        c = (i.length, i[1].split("	"));
                    s.uniprotSeq = c[1].trim(), s.unipdbHeading = c[3].replace(/\(.*\)/g, "").replace(/\[.*\]/g, "") + "<br><strong>" + c[0] + "</strong> " + c[2] + " <i>" + c[4].replace(/\(.*\)/g, "") + " </i> " + c[5].split(" ")[0], e.get(o).then(function(t) {
                        s.pdbMappings = t.data[r].PDB, e.get(a).then(function(e) {
                            s.bestStrMappings = e.data[r];
                            var t = n("uniProtMappingFilter")(s);
                            l.resolve(t)
                        }, function(e) {
                            var t = n("uniProtMappingFilter")(s);
                            l.resolve(t)
                        })
                    }, function(e) {
                        window.console && console.log("Error : SIFTS Mappings API service request failed!"), l.reject("fail response")
                    })
                }, function(e) {
                    window.console && console.log("Error : Uniprot API service request failed!"), l.reject("fail response")
                }), l.promise
            }, this.getUnipdbPfamData = function(n) {
                var r = "//www.ebi.ac.uk/pdbe/api/mappings/uniprot_to_pfam/" + n,
                    i = t.defer();
                return e.get(r).then(function(e) {
                    i.resolve(e)
                }, function(e) {
                    window.console && console.log("Error : PFAM Mappings API service request failed!"), i.reject("fail response")
                }), i.promise
            }
        }])
    }(), angular.module("template/sequenceView/pdb.html", []).run(["$templateCache", function(e) {
        e.put("template/sequenceView/pdb.html", '<div class="button-group" ng-show="showViewBtn" ng-style="styles.btnGrp"><ul style="float:right"><li><a ng-click="activeViewBtn = \'compact\'" ng-class="{\'active\' : activeViewBtn == \'compact\'}" title="Compact View" href="javascript:void(0);">Compact</a></li><li><a ng-click="activeViewBtn = \'expanded\'" ng-class="{\'active\' : activeViewBtn == \'expanded\'}" title="Expanded View" href="javascript:void(0);">Expanded</a></li></ul></div><div class="seqViewerWrapper" style="clear:both;" ng-style="styles.wrapper"><div class="seqViewLoader" ng-style="styles.wrapper" ng-show="showLoader"><img ng-src="//www.ebi.ac.uk/pdbe/widgets/html/loading.gif" border="0" ng-style="styles.loaderImg" /></div><div class="seqViewLoader" ng-style="styles.wrapper" ng-show="showError"><div class="seqViewErrorMsg">Sorry, Something went wrong!</div></div><div ng-style="styles.loadSecBackground">&nbsp;</div><div class="loadMoreChainCl" ng-style="styles.loadMoreStyle" ng-show="showLoadMoreLink"><a href="javascript:void(0);" class="loadMoreBtn" ng-click="loadMoreChains()">load more chains</a></div><div class="loadMoreChainCl chainHideShowBtnCl" ng-style="styles.loadMoreStyle" ng-show="chiansHideShowBtn"><a href="javascript:void(0);" class="loadMoreBtn" ng-click="hideShowChainsFn()">Show {{chainsViewStatus}} chains</a></div><div class="topSection" ng-style="styles.topSection"><div class="topLeftSection" ng-style="styles.leftSecStyle" style="height:100%" ng-show="showLabels"><div class="pdbPathLeftLabel" style="margin-top:42px">Molecule</div></div><a class="SeqScrollArrow" ng-style="styles.scrollArrowLeft" href="javascript:void(0);" title="Scroll Left"><span ng-mouseup="stopMovingPan()" ng-mousemove="stopMovingPan()" ng-mousedown="movePan(50)" class="icon-black" data-icon="&lt;"></span></a><div class="topRightSection"><svg class="topSvg" ng-style="styles.topSvg"><g class="scaleGrp" transform="translate(10,25)"><g class="x axis"></g></g></svn></div><a class="SeqScrollArrow" ng-style="styles.scrollArrowRight" href="javascript:void(0);" title="Scroll Right"><span ng-mouseup="stopMovingPan()" ng-mousemove="stopMovingPan()" ng-mousedown="movePan(-50)" class="icon-black" data-icon="&gt;"></span></a></div><div class="bottomSection" ng-style="styles.bottomSection"><div class="bottomLeftSection" ng-style="styles.leftSecStyle" ng-show="showLabels"><div class="pdbPathLeftLabel" ng-repeat="leftLabel in pathLeftLabels track by $index" ng-style="{\'margin-top\': $index == 0 ? \'9px\' : \'20px\', \'height\': \'10px\', \'line-height\': \'10px\'}">{{leftLabel}}</div><div class="pdbPathLeftLabel moreChainLabels" ng-repeat="moreChainLabel in pathMoreLeftLabels track by $index" ng-style="{\'margin-top\': \'20px\', \'height\': \'10px\', \'line-height\': \'10px\'}">{{moreChainLabel}}</div></div><div class="bottomRightSection"><svg class="bottomSvg" ng-style="styles.bottomSvg" ><g class="shapesGrp" transform="translate(10,-21)"><rect class="seqSvgBg" x="0" y="0" fill="white" stroke="none" ng-style="styles.bottomSvg" ></rect></g></svg></div></div></div>')
    }]), angular.module("template/sequenceView/uniPdb.html", []).run(["$templateCache", function(e) {
        e.put("template/sequenceView/uniPdb.html", '<div class="seqViewerWrapper" ng-style="styles.wrapper"><div class="seqViewLoader" ng-style="styles.wrapper" ng-show="showLoader"><img ng-src="//www.ebi.ac.uk/pdbe/widgets/html/loading.gif" border="0" ng-style="styles.loaderImg" /></div><div class="seqViewLoader" ng-style="styles.wrapper" ng-show="showError"><div class="seqViewErrorMsg">Sorry, Something went wrong!</div></div><div class="unipdbHeader"><div class="headingTxt" ng-show="wrapperSize.width > 300"></div><div class="button-group" ng-show="showViewBtn"><ul><li><a ng-click="activeViewBtn = \'compact\'" ng-class="{\'active\' : activeViewBtn == \'compact\'}" title="Compact View" href="javascript:void(0);">Compact</a></li><li><a ng-click="activeViewBtn = \'expanded\'" ng-class="{\'active\' : activeViewBtn == \'expanded\'}" title="Expanded View" href="javascript:void(0);">Expanded</a></li></ul></div></div><div class="topSection" ng-style="styles.topSection"><div class="topLeftSection" ng-style="styles.leftSecStyle"><div class="unipdbMappingDesc">{{modelOptions.totalChains}} chains in {{modelOptions.totalEntries}} PDB entries map to this Uniprot accession.</div><div class="topLeftIconSection"><div ng-class="{\'uniprotHeadId\': wrapperSize.width > 300, \'leftPdbIdLabel\': wrapperSize.width < 301}"><a title="Click to go to the UniProt page for this sequence" target="_blank" href="//www.uniprot.org/uniprot/{{modelOptions.seqId}}">{{modelOptions.seqId}}</a></div><div class="infoIconWarpper" ng-show="wrapperSize.width > 300"><img ng-src="//www.ebi.ac.uk/pdbe/widgets/html/PinupIcons/Button-Details-icon.png" border="0" ng-mousemove="showTooltip(pfamTooltip, \'ng\', $event)" ng-mouseleave="hideTooltip()" /><a href="//www.uniprot.org/uniprot/{{modelOptions.seqId}}.txt" title="See the entry text file" target="_blank" style="margin-left:5px;"><img ng-src="//www.ebi.ac.uk/pdbe/widgets/html/PinupIcons/Button-Download-icon.png" /></a></div></div></div><a class="SeqScrollArrow" ng-style="styles.scrollArrowLeft" href="javascript:void(0);" title="Scroll Left"><span ng-mouseup="stopMovingPan()" ng-mousemove="stopMovingPan()" ng-mousedown="movePan(50)" class="icon-black" data-icon="&lt;"></span></a><div class="topRightSection"><svg class="topSvg" ng-style="styles.topSvg"><g class="scaleGrp" transform="translate(10,25)"><g class="x axis"></g></g></svn></div><a class="SeqScrollArrow" ng-style="styles.scrollArrowRight" href="javascript:void(0);" title="Scroll Right"><span ng-mouseup="stopMovingPan()" ng-mousemove="stopMovingPan()" ng-mousedown="movePan(-50)" class="icon-black" data-icon="&gt;"></span></a></div><div class="bottomSection" ng-style="styles.bottomSection"><div class="bottomLeftSection" ng-style="styles.leftSecStyle"><div ng-repeat="msgPdbId in pdbIdArr" ng-style="{\'width\':\'100%\', \'text-align\':\'right\', \'margin-top\': $index == 0 ? printsMarginTop+\'px\' : \'6px\', \'height\': \'24px\', \'line-height\': \'24px\'}"><div class="leftPdbIdLabel"><a href="//www.ebi.ac.uk/pdbe/entry/pdb/{{msgPdbId}}/" target="_blank"  title="For more information about key features of entry {{msgPdbId}}, click on the individual icons.">{{msgPdbId}}</a></div><div class="pdbprints_{{msgPdbId}}"></div><div class="infoIconWarpper"> <img ng-src="//www.ebi.ac.uk/pdbe/widgets/html/PinupIcons/Button-Details-icon.png" border="0" ng-mousemove="showTooltip(infoIconMsg[msgPdbId], \'ng\', $event)" ng-mouseleave="hideTooltip()" ng-show="wrapperSize.width > 300" /><a href="//www.ebi.ac.uk/pdbe-srv/view/files/{{msgPdbId}}.ent" title="See the entry text file" target="_blank" style="margin-left:5px;"><img ng-src="//www.ebi.ac.uk/pdbe/widgets/html/PinupIcons/Button-Download-icon.png" border="0" /></a></div></div></div><div class="bottomRightSection"><svg class="bottomSvg" ng-style="styles.bottomSvg" ><g class="shapesGrp" transform="translate(10,-21)"><rect class="seqSvgBg" x="0" y="0" fill="none" stroke="none" ng-style="styles.bottomSvg" ></rect></g></svg></div></div></div>');
    }]),
    function() {
        "use strict";
        angular.module("pdb.topology.viewer", ["d3Core", "pdb.sequence.view.services", "pdb.common.services"]).directive("pdbTopologyViewer", ["d3", "seqViewerService", "$filter", "commonServices", "$document", function(e, t, n, r, i) {
            return {
                restrict: "EAC",
                scope: {
                    entryId: "@",
                    entityId: "@",
                    height: "@",
                    width: "@",
                    subscribeEvents: "@"
                },
                templateUrl: "template/topologyViewer/topologyViewer.html",
                link: function(n, o, a) {
                    n.showLoader = !0, n.showErrorMessage = !1, n.errorMessage = "Sorry, Something went wrong!", "undefined" == typeof n.subscribeEvents && (n.subscribeEvents = "true"), n.config = {
                        wrapperWidth: "100%",
                        wrapperHeigth: "100%",
                        margin: 10,
                        wrapperBorder: 2,
                        bottomMenuHeight: 27
                    }, n.pdbevents = r.createNewEvent(["PDB.topologyViewer.click", "PDB.topologyViewer.mouseover", "PDB.topologyViewer.mouseout"]), "undefined" != typeof n.height && (n.config.wrapperHeigth = n.height + "px"), "undefined" != typeof n.width && (n.config.wrapperWidth = n.width + "px"), n.config.svgHeigth = "90%", n.config.svgWidth = "100%", n.styles = {
                        wrapper: {
                            width: n.config.wrapperWidth,
                            height: n.config.wrapperHeigth,
                            "webkit-box-sizing": "content-box",
                            "-moz-box-sizing": "content-box",
                            "box-sizing": "content-box",
                            position: "relative",
                            overflow: "hidden"
                        },
                        loader: {
                            width: n.config.wrapperWidth,
                            height: n.config.wrapperHeigth,
                            "webkit-box-sizing": "content-box",
                            "-moz-box-sizing": "content-box",
                            "box-sizing": "content-box",
                            position: "absolute"
                        },
                        topoSvgWrapper: {
                            position: "relative",
                            "webkit-box-sizing": "content-box",
                            "-moz-box-sizing": "content-box",
                            "box-sizing": "content-box",
                            width: "96%",
                            height: "86%",
                            margin: "2%"
                        },
                        topoSvg: {
                            width: "100%",
                            height: "100%",
                            display: "inline-block",
                            position: "absolute",
                            top: 0,
                            left: 0
                        },
                        bottomMenu: {
                            "border-top": "1px solid #999",
                            background: "#DCECD7 none repeat scroll 0% 0%",
                            height: "4%",
                            padding: "3% 0 3% 10px",
                            "font-weight": "bold",
                            "border-radius": "0px 0px 2px 2px",
                            "webkit-box-sizing": "content-box",
                            "-moz-box-sizing": "content-box",
                            "box-sizing": "content-box",
                            position: "absolute",
                            bottom: 0,
                            width: "100%"
                        },
                        bottomMenuSelectBox: {
                            "font-weight": "normal"
                        },
                        loaderImg: {
                            "margin-top": "40%"
                        },
                        errorMsg: {
                            width: n.config.wrapperWidth,
                            height: n.config.wrapperHeigth,
                            "text-align": "center",
                            position: "absolute"
                        },
                        errorMsgSpan: {
                            display: "inline-block",
                            "margin-top": "40%",
                            "font-weight": "bold"
                        }
                    }, n.domainTypes = [{
                        label: "Annotation",
                        data: null
                    }];
                    var s = e.select(o[0]),
                        l = s.select(".topoSvg");
                    l.attr("preserveAspectRatio", "xMidYMid meet").attr("viewBox", "0 0 100 90");
                    var c = e.select(".pdbTopologyTooltip");
                    null == c[0][0] && (c = e.select("body").append("div").attr("class", "pdbTopologyTooltip"));
                    var u = function() {
                            function i() {
                                var t = {
                                    green: r.specificColors.qualityGreen,
                                    red: r.specificColors.qualityRed,
                                    yellow: r.specificColors.qualityYellow,
                                    orange: r.specificColors.burntOrangeBright,
                                    lightGray: r.specificColors.lightGray
                                };
                                this.defaultColours = {
                                    domainSelection: e.rgb(255, 0, 0),
                                    mouseOver: e.rgb(t.lightGray[0], t.lightGray[1], t.lightGray[2]).brighter().brighter(),
                                    borderColor: e.rgb(0, 0, 0),
                                    qualityGreen: e.rgb(t.green[0], t.green[1], t.green[2]).brighter(),
                                    qualityRed: e.rgb(t.red[0], t.red[1], t.red[2]).brighter(),
                                    qualityYellow: e.rgb(t.yellow[0], t.yellow[1], t.yellow[2]).brighter(),
                                    qualityOrange: e.rgb(t.orange[0], t.orange[1], t.orange[2]).brighter()
                                }, this.getTopologyApiData()
                            }
                            return i.prototype.getPDBSequenceArray = function(e) {
                                for (var t = e.length, r = 0; t > r; r++) e[r].entity_id == n.entityId && (this.sequenceArr = e[r].sequence.split(""))
                            }, i.prototype.getTopologyApiData = function() {
                                var e = this;
                                this.apiResult = {};
                                var r = t.createPromise([n.entryId], ["observedResidueRatio"]);
                                t.combinedDataGrabber(r, n.entryId, ["observedResidueRatio"]).then(function(r) {
                                    if ("undefined" != typeof r[n.entryId].observedResidueRatio[n.entityId]) {
                                        n.bestChainId = r[n.entryId].observedResidueRatio[n.entityId][0].chain_id, n.bestStructAsymId = r[n.entryId].observedResidueRatio[n.entityId][0].struct_asym_id;
                                        var i = ["entities", "mappings", "topology", "outliers", "polymerCoveragePerChain"],
                                            o = t.createPromise([n.entryId], i, n.bestChainId);
                                        t.combinedDataGrabber(o, n.entryId, i).then(function(t) {
                                            var r = !1;
                                            return "undefined" == typeof t[n.entryId].topology || null == t[n.entryId].topology ? r = !0 : ("undefined" == typeof t[n.entryId].topology[n.entityId] || "undefined" == typeof t[n.entryId].topology[n.entityId][n.bestChainId]) && (r = !0), r ? (e.apiResult = {
                                                status: "error",
                                                data: "Combined api call failed"
                                            }, n.showErrorMessage = !0, n.errorMessage = "Topology Data Not Available!", n.showLoader = !1, n.$apply(), !1) : (e.apiResult = {
                                                status: "data",
                                                data: t
                                            }, e.getPDBSequenceArray(t[n.entryId].entities), e.drawTopologyStructures(), void e.createDomainDropdown())
                                        }, function() {
                                            e.apiResult = {
                                                status: "error",
                                                data: "Combined api call failed"
                                            }, n.showErrorMessage = !0, n.showLoader = !1
                                        })
                                    } else e.apiResult = {
                                        status: "error",
                                        data: "Entity not found"
                                    }, n.showErrorMessage = !0, n.errorMessage = "Entity not found", n.showLoader = !1
                                }, function() {
                                    this.apiResult = {
                                        status: "error",
                                        data: "Observed residue ratio api failed"
                                    }, n.showErrorMessage = !0, n.errorMessage = "Observed residue ratio api failed"
                                })
                            }, i.prototype.chunkArray = function(e, t) {
                                for (var n = [], r = 0, i = e.length; i > r;) n.push(e.slice(r, r += t));
                                return n
                            }, i.prototype.getDomainRange = function() {
                                var t = this,
                                    r = [];
                                angular.forEach(this.apiResult.data[n.entryId].topology[n.entityId][n.bestChainId], function(e, n) {
                                    angular.forEach(e, function(e, n) {
                                        "undefined" != typeof e.path && e.path.length > 0 && (r = r.concat(t.chunkArray(e.path, 2)))
                                    })
                                }), this.xScale = e.scale.linear().domain([e.min(r, function(e) {
                                    return e[0]
                                }), e.max(r, function(e) {
                                    return e[0]
                                })]).range([1, parseInt(n.config.svgWidth) - 1]), this.yScale = e.scale.linear().domain([e.min(r, function(e) {
                                    return e[1]
                                }), e.max(r, function(e) {
                                    return e[1]
                                })]).range([1, parseInt(n.config.svgHeigth) - 1]), this.zoom = e.behavior.zoom().on("zoom", function() {
                                    t.zoomDraw(t)
                                }).x(this.xScale).y(this.yScale)
                            }, i.prototype.drawStrandSubpaths = function(e, t, n) {
                                for (var r = this, i = t - e + 1, o = (r.scaledPointsArr[7] - r.scaledPointsArr[1]) / i, a = [], s = 0; i > s; s++) {
                                    var c = {
                                        type: "strands",
                                        elementIndex: n
                                    };
                                    0 === s ? (c.residue_number = e, c.pathData = [r.scaledPointsArr[4], r.scaledPointsArr[1], r.scaledPointsArr[4], r.scaledPointsArr[1] + o, r.scaledPointsArr[8], r.scaledPointsArr[1] + o, r.scaledPointsArr[8], r.scaledPointsArr[13]]) : (c.residue_number = e + s, c.pathData = [a[s - 1].pathData[2], a[s - 1].pathData[3], a[s - 1].pathData[2], a[s - 1].pathData[3] + o, a[s - 1].pathData[4], a[s - 1].pathData[5] + o, a[s - 1].pathData[4], a[s - 1].pathData[5]]), a.push(c)
                                }
                                l.selectAll(".subpath-strands" + n).remove(), l.selectAll(".subpath-strands" + n).data(a).enter().append("path").attr("class", function(e, t) {
                                    return "strandsSubPath subpath-strands" + n + " topo_res_" + e.residue_number
                                }).attr("d", function(e, t) {
                                    return "M " + e.pathData.join(" ") + " Z"
                                }).attr("stroke", "#111").attr("stroke-width", "0").attr("fill", "white").attr("fill-opacity", "0").on("mouseover", function(e) {
                                    r.mouseoverAction(this, e)
                                }).on("mousemove", function(e) {
                                    r.mouseoverAction(this, e)
                                }).on("mouseout", function(e) {
                                    r.mouseoutAction(this, e)
                                }).on("click", function(e) {
                                    r.clickAction(e)
                                })
                            }, i.prototype.drawHelicesSubpaths = function(e, t, n, r) {
                                var i = this;
                                r = 0;
                                var o = 5,
                                    a = r - o;
                                i.scaledPointsArr[3] > i.scaledPointsArr[9] && (a = r + o);
                                var s = t - e + 1;
                                0 === r && (a = 0);
                                var c = (i.scaledPointsArr[9] - a - i.scaledPointsArr[3]) / s;
                                if (0 === r) {
                                    var u = l.select(".helices" + n).node().getBBox().height,
                                        d = u / s;
                                    c = (u - d / 2) / s;
                                    var p = c - d / 10;
                                    i.scaledPointsArr[3] > i.scaledPointsArr[9] && (p = -(u + d / 3))
                                }
                                var h = [],
                                    m = {};
                                if (0 === r)
                                    for (var f = 0; s > f; f++) m = {
                                        type: "helices"
                                    }, 0 === f ? (i.scaledPointsArr[3] > i.scaledPointsArr[9] ? m.residue_number = t : m.residue_number = e, m.pathData = [i.scaledPointsArr[0], i.scaledPointsArr[3] + p, i.scaledPointsArr[4], i.scaledPointsArr[3] + p, i.scaledPointsArr[4], i.scaledPointsArr[3] + p + c, i.scaledPointsArr[0], i.scaledPointsArr[3] + p + c]) : (i.scaledPointsArr[3] > i.scaledPointsArr[9] ? m.residue_number = t - f : m.residue_number = e + f, m.pathData = [h[f - 1].pathData[6], h[f - 1].pathData[7], h[f - 1].pathData[4], h[f - 1].pathData[5], h[f - 1].pathData[4], h[f - 1].pathData[5] + c, h[f - 1].pathData[6], h[f - 1].pathData[5] + c]), h.push(m);
                                else
                                    for (var f = 0; s > f; f++) m = {
                                        type: "helices",
                                        elementIndex: n
                                    }, 0 === f ? (m.residue_number = e, m.pathData = [i.scaledPointsArr[0], i.scaledPointsArr[3] + a / 2, i.scaledPointsArr[4], i.scaledPointsArr[3] + a / 2, i.scaledPointsArr[4], i.scaledPointsArr[3] + c + a / 2, i.scaledPointsArr[0], i.scaledPointsArr[3] + c + a / 2]) : (m.residue_number = e + f, m.pathData = [h[f - 1].pathData[6], h[f - 1].pathData[7], h[f - 1].pathData[4], h[f - 1].pathData[5], h[f - 1].pathData[4], h[f - 1].pathData[5] + c, h[f - 1].pathData[6], h[f - 1].pathData[5] + c]), h.push(m);
                                l.selectAll(".subpath-helices" + n).remove(), l.selectAll(".subpath-helices" + n).data(h).enter().append("path").attr("class", function(e, t) {
                                    return "helicesSubPath subpath-helices" + n + " topo_res_" + e.residue_number
                                }).attr("d", function(e, t) {
                                    return "M" + e.pathData.join(" ") + " Z"
                                }).attr("stroke", "#111").attr("stroke-width", "0").attr("fill", "white").attr("fill-opacity", "0").on("mouseover", function(e) {
                                    i.mouseoverAction(this, e)
                                }).on("mousemove", function(e) {
                                    i.mouseoverAction(this, e)
                                }).on("mouseout", function(e) {
                                    i.mouseoutAction(this, e)
                                }).on("click", function(e) {
                                    i.clickAction(e)
                                })
                            }, i.prototype.drawCoilsSubpaths = function(t, r, i) {
                                var o = this,
                                    a = e.select(".coils" + i),
                                    s = r - t + 1,
                                    c = a.node().getTotalLength(),
                                    u = c / s,
                                    d = [],
                                    p = void 0,
                                    h = void 0,
                                    m = {};
                                if (1 === s) m = {
                                    residue_number: t,
                                    type: "coils",
                                    pathData: o.scaledPointsArr,
                                    elementIndex: i
                                }, d.push(m);
                                else
                                    for (var f = 0; s > f; f++) {
                                        var g = u * (f + 1),
                                            y = a.node().getPointAtLength(g),
                                            v = a.node().getPathSegAtLength(g);
                                        m = {
                                            residue_number: t + f,
                                            type: "coils",
                                            elementIndex: i
                                        }, 1 === v ? m.pathData = o.scaledPointsArr.slice(0, 2) : (void 0 === h ? m.pathData = o.scaledPointsArr.slice(0, 2 * v) : (m.pathData = o.scaledPointsArr.slice(2 * h, 2 * v), m.pathData.unshift(p.x, p.y)), p = y, h = v), m.pathData = m.pathData.concat([y.x, y.y]), d.push(m)
                                    } - 1 !== t && -1 !== r && (l.selectAll(".subpath-coils" + i).remove(), l.selectAll(".subpath-coils" + i).data(d).enter().append("path").attr("class", function(e, t) {
                                        return "coilsSubPath subpath-coils" + i + " topo_res_" + e.residue_number
                                    }).attr("d", function(e, t) {
                                        return "M " + e.pathData.join(" ")
                                    }).attr("stroke", o.defaultColours.borderColor).attr("stroke-width", .3).attr("fill", "none").attr("stroke-opacity", "1").on("mouseover", function(e) {
                                        o.mouseoverAction(this, e)
                                    }).on("mousemove", function(e) {
                                        o.mouseoverAction(this, e)
                                    }).on("mouseout", function(e) {
                                        o.mouseoutAction(this, e)
                                    }).on("click", function(e) {
                                        o.clickAction(e)
                                    }), l.selectAll(".coils" + i).attr("stroke-opacity", 0));
                                var b = this.apiResult.data[n.entryId].topology[n.entityId][n.bestChainId].terms,
                                    w = this.apiResult.data[n.entryId].topology[n.entityId][n.bestChainId].coils.length;
                                if (0 === i) l.selectAll(".terminal_N").remove(), l.selectAll(".terminal_N").data([b[0]]).enter().append("text").attr("class", "terminals terminal_N").attr("text-anchor", "middle").text("N").attr("x", d[0].pathData[0]).attr("y", d[0].pathData[1]).attr("stroke", "#0000ff").attr("stroke-width", "0.3").attr("font-size", 3 * o.zoom.scale() + "px").attr("style", "-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial;");
                                else if (i === w - 1) {
                                    var x = d[s - 1].pathData.length,
                                        S = -2;
                                    d[s - 1].pathData[x - 1] > d[s - 1].pathData[x - 3] && (S = 2), l.selectAll(".terminal_C").remove(), l.selectAll(".terminal_C").data([b[1]]).enter().append("text").attr("class", "terminals terminal_N").attr("text-anchor", "middle").text("C").attr("x", d[s - 1].pathData[x - 2]).attr("y", d[s - 1].pathData[x - 1] + S).attr("stroke", "#ff0000").attr("stroke-width", "0.3").attr("font-size", 3 * o.zoom.scale() + "px").attr("style", "-webkit-tap-highlight-color: rgba(0, 0, 0, 0); text-anchor: middle; font-style: normal; font-variant: normal; font-weight: normal; font-stretch: normal; line-height: normal; font-family: Arial;")
                                }
                            }, i.prototype.drawStrandMaskShape = function(e) {
                                var t = this,
                                    n = t.scaledPointsArr,
                                    r = .3,
                                    i = [7, 8, 10, 12],
                                    o = [0, 1, 2, 3, 4, 5, 9, 11, 13];
                                n[0] > n[6] && (i = [0, 1, 2, 3, 4, 5, 9, 11, 13], o = [7, 8, 10, 12]);
                                for (var a = i.length, s = 0; a > s; s++) n[i[s]] = n[i[s]] + r;
                                for (var c = o.length, u = 0; c > u; u++) n[o[u]] = n[o[u]] - r;
                                n[14] = n[8], n[15] = n[13], n[16] = n[8], n[17] = n[7], n[18] = n[4], n[19] = n[7], n[20] = n[4], n[21] = n[1], l.selectAll(".maskpath-strands" + e).remove(), l.selectAll(".maskpath-strands" + e).data([n]).enter().append("path").attr("class", function(t, n) {
                                    return "strandMaskPath maskpath-strands" + e
                                }).attr("d", function(e, t) {
                                    return "M" + n.join(" ") + "Z"
                                }).attr("stroke", "#111").attr("stroke-width", .3).attr("fill", "white").attr("stroke-opacity", 0)
                            }, i.prototype.drawHelicesMaskShape = function(e) {
                                var t = .3,
                                    n = [
                                        [this.scaledPointsArr[0] - t, this.scaledPointsArr[1], this.scaledPointsArr[2], this.scaledPointsArr[3] - t, this.scaledPointsArr[4] + t, this.scaledPointsArr[5], this.scaledPointsArr[4] + t, this.scaledPointsArr[3], this.scaledPointsArr[0] - t, this.scaledPointsArr[3]],
                                        [this.scaledPointsArr[6] + t, this.scaledPointsArr[7], this.scaledPointsArr[8], this.scaledPointsArr[9] + t, this.scaledPointsArr[10] - t, this.scaledPointsArr[11], this.scaledPointsArr[10] - t, this.scaledPointsArr[9], this.scaledPointsArr[6] + t, this.scaledPointsArr[9]]
                                    ];
                                this.scaledPointsArr[3] > this.scaledPointsArr[9] && (n = [
                                    [this.scaledPointsArr[0] - t, this.scaledPointsArr[1], this.scaledPointsArr[2], this.scaledPointsArr[3] + 2, this.scaledPointsArr[4] + t, this.scaledPointsArr[5], this.scaledPointsArr[4] + t, this.scaledPointsArr[3], this.scaledPointsArr[0] - t, this.scaledPointsArr[3]],
                                    [this.scaledPointsArr[6] + t, this.scaledPointsArr[7], this.scaledPointsArr[8], this.scaledPointsArr[9] - t, this.scaledPointsArr[10] - t, this.scaledPointsArr[11], this.scaledPointsArr[10] - t, this.scaledPointsArr[9], this.scaledPointsArr[6] + t, this.scaledPointsArr[9]]
                                ]), l.selectAll(".maskpath-helices" + e).remove(), l.selectAll(".maskpath-helices" + e).data(n).enter().append("path").attr("class", function(t, n) {
                                    return "helicesMaskPath maskpath-helices" + e
                                }).attr("d", function(e, t) {
                                    return "M" + e[0] + " " + e[1] + " Q" + e[2] + " " + e[3] + " " + e[4] + " " + e[5] + " L" + e[6] + " " + e[7] + " " + e[8] + " " + e[9] + " Z"
                                }).attr("stroke", "#111").attr("stroke-width", .3).attr("fill", "white").attr("stroke-opacity", 0)
                            }, i.prototype.renderTooltip = function(t, n) {
                                if ("show" === n) {
                                    var r = e.event.pageX,
                                        i = e.event.pageY,
                                        o = "Residue " + t.residue_number + " (" + this.sequenceArr[t.residue_number - 1] + ")";
                                    "undefined" != typeof t.tooltipMsg && (o = "undefined" != typeof t.tooltipPosition && "postfix" === t.tooltipPosition ? o + " " + t.tooltipMsg : t.tooltipMsg + " " + o), c.html(o).style("display", "block").style("top", i + 15 + "px").style("left", r + 10 + "px")
                                } else c.style("display", "none")
                            }, i.prototype.dispatchEvent = function(e, t, r) {
                                var i = o[0];
                                "undefined" != typeof r && (i = r), "undefined" != typeof t && (n.pdbevents[e].eventData = t), i.dispatchEvent(n.pdbevents[e])
                            }, i.prototype.clickAction = function(e) {
                                this.dispatchEvent("PDB.topologyViewer.click", {
                                    residueNumber: e.residue_number,
                                    type: e.type,
                                    entryId: n.entryId,
                                    entityId: n.entityId,
                                    chainId: n.bestChainId,
                                    structAsymId: n.bestStructAsymId
                                })
                            }, i.prototype.mouseoverAction = function(t, r) {
                                var i = e.select(t);
                                this.renderTooltip(r, "show"), ("strands" === r.type || "helices" === r.type) && i.attr("fill", this.defaultColours.mouseOver).attr("fill-opacity", "0.3"), "coils" === r.type && i.attr("stroke", this.defaultColours.mouseOver).attr("stroke-width", 1), this.dispatchEvent("PDB.topologyViewer.mouseover", {
                                    residueNumber: r.residue_number,
                                    type: r.type,
                                    entryId: n.entryId,
                                    entityId: n.entityId,
                                    chainId: n.bestChainId,
                                    structAsymId: n.bestStructAsymId
                                })
                            }, i.prototype.mouseoutAction = function(t, r) {
                                var i = "none",
                                    o = 0,
                                    a = .3,
                                    s = e.select(t);
                                this.renderTooltip("", "hide"), s.classed("coloured") ? (i = s.attr("data-color"), o = 1, a = 1) : "coils" === r.type && (i = this.defaultColours.borderColor), ("strands" === r.type || "helices" === r.type) && s.attr("fill", i).attr("fill-opacity", o), "coils" === r.type && s.attr("stroke", i).attr("stroke-width", a), this.dispatchEvent("PDB.topologyViewer.mouseout", {
                                    entryId: n.entryId,
                                    entityId: n.entityId,
                                    chainId: n.bestChainId,
                                    structAsymId: n.bestStructAsymId
                                })
                            }, i.prototype.drawTopologyStructures = function() {
                                var t = this;
                                this.getDomainRange(), this.scaledPointsArr = [], l.call(t.zoom), angular.forEach(this.apiResult.data[n.entryId].topology[n.entityId][n.bestChainId], function(e, n) {
                                    angular.forEach(e, function(e, r) {
                                        if ("undefined" != typeof e.path && e.path.length > 0)
                                            if ("terms" === n);
                                            else {
                                                var i = 0;
                                                if ("helices" === n) {
                                                    var a = e.path[0] + (e.path[2] - e.path[0]) / 2;
                                                    i = 2 * (1.3 * e.minoraxis), e.path[1] > e.path[3] && (i = -2 * (1.3 * e.minoraxis));
                                                    var s = [e.path[0], e.path[1], a, e.path[1] - i, e.path[2], e.path[1], e.path[2], e.path[3], a, e.path[3] + i, e.path[0], e.path[3]];
                                                    e.path = s
                                                }
                                                e.secStrType = n, e.pathIndex = r;
                                                var c = l.selectAll("path." + n + r).data([e]).enter().append("path").attr("class", function() {
                                                    return -1 === e.start && -1 === e.stop && "terms" !== n ? "dashedEle topologyEle " + n + " " + n + r + " topoEleRange_" + e.start + "-" + e.stop : "topologyEle " + n + " " + n + r + " topoEleRange_" + e.start + "-" + e.stop
                                                }).attr("d", function(r) {
                                                    for (var i = "M", o = e.path.length, a = !0, s = 0; o > s; s++) {
                                                        if ("helices" !== n || 2 !== s && 8 !== s || (i += " Q"), ("helices" === n && 6 === s || "coils" === n && e.path.length < 12 && 8 === s) && (i += " L"), a) {
                                                            var l = t.xScale(e.path[s]);
                                                            i += " " + l, t.scaledPointsArr.push(l)
                                                        } else {
                                                            var c = t.yScale(e.path[s]);
                                                            i += " " + c, t.scaledPointsArr.push(c)
                                                        }
                                                        a = !a
                                                    }
                                                    return ("strands" === n || "helices" === n) && (i += " Z"), i
                                                }).attr("fill", "none").attr("stroke-width", .3).attr("stroke", t.defaultColours.borderColor); - 1 === e.start && -1 === e.stop && c.attr("stroke-dasharray", "0.9"), "strands" === n && (t.drawStrandSubpaths(e.start, e.stop, r), t.drawStrandMaskShape(r), angular.element(o[0].querySelector(".topoSvg")).append(c.node())), "helices" === n && (t.drawHelicesSubpaths(e.start, e.stop, r, i), t.drawHelicesMaskShape(r), angular.element(o[0].querySelector(".topoSvg")).append(c.node())), "coils" === n && t.drawCoilsSubpaths(e.start, e.stop, r), t.scaledPointsArr = []
                                            }
                                    })
                                }), angular.element(o[0].querySelector(".topoSvg")).append(e.selectAll(".validationResidue").node())
                            }, i.prototype.zoomDraw = function(t) {
                                var n = this;
                                n.scaledPointsArr = [];
                                var r = l.selectAll(".topologyEle"),
                                    i = 0,
                                    a = 0,
                                    s = 0,
                                    c = 0;
                                r.each(function(t) {
                                    e.select(e.select(this).node()).attr("d", function(e) {
                                        i = e.pathIndex, a = e.start, s = e.stop;
                                        for (var t = "M", r = e.path.length, o = !0, l = 0; r > l; l++) {
                                            if ("helices" !== e.secStrType || 2 !== l && 8 !== l || (t += " Q"), ("helices" === e.secStrType && 6 === l || "coils" === e.secStrType && e.path.length < 12 && 8 === l) && (t += " L"), o) {
                                                var c = n.xScale(e.path[l]);
                                                t += " " + c, n.scaledPointsArr.push(c)
                                            } else {
                                                var u = n.yScale(e.path[l]);
                                                t += " " + u, n.scaledPointsArr.push(u)
                                            }
                                            o = !o
                                        }
                                        return ("strands" === e.secStrType || "helices" === e.secStrType) && (t += " Z"), t
                                    }), "helices" === t.secStrType ? (n.drawHelicesSubpaths(a, s, i, c), n.drawHelicesMaskShape(i), angular.element(o[0].querySelector(".topoSvg")).append(e.select(this).node())) : "strands" === t.secStrType ? (n.drawStrandSubpaths(a, s, i), n.drawStrandMaskShape(i), angular.element(o[0].querySelector(".topoSvg")).append(e.select(this).node())) : "coils" === t.secStrType && n.drawCoilsSubpaths(a, s, i), n.scaledPointsArr = []
                                });
                                var u = 0;
                                l.selectAll(".validationResidue").attr("transform", function(e) {
                                    var t = l.select(".topo_res_" + e.residue_number),
                                        n = t.node().getBBox(),
                                        r = t.data(),
                                        i = {
                                            x: 0,
                                            y: 0
                                        };
                                    if ("strands" === r[0].type || "helices" === r[0].type) i = {
                                        x: n.x + n.width / 2,
                                        y: n.y + n.height / 2
                                    };
                                    else {
                                        var o = t.node().getPointAtLength(t.node().getTotalLength() / 2);
                                        i = {
                                            x: o.x,
                                            y: o.y
                                        }
                                    }
                                    return u = n.height / 2, "translate(" + i.x + "," + i.y + ")"
                                }).attr("d", e.svg.symbol().type("circle").size(u)), l.selectAll(".residueSelection").attr("d", function(t) {
                                    return l.select(".topo_res_" + e.select(this).data()[0].residueNumber).attr("d")
                                }), angular.element(o[0].querySelector(".topoSvg")).append(angular.element(o[0].querySelectorAll(".coilsSubPath"))), angular.element(o[0].querySelector(".topoSvg")).append(angular.element(o[0].querySelectorAll(".dashedEle"))), this.highlightDomain("zoom"), angular.element(o[0].querySelector(".topoSvg")).append(angular.element(o[0].querySelectorAll(".validationResidue"))), angular.element(o[0].querySelector(".topoSvg")).append(angular.element(o[0].querySelectorAll(".residueSelection")))
                            }, i.prototype.changeResidueColor = function(e, t, n, r) {
                                "undefined" == typeof t && (t = this.defaultColours.domainSelection);
                                var i = l.select(".topo_res_" + e);
                                null != i[0][0] && (i.data()[0].tooltipMsg = n, i.data()[0].tooltipPosition = r, i.attr("stroke", function(e) {
                                    return "coils" === e.type ? t : "#111"
                                }).attr("stroke-width", function(e) {
                                    return "coils" === e.type ? 1 : 0
                                }).attr("fill", function(e) {
                                    return "coils" === e.type ? "none" : t
                                }).attr("fill-opacity", function(e) {
                                    return "coils" === e.type ? 0 : 1
                                }).classed("coloured", !0).attr("data-color", t))
                            }, i.prototype.showSelectionArea = function(t, n, r, i) {
                                var o = this,
                                    a = "#000000",
                                    s = "#000000",
                                    c = "residueSelection";
                                "mouseover" == i && (a = "#000000", s = "#000000", c = "residueHighlight");
                                var u = .3,
                                    d = 0;
                                "undefined" != typeof n && n !== !0 && l.selectAll("." + c).remove();
                                var p = l.select(".topo_res_" + t);
                                if (null != p[0][0]) {
                                    var h = p.node(),
                                        m = p.data();
                                    "strands" === m[0].type || "helices" === m[0].type ? "undefined" != typeof r && (s = a = e.rgb(r[0], r[1], r[2])) : ("undefined" != typeof r && (s = e.rgb(r[0], r[1], r[2])), a = "none", u = 2, d = .5), l.append("path").data([{
                                        residueNumber: t
                                    }]).attr("class", function(e) {
                                        return "mouseover" == i ? "residueHighlight highlightResidue_" + t : "residueSelection seletectedResidue_" + t
                                    }).attr("d", p.attr("d")).attr("fill", a).attr("fill-opacity", .5).attr("stroke", s).attr("stroke-opacity", d).attr("stroke-width", u).on("mouseover", function(e) {
                                        o.mouseoverAction(h, m[0])
                                    }).on("mousemove", function(e) {
                                        o.mouseoverAction(h, m[0])
                                    }).on("mouseout", function(e) {
                                        o.mouseoutAction(h, m[0])
                                    }).on("click", function(e) {
                                        o.clickAction(m[0])
                                    })
                                }
                            }, i.prototype.drawValidationShape = function(t, n, r) {
                                var i = this,
                                    o = l.select(".topo_res_" + t);
                                if (null != o[0][0]) {
                                    var a = o.node().getBBox(),
                                        s = o.data(),
                                        c = {
                                            x: 0,
                                            y: 0
                                        };
                                    if ("strands" === s[0].type || "helices" === s[0].type) c = {
                                        x: a.x + a.width / 2,
                                        y: a.y + a.height / 2
                                    };
                                    else {
                                        var u = o.node().getPointAtLength(o.node().getTotalLength() / 2);
                                        c = {
                                            x: u.x,
                                            y: u.y
                                        }
                                    }
                                    var d = {
                                        residue_number: t,
                                        tooltipMsg: "Validation issue: RSRZ <br>",
                                        tooltipPosition: "prefix"
                                    };
                                    l.append("path").attr("class", "validationResidue rsrz_" + t).data([d]).attr("fill", r).attr("stroke", "#000").attr("stroke-width", .3).attr("transform", function(e) {
                                        return "translate(" + c.x + "," + c.y + ")"
                                    }).attr("d", e.svg.symbol().type(n).size(a.height / 2)).style("display", "none").on("mouseover", function(e) {
                                        i.mouseoverAction(this, e)
                                    }).on("mousemove", function(e) {
                                        i.mouseoverAction(this, e)
                                    }).on("mouseout", function(e) {
                                        i.mouseoutAction(this, e)
                                    }).on("click", function(e) {
                                        i.clickAction(e)
                                    })
                                }
                            }, i.prototype.highlightResidues = function(e) {
                                var t = this;
                                angular.forEach(e, function(e, n) {
                                    for (var r = e.start; r <= e.end; r++) t.changeResidueColor(r, e.color, e.tooltipMsg, e.tooltipPosition)
                                })
                            }, i.prototype.getAnnotationFromMappings = function() {
                                for (var e = this.apiResult.data[n.entryId].mappings, t = ["UniProt", "CATH", "Pfam", "SCOP"], r = 0; 3 > r; r++)
                                    if ("undefined" != typeof e[t[r]] && !angular.equals({}, e[t[r]])) {
                                        var i = [];
                                        angular.forEach(e[t[r]], function(e, t) {
                                            angular.forEach(e.mappings, function(e, t) {
                                                e.entity_id == n.entityId && e.chain_id == n.bestChainId && i.push({
                                                    start: e.start.residue_number,
                                                    end: e.end.residue_number,
                                                    color: void 0
                                                })
                                            })
                                        }), i.length > 0 && n.domainTypes.push({
                                            label: t[r],
                                            data: i
                                        })
                                    }
                            }, i.prototype.getChainStartAndEnd = function() {
                                for (var e = this.apiResult.data[n.entryId].polymerCoveragePerChain.molecules[0].chains, t = {
                                        start: 0,
                                        end: 0
                                    }, r = e.length, i = 0; r > i; i++)
                                    if (e[i].chain_id == n.bestChainId) {
                                        angular.forEach(e[i].observed, function(e, n) {
                                            0 == n ? (t.start = e.start.residue_number, t.end = e.end.residue_number) : (e.start.residue_number < t.start && (t.start = e.start.residue_number), e.end.residue_number > t.end && (t.end = e.end.residue_number))
                                        });
                                        break
                                    }
                                return t
                            }, i.prototype.getAnnotationFromOutliers = function() {
                                var e = this,
                                    t = this.getChainStartAndEnd(),
                                    r = [{
                                        start: t.start,
                                        end: t.end,
                                        color: e.defaultColours.qualityGreen,
                                        tooltipMsg: "No validation issue reported for "
                                    }],
                                    i = [],
                                    o = [0],
                                    a = this.apiResult.data[n.entryId].outliers;
                                "undefined" != typeof a && "undefined" != typeof a.molecules && a.molecules.length > 0 && (angular.forEach(a.molecules, function(t, a) {
                                    t.entity_id == n.entityId && angular.forEach(t.chains, function(t, a) {
                                        t.chain_id == n.bestChainId && angular.forEach(t.models, function(t, n) {
                                            angular.forEach(t.residues, function(t, n) {
                                                var a = e.defaultColours.qualityYellow,
                                                    s = "issue";
                                                if (1 === t.outlier_types.length && "RSRZ" === t.outlier_types[0]) {
                                                    a = e.defaultColours.qualityRed, e.drawValidationShape(t.residue_number, "circle", a), i.push(t.residue_number);
                                                    var l = o.indexOf(t.residue_number);
                                                    return void(l > -1 ? r[l].tooltipMsg = r[l].tooltipMsg.replace("<br>", ", RSRZ<br>") : (r.push({
                                                        start: parseInt(t.residue_number),
                                                        end: parseInt(t.residue_number),
                                                        color: e.defaultColours.qualityGreen,
                                                        tooltipMsg: "Validation issue: RSRZ <br>",
                                                        tooltipPosition: "prefix"
                                                    }), o.push(t.residue_number)))
                                                }
                                                1 === t.outlier_types.length ? a = e.defaultColours.qualityYellow : 2 === t.outlier_types.length ? (a = e.defaultColours.qualityOrange, s = "issues") : (a = e.defaultColours.qualityRed, s = "issues"), o.push(t.residue_number);
                                                var c = "Validation " + s + ": " + t.outlier_types.join(", ") + "<br>",
                                                    u = i.indexOf(t.residue_number);
                                                u > -1 && (c = "Validation issues: " + t.outlier_types.join(", ") + ", RSRZ<br>"), r.push({
                                                    start: parseInt(t.residue_number),
                                                    end: parseInt(t.residue_number),
                                                    color: a,
                                                    tooltipMsg: c,
                                                    tooltipPosition: "prefix"
                                                })
                                            })
                                        })
                                    })
                                }), r.length > 0 && n.domainTypes.push({
                                    label: "Quality",
                                    data: r
                                }))
                            }, i.prototype.clearHighlight = function(t) {
                                var n = this;
                                l.selectAll(".coloured").each(function(t) {
                                    var r = e.select(this),
                                        i = r.node();
                                    r.data()[0].tooltipMsg = void 0, r.data()[0].tooltipPosition = void 0;
                                    var o = e.select(i).classed("coloured", !1),
                                        a = o.attr("class").split(" ");
                                    a.indexOf("strandsSubPath") > -1 || a.indexOf("helicesSubPath") > -1 ? o.attr("fill", "none").attr("fill-opacity", 0) : o.attr("stroke", n.defaultColours.borderColor).attr("stroke-width", .3)
                                }), l.selectAll(".validationResidue").style("display", "none")
                            }, i.prototype.highlightDomain = function(e) {
                                null !== n.selectedDomain.data ? (this.clearHighlight(), this.highlightResidues(n.selectedDomain.data), "Quality" === n.selectedDomain.label && l.selectAll(".validationResidue").style("display", "block")) : "zoom" !== e && this.clearHighlight()
                            }, i.prototype.createDomainDropdown = function() {
                                this.getAnnotationFromMappings(), this.getAnnotationFromOutliers(), n.selectedDomain = n.domainTypes[0], n.showLoader = !1, n.$apply()
                            }, i
                        }(),
                        d = new u;
                    if (n.highlightDomain = function() {
                            d.highlightDomain()
                        }, n.clearSelectionAndHighlight = function() {
                            s.selectAll(".residueHighlight").remove(), s.selectAll(".residueSelection").remove()
                        }, "true" == n.subscribeEvents) {
                        var p = ["uniprot", "pfam", "cath", "scop", "strand", "helice"],
                            h = ["chain", "quality", "quality_outlier", "binding site", "alternate conformer"];
                        i.on("PDB.seqViewer.click", function(e) {
                            if ("undefined" != typeof e.eventData) {
                                if (e.eventData.entryId != n.entryId || e.eventData.entityId != n.entityId || "unipdbViewer" == e.eventData.viewerType) return;
                                if ("undefined" != typeof e.eventData.elementData && h.indexOf(e.eventData.elementData[0].elementType) > -1) {
                                    if (e.eventData.elementData[0].pathData.chain_id != n.bestChainId) return;
                                    d.showSelectionArea(e.eventData.residueNumber, !1, void 0, "click")
                                } else if ("undefined" != typeof e.eventData.elementData && p.indexOf(e.eventData.elementData[0].elementType) > -1)
                                    for (var t = e.eventData.elementData[0].pathData.start.residue_number, r = e.eventData.elementData[0].pathData.end.residue_number, i = t; r >= i; i++) {
                                        var o = !0;
                                        i == t && (o = !1), d.showSelectionArea(i, o, e.eventData.elementData[0].color, "click")
                                    }
                            }
                        }), i.on("PDB.seqViewer.mouseover", function(e) {
                            if ("undefined" != typeof e.eventData) {
                                if (e.eventData.entryId != n.entryId || e.eventData.entityId != n.entityId || "unipdbViewer" == e.eventData.viewerType) return;
                                if ("undefined" != typeof e.eventData.elementData && h.indexOf(e.eventData.elementData[0].elementType) > -1) {
                                    if (e.eventData.elementData[0].pathData.chain_id != n.bestChainId) return;
                                    d.showSelectionArea(e.eventData.residueNumber, !1, void 0, "mouseover")
                                } else if ("undefined" != typeof e.eventData.elementData && p.indexOf(e.eventData.elementData[0].elementType) > -1)
                                    for (var t = e.eventData.elementData[0].pathData.start.residue_number, r = e.eventData.elementData[0].pathData.end.residue_number, i = t; r >= i; i++) {
                                        var o = !0;
                                        i == t && (o = !1), d.showSelectionArea(i, o, e.eventData.elementData[0].color, "mouseover")
                                    }
                            }
                        }), i.on("PDB.seqViewer.mouseout", function(e) {
                            l.selectAll(".residueHighlight").remove()
                        }), i.on("PDB.litemol.mouseover", function(e) {
                            if (s.selectAll(".residueHighlight").remove(), "undefined" != typeof e.eventData && !angular.equals({}, e.eventData)) {
                                if (e.eventData.entryId.toLowerCase() != n.entryId.toLowerCase() || e.eventData.entityId != n.entityId) return;
                                if (e.eventData.chainId.toLowerCase() != n.bestChainId.toLowerCase()) return;
                                d.showSelectionArea(e.eventData.residueNumber, !1, void 0, "mouseover")
                            }
                        }), i.on("PDB.litemol.click", function(e) {
                            if (s.selectAll(".residueSelection").remove(), "undefined" != typeof e.eventData && !angular.equals({}, e.eventData)) {
                                if (e.eventData.entryId.toLowerCase() != n.entryId.toLowerCase() || e.eventData.entityId != n.entityId) return;
                                if (e.eventData.chainId.toLowerCase() != n.bestChainId.toLowerCase()) return;
                                d.showSelectionArea(e.eventData.residueNumber, !1, void 0, "click")
                            }
                        })
                    }
                }
            }
        }])
    }(), angular.module("template/topologyViewer/topologyViewer.html", []).run(["$templateCache", function(e) {
        e.put("template/topologyViewer/topologyViewer.html", '<div class="topologyViewerWrapper" ng-style="styles.wrapper" ><div class="topologyViewLoader" ng-style="styles.loader" ng-show="showLoader"><img ng-src="//www.ebi.ac.uk/pdbe/widgets/html/loading.gif" border="0" ng-style="styles.loaderImg" /></div><div class="topologyViewLoader" ng-style="styles.errorMsg" ng-show="showErrorMessage"><span ng-style="styles.errorMsgSpan">{{errorMessage}}</span></div><div ng-style="styles.topoSvgWrapper"><svg class="topoSvg" ng-style="styles.topoSvg" ></svg></div><div ng-style="styles.bottomMenu">{{entryId}}:{{bestChainId}}&nbsp;<select ng-style="styles.bottomMenuSelectBox" ng-model="selectedDomain" ng-options="domainType as domainType.label for domainType in domainTypes" ng-change="highlightDomain()"></select><span ng-click="clearSelectionAndHighlight()" class="topologyRefreshIcon icon-black" data-icon="R" title="Clear Highlight / Selection"></span></div></div>')
    }]), angular.module("pdb.component.library.tpls", ["template/litemol/pdbLitemol.html", "template/prints/pdbLogos.html", "template/sequenceView/pdb.html", "template/sequenceView/uniPdb.html", "template/pdbRedo/pdbRedo.html", "template/topologyViewer/topologyViewer.html"]), angular.module("pdb.component.library", ["pdb.component.library.tpls", "pdb.litemol", "pdb.prints", "pdb.sequence.view", "pdb.redo", "pdb.topology.viewer"]);
