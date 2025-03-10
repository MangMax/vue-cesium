define([
  'exports',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './defaultValue-f6d5e6da',
  './EllipseGeometryLibrary-46203226',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9'
], function (e, t, i, r, n, o, a, s, l, u, d) {
  'use strict'
  const c = new i.Cartesian3()
  let p = new i.Cartesian3()
  const f = new t.BoundingSphere(),
    m = new t.BoundingSphere()
  function h(e) {
    const t = (e = n.defaultValue(e, n.defaultValue.EMPTY_OBJECT)).center,
      r = n.defaultValue(e.ellipsoid, i.Ellipsoid.WGS84),
      o = e.semiMajorAxis,
      a = e.semiMinorAxis,
      s = n.defaultValue(e.granularity, d.CesiumMath.RADIANS_PER_DEGREE),
      l = n.defaultValue(e.height, 0),
      u = n.defaultValue(e.extrudedHeight, l)
    ;(this._center = i.Cartesian3.clone(t)),
      (this._semiMajorAxis = o),
      (this._semiMinorAxis = a),
      (this._ellipsoid = i.Ellipsoid.clone(r)),
      (this._rotation = n.defaultValue(e.rotation, 0)),
      (this._height = Math.max(u, l)),
      (this._granularity = s),
      (this._extrudedHeight = Math.min(u, l)),
      (this._numberOfVerticalLines = Math.max(n.defaultValue(e.numberOfVerticalLines, 16), 0)),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createEllipseOutlineGeometry')
  }
  ;(h.packedLength = i.Cartesian3.packedLength + i.Ellipsoid.packedLength + 8),
    (h.pack = function (e, t, r) {
      return (
        (r = n.defaultValue(r, 0)),
        i.Cartesian3.pack(e._center, t, r),
        (r += i.Cartesian3.packedLength),
        i.Ellipsoid.pack(e._ellipsoid, t, r),
        (r += i.Ellipsoid.packedLength),
        (t[r++] = e._semiMajorAxis),
        (t[r++] = e._semiMinorAxis),
        (t[r++] = e._rotation),
        (t[r++] = e._height),
        (t[r++] = e._granularity),
        (t[r++] = e._extrudedHeight),
        (t[r++] = e._numberOfVerticalLines),
        (t[r] = n.defaultValue(e._offsetAttribute, -1)),
        t
      )
    })
  const y = new i.Cartesian3(),
    A = new i.Ellipsoid(),
    _ = {
      center: y,
      ellipsoid: A,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0,
      rotation: void 0,
      height: void 0,
      granularity: void 0,
      extrudedHeight: void 0,
      numberOfVerticalLines: void 0,
      offsetAttribute: void 0
    }
  ;(h.unpack = function (e, t, r) {
    t = n.defaultValue(t, 0)
    const o = i.Cartesian3.unpack(e, t, y)
    t += i.Cartesian3.packedLength
    const a = i.Ellipsoid.unpack(e, t, A)
    t += i.Ellipsoid.packedLength
    const s = e[t++],
      l = e[t++],
      u = e[t++],
      d = e[t++],
      c = e[t++],
      p = e[t++],
      f = e[t++],
      m = e[t]
    return n.defined(r)
      ? ((r._center = i.Cartesian3.clone(o, r._center)),
        (r._ellipsoid = i.Ellipsoid.clone(a, r._ellipsoid)),
        (r._semiMajorAxis = s),
        (r._semiMinorAxis = l),
        (r._rotation = u),
        (r._height = d),
        (r._granularity = c),
        (r._extrudedHeight = p),
        (r._numberOfVerticalLines = f),
        (r._offsetAttribute = -1 === m ? void 0 : m),
        r)
      : ((_.height = d),
        (_.extrudedHeight = p),
        (_.granularity = c),
        (_.rotation = u),
        (_.semiMajorAxis = s),
        (_.semiMinorAxis = l),
        (_.numberOfVerticalLines = f),
        (_.offsetAttribute = -1 === m ? void 0 : m),
        new h(_))
  }),
    (h.createGeometry = function (e) {
      if (e._semiMajorAxis <= 0 || e._semiMinorAxis <= 0) return
      const h = e._height,
        y = e._extrudedHeight,
        A = !d.CesiumMath.equalsEpsilon(h, y, 0, d.CesiumMath.EPSILON2)
      e._center = e._ellipsoid.scaleToGeodeticSurface(e._center, e._center)
      const _ = {
        center: e._center,
        semiMajorAxis: e._semiMajorAxis,
        semiMinorAxis: e._semiMinorAxis,
        ellipsoid: e._ellipsoid,
        rotation: e._rotation,
        height: h,
        granularity: e._granularity,
        numberOfVerticalLines: e._numberOfVerticalLines
      }
      let b
      if (A)
        (_.extrudedHeight = y),
          (_.offsetAttribute = e._offsetAttribute),
          (b = (function (e) {
            const p = e.center,
              h = e.ellipsoid,
              y = e.semiMajorAxis
            let A = i.Cartesian3.multiplyByScalar(h.geodeticSurfaceNormal(p, c), e.height, c)
            ;(f.center = i.Cartesian3.add(p, A, f.center)),
              (f.radius = y),
              (A = i.Cartesian3.multiplyByScalar(h.geodeticSurfaceNormal(p, A), e.extrudedHeight, A)),
              (m.center = i.Cartesian3.add(p, A, m.center)),
              (m.radius = y)
            let _ = o.EllipseGeometryLibrary.computeEllipsePositions(e, !1, !0).outerPositions
            const b = new s.GeometryAttributes({
              position: new a.GeometryAttribute({
                componentDatatype: r.ComponentDatatype.DOUBLE,
                componentsPerAttribute: 3,
                values: o.EllipseGeometryLibrary.raisePositionsToHeight(_, e, !0)
              })
            })
            _ = b.position.values
            const g = t.BoundingSphere.union(f, m)
            let x = _.length / 3
            if (n.defined(e.offsetAttribute)) {
              let t = new Uint8Array(x)
              if (e.offsetAttribute === l.GeometryOffsetAttribute.TOP) t = t.fill(1, 0, x / 2)
              else {
                const i = e.offsetAttribute === l.GeometryOffsetAttribute.NONE ? 0 : 1
                t = t.fill(i)
              }
              b.applyOffset = new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: t })
            }
            let E = n.defaultValue(e.numberOfVerticalLines, 16)
            E = d.CesiumMath.clamp(E, 0, x / 2)
            const M = u.IndexDatatype.createTypedArray(x, 2 * x + 2 * E)
            x /= 2
            let C,
              G,
              L = 0
            for (C = 0; C < x; ++C) (M[L++] = C), (M[L++] = (C + 1) % x), (M[L++] = C + x), (M[L++] = ((C + 1) % x) + x)
            if (E > 0) {
              const e = Math.min(E, x)
              G = Math.round(x / e)
              const t = Math.min(G * E, x)
              for (C = 0; C < t; C += G) (M[L++] = C), (M[L++] = C + x)
            }
            return { boundingSphere: g, attributes: b, indices: M }
          })(_))
      else if (
        ((b = (function (e) {
          const n = e.center
          ;(p = i.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(n, p), e.height, p)), (p = i.Cartesian3.add(n, p, p))
          const l = new t.BoundingSphere(p, e.semiMajorAxis),
            d = o.EllipseGeometryLibrary.computeEllipsePositions(e, !1, !0).outerPositions,
            c = new s.GeometryAttributes({
              position: new a.GeometryAttribute({
                componentDatatype: r.ComponentDatatype.DOUBLE,
                componentsPerAttribute: 3,
                values: o.EllipseGeometryLibrary.raisePositionsToHeight(d, e, !1)
              })
            }),
            f = d.length / 3,
            m = u.IndexDatatype.createTypedArray(f, 2 * f)
          let h = 0
          for (let e = 0; e < f; ++e) (m[h++] = e), (m[h++] = (e + 1) % f)
          return { boundingSphere: l, attributes: c, indices: m }
        })(_)),
        n.defined(e._offsetAttribute))
      ) {
        const t = b.attributes.position.values.length,
          i = e._offsetAttribute === l.GeometryOffsetAttribute.NONE ? 0 : 1,
          n = new Uint8Array(t / 3).fill(i)
        b.attributes.applyOffset = new a.GeometryAttribute({
          componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 1,
          values: n
        })
      }
      return new a.Geometry({
        attributes: b.attributes,
        indices: b.indices,
        primitiveType: a.PrimitiveType.LINES,
        boundingSphere: b.boundingSphere,
        offsetAttribute: e._offsetAttribute
      })
    }),
    (e.EllipseOutlineGeometry = h)
})
