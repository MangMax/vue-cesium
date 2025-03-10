define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './EllipsoidGeometry-bc8054b2',
  './VertexFormat-fbdec922',
  './Math-2ce22ee9',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d'
], function (e, t, i, r, o, a, n, s, l, c, m, d, u, p, y) {
  'use strict'
  function G(r) {
    const o = e.defaultValue(r.radius, 1),
      a = { radii: new t.Cartesian3(o, o, o), stackPartitions: r.stackPartitions, slicePartitions: r.slicePartitions, vertexFormat: r.vertexFormat }
    ;(this._ellipsoidGeometry = new i.EllipsoidGeometry(a)), (this._workerName = 'createSphereGeometry')
  }
  ;(G.packedLength = i.EllipsoidGeometry.packedLength),
    (G.pack = function (e, t, r) {
      return i.EllipsoidGeometry.pack(e._ellipsoidGeometry, t, r)
    })
  const f = new i.EllipsoidGeometry(),
    k = { radius: void 0, radii: new t.Cartesian3(), vertexFormat: new r.VertexFormat(), stackPartitions: void 0, slicePartitions: void 0 }
  return (
    (G.unpack = function (o, a, n) {
      const s = i.EllipsoidGeometry.unpack(o, a, f)
      return (
        (k.vertexFormat = r.VertexFormat.clone(s._vertexFormat, k.vertexFormat)),
        (k.stackPartitions = s._stackPartitions),
        (k.slicePartitions = s._slicePartitions),
        e.defined(n)
          ? (t.Cartesian3.clone(s._radii, k.radii), (n._ellipsoidGeometry = new i.EllipsoidGeometry(k)), n)
          : ((k.radius = s._radii.x), new G(k))
      )
    }),
    (G.createGeometry = function (e) {
      return i.EllipsoidGeometry.createGeometry(e._ellipsoidGeometry)
    }),
    function (t, i) {
      return e.defined(i) && (t = G.unpack(t, i)), G.createGeometry(t)
    }
  )
})
