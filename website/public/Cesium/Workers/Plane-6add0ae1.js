define(['exports', './Matrix3-81054f0f', './Matrix2-413c4048', './defaultValue-f6d5e6da'], function (n, e, a, t) {
  'use strict'
  function r(n, a) {
    ;(this.normal = e.Cartesian3.clone(n)), (this.distance = a)
  }
  r.fromPointNormal = function (n, a, i) {
    const s = -e.Cartesian3.dot(a, n)
    return t.defined(i) ? (e.Cartesian3.clone(a, i.normal), (i.distance = s), i) : new r(a, s)
  }
  const i = new e.Cartesian3()
  ;(r.fromCartesian4 = function (n, a) {
    const s = e.Cartesian3.fromCartesian4(n, i),
      o = n.w
    return t.defined(a) ? (e.Cartesian3.clone(s, a.normal), (a.distance = o), a) : new r(s, o)
  }),
    (r.getPointDistance = function (n, a) {
      return e.Cartesian3.dot(n.normal, a) + n.distance
    })
  const s = new e.Cartesian3()
  r.projectPointOntoPlane = function (n, a, i) {
    t.defined(i) || (i = new e.Cartesian3())
    const o = r.getPointDistance(n, a),
      c = e.Cartesian3.multiplyByScalar(n.normal, o, s)
    return e.Cartesian3.subtract(a, c, i)
  }
  const o = new a.Matrix4(),
    c = new a.Cartesian4(),
    l = new e.Cartesian3()
  ;(r.transform = function (n, t, i) {
    const s = n.normal,
      C = n.distance,
      d = a.Matrix4.inverseTranspose(t, o)
    let f = a.Cartesian4.fromElements(s.x, s.y, s.z, C, c)
    f = a.Matrix4.multiplyByVector(d, f, f)
    const u = e.Cartesian3.fromCartesian4(f, l)
    return (f = a.Cartesian4.divideByScalar(f, e.Cartesian3.magnitude(u), f)), r.fromCartesian4(f, i)
  }),
    (r.clone = function (n, a) {
      return t.defined(a) ? (e.Cartesian3.clone(n.normal, a.normal), (a.distance = n.distance), a) : new r(n.normal, n.distance)
    }),
    (r.equals = function (n, a) {
      return n.distance === a.distance && e.Cartesian3.equals(n.normal, a.normal)
    }),
    (r.ORIGIN_XY_PLANE = Object.freeze(new r(e.Cartesian3.UNIT_Z, 0))),
    (r.ORIGIN_YZ_PLANE = Object.freeze(new r(e.Cartesian3.UNIT_X, 0))),
    (r.ORIGIN_ZX_PLANE = Object.freeze(new r(e.Cartesian3.UNIT_Y, 0))),
    (n.Plane = r)
})
