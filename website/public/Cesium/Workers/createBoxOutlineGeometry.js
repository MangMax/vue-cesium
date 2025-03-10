define([
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './Math-2ce22ee9',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './WebGLConstants-7f557f93'
], function (t, e, n, a, i, r, u, o, s, m, f, c) {
  'use strict'
  const l = new e.Cartesian3()
  function p(t) {
    const n = (t = a.defaultValue(t, a.defaultValue.EMPTY_OBJECT)).minimum,
      i = t.maximum
    ;(this._min = e.Cartesian3.clone(n)),
      (this._max = e.Cartesian3.clone(i)),
      (this._offsetAttribute = t.offsetAttribute),
      (this._workerName = 'createBoxOutlineGeometry')
  }
  ;(p.fromDimensions = function (t) {
    const n = (t = a.defaultValue(t, a.defaultValue.EMPTY_OBJECT)).dimensions,
      i = e.Cartesian3.multiplyByScalar(n, 0.5, new e.Cartesian3())
    return new p({ minimum: e.Cartesian3.negate(i, new e.Cartesian3()), maximum: i, offsetAttribute: t.offsetAttribute })
  }),
    (p.fromAxisAlignedBoundingBox = function (t) {
      return new p({ minimum: t.minimum, maximum: t.maximum })
    }),
    (p.packedLength = 2 * e.Cartesian3.packedLength + 1),
    (p.pack = function (t, n, i) {
      return (
        (i = a.defaultValue(i, 0)),
        e.Cartesian3.pack(t._min, n, i),
        e.Cartesian3.pack(t._max, n, i + e.Cartesian3.packedLength),
        (n[i + 2 * e.Cartesian3.packedLength] = a.defaultValue(t._offsetAttribute, -1)),
        n
      )
    })
  const y = new e.Cartesian3(),
    d = new e.Cartesian3(),
    C = { minimum: y, maximum: d, offsetAttribute: void 0 }
  return (
    (p.unpack = function (t, n, i) {
      n = a.defaultValue(n, 0)
      const r = e.Cartesian3.unpack(t, n, y),
        u = e.Cartesian3.unpack(t, n + e.Cartesian3.packedLength, d),
        o = t[n + 2 * e.Cartesian3.packedLength]
      return a.defined(i)
        ? ((i._min = e.Cartesian3.clone(r, i._min)), (i._max = e.Cartesian3.clone(u, i._max)), (i._offsetAttribute = -1 === o ? void 0 : o), i)
        : ((C.offsetAttribute = -1 === o ? void 0 : o), new p(C))
    }),
    (p.createGeometry = function (o) {
      const s = o._min,
        m = o._max
      if (e.Cartesian3.equals(s, m)) return
      const f = new r.GeometryAttributes(),
        c = new Uint16Array(24),
        p = new Float64Array(24)
      ;(p[0] = s.x),
        (p[1] = s.y),
        (p[2] = s.z),
        (p[3] = m.x),
        (p[4] = s.y),
        (p[5] = s.z),
        (p[6] = m.x),
        (p[7] = m.y),
        (p[8] = s.z),
        (p[9] = s.x),
        (p[10] = m.y),
        (p[11] = s.z),
        (p[12] = s.x),
        (p[13] = s.y),
        (p[14] = m.z),
        (p[15] = m.x),
        (p[16] = s.y),
        (p[17] = m.z),
        (p[18] = m.x),
        (p[19] = m.y),
        (p[20] = m.z),
        (p[21] = s.x),
        (p[22] = m.y),
        (p[23] = m.z),
        (f.position = new i.GeometryAttribute({ componentDatatype: n.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: p })),
        (c[0] = 4),
        (c[1] = 5),
        (c[2] = 5),
        (c[3] = 6),
        (c[4] = 6),
        (c[5] = 7),
        (c[6] = 7),
        (c[7] = 4),
        (c[8] = 0),
        (c[9] = 1),
        (c[10] = 1),
        (c[11] = 2),
        (c[12] = 2),
        (c[13] = 3),
        (c[14] = 3),
        (c[15] = 0),
        (c[16] = 0),
        (c[17] = 4),
        (c[18] = 1),
        (c[19] = 5),
        (c[20] = 2),
        (c[21] = 6),
        (c[22] = 3),
        (c[23] = 7)
      const y = e.Cartesian3.subtract(m, s, l),
        d = 0.5 * e.Cartesian3.magnitude(y)
      if (a.defined(o._offsetAttribute)) {
        const t = p.length,
          e = o._offsetAttribute === u.GeometryOffsetAttribute.NONE ? 0 : 1,
          a = new Uint8Array(t / 3).fill(e)
        f.applyOffset = new i.GeometryAttribute({ componentDatatype: n.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: a })
      }
      return new i.Geometry({
        attributes: f,
        indices: c,
        primitiveType: i.PrimitiveType.LINES,
        boundingSphere: new t.BoundingSphere(e.Cartesian3.ZERO, d),
        offsetAttribute: o._offsetAttribute
      })
    }),
    function (t, e) {
      return a.defined(e) && (t = p.unpack(t, e)), p.createGeometry(t)
    }
  )
})
