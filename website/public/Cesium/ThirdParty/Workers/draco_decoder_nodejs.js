var $jscomp = $jscomp || {}
;($jscomp.scope = {}),
  ($jscomp.arrayIteratorImpl = function (p) {
    var s = 0
    return function () {
      return s < p.length ? { done: !1, value: p[s++] } : { done: !0 }
    }
  }),
  ($jscomp.arrayIterator = function (p) {
    return { next: $jscomp.arrayIteratorImpl(p) }
  }),
  ($jscomp.makeIterator = function (p) {
    var s = typeof Symbol < 'u' && Symbol.iterator && p[Symbol.iterator]
    return s ? s.call(p) : $jscomp.arrayIterator(p)
  }),
  ($jscomp.ASSUME_ES5 = !1),
  ($jscomp.ASSUME_NO_NATIVE_MAP = !1),
  ($jscomp.ASSUME_NO_NATIVE_SET = !1),
  ($jscomp.SIMPLE_FROUND_POLYFILL = !1),
  ($jscomp.ISOLATE_POLYFILLS = !1),
  ($jscomp.FORCE_POLYFILL_PROMISE = !1),
  ($jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION = !1),
  ($jscomp.getGlobal = function (p) {
    p = [
      typeof globalThis == 'object' && globalThis,
      p,
      typeof window == 'object' && window,
      typeof self == 'object' && self,
      typeof global == 'object' && global
    ]
    for (var s = 0; s < p.length; ++s) {
      var a = p[s]
      if (a && a.Math == Math) return a
    }
    throw Error('Cannot find global object')
  }),
  ($jscomp.global = $jscomp.getGlobal(this)),
  ($jscomp.defineProperty =
    $jscomp.ASSUME_ES5 || typeof Object.defineProperties == 'function'
      ? Object.defineProperty
      : function (p, s, a) {
          return p == Array.prototype || p == Object.prototype || (p[s] = a.value), p
        }),
  ($jscomp.IS_SYMBOL_NATIVE = typeof Symbol == 'function' && typeof Symbol('x') == 'symbol'),
  ($jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE),
  ($jscomp.polyfills = {}),
  ($jscomp.propertyToPolyfillSymbol = {}),
  ($jscomp.POLYFILL_PREFIX = '$jscp$')
var $jscomp$lookupPolyfilledValue = function (p, s) {
  var a = $jscomp.propertyToPolyfillSymbol[s]
  return a == null ? p[s] : ((a = p[a]), a !== void 0 ? a : p[s])
}
;($jscomp.polyfill = function (p, s, a, c) {
  s && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(p, s, a, c) : $jscomp.polyfillUnisolated(p, s, a, c))
}),
  ($jscomp.polyfillUnisolated = function (p, s, a, c) {
    for (a = $jscomp.global, p = p.split('.'), c = 0; c < p.length - 1; c++) {
      var i = p[c]
      if (!(i in a)) return
      a = a[i]
    }
    ;(p = p[p.length - 1]), (c = a[p]), (s = s(c)), s != c && s != null && $jscomp.defineProperty(a, p, { configurable: !0, writable: !0, value: s })
  }),
  ($jscomp.polyfillIsolated = function (p, s, a, c) {
    var i = p.split('.')
    ;(p = i.length === 1), (c = i[0]), (c = !p && c in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global)
    for (var I = 0; I < i.length - 1; I++) {
      var _ = i[I]
      if (!(_ in c)) return
      c = c[_]
    }
    ;(i = i[i.length - 1]),
      (a = $jscomp.IS_SYMBOL_NATIVE && a === 'es6' ? c[i] : null),
      (s = s(a)),
      s != null &&
        (p
          ? $jscomp.defineProperty($jscomp.polyfills, i, { configurable: !0, writable: !0, value: s })
          : s !== a &&
            ($jscomp.propertyToPolyfillSymbol[i] === void 0 &&
              ((a = (1e9 * Math.random()) >>> 0),
              ($jscomp.propertyToPolyfillSymbol[i] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(i) : $jscomp.POLYFILL_PREFIX + a + '$' + i)),
            $jscomp.defineProperty(c, $jscomp.propertyToPolyfillSymbol[i], { configurable: !0, writable: !0, value: s })))
  }),
  $jscomp.polyfill(
    'Promise',
    function (p) {
      function s() {
        this.batch_ = null
      }
      function a(_) {
        return _ instanceof i
          ? _
          : new i(function (y, b) {
              y(_)
            })
      }
      if (
        p &&
        (!(
          $jscomp.FORCE_POLYFILL_PROMISE ||
          ($jscomp.FORCE_POLYFILL_PROMISE_WHEN_NO_UNHANDLED_REJECTION && typeof $jscomp.global.PromiseRejectionEvent > 'u')
        ) ||
          !$jscomp.global.Promise ||
          $jscomp.global.Promise.toString().indexOf('[native code]') === -1)
      )
        return p
      s.prototype.asyncExecute = function (_) {
        if (this.batch_ == null) {
          this.batch_ = []
          var y = this
          this.asyncExecuteFunction(function () {
            y.executeBatch_()
          })
        }
        this.batch_.push(_)
      }
      var c = $jscomp.global.setTimeout
      ;(s.prototype.asyncExecuteFunction = function (_) {
        c(_, 0)
      }),
        (s.prototype.executeBatch_ = function () {
          for (; this.batch_ && this.batch_.length; ) {
            var _ = this.batch_
            this.batch_ = []
            for (var y = 0; y < _.length; ++y) {
              var b = _[y]
              _[y] = null
              try {
                b()
              } catch (D) {
                this.asyncThrow_(D)
              }
            }
          }
          this.batch_ = null
        }),
        (s.prototype.asyncThrow_ = function (_) {
          this.asyncExecuteFunction(function () {
            throw _
          })
        })
      var i = function (_) {
        ;(this.state_ = 0), (this.result_ = void 0), (this.onSettledCallbacks_ = []), (this.isRejectionHandled_ = !1)
        var y = this.createResolveAndReject_()
        try {
          _(y.resolve, y.reject)
        } catch (b) {
          y.reject(b)
        }
      }
      ;(i.prototype.createResolveAndReject_ = function () {
        function _(D) {
          return function (L) {
            b || ((b = !0), D.call(y, L))
          }
        }
        var y = this,
          b = !1
        return { resolve: _(this.resolveTo_), reject: _(this.reject_) }
      }),
        (i.prototype.resolveTo_ = function (_) {
          if (_ === this) this.reject_(new TypeError('A Promise cannot resolve to itself'))
          else if (_ instanceof i) this.settleSameAsPromise_(_)
          else {
            t: switch (typeof _) {
              case 'object':
                var y = _ != null
                break t
              case 'function':
                y = !0
                break t
              default:
                y = !1
            }
            y ? this.resolveToNonPromiseObj_(_) : this.fulfill_(_)
          }
        }),
        (i.prototype.resolveToNonPromiseObj_ = function (_) {
          var y = void 0
          try {
            y = _.then
          } catch (b) {
            this.reject_(b)
            return
          }
          typeof y == 'function' ? this.settleSameAsThenable_(y, _) : this.fulfill_(_)
        }),
        (i.prototype.reject_ = function (_) {
          this.settle_(2, _)
        }),
        (i.prototype.fulfill_ = function (_) {
          this.settle_(1, _)
        }),
        (i.prototype.settle_ = function (_, y) {
          if (this.state_ != 0) throw Error('Cannot settle(' + _ + ', ' + y + '): Promise already settled in state' + this.state_)
          ;(this.state_ = _), (this.result_ = y), this.state_ === 2 && this.scheduleUnhandledRejectionCheck_(), this.executeOnSettledCallbacks_()
        }),
        (i.prototype.scheduleUnhandledRejectionCheck_ = function () {
          var _ = this
          c(function () {
            if (_.notifyUnhandledRejection_()) {
              var y = $jscomp.global.console
              typeof y < 'u' && y.error(_.result_)
            }
          }, 1)
        }),
        (i.prototype.notifyUnhandledRejection_ = function () {
          if (this.isRejectionHandled_) return !1
          var _ = $jscomp.global.CustomEvent,
            y = $jscomp.global.Event,
            b = $jscomp.global.dispatchEvent
          return typeof b > 'u'
            ? !0
            : (typeof _ == 'function'
                ? (_ = new _('unhandledrejection', { cancelable: !0 }))
                : typeof y == 'function'
                ? (_ = new y('unhandledrejection', { cancelable: !0 }))
                : ((_ = $jscomp.global.document.createEvent('CustomEvent')), _.initCustomEvent('unhandledrejection', !1, !0, _)),
              (_.promise = this),
              (_.reason = this.result_),
              b(_))
        }),
        (i.prototype.executeOnSettledCallbacks_ = function () {
          if (this.onSettledCallbacks_ != null) {
            for (var _ = 0; _ < this.onSettledCallbacks_.length; ++_) I.asyncExecute(this.onSettledCallbacks_[_])
            this.onSettledCallbacks_ = null
          }
        })
      var I = new s()
      return (
        (i.prototype.settleSameAsPromise_ = function (_) {
          var y = this.createResolveAndReject_()
          _.callWhenSettled_(y.resolve, y.reject)
        }),
        (i.prototype.settleSameAsThenable_ = function (_, y) {
          var b = this.createResolveAndReject_()
          try {
            _.call(y, b.resolve, b.reject)
          } catch (D) {
            b.reject(D)
          }
        }),
        (i.prototype.then = function (_, y) {
          function b(m, A) {
            return typeof m == 'function'
              ? function (E) {
                  try {
                    D(m(E))
                  } catch (z) {
                    L(z)
                  }
                }
              : A
          }
          var D,
            L,
            X = new i(function (m, A) {
              ;(D = m), (L = A)
            })
          return this.callWhenSettled_(b(_, D), b(y, L)), X
        }),
        (i.prototype.catch = function (_) {
          return this.then(void 0, _)
        }),
        (i.prototype.callWhenSettled_ = function (_, y) {
          function b() {
            switch (D.state_) {
              case 1:
                _(D.result_)
                break
              case 2:
                y(D.result_)
                break
              default:
                throw Error('Unexpected state: ' + D.state_)
            }
          }
          var D = this
          this.onSettledCallbacks_ == null ? I.asyncExecute(b) : this.onSettledCallbacks_.push(b), (this.isRejectionHandled_ = !0)
        }),
        (i.resolve = a),
        (i.reject = function (_) {
          return new i(function (y, b) {
            b(_)
          })
        }),
        (i.race = function (_) {
          return new i(function (y, b) {
            for (var D = $jscomp.makeIterator(_), L = D.next(); !L.done; L = D.next()) a(L.value).callWhenSettled_(y, b)
          })
        }),
        (i.all = function (_) {
          var y = $jscomp.makeIterator(_),
            b = y.next()
          return b.done
            ? a([])
            : new i(function (D, L) {
                function X(E) {
                  return function (z) {
                    ;(m[E] = z), A--, A == 0 && D(m)
                  }
                }
                var m = [],
                  A = 0
                do m.push(void 0), A++, a(b.value).callWhenSettled_(X(m.length - 1), L), (b = y.next())
                while (!b.done)
              })
        }),
        i
      )
    },
    'es6',
    'es3'
  ),
  ($jscomp.owns = function (p, s) {
    return Object.prototype.hasOwnProperty.call(p, s)
  }),
  ($jscomp.assign =
    $jscomp.TRUST_ES6_POLYFILLS && typeof Object.assign == 'function'
      ? Object.assign
      : function (p, s) {
          for (var a = 1; a < arguments.length; a++) {
            var c = arguments[a]
            if (c) for (var i in c) $jscomp.owns(c, i) && (p[i] = c[i])
          }
          return p
        }),
  $jscomp.polyfill(
    'Object.assign',
    function (p) {
      return p || $jscomp.assign
    },
    'es6',
    'es3'
  ),
  ($jscomp.checkStringArgs = function (p, s, a) {
    if (p == null) throw new TypeError("The 'this' value for String.prototype." + a + ' must not be null or undefined')
    if (s instanceof RegExp) throw new TypeError('First argument to String.prototype.' + a + ' must not be a regular expression')
    return p + ''
  }),
  $jscomp.polyfill(
    'String.prototype.startsWith',
    function (p) {
      return (
        p ||
        function (s, a) {
          var c = $jscomp.checkStringArgs(this, s, 'startsWith')
          s += ''
          var i = c.length,
            I = s.length
          a = Math.max(0, Math.min(a | 0, c.length))
          for (var _ = 0; _ < I && a < i; ) if (c[a++] != s[_++]) return !1
          return _ >= I
        }
      )
    },
    'es6',
    'es3'
  ),
  $jscomp.polyfill(
    'Array.prototype.copyWithin',
    function (p) {
      function s(a) {
        return (a = Number(a)), a === 1 / 0 || a === -1 / 0 ? a : a | 0
      }
      return (
        p ||
        function (a, c, i) {
          var I = this.length
          if (
            ((a = s(a)),
            (c = s(c)),
            (i = i === void 0 ? I : s(i)),
            (a = 0 > a ? Math.max(I + a, 0) : Math.min(a, I)),
            (c = 0 > c ? Math.max(I + c, 0) : Math.min(c, I)),
            (i = 0 > i ? Math.max(I + i, 0) : Math.min(i, I)),
            a < c)
          )
            for (; c < i; ) c in this ? (this[a++] = this[c++]) : (delete this[a++], c++)
          else for (i = Math.min(i, I + c - a), a += i - c; i > c; ) --i in this ? (this[--a] = this[i]) : delete this[--a]
          return this
        }
      )
    },
    'es6',
    'es3'
  ),
  ($jscomp.typedArrayCopyWithin = function (p) {
    return p || Array.prototype.copyWithin
  }),
  $jscomp.polyfill('Int8Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Uint8Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Uint8ClampedArray.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Int16Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Uint16Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Int32Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Uint32Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Float32Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5'),
  $jscomp.polyfill('Float64Array.prototype.copyWithin', $jscomp.typedArrayCopyWithin, 'es6', 'es5')
