define([
  'exports',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './VertexFormat-fbdec922'
], function (t, e, a, n, i, r, o, s, m, u, l, c) {
  'use strict'
  const f = new n.Cartesian3(),
    d = new n.Cartesian3(),
    C = new n.Cartesian3(),
    p = new n.Cartesian3(),
    y = new n.Cartesian3(),
    _ = new n.Cartesian3(1, 1, 1),
    h = Math.cos,
    x = Math.sin
  function A(t) {
    t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)
    const e = r.defaultValue(t.radii, _),
      a = r.defaultValue(t.innerRadii, e),
      i = r.defaultValue(t.minimumClock, 0),
      o = r.defaultValue(t.maximumClock, l.CesiumMath.TWO_PI),
      s = r.defaultValue(t.minimumCone, 0),
      m = r.defaultValue(t.maximumCone, l.CesiumMath.PI),
      u = Math.round(r.defaultValue(t.stackPartitions, 64)),
      f = Math.round(r.defaultValue(t.slicePartitions, 64)),
      d = r.defaultValue(t.vertexFormat, c.VertexFormat.DEFAULT)
    ;(this._radii = n.Cartesian3.clone(e)),
      (this._innerRadii = n.Cartesian3.clone(a)),
      (this._minimumClock = i),
      (this._maximumClock = o),
      (this._minimumCone = s),
      (this._maximumCone = m),
      (this._stackPartitions = u),
      (this._slicePartitions = f),
      (this._vertexFormat = c.VertexFormat.clone(d)),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createEllipsoidGeometry')
  }
  ;(A.packedLength = 2 * n.Cartesian3.packedLength + c.VertexFormat.packedLength + 7),
    (A.pack = function (t, e, a) {
      return (
        (a = r.defaultValue(a, 0)),
        n.Cartesian3.pack(t._radii, e, a),
        (a += n.Cartesian3.packedLength),
        n.Cartesian3.pack(t._innerRadii, e, a),
        (a += n.Cartesian3.packedLength),
        c.VertexFormat.pack(t._vertexFormat, e, a),
        (a += c.VertexFormat.packedLength),
        (e[a++] = t._minimumClock),
        (e[a++] = t._maximumClock),
        (e[a++] = t._minimumCone),
        (e[a++] = t._maximumCone),
        (e[a++] = t._stackPartitions),
        (e[a++] = t._slicePartitions),
        (e[a] = r.defaultValue(t._offsetAttribute, -1)),
        e
      )
    })
  const k = new n.Cartesian3(),
    b = new n.Cartesian3(),
    w = new c.VertexFormat(),
    g = {
      radii: k,
      innerRadii: b,
      vertexFormat: w,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      offsetAttribute: void 0
    }
  let P
  ;(A.unpack = function (t, e, a) {
    e = r.defaultValue(e, 0)
    const i = n.Cartesian3.unpack(t, e, k)
    e += n.Cartesian3.packedLength
    const o = n.Cartesian3.unpack(t, e, b)
    e += n.Cartesian3.packedLength
    const s = c.VertexFormat.unpack(t, e, w)
    e += c.VertexFormat.packedLength
    const m = t[e++],
      u = t[e++],
      l = t[e++],
      f = t[e++],
      d = t[e++],
      C = t[e++],
      p = t[e]
    return r.defined(a)
      ? ((a._radii = n.Cartesian3.clone(i, a._radii)),
        (a._innerRadii = n.Cartesian3.clone(o, a._innerRadii)),
        (a._vertexFormat = c.VertexFormat.clone(s, a._vertexFormat)),
        (a._minimumClock = m),
        (a._maximumClock = u),
        (a._minimumCone = l),
        (a._maximumCone = f),
        (a._stackPartitions = d),
        (a._slicePartitions = C),
        (a._offsetAttribute = -1 === p ? void 0 : p),
        a)
      : ((g.minimumClock = m),
        (g.maximumClock = u),
        (g.minimumCone = l),
        (g.maximumCone = f),
        (g.stackPartitions = d),
        (g.slicePartitions = C),
        (g.offsetAttribute = -1 === p ? void 0 : p),
        new A(g))
  }),
    (A.createGeometry = function (t) {
      const c = t._radii
      if (c.x <= 0 || c.y <= 0 || c.z <= 0) return
      const _ = t._innerRadii
      if (_.x <= 0 || _.y <= 0 || _.z <= 0) return
      const A = t._minimumClock,
        k = t._maximumClock,
        b = t._minimumCone,
        w = t._maximumCone,
        g = t._vertexFormat
      let P,
        v,
        F = t._slicePartitions + 1,
        V = t._stackPartitions + 1
      ;(F = Math.round((F * Math.abs(k - A)) / l.CesiumMath.TWO_PI)),
        (V = Math.round((V * Math.abs(w - b)) / l.CesiumMath.PI)),
        F < 2 && (F = 2),
        V < 2 && (V = 2)
      let M = 0
      const T = [b],
        D = [A]
      for (P = 0; P < V; P++) T.push(b + (P * (w - b)) / (V - 1))
      for (T.push(w), v = 0; v < F; v++) D.push(A + (v * (k - A)) / (F - 1))
      D.push(k)
      const G = T.length,
        L = D.length
      let O = 0,
        I = 1
      const E = _.x !== c.x || _.y !== c.y || _.z !== c.z
      let z = !1,
        N = !1,
        R = !1
      E &&
        ((I = 2),
        b > 0 && ((z = !0), (O += F - 1)),
        w < Math.PI && ((N = !0), (O += F - 1)),
        (k - A) % l.CesiumMath.TWO_PI ? ((R = !0), (O += 2 * (V - 1) + 1)) : (O += 1))
      const U = L * G * I,
        S = new Float64Array(3 * U),
        B = new Array(U).fill(!1),
        W = new Array(U).fill(!1),
        Y = F * V * I,
        J = 6 * (Y + O + 1 - (F + V) * I),
        X = u.IndexDatatype.createTypedArray(Y, J),
        Z = g.normal ? new Float32Array(3 * U) : void 0,
        j = g.tangent ? new Float32Array(3 * U) : void 0,
        q = g.bitangent ? new Float32Array(3 * U) : void 0,
        H = g.st ? new Float32Array(2 * U) : void 0,
        K = new Array(G),
        Q = new Array(G)
      for (P = 0; P < G; P++) (K[P] = x(T[P])), (Q[P] = h(T[P]))
      const $ = new Array(L),
        tt = new Array(L)
      for (v = 0; v < L; v++) (tt[v] = h(D[v])), ($[v] = x(D[v]))
      for (P = 0; P < G; P++) for (v = 0; v < L; v++) (S[M++] = c.x * K[P] * tt[v]), (S[M++] = c.y * K[P] * $[v]), (S[M++] = c.z * Q[P])
      let et,
        at,
        nt,
        it,
        rt = U / 2
      if (E)
        for (P = 0; P < G; P++)
          for (v = 0; v < L; v++)
            (S[M++] = _.x * K[P] * tt[v]),
              (S[M++] = _.y * K[P] * $[v]),
              (S[M++] = _.z * Q[P]),
              (B[rt] = !0),
              P > 0 && P !== G - 1 && 0 !== v && v !== L - 1 && (W[rt] = !0),
              rt++
      for (M = 0, P = 1; P < G - 2; P++)
        for (et = P * L, at = (P + 1) * L, v = 1; v < L - 2; v++)
          (X[M++] = at + v), (X[M++] = at + v + 1), (X[M++] = et + v + 1), (X[M++] = at + v), (X[M++] = et + v + 1), (X[M++] = et + v)
      if (E) {
        const t = G * L
        for (P = 1; P < G - 2; P++)
          for (et = t + P * L, at = t + (P + 1) * L, v = 1; v < L - 2; v++)
            (X[M++] = at + v), (X[M++] = et + v), (X[M++] = et + v + 1), (X[M++] = at + v), (X[M++] = et + v + 1), (X[M++] = at + v + 1)
      }
      if (E) {
        if (z)
          for (it = G * L, P = 1; P < L - 2; P++)
            (X[M++] = P), (X[M++] = P + 1), (X[M++] = it + P + 1), (X[M++] = P), (X[M++] = it + P + 1), (X[M++] = it + P)
        if (N)
          for (nt = G * L - L, it = G * L * I - L, P = 1; P < L - 2; P++)
            (X[M++] = nt + P + 1), (X[M++] = nt + P), (X[M++] = it + P), (X[M++] = nt + P + 1), (X[M++] = it + P), (X[M++] = it + P + 1)
      }
      if (R) {
        for (P = 1; P < G - 2; P++)
          (it = L * G + L * P), (nt = L * P), (X[M++] = it), (X[M++] = nt + L), (X[M++] = nt), (X[M++] = it), (X[M++] = it + L), (X[M++] = nt + L)
        for (P = 1; P < G - 2; P++)
          (it = L * G + L * (P + 1) - 1),
            (nt = L * (P + 1) - 1),
            (X[M++] = nt + L),
            (X[M++] = it),
            (X[M++] = nt),
            (X[M++] = nt + L),
            (X[M++] = it + L),
            (X[M++] = it)
      }
      const ot = new s.GeometryAttributes()
      g.position && (ot.position = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: S }))
      let st = 0,
        mt = 0,
        ut = 0,
        lt = 0
      const ct = U / 2
      let ft
      const dt = n.Ellipsoid.fromCartesian3(c),
        Ct = n.Ellipsoid.fromCartesian3(_)
      if (g.st || g.normal || g.tangent || g.bitangent) {
        for (P = 0; P < U; P++) {
          ft = B[P] ? Ct : dt
          const t = n.Cartesian3.fromArray(S, 3 * P, f),
            e = ft.geodeticSurfaceNormal(t, d)
          if ((W[P] && n.Cartesian3.negate(e, e), g.st)) {
            const t = a.Cartesian2.negate(e, y)
            ;(H[st++] = Math.atan2(t.y, t.x) / l.CesiumMath.TWO_PI + 0.5), (H[st++] = Math.asin(e.z) / Math.PI + 0.5)
          }
          if ((g.normal && ((Z[mt++] = e.x), (Z[mt++] = e.y), (Z[mt++] = e.z)), g.tangent || g.bitangent)) {
            const t = C
            let a,
              i = 0
            if (
              (B[P] && (i = ct),
              (a = !z && P >= i && P < i + 2 * L ? n.Cartesian3.UNIT_X : n.Cartesian3.UNIT_Z),
              n.Cartesian3.cross(a, e, t),
              n.Cartesian3.normalize(t, t),
              g.tangent && ((j[ut++] = t.x), (j[ut++] = t.y), (j[ut++] = t.z)),
              g.bitangent)
            ) {
              const a = n.Cartesian3.cross(e, t, p)
              n.Cartesian3.normalize(a, a), (q[lt++] = a.x), (q[lt++] = a.y), (q[lt++] = a.z)
            }
          }
        }
        g.st && (ot.st = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: H })),
          g.normal && (ot.normal = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: Z })),
          g.tangent && (ot.tangent = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: j })),
          g.bitangent &&
            (ot.bitangent = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: q }))
      }
      if (r.defined(t._offsetAttribute)) {
        const e = S.length,
          a = t._offsetAttribute === m.GeometryOffsetAttribute.NONE ? 0 : 1,
          n = new Uint8Array(e / 3).fill(a)
        ot.applyOffset = new o.GeometryAttribute({ componentDatatype: i.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: n })
      }
      return new o.Geometry({
        attributes: ot,
        indices: X,
        primitiveType: o.PrimitiveType.TRIANGLES,
        boundingSphere: e.BoundingSphere.fromEllipsoid(dt),
        offsetAttribute: t._offsetAttribute
      })
    }),
    (A.getUnitEllipsoid = function () {
      return r.defined(P) || (P = A.createGeometry(new A({ radii: new n.Cartesian3(1, 1, 1), vertexFormat: c.VertexFormat.POSITION_ONLY }))), P
    }),
    (t.EllipsoidGeometry = A)
})
