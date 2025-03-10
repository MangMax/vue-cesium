define(['exports', './defaultValue-f6d5e6da', './WebGLConstants-7f557f93'], function (r, e, n) {
  'use strict'
  const t = {
    BYTE: n.WebGLConstants.BYTE,
    UNSIGNED_BYTE: n.WebGLConstants.UNSIGNED_BYTE,
    SHORT: n.WebGLConstants.SHORT,
    UNSIGNED_SHORT: n.WebGLConstants.UNSIGNED_SHORT,
    INT: n.WebGLConstants.INT,
    UNSIGNED_INT: n.WebGLConstants.UNSIGNED_INT,
    FLOAT: n.WebGLConstants.FLOAT,
    DOUBLE: n.WebGLConstants.DOUBLE,
    getSizeInBytes: function (r) {
      switch (r) {
        case t.BYTE:
          return Int8Array.BYTES_PER_ELEMENT
        case t.UNSIGNED_BYTE:
          return Uint8Array.BYTES_PER_ELEMENT
        case t.SHORT:
          return Int16Array.BYTES_PER_ELEMENT
        case t.UNSIGNED_SHORT:
          return Uint16Array.BYTES_PER_ELEMENT
        case t.INT:
          return Int32Array.BYTES_PER_ELEMENT
        case t.UNSIGNED_INT:
          return Uint32Array.BYTES_PER_ELEMENT
        case t.FLOAT:
          return Float32Array.BYTES_PER_ELEMENT
        case t.DOUBLE:
          return Float64Array.BYTES_PER_ELEMENT
      }
    },
    fromTypedArray: function (r) {
      return r instanceof Int8Array
        ? t.BYTE
        : r instanceof Uint8Array
        ? t.UNSIGNED_BYTE
        : r instanceof Int16Array
        ? t.SHORT
        : r instanceof Uint16Array
        ? t.UNSIGNED_SHORT
        : r instanceof Int32Array
        ? t.INT
        : r instanceof Uint32Array
        ? t.UNSIGNED_INT
        : r instanceof Float32Array
        ? t.FLOAT
        : r instanceof Float64Array
        ? t.DOUBLE
        : void 0
    },
    validate: function (r) {
      return (
        e.defined(r) &&
        (r === t.BYTE ||
          r === t.UNSIGNED_BYTE ||
          r === t.SHORT ||
          r === t.UNSIGNED_SHORT ||
          r === t.INT ||
          r === t.UNSIGNED_INT ||
          r === t.FLOAT ||
          r === t.DOUBLE)
      )
    },
    createTypedArray: function (r, e) {
      switch (r) {
        case t.BYTE:
          return new Int8Array(e)
        case t.UNSIGNED_BYTE:
          return new Uint8Array(e)
        case t.SHORT:
          return new Int16Array(e)
        case t.UNSIGNED_SHORT:
          return new Uint16Array(e)
        case t.INT:
          return new Int32Array(e)
        case t.UNSIGNED_INT:
          return new Uint32Array(e)
        case t.FLOAT:
          return new Float32Array(e)
        case t.DOUBLE:
          return new Float64Array(e)
      }
    },
    createArrayBufferView: function (r, n, a, E) {
      switch (((a = e.defaultValue(a, 0)), (E = e.defaultValue(E, (n.byteLength - a) / t.getSizeInBytes(r))), r)) {
        case t.BYTE:
          return new Int8Array(n, a, E)
        case t.UNSIGNED_BYTE:
          return new Uint8Array(n, a, E)
        case t.SHORT:
          return new Int16Array(n, a, E)
        case t.UNSIGNED_SHORT:
          return new Uint16Array(n, a, E)
        case t.INT:
          return new Int32Array(n, a, E)
        case t.UNSIGNED_INT:
          return new Uint32Array(n, a, E)
        case t.FLOAT:
          return new Float32Array(n, a, E)
        case t.DOUBLE:
          return new Float64Array(n, a, E)
      }
    },
    fromName: function (r) {
      switch (r) {
        case 'BYTE':
          return t.BYTE
        case 'UNSIGNED_BYTE':
          return t.UNSIGNED_BYTE
        case 'SHORT':
          return t.SHORT
        case 'UNSIGNED_SHORT':
          return t.UNSIGNED_SHORT
        case 'INT':
          return t.INT
        case 'UNSIGNED_INT':
          return t.UNSIGNED_INT
        case 'FLOAT':
          return t.FLOAT
        case 'DOUBLE':
          return t.DOUBLE
      }
    }
  }
  var a = Object.freeze(t)
  r.ComponentDatatype = a
})
