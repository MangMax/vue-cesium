define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './Transforms-20461479',
  './ComponentDatatype-ab629b88',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './VertexFormat-fbdec922',
  './WallGeometryLibrary-55d2dc1a',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93',
  './arrayRemoveDuplicates-9b636830',
  './PolylinePipeline-5ae670bc',
  './EllipsoidGeodesic-2723ab86',
  './EllipsoidRhumbLine-77eff028',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1'
], function (e, t, n, i, a, o, r, s, l, m, u, p, c, d, y, g, f, h, C, x) {
  'use strict'
  const A = new t.Cartesian3(),
    _ = new t.Cartesian3(),
    E = new t.Cartesian3(),
    b = new t.Cartesian3(),
    w = new t.Cartesian3(),
    F = new t.Cartesian3(),
    v = new t.Cartesian3()
  function L(n) {
    const i = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).positions,
      a = n.maximumHeights,
      o = n.minimumHeights,
      r = e.defaultValue(n.vertexFormat, l.VertexFormat.DEFAULT),
      m = e.defaultValue(n.granularity, s.CesiumMath.RADIANS_PER_DEGREE),
      u = e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84)
    ;(this._positions = i),
      (this._minimumHeights = o),
      (this._maximumHeights = a),
      (this._vertexFormat = l.VertexFormat.clone(r)),
      (this._granularity = m),
      (this._ellipsoid = t.Ellipsoid.clone(u)),
      (this._workerName = 'createWallGeometry')
    let p = 1 + i.length * t.Cartesian3.packedLength + 2
    e.defined(o) && (p += o.length),
      e.defined(a) && (p += a.length),
      (this.packedLength = p + t.Ellipsoid.packedLength + l.VertexFormat.packedLength + 1)
  }
  L.pack = function (n, i, a) {
    let o
    a = e.defaultValue(a, 0)
    const r = n._positions
    let s = r.length
    for (i[a++] = s, o = 0; o < s; ++o, a += t.Cartesian3.packedLength) t.Cartesian3.pack(r[o], i, a)
    const m = n._minimumHeights
    if (((s = e.defined(m) ? m.length : 0), (i[a++] = s), e.defined(m))) for (o = 0; o < s; ++o) i[a++] = m[o]
    const u = n._maximumHeights
    if (((s = e.defined(u) ? u.length : 0), (i[a++] = s), e.defined(u))) for (o = 0; o < s; ++o) i[a++] = u[o]
    return (
      t.Ellipsoid.pack(n._ellipsoid, i, a),
      (a += t.Ellipsoid.packedLength),
      l.VertexFormat.pack(n._vertexFormat, i, a),
      (i[(a += l.VertexFormat.packedLength)] = n._granularity),
      i
    )
  }
  const V = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    k = new l.VertexFormat(),
    H = { positions: void 0, minimumHeights: void 0, maximumHeights: void 0, ellipsoid: V, vertexFormat: k, granularity: void 0 }
  return (
    (L.unpack = function (n, i, a) {
      let o
      i = e.defaultValue(i, 0)
      let r = n[i++]
      const s = new Array(r)
      for (o = 0; o < r; ++o, i += t.Cartesian3.packedLength) s[o] = t.Cartesian3.unpack(n, i)
      let m, u
      if (((r = n[i++]), r > 0)) for (m = new Array(r), o = 0; o < r; ++o) m[o] = n[i++]
      if (((r = n[i++]), r > 0)) for (u = new Array(r), o = 0; o < r; ++o) u[o] = n[i++]
      const p = t.Ellipsoid.unpack(n, i, V)
      i += t.Ellipsoid.packedLength
      const c = l.VertexFormat.unpack(n, i, k),
        d = n[(i += l.VertexFormat.packedLength)]
      return e.defined(a)
        ? ((a._positions = s),
          (a._minimumHeights = m),
          (a._maximumHeights = u),
          (a._ellipsoid = t.Ellipsoid.clone(p, a._ellipsoid)),
          (a._vertexFormat = l.VertexFormat.clone(c, a._vertexFormat)),
          (a._granularity = d),
          a)
        : ((H.positions = s), (H.minimumHeights = m), (H.maximumHeights = u), (H.granularity = d), new L(H))
    }),
    (L.fromConstantHeights = function (t) {
      const n = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions
      let i, a
      const o = t.minimumHeight,
        r = t.maximumHeight,
        s = e.defined(o),
        l = e.defined(r)
      if (s || l) {
        const e = n.length
        ;(i = s ? new Array(e) : void 0), (a = l ? new Array(e) : void 0)
        for (let t = 0; t < e; ++t) s && (i[t] = o), l && (a[t] = r)
      }
      return new L({ positions: n, maximumHeights: a, minimumHeights: i, ellipsoid: t.ellipsoid, vertexFormat: t.vertexFormat })
    }),
    (L.createGeometry = function (l) {
      const u = l._positions,
        p = l._minimumHeights,
        c = l._maximumHeights,
        d = l._vertexFormat,
        y = l._granularity,
        g = l._ellipsoid,
        f = m.WallGeometryLibrary.computePositions(g, u, c, p, y, !0)
      if (!e.defined(f)) return
      const h = f.bottomPositions,
        C = f.topPositions,
        x = f.numCorners
      let L = C.length,
        V = 2 * L
      const k = d.position ? new Float64Array(V) : void 0,
        H = d.normal ? new Float32Array(V) : void 0,
        D = d.tangent ? new Float32Array(V) : void 0,
        G = d.bitangent ? new Float32Array(V) : void 0,
        P = d.st ? new Float32Array((V / 3) * 2) : void 0
      let T,
        z = 0,
        O = 0,
        R = 0,
        S = 0,
        I = 0,
        M = v,
        N = F,
        W = w,
        B = !0
      L /= 3
      let U = 0
      const q = 1 / (L - x - 1)
      for (T = 0; T < L; ++T) {
        const e = 3 * T,
          n = t.Cartesian3.fromArray(C, e, A),
          i = t.Cartesian3.fromArray(h, e, _)
        if (
          (d.position && ((k[z++] = i.x), (k[z++] = i.y), (k[z++] = i.z), (k[z++] = n.x), (k[z++] = n.y), (k[z++] = n.z)),
          d.st && ((P[I++] = U), (P[I++] = 0), (P[I++] = U), (P[I++] = 1)),
          d.normal || d.tangent || d.bitangent)
        ) {
          let i = t.Cartesian3.clone(t.Cartesian3.ZERO, b)
          const a = t.Cartesian3.subtract(n, g.geodeticSurfaceNormal(n, _), _)
          if ((T + 1 < L && (i = t.Cartesian3.fromArray(C, e + 3, b)), B)) {
            const e = t.Cartesian3.subtract(i, n, E),
              o = t.Cartesian3.subtract(a, n, A)
            ;(M = t.Cartesian3.normalize(t.Cartesian3.cross(o, e, M), M)), (B = !1)
          }
          t.Cartesian3.equalsEpsilon(n, i, s.CesiumMath.EPSILON10)
            ? (B = !0)
            : ((U += q),
              d.tangent && (N = t.Cartesian3.normalize(t.Cartesian3.subtract(i, n, N), N)),
              d.bitangent && (W = t.Cartesian3.normalize(t.Cartesian3.cross(M, N, W), W))),
            d.normal && ((H[O++] = M.x), (H[O++] = M.y), (H[O++] = M.z), (H[O++] = M.x), (H[O++] = M.y), (H[O++] = M.z)),
            d.tangent && ((D[S++] = N.x), (D[S++] = N.y), (D[S++] = N.z), (D[S++] = N.x), (D[S++] = N.y), (D[S++] = N.z)),
            d.bitangent && ((G[R++] = W.x), (G[R++] = W.y), (G[R++] = W.z), (G[R++] = W.x), (G[R++] = W.y), (G[R++] = W.z))
        }
      }
      const J = new o.GeometryAttributes()
      d.position && (J.position = new a.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: k })),
        d.normal && (J.normal = new a.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: H })),
        d.tangent && (J.tangent = new a.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: D })),
        d.bitangent &&
          (J.bitangent = new a.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: G })),
        d.st && (J.st = new a.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: P }))
      const Y = V / 3
      V -= 6 * (x + 1)
      const Z = r.IndexDatatype.createTypedArray(Y, V)
      let j = 0
      for (T = 0; T < Y - 2; T += 2) {
        const e = T,
          n = T + 2,
          i = t.Cartesian3.fromArray(k, 3 * e, A),
          a = t.Cartesian3.fromArray(k, 3 * n, _)
        if (t.Cartesian3.equalsEpsilon(i, a, s.CesiumMath.EPSILON10)) continue
        const o = T + 1,
          r = T + 3
        ;(Z[j++] = o), (Z[j++] = e), (Z[j++] = r), (Z[j++] = r), (Z[j++] = e), (Z[j++] = n)
      }
      return new a.Geometry({
        attributes: J,
        indices: Z,
        primitiveType: a.PrimitiveType.TRIANGLES,
        boundingSphere: new n.BoundingSphere.fromVertices(k)
      })
    }),
    function (n, i) {
      return e.defined(i) && (n = L.unpack(n, i)), (n._ellipsoid = t.Ellipsoid.clone(n._ellipsoid)), L.createGeometry(n)
    }
  )
})
