define([
  './Transforms-20461479',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './Math-2ce22ee9',
  './ArcType-26a3f38d',
  './arrayRemoveDuplicates-9b636830',
  './ComponentDatatype-ab629b88',
  './EllipsoidGeodesic-2723ab86',
  './EllipsoidRhumbLine-77eff028',
  './EncodedCartesian3-5e2017ab',
  './GeometryAttribute-b8117bde',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './WebMercatorProjection-943e2226',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './WebGLConstants-7f557f93'
], function (e, t, a, n, i, r, s, o, l, c, u, C, p, h, d, g, f, m) {
  'use strict'
  function w(i) {
    ;(i = n.defaultValue(i, n.defaultValue.EMPTY_OBJECT)),
      (this._ellipsoid = n.defaultValue(i.ellipsoid, a.Ellipsoid.WGS84)),
      (this._rectangle = n.defaultValue(i.rectangle, t.Rectangle.MAX_VALUE)),
      (this._projection = new e.GeographicProjection(this._ellipsoid)),
      (this._numberOfLevelZeroTilesX = n.defaultValue(i.numberOfLevelZeroTilesX, 2)),
      (this._numberOfLevelZeroTilesY = n.defaultValue(i.numberOfLevelZeroTilesY, 1))
  }
  Object.defineProperties(w.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    rectangle: {
      get: function () {
        return this._rectangle
      }
    },
    projection: {
      get: function () {
        return this._projection
      }
    }
  }),
    (w.prototype.getNumberOfXTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesX << e
    }),
    (w.prototype.getNumberOfYTilesAtLevel = function (e) {
      return this._numberOfLevelZeroTilesY << e
    }),
    (w.prototype.rectangleToNativeRectangle = function (e, a) {
      const r = i.CesiumMath.toDegrees(e.west),
        s = i.CesiumMath.toDegrees(e.south),
        o = i.CesiumMath.toDegrees(e.east),
        l = i.CesiumMath.toDegrees(e.north)
      return n.defined(a) ? ((a.west = r), (a.south = s), (a.east = o), (a.north = l), a) : new t.Rectangle(r, s, o, l)
    }),
    (w.prototype.tileXYToNativeRectangle = function (e, t, a, n) {
      const r = this.tileXYToRectangle(e, t, a, n)
      return (
        (r.west = i.CesiumMath.toDegrees(r.west)),
        (r.south = i.CesiumMath.toDegrees(r.south)),
        (r.east = i.CesiumMath.toDegrees(r.east)),
        (r.north = i.CesiumMath.toDegrees(r.north)),
        r
      )
    }),
    (w.prototype.tileXYToRectangle = function (e, a, i, r) {
      const s = this._rectangle,
        o = this.getNumberOfXTilesAtLevel(i),
        l = this.getNumberOfYTilesAtLevel(i),
        c = s.width / o,
        u = e * c + s.west,
        C = (e + 1) * c + s.west,
        p = s.height / l,
        h = s.north - a * p,
        d = s.north - (a + 1) * p
      return n.defined(r) || (r = new t.Rectangle(u, d, C, h)), (r.west = u), (r.south = d), (r.east = C), (r.north = h), r
    }),
    (w.prototype.positionToTileXY = function (e, a, r) {
      const s = this._rectangle
      if (!t.Rectangle.contains(s, e)) return
      const o = this.getNumberOfXTilesAtLevel(a),
        l = this.getNumberOfYTilesAtLevel(a),
        c = s.width / o,
        u = s.height / l
      let C = e.longitude
      s.east < s.west && (C += i.CesiumMath.TWO_PI)
      let p = ((C - s.west) / c) | 0
      p >= o && (p = o - 1)
      let h = ((s.north - e.latitude) / u) | 0
      return h >= l && (h = l - 1), n.defined(r) ? ((r.x = p), (r.y = h), r) : new t.Cartesian2(p, h)
    })
  const y = new a.Cartesian3(),
    M = new a.Cartesian3(),
    T = new a.Cartographic(),
    E = new a.Cartesian3(),
    _ = new a.Cartesian3(),
    O = new e.BoundingSphere(),
    P = new w(),
    A = [new a.Cartographic(), new a.Cartographic(), new a.Cartographic(), new a.Cartographic()],
    b = new t.Cartesian2(),
    k = {}
  function L(e) {
    a.Cartographic.fromRadians(e.east, e.north, 0, A[0]),
      a.Cartographic.fromRadians(e.west, e.north, 0, A[1]),
      a.Cartographic.fromRadians(e.east, e.south, 0, A[2]),
      a.Cartographic.fromRadians(e.west, e.south, 0, A[3])
    let t = 0,
      n = 0,
      i = 0,
      r = 0
    const s = k._terrainHeightsMaxLevel
    let o
    for (o = 0; o <= s; ++o) {
      let e = !1
      for (let t = 0; t < 4; ++t) {
        const a = A[t]
        if ((P.positionToTileXY(a, o, b), 0 === t)) (i = b.x), (r = b.y)
        else if (i !== b.x || r !== b.y) {
          e = !0
          break
        }
      }
      if (e) break
      ;(t = i), (n = r)
    }
    if (0 !== o) return { x: t, y: n, level: o > s ? s : o - 1 }
  }
  ;(k.initialize = function () {
    let t = k._initPromise
    return (
      n.defined(t) ||
        ((t = e.Resource.fetchJson(e.buildModuleUrl('Assets/approximateTerrainHeights.json')).then(function (e) {
          k._terrainHeights = e
        })),
        (k._initPromise = t)),
      t
    )
  }),
    (k.getMinimumMaximumHeights = function (e, i) {
      i = n.defaultValue(i, a.Ellipsoid.WGS84)
      const r = L(e)
      let s = k._defaultMinTerrainHeight,
        o = k._defaultMaxTerrainHeight
      if (n.defined(r)) {
        const l = `${r.level}-${r.x}-${r.y}`,
          c = k._terrainHeights[l]
        n.defined(c) && ((s = c[0]), (o = c[1])),
          i.cartographicToCartesian(t.Rectangle.northeast(e, T), y),
          i.cartographicToCartesian(t.Rectangle.southwest(e, T), M),
          a.Cartesian3.midpoint(M, y, E)
        const u = i.scaleToGeodeticSurface(E, _)
        if (n.defined(u)) {
          const e = a.Cartesian3.distance(E, u)
          s = Math.min(s, -e)
        } else s = k._defaultMinTerrainHeight
      }
      return (s = Math.max(k._defaultMinTerrainHeight, s)), { minimumTerrainHeight: s, maximumTerrainHeight: o }
    }),
    (k.getBoundingSphere = function (t, i) {
      i = n.defaultValue(i, a.Ellipsoid.WGS84)
      const r = L(t)
      let s = k._defaultMaxTerrainHeight
      if (n.defined(r)) {
        const e = `${r.level}-${r.x}-${r.y}`,
          t = k._terrainHeights[e]
        n.defined(t) && (s = t[1])
      }
      const o = e.BoundingSphere.fromRectangle3D(t, i, 0)
      return e.BoundingSphere.fromRectangle3D(t, i, s, O), e.BoundingSphere.union(o, O, o)
    }),
    (k._terrainHeightsMaxLevel = 6),
    (k._defaultMaxTerrainHeight = 9e3),
    (k._defaultMinTerrainHeight = -1e5),
    (k._terrainHeights = void 0),
    (k._initPromise = void 0),
    Object.defineProperties(k, {
      initialized: {
        get: function () {
          return n.defined(k._terrainHeights)
        }
      }
    })
  var S = k
  const x = [e.GeographicProjection, d.WebMercatorProjection],
    I = x.length,
    N = Math.cos(i.CesiumMath.toRadians(30)),
    R = Math.cos(i.CesiumMath.toRadians(150)),
    D = 0,
    v = 1e3
  function z(e) {
    const t = (e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT)).positions
    ;(this.width = n.defaultValue(e.width, 1)),
      (this._positions = t),
      (this.granularity = n.defaultValue(e.granularity, 9999)),
      (this.loop = n.defaultValue(e.loop, !1)),
      (this.arcType = n.defaultValue(e.arcType, r.ArcType.GEODESIC)),
      (this._ellipsoid = a.Ellipsoid.WGS84),
      (this._projectionIndex = 0),
      (this._workerName = 'createGroundPolylineGeometry'),
      (this._scene3DOnly = !1)
  }
  Object.defineProperties(z.prototype, {
    packedLength: {
      get: function () {
        return 1 + 3 * this._positions.length + 1 + 1 + 1 + a.Ellipsoid.packedLength + 1 + 1
      }
    }
  }),
    (z.setProjectionAndEllipsoid = function (e, t) {
      let a = 0
      for (let e = 0; e < I; e++)
        if (t instanceof x[e]) {
          a = e
          break
        }
      ;(e._projectionIndex = a), (e._ellipsoid = t.ellipsoid)
    })
  const H = new a.Cartesian3(),
    j = new a.Cartesian3(),
    B = new a.Cartesian3()
  function V(e, t, n, i, r) {
    const s = U(i, e, 0, H),
      o = U(i, e, n, j),
      l = U(i, t, 0, B),
      c = Z(o, s, j),
      u = Z(l, s, B)
    return a.Cartesian3.cross(u, c, r), a.Cartesian3.normalize(r, r)
  }
  const G = new a.Cartographic(),
    Y = new a.Cartesian3(),
    F = new a.Cartesian3(),
    q = new a.Cartesian3()
  function X(e, t, n, i, s, o, u, C, p, h, d) {
    if (0 === s) return
    let g
    o === r.ArcType.GEODESIC ? (g = new l.EllipsoidGeodesic(e, t, u)) : o === r.ArcType.RHUMB && (g = new c.EllipsoidRhumbLine(e, t, u))
    const f = g.surfaceDistance
    if (f < s) return
    const m = V(e, t, i, u, q),
      w = Math.ceil(f / s),
      y = f / w
    let M = y
    const T = w - 1
    let E = C.length
    for (let e = 0; e < T; e++) {
      const e = g.interpolateUsingSurfaceDistance(M, G),
        t = U(u, e, n, Y),
        r = U(u, e, i, F)
      a.Cartesian3.pack(m, C, E), a.Cartesian3.pack(t, p, E), a.Cartesian3.pack(r, h, E), d.push(e.latitude), d.push(e.longitude), (E += 3), (M += y)
    }
  }
  const W = new a.Cartographic()
  function U(e, t, n, i) {
    return a.Cartographic.clone(t, W), (W.height = n), a.Cartographic.toCartesian(W, e, i)
  }
  function Z(e, t, n) {
    return a.Cartesian3.subtract(e, t, n), a.Cartesian3.normalize(n, n), n
  }
  function $(e, t, n, i) {
    return (i = Z(e, t, i)), (i = a.Cartesian3.cross(i, n, i)), (i = a.Cartesian3.normalize(i, i)), (i = a.Cartesian3.cross(n, i, i))
  }
  ;(z.pack = function (e, t, i) {
    let r = n.defaultValue(i, 0)
    const s = e._positions,
      o = s.length
    t[r++] = o
    for (let e = 0; e < o; ++e) {
      const n = s[e]
      a.Cartesian3.pack(n, t, r), (r += 3)
    }
    return (
      (t[r++] = e.granularity),
      (t[r++] = e.loop ? 1 : 0),
      (t[r++] = e.arcType),
      a.Ellipsoid.pack(e._ellipsoid, t, r),
      (r += a.Ellipsoid.packedLength),
      (t[r++] = e._projectionIndex),
      (t[r++] = e._scene3DOnly ? 1 : 0),
      t
    )
  }),
    (z.unpack = function (e, t, i) {
      let r = n.defaultValue(t, 0)
      const s = e[r++],
        o = new Array(s)
      for (let t = 0; t < s; t++) (o[t] = a.Cartesian3.unpack(e, r)), (r += 3)
      const l = e[r++],
        c = 1 === e[r++],
        u = e[r++],
        C = a.Ellipsoid.unpack(e, r)
      r += a.Ellipsoid.packedLength
      const p = e[r++],
        h = 1 === e[r++]
      return (
        n.defined(i) || (i = new z({ positions: o })),
        (i._positions = o),
        (i.granularity = l),
        (i.loop = c),
        (i.arcType = u),
        (i._ellipsoid = C),
        (i._projectionIndex = p),
        (i._scene3DOnly = h),
        i
      )
    })
  const J = new a.Cartesian3(),
    Q = new a.Cartesian3(),
    K = new a.Cartesian3(),
    ee = new a.Cartesian3()
  function te(e, t, n, r, s) {
    const o = Z(n, t, ee),
      l = $(e, t, o, J),
      c = $(r, t, o, Q)
    if (i.CesiumMath.equalsEpsilon(a.Cartesian3.dot(l, c), -1, i.CesiumMath.EPSILON5))
      return (s = a.Cartesian3.cross(o, l, s)), (s = a.Cartesian3.normalize(s, s))
    ;(s = a.Cartesian3.add(c, l, s)), (s = a.Cartesian3.normalize(s, s))
    const u = a.Cartesian3.cross(o, s, K)
    return a.Cartesian3.dot(c, u) < 0 && (s = a.Cartesian3.negate(s, s)), s
  }
  const ae = h.Plane.fromPointNormal(a.Cartesian3.ZERO, a.Cartesian3.UNIT_Y),
    ne = new a.Cartesian3(),
    ie = new a.Cartesian3(),
    re = new a.Cartesian3(),
    se = new a.Cartesian3(),
    oe = new a.Cartesian3(),
    le = new a.Cartesian3(),
    ce = new a.Cartographic(),
    ue = new a.Cartographic(),
    Ce = new a.Cartographic()
  z.createGeometry = function (l) {
    const h = !l._scene3DOnly
    let d = l.loop
    const g = l._ellipsoid,
      f = l.granularity,
      m = l.arcType,
      w = new x[l._projectionIndex](g),
      y = D,
      M = v
    let T, E
    const _ = l._positions,
      O = _.length
    let P, A, b, k
    2 === O && (d = !1)
    const L = new c.EllipsoidRhumbLine(void 0, void 0, g)
    let I, R, z
    const H = [_[0]]
    for (E = 0; E < O - 1; E++)
      (P = _[E]),
        (A = _[E + 1]),
        (I = p.IntersectionTests.lineSegmentPlane(P, A, ae, le)),
        !n.defined(I) ||
          a.Cartesian3.equalsEpsilon(I, P, i.CesiumMath.EPSILON7) ||
          a.Cartesian3.equalsEpsilon(I, A, i.CesiumMath.EPSILON7) ||
          (l.arcType === r.ArcType.GEODESIC
            ? H.push(a.Cartesian3.clone(I))
            : l.arcType === r.ArcType.RHUMB &&
              ((z = g.cartesianToCartographic(I, ce).longitude),
              (b = g.cartesianToCartographic(P, ce)),
              (k = g.cartesianToCartographic(A, ue)),
              L.setEndPoints(b, k),
              (R = L.findIntersectionWithLongitude(z, Ce)),
              (I = g.cartographicToCartesian(R, le)),
              !n.defined(I) ||
                a.Cartesian3.equalsEpsilon(I, P, i.CesiumMath.EPSILON7) ||
                a.Cartesian3.equalsEpsilon(I, A, i.CesiumMath.EPSILON7) ||
                H.push(a.Cartesian3.clone(I)))),
        H.push(A)
    d &&
      ((P = _[O - 1]),
      (A = _[0]),
      (I = p.IntersectionTests.lineSegmentPlane(P, A, ae, le)),
      !n.defined(I) ||
        a.Cartesian3.equalsEpsilon(I, P, i.CesiumMath.EPSILON7) ||
        a.Cartesian3.equalsEpsilon(I, A, i.CesiumMath.EPSILON7) ||
        (l.arcType === r.ArcType.GEODESIC
          ? H.push(a.Cartesian3.clone(I))
          : l.arcType === r.ArcType.RHUMB &&
            ((z = g.cartesianToCartographic(I, ce).longitude),
            (b = g.cartesianToCartographic(P, ce)),
            (k = g.cartesianToCartographic(A, ue)),
            L.setEndPoints(b, k),
            (R = L.findIntersectionWithLongitude(z, Ce)),
            (I = g.cartographicToCartesian(R, le)),
            !n.defined(I) ||
              a.Cartesian3.equalsEpsilon(I, P, i.CesiumMath.EPSILON7) ||
              a.Cartesian3.equalsEpsilon(I, A, i.CesiumMath.EPSILON7) ||
              H.push(a.Cartesian3.clone(I)))))
    let j = H.length,
      B = new Array(j)
    for (E = 0; E < j; E++) {
      const e = a.Cartographic.fromCartesian(H[E], g)
      ;(e.height = 0), (B[E] = e)
    }
    if (((B = s.arrayRemoveDuplicates(B, a.Cartographic.equalsEpsilon)), (j = B.length), j < 2)) return
    const G = [],
      Y = [],
      F = [],
      q = []
    let W = ne,
      $ = ie,
      J = re,
      Q = se,
      K = oe
    const ee = B[0],
      pe = B[1]
    for (
      W = U(g, B[j - 1], y, W),
        Q = U(g, pe, y, Q),
        $ = U(g, ee, y, $),
        J = U(g, ee, M, J),
        K = d ? te(W, $, J, Q, K) : V(ee, pe, M, g, K),
        a.Cartesian3.pack(K, Y, 0),
        a.Cartesian3.pack($, F, 0),
        a.Cartesian3.pack(J, q, 0),
        G.push(ee.latitude),
        G.push(ee.longitude),
        X(ee, pe, y, M, f, m, g, Y, F, q, G),
        E = 1;
      E < j - 1;
      ++E
    ) {
      ;(W = a.Cartesian3.clone($, W)), ($ = a.Cartesian3.clone(Q, $))
      const e = B[E]
      U(g, e, M, J),
        U(g, B[E + 1], y, Q),
        te(W, $, J, Q, K),
        (T = Y.length),
        a.Cartesian3.pack(K, Y, T),
        a.Cartesian3.pack($, F, T),
        a.Cartesian3.pack(J, q, T),
        G.push(e.latitude),
        G.push(e.longitude),
        X(B[E], B[E + 1], y, M, f, m, g, Y, F, q, G)
    }
    const he = B[j - 1],
      de = B[j - 2]
    if ((($ = U(g, he, y, $)), (J = U(g, he, M, J)), d)) {
      const e = B[0]
      ;(W = U(g, de, y, W)), (Q = U(g, e, y, Q)), (K = te(W, $, J, Q, K))
    } else K = V(de, he, M, g, K)
    if (
      ((T = Y.length),
      a.Cartesian3.pack(K, Y, T),
      a.Cartesian3.pack($, F, T),
      a.Cartesian3.pack(J, q, T),
      G.push(he.latitude),
      G.push(he.longitude),
      d)
    ) {
      for (X(he, ee, y, M, f, m, g, Y, F, q, G), T = Y.length, E = 0; E < 3; ++E) (Y[T + E] = Y[E]), (F[T + E] = F[E]), (q[T + E] = q[E])
      G.push(ee.latitude), G.push(ee.longitude)
    }
    return (function (n, r, s, l, c, p, h) {
      let d, g
      const f = r._ellipsoid,
        m = s.length / 3 - 1,
        w = 8 * m,
        y = 4 * w,
        M = 36 * m,
        T = w > 65535 ? new Uint32Array(M) : new Uint16Array(M),
        E = new Float64Array(3 * w),
        _ = new Float32Array(y),
        O = new Float32Array(y),
        P = new Float32Array(y),
        A = new Float32Array(y),
        b = new Float32Array(y)
      let k, L, x, I
      h && ((k = new Float32Array(y)), (L = new Float32Array(y)), (x = new Float32Array(y)), (I = new Float32Array(2 * w)))
      const R = p.length / 2
      let D = 0
      const v = Ae
      v.height = 0
      const z = be
      z.height = 0
      let H = ke,
        j = Le
      if (h)
        for (g = 0, d = 1; d < R; d++)
          (v.latitude = p[g]),
            (v.longitude = p[g + 1]),
            (z.latitude = p[g + 2]),
            (z.longitude = p[g + 3]),
            (H = r.project(v, H)),
            (j = r.project(z, j)),
            (D += a.Cartesian3.distance(H, j)),
            (g += 2)
      const B = l.length / 3
      j = a.Cartesian3.unpack(l, 0, j)
      let V,
        G = 0
      for (g = 3, d = 1; d < B; d++) (H = a.Cartesian3.clone(j, H)), (j = a.Cartesian3.unpack(l, g, j)), (G += a.Cartesian3.distance(H, j)), (g += 3)
      g = 3
      let Y = 0,
        F = 0,
        q = 0,
        X = 0,
        W = !1,
        U = a.Cartesian3.unpack(s, 0, xe),
        $ = a.Cartesian3.unpack(l, 0, Le),
        J = a.Cartesian3.unpack(c, 0, Ne)
      if (n) {
        ge(J, a.Cartesian3.unpack(s, s.length - 6, Se), U, $) && (J = a.Cartesian3.negate(J, J))
      }
      let Q = 0,
        K = 0,
        ee = 0
      for (d = 0; d < m; d++) {
        const e = a.Cartesian3.clone(U, Se),
          n = a.Cartesian3.clone($, ke)
        let o,
          C,
          d,
          m,
          w = a.Cartesian3.clone(J, Ie)
        if (
          (W && (w = a.Cartesian3.negate(w, w)),
          (U = a.Cartesian3.unpack(s, g, xe)),
          ($ = a.Cartesian3.unpack(l, g, Le)),
          (J = a.Cartesian3.unpack(c, g, Ne)),
          (W = ge(J, e, U, $)),
          (v.latitude = p[Y]),
          (v.longitude = p[Y + 1]),
          (z.latitude = p[Y + 2]),
          (z.longitude = p[Y + 3]),
          h)
        ) {
          const e = Pe(v, z)
          ;(o = r.project(v, Be)), (C = r.project(z, Ve))
          const t = Z(C, o, Qe)
          ;(t.y = Math.abs(t.y)),
            (d = Ge),
            (m = Ye),
            0 === e || a.Cartesian3.dot(t, a.Cartesian3.UNIT_Y) > N
              ? ((d = ye(r, v, w, o, Ge)), (m = ye(r, z, J, C, Ye)))
              : 1 === e
              ? ((m = ye(r, z, J, C, Ye)), (d.x = 0), (d.y = i.CesiumMath.sign(v.longitude - Math.abs(z.longitude))), (d.z = 0))
              : ((d = ye(r, v, w, o, Ge)), (m.x = 0), (m.y = i.CesiumMath.sign(v.longitude - z.longitude)), (m.z = 0))
        }
        const y = a.Cartesian3.distance(n, $),
          M = u.EncodedCartesian3.fromCartesian(e, $e),
          T = a.Cartesian3.subtract(U, e, Fe),
          R = a.Cartesian3.normalize(T, We)
        let H = a.Cartesian3.subtract(n, e, qe)
        H = a.Cartesian3.normalize(H, H)
        let j = a.Cartesian3.cross(R, H, We)
        j = a.Cartesian3.normalize(j, j)
        let B = a.Cartesian3.cross(H, w, Ue)
        B = a.Cartesian3.normalize(B, B)
        let te = a.Cartesian3.subtract($, U, Xe)
        te = a.Cartesian3.normalize(te, te)
        let ae = a.Cartesian3.cross(J, te, Ze)
        ae = a.Cartesian3.normalize(ae, ae)
        const ne = y / G,
          ie = Q / G
        let re,
          se,
          oe,
          le = 0,
          ce = 0,
          ue = 0
        if (h) {
          ;(le = a.Cartesian3.distance(o, C)),
            (re = u.EncodedCartesian3.fromCartesian(o, Je)),
            (se = a.Cartesian3.subtract(C, o, Qe)),
            (oe = a.Cartesian3.normalize(se, Ke))
          const e = oe.x
          ;(oe.x = oe.y), (oe.y = -e), (ce = le / D), (ue = K / D)
        }
        for (V = 0; V < 8; V++) {
          const e = X + 4 * V,
            t = F + 2 * V,
            n = e + 3,
            i = V < 4 ? 1 : -1,
            r = 2 === V || 3 === V || 6 === V || 7 === V ? 1 : -1
          a.Cartesian3.pack(M.high, _, e),
            (_[n] = T.x),
            a.Cartesian3.pack(M.low, O, e),
            (O[n] = T.y),
            a.Cartesian3.pack(B, P, e),
            (P[n] = T.z),
            a.Cartesian3.pack(ae, A, e),
            (A[n] = ne * i),
            a.Cartesian3.pack(j, b, e)
          let s = ie * r
          0 === s && r < 0 && (s = 9),
            (b[n] = s),
            h &&
              ((k[e] = re.high.x),
              (k[e + 1] = re.high.y),
              (k[e + 2] = re.low.x),
              (k[e + 3] = re.low.y),
              (x[e] = -d.y),
              (x[e + 1] = d.x),
              (x[e + 2] = m.y),
              (x[e + 3] = -m.x),
              (L[e] = se.x),
              (L[e + 1] = se.y),
              (L[e + 2] = oe.x),
              (L[e + 3] = oe.y),
              (I[t] = ce * i),
              (s = ue * r),
              0 === s && r < 0 && (s = 9),
              (I[t + 1] = s))
        }
        const Ce = He,
          pe = je,
          he = ve,
          de = ze,
          fe = t.Rectangle.fromCartographicArray(Re, De),
          me = S.getMinimumMaximumHeights(fe, f),
          we = me.minimumTerrainHeight,
          Me = me.maximumTerrainHeight
        ;(ee += we), (ee += Me), Ee(e, n, we, Me, Ce, he), Ee(U, $, we, Me, pe, de)
        let Te = a.Cartesian3.multiplyByScalar(j, i.CesiumMath.EPSILON5, et)
        a.Cartesian3.add(Ce, Te, Ce),
          a.Cartesian3.add(pe, Te, pe),
          a.Cartesian3.add(he, Te, he),
          a.Cartesian3.add(de, Te, de),
          Oe(Ce, pe),
          Oe(he, de),
          a.Cartesian3.pack(Ce, E, q),
          a.Cartesian3.pack(pe, E, q + 3),
          a.Cartesian3.pack(de, E, q + 6),
          a.Cartesian3.pack(he, E, q + 9),
          (Te = a.Cartesian3.multiplyByScalar(j, -2 * i.CesiumMath.EPSILON5, et)),
          a.Cartesian3.add(Ce, Te, Ce),
          a.Cartesian3.add(pe, Te, pe),
          a.Cartesian3.add(he, Te, he),
          a.Cartesian3.add(de, Te, de),
          Oe(Ce, pe),
          Oe(he, de),
          a.Cartesian3.pack(Ce, E, q + 12),
          a.Cartesian3.pack(pe, E, q + 15),
          a.Cartesian3.pack(de, E, q + 18),
          a.Cartesian3.pack(he, E, q + 21),
          (Y += 2),
          (g += 3),
          (F += 16),
          (q += 24),
          (X += 32),
          (Q += y),
          (K += le)
      }
      g = 0
      let te = 0
      for (d = 0; d < m; d++) {
        for (V = 0; V < nt; V++) T[g + V] = at[V] + te
        ;(te += 8), (g += nt)
      }
      const ae = tt
      e.BoundingSphere.fromVertices(s, a.Cartesian3.ZERO, 3, ae[0]), e.BoundingSphere.fromVertices(l, a.Cartesian3.ZERO, 3, ae[1])
      const ne = e.BoundingSphere.fromBoundingSpheres(ae)
      ne.radius += ee / (2 * m)
      const ie = {
        position: new C.GeometryAttribute({ componentDatatype: o.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, normalize: !1, values: E }),
        startHiAndForwardOffsetX: it(_),
        startLoAndForwardOffsetY: it(O),
        startNormalAndForwardOffsetZ: it(P),
        endNormalAndTextureCoordinateNormalizationX: it(A),
        rightNormalAndTextureCoordinateNormalizationY: it(b)
      }
      h &&
        ((ie.startHiLo2D = it(k)),
        (ie.offsetAndRight2D = it(L)),
        (ie.startEndNormals2D = it(x)),
        (ie.texcoordNormalization2D = new C.GeometryAttribute({
          componentDatatype: o.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          normalize: !1,
          values: I
        })))
      return new C.Geometry({ attributes: ie, indices: T, boundingSphere: ne })
    })(d, w, F, q, Y, G, h)
  }
  const pe = new a.Cartesian3(),
    he = new a.Matrix3(),
    de = new e.Quaternion()
  function ge(t, n, r, s) {
    const o = Z(r, n, pe),
      l = a.Cartesian3.dot(o, t)
    if (l > N || l < R) {
      const n = Z(s, r, ee),
        o = l < R ? i.CesiumMath.PI_OVER_TWO : -i.CesiumMath.PI_OVER_TWO,
        c = e.Quaternion.fromAxisAngle(n, o, de),
        u = a.Matrix3.fromQuaternion(c, he)
      return a.Matrix3.multiplyByVector(u, t, t), !0
    }
    return !1
  }
  const fe = new a.Cartographic(),
    me = new a.Cartesian3(),
    we = new a.Cartesian3()
  function ye(e, t, n, r, s) {
    const o = a.Cartographic.toCartesian(t, e._ellipsoid, me)
    let l = a.Cartesian3.add(o, n, we),
      c = !1
    const u = e._ellipsoid
    let C = u.cartesianToCartographic(l, fe)
    Math.abs(t.longitude - C.longitude) > i.CesiumMath.PI_OVER_TWO &&
      ((c = !0), (l = a.Cartesian3.subtract(o, n, we)), (C = u.cartesianToCartographic(l, fe))),
      (C.height = 0)
    const p = e.project(C, s)
    return ((s = a.Cartesian3.subtract(p, r, s)).z = 0), (s = a.Cartesian3.normalize(s, s)), c && a.Cartesian3.negate(s, s), s
  }
  const Me = new a.Cartesian3(),
    Te = new a.Cartesian3()
  function Ee(e, t, n, i, r, s) {
    const o = a.Cartesian3.subtract(t, e, Me)
    a.Cartesian3.normalize(o, o)
    const l = n - D
    let c = a.Cartesian3.multiplyByScalar(o, l, Te)
    a.Cartesian3.add(e, c, r)
    const u = i - v
    ;(c = a.Cartesian3.multiplyByScalar(o, u, Te)), a.Cartesian3.add(t, c, s)
  }
  const _e = new a.Cartesian3()
  function Oe(e, t) {
    const n = h.Plane.getPointDistance(ae, e),
      r = h.Plane.getPointDistance(ae, t)
    let s = _e
    i.CesiumMath.equalsEpsilon(n, 0, i.CesiumMath.EPSILON2)
      ? ((s = Z(t, e, s)), a.Cartesian3.multiplyByScalar(s, i.CesiumMath.EPSILON2, s), a.Cartesian3.add(e, s, e))
      : i.CesiumMath.equalsEpsilon(r, 0, i.CesiumMath.EPSILON2) &&
        ((s = Z(e, t, s)), a.Cartesian3.multiplyByScalar(s, i.CesiumMath.EPSILON2, s), a.Cartesian3.add(t, s, t))
  }
  function Pe(e, t) {
    const a = Math.abs(e.longitude),
      n = Math.abs(t.longitude)
    if (i.CesiumMath.equalsEpsilon(a, i.CesiumMath.PI, i.CesiumMath.EPSILON11)) {
      const n = i.CesiumMath.sign(t.longitude)
      return (e.longitude = n * (a - i.CesiumMath.EPSILON11)), 1
    }
    if (i.CesiumMath.equalsEpsilon(n, i.CesiumMath.PI, i.CesiumMath.EPSILON11)) {
      const a = i.CesiumMath.sign(e.longitude)
      return (t.longitude = a * (n - i.CesiumMath.EPSILON11)), 2
    }
    return 0
  }
  const Ae = new a.Cartographic(),
    be = new a.Cartographic(),
    ke = new a.Cartesian3(),
    Le = new a.Cartesian3(),
    Se = new a.Cartesian3(),
    xe = new a.Cartesian3(),
    Ie = new a.Cartesian3(),
    Ne = new a.Cartesian3(),
    Re = [Ae, be],
    De = new t.Rectangle(),
    ve = new a.Cartesian3(),
    ze = new a.Cartesian3(),
    He = new a.Cartesian3(),
    je = new a.Cartesian3(),
    Be = new a.Cartesian3(),
    Ve = new a.Cartesian3(),
    Ge = new a.Cartesian3(),
    Ye = new a.Cartesian3(),
    Fe = new a.Cartesian3(),
    qe = new a.Cartesian3(),
    Xe = new a.Cartesian3(),
    We = new a.Cartesian3(),
    Ue = new a.Cartesian3(),
    Ze = new a.Cartesian3(),
    $e = new u.EncodedCartesian3(),
    Je = new u.EncodedCartesian3(),
    Qe = new a.Cartesian3(),
    Ke = new a.Cartesian3(),
    et = new a.Cartesian3(),
    tt = [new e.BoundingSphere(), new e.BoundingSphere()],
    at = [0, 2, 1, 0, 3, 2, 0, 7, 3, 0, 4, 7, 0, 5, 4, 0, 1, 5, 5, 7, 4, 5, 6, 7, 5, 2, 6, 5, 1, 2, 3, 6, 2, 3, 7, 6],
    nt = at.length
  function it(e) {
    return new C.GeometryAttribute({ componentDatatype: o.ComponentDatatype.FLOAT, componentsPerAttribute: 4, normalize: !1, values: e })
  }
  return (
    (z._projectNormal = ye),
    function (e, t) {
      return S.initialize().then(function () {
        return n.defined(t) && (e = z.unpack(e, t)), z.createGeometry(e)
      })
    }
  )
})
