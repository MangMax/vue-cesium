define([
  './defaultValue-f6d5e6da',
  './EllipsoidGeometry-bc8054b2',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './Math-2ce22ee9',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './VertexFormat-fbdec922'
], function (e, t, r, o, i, n, a, m, u, s, l, y, d, f, G) {
  'use strict'
  return function (r, o) {
    return e.defined(o) && (r = t.EllipsoidGeometry.unpack(r, o)), t.EllipsoidGeometry.createGeometry(r)
  }
})
