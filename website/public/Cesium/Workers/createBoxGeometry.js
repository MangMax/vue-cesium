define([
  './BoxGeometry-7873f350',
  './defaultValue-f6d5e6da',
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
  './VertexFormat-fbdec922'
], function (e, t, r, o, n, a, m, i, u, f, s, y, G, c) {
  'use strict'
  return function (r, o) {
    return t.defined(o) && (r = e.BoxGeometry.unpack(r, o)), e.BoxGeometry.createGeometry(r)
  }
})
