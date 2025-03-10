define([
  'exports',
  './AxisAlignedBoundingBox-2c0751ca',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './Transforms-20461479'
], function (t, n, e, i, o, r, s, a) {
  'use strict'
  const l = new e.Cartesian4()
  function c(t, n) {
    t = (n = o.defaultValue(n, i.Ellipsoid.WGS84)).scaleToGeodeticSurface(t)
    const r = a.Transforms.eastNorthUpToFixedFrame(t, n)
    ;(this._ellipsoid = n),
      (this._origin = t),
      (this._xAxis = i.Cartesian3.fromCartesian4(e.Matrix4.getColumn(r, 0, l))),
      (this._yAxis = i.Cartesian3.fromCartesian4(e.Matrix4.getColumn(r, 1, l)))
    const c = i.Cartesian3.fromCartesian4(e.Matrix4.getColumn(r, 2, l))
    this._plane = s.Plane.fromPointNormal(t, c)
  }
  Object.defineProperties(c.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    origin: {
      get: function () {
        return this._origin
      }
    },
    plane: {
      get: function () {
        return this._plane
      }
    },
    xAxis: {
      get: function () {
        return this._xAxis
      }
    },
    yAxis: {
      get: function () {
        return this._yAxis
      }
    },
    zAxis: {
      get: function () {
        return this._plane.normal
      }
    }
  })
  const d = new n.AxisAlignedBoundingBox()
  c.fromPoints = function (t, e) {
    return new c(n.AxisAlignedBoundingBox.fromPoints(t, d).center, e)
  }
  const p = new r.Ray(),
    u = new i.Cartesian3()
  ;(c.prototype.projectPointOntoPlane = function (t, n) {
    const s = p
    ;(s.origin = t), i.Cartesian3.normalize(t, s.direction)
    let a = r.IntersectionTests.rayPlane(s, this._plane, u)
    if ((o.defined(a) || (i.Cartesian3.negate(s.direction, s.direction), (a = r.IntersectionTests.rayPlane(s, this._plane, u))), o.defined(a))) {
      const t = i.Cartesian3.subtract(a, this._origin, a),
        r = i.Cartesian3.dot(this._xAxis, t),
        s = i.Cartesian3.dot(this._yAxis, t)
      return o.defined(n) ? ((n.x = r), (n.y = s), n) : new e.Cartesian2(r, s)
    }
  }),
    (c.prototype.projectPointsOntoPlane = function (t, n) {
      o.defined(n) || (n = [])
      let e = 0
      const i = t.length
      for (let r = 0; r < i; r++) {
        const i = this.projectPointOntoPlane(t[r], n[e])
        o.defined(i) && ((n[e] = i), e++)
      }
      return (n.length = e), n
    }),
    (c.prototype.projectPointToNearestOnPlane = function (t, n) {
      o.defined(n) || (n = new e.Cartesian2())
      const s = p
      ;(s.origin = t), i.Cartesian3.clone(this._plane.normal, s.direction)
      let a = r.IntersectionTests.rayPlane(s, this._plane, u)
      o.defined(a) || (i.Cartesian3.negate(s.direction, s.direction), (a = r.IntersectionTests.rayPlane(s, this._plane, u)))
      const l = i.Cartesian3.subtract(a, this._origin, a),
        c = i.Cartesian3.dot(this._xAxis, l),
        d = i.Cartesian3.dot(this._yAxis, l)
      return (n.x = c), (n.y = d), n
    }),
    (c.prototype.projectPointsToNearestOnPlane = function (t, n) {
      o.defined(n) || (n = [])
      const e = t.length
      n.length = e
      for (let i = 0; i < e; i++) n[i] = this.projectPointToNearestOnPlane(t[i], n[i])
      return n
    })
  const f = new i.Cartesian3()
  ;(c.prototype.projectPointOntoEllipsoid = function (t, n) {
    o.defined(n) || (n = new i.Cartesian3())
    const e = this._ellipsoid,
      r = this._origin,
      s = this._xAxis,
      a = this._yAxis,
      l = f
    return (
      i.Cartesian3.multiplyByScalar(s, t.x, l),
      (n = i.Cartesian3.add(r, l, n)),
      i.Cartesian3.multiplyByScalar(a, t.y, l),
      i.Cartesian3.add(n, l, n),
      e.scaleToGeocentricSurface(n, n),
      n
    )
  }),
    (c.prototype.projectPointsOntoEllipsoid = function (t, n) {
      const e = t.length
      o.defined(n) ? (n.length = e) : (n = new Array(e))
      for (let i = 0; i < e; ++i) n[i] = this.projectPointOntoEllipsoid(t[i], n[i])
      return n
    }),
    (t.EllipsoidTangentPlane = c)
})
