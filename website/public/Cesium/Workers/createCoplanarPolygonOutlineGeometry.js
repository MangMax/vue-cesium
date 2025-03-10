define([
  './arrayRemoveDuplicates-9b636830',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './CoplanarPolygonGeometryLibrary-281d77bd',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryInstance-0318e0cd',
  './GeometryPipeline-fcaf4d4d',
  './IndexDatatype-d3db4e7d',
  './PolygonGeometryLibrary-d7e504f0',
  './Math-2ce22ee9',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93',
  './OrientedBoundingBox-fc7f7ca4',
  './EllipsoidTangentPlane-d430e7d5',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './AttributeCompression-48e336db',
  './EncodedCartesian3-5e2017ab',
  './ArcType-26a3f38d',
  './EllipsoidRhumbLine-77eff028',
  './PolygonPipeline-621b1cb0'
], function (e, t, n, o, r, i, a, y, l, s, c, u, p, m, d, g, h, f, P, b, G, L, C, T, A, E, x) {
  'use strict'
  function H(e) {
    const t = e.length,
      n = new Float64Array(3 * t),
      r = c.IndexDatatype.createTypedArray(t, 2 * t)
    let i = 0,
      l = 0
    for (let o = 0; o < t; o++) {
      const a = e[o]
      ;(n[i++] = a.x), (n[i++] = a.y), (n[i++] = a.z), (r[l++] = o), (r[l++] = (o + 1) % t)
    }
    const s = new y.GeometryAttributes({
      position: new a.GeometryAttribute({ componentDatatype: o.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: n })
    })
    return new a.Geometry({ attributes: s, indices: r, primitiveType: a.PrimitiveType.LINES })
  }
  function k(e) {
    const t = (e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT)).polygonHierarchy
    ;(this._polygonHierarchy = t),
      (this._workerName = 'createCoplanarPolygonOutlineGeometry'),
      (this.packedLength = u.PolygonGeometryLibrary.computeHierarchyPackedLength(t, n.Cartesian3) + 1)
  }
  ;(k.fromPositions = function (e) {
    return new k({ polygonHierarchy: { positions: (e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT)).positions } })
  }),
    (k.pack = function (e, t, o) {
      return (
        (o = i.defaultValue(o, 0)),
        (t[(o = u.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy, t, o, n.Cartesian3))] = e.packedLength),
        t
      )
    })
  const w = { polygonHierarchy: {} }
  return (
    (k.unpack = function (e, t, o) {
      t = i.defaultValue(t, 0)
      const r = u.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t, n.Cartesian3)
      ;(t = r.startingIndex), delete r.startingIndex
      const a = e[t]
      return i.defined(o) || (o = new k(w)), (o._polygonHierarchy = r), (o.packedLength = a), o
    }),
    (k.createGeometry = function (o) {
      const i = o._polygonHierarchy
      let y = i.positions
      if (((y = e.arrayRemoveDuplicates(y, n.Cartesian3.equalsEpsilon, !0)), y.length < 3)) return
      if (!r.CoplanarPolygonGeometryLibrary.validOutline(y)) return
      const c = u.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(i, !1)
      if (0 === c.length) return
      const p = []
      for (let e = 0; e < c.length; e++) {
        const t = new l.GeometryInstance({ geometry: H(c[e]) })
        p.push(t)
      }
      const m = s.GeometryPipeline.combineInstances(p)[0],
        d = t.BoundingSphere.fromPoints(i.positions)
      return new a.Geometry({ attributes: m.attributes, indices: m.indices, primitiveType: m.primitiveType, boundingSphere: d })
    }),
    function (e, t) {
      return i.defined(t) && (e = k.unpack(e, t)), (e._ellipsoid = n.Ellipsoid.clone(e._ellipsoid)), k.createGeometry(e)
    }
  )
})
