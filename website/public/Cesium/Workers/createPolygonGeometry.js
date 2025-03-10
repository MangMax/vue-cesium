define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './ArcType-26a3f38d',
  './BoundingRectangle-1d581417',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './ComponentDatatype-ab629b88',
  './EllipsoidGeodesic-2723ab86',
  './EllipsoidTangentPlane-d430e7d5',
  './GeometryAttribute-b8117bde',
  './GeometryInstance-0318e0cd',
  './GeometryOffsetAttribute-2579b8d2',
  './GeometryPipeline-fcaf4d4d',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolygonGeometryLibrary-d7e504f0',
  './PolygonPipeline-621b1cb0',
  './VertexFormat-fbdec922',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './WebGLConstants-7f557f93',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './AttributeCompression-48e336db',
  './EncodedCartesian3-5e2017ab',
  './arrayRemoveDuplicates-9b636830',
  './EllipsoidRhumbLine-77eff028',
  './GeometryAttributes-1e4ddcd2'
], function (t, e, o, i, r, n, a, s, l, u, c, p, y, d, m, g, h, f, b, _, P, x, C, w, T, I, A, v, E) {
  'use strict'
  const G = new e.Cartographic(),
    O = new e.Cartographic()
  function L(t, e, o, i) {
    const r = i.cartesianToCartographic(t, G).height,
      n = i.cartesianToCartographic(e, O)
    ;(n.height = r), i.cartographicToCartesian(n, e)
    const a = i.cartesianToCartographic(o, O)
    ;(a.height = r - 100), i.cartographicToCartesian(a, o)
  }
  const V = new i.BoundingRectangle(),
    H = new e.Cartesian3(),
    D = new e.Cartesian3(),
    N = new e.Cartesian3(),
    F = new e.Cartesian3(),
    R = new e.Cartesian3(),
    M = new e.Cartesian3()
  let S = new e.Cartesian3(),
    B = new e.Cartesian3(),
    k = new e.Cartesian3()
  const z = new n.Cartesian2(),
    W = new n.Cartesian2(),
    Y = new e.Cartesian3(),
    U = new r.Quaternion(),
    j = new e.Matrix3(),
    Q = new e.Matrix3()
  function q(o) {
    const i = o.vertexFormat,
      s = o.geometry,
      l = o.shadowVolume,
      c = s.attributes.position.values,
      y = t.defined(s.attributes.st) ? s.attributes.st.values : void 0
    let d = c.length
    const g = o.wall,
      h = o.top || g,
      f = o.bottom || g
    if (i.st || i.normal || i.tangent || i.bitangent || l) {
      const p = o.boundingRectangle,
        b = o.tangentPlane,
        _ = o.ellipsoid,
        P = o.stRotation,
        x = o.perPositionHeight,
        C = z
      ;(C.x = p.x), (C.y = p.y)
      const w = i.st ? new Float32Array((d / 3) * 2) : void 0
      let T
      i.normal && (T = x && h && !g ? s.attributes.normal.values : new Float32Array(d))
      const I = i.tangent ? new Float32Array(d) : void 0,
        A = i.bitangent ? new Float32Array(d) : void 0,
        v = l ? new Float32Array(d) : void 0
      let E = 0,
        G = 0,
        O = D,
        V = N,
        q = F,
        K = !0,
        Z = j,
        J = Q
      if (0 !== P) {
        let t = r.Quaternion.fromAxisAngle(b._plane.normal, P, U)
        ;(Z = e.Matrix3.fromQuaternion(t, Z)), (t = r.Quaternion.fromAxisAngle(b._plane.normal, -P, U)), (J = e.Matrix3.fromQuaternion(t, J))
      } else (Z = e.Matrix3.clone(e.Matrix3.IDENTITY, Z)), (J = e.Matrix3.clone(e.Matrix3.IDENTITY, J))
      let X = 0,
        $ = 0
      h && f && ((X = d / 2), ($ = d / 3), (d /= 2))
      for (let r = 0; r < d; r += 3) {
        const a = e.Cartesian3.fromArray(c, r, Y)
        if (i.st && !t.defined(y)) {
          let t = e.Matrix3.multiplyByVector(Z, a, H)
          t = _.scaleToGeodeticSurface(t, t)
          const o = b.projectPointOntoPlane(t, W)
          n.Cartesian2.subtract(o, C, o)
          const i = m.CesiumMath.clamp(o.x / p.width, 0, 1),
            r = m.CesiumMath.clamp(o.y / p.height, 0, 1)
          f && ((w[E + $] = i), (w[E + 1 + $] = r)), h && ((w[E] = i), (w[E + 1] = r)), (E += 2)
        }
        if (i.normal || i.tangent || i.bitangent || l) {
          const t = G + 1,
            n = G + 2
          if (g) {
            if (r + 3 < d) {
              const t = e.Cartesian3.fromArray(c, r + 3, R)
              if (K) {
                const o = e.Cartesian3.fromArray(c, r + d, M)
                x && L(a, t, o, _),
                  e.Cartesian3.subtract(t, a, t),
                  e.Cartesian3.subtract(o, a, o),
                  (O = e.Cartesian3.normalize(e.Cartesian3.cross(o, t, O), O)),
                  (K = !1)
              }
              e.Cartesian3.equalsEpsilon(t, a, m.CesiumMath.EPSILON10) && (K = !0)
            }
            ;(i.tangent || i.bitangent) &&
              ((q = _.geodeticSurfaceNormal(a, q)), i.tangent && (V = e.Cartesian3.normalize(e.Cartesian3.cross(q, O, V), V)))
          } else
            (O = _.geodeticSurfaceNormal(a, O)),
              (i.tangent || i.bitangent) &&
                (x &&
                  ((S = e.Cartesian3.fromArray(T, G, S)),
                  (B = e.Cartesian3.cross(e.Cartesian3.UNIT_Z, S, B)),
                  (B = e.Cartesian3.normalize(e.Matrix3.multiplyByVector(J, B, B), B)),
                  i.bitangent && (k = e.Cartesian3.normalize(e.Cartesian3.cross(S, B, k), k))),
                (V = e.Cartesian3.cross(e.Cartesian3.UNIT_Z, O, V)),
                (V = e.Cartesian3.normalize(e.Matrix3.multiplyByVector(J, V, V), V)),
                i.bitangent && (q = e.Cartesian3.normalize(e.Cartesian3.cross(O, V, q), q)))
          i.normal &&
            (o.wall ? ((T[G + X] = O.x), (T[t + X] = O.y), (T[n + X] = O.z)) : f && ((T[G + X] = -O.x), (T[t + X] = -O.y), (T[n + X] = -O.z)),
            ((h && !x) || g) && ((T[G] = O.x), (T[t] = O.y), (T[n] = O.z))),
            l && (g && (O = _.geodeticSurfaceNormal(a, O)), (v[G + X] = -O.x), (v[t + X] = -O.y), (v[n + X] = -O.z)),
            i.tangent &&
              (o.wall ? ((I[G + X] = V.x), (I[t + X] = V.y), (I[n + X] = V.z)) : f && ((I[G + X] = -V.x), (I[t + X] = -V.y), (I[n + X] = -V.z)),
              h && (x ? ((I[G] = B.x), (I[t] = B.y), (I[n] = B.z)) : ((I[G] = V.x), (I[t] = V.y), (I[n] = V.z)))),
            i.bitangent &&
              (f && ((A[G + X] = q.x), (A[t + X] = q.y), (A[n + X] = q.z)),
              h && (x ? ((A[G] = k.x), (A[t] = k.y), (A[n] = k.z)) : ((A[G] = q.x), (A[t] = q.y), (A[n] = q.z)))),
            (G += 3)
        }
      }
      i.st &&
        !t.defined(y) &&
        (s.attributes.st = new u.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: w })),
        i.normal &&
          (s.attributes.normal = new u.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: T })),
        i.tangent &&
          (s.attributes.tangent = new u.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: I })),
        i.bitangent &&
          (s.attributes.bitangent = new u.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: A })),
        l &&
          (s.attributes.extrudeDirection = new u.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            values: v
          }))
    }
    if (o.extrude && t.defined(o.offsetAttribute)) {
      const t = c.length / 3
      let e = new Uint8Array(t)
      if (o.offsetAttribute === p.GeometryOffsetAttribute.TOP) (h && f) || g ? (e = e.fill(1, 0, t / 2)) : h && (e = e.fill(1))
      else {
        const t = o.offsetAttribute === p.GeometryOffsetAttribute.NONE ? 0 : 1
        e = e.fill(t)
      }
      s.attributes.applyOffset = new u.GeometryAttribute({
        componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
        componentsPerAttribute: 1,
        values: e
      })
    }
    return s
  }
  const K = new e.Cartographic(),
    Z = new e.Cartographic(),
    J = { westOverIDL: 0, eastOverIDL: 0 }
  let X = new s.EllipsoidGeodesic()
  function $(e, i, r, a, l) {
    if (((l = t.defaultValue(l, new n.Rectangle())), !t.defined(e) || e.length < 3))
      return (l.west = 0), (l.north = 0), (l.south = 0), (l.east = 0), l
    if (r === o.ArcType.RHUMB) return n.Rectangle.fromCartesianArray(e, i, l)
    X.ellipsoid.equals(i) || (X = new s.EllipsoidGeodesic(void 0, void 0, i)),
      (l.west = Number.POSITIVE_INFINITY),
      (l.east = Number.NEGATIVE_INFINITY),
      (l.south = Number.POSITIVE_INFINITY),
      (l.north = Number.NEGATIVE_INFINITY),
      (J.westOverIDL = Number.POSITIVE_INFINITY),
      (J.eastOverIDL = Number.NEGATIVE_INFINITY)
    const u = 1 / m.CesiumMath.chordLength(a, i.maximumRadius),
      c = e.length
    let p,
      y = i.cartesianToCartographic(e[0], Z),
      d = K
    for (let t = 1; t < c; t++) (p = d), (d = y), (y = i.cartesianToCartographic(e[t], p)), X.setEndPoints(d, y), et(X, u, l, J)
    return (
      (p = d),
      (d = y),
      (y = i.cartesianToCartographic(e[0], p)),
      X.setEndPoints(d, y),
      et(X, u, l, J),
      l.east - l.west > J.eastOverIDL - J.westOverIDL &&
        ((l.west = J.westOverIDL),
        (l.east = J.eastOverIDL),
        l.east > m.CesiumMath.PI && (l.east = l.east - m.CesiumMath.TWO_PI),
        l.west > m.CesiumMath.PI && (l.west = l.west - m.CesiumMath.TWO_PI)),
      l
    )
  }
  const tt = new e.Cartographic()
  function et(t, e, o, i) {
    const r = t.surfaceDistance,
      n = Math.ceil(r * e),
      a = n > 0 ? r / (n - 1) : Number.POSITIVE_INFINITY
    let s = 0
    for (let e = 0; e < n; e++) {
      const e = t.interpolateUsingSurfaceDistance(s, tt)
      s += a
      const r = e.longitude,
        n = e.latitude
      ;(o.west = Math.min(o.west, r)), (o.east = Math.max(o.east, r)), (o.south = Math.min(o.south, n)), (o.north = Math.max(o.north, n))
      const l = r >= 0 ? r : r + m.CesiumMath.TWO_PI
      ;(i.westOverIDL = Math.min(i.westOverIDL, l)), (i.eastOverIDL = Math.max(i.eastOverIDL, l))
    }
  }
  const ot = []
  function it(e, o, i, r, n, a, s, u, p, y) {
    const m = { walls: [] }
    let f
    if (s || u) {
      const n = g.PolygonGeometryLibrary.createGeometryFromPositions(e, o, i, r, a, p, y),
        l = n.attributes.position.values,
        h = n.indices
      let b, _
      if (s && u) {
        const e = l.concat(l)
        ;(b = e.length / 3), (_ = d.IndexDatatype.createTypedArray(b, 2 * h.length)), _.set(h)
        const o = h.length,
          r = b / 2
        for (f = 0; f < o; f += 3) {
          const t = _[f] + r,
            e = _[f + 1] + r,
            i = _[f + 2] + r
          ;(_[f + o] = i), (_[f + 1 + o] = e), (_[f + 2 + o] = t)
        }
        if (((n.attributes.position.values = e), a && p.normal)) {
          const t = n.attributes.normal.values
          ;(n.attributes.normal.values = new Float32Array(e.length)), n.attributes.normal.values.set(t)
        }
        if (p.st && t.defined(i)) {
          const t = n.attributes.st.values
          ;(n.attributes.st.values = new Float32Array(2 * b)), (n.attributes.st.values = t.concat(t))
        }
        n.indices = _
      } else if (u) {
        for (b = l.length / 3, _ = d.IndexDatatype.createTypedArray(b, h.length), f = 0; f < h.length; f += 3)
          (_[f] = h[f + 2]), (_[f + 1] = h[f + 1]), (_[f + 2] = h[f])
        n.indices = _
      }
      m.topAndBottom = new c.GeometryInstance({ geometry: n })
    }
    let b = n.outerRing,
      _ = l.EllipsoidTangentPlane.fromPoints(b, e),
      P = _.projectPointsOntoPlane(b, ot),
      x = h.PolygonPipeline.computeWindingOrder2D(P)
    x === h.WindingOrder.CLOCKWISE && (b = b.slice().reverse())
    let C = g.PolygonGeometryLibrary.computeWallGeometry(b, i, e, r, a, y)
    m.walls.push(new c.GeometryInstance({ geometry: C }))
    const w = n.holes
    for (f = 0; f < w.length; f++) {
      let t = w[f]
      ;(_ = l.EllipsoidTangentPlane.fromPoints(t, e)),
        (P = _.projectPointsOntoPlane(t, ot)),
        (x = h.PolygonPipeline.computeWindingOrder2D(P)),
        x === h.WindingOrder.COUNTER_CLOCKWISE && (t = t.slice().reverse()),
        (C = g.PolygonGeometryLibrary.computeWallGeometry(t, i, e, r, a, y)),
        m.walls.push(new c.GeometryInstance({ geometry: C }))
    }
    return m
  }
  function rt(i) {
    const r = i.polygonHierarchy,
      a = t.defaultValue(i.vertexFormat, f.VertexFormat.DEFAULT),
      s = t.defaultValue(i.ellipsoid, e.Ellipsoid.WGS84),
      l = t.defaultValue(i.granularity, m.CesiumMath.RADIANS_PER_DEGREE),
      u = t.defaultValue(i.stRotation, 0),
      c = i.textureCoordinates,
      p = t.defaultValue(i.perPositionHeight, !1),
      y = p && t.defined(i.extrudedHeight)
    let d = t.defaultValue(i.height, 0),
      h = t.defaultValue(i.extrudedHeight, d)
    if (!y) {
      const t = Math.max(d, h)
      ;(h = Math.min(d, h)), (d = t)
    }
    ;(this._vertexFormat = f.VertexFormat.clone(a)),
      (this._ellipsoid = e.Ellipsoid.clone(s)),
      (this._granularity = l),
      (this._stRotation = u),
      (this._height = d),
      (this._extrudedHeight = h),
      (this._closeTop = t.defaultValue(i.closeTop, !0)),
      (this._closeBottom = t.defaultValue(i.closeBottom, !0)),
      (this._polygonHierarchy = r),
      (this._perPositionHeight = p),
      (this._perPositionHeightExtrude = y),
      (this._shadowVolume = t.defaultValue(i.shadowVolume, !1)),
      (this._workerName = 'createPolygonGeometry'),
      (this._offsetAttribute = i.offsetAttribute),
      (this._arcType = t.defaultValue(i.arcType, o.ArcType.GEODESIC)),
      (this._rectangle = void 0),
      (this._textureCoordinateRotationPoints = void 0),
      (this._textureCoordinates = c),
      (this.packedLength =
        g.PolygonGeometryLibrary.computeHierarchyPackedLength(r, e.Cartesian3) +
        e.Ellipsoid.packedLength +
        f.VertexFormat.packedLength +
        (c ? g.PolygonGeometryLibrary.computeHierarchyPackedLength(c, n.Cartesian2) : 1) +
        12)
  }
  ;(rt.fromPositions = function (e) {
    return new rt({
      polygonHierarchy: { positions: (e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)).positions },
      height: e.height,
      extrudedHeight: e.extrudedHeight,
      vertexFormat: e.vertexFormat,
      stRotation: e.stRotation,
      ellipsoid: e.ellipsoid,
      granularity: e.granularity,
      perPositionHeight: e.perPositionHeight,
      closeTop: e.closeTop,
      closeBottom: e.closeBottom,
      offsetAttribute: e.offsetAttribute,
      arcType: e.arcType,
      textureCoordinates: e.textureCoordinates
    })
  }),
    (rt.pack = function (o, i, r) {
      return (
        (r = t.defaultValue(r, 0)),
        (r = g.PolygonGeometryLibrary.packPolygonHierarchy(o._polygonHierarchy, i, r, e.Cartesian3)),
        e.Ellipsoid.pack(o._ellipsoid, i, r),
        (r += e.Ellipsoid.packedLength),
        f.VertexFormat.pack(o._vertexFormat, i, r),
        (r += f.VertexFormat.packedLength),
        (i[r++] = o._height),
        (i[r++] = o._extrudedHeight),
        (i[r++] = o._granularity),
        (i[r++] = o._stRotation),
        (i[r++] = o._perPositionHeightExtrude ? 1 : 0),
        (i[r++] = o._perPositionHeight ? 1 : 0),
        (i[r++] = o._closeTop ? 1 : 0),
        (i[r++] = o._closeBottom ? 1 : 0),
        (i[r++] = o._shadowVolume ? 1 : 0),
        (i[r++] = t.defaultValue(o._offsetAttribute, -1)),
        (i[r++] = o._arcType),
        t.defined(o._textureCoordinates)
          ? (r = g.PolygonGeometryLibrary.packPolygonHierarchy(o._textureCoordinates, i, r, n.Cartesian2))
          : (i[r++] = -1),
        (i[r++] = o.packedLength),
        i
      )
    })
  const nt = e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
    at = new f.VertexFormat(),
    st = { polygonHierarchy: {} }
  return (
    (rt.unpack = function (o, i, r) {
      i = t.defaultValue(i, 0)
      const a = g.PolygonGeometryLibrary.unpackPolygonHierarchy(o, i, e.Cartesian3)
      ;(i = a.startingIndex), delete a.startingIndex
      const s = e.Ellipsoid.unpack(o, i, nt)
      i += e.Ellipsoid.packedLength
      const l = f.VertexFormat.unpack(o, i, at)
      i += f.VertexFormat.packedLength
      const u = o[i++],
        c = o[i++],
        p = o[i++],
        y = o[i++],
        d = 1 === o[i++],
        m = 1 === o[i++],
        h = 1 === o[i++],
        b = 1 === o[i++],
        _ = 1 === o[i++],
        P = o[i++],
        x = o[i++],
        C = -1 === o[i] ? void 0 : g.PolygonGeometryLibrary.unpackPolygonHierarchy(o, i, n.Cartesian2)
      t.defined(C) ? ((i = C.startingIndex), delete C.startingIndex) : i++
      const w = o[i++]
      return (
        t.defined(r) || (r = new rt(st)),
        (r._polygonHierarchy = a),
        (r._ellipsoid = e.Ellipsoid.clone(s, r._ellipsoid)),
        (r._vertexFormat = f.VertexFormat.clone(l, r._vertexFormat)),
        (r._height = u),
        (r._extrudedHeight = c),
        (r._granularity = p),
        (r._stRotation = y),
        (r._perPositionHeightExtrude = d),
        (r._perPositionHeight = m),
        (r._closeTop = h),
        (r._closeBottom = b),
        (r._shadowVolume = _),
        (r._offsetAttribute = -1 === P ? void 0 : P),
        (r._arcType = x),
        (r._textureCoordinates = C),
        (r.packedLength = w),
        r
      )
    }),
    (rt.computeRectangle = function (i, r) {
      const n = t.defaultValue(i.granularity, m.CesiumMath.RADIANS_PER_DEGREE),
        a = t.defaultValue(i.arcType, o.ArcType.GEODESIC),
        s = i.polygonHierarchy,
        l = t.defaultValue(i.ellipsoid, e.Ellipsoid.WGS84)
      return $(s.positions, l, a, n, r)
    }),
    (rt.createGeometry = function (e) {
      const o = e._vertexFormat,
        i = e._ellipsoid,
        n = e._granularity,
        s = e._stRotation,
        f = e._polygonHierarchy,
        b = e._perPositionHeight,
        _ = e._closeTop,
        P = e._closeBottom,
        x = e._arcType,
        C = e._textureCoordinates,
        w = t.defined(C)
      let T = f.positions
      if (T.length < 3) return
      const I = l.EllipsoidTangentPlane.fromPoints(T, i),
        A = g.PolygonGeometryLibrary.polygonsFromHierarchy(f, w, I.projectPointsOntoPlane.bind(I), !b, i),
        v = A.hierarchy,
        E = A.polygons,
        G = w
          ? g.PolygonGeometryLibrary.polygonsFromHierarchy(
              C,
              !0,
              function (t) {
                return t
              },
              !1
            ).polygons
          : void 0
      if (0 === v.length) return
      T = v[0].outerRing
      const O = g.PolygonGeometryLibrary.computeBoundingRectangle(I.plane.normal, I.projectPointOntoPlane.bind(I), T, s, V),
        L = [],
        H = e._height,
        D = e._extrudedHeight,
        N = {
          perPositionHeight: b,
          vertexFormat: o,
          geometry: void 0,
          tangentPlane: I,
          boundingRectangle: O,
          ellipsoid: i,
          stRotation: s,
          textureCoordinates: void 0,
          bottom: !1,
          top: !0,
          wall: !1,
          extrude: !1,
          arcType: x
        }
      let F
      if (e._perPositionHeightExtrude || !m.CesiumMath.equalsEpsilon(H, D, 0, m.CesiumMath.EPSILON2))
        for (
          N.extrude = !0, N.top = _, N.bottom = P, N.shadowVolume = e._shadowVolume, N.offsetAttribute = e._offsetAttribute, F = 0;
          F < E.length;
          F++
        ) {
          const t = it(i, E[F], w ? G[F] : void 0, n, v[F], b, _, P, o, x)
          let e
          _ && P
            ? ((e = t.topAndBottom), (N.geometry = g.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(e.geometry, H, D, i, b)))
            : _
            ? ((e = t.topAndBottom),
              (e.geometry.attributes.position.values = h.PolygonPipeline.scaleToGeodeticHeight(e.geometry.attributes.position.values, H, i, !b)),
              (N.geometry = e.geometry))
            : P &&
              ((e = t.topAndBottom),
              (e.geometry.attributes.position.values = h.PolygonPipeline.scaleToGeodeticHeight(e.geometry.attributes.position.values, D, i, !0)),
              (N.geometry = e.geometry)),
            (_ || P) && ((N.wall = !1), (e.geometry = q(N)), L.push(e))
          const r = t.walls
          N.wall = !0
          for (let t = 0; t < r.length; t++) {
            const e = r[t]
            ;(N.geometry = g.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(e.geometry, H, D, i, b)), (e.geometry = q(N)), L.push(e)
          }
        }
      else
        for (F = 0; F < E.length; F++) {
          const r = new c.GeometryInstance({ geometry: g.PolygonGeometryLibrary.createGeometryFromPositions(i, E[F], w ? G[F] : void 0, n, b, o, x) })
          if (
            ((r.geometry.attributes.position.values = h.PolygonPipeline.scaleToGeodeticHeight(r.geometry.attributes.position.values, H, i, !b)),
            (N.geometry = r.geometry),
            (r.geometry = q(N)),
            t.defined(e._offsetAttribute))
          ) {
            const t = r.geometry.attributes.position.values.length,
              o = e._offsetAttribute === p.GeometryOffsetAttribute.NONE ? 0 : 1,
              i = new Uint8Array(t / 3).fill(o)
            r.geometry.attributes.applyOffset = new u.GeometryAttribute({
              componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
              componentsPerAttribute: 1,
              values: i
            })
          }
          L.push(r)
        }
      const R = y.GeometryPipeline.combineInstances(L)[0]
      ;(R.attributes.position.values = new Float64Array(R.attributes.position.values)),
        (R.indices = d.IndexDatatype.createTypedArray(R.attributes.position.values.length / 3, R.indices))
      const M = R.attributes,
        S = r.BoundingSphere.fromVertices(M.position.values)
      return (
        o.position || delete M.position,
        new u.Geometry({ attributes: M, indices: R.indices, primitiveType: R.primitiveType, boundingSphere: S, offsetAttribute: e._offsetAttribute })
      )
    }),
    (rt.createShadowVolume = function (t, e, o) {
      const i = t._granularity,
        r = t._ellipsoid,
        n = e(i, r),
        a = o(i, r)
      return new rt({
        polygonHierarchy: t._polygonHierarchy,
        ellipsoid: r,
        stRotation: t._stRotation,
        granularity: i,
        perPositionHeight: !1,
        extrudedHeight: n,
        height: a,
        vertexFormat: f.VertexFormat.POSITION_ONLY,
        shadowVolume: !0,
        arcType: t._arcType
      })
    }),
    Object.defineProperties(rt.prototype, {
      rectangle: {
        get: function () {
          if (!t.defined(this._rectangle)) {
            const t = this._polygonHierarchy.positions
            this._rectangle = $(t, this._ellipsoid, this._arcType, this._granularity)
          }
          return this._rectangle
        }
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return (
            t.defined(this._textureCoordinateRotationPoints) ||
              (this._textureCoordinateRotationPoints = (function (t) {
                const e = -t._stRotation
                if (0 === e) return [0, 0, 0, 1, 1, 0]
                const o = t._ellipsoid,
                  i = t._polygonHierarchy.positions,
                  r = t.rectangle
                return u.Geometry._textureCoordinateRotationPoints(i, e, o, r)
              })(this)),
            this._textureCoordinateRotationPoints
          )
        }
      }
    }),
    function (o, i) {
      return t.defined(i) && (o = rt.unpack(o, i)), (o._ellipsoid = e.Ellipsoid.clone(o._ellipsoid)), rt.createGeometry(o)
    }
  )
})
