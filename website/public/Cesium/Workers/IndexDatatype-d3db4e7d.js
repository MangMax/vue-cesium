define(['exports', './defaultValue-f6d5e6da', './Math-2ce22ee9', './WebGLConstants-7f557f93'], function (n, r, e, t) {
  'use strict'
  const N = {
    UNSIGNED_BYTE: t.WebGLConstants.UNSIGNED_BYTE,
    UNSIGNED_SHORT: t.WebGLConstants.UNSIGNED_SHORT,
    UNSIGNED_INT: t.WebGLConstants.UNSIGNED_INT,
    getSizeInBytes: function (n) {
      switch (n) {
        case N.UNSIGNED_BYTE:
          return Uint8Array.BYTES_PER_ELEMENT
        case N.UNSIGNED_SHORT:
          return Uint16Array.BYTES_PER_ELEMENT
        case N.UNSIGNED_INT:
          return Uint32Array.BYTES_PER_ELEMENT
      }
    },
    fromSizeInBytes: function (n) {
      switch (n) {
        case 2:
          return N.UNSIGNED_SHORT
        case 4:
          return N.UNSIGNED_INT
        case 1:
          return N.UNSIGNED_BYTE
      }
    },
    validate: function (n) {
      return r.defined(n) && (n === N.UNSIGNED_BYTE || n === N.UNSIGNED_SHORT || n === N.UNSIGNED_INT)
    },
    createTypedArray: function (n, r) {
      return n >= e.CesiumMath.SIXTY_FOUR_KILOBYTES ? new Uint32Array(r) : new Uint16Array(r)
    },
    createTypedArrayFromArrayBuffer: function (n, r, t, N) {
      return n >= e.CesiumMath.SIXTY_FOUR_KILOBYTES ? new Uint32Array(r, t, N) : new Uint16Array(r, t, N)
    },
    fromTypedArray: function (n) {
      return n instanceof Uint8Array
        ? N.UNSIGNED_BYTE
        : n instanceof Uint16Array
        ? N.UNSIGNED_SHORT
        : n instanceof Uint32Array
        ? N.UNSIGNED_INT
        : void 0
    }
  }
  var E = Object.freeze(N)
  n.IndexDatatype = E
})
