define([
  './defaultValue-f6d5e6da',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './FrustumGeometry-56d43066',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './Math-2ce22ee9',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93',
  './Plane-6add0ae1',
  './VertexFormat-fbdec922'
], function (e, t, r, n, a, i, u, o, s, c, p, m, h, d) {
  'use strict'
  const f = 0,
    g = 1
  function l(n) {
    const i = n.frustum,
      u = n.orientation,
      o = n.origin,
      s = e.defaultValue(n._drawNearPlane, !0)
    let c, p
    i instanceof a.PerspectiveFrustum
      ? ((c = f), (p = a.PerspectiveFrustum.packedLength))
      : i instanceof a.OrthographicFrustum && ((c = g), (p = a.OrthographicFrustum.packedLength)),
      (this._frustumType = c),
      (this._frustum = i.clone()),
      (this._origin = r.Cartesian3.clone(o)),
      (this._orientation = t.Quaternion.clone(u)),
      (this._drawNearPlane = s),
      (this._workerName = 'createFrustumOutlineGeometry'),
      (this.packedLength = 2 + p + r.Cartesian3.packedLength + t.Quaternion.packedLength)
  }
  l.pack = function (n, i, u) {
    u = e.defaultValue(u, 0)
    const o = n._frustumType,
      s = n._frustum
    return (
      (i[u++] = o),
      o === f
        ? (a.PerspectiveFrustum.pack(s, i, u), (u += a.PerspectiveFrustum.packedLength))
        : (a.OrthographicFrustum.pack(s, i, u), (u += a.OrthographicFrustum.packedLength)),
      r.Cartesian3.pack(n._origin, i, u),
      (u += r.Cartesian3.packedLength),
      t.Quaternion.pack(n._orientation, i, u),
      (i[(u += t.Quaternion.packedLength)] = n._drawNearPlane ? 1 : 0),
      i
    )
  }
  const _ = new a.PerspectiveFrustum(),
    k = new a.OrthographicFrustum(),
    y = new t.Quaternion(),
    F = new r.Cartesian3()
  return (
    (l.unpack = function (n, i, u) {
      i = e.defaultValue(i, 0)
      const o = n[i++]
      let s
      o === f
        ? ((s = a.PerspectiveFrustum.unpack(n, i, _)), (i += a.PerspectiveFrustum.packedLength))
        : ((s = a.OrthographicFrustum.unpack(n, i, k)), (i += a.OrthographicFrustum.packedLength))
      const c = r.Cartesian3.unpack(n, i, F)
      i += r.Cartesian3.packedLength
      const p = t.Quaternion.unpack(n, i, y),
        m = 1 === n[(i += t.Quaternion.packedLength)]
      if (!e.defined(u)) return new l({ frustum: s, origin: c, orientation: p, _drawNearPlane: m })
      const h = o === u._frustumType ? u._frustum : void 0
      return (
        (u._frustum = s.clone(h)),
        (u._frustumType = o),
        (u._origin = r.Cartesian3.clone(c, u._origin)),
        (u._orientation = t.Quaternion.clone(p, u._orientation)),
        (u._drawNearPlane = m),
        u
      )
    }),
    (l.createGeometry = function (e) {
      const r = e._frustumType,
        o = e._frustum,
        s = e._origin,
        c = e._orientation,
        p = e._drawNearPlane,
        m = new Float64Array(24)
      a.FrustumGeometry._computeNearFarPlanes(s, c, r, o, m)
      const h = new u.GeometryAttributes({
        position: new i.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: m })
      })
      let d, f
      const g = p ? 2 : 1,
        l = new Uint16Array(8 * (g + 1))
      let _ = p ? 0 : 1
      for (; _ < 2; ++_)
        (d = p ? 8 * _ : 0),
          (f = 4 * _),
          (l[d] = f),
          (l[d + 1] = f + 1),
          (l[d + 2] = f + 1),
          (l[d + 3] = f + 2),
          (l[d + 4] = f + 2),
          (l[d + 5] = f + 3),
          (l[d + 6] = f + 3),
          (l[d + 7] = f)
      for (_ = 0; _ < 2; ++_)
        (d = 8 * (g + _)),
          (f = 4 * _),
          (l[d] = f),
          (l[d + 1] = f + 4),
          (l[d + 2] = f + 1),
          (l[d + 3] = f + 5),
          (l[d + 4] = f + 2),
          (l[d + 5] = f + 6),
          (l[d + 6] = f + 3),
          (l[d + 7] = f + 7)
      return new i.Geometry({ attributes: h, indices: l, primitiveType: i.PrimitiveType.LINES, boundingSphere: t.BoundingSphere.fromVertices(m) })
    }),
    function (t, r) {
      return e.defined(r) && (t = l.unpack(t, r)), l.createGeometry(t)
    }
  )
})
