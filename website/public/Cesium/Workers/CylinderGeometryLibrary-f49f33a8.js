define(['exports', './Math-2ce22ee9'], function (t, n) {
  'use strict'
  const o = {
    computePositions: function (t, o, e, r, s) {
      const i = 0.5 * t,
        c = -i,
        a = r + r,
        u = new Float64Array(3 * (s ? 2 * a : a))
      let f,
        h = 0,
        y = 0
      const M = s ? 3 * a : 0,
        l = s ? 3 * (a + r) : 3 * r
      for (f = 0; f < r; f++) {
        const t = (f / r) * n.CesiumMath.TWO_PI,
          a = Math.cos(t),
          m = Math.sin(t),
          d = a * e,
          p = m * e,
          C = a * o,
          P = m * o
        ;(u[y + M] = d),
          (u[y + M + 1] = p),
          (u[y + M + 2] = c),
          (u[y + l] = C),
          (u[y + l + 1] = P),
          (u[y + l + 2] = i),
          (y += 3),
          s && ((u[h++] = d), (u[h++] = p), (u[h++] = c), (u[h++] = C), (u[h++] = P), (u[h++] = i))
      }
      return u
    }
  }
  var e = o
  t.CylinderGeometryLibrary = e
})
