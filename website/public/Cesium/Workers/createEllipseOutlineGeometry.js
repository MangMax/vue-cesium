define([
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './EllipseOutlineGeometry-9a63dd89',
  './Math-2ce22ee9',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './EllipseGeometryLibrary-46203226',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d'
], function (e, t, r, i, n, l, o, a, s, u, m, c, p, y, G) {
  'use strict'
  return function (i, n) {
    return (
      t.defined(n) && (i = r.EllipseOutlineGeometry.unpack(i, n)),
      (i._center = e.Cartesian3.clone(i._center)),
      (i._ellipsoid = e.Ellipsoid.clone(i._ellipsoid)),
      r.EllipseOutlineGeometry.createGeometry(i)
    )
  }
})
