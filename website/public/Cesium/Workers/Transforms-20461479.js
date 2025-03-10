define([
  'require',
  'exports',
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './Math-2ce22ee9',
  './Matrix2-413c4048',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb'
], function (e, t, n, r, o, i, s, a) {
  'use strict'
  function u(e) {
    var t = Object.create(null)
    return (
      e &&
        Object.keys(e).forEach(function (n) {
          if ('default' !== n) {
            var r = Object.getOwnPropertyDescriptor(e, n)
            Object.defineProperty(
              t,
              n,
              r.get
                ? r
                : {
                    enumerable: !0,
                    get: function () {
                      return e[n]
                    }
                  }
            )
          }
        }),
      (t.default = e),
      Object.freeze(t)
    )
  }
  function c(e) {
    let t
    ;(this.name = 'DeveloperError'), (this.message = e)
    try {
      throw new Error()
    } catch (e) {
      t = e.stack
    }
    this.stack = t
  }
  r.defined(Object.create) && ((c.prototype = Object.create(Error.prototype)), (c.prototype.constructor = c)),
    (c.prototype.toString = function () {
      let e = `${this.name}: ${this.message}`
      return r.defined(this.stack) && (e += `\n${this.stack.toString()}`), e
    }),
    (c.throwInstantiationError = function () {
      throw new c('This function defines an interface and should not be called directly.')
    })
  const l = {}
  function d(e, t, n) {
    return `Expected ${n} to be typeof ${t}, actual typeof was ${e}`
  }
  ;(l.typeOf = {}),
    (l.defined = function (e, t) {
      if (!r.defined(t))
        throw new c(
          (function (e) {
            return `${e} is required, actual value was undefined`
          })(e)
        )
    }),
    (l.typeOf.func = function (e, t) {
      if ('function' != typeof t) throw new c(d(typeof t, 'function', e))
    }),
    (l.typeOf.string = function (e, t) {
      if ('string' != typeof t) throw new c(d(typeof t, 'string', e))
    }),
    (l.typeOf.number = function (e, t) {
      if ('number' != typeof t) throw new c(d(typeof t, 'number', e))
    }),
    (l.typeOf.number.lessThan = function (e, t, n) {
      if ((l.typeOf.number(e, t), t >= n)) throw new c(`Expected ${e} to be less than ${n}, actual value was ${t}`)
    }),
    (l.typeOf.number.lessThanOrEquals = function (e, t, n) {
      if ((l.typeOf.number(e, t), t > n)) throw new c(`Expected ${e} to be less than or equal to ${n}, actual value was ${t}`)
    }),
    (l.typeOf.number.greaterThan = function (e, t, n) {
      if ((l.typeOf.number(e, t), t <= n)) throw new c(`Expected ${e} to be greater than ${n}, actual value was ${t}`)
    }),
    (l.typeOf.number.greaterThanOrEquals = function (e, t, n) {
      if ((l.typeOf.number(e, t), t < n)) throw new c(`Expected ${e} to be greater than or equal to ${n}, actual value was ${t}`)
    }),
    (l.typeOf.object = function (e, t) {
      if ('object' != typeof t) throw new c(d(typeof t, 'object', e))
    }),
    (l.typeOf.bool = function (e, t) {
      if ('boolean' != typeof t) throw new c(d(typeof t, 'boolean', e))
    }),
    (l.typeOf.bigint = function (e, t) {
      if ('bigint' != typeof t) throw new c(d(typeof t, 'bigint', e))
    }),
    (l.typeOf.number.equals = function (e, t, n, r) {
      if ((l.typeOf.number(e, n), l.typeOf.number(t, r), n !== r)) throw new c(`${e} must be equal to ${t}, the actual values are ${n} and ${r}`)
    })
  var f = l,
    p =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {}
  function h(e) {
    ;(this._ellipsoid = r.defaultValue(e, n.Ellipsoid.WGS84)),
      (this._semimajorAxis = this._ellipsoid.maximumRadius),
      (this._oneOverSemimajorAxis = 1 / this._semimajorAxis)
  }
  Object.defineProperties(h.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    }
  }),
    (h.prototype.project = function (e, t) {
      const o = this._semimajorAxis,
        i = e.longitude * o,
        s = e.latitude * o,
        a = e.height
      return r.defined(t) ? ((t.x = i), (t.y = s), (t.z = a), t) : new n.Cartesian3(i, s, a)
    }),
    (h.prototype.unproject = function (e, t) {
      const o = this._oneOverSemimajorAxis,
        i = e.x * o,
        s = e.y * o,
        a = e.z
      return r.defined(t) ? ((t.longitude = i), (t.latitude = s), (t.height = a), t) : new n.Cartographic(i, s, a)
    })
  var m = Object.freeze({ OUTSIDE: -1, INTERSECTING: 0, INSIDE: 1 })
  function g(e, t) {
    ;(this.start = r.defaultValue(e, 0)), (this.stop = r.defaultValue(t, 0))
  }
  function y(e, t) {
    ;(this.center = n.Cartesian3.clone(r.defaultValue(e, n.Cartesian3.ZERO))), (this.radius = r.defaultValue(t, 0))
  }
  const v = new n.Cartesian3(),
    w = new n.Cartesian3(),
    C = new n.Cartesian3(),
    _ = new n.Cartesian3(),
    b = new n.Cartesian3(),
    x = new n.Cartesian3(),
    S = new n.Cartesian3(),
    A = new n.Cartesian3(),
    E = new n.Cartesian3(),
    O = new n.Cartesian3(),
    I = new n.Cartesian3(),
    P = new n.Cartesian3(),
    R = (4 / 3) * o.CesiumMath.PI
  y.fromPoints = function (e, t) {
    if ((r.defined(t) || (t = new y()), !r.defined(e) || 0 === e.length))
      return (t.center = n.Cartesian3.clone(n.Cartesian3.ZERO, t.center)), (t.radius = 0), t
    const o = n.Cartesian3.clone(e[0], S),
      i = n.Cartesian3.clone(o, v),
      s = n.Cartesian3.clone(o, w),
      a = n.Cartesian3.clone(o, C),
      u = n.Cartesian3.clone(o, _),
      c = n.Cartesian3.clone(o, b),
      l = n.Cartesian3.clone(o, x),
      d = e.length
    let f
    for (f = 1; f < d; f++) {
      n.Cartesian3.clone(e[f], o)
      const t = o.x,
        r = o.y,
        d = o.z
      t < i.x && n.Cartesian3.clone(o, i),
        t > u.x && n.Cartesian3.clone(o, u),
        r < s.y && n.Cartesian3.clone(o, s),
        r > c.y && n.Cartesian3.clone(o, c),
        d < a.z && n.Cartesian3.clone(o, a),
        d > l.z && n.Cartesian3.clone(o, l)
    }
    const p = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(u, i, A)),
      h = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(c, s, A)),
      m = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(l, a, A))
    let g = i,
      R = u,
      T = p
    h > T && ((T = h), (g = s), (R = c)), m > T && ((T = m), (g = a), (R = l))
    const q = E
    ;(q.x = 0.5 * (g.x + R.x)), (q.y = 0.5 * (g.y + R.y)), (q.z = 0.5 * (g.z + R.z))
    let z = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(R, q, A)),
      M = Math.sqrt(z)
    const D = O
    ;(D.x = i.x), (D.y = s.y), (D.z = a.z)
    const U = I
    ;(U.x = u.x), (U.y = c.y), (U.z = l.z)
    const k = n.Cartesian3.midpoint(D, U, P)
    let F = 0
    for (f = 0; f < d; f++) {
      n.Cartesian3.clone(e[f], o)
      const t = n.Cartesian3.magnitude(n.Cartesian3.subtract(o, k, A))
      t > F && (F = t)
      const r = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(o, q, A))
      if (r > z) {
        const e = Math.sqrt(r)
        ;(M = 0.5 * (M + e)), (z = M * M)
        const t = e - M
        ;(q.x = (M * q.x + t * o.x) / e), (q.y = (M * q.y + t * o.y) / e), (q.z = (M * q.z + t * o.z) / e)
      }
    }
    return M < F ? (n.Cartesian3.clone(q, t.center), (t.radius = M)) : (n.Cartesian3.clone(k, t.center), (t.radius = F)), t
  }
  const T = new h(),
    q = new n.Cartesian3(),
    z = new n.Cartesian3(),
    M = new n.Cartographic(),
    D = new n.Cartographic()
  ;(y.fromRectangle2D = function (e, t, n) {
    return y.fromRectangleWithHeights2D(e, t, 0, 0, n)
  }),
    (y.fromRectangleWithHeights2D = function (e, t, o, s, a) {
      if ((r.defined(a) || (a = new y()), !r.defined(e))) return (a.center = n.Cartesian3.clone(n.Cartesian3.ZERO, a.center)), (a.radius = 0), a
      ;(t = r.defaultValue(t, T)), i.Rectangle.southwest(e, M), (M.height = o), i.Rectangle.northeast(e, D), (D.height = s)
      const u = t.project(M, q),
        c = t.project(D, z),
        l = c.x - u.x,
        d = c.y - u.y,
        f = c.z - u.z
      a.radius = 0.5 * Math.sqrt(l * l + d * d + f * f)
      const p = a.center
      return (p.x = u.x + 0.5 * l), (p.y = u.y + 0.5 * d), (p.z = u.z + 0.5 * f), a
    })
  const U = []
  ;(y.fromRectangle3D = function (e, t, o, s) {
    if (((t = r.defaultValue(t, n.Ellipsoid.WGS84)), (o = r.defaultValue(o, 0)), r.defined(s) || (s = new y()), !r.defined(e)))
      return (s.center = n.Cartesian3.clone(n.Cartesian3.ZERO, s.center)), (s.radius = 0), s
    const a = i.Rectangle.subsample(e, t, o, U)
    return y.fromPoints(a, s)
  }),
    (y.fromVertices = function (e, t, o, i) {
      if ((r.defined(i) || (i = new y()), !r.defined(e) || 0 === e.length))
        return (i.center = n.Cartesian3.clone(n.Cartesian3.ZERO, i.center)), (i.radius = 0), i
      ;(t = r.defaultValue(t, n.Cartesian3.ZERO)), (o = r.defaultValue(o, 3))
      const s = S
      ;(s.x = e[0] + t.x), (s.y = e[1] + t.y), (s.z = e[2] + t.z)
      const a = n.Cartesian3.clone(s, v),
        u = n.Cartesian3.clone(s, w),
        c = n.Cartesian3.clone(s, C),
        l = n.Cartesian3.clone(s, _),
        d = n.Cartesian3.clone(s, b),
        f = n.Cartesian3.clone(s, x),
        p = e.length
      let h
      for (h = 0; h < p; h += o) {
        const r = e[h] + t.x,
          o = e[h + 1] + t.y,
          i = e[h + 2] + t.z
        ;(s.x = r),
          (s.y = o),
          (s.z = i),
          r < a.x && n.Cartesian3.clone(s, a),
          r > l.x && n.Cartesian3.clone(s, l),
          o < u.y && n.Cartesian3.clone(s, u),
          o > d.y && n.Cartesian3.clone(s, d),
          i < c.z && n.Cartesian3.clone(s, c),
          i > f.z && n.Cartesian3.clone(s, f)
      }
      const m = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(l, a, A)),
        g = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(d, u, A)),
        R = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(f, c, A))
      let T = a,
        q = l,
        z = m
      g > z && ((z = g), (T = u), (q = d)), R > z && ((z = R), (T = c), (q = f))
      const M = E
      ;(M.x = 0.5 * (T.x + q.x)), (M.y = 0.5 * (T.y + q.y)), (M.z = 0.5 * (T.z + q.z))
      let D = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(q, M, A)),
        U = Math.sqrt(D)
      const k = O
      ;(k.x = a.x), (k.y = u.y), (k.z = c.z)
      const F = I
      ;(F.x = l.x), (F.y = d.y), (F.z = f.z)
      const N = n.Cartesian3.midpoint(k, F, P)
      let j = 0
      for (h = 0; h < p; h += o) {
        ;(s.x = e[h] + t.x), (s.y = e[h + 1] + t.y), (s.z = e[h + 2] + t.z)
        const r = n.Cartesian3.magnitude(n.Cartesian3.subtract(s, N, A))
        r > j && (j = r)
        const o = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(s, M, A))
        if (o > D) {
          const e = Math.sqrt(o)
          ;(U = 0.5 * (U + e)), (D = U * U)
          const t = e - U
          ;(M.x = (U * M.x + t * s.x) / e), (M.y = (U * M.y + t * s.y) / e), (M.z = (U * M.z + t * s.z) / e)
        }
      }
      return U < j ? (n.Cartesian3.clone(M, i.center), (i.radius = U)) : (n.Cartesian3.clone(N, i.center), (i.radius = j)), i
    }),
    (y.fromEncodedCartesianVertices = function (e, t, o) {
      if ((r.defined(o) || (o = new y()), !r.defined(e) || !r.defined(t) || e.length !== t.length || 0 === e.length))
        return (o.center = n.Cartesian3.clone(n.Cartesian3.ZERO, o.center)), (o.radius = 0), o
      const i = S
      ;(i.x = e[0] + t[0]), (i.y = e[1] + t[1]), (i.z = e[2] + t[2])
      const s = n.Cartesian3.clone(i, v),
        a = n.Cartesian3.clone(i, w),
        u = n.Cartesian3.clone(i, C),
        c = n.Cartesian3.clone(i, _),
        l = n.Cartesian3.clone(i, b),
        d = n.Cartesian3.clone(i, x),
        f = e.length
      let p
      for (p = 0; p < f; p += 3) {
        const r = e[p] + t[p],
          o = e[p + 1] + t[p + 1],
          f = e[p + 2] + t[p + 2]
        ;(i.x = r),
          (i.y = o),
          (i.z = f),
          r < s.x && n.Cartesian3.clone(i, s),
          r > c.x && n.Cartesian3.clone(i, c),
          o < a.y && n.Cartesian3.clone(i, a),
          o > l.y && n.Cartesian3.clone(i, l),
          f < u.z && n.Cartesian3.clone(i, u),
          f > d.z && n.Cartesian3.clone(i, d)
      }
      const h = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(c, s, A)),
        m = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(l, a, A)),
        g = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(d, u, A))
      let R = s,
        T = c,
        q = h
      m > q && ((q = m), (R = a), (T = l)), g > q && ((q = g), (R = u), (T = d))
      const z = E
      ;(z.x = 0.5 * (R.x + T.x)), (z.y = 0.5 * (R.y + T.y)), (z.z = 0.5 * (R.z + T.z))
      let M = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(T, z, A)),
        D = Math.sqrt(M)
      const U = O
      ;(U.x = s.x), (U.y = a.y), (U.z = u.z)
      const k = I
      ;(k.x = c.x), (k.y = l.y), (k.z = d.z)
      const F = n.Cartesian3.midpoint(U, k, P)
      let N = 0
      for (p = 0; p < f; p += 3) {
        ;(i.x = e[p] + t[p]), (i.y = e[p + 1] + t[p + 1]), (i.z = e[p + 2] + t[p + 2])
        const r = n.Cartesian3.magnitude(n.Cartesian3.subtract(i, F, A))
        r > N && (N = r)
        const o = n.Cartesian3.magnitudeSquared(n.Cartesian3.subtract(i, z, A))
        if (o > M) {
          const e = Math.sqrt(o)
          ;(D = 0.5 * (D + e)), (M = D * D)
          const t = e - D
          ;(z.x = (D * z.x + t * i.x) / e), (z.y = (D * z.y + t * i.y) / e), (z.z = (D * z.z + t * i.z) / e)
        }
      }
      return D < N ? (n.Cartesian3.clone(z, o.center), (o.radius = D)) : (n.Cartesian3.clone(F, o.center), (o.radius = N)), o
    }),
    (y.fromCornerPoints = function (e, t, o) {
      r.defined(o) || (o = new y())
      const i = n.Cartesian3.midpoint(e, t, o.center)
      return (o.radius = n.Cartesian3.distance(i, t)), o
    }),
    (y.fromEllipsoid = function (e, t) {
      return r.defined(t) || (t = new y()), n.Cartesian3.clone(n.Cartesian3.ZERO, t.center), (t.radius = e.maximumRadius), t
    })
  const k = new n.Cartesian3()
  y.fromBoundingSpheres = function (e, t) {
    if ((r.defined(t) || (t = new y()), !r.defined(e) || 0 === e.length))
      return (t.center = n.Cartesian3.clone(n.Cartesian3.ZERO, t.center)), (t.radius = 0), t
    const o = e.length
    if (1 === o) return y.clone(e[0], t)
    if (2 === o) return y.union(e[0], e[1], t)
    const i = []
    let s
    for (s = 0; s < o; s++) i.push(e[s].center)
    const a = (t = y.fromPoints(i, t)).center
    let u = t.radius
    for (s = 0; s < o; s++) {
      const t = e[s]
      u = Math.max(u, n.Cartesian3.distance(a, t.center, k) + t.radius)
    }
    return (t.radius = u), t
  }
  const F = new n.Cartesian3(),
    N = new n.Cartesian3(),
    j = new n.Cartesian3()
  y.fromOrientedBoundingBox = function (e, t) {
    r.defined(t) || (t = new y())
    const o = e.halfAxes,
      i = n.Matrix3.getColumn(o, 0, F),
      s = n.Matrix3.getColumn(o, 1, N),
      a = n.Matrix3.getColumn(o, 2, j)
    return (
      n.Cartesian3.add(i, s, i),
      n.Cartesian3.add(i, a, i),
      (t.center = n.Cartesian3.clone(e.center, t.center)),
      (t.radius = n.Cartesian3.magnitude(i)),
      t
    )
  }
  const B = new n.Cartesian3(),
    V = new n.Cartesian3()
  ;(y.fromTransformation = function (e, t) {
    r.defined(t) || (t = new y())
    const o = i.Matrix4.getTranslation(e, B),
      s = i.Matrix4.getScale(e, V),
      a = 0.5 * n.Cartesian3.magnitude(s)
    return (t.center = n.Cartesian3.clone(o, t.center)), (t.radius = a), t
  }),
    (y.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t) ? ((t.center = n.Cartesian3.clone(e.center, t.center)), (t.radius = e.radius), t) : new y(e.center, e.radius)
    }),
    (y.packedLength = 4),
    (y.pack = function (e, t, n) {
      n = r.defaultValue(n, 0)
      const o = e.center
      return (t[n++] = o.x), (t[n++] = o.y), (t[n++] = o.z), (t[n] = e.radius), t
    }),
    (y.unpack = function (e, t, n) {
      ;(t = r.defaultValue(t, 0)), r.defined(n) || (n = new y())
      const o = n.center
      return (o.x = e[t++]), (o.y = e[t++]), (o.z = e[t++]), (n.radius = e[t]), n
    })
  const $ = new n.Cartesian3(),
    L = new n.Cartesian3()
  y.union = function (e, t, o) {
    r.defined(o) || (o = new y())
    const i = e.center,
      s = e.radius,
      a = t.center,
      u = t.radius,
      c = n.Cartesian3.subtract(a, i, $),
      l = n.Cartesian3.magnitude(c)
    if (s >= l + u) return e.clone(o), o
    if (u >= l + s) return t.clone(o), o
    const d = 0.5 * (s + l + u),
      f = n.Cartesian3.multiplyByScalar(c, (-s + d) / l, L)
    return n.Cartesian3.add(f, i, f), n.Cartesian3.clone(f, o.center), (o.radius = d), o
  }
  const Q = new n.Cartesian3()
  ;(y.expand = function (e, t, r) {
    r = y.clone(e, r)
    const o = n.Cartesian3.magnitude(n.Cartesian3.subtract(t, r.center, Q))
    return o > r.radius && (r.radius = o), r
  }),
    (y.intersectPlane = function (e, t) {
      const r = e.center,
        o = e.radius,
        i = t.normal,
        s = n.Cartesian3.dot(i, r) + t.distance
      return s < -o ? m.OUTSIDE : s < o ? m.INTERSECTING : m.INSIDE
    }),
    (y.transform = function (e, t, n) {
      return (
        r.defined(n) || (n = new y()),
        (n.center = i.Matrix4.multiplyByPoint(t, e.center, n.center)),
        (n.radius = i.Matrix4.getMaximumScale(t) * e.radius),
        n
      )
    })
  const W = new n.Cartesian3()
  ;(y.distanceSquaredTo = function (e, t) {
    const r = n.Cartesian3.subtract(e.center, t, W),
      o = n.Cartesian3.magnitude(r) - e.radius
    return o <= 0 ? 0 : o * o
  }),
    (y.transformWithoutScale = function (e, t, n) {
      return r.defined(n) || (n = new y()), (n.center = i.Matrix4.multiplyByPoint(t, e.center, n.center)), (n.radius = e.radius), n
    })
  const H = new n.Cartesian3()
  y.computePlaneDistances = function (e, t, o, i) {
    r.defined(i) || (i = new g())
    const s = n.Cartesian3.subtract(e.center, t, H),
      a = n.Cartesian3.dot(o, s)
    return (i.start = a - e.radius), (i.stop = a + e.radius), i
  }
  const Y = new n.Cartesian3(),
    Z = new n.Cartesian3(),
    J = new n.Cartesian3(),
    X = new n.Cartesian3(),
    G = new n.Cartesian3(),
    K = new n.Cartographic(),
    ee = new Array(8)
  for (let e = 0; e < 8; ++e) ee[e] = new n.Cartesian3()
  const te = new h()
  let ne
  ;(y.projectTo2D = function (e, t, o) {
    const i = (t = r.defaultValue(t, te)).ellipsoid
    let s = e.center
    const a = e.radius
    let u
    u = n.Cartesian3.equals(s, n.Cartesian3.ZERO) ? n.Cartesian3.clone(n.Cartesian3.UNIT_X, Y) : i.geodeticSurfaceNormal(s, Y)
    const c = n.Cartesian3.cross(n.Cartesian3.UNIT_Z, u, Z)
    n.Cartesian3.normalize(c, c)
    const l = n.Cartesian3.cross(u, c, J)
    n.Cartesian3.normalize(l, l),
      n.Cartesian3.multiplyByScalar(u, a, u),
      n.Cartesian3.multiplyByScalar(l, a, l),
      n.Cartesian3.multiplyByScalar(c, a, c)
    const d = n.Cartesian3.negate(l, G),
      f = n.Cartesian3.negate(c, X),
      p = ee
    let h = p[0]
    n.Cartesian3.add(u, l, h),
      n.Cartesian3.add(h, c, h),
      (h = p[1]),
      n.Cartesian3.add(u, l, h),
      n.Cartesian3.add(h, f, h),
      (h = p[2]),
      n.Cartesian3.add(u, d, h),
      n.Cartesian3.add(h, f, h),
      (h = p[3]),
      n.Cartesian3.add(u, d, h),
      n.Cartesian3.add(h, c, h),
      n.Cartesian3.negate(u, u),
      (h = p[4]),
      n.Cartesian3.add(u, l, h),
      n.Cartesian3.add(h, c, h),
      (h = p[5]),
      n.Cartesian3.add(u, l, h),
      n.Cartesian3.add(h, f, h),
      (h = p[6]),
      n.Cartesian3.add(u, d, h),
      n.Cartesian3.add(h, f, h),
      (h = p[7]),
      n.Cartesian3.add(u, d, h),
      n.Cartesian3.add(h, c, h)
    const m = p.length
    for (let e = 0; e < m; ++e) {
      const r = p[e]
      n.Cartesian3.add(s, r, r)
      const o = i.cartesianToCartographic(r, K)
      t.project(o, r)
    }
    s = (o = y.fromPoints(p, o)).center
    const g = s.x,
      v = s.y,
      w = s.z
    return (s.x = w), (s.y = g), (s.z = v), o
  }),
    (y.isOccluded = function (e, t) {
      return !t.isBoundingSphereVisible(e)
    }),
    (y.equals = function (e, t) {
      return e === t || (r.defined(e) && r.defined(t) && n.Cartesian3.equals(e.center, t.center) && e.radius === t.radius)
    }),
    (y.prototype.intersectPlane = function (e) {
      return y.intersectPlane(this, e)
    }),
    (y.prototype.distanceSquaredTo = function (e) {
      return y.distanceSquaredTo(this, e)
    }),
    (y.prototype.computePlaneDistances = function (e, t, n) {
      return y.computePlaneDistances(this, e, t, n)
    }),
    (y.prototype.isOccluded = function (e) {
      return y.isOccluded(this, e)
    }),
    (y.prototype.equals = function (e) {
      return y.equals(this, e)
    }),
    (y.prototype.clone = function (e) {
      return y.clone(this, e)
    }),
    (y.prototype.volume = function () {
      const e = this.radius
      return R * e * e * e
    })
  const re = {
      requestFullscreen: void 0,
      exitFullscreen: void 0,
      fullscreenEnabled: void 0,
      fullscreenElement: void 0,
      fullscreenchange: void 0,
      fullscreenerror: void 0
    },
    oe = {}
  Object.defineProperties(oe, {
    element: {
      get: function () {
        if (oe.supportsFullscreen()) return document[re.fullscreenElement]
      }
    },
    changeEventName: {
      get: function () {
        if (oe.supportsFullscreen()) return re.fullscreenchange
      }
    },
    errorEventName: {
      get: function () {
        if (oe.supportsFullscreen()) return re.fullscreenerror
      }
    },
    enabled: {
      get: function () {
        if (oe.supportsFullscreen()) return document[re.fullscreenEnabled]
      }
    },
    fullscreen: {
      get: function () {
        if (oe.supportsFullscreen()) return null !== oe.element
      }
    }
  }),
    (oe.supportsFullscreen = function () {
      if (r.defined(ne)) return ne
      ne = !1
      const e = document.body
      if ('function' == typeof e.requestFullscreen)
        return (
          (re.requestFullscreen = 'requestFullscreen'),
          (re.exitFullscreen = 'exitFullscreen'),
          (re.fullscreenEnabled = 'fullscreenEnabled'),
          (re.fullscreenElement = 'fullscreenElement'),
          (re.fullscreenchange = 'fullscreenchange'),
          (re.fullscreenerror = 'fullscreenerror'),
          (ne = !0),
          ne
        )
      const t = ['webkit', 'moz', 'o', 'ms', 'khtml']
      let n
      for (let r = 0, o = t.length; r < o; ++r) {
        const o = t[r]
        ;(n = `${o}RequestFullscreen`),
          'function' == typeof e[n]
            ? ((re.requestFullscreen = n), (ne = !0))
            : ((n = `${o}RequestFullScreen`), 'function' == typeof e[n] && ((re.requestFullscreen = n), (ne = !0))),
          (n = `${o}ExitFullscreen`),
          'function' == typeof document[n]
            ? (re.exitFullscreen = n)
            : ((n = `${o}CancelFullScreen`), 'function' == typeof document[n] && (re.exitFullscreen = n)),
          (n = `${o}FullscreenEnabled`),
          void 0 !== document[n] ? (re.fullscreenEnabled = n) : ((n = `${o}FullScreenEnabled`), void 0 !== document[n] && (re.fullscreenEnabled = n)),
          (n = `${o}FullscreenElement`),
          void 0 !== document[n] ? (re.fullscreenElement = n) : ((n = `${o}FullScreenElement`), void 0 !== document[n] && (re.fullscreenElement = n)),
          (n = `${o}fullscreenchange`),
          void 0 !== document[`on${n}`] && ('ms' === o && (n = 'MSFullscreenChange'), (re.fullscreenchange = n)),
          (n = `${o}fullscreenerror`),
          void 0 !== document[`on${n}`] && ('ms' === o && (n = 'MSFullscreenError'), (re.fullscreenerror = n))
      }
      return ne
    }),
    (oe.requestFullscreen = function (e, t) {
      oe.supportsFullscreen() && e[re.requestFullscreen]({ vrDisplay: t })
    }),
    (oe.exitFullscreen = function () {
      oe.supportsFullscreen() && document[re.exitFullscreen]()
    }),
    (oe._names = re)
  var ie = oe
  let se, ae, ue, ce, le, de, fe, pe, he, me, ge, ye, ve, we, Ce, _e, be, xe
  function Se(e) {
    const t = e.split('.')
    for (let e = 0, n = t.length; e < n; ++e) t[e] = parseInt(t[e], 10)
    return t
  }
  function Ae() {
    if (!r.defined(ae) && ((ae = !1), !Pe())) {
      const e = / Chrome\/([\.0-9]+)/.exec(se.userAgent)
      null !== e && ((ae = !0), (ue = Se(e[1])))
    }
    return ae
  }
  function Ee() {
    if (!r.defined(ce) && ((ce = !1), !Ae() && !Pe() && / Safari\/[\.0-9]+/.test(se.userAgent))) {
      const e = / Version\/([\.0-9]+)/.exec(se.userAgent)
      null !== e && ((ce = !0), (le = Se(e[1])))
    }
    return ce
  }
  function Oe() {
    if (!r.defined(de)) {
      de = !1
      const e = / AppleWebKit\/([\.0-9]+)(\+?)/.exec(se.userAgent)
      null !== e && ((de = !0), (fe = Se(e[1])), (fe.isNightly = !!e[2]))
    }
    return de
  }
  function Ie() {
    if (!r.defined(pe)) {
      let e
      ;(pe = !1),
        'Microsoft Internet Explorer' === se.appName
          ? ((e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(se.userAgent)), null !== e && ((pe = !0), (he = Se(e[1]))))
          : 'Netscape' === se.appName && ((e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(se.userAgent)), null !== e && ((pe = !0), (he = Se(e[1]))))
    }
    return pe
  }
  function Pe() {
    if (!r.defined(me)) {
      me = !1
      const e = / Edg\/([\.0-9]+)/.exec(se.userAgent)
      null !== e && ((me = !0), (ge = Se(e[1])))
    }
    return me
  }
  function Re() {
    if (!r.defined(ye)) {
      ye = !1
      const e = /Firefox\/([\.0-9]+)/.exec(se.userAgent)
      null !== e && ((ye = !0), (ve = Se(e[1])))
    }
    return ye
  }
  function Te() {
    if (!r.defined(xe)) {
      const e = document.createElement('canvas')
      e.setAttribute('style', 'image-rendering: -moz-crisp-edges;image-rendering: pixelated;')
      const t = e.style.imageRendering
      ;(xe = r.defined(t) && '' !== t), xe && (be = t)
    }
    return xe
  }
  function qe() {
    return qe._result
  }
  ;(se = 'undefined' != typeof navigator ? navigator : {}),
    (qe._promise = void 0),
    (qe._result = void 0),
    (qe.initialize = function () {
      return (
        r.defined(qe._promise) ||
          (qe._promise = new Promise(e => {
            const t = new Image()
            ;(t.onload = function () {
              ;(qe._result = t.width > 0 && t.height > 0), e(qe._result)
            }),
              (t.onerror = function () {
                ;(qe._result = !1), e(qe._result)
              }),
              (t.src = 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA')
          })),
        qe._promise
      )
    }),
    Object.defineProperties(qe, {
      initialized: {
        get: function () {
          return r.defined(qe._result)
        }
      }
    })
  const ze = []
  'undefined' != typeof ArrayBuffer &&
    (ze.push(Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array),
    'undefined' != typeof Uint8ClampedArray && ze.push(Uint8ClampedArray),
    'undefined' != typeof Uint8ClampedArray && ze.push(Uint8ClampedArray),
    'undefined' != typeof BigInt64Array && ze.push(BigInt64Array),
    'undefined' != typeof BigUint64Array && ze.push(BigUint64Array))
  const Me = {
    isChrome: Ae,
    chromeVersion: function () {
      return Ae() && ue
    },
    isSafari: Ee,
    safariVersion: function () {
      return Ee() && le
    },
    isWebkit: Oe,
    webkitVersion: function () {
      return Oe() && fe
    },
    isInternetExplorer: Ie,
    internetExplorerVersion: function () {
      return Ie() && he
    },
    isEdge: Pe,
    edgeVersion: function () {
      return Pe() && ge
    },
    isFirefox: Re,
    firefoxVersion: function () {
      return Re() && ve
    },
    isWindows: function () {
      return r.defined(we) || (we = /Windows/i.test(se.appVersion)), we
    },
    isIPadOrIOS: function () {
      return r.defined(Ce) || (Ce = 'iPhone' === navigator.platform || 'iPod' === navigator.platform || 'iPad' === navigator.platform), Ce
    },
    hardwareConcurrency: r.defaultValue(se.hardwareConcurrency, 3),
    supportsPointerEvents: function () {
      return r.defined(_e) || (_e = !Re() && 'undefined' != typeof PointerEvent && (!r.defined(se.pointerEnabled) || se.pointerEnabled)), _e
    },
    supportsImageRenderingPixelated: Te,
    supportsWebP: qe,
    imageRenderingValue: function () {
      return Te() ? be : void 0
    },
    typedArrayTypes: ze,
    supportsBasis: function (e) {
      return Me.supportsWebAssembly() && e.context.supportsBasis
    },
    supportsFullscreen: function () {
      return ie.supportsFullscreen()
    },
    supportsTypedArrays: function () {
      return 'undefined' != typeof ArrayBuffer
    },
    supportsBigInt64Array: function () {
      return 'undefined' != typeof BigInt64Array
    },
    supportsBigUint64Array: function () {
      return 'undefined' != typeof BigUint64Array
    },
    supportsBigInt: function () {
      return 'undefined' != typeof BigInt
    },
    supportsWebWorkers: function () {
      return 'undefined' != typeof Worker
    },
    supportsWebAssembly: function () {
      return 'undefined' != typeof WebAssembly
    },
    supportsWebgl2: function (e) {
      return e.context.webgl2
    }
  }
  var De = Me
  function Ue(e, t, n, o) {
    ;(this.x = r.defaultValue(e, 0)), (this.y = r.defaultValue(t, 0)), (this.z = r.defaultValue(n, 0)), (this.w = r.defaultValue(o, 0))
  }
  let ke = new n.Cartesian3()
  Ue.fromAxisAngle = function (e, t, o) {
    const i = t / 2,
      s = Math.sin(i)
    ke = n.Cartesian3.normalize(e, ke)
    const a = ke.x * s,
      u = ke.y * s,
      c = ke.z * s,
      l = Math.cos(i)
    return r.defined(o) ? ((o.x = a), (o.y = u), (o.z = c), (o.w = l), o) : new Ue(a, u, c, l)
  }
  const Fe = [1, 2, 0],
    Ne = new Array(3)
  Ue.fromRotationMatrix = function (e, t) {
    let o, i, s, a, u
    const c = e[n.Matrix3.COLUMN0ROW0],
      l = e[n.Matrix3.COLUMN1ROW1],
      d = e[n.Matrix3.COLUMN2ROW2],
      f = c + l + d
    if (f > 0)
      (o = Math.sqrt(f + 1)),
        (u = 0.5 * o),
        (o = 0.5 / o),
        (i = (e[n.Matrix3.COLUMN1ROW2] - e[n.Matrix3.COLUMN2ROW1]) * o),
        (s = (e[n.Matrix3.COLUMN2ROW0] - e[n.Matrix3.COLUMN0ROW2]) * o),
        (a = (e[n.Matrix3.COLUMN0ROW1] - e[n.Matrix3.COLUMN1ROW0]) * o)
    else {
      const t = Fe
      let r = 0
      l > c && (r = 1), d > c && d > l && (r = 2)
      const f = t[r],
        p = t[f]
      o = Math.sqrt(e[n.Matrix3.getElementIndex(r, r)] - e[n.Matrix3.getElementIndex(f, f)] - e[n.Matrix3.getElementIndex(p, p)] + 1)
      const h = Ne
      ;(h[r] = 0.5 * o),
        (o = 0.5 / o),
        (u = (e[n.Matrix3.getElementIndex(p, f)] - e[n.Matrix3.getElementIndex(f, p)]) * o),
        (h[f] = (e[n.Matrix3.getElementIndex(f, r)] + e[n.Matrix3.getElementIndex(r, f)]) * o),
        (h[p] = (e[n.Matrix3.getElementIndex(p, r)] + e[n.Matrix3.getElementIndex(r, p)]) * o),
        (i = -h[0]),
        (s = -h[1]),
        (a = -h[2])
    }
    return r.defined(t) ? ((t.x = i), (t.y = s), (t.z = a), (t.w = u), t) : new Ue(i, s, a, u)
  }
  const je = new Ue()
  let Be = new Ue(),
    Ve = new Ue(),
    $e = new Ue()
  Ue.fromHeadingPitchRoll = function (e, t) {
    return (
      ($e = Ue.fromAxisAngle(n.Cartesian3.UNIT_X, e.roll, je)),
      (Ve = Ue.fromAxisAngle(n.Cartesian3.UNIT_Y, -e.pitch, t)),
      (t = Ue.multiply(Ve, $e, Ve)),
      (Be = Ue.fromAxisAngle(n.Cartesian3.UNIT_Z, -e.heading, je)),
      Ue.multiply(Be, t, t)
    )
  }
  const Le = new n.Cartesian3(),
    Qe = new n.Cartesian3(),
    We = new Ue(),
    He = new Ue(),
    Ye = new Ue()
  ;(Ue.packedLength = 4),
    (Ue.pack = function (e, t, n) {
      return (n = r.defaultValue(n, 0)), (t[n++] = e.x), (t[n++] = e.y), (t[n++] = e.z), (t[n] = e.w), t
    }),
    (Ue.unpack = function (e, t, n) {
      return (t = r.defaultValue(t, 0)), r.defined(n) || (n = new Ue()), (n.x = e[t]), (n.y = e[t + 1]), (n.z = e[t + 2]), (n.w = e[t + 3]), n
    }),
    (Ue.packedInterpolationLength = 3),
    (Ue.convertPackedArrayForInterpolation = function (e, t, n, o) {
      Ue.unpack(e, 4 * n, Ye), Ue.conjugate(Ye, Ye)
      for (let i = 0, s = n - t + 1; i < s; i++) {
        const n = 3 * i
        Ue.unpack(e, 4 * (t + i), We), Ue.multiply(We, Ye, We), We.w < 0 && Ue.negate(We, We), Ue.computeAxis(We, Le)
        const s = Ue.computeAngle(We)
        r.defined(o) || (o = []), (o[n] = Le.x * s), (o[n + 1] = Le.y * s), (o[n + 2] = Le.z * s)
      }
    }),
    (Ue.unpackInterpolationResult = function (e, t, o, i, s) {
      r.defined(s) || (s = new Ue()), n.Cartesian3.fromArray(e, 0, Qe)
      const a = n.Cartesian3.magnitude(Qe)
      return Ue.unpack(t, 4 * i, He), 0 === a ? Ue.clone(Ue.IDENTITY, We) : Ue.fromAxisAngle(Qe, a, We), Ue.multiply(We, He, s)
    }),
    (Ue.clone = function (e, t) {
      if (r.defined(e)) return r.defined(t) ? ((t.x = e.x), (t.y = e.y), (t.z = e.z), (t.w = e.w), t) : new Ue(e.x, e.y, e.z, e.w)
    }),
    (Ue.conjugate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = e.w), t
    }),
    (Ue.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z + e.w * e.w
    }),
    (Ue.magnitude = function (e) {
      return Math.sqrt(Ue.magnitudeSquared(e))
    }),
    (Ue.normalize = function (e, t) {
      const n = 1 / Ue.magnitude(e),
        r = e.x * n,
        o = e.y * n,
        i = e.z * n,
        s = e.w * n
      return (t.x = r), (t.y = o), (t.z = i), (t.w = s), t
    }),
    (Ue.inverse = function (e, t) {
      const n = Ue.magnitudeSquared(e)
      return (t = Ue.conjugate(e, t)), Ue.multiplyByScalar(t, 1 / n, t)
    }),
    (Ue.add = function (e, t, n) {
      return (n.x = e.x + t.x), (n.y = e.y + t.y), (n.z = e.z + t.z), (n.w = e.w + t.w), n
    }),
    (Ue.subtract = function (e, t, n) {
      return (n.x = e.x - t.x), (n.y = e.y - t.y), (n.z = e.z - t.z), (n.w = e.w - t.w), n
    }),
    (Ue.negate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), (t.w = -e.w), t
    }),
    (Ue.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z + e.w * t.w
    }),
    (Ue.multiply = function (e, t, n) {
      const r = e.x,
        o = e.y,
        i = e.z,
        s = e.w,
        a = t.x,
        u = t.y,
        c = t.z,
        l = t.w,
        d = s * a + r * l + o * c - i * u,
        f = s * u - r * c + o * l + i * a,
        p = s * c + r * u - o * a + i * l,
        h = s * l - r * a - o * u - i * c
      return (n.x = d), (n.y = f), (n.z = p), (n.w = h), n
    }),
    (Ue.multiplyByScalar = function (e, t, n) {
      return (n.x = e.x * t), (n.y = e.y * t), (n.z = e.z * t), (n.w = e.w * t), n
    }),
    (Ue.divideByScalar = function (e, t, n) {
      return (n.x = e.x / t), (n.y = e.y / t), (n.z = e.z / t), (n.w = e.w / t), n
    }),
    (Ue.computeAxis = function (e, t) {
      const n = e.w
      if (Math.abs(n - 1) < o.CesiumMath.EPSILON6) return (t.x = t.y = t.z = 0), t
      const r = 1 / Math.sqrt(1 - n * n)
      return (t.x = e.x * r), (t.y = e.y * r), (t.z = e.z * r), t
    }),
    (Ue.computeAngle = function (e) {
      return Math.abs(e.w - 1) < o.CesiumMath.EPSILON6 ? 0 : 2 * Math.acos(e.w)
    })
  let Ze = new Ue()
  Ue.lerp = function (e, t, n, r) {
    return (Ze = Ue.multiplyByScalar(t, n, Ze)), (r = Ue.multiplyByScalar(e, 1 - n, r)), Ue.add(Ze, r, r)
  }
  let Je = new Ue(),
    Xe = new Ue(),
    Ge = new Ue()
  ;(Ue.slerp = function (e, t, n, r) {
    let i = Ue.dot(e, t),
      s = t
    if ((i < 0 && ((i = -i), (s = Je = Ue.negate(t, Je))), 1 - i < o.CesiumMath.EPSILON6)) return Ue.lerp(e, s, n, r)
    const a = Math.acos(i)
    return (
      (Xe = Ue.multiplyByScalar(e, Math.sin((1 - n) * a), Xe)),
      (Ge = Ue.multiplyByScalar(s, Math.sin(n * a), Ge)),
      (r = Ue.add(Xe, Ge, r)),
      Ue.multiplyByScalar(r, 1 / Math.sin(a), r)
    )
  }),
    (Ue.log = function (e, t) {
      const r = o.CesiumMath.acosClamped(e.w)
      let i = 0
      return 0 !== r && (i = r / Math.sin(r)), n.Cartesian3.multiplyByScalar(e, i, t)
    }),
    (Ue.exp = function (e, t) {
      const r = n.Cartesian3.magnitude(e)
      let o = 0
      return 0 !== r && (o = Math.sin(r) / r), (t.x = e.x * o), (t.y = e.y * o), (t.z = e.z * o), (t.w = Math.cos(r)), t
    })
  const Ke = new n.Cartesian3(),
    et = new n.Cartesian3(),
    tt = new Ue(),
    nt = new Ue()
  ;(Ue.computeInnerQuadrangle = function (e, t, r, o) {
    const i = Ue.conjugate(t, tt)
    Ue.multiply(i, r, nt)
    const s = Ue.log(nt, Ke)
    Ue.multiply(i, e, nt)
    const a = Ue.log(nt, et)
    return n.Cartesian3.add(s, a, s), n.Cartesian3.multiplyByScalar(s, 0.25, s), n.Cartesian3.negate(s, s), Ue.exp(s, tt), Ue.multiply(t, tt, o)
  }),
    (Ue.squad = function (e, t, n, r, o, i) {
      const s = Ue.slerp(e, t, o, tt),
        a = Ue.slerp(n, r, o, nt)
      return Ue.slerp(s, a, 2 * o * (1 - o), i)
    })
  const rt = new Ue(),
    ot = 1.9011074535173003,
    it = De.supportsTypedArrays() ? new Float32Array(8) : [],
    st = De.supportsTypedArrays() ? new Float32Array(8) : [],
    at = De.supportsTypedArrays() ? new Float32Array(8) : [],
    ut = De.supportsTypedArrays() ? new Float32Array(8) : []
  for (let e = 0; e < 7; ++e) {
    const t = e + 1,
      n = 2 * t + 1
    ;(it[e] = 1 / (t * n)), (st[e] = t / n)
  }
  function ct(e, t, n) {
    let r,
      o,
      i = 0,
      s = e.length - 1
    for (; i <= s; )
      if (((r = ~~((i + s) / 2)), (o = n(e[r], t)), o < 0)) i = r + 1
      else {
        if (!(o > 0)) return r
        s = r - 1
      }
    return ~(s + 1)
  }
  function lt(e, t, n, r, o) {
    ;(this.xPoleWander = e), (this.yPoleWander = t), (this.xPoleOffset = n), (this.yPoleOffset = r), (this.ut1MinusUtc = o)
  }
  function dt(e, t, n, r, o, i, s, a) {
    ;(this.year = e),
      (this.month = t),
      (this.day = n),
      (this.hour = r),
      (this.minute = o),
      (this.second = i),
      (this.millisecond = s),
      (this.isLeapSecond = a)
  }
  function ft(e) {
    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0
  }
  function pt(e, t) {
    ;(this.julianDate = e), (this.offset = t)
  }
  ;(it[7] = ot / 136),
    (st[7] = (8 * ot) / 17),
    (Ue.fastSlerp = function (e, t, n, r) {
      let o,
        i = Ue.dot(e, t)
      i >= 0 ? (o = 1) : ((o = -1), (i = -i))
      const s = i - 1,
        a = 1 - n,
        u = n * n,
        c = a * a
      for (let e = 7; e >= 0; --e) (at[e] = (it[e] * u - st[e]) * s), (ut[e] = (it[e] * c - st[e]) * s)
      const l = o * n * (1 + at[0] * (1 + at[1] * (1 + at[2] * (1 + at[3] * (1 + at[4] * (1 + at[5] * (1 + at[6] * (1 + at[7])))))))),
        d = a * (1 + ut[0] * (1 + ut[1] * (1 + ut[2] * (1 + ut[3] * (1 + ut[4] * (1 + ut[5] * (1 + ut[6] * (1 + ut[7])))))))),
        f = Ue.multiplyByScalar(e, d, rt)
      return Ue.multiplyByScalar(t, l, r), Ue.add(f, r, r)
    }),
    (Ue.fastSquad = function (e, t, n, r, o, i) {
      const s = Ue.fastSlerp(e, t, o, tt),
        a = Ue.fastSlerp(n, r, o, nt)
      return Ue.fastSlerp(s, a, 2 * o * (1 - o), i)
    }),
    (Ue.equals = function (e, t) {
      return e === t || (r.defined(e) && r.defined(t) && e.x === t.x && e.y === t.y && e.z === t.z && e.w === t.w)
    }),
    (Ue.equalsEpsilon = function (e, t, n) {
      return (
        (n = r.defaultValue(n, 0)),
        e === t ||
          (r.defined(e) &&
            r.defined(t) &&
            Math.abs(e.x - t.x) <= n &&
            Math.abs(e.y - t.y) <= n &&
            Math.abs(e.z - t.z) <= n &&
            Math.abs(e.w - t.w) <= n)
      )
    }),
    (Ue.ZERO = Object.freeze(new Ue(0, 0, 0, 0))),
    (Ue.IDENTITY = Object.freeze(new Ue(0, 0, 0, 1))),
    (Ue.prototype.clone = function (e) {
      return Ue.clone(this, e)
    }),
    (Ue.prototype.equals = function (e) {
      return Ue.equals(this, e)
    }),
    (Ue.prototype.equalsEpsilon = function (e, t) {
      return Ue.equalsEpsilon(this, e, t)
    }),
    (Ue.prototype.toString = function () {
      return `(${this.x}, ${this.y}, ${this.z}, ${this.w})`
    })
  var ht = Object.freeze({
    SECONDS_PER_MILLISECOND: 0.001,
    SECONDS_PER_MINUTE: 60,
    MINUTES_PER_HOUR: 60,
    HOURS_PER_DAY: 24,
    SECONDS_PER_HOUR: 3600,
    MINUTES_PER_DAY: 1440,
    SECONDS_PER_DAY: 86400,
    DAYS_PER_JULIAN_CENTURY: 36525,
    PICOSECOND: 1e-9,
    MODIFIED_JULIAN_DATE_DIFFERENCE: 2400000.5
  })
  var mt = Object.freeze({ UTC: 0, TAI: 1 })
  const gt = new dt(),
    yt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  function vt(e, t) {
    return zt.compare(e.julianDate, t.julianDate)
  }
  const wt = new pt()
  function Ct(e) {
    wt.julianDate = e
    const t = zt.leapSeconds
    let n = ct(t, wt, vt)
    n < 0 && (n = ~n), n >= t.length && (n = t.length - 1)
    let r = t[n].offset
    if (n > 0) {
      zt.secondsDifference(t[n].julianDate, e) > r && (n--, (r = t[n].offset))
    }
    zt.addSeconds(e, r, e)
  }
  function _t(e, t) {
    wt.julianDate = e
    const n = zt.leapSeconds
    let r = ct(n, wt, vt)
    if ((r < 0 && (r = ~r), 0 === r)) return zt.addSeconds(e, -n[0].offset, t)
    if (r >= n.length) return zt.addSeconds(e, -n[r - 1].offset, t)
    const o = zt.secondsDifference(n[r].julianDate, e)
    return 0 === o ? zt.addSeconds(e, -n[r].offset, t) : o <= 1 ? void 0 : zt.addSeconds(e, -n[--r].offset, t)
  }
  function bt(e, t, n) {
    const r = (t / ht.SECONDS_PER_DAY) | 0
    return (e += r), (t -= ht.SECONDS_PER_DAY * r) < 0 && (e--, (t += ht.SECONDS_PER_DAY)), (n.dayNumber = e), (n.secondsOfDay = t), n
  }
  function xt(e, t, n, r, o, i, s) {
    const a = ((t - 14) / 12) | 0,
      u = e + 4800 + a
    let c = (((1461 * u) / 4) | 0) + (((367 * (t - 2 - 12 * a)) / 12) | 0) - (((3 * (((u + 100) / 100) | 0)) / 4) | 0) + n - 32075
    ;(r -= 12) < 0 && (r += 24)
    const l = i + (r * ht.SECONDS_PER_HOUR + o * ht.SECONDS_PER_MINUTE + s * ht.SECONDS_PER_MILLISECOND)
    return l >= 43200 && (c -= 1), [c, l]
  }
  const St = /^(\d{4})$/,
    At = /^(\d{4})-(\d{2})$/,
    Et = /^(\d{4})-?(\d{3})$/,
    Ot = /^(\d{4})-?W(\d{2})-?(\d{1})?$/,
    It = /^(\d{4})-?(\d{2})-?(\d{2})$/,
    Pt = /([Z+\-])?(\d{2})?:?(\d{2})?$/,
    Rt = /^(\d{2})(\.\d+)?/.source + Pt.source,
    Tt = /^(\d{2}):?(\d{2})(\.\d+)?/.source + Pt.source,
    qt = /^(\d{2}):?(\d{2}):?(\d{2})(\.\d+)?/.source + Pt.source
  function zt(e, t, n) {
    ;(this.dayNumber = void 0), (this.secondsOfDay = void 0), (e = r.defaultValue(e, 0)), (t = r.defaultValue(t, 0)), (n = r.defaultValue(n, mt.UTC))
    const o = 0 | e
    bt(o, (t += (e - o) * ht.SECONDS_PER_DAY), this), n === mt.UTC && Ct(this)
  }
  ;(zt.fromGregorianDate = function (e, t) {
    const n = xt(e.year, e.month, e.day, e.hour, e.minute, e.second, e.millisecond)
    return r.defined(t) ? (bt(n[0], n[1], t), Ct(t), t) : new zt(n[0], n[1], mt.UTC)
  }),
    (zt.fromDate = function (e, t) {
      const n = xt(
        e.getUTCFullYear(),
        e.getUTCMonth() + 1,
        e.getUTCDate(),
        e.getUTCHours(),
        e.getUTCMinutes(),
        e.getUTCSeconds(),
        e.getUTCMilliseconds()
      )
      return r.defined(t) ? (bt(n[0], n[1], t), Ct(t), t) : new zt(n[0], n[1], mt.UTC)
    }),
    (zt.fromIso8601 = function (e, t) {
      let n,
        o = (e = e.replace(',', '.')).split('T'),
        i = 1,
        s = 1,
        a = 0,
        u = 0,
        c = 0,
        l = 0
      const d = o[0],
        f = o[1]
      let p, h, m
      if (((o = d.match(It)), null !== o)) (n = +o[1]), (i = +o[2]), (s = +o[3])
      else if (((o = d.match(At)), null !== o)) (n = +o[1]), (i = +o[2])
      else if (((o = d.match(St)), null !== o)) n = +o[1]
      else {
        let e
        if (((o = d.match(Et)), null !== o)) (n = +o[1]), (e = +o[2]), (h = ft(n))
        else if (((o = d.match(Ot)), null !== o)) {
          n = +o[1]
          e = 7 * +o[2] + (+o[3] || 0) - new Date(Date.UTC(n, 0, 4)).getUTCDay() - 3
        }
        ;(p = new Date(Date.UTC(n, 0, 1))), p.setUTCDate(e), (i = p.getUTCMonth() + 1), (s = p.getUTCDate())
      }
      if (((h = ft(n)), r.defined(f))) {
        ;(o = f.match(qt)),
          null !== o
            ? ((a = +o[1]), (u = +o[2]), (c = +o[3]), (l = 1e3 * +(o[4] || 0)), (m = 5))
            : ((o = f.match(Tt)),
              null !== o
                ? ((a = +o[1]), (u = +o[2]), (c = 60 * +(o[3] || 0)), (m = 4))
                : ((o = f.match(Rt)), null !== o && ((a = +o[1]), (u = 60 * +(o[2] || 0)), (m = 3))))
        const e = o[m],
          t = +o[m + 1],
          r = +(o[m + 2] || 0)
        switch (e) {
          case '+':
            ;(a -= t), (u -= r)
            break
          case '-':
            ;(a += t), (u += r)
            break
          case 'Z':
            break
          default:
            u += new Date(Date.UTC(n, i - 1, s, a, u)).getTimezoneOffset()
        }
      }
      const g = 60 === c
      for (g && c--; u >= 60; ) (u -= 60), a++
      for (; a >= 24; ) (a -= 24), s++
      for (p = h && 2 === i ? 29 : yt[i - 1]; s > p; ) (s -= p), i++, i > 12 && ((i -= 12), n++), (p = h && 2 === i ? 29 : yt[i - 1])
      for (; u < 0; ) (u += 60), a--
      for (; a < 0; ) (a += 24), s--
      for (; s < 1; ) i--, i < 1 && ((i += 12), n--), (p = h && 2 === i ? 29 : yt[i - 1]), (s += p)
      const y = xt(n, i, s, a, u, c, l)
      return r.defined(t) ? (bt(y[0], y[1], t), Ct(t)) : (t = new zt(y[0], y[1], mt.UTC)), g && zt.addSeconds(t, 1, t), t
    }),
    (zt.now = function (e) {
      return zt.fromDate(new Date(), e)
    })
  const Mt = new zt(0, 0, mt.TAI)
  ;(zt.toGregorianDate = function (e, t) {
    let n = !1,
      o = _t(e, Mt)
    r.defined(o) || (zt.addSeconds(e, -1, Mt), (o = _t(Mt, Mt)), (n = !0))
    let i = o.dayNumber
    const s = o.secondsOfDay
    s >= 43200 && (i += 1)
    let a = (i + 68569) | 0
    const u = ((4 * a) / 146097) | 0
    a = (a - (((146097 * u + 3) / 4) | 0)) | 0
    const c = ((4e3 * (a + 1)) / 1461001) | 0
    a = (a - (((1461 * c) / 4) | 0) + 31) | 0
    const l = ((80 * a) / 2447) | 0,
      d = (a - (((2447 * l) / 80) | 0)) | 0
    a = (l / 11) | 0
    const f = (l + 2 - 12 * a) | 0,
      p = (100 * (u - 49) + c + a) | 0
    let h = (s / ht.SECONDS_PER_HOUR) | 0,
      m = s - h * ht.SECONDS_PER_HOUR
    const g = (m / ht.SECONDS_PER_MINUTE) | 0
    m -= g * ht.SECONDS_PER_MINUTE
    let y = 0 | m
    const v = (m - y) / ht.SECONDS_PER_MILLISECOND
    return (
      (h += 12),
      h > 23 && (h -= 24),
      n && (y += 1),
      r.defined(t)
        ? ((t.year = p), (t.month = f), (t.day = d), (t.hour = h), (t.minute = g), (t.second = y), (t.millisecond = v), (t.isLeapSecond = n), t)
        : new dt(p, f, d, h, g, y, v, n)
    )
  }),
    (zt.toDate = function (e) {
      const t = zt.toGregorianDate(e, gt)
      let n = t.second
      return t.isLeapSecond && (n -= 1), new Date(Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, n, t.millisecond))
    }),
    (zt.toIso8601 = function (e, t) {
      const n = zt.toGregorianDate(e, gt)
      let o = n.year,
        i = n.month,
        s = n.day,
        a = n.hour
      const u = n.minute,
        c = n.second,
        l = n.millisecond
      let d
      return (
        1e4 === o && 1 === i && 1 === s && 0 === a && 0 === u && 0 === c && 0 === l && ((o = 9999), (i = 12), (s = 31), (a = 24)),
        r.defined(t) || 0 === l
          ? r.defined(t) && 0 !== t
            ? ((d = (0.01 * l).toFixed(t).replace('.', '').slice(0, t)),
              `${o.toString().padStart(4, '0')}-${i.toString().padStart(2, '0')}-${s.toString().padStart(2, '0')}T${a.toString().padStart(2, '0')}:${u
                .toString()
                .padStart(2, '0')}:${c.toString().padStart(2, '0')}.${d}Z`)
            : `${o.toString().padStart(4, '0')}-${i.toString().padStart(2, '0')}-${s.toString().padStart(2, '0')}T${a.toString().padStart(2, '0')}:${u
                .toString()
                .padStart(2, '0')}:${c.toString().padStart(2, '0')}Z`
          : ((d = (0.01 * l).toString().replace('.', '')),
            `${o.toString().padStart(4, '0')}-${i.toString().padStart(2, '0')}-${s.toString().padStart(2, '0')}T${a.toString().padStart(2, '0')}:${u
              .toString()
              .padStart(2, '0')}:${c.toString().padStart(2, '0')}.${d}Z`)
      )
    }),
    (zt.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t) ? ((t.dayNumber = e.dayNumber), (t.secondsOfDay = e.secondsOfDay), t) : new zt(e.dayNumber, e.secondsOfDay, mt.TAI)
    }),
    (zt.compare = function (e, t) {
      const n = e.dayNumber - t.dayNumber
      return 0 !== n ? n : e.secondsOfDay - t.secondsOfDay
    }),
    (zt.equals = function (e, t) {
      return e === t || (r.defined(e) && r.defined(t) && e.dayNumber === t.dayNumber && e.secondsOfDay === t.secondsOfDay)
    }),
    (zt.equalsEpsilon = function (e, t, n) {
      return (n = r.defaultValue(n, 0)), e === t || (r.defined(e) && r.defined(t) && Math.abs(zt.secondsDifference(e, t)) <= n)
    }),
    (zt.totalDays = function (e) {
      return e.dayNumber + e.secondsOfDay / ht.SECONDS_PER_DAY
    }),
    (zt.secondsDifference = function (e, t) {
      return (e.dayNumber - t.dayNumber) * ht.SECONDS_PER_DAY + (e.secondsOfDay - t.secondsOfDay)
    }),
    (zt.daysDifference = function (e, t) {
      return e.dayNumber - t.dayNumber + (e.secondsOfDay - t.secondsOfDay) / ht.SECONDS_PER_DAY
    }),
    (zt.computeTaiMinusUtc = function (e) {
      wt.julianDate = e
      const t = zt.leapSeconds
      let n = ct(t, wt, vt)
      return n < 0 && ((n = ~n), --n, n < 0 && (n = 0)), t[n].offset
    }),
    (zt.addSeconds = function (e, t, n) {
      return bt(e.dayNumber, e.secondsOfDay + t, n)
    }),
    (zt.addMinutes = function (e, t, n) {
      const r = e.secondsOfDay + t * ht.SECONDS_PER_MINUTE
      return bt(e.dayNumber, r, n)
    }),
    (zt.addHours = function (e, t, n) {
      const r = e.secondsOfDay + t * ht.SECONDS_PER_HOUR
      return bt(e.dayNumber, r, n)
    }),
    (zt.addDays = function (e, t, n) {
      return bt(e.dayNumber + t, e.secondsOfDay, n)
    }),
    (zt.lessThan = function (e, t) {
      return zt.compare(e, t) < 0
    }),
    (zt.lessThanOrEquals = function (e, t) {
      return zt.compare(e, t) <= 0
    }),
    (zt.greaterThan = function (e, t) {
      return zt.compare(e, t) > 0
    }),
    (zt.greaterThanOrEquals = function (e, t) {
      return zt.compare(e, t) >= 0
    }),
    (zt.prototype.clone = function (e) {
      return zt.clone(this, e)
    }),
    (zt.prototype.equals = function (e) {
      return zt.equals(this, e)
    }),
    (zt.prototype.equalsEpsilon = function (e, t) {
      return zt.equalsEpsilon(this, e, t)
    }),
    (zt.prototype.toString = function () {
      return zt.toIso8601(this)
    }),
    (zt.leapSeconds = [
      new pt(new zt(2441317, 43210, mt.TAI), 10),
      new pt(new zt(2441499, 43211, mt.TAI), 11),
      new pt(new zt(2441683, 43212, mt.TAI), 12),
      new pt(new zt(2442048, 43213, mt.TAI), 13),
      new pt(new zt(2442413, 43214, mt.TAI), 14),
      new pt(new zt(2442778, 43215, mt.TAI), 15),
      new pt(new zt(2443144, 43216, mt.TAI), 16),
      new pt(new zt(2443509, 43217, mt.TAI), 17),
      new pt(new zt(2443874, 43218, mt.TAI), 18),
      new pt(new zt(2444239, 43219, mt.TAI), 19),
      new pt(new zt(2444786, 43220, mt.TAI), 20),
      new pt(new zt(2445151, 43221, mt.TAI), 21),
      new pt(new zt(2445516, 43222, mt.TAI), 22),
      new pt(new zt(2446247, 43223, mt.TAI), 23),
      new pt(new zt(2447161, 43224, mt.TAI), 24),
      new pt(new zt(2447892, 43225, mt.TAI), 25),
      new pt(new zt(2448257, 43226, mt.TAI), 26),
      new pt(new zt(2448804, 43227, mt.TAI), 27),
      new pt(new zt(2449169, 43228, mt.TAI), 28),
      new pt(new zt(2449534, 43229, mt.TAI), 29),
      new pt(new zt(2450083, 43230, mt.TAI), 30),
      new pt(new zt(2450630, 43231, mt.TAI), 31),
      new pt(new zt(2451179, 43232, mt.TAI), 32),
      new pt(new zt(2453736, 43233, mt.TAI), 33),
      new pt(new zt(2454832, 43234, mt.TAI), 34),
      new pt(new zt(2456109, 43235, mt.TAI), 35),
      new pt(new zt(2457204, 43236, mt.TAI), 36),
      new pt(new zt(2457754, 43237, mt.TAI), 37)
    ])
  var Dt,
    Ut = {},
    kt = {
      get exports() {
        return Ut
      },
      set exports(e) {
        Ut = e
      }
    },
    Ft = {},
    Nt = {
      get exports() {
        return Ft
      },
      set exports(e) {
        Ft = e
      }
    }
  var jt,
    Bt = {},
    Vt = {
      get exports() {
        return Bt
      },
      set exports(e) {
        Bt = e
      }
    }
  var $t,
    Lt,
    Qt,
    Wt,
    Ht = {},
    Yt = {
      get exports() {
        return Ht
      },
      set exports(e) {
        Ht = e
      }
    }
  ;(Qt = p),
    (Wt = function (e, t, n, r) {
      var o = r && r.URI
      function i(e, t) {
        var n = arguments.length >= 1
        if (!(this instanceof i)) return n ? (arguments.length >= 2 ? new i(e, t) : new i(e)) : new i()
        if (void 0 === e) {
          if (n) throw new TypeError('undefined is not a valid argument for URI')
          e = 'undefined' != typeof location ? location.href + '' : ''
        }
        if (null === e && n) throw new TypeError('null is not a valid argument for URI')
        return this.href(e), void 0 !== t ? this.absoluteTo(t) : this
      }
      i.version = '1.19.11'
      var s = i.prototype,
        a = Object.prototype.hasOwnProperty
      function u(e) {
        return e.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
      }
      function c(e) {
        return void 0 === e ? 'Undefined' : String(Object.prototype.toString.call(e)).slice(8, -1)
      }
      function l(e) {
        return 'Array' === c(e)
      }
      function d(e, t) {
        var n,
          r,
          o = {}
        if ('RegExp' === c(t)) o = null
        else if (l(t)) for (n = 0, r = t.length; n < r; n++) o[t[n]] = !0
        else o[t] = !0
        for (n = 0, r = e.length; n < r; n++) ((o && void 0 !== o[e[n]]) || (!o && t.test(e[n]))) && (e.splice(n, 1), r--, n--)
        return e
      }
      function f(e, t) {
        var n, r
        if (l(t)) {
          for (n = 0, r = t.length; n < r; n++) if (!f(e, t[n])) return !1
          return !0
        }
        var o = c(t)
        for (n = 0, r = e.length; n < r; n++)
          if ('RegExp' === o) {
            if ('string' == typeof e[n] && e[n].match(t)) return !0
          } else if (e[n] === t) return !0
        return !1
      }
      function p(e, t) {
        if (!l(e) || !l(t)) return !1
        if (e.length !== t.length) return !1
        e.sort(), t.sort()
        for (var n = 0, r = e.length; n < r; n++) if (e[n] !== t[n]) return !1
        return !0
      }
      function h(e) {
        return e.replace(/^\/+|\/+$/g, '')
      }
      function m(e) {
        return escape(e)
      }
      function g(e) {
        return encodeURIComponent(e)
          .replace(/[!'()*]/g, m)
          .replace(/\*/g, '%2A')
      }
      ;(i._parts = function () {
        return {
          protocol: null,
          username: null,
          password: null,
          hostname: null,
          urn: null,
          port: null,
          path: null,
          query: null,
          fragment: null,
          preventInvalidHostname: i.preventInvalidHostname,
          duplicateQueryParameters: i.duplicateQueryParameters,
          escapeQuerySpace: i.escapeQuerySpace
        }
      }),
        (i.preventInvalidHostname = !1),
        (i.duplicateQueryParameters = !1),
        (i.escapeQuerySpace = !0),
        (i.protocol_expression = /^[a-z][a-z0-9.+-]*$/i),
        (i.idn_expression = /[^a-z0-9\._-]/i),
        (i.punycode_expression = /(xn--)/i),
        (i.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/),
        (i.ip6_expression =
          /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/),
        (i.find_uri_expression =
          /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi),
        (i.findUri = {
          start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
          end: /[\s\r\n]|$/,
          trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
          parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g
        }),
        (i.leading_whitespace_expression = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/),
        (i.ascii_tab_whitespace = /[\u0009\u000A\u000D]+/g),
        (i.defaultPorts = { http: '80', https: '443', ftp: '21', gopher: '70', ws: '80', wss: '443' }),
        (i.hostProtocols = ['http', 'https']),
        (i.invalid_hostname_characters = /[^a-zA-Z0-9\.\-:_]/),
        (i.domAttributes = {
          a: 'href',
          blockquote: 'cite',
          link: 'href',
          base: 'href',
          script: 'src',
          form: 'action',
          img: 'src',
          area: 'href',
          iframe: 'src',
          embed: 'src',
          source: 'src',
          track: 'src',
          input: 'src',
          audio: 'src',
          video: 'src'
        }),
        (i.getDomAttribute = function (e) {
          if (e && e.nodeName) {
            var t = e.nodeName.toLowerCase()
            if ('input' !== t || 'image' === e.type) return i.domAttributes[t]
          }
        }),
        (i.encode = g),
        (i.decode = decodeURIComponent),
        (i.iso8859 = function () {
          ;(i.encode = escape), (i.decode = unescape)
        }),
        (i.unicode = function () {
          ;(i.encode = g), (i.decode = decodeURIComponent)
        }),
        (i.characters = {
          pathname: {
            encode: {
              expression: /%(24|26|2B|2C|3B|3D|3A|40)/gi,
              map: { '%24': '$', '%26': '&', '%2B': '+', '%2C': ',', '%3B': ';', '%3D': '=', '%3A': ':', '%40': '@' }
            },
            decode: { expression: /[\/\?#]/g, map: { '/': '%2F', '?': '%3F', '#': '%23' } }
          },
          reserved: {
            encode: {
              expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/gi,
              map: {
                '%3A': ':',
                '%2F': '/',
                '%3F': '?',
                '%23': '#',
                '%5B': '[',
                '%5D': ']',
                '%40': '@',
                '%21': '!',
                '%24': '$',
                '%26': '&',
                '%27': "'",
                '%28': '(',
                '%29': ')',
                '%2A': '*',
                '%2B': '+',
                '%2C': ',',
                '%3B': ';',
                '%3D': '='
              }
            }
          },
          urnpath: {
            encode: {
              expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/gi,
              map: {
                '%21': '!',
                '%24': '$',
                '%27': "'",
                '%28': '(',
                '%29': ')',
                '%2A': '*',
                '%2B': '+',
                '%2C': ',',
                '%3B': ';',
                '%3D': '=',
                '%40': '@'
              }
            },
            decode: { expression: /[\/\?#:]/g, map: { '/': '%2F', '?': '%3F', '#': '%23', ':': '%3A' } }
          }
        }),
        (i.encodeQuery = function (e, t) {
          var n = i.encode(e + '')
          return void 0 === t && (t = i.escapeQuerySpace), t ? n.replace(/%20/g, '+') : n
        }),
        (i.decodeQuery = function (e, t) {
          ;(e += ''), void 0 === t && (t = i.escapeQuerySpace)
          try {
            return i.decode(t ? e.replace(/\+/g, '%20') : e)
          } catch (t) {
            return e
          }
        })
      var y,
        v = { encode: 'encode', decode: 'decode' },
        w = function (e, t) {
          return function (n) {
            try {
              return i[t](n + '').replace(i.characters[e][t].expression, function (n) {
                return i.characters[e][t].map[n]
              })
            } catch (e) {
              return n
            }
          }
        }
      for (y in v) (i[y + 'PathSegment'] = w('pathname', v[y])), (i[y + 'UrnPathSegment'] = w('urnpath', v[y]))
      var C = function (e, t, n) {
        return function (r) {
          var o
          o = n
            ? function (e) {
                return i[t](i[n](e))
              }
            : i[t]
          for (var s = (r + '').split(e), a = 0, u = s.length; a < u; a++) s[a] = o(s[a])
          return s.join(e)
        }
      }
      function _(e) {
        return function (t, n) {
          return void 0 === t ? this._parts[e] || '' : ((this._parts[e] = t || null), this.build(!n), this)
        }
      }
      function b(e, t) {
        return function (n, r) {
          return void 0 === n
            ? this._parts[e] || ''
            : (null !== n && (n += '').charAt(0) === t && (n = n.substring(1)), (this._parts[e] = n), this.build(!r), this)
        }
      }
      ;(i.decodePath = C('/', 'decodePathSegment')),
        (i.decodeUrnPath = C(':', 'decodeUrnPathSegment')),
        (i.recodePath = C('/', 'encodePathSegment', 'decode')),
        (i.recodeUrnPath = C(':', 'encodeUrnPathSegment', 'decode')),
        (i.encodeReserved = w('reserved', 'encode')),
        (i.parse = function (e, t) {
          var n
          return (
            t || (t = { preventInvalidHostname: i.preventInvalidHostname }),
            (n = (e = (e = e.replace(i.leading_whitespace_expression, '')).replace(i.ascii_tab_whitespace, '')).indexOf('#')) > -1 &&
              ((t.fragment = e.substring(n + 1) || null), (e = e.substring(0, n))),
            (n = e.indexOf('?')) > -1 && ((t.query = e.substring(n + 1) || null), (e = e.substring(0, n))),
            '//' === (e = (e = e.replace(/^(https?|ftp|wss?)?:+[/\\]*/i, '$1://')).replace(/^[/\\]{2,}/i, '//')).substring(0, 2)
              ? ((t.protocol = null), (e = e.substring(2)), (e = i.parseAuthority(e, t)))
              : (n = e.indexOf(':')) > -1 &&
                ((t.protocol = e.substring(0, n) || null),
                t.protocol && !t.protocol.match(i.protocol_expression)
                  ? (t.protocol = void 0)
                  : '//' === e.substring(n + 1, n + 3).replace(/\\/g, '/')
                  ? ((e = e.substring(n + 3)), (e = i.parseAuthority(e, t)))
                  : ((e = e.substring(n + 1)), (t.urn = !0))),
            (t.path = e),
            t
          )
        }),
        (i.parseHost = function (e, t) {
          e || (e = '')
          var n,
            r,
            o = (e = e.replace(/\\/g, '/')).indexOf('/')
          if ((-1 === o && (o = e.length), '[' === e.charAt(0)))
            (n = e.indexOf(']')),
              (t.hostname = e.substring(1, n) || null),
              (t.port = e.substring(n + 2, o) || null),
              '/' === t.port && (t.port = null)
          else {
            var s = e.indexOf(':'),
              a = e.indexOf('/'),
              u = e.indexOf(':', s + 1)
            ;-1 !== u && (-1 === a || u < a)
              ? ((t.hostname = e.substring(0, o) || null), (t.port = null))
              : ((r = e.substring(0, o).split(':')), (t.hostname = r[0] || null), (t.port = r[1] || null))
          }
          return (
            t.hostname && '/' !== e.substring(o).charAt(0) && (o++, (e = '/' + e)),
            t.preventInvalidHostname && i.ensureValidHostname(t.hostname, t.protocol),
            t.port && i.ensureValidPort(t.port),
            e.substring(o) || '/'
          )
        }),
        (i.parseAuthority = function (e, t) {
          return (e = i.parseUserinfo(e, t)), i.parseHost(e, t)
        }),
        (i.parseUserinfo = function (e, t) {
          var n = e
          ;-1 !== e.indexOf('\\') && (e = e.replace(/\\/g, '/'))
          var r,
            o = e.indexOf('/'),
            s = e.lastIndexOf('@', o > -1 ? o : e.length - 1)
          return (
            s > -1 && (-1 === o || s < o)
              ? ((r = e.substring(0, s).split(':')),
                (t.username = r[0] ? i.decode(r[0]) : null),
                r.shift(),
                (t.password = r[0] ? i.decode(r.join(':')) : null),
                (e = n.substring(s + 1)))
              : ((t.username = null), (t.password = null)),
            e
          )
        }),
        (i.parseQuery = function (e, t) {
          if (!e) return {}
          if (!(e = e.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, ''))) return {}
          for (var n, r, o, s = {}, u = e.split('&'), c = u.length, l = 0; l < c; l++)
            (n = u[l].split('=')),
              (r = i.decodeQuery(n.shift(), t)),
              (o = n.length ? i.decodeQuery(n.join('='), t) : null),
              '__proto__' !== r && (a.call(s, r) ? (('string' != typeof s[r] && null !== s[r]) || (s[r] = [s[r]]), s[r].push(o)) : (s[r] = o))
          return s
        }),
        (i.build = function (e) {
          var t = '',
            n = !1
          return (
            e.protocol && (t += e.protocol + ':'),
            e.urn || (!t && !e.hostname) || ((t += '//'), (n = !0)),
            (t += i.buildAuthority(e) || ''),
            'string' == typeof e.path && ('/' !== e.path.charAt(0) && n && (t += '/'), (t += e.path)),
            'string' == typeof e.query && e.query && (t += '?' + e.query),
            'string' == typeof e.fragment && e.fragment && (t += '#' + e.fragment),
            t
          )
        }),
        (i.buildHost = function (e) {
          var t = ''
          return e.hostname
            ? (i.ip6_expression.test(e.hostname) ? (t += '[' + e.hostname + ']') : (t += e.hostname), e.port && (t += ':' + e.port), t)
            : ''
        }),
        (i.buildAuthority = function (e) {
          return i.buildUserinfo(e) + i.buildHost(e)
        }),
        (i.buildUserinfo = function (e) {
          var t = ''
          return e.username && (t += i.encode(e.username)), e.password && (t += ':' + i.encode(e.password)), t && (t += '@'), t
        }),
        (i.buildQuery = function (e, t, n) {
          var r,
            o,
            s,
            u,
            c = ''
          for (o in e)
            if ('__proto__' !== o && a.call(e, o))
              if (l(e[o]))
                for (r = {}, s = 0, u = e[o].length; s < u; s++)
                  void 0 !== e[o][s] &&
                    void 0 === r[e[o][s] + ''] &&
                    ((c += '&' + i.buildQueryParameter(o, e[o][s], n)), !0 !== t && (r[e[o][s] + ''] = !0))
              else void 0 !== e[o] && (c += '&' + i.buildQueryParameter(o, e[o], n))
          return c.substring(1)
        }),
        (i.buildQueryParameter = function (e, t, n) {
          return i.encodeQuery(e, n) + (null !== t ? '=' + i.encodeQuery(t, n) : '')
        }),
        (i.addQuery = function (e, t, n) {
          if ('object' == typeof t) for (var r in t) a.call(t, r) && i.addQuery(e, r, t[r])
          else {
            if ('string' != typeof t) throw new TypeError('URI.addQuery() accepts an object, string as the name parameter')
            if (void 0 === e[t]) return void (e[t] = n)
            'string' == typeof e[t] && (e[t] = [e[t]]), l(n) || (n = [n]), (e[t] = (e[t] || []).concat(n))
          }
        }),
        (i.setQuery = function (e, t, n) {
          if ('object' == typeof t) for (var r in t) a.call(t, r) && i.setQuery(e, r, t[r])
          else {
            if ('string' != typeof t) throw new TypeError('URI.setQuery() accepts an object, string as the name parameter')
            e[t] = void 0 === n ? null : n
          }
        }),
        (i.removeQuery = function (e, t, n) {
          var r, o, s
          if (l(t)) for (r = 0, o = t.length; r < o; r++) e[t[r]] = void 0
          else if ('RegExp' === c(t)) for (s in e) t.test(s) && (e[s] = void 0)
          else if ('object' == typeof t) for (s in t) a.call(t, s) && i.removeQuery(e, s, t[s])
          else {
            if ('string' != typeof t) throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter')
            void 0 !== n
              ? 'RegExp' === c(n)
                ? !l(e[t]) && n.test(e[t])
                  ? (e[t] = void 0)
                  : (e[t] = d(e[t], n))
                : e[t] !== String(n) || (l(n) && 1 !== n.length)
                ? l(e[t]) && (e[t] = d(e[t], n))
                : (e[t] = void 0)
              : (e[t] = void 0)
          }
        }),
        (i.hasQuery = function (e, t, n, r) {
          switch (c(t)) {
            case 'String':
              break
            case 'RegExp':
              for (var o in e) if (a.call(e, o) && t.test(o) && (void 0 === n || i.hasQuery(e, o, n))) return !0
              return !1
            case 'Object':
              for (var s in t) if (a.call(t, s) && !i.hasQuery(e, s, t[s])) return !1
              return !0
            default:
              throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter')
          }
          switch (c(n)) {
            case 'Undefined':
              return t in e
            case 'Boolean':
              return n === Boolean(l(e[t]) ? e[t].length : e[t])
            case 'Function':
              return !!n(e[t], t, e)
            case 'Array':
              return !!l(e[t]) && (r ? f : p)(e[t], n)
            case 'RegExp':
              return l(e[t]) ? !!r && f(e[t], n) : Boolean(e[t] && e[t].match(n))
            case 'Number':
              n = String(n)
            case 'String':
              return l(e[t]) ? !!r && f(e[t], n) : e[t] === n
            default:
              throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter')
          }
        }),
        (i.joinPaths = function () {
          for (var e = [], t = [], n = 0, r = 0; r < arguments.length; r++) {
            var o = new i(arguments[r])
            e.push(o)
            for (var s = o.segment(), a = 0; a < s.length; a++) 'string' == typeof s[a] && t.push(s[a]), s[a] && n++
          }
          if (!t.length || !n) return new i('')
          var u = new i('').segment(t)
          return ('' !== e[0].path() && '/' !== e[0].path().slice(0, 1)) || u.path('/' + u.path()), u.normalize()
        }),
        (i.commonPath = function (e, t) {
          var n,
            r = Math.min(e.length, t.length)
          for (n = 0; n < r; n++)
            if (e.charAt(n) !== t.charAt(n)) {
              n--
              break
            }
          return n < 1
            ? e.charAt(0) === t.charAt(0) && '/' === e.charAt(0)
              ? '/'
              : ''
            : (('/' === e.charAt(n) && '/' === t.charAt(n)) || (n = e.substring(0, n).lastIndexOf('/')), e.substring(0, n + 1))
        }),
        (i.withinString = function (e, t, n) {
          n || (n = {})
          var r = n.start || i.findUri.start,
            o = n.end || i.findUri.end,
            s = n.trim || i.findUri.trim,
            a = n.parens || i.findUri.parens,
            u = /[a-z0-9-]=["']?$/i
          for (r.lastIndex = 0; ; ) {
            var c = r.exec(e)
            if (!c) break
            var l = c.index
            if (n.ignoreHtml) {
              var d = e.slice(Math.max(l - 3, 0), l)
              if (d && u.test(d)) continue
            }
            for (var f = l + e.slice(l).search(o), p = e.slice(l, f), h = -1; ; ) {
              var m = a.exec(p)
              if (!m) break
              var g = m.index + m[0].length
              h = Math.max(h, g)
            }
            if (
              !((p = h > -1 ? p.slice(0, h) + p.slice(h).replace(s, '') : p.replace(s, '')).length <= c[0].length || (n.ignore && n.ignore.test(p)))
            ) {
              var y = t(p, l, (f = l + p.length), e)
              void 0 !== y ? ((y = String(y)), (e = e.slice(0, l) + y + e.slice(f)), (r.lastIndex = l + y.length)) : (r.lastIndex = f)
            }
          }
          return (r.lastIndex = 0), e
        }),
        (i.ensureValidHostname = function (t, n) {
          var r = !!t,
            o = !1
          if ((!!n && (o = f(i.hostProtocols, n)), o && !r)) throw new TypeError('Hostname cannot be empty, if protocol is ' + n)
          if (t && t.match(i.invalid_hostname_characters)) {
            if (!e) throw new TypeError('Hostname "' + t + '" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available')
            if (e.toASCII(t).match(i.invalid_hostname_characters))
              throw new TypeError('Hostname "' + t + '" contains characters other than [A-Z0-9.-:_]')
          }
        }),
        (i.ensureValidPort = function (e) {
          if (e) {
            var t = Number(e)
            if (!(/^[0-9]+$/.test(t) && t > 0 && t < 65536)) throw new TypeError('Port "' + e + '" is not a valid port')
          }
        }),
        (i.noConflict = function (e) {
          if (e) {
            var t = { URI: this.noConflict() }
            return (
              r.URITemplate && 'function' == typeof r.URITemplate.noConflict && (t.URITemplate = r.URITemplate.noConflict()),
              r.IPv6 && 'function' == typeof r.IPv6.noConflict && (t.IPv6 = r.IPv6.noConflict()),
              r.SecondLevelDomains &&
                'function' == typeof r.SecondLevelDomains.noConflict &&
                (t.SecondLevelDomains = r.SecondLevelDomains.noConflict()),
              t
            )
          }
          return r.URI === this && (r.URI = o), this
        }),
        (s.build = function (e) {
          return (
            !0 === e
              ? (this._deferred_build = !0)
              : (void 0 === e || this._deferred_build) && ((this._string = i.build(this._parts)), (this._deferred_build = !1)),
            this
          )
        }),
        (s.clone = function () {
          return new i(this)
        }),
        (s.valueOf = s.toString =
          function () {
            return this.build(!1)._string
          }),
        (s.protocol = _('protocol')),
        (s.username = _('username')),
        (s.password = _('password')),
        (s.hostname = _('hostname')),
        (s.port = _('port')),
        (s.query = b('query', '?')),
        (s.fragment = b('fragment', '#')),
        (s.search = function (e, t) {
          var n = this.query(e, t)
          return 'string' == typeof n && n.length ? '?' + n : n
        }),
        (s.hash = function (e, t) {
          var n = this.fragment(e, t)
          return 'string' == typeof n && n.length ? '#' + n : n
        }),
        (s.pathname = function (e, t) {
          if (void 0 === e || !0 === e) {
            var n = this._parts.path || (this._parts.hostname ? '/' : '')
            return e ? (this._parts.urn ? i.decodeUrnPath : i.decodePath)(n) : n
          }
          return (
            this._parts.urn ? (this._parts.path = e ? i.recodeUrnPath(e) : '') : (this._parts.path = e ? i.recodePath(e) : '/'), this.build(!t), this
          )
        }),
        (s.path = s.pathname),
        (s.href = function (e, t) {
          var n
          if (void 0 === e) return this.toString()
          ;(this._string = ''), (this._parts = i._parts())
          var r = e instanceof i,
            o = 'object' == typeof e && (e.hostname || e.path || e.pathname)
          if (
            (e.nodeName && ((e = e[i.getDomAttribute(e)] || ''), (o = !1)),
            !r && o && void 0 !== e.pathname && (e = e.toString()),
            'string' == typeof e || e instanceof String)
          )
            this._parts = i.parse(String(e), this._parts)
          else {
            if (!r && !o) throw new TypeError('invalid input')
            var s = r ? e._parts : e
            for (n in s) 'query' !== n && a.call(this._parts, n) && (this._parts[n] = s[n])
            s.query && this.query(s.query, !1)
          }
          return this.build(!t), this
        }),
        (s.is = function (e) {
          var t = !1,
            r = !1,
            o = !1,
            s = !1,
            a = !1,
            u = !1,
            c = !1,
            l = !this._parts.urn
          switch (
            (this._parts.hostname &&
              ((l = !1),
              (r = i.ip4_expression.test(this._parts.hostname)),
              (o = i.ip6_expression.test(this._parts.hostname)),
              (a = (s = !(t = r || o)) && n && n.has(this._parts.hostname)),
              (u = s && i.idn_expression.test(this._parts.hostname)),
              (c = s && i.punycode_expression.test(this._parts.hostname))),
            e.toLowerCase())
          ) {
            case 'relative':
              return l
            case 'absolute':
              return !l
            case 'domain':
            case 'name':
              return s
            case 'sld':
              return a
            case 'ip':
              return t
            case 'ip4':
            case 'ipv4':
            case 'inet4':
              return r
            case 'ip6':
            case 'ipv6':
            case 'inet6':
              return o
            case 'idn':
              return u
            case 'url':
              return !this._parts.urn
            case 'urn':
              return !!this._parts.urn
            case 'punycode':
              return c
          }
          return null
        })
      var x = s.protocol,
        S = s.port,
        A = s.hostname
      ;(s.protocol = function (e, t) {
        if (e && !(e = e.replace(/:(\/\/)?$/, '')).match(i.protocol_expression))
          throw new TypeError('Protocol "' + e + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]')
        return x.call(this, e, t)
      }),
        (s.scheme = s.protocol),
        (s.port = function (e, t) {
          return this._parts.urn
            ? void 0 === e
              ? ''
              : this
            : (void 0 !== e && (0 === e && (e = null), e && (':' === (e += '').charAt(0) && (e = e.substring(1)), i.ensureValidPort(e))),
              S.call(this, e, t))
        }),
        (s.hostname = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (void 0 !== e) {
            var n = { preventInvalidHostname: this._parts.preventInvalidHostname }
            if ('/' !== i.parseHost(e, n)) throw new TypeError('Hostname "' + e + '" contains characters other than [A-Z0-9.-]')
            ;(e = n.hostname), this._parts.preventInvalidHostname && i.ensureValidHostname(e, this._parts.protocol)
          }
          return A.call(this, e, t)
        }),
        (s.origin = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (void 0 === e) {
            var n = this.protocol()
            return this.authority() ? (n ? n + '://' : '') + this.authority() : ''
          }
          var r = i(e)
          return this.protocol(r.protocol()).authority(r.authority()).build(!t), this
        }),
        (s.host = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (void 0 === e) return this._parts.hostname ? i.buildHost(this._parts) : ''
          if ('/' !== i.parseHost(e, this._parts)) throw new TypeError('Hostname "' + e + '" contains characters other than [A-Z0-9.-]')
          return this.build(!t), this
        }),
        (s.authority = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (void 0 === e) return this._parts.hostname ? i.buildAuthority(this._parts) : ''
          if ('/' !== i.parseAuthority(e, this._parts)) throw new TypeError('Hostname "' + e + '" contains characters other than [A-Z0-9.-]')
          return this.build(!t), this
        }),
        (s.userinfo = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (void 0 === e) {
            var n = i.buildUserinfo(this._parts)
            return n ? n.substring(0, n.length - 1) : n
          }
          return '@' !== e[e.length - 1] && (e += '@'), i.parseUserinfo(e, this._parts), this.build(!t), this
        }),
        (s.resource = function (e, t) {
          var n
          return void 0 === e
            ? this.path() + this.search() + this.hash()
            : ((n = i.parse(e)),
              (this._parts.path = n.path),
              (this._parts.query = n.query),
              (this._parts.fragment = n.fragment),
              this.build(!t),
              this)
        }),
        (s.subdomain = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (void 0 === e) {
            if (!this._parts.hostname || this.is('IP')) return ''
            var n = this._parts.hostname.length - this.domain().length - 1
            return this._parts.hostname.substring(0, n) || ''
          }
          var r = this._parts.hostname.length - this.domain().length,
            o = this._parts.hostname.substring(0, r),
            s = new RegExp('^' + u(o))
          if ((e && '.' !== e.charAt(e.length - 1) && (e += '.'), -1 !== e.indexOf(':'))) throw new TypeError('Domains cannot contain colons')
          return (
            e && i.ensureValidHostname(e, this._parts.protocol), (this._parts.hostname = this._parts.hostname.replace(s, e)), this.build(!t), this
          )
        }),
        (s.domain = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (('boolean' == typeof e && ((t = e), (e = void 0)), void 0 === e)) {
            if (!this._parts.hostname || this.is('IP')) return ''
            var n = this._parts.hostname.match(/\./g)
            if (n && n.length < 2) return this._parts.hostname
            var r = this._parts.hostname.length - this.tld(t).length - 1
            return (r = this._parts.hostname.lastIndexOf('.', r - 1) + 1), this._parts.hostname.substring(r) || ''
          }
          if (!e) throw new TypeError('cannot set domain empty')
          if (-1 !== e.indexOf(':')) throw new TypeError('Domains cannot contain colons')
          if ((i.ensureValidHostname(e, this._parts.protocol), !this._parts.hostname || this.is('IP'))) this._parts.hostname = e
          else {
            var o = new RegExp(u(this.domain()) + '$')
            this._parts.hostname = this._parts.hostname.replace(o, e)
          }
          return this.build(!t), this
        }),
        (s.tld = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (('boolean' == typeof e && ((t = e), (e = void 0)), void 0 === e)) {
            if (!this._parts.hostname || this.is('IP')) return ''
            var r = this._parts.hostname.lastIndexOf('.'),
              o = this._parts.hostname.substring(r + 1)
            return (!0 !== t && n && n.list[o.toLowerCase()] && n.get(this._parts.hostname)) || o
          }
          var i
          if (!e) throw new TypeError('cannot set TLD empty')
          if (e.match(/[^a-zA-Z0-9-]/)) {
            if (!n || !n.is(e)) throw new TypeError('TLD "' + e + '" contains characters other than [A-Z0-9]')
            ;(i = new RegExp(u(this.tld()) + '$')), (this._parts.hostname = this._parts.hostname.replace(i, e))
          } else {
            if (!this._parts.hostname || this.is('IP')) throw new ReferenceError('cannot set TLD on non-domain host')
            ;(i = new RegExp(u(this.tld()) + '$')), (this._parts.hostname = this._parts.hostname.replace(i, e))
          }
          return this.build(!t), this
        }),
        (s.directory = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (void 0 === e || !0 === e) {
            if (!this._parts.path && !this._parts.hostname) return ''
            if ('/' === this._parts.path) return '/'
            var n = this._parts.path.length - this.filename().length - 1,
              r = this._parts.path.substring(0, n) || (this._parts.hostname ? '/' : '')
            return e ? i.decodePath(r) : r
          }
          var o = this._parts.path.length - this.filename().length,
            s = this._parts.path.substring(0, o),
            a = new RegExp('^' + u(s))
          return (
            this.is('relative') || (e || (e = '/'), '/' !== e.charAt(0) && (e = '/' + e)),
            e && '/' !== e.charAt(e.length - 1) && (e += '/'),
            (e = i.recodePath(e)),
            (this._parts.path = this._parts.path.replace(a, e)),
            this.build(!t),
            this
          )
        }),
        (s.filename = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if ('string' != typeof e) {
            if (!this._parts.path || '/' === this._parts.path) return ''
            var n = this._parts.path.lastIndexOf('/'),
              r = this._parts.path.substring(n + 1)
            return e ? i.decodePathSegment(r) : r
          }
          var o = !1
          '/' === e.charAt(0) && (e = e.substring(1)), e.match(/\.?\//) && (o = !0)
          var s = new RegExp(u(this.filename()) + '$')
          return (e = i.recodePath(e)), (this._parts.path = this._parts.path.replace(s, e)), o ? this.normalizePath(t) : this.build(!t), this
        }),
        (s.suffix = function (e, t) {
          if (this._parts.urn) return void 0 === e ? '' : this
          if (void 0 === e || !0 === e) {
            if (!this._parts.path || '/' === this._parts.path) return ''
            var n,
              r,
              o = this.filename(),
              s = o.lastIndexOf('.')
            return -1 === s ? '' : ((n = o.substring(s + 1)), (r = /^[a-z0-9%]+$/i.test(n) ? n : ''), e ? i.decodePathSegment(r) : r)
          }
          '.' === e.charAt(0) && (e = e.substring(1))
          var a,
            c = this.suffix()
          if (c) a = e ? new RegExp(u(c) + '$') : new RegExp(u('.' + c) + '$')
          else {
            if (!e) return this
            this._parts.path += '.' + i.recodePath(e)
          }
          return a && ((e = i.recodePath(e)), (this._parts.path = this._parts.path.replace(a, e))), this.build(!t), this
        }),
        (s.segment = function (e, t, n) {
          var r = this._parts.urn ? ':' : '/',
            o = this.path(),
            i = '/' === o.substring(0, 1),
            s = o.split(r)
          if ((void 0 !== e && 'number' != typeof e && ((n = t), (t = e), (e = void 0)), void 0 !== e && 'number' != typeof e))
            throw new Error('Bad segment "' + e + '", must be 0-based integer')
          if ((i && s.shift(), e < 0 && (e = Math.max(s.length + e, 0)), void 0 === t)) return void 0 === e ? s : s[e]
          if (null === e || void 0 === s[e])
            if (l(t)) {
              s = []
              for (var a = 0, u = t.length; a < u; a++)
                (t[a].length || (s.length && s[s.length - 1].length)) && (s.length && !s[s.length - 1].length && s.pop(), s.push(h(t[a])))
            } else (t || 'string' == typeof t) && ((t = h(t)), '' === s[s.length - 1] ? (s[s.length - 1] = t) : s.push(t))
          else t ? (s[e] = h(t)) : s.splice(e, 1)
          return i && s.unshift(''), this.path(s.join(r), n)
        }),
        (s.segmentCoded = function (e, t, n) {
          var r, o, s
          if (('number' != typeof e && ((n = t), (t = e), (e = void 0)), void 0 === t)) {
            if (l((r = this.segment(e, t, n)))) for (o = 0, s = r.length; o < s; o++) r[o] = i.decode(r[o])
            else r = void 0 !== r ? i.decode(r) : void 0
            return r
          }
          if (l(t)) for (o = 0, s = t.length; o < s; o++) t[o] = i.encode(t[o])
          else t = 'string' == typeof t || t instanceof String ? i.encode(t) : t
          return this.segment(e, t, n)
        })
      var E = s.query
      return (
        (s.query = function (e, t) {
          if (!0 === e) return i.parseQuery(this._parts.query, this._parts.escapeQuerySpace)
          if ('function' == typeof e) {
            var n = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace),
              r = e.call(this, n)
            return (
              (this._parts.query = i.buildQuery(r || n, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace)), this.build(!t), this
            )
          }
          return void 0 !== e && 'string' != typeof e
            ? ((this._parts.query = i.buildQuery(e, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace)), this.build(!t), this)
            : E.call(this, e, t)
        }),
        (s.setQuery = function (e, t, n) {
          var r = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace)
          if ('string' == typeof e || e instanceof String) r[e] = void 0 !== t ? t : null
          else {
            if ('object' != typeof e) throw new TypeError('URI.addQuery() accepts an object, string as the name parameter')
            for (var o in e) a.call(e, o) && (r[o] = e[o])
          }
          return (
            (this._parts.query = i.buildQuery(r, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace)),
            'string' != typeof e && (n = t),
            this.build(!n),
            this
          )
        }),
        (s.addQuery = function (e, t, n) {
          var r = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace)
          return (
            i.addQuery(r, e, void 0 === t ? null : t),
            (this._parts.query = i.buildQuery(r, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace)),
            'string' != typeof e && (n = t),
            this.build(!n),
            this
          )
        }),
        (s.removeQuery = function (e, t, n) {
          var r = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace)
          return (
            i.removeQuery(r, e, t),
            (this._parts.query = i.buildQuery(r, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace)),
            'string' != typeof e && (n = t),
            this.build(!n),
            this
          )
        }),
        (s.hasQuery = function (e, t, n) {
          var r = i.parseQuery(this._parts.query, this._parts.escapeQuerySpace)
          return i.hasQuery(r, e, t, n)
        }),
        (s.setSearch = s.setQuery),
        (s.addSearch = s.addQuery),
        (s.removeSearch = s.removeQuery),
        (s.hasSearch = s.hasQuery),
        (s.normalize = function () {
          return this._parts.urn
            ? this.normalizeProtocol(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()
            : this.normalizeProtocol(!1).normalizeHostname(!1).normalizePort(!1).normalizePath(!1).normalizeQuery(!1).normalizeFragment(!1).build()
        }),
        (s.normalizeProtocol = function (e) {
          return 'string' == typeof this._parts.protocol && ((this._parts.protocol = this._parts.protocol.toLowerCase()), this.build(!e)), this
        }),
        (s.normalizeHostname = function (n) {
          return (
            this._parts.hostname &&
              (this.is('IDN') && e
                ? (this._parts.hostname = e.toASCII(this._parts.hostname))
                : this.is('IPv6') && t && (this._parts.hostname = t.best(this._parts.hostname)),
              (this._parts.hostname = this._parts.hostname.toLowerCase()),
              this.build(!n)),
            this
          )
        }),
        (s.normalizePort = function (e) {
          return (
            'string' == typeof this._parts.protocol &&
              this._parts.port === i.defaultPorts[this._parts.protocol] &&
              ((this._parts.port = null), this.build(!e)),
            this
          )
        }),
        (s.normalizePath = function (e) {
          var t,
            n = this._parts.path
          if (!n) return this
          if (this._parts.urn) return (this._parts.path = i.recodeUrnPath(this._parts.path)), this.build(!e), this
          if ('/' === this._parts.path) return this
          var r,
            o,
            s = ''
          for (
            '/' !== (n = i.recodePath(n)).charAt(0) && ((t = !0), (n = '/' + n)),
              ('/..' !== n.slice(-3) && '/.' !== n.slice(-2)) || (n += '/'),
              n = n.replace(/(\/(\.\/)+)|(\/\.$)/g, '/').replace(/\/{2,}/g, '/'),
              t && (s = n.substring(1).match(/^(\.\.\/)+/) || '') && (s = s[0]);
            -1 !== (r = n.search(/\/\.\.(\/|$)/));

          )
            0 !== r
              ? (-1 === (o = n.substring(0, r).lastIndexOf('/')) && (o = r), (n = n.substring(0, o) + n.substring(r + 3)))
              : (n = n.substring(3))
          return t && this.is('relative') && (n = s + n.substring(1)), (this._parts.path = n), this.build(!e), this
        }),
        (s.normalizePathname = s.normalizePath),
        (s.normalizeQuery = function (e) {
          return (
            'string' == typeof this._parts.query &&
              (this._parts.query.length ? this.query(i.parseQuery(this._parts.query, this._parts.escapeQuerySpace)) : (this._parts.query = null),
              this.build(!e)),
            this
          )
        }),
        (s.normalizeFragment = function (e) {
          return this._parts.fragment || ((this._parts.fragment = null), this.build(!e)), this
        }),
        (s.normalizeSearch = s.normalizeQuery),
        (s.normalizeHash = s.normalizeFragment),
        (s.iso8859 = function () {
          var e = i.encode,
            t = i.decode
          ;(i.encode = escape), (i.decode = decodeURIComponent)
          try {
            this.normalize()
          } finally {
            ;(i.encode = e), (i.decode = t)
          }
          return this
        }),
        (s.unicode = function () {
          var e = i.encode,
            t = i.decode
          ;(i.encode = g), (i.decode = unescape)
          try {
            this.normalize()
          } finally {
            ;(i.encode = e), (i.decode = t)
          }
          return this
        }),
        (s.readable = function () {
          var t = this.clone()
          t.username('').password('').normalize()
          var n = ''
          if (
            (t._parts.protocol && (n += t._parts.protocol + '://'),
            t._parts.hostname &&
              (t.is('punycode') && e ? ((n += e.toUnicode(t._parts.hostname)), t._parts.port && (n += ':' + t._parts.port)) : (n += t.host())),
            t._parts.hostname && t._parts.path && '/' !== t._parts.path.charAt(0) && (n += '/'),
            (n += t.path(!0)),
            t._parts.query)
          ) {
            for (var r = '', o = 0, s = t._parts.query.split('&'), a = s.length; o < a; o++) {
              var u = (s[o] || '').split('=')
              ;(r += '&' + i.decodeQuery(u[0], this._parts.escapeQuerySpace).replace(/&/g, '%26')),
                void 0 !== u[1] && (r += '=' + i.decodeQuery(u[1], this._parts.escapeQuerySpace).replace(/&/g, '%26'))
            }
            n += '?' + r.substring(1)
          }
          return (n += i.decodeQuery(t.hash(), !0))
        }),
        (s.absoluteTo = function (e) {
          var t,
            n,
            r,
            o = this.clone(),
            s = ['protocol', 'username', 'password', 'hostname', 'port']
          if (this._parts.urn) throw new Error('URNs do not have any generally defined hierarchical components')
          if ((e instanceof i || (e = new i(e)), o._parts.protocol)) return o
          if (((o._parts.protocol = e._parts.protocol), this._parts.hostname)) return o
          for (n = 0; (r = s[n]); n++) o._parts[r] = e._parts[r]
          return (
            o._parts.path
              ? ('..' === o._parts.path.substring(-2) && (o._parts.path += '/'),
                '/' !== o.path().charAt(0) &&
                  ((t = (t = e.directory()) || (0 === e.path().indexOf('/') ? '/' : '')),
                  (o._parts.path = (t ? t + '/' : '') + o._parts.path),
                  o.normalizePath()))
              : ((o._parts.path = e._parts.path), o._parts.query || (o._parts.query = e._parts.query)),
            o.build(),
            o
          )
        }),
        (s.relativeTo = function (e) {
          var t,
            n,
            r,
            o,
            s,
            a = this.clone().normalize()
          if (a._parts.urn) throw new Error('URNs do not have any generally defined hierarchical components')
          if (((e = new i(e).normalize()), (t = a._parts), (n = e._parts), (o = a.path()), (s = e.path()), '/' !== o.charAt(0)))
            throw new Error('URI is already relative')
          if ('/' !== s.charAt(0)) throw new Error('Cannot calculate a URI relative to another relative URI')
          if ((t.protocol === n.protocol && (t.protocol = null), t.username !== n.username || t.password !== n.password)) return a.build()
          if (null !== t.protocol || null !== t.username || null !== t.password) return a.build()
          if (t.hostname !== n.hostname || t.port !== n.port) return a.build()
          if (((t.hostname = null), (t.port = null), o === s)) return (t.path = ''), a.build()
          if (!(r = i.commonPath(o, s))) return a.build()
          var u = n.path
            .substring(r.length)
            .replace(/[^\/]*$/, '')
            .replace(/.*?\//g, '../')
          return (t.path = u + t.path.substring(r.length) || './'), a.build()
        }),
        (s.equals = function (e) {
          var t,
            n,
            r,
            o,
            s,
            u = this.clone(),
            c = new i(e),
            d = {}
          if ((u.normalize(), c.normalize(), u.toString() === c.toString())) return !0
          if (((r = u.query()), (o = c.query()), u.query(''), c.query(''), u.toString() !== c.toString())) return !1
          if (r.length !== o.length) return !1
          for (s in ((t = i.parseQuery(r, this._parts.escapeQuerySpace)), (n = i.parseQuery(o, this._parts.escapeQuerySpace)), t))
            if (a.call(t, s)) {
              if (l(t[s])) {
                if (!p(t[s], n[s])) return !1
              } else if (t[s] !== n[s]) return !1
              d[s] = !0
            }
          for (s in n) if (a.call(n, s) && !d[s]) return !1
          return !0
        }),
        (s.preventInvalidHostname = function (e) {
          return (this._parts.preventInvalidHostname = !!e), this
        }),
        (s.duplicateQueryParameters = function (e) {
          return (this._parts.duplicateQueryParameters = !!e), this
        }),
        (s.escapeQuerySpace = function (e) {
          return (this._parts.escapeQuerySpace = !!e), this
        }),
        i
      )
    }),
    /*!
     * URI.js - Mutating URLs
     *
     * Version: 1.19.11
     *
     * Author: Rodney Rehm
     * Web: http://medialize.github.io/URI.js/
     *
     * Licensed under
     *   MIT License http://www.opensource.org/licenses/mit-license
     *
     */
    (Lt = kt).exports
      ? (Lt.exports = Wt(
          (Dt ||
            ((Dt = 1),
            (function (e, t) {
              !(function (n) {
                var r = t && !t.nodeType && t,
                  o = e && !e.nodeType && e,
                  i = 'object' == typeof p && p
                ;(i.global !== i && i.window !== i && i.self !== i) || (n = i)
                var s,
                  a,
                  u = 2147483647,
                  c = 36,
                  l = 1,
                  d = 26,
                  f = 38,
                  h = 700,
                  m = 72,
                  g = 128,
                  y = '-',
                  v = /^xn--/,
                  w = /[^\x20-\x7E]/,
                  C = /[\x2E\u3002\uFF0E\uFF61]/g,
                  _ = {
                    overflow: 'Overflow: input needs wider integers to process',
                    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
                    'invalid-input': 'Invalid input'
                  },
                  b = c - l,
                  x = Math.floor,
                  S = String.fromCharCode
                function A(e) {
                  throw new RangeError(_[e])
                }
                function E(e, t) {
                  for (var n = e.length, r = []; n--; ) r[n] = t(e[n])
                  return r
                }
                function O(e, t) {
                  var n = e.split('@'),
                    r = ''
                  return n.length > 1 && ((r = n[0] + '@'), (e = n[1])), r + E((e = e.replace(C, '.')).split('.'), t).join('.')
                }
                function I(e) {
                  for (var t, n, r = [], o = 0, i = e.length; o < i; )
                    (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i
                      ? 56320 == (64512 & (n = e.charCodeAt(o++)))
                        ? r.push(((1023 & t) << 10) + (1023 & n) + 65536)
                        : (r.push(t), o--)
                      : r.push(t)
                  return r
                }
                function P(e) {
                  return E(e, function (e) {
                    var t = ''
                    return e > 65535 && ((t += S((((e -= 65536) >>> 10) & 1023) | 55296)), (e = 56320 | (1023 & e))), t + S(e)
                  }).join('')
                }
                function R(e, t) {
                  return e + 22 + 75 * (e < 26) - ((0 != t) << 5)
                }
                function T(e, t, n) {
                  var r = 0
                  for (e = n ? x(e / h) : e >> 1, e += x(e / t); e > (b * d) >> 1; r += c) e = x(e / b)
                  return x(r + ((b + 1) * e) / (e + f))
                }
                function q(e) {
                  var t,
                    n,
                    r,
                    o,
                    i,
                    s,
                    a,
                    f,
                    p,
                    h,
                    v,
                    w = [],
                    C = e.length,
                    _ = 0,
                    b = g,
                    S = m
                  for ((n = e.lastIndexOf(y)) < 0 && (n = 0), r = 0; r < n; ++r) e.charCodeAt(r) >= 128 && A('not-basic'), w.push(e.charCodeAt(r))
                  for (o = n > 0 ? n + 1 : 0; o < C; ) {
                    for (
                      i = _, s = 1, a = c;
                      o >= C && A('invalid-input'),
                        ((f = (v = e.charCodeAt(o++)) - 48 < 10 ? v - 22 : v - 65 < 26 ? v - 65 : v - 97 < 26 ? v - 97 : c) >= c ||
                          f > x((u - _) / s)) &&
                          A('overflow'),
                        (_ += f * s),
                        !(f < (p = a <= S ? l : a >= S + d ? d : a - S));
                      a += c
                    )
                      s > x(u / (h = c - p)) && A('overflow'), (s *= h)
                    ;(S = T(_ - i, (t = w.length + 1), 0 == i)), x(_ / t) > u - b && A('overflow'), (b += x(_ / t)), (_ %= t), w.splice(_++, 0, b)
                  }
                  return P(w)
                }
                function z(e) {
                  var t,
                    n,
                    r,
                    o,
                    i,
                    s,
                    a,
                    f,
                    p,
                    h,
                    v,
                    w,
                    C,
                    _,
                    b,
                    E = []
                  for (w = (e = I(e)).length, t = g, n = 0, i = m, s = 0; s < w; ++s) (v = e[s]) < 128 && E.push(S(v))
                  for (r = o = E.length, o && E.push(y); r < w; ) {
                    for (a = u, s = 0; s < w; ++s) (v = e[s]) >= t && v < a && (a = v)
                    for (a - t > x((u - n) / (C = r + 1)) && A('overflow'), n += (a - t) * C, t = a, s = 0; s < w; ++s)
                      if (((v = e[s]) < t && ++n > u && A('overflow'), v == t)) {
                        for (f = n, p = c; !(f < (h = p <= i ? l : p >= i + d ? d : p - i)); p += c)
                          (b = f - h), (_ = c - h), E.push(S(R(h + (b % _), 0))), (f = x(b / _))
                        E.push(S(R(f, 0))), (i = T(n, C, r == o)), (n = 0), ++r
                      }
                    ++n, ++t
                  }
                  return E.join('')
                }
                if (
                  ((s = {
                    version: '1.3.2',
                    ucs2: { decode: I, encode: P },
                    decode: q,
                    encode: z,
                    toASCII: function (e) {
                      return O(e, function (e) {
                        return w.test(e) ? 'xn--' + z(e) : e
                      })
                    },
                    toUnicode: function (e) {
                      return O(e, function (e) {
                        return v.test(e) ? q(e.slice(4).toLowerCase()) : e
                      })
                    }
                  }),
                  r && o)
                )
                  if (e.exports == r) o.exports = s
                  else for (a in s) s.hasOwnProperty(a) && (r[a] = s[a])
                else n.punycode = s
              })(p)
            })(Nt, Ft)),
          Ft),
          (function () {
            return (
              jt ||
                ((jt = 1),
                (t = p),
                (n = function (e) {
                  var t = e && e.IPv6
                  return {
                    best: function (e) {
                      var t,
                        n,
                        r = e.toLowerCase().split(':'),
                        o = r.length,
                        i = 8
                      for (
                        '' === r[0] && '' === r[1] && '' === r[2]
                          ? (r.shift(), r.shift())
                          : '' === r[0] && '' === r[1]
                          ? r.shift()
                          : '' === r[o - 1] && '' === r[o - 2] && r.pop(),
                          -1 !== r[(o = r.length) - 1].indexOf('.') && (i = 7),
                          t = 0;
                        t < o && '' !== r[t];
                        t++
                      );
                      if (t < i) for (r.splice(t, 1, '0000'); r.length < i; ) r.splice(t, 0, '0000')
                      for (var s = 0; s < i; s++) {
                        n = r[s].split('')
                        for (var a = 0; a < 3 && '0' === n[0] && n.length > 1; a++) n.splice(0, 1)
                        r[s] = n.join('')
                      }
                      var u = -1,
                        c = 0,
                        l = 0,
                        d = -1,
                        f = !1
                      for (s = 0; s < i; s++)
                        f ? ('0' === r[s] ? (l += 1) : ((f = !1), l > c && ((u = d), (c = l)))) : '0' === r[s] && ((f = !0), (d = s), (l = 1))
                      l > c && ((u = d), (c = l)), c > 1 && r.splice(u, c, ''), (o = r.length)
                      var p = ''
                      for ('' === r[0] && (p = ':'), s = 0; s < o && ((p += r[s]), s !== o - 1); s++) p += ':'
                      return '' === r[o - 1] && (p += ':'), p
                    },
                    noConflict: function () {
                      return e.IPv6 === this && (e.IPv6 = t), this
                    }
                  }
                }),
                (e = Vt).exports ? (e.exports = n()) : (t.IPv6 = n(t))),
              Bt
            )
            var e, t, n
          })(),
          (function () {
            return (
              $t ||
                (($t = 1),
                (t = p),
                (n = function (e) {
                  var t = e && e.SecondLevelDomains,
                    n = {
                      list: {
                        ac: ' com gov mil net org ',
                        ae: ' ac co gov mil name net org pro sch ',
                        af: ' com edu gov net org ',
                        al: ' com edu gov mil net org ',
                        ao: ' co ed gv it og pb ',
                        ar: ' com edu gob gov int mil net org tur ',
                        at: ' ac co gv or ',
                        au: ' asn com csiro edu gov id net org ',
                        ba: ' co com edu gov mil net org rs unbi unmo unsa untz unze ',
                        bb: ' biz co com edu gov info net org store tv ',
                        bh: ' biz cc com edu gov info net org ',
                        bn: ' com edu gov net org ',
                        bo: ' com edu gob gov int mil net org tv ',
                        br: ' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
                        bs: ' com edu gov net org ',
                        bz: ' du et om ov rg ',
                        ca: ' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
                        ck: ' biz co edu gen gov info net org ',
                        cn: ' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
                        co: ' com edu gov mil net nom org ',
                        cr: ' ac c co ed fi go or sa ',
                        cy: ' ac biz com ekloges gov ltd name net org parliament press pro tm ',
                        do: ' art com edu gob gov mil net org sld web ',
                        dz: ' art asso com edu gov net org pol ',
                        ec: ' com edu fin gov info med mil net org pro ',
                        eg: ' com edu eun gov mil name net org sci ',
                        er: ' com edu gov ind mil net org rochest w ',
                        es: ' com edu gob nom org ',
                        et: ' biz com edu gov info name net org ',
                        fj: ' ac biz com info mil name net org pro ',
                        fk: ' ac co gov net nom org ',
                        fr: ' asso com f gouv nom prd presse tm ',
                        gg: ' co net org ',
                        gh: ' com edu gov mil org ',
                        gn: ' ac com gov net org ',
                        gr: ' com edu gov mil net org ',
                        gt: ' com edu gob ind mil net org ',
                        gu: ' com edu gov net org ',
                        hk: ' com edu gov idv net org ',
                        hu: ' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
                        id: ' ac co go mil net or sch web ',
                        il: ' ac co gov idf k12 muni net org ',
                        in: ' ac co edu ernet firm gen gov i ind mil net nic org res ',
                        iq: ' com edu gov i mil net org ',
                        ir: ' ac co dnssec gov i id net org sch ',
                        it: ' edu gov ',
                        je: ' co net org ',
                        jo: ' com edu gov mil name net org sch ',
                        jp: ' ac ad co ed go gr lg ne or ',
                        ke: ' ac co go info me mobi ne or sc ',
                        kh: ' com edu gov mil net org per ',
                        ki: ' biz com de edu gov info mob net org tel ',
                        km: ' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
                        kn: ' edu gov net org ',
                        kr: ' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
                        kw: ' com edu gov net org ',
                        ky: ' com edu gov net org ',
                        kz: ' com edu gov mil net org ',
                        lb: ' com edu gov net org ',
                        lk: ' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
                        lr: ' com edu gov net org ',
                        lv: ' asn com conf edu gov id mil net org ',
                        ly: ' com edu gov id med net org plc sch ',
                        ma: ' ac co gov m net org press ',
                        mc: ' asso tm ',
                        me: ' ac co edu gov its net org priv ',
                        mg: ' com edu gov mil nom org prd tm ',
                        mk: ' com edu gov inf name net org pro ',
                        ml: ' com edu gov net org presse ',
                        mn: ' edu gov org ',
                        mo: ' com edu gov net org ',
                        mt: ' com edu gov net org ',
                        mv: ' aero biz com coop edu gov info int mil museum name net org pro ',
                        mw: ' ac co com coop edu gov int museum net org ',
                        mx: ' com edu gob net org ',
                        my: ' com edu gov mil name net org sch ',
                        nf: ' arts com firm info net other per rec store web ',
                        ng: ' biz com edu gov mil mobi name net org sch ',
                        ni: ' ac co com edu gob mil net nom org ',
                        np: ' com edu gov mil net org ',
                        nr: ' biz com edu gov info net org ',
                        om: ' ac biz co com edu gov med mil museum net org pro sch ',
                        pe: ' com edu gob mil net nom org sld ',
                        ph: ' com edu gov i mil net ngo org ',
                        pk: ' biz com edu fam gob gok gon gop gos gov net org web ',
                        pl: ' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
                        pr: ' ac biz com edu est gov info isla name net org pro prof ',
                        ps: ' com edu gov net org plo sec ',
                        pw: ' belau co ed go ne or ',
                        ro: ' arts com firm info nom nt org rec store tm www ',
                        rs: ' ac co edu gov in org ',
                        sb: ' com edu gov net org ',
                        sc: ' com edu gov net org ',
                        sh: ' co com edu gov net nom org ',
                        sl: ' com edu gov net org ',
                        st: ' co com consulado edu embaixada gov mil net org principe saotome store ',
                        sv: ' com edu gob org red ',
                        sz: ' ac co org ',
                        tr: ' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
                        tt: ' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
                        tw: ' club com ebiz edu game gov idv mil net org ',
                        mu: ' ac co com gov net or org ',
                        mz: ' ac co edu gov org ',
                        na: ' co com ',
                        nz: ' ac co cri geek gen govt health iwi maori mil net org parliament school ',
                        pa: ' abo ac com edu gob ing med net nom org sld ',
                        pt: ' com edu gov int net nome org publ ',
                        py: ' com edu gov mil net org ',
                        qa: ' com edu gov mil net org ',
                        re: ' asso com nom ',
                        ru: ' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
                        rw: ' ac co com edu gouv gov int mil net ',
                        sa: ' com edu gov med net org pub sch ',
                        sd: ' com edu gov info med net org tv ',
                        se: ' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
                        sg: ' com edu gov idn net org per ',
                        sn: ' art com edu gouv org perso univ ',
                        sy: ' com edu gov mil net news org ',
                        th: ' ac co go in mi net or ',
                        tj: ' ac biz co com edu go gov info int mil name net nic org test web ',
                        tn: ' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
                        tz: ' ac co go ne or ',
                        ua: ' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
                        ug: ' ac co go ne or org sc ',
                        uk: ' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
                        us: ' dni fed isa kids nsn ',
                        uy: ' com edu gub mil net org ',
                        ve: ' co com edu gob info mil net org web ',
                        vi: ' co com k12 net org ',
                        vn: ' ac biz com edu gov health info int name net org pro ',
                        ye: ' co com gov ltd me net org plc ',
                        yu: ' ac co edu gov org ',
                        za: ' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
                        zm: ' ac co com edu gov net org sch ',
                        com: 'ar br cn de eu gb gr hu jpn kr no qc ru sa se uk us uy za ',
                        net: 'gb jp se uk ',
                        org: 'ae',
                        de: 'com '
                      },
                      has: function (e) {
                        var t = e.lastIndexOf('.')
                        if (t <= 0 || t >= e.length - 1) return !1
                        var r = e.lastIndexOf('.', t - 1)
                        if (r <= 0 || r >= t - 1) return !1
                        var o = n.list[e.slice(t + 1)]
                        return !!o && o.indexOf(' ' + e.slice(r + 1, t) + ' ') >= 0
                      },
                      is: function (e) {
                        var t = e.lastIndexOf('.')
                        if (t <= 0 || t >= e.length - 1) return !1
                        if (e.lastIndexOf('.', t - 1) >= 0) return !1
                        var r = n.list[e.slice(t + 1)]
                        return !!r && r.indexOf(' ' + e.slice(0, t) + ' ') >= 0
                      },
                      get: function (e) {
                        var t = e.lastIndexOf('.')
                        if (t <= 0 || t >= e.length - 1) return null
                        var r = e.lastIndexOf('.', t - 1)
                        if (r <= 0 || r >= t - 1) return null
                        var o = n.list[e.slice(t + 1)]
                        return o ? (o.indexOf(' ' + e.slice(r + 1, t) + ' ') < 0 ? null : e.slice(r + 1)) : null
                      },
                      noConflict: function () {
                        return e.SecondLevelDomains === this && (e.SecondLevelDomains = t), this
                      }
                    }
                  return n
                }),
                (e = Yt).exports ? (e.exports = n()) : (t.SecondLevelDomains = n(t))),
              Ht
            )
            var e, t, n
          })()
        ))
      : (Qt.URI = Wt(Qt.punycode, Qt.IPv6, Qt.SecondLevelDomains, Qt))
  var Zt = Ut
  function Jt(e, t) {
    if (null === e || 'object' != typeof e) return e
    t = r.defaultValue(t, !1)
    const n = new e.constructor()
    for (const r in e)
      if (e.hasOwnProperty(r)) {
        let o = e[r]
        t && (o = Jt(o, t)), (n[r] = o)
      }
    return n
  }
  function Xt() {
    let e, t
    const n = new Promise(function (n, r) {
      ;(e = n), (t = r)
    })
    return { resolve: e, reject: t, promise: n }
  }
  function Gt(e, t) {
    let n
    return 'undefined' != typeof document && (n = document), Gt._implementation(e, t, n)
  }
  Gt._implementation = function (e, t, n) {
    if (!r.defined(t)) {
      if (void 0 === n) return e
      t = r.defaultValue(n.baseURI, n.location.href)
    }
    const o = new Zt(e)
    return '' !== o.scheme() ? o.toString() : o.absoluteTo(t).toString()
  }
  const Kt = {}
  function en(e, t, n) {
    r.defined(t) || (t = e.width), r.defined(n) || (n = e.height)
    let o = Kt[t]
    r.defined(o) || ((o = {}), (Kt[t] = o))
    let i = o[n]
    if (!r.defined(i)) {
      const e = document.createElement('canvas')
      ;(e.width = t), (e.height = n), (i = e.getContext('2d', { willReadFrequently: !0 })), (i.globalCompositeOperation = 'copy'), (o[n] = i)
    }
    return i.drawImage(e, 0, 0, t, n), i.getImageData(0, 0, t, n).data
  }
  const tn = /^blob:/i
  function nn(e) {
    return tn.test(e)
  }
  let rn
  const on = /^data:/i
  function sn(e) {
    return on.test(e)
  }
  var an = Object.freeze({ UNISSUED: 0, ISSUED: 1, ACTIVE: 2, RECEIVED: 3, CANCELLED: 4, FAILED: 5 })
  var un = Object.freeze({ TERRAIN: 0, IMAGERY: 1, TILES3D: 2, OTHER: 3 })
  function cn(e) {
    e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)
    const t = r.defaultValue(e.throttleByServer, !1),
      n = r.defaultValue(e.throttle, !1)
    ;(this.url = e.url),
      (this.requestFunction = e.requestFunction),
      (this.cancelFunction = e.cancelFunction),
      (this.priorityFunction = e.priorityFunction),
      (this.priority = r.defaultValue(e.priority, 0)),
      (this.throttle = n),
      (this.throttleByServer = t),
      (this.type = r.defaultValue(e.type, un.OTHER)),
      (this.serverKey = void 0),
      (this.state = an.UNISSUED),
      (this.deferred = void 0),
      (this.cancelled = !1)
  }
  function ln(e, t, n) {
    ;(this.statusCode = e),
      (this.response = t),
      (this.responseHeaders = n),
      'string' == typeof this.responseHeaders &&
        (this.responseHeaders = (function (e) {
          const t = {}
          if (!e) return t
          const n = e.split('\r\n')
          for (let e = 0; e < n.length; ++e) {
            const r = n[e],
              o = r.indexOf(': ')
            if (o > 0) {
              const e = r.substring(0, o),
                n = r.substring(o + 2)
              t[e] = n
            }
          }
          return t
        })(this.responseHeaders))
  }
  function dn() {
    ;(this._listeners = []), (this._scopes = []), (this._toRemove = []), (this._insideRaiseEvent = !1)
  }
  function fn(e, t) {
    return t - e
  }
  function pn(e) {
    ;(this._comparator = e.comparator), (this._array = []), (this._length = 0), (this._maximumLength = void 0)
  }
  function hn(e, t, n) {
    const r = e[t]
    ;(e[t] = e[n]), (e[n] = r)
  }
  ;(cn.prototype.cancel = function () {
    this.cancelled = !0
  }),
    (cn.prototype.clone = function (e) {
      return r.defined(e)
        ? ((e.url = this.url),
          (e.requestFunction = this.requestFunction),
          (e.cancelFunction = this.cancelFunction),
          (e.priorityFunction = this.priorityFunction),
          (e.priority = this.priority),
          (e.throttle = this.throttle),
          (e.throttleByServer = this.throttleByServer),
          (e.type = this.type),
          (e.serverKey = this.serverKey),
          (e.state = this.RequestState.UNISSUED),
          (e.deferred = void 0),
          (e.cancelled = !1),
          e)
        : new cn(this)
    }),
    (ln.prototype.toString = function () {
      let e = 'Request has failed.'
      return r.defined(this.statusCode) && (e += ` Status Code: ${this.statusCode}`), e
    }),
    Object.defineProperties(dn.prototype, {
      numberOfListeners: {
        get: function () {
          return this._listeners.length - this._toRemove.length
        }
      }
    }),
    (dn.prototype.addEventListener = function (e, t) {
      this._listeners.push(e), this._scopes.push(t)
      const n = this
      return function () {
        n.removeEventListener(e, t)
      }
    }),
    (dn.prototype.removeEventListener = function (e, t) {
      const n = this._listeners,
        r = this._scopes
      let o = -1
      for (let i = 0; i < n.length; i++)
        if (n[i] === e && r[i] === t) {
          o = i
          break
        }
      return -1 !== o && (this._insideRaiseEvent ? (this._toRemove.push(o), (n[o] = void 0), (r[o] = void 0)) : (n.splice(o, 1), r.splice(o, 1)), !0)
    }),
    (dn.prototype.raiseEvent = function () {
      let e
      this._insideRaiseEvent = !0
      const t = this._listeners,
        n = this._scopes
      let o = t.length
      for (e = 0; e < o; e++) {
        const o = t[e]
        r.defined(o) && t[e].apply(n[e], arguments)
      }
      const i = this._toRemove
      if (((o = i.length), o > 0)) {
        for (i.sort(fn), e = 0; e < o; e++) {
          const r = i[e]
          t.splice(r, 1), n.splice(r, 1)
        }
        i.length = 0
      }
      this._insideRaiseEvent = !1
    }),
    Object.defineProperties(pn.prototype, {
      length: {
        get: function () {
          return this._length
        }
      },
      internalArray: {
        get: function () {
          return this._array
        }
      },
      maximumLength: {
        get: function () {
          return this._maximumLength
        },
        set: function (e) {
          const t = this._length
          if (e < t) {
            const n = this._array
            for (let r = e; r < t; ++r) n[r] = void 0
            ;(this._length = e), (n.length = e)
          }
          this._maximumLength = e
        }
      },
      comparator: {
        get: function () {
          return this._comparator
        }
      }
    }),
    (pn.prototype.reserve = function (e) {
      ;(e = r.defaultValue(e, this._length)), (this._array.length = e)
    }),
    (pn.prototype.heapify = function (e) {
      e = r.defaultValue(e, 0)
      const t = this._length,
        n = this._comparator,
        o = this._array
      let i = -1,
        s = !0
      for (; s; ) {
        const r = 2 * (e + 1),
          a = r - 1
        ;(i = a < t && n(o[a], o[e]) < 0 ? a : e), r < t && n(o[r], o[i]) < 0 && (i = r), i !== e ? (hn(o, i, e), (e = i)) : (s = !1)
      }
    }),
    (pn.prototype.resort = function () {
      const e = this._length
      for (let t = Math.ceil(e / 2); t >= 0; --t) this.heapify(t)
    }),
    (pn.prototype.insert = function (e) {
      const t = this._array,
        n = this._comparator,
        o = this._maximumLength
      let i,
        s = this._length++
      for (s < t.length ? (t[s] = e) : t.push(e); 0 !== s; ) {
        const e = Math.floor((s - 1) / 2)
        if (!(n(t[s], t[e]) < 0)) break
        hn(t, s, e), (s = e)
      }
      return r.defined(o) && this._length > o && ((i = t[o]), (this._length = o)), i
    }),
    (pn.prototype.pop = function (e) {
      if (((e = r.defaultValue(e, 0)), 0 === this._length)) return
      const t = this._array,
        n = t[e]
      return hn(t, e, --this._length), this.heapify(e), (t[this._length] = void 0), n
    })
  const mn = {
    numberOfAttemptedRequests: 0,
    numberOfActiveRequests: 0,
    numberOfCancelledRequests: 0,
    numberOfCancelledActiveRequests: 0,
    numberOfFailedRequests: 0,
    numberOfActiveRequestsEver: 0,
    lastNumberOfActiveRequests: 0
  }
  let gn = 20
  const yn = new pn({
    comparator: function (e, t) {
      return e.priority - t.priority
    }
  })
  ;(yn.maximumLength = gn), yn.reserve(gn)
  const vn = []
  let wn = {}
  const Cn = 'undefined' != typeof document ? new Zt(document.location.href) : new Zt(),
    _n = new dn()
  function bn() {}
  function xn(e) {
    r.defined(e.priorityFunction) && (e.priority = e.priorityFunction())
  }
  function Sn(e) {
    return e.state === an.UNISSUED && ((e.state = an.ISSUED), (e.deferred = Xt())), e.deferred.promise
  }
  function An(e) {
    const t = Sn(e)
    return (
      (e.state = an.ACTIVE),
      vn.push(e),
      ++mn.numberOfActiveRequests,
      ++mn.numberOfActiveRequestsEver,
      ++wn[e.serverKey],
      e
        .requestFunction()
        .then(
          (function (e) {
            return function (t) {
              if (e.state === an.CANCELLED) return
              const n = e.deferred
              --mn.numberOfActiveRequests, --wn[e.serverKey], _n.raiseEvent(), (e.state = an.RECEIVED), (e.deferred = void 0), n.resolve(t)
            }
          })(e)
        )
        .catch(
          (function (e) {
            return function (t) {
              e.state !== an.CANCELLED &&
                (++mn.numberOfFailedRequests,
                --mn.numberOfActiveRequests,
                --wn[e.serverKey],
                _n.raiseEvent(t),
                (e.state = an.FAILED),
                e.deferred.reject(t))
            }
          })(e)
        ),
      t
    )
  }
  function En(e) {
    const t = e.state === an.ACTIVE
    if (((e.state = an.CANCELLED), ++mn.numberOfCancelledRequests, r.defined(e.deferred))) {
      const t = e.deferred
      ;(e.deferred = void 0), t.reject()
    }
    t && (--mn.numberOfActiveRequests, --wn[e.serverKey], ++mn.numberOfCancelledActiveRequests), r.defined(e.cancelFunction) && e.cancelFunction()
  }
  ;(bn.maximumRequests = 50),
    (bn.maximumRequestsPerServer = 6),
    (bn.requestsByServer = { 'api.cesium.com:443': 18, 'assets.ion.cesium.com:443': 18 }),
    (bn.throttleRequests = !0),
    (bn.debugShowStatistics = !1),
    (bn.requestCompletedEvent = _n),
    Object.defineProperties(bn, {
      statistics: {
        get: function () {
          return mn
        }
      },
      priorityHeapLength: {
        get: function () {
          return gn
        },
        set: function (e) {
          if (e < gn)
            for (; yn.length > e; ) {
              En(yn.pop())
            }
          ;(gn = e), (yn.maximumLength = e), yn.reserve(e)
        }
      }
    }),
    (bn.serverHasOpenSlots = function (e, t) {
      t = r.defaultValue(t, 1)
      const n = r.defaultValue(bn.requestsByServer[e], bn.maximumRequestsPerServer)
      return wn[e] + t <= n
    }),
    (bn.heapHasOpenSlots = function (e) {
      return yn.length + e <= gn
    }),
    (bn.update = function () {
      let e,
        t,
        n = 0
      const r = vn.length
      for (e = 0; e < r; ++e) (t = vn[e]), t.cancelled && En(t), t.state === an.ACTIVE ? n > 0 && (vn[e - n] = t) : ++n
      vn.length -= n
      const o = yn.internalArray,
        i = yn.length
      for (e = 0; e < i; ++e) xn(o[e])
      yn.resort()
      const s = Math.max(bn.maximumRequests - vn.length, 0)
      let a = 0
      for (; a < s && yn.length > 0; )
        (t = yn.pop()), t.cancelled ? En(t) : !t.throttleByServer || bn.serverHasOpenSlots(t.serverKey) ? (An(t), ++a) : En(t)
      !(function () {
        if (!bn.debugShowStatistics) return
        0 === mn.numberOfActiveRequests &&
          mn.lastNumberOfActiveRequests > 0 &&
          (mn.numberOfAttemptedRequests > 0 &&
            (console.log(`Number of attempted requests: ${mn.numberOfAttemptedRequests}`), (mn.numberOfAttemptedRequests = 0)),
          mn.numberOfCancelledRequests > 0 &&
            (console.log(`Number of cancelled requests: ${mn.numberOfCancelledRequests}`), (mn.numberOfCancelledRequests = 0)),
          mn.numberOfCancelledActiveRequests > 0 &&
            (console.log(`Number of cancelled active requests: ${mn.numberOfCancelledActiveRequests}`), (mn.numberOfCancelledActiveRequests = 0)),
          mn.numberOfFailedRequests > 0 && (console.log(`Number of failed requests: ${mn.numberOfFailedRequests}`), (mn.numberOfFailedRequests = 0)))
        mn.lastNumberOfActiveRequests = mn.numberOfActiveRequests
      })()
    }),
    (bn.getServerKey = function (e) {
      let t = new Zt(e)
      '' === t.scheme() && ((t = new Zt(e).absoluteTo(Cn)), t.normalize())
      let n = t.authority()
      ;/:/.test(n) || (n = `${n}:${'https' === t.scheme() ? '443' : '80'}`)
      const o = wn[n]
      return r.defined(o) || (wn[n] = 0), n
    }),
    (bn.request = function (e) {
      if (sn(e.url) || nn(e.url)) return _n.raiseEvent(), (e.state = an.RECEIVED), e.requestFunction()
      if (
        (++mn.numberOfAttemptedRequests,
        r.defined(e.serverKey) || (e.serverKey = bn.getServerKey(e.url)),
        bn.throttleRequests && e.throttleByServer && !bn.serverHasOpenSlots(e.serverKey))
      )
        return
      if (!bn.throttleRequests || !e.throttle) return An(e)
      if (vn.length >= bn.maximumRequests) return
      xn(e)
      const t = yn.insert(e)
      if (r.defined(t)) {
        if (t === e) return
        En(t)
      }
      return Sn(e)
    }),
    (bn.clearForSpecs = function () {
      for (; yn.length > 0; ) {
        En(yn.pop())
      }
      const e = vn.length
      for (let t = 0; t < e; ++t) En(vn[t])
      ;(vn.length = 0),
        (wn = {}),
        (mn.numberOfAttemptedRequests = 0),
        (mn.numberOfActiveRequests = 0),
        (mn.numberOfCancelledRequests = 0),
        (mn.numberOfCancelledActiveRequests = 0),
        (mn.numberOfFailedRequests = 0),
        (mn.numberOfActiveRequestsEver = 0),
        (mn.lastNumberOfActiveRequests = 0)
    }),
    (bn.numberOfActiveRequestsByServer = function (e) {
      return wn[e]
    }),
    (bn.requestHeap = yn)
  const On = {}
  let In = {}
  ;(On.add = function (e, t) {
    const n = `${e.toLowerCase()}:${t}`
    r.defined(In[n]) || (In[n] = !0)
  }),
    (On.remove = function (e, t) {
      const n = `${e.toLowerCase()}:${t}`
      r.defined(In[n]) && delete In[n]
    }),
    (On.contains = function (e) {
      const t = (function (e) {
        const t = new Zt(e)
        t.normalize()
        let n = t.authority()
        if (0 !== n.length) {
          if ((t.authority(n), -1 !== n.indexOf('@'))) {
            const e = n.split('@')
            n = e[1]
          }
          if (-1 === n.indexOf(':')) {
            let e = t.scheme()
            if ((0 === e.length && ((e = window.location.protocol), (e = e.substring(0, e.length - 1))), 'http' === e)) n += ':80'
            else {
              if ('https' !== e) return
              n += ':443'
            }
          }
          return n
        }
      })(e)
      return !(!r.defined(t) || !r.defined(In[t]))
    }),
    (On.clear = function () {
      In = {}
    })
  var Pn = On
  const Rn = (function () {
    try {
      const e = new XMLHttpRequest()
      return e.open('GET', '#', !0), (e.responseType = 'blob'), 'blob' === e.responseType
    } catch (e) {
      return !1
    }
  })()
  function Tn(e, t, n, o) {
    const i = e.query()
    if (0 === i.length) return {}
    let s
    if (-1 === i.indexOf('=')) {
      const e = {}
      ;(e[i] = void 0), (s = e)
    } else
      s = (function (e) {
        const t = {}
        if ('' === e) return t
        const n = e.replace(/\+/g, '%20').split(/[&;]/)
        for (let e = 0, o = n.length; e < o; ++e) {
          const o = n[e].split('='),
            i = decodeURIComponent(o[0])
          let s = o[1]
          s = r.defined(s) ? decodeURIComponent(s) : ''
          const a = t[i]
          'string' == typeof a ? (t[i] = [a, s]) : Array.isArray(a) ? a.push(s) : (t[i] = s)
        }
        return t
      })(i)
    ;(t._queryParameters = n ? Dn(s, t._queryParameters, o) : s), e.search('')
  }
  function qn(e, t) {
    const n = t._queryParameters,
      o = Object.keys(n)
    1 !== o.length || r.defined(n[o[0]])
      ? e.search(
          (function (e) {
            let t = ''
            for (const n in e)
              if (e.hasOwnProperty(n)) {
                const r = e[n],
                  o = `${encodeURIComponent(n)}=`
                if (Array.isArray(r)) for (let e = 0, n = r.length; e < n; ++e) t += `${o + encodeURIComponent(r[e])}&`
                else t += `${o + encodeURIComponent(r)}&`
              }
            return (t = t.slice(0, -1)), t
          })(n)
        )
      : e.search(o[0])
  }
  function zn(e, t) {
    return r.defined(e) ? (r.defined(e.clone) ? e.clone() : Jt(e)) : t
  }
  function Mn(e) {
    if (e.state === an.ISSUED || e.state === an.ACTIVE) throw new a.RuntimeError('The Resource is already being fetched.')
    ;(e.state = an.UNISSUED), (e.deferred = void 0)
  }
  function Dn(e, t, n) {
    if (!n) return s.combine(e, t)
    const o = Jt(e, !0)
    for (const e in t)
      if (t.hasOwnProperty(e)) {
        let n = o[e]
        const i = t[e]
        r.defined(n) ? (Array.isArray(n) || (n = o[e] = [n]), (o[e] = n.concat(i))) : (o[e] = Array.isArray(i) ? i.slice() : i)
      }
    return o
  }
  function Un(e) {
    'string' == typeof (e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)) && (e = { url: e }),
      (this._url = void 0),
      (this._templateValues = zn(e.templateValues, {})),
      (this._queryParameters = zn(e.queryParameters, {})),
      (this.headers = zn(e.headers, {})),
      (this.request = r.defaultValue(e.request, new cn())),
      (this.proxy = e.proxy),
      (this.retryCallback = e.retryCallback),
      (this.retryAttempts = r.defaultValue(e.retryAttempts, 0)),
      (this._retryCount = 0)
    const t = new Zt(e.url)
    Tn(t, this, !0, !0), t.fragment(''), (this._url = t.toString())
  }
  let kn
  function Fn(e) {
    const t = e.resource,
      n = e.flipY,
      o = e.skipColorSpaceConversion,
      i = e.preferImageBitmap,
      s = t.request
    ;(s.url = t.url),
      (s.requestFunction = function () {
        let e = !1
        t.isDataUri || t.isBlobUri || (e = t.isCrossOriginUrl)
        const r = Xt()
        return Un._Implementations.createImage(s, e, r, n, o, i), r.promise
      })
    const a = bn.request(s)
    if (r.defined(a))
      return a.catch(function (e) {
        return s.state !== an.FAILED
          ? Promise.reject(e)
          : t.retryOnError(e).then(function (r) {
              return r
                ? ((s.state = an.UNISSUED), (s.deferred = void 0), Fn({ resource: t, flipY: n, skipColorSpaceConversion: o, preferImageBitmap: i }))
                : Promise.reject(e)
            })
      })
  }
  function Nn(e, t, n) {
    const o = {}
    ;(o[t] = n), e.setQueryParameters(o)
    const i = e.request
    ;(i.url = e.url),
      (i.requestFunction = function () {
        const t = Xt()
        return (
          (window[n] = function (e) {
            t.resolve(e)
            try {
              delete window[n]
            } catch (e) {
              window[n] = void 0
            }
          }),
          Un._Implementations.loadAndExecuteScript(e.url, n, t),
          t.promise
        )
      })
    const s = bn.request(i)
    if (r.defined(s))
      return s.catch(function (r) {
        return i.state !== an.FAILED
          ? Promise.reject(r)
          : e.retryOnError(r).then(function (o) {
              return o ? ((i.state = an.UNISSUED), (i.deferred = void 0), Nn(e, t, n)) : Promise.reject(r)
            })
      })
  }
  ;(Un.createIfNeeded = function (e) {
    return e instanceof Un ? e.getDerivedResource({ request: e.request }) : 'string' != typeof e ? e : new Un({ url: e })
  }),
    (Un.supportsImageBitmapOptions = function () {
      if (r.defined(kn)) return kn
      if ('function' != typeof createImageBitmap) return (kn = Promise.resolve(!1)), kn
      return (
        (kn = Un.fetchBlob({
          url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAABGdBTUEAAE4g3rEiDgAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAADElEQVQI12Ng6GAAAAEUAIngE3ZiAAAAAElFTkSuQmCC'
        })
          .then(function (e) {
            return Promise.all([
              createImageBitmap(e, { imageOrientation: 'flipY', premultiplyAlpha: 'none', colorSpaceConversion: 'none' }),
              createImageBitmap(e)
            ])
          })
          .then(function (e) {
            const t = en(e[0]),
              n = en(e[1])
            return t[1] !== n[1]
          })
          .catch(function () {
            return !1
          })),
        kn
      )
    }),
    Object.defineProperties(Un, {
      isBlobSupported: {
        get: function () {
          return Rn
        }
      }
    }),
    Object.defineProperties(Un.prototype, {
      queryParameters: {
        get: function () {
          return this._queryParameters
        }
      },
      templateValues: {
        get: function () {
          return this._templateValues
        }
      },
      url: {
        get: function () {
          return this.getUrlComponent(!0, !0)
        },
        set: function (e) {
          const t = new Zt(e)
          Tn(t, this, !1), t.fragment(''), (this._url = t.toString())
        }
      },
      extension: {
        get: function () {
          return (function (e) {
            const t = new Zt(e)
            t.normalize()
            let n = t.path(),
              r = n.lastIndexOf('/')
            return -1 !== r && (n = n.substr(r + 1)), (r = n.lastIndexOf('.')), (n = -1 === r ? '' : n.substr(r + 1)), n
          })(this._url)
        }
      },
      isDataUri: {
        get: function () {
          return sn(this._url)
        }
      },
      isBlobUri: {
        get: function () {
          return nn(this._url)
        }
      },
      isCrossOriginUrl: {
        get: function () {
          return (function (e) {
            r.defined(rn) || (rn = document.createElement('a')), (rn.href = window.location.href)
            const t = rn.host,
              n = rn.protocol
            return (rn.href = e), (rn.href = rn.href), n !== rn.protocol || t !== rn.host
          })(this._url)
        }
      },
      hasHeaders: {
        get: function () {
          return Object.keys(this.headers).length > 0
        }
      }
    }),
    (Un.prototype.toString = function () {
      return this.getUrlComponent(!0, !0)
    }),
    (Un.prototype.getUrlComponent = function (e, t) {
      if (this.isDataUri) return this._url
      const n = new Zt(this._url)
      e && qn(n, this)
      let o = n.toString().replace(/%7B/g, '{').replace(/%7D/g, '}')
      const i = this._templateValues
      return (
        (o = o.replace(/{(.*?)}/g, function (e, t) {
          const n = i[t]
          return r.defined(n) ? encodeURIComponent(n) : e
        })),
        t && r.defined(this.proxy) && (o = this.proxy.getURL(o)),
        o
      )
    }),
    (Un.prototype.setQueryParameters = function (e, t) {
      this._queryParameters = t ? Dn(this._queryParameters, e, !1) : Dn(e, this._queryParameters, !1)
    }),
    (Un.prototype.appendQueryParameters = function (e) {
      this._queryParameters = Dn(e, this._queryParameters, !0)
    }),
    (Un.prototype.setTemplateValues = function (e, t) {
      this._templateValues = t ? s.combine(this._templateValues, e) : s.combine(e, this._templateValues)
    }),
    (Un.prototype.getDerivedResource = function (e) {
      const t = this.clone()
      if (((t._retryCount = 0), r.defined(e.url))) {
        const n = new Zt(e.url)
        Tn(n, t, !0, r.defaultValue(e.preserveQueryParameters, !1)),
          n.fragment(''),
          '' !== n.scheme() ? (t._url = n.toString()) : (t._url = n.absoluteTo(new Zt(Gt(this._url))).toString())
      }
      return (
        r.defined(e.queryParameters) && (t._queryParameters = s.combine(e.queryParameters, t._queryParameters)),
        r.defined(e.templateValues) && (t._templateValues = s.combine(e.templateValues, t.templateValues)),
        r.defined(e.headers) && (t.headers = s.combine(e.headers, t.headers)),
        r.defined(e.proxy) && (t.proxy = e.proxy),
        r.defined(e.request) && (t.request = e.request),
        r.defined(e.retryCallback) && (t.retryCallback = e.retryCallback),
        r.defined(e.retryAttempts) && (t.retryAttempts = e.retryAttempts),
        t
      )
    }),
    (Un.prototype.retryOnError = function (e) {
      const t = this.retryCallback
      if ('function' != typeof t || this._retryCount >= this.retryAttempts) return Promise.resolve(!1)
      const n = this
      return Promise.resolve(t(this, e)).then(function (e) {
        return ++n._retryCount, e
      })
    }),
    (Un.prototype.clone = function (e) {
      return (
        r.defined(e) || (e = new Un({ url: this._url })),
        (e._url = this._url),
        (e._queryParameters = Jt(this._queryParameters)),
        (e._templateValues = Jt(this._templateValues)),
        (e.headers = Jt(this.headers)),
        (e.proxy = this.proxy),
        (e.retryCallback = this.retryCallback),
        (e.retryAttempts = this.retryAttempts),
        (e._retryCount = 0),
        (e.request = this.request.clone()),
        e
      )
    }),
    (Un.prototype.getBaseUri = function (e) {
      return (function (e, t) {
        let n = ''
        const r = e.lastIndexOf('/')
        return (
          -1 !== r && (n = e.substring(0, r + 1)),
          t ? (0 !== (e = new Zt(e)).query().length && (n += `?${e.query()}`), 0 !== e.fragment().length && (n += `#${e.fragment()}`), n) : n
        )
      })(this.getUrlComponent(e), e)
    }),
    (Un.prototype.appendForwardSlash = function () {
      var e
      this._url = ((0 !== (e = this._url).length && '/' === e[e.length - 1]) || (e = `${e}/`), e)
    }),
    (Un.prototype.fetchArrayBuffer = function () {
      return this.fetch({ responseType: 'arraybuffer' })
    }),
    (Un.fetchArrayBuffer = function (e) {
      return new Un(e).fetchArrayBuffer()
    }),
    (Un.prototype.fetchBlob = function () {
      return this.fetch({ responseType: 'blob' })
    }),
    (Un.fetchBlob = function (e) {
      return new Un(e).fetchBlob()
    }),
    (Un.prototype.fetchImage = function (e) {
      e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)
      const t = r.defaultValue(e.preferImageBitmap, !1),
        n = r.defaultValue(e.preferBlob, !1),
        o = r.defaultValue(e.flipY, !1),
        i = r.defaultValue(e.skipColorSpaceConversion, !1)
      if ((Mn(this.request), !Rn || this.isDataUri || this.isBlobUri || (!this.hasHeaders && !n)))
        return Fn({ resource: this, flipY: o, skipColorSpaceConversion: i, preferImageBitmap: t })
      const s = this.fetchBlob()
      if (!r.defined(s)) return
      let a, u, c, l
      return Un.supportsImageBitmapOptions()
        .then(function (e) {
          return (a = e), (u = a && t), s
        })
        .then(function (e) {
          if (!r.defined(e)) return
          if (((l = e), u)) return Un.createImageBitmapFromBlob(e, { flipY: o, premultiplyAlpha: !1, skipColorSpaceConversion: i })
          const t = window.URL.createObjectURL(e)
          return (c = new Un({ url: t })), Fn({ resource: c, flipY: o, skipColorSpaceConversion: i, preferImageBitmap: !1 })
        })
        .then(function (e) {
          if (r.defined(e)) return (e.blob = l), u || window.URL.revokeObjectURL(c.url), e
        })
        .catch(function (e) {
          return r.defined(c) && window.URL.revokeObjectURL(c.url), (e.blob = l), Promise.reject(e)
        })
    }),
    (Un.fetchImage = function (e) {
      return new Un(e).fetchImage({
        flipY: e.flipY,
        skipColorSpaceConversion: e.skipColorSpaceConversion,
        preferBlob: e.preferBlob,
        preferImageBitmap: e.preferImageBitmap
      })
    }),
    (Un.prototype.fetchText = function () {
      return this.fetch({ responseType: 'text' })
    }),
    (Un.fetchText = function (e) {
      return new Un(e).fetchText()
    }),
    (Un.prototype.fetchJson = function () {
      const e = this.fetch({ responseType: 'text', headers: { Accept: 'application/json,*/*;q=0.01' } })
      if (r.defined(e))
        return e.then(function (e) {
          if (r.defined(e)) return JSON.parse(e)
        })
    }),
    (Un.fetchJson = function (e) {
      return new Un(e).fetchJson()
    }),
    (Un.prototype.fetchXML = function () {
      return this.fetch({ responseType: 'document', overrideMimeType: 'text/xml' })
    }),
    (Un.fetchXML = function (e) {
      return new Un(e).fetchXML()
    }),
    (Un.prototype.fetchJsonp = function (e) {
      let t
      ;(e = r.defaultValue(e, 'callback')), Mn(this.request)
      do {
        t = `loadJsonp${o.CesiumMath.nextRandomNumber().toString().substring(2, 8)}`
      } while (r.defined(window[t]))
      return Nn(this, e, t)
    }),
    (Un.fetchJsonp = function (e) {
      return new Un(e).fetchJsonp(e.callbackParameterName)
    }),
    (Un.prototype._makeRequest = function (e) {
      const t = this
      Mn(t.request)
      const n = t.request
      ;(n.url = t.url),
        (n.requestFunction = function () {
          const o = e.responseType,
            i = s.combine(e.headers, t.headers),
            a = e.overrideMimeType,
            u = e.method,
            c = e.data,
            l = Xt(),
            d = Un._Implementations.loadWithXhr(t.url, o, u, c, i, l, a)
          return (
            r.defined(d) &&
              r.defined(d.abort) &&
              (n.cancelFunction = function () {
                d.abort()
              }),
            l.promise
          )
        })
      const o = bn.request(n)
      if (r.defined(o))
        return o
          .then(function (e) {
            return (n.cancelFunction = void 0), e
          })
          .catch(function (r) {
            return (
              (n.cancelFunction = void 0),
              n.state !== an.FAILED
                ? Promise.reject(r)
                : t.retryOnError(r).then(function (o) {
                    return o ? ((n.state = an.UNISSUED), (n.deferred = void 0), t.fetch(e)) : Promise.reject(r)
                  })
            )
          })
    })
  const jn = /^data:(.*?)(;base64)?,(.*)$/
  function Bn(e, t) {
    const n = decodeURIComponent(t)
    return e ? atob(n) : n
  }
  function Vn(e, t) {
    const n = Bn(e, t),
      r = new ArrayBuffer(n.length),
      o = new Uint8Array(r)
    for (let e = 0; e < n.length; e++) o[e] = n.charCodeAt(e)
    return r
  }
  function $n(e, t) {
    switch (t) {
      case 'text':
        return e.toString('utf8')
      case 'json':
        return JSON.parse(e.toString('utf8'))
      default:
        return new Uint8Array(e).buffer
    }
  }
  ;(Un.prototype.fetch = function (e) {
    return ((e = zn(e, {})).method = 'GET'), this._makeRequest(e)
  }),
    (Un.fetch = function (e) {
      return new Un(e).fetch({ responseType: e.responseType, overrideMimeType: e.overrideMimeType })
    }),
    (Un.prototype.delete = function (e) {
      return ((e = zn(e, {})).method = 'DELETE'), this._makeRequest(e)
    }),
    (Un.delete = function (e) {
      return new Un(e).delete({ responseType: e.responseType, overrideMimeType: e.overrideMimeType, data: e.data })
    }),
    (Un.prototype.head = function (e) {
      return ((e = zn(e, {})).method = 'HEAD'), this._makeRequest(e)
    }),
    (Un.head = function (e) {
      return new Un(e).head({ responseType: e.responseType, overrideMimeType: e.overrideMimeType })
    }),
    (Un.prototype.options = function (e) {
      return ((e = zn(e, {})).method = 'OPTIONS'), this._makeRequest(e)
    }),
    (Un.options = function (e) {
      return new Un(e).options({ responseType: e.responseType, overrideMimeType: e.overrideMimeType })
    }),
    (Un.prototype.post = function (e, t) {
      return f.defined('data', e), ((t = zn(t, {})).method = 'POST'), (t.data = e), this._makeRequest(t)
    }),
    (Un.post = function (e) {
      return new Un(e).post(e.data, { responseType: e.responseType, overrideMimeType: e.overrideMimeType })
    }),
    (Un.prototype.put = function (e, t) {
      return f.defined('data', e), ((t = zn(t, {})).method = 'PUT'), (t.data = e), this._makeRequest(t)
    }),
    (Un.put = function (e) {
      return new Un(e).put(e.data, { responseType: e.responseType, overrideMimeType: e.overrideMimeType })
    }),
    (Un.prototype.patch = function (e, t) {
      return f.defined('data', e), ((t = zn(t, {})).method = 'PATCH'), (t.data = e), this._makeRequest(t)
    }),
    (Un.patch = function (e) {
      return new Un(e).patch(e.data, { responseType: e.responseType, overrideMimeType: e.overrideMimeType })
    }),
    (Un._Implementations = {}),
    (Un._Implementations.loadImageElement = function (e, t, n) {
      const r = new Image()
      ;(r.onload = function () {
        0 === r.naturalWidth && 0 === r.naturalHeight && 0 === r.width && 0 === r.height && ((r.width = 300), (r.height = 150)), n.resolve(r)
      }),
        (r.onerror = function (e) {
          n.reject(e)
        }),
        t && (Pn.contains(e) ? (r.crossOrigin = 'use-credentials') : (r.crossOrigin = '')),
        (r.src = e)
    }),
    (Un._Implementations.createImage = function (e, t, n, o, i, s) {
      const u = e.url
      Un.supportsImageBitmapOptions()
        .then(function (c) {
          if (!c || !s) return void Un._Implementations.loadImageElement(u, t, n)
          const l = Xt(),
            d = Un._Implementations.loadWithXhr(u, 'blob', 'GET', void 0, void 0, l, void 0, void 0, void 0)
          return (
            r.defined(d) &&
              r.defined(d.abort) &&
              (e.cancelFunction = function () {
                d.abort()
              }),
            l.promise
              .then(function (e) {
                if (r.defined(e)) return Un.createImageBitmapFromBlob(e, { flipY: o, premultiplyAlpha: !1, skipColorSpaceConversion: i })
                n.reject(new a.RuntimeError(`Successfully retrieved ${u} but it contained no content.`))
              })
              .then(function (e) {
                n.resolve(e)
              })
          )
        })
        .catch(function (e) {
          n.reject(e)
        })
    }),
    (Un.createImageBitmapFromBlob = function (e, t) {
      return (
        f.defined('options', t),
        f.typeOf.bool('options.flipY', t.flipY),
        f.typeOf.bool('options.premultiplyAlpha', t.premultiplyAlpha),
        f.typeOf.bool('options.skipColorSpaceConversion', t.skipColorSpaceConversion),
        createImageBitmap(e, {
          imageOrientation: t.flipY ? 'flipY' : 'none',
          premultiplyAlpha: t.premultiplyAlpha ? 'premultiply' : 'none',
          colorSpaceConversion: t.skipColorSpaceConversion ? 'none' : 'default'
        })
      )
    })
  const Ln = 'undefined' == typeof XMLHttpRequest
  function Qn(e) {
    ;(e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)),
      (this._dates = void 0),
      (this._samples = void 0),
      (this._dateColumn = -1),
      (this._xPoleWanderRadiansColumn = -1),
      (this._yPoleWanderRadiansColumn = -1),
      (this._ut1MinusUtcSecondsColumn = -1),
      (this._xCelestialPoleOffsetRadiansColumn = -1),
      (this._yCelestialPoleOffsetRadiansColumn = -1),
      (this._taiMinusUtcSecondsColumn = -1),
      (this._columnCount = 0),
      (this._lastIndex = -1),
      (this._addNewLeapSeconds = r.defaultValue(e.addNewLeapSeconds, !0)),
      r.defined(e.data)
        ? Hn(this, e.data)
        : Hn(this, {
            columnNames: [
              'dateIso8601',
              'modifiedJulianDateUtc',
              'xPoleWanderRadians',
              'yPoleWanderRadians',
              'ut1MinusUtcSeconds',
              'lengthOfDayCorrectionSeconds',
              'xCelestialPoleOffsetRadians',
              'yCelestialPoleOffsetRadians',
              'taiMinusUtcSeconds'
            ],
            samples: []
          })
  }
  function Wn(e, t) {
    return zt.compare(e.julianDate, t)
  }
  function Hn(e, t) {
    if (!r.defined(t.columnNames)) throw new a.RuntimeError('Error in loaded EOP data: The columnNames property is required.')
    if (!r.defined(t.samples)) throw new a.RuntimeError('Error in loaded EOP data: The samples property is required.')
    const n = t.columnNames.indexOf('modifiedJulianDateUtc'),
      o = t.columnNames.indexOf('xPoleWanderRadians'),
      i = t.columnNames.indexOf('yPoleWanderRadians'),
      s = t.columnNames.indexOf('ut1MinusUtcSeconds'),
      u = t.columnNames.indexOf('xCelestialPoleOffsetRadians'),
      c = t.columnNames.indexOf('yCelestialPoleOffsetRadians'),
      l = t.columnNames.indexOf('taiMinusUtcSeconds')
    if (n < 0 || o < 0 || i < 0 || s < 0 || u < 0 || c < 0 || l < 0)
      throw new a.RuntimeError(
        'Error in loaded EOP data: The columnNames property must include modifiedJulianDateUtc, xPoleWanderRadians, yPoleWanderRadians, ut1MinusUtcSeconds, xCelestialPoleOffsetRadians, yCelestialPoleOffsetRadians, and taiMinusUtcSeconds columns'
      )
    const d = (e._samples = t.samples),
      f = (e._dates = [])
    let p
    ;(e._dateColumn = n),
      (e._xPoleWanderRadiansColumn = o),
      (e._yPoleWanderRadiansColumn = i),
      (e._ut1MinusUtcSecondsColumn = s),
      (e._xCelestialPoleOffsetRadiansColumn = u),
      (e._yCelestialPoleOffsetRadiansColumn = c),
      (e._taiMinusUtcSecondsColumn = l),
      (e._columnCount = t.columnNames.length),
      (e._lastIndex = void 0)
    const h = e._addNewLeapSeconds
    for (let t = 0, o = d.length; t < o; t += e._columnCount) {
      const e = d[t + n],
        o = d[t + l],
        i = new zt(e + ht.MODIFIED_JULIAN_DATE_DIFFERENCE, o, mt.TAI)
      if ((f.push(i), h)) {
        if (o !== p && r.defined(p)) {
          const e = zt.leapSeconds,
            t = ct(e, i, Wn)
          if (t < 0) {
            const n = new pt(i, o)
            e.splice(~t, 0, n)
          }
        }
        p = o
      }
    }
  }
  function Yn(e, t, n, r, o) {
    const i = n * r
    ;(o.xPoleWander = t[i + e._xPoleWanderRadiansColumn]),
      (o.yPoleWander = t[i + e._yPoleWanderRadiansColumn]),
      (o.xPoleOffset = t[i + e._xCelestialPoleOffsetRadiansColumn]),
      (o.yPoleOffset = t[i + e._yCelestialPoleOffsetRadiansColumn]),
      (o.ut1MinusUtc = t[i + e._ut1MinusUtcSecondsColumn])
  }
  function Zn(e, t, n) {
    return t + e * (n - t)
  }
  function Jn(e, t, n, r, o, i, s) {
    const a = e._columnCount
    if (i > t.length - 1) return (s.xPoleWander = 0), (s.yPoleWander = 0), (s.xPoleOffset = 0), (s.yPoleOffset = 0), (s.ut1MinusUtc = 0), s
    const u = t[o],
      c = t[i]
    if (u.equals(c) || r.equals(u)) return Yn(e, n, o, a, s), s
    if (r.equals(c)) return Yn(e, n, i, a, s), s
    const l = zt.secondsDifference(r, u) / zt.secondsDifference(c, u),
      d = o * a,
      f = i * a
    let p = n[d + e._ut1MinusUtcSecondsColumn],
      h = n[f + e._ut1MinusUtcSecondsColumn]
    const m = h - p
    if (m > 0.5 || m < -0.5) {
      const t = n[d + e._taiMinusUtcSecondsColumn],
        o = n[f + e._taiMinusUtcSecondsColumn]
      t !== o && (c.equals(r) ? (p = h) : (h -= o - t))
    }
    return (
      (s.xPoleWander = Zn(l, n[d + e._xPoleWanderRadiansColumn], n[f + e._xPoleWanderRadiansColumn])),
      (s.yPoleWander = Zn(l, n[d + e._yPoleWanderRadiansColumn], n[f + e._yPoleWanderRadiansColumn])),
      (s.xPoleOffset = Zn(l, n[d + e._xCelestialPoleOffsetRadiansColumn], n[f + e._xCelestialPoleOffsetRadiansColumn])),
      (s.yPoleOffset = Zn(l, n[d + e._yCelestialPoleOffsetRadiansColumn], n[f + e._yCelestialPoleOffsetRadiansColumn])),
      (s.ut1MinusUtc = Zn(l, p, h)),
      s
    )
  }
  function Xn(e, t, n) {
    ;(this.heading = r.defaultValue(e, 0)), (this.pitch = r.defaultValue(t, 0)), (this.roll = r.defaultValue(n, 0))
  }
  ;(Un._Implementations.loadWithXhr = function (t, n, o, i, s, c, l) {
    const d = jn.exec(t)
    if (null !== d)
      return void c.resolve(
        (function (e, t) {
          t = r.defaultValue(t, '')
          const n = e[1],
            o = !!e[2],
            i = e[3]
          let s, a
          switch (t) {
            case '':
            case 'text':
              return Bn(o, i)
            case 'arraybuffer':
              return Vn(o, i)
            case 'blob':
              return (s = Vn(o, i)), new Blob([s], { type: n })
            case 'document':
              return (a = new DOMParser()), a.parseFromString(Bn(o, i), n)
            case 'json':
              return JSON.parse(Bn(o, i))
          }
        })(d, n)
      )
    if (Ln)
      return void (function (t, n, r, o, i, s, c) {
        let l, d
        Promise.all([
          new Promise(function (t, n) {
            e(
              ['url'],
              function (e) {
                t(u(e))
              },
              n
            )
          }),
          new Promise(function (t, n) {
            e(
              ['zlib'],
              function (e) {
                t(u(e))
              },
              n
            )
          })
        ])
          .then(
            ([n, r]) => (
              (l = n.parse(t)),
              (d = r),
              'https:' === l.protocol
                ? new Promise(function (t, n) {
                    e(
                      ['https'],
                      function (e) {
                        t(u(e))
                      },
                      n
                    )
                  })
                : new Promise(function (t, n) {
                    e(
                      ['http'],
                      function (e) {
                        t(u(e))
                      },
                      n
                    )
                  })
            )
          )
          .then(e => {
            const t = { protocol: l.protocol, hostname: l.hostname, port: l.port, path: l.path, query: l.query, method: r, headers: i }
            e.request(t)
              .on('response', function (e) {
                if (e.statusCode < 200 || e.statusCode >= 300) return void s.reject(new ln(e.statusCode, e, e.headers))
                const t = []
                e.on('data', function (e) {
                  t.push(e)
                }),
                  e.on('end', function () {
                    const r = Buffer.concat(t)
                    'gzip' === e.headers['content-encoding']
                      ? d.gunzip(r, function (e, t) {
                          e ? s.reject(new a.RuntimeError('Error decompressing response.')) : s.resolve($n(t, n))
                        })
                      : s.resolve($n(r, n))
                  })
              })
              .on('error', function (e) {
                s.reject(new ln())
              })
              .end()
          })
      })(t, n, o, 0, s, c)
    const f = new XMLHttpRequest()
    if (
      (Pn.contains(t) && (f.withCredentials = !0),
      f.open(o, t, !0),
      r.defined(l) && r.defined(f.overrideMimeType) && f.overrideMimeType(l),
      r.defined(s))
    )
      for (const e in s) s.hasOwnProperty(e) && f.setRequestHeader(e, s[e])
    r.defined(n) && (f.responseType = n)
    let p = !1
    return (
      'string' == typeof t && (p = 0 === t.indexOf('file://') || ('undefined' != typeof window && 'file://' === window.location.origin)),
      (f.onload = function () {
        if ((f.status < 200 || f.status >= 300) && (!p || 0 !== f.status))
          return void c.reject(new ln(f.status, f.response, f.getAllResponseHeaders()))
        const e = f.response,
          t = f.responseType
        if ('HEAD' === o || 'OPTIONS' === o) {
          const e = f
              .getAllResponseHeaders()
              .trim()
              .split(/[\r\n]+/),
            t = {}
          return (
            e.forEach(function (e) {
              const n = e.split(': '),
                r = n.shift()
              t[r] = n.join(': ')
            }),
            void c.resolve(t)
          )
        }
        if (204 === f.status) c.resolve()
        else if (!r.defined(e) || (r.defined(n) && t !== n))
          if ('json' === n && 'string' == typeof e)
            try {
              c.resolve(JSON.parse(e))
            } catch (e) {
              c.reject(e)
            }
          else
            ('' === t || 'document' === t) && r.defined(f.responseXML) && f.responseXML.hasChildNodes()
              ? c.resolve(f.responseXML)
              : ('' !== t && 'text' !== t) || !r.defined(f.responseText)
              ? c.reject(new a.RuntimeError('Invalid XMLHttpRequest response type.'))
              : c.resolve(f.responseText)
        else c.resolve(e)
      }),
      (f.onerror = function (e) {
        c.reject(new ln())
      }),
      f.send(i),
      f
    )
  }),
    (Un._Implementations.loadAndExecuteScript = function (e, t, n) {
      return (function (e) {
        const t = document.createElement('script')
        return (
          (t.async = !0),
          (t.src = e),
          new Promise((e, n) => {
            window.crossOriginIsolated && t.setAttribute('crossorigin', 'anonymous')
            const r = document.getElementsByTagName('head')[0]
            ;(t.onload = function () {
              ;(t.onload = void 0), r.removeChild(t), e()
            }),
              (t.onerror = function (e) {
                n(e)
              }),
              r.appendChild(t)
          })
        )
      })(e).catch(function (e) {
        n.reject(e)
      })
    }),
    (Un._DefaultImplementations = {}),
    (Un._DefaultImplementations.createImage = Un._Implementations.createImage),
    (Un._DefaultImplementations.loadWithXhr = Un._Implementations.loadWithXhr),
    (Un._DefaultImplementations.loadAndExecuteScript = Un._Implementations.loadAndExecuteScript),
    (Un.DEFAULT = Object.freeze(new Un({ url: 'undefined' == typeof document ? '' : document.location.href.split('?')[0] }))),
    (Qn.fromUrl = async function (e, t) {
      t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)
      const n = Un.createIfNeeded(e)
      let o
      try {
        o = await n.fetchJson()
      } catch (e) {
        throw new a.RuntimeError(`An error occurred while retrieving the EOP data from the URL ${n.url}.`)
      }
      return new Qn({ addNewLeapSeconds: t.addNewLeapSeconds, data: o })
    }),
    (Qn.NONE = Object.freeze({
      compute: function (e, t) {
        return (
          r.defined(t)
            ? ((t.xPoleWander = 0), (t.yPoleWander = 0), (t.xPoleOffset = 0), (t.yPoleOffset = 0), (t.ut1MinusUtc = 0))
            : (t = new lt(0, 0, 0, 0, 0)),
          t
        )
      }
    })),
    (Qn.prototype.compute = function (e, t) {
      if (!r.defined(this._samples)) return
      if ((r.defined(t) || (t = new lt(0, 0, 0, 0, 0)), 0 === this._samples.length))
        return (t.xPoleWander = 0), (t.yPoleWander = 0), (t.xPoleOffset = 0), (t.yPoleOffset = 0), (t.ut1MinusUtc = 0), t
      const n = this._dates,
        o = this._lastIndex
      let i = 0,
        s = 0
      if (r.defined(o)) {
        const a = n[o],
          u = n[o + 1],
          c = zt.lessThanOrEquals(a, e),
          l = !r.defined(u),
          d = l || zt.greaterThanOrEquals(u, e)
        if (c && d) return (i = o), !l && u.equals(e) && ++i, (s = i + 1), Jn(this, n, this._samples, e, i, s, t), t
      }
      let a = ct(n, e, zt.compare, this._dateColumn)
      return (
        a >= 0 ? (a < n.length - 1 && n[a + 1].equals(e) && ++a, (i = a), (s = a)) : ((s = ~a), (i = s - 1), i < 0 && (i = 0)),
        (this._lastIndex = i),
        Jn(this, n, this._samples, e, i, s, t),
        t
      )
    }),
    (Xn.fromQuaternion = function (e, t) {
      r.defined(t) || (t = new Xn())
      const n = 2 * (e.w * e.y - e.z * e.x),
        i = 1 - 2 * (e.x * e.x + e.y * e.y),
        s = 2 * (e.w * e.x + e.y * e.z),
        a = 1 - 2 * (e.y * e.y + e.z * e.z),
        u = 2 * (e.w * e.z + e.x * e.y)
      return (t.heading = -Math.atan2(u, a)), (t.roll = Math.atan2(s, i)), (t.pitch = -o.CesiumMath.asinClamped(n)), t
    }),
    (Xn.fromDegrees = function (e, t, n, i) {
      return (
        r.defined(i) || (i = new Xn()),
        (i.heading = e * o.CesiumMath.RADIANS_PER_DEGREE),
        (i.pitch = t * o.CesiumMath.RADIANS_PER_DEGREE),
        (i.roll = n * o.CesiumMath.RADIANS_PER_DEGREE),
        i
      )
    }),
    (Xn.clone = function (e, t) {
      if (r.defined(e))
        return r.defined(t) ? ((t.heading = e.heading), (t.pitch = e.pitch), (t.roll = e.roll), t) : new Xn(e.heading, e.pitch, e.roll)
    }),
    (Xn.equals = function (e, t) {
      return e === t || (r.defined(e) && r.defined(t) && e.heading === t.heading && e.pitch === t.pitch && e.roll === t.roll)
    }),
    (Xn.equalsEpsilon = function (e, t, n, i) {
      return (
        e === t ||
        (r.defined(e) &&
          r.defined(t) &&
          o.CesiumMath.equalsEpsilon(e.heading, t.heading, n, i) &&
          o.CesiumMath.equalsEpsilon(e.pitch, t.pitch, n, i) &&
          o.CesiumMath.equalsEpsilon(e.roll, t.roll, n, i))
      )
    }),
    (Xn.prototype.clone = function (e) {
      return Xn.clone(this, e)
    }),
    (Xn.prototype.equals = function (e) {
      return Xn.equals(this, e)
    }),
    (Xn.prototype.equalsEpsilon = function (e, t, n) {
      return Xn.equalsEpsilon(this, e, t, n)
    }),
    (Xn.prototype.toString = function () {
      return `(${this.heading}, ${this.pitch}, ${this.roll})`
    })
  const Gn = /((?:.*\/)|^)Cesium\.js(?:\?|\#|$)/
  let Kn, er, tr
  function nr(e) {
    return 'undefined' == typeof document ? e : (r.defined(Kn) || (Kn = document.createElement('a')), (Kn.href = e), (Kn.href = Kn.href), Kn.href)
  }
  function rr() {
    if (r.defined(er)) return er
    let t
    return (
      (t =
        'undefined' != typeof CESIUM_BASE_URL
          ? CESIUM_BASE_URL
          : 'object' == typeof define && r.defined(define.amd) && !define.amd.toUrlUndefined && r.defined(e.toUrl)
          ? Gt('..', sr('Core/buildModuleUrl.js'))
          : (function () {
              const e = document.getElementsByTagName('script')
              for (let t = 0, n = e.length; t < n; ++t) {
                const n = e[t].getAttribute('src'),
                  r = Gn.exec(n)
                if (null !== r) return r[1]
              }
            })()),
      (er = new Un({ url: nr(t) })),
      er.appendForwardSlash(),
      er
    )
  }
  function or(t) {
    return nr(e.toUrl(`../${t}`))
  }
  function ir(e) {
    return rr().getDerivedResource({ url: e }).url
  }
  function sr(t) {
    r.defined(tr) || (tr = 'object' == typeof define && r.defined(define.amd) && !define.amd.toUrlUndefined && r.defined(e.toUrl) ? or : ir)
    return tr(t)
  }
  function ar(e, t, n) {
    ;(this.x = e), (this.y = t), (this.s = n)
  }
  function ur(e) {
    ;(e = r.defaultValue(e, r.defaultValue.EMPTY_OBJECT)),
      (this._xysFileUrlTemplate = Un.createIfNeeded(e.xysFileUrlTemplate)),
      (this._interpolationOrder = r.defaultValue(e.interpolationOrder, 9)),
      (this._sampleZeroJulianEphemerisDate = r.defaultValue(e.sampleZeroJulianEphemerisDate, 2442396.5)),
      (this._sampleZeroDateTT = new zt(this._sampleZeroJulianEphemerisDate, 0, mt.TAI)),
      (this._stepSizeDays = r.defaultValue(e.stepSizeDays, 1)),
      (this._samplesPerXysFile = r.defaultValue(e.samplesPerXysFile, 1e3)),
      (this._totalSamples = r.defaultValue(e.totalSamples, 27426)),
      (this._samples = new Array(3 * this._totalSamples)),
      (this._chunkDownloadsInProgress = [])
    const t = this._interpolationOrder,
      n = (this._denominators = new Array(t + 1)),
      o = (this._xTable = new Array(t + 1)),
      i = Math.pow(this._stepSizeDays, t)
    for (let e = 0; e <= t; ++e) {
      ;(n[e] = i), (o[e] = e * this._stepSizeDays)
      for (let r = 0; r <= t; ++r) r !== e && (n[e] *= e - r)
      n[e] = 1 / n[e]
    }
    ;(this._work = new Array(t + 1)), (this._coef = new Array(t + 1))
  }
  ;(sr._cesiumScriptRegex = Gn),
    (sr._buildModuleUrlFromBaseUrl = ir),
    (sr._clearBaseResource = function () {
      er = void 0
    }),
    (sr.setBaseUrl = function (e) {
      er = Un.DEFAULT.getDerivedResource({ url: e })
    }),
    (sr.getCesiumBaseUrl = rr)
  const cr = new zt(0, 0, mt.TAI)
  function lr(e, t, n) {
    const r = cr
    return (r.dayNumber = t), (r.secondsOfDay = n), zt.daysDifference(r, e._sampleZeroDateTT)
  }
  function dr(e, t) {
    if (e._chunkDownloadsInProgress[t]) return e._chunkDownloadsInProgress[t]
    let n
    const o = e._xysFileUrlTemplate
    n = r.defined(o) ? o.getDerivedResource({ templateValues: { 0: t } }) : new Un({ url: sr(`Assets/IAU2006_XYS/IAU2006_XYS_${t}.json`) })
    const i = n.fetchJson().then(function (n) {
      e._chunkDownloadsInProgress[t] = !1
      const r = e._samples,
        o = n.samples,
        i = t * e._samplesPerXysFile * 3
      for (let e = 0, t = o.length; e < t; ++e) r[i + e] = o[e]
    })
    return (e._chunkDownloadsInProgress[t] = i), i
  }
  ;(ur.prototype.preload = function (e, t, n, r) {
    const o = lr(this, e, t),
      i = lr(this, n, r)
    let s = (o / this._stepSizeDays - this._interpolationOrder / 2) | 0
    s < 0 && (s = 0)
    let a = (i / this._stepSizeDays - this._interpolationOrder / 2) | (0 + this._interpolationOrder)
    a >= this._totalSamples && (a = this._totalSamples - 1)
    const u = (s / this._samplesPerXysFile) | 0,
      c = (a / this._samplesPerXysFile) | 0,
      l = []
    for (let e = u; e <= c; ++e) l.push(dr(this, e))
    return Promise.all(l)
  }),
    (ur.prototype.computeXysRadians = function (e, t, n) {
      const o = lr(this, e, t)
      if (o < 0) return
      const i = (o / this._stepSizeDays) | 0
      if (i >= this._totalSamples) return
      const s = this._interpolationOrder
      let a = i - ((s / 2) | 0)
      a < 0 && (a = 0)
      let u = a + s
      u >= this._totalSamples && ((u = this._totalSamples - 1), (a = u - s), a < 0 && (a = 0))
      let c = !1
      const l = this._samples
      if (
        (r.defined(l[3 * a]) || (dr(this, (a / this._samplesPerXysFile) | 0), (c = !0)),
        r.defined(l[3 * u]) || (dr(this, (u / this._samplesPerXysFile) | 0), (c = !0)),
        c)
      )
        return
      r.defined(n) ? ((n.x = 0), (n.y = 0), (n.s = 0)) : (n = new ar(0, 0, 0))
      const d = o - a * this._stepSizeDays,
        f = this._work,
        p = this._denominators,
        h = this._coef,
        m = this._xTable
      let g, y
      for (g = 0; g <= s; ++g) f[g] = d - m[g]
      for (g = 0; g <= s; ++g) {
        for (h[g] = 1, y = 0; y <= s; ++y) y !== g && (h[g] *= f[y])
        h[g] *= p[g]
        let e = 3 * (a + g)
        ;(n.x += h[g] * l[e++]), (n.y += h[g] * l[e++]), (n.s += h[g] * l[e])
      }
      return n
    })
  const fr = {},
    pr = {
      up: { south: 'east', north: 'west', west: 'south', east: 'north' },
      down: { south: 'west', north: 'east', west: 'north', east: 'south' },
      south: { up: 'west', down: 'east', west: 'down', east: 'up' },
      north: { up: 'east', down: 'west', west: 'up', east: 'down' },
      west: { up: 'north', down: 'south', north: 'down', south: 'up' },
      east: { up: 'south', down: 'north', north: 'up', south: 'down' }
    },
    hr = { north: [-1, 0, 0], east: [0, 1, 0], up: [0, 0, 1], south: [1, 0, 0], west: [0, -1, 0], down: [0, 0, -1] },
    mr = {},
    gr = {
      east: new n.Cartesian3(),
      north: new n.Cartesian3(),
      up: new n.Cartesian3(),
      west: new n.Cartesian3(),
      south: new n.Cartesian3(),
      down: new n.Cartesian3()
    }
  let yr = new n.Cartesian3(),
    vr = new n.Cartesian3(),
    wr = new n.Cartesian3()
  ;(fr.localFrameToFixedFrameGenerator = function (e, t) {
    if (!pr.hasOwnProperty(e) || !pr[e].hasOwnProperty(t)) throw new c('firstAxis and secondAxis must be east, north, up, west, south or down.')
    const s = pr[e][t]
    let a
    const u = e + t
    return (
      r.defined(mr[u])
        ? (a = mr[u])
        : ((a = function (a, u, c) {
            if ((r.defined(c) || (c = new i.Matrix4()), n.Cartesian3.equalsEpsilon(a, n.Cartesian3.ZERO, o.CesiumMath.EPSILON14)))
              n.Cartesian3.unpack(hr[e], 0, yr), n.Cartesian3.unpack(hr[t], 0, vr), n.Cartesian3.unpack(hr[s], 0, wr)
            else if (o.CesiumMath.equalsEpsilon(a.x, 0, o.CesiumMath.EPSILON14) && o.CesiumMath.equalsEpsilon(a.y, 0, o.CesiumMath.EPSILON14)) {
              const r = o.CesiumMath.sign(a.z)
              n.Cartesian3.unpack(hr[e], 0, yr),
                'east' !== e && 'west' !== e && n.Cartesian3.multiplyByScalar(yr, r, yr),
                n.Cartesian3.unpack(hr[t], 0, vr),
                'east' !== t && 'west' !== t && n.Cartesian3.multiplyByScalar(vr, r, vr),
                n.Cartesian3.unpack(hr[s], 0, wr),
                'east' !== s && 'west' !== s && n.Cartesian3.multiplyByScalar(wr, r, wr)
            } else {
              ;(u = r.defaultValue(u, n.Ellipsoid.WGS84)).geodeticSurfaceNormal(a, gr.up)
              const o = gr.up,
                i = gr.east
              ;(i.x = -a.y),
                (i.y = a.x),
                (i.z = 0),
                n.Cartesian3.normalize(i, gr.east),
                n.Cartesian3.cross(o, i, gr.north),
                n.Cartesian3.multiplyByScalar(gr.up, -1, gr.down),
                n.Cartesian3.multiplyByScalar(gr.east, -1, gr.west),
                n.Cartesian3.multiplyByScalar(gr.north, -1, gr.south),
                (yr = gr[e]),
                (vr = gr[t]),
                (wr = gr[s])
            }
            return (
              (c[0] = yr.x),
              (c[1] = yr.y),
              (c[2] = yr.z),
              (c[3] = 0),
              (c[4] = vr.x),
              (c[5] = vr.y),
              (c[6] = vr.z),
              (c[7] = 0),
              (c[8] = wr.x),
              (c[9] = wr.y),
              (c[10] = wr.z),
              (c[11] = 0),
              (c[12] = a.x),
              (c[13] = a.y),
              (c[14] = a.z),
              (c[15] = 1),
              c
            )
          }),
          (mr[u] = a)),
      a
    )
  }),
    (fr.eastNorthUpToFixedFrame = fr.localFrameToFixedFrameGenerator('east', 'north')),
    (fr.northEastDownToFixedFrame = fr.localFrameToFixedFrameGenerator('north', 'east')),
    (fr.northUpEastToFixedFrame = fr.localFrameToFixedFrameGenerator('north', 'up')),
    (fr.northWestUpToFixedFrame = fr.localFrameToFixedFrameGenerator('north', 'west'))
  const Cr = new Ue(),
    _r = new n.Cartesian3(1, 1, 1),
    br = new i.Matrix4()
  fr.headingPitchRollToFixedFrame = function (e, t, o, s, a) {
    s = r.defaultValue(s, fr.eastNorthUpToFixedFrame)
    const u = Ue.fromHeadingPitchRoll(t, Cr),
      c = i.Matrix4.fromTranslationQuaternionRotationScale(n.Cartesian3.ZERO, u, _r, br)
    return (a = s(e, o, a)), i.Matrix4.multiply(a, c, a)
  }
  const xr = new i.Matrix4(),
    Sr = new n.Matrix3()
  fr.headingPitchRollQuaternion = function (e, t, n, r, o) {
    const s = fr.headingPitchRollToFixedFrame(e, t, n, r, xr),
      a = i.Matrix4.getMatrix3(s, Sr)
    return Ue.fromRotationMatrix(a, o)
  }
  const Ar = new n.Cartesian3(1, 1, 1),
    Er = new n.Cartesian3(),
    Or = new i.Matrix4(),
    Ir = new i.Matrix4(),
    Pr = new n.Matrix3(),
    Rr = new Ue()
  fr.fixedFrameToHeadingPitchRoll = function (e, t, o, s) {
    ;(t = r.defaultValue(t, n.Ellipsoid.WGS84)), (o = r.defaultValue(o, fr.eastNorthUpToFixedFrame)), r.defined(s) || (s = new Xn())
    const a = i.Matrix4.getTranslation(e, Er)
    if (n.Cartesian3.equals(a, n.Cartesian3.ZERO)) return (s.heading = 0), (s.pitch = 0), (s.roll = 0), s
    let u = i.Matrix4.inverseTransformation(o(a, t, Or), Or),
      c = i.Matrix4.setScale(e, Ar, Ir)
    ;(c = i.Matrix4.setTranslation(c, n.Cartesian3.ZERO, c)), (u = i.Matrix4.multiply(u, c, u))
    let l = Ue.fromRotationMatrix(i.Matrix4.getMatrix3(u, Pr), Rr)
    return (l = Ue.normalize(l, l)), Xn.fromQuaternion(l, s)
  }
  const Tr = o.CesiumMath.TWO_PI / 86400
  let qr = new zt()
  ;(fr.computeTemeToPseudoFixedMatrix = function (e, t) {
    qr = zt.addSeconds(e, -zt.computeTaiMinusUtc(e), qr)
    const i = qr.dayNumber,
      s = qr.secondsOfDay
    let a
    const u = i - 2451545
    a = s >= 43200 ? (u + 0.5) / ht.DAYS_PER_JULIAN_CENTURY : (u - 0.5) / ht.DAYS_PER_JULIAN_CENTURY
    const c =
        (((24110.54841 + a * (8640184.812866 + a * (0.093104 + -62e-7 * a))) * Tr) % o.CesiumMath.TWO_PI) +
        (72921158553e-15 + 11772758384668e-32 * (i - 2451545.5)) * ((s + 0.5 * ht.SECONDS_PER_DAY) % ht.SECONDS_PER_DAY),
      l = Math.cos(c),
      d = Math.sin(c)
    return r.defined(t)
      ? ((t[0] = l), (t[1] = -d), (t[2] = 0), (t[3] = d), (t[4] = l), (t[5] = 0), (t[6] = 0), (t[7] = 0), (t[8] = 1), t)
      : new n.Matrix3(l, d, 0, -d, l, 0, 0, 0, 1)
  }),
    (fr.iau2006XysData = new ur()),
    (fr.earthOrientationParameters = Qn.NONE)
  const zr = 32.184
  ;(fr.preloadIcrfFixed = function (e) {
    const t = e.start.dayNumber,
      n = e.start.secondsOfDay + zr,
      r = e.stop.dayNumber,
      o = e.stop.secondsOfDay + zr
    return fr.iau2006XysData.preload(t, n, r, o)
  }),
    (fr.computeIcrfToFixedMatrix = function (e, t) {
      r.defined(t) || (t = new n.Matrix3())
      const o = fr.computeFixedToIcrfMatrix(e, t)
      if (r.defined(o)) return n.Matrix3.transpose(o, t)
    })
  const Mr = new ar(0, 0, 0),
    Dr = new lt(0, 0, 0, 0, 0),
    Ur = new n.Matrix3(),
    kr = new n.Matrix3()
  fr.computeFixedToIcrfMatrix = function (e, t) {
    r.defined(t) || (t = new n.Matrix3())
    const i = fr.earthOrientationParameters.compute(e, Dr)
    if (!r.defined(i)) return
    const s = e.dayNumber,
      a = e.secondsOfDay + zr,
      u = fr.iau2006XysData.computeXysRadians(s, a, Mr)
    if (!r.defined(u)) return
    const c = u.x + i.xPoleOffset,
      l = u.y + i.yPoleOffset,
      d = 1 / (1 + Math.sqrt(1 - c * c - l * l)),
      f = Ur
    ;(f[0] = 1 - d * c * c),
      (f[3] = -d * c * l),
      (f[6] = c),
      (f[1] = -d * c * l),
      (f[4] = 1 - d * l * l),
      (f[7] = l),
      (f[2] = -c),
      (f[5] = -l),
      (f[8] = 1 - d * (c * c + l * l))
    const p = n.Matrix3.fromRotationZ(-u.s, kr),
      h = n.Matrix3.multiply(f, p, Ur),
      m = e.dayNumber - 2451545,
      g = (e.secondsOfDay - zt.computeTaiMinusUtc(e) + i.ut1MinusUtc) / ht.SECONDS_PER_DAY
    let y = 0.779057273264 + g + 0.00273781191135448 * (m + g)
    y = (y % 1) * o.CesiumMath.TWO_PI
    const v = n.Matrix3.fromRotationZ(y, kr),
      w = n.Matrix3.multiply(h, v, Ur),
      C = Math.cos(i.xPoleWander),
      _ = Math.cos(i.yPoleWander),
      b = Math.sin(i.xPoleWander),
      x = Math.sin(i.yPoleWander)
    let S = s - 2451545 + a / ht.SECONDS_PER_DAY
    S /= 36525
    const A = (-47e-6 * S * o.CesiumMath.RADIANS_PER_DEGREE) / 3600,
      E = Math.cos(A),
      O = Math.sin(A),
      I = kr
    return (
      (I[0] = C * E),
      (I[1] = C * O),
      (I[2] = b),
      (I[3] = -_ * O + x * b * E),
      (I[4] = _ * E + x * b * O),
      (I[5] = -x * C),
      (I[6] = -x * O - _ * b * E),
      (I[7] = x * E - _ * b * O),
      (I[8] = _ * C),
      n.Matrix3.multiply(w, I, t)
    )
  }
  const Fr = new i.Cartesian4()
  ;(fr.pointToWindowCoordinates = function (e, t, n, r) {
    return ((r = fr.pointToGLWindowCoordinates(e, t, n, r)).y = 2 * t[5] - r.y), r
  }),
    (fr.pointToGLWindowCoordinates = function (e, t, n, o) {
      r.defined(o) || (o = new i.Cartesian2())
      const s = Fr
      return (
        i.Matrix4.multiplyByVector(e, i.Cartesian4.fromElements(n.x, n.y, n.z, 1, s), s),
        i.Cartesian4.multiplyByScalar(s, 1 / s.w, s),
        i.Matrix4.multiplyByVector(t, s, s),
        i.Cartesian2.fromCartesian4(s, o)
      )
    })
  const Nr = new n.Cartesian3(),
    jr = new n.Cartesian3(),
    Br = new n.Cartesian3()
  fr.rotationMatrixFromPositionVelocity = function (e, t, i, s) {
    const a = r.defaultValue(i, n.Ellipsoid.WGS84).geodeticSurfaceNormal(e, Nr)
    let u = n.Cartesian3.cross(t, a, jr)
    n.Cartesian3.equalsEpsilon(u, n.Cartesian3.ZERO, o.CesiumMath.EPSILON6) && (u = n.Cartesian3.clone(n.Cartesian3.UNIT_X, u))
    const c = n.Cartesian3.cross(u, t, Br)
    return (
      n.Cartesian3.normalize(c, c),
      n.Cartesian3.cross(t, c, u),
      n.Cartesian3.negate(u, u),
      n.Cartesian3.normalize(u, u),
      r.defined(s) || (s = new n.Matrix3()),
      (s[0] = t.x),
      (s[1] = t.y),
      (s[2] = t.z),
      (s[3] = u.x),
      (s[4] = u.y),
      (s[5] = u.z),
      (s[6] = c.x),
      (s[7] = c.y),
      (s[8] = c.z),
      s
    )
  }
  const Vr = new i.Matrix4(0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1),
    $r = new n.Cartographic(),
    Lr = new n.Cartesian3(),
    Qr = new n.Cartesian3(),
    Wr = new n.Matrix3(),
    Hr = new i.Matrix4(),
    Yr = new i.Matrix4()
  ;(fr.basisTo2D = function (e, t, r) {
    const o = i.Matrix4.getTranslation(t, Qr),
      s = e.ellipsoid,
      a = s.cartesianToCartographic(o, $r),
      u = e.project(a, Lr)
    n.Cartesian3.fromElements(u.z, u.x, u.y, u)
    const c = fr.eastNorthUpToFixedFrame(o, s, Hr),
      l = i.Matrix4.inverseTransformation(c, Yr),
      d = i.Matrix4.getMatrix3(t, Wr),
      f = i.Matrix4.multiplyByMatrix3(l, d, r)
    return i.Matrix4.multiply(Vr, f, r), i.Matrix4.setTranslation(r, u, r), r
  }),
    (fr.wgs84To2DModelMatrix = function (e, t, r) {
      const o = e.ellipsoid,
        s = fr.eastNorthUpToFixedFrame(t, o, Hr),
        a = i.Matrix4.inverseTransformation(s, Yr),
        u = o.cartesianToCartographic(t, $r),
        c = e.project(u, Lr)
      n.Cartesian3.fromElements(c.z, c.x, c.y, c)
      const l = i.Matrix4.fromTranslation(c, Hr)
      return i.Matrix4.multiply(Vr, a, r), i.Matrix4.multiply(l, r, r), r
    })
  var Zr = fr
  ;(t.BoundingSphere = y),
    (t.DeveloperError = c),
    (t.FeatureDetection = De),
    (t.GeographicProjection = h),
    (t.Intersect = m),
    (t.Interval = g),
    (t.Quaternion = Ue),
    (t.Resource = Un),
    (t.Transforms = Zr),
    (t.buildModuleUrl = sr)
})
