define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './ArcType-26a3f38d',
  './arrayRemoveDuplicates-9b636830',
  './Transforms-20461479',
  './Color-498d4f06',
  './ComponentDatatype-ab629b88',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolylinePipeline-5ae670bc',
  './VertexFormat-fbdec922',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93',
  './EllipsoidGeodesic-2723ab86',
  './EllipsoidRhumbLine-77eff028',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1'
], function (e, t, o, r, n, a, i, l, s, c, p, d, u, y, m, h, f, C, g, _, A) {
  'use strict'
  const E = []
  function P(e, t, o, r, n) {
    const i = E
    let l
    i.length = n
    const s = o.red,
      c = o.green,
      p = o.blue,
      d = o.alpha,
      u = r.red,
      y = r.green,
      m = r.blue,
      h = r.alpha
    if (a.Color.equals(o, r)) {
      for (l = 0; l < n; l++) i[l] = a.Color.clone(o)
      return i
    }
    const f = (u - s) / n,
      C = (y - c) / n,
      g = (m - p) / n,
      _ = (h - d) / n
    for (l = 0; l < n; l++) i[l] = new a.Color(s + l * f, c + l * C, p + l * g, d + l * _)
    return i
  }
  function x(r) {
    const n = (r = e.defaultValue(r, e.defaultValue.EMPTY_OBJECT)).positions,
      i = r.colors,
      l = e.defaultValue(r.width, 1),
      s = e.defaultValue(r.colorsPerVertex, !1)
    ;(this._positions = n),
      (this._colors = i),
      (this._width = l),
      (this._colorsPerVertex = s),
      (this._vertexFormat = u.VertexFormat.clone(e.defaultValue(r.vertexFormat, u.VertexFormat.DEFAULT))),
      (this._arcType = e.defaultValue(r.arcType, o.ArcType.GEODESIC)),
      (this._granularity = e.defaultValue(r.granularity, p.CesiumMath.RADIANS_PER_DEGREE)),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(r.ellipsoid, t.Ellipsoid.WGS84))),
      (this._workerName = 'createPolylineGeometry')
    let c = 1 + n.length * t.Cartesian3.packedLength
    ;(c += e.defined(i) ? 1 + i.length * a.Color.packedLength : 1),
      (this.packedLength = c + t.Ellipsoid.packedLength + u.VertexFormat.packedLength + 4)
  }
  x.pack = function (o, r, n) {
    let i
    n = e.defaultValue(n, 0)
    const l = o._positions
    let s = l.length
    for (r[n++] = s, i = 0; i < s; ++i, n += t.Cartesian3.packedLength) t.Cartesian3.pack(l[i], r, n)
    const c = o._colors
    for (s = e.defined(c) ? c.length : 0, r[n++] = s, i = 0; i < s; ++i, n += a.Color.packedLength) a.Color.pack(c[i], r, n)
    return (
      t.Ellipsoid.pack(o._ellipsoid, r, n),
      (n += t.Ellipsoid.packedLength),
      u.VertexFormat.pack(o._vertexFormat, r, n),
      (n += u.VertexFormat.packedLength),
      (r[n++] = o._width),
      (r[n++] = o._colorsPerVertex ? 1 : 0),
      (r[n++] = o._arcType),
      (r[n] = o._granularity),
      r
    )
  }
  const w = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    T = new u.VertexFormat(),
    b = {
      positions: void 0,
      colors: void 0,
      ellipsoid: w,
      vertexFormat: T,
      width: void 0,
      colorsPerVertex: void 0,
      arcType: void 0,
      granularity: void 0
    }
  x.unpack = function (o, r, n) {
    let i
    r = e.defaultValue(r, 0)
    let l = o[r++]
    const s = new Array(l)
    for (i = 0; i < l; ++i, r += t.Cartesian3.packedLength) s[i] = t.Cartesian3.unpack(o, r)
    l = o[r++]
    const c = l > 0 ? new Array(l) : void 0
    for (i = 0; i < l; ++i, r += a.Color.packedLength) c[i] = a.Color.unpack(o, r)
    const p = t.Ellipsoid.unpack(o, r, w)
    r += t.Ellipsoid.packedLength
    const d = u.VertexFormat.unpack(o, r, T)
    r += u.VertexFormat.packedLength
    const y = o[r++],
      m = 1 === o[r++],
      h = o[r++],
      f = o[r]
    return e.defined(n)
      ? ((n._positions = s),
        (n._colors = c),
        (n._ellipsoid = t.Ellipsoid.clone(p, n._ellipsoid)),
        (n._vertexFormat = u.VertexFormat.clone(d, n._vertexFormat)),
        (n._width = y),
        (n._colorsPerVertex = m),
        (n._arcType = h),
        (n._granularity = f),
        n)
      : ((b.positions = s), (b.colors = c), (b.width = y), (b.colorsPerVertex = m), (b.arcType = h), (b.granularity = f), new x(b))
  }
  const D = new t.Cartesian3(),
    k = new t.Cartesian3(),
    V = new t.Cartesian3(),
    v = new t.Cartesian3()
  return (
    (x.createGeometry = function (u) {
      const y = u._width,
        m = u._vertexFormat
      let h = u._colors
      const f = u._colorsPerVertex,
        C = u._arcType,
        g = u._granularity,
        _ = u._ellipsoid
      let A, x, w
      const T = []
      let b = r.arrayRemoveDuplicates(u._positions, t.Cartesian3.equalsEpsilon, !1, T)
      if (e.defined(h) && T.length > 0) {
        let e = 0,
          t = T[0]
        h = h.filter(function (o, r) {
          let n = !1
          return (n = f ? r === t || (0 === r && 1 === t) : r + 1 === t), !n || (e++, (t = T[e]), !1)
        })
      }
      let L = b.length
      if (L < 2 || y <= 0) return
      if (C === o.ArcType.GEODESIC || C === o.ArcType.RHUMB) {
        let t, r
        C === o.ArcType.GEODESIC
          ? ((t = p.CesiumMath.chordLength(g, _.maximumRadius)), (r = d.PolylinePipeline.numberOfPoints))
          : ((t = g), (r = d.PolylinePipeline.numberOfPointsRhumbLine))
        const n = d.PolylinePipeline.extractHeights(b, _)
        if (e.defined(h)) {
          let e = 1
          for (A = 0; A < L - 1; ++A) e += r(b[A], b[A + 1], t)
          const o = new Array(e)
          let n = 0
          for (A = 0; A < L - 1; ++A) {
            const i = b[A],
              l = b[A + 1],
              s = h[A],
              c = r(i, l, t)
            if (f && A < e) {
              const e = P(0, 0, s, h[A + 1], c),
                t = e.length
              for (x = 0; x < t; ++x) o[n++] = e[x]
            } else for (x = 0; x < c; ++x) o[n++] = a.Color.clone(s)
          }
          ;(o[n] = a.Color.clone(h[h.length - 1])), (h = o), (E.length = 0)
        }
        b =
          C === o.ArcType.GEODESIC
            ? d.PolylinePipeline.generateCartesianArc({ positions: b, minDistance: t, ellipsoid: _, height: n })
            : d.PolylinePipeline.generateCartesianRhumbArc({ positions: b, granularity: t, ellipsoid: _, height: n })
      }
      L = b.length
      const F = 4 * L - 4,
        G = new Float64Array(3 * F),
        O = new Float64Array(3 * F),
        R = new Float64Array(3 * F),
        I = new Float32Array(2 * F),
        S = m.st ? new Float32Array(2 * F) : void 0,
        B = e.defined(h) ? new Uint8Array(4 * F) : void 0
      let M,
        U = 0,
        N = 0,
        H = 0,
        W = 0
      for (x = 0; x < L; ++x) {
        let o, r
        0 === x ? ((M = D), t.Cartesian3.subtract(b[0], b[1], M), t.Cartesian3.add(b[0], M, M)) : (M = b[x - 1]),
          t.Cartesian3.clone(M, V),
          t.Cartesian3.clone(b[x], k),
          x === L - 1 ? ((M = D), t.Cartesian3.subtract(b[L - 1], b[L - 2], M), t.Cartesian3.add(b[L - 1], M, M)) : (M = b[x + 1]),
          t.Cartesian3.clone(M, v),
          e.defined(B) && ((o = 0 === x || f ? h[x] : h[x - 1]), x !== L - 1 && (r = h[x]))
        const n = x === L - 1 ? 2 : 4
        for (w = 0 === x ? 2 : 0; w < n; ++w) {
          t.Cartesian3.pack(k, G, U), t.Cartesian3.pack(V, O, U), t.Cartesian3.pack(v, R, U), (U += 3)
          const n = w - 2 < 0 ? -1 : 1
          if (((I[N++] = (w % 2) * 2 - 1), (I[N++] = n * y), m.st && ((S[H++] = x / (L - 1)), (S[H++] = Math.max(I[N - 2], 0))), e.defined(B))) {
            const e = w < 2 ? o : r
            ;(B[W++] = a.Color.floatToByte(e.red)),
              (B[W++] = a.Color.floatToByte(e.green)),
              (B[W++] = a.Color.floatToByte(e.blue)),
              (B[W++] = a.Color.floatToByte(e.alpha))
          }
        }
      }
      const Y = new s.GeometryAttributes()
      ;(Y.position = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: G })),
        (Y.prevPosition = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: O })),
        (Y.nextPosition = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: R })),
        (Y.expandAndWidth = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: I })),
        m.st && (Y.st = new l.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: S })),
        e.defined(B) &&
          (Y.color = new l.GeometryAttribute({
            componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            values: B,
            normalize: !0
          }))
      const q = c.IndexDatatype.createTypedArray(F, 6 * L - 6)
      let z = 0,
        J = 0
      const K = L - 1
      for (x = 0; x < K; ++x) (q[J++] = z), (q[J++] = z + 2), (q[J++] = z + 1), (q[J++] = z + 1), (q[J++] = z + 2), (q[J++] = z + 3), (z += 4)
      return new l.Geometry({
        attributes: Y,
        indices: q,
        primitiveType: l.PrimitiveType.TRIANGLES,
        boundingSphere: n.BoundingSphere.fromPoints(b),
        geometryType: l.GeometryType.POLYLINES
      })
    }),
    function (o, r) {
      return e.defined(r) && (o = x.unpack(o, r)), (o._ellipsoid = t.Ellipsoid.clone(o._ellipsoid)), x.createGeometry(o)
    }
  )
})
