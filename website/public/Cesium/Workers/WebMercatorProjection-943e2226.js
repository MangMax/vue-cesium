define(['exports', './Matrix3-81054f0f', './defaultValue-f6d5e6da', './Math-2ce22ee9'], function (t, e, i, o) {
  'use strict'
  function a(t) {
    ;(this._ellipsoid = i.defaultValue(t, e.Ellipsoid.WGS84)),
      (this._semimajorAxis = this._ellipsoid.maximumRadius),
      (this._oneOverSemimajorAxis = 1 / this._semimajorAxis)
  }
  Object.defineProperties(a.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    }
  }),
    (a.mercatorAngleToGeodeticLatitude = function (t) {
      return o.CesiumMath.PI_OVER_TWO - 2 * Math.atan(Math.exp(-t))
    }),
    (a.geodeticLatitudeToMercatorAngle = function (t) {
      t > a.MaximumLatitude ? (t = a.MaximumLatitude) : t < -a.MaximumLatitude && (t = -a.MaximumLatitude)
      const e = Math.sin(t)
      return 0.5 * Math.log((1 + e) / (1 - e))
    }),
    (a.MaximumLatitude = a.mercatorAngleToGeodeticLatitude(Math.PI)),
    (a.prototype.project = function (t, o) {
      const r = this._semimajorAxis,
        n = t.longitude * r,
        u = a.geodeticLatitudeToMercatorAngle(t.latitude) * r,
        d = t.height
      return i.defined(o) ? ((o.x = n), (o.y = u), (o.z = d), o) : new e.Cartesian3(n, u, d)
    }),
    (a.prototype.unproject = function (t, o) {
      const r = this._oneOverSemimajorAxis,
        n = t.x * r,
        u = a.mercatorAngleToGeodeticLatitude(t.y * r),
        d = t.z
      return i.defined(o) ? ((o.longitude = n), (o.latitude = u), (o.height = d), o) : new e.Cartographic(n, u, d)
    }),
    (t.WebMercatorProjection = a)
})
