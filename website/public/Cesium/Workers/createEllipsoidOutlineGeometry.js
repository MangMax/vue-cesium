define([
  './defaultValue-f6d5e6da',
  './EllipsoidOutlineGeometry-87822a0e',
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
  './IndexDatatype-d3db4e7d'
], function (e, t, r, i, n, o, u, a, l, m, s, f, y, d) {
  'use strict'
  return function (r, i) {
    return e.defined(r.buffer) && (r = t.EllipsoidOutlineGeometry.unpack(r, i)), t.EllipsoidOutlineGeometry.createGeometry(r)
  }
})
