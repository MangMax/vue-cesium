define([
  './defaultValue-f6d5e6da',
  './Matrix3-81054f0f',
  './EllipsoidOutlineGeometry-87822a0e',
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
], function (i, e, t, n, r, o, s, a, l, u, d, c, m, p) {
  'use strict'
  function y(n) {
    const r = i.defaultValue(n.radius, 1),
      o = { radii: new e.Cartesian3(r, r, r), stackPartitions: n.stackPartitions, slicePartitions: n.slicePartitions, subdivisions: n.subdivisions }
    ;(this._ellipsoidGeometry = new t.EllipsoidOutlineGeometry(o)), (this._workerName = 'createSphereOutlineGeometry')
  }
  ;(y.packedLength = t.EllipsoidOutlineGeometry.packedLength),
    (y.pack = function (i, e, n) {
      return t.EllipsoidOutlineGeometry.pack(i._ellipsoidGeometry, e, n)
    })
  const G = new t.EllipsoidOutlineGeometry(),
    f = { radius: void 0, radii: new e.Cartesian3(), stackPartitions: void 0, slicePartitions: void 0, subdivisions: void 0 }
  return (
    (y.unpack = function (n, r, o) {
      const s = t.EllipsoidOutlineGeometry.unpack(n, r, G)
      return (
        (f.stackPartitions = s._stackPartitions),
        (f.slicePartitions = s._slicePartitions),
        (f.subdivisions = s._subdivisions),
        i.defined(o)
          ? (e.Cartesian3.clone(s._radii, f.radii), (o._ellipsoidGeometry = new t.EllipsoidOutlineGeometry(f)), o)
          : ((f.radius = s._radii.x), new y(f))
      )
    }),
    (y.createGeometry = function (i) {
      return t.EllipsoidOutlineGeometry.createGeometry(i._ellipsoidGeometry)
    }),
    function (e, t) {
      return i.defined(t) && (e = y.unpack(e, t)), y.createGeometry(e)
    }
  )
})
