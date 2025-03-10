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
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolygonPipeline-621b1cb0',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './WebGLConstants-7f557f93',
  './EllipsoidTangentPlane-d430e7d5',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './PolylinePipeline-5ae670bc',
  './EllipsoidGeodesic-2723ab86',
  './EllipsoidRhumbLine-77eff028'
], function (e, t, i, n, o, r, a, l, s, p, c, u, d, y, g, h, m, f, E, P, _, k, C) {
  'use strict'
  function L(i) {
    const n = (i = e.defaultValue(i, e.defaultValue.EMPTY_OBJECT)).polylinePositions,
      o = i.shapePositions
    ;(this._positions = n),
      (this._shape = o),
      (this._ellipsoid = t.Ellipsoid.clone(e.defaultValue(i.ellipsoid, t.Ellipsoid.WGS84))),
      (this._cornerType = e.defaultValue(i.cornerType, l.CornerType.ROUNDED)),
      (this._granularity = e.defaultValue(i.granularity, u.CesiumMath.RADIANS_PER_DEGREE)),
      (this._workerName = 'createPolylineVolumeOutlineGeometry')
    let a = 1 + n.length * t.Cartesian3.packedLength
    ;(a += 1 + o.length * r.Cartesian2.packedLength), (this.packedLength = a + t.Ellipsoid.packedLength + 2)
  }
  L.pack = function (i, n, o) {
    let a
    o = e.defaultValue(o, 0)
    const l = i._positions
    let s = l.length
    for (n[o++] = s, a = 0; a < s; ++a, o += t.Cartesian3.packedLength) t.Cartesian3.pack(l[a], n, o)
    const p = i._shape
    for (s = p.length, n[o++] = s, a = 0; a < s; ++a, o += r.Cartesian2.packedLength) r.Cartesian2.pack(p[a], n, o)
    return t.Ellipsoid.pack(i._ellipsoid, n, o), (o += t.Ellipsoid.packedLength), (n[o++] = i._cornerType), (n[o] = i._granularity), n
  }
  const T = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    D = { polylinePositions: void 0, shapePositions: void 0, ellipsoid: T, height: void 0, cornerType: void 0, granularity: void 0 }
  L.unpack = function (i, n, o) {
    let a
    n = e.defaultValue(n, 0)
    let l = i[n++]
    const s = new Array(l)
    for (a = 0; a < l; ++a, n += t.Cartesian3.packedLength) s[a] = t.Cartesian3.unpack(i, n)
    l = i[n++]
    const p = new Array(l)
    for (a = 0; a < l; ++a, n += r.Cartesian2.packedLength) p[a] = r.Cartesian2.unpack(i, n)
    const c = t.Ellipsoid.unpack(i, n, T)
    n += t.Ellipsoid.packedLength
    const u = i[n++],
      d = i[n]
    return e.defined(o)
      ? ((o._positions = s), (o._shape = p), (o._ellipsoid = t.Ellipsoid.clone(c, o._ellipsoid)), (o._cornerType = u), (o._granularity = d), o)
      : ((D.polylinePositions = s), (D.shapePositions = p), (D.cornerType = u), (D.granularity = d), new L(D))
  }
  const G = new n.BoundingRectangle()
  return (
    (L.createGeometry = function (e) {
      const r = e._positions,
        u = i.arrayRemoveDuplicates(r, t.Cartesian3.equalsEpsilon)
      let y = e._shape
      if (((y = l.PolylineVolumeGeometryLibrary.removeDuplicatesFromShape(y)), u.length < 2 || y.length < 3)) return
      d.PolygonPipeline.computeWindingOrder2D(y) === d.WindingOrder.CLOCKWISE && y.reverse()
      const g = n.BoundingRectangle.fromPoints(y, G)
      return (function (e, t) {
        const i = new p.GeometryAttributes()
        i.position = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: e })
        const n = t.length,
          r = i.position.values.length / 3,
          l = e.length / 3 / n,
          u = c.IndexDatatype.createTypedArray(r, 2 * n * (l + 1))
        let d,
          y,
          g = 0
        d = 0
        let h = d * n
        for (y = 0; y < n - 1; y++) (u[g++] = y + h), (u[g++] = y + h + 1)
        for (u[g++] = n - 1 + h, u[g++] = h, d = l - 1, h = d * n, y = 0; y < n - 1; y++) (u[g++] = y + h), (u[g++] = y + h + 1)
        for (u[g++] = n - 1 + h, u[g++] = h, d = 0; d < l - 1; d++) {
          const e = n * d,
            t = e + n
          for (y = 0; y < n; y++) (u[g++] = y + e), (u[g++] = y + t)
        }
        return new s.Geometry({
          attributes: i,
          indices: c.IndexDatatype.createTypedArray(r, u),
          boundingSphere: o.BoundingSphere.fromVertices(e),
          primitiveType: s.PrimitiveType.LINES
        })
      })(l.PolylineVolumeGeometryLibrary.computePositions(u, y, g, e, !1), y)
    }),
    function (i, n) {
      return e.defined(n) && (i = L.unpack(i, n)), (i._ellipsoid = t.Ellipsoid.clone(i._ellipsoid)), L.createGeometry(i)
    }
  )
})
