define([
  'exports',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './CylinderGeometryLibrary-f49f33a8',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './VertexFormat-fbdec922'
], function (t, e, n, a, o, r, i, s, u, m, l, c, p) {
  'use strict'
  const y = new n.Cartesian2(),
    d = new a.Cartesian3(),
    f = new a.Cartesian3(),
    b = new a.Cartesian3(),
    A = new a.Cartesian3()
  function x(t) {
    const e = (t = i.defaultValue(t, i.defaultValue.EMPTY_OBJECT)).length,
      n = t.topRadius,
      a = t.bottomRadius,
      o = i.defaultValue(t.vertexFormat, p.VertexFormat.DEFAULT),
      r = i.defaultValue(t.slices, 128)
    ;(this._length = e),
      (this._topRadius = n),
      (this._bottomRadius = a),
      (this._vertexFormat = p.VertexFormat.clone(o)),
      (this._slices = r),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createCylinderGeometry')
  }
  ;(x.packedLength = p.VertexFormat.packedLength + 5),
    (x.pack = function (t, e, n) {
      return (
        (n = i.defaultValue(n, 0)),
        p.VertexFormat.pack(t._vertexFormat, e, n),
        (n += p.VertexFormat.packedLength),
        (e[n++] = t._length),
        (e[n++] = t._topRadius),
        (e[n++] = t._bottomRadius),
        (e[n++] = t._slices),
        (e[n] = i.defaultValue(t._offsetAttribute, -1)),
        e
      )
    })
  const g = new p.VertexFormat(),
    _ = { vertexFormat: g, length: void 0, topRadius: void 0, bottomRadius: void 0, slices: void 0, offsetAttribute: void 0 }
  let h
  ;(x.unpack = function (t, e, n) {
    e = i.defaultValue(e, 0)
    const a = p.VertexFormat.unpack(t, e, g)
    e += p.VertexFormat.packedLength
    const o = t[e++],
      r = t[e++],
      s = t[e++],
      u = t[e++],
      m = t[e]
    return i.defined(n)
      ? ((n._vertexFormat = p.VertexFormat.clone(a, n._vertexFormat)),
        (n._length = o),
        (n._topRadius = r),
        (n._bottomRadius = s),
        (n._slices = u),
        (n._offsetAttribute = -1 === m ? void 0 : m),
        n)
      : ((_.length = o), (_.topRadius = r), (_.bottomRadius = s), (_.slices = u), (_.offsetAttribute = -1 === m ? void 0 : m), new x(_))
  }),
    (x.createGeometry = function (t) {
      let p = t._length
      const x = t._topRadius,
        g = t._bottomRadius,
        _ = t._vertexFormat,
        h = t._slices
      if (p <= 0 || x < 0 || g < 0 || (0 === x && 0 === g)) return
      const F = h + h,
        v = h + F,
        C = F + F,
        w = r.CylinderGeometryLibrary.computePositions(p, x, g, h, !0),
        G = _.st ? new Float32Array(2 * C) : void 0,
        V = _.normal ? new Float32Array(3 * C) : void 0,
        D = _.tangent ? new Float32Array(3 * C) : void 0,
        R = _.bitangent ? new Float32Array(3 * C) : void 0
      let T
      const O = _.normal || _.tangent || _.bitangent
      if (O) {
        const t = _.tangent || _.bitangent
        let e = 0,
          n = 0,
          o = 0
        const r = Math.atan2(g - x, p),
          i = d
        i.z = Math.sin(r)
        const s = Math.cos(r)
        let u = b,
          m = f
        for (T = 0; T < h; T++) {
          const r = (T / h) * c.CesiumMath.TWO_PI,
            l = s * Math.cos(r),
            p = s * Math.sin(r)
          O &&
            ((i.x = l),
            (i.y = p),
            t && (u = a.Cartesian3.normalize(a.Cartesian3.cross(a.Cartesian3.UNIT_Z, i, u), u)),
            _.normal && ((V[e++] = i.x), (V[e++] = i.y), (V[e++] = i.z), (V[e++] = i.x), (V[e++] = i.y), (V[e++] = i.z)),
            _.tangent && ((D[n++] = u.x), (D[n++] = u.y), (D[n++] = u.z), (D[n++] = u.x), (D[n++] = u.y), (D[n++] = u.z)),
            _.bitangent &&
              ((m = a.Cartesian3.normalize(a.Cartesian3.cross(i, u, m), m)),
              (R[o++] = m.x),
              (R[o++] = m.y),
              (R[o++] = m.z),
              (R[o++] = m.x),
              (R[o++] = m.y),
              (R[o++] = m.z)))
        }
        for (T = 0; T < h; T++)
          _.normal && ((V[e++] = 0), (V[e++] = 0), (V[e++] = -1)),
            _.tangent && ((D[n++] = 1), (D[n++] = 0), (D[n++] = 0)),
            _.bitangent && ((R[o++] = 0), (R[o++] = -1), (R[o++] = 0))
        for (T = 0; T < h; T++)
          _.normal && ((V[e++] = 0), (V[e++] = 0), (V[e++] = 1)),
            _.tangent && ((D[n++] = 1), (D[n++] = 0), (D[n++] = 0)),
            _.bitangent && ((R[o++] = 0), (R[o++] = 1), (R[o++] = 0))
      }
      const L = 12 * h - 12,
        M = l.IndexDatatype.createTypedArray(C, L)
      let P = 0,
        k = 0
      for (T = 0; T < h - 1; T++) (M[P++] = k), (M[P++] = k + 2), (M[P++] = k + 3), (M[P++] = k), (M[P++] = k + 3), (M[P++] = k + 1), (k += 2)
      for (M[P++] = F - 2, M[P++] = 0, M[P++] = 1, M[P++] = F - 2, M[P++] = 1, M[P++] = F - 1, T = 1; T < h - 1; T++)
        (M[P++] = F + T + 1), (M[P++] = F + T), (M[P++] = F)
      for (T = 1; T < h - 1; T++) (M[P++] = v), (M[P++] = v + T), (M[P++] = v + T + 1)
      let z = 0
      if (_.st) {
        const t = Math.max(x, g)
        for (T = 0; T < C; T++) {
          const e = a.Cartesian3.fromArray(w, 3 * T, A)
          ;(G[z++] = (e.x + t) / (2 * t)), (G[z++] = (e.y + t) / (2 * t))
        }
      }
      const E = new u.GeometryAttributes()
      _.position && (E.position = new s.GeometryAttribute({ componentDatatype: o.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: w })),
        _.normal && (E.normal = new s.GeometryAttribute({ componentDatatype: o.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: V })),
        _.tangent && (E.tangent = new s.GeometryAttribute({ componentDatatype: o.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: D })),
        _.bitangent &&
          (E.bitangent = new s.GeometryAttribute({ componentDatatype: o.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: R })),
        _.st && (E.st = new s.GeometryAttribute({ componentDatatype: o.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: G })),
        (y.x = 0.5 * p),
        (y.y = Math.max(g, x))
      const N = new e.BoundingSphere(a.Cartesian3.ZERO, n.Cartesian2.magnitude(y))
      if (i.defined(t._offsetAttribute)) {
        p = w.length
        const e = t._offsetAttribute === m.GeometryOffsetAttribute.NONE ? 0 : 1,
          n = new Uint8Array(p / 3).fill(e)
        E.applyOffset = new s.GeometryAttribute({ componentDatatype: o.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: n })
      }
      return new s.Geometry({
        attributes: E,
        indices: M,
        primitiveType: s.PrimitiveType.TRIANGLES,
        boundingSphere: N,
        offsetAttribute: t._offsetAttribute
      })
    }),
    (x.getUnitCylinder = function () {
      return (
        i.defined(h) || (h = x.createGeometry(new x({ topRadius: 1, bottomRadius: 1, length: 1, vertexFormat: p.VertexFormat.POSITION_ONLY }))), h
      )
    }),
    (t.CylinderGeometry = x)
})
