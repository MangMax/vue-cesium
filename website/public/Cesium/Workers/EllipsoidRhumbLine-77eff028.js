define(['exports', './Matrix3-81054f0f', './defaultValue-f6d5e6da', './Math-2ce22ee9'], function (t, i, e, a) {
  'use strict'
  function n(t, i, e) {
    if (0 === t) return i * e
    const a = t * t,
      n = a * a,
      s = n * a,
      h = s * a,
      u = h * a,
      o = u * a,
      l = e
    return (
      i *
      ((1 - a / 4 - (3 * n) / 64 - (5 * s) / 256 - (175 * h) / 16384 - (441 * u) / 65536 - (4851 * o) / 1048576) * l -
        ((3 * a) / 8 + (3 * n) / 32 + (45 * s) / 1024 + (105 * h) / 4096 + (2205 * u) / 131072 + (6237 * o) / 524288) * Math.sin(2 * l) +
        ((15 * n) / 256 + (45 * s) / 1024 + (525 * h) / 16384 + (1575 * u) / 65536 + (155925 * o) / 8388608) * Math.sin(4 * l) -
        ((35 * s) / 3072 + (175 * h) / 12288 + (3675 * u) / 262144 + (13475 * o) / 1048576) * Math.sin(6 * l) +
        ((315 * h) / 131072 + (2205 * u) / 524288 + (43659 * o) / 8388608) * Math.sin(8 * l) -
        ((693 * u) / 1310720 + (6237 * o) / 5242880) * Math.sin(10 * l) +
        ((1001 * o) / 8388608) * Math.sin(12 * l))
    )
  }
  function s(t, i) {
    if (0 === t) return Math.log(Math.tan(0.5 * (a.CesiumMath.PI_OVER_TWO + i)))
    const e = t * Math.sin(i)
    return Math.log(Math.tan(0.5 * (a.CesiumMath.PI_OVER_TWO + i))) - (t / 2) * Math.log((1 + e) / (1 - e))
  }
  const h = new i.Cartesian3(),
    u = new i.Cartesian3()
  function o(t, e, o, l) {
    i.Cartesian3.normalize(l.cartographicToCartesian(e, u), h), i.Cartesian3.normalize(l.cartographicToCartesian(o, u), u)
    const r = l.maximumRadius,
      d = l.minimumRadius,
      c = r * r,
      M = d * d
    ;(t._ellipticitySquared = (c - M) / c),
      (t._ellipticity = Math.sqrt(t._ellipticitySquared)),
      (t._start = i.Cartographic.clone(e, t._start)),
      (t._start.height = 0),
      (t._end = i.Cartographic.clone(o, t._end)),
      (t._end.height = 0),
      (t._heading = (function (t, i, e, n, h) {
        const u = s(t._ellipticity, e),
          o = s(t._ellipticity, h)
        return Math.atan2(a.CesiumMath.negativePiToPi(n - i), o - u)
      })(t, e.longitude, e.latitude, o.longitude, o.latitude)),
      (t._distance = (function (t, i, e, s, h, u, o) {
        const l = t._heading,
          r = u - s
        let d = 0
        if (a.CesiumMath.equalsEpsilon(Math.abs(l), a.CesiumMath.PI_OVER_TWO, a.CesiumMath.EPSILON8))
          if (i === e) d = i * Math.cos(h) * a.CesiumMath.negativePiToPi(r)
          else {
            const e = Math.sin(h)
            d = (i * Math.cos(h) * a.CesiumMath.negativePiToPi(r)) / Math.sqrt(1 - t._ellipticitySquared * e * e)
          }
        else {
          const e = n(t._ellipticity, i, h)
          d = (n(t._ellipticity, i, o) - e) / Math.cos(l)
        }
        return Math.abs(d)
      })(t, l.maximumRadius, l.minimumRadius, e.longitude, e.latitude, o.longitude, o.latitude))
  }
  function l(t, h, u, o, l, r) {
    if (0 === u) return i.Cartographic.clone(t, r)
    const d = l * l
    let c, M, g
    if (Math.abs(a.CesiumMath.PI_OVER_TWO - Math.abs(h)) > a.CesiumMath.EPSILON8) {
      M = (function (t, i, e) {
        const a = t / e
        if (0 === i) return a
        const n = a * a,
          s = n * a,
          h = s * a,
          u = i * i,
          o = u * u,
          l = o * u,
          r = l * u,
          d = r * u,
          c = d * u,
          M = Math.sin(2 * a),
          g = Math.cos(2 * a),
          m = Math.sin(4 * a),
          _ = Math.cos(4 * a),
          p = Math.sin(6 * a),
          C = Math.cos(6 * a),
          f = Math.sin(8 * a),
          P = Math.cos(8 * a),
          O = Math.sin(10 * a)
        return (
          a +
          (a * u) / 4 +
          (7 * a * o) / 64 +
          (15 * a * l) / 256 +
          (579 * a * r) / 16384 +
          (1515 * a * d) / 65536 +
          (16837 * a * c) / 1048576 +
          ((3 * a * o) / 16 +
            (45 * a * l) / 256 -
            (a * (32 * n - 561) * r) / 4096 -
            (a * (232 * n - 1677) * d) / 16384 +
            (a * (399985 - 90560 * n + 512 * h) * c) / 5242880) *
            g +
          ((21 * a * l) / 256 + (483 * a * r) / 4096 - (a * (224 * n - 1969) * d) / 16384 - (a * (33152 * n - 112599) * c) / 1048576) * _ +
          ((151 * a * r) / 4096 + (4681 * a * d) / 65536 + (1479 * a * c) / 16384 - (453 * s * c) / 32768) * C +
          ((1097 * a * d) / 65536 + (42783 * a * c) / 1048576) * P +
          ((8011 * a * c) / 1048576) * Math.cos(10 * a) +
          ((3 * u) / 8 +
            (3 * o) / 16 +
            (213 * l) / 2048 -
            (3 * n * l) / 64 +
            (255 * r) / 4096 -
            (33 * n * r) / 512 +
            (20861 * d) / 524288 -
            (33 * n * d) / 512 +
            (h * d) / 1024 +
            (28273 * c) / 1048576 -
            (471 * n * c) / 8192 +
            (9 * h * c) / 4096) *
            M +
          ((21 * o) / 256 +
            (21 * l) / 256 +
            (533 * r) / 8192 -
            (21 * n * r) / 512 +
            (197 * d) / 4096 -
            (315 * n * d) / 4096 +
            (584039 * c) / 16777216 -
            (12517 * n * c) / 131072 +
            (7 * h * c) / 2048) *
            m +
          ((151 * l) / 6144 + (151 * r) / 4096 + (5019 * d) / 131072 - (453 * n * d) / 16384 + (26965 * c) / 786432 - (8607 * n * c) / 131072) * p +
          ((1097 * r) / 131072 + (1097 * d) / 65536 + (225797 * c) / 10485760 - (1097 * n * c) / 65536) * f +
          ((8011 * d) / 2621440 + (8011 * c) / 1048576) * O +
          ((293393 * c) / 251658240) * Math.sin(12 * a)
        )
      })(n(l, o, t.latitude) + u * Math.cos(h), l, o)
      const i = s(l, t.latitude),
        e = s(l, M)
      ;(g = Math.tan(h) * (e - i)), (c = a.CesiumMath.negativePiToPi(t.longitude + g))
    } else {
      let i
      if (((M = t.latitude), 0 === l)) i = o * Math.cos(t.latitude)
      else {
        const e = Math.sin(t.latitude)
        i = (o * Math.cos(t.latitude)) / Math.sqrt(1 - d * e * e)
      }
      ;(g = u / i), (c = h > 0 ? a.CesiumMath.negativePiToPi(t.longitude + g) : a.CesiumMath.negativePiToPi(t.longitude - g))
    }
    return e.defined(r) ? ((r.longitude = c), (r.latitude = M), (r.height = 0), r) : new i.Cartographic(c, M, 0)
  }
  function r(t, a, n) {
    const s = e.defaultValue(n, i.Ellipsoid.WGS84)
    ;(this._ellipsoid = s),
      (this._start = new i.Cartographic()),
      (this._end = new i.Cartographic()),
      (this._heading = void 0),
      (this._distance = void 0),
      (this._ellipticity = void 0),
      (this._ellipticitySquared = void 0),
      e.defined(t) && e.defined(a) && o(this, t, a, s)
  }
  Object.defineProperties(r.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    surfaceDistance: {
      get: function () {
        return this._distance
      }
    },
    start: {
      get: function () {
        return this._start
      }
    },
    end: {
      get: function () {
        return this._end
      }
    },
    heading: {
      get: function () {
        return this._heading
      }
    }
  }),
    (r.fromStartHeadingDistance = function (t, n, s, h, u) {
      const o = e.defaultValue(h, i.Ellipsoid.WGS84),
        d = o.maximumRadius,
        c = o.minimumRadius,
        M = d * d,
        g = c * c,
        m = Math.sqrt((M - g) / M),
        _ = l(t, (n = a.CesiumMath.negativePiToPi(n)), s, o.maximumRadius, m)
      return !e.defined(u) || (e.defined(h) && !h.equals(u.ellipsoid)) ? new r(t, _, o) : (u.setEndPoints(t, _), u)
    }),
    (r.prototype.setEndPoints = function (t, i) {
      o(this, t, i, this._ellipsoid)
    }),
    (r.prototype.interpolateUsingFraction = function (t, i) {
      return this.interpolateUsingSurfaceDistance(t * this._distance, i)
    }),
    (r.prototype.interpolateUsingSurfaceDistance = function (t, i) {
      return l(this._start, this._heading, t, this._ellipsoid.maximumRadius, this._ellipticity, i)
    }),
    (r.prototype.findIntersectionWithLongitude = function (t, n) {
      const s = this._ellipticity,
        h = this._heading,
        u = Math.abs(h),
        o = this._start
      if (
        ((t = a.CesiumMath.negativePiToPi(t)),
        a.CesiumMath.equalsEpsilon(Math.abs(t), Math.PI, a.CesiumMath.EPSILON14) && (t = a.CesiumMath.sign(o.longitude) * Math.PI),
        e.defined(n) || (n = new i.Cartographic()),
        Math.abs(a.CesiumMath.PI_OVER_TWO - u) <= a.CesiumMath.EPSILON8)
      )
        return (n.longitude = t), (n.latitude = o.latitude), (n.height = 0), n
      if (a.CesiumMath.equalsEpsilon(Math.abs(a.CesiumMath.PI_OVER_TWO - u), a.CesiumMath.PI_OVER_TWO, a.CesiumMath.EPSILON8)) {
        if (a.CesiumMath.equalsEpsilon(t, o.longitude, a.CesiumMath.EPSILON12)) return
        return (n.longitude = t), (n.latitude = a.CesiumMath.PI_OVER_TWO * a.CesiumMath.sign(a.CesiumMath.PI_OVER_TWO - h)), (n.height = 0), n
      }
      const l = o.latitude,
        r = s * Math.sin(l),
        d = Math.tan(0.5 * (a.CesiumMath.PI_OVER_TWO + l)) * Math.exp((t - o.longitude) / Math.tan(h)),
        c = (1 + r) / (1 - r)
      let M,
        g = o.latitude
      do {
        M = g
        const t = s * Math.sin(M),
          i = (1 + t) / (1 - t)
        g = 2 * Math.atan(d * Math.pow(i / c, s / 2)) - a.CesiumMath.PI_OVER_TWO
      } while (!a.CesiumMath.equalsEpsilon(g, M, a.CesiumMath.EPSILON12))
      return (n.longitude = t), (n.latitude = g), (n.height = 0), n
    }),
    (r.prototype.findIntersectionWithLatitude = function (t, n) {
      const h = this._ellipticity,
        u = this._heading,
        o = this._start
      if (a.CesiumMath.equalsEpsilon(Math.abs(u), a.CesiumMath.PI_OVER_TWO, a.CesiumMath.EPSILON8)) return
      const l = s(h, o.latitude),
        r = s(h, t),
        d = Math.tan(u) * (r - l),
        c = a.CesiumMath.negativePiToPi(o.longitude + d)
      return e.defined(n) ? ((n.longitude = c), (n.latitude = t), (n.height = 0), n) : new i.Cartographic(c, t, 0)
    }),
    (t.EllipsoidRhumbLine = r)
})
