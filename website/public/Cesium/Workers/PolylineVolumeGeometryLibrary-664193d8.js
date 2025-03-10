define([
  'exports',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './EllipsoidTangentPlane-d430e7d5',
  './Math-2ce22ee9',
  './PolylinePipeline-5ae670bc',
  './Transforms-20461479',
  './defaultValue-f6d5e6da'
], function (e, a, t, n, r, i, s, o) {
  'use strict'
  var l = Object.freeze({ ROUNDED: 0, MITERED: 1, BEVELED: 2 })
  const c = {}
  function C(e, a) {
    o.defined(c[e]) || ((c[e] = !0), console.warn(o.defaultValue(a, e)))
  }
  ;(C.geometryOutlines =
    'Entity geometry outlines are unsupported on terrain. Outlines will be disabled. To enable outlines, disable geometry terrain clamping by explicitly setting height to 0.'),
    (C.geometryZIndex = 'Entity geometry with zIndex are unsupported when height or extrudedHeight are defined.  zIndex will be ignored'),
    (C.geometryHeightReference =
      'Entity corridor, ellipse, polygon or rectangle with heightReference must also have a defined height.  heightReference will be ignored'),
    (C.geometryExtrudedHeightReference =
      'Entity corridor, ellipse, polygon or rectangle with extrudedHeightReference must also have a defined extrudedHeight.  extrudedHeightReference will be ignored')
  const u = [new t.Cartesian3(), new t.Cartesian3()],
    d = new t.Cartesian3(),
    g = new t.Cartesian3(),
    y = new t.Cartesian3(),
    h = new t.Cartesian3(),
    m = new t.Cartesian3(),
    f = new t.Cartesian3(),
    p = new t.Cartesian3(),
    w = new t.Cartesian3(),
    x = new t.Cartesian3(),
    E = new t.Cartesian3(),
    P = new t.Cartesian3(),
    M = {}
  let T = new t.Cartographic()
  function b(e, a, n, r) {
    const i = e[0],
      s = e[1],
      o = t.Cartesian3.angleBetween(i, s),
      l = Math.ceil(o / r),
      c = new Array(l)
    let C
    if (a === n) {
      for (C = 0; C < l; C++) c[C] = a
      return c.push(n), c
    }
    const u = (n - a) / l
    for (C = 1; C < l; C++) {
      const e = a + C * u
      c[C] = e
    }
    return (c[0] = a), c.push(n), c
  }
  const B = new t.Cartesian3(),
    z = new t.Cartesian3()
  const S = new t.Cartesian3(-1, 0, 0)
  let A = new a.Matrix4()
  const D = new a.Matrix4()
  let R = new t.Matrix3()
  const O = t.Matrix3.IDENTITY.clone(),
    V = new t.Cartesian3(),
    I = new a.Cartesian4(),
    v = new t.Cartesian3()
  function N(e, r, i, o, l, c, C, u) {
    let d = V,
      g = I
    ;(A = s.Transforms.eastNorthUpToFixedFrame(e, l, A)), (d = a.Matrix4.multiplyByPointAsVector(A, S, d)), (d = t.Cartesian3.normalize(d, d))
    const y = (function (e, r, i, s) {
      const o = new n.EllipsoidTangentPlane(i, s),
        l = o.projectPointOntoPlane(t.Cartesian3.add(i, e, B), B),
        c = o.projectPointOntoPlane(t.Cartesian3.add(i, r, z), z),
        C = a.Cartesian2.angleBetween(l, c)
      return c.x * l.y - c.y * l.x >= 0 ? -C : C
    })(d, r, e, l)
    ;(R = t.Matrix3.fromRotationZ(y, R)), (v.z = c), (A = a.Matrix4.multiplyTransformation(A, a.Matrix4.fromRotationTranslation(R, v, D), A))
    const h = O
    h[0] = C
    for (let e = 0; e < u; e++)
      for (let e = 0; e < i.length; e += 3)
        (g = t.Cartesian3.fromArray(i, e, g)),
          (g = t.Matrix3.multiplyByVector(h, g, g)),
          (g = a.Matrix4.multiplyByPoint(A, g, g)),
          o.push(g.x, g.y, g.z)
    return o
  }
  const G = new t.Cartesian3()
  function H(e, a, n, r, i, s, o) {
    for (let l = 0; l < e.length; l += 3) {
      r = N(t.Cartesian3.fromArray(e, l, G), a, n, r, i, s[l / 3], o, 1)
    }
    return r
  }
  function L(e, a) {
    const t = e.length,
      n = new Array(3 * t)
    let r = 0
    const i = a.x + a.width / 2,
      s = a.y + a.height / 2
    for (let a = 0; a < t; a++) (n[r++] = e[a].x - i), (n[r++] = 0), (n[r++] = e[a].y - s)
    return n
  }
  const j = new s.Quaternion(),
    Q = new t.Cartesian3(),
    q = new t.Matrix3()
  function F(e, a, n, i, o, c, C, u, d, g) {
    const y = t.Cartesian3.angleBetween(t.Cartesian3.subtract(a, e, E), t.Cartesian3.subtract(n, e, P)),
      h = i === l.BEVELED ? 0 : Math.ceil(y / r.CesiumMath.toRadians(5))
    let m, f, p
    if (
      ((m = o
        ? t.Matrix3.fromQuaternion(s.Quaternion.fromAxisAngle(t.Cartesian3.negate(e, E), y / (h + 1), j), q)
        : t.Matrix3.fromQuaternion(s.Quaternion.fromAxisAngle(e, y / (h + 1), j), q)),
      (a = t.Cartesian3.clone(a, Q)),
      h > 0)
    ) {
      const n = g ? 2 : 1
      for (let r = 0; r < h; r++)
        (a = t.Matrix3.multiplyByVector(m, a, a)),
          (f = t.Cartesian3.subtract(a, e, E)),
          (f = t.Cartesian3.normalize(f, f)),
          o || (f = t.Cartesian3.negate(f, f)),
          (p = c.scaleToGeodeticSurface(a, P)),
          (C = N(p, f, u, C, c, d, 1, n))
    } else
      (f = t.Cartesian3.subtract(a, e, E)),
        (f = t.Cartesian3.normalize(f, f)),
        o || (f = t.Cartesian3.negate(f, f)),
        (p = c.scaleToGeodeticSurface(a, P)),
        (C = N(p, f, u, C, c, d, 1, 1)),
        (n = t.Cartesian3.clone(n, Q)),
        (f = t.Cartesian3.subtract(n, e, E)),
        (f = t.Cartesian3.normalize(f, f)),
        o || (f = t.Cartesian3.negate(f, f)),
        (p = c.scaleToGeodeticSurface(n, P)),
        (C = N(p, f, u, C, c, d, 1, 1))
    return C
  }
  ;(M.removeDuplicatesFromShape = function (e) {
    const t = e.length,
      n = []
    for (let r = t - 1, i = 0; i < t; r = i++) {
      const t = e[r],
        s = e[i]
      a.Cartesian2.equals(t, s) || n.push(s)
    }
    return n
  }),
    (M.angleIsGreaterThanPi = function (e, a, r, i) {
      const s = new n.EllipsoidTangentPlane(r, i),
        o = s.projectPointOntoPlane(t.Cartesian3.add(r, e, B), B),
        l = s.projectPointOntoPlane(t.Cartesian3.add(r, a, z), z)
      return l.x * o.y - l.y * o.x >= 0
    })
  const U = new t.Cartesian3(),
    _ = new t.Cartesian3()
  M.computePositions = function (e, a, n, s, o) {
    const c = s._ellipsoid,
      P = (function (e, a) {
        const t = new Array(e.length)
        for (let n = 0; n < e.length; n++) {
          const r = e[n]
          ;(T = a.cartesianToCartographic(r, T)), (t[n] = T.height), (e[n] = a.scaleToGeodeticSurface(r, r))
        }
        return t
      })(e, c),
      B = s._granularity,
      z = s._cornerType,
      S = o
        ? (function (e, a) {
            const t = e.length,
              n = new Array(6 * t)
            let r = 0
            const i = a.x + a.width / 2,
              s = a.y + a.height / 2
            let o = e[0]
            ;(n[r++] = o.x - i), (n[r++] = 0), (n[r++] = o.y - s)
            for (let a = 1; a < t; a++) {
              o = e[a]
              const t = o.x - i,
                l = o.y - s
              ;(n[r++] = t), (n[r++] = 0), (n[r++] = l), (n[r++] = t), (n[r++] = 0), (n[r++] = l)
            }
            return (o = e[0]), (n[r++] = o.x - i), (n[r++] = 0), (n[r++] = o.y - s), n
          })(a, n)
        : L(a, n),
      A = o ? L(a, n) : void 0,
      D = n.height / 2,
      R = n.width / 2
    let O = e.length,
      V = [],
      I = o ? [] : void 0,
      v = d,
      G = g,
      j = y,
      Q = h,
      q = m,
      Z = f,
      W = p,
      Y = w,
      k = x,
      J = e[0],
      K = e[1]
    ;(Q = c.geodeticSurfaceNormal(J, Q)),
      (v = t.Cartesian3.subtract(K, J, v)),
      (v = t.Cartesian3.normalize(v, v)),
      (Y = t.Cartesian3.cross(Q, v, Y)),
      (Y = t.Cartesian3.normalize(Y, Y))
    let X,
      $,
      ee = P[0],
      ae = P[1]
    o && (I = N(J, Y, A, I, c, ee + D, 1, 1)), (k = t.Cartesian3.clone(J, k)), (J = K), (G = t.Cartesian3.negate(v, G))
    for (let a = 1; a < O - 1; a++) {
      const n = o ? 2 : 1
      if (((K = e[a + 1]), J.equals(K))) {
        C('Positions are too close and are considered equivalent with rounding error.')
        continue
      }
      ;(v = t.Cartesian3.subtract(K, J, v)),
        (v = t.Cartesian3.normalize(v, v)),
        (j = t.Cartesian3.add(v, G, j)),
        (j = t.Cartesian3.normalize(j, j)),
        (Q = c.geodeticSurfaceNormal(J, Q))
      const s = t.Cartesian3.multiplyByScalar(Q, t.Cartesian3.dot(v, Q), U)
      t.Cartesian3.subtract(v, s, s), t.Cartesian3.normalize(s, s)
      const d = t.Cartesian3.multiplyByScalar(Q, t.Cartesian3.dot(G, Q), _)
      t.Cartesian3.subtract(G, d, d), t.Cartesian3.normalize(d, d)
      if (!r.CesiumMath.equalsEpsilon(Math.abs(t.Cartesian3.dot(s, d)), 1, r.CesiumMath.EPSILON7)) {
        ;(j = t.Cartesian3.cross(j, Q, j)), (j = t.Cartesian3.cross(Q, j, j)), (j = t.Cartesian3.normalize(j, j))
        const e = 1 / Math.max(0.25, t.Cartesian3.magnitude(t.Cartesian3.cross(j, G, E))),
          a = M.angleIsGreaterThanPi(v, G, J, c)
        a
          ? ((q = t.Cartesian3.add(J, t.Cartesian3.multiplyByScalar(j, e * R, j), q)),
            (Z = t.Cartesian3.add(q, t.Cartesian3.multiplyByScalar(Y, R, Z), Z)),
            (u[0] = t.Cartesian3.clone(k, u[0])),
            (u[1] = t.Cartesian3.clone(Z, u[1])),
            (X = b(u, ee + D, ae + D, B)),
            ($ = i.PolylinePipeline.generateArc({ positions: u, granularity: B, ellipsoid: c })),
            (V = H($, Y, S, V, c, X, 1)),
            (Y = t.Cartesian3.cross(Q, v, Y)),
            (Y = t.Cartesian3.normalize(Y, Y)),
            (W = t.Cartesian3.add(q, t.Cartesian3.multiplyByScalar(Y, R, W), W)),
            z === l.ROUNDED || z === l.BEVELED
              ? F(q, Z, W, z, a, c, V, S, ae + D, o)
              : ((j = t.Cartesian3.negate(j, j)), (V = N(J, j, S, V, c, ae + D, e, n))),
            (k = t.Cartesian3.clone(W, k)))
          : ((q = t.Cartesian3.add(J, t.Cartesian3.multiplyByScalar(j, e * R, j), q)),
            (Z = t.Cartesian3.add(q, t.Cartesian3.multiplyByScalar(Y, -R, Z), Z)),
            (u[0] = t.Cartesian3.clone(k, u[0])),
            (u[1] = t.Cartesian3.clone(Z, u[1])),
            (X = b(u, ee + D, ae + D, B)),
            ($ = i.PolylinePipeline.generateArc({ positions: u, granularity: B, ellipsoid: c })),
            (V = H($, Y, S, V, c, X, 1)),
            (Y = t.Cartesian3.cross(Q, v, Y)),
            (Y = t.Cartesian3.normalize(Y, Y)),
            (W = t.Cartesian3.add(q, t.Cartesian3.multiplyByScalar(Y, -R, W), W)),
            z === l.ROUNDED || z === l.BEVELED ? F(q, Z, W, z, a, c, V, S, ae + D, o) : (V = N(J, j, S, V, c, ae + D, e, n)),
            (k = t.Cartesian3.clone(W, k))),
          (G = t.Cartesian3.negate(v, G))
      } else (V = N(k, Y, S, V, c, ee + D, 1, 1)), (k = J)
      ;(ee = ae), (ae = P[a + 1]), (J = K)
    }
    ;(u[0] = t.Cartesian3.clone(k, u[0])),
      (u[1] = t.Cartesian3.clone(J, u[1])),
      (X = b(u, ee + D, ae + D, B)),
      ($ = i.PolylinePipeline.generateArc({ positions: u, granularity: B, ellipsoid: c })),
      (V = H($, Y, S, V, c, X, 1)),
      o && (I = N(J, Y, A, I, c, ae + D, 1, 1)),
      (O = V.length)
    const te = o ? O + I.length : O,
      ne = new Float64Array(te)
    return ne.set(V), o && ne.set(I, O), ne
  }
  var Z = M
  ;(e.CornerType = l), (e.PolylineVolumeGeometryLibrary = Z), (e.oneTimeWarning = C)
})
