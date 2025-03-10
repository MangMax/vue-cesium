define(['exports', './Matrix3-81054f0f', './defaultValue-f6d5e6da', './Transforms-20461479', './Math-2ce22ee9', './Matrix2-413c4048'], function (
  t,
  n,
  a,
  o,
  r,
  e
) {
  'use strict'
  const s = Math.cos,
    i = Math.sin,
    c = Math.sqrt,
    g = {
      computePosition: function (t, n, o, r, e, g, u) {
        const h = n.radiiSquared,
          l = t.nwCorner,
          C = t.boundingRectangle
        let S = l.latitude - t.granYCos * r + e * t.granXSin
        const M = s(S),
          d = i(S),
          w = h.z * d
        let X = l.longitude + r * t.granYSin + e * t.granXCos
        const Y = M * s(X),
          m = M * i(X),
          f = h.x * Y,
          p = h.y * m,
          x = c(f * Y + p * m + w * d)
        if (((g.x = f / x), (g.y = p / x), (g.z = w / x), o)) {
          const n = t.stNwCorner
          a.defined(n)
            ? ((S = n.latitude - t.stGranYCos * r + e * t.stGranXSin),
              (X = n.longitude + r * t.stGranYSin + e * t.stGranXCos),
              (u.x = (X - t.stWest) * t.lonScalar),
              (u.y = (S - t.stSouth) * t.latScalar))
            : ((u.x = (X - C.west) * t.lonScalar), (u.y = (S - C.south) * t.latScalar))
        }
      }
    },
    u = new e.Matrix2()
  let h = new n.Cartesian3()
  const l = new n.Cartographic()
  let C = new n.Cartesian3()
  const S = new o.GeographicProjection()
  function M(t, a, o, r, s, i, c) {
    const g = Math.cos(a),
      l = r * g,
      M = o * g,
      d = Math.sin(a),
      w = r * d,
      X = o * d
    ;(h = S.project(t, h)), (h = n.Cartesian3.subtract(h, C, h))
    const Y = e.Matrix2.fromRotation(a, u)
    ;(h = e.Matrix2.multiplyByVector(Y, h, h)), (h = n.Cartesian3.add(h, C, h)), (i -= 1), (c -= 1)
    const m = (t = S.unproject(h, t)).latitude,
      f = m + i * X,
      p = m - l * c,
      x = m - l * c + i * X,
      G = Math.max(m, f, p, x),
      R = Math.min(m, f, p, x),
      y = t.longitude,
      O = y + i * M,
      P = y + c * w,
      W = y + c * w + i * M
    return {
      north: G,
      south: R,
      east: Math.max(y, O, P, W),
      west: Math.min(y, O, P, W),
      granYCos: l,
      granYSin: w,
      granXCos: M,
      granXSin: X,
      nwCorner: t
    }
  }
  g.computeOptions = function (t, n, a, o, s, i, c) {
    let g,
      u = t.east,
      h = t.west,
      d = t.north,
      w = t.south,
      X = !1,
      Y = !1
    d === r.CesiumMath.PI_OVER_TWO && (X = !0), w === -r.CesiumMath.PI_OVER_TWO && (Y = !0)
    const m = d - w
    g = h > u ? r.CesiumMath.TWO_PI - h + u : u - h
    const f = Math.ceil(g / n) + 1,
      p = Math.ceil(m / n) + 1,
      x = g / (f - 1),
      G = m / (p - 1),
      R = e.Rectangle.northwest(t, i),
      y = e.Rectangle.center(t, l)
    ;(0 === a && 0 === o) || (y.longitude < R.longitude && (y.longitude += r.CesiumMath.TWO_PI), (C = S.project(y, C)))
    const O = G,
      P = x,
      W = e.Rectangle.clone(t, s),
      _ = { granYCos: O, granYSin: 0, granXCos: P, granXSin: 0, nwCorner: R, boundingRectangle: W, width: f, height: p, northCap: X, southCap: Y }
    if (0 !== a) {
      const t = M(R, a, x, G, 0, f, p)
      ;(d = t.north),
        (w = t.south),
        (u = t.east),
        (h = t.west),
        (_.granYCos = t.granYCos),
        (_.granYSin = t.granYSin),
        (_.granXCos = t.granXCos),
        (_.granXSin = t.granXSin),
        (W.north = d),
        (W.south = w),
        (W.east = u),
        (W.west = h)
    }
    if (0 !== o) {
      a -= o
      const t = e.Rectangle.northwest(W, c),
        n = M(t, a, x, G, 0, f, p)
      ;(_.stGranYCos = n.granYCos),
        (_.stGranXCos = n.granXCos),
        (_.stGranYSin = n.granYSin),
        (_.stGranXSin = n.granXSin),
        (_.stNwCorner = t),
        (_.stWest = n.west),
        (_.stSouth = n.south)
    }
    return _
  }
  var d = g
  t.RectangleGeometryLibrary = d
})
