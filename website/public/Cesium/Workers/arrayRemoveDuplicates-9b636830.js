define(['exports', './defaultValue-f6d5e6da', './Math-2ce22ee9'], function (e, n, t) {
  'use strict'
  const i = t.CesiumMath.EPSILON10
  e.arrayRemoveDuplicates = function (e, t, d, f) {
    if (!n.defined(e)) return
    d = n.defaultValue(d, !1)
    const u = n.defined(f),
      s = e.length
    if (s < 2) return e
    let l,
      r,
      a,
      c = e[0],
      h = 0,
      o = -1
    for (l = 1; l < s; ++l)
      (r = e[l]),
        t(c, r, i)
          ? (n.defined(a) || ((a = e.slice(0, l)), (h = l - 1), (o = 0)), u && f.push(l))
          : (n.defined(a) && (a.push(r), (h = l), u && (o = f.length)), (c = r))
    return (
      d && t(e[0], e[s - 1], i) && (u && (n.defined(a) ? f.splice(o, 0, h) : f.push(s - 1)), n.defined(a) ? (a.length -= 1) : (a = e.slice(0, -1))),
      n.defined(a) ? a : e
    )
  }
})
