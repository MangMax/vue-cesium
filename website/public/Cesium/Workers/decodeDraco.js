define([
  './ComponentDatatype-ab629b88',
  './defaultValue-f6d5e6da',
  './IndexDatatype-d3db4e7d',
  './RuntimeError-9b4ce3fb',
  './createTaskProcessorWorker',
  './WebGLConstants-7f557f93',
  './Math-2ce22ee9'
], function (t, e, r, n, o, a, i) {
  'use strict'
  let s
  function u(t, e) {
    const n = t.num_points(),
      o = t.num_faces(),
      a = new s.DracoInt32Array(),
      i = 3 * o,
      u = r.IndexDatatype.createTypedArray(n, i)
    let c = 0
    for (let r = 0; r < o; ++r)
      e.GetFaceFromMesh(t, r, a), (u[c + 0] = a.GetValue(0)), (u[c + 1] = a.GetValue(1)), (u[c + 2] = a.GetValue(2)), (c += 3)
    return s.destroy(a), { typedArray: u, numberOfIndices: i }
  }
  function c(r, n, o) {
    const a = r.num_points(),
      i = o.num_components()
    let u,
      c = new s.AttributeQuantizationTransform()
    if (c.InitFromAttribute(o)) {
      const t = new Array(i)
      for (let e = 0; e < i; ++e) t[e] = c.min_value(e)
      u = { quantizationBits: c.quantization_bits(), minValues: t, range: c.range(), octEncoded: !1 }
    }
    s.destroy(c),
      (c = new s.AttributeOctahedronTransform()),
      c.InitFromAttribute(o) && (u = { quantizationBits: c.quantization_bits(), octEncoded: !0 }),
      s.destroy(c)
    const d = a * i
    let y
    y = e.defined(u)
      ? (function (t, e, r, n, o) {
          let a, i
          n.quantizationBits <= 8
            ? ((i = new s.DracoUInt8Array()), (a = new Uint8Array(o)), e.GetAttributeUInt8ForAllPoints(t, r, i))
            : n.quantizationBits <= 16
            ? ((i = new s.DracoUInt16Array()), (a = new Uint16Array(o)), e.GetAttributeUInt16ForAllPoints(t, r, i))
            : ((i = new s.DracoFloat32Array()), (a = new Float32Array(o)), e.GetAttributeFloatForAllPoints(t, r, i))
          for (let t = 0; t < o; ++t) a[t] = i.GetValue(t)
          return s.destroy(i), a
        })(r, n, o, u, d)
      : (function (t, e, r, n) {
          let o, a
          switch (r.data_type()) {
            case 1:
            case 11:
              ;(a = new s.DracoInt8Array()), (o = new Int8Array(n)), e.GetAttributeInt8ForAllPoints(t, r, a)
              break
            case 2:
              ;(a = new s.DracoUInt8Array()), (o = new Uint8Array(n)), e.GetAttributeUInt8ForAllPoints(t, r, a)
              break
            case 3:
              ;(a = new s.DracoInt16Array()), (o = new Int16Array(n)), e.GetAttributeInt16ForAllPoints(t, r, a)
              break
            case 4:
              ;(a = new s.DracoUInt16Array()), (o = new Uint16Array(n)), e.GetAttributeUInt16ForAllPoints(t, r, a)
              break
            case 5:
            case 7:
              ;(a = new s.DracoInt32Array()), (o = new Int32Array(n)), e.GetAttributeInt32ForAllPoints(t, r, a)
              break
            case 6:
            case 8:
              ;(a = new s.DracoUInt32Array()), (o = new Uint32Array(n)), e.GetAttributeUInt32ForAllPoints(t, r, a)
              break
            case 9:
            case 10:
              ;(a = new s.DracoFloat32Array()), (o = new Float32Array(n)), e.GetAttributeFloatForAllPoints(t, r, a)
          }
          for (let t = 0; t < n; ++t) o[t] = a.GetValue(t)
          return s.destroy(a), o
        })(r, n, o, d)
    const f = t.ComponentDatatype.fromTypedArray(y)
    return {
      array: y,
      data: {
        componentsPerAttribute: i,
        componentDatatype: f,
        byteOffset: o.byte_offset(),
        byteStride: t.ComponentDatatype.getSizeInBytes(f) * i,
        normalized: o.normalized(),
        quantization: u
      }
    }
  }
  function d(t) {
    return e.defined(t.bufferView)
      ? (function (t) {
          const e = new s.Decoder(),
            r = ['POSITION', 'NORMAL', 'COLOR', 'TEX_COORD']
          if (t.dequantizeInShader) for (let t = 0; t < r.length; ++t) e.SkipAttributeTransform(s[r[t]])
          const o = t.bufferView,
            a = new s.DecoderBuffer()
          if ((a.Init(t.array, o.byteLength), e.GetEncodedGeometryType(a) !== s.TRIANGULAR_MESH))
            throw new n.RuntimeError('Unsupported draco mesh geometry type.')
          const i = new s.Mesh(),
            d = e.DecodeBufferToMesh(a, i)
          if (!d.ok() || 0 === i.ptr) throw new n.RuntimeError(`Error decoding draco mesh geometry: ${d.error_msg()}`)
          s.destroy(a)
          const y = {},
            f = t.compressedAttributes
          for (const t in f)
            if (f.hasOwnProperty(t)) {
              const r = f[t],
                n = e.GetAttributeByUniqueId(i, r)
              y[t] = c(i, e, n)
            }
          const A = { indexArray: u(i, e), attributeData: y }
          return s.destroy(i), s.destroy(e), A
        })(t)
      : (function (t) {
          const e = new s.Decoder()
          t.dequantizeInShader && (e.SkipAttributeTransform(s.POSITION), e.SkipAttributeTransform(s.NORMAL))
          const r = new s.DecoderBuffer()
          if ((r.Init(t.buffer, t.buffer.length), e.GetEncodedGeometryType(r) !== s.POINT_CLOUD))
            throw new n.RuntimeError('Draco geometry type must be POINT_CLOUD.')
          const o = new s.PointCloud(),
            a = e.DecodeBufferToPointCloud(r, o)
          if (!a.ok() || 0 === o.ptr) throw new n.RuntimeError(`Error decoding draco point cloud: ${a.error_msg()}`)
          s.destroy(r)
          const i = {},
            u = t.properties
          for (const t in u)
            if (u.hasOwnProperty(t)) {
              let r
              if ('POSITION' === t || 'NORMAL' === t) {
                const n = e.GetAttributeId(o, s[t])
                r = e.GetAttribute(o, n)
              } else {
                const n = u[t]
                r = e.GetAttributeByUniqueId(o, n)
              }
              i[t] = c(o, e, r)
            }
          return s.destroy(o), s.destroy(e), i
        })(t)
  }
  function y(t) {
    ;(s = t), (self.onmessage = o(d)), self.postMessage(!0)
  }
  return function (t) {
    const r = t.data.webAssemblyConfig
    if (e.defined(r))
      return require([r.modulePath], function (t) {
        e.defined(r.wasmBinaryFile)
          ? (e.defined(t) || (t = self.DracoDecoderModule),
            t(r).then(function (t) {
              y(t)
            }))
          : y(t())
      })
  }
})
