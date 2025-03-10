define([
  './CylinderGeometry-0a9d0885',
  './defaultValue-f6d5e6da',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './Math-2ce22ee9',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './CylinderGeometryLibrary-f49f33a8',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './VertexFormat-fbdec922'
], function (e, t, r, n, i, o, a, y, m, u, G, d, f, s, b, c) {
  'use strict'
  return function (r, n) {
    return t.defined(n) && (r = e.CylinderGeometry.unpack(r, n)), e.CylinderGeometry.createGeometry(r)
  }
})
