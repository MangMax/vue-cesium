define(['exports', './defaultValue-f6d5e6da'], function (e, t) {
  'use strict'
  e.combine = function e(n, o, r) {
    r = t.defaultValue(r, !1)
    const f = {},
      i = t.defined(n),
      a = t.defined(o)
    let s, u, c
    if (i)
      for (s in n)
        n.hasOwnProperty(s) &&
          ((u = n[s]),
          a && r && 'object' == typeof u && o.hasOwnProperty(s) ? ((c = o[s]), (f[s] = 'object' == typeof c ? e(u, c, r) : u)) : (f[s] = u))
    if (a) for (s in o) o.hasOwnProperty(s) && !f.hasOwnProperty(s) && ((c = o[s]), (f[s] = c))
    return f
  }
})
