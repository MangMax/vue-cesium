define(['exports', './defaultValue-f6d5e6da', './Matrix2-413c4048'], function (e, t, i) {
  'use strict'
  e.GeometryInstance = function (e) {
    ;(e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this.geometry = e.geometry),
      (this.modelMatrix = i.Matrix4.clone(t.defaultValue(e.modelMatrix, i.Matrix4.IDENTITY))),
      (this.id = e.id),
      (this.pickPrimitive = e.pickPrimitive),
      (this.attributes = t.defaultValue(e.attributes, {})),
      (this.westHemisphereGeometry = void 0),
      (this.eastHemisphereGeometry = void 0)
  }
})
