define(['exports', './defaultValue-f6d5e6da'], function (t, n) {
  'use strict'
  var i = function (t) {
    null == t && (t = new Date().getTime()),
      (this.N = 624),
      (this.M = 397),
      (this.MATRIX_A = 2567483615),
      (this.UPPER_MASK = 2147483648),
      (this.LOWER_MASK = 2147483647),
      (this.mt = new Array(this.N)),
      (this.mti = this.N + 1),
      t.constructor == Array ? this.init_by_array(t, t.length) : this.init_seed(t)
  }
  ;(i.prototype.init_seed = function (t) {
    for (this.mt[0] = t >>> 0, this.mti = 1; this.mti < this.N; this.mti++) {
      t = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30)
      ;(this.mt[this.mti] = ((1812433253 * ((4294901760 & t) >>> 16)) << 16) + 1812433253 * (65535 & t) + this.mti), (this.mt[this.mti] >>>= 0)
    }
  }),
    (i.prototype.init_by_array = function (t, n) {
      var i, e, r
      for (this.init_seed(19650218), i = 1, e = 0, r = this.N > n ? this.N : n; r; r--) {
        var a = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
        ;(this.mt[i] = (this.mt[i] ^ (((1664525 * ((4294901760 & a) >>> 16)) << 16) + 1664525 * (65535 & a))) + t[e] + e),
          (this.mt[i] >>>= 0),
          e++,
          ++i >= this.N && ((this.mt[0] = this.mt[this.N - 1]), (i = 1)),
          e >= n && (e = 0)
      }
      for (r = this.N - 1; r; r--) {
        a = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30)
        ;(this.mt[i] = (this.mt[i] ^ (((1566083941 * ((4294901760 & a) >>> 16)) << 16) + 1566083941 * (65535 & a))) - i),
          (this.mt[i] >>>= 0),
          ++i >= this.N && ((this.mt[0] = this.mt[this.N - 1]), (i = 1))
      }
      this.mt[0] = 2147483648
    }),
    (i.prototype.random_int = function () {
      var t,
        n = new Array(0, this.MATRIX_A)
      if (this.mti >= this.N) {
        var i
        for (this.mti == this.N + 1 && this.init_seed(5489), i = 0; i < this.N - this.M; i++)
          (t = (this.mt[i] & this.UPPER_MASK) | (this.mt[i + 1] & this.LOWER_MASK)), (this.mt[i] = this.mt[i + this.M] ^ (t >>> 1) ^ n[1 & t])
        for (; i < this.N - 1; i++)
          (t = (this.mt[i] & this.UPPER_MASK) | (this.mt[i + 1] & this.LOWER_MASK)),
            (this.mt[i] = this.mt[i + (this.M - this.N)] ^ (t >>> 1) ^ n[1 & t])
        ;(t = (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK)),
          (this.mt[this.N - 1] = this.mt[this.M - 1] ^ (t >>> 1) ^ n[1 & t]),
          (this.mti = 0)
      }
      return (t = this.mt[this.mti++]), (t ^= t >>> 11), (t ^= (t << 7) & 2636928640), (t ^= (t << 15) & 4022730752), (t ^= t >>> 18) >>> 0
    }),
    (i.prototype.random_int31 = function () {
      return this.random_int() >>> 1
    }),
    (i.prototype.random_incl = function () {
      return this.random_int() * (1 / 4294967295)
    }),
    (i.prototype.random = function () {
      return this.random_int() * (1 / 4294967296)
    }),
    (i.prototype.random_excl = function () {
      return (this.random_int() + 0.5) * (1 / 4294967296)
    }),
    (i.prototype.random_long = function () {
      return (67108864 * (this.random_int() >>> 5) + (this.random_int() >>> 6)) * (1 / 9007199254740992)
    })
  var e = i
  const r = {
    EPSILON1: 0.1,
    EPSILON2: 0.01,
    EPSILON3: 0.001,
    EPSILON4: 1e-4,
    EPSILON5: 1e-5,
    EPSILON6: 1e-6,
    EPSILON7: 1e-7,
    EPSILON8: 1e-8,
    EPSILON9: 1e-9,
    EPSILON10: 1e-10,
    EPSILON11: 1e-11,
    EPSILON12: 1e-12,
    EPSILON13: 1e-13,
    EPSILON14: 1e-14,
    EPSILON15: 1e-15,
    EPSILON16: 1e-16,
    EPSILON17: 1e-17,
    EPSILON18: 1e-18,
    EPSILON19: 1e-19,
    EPSILON20: 1e-20,
    EPSILON21: 1e-21,
    GRAVITATIONALPARAMETER: 3986004418e5,
    SOLAR_RADIUS: 6955e5,
    LUNAR_RADIUS: 1737400,
    SIXTY_FOUR_KILOBYTES: 65536,
    FOUR_GIGABYTES: 4294967296
  }
  ;(r.sign = n.defaultValue(Math.sign, function (t) {
    return 0 === (t = +t) || t != t ? t : t > 0 ? 1 : -1
  })),
    (r.signNotZero = function (t) {
      return t < 0 ? -1 : 1
    }),
    (r.toSNorm = function (t, i) {
      return (i = n.defaultValue(i, 255)), Math.round((0.5 * r.clamp(t, -1, 1) + 0.5) * i)
    }),
    (r.fromSNorm = function (t, i) {
      return (i = n.defaultValue(i, 255)), (r.clamp(t, 0, i) / i) * 2 - 1
    }),
    (r.normalize = function (t, n, i) {
      return 0 === (i = Math.max(i - n, 0)) ? 0 : r.clamp((t - n) / i, 0, 1)
    }),
    (r.sinh = n.defaultValue(Math.sinh, function (t) {
      return (Math.exp(t) - Math.exp(-t)) / 2
    })),
    (r.cosh = n.defaultValue(Math.cosh, function (t) {
      return (Math.exp(t) + Math.exp(-t)) / 2
    })),
    (r.lerp = function (t, n, i) {
      return (1 - i) * t + i * n
    }),
    (r.PI = Math.PI),
    (r.ONE_OVER_PI = 1 / Math.PI),
    (r.PI_OVER_TWO = Math.PI / 2),
    (r.PI_OVER_THREE = Math.PI / 3),
    (r.PI_OVER_FOUR = Math.PI / 4),
    (r.PI_OVER_SIX = Math.PI / 6),
    (r.THREE_PI_OVER_TWO = (3 * Math.PI) / 2),
    (r.TWO_PI = 2 * Math.PI),
    (r.ONE_OVER_TWO_PI = 1 / (2 * Math.PI)),
    (r.RADIANS_PER_DEGREE = Math.PI / 180),
    (r.DEGREES_PER_RADIAN = 180 / Math.PI),
    (r.RADIANS_PER_ARCSECOND = r.RADIANS_PER_DEGREE / 3600),
    (r.toRadians = function (t) {
      return t * r.RADIANS_PER_DEGREE
    }),
    (r.toDegrees = function (t) {
      return t * r.DEGREES_PER_RADIAN
    }),
    (r.convertLongitudeRange = function (t) {
      const n = r.TWO_PI,
        i = t - Math.floor(t / n) * n
      return i < -Math.PI ? i + n : i >= Math.PI ? i - n : i
    }),
    (r.clampToLatitudeRange = function (t) {
      return r.clamp(t, -1 * r.PI_OVER_TWO, r.PI_OVER_TWO)
    }),
    (r.negativePiToPi = function (t) {
      return t >= -r.PI && t <= r.PI ? t : r.zeroToTwoPi(t + r.PI) - r.PI
    }),
    (r.zeroToTwoPi = function (t) {
      if (t >= 0 && t <= r.TWO_PI) return t
      const n = r.mod(t, r.TWO_PI)
      return Math.abs(n) < r.EPSILON14 && Math.abs(t) > r.EPSILON14 ? r.TWO_PI : n
    }),
    (r.mod = function (t, n) {
      return r.sign(t) === r.sign(n) && Math.abs(t) < Math.abs(n) ? t : ((t % n) + n) % n
    }),
    (r.equalsEpsilon = function (t, i, e, r) {
      ;(e = n.defaultValue(e, 0)), (r = n.defaultValue(r, e))
      const a = Math.abs(t - i)
      return a <= r || a <= e * Math.max(Math.abs(t), Math.abs(i))
    }),
    (r.lessThan = function (t, n, i) {
      return t - n < -i
    }),
    (r.lessThanOrEquals = function (t, n, i) {
      return t - n < i
    }),
    (r.greaterThan = function (t, n, i) {
      return t - n > i
    }),
    (r.greaterThanOrEquals = function (t, n, i) {
      return t - n > -i
    })
  const a = [1]
  ;(r.factorial = function (t) {
    const n = a.length
    if (t >= n) {
      let i = a[n - 1]
      for (let e = n; e <= t; e++) {
        const t = i * e
        a.push(t), (i = t)
      }
    }
    return a[t]
  }),
    (r.incrementWrap = function (t, i, e) {
      return (e = n.defaultValue(e, 0)), ++t > i && (t = e), t
    }),
    (r.isPowerOfTwo = function (t) {
      return 0 !== t && 0 == (t & (t - 1))
    }),
    (r.nextPowerOfTwo = function (t) {
      return --t, (t |= t >> 1), (t |= t >> 2), (t |= t >> 4), (t |= t >> 8), (t |= t >> 16), ++t
    }),
    (r.previousPowerOfTwo = function (t) {
      return (t |= t >> 1), (t |= t >> 2), (t |= t >> 4), (t |= t >> 8), (t |= t >> 16), (t = ((t |= t >> 32) >>> 0) - (t >>> 1))
    }),
    (r.clamp = function (t, n, i) {
      return t < n ? n : t > i ? i : t
    })
  let s = new e()
  ;(r.setRandomNumberSeed = function (t) {
    s = new e(t)
  }),
    (r.nextRandomNumber = function () {
      return s.random()
    }),
    (r.randomBetween = function (t, n) {
      return r.nextRandomNumber() * (n - t) + t
    }),
    (r.acosClamped = function (t) {
      return Math.acos(r.clamp(t, -1, 1))
    }),
    (r.asinClamped = function (t) {
      return Math.asin(r.clamp(t, -1, 1))
    }),
    (r.chordLength = function (t, n) {
      return 2 * n * Math.sin(0.5 * t)
    }),
    (r.logBase = function (t, n) {
      return Math.log(t) / Math.log(n)
    }),
    (r.cbrt = n.defaultValue(Math.cbrt, function (t) {
      const n = Math.pow(Math.abs(t), 1 / 3)
      return t < 0 ? -n : n
    })),
    (r.log2 = n.defaultValue(Math.log2, function (t) {
      return Math.log(t) * Math.LOG2E
    })),
    (r.fog = function (t, n) {
      const i = t * n
      return 1 - Math.exp(-i * i)
    }),
    (r.fastApproximateAtan = function (t) {
      return t * (-0.1784 * Math.abs(t) - 0.0663 * t * t + 1.0301)
    }),
    (r.fastApproximateAtan2 = function (t, n) {
      let i,
        e = Math.abs(t)
      i = Math.abs(n)
      const a = Math.max(e, i)
      i = Math.min(e, i)
      const s = i / a
      return (
        (e = r.fastApproximateAtan(s)), (e = Math.abs(n) > Math.abs(t) ? r.PI_OVER_TWO - e : e), (e = t < 0 ? r.PI - e : e), (e = n < 0 ? -e : e), e
      )
    })
  var h = r
  t.CesiumMath = h
})
