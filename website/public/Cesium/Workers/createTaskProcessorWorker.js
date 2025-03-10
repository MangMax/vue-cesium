define(['./defaultValue-f6d5e6da'], function (e) {
  'use strict'
  return function (r) {
    let t
    return function (n) {
      const s = n.data,
        a = [],
        i = { id: s.id, result: void 0, error: void 0 }
      return Promise.resolve(
        (function (e, r, t) {
          let n
          try {
            return (n = e(r, t)), n
          } catch (e) {
            return Promise.reject(e)
          }
        })(r, s.parameters, a)
      )
        .then(function (e) {
          i.result = e
        })
        .catch(function (e) {
          e instanceof Error ? (i.error = { name: e.name, message: e.message, stack: e.stack }) : (i.error = e)
        })
        .finally(function () {
          e.defined(t) || (t = e.defaultValue(self.webkitPostMessage, self.postMessage)), s.canTransferArrayBuffer || (a.length = 0)
          try {
            t(i, a)
          } catch (r) {
            ;(i.result = void 0),
              (i.error = `postMessage failed with error: ${(function (r) {
                let t
                const n = r.name,
                  s = r.message
                t = e.defined(n) && e.defined(s) ? `${n}: ${s}` : r.toString()
                const a = r.stack
                return e.defined(a) && (t += `\n${a}`), t
              })(r)}\n  with responseMessage: ${JSON.stringify(i)}`),
              t(i)
          }
        })
    }
  }
})
