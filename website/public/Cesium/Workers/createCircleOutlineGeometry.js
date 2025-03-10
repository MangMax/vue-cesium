define([
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './EllipseOutlineGeometry-9a63dd89',
  './Math-2ce22ee9',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './RuntimeError-9b4ce3fb',
  './combine-0c102d93',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './EllipseGeometryLibrary-46203226',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d'
], function (e, i, t, r, l, n, o, s, a, u, m, c, d, p, y) {
  'use strict'
  function G(e) {
    const r = (e = i.defaultValue(e, i.defaultValue.EMPTY_OBJECT)).radius,
      l = {
        center: e.center,
        semiMajorAxis: r,
        semiMinorAxis: r,
        ellipsoid: e.ellipsoid,
        height: e.height,
        extrudedHeight: e.extrudedHeight,
        granularity: e.granularity,
        numberOfVerticalLines: e.numberOfVerticalLines
      }
    ;(this._ellipseGeometry = new t.EllipseOutlineGeometry(l)), (this._workerName = 'createCircleOutlineGeometry')
  }
  ;(G.packedLength = t.EllipseOutlineGeometry.packedLength),
    (G.pack = function (e, i, r) {
      return t.EllipseOutlineGeometry.pack(e._ellipseGeometry, i, r)
    })
  const _ = new t.EllipseOutlineGeometry({ center: new e.Cartesian3(), semiMajorAxis: 1, semiMinorAxis: 1 }),
    f = {
      center: new e.Cartesian3(),
      radius: void 0,
      ellipsoid: e.Ellipsoid.clone(e.Ellipsoid.UNIT_SPHERE),
      height: void 0,
      extrudedHeight: void 0,
      granularity: void 0,
      numberOfVerticalLines: void 0,
      semiMajorAxis: void 0,
      semiMinorAxis: void 0
    }
  return (
    (G.unpack = function (r, l, n) {
      const o = t.EllipseOutlineGeometry.unpack(r, l, _)
      return (
        (f.center = e.Cartesian3.clone(o._center, f.center)),
        (f.ellipsoid = e.Ellipsoid.clone(o._ellipsoid, f.ellipsoid)),
        (f.height = o._height),
        (f.extrudedHeight = o._extrudedHeight),
        (f.granularity = o._granularity),
        (f.numberOfVerticalLines = o._numberOfVerticalLines),
        i.defined(n)
          ? ((f.semiMajorAxis = o._semiMajorAxis), (f.semiMinorAxis = o._semiMinorAxis), (n._ellipseGeometry = new t.EllipseOutlineGeometry(f)), n)
          : ((f.radius = o._semiMajorAxis), new G(f))
      )
    }),
    (G.createGeometry = function (e) {
      return t.EllipseOutlineGeometry.createGeometry(e._ellipseGeometry)
    }),
    function (t, r) {
      return (
        i.defined(r) && (t = G.unpack(t, r)),
        (t._ellipseGeometry._center = e.Cartesian3.clone(t._ellipseGeometry._center)),
        (t._ellipseGeometry._ellipsoid = e.Ellipsoid.clone(t._ellipseGeometry._ellipsoid)),
        G.createGeometry(t)
      )
    }
  )
})
