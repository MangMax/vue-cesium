define([
  './defaultValue-f6d5e6da',
  './FrustumGeometry-56d43066',
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
  './Plane-6add0ae1',
  './VertexFormat-fbdec922'
], function (t, e, r, n, u, m, o, a, i, s, c, y, G, f) {
  'use strict'
  return function (r, n) {
    return t.defined(n) && (r = e.FrustumGeometry.unpack(r, n)), e.FrustumGeometry.createGeometry(r)
  }
})
