define([
  './Transforms-20461479',
  './BoxGeometry-7873f350',
  './Matrix3-81054f0f',
  './Color-498d4f06',
  './CylinderGeometry-0a9d0885',
  './defaultValue-f6d5e6da',
  './EllipsoidGeometry-bc8054b2',
  './IndexDatatype-d3db4e7d',
  './Matrix2-413c4048',
  './createTaskProcessorWorker',
  './Math-2ce22ee9',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './VertexFormat-fbdec922',
  './CylinderGeometryLibrary-f49f33a8'
], function (e, t, n, r, i, a, o, s, d, c, l, f, u, h, p, b, y, x, g, m) {
  'use strict'
  function C(e) {
    ;(this.offset = e.offset), (this.count = e.count), (this.color = e.color), (this.batchIds = e.batchIds)
  }
  const I = new n.Cartesian3(),
    k = d.Matrix4.packedLength + n.Cartesian3.packedLength,
    M = d.Matrix4.packedLength + 2,
    B = d.Matrix4.packedLength + n.Cartesian3.packedLength,
    w = n.Cartesian3.packedLength + 1,
    A = { modelMatrix: new d.Matrix4(), boundingVolume: new e.BoundingSphere() }
  function O(e, t) {
    let r = t * k
    const i = n.Cartesian3.unpack(e, r, I)
    r += n.Cartesian3.packedLength
    const a = d.Matrix4.unpack(e, r, A.modelMatrix)
    d.Matrix4.multiplyByScale(a, i, a)
    const o = A.boundingVolume
    return n.Cartesian3.clone(n.Cartesian3.ZERO, o.center), (o.radius = Math.sqrt(3)), A
  }
  function L(e, t) {
    let r = t * M
    const i = e[r++],
      a = e[r++],
      o = n.Cartesian3.fromElements(i, i, a, I),
      s = d.Matrix4.unpack(e, r, A.modelMatrix)
    d.Matrix4.multiplyByScale(s, o, s)
    const c = A.boundingVolume
    return n.Cartesian3.clone(n.Cartesian3.ZERO, c.center), (c.radius = Math.sqrt(2)), A
  }
  function v(e, t) {
    let r = t * B
    const i = n.Cartesian3.unpack(e, r, I)
    r += n.Cartesian3.packedLength
    const a = d.Matrix4.unpack(e, r, A.modelMatrix)
    d.Matrix4.multiplyByScale(a, i, a)
    const o = A.boundingVolume
    return n.Cartesian3.clone(n.Cartesian3.ZERO, o.center), (o.radius = 1), A
  }
  function E(e, t) {
    let r = t * w
    const i = e[r++],
      a = n.Cartesian3.unpack(e, r, I),
      o = d.Matrix4.fromTranslation(a, A.modelMatrix)
    d.Matrix4.multiplyByUniformScale(o, i, o)
    const s = A.boundingVolume
    return n.Cartesian3.clone(n.Cartesian3.ZERO, s.center), (s.radius = 1), A
  }
  const U = new n.Cartesian3()
  function G(t, i, o, s, c) {
    if (!a.defined(i)) return
    const l = o.length,
      f = s.attributes.position.values,
      u = s.indices,
      h = t.positions,
      p = t.vertexBatchIds,
      b = t.indices,
      y = t.batchIds,
      x = t.batchTableColors,
      g = t.batchedIndices,
      m = t.indexOffsets,
      I = t.indexCounts,
      k = t.boundingVolumes,
      M = t.modelMatrix,
      B = t.center
    let w = t.positionOffset,
      A = t.batchIdIndex,
      O = t.indexOffset
    const L = t.batchedIndicesOffset
    for (let t = 0; t < l; ++t) {
      const a = c(i, t),
        s = a.modelMatrix
      d.Matrix4.multiply(M, s, s)
      const l = o[t],
        v = f.length
      for (let e = 0; e < v; e += 3) {
        const t = n.Cartesian3.unpack(f, e, U)
        d.Matrix4.multiplyByPoint(s, t, t), n.Cartesian3.subtract(t, B, t), n.Cartesian3.pack(t, h, 3 * w + e), (p[A++] = l)
      }
      const E = u.length
      for (let e = 0; e < E; ++e) b[O + e] = u[e] + w
      const G = t + L
      ;(g[G] = new C({ offset: O, count: E, color: r.Color.fromRgba(x[l]), batchIds: [l] })),
        (y[G] = l),
        (m[G] = O),
        (I[G] = E),
        (k[G] = e.BoundingSphere.transform(a.boundingVolume, s)),
        (w += v / 3),
        (O += E)
    }
    ;(t.positionOffset = w), (t.batchIdIndex = A), (t.indexOffset = O), (t.batchedIndicesOffset += l)
  }
  const S = new n.Cartesian3(),
    V = new d.Matrix4()
  function F(t, n, i) {
    const a = i.length,
      o =
        2 +
        a * e.BoundingSphere.packedLength +
        1 +
        (function (e) {
          const t = e.length
          let n = 0
          for (let i = 0; i < t; ++i) n += r.Color.packedLength + 3 + e[i].batchIds.length
          return n
        })(n),
      s = new Float64Array(o)
    let d = 0
    ;(s[d++] = t), (s[d++] = a)
    for (let t = 0; t < a; ++t) e.BoundingSphere.pack(i[t], s, d), (d += e.BoundingSphere.packedLength)
    const c = n.length
    s[d++] = c
    for (let e = 0; e < c; ++e) {
      const t = n[e]
      r.Color.pack(t.color, s, d), (d += r.Color.packedLength), (s[d++] = t.offset), (s[d++] = t.count)
      const i = t.batchIds,
        a = i.length
      s[d++] = a
      for (let e = 0; e < a; ++e) s[d++] = i[e]
    }
    return s
  }
  return c(function (e, r) {
    const c = a.defined(e.boxes) ? new Float32Array(e.boxes) : void 0,
      l = a.defined(e.boxBatchIds) ? new Uint16Array(e.boxBatchIds) : void 0,
      f = a.defined(e.cylinders) ? new Float32Array(e.cylinders) : void 0,
      u = a.defined(e.cylinderBatchIds) ? new Uint16Array(e.cylinderBatchIds) : void 0,
      h = a.defined(e.ellipsoids) ? new Float32Array(e.ellipsoids) : void 0,
      p = a.defined(e.ellipsoidBatchIds) ? new Uint16Array(e.ellipsoidBatchIds) : void 0,
      b = a.defined(e.spheres) ? new Float32Array(e.spheres) : void 0,
      y = a.defined(e.sphereBatchIds) ? new Uint16Array(e.sphereBatchIds) : void 0,
      x = a.defined(c) ? l.length : 0,
      g = a.defined(f) ? u.length : 0,
      m = a.defined(h) ? p.length : 0,
      C = a.defined(b) ? y.length : 0,
      I = t.BoxGeometry.getUnitBox(),
      k = i.CylinderGeometry.getUnitCylinder(),
      M = o.EllipsoidGeometry.getUnitEllipsoid(),
      B = I.attributes.position.values,
      w = k.attributes.position.values,
      A = M.attributes.position.values
    let U = B.length * x
    ;(U += w.length * g), (U += A.length * (m + C))
    const T = I.indices,
      R = k.indices,
      Z = M.indices
    let D = T.length * x
    ;(D += R.length * g), (D += Z.length * (m + C))
    const P = new Float32Array(U),
      q = new Uint16Array(U / 3),
      W = s.IndexDatatype.createTypedArray(U / 3, D),
      _ = x + g + m + C,
      H = new Uint16Array(_),
      K = new Array(_),
      N = new Uint32Array(_),
      Y = new Uint32Array(_),
      j = new Array(_)
    !(function (e) {
      const t = new Float64Array(e)
      let r = 0
      n.Cartesian3.unpack(t, r, S), (r += n.Cartesian3.packedLength), d.Matrix4.unpack(t, r, V)
    })(e.packedBuffer)
    const z = {
      batchTableColors: new Uint32Array(e.batchTableColors),
      positions: P,
      vertexBatchIds: q,
      indices: W,
      batchIds: H,
      batchedIndices: K,
      indexOffsets: N,
      indexCounts: Y,
      boundingVolumes: j,
      positionOffset: 0,
      batchIdIndex: 0,
      indexOffset: 0,
      batchedIndicesOffset: 0,
      modelMatrix: V,
      center: S
    }
    G(z, c, l, I, O), G(z, f, u, k, L), G(z, h, p, M, v), G(z, b, y, M, E)
    const J = F(W.BYTES_PER_ELEMENT, K, j)
    return (
      r.push(P.buffer, q.buffer, W.buffer),
      r.push(H.buffer, N.buffer, Y.buffer),
      r.push(J.buffer),
      {
        positions: P.buffer,
        vertexBatchIds: q.buffer,
        indices: W.buffer,
        indexOffsets: N.buffer,
        indexCounts: Y.buffer,
        batchIds: H.buffer,
        packedBuffer: J.buffer
      }
    )
  })
})
