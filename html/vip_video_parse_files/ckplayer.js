require = function e(t, n, r) {
    function i(o, a) {
        if (!n[o]) {
            if (!t[o]) {
                var u = "function" == typeof require && require;
                if (!a && u) return u(o, !0);
                if (s) return s(o, !0);
                var c = new Error("Cannot find module '" + o + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var h = n[o] = {exports: {}};
            t[o][0].call(h.exports, function (e) {
                return i(t[o][1][e] || e)
            }, h, h.exports, e, t, n, r)
        }
        return n[o].exports
    }

    for (var s = "function" == typeof require && require, o = 0; o < r.length; o++) i(r[o]);
    return i
}({
    1: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        const r = 1e3, i = 6e4;

        class s {
            constructor(e, t) {
                this.value = e, this.timeStamp = t
            }
        }

        n.BandwidthApproximator = class {
            constructor() {
                this.lastBytes = [], this.currentBytesSum = 0, this.lastBandwidth = []
            }

            addBytes(e, t) {
                for (this.lastBytes.push(new s(e, t)), this.currentBytesSum += e; t - this.lastBytes[0].timeStamp > r;) this.currentBytesSum -= this.lastBytes.shift().value;
                this.lastBandwidth.push(new s(this.currentBytesSum / r, t))
            }

            getBandwidth(e) {
                for (; 0 != this.lastBandwidth.length && e - this.lastBandwidth[0].timeStamp > i;) this.lastBandwidth.shift();
                let t = 0;
                for (const e of this.lastBandwidth) e.value > t && (t = e.value);
                return t
            }

            getSmoothInterval() {
                return r
            }

            getMeasureInterval() {
                return i
            }
        }
    }, {}],
    2: [function (e, t, n) {
        window.mpe || (window.mpe = {}), window.mpe.core = e("./index")
    }, {"./index": "p2p-media-loader-core"}],
    3: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        const r = e("debug"), i = e("./stringly-typed-event-emitter");
        n.HttpMediaManager = class extends i.STEEmitter {
            constructor(e) {
                super(), this.settings = e, this.xhrRequests = new Map, this.failedSegments = new Map, this.debug = r("p2pml:http-media-manager"), this.now = () => performance.now()
            }

            download(e, t) {
                if (this.isDownloading(e)) return;
                this.cleanTimedOutFailedSegments();
                const n = this.settings.segmentUrlBuilder ? this.settings.segmentUrlBuilder(e) : e.url;
                this.debug("http segment download", n), e.requestUrl = n;
                const r = new XMLHttpRequest;
                if (r.open("GET", n, !0), r.responseType = "arraybuffer", e.range) r.setRequestHeader("Range", e.range), t = void 0; else if (void 0 !== t && this.settings.httpUseRanges) {
                    let e = 0;
                    for (const n of t) e += n.byteLength;
                    r.setRequestHeader("Range", `bytes=${e}-`), this.debug("continue download from", e)
                } else t = void 0;
                this.setupXhrEvents(r, e, t), this.settings.xhrSetup && this.settings.xhrSetup(r, n), this.xhrRequests.set(e.id, {
                    xhr: r,
                    segment: e
                }), r.send()
            }

            abort(e) {
                const t = this.xhrRequests.get(e.id);
                t && (t.xhr.abort(), this.xhrRequests.delete(e.id), this.debug("http segment abort", e.id))
            }

            isDownloading(e) {
                return this.xhrRequests.has(e.id)
            }

            isFailed(e) {
                const t = this.failedSegments.get(e.id);
                return void 0 !== t && t > this.now()
            }

            getActiveDownloads() {
                return this.xhrRequests
            }

            getActiveDownloadsCount() {
                return this.xhrRequests.size
            }

            destroy() {
                this.xhrRequests.forEach(e => e.xhr.abort()), this.xhrRequests.clear()
            }

            setupXhrEvents(e, t, n) {
                let r = 0;
                e.addEventListener("progress", e => {
                    const t = e.loaded - r;
                    this.emit("bytes-downloaded", t), r = e.loaded
                }), e.addEventListener("load", async r => {
                    if (r.target.status < 200 || r.target.status >= 300) return void this.segmentFailure(t, r, e);
                    let i = r.target.response;
                    if (void 0 !== n && 206 === r.target.status) {
                        let e = 0;
                        for (const t of n) e += t.byteLength;
                        const t = new Uint8Array(e + i.byteLength);
                        let r = 0;
                        for (const e of n) t.set(new Uint8Array(e), r), r += e.byteLength;
                        t.set(new Uint8Array(i), r), i = t.buffer
                    }
                    await this.segmentDownloadFinished(t, i, e)
                }), e.addEventListener("error", n => {
                    this.segmentFailure(t, n, e)
                }), e.addEventListener("timeout", n => {
                    this.segmentFailure(t, n, e)
                })
            }

            async segmentDownloadFinished(e, t, n) {
                if (e.responseUrl = null === n.responseURL ? void 0 : n.responseURL, this.settings.segmentValidator) try {
                    await this.settings.segmentValidator(Object.assign(Object.assign({}, e), {data: t}), "http")
                } catch (t) {
                    return this.debug("segment validator failed", t), void this.segmentFailure(e, t, n)
                }
                this.xhrRequests.delete(e.id), this.emit("segment-loaded", e, t)
            }

            segmentFailure(e, t, n) {
                e.responseUrl = null === n.responseURL ? void 0 : n.responseURL, this.xhrRequests.delete(e.id), this.failedSegments.set(e.id, this.now() + this.settings.httpFailedSegmentTimeout), this.emit("segment-error", e, t)
            }

            cleanTimedOutFailedSegments() {
                const e = this.now(), t = [];
                this.failedSegments.forEach((n, r) => {
                    n < e && t.push(r)
                }), t.forEach(e => this.failedSegments.delete(e))
            }
        }
    }, {"./stringly-typed-event-emitter": 9, debug: "debug"}],
    4: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        const r = e("debug"), i = e("./loader-interface"), s = e("events"), o = e("./http-media-manager"),
            a = e("./p2p-media-manager"), u = e("./media-peer"), c = e("./bandwidth-approximator"),
            h = e("./segments-memory-storage"), l = e("get-browser-rtc"), d = {
                vip: !1,
                skip: !0,
                cachedSegmentExpiration: 3e5,
                cachedSegmentsCount: 30,
                useP2P: !0,
                consumeOnly: !1,
                requiredSegmentsPriority: 1,
                simultaneousHttpDownloads: 2,
                httpDownloadProbability: .1,
                httpDownloadProbabilityInterval: 1e3,
                httpDownloadProbabilitySkipIfNoPeers: !1,
                httpFailedSegmentTimeout: 1e4,
                httpDownloadMaxPriority: 20,
                httpDownloadInitialTimeout: 0,
                httpDownloadInitialTimeoutPerSegment: 4e3,
                httpUseRanges: !1,
                simultaneousP2PDownloads: 3,
                p2pDownloadMaxPriority: 20,
                p2pSegmentDownloadTimeout: 6e4,
                webRtcMaxMessageSize: 65535,
                trackerAnnounce: ["wss://tracker.novage.com.ua", "wss://tracker.openwebtorrent.com"],
                peerRequestsPerAnnounce: 10,
                rtcConfig: e("simple-peer").config
            };
        n.HybridLoader = class extends s.EventEmitter {
            constructor(e = {}) {
                super(), this.debug = r("p2pml:hybrid-loader"), this.debugSegments = r("p2pml:hybrid-loader-segments"), this.segmentsQueue = [], this.bandwidthApproximator = new c.BandwidthApproximator, this.httpDownloadInitialTimeoutTimestamp = -1 / 0, this.speedStats = [], this.processInitialSegmentTimeout = async () => {
                    if (void 0 !== this.httpRandomDownloadInterval) {
                        if (void 0 !== this.masterSwarmId) {
                            const e = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
                            this.processSegmentsQueue(e) && !this.settings.consumeOnly && this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(e))
                        }
                        this.httpDownloadInitialTimeoutTimestamp !== -1 / 0 && setTimeout(this.processInitialSegmentTimeout, this.settings.httpDownloadInitialTimeoutPerSegment)
                    }
                }, this.downloadRandomSegmentOverHttp = async () => {
                    if (void 0 === this.masterSwarmId || void 0 === this.httpRandomDownloadInterval || this.httpDownloadInitialTimeoutTimestamp !== -1 / 0 || this.httpManager.getActiveDownloadsCount() >= this.settings.simultaneousHttpDownloads || this.settings.httpDownloadProbabilitySkipIfNoPeers && 0 === this.p2pManager.getPeers().size || this.settings.consumeOnly) return;
                    const e = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId),
                        t = this.p2pManager.getOvrallSegmentsMap(),
                        n = this.segmentsQueue.filter(n => !this.p2pManager.isDownloading(n) && !this.httpManager.isDownloading(n) && !t.has(n.id) && !this.httpManager.isFailed(n) && n.priority <= this.settings.httpDownloadMaxPriority && !e.has(n.id));
                    if (0 == n.length) return;
                    if (Math.random() > this.settings.httpDownloadProbability * n.length) return;
                    const r = n[Math.floor(Math.random() * n.length)];
                    this.debugSegments("HTTP download (random)", r.priority, r.url), this.httpManager.download(r), this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(e))
                }, this.onPieceBytesDownloaded = (e, t, n) => {
                    if ("http" === e) {
                        const e = t / 1048576;
                        this.speedStats.push({size: e, timestamp: this.now()}), this._adjustTaskNum()
                    }
                    this.bandwidthApproximator.addBytes(t, this.now()), this.emit(i.Events.PieceBytesDownloaded, e, t, n)
                }, this.onPieceBytesUploaded = (e, t, n) => {
                    this.emit(i.Events.PieceBytesUploaded, e, t, n)
                }, this.onSegmentLoaded = async (e, t, n) => {
                    if (this.debugSegments("segment loaded", e.id, e.url), void 0 === this.masterSwarmId) return;
                    let r;
                    e.data = t, e.downloadBandwidth = this.bandwidthApproximator.getBandwidth(this.now()), await this.segmentsStorage.storeSegment(e), this.emit(i.Events.SegmentLoaded, e, n), r = void 0 === r ? await this.segmentsStorage.getSegmentsMap(this.masterSwarmId) : r, this.processSegmentsQueue(r), this.settings.consumeOnly || this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(r))
                }, this.onSegmentError = async (e, t, n) => {
                    if (this.debugSegments("segment error", e.id, e.url, n, t), this.emit(i.Events.SegmentError, e, t, n), void 0 !== this.masterSwarmId) {
                        const e = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
                        this.processSegmentsQueue(e) && !this.settings.consumeOnly && this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(e))
                    }
                }, this.onPeerConnect = async e => {
                    this.emit(i.Events.PeerConnect, e), this.settings.consumeOnly || void 0 === this.masterSwarmId || this.p2pManager.sendSegmentsMap(e.id, this.createSegmentsMap(await this.segmentsStorage.getSegmentsMap(this.masterSwarmId)))
                }, this.onPeerClose = e => {
                    this.emit(i.Events.PeerClose, e)
                }, this.onTrackerUpdate = async e => {
                    if (this.httpDownloadInitialTimeoutTimestamp !== -1 / 0 && void 0 !== e.incomplete && e.incomplete <= 1 && (this.debugSegments("cancel initial HTTP download timeout - no peers"), this.httpDownloadInitialTimeoutTimestamp = -1 / 0, void 0 !== this.masterSwarmId)) {
                        const e = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
                        this.processSegmentsQueue(e) && !this.settings.consumeOnly && this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(e))
                    }
                }, this.settings = Object.assign(Object.assign({}, d), e), e.bufferedSegmentsCount && (void 0 === e.p2pDownloadMaxPriority && (this.settings.p2pDownloadMaxPriority = e.bufferedSegmentsCount), void 0 === e.httpDownloadMaxPriority && (this.settings.p2pDownloadMaxPriority = e.bufferedSegmentsCount), delete this.settings.bufferedSegmentsCount), this.segmentsStorage = void 0 === this.settings.segmentsStorage ? new h.SegmentsMemoryStorage(this.settings) : this.settings.segmentsStorage, this.debug("loader settings", this.settings), this.httpManager = this.createHttpManager(), this.httpManager.on("segment-loaded", this.onSegmentLoaded), this.httpManager.on("segment-error", this.onSegmentError), this.httpManager.on("bytes-downloaded", e => this.onPieceBytesDownloaded("http", e)), this.p2pManager = this.createP2PManager(), this.p2pManager.on("segment-loaded", this.onSegmentLoaded), this.p2pManager.on("segment-error", this.onSegmentError), this.p2pManager.on("peer-data-updated", async () => {
                    if (void 0 === this.masterSwarmId) return;
                    const e = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
                    this.processSegmentsQueue(e) && !this.settings.consumeOnly && this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(e))
                }), this.p2pManager.on("bytes-downloaded", (e, t) => this.onPieceBytesDownloaded("p2p", e, t)), this.p2pManager.on("bytes-uploaded", (e, t) => this.onPieceBytesUploaded("p2p", e, t)), this.p2pManager.on("peer-connected", this.onPeerConnect), this.p2pManager.on("peer-closed", this.onPeerClose), this.p2pManager.on("tracker-update", this.onTrackerUpdate)
            }

            static isSupported() {
                const e = l();
                return e && void 0 !== e.RTCPeerConnection.prototype.createDataChannel
            }

            createHttpManager() {
                return new o.HttpMediaManager(this.settings)
            }

            createP2PManager() {
                return new a.P2PMediaManager(this.segmentsStorage, this.settings)
            }

            async load(e, t) {
                void 0 === this.httpRandomDownloadInterval && (this.httpRandomDownloadInterval = setInterval(this.downloadRandomSegmentOverHttp, this.settings.httpDownloadProbabilityInterval), this.settings.httpDownloadInitialTimeout > 0 && this.settings.httpDownloadInitialTimeoutPerSegment > 0 && (this.debugSegments("enable initial HTTP download timeout", this.settings.httpDownloadInitialTimeout, "per segment", this.settings.httpDownloadInitialTimeoutPerSegment), this.httpDownloadInitialTimeoutTimestamp = this.now(), setTimeout(this.processInitialSegmentTimeout, this.settings.httpDownloadInitialTimeoutPerSegment + 100))), e.length > 0 && (this.masterSwarmId = e[0].masterSwarmId), void 0 !== this.masterSwarmId && this.p2pManager.setStreamSwarmId(t, this.masterSwarmId), this.debug("load segments");
                let n = !1;
                for (const t of this.segmentsQueue) e.find(e => e.url == t.url) || (this.debug("remove segment", t.url), this.httpManager.isDownloading(t) ? (n = !0, this.httpManager.abort(t)) : this.p2pManager.abort(t), this.emit(i.Events.SegmentAbort, t));
                if (this.debug.enabled) for (const t of e) this.segmentsQueue.find(e => e.url == t.url) || this.debug("add segment", t.url);
                if (this.segmentsQueue = e, void 0 === this.masterSwarmId) return;
                let r = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId);
                n = this.processSegmentsQueue(r) || n, await this.cleanSegmentsStorage() && (r = await this.segmentsStorage.getSegmentsMap(this.masterSwarmId), n = !0), n && !this.settings.consumeOnly && this.p2pManager.sendSegmentsMapToAll(this.createSegmentsMap(r))
            }

            async getSegment(e) {
                return void 0 === this.masterSwarmId ? void 0 : this.segmentsStorage.getSegment(e, this.masterSwarmId)
            }

            getSettings() {
                return this.settings
            }

            getDetails() {
                return {peerId: this.p2pManager.getPeerId()}
            }

            async destroy() {
                void 0 !== this.httpRandomDownloadInterval && (clearInterval(this.httpRandomDownloadInterval), this.httpRandomDownloadInterval = void 0), this.httpDownloadInitialTimeoutTimestamp = -1 / 0, this.segmentsQueue = [], this.httpManager.destroy(), this.p2pManager.destroy(), this.masterSwarmId = void 0, await this.segmentsStorage.destroy()
            }

            processSegmentsQueue(e) {
                if (this.debugSegments("process segments queue. priority", this.segmentsQueue.length > 0 ? this.segmentsQueue[0].priority : 0), void 0 === this.masterSwarmId || 0 === this.segmentsQueue.length) return !1;
                let t, n = !1, r = !0;
                if (this.httpDownloadInitialTimeoutTimestamp !== -1 / 0) {
                    let t;
                    for (const n of this.segmentsQueue) if (!e.has(n.id)) {
                        t = n.priority;
                        break
                    }
                    const n = this.now() - this.httpDownloadInitialTimeoutTimestamp;
                    (r = n >= this.settings.httpDownloadInitialTimeout || void 0 !== t && n > this.settings.httpDownloadInitialTimeoutPerSegment && t <= 0) && (this.debugSegments("cancel initial HTTP download timeout - timed out"), this.httpDownloadInitialTimeoutTimestamp = -1 / 0)
                }
                for (let i = 0; i < this.segmentsQueue.length; i++) {
                    let s = this.segmentsQueue[i];
                    if (!e.has(s.id) && !this.httpManager.isDownloading(s)) {
                        if (s.priority <= this.settings.requiredSegmentsPriority && r && !this.httpManager.isFailed(s)) {
                            if (this.httpManager.getActiveDownloadsCount() >= this.settings.simultaneousHttpDownloads) for (let e = this.segmentsQueue.length - 1; e > i; e--) {
                                const t = this.segmentsQueue[e];
                                if (this.httpManager.isDownloading(t)) {
                                    this.debugSegments("cancel HTTP download", t.priority, t.url), this.httpManager.abort(t);
                                    break
                                }
                            }
                            if (this.httpManager.getActiveDownloadsCount() < this.settings.simultaneousHttpDownloads) {
                                const e = this.p2pManager.abort(s);
                                this.httpManager.download(s, e), this.debugSegments("HTTP download (priority)", s.priority, s.url), n = !0;
                                continue
                            }
                        }
                        if (!this.p2pManager.isDownloading(s)) if (s.priority <= this.settings.requiredSegmentsPriority) {
                            if ((t = t || this.p2pManager.getOvrallSegmentsMap()).get(s.id) !== u.MediaPeerSegmentStatus.Loaded) continue;
                            if (this.p2pManager.getActiveDownloadsCount() >= this.settings.simultaneousP2PDownloads) for (let e = this.segmentsQueue.length - 1; e > i; e--) {
                                const t = this.segmentsQueue[e];
                                if (this.p2pManager.isDownloading(t)) {
                                    this.debugSegments("cancel P2P download", t.priority, t.url), this.p2pManager.abort(t);
                                    break
                                }
                            }
                            if (this.p2pManager.getActiveDownloadsCount() < this.settings.simultaneousP2PDownloads && this.p2pManager.download(s)) {
                                this.debugSegments("P2P download (priority)", s.priority, s.url);
                                continue
                            }
                        } else this.p2pManager.getActiveDownloadsCount() < this.settings.simultaneousP2PDownloads && s.priority <= this.settings.p2pDownloadMaxPriority && this.p2pManager.download(s) && this.debugSegments("P2P download", s.priority, s.url)
                    }
                }
                return n
            }

            _speed() {
                let e = 0, t = this.now() - 1e4, n = this.speedStats.length;
                for (; n--;) {
                    let r = this.speedStats[n];
                    if (r.timestamp < t) break;
                    e += r.size
                }
                return this.speedStats.splice(0, n + 1), e / 10
            }

            _adjustTaskNum() {
                if (!this.settings.vip) return;
                const e = this.settings.simultaneousHttpDownloads;
                this._speed() < 1 && e < 5 ? (this.settings.simultaneousHttpDownloads += 1, this.settings.requiredSegmentsPriority = 5e3) : this._speed() > 3 && (e > 1 && (this.settings.simultaneousHttpDownloads -= 1), this.settings.requiredSegmentsPriority = 5e3)
            }

            getStreamSwarmId(e) {
                return void 0 === e.streamId ? e.masterSwarmId : `${e.masterSwarmId}+${e.streamId}`
            }

            createSegmentsMap(e) {
                const t = {}, n = (e, n) => {
                    const r = this.getStreamSwarmId(e), i = e.sequence;
                    let s = t[r];
                    void 0 === s && (s = ["", []], t[r] = s);
                    const o = s[1];
                    s[0] += 0 == o.length ? i : `|${i}`, o.push(n)
                };
                for (const t of e.values()) n(t.segment, u.MediaPeerSegmentStatus.Loaded);
                for (const e of this.httpManager.getActiveDownloads().values()) n(e.segment, u.MediaPeerSegmentStatus.LoadingByHttp);
                return t
            }

            async cleanSegmentsStorage() {
                return void 0 !== this.masterSwarmId && this.segmentsStorage.clean(this.masterSwarmId, e => void 0 !== this.segmentsQueue.find(t => t.id === e))
            }

            now() {
                return performance.now()
            }
        }
    }, {
        "./bandwidth-approximator": 1,
        "./http-media-manager": 3,
        "./loader-interface": 5,
        "./media-peer": 6,
        "./p2p-media-manager": 7,
        "./segments-memory-storage": 8,
        debug: "debug",
        events: "events",
        "get-browser-rtc": 18,
        "simple-peer": 44
    }],
    5: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0}), function (e) {
            e.SegmentLoaded = "segment_loaded", e.SegmentError = "segment_error", e.SegmentAbort = "segment_abort", e.PeerConnect = "peer_connect", e.PeerClose = "peer_close", e.PieceBytesDownloaded = "piece_bytes_downloaded", e.PieceBytesUploaded = "piece_bytes_uploaded"
        }(n.Events || (n.Events = {}))
    }, {}],
    6: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        const r = e("debug"), i = e("./stringly-typed-event-emitter"), s = e("buffer");
        var o, a;
        !function (e) {
            e[e.SegmentData = 0] = "SegmentData", e[e.SegmentAbsent = 1] = "SegmentAbsent", e[e.SegmentsMap = 2] = "SegmentsMap", e[e.SegmentRequest = 3] = "SegmentRequest", e[e.CancelSegmentRequest = 4] = "CancelSegmentRequest"
        }(o || (o = {})), function (e) {
            e[e.Loaded = 0] = "Loaded", e[e.LoadingByHttp = 1] = "LoadingByHttp"
        }(a = n.MediaPeerSegmentStatus || (n.MediaPeerSegmentStatus = {}));

        class u {
            constructor(e, t) {
                this.id = e, this.size = t, this.bytesDownloaded = 0, this.pieces = []
            }
        }

        n.MediaPeer = class extends i.STEEmitter {
            constructor(e, t) {
                super(), this.peer = e, this.settings = t, this.remoteAddress = "", this.downloadingSegmentId = null, this.downloadingSegment = null, this.segmentsMap = new Map, this.debug = r("p2pml:media-peer"), this.timer = null, this.onPeerConnect = () => {
                    this.debug("peer connect", this.id, this), this.remoteAddress = this.peer.remoteAddress, this.emit("connect", this)
                }, this.onPeerClose = () => {
                    this.debug("peer close", this.id, this), this.terminateSegmentRequest(), this.emit("close", this)
                }, this.onPeerError = e => {
                    this.debug("peer error", this.id, e, this)
                }, this.onPeerData = e => {
                    const t = this.getJsonCommand(e);
                    if (null != t) {
                        if (this.downloadingSegment) {
                            this.debug("peer segment download is interrupted by a command", this.id, this);
                            const e = this.downloadingSegment.id;
                            return this.terminateSegmentRequest(), void this.emit("segment-error", this, e, "Segment download is interrupted by a command")
                        }
                        switch (this.debug("peer receive command", this.id, t, this), t.c) {
                            case o.SegmentsMap:
                                this.segmentsMap = this.createSegmentsMap(t.m), this.emit("data-updated");
                                break;
                            case o.SegmentRequest:
                                this.emit("segment-request", this, t.i);
                                break;
                            case o.SegmentData:
                                this.downloadingSegmentId === t.i && (this.downloadingSegment = new u(t.i, t.s), this.cancelResponseTimeoutTimer());
                                break;
                            case o.SegmentAbsent:
                                this.downloadingSegmentId === t.i && (this.terminateSegmentRequest(), this.segmentsMap.delete(t.i), this.emit("segment-absent", this, t.i));
                                break;
                            case o.CancelSegmentRequest:
                        }
                    } else this.receiveSegmentPiece(e)
                }, this.peer.on("connect", this.onPeerConnect), this.peer.on("close", this.onPeerClose), this.peer.on("error", this.onPeerError), this.peer.on("data", this.onPeerData), this.id = e.id
            }

            receiveSegmentPiece(e) {
                if (!this.downloadingSegment) return void this.debug("peer segment not requested", this.id, this);
                this.downloadingSegment.bytesDownloaded += e.byteLength, this.downloadingSegment.pieces.push(e), this.emit("bytes-downloaded", this, e.byteLength);
                const t = this.downloadingSegment.id;
                if (this.downloadingSegment.bytesDownloaded == this.downloadingSegment.size) {
                    const e = new Uint8Array(this.downloadingSegment.size);
                    let n = 0;
                    for (const t of this.downloadingSegment.pieces) e.set(new Uint8Array(t), n), n += t.byteLength;
                    this.debug("peer segment download done", this.id, t, this), this.terminateSegmentRequest(), this.emit("segment-loaded", this, t, e.buffer)
                } else this.downloadingSegment.bytesDownloaded > this.downloadingSegment.size && (this.debug("peer segment download bytes mismatch", this.id, t, this), this.terminateSegmentRequest(), this.emit("segment-error", this, t, "Too many bytes received for segment"))
            }

            getJsonCommand(e) {
                const t = new Uint8Array(e);
                if (123 == t[0] && 34 == t[1] && 125 == t[e.byteLength - 1]) try {
                    return JSON.parse((new TextDecoder).decode(e))
                } catch (e) {
                }
                return null
            }

            createSegmentsMap(e) {
                if (null == e || !(e instanceof Object)) return new Map;
                const t = new Map;
                for (const n of Object.keys(e)) {
                    const r = e[n];
                    if (!(r instanceof Array && 2 === r.length && "string" == typeof r[0] && r[1] instanceof Array)) return new Map;
                    const i = r[0].split("|"), s = r[1];
                    if (i.length !== s.length) return new Map;
                    for (let e = 0; e < i.length; e++) {
                        const r = s[e];
                        if ("number" != typeof r || void 0 === a[r]) return new Map;
                        t.set(`${n}+${i[e]}`, r)
                    }
                }
                return t
            }

            sendCommand(e) {
                this.debug("peer send command", this.id, e, this), this.peer.write(JSON.stringify(e))
            }

            destroy() {
                this.debug("peer destroy", this.id, this), this.terminateSegmentRequest(), this.peer.destroy()
            }

            getDownloadingSegmentId() {
                return this.downloadingSegmentId
            }

            getSegmentsMap() {
                return this.segmentsMap
            }

            sendSegmentsMap(e) {
                this.sendCommand({c: o.SegmentsMap, m: e})
            }

            sendSegmentData(e, t) {
                this.sendCommand({c: o.SegmentData, i: e, s: t.byteLength});
                let n = t.byteLength;
                for (; n > 0;) {
                    const e = n >= this.settings.webRtcMaxMessageSize ? this.settings.webRtcMaxMessageSize : n,
                        r = s.Buffer.from(t, t.byteLength - n, e);
                    this.peer.write(r), n -= e
                }
                this.emit("bytes-uploaded", this, t.byteLength)
            }

            sendSegmentAbsent(e) {
                this.sendCommand({c: o.SegmentAbsent, i: e})
            }

            requestSegment(e) {
                if (this.downloadingSegmentId) throw new Error("A segment is already downloading: " + this.downloadingSegmentId);
                this.sendCommand({
                    c: o.SegmentRequest,
                    i: e
                }), this.downloadingSegmentId = e, this.runResponseTimeoutTimer()
            }

            cancelSegmentRequest() {
                let e;
                if (this.downloadingSegmentId) {
                    const t = this.downloadingSegmentId;
                    e = this.downloadingSegment ? this.downloadingSegment.pieces : void 0, this.terminateSegmentRequest(), this.sendCommand({
                        c: o.CancelSegmentRequest,
                        i: t
                    })
                }
                return e
            }

            runResponseTimeoutTimer() {
                this.timer = setTimeout(() => {
                    if (this.timer = null, !this.downloadingSegmentId) return;
                    const e = this.downloadingSegmentId;
                    this.cancelSegmentRequest(), this.emit("segment-timeout", this, e)
                }, this.settings.p2pSegmentDownloadTimeout)
            }

            cancelResponseTimeoutTimer() {
                this.timer && (clearTimeout(this.timer), this.timer = null)
            }

            terminateSegmentRequest() {
                this.downloadingSegmentId = null, this.downloadingSegment = null, this.cancelResponseTimeoutTimer()
            }
        }
    }, {"./stringly-typed-event-emitter": 9, buffer: 16, debug: "debug"}],
    7: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        const r = e("debug"), i = e("bittorrent-tracker/client"), s = e("./stringly-typed-event-emitter"),
            o = e("./media-peer"), a = e("buffer"), u = e("sha.js/sha1"), c = e("./index"), h = 2,
            l = `-WW${c.version.replace(/\d*./g, e => `0${parseInt(e, 10) % 100}`.slice(-2)).slice(0, 4)}-`;

        class d {
            constructor(e, t) {
                this.peerId = e, this.segment = t
            }
        }

        n.P2PMediaManager = class extends s.STEEmitter {
            constructor(e, t) {
                super(), this.sementsStorage = e, this.settings = t, this.trackerClient = null, this.peers = new Map, this.peerCandidates = new Map, this.peerSegmentRequests = new Map, this.streamSwarmId = null, this.debug = r("p2pml:p2p-media-manager"), this.pendingTrackerClient = null, this.onTrackerError = e => {
                    this.debug("tracker error", e)
                }, this.onTrackerWarning = e => {
                    this.debug("tracker warning", e)
                }, this.onTrackerUpdate = e => {
                    this.debug("tracker update", e), this.emit("tracker-update", e)
                }, this.onTrackerPeer = e => {
                    if (this.debug("tracker peer", e.id, e), this.peers.has(e.id)) return this.debug("tracker peer already connected", e.id, e), void e.destroy();
                    const t = new o.MediaPeer(e, this.settings);
                    t.on("connect", this.onPeerConnect), t.on("close", this.onPeerClose), t.on("data-updated", this.onPeerDataUpdated), t.on("segment-request", this.onSegmentRequest), t.on("segment-loaded", this.onSegmentLoaded), t.on("segment-absent", this.onSegmentAbsent), t.on("segment-error", this.onSegmentError), t.on("segment-timeout", this.onSegmentTimeout), t.on("bytes-downloaded", this.onPieceBytesDownloaded), t.on("bytes-uploaded", this.onPieceBytesUploaded);
                    let n = this.peerCandidates.get(t.id);
                    n || (n = [], this.peerCandidates.set(t.id, n)), n.push(t)
                }, this.onPieceBytesDownloaded = (e, t) => {
                    this.emit("bytes-downloaded", t, e.id)
                }, this.onPieceBytesUploaded = (e, t) => {
                    this.emit("bytes-uploaded", t, e.id)
                }, this.onPeerConnect = e => {
                    if (this.peers.get(e.id)) return this.debug("tracker peer already connected (in peer connect)", e.id, e), void e.destroy();
                    this.peers.set(e.id, e);
                    const t = this.peerCandidates.get(e.id);
                    if (t) {
                        for (const n of t) n != e && n.destroy();
                        this.peerCandidates.delete(e.id)
                    }
                    this.emit("peer-connected", {id: e.id, remoteAddress: e.remoteAddress})
                }, this.onPeerClose = e => {
                    if (this.peers.get(e.id) != e) {
                        const t = this.peerCandidates.get(e.id);
                        if (!t) return;
                        const n = t.indexOf(e);
                        return -1 != n && t.splice(n, 1), void (0 == t.length && this.peerCandidates.delete(e.id))
                    }
                    for (const [t, n] of this.peerSegmentRequests) n.peerId == e.id && this.peerSegmentRequests.delete(t);
                    this.peers.delete(e.id), this.emit("peer-data-updated"), this.emit("peer-closed", e.id)
                }, this.onPeerDataUpdated = () => {
                    this.emit("peer-data-updated")
                }, this.onSegmentRequest = async (e, t) => {
                    if (void 0 === this.masterSwarmId) return;
                    const n = await this.sementsStorage.getSegment(t, this.masterSwarmId);
                    n ? e.sendSegmentData(t, n.data) : e.sendSegmentAbsent(t)
                }, this.onSegmentLoaded = async (e, t, n) => {
                    const r = this.peerSegmentRequests.get(t);
                    if (!r) return;
                    const i = r.segment;
                    if (this.settings.segmentValidator) try {
                        await this.settings.segmentValidator(Object.assign(Object.assign({}, i), {data: n}), "p2p", e.id)
                    } catch (n) {
                        return this.debug("segment validator failed", n), this.peerSegmentRequests.delete(t), this.emit("segment-error", i, n, e.id), void this.onPeerClose(e)
                    }
                    this.peerSegmentRequests.delete(t), this.emit("segment-loaded", i, n, e.id)
                }, this.onSegmentAbsent = (e, t) => {
                    this.peerSegmentRequests.delete(t), this.emit("peer-data-updated")
                }, this.onSegmentError = (e, t, n) => {
                    const r = this.peerSegmentRequests.get(t);
                    r && (this.peerSegmentRequests.delete(t), this.emit("segment-error", r.segment, n, e.id))
                }, this.onSegmentTimeout = (e, t) => {
                    const n = this.peerSegmentRequests.get(t);
                    n && (this.peerSegmentRequests.delete(t), e.destroy(), this.peers.delete(n.peerId) && this.emit("peer-data-updated"))
                }, this.peerId = t.useP2P ? function () {
                    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    let t = l;
                    for (let n = 0; n < 20 - l.length; n++) t += e.charAt(Math.floor(Math.random() * e.length));
                    return (new TextEncoder).encode(t).buffer
                }() : new ArrayBuffer(0), this.debug.enabled && this.debug("peer ID", this.getPeerId(), (new TextDecoder).decode(this.peerId))
            }

            getPeers() {
                return this.peers
            }

            getPeerId() {
                return a.Buffer.from(this.peerId).toString("hex")
            }

            async setStreamSwarmId(e, t) {
                if (this.streamSwarmId === e) return;
                this.destroy(!0), this.streamSwarmId = e, this.masterSwarmId = t, this.debug("stream swarm ID", this.streamSwarmId), this.pendingTrackerClient = {isDestroyed: !1};
                const n = this.pendingTrackerClient, r = (new u).update(h + this.streamSwarmId).digest();
                n.isDestroyed ? null != this.trackerClient && (this.trackerClient.destroy(), this.trackerClient = null) : (this.pendingTrackerClient = null, this.createClient(r))
            }

            createClient(e) {
                if (!this.settings.useP2P) return;
                const t = {
                    infoHash: a.Buffer.from(e, 0, 20),
                    peerId: a.Buffer.from(this.peerId, 0, 20),
                    announce: this.settings.trackerAnnounce,
                    rtcConfig: this.settings.rtcConfig,
                    port: 6881,
                    getAnnounceOpts: () => ({numwant: this.settings.peerRequestsPerAnnounce})
                };
                let n = this.trackerClient;
                this.trackerClient = new i(t), this.trackerClient.on("error", this.onTrackerError), this.trackerClient.on("warning", this.onTrackerWarning), this.trackerClient.on("update", this.onTrackerUpdate), this.trackerClient.on("peer", this.onTrackerPeer), this.trackerClient.start(), null != n && (n.destroy(), n = null)
            }

            download(e) {
                if (this.isDownloading(e)) return !1;
                const t = [];
                for (const n of this.peers.values()) null == n.getDownloadingSegmentId() && n.getSegmentsMap().get(e.id) === o.MediaPeerSegmentStatus.Loaded && t.push(n);
                if (0 === t.length) return !1;
                const n = t[Math.floor(Math.random() * t.length)];
                return n.requestSegment(e.id), this.peerSegmentRequests.set(e.id, new d(n.id, e)), !0
            }

            abort(e) {
                let t;
                const n = this.peerSegmentRequests.get(e.id);
                if (n) {
                    const r = this.peers.get(n.peerId);
                    r && (t = r.cancelSegmentRequest()), this.peerSegmentRequests.delete(e.id)
                }
                return t
            }

            isDownloading(e) {
                return this.peerSegmentRequests.has(e.id)
            }

            getActiveDownloadsCount() {
                return this.peerSegmentRequests.size
            }

            destroy(e = !1) {
                this.streamSwarmId = null, this.trackerClient && (this.trackerClient.stop(), e ? (this.trackerClient.removeAllListeners("error"), this.trackerClient.removeAllListeners("warning"), this.trackerClient.removeAllListeners("update"), this.trackerClient.removeAllListeners("peer")) : (this.trackerClient.destroy(), this.trackerClient = null)), this.pendingTrackerClient && (this.pendingTrackerClient.isDestroyed = !0, this.pendingTrackerClient = null), this.peers.forEach(e => e.destroy()), this.peers.clear(), this.peerSegmentRequests.clear();
                for (const e of this.peerCandidates.values()) for (const t of e) t.destroy();
                this.peerCandidates.clear()
            }

            sendSegmentsMapToAll(e) {
                this.peers.forEach(t => t.sendSegmentsMap(e))
            }

            sendSegmentsMap(e, t) {
                const n = this.peers.get(e);
                n && n.sendSegmentsMap(t)
            }

            getOvrallSegmentsMap() {
                const e = new Map;
                for (const t of this.peers.values()) for (const [n, r] of t.getSegmentsMap()) r === o.MediaPeerSegmentStatus.Loaded ? e.set(n, o.MediaPeerSegmentStatus.Loaded) : e.get(n) || e.set(n, o.MediaPeerSegmentStatus.LoadingByHttp);
                return e
            }
        }
    }, {
        "./index": "p2p-media-loader-core",
        "./media-peer": 6,
        "./stringly-typed-event-emitter": 9,
        "bittorrent-tracker/client": 11,
        buffer: 16,
        debug: "debug",
        "sha.js/sha1": 43
    }],
    8: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        n.SegmentsMemoryStorage = class {
            constructor(e) {
                this.settings = e, this.cache = new Map
            }

            async storeSegment(e) {
                this.cache.set(e.id, {segment: e, lastAccessed: performance.now()})
            }

            async getSegmentsMap(e) {
                return this.cache
            }

            async getSegment(e, t) {
                const n = this.cache.get(e);
                if (void 0 !== n) return n.lastAccessed = performance.now(), n.segment
            }

            async hasSegment(e, t) {
                return this.cache.has(e)
            }

            async clean(e, t) {
                const n = [], r = [], i = performance.now();
                for (const e of this.cache.values()) i - e.lastAccessed > this.settings.cachedSegmentExpiration ? n.push(e.segment.id) : r.push(e);
                let s = r.length - this.settings.cachedSegmentsCount;
                if (s > 0) {
                    r.sort((e, t) => e.lastAccessed - t.lastAccessed);
                    for (const e of r) if ((void 0 === t || !t(e.segment.id)) && (n.push(e.segment.id), 0 == --s)) break
                }
                return n.forEach(e => this.cache.delete(e)), n.length > 0
            }

            async destroy() {
                this.cache.clear()
            }
        }
    }, {}],
    9: [function (e, t, n) {
        "use strict";
        Object.defineProperty(n, "__esModule", {value: !0});
        const r = e("events");
        n.STEEmitter = class extends r.EventEmitter {
            on(e, t) {
                return super.on(e, t)
            }

            emit(e, ...t) {
                return super.emit(e, ...t)
            }
        }
    }, {events: "events"}],
    10: [function (e, t, n) {
        "use strict";
        n.byteLength = function (e) {
            var t = c(e), n = t[0], r = t[1];
            return 3 * (n + r) / 4 - r
        }, n.toByteArray = function (e) {
            var t, n, r = c(e), o = r[0], a = r[1], u = new s(function (e, t, n) {
                return 3 * (t + n) / 4 - n
            }(0, o, a)), h = 0, l = a > 0 ? o - 4 : o;
            for (n = 0; n < l; n += 4) t = i[e.charCodeAt(n)] << 18 | i[e.charCodeAt(n + 1)] << 12 | i[e.charCodeAt(n + 2)] << 6 | i[e.charCodeAt(n + 3)], u[h++] = t >> 16 & 255, u[h++] = t >> 8 & 255, u[h++] = 255 & t;
            2 === a && (t = i[e.charCodeAt(n)] << 2 | i[e.charCodeAt(n + 1)] >> 4, u[h++] = 255 & t);
            1 === a && (t = i[e.charCodeAt(n)] << 10 | i[e.charCodeAt(n + 1)] << 4 | i[e.charCodeAt(n + 2)] >> 2, u[h++] = t >> 8 & 255, u[h++] = 255 & t);
            return u
        }, n.fromByteArray = function (e) {
            for (var t, n = e.length, i = n % 3, s = [], o = 0, a = n - i; o < a; o += 16383) s.push(h(e, o, o + 16383 > a ? a : o + 16383));
            1 === i ? (t = e[n - 1], s.push(r[t >> 2] + r[t << 4 & 63] + "==")) : 2 === i && (t = (e[n - 2] << 8) + e[n - 1], s.push(r[t >> 10] + r[t >> 4 & 63] + r[t << 2 & 63] + "="));
            return s.join("")
        };
        for (var r = [], i = [], s = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, u = o.length; a < u; ++a) r[a] = o[a], i[o.charCodeAt(a)] = a;

        function c(e) {
            var t = e.length;
            if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var n = e.indexOf("=");
            return -1 === n && (n = t), [n, n === t ? 0 : 4 - n % 4]
        }

        function h(e, t, n) {
            for (var i, s, o = [], a = t; a < n; a += 3) i = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), o.push(r[(s = i) >> 18 & 63] + r[s >> 12 & 63] + r[s >> 6 & 63] + r[63 & s]);
            return o.join("")
        }

        i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63
    }, {}],
    11: [function (e, t, n) {
        (function (n, r) {
            const i = e("debug")("bittorrent-tracker:client"), s = e("events"), o = e("once"), a = e("run-parallel"),
                u = e("simple-peer"), c = e("uniq"), h = e("./lib/common"), l = e("./lib/client/http-tracker"),
                d = e("./lib/client/udp-tracker"), f = e("./lib/client/websocket-tracker");

            class p extends s {
                constructor(e = {}) {
                    if (super(), !e.peerId) throw new Error("Option `peerId` is required");
                    if (!e.infoHash) throw new Error("Option `infoHash` is required");
                    if (!e.announce) throw new Error("Option `announce` is required");
                    if (!n.browser && !e.port) throw new Error("Option `port` is required");
                    this.peerId = "string" == typeof e.peerId ? e.peerId : e.peerId.toString("hex"), this._peerIdBuffer = r.from(this.peerId, "hex"), this._peerIdBinary = this._peerIdBuffer.toString("binary"), this.infoHash = "string" == typeof e.infoHash ? e.infoHash.toLowerCase() : e.infoHash.toString("hex"), this._infoHashBuffer = r.from(this.infoHash, "hex"), this._infoHashBinary = this._infoHashBuffer.toString("binary"), i("new client %s", this.infoHash), this.destroyed = !1, this._port = e.port, this._getAnnounceOpts = e.getAnnounceOpts, this._rtcConfig = e.rtcConfig, this._userAgent = e.userAgent, this._wrtc = "function" == typeof e.wrtc ? e.wrtc() : e.wrtc;
                    let t = "string" == typeof e.announce ? [e.announce] : null == e.announce ? [] : e.announce;
                    t = t.map(e => ("/" === (e = e.toString())[e.length - 1] && (e = e.substring(0, e.length - 1)), e)), t = c(t);
                    const s = !1 !== this._wrtc && (!!this._wrtc || u.WEBRTC_SUPPORT), o = e => {
                        n.nextTick(() => {
                            this.emit("warning", e)
                        })
                    };
                    this._trackers = t.map(e => {
                        let t;
                        try {
                            t = new URL(e)
                        } catch (t) {
                            return o(new Error(`Invalid tracker URL: ${e}`)), null
                        }
                        const n = t.port;
                        if (n < 0 || n > 65535) return o(new Error(`Invalid tracker port: ${e}`)), null;
                        const r = t.protocol;
                        return "http:" !== r && "https:" !== r || "function" != typeof l ? "udp:" === r && "function" == typeof d ? new d(this, e) : "ws:" !== r && "wss:" !== r || !s ? (o(new Error(`Unsupported tracker protocol: ${e}`)), null) : "ws:" === r && "undefined" != typeof window && "https:" === window.location.protocol ? (o(new Error(`Unsupported tracker protocol: ${e}`)), null) : new f(this, e) : new l(this, e)
                    }).filter(Boolean)
                }

                start(e) {
                    (e = this._defaultAnnounceOpts(e)).event = "started", i("send `start` %o", e), this._announce(e), this._trackers.forEach(e => {
                        e.setInterval()
                    })
                }

                stop(e) {
                    (e = this._defaultAnnounceOpts(e)).event = "stopped", i("send `stop` %o", e), this._announce(e)
                }

                complete(e) {
                    e || (e = {}), (e = this._defaultAnnounceOpts(e)).event = "completed", i("send `complete` %o", e), this._announce(e)
                }

                update(e) {
                    (e = this._defaultAnnounceOpts(e)).event && delete e.event, i("send `update` %o", e), this._announce(e)
                }

                _announce(e) {
                    this._trackers.forEach(t => {
                        t.announce(e)
                    })
                }

                scrape(e) {
                    i("send `scrape`"), e || (e = {}), this._trackers.forEach(t => {
                        t.scrape(e)
                    })
                }

                setInterval(e) {
                    i("setInterval %d", e), this._trackers.forEach(t => {
                        t.setInterval(e)
                    })
                }

                destroy(e) {
                    if (this.destroyed) return;
                    this.destroyed = !0, i("destroy");
                    const t = this._trackers.map(e => t => {
                        e.destroy(t)
                    });
                    a(t, e), this._trackers = [], this._getAnnounceOpts = null
                }

                _defaultAnnounceOpts(e = {}) {
                    return null == e.numwant && (e.numwant = h.DEFAULT_ANNOUNCE_PEERS), null == e.uploaded && (e.uploaded = 0), null == e.downloaded && (e.downloaded = 0), this._getAnnounceOpts && (e = Object.assign({}, e, this._getAnnounceOpts())), e
                }
            }

            p.scrape = (e, t) => {
                if (t = o(t), !e.infoHash) throw new Error("Option `infoHash` is required");
                if (!e.announce) throw new Error("Option `announce` is required");
                const n = Object.assign({}, e, {
                    infoHash: Array.isArray(e.infoHash) ? e.infoHash[0] : e.infoHash,
                    peerId: r.from("01234567890123456789"),
                    port: 6881
                }), i = new p(n);
                i.once("error", t), i.once("warning", t);
                let s = Array.isArray(e.infoHash) ? e.infoHash.length : 1;
                const a = {};
                return i.on("scrape", e => {
                    if (s -= 1, a[e.infoHash] = e, 0 === s) {
                        i.destroy();
                        const e = Object.keys(a);
                        1 === e.length ? t(null, a[e[0]]) : t(null, a)
                    }
                }), e.infoHash = Array.isArray(e.infoHash) ? e.infoHash.map(e => r.from(e, "hex")) : r.from(e.infoHash, "hex"), i.scrape({infoHash: e.infoHash}), i
            }, t.exports = p
        }).call(this, e("_process"), e("buffer").Buffer)
    }, {
        "./lib/client/http-tracker": 15,
        "./lib/client/udp-tracker": 15,
        "./lib/client/websocket-tracker": 13,
        "./lib/common": 14,
        _process: 23,
        buffer: 16,
        debug: "debug",
        events: "events",
        once: 22,
        "run-parallel": 40,
        "simple-peer": 44,
        uniq: 47
    }],
    12: [function (e, t, n) {
        const r = e("events");
        t.exports = class extends r {
            constructor(e, t) {
                super(), this.client = e, this.announceUrl = t, this.interval = null, this.destroyed = !1
            }

            setInterval(e) {
                null == e && (e = this.DEFAULT_ANNOUNCE_INTERVAL), clearInterval(this.interval), e && (this.interval = setInterval(() => {
                    this.announce(this.client._defaultAnnounceOpts())
                }, e), this.interval.unref && this.interval.unref())
            }
        }
    }, {events: "events"}],
    13: [function (e, t, n) {
        const r = e("debug")("bittorrent-tracker:websocket-tracker"), i = e("simple-peer"), s = e("randombytes"),
            o = e("simple-websocket"), a = e("../common"), u = e("./tracker"), c = {}, h = 1e4, l = 18e5, d = 12e4,
            f = 5e4;

        class p extends u {
            constructor(e, t, n) {
                super(e, t), r("new websocket tracker %s", t), this.peers = {}, this.socket = null, this.reconnecting = !1, this.retries = 0, this.reconnectTimer = null, this.expectingResponse = !1, this._openSocket()
            }

            announce(e) {
                if (this.destroyed || this.reconnecting) return;
                if (!this.socket.connected) return void this.socket.once("connect", () => {
                    this.announce(e)
                });
                const t = Object.assign({}, e, {
                    action: "announce",
                    info_hash: this.client._infoHashBinary,
                    peer_id: this.client._peerIdBinary
                });
                if (this._trackerId && (t.trackerid = this._trackerId), "stopped" === e.event || "completed" === e.event) this._send(t); else {
                    const n = Math.min(e.numwant, 10);
                    this._generateOffers(n, e => {
                        t.numwant = n, t.offers = e, this._send(t)
                    })
                }
            }

            scrape(e) {
                if (this.destroyed || this.reconnecting) return;
                if (!this.socket.connected) return void this.socket.once("connect", () => {
                    this.scrape(e)
                });
                const t = {
                    action: "scrape",
                    info_hash: Array.isArray(e.infoHash) && e.infoHash.length > 0 ? e.infoHash.map(e => e.toString("binary")) : e.infoHash && e.infoHash.toString("binary") || this.client._infoHashBinary
                };
                this._send(t)
            }

            destroy(e = g) {
                if (this.destroyed) return e(null);
                this.destroyed = !0, clearInterval(this.interval), clearTimeout(this.reconnectTimer);
                for (const e in this.peers) {
                    const t = this.peers[e];
                    clearTimeout(t.trackerTimeout), t.destroy()
                }
                if (this.peers = null, this.socket && (this.socket.removeListener("connect", this._onSocketConnectBound), this.socket.removeListener("data", this._onSocketDataBound), this.socket.removeListener("close", this._onSocketCloseBound), this.socket.removeListener("error", this._onSocketErrorBound), this.socket = null), this._onSocketConnectBound = null, this._onSocketErrorBound = null, this._onSocketDataBound = null, this._onSocketCloseBound = null, c[this.announceUrl] && (c[this.announceUrl].consumers -= 1), c[this.announceUrl].consumers > 0) return e();
                let t = c[this.announceUrl];
                if (delete c[this.announceUrl], t.on("error", g), t.once("close", e), !this.expectingResponse) return r();
                var n = setTimeout(r, a.DESTROY_TIMEOUT);

                function r() {
                    n && (clearTimeout(n), n = null), t.removeListener("data", r), t.destroy(), t = null
                }

                t.once("data", r)
            }

            _openSocket() {
                this.destroyed = !1, this.peers || (this.peers = {}), this._onSocketConnectBound = () => {
                    this._onSocketConnect()
                }, this._onSocketErrorBound = e => {
                    this._onSocketError(e)
                }, this._onSocketDataBound = e => {
                    this._onSocketData(e)
                }, this._onSocketCloseBound = () => {
                    this._onSocketClose()
                }, this.socket = c[this.announceUrl], this.socket ? (c[this.announceUrl].consumers += 1, this.socket.connected && this._onSocketConnectBound()) : (this.socket = c[this.announceUrl] = new o(this.announceUrl), this.socket.consumers = 1, this.socket.once("connect", this._onSocketConnectBound)), this.socket.on("data", this._onSocketDataBound), this.socket.once("close", this._onSocketCloseBound), this.socket.once("error", this._onSocketErrorBound)
            }

            _onSocketConnect() {
                this.destroyed || this.reconnecting && (this.reconnecting = !1, this.retries = 0, this.announce(this.client._defaultAnnounceOpts()))
            }

            _onSocketData(e) {
                if (!this.destroyed) {
                    this.expectingResponse = !1;
                    try {
                        e = JSON.parse(e)
                    } catch (e) {
                        return void this.client.emit("warning", new Error("Invalid tracker response"))
                    }
                    "announce" === e.action ? this._onAnnounceResponse(e) : "scrape" === e.action ? this._onScrapeResponse(e) : this._onSocketError(new Error(`invalid action in WS response: ${e.action}`))
                }
            }

            _onAnnounceResponse(e) {
                if (e.info_hash !== this.client._infoHashBinary) return void r("ignoring websocket data from %s for %s (looking for %s: reused socket)", this.announceUrl, a.binaryToHex(e.info_hash), this.client.infoHash);
                if (e.peer_id && e.peer_id === this.client._peerIdBinary) return;
                r("received %s from %s for %s", JSON.stringify(e), this.announceUrl, this.client.infoHash);
                const t = e["failure reason"];
                if (t) return this.client.emit("warning", new Error(t));
                const n = e["warning message"];
                n && this.client.emit("warning", new Error(n));
                const i = e.interval || e["min interval"];
                i && this.setInterval(1e3 * i);
                const s = e["tracker id"];
                if (s && (this._trackerId = s), null != e.complete) {
                    const t = Object.assign({}, e, {announce: this.announceUrl, infoHash: a.binaryToHex(e.info_hash)});
                    this.client.emit("update", t)
                }
                let o;
                if (e.offer && e.peer_id && (r("creating peer (from remote offer)"), (o = this._createPeer()).id = a.binaryToHex(e.peer_id), o.once("signal", t => {
                    const n = {
                        action: "announce",
                        info_hash: this.client._infoHashBinary,
                        peer_id: this.client._peerIdBinary,
                        to_peer_id: e.peer_id,
                        answer: t,
                        offer_id: e.offer_id
                    };
                    this._trackerId && (n.trackerid = this._trackerId), this._send(n)
                }), o.signal(e.offer), this.client.emit("peer", o)), e.answer && e.peer_id) {
                    const t = a.binaryToHex(e.offer_id);
                    (o = this.peers[t]) ? (o.id = a.binaryToHex(e.peer_id), o.signal(e.answer), this.client.emit("peer", o), clearTimeout(o.trackerTimeout), o.trackerTimeout = null, delete this.peers[t]) : r(`got unexpected answer: ${JSON.stringify(e.answer)}`)
                }
            }

            _onScrapeResponse(e) {
                e = e.files || {};
                const t = Object.keys(e);
                0 !== t.length ? t.forEach(t => {
                    const n = Object.assign(e[t], {announce: this.announceUrl, infoHash: a.binaryToHex(t)});
                    this.client.emit("scrape", n)
                }) : this.client.emit("warning", new Error("invalid scrape response"))
            }

            _onSocketClose() {
                this.destroyed || (this.destroy(), this._startReconnectTimer())
            }

            _onSocketError(e) {
                this.destroyed || (this.destroy(), this.client.emit("warning", e), this._startReconnectTimer())
            }

            _startReconnectTimer() {
                const e = Math.floor(Math.random() * d) + Math.min(Math.pow(2, this.retries) * h, l);
                this.reconnecting = !0, clearTimeout(this.reconnectTimer), this.reconnectTimer = setTimeout(() => {
                    this.retries++, this._openSocket()
                }, e), this.reconnectTimer.unref && this.reconnectTimer.unref(), r("reconnecting socket in %s ms", e)
            }

            _send(e) {
                if (this.destroyed) return;
                this.expectingResponse = !0;
                const t = JSON.stringify(e);
                r("send %s", t), this.socket.send(t)
            }

            _generateOffers(e, t) {
                const n = this, i = [];
                r("generating %s offers", e);
                for (let t = 0; t < e; ++t) o();

                function o() {
                    const e = s(20).toString("hex");
                    r("creating peer (from _generateOffers)");
                    const t = n.peers[e] = n._createPeer({initiator: !0});
                    t.once("signal", t => {
                        i.push({offer: t, offer_id: a.hexToBinary(e)}), u()
                    }), t.trackerTimeout = setTimeout(() => {
                        r("tracker timeout: destroying peer"), t.trackerTimeout = null, delete n.peers[e], t.destroy()
                    }, f), t.trackerTimeout.unref && t.trackerTimeout.unref()
                }

                function u() {
                    i.length === e && (r("generated %s offers", e), t(i))
                }

                u()
            }

            _createPeer(e) {
                const t = this;
                e = Object.assign({trickle: !1, config: t.client._rtcConfig, wrtc: t.client._wrtc}, e);
                const n = new i(e);
                return n.once("error", r), n.once("connect", function e() {
                    n.removeListener("error", r);
                    n.removeListener("connect", e)
                }), n;

                function r(e) {
                    t.client.emit("warning", new Error(`Connection error: ${e.message}`)), n.destroy()
                }
            }
        }

        function g() {
        }

        p.prototype.DEFAULT_ANNOUNCE_INTERVAL = 3e4, p._socketPool = c, t.exports = p
    }, {"../common": 14, "./tracker": 12, debug: "debug", randombytes: 24, "simple-peer": 44, "simple-websocket": 45}],
    14: [function (e, t, n) {
        (function (t) {
            n.DEFAULT_ANNOUNCE_PEERS = 50, n.MAX_ANNOUNCE_PEERS = 82, n.binaryToHex = function (e) {
                return "string" != typeof e && (e = String(e)), t.from(e, "binary").toString("hex")
            }, n.hexToBinary = function (e) {
                return "string" != typeof e && (e = String(e)), t.from(e, "hex").toString("binary")
            };
            var r = e("./common-node");
            Object.assign(n, r)
        }).call(this, e("buffer").Buffer)
    }, {"./common-node": 15, buffer: 16}],
    15: [function (e, t, n) {
    }, {}],
    16: [function (e, t, n) {
        (function (t) {
            "use strict";
            var r = e("base64-js"), i = e("ieee754"),
                s = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("nodejs.util.inspect.custom") : null;
            n.Buffer = t, n.SlowBuffer = function (e) {
                +e != e && (e = 0);
                return t.alloc(+e)
            }, n.INSPECT_MAX_BYTES = 50;
            var o = 2147483647;

            function a(e) {
                if (e > o) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                var n = new Uint8Array(e);
                return Object.setPrototypeOf(n, t.prototype), n
            }

            function t(e, t, n) {
                if ("number" == typeof e) {
                    if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                    return h(e)
                }
                return u(e, t, n)
            }

            function u(e, n, r) {
                if ("string" == typeof e) return function (e, n) {
                    "string" == typeof n && "" !== n || (n = "utf8");
                    if (!t.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                    var r = 0 | f(e, n), i = a(r), s = i.write(e, n);
                    s !== r && (i = i.slice(0, s));
                    return i
                }(e, n);
                if (ArrayBuffer.isView(e)) return l(e);
                if (null == e) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                if (q(e, ArrayBuffer) || e && q(e.buffer, ArrayBuffer)) return function (e, n, r) {
                    if (n < 0 || e.byteLength < n) throw new RangeError('"offset" is outside of buffer bounds');
                    if (e.byteLength < n + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                    var i;
                    i = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
                    return Object.setPrototypeOf(i, t.prototype), i
                }(e, n, r);
                if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                var i = e.valueOf && e.valueOf();
                if (null != i && i !== e) return t.from(i, n, r);
                var s = function (e) {
                    if (t.isBuffer(e)) {
                        var n = 0 | d(e.length), r = a(n);
                        return 0 === r.length ? r : (e.copy(r, 0, 0, n), r)
                    }
                    if (void 0 !== e.length) return "number" != typeof e.length || H(e.length) ? a(0) : l(e);
                    if ("Buffer" === e.type && Array.isArray(e.data)) return l(e.data)
                }(e);
                if (s) return s;
                if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return t.from(e[Symbol.toPrimitive]("string"), n, r);
                throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
            }

            function c(e) {
                if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
            }

            function h(e) {
                return c(e), a(e < 0 ? 0 : 0 | d(e))
            }

            function l(e) {
                for (var t = e.length < 0 ? 0 : 0 | d(e.length), n = a(t), r = 0; r < t; r += 1) n[r] = 255 & e[r];
                return n
            }

            function d(e) {
                if (e >= o) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + o.toString(16) + " bytes");
                return 0 | e
            }

            function f(e, n) {
                if (t.isBuffer(e)) return e.length;
                if (ArrayBuffer.isView(e) || q(e, ArrayBuffer)) return e.byteLength;
                if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                var r = e.length, i = arguments.length > 2 && !0 === arguments[2];
                if (!i && 0 === r) return 0;
                for (var s = !1; ;) switch (n) {
                    case"ascii":
                    case"latin1":
                    case"binary":
                        return r;
                    case"utf8":
                    case"utf-8":
                        return U(e).length;
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return 2 * r;
                    case"hex":
                        return r >>> 1;
                    case"base64":
                        return j(e).length;
                    default:
                        if (s) return i ? -1 : U(e).length;
                        n = ("" + n).toLowerCase(), s = !0
                }
            }

            function p(e, t, n) {
                var r = !1;
                if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
                if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
                if ((n >>>= 0) <= (t >>>= 0)) return "";
                for (e || (e = "utf8"); ;) switch (e) {
                    case"hex":
                        return M(this, t, n);
                    case"utf8":
                    case"utf-8":
                        return T(this, t, n);
                    case"ascii":
                        return k(this, t, n);
                    case"latin1":
                    case"binary":
                        return A(this, t, n);
                    case"base64":
                        return C(this, t, n);
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return I(this, t, n);
                    default:
                        if (r) throw new TypeError("Unknown encoding: " + e);
                        e = (e + "").toLowerCase(), r = !0
                }
            }

            function g(e, t, n) {
                var r = e[t];
                e[t] = e[n], e[n] = r
            }

            function m(e, n, r, i, s) {
                if (0 === e.length) return -1;
                if ("string" == typeof r ? (i = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), H(r = +r) && (r = s ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                    if (s) return -1;
                    r = e.length - 1
                } else if (r < 0) {
                    if (!s) return -1;
                    r = 0
                }
                if ("string" == typeof n && (n = t.from(n, i)), t.isBuffer(n)) return 0 === n.length ? -1 : y(e, n, r, i, s);
                if ("number" == typeof n) return n &= 255, "function" == typeof Uint8Array.prototype.indexOf ? s ? Uint8Array.prototype.indexOf.call(e, n, r) : Uint8Array.prototype.lastIndexOf.call(e, n, r) : y(e, [n], r, i, s);
                throw new TypeError("val must be string, number or Buffer")
            }

            function y(e, t, n, r, i) {
                var s, o = 1, a = e.length, u = t.length;
                if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                    if (e.length < 2 || t.length < 2) return -1;
                    o = 2, a /= 2, u /= 2, n /= 2
                }

                function c(e, t) {
                    return 1 === o ? e[t] : e.readUInt16BE(t * o)
                }

                if (i) {
                    var h = -1;
                    for (s = n; s < a; s++) if (c(e, s) === c(t, -1 === h ? 0 : s - h)) {
                        if (-1 === h && (h = s), s - h + 1 === u) return h * o
                    } else -1 !== h && (s -= s - h), h = -1
                } else for (n + u > a && (n = a - u), s = n; s >= 0; s--) {
                    for (var l = !0, d = 0; d < u; d++) if (c(e, s + d) !== c(t, d)) {
                        l = !1;
                        break
                    }
                    if (l) return s
                }
                return -1
            }

            function b(e, t, n, r) {
                n = Number(n) || 0;
                var i = e.length - n;
                r ? (r = Number(r)) > i && (r = i) : r = i;
                var s = t.length;
                r > s / 2 && (r = s / 2);
                for (var o = 0; o < r; ++o) {
                    var a = parseInt(t.substr(2 * o, 2), 16);
                    if (H(a)) return o;
                    e[n + o] = a
                }
                return o
            }

            function w(e, t, n, r) {
                return F(U(t, e.length - n), e, n, r)
            }

            function _(e, t, n, r) {
                return F(function (e) {
                    for (var t = [], n = 0; n < e.length; ++n) t.push(255 & e.charCodeAt(n));
                    return t
                }(t), e, n, r)
            }

            function v(e, t, n, r) {
                return _(e, t, n, r)
            }

            function S(e, t, n, r) {
                return F(j(t), e, n, r)
            }

            function E(e, t, n, r) {
                return F(function (e, t) {
                    for (var n, r, i, s = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) n = e.charCodeAt(o), r = n >> 8, i = n % 256, s.push(i), s.push(r);
                    return s
                }(t, e.length - n), e, n, r)
            }

            function C(e, t, n) {
                return 0 === t && n === e.length ? r.fromByteArray(e) : r.fromByteArray(e.slice(t, n))
            }

            function T(e, t, n) {
                n = Math.min(e.length, n);
                for (var r = [], i = t; i < n;) {
                    var s, o, a, u, c = e[i], h = null, l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
                    if (i + l <= n) switch (l) {
                        case 1:
                            c < 128 && (h = c);
                            break;
                        case 2:
                            128 == (192 & (s = e[i + 1])) && (u = (31 & c) << 6 | 63 & s) > 127 && (h = u);
                            break;
                        case 3:
                            s = e[i + 1], o = e[i + 2], 128 == (192 & s) && 128 == (192 & o) && (u = (15 & c) << 12 | (63 & s) << 6 | 63 & o) > 2047 && (u < 55296 || u > 57343) && (h = u);
                            break;
                        case 4:
                            s = e[i + 1], o = e[i + 2], a = e[i + 3], 128 == (192 & s) && 128 == (192 & o) && 128 == (192 & a) && (u = (15 & c) << 18 | (63 & s) << 12 | (63 & o) << 6 | 63 & a) > 65535 && u < 1114112 && (h = u)
                    }
                    null === h ? (h = 65533, l = 1) : h > 65535 && (h -= 65536, r.push(h >>> 10 & 1023 | 55296), h = 56320 | 1023 & h), r.push(h), i += l
                }
                return function (e) {
                    var t = e.length;
                    if (t <= R) return String.fromCharCode.apply(String, e);
                    var n = "", r = 0;
                    for (; r < t;) n += String.fromCharCode.apply(String, e.slice(r, r += R));
                    return n
                }(r)
            }

            n.kMaxLength = o, t.TYPED_ARRAY_SUPPORT = function () {
                try {
                    var e = new Uint8Array(1), t = {
                        foo: function () {
                            return 42
                        }
                    };
                    return Object.setPrototypeOf(t, Uint8Array.prototype), Object.setPrototypeOf(e, t), 42 === e.foo()
                } catch (e) {
                    return !1
                }
            }(), t.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(t.prototype, "parent", {
                enumerable: !0,
                get: function () {
                    if (t.isBuffer(this)) return this.buffer
                }
            }), Object.defineProperty(t.prototype, "offset", {
                enumerable: !0, get: function () {
                    if (t.isBuffer(this)) return this.byteOffset
                }
            }), "undefined" != typeof Symbol && null != Symbol.species && t[Symbol.species] === t && Object.defineProperty(t, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
            }), t.poolSize = 8192, t.from = function (e, t, n) {
                return u(e, t, n)
            }, Object.setPrototypeOf(t.prototype, Uint8Array.prototype), Object.setPrototypeOf(t, Uint8Array), t.alloc = function (e, t, n) {
                return function (e, t, n) {
                    return c(e), e <= 0 ? a(e) : void 0 !== t ? "string" == typeof n ? a(e).fill(t, n) : a(e).fill(t) : a(e)
                }(e, t, n)
            }, t.allocUnsafe = function (e) {
                return h(e)
            }, t.allocUnsafeSlow = function (e) {
                return h(e)
            }, t.isBuffer = function (e) {
                return null != e && !0 === e._isBuffer && e !== t.prototype
            }, t.compare = function (e, n) {
                if (q(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)), q(n, Uint8Array) && (n = t.from(n, n.offset, n.byteLength)), !t.isBuffer(e) || !t.isBuffer(n)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                if (e === n) return 0;
                for (var r = e.length, i = n.length, s = 0, o = Math.min(r, i); s < o; ++s) if (e[s] !== n[s]) {
                    r = e[s], i = n[s];
                    break
                }
                return r < i ? -1 : i < r ? 1 : 0
            }, t.isEncoding = function (e) {
                switch (String(e).toLowerCase()) {
                    case"hex":
                    case"utf8":
                    case"utf-8":
                    case"ascii":
                    case"latin1":
                    case"binary":
                    case"base64":
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, t.concat = function (e, n) {
                if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === e.length) return t.alloc(0);
                var r;
                if (void 0 === n) for (n = 0, r = 0; r < e.length; ++r) n += e[r].length;
                var i = t.allocUnsafe(n), s = 0;
                for (r = 0; r < e.length; ++r) {
                    var o = e[r];
                    if (q(o, Uint8Array) && (o = t.from(o)), !t.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                    o.copy(i, s), s += o.length
                }
                return i
            }, t.byteLength = f, t.prototype._isBuffer = !0, t.prototype.swap16 = function () {
                var e = this.length;
                if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var t = 0; t < e; t += 2) g(this, t, t + 1);
                return this
            }, t.prototype.swap32 = function () {
                var e = this.length;
                if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var t = 0; t < e; t += 4) g(this, t, t + 3), g(this, t + 1, t + 2);
                return this
            }, t.prototype.swap64 = function () {
                var e = this.length;
                if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var t = 0; t < e; t += 8) g(this, t, t + 7), g(this, t + 1, t + 6), g(this, t + 2, t + 5), g(this, t + 3, t + 4);
                return this
            }, t.prototype.toString = function () {
                var e = this.length;
                return 0 === e ? "" : 0 === arguments.length ? T(this, 0, e) : p.apply(this, arguments)
            }, t.prototype.toLocaleString = t.prototype.toString, t.prototype.equals = function (e) {
                if (!t.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                return this === e || 0 === t.compare(this, e)
            }, t.prototype.inspect = function () {
                var e = "", t = n.INSPECT_MAX_BYTES;
                return e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim(), this.length > t && (e += " ... "), "<Buffer " + e + ">"
            }, s && (t.prototype[s] = t.prototype.inspect), t.prototype.compare = function (e, n, r, i, s) {
                if (q(e, Uint8Array) && (e = t.from(e, e.offset, e.byteLength)), !t.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                if (void 0 === n && (n = 0), void 0 === r && (r = e ? e.length : 0), void 0 === i && (i = 0), void 0 === s && (s = this.length), n < 0 || r > e.length || i < 0 || s > this.length) throw new RangeError("out of range index");
                if (i >= s && n >= r) return 0;
                if (i >= s) return -1;
                if (n >= r) return 1;
                if (this === e) return 0;
                for (var o = (s >>>= 0) - (i >>>= 0), a = (r >>>= 0) - (n >>>= 0), u = Math.min(o, a), c = this.slice(i, s), h = e.slice(n, r), l = 0; l < u; ++l) if (c[l] !== h[l]) {
                    o = c[l], a = h[l];
                    break
                }
                return o < a ? -1 : a < o ? 1 : 0
            }, t.prototype.includes = function (e, t, n) {
                return -1 !== this.indexOf(e, t, n)
            }, t.prototype.indexOf = function (e, t, n) {
                return m(this, e, t, n, !0)
            }, t.prototype.lastIndexOf = function (e, t, n) {
                return m(this, e, t, n, !1)
            }, t.prototype.write = function (e, t, n, r) {
                if (void 0 === t) r = "utf8", n = this.length, t = 0; else if (void 0 === n && "string" == typeof t) r = t, n = this.length, t = 0; else {
                    if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    t >>>= 0, isFinite(n) ? (n >>>= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0)
                }
                var i = this.length - t;
                if ((void 0 === n || n > i) && (n = i), e.length > 0 && (n < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                r || (r = "utf8");
                for (var s = !1; ;) switch (r) {
                    case"hex":
                        return b(this, e, t, n);
                    case"utf8":
                    case"utf-8":
                        return w(this, e, t, n);
                    case"ascii":
                        return _(this, e, t, n);
                    case"latin1":
                    case"binary":
                        return v(this, e, t, n);
                    case"base64":
                        return S(this, e, t, n);
                    case"ucs2":
                    case"ucs-2":
                    case"utf16le":
                    case"utf-16le":
                        return E(this, e, t, n);
                    default:
                        if (s) throw new TypeError("Unknown encoding: " + r);
                        r = ("" + r).toLowerCase(), s = !0
                }
            }, t.prototype.toJSON = function () {
                return {type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0)}
            };
            var R = 4096;

            function k(e, t, n) {
                var r = "";
                n = Math.min(e.length, n);
                for (var i = t; i < n; ++i) r += String.fromCharCode(127 & e[i]);
                return r
            }

            function A(e, t, n) {
                var r = "";
                n = Math.min(e.length, n);
                for (var i = t; i < n; ++i) r += String.fromCharCode(e[i]);
                return r
            }

            function M(e, t, n) {
                var r = e.length;
                (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
                for (var i = "", s = t; s < n; ++s) i += N(e[s]);
                return i
            }

            function I(e, t, n) {
                for (var r = e.slice(t, n), i = "", s = 0; s < r.length; s += 2) i += String.fromCharCode(r[s] + 256 * r[s + 1]);
                return i
            }

            function P(e, t, n) {
                if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                if (e + t > n) throw new RangeError("Trying to access beyond buffer length")
            }

            function x(e, n, r, i, s, o) {
                if (!t.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (n > s || n < o) throw new RangeError('"value" argument is out of bounds');
                if (r + i > e.length) throw new RangeError("Index out of range")
            }

            function O(e, t, n, r, i, s) {
                if (n + r > e.length) throw new RangeError("Index out of range");
                if (n < 0) throw new RangeError("Index out of range")
            }

            function L(e, t, n, r, s) {
                return t = +t, n >>>= 0, s || O(e, 0, n, 4), i.write(e, t, n, r, 23, 4), n + 4
            }

            function D(e, t, n, r, s) {
                return t = +t, n >>>= 0, s || O(e, 0, n, 8), i.write(e, t, n, r, 52, 8), n + 8
            }

            t.prototype.slice = function (e, n) {
                var r = this.length;
                (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), (n = void 0 === n ? r : ~~n) < 0 ? (n += r) < 0 && (n = 0) : n > r && (n = r), n < e && (n = e);
                var i = this.subarray(e, n);
                return Object.setPrototypeOf(i, t.prototype), i
            }, t.prototype.readUIntLE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || P(e, t, this.length);
                for (var r = this[e], i = 1, s = 0; ++s < t && (i *= 256);) r += this[e + s] * i;
                return r
            }, t.prototype.readUIntBE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || P(e, t, this.length);
                for (var r = this[e + --t], i = 1; t > 0 && (i *= 256);) r += this[e + --t] * i;
                return r
            }, t.prototype.readUInt8 = function (e, t) {
                return e >>>= 0, t || P(e, 1, this.length), this[e]
            }, t.prototype.readUInt16LE = function (e, t) {
                return e >>>= 0, t || P(e, 2, this.length), this[e] | this[e + 1] << 8
            }, t.prototype.readUInt16BE = function (e, t) {
                return e >>>= 0, t || P(e, 2, this.length), this[e] << 8 | this[e + 1]
            }, t.prototype.readUInt32LE = function (e, t) {
                return e >>>= 0, t || P(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
            }, t.prototype.readUInt32BE = function (e, t) {
                return e >>>= 0, t || P(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
            }, t.prototype.readIntLE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || P(e, t, this.length);
                for (var r = this[e], i = 1, s = 0; ++s < t && (i *= 256);) r += this[e + s] * i;
                return r >= (i *= 128) && (r -= Math.pow(2, 8 * t)), r
            }, t.prototype.readIntBE = function (e, t, n) {
                e >>>= 0, t >>>= 0, n || P(e, t, this.length);
                for (var r = t, i = 1, s = this[e + --r]; r > 0 && (i *= 256);) s += this[e + --r] * i;
                return s >= (i *= 128) && (s -= Math.pow(2, 8 * t)), s
            }, t.prototype.readInt8 = function (e, t) {
                return e >>>= 0, t || P(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
            }, t.prototype.readInt16LE = function (e, t) {
                e >>>= 0, t || P(e, 2, this.length);
                var n = this[e] | this[e + 1] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, t.prototype.readInt16BE = function (e, t) {
                e >>>= 0, t || P(e, 2, this.length);
                var n = this[e + 1] | this[e] << 8;
                return 32768 & n ? 4294901760 | n : n
            }, t.prototype.readInt32LE = function (e, t) {
                return e >>>= 0, t || P(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
            }, t.prototype.readInt32BE = function (e, t) {
                return e >>>= 0, t || P(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
            }, t.prototype.readFloatLE = function (e, t) {
                return e >>>= 0, t || P(e, 4, this.length), i.read(this, e, !0, 23, 4)
            }, t.prototype.readFloatBE = function (e, t) {
                return e >>>= 0, t || P(e, 4, this.length), i.read(this, e, !1, 23, 4)
            }, t.prototype.readDoubleLE = function (e, t) {
                return e >>>= 0, t || P(e, 8, this.length), i.read(this, e, !0, 52, 8)
            }, t.prototype.readDoubleBE = function (e, t) {
                return e >>>= 0, t || P(e, 8, this.length), i.read(this, e, !1, 52, 8)
            }, t.prototype.writeUIntLE = function (e, t, n, r) {
                (e = +e, t >>>= 0, n >>>= 0, r) || x(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                var i = 1, s = 0;
                for (this[t] = 255 & e; ++s < n && (i *= 256);) this[t + s] = e / i & 255;
                return t + n
            }, t.prototype.writeUIntBE = function (e, t, n, r) {
                (e = +e, t >>>= 0, n >>>= 0, r) || x(this, e, t, n, Math.pow(2, 8 * n) - 1, 0);
                var i = n - 1, s = 1;
                for (this[t + i] = 255 & e; --i >= 0 && (s *= 256);) this[t + i] = e / s & 255;
                return t + n
            }, t.prototype.writeUInt8 = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
            }, t.prototype.writeUInt16LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, t.prototype.writeUInt16BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, t.prototype.writeUInt32LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
            }, t.prototype.writeUInt32BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, t.prototype.writeIntLE = function (e, t, n, r) {
                if (e = +e, t >>>= 0, !r) {
                    var i = Math.pow(2, 8 * n - 1);
                    x(this, e, t, n, i - 1, -i)
                }
                var s = 0, o = 1, a = 0;
                for (this[t] = 255 & e; ++s < n && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + s - 1] && (a = 1), this[t + s] = (e / o >> 0) - a & 255;
                return t + n
            }, t.prototype.writeIntBE = function (e, t, n, r) {
                if (e = +e, t >>>= 0, !r) {
                    var i = Math.pow(2, 8 * n - 1);
                    x(this, e, t, n, i - 1, -i)
                }
                var s = n - 1, o = 1, a = 0;
                for (this[t + s] = 255 & e; --s >= 0 && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + s + 1] && (a = 1), this[t + s] = (e / o >> 0) - a & 255;
                return t + n
            }, t.prototype.writeInt8 = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 1, 127, -128), e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1
            }, t.prototype.writeInt16LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
            }, t.prototype.writeInt16BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
            }, t.prototype.writeInt32LE = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
            }, t.prototype.writeInt32BE = function (e, t, n) {
                return e = +e, t >>>= 0, n || x(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
            }, t.prototype.writeFloatLE = function (e, t, n) {
                return L(this, e, t, !0, n)
            }, t.prototype.writeFloatBE = function (e, t, n) {
                return L(this, e, t, !1, n)
            }, t.prototype.writeDoubleLE = function (e, t, n) {
                return D(this, e, t, !0, n)
            }, t.prototype.writeDoubleBE = function (e, t, n) {
                return D(this, e, t, !1, n)
            }, t.prototype.copy = function (e, n, r, i) {
                if (!t.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                if (r || (r = 0), i || 0 === i || (i = this.length), n >= e.length && (n = e.length), n || (n = 0), i > 0 && i < r && (i = r), i === r) return 0;
                if (0 === e.length || 0 === this.length) return 0;
                if (n < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                if (i < 0) throw new RangeError("sourceEnd out of bounds");
                i > this.length && (i = this.length), e.length - n < i - r && (i = e.length - n + r);
                var s = i - r;
                if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(n, r, i); else if (this === e && r < n && n < i) for (var o = s - 1; o >= 0; --o) e[o + n] = this[o + r]; else Uint8Array.prototype.set.call(e, this.subarray(r, i), n);
                return s
            }, t.prototype.fill = function (e, n, r, i) {
                if ("string" == typeof e) {
                    if ("string" == typeof n ? (i = n, n = 0, r = this.length) : "string" == typeof r && (i = r, r = this.length), void 0 !== i && "string" != typeof i) throw new TypeError("encoding must be a string");
                    if ("string" == typeof i && !t.isEncoding(i)) throw new TypeError("Unknown encoding: " + i);
                    if (1 === e.length) {
                        var s = e.charCodeAt(0);
                        ("utf8" === i && s < 128 || "latin1" === i) && (e = s)
                    }
                } else "number" == typeof e ? e &= 255 : "boolean" == typeof e && (e = Number(e));
                if (n < 0 || this.length < n || this.length < r) throw new RangeError("Out of range index");
                if (r <= n) return this;
                var o;
                if (n >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e) for (o = n; o < r; ++o) this[o] = e; else {
                    var a = t.isBuffer(e) ? e : t.from(e, i), u = a.length;
                    if (0 === u) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                    for (o = 0; o < r - n; ++o) this[o + n] = a[o % u]
                }
                return this
            };
            var B = /[^+/0-9A-Za-z-_]/g;

            function N(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }

            function U(e, t) {
                var n;
                t = t || 1 / 0;
                for (var r = e.length, i = null, s = [], o = 0; o < r; ++o) {
                    if ((n = e.charCodeAt(o)) > 55295 && n < 57344) {
                        if (!i) {
                            if (n > 56319) {
                                (t -= 3) > -1 && s.push(239, 191, 189);
                                continue
                            }
                            if (o + 1 === r) {
                                (t -= 3) > -1 && s.push(239, 191, 189);
                                continue
                            }
                            i = n;
                            continue
                        }
                        if (n < 56320) {
                            (t -= 3) > -1 && s.push(239, 191, 189), i = n;
                            continue
                        }
                        n = 65536 + (i - 55296 << 10 | n - 56320)
                    } else i && (t -= 3) > -1 && s.push(239, 191, 189);
                    if (i = null, n < 128) {
                        if ((t -= 1) < 0) break;
                        s.push(n)
                    } else if (n < 2048) {
                        if ((t -= 2) < 0) break;
                        s.push(n >> 6 | 192, 63 & n | 128)
                    } else if (n < 65536) {
                        if ((t -= 3) < 0) break;
                        s.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128)
                    } else {
                        if (!(n < 1114112)) throw new Error("Invalid code point");
                        if ((t -= 4) < 0) break;
                        s.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128)
                    }
                }
                return s
            }

            function j(e) {
                return r.toByteArray(function (e) {
                    if ((e = (e = e.split("=")[0]).trim().replace(B, "")).length < 2) return "";
                    for (; e.length % 4 != 0;) e += "=";
                    return e
                }(e))
            }

            function F(e, t, n, r) {
                for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i) t[i + n] = e[i];
                return i
            }

            function q(e, t) {
                return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
            }

            function H(e) {
                return e != e
            }
        }).call(this, e("buffer").Buffer)
    }, {"base64-js": 10, buffer: 16, ieee754: 19}],
    17: [function (e, t, n) {
        t.exports = function (t) {
            function n(e) {
                let t = 0;
                for (let n = 0; n < e.length; n++) t = (t << 5) - t + e.charCodeAt(n), t |= 0;
                return r.colors[Math.abs(t) % r.colors.length]
            }

            function r(e) {
                let t;

                function o(...e) {
                    if (!o.enabled) return;
                    const n = o, i = Number(new Date), s = i - (t || i);
                    n.diff = s, n.prev = t, n.curr = i, t = i, e[0] = r.coerce(e[0]), "string" != typeof e[0] && e.unshift("%O");
                    let a = 0;
                    e[0] = e[0].replace(/%([a-zA-Z%])/g, (t, i) => {
                        if ("%%" === t) return t;
                        a++;
                        const s = r.formatters[i];
                        if ("function" == typeof s) {
                            const r = e[a];
                            t = s.call(n, r), e.splice(a, 1), a--
                        }
                        return t
                    }), r.formatArgs.call(n, e), (n.log || r.log).apply(n, e)
                }

                return o.namespace = e, o.enabled = r.enabled(e), o.useColors = r.useColors(), o.color = n(e), o.destroy = i, o.extend = s, "function" == typeof r.init && r.init(o), r.instances.push(o), o
            }

            function i() {
                const e = r.instances.indexOf(this);
                return -1 !== e && (r.instances.splice(e, 1), !0)
            }

            function s(e, t) {
                const n = r(this.namespace + (void 0 === t ? ":" : t) + e);
                return n.log = this.log, n
            }

            function o(e) {
                return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
            }

            return r.debug = r, r.default = r, r.coerce = function (e) {
                if (e instanceof Error) return e.stack || e.message;
                return e
            }, r.disable = function () {
                const e = [...r.names.map(o), ...r.skips.map(o).map(e => "-" + e)].join(",");
                return r.enable(""), e
            }, r.enable = function (e) {
                let t;
                r.save(e), r.names = [], r.skips = [];
                const n = ("string" == typeof e ? e : "").split(/[\s,]+/), i = n.length;
                for (t = 0; t < i; t++) n[t] && ("-" === (e = n[t].replace(/\*/g, ".*?"))[0] ? r.skips.push(new RegExp("^" + e.substr(1) + "$")) : r.names.push(new RegExp("^" + e + "$")));
                for (t = 0; t < r.instances.length; t++) {
                    const e = r.instances[t];
                    e.enabled = r.enabled(e.namespace)
                }
            }, r.enabled = function (e) {
                if ("*" === e[e.length - 1]) return !0;
                let t, n;
                for (t = 0, n = r.skips.length; t < n; t++) if (r.skips[t].test(e)) return !1;
                for (t = 0, n = r.names.length; t < n; t++) if (r.names[t].test(e)) return !0;
                return !1
            }, r.humanize = e("ms"), Object.keys(t).forEach(e => {
                r[e] = t[e]
            }), r.instances = [], r.names = [], r.skips = [], r.formatters = {}, r.selectColor = n, r.enable(r.load()), r
        }
    }, {ms: 21}],
    18: [function (e, t, n) {
        t.exports = function () {
            if ("undefined" == typeof window) return null;
            var e = {
                RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
                RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
                RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
            };
            return e.RTCPeerConnection ? e : null
        }
    }, {}],
    19: [function (e, t, n) {
        n.read = function (e, t, n, r, i) {
            var s, o, a = 8 * i - r - 1, u = (1 << a) - 1, c = u >> 1, h = -7, l = n ? i - 1 : 0, d = n ? -1 : 1,
                f = e[t + l];
            for (l += d, s = f & (1 << -h) - 1, f >>= -h, h += a; h > 0; s = 256 * s + e[t + l], l += d, h -= 8) ;
            for (o = s & (1 << -h) - 1, s >>= -h, h += r; h > 0; o = 256 * o + e[t + l], l += d, h -= 8) ;
            if (0 === s) s = 1 - c; else {
                if (s === u) return o ? NaN : 1 / 0 * (f ? -1 : 1);
                o += Math.pow(2, r), s -= c
            }
            return (f ? -1 : 1) * o * Math.pow(2, s - r)
        }, n.write = function (e, t, n, r, i, s) {
            var o, a, u, c = 8 * s - i - 1, h = (1 << c) - 1, l = h >> 1,
                d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, f = r ? 0 : s - 1, p = r ? 1 : -1,
                g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, o = h) : (o = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), (t += o + l >= 1 ? d / u : d * Math.pow(2, 1 - l)) * u >= 2 && (o++, u /= 2), o + l >= h ? (a = 0, o = h) : o + l >= 1 ? (a = (t * u - 1) * Math.pow(2, i), o += l) : (a = t * Math.pow(2, l - 1) * Math.pow(2, i), o = 0)); i >= 8; e[n + f] = 255 & a, f += p, a /= 256, i -= 8) ;
            for (o = o << i | a, c += i; c > 0; e[n + f] = 255 & o, f += p, o /= 256, c -= 8) ;
            e[n + f - p] |= 128 * g
        }
    }, {}],
    20: [function (e, t, n) {
        "function" == typeof Object.create ? t.exports = function (e, t) {
            t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }))
        } : t.exports = function (e, t) {
            if (t) {
                e.super_ = t;
                var n = function () {
                };
                n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
            }
        }
    }, {}],
    21: [function (e, t, n) {
        var r = 1e3, i = 60 * r, s = 60 * i, o = 24 * s, a = 7 * o, u = 365.25 * o;

        function c(e, t, n, r) {
            var i = t >= 1.5 * n;
            return Math.round(e / n) + " " + r + (i ? "s" : "")
        }

        t.exports = function (e, t) {
            t = t || {};
            var n = typeof e;
            if ("string" === n && e.length > 0) return function (e) {
                if ((e = String(e)).length > 100) return;
                var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
                if (!t) return;
                var n = parseFloat(t[1]);
                switch ((t[2] || "ms").toLowerCase()) {
                    case"years":
                    case"year":
                    case"yrs":
                    case"yr":
                    case"y":
                        return n * u;
                    case"weeks":
                    case"week":
                    case"w":
                        return n * a;
                    case"days":
                    case"day":
                    case"d":
                        return n * o;
                    case"hours":
                    case"hour":
                    case"hrs":
                    case"hr":
                    case"h":
                        return n * s;
                    case"minutes":
                    case"minute":
                    case"mins":
                    case"min":
                    case"m":
                        return n * i;
                    case"seconds":
                    case"second":
                    case"secs":
                    case"sec":
                    case"s":
                        return n * r;
                    case"milliseconds":
                    case"millisecond":
                    case"msecs":
                    case"msec":
                    case"ms":
                        return n;
                    default:
                        return
                }
            }(e);
            if ("number" === n && isFinite(e)) return t.long ? function (e) {
                var t = Math.abs(e);
                if (t >= o) return c(e, t, o, "day");
                if (t >= s) return c(e, t, s, "hour");
                if (t >= i) return c(e, t, i, "minute");
                if (t >= r) return c(e, t, r, "second");
                return e + " ms"
            }(e) : function (e) {
                var t = Math.abs(e);
                if (t >= o) return Math.round(e / o) + "d";
                if (t >= s) return Math.round(e / s) + "h";
                if (t >= i) return Math.round(e / i) + "m";
                if (t >= r) return Math.round(e / r) + "s";
                return e + "ms"
            }(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        }
    }, {}],
    22: [function (e, t, n) {
        var r = e("wrappy");

        function i(e) {
            var t = function () {
                return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments))
            };
            return t.called = !1, t
        }

        function s(e) {
            var t = function () {
                if (t.called) throw new Error(t.onceError);
                return t.called = !0, t.value = e.apply(this, arguments)
            }, n = e.name || "Function wrapped with `once`";
            return t.onceError = n + " shouldn't be called more than once", t.called = !1, t
        }

        t.exports = r(i), t.exports.strict = r(s), i.proto = i(function () {
            Object.defineProperty(Function.prototype, "once", {
                value: function () {
                    return i(this)
                }, configurable: !0
            }), Object.defineProperty(Function.prototype, "onceStrict", {
                value: function () {
                    return s(this)
                }, configurable: !0
            })
        })
    }, {wrappy: 49}],
    23: [function (e, t, n) {
        var r, i, s = t.exports = {};

        function o() {
            throw new Error("setTimeout has not been defined")
        }

        function a() {
            throw new Error("clearTimeout has not been defined")
        }

        function u(e) {
            if (r === setTimeout) return setTimeout(e, 0);
            if ((r === o || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
            try {
                return r(e, 0)
            } catch (t) {
                try {
                    return r.call(null, e, 0)
                } catch (t) {
                    return r.call(this, e, 0)
                }
            }
        }

        !function () {
            try {
                r = "function" == typeof setTimeout ? setTimeout : o
            } catch (e) {
                r = o
            }
            try {
                i = "function" == typeof clearTimeout ? clearTimeout : a
            } catch (e) {
                i = a
            }
        }();
        var c, h = [], l = !1, d = -1;

        function f() {
            l && c && (l = !1, c.length ? h = c.concat(h) : d = -1, h.length && p())
        }

        function p() {
            if (!l) {
                var e = u(f);
                l = !0;
                for (var t = h.length; t;) {
                    for (c = h, h = []; ++d < t;) c && c[d].run();
                    d = -1, t = h.length
                }
                c = null, l = !1, function (e) {
                    if (i === clearTimeout) return clearTimeout(e);
                    if ((i === a || !i) && clearTimeout) return i = clearTimeout, clearTimeout(e);
                    try {
                        i(e)
                    } catch (t) {
                        try {
                            return i.call(null, e)
                        } catch (t) {
                            return i.call(this, e)
                        }
                    }
                }(e)
            }
        }

        function g(e, t) {
            this.fun = e, this.array = t
        }

        function m() {
        }

        s.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            h.push(new g(e, t)), 1 !== h.length || l || u(p)
        }, g.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, s.title = "browser", s.browser = !0, s.env = {}, s.argv = [], s.version = "", s.versions = {}, s.on = m, s.addListener = m, s.once = m, s.off = m, s.removeListener = m, s.removeAllListeners = m, s.emit = m, s.prependListener = m, s.prependOnceListener = m, s.listeners = function (e) {
            return []
        }, s.binding = function (e) {
            throw new Error("process.binding is not supported")
        }, s.cwd = function () {
            return "/"
        }, s.chdir = function (e) {
            throw new Error("process.chdir is not supported")
        }, s.umask = function () {
            return 0
        }
    }, {}],
    24: [function (e, t, n) {
        (function (n, r) {
            "use strict";
            var i = 65536, s = 4294967295;
            var o = e("safe-buffer").Buffer, a = r.crypto || r.msCrypto;
            a && a.getRandomValues ? t.exports = function (e, t) {
                if (e > s) throw new RangeError("requested too many random bytes");
                var r = o.allocUnsafe(e);
                if (e > 0) if (e > i) for (var u = 0; u < e; u += i) a.getRandomValues(r.slice(u, u + i)); else a.getRandomValues(r);
                if ("function" == typeof t) return n.nextTick(function () {
                    t(null, r)
                });
                return r
            } : t.exports = function () {
                throw new Error("Secure random number generation is not supported by this browser.\nUse Chrome, Firefox or Internet Explorer 11")
            }
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {_process: 23, "safe-buffer": 41}],
    25: [function (e, t, n) {
        "use strict";
        var r = {};

        function i(e, t, n) {
            n || (n = Error);
            var i = function (e) {
                var n, r;

                function i(n, r, i) {
                    return e.call(this, function (e, n, r) {
                        return "string" == typeof t ? t : t(e, n, r)
                    }(n, r, i)) || this
                }

                return r = e, (n = i).prototype = Object.create(r.prototype), n.prototype.constructor = n, n.__proto__ = r, i
            }(n);
            i.prototype.name = n.name, i.prototype.code = e, r[e] = i
        }

        function s(e, t) {
            if (Array.isArray(e)) {
                var n = e.length;
                return e = e.map(function (e) {
                    return String(e)
                }), n > 2 ? "one of ".concat(t, " ").concat(e.slice(0, n - 1).join(", "), ", or ") + e[n - 1] : 2 === n ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0])
            }
            return "of ".concat(t, " ").concat(String(e))
        }

        i("ERR_INVALID_OPT_VALUE", function (e, t) {
            return 'The value "' + t + '" is invalid for option "' + e + '"'
        }, TypeError), i("ERR_INVALID_ARG_TYPE", function (e, t, n) {
            var r, i, o, a;
            if ("string" == typeof t && (i = "not ", t.substr(!o || o < 0 ? 0 : +o, i.length) === i) ? (r = "must not be", t = t.replace(/^not /, "")) : r = "must be", function (e, t, n) {
                return (void 0 === n || n > e.length) && (n = e.length), e.substring(n - t.length, n) === t
            }(e, " argument")) a = "The ".concat(e, " ").concat(r, " ").concat(s(t, "type")); else {
                var u = function (e, t, n) {
                    return "number" != typeof n && (n = 0), !(n + t.length > e.length) && -1 !== e.indexOf(t, n)
                }(e, ".") ? "property" : "argument";
                a = 'The "'.concat(e, '" ').concat(u, " ").concat(r, " ").concat(s(t, "type"))
            }
            return a += ". Received type ".concat(typeof n)
        }, TypeError), i("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF"), i("ERR_METHOD_NOT_IMPLEMENTED", function (e) {
            return "The " + e + " method is not implemented"
        }), i("ERR_STREAM_PREMATURE_CLOSE", "Premature close"), i("ERR_STREAM_DESTROYED", function (e) {
            return "Cannot call " + e + " after a stream was destroyed"
        }), i("ERR_MULTIPLE_CALLBACK", "Callback called multiple times"), i("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable"), i("ERR_STREAM_WRITE_AFTER_END", "write after end"), i("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), i("ERR_UNKNOWN_ENCODING", function (e) {
            return "Unknown encoding: " + e
        }, TypeError), i("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event"), t.exports.codes = r
    }, {}],
    26: [function (e, t, n) {
        (function (e) {
            "use strict";
            var n = new Set;
            t.exports.emitExperimentalWarning = e.emitWarning ? function (t) {
                if (!n.has(t)) {
                    var r = t + " is an experimental feature. This feature could change at any time";
                    n.add(t), e.emitWarning(r, "ExperimentalWarning")
                }
            } : function () {
            }
        }).call(this, e("_process"))
    }, {_process: 23}],
    27: [function (e, t, n) {
        (function (n) {
            "use strict";
            var r = Object.keys || function (e) {
                var t = [];
                for (var n in e) t.push(n);
                return t
            };
            t.exports = c;
            var i = e("./_stream_readable"), s = e("./_stream_writable");
            e("inherits")(c, i);
            for (var o = r(s.prototype), a = 0; a < o.length; a++) {
                var u = o[a];
                c.prototype[u] || (c.prototype[u] = s.prototype[u])
            }

            function c(e) {
                if (!(this instanceof c)) return new c(e);
                i.call(this, e), s.call(this, e), this.allowHalfOpen = !0, e && (!1 === e.readable && (this.readable = !1), !1 === e.writable && (this.writable = !1), !1 === e.allowHalfOpen && (this.allowHalfOpen = !1, this.once("end", h)))
            }

            function h() {
                this._writableState.ended || n.nextTick(l, this)
            }

            function l(e) {
                e.end()
            }

            Object.defineProperty(c.prototype, "writableHighWaterMark", {
                enumerable: !1, get: function () {
                    return this._writableState.highWaterMark
                }
            }), Object.defineProperty(c.prototype, "writableBuffer", {
                enumerable: !1, get: function () {
                    return this._writableState && this._writableState.getBuffer()
                }
            }), Object.defineProperty(c.prototype, "writableLength", {
                enumerable: !1, get: function () {
                    return this._writableState.length
                }
            }), Object.defineProperty(c.prototype, "destroyed", {
                enumerable: !1, get: function () {
                    return void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed && this._writableState.destroyed)
                }, set: function (e) {
                    void 0 !== this._readableState && void 0 !== this._writableState && (this._readableState.destroyed = e, this._writableState.destroyed = e)
                }
            })
        }).call(this, e("_process"))
    }, {"./_stream_readable": 29, "./_stream_writable": 31, _process: 23, inherits: 20}],
    28: [function (e, t, n) {
        "use strict";
        t.exports = i;
        var r = e("./_stream_transform");

        function i(e) {
            if (!(this instanceof i)) return new i(e);
            r.call(this, e)
        }

        e("inherits")(i, r), i.prototype._transform = function (e, t, n) {
            n(null, e)
        }
    }, {"./_stream_transform": 30, inherits: 20}],
    29: [function (e, t, n) {
        (function (n, r) {
            "use strict";
            var i;
            t.exports = C, C.ReadableState = E;
            e("events").EventEmitter;
            var s = function (e, t) {
                return e.listeners(t).length
            }, o = e("./internal/streams/stream"), a = e("buffer").Buffer, u = r.Uint8Array || function () {
            };
            var c, h = e("util");
            c = h && h.debuglog ? h.debuglog("stream") : function () {
            };
            var l, d, f = e("./internal/streams/buffer_list"), p = e("./internal/streams/destroy"),
                g = e("./internal/streams/state").getHighWaterMark, m = e("../errors").codes,
                y = m.ERR_INVALID_ARG_TYPE, b = m.ERR_STREAM_PUSH_AFTER_EOF, w = m.ERR_METHOD_NOT_IMPLEMENTED,
                _ = m.ERR_STREAM_UNSHIFT_AFTER_END_EVENT, v = e("../experimentalWarning").emitExperimentalWarning;
            e("inherits")(C, o);
            var S = ["error", "close", "destroy", "pause", "resume"];

            function E(t, n, r) {
                i = i || e("./_stream_duplex"), t = t || {}, "boolean" != typeof r && (r = n instanceof i), this.objectMode = !!t.objectMode, r && (this.objectMode = this.objectMode || !!t.readableObjectMode), this.highWaterMark = g(this, t, "readableHighWaterMark", r), this.buffer = new f, this.length = 0, this.pipes = null, this.pipesCount = 0, this.flowing = null, this.ended = !1, this.endEmitted = !1, this.reading = !1, this.sync = !0, this.needReadable = !1, this.emittedReadable = !1, this.readableListening = !1, this.resumeScheduled = !1, this.paused = !0, this.emitClose = !1 !== t.emitClose, this.destroyed = !1, this.defaultEncoding = t.defaultEncoding || "utf8", this.awaitDrain = 0, this.readingMore = !1, this.decoder = null, this.encoding = null, t.encoding && (l || (l = e("string_decoder/").StringDecoder), this.decoder = new l(t.encoding), this.encoding = t.encoding)
            }

            function C(t) {
                if (i = i || e("./_stream_duplex"), !(this instanceof C)) return new C(t);
                var n = this instanceof i;
                this._readableState = new E(t, this, n), this.readable = !0, t && ("function" == typeof t.read && (this._read = t.read), "function" == typeof t.destroy && (this._destroy = t.destroy)), o.call(this)
            }

            function T(e, t, n, r, i) {
                c("readableAddChunk", t);
                var s, o = e._readableState;
                if (null === t) o.reading = !1, function (e, t) {
                    if (t.ended) return;
                    if (t.decoder) {
                        var n = t.decoder.end();
                        n && n.length && (t.buffer.push(n), t.length += t.objectMode ? 1 : n.length)
                    }
                    t.ended = !0, t.sync ? M(e) : (t.needReadable = !1, t.emittedReadable || (t.emittedReadable = !0, I(e)))
                }(e, o); else if (i || (s = function (e, t) {
                    var n;
                    r = t, a.isBuffer(r) || r instanceof u || "string" == typeof t || void 0 === t || e.objectMode || (n = new y("chunk", ["string", "Buffer", "Uint8Array"], t));
                    var r;
                    return n
                }(o, t)), s) e.emit("error", s); else if (o.objectMode || t && t.length > 0) if ("string" == typeof t || o.objectMode || Object.getPrototypeOf(t) === a.prototype || (t = function (e) {
                    return a.from(e)
                }(t)), r) o.endEmitted ? e.emit("error", new _) : R(e, o, t, !0); else if (o.ended) e.emit("error", new b); else {
                    if (o.destroyed) return !1;
                    o.reading = !1, o.decoder && !n ? (t = o.decoder.write(t), o.objectMode || 0 !== t.length ? R(e, o, t, !1) : P(e, o)) : R(e, o, t, !1)
                } else r || (o.reading = !1, P(e, o));
                return !o.ended && (o.length < o.highWaterMark || 0 === o.length)
            }

            function R(e, t, n, r) {
                t.flowing && 0 === t.length && !t.sync ? (t.awaitDrain = 0, e.emit("data", n)) : (t.length += t.objectMode ? 1 : n.length, r ? t.buffer.unshift(n) : t.buffer.push(n), t.needReadable && M(e)), P(e, t)
            }

            Object.defineProperty(C.prototype, "destroyed", {
                enumerable: !1, get: function () {
                    return void 0 !== this._readableState && this._readableState.destroyed
                }, set: function (e) {
                    this._readableState && (this._readableState.destroyed = e)
                }
            }), C.prototype.destroy = p.destroy, C.prototype._undestroy = p.undestroy, C.prototype._destroy = function (e, t) {
                t(e)
            }, C.prototype.push = function (e, t) {
                var n, r = this._readableState;
                return r.objectMode ? n = !0 : "string" == typeof e && ((t = t || r.defaultEncoding) !== r.encoding && (e = a.from(e, t), t = ""), n = !0), T(this, e, t, !1, n)
            }, C.prototype.unshift = function (e) {
                return T(this, e, null, !0, !1)
            }, C.prototype.isPaused = function () {
                return !1 === this._readableState.flowing
            }, C.prototype.setEncoding = function (t) {
                return l || (l = e("string_decoder/").StringDecoder), this._readableState.decoder = new l(t), this._readableState.encoding = this._readableState.decoder.encoding, this
            };
            var k = 8388608;

            function A(e, t) {
                return e <= 0 || 0 === t.length && t.ended ? 0 : t.objectMode ? 1 : e != e ? t.flowing && t.length ? t.buffer.head.data.length : t.length : (e > t.highWaterMark && (t.highWaterMark = function (e) {
                    return e >= k ? e = k : (e--, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, e |= e >>> 16, e++), e
                }(e)), e <= t.length ? e : t.ended ? t.length : (t.needReadable = !0, 0))
            }

            function M(e) {
                var t = e._readableState;
                t.needReadable = !1, t.emittedReadable || (c("emitReadable", t.flowing), t.emittedReadable = !0, n.nextTick(I, e))
            }

            function I(e) {
                var t = e._readableState;
                c("emitReadable_", t.destroyed, t.length, t.ended), t.destroyed || !t.length && !t.ended || e.emit("readable"), t.needReadable = !t.flowing && !t.ended && t.length <= t.highWaterMark, B(e)
            }

            function P(e, t) {
                t.readingMore || (t.readingMore = !0, n.nextTick(x, e, t))
            }

            function x(e, t) {
                for (; !t.reading && !t.ended && (t.length < t.highWaterMark || t.flowing && 0 === t.length);) {
                    var n = t.length;
                    if (c("maybeReadMore read 0"), e.read(0), n === t.length) break
                }
                t.readingMore = !1
            }

            function O(e) {
                var t = e._readableState;
                t.readableListening = e.listenerCount("readable") > 0, t.resumeScheduled && !t.paused ? t.flowing = !0 : e.listenerCount("data") > 0 && e.resume()
            }

            function L(e) {
                c("readable nexttick read 0"), e.read(0)
            }

            function D(e, t) {
                c("resume", t.reading), t.reading || e.read(0), t.resumeScheduled = !1, e.emit("resume"), B(e), t.flowing && !t.reading && e.read(0)
            }

            function B(e) {
                var t = e._readableState;
                for (c("flow", t.flowing); t.flowing && null !== e.read();) ;
            }

            function N(e, t) {
                return 0 === t.length ? null : (t.objectMode ? n = t.buffer.shift() : !e || e >= t.length ? (n = t.decoder ? t.buffer.join("") : 1 === t.buffer.length ? t.buffer.first() : t.buffer.concat(t.length), t.buffer.clear()) : n = t.buffer.consume(e, t.decoder), n);
                var n
            }

            function U(e) {
                var t = e._readableState;
                c("endReadable", t.endEmitted), t.endEmitted || (t.ended = !0, n.nextTick(j, t, e))
            }

            function j(e, t) {
                c("endReadableNT", e.endEmitted, e.length), e.endEmitted || 0 !== e.length || (e.endEmitted = !0, t.readable = !1, t.emit("end"))
            }

            function F(e, t) {
                for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
                return -1
            }

            C.prototype.read = function (e) {
                c("read", e), e = parseInt(e, 10);
                var t = this._readableState, n = e;
                if (0 !== e && (t.emittedReadable = !1), 0 === e && t.needReadable && ((0 !== t.highWaterMark ? t.length >= t.highWaterMark : t.length > 0) || t.ended)) return c("read: emitReadable", t.length, t.ended), 0 === t.length && t.ended ? U(this) : M(this), null;
                if (0 === (e = A(e, t)) && t.ended) return 0 === t.length && U(this), null;
                var r, i = t.needReadable;
                return c("need readable", i), (0 === t.length || t.length - e < t.highWaterMark) && c("length less than watermark", i = !0), t.ended || t.reading ? c("reading or ended", i = !1) : i && (c("do read"), t.reading = !0, t.sync = !0, 0 === t.length && (t.needReadable = !0), this._read(t.highWaterMark), t.sync = !1, t.reading || (e = A(n, t))), null === (r = e > 0 ? N(e, t) : null) ? (t.needReadable = !0, e = 0) : (t.length -= e, t.awaitDrain = 0), 0 === t.length && (t.ended || (t.needReadable = !0), n !== e && t.ended && U(this)), null !== r && this.emit("data", r), r
            }, C.prototype._read = function (e) {
                this.emit("error", new w("_read()"))
            }, C.prototype.pipe = function (e, t) {
                var r = this, i = this._readableState;
                switch (i.pipesCount) {
                    case 0:
                        i.pipes = e;
                        break;
                    case 1:
                        i.pipes = [i.pipes, e];
                        break;
                    default:
                        i.pipes.push(e)
                }
                i.pipesCount += 1, c("pipe count=%d opts=%j", i.pipesCount, t);
                var o = (!t || !1 !== t.end) && e !== n.stdout && e !== n.stderr ? u : m;

                function a(t, n) {
                    c("onunpipe"), t === r && n && !1 === n.hasUnpiped && (n.hasUnpiped = !0, c("cleanup"), e.removeListener("close", p), e.removeListener("finish", g), e.removeListener("drain", h), e.removeListener("error", f), e.removeListener("unpipe", a), r.removeListener("end", u), r.removeListener("end", m), r.removeListener("data", d), l = !0, !i.awaitDrain || e._writableState && !e._writableState.needDrain || h())
                }

                function u() {
                    c("onend"), e.end()
                }

                i.endEmitted ? n.nextTick(o) : r.once("end", o), e.on("unpipe", a);
                var h = function (e) {
                    return function () {
                        var t = e._readableState;
                        c("pipeOnDrain", t.awaitDrain), t.awaitDrain && t.awaitDrain--, 0 === t.awaitDrain && s(e, "data") && (t.flowing = !0, B(e))
                    }
                }(r);
                e.on("drain", h);
                var l = !1;

                function d(t) {
                    c("ondata");
                    var n = e.write(t);
                    c("dest.write", n), !1 === n && ((1 === i.pipesCount && i.pipes === e || i.pipesCount > 1 && -1 !== F(i.pipes, e)) && !l && (c("false write response, pause", i.awaitDrain), i.awaitDrain++), r.pause())
                }

                function f(t) {
                    c("onerror", t), m(), e.removeListener("error", f), 0 === s(e, "error") && e.emit("error", t)
                }

                function p() {
                    e.removeListener("finish", g), m()
                }

                function g() {
                    c("onfinish"), e.removeListener("close", p), m()
                }

                function m() {
                    c("unpipe"), r.unpipe(e)
                }

                return r.on("data", d), function (e, t, n) {
                    if ("function" == typeof e.prependListener) return e.prependListener(t, n);
                    e._events && e._events[t] ? Array.isArray(e._events[t]) ? e._events[t].unshift(n) : e._events[t] = [n, e._events[t]] : e.on(t, n)
                }(e, "error", f), e.once("close", p), e.once("finish", g), e.emit("pipe", r), i.flowing || (c("pipe resume"), r.resume()), e
            }, C.prototype.unpipe = function (e) {
                var t = this._readableState, n = {hasUnpiped: !1};
                if (0 === t.pipesCount) return this;
                if (1 === t.pipesCount) return e && e !== t.pipes ? this : (e || (e = t.pipes), t.pipes = null, t.pipesCount = 0, t.flowing = !1, e && e.emit("unpipe", this, n), this);
                if (!e) {
                    var r = t.pipes, i = t.pipesCount;
                    t.pipes = null, t.pipesCount = 0, t.flowing = !1;
                    for (var s = 0; s < i; s++) r[s].emit("unpipe", this, {hasUnpiped: !1});
                    return this
                }
                var o = F(t.pipes, e);
                return -1 === o ? this : (t.pipes.splice(o, 1), t.pipesCount -= 1, 1 === t.pipesCount && (t.pipes = t.pipes[0]), e.emit("unpipe", this, n), this)
            }, C.prototype.on = function (e, t) {
                var r = o.prototype.on.call(this, e, t), i = this._readableState;
                return "data" === e ? (i.readableListening = this.listenerCount("readable") > 0, !1 !== i.flowing && this.resume()) : "readable" === e && (i.endEmitted || i.readableListening || (i.readableListening = i.needReadable = !0, i.flowing = !1, i.emittedReadable = !1, c("on readable", i.length, i.reading), i.length ? M(this) : i.reading || n.nextTick(L, this))), r
            }, C.prototype.addListener = C.prototype.on, C.prototype.removeListener = function (e, t) {
                var r = o.prototype.removeListener.call(this, e, t);
                return "readable" === e && n.nextTick(O, this), r
            }, C.prototype.removeAllListeners = function (e) {
                var t = o.prototype.removeAllListeners.apply(this, arguments);
                return "readable" !== e && void 0 !== e || n.nextTick(O, this), t
            }, C.prototype.resume = function () {
                var e = this._readableState;
                return e.flowing || (c("resume"), e.flowing = !e.readableListening, function (e, t) {
                    t.resumeScheduled || (t.resumeScheduled = !0, n.nextTick(D, e, t))
                }(this, e)), e.paused = !1, this
            }, C.prototype.pause = function () {
                return c("call pause flowing=%j", this._readableState.flowing), !1 !== this._readableState.flowing && (c("pause"), this._readableState.flowing = !1, this.emit("pause")), this._readableState.paused = !0, this
            }, C.prototype.wrap = function (e) {
                var t = this, n = this._readableState, r = !1;
                for (var i in e.on("end", function () {
                    if (c("wrapped end"), n.decoder && !n.ended) {
                        var e = n.decoder.end();
                        e && e.length && t.push(e)
                    }
                    t.push(null)
                }), e.on("data", function (i) {
                    (c("wrapped data"), n.decoder && (i = n.decoder.write(i)), n.objectMode && null == i) || (n.objectMode || i && i.length) && (t.push(i) || (r = !0, e.pause()))
                }), e) void 0 === this[i] && "function" == typeof e[i] && (this[i] = function (t) {
                    return function () {
                        return e[t].apply(e, arguments)
                    }
                }(i));
                for (var s = 0; s < S.length; s++) e.on(S[s], this.emit.bind(this, S[s]));
                return this._read = function (t) {
                    c("wrapped _read", t), r && (r = !1, e.resume())
                }, this
            }, "function" == typeof Symbol && (C.prototype[Symbol.asyncIterator] = function () {
                return v("Readable[Symbol.asyncIterator]"), void 0 === d && (d = e("./internal/streams/async_iterator")), d(this)
            }), Object.defineProperty(C.prototype, "readableHighWaterMark", {
                enumerable: !1, get: function () {
                    return this._readableState.highWaterMark
                }
            }), Object.defineProperty(C.prototype, "readableBuffer", {
                enumerable: !1, get: function () {
                    return this._readableState && this._readableState.buffer
                }
            }), Object.defineProperty(C.prototype, "readableFlowing", {
                enumerable: !1, get: function () {
                    return this._readableState.flowing
                }, set: function (e) {
                    this._readableState && (this._readableState.flowing = e)
                }
            }), C._fromList = N, Object.defineProperty(C.prototype, "readableLength", {
                enumerable: !1,
                get: function () {
                    return this._readableState.length
                }
            })
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "../errors": 25,
        "../experimentalWarning": 26,
        "./_stream_duplex": 27,
        "./internal/streams/async_iterator": 32,
        "./internal/streams/buffer_list": 33,
        "./internal/streams/destroy": 34,
        "./internal/streams/state": 37,
        "./internal/streams/stream": 38,
        _process: 23,
        buffer: 16,
        events: "events",
        inherits: 20,
        "string_decoder/": 46,
        util: 15
    }],
    30: [function (e, t, n) {
        "use strict";
        t.exports = h;
        var r = e("../errors").codes, i = r.ERR_METHOD_NOT_IMPLEMENTED, s = r.ERR_MULTIPLE_CALLBACK,
            o = r.ERR_TRANSFORM_ALREADY_TRANSFORMING, a = r.ERR_TRANSFORM_WITH_LENGTH_0, u = e("./_stream_duplex");

        function c(e, t) {
            var n = this._transformState;
            n.transforming = !1;
            var r = n.writecb;
            if (null === r) return this.emit("error", new s);
            n.writechunk = null, n.writecb = null, null != t && this.push(t), r(e);
            var i = this._readableState;
            i.reading = !1, (i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
        }

        function h(e) {
            if (!(this instanceof h)) return new h(e);
            u.call(this, e), this._transformState = {
                afterTransform: c.bind(this),
                needTransform: !1,
                transforming: !1,
                writecb: null,
                writechunk: null,
                writeencoding: null
            }, this._readableState.needReadable = !0, this._readableState.sync = !1, e && ("function" == typeof e.transform && (this._transform = e.transform), "function" == typeof e.flush && (this._flush = e.flush)), this.on("prefinish", l)
        }

        function l() {
            var e = this;
            "function" != typeof this._flush || this._readableState.destroyed ? d(this, null, null) : this._flush(function (t, n) {
                d(e, t, n)
            })
        }

        function d(e, t, n) {
            if (t) return e.emit("error", t);
            if (null != n && e.push(n), e._writableState.length) throw new a;
            if (e._transformState.transforming) throw new o;
            return e.push(null)
        }

        e("inherits")(h, u), h.prototype.push = function (e, t) {
            return this._transformState.needTransform = !1, u.prototype.push.call(this, e, t)
        }, h.prototype._transform = function (e, t, n) {
            n(new i("_transform()"))
        }, h.prototype._write = function (e, t, n) {
            var r = this._transformState;
            if (r.writecb = n, r.writechunk = e, r.writeencoding = t, !r.transforming) {
                var i = this._readableState;
                (r.needTransform || i.needReadable || i.length < i.highWaterMark) && this._read(i.highWaterMark)
            }
        }, h.prototype._read = function (e) {
            var t = this._transformState;
            null === t.writechunk || t.transforming ? t.needTransform = !0 : (t.transforming = !0, this._transform(t.writechunk, t.writeencoding, t.afterTransform))
        }, h.prototype._destroy = function (e, t) {
            u.prototype._destroy.call(this, e, function (e) {
                t(e)
            })
        }
    }, {"../errors": 25, "./_stream_duplex": 27, inherits: 20}],
    31: [function (e, t, n) {
        (function (n, r) {
            "use strict";

            function i(e) {
                var t = this;
                this.next = null, this.entry = null, this.finish = function () {
                    !function (e, t, n) {
                        var r = e.entry;
                        e.entry = null;
                        for (; r;) {
                            var i = r.callback;
                            t.pendingcb--, i(n), r = r.next
                        }
                        t.corkedRequestsFree.next = e
                    }(t, e)
                }
            }

            var s;
            t.exports = C, C.WritableState = E;
            var o = {deprecate: e("util-deprecate")}, a = e("./internal/streams/stream"), u = e("buffer").Buffer,
                c = r.Uint8Array || function () {
                };
            var h, l = e("./internal/streams/destroy"), d = e("./internal/streams/state").getHighWaterMark,
                f = e("../errors").codes, p = f.ERR_INVALID_ARG_TYPE, g = f.ERR_METHOD_NOT_IMPLEMENTED,
                m = f.ERR_MULTIPLE_CALLBACK, y = f.ERR_STREAM_CANNOT_PIPE, b = f.ERR_STREAM_DESTROYED,
                w = f.ERR_STREAM_NULL_VALUES, _ = f.ERR_STREAM_WRITE_AFTER_END, v = f.ERR_UNKNOWN_ENCODING;

            function S() {
            }

            function E(t, r, o) {
                s = s || e("./_stream_duplex"), t = t || {}, "boolean" != typeof o && (o = r instanceof s), this.objectMode = !!t.objectMode, o && (this.objectMode = this.objectMode || !!t.writableObjectMode), this.highWaterMark = d(this, t, "writableHighWaterMark", o), this.finalCalled = !1, this.needDrain = !1, this.ending = !1, this.ended = !1, this.finished = !1, this.destroyed = !1;
                var a = !1 === t.decodeStrings;
                this.decodeStrings = !a, this.defaultEncoding = t.defaultEncoding || "utf8", this.length = 0, this.writing = !1, this.corked = 0, this.sync = !0, this.bufferProcessing = !1, this.onwrite = function (e) {
                    !function (e, t) {
                        var r = e._writableState, i = r.sync, s = r.writecb;
                        if ("function" != typeof s) throw new m;
                        if (function (e) {
                            e.writing = !1, e.writecb = null, e.length -= e.writelen, e.writelen = 0
                        }(r), t) !function (e, t, r, i, s) {
                            --t.pendingcb, r ? (n.nextTick(s, i), n.nextTick(I, e, t), e._writableState.errorEmitted = !0, e.emit("error", i)) : (s(i), e._writableState.errorEmitted = !0, e.emit("error", i), I(e, t))
                        }(e, r, i, t, s); else {
                            var o = A(r) || e.destroyed;
                            o || r.corked || r.bufferProcessing || !r.bufferedRequest || k(e, r), i ? n.nextTick(R, e, r, o, s) : R(e, r, o, s)
                        }
                    }(r, e)
                }, this.writecb = null, this.writelen = 0, this.bufferedRequest = null, this.lastBufferedRequest = null, this.pendingcb = 0, this.prefinished = !1, this.errorEmitted = !1, this.emitClose = !1 !== t.emitClose, this.bufferedRequestCount = 0, this.corkedRequestsFree = new i(this)
            }

            function C(t) {
                var n = this instanceof (s = s || e("./_stream_duplex"));
                if (!n && !h.call(C, this)) return new C(t);
                this._writableState = new E(t, this, n), this.writable = !0, t && ("function" == typeof t.write && (this._write = t.write), "function" == typeof t.writev && (this._writev = t.writev), "function" == typeof t.destroy && (this._destroy = t.destroy), "function" == typeof t.final && (this._final = t.final)), a.call(this)
            }

            function T(e, t, n, r, i, s, o) {
                t.writelen = r, t.writecb = o, t.writing = !0, t.sync = !0, t.destroyed ? t.onwrite(new b("write")) : n ? e._writev(i, t.onwrite) : e._write(i, s, t.onwrite), t.sync = !1
            }

            function R(e, t, n, r) {
                n || function (e, t) {
                    0 === t.length && t.needDrain && (t.needDrain = !1, e.emit("drain"))
                }(e, t), t.pendingcb--, r(), I(e, t)
            }

            function k(e, t) {
                t.bufferProcessing = !0;
                var n = t.bufferedRequest;
                if (e._writev && n && n.next) {
                    var r = t.bufferedRequestCount, s = new Array(r), o = t.corkedRequestsFree;
                    o.entry = n;
                    for (var a = 0, u = !0; n;) s[a] = n, n.isBuf || (u = !1), n = n.next, a += 1;
                    s.allBuffers = u, T(e, t, !0, t.length, s, "", o.finish), t.pendingcb++, t.lastBufferedRequest = null, o.next ? (t.corkedRequestsFree = o.next, o.next = null) : t.corkedRequestsFree = new i(t), t.bufferedRequestCount = 0
                } else {
                    for (; n;) {
                        var c = n.chunk, h = n.encoding, l = n.callback;
                        if (T(e, t, !1, t.objectMode ? 1 : c.length, c, h, l), n = n.next, t.bufferedRequestCount--, t.writing) break
                    }
                    null === n && (t.lastBufferedRequest = null)
                }
                t.bufferedRequest = n, t.bufferProcessing = !1
            }

            function A(e) {
                return e.ending && 0 === e.length && null === e.bufferedRequest && !e.finished && !e.writing
            }

            function M(e, t) {
                e._final(function (n) {
                    t.pendingcb--, n && e.emit("error", n), t.prefinished = !0, e.emit("prefinish"), I(e, t)
                })
            }

            function I(e, t) {
                var r = A(t);
                return r && (!function (e, t) {
                    t.prefinished || t.finalCalled || ("function" != typeof e._final || t.destroyed ? (t.prefinished = !0, e.emit("prefinish")) : (t.pendingcb++, t.finalCalled = !0, n.nextTick(M, e, t)))
                }(e, t), 0 === t.pendingcb && (t.finished = !0, e.emit("finish"))), r
            }

            e("inherits")(C, a), E.prototype.getBuffer = function () {
                for (var e = this.bufferedRequest, t = []; e;) t.push(e), e = e.next;
                return t
            }, function () {
                try {
                    Object.defineProperty(E.prototype, "buffer", {
                        get: o.deprecate(function () {
                            return this.getBuffer()
                        }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
                    })
                } catch (e) {
                }
            }(), "function" == typeof Symbol && Symbol.hasInstance && "function" == typeof Function.prototype[Symbol.hasInstance] ? (h = Function.prototype[Symbol.hasInstance], Object.defineProperty(C, Symbol.hasInstance, {
                value: function (e) {
                    return !!h.call(this, e) || this === C && (e && e._writableState instanceof E)
                }
            })) : h = function (e) {
                return e instanceof this
            }, C.prototype.pipe = function () {
                this.emit("error", new y)
            }, C.prototype.write = function (e, t, r) {
                var i, s = this._writableState, o = !1, a = !s.objectMode && (i = e, u.isBuffer(i) || i instanceof c);
                return a && !u.isBuffer(e) && (e = function (e) {
                    return u.from(e)
                }(e)), "function" == typeof t && (r = t, t = null), a ? t = "buffer" : t || (t = s.defaultEncoding), "function" != typeof r && (r = S), s.ending ? function (e, t) {
                    var r = new _;
                    e.emit("error", r), n.nextTick(t, r)
                }(this, r) : (a || function (e, t, r, i) {
                    var s;
                    return null === r ? s = new w : "string" == typeof r || t.objectMode || (s = new p("chunk", ["string", "Buffer"], r)), !s || (e.emit("error", s), n.nextTick(i, s), !1)
                }(this, s, e, r)) && (s.pendingcb++, o = function (e, t, n, r, i, s) {
                    if (!n) {
                        var o = function (e, t, n) {
                            e.objectMode || !1 === e.decodeStrings || "string" != typeof t || (t = u.from(t, n));
                            return t
                        }(t, r, i);
                        r !== o && (n = !0, i = "buffer", r = o)
                    }
                    var a = t.objectMode ? 1 : r.length;
                    t.length += a;
                    var c = t.length < t.highWaterMark;
                    c || (t.needDrain = !0);
                    if (t.writing || t.corked) {
                        var h = t.lastBufferedRequest;
                        t.lastBufferedRequest = {
                            chunk: r,
                            encoding: i,
                            isBuf: n,
                            callback: s,
                            next: null
                        }, h ? h.next = t.lastBufferedRequest : t.bufferedRequest = t.lastBufferedRequest, t.bufferedRequestCount += 1
                    } else T(e, t, !1, a, r, i, s);
                    return c
                }(this, s, a, e, t, r)), o
            }, C.prototype.cork = function () {
                this._writableState.corked++
            }, C.prototype.uncork = function () {
                var e = this._writableState;
                e.corked && (e.corked--, e.writing || e.corked || e.bufferProcessing || !e.bufferedRequest || k(this, e))
            }, C.prototype.setDefaultEncoding = function (e) {
                if ("string" == typeof e && (e = e.toLowerCase()), !(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1)) throw new v(e);
                return this._writableState.defaultEncoding = e, this
            }, Object.defineProperty(C.prototype, "writableBuffer", {
                enumerable: !1, get: function () {
                    return this._writableState && this._writableState.getBuffer()
                }
            }), Object.defineProperty(C.prototype, "writableHighWaterMark", {
                enumerable: !1, get: function () {
                    return this._writableState.highWaterMark
                }
            }), C.prototype._write = function (e, t, n) {
                n(new g("_write()"))
            }, C.prototype._writev = null, C.prototype.end = function (e, t, r) {
                var i = this._writableState;
                return "function" == typeof e ? (r = e, e = null, t = null) : "function" == typeof t && (r = t, t = null), null != e && this.write(e, t), i.corked && (i.corked = 1, this.uncork()), i.ending || function (e, t, r) {
                    t.ending = !0, I(e, t), r && (t.finished ? n.nextTick(r) : e.once("finish", r));
                    t.ended = !0, e.writable = !1
                }(this, i, r), this
            }, Object.defineProperty(C.prototype, "writableLength", {
                enumerable: !1, get: function () {
                    return this._writableState.length
                }
            }), Object.defineProperty(C.prototype, "destroyed", {
                enumerable: !1, get: function () {
                    return void 0 !== this._writableState && this._writableState.destroyed
                }, set: function (e) {
                    this._writableState && (this._writableState.destroyed = e)
                }
            }), C.prototype.destroy = l.destroy, C.prototype._undestroy = l.undestroy, C.prototype._destroy = function (e, t) {
                t(e)
            }
        }).call(this, e("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "../errors": 25,
        "./_stream_duplex": 27,
        "./internal/streams/destroy": 34,
        "./internal/streams/state": 37,
        "./internal/streams/stream": 38,
        _process: 23,
        buffer: 16,
        inherits: 20,
        "util-deprecate": 48
    }],
    32: [function (e, t, n) {
        (function (n) {
            "use strict";
            var r;

            function i(e, t, n) {
                return t in e ? Object.defineProperty(e, t, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = n, e
            }

            var s = e("./end-of-stream"), o = Symbol("lastResolve"), a = Symbol("lastReject"), u = Symbol("error"),
                c = Symbol("ended"), h = Symbol("lastPromise"), l = Symbol("handlePromise"), d = Symbol("stream");

            function f(e, t) {
                return {value: e, done: t}
            }

            function p(e) {
                var t = e[o];
                if (null !== t) {
                    var n = e[d].read();
                    null !== n && (e[h] = null, e[o] = null, e[a] = null, t(f(n, !1)))
                }
            }

            function g(e) {
                n.nextTick(p, e)
            }

            var m = Object.getPrototypeOf(function () {
            }), y = Object.setPrototypeOf((i(r = {
                get stream() {
                    return this[d]
                }, next: function () {
                    var e = this, t = this[u];
                    if (null !== t) return Promise.reject(t);
                    if (this[c]) return Promise.resolve(f(void 0, !0));
                    if (this[d].destroyed) return new Promise(function (t, r) {
                        n.nextTick(function () {
                            e[u] ? r(e[u]) : t(f(void 0, !0))
                        })
                    });
                    var r, i = this[h];
                    if (i) r = new Promise(function (e, t) {
                        return function (n, r) {
                            e.then(function () {
                                t[c] ? n(f(void 0, !0)) : t[l](n, r)
                            }, r)
                        }
                    }(i, this)); else {
                        var s = this[d].read();
                        if (null !== s) return Promise.resolve(f(s, !1));
                        r = new Promise(this[l])
                    }
                    return this[h] = r, r
                }
            }, Symbol.asyncIterator, function () {
                return this
            }), i(r, "return", function () {
                var e = this;
                return new Promise(function (t, n) {
                    e[d].destroy(null, function (e) {
                        e ? n(e) : t(f(void 0, !0))
                    })
                })
            }), r), m);
            t.exports = function (e) {
                var t, n = Object.create(y, (i(t = {}, d, {value: e, writable: !0}), i(t, o, {
                    value: null,
                    writable: !0
                }), i(t, a, {value: null, writable: !0}), i(t, u, {
                    value: null,
                    writable: !0
                }), i(t, c, {value: e._readableState.endEmitted, writable: !0}), i(t, l, {
                    value: function (e, t) {
                        var r = n[d].read();
                        r ? (n[h] = null, n[o] = null, n[a] = null, e(f(r, !1))) : (n[o] = e, n[a] = t)
                    }, writable: !0
                }), t));
                return n[h] = null, s(e, function (e) {
                    if (e && "ERR_STREAM_PREMATURE_CLOSE" !== e.code) {
                        var t = n[a];
                        return null !== t && (n[h] = null, n[o] = null, n[a] = null, t(e)), void (n[u] = e)
                    }
                    var r = n[o];
                    null !== r && (n[h] = null, n[o] = null, n[a] = null, r(f(void 0, !0))), n[c] = !0
                }), e.on("readable", g.bind(null, n)), n
            }
        }).call(this, e("_process"))
    }, {"./end-of-stream": 35, _process: 23}],
    33: [function (e, t, n) {
        "use strict";

        function r(e, t, n) {
            return t in e ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = n, e
        }

        var i = e("buffer").Buffer, s = e("util").inspect, o = s && s.custom || "inspect";
        t.exports = function () {
            function e() {
                this.head = null, this.tail = null, this.length = 0
            }

            var t = e.prototype;
            return t.push = function (e) {
                var t = {data: e, next: null};
                this.length > 0 ? this.tail.next = t : this.head = t, this.tail = t, ++this.length
            }, t.unshift = function (e) {
                var t = {data: e, next: this.head};
                0 === this.length && (this.tail = t), this.head = t, ++this.length
            }, t.shift = function () {
                if (0 !== this.length) {
                    var e = this.head.data;
                    return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e
                }
            }, t.clear = function () {
                this.head = this.tail = null, this.length = 0
            }, t.join = function (e) {
                if (0 === this.length) return "";
                for (var t = this.head, n = "" + t.data; t = t.next;) n += e + t.data;
                return n
            }, t.concat = function (e) {
                if (0 === this.length) return i.alloc(0);
                for (var t, n, r, s = i.allocUnsafe(e >>> 0), o = this.head, a = 0; o;) t = o.data, n = s, r = a, i.prototype.copy.call(t, n, r), a += o.data.length, o = o.next;
                return s
            }, t.consume = function (e, t) {
                var n;
                return e < this.head.data.length ? (n = this.head.data.slice(0, e), this.head.data = this.head.data.slice(e)) : n = e === this.head.data.length ? this.shift() : t ? this._getString(e) : this._getBuffer(e), n
            }, t.first = function () {
                return this.head.data
            }, t._getString = function (e) {
                var t = this.head, n = 1, r = t.data;
                for (e -= r.length; t = t.next;) {
                    var i = t.data, s = e > i.length ? i.length : e;
                    if (s === i.length ? r += i : r += i.slice(0, e), 0 === (e -= s)) {
                        s === i.length ? (++n, t.next ? this.head = t.next : this.head = this.tail = null) : (this.head = t, t.data = i.slice(s));
                        break
                    }
                    ++n
                }
                return this.length -= n, r
            }, t._getBuffer = function (e) {
                var t = i.allocUnsafe(e), n = this.head, r = 1;
                for (n.data.copy(t), e -= n.data.length; n = n.next;) {
                    var s = n.data, o = e > s.length ? s.length : e;
                    if (s.copy(t, t.length - e, 0, o), 0 === (e -= o)) {
                        o === s.length ? (++r, n.next ? this.head = n.next : this.head = this.tail = null) : (this.head = n, n.data = s.slice(o));
                        break
                    }
                    ++r
                }
                return this.length -= r, t
            }, t[o] = function (e, t) {
                return s(this, function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {}, i = Object.keys(n);
                        "function" == typeof Object.getOwnPropertySymbols && (i = i.concat(Object.getOwnPropertySymbols(n).filter(function (e) {
                            return Object.getOwnPropertyDescriptor(n, e).enumerable
                        }))), i.forEach(function (t) {
                            r(e, t, n[t])
                        })
                    }
                    return e
                }({}, t, {depth: 0, customInspect: !1}))
            }, e
        }()
    }, {buffer: 16, util: 15}],
    34: [function (e, t, n) {
        (function (e) {
            "use strict";

            function n(e, t) {
                i(e, t), r(e)
            }

            function r(e) {
                e._writableState && !e._writableState.emitClose || e._readableState && !e._readableState.emitClose || e.emit("close")
            }

            function i(e, t) {
                e.emit("error", t)
            }

            t.exports = {
                destroy: function (t, s) {
                    var o = this, a = this._readableState && this._readableState.destroyed,
                        u = this._writableState && this._writableState.destroyed;
                    return a || u ? (s ? s(t) : !t || this._writableState && this._writableState.errorEmitted || e.nextTick(i, this, t), this) : (this._readableState && (this._readableState.destroyed = !0), this._writableState && (this._writableState.destroyed = !0), this._destroy(t || null, function (t) {
                        !s && t ? (e.nextTick(n, o, t), o._writableState && (o._writableState.errorEmitted = !0)) : s ? (e.nextTick(r, o), s(t)) : e.nextTick(r, o)
                    }), this)
                }, undestroy: function () {
                    this._readableState && (this._readableState.destroyed = !1, this._readableState.reading = !1, this._readableState.ended = !1, this._readableState.endEmitted = !1), this._writableState && (this._writableState.destroyed = !1, this._writableState.ended = !1, this._writableState.ending = !1, this._writableState.finalCalled = !1, this._writableState.prefinished = !1, this._writableState.finished = !1, this._writableState.errorEmitted = !1)
                }
            }
        }).call(this, e("_process"))
    }, {_process: 23}],
    35: [function (e, t, n) {
        "use strict";
        var r = e("../../../errors").codes.ERR_STREAM_PREMATURE_CLOSE;

        function i() {
        }

        t.exports = function e(t, n, s) {
            if ("function" == typeof n) return e(t, null, n);
            n || (n = {}), s = function (e) {
                var t = !1;
                return function () {
                    if (!t) {
                        t = !0;
                        for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++) r[i] = arguments[i];
                        e.apply(this, r)
                    }
                }
            }(s || i);
            var o = n.readable || !1 !== n.readable && t.readable, a = n.writable || !1 !== n.writable && t.writable,
                u = function () {
                    t.writable || h()
                }, c = t._writableState && t._writableState.finished, h = function () {
                    a = !1, c = !0, o || s.call(t)
                }, l = t._readableState && t._readableState.endEmitted, d = function () {
                    o = !1, l = !0, a || s.call(t)
                }, f = function (e) {
                    s.call(t, e)
                }, p = function () {
                    var e;
                    return o && !l ? (t._readableState && t._readableState.ended || (e = new r), s.call(t, e)) : a && !c ? (t._writableState && t._writableState.ended || (e = new r), s.call(t, e)) : void 0
                }, g = function () {
                    t.req.on("finish", h)
                };
            return !function (e) {
                return e.setHeader && "function" == typeof e.abort
            }(t) ? a && !t._writableState && (t.on("end", u), t.on("close", u)) : (t.on("complete", h), t.on("abort", p), t.req ? g() : t.on("request", g)), t.on("end", d), t.on("finish", h), !1 !== n.error && t.on("error", f), t.on("close", p), function () {
                t.removeListener("complete", h), t.removeListener("abort", p), t.removeListener("request", g), t.req && t.req.removeListener("finish", h), t.removeListener("end", u), t.removeListener("close", u), t.removeListener("finish", h), t.removeListener("end", d), t.removeListener("error", f), t.removeListener("close", p)
            }
        }
    }, {"../../../errors": 25}],
    36: [function (e, t, n) {
        "use strict";
        var r;
        var i = e("../../../errors").codes, s = i.ERR_MISSING_ARGS, o = i.ERR_STREAM_DESTROYED;

        function a(e) {
            if (e) throw e
        }

        function u(e) {
            e()
        }

        function c(e, t) {
            return e.pipe(t)
        }

        t.exports = function () {
            for (var t = arguments.length, n = new Array(t), i = 0; i < t; i++) n[i] = arguments[i];
            var h, l = function (e) {
                return e.length ? "function" != typeof e[e.length - 1] ? a : e.pop() : a
            }(n);
            if (Array.isArray(n[0]) && (n = n[0]), n.length < 2) throw new s("streams");
            var d = n.map(function (t, i) {
                var s = i < n.length - 1;
                return function (t, n, i, s) {
                    s = function (e) {
                        var t = !1;
                        return function () {
                            t || (t = !0, e.apply(void 0, arguments))
                        }
                    }(s);
                    var a = !1;
                    t.on("close", function () {
                        a = !0
                    }), void 0 === r && (r = e("./end-of-stream")), r(t, {readable: n, writable: i}, function (e) {
                        if (e) return s(e);
                        a = !0, s()
                    });
                    var u = !1;
                    return function (e) {
                        if (!a && !u) return u = !0, function (e) {
                            return e.setHeader && "function" == typeof e.abort
                        }(t) ? t.abort() : "function" == typeof t.destroy ? t.destroy() : void s(e || new o("pipe"))
                    }
                }(t, s, i > 0, function (e) {
                    h || (h = e), e && d.forEach(u), s || (d.forEach(u), l(h))
                })
            });
            return n.reduce(c)
        }
    }, {"../../../errors": 25, "./end-of-stream": 35}],
    37: [function (e, t, n) {
        "use strict";
        var r = e("../../../errors").codes.ERR_INVALID_OPT_VALUE;
        t.exports = {
            getHighWaterMark: function (e, t, n, i) {
                var s = function (e, t, n) {
                    return null != e.highWaterMark ? e.highWaterMark : t ? e[n] : null
                }(t, i, n);
                if (null != s) {
                    if (!isFinite(s) || Math.floor(s) !== s || s < 0) throw new r(i ? n : "highWaterMark", s);
                    return Math.floor(s)
                }
                return e.objectMode ? 16 : 16384
            }
        }
    }, {"../../../errors": 25}],
    38: [function (e, t, n) {
        t.exports = e("events").EventEmitter
    }, {events: "events"}],
    39: [function (e, t, n) {
        (n = t.exports = e("./lib/_stream_readable.js")).Stream = n, n.Readable = n, n.Writable = e("./lib/_stream_writable.js"), n.Duplex = e("./lib/_stream_duplex.js"), n.Transform = e("./lib/_stream_transform.js"), n.PassThrough = e("./lib/_stream_passthrough.js"), n.finished = e("./lib/internal/streams/end-of-stream.js"), n.pipeline = e("./lib/internal/streams/pipeline.js")
    }, {
        "./lib/_stream_duplex.js": 27,
        "./lib/_stream_passthrough.js": 28,
        "./lib/_stream_readable.js": 29,
        "./lib/_stream_transform.js": 30,
        "./lib/_stream_writable.js": 31,
        "./lib/internal/streams/end-of-stream.js": 35,
        "./lib/internal/streams/pipeline.js": 36
    }],
    40: [function (e, t, n) {
        (function (e) {
            t.exports = function (t, n) {
                var r, i, s, o = !0;
                Array.isArray(t) ? (r = [], i = t.length) : (s = Object.keys(t), r = {}, i = s.length);

                function a(t) {
                    function i() {
                        n && n(t, r), n = null
                    }

                    o ? e.nextTick(i) : i()
                }

                function u(e, t, n) {
                    r[e] = n, (0 == --i || t) && a(t)
                }

                i ? s ? s.forEach(function (e) {
                    t[e](function (t, n) {
                        u(e, t, n)
                    })
                }) : t.forEach(function (e, t) {
                    e(function (e, n) {
                        u(t, e, n)
                    })
                }) : a(null);
                o = !1
            }
        }).call(this, e("_process"))
    }, {_process: 23}],
    41: [function (e, t, n) {
        var r = e("buffer"), i = r.Buffer;

        function s(e, t) {
            for (var n in e) t[n] = e[n]
        }

        function o(e, t, n) {
            return i(e, t, n)
        }

        i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? t.exports = r : (s(r, n), n.Buffer = o), o.prototype = Object.create(i.prototype), s(i, o), o.from = function (e, t, n) {
            if ("number" == typeof e) throw new TypeError("Argument must not be a number");
            return i(e, t, n)
        }, o.alloc = function (e, t, n) {
            if ("number" != typeof e) throw new TypeError("Argument must be a number");
            var r = i(e);
            return void 0 !== t ? "string" == typeof n ? r.fill(t, n) : r.fill(t) : r.fill(0), r
        }, o.allocUnsafe = function (e) {
            if ("number" != typeof e) throw new TypeError("Argument must be a number");
            return i(e)
        }, o.allocUnsafeSlow = function (e) {
            if ("number" != typeof e) throw new TypeError("Argument must be a number");
            return r.SlowBuffer(e)
        }
    }, {buffer: 16}],
    42: [function (e, t, n) {
        var r = e("safe-buffer").Buffer;

        function i(e, t) {
            this._block = r.alloc(e), this._finalSize = t, this._blockSize = e, this._len = 0
        }

        i.prototype.update = function (e, t) {
            "string" == typeof e && (t = t || "utf8", e = r.from(e, t));
            for (var n = this._block, i = this._blockSize, s = e.length, o = this._len, a = 0; a < s;) {
                for (var u = o % i, c = Math.min(s - a, i - u), h = 0; h < c; h++) n[u + h] = e[a + h];
                a += c, (o += c) % i == 0 && this._update(n)
            }
            return this._len += s, this
        }, i.prototype.digest = function (e) {
            var t = this._len % this._blockSize;
            this._block[t] = 128, this._block.fill(0, t + 1), t >= this._finalSize && (this._update(this._block), this._block.fill(0));
            var n = 8 * this._len;
            if (n <= 4294967295) this._block.writeUInt32BE(n, this._blockSize - 4); else {
                var r = (4294967295 & n) >>> 0, i = (n - r) / 4294967296;
                this._block.writeUInt32BE(i, this._blockSize - 8), this._block.writeUInt32BE(r, this._blockSize - 4)
            }
            this._update(this._block);
            var s = this._hash();
            return e ? s.toString(e) : s
        }, i.prototype._update = function () {
            throw new Error("_update must be implemented by subclass")
        }, t.exports = i
    }, {"safe-buffer": 41}],
    43: [function (e, t, n) {
        var r = e("inherits"), i = e("./hash"), s = e("safe-buffer").Buffer,
            o = [1518500249, 1859775393, -1894007588, -899497514], a = new Array(80);

        function u() {
            this.init(), this._w = a, i.call(this, 64, 56)
        }

        function c(e) {
            return e << 5 | e >>> 27
        }

        function h(e) {
            return e << 30 | e >>> 2
        }

        function l(e, t, n, r) {
            return 0 === e ? t & n | ~t & r : 2 === e ? t & n | t & r | n & r : t ^ n ^ r
        }

        r(u, i), u.prototype.init = function () {
            return this._a = 1732584193, this._b = 4023233417, this._c = 2562383102, this._d = 271733878, this._e = 3285377520, this
        }, u.prototype._update = function (e) {
            for (var t, n = this._w, r = 0 | this._a, i = 0 | this._b, s = 0 | this._c, a = 0 | this._d, u = 0 | this._e, d = 0; d < 16; ++d) n[d] = e.readInt32BE(4 * d);
            for (; d < 80; ++d) n[d] = (t = n[d - 3] ^ n[d - 8] ^ n[d - 14] ^ n[d - 16]) << 1 | t >>> 31;
            for (var f = 0; f < 80; ++f) {
                var p = ~~(f / 20), g = c(r) + l(p, i, s, a) + u + n[f] + o[p] | 0;
                u = a, a = s, s = h(i), i = r, r = g
            }
            this._a = r + this._a | 0, this._b = i + this._b | 0, this._c = s + this._c | 0, this._d = a + this._d | 0, this._e = u + this._e | 0
        }, u.prototype._hash = function () {
            var e = s.allocUnsafe(20);
            return e.writeInt32BE(0 | this._a, 0), e.writeInt32BE(0 | this._b, 4), e.writeInt32BE(0 | this._c, 8), e.writeInt32BE(0 | this._d, 12), e.writeInt32BE(0 | this._e, 16), e
        }, t.exports = u
    }, {"./hash": 42, inherits: 20, "safe-buffer": 41}],
    44: [function (e, t, n) {
        (function (n) {
            t.exports = c;
            var r = e("debug")("simple-peer"), i = e("get-browser-rtc"), s = e("inherits"), o = e("randombytes"),
                a = e("readable-stream"), u = 5e3;

            function c(e) {
                var t = this;
                if (!(t instanceof c)) return new c(e);
                if (t._id = o(4).toString("hex").slice(0, 7), t._debug("new peer %o", e), e = Object.assign({allowHalfOpen: !1}, e), a.Duplex.call(t, e), t.channelName = e.initiator ? e.channelName || o(20).toString("hex") : null, t.initiator = e.initiator || !1, t.channelConfig = e.channelConfig || c.channelConfig, t.config = Object.assign({}, c.config, e.config), t.offerOptions = e.offerOptions || {}, t.answerOptions = e.answerOptions || {}, t.sdpTransform = e.sdpTransform || function (e) {
                    return e
                }, t.streams = e.streams || (e.stream ? [e.stream] : []), t.trickle = void 0 === e.trickle || e.trickle, t.allowHalfTrickle = void 0 !== e.allowHalfTrickle && e.allowHalfTrickle, t.iceCompleteTimeout = e.iceCompleteTimeout || u, t.destroyed = !1, t._connected = !1, t.remoteAddress = void 0, t.remoteFamily = void 0, t.remotePort = void 0, t.localAddress = void 0, t.localFamily = void 0, t.localPort = void 0, t._wrtc = e.wrtc && "object" == typeof e.wrtc ? e.wrtc : i(), !t._wrtc) throw"undefined" == typeof window ? l("No WebRTC support: Specify `opts.wrtc` option in this environment", "ERR_WEBRTC_SUPPORT") : l("No WebRTC support: Not a supported browser", "ERR_WEBRTC_SUPPORT");
                t._pcReady = !1, t._channelReady = !1, t._iceComplete = !1, t._iceCompleteTimer = null, t._channel = null, t._pendingCandidates = [], t._isNegotiating = !t.initiator, t._batchedNegotiation = !1, t._queuedNegotiation = !1, t._sendersAwaitingStable = [], t._senderMap = new Map, t._firstStable = !0, t._closingInterval = null, t._remoteTracks = [], t._remoteStreams = [], t._chunk = null, t._cb = null, t._interval = null;
                try {
                    t._pc = new t._wrtc.RTCPeerConnection(t.config)
                } catch (e) {
                    return void setTimeout(() => t.destroy(e), 0)
                }
                t._isReactNativeWebrtc = "number" == typeof t._pc._peerConnectionId, t._pc.oniceconnectionstatechange = function () {
                    t._onIceStateChange()
                }, t._pc.onicegatheringstatechange = function () {
                    t._onIceStateChange()
                }, t._pc.onsignalingstatechange = function () {
                    t._onSignalingStateChange()
                }, t._pc.onicecandidate = function (e) {
                    t._onIceCandidate(e)
                }, t.initiator ? t._setupData({channel: t._pc.createDataChannel(t.channelName, t.channelConfig)}) : t._pc.ondatachannel = function (e) {
                    t._setupData(e)
                }, t.streams && t.streams.forEach(function (e) {
                    t.addStream(e)
                }), t._pc.ontrack = function (e) {
                    t._onTrack(e)
                }, t.initiator && t._needsNegotiation(), t._onFinishBound = function () {
                    t._onFinish()
                }, t.once("finish", t._onFinishBound)
            }

            function h(e) {
                return e.replace(/a=ice-options:trickle\s\n/g, "")
            }

            function l(e, t) {
                var n = new Error(e);
                return n.code = t, n
            }

            s(c, a.Duplex), c.WEBRTC_SUPPORT = !!i(), c.config = {
                iceServers: [{urls: "stun:stun.l.google.com:19302"}, {urls: "stun:global.stun.twilio.com:3478?transport=udp"}],
                sdpSemantics: "unified-plan"
            }, c.channelConfig = {}, Object.defineProperty(c.prototype, "bufferSize", {
                get: function () {
                    return this._channel && this._channel.bufferedAmount || 0
                }
            }), Object.defineProperty(c.prototype, "connected", {
                get: function () {
                    return this._connected && "open" === this._channel.readyState
                }
            }), c.prototype.address = function () {
                return {port: this.localPort, family: this.localFamily, address: this.localAddress}
            }, c.prototype.signal = function (e) {
                var t = this;
                if (t.destroyed) throw l("cannot signal after peer is destroyed", "ERR_SIGNALING");
                if ("string" == typeof e) try {
                    e = JSON.parse(e)
                } catch (t) {
                    e = {}
                }
                t._debug("signal()"), e.renegotiate && t.initiator && (t._debug("got request to renegotiate"), t._needsNegotiation()), e.transceiverRequest && t.initiator && (t._debug("got request for transceiver"), t.addTransceiver(e.transceiverRequest.kind, e.transceiverRequest.init)), e.candidate && (t._pc.localDescription && t._pc.localDescription.type && t._pc.remoteDescription && t._pc.remoteDescription.type ? t._addIceCandidate(e.candidate) : t._pendingCandidates.push(e.candidate)), e.sdp && t._pc.setRemoteDescription(new t._wrtc.RTCSessionDescription(e)).then(function () {
                    t.destroyed || (t._pendingCandidates.forEach(function (e) {
                        t._addIceCandidate(e)
                    }), t._pendingCandidates = [], "offer" === t._pc.remoteDescription.type && t._createAnswer())
                }).catch(function (e) {
                    t.destroy(l(e, "ERR_SET_REMOTE_DESCRIPTION"))
                }), e.sdp || e.candidate || e.renegotiate || e.transceiverRequest || t.destroy(l("signal() called with invalid signal data", "ERR_SIGNALING"))
            }, c.prototype._addIceCandidate = function (e) {
                var t = this, n = new t._wrtc.RTCIceCandidate(e);
                t._pc.addIceCandidate(n).catch(function (e) {
                    var r;
                    !n.address || n.address.endsWith(".local") ? (r = "Ignoring unsupported ICE candidate.", console.warn(r)) : t.destroy(l(e, "ERR_ADD_ICE_CANDIDATE"))
                })
            }, c.prototype.send = function (e) {
                this._channel.send(e)
            }, c.prototype.addTransceiver = function (e, t) {
                if (this._debug("addTransceiver()"), this.initiator) try {
                    this._pc.addTransceiver(e, t), this._needsNegotiation()
                } catch (e) {
                    this.destroy(e)
                } else this.emit("signal", {transceiverRequest: {kind: e, init: t}})
            }, c.prototype.addStream = function (e) {
                var t = this;
                t._debug("addStream()"), e.getTracks().forEach(function (n) {
                    t.addTrack(n, e)
                })
            }, c.prototype.addTrack = function (e, t) {
                this._debug("addTrack()");
                var n = this._senderMap.get(e) || new Map, r = n.get(t);
                r ? r.removed ? this.destroy(l("Track has been removed. You should enable/disable tracks that you want to re-add.", "ERR_SENDER_REMOVED")) : this.destroy(l("Track has already been added to that stream.", "ERR_SENDER_ALREADY_ADDED")) : (r = this._pc.addTrack(e, t), n.set(t, r), this._senderMap.set(e, n), this._needsNegotiation())
            }, c.prototype.replaceTrack = function (e, t, n) {
                this._debug("replaceTrack()");
                var r = this._senderMap.get(e), i = r ? r.get(n) : null;
                i || this.destroy(l("Cannot replace track that was never added.", "ERR_TRACK_NOT_ADDED")), t && this._senderMap.set(t, r), null != i.replaceTrack ? i.replaceTrack(t) : this.destroy(l("replaceTrack is not supported in this browser", "ERR_UNSUPPORTED_REPLACETRACK"))
            }, c.prototype.removeTrack = function (e, t) {
                this._debug("removeSender()");
                var n = this._senderMap.get(e), r = n ? n.get(t) : null;
                r || this.destroy(l("Cannot remove track that was never added.", "ERR_TRACK_NOT_ADDED"));
                try {
                    r.removed = !0, this._pc.removeTrack(r)
                } catch (e) {
                    "NS_ERROR_UNEXPECTED" === e.name ? this._sendersAwaitingStable.push(r) : this.destroy(e)
                }
                this._needsNegotiation()
            }, c.prototype.removeStream = function (e) {
                var t = this;
                t._debug("removeSenders()"), e.getTracks().forEach(function (n) {
                    t.removeTrack(n, e)
                })
            }, c.prototype._needsNegotiation = function () {
                var e = this;
                e._debug("_needsNegotiation"), e._batchedNegotiation || (e._batchedNegotiation = !0, setTimeout(function () {
                    e._batchedNegotiation = !1, e._debug("starting batched negotiation"), e.negotiate()
                }, 0))
            }, c.prototype.negotiate = function () {
                var e = this;
                e.initiator ? e._isNegotiating ? (e._queuedNegotiation = !0, e._debug("already negotiating, queueing")) : (e._debug("start negotiation"), setTimeout(() => {
                    e._createOffer()
                }, 0)) : e._isNegotiating || (e._debug("requesting negotiation from initiator"), e.emit("signal", {renegotiate: !0})), e._isNegotiating = !0
            }, c.prototype.destroy = function (e) {
                this._destroy(e, function () {
                })
            }, c.prototype._destroy = function (e, t) {
                if (!this.destroyed) {
                    if (this._debug("destroy (error: %s)", e && (e.message || e)), this.readable = this.writable = !1, this._readableState.ended || this.push(null), this._writableState.finished || this.end(), this.destroyed = !0, this._connected = !1, this._pcReady = !1, this._channelReady = !1, this._remoteTracks = null, this._remoteStreams = null, this._senderMap = null, clearInterval(this._closingInterval), this._closingInterval = null, clearInterval(this._interval), this._interval = null, this._chunk = null, this._cb = null, this._onFinishBound && this.removeListener("finish", this._onFinishBound), this._onFinishBound = null, this._channel) {
                        try {
                            this._channel.close()
                        } catch (e) {
                        }
                        this._channel.onmessage = null, this._channel.onopen = null, this._channel.onclose = null, this._channel.onerror = null
                    }
                    if (this._pc) {
                        try {
                            this._pc.close()
                        } catch (e) {
                        }
                        this._pc.oniceconnectionstatechange = null, this._pc.onicegatheringstatechange = null, this._pc.onsignalingstatechange = null, this._pc.onicecandidate = null, this._pc.ontrack = null, this._pc.ondatachannel = null
                    }
                    this._pc = null, this._channel = null, e && this.emit("error", e), this.emit("close"), t()
                }
            }, c.prototype._setupData = function (e) {
                var t = this;
                if (!e.channel) return t.destroy(l("Data channel event is missing `channel` property", "ERR_DATA_CHANNEL"));
                t._channel = e.channel, t._channel.binaryType = "arraybuffer", "number" == typeof t._channel.bufferedAmountLowThreshold && (t._channel.bufferedAmountLowThreshold = 65536), t.channelName = t._channel.label, t._channel.onmessage = function (e) {
                    t._onChannelMessage(e)
                }, t._channel.onbufferedamountlow = function () {
                    t._onChannelBufferedAmountLow()
                }, t._channel.onopen = function () {
                    t._onChannelOpen()
                }, t._channel.onclose = function () {
                    t._onChannelClose()
                }, t._channel.onerror = function (e) {
                    t.destroy(l(e, "ERR_DATA_CHANNEL"))
                };
                var n = !1;
                t._closingInterval = setInterval(function () {
                    t._channel && "closing" === t._channel.readyState ? (n && t._onChannelClose(), n = !0) : n = !1
                }, 5e3)
            }, c.prototype._read = function () {
            }, c.prototype._write = function (e, t, n) {
                if (this.destroyed) return n(l("cannot write after peer is destroyed", "ERR_DATA_CHANNEL"));
                if (this._connected) {
                    try {
                        this.send(e)
                    } catch (e) {
                        return this.destroy(l(e, "ERR_DATA_CHANNEL"))
                    }
                    this._channel.bufferedAmount > 65536 ? (this._debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount), this._cb = n) : n(null)
                } else this._debug("write before connect"), this._chunk = e, this._cb = n
            }, c.prototype._onFinish = function () {
                var e = this;

                function t() {
                    setTimeout(function () {
                        e.destroy()
                    }, 1e3)
                }

                e.destroyed || (e._connected ? t() : e.once("connect", t))
            }, c.prototype._startIceCompleteTimeout = function () {
                var e = this;
                e.destroyed || e._iceCompleteTimer || (e._debug("started iceComplete timeout"), e._iceCompleteTimer = setTimeout(function () {
                    e._iceComplete || (e._iceComplete = !0, e._debug("iceComplete timeout completed"), e.emit("iceTimeout"), e.emit("_iceComplete"))
                }, e.iceCompleteTimeout))
            }, c.prototype._createOffer = function () {
                var e = this;
                e.destroyed || e._pc.createOffer(e.offerOptions).then(function (t) {
                    function n() {
                        if (!e.destroyed) {
                            var n = e._pc.localDescription || t;
                            e._debug("signal"), e.emit("signal", {type: n.type, sdp: n.sdp})
                        }
                    }

                    e.destroyed || (e.trickle || e.allowHalfTrickle || (t.sdp = h(t.sdp)), t.sdp = e.sdpTransform(t.sdp), e._pc.setLocalDescription(t).then(function () {
                        if (e._debug("createOffer success"), e.destroyed) return;
                        e.trickle || e._iceComplete ? n() : e.once("_iceComplete", n)
                    }).catch(function (t) {
                        e.destroy(l(t, "ERR_SET_LOCAL_DESCRIPTION"))
                    }))
                }).catch(function (t) {
                    e.destroy(l(t, "ERR_CREATE_OFFER"))
                })
            }, c.prototype._requestMissingTransceivers = function () {
                var e = this;
                e._pc.getTransceivers && e._pc.getTransceivers().forEach(t => {
                    t.mid || !t.sender.track || t.requested || (t.requested = !0, e.addTransceiver(t.sender.track.kind))
                })
            }, c.prototype._createAnswer = function () {
                var e = this;
                e.destroyed || e._pc.createAnswer(e.answerOptions).then(function (t) {
                    function n() {
                        if (!e.destroyed) {
                            var n = e._pc.localDescription || t;
                            e._debug("signal"), e.emit("signal", {
                                type: n.type,
                                sdp: n.sdp
                            }), e.initiator || e._requestMissingTransceivers()
                        }
                    }

                    e.destroyed || (e.trickle || e.allowHalfTrickle || (t.sdp = h(t.sdp)), t.sdp = e.sdpTransform(t.sdp), e._pc.setLocalDescription(t).then(function () {
                        if (e.destroyed) return;
                        e.trickle || e._iceComplete ? n() : e.once("_iceComplete", n)
                    }).catch(function (t) {
                        e.destroy(l(t, "ERR_SET_LOCAL_DESCRIPTION"))
                    }))
                }).catch(function (t) {
                    e.destroy(l(t, "ERR_CREATE_ANSWER"))
                })
            }, c.prototype._onIceStateChange = function () {
                if (!this.destroyed) {
                    var e = this._pc.iceConnectionState, t = this._pc.iceGatheringState;
                    this._debug("iceStateChange (connection: %s) (gathering: %s)", e, t), this.emit("iceStateChange", e, t), "connected" !== e && "completed" !== e || (this._pcReady = !0, this._maybeReady()), "failed" === e && this.destroy(l("Ice connection failed.", "ERR_ICE_CONNECTION_FAILURE")), "closed" === e && this.destroy(l("Ice connection closed.", "ERR_ICE_CONNECTION_CLOSED"))
                }
            }, c.prototype.getStats = function (e) {
                var t = this;

                function n(e) {
                    return "[object Array]" === Object.prototype.toString.call(e.values) && e.values.forEach(function (t) {
                        Object.assign(e, t)
                    }), e
                }

                0 === t._pc.getStats.length ? t._pc.getStats().then(function (t) {
                    var r = [];
                    t.forEach(function (e) {
                        r.push(n(e))
                    }), e(null, r)
                }, function (t) {
                    e(t)
                }) : t._isReactNativeWebrtc ? t._pc.getStats(null, function (t) {
                    var r = [];
                    t.forEach(function (e) {
                        r.push(n(e))
                    }), e(null, r)
                }, function (t) {
                    e(t)
                }) : t._pc.getStats.length > 0 ? t._pc.getStats(function (r) {
                    if (!t.destroyed) {
                        var i = [];
                        r.result().forEach(function (e) {
                            var t = {};
                            e.names().forEach(function (n) {
                                t[n] = e.stat(n)
                            }), t.id = e.id, t.type = e.type, t.timestamp = e.timestamp, i.push(n(t))
                        }), e(null, i)
                    }
                }, function (t) {
                    e(t)
                }) : e(null, [])
            }, c.prototype._maybeReady = function () {
                var e = this;
                e._debug("maybeReady pc %s channel %s", e._pcReady, e._channelReady), !e._connected && !e._connecting && e._pcReady && e._channelReady && (e._connecting = !0, function t() {
                    e.destroyed || e.getStats(function (n, r) {
                        if (!e.destroyed) {
                            n && (r = []);
                            var i = {}, s = {}, o = {}, a = !1;
                            if (r.forEach(function (e) {
                                "remotecandidate" !== e.type && "remote-candidate" !== e.type || (i[e.id] = e), "localcandidate" !== e.type && "local-candidate" !== e.type || (s[e.id] = e), "candidatepair" !== e.type && "candidate-pair" !== e.type || (o[e.id] = e)
                            }), r.forEach(function (e) {
                                "transport" === e.type && e.selectedCandidatePairId && c(o[e.selectedCandidatePairId]), ("googCandidatePair" === e.type && "true" === e.googActiveConnection || ("candidatepair" === e.type || "candidate-pair" === e.type) && e.selected) && c(e)
                            }), a || Object.keys(o).length && !Object.keys(s).length) {
                                if (e._connecting = !1, e._connected = !0, e._chunk) {
                                    try {
                                        e.send(e._chunk)
                                    } catch (n) {
                                        return e.destroy(l(n, "ERR_DATA_CHANNEL"))
                                    }
                                    e._chunk = null, e._debug('sent chunk from "write before connect"');
                                    var u = e._cb;
                                    e._cb = null, u(null)
                                }
                                "number" != typeof e._channel.bufferedAmountLowThreshold && (e._interval = setInterval(function () {
                                    e._onInterval()
                                }, 150), e._interval.unref && e._interval.unref()), e._debug("connect"), e.emit("connect")
                            } else setTimeout(t, 100)
                        }

                        function c(t) {
                            a = !0;
                            var n = s[t.localCandidateId];
                            n && (n.ip || n.address) ? (e.localAddress = n.ip || n.address, e.localPort = Number(n.port)) : n && n.ipAddress ? (e.localAddress = n.ipAddress, e.localPort = Number(n.portNumber)) : "string" == typeof t.googLocalAddress && (n = t.googLocalAddress.split(":"), e.localAddress = n[0], e.localPort = Number(n[1])), e.localAddress && (e.localFamily = e.localAddress.includes(":") ? "IPv6" : "IPv4");
                            var r = i[t.remoteCandidateId];
                            r && (r.ip || r.address) ? (e.remoteAddress = r.ip || r.address, e.remotePort = Number(r.port)) : r && r.ipAddress ? (e.remoteAddress = r.ipAddress, e.remotePort = Number(r.portNumber)) : "string" == typeof t.googRemoteAddress && (r = t.googRemoteAddress.split(":"), e.remoteAddress = r[0], e.remotePort = Number(r[1])), e.remoteAddress && (e.remoteFamily = e.remoteAddress.includes(":") ? "IPv6" : "IPv4"), e._debug("connect local: %s:%s remote: %s:%s", e.localAddress, e.localPort, e.remoteAddress, e.remotePort)
                        }
                    })
                }())
            }, c.prototype._onInterval = function () {
                !this._cb || !this._channel || this._channel.bufferedAmount > 65536 || this._onChannelBufferedAmountLow()
            }, c.prototype._onSignalingStateChange = function () {
                var e = this;
                e.destroyed || ("stable" !== e._pc.signalingState || e._firstStable || (e._isNegotiating = !1, e._debug("flushing sender queue", e._sendersAwaitingStable), e._sendersAwaitingStable.forEach(function (t) {
                    e._pc.removeTrack(t), e._queuedNegotiation = !0
                }), e._sendersAwaitingStable = [], e._queuedNegotiation && (e._debug("flushing negotiation queue"), e._queuedNegotiation = !1, e._needsNegotiation()), e._debug("negotiate"), e.emit("negotiate")), e._firstStable = !1, e._debug("signalingStateChange %s", e._pc.signalingState), e.emit("signalingStateChange", e._pc.signalingState))
            }, c.prototype._onIceCandidate = function (e) {
                this.destroyed || (e.candidate && this.trickle ? this.emit("signal", {
                    candidate: {
                        candidate: e.candidate.candidate,
                        sdpMLineIndex: e.candidate.sdpMLineIndex,
                        sdpMid: e.candidate.sdpMid
                    }
                }) : e.candidate || this._iceComplete || (this._iceComplete = !0, this.emit("_iceComplete")), e.candidate && this._startIceCompleteTimeout())
            }, c.prototype._onChannelMessage = function (e) {
                if (!this.destroyed) {
                    var t = e.data;
                    t instanceof ArrayBuffer && (t = n.from(t)), this.push(t)
                }
            }, c.prototype._onChannelBufferedAmountLow = function () {
                if (!this.destroyed && this._cb) {
                    this._debug("ending backpressure: bufferedAmount %d", this._channel.bufferedAmount);
                    var e = this._cb;
                    this._cb = null, e(null)
                }
            }, c.prototype._onChannelOpen = function () {
                this._connected || this.destroyed || (this._debug("on channel open"), this._channelReady = !0, this._maybeReady())
            }, c.prototype._onChannelClose = function () {
                this.destroyed || (this._debug("on channel close"), this.destroy())
            }, c.prototype._onTrack = function (e) {
                var t = this;
                t.destroyed || e.streams.forEach(function (n) {
                    t._debug("on track"), t.emit("track", e.track, n), t._remoteTracks.push({
                        track: e.track,
                        stream: n
                    }), t._remoteStreams.some(function (e) {
                        return e.id === n.id
                    }) || (t._remoteStreams.push(n), setTimeout(function () {
                        t.emit("stream", n)
                    }, 0))
                })
            }, c.prototype._debug = function () {
                var e = this, t = [].slice.call(arguments);
                t[0] = "[" + e._id + "] " + t[0], r.apply(null, t)
            }
        }).call(this, e("buffer").Buffer)
    }, {buffer: 16, debug: "debug", "get-browser-rtc": 18, inherits: 20, randombytes: 24, "readable-stream": 39}],
    45: [function (e, t, n) {
        (function (n, r) {
            const i = e("debug")("simple-websocket"), s = e("randombytes"), o = e("readable-stream"), a = e("ws"),
                u = "function" != typeof a ? WebSocket : a, c = 65536;

            class h extends o.Duplex {
                constructor(e = {}) {
                    if ("string" == typeof e && (e = {url: e}), super(e = Object.assign({allowHalfOpen: !1}, e)), null == e.url && null == e.socket) throw new Error("Missing required `url` or `socket` option");
                    if (null != e.url && null != e.socket) throw new Error("Must specify either `url` or `socket` option, not both");
                    if (this._id = s(4).toString("hex").slice(0, 7), this._debug("new websocket: %o", e), this.connected = !1, this.destroyed = !1, this._chunk = null, this._cb = null, this._interval = null, e.socket) this.url = e.socket.url, this._ws = e.socket, this.connected = e.socket.readyState === u.OPEN; else {
                        this.url = e.url;
                        try {
                            this._ws = "function" == typeof a ? new u(e.url, e) : new u(e.url)
                        } catch (e) {
                            return void n.nextTick(() => this.destroy(e))
                        }
                    }
                    this._ws.binaryType = "arraybuffer", this._ws.onopen = () => {
                        this._onOpen()
                    }, this._ws.onmessage = e => {
                        this._onMessage(e)
                    }, this._ws.onclose = () => {
                        this._onClose()
                    }, this._ws.onerror = () => {
                        this.destroy(new Error("connection error to " + this.url))
                    }, this._onFinishBound = () => {
                        this._onFinish()
                    }, this.once("finish", this._onFinishBound)
                }

                send(e) {
                    this._ws.send(e)
                }

                destroy(e) {
                    this._destroy(e, () => {
                    })
                }

                _destroy(e, t) {
                    if (!this.destroyed) {
                        if (this._debug("destroy (error: %s)", e && (e.message || e)), this.readable = this.writable = !1, this._readableState.ended || this.push(null), this._writableState.finished || this.end(), this.connected = !1, this.destroyed = !0, clearInterval(this._interval), this._interval = null, this._chunk = null, this._cb = null, this._onFinishBound && this.removeListener("finish", this._onFinishBound), this._onFinishBound = null, this._ws) {
                            const t = this._ws, n = () => {
                                t.onclose = null
                            };
                            if (t.readyState === u.CLOSED) n(); else try {
                                t.onclose = n, t.close()
                            } catch (e) {
                                n()
                            }
                            t.onopen = null, t.onmessage = null, t.onerror = () => {
                            }
                        }
                        if (this._ws = null, e) {
                            if ("undefined" != typeof DOMException && e instanceof DOMException) {
                                const t = e.code;
                                (e = new Error(e.message)).code = t
                            }
                            this.emit("error", e)
                        }
                        this.emit("close"), t()
                    }
                }

                _read() {
                }

                _write(e, t, n) {
                    if (this.destroyed) return n(new Error("cannot write after socket is destroyed"));
                    if (this.connected) {
                        try {
                            this.send(e)
                        } catch (e) {
                            return this.destroy(e)
                        }
                        "function" != typeof a && this._ws.bufferedAmount > c ? (this._debug("start backpressure: bufferedAmount %d", this._ws.bufferedAmount), this._cb = n) : n(null)
                    } else this._debug("write before connect"), this._chunk = e, this._cb = n
                }

                _onFinish() {
                    if (this.destroyed) return;
                    const e = () => {
                        setTimeout(() => this.destroy(), 1e3)
                    };
                    this.connected ? e() : this.once("connect", e)
                }

                _onMessage(e) {
                    if (this.destroyed) return;
                    let t = e.data;
                    t instanceof ArrayBuffer && (t = r.from(t)), this.push(t)
                }

                _onOpen() {
                    if (!this.connected && !this.destroyed) {
                        if (this.connected = !0, this._chunk) {
                            try {
                                this.send(this._chunk)
                            } catch (e) {
                                return this.destroy(e)
                            }
                            this._chunk = null, this._debug('sent chunk from "write before connect"');
                            const e = this._cb;
                            this._cb = null, e(null)
                        }
                        "function" != typeof a && (this._interval = setInterval(() => this._onInterval(), 150), this._interval.unref && this._interval.unref()), this._debug("connect"), this.emit("connect")
                    }
                }

                _onInterval() {
                    if (!this._cb || !this._ws || this._ws.bufferedAmount > c) return;
                    this._debug("ending backpressure: bufferedAmount %d", this._ws.bufferedAmount);
                    const e = this._cb;
                    this._cb = null, e(null)
                }

                _onClose() {
                    this.destroyed || (this._debug("on close"), this.destroy())
                }

                _debug() {
                    const e = [].slice.call(arguments);
                    e[0] = "[" + this._id + "] " + e[0], i.apply(null, e)
                }
            }

            h.WEBSOCKET_SUPPORT = !!u, t.exports = h
        }).call(this, e("_process"), e("buffer").Buffer)
    }, {_process: 23, buffer: 16, debug: "debug", randombytes: 24, "readable-stream": 39, ws: 15}],
    46: [function (e, t, n) {
        "use strict";
        var r = e("safe-buffer").Buffer, i = r.isEncoding || function (e) {
            switch ((e = "" + e) && e.toLowerCase()) {
                case"hex":
                case"utf8":
                case"utf-8":
                case"ascii":
                case"binary":
                case"base64":
                case"ucs2":
                case"ucs-2":
                case"utf16le":
                case"utf-16le":
                case"raw":
                    return !0;
                default:
                    return !1
            }
        };

        function s(e) {
            var t;
            switch (this.encoding = function (e) {
                var t = function (e) {
                    if (!e) return "utf8";
                    for (var t; ;) switch (e) {
                        case"utf8":
                        case"utf-8":
                            return "utf8";
                        case"ucs2":
                        case"ucs-2":
                        case"utf16le":
                        case"utf-16le":
                            return "utf16le";
                        case"latin1":
                        case"binary":
                            return "latin1";
                        case"base64":
                        case"ascii":
                        case"hex":
                            return e;
                        default:
                            if (t) return;
                            e = ("" + e).toLowerCase(), t = !0
                    }
                }(e);
                if ("string" != typeof t && (r.isEncoding === i || !i(e))) throw new Error("Unknown encoding: " + e);
                return t || e
            }(e), this.encoding) {
                case"utf16le":
                    this.text = u, this.end = c, t = 4;
                    break;
                case"utf8":
                    this.fillLast = a, t = 4;
                    break;
                case"base64":
                    this.text = h, this.end = l, t = 3;
                    break;
                default:
                    return this.write = d, void (this.end = f)
            }
            this.lastNeed = 0, this.lastTotal = 0, this.lastChar = r.allocUnsafe(t)
        }

        function o(e) {
            return e <= 127 ? 0 : e >> 5 == 6 ? 2 : e >> 4 == 14 ? 3 : e >> 3 == 30 ? 4 : e >> 6 == 2 ? -1 : -2
        }

        function a(e) {
            var t = this.lastTotal - this.lastNeed, n = function (e, t, n) {
                if (128 != (192 & t[0])) return e.lastNeed = 0, "�";
                if (e.lastNeed > 1 && t.length > 1) {
                    if (128 != (192 & t[1])) return e.lastNeed = 1, "�";
                    if (e.lastNeed > 2 && t.length > 2 && 128 != (192 & t[2])) return e.lastNeed = 2, "�"
                }
            }(this, e);
            return void 0 !== n ? n : this.lastNeed <= e.length ? (e.copy(this.lastChar, t, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e.copy(this.lastChar, t, 0, e.length), void (this.lastNeed -= e.length))
        }

        function u(e, t) {
            if ((e.length - t) % 2 == 0) {
                var n = e.toString("utf16le", t);
                if (n) {
                    var r = n.charCodeAt(n.length - 1);
                    if (r >= 55296 && r <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1], n.slice(0, -1)
                }
                return n
            }
            return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e[e.length - 1], e.toString("utf16le", t, e.length - 1)
        }

        function c(e) {
            var t = e && e.length ? this.write(e) : "";
            if (this.lastNeed) {
                var n = this.lastTotal - this.lastNeed;
                return t + this.lastChar.toString("utf16le", 0, n)
            }
            return t
        }

        function h(e, t) {
            var n = (e.length - t) % 3;
            return 0 === n ? e.toString("base64", t) : (this.lastNeed = 3 - n, this.lastTotal = 3, 1 === n ? this.lastChar[0] = e[e.length - 1] : (this.lastChar[0] = e[e.length - 2], this.lastChar[1] = e[e.length - 1]), e.toString("base64", t, e.length - n))
        }

        function l(e) {
            var t = e && e.length ? this.write(e) : "";
            return this.lastNeed ? t + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t
        }

        function d(e) {
            return e.toString(this.encoding)
        }

        function f(e) {
            return e && e.length ? this.write(e) : ""
        }

        n.StringDecoder = s, s.prototype.write = function (e) {
            if (0 === e.length) return "";
            var t, n;
            if (this.lastNeed) {
                if (void 0 === (t = this.fillLast(e))) return "";
                n = this.lastNeed, this.lastNeed = 0
            } else n = 0;
            return n < e.length ? t ? t + this.text(e, n) : this.text(e, n) : t || ""
        }, s.prototype.end = function (e) {
            var t = e && e.length ? this.write(e) : "";
            return this.lastNeed ? t + "�" : t
        }, s.prototype.text = function (e, t) {
            var n = function (e, t, n) {
                var r = t.length - 1;
                if (r < n) return 0;
                var i = o(t[r]);
                if (i >= 0) return i > 0 && (e.lastNeed = i - 1), i;
                if (--r < n || -2 === i) return 0;
                if ((i = o(t[r])) >= 0) return i > 0 && (e.lastNeed = i - 2), i;
                if (--r < n || -2 === i) return 0;
                if ((i = o(t[r])) >= 0) return i > 0 && (2 === i ? i = 0 : e.lastNeed = i - 3), i;
                return 0
            }(this, e, t);
            if (!this.lastNeed) return e.toString("utf8", t);
            this.lastTotal = n;
            var r = e.length - (n - this.lastNeed);
            return e.copy(this.lastChar, 0, r), e.toString("utf8", t, r)
        }, s.prototype.fillLast = function (e) {
            if (this.lastNeed <= e.length) return e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
            e.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e.length), this.lastNeed -= e.length
        }
    }, {"safe-buffer": 41}],
    47: [function (e, t, n) {
        "use strict";
        t.exports = function (e, t, n) {
            return 0 === e.length ? e : t ? (n || e.sort(t), function (e, t) {
                for (var n = 1, r = e.length, i = e[0], s = e[0], o = 1; o < r; ++o) if (s = i, t(i = e[o], s)) {
                    if (o === n) {
                        n++;
                        continue
                    }
                    e[n++] = i
                }
                return e.length = n, e
            }(e, t)) : (n || e.sort(), function (e) {
                for (var t = 1, n = e.length, r = e[0], i = e[0], s = 1; s < n; ++s, i = r) if (i = r, (r = e[s]) !== i) {
                    if (s === t) {
                        t++;
                        continue
                    }
                    e[t++] = r
                }
                return e.length = t, e
            }(e))
        }
    }, {}],
    48: [function (e, t, n) {
        (function (e) {
            function n(t) {
                try {
                    if (!e.localStorage) return !1
                } catch (e) {
                    return !1
                }
                var n = e.localStorage[t];
                return null != n && "true" === String(n).toLowerCase()
            }

            t.exports = function (e, t) {
                if (n("noDeprecation")) return e;
                var r = !1;
                return function () {
                    if (!r) {
                        if (n("throwDeprecation")) throw new Error(t);
                        n("traceDeprecation") ? console.trace(t) : console.warn(t), r = !0
                    }
                    return e.apply(this, arguments)
                }
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    49: [function (e, t, n) {
        t.exports = function e(t, n) {
            if (t && n) return e(t)(n);
            if ("function" != typeof t) throw new TypeError("need wrapper function");
            Object.keys(t).forEach(function (e) {
                r[e] = t[e]
            });
            return r;

            function r() {
                for (var e = new Array(arguments.length), n = 0; n < e.length; n++) e[n] = arguments[n];
                var r = t.apply(this, e), i = e[e.length - 1];
                return "function" == typeof r && r !== i && Object.keys(i).forEach(function (e) {
                    r[e] = i[e]
                }), r
            }
        }
    }, {}],
    debug: [function (e, t, n) {
        (function (r) {
            n.log = function (...e) {
                return "object" == typeof console && console.log && console.log(...e)
            }, n.formatArgs = function (e) {
                if (e[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + e[0] + (this.useColors ? "%c " : " ") + "+" + t.exports.humanize(this.diff), !this.useColors) return;
                const n = "color: " + this.color;
                e.splice(1, 0, n, "color: inherit");
                let r = 0, i = 0;
                e[0].replace(/%[a-zA-Z%]/g, e => {
                    "%%" !== e && (r++, "%c" === e && (i = r))
                }), e.splice(i, 0, n)
            }, n.save = function (e) {
                try {
                    e ? n.storage.setItem("debug", e) : n.storage.removeItem("debug")
                } catch (e) {
                }
            }, n.load = function () {
                let e;
                try {
                    e = n.storage.getItem("debug")
                } catch (e) {
                }
                !e && void 0 !== r && "env" in r && (e = r.env.DEBUG);
                return e
            }, n.useColors = function () {
                if ("undefined" != typeof window && window.process && ("renderer" === window.process.type || window.process.__nwjs)) return !0;
                if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
                return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)
            }, n.storage = function () {
                try {
                    return localStorage
                } catch (e) {
                }
            }(), n.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.exports = e("./common")(n);
            const {formatters: i} = t.exports;
            i.j = function (e) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return "[UnexpectedJSONParseError]: " + e.message
                }
            }
        }).call(this, e("_process"))
    }, {"./common": 17, _process: 23}],
    events: [function (e, t, n) {
        var r = Object.create || function (e) {
            var t = function () {
            };
            return t.prototype = e, new t
        }, i = Object.keys || function (e) {
            var t = [];
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.push(n);
            return n
        }, s = Function.prototype.bind || function (e) {
            var t = this;
            return function () {
                return t.apply(e, arguments)
            }
        };

        function o() {
            this._events && Object.prototype.hasOwnProperty.call(this, "_events") || (this._events = r(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
        }

        t.exports = o, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._maxListeners = void 0;
        var a, u = 10;
        try {
            var c = {};
            Object.defineProperty && Object.defineProperty(c, "x", {value: 0}), a = 0 === c.x
        } catch (e) {
            a = !1
        }

        function h(e) {
            return void 0 === e._maxListeners ? o.defaultMaxListeners : e._maxListeners
        }

        function l(e, t, n) {
            if (t) e.call(n); else for (var r = e.length, i = v(e, r), s = 0; s < r; ++s) i[s].call(n)
        }

        function d(e, t, n, r) {
            if (t) e.call(n, r); else for (var i = e.length, s = v(e, i), o = 0; o < i; ++o) s[o].call(n, r)
        }

        function f(e, t, n, r, i) {
            if (t) e.call(n, r, i); else for (var s = e.length, o = v(e, s), a = 0; a < s; ++a) o[a].call(n, r, i)
        }

        function p(e, t, n, r, i, s) {
            if (t) e.call(n, r, i, s); else for (var o = e.length, a = v(e, o), u = 0; u < o; ++u) a[u].call(n, r, i, s)
        }

        function g(e, t, n, r) {
            if (t) e.apply(n, r); else for (var i = e.length, s = v(e, i), o = 0; o < i; ++o) s[o].apply(n, r)
        }

        function m(e, t, n, i) {
            var s, o, a;
            if ("function" != typeof n) throw new TypeError('"listener" argument must be a function');
            if ((o = e._events) ? (o.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), o = e._events), a = o[t]) : (o = e._events = r(null), e._eventsCount = 0), a) {
                if ("function" == typeof a ? a = o[t] = i ? [n, a] : [a, n] : i ? a.unshift(n) : a.push(n), !a.warned && (s = h(e)) && s > 0 && a.length > s) {
                    a.warned = !0;
                    var u = new Error("Possible EventEmitter memory leak detected. " + a.length + ' "' + String(t) + '" listeners added. Use emitter.setMaxListeners() to increase limit.');
                    u.name = "MaxListenersExceededWarning", u.emitter = e, u.type = t, u.count = a.length, "object" == typeof console && console.warn && console.warn("%s: %s", u.name, u.message)
                }
            } else a = o[t] = n, ++e._eventsCount;
            return e
        }

        function y() {
            if (!this.fired) switch (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length) {
                case 0:
                    return this.listener.call(this.target);
                case 1:
                    return this.listener.call(this.target, arguments[0]);
                case 2:
                    return this.listener.call(this.target, arguments[0], arguments[1]);
                case 3:
                    return this.listener.call(this.target, arguments[0], arguments[1], arguments[2]);
                default:
                    for (var e = new Array(arguments.length), t = 0; t < e.length; ++t) e[t] = arguments[t];
                    this.listener.apply(this.target, e)
            }
        }

        function b(e, t, n) {
            var r = {fired: !1, wrapFn: void 0, target: e, type: t, listener: n}, i = s.call(y, r);
            return i.listener = n, r.wrapFn = i, i
        }

        function w(e, t, n) {
            var r = e._events;
            if (!r) return [];
            var i = r[t];
            return i ? "function" == typeof i ? n ? [i.listener || i] : [i] : n ? function (e) {
                for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
                return t
            }(i) : v(i, i.length) : []
        }

        function _(e) {
            var t = this._events;
            if (t) {
                var n = t[e];
                if ("function" == typeof n) return 1;
                if (n) return n.length
            }
            return 0
        }

        function v(e, t) {
            for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
            return n
        }

        a ? Object.defineProperty(o, "defaultMaxListeners", {
            enumerable: !0, get: function () {
                return u
            }, set: function (e) {
                if ("number" != typeof e || e < 0 || e != e) throw new TypeError('"defaultMaxListeners" must be a positive number');
                u = e
            }
        }) : o.defaultMaxListeners = u, o.prototype.setMaxListeners = function (e) {
            if ("number" != typeof e || e < 0 || isNaN(e)) throw new TypeError('"n" argument must be a positive number');
            return this._maxListeners = e, this
        }, o.prototype.getMaxListeners = function () {
            return h(this)
        }, o.prototype.emit = function (e) {
            var t, n, r, i, s, o, a = "error" === e;
            if (o = this._events) a = a && null == o.error; else if (!a) return !1;
            if (a) {
                if (arguments.length > 1 && (t = arguments[1]), t instanceof Error) throw t;
                var u = new Error('Unhandled "error" event. (' + t + ")");
                throw u.context = t, u
            }
            if (!(n = o[e])) return !1;
            var c = "function" == typeof n;
            switch (r = arguments.length) {
                case 1:
                    l(n, c, this);
                    break;
                case 2:
                    d(n, c, this, arguments[1]);
                    break;
                case 3:
                    f(n, c, this, arguments[1], arguments[2]);
                    break;
                case 4:
                    p(n, c, this, arguments[1], arguments[2], arguments[3]);
                    break;
                default:
                    for (i = new Array(r - 1), s = 1; s < r; s++) i[s - 1] = arguments[s];
                    g(n, c, this, i)
            }
            return !0
        }, o.prototype.addListener = function (e, t) {
            return m(this, e, t, !1)
        }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function (e, t) {
            return m(this, e, t, !0)
        }, o.prototype.once = function (e, t) {
            if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
            return this.on(e, b(this, e, t)), this
        }, o.prototype.prependOnceListener = function (e, t) {
            if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
            return this.prependListener(e, b(this, e, t)), this
        }, o.prototype.removeListener = function (e, t) {
            var n, i, s, o, a;
            if ("function" != typeof t) throw new TypeError('"listener" argument must be a function');
            if (!(i = this._events)) return this;
            if (!(n = i[e])) return this;
            if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = r(null) : (delete i[e], i.removeListener && this.emit("removeListener", e, n.listener || t)); else if ("function" != typeof n) {
                for (s = -1, o = n.length - 1; o >= 0; o--) if (n[o] === t || n[o].listener === t) {
                    a = n[o].listener, s = o;
                    break
                }
                if (s < 0) return this;
                0 === s ? n.shift() : function (e, t) {
                    for (var n = t, r = n + 1, i = e.length; r < i; n += 1, r += 1) e[n] = e[r];
                    e.pop()
                }(n, s), 1 === n.length && (i[e] = n[0]), i.removeListener && this.emit("removeListener", e, a || t)
            }
            return this
        }, o.prototype.removeAllListeners = function (e) {
            var t, n, s;
            if (!(n = this._events)) return this;
            if (!n.removeListener) return 0 === arguments.length ? (this._events = r(null), this._eventsCount = 0) : n[e] && (0 == --this._eventsCount ? this._events = r(null) : delete n[e]), this;
            if (0 === arguments.length) {
                var o, a = i(n);
                for (s = 0; s < a.length; ++s) "removeListener" !== (o = a[s]) && this.removeAllListeners(o);
                return this.removeAllListeners("removeListener"), this._events = r(null), this._eventsCount = 0, this
            }
            if ("function" == typeof (t = n[e])) this.removeListener(e, t); else if (t) for (s = t.length - 1; s >= 0; s--) this.removeListener(e, t[s]);
            return this
        }, o.prototype.listeners = function (e) {
            return w(this, e, !0)
        }, o.prototype.rawListeners = function (e) {
            return w(this, e, !1)
        }, o.listenerCount = function (e, t) {
            return "function" == typeof e.listenerCount ? e.listenerCount(t) : _.call(e, t)
        }, o.prototype.listenerCount = _, o.prototype.eventNames = function () {
            return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : []
        }
    }, {}],
    "p2p-media-loader-core": [function (e, t, n) {
        "use strict";

        function r(e) {
            for (var t in e) n.hasOwnProperty(t) || (n[t] = e[t])
        }

        Object.defineProperty(n, "__esModule", {value: !0}), n.version = "0.6.2", r(e("./loader-interface")), r(e("./hybrid-loader"))
    }, {"./hybrid-loader": 4, "./loader-interface": 5}]
}, {}, [2]);
require = function t(e, s, i) {
    function n(r, o) {
        if (!s[r]) {
            if (!e[r]) {
                var u = "function" == typeof require && require;
                if (!o && u) return u(r, !0);
                if (a) return a(r, !0);
                var l = new Error("Cannot find module '" + r + "'");
                throw l.code = "MODULE_NOT_FOUND", l
            }
            var g = s[r] = {exports: {}};
            e[r][0].call(g.exports, function (t) {
                return n(e[r][1][t] || t)
            }, g, g.exports, t, e, s, i)
        }
        return s[r].exports
    }

    for (var a = "function" == typeof require && require, r = 0; r < i.length; r++) n(i[r]);
    return n
}({
    1: [function (t, e, s) {
        window.mpe || (window.mpe = {}), window.mpe.hlsjs = t("p2p-media-loader-hlsjs")
    }, {"p2p-media-loader-hlsjs": "p2p-media-loader-hlsjs"}], 2: [function (t, e, s) {
        "use strict";
        Object.defineProperty(s, "__esModule", {value: !0});
        const i = t("events"), n = t("p2p-media-loader-core"), a = t("./segment-manager"), r = t("./hlsjs-loader"),
            o = t("./hlsjs-loader-class");
        s.Engine = class extends i.EventEmitter {
            constructor(t = {}) {
                super(), this.loader = new n.HybridLoader(t.loader), this.segmentManager = new a.SegmentManager(this.loader, t.segments), Object.keys(n.Events).map(t => n.Events[t]).forEach(t => this.loader.on(t, (...e) => this.emit(t, ...e)))
            }

            static isSupported() {
                return n.HybridLoader.isSupported()
            }

            createLoaderClass() {
                return o.createHlsJsLoaderClass(r.HlsJsLoader, this)
            }

            async destroy() {
                await this.segmentManager.destroy()
            }

            getSettings() {
                return {segments: this.segmentManager.getSettings(), loader: this.loader.getSettings()}
            }

            getDetails() {
                return {loader: this.loader.getDetails()}
            }

            setPlayingSegment(t, e, s, i) {
                this.segmentManager.setPlayingSegment(t, e, s, i)
            }

            setPlayingSegmentByCurrentTime(t) {
                this.segmentManager.setPlayingSegmentByCurrentTime(t)
            }
        }
    }, {
        "./hlsjs-loader": 4,
        "./hlsjs-loader-class": 3,
        "./segment-manager": 5,
        events: "events",
        "p2p-media-loader-core": "p2p-media-loader-core"
    }], 3: [function (t, e, s) {
        e.exports.createHlsJsLoaderClass = function (t, e) {
            function s() {
                this.impl = new t(e.segmentManager), this.stats = this.impl.stats
            }

            return s.prototype.load = function (t, e, s) {
                this.context = t, this.impl.load(t, e, s)
            }, s.prototype.abort = function () {
                this.impl.abort(this.context)
            }, s.prototype.destroy = function () {
                this.context && this.impl.abort(this.context)
            }, s.getEngine = function () {
                return e
            }, s
        }
    }, {}], 4: [function (t, e, s) {
        "use strict";
        Object.defineProperty(s, "__esModule", {value: !0});
        const i = 1, n = 12500;
        s.HlsJsLoader = class {
            constructor(t) {
                this.stats = {}, this.segmentManager = t
            }

            async load(t, e, s) {
                if (t.type) try {
                    const e = await this.segmentManager.loadPlaylist(t.url);
                    this.successPlaylist(e, t, s)
                } catch (e) {
                    this.error(e, t, s)
                } else if (t.frag) try {
                    const e = await this.segmentManager.loadSegment(t.url, null == t.rangeStart || null == t.rangeEnd ? void 0 : {
                        offset: t.rangeStart,
                        length: t.rangeEnd - t.rangeStart
                    });
                    void 0 !== e.content && setTimeout(() => this.successSegment(e.content, e.downloadBandwidth, t, s), 0)
                } catch (e) {
                    setTimeout(() => this.error(e, t, s), 0)
                } else console.warn("Unknown load request", t)
            }

            abort(t) {
                this.segmentManager.abortSegment(t.url, null == t.rangeStart || null == t.rangeEnd ? void 0 : {
                    offset: t.rangeStart,
                    length: t.rangeEnd - t.rangeStart
                })
            }

            successPlaylist(t, e, s) {
                const i = performance.now();
                this.stats.trequest = i - 300, this.stats.tfirst = i - 200, this.stats.tload = i, this.stats.loaded = t.response.length, s.onSuccess({
                    url: t.responseURL,
                    data: t.response
                }, this.stats, e)
            }

            successSegment(t, e, s, a) {
                const r = performance.now(), o = t.byteLength / (void 0 === e || e <= 0 ? n : e);
                this.stats.trequest = r - i - o, this.stats.tfirst = r - o, this.stats.tload = r, this.stats.loaded = t.byteLength, a.onSuccess({
                    url: s.url,
                    data: t
                }, this.stats, s)
            }

            error(t, e, s) {
                s.onError(t, e)
            }
        }
    }, {}], 5: [function (t, e, s) {
        "use strict";
        Object.defineProperty(s, "__esModule", {value: !0});
        const i = t("p2p-media-loader-core"), n = t("m3u8-parser"),
            a = {forwardSegmentCount: 20, swarmId: void 0, assetsStorage: void 0};
        s.SegmentManager = class {
            constructor(t, e = {}) {
                this.masterPlaylist = null, this.variantPlaylists = new Map, this.segmentRequest = null, this.playQueue = [], this.onSegmentLoaded = t => {
                    this.segmentRequest && this.segmentRequest.segmentUrl === t.url && l(this.segmentRequest.segmentByterange) === t.range && (this.segmentRequest.onSuccess(t.data.slice(0), t.downloadBandwidth), this.segmentRequest = null)
                }, this.onSegmentError = (t, e) => {
                    this.segmentRequest && this.segmentRequest.segmentUrl === t.url && l(this.segmentRequest.segmentByterange) === t.range && (this.segmentRequest.onError(e), this.segmentRequest = null)
                }, this.onSegmentAbort = t => {
                    this.segmentRequest && this.segmentRequest.segmentUrl === t.url && l(this.segmentRequest.segmentByterange) === t.range && (this.segmentRequest.onError("Loading aborted: internal abort"), this.segmentRequest = null)
                }, this.settings = Object.assign(Object.assign({}, a), e), this.loader = t, this.loader.on(i.Events.SegmentLoaded, this.onSegmentLoaded), this.loader.on(i.Events.SegmentError, this.onSegmentError), this.loader.on(i.Events.SegmentAbort, this.onSegmentAbort)
            }

            getSettings() {
                return this.settings
            }

            processPlaylist(t, e, s) {
                const i = new n.Parser;
                i.push(e), i.end();
                const a = new r(t, s, i.manifest);
                if (a.manifest.playlists) {
                    this.masterPlaylist = a;
                    for (const [t, e] of this.variantPlaylists) {
                        const {streamSwarmId: s, found: i, index: n} = this.getStreamSwarmId(e.requestUrl);
                        i ? (e.streamSwarmId = s, e.streamId = "V" + n.toString()) : this.variantPlaylists.delete(t)
                    }
                } else {
                    const {streamSwarmId: e, found: s, index: i} = this.getStreamSwarmId(t);
                    (s || null === this.masterPlaylist) && (a.streamSwarmId = e, a.streamId = null === this.masterPlaylist ? void 0 : "V" + i.toString(), this.variantPlaylists.set(t, a), this.updateSegments())
                }
            }

            async loadPlaylist(t) {
                const e = this.settings.assetsStorage;
                let s;
                if (void 0 !== e) {
                    let i;
                    void 0 === (i = this.getMasterSwarmId()) && (i = t.split("?")[0]);
                    const n = await e.getAsset(t, void 0, i);
                    void 0 !== n ? s = {
                        responseURL: n.responseUri,
                        response: n.data
                    } : (s = await this.loadContent(t, "text"), e.storeAsset({
                        masterManifestUri: null !== this.masterPlaylist ? this.masterPlaylist.requestUrl : t,
                        masterSwarmId: i,
                        requestUri: t,
                        responseUri: s.responseURL,
                        data: s.response
                    }))
                } else s = await this.loadContent(t, "text");
                return this.processPlaylist(t, s.response, s.responseURL), s
            }

            async loadSegment(t, e) {
                const s = this.getSegmentLocation(t, e), i = l(e);
                if (!s) {
                    let e;
                    const s = this.settings.assetsStorage;
                    if (void 0 !== s) {
                        let n, a = null !== this.masterPlaylist ? this.masterPlaylist.requestUrl : void 0;
                        if (void 0 === (n = this.getMasterSwarmId()) && 1 === this.variantPlaylists.size && (n = this.variantPlaylists.values().next().value.requestUrl.split("?")[0]), void 0 === a && 1 === this.variantPlaylists.size && (a = this.variantPlaylists.values().next().value.requestUrl), void 0 !== n && void 0 !== a) {
                            const r = await s.getAsset(t, i, n);
                            if (void 0 !== r) e = r.data; else {
                                const r = await this.loadContent(t, "arraybuffer", i);
                                e = r.response, s.storeAsset({
                                    masterManifestUri: a,
                                    masterSwarmId: n,
                                    requestUri: t,
                                    requestRange: i,
                                    responseUri: r.responseURL,
                                    data: e
                                })
                            }
                        }
                    }
                    if (void 0 === e) {
                        e = (await this.loadContent(t, "arraybuffer", i)).response
                    }
                    return {content: e, downloadBandwidth: 0}
                }
                const n = (s.playlist.manifest.mediaSequence ? s.playlist.manifest.mediaSequence : 0) + s.segmentIndex;
                if (this.playQueue.length > 0) {
                    this.playQueue[this.playQueue.length - 1].segmentSequence !== n - 1 && (this.playQueue = [])
                }
                this.segmentRequest && this.segmentRequest.onError("Cancel segment request: simultaneous segment requests are not supported");
                const a = new Promise((i, a) => {
                    this.segmentRequest = new o(t, e, n, s.playlist.requestUrl, (t, e) => i({
                        content: t,
                        downloadBandwidth: e
                    }), t => a(t))
                });
                return this.playQueue.push({
                    segmentUrl: t,
                    segmentByterange: e,
                    segmentSequence: n
                }), this.loadSegments(s.playlist, s.segmentIndex, !0), a
            }

            setPlayingSegment(t, e, s, i) {
                const n = this.playQueue.findIndex(s => s.segmentUrl == t && u(s.segmentByterange, e));
                n >= 0 && (this.playQueue = this.playQueue.slice(n), this.playQueue[0].playPosition = {
                    start: s,
                    duration: i
                }, this.updateSegments())
            }

            setPlayingSegmentByCurrentTime(t) {
                if (0 === this.playQueue.length || !this.playQueue[0].playPosition) return;
                const e = this.playQueue[0].playPosition;
                e.start + e.duration - t < .2 && (this.playQueue = this.playQueue.slice(1), this.updateSegments())
            }

            abortSegment(t, e) {
                this.segmentRequest && this.segmentRequest.segmentUrl === t && u(this.segmentRequest.segmentByterange, e) && (this.segmentRequest.onSuccess(void 0, 0), this.segmentRequest = null)
            }

            async destroy() {
                this.segmentRequest && (this.segmentRequest.onError("Loading aborted: object destroyed"), this.segmentRequest = null), this.masterPlaylist = null, this.variantPlaylists.clear(), this.playQueue = [], void 0 !== this.settings.assetsStorage && await this.settings.assetsStorage.destroy(), await this.loader.destroy()
            }

            updateSegments() {
                if (!this.segmentRequest) return;
                const t = this.getSegmentLocation(this.segmentRequest.segmentUrl, this.segmentRequest.segmentByterange);
                t && this.loadSegments(t.playlist, t.segmentIndex, !1)
            }

            getSegmentLocation(t, e) {
                for (const s of this.variantPlaylists.values()) {
                    const i = s.getSegmentIndex(t, e);
                    if (i >= 0) return {playlist: s, segmentIndex: i}
                }
            }

            async loadSegments(t, e, s) {
                const i = [], n = t.manifest.segments, a = t.manifest.mediaSequence ? t.manifest.mediaSequence : 0;
                let r = null, o = Math.max(0, this.playQueue.length - 1);
                const u = this.getMasterSwarmId();
                for (let g = e; g < n.length && i.length < this.settings.forwardSegmentCount; ++g) {
                    const e = t.manifest.segments[g], n = t.getSegmentAbsoluteUrl(e.uri), d = e.byterange,
                        c = this.getSegmentId(t, a + g);
                    i.push({
                        id: c,
                        url: n,
                        masterSwarmId: void 0 !== u ? u : t.streamSwarmId,
                        masterManifestUri: null !== this.masterPlaylist ? this.masterPlaylist.requestUrl : t.requestUrl,
                        streamId: t.streamId,
                        sequence: (a + g).toString(),
                        range: l(d),
                        priority: o++
                    }), s && !r && (r = c)
                }
                if (this.loader.load(i, t.streamSwarmId), r) {
                    const t = await this.loader.getSegment(r);
                    t && this.onSegmentLoaded(t)
                }
            }

            getSegmentId(t, e) {
                return `${t.streamSwarmId}+${e}`
            }

            getMasterSwarmId() {
                const t = this.settings.swarmId && 0 !== this.settings.swarmId.length ? this.settings.swarmId : void 0;
                return void 0 !== t ? t : null !== this.masterPlaylist ? this.masterPlaylist.requestUrl.split("?")[0] : void 0
            }

            getStreamSwarmId(t) {
                const e = this.getMasterSwarmId();
                if (null !== this.masterPlaylist) for (let s = 0; s < this.masterPlaylist.manifest.playlists.length; ++s) {
                    if (new URL(this.masterPlaylist.manifest.playlists[s].uri, this.masterPlaylist.responseUrl).toString() === t) return {
                        streamSwarmId: `${e}+V${s}`,
                        found: !0,
                        index: s
                    }
                }
                return {streamSwarmId: void 0 !== e ? e : t.split("?")[0], found: !1, index: -1}
            }

            async loadContent(t, e, s) {
                return new Promise((i, n) => {
                    const a = new XMLHttpRequest;
                    a.open("GET", t, !0), a.responseType = e, s && a.setRequestHeader("Range", s), a.addEventListener("readystatechange", () => {
                        4 === a.readyState && (a.status >= 200 && a.status < 300 ? i(a) : n(a.statusText))
                    });
                    const r = this.loader.getSettings().xhrSetup;
                    r && r(a, t), a.send()
                })
            }
        };

        class r {
            constructor(t, e, s) {
                this.requestUrl = t, this.responseUrl = e, this.manifest = s, this.streamSwarmId = ""
            }

            getSegmentIndex(t, e) {
                for (let s = 0; s < this.manifest.segments.length; ++s) {
                    const i = this.manifest.segments[s];
                    if (t === this.getSegmentAbsoluteUrl(i.uri) && u(i.byterange, e)) return s
                }
                return -1
            }

            getSegmentAbsoluteUrl(t) {
                return new URL(t, this.responseUrl).toString()
            }
        }

        class o {
            constructor(t, e, s, i, n, a) {
                this.segmentUrl = t, this.segmentByterange = e, this.segmentSequence = s, this.playlistRequestUrl = i, this.onSuccess = n, this.onError = a
            }
        }

        function u(t, e) {
            return void 0 === t ? void 0 === e : void 0 !== e && t.length === e.length && t.offset === e.offset
        }

        function l(t) {
            if (void 0 === t) return;
            const e = t.offset + t.length - 1;
            return `bytes=${t.offset}-${e}`
        }
    }, {"m3u8-parser": 7, "p2p-media-loader-core": "p2p-media-loader-core"}], 6: [function (t, e, s) {
        (function (t) {
            var s;
            s = "undefined" != typeof window ? window : void 0 !== t ? t : "undefined" != typeof self ? self : {}, e.exports = s
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}], 7: [function (t, e, s) {
        "use strict";
        Object.defineProperty(s, "__esModule", {value: !0});
        var i, n = (i = t("global/window")) && "object" == typeof i && "default" in i ? i.default : i;

        function a() {
            return (a = Object.assign || function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var s = arguments[e];
                    for (var i in s) Object.prototype.hasOwnProperty.call(s, i) && (t[i] = s[i])
                }
                return t
            }).apply(this, arguments)
        }

        function r(t, e) {
            t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
        }

        var o = function () {
            function t() {
                this.listeners = {}
            }

            var e = t.prototype;
            return e.on = function (t, e) {
                this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push(e)
            }, e.off = function (t, e) {
                if (!this.listeners[t]) return !1;
                var s = this.listeners[t].indexOf(e);
                return this.listeners[t].splice(s, 1), s > -1
            }, e.trigger = function (t) {
                var e, s, i, n = this.listeners[t];
                if (n) if (2 === arguments.length) for (s = n.length, e = 0; e < s; ++e) n[e].call(this, arguments[1]); else for (i = Array.prototype.slice.call(arguments, 1), s = n.length, e = 0; e < s; ++e) n[e].apply(this, i)
            }, e.dispose = function () {
                this.listeners = {}
            }, e.pipe = function (t) {
                this.on("data", function (e) {
                    t.push(e)
                })
            }, t
        }(), u = function (t) {
            function e() {
                var e;
                return (e = t.call(this) || this).buffer = "", e
            }

            return r(e, t), e.prototype.push = function (t) {
                var e;
                for (this.buffer += t, e = this.buffer.indexOf("\n"); e > -1; e = this.buffer.indexOf("\n")) this.trigger("data", this.buffer.substring(0, e)), this.buffer = this.buffer.substring(e + 1)
            }, e
        }(o), l = function (t) {
            for (var e, s = t.split(new RegExp('(?:^|,)((?:[^=]*)=(?:"[^"]*"|[^,]*))')), i = {}, n = s.length; n--;) "" !== s[n] && ((e = /([^=]*)=(.*)/.exec(s[n]).slice(1))[0] = e[0].replace(/^\s+|\s+$/g, ""), e[1] = e[1].replace(/^\s+|\s+$/g, ""), e[1] = e[1].replace(/^['"](.*)['"]$/g, "$1"), i[e[0]] = e[1]);
            return i
        }, g = function (t) {
            function e() {
                var e;
                return (e = t.call(this) || this).customParsers = [], e.tagMappers = [], e
            }

            r(e, t);
            var s = e.prototype;
            return s.push = function (t) {
                var e, s, i = this;
                0 !== (t = t.trim()).length && ("#" === t[0] ? this.tagMappers.reduce(function (e, s) {
                    var i = s(t);
                    return i === t ? e : e.concat([i])
                }, [t]).forEach(function (t) {
                    for (var n = 0; n < i.customParsers.length; n++) if (i.customParsers[n].call(i, t)) return;
                    if (0 === t.indexOf("#EXT")) if (t = t.replace("\r", ""), e = /^#EXTM3U/.exec(t)) i.trigger("data", {
                        type: "tag",
                        tagType: "m3u"
                    }); else {
                        if (e = /^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(t)) return s = {
                            type: "tag",
                            tagType: "inf"
                        }, e[1] && (s.duration = parseFloat(e[1])), e[2] && (s.title = e[2]), void i.trigger("data", s);
                        if (e = /^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(t)) return s = {
                            type: "tag",
                            tagType: "targetduration"
                        }, e[1] && (s.duration = parseInt(e[1], 10)), void i.trigger("data", s);
                        if (e = /^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(t)) return s = {
                            type: "tag",
                            tagType: "totalduration"
                        }, e[1] && (s.duration = parseInt(e[1], 10)), void i.trigger("data", s);
                        if (e = /^#EXT-X-VERSION:?([0-9.]*)?/.exec(t)) return s = {
                            type: "tag",
                            tagType: "version"
                        }, e[1] && (s.version = parseInt(e[1], 10)), void i.trigger("data", s);
                        if (e = /^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(t)) return s = {
                            type: "tag",
                            tagType: "media-sequence"
                        }, e[1] && (s.number = parseInt(e[1], 10)), void i.trigger("data", s);
                        if (e = /^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(t)) return s = {
                            type: "tag",
                            tagType: "discontinuity-sequence"
                        }, e[1] && (s.number = parseInt(e[1], 10)), void i.trigger("data", s);
                        if (e = /^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(t)) return s = {
                            type: "tag",
                            tagType: "playlist-type"
                        }, e[1] && (s.playlistType = e[1]), void i.trigger("data", s);
                        if (e = /^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(t)) return s = {
                            type: "tag",
                            tagType: "byterange"
                        }, e[1] && (s.length = parseInt(e[1], 10)), e[2] && (s.offset = parseInt(e[2], 10)), void i.trigger("data", s);
                        if (e = /^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(t)) return s = {
                            type: "tag",
                            tagType: "allow-cache"
                        }, e[1] && (s.allowed = !/NO/.test(e[1])), void i.trigger("data", s);
                        if (e = /^#EXT-X-MAP:?(.*)$/.exec(t)) {
                            if (s = {type: "tag", tagType: "map"}, e[1]) {
                                var a = l(e[1]);
                                if (a.URI && (s.uri = a.URI), a.BYTERANGE) {
                                    var r = a.BYTERANGE.split("@"), o = r[0], u = r[1];
                                    s.byterange = {}, o && (s.byterange.length = parseInt(o, 10)), u && (s.byterange.offset = parseInt(u, 10))
                                }
                            }
                            i.trigger("data", s)
                        } else if (e = /^#EXT-X-STREAM-INF:?(.*)$/.exec(t)) {
                            if (s = {type: "tag", tagType: "stream-inf"}, e[1]) {
                                if (s.attributes = l(e[1]), s.attributes.RESOLUTION) {
                                    var g = s.attributes.RESOLUTION.split("x"), d = {};
                                    g[0] && (d.width = parseInt(g[0], 10)), g[1] && (d.height = parseInt(g[1], 10)), s.attributes.RESOLUTION = d
                                }
                                s.attributes.BANDWIDTH && (s.attributes.BANDWIDTH = parseInt(s.attributes.BANDWIDTH, 10)), s.attributes["PROGRAM-ID"] && (s.attributes["PROGRAM-ID"] = parseInt(s.attributes["PROGRAM-ID"], 10))
                            }
                            i.trigger("data", s)
                        } else {
                            if (e = /^#EXT-X-MEDIA:?(.*)$/.exec(t)) return s = {
                                type: "tag",
                                tagType: "media"
                            }, e[1] && (s.attributes = l(e[1])), void i.trigger("data", s);
                            if (e = /^#EXT-X-ENDLIST/.exec(t)) i.trigger("data", {
                                type: "tag",
                                tagType: "endlist"
                            }); else if (e = /^#EXT-X-DISCONTINUITY/.exec(t)) i.trigger("data", {
                                type: "tag",
                                tagType: "discontinuity"
                            }); else {
                                if (e = /^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(t)) return s = {
                                    type: "tag",
                                    tagType: "program-date-time"
                                }, e[1] && (s.dateTimeString = e[1], s.dateTimeObject = new Date(e[1])), void i.trigger("data", s);
                                if (e = /^#EXT-X-KEY:?(.*)$/.exec(t)) return s = {
                                    type: "tag",
                                    tagType: "key"
                                }, e[1] && (s.attributes = l(e[1]), s.attributes.IV && ("0x" === s.attributes.IV.substring(0, 2).toLowerCase() && (s.attributes.IV = s.attributes.IV.substring(2)), s.attributes.IV = s.attributes.IV.match(/.{8}/g), s.attributes.IV[0] = parseInt(s.attributes.IV[0], 16), s.attributes.IV[1] = parseInt(s.attributes.IV[1], 16), s.attributes.IV[2] = parseInt(s.attributes.IV[2], 16), s.attributes.IV[3] = parseInt(s.attributes.IV[3], 16), s.attributes.IV = new Uint32Array(s.attributes.IV))), void i.trigger("data", s);
                                if (e = /^#EXT-X-START:?(.*)$/.exec(t)) return s = {
                                    type: "tag",
                                    tagType: "start"
                                }, e[1] && (s.attributes = l(e[1]), s.attributes["TIME-OFFSET"] = parseFloat(s.attributes["TIME-OFFSET"]), s.attributes.PRECISE = /YES/.test(s.attributes.PRECISE)), void i.trigger("data", s);
                                if (e = /^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(t)) return s = {
                                    type: "tag",
                                    tagType: "cue-out-cont"
                                }, e[1] ? s.data = e[1] : s.data = "", void i.trigger("data", s);
                                if (e = /^#EXT-X-CUE-OUT:?(.*)?$/.exec(t)) return s = {
                                    type: "tag",
                                    tagType: "cue-out"
                                }, e[1] ? s.data = e[1] : s.data = "", void i.trigger("data", s);
                                if (e = /^#EXT-X-CUE-IN:?(.*)?$/.exec(t)) return s = {
                                    type: "tag",
                                    tagType: "cue-in"
                                }, e[1] ? s.data = e[1] : s.data = "", void i.trigger("data", s);
                                i.trigger("data", {type: "tag", data: t.slice(4)})
                            }
                        }
                    } else i.trigger("data", {type: "comment", text: t.slice(1)})
                }) : this.trigger("data", {type: "uri", uri: t}))
            }, s.addParser = function (t) {
                var e = this, s = t.expression, i = t.customType, n = t.dataParser, a = t.segment;
                "function" != typeof n && (n = function (t) {
                    return t
                }), this.customParsers.push(function (t) {
                    if (s.exec(t)) return e.trigger("data", {type: "custom", data: n(t), customType: i, segment: a}), !0
                })
            }, s.addTagMapper = function (t) {
                var e = t.expression, s = t.map;
                this.tagMappers.push(function (t) {
                    return e.test(t) ? s(t) : t
                })
            }, e
        }(o);

        function d(t) {
            for (var e = n.atob(t || ""), s = new Uint8Array(e.length), i = 0; i < e.length; i++) s[i] = e.charCodeAt(i);
            return s
        }

        var c = function (t) {
            function e() {
                var e;
                (e = t.call(this) || this).lineStream = new u, e.parseStream = new g, e.lineStream.pipe(e.parseStream);
                var s, i, n = function (t) {
                    if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return t
                }(e), r = [], o = {}, l = function () {
                }, c = {AUDIO: {}, VIDEO: {}, "CLOSED-CAPTIONS": {}, SUBTITLES: {}}, m = 0;
                return e.manifest = {
                    allowCache: !0,
                    discontinuityStarts: [],
                    segments: []
                }, e.parseStream.on("data", function (t) {
                    var e, u;
                    ({
                        tag: function () {
                            ({
                                "allow-cache": function () {
                                    this.manifest.allowCache = t.allowed, "allowed" in t || (this.trigger("info", {message: "defaulting allowCache to YES"}), this.manifest.allowCache = !0)
                                }, byterange: function () {
                                    var e = {};
                                    "length" in t && (o.byterange = e, e.length = t.length, "offset" in t || (this.trigger("info", {message: "defaulting offset to zero"}), t.offset = 0)), "offset" in t && (o.byterange = e, e.offset = t.offset)
                                }, endlist: function () {
                                    this.manifest.endList = !0
                                }, inf: function () {
                                    "mediaSequence" in this.manifest || (this.manifest.mediaSequence = 0, this.trigger("info", {message: "defaulting media sequence to zero"})), "discontinuitySequence" in this.manifest || (this.manifest.discontinuitySequence = 0, this.trigger("info", {message: "defaulting discontinuity sequence to zero"})), t.duration > 0 && (o.duration = t.duration), 0 === t.duration && (o.duration = .01, this.trigger("info", {message: "updating zero segment duration to a small value"})), this.manifest.segments = r
                                }, key: function () {
                                    if (t.attributes) if ("NONE" !== t.attributes.METHOD) if (t.attributes.URI) {
                                        if ("urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed" === t.attributes.KEYFORMAT) {
                                            return -1 === ["SAMPLE-AES", "SAMPLE-AES-CTR", "SAMPLE-AES-CENC"].indexOf(t.attributes.METHOD) ? void this.trigger("warn", {message: "invalid key method provided for Widevine"}) : ("SAMPLE-AES-CENC" === t.attributes.METHOD && this.trigger("warn", {message: "SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead"}), "data:text/plain;base64," !== t.attributes.URI.substring(0, 23) ? void this.trigger("warn", {message: "invalid key URI provided for Widevine"}) : t.attributes.KEYID && "0x" === t.attributes.KEYID.substring(0, 2) ? void (this.manifest.contentProtection = {
                                                "com.widevine.alpha": {
                                                    attributes: {
                                                        schemeIdUri: t.attributes.KEYFORMAT,
                                                        keyId: t.attributes.KEYID.substring(2)
                                                    }, pssh: d(t.attributes.URI.split(",")[1])
                                                }
                                            }) : void this.trigger("warn", {message: "invalid key ID provided for Widevine"}))
                                        }
                                        t.attributes.METHOD || this.trigger("warn", {message: "defaulting key method to AES-128"}), i = {
                                            method: t.attributes.METHOD || "AES-128",
                                            uri: t.attributes.URI
                                        }, void 0 !== t.attributes.IV && (i.iv = t.attributes.IV)
                                    } else this.trigger("warn", {message: "ignoring key declaration without URI"}); else i = null; else this.trigger("warn", {message: "ignoring key declaration without attribute list"})
                                }, "media-sequence": function () {
                                    isFinite(t.number) ? this.manifest.mediaSequence = t.number : this.trigger("warn", {message: "ignoring invalid media sequence: " + t.number})
                                }, "discontinuity-sequence": function () {
                                    isFinite(t.number) ? (this.manifest.discontinuitySequence = t.number, m = t.number) : this.trigger("warn", {message: "ignoring invalid discontinuity sequence: " + t.number})
                                }, "playlist-type": function () {
                                    /VOD|EVENT/.test(t.playlistType) ? this.manifest.playlistType = t.playlistType : this.trigger("warn", {message: "ignoring unknown playlist type: " + t.playlist})
                                }, map: function () {
                                    s = {}, t.uri && (s.uri = t.uri), t.byterange && (s.byterange = t.byterange)
                                }, "stream-inf": function () {
                                    this.manifest.playlists = r, this.manifest.mediaGroups = this.manifest.mediaGroups || c, t.attributes ? (o.attributes || (o.attributes = {}), a(o.attributes, t.attributes)) : this.trigger("warn", {message: "ignoring empty stream-inf attributes"})
                                }, media: function () {
                                    if (this.manifest.mediaGroups = this.manifest.mediaGroups || c, t.attributes && t.attributes.TYPE && t.attributes["GROUP-ID"] && t.attributes.NAME) {
                                        var s = this.manifest.mediaGroups[t.attributes.TYPE];
                                        s[t.attributes["GROUP-ID"]] = s[t.attributes["GROUP-ID"]] || {}, e = s[t.attributes["GROUP-ID"]], (u = {default: /yes/i.test(t.attributes.DEFAULT)}).default ? u.autoselect = !0 : u.autoselect = /yes/i.test(t.attributes.AUTOSELECT), t.attributes.LANGUAGE && (u.language = t.attributes.LANGUAGE), t.attributes.URI && (u.uri = t.attributes.URI), t.attributes["INSTREAM-ID"] && (u.instreamId = t.attributes["INSTREAM-ID"]), t.attributes.CHARACTERISTICS && (u.characteristics = t.attributes.CHARACTERISTICS), t.attributes.FORCED && (u.forced = /yes/i.test(t.attributes.FORCED)), e[t.attributes.NAME] = u
                                    } else this.trigger("warn", {message: "ignoring incomplete or missing media group"})
                                }, discontinuity: function () {
                                    m += 1, o.discontinuity = !0, this.manifest.discontinuityStarts.push(r.length)
                                }, "program-date-time": function () {
                                    void 0 === this.manifest.dateTimeString && (this.manifest.dateTimeString = t.dateTimeString, this.manifest.dateTimeObject = t.dateTimeObject), o.dateTimeString = t.dateTimeString, o.dateTimeObject = t.dateTimeObject
                                }, targetduration: function () {
                                    !isFinite(t.duration) || t.duration < 0 ? this.trigger("warn", {message: "ignoring invalid target duration: " + t.duration}) : this.manifest.targetDuration = t.duration
                                }, totalduration: function () {
                                    !isFinite(t.duration) || t.duration < 0 ? this.trigger("warn", {message: "ignoring invalid total duration: " + t.duration}) : this.manifest.totalDuration = t.duration
                                }, start: function () {
                                    t.attributes && !isNaN(t.attributes["TIME-OFFSET"]) ? this.manifest.start = {
                                        timeOffset: t.attributes["TIME-OFFSET"],
                                        precise: t.attributes.PRECISE
                                    } : this.trigger("warn", {message: "ignoring start declaration without appropriate attribute list"})
                                }, "cue-out": function () {
                                    o.cueOut = t.data
                                }, "cue-out-cont": function () {
                                    o.cueOutCont = t.data
                                }, "cue-in": function () {
                                    o.cueIn = t.data
                                }
                            }[t.tagType] || l).call(n)
                        }, uri: function () {
                            o.uri = t.uri, r.push(o), !this.manifest.targetDuration || "duration" in o || (this.trigger("warn", {message: "defaulting segment duration to the target duration"}), o.duration = this.manifest.targetDuration), i && (o.key = i), o.timeline = m, s && (o.map = s), o = {}
                        }, comment: function () {
                        }, custom: function () {
                            t.segment ? (o.custom = o.custom || {}, o.custom[t.customType] = t.data) : (this.manifest.custom = this.manifest.custom || {}, this.manifest.custom[t.customType] = t.data)
                        }
                    })[t.type].call(n)
                }), e
            }

            r(e, t);
            var s = e.prototype;
            return s.push = function (t) {
                this.lineStream.push(t)
            }, s.end = function () {
                this.lineStream.push("\n")
            }, s.addParser = function (t) {
                this.parseStream.addParser(t)
            }, s.addTagMapper = function (t) {
                this.parseStream.addTagMapper(t)
            }, e
        }(o);
        s.LineStream = u, s.ParseStream = g, s.Parser = c
    }, {"global/window": 6}], "p2p-media-loader-hlsjs": [function (t, e, s) {
        "use strict";

        function i(t) {
            for (var e in t) s.hasOwnProperty(e) || (s[e] = t[e])
        }

        function n(t) {
            t && t.config && t.config.loader && "function" == typeof t.config.loader.getEngine && a(t, t.config.loader.getEngine())
        }

        function a(t, e) {
            t.on("hlsFragChanged", (t, s) => {
                const i = s.frag, n = 2 !== i.byteRange.length ? void 0 : {
                    offset: i.byteRange[0],
                    length: i.byteRange[1] - i.byteRange[0]
                };
                e.setPlayingSegment(i.url, n, i.start, i.duration)
            }), t.on("hlsDestroying", async () => {
                await e.destroy()
            }), t.on("hlsError", (s, i) => {
                if ("bufferStalledError" === i.details) {
                    const s = void 0 === t.media ? t.el_ : t.media;
                    if (void 0 === s) return;
                    e.setPlayingSegmentByCurrentTime(s.currentTime)
                }
            })
        }

        Object.defineProperty(s, "__esModule", {value: !0}), s.version = "0.6.2", i(t("./engine")), i(t("./segment-manager")), s.initHlsJsPlayer = n, s.initClapprPlayer = function (t) {
            t.on("play", () => {
                const e = t.core.getCurrentPlayback();
                e._hls && !e._hls._p2pm_linitialized && (e._hls._p2pm_linitialized = !0, n(t.core.getCurrentPlayback()._hls))
            })
        }, s.initFlowplayerHlsJsPlayer = function (t) {
            t.on("ready", () => n(t.engine.hlsjs ? t.engine.hlsjs : t.engine.hls))
        }, s.initVideoJsContribHlsJsPlayer = function (t) {
            t.ready(() => {
                const e = t.tech_.options_;
                e && e.hlsjsConfig && e.hlsjsConfig.loader && "function" == typeof e.hlsjsConfig.loader.getEngine && a(t.tech_, e.hlsjsConfig.loader.getEngine())
            })
        }, s.initVideoJsHlsJsPlugin = function () {
            null != videojs && null != videojs.Html5Hlsjs && videojs.Html5Hlsjs.addHook("beforeinitialize", (t, e) => {
                e.config && e.config.loader && "function" == typeof e.config.loader.getEngine && a(e, e.config.loader.getEngine())
            })
        }, s.initMediaElementJsPlayer = function (t) {
            t.addEventListener("hlsFragChanged", e => {
                const s = t.hlsPlayer;
                if (s && s.config && s.config.loader && "function" == typeof s.config.loader.getEngine) {
                    const t = s.config.loader.getEngine();
                    if (e.data && e.data.length > 1) {
                        const s = e.data[1].frag, i = 2 !== s.byteRange.length ? void 0 : {
                            offset: s.byteRange[0],
                            length: s.byteRange[1] - s.byteRange[0]
                        };
                        t.setPlayingSegment(s.url, i, s.start, s.duration)
                    }
                }
            }), t.addEventListener("hlsDestroying", async () => {
                const e = t.hlsPlayer;
                if (e && e.config && e.config.loader && "function" == typeof e.config.loader.getEngine) {
                    const t = e.config.loader.getEngine();
                    await t.destroy()
                }
            }), t.addEventListener("hlsError", e => {
                const s = t.hlsPlayer;
                if (s && s.config && s.config.loader && "function" == typeof s.config.loader.getEngine && void 0 !== e.data && "bufferStalledError" === e.data.details) {
                    s.config.loader.getEngine().setPlayingSegmentByCurrentTime(s.media.currentTime)
                }
            })
        }, s.initJwPlayer = function (t, e) {
            const s = setInterval(() => {
                t.hls && t.hls.config && (clearInterval(s), Object.assign(t.hls.config, e), n(t.hls))
            }, 200)
        }
    }, {"./engine": 2, "./segment-manager": 5}]
}, {}, [1]);
