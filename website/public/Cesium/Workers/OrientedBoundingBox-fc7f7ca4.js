define([
  'exports',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './EllipsoidTangentPlane-d430e7d5',
  './Math-2ce22ee9',
  './Plane-6add0ae1'
], function (a, t, e, n, r, i, s, o) {
  'use strict'
  function C(a, t) {
    ;(this.center = n.Cartesian3.clone(r.defaultValue(a, n.Cartesian3.ZERO))), (this.halfAxes = n.Matrix3.clone(r.defaultValue(t, n.Matrix3.ZERO)))
  }
  ;(C.packedLength = n.Cartesian3.packedLength + n.Matrix3.packedLength),
    (C.pack = function (a, t, e) {
      return (e = r.defaultValue(e, 0)), n.Cartesian3.pack(a.center, t, e), n.Matrix3.pack(a.halfAxes, t, e + n.Cartesian3.packedLength), t
    }),
    (C.unpack = function (a, t, e) {
      return (
        (t = r.defaultValue(t, 0)),
        r.defined(e) || (e = new C()),
        n.Cartesian3.unpack(a, t, e.center),
        n.Matrix3.unpack(a, t + n.Cartesian3.packedLength, e.halfAxes),
        e
      )
    })
  const c = new n.Cartesian3(),
    u = new n.Cartesian3(),
    l = new n.Cartesian3(),
    d = new n.Cartesian3(),
    h = new n.Cartesian3(),
    x = new n.Cartesian3(),
    m = new n.Matrix3(),
    M = { unitary: new n.Matrix3(), diagonal: new n.Matrix3() }
  C.fromPoints = function (a, t) {
    if ((r.defined(t) || (t = new C()), !r.defined(a) || 0 === a.length)) return (t.halfAxes = n.Matrix3.ZERO), (t.center = n.Cartesian3.ZERO), t
    let e
    const i = a.length,
      s = n.Cartesian3.clone(a[0], c)
    for (e = 1; e < i; e++) n.Cartesian3.add(s, a[e], s)
    const o = 1 / i
    n.Cartesian3.multiplyByScalar(s, o, s)
    let f,
      p = 0,
      w = 0,
      g = 0,
      y = 0,
      b = 0,
      N = 0
    for (e = 0; e < i; e++)
      (f = n.Cartesian3.subtract(a[e], s, u)),
        (p += f.x * f.x),
        (w += f.x * f.y),
        (g += f.x * f.z),
        (y += f.y * f.y),
        (b += f.y * f.z),
        (N += f.z * f.z)
    ;(p *= o), (w *= o), (g *= o), (y *= o), (b *= o), (N *= o)
    const T = m
    ;(T[0] = p), (T[1] = w), (T[2] = g), (T[3] = w), (T[4] = y), (T[5] = b), (T[6] = g), (T[7] = b), (T[8] = N)
    const O = n.Matrix3.computeEigenDecomposition(T, M),
      A = n.Matrix3.clone(O.unitary, t.halfAxes)
    let P = n.Matrix3.getColumn(A, 0, d),
      I = n.Matrix3.getColumn(A, 1, h),
      R = n.Matrix3.getColumn(A, 2, x),
      E = -Number.MAX_VALUE,
      S = -Number.MAX_VALUE,
      U = -Number.MAX_VALUE,
      L = Number.MAX_VALUE,
      z = Number.MAX_VALUE,
      B = Number.MAX_VALUE
    for (e = 0; e < i; e++)
      (f = a[e]),
        (E = Math.max(n.Cartesian3.dot(P, f), E)),
        (S = Math.max(n.Cartesian3.dot(I, f), S)),
        (U = Math.max(n.Cartesian3.dot(R, f), U)),
        (L = Math.min(n.Cartesian3.dot(P, f), L)),
        (z = Math.min(n.Cartesian3.dot(I, f), z)),
        (B = Math.min(n.Cartesian3.dot(R, f), B))
    ;(P = n.Cartesian3.multiplyByScalar(P, 0.5 * (L + E), P)),
      (I = n.Cartesian3.multiplyByScalar(I, 0.5 * (z + S), I)),
      (R = n.Cartesian3.multiplyByScalar(R, 0.5 * (B + U), R))
    const V = n.Cartesian3.add(P, I, t.center)
    n.Cartesian3.add(V, R, V)
    const _ = l
    return (
      (_.x = E - L), (_.y = S - z), (_.z = U - B), n.Cartesian3.multiplyByScalar(_, 0.5, _), n.Matrix3.multiplyByScale(t.halfAxes, _, t.halfAxes), t
    )
  }
  const f = new n.Cartesian3(),
    p = new n.Cartesian3()
  function w(a, t, e, i, s, o, c, u, l, d, h) {
    r.defined(h) || (h = new C())
    const x = h.halfAxes
    n.Matrix3.setColumn(x, 0, t, x), n.Matrix3.setColumn(x, 1, e, x), n.Matrix3.setColumn(x, 2, i, x)
    let m = f
    ;(m.x = (s + o) / 2), (m.y = (c + u) / 2), (m.z = (l + d) / 2)
    const M = p
    ;(M.x = (o - s) / 2), (M.y = (u - c) / 2), (M.z = (d - l) / 2)
    const w = h.center
    return (m = n.Matrix3.multiplyByVector(x, m, m)), n.Cartesian3.add(a, m, w), n.Matrix3.multiplyByScale(x, M, x), h
  }
  const g = new n.Cartographic(),
    y = new n.Cartesian3(),
    b = new n.Cartographic(),
    N = new n.Cartographic(),
    T = new n.Cartographic(),
    O = new n.Cartographic(),
    A = new n.Cartographic(),
    P = new n.Cartesian3(),
    I = new n.Cartesian3(),
    R = new n.Cartesian3(),
    E = new n.Cartesian3(),
    S = new n.Cartesian3(),
    U = new e.Cartesian2(),
    L = new e.Cartesian2(),
    z = new e.Cartesian2(),
    B = new e.Cartesian2(),
    V = new e.Cartesian2(),
    _ = new n.Cartesian3(),
    k = new n.Cartesian3(),
    W = new n.Cartesian3(),
    X = new n.Cartesian3(),
    q = new e.Cartesian2(),
    D = new n.Cartesian3(),
    j = new n.Cartesian3(),
    Z = new n.Cartesian3(),
    v = new o.Plane(n.Cartesian3.UNIT_X, 0)
  ;(C.fromRectangle = function (a, t, C, c, u) {
    let l, d, h, x, m, M, f
    if (((t = r.defaultValue(t, 0)), (C = r.defaultValue(C, 0)), (c = r.defaultValue(c, n.Ellipsoid.WGS84)), a.width <= s.CesiumMath.PI)) {
      const r = e.Rectangle.center(a, g),
        s = c.cartographicToCartesian(r, y),
        p = new i.EllipsoidTangentPlane(s, c)
      f = p.plane
      const _ = r.longitude,
        k = a.south < 0 && a.north > 0 ? 0 : r.latitude,
        W = n.Cartographic.fromRadians(_, a.north, C, b),
        X = n.Cartographic.fromRadians(a.west, a.north, C, N),
        q = n.Cartographic.fromRadians(a.west, k, C, T),
        D = n.Cartographic.fromRadians(a.west, a.south, C, O),
        j = n.Cartographic.fromRadians(_, a.south, C, A),
        Z = c.cartographicToCartesian(W, P)
      let v = c.cartographicToCartesian(X, I)
      const Y = c.cartographicToCartesian(q, R)
      let G = c.cartographicToCartesian(D, E)
      const F = c.cartographicToCartesian(j, S),
        H = p.projectPointToNearestOnPlane(Z, U),
        J = p.projectPointToNearestOnPlane(v, L),
        K = p.projectPointToNearestOnPlane(Y, z),
        Q = p.projectPointToNearestOnPlane(G, B),
        $ = p.projectPointToNearestOnPlane(F, V)
      return (
        (l = Math.min(J.x, K.x, Q.x)),
        (d = -l),
        (x = Math.max(J.y, H.y)),
        (h = Math.min(Q.y, $.y)),
        (X.height = D.height = t),
        (v = c.cartographicToCartesian(X, I)),
        (G = c.cartographicToCartesian(D, E)),
        (m = Math.min(o.Plane.getPointDistance(f, v), o.Plane.getPointDistance(f, G))),
        (M = C),
        w(p.origin, p.xAxis, p.yAxis, p.zAxis, l, d, h, x, m, M, u)
      )
    }
    const p = a.south > 0,
      Y = a.north < 0,
      G = p ? a.south : Y ? a.north : 0,
      F = e.Rectangle.center(a, g).longitude,
      H = n.Cartesian3.fromRadians(F, G, C, c, _)
    H.z = 0
    const J = Math.abs(H.x) < s.CesiumMath.EPSILON10 && Math.abs(H.y) < s.CesiumMath.EPSILON10 ? n.Cartesian3.UNIT_X : n.Cartesian3.normalize(H, k),
      K = n.Cartesian3.UNIT_Z,
      Q = n.Cartesian3.cross(J, K, W)
    f = o.Plane.fromPointNormal(H, J, v)
    const $ = n.Cartesian3.fromRadians(F + s.CesiumMath.PI_OVER_TWO, G, C, c, X)
    ;(d = n.Cartesian3.dot(o.Plane.projectPointOntoPlane(f, $, q), Q)),
      (l = -d),
      (x = n.Cartesian3.fromRadians(0, a.north, Y ? t : C, c, D).z),
      (h = n.Cartesian3.fromRadians(0, a.south, p ? t : C, c, j).z)
    const aa = n.Cartesian3.fromRadians(a.east, G, C, c, Z)
    return (m = o.Plane.getPointDistance(f, aa)), (M = 0), w(H, Q, K, J, l, d, h, x, m, M, u)
  }),
    (C.fromTransformation = function (a, t) {
      return (
        r.defined(t) || (t = new C()),
        (t.center = e.Matrix4.getTranslation(a, t.center)),
        (t.halfAxes = e.Matrix4.getMatrix3(a, t.halfAxes)),
        (t.halfAxes = n.Matrix3.multiplyByScalar(t.halfAxes, 0.5, t.halfAxes)),
        t
      )
    }),
    (C.clone = function (a, t) {
      if (r.defined(a))
        return r.defined(t) ? (n.Cartesian3.clone(a.center, t.center), n.Matrix3.clone(a.halfAxes, t.halfAxes), t) : new C(a.center, a.halfAxes)
    }),
    (C.intersectPlane = function (a, e) {
      const r = a.center,
        i = e.normal,
        s = a.halfAxes,
        o = i.x,
        C = i.y,
        c = i.z,
        u =
          Math.abs(o * s[n.Matrix3.COLUMN0ROW0] + C * s[n.Matrix3.COLUMN0ROW1] + c * s[n.Matrix3.COLUMN0ROW2]) +
          Math.abs(o * s[n.Matrix3.COLUMN1ROW0] + C * s[n.Matrix3.COLUMN1ROW1] + c * s[n.Matrix3.COLUMN1ROW2]) +
          Math.abs(o * s[n.Matrix3.COLUMN2ROW0] + C * s[n.Matrix3.COLUMN2ROW1] + c * s[n.Matrix3.COLUMN2ROW2]),
        l = n.Cartesian3.dot(i, r) + e.distance
      return l <= -u ? t.Intersect.OUTSIDE : l >= u ? t.Intersect.INSIDE : t.Intersect.INTERSECTING
    })
  const Y = new n.Cartesian3(),
    G = new n.Cartesian3(),
    F = new n.Cartesian3(),
    H = new n.Cartesian3(),
    J = new n.Cartesian3(),
    K = new n.Cartesian3()
  C.distanceSquaredTo = function (a, t) {
    const e = n.Cartesian3.subtract(t, a.center, f),
      r = a.halfAxes
    let i = n.Matrix3.getColumn(r, 0, Y),
      o = n.Matrix3.getColumn(r, 1, G),
      C = n.Matrix3.getColumn(r, 2, F)
    const c = n.Cartesian3.magnitude(i),
      u = n.Cartesian3.magnitude(o),
      l = n.Cartesian3.magnitude(C)
    let d = !0,
      h = !0,
      x = !0
    c > 0 ? n.Cartesian3.divideByScalar(i, c, i) : (d = !1),
      u > 0 ? n.Cartesian3.divideByScalar(o, u, o) : (h = !1),
      l > 0 ? n.Cartesian3.divideByScalar(C, l, C) : (x = !1)
    const m = !d + !h + !x
    let M, p, w
    if (1 === m) {
      let a = i
      ;(M = o),
        (p = C),
        h ? x || ((a = C), (p = i)) : ((a = o), (M = i)),
        (w = n.Cartesian3.cross(M, p, J)),
        a === i ? (i = w) : a === o ? (o = w) : a === C && (C = w)
    } else if (2 === m) {
      ;(M = i), h ? (M = o) : x && (M = C)
      let a = n.Cartesian3.UNIT_Y
      a.equalsEpsilon(M, s.CesiumMath.EPSILON3) && (a = n.Cartesian3.UNIT_X),
        (p = n.Cartesian3.cross(M, a, H)),
        n.Cartesian3.normalize(p, p),
        (w = n.Cartesian3.cross(M, p, J)),
        n.Cartesian3.normalize(w, w),
        M === i ? ((o = p), (C = w)) : M === o ? ((C = p), (i = w)) : M === C && ((i = p), (o = w))
    } else 3 === m && ((i = n.Cartesian3.UNIT_X), (o = n.Cartesian3.UNIT_Y), (C = n.Cartesian3.UNIT_Z))
    const g = K
    ;(g.x = n.Cartesian3.dot(e, i)), (g.y = n.Cartesian3.dot(e, o)), (g.z = n.Cartesian3.dot(e, C))
    let y,
      b = 0
    return (
      g.x < -c ? ((y = g.x + c), (b += y * y)) : g.x > c && ((y = g.x - c), (b += y * y)),
      g.y < -u ? ((y = g.y + u), (b += y * y)) : g.y > u && ((y = g.y - u), (b += y * y)),
      g.z < -l ? ((y = g.z + l), (b += y * y)) : g.z > l && ((y = g.z - l), (b += y * y)),
      b
    )
  }
  const Q = new n.Cartesian3(),
    $ = new n.Cartesian3()
  C.computePlaneDistances = function (a, e, i, s) {
    r.defined(s) || (s = new t.Interval())
    let o = Number.POSITIVE_INFINITY,
      C = Number.NEGATIVE_INFINITY
    const c = a.center,
      u = a.halfAxes,
      l = n.Matrix3.getColumn(u, 0, Y),
      d = n.Matrix3.getColumn(u, 1, G),
      h = n.Matrix3.getColumn(u, 2, F),
      x = n.Cartesian3.add(l, d, Q)
    n.Cartesian3.add(x, h, x), n.Cartesian3.add(x, c, x)
    const m = n.Cartesian3.subtract(x, e, $)
    let M = n.Cartesian3.dot(i, m)
    return (
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      n.Cartesian3.add(c, l, x),
      n.Cartesian3.add(x, d, x),
      n.Cartesian3.subtract(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (M = n.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      n.Cartesian3.add(c, l, x),
      n.Cartesian3.subtract(x, d, x),
      n.Cartesian3.add(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (M = n.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      n.Cartesian3.add(c, l, x),
      n.Cartesian3.subtract(x, d, x),
      n.Cartesian3.subtract(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (M = n.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      n.Cartesian3.subtract(c, l, x),
      n.Cartesian3.add(x, d, x),
      n.Cartesian3.add(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (M = n.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      n.Cartesian3.subtract(c, l, x),
      n.Cartesian3.add(x, d, x),
      n.Cartesian3.subtract(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (M = n.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      n.Cartesian3.subtract(c, l, x),
      n.Cartesian3.subtract(x, d, x),
      n.Cartesian3.add(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (M = n.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      n.Cartesian3.subtract(c, l, x),
      n.Cartesian3.subtract(x, d, x),
      n.Cartesian3.subtract(x, h, x),
      n.Cartesian3.subtract(x, e, m),
      (M = n.Cartesian3.dot(i, m)),
      (o = Math.min(M, o)),
      (C = Math.max(M, C)),
      (s.start = o),
      (s.stop = C),
      s
    )
  }
  const aa = new n.Cartesian3(),
    ta = new n.Cartesian3(),
    ea = new n.Cartesian3()
  C.computeCorners = function (a, t) {
    r.defined(t) ||
      (t = [
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3(),
        new n.Cartesian3()
      ])
    const e = a.center,
      i = a.halfAxes,
      s = n.Matrix3.getColumn(i, 0, aa),
      o = n.Matrix3.getColumn(i, 1, ta),
      C = n.Matrix3.getColumn(i, 2, ea)
    return (
      n.Cartesian3.clone(e, t[0]),
      n.Cartesian3.subtract(t[0], s, t[0]),
      n.Cartesian3.subtract(t[0], o, t[0]),
      n.Cartesian3.subtract(t[0], C, t[0]),
      n.Cartesian3.clone(e, t[1]),
      n.Cartesian3.subtract(t[1], s, t[1]),
      n.Cartesian3.subtract(t[1], o, t[1]),
      n.Cartesian3.add(t[1], C, t[1]),
      n.Cartesian3.clone(e, t[2]),
      n.Cartesian3.subtract(t[2], s, t[2]),
      n.Cartesian3.add(t[2], o, t[2]),
      n.Cartesian3.subtract(t[2], C, t[2]),
      n.Cartesian3.clone(e, t[3]),
      n.Cartesian3.subtract(t[3], s, t[3]),
      n.Cartesian3.add(t[3], o, t[3]),
      n.Cartesian3.add(t[3], C, t[3]),
      n.Cartesian3.clone(e, t[4]),
      n.Cartesian3.add(t[4], s, t[4]),
      n.Cartesian3.subtract(t[4], o, t[4]),
      n.Cartesian3.subtract(t[4], C, t[4]),
      n.Cartesian3.clone(e, t[5]),
      n.Cartesian3.add(t[5], s, t[5]),
      n.Cartesian3.subtract(t[5], o, t[5]),
      n.Cartesian3.add(t[5], C, t[5]),
      n.Cartesian3.clone(e, t[6]),
      n.Cartesian3.add(t[6], s, t[6]),
      n.Cartesian3.add(t[6], o, t[6]),
      n.Cartesian3.subtract(t[6], C, t[6]),
      n.Cartesian3.clone(e, t[7]),
      n.Cartesian3.add(t[7], s, t[7]),
      n.Cartesian3.add(t[7], o, t[7]),
      n.Cartesian3.add(t[7], C, t[7]),
      t
    )
  }
  const na = new n.Matrix3()
  C.computeTransformation = function (a, t) {
    r.defined(t) || (t = new e.Matrix4())
    const i = a.center,
      s = n.Matrix3.multiplyByUniformScale(a.halfAxes, 2, na)
    return e.Matrix4.fromRotationTranslation(s, i, t)
  }
  const ra = new t.BoundingSphere()
  ;(C.isOccluded = function (a, e) {
    const n = t.BoundingSphere.fromOrientedBoundingBox(a, ra)
    return !e.isBoundingSphereVisible(n)
  }),
    (C.prototype.intersectPlane = function (a) {
      return C.intersectPlane(this, a)
    }),
    (C.prototype.distanceSquaredTo = function (a) {
      return C.distanceSquaredTo(this, a)
    }),
    (C.prototype.computePlaneDistances = function (a, t, e) {
      return C.computePlaneDistances(this, a, t, e)
    }),
    (C.prototype.computeCorners = function (a) {
      return C.computeCorners(this, a)
    }),
    (C.prototype.computeTransformation = function (a) {
      return C.computeTransformation(this, a)
    }),
    (C.prototype.isOccluded = function (a) {
      return C.isOccluded(this, a)
    }),
    (C.equals = function (a, t) {
      return a === t || (r.defined(a) && r.defined(t) && n.Cartesian3.equals(a.center, t.center) && n.Matrix3.equals(a.halfAxes, t.halfAxes))
    }),
    (C.prototype.clone = function (a) {
      return C.clone(this, a)
    }),
    (C.prototype.equals = function (a) {
      return C.equals(this, a)
    }),
    (a.OrientedBoundingBox = C)
})
