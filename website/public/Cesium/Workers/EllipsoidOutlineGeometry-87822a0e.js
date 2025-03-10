define([
  'exports',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9'
], function (t, i, e, n, a, o, r, s, u, m) {
  'use strict'
  const l = new e.Cartesian3(1, 1, 1),
    f = Math.cos,
    c = Math.sin
  function d(t) {
    t = a.defaultValue(t, a.defaultValue.EMPTY_OBJECT)
    const i = a.defaultValue(t.radii, l),
      n = a.defaultValue(t.innerRadii, i),
      o = a.defaultValue(t.minimumClock, 0),
      r = a.defaultValue(t.maximumClock, m.CesiumMath.TWO_PI),
      s = a.defaultValue(t.minimumCone, 0),
      u = a.defaultValue(t.maximumCone, m.CesiumMath.PI),
      f = Math.round(a.defaultValue(t.stackPartitions, 10)),
      c = Math.round(a.defaultValue(t.slicePartitions, 8)),
      d = Math.round(a.defaultValue(t.subdivisions, 128))
    ;(this._radii = e.Cartesian3.clone(i)),
      (this._innerRadii = e.Cartesian3.clone(n)),
      (this._minimumClock = o),
      (this._maximumClock = r),
      (this._minimumCone = s),
      (this._maximumCone = u),
      (this._stackPartitions = f),
      (this._slicePartitions = c),
      (this._subdivisions = d),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createEllipsoidOutlineGeometry')
  }
  ;(d.packedLength = 2 * e.Cartesian3.packedLength + 8),
    (d.pack = function (t, i, n) {
      return (
        (n = a.defaultValue(n, 0)),
        e.Cartesian3.pack(t._radii, i, n),
        (n += e.Cartesian3.packedLength),
        e.Cartesian3.pack(t._innerRadii, i, n),
        (n += e.Cartesian3.packedLength),
        (i[n++] = t._minimumClock),
        (i[n++] = t._maximumClock),
        (i[n++] = t._minimumCone),
        (i[n++] = t._maximumCone),
        (i[n++] = t._stackPartitions),
        (i[n++] = t._slicePartitions),
        (i[n++] = t._subdivisions),
        (i[n] = a.defaultValue(t._offsetAttribute, -1)),
        i
      )
    })
  const C = new e.Cartesian3(),
    _ = new e.Cartesian3(),
    p = {
      radii: C,
      innerRadii: _,
      minimumClock: void 0,
      maximumClock: void 0,
      minimumCone: void 0,
      maximumCone: void 0,
      stackPartitions: void 0,
      slicePartitions: void 0,
      subdivisions: void 0,
      offsetAttribute: void 0
    }
  ;(d.unpack = function (t, i, n) {
    i = a.defaultValue(i, 0)
    const o = e.Cartesian3.unpack(t, i, C)
    i += e.Cartesian3.packedLength
    const r = e.Cartesian3.unpack(t, i, _)
    i += e.Cartesian3.packedLength
    const s = t[i++],
      u = t[i++],
      m = t[i++],
      l = t[i++],
      f = t[i++],
      c = t[i++],
      h = t[i++],
      y = t[i]
    return a.defined(n)
      ? ((n._radii = e.Cartesian3.clone(o, n._radii)),
        (n._innerRadii = e.Cartesian3.clone(r, n._innerRadii)),
        (n._minimumClock = s),
        (n._maximumClock = u),
        (n._minimumCone = m),
        (n._maximumCone = l),
        (n._stackPartitions = f),
        (n._slicePartitions = c),
        (n._subdivisions = h),
        (n._offsetAttribute = -1 === y ? void 0 : y),
        n)
      : ((p.minimumClock = s),
        (p.maximumClock = u),
        (p.minimumCone = m),
        (p.maximumCone = l),
        (p.stackPartitions = f),
        (p.slicePartitions = c),
        (p.subdivisions = h),
        (p.offsetAttribute = -1 === y ? void 0 : y),
        new d(p))
  }),
    (d.createGeometry = function (t) {
      const l = t._radii
      if (l.x <= 0 || l.y <= 0 || l.z <= 0) return
      const d = t._innerRadii
      if (d.x <= 0 || d.y <= 0 || d.z <= 0) return
      const C = t._minimumClock,
        _ = t._maximumClock,
        p = t._minimumCone,
        h = t._maximumCone,
        y = t._subdivisions,
        k = e.Ellipsoid.fromCartesian3(l)
      let b = t._slicePartitions + 1,
        x = t._stackPartitions + 1
      ;(b = Math.round((b * Math.abs(_ - C)) / m.CesiumMath.TWO_PI)),
        (x = Math.round((x * Math.abs(h - p)) / m.CesiumMath.PI)),
        b < 2 && (b = 2),
        x < 2 && (x = 2)
      let A = 0,
        P = 1
      const v = d.x !== l.x || d.y !== l.y || d.z !== l.z
      let M = !1,
        w = !1
      v && ((P = 2), p > 0 && ((M = !0), (A += b)), h < Math.PI && ((w = !0), (A += b)))
      const V = y * P * (x + b),
        g = new Float64Array(3 * V),
        G = 2 * (V + A - (b + x) * P),
        E = u.IndexDatatype.createTypedArray(V, G)
      let O,
        D,
        I,
        T,
        z = 0
      const L = new Array(x),
        R = new Array(x)
      for (O = 0; O < x; O++) (T = p + (O * (h - p)) / (x - 1)), (L[O] = c(T)), (R[O] = f(T))
      const N = new Array(y),
        B = new Array(y)
      for (O = 0; O < y; O++) (I = C + (O * (_ - C)) / (y - 1)), (N[O] = c(I)), (B[O] = f(I))
      for (O = 0; O < x; O++) for (D = 0; D < y; D++) (g[z++] = l.x * L[O] * B[D]), (g[z++] = l.y * L[O] * N[D]), (g[z++] = l.z * R[O])
      if (v) for (O = 0; O < x; O++) for (D = 0; D < y; D++) (g[z++] = d.x * L[O] * B[D]), (g[z++] = d.y * L[O] * N[D]), (g[z++] = d.z * R[O])
      for (L.length = y, R.length = y, O = 0; O < y; O++) (T = p + (O * (h - p)) / (y - 1)), (L[O] = c(T)), (R[O] = f(T))
      for (N.length = b, B.length = b, O = 0; O < b; O++) (I = C + (O * (_ - C)) / (b - 1)), (N[O] = c(I)), (B[O] = f(I))
      for (O = 0; O < y; O++) for (D = 0; D < b; D++) (g[z++] = l.x * L[O] * B[D]), (g[z++] = l.y * L[O] * N[D]), (g[z++] = l.z * R[O])
      if (v) for (O = 0; O < y; O++) for (D = 0; D < b; D++) (g[z++] = d.x * L[O] * B[D]), (g[z++] = d.y * L[O] * N[D]), (g[z++] = d.z * R[O])
      for (z = 0, O = 0; O < x * P; O++) {
        const t = O * y
        for (D = 0; D < y - 1; D++) (E[z++] = t + D), (E[z++] = t + D + 1)
      }
      let S = x * y * P
      for (O = 0; O < b; O++) for (D = 0; D < y - 1; D++) (E[z++] = S + O + D * b), (E[z++] = S + O + (D + 1) * b)
      if (v) for (S = x * y * P + b * y, O = 0; O < b; O++) for (D = 0; D < y - 1; D++) (E[z++] = S + O + D * b), (E[z++] = S + O + (D + 1) * b)
      if (v) {
        let t = x * y * P,
          i = t + y * b
        if (M) for (O = 0; O < b; O++) (E[z++] = t + O), (E[z++] = i + O)
        if (w) for (t += y * b - b, i += y * b - b, O = 0; O < b; O++) (E[z++] = t + O), (E[z++] = i + O)
      }
      const U = new r.GeometryAttributes({
        position: new o.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: g })
      })
      if (a.defined(t._offsetAttribute)) {
        const i = g.length,
          e = t._offsetAttribute === s.GeometryOffsetAttribute.NONE ? 0 : 1,
          a = new Uint8Array(i / 3).fill(e)
        U.applyOffset = new o.GeometryAttribute({ componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: a })
      }
      return new o.Geometry({
        attributes: U,
        indices: E,
        primitiveType: o.PrimitiveType.LINES,
        boundingSphere: i.BoundingSphere.fromEllipsoid(k),
        offsetAttribute: t._offsetAttribute
      })
    }),
    (t.EllipsoidOutlineGeometry = d)
})
