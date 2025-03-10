define([
  './AttributeCompression-48e336db',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './TerrainEncoding-7a03fd29',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './OrientedBoundingBox-fc7f7ca4',
  './createTaskProcessorWorker',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './EllipsoidTangentPlane-d430e7d5',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1'
], function (e, t, n, i, s, r, h, o, u, p, d, l, a, f, c, g, m, x) {
  'use strict'
  const w = {
    clipTriangleAtAxisAlignedThreshold: function (e, t, n, i, r, h) {
      let o, u, p
      s.defined(h) ? (h.length = 0) : (h = []), t ? ((o = n < e), (u = i < e), (p = r < e)) : ((o = n > e), (u = i > e), (p = r > e))
      const d = o + u + p
      let l, a, f, c, g, m
      return (
        1 === d
          ? o
            ? ((l = (e - n) / (i - n)),
              (a = (e - n) / (r - n)),
              h.push(1),
              h.push(2),
              1 !== a && (h.push(-1), h.push(0), h.push(2), h.push(a)),
              1 !== l && (h.push(-1), h.push(0), h.push(1), h.push(l)))
            : u
            ? ((f = (e - i) / (r - i)),
              (c = (e - i) / (n - i)),
              h.push(2),
              h.push(0),
              1 !== c && (h.push(-1), h.push(1), h.push(0), h.push(c)),
              1 !== f && (h.push(-1), h.push(1), h.push(2), h.push(f)))
            : p &&
              ((g = (e - r) / (n - r)),
              (m = (e - r) / (i - r)),
              h.push(0),
              h.push(1),
              1 !== m && (h.push(-1), h.push(2), h.push(1), h.push(m)),
              1 !== g && (h.push(-1), h.push(2), h.push(0), h.push(g)))
          : 2 === d
          ? o || n === e
            ? u || i === e
              ? p ||
                r === e ||
                ((a = (e - n) / (r - n)),
                (f = (e - i) / (r - i)),
                h.push(2),
                h.push(-1),
                h.push(0),
                h.push(2),
                h.push(a),
                h.push(-1),
                h.push(1),
                h.push(2),
                h.push(f))
              : ((m = (e - r) / (i - r)),
                (l = (e - n) / (i - n)),
                h.push(1),
                h.push(-1),
                h.push(2),
                h.push(1),
                h.push(m),
                h.push(-1),
                h.push(0),
                h.push(1),
                h.push(l))
            : ((c = (e - i) / (n - i)),
              (g = (e - r) / (n - r)),
              h.push(0),
              h.push(-1),
              h.push(1),
              h.push(0),
              h.push(c),
              h.push(-1),
              h.push(2),
              h.push(0),
              h.push(g))
          : 3 !== d && (h.push(0), h.push(1), h.push(2)),
        h
      )
    },
    computeBarycentricCoordinates: function (e, t, n, r, h, o, u, p, d) {
      const l = n - u,
        a = u - h,
        f = o - p,
        c = r - p,
        g = 1 / (f * l + a * c),
        m = t - p,
        x = e - u,
        w = (f * x + a * m) * g,
        C = (-c * x + l * m) * g,
        y = 1 - w - C
      return s.defined(d) ? ((d.x = w), (d.y = C), (d.z = y), d) : new i.Cartesian3(w, C, y)
    },
    computeLineSegmentLineSegmentIntersection: function (e, t, i, r, h, o, u, p, d) {
      const l = (p - o) * (i - e) - (u - h) * (r - t)
      if (0 === l) return
      const a = ((u - h) * (t - o) - (p - o) * (e - h)) / l,
        f = ((i - e) * (t - o) - (r - t) * (e - h)) / l
      return a >= 0 && a <= 1 && f >= 0 && f <= 1
        ? (s.defined(d) || (d = new n.Cartesian2()), (d.x = e + a * (i - e)), (d.y = t + a * (r - t)), d)
        : void 0
    }
  }
  var C = w
  const y = 32767,
    B = 16383,
    I = [],
    A = [],
    v = [],
    b = new i.Cartographic()
  let T = new i.Cartesian3()
  const M = [],
    z = [],
    V = [],
    N = [],
    E = [],
    R = new i.Cartesian3(),
    H = new t.BoundingSphere(),
    O = new u.OrientedBoundingBox(),
    S = new n.Cartesian2(),
    U = new i.Cartesian3()
  function F() {
    ;(this.vertexBuffer = void 0), (this.index = void 0), (this.first = void 0), (this.second = void 0), (this.ratio = void 0)
  }
  ;(F.prototype.clone = function (e) {
    return (
      s.defined(e) || (e = new F()),
      (e.uBuffer = this.uBuffer),
      (e.vBuffer = this.vBuffer),
      (e.heightBuffer = this.heightBuffer),
      (e.normalBuffer = this.normalBuffer),
      (e.index = this.index),
      (e.first = this.first),
      (e.second = this.second),
      (e.ratio = this.ratio),
      e
    )
  }),
    (F.prototype.initializeIndexed = function (e, t, n, i, s) {
      ;(this.uBuffer = e),
        (this.vBuffer = t),
        (this.heightBuffer = n),
        (this.normalBuffer = i),
        (this.index = s),
        (this.first = void 0),
        (this.second = void 0),
        (this.ratio = void 0)
    }),
    (F.prototype.initializeFromClipResult = function (e, t, n) {
      let i = t + 1
      return (
        -1 !== e[t]
          ? n[e[t]].clone(this)
          : ((this.vertexBuffer = void 0),
            (this.index = void 0),
            (this.first = n[e[i]]),
            ++i,
            (this.second = n[e[i]]),
            ++i,
            (this.ratio = e[i]),
            ++i),
        i
      )
    }),
    (F.prototype.getKey = function () {
      return this.isIndexed() ? this.index : JSON.stringify({ first: this.first.getKey(), second: this.second.getKey(), ratio: this.ratio })
    }),
    (F.prototype.isIndexed = function () {
      return s.defined(this.index)
    }),
    (F.prototype.getH = function () {
      return s.defined(this.index) ? this.heightBuffer[this.index] : o.CesiumMath.lerp(this.first.getH(), this.second.getH(), this.ratio)
    }),
    (F.prototype.getU = function () {
      return s.defined(this.index) ? this.uBuffer[this.index] : o.CesiumMath.lerp(this.first.getU(), this.second.getU(), this.ratio)
    }),
    (F.prototype.getV = function () {
      return s.defined(this.index) ? this.vBuffer[this.index] : o.CesiumMath.lerp(this.first.getV(), this.second.getV(), this.ratio)
    })
  let P = new n.Cartesian2(),
    D = -1
  const W = [new i.Cartesian3(), new i.Cartesian3()],
    X = [new i.Cartesian3(), new i.Cartesian3()]
  function k(t, n) {
    ++D
    let s = W[D],
      r = X[D]
    return (
      (s = e.AttributeCompression.octDecode(t.first.getNormalX(), t.first.getNormalY(), s)),
      (r = e.AttributeCompression.octDecode(t.second.getNormalX(), t.second.getNormalY(), r)),
      (T = i.Cartesian3.lerp(s, r, t.ratio, T)),
      i.Cartesian3.normalize(T, T),
      e.AttributeCompression.octEncode(T, n),
      --D,
      n
    )
  }
  ;(F.prototype.getNormalX = function () {
    return s.defined(this.index) ? this.normalBuffer[2 * this.index] : ((P = k(this, P)), P.x)
  }),
    (F.prototype.getNormalY = function () {
      return s.defined(this.index) ? this.normalBuffer[2 * this.index + 1] : ((P = k(this, P)), P.y)
    })
  const K = []
  function L(e, t, n, i, r, h, o, u, p) {
    if (0 === o.length) return
    let d = 0,
      l = 0
    for (; l < o.length; ) l = K[d++].initializeFromClipResult(o, l, u)
    for (let r = 0; r < d; ++r) {
      const o = K[r]
      if (o.isIndexed()) (o.newIndex = h[o.index]), (o.uBuffer = e), (o.vBuffer = t), (o.heightBuffer = n), p && (o.normalBuffer = i)
      else {
        const r = o.getKey()
        if (s.defined(h[r])) o.newIndex = h[r]
        else {
          const s = e.length
          e.push(o.getU()), t.push(o.getV()), n.push(o.getH()), p && (i.push(o.getNormalX()), i.push(o.getNormalY())), (o.newIndex = s), (h[r] = s)
        }
      }
    }
    3 === d
      ? (r.push(K[0].newIndex), r.push(K[1].newIndex), r.push(K[2].newIndex))
      : 4 === d &&
        (r.push(K[0].newIndex), r.push(K[1].newIndex), r.push(K[2].newIndex), r.push(K[0].newIndex), r.push(K[2].newIndex), r.push(K[3].newIndex))
  }
  return (
    K.push(new F()),
    K.push(new F()),
    K.push(new F()),
    K.push(new F()),
    p(function (e, s) {
      const p = e.isEastChild,
        d = e.isNorthChild,
        l = p ? B : 0,
        a = p ? y : B,
        f = d ? B : 0,
        c = d ? y : B,
        g = M,
        m = z,
        x = V,
        w = E
      ;(g.length = 0), (m.length = 0), (x.length = 0), (w.length = 0)
      const P = N
      P.length = 0
      const D = {},
        W = e.vertices
      let X = e.indices
      X = X.subarray(0, e.indexCountWithoutSkirts)
      const k = r.TerrainEncoding.clone(e.encoding),
        K = k.hasVertexNormals
      let Y = 0
      const _ = e.vertexCountWithoutSkirts,
        G = e.minimumHeight,
        J = e.maximumHeight,
        Z = new Array(_),
        j = new Array(_),
        q = new Array(_),
        Q = K ? new Array(2 * _) : void 0
      let $, ee, te, ne, ie
      for (ee = 0, te = 0; ee < _; ++ee, te += 2) {
        const e = k.decodeTextureCoordinates(W, ee, S)
        if (
          (($ = k.decodeHeight(W, ee)),
          (ne = o.CesiumMath.clamp((e.x * y) | 0, 0, y)),
          (ie = o.CesiumMath.clamp((e.y * y) | 0, 0, y)),
          (q[ee] = o.CesiumMath.clamp(((($ - G) / (J - G)) * y) | 0, 0, y)),
          ne < 20 && (ne = 0),
          ie < 20 && (ie = 0),
          y - ne < 20 && (ne = y),
          y - ie < 20 && (ie = y),
          (Z[ee] = ne),
          (j[ee] = ie),
          K)
        ) {
          const e = k.getOctEncodedNormal(W, ee, U)
          ;(Q[te] = e.x), (Q[te + 1] = e.y)
        }
        ;((p && ne >= B) || (!p && ne <= B)) &&
          ((d && ie >= B) || (!d && ie <= B)) &&
          ((D[ee] = Y), g.push(ne), m.push(ie), x.push(q[ee]), K && (w.push(Q[te]), w.push(Q[te + 1])), ++Y)
      }
      const se = []
      se.push(new F()), se.push(new F()), se.push(new F())
      const re = []
      let he, oe
      for (re.push(new F()), re.push(new F()), re.push(new F()), ee = 0; ee < X.length; ee += 3) {
        const e = X[ee],
          t = X[ee + 1],
          n = X[ee + 2],
          i = Z[e],
          s = Z[t],
          r = Z[n]
        se[0].initializeIndexed(Z, j, q, Q, e), se[1].initializeIndexed(Z, j, q, Q, t), se[2].initializeIndexed(Z, j, q, Q, n)
        const h = C.clipTriangleAtAxisAlignedThreshold(B, p, i, s, r, I)
        ;(he = 0),
          he >= h.length ||
            ((he = re[0].initializeFromClipResult(h, he, se)),
            he >= h.length ||
              ((he = re[1].initializeFromClipResult(h, he, se)),
              he >= h.length ||
                ((he = re[2].initializeFromClipResult(h, he, se)),
                (oe = C.clipTriangleAtAxisAlignedThreshold(B, d, re[0].getV(), re[1].getV(), re[2].getV(), A)),
                L(g, m, x, w, P, D, oe, re, K),
                he < h.length &&
                  (re[2].clone(re[1]),
                  re[2].initializeFromClipResult(h, he, se),
                  (oe = C.clipTriangleAtAxisAlignedThreshold(B, d, re[0].getV(), re[1].getV(), re[2].getV(), A)),
                  L(g, m, x, w, P, D, oe, re, K)))))
      }
      const ue = p ? -32767 : 0,
        pe = d ? -32767 : 0,
        de = [],
        le = [],
        ae = [],
        fe = []
      let ce = Number.MAX_VALUE,
        ge = -ce
      const me = v
      me.length = 0
      const xe = i.Ellipsoid.clone(e.ellipsoid),
        we = n.Rectangle.clone(e.childRectangle),
        Ce = we.north,
        ye = we.south
      let Be = we.east
      const Ie = we.west
      for (Be < Ie && (Be += o.CesiumMath.TWO_PI), ee = 0; ee < g.length; ++ee)
        (ne = Math.round(g[ee])),
          ne <= l ? (de.push(ee), (ne = 0)) : ne >= a ? (ae.push(ee), (ne = y)) : (ne = 2 * ne + ue),
          (g[ee] = ne),
          (ie = Math.round(m[ee])),
          ie <= f ? (le.push(ee), (ie = 0)) : ie >= c ? (fe.push(ee), (ie = y)) : (ie = 2 * ie + pe),
          (m[ee] = ie),
          ($ = o.CesiumMath.lerp(G, J, x[ee] / y)),
          $ < ce && (ce = $),
          $ > ge && (ge = $),
          (x[ee] = $),
          (b.longitude = o.CesiumMath.lerp(Ie, Be, ne / y)),
          (b.latitude = o.CesiumMath.lerp(ye, Ce, ie / y)),
          (b.height = $),
          xe.cartographicToCartesian(b, T),
          me.push(T.x),
          me.push(T.y),
          me.push(T.z)
      const Ae = t.BoundingSphere.fromVertices(me, i.Cartesian3.ZERO, 3, H),
        ve = u.OrientedBoundingBox.fromRectangle(we, ce, ge, xe, O),
        be = new r.EllipsoidalOccluder(xe).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(Ae.center, me, 3, Ae.center, ce, R),
        Te = ge - ce,
        Me = new Uint16Array(g.length + m.length + x.length)
      for (ee = 0; ee < g.length; ++ee) Me[ee] = g[ee]
      let ze = g.length
      for (ee = 0; ee < m.length; ++ee) Me[ze + ee] = m[ee]
      for (ze += m.length, ee = 0; ee < x.length; ++ee) Me[ze + ee] = (y * (x[ee] - ce)) / Te
      const Ve = h.IndexDatatype.createTypedArray(g.length, P)
      let Ne
      if (K) {
        const e = new Uint8Array(w)
        s.push(Me.buffer, Ve.buffer, e.buffer), (Ne = e.buffer)
      } else s.push(Me.buffer, Ve.buffer)
      return {
        vertices: Me.buffer,
        encodedNormals: Ne,
        indices: Ve.buffer,
        minimumHeight: ce,
        maximumHeight: ge,
        westIndices: de,
        southIndices: le,
        eastIndices: ae,
        northIndices: fe,
        boundingSphere: Ae,
        orientedBoundingBox: ve,
        horizonOcclusionPoint: be
      }
    })
  )
})
