define([
  './AttributeCompression-48e336db',
  './Matrix3-81054f0f',
  './Math-2ce22ee9',
  './Matrix2-413c4048',
  './createTaskProcessorWorker',
  './ComponentDatatype-ab629b88',
  './defaultValue-f6d5e6da',
  './WebGLConstants-7f557f93',
  './RuntimeError-9b4ce3fb'
], function (e, t, a, r, n, o, i, s, c) {
  'use strict'
  const u = 32767,
    p = new t.Cartographic(),
    l = new t.Cartesian3(),
    m = new r.Rectangle(),
    f = new t.Ellipsoid(),
    h = { min: void 0, max: void 0 }
  return n(function (n, o) {
    const i = new Uint16Array(n.positions)
    !(function (e) {
      e = new Float64Array(e)
      let a = 0
      ;(h.min = e[a++]), (h.max = e[a++]), r.Rectangle.unpack(e, a, m), (a += r.Rectangle.packedLength), t.Ellipsoid.unpack(e, a, f)
    })(n.packedBuffer)
    const s = m,
      c = f,
      C = h.min,
      g = h.max,
      d = i.length / 3,
      b = i.subarray(0, d),
      w = i.subarray(d, 2 * d),
      k = i.subarray(2 * d, 3 * d)
    e.AttributeCompression.zigZagDeltaDecode(b, w, k)
    const y = new Float64Array(i.length)
    for (let e = 0; e < d; ++e) {
      const r = b[e],
        n = w[e],
        o = k[e],
        i = a.CesiumMath.lerp(s.west, s.east, r / u),
        m = a.CesiumMath.lerp(s.south, s.north, n / u),
        f = a.CesiumMath.lerp(C, g, o / u),
        h = t.Cartographic.fromRadians(i, m, f, p),
        d = c.cartographicToCartesian(h, l)
      t.Cartesian3.pack(d, y, 3 * e)
    }
    return o.push(y.buffer), { positions: y.buffer }
  })
})
