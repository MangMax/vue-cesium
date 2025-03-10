define([
  './defaultValue-f6d5e6da',
  './PrimitivePipeline-d5ba52bd',
  './createTaskProcessorWorker',
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
  './GeometryPipeline-fcaf4d4d',
  './AttributeCompression-48e336db',
  './EncodedCartesian3-5e2017ab',
  './IndexDatatype-d3db4e7d',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './WebMercatorProjection-943e2226'
], function (e, t, r, n, o, i, s, a, u, c, f, m, l, d, p, b, y, P, k, C) {
  'use strict'
  const G = {}
  function W(t) {
    let r = G[t]
    return (
      e.defined(r) ||
        ('object' == typeof exports
          ? (G[r] = r = require(`Workers/${t}`))
          : require([`Workers/${t}`], function (e) {
              ;(r = e), (G[r] = e)
            })),
      r
    )
  }
  return r(function (r, n) {
    const o = r.subTasks,
      i = o.length,
      s = new Array(i)
    for (let t = 0; t < i; t++) {
      const r = o[t],
        n = r.geometry,
        i = r.moduleName
      if (e.defined(i)) {
        const e = W(i)
        s[t] = e(n, r.offset)
      } else s[t] = n
    }
    return Promise.all(s).then(function (e) {
      return t.PrimitivePipeline.packCreateGeometryResults(e, n)
    })
  })
})
