define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './ArcType-26a3f38d',
  './Transforms-20461479',
  './ComponentDatatype-ab629b88',
  './EllipsoidTangentPlane-d430e7d5',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryInstance-0318e0cd',
  './GeometryOffsetAttribute-2579b8d2',
  './GeometryPipeline-fcaf4d4d',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolygonGeometryLibrary-d7e504f0',
  './PolygonPipeline-621b1cb0',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './AttributeCompression-48e336db',
  './EncodedCartesian3-5e2017ab',
  './arrayRemoveDuplicates-9b636830',
  './EllipsoidRhumbLine-77eff028'
], function (e, t, i, o, r, n, a, s, l, y, u, p, d, c, g, f, h, m, b, P, A, E, _, G, L, T) {
  'use strict'
  const H = [],
    v = []
  function x(e, t, o, y, u) {
    const d = n.EllipsoidTangentPlane.fromPoints(t, e).projectPointsOntoPlane(t, H)
    let f, h
    g.PolygonPipeline.computeWindingOrder2D(d) === g.WindingOrder.CLOCKWISE && (d.reverse(), (t = t.slice().reverse()))
    let m = t.length,
      b = 0
    if (y)
      for (f = new Float64Array(2 * m * 3), h = 0; h < m; h++) {
        const e = t[h],
          i = t[(h + 1) % m]
        ;(f[b++] = e.x), (f[b++] = e.y), (f[b++] = e.z), (f[b++] = i.x), (f[b++] = i.y), (f[b++] = i.z)
      }
    else {
      let r = 0
      if (u === i.ArcType.GEODESIC) for (h = 0; h < m; h++) r += c.PolygonGeometryLibrary.subdivideLineCount(t[h], t[(h + 1) % m], o)
      else if (u === i.ArcType.RHUMB) for (h = 0; h < m; h++) r += c.PolygonGeometryLibrary.subdivideRhumbLineCount(e, t[h], t[(h + 1) % m], o)
      for (f = new Float64Array(3 * r), h = 0; h < m; h++) {
        let r
        u === i.ArcType.GEODESIC
          ? (r = c.PolygonGeometryLibrary.subdivideLine(t[h], t[(h + 1) % m], o, v))
          : u === i.ArcType.RHUMB && (r = c.PolygonGeometryLibrary.subdivideRhumbLine(e, t[h], t[(h + 1) % m], o, v))
        const n = r.length
        for (let e = 0; e < n; ++e) f[b++] = r[e]
      }
    }
    m = f.length / 3
    const P = 2 * m,
      A = p.IndexDatatype.createTypedArray(m, P)
    for (b = 0, h = 0; h < m - 1; h++) (A[b++] = h), (A[b++] = h + 1)
    return (
      (A[b++] = m - 1),
      (A[b++] = 0),
      new l.GeometryInstance({
        geometry: new a.Geometry({
          attributes: new s.GeometryAttributes({
            position: new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: f })
          }),
          indices: A,
          primitiveType: a.PrimitiveType.LINES
        })
      })
    )
  }
  function C(e, t, o, y, u) {
    const d = n.EllipsoidTangentPlane.fromPoints(t, e).projectPointsOntoPlane(t, H)
    let f, h
    g.PolygonPipeline.computeWindingOrder2D(d) === g.WindingOrder.CLOCKWISE && (d.reverse(), (t = t.slice().reverse()))
    let m = t.length
    const b = new Array(m)
    let P = 0
    if (y)
      for (f = new Float64Array(2 * m * 3 * 2), h = 0; h < m; ++h) {
        b[h] = P / 3
        const e = t[h],
          i = t[(h + 1) % m]
        ;(f[P++] = e.x), (f[P++] = e.y), (f[P++] = e.z), (f[P++] = i.x), (f[P++] = i.y), (f[P++] = i.z)
      }
    else {
      let r = 0
      if (u === i.ArcType.GEODESIC) for (h = 0; h < m; h++) r += c.PolygonGeometryLibrary.subdivideLineCount(t[h], t[(h + 1) % m], o)
      else if (u === i.ArcType.RHUMB) for (h = 0; h < m; h++) r += c.PolygonGeometryLibrary.subdivideRhumbLineCount(e, t[h], t[(h + 1) % m], o)
      for (f = new Float64Array(3 * r * 2), h = 0; h < m; ++h) {
        let r
        ;(b[h] = P / 3),
          u === i.ArcType.GEODESIC
            ? (r = c.PolygonGeometryLibrary.subdivideLine(t[h], t[(h + 1) % m], o, v))
            : u === i.ArcType.RHUMB && (r = c.PolygonGeometryLibrary.subdivideRhumbLine(e, t[h], t[(h + 1) % m], o, v))
        const n = r.length
        for (let e = 0; e < n; ++e) f[P++] = r[e]
      }
    }
    m = f.length / 6
    const A = b.length,
      E = 2 * (2 * m + A),
      _ = p.IndexDatatype.createTypedArray(m + A, E)
    for (P = 0, h = 0; h < m; ++h) (_[P++] = h), (_[P++] = (h + 1) % m), (_[P++] = h + m), (_[P++] = ((h + 1) % m) + m)
    for (h = 0; h < A; h++) {
      const e = b[h]
      ;(_[P++] = e), (_[P++] = e + m)
    }
    return new l.GeometryInstance({
      geometry: new a.Geometry({
        attributes: new s.GeometryAttributes({
          position: new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: f })
        }),
        indices: _,
        primitiveType: a.PrimitiveType.LINES
      })
    })
  }
  function O(o) {
    const r = o.polygonHierarchy,
      n = e.defaultValue(o.ellipsoid, t.Ellipsoid.WGS84),
      a = e.defaultValue(o.granularity, d.CesiumMath.RADIANS_PER_DEGREE),
      s = e.defaultValue(o.perPositionHeight, !1),
      l = s && e.defined(o.extrudedHeight),
      y = e.defaultValue(o.arcType, i.ArcType.GEODESIC)
    let u = e.defaultValue(o.height, 0),
      p = e.defaultValue(o.extrudedHeight, u)
    if (!l) {
      const e = Math.max(u, p)
      ;(p = Math.min(u, p)), (u = e)
    }
    ;(this._ellipsoid = t.Ellipsoid.clone(n)),
      (this._granularity = a),
      (this._height = u),
      (this._extrudedHeight = p),
      (this._arcType = y),
      (this._polygonHierarchy = r),
      (this._perPositionHeight = s),
      (this._perPositionHeightExtrude = l),
      (this._offsetAttribute = o.offsetAttribute),
      (this._workerName = 'createPolygonOutlineGeometry'),
      (this.packedLength = c.PolygonGeometryLibrary.computeHierarchyPackedLength(r, t.Cartesian3) + t.Ellipsoid.packedLength + 8)
  }
  O.pack = function (i, o, r) {
    return (
      (r = e.defaultValue(r, 0)),
      (r = c.PolygonGeometryLibrary.packPolygonHierarchy(i._polygonHierarchy, o, r, t.Cartesian3)),
      t.Ellipsoid.pack(i._ellipsoid, o, r),
      (r += t.Ellipsoid.packedLength),
      (o[r++] = i._height),
      (o[r++] = i._extrudedHeight),
      (o[r++] = i._granularity),
      (o[r++] = i._perPositionHeightExtrude ? 1 : 0),
      (o[r++] = i._perPositionHeight ? 1 : 0),
      (o[r++] = i._arcType),
      (o[r++] = e.defaultValue(i._offsetAttribute, -1)),
      (o[r] = i.packedLength),
      o
    )
  }
  const D = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    I = { polygonHierarchy: {} }
  return (
    (O.unpack = function (i, o, r) {
      o = e.defaultValue(o, 0)
      const n = c.PolygonGeometryLibrary.unpackPolygonHierarchy(i, o, t.Cartesian3)
      ;(o = n.startingIndex), delete n.startingIndex
      const a = t.Ellipsoid.unpack(i, o, D)
      o += t.Ellipsoid.packedLength
      const s = i[o++],
        l = i[o++],
        y = i[o++],
        u = 1 === i[o++],
        p = 1 === i[o++],
        d = i[o++],
        g = i[o++],
        f = i[o]
      return (
        e.defined(r) || (r = new O(I)),
        (r._polygonHierarchy = n),
        (r._ellipsoid = t.Ellipsoid.clone(a, r._ellipsoid)),
        (r._height = s),
        (r._extrudedHeight = l),
        (r._granularity = y),
        (r._perPositionHeight = p),
        (r._perPositionHeightExtrude = u),
        (r._arcType = d),
        (r._offsetAttribute = -1 === g ? void 0 : g),
        (r.packedLength = f),
        r
      )
    }),
    (O.fromPositions = function (t) {
      return new O({
        polygonHierarchy: { positions: (t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)).positions },
        height: t.height,
        extrudedHeight: t.extrudedHeight,
        ellipsoid: t.ellipsoid,
        granularity: t.granularity,
        perPositionHeight: t.perPositionHeight,
        arcType: t.arcType,
        offsetAttribute: t.offsetAttribute
      })
    }),
    (O.createGeometry = function (t) {
      const i = t._ellipsoid,
        n = t._granularity,
        s = t._polygonHierarchy,
        l = t._perPositionHeight,
        p = t._arcType,
        f = c.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(s, !l, i)
      if (0 === f.length) return
      let h
      const m = [],
        b = d.CesiumMath.chordLength(n, i.maximumRadius),
        P = t._height,
        A = t._extrudedHeight
      let E, _
      if (t._perPositionHeightExtrude || !d.CesiumMath.equalsEpsilon(P, A, 0, d.CesiumMath.EPSILON2))
        for (_ = 0; _ < f.length; _++) {
          if (
            ((h = C(i, f[_], b, l, p)),
            (h.geometry = c.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(h.geometry, P, A, i, l)),
            e.defined(t._offsetAttribute))
          ) {
            const e = h.geometry.attributes.position.values.length / 3
            let i = new Uint8Array(e)
            t._offsetAttribute === y.GeometryOffsetAttribute.TOP
              ? (i = i.fill(1, 0, e / 2))
              : ((E = t._offsetAttribute === y.GeometryOffsetAttribute.NONE ? 0 : 1), (i = i.fill(E))),
              (h.geometry.attributes.applyOffset = new a.GeometryAttribute({
                componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE,
                componentsPerAttribute: 1,
                values: i
              }))
          }
          m.push(h)
        }
      else
        for (_ = 0; _ < f.length; _++) {
          if (
            ((h = x(i, f[_], b, l, p)),
            (h.geometry.attributes.position.values = g.PolygonPipeline.scaleToGeodeticHeight(h.geometry.attributes.position.values, P, i, !l)),
            e.defined(t._offsetAttribute))
          ) {
            const e = h.geometry.attributes.position.values.length
            E = t._offsetAttribute === y.GeometryOffsetAttribute.NONE ? 0 : 1
            const i = new Uint8Array(e / 3).fill(E)
            h.geometry.attributes.applyOffset = new a.GeometryAttribute({
              componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: i
            })
          }
          m.push(h)
        }
      const G = u.GeometryPipeline.combineInstances(m)[0],
        L = o.BoundingSphere.fromVertices(G.attributes.position.values)
      return new a.Geometry({
        attributes: G.attributes,
        indices: G.indices,
        primitiveType: G.primitiveType,
        boundingSphere: L,
        offsetAttribute: t._offsetAttribute
      })
    }),
    function (i, o) {
      return e.defined(o) && (i = O.unpack(i, o)), (i._ellipsoid = t.Ellipsoid.clone(i._ellipsoid)), O.createGeometry(i)
    }
  )
})
