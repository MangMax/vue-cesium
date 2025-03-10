define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './ArcType-26a3f38d',
  './Transforms-20461479',
  './Color-498d4f06',
  './ComponentDatatype-ab629b88',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolylinePipeline-5ae670bc',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93',
  './EllipsoidGeodesic-2723ab86',
  './EllipsoidRhumbLine-77eff028',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1'
], function (e, o, t, l, r, n, i, a, s, p, c, y, d, u, f, h, C, g, T) {
  'use strict'
  function m(e, o, t, l, n, i, a) {
    const s = c.PolylinePipeline.numberOfPoints(e, o, n)
    let p
    const y = t.red,
      d = t.green,
      u = t.blue,
      f = t.alpha,
      h = l.red,
      C = l.green,
      g = l.blue,
      T = l.alpha
    if (r.Color.equals(t, l)) {
      for (p = 0; p < s; p++)
        (i[a++] = r.Color.floatToByte(y)), (i[a++] = r.Color.floatToByte(d)), (i[a++] = r.Color.floatToByte(u)), (i[a++] = r.Color.floatToByte(f))
      return a
    }
    const m = (h - y) / s,
      P = (C - d) / s,
      _ = (g - u) / s,
      A = (T - f) / s
    let B = a
    for (p = 0; p < s; p++)
      (i[B++] = r.Color.floatToByte(y + p * m)),
        (i[B++] = r.Color.floatToByte(d + p * P)),
        (i[B++] = r.Color.floatToByte(u + p * _)),
        (i[B++] = r.Color.floatToByte(f + p * A))
    return B
  }
  function P(l) {
    const n = (l = e.defaultValue(l, e.defaultValue.EMPTY_OBJECT)).positions,
      i = l.colors,
      a = e.defaultValue(l.colorsPerVertex, !1)
    ;(this._positions = n),
      (this._colors = i),
      (this._colorsPerVertex = a),
      (this._arcType = e.defaultValue(l.arcType, t.ArcType.GEODESIC)),
      (this._granularity = e.defaultValue(l.granularity, p.CesiumMath.RADIANS_PER_DEGREE)),
      (this._ellipsoid = e.defaultValue(l.ellipsoid, o.Ellipsoid.WGS84)),
      (this._workerName = 'createSimplePolylineGeometry')
    let s = 1 + n.length * o.Cartesian3.packedLength
    ;(s += e.defined(i) ? 1 + i.length * r.Color.packedLength : 1), (this.packedLength = s + o.Ellipsoid.packedLength + 3)
  }
  ;(P.pack = function (t, l, n) {
    let i
    n = e.defaultValue(n, 0)
    const a = t._positions
    let s = a.length
    for (l[n++] = s, i = 0; i < s; ++i, n += o.Cartesian3.packedLength) o.Cartesian3.pack(a[i], l, n)
    const p = t._colors
    for (s = e.defined(p) ? p.length : 0, l[n++] = s, i = 0; i < s; ++i, n += r.Color.packedLength) r.Color.pack(p[i], l, n)
    return (
      o.Ellipsoid.pack(t._ellipsoid, l, n),
      (n += o.Ellipsoid.packedLength),
      (l[n++] = t._colorsPerVertex ? 1 : 0),
      (l[n++] = t._arcType),
      (l[n] = t._granularity),
      l
    )
  }),
    (P.unpack = function (t, l, n) {
      let i
      l = e.defaultValue(l, 0)
      let a = t[l++]
      const s = new Array(a)
      for (i = 0; i < a; ++i, l += o.Cartesian3.packedLength) s[i] = o.Cartesian3.unpack(t, l)
      a = t[l++]
      const p = a > 0 ? new Array(a) : void 0
      for (i = 0; i < a; ++i, l += r.Color.packedLength) p[i] = r.Color.unpack(t, l)
      const c = o.Ellipsoid.unpack(t, l)
      l += o.Ellipsoid.packedLength
      const y = 1 === t[l++],
        d = t[l++],
        u = t[l]
      return e.defined(n)
        ? ((n._positions = s), (n._colors = p), (n._ellipsoid = c), (n._colorsPerVertex = y), (n._arcType = d), (n._granularity = u), n)
        : new P({ positions: s, colors: p, ellipsoid: c, colorsPerVertex: y, arcType: d, granularity: u })
    })
  const _ = new Array(2),
    A = new Array(2),
    B = { positions: _, height: A, ellipsoid: void 0, minDistance: void 0, granularity: void 0 }
  return (
    (P.createGeometry = function (y) {
      const d = y._positions,
        u = y._colors,
        f = y._colorsPerVertex,
        h = y._arcType,
        C = y._granularity,
        g = y._ellipsoid,
        T = p.CesiumMath.chordLength(C, g.maximumRadius),
        P = e.defined(u) && !f
      let E
      const b = d.length
      let k,
        D,
        G,
        L,
        w = 0
      if (h === t.ArcType.GEODESIC || h === t.ArcType.RHUMB) {
        let o, l, n
        h === t.ArcType.GEODESIC
          ? ((o = p.CesiumMath.chordLength(C, g.maximumRadius)), (l = c.PolylinePipeline.numberOfPoints), (n = c.PolylinePipeline.generateArc))
          : ((o = C), (l = c.PolylinePipeline.numberOfPointsRhumbLine), (n = c.PolylinePipeline.generateRhumbArc))
        const i = c.PolylinePipeline.extractHeights(d, g),
          a = B
        if ((h === t.ArcType.GEODESIC ? (a.minDistance = T) : (a.granularity = C), (a.ellipsoid = g), P)) {
          let t = 0
          for (E = 0; E < b - 1; E++) t += l(d[E], d[E + 1], o) + 1
          ;(k = new Float64Array(3 * t)), (G = new Uint8Array(4 * t)), (a.positions = _), (a.height = A)
          let s = 0
          for (E = 0; E < b - 1; ++E) {
            ;(_[0] = d[E]), (_[1] = d[E + 1]), (A[0] = i[E]), (A[1] = i[E + 1])
            const o = n(a)
            if (e.defined(u)) {
              const e = o.length / 3
              L = u[E]
              for (let o = 0; o < e; ++o)
                (G[s++] = r.Color.floatToByte(L.red)),
                  (G[s++] = r.Color.floatToByte(L.green)),
                  (G[s++] = r.Color.floatToByte(L.blue)),
                  (G[s++] = r.Color.floatToByte(L.alpha))
            }
            k.set(o, w), (w += o.length)
          }
        } else if (((a.positions = d), (a.height = i), (k = new Float64Array(n(a))), e.defined(u))) {
          for (G = new Uint8Array((k.length / 3) * 4), E = 0; E < b - 1; ++E) {
            w = m(d[E], d[E + 1], u[E], u[E + 1], T, G, w)
          }
          const e = u[b - 1]
          ;(G[w++] = r.Color.floatToByte(e.red)),
            (G[w++] = r.Color.floatToByte(e.green)),
            (G[w++] = r.Color.floatToByte(e.blue)),
            (G[w++] = r.Color.floatToByte(e.alpha))
        }
      } else {
        ;(D = P ? 2 * b - 2 : b), (k = new Float64Array(3 * D)), (G = e.defined(u) ? new Uint8Array(4 * D) : void 0)
        let t = 0,
          l = 0
        for (E = 0; E < b; ++E) {
          const n = d[E]
          if (
            (P &&
              E > 0 &&
              (o.Cartesian3.pack(n, k, t),
              (t += 3),
              (L = u[E - 1]),
              (G[l++] = r.Color.floatToByte(L.red)),
              (G[l++] = r.Color.floatToByte(L.green)),
              (G[l++] = r.Color.floatToByte(L.blue)),
              (G[l++] = r.Color.floatToByte(L.alpha))),
            P && E === b - 1)
          )
            break
          o.Cartesian3.pack(n, k, t),
            (t += 3),
            e.defined(u) &&
              ((L = u[E]),
              (G[l++] = r.Color.floatToByte(L.red)),
              (G[l++] = r.Color.floatToByte(L.green)),
              (G[l++] = r.Color.floatToByte(L.blue)),
              (G[l++] = r.Color.floatToByte(L.alpha)))
        }
      }
      const V = new a.GeometryAttributes()
      ;(V.position = new i.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: k })),
        e.defined(u) &&
          (V.color = new i.GeometryAttribute({
            componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            values: G,
            normalize: !0
          })),
        (D = k.length / 3)
      const x = 2 * (D - 1),
        S = s.IndexDatatype.createTypedArray(D, x)
      let I = 0
      for (E = 0; E < D - 1; ++E) (S[I++] = E), (S[I++] = E + 1)
      return new i.Geometry({ attributes: V, indices: S, primitiveType: i.PrimitiveType.LINES, boundingSphere: l.BoundingSphere.fromPoints(d) })
    }),
    function (t, l) {
      return e.defined(l) && (t = P.unpack(t, l)), (t._ellipsoid = o.Ellipsoid.clone(t._ellipsoid)), P.createGeometry(t)
    }
  )
})
