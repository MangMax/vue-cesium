define(['exports', './Matrix3-81054f0f', './defaultValue-f6d5e6da', './Transforms-20461479'], function (n, e, t, i) {
  'use strict'
  function a(n, i, a) {
    ;(this.minimum = e.Cartesian3.clone(t.defaultValue(n, e.Cartesian3.ZERO))),
      (this.maximum = e.Cartesian3.clone(t.defaultValue(i, e.Cartesian3.ZERO))),
      (a = t.defined(a) ? e.Cartesian3.clone(a) : e.Cartesian3.midpoint(this.minimum, this.maximum, new e.Cartesian3())),
      (this.center = a)
  }
  ;(a.fromCorners = function (n, i, m) {
    return (
      t.defined(m) || (m = new a()),
      (m.minimum = e.Cartesian3.clone(n, m.minimum)),
      (m.maximum = e.Cartesian3.clone(i, m.maximum)),
      (m.center = e.Cartesian3.midpoint(n, i, m.center)),
      m
    )
  }),
    (a.fromPoints = function (n, i) {
      if ((t.defined(i) || (i = new a()), !t.defined(n) || 0 === n.length))
        return (
          (i.minimum = e.Cartesian3.clone(e.Cartesian3.ZERO, i.minimum)),
          (i.maximum = e.Cartesian3.clone(e.Cartesian3.ZERO, i.maximum)),
          (i.center = e.Cartesian3.clone(e.Cartesian3.ZERO, i.center)),
          i
        )
      let m = n[0].x,
        r = n[0].y,
        s = n[0].z,
        u = n[0].x,
        c = n[0].y,
        o = n[0].z
      const l = n.length
      for (let e = 1; e < l; e++) {
        const t = n[e],
          i = t.x,
          a = t.y,
          l = t.z
        ;(m = Math.min(i, m)), (u = Math.max(i, u)), (r = Math.min(a, r)), (c = Math.max(a, c)), (s = Math.min(l, s)), (o = Math.max(l, o))
      }
      const C = i.minimum
      ;(C.x = m), (C.y = r), (C.z = s)
      const f = i.maximum
      return (f.x = u), (f.y = c), (f.z = o), (i.center = e.Cartesian3.midpoint(C, f, i.center)), i
    }),
    (a.clone = function (n, i) {
      if (t.defined(n))
        return t.defined(i)
          ? ((i.minimum = e.Cartesian3.clone(n.minimum, i.minimum)),
            (i.maximum = e.Cartesian3.clone(n.maximum, i.maximum)),
            (i.center = e.Cartesian3.clone(n.center, i.center)),
            i)
          : new a(n.minimum, n.maximum, n.center)
    }),
    (a.equals = function (n, i) {
      return (
        n === i ||
        (t.defined(n) &&
          t.defined(i) &&
          e.Cartesian3.equals(n.center, i.center) &&
          e.Cartesian3.equals(n.minimum, i.minimum) &&
          e.Cartesian3.equals(n.maximum, i.maximum))
      )
    })
  let m = new e.Cartesian3()
  ;(a.intersectPlane = function (n, t) {
    m = e.Cartesian3.subtract(n.maximum, n.minimum, m)
    const a = e.Cartesian3.multiplyByScalar(m, 0.5, m),
      r = t.normal,
      s = a.x * Math.abs(r.x) + a.y * Math.abs(r.y) + a.z * Math.abs(r.z),
      u = e.Cartesian3.dot(n.center, r) + t.distance
    return u - s > 0 ? i.Intersect.INSIDE : u + s < 0 ? i.Intersect.OUTSIDE : i.Intersect.INTERSECTING
  }),
    (a.prototype.clone = function (n) {
      return a.clone(this, n)
    }),
    (a.prototype.intersectPlane = function (n) {
      return a.intersectPlane(this, n)
    }),
    (a.prototype.equals = function (n) {
      return a.equals(this, n)
    }),
    (n.AxisAlignedBoundingBox = a)
})
