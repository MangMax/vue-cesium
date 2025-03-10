define([
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './EllipseGeometry-109eeb71',
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
  './GeometryInstance-0318e0cd',
  './GeometryOffsetAttribute-2579b8d2',
  './GeometryPipeline-fcaf4d4d',
  './AttributeCompression-48e336db',
  './EncodedCartesian3-5e2017ab',
  './IndexDatatype-d3db4e7d',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './VertexFormat-fbdec922'
], function (e, t, r, n, i, o, s, a, l, m, c, p, u, y, d, G, f, b, E, C, x, A) {
  'use strict'
  return function (n, i) {
    return (
      t.defined(i) && (n = r.EllipseGeometry.unpack(n, i)),
      (n._center = e.Cartesian3.clone(n._center)),
      (n._ellipsoid = e.Ellipsoid.clone(n._ellipsoid)),
      r.EllipseGeometry.createGeometry(n)
    )
  }
})
