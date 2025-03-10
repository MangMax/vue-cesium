define([
  './AxisAlignedBoundingBox-2c0751ca',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './TerrainEncoding-7a03fd29',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './Transforms-20461479',
  './WebMercatorProjection-943e2226',
  './createTaskProcessorWorker',
  './RuntimeError-9b4ce3fb',
  './AttributeCompression-48e336db',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './combine-0c102d93'
], function (e, t, r, n, o, i, a, s, c, d, h, u, l, I, g) {
  'use strict'
  function m() {
    s.DeveloperError.throwInstantiationError()
  }
  Object.defineProperties(m.prototype, {
    errorEvent: { get: s.DeveloperError.throwInstantiationError },
    credit: { get: s.DeveloperError.throwInstantiationError },
    tilingScheme: { get: s.DeveloperError.throwInstantiationError },
    ready: { get: s.DeveloperError.throwInstantiationError },
    readyPromise: { get: s.DeveloperError.throwInstantiationError },
    hasWaterMask: { get: s.DeveloperError.throwInstantiationError },
    hasVertexNormals: { get: s.DeveloperError.throwInstantiationError },
    availability: { get: s.DeveloperError.throwInstantiationError }
  })
  const T = []
  m.getRegularGridIndices = function (e, t) {
    let r = T[e]
    n.defined(r) || (T[e] = r = [])
    let o = r[t]
    return (
      n.defined(o) ||
        ((o =
          e * t < a.CesiumMath.SIXTY_FOUR_KILOBYTES
            ? (r[t] = new Uint16Array((e - 1) * (t - 1) * 6))
            : (r[t] = new Uint32Array((e - 1) * (t - 1) * 6))),
        y(e, t, o, 0)),
      o
    )
  }
  const E = []
  m.getRegularGridIndicesAndEdgeIndices = function (e, t) {
    let r = E[e]
    n.defined(r) || (E[e] = r = [])
    let o = r[t]
    if (!n.defined(o)) {
      const n = m.getRegularGridIndices(e, t),
        i = f(e, t),
        a = i.westIndicesSouthToNorth,
        s = i.southIndicesEastToWest,
        c = i.eastIndicesNorthToSouth,
        d = i.northIndicesWestToEast
      o = r[t] = { indices: n, westIndicesSouthToNorth: a, southIndicesEastToWest: s, eastIndicesNorthToSouth: c, northIndicesWestToEast: d }
    }
    return o
  }
  const p = []
  function f(e, t) {
    const r = new Array(t),
      n = new Array(e),
      o = new Array(t),
      i = new Array(e)
    let a
    for (a = 0; a < e; ++a) (i[a] = a), (n[a] = e * t - 1 - a)
    for (a = 0; a < t; ++a) (o[a] = (a + 1) * e - 1), (r[a] = (t - a - 1) * e)
    return { westIndicesSouthToNorth: r, southIndicesEastToWest: n, eastIndicesNorthToSouth: o, northIndicesWestToEast: i }
  }
  function y(e, t, r, n) {
    let o = 0
    for (let i = 0; i < t - 1; ++i) {
      for (let t = 0; t < e - 1; ++t) {
        const t = o,
          i = t + e,
          a = i + 1,
          s = t + 1
        ;(r[n++] = t), (r[n++] = i), (r[n++] = s), (r[n++] = s), (r[n++] = i), (r[n++] = a), ++o
      }
      ++o
    }
  }
  function N(e, t, r, n) {
    let o = e[0]
    const i = e.length
    for (let a = 1; a < i; ++a) {
      const i = e[a]
      ;(r[n++] = o), (r[n++] = i), (r[n++] = t), (r[n++] = t), (r[n++] = i), (r[n++] = t + 1), (o = i), ++t
    }
    return n
  }
  ;(m.getRegularGridAndSkirtIndicesAndEdgeIndices = function (e, t) {
    let r = p[e]
    n.defined(r) || (p[e] = r = [])
    let o = r[t]
    if (!n.defined(o)) {
      const n = e * t,
        a = (e - 1) * (t - 1) * 6,
        s = 2 * e + 2 * t,
        c = n + s,
        d = a + 6 * Math.max(0, s - 4),
        h = f(e, t),
        u = h.westIndicesSouthToNorth,
        l = h.southIndicesEastToWest,
        I = h.eastIndicesNorthToSouth,
        g = h.northIndicesWestToEast,
        T = i.IndexDatatype.createTypedArray(c, d)
      y(e, t, T, 0),
        m.addSkirtIndices(u, l, I, g, n, T, a),
        (o = r[t] =
          {
            indices: T,
            westIndicesSouthToNorth: u,
            southIndicesEastToWest: l,
            eastIndicesNorthToSouth: I,
            northIndicesWestToEast: g,
            indexCountWithoutSkirts: a
          })
    }
    return o
  }),
    (m.addSkirtIndices = function (e, t, r, n, o, i, a) {
      let s = o
      ;(a = N(e, s, i, a)), (s += e.length), (a = N(t, s, i, a)), (s += t.length), (a = N(r, s, i, a)), (s += r.length), N(n, s, i, a)
    }),
    (m.heightmapTerrainQuality = 0.25),
    (m.getEstimatedLevelZeroGeometricErrorForAHeightmap = function (e, t, r) {
      return (2 * e.maximumRadius * Math.PI * m.heightmapTerrainQuality) / (t * r)
    }),
    (m.prototype.requestTileGeometry = s.DeveloperError.throwInstantiationError),
    (m.prototype.getLevelMaximumGeometricError = s.DeveloperError.throwInstantiationError),
    (m.prototype.getTileDataAvailable = s.DeveloperError.throwInstantiationError),
    (m.prototype.loadTileDataAvailability = s.DeveloperError.throwInstantiationError)
  const w = 32767,
    M = new r.Cartesian3(),
    S = new r.Cartesian3(),
    x = new r.Cartesian3(),
    A = new r.Cartographic(),
    C = new t.Cartesian2()
  function b(e, n, o, i, s, c, d, h, u) {
    let l = Number.POSITIVE_INFINITY
    const I = s.north,
      g = s.south
    let m = s.east
    const T = s.west
    m < T && (m += a.CesiumMath.TWO_PI)
    const E = e.length
    for (let s = 0; s < E; ++s) {
      const E = e[s],
        p = o[E],
        f = i[E]
      ;(A.longitude = a.CesiumMath.lerp(T, m, f.x)), (A.latitude = a.CesiumMath.lerp(g, I, f.y)), (A.height = p - n)
      const y = c.cartographicToCartesian(A, M)
      t.Matrix4.multiplyByPoint(d, y, y),
        r.Cartesian3.minimumByComponent(y, h, h),
        r.Cartesian3.maximumByComponent(y, u, u),
        (l = Math.min(l, A.height))
    }
    return l
  }
  function W(e, t, r, o, i, s, d, h, u, l, I, g, m, T) {
    const E = n.defined(d),
      p = u.north,
      f = u.south
    let y = u.east
    const N = u.west
    y < N && (y += a.CesiumMath.TWO_PI)
    const w = r.length
    for (let n = 0; n < w; ++n) {
      const u = r[n],
        w = i[u],
        S = s[u]
      ;(A.longitude = a.CesiumMath.lerp(N, y, S.x) + m), (A.latitude = a.CesiumMath.lerp(f, p, S.y) + T), (A.height = w - l)
      const x = h.cartographicToCartesian(A, M)
      if (E) {
        const e = 2 * u
        ;(C.x = d[e]), (C.y = d[e + 1])
      }
      let b, W
      o.hasWebMercatorT && (b = (c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(A.latitude) - I) * g),
        o.hasGeodeticSurfaceNormals && (W = h.geodeticSurfaceNormal(x)),
        (t = o.encode(e, t, x, S, A.height, C, b, W))
    }
  }
  function v(e, t) {
    let r
    return (
      'function' == typeof e.slice && ((r = e.slice()), 'function' != typeof r.sort && (r = void 0)),
      n.defined(r) || (r = Array.prototype.slice.call(e)),
      r.sort(t),
      r
    )
  }
  return d(function (d, h) {
    const u = d.quantizedVertices,
      l = u.length / 3,
      I = d.octEncodedNormals,
      g = d.westIndices.length + d.eastIndices.length + d.southIndices.length + d.northIndices.length,
      T = d.includeWebMercatorT,
      E = d.exaggeration,
      p = d.exaggerationRelativeHeight,
      f = 1 !== E,
      y = t.Rectangle.clone(d.rectangle),
      N = y.west,
      P = y.south,
      D = y.east,
      k = y.north,
      F = r.Ellipsoid.clone(d.ellipsoid),
      H = d.minimumHeight,
      _ = d.maximumHeight,
      G = d.relativeToCenter,
      V = s.Transforms.eastNorthUpToFixedFrame(G, F),
      Y = t.Matrix4.inverseTransformation(V, new t.Matrix4())
    let O, B
    T &&
      ((O = c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(P)), (B = 1 / (c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(k) - O)))
    const R = u.subarray(0, l),
      L = u.subarray(l, 2 * l),
      j = u.subarray(2 * l, 3 * l),
      U = n.defined(I),
      z = new Array(l),
      q = new Array(l),
      Q = new Array(l),
      K = T ? new Array(l) : [],
      X = f ? new Array(l) : [],
      Z = S
    ;(Z.x = Number.POSITIVE_INFINITY), (Z.y = Number.POSITIVE_INFINITY), (Z.z = Number.POSITIVE_INFINITY)
    const J = x
    ;(J.x = Number.NEGATIVE_INFINITY), (J.y = Number.NEGATIVE_INFINITY), (J.z = Number.NEGATIVE_INFINITY)
    let $ = Number.POSITIVE_INFINITY,
      ee = Number.NEGATIVE_INFINITY,
      te = Number.POSITIVE_INFINITY,
      re = Number.NEGATIVE_INFINITY
    for (let e = 0; e < l; ++e) {
      const n = R[e],
        o = L[e],
        i = n / w,
        s = o / w,
        d = a.CesiumMath.lerp(H, _, j[e] / w)
      ;(A.longitude = a.CesiumMath.lerp(N, D, i)),
        (A.latitude = a.CesiumMath.lerp(P, k, s)),
        (A.height = d),
        ($ = Math.min(A.longitude, $)),
        (ee = Math.max(A.longitude, ee)),
        (te = Math.min(A.latitude, te)),
        (re = Math.max(A.latitude, re))
      const h = F.cartographicToCartesian(A)
      ;(z[e] = new t.Cartesian2(i, s)),
        (q[e] = d),
        (Q[e] = h),
        T && (K[e] = (c.WebMercatorProjection.geodeticLatitudeToMercatorAngle(A.latitude) - O) * B),
        f && (X[e] = F.geodeticSurfaceNormal(h)),
        t.Matrix4.multiplyByPoint(Y, h, M),
        r.Cartesian3.minimumByComponent(M, Z, Z),
        r.Cartesian3.maximumByComponent(M, J, J)
    }
    const ne = v(d.westIndices, function (e, t) {
        return z[e].y - z[t].y
      }),
      oe = v(d.eastIndices, function (e, t) {
        return z[t].y - z[e].y
      }),
      ie = v(d.southIndices, function (e, t) {
        return z[t].x - z[e].x
      }),
      ae = v(d.northIndices, function (e, t) {
        return z[e].x - z[t].x
      })
    let se
    if (H < 0) {
      se = new o.EllipsoidalOccluder(F).computeHorizonCullingPointPossiblyUnderEllipsoid(G, Q, H)
    }
    let ce = H
    ;(ce = Math.min(ce, b(d.westIndices, d.westSkirtHeight, q, z, y, F, Y, Z, J))),
      (ce = Math.min(ce, b(d.southIndices, d.southSkirtHeight, q, z, y, F, Y, Z, J))),
      (ce = Math.min(ce, b(d.eastIndices, d.eastSkirtHeight, q, z, y, F, Y, Z, J))),
      (ce = Math.min(ce, b(d.northIndices, d.northSkirtHeight, q, z, y, F, Y, Z, J)))
    const de = new e.AxisAlignedBoundingBox(Z, J, G),
      he = new o.TerrainEncoding(G, de, ce, _, V, U, T, f, E, p),
      ue = he.stride,
      le = new Float32Array(l * ue + g * ue)
    let Ie = 0
    for (let e = 0; e < l; ++e) {
      if (U) {
        const t = 2 * e
        ;(C.x = I[t]), (C.y = I[t + 1])
      }
      Ie = he.encode(le, Ie, Q[e], z[e], q[e], C, K[e], X[e])
    }
    const ge = Math.max(0, 2 * (g - 4)),
      me = d.indices.length + 3 * ge,
      Te = i.IndexDatatype.createTypedArray(l + g, me)
    Te.set(d.indices, 0)
    const Ee = 1e-4,
      pe = (ee - $) * Ee,
      fe = (re - te) * Ee,
      ye = -pe,
      Ne = pe,
      we = fe,
      Me = -fe
    let Se = l * ue
    return (
      W(le, Se, ne, he, q, z, I, F, y, d.westSkirtHeight, O, B, ye, 0),
      (Se += d.westIndices.length * ue),
      W(le, Se, ie, he, q, z, I, F, y, d.southSkirtHeight, O, B, 0, Me),
      (Se += d.southIndices.length * ue),
      W(le, Se, oe, he, q, z, I, F, y, d.eastSkirtHeight, O, B, Ne, 0),
      (Se += d.eastIndices.length * ue),
      W(le, Se, ae, he, q, z, I, F, y, d.northSkirtHeight, O, B, 0, we),
      m.addSkirtIndices(ne, ie, oe, ae, l, Te, d.indices.length),
      h.push(le.buffer, Te.buffer),
      {
        vertices: le.buffer,
        indices: Te.buffer,
        westIndicesSouthToNorth: ne,
        southIndicesEastToWest: ie,
        eastIndicesNorthToSouth: oe,
        northIndicesWestToEast: ae,
        vertexStride: ue,
        center: G,
        minimumHeight: H,
        maximumHeight: _,
        occludeePointInScaledSpace: se,
        encoding: he,
        indexCountWithoutSkirts: d.indices.length
      }
    )
  })
})
