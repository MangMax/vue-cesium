define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './arrayRemoveDuplicates-9b636830',
  './BoundingRectangle-1d581417',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './ComponentDatatype-ab629b88',
  './PolylineVolumeGeometryLibrary-664193d8',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryPipeline-fcaf4d4d',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolygonPipeline-621b1cb0',
  './VertexFormat-fbdec922',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './WebGLConstants-7f557f93',
  './EllipsoidTangentPlane-d430e7d5',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './PolylinePipeline-5ae670bc',
  './EllipsoidGeodesic-2723ab86',
  './EllipsoidRhumbLine-77eff028',
  './AttributeCompression-48e336db',
  './EncodedCartesian3-5e2017ab'
], function (e, t, n, o, i, r, a, l, s, p, c, u, d, m, y, g, h, f, E, P, _, b, k, v, x, V, L) {
  'use strict'
  function A(n) {
    const o = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).polylinePositions,
      i = n.shapePositions
    ;(this._positions = o),
      (this._shape = i),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84))),
      (this._cornerType = e.defaultValue(n.cornerType, l.CornerType.ROUNDED)),
      (this._vertexFormat = y.VertexFormat.clone(e.defaultValue(n.vertexFormat, y.VertexFormat.DEFAULT))),
      (this._granularity = e.defaultValue(n.granularity, d.CesiumMath.RADIANS_PER_DEGREE)),
      (this._workerName = 'createPolylineVolumeGeometry')
    let a = 1 + o.length * t.Cartesian3.packedLength
    ;(a += 1 + i.length * r.Cartesian2.packedLength), (this.packedLength = a + t.Ellipsoid.packedLength + y.VertexFormat.packedLength + 2)
  }
  A.pack = function (n, o, i) {
    let a
    i = e.defaultValue(i, 0)
    const l = n._positions
    let s = l.length
    for (o[i++] = s, a = 0; a < s; ++a, i += t.Cartesian3.packedLength) t.Cartesian3.pack(l[a], o, i)
    const p = n._shape
    for (s = p.length, o[i++] = s, a = 0; a < s; ++a, i += r.Cartesian2.packedLength) r.Cartesian2.pack(p[a], o, i)
    return (
      t.Ellipsoid.pack(n._ellipsoid, o, i),
      (i += t.Ellipsoid.packedLength),
      y.VertexFormat.pack(n._vertexFormat, o, i),
      (i += y.VertexFormat.packedLength),
      (o[i++] = n._cornerType),
      (o[i] = n._granularity),
      o
    )
  }
  const C = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    F = new y.VertexFormat(),
    T = { polylinePositions: void 0, shapePositions: void 0, ellipsoid: C, vertexFormat: F, cornerType: void 0, granularity: void 0 }
  A.unpack = function (n, o, i) {
    let a
    o = e.defaultValue(o, 0)
    let l = n[o++]
    const s = new Array(l)
    for (a = 0; a < l; ++a, o += t.Cartesian3.packedLength) s[a] = t.Cartesian3.unpack(n, o)
    l = n[o++]
    const p = new Array(l)
    for (a = 0; a < l; ++a, o += r.Cartesian2.packedLength) p[a] = r.Cartesian2.unpack(n, o)
    const c = t.Ellipsoid.unpack(n, o, C)
    o += t.Ellipsoid.packedLength
    const u = y.VertexFormat.unpack(n, o, F)
    o += y.VertexFormat.packedLength
    const d = n[o++],
      m = n[o]
    return e.defined(i)
      ? ((i._positions = s),
        (i._shape = p),
        (i._ellipsoid = t.Ellipsoid.clone(c, i._ellipsoid)),
        (i._vertexFormat = y.VertexFormat.clone(u, i._vertexFormat)),
        (i._cornerType = d),
        (i._granularity = m),
        i)
      : ((T.polylinePositions = s), (T.shapePositions = p), (T.cornerType = d), (T.granularity = m), new A(T))
  }
  const G = new o.BoundingRectangle()
  return (
    (A.createGeometry = function (e) {
      const r = e._positions,
        d = n.arrayRemoveDuplicates(r, t.Cartesian3.equalsEpsilon)
      let y = e._shape
      if (((y = l.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)), d.length < 2 || y.length < 3)) return
      m.PolygonPipeline.computeWindingOrder2D(y) === m.WindingOrder.CLOCKWISE && y.reverse()
      const g = o.BoundingRectangle.fromPoints(y, G)
      return (function (e, t, n, o) {
        const r = new p.GeometryAttributes()
        o.position && (r.position = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: e }))
        const d = t.length,
          y = e.length / 3,
          g = (y - 2 * d) / (2 * d),
          h = m.PolygonPipeline.triangulate(t),
          f = (g - 1) * d * 6 + 2 * h.length,
          E = u.IndexDatatype.createTypedArray(y, f)
        let P, _, b, k, v, x
        const V = 2 * d
        let L = 0
        for (P = 0; P < g - 1; P++) {
          for (_ = 0; _ < d - 1; _++)
            (b = 2 * _ + P * d * 2),
              (x = b + V),
              (k = b + 1),
              (v = k + V),
              (E[L++] = k),
              (E[L++] = b),
              (E[L++] = v),
              (E[L++] = v),
              (E[L++] = b),
              (E[L++] = x)
          ;(b = 2 * d - 2 + P * d * 2),
            (k = b + 1),
            (v = k + V),
            (x = b + V),
            (E[L++] = k),
            (E[L++] = b),
            (E[L++] = v),
            (E[L++] = v),
            (E[L++] = b),
            (E[L++] = x)
        }
        if (o.st || o.tangent || o.bitangent) {
          const e = new Float32Array(2 * y),
            o = 1 / (g - 1),
            i = 1 / n.height,
            l = n.height / 2
          let p,
            c,
            u = 0
          for (P = 0; P < g; P++) {
            for (p = P * o, c = i * (t[0].y + l), e[u++] = p, e[u++] = c, _ = 1; _ < d; _++)
              (c = i * (t[_].y + l)), (e[u++] = p), (e[u++] = c), (e[u++] = p), (e[u++] = c)
            ;(c = i * (t[0].y + l)), (e[u++] = p), (e[u++] = c)
          }
          for (_ = 0; _ < d; _++) (p = 0), (c = i * (t[_].y + l)), (e[u++] = p), (e[u++] = c)
          for (_ = 0; _ < d; _++) (p = (g - 1) * o), (c = i * (t[_].y + l)), (e[u++] = p), (e[u++] = c)
          r.st = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: new Float32Array(e) })
        }
        const A = y - 2 * d
        for (P = 0; P < h.length; P += 3) {
          const e = h[P] + A,
            t = h[P + 1] + A,
            n = h[P + 2] + A
          ;(E[L++] = e), (E[L++] = t), (E[L++] = n), (E[L++] = n + d), (E[L++] = t + d), (E[L++] = e + d)
        }
        let C = new s.Geometry({
          attributes: r,
          indices: E,
          boundingSphere: i.BoundingSphere.fromVertices(e),
          primitiveType: s.PrimitiveType.TRIANGLES
        })
        if ((o.normal && (C = c.GeometryPipeline.computeNormal(C)), o.tangent || o.bitangent)) {
          try {
            C = c.GeometryPipeline.computeTangentAndBitangent(C)
          } catch (e) {
            l.oneTimeWarning('polyline-volume-tangent-bitangent', 'Unable to compute tangents and bitangents for polyline volume geometry')
          }
          o.tangent || (C.attributes.tangent = void 0), o.bitangent || (C.attributes.bitangent = void 0), o.st || (C.attributes.st = void 0)
        }
        return C
      })(l.PolylineVolumeGeometryLibrary.computePositions(d, y, g, e, !0), y, g, e._vertexFormat)
    }),
    function (n, o) {
      return e.defined(o) && (n = A.unpack(n, o)), (n._ellipsoid = t.Ellipsoid.clone(n._ellipsoid)), A.createGeometry(n)
    }
  )
})
