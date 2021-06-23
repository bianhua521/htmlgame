var aidnlib, three, aidnaudio, app, __extends = this && this.__extends ||
function() {
    var n = Object.setPrototypeOf || {
        __proto__: []
    }
    instanceof Array &&
    function(t, e) {
        t.__proto__ = e
    } ||
    function(t, e) {
        for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i])
    };
    return function(t, e) {
        function i() {
            this.constructor = t
        }
        n(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
    }
} (); !
function(t) {
    var r = function() {
        function t() {}
        return t.get = function(t) {
            return this._data[t]
        },
        t.add = function(t, e) {
            this._data[t] = e
        },
        t._data = {},
        t
    } ();
    t.Assets = r;
    var o = function() {};
    t.Ref = o;
    var e = function() {
        function t() {
            this.__keyCount = 0,
            this.__updates = {},
            this.__resizes = {}
        }
        return t.prototype.initialize = function() {
            o.stw = aidn.window.width(),
            o.sth = aidn.window.height(),
            aidn.util.needExpandArea(!0),
            aidn.window.addDummyDiv()
        },
        t.prototype._start = function() {
            var t = this;
            o.time = Date.now() / 1e3,
            aidn.window.resize(function() {
                return t._resize()
            },
            !0),
            this._resize(),
            this._update()
        },
        t.prototype.addUpdate = function(t, e) {
            t.__key || (t.__key = "key_" + this.__keyCount, this.__keyCount++),
            this.__updates[t.__key] = e
        },
        t.prototype.removeUpdate = function(t) {
            t.__key && delete this.__updates[t.__key]
        },
        t.prototype.addResize = function(t, e) {
            t.__key2 || (t.__key2 = "key_" + this.__keyCount, this.__keyCount++),
            this.__resizes[t.__key2] = e
        },
        t.prototype.removeResize = function(t) {
            t.__key2 && delete this.__resizes[t.__key2]
        },
        t.prototype._update = function() {
            var t = Date.now() / 1e3;
            for (var e in o.delta = t - o.time,
            o.time = t,
            this.__updates) this.__updates[e]()
        },
        t.prototype._resize = function() {
            for (var t in o.stw = aidn.window.width(), o.sth = aidn.window.height(), this.__resizes) this.__resizes[t]()
        },
        t
    } ();
    t.MainBase = e;
    var i = function() {
        function t() {
            this._ori = 0,
            this._dx = 0,
            this._dy = 0,
            this._rx = 0,
            this._ry = 0,
            this.__updates = {},
            this.__keyCount = 0,
            this._timeoutId = null,
            this._isAndroid = !1,
            this._ax = -1e3,
            this._ay = -1e3
        }
        return t.prototype.start = function() {
            var e = this;
            aidn.util.checkMobile() ? (window.addEventListener("deviceorientation",
            function(t) {
                return e._deviceorientation(t)
            }), window.addEventListener("orientationchange",
            function(t) {
                return e._orientationchange(t)
            },
            !1), this._orientationchange(), this._timeoutId = setTimeout(function() {
                return e._failedDeviceOrientation()
            },
            2e3), this._isAndroid = aidn.util.checkAndroid()) : ($("body").on("mousemove",
            function(t) {
                return e._mouseMove(t)
            }), this._update())
        },
        t.prototype.addUpdate = function(t, e) {
            t.__keyx || (t.__keyx = "keyx_" + this.__keyCount, this.__keyCount++),
            this.__updates[t.__keyx] = e
        },
        t.prototype.removeUpdate = function(t) {
            t.__keyx && delete this.__updates[t.__keyx]
        },
        t.prototype._updateRate = function(t, e) {
            for (var i in this.__updates) this.__updates[i](t, e)
        },
        t.prototype._mouseMove = function(t) {
            var e = o.stw / 2,
            i = o.sth / 2,
            n = aidn.event.getPos(t);
            this._dx = (n.x - e) / e,
            this._dy = (n.y - i) / i
        },
        t.prototype._update = function() {
            var t = this;
            this._rx += (this._dx - this._rx) / 5,
            this._ry += (this._dy - this._ry) / 5,
            this._updateRate(this._rx, this._ry),
            window.requestAnimationFrame(function() {
                return t._update()
            })
        },
        t.prototype._deviceorientation = function(t) {
            var e = t.gamma,
            i = t.beta;
            if (null != this._timeoutId && (clearTimeout(this._timeoutId), this._timeoutId = null), 0 != this._ori) {
                var n = i;
                i = e,
                e = n,
                90 == this._ori && (i = -i),
                -90 == this._ori && (e = -e)
            }
            var o = e / 35;
            o = Math.max(o, -1),
            o = Math.min(o, 1);
            var s = i / 35;
            s = Math.max(s, -1),
            s = Math.min(s, 1),
            this._updateRate(o, s)
        },
        t.prototype._devicemotion = function(t) {
            var e = t.accelerationIncludingGravity || t.acceleration;
            this._ax < -100 ? (this._ax = e.x, this._ay = e.y) : (this._ax += (e.x - this._ax) / 3, this._ay += (e.y - this._ay) / 3);
            var i = Math.floor(10 * this._ax) / 10,
            n = -Math.floor(10 * this._ay) / 10;
            if (this._isAndroid && (i = -i, n = -n), 0 != this._ori) {
                var o = n;
                n = i,
                i = o,
                90 == this._ori && (n = -n),
                -90 == this._ori && (i = -i)
            }
            var s = i / 5;
            s = Math.max(s, -1),
            s = Math.min(s, 1);
            var r = n / 5;
            r = Math.max(r, -1),
            r = Math.min(r, 1),
            this._updateRate(s, r)
        },
        t.prototype._orientationchange = function(t) {
            void 0 === t && (t = null),
            this._ori = parseInt(window.orientation.toString()) || 0,
            -1 == this._ori && (this._ori = 0)
        },
        t.prototype._failedDeviceOrientation = function() {
            var e = this;
            window.addEventListener("devicemotion",
            function(t) {
                return e._devicemotion(t)
            })
        },
        t
    } ();
    t.DeviceManager = i;
    var n = function() {
        function t() {
            this.listeners = {}
        }
        return t.prototype.dispatchEvent = function(t) {
            var e, i;
            if (t instanceof a ? (i = t.type, e = t) : e = new a(i = t), null != this.listeners[i]) for (var n = (e.currentTarget = this).listeners[i].length, o = 0; o < n && this.listeners[i]; o++) {
                var s = this.listeners[i][o];
                try {
                    s.handler(e)
                } catch(t) {
                    window.console && console.error(t.stack)
                }
            }
        },
        t.prototype.addEventListener = function(t, e, i) {
            void 0 === i && (i = 0),
            null == this.listeners[t] && (this.listeners[t] = []),
            this.listeners[t].push(new s(t, e, i)),
            this.listeners[t].sort(function(t, e) {
                return e.priolity - t.priolity
            })
        },
        t.prototype.removeEventListener = function(t, e) {
            if (this.hasEventListener(t, e)) for (var i = 0; i < this.listeners[t].length; i++) {
                var n = this.listeners[t][i];
                if (n.equalCurrentListener(t, e)) return n.handler = null,
                void this.listeners[t].splice(i, 1)
            }
        },
        t.prototype.clearEventListener = function() {
            this.listeners = {}
        },
        t.prototype.containEventListener = function(t) {
            return null != this.listeners[t] && 0 < this.listeners[t].length
        },
        t.prototype.hasEventListener = function(t, e) {
            if (null == this.listeners[t]) return ! 1;
            for (var i = 0; i < this.listeners[t].length; i++) {
                if (this.listeners[t][i].equalCurrentListener(t, e)) return ! 0
            }
            return ! 1
        },
        t
    } ();
    t.EventDispatcher = n;
    var s = function() {
        function t(t, e, i) {
            void 0 === t && (t = null),
            void 0 === e && (e = null),
            void 0 === i && (i = 0),
            this.type = t,
            this.handler = e,
            this.priolity = i
        }
        return t.prototype.equalCurrentListener = function(t, e) {
            return this.type == t && this.handler == e
        },
        t
    } (),
    a = function(t, e) {
        void 0 === t && (t = null),
        void 0 === e && (e = null),
        this.type = t,
        this.data = e
    };
    t.Event = a;
    var h = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t._loaded = !1,
            t
        }
        return __extends(t, e),
        t.prototype.execute = function() {},
        t.prototype.cancel = function() {},
        t.prototype._dispatchComplete = function() {
            this._loaded = !0,
            this.dispatchEvent(new u(u.COMPLETE))
        },
        t.prototype._dispatchFailed = function() {
            this.dispatchEvent(new u(u.FAILED))
        },
        t.prototype._dispatchProgress = function(t) {
            var e = new u(u.PROGRESS);
            e.progress = t,
            this.dispatchEvent(e)
        },
        t
    } (n);
    t.CommandBase = h;
    var u = function(e) {
        function t(t) {
            return e.call(this, t) || this
        }
        return __extends(t, e),
        t.COMPLETE = "complete",
        t.FAILED = "failed",
        t.PROGRESS = "progress",
        t
    } (a);
    t.CommandEvent = u;
    var _ = function(i) {
        function t(t) {
            void 0 === t && (t = 1);
            var e = i.call(this) || this;
            return e._rates = [],
            e._sum = 0,
            e._commands = [],
            e._now = 0,
            e._total = 0,
            e._compnum = 0,
            e._compflags = [],
            e._connectionNum = t,
            e
        }
        return __extends(t, i),
        t.prototype.execute = function() {
            if (this._loaded = !1, this._now = this._compnum = this._compRate = 0, this._compflags = [], this._progRates = [], this._total <= this._compnum) return this._dispatchProgress(1),
            void this._dispatchComplete();
            for (var t = Math.min(this._total, this._connectionNum), e = 0; e < t; e++) this._execute()
        },
        t.prototype.cancel = function() {
            if (! (this._total <= this._compnum)) for (var t = 0; t < this._total; t++) try {
                var e = this._commands[t];
                this._removeEvents(e),
                e.cancel()
            } catch(t) {}
        },
        t.prototype.add = function(t, e) {
            void 0 === e && (e = 1),
            this._commands[this._total] = t,
            this._rates[this._total] = e,
            this._sum += e,
            this._total++
        },
        t.prototype._execute = function() {
            var e = this;
            if (this._now < this._total) {
                this._rates[this._now] = this._rates[this._now] / this._sum,
                this._progRates[this._now] = 0;
                var t = this._commands[this._now];
                t.__id = this._now,
                t.addEventListener(u.COMPLETE,
                function(t) {
                    return e._complete(t)
                }),
                t.addEventListener(u.PROGRESS,
                function(t) {
                    return e._progress(t)
                }),
                t.addEventListener(u.FAILED,
                function(t) {
                    return e._failed(t)
                }),
                t.execute(),
                this._now++
            } else this._total <= this._compnum && (this._dispatchProgress(1), this._dispatchComplete())
        },
        t.prototype._removeEvents = function(t) {
            t.clearEventListener()
        },
        t.prototype._completeCommand = function(t, e) {},
        t.prototype._complete = function(t) {
            var e = t.currentTarget.__id,
            i = this._commands[e];
            this._removeEvents(i),
            this._compRate += this._rates[e],
            this._compflags[e] = !0,
            this.__progress(),
            this._completeCommand(i, e),
            this._compnum++,
            this._execute()
        },
        t.prototype._progress = function(t) {
            var e = t.currentTarget.__id;
            this._progRates[e] = t.progress * this._rates[e],
            this.__progress()
        },
        t.prototype.__progress = function() {
            for (var t = 0,
            e = 0; e < this._now; e++) this._compflags[e] || (t += this._progRates[e]);
            this._dispatchProgress(this._compRate + t)
        },
        t.prototype._failed = function(t) {
            var e = t.currentTarget.__id,
            i = this._commands[e];
            this._removeEvents(i),
            this._dispatchFailed()
        },
        Object.defineProperty(t.prototype, "loaded", {
            get: function() {
                return this._loaded
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    } (h);
    t.SequentialCommand = _;
    var c = function(s) {
        function t(t, e, i, n) {
            void 0 === e && (e = null),
            void 0 === i && (i = !1),
            void 0 === n && (n = -1);
            var o = s.call(this) || this;
            return o._id = e,
            o._url = t,
            o._isplay = i,
            o._trimvol = n,
            o
        }
        return __extends(t, s),
        t.prototype.execute = function() {
            var e = this,
            t = function() {
                e._complete()
            },
            i = function(t) {
                e._progress(t)
            };
            this._audio = new aidn.AutoAudio(null),
            this._isplay ? (this._audio.load([this._url], null, this._trimvol, i), this._audio.play(0, !1, t, 0, 0)) : this._audio.load([this._url], t, this._trimvol, i)
        },
        t.prototype._progress = function(t) {
            this._dispatchProgress(t)
        },
        t.prototype._complete = function() {
            this._isplay && this._audio.stop();
            var t = this._id;
            t || (t = this._url),
            r.add(t, this._audio),
            this._dispatchComplete()
        },
        t
    } (h);
    t.AudioLoadCommand = c;
    var l = function(o) {
        function t(t, e, i) {
            void 0 === e && (e = null),
            void 0 === i && (i = -1);
            var n = o.call(this) || this;
            return n._url = t,
            n._type = i,
            (n._name = e) || (n._name = t),
            n
        }
        return __extends(t, o),
        t.prototype.execute = function() {
            var t, e = this,
            i = new Image,
            n = this._name;
            t = this._type == f.PIXI ?
            function() {
                var t = new PIXI.Texture(new PIXI.BaseTexture(i));
                PIXI.Texture.addTextureToCache(t, n),
                r.add(n, t),
                setTimeout(function() {
                    e._complete()
                },
                10)
            }: this._type == f.THREE ?
            function() {
                var t = new THREE.Texture(i);
                t.needsUpdate = !0,
                r.add(n, t),
                setTimeout(function() {
                    e._complete()
                },
                10)
            }: function() {
                r.add(n, i),
                setTimeout(function() {
                    e._complete()
                },
                10)
            },
            i.onload = t,
            i.src = this._url
        },
        t.prototype._complete = function() {
            this._dispatchComplete()
        },
        t
    } (h);
    t.ImageLoadCommand = l;
    var d = function(r) {
        function t(t, e, i) {
            void 0 === e && (e = 1),
            void 0 === i && (i = 0);
            for (var n = r.call(this, e) || this, o = t.length, s = 0; s < o; s++) n.add(new p(t[s], i));
            return n
        }
        return __extends(t, r),
        t
    } (_);
    t.ScriptsLoaderCommand = d;
    var p = function(n) {
        function t(t, e) {
            void 0 === e && (e = 0);
            var i = n.call(this) || this;
            return i._url = t,
            i._ver = e,
            i
        }
        return __extends(t, n),
        t.prototype.execute = function() {
            var t = this;
            $.ajax({
                url: this._url + "?" + this._ver,
                cache: !0,
                dataType: "script"
            }).then(function() {
                return t._complete()
            },
            function() {
                return t._failed()
            })
        },
        t.prototype._complete = function() {
            this._dispatchComplete()
        },
        t.prototype._failed = function() {
            this._dispatchFailed()
        },
        t
    } (h),
    f = function() {
        function t() {}
        return t.PIXI = 0,
        t.THREE = 1,
        t.IMG = 2,
        t
    } ();
    t.JsonBase64Type = f;
    var m = function(o) {
        function t(t, e, i) {
            void 0 === e && (e = 0),
            void 0 === i && (i = .3);
            var n = o.call(this) || this;
            return n._keys = [],
            n._context = null,
            n._url = t,
            n._type = e,
            n._jsonRate = i,
            n
        }
        return __extends(t, o),
        t.prototype.execute = function() {
            var e = this,
            t = {
                method: "GET",
                url: this._url,
                dataType: "json",
                success: function(t) {
                    e._complete(t)
                },
                xhr: function() {
                    var t = $.ajaxSettings.xhr();
                    return t.onprogress = function(t) {
                        e._dispatchProgress(e._jsonRate * (t.loaded / t.total))
                    },
                    t
                }
            };
            $.ajax(t)
        },
        t.prototype._setupAudio = function(t) {
            this._context = t
        },
        t.prototype._complete = function(t) {
            this._data = t;
            var e = 0;
            for (var i in t) this._keys[e++] = i;
            this._now = -1,
            this._len = e,
            this._next()
        },
        t.prototype._next = function() {
            if (this._now++, this._now < this._len) {
                this._dispatchProgress(this._jsonRate + (1 - this._jsonRate) * (this._now / this._len));
                var e = this,
                i = this._keys[this._now],
                t = this._data[i];
                if (0 < i.lastIndexOf(".mp3") || 0 < i.lastIndexOf(".ogg")) if (aidn.util.webaudio) {
                    this._context && (aidn.___waContext = this._context);
                    var n = new aidn.WebAudio;
                    r.add(i, n),
                    n.load(t,
                    function() {
                        e._next()
                    })
                } else setTimeout(function() {
                    e._next()
                },
                10);
                else {
                    var o, s = new Image;
                    o = this._type == f.PIXI ?
                    function() {
                        var t = new PIXI.Texture(new PIXI.BaseTexture(s));
                        PIXI.Texture.addToCache ? PIXI.Texture.addToCache(t, i) : PIXI.Texture.addTextureToCache(t, i),
                        r.add(i, t),
                        setTimeout(function() {
                            e._next()
                        },
                        10)
                    }: this._type == f.THREE ?
                    function() {
                        var t = new THREE.Texture(s);
                        t.needsUpdate = !0,
                        r.add(i, t),
                        setTimeout(function() {
                            e._next()
                        },
                        10)
                    }: function() {
                        r.add(i, s),
                        setTimeout(function() {
                            e._next()
                        },
                        10)
                    },
                    s.onload = o,
                    s.src = t
                }
            } else this._dispatchComplete()
        },
        t
    } (h);
    t.JsonBase64LoadCommand = m;
    var y = function() {
        function t(t, e) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.x = t,
            this.y = e
        }
        return t.prototype.set = function(t, e) {
            return void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            this.x = t,
            this.y = e,
            this
        },
        t.prototype.clone = function() {
            return new t(this.x, this.y)
        },
        t.prototype.distance = function(t) {
            var e = this.x - t.x,
            i = this.y - t.y;
            return Math.sqrt(e * e + i * i)
        },
        t
    } ();
    t.Point = y;
    var v = function() {
        function t() {}
        return t.random = function(t) {
            void 0 === t && (t = null);
            var e = this.seed;
            return null != t && (e = t),
            e ^= e << 13,
            e ^= e >> 17,
            e ^= e << 15,
            (this.seed = e) / 4294967296 + .5
        },
        t.randInt = function(t, e, i) {
            return void 0 === i && (i = null),
            Math.floor(this.rand(t, e + 1, i))
        },
        t.rand = function(t, e, i) {
            return void 0 === i && (i = null),
            this.random(i) * (e - t) + t
        },
        t.arrayShuffle = function(t) {
            for (var e = t.length,
            i = 0; i < e; i++) {
                var n = this.randInt(0, e - 1),
                o = t[i];
                t[i] = t[n],
                t[n] = o
            }
        },
        t.seed = 0,
        t
    } ();
    t.Util = v
} (aidnlib || (aidnlib = {})),
function(t) {
    var e = aidnlib.CommandBase,
    a = aidnlib.Assets,
    s = aidnlib.Ref,
    i = function(o) {
        function t(t, e, i) {
            var n = o.call(this) || this;
            return n._keys = [],
            n._n = 0,
            n._vs = [],
            n._url = t,
            n._loader = e,
            n._mesh = i,
            n
        }
        return __extends(t, o),
        t.prototype.execute = function() {
            var i = this;
            JSZipUtils.getBinaryContent(this._url,
            function(t, e) {
                i._zipComplete(t, e)
            })
        },
        t.prototype._zipComplete = function(t, e) {
            var i = this;
            JSZip.loadAsync(e).then(function(t) {
                i._binayComplete(t)
            })
        },
        t.prototype._binayComplete = function(t) {
            this._zip = t;
            var e = 0;
            for (var i in t.files) this._keys[e++] = i;
            this._now = -1,
            this._len = e,
            this._next()
        },
        t.prototype._next = function() {
            if (this._now++, this._now < this._len) {
                this._dispatchProgress(this._now / this._len);
                var e = this,
                i = this._keys[this._now];
                this._zip.file(i).async("arraybuffer").then(function(t) {
                    e._arrayComplete(t, i)
                })
            } else this._dispatchComplete()
        },
        t.prototype._arrayComplete = function(t, e) {
            var i = this;
            if (0 < e.lastIndexOf(".vmd")) {
                var n = this._loader,
                o = n.parser.parseVmd(t, !0);
                this._vs.push(o);
                var s = this._mesh,
                r = n.animationBuilder.build(o, s);
                a.add("Motion" + this._n, r),
                a.add(e, r),
                this._n++
            }
            setTimeout(function() {
                return i._next()
            },
            10)
        },
        t
    } (e);
    t.ZipLoadCommand = i;
    var n = function(s) {
        function t(t, e, i, n) {
            void 0 === e && (e = "motion"),
            void 0 === i && (i = null),
            void 0 === n && (n = null);
            var o = s.call(this) || this;
            return o._url = t,
            o._loader = i,
            o._mesh = n,
            o._key = e,
            o
        }
        return __extends(t, s),
        t.prototype.execute = function() {
            var e = this;
            this._loader || (this._loader = a.get("loader")),
            this._mesh || (this._mesh = a.get("mesh"));
            var t = new XMLHttpRequest; (this._xhr = t).open("GET", this._url, !0),
            t.responseType = "arraybuffer",
            t.onload = function(t) {
                return e._loadComplete(t)
            },
            t.send()
        },
        t.prototype._loadComplete = function(t) {
            var e = this._xhr.response,
            i = this._loader,
            n = i.parser.parseVmd(e, !0),
            o = this._mesh,
            s = i.animationBuilder.build(n, o);
            a.add(this._key, s),
            this._dispatchComplete()
        },
        t
    } (e);
    t.ThreeVmdLoadCommand = n;
    var o = function(i) {
        function t(t) {
            var e = i.call(this) || this;
            return e._pmdUrl = t,
            e
        }
        return __extends(t, i),
        t.prototype.execute = function() {
            var e = this,
            t = new THREE.MMDLoader;
            a.add("loader", t),
            a.add(this._pmdUrl + "_loader", t),
            t.load(this._pmdUrl,
            function(t) {
                e._complete(t)
            },
            function(t) {
                e._progress(t)
            })
        },
        t.prototype._progress = function(t) {
            if (t.lengthComputable) {
                var e = t.loaded / t.total;
                this._dispatchProgress(e)
            }
        },
        t.prototype._complete = function(t) {
            var e = t;
            a.add("mesh", e),
            a.add(this._pmdUrl, e),
            this._dispatchComplete()
        },
        t
    } (e);
    t.ThreePmdLoadCommand = o;
    var r = function() {
        function t(t, e) {
            void 0 === t && (t = null),
            void 0 === e && (e = null),
            t || (t = new THREE.Object3D),
            this._target = t,
            e ? (this._parent = e, this._parent.add(this._target)) : this._parent = t.parent
        }
        return t.prototype.setPosVec = function(t) {
            return this.x = t.x,
            this.y = t.y,
            this.z = t.z,
            this
        },
        t.prototype.setPos = function(t, e, i) {
            return this.x = t,
            this.y = e,
            this.z = i,
            this
        },
        t.prototype.setRot = function(t, e, i) {
            return this.rotationX = t,
            this.rotationY = e,
            this.rotationZ = i,
            this
        },
        t.prototype.getPos = function() {
            return this._target.position.clone()
        },
        t.prototype.getRot = function() {
            return this._target.rotation
        },
        t.prototype.get2D = function(t, e) {
            void 0 === e && (e = null);
            var i = .5 * s.stw,
            n = .5 * s.sth,
            o = this._target.position.clone();
            return e && o.add(e),
            o.project(t),
            o.x = Math.round((o.x + 1) * i),
            o.y = Math.round((1 - o.y) * n),
            new THREE.Vector2(o.x, o.y)
        },
        Object.defineProperty(t.prototype, "parent", {
            get: function() {
                return this._parent
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "target", {
            get: function() {
                return this._target
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "x", {
            get: function() {
                return this._target.position.x
            },
            set: function(t) {
                this._target.position.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "y", {
            get: function() {
                return this._target.position.y
            },
            set: function(t) {
                this._target.position.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "z", {
            get: function() {
                return this._target.position.z
            },
            set: function(t) {
                this._target.position.z = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "rotationX", {
            get: function() {
                return this._target.rotation.x
            },
            set: function(t) {
                this._target.rotation.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "rotationY", {
            get: function() {
                return this._target.rotation.y
            },
            set: function(t) {
                this._target.rotation.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "rotationZ", {
            get: function() {
                return this._target.rotation.z
            },
            set: function(t) {
                this._target.rotation.z = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scale", {
            get: function() {
                return this._target.scale.x
            },
            set: function(t) {
                t = this.__checkSc(t),
                this._target.scale.set(t, t, t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scaleX", {
            get: function() {
                return this._target.scale.x
            },
            set: function(t) {
                t = this.__checkSc(t),
                this._target.scale.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scaleY", {
            get: function() {
                return this._target.scale.y
            },
            set: function(t) {
                t = this.__checkSc(t),
                this._target.scale.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scaleZ", {
            get: function() {
                return this._target.scale.z
            },
            set: function(t) {
                t = this.__checkSc(t),
                this._target.scale.z = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "visible", {
            get: function() {
                return this._target.visible
            },
            set: function(t) {
                this._target.visible = t
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.__checkSc = function(t) {
            return 0 == t && (t = .001),
            t
        },
        Object.defineProperty(t.prototype, "renderOrder", {
            get: function() {
                return this._target.renderOrder
            },
            set: function(t) {
                this._target.renderOrder = t
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    } ();
    t.ThreeBase = r;
    var _ = function() {
        function t(t) {
            this._bone = t,
            this._defRot = t.rotation.clone(),
            this._defPos = t.position.clone()
        }
        return Object.defineProperty(t.prototype, "bone", {
            get: function() {
                return this._bone
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "defRot", {
            get: function() {
                return this._defRot
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "defPos", {
            get: function() {
                return this._defPos
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "x", {
            get: function() {
                return this._bone.position.x
            },
            set: function(t) {
                this._bone.position.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "y", {
            get: function() {
                return this._bone.position.y
            },
            set: function(t) {
                this._bone.position.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "z", {
            get: function() {
                return this._bone.position.z
            },
            set: function(t) {
                this._bone.position.z = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "rotationX", {
            get: function() {
                return this._bone.rotation.x
            },
            set: function(t) {
                this._bone.rotation.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "rotationY", {
            get: function() {
                return this._bone.rotation.y
            },
            set: function(t) {
                this._bone.rotation.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "rotationZ", {
            get: function() {
                return this._bone.rotation.z
            },
            set: function(t) {
                this._bone.rotation.z = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scale", {
            get: function() {
                return this._bone.scale.x
            },
            set: function(t) {
                this._bone.scale.set(t, t, t)
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.add = function() {
            for (var t, e = [], i = 0; i < arguments.length; i++) e[i] = arguments[i]; (t = this._bone).add.apply(t, e)
        },
        t
    } (),
    h = function(u) {
        function t(t, e, i) {
            void 0 === i && (i = !1);
            var n = u.call(this, t, e) || this;
            n._mesh = t,
            n._bones = [];
            for (var o = t.skeleton.bones.length,
            s = 0; s < o; s++) n._bones[s] = new _(t.skeleton.bones[s]);
            var r = t.material;
            for (s = 0; s < r.length; s++) if (i) {
                var a = r[s],
                h = new THREE.MeshBasicMaterial({
                    map: a.map,
                    skinning: !0
                });
                h.userData.outlineParameters = [],
                t.material[s] = h,
                t.material[s].needsUpdate = !0
            }
            return n
        }
        return __extends(t, u),
        Object.defineProperty(t.prototype, "mesh", {
            get: function() {
                return this._mesh
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "bones", {
            get: function() {
                return this._bones
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.logInfo = function() {
            var t = this._mesh;
            console.log("mesh.morphTargetDictionary:"),
            console.log(t.morphTargetDictionary),
            console.log("mesh.skeleton.bones:"),
            console.log(t.skeleton.bones)
        },
        t.prototype.initAnimation = function(t, e) {
            void 0 === e && (e = -1);
            var i = new THREE.MMDAnimationHelper({
                sync: !1
            });
            i.enabled.physics = !1,
            this._helper = i,
            this._helper.add(this._mesh, {
                animation: t,
                physics: !1
            });
            var n = this._helper.objects.get(this._helper.meshes[0]).mixer._actions;
            return this._acs = n,
            this.playAnimationId(e),
            n
        },
        t.prototype.playAnimationId = function(t) {
            void 0 === t && (t = -1);
            for (var e = this._acs,
            i = 0; i < e.length; i++) e[i].weight = i == t ? 1 : 0
        },
        t.prototype.update = function() {
            this._helper && this._helper.update(s.delta)
        },
        t
    } (r);
    t.MMDManager = h;
    var u = function(n) {
        function t(t, e) {
            void 0 === e && (e = null);
            var i = n.call(this, t, e) || this;
            if (t.geometry) try {
                i._mesh = t
            } catch(t) {}
            return t.geometry && (i._geometry = t.geometry),
            t.material && (i._material = t.material, i._map = i._material.map, i._color = i._material.color),
            i
        }
        return __extends(t, n),
        t.prototype.centerTrans = function(t, e, i) {
            void 0 === t && (t = 0),
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            this._geometry && this._geometry.applyMatrix((new THREE.Matrix4).makeTranslation(t, e, i))
        },
        t.prototype.updateTexture = function(t, e) {
            void 0 === e && (e = !1),
            this._material.map = t,
            this._material.needsUpdate = !0,
            this._map = this._material.map,
            this._material.blending = e ? THREE.AdditiveBlending: THREE.NormalBlending
        },
        Object.defineProperty(t.prototype, "alpha", {
            get: function() {
                return this._material.opacity
            },
            set: function(t) {
                this._material.opacity = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "mesh", {
            get: function() {
                return this._mesh
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "geometry", {
            get: function() {
                return this._geometry
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "material", {
            get: function() {
                return this._material
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "texOffsetX", {
            get: function() {
                return this._map.offset.x
            },
            set: function(t) {
                this._map.offset.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "texOffsetY", {
            get: function() {
                return this._map.offset.y
            },
            set: function(t) {
                this._map.offset.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "texRepeatX", {
            get: function() {
                return this._map.repeat.x
            },
            set: function(t) {
                this._map.repeat.x = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "texRepeatY", {
            get: function() {
                return this._map.repeat.y
            },
            set: function(t) {
                this._map.repeat.y = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "color", {
            get: function() {
                return this._color.getHex()
            },
            set: function(t) {
                this._color.setHex(t)
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    } (r),
    c = function(o) {
        function t(t, e) {
            var i = this,
            n = new THREE.Sprite(e);
            return (i = o.call(this, n, t) || this)._sprite = n,
            i
        }
        return __extends(t, o),
        Object.defineProperty(t.prototype, "sprite", {
            get: function() {
                return this._sprite
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "material", {
            get: function() {
                return this._sprite.material
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "rotation", {
            get: function() {
                return this._sprite.material.rotation
            },
            set: function(t) {
                this._sprite.material.rotation = t
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    } (t.PrimBase = u);
    t.PrimSprite = c;
    var l = function(h) {
        function t(t, e, i, n) {
            void 0 === e && (e = null),
            void 0 === i && (i = -1),
            void 0 === n && (n = 1);
            var o, s = this,
            r = new THREE.Geometry;
            if (r.vertices = t, 0 <= i) {
                var a = new THREE.LineBasicMaterial({
                    color: i,
                    linewidth: n,
                    linecap: "square",
                    linejoin: "miter"
                });
                o = new THREE.Line(r, a)
            } else(o = new THREE.Line(r)).visible = !1;
            return (s = h.call(this, o, e) || this)._line = o,
            s
        }
        return __extends(t, h),
        Object.defineProperty(t.prototype, "line", {
            get: function() {
                return this._line
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "material", {
            get: function() {
                return this._line.material
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    } (u);
    t.PrimLine = l;
    var d = function(u) {
        function t(t, e, i, n, o, s) {
            void 0 === i && (i = 1),
            void 0 === n && (n = 1),
            void 0 === o && (o = 1),
            void 0 === s && (s = 1);
            var r = this,
            a = new THREE.PlaneGeometry(i, n, o, s),
            h = new THREE.Mesh(a, e);
            return (r = u.call(this, h, t) || this)._mesh = h,
            r
        }
        return __extends(t, u),
        t
    } (u);
    t.PrimPlane = d;
    var p = function(c) {
        function t(t, e, i, n, o, s, r, a) {
            void 0 === s && (s = 1),
            void 0 === r && (r = 1),
            void 0 === a && (a = 1);
            var h = this,
            u = new THREE.BoxGeometry(i, n, o, s, r, a),
            _ = new THREE.Mesh(u, e);
            return (h = c.call(this, _, t) || this)._mesh = _,
            h
        }
        return __extends(t, c),
        t
    } (u);
    t.PrimCube = p;
    var f = function(h) {
        function t(t, e, i, n, o) {
            void 0 === n && (n = 8),
            void 0 === o && (o = 6);
            var s = this,
            r = new THREE.SphereGeometry(i, n, o),
            a = new THREE.Mesh(r, e);
            return (s = h.call(this, a, t) || this)._mesh = a,
            s
        }
        return __extends(t, h),
        t
    } (u);
    t.PrimSphere = f;
    var m = function(c) {
        function t(t, e, i, n, o, s, r, a) {
            void 0 === s && (s = 8),
            void 0 === r && (r = 1),
            void 0 === a && (a = !1);
            var h = this,
            u = new THREE.CylinderGeometry(i, n, o, s, r, a),
            _ = new THREE.Mesh(u, e);
            return (h = c.call(this, _, t) || this)._mesh = _,
            h
        }
        return __extends(t, c),
        t
    } (u);
    t.PrimCylinder = m;
    var y = function(u) {
        function t(t, e, i, n, o, s) {
            void 0 === o && (o = 8),
            void 0 === s && (s = 1);
            var r = this,
            a = new THREE.RingGeometry(i, n, o, s),
            h = new THREE.Mesh(a, e);
            return (r = u.call(this, h, t) || this)._mesh = h,
            r
        }
        return __extends(t, u),
        t
    } (u);
    t.PrimRing = y;
    var v = function(u) {
        function t(t, e, i, n, o, s) {
            void 0 === n && (n = 2),
            void 0 === o && (o = 8),
            void 0 === s && (s = 8);
            var r = this,
            a = new THREE.TorusGeometry(i, n, s, o),
            h = new THREE.Mesh(a, e);
            return (r = u.call(this, h, t) || this)._mesh = h,
            r
        }
        return __extends(t, u),
        t
    } (u);
    t.PrimTorus = v
} (three || (three = {})),
function(t) {
    var e = function() {
        function t(t, e, i) {
            void 0 === e && (e = 120),
            void 0 === i && (i = 32),
            this._opt = {
                volRate: 1
            },
            this._isPlaying = !1,
            this._stopFlag = !1,
            this._nb = 0,
            this._wa = t,
            this._bpm = e,
            this._beat = 6e4 / e,
            this._totalBeat = i
        }
        return t.prototype.play = function(t) {
            var e = t.volume,
            i = void 0 === e ? 1 : e,
            n = t.fadetime,
            o = void 0 === n ? 0 : n,
            s = t.delay,
            r = void 0 === s ? 0 : s,
            a = t.callback,
            h = void 0 === a ? null: a,
            u = t.loop,
            _ = void 0 !== u && u,
            c = t.beatCallback,
            l = void 0 === c ? null: c,
            d = o <= 0 ? i: 0;
            this._wa.play(0, !1, null, 0, d, r),
            0 < o && TweenMax.to(this._wa, o, {
                volume: i,
                ease: Power2.easeOut
            }),
            this._st = 1e3 * (aidn.___waContext.currentTime + r),
            this._volume = i,
            this._loop = _,
            this._callback = h,
            this._beatCallback = l,
            this._stopFlag || (this._opt.volRate = 1),
            this._isPlaying = !0,
            this._update()
        },
        t.prototype.stop = function(t) {
            var e = this,
            i = t.fadetime,
            n = void 0 === i ? 0 : i;
            this._stopFlag = !0,
            TweenMax.to(this._wa, n, {
                volume: 0,
                ease: Power2.easeOut,
                onComplete: function() {
                    return e._stopComplete()
                }
            })
        },
        t.prototype._stopComplete = function() {
            this._stopFlag = !1,
            this._isPlaying = !1,
            this._wa.stop()
        },
        t.prototype._update = function() {
            var t = this;
            if (this._isPlaying) {
                var e = 1e3 * aidn.___waContext.currentTime - this._st,
                i = Math.floor(e / this._beat);
                this._nb != i && (this._nb = i, this._beatCallback && this._beatCallback(this._nb));
                var n = i % this._totalBeat;
                if (this._totalBeat - 3 <= n) {
                    var o = ((i + this._totalBeat - n) * this._beat - e) / 1e3;
                    if (this._callback && this._callback(o), this._loop) {
                        var s = {
                            volume: this._volume,
                            delay: o,
                            callback: this._callback,
                            loop: this._loop,
                            beatCallback: this._beatCallback
                        };
                        this.play(s)
                    }
                }
                window.requestAnimationFrame(function() {
                    return t._update()
                })
            }
        },
        t
    } ();
    t.WebAudioManager = e;
    var n = function() {
        function t(t) {
            this._wa = t
        }
        return Object.defineProperty(t.prototype, "volume", {
            get: function() {
                return this._wa.volume
            },
            set: function(t) {
                this._wa.volume = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "filterBiquad", {
            get: function() {
                return this._filterBiquad
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "filterPitchShift", {
            get: function() {
                return this._filterPitchShift
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.initBiquad = function(t) {
            var e; (void 0 === t && (t = null), this._filterBiquad) || (t ? (e = t.createBiquadFilter(), this._wa.addNode(e)) : e = this._wa.initBiquadFilter("allpass"), this._filterBiquad = new o(e))
        },
        t.prototype.initPitchShift = function(t) {
            if (void 0 === t && (t = null), !this._filterPitchShift) {
                t || (t = aidn.___waContext);
                var e = new r(t);
                this._wa.addNode(e.getNode()),
                this._filterPitchShift = new s(e)
            }
        },
        t.prototype.play = function(t, e, i) {
            void 0 === t && (t = 1),
            void 0 === e && (e = 0),
            void 0 === i && (i = 0),
            this._wa.play(0, !1, null, i, t, e)
        },
        t.prototype.stop = function(t) {
            var e = this;
            void 0 === t && (t = 0),
            t <= 0 ? this._wa.stop() : $(this._wa).animate({
                volume: 0
            },
            {
                easing: "linear",
                duration: 1e3 * t,
                complete: function() {
                    return e._wa.stop()
                }
            })
        },
        t
    } ();
    t.AudioAsset = n;
    var i = function() {
        function t(t) {
            void 0 === t && (t = 120),
            this._beat = -2,
            this._startTime = 0,
            this._isStarting = !1,
            this._volume = 1,
            this.__keyCount = 0,
            this.__beats = {},
            this.__shottimes = {},
            this._beatInterval = 6e4 / t,
            this._volumeLoops = [],
            this._volumeOneShots = [],
            this._audioLoops = [],
            this._audioOneShots = [],
            this._loopParams = [],
            this._idlist = []
        }
        return Object.defineProperty(t.prototype, "volume", {
            get: function() {
                return this._volume
            },
            set: function(t) {
                t < 0 && (t = 0),
                this._volume = t;
                for (var e = this._audioLoops.length,
                i = 0; i < e; i++) {
                    var n = this._audioLoops[i];
                    n && (n.volume = this._volumeLoops[i] * this._volume)
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "time", {
            get: function() {
                return this._startTime <= 0 ? 0 : 1e3 * aidn.___waContext.currentTime - this._startTime
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "beat", {
            get: function() {
                return Math.floor(this.time / this._beatInterval)
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.addBeatHandler = function(t, e) {
            t.__keyb || (t.__keyb = "keyb_" + this.__keyCount, this.__keyCount++),
            this.__beats[t.__keyb] = e
        },
        t.prototype.removeBeatHandler = function(t) {
            t.__keyb && delete this.__beats[t.__keyb]
        },
        t.prototype.addLoop = function(t, e, i) {
            void 0 === i && (i = 1),
            t instanceof aidn.WebAudio && (t = new n(t)),
            e.flag = !1,
            t.volume = i,
            this._volumeLoops.push(i),
            this._audioLoops.push(t),
            this._loopParams.push(e)
        },
        t.prototype.addOneShot = function(t, e, i) {
            void 0 === i && (i = 1),
            t instanceof aidn.WebAudio && (t = new n(t)),
            t.volume = i,
            this._volumeOneShots[e] = i,
            this._audioOneShots[e] = t
        },
        t.prototype.start = function() {
            this._startTime = 1e3 * aidn.___waContext.currentTime + .5 * this._beatInterval,
            this._isStarting = !0,
            this._update()
        },
        t.prototype.stop = function() {
            this._isStarting = !1;
            for (var t = this._audioLoops.length,
            e = 0; e < t; e++) this._audioLoops[e].stop()
        },
        t.prototype.setupBiquad = function(t, e, i, n) {
            void 0 === n && (n = null);
            var o = this._audioOneShots[t];
            o && (o.initBiquad(n), o.filterBiquad.type = e, o.filterBiquad.frequency = i)
        },
        t.prototype.setupPitchShift = function(t, e, i) {
            void 0 === i && (i = null);
            var n = this._audioOneShots[t];
            n && (n.initPitchShift(i), n.filterPitchShift.shift = e)
        },
        t.prototype.addList = function(t, e) {
            void 0 === e && (e = -1),
            this._idlist.push(t)
        },
        t.prototype.deleteList = function(t) {
            this._idlist[t] && (this._idlist[t] = null)
        },
        t.prototype.playOneShot = function(t, e, i, n) {
            if (void 0 === e && (e = 0), void 0 === i && (i = !0), void 0 === n && (n = 0), t < 0) return - 1;
            var o = this.time,
            s = this.beat + 1 + e;
            if (i) {
                var r = 1e3 * aidn.___waContext.currentTime;
                if (0 < this.__shottimes[s]) if (r - this.__shottimes[s] < 2 * this._beatInterval) return - 1;
                this.__shottimes[s] = r
            }
            var a = (s * this._beatInterval - o) / 1e3 + n,
            h = this._audioOneShots[t];
            return h && h.play(this._volumeOneShots[t] * this._volume, a),
            a
        },
        t.prototype.stopOneShot = function(t) {
            var e = this._audioOneShots[t];
            e && e.stop()
        },
        t.prototype._update = function() {
            var t = this;
            if (this._isStarting) {
                var e = this.time,
                i = this.beat;
                i != this._beat && this._updateBeat(i, e),
                window.requestAnimationFrame(function() {
                    return t._update()
                })
            }
        },
        t.prototype._updateBeat = function(t, e) {
            this._beat = t;
            for (var i = this._audioLoops.length,
            n = 0; n < i; n++) {
                var o = this._audioLoops[n],
                s = this._loopParams[n],
                r = t % s.total;
                r < 0 && (r = s.total + r),
                (u = s.start - 1) < 0 && (u = s.total - 1);
                for (var a = !1,
                h = 0; h < 3; h++) {
                    var u;
                    if ((u = s.start - h) < 0 && (u = s.total - h), r == u && (a = !0, !s.flag)) {
                        s.flag = !0;
                        var _ = s.start - r;
                        s.start < r && (_ = s.start + s.total - r);
                        var c = ((t + _) * this._beatInterval - e) / 1e3;
                        c < 0 && (c = 0),
                        o.play(this._volumeLoops[n] * this._volume, c)
                    }
                }
                a || (s.flag = !1)
            }
            for (var l in this.__beats) this.__beats[l](r, this._beatInterval);
            this._updateList(t, e)
        },
        t.prototype._updateList = function(t, e) {
            for (var i = this._idlist.length,
            n = 0; n < i; n++) {
                var o = this._idlist[n];
                this._updateListOne(t, e, o)
            }
        },
        t.prototype._updateListOne = function(t, e, i) {
            var n = i.length,
            o = t % n + 1;
            n <= o && (o = 0);
            var s = i[o];
            this.playOneShot(s, 0, !1)
        },
        t
    } ();
    t.AudioManager = i;
    var o = function() {
        function t(t) {
            this._filter = t
        }
        return Object.defineProperty(t.prototype, "type", {
            get: function() {
                return this._filter.type
            },
            set: function(t) {
                this._filter.type = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "frequency", {
            get: function() {
                return this._filter.frequency.value
            },
            set: function(t) {
                this._filter.frequency.value = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "Q", {
            get: function() {
                return this._filter.Q.value
            },
            set: function(t) {
                this._filter.Q.value = t
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    } (),
    s = function() {
        function t(t) {
            this._filter = t
        }
        return Object.defineProperty(t.prototype, "rate", {
            get: function() {
                return this._filter.rate
            },
            set: function(t) {
                this._filter.rate = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "shift", {
            set: function(t) {
                this._filter.rate = 0 != t ? Math.pow(Math.pow(2, 1 / 12), t) : 1
            },
            enumerable: !0,
            configurable: !0
        }),
        t
    } (),
    r = function() {
        function t(t, e) {
            void 0 === e && (e = 1024);
            var i = this;
            this.rate = 1;
            var n = t.createScriptProcessor(e, 1, 1);
            n.onaudioprocess = function(t) {
                return i._onaudioprocess(t)
            },
            this._context = t,
            this._bufferSize = e = n.bufferSize,
            this._processor = n,
            this._fft = new FFT(e, t.sampleRate),
            this._a_real = new Array(e),
            this._a_imag = new Array(e)
        }
        return t.prototype.getNode = function() {
            return this._processor
        },
        t.prototype._onaudioprocess = function(t) {
            for (var e = t.inputBuffer.getChannelData(0), i = t.outputBuffer.getChannelData(0), n = this._pshift(this.rate, e), o = 0; o < e.length; o++) i[o] = n[o]
        },
        t.prototype._pshift = function(t, e) {
            var i = this._bufferSize;
            this._fft.forward(e);
            for (var n = 0; n < i; n++) this._a_real[n] = 0,
            this._a_imag[n] = 0;
            for (n = 0; n < i; n++) {
                var o = Math.floor(n * t),
                s = 1;
                i / 2 < n && (s = 0),
                0 <= o && o < i && (this._a_real[o] += this._fft.real[n] * s, this._a_imag[o] += this._fft.imag[n] * s)
            }
            return this._fft.inverse(this._a_real, this._a_imag)
        },
        t
    } ()
} (aidnaudio || (aidnaudio = {})),
function(p) {
    var f = aidnlib.Ref,
    a = aidnlib.Assets,
    t = three.ThreeBase,
    e = three.PrimPlane,
    r = three.PrimCube,
    d = three.PrimCylinder,
    m = function() {
        function t() {}
        return t.getMaterial = function(t, e) {
            void 0 === e && (e = "");
            var i = e + t;
            if (this._que[i]) return this._que[i];
            var n = new THREE.MeshBasicMaterial({
                color: t,
                side: THREE.DoubleSide
            });
            return this._que[i] = n
        },
        t.getLambertMaterial = function(t, e, i) {
            void 0 === e && (e = 0),
            void 0 === i && (i = "");
            var n = i + t + "_" + e;
            if (this._que[n]) return this._que[n];
            var o = new THREE.MeshLambertMaterial({
                color: t,
                emissive: e,
                side: THREE.DoubleSide,
                skinning: !0,
                fog: !0
            });
            return this._que[n] = o
        },
        t._que = {},
        t
    } (),
    i = function() {
        this.lookPt = new THREE.Vector3,
        this.y = 0,
        this.rot = 0,
        this.distance = 0,
        this.dLookPt = new THREE.Vector3,
        this.rLookPt = new THREE.Vector3,
        this.dY = 0,
        this.rY = 0,
        this.dRot = 0,
        this.rRot = 0,
        this.weight = 1
    },
    y = function() {
        function t(t, e) {
            this._params = [],
            this._camera = t,
            this._params = [e]
        }
        return t.prototype.change = function(t, e) {
            void 0 === e && (e = .7);
            var i = Power2.easeInOut,
            n = this._params[this._params.length - 1];
            TweenMax.killTweensOf(n),
            TweenMax.to(n, e, {
                ease: i,
                weight: 0
            }),
            t.weight = 1e-4,
            TweenMax.killTweensOf(t),
            TweenMax.to(t, e, {
                ease: i,
                weight: 1
            }),
            this._params.push(t)
        },
        t.prototype._updateMV = function() {
            var t = this._camera,
            e = .65 * f.time,
            i = 30 * Math.sin(e),
            n = 30 * Math.cos(e);
            t.position.set(i, 8, n),
            t.lookAt(0, 6, 0)
        },
        t.prototype.update = function() {
            if (p.Context._isMV) this._updateMV();
            else {
                for (var t, e, i = 0,
                n = 0,
                o = 0,
                s = 0,
                r = 0,
                a = 0,
                h = this._params,
                u = h.length,
                _ = f.time,
                c = 0; c < u; c++) {
                    var l = h[c];
                    l.weight <= 0 ? (h.splice(c, 1), c--, u--) : (i += l.lookPt.x * l.weight, n += l.lookPt.y * l.weight, o += l.lookPt.z * l.weight, s += l.y * l.weight, r += l.rot * l.weight, a += l.distance * l.weight, i += l.dLookPt.x * Math.sin(_ * l.rLookPt.x) * l.weight, n += l.dLookPt.y * Math.sin(_ * l.rLookPt.y) * l.weight, o += l.dLookPt.z * Math.sin(_ * l.rLookPt.z) * l.weight, s += l.dY * Math.sin(_ * l.rY) * l.weight, r += l.dRot * Math.sin(_ * l.rRot) * l.weight)
                }
                var d = this._camera;
                t = Math.sin(r) * a,
                e = Math.cos(r) * a,
                d.position.set(t, s, e),
                d.lookAt(i, n, o)
            }
        },
        t
    } (),
    n = function() {
        function t(t) {
            void 0 === t && (t = "view");
            var e = this;
            this._isStarting = !1;
            var i = new THREE.PerspectiveCamera(45, f.stw / f.sth, .01, 200);
            i.position.z = 30,
            i.position.y = 14,
            i.lookAt(0, 7, 0);
            var n = new THREE.Scene;
            n.background = new THREE.Color(1119011),
            n.fog = new THREE.Fog(1119011, 30, 60);
            var o = new THREE.AmbientLight(11184810);
            n.add(o);
            var s = new THREE.DirectionalLight(4473924);
            s.castShadow = !0,
            n.add(s),
            s.shadow.camera.top = 30,
            s.shadow.camera.bottom = -30,
            s.shadow.camera.left = -30,
            s.shadow.camera.right = 30,
            s.shadow.mapSize.width = 2048,
            s.shadow.mapSize.height = 2048;
            var r = 15 * Math.sin(0),
            a = 15 * Math.cos(0);
            s.position.set(r, 10, a);
            var h = document.getElementById(t),
            u = new THREE.WebGLRenderer({
                antialias: !0
            });
            u.setPixelRatio(Math.min(window.devicePixelRatio, 2)),
            u.setSize(f.stw, f.sth),
            u.shadowMap.enabled = !0,
            h.appendChild(u.domElement),
            this._renderer = u,
            this._scene = n,
            this._camera = i;
            var _ = this._getCameraParam(p.SceneId.TOP);
            this._cameraMng = new y(i, _),
            this._mikuMng = new x(this._scene),
            this._boxMng = new b(this._scene),
            this._slashingMng = new g(this._scene),
            this._sakuraMng = new v(this._scene),
            this._sakuraMng.start();
            var c = m.getLambertMaterial(13421772, 2236962),
            l = new d(this._scene, c, 4, 3, 12, 8);
            l.mesh.castShadow = !1,
            l.mesh.receiveShadow = !0,
            l.y = -6,
            l.rotationY += p.toRad(22.5),
            $("#view").css({
                opacity: 0
            }).animate({
                opacity: .6
            },
            800, "linear"),
            p.Context.main.addUpdate(this,
            function() {
                return e._update()
            }),
            p.Context.main.addResize(this,
            function() {
                return e._resize()
            }),
            this._resize()
        }
        return t.prototype.show = function(t) {
            var e = this._getCameraParam(t),
            i = .6;
            switch (t) {
            case p.SceneId.LOADING:
            case p.SceneId.TOP:
            case p.SceneId.START:
            case p.SceneId.TUTORIAL:
            case p.SceneId.CREDITS:
                break;
            case p.SceneId.PLAYING:
                i = 1;
                break;
            case p.SceneId.RESULT:
            }
            p.Context._isMV && (i = 1),
            $("#view").stop().animate({
                opacity: i
            },
            800, "linear"),
            e && this._cameraMng.change(e, .6)
        },
        t.prototype.gameStart = function() {
            var e = this;
            this._boxMng.start(),
            $("#view").css({
                cursor: "pointer"
            }),
            $("#view").on(p.Context.isMobile ? "touchstart": "mousedown",
            function(t) {
                return e._tstart(t)
            }),
            $("#view").on(p.Context.isMobile ? "touchmove": "mousemove",
            function(t) {
                return e._tmove(t)
            }),
            $("#view").on(p.Context.isMobile ? "touchend": "mouseup",
            function(t) {
                return e._tend(t)
            })
        },
        t.prototype.gameEnd = function() {
            this._boxMng.end(),
            $("#view").css({
                cursor: "auto"
            }),
            $("#view").off(p.Context.isMobile ? "touchstart": "mousedown"),
            $("#view").off(p.Context.isMobile ? "touchmove": "mousemove"),
            $("#view").off(p.Context.isMobile ? "touchend": "mouseup"),
            $("#view").stop().animate({
                opacity: .6
            },
            500, "linear"),
            Math.PI < this._mikuMng.rotationY && (this._mikuMng.rotationY -= 2 * Math.PI),
            TweenMax.to(this._mikuMng, .6, {
                rotationY: 0,
                ease: Power2.easeInOut
            })
        },
        t.prototype._getCameraParam = function(t) {
            var e = new i;
            switch (t) {
            case p.SceneId.LOADING:
                e = null;
                break;
            case p.SceneId.TOP:
                e.lookPt.set(0, 7, 0),
                e.y = 8,
                e.distance = 24,
                e.rot = 0,
                e.dY = 1.5,
                e.rY = 1.131,
                e.dRot = p.toRad(20),
                e.rRot = 1.023;
                break;
            case p.SceneId.START:
                e.lookPt.set(0, 7, 0),
                e.y = 7,
                e.distance = 14,
                e.rot = p.toRad(60),
                e.dY = 1.2,
                e.rY = 1.131,
                e.dRot = p.toRad(10),
                e.rRot = 2.323;
                break;
            case p.SceneId.PLAYER_INFO:
                e.lookPt.set(0, 6, 0),
                e.y = 3,
                e.distance = 18,
                e.rot = p.toRad(25),
                e.dY = 1.5,
                e.rY = 1.931,
                e.dRot = p.toRad(24),
                e.rRot = 1.923;
                break;
            case p.SceneId.TUTORIAL:
                e.lookPt.set(0, 6.5, 0),
                e.y = 9,
                e.distance = 38,
                e.rot = p.toRad(5),
                e.dY = 1.5,
                e.rY = 1.731,
                e.dRot = p.toRad(24),
                e.rRot = 1.723;
                break;
            case p.SceneId.CREDITS:
                e.lookPt.set(0, 5, 0),
                e.y = 4,
                e.distance = 16,
                e.rot = p.toRad( - 50),
                e.dY = 1.2,
                e.rY = 1.731,
                e.dRot = p.toRad(12),
                e.rRot = 1.723;
                break;
            case p.SceneId.PLAYING:
                e.lookPt.set(0, 7, 0),
                e.y = 8,
                e.distance = 33,
                e.rot = 0,
                e.dY = .4,
                e.rY = 1.831,
                e.dRot = p.toRad(1.6),
                e.rRot = 2.023;
                break;
            case p.SceneId.RESULT:
                e.lookPt.set(0, 5, 0),
                e.y = 6,
                e.distance = 16,
                e.rot = 0,
                e.dY = 1.2,
                e.rY = 1.333,
                e.dRot = p.toRad(12),
                e.rRot = 2.222
            }
            return e
        },
        t.prototype._tstart = function(t) {
            t.preventDefault(),
            this._isStarting = !0;
            var e = aidn.event.getPos(t);
            this._startPt = e
        },
        t.prototype._tmove = function(t) {
            if (this._isStarting) {
                t.preventDefault();
                var e = aidn.event.getPos(t),
                i = e.x - this._startPt.x,
                n = e.y - this._startPt.y,
                o = Math.atan2( - n, i) + p.toRad(90);
                if (this._startPt.x == e.x && this._startPt.y == e.y) return;
                this._mikuMng.rotationY = o
            }
        },
        t.prototype._tend = function(t) {
            if (this._isStarting && this._mikuMng.iaigiri()) {
                var e = this._boxMng.iaigiri(this._mikuMng.rotationY);
                p.Context.main.game.cut(e),
                this._slashingMng.start(this._mikuMng.rotationY)
            }
            this._isStarting = !1
        },
        t.prototype._update = function() {
            this._mikuMng.update(),
            this._cameraMng.update(),
            this._renderer.render(this._scene, this._camera)
        },
        t.prototype._resize = function() {
            var t = f.stw,
            e = f.sth;
            this._camera.fov = t < e ? 45 : 39,
            this._camera.aspect = t / e,
            this._camera.updateProjectionMatrix(),
            this._renderer.setSize(t, e),
            this._renderer.render(this._scene, this._camera)
        },
        t
    } ();
    p.ThreeManager = n;
    var o = function(n) {
        function t(t) {
            var e = n.call(this, t, m.getMaterial(16777215)) || this;
            if (e.MAXY = 30, e.MINY = -20, p.Context._isMV) {
                var i = m.getMaterial([16751052, 16777079, 16777215][p.randInt(0, 2)]);
                e._material = i,
                e.mesh.material = i
            }
            return e
        }
        return __extends(t, n),
        t.prototype.init = function() {
            this.scale = p.Context._isMV ? p.rand(.1, 1.1) : p.rand(.2, .55);
            var t = p.rand(5, 20),
            e = p.rand(0, 2 * Math.PI),
            i = Math.cos(e) * t,
            n = Math.sin(e) * t,
            o = p.rand(this.MINY, this.MAXY);
            this.setPos(i, o, n),
            this._sy = p.rand(2, 5),
            this._rx = p.rand( - 3, 3),
            this._ry = p.rand( - 3, 3)
        },
        t.prototype.update = function() {
            this.y -= this._sy * f.delta,
            this.rotationX += this._rx * f.delta,
            this.rotationY += this._ry * f.delta,
            this.y < this.MINY && (this.init(), this.y = this.MAXY)
        },
        t
    } (e),
    v = function() {
        function t(t) {
            this._sakuras = [],
            this._parent = t
        }
        return t.prototype.start = function() {
            for (var t = this,
            e = p.Context._isMV ? 120 : 80, i = 0; i < e; i++) {
                var n = new o(this._parent);
                n.init(),
                this._sakuras[i] = n
            }
            p.Context.main.addUpdate(this,
            function() {
                return t._update()
            })
        },
        t.prototype._update = function() {
            for (var t = this._sakuras.length,
            e = 0; e < t; e++) this._sakuras[e].update()
        },
        t
    } (),
    s = function(e) {
        function t(t) {
            return e.call(this, t, m.getMaterial(16777215)) || this
        }
        return __extends(t, e),
        t.prototype.start = function(t, e) {
            var i = this;
            void 0 === e && (e = null),
            this.visible = !0,
            this._completeFunc = e;
            var n = 90 - p.toDeg(t);
            n < 0 && (n += 360);
            var o = p.toRad(n),
            s = 6.5 * Math.cos(o),
            r = 6.5 * Math.sin(o);
            this.rotationY = -o - p.toRad(90),
            this.setPos(s, 4, r);
            for (var a = this.geometry.vertices,
            h = 0; h < 4; h++) {
                var u = a[h];
                0 == h || 2 == h ? (u.x = -18, u.y = -6.75, 2 == h ? u.y = a[0].y + .1 : u.z = -.1) : (u.x = 18, u.y = 6.75, 3 == h ? u.y = a[1].y + .5 : u.z = -.4)
            }
            for (h = 0; h < 4; h++) {
                u = this.geometry.vertices[h];
                if (0 == h || 2 == h) {
                    var _ = a[h + 1];
                    TweenMax.to(u, .36, {
                        x: _.x,
                        y: _.y,
                        z: _.z,
                        ease: Power2.easeInOut
                    })
                }
            }
            this._update(),
            p.Context.main.addUpdate(this,
            function() {
                return i._update()
            }),
            TweenMax.delayedCall(.4,
            function() {
                return i._complete()
            })
        },
        t.prototype._update = function() {
            this.geometry.verticesNeedUpdate = !0
        },
        t.prototype._complete = function() {
            this.visible = !1,
            this._completeFunc && this._completeFunc(this)
        },
        t
    } (e),
    g = function() {
        function t(t) {
            this._que = [],
            this._parent = t
        }
        return t.prototype.start = function(t) {
            var e = this; (0 < this._que.length ? this._que.pop() : new s(this._parent)).start(t,
            function(t) {
                return e._complete(t)
            })
        },
        t.prototype._complete = function(t) {
            this._que.push(t)
        },
        t
    } (),
    h = function(i) {
        function t(t) {
            var e = i.call(this, t, m.getMaterial(9371566)) || this;
            return e._vs = [],
            e._as = [],
            e._rs = [],
            e
        }
        return __extends(t, i),
        t.prototype.init = function(t, e) {
            this.visible = !0,
            this.scale = p.rand(.15, .55);
            var i = f.stw,
            n = 1;
            f.sth < i && (n = 1.35),
            this._vs = [p.rand( - 20, 20), -p.rand( - 5, 15), -p.rand(12, 40) * n],
            this._as = [0, -p.rand(32, 48), 0];
            this._rs = [p.rand( - 5, 5), p.rand( - 5, 5), p.rand( - 5, 5)];
            var o = e.x / 2,
            s = e.y / 2;
            this.x = p.rand( - o, o),
            this.y = -s + e.y * t,
            this.z = 0,
            this.rotationX = p.rand(0, Math.PI),
            this.rotationY = p.rand(0, Math.PI),
            this.rotationZ = p.rand(0, Math.PI)
        },
        t.prototype.update = function() {
            this.x += this._vs[0] * f.delta,
            this.y += this._vs[1] * f.delta,
            this.z += this._vs[2] * f.delta,
            this._vs[0] += this._as[0] * f.delta,
            this._vs[1] += this._as[1] * f.delta,
            this._vs[2] += this._as[2] * f.delta,
            this.rotationX += this._rs[0] * f.delta,
            this.rotationY += this._rs[1] * f.delta,
            this.rotationZ += this._rs[2] * f.delta
        },
        t
    } (e),
    u = function() {
        function t(t) {
            this._pts = [],
            this._box = t
        }
        return t.prototype.start = function(t, e) {
            for (var i = this,
            n = this._len = p.randInt(8, 14), o = 0; o < n; o++) {
                var s = this._pts[o];
                s || (s = new h(this._box.target), this._pts[o] = s),
                s.init(t, e)
            }
            p.Context.main.addUpdate(this,
            function() {
                return i._update()
            })
        },
        t.prototype.end = function() {
            p.Context.main.removeUpdate(this);
            this._pts.length;
            for (var t = 0; t < this._len; t++) {
                this._pts[t].visible = !1
            }
        },
        t.prototype._update = function() {
            this._pts.length;
            for (var t = 0; t < this._len; t++) {
                this._pts[t].update()
            }
        },
        t
    } (),
    _ = function(i) {
        function t(t) {
            var e = i.call(this, new THREE.Object3D, t) || this;
            return e._size = new THREE.Vector3,
            e.MAXY = 30,
            e.MINY = -20,
            e._spVecs = [new THREE.Vector3, new THREE.Vector3],
            e._acVecs = [new THREE.Vector3, new THREE.Vector3],
            e._rtVecs = [new THREE.Vector3, new THREE.Vector3],
            e._size.set(3, 10, 1.5),
            e._box = e._createBox(),
            e._initBox(e._box, e._size),
            e._box1 = e._createBox(!0),
            e._box2 = e._createBox(!0),
            e._initBox(e._box1, e._size),
            e._initBox(e._box2, e._size),
            e._particleMng = new u(e),
            e
        }
        return __extends(t, i),
        Object.defineProperty(t.prototype, "degree", {
            get: function() {
                return this._degree
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "radius", {
            get: function() {
                return this._radius
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype._createBox = function(t) {
            var e, i, n;
            void 0 === t && (t = !1),
            t ? (e = m.getLambertMaterial(12517358, 1447446), i = m.getLambertMaterial(5962890, 1447446), n = m.getLambertMaterial(9371566, 1447446)) : (e = m.getLambertMaterial(12449530, 1447446), i = m.getLambertMaterial(5157615, 1447446), n = m.getLambertMaterial(9295610, 1447446));
            var o = [n, n, n, n, i, e],
            s = new r(this._target, o, 1, 1, 1);
            return s.mesh.castShadow = !0,
            s
        },
        t.prototype._initBox = function(t, e) {
            for (var i = e.x / 2,
            n = e.y / 2,
            o = e.z / 2,
            s = t.geometry.vertices,
            r = s.length,
            a = 0; a < r; a++) {
                var h = s[a];
                h.x = h.x < 0 ? -i: i,
                h.y = h.y < 0 ? -n: n,
                h.z = h.z < 0 ? -o: o
            }
            t.geometry.verticesNeedUpdate = !0
        },
        t.prototype._cutBox = function(t) {
            this._box.visible = !1,
            this._box1.visible = !0,
            this._box2.visible = !0;
            for (var e = this._size.y - 2,
            i = this._size.y / 2,
            n = (r = this._box1).geometry.vertices, o = [2, 3, 6, 7], s = 0; s < 4; s++) { (a = n[o[s]]).y = e * t - i,
                s <= 1 && (a.y += 2)
            }
            r.geometry.verticesNeedUpdate = !0,
            r.y = .5;
            var r;
            for (n = (r = this._box2).geometry.vertices, o = [0, 1, 4, 5], s = 0; s < 4; s++) {
                var a; (a = n[o[s]]).y = e * t - i,
                s <= 1 && (a.y += 2)
            }
            r.geometry.verticesNeedUpdate = !0,
            r.y = -.5
        },
        t.prototype.init = function(t) {
            void 0 === t && (t = -1),
            this.visible = !0,
            this._box.visible = !0,
            this._box1.visible = !1,
            this._box2.visible = !1,
            this.scale = 1;
            var e;
            e = 0 <= t ? t % 8 * 45 : 45 * p.randInt(0, 7);
            var i = p.toRad(e);
            this._degree = e,
            this._radius = i;
            var n = 5.5 * Math.cos(i),
            o = 5.5 * Math.sin(i),
            s = this.MAXY;
            this.rotationY = -i - p.toRad(90),
            this.setPos(n, s, o),
            this._sy = 8,
            this._ay = 16;
            for (var r = [this._box1, this._box2], a = 0; a < 2; a++) {
                var h = r[a];
                h.x = h.y = h.z = 0,
                h.rotationX = h.rotationY = h.rotationZ = 0
            }
        },
        t.prototype.end = function() {
            var t = this,
            e = Back.easeIn.config(1.7);
            TweenMax.to(this, .5, {
                scale: 0,
                ease: e,
                onComplete: function() {
                    return t._endComplete()
                }
            })
        },
        t.prototype._endComplete = function() {
            this.visible = !1
        },
        t.prototype.getIaigiriRate = function() {
            var t = this.y - this._size.y / 2 * 1.1,
            e = this.y + this._size.y / 2 * 1.1;
            return t < 5 && 5 < e ? (5 - t) / (e - t) : 0
        },
        t.prototype.iaigiri = function(t) {
            var e = this;
            this._iaigiriComplete = t;
            var i = this.getIaigiriRate();
            if (0 < i) {
                this._cutBox(i);
                var n = f.stw,
                o = 1;
                f.sth < n && (o = 1.45),
                this._spVecs[0].set(0, p.rand( - 18, -13), p.rand( - 13, -9) * o),
                this._spVecs[1].set(0, p.rand( - 24, -16), p.rand( - 13, -9) * o),
                this._acVecs[0].set(0, p.rand( - 32, -25), 0),
                this._acVecs[1].set(0, p.rand( - 32, -25), 0);
                return this._rtVecs[0].set(p.rand( - 2.9, 2.9), p.rand( - 2.9, 2.9), p.rand( - 2.9, 2.9)),
                p.Context.main.addUpdate(this,
                function() {
                    return e._update()
                }),
                this._particleMng.start(i, this._size),
                i
            }
            return 0
        },
        t.prototype._update = function() {
            for (var t = [this._box1, this._box2], e = 0; e < 2; e++) {
                var i = t[e],
                n = this._spVecs[e],
                o = this._acVecs[e];
                i.x += f.delta * n.x,
                i.y += f.delta * n.y,
                i.z += f.delta * n.z,
                i.rotationX += f.delta * this._rtVecs[e].x,
                i.rotationY += f.delta * this._rtVecs[e].y,
                i.rotationZ += f.delta * this._rtVecs[e].z,
                n.y += f.delta * o.y
            }
            this.y + this._box1.y < this.MINY && (this._particleMng.end(), p.Context.main.removeUpdate(this), this.visible = !1, this._iaigiriComplete(this))
        },
        t.prototype.update = function() {
            return this.y -= this._sy * f.delta,
            this._sy += this._ay * f.delta,
            this.y < this.MINY && (this.visible = !1, p.Context.main.game.damage(), !0)
        },
        t
    } (t),
    b = function() {
        function t(t) {
            this._boxes = [],
            this._que = [],
            this._t = 0,
            this._posTimes = [ - 1, -1, -1, -1, -1, -1, -1, -1],
            this._parent = t
        }
        return t.prototype.iaigiri = function(t) {
            var e = this,
            i = 90 - p.toDeg(t);
            i < 0 && (i += 360);
            for (var n = 0,
            o = 1e3,
            s = -1,
            r = this._boxes.length,
            a = 0; a < r; a++) {
                var h = this._boxes[a],
                u = Math.abs(i - h.degree); (u < 42 || 318 < u) && u < o && 0 < h.getIaigiriRate() && (o = u, s = a)
            }
            0 <= s && (0 < (n = (h = this._boxes[s]).iaigiri(function(t) {
                return e._iaigiriComplete(t)
            })) && this._boxes.splice(s, 1)[0]);
            return n
        },
        t.prototype._iaigiriComplete = function(t) {
            t.visible = !1,
            this._que.push(t)
        },
        t.prototype.start = function() {
            var t = this;
            this._t = .6,
            p.Context.main.addUpdate(this,
            function() {
                return t._update()
            })
        },
        t.prototype.end = function() {
            p.Context.main.removeUpdate(this);
            for (var t = this._boxes.length,
            e = 0; e < t; e++) {
                var i = this._boxes.pop();
                i.end(),
                this._que.push(i)
            }
        },
        t.prototype._update = function() {
            for (var t = this._boxes.length,
            e = 0; e < t; e++) {
                if (this._boxes[e].update()) {
                    if (!p.Context.isPlaying) return;
                    var i = this._boxes.splice(e, 1)[0];
                    this._que.push(i),
                    e--,
                    t--,
                    p.Context.main.game.cut( - 1)
                }
            }
            if (this._t < 0) {
                var n = p.randInt(0, 7);
                for (e = 0; e < 8; e++) {
                    var o = (e + n) % 8;
                    if (.6 < f.time - this._posTimes[o]) {
                        n = o,
                        this._posTimes[o] = f.time,
                        this._createBox(n);
                        break
                    }
                }
                var s = p.Context.main.game.gameMode,
                r = p.Context.main.game.time;
                switch (s) {
                case p.GameMode.TIME_ATTACK:
                    this._t = 50 < r ? 1 : 40 < r ? .9 : 30 < r ? .8 : 20 < r ? .7 : 10 < r ? .6 : .5;
                    break;
                case p.GameMode.ENDLESS:
                    var a = Math.floor(r / 180),
                    h = r % 180;
                    this._t = h < 30 ? p.rand(.8, 1.6) : h < 60 ? p.rand(.7, 1.4) : h < 90 ? p.rand(.7, 1.2) : h < 120 ? p.rand(.6, 1.2) : h < 150 ? p.rand(.6, 1.1) : p.rand(.5, 1);
                    var u = .47;
                    720 < r ? u = .39 : 540 < r && (u = .43),
                    this._t -= .15 * a,
                    this._t < u && (this._t = u);
                    break;
                case p.GameMode.ENDLESS_EX:
                    this._t = .39;
                    a = Math.floor(r / 60);
                    this._t -= .01 * a,
                    this._t <= .3 && (this._t = .3);
                    break;
                case p.GameMode.ENDLESS_UL:
                    this._t = .29;
                    a = Math.floor(r / 180);
                    this._t -= .01 * a,
                    this._t <= .25 && (this._t = .25)
                }
            }
            this._t -= f.delta
        },
        t.prototype._createBox = function(t) {
            var e;
            void 0 === t && (t = -1),
            (e = 0 < this._que.length ? this._que.pop() : new _(this._parent)).init(t),
            this._boxes.push(e)
        },
        t
    } (),
    x = function(r) {
        function t(t) {
            var e = r.call(this, a.get("mesh"), t) || this;
            e._rots = [16, 16, 0, 0],
            e._ranges = [8, 8, 0, 0],
            e._speeds = [1.934, 1.855, 0, 0];
            for (var i = e.mesh.material,
            n = 0; n < i.length; n++) {
                var o = i[n],
                s = new THREE.MeshLambertMaterial({
                    map: o.map,
                    skinning: !0,
                    morphTargets: !0,
                    emissive: 1381653,
                    fog: !0
                });
                e.mesh.material[n] = s
            }
            return e.mesh.castShadow = !0,
            p.Context._isMV && (e._rots = [30, 30, 10, 10], e._ranges = [12, 12, 8, 8], e._speeds = [2.934, 2.855, 2.757, 2.659]),
            e.initAnimation([a.get("motion")], 0),
            e._reset(),
            e._time = 0,
            e._duration = e._acs[0].getClip().duration,
            e
        }
        return __extends(t, r),
        t.prototype._reset = function() {
            this._acs[0].time = 0,
            this._helper.update(0)
        },
        t.prototype.iaigiri = function() {
            return ! (.08 < this._time) && (this._reset(), this._time = this._duration, !0)
        },
        t.prototype.update = function() {
            this._time -= f.delta,
            this._time <= 0 ? this._reset() : r.prototype.update.call(this);
            for (var t = 0; t < 4; t++) {
                this.bones[t + 26].rotationX = p.toRad(this._rots[t] + this._ranges[t] * Math.sin(f.time * this._speeds[t]))
            }
        },
        t
    } (three.MMDManager)
} (app || (app = {})),
function(o) {
    var s = aidnlib.Ref,
    t = aidnlib.MainBase,
    n = aidnlib.Assets,
    r = aidnlib.JsonBase64LoadCommand,
    a = aidnlib.JsonBase64Type,
    e = aidnlib.SequentialCommand,
    h = aidnlib.CommandEvent,
    i = aidnaudio.WebAudioManager;
    o.rand = function(t, e) {
        return t
    },
    o.randInt = function(t, e) {
        return t
    },
    o.toRad = function(t) {
        return 0
    },
    o.toDeg = function(t) {
        return 0
    };
    var u = function() {
        function t() {}
        return t.sceneId = -1,
        t.isPlaying = !1,
        t.isMobile = !1,
        t.isJa = !0,
        t.isFull = !1,
        t._isMV = !1,
        t
    } ();
    o.Context = u;
    var _, c, l = function() {
        function t() {
            this.KEY = "iaigiri"
        }
        return t.prototype.init = function() {
            var t = aidn.util.getStorage(this.KEY);
            t || (t = {
                timeattack: 0,
                endless: 0,
                endlessex: 0,
                endlessul: 0,
                chain: 0,
                totalbox: 0,
                sound: 1
            }),
            this._obj = t,
            this._obj.endlessex || (this._obj.endlessex = 0),
            this._obj.endlessul || (this._obj.endlessul = 0),
            1 == aidn.util.getQuery().debug && (this._obj = {
                timeattack: 25e3,
                endless: 3e5,
                endlessex: 2e5,
                endlessul: 1e5,
                chain: 500,
                totalbox: 5e3,
                sound: 1
            }),
            this.sound = 1 == this._obj.sound
        },
        Object.defineProperty(t.prototype, "scoreTimeAttack", {
            get: function() {
                return this._obj.timeattack
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scoreEndless", {
            get: function() {
                return this._obj.endless
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scoreEndlessEx", {
            get: function() {
                return this._obj.endlessex
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "scoreEndlessUl", {
            get: function() {
                return this._obj.endlessul
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "chain", {
            get: function() {
                return this._obj.chain
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(t.prototype, "sound", {
            get: function() {
                return 1 == this._obj.sound
            },
            set: function(t) {
                this._obj.sound = t ? 1 : 0,
                aidn.util.setStorage(this._obj, this.KEY),
                t ? ($("#bt_volume .on").show(), $("#bt_volume .off").hide()) : ($("#bt_volume .on").hide(), $("#bt_volume .off").show())
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.setTimeAttackScore = function(t) {
            this._obj.timeattack = Math.max(t, this._obj.timeattack),
            aidn.util.setStorage(this._obj, this.KEY)
        },
        t.prototype.setEndlessScore = function(t) {
            this._obj.endless = Math.max(t, this._obj.endless),
            aidn.util.setStorage(this._obj, this.KEY)
        },
        t.prototype.setEndlessExScore = function(t) {
            this._obj.endlessex = Math.max(t, this._obj.endlessex),
            aidn.util.setStorage(this._obj, this.KEY)
        },
        t.prototype.setEndlessUlScore = function(t) {
            this._obj.endlessul = Math.max(t, this._obj.endlessul),
            aidn.util.setStorage(this._obj, this.KEY)
        },
        t.prototype.setChain = function(t) {
            this._obj.chain = Math.max(t, this._obj.chain),
            aidn.util.setStorage(this._obj, this.KEY)
        },
        t.prototype.setTotalBox = function(t) {
            this._obj.totalbox = Math.max(t, this._obj.totalbox),
            aidn.util.setStorage(this._obj, this.KEY)
        },
        t.prototype.addTotalBox = function(t) {
            this._obj.totalbox = t + this._obj.totalbox,
            aidn.util.setStorage(this._obj, this.KEY)
        },
        t.prototype.getTimeAttackScore = function() {
            return b.getComma(this._obj.timeattack)
        },
        t.prototype.getEndlessScore = function() {
            return b.getComma(this._obj.endless)
        },
        t.prototype.getEndlessExScore = function() {
            return b.getComma(this._obj.endlessex)
        },
        t.prototype.getEndlessUlScore = function() {
            return b.getComma(this._obj.endlessul)
        },
        t.prototype.getChain = function() {
            return b.getComma(this._obj.chain)
        },
        t.prototype.getTotalBox = function() {
            return b.getComma(this._obj.totalbox)
        },
        t.prototype.updatePlayerInfo = function() {
            0 < this._obj.timeattack || 0 < this._obj.endless ? ($(".preland").addClass("land"), $("#bt_playerinfo").show(), $("#pi_timeattack").text(this.getTimeAttackScore()), $("#pi_endless").text(this.getEndlessScore()), $("#pi_endless_ex").text(this.getEndlessExScore()), $("#pi_endless_ul").text(this.getEndlessUlScore()), $("#pi_chain").text(this.getChain()), $("#pi_totalbox").text(this.getTotalBox())) : $("#bt_playerinfo").hide(),
            this._updateMedal() && ($(".exp").show(), this._updateMedal(1) && ($("#top p#kaiden span").text("Y 真・免許皆伝 Y"), $("#top p#kaiden").css("color", "#29dfff"), $("#top p#kaiden span").css("borderColor", "#29dfff"), $(".ult").show(), this._updateMedal(2) && ($("#top p#kaiden span").text("Y 極真・免許皆伝 Y"), $("#top p#kaiden").css("color", "#ff3974"), $("#top p#kaiden span").css("borderColor", "#ff3974"))))
        },
        t.prototype._updateMedal = function(t) {
            void 0 === t && (t = 0);
            for (var e = $("#playerinfo table." + ["mt", "mt_ex", "mt_ul"][t] + " tr"), i = e.length, n = 0, o = 0; o < i; o++) {
                var s = $(e[o]),
                r = s.attr("data-m").split("_"),
                a = parseInt(r[1]);
                switch (r[0]) {
                case "ta":
                    a <= this._obj.timeattack ? s.addClass("active") : n++;
                    break;
                case "en":
                    a <= this._obj.endless ? s.addClass("active") : n++;
                    break;
                case "ch":
                    a <= this._obj.chain ? s.addClass("active") : n++;
                    break;
                case "tb":
                    a <= this._obj.totalbox ? s.addClass("active") : n++;
                    break;
                case "enex":
                    a <= this._obj.endlessex ? s.addClass("active") : n++;
                    break;
                case "enul":
                    a <= this._obj.endlessul ? s.addClass("active") : n++;
                    break;
                case "all":
                    0 == n ? (s.addClass("active"), $("#top p#kaiden").show()) : n++
                }
            }
            switch (t) {
            case 0:
                var h = "勲章 (" + (i - n) + "/" + i + ")";
                $("#playerinfo .medal").text(h);
                break;
            case 1:
                h = "勲章Ex (" + (i - n) + "/" + i + ")";
                $("#playerinfo .medal_ex").text(h);
                break;
            case 2:
                h = "勲章Ult (" + (i - n) + "/" + i + ")";
                $("#playerinfo .medal_ul").text(h)
            }
            return 0 == n
        },
        t
    } (),
    d = function() {
        function t() {
            this.VOL_BGM = .7,
            this.VOL_SE_CT = 1.6,
            this.VOL_SE_CUTS = [.75, .5],
            this.CUT_TOTAL = 6
        }
        return t.prototype.playBGM = function() {
            u.gameData.sound && (this._bgm || (this._bgm = new i(n.get("data/bgm.mp3"), 260, 128)), this._bgm.play({
                volume: this.VOL_BGM,
                fadetime: 1.5,
                loop: !0
            }))
        },
        t.prototype.stopBGM = function() {
            u.gameData.sound && this._bgm.stop({
                fadetime: 1.5
            })
        },
        t.prototype.playSECut = function(t) {
            if (u.gameData.sound) {
                var e = this.VOL_SE_CUTS;
                t %= this.CUT_TOTAL;
                var i = n.get("cut" + t + ".mp3");
                i.stop(),
                i.play(0, !1, null, 0, e[t])
            }
        },
        t.prototype.playSECount = function(t) {
            u.gameData.sound && (0 < t ? n.get(t + ".mp3") : n.get("go.mp3")).play(0, !1, null, 0, this.VOL_SE_CT)
        },
        t
    } (),
    p = function(i) {
        function t() {
            var t = i.call(this, 1) || this;
            t.add(new r("data/tex.json", a.THREE));
            var e = "data/box_miku.pmd";
            return 0 <= navigator.userAgent.indexOf("Firefox") && (e = "data/miku_ff/box_miku.pmd"),
            t.add(new three.ThreePmdLoadCommand(e)),
            t.add(new three.ThreeVmdLoadCommand("data/motion.vmd", "motion")),
            t
        }
        return __extends(t, i),
        t
    } (e),
    f = function(e) {
        function t() {
            var t = e.call(this) || this;
            return t.add(new aidnlib.AudioLoadCommand("data/bgm.mp3"), 5),
            t.add(new r("data/sound.json"), 1),
            t
        }
        return __extends(t, e),
        t
    } (e),
    m = function(n) {
        function t() {
            var t = null !== n && n.apply(this, arguments) || this;
            return t._isSecondLoaded = !1,
            t._firstHowto = !0,
            t
        }
        return __extends(t, n),
        Object.defineProperty(t.prototype, "game", {
            get: function() {
                return this._game
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.initialize = function() {
            var e = this;
            o.rand = aidn.math.rand,
            o.randInt = aidn.math.randInt,
            o.toRad = aidn.math.toRad,
            o.toDeg = aidn.math.toDeg,
            u._isMV = 1 == aidn.util.getQuery().mv,
            u.main = this,
            u.isMobile = aidn.util.checkMobile(),
            u.isJa = aidn.util.checkJapanese(),
            u.isFull = aidn.util.enabledFullscreen(),
            u.isJa ? $(".en").css("display", "none") : $(".ja").css("display", "none"),
            u.isMobile ? $(".pc").css("display", "none") : $(".sp").css("display", "none");
            var i = location.href.split("#")[0].split("?")[0];
            $("#tw").on("click",
            function(t) {
                t.preventDefault();
                var e = document.title;
                aidn.social.shareTw(i, !0, e, "daniwell_aidn")
            }),
            $("#fb").on("click",
            function(t) {
                t.preventDefault(),
                aidn.social.shareFb(i, !0)
            }),
            u.gameData = new l,
            u.gameData.init(),
            n.prototype.initialize.call(this),
            (window.main = this)._scene = new w,
            this._scene.init(["loading", "top", "start", "credits", "playerinfo", "tutorial", "playing", "result"]),
            this.show(y.LOADING);
            var t = new p;
            t.addEventListener(h.PROGRESS,
            function(t) {
                return e._initProgress(t)
            }),
            t.addEventListener(h.COMPLETE,
            function(t) {
                return e._initComplete(t)
            }),
            t.execute()
        },
        t.prototype._initProgress = function(t) {
            t.progress
        },
        t.prototype._initComplete = function(t) {
            var e = this;
            this._countdown = new x,
            this._three = new o.ThreeManager,
            this._game = new g,
            this.show(y.TOP),
            $("#bt_start").on("click",
            function(t) {
                return e._clickStart(t)
            }),
            $("#bt_playerinfo").on("click",
            function(t) {
                return e._clickPlayerinfo(t)
            }),
            $("#bt_howto").on("click",
            function(t) {
                return e._clickHowto(t)
            }),
            $("#bt_credits").on("click",
            function(t) {
                return e._clickCredits(t)
            }),
            $("#bt_volume").on("click",
            function(t) {
                return e._clickVolume(t)
            }),
            $("#bt_fullscreen").on("click",
            function(t) {
                return e._clickFullscreen(t)
            }),
            $("#bt_back_game").on("click",
            function(t) {
                return e._clickBackGame(t)
            }),
            $("#bt_sina").on("click",
            function(t) {
                return e._clicksina(t)
            }),
            $("#bt_qq").on("click",
            function(t) {
                return e._clickqq(t)
            }),
            $("#bt_back_sta, #bt_back_pinfo, #bt_back_how, #bt_back_cre, #bt_back_result").on("click",
            function(t) {
                return e._clickBackTop(t)
            }),
            $("#bt_sec, #bt_life, #bt_life_ex, #bt_life_ul").on("click",
            function(t) {
                return e._clickGameStart(t)
            }),
            this._start()
        },
        t.prototype._secondLoad = function() {
            var e = this;
            if (u.gameData.sound) if (this._isSecondLoaded) this._secondComplete(null);
            else {
                $("#loading2").stop().fadeIn(200, "linear");
                var t = new f;
                t.addEventListener(h.PROGRESS,
                function(t) {
                    return e._secondProgress(t)
                }),
                t.addEventListener(h.COMPLETE,
                function(t) {
                    return e._secondComplete(t)
                }),
                t.execute()
            } else this._secondComplete(null)
        },
        t.prototype._secondProgress = function(t) {
            var e = 100 * t.progress + "%";
            $("#loading2 div").css({
                width: e
            })
        },
        t.prototype._secondComplete = function(t) {
            var e = this;
            u.sound || (u.sound = new d),
            u.gameData.sound && (this._isSecondLoaded = !0),
            this._countdown.start(function() {
                return e._gameStart()
            }),
            $("#loading2").stop().fadeOut(200, "linear"),
            $("#playing_info").stop().fadeIn(300, "linear")
        },
        t.prototype.show = function(t) {
            if (u.sceneId != t) switch (u.sceneId = t, u._isMV ? $("#loading").hide() : this._scene.show(t), this._three && this._three.show(t), t == y.TUTORIAL || t == y.PLAYER_INFO ? aidn.window.scrollOn() : aidn.window.scrollOff(), t) {
            case y.TOP:
                u._isMV || ($("#bt_volume").stop().fadeIn(400, "linear"), aidn.util.enabledFullscreen() && $("#bt_fullscreen").stop().fadeIn(400, "linear"), u.gameData.updatePlayerInfo());
                break;
            case y.START:
                u._isMV || ($("#bt_volume").stop().fadeIn(400, "linear"), aidn.util.enabledFullscreen() && $("#bt_fullscreen").stop().fadeIn(400, "linear"));
                break;
            case y.PLAYING:
                this._secondLoad(),
                $("#bt_volume").stop().fadeOut(200, "linear"),
                aidn.util.enabledFullscreen() && $("#bt_fullscreen").stop().fadeOut(200, "linear");
                break;
            case y.RESULT:
                break;
            case y.TUTORIAL:
                if (this._firstHowto) {
                    for (var e = 0; e < 3; e++) {
                        var i = new Image;
                        i.onload = function() {
                            var t = parseInt(this.src.split("howto_")[1]),
                            e = $("#scroll_area p.gif");
                            $(e[t - 1]).html(this)
                        },
                        i.src = "img/howto_" + (e + 1) + ".gif"
                    }
                    this._firstHowto = !1
                }
            }
        },
        t.prototype._clickVolume = function(t) {
            t.preventDefault(),
            u.gameData.sound = !u.gameData.sound
        },
        t.prototype._clickFullscreen = function(t) {
            t.preventDefault(),
            aidn.util.fullscreen()
        },
        t.prototype._clickStart = function(t) {
            t.preventDefault(),
            this.show(y.START)
        },
        t.prototype._clickPlayerinfo = function(t) {
            t.preventDefault(),
            this.show(y.PLAYER_INFO)
        },
        t.prototype._clickHowto = function(t) {
            t.preventDefault(),
            this.show(y.TUTORIAL)
        },
        t.prototype._clickCredits = function(t) {
            t.preventDefault(),
            this.show(y.CREDITS)
        },
        t.prototype._clickBackTop = function(t) {
            t.preventDefault(),
            this.show(y.TOP)
        },
        t.prototype._clickGameStart = function(t) {
            t.preventDefault();
            var e = t.currentTarget.id;
            this._game.init(e),
            this.show(y.PLAYING)
        },
        t.prototype._clicksina = function(t) {
            function sinaWeiBo (title, url, pic) {
                var param = {
                    url: url || window.location.href,
                    type: '3',
                    count: '1', /** 是否显示分享数，1显示(可选)*/
                    appkey: '', /** 您申请的应用appkey,显示分享来源(可选)*/
                    title: title, /** 分享的文字内容(可选，默认为所在页面的title)*/
                    pic: pic || '', /**分享图片的路径(可选)*/ 
                    ralateUid:'', /**关联用户的UID，分享微博会@该用户(可选)*/
                    rnd: new Date().valueOf()
                }
                var temp = [];
                for( var p in param ) {
                    temp.push(p + '=' +encodeURIComponent( param[p ] || '' ) )
                }
                var targetUrl = 'http://service.weibo.com/share/share.php?' + temp.join('&');
                window.open(targetUrl, 'sinaweibo', 'height=430, width=400');
            }
            t.preventDefault();
            var e = location.href.split("#")[0].split("?")[0],
            i = this.game.getMode() + "\n#" + document.title + "\n";
            sinaWeiBo(i,e,"https://cdn.jsdelivr.net/gh/hayfuon/hayimg/HayPic/20210623032220.png");
        },
        t.prototype._clickqq = function(t) {

            function shareQQ (url, title, pic) {
                var param = {
                    url: url || window.location.href,
                    sharesource: 'qzone',
                    desc: '', /*分享理由*/
                    title : title || '', /*分享标题(可选)*/
                    summary : '',/*分享描述(可选)*/
                    pics : pic || '',/*分享图片(可选)*/
                    flash : '', /*视频地址(可选)*/
                    site: '' /*分享来源 (可选) */
                };
                var s = [];
                for (var i in param) {
                    s.push(i + '=' + encodeURIComponent(param[i] || ''));
                }
                var targetUrl = "https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + s.join('&') ;
                window.open(targetUrl, 'qq', 'height=520, width=720');
            }
            t.preventDefault();
            var e = location.href.split("#")[0].split("?")[0],
            i = this.game.getMode() + "\n #" + document.title + "\n";
            shareQQ(e,i,"https://cdn.jsdelivr.net/gh/hayfuon/hayimg/HayPic/20210623032220.png");
        },
        t.prototype._clickBackGame = function(t) {
            t.preventDefault(),
            this.gameEnd(!0)
        },
        t.prototype._gameStart = function() {
            $("#bt_back_game").stop().fadeIn(400, "linear"),
            u.isPlaying = !0,
            this._three.gameStart(),
            this._game.gameStart()
        },
        t.prototype.gameEnd = function(t) {
            var e = this;
            void 0 === t && (t = !1),
            u.isPlaying && (u.isPlaying = !1, $("#bt_back_game").stop().fadeOut(200, "linear"), u.sound.stopBGM(), this._three.gameEnd(), this._game.gameEnd(t), setTimeout(function() {
                return e._gameEndComplete(t)
            },
            600))
        },
        t.prototype._gameEndComplete = function(t) {
            void 0 === t && (t = !1),
            $("#playing_info").stop().fadeOut(300, "linear"),
            t ? u.main.show(y.START) : u.main.show(y.RESULT)
        },
        t.prototype._start = function() {
            n.prototype._start.call(this)
        },
        t.prototype._update = function() {
            var t = this;
            n.prototype._update.call(this),
            window.requestAnimationFrame(function() {
                return t._update()
            })
        },
        t.prototype._resize = function() {
            n.prototype._resize.call(this)
        },
        t
    } (t); (c = _ = o.GameMode || (o.GameMode = {}))[c.TIME_ATTACK = 0] = "TIME_ATTACK",
    c[c.ENDLESS = 1] = "ENDLESS",
    c[c.ENDLESS_EX = 2] = "ENDLESS_EX",
    c[c.ENDLESS_UL = 3] = "ENDLESS_UL";
    var y, v, g = function() {
        function t() {
            this.TIME = 60,
            this.LIFE = 5,
            this._timeoutId = -1,
            this._emScore = $("#info_score .tex"),
            this._emTime = $("#info_time .tex"),
            this._emLife = $("#info_life .tex")
        }
        return Object.defineProperty(t.prototype, "time", {
            get: function() {
                return this._time
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.init = function(t) {
            var e = t.split("_");
            switch ("ul" == e[2] ? this.gameMode = _.ENDLESS_UL: "ex" == e[2] ? this.gameMode = _.ENDLESS_EX: "sec" == e[1] ? this.gameMode = _.TIME_ATTACK: this.gameMode = _.ENDLESS, this._score = this.__score = 0, this._chain = this._maxChain = this._totalBox = 0, this.gameMode) {
            case _.TIME_ATTACK:
                this._time = this.TIME,
                this._life = 0,
                $("#info_life").hide();
                break;
            case _.ENDLESS:
            case _.ENDLESS_EX:
            case _.ENDLESS_UL:
                this._time = 0,
                this._life = this.LIFE,
                $("#info_life").show()
            }
            this._updateScore(),
            this._updateTime(),
            this._updateLife()
        },
        t.prototype._updateScore = function() {
            this._emScore.text(b.getComma(Math.floor(this.__score)))
        },
        t.prototype._updateTime = function() {
            this._emTime.text(b.getTimeStr(this._time))
        },
        t.prototype._updateLife = function() {
            for (var t = "",
            e = this._life,
            i = 0; i < e; i++) t += "I";
            this._emLife.text(t)
        },
        t.prototype._updateResult = function() {
            $("#tx_score").text(b.getComma(Math.ceil(this.__score)))
        },
        t.prototype.gameStart = function() {
            var t = this;
            u.main.addUpdate(this,
            function() {
                return t._update()
            })
        },
        t.prototype.gameEnd = function(t) {
            var e = this;
            if (void 0 === t && (t = !1), u.main.removeUpdate(this), !t) {
                switch ($("#tx_score").text("0"), this.__score = 0, TweenMax.killTweensOf(this), TweenMax.to(this, 1.2, {
                    __score: this._score,
                    ease: Power0.easeNone,
                    delay: .8,
                    onUpdate: function() {
                        return e._updateResult()
                    }
                }), $("#result .new").hide(), this.gameMode) {
                case _.TIME_ATTACK:
                    $("#result h2").text("- 时间模式 -"),
                    u.gameData.scoreTimeAttack < this._score && (u.gameData.setTimeAttackScore(this._score), $("#result .new").show());
                    break;
                case _.ENDLESS:
                    $("#result h2").text("- 无尽模式 -"),
                    u.gameData.scoreEndless < this._score && (u.gameData.setEndlessScore(this._score), $("#result .new").show());
                    break;
                case _.ENDLESS_EX:
                    $("#result h2").text("- 无尽模式进阶版 -"),
                    u.gameData.scoreEndlessEx < this._score && (u.gameData.setEndlessExScore(this._score), $("#result .new").show());
                    break;
                case _.ENDLESS_UL:
                    $("#result h2").text("- 无尽模式魔鬼版 -"),
                    u.gameData.scoreEndlessUl < this._score && (u.gameData.setEndlessUlScore(this._score), $("#result .new").show())
                }
                u.gameData.setChain(this._maxChain),
                u.gameData.addTotalBox(this._totalBox)
            }
        },
        t.prototype.getMode = function() {
            var t = "";
            switch (this.gameMode) {
            case _.TIME_ATTACK:
                t += "时间模式";
                break;
            case _.ENDLESS:
                t += "无尽模式";
                break;
            case _.ENDLESS_EX:
                t += "无尽模式进阶版";
                break;
            case _.ENDLESS_UL:
                t += "无尽模式魔鬼版"
            }
            return t += " 得分:" + b.getComma(this._score)
        },
        t.prototype.cut = function(t) {
            var e = this;
            if (void 0 === t && (t = 0), 0 < t) {
                this._chain++;
                var i = Math.min(5, 1 + (this._chain - 1) / 15);
                i *= 1 + .1 * Math.floor(this._chain / 100);
                var n = .4 * (1 - Math.abs(t - .5) / .5) + .6;
                u.sound.playSECut(n < .9 ? 0 : 1),
                this._score += Math.ceil(100 * n * i),
                this._showChain(),
                TweenMax.killTweensOf(this),
                TweenMax.to(this, .5, {
                    __score: this._score,
                    ease: Power0.easeNone,
                    onUpdate: function() {
                        return e._updateScore()
                    }
                }),
                this._totalBox++,
                this._maxChain < this._chain && (this._maxChain = this._chain)
            } else this._chain = 0
        },
        t.prototype.damage = function() {
            this.gameMode != _.TIME_ATTACK && (this._life--, this._updateLife(), this._emLife.css("opacity", 0), this._emLife.stop().animate({
                opacity: 1
            },
            150, "linear"), this._life <= 0 && u.main.gameEnd())
        },
        t.prototype._showChain = function() {
            var t = this;
            if (2 <= this._chain) {
                var e = $("#chain");
                e.text(b.getComma(this._chain) + " 连斩"),
                e.stop().fadeOut(0).stop().fadeIn(150, "linear");
                var i = .2 * s.sth,
                n = .26 * s.sth,
                o = Back.easeOut.config(1.7);
                TweenMax.fromTo(e, .5, {
                    css: {
                        top: i
                    }
                },
                {
                    css: {
                        top: n
                    },
                    ease: o
                }),
                clearTimeout(this._timeoutId),
                this._timeoutId = setTimeout(function() {
                    return t._hideChain()
                },
                1e3)
            }
        },
        t.prototype._hideChain = function() {
            $("#chain").stop().fadeOut(150, "linear")
        },
        t.prototype._update = function() {
            switch (this.gameMode) {
            case _.TIME_ATTACK:
                this._time -= s.delta,
                this._time < 0 && (this._time = 0, u.main.gameEnd());
                break;
            case _.ENDLESS:
            case _.ENDLESS_EX:
            case _.ENDLESS_UL:
                this._time += s.delta
            }
            this._updateTime()
        },
        t
    } (),
    b = function() {
        function t() {}
        return t.getTimeStr = function(t) {
            var e = Math.floor(t);
            return Math.floor(e / 60) + ":" + this._digit(e % 60) + "." + this._digit(Math.floor(100 * t) % 100)
        },
        t.getComma = function(t) {
            return String(t).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
        },
        t._digit = function(t) {
            return t < 10 ? "0" + t: t.toString()
        },
        t
    } (),
    x = function() {
        function t() {
            this._emCount = $("#count"),
            this._emCircle = $("#circle svg circle"),
            this._emCount.fadeOut(0),
            $("#countdown").stop().fadeOut(0)
        }
        return t.prototype.start = function(t, e, i) {
            var n = this;
            void 0 === e && (e = 3),
            void 0 === i && (i = .3),
            u.main.removeUpdate(this),
            this._callback = t,
            this._time = e,
            this._ct = e,
            this._emCount.hide(),
            this._emCircle.hide(),
            setTimeout(function() {
                return n._start()
            },
            1e3 * i)
        },
        t.prototype._start = function() {
            var t = this;
            $("#countdown").stop().fadeIn(0),
            this.__show(),
            u.main.addUpdate(this,
            function() {
                return t._update()
            })
        },
        t.prototype._update = function() {
            this._time -= s.delta,
            Math.ceil(this._time) != this._ct && (this._ct = Math.ceil(this._time), 0 < this._ct ? this.__show() : 0 == this._ct && (u.sound.playSECount(this._ct), u.sound.playBGM(), this._emCount.text("GO"), this._emCircle.hide(), this.__animation(), this._callback(), $("#countdown").stop().delay(750).fadeOut(300, "linear")))
        },
        t.prototype.__show = function() {
            var t = this;
            u.sound.playSECount(this._ct),
            this._emCount.show(),
            this._emCount.text(this._ct),
            this._emCircle.show(),
            this._emCircle.removeClass("showCircle"),
            setTimeout(function() {
                return t._emCircle.addClass("showCircle")
            },
            1),
            this.__animation()
        },
        t.prototype.__animation = function() {
            TweenMax.fromTo($("#countdown"), .4, {
                css: {
                    scale: 1.5
                }
            },
            {
                css: {
                    scale: 1
                },
                ease: Back.easeOut.config(1.4)
            })
        },
        t
    } (); (v = y = o.SceneId || (o.SceneId = {}))[v.LOADING = 0] = "LOADING",
    v[v.TOP = 1] = "TOP",
    v[v.START = 2] = "START",
    v[v.CREDITS = 3] = "CREDITS",
    v[v.PLAYER_INFO = 4] = "PLAYER_INFO",
    v[v.TUTORIAL = 5] = "TUTORIAL",
    v[v.PLAYING = 6] = "PLAYING",
    v[v.RESULT = 7] = "RESULT";
    var w = function() {
        function t() {
            this._id = -1,
            this._scenes = []
        }
        return t.prototype.init = function(t, e, i) {
            void 0 === e && (e = null),
            void 0 === i && (i = 200);
            for (var n = t.length,
            o = 0; o < n; o++) {
                var s = t[o],
                r = o;
                e && (r = e[o]),
                this._scenes[r] = "string" == typeof s ? $("#" + s) : s
            }
            this._fadeTime = i
        },
        t.prototype._showElem = function(t, e) {
            void 0 === e && (e = 0),
            $(t).stop().delay(e).fadeIn(this._fadeTime, "linear")
        },
        t.prototype._hideElem = function(t) {
            $(t).stop().fadeOut(this._fadeTime, "linear")
        },
        t.prototype.show = function(t) {
            0 <= this._id && this._hideElem(this._scenes[this._id]),
            0 <= t && this._showElem(this._scenes[t], this._fadeTime),
            this._id = t
        },
        t
    } ();
    $(function() {
        return (new m).initialize()
    })
} (app || (app = {}));