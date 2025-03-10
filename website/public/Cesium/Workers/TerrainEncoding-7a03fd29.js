define([
  'exports',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './Matrix2-413c4048',
  './AttributeCompression-48e336db',
  './ComponentDatatype-ab629b88',
  './Math-2ce22ee9'
], function (t, e, i, o, a, r, n, s) {
  'use strict'
  function c(t, e) {
    ;(this._ellipsoid = t),
      (this._cameraPosition = new i.Cartesian3()),
      (this._cameraPositionInScaledSpace = new i.Cartesian3()),
      (this._distanceToLimbInScaledSpaceSquared = 0),
      o.defined(e) && (this.cameraPosition = e)
  }
  Object.defineProperties(c.prototype, {
    ellipsoid: {
      get: function () {
        return this._ellipsoid
      }
    },
    cameraPosition: {
      get: function () {
        return this._cameraPosition
      },
      set: function (t) {
        const e = this._ellipsoid.transformPositionToScaledSpace(t, this._cameraPositionInScaledSpace),
          o = i.Cartesian3.magnitudeSquared(e) - 1
        i.Cartesian3.clone(t, this._cameraPosition), (this._cameraPositionInScaledSpace = e), (this._distanceToLimbInScaledSpaceSquared = o)
      }
    }
  })
  const u = new i.Cartesian3()
  ;(c.prototype.isPointVisible = function (t) {
    return C(this._ellipsoid.transformPositionToScaledSpace(t, u), this._cameraPositionInScaledSpace, this._distanceToLimbInScaledSpaceSquared)
  }),
    (c.prototype.isScaledSpacePointVisible = function (t) {
      return C(t, this._cameraPositionInScaledSpace, this._distanceToLimbInScaledSpaceSquared)
    })
  const d = new i.Cartesian3()
  ;(c.prototype.isScaledSpacePointVisiblePossiblyUnderEllipsoid = function (t, e) {
    const i = this._ellipsoid
    let a, r
    return (
      o.defined(e) && e < 0 && i.minimumRadius > -e
        ? ((r = d),
          (r.x = this._cameraPosition.x / (i.radii.x + e)),
          (r.y = this._cameraPosition.y / (i.radii.y + e)),
          (r.z = this._cameraPosition.z / (i.radii.z + e)),
          (a = r.x * r.x + r.y * r.y + r.z * r.z - 1))
        : ((r = this._cameraPositionInScaledSpace), (a = this._distanceToLimbInScaledSpaceSquared)),
      C(t, r, a)
    )
  }),
    (c.prototype.computeHorizonCullingPoint = function (t, e, i) {
      return p(this._ellipsoid, t, e, i)
    })
  const l = i.Ellipsoid.clone(i.Ellipsoid.UNIT_SPHERE)
  ;(c.prototype.computeHorizonCullingPointPossiblyUnderEllipsoid = function (t, e, i, o) {
    return p(f(this._ellipsoid, i, l), t, e, o)
  }),
    (c.prototype.computeHorizonCullingPointFromVertices = function (t, e, i, o, a) {
      return S(this._ellipsoid, t, e, i, o, a)
    }),
    (c.prototype.computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid = function (t, e, i, o, a, r) {
      return S(f(this._ellipsoid, a, l), t, e, i, o, r)
    })
  const m = []
  c.prototype.computeHorizonCullingPointFromRectangle = function (t, o, r) {
    const n = a.Rectangle.subsample(t, o, 0, m),
      s = e.BoundingSphere.fromPoints(n)
    if (!(i.Cartesian3.magnitude(s.center) < 0.1 * o.minimumRadius)) return this.computeHorizonCullingPoint(s.center, n, r)
  }
  const h = new i.Cartesian3()
  function f(t, e, a) {
    if (o.defined(e) && e < 0 && t.minimumRadius > -e) {
      const o = i.Cartesian3.fromElements(t.radii.x + e, t.radii.y + e, t.radii.z + e, h)
      t = i.Ellipsoid.fromCartesian3(o, a)
    }
    return t
  }
  function p(t, e, a, r) {
    o.defined(r) || (r = new i.Cartesian3())
    const n = P(t, e)
    let s = 0
    for (let e = 0, i = a.length; e < i; ++e) {
      const i = N(t, a[e], n)
      if (i < 0) return
      s = Math.max(s, i)
    }
    return M(n, s, r)
  }
  const x = new i.Cartesian3()
  function S(t, e, a, r, n, s) {
    o.defined(s) || (s = new i.Cartesian3()), (r = o.defaultValue(r, 3)), (n = o.defaultValue(n, i.Cartesian3.ZERO))
    const c = P(t, e)
    let u = 0
    for (let e = 0, i = a.length; e < i; e += r) {
      ;(x.x = a[e] + n.x), (x.y = a[e + 1] + n.y), (x.z = a[e + 2] + n.z)
      const i = N(t, x, c)
      if (i < 0) return
      u = Math.max(u, i)
    }
    return M(c, u, s)
  }
  function C(t, e, o) {
    const a = e,
      r = o,
      n = i.Cartesian3.subtract(t, a, u),
      s = -i.Cartesian3.dot(n, a)
    return !(r < 0 ? s > 0 : s > r && (s * s) / i.Cartesian3.magnitudeSquared(n) > r)
  }
  const g = new i.Cartesian3(),
    y = new i.Cartesian3()
  function N(t, e, o) {
    const a = t.transformPositionToScaledSpace(e, g)
    let r = i.Cartesian3.magnitudeSquared(a),
      n = Math.sqrt(r)
    const s = i.Cartesian3.divideByScalar(a, n, y)
    ;(r = Math.max(1, r)), (n = Math.max(1, n))
    const c = 1 / n
    return 1 / (i.Cartesian3.dot(s, o) * c - i.Cartesian3.magnitude(i.Cartesian3.cross(s, o, s)) * (Math.sqrt(r - 1) * c))
  }
  function M(t, e, o) {
    if (!(e <= 0 || e === 1 / 0 || e != e)) return i.Cartesian3.multiplyByScalar(t, e, o)
  }
  const T = new i.Cartesian3()
  function P(t, e) {
    return i.Cartesian3.equals(e, i.Cartesian3.ZERO) ? e : (t.transformPositionToScaledSpace(e, T), i.Cartesian3.normalize(T, T))
  }
  const b = {
      getHeight: function (t, e, i) {
        return (t - i) * e + i
      }
    },
    z = new i.Cartesian3()
  b.getPosition = function (t, e, o, a, r) {
    const n = e.cartesianToCartographic(t, z),
      s = b.getHeight(n.height, o, a)
    return i.Cartesian3.fromRadians(n.longitude, n.latitude, s, e, r)
  }
  var _ = b
  var E = Object.freeze({ NONE: 0, BITS12: 1 })
  const H = new i.Cartesian3(),
    w = new i.Cartesian3(),
    A = new a.Cartesian2(),
    I = new a.Matrix4(),
    V = new a.Matrix4(),
    q = Math.pow(2, 12)
  function G(t, e, r, n, s, c, u, d, l, m) {
    let h,
      f,
      p = E.NONE
    if (o.defined(e) && o.defined(r) && o.defined(n) && o.defined(s)) {
      const t = e.minimum,
        o = e.maximum,
        c = i.Cartesian3.subtract(o, t, w),
        u = n - r
      ;(p = Math.max(i.Cartesian3.maximumComponent(c), u) < q - 1 ? E.BITS12 : E.NONE), (h = a.Matrix4.inverseTransformation(s, new a.Matrix4()))
      const d = i.Cartesian3.negate(t, H)
      a.Matrix4.multiply(a.Matrix4.fromTranslation(d, I), h, h)
      const l = H
      ;(l.x = 1 / c.x),
        (l.y = 1 / c.y),
        (l.z = 1 / c.z),
        a.Matrix4.multiply(a.Matrix4.fromScale(l, I), h, h),
        (f = a.Matrix4.clone(s)),
        a.Matrix4.setTranslation(f, i.Cartesian3.ZERO, f),
        (s = a.Matrix4.clone(s, new a.Matrix4()))
      const m = a.Matrix4.fromTranslation(t, I),
        x = a.Matrix4.fromScale(c, V),
        S = a.Matrix4.multiply(m, x, I)
      a.Matrix4.multiply(s, S, s), a.Matrix4.multiply(f, S, f)
    }
    ;(this.quantization = p),
      (this.minimumHeight = r),
      (this.maximumHeight = n),
      (this.center = i.Cartesian3.clone(t)),
      (this.toScaledENU = h),
      (this.fromScaledENU = s),
      (this.matrix = f),
      (this.hasVertexNormals = c),
      (this.hasWebMercatorT = o.defaultValue(u, !1)),
      (this.hasGeodeticSurfaceNormals = o.defaultValue(d, !1)),
      (this.exaggeration = o.defaultValue(l, 1)),
      (this.exaggerationRelativeHeight = o.defaultValue(m, 0)),
      (this.stride = 0),
      (this._offsetGeodeticSurfaceNormal = 0),
      (this._offsetVertexNormal = 0),
      this._calculateStrideAndOffsets()
  }
  G.prototype.encode = function (t, e, o, n, c, u, d, l) {
    const m = n.x,
      h = n.y
    if (this.quantization === E.BITS12) {
      ;((o = a.Matrix4.multiplyByPoint(this.toScaledENU, o, H)).x = s.CesiumMath.clamp(o.x, 0, 1)),
        (o.y = s.CesiumMath.clamp(o.y, 0, 1)),
        (o.z = s.CesiumMath.clamp(o.z, 0, 1))
      const i = this.maximumHeight - this.minimumHeight,
        n = s.CesiumMath.clamp((c - this.minimumHeight) / i, 0, 1)
      a.Cartesian2.fromElements(o.x, o.y, A)
      const u = r.AttributeCompression.compressTextureCoordinates(A)
      a.Cartesian2.fromElements(o.z, n, A)
      const l = r.AttributeCompression.compressTextureCoordinates(A)
      a.Cartesian2.fromElements(m, h, A)
      const f = r.AttributeCompression.compressTextureCoordinates(A)
      if (((t[e++] = u), (t[e++] = l), (t[e++] = f), this.hasWebMercatorT)) {
        a.Cartesian2.fromElements(d, 0, A)
        const i = r.AttributeCompression.compressTextureCoordinates(A)
        t[e++] = i
      }
    } else
      i.Cartesian3.subtract(o, this.center, H),
        (t[e++] = H.x),
        (t[e++] = H.y),
        (t[e++] = H.z),
        (t[e++] = c),
        (t[e++] = m),
        (t[e++] = h),
        this.hasWebMercatorT && (t[e++] = d)
    return (
      this.hasVertexNormals && (t[e++] = r.AttributeCompression.octPackFloat(u)),
      this.hasGeodeticSurfaceNormals && ((t[e++] = l.x), (t[e++] = l.y), (t[e++] = l.z)),
      e
    )
  }
  const O = new i.Cartesian3(),
    B = new i.Cartesian3()
  ;(G.prototype.addGeodeticSurfaceNormals = function (t, e, i) {
    if (this.hasGeodeticSurfaceNormals) return
    const o = this.stride,
      a = t.length / o
    ;(this.hasGeodeticSurfaceNormals = !0), this._calculateStrideAndOffsets()
    const r = this.stride
    for (let n = 0; n < a; n++) {
      for (let i = 0; i < o; i++) {
        const a = n * o + i
        e[n * r + i] = t[a]
      }
      const a = this.decodePosition(e, n, O),
        s = i.geodeticSurfaceNormal(a, B),
        c = n * r + this._offsetGeodeticSurfaceNormal
      ;(e[c] = s.x), (e[c + 1] = s.y), (e[c + 2] = s.z)
    }
  }),
    (G.prototype.removeGeodeticSurfaceNormals = function (t, e) {
      if (!this.hasGeodeticSurfaceNormals) return
      const i = this.stride,
        o = t.length / i
      ;(this.hasGeodeticSurfaceNormals = !1), this._calculateStrideAndOffsets()
      const a = this.stride
      for (let r = 0; r < o; r++)
        for (let o = 0; o < a; o++) {
          const n = r * i + o
          e[r * a + o] = t[n]
        }
    }),
    (G.prototype.decodePosition = function (t, e, n) {
      if ((o.defined(n) || (n = new i.Cartesian3()), (e *= this.stride), this.quantization === E.BITS12)) {
        const i = r.AttributeCompression.decompressTextureCoordinates(t[e], A)
        ;(n.x = i.x), (n.y = i.y)
        const o = r.AttributeCompression.decompressTextureCoordinates(t[e + 1], A)
        return (n.z = o.x), a.Matrix4.multiplyByPoint(this.fromScaledENU, n, n)
      }
      return (n.x = t[e]), (n.y = t[e + 1]), (n.z = t[e + 2]), i.Cartesian3.add(n, this.center, n)
    }),
    (G.prototype.getExaggeratedPosition = function (t, e, i) {
      i = this.decodePosition(t, e, i)
      const o = this.exaggeration,
        a = this.exaggerationRelativeHeight
      if (1 !== o && this.hasGeodeticSurfaceNormals) {
        const r = this.decodeGeodeticSurfaceNormal(t, e, B),
          n = this.decodeHeight(t, e),
          s = _.getHeight(n, o, a) - n
        ;(i.x += r.x * s), (i.y += r.y * s), (i.z += r.z * s)
      }
      return i
    }),
    (G.prototype.decodeTextureCoordinates = function (t, e, i) {
      return (
        o.defined(i) || (i = new a.Cartesian2()),
        (e *= this.stride),
        this.quantization === E.BITS12
          ? r.AttributeCompression.decompressTextureCoordinates(t[e + 2], i)
          : a.Cartesian2.fromElements(t[e + 4], t[e + 5], i)
      )
    }),
    (G.prototype.decodeHeight = function (t, e) {
      if (((e *= this.stride), this.quantization === E.BITS12)) {
        return r.AttributeCompression.decompressTextureCoordinates(t[e + 1], A).y * (this.maximumHeight - this.minimumHeight) + this.minimumHeight
      }
      return t[e + 3]
    }),
    (G.prototype.decodeWebMercatorT = function (t, e) {
      return (e *= this.stride), this.quantization === E.BITS12 ? r.AttributeCompression.decompressTextureCoordinates(t[e + 3], A).x : t[e + 6]
    }),
    (G.prototype.getOctEncodedNormal = function (t, e, i) {
      const o = t[(e = e * this.stride + this._offsetVertexNormal)] / 256,
        r = Math.floor(o),
        n = 256 * (o - r)
      return a.Cartesian2.fromElements(r, n, i)
    }),
    (G.prototype.decodeGeodeticSurfaceNormal = function (t, e, i) {
      return (e = e * this.stride + this._offsetGeodeticSurfaceNormal), (i.x = t[e]), (i.y = t[e + 1]), (i.z = t[e + 2]), i
    }),
    (G.prototype._calculateStrideAndOffsets = function () {
      let t = 0
      if (this.quantization === E.BITS12) t += 3
      else t += 6
      this.hasWebMercatorT && (t += 1),
        this.hasVertexNormals && ((this._offsetVertexNormal = t), (t += 1)),
        this.hasGeodeticSurfaceNormals && ((this._offsetGeodeticSurfaceNormal = t), (t += 3)),
        (this.stride = t)
    })
  const R = { position3DAndHeight: 0, textureCoordAndEncodedNormals: 1, geodeticSurfaceNormal: 2 },
    U = { compressed0: 0, compressed1: 1, geodeticSurfaceNormal: 2 }
  ;(G.prototype.getAttributes = function (t) {
    const e = n.ComponentDatatype.FLOAT,
      i = n.ComponentDatatype.getSizeInBytes(e),
      o = this.stride * i
    let a = 0
    const r = []
    function s(n, s) {
      r.push({ index: n, vertexBuffer: t, componentDatatype: e, componentsPerAttribute: s, offsetInBytes: a, strideInBytes: o }), (a += s * i)
    }
    if (this.quantization === E.NONE) {
      s(R.position3DAndHeight, 4)
      let t = 2
      ;(t += this.hasWebMercatorT ? 1 : 0),
        (t += this.hasVertexNormals ? 1 : 0),
        s(R.textureCoordAndEncodedNormals, t),
        this.hasGeodeticSurfaceNormals && s(R.geodeticSurfaceNormal, 3)
    } else {
      const t = this.hasWebMercatorT || this.hasVertexNormals,
        e = this.hasWebMercatorT && this.hasVertexNormals
      s(U.compressed0, t ? 4 : 3), e && s(U.compressed1, 1), this.hasGeodeticSurfaceNormals && s(U.geodeticSurfaceNormal, 3)
    }
    return r
  }),
    (G.prototype.getAttributeLocations = function () {
      return this.quantization === E.NONE ? R : U
    }),
    (G.clone = function (t, e) {
      if (o.defined(t))
        return (
          o.defined(e) || (e = new G()),
          (e.quantization = t.quantization),
          (e.minimumHeight = t.minimumHeight),
          (e.maximumHeight = t.maximumHeight),
          (e.center = i.Cartesian3.clone(t.center)),
          (e.toScaledENU = a.Matrix4.clone(t.toScaledENU)),
          (e.fromScaledENU = a.Matrix4.clone(t.fromScaledENU)),
          (e.matrix = a.Matrix4.clone(t.matrix)),
          (e.hasVertexNormals = t.hasVertexNormals),
          (e.hasWebMercatorT = t.hasWebMercatorT),
          (e.hasGeodeticSurfaceNormals = t.hasGeodeticSurfaceNormals),
          (e.exaggeration = t.exaggeration),
          (e.exaggerationRelativeHeight = t.exaggerationRelativeHeight),
          e._calculateStrideAndOffsets(),
          e
        )
    }),
    (t.EllipsoidalOccluder = c),
    (t.TerrainEncoding = G)
})