var DracoDecoderModule = (function () {
  var p = typeof document < 'u' && document.currentScript ? document.currentScript.src : void 0
  return (
    typeof __filename < 'u' && (p = p || __filename),
    function (s) {
      function a(e) {
        return t.locateFile ? t.locateFile(e, W) : W + e
      }
      function c(e, r, n) {
        var o = r + n
        for (n = r; e[n] && !(n >= o); ) ++n
        if (16 < n - r && e.buffer && gt) return gt.decode(e.subarray(r, n))
        for (o = ''; r < n; ) {
          var l = e[r++]
          if (l & 128) {
            var d = e[r++] & 63
            if ((l & 224) == 192) o += String.fromCharCode(((l & 31) << 6) | d)
            else {
              var k = e[r++] & 63
              ;(l = (l & 240) == 224 ? ((l & 15) << 12) | (d << 6) | k : ((l & 7) << 18) | (d << 12) | (k << 6) | (e[r++] & 63)),
                65536 > l ? (o += String.fromCharCode(l)) : ((l -= 65536), (o += String.fromCharCode(55296 | (l >> 10), 56320 | (l & 1023))))
            }
          } else o += String.fromCharCode(l)
        }
        return o
      }
      function i(e, r) {
        return e ? c(Z, e, r) : ''
      }
      function I() {
        var e = nt.buffer
        ;(t.HEAP8 = H = new Int8Array(e)),
          (t.HEAP16 = new Int16Array(e)),
          (t.HEAP32 = tt = new Int32Array(e)),
          (t.HEAPU8 = Z = new Uint8Array(e)),
          (t.HEAPU16 = new Uint16Array(e)),
          (t.HEAPU32 = x = new Uint32Array(e)),
          (t.HEAPF32 = new Float32Array(e)),
          (t.HEAPF64 = new Float64Array(e))
      }
      function _(e) {
        throw (
          (t.onAbort && t.onAbort(e),
          (e = 'Aborted(' + e + ')'),
          K(e),
          (It = !0),
          (e = new WebAssembly.RuntimeError(e + '. Build with -sASSERTIONS for more info.')),
          rt(e),
          e)
        )
      }
      function y(e) {
        try {
          if (e == w && $) return new Uint8Array($)
          if (pt) return pt(e)
          throw 'both async and sync fetching of the wasm failed'
        } catch (r) {
          _(r)
        }
      }
      function b() {
        if (!$ && (ht || J)) {
          if (typeof fetch == 'function' && !w.startsWith('file://'))
            return fetch(w, { credentials: 'same-origin' })
              .then(function (e) {
                if (!e.ok) throw "failed to load wasm binary file at '" + w + "'"
                return e.arrayBuffer()
              })
              .catch(function () {
                return y(w)
              })
          if (at)
            return new Promise(function (e, r) {
              at(
                w,
                function (n) {
                  e(new Uint8Array(n))
                },
                r
              )
            })
        }
        return Promise.resolve().then(function () {
          return y(w)
        })
      }
      function D(e) {
        for (; 0 < e.length; ) e.shift()(t)
      }
      function L(e) {
        ;(this.excPtr = e),
          (this.ptr = e - 24),
          (this.set_type = function (r) {
            x[(this.ptr + 4) >> 2] = r
          }),
          (this.get_type = function () {
            return x[(this.ptr + 4) >> 2]
          }),
          (this.set_destructor = function (r) {
            x[(this.ptr + 8) >> 2] = r
          }),
          (this.get_destructor = function () {
            return x[(this.ptr + 8) >> 2]
          }),
          (this.set_refcount = function (r) {
            tt[this.ptr >> 2] = r
          }),
          (this.set_caught = function (r) {
            H[(this.ptr + 12) >> 0] = r ? 1 : 0
          }),
          (this.get_caught = function () {
            return H[(this.ptr + 12) >> 0] != 0
          }),
          (this.set_rethrown = function (r) {
            H[(this.ptr + 13) >> 0] = r ? 1 : 0
          }),
          (this.get_rethrown = function () {
            return H[(this.ptr + 13) >> 0] != 0
          }),
          (this.init = function (r, n) {
            this.set_adjusted_ptr(0), this.set_type(r), this.set_destructor(n), this.set_refcount(0), this.set_caught(!1), this.set_rethrown(!1)
          }),
          (this.add_ref = function () {
            tt[this.ptr >> 2] += 1
          }),
          (this.release_ref = function () {
            var r = tt[this.ptr >> 2]
            return (tt[this.ptr >> 2] = r - 1), r === 1
          }),
          (this.set_adjusted_ptr = function (r) {
            x[(this.ptr + 16) >> 2] = r
          }),
          (this.get_adjusted_ptr = function () {
            return x[(this.ptr + 16) >> 2]
          }),
          (this.get_exception_ptr = function () {
            if (un(this.get_type())) return x[this.excPtr >> 2]
            var r = this.get_adjusted_ptr()
            return r !== 0 ? r : this.excPtr
          })
      }
      function X() {
        function e() {
          if (!ot && ((ot = !0), (t.calledRun = !0), !It)) {
            if (((Gt = !0), D(ut), mt(t), t.onRuntimeInitialized && t.onRuntimeInitialized(), t.postRun))
              for (typeof t.postRun == 'function' && (t.postRun = [t.postRun]); t.postRun.length; ) Et.unshift(t.postRun.shift())
            D(Et)
          }
        }
        if (!(0 < q)) {
          if (t.preRun) for (typeof t.preRun == 'function' && (t.preRun = [t.preRun]); t.preRun.length; ) vt.unshift(t.preRun.shift())
          D(vt),
            0 < q ||
              (t.setStatus
                ? (t.setStatus('Running...'),
                  setTimeout(function () {
                    setTimeout(function () {
                      t.setStatus('')
                    }, 1),
                      e()
                  }, 1))
                : e())
        }
      }
      function m() {}
      function A(e) {
        return (e || m).__cache__
      }
      function E(e, r) {
        var n = A(r),
          o = n[e]
        return o || ((o = Object.create((r || m).prototype)), (o.ptr = e), (n[e] = o))
      }
      function z(e) {
        if (typeof e == 'string') {
          for (var r = 0, n = 0; n < e.length; ++n) {
            var o = e.charCodeAt(n)
            127 >= o ? r++ : 2047 >= o ? (r += 2) : 55296 <= o && 57343 >= o ? ((r += 4), ++n) : (r += 3)
          }
          if (((r = Array(r + 1)), (n = 0), (o = r.length), 0 < o)) {
            o = n + o - 1
            for (var l = 0; l < e.length; ++l) {
              var d = e.charCodeAt(l)
              if (55296 <= d && 57343 >= d) {
                var k = e.charCodeAt(++l)
                d = (65536 + ((d & 1023) << 10)) | (k & 1023)
              }
              if (127 >= d) {
                if (n >= o) break
                r[n++] = d
              } else {
                if (2047 >= d) {
                  if (n + 1 >= o) break
                  r[n++] = 192 | (d >> 6)
                } else {
                  if (65535 >= d) {
                    if (n + 2 >= o) break
                    r[n++] = 224 | (d >> 12)
                  } else {
                    if (n + 3 >= o) break
                    ;(r[n++] = 240 | (d >> 18)), (r[n++] = 128 | ((d >> 12) & 63))
                  }
                  r[n++] = 128 | ((d >> 6) & 63)
                }
                r[n++] = 128 | (d & 63)
              }
            }
            r[n] = 0
          }
          return (e = f.alloc(r, H)), f.copy(r, H, e), e
        }
        return e
      }
      function _t(e) {
        if (typeof e == 'object') {
          var r = f.alloc(e, H)
          return f.copy(e, H, r), r
        }
        return e
      }
      function Y() {
        throw 'cannot construct a VoidPtr, no constructor in IDL'
      }
      function V() {
        ;(this.ptr = jt()), (A(V)[this.ptr] = this)
      }
      function C() {
        ;(this.ptr = St()), (A(C)[this.ptr] = this)
      }
      function Q() {
        ;(this.ptr = Ut()), (A(Q)[this.ptr] = this)
      }
      function h() {
        ;(this.ptr = Lt()), (A(h)[this.ptr] = this)
      }
      function v() {
        ;(this.ptr = qt()), (A(v)[this.ptr] = this)
      }
      function O() {
        ;(this.ptr = Zt()), (A(O)[this.ptr] = this)
      }
      function j() {
        ;(this.ptr = ne()), (A(j)[this.ptr] = this)
      }
      function G() {
        ;(this.ptr = pe()), (A(G)[this.ptr] = this)
      }
      function B() {
        ;(this.ptr = ye()), (A(B)[this.ptr] = this)
      }
      function g() {
        throw 'cannot construct a Status, no constructor in IDL'
      }
      function P() {
        ;(this.ptr = he()), (A(P)[this.ptr] = this)
      }
      function R() {
        ;(this.ptr = Ie()), (A(R)[this.ptr] = this)
      }
      function S() {
        ;(this.ptr = Ge()), (A(S)[this.ptr] = this)
      }
      function M() {
        ;(this.ptr = Re()), (A(M)[this.ptr] = this)
      }
      function N() {
        ;(this.ptr = Ue()), (A(N)[this.ptr] = this)
      }
      function U() {
        ;(this.ptr = we()), (A(U)[this.ptr] = this)
      }
      function F() {
        ;(this.ptr = We()), (A(F)[this.ptr] = this)
      }
      function T() {
        ;(this.ptr = He()), (A(T)[this.ptr] = this)
      }
      function u() {
        ;(this.ptr = er()), (A(u)[this.ptr] = this)
      }
      s = s === void 0 ? {} : s
      var t = typeof s < 'u' ? s : {},
        mt,
        rt
      t.ready = new Promise(function (e, r) {
        ;(mt = e), (rt = r)
      })
      var ft = !1,
        dt = !1
      ;(t.onRuntimeInitialized = function () {
        ;(ft = !0), dt && typeof t.onModuleLoaded == 'function' && t.onModuleLoaded(t)
      }),
        (t.onModuleParsed = function () {
          ;(dt = !0), ft && typeof t.onModuleLoaded == 'function' && t.onModuleLoaded(t)
        }),
        (t.isVersionSupported = function (e) {
          return typeof e != 'string'
            ? !1
            : ((e = e.split('.')), 2 > e.length || 3 < e.length ? !1 : e[0] == 1 && 0 <= e[1] && 5 >= e[1] ? !0 : !(e[0] != 0 || 10 < e[1]))
        })
      var bt = Object.assign({}, t),
        ht = typeof window == 'object',
        J = typeof importScripts == 'function',
        At = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string',
        W = ''
      if (At) {
        var Tt = require('fs'),
          it = require('path')
        W = J ? it.dirname(W) + '/' : __dirname + '/'
        var Dt = function (e, r) {
            return (e = e.startsWith('file://') ? new URL(e) : it.normalize(e)), Tt.readFileSync(e, r ? void 0 : 'utf8')
          },
          pt = function (e) {
            return (e = Dt(e, !0)), e.buffer || (e = new Uint8Array(e)), e
          },
          at = function (e, r, n) {
            ;(e = e.startsWith('file://') ? new URL(e) : it.normalize(e)),
              Tt.readFile(e, function (o, l) {
                o ? n(o) : r(l.buffer)
              })
          }
        1 < process.argv.length && process.argv[1].replace(/\\/g, '/'),
          process.argv.slice(2),
          (t.inspect = function () {
            return '[Emscripten Module object]'
          })
      } else
        (ht || J) &&
          (J ? (W = self.location.href) : typeof document < 'u' && document.currentScript && (W = document.currentScript.src),
          p && (W = p),
          (W = W.indexOf('blob:') !== 0 ? W.substr(0, W.replace(/[?#].*/, '').lastIndexOf('/') + 1) : ''),
          (Dt = function (e) {
            var r = new XMLHttpRequest()
            return r.open('GET', e, !1), r.send(null), r.responseText
          }),
          J &&
            (pt = function (e) {
              var r = new XMLHttpRequest()
              return r.open('GET', e, !1), (r.responseType = 'arraybuffer'), r.send(null), new Uint8Array(r.response)
            }),
          (at = function (e, r, n) {
            var o = new XMLHttpRequest()
            o.open('GET', e, !0),
              (o.responseType = 'arraybuffer'),
              (o.onload = function () {
                o.status == 200 || (o.status == 0 && o.response) ? r(o.response) : n()
              }),
              (o.onerror = n),
              o.send(null)
          }))
      var cn = t.print || console.log.bind(console),
        K = t.printErr || console.warn.bind(console)
      Object.assign(t, bt), (bt = null)
      var $
      t.wasmBinary && ($ = t.wasmBinary), typeof WebAssembly != 'object' && _('no native wasm support detected')
      var nt,
        It = !1,
        gt = typeof TextDecoder < 'u' ? new TextDecoder('utf8') : void 0,
        H,
        Z,
        tt,
        x,
        vt = [],
        ut = [],
        Et = [],
        Gt = !1,
        q = 0,
        st = null,
        et = null,
        w = 'draco_decoder.wasm'
      w.startsWith('data:application/octet-stream;base64,') || (w = a(w))
      var yn = 0,
        ln = [null, [], []],
        mn = {
          b: function (e, r, n) {
            throw (new L(e).init(r, n), yn++, e)
          },
          a: function () {
            _('')
          },
          g: function (e, r, n) {
            Z.copyWithin(e, r, r + n)
          },
          e: function (e) {
            var r = Z.length
            if (((e >>>= 0), 2147483648 < e)) return !1
            for (var n = 1; 4 >= n; n *= 2) {
              var o = r * (1 + 0.2 / n)
              o = Math.min(o, e + 100663296)
              var l = Math
              ;(o = Math.max(e, o)), (l = l.min.call(l, 2147483648, o + ((65536 - (o % 65536)) % 65536)))
              t: {
                o = nt.buffer
                try {
                  nt.grow((l - o.byteLength + 65535) >>> 16), I()
                  var d = 1
                  break t
                } catch {}
                d = void 0
              }
              if (d) return !0
            }
            return !1
          },
          f: function (e) {
            return 52
          },
          d: function (e, r, n, o, l) {
            return 70
          },
          c: function (e, r, n, o) {
            for (var l = 0, d = 0; d < n; d++) {
              var k = x[r >> 2],
                sn = x[(r + 4) >> 2]
              r += 8
              for (var ct = 0; ct < sn; ct++) {
                var yt = Z[k + ct],
                  lt = ln[e]
                yt === 0 || yt === 10 ? ((e === 1 ? cn : K)(c(lt, 0)), (lt.length = 0)) : lt.push(yt)
              }
              l += sn
            }
            return (x[o >> 2] = l), 0
          }
        }
      ;(function () {
        function e(l, d) {
          ;(t.asm = l.exports),
            (nt = t.asm.h),
            I(),
            ut.unshift(t.asm.i),
            q--,
            t.monitorRunDependencies && t.monitorRunDependencies(q),
            q == 0 && (st !== null && (clearInterval(st), (st = null)), et && ((l = et), (et = null), l()))
        }
        function r(l) {
          e(l.instance)
        }
        function n(l) {
          return b()
            .then(function (d) {
              return WebAssembly.instantiate(d, o)
            })
            .then(function (d) {
              return d
            })
            .then(l, function (d) {
              K('failed to asynchronously prepare wasm: ' + d), _(d)
            })
        }
        var o = { a: mn }
        if ((q++, t.monitorRunDependencies && t.monitorRunDependencies(q), t.instantiateWasm))
          try {
            return t.instantiateWasm(o, e)
          } catch (l) {
            K('Module.instantiateWasm callback failed with error: ' + l), rt(l)
          }
        return (
          (function () {
            return $ ||
              typeof WebAssembly.instantiateStreaming != 'function' ||
              w.startsWith('data:application/octet-stream;base64,') ||
              w.startsWith('file://') ||
              At ||
              typeof fetch != 'function'
              ? n(r)
              : fetch(w, { credentials: 'same-origin' }).then(function (l) {
                  return WebAssembly.instantiateStreaming(l, o).then(r, function (d) {
                    return K('wasm streaming compile failed: ' + d), K('falling back to ArrayBuffer instantiation'), n(r)
                  })
                })
          })().catch(rt),
          {}
        )
      })()
      var Ot = (t._emscripten_bind_VoidPtr___destroy___0 = function () {
          return (Ot = t._emscripten_bind_VoidPtr___destroy___0 = t.asm.k).apply(null, arguments)
        }),
        jt = (t._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = function () {
          return (jt = t._emscripten_bind_DecoderBuffer_DecoderBuffer_0 = t.asm.l).apply(null, arguments)
        }),
        Pt = (t._emscripten_bind_DecoderBuffer_Init_2 = function () {
          return (Pt = t._emscripten_bind_DecoderBuffer_Init_2 = t.asm.m).apply(null, arguments)
        }),
        Rt = (t._emscripten_bind_DecoderBuffer___destroy___0 = function () {
          return (Rt = t._emscripten_bind_DecoderBuffer___destroy___0 = t.asm.n).apply(null, arguments)
        }),
        St = (t._emscripten_bind_AttributeTransformData_AttributeTransformData_0 = function () {
          return (St = t._emscripten_bind_AttributeTransformData_AttributeTransformData_0 = t.asm.o).apply(null, arguments)
        }),
        Mt = (t._emscripten_bind_AttributeTransformData_transform_type_0 = function () {
          return (Mt = t._emscripten_bind_AttributeTransformData_transform_type_0 = t.asm.p).apply(null, arguments)
        }),
        Nt = (t._emscripten_bind_AttributeTransformData___destroy___0 = function () {
          return (Nt = t._emscripten_bind_AttributeTransformData___destroy___0 = t.asm.q).apply(null, arguments)
        }),
        Ut = (t._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = function () {
          return (Ut = t._emscripten_bind_GeometryAttribute_GeometryAttribute_0 = t.asm.r).apply(null, arguments)
        }),
        Ft = (t._emscripten_bind_GeometryAttribute___destroy___0 = function () {
          return (Ft = t._emscripten_bind_GeometryAttribute___destroy___0 = t.asm.s).apply(null, arguments)
        }),
        Lt = (t._emscripten_bind_PointAttribute_PointAttribute_0 = function () {
          return (Lt = t._emscripten_bind_PointAttribute_PointAttribute_0 = t.asm.t).apply(null, arguments)
        }),
        Ct = (t._emscripten_bind_PointAttribute_size_0 = function () {
          return (Ct = t._emscripten_bind_PointAttribute_size_0 = t.asm.u).apply(null, arguments)
        }),
        wt = (t._emscripten_bind_PointAttribute_GetAttributeTransformData_0 = function () {
          return (wt = t._emscripten_bind_PointAttribute_GetAttributeTransformData_0 = t.asm.v).apply(null, arguments)
        }),
        zt = (t._emscripten_bind_PointAttribute_attribute_type_0 = function () {
          return (zt = t._emscripten_bind_PointAttribute_attribute_type_0 = t.asm.w).apply(null, arguments)
        }),
        Vt = (t._emscripten_bind_PointAttribute_data_type_0 = function () {
          return (Vt = t._emscripten_bind_PointAttribute_data_type_0 = t.asm.x).apply(null, arguments)
        }),
        Bt = (t._emscripten_bind_PointAttribute_num_components_0 = function () {
          return (Bt = t._emscripten_bind_PointAttribute_num_components_0 = t.asm.y).apply(null, arguments)
        }),
        Wt = (t._emscripten_bind_PointAttribute_normalized_0 = function () {
          return (Wt = t._emscripten_bind_PointAttribute_normalized_0 = t.asm.z).apply(null, arguments)
        }),
        xt = (t._emscripten_bind_PointAttribute_byte_stride_0 = function () {
          return (xt = t._emscripten_bind_PointAttribute_byte_stride_0 = t.asm.A).apply(null, arguments)
        }),
        Qt = (t._emscripten_bind_PointAttribute_byte_offset_0 = function () {
          return (Qt = t._emscripten_bind_PointAttribute_byte_offset_0 = t.asm.B).apply(null, arguments)
        }),
        Yt = (t._emscripten_bind_PointAttribute_unique_id_0 = function () {
          return (Yt = t._emscripten_bind_PointAttribute_unique_id_0 = t.asm.C).apply(null, arguments)
        }),
        Ht = (t._emscripten_bind_PointAttribute___destroy___0 = function () {
          return (Ht = t._emscripten_bind_PointAttribute___destroy___0 = t.asm.D).apply(null, arguments)
        }),
        qt = (t._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 = function () {
          return (qt = t._emscripten_bind_AttributeQuantizationTransform_AttributeQuantizationTransform_0 = t.asm.E).apply(null, arguments)
        }),
        kt = (t._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 = function () {
          return (kt = t._emscripten_bind_AttributeQuantizationTransform_InitFromAttribute_1 = t.asm.F).apply(null, arguments)
        }),
        Xt = (t._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 = function () {
          return (Xt = t._emscripten_bind_AttributeQuantizationTransform_quantization_bits_0 = t.asm.G).apply(null, arguments)
        }),
        Kt = (t._emscripten_bind_AttributeQuantizationTransform_min_value_1 = function () {
          return (Kt = t._emscripten_bind_AttributeQuantizationTransform_min_value_1 = t.asm.H).apply(null, arguments)
        }),
        Jt = (t._emscripten_bind_AttributeQuantizationTransform_range_0 = function () {
          return (Jt = t._emscripten_bind_AttributeQuantizationTransform_range_0 = t.asm.I).apply(null, arguments)
        }),
        $t = (t._emscripten_bind_AttributeQuantizationTransform___destroy___0 = function () {
          return ($t = t._emscripten_bind_AttributeQuantizationTransform___destroy___0 = t.asm.J).apply(null, arguments)
        }),
        Zt = (t._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 = function () {
          return (Zt = t._emscripten_bind_AttributeOctahedronTransform_AttributeOctahedronTransform_0 = t.asm.K).apply(null, arguments)
        }),
        te = (t._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 = function () {
          return (te = t._emscripten_bind_AttributeOctahedronTransform_InitFromAttribute_1 = t.asm.L).apply(null, arguments)
        }),
        ee = (t._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 = function () {
          return (ee = t._emscripten_bind_AttributeOctahedronTransform_quantization_bits_0 = t.asm.M).apply(null, arguments)
        }),
        re = (t._emscripten_bind_AttributeOctahedronTransform___destroy___0 = function () {
          return (re = t._emscripten_bind_AttributeOctahedronTransform___destroy___0 = t.asm.N).apply(null, arguments)
        }),
        ne = (t._emscripten_bind_PointCloud_PointCloud_0 = function () {
          return (ne = t._emscripten_bind_PointCloud_PointCloud_0 = t.asm.O).apply(null, arguments)
        }),
        oe = (t._emscripten_bind_PointCloud_num_attributes_0 = function () {
          return (oe = t._emscripten_bind_PointCloud_num_attributes_0 = t.asm.P).apply(null, arguments)
        }),
        _e = (t._emscripten_bind_PointCloud_num_points_0 = function () {
          return (_e = t._emscripten_bind_PointCloud_num_points_0 = t.asm.Q).apply(null, arguments)
        }),
        ie = (t._emscripten_bind_PointCloud___destroy___0 = function () {
          return (ie = t._emscripten_bind_PointCloud___destroy___0 = t.asm.R).apply(null, arguments)
        }),
        pe = (t._emscripten_bind_Mesh_Mesh_0 = function () {
          return (pe = t._emscripten_bind_Mesh_Mesh_0 = t.asm.S).apply(null, arguments)
        }),
        ae = (t._emscripten_bind_Mesh_num_faces_0 = function () {
          return (ae = t._emscripten_bind_Mesh_num_faces_0 = t.asm.T).apply(null, arguments)
        }),
        ue = (t._emscripten_bind_Mesh_num_attributes_0 = function () {
          return (ue = t._emscripten_bind_Mesh_num_attributes_0 = t.asm.U).apply(null, arguments)
        }),
        se = (t._emscripten_bind_Mesh_num_points_0 = function () {
          return (se = t._emscripten_bind_Mesh_num_points_0 = t.asm.V).apply(null, arguments)
        }),
        ce = (t._emscripten_bind_Mesh___destroy___0 = function () {
          return (ce = t._emscripten_bind_Mesh___destroy___0 = t.asm.W).apply(null, arguments)
        }),
        ye = (t._emscripten_bind_Metadata_Metadata_0 = function () {
          return (ye = t._emscripten_bind_Metadata_Metadata_0 = t.asm.X).apply(null, arguments)
        }),
        le = (t._emscripten_bind_Metadata___destroy___0 = function () {
          return (le = t._emscripten_bind_Metadata___destroy___0 = t.asm.Y).apply(null, arguments)
        }),
        me = (t._emscripten_bind_Status_code_0 = function () {
          return (me = t._emscripten_bind_Status_code_0 = t.asm.Z).apply(null, arguments)
        }),
        fe = (t._emscripten_bind_Status_ok_0 = function () {
          return (fe = t._emscripten_bind_Status_ok_0 = t.asm._).apply(null, arguments)
        }),
        de = (t._emscripten_bind_Status_error_msg_0 = function () {
          return (de = t._emscripten_bind_Status_error_msg_0 = t.asm.$).apply(null, arguments)
        }),
        be = (t._emscripten_bind_Status___destroy___0 = function () {
          return (be = t._emscripten_bind_Status___destroy___0 = t.asm.aa).apply(null, arguments)
        }),
        he = (t._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = function () {
          return (he = t._emscripten_bind_DracoFloat32Array_DracoFloat32Array_0 = t.asm.ba).apply(null, arguments)
        }),
        Ae = (t._emscripten_bind_DracoFloat32Array_GetValue_1 = function () {
          return (Ae = t._emscripten_bind_DracoFloat32Array_GetValue_1 = t.asm.ca).apply(null, arguments)
        }),
        Te = (t._emscripten_bind_DracoFloat32Array_size_0 = function () {
          return (Te = t._emscripten_bind_DracoFloat32Array_size_0 = t.asm.da).apply(null, arguments)
        }),
        De = (t._emscripten_bind_DracoFloat32Array___destroy___0 = function () {
          return (De = t._emscripten_bind_DracoFloat32Array___destroy___0 = t.asm.ea).apply(null, arguments)
        }),
        Ie = (t._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = function () {
          return (Ie = t._emscripten_bind_DracoInt8Array_DracoInt8Array_0 = t.asm.fa).apply(null, arguments)
        }),
        ge = (t._emscripten_bind_DracoInt8Array_GetValue_1 = function () {
          return (ge = t._emscripten_bind_DracoInt8Array_GetValue_1 = t.asm.ga).apply(null, arguments)
        }),
        ve = (t._emscripten_bind_DracoInt8Array_size_0 = function () {
          return (ve = t._emscripten_bind_DracoInt8Array_size_0 = t.asm.ha).apply(null, arguments)
        }),
        Ee = (t._emscripten_bind_DracoInt8Array___destroy___0 = function () {
          return (Ee = t._emscripten_bind_DracoInt8Array___destroy___0 = t.asm.ia).apply(null, arguments)
        }),
        Ge = (t._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 = function () {
          return (Ge = t._emscripten_bind_DracoUInt8Array_DracoUInt8Array_0 = t.asm.ja).apply(null, arguments)
        }),
        Oe = (t._emscripten_bind_DracoUInt8Array_GetValue_1 = function () {
          return (Oe = t._emscripten_bind_DracoUInt8Array_GetValue_1 = t.asm.ka).apply(null, arguments)
        }),
        je = (t._emscripten_bind_DracoUInt8Array_size_0 = function () {
          return (je = t._emscripten_bind_DracoUInt8Array_size_0 = t.asm.la).apply(null, arguments)
        }),
        Pe = (t._emscripten_bind_DracoUInt8Array___destroy___0 = function () {
          return (Pe = t._emscripten_bind_DracoUInt8Array___destroy___0 = t.asm.ma).apply(null, arguments)
        }),
        Re = (t._emscripten_bind_DracoInt16Array_DracoInt16Array_0 = function () {
          return (Re = t._emscripten_bind_DracoInt16Array_DracoInt16Array_0 = t.asm.na).apply(null, arguments)
        }),
        Se = (t._emscripten_bind_DracoInt16Array_GetValue_1 = function () {
          return (Se = t._emscripten_bind_DracoInt16Array_GetValue_1 = t.asm.oa).apply(null, arguments)
        }),
        Me = (t._emscripten_bind_DracoInt16Array_size_0 = function () {
          return (Me = t._emscripten_bind_DracoInt16Array_size_0 = t.asm.pa).apply(null, arguments)
        }),
        Ne = (t._emscripten_bind_DracoInt16Array___destroy___0 = function () {
          return (Ne = t._emscripten_bind_DracoInt16Array___destroy___0 = t.asm.qa).apply(null, arguments)
        }),
        Ue = (t._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 = function () {
          return (Ue = t._emscripten_bind_DracoUInt16Array_DracoUInt16Array_0 = t.asm.ra).apply(null, arguments)
        }),
        Fe = (t._emscripten_bind_DracoUInt16Array_GetValue_1 = function () {
          return (Fe = t._emscripten_bind_DracoUInt16Array_GetValue_1 = t.asm.sa).apply(null, arguments)
        }),
        Le = (t._emscripten_bind_DracoUInt16Array_size_0 = function () {
          return (Le = t._emscripten_bind_DracoUInt16Array_size_0 = t.asm.ta).apply(null, arguments)
        }),
        Ce = (t._emscripten_bind_DracoUInt16Array___destroy___0 = function () {
          return (Ce = t._emscripten_bind_DracoUInt16Array___destroy___0 = t.asm.ua).apply(null, arguments)
        }),
        we = (t._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = function () {
          return (we = t._emscripten_bind_DracoInt32Array_DracoInt32Array_0 = t.asm.va).apply(null, arguments)
        }),
        ze = (t._emscripten_bind_DracoInt32Array_GetValue_1 = function () {
          return (ze = t._emscripten_bind_DracoInt32Array_GetValue_1 = t.asm.wa).apply(null, arguments)
        }),
        Ve = (t._emscripten_bind_DracoInt32Array_size_0 = function () {
          return (Ve = t._emscripten_bind_DracoInt32Array_size_0 = t.asm.xa).apply(null, arguments)
        }),
        Be = (t._emscripten_bind_DracoInt32Array___destroy___0 = function () {
          return (Be = t._emscripten_bind_DracoInt32Array___destroy___0 = t.asm.ya).apply(null, arguments)
        }),
        We = (t._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 = function () {
          return (We = t._emscripten_bind_DracoUInt32Array_DracoUInt32Array_0 = t.asm.za).apply(null, arguments)
        }),
        xe = (t._emscripten_bind_DracoUInt32Array_GetValue_1 = function () {
          return (xe = t._emscripten_bind_DracoUInt32Array_GetValue_1 = t.asm.Aa).apply(null, arguments)
        }),
        Qe = (t._emscripten_bind_DracoUInt32Array_size_0 = function () {
          return (Qe = t._emscripten_bind_DracoUInt32Array_size_0 = t.asm.Ba).apply(null, arguments)
        }),
        Ye = (t._emscripten_bind_DracoUInt32Array___destroy___0 = function () {
          return (Ye = t._emscripten_bind_DracoUInt32Array___destroy___0 = t.asm.Ca).apply(null, arguments)
        }),
        He = (t._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = function () {
          return (He = t._emscripten_bind_MetadataQuerier_MetadataQuerier_0 = t.asm.Da).apply(null, arguments)
        }),
        qe = (t._emscripten_bind_MetadataQuerier_HasEntry_2 = function () {
          return (qe = t._emscripten_bind_MetadataQuerier_HasEntry_2 = t.asm.Ea).apply(null, arguments)
        }),
        ke = (t._emscripten_bind_MetadataQuerier_GetIntEntry_2 = function () {
          return (ke = t._emscripten_bind_MetadataQuerier_GetIntEntry_2 = t.asm.Fa).apply(null, arguments)
        }),
        Xe = (t._emscripten_bind_MetadataQuerier_GetIntEntryArray_3 = function () {
          return (Xe = t._emscripten_bind_MetadataQuerier_GetIntEntryArray_3 = t.asm.Ga).apply(null, arguments)
        }),
        Ke = (t._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = function () {
          return (Ke = t._emscripten_bind_MetadataQuerier_GetDoubleEntry_2 = t.asm.Ha).apply(null, arguments)
        }),
        Je = (t._emscripten_bind_MetadataQuerier_GetStringEntry_2 = function () {
          return (Je = t._emscripten_bind_MetadataQuerier_GetStringEntry_2 = t.asm.Ia).apply(null, arguments)
        }),
        $e = (t._emscripten_bind_MetadataQuerier_NumEntries_1 = function () {
          return ($e = t._emscripten_bind_MetadataQuerier_NumEntries_1 = t.asm.Ja).apply(null, arguments)
        }),
        Ze = (t._emscripten_bind_MetadataQuerier_GetEntryName_2 = function () {
          return (Ze = t._emscripten_bind_MetadataQuerier_GetEntryName_2 = t.asm.Ka).apply(null, arguments)
        }),
        tr = (t._emscripten_bind_MetadataQuerier___destroy___0 = function () {
          return (tr = t._emscripten_bind_MetadataQuerier___destroy___0 = t.asm.La).apply(null, arguments)
        }),
        er = (t._emscripten_bind_Decoder_Decoder_0 = function () {
          return (er = t._emscripten_bind_Decoder_Decoder_0 = t.asm.Ma).apply(null, arguments)
        }),
        rr = (t._emscripten_bind_Decoder_DecodeArrayToPointCloud_3 = function () {
          return (rr = t._emscripten_bind_Decoder_DecodeArrayToPointCloud_3 = t.asm.Na).apply(null, arguments)
        }),
        nr = (t._emscripten_bind_Decoder_DecodeArrayToMesh_3 = function () {
          return (nr = t._emscripten_bind_Decoder_DecodeArrayToMesh_3 = t.asm.Oa).apply(null, arguments)
        }),
        or = (t._emscripten_bind_Decoder_GetAttributeId_2 = function () {
          return (or = t._emscripten_bind_Decoder_GetAttributeId_2 = t.asm.Pa).apply(null, arguments)
        }),
        _r = (t._emscripten_bind_Decoder_GetAttributeIdByName_2 = function () {
          return (_r = t._emscripten_bind_Decoder_GetAttributeIdByName_2 = t.asm.Qa).apply(null, arguments)
        }),
        ir = (t._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = function () {
          return (ir = t._emscripten_bind_Decoder_GetAttributeIdByMetadataEntry_3 = t.asm.Ra).apply(null, arguments)
        }),
        pr = (t._emscripten_bind_Decoder_GetAttribute_2 = function () {
          return (pr = t._emscripten_bind_Decoder_GetAttribute_2 = t.asm.Sa).apply(null, arguments)
        }),
        ar = (t._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = function () {
          return (ar = t._emscripten_bind_Decoder_GetAttributeByUniqueId_2 = t.asm.Ta).apply(null, arguments)
        }),
        ur = (t._emscripten_bind_Decoder_GetMetadata_1 = function () {
          return (ur = t._emscripten_bind_Decoder_GetMetadata_1 = t.asm.Ua).apply(null, arguments)
        }),
        sr = (t._emscripten_bind_Decoder_GetAttributeMetadata_2 = function () {
          return (sr = t._emscripten_bind_Decoder_GetAttributeMetadata_2 = t.asm.Va).apply(null, arguments)
        }),
        cr = (t._emscripten_bind_Decoder_GetFaceFromMesh_3 = function () {
          return (cr = t._emscripten_bind_Decoder_GetFaceFromMesh_3 = t.asm.Wa).apply(null, arguments)
        }),
        yr = (t._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = function () {
          return (yr = t._emscripten_bind_Decoder_GetTriangleStripsFromMesh_2 = t.asm.Xa).apply(null, arguments)
        }),
        lr = (t._emscripten_bind_Decoder_GetTrianglesUInt16Array_3 = function () {
          return (lr = t._emscripten_bind_Decoder_GetTrianglesUInt16Array_3 = t.asm.Ya).apply(null, arguments)
        }),
        mr = (t._emscripten_bind_Decoder_GetTrianglesUInt32Array_3 = function () {
          return (mr = t._emscripten_bind_Decoder_GetTrianglesUInt32Array_3 = t.asm.Za).apply(null, arguments)
        }),
        fr = (t._emscripten_bind_Decoder_GetAttributeFloat_3 = function () {
          return (fr = t._emscripten_bind_Decoder_GetAttributeFloat_3 = t.asm._a).apply(null, arguments)
        }),
        dr = (t._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = function () {
          return (dr = t._emscripten_bind_Decoder_GetAttributeFloatForAllPoints_3 = t.asm.$a).apply(null, arguments)
        }),
        br = (t._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = function () {
          return (br = t._emscripten_bind_Decoder_GetAttributeIntForAllPoints_3 = t.asm.ab).apply(null, arguments)
        }),
        hr = (t._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 = function () {
          return (hr = t._emscripten_bind_Decoder_GetAttributeInt8ForAllPoints_3 = t.asm.bb).apply(null, arguments)
        }),
        Ar = (t._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 = function () {
          return (Ar = t._emscripten_bind_Decoder_GetAttributeUInt8ForAllPoints_3 = t.asm.cb).apply(null, arguments)
        }),
        Tr = (t._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 = function () {
          return (Tr = t._emscripten_bind_Decoder_GetAttributeInt16ForAllPoints_3 = t.asm.db).apply(null, arguments)
        }),
        Dr = (t._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 = function () {
          return (Dr = t._emscripten_bind_Decoder_GetAttributeUInt16ForAllPoints_3 = t.asm.eb).apply(null, arguments)
        }),
        Ir = (t._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = function () {
          return (Ir = t._emscripten_bind_Decoder_GetAttributeInt32ForAllPoints_3 = t.asm.fb).apply(null, arguments)
        }),
        gr = (t._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 = function () {
          return (gr = t._emscripten_bind_Decoder_GetAttributeUInt32ForAllPoints_3 = t.asm.gb).apply(null, arguments)
        }),
        vr = (t._emscripten_bind_Decoder_GetAttributeDataArrayForAllPoints_5 = function () {
          return (vr = t._emscripten_bind_Decoder_GetAttributeDataArrayForAllPoints_5 = t.asm.hb).apply(null, arguments)
        }),
        Er = (t._emscripten_bind_Decoder_SkipAttributeTransform_1 = function () {
          return (Er = t._emscripten_bind_Decoder_SkipAttributeTransform_1 = t.asm.ib).apply(null, arguments)
        }),
        Gr = (t._emscripten_bind_Decoder_GetEncodedGeometryType_Deprecated_1 = function () {
          return (Gr = t._emscripten_bind_Decoder_GetEncodedGeometryType_Deprecated_1 = t.asm.jb).apply(null, arguments)
        }),
        Or = (t._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = function () {
          return (Or = t._emscripten_bind_Decoder_DecodeBufferToPointCloud_2 = t.asm.kb).apply(null, arguments)
        }),
        jr = (t._emscripten_bind_Decoder_DecodeBufferToMesh_2 = function () {
          return (jr = t._emscripten_bind_Decoder_DecodeBufferToMesh_2 = t.asm.lb).apply(null, arguments)
        }),
        Pr = (t._emscripten_bind_Decoder___destroy___0 = function () {
          return (Pr = t._emscripten_bind_Decoder___destroy___0 = t.asm.mb).apply(null, arguments)
        }),
        Rr = (t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM = function () {
          return (Rr = t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_INVALID_TRANSFORM = t.asm.nb).apply(null, arguments)
        }),
        Sr = (t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM = function () {
          return (Sr = t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_NO_TRANSFORM = t.asm.ob).apply(null, arguments)
        }),
        Mr = (t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM = function () {
          return (Mr = t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_QUANTIZATION_TRANSFORM = t.asm.pb).apply(null, arguments)
        }),
        Nr = (t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM = function () {
          return (Nr = t._emscripten_enum_draco_AttributeTransformType_ATTRIBUTE_OCTAHEDRON_TRANSFORM = t.asm.qb).apply(null, arguments)
        }),
        Ur = (t._emscripten_enum_draco_GeometryAttribute_Type_INVALID = function () {
          return (Ur = t._emscripten_enum_draco_GeometryAttribute_Type_INVALID = t.asm.rb).apply(null, arguments)
        }),
        Fr = (t._emscripten_enum_draco_GeometryAttribute_Type_POSITION = function () {
          return (Fr = t._emscripten_enum_draco_GeometryAttribute_Type_POSITION = t.asm.sb).apply(null, arguments)
        }),
        Lr = (t._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = function () {
          return (Lr = t._emscripten_enum_draco_GeometryAttribute_Type_NORMAL = t.asm.tb).apply(null, arguments)
        }),
        Cr = (t._emscripten_enum_draco_GeometryAttribute_Type_COLOR = function () {
          return (Cr = t._emscripten_enum_draco_GeometryAttribute_Type_COLOR = t.asm.ub).apply(null, arguments)
        }),
        wr = (t._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = function () {
          return (wr = t._emscripten_enum_draco_GeometryAttribute_Type_TEX_COORD = t.asm.vb).apply(null, arguments)
        }),
        zr = (t._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = function () {
          return (zr = t._emscripten_enum_draco_GeometryAttribute_Type_GENERIC = t.asm.wb).apply(null, arguments)
        }),
        Vr = (t._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = function () {
          return (Vr = t._emscripten_enum_draco_EncodedGeometryType_INVALID_GEOMETRY_TYPE = t.asm.xb).apply(null, arguments)
        }),
        Br = (t._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = function () {
          return (Br = t._emscripten_enum_draco_EncodedGeometryType_POINT_CLOUD = t.asm.yb).apply(null, arguments)
        }),
        Wr = (t._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = function () {
          return (Wr = t._emscripten_enum_draco_EncodedGeometryType_TRIANGULAR_MESH = t.asm.zb).apply(null, arguments)
        }),
        xr = (t._emscripten_enum_draco_DataType_DT_INVALID = function () {
          return (xr = t._emscripten_enum_draco_DataType_DT_INVALID = t.asm.Ab).apply(null, arguments)
        }),
        Qr = (t._emscripten_enum_draco_DataType_DT_INT8 = function () {
          return (Qr = t._emscripten_enum_draco_DataType_DT_INT8 = t.asm.Bb).apply(null, arguments)
        }),
        Yr = (t._emscripten_enum_draco_DataType_DT_UINT8 = function () {
          return (Yr = t._emscripten_enum_draco_DataType_DT_UINT8 = t.asm.Cb).apply(null, arguments)
        }),
        Hr = (t._emscripten_enum_draco_DataType_DT_INT16 = function () {
          return (Hr = t._emscripten_enum_draco_DataType_DT_INT16 = t.asm.Db).apply(null, arguments)
        }),
        qr = (t._emscripten_enum_draco_DataType_DT_UINT16 = function () {
          return (qr = t._emscripten_enum_draco_DataType_DT_UINT16 = t.asm.Eb).apply(null, arguments)
        }),
        kr = (t._emscripten_enum_draco_DataType_DT_INT32 = function () {
          return (kr = t._emscripten_enum_draco_DataType_DT_INT32 = t.asm.Fb).apply(null, arguments)
        }),
        Xr = (t._emscripten_enum_draco_DataType_DT_UINT32 = function () {
          return (Xr = t._emscripten_enum_draco_DataType_DT_UINT32 = t.asm.Gb).apply(null, arguments)
        }),
        Kr = (t._emscripten_enum_draco_DataType_DT_INT64 = function () {
          return (Kr = t._emscripten_enum_draco_DataType_DT_INT64 = t.asm.Hb).apply(null, arguments)
        }),
        Jr = (t._emscripten_enum_draco_DataType_DT_UINT64 = function () {
          return (Jr = t._emscripten_enum_draco_DataType_DT_UINT64 = t.asm.Ib).apply(null, arguments)
        }),
        $r = (t._emscripten_enum_draco_DataType_DT_FLOAT32 = function () {
          return ($r = t._emscripten_enum_draco_DataType_DT_FLOAT32 = t.asm.Jb).apply(null, arguments)
        }),
        Zr = (t._emscripten_enum_draco_DataType_DT_FLOAT64 = function () {
          return (Zr = t._emscripten_enum_draco_DataType_DT_FLOAT64 = t.asm.Kb).apply(null, arguments)
        }),
        tn = (t._emscripten_enum_draco_DataType_DT_BOOL = function () {
          return (tn = t._emscripten_enum_draco_DataType_DT_BOOL = t.asm.Lb).apply(null, arguments)
        }),
        en = (t._emscripten_enum_draco_DataType_DT_TYPES_COUNT = function () {
          return (en = t._emscripten_enum_draco_DataType_DT_TYPES_COUNT = t.asm.Mb).apply(null, arguments)
        }),
        rn = (t._emscripten_enum_draco_StatusCode_OK = function () {
          return (rn = t._emscripten_enum_draco_StatusCode_OK = t.asm.Nb).apply(null, arguments)
        }),
        nn = (t._emscripten_enum_draco_StatusCode_DRACO_ERROR = function () {
          return (nn = t._emscripten_enum_draco_StatusCode_DRACO_ERROR = t.asm.Ob).apply(null, arguments)
        }),
        on = (t._emscripten_enum_draco_StatusCode_IO_ERROR = function () {
          return (on = t._emscripten_enum_draco_StatusCode_IO_ERROR = t.asm.Pb).apply(null, arguments)
        }),
        _n = (t._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = function () {
          return (_n = t._emscripten_enum_draco_StatusCode_INVALID_PARAMETER = t.asm.Qb).apply(null, arguments)
        }),
        pn = (t._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = function () {
          return (pn = t._emscripten_enum_draco_StatusCode_UNSUPPORTED_VERSION = t.asm.Rb).apply(null, arguments)
        }),
        an = (t._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = function () {
          return (an = t._emscripten_enum_draco_StatusCode_UNKNOWN_VERSION = t.asm.Sb).apply(null, arguments)
        })
      ;(t._malloc = function () {
        return (t._malloc = t.asm.Tb).apply(null, arguments)
      }),
        (t._free = function () {
          return (t._free = t.asm.Ub).apply(null, arguments)
        })
      var un = function () {
        return (un = t.asm.Vb).apply(null, arguments)
      }
      ;(t.___start_em_js = 15856), (t.___stop_em_js = 15954)
      var ot
      if (
        ((et = function e() {
          ot || X(), ot || (et = e)
        }),
        t.preInit)
      )
        for (typeof t.preInit == 'function' && (t.preInit = [t.preInit]); 0 < t.preInit.length; ) t.preInit.pop()()
      X(),
        (m.prototype = Object.create(m.prototype)),
        (m.prototype.constructor = m),
        (m.prototype.__class__ = m),
        (m.__cache__ = {}),
        (t.WrapperObject = m),
        (t.getCache = A),
        (t.wrapPointer = E),
        (t.castObject = function (e, r) {
          return E(e.ptr, r)
        }),
        (t.NULL = E(0)),
        (t.destroy = function (e) {
          if (!e.__destroy__) throw 'Error: Cannot destroy object. (Did you create it yourself?)'
          e.__destroy__(), delete A(e.__class__)[e.ptr]
        }),
        (t.compare = function (e, r) {
          return e.ptr === r.ptr
        }),
        (t.getPointer = function (e) {
          return e.ptr
        }),
        (t.getClass = function (e) {
          return e.__class__
        })
      var f = {
        buffer: 0,
        size: 0,
        pos: 0,
        temps: [],
        needed: 0,
        prepare: function () {
          if (f.needed) {
            for (var e = 0; e < f.temps.length; e++) t._free(f.temps[e])
            ;(f.temps.length = 0), t._free(f.buffer), (f.buffer = 0), (f.size += f.needed), (f.needed = 0)
          }
          f.buffer || ((f.size += 128), (f.buffer = t._malloc(f.size)), f.buffer || _(void 0)), (f.pos = 0)
        },
        alloc: function (e, r) {
          return (
            f.buffer || _(void 0),
            (e = e.length * r.BYTES_PER_ELEMENT),
            (e = (e + 7) & -8),
            f.pos + e >= f.size ? (0 < e || _(void 0), (f.needed += e), (r = t._malloc(e)), f.temps.push(r)) : ((r = f.buffer + f.pos), (f.pos += e)),
            r
          )
        },
        copy: function (e, r, n) {
          switch (((n >>>= 0), r.BYTES_PER_ELEMENT)) {
            case 2:
              n >>>= 1
              break
            case 4:
              n >>>= 2
              break
            case 8:
              n >>>= 3
          }
          for (var o = 0; o < e.length; o++) r[n + o] = e[o]
        }
      }
      return (
        (Y.prototype = Object.create(m.prototype)),
        (Y.prototype.constructor = Y),
        (Y.prototype.__class__ = Y),
        (Y.__cache__ = {}),
        (t.VoidPtr = Y),
        (Y.prototype.__destroy__ = Y.prototype.__destroy__ =
          function () {
            Ot(this.ptr)
          }),
        (V.prototype = Object.create(m.prototype)),
        (V.prototype.constructor = V),
        (V.prototype.__class__ = V),
        (V.__cache__ = {}),
        (t.DecoderBuffer = V),
        (V.prototype.Init = V.prototype.Init =
          function (e, r) {
            var n = this.ptr
            f.prepare(), typeof e == 'object' && (e = _t(e)), r && typeof r == 'object' && (r = r.ptr), Pt(n, e, r)
          }),
        (V.prototype.__destroy__ = V.prototype.__destroy__ =
          function () {
            Rt(this.ptr)
          }),
        (C.prototype = Object.create(m.prototype)),
        (C.prototype.constructor = C),
        (C.prototype.__class__ = C),
        (C.__cache__ = {}),
        (t.AttributeTransformData = C),
        (C.prototype.transform_type = C.prototype.transform_type =
          function () {
            return Mt(this.ptr)
          }),
        (C.prototype.__destroy__ = C.prototype.__destroy__ =
          function () {
            Nt(this.ptr)
          }),
        (Q.prototype = Object.create(m.prototype)),
        (Q.prototype.constructor = Q),
        (Q.prototype.__class__ = Q),
        (Q.__cache__ = {}),
        (t.GeometryAttribute = Q),
        (Q.prototype.__destroy__ = Q.prototype.__destroy__ =
          function () {
            Ft(this.ptr)
          }),
        (h.prototype = Object.create(m.prototype)),
        (h.prototype.constructor = h),
        (h.prototype.__class__ = h),
        (h.__cache__ = {}),
        (t.PointAttribute = h),
        (h.prototype.size = h.prototype.size =
          function () {
            return Ct(this.ptr)
          }),
        (h.prototype.GetAttributeTransformData = h.prototype.GetAttributeTransformData =
          function () {
            return E(wt(this.ptr), C)
          }),
        (h.prototype.attribute_type = h.prototype.attribute_type =
          function () {
            return zt(this.ptr)
          }),
        (h.prototype.data_type = h.prototype.data_type =
          function () {
            return Vt(this.ptr)
          }),
        (h.prototype.num_components = h.prototype.num_components =
          function () {
            return Bt(this.ptr)
          }),
        (h.prototype.normalized = h.prototype.normalized =
          function () {
            return !!Wt(this.ptr)
          }),
        (h.prototype.byte_stride = h.prototype.byte_stride =
          function () {
            return xt(this.ptr)
          }),
        (h.prototype.byte_offset = h.prototype.byte_offset =
          function () {
            return Qt(this.ptr)
          }),
        (h.prototype.unique_id = h.prototype.unique_id =
          function () {
            return Yt(this.ptr)
          }),
        (h.prototype.__destroy__ = h.prototype.__destroy__ =
          function () {
            Ht(this.ptr)
          }),
        (v.prototype = Object.create(m.prototype)),
        (v.prototype.constructor = v),
        (v.prototype.__class__ = v),
        (v.__cache__ = {}),
        (t.AttributeQuantizationTransform = v),
        (v.prototype.InitFromAttribute = v.prototype.InitFromAttribute =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), !!kt(r, e)
          }),
        (v.prototype.quantization_bits = v.prototype.quantization_bits =
          function () {
            return Xt(this.ptr)
          }),
        (v.prototype.min_value = v.prototype.min_value =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), Kt(r, e)
          }),
        (v.prototype.range = v.prototype.range =
          function () {
            return Jt(this.ptr)
          }),
        (v.prototype.__destroy__ = v.prototype.__destroy__ =
          function () {
            $t(this.ptr)
          }),
        (O.prototype = Object.create(m.prototype)),
        (O.prototype.constructor = O),
        (O.prototype.__class__ = O),
        (O.__cache__ = {}),
        (t.AttributeOctahedronTransform = O),
        (O.prototype.InitFromAttribute = O.prototype.InitFromAttribute =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), !!te(r, e)
          }),
        (O.prototype.quantization_bits = O.prototype.quantization_bits =
          function () {
            return ee(this.ptr)
          }),
        (O.prototype.__destroy__ = O.prototype.__destroy__ =
          function () {
            re(this.ptr)
          }),
        (j.prototype = Object.create(m.prototype)),
        (j.prototype.constructor = j),
        (j.prototype.__class__ = j),
        (j.__cache__ = {}),
        (t.PointCloud = j),
        (j.prototype.num_attributes = j.prototype.num_attributes =
          function () {
            return oe(this.ptr)
          }),
        (j.prototype.num_points = j.prototype.num_points =
          function () {
            return _e(this.ptr)
          }),
        (j.prototype.__destroy__ = j.prototype.__destroy__ =
          function () {
            ie(this.ptr)
          }),
        (G.prototype = Object.create(m.prototype)),
        (G.prototype.constructor = G),
        (G.prototype.__class__ = G),
        (G.__cache__ = {}),
        (t.Mesh = G),
        (G.prototype.num_faces = G.prototype.num_faces =
          function () {
            return ae(this.ptr)
          }),
        (G.prototype.num_attributes = G.prototype.num_attributes =
          function () {
            return ue(this.ptr)
          }),
        (G.prototype.num_points = G.prototype.num_points =
          function () {
            return se(this.ptr)
          }),
        (G.prototype.__destroy__ = G.prototype.__destroy__ =
          function () {
            ce(this.ptr)
          }),
        (B.prototype = Object.create(m.prototype)),
        (B.prototype.constructor = B),
        (B.prototype.__class__ = B),
        (B.__cache__ = {}),
        (t.Metadata = B),
        (B.prototype.__destroy__ = B.prototype.__destroy__ =
          function () {
            le(this.ptr)
          }),
        (g.prototype = Object.create(m.prototype)),
        (g.prototype.constructor = g),
        (g.prototype.__class__ = g),
        (g.__cache__ = {}),
        (t.Status = g),
        (g.prototype.code = g.prototype.code =
          function () {
            return me(this.ptr)
          }),
        (g.prototype.ok = g.prototype.ok =
          function () {
            return !!fe(this.ptr)
          }),
        (g.prototype.error_msg = g.prototype.error_msg =
          function () {
            return i(de(this.ptr))
          }),
        (g.prototype.__destroy__ = g.prototype.__destroy__ =
          function () {
            be(this.ptr)
          }),
        (P.prototype = Object.create(m.prototype)),
        (P.prototype.constructor = P),
        (P.prototype.__class__ = P),
        (P.__cache__ = {}),
        (t.DracoFloat32Array = P),
        (P.prototype.GetValue = P.prototype.GetValue =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), Ae(r, e)
          }),
        (P.prototype.size = P.prototype.size =
          function () {
            return Te(this.ptr)
          }),
        (P.prototype.__destroy__ = P.prototype.__destroy__ =
          function () {
            De(this.ptr)
          }),
        (R.prototype = Object.create(m.prototype)),
        (R.prototype.constructor = R),
        (R.prototype.__class__ = R),
        (R.__cache__ = {}),
        (t.DracoInt8Array = R),
        (R.prototype.GetValue = R.prototype.GetValue =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), ge(r, e)
          }),
        (R.prototype.size = R.prototype.size =
          function () {
            return ve(this.ptr)
          }),
        (R.prototype.__destroy__ = R.prototype.__destroy__ =
          function () {
            Ee(this.ptr)
          }),
        (S.prototype = Object.create(m.prototype)),
        (S.prototype.constructor = S),
        (S.prototype.__class__ = S),
        (S.__cache__ = {}),
        (t.DracoUInt8Array = S),
        (S.prototype.GetValue = S.prototype.GetValue =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), Oe(r, e)
          }),
        (S.prototype.size = S.prototype.size =
          function () {
            return je(this.ptr)
          }),
        (S.prototype.__destroy__ = S.prototype.__destroy__ =
          function () {
            Pe(this.ptr)
          }),
        (M.prototype = Object.create(m.prototype)),
        (M.prototype.constructor = M),
        (M.prototype.__class__ = M),
        (M.__cache__ = {}),
        (t.DracoInt16Array = M),
        (M.prototype.GetValue = M.prototype.GetValue =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), Se(r, e)
          }),
        (M.prototype.size = M.prototype.size =
          function () {
            return Me(this.ptr)
          }),
        (M.prototype.__destroy__ = M.prototype.__destroy__ =
          function () {
            Ne(this.ptr)
          }),
        (N.prototype = Object.create(m.prototype)),
        (N.prototype.constructor = N),
        (N.prototype.__class__ = N),
        (N.__cache__ = {}),
        (t.DracoUInt16Array = N),
        (N.prototype.GetValue = N.prototype.GetValue =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), Fe(r, e)
          }),
        (N.prototype.size = N.prototype.size =
          function () {
            return Le(this.ptr)
          }),
        (N.prototype.__destroy__ = N.prototype.__destroy__ =
          function () {
            Ce(this.ptr)
          }),
        (U.prototype = Object.create(m.prototype)),
        (U.prototype.constructor = U),
        (U.prototype.__class__ = U),
        (U.__cache__ = {}),
        (t.DracoInt32Array = U),
        (U.prototype.GetValue = U.prototype.GetValue =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), ze(r, e)
          }),
        (U.prototype.size = U.prototype.size =
          function () {
            return Ve(this.ptr)
          }),
        (U.prototype.__destroy__ = U.prototype.__destroy__ =
          function () {
            Be(this.ptr)
          }),
        (F.prototype = Object.create(m.prototype)),
        (F.prototype.constructor = F),
        (F.prototype.__class__ = F),
        (F.__cache__ = {}),
        (t.DracoUInt32Array = F),
        (F.prototype.GetValue = F.prototype.GetValue =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), xe(r, e)
          }),
        (F.prototype.size = F.prototype.size =
          function () {
            return Qe(this.ptr)
          }),
        (F.prototype.__destroy__ = F.prototype.__destroy__ =
          function () {
            Ye(this.ptr)
          }),
        (T.prototype = Object.create(m.prototype)),
        (T.prototype.constructor = T),
        (T.prototype.__class__ = T),
        (T.__cache__ = {}),
        (t.MetadataQuerier = T),
        (T.prototype.HasEntry = T.prototype.HasEntry =
          function (e, r) {
            var n = this.ptr
            return f.prepare(), e && typeof e == 'object' && (e = e.ptr), (r = r && typeof r == 'object' ? r.ptr : z(r)), !!qe(n, e, r)
          }),
        (T.prototype.GetIntEntry = T.prototype.GetIntEntry =
          function (e, r) {
            var n = this.ptr
            return f.prepare(), e && typeof e == 'object' && (e = e.ptr), (r = r && typeof r == 'object' ? r.ptr : z(r)), ke(n, e, r)
          }),
        (T.prototype.GetIntEntryArray = T.prototype.GetIntEntryArray =
          function (e, r, n) {
            var o = this.ptr
            f.prepare(),
              e && typeof e == 'object' && (e = e.ptr),
              (r = r && typeof r == 'object' ? r.ptr : z(r)),
              n && typeof n == 'object' && (n = n.ptr),
              Xe(o, e, r, n)
          }),
        (T.prototype.GetDoubleEntry = T.prototype.GetDoubleEntry =
          function (e, r) {
            var n = this.ptr
            return f.prepare(), e && typeof e == 'object' && (e = e.ptr), (r = r && typeof r == 'object' ? r.ptr : z(r)), Ke(n, e, r)
          }),
        (T.prototype.GetStringEntry = T.prototype.GetStringEntry =
          function (e, r) {
            var n = this.ptr
            return f.prepare(), e && typeof e == 'object' && (e = e.ptr), (r = r && typeof r == 'object' ? r.ptr : z(r)), i(Je(n, e, r))
          }),
        (T.prototype.NumEntries = T.prototype.NumEntries =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), $e(r, e)
          }),
        (T.prototype.GetEntryName = T.prototype.GetEntryName =
          function (e, r) {
            var n = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), r && typeof r == 'object' && (r = r.ptr), i(Ze(n, e, r))
          }),
        (T.prototype.__destroy__ = T.prototype.__destroy__ =
          function () {
            tr(this.ptr)
          }),
        (u.prototype = Object.create(m.prototype)),
        (u.prototype.constructor = u),
        (u.prototype.__class__ = u),
        (u.__cache__ = {}),
        (t.Decoder = u),
        (u.prototype.DecodeArrayToPointCloud = u.prototype.DecodeArrayToPointCloud =
          function (e, r, n) {
            var o = this.ptr
            return (
              f.prepare(),
              typeof e == 'object' && (e = _t(e)),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              E(rr(o, e, r, n), g)
            )
          }),
        (u.prototype.DecodeArrayToMesh = u.prototype.DecodeArrayToMesh =
          function (e, r, n) {
            var o = this.ptr
            return (
              f.prepare(),
              typeof e == 'object' && (e = _t(e)),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              E(nr(o, e, r, n), g)
            )
          }),
        (u.prototype.GetAttributeId = u.prototype.GetAttributeId =
          function (e, r) {
            var n = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), r && typeof r == 'object' && (r = r.ptr), or(n, e, r)
          }),
        (u.prototype.GetAttributeIdByName = u.prototype.GetAttributeIdByName =
          function (e, r) {
            var n = this.ptr
            return f.prepare(), e && typeof e == 'object' && (e = e.ptr), (r = r && typeof r == 'object' ? r.ptr : z(r)), _r(n, e, r)
          }),
        (u.prototype.GetAttributeIdByMetadataEntry = u.prototype.GetAttributeIdByMetadataEntry =
          function (e, r, n) {
            var o = this.ptr
            return (
              f.prepare(),
              e && typeof e == 'object' && (e = e.ptr),
              (r = r && typeof r == 'object' ? r.ptr : z(r)),
              (n = n && typeof n == 'object' ? n.ptr : z(n)),
              ir(o, e, r, n)
            )
          }),
        (u.prototype.GetAttribute = u.prototype.GetAttribute =
          function (e, r) {
            var n = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), r && typeof r == 'object' && (r = r.ptr), E(pr(n, e, r), h)
          }),
        (u.prototype.GetAttributeByUniqueId = u.prototype.GetAttributeByUniqueId =
          function (e, r) {
            var n = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), r && typeof r == 'object' && (r = r.ptr), E(ar(n, e, r), h)
          }),
        (u.prototype.GetMetadata = u.prototype.GetMetadata =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), E(ur(r, e), B)
          }),
        (u.prototype.GetAttributeMetadata = u.prototype.GetAttributeMetadata =
          function (e, r) {
            var n = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), r && typeof r == 'object' && (r = r.ptr), E(sr(n, e, r), B)
          }),
        (u.prototype.GetFaceFromMesh = u.prototype.GetFaceFromMesh =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!cr(o, e, r, n)
            )
          }),
        (u.prototype.GetTriangleStripsFromMesh = u.prototype.GetTriangleStripsFromMesh =
          function (e, r) {
            var n = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), r && typeof r == 'object' && (r = r.ptr), yr(n, e, r)
          }),
        (u.prototype.GetTrianglesUInt16Array = u.prototype.GetTrianglesUInt16Array =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!lr(o, e, r, n)
            )
          }),
        (u.prototype.GetTrianglesUInt32Array = u.prototype.GetTrianglesUInt32Array =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!mr(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeFloat = u.prototype.GetAttributeFloat =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!fr(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeFloatForAllPoints = u.prototype.GetAttributeFloatForAllPoints =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!dr(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeIntForAllPoints = u.prototype.GetAttributeIntForAllPoints =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!br(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeInt8ForAllPoints = u.prototype.GetAttributeInt8ForAllPoints =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!hr(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeUInt8ForAllPoints = u.prototype.GetAttributeUInt8ForAllPoints =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!Ar(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeInt16ForAllPoints = u.prototype.GetAttributeInt16ForAllPoints =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!Tr(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeUInt16ForAllPoints = u.prototype.GetAttributeUInt16ForAllPoints =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!Dr(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeInt32ForAllPoints = u.prototype.GetAttributeInt32ForAllPoints =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!Ir(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeUInt32ForAllPoints = u.prototype.GetAttributeUInt32ForAllPoints =
          function (e, r, n) {
            var o = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              !!gr(o, e, r, n)
            )
          }),
        (u.prototype.GetAttributeDataArrayForAllPoints = u.prototype.GetAttributeDataArrayForAllPoints =
          function (e, r, n, o, l) {
            var d = this.ptr
            return (
              e && typeof e == 'object' && (e = e.ptr),
              r && typeof r == 'object' && (r = r.ptr),
              n && typeof n == 'object' && (n = n.ptr),
              o && typeof o == 'object' && (o = o.ptr),
              l && typeof l == 'object' && (l = l.ptr),
              !!vr(d, e, r, n, o, l)
            )
          }),
        (u.prototype.SkipAttributeTransform = u.prototype.SkipAttributeTransform =
          function (e) {
            var r = this.ptr
            e && typeof e == 'object' && (e = e.ptr), Er(r, e)
          }),
        (u.prototype.GetEncodedGeometryType_Deprecated = u.prototype.GetEncodedGeometryType_Deprecated =
          function (e) {
            var r = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), Gr(r, e)
          }),
        (u.prototype.DecodeBufferToPointCloud = u.prototype.DecodeBufferToPointCloud =
          function (e, r) {
            var n = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), r && typeof r == 'object' && (r = r.ptr), E(Or(n, e, r), g)
          }),
        (u.prototype.DecodeBufferToMesh = u.prototype.DecodeBufferToMesh =
          function (e, r) {
            var n = this.ptr
            return e && typeof e == 'object' && (e = e.ptr), r && typeof r == 'object' && (r = r.ptr), E(jr(n, e, r), g)
          }),
        (u.prototype.__destroy__ = u.prototype.__destroy__ =
          function () {
            Pr(this.ptr)
          }),
        (function () {
          function e() {
            ;(t.ATTRIBUTE_INVALID_TRANSFORM = Rr()),
              (t.ATTRIBUTE_NO_TRANSFORM = Sr()),
              (t.ATTRIBUTE_QUANTIZATION_TRANSFORM = Mr()),
              (t.ATTRIBUTE_OCTAHEDRON_TRANSFORM = Nr()),
              (t.INVALID = Ur()),
              (t.POSITION = Fr()),
              (t.NORMAL = Lr()),
              (t.COLOR = Cr()),
              (t.TEX_COORD = wr()),
              (t.GENERIC = zr()),
              (t.INVALID_GEOMETRY_TYPE = Vr()),
              (t.POINT_CLOUD = Br()),
              (t.TRIANGULAR_MESH = Wr()),
              (t.DT_INVALID = xr()),
              (t.DT_INT8 = Qr()),
              (t.DT_UINT8 = Yr()),
              (t.DT_INT16 = Hr()),
              (t.DT_UINT16 = qr()),
              (t.DT_INT32 = kr()),
              (t.DT_UINT32 = Xr()),
              (t.DT_INT64 = Kr()),
              (t.DT_UINT64 = Jr()),
              (t.DT_FLOAT32 = $r()),
              (t.DT_FLOAT64 = Zr()),
              (t.DT_BOOL = tn()),
              (t.DT_TYPES_COUNT = en()),
              (t.OK = rn()),
              (t.DRACO_ERROR = nn()),
              (t.IO_ERROR = on()),
              (t.INVALID_PARAMETER = _n()),
              (t.UNSUPPORTED_VERSION = pn()),
              (t.UNKNOWN_VERSION = an())
          }
          Gt ? e() : ut.unshift(e)
        })(),
        typeof t.onModuleParsed == 'function' && t.onModuleParsed(),
        (t.Decoder.prototype.GetEncodedGeometryType = function (e) {
          if (e.__class__ && e.__class__ === t.DecoderBuffer) return t.Decoder.prototype.GetEncodedGeometryType_Deprecated(e)
          if (8 > e.byteLength) return t.INVALID_GEOMETRY_TYPE
          switch (e[7]) {
            case 0:
              return t.POINT_CLOUD
            case 1:
              return t.TRIANGULAR_MESH
            default:
              return t.INVALID_GEOMETRY_TYPE
          }
        }),
        s.ready
      )
    }
  )
})()
typeof exports == 'object' && typeof module == 'object'
  ? (module.exports = DracoDecoderModule)
  : typeof define == 'function' && define.amd
  ? define([], function () {
      return DracoDecoderModule
    })
  : typeof exports == 'object' && (exports.DracoDecoderModule = DracoDecoderModule)
