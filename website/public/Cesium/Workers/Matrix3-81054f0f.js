define(['exports', './defaultValue-f6d5e6da', './Math-2ce22ee9'], function (e, t, n) {
  'use strict'
  function i(e, n, i) {
    ;(this.x = t.defaultValue(e, 0)), (this.y = t.defaultValue(n, 0)), (this.z = t.defaultValue(i, 0))
  }
  ;(i.fromSpherical = function (e, n) {
    t.defined(n) || (n = new i())
    const r = e.clock,
      a = e.cone,
      o = t.defaultValue(e.magnitude, 1),
      u = o * Math.sin(a)
    return (n.x = u * Math.cos(r)), (n.y = u * Math.sin(r)), (n.z = o * Math.cos(a)), n
  }),
    (i.fromElements = function (e, n, r, a) {
      return t.defined(a) ? ((a.x = e), (a.y = n), (a.z = r), a) : new i(e, n, r)
    }),
    (i.clone = function (e, n) {
      if (t.defined(e)) return t.defined(n) ? ((n.x = e.x), (n.y = e.y), (n.z = e.z), n) : new i(e.x, e.y, e.z)
    }),
    (i.fromCartesian4 = i.clone),
    (i.packedLength = 3),
    (i.pack = function (e, n, i) {
      return (i = t.defaultValue(i, 0)), (n[i++] = e.x), (n[i++] = e.y), (n[i] = e.z), n
    }),
    (i.unpack = function (e, n, r) {
      return (n = t.defaultValue(n, 0)), t.defined(r) || (r = new i()), (r.x = e[n++]), (r.y = e[n++]), (r.z = e[n]), r
    }),
    (i.packArray = function (e, n) {
      const r = e.length,
        a = 3 * r
      t.defined(n) ? (Array.isArray(n) || n.length === a) && n.length !== a && (n.length = a) : (n = new Array(a))
      for (let t = 0; t < r; ++t) i.pack(e[t], n, 3 * t)
      return n
    }),
    (i.unpackArray = function (e, n) {
      const r = e.length
      t.defined(n) ? (n.length = r / 3) : (n = new Array(r / 3))
      for (let t = 0; t < r; t += 3) {
        const r = t / 3
        n[r] = i.unpack(e, t, n[r])
      }
      return n
    }),
    (i.fromArray = i.unpack),
    (i.maximumComponent = function (e) {
      return Math.max(e.x, e.y, e.z)
    }),
    (i.minimumComponent = function (e) {
      return Math.min(e.x, e.y, e.z)
    }),
    (i.minimumByComponent = function (e, t, n) {
      return (n.x = Math.min(e.x, t.x)), (n.y = Math.min(e.y, t.y)), (n.z = Math.min(e.z, t.z)), n
    }),
    (i.maximumByComponent = function (e, t, n) {
      return (n.x = Math.max(e.x, t.x)), (n.y = Math.max(e.y, t.y)), (n.z = Math.max(e.z, t.z)), n
    }),
    (i.clamp = function (e, t, i, r) {
      const a = n.CesiumMath.clamp(e.x, t.x, i.x),
        o = n.CesiumMath.clamp(e.y, t.y, i.y),
        u = n.CesiumMath.clamp(e.z, t.z, i.z)
      return (r.x = a), (r.y = o), (r.z = u), r
    }),
    (i.magnitudeSquared = function (e) {
      return e.x * e.x + e.y * e.y + e.z * e.z
    }),
    (i.magnitude = function (e) {
      return Math.sqrt(i.magnitudeSquared(e))
    })
  const r = new i()
  ;(i.distance = function (e, t) {
    return i.subtract(e, t, r), i.magnitude(r)
  }),
    (i.distanceSquared = function (e, t) {
      return i.subtract(e, t, r), i.magnitudeSquared(r)
    }),
    (i.normalize = function (e, t) {
      const n = i.magnitude(e)
      return (t.x = e.x / n), (t.y = e.y / n), (t.z = e.z / n), t
    }),
    (i.dot = function (e, t) {
      return e.x * t.x + e.y * t.y + e.z * t.z
    }),
    (i.multiplyComponents = function (e, t, n) {
      return (n.x = e.x * t.x), (n.y = e.y * t.y), (n.z = e.z * t.z), n
    }),
    (i.divideComponents = function (e, t, n) {
      return (n.x = e.x / t.x), (n.y = e.y / t.y), (n.z = e.z / t.z), n
    }),
    (i.add = function (e, t, n) {
      return (n.x = e.x + t.x), (n.y = e.y + t.y), (n.z = e.z + t.z), n
    }),
    (i.subtract = function (e, t, n) {
      return (n.x = e.x - t.x), (n.y = e.y - t.y), (n.z = e.z - t.z), n
    }),
    (i.multiplyByScalar = function (e, t, n) {
      return (n.x = e.x * t), (n.y = e.y * t), (n.z = e.z * t), n
    }),
    (i.divideByScalar = function (e, t, n) {
      return (n.x = e.x / t), (n.y = e.y / t), (n.z = e.z / t), n
    }),
    (i.negate = function (e, t) {
      return (t.x = -e.x), (t.y = -e.y), (t.z = -e.z), t
    }),
    (i.abs = function (e, t) {
      return (t.x = Math.abs(e.x)), (t.y = Math.abs(e.y)), (t.z = Math.abs(e.z)), t
    })
  const a = new i()
  i.lerp = function (e, t, n, r) {
    return i.multiplyByScalar(t, n, a), (r = i.multiplyByScalar(e, 1 - n, r)), i.add(a, r, r)
  }
  const o = new i(),
    u = new i()
  i.angleBetween = function (e, t) {
    i.normalize(e, o), i.normalize(t, u)
    const n = i.dot(o, u),
      r = i.magnitude(i.cross(o, u, o))
    return Math.atan2(r, n)
  }
  const c = new i()
  ;(i.mostOrthogonalAxis = function (e, t) {
    const n = i.normalize(e, c)
    return (
      i.abs(n, n),
      (t = n.x <= n.y ? (n.x <= n.z ? i.clone(i.UNIT_X, t) : i.clone(i.UNIT_Z, t)) : n.y <= n.z ? i.clone(i.UNIT_Y, t) : i.clone(i.UNIT_Z, t))
    )
  }),
    (i.projectVector = function (e, t, n) {
      const r = i.dot(e, t) / i.dot(t, t)
      return i.multiplyByScalar(t, r, n)
    }),
    (i.equals = function (e, n) {
      return e === n || (t.defined(e) && t.defined(n) && e.x === n.x && e.y === n.y && e.z === n.z)
    }),
    (i.equalsArray = function (e, t, n) {
      return e.x === t[n] && e.y === t[n + 1] && e.z === t[n + 2]
    }),
    (i.equalsEpsilon = function (e, i, r, a) {
      return (
        e === i ||
        (t.defined(e) &&
          t.defined(i) &&
          n.CesiumMath.equalsEpsilon(e.x, i.x, r, a) &&
          n.CesiumMath.equalsEpsilon(e.y, i.y, r, a) &&
          n.CesiumMath.equalsEpsilon(e.z, i.z, r, a))
      )
    }),
    (i.cross = function (e, t, n) {
      const i = e.x,
        r = e.y,
        a = e.z,
        o = t.x,
        u = t.y,
        c = t.z,
        s = r * c - a * u,
        d = a * o - i * c,
        l = i * u - r * o
      return (n.x = s), (n.y = d), (n.z = l), n
    }),
    (i.midpoint = function (e, t, n) {
      return (n.x = 0.5 * (e.x + t.x)), (n.y = 0.5 * (e.y + t.y)), (n.z = 0.5 * (e.z + t.z)), n
    }),
    (i.fromDegrees = function (e, t, r, a, o) {
      return (e = n.CesiumMath.toRadians(e)), (t = n.CesiumMath.toRadians(t)), i.fromRadians(e, t, r, a, o)
    })
  let s = new i(),
    d = new i()
  const l = new i(40680631590769, 40680631590769, 40408299984661.445)
  ;(i.fromRadians = function (e, n, r, a, o) {
    r = t.defaultValue(r, 0)
    const u = t.defined(a) ? a.radiiSquared : l,
      c = Math.cos(n)
    ;(s.x = c * Math.cos(e)), (s.y = c * Math.sin(e)), (s.z = Math.sin(n)), (s = i.normalize(s, s)), i.multiplyComponents(u, s, d)
    const f = Math.sqrt(i.dot(s, d))
    return (d = i.divideByScalar(d, f, d)), (s = i.multiplyByScalar(s, r, s)), t.defined(o) || (o = new i()), i.add(d, s, o)
  }),
    (i.fromDegreesArray = function (e, n, r) {
      const a = e.length
      t.defined(r) ? (r.length = a / 2) : (r = new Array(a / 2))
      for (let t = 0; t < a; t += 2) {
        const a = e[t],
          o = e[t + 1],
          u = t / 2
        r[u] = i.fromDegrees(a, o, 0, n, r[u])
      }
      return r
    }),
    (i.fromRadiansArray = function (e, n, r) {
      const a = e.length
      t.defined(r) ? (r.length = a / 2) : (r = new Array(a / 2))
      for (let t = 0; t < a; t += 2) {
        const a = e[t],
          o = e[t + 1],
          u = t / 2
        r[u] = i.fromRadians(a, o, 0, n, r[u])
      }
      return r
    }),
    (i.fromDegreesArrayHeights = function (e, n, r) {
      const a = e.length
      t.defined(r) ? (r.length = a / 3) : (r = new Array(a / 3))
      for (let t = 0; t < a; t += 3) {
        const a = e[t],
          o = e[t + 1],
          u = e[t + 2],
          c = t / 3
        r[c] = i.fromDegrees(a, o, u, n, r[c])
      }
      return r
    }),
    (i.fromRadiansArrayHeights = function (e, n, r) {
      const a = e.length
      t.defined(r) ? (r.length = a / 3) : (r = new Array(a / 3))
      for (let t = 0; t < a; t += 3) {
        const a = e[t],
          o = e[t + 1],
          u = e[t + 2],
          c = t / 3
        r[c] = i.fromRadians(a, o, u, n, r[c])
      }
      return r
    }),
    (i.ZERO = Object.freeze(new i(0, 0, 0))),
    (i.ONE = Object.freeze(new i(1, 1, 1))),
    (i.UNIT_X = Object.freeze(new i(1, 0, 0))),
    (i.UNIT_Y = Object.freeze(new i(0, 1, 0))),
    (i.UNIT_Z = Object.freeze(new i(0, 0, 1))),
    (i.prototype.clone = function (e) {
      return i.clone(this, e)
    }),
    (i.prototype.equals = function (e) {
      return i.equals(this, e)
    }),
    (i.prototype.equalsEpsilon = function (e, t, n) {
      return i.equalsEpsilon(this, e, t, n)
    }),
    (i.prototype.toString = function () {
      return `(${this.x}, ${this.y}, ${this.z})`
    })
  const f = new i(),
    h = new i()
  function m(e, r, a, o, u) {
    const c = e.x,
      s = e.y,
      d = e.z,
      l = r.x,
      m = r.y,
      y = r.z,
      p = c * c * l * l,
      g = s * s * m * m,
      x = d * d * y * y,
      z = p + g + x,
      M = Math.sqrt(1 / z),
      w = i.multiplyByScalar(e, M, f)
    if (z < o) return isFinite(M) ? i.clone(w, u) : void 0
    const S = a.x,
      q = a.y,
      R = a.z,
      _ = h
    ;(_.x = w.x * S * 2), (_.y = w.y * q * 2), (_.z = w.z * R * 2)
    let O,
      C,
      b,
      E,
      T,
      A,
      v,
      N,
      I,
      V,
      U,
      k = ((1 - M) * i.magnitude(e)) / (0.5 * i.magnitude(_)),
      L = 0
    do {
      ;(k -= L),
        (b = 1 / (1 + k * S)),
        (E = 1 / (1 + k * q)),
        (T = 1 / (1 + k * R)),
        (A = b * b),
        (v = E * E),
        (N = T * T),
        (I = A * b),
        (V = v * E),
        (U = N * T),
        (O = p * A + g * v + x * N - 1),
        (C = p * I * S + g * V * q + x * U * R)
      L = O / (-2 * C)
    } while (Math.abs(O) > n.CesiumMath.EPSILON12)
    return t.defined(u) ? ((u.x = c * b), (u.y = s * E), (u.z = d * T), u) : new i(c * b, s * E, d * T)
  }
  function y(e, n, i) {
    ;(this.longitude = t.defaultValue(e, 0)), (this.latitude = t.defaultValue(n, 0)), (this.height = t.defaultValue(i, 0))
  }
  ;(y.fromRadians = function (e, n, i, r) {
    return (i = t.defaultValue(i, 0)), t.defined(r) ? ((r.longitude = e), (r.latitude = n), (r.height = i), r) : new y(e, n, i)
  }),
    (y.fromDegrees = function (e, t, i, r) {
      return (e = n.CesiumMath.toRadians(e)), (t = n.CesiumMath.toRadians(t)), y.fromRadians(e, t, i, r)
    })
  const p = new i(),
    g = new i(),
    x = new i(),
    z = new i(1 / 6378137, 1 / 6378137, 1 / 6356752.314245179),
    M = new i(1 / 40680631590769, 1 / 40680631590769, 1 / 40408299984661.445),
    w = n.CesiumMath.EPSILON1
  function S(e, r, a, o) {
    ;(r = t.defaultValue(r, 0)),
      (a = t.defaultValue(a, 0)),
      (o = t.defaultValue(o, 0)),
      (e._radii = new i(r, a, o)),
      (e._radiiSquared = new i(r * r, a * a, o * o)),
      (e._radiiToTheFourth = new i(r * r * r * r, a * a * a * a, o * o * o * o)),
      (e._oneOverRadii = new i(0 === r ? 0 : 1 / r, 0 === a ? 0 : 1 / a, 0 === o ? 0 : 1 / o)),
      (e._oneOverRadiiSquared = new i(0 === r ? 0 : 1 / (r * r), 0 === a ? 0 : 1 / (a * a), 0 === o ? 0 : 1 / (o * o))),
      (e._minimumRadius = Math.min(r, a, o)),
      (e._maximumRadius = Math.max(r, a, o)),
      (e._centerToleranceSquared = n.CesiumMath.EPSILON1),
      0 !== e._radiiSquared.z && (e._squaredXOverSquaredZ = e._radiiSquared.x / e._radiiSquared.z)
  }
  function q(e, t, n) {
    ;(this._radii = void 0),
      (this._radiiSquared = void 0),
      (this._radiiToTheFourth = void 0),
      (this._oneOverRadii = void 0),
      (this._oneOverRadiiSquared = void 0),
      (this._minimumRadius = void 0),
      (this._maximumRadius = void 0),
      (this._centerToleranceSquared = void 0),
      (this._squaredXOverSquaredZ = void 0),
      S(this, e, t, n)
  }
  ;(y.fromCartesian = function (e, r, a) {
    const o = t.defined(r) ? r.oneOverRadii : z,
      u = t.defined(r) ? r.oneOverRadiiSquared : M,
      c = m(e, o, u, t.defined(r) ? r._centerToleranceSquared : w, g)
    if (!t.defined(c)) return
    let s = i.multiplyComponents(c, u, p)
    s = i.normalize(s, s)
    const d = i.subtract(e, c, x),
      l = Math.atan2(s.y, s.x),
      f = Math.asin(s.z),
      h = n.CesiumMath.sign(i.dot(d, e)) * i.magnitude(d)
    return t.defined(a) ? ((a.longitude = l), (a.latitude = f), (a.height = h), a) : new y(l, f, h)
  }),
    (y.toCartesian = function (e, t, n) {
      return i.fromRadians(e.longitude, e.latitude, e.height, t, n)
    }),
    (y.clone = function (e, n) {
      if (t.defined(e))
        return t.defined(n)
          ? ((n.longitude = e.longitude), (n.latitude = e.latitude), (n.height = e.height), n)
          : new y(e.longitude, e.latitude, e.height)
    }),
    (y.equals = function (e, n) {
      return e === n || (t.defined(e) && t.defined(n) && e.longitude === n.longitude && e.latitude === n.latitude && e.height === n.height)
    }),
    (y.equalsEpsilon = function (e, n, i) {
      return (
        (i = t.defaultValue(i, 0)),
        e === n ||
          (t.defined(e) &&
            t.defined(n) &&
            Math.abs(e.longitude - n.longitude) <= i &&
            Math.abs(e.latitude - n.latitude) <= i &&
            Math.abs(e.height - n.height) <= i)
      )
    }),
    (y.ZERO = Object.freeze(new y(0, 0, 0))),
    (y.prototype.clone = function (e) {
      return y.clone(this, e)
    }),
    (y.prototype.equals = function (e) {
      return y.equals(this, e)
    }),
    (y.prototype.equalsEpsilon = function (e, t) {
      return y.equalsEpsilon(this, e, t)
    }),
    (y.prototype.toString = function () {
      return `(${this.longitude}, ${this.latitude}, ${this.height})`
    }),
    Object.defineProperties(q.prototype, {
      radii: {
        get: function () {
          return this._radii
        }
      },
      radiiSquared: {
        get: function () {
          return this._radiiSquared
        }
      },
      radiiToTheFourth: {
        get: function () {
          return this._radiiToTheFourth
        }
      },
      oneOverRadii: {
        get: function () {
          return this._oneOverRadii
        }
      },
      oneOverRadiiSquared: {
        get: function () {
          return this._oneOverRadiiSquared
        }
      },
      minimumRadius: {
        get: function () {
          return this._minimumRadius
        }
      },
      maximumRadius: {
        get: function () {
          return this._maximumRadius
        }
      }
    }),
    (q.clone = function (e, n) {
      if (!t.defined(e)) return
      const r = e._radii
      return t.defined(n)
        ? (i.clone(r, n._radii),
          i.clone(e._radiiSquared, n._radiiSquared),
          i.clone(e._radiiToTheFourth, n._radiiToTheFourth),
          i.clone(e._oneOverRadii, n._oneOverRadii),
          i.clone(e._oneOverRadiiSquared, n._oneOverRadiiSquared),
          (n._minimumRadius = e._minimumRadius),
          (n._maximumRadius = e._maximumRadius),
          (n._centerToleranceSquared = e._centerToleranceSquared),
          n)
        : new q(r.x, r.y, r.z)
    }),
    (q.fromCartesian3 = function (e, n) {
      return t.defined(n) || (n = new q()), t.defined(e) ? (S(n, e.x, e.y, e.z), n) : n
    }),
    (q.WGS84 = Object.freeze(new q(6378137, 6378137, 6356752.314245179))),
    (q.UNIT_SPHERE = Object.freeze(new q(1, 1, 1))),
    (q.MOON = Object.freeze(new q(n.CesiumMath.LUNAR_RADIUS, n.CesiumMath.LUNAR_RADIUS, n.CesiumMath.LUNAR_RADIUS))),
    (q.prototype.clone = function (e) {
      return q.clone(this, e)
    }),
    (q.packedLength = i.packedLength),
    (q.pack = function (e, n, r) {
      return (r = t.defaultValue(r, 0)), i.pack(e._radii, n, r), n
    }),
    (q.unpack = function (e, n, r) {
      n = t.defaultValue(n, 0)
      const a = i.unpack(e, n)
      return q.fromCartesian3(a, r)
    }),
    (q.prototype.geocentricSurfaceNormal = i.normalize),
    (q.prototype.geodeticSurfaceNormalCartographic = function (e, n) {
      const r = e.longitude,
        a = e.latitude,
        o = Math.cos(a),
        u = o * Math.cos(r),
        c = o * Math.sin(r),
        s = Math.sin(a)
      return t.defined(n) || (n = new i()), (n.x = u), (n.y = c), (n.z = s), i.normalize(n, n)
    }),
    (q.prototype.geodeticSurfaceNormal = function (e, r) {
      if (!i.equalsEpsilon(e, i.ZERO, n.CesiumMath.EPSILON14))
        return t.defined(r) || (r = new i()), (r = i.multiplyComponents(e, this._oneOverRadiiSquared, r)), i.normalize(r, r)
    })
  const R = new i(),
    _ = new i()
  ;(q.prototype.cartographicToCartesian = function (e, n) {
    const r = R,
      a = _
    this.geodeticSurfaceNormalCartographic(e, r), i.multiplyComponents(this._radiiSquared, r, a)
    const o = Math.sqrt(i.dot(r, a))
    return i.divideByScalar(a, o, a), i.multiplyByScalar(r, e.height, r), t.defined(n) || (n = new i()), i.add(a, r, n)
  }),
    (q.prototype.cartographicArrayToCartesianArray = function (e, n) {
      const i = e.length
      t.defined(n) ? (n.length = i) : (n = new Array(i))
      for (let t = 0; t < i; t++) n[t] = this.cartographicToCartesian(e[t], n[t])
      return n
    })
  const O = new i(),
    C = new i(),
    b = new i()
  ;(q.prototype.cartesianToCartographic = function (e, r) {
    const a = this.scaleToGeodeticSurface(e, C)
    if (!t.defined(a)) return
    const o = this.geodeticSurfaceNormal(a, O),
      u = i.subtract(e, a, b),
      c = Math.atan2(o.y, o.x),
      s = Math.asin(o.z),
      d = n.CesiumMath.sign(i.dot(u, e)) * i.magnitude(u)
    return t.defined(r) ? ((r.longitude = c), (r.latitude = s), (r.height = d), r) : new y(c, s, d)
  }),
    (q.prototype.cartesianArrayToCartographicArray = function (e, n) {
      const i = e.length
      t.defined(n) ? (n.length = i) : (n = new Array(i))
      for (let t = 0; t < i; ++t) n[t] = this.cartesianToCartographic(e[t], n[t])
      return n
    }),
    (q.prototype.scaleToGeodeticSurface = function (e, t) {
      return m(e, this._oneOverRadii, this._oneOverRadiiSquared, this._centerToleranceSquared, t)
    }),
    (q.prototype.scaleToGeocentricSurface = function (e, n) {
      t.defined(n) || (n = new i())
      const r = e.x,
        a = e.y,
        o = e.z,
        u = this._oneOverRadiiSquared,
        c = 1 / Math.sqrt(r * r * u.x + a * a * u.y + o * o * u.z)
      return i.multiplyByScalar(e, c, n)
    }),
    (q.prototype.transformPositionToScaledSpace = function (e, n) {
      return t.defined(n) || (n = new i()), i.multiplyComponents(e, this._oneOverRadii, n)
    }),
    (q.prototype.transformPositionFromScaledSpace = function (e, n) {
      return t.defined(n) || (n = new i()), i.multiplyComponents(e, this._radii, n)
    }),
    (q.prototype.equals = function (e) {
      return this === e || (t.defined(e) && i.equals(this._radii, e._radii))
    }),
    (q.prototype.toString = function () {
      return this._radii.toString()
    }),
    (q.prototype.getSurfaceNormalIntersectionWithZAxis = function (e, n, r) {
      n = t.defaultValue(n, 0)
      const a = this._squaredXOverSquaredZ
      if ((t.defined(r) || (r = new i()), (r.x = 0), (r.y = 0), (r.z = e.z * (1 - a)), !(Math.abs(r.z) >= this._radii.z - n))) return r
    })
  const E = [0.14887433898163, 0.43339539412925, 0.67940956829902, 0.86506336668898, 0.97390652851717, 0],
    T = [0.29552422471475, 0.26926671930999, 0.21908636251598, 0.14945134915058, 0.066671344308684, 0]
  function A(e, t, n) {
    const i = 0.5 * (t + e),
      r = 0.5 * (t - e)
    let a = 0
    for (let e = 0; e < 5; e++) {
      const t = r * E[e]
      a += T[e] * (n(i + t) + n(i - t))
    }
    return (a *= r), a
  }
  function v(e, n, i, r, a, o, u, c, s) {
    ;(this[0] = t.defaultValue(e, 0)),
      (this[1] = t.defaultValue(r, 0)),
      (this[2] = t.defaultValue(u, 0)),
      (this[3] = t.defaultValue(n, 0)),
      (this[4] = t.defaultValue(a, 0)),
      (this[5] = t.defaultValue(c, 0)),
      (this[6] = t.defaultValue(i, 0)),
      (this[7] = t.defaultValue(o, 0)),
      (this[8] = t.defaultValue(s, 0))
  }
  ;(q.prototype.surfaceArea = function (e) {
    const t = e.west
    let i = e.east
    const r = e.south,
      a = e.north
    for (; i < t; ) i += n.CesiumMath.TWO_PI
    const o = this._radiiSquared,
      u = o.x,
      c = o.y,
      s = o.z,
      d = u * c
    return A(r, a, function (e) {
      const n = Math.cos(e),
        r = Math.sin(e)
      return (
        Math.cos(e) *
        A(t, i, function (e) {
          const t = Math.cos(e),
            i = Math.sin(e)
          return Math.sqrt(d * r * r + s * (c * t * t + u * i * i) * n * n)
        })
      )
    })
  }),
    (v.packedLength = 9),
    (v.pack = function (e, n, i) {
      return (
        (i = t.defaultValue(i, 0)),
        (n[i++] = e[0]),
        (n[i++] = e[1]),
        (n[i++] = e[2]),
        (n[i++] = e[3]),
        (n[i++] = e[4]),
        (n[i++] = e[5]),
        (n[i++] = e[6]),
        (n[i++] = e[7]),
        (n[i++] = e[8]),
        n
      )
    }),
    (v.unpack = function (e, n, i) {
      return (
        (n = t.defaultValue(n, 0)),
        t.defined(i) || (i = new v()),
        (i[0] = e[n++]),
        (i[1] = e[n++]),
        (i[2] = e[n++]),
        (i[3] = e[n++]),
        (i[4] = e[n++]),
        (i[5] = e[n++]),
        (i[6] = e[n++]),
        (i[7] = e[n++]),
        (i[8] = e[n++]),
        i
      )
    }),
    (v.packArray = function (e, n) {
      const i = e.length,
        r = 9 * i
      t.defined(n) ? (Array.isArray(n) || n.length === r) && n.length !== r && (n.length = r) : (n = new Array(r))
      for (let t = 0; t < i; ++t) v.pack(e[t], n, 9 * t)
      return n
    }),
    (v.unpackArray = function (e, n) {
      const i = e.length
      t.defined(n) ? (n.length = i / 9) : (n = new Array(i / 9))
      for (let t = 0; t < i; t += 9) {
        const i = t / 9
        n[i] = v.unpack(e, t, n[i])
      }
      return n
    }),
    (v.clone = function (e, n) {
      if (t.defined(e))
        return t.defined(n)
          ? ((n[0] = e[0]), (n[1] = e[1]), (n[2] = e[2]), (n[3] = e[3]), (n[4] = e[4]), (n[5] = e[5]), (n[6] = e[6]), (n[7] = e[7]), (n[8] = e[8]), n)
          : new v(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8])
    }),
    (v.fromArray = v.unpack),
    (v.fromColumnMajorArray = function (e, t) {
      return v.clone(e, t)
    }),
    (v.fromRowMajorArray = function (e, n) {
      return t.defined(n)
        ? ((n[0] = e[0]), (n[1] = e[3]), (n[2] = e[6]), (n[3] = e[1]), (n[4] = e[4]), (n[5] = e[7]), (n[6] = e[2]), (n[7] = e[5]), (n[8] = e[8]), n)
        : new v(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8])
    }),
    (v.fromQuaternion = function (e, n) {
      const i = e.x * e.x,
        r = e.x * e.y,
        a = e.x * e.z,
        o = e.x * e.w,
        u = e.y * e.y,
        c = e.y * e.z,
        s = e.y * e.w,
        d = e.z * e.z,
        l = e.z * e.w,
        f = e.w * e.w,
        h = i - u - d + f,
        m = 2 * (r - l),
        y = 2 * (a + s),
        p = 2 * (r + l),
        g = -i + u - d + f,
        x = 2 * (c - o),
        z = 2 * (a - s),
        M = 2 * (c + o),
        w = -i - u + d + f
      return t.defined(n)
        ? ((n[0] = h), (n[1] = p), (n[2] = z), (n[3] = m), (n[4] = g), (n[5] = M), (n[6] = y), (n[7] = x), (n[8] = w), n)
        : new v(h, m, y, p, g, x, z, M, w)
    }),
    (v.fromHeadingPitchRoll = function (e, n) {
      const i = Math.cos(-e.pitch),
        r = Math.cos(-e.heading),
        a = Math.cos(e.roll),
        o = Math.sin(-e.pitch),
        u = Math.sin(-e.heading),
        c = Math.sin(e.roll),
        s = i * r,
        d = -a * u + c * o * r,
        l = c * u + a * o * r,
        f = i * u,
        h = a * r + c * o * u,
        m = -c * r + a * o * u,
        y = -o,
        p = c * i,
        g = a * i
      return t.defined(n)
        ? ((n[0] = s), (n[1] = f), (n[2] = y), (n[3] = d), (n[4] = h), (n[5] = p), (n[6] = l), (n[7] = m), (n[8] = g), n)
        : new v(s, d, l, f, h, m, y, p, g)
    }),
    (v.fromScale = function (e, n) {
      return t.defined(n)
        ? ((n[0] = e.x), (n[1] = 0), (n[2] = 0), (n[3] = 0), (n[4] = e.y), (n[5] = 0), (n[6] = 0), (n[7] = 0), (n[8] = e.z), n)
        : new v(e.x, 0, 0, 0, e.y, 0, 0, 0, e.z)
    }),
    (v.fromUniformScale = function (e, n) {
      return t.defined(n)
        ? ((n[0] = e), (n[1] = 0), (n[2] = 0), (n[3] = 0), (n[4] = e), (n[5] = 0), (n[6] = 0), (n[7] = 0), (n[8] = e), n)
        : new v(e, 0, 0, 0, e, 0, 0, 0, e)
    }),
    (v.fromCrossProduct = function (e, n) {
      return t.defined(n)
        ? ((n[0] = 0), (n[1] = e.z), (n[2] = -e.y), (n[3] = -e.z), (n[4] = 0), (n[5] = e.x), (n[6] = e.y), (n[7] = -e.x), (n[8] = 0), n)
        : new v(0, -e.z, e.y, e.z, 0, -e.x, -e.y, e.x, 0)
    }),
    (v.fromRotationX = function (e, n) {
      const i = Math.cos(e),
        r = Math.sin(e)
      return t.defined(n)
        ? ((n[0] = 1), (n[1] = 0), (n[2] = 0), (n[3] = 0), (n[4] = i), (n[5] = r), (n[6] = 0), (n[7] = -r), (n[8] = i), n)
        : new v(1, 0, 0, 0, i, -r, 0, r, i)
    }),
    (v.fromRotationY = function (e, n) {
      const i = Math.cos(e),
        r = Math.sin(e)
      return t.defined(n)
        ? ((n[0] = i), (n[1] = 0), (n[2] = -r), (n[3] = 0), (n[4] = 1), (n[5] = 0), (n[6] = r), (n[7] = 0), (n[8] = i), n)
        : new v(i, 0, r, 0, 1, 0, -r, 0, i)
    }),
    (v.fromRotationZ = function (e, n) {
      const i = Math.cos(e),
        r = Math.sin(e)
      return t.defined(n)
        ? ((n[0] = i), (n[1] = r), (n[2] = 0), (n[3] = -r), (n[4] = i), (n[5] = 0), (n[6] = 0), (n[7] = 0), (n[8] = 1), n)
        : new v(i, -r, 0, r, i, 0, 0, 0, 1)
    }),
    (v.toArray = function (e, n) {
      return t.defined(n)
        ? ((n[0] = e[0]), (n[1] = e[1]), (n[2] = e[2]), (n[3] = e[3]), (n[4] = e[4]), (n[5] = e[5]), (n[6] = e[6]), (n[7] = e[7]), (n[8] = e[8]), n)
        : [e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]]
    }),
    (v.getElementIndex = function (e, t) {
      return 3 * e + t
    }),
    (v.getColumn = function (e, t, n) {
      const i = 3 * t,
        r = e[i],
        a = e[i + 1],
        o = e[i + 2]
      return (n.x = r), (n.y = a), (n.z = o), n
    }),
    (v.setColumn = function (e, t, n, i) {
      const r = 3 * t
      return ((i = v.clone(e, i))[r] = n.x), (i[r + 1] = n.y), (i[r + 2] = n.z), i
    }),
    (v.getRow = function (e, t, n) {
      const i = e[t],
        r = e[t + 3],
        a = e[t + 6]
      return (n.x = i), (n.y = r), (n.z = a), n
    }),
    (v.setRow = function (e, t, n, i) {
      return ((i = v.clone(e, i))[t] = n.x), (i[t + 3] = n.y), (i[t + 6] = n.z), i
    })
  const N = new i()
  v.setScale = function (e, t, n) {
    const i = v.getScale(e, N),
      r = t.x / i.x,
      a = t.y / i.y,
      o = t.z / i.z
    return (
      (n[0] = e[0] * r),
      (n[1] = e[1] * r),
      (n[2] = e[2] * r),
      (n[3] = e[3] * a),
      (n[4] = e[4] * a),
      (n[5] = e[5] * a),
      (n[6] = e[6] * o),
      (n[7] = e[7] * o),
      (n[8] = e[8] * o),
      n
    )
  }
  const I = new i()
  v.setUniformScale = function (e, t, n) {
    const i = v.getScale(e, I),
      r = t / i.x,
      a = t / i.y,
      o = t / i.z
    return (
      (n[0] = e[0] * r),
      (n[1] = e[1] * r),
      (n[2] = e[2] * r),
      (n[3] = e[3] * a),
      (n[4] = e[4] * a),
      (n[5] = e[5] * a),
      (n[6] = e[6] * o),
      (n[7] = e[7] * o),
      (n[8] = e[8] * o),
      n
    )
  }
  const V = new i()
  v.getScale = function (e, t) {
    return (
      (t.x = i.magnitude(i.fromElements(e[0], e[1], e[2], V))),
      (t.y = i.magnitude(i.fromElements(e[3], e[4], e[5], V))),
      (t.z = i.magnitude(i.fromElements(e[6], e[7], e[8], V))),
      t
    )
  }
  const U = new i()
  v.getMaximumScale = function (e) {
    return v.getScale(e, U), i.maximumComponent(U)
  }
  const k = new i()
  v.setRotation = function (e, t, n) {
    const i = v.getScale(e, k)
    return (
      (n[0] = t[0] * i.x),
      (n[1] = t[1] * i.x),
      (n[2] = t[2] * i.x),
      (n[3] = t[3] * i.y),
      (n[4] = t[4] * i.y),
      (n[5] = t[5] * i.y),
      (n[6] = t[6] * i.z),
      (n[7] = t[7] * i.z),
      (n[8] = t[8] * i.z),
      n
    )
  }
  const L = new i()
  ;(v.getRotation = function (e, t) {
    const n = v.getScale(e, L)
    return (
      (t[0] = e[0] / n.x),
      (t[1] = e[1] / n.x),
      (t[2] = e[2] / n.x),
      (t[3] = e[3] / n.y),
      (t[4] = e[4] / n.y),
      (t[5] = e[5] / n.y),
      (t[6] = e[6] / n.z),
      (t[7] = e[7] / n.z),
      (t[8] = e[8] / n.z),
      t
    )
  }),
    (v.multiply = function (e, t, n) {
      const i = e[0] * t[0] + e[3] * t[1] + e[6] * t[2],
        r = e[1] * t[0] + e[4] * t[1] + e[7] * t[2],
        a = e[2] * t[0] + e[5] * t[1] + e[8] * t[2],
        o = e[0] * t[3] + e[3] * t[4] + e[6] * t[5],
        u = e[1] * t[3] + e[4] * t[4] + e[7] * t[5],
        c = e[2] * t[3] + e[5] * t[4] + e[8] * t[5],
        s = e[0] * t[6] + e[3] * t[7] + e[6] * t[8],
        d = e[1] * t[6] + e[4] * t[7] + e[7] * t[8],
        l = e[2] * t[6] + e[5] * t[7] + e[8] * t[8]
      return (n[0] = i), (n[1] = r), (n[2] = a), (n[3] = o), (n[4] = u), (n[5] = c), (n[6] = s), (n[7] = d), (n[8] = l), n
    }),
    (v.add = function (e, t, n) {
      return (
        (n[0] = e[0] + t[0]),
        (n[1] = e[1] + t[1]),
        (n[2] = e[2] + t[2]),
        (n[3] = e[3] + t[3]),
        (n[4] = e[4] + t[4]),
        (n[5] = e[5] + t[5]),
        (n[6] = e[6] + t[6]),
        (n[7] = e[7] + t[7]),
        (n[8] = e[8] + t[8]),
        n
      )
    }),
    (v.subtract = function (e, t, n) {
      return (
        (n[0] = e[0] - t[0]),
        (n[1] = e[1] - t[1]),
        (n[2] = e[2] - t[2]),
        (n[3] = e[3] - t[3]),
        (n[4] = e[4] - t[4]),
        (n[5] = e[5] - t[5]),
        (n[6] = e[6] - t[6]),
        (n[7] = e[7] - t[7]),
        (n[8] = e[8] - t[8]),
        n
      )
    }),
    (v.multiplyByVector = function (e, t, n) {
      const i = t.x,
        r = t.y,
        a = t.z,
        o = e[0] * i + e[3] * r + e[6] * a,
        u = e[1] * i + e[4] * r + e[7] * a,
        c = e[2] * i + e[5] * r + e[8] * a
      return (n.x = o), (n.y = u), (n.z = c), n
    }),
    (v.multiplyByScalar = function (e, t, n) {
      return (
        (n[0] = e[0] * t),
        (n[1] = e[1] * t),
        (n[2] = e[2] * t),
        (n[3] = e[3] * t),
        (n[4] = e[4] * t),
        (n[5] = e[5] * t),
        (n[6] = e[6] * t),
        (n[7] = e[7] * t),
        (n[8] = e[8] * t),
        n
      )
    }),
    (v.multiplyByScale = function (e, t, n) {
      return (
        (n[0] = e[0] * t.x),
        (n[1] = e[1] * t.x),
        (n[2] = e[2] * t.x),
        (n[3] = e[3] * t.y),
        (n[4] = e[4] * t.y),
        (n[5] = e[5] * t.y),
        (n[6] = e[6] * t.z),
        (n[7] = e[7] * t.z),
        (n[8] = e[8] * t.z),
        n
      )
    }),
    (v.multiplyByUniformScale = function (e, t, n) {
      return (
        (n[0] = e[0] * t),
        (n[1] = e[1] * t),
        (n[2] = e[2] * t),
        (n[3] = e[3] * t),
        (n[4] = e[4] * t),
        (n[5] = e[5] * t),
        (n[6] = e[6] * t),
        (n[7] = e[7] * t),
        (n[8] = e[8] * t),
        n
      )
    }),
    (v.negate = function (e, t) {
      return (
        (t[0] = -e[0]),
        (t[1] = -e[1]),
        (t[2] = -e[2]),
        (t[3] = -e[3]),
        (t[4] = -e[4]),
        (t[5] = -e[5]),
        (t[6] = -e[6]),
        (t[7] = -e[7]),
        (t[8] = -e[8]),
        t
      )
    }),
    (v.transpose = function (e, t) {
      const n = e[0],
        i = e[3],
        r = e[6],
        a = e[1],
        o = e[4],
        u = e[7],
        c = e[2],
        s = e[5],
        d = e[8]
      return (t[0] = n), (t[1] = i), (t[2] = r), (t[3] = a), (t[4] = o), (t[5] = u), (t[6] = c), (t[7] = s), (t[8] = d), t
    })
  const B = [1, 0, 0],
    j = [2, 2, 1]
  function $(e) {
    let t = 0
    for (let n = 0; n < 3; ++n) {
      const i = e[v.getElementIndex(j[n], B[n])]
      t += 2 * i * i
    }
    return Math.sqrt(t)
  }
  function P(e, t) {
    const i = n.CesiumMath.EPSILON15
    let r = 0,
      a = 1
    for (let t = 0; t < 3; ++t) {
      const n = Math.abs(e[v.getElementIndex(j[t], B[t])])
      n > r && ((a = t), (r = n))
    }
    let o = 1,
      u = 0
    const c = B[a],
      s = j[a]
    if (Math.abs(e[v.getElementIndex(s, c)]) > i) {
      const t = (e[v.getElementIndex(s, s)] - e[v.getElementIndex(c, c)]) / 2 / e[v.getElementIndex(s, c)]
      let n
      ;(n = t < 0 ? -1 / (-t + Math.sqrt(1 + t * t)) : 1 / (t + Math.sqrt(1 + t * t))), (o = 1 / Math.sqrt(1 + n * n)), (u = n * o)
    }
    return (
      ((t = v.clone(v.IDENTITY, t))[v.getElementIndex(c, c)] = t[v.getElementIndex(s, s)] = o),
      (t[v.getElementIndex(s, c)] = u),
      (t[v.getElementIndex(c, s)] = -u),
      t
    )
  }
  const D = new v(),
    W = new v()
  ;(v.computeEigenDecomposition = function (e, i) {
    const r = n.CesiumMath.EPSILON20
    let a = 0,
      o = 0
    t.defined(i) || (i = {})
    const u = (i.unitary = v.clone(v.IDENTITY, i.unitary)),
      c = (i.diagonal = v.clone(e, i.diagonal)),
      s =
        r *
        (function (e) {
          let t = 0
          for (let n = 0; n < 9; ++n) {
            const i = e[n]
            t += i * i
          }
          return Math.sqrt(t)
        })(c)
    for (; o < 10 && $(c) > s; ) P(c, D), v.transpose(D, W), v.multiply(c, D, c), v.multiply(W, c, c), v.multiply(u, D, u), ++a > 2 && (++o, (a = 0))
    return i
  }),
    (v.abs = function (e, t) {
      return (
        (t[0] = Math.abs(e[0])),
        (t[1] = Math.abs(e[1])),
        (t[2] = Math.abs(e[2])),
        (t[3] = Math.abs(e[3])),
        (t[4] = Math.abs(e[4])),
        (t[5] = Math.abs(e[5])),
        (t[6] = Math.abs(e[6])),
        (t[7] = Math.abs(e[7])),
        (t[8] = Math.abs(e[8])),
        t
      )
    }),
    (v.determinant = function (e) {
      const t = e[0],
        n = e[3],
        i = e[6],
        r = e[1],
        a = e[4],
        o = e[7],
        u = e[2],
        c = e[5],
        s = e[8]
      return t * (a * s - c * o) + r * (c * i - n * s) + u * (n * o - a * i)
    }),
    (v.inverse = function (e, t) {
      const n = e[0],
        i = e[1],
        r = e[2],
        a = e[3],
        o = e[4],
        u = e[5],
        c = e[6],
        s = e[7],
        d = e[8],
        l = v.determinant(e)
      ;(t[0] = o * d - s * u),
        (t[1] = s * r - i * d),
        (t[2] = i * u - o * r),
        (t[3] = c * u - a * d),
        (t[4] = n * d - c * r),
        (t[5] = a * r - n * u),
        (t[6] = a * s - c * o),
        (t[7] = c * i - n * s),
        (t[8] = n * o - a * i)
      const f = 1 / l
      return v.multiplyByScalar(t, f, t)
    })
  const Z = new v()
  ;(v.inverseTranspose = function (e, t) {
    return v.inverse(v.transpose(e, Z), t)
  }),
    (v.equals = function (e, n) {
      return (
        e === n ||
        (t.defined(e) &&
          t.defined(n) &&
          e[0] === n[0] &&
          e[1] === n[1] &&
          e[2] === n[2] &&
          e[3] === n[3] &&
          e[4] === n[4] &&
          e[5] === n[5] &&
          e[6] === n[6] &&
          e[7] === n[7] &&
          e[8] === n[8])
      )
    }),
    (v.equalsEpsilon = function (e, n, i) {
      return (
        (i = t.defaultValue(i, 0)),
        e === n ||
          (t.defined(e) &&
            t.defined(n) &&
            Math.abs(e[0] - n[0]) <= i &&
            Math.abs(e[1] - n[1]) <= i &&
            Math.abs(e[2] - n[2]) <= i &&
            Math.abs(e[3] - n[3]) <= i &&
            Math.abs(e[4] - n[4]) <= i &&
            Math.abs(e[5] - n[5]) <= i &&
            Math.abs(e[6] - n[6]) <= i &&
            Math.abs(e[7] - n[7]) <= i &&
            Math.abs(e[8] - n[8]) <= i)
      )
    }),
    (v.IDENTITY = Object.freeze(new v(1, 0, 0, 0, 1, 0, 0, 0, 1))),
    (v.ZERO = Object.freeze(new v(0, 0, 0, 0, 0, 0, 0, 0, 0))),
    (v.COLUMN0ROW0 = 0),
    (v.COLUMN0ROW1 = 1),
    (v.COLUMN0ROW2 = 2),
    (v.COLUMN1ROW0 = 3),
    (v.COLUMN1ROW1 = 4),
    (v.COLUMN1ROW2 = 5),
    (v.COLUMN2ROW0 = 6),
    (v.COLUMN2ROW1 = 7),
    (v.COLUMN2ROW2 = 8),
    Object.defineProperties(v.prototype, {
      length: {
        get: function () {
          return v.packedLength
        }
      }
    }),
    (v.prototype.clone = function (e) {
      return v.clone(this, e)
    }),
    (v.prototype.equals = function (e) {
      return v.equals(this, e)
    }),
    (v.equalsArray = function (e, t, n) {
      return (
        e[0] === t[n] &&
        e[1] === t[n + 1] &&
        e[2] === t[n + 2] &&
        e[3] === t[n + 3] &&
        e[4] === t[n + 4] &&
        e[5] === t[n + 5] &&
        e[6] === t[n + 6] &&
        e[7] === t[n + 7] &&
        e[8] === t[n + 8]
      )
    }),
    (v.prototype.equalsEpsilon = function (e, t) {
      return v.equalsEpsilon(this, e, t)
    }),
    (v.prototype.toString = function () {
      return `(${this[0]}, ${this[3]}, ${this[6]})\n(${this[1]}, ${this[4]}, ${this[7]})\n(${this[2]}, ${this[5]}, ${this[8]})`
    }),
    (e.Cartesian3 = i),
    (e.Cartographic = y),
    (e.Ellipsoid = q),
    (e.Matrix3 = v)
})
