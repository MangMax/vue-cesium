define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './Transforms-20461479',
  './ComponentDatatype-ab629b88',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
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
], function (e, i, t, n, o, a, s, r, l, m, u, d, p, c, f, h, g, y, E) {
  'use strict'
  const _ = new i.Cartesian3(),
    C = new i.Cartesian3()
  function H(t) {
    const n = (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions,
      o = t.maximumHeights,
      a = t.minimumHeights,
      s = e.defaultValue(t.granularity, r.CesiumMath.RADIANS_PER_DEGREE),
      l = e.defaultValue(t.ellipsoid, i.Ellipsoid.WGS84)
    ;(this._positions = n),
      (this._minimumHeights = a),
      (this._maximumHeights = o),
      (this._granularity = s),
      (this._ellipsoid = i.Ellipsoid.clone(l)),
      (this._workerName = 'createWallOutlineGeometry')
    let m = 1 + n.length * i.Cartesian3.packedLength + 2
    e.defined(a) && (m += a.length), e.defined(o) && (m += o.length), (this.packedLength = m + i.Ellipsoid.packedLength + 1)
  }
  H.pack = function (t, n, o) {
    let a
    o = e.defaultValue(o, 0)
    const s = t._positions
    let r = s.length
    for (n[o++] = r, a = 0; a < r; ++a, o += i.Cartesian3.packedLength) i.Cartesian3.pack(s[a], n, o)
    const l = t._minimumHeights
    if (((r = e.defined(l) ? l.length : 0), (n[o++] = r), e.defined(l))) for (a = 0; a < r; ++a) n[o++] = l[a]
    const m = t._maximumHeights
    if (((r = e.defined(m) ? m.length : 0), (n[o++] = r), e.defined(m))) for (a = 0; a < r; ++a) n[o++] = m[a]
    return i.Ellipsoid.pack(t._ellipsoid, n, o), (n[(o += i.Ellipsoid.packedLength)] = t._granularity), n
  }
  const A = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),
    k = { positions: void 0, minimumHeights: void 0, maximumHeights: void 0, ellipsoid: A, granularity: void 0 }
  return (
    (H.unpack = function (t, n, o) {
      let a
      n = e.defaultValue(n, 0)
      let s = t[n++]
      const r = new Array(s)
      for (a = 0; a < s; ++a, n += i.Cartesian3.packedLength) r[a] = i.Cartesian3.unpack(t, n)
      let l, m
      if (((s = t[n++]), s > 0)) for (l = new Array(s), a = 0; a < s; ++a) l[a] = t[n++]
      if (((s = t[n++]), s > 0)) for (m = new Array(s), a = 0; a < s; ++a) m[a] = t[n++]
      const u = i.Ellipsoid.unpack(t, n, A),
        d = t[(n += i.Ellipsoid.packedLength)]
      return e.defined(o)
        ? ((o._positions = r),
          (o._minimumHeights = l),
          (o._maximumHeights = m),
          (o._ellipsoid = i.Ellipsoid.clone(u, o._ellipsoid)),
          (o._granularity = d),
          o)
        : ((k.positions = r), (k.minimumHeights = l), (k.maximumHeights = m), (k.granularity = d), new H(k))
    }),
    (H.fromConstantHeights = function (i) {
      const t = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).positions
      let n, o
      const a = i.minimumHeight,
        s = i.maximumHeight,
        r = e.defined(a),
        l = e.defined(s)
      if (r || l) {
        const e = t.length
        ;(n = r ? new Array(e) : void 0), (o = l ? new Array(e) : void 0)
        for (let i = 0; i < e; ++i) r && (n[i] = a), l && (o[i] = s)
      }
      return new H({ positions: t, maximumHeights: o, minimumHeights: n, ellipsoid: i.ellipsoid })
    }),
    (H.createGeometry = function (m) {
      const u = m._positions,
        d = m._minimumHeights,
        p = m._maximumHeights,
        c = m._granularity,
        f = m._ellipsoid,
        h = l.WallGeometryLibrary.computePositions(f, u, p, d, c, !1)
      if (!e.defined(h)) return
      const g = h.bottomPositions,
        y = h.topPositions
      let E = y.length,
        H = 2 * E
      const A = new Float64Array(H)
      let k,
        w = 0
      for (E /= 3, k = 0; k < E; ++k) {
        const e = 3 * k,
          t = i.Cartesian3.fromArray(y, e, _),
          n = i.Cartesian3.fromArray(g, e, C)
        ;(A[w++] = n.x), (A[w++] = n.y), (A[w++] = n.z), (A[w++] = t.x), (A[w++] = t.y), (A[w++] = t.z)
      }
      const x = new a.GeometryAttributes({
          position: new o.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: A })
        }),
        b = H / 3
      H = 2 * b - 4 + b
      const G = s.IndexDatatype.createTypedArray(b, H)
      let L = 0
      for (k = 0; k < b - 2; k += 2) {
        const e = k,
          t = k + 2,
          n = i.Cartesian3.fromArray(A, 3 * e, _),
          o = i.Cartesian3.fromArray(A, 3 * t, C)
        if (i.Cartesian3.equalsEpsilon(n, o, r.CesiumMath.EPSILON10)) continue
        const a = k + 1,
          s = k + 3
        ;(G[L++] = a), (G[L++] = e), (G[L++] = a), (G[L++] = s), (G[L++] = e), (G[L++] = t)
      }
      return (
        (G[L++] = b - 2),
        (G[L++] = b - 1),
        new o.Geometry({ attributes: x, indices: G, primitiveType: o.PrimitiveType.LINES, boundingSphere: new t.BoundingSphere.fromVertices(A) })
      )
    }),
    function (t, n) {
      return e.defined(n) && (t = H.unpack(t, n)), (t._ellipsoid = i.Ellipsoid.clone(t._ellipsoid)), H.createGeometry(t)
    }
  )
})
