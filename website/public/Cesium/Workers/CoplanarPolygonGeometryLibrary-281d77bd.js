define(['exports', './Matrix2-413c4048', './Matrix3-81054f0f', './OrientedBoundingBox-fc7f7ca4'], function (n, t, e, r) {
  'use strict'
  const a = {},
    i = new e.Cartesian3(),
    o = new e.Cartesian3(),
    u = new e.Cartesian3(),
    s = new e.Cartesian3(),
    c = new r.OrientedBoundingBox()
  function C(n, r, a, o, u) {
    const s = e.Cartesian3.subtract(n, r, i),
      c = e.Cartesian3.dot(a, s),
      C = e.Cartesian3.dot(o, s)
    return t.Cartesian2.fromElements(c, C, u)
  }
  ;(a.validOutline = function (n) {
    const t = r.OrientedBoundingBox.fromPoints(n, c).halfAxes,
      a = e.Matrix3.getColumn(t, 0, o),
      i = e.Matrix3.getColumn(t, 1, u),
      C = e.Matrix3.getColumn(t, 2, s),
      m = e.Cartesian3.magnitude(a),
      g = e.Cartesian3.magnitude(i),
      l = e.Cartesian3.magnitude(C)
    return !((0 === m && (0 === g || 0 === l)) || (0 === g && 0 === l))
  }),
    (a.computeProjectTo2DArguments = function (n, t, a, i) {
      const C = r.OrientedBoundingBox.fromPoints(n, c),
        m = C.halfAxes,
        g = e.Matrix3.getColumn(m, 0, o),
        l = e.Matrix3.getColumn(m, 1, u),
        d = e.Matrix3.getColumn(m, 2, s),
        f = e.Cartesian3.magnitude(g),
        x = e.Cartesian3.magnitude(l),
        M = e.Cartesian3.magnitude(d),
        B = Math.min(f, x, M)
      if ((0 === f && (0 === x || 0 === M)) || (0 === x && 0 === M)) return !1
      let P, w
      return (
        (B !== x && B !== M) || (P = g),
        B === f ? (P = l) : B === M && (w = l),
        (B !== f && B !== x) || (w = d),
        e.Cartesian3.normalize(P, a),
        e.Cartesian3.normalize(w, i),
        e.Cartesian3.clone(C.center, t),
        !0
      )
    }),
    (a.createProjectPointsTo2DFunction = function (n, t, e) {
      return function (r) {
        const a = new Array(r.length)
        for (let i = 0; i < r.length; i++) a[i] = C(r[i], n, t, e)
        return a
      }
    }),
    (a.createProjectPointTo2DFunction = function (n, t, e) {
      return function (r, a) {
        return C(r, n, t, e, a)
      }
    })
  var m = a
  n.CoplanarPolygonGeometryLibrary = m
})
