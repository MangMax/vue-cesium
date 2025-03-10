define([
  './arrayRemoveDuplicates-9b636830',
  './BoundingRectangle-1d581417',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './CoplanarPolygonGeometryLibrary-281d77bd',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryInstance-0318e0cd',
  './GeometryPipeline-fcaf4d4d',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolygonGeometryLibrary-d7e504f0',
  './PolygonPipeline-621b1cb0',
  './VertexFormat-fbdec922',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './WebGLConstants-7f557f93',
  './OrientedBoundingBox-fc7f7ca4',
  './EllipsoidTangentPlane-d430e7d5',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './AttributeCompression-48e336db',
  './EncodedCartesian3-5e2017ab',
  './ArcType-26a3f38d',
  './EllipsoidRhumbLine-77eff028'
], function (e, t, n, o, r, a, i, s, l, y, c, p, u, m, d, g, h, x, C, b, f, P, A, w, L, G, F, v, E) {
  'use strict'
  const _ = new r.Cartesian3(),
    T = new t.BoundingRectangle(),
    k = new o.Cartesian2(),
    D = new o.Cartesian2(),
    V = new r.Cartesian3(),
    R = new r.Cartesian3(),
    H = new r.Cartesian3(),
    I = new r.Cartesian3(),
    M = new r.Cartesian3(),
    B = new r.Cartesian3(),
    O = new n.Quaternion(),
    z = new r.Matrix3(),
    S = new r.Matrix3(),
    N = new r.Cartesian3()
  function Q(e, t, i, c, p, d, h, x, C) {
    const b = e.positions
    let f = g.PolygonPipeline.triangulate(e.positions2D, e.holes)
    f.length < 3 && (f = [0, 1, 2])
    const P = u.IndexDatatype.createTypedArray(b.length, f.length)
    P.set(f)
    let A = z
    if (0 !== c) {
      let e = n.Quaternion.fromAxisAngle(h, c, O)
      if (((A = r.Matrix3.fromQuaternion(e, A)), t.tangent || t.bitangent)) {
        e = n.Quaternion.fromAxisAngle(h, -c, O)
        const o = r.Matrix3.fromQuaternion(e, S)
        ;(x = r.Cartesian3.normalize(r.Matrix3.multiplyByVector(o, x, x), x)),
          t.bitangent && (C = r.Cartesian3.normalize(r.Cartesian3.cross(h, x, C), C))
      }
    } else A = r.Matrix3.clone(r.Matrix3.IDENTITY, A)
    const w = D
    t.st && ((w.x = i.x), (w.y = i.y))
    const L = b.length,
      G = 3 * L,
      F = new Float64Array(G),
      v = t.normal ? new Float32Array(G) : void 0,
      E = t.tangent ? new Float32Array(G) : void 0,
      T = t.bitangent ? new Float32Array(G) : void 0,
      V = t.st ? new Float32Array(2 * L) : void 0
    let R = 0,
      H = 0,
      I = 0,
      M = 0,
      B = 0
    for (let e = 0; e < L; e++) {
      const n = b[e]
      if (((F[R++] = n.x), (F[R++] = n.y), (F[R++] = n.z), t.st))
        if (s.defined(p) && p.positions.length === L) (V[B++] = p.positions[e].x), (V[B++] = p.positions[e].y)
        else {
          const e = d(r.Matrix3.multiplyByVector(A, n, _), k)
          o.Cartesian2.subtract(e, w, e)
          const t = m.CesiumMath.clamp(e.x / i.width, 0, 1),
            a = m.CesiumMath.clamp(e.y / i.height, 0, 1)
          ;(V[B++] = t), (V[B++] = a)
        }
      t.normal && ((v[H++] = h.x), (v[H++] = h.y), (v[H++] = h.z)),
        t.tangent && ((E[M++] = x.x), (E[M++] = x.y), (E[M++] = x.z)),
        t.bitangent && ((T[I++] = C.x), (T[I++] = C.y), (T[I++] = C.z))
    }
    const N = new y.GeometryAttributes()
    return (
      t.position && (N.position = new l.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: F })),
      t.normal && (N.normal = new l.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: v })),
      t.tangent && (N.tangent = new l.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: E })),
      t.bitangent && (N.bitangent = new l.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: T })),
      t.st && (N.st = new l.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: V })),
      new l.Geometry({ attributes: N, indices: P, primitiveType: l.PrimitiveType.TRIANGLES })
    )
  }
  function j(e) {
    const t = (e = s.defaultValue(e, s.defaultValue.EMPTY_OBJECT)).polygonHierarchy,
      n = e.textureCoordinates,
      a = s.defaultValue(e.vertexFormat, h.VertexFormat.DEFAULT)
    ;(this._vertexFormat = h.VertexFormat.clone(a)),
      (this._polygonHierarchy = t),
      (this._stRotation = s.defaultValue(e.stRotation, 0)),
      (this._ellipsoid = r.Ellipsoid.clone(s.defaultValue(e.ellipsoid, r.Ellipsoid.WGS84))),
      (this._workerName = 'createCoplanarPolygonGeometry'),
      (this._textureCoordinates = n),
      (this.packedLength =
        d.PolygonGeometryLibrary.computeHierarchyPackedLength(t, r.Cartesian3) +
        h.VertexFormat.packedLength +
        r.Ellipsoid.packedLength +
        (s.defined(n) ? d.PolygonGeometryLibrary.computeHierarchyPackedLength(n, o.Cartesian2) : 1) +
        2)
  }
  ;(j.fromPositions = function (e) {
    return new j({
      polygonHierarchy: { positions: (e = s.defaultValue(e, s.defaultValue.EMPTY_OBJECT)).positions },
      vertexFormat: e.vertexFormat,
      stRotation: e.stRotation,
      ellipsoid: e.ellipsoid,
      textureCoordinates: e.textureCoordinates
    })
  }),
    (j.pack = function (e, t, n) {
      return (
        (n = s.defaultValue(n, 0)),
        (n = d.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy, t, n, r.Cartesian3)),
        r.Ellipsoid.pack(e._ellipsoid, t, n),
        (n += r.Ellipsoid.packedLength),
        h.VertexFormat.pack(e._vertexFormat, t, n),
        (n += h.VertexFormat.packedLength),
        (t[n++] = e._stRotation),
        s.defined(e._textureCoordinates)
          ? (n = d.PolygonGeometryLibrary.packPolygonHierarchy(e._textureCoordinates, t, n, o.Cartesian2))
          : (t[n++] = -1),
        (t[n++] = e.packedLength),
        t
      )
    })
  const U = r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),
    Y = new h.VertexFormat(),
    q = { polygonHierarchy: {} }
  return (
    (j.unpack = function (e, t, n) {
      t = s.defaultValue(t, 0)
      const a = d.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t, r.Cartesian3)
      ;(t = a.startingIndex), delete a.startingIndex
      const i = r.Ellipsoid.unpack(e, t, U)
      t += r.Ellipsoid.packedLength
      const l = h.VertexFormat.unpack(e, t, Y)
      t += h.VertexFormat.packedLength
      const y = e[t++],
        c = -1 === e[t] ? void 0 : d.PolygonGeometryLibrary.unpackPolygonHierarchy(e, t, o.Cartesian2)
      s.defined(c) ? ((t = c.startingIndex), delete c.startingIndex) : t++
      const p = e[t++]
      return (
        s.defined(n) || (n = new j(q)),
        (n._polygonHierarchy = a),
        (n._ellipsoid = r.Ellipsoid.clone(i, n._ellipsoid)),
        (n._vertexFormat = h.VertexFormat.clone(l, n._vertexFormat)),
        (n._stRotation = y),
        (n._textureCoordinates = c),
        (n.packedLength = p),
        n
      )
    }),
    (j.createGeometry = function (t) {
      const o = t._vertexFormat,
        a = t._polygonHierarchy,
        y = t._stRotation,
        g = t._textureCoordinates,
        h = s.defined(g)
      let x = a.positions
      if (((x = e.arrayRemoveDuplicates(x, r.Cartesian3.equalsEpsilon, !0)), x.length < 3)) return
      let C = V,
        b = R,
        f = H,
        P = M
      const A = B
      if (!i.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(x, I, P, A)) return
      if (
        ((C = r.Cartesian3.cross(P, A, C)),
        (C = r.Cartesian3.normalize(C, C)),
        !r.Cartesian3.equalsEpsilon(I, r.Cartesian3.ZERO, m.CesiumMath.EPSILON6))
      ) {
        const e = t._ellipsoid.geodeticSurfaceNormal(I, N)
        r.Cartesian3.dot(C, e) < 0 && ((C = r.Cartesian3.negate(C, C)), (P = r.Cartesian3.negate(P, P)))
      }
      const w = i.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(I, P, A),
        L = i.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(I, P, A)
      o.tangent && (b = r.Cartesian3.clone(P, b)), o.bitangent && (f = r.Cartesian3.clone(A, f))
      const G = d.PolygonGeometryLibrary.polygonsFromHierarchy(a, h, w, !1),
        F = G.hierarchy,
        v = G.polygons,
        E = h
          ? d.PolygonGeometryLibrary.polygonsFromHierarchy(
              g,
              !0,
              function (e) {
                return e
              },
              !1
            ).polygons
          : void 0
      if (0 === F.length) return
      x = F[0].outerRing
      const _ = n.BoundingSphere.fromPoints(x),
        k = d.PolygonGeometryLibrary.computeBoundingRectangle(C, L, x, y, T),
        D = []
      for (let e = 0; e < v.length; e++) {
        const t = new c.GeometryInstance({ geometry: Q(v[e], o, k, y, h ? E[e] : void 0, L, C, b, f) })
        D.push(t)
      }
      const O = p.GeometryPipeline.combineInstances(D)[0]
      ;(O.attributes.position.values = new Float64Array(O.attributes.position.values)),
        (O.indices = u.IndexDatatype.createTypedArray(O.attributes.position.values.length / 3, O.indices))
      const z = O.attributes
      return o.position || delete z.position, new l.Geometry({ attributes: z, indices: O.indices, primitiveType: O.primitiveType, boundingSphere: _ })
    }),
    function (e, t) {
      return s.defined(t) && (e = j.unpack(e, t)), j.createGeometry(e)
    }
  )
})
