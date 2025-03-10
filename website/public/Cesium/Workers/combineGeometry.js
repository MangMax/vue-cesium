define([
  './PrimitivePipeline-d5ba52bd',
  './createTaskProcessorWorker',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './Math-2ce22ee9',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryPipeline-fcaf4d4d',
  './AttributeCompression-48e336db',
  './EncodedCartesian3-5e2017ab',
  './IndexDatatype-d3db4e7d',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './WebMercatorProjection-943e2226'
], function (e, t, i, r, n, o, a, s, m, c, u, P, p, b, l, y, G, d, f, C) {
  'use strict'
  return t(function (t, i) {
    const r = e.PrimitivePipeline.unpackCombineGeometryParameters(t),
      n = e.PrimitivePipeline.combineGeometry(r)
    return e.PrimitivePipeline.packCombineGeometryResults(n, i)
  })
})
