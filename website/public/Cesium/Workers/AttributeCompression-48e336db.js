define([
  'exports',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './defaultValue-f6d5e6da',
  './Math-2ce22ee9'
], function (t, e, n, o, a, r) {
  'use strict'
  const c = {
    SCALAR: 'SCALAR',
    VEC2: 'VEC2',
    VEC3: 'VEC3',
    VEC4: 'VEC4',
    MAT2: 'MAT2',
    MAT3: 'MAT3',
    MAT4: 'MAT4',
    getMathType: function (t) {
      switch (t) {
        case c.SCALAR:
          return Number
        case c.VEC2:
          return e.Cartesian2
        case c.VEC3:
          return n.Cartesian3
        case c.VEC4:
          return e.Cartesian4
        case c.MAT2:
          return e.Matrix2
        case c.MAT3:
          return n.Matrix3
        case c.MAT4:
          return e.Matrix4
      }
    },
    getNumberOfComponents: function (t) {
      switch (t) {
        case c.SCALAR:
          return 1
        case c.VEC2:
          return 2
        case c.VEC3:
          return 3
        case c.VEC4:
        case c.MAT2:
          return 4
        case c.MAT3:
          return 9
        case c.MAT4:
          return 16
      }
    },
    getAttributeLocationCount: function (t) {
      switch (t) {
        case c.SCALAR:
        case c.VEC2:
        case c.VEC3:
        case c.VEC4:
          return 1
        case c.MAT2:
          return 2
        case c.MAT3:
          return 3
        case c.MAT4:
          return 4
      }
    },
    getGlslType: function (t) {
      switch (t) {
        case c.SCALAR:
          return 'float'
        case c.VEC2:
          return 'vec2'
        case c.VEC3:
          return 'vec3'
        case c.VEC4:
          return 'vec4'
        case c.MAT2:
          return 'mat2'
        case c.MAT3:
          return 'mat3'
        case c.MAT4:
          return 'mat4'
      }
    }
  }
  var s = Object.freeze(c)
  const u = 1 / 256,
    i = {
      octEncodeInRange: function (t, e, n) {
        if (((n.x = t.x / (Math.abs(t.x) + Math.abs(t.y) + Math.abs(t.z))), (n.y = t.y / (Math.abs(t.x) + Math.abs(t.y) + Math.abs(t.z))), t.z < 0)) {
          const t = n.x,
            e = n.y
          ;(n.x = (1 - Math.abs(e)) * r.CesiumMath.signNotZero(t)), (n.y = (1 - Math.abs(t)) * r.CesiumMath.signNotZero(e))
        }
        return (n.x = r.CesiumMath.toSNorm(n.x, e)), (n.y = r.CesiumMath.toSNorm(n.y, e)), n
      },
      octEncode: function (t, e) {
        return i.octEncodeInRange(t, 255, e)
      }
    },
    C = new e.Cartesian2(),
    M = new Uint8Array(1)
  function f(t) {
    return (M[0] = t), M[0]
  }
  ;(i.octEncodeToCartesian4 = function (t, e) {
    return i.octEncodeInRange(t, 65535, C), (e.x = f(C.x * u)), (e.y = f(C.x)), (e.z = f(C.y * u)), (e.w = f(C.y)), e
  }),
    (i.octDecodeInRange = function (t, e, o, a) {
      if (((a.x = r.CesiumMath.fromSNorm(t, o)), (a.y = r.CesiumMath.fromSNorm(e, o)), (a.z = 1 - (Math.abs(a.x) + Math.abs(a.y))), a.z < 0)) {
        const t = a.x
        ;(a.x = (1 - Math.abs(a.y)) * r.CesiumMath.signNotZero(t)), (a.y = (1 - Math.abs(t)) * r.CesiumMath.signNotZero(a.y))
      }
      return n.Cartesian3.normalize(a, a)
    }),
    (i.octDecode = function (t, e, n) {
      return i.octDecodeInRange(t, e, 255, n)
    }),
    (i.octDecodeFromCartesian4 = function (t, e) {
      const n = 256 * t.x + t.y,
        o = 256 * t.z + t.w
      return i.octDecodeInRange(n, o, 65535, e)
    }),
    (i.octPackFloat = function (t) {
      return 256 * t.x + t.y
    })
  const m = new e.Cartesian2()
  function y(t) {
    return (t >> 1) ^ -(1 & t)
  }
  ;(i.octEncodeFloat = function (t) {
    return i.octEncode(t, m), i.octPackFloat(m)
  }),
    (i.octDecodeFloat = function (t, e) {
      const n = t / 256,
        o = Math.floor(n),
        a = 256 * (n - o)
      return i.octDecode(o, a, e)
    }),
    (i.octPack = function (t, e, n, o) {
      const a = i.octEncodeFloat(t),
        r = i.octEncodeFloat(e),
        c = i.octEncode(n, m)
      return (o.x = 65536 * c.x + a), (o.y = 65536 * c.y + r), o
    }),
    (i.octUnpack = function (t, e, n, o) {
      let a = t.x / 65536
      const r = Math.floor(a),
        c = 65536 * (a - r)
      a = t.y / 65536
      const s = Math.floor(a),
        u = 65536 * (a - s)
      i.octDecodeFloat(c, e), i.octDecodeFloat(u, n), i.octDecode(r, s, o)
    }),
    (i.compressTextureCoordinates = function (t) {
      return 4096 * ((4095 * t.x) | 0) + ((4095 * t.y) | 0)
    }),
    (i.decompressTextureCoordinates = function (t, e) {
      const n = t / 4096,
        o = Math.floor(n)
      return (e.x = o / 4095), (e.y = (t - 4096 * o) / 4095), e
    }),
    (i.zigZagDeltaDecode = function (t, e, n) {
      const o = t.length
      let r = 0,
        c = 0,
        s = 0
      for (let u = 0; u < o; ++u) (r += y(t[u])), (c += y(e[u])), (t[u] = r), (e[u] = c), a.defined(n) && ((s += y(n[u])), (n[u] = s))
    }),
    (i.dequantize = function (t, e, n, a) {
      const r = s.getNumberOfComponents(n)
      let c
      switch (e) {
        case o.ComponentDatatype.BYTE:
          c = 127
          break
        case o.ComponentDatatype.UNSIGNED_BYTE:
          c = 255
          break
        case o.ComponentDatatype.SHORT:
          c = 32767
          break
        case o.ComponentDatatype.UNSIGNED_SHORT:
          c = 65535
          break
        case o.ComponentDatatype.INT:
          c = 2147483647
          break
        case o.ComponentDatatype.UNSIGNED_INT:
          c = 4294967295
      }
      const u = new Float32Array(a * r)
      for (let e = 0; e < a; e++)
        for (let n = 0; n < r; n++) {
          const o = e * r + n
          u[o] = Math.max(t[o] / c, -1)
        }
      return u
    }),
    (i.decodeRGB565 = function (t, e) {
      const n = t.length
      a.defined(e) || (e = new Float32Array(3 * n))
      const o = 1 / 31
      for (let a = 0; a < n; a++) {
        const n = t[a],
          r = n >> 11,
          c = (n >> 5) & 63,
          s = 31 & n,
          u = 3 * a
        ;(e[u] = r * o), (e[u + 1] = 0.015873015873015872 * c), (e[u + 2] = s * o)
      }
      return e
    })
  var A = i
  t.AttributeCompression = A
})
