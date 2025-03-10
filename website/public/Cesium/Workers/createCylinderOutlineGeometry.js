define([
  './Transforms-20461479',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './CylinderGeometryLibrary-f49f33a8',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './WebGLConstants-7f557f93'
], function (t, e, i, n, o, r, a, s, u, f, l, d, c, m) {
  'use strict'
  const b = new e.Cartesian2()
  function p(t) {
    const e = (t = r.defaultValue(t, r.defaultValue.EMPTY_OBJECT)).length,
      i = t.topRadius,
      n = t.bottomRadius,
      o = r.defaultValue(t.slices, 128),
      a = Math.max(r.defaultValue(t.numberOfVerticalLines, 16), 0)
    ;(this._length = e),
      (this._topRadius = i),
      (this._bottomRadius = n),
      (this._slices = o),
      (this._numberOfVerticalLines = a),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createCylinderOutlineGeometry')
  }
  ;(p.packedLength = 6),
    (p.pack = function (t, e, i) {
      return (
        (i = r.defaultValue(i, 0)),
        (e[i++] = t._length),
        (e[i++] = t._topRadius),
        (e[i++] = t._bottomRadius),
        (e[i++] = t._slices),
        (e[i++] = t._numberOfVerticalLines),
        (e[i] = r.defaultValue(t._offsetAttribute, -1)),
        e
      )
    })
  const y = { length: void 0, topRadius: void 0, bottomRadius: void 0, slices: void 0, numberOfVerticalLines: void 0, offsetAttribute: void 0 }
  return (
    (p.unpack = function (t, e, i) {
      e = r.defaultValue(e, 0)
      const n = t[e++],
        o = t[e++],
        a = t[e++],
        s = t[e++],
        u = t[e++],
        f = t[e]
      return r.defined(i)
        ? ((i._length = n),
          (i._topRadius = o),
          (i._bottomRadius = a),
          (i._slices = s),
          (i._numberOfVerticalLines = u),
          (i._offsetAttribute = -1 === f ? void 0 : f),
          i)
        : ((y.length = n),
          (y.topRadius = o),
          (y.bottomRadius = a),
          (y.slices = s),
          (y.numberOfVerticalLines = u),
          (y.offsetAttribute = -1 === f ? void 0 : f),
          new p(y))
    }),
    (p.createGeometry = function (l) {
      let d = l._length
      const c = l._topRadius,
        m = l._bottomRadius,
        p = l._slices,
        y = l._numberOfVerticalLines
      if (d <= 0 || c < 0 || m < 0 || (0 === c && 0 === m)) return
      const _ = 2 * p,
        h = o.CylinderGeometryLibrary.computePositions(d, c, m, p, !1)
      let A,
        G = 2 * p
      if (y > 0) {
        const t = Math.min(y, p)
        ;(A = Math.round(p / t)), (G += t)
      }
      const R = f.IndexDatatype.createTypedArray(_, 2 * G)
      let O,
        V = 0
      for (O = 0; O < p - 1; O++) (R[V++] = O), (R[V++] = O + 1), (R[V++] = O + p), (R[V++] = O + 1 + p)
      if (((R[V++] = p - 1), (R[V++] = 0), (R[V++] = p + p - 1), (R[V++] = p), y > 0)) for (O = 0; O < p; O += A) (R[V++] = O), (R[V++] = O + p)
      const g = new s.GeometryAttributes()
      ;(g.position = new a.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: h })),
        (b.x = 0.5 * d),
        (b.y = Math.max(m, c))
      const L = new t.BoundingSphere(i.Cartesian3.ZERO, e.Cartesian2.magnitude(b))
      if (r.defined(l._offsetAttribute)) {
        d = h.length
        const t = l._offsetAttribute === u.GeometryOffsetAttribute.NONE ? 0 : 1,
          e = new Uint8Array(d / 3).fill(t)
        g.applyOffset = new a.GeometryAttribute({ componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: e })
      }
      return new a.Geometry({
        attributes: g,
        indices: R,
        primitiveType: a.PrimitiveType.LINES,
        boundingSphere: L,
        offsetAttribute: l._offsetAttribute
      })
    }),
    function (t, e) {
      return r.defined(e) && (t = p.unpack(t, e)), p.createGeometry(t)
    }
  )
})
