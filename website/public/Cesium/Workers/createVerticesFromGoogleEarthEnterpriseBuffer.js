define([
  './AxisAlignedBoundingBox-2c0751ca',
  './Transforms-20461479',
  './Matrix2-413c4048',
  './Matrix3-81054f0f',
  './defaultValue-f6d5e6da',
  './TerrainEncoding-7a03fd29',
  './Math-2ce22ee9',
  './OrientedBoundingBox-fc7f7ca4',
  './RuntimeError-9b4ce3fb',
  './WebMercatorProjection-943e2226',
  './createTaskProcessorWorker',
  './combine-0c102d93',
  './AttributeCompression-48e336db',
  './ComponentDatatype-ab629b88',
  './WebGLConstants-7f557f93',
  './EllipsoidTangentPlane-d430e7d5',
  './IntersectionTests-a57eed59',
  './Plane-6add0ae1'
], function (t, e, n, i, o, r, a, s, c, u, h, l, d, g, m, p, I, E) {
  'use strict'
  const T = Uint16Array.BYTES_PER_ELEMENT,
    f = Int32Array.BYTES_PER_ELEMENT,
    C = Uint32Array.BYTES_PER_ELEMENT,
    M = Float32Array.BYTES_PER_ELEMENT,
    x = Float64Array.BYTES_PER_ELEMENT
  function N(t, e, n) {
    n = o.defaultValue(n, a.CesiumMath)
    const i = t.length
    for (let o = 0; o < i; ++o) if (n.equalsEpsilon(t[o], e, a.CesiumMath.EPSILON12)) return o
    return -1
  }
  const S = new i.Cartographic(),
    b = new i.Cartesian3(),
    w = new i.Cartesian3(),
    B = new i.Cartesian3(),
    P = new n.Matrix4()
  function A(t, e, r, s, c, u, h, l, d, g, m) {
    const p = l.length
    for (let I = 0; I < p; ++I) {
      const E = l[I],
        T = E.cartographic,
        f = E.index,
        C = t.length,
        M = T.longitude
      let x = T.latitude
      x = a.CesiumMath.clamp(x, -a.CesiumMath.PI_OVER_TWO, a.CesiumMath.PI_OVER_TWO)
      const N = T.height - h.skirtHeight
      ;(h.hMin = Math.min(h.hMin, N)),
        i.Cartographic.fromRadians(M, x, N, S),
        g && (S.longitude += d),
        g ? (I === p - 1 ? (S.latitude += m) : 0 === I && (S.latitude -= m)) : (S.latitude += d)
      const w = h.ellipsoid.cartographicToCartesian(S)
      t.push(w),
        e.push(N),
        r.push(n.Cartesian2.clone(r[f])),
        s.length > 0 && s.push(s[f]),
        c.length > 0 && c.push(c[f]),
        n.Matrix4.multiplyByPoint(h.toENU, w, b)
      const B = h.minimum,
        P = h.maximum
      i.Cartesian3.minimumByComponent(b, B, B), i.Cartesian3.maximumByComponent(b, P, P)
      const A = h.lastBorderPoint
      if (o.defined(A)) {
        const t = A.index
        u.push(t, C - 1, C, C, f, t)
      }
      h.lastBorderPoint = E
    }
  }
  return h(function (h, l) {
    ;(h.ellipsoid = i.Ellipsoid.clone(h.ellipsoid)), (h.rectangle = n.Rectangle.clone(h.rectangle))
    const d = (function (h, l, d, g, m, p, I, E, y, R, _) {
        let W, v, F, O, V, Y
        o.defined(g)
          ? ((W = g.west), (v = g.south), (F = g.east), (O = g.north), (V = g.width), (Y = g.height))
          : ((W = a.CesiumMath.toRadians(m.west)),
            (v = a.CesiumMath.toRadians(m.south)),
            (F = a.CesiumMath.toRadians(m.east)),
            (O = a.CesiumMath.toRadians(m.north)),
            (V = a.CesiumMath.toRadians(g.width)),
            (Y = a.CesiumMath.toRadians(g.height)))
        const U = [v, O],
          k = [W, F],
          H = e.Transforms.eastNorthUpToFixedFrame(l, d),
          L = n.Matrix4.inverseTransformation(H, P)
        let j, D
        y &&
          ((j = u.WebMercatorProjection.geodeticLatitudeToMercatorAngle(v)),
          (D = 1 / (u.WebMercatorProjection.geodeticLatitudeToMercatorAngle(O) - j)))
        const G = 1 !== p,
          z = new DataView(h)
        let q = Number.POSITIVE_INFINITY,
          J = Number.NEGATIVE_INFINITY
        const K = w
        ;(K.x = Number.POSITIVE_INFINITY), (K.y = Number.POSITIVE_INFINITY), (K.z = Number.POSITIVE_INFINITY)
        const Q = B
        ;(Q.x = Number.NEGATIVE_INFINITY), (Q.y = Number.NEGATIVE_INFINITY), (Q.z = Number.NEGATIVE_INFINITY)
        let X,
          Z,
          $ = 0,
          tt = 0,
          et = 0
        for (Z = 0; Z < 4; ++Z) {
          let t = $
          ;(X = z.getUint32(t, !0)), (t += C)
          const e = a.CesiumMath.toRadians(180 * z.getFloat64(t, !0))
          ;(t += x), -1 === N(k, e) && k.push(e)
          const n = a.CesiumMath.toRadians(180 * z.getFloat64(t, !0))
          ;(t += x), -1 === N(U, n) && U.push(n), (t += 2 * x)
          let i = z.getInt32(t, !0)
          ;(t += f), (tt += i), (i = z.getInt32(t, !0)), (et += 3 * i), ($ += X + C)
        }
        const nt = [],
          it = [],
          ot = new Array(tt),
          rt = new Array(tt),
          at = new Array(tt),
          st = y ? new Array(tt) : [],
          ct = G ? new Array(tt) : [],
          ut = new Array(et),
          ht = [],
          lt = [],
          dt = [],
          gt = []
        let mt = 0,
          pt = 0
        for ($ = 0, Z = 0; Z < 4; ++Z) {
          ;(X = z.getUint32($, !0)), ($ += C)
          const t = $,
            e = a.CesiumMath.toRadians(180 * z.getFloat64($, !0))
          $ += x
          const o = a.CesiumMath.toRadians(180 * z.getFloat64($, !0))
          $ += x
          const r = a.CesiumMath.toRadians(180 * z.getFloat64($, !0)),
            s = 0.5 * r
          $ += x
          const h = a.CesiumMath.toRadians(180 * z.getFloat64($, !0)),
            l = 0.5 * h
          $ += x
          const g = z.getInt32($, !0)
          $ += f
          const m = z.getInt32($, !0)
          ;($ += f), ($ += f)
          const p = new Array(g)
          for (let t = 0; t < g; ++t) {
            const c = e + z.getUint8($++) * r
            S.longitude = c
            const g = o + z.getUint8($++) * h
            S.latitude = g
            let m = z.getFloat32($, !0)
            if ((($ += M), 0 !== m && m < _ && (m *= -Math.pow(2, R)), (m *= 6371010), (S.height = m), -1 !== N(k, c) || -1 !== N(U, g))) {
              const e = N(nt, S, i.Cartographic)
              if (-1 !== e) {
                p[t] = it[e]
                continue
              }
              nt.push(i.Cartographic.clone(S)), it.push(mt)
            }
            ;(p[t] = mt),
              Math.abs(c - W) < s
                ? ht.push({ index: mt, cartographic: i.Cartographic.clone(S) })
                : Math.abs(c - F) < s
                ? dt.push({ index: mt, cartographic: i.Cartographic.clone(S) })
                : Math.abs(g - v) < l
                ? lt.push({ index: mt, cartographic: i.Cartographic.clone(S) })
                : Math.abs(g - O) < l && gt.push({ index: mt, cartographic: i.Cartographic.clone(S) }),
              (q = Math.min(m, q)),
              (J = Math.max(m, J)),
              (at[mt] = m)
            const I = d.cartographicToCartesian(S)
            if (((ot[mt] = I), y && (st[mt] = (u.WebMercatorProjection.geodeticLatitudeToMercatorAngle(g) - j) * D), G)) {
              const t = d.geodeticSurfaceNormal(I)
              ct[mt] = t
            }
            n.Matrix4.multiplyByPoint(L, I, b), i.Cartesian3.minimumByComponent(b, K, K), i.Cartesian3.maximumByComponent(b, Q, Q)
            let E = (c - W) / (F - W)
            E = a.CesiumMath.clamp(E, 0, 1)
            let T = (g - v) / (O - v)
            ;(T = a.CesiumMath.clamp(T, 0, 1)), (rt[mt] = new n.Cartesian2(E, T)), ++mt
          }
          const I = 3 * m
          for (let t = 0; t < I; ++t, ++pt) (ut[pt] = p[z.getUint16($, !0)]), ($ += T)
          if (X !== $ - t) throw new c.RuntimeError('Invalid terrain tile.')
        }
        ;(ot.length = mt), (rt.length = mt), (at.length = mt), y && (st.length = mt)
        G && (ct.length = mt)
        const It = mt,
          Et = pt,
          Tt = { hMin: q, lastBorderPoint: void 0, skirtHeight: E, toENU: L, ellipsoid: d, minimum: K, maximum: Q }
        ht.sort(function (t, e) {
          return e.cartographic.latitude - t.cartographic.latitude
        }),
          lt.sort(function (t, e) {
            return t.cartographic.longitude - e.cartographic.longitude
          }),
          dt.sort(function (t, e) {
            return t.cartographic.latitude - e.cartographic.latitude
          }),
          gt.sort(function (t, e) {
            return e.cartographic.longitude - t.cartographic.longitude
          })
        const ft = 1e-5
        if (
          (A(ot, at, rt, st, ct, ut, Tt, ht, -ft * V, !0, -ft * Y),
          A(ot, at, rt, st, ct, ut, Tt, lt, -ft * Y, !1),
          A(ot, at, rt, st, ct, ut, Tt, dt, ft * V, !0, ft * Y),
          A(ot, at, rt, st, ct, ut, Tt, gt, ft * Y, !1),
          ht.length > 0 && gt.length > 0)
        ) {
          const t = ht[0].index,
            e = It,
            n = gt[gt.length - 1].index,
            i = ot.length - 1
          ut.push(n, i, e, e, t, n)
        }
        tt = ot.length
        const Ct = e.BoundingSphere.fromPoints(ot)
        let Mt
        o.defined(g) && (Mt = s.OrientedBoundingBox.fromRectangle(g, q, J, d))
        const xt = new r.EllipsoidalOccluder(d).computeHorizonCullingPointPossiblyUnderEllipsoid(l, ot, q),
          Nt = new t.AxisAlignedBoundingBox(K, Q, l),
          St = new r.TerrainEncoding(l, Nt, Tt.hMin, J, H, !1, y, G, p, I),
          bt = new Float32Array(tt * St.stride)
        let wt = 0
        for (let t = 0; t < tt; ++t) wt = St.encode(bt, wt, ot[t], rt[t], at[t], void 0, st[t], ct[t])
        const Bt = ht
            .map(function (t) {
              return t.index
            })
            .reverse(),
          Pt = lt
            .map(function (t) {
              return t.index
            })
            .reverse(),
          At = dt
            .map(function (t) {
              return t.index
            })
            .reverse(),
          yt = gt
            .map(function (t) {
              return t.index
            })
            .reverse()
        return (
          Pt.unshift(At[At.length - 1]),
          Pt.push(Bt[0]),
          yt.unshift(Bt[Bt.length - 1]),
          yt.push(At[0]),
          {
            vertices: bt,
            indices: new Uint16Array(ut),
            maximumHeight: J,
            minimumHeight: q,
            encoding: St,
            boundingSphere3D: Ct,
            orientedBoundingBox: Mt,
            occludeePointInScaledSpace: xt,
            vertexCountWithoutSkirts: It,
            indexCountWithoutSkirts: Et,
            westIndicesSouthToNorth: Bt,
            southIndicesEastToWest: Pt,
            eastIndicesNorthToSouth: At,
            northIndicesWestToEast: yt
          }
        )
      })(
        h.buffer,
        h.relativeToCenter,
        h.ellipsoid,
        h.rectangle,
        h.nativeRectangle,
        h.exaggeration,
        h.exaggerationRelativeHeight,
        h.skirtHeight,
        h.includeWebMercatorT,
        h.negativeAltitudeExponentBias,
        h.negativeElevationThreshold
      ),
      g = d.vertices
    l.push(g.buffer)
    const m = d.indices
    return (
      l.push(m.buffer),
      {
        vertices: g.buffer,
        indices: m.buffer,
        numberOfAttributes: d.encoding.stride,
        minimumHeight: d.minimumHeight,
        maximumHeight: d.maximumHeight,
        boundingSphere3D: d.boundingSphere3D,
        orientedBoundingBox: d.orientedBoundingBox,
        occludeePointInScaledSpace: d.occludeePointInScaledSpace,
        encoding: d.encoding,
        vertexCountWithoutSkirts: d.vertexCountWithoutSkirts,
        indexCountWithoutSkirts: d.indexCountWithoutSkirts,
        westIndicesSouthToNorth: d.westIndicesSouthToNorth,
        southIndicesEastToWest: d.southIndicesEastToWest,
        eastIndicesNorthToSouth: d.eastIndicesNorthToSouth,
        northIndicesWestToEast: d.northIndicesWestToEast
      }
    )
  })
})
