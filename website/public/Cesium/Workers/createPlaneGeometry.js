define([
  './defaultValue-f6d5e6da',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './VertexFormat-fbdec922',
  './Math-2ce22ee9',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93'
], function (t, e, n, r, a, o, i, m, u, p, c, s) {
  'use strict'
  function y(e) {
    e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)
    const n = t.defaultValue(e.vertexFormat, i.VertexFormat.DEFAULT)
    ;(this._vertexFormat = n), (this._workerName = 'createPlaneGeometry')
  }
  ;(y.packedLength = i.VertexFormat.packedLength),
    (y.pack = function (e, n, r) {
      return (r = t.defaultValue(r, 0)), i.VertexFormat.pack(e._vertexFormat, n, r), n
    })
  const l = new i.VertexFormat(),
    A = { vertexFormat: l }
  y.unpack = function (e, n, r) {
    n = t.defaultValue(n, 0)
    const a = i.VertexFormat.unpack(e, n, l)
    return t.defined(r) ? ((r._vertexFormat = i.VertexFormat.clone(a, r._vertexFormat)), r) : new y(A)
  }
  const F = new n.Cartesian3(-0.5, -0.5, 0),
    f = new n.Cartesian3(0.5, 0.5, 0)
  return (
    (y.createGeometry = function (t) {
      const i = t._vertexFormat,
        m = new o.GeometryAttributes()
      let u, p
      if (i.position) {
        if (
          ((p = new Float64Array(12)),
          (p[0] = F.x),
          (p[1] = F.y),
          (p[2] = 0),
          (p[3] = f.x),
          (p[4] = F.y),
          (p[5] = 0),
          (p[6] = f.x),
          (p[7] = f.y),
          (p[8] = 0),
          (p[9] = F.x),
          (p[10] = f.y),
          (p[11] = 0),
          (m.position = new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: p })),
          i.normal)
        ) {
          const t = new Float32Array(12)
          ;(t[0] = 0),
            (t[1] = 0),
            (t[2] = 1),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = 1),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 1),
            (t[9] = 0),
            (t[10] = 0),
            (t[11] = 1),
            (m.normal = new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: t }))
        }
        if (i.st) {
          const t = new Float32Array(8)
          ;(t[0] = 0),
            (t[1] = 0),
            (t[2] = 1),
            (t[3] = 0),
            (t[4] = 1),
            (t[5] = 1),
            (t[6] = 0),
            (t[7] = 1),
            (m.st = new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: t }))
        }
        if (i.tangent) {
          const t = new Float32Array(12)
          ;(t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 1),
            (t[4] = 0),
            (t[5] = 0),
            (t[6] = 1),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 1),
            (t[10] = 0),
            (t[11] = 0),
            (m.tangent = new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: t }))
        }
        if (i.bitangent) {
          const t = new Float32Array(12)
          ;(t[0] = 0),
            (t[1] = 1),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 1),
            (t[5] = 0),
            (t[6] = 0),
            (t[7] = 1),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 1),
            (t[11] = 0),
            (m.bitangent = new a.GeometryAttribute({ componentDatatype: r.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: t }))
        }
        ;(u = new Uint16Array(6)), (u[0] = 0), (u[1] = 1), (u[2] = 2), (u[3] = 0), (u[4] = 2), (u[5] = 3)
      }
      return new a.Geometry({
        attributes: m,
        indices: u,
        primitiveType: a.PrimitiveType.TRIANGLES,
        boundingSphere: new e.BoundingSphere(n.Cartesian3.ZERO, Math.sqrt(2))
      })
    }),
    function (e, n) {
      return t.defined(n) && (e = y.unpack(e, n)), y.createGeometry(e)
    }
  )
})
