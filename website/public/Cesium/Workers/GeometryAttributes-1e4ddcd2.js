define(['exports', './defaultValue-f6d5e6da'], function (t, e) {
  'use strict'
  t.GeometryAttributes = function (t) {
    ;(t = e.defaultValue(t, e.defaultValue.EMPTY_OBJECT)),
      (this.position = t.position),
      (this.normal = t.normal),
      (this.st = t.st),
      (this.bitangent = t.bitangent),
      (this.tangent = t.tangent),
      (this.color = t.color)
  }
})
