define(['exports', './defaultValue-f6d5e6da'], function (t, e) {
  'use strict'
  function r(t) {
    let e
    ;(this.name = 'RuntimeError'), (this.message = t)
    try {
      throw new Error()
    } catch (t) {
      e = t.stack
    }
    this.stack = e
  }
  e.defined(Object.create) && ((r.prototype = Object.create(Error.prototype)), (r.prototype.constructor = r)),
    (r.prototype.toString = function () {
      let t = `${this.name}: ${this.message}`
      return e.defined(this.stack) && (t += `\n${this.stack.toString()}`), t
    }),
    (t.RuntimeError = r)
})
