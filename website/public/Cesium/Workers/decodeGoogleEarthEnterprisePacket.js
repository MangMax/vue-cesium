define(['./RuntimeError-9b4ce3fb', './defaultValue-f6d5e6da', './createTaskProcessorWorker'], function (e, t, n) {
  'use strict'
  const i = 1953029805,
    r = 2917034100
  function a(t, n) {
    if (a.passThroughDataForTesting) return n
    const o = t.byteLength
    if (0 === o || o % 4 != 0) throw new e.RuntimeError('The length of key must be greater than 0 and a multiple of 4.')
    const s = new DataView(n),
      l = s.getUint32(0, !0)
    if (l === i || l === r) return n
    const c = new DataView(t)
    let d = 0
    const f = n.byteLength,
      h = f - (f % 8),
      u = o
    let w,
      b = 8
    for (; d < h; )
      for (b = (b + 8) % 24, w = b; d < h && w < u; )
        s.setUint32(d, s.getUint32(d, !0) ^ c.getUint32(w, !0), !0),
          s.setUint32(d + 4, s.getUint32(d + 4, !0) ^ c.getUint32(w + 4, !0), !0),
          (d += 8),
          (w += 24)
    if (d < f) for (w >= u && ((b = (b + 8) % 24), (w = b)); d < f; ) s.setUint8(d, s.getUint8(d) ^ c.getUint8(w)), d++, w++
  }
  function o(e, t) {
    return 0 != (e & t)
  }
  a.passThroughDataForTesting = !1
  const s = [1, 2, 4, 8]
  function l(e, t, n, i, r, a) {
    ;(this._bits = e),
      (this.cnodeVersion = t),
      (this.imageryVersion = n),
      (this.terrainVersion = i),
      (this.imageryProvider = r),
      (this.terrainProvider = a),
      (this.ancestorHasTerrain = !1),
      (this.terrainState = void 0)
  }
  ;(l.clone = function (e, n) {
    return (
      t.defined(n)
        ? ((n._bits = e._bits),
          (n.cnodeVersion = e.cnodeVersion),
          (n.imageryVersion = e.imageryVersion),
          (n.terrainVersion = e.terrainVersion),
          (n.imageryProvider = e.imageryProvider),
          (n.terrainProvider = e.terrainProvider))
        : (n = new l(e._bits, e.cnodeVersion, e.imageryVersion, e.terrainVersion, e.imageryProvider, e.terrainProvider)),
      (n.ancestorHasTerrain = e.ancestorHasTerrain),
      (n.terrainState = e.terrainState),
      n
    )
  }),
    (l.prototype.setParent = function (e) {
      this.ancestorHasTerrain = e.ancestorHasTerrain || this.hasTerrain()
    }),
    (l.prototype.hasSubtree = function () {
      return o(this._bits, 16)
    }),
    (l.prototype.hasImagery = function () {
      return o(this._bits, 64)
    }),
    (l.prototype.hasTerrain = function () {
      return o(this._bits, 128)
    }),
    (l.prototype.hasChildren = function () {
      return o(this._bits, 15)
    }),
    (l.prototype.hasChild = function (e) {
      return o(this._bits, s[e])
    }),
    (l.prototype.getChildBitmask = function () {
      return 15 & this._bits
    })
  var c = {},
    d = {}
  var f = (e, t, n, i) => {
    let r = (65535 & e) | 0,
      a = ((e >>> 16) & 65535) | 0,
      o = 0
    for (; 0 !== n; ) {
      ;(o = n > 2e3 ? 2e3 : n), (n -= o)
      do {
        ;(r = (r + t[i++]) | 0), (a = (a + r) | 0)
      } while (--o)
      ;(r %= 65521), (a %= 65521)
    }
    return r | (a << 16) | 0
  }
  const h = new Uint32Array(
    (() => {
      let e,
        t = []
      for (var n = 0; n < 256; n++) {
        e = n
        for (var i = 0; i < 8; i++) e = 1 & e ? 3988292384 ^ (e >>> 1) : e >>> 1
        t[n] = e
      }
      return t
    })()
  )
  var u = (e, t, n, i) => {
    const r = h,
      a = i + n
    e ^= -1
    for (let n = i; n < a; n++) e = (e >>> 8) ^ r[255 & (e ^ t[n])]
    return -1 ^ e
  }
  const w = 16209
  const b = 15,
    m = new Uint16Array([3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]),
    g = new Uint8Array([16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]),
    k = new Uint16Array([
      1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0,
      0
    ]),
    _ = new Uint8Array([
      16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64
    ])
  var p = {
    Z_NO_FLUSH: 0,
    Z_PARTIAL_FLUSH: 1,
    Z_SYNC_FLUSH: 2,
    Z_FULL_FLUSH: 3,
    Z_FINISH: 4,
    Z_BLOCK: 5,
    Z_TREES: 6,
    Z_OK: 0,
    Z_STREAM_END: 1,
    Z_NEED_DICT: 2,
    Z_ERRNO: -1,
    Z_STREAM_ERROR: -2,
    Z_DATA_ERROR: -3,
    Z_MEM_ERROR: -4,
    Z_BUF_ERROR: -5,
    Z_NO_COMPRESSION: 0,
    Z_BEST_SPEED: 1,
    Z_BEST_COMPRESSION: 9,
    Z_DEFAULT_COMPRESSION: -1,
    Z_FILTERED: 1,
    Z_HUFFMAN_ONLY: 2,
    Z_RLE: 3,
    Z_FIXED: 4,
    Z_DEFAULT_STRATEGY: 0,
    Z_BINARY: 0,
    Z_TEXT: 1,
    Z_UNKNOWN: 2,
    Z_DEFLATED: 8
  }
  const y = f,
    v = u,
    E = function (e, t) {
      let n, i, r, a, o, s, l, c, d, f, h, u, b, m, g, k, _, p, y, v, E, x, R, A
      const T = e.state
      ;(n = e.next_in),
        (R = e.input),
        (i = n + (e.avail_in - 5)),
        (r = e.next_out),
        (A = e.output),
        (a = r - (t - e.avail_out)),
        (o = r + (e.avail_out - 257)),
        (s = T.dmax),
        (l = T.wsize),
        (c = T.whave),
        (d = T.wnext),
        (f = T.window),
        (h = T.hold),
        (u = T.bits),
        (b = T.lencode),
        (m = T.distcode),
        (g = (1 << T.lenbits) - 1),
        (k = (1 << T.distbits) - 1)
      e: do {
        u < 15 && ((h += R[n++] << u), (u += 8), (h += R[n++] << u), (u += 8)), (_ = b[h & g])
        t: for (;;) {
          if (((p = _ >>> 24), (h >>>= p), (u -= p), (p = (_ >>> 16) & 255), 0 === p)) A[r++] = 65535 & _
          else {
            if (!(16 & p)) {
              if (0 == (64 & p)) {
                _ = b[(65535 & _) + (h & ((1 << p) - 1))]
                continue t
              }
              if (32 & p) {
                T.mode = 16191
                break e
              }
              ;(e.msg = 'invalid literal/length code'), (T.mode = w)
              break e
            }
            ;(y = 65535 & _),
              (p &= 15),
              p && (u < p && ((h += R[n++] << u), (u += 8)), (y += h & ((1 << p) - 1)), (h >>>= p), (u -= p)),
              u < 15 && ((h += R[n++] << u), (u += 8), (h += R[n++] << u), (u += 8)),
              (_ = m[h & k])
            n: for (;;) {
              if (((p = _ >>> 24), (h >>>= p), (u -= p), (p = (_ >>> 16) & 255), !(16 & p))) {
                if (0 == (64 & p)) {
                  _ = m[(65535 & _) + (h & ((1 << p) - 1))]
                  continue n
                }
                ;(e.msg = 'invalid distance code'), (T.mode = w)
                break e
              }
              if (
                ((v = 65535 & _),
                (p &= 15),
                u < p && ((h += R[n++] << u), (u += 8), u < p && ((h += R[n++] << u), (u += 8))),
                (v += h & ((1 << p) - 1)),
                v > s)
              ) {
                ;(e.msg = 'invalid distance too far back'), (T.mode = w)
                break e
              }
              if (((h >>>= p), (u -= p), (p = r - a), v > p)) {
                if (((p = v - p), p > c && T.sane)) {
                  ;(e.msg = 'invalid distance too far back'), (T.mode = w)
                  break e
                }
                if (((E = 0), (x = f), 0 === d)) {
                  if (((E += l - p), p < y)) {
                    y -= p
                    do {
                      A[r++] = f[E++]
                    } while (--p)
                    ;(E = r - v), (x = A)
                  }
                } else if (d < p) {
                  if (((E += l + d - p), (p -= d), p < y)) {
                    y -= p
                    do {
                      A[r++] = f[E++]
                    } while (--p)
                    if (((E = 0), d < y)) {
                      ;(p = d), (y -= p)
                      do {
                        A[r++] = f[E++]
                      } while (--p)
                      ;(E = r - v), (x = A)
                    }
                  }
                } else if (((E += d - p), p < y)) {
                  y -= p
                  do {
                    A[r++] = f[E++]
                  } while (--p)
                  ;(E = r - v), (x = A)
                }
                for (; y > 2; ) (A[r++] = x[E++]), (A[r++] = x[E++]), (A[r++] = x[E++]), (y -= 3)
                y && ((A[r++] = x[E++]), y > 1 && (A[r++] = x[E++]))
              } else {
                E = r - v
                do {
                  ;(A[r++] = A[E++]), (A[r++] = A[E++]), (A[r++] = A[E++]), (y -= 3)
                } while (y > 2)
                y && ((A[r++] = A[E++]), y > 1 && (A[r++] = A[E++]))
              }
              break
            }
          }
          break
        }
      } while (n < i && r < o)
      ;(y = u >> 3),
        (n -= y),
        (u -= y << 3),
        (h &= (1 << u) - 1),
        (e.next_in = n),
        (e.next_out = r),
        (e.avail_in = n < i ? i - n + 5 : 5 - (n - i)),
        (e.avail_out = r < o ? o - r + 257 : 257 - (r - o)),
        (T.hold = h),
        (T.bits = u)
    },
    x = (e, t, n, i, r, a, o, s) => {
      const l = s.bits
      let c,
        d,
        f,
        h,
        u,
        w,
        p = 0,
        y = 0,
        v = 0,
        E = 0,
        x = 0,
        R = 0,
        A = 0,
        T = 0,
        U = 0,
        S = 0,
        Z = null
      const D = new Uint16Array(16),
        I = new Uint16Array(16)
      let O,
        B,
        N,
        C = null
      for (p = 0; p <= b; p++) D[p] = 0
      for (y = 0; y < i; y++) D[t[n + y]]++
      for (x = l, E = b; E >= 1 && 0 === D[E]; E--);
      if ((x > E && (x = E), 0 === E)) return (r[a++] = 20971520), (r[a++] = 20971520), (s.bits = 1), 0
      for (v = 1; v < E && 0 === D[v]; v++);
      for (x < v && (x = v), T = 1, p = 1; p <= b; p++) if (((T <<= 1), (T -= D[p]), T < 0)) return -1
      if (T > 0 && (0 === e || 1 !== E)) return -1
      for (I[1] = 0, p = 1; p < b; p++) I[p + 1] = I[p] + D[p]
      for (y = 0; y < i; y++) 0 !== t[n + y] && (o[I[t[n + y]]++] = y)
      if (
        (0 === e ? ((Z = C = o), (w = 20)) : 1 === e ? ((Z = m), (C = g), (w = 257)) : ((Z = k), (C = _), (w = 0)),
        (S = 0),
        (y = 0),
        (p = v),
        (u = a),
        (R = x),
        (A = 0),
        (f = -1),
        (U = 1 << x),
        (h = U - 1),
        (1 === e && U > 852) || (2 === e && U > 592))
      )
        return 1
      for (;;) {
        ;(O = p - A),
          o[y] + 1 < w ? ((B = 0), (N = o[y])) : o[y] >= w ? ((B = C[o[y] - w]), (N = Z[o[y] - w])) : ((B = 96), (N = 0)),
          (c = 1 << (p - A)),
          (d = 1 << R),
          (v = d)
        do {
          ;(d -= c), (r[u + (S >> A) + d] = (O << 24) | (B << 16) | N | 0)
        } while (0 !== d)
        for (c = 1 << (p - 1); S & c; ) c >>= 1
        if ((0 !== c ? ((S &= c - 1), (S += c)) : (S = 0), y++, 0 == --D[p])) {
          if (p === E) break
          p = t[n + o[y]]
        }
        if (p > x && (S & h) !== f) {
          for (0 === A && (A = x), u += v, R = p - A, T = 1 << R; R + A < E && ((T -= D[R + A]), !(T <= 0)); ) R++, (T <<= 1)
          if (((U += 1 << R), (1 === e && U > 852) || (2 === e && U > 592))) return 1
          ;(f = S & h), (r[f] = (x << 24) | (R << 16) | (u - a) | 0)
        }
      }
      return 0 !== S && (r[u + S] = ((p - A) << 24) | (64 << 16) | 0), (s.bits = x), 0
    },
    {
      Z_FINISH: R,
      Z_BLOCK: A,
      Z_TREES: T,
      Z_OK: U,
      Z_STREAM_END: S,
      Z_NEED_DICT: Z,
      Z_STREAM_ERROR: D,
      Z_DATA_ERROR: I,
      Z_MEM_ERROR: O,
      Z_BUF_ERROR: B,
      Z_DEFLATED: N
    } = p,
    C = 16180,
    M = 16190,
    L = 16191,
    F = 16192,
    P = 16194,
    z = 16199,
    V = 16200,
    H = 16206,
    j = 16209,
    K = e => ((e >>> 24) & 255) + ((e >>> 8) & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
  function Y() {
    ;(this.strm = null),
      (this.mode = 0),
      (this.last = !1),
      (this.wrap = 0),
      (this.havedict = !1),
      (this.flags = 0),
      (this.dmax = 0),
      (this.check = 0),
      (this.total = 0),
      (this.head = null),
      (this.wbits = 0),
      (this.wsize = 0),
      (this.whave = 0),
      (this.wnext = 0),
      (this.window = null),
      (this.hold = 0),
      (this.bits = 0),
      (this.length = 0),
      (this.offset = 0),
      (this.extra = 0),
      (this.lencode = null),
      (this.distcode = null),
      (this.lenbits = 0),
      (this.distbits = 0),
      (this.ncode = 0),
      (this.nlen = 0),
      (this.ndist = 0),
      (this.have = 0),
      (this.next = null),
      (this.lens = new Uint16Array(320)),
      (this.work = new Uint16Array(288)),
      (this.lendyn = null),
      (this.distdyn = null),
      (this.sane = 0),
      (this.back = 0),
      (this.was = 0)
  }
  const G = e => {
      if (!e) return 1
      const t = e.state
      return !t || t.strm !== e || t.mode < C || t.mode > 16211 ? 1 : 0
    },
    Q = e => {
      if (G(e)) return D
      const t = e.state
      return (
        (e.total_in = e.total_out = t.total = 0),
        (e.msg = ''),
        t.wrap && (e.adler = 1 & t.wrap),
        (t.mode = C),
        (t.last = 0),
        (t.havedict = 0),
        (t.flags = -1),
        (t.dmax = 32768),
        (t.head = null),
        (t.hold = 0),
        (t.bits = 0),
        (t.lencode = t.lendyn = new Int32Array(852)),
        (t.distcode = t.distdyn = new Int32Array(592)),
        (t.sane = 1),
        (t.back = -1),
        U
      )
    },
    W = e => {
      if (G(e)) return D
      const t = e.state
      return (t.wsize = 0), (t.whave = 0), (t.wnext = 0), Q(e)
    },
    X = (e, t) => {
      let n
      if (G(e)) return D
      const i = e.state
      return (
        t < 0 ? ((n = 0), (t = -t)) : ((n = 5 + (t >> 4)), t < 48 && (t &= 15)),
        t && (t < 8 || t > 15) ? D : (null !== i.window && i.wbits !== t && (i.window = null), (i.wrap = n), (i.wbits = t), W(e))
      )
    },
    q = (e, t) => {
      if (!e) return D
      const n = new Y()
      ;(e.state = n), (n.strm = e), (n.window = null), (n.mode = C)
      const i = X(e, t)
      return i !== U && (e.state = null), i
    }
  let J,
    $,
    ee = !0
  const te = e => {
      if (ee) {
        ;(J = new Int32Array(512)), ($ = new Int32Array(32))
        let t = 0
        for (; t < 144; ) e.lens[t++] = 8
        for (; t < 256; ) e.lens[t++] = 9
        for (; t < 280; ) e.lens[t++] = 7
        for (; t < 288; ) e.lens[t++] = 8
        for (x(1, e.lens, 0, 288, J, 0, e.work, { bits: 9 }), t = 0; t < 32; ) e.lens[t++] = 5
        x(2, e.lens, 0, 32, $, 0, e.work, { bits: 5 }), (ee = !1)
      }
      ;(e.lencode = J), (e.lenbits = 9), (e.distcode = $), (e.distbits = 5)
    },
    ne = (e, t, n, i) => {
      let r
      const a = e.state
      return (
        null === a.window && ((a.wsize = 1 << a.wbits), (a.wnext = 0), (a.whave = 0), (a.window = new Uint8Array(a.wsize))),
        i >= a.wsize
          ? (a.window.set(t.subarray(n - a.wsize, n), 0), (a.wnext = 0), (a.whave = a.wsize))
          : ((r = a.wsize - a.wnext),
            r > i && (r = i),
            a.window.set(t.subarray(n - i, n - i + r), a.wnext),
            (i -= r)
              ? (a.window.set(t.subarray(n - i, n), 0), (a.wnext = i), (a.whave = a.wsize))
              : ((a.wnext += r), a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += r))),
        0
      )
    }
  ;(d.inflateReset = W),
    (d.inflateReset2 = X),
    (d.inflateResetKeep = Q),
    (d.inflateInit = e => q(e, 15)),
    (d.inflateInit2 = q),
    (d.inflate = (e, t) => {
      let n,
        i,
        r,
        a,
        o,
        s,
        l,
        c,
        d,
        f,
        h,
        u,
        w,
        b,
        m,
        g,
        k,
        _,
        p,
        Y,
        Q,
        W,
        X = 0
      const q = new Uint8Array(4)
      let J, $
      const ee = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
      if (G(e) || !e.output || (!e.input && 0 !== e.avail_in)) return D
      ;(n = e.state),
        n.mode === L && (n.mode = F),
        (o = e.next_out),
        (r = e.output),
        (l = e.avail_out),
        (a = e.next_in),
        (i = e.input),
        (s = e.avail_in),
        (c = n.hold),
        (d = n.bits),
        (f = s),
        (h = l),
        (W = U)
      e: for (;;)
        switch (n.mode) {
          case C:
            if (0 === n.wrap) {
              n.mode = F
              break
            }
            for (; d < 16; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (2 & n.wrap && 35615 === c) {
              0 === n.wbits && (n.wbits = 15),
                (n.check = 0),
                (q[0] = 255 & c),
                (q[1] = (c >>> 8) & 255),
                (n.check = v(n.check, q, 2, 0)),
                (c = 0),
                (d = 0),
                (n.mode = 16181)
              break
            }
            if ((n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & c) << 8) + (c >> 8)) % 31)) {
              ;(e.msg = 'incorrect header check'), (n.mode = j)
              break
            }
            if ((15 & c) !== N) {
              ;(e.msg = 'unknown compression method'), (n.mode = j)
              break
            }
            if (((c >>>= 4), (d -= 4), (Q = 8 + (15 & c)), 0 === n.wbits && (n.wbits = Q), Q > 15 || Q > n.wbits)) {
              ;(e.msg = 'invalid window size'), (n.mode = j)
              break
            }
            ;(n.dmax = 1 << n.wbits), (n.flags = 0), (e.adler = n.check = 1), (n.mode = 512 & c ? 16189 : L), (c = 0), (d = 0)
            break
          case 16181:
            for (; d < 16; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (((n.flags = c), (255 & n.flags) !== N)) {
              ;(e.msg = 'unknown compression method'), (n.mode = j)
              break
            }
            if (57344 & n.flags) {
              ;(e.msg = 'unknown header flags set'), (n.mode = j)
              break
            }
            n.head && (n.head.text = (c >> 8) & 1),
              512 & n.flags && 4 & n.wrap && ((q[0] = 255 & c), (q[1] = (c >>> 8) & 255), (n.check = v(n.check, q, 2, 0))),
              (c = 0),
              (d = 0),
              (n.mode = 16182)
          case 16182:
            for (; d < 32; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            n.head && (n.head.time = c),
              512 & n.flags &&
                4 & n.wrap &&
                ((q[0] = 255 & c), (q[1] = (c >>> 8) & 255), (q[2] = (c >>> 16) & 255), (q[3] = (c >>> 24) & 255), (n.check = v(n.check, q, 4, 0))),
              (c = 0),
              (d = 0),
              (n.mode = 16183)
          case 16183:
            for (; d < 16; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            n.head && ((n.head.xflags = 255 & c), (n.head.os = c >> 8)),
              512 & n.flags && 4 & n.wrap && ((q[0] = 255 & c), (q[1] = (c >>> 8) & 255), (n.check = v(n.check, q, 2, 0))),
              (c = 0),
              (d = 0),
              (n.mode = 16184)
          case 16184:
            if (1024 & n.flags) {
              for (; d < 16; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(n.length = c),
                n.head && (n.head.extra_len = c),
                512 & n.flags && 4 & n.wrap && ((q[0] = 255 & c), (q[1] = (c >>> 8) & 255), (n.check = v(n.check, q, 2, 0))),
                (c = 0),
                (d = 0)
            } else n.head && (n.head.extra = null)
            n.mode = 16185
          case 16185:
            if (
              1024 & n.flags &&
              ((u = n.length),
              u > s && (u = s),
              u &&
                (n.head &&
                  ((Q = n.head.extra_len - n.length),
                  n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)),
                  n.head.extra.set(i.subarray(a, a + u), Q)),
                512 & n.flags && 4 & n.wrap && (n.check = v(n.check, i, u, a)),
                (s -= u),
                (a += u),
                (n.length -= u)),
              n.length)
            )
              break e
            ;(n.length = 0), (n.mode = 16186)
          case 16186:
            if (2048 & n.flags) {
              if (0 === s) break e
              u = 0
              do {
                ;(Q = i[a + u++]), n.head && Q && n.length < 65536 && (n.head.name += String.fromCharCode(Q))
              } while (Q && u < s)
              if ((512 & n.flags && 4 & n.wrap && (n.check = v(n.check, i, u, a)), (s -= u), (a += u), Q)) break e
            } else n.head && (n.head.name = null)
            ;(n.length = 0), (n.mode = 16187)
          case 16187:
            if (4096 & n.flags) {
              if (0 === s) break e
              u = 0
              do {
                ;(Q = i[a + u++]), n.head && Q && n.length < 65536 && (n.head.comment += String.fromCharCode(Q))
              } while (Q && u < s)
              if ((512 & n.flags && 4 & n.wrap && (n.check = v(n.check, i, u, a)), (s -= u), (a += u), Q)) break e
            } else n.head && (n.head.comment = null)
            n.mode = 16188
          case 16188:
            if (512 & n.flags) {
              for (; d < 16; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              if (4 & n.wrap && c !== (65535 & n.check)) {
                ;(e.msg = 'header crc mismatch'), (n.mode = j)
                break
              }
              ;(c = 0), (d = 0)
            }
            n.head && ((n.head.hcrc = (n.flags >> 9) & 1), (n.head.done = !0)), (e.adler = n.check = 0), (n.mode = L)
            break
          case 16189:
            for (; d < 32; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            ;(e.adler = n.check = K(c)), (c = 0), (d = 0), (n.mode = M)
          case M:
            if (0 === n.havedict) return (e.next_out = o), (e.avail_out = l), (e.next_in = a), (e.avail_in = s), (n.hold = c), (n.bits = d), Z
            ;(e.adler = n.check = 1), (n.mode = L)
          case L:
            if (t === A || t === T) break e
          case F:
            if (n.last) {
              ;(c >>>= 7 & d), (d -= 7 & d), (n.mode = H)
              break
            }
            for (; d < 3; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            switch (((n.last = 1 & c), (c >>>= 1), (d -= 1), 3 & c)) {
              case 0:
                n.mode = 16193
                break
              case 1:
                if ((te(n), (n.mode = z), t === T)) {
                  ;(c >>>= 2), (d -= 2)
                  break e
                }
                break
              case 2:
                n.mode = 16196
                break
              case 3:
                ;(e.msg = 'invalid block type'), (n.mode = j)
            }
            ;(c >>>= 2), (d -= 2)
            break
          case 16193:
            for (c >>>= 7 & d, d -= 7 & d; d < 32; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if ((65535 & c) != ((c >>> 16) ^ 65535)) {
              ;(e.msg = 'invalid stored block lengths'), (n.mode = j)
              break
            }
            if (((n.length = 65535 & c), (c = 0), (d = 0), (n.mode = P), t === T)) break e
          case P:
            n.mode = 16195
          case 16195:
            if (((u = n.length), u)) {
              if ((u > s && (u = s), u > l && (u = l), 0 === u)) break e
              r.set(i.subarray(a, a + u), o), (s -= u), (a += u), (l -= u), (o += u), (n.length -= u)
              break
            }
            n.mode = L
            break
          case 16196:
            for (; d < 14; ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (
              ((n.nlen = 257 + (31 & c)),
              (c >>>= 5),
              (d -= 5),
              (n.ndist = 1 + (31 & c)),
              (c >>>= 5),
              (d -= 5),
              (n.ncode = 4 + (15 & c)),
              (c >>>= 4),
              (d -= 4),
              n.nlen > 286 || n.ndist > 30)
            ) {
              ;(e.msg = 'too many length or distance symbols'), (n.mode = j)
              break
            }
            ;(n.have = 0), (n.mode = 16197)
          case 16197:
            for (; n.have < n.ncode; ) {
              for (; d < 3; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(n.lens[ee[n.have++]] = 7 & c), (c >>>= 3), (d -= 3)
            }
            for (; n.have < 19; ) n.lens[ee[n.have++]] = 0
            if (
              ((n.lencode = n.lendyn),
              (n.lenbits = 7),
              (J = { bits: n.lenbits }),
              (W = x(0, n.lens, 0, 19, n.lencode, 0, n.work, J)),
              (n.lenbits = J.bits),
              W)
            ) {
              ;(e.msg = 'invalid code lengths set'), (n.mode = j)
              break
            }
            ;(n.have = 0), (n.mode = 16198)
          case 16198:
            for (; n.have < n.nlen + n.ndist; ) {
              for (; (X = n.lencode[c & ((1 << n.lenbits) - 1)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(m <= d); ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              if (k < 16) (c >>>= m), (d -= m), (n.lens[n.have++] = k)
              else {
                if (16 === k) {
                  for ($ = m + 2; d < $; ) {
                    if (0 === s) break e
                    s--, (c += i[a++] << d), (d += 8)
                  }
                  if (((c >>>= m), (d -= m), 0 === n.have)) {
                    ;(e.msg = 'invalid bit length repeat'), (n.mode = j)
                    break
                  }
                  ;(Q = n.lens[n.have - 1]), (u = 3 + (3 & c)), (c >>>= 2), (d -= 2)
                } else if (17 === k) {
                  for ($ = m + 3; d < $; ) {
                    if (0 === s) break e
                    s--, (c += i[a++] << d), (d += 8)
                  }
                  ;(c >>>= m), (d -= m), (Q = 0), (u = 3 + (7 & c)), (c >>>= 3), (d -= 3)
                } else {
                  for ($ = m + 7; d < $; ) {
                    if (0 === s) break e
                    s--, (c += i[a++] << d), (d += 8)
                  }
                  ;(c >>>= m), (d -= m), (Q = 0), (u = 11 + (127 & c)), (c >>>= 7), (d -= 7)
                }
                if (n.have + u > n.nlen + n.ndist) {
                  ;(e.msg = 'invalid bit length repeat'), (n.mode = j)
                  break
                }
                for (; u--; ) n.lens[n.have++] = Q
              }
            }
            if (n.mode === j) break
            if (0 === n.lens[256]) {
              ;(e.msg = 'invalid code -- missing end-of-block'), (n.mode = j)
              break
            }
            if (((n.lenbits = 9), (J = { bits: n.lenbits }), (W = x(1, n.lens, 0, n.nlen, n.lencode, 0, n.work, J)), (n.lenbits = J.bits), W)) {
              ;(e.msg = 'invalid literal/lengths set'), (n.mode = j)
              break
            }
            if (
              ((n.distbits = 6),
              (n.distcode = n.distdyn),
              (J = { bits: n.distbits }),
              (W = x(2, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, J)),
              (n.distbits = J.bits),
              W)
            ) {
              ;(e.msg = 'invalid distances set'), (n.mode = j)
              break
            }
            if (((n.mode = z), t === T)) break e
          case z:
            n.mode = V
          case V:
            if (s >= 6 && l >= 258) {
              ;(e.next_out = o),
                (e.avail_out = l),
                (e.next_in = a),
                (e.avail_in = s),
                (n.hold = c),
                (n.bits = d),
                E(e, h),
                (o = e.next_out),
                (r = e.output),
                (l = e.avail_out),
                (a = e.next_in),
                (i = e.input),
                (s = e.avail_in),
                (c = n.hold),
                (d = n.bits),
                n.mode === L && (n.back = -1)
              break
            }
            for (n.back = 0; (X = n.lencode[c & ((1 << n.lenbits) - 1)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(m <= d); ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (g && 0 == (240 & g)) {
              for (
                _ = m, p = g, Y = k;
                (X = n.lencode[Y + ((c & ((1 << (_ + p)) - 1)) >> _)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(_ + m <= d);

              ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(c >>>= _), (d -= _), (n.back += _)
            }
            if (((c >>>= m), (d -= m), (n.back += m), (n.length = k), 0 === g)) {
              n.mode = 16205
              break
            }
            if (32 & g) {
              ;(n.back = -1), (n.mode = L)
              break
            }
            if (64 & g) {
              ;(e.msg = 'invalid literal/length code'), (n.mode = j)
              break
            }
            ;(n.extra = 15 & g), (n.mode = 16201)
          case 16201:
            if (n.extra) {
              for ($ = n.extra; d < $; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(n.length += c & ((1 << n.extra) - 1)), (c >>>= n.extra), (d -= n.extra), (n.back += n.extra)
            }
            ;(n.was = n.length), (n.mode = 16202)
          case 16202:
            for (; (X = n.distcode[c & ((1 << n.distbits) - 1)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(m <= d); ) {
              if (0 === s) break e
              s--, (c += i[a++] << d), (d += 8)
            }
            if (0 == (240 & g)) {
              for (
                _ = m, p = g, Y = k;
                (X = n.distcode[Y + ((c & ((1 << (_ + p)) - 1)) >> _)]), (m = X >>> 24), (g = (X >>> 16) & 255), (k = 65535 & X), !(_ + m <= d);

              ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(c >>>= _), (d -= _), (n.back += _)
            }
            if (((c >>>= m), (d -= m), (n.back += m), 64 & g)) {
              ;(e.msg = 'invalid distance code'), (n.mode = j)
              break
            }
            ;(n.offset = k), (n.extra = 15 & g), (n.mode = 16203)
          case 16203:
            if (n.extra) {
              for ($ = n.extra; d < $; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              ;(n.offset += c & ((1 << n.extra) - 1)), (c >>>= n.extra), (d -= n.extra), (n.back += n.extra)
            }
            if (n.offset > n.dmax) {
              ;(e.msg = 'invalid distance too far back'), (n.mode = j)
              break
            }
            n.mode = 16204
          case 16204:
            if (0 === l) break e
            if (((u = h - l), n.offset > u)) {
              if (((u = n.offset - u), u > n.whave && n.sane)) {
                ;(e.msg = 'invalid distance too far back'), (n.mode = j)
                break
              }
              u > n.wnext ? ((u -= n.wnext), (w = n.wsize - u)) : (w = n.wnext - u), u > n.length && (u = n.length), (b = n.window)
            } else (b = r), (w = o - n.offset), (u = n.length)
            u > l && (u = l), (l -= u), (n.length -= u)
            do {
              r[o++] = b[w++]
            } while (--u)
            0 === n.length && (n.mode = V)
            break
          case 16205:
            if (0 === l) break e
            ;(r[o++] = n.length), l--, (n.mode = V)
            break
          case H:
            if (n.wrap) {
              for (; d < 32; ) {
                if (0 === s) break e
                s--, (c |= i[a++] << d), (d += 8)
              }
              if (
                ((h -= l),
                (e.total_out += h),
                (n.total += h),
                4 & n.wrap && h && (e.adler = n.check = n.flags ? v(n.check, r, h, o - h) : y(n.check, r, h, o - h)),
                (h = l),
                4 & n.wrap && (n.flags ? c : K(c)) !== n.check)
              ) {
                ;(e.msg = 'incorrect data check'), (n.mode = j)
                break
              }
              ;(c = 0), (d = 0)
            }
            n.mode = 16207
          case 16207:
            if (n.wrap && n.flags) {
              for (; d < 32; ) {
                if (0 === s) break e
                s--, (c += i[a++] << d), (d += 8)
              }
              if (4 & n.wrap && c !== (4294967295 & n.total)) {
                ;(e.msg = 'incorrect length check'), (n.mode = j)
                break
              }
              ;(c = 0), (d = 0)
            }
            n.mode = 16208
          case 16208:
            W = S
            break e
          case j:
            W = I
            break e
          case 16210:
            return O
          default:
            return D
        }
      return (
        (e.next_out = o),
        (e.avail_out = l),
        (e.next_in = a),
        (e.avail_in = s),
        (n.hold = c),
        (n.bits = d),
        (n.wsize || (h !== e.avail_out && n.mode < j && (n.mode < H || t !== R))) && ne(e, e.output, e.next_out, h - e.avail_out),
        (f -= e.avail_in),
        (h -= e.avail_out),
        (e.total_in += f),
        (e.total_out += h),
        (n.total += h),
        4 & n.wrap && h && (e.adler = n.check = n.flags ? v(n.check, r, h, e.next_out - h) : y(n.check, r, h, e.next_out - h)),
        (e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === L ? 128 : 0) + (n.mode === z || n.mode === P ? 256 : 0)),
        ((0 === f && 0 === h) || t === R) && W === U && (W = B),
        W
      )
    }),
    (d.inflateEnd = e => {
      if (G(e)) return D
      let t = e.state
      return t.window && (t.window = null), (e.state = null), U
    }),
    (d.inflateGetHeader = (e, t) => {
      if (G(e)) return D
      const n = e.state
      return 0 == (2 & n.wrap) ? D : ((n.head = t), (t.done = !1), U)
    }),
    (d.inflateSetDictionary = (e, t) => {
      const n = t.length
      let i, r, a
      return G(e)
        ? D
        : ((i = e.state),
          0 !== i.wrap && i.mode !== M
            ? D
            : i.mode === M && ((r = 1), (r = y(r, t, n, 0)), r !== i.check)
            ? I
            : ((a = ne(e, t, n, n)), a ? ((i.mode = 16210), O) : ((i.havedict = 1), U)))
    }),
    (d.inflateInfo = 'pako inflate (from Nodeca project)')
  var ie = {}
  const re = (e, t) => Object.prototype.hasOwnProperty.call(e, t)
  ;(ie.assign = function (e) {
    const t = Array.prototype.slice.call(arguments, 1)
    for (; t.length; ) {
      const n = t.shift()
      if (n) {
        if ('object' != typeof n) throw new TypeError(n + 'must be non-object')
        for (const t in n) re(n, t) && (e[t] = n[t])
      }
    }
    return e
  }),
    (ie.flattenChunks = e => {
      let t = 0
      for (let n = 0, i = e.length; n < i; n++) t += e[n].length
      const n = new Uint8Array(t)
      for (let t = 0, i = 0, r = e.length; t < r; t++) {
        let r = e[t]
        n.set(r, i), (i += r.length)
      }
      return n
    })
  var ae = {}
  let oe = !0
  try {
    String.fromCharCode.apply(null, new Uint8Array(1))
  } catch (e) {
    oe = !1
  }
  const se = new Uint8Array(256)
  for (let e = 0; e < 256; e++) se[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1
  ;(se[254] = se[254] = 1),
    (ae.string2buf = e => {
      if ('function' == typeof TextEncoder && TextEncoder.prototype.encode) return new TextEncoder().encode(e)
      let t,
        n,
        i,
        r,
        a,
        o = e.length,
        s = 0
      for (r = 0; r < o; r++)
        (n = e.charCodeAt(r)),
          55296 == (64512 & n) &&
            r + 1 < o &&
            ((i = e.charCodeAt(r + 1)), 56320 == (64512 & i) && ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++)),
          (s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4)
      for (t = new Uint8Array(s), a = 0, r = 0; a < s; r++)
        (n = e.charCodeAt(r)),
          55296 == (64512 & n) &&
            r + 1 < o &&
            ((i = e.charCodeAt(r + 1)), 56320 == (64512 & i) && ((n = 65536 + ((n - 55296) << 10) + (i - 56320)), r++)),
          n < 128
            ? (t[a++] = n)
            : n < 2048
            ? ((t[a++] = 192 | (n >>> 6)), (t[a++] = 128 | (63 & n)))
            : n < 65536
            ? ((t[a++] = 224 | (n >>> 12)), (t[a++] = 128 | ((n >>> 6) & 63)), (t[a++] = 128 | (63 & n)))
            : ((t[a++] = 240 | (n >>> 18)), (t[a++] = 128 | ((n >>> 12) & 63)), (t[a++] = 128 | ((n >>> 6) & 63)), (t[a++] = 128 | (63 & n)))
      return t
    })
  ;(ae.buf2string = (e, t) => {
    const n = t || e.length
    if ('function' == typeof TextDecoder && TextDecoder.prototype.decode) return new TextDecoder().decode(e.subarray(0, t))
    let i, r
    const a = new Array(2 * n)
    for (r = 0, i = 0; i < n; ) {
      let t = e[i++]
      if (t < 128) {
        a[r++] = t
        continue
      }
      let o = se[t]
      if (o > 4) (a[r++] = 65533), (i += o - 1)
      else {
        for (t &= 2 === o ? 31 : 3 === o ? 15 : 7; o > 1 && i < n; ) (t = (t << 6) | (63 & e[i++])), o--
        o > 1 ? (a[r++] = 65533) : t < 65536 ? (a[r++] = t) : ((t -= 65536), (a[r++] = 55296 | ((t >> 10) & 1023)), (a[r++] = 56320 | (1023 & t)))
      }
    }
    return ((e, t) => {
      if (t < 65534 && e.subarray && oe) return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t))
      let n = ''
      for (let i = 0; i < t; i++) n += String.fromCharCode(e[i])
      return n
    })(a, r)
  }),
    (ae.utf8border = (e, t) => {
      ;(t = t || e.length) > e.length && (t = e.length)
      let n = t - 1
      for (; n >= 0 && 128 == (192 & e[n]); ) n--
      return n < 0 || 0 === n ? t : n + se[e[n]] > t ? n : t
    })
  const le = d,
    ce = ie,
    de = ae,
    fe = {
      2: 'need dictionary',
      1: 'stream end',
      0: '',
      '-1': 'file error',
      '-2': 'stream error',
      '-3': 'data error',
      '-4': 'insufficient memory',
      '-5': 'buffer error',
      '-6': 'incompatible version'
    },
    he = function () {
      ;(this.input = null),
        (this.next_in = 0),
        (this.avail_in = 0),
        (this.total_in = 0),
        (this.output = null),
        (this.next_out = 0),
        (this.avail_out = 0),
        (this.total_out = 0),
        (this.msg = ''),
        (this.state = null),
        (this.data_type = 2),
        (this.adler = 0)
    },
    ue = function () {
      ;(this.text = 0),
        (this.time = 0),
        (this.xflags = 0),
        (this.os = 0),
        (this.extra = null),
        (this.extra_len = 0),
        (this.name = ''),
        (this.comment = ''),
        (this.hcrc = 0),
        (this.done = !1)
    },
    we = Object.prototype.toString,
    { Z_NO_FLUSH: be, Z_FINISH: me, Z_OK: ge, Z_STREAM_END: ke, Z_NEED_DICT: _e, Z_STREAM_ERROR: pe, Z_DATA_ERROR: ye, Z_MEM_ERROR: ve } = p
  function Ee(e) {
    this.options = ce.assign({ chunkSize: 65536, windowBits: 15, to: '' }, e || {})
    const t = this.options
    t.raw && t.windowBits >= 0 && t.windowBits < 16 && ((t.windowBits = -t.windowBits), 0 === t.windowBits && (t.windowBits = -15)),
      !(t.windowBits >= 0 && t.windowBits < 16) || (e && e.windowBits) || (t.windowBits += 32),
      t.windowBits > 15 && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
      (this.err = 0),
      (this.msg = ''),
      (this.ended = !1),
      (this.chunks = []),
      (this.strm = new he()),
      (this.strm.avail_out = 0)
    let n = le.inflateInit2(this.strm, t.windowBits)
    if (n !== ge) throw new Error(fe[n])
    if (
      ((this.header = new ue()),
      le.inflateGetHeader(this.strm, this.header),
      t.dictionary &&
        ('string' == typeof t.dictionary
          ? (t.dictionary = de.string2buf(t.dictionary))
          : '[object ArrayBuffer]' === we.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)),
        t.raw && ((n = le.inflateSetDictionary(this.strm, t.dictionary)), n !== ge)))
    )
      throw new Error(fe[n])
  }
  function xe(e, t) {
    const n = new Ee(t)
    if ((n.push(e), n.err)) throw n.msg || fe[n.err]
    return n.result
  }
  ;(Ee.prototype.push = function (e, t) {
    const n = this.strm,
      i = this.options.chunkSize,
      r = this.options.dictionary
    let a, o, s
    if (this.ended) return !1
    for (
      o = t === ~~t ? t : !0 === t ? me : be,
        '[object ArrayBuffer]' === we.call(e) ? (n.input = new Uint8Array(e)) : (n.input = e),
        n.next_in = 0,
        n.avail_in = n.input.length;
      ;

    ) {
      for (
        0 === n.avail_out && ((n.output = new Uint8Array(i)), (n.next_out = 0), (n.avail_out = i)),
          a = le.inflate(n, o),
          a === _e && r && ((a = le.inflateSetDictionary(n, r)), a === ge ? (a = le.inflate(n, o)) : a === ye && (a = _e));
        n.avail_in > 0 && a === ke && n.state.wrap > 0 && 0 !== e[n.next_in];

      )
        le.inflateReset(n), (a = le.inflate(n, o))
      switch (a) {
        case pe:
        case ye:
        case _e:
        case ve:
          return this.onEnd(a), (this.ended = !0), !1
      }
      if (((s = n.avail_out), n.next_out && (0 === n.avail_out || a === ke)))
        if ('string' === this.options.to) {
          let e = de.utf8border(n.output, n.next_out),
            t = n.next_out - e,
            r = de.buf2string(n.output, e)
          ;(n.next_out = t), (n.avail_out = i - t), t && n.output.set(n.output.subarray(e, e + t), 0), this.onData(r)
        } else this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out))
      if (a !== ge || 0 !== s) {
        if (a === ke) return (a = le.inflateEnd(this.strm)), this.onEnd(a), (this.ended = !0), !0
        if (0 === n.avail_in) break
      }
    }
    return !0
  }),
    (Ee.prototype.onData = function (e) {
      this.chunks.push(e)
    }),
    (Ee.prototype.onEnd = function (e) {
      e === ge && ('string' === this.options.to ? (this.result = this.chunks.join('')) : (this.result = ce.flattenChunks(this.chunks))),
        (this.chunks = []),
        (this.err = e),
        (this.msg = this.strm.msg)
    }),
    (c.Inflate = Ee),
    (c.inflate = xe),
    (c.inflateRaw = function (e, t) {
      return ((t = t || {}).raw = !0), xe(e, t)
    }),
    (c.ungzip = xe),
    (c.constants = p)
  const Re = Uint16Array.BYTES_PER_ELEMENT,
    Ae = Int32Array.BYTES_PER_ELEMENT,
    Te = Uint32Array.BYTES_PER_ELEMENT,
    Ue = { METADATA: 0, TERRAIN: 1, DBROOT: 2 }
  Ue.fromString = function (e) {
    return 'Metadata' === e ? Ue.METADATA : 'Terrain' === e ? Ue.TERRAIN : 'DbRoot' === e ? Ue.DBROOT : void 0
  }
  const Se = 32301
  const Ze = 5,
    De = 4
  const Ie = 1953029805,
    Oe = 2917034100
  return n(function (t, n) {
    const i = Ue.fromString(t.type)
    let r = t.buffer
    a(t.key, r)
    const o = (function (t) {
      const n = new DataView(t)
      let i = 0
      const r = n.getUint32(i, !0)
      if (((i += Te), r !== Ie && r !== Oe)) throw new e.RuntimeError('Invalid magic')
      const a = n.getUint32(i, r === Ie)
      i += Te
      const o = new Uint8Array(t, i),
        s = c.inflate(o)
      if (s.length !== a) throw new e.RuntimeError("Size of packet doesn't match header")
      return s
    })(r)
    r = o.buffer
    const s = o.length
    switch (i) {
      case Ue.METADATA:
        return (function (t, n, i) {
          const r = new DataView(t)
          let a = 0
          const o = r.getUint32(a, !0)
          if (((a += Te), o !== Se)) throw new e.RuntimeError('Invalid magic')
          const s = r.getUint32(a, !0)
          if (((a += Te), 1 !== s)) throw new e.RuntimeError('Invalid data type. Must be 1 for QuadTreePacket')
          const c = r.getUint32(a, !0)
          if (((a += Te), 2 !== c)) throw new e.RuntimeError('Invalid QuadTreePacket version. Only version 2 is supported.')
          const d = r.getInt32(a, !0)
          a += Ae
          const f = r.getInt32(a, !0)
          if (((a += Ae), 32 !== f)) throw new e.RuntimeError('Invalid instance size.')
          const h = r.getInt32(a, !0)
          a += Ae
          const u = r.getInt32(a, !0)
          a += Ae
          const w = r.getInt32(a, !0)
          if (((a += Ae), h !== d * f + a)) throw new e.RuntimeError('Invalid dataBufferOffset')
          if (h + u + w !== n) throw new e.RuntimeError('Invalid packet offsets')
          const b = []
          for (let e = 0; e < d; ++e) {
            const e = r.getUint8(a)
            ++a, ++a
            const t = r.getUint16(a, !0)
            a += Re
            const n = r.getUint16(a, !0)
            a += Re
            const i = r.getUint16(a, !0)
            ;(a += Re), (a += Re), (a += Re), (a += Ae), (a += Ae), (a += 8)
            const o = r.getUint8(a++),
              s = r.getUint8(a++)
            ;(a += Re), b.push(new l(e, t, n, i, o, s))
          }
          const m = []
          let g = 0
          function k(e, t, n) {
            let i = !1
            if (4 === n) {
              if (t.hasSubtree()) return
              i = !0
            }
            for (let r = 0; r < 4; ++r) {
              const a = e + r.toString()
              if (i) m[a] = null
              else if (n < 4)
                if (t.hasChild(r)) {
                  if (g === d) return void console.log('Incorrect number of instances')
                  const e = b[g++]
                  ;(m[a] = e), k(a, e, n + 1)
                } else m[a] = null
            }
          }
          let _ = 0
          const p = b[g++]
          '' === i ? ++_ : (m[i] = p)
          return k(i, p, _), m
        })(r, s, t.quadKey)
      case Ue.TERRAIN:
        return (function (t, n, i) {
          const r = new DataView(t),
            a = function (t) {
              for (let i = 0; i < De; ++i) {
                const i = r.getUint32(t, !0)
                if (((t += Te), (t += i) > n)) throw new e.RuntimeError('Malformed terrain packet found.')
              }
              return t
            }
          let o = 0
          const s = []
          for (; s.length < Ze; ) {
            const e = o
            o = a(o)
            const n = t.slice(e, o)
            i.push(n), s.push(n)
          }
          return s
        })(r, s, n)
      case Ue.DBROOT:
        return n.push(r), { buffer: r }
    }
  })
})
