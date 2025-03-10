define([
  './AttributeCompression-48e336db',
  './Matrix3-81054f0f',
  './Color-498d4f06',
  './defaultValue-f6d5e6da',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './OrientedBoundingBox-fc7f7ca4',
  './Matrix2-413c4048',
  './createTaskProcessorWorker',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './Transforms-20461479',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './EllipsoidTangentPlane-d430e7d5',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1'
], function (e, t, n, a, r, o, i, s, c, f, d, l, u, h, g, p, y, m) {
  'use strict'
  const b = new t.Cartesian3(),
    x = new t.Ellipsoid(),
    C = new s.Rectangle(),
    I = { min: void 0, max: void 0, indexBytesPerElement: void 0 }
  function w(e, t, a) {
    const r = t.length,
      o =
        2 +
        r * i.OrientedBoundingBox.packedLength +
        1 +
        (function (e) {
          const t = e.length
          let a = 0
          for (let r = 0; r < t; ++r) a += n.Color.packedLength + 3 + e[r].batchIds.length
          return a
        })(a),
      s = new Float64Array(o)
    let c = 0
    ;(s[c++] = e), (s[c++] = r)
    for (let e = 0; e < r; ++e) i.OrientedBoundingBox.pack(t[e], s, c), (c += i.OrientedBoundingBox.packedLength)
    const f = a.length
    s[c++] = f
    for (let e = 0; e < f; ++e) {
      const t = a[e]
      n.Color.pack(t.color, s, c), (c += n.Color.packedLength), (s[c++] = t.offset), (s[c++] = t.count)
      const r = t.batchIds,
        o = r.length
      s[c++] = o
      for (let e = 0; e < o; ++e) s[c++] = r[e]
    }
    return s
  }
  const A = new t.Cartesian3(),
    E = new t.Cartesian3(),
    N = new t.Cartesian3(),
    T = new t.Cartesian3(),
    B = new t.Cartesian3(),
    k = new t.Cartographic(),
    L = new s.Rectangle()
  return c(function (c, f) {
    let d
    !(function (e) {
      const n = new Float64Array(e)
      let a = 0
      ;(I.indexBytesPerElement = n[a++]),
        (I.min = n[a++]),
        (I.max = n[a++]),
        t.Cartesian3.unpack(n, a, b),
        (a += t.Cartesian3.packedLength),
        t.Ellipsoid.unpack(n, a, x),
        (a += t.Ellipsoid.packedLength),
        s.Rectangle.unpack(n, a, C)
    })(c.packedBuffer),
      (d = 2 === I.indexBytesPerElement ? new Uint16Array(c.indices) : new Uint32Array(c.indices))
    const l = new Uint16Array(c.positions),
      u = new Uint32Array(c.counts),
      h = new Uint32Array(c.indexCounts),
      g = new Uint32Array(c.batchIds),
      p = new Uint32Array(c.batchTableColors),
      y = new Array(u.length),
      m = b,
      O = x
    let U = C
    const P = I.min,
      F = I.max
    let M,
      S,
      D,
      R = c.minimumHeights,
      _ = c.maximumHeights
    a.defined(R) && a.defined(_) && ((R = new Float32Array(R)), (_ = new Float32Array(_)))
    const G = l.length / 2,
      V = l.subarray(0, G),
      Y = l.subarray(G, 2 * G)
    e.AttributeCompression.zigZagDeltaDecode(V, Y)
    const v = new Float64Array(3 * G)
    for (M = 0; M < G; ++M) {
      const e = V[M],
        n = Y[M],
        a = o.CesiumMath.lerp(U.west, U.east, e / 32767),
        r = o.CesiumMath.lerp(U.south, U.north, n / 32767),
        i = t.Cartographic.fromRadians(a, r, 0, k),
        s = O.cartographicToCartesian(i, A)
      t.Cartesian3.pack(s, v, 3 * M)
    }
    const H = u.length,
      W = new Array(H),
      z = new Array(H)
    let K = 0,
      Z = 0
    for (M = 0; M < H; ++M) (W[M] = K), (z[M] = Z), (K += u[M]), (Z += h[M])
    const j = new Float32Array(3 * G * 2),
      q = new Uint16Array(2 * G),
      J = new Uint32Array(z.length),
      Q = new Uint32Array(h.length)
    let X = []
    const $ = {}
    for (M = 0; M < H; ++M)
      (D = p[M]),
        a.defined($[D])
          ? (($[D].positionLength += u[M]), ($[D].indexLength += h[M]), $[D].batchIds.push(M))
          : ($[D] = { positionLength: u[M], indexLength: h[M], offset: 0, indexOffset: 0, batchIds: [M] })
    let ee,
      te = 0,
      ne = 0
    for (D in $)
      if ($.hasOwnProperty(D)) {
        ;(ee = $[D]), (ee.offset = te), (ee.indexOffset = ne)
        const e = 2 * ee.positionLength,
          t = 2 * ee.indexLength + 6 * ee.positionLength
        ;(te += e), (ne += t), (ee.indexLength = t)
      }
    const ae = []
    for (D in $)
      $.hasOwnProperty(D) &&
        ((ee = $[D]), ae.push({ color: n.Color.fromRgba(parseInt(D)), offset: ee.indexOffset, count: ee.indexLength, batchIds: ee.batchIds }))
    for (M = 0; M < H; ++M) {
      ;(D = p[M]), (ee = $[D])
      const e = ee.offset
      let n = 3 * e,
        r = e
      const o = W[M],
        s = u[M],
        c = g[M]
      let f = P,
        l = F
      a.defined(R) && a.defined(_) && ((f = R[M]), (l = _[M]))
      let b = Number.POSITIVE_INFINITY,
        x = Number.NEGATIVE_INFINITY,
        C = Number.POSITIVE_INFINITY,
        I = Number.NEGATIVE_INFINITY
      for (S = 0; S < s; ++S) {
        const e = t.Cartesian3.unpack(v, 3 * o + 3 * S, A)
        O.scaleToGeodeticSurface(e, e)
        const a = O.cartesianToCartographic(e, k),
          i = a.latitude,
          s = a.longitude
        ;(b = Math.min(i, b)), (x = Math.max(i, x)), (C = Math.min(s, C)), (I = Math.max(s, I))
        const d = O.geodeticSurfaceNormal(e, E)
        let u = t.Cartesian3.multiplyByScalar(d, f, N)
        const h = t.Cartesian3.add(e, u, T)
        u = t.Cartesian3.multiplyByScalar(d, l, u)
        const g = t.Cartesian3.add(e, u, B)
        t.Cartesian3.subtract(g, m, g),
          t.Cartesian3.subtract(h, m, h),
          t.Cartesian3.pack(g, j, n),
          t.Cartesian3.pack(h, j, n + 3),
          (q[r] = c),
          (q[r + 1] = c),
          (n += 6),
          (r += 2)
      }
      ;(U = L), (U.west = C), (U.east = I), (U.south = b), (U.north = x), (y[M] = i.OrientedBoundingBox.fromRectangle(U, P, F, O))
      let w = ee.indexOffset
      const G = z[M],
        V = h[M]
      for (J[M] = w, S = 0; S < V; S += 3) {
        const t = d[G + S] - o,
          n = d[G + S + 1] - o,
          a = d[G + S + 2] - o
        ;(X[w++] = 2 * t + e),
          (X[w++] = 2 * n + e),
          (X[w++] = 2 * a + e),
          (X[w++] = 2 * a + 1 + e),
          (X[w++] = 2 * n + 1 + e),
          (X[w++] = 2 * t + 1 + e)
      }
      for (S = 0; S < s; ++S) {
        const t = S,
          n = (S + 1) % s
        ;(X[w++] = 2 * t + 1 + e),
          (X[w++] = 2 * n + e),
          (X[w++] = 2 * t + e),
          (X[w++] = 2 * t + 1 + e),
          (X[w++] = 2 * n + 1 + e),
          (X[w++] = 2 * n + e)
      }
      ;(ee.offset += 2 * s), (ee.indexOffset = w), (Q[M] = w - J[M])
    }
    X = r.IndexDatatype.createTypedArray(j.length / 3, X)
    const re = ae.length
    for (let e = 0; e < re; ++e) {
      const t = ae[e].batchIds
      let n = 0
      const a = t.length
      for (let e = 0; e < a; ++e) n += Q[t[e]]
      ae[e].count = n
    }
    const oe = w(2 === X.BYTES_PER_ELEMENT ? r.IndexDatatype.UNSIGNED_SHORT : r.IndexDatatype.UNSIGNED_INT, y, ae)
    return (
      f.push(j.buffer, X.buffer, J.buffer, Q.buffer, q.buffer, oe.buffer),
      { positions: j.buffer, indices: X.buffer, indexOffsets: J.buffer, indexCounts: Q.buffer, batchIds: q.buffer, packedBuffer: oe.buffer }
    )
  })
})
