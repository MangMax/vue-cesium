define([
  './arrayRemoveDuplicates-9b636830',
  './Transforms-20461479',
  './Matrix3-81054f0f',
  './ComponentDatatype-ab629b88',
  './PolylineVolumeGeometryLibrary-664193d8',
  './CorridorGeometryLibrary-99cbed9f',
  './defaultValue-f6d5e6da',
  './GeometryAttribute-b8117bde',
  './GeometryAttributes-1e4ddcd2',
  './GeometryOffsetAttribute-2579b8d2',
  './IndexDatatype-d3db4e7d',
  './Math-2ce22ee9',
  './PolygonPipeline-621b1cb0',
  './Matrix2-413c4048',
  './VertexFormat-fbdec922',
  './combine-0c102d93',
  './RuntimeError-9b4ce3fb',
  './WebGLConstants-7f557f93',
  './EllipsoidTangentPlane-d430e7d5',
  './AxisAlignedBoundingBox-2c0751ca',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1',
  './PolylinePipeline-5ae670bc',
  './EllipsoidGeodesic-2723ab86',
  './EllipsoidRhumbLine-77eff028'
], function (t, e, r, a, i, o, n, s, l, d, u, m, c, y, f, p, g, h, C, b, A, _, w, v, T) {
  'use strict'
  const G = new r.Cartesian3(),
    E = new r.Cartesian3(),
    V = new r.Cartesian3(),
    x = new r.Cartesian3(),
    L = new r.Cartesian3(),
    P = new r.Cartesian3(),
    F = new r.Cartesian3(),
    N = new r.Cartesian3()
  function D(t, e) {
    for (let r = 0; r < t.length; r++) t[r] = e.scaleToGeodeticSurface(t[r], t[r])
    return t
  }
  function M(t, e, a, i, n, s) {
    const l = t.normals,
      d = t.tangents,
      u = t.bitangents,
      m = r.Cartesian3.normalize(r.Cartesian3.cross(a, e, F), F)
    s.normal && o.CorridorGeometryLibrary.addAttribute(l, e, i, n),
      s.tangent && o.CorridorGeometryLibrary.addAttribute(d, m, i, n),
      s.bitangent && o.CorridorGeometryLibrary.addAttribute(u, a, i, n)
  }
  function O(t, e, i) {
    const d = t.positions,
      c = t.corners,
      y = t.endPositions,
      f = t.lefts,
      p = t.normals,
      g = new l.GeometryAttributes()
    let h,
      C,
      b,
      A = 0,
      _ = 0,
      w = 0
    for (C = 0; C < d.length; C += 2) (b = d[C].length - 3), (A += b), (w += 2 * b), (_ += d[C + 1].length - 3)
    for (A += 3, _ += 3, C = 0; C < c.length; C++) {
      h = c[C]
      const t = c[C].leftPositions
      n.defined(t) ? ((b = t.length), (A += b), (w += b)) : ((b = c[C].rightPositions.length), (_ += b), (w += b))
    }
    const v = n.defined(y)
    let T
    v && ((T = y[0].length - 3), (A += T), (_ += T), (T /= 3), (w += 6 * T))
    const L = A + _,
      D = new Float64Array(L),
      O = {
        normals: e.normal ? new Float32Array(L) : void 0,
        tangents: e.tangent ? new Float32Array(L) : void 0,
        bitangents: e.bitangent ? new Float32Array(L) : void 0
      }
    let I,
      S,
      R,
      k,
      H,
      z,
      B = 0,
      U = L - 1,
      Y = G,
      W = E
    const q = T / 2,
      J = u.IndexDatatype.createTypedArray(L / 3, w)
    let j = 0
    if (v) {
      ;(z = V), (H = x)
      const t = y[0]
      for (Y = r.Cartesian3.fromArray(p, 0, Y), W = r.Cartesian3.fromArray(f, 0, W), C = 0; C < q; C++)
        (z = r.Cartesian3.fromArray(t, 3 * (q - 1 - C), z)),
          (H = r.Cartesian3.fromArray(t, 3 * (q + C), H)),
          o.CorridorGeometryLibrary.addAttribute(D, H, B),
          o.CorridorGeometryLibrary.addAttribute(D, z, void 0, U),
          M(O, Y, W, B, U, e),
          (S = B / 3),
          (k = S + 1),
          (I = (U - 2) / 3),
          (R = I - 1),
          (J[j++] = I),
          (J[j++] = S),
          (J[j++] = R),
          (J[j++] = R),
          (J[j++] = S),
          (J[j++] = k),
          (B += 3),
          (U -= 3)
    }
    let K,
      Q,
      X = 0,
      Z = 0,
      $ = d[X++],
      tt = d[X++]
    for (D.set($, B), D.set(tt, U - tt.length + 1), W = r.Cartesian3.fromArray(f, Z, W), b = tt.length - 3, C = 0; C < b; C += 3)
      (K = i.geodeticSurfaceNormal(r.Cartesian3.fromArray($, C, F), F)),
        (Q = i.geodeticSurfaceNormal(r.Cartesian3.fromArray(tt, b - C, N), N)),
        (Y = r.Cartesian3.normalize(r.Cartesian3.add(K, Q, Y), Y)),
        M(O, Y, W, B, U, e),
        (S = B / 3),
        (k = S + 1),
        (I = (U - 2) / 3),
        (R = I - 1),
        (J[j++] = I),
        (J[j++] = S),
        (J[j++] = R),
        (J[j++] = R),
        (J[j++] = S),
        (J[j++] = k),
        (B += 3),
        (U -= 3)
    for (
      K = i.geodeticSurfaceNormal(r.Cartesian3.fromArray($, b, F), F),
        Q = i.geodeticSurfaceNormal(r.Cartesian3.fromArray(tt, b, N), N),
        Y = r.Cartesian3.normalize(r.Cartesian3.add(K, Q, Y), Y),
        Z += 3,
        C = 0;
      C < c.length;
      C++
    ) {
      let t
      h = c[C]
      const a = h.leftPositions,
        s = h.rightPositions
      let l,
        u,
        m = P,
        y = V,
        g = x
      if (((Y = r.Cartesian3.fromArray(p, Z, Y)), n.defined(a))) {
        for (M(O, Y, W, void 0, U, e), U -= 3, l = k, u = R, t = 0; t < a.length / 3; t++)
          (m = r.Cartesian3.fromArray(a, 3 * t, m)),
            (J[j++] = l),
            (J[j++] = u - t - 1),
            (J[j++] = u - t),
            o.CorridorGeometryLibrary.addAttribute(D, m, void 0, U),
            (y = r.Cartesian3.fromArray(D, 3 * (u - t - 1), y)),
            (g = r.Cartesian3.fromArray(D, 3 * l, g)),
            (W = r.Cartesian3.normalize(r.Cartesian3.subtract(y, g, W), W)),
            M(O, Y, W, void 0, U, e),
            (U -= 3)
        ;(m = r.Cartesian3.fromArray(D, 3 * l, m)),
          (y = r.Cartesian3.subtract(r.Cartesian3.fromArray(D, 3 * u, y), m, y)),
          (g = r.Cartesian3.subtract(r.Cartesian3.fromArray(D, 3 * (u - t), g), m, g)),
          (W = r.Cartesian3.normalize(r.Cartesian3.add(y, g, W), W)),
          M(O, Y, W, B, void 0, e),
          (B += 3)
      } else {
        for (M(O, Y, W, B, void 0, e), B += 3, l = R, u = k, t = 0; t < s.length / 3; t++)
          (m = r.Cartesian3.fromArray(s, 3 * t, m)),
            (J[j++] = l),
            (J[j++] = u + t),
            (J[j++] = u + t + 1),
            o.CorridorGeometryLibrary.addAttribute(D, m, B),
            (y = r.Cartesian3.fromArray(D, 3 * l, y)),
            (g = r.Cartesian3.fromArray(D, 3 * (u + t), g)),
            (W = r.Cartesian3.normalize(r.Cartesian3.subtract(y, g, W), W)),
            M(O, Y, W, B, void 0, e),
            (B += 3)
        ;(m = r.Cartesian3.fromArray(D, 3 * l, m)),
          (y = r.Cartesian3.subtract(r.Cartesian3.fromArray(D, 3 * (u + t), y), m, y)),
          (g = r.Cartesian3.subtract(r.Cartesian3.fromArray(D, 3 * u, g), m, g)),
          (W = r.Cartesian3.normalize(r.Cartesian3.negate(r.Cartesian3.add(g, y, W), W), W)),
          M(O, Y, W, void 0, U, e),
          (U -= 3)
      }
      for (
        $ = d[X++],
          tt = d[X++],
          $.splice(0, 3),
          tt.splice(tt.length - 3, 3),
          D.set($, B),
          D.set(tt, U - tt.length + 1),
          b = tt.length - 3,
          Z += 3,
          W = r.Cartesian3.fromArray(f, Z, W),
          t = 0;
        t < tt.length;
        t += 3
      )
        (K = i.geodeticSurfaceNormal(r.Cartesian3.fromArray($, t, F), F)),
          (Q = i.geodeticSurfaceNormal(r.Cartesian3.fromArray(tt, b - t, N), N)),
          (Y = r.Cartesian3.normalize(r.Cartesian3.add(K, Q, Y), Y)),
          M(O, Y, W, B, U, e),
          (k = B / 3),
          (S = k - 1),
          (R = (U - 2) / 3),
          (I = R + 1),
          (J[j++] = I),
          (J[j++] = S),
          (J[j++] = R),
          (J[j++] = R),
          (J[j++] = S),
          (J[j++] = k),
          (B += 3),
          (U -= 3)
      ;(B -= 3), (U += 3)
    }
    if (((Y = r.Cartesian3.fromArray(p, p.length - 3, Y)), M(O, Y, W, B, U, e), v)) {
      ;(B += 3), (U -= 3), (z = V), (H = x)
      const t = y[1]
      for (C = 0; C < q; C++)
        (z = r.Cartesian3.fromArray(t, 3 * (T - C - 1), z)),
          (H = r.Cartesian3.fromArray(t, 3 * C, H)),
          o.CorridorGeometryLibrary.addAttribute(D, z, void 0, U),
          o.CorridorGeometryLibrary.addAttribute(D, H, B),
          M(O, Y, W, B, U, e),
          (k = B / 3),
          (S = k - 1),
          (R = (U - 2) / 3),
          (I = R + 1),
          (J[j++] = I),
          (J[j++] = S),
          (J[j++] = R),
          (J[j++] = R),
          (J[j++] = S),
          (J[j++] = k),
          (B += 3),
          (U -= 3)
    }
    if (((g.position = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: D })), e.st)) {
      const t = new Float32Array((L / 3) * 2)
      let e,
        r,
        i = 0
      if (v) {
        ;(A /= 3), (_ /= 3)
        const a = Math.PI / (T + 1)
        let o
        ;(r = 1 / (A - T + 1)), (e = 1 / (_ - T + 1))
        const n = T / 2
        for (C = n + 1; C < T + 1; C++) (o = m.CesiumMath.PI_OVER_TWO + a * C), (t[i++] = e * (1 + Math.cos(o))), (t[i++] = 0.5 * (1 + Math.sin(o)))
        for (C = 1; C < _ - T + 1; C++) (t[i++] = C * e), (t[i++] = 0)
        for (C = T; C > n; C--) (o = m.CesiumMath.PI_OVER_TWO - C * a), (t[i++] = 1 - e * (1 + Math.cos(o))), (t[i++] = 0.5 * (1 + Math.sin(o)))
        for (C = n; C > 0; C--) (o = m.CesiumMath.PI_OVER_TWO - a * C), (t[i++] = 1 - r * (1 + Math.cos(o))), (t[i++] = 0.5 * (1 + Math.sin(o)))
        for (C = A - T; C > 0; C--) (t[i++] = C * r), (t[i++] = 1)
        for (C = 1; C < n + 1; C++) (o = m.CesiumMath.PI_OVER_TWO + a * C), (t[i++] = r * (1 + Math.cos(o))), (t[i++] = 0.5 * (1 + Math.sin(o)))
      } else {
        for (A /= 3, _ /= 3, r = 1 / (A - 1), e = 1 / (_ - 1), C = 0; C < _; C++) (t[i++] = C * e), (t[i++] = 0)
        for (C = A; C > 0; C--) (t[i++] = (C - 1) * r), (t[i++] = 1)
      }
      g.st = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: t })
    }
    return (
      e.normal &&
        (g.normal = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: O.normals })),
      e.tangent &&
        (g.tangent = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: O.tangents })),
      e.bitangent &&
        (g.bitangent = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: O.bitangents })),
      { attributes: g, indices: J }
    )
  }
  function I(t, e, r) {
    ;(r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2])
    for (let a = 3; a < t.length; a += 3) {
      const i = t[a],
        o = t[a + 1],
        n = t[a + 2]
      ;(r[e++] = i), (r[e++] = o), (r[e++] = n), (r[e++] = i), (r[e++] = o), (r[e++] = n)
    }
    return (r[e++] = t[0]), (r[e++] = t[1]), (r[e++] = t[2]), r
  }
  function S(t, e) {
    const i = new f.VertexFormat({
        position: e.position,
        normal: e.normal || e.bitangent || t.shadowVolume,
        tangent: e.tangent,
        bitangent: e.normal || e.bitangent,
        st: e.st
      }),
      l = t.ellipsoid,
      m = O(o.CorridorGeometryLibrary.computePositions(t), i, l),
      y = t.height,
      p = t.extrudedHeight
    let g = m.attributes
    const h = m.indices
    let C = g.position.values,
      b = C.length
    const A = new Float64Array(6 * b)
    let _ = new Float64Array(b)
    _.set(C)
    let w,
      v = new Float64Array(4 * b)
    ;(C = c.PolygonPipeline.scaleToGeodeticHeight(C, y, l)),
      (v = I(C, 0, v)),
      (_ = c.PolygonPipeline.scaleToGeodeticHeight(_, p, l)),
      (v = I(_, 2 * b, v)),
      A.set(C),
      A.set(_, b),
      A.set(v, 2 * b),
      (g.position.values = A),
      (g = (function (t, e) {
        if (!(e.normal || e.tangent || e.bitangent || e.st)) return t
        const a = t.position.values
        let i, n
        ;(e.normal || e.bitangent) && ((i = t.normal.values), (n = t.bitangent.values))
        const s = t.position.values.length / 18,
          l = 3 * s,
          d = 2 * s,
          u = 2 * l
        let m
        if (e.normal || e.bitangent || e.tangent) {
          const s = e.normal ? new Float32Array(6 * l) : void 0,
            d = e.tangent ? new Float32Array(6 * l) : void 0,
            c = e.bitangent ? new Float32Array(6 * l) : void 0
          let y = G,
            f = E,
            p = V,
            g = x,
            h = L,
            C = P,
            b = u
          for (m = 0; m < l; m += 3) {
            const t = b + u
            ;(y = r.Cartesian3.fromArray(a, m, y)),
              (f = r.Cartesian3.fromArray(a, m + l, f)),
              (p = r.Cartesian3.fromArray(a, (m + 3) % l, p)),
              (f = r.Cartesian3.subtract(f, y, f)),
              (p = r.Cartesian3.subtract(p, y, p)),
              (g = r.Cartesian3.normalize(r.Cartesian3.cross(f, p, g), g)),
              e.normal &&
                (o.CorridorGeometryLibrary.addAttribute(s, g, t),
                o.CorridorGeometryLibrary.addAttribute(s, g, t + 3),
                o.CorridorGeometryLibrary.addAttribute(s, g, b),
                o.CorridorGeometryLibrary.addAttribute(s, g, b + 3)),
              (e.tangent || e.bitangent) &&
                ((C = r.Cartesian3.fromArray(i, m, C)),
                e.bitangent &&
                  (o.CorridorGeometryLibrary.addAttribute(c, C, t),
                  o.CorridorGeometryLibrary.addAttribute(c, C, t + 3),
                  o.CorridorGeometryLibrary.addAttribute(c, C, b),
                  o.CorridorGeometryLibrary.addAttribute(c, C, b + 3)),
                e.tangent &&
                  ((h = r.Cartesian3.normalize(r.Cartesian3.cross(C, g, h), h)),
                  o.CorridorGeometryLibrary.addAttribute(d, h, t),
                  o.CorridorGeometryLibrary.addAttribute(d, h, t + 3),
                  o.CorridorGeometryLibrary.addAttribute(d, h, b),
                  o.CorridorGeometryLibrary.addAttribute(d, h, b + 3))),
              (b += 6)
          }
          if (e.normal) {
            for (s.set(i), m = 0; m < l; m += 3) (s[m + l] = -i[m]), (s[m + l + 1] = -i[m + 1]), (s[m + l + 2] = -i[m + 2])
            t.normal.values = s
          } else t.normal = void 0
          if ((e.bitangent ? (c.set(n), c.set(n, l), (t.bitangent.values = c)) : (t.bitangent = void 0), e.tangent)) {
            const e = t.tangent.values
            d.set(e), d.set(e, l), (t.tangent.values = d)
          }
        }
        if (e.st) {
          const e = t.st.values,
            r = new Float32Array(6 * d)
          r.set(e), r.set(e, d)
          let a = 2 * d
          for (let t = 0; t < 2; t++) {
            for (r[a++] = e[0], r[a++] = e[1], m = 2; m < d; m += 2) {
              const t = e[m],
                i = e[m + 1]
              ;(r[a++] = t), (r[a++] = i), (r[a++] = t), (r[a++] = i)
            }
            ;(r[a++] = e[0]), (r[a++] = e[1])
          }
          t.st.values = r
        }
        return t
      })(g, e))
    const T = b / 3
    if (t.shadowVolume) {
      const t = g.normal.values
      b = t.length
      let r = new Float32Array(6 * b)
      for (w = 0; w < b; w++) t[w] = -t[w]
      r.set(t, b),
        (r = I(t, 4 * b, r)),
        (g.extrudeDirection = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: r })),
        e.normal || (g.normal = void 0)
    }
    if (n.defined(t.offsetAttribute)) {
      let e = new Uint8Array(6 * T)
      if (t.offsetAttribute === d.GeometryOffsetAttribute.TOP) e = e.fill(1, 0, T).fill(1, 2 * T, 4 * T)
      else {
        const r = t.offsetAttribute === d.GeometryOffsetAttribute.NONE ? 0 : 1
        e = e.fill(r)
      }
      g.applyOffset = new s.GeometryAttribute({ componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE, componentsPerAttribute: 1, values: e })
    }
    const F = h.length,
      N = T + T,
      D = u.IndexDatatype.createTypedArray(A.length / 3, 2 * F + 3 * N)
    D.set(h)
    let M,
      S,
      R,
      k,
      H = F
    for (w = 0; w < F; w += 3) {
      const t = h[w],
        e = h[w + 1],
        r = h[w + 2]
      ;(D[H++] = r + T), (D[H++] = e + T), (D[H++] = t + T)
    }
    for (w = 0; w < N; w += 2)
      (M = w + N), (S = M + N), (R = M + 1), (k = S + 1), (D[H++] = M), (D[H++] = S), (D[H++] = R), (D[H++] = R), (D[H++] = S), (D[H++] = k)
    return { attributes: g, indices: D }
  }
  const R = new r.Cartesian3(),
    k = new r.Cartesian3(),
    H = new r.Cartographic()
  function z(t, e, a, i, o, n) {
    const s = r.Cartesian3.subtract(e, t, R)
    r.Cartesian3.normalize(s, s)
    const l = a.geodeticSurfaceNormal(t, k),
      d = r.Cartesian3.cross(s, l, R)
    r.Cartesian3.multiplyByScalar(d, i, d)
    let u = o.latitude,
      m = o.longitude,
      c = n.latitude,
      y = n.longitude
    r.Cartesian3.add(t, d, k), a.cartesianToCartographic(k, H)
    let f = H.latitude,
      p = H.longitude
    ;(u = Math.min(u, f)),
      (m = Math.min(m, p)),
      (c = Math.max(c, f)),
      (y = Math.max(y, p)),
      r.Cartesian3.subtract(t, d, k),
      a.cartesianToCartographic(k, H),
      (f = H.latitude),
      (p = H.longitude),
      (u = Math.min(u, f)),
      (m = Math.min(m, p)),
      (c = Math.max(c, f)),
      (y = Math.max(y, p)),
      (o.latitude = u),
      (o.longitude = m),
      (n.latitude = c),
      (n.longitude = y)
  }
  const B = new r.Cartesian3(),
    U = new r.Cartesian3(),
    Y = new r.Cartographic(),
    W = new r.Cartographic()
  function q(e, a, o, s, l) {
    e = D(e, a)
    const d = t.arrayRemoveDuplicates(e, r.Cartesian3.equalsEpsilon),
      u = d.length
    if (u < 2 || o <= 0) return new y.Rectangle()
    const m = 0.5 * o
    let c, f
    if (
      ((Y.latitude = Number.POSITIVE_INFINITY),
      (Y.longitude = Number.POSITIVE_INFINITY),
      (W.latitude = Number.NEGATIVE_INFINITY),
      (W.longitude = Number.NEGATIVE_INFINITY),
      s === i.CornerType.ROUNDED)
    ) {
      const t = d[0]
      r.Cartesian3.subtract(t, d[1], B),
        r.Cartesian3.normalize(B, B),
        r.Cartesian3.multiplyByScalar(B, m, B),
        r.Cartesian3.add(t, B, U),
        a.cartesianToCartographic(U, H),
        (c = H.latitude),
        (f = H.longitude),
        (Y.latitude = Math.min(Y.latitude, c)),
        (Y.longitude = Math.min(Y.longitude, f)),
        (W.latitude = Math.max(W.latitude, c)),
        (W.longitude = Math.max(W.longitude, f))
    }
    for (let t = 0; t < u - 1; ++t) z(d[t], d[t + 1], a, m, Y, W)
    const p = d[u - 1]
    r.Cartesian3.subtract(p, d[u - 2], B),
      r.Cartesian3.normalize(B, B),
      r.Cartesian3.multiplyByScalar(B, m, B),
      r.Cartesian3.add(p, B, U),
      z(p, U, a, m, Y, W),
      s === i.CornerType.ROUNDED &&
        (a.cartesianToCartographic(U, H),
        (c = H.latitude),
        (f = H.longitude),
        (Y.latitude = Math.min(Y.latitude, c)),
        (Y.longitude = Math.min(Y.longitude, f)),
        (W.latitude = Math.max(W.latitude, c)),
        (W.longitude = Math.max(W.longitude, f)))
    const g = n.defined(l) ? l : new y.Rectangle()
    return (g.north = W.latitude), (g.south = Y.latitude), (g.east = W.longitude), (g.west = Y.longitude), g
  }
  function J(t) {
    const e = (t = n.defaultValue(t, n.defaultValue.EMPTY_OBJECT)).positions,
      a = t.width,
      o = n.defaultValue(t.height, 0),
      s = n.defaultValue(t.extrudedHeight, o)
    ;(this._positions = e),
      (this._ellipsoid = r.Ellipsoid.clone(n.defaultValue(t.ellipsoid, r.Ellipsoid.WGS84))),
      (this._vertexFormat = f.VertexFormat.clone(n.defaultValue(t.vertexFormat, f.VertexFormat.DEFAULT))),
      (this._width = a),
      (this._height = Math.max(o, s)),
      (this._extrudedHeight = Math.min(o, s)),
      (this._cornerType = n.defaultValue(t.cornerType, i.CornerType.ROUNDED)),
      (this._granularity = n.defaultValue(t.granularity, m.CesiumMath.RADIANS_PER_DEGREE)),
      (this._shadowVolume = n.defaultValue(t.shadowVolume, !1)),
      (this._workerName = 'createCorridorGeometry'),
      (this._offsetAttribute = t.offsetAttribute),
      (this._rectangle = void 0),
      (this.packedLength = 1 + e.length * r.Cartesian3.packedLength + r.Ellipsoid.packedLength + f.VertexFormat.packedLength + 7)
  }
  J.pack = function (t, e, a) {
    a = n.defaultValue(a, 0)
    const i = t._positions,
      o = i.length
    e[a++] = o
    for (let t = 0; t < o; ++t, a += r.Cartesian3.packedLength) r.Cartesian3.pack(i[t], e, a)
    return (
      r.Ellipsoid.pack(t._ellipsoid, e, a),
      (a += r.Ellipsoid.packedLength),
      f.VertexFormat.pack(t._vertexFormat, e, a),
      (a += f.VertexFormat.packedLength),
      (e[a++] = t._width),
      (e[a++] = t._height),
      (e[a++] = t._extrudedHeight),
      (e[a++] = t._cornerType),
      (e[a++] = t._granularity),
      (e[a++] = t._shadowVolume ? 1 : 0),
      (e[a] = n.defaultValue(t._offsetAttribute, -1)),
      e
    )
  }
  const j = r.Ellipsoid.clone(r.Ellipsoid.UNIT_SPHERE),
    K = new f.VertexFormat(),
    Q = {
      positions: void 0,
      ellipsoid: j,
      vertexFormat: K,
      width: void 0,
      height: void 0,
      extrudedHeight: void 0,
      cornerType: void 0,
      granularity: void 0,
      shadowVolume: void 0,
      offsetAttribute: void 0
    }
  return (
    (J.unpack = function (t, e, a) {
      e = n.defaultValue(e, 0)
      const i = t[e++],
        o = new Array(i)
      for (let a = 0; a < i; ++a, e += r.Cartesian3.packedLength) o[a] = r.Cartesian3.unpack(t, e)
      const s = r.Ellipsoid.unpack(t, e, j)
      e += r.Ellipsoid.packedLength
      const l = f.VertexFormat.unpack(t, e, K)
      e += f.VertexFormat.packedLength
      const d = t[e++],
        u = t[e++],
        m = t[e++],
        c = t[e++],
        y = t[e++],
        p = 1 === t[e++],
        g = t[e]
      return n.defined(a)
        ? ((a._positions = o),
          (a._ellipsoid = r.Ellipsoid.clone(s, a._ellipsoid)),
          (a._vertexFormat = f.VertexFormat.clone(l, a._vertexFormat)),
          (a._width = d),
          (a._height = u),
          (a._extrudedHeight = m),
          (a._cornerType = c),
          (a._granularity = y),
          (a._shadowVolume = p),
          (a._offsetAttribute = -1 === g ? void 0 : g),
          a)
        : ((Q.positions = o),
          (Q.width = d),
          (Q.height = u),
          (Q.extrudedHeight = m),
          (Q.cornerType = c),
          (Q.granularity = y),
          (Q.shadowVolume = p),
          (Q.offsetAttribute = -1 === g ? void 0 : g),
          new J(Q))
    }),
    (J.computeRectangle = function (t, e) {
      const a = (t = n.defaultValue(t, n.defaultValue.EMPTY_OBJECT)).positions,
        o = t.width
      return q(a, n.defaultValue(t.ellipsoid, r.Ellipsoid.WGS84), o, n.defaultValue(t.cornerType, i.CornerType.ROUNDED), e)
    }),
    (J.createGeometry = function (i) {
      let l = i._positions
      const u = i._width,
        y = i._ellipsoid
      l = D(l, y)
      const f = t.arrayRemoveDuplicates(l, r.Cartesian3.equalsEpsilon)
      if (f.length < 2 || u <= 0) return
      const p = i._height,
        g = i._extrudedHeight,
        h = !m.CesiumMath.equalsEpsilon(p, g, 0, m.CesiumMath.EPSILON2),
        C = i._vertexFormat,
        b = { ellipsoid: y, positions: f, width: u, cornerType: i._cornerType, granularity: i._granularity, saveAttributes: !0 }
      let A
      if (h) (b.height = p), (b.extrudedHeight = g), (b.shadowVolume = i._shadowVolume), (b.offsetAttribute = i._offsetAttribute), (A = S(b, C))
      else {
        if (
          ((A = O(o.CorridorGeometryLibrary.computePositions(b), C, y)),
          (A.attributes.position.values = c.PolygonPipeline.scaleToGeodeticHeight(A.attributes.position.values, p, y)),
          n.defined(i._offsetAttribute))
        ) {
          const t = i._offsetAttribute === d.GeometryOffsetAttribute.NONE ? 0 : 1,
            e = A.attributes.position.values.length,
            r = new Uint8Array(e / 3).fill(t)
          A.attributes.applyOffset = new s.GeometryAttribute({
            componentDatatype: a.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 1,
            values: r
          })
        }
      }
      const _ = A.attributes,
        w = e.BoundingSphere.fromVertices(_.position.values, void 0, 3)
      return (
        C.position || (A.attributes.position.values = void 0),
        new s.Geometry({
          attributes: _,
          indices: A.indices,
          primitiveType: s.PrimitiveType.TRIANGLES,
          boundingSphere: w,
          offsetAttribute: i._offsetAttribute
        })
      )
    }),
    (J.createShadowVolume = function (t, e, r) {
      const a = t._granularity,
        i = t._ellipsoid,
        o = e(a, i),
        n = r(a, i)
      return new J({
        positions: t._positions,
        width: t._width,
        cornerType: t._cornerType,
        ellipsoid: i,
        granularity: a,
        extrudedHeight: o,
        height: n,
        vertexFormat: f.VertexFormat.POSITION_ONLY,
        shadowVolume: !0
      })
    }),
    Object.defineProperties(J.prototype, {
      rectangle: {
        get: function () {
          return n.defined(this._rectangle) || (this._rectangle = q(this._positions, this._ellipsoid, this._width, this._cornerType)), this._rectangle
        }
      },
      textureCoordinateRotationPoints: {
        get: function () {
          return [0, 0, 0, 1, 1, 0]
        }
      }
    }),
    function (t, e) {
      return n.defined(e) && (t = J.unpack(t, e)), (t._ellipsoid = r.Ellipsoid.clone(t._ellipsoid)), J.createGeometry(t)
    }
  )
})
