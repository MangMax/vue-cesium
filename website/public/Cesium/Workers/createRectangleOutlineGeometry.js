define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './Matrix2-413c4048',
  './Transforms-20461479',
  './ComponentDatatype-ab629b88',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolygonPipeline-621b1cb0',
  './RectangleGeometryLibrary-990f9a1a',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93',
  './EllipsoidRhumbLine-77eff028'
], function (e, t, i, n, o, r, a, l, s, u, c, p, d, f, g, h) {
  'use strict'
  const y = new n.BoundingSphere(),
    m = new n.BoundingSphere(),
    b = new t.Cartesian3(),
    _ = new i.Rectangle()
  function A(e, t) {
    const i = e._ellipsoid,
      n = t.height,
      l = t.width,
      u = t.northCap,
      c = t.southCap
    let d = n,
      f = 2,
      g = 0,
      h = 4
    u && ((f -= 1), (d -= 1), (g += 1), (h -= 2)), c && ((f -= 1), (d -= 1), (g += 1), (h -= 2)), (g += f * l + 2 * d - h)
    const y = new Float64Array(3 * g)
    let m,
      _ = 0,
      A = 0
    const E = b
    if (u) p.RectangleGeometryLibrary.computePosition(t, i, !1, A, 0, E), (y[_++] = E.x), (y[_++] = E.y), (y[_++] = E.z)
    else for (m = 0; m < l; m++) p.RectangleGeometryLibrary.computePosition(t, i, !1, A, m, E), (y[_++] = E.x), (y[_++] = E.y), (y[_++] = E.z)
    for (m = l - 1, A = 1; A < n; A++) p.RectangleGeometryLibrary.computePosition(t, i, !1, A, m, E), (y[_++] = E.x), (y[_++] = E.y), (y[_++] = E.z)
    if (((A = n - 1), !c))
      for (m = l - 2; m >= 0; m--) p.RectangleGeometryLibrary.computePosition(t, i, !1, A, m, E), (y[_++] = E.x), (y[_++] = E.y), (y[_++] = E.z)
    for (m = 0, A = n - 2; A > 0; A--) p.RectangleGeometryLibrary.computePosition(t, i, !1, A, m, E), (y[_++] = E.x), (y[_++] = E.y), (y[_++] = E.z)
    const G = (y.length / 3) * 2,
      R = s.IndexDatatype.createTypedArray(y.length / 3, G)
    let P = 0
    for (let e = 0; e < y.length / 3 - 1; e++) (R[P++] = e), (R[P++] = e + 1)
    ;(R[P++] = y.length / 3 - 1), (R[P++] = 0)
    const L = new r.Geometry({ attributes: new a.GeometryAttributes(), primitiveType: r.PrimitiveType.LINES })
    return (
      (L.attributes.position = new r.GeometryAttribute({ componentDatatype: o.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: y })),
      (L.indices = R),
      L
    )
  }
  function E(n) {
    const o = (n = e.defaultValue(n, e.defaultValue.EMPTY_OBJECT)).rectangle,
      r = e.defaultValue(n.granularity, u.CesiumMath.RADIANS_PER_DEGREE),
      a = e.defaultValue(n.ellipsoid, t.Ellipsoid.WGS84),
      l = e.defaultValue(n.rotation, 0),
      s = e.defaultValue(n.height, 0),
      c = e.defaultValue(n.extrudedHeight, s)
    ;(this._rectangle = i.Rectangle.clone(o)),
      (this._granularity = r),
      (this._ellipsoid = a),
      (this._surfaceHeight = Math.max(s, c)),
      (this._rotation = l),
      (this._extrudedHeight = Math.min(s, c)),
      (this._offsetAttribute = n.offsetAttribute),
      (this._workerName = 'createRectangleOutlineGeometry')
  }
  ;(E.packedLength = i.Rectangle.packedLength + t.Ellipsoid.packedLength + 5),
    (E.pack = function (n, o, r) {
      return (
        (r = e.defaultValue(r, 0)),
        i.Rectangle.pack(n._rectangle, o, r),
        (r += i.Rectangle.packedLength),
        t.Ellipsoid.pack(n._ellipsoid, o, r),
        (r += t.Ellipsoid.packedLength),
        (o[r++] = n._granularity),
        (o[r++] = n._surfaceHeight),
        (o[r++] = n._rotation),
        (o[r++] = n._extrudedHeight),
        (o[r] = e.defaultValue(n._offsetAttribute, -1)),
        o
      )
    })
  const G = new i.Rectangle(),
    R = t.Ellipsoid.clone(t.Ellipsoid.UNIT_SPHERE),
    P = { rectangle: G, ellipsoid: R, granularity: void 0, height: void 0, rotation: void 0, extrudedHeight: void 0, offsetAttribute: void 0 }
  E.unpack = function (n, o, r) {
    o = e.defaultValue(o, 0)
    const a = i.Rectangle.unpack(n, o, G)
    o += i.Rectangle.packedLength
    const l = t.Ellipsoid.unpack(n, o, R)
    o += t.Ellipsoid.packedLength
    const s = n[o++],
      u = n[o++],
      c = n[o++],
      p = n[o++],
      d = n[o]
    return e.defined(r)
      ? ((r._rectangle = i.Rectangle.clone(a, r._rectangle)),
        (r._ellipsoid = t.Ellipsoid.clone(l, r._ellipsoid)),
        (r._surfaceHeight = u),
        (r._rotation = c),
        (r._extrudedHeight = p),
        (r._offsetAttribute = -1 === d ? void 0 : d),
        r)
      : ((P.granularity = s), (P.height = u), (P.rotation = c), (P.extrudedHeight = p), (P.offsetAttribute = -1 === d ? void 0 : d), new E(P))
  }
  const L = new t.Cartographic()
  return (
    (E.createGeometry = function (t) {
      const i = t._rectangle,
        a = t._ellipsoid,
        d = p.RectangleGeometryLibrary.computeOptions(i, t._granularity, t._rotation, 0, _, L)
      let f, g
      if (u.CesiumMath.equalsEpsilon(i.north, i.south, u.CesiumMath.EPSILON10) || u.CesiumMath.equalsEpsilon(i.east, i.west, u.CesiumMath.EPSILON10))
        return
      const h = t._surfaceHeight,
        b = t._extrudedHeight
      let E
      if (!u.CesiumMath.equalsEpsilon(h, b, 0, u.CesiumMath.EPSILON2)) {
        if (
          ((f = (function (e, t) {
            const i = e._surfaceHeight,
              n = e._extrudedHeight,
              o = e._ellipsoid,
              r = n,
              a = i,
              l = A(e, t),
              u = t.height,
              p = t.width,
              d = c.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values, a, o, !1)
            let f = d.length
            const g = new Float64Array(2 * f)
            g.set(d)
            const h = c.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values, r, o)
            g.set(h, f), (l.attributes.position.values = g)
            const y = t.northCap,
              m = t.southCap
            let b = 4
            y && (b -= 1), m && (b -= 1)
            const _ = 2 * (g.length / 3 + b),
              E = s.IndexDatatype.createTypedArray(g.length / 3, _)
            f = g.length / 6
            let G,
              R = 0
            for (let e = 0; e < f - 1; e++) (E[R++] = e), (E[R++] = e + 1), (E[R++] = e + f), (E[R++] = e + f + 1)
            if (((E[R++] = f - 1), (E[R++] = 0), (E[R++] = f + f - 1), (E[R++] = f), (E[R++] = 0), (E[R++] = f), y)) G = u - 1
            else {
              const e = p - 1
              ;(E[R++] = e), (E[R++] = e + f), (G = p + u - 2)
            }
            if (((E[R++] = G), (E[R++] = G + f), !m)) {
              const e = p + G - 1
              ;(E[R++] = e), (E[R] = e + f)
            }
            return (l.indices = E), l
          })(t, d)),
          e.defined(t._offsetAttribute))
        ) {
          const e = f.attributes.position.values.length / 3
          let i = new Uint8Array(e)
          t._offsetAttribute === l.GeometryOffsetAttribute.TOP
            ? (i = i.fill(1, 0, e / 2))
            : ((E = t._offsetAttribute === l.GeometryOffsetAttribute.NONE ? 0 : 1), (i = i.fill(E))),
            (f.attributes.applyOffset = new r.GeometryAttribute({
              componentDatatype: o.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: i
            }))
        }
        const u = n.BoundingSphere.fromRectangle3D(i, a, h, m),
          p = n.BoundingSphere.fromRectangle3D(i, a, b, y)
        g = n.BoundingSphere.union(u, p)
      } else {
        if (
          ((f = A(t, d)),
          (f.attributes.position.values = c.PolygonPipeline.scaleToGeodeticHeight(f.attributes.position.values, h, a, !1)),
          e.defined(t._offsetAttribute))
        ) {
          const e = f.attributes.position.values.length
          E = t._offsetAttribute === l.GeometryOffsetAttribute.NONE ? 0 : 1
          const i = new Uint8Array(e / 3).fill(E)
          f.attributes.applyOffset = new r.GeometryAttribute({
            componentDatatype: o.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: i
          })
        }
        g = n.BoundingSphere.fromRectangle3D(i, a, h)
      }
      return new r.Geometry({
        attributes: f.attributes,
        indices: f.indices,
        primitiveType: r.PrimitiveType.LINES,
        boundingSphere: g,
        offsetAttribute: t._offsetAttribute
      })
    }),
    function (n, o) {
      return (
        e.defined(o) && (n = E.unpack(n, o)),
        (n._ellipsoid = t.Ellipsoid.clone(n._ellipsoid)),
        (n._rectangle = i.Rectangle.clone(n._rectangle)),
        E.createGeometry(n)
      )
    }
  )
})
