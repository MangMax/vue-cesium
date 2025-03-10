define([
  './arrayRemoveDuplicates-9b636830',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './PolylineVolumeGeometryLibrary-664193d8',
  './CorridorGeometryLibrary-99cbed9f',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolygonPipeline-621b1cb0',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93',
  './EllipsoidTangentPlane-d430e7d5',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './PolylinePipeline-5ae670bc',
  './EllipsoidGeodesic-2723ab86',
  './EllipsoidRhumbLine-77eff028'
], function (e, t, i, r, o, n, s, a, l, u, d, p, f, h, c, y, g, b, m, A, _, E, C, G) {
  'use strict'
  const T = new i.Cartesian3(),
    P = new i.Cartesian3(),
    v = new i.Cartesian3()
  function w(e, t) {
    const u = [],
      p = e.positions,
      f = e.corners,
      h = e.endPositions,
      c = new l.GeometryAttributes()
    let y,
      g,
      b,
      m = 0,
      A = 0,
      _ = 0
    for (g = 0; g < p.length; g += 2) (b = p[g].length - 3), (m += b), (_ += (b / 3) * 4), (A += p[g + 1].length - 3)
    for (m += 3, A += 3, g = 0; g < f.length; g++) {
      y = f[g]
      const e = f[g].leftPositions
      s.defined(e) ? ((b = e.length), (m += b), (_ += (b / 3) * 2)) : ((b = f[g].rightPositions.length), (A += b), (_ += (b / 3) * 2))
    }
    const E = s.defined(h)
    let C
    E && ((C = h[0].length - 3), (m += C), (A += C), (C /= 3), (_ += 4 * C))
    const G = m + A,
      w = new Float64Array(G)
    let L,
      D,
      x,
      k,
      V,
      N,
      O = 0,
      H = G - 1
    const I = C / 2,
      M = d.IndexDatatype.createTypedArray(G / 3, _ + 4)
    let B = 0
    if (((M[B++] = O / 3), (M[B++] = (H - 2) / 3), E)) {
      u.push(O / 3), (N = T), (V = P)
      const e = h[0]
      for (g = 0; g < I; g++)
        (N = i.Cartesian3.fromArray(e, 3 * (I - 1 - g), N)),
          (V = i.Cartesian3.fromArray(e, 3 * (I + g), V)),
          n.CorridorGeometryLibrary.addAttribute(w, V, O),
          n.CorridorGeometryLibrary.addAttribute(w, N, void 0, H),
          (D = O / 3),
          (k = D + 1),
          (L = (H - 2) / 3),
          (x = L - 1),
          (M[B++] = L),
          (M[B++] = x),
          (M[B++] = D),
          (M[B++] = k),
          (O += 3),
          (H -= 3)
    }
    let S = 0,
      R = p[S++],
      U = p[S++]
    for (w.set(R, O), w.set(U, H - U.length + 1), b = U.length - 3, u.push(O / 3, (H - 2) / 3), g = 0; g < b; g += 3)
      (D = O / 3), (k = D + 1), (L = (H - 2) / 3), (x = L - 1), (M[B++] = L), (M[B++] = x), (M[B++] = D), (M[B++] = k), (O += 3), (H -= 3)
    for (g = 0; g < f.length; g++) {
      let e
      y = f[g]
      const r = y.leftPositions,
        a = y.rightPositions
      let l,
        d = v
      if (s.defined(r)) {
        for (H -= 3, l = x, u.push(k), e = 0; e < r.length / 3; e++)
          (d = i.Cartesian3.fromArray(r, 3 * e, d)),
            (M[B++] = l - e - 1),
            (M[B++] = l - e),
            n.CorridorGeometryLibrary.addAttribute(w, d, void 0, H),
            (H -= 3)
        u.push(l - Math.floor(r.length / 6)), t === o.CornerType.BEVELED && u.push((H - 2) / 3 + 1), (O += 3)
      } else {
        for (O += 3, l = k, u.push(x), e = 0; e < a.length / 3; e++)
          (d = i.Cartesian3.fromArray(a, 3 * e, d)), (M[B++] = l + e), (M[B++] = l + e + 1), n.CorridorGeometryLibrary.addAttribute(w, d, O), (O += 3)
        u.push(l + Math.floor(a.length / 6)), t === o.CornerType.BEVELED && u.push(O / 3 - 1), (H -= 3)
      }
      for (
        R = p[S++], U = p[S++], R.splice(0, 3), U.splice(U.length - 3, 3), w.set(R, O), w.set(U, H - U.length + 1), b = U.length - 3, e = 0;
        e < U.length;
        e += 3
      )
        (k = O / 3), (D = k - 1), (x = (H - 2) / 3), (L = x + 1), (M[B++] = L), (M[B++] = x), (M[B++] = D), (M[B++] = k), (O += 3), (H -= 3)
      ;(O -= 3), (H += 3), u.push(O / 3, (H - 2) / 3)
    }
    if (E) {
      ;(O += 3), (H -= 3), (N = T), (V = P)
      const e = h[1]
      for (g = 0; g < I; g++)
        (N = i.Cartesian3.fromArray(e, 3 * (C - g - 1), N)),
          (V = i.Cartesian3.fromArray(e, 3 * g, V)),
          n.CorridorGeometryLibrary.addAttribute(w, N, void 0, H),
          n.CorridorGeometryLibrary.addAttribute(w, V, O),
          (k = O / 3),
          (D = k - 1),
          (x = (H - 2) / 3),
          (L = x + 1),
          (M[B++] = L),
          (M[B++] = x),
          (M[B++] = D),
          (M[B++] = k),
          (O += 3),
          (H -= 3)
      u.push(O / 3)
    } else u.push(O / 3, (H - 2) / 3)
    return (
      (M[B++] = O / 3),
      (M[B++] = (H - 2) / 3),
      (c.position = new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: w })),
      { attributes: c, indices: M, wallIndices: u }
    )
  }
  function L(e) {
    const t = (e = s.defaultValue(e, s.defaultValue.EMPTY_OBJECT)).positions,
      r = e.width,
      n = s.defaultValue(e.height, 0),
      a = s.defaultValue(e.extrudedHeight, n)
    ;(this._positions = t),
      (this._ellipsoid = i.Ellipsoid.clone(s.defaultValue(e.ellipsoid, i.Ellipsoid.WGS84))),
      (this._width = r),
      (this._height = Math.max(n, a)),
      (this._extrudedHeight = Math.min(n, a)),
      (this._cornerType = s.defaultValue(e.cornerType, o.CornerType.ROUNDED)),
      (this._granularity = s.defaultValue(e.granularity, p.CesiumMath.RADIANS_PER_DEGREE)),
      (this._offsetAttribute = e.offsetAttribute),
      (this._workerName = 'createCorridorOutlineGeometry'),
      (this.packedLength = 1 + t.length * i.Cartesian3.packedLength + i.Ellipsoid.packedLength + 6)
  }
  L.pack = function (e, t, r) {
    r = s.defaultValue(r, 0)
    const o = e._positions,
      n = o.length
    t[r++] = n
    for (let e = 0; e < n; ++e, r += i.Cartesian3.packedLength) i.Cartesian3.pack(o[e], t, r)
    return (
      i.Ellipsoid.pack(e._ellipsoid, t, r),
      (r += i.Ellipsoid.packedLength),
      (t[r++] = e._width),
      (t[r++] = e._height),
      (t[r++] = e._extrudedHeight),
      (t[r++] = e._cornerType),
      (t[r++] = e._granularity),
      (t[r] = s.defaultValue(e._offsetAttribute, -1)),
      t
    )
  }
  const D = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE),
    x = {
      positions: void 0,
      ellipsoid: D,
      width: void 0,
      height: void 0,
      extrudedHeight: void 0,
      cornerType: void 0,
      granularity: void 0,
      offsetAttribute: void 0
    }
  return (
    (L.unpack = function (e, t, r) {
      t = s.defaultValue(t, 0)
      const o = e[t++],
        n = new Array(o)
      for (let r = 0; r < o; ++r, t += i.Cartesian3.packedLength) n[r] = i.Cartesian3.unpack(e, t)
      const a = i.Ellipsoid.unpack(e, t, D)
      t += i.Ellipsoid.packedLength
      const l = e[t++],
        u = e[t++],
        d = e[t++],
        p = e[t++],
        f = e[t++],
        h = e[t]
      return s.defined(r)
        ? ((r._positions = n),
          (r._ellipsoid = i.Ellipsoid.clone(a, r._ellipsoid)),
          (r._width = l),
          (r._height = u),
          (r._extrudedHeight = d),
          (r._cornerType = p),
          (r._granularity = f),
          (r._offsetAttribute = -1 === h ? void 0 : h),
          r)
        : ((x.positions = n),
          (x.width = l),
          (x.height = u),
          (x.extrudedHeight = d),
          (x.cornerType = p),
          (x.granularity = f),
          (x.offsetAttribute = -1 === h ? void 0 : h),
          new L(x))
    }),
    (L.createGeometry = function (o) {
      let l = o._positions
      const h = o._width,
        c = o._ellipsoid
      l = (function (e, t) {
        for (let i = 0; i < e.length; i++) e[i] = t.scaleToGeodeticSurface(e[i], e[i])
        return e
      })(l, c)
      const y = e.arrayRemoveDuplicates(l, i.Cartesian3.equalsEpsilon)
      if (y.length < 2 || h <= 0) return
      const g = o._height,
        b = o._extrudedHeight,
        m = !p.CesiumMath.equalsEpsilon(g, b, 0, p.CesiumMath.EPSILON2),
        A = { ellipsoid: c, positions: y, width: h, cornerType: o._cornerType, granularity: o._granularity, saveAttributes: !1 }
      let _
      if (m)
        (A.height = g),
          (A.extrudedHeight = b),
          (A.offsetAttribute = o._offsetAttribute),
          (_ = (function (e) {
            const t = e.ellipsoid,
              i = w(n.CorridorGeometryLibrary.computePositions(e), e.cornerType),
              o = i.wallIndices,
              l = e.height,
              p = e.extrudedHeight,
              h = i.attributes,
              c = i.indices
            let y = h.position.values,
              g = y.length,
              b = new Float64Array(g)
            b.set(y)
            const m = new Float64Array(2 * g)
            if (
              ((y = f.PolygonPipeline.scaleToGeodeticHeight(y, l, t)),
              (b = f.PolygonPipeline.scaleToGeodeticHeight(b, p, t)),
              m.set(y),
              m.set(b, g),
              (h.position.values = m),
              (g /= 3),
              s.defined(e.offsetAttribute))
            ) {
              let t = new Uint8Array(2 * g)
              if (e.offsetAttribute === u.GeometryOffsetAttribute.TOP) t = t.fill(1, 0, g)
              else {
                const i = e.offsetAttribute === u.GeometryOffsetAttribute.NONE ? 0 : 1
                t = t.fill(i)
              }
              h.applyOffset = new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: t })
            }
            let A
            const _ = c.length,
              E = d.IndexDatatype.createTypedArray(m.length / 3, 2 * (_ + o.length))
            E.set(c)
            let C,
              G,
              T = _
            for (A = 0; A < _; A += 2) {
              const e = c[A],
                t = c[A + 1]
              ;(E[T++] = e + g), (E[T++] = t + g)
            }
            for (A = 0; A < o.length; A++) (C = o[A]), (G = C + g), (E[T++] = C), (E[T++] = G)
            return { attributes: h, indices: E }
          })(A))
      else {
        if (
          ((_ = w(n.CorridorGeometryLibrary.computePositions(A), A.cornerType)),
          (_.attributes.position.values = f.PolygonPipeline.scaleToGeodeticHeight(_.attributes.position.values, g, c)),
          s.defined(o._offsetAttribute))
        ) {
          const e = _.attributes.position.values.length,
            t = o._offsetAttribute === u.GeometryOffsetAttribute.NONE ? 0 : 1,
            i = new Uint8Array(e / 3).fill(t)
          _.attributes.applyOffset = new a.GeometryAttribute({
            componentDatatype: r.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: i
          })
        }
      }
      const E = _.attributes,
        C = t.BoundingSphere.fromVertices(E.position.values, void 0, 3)
      return new a.Geometry({
        attributes: E,
        indices: _.indices,
        primitiveType: a.PrimitiveType.LINES,
        boundingSphere: C,
        offsetAttribute: o._offsetAttribute
      })
    }),
    function (e, t) {
      return s.defined(t) && (e = L.unpack(e, t)), (e._ellipsoid = i.Ellipsoid.clone(e._ellipsoid)), L.createGeometry(e)
    }
  )
})
