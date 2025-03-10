;(() => {
  window.cesiumGoogleEarthDbRootParser = function (d) {
    'use strict'
    var f = d.Reader,
      u = d.util,
      n = d.roots.default || (d.roots.default = {})
    return (
      (n.keyhole = (function () {
        var b = {}
        return (
          (b.dbroot = (function () {
            var c = {}
            return (
              (c.StringEntryProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.stringId = 0),
                  (i.prototype.stringValue = ''),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.StringEntryProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.stringId = r.fixed32()
                          break
                        }
                        case 2: {
                          o.stringValue = r.string()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('stringId')) throw u.ProtocolError("missing required 'stringId'", { instance: o })
                    if (!o.hasOwnProperty('stringValue')) throw u.ProtocolError("missing required 'stringValue'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : u.isInteger(r.stringId)
                      ? u.isString(r.stringValue)
                        ? null
                        : 'stringValue: string expected'
                      : 'stringId: integer expected'
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.StringEntryProto) return r
                    var t = new n.keyhole.dbroot.StringEntryProto()
                    return r.stringId != null && (t.stringId = r.stringId >>> 0), r.stringValue != null && (t.stringValue = String(r.stringValue)), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.stringId = 0), (e.stringValue = '')),
                      r.stringId != null && r.hasOwnProperty('stringId') && (e.stringId = r.stringId),
                      r.stringValue != null && r.hasOwnProperty('stringValue') && (e.stringValue = r.stringValue),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.StringEntryProto'
                  }),
                  i
                )
              })()),
              (c.StringIdOrValueProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.stringId = 0),
                  (i.prototype.value = ''),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.StringIdOrValueProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.stringId = r.fixed32()
                          break
                        }
                        case 2: {
                          o.value = r.string()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : r.stringId != null && r.hasOwnProperty('stringId') && !u.isInteger(r.stringId)
                      ? 'stringId: integer expected'
                      : r.value != null && r.hasOwnProperty('value') && !u.isString(r.value)
                      ? 'value: string expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.StringIdOrValueProto) return r
                    var t = new n.keyhole.dbroot.StringIdOrValueProto()
                    return r.stringId != null && (t.stringId = r.stringId >>> 0), r.value != null && (t.value = String(r.value)), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.stringId = 0), (e.value = '')),
                      r.stringId != null && r.hasOwnProperty('stringId') && (e.stringId = r.stringId),
                      r.value != null && r.hasOwnProperty('value') && (e.value = r.value),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.StringIdOrValueProto'
                  }),
                  i
                )
              })()),
              (c.PlanetModelProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.radius = 6378.137),
                  (i.prototype.flattening = 0.00335281066474748),
                  (i.prototype.elevationBias = 0),
                  (i.prototype.negativeAltitudeExponentBias = 0),
                  (i.prototype.compressedNegativeAltitudeThreshold = 0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.PlanetModelProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.radius = r.double()
                          break
                        }
                        case 2: {
                          o.flattening = r.double()
                          break
                        }
                        case 4: {
                          o.elevationBias = r.double()
                          break
                        }
                        case 5: {
                          o.negativeAltitudeExponentBias = r.int32()
                          break
                        }
                        case 6: {
                          o.compressedNegativeAltitudeThreshold = r.double()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : r.radius != null && r.hasOwnProperty('radius') && typeof r.radius != 'number'
                      ? 'radius: number expected'
                      : r.flattening != null && r.hasOwnProperty('flattening') && typeof r.flattening != 'number'
                      ? 'flattening: number expected'
                      : r.elevationBias != null && r.hasOwnProperty('elevationBias') && typeof r.elevationBias != 'number'
                      ? 'elevationBias: number expected'
                      : r.negativeAltitudeExponentBias != null &&
                        r.hasOwnProperty('negativeAltitudeExponentBias') &&
                        !u.isInteger(r.negativeAltitudeExponentBias)
                      ? 'negativeAltitudeExponentBias: integer expected'
                      : r.compressedNegativeAltitudeThreshold != null &&
                        r.hasOwnProperty('compressedNegativeAltitudeThreshold') &&
                        typeof r.compressedNegativeAltitudeThreshold != 'number'
                      ? 'compressedNegativeAltitudeThreshold: number expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.PlanetModelProto) return r
                    var t = new n.keyhole.dbroot.PlanetModelProto()
                    return (
                      r.radius != null && (t.radius = Number(r.radius)),
                      r.flattening != null && (t.flattening = Number(r.flattening)),
                      r.elevationBias != null && (t.elevationBias = Number(r.elevationBias)),
                      r.negativeAltitudeExponentBias != null && (t.negativeAltitudeExponentBias = r.negativeAltitudeExponentBias | 0),
                      r.compressedNegativeAltitudeThreshold != null &&
                        (t.compressedNegativeAltitudeThreshold = Number(r.compressedNegativeAltitudeThreshold)),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults &&
                        ((e.radius = 6378.137),
                        (e.flattening = 0.00335281066474748),
                        (e.elevationBias = 0),
                        (e.negativeAltitudeExponentBias = 0),
                        (e.compressedNegativeAltitudeThreshold = 0)),
                      r.radius != null && r.hasOwnProperty('radius') && (e.radius = t.json && !isFinite(r.radius) ? String(r.radius) : r.radius),
                      r.flattening != null &&
                        r.hasOwnProperty('flattening') &&
                        (e.flattening = t.json && !isFinite(r.flattening) ? String(r.flattening) : r.flattening),
                      r.elevationBias != null &&
                        r.hasOwnProperty('elevationBias') &&
                        (e.elevationBias = t.json && !isFinite(r.elevationBias) ? String(r.elevationBias) : r.elevationBias),
                      r.negativeAltitudeExponentBias != null &&
                        r.hasOwnProperty('negativeAltitudeExponentBias') &&
                        (e.negativeAltitudeExponentBias = r.negativeAltitudeExponentBias),
                      r.compressedNegativeAltitudeThreshold != null &&
                        r.hasOwnProperty('compressedNegativeAltitudeThreshold') &&
                        (e.compressedNegativeAltitudeThreshold =
                          t.json && !isFinite(r.compressedNegativeAltitudeThreshold)
                            ? String(r.compressedNegativeAltitudeThreshold)
                            : r.compressedNegativeAltitudeThreshold),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.PlanetModelProto'
                  }),
                  i
                )
              })()),
              (c.ProviderInfoProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.providerId = 0),
                  (i.prototype.copyrightString = null),
                  (i.prototype.verticalPixelOffset = -1),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.ProviderInfoProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.providerId = r.int32()
                          break
                        }
                        case 2: {
                          o.copyrightString = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 3: {
                          o.verticalPixelOffset = r.int32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('providerId')) throw u.ProtocolError("missing required 'providerId'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (!u.isInteger(r.providerId)) return 'providerId: integer expected'
                    if (r.copyrightString != null && r.hasOwnProperty('copyrightString')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.copyrightString)
                      if (t) return 'copyrightString.' + t
                    }
                    return r.verticalPixelOffset != null && r.hasOwnProperty('verticalPixelOffset') && !u.isInteger(r.verticalPixelOffset)
                      ? 'verticalPixelOffset: integer expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.ProviderInfoProto) return r
                    var t = new n.keyhole.dbroot.ProviderInfoProto()
                    if ((r.providerId != null && (t.providerId = r.providerId | 0), r.copyrightString != null)) {
                      if (typeof r.copyrightString != 'object') throw TypeError('.keyhole.dbroot.ProviderInfoProto.copyrightString: object expected')
                      t.copyrightString = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.copyrightString)
                    }
                    return r.verticalPixelOffset != null && (t.verticalPixelOffset = r.verticalPixelOffset | 0), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.providerId = 0), (e.copyrightString = null), (e.verticalPixelOffset = -1)),
                      r.providerId != null && r.hasOwnProperty('providerId') && (e.providerId = r.providerId),
                      r.copyrightString != null &&
                        r.hasOwnProperty('copyrightString') &&
                        (e.copyrightString = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.copyrightString, t)),
                      r.verticalPixelOffset != null && r.hasOwnProperty('verticalPixelOffset') && (e.verticalPixelOffset = r.verticalPixelOffset),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.ProviderInfoProto'
                  }),
                  i
                )
              })()),
              (c.PopUpProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.isBalloonStyle = !1),
                  (i.prototype.text = null),
                  (i.prototype.backgroundColorAbgr = 4294967295),
                  (i.prototype.textColorAbgr = 4278190080),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.PopUpProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.isBalloonStyle = r.bool()
                          break
                        }
                        case 2: {
                          o.text = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 3: {
                          o.backgroundColorAbgr = r.fixed32()
                          break
                        }
                        case 4: {
                          o.textColorAbgr = r.fixed32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.isBalloonStyle != null && r.hasOwnProperty('isBalloonStyle') && typeof r.isBalloonStyle != 'boolean')
                      return 'isBalloonStyle: boolean expected'
                    if (r.text != null && r.hasOwnProperty('text')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.text)
                      if (t) return 'text.' + t
                    }
                    return r.backgroundColorAbgr != null && r.hasOwnProperty('backgroundColorAbgr') && !u.isInteger(r.backgroundColorAbgr)
                      ? 'backgroundColorAbgr: integer expected'
                      : r.textColorAbgr != null && r.hasOwnProperty('textColorAbgr') && !u.isInteger(r.textColorAbgr)
                      ? 'textColorAbgr: integer expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.PopUpProto) return r
                    var t = new n.keyhole.dbroot.PopUpProto()
                    if ((r.isBalloonStyle != null && (t.isBalloonStyle = !!r.isBalloonStyle), r.text != null)) {
                      if (typeof r.text != 'object') throw TypeError('.keyhole.dbroot.PopUpProto.text: object expected')
                      t.text = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.text)
                    }
                    return (
                      r.backgroundColorAbgr != null && (t.backgroundColorAbgr = r.backgroundColorAbgr >>> 0),
                      r.textColorAbgr != null && (t.textColorAbgr = r.textColorAbgr >>> 0),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.isBalloonStyle = !1), (e.text = null), (e.backgroundColorAbgr = 4294967295), (e.textColorAbgr = 4278190080)),
                      r.isBalloonStyle != null && r.hasOwnProperty('isBalloonStyle') && (e.isBalloonStyle = r.isBalloonStyle),
                      r.text != null && r.hasOwnProperty('text') && (e.text = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.text, t)),
                      r.backgroundColorAbgr != null && r.hasOwnProperty('backgroundColorAbgr') && (e.backgroundColorAbgr = r.backgroundColorAbgr),
                      r.textColorAbgr != null && r.hasOwnProperty('textColorAbgr') && (e.textColorAbgr = r.textColorAbgr),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.PopUpProto'
                  }),
                  i
                )
              })()),
              (c.StyleAttributeProto = (function () {
                function i(l) {
                  if (((this.drawFlag = []), l)) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.styleId = ''),
                  (i.prototype.providerId = 0),
                  (i.prototype.polyColorAbgr = 4294967295),
                  (i.prototype.lineColorAbgr = 4294967295),
                  (i.prototype.lineWidth = 1),
                  (i.prototype.labelColorAbgr = 4294967295),
                  (i.prototype.labelScale = 1),
                  (i.prototype.placemarkIconColorAbgr = 4294967295),
                  (i.prototype.placemarkIconScale = 1),
                  (i.prototype.placemarkIconPath = null),
                  (i.prototype.placemarkIconX = 0),
                  (i.prototype.placemarkIconY = 0),
                  (i.prototype.placemarkIconWidth = 32),
                  (i.prototype.placemarkIconHeight = 32),
                  (i.prototype.popUp = null),
                  (i.prototype.drawFlag = u.emptyArray),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.StyleAttributeProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.styleId = r.string()
                          break
                        }
                        case 3: {
                          o.providerId = r.int32()
                          break
                        }
                        case 4: {
                          o.polyColorAbgr = r.fixed32()
                          break
                        }
                        case 5: {
                          o.lineColorAbgr = r.fixed32()
                          break
                        }
                        case 6: {
                          o.lineWidth = r.float()
                          break
                        }
                        case 7: {
                          o.labelColorAbgr = r.fixed32()
                          break
                        }
                        case 8: {
                          o.labelScale = r.float()
                          break
                        }
                        case 9: {
                          o.placemarkIconColorAbgr = r.fixed32()
                          break
                        }
                        case 10: {
                          o.placemarkIconScale = r.float()
                          break
                        }
                        case 11: {
                          o.placemarkIconPath = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 12: {
                          o.placemarkIconX = r.int32()
                          break
                        }
                        case 13: {
                          o.placemarkIconY = r.int32()
                          break
                        }
                        case 14: {
                          o.placemarkIconWidth = r.int32()
                          break
                        }
                        case 15: {
                          o.placemarkIconHeight = r.int32()
                          break
                        }
                        case 16: {
                          o.popUp = n.keyhole.dbroot.PopUpProto.decode(r, r.uint32())
                          break
                        }
                        case 17: {
                          ;(o.drawFlag && o.drawFlag.length) || (o.drawFlag = []),
                            o.drawFlag.push(n.keyhole.dbroot.DrawFlagProto.decode(r, r.uint32()))
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('styleId')) throw u.ProtocolError("missing required 'styleId'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (!u.isString(r.styleId)) return 'styleId: string expected'
                    if (r.providerId != null && r.hasOwnProperty('providerId') && !u.isInteger(r.providerId)) return 'providerId: integer expected'
                    if (r.polyColorAbgr != null && r.hasOwnProperty('polyColorAbgr') && !u.isInteger(r.polyColorAbgr))
                      return 'polyColorAbgr: integer expected'
                    if (r.lineColorAbgr != null && r.hasOwnProperty('lineColorAbgr') && !u.isInteger(r.lineColorAbgr))
                      return 'lineColorAbgr: integer expected'
                    if (r.lineWidth != null && r.hasOwnProperty('lineWidth') && typeof r.lineWidth != 'number') return 'lineWidth: number expected'
                    if (r.labelColorAbgr != null && r.hasOwnProperty('labelColorAbgr') && !u.isInteger(r.labelColorAbgr))
                      return 'labelColorAbgr: integer expected'
                    if (r.labelScale != null && r.hasOwnProperty('labelScale') && typeof r.labelScale != 'number')
                      return 'labelScale: number expected'
                    if (r.placemarkIconColorAbgr != null && r.hasOwnProperty('placemarkIconColorAbgr') && !u.isInteger(r.placemarkIconColorAbgr))
                      return 'placemarkIconColorAbgr: integer expected'
                    if (r.placemarkIconScale != null && r.hasOwnProperty('placemarkIconScale') && typeof r.placemarkIconScale != 'number')
                      return 'placemarkIconScale: number expected'
                    if (r.placemarkIconPath != null && r.hasOwnProperty('placemarkIconPath')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.placemarkIconPath)
                      if (t) return 'placemarkIconPath.' + t
                    }
                    if (r.placemarkIconX != null && r.hasOwnProperty('placemarkIconX') && !u.isInteger(r.placemarkIconX))
                      return 'placemarkIconX: integer expected'
                    if (r.placemarkIconY != null && r.hasOwnProperty('placemarkIconY') && !u.isInteger(r.placemarkIconY))
                      return 'placemarkIconY: integer expected'
                    if (r.placemarkIconWidth != null && r.hasOwnProperty('placemarkIconWidth') && !u.isInteger(r.placemarkIconWidth))
                      return 'placemarkIconWidth: integer expected'
                    if (r.placemarkIconHeight != null && r.hasOwnProperty('placemarkIconHeight') && !u.isInteger(r.placemarkIconHeight))
                      return 'placemarkIconHeight: integer expected'
                    if (r.popUp != null && r.hasOwnProperty('popUp')) {
                      var t = n.keyhole.dbroot.PopUpProto.verify(r.popUp)
                      if (t) return 'popUp.' + t
                    }
                    if (r.drawFlag != null && r.hasOwnProperty('drawFlag')) {
                      if (!Array.isArray(r.drawFlag)) return 'drawFlag: array expected'
                      for (var e = 0; e < r.drawFlag.length; ++e) {
                        var t = n.keyhole.dbroot.DrawFlagProto.verify(r.drawFlag[e])
                        if (t) return 'drawFlag.' + t
                      }
                    }
                    return null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.StyleAttributeProto) return r
                    var t = new n.keyhole.dbroot.StyleAttributeProto()
                    if (
                      (r.styleId != null && (t.styleId = String(r.styleId)),
                      r.providerId != null && (t.providerId = r.providerId | 0),
                      r.polyColorAbgr != null && (t.polyColorAbgr = r.polyColorAbgr >>> 0),
                      r.lineColorAbgr != null && (t.lineColorAbgr = r.lineColorAbgr >>> 0),
                      r.lineWidth != null && (t.lineWidth = Number(r.lineWidth)),
                      r.labelColorAbgr != null && (t.labelColorAbgr = r.labelColorAbgr >>> 0),
                      r.labelScale != null && (t.labelScale = Number(r.labelScale)),
                      r.placemarkIconColorAbgr != null && (t.placemarkIconColorAbgr = r.placemarkIconColorAbgr >>> 0),
                      r.placemarkIconScale != null && (t.placemarkIconScale = Number(r.placemarkIconScale)),
                      r.placemarkIconPath != null)
                    ) {
                      if (typeof r.placemarkIconPath != 'object')
                        throw TypeError('.keyhole.dbroot.StyleAttributeProto.placemarkIconPath: object expected')
                      t.placemarkIconPath = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.placemarkIconPath)
                    }
                    if (
                      (r.placemarkIconX != null && (t.placemarkIconX = r.placemarkIconX | 0),
                      r.placemarkIconY != null && (t.placemarkIconY = r.placemarkIconY | 0),
                      r.placemarkIconWidth != null && (t.placemarkIconWidth = r.placemarkIconWidth | 0),
                      r.placemarkIconHeight != null && (t.placemarkIconHeight = r.placemarkIconHeight | 0),
                      r.popUp != null)
                    ) {
                      if (typeof r.popUp != 'object') throw TypeError('.keyhole.dbroot.StyleAttributeProto.popUp: object expected')
                      t.popUp = n.keyhole.dbroot.PopUpProto.fromObject(r.popUp)
                    }
                    if (r.drawFlag) {
                      if (!Array.isArray(r.drawFlag)) throw TypeError('.keyhole.dbroot.StyleAttributeProto.drawFlag: array expected')
                      t.drawFlag = []
                      for (var e = 0; e < r.drawFlag.length; ++e) {
                        if (typeof r.drawFlag[e] != 'object') throw TypeError('.keyhole.dbroot.StyleAttributeProto.drawFlag: object expected')
                        t.drawFlag[e] = n.keyhole.dbroot.DrawFlagProto.fromObject(r.drawFlag[e])
                      }
                    }
                    return t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    if (
                      ((t.arrays || t.defaults) && (e.drawFlag = []),
                      t.defaults &&
                        ((e.styleId = ''),
                        (e.providerId = 0),
                        (e.polyColorAbgr = 4294967295),
                        (e.lineColorAbgr = 4294967295),
                        (e.lineWidth = 1),
                        (e.labelColorAbgr = 4294967295),
                        (e.labelScale = 1),
                        (e.placemarkIconColorAbgr = 4294967295),
                        (e.placemarkIconScale = 1),
                        (e.placemarkIconPath = null),
                        (e.placemarkIconX = 0),
                        (e.placemarkIconY = 0),
                        (e.placemarkIconWidth = 32),
                        (e.placemarkIconHeight = 32),
                        (e.popUp = null)),
                      r.styleId != null && r.hasOwnProperty('styleId') && (e.styleId = r.styleId),
                      r.providerId != null && r.hasOwnProperty('providerId') && (e.providerId = r.providerId),
                      r.polyColorAbgr != null && r.hasOwnProperty('polyColorAbgr') && (e.polyColorAbgr = r.polyColorAbgr),
                      r.lineColorAbgr != null && r.hasOwnProperty('lineColorAbgr') && (e.lineColorAbgr = r.lineColorAbgr),
                      r.lineWidth != null &&
                        r.hasOwnProperty('lineWidth') &&
                        (e.lineWidth = t.json && !isFinite(r.lineWidth) ? String(r.lineWidth) : r.lineWidth),
                      r.labelColorAbgr != null && r.hasOwnProperty('labelColorAbgr') && (e.labelColorAbgr = r.labelColorAbgr),
                      r.labelScale != null &&
                        r.hasOwnProperty('labelScale') &&
                        (e.labelScale = t.json && !isFinite(r.labelScale) ? String(r.labelScale) : r.labelScale),
                      r.placemarkIconColorAbgr != null &&
                        r.hasOwnProperty('placemarkIconColorAbgr') &&
                        (e.placemarkIconColorAbgr = r.placemarkIconColorAbgr),
                      r.placemarkIconScale != null &&
                        r.hasOwnProperty('placemarkIconScale') &&
                        (e.placemarkIconScale = t.json && !isFinite(r.placemarkIconScale) ? String(r.placemarkIconScale) : r.placemarkIconScale),
                      r.placemarkIconPath != null &&
                        r.hasOwnProperty('placemarkIconPath') &&
                        (e.placemarkIconPath = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.placemarkIconPath, t)),
                      r.placemarkIconX != null && r.hasOwnProperty('placemarkIconX') && (e.placemarkIconX = r.placemarkIconX),
                      r.placemarkIconY != null && r.hasOwnProperty('placemarkIconY') && (e.placemarkIconY = r.placemarkIconY),
                      r.placemarkIconWidth != null && r.hasOwnProperty('placemarkIconWidth') && (e.placemarkIconWidth = r.placemarkIconWidth),
                      r.placemarkIconHeight != null && r.hasOwnProperty('placemarkIconHeight') && (e.placemarkIconHeight = r.placemarkIconHeight),
                      r.popUp != null && r.hasOwnProperty('popUp') && (e.popUp = n.keyhole.dbroot.PopUpProto.toObject(r.popUp, t)),
                      r.drawFlag && r.drawFlag.length)
                    ) {
                      e.drawFlag = []
                      for (var o = 0; o < r.drawFlag.length; ++o) e.drawFlag[o] = n.keyhole.dbroot.DrawFlagProto.toObject(r.drawFlag[o], t)
                    }
                    return e
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.StyleAttributeProto'
                  }),
                  i
                )
              })()),
              (c.StyleMapProto = (function () {
                function i(l) {
                  if (((this.channelId = []), l)) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.styleMapId = 0),
                  (i.prototype.channelId = u.emptyArray),
                  (i.prototype.normalStyleAttribute = 0),
                  (i.prototype.highlightStyleAttribute = 0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.StyleMapProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.styleMapId = r.int32()
                          break
                        }
                        case 2: {
                          if (((o.channelId && o.channelId.length) || (o.channelId = []), (a & 7) === 2))
                            for (var p = r.uint32() + r.pos; r.pos < p; ) o.channelId.push(r.int32())
                          else o.channelId.push(r.int32())
                          break
                        }
                        case 3: {
                          o.normalStyleAttribute = r.int32()
                          break
                        }
                        case 4: {
                          o.highlightStyleAttribute = r.int32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('styleMapId')) throw u.ProtocolError("missing required 'styleMapId'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (!u.isInteger(r.styleMapId)) return 'styleMapId: integer expected'
                    if (r.channelId != null && r.hasOwnProperty('channelId')) {
                      if (!Array.isArray(r.channelId)) return 'channelId: array expected'
                      for (var t = 0; t < r.channelId.length; ++t) if (!u.isInteger(r.channelId[t])) return 'channelId: integer[] expected'
                    }
                    return r.normalStyleAttribute != null && r.hasOwnProperty('normalStyleAttribute') && !u.isInteger(r.normalStyleAttribute)
                      ? 'normalStyleAttribute: integer expected'
                      : r.highlightStyleAttribute != null && r.hasOwnProperty('highlightStyleAttribute') && !u.isInteger(r.highlightStyleAttribute)
                      ? 'highlightStyleAttribute: integer expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.StyleMapProto) return r
                    var t = new n.keyhole.dbroot.StyleMapProto()
                    if ((r.styleMapId != null && (t.styleMapId = r.styleMapId | 0), r.channelId)) {
                      if (!Array.isArray(r.channelId)) throw TypeError('.keyhole.dbroot.StyleMapProto.channelId: array expected')
                      t.channelId = []
                      for (var e = 0; e < r.channelId.length; ++e) t.channelId[e] = r.channelId[e] | 0
                    }
                    return (
                      r.normalStyleAttribute != null && (t.normalStyleAttribute = r.normalStyleAttribute | 0),
                      r.highlightStyleAttribute != null && (t.highlightStyleAttribute = r.highlightStyleAttribute | 0),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    if (
                      ((t.arrays || t.defaults) && (e.channelId = []),
                      t.defaults && ((e.styleMapId = 0), (e.normalStyleAttribute = 0), (e.highlightStyleAttribute = 0)),
                      r.styleMapId != null && r.hasOwnProperty('styleMapId') && (e.styleMapId = r.styleMapId),
                      r.channelId && r.channelId.length)
                    ) {
                      e.channelId = []
                      for (var o = 0; o < r.channelId.length; ++o) e.channelId[o] = r.channelId[o]
                    }
                    return (
                      r.normalStyleAttribute != null && r.hasOwnProperty('normalStyleAttribute') && (e.normalStyleAttribute = r.normalStyleAttribute),
                      r.highlightStyleAttribute != null &&
                        r.hasOwnProperty('highlightStyleAttribute') &&
                        (e.highlightStyleAttribute = r.highlightStyleAttribute),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.StyleMapProto'
                  }),
                  i
                )
              })()),
              (c.ZoomRangeProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.minZoom = 0),
                  (i.prototype.maxZoom = 0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.ZoomRangeProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.minZoom = r.int32()
                          break
                        }
                        case 2: {
                          o.maxZoom = r.int32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('minZoom')) throw u.ProtocolError("missing required 'minZoom'", { instance: o })
                    if (!o.hasOwnProperty('maxZoom')) throw u.ProtocolError("missing required 'maxZoom'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : u.isInteger(r.minZoom)
                      ? u.isInteger(r.maxZoom)
                        ? null
                        : 'maxZoom: integer expected'
                      : 'minZoom: integer expected'
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.ZoomRangeProto) return r
                    var t = new n.keyhole.dbroot.ZoomRangeProto()
                    return r.minZoom != null && (t.minZoom = r.minZoom | 0), r.maxZoom != null && (t.maxZoom = r.maxZoom | 0), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.minZoom = 0), (e.maxZoom = 0)),
                      r.minZoom != null && r.hasOwnProperty('minZoom') && (e.minZoom = r.minZoom),
                      r.maxZoom != null && r.hasOwnProperty('maxZoom') && (e.maxZoom = r.maxZoom),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.ZoomRangeProto'
                  }),
                  i
                )
              })()),
              (c.DrawFlagProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.drawFlagType = 1),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.DrawFlagProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.drawFlagType = r.int32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('drawFlagType')) throw u.ProtocolError("missing required 'drawFlagType'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    switch (r.drawFlagType) {
                      default:
                        return 'drawFlagType: enum value expected'
                      case 1:
                      case 2:
                      case 3:
                      case 4:
                      case 5:
                        break
                    }
                    return null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.DrawFlagProto) return r
                    var t = new n.keyhole.dbroot.DrawFlagProto()
                    switch (r.drawFlagType) {
                      case 'TYPE_FILL_ONLY':
                      case 1:
                        t.drawFlagType = 1
                        break
                      case 'TYPE_OUTLINE_ONLY':
                      case 2:
                        t.drawFlagType = 2
                        break
                      case 'TYPE_FILL_AND_OUTLINE':
                      case 3:
                        t.drawFlagType = 3
                        break
                      case 'TYPE_ANTIALIASING':
                      case 4:
                        t.drawFlagType = 4
                        break
                      case 'TYPE_CENTER_LABEL':
                      case 5:
                        t.drawFlagType = 5
                        break
                    }
                    return t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && (e.drawFlagType = t.enums === String ? 'TYPE_FILL_ONLY' : 1),
                      r.drawFlagType != null &&
                        r.hasOwnProperty('drawFlagType') &&
                        (e.drawFlagType = t.enums === String ? n.keyhole.dbroot.DrawFlagProto.DrawFlagType[r.drawFlagType] : r.drawFlagType),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.DrawFlagProto'
                  }),
                  (i.DrawFlagType = (function () {
                    var l = {},
                      r = Object.create(l)
                    return (
                      (r[(l[1] = 'TYPE_FILL_ONLY')] = 1),
                      (r[(l[2] = 'TYPE_OUTLINE_ONLY')] = 2),
                      (r[(l[3] = 'TYPE_FILL_AND_OUTLINE')] = 3),
                      (r[(l[4] = 'TYPE_ANTIALIASING')] = 4),
                      (r[(l[5] = 'TYPE_CENTER_LABEL')] = 5),
                      r
                    )
                  })()),
                  i
                )
              })()),
              (c.LayerProto = (function () {
                function i(l) {
                  if (((this.zoomRange = []), l)) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.zoomRange = u.emptyArray),
                  (i.prototype.preserveTextLevel = 30),
                  (i.prototype.lodBeginTransition = !1),
                  (i.prototype.lodEndTransition = !1),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.LayerProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          ;(o.zoomRange && o.zoomRange.length) || (o.zoomRange = []),
                            o.zoomRange.push(n.keyhole.dbroot.ZoomRangeProto.decode(r, r.uint32()))
                          break
                        }
                        case 2: {
                          o.preserveTextLevel = r.int32()
                          break
                        }
                        case 4: {
                          o.lodBeginTransition = r.bool()
                          break
                        }
                        case 5: {
                          o.lodEndTransition = r.bool()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.zoomRange != null && r.hasOwnProperty('zoomRange')) {
                      if (!Array.isArray(r.zoomRange)) return 'zoomRange: array expected'
                      for (var t = 0; t < r.zoomRange.length; ++t) {
                        var e = n.keyhole.dbroot.ZoomRangeProto.verify(r.zoomRange[t])
                        if (e) return 'zoomRange.' + e
                      }
                    }
                    return r.preserveTextLevel != null && r.hasOwnProperty('preserveTextLevel') && !u.isInteger(r.preserveTextLevel)
                      ? 'preserveTextLevel: integer expected'
                      : r.lodBeginTransition != null && r.hasOwnProperty('lodBeginTransition') && typeof r.lodBeginTransition != 'boolean'
                      ? 'lodBeginTransition: boolean expected'
                      : r.lodEndTransition != null && r.hasOwnProperty('lodEndTransition') && typeof r.lodEndTransition != 'boolean'
                      ? 'lodEndTransition: boolean expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.LayerProto) return r
                    var t = new n.keyhole.dbroot.LayerProto()
                    if (r.zoomRange) {
                      if (!Array.isArray(r.zoomRange)) throw TypeError('.keyhole.dbroot.LayerProto.zoomRange: array expected')
                      t.zoomRange = []
                      for (var e = 0; e < r.zoomRange.length; ++e) {
                        if (typeof r.zoomRange[e] != 'object') throw TypeError('.keyhole.dbroot.LayerProto.zoomRange: object expected')
                        t.zoomRange[e] = n.keyhole.dbroot.ZoomRangeProto.fromObject(r.zoomRange[e])
                      }
                    }
                    return (
                      r.preserveTextLevel != null && (t.preserveTextLevel = r.preserveTextLevel | 0),
                      r.lodBeginTransition != null && (t.lodBeginTransition = !!r.lodBeginTransition),
                      r.lodEndTransition != null && (t.lodEndTransition = !!r.lodEndTransition),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    if (
                      ((t.arrays || t.defaults) && (e.zoomRange = []),
                      t.defaults && ((e.preserveTextLevel = 30), (e.lodBeginTransition = !1), (e.lodEndTransition = !1)),
                      r.zoomRange && r.zoomRange.length)
                    ) {
                      e.zoomRange = []
                      for (var o = 0; o < r.zoomRange.length; ++o) e.zoomRange[o] = n.keyhole.dbroot.ZoomRangeProto.toObject(r.zoomRange[o], t)
                    }
                    return (
                      r.preserveTextLevel != null && r.hasOwnProperty('preserveTextLevel') && (e.preserveTextLevel = r.preserveTextLevel),
                      r.lodBeginTransition != null && r.hasOwnProperty('lodBeginTransition') && (e.lodBeginTransition = r.lodBeginTransition),
                      r.lodEndTransition != null && r.hasOwnProperty('lodEndTransition') && (e.lodEndTransition = r.lodEndTransition),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.LayerProto'
                  }),
                  i
                )
              })()),
              (c.FolderProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.isExpandable = !0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.FolderProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.isExpandable = r.bool()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : r.isExpandable != null && r.hasOwnProperty('isExpandable') && typeof r.isExpandable != 'boolean'
                      ? 'isExpandable: boolean expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.FolderProto) return r
                    var t = new n.keyhole.dbroot.FolderProto()
                    return r.isExpandable != null && (t.isExpandable = !!r.isExpandable), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && (e.isExpandable = !0),
                      r.isExpandable != null && r.hasOwnProperty('isExpandable') && (e.isExpandable = r.isExpandable),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.FolderProto'
                  }),
                  i
                )
              })()),
              (c.RequirementProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.requiredVram = ''),
                  (i.prototype.requiredClientVer = ''),
                  (i.prototype.probability = ''),
                  (i.prototype.requiredUserAgent = ''),
                  (i.prototype.requiredClientCapabilities = ''),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.RequirementProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 3: {
                          o.requiredVram = r.string()
                          break
                        }
                        case 4: {
                          o.requiredClientVer = r.string()
                          break
                        }
                        case 5: {
                          o.probability = r.string()
                          break
                        }
                        case 6: {
                          o.requiredUserAgent = r.string()
                          break
                        }
                        case 7: {
                          o.requiredClientCapabilities = r.string()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : r.requiredVram != null && r.hasOwnProperty('requiredVram') && !u.isString(r.requiredVram)
                      ? 'requiredVram: string expected'
                      : r.requiredClientVer != null && r.hasOwnProperty('requiredClientVer') && !u.isString(r.requiredClientVer)
                      ? 'requiredClientVer: string expected'
                      : r.probability != null && r.hasOwnProperty('probability') && !u.isString(r.probability)
                      ? 'probability: string expected'
                      : r.requiredUserAgent != null && r.hasOwnProperty('requiredUserAgent') && !u.isString(r.requiredUserAgent)
                      ? 'requiredUserAgent: string expected'
                      : r.requiredClientCapabilities != null &&
                        r.hasOwnProperty('requiredClientCapabilities') &&
                        !u.isString(r.requiredClientCapabilities)
                      ? 'requiredClientCapabilities: string expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.RequirementProto) return r
                    var t = new n.keyhole.dbroot.RequirementProto()
                    return (
                      r.requiredVram != null && (t.requiredVram = String(r.requiredVram)),
                      r.requiredClientVer != null && (t.requiredClientVer = String(r.requiredClientVer)),
                      r.probability != null && (t.probability = String(r.probability)),
                      r.requiredUserAgent != null && (t.requiredUserAgent = String(r.requiredUserAgent)),
                      r.requiredClientCapabilities != null && (t.requiredClientCapabilities = String(r.requiredClientCapabilities)),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults &&
                        ((e.requiredVram = ''),
                        (e.requiredClientVer = ''),
                        (e.probability = ''),
                        (e.requiredUserAgent = ''),
                        (e.requiredClientCapabilities = '')),
                      r.requiredVram != null && r.hasOwnProperty('requiredVram') && (e.requiredVram = r.requiredVram),
                      r.requiredClientVer != null && r.hasOwnProperty('requiredClientVer') && (e.requiredClientVer = r.requiredClientVer),
                      r.probability != null && r.hasOwnProperty('probability') && (e.probability = r.probability),
                      r.requiredUserAgent != null && r.hasOwnProperty('requiredUserAgent') && (e.requiredUserAgent = r.requiredUserAgent),
                      r.requiredClientCapabilities != null &&
                        r.hasOwnProperty('requiredClientCapabilities') &&
                        (e.requiredClientCapabilities = r.requiredClientCapabilities),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.RequirementProto'
                  }),
                  i
                )
              })()),
              (c.LookAtProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.longitude = 0),
                  (i.prototype.latitude = 0),
                  (i.prototype.range = 0),
                  (i.prototype.tilt = 0),
                  (i.prototype.heading = 0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.LookAtProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.longitude = r.float()
                          break
                        }
                        case 2: {
                          o.latitude = r.float()
                          break
                        }
                        case 3: {
                          o.range = r.float()
                          break
                        }
                        case 4: {
                          o.tilt = r.float()
                          break
                        }
                        case 5: {
                          o.heading = r.float()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('longitude')) throw u.ProtocolError("missing required 'longitude'", { instance: o })
                    if (!o.hasOwnProperty('latitude')) throw u.ProtocolError("missing required 'latitude'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : typeof r.longitude != 'number'
                      ? 'longitude: number expected'
                      : typeof r.latitude != 'number'
                      ? 'latitude: number expected'
                      : r.range != null && r.hasOwnProperty('range') && typeof r.range != 'number'
                      ? 'range: number expected'
                      : r.tilt != null && r.hasOwnProperty('tilt') && typeof r.tilt != 'number'
                      ? 'tilt: number expected'
                      : r.heading != null && r.hasOwnProperty('heading') && typeof r.heading != 'number'
                      ? 'heading: number expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.LookAtProto) return r
                    var t = new n.keyhole.dbroot.LookAtProto()
                    return (
                      r.longitude != null && (t.longitude = Number(r.longitude)),
                      r.latitude != null && (t.latitude = Number(r.latitude)),
                      r.range != null && (t.range = Number(r.range)),
                      r.tilt != null && (t.tilt = Number(r.tilt)),
                      r.heading != null && (t.heading = Number(r.heading)),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.longitude = 0), (e.latitude = 0), (e.range = 0), (e.tilt = 0), (e.heading = 0)),
                      r.longitude != null &&
                        r.hasOwnProperty('longitude') &&
                        (e.longitude = t.json && !isFinite(r.longitude) ? String(r.longitude) : r.longitude),
                      r.latitude != null &&
                        r.hasOwnProperty('latitude') &&
                        (e.latitude = t.json && !isFinite(r.latitude) ? String(r.latitude) : r.latitude),
                      r.range != null && r.hasOwnProperty('range') && (e.range = t.json && !isFinite(r.range) ? String(r.range) : r.range),
                      r.tilt != null && r.hasOwnProperty('tilt') && (e.tilt = t.json && !isFinite(r.tilt) ? String(r.tilt) : r.tilt),
                      r.heading != null &&
                        r.hasOwnProperty('heading') &&
                        (e.heading = t.json && !isFinite(r.heading) ? String(r.heading) : r.heading),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.LookAtProto'
                  }),
                  i
                )
              })()),
              (c.NestedFeatureProto = (function () {
                function i(l) {
                  if (((this.children = []), l)) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.featureType = 1),
                  (i.prototype.kmlUrl = null),
                  (i.prototype.databaseUrl = ''),
                  (i.prototype.layer = null),
                  (i.prototype.folder = null),
                  (i.prototype.requirement = null),
                  (i.prototype.channelId = 0),
                  (i.prototype.displayName = null),
                  (i.prototype.isVisible = !0),
                  (i.prototype.isEnabled = !0),
                  (i.prototype.isChecked = !1),
                  (i.prototype.layerMenuIconPath = 'icons/773_l.png'),
                  (i.prototype.description = null),
                  (i.prototype.lookAt = null),
                  (i.prototype.assetUuid = ''),
                  (i.prototype.isSaveLocked = !0),
                  (i.prototype.children = u.emptyArray),
                  (i.prototype.clientConfigScriptName = ''),
                  (i.prototype.dioramaDataChannelBase = -1),
                  (i.prototype.replicaDataChannelBase = -1),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.NestedFeatureProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.featureType = r.int32()
                          break
                        }
                        case 2: {
                          o.kmlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 21: {
                          o.databaseUrl = r.string()
                          break
                        }
                        case 3: {
                          o.layer = n.keyhole.dbroot.LayerProto.decode(r, r.uint32())
                          break
                        }
                        case 4: {
                          o.folder = n.keyhole.dbroot.FolderProto.decode(r, r.uint32())
                          break
                        }
                        case 5: {
                          o.requirement = n.keyhole.dbroot.RequirementProto.decode(r, r.uint32())
                          break
                        }
                        case 6: {
                          o.channelId = r.int32()
                          break
                        }
                        case 7: {
                          o.displayName = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 8: {
                          o.isVisible = r.bool()
                          break
                        }
                        case 9: {
                          o.isEnabled = r.bool()
                          break
                        }
                        case 10: {
                          o.isChecked = r.bool()
                          break
                        }
                        case 11: {
                          o.layerMenuIconPath = r.string()
                          break
                        }
                        case 12: {
                          o.description = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 13: {
                          o.lookAt = n.keyhole.dbroot.LookAtProto.decode(r, r.uint32())
                          break
                        }
                        case 15: {
                          o.assetUuid = r.string()
                          break
                        }
                        case 16: {
                          o.isSaveLocked = r.bool()
                          break
                        }
                        case 17: {
                          ;(o.children && o.children.length) || (o.children = []),
                            o.children.push(n.keyhole.dbroot.NestedFeatureProto.decode(r, r.uint32()))
                          break
                        }
                        case 18: {
                          o.clientConfigScriptName = r.string()
                          break
                        }
                        case 19: {
                          o.dioramaDataChannelBase = r.int32()
                          break
                        }
                        case 20: {
                          o.replicaDataChannelBase = r.int32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('channelId')) throw u.ProtocolError("missing required 'channelId'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.featureType != null && r.hasOwnProperty('featureType'))
                      switch (r.featureType) {
                        default:
                          return 'featureType: enum value expected'
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                          break
                      }
                    if (r.kmlUrl != null && r.hasOwnProperty('kmlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.kmlUrl)
                      if (t) return 'kmlUrl.' + t
                    }
                    if (r.databaseUrl != null && r.hasOwnProperty('databaseUrl') && !u.isString(r.databaseUrl)) return 'databaseUrl: string expected'
                    if (r.layer != null && r.hasOwnProperty('layer')) {
                      var t = n.keyhole.dbroot.LayerProto.verify(r.layer)
                      if (t) return 'layer.' + t
                    }
                    if (r.folder != null && r.hasOwnProperty('folder')) {
                      var t = n.keyhole.dbroot.FolderProto.verify(r.folder)
                      if (t) return 'folder.' + t
                    }
                    if (r.requirement != null && r.hasOwnProperty('requirement')) {
                      var t = n.keyhole.dbroot.RequirementProto.verify(r.requirement)
                      if (t) return 'requirement.' + t
                    }
                    if (!u.isInteger(r.channelId)) return 'channelId: integer expected'
                    if (r.displayName != null && r.hasOwnProperty('displayName')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.displayName)
                      if (t) return 'displayName.' + t
                    }
                    if (r.isVisible != null && r.hasOwnProperty('isVisible') && typeof r.isVisible != 'boolean') return 'isVisible: boolean expected'
                    if (r.isEnabled != null && r.hasOwnProperty('isEnabled') && typeof r.isEnabled != 'boolean') return 'isEnabled: boolean expected'
                    if (r.isChecked != null && r.hasOwnProperty('isChecked') && typeof r.isChecked != 'boolean') return 'isChecked: boolean expected'
                    if (r.layerMenuIconPath != null && r.hasOwnProperty('layerMenuIconPath') && !u.isString(r.layerMenuIconPath))
                      return 'layerMenuIconPath: string expected'
                    if (r.description != null && r.hasOwnProperty('description')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.description)
                      if (t) return 'description.' + t
                    }
                    if (r.lookAt != null && r.hasOwnProperty('lookAt')) {
                      var t = n.keyhole.dbroot.LookAtProto.verify(r.lookAt)
                      if (t) return 'lookAt.' + t
                    }
                    if (r.assetUuid != null && r.hasOwnProperty('assetUuid') && !u.isString(r.assetUuid)) return 'assetUuid: string expected'
                    if (r.isSaveLocked != null && r.hasOwnProperty('isSaveLocked') && typeof r.isSaveLocked != 'boolean')
                      return 'isSaveLocked: boolean expected'
                    if (r.children != null && r.hasOwnProperty('children')) {
                      if (!Array.isArray(r.children)) return 'children: array expected'
                      for (var e = 0; e < r.children.length; ++e) {
                        var t = n.keyhole.dbroot.NestedFeatureProto.verify(r.children[e])
                        if (t) return 'children.' + t
                      }
                    }
                    return r.clientConfigScriptName != null && r.hasOwnProperty('clientConfigScriptName') && !u.isString(r.clientConfigScriptName)
                      ? 'clientConfigScriptName: string expected'
                      : r.dioramaDataChannelBase != null && r.hasOwnProperty('dioramaDataChannelBase') && !u.isInteger(r.dioramaDataChannelBase)
                      ? 'dioramaDataChannelBase: integer expected'
                      : r.replicaDataChannelBase != null && r.hasOwnProperty('replicaDataChannelBase') && !u.isInteger(r.replicaDataChannelBase)
                      ? 'replicaDataChannelBase: integer expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.NestedFeatureProto) return r
                    var t = new n.keyhole.dbroot.NestedFeatureProto()
                    switch (r.featureType) {
                      case 'TYPE_POINT_Z':
                      case 1:
                        t.featureType = 1
                        break
                      case 'TYPE_POLYGON_Z':
                      case 2:
                        t.featureType = 2
                        break
                      case 'TYPE_LINE_Z':
                      case 3:
                        t.featureType = 3
                        break
                      case 'TYPE_TERRAIN':
                      case 4:
                        t.featureType = 4
                        break
                    }
                    if (r.kmlUrl != null) {
                      if (typeof r.kmlUrl != 'object') throw TypeError('.keyhole.dbroot.NestedFeatureProto.kmlUrl: object expected')
                      t.kmlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.kmlUrl)
                    }
                    if ((r.databaseUrl != null && (t.databaseUrl = String(r.databaseUrl)), r.layer != null)) {
                      if (typeof r.layer != 'object') throw TypeError('.keyhole.dbroot.NestedFeatureProto.layer: object expected')
                      t.layer = n.keyhole.dbroot.LayerProto.fromObject(r.layer)
                    }
                    if (r.folder != null) {
                      if (typeof r.folder != 'object') throw TypeError('.keyhole.dbroot.NestedFeatureProto.folder: object expected')
                      t.folder = n.keyhole.dbroot.FolderProto.fromObject(r.folder)
                    }
                    if (r.requirement != null) {
                      if (typeof r.requirement != 'object') throw TypeError('.keyhole.dbroot.NestedFeatureProto.requirement: object expected')
                      t.requirement = n.keyhole.dbroot.RequirementProto.fromObject(r.requirement)
                    }
                    if ((r.channelId != null && (t.channelId = r.channelId | 0), r.displayName != null)) {
                      if (typeof r.displayName != 'object') throw TypeError('.keyhole.dbroot.NestedFeatureProto.displayName: object expected')
                      t.displayName = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.displayName)
                    }
                    if (
                      (r.isVisible != null && (t.isVisible = !!r.isVisible),
                      r.isEnabled != null && (t.isEnabled = !!r.isEnabled),
                      r.isChecked != null && (t.isChecked = !!r.isChecked),
                      r.layerMenuIconPath != null && (t.layerMenuIconPath = String(r.layerMenuIconPath)),
                      r.description != null)
                    ) {
                      if (typeof r.description != 'object') throw TypeError('.keyhole.dbroot.NestedFeatureProto.description: object expected')
                      t.description = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.description)
                    }
                    if (r.lookAt != null) {
                      if (typeof r.lookAt != 'object') throw TypeError('.keyhole.dbroot.NestedFeatureProto.lookAt: object expected')
                      t.lookAt = n.keyhole.dbroot.LookAtProto.fromObject(r.lookAt)
                    }
                    if (
                      (r.assetUuid != null && (t.assetUuid = String(r.assetUuid)),
                      r.isSaveLocked != null && (t.isSaveLocked = !!r.isSaveLocked),
                      r.children)
                    ) {
                      if (!Array.isArray(r.children)) throw TypeError('.keyhole.dbroot.NestedFeatureProto.children: array expected')
                      t.children = []
                      for (var e = 0; e < r.children.length; ++e) {
                        if (typeof r.children[e] != 'object') throw TypeError('.keyhole.dbroot.NestedFeatureProto.children: object expected')
                        t.children[e] = n.keyhole.dbroot.NestedFeatureProto.fromObject(r.children[e])
                      }
                    }
                    return (
                      r.clientConfigScriptName != null && (t.clientConfigScriptName = String(r.clientConfigScriptName)),
                      r.dioramaDataChannelBase != null && (t.dioramaDataChannelBase = r.dioramaDataChannelBase | 0),
                      r.replicaDataChannelBase != null && (t.replicaDataChannelBase = r.replicaDataChannelBase | 0),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    if (
                      ((t.arrays || t.defaults) && (e.children = []),
                      t.defaults &&
                        ((e.featureType = t.enums === String ? 'TYPE_POINT_Z' : 1),
                        (e.kmlUrl = null),
                        (e.layer = null),
                        (e.folder = null),
                        (e.requirement = null),
                        (e.channelId = 0),
                        (e.displayName = null),
                        (e.isVisible = !0),
                        (e.isEnabled = !0),
                        (e.isChecked = !1),
                        (e.layerMenuIconPath = 'icons/773_l.png'),
                        (e.description = null),
                        (e.lookAt = null),
                        (e.assetUuid = ''),
                        (e.isSaveLocked = !0),
                        (e.clientConfigScriptName = ''),
                        (e.dioramaDataChannelBase = -1),
                        (e.replicaDataChannelBase = -1),
                        (e.databaseUrl = '')),
                      r.featureType != null &&
                        r.hasOwnProperty('featureType') &&
                        (e.featureType = t.enums === String ? n.keyhole.dbroot.NestedFeatureProto.FeatureType[r.featureType] : r.featureType),
                      r.kmlUrl != null && r.hasOwnProperty('kmlUrl') && (e.kmlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.kmlUrl, t)),
                      r.layer != null && r.hasOwnProperty('layer') && (e.layer = n.keyhole.dbroot.LayerProto.toObject(r.layer, t)),
                      r.folder != null && r.hasOwnProperty('folder') && (e.folder = n.keyhole.dbroot.FolderProto.toObject(r.folder, t)),
                      r.requirement != null &&
                        r.hasOwnProperty('requirement') &&
                        (e.requirement = n.keyhole.dbroot.RequirementProto.toObject(r.requirement, t)),
                      r.channelId != null && r.hasOwnProperty('channelId') && (e.channelId = r.channelId),
                      r.displayName != null &&
                        r.hasOwnProperty('displayName') &&
                        (e.displayName = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.displayName, t)),
                      r.isVisible != null && r.hasOwnProperty('isVisible') && (e.isVisible = r.isVisible),
                      r.isEnabled != null && r.hasOwnProperty('isEnabled') && (e.isEnabled = r.isEnabled),
                      r.isChecked != null && r.hasOwnProperty('isChecked') && (e.isChecked = r.isChecked),
                      r.layerMenuIconPath != null && r.hasOwnProperty('layerMenuIconPath') && (e.layerMenuIconPath = r.layerMenuIconPath),
                      r.description != null &&
                        r.hasOwnProperty('description') &&
                        (e.description = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.description, t)),
                      r.lookAt != null && r.hasOwnProperty('lookAt') && (e.lookAt = n.keyhole.dbroot.LookAtProto.toObject(r.lookAt, t)),
                      r.assetUuid != null && r.hasOwnProperty('assetUuid') && (e.assetUuid = r.assetUuid),
                      r.isSaveLocked != null && r.hasOwnProperty('isSaveLocked') && (e.isSaveLocked = r.isSaveLocked),
                      r.children && r.children.length)
                    ) {
                      e.children = []
                      for (var o = 0; o < r.children.length; ++o) e.children[o] = n.keyhole.dbroot.NestedFeatureProto.toObject(r.children[o], t)
                    }
                    return (
                      r.clientConfigScriptName != null &&
                        r.hasOwnProperty('clientConfigScriptName') &&
                        (e.clientConfigScriptName = r.clientConfigScriptName),
                      r.dioramaDataChannelBase != null &&
                        r.hasOwnProperty('dioramaDataChannelBase') &&
                        (e.dioramaDataChannelBase = r.dioramaDataChannelBase),
                      r.replicaDataChannelBase != null &&
                        r.hasOwnProperty('replicaDataChannelBase') &&
                        (e.replicaDataChannelBase = r.replicaDataChannelBase),
                      r.databaseUrl != null && r.hasOwnProperty('databaseUrl') && (e.databaseUrl = r.databaseUrl),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.NestedFeatureProto'
                  }),
                  (i.FeatureType = (function () {
                    var l = {},
                      r = Object.create(l)
                    return (
                      (r[(l[1] = 'TYPE_POINT_Z')] = 1),
                      (r[(l[2] = 'TYPE_POLYGON_Z')] = 2),
                      (r[(l[3] = 'TYPE_LINE_Z')] = 3),
                      (r[(l[4] = 'TYPE_TERRAIN')] = 4),
                      r
                    )
                  })()),
                  i
                )
              })()),
              (c.MfeDomainFeaturesProto = (function () {
                function i(l) {
                  if (((this.supportedFeatures = []), l))
                    for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.countryCode = ''),
                  (i.prototype.domainName = ''),
                  (i.prototype.supportedFeatures = u.emptyArray),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.MfeDomainFeaturesProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.countryCode = r.string()
                          break
                        }
                        case 2: {
                          o.domainName = r.string()
                          break
                        }
                        case 3: {
                          if (((o.supportedFeatures && o.supportedFeatures.length) || (o.supportedFeatures = []), (a & 7) === 2))
                            for (var p = r.uint32() + r.pos; r.pos < p; ) o.supportedFeatures.push(r.int32())
                          else o.supportedFeatures.push(r.int32())
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('countryCode')) throw u.ProtocolError("missing required 'countryCode'", { instance: o })
                    if (!o.hasOwnProperty('domainName')) throw u.ProtocolError("missing required 'domainName'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (!u.isString(r.countryCode)) return 'countryCode: string expected'
                    if (!u.isString(r.domainName)) return 'domainName: string expected'
                    if (r.supportedFeatures != null && r.hasOwnProperty('supportedFeatures')) {
                      if (!Array.isArray(r.supportedFeatures)) return 'supportedFeatures: array expected'
                      for (var t = 0; t < r.supportedFeatures.length; ++t)
                        switch (r.supportedFeatures[t]) {
                          default:
                            return 'supportedFeatures: enum value[] expected'
                          case 0:
                          case 1:
                          case 2:
                            break
                        }
                    }
                    return null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.MfeDomainFeaturesProto) return r
                    var t = new n.keyhole.dbroot.MfeDomainFeaturesProto()
                    if (
                      (r.countryCode != null && (t.countryCode = String(r.countryCode)),
                      r.domainName != null && (t.domainName = String(r.domainName)),
                      r.supportedFeatures)
                    ) {
                      if (!Array.isArray(r.supportedFeatures))
                        throw TypeError('.keyhole.dbroot.MfeDomainFeaturesProto.supportedFeatures: array expected')
                      t.supportedFeatures = []
                      for (var e = 0; e < r.supportedFeatures.length; ++e)
                        switch (r.supportedFeatures[e]) {
                          default:
                          case 'GEOCODING':
                          case 0:
                            t.supportedFeatures[e] = 0
                            break
                          case 'LOCAL_SEARCH':
                          case 1:
                            t.supportedFeatures[e] = 1
                            break
                          case 'DRIVING_DIRECTIONS':
                          case 2:
                            t.supportedFeatures[e] = 2
                            break
                        }
                    }
                    return t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    if (
                      ((t.arrays || t.defaults) && (e.supportedFeatures = []),
                      t.defaults && ((e.countryCode = ''), (e.domainName = '')),
                      r.countryCode != null && r.hasOwnProperty('countryCode') && (e.countryCode = r.countryCode),
                      r.domainName != null && r.hasOwnProperty('domainName') && (e.domainName = r.domainName),
                      r.supportedFeatures && r.supportedFeatures.length)
                    ) {
                      e.supportedFeatures = []
                      for (var o = 0; o < r.supportedFeatures.length; ++o)
                        e.supportedFeatures[o] =
                          t.enums === String
                            ? n.keyhole.dbroot.MfeDomainFeaturesProto.SupportedFeature[r.supportedFeatures[o]]
                            : r.supportedFeatures[o]
                    }
                    return e
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.MfeDomainFeaturesProto'
                  }),
                  (i.SupportedFeature = (function () {
                    var l = {},
                      r = Object.create(l)
                    return (r[(l[0] = 'GEOCODING')] = 0), (r[(l[1] = 'LOCAL_SEARCH')] = 1), (r[(l[2] = 'DRIVING_DIRECTIONS')] = 2), r
                  })()),
                  i
                )
              })()),
              (c.ClientOptionsProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.disableDiskCache = !1),
                  (i.prototype.disableEmbeddedBrowserVista = !1),
                  (i.prototype.drawAtmosphere = !0),
                  (i.prototype.drawStars = !0),
                  (i.prototype.shaderFilePrefix = ''),
                  (i.prototype.useProtobufQuadtreePackets = !1),
                  (i.prototype.useExtendedCopyrightIds = !0),
                  (i.prototype.precipitationsOptions = null),
                  (i.prototype.captureOptions = null),
                  (i.prototype.show_2dMapsIcon = !0),
                  (i.prototype.disableInternalBrowser = !1),
                  (i.prototype.internalBrowserBlacklist = ''),
                  (i.prototype.internalBrowserOriginWhitelist = '*'),
                  (i.prototype.polarTileMergingLevel = 0),
                  (i.prototype.jsBridgeRequestWhitelist = 'http://*.google.com/*'),
                  (i.prototype.mapsOptions = null),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.ClientOptionsProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.disableDiskCache = r.bool()
                          break
                        }
                        case 2: {
                          o.disableEmbeddedBrowserVista = r.bool()
                          break
                        }
                        case 3: {
                          o.drawAtmosphere = r.bool()
                          break
                        }
                        case 4: {
                          o.drawStars = r.bool()
                          break
                        }
                        case 5: {
                          o.shaderFilePrefix = r.string()
                          break
                        }
                        case 6: {
                          o.useProtobufQuadtreePackets = r.bool()
                          break
                        }
                        case 7: {
                          o.useExtendedCopyrightIds = r.bool()
                          break
                        }
                        case 8: {
                          o.precipitationsOptions = n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.decode(r, r.uint32())
                          break
                        }
                        case 9: {
                          o.captureOptions = n.keyhole.dbroot.ClientOptionsProto.CaptureOptions.decode(r, r.uint32())
                          break
                        }
                        case 10: {
                          o.show_2dMapsIcon = r.bool()
                          break
                        }
                        case 11: {
                          o.disableInternalBrowser = r.bool()
                          break
                        }
                        case 12: {
                          o.internalBrowserBlacklist = r.string()
                          break
                        }
                        case 13: {
                          o.internalBrowserOriginWhitelist = r.string()
                          break
                        }
                        case 14: {
                          o.polarTileMergingLevel = r.int32()
                          break
                        }
                        case 15: {
                          o.jsBridgeRequestWhitelist = r.string()
                          break
                        }
                        case 16: {
                          o.mapsOptions = n.keyhole.dbroot.ClientOptionsProto.MapsOptions.decode(r, r.uint32())
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.disableDiskCache != null && r.hasOwnProperty('disableDiskCache') && typeof r.disableDiskCache != 'boolean')
                      return 'disableDiskCache: boolean expected'
                    if (
                      r.disableEmbeddedBrowserVista != null &&
                      r.hasOwnProperty('disableEmbeddedBrowserVista') &&
                      typeof r.disableEmbeddedBrowserVista != 'boolean'
                    )
                      return 'disableEmbeddedBrowserVista: boolean expected'
                    if (r.drawAtmosphere != null && r.hasOwnProperty('drawAtmosphere') && typeof r.drawAtmosphere != 'boolean')
                      return 'drawAtmosphere: boolean expected'
                    if (r.drawStars != null && r.hasOwnProperty('drawStars') && typeof r.drawStars != 'boolean') return 'drawStars: boolean expected'
                    if (r.shaderFilePrefix != null && r.hasOwnProperty('shaderFilePrefix') && !u.isString(r.shaderFilePrefix))
                      return 'shaderFilePrefix: string expected'
                    if (
                      r.useProtobufQuadtreePackets != null &&
                      r.hasOwnProperty('useProtobufQuadtreePackets') &&
                      typeof r.useProtobufQuadtreePackets != 'boolean'
                    )
                      return 'useProtobufQuadtreePackets: boolean expected'
                    if (
                      r.useExtendedCopyrightIds != null &&
                      r.hasOwnProperty('useExtendedCopyrightIds') &&
                      typeof r.useExtendedCopyrightIds != 'boolean'
                    )
                      return 'useExtendedCopyrightIds: boolean expected'
                    if (r.precipitationsOptions != null && r.hasOwnProperty('precipitationsOptions')) {
                      var t = n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.verify(r.precipitationsOptions)
                      if (t) return 'precipitationsOptions.' + t
                    }
                    if (r.captureOptions != null && r.hasOwnProperty('captureOptions')) {
                      var t = n.keyhole.dbroot.ClientOptionsProto.CaptureOptions.verify(r.captureOptions)
                      if (t) return 'captureOptions.' + t
                    }
                    if (r.show_2dMapsIcon != null && r.hasOwnProperty('show_2dMapsIcon') && typeof r.show_2dMapsIcon != 'boolean')
                      return 'show_2dMapsIcon: boolean expected'
                    if (
                      r.disableInternalBrowser != null &&
                      r.hasOwnProperty('disableInternalBrowser') &&
                      typeof r.disableInternalBrowser != 'boolean'
                    )
                      return 'disableInternalBrowser: boolean expected'
                    if (r.internalBrowserBlacklist != null && r.hasOwnProperty('internalBrowserBlacklist') && !u.isString(r.internalBrowserBlacklist))
                      return 'internalBrowserBlacklist: string expected'
                    if (
                      r.internalBrowserOriginWhitelist != null &&
                      r.hasOwnProperty('internalBrowserOriginWhitelist') &&
                      !u.isString(r.internalBrowserOriginWhitelist)
                    )
                      return 'internalBrowserOriginWhitelist: string expected'
                    if (r.polarTileMergingLevel != null && r.hasOwnProperty('polarTileMergingLevel') && !u.isInteger(r.polarTileMergingLevel))
                      return 'polarTileMergingLevel: integer expected'
                    if (r.jsBridgeRequestWhitelist != null && r.hasOwnProperty('jsBridgeRequestWhitelist') && !u.isString(r.jsBridgeRequestWhitelist))
                      return 'jsBridgeRequestWhitelist: string expected'
                    if (r.mapsOptions != null && r.hasOwnProperty('mapsOptions')) {
                      var t = n.keyhole.dbroot.ClientOptionsProto.MapsOptions.verify(r.mapsOptions)
                      if (t) return 'mapsOptions.' + t
                    }
                    return null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.ClientOptionsProto) return r
                    var t = new n.keyhole.dbroot.ClientOptionsProto()
                    if (
                      (r.disableDiskCache != null && (t.disableDiskCache = !!r.disableDiskCache),
                      r.disableEmbeddedBrowserVista != null && (t.disableEmbeddedBrowserVista = !!r.disableEmbeddedBrowserVista),
                      r.drawAtmosphere != null && (t.drawAtmosphere = !!r.drawAtmosphere),
                      r.drawStars != null && (t.drawStars = !!r.drawStars),
                      r.shaderFilePrefix != null && (t.shaderFilePrefix = String(r.shaderFilePrefix)),
                      r.useProtobufQuadtreePackets != null && (t.useProtobufQuadtreePackets = !!r.useProtobufQuadtreePackets),
                      r.useExtendedCopyrightIds != null && (t.useExtendedCopyrightIds = !!r.useExtendedCopyrightIds),
                      r.precipitationsOptions != null)
                    ) {
                      if (typeof r.precipitationsOptions != 'object')
                        throw TypeError('.keyhole.dbroot.ClientOptionsProto.precipitationsOptions: object expected')
                      t.precipitationsOptions = n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.fromObject(r.precipitationsOptions)
                    }
                    if (r.captureOptions != null) {
                      if (typeof r.captureOptions != 'object') throw TypeError('.keyhole.dbroot.ClientOptionsProto.captureOptions: object expected')
                      t.captureOptions = n.keyhole.dbroot.ClientOptionsProto.CaptureOptions.fromObject(r.captureOptions)
                    }
                    if (
                      (r.show_2dMapsIcon != null && (t.show_2dMapsIcon = !!r.show_2dMapsIcon),
                      r.disableInternalBrowser != null && (t.disableInternalBrowser = !!r.disableInternalBrowser),
                      r.internalBrowserBlacklist != null && (t.internalBrowserBlacklist = String(r.internalBrowserBlacklist)),
                      r.internalBrowserOriginWhitelist != null && (t.internalBrowserOriginWhitelist = String(r.internalBrowserOriginWhitelist)),
                      r.polarTileMergingLevel != null && (t.polarTileMergingLevel = r.polarTileMergingLevel | 0),
                      r.jsBridgeRequestWhitelist != null && (t.jsBridgeRequestWhitelist = String(r.jsBridgeRequestWhitelist)),
                      r.mapsOptions != null)
                    ) {
                      if (typeof r.mapsOptions != 'object') throw TypeError('.keyhole.dbroot.ClientOptionsProto.mapsOptions: object expected')
                      t.mapsOptions = n.keyhole.dbroot.ClientOptionsProto.MapsOptions.fromObject(r.mapsOptions)
                    }
                    return t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults &&
                        ((e.disableDiskCache = !1),
                        (e.disableEmbeddedBrowserVista = !1),
                        (e.drawAtmosphere = !0),
                        (e.drawStars = !0),
                        (e.shaderFilePrefix = ''),
                        (e.useProtobufQuadtreePackets = !1),
                        (e.useExtendedCopyrightIds = !0),
                        (e.precipitationsOptions = null),
                        (e.captureOptions = null),
                        (e.show_2dMapsIcon = !0),
                        (e.disableInternalBrowser = !1),
                        (e.internalBrowserBlacklist = ''),
                        (e.internalBrowserOriginWhitelist = '*'),
                        (e.polarTileMergingLevel = 0),
                        (e.jsBridgeRequestWhitelist = 'http://*.google.com/*'),
                        (e.mapsOptions = null)),
                      r.disableDiskCache != null && r.hasOwnProperty('disableDiskCache') && (e.disableDiskCache = r.disableDiskCache),
                      r.disableEmbeddedBrowserVista != null &&
                        r.hasOwnProperty('disableEmbeddedBrowserVista') &&
                        (e.disableEmbeddedBrowserVista = r.disableEmbeddedBrowserVista),
                      r.drawAtmosphere != null && r.hasOwnProperty('drawAtmosphere') && (e.drawAtmosphere = r.drawAtmosphere),
                      r.drawStars != null && r.hasOwnProperty('drawStars') && (e.drawStars = r.drawStars),
                      r.shaderFilePrefix != null && r.hasOwnProperty('shaderFilePrefix') && (e.shaderFilePrefix = r.shaderFilePrefix),
                      r.useProtobufQuadtreePackets != null &&
                        r.hasOwnProperty('useProtobufQuadtreePackets') &&
                        (e.useProtobufQuadtreePackets = r.useProtobufQuadtreePackets),
                      r.useExtendedCopyrightIds != null &&
                        r.hasOwnProperty('useExtendedCopyrightIds') &&
                        (e.useExtendedCopyrightIds = r.useExtendedCopyrightIds),
                      r.precipitationsOptions != null &&
                        r.hasOwnProperty('precipitationsOptions') &&
                        (e.precipitationsOptions = n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.toObject(r.precipitationsOptions, t)),
                      r.captureOptions != null &&
                        r.hasOwnProperty('captureOptions') &&
                        (e.captureOptions = n.keyhole.dbroot.ClientOptionsProto.CaptureOptions.toObject(r.captureOptions, t)),
                      r.show_2dMapsIcon != null && r.hasOwnProperty('show_2dMapsIcon') && (e.show_2dMapsIcon = r.show_2dMapsIcon),
                      r.disableInternalBrowser != null &&
                        r.hasOwnProperty('disableInternalBrowser') &&
                        (e.disableInternalBrowser = r.disableInternalBrowser),
                      r.internalBrowserBlacklist != null &&
                        r.hasOwnProperty('internalBrowserBlacklist') &&
                        (e.internalBrowserBlacklist = r.internalBrowserBlacklist),
                      r.internalBrowserOriginWhitelist != null &&
                        r.hasOwnProperty('internalBrowserOriginWhitelist') &&
                        (e.internalBrowserOriginWhitelist = r.internalBrowserOriginWhitelist),
                      r.polarTileMergingLevel != null &&
                        r.hasOwnProperty('polarTileMergingLevel') &&
                        (e.polarTileMergingLevel = r.polarTileMergingLevel),
                      r.jsBridgeRequestWhitelist != null &&
                        r.hasOwnProperty('jsBridgeRequestWhitelist') &&
                        (e.jsBridgeRequestWhitelist = r.jsBridgeRequestWhitelist),
                      r.mapsOptions != null &&
                        r.hasOwnProperty('mapsOptions') &&
                        (e.mapsOptions = n.keyhole.dbroot.ClientOptionsProto.MapsOptions.toObject(r.mapsOptions, t)),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.ClientOptionsProto'
                  }),
                  (i.PrecipitationsOptions = (function () {
                    function l(r) {
                      if (((this.weatherMapping = []), r))
                        for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.imageUrl = ''),
                      (l.prototype.imageExpireTime = 900),
                      (l.prototype.maxColorDistance = 20),
                      (l.prototype.imageLevel = 5),
                      (l.prototype.weatherMapping = u.emptyArray),
                      (l.prototype.cloudsLayerUrl = ''),
                      (l.prototype.animationDecelerationDelay = 20),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (
                          var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions();
                          t.pos < o;

                        ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              a.imageUrl = t.string()
                              break
                            }
                            case 2: {
                              a.imageExpireTime = t.int32()
                              break
                            }
                            case 3: {
                              a.maxColorDistance = t.int32()
                              break
                            }
                            case 4: {
                              a.imageLevel = t.int32()
                              break
                            }
                            case 5: {
                              ;(a.weatherMapping && a.weatherMapping.length) || (a.weatherMapping = []),
                                a.weatherMapping.push(n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping.decode(t, t.uint32()))
                              break
                            }
                            case 6: {
                              a.cloudsLayerUrl = t.string()
                              break
                            }
                            case 7: {
                              a.animationDecelerationDelay = t.float()
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        return a
                      }),
                      (l.verify = function (t) {
                        if (typeof t != 'object' || t === null) return 'object expected'
                        if (t.imageUrl != null && t.hasOwnProperty('imageUrl') && !u.isString(t.imageUrl)) return 'imageUrl: string expected'
                        if (t.imageExpireTime != null && t.hasOwnProperty('imageExpireTime') && !u.isInteger(t.imageExpireTime))
                          return 'imageExpireTime: integer expected'
                        if (t.maxColorDistance != null && t.hasOwnProperty('maxColorDistance') && !u.isInteger(t.maxColorDistance))
                          return 'maxColorDistance: integer expected'
                        if (t.imageLevel != null && t.hasOwnProperty('imageLevel') && !u.isInteger(t.imageLevel))
                          return 'imageLevel: integer expected'
                        if (t.weatherMapping != null && t.hasOwnProperty('weatherMapping')) {
                          if (!Array.isArray(t.weatherMapping)) return 'weatherMapping: array expected'
                          for (var e = 0; e < t.weatherMapping.length; ++e) {
                            var o = n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping.verify(t.weatherMapping[e])
                            if (o) return 'weatherMapping.' + o
                          }
                        }
                        return t.cloudsLayerUrl != null && t.hasOwnProperty('cloudsLayerUrl') && !u.isString(t.cloudsLayerUrl)
                          ? 'cloudsLayerUrl: string expected'
                          : t.animationDecelerationDelay != null &&
                            t.hasOwnProperty('animationDecelerationDelay') &&
                            typeof t.animationDecelerationDelay != 'number'
                          ? 'animationDecelerationDelay: number expected'
                          : null
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions) return t
                        var e = new n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions()
                        if (
                          (t.imageUrl != null && (e.imageUrl = String(t.imageUrl)),
                          t.imageExpireTime != null && (e.imageExpireTime = t.imageExpireTime | 0),
                          t.maxColorDistance != null && (e.maxColorDistance = t.maxColorDistance | 0),
                          t.imageLevel != null && (e.imageLevel = t.imageLevel | 0),
                          t.weatherMapping)
                        ) {
                          if (!Array.isArray(t.weatherMapping))
                            throw TypeError('.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.weatherMapping: array expected')
                          e.weatherMapping = []
                          for (var o = 0; o < t.weatherMapping.length; ++o) {
                            if (typeof t.weatherMapping[o] != 'object')
                              throw TypeError('.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.weatherMapping: object expected')
                            e.weatherMapping[o] = n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping.fromObject(
                              t.weatherMapping[o]
                            )
                          }
                        }
                        return (
                          t.cloudsLayerUrl != null && (e.cloudsLayerUrl = String(t.cloudsLayerUrl)),
                          t.animationDecelerationDelay != null && (e.animationDecelerationDelay = Number(t.animationDecelerationDelay)),
                          e
                        )
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        if (
                          ((e.arrays || e.defaults) && (o.weatherMapping = []),
                          e.defaults &&
                            ((o.imageUrl = ''),
                            (o.imageExpireTime = 900),
                            (o.maxColorDistance = 20),
                            (o.imageLevel = 5),
                            (o.cloudsLayerUrl = ''),
                            (o.animationDecelerationDelay = 20)),
                          t.imageUrl != null && t.hasOwnProperty('imageUrl') && (o.imageUrl = t.imageUrl),
                          t.imageExpireTime != null && t.hasOwnProperty('imageExpireTime') && (o.imageExpireTime = t.imageExpireTime),
                          t.maxColorDistance != null && t.hasOwnProperty('maxColorDistance') && (o.maxColorDistance = t.maxColorDistance),
                          t.imageLevel != null && t.hasOwnProperty('imageLevel') && (o.imageLevel = t.imageLevel),
                          t.weatherMapping && t.weatherMapping.length)
                        ) {
                          o.weatherMapping = []
                          for (var a = 0; a < t.weatherMapping.length; ++a)
                            o.weatherMapping[a] = n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping.toObject(
                              t.weatherMapping[a],
                              e
                            )
                        }
                        return (
                          t.cloudsLayerUrl != null && t.hasOwnProperty('cloudsLayerUrl') && (o.cloudsLayerUrl = t.cloudsLayerUrl),
                          t.animationDecelerationDelay != null &&
                            t.hasOwnProperty('animationDecelerationDelay') &&
                            (o.animationDecelerationDelay =
                              e.json && !isFinite(t.animationDecelerationDelay)
                                ? String(t.animationDecelerationDelay)
                                : t.animationDecelerationDelay),
                          o
                        )
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions'
                      }),
                      (l.WeatherMapping = (function () {
                        function r(t) {
                          if (t) for (var e = Object.keys(t), o = 0; o < e.length; ++o) t[e[o]] != null && (this[e[o]] = t[e[o]])
                        }
                        return (
                          (r.prototype.colorAbgr = 0),
                          (r.prototype.weatherType = 0),
                          (r.prototype.elongation = 1),
                          (r.prototype.opacity = 0),
                          (r.prototype.fogDensity = 0),
                          (r.prototype.speed0 = 0),
                          (r.prototype.speed1 = 0),
                          (r.prototype.speed2 = 0),
                          (r.prototype.speed3 = 0),
                          (r.decode = function (e, o) {
                            e instanceof f || (e = f.create(e))
                            for (
                              var a = o === void 0 ? e.len : e.pos + o,
                                p = new n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping();
                              e.pos < a;

                            ) {
                              var y = e.uint32()
                              switch (y >>> 3) {
                                case 1: {
                                  p.colorAbgr = e.uint32()
                                  break
                                }
                                case 2: {
                                  p.weatherType = e.int32()
                                  break
                                }
                                case 3: {
                                  p.elongation = e.float()
                                  break
                                }
                                case 4: {
                                  p.opacity = e.float()
                                  break
                                }
                                case 5: {
                                  p.fogDensity = e.float()
                                  break
                                }
                                case 6: {
                                  p.speed0 = e.float()
                                  break
                                }
                                case 7: {
                                  p.speed1 = e.float()
                                  break
                                }
                                case 8: {
                                  p.speed2 = e.float()
                                  break
                                }
                                case 9: {
                                  p.speed3 = e.float()
                                  break
                                }
                                default:
                                  e.skipType(y & 7)
                                  break
                              }
                            }
                            if (!p.hasOwnProperty('colorAbgr')) throw u.ProtocolError("missing required 'colorAbgr'", { instance: p })
                            if (!p.hasOwnProperty('weatherType')) throw u.ProtocolError("missing required 'weatherType'", { instance: p })
                            return p
                          }),
                          (r.verify = function (e) {
                            if (typeof e != 'object' || e === null) return 'object expected'
                            if (!u.isInteger(e.colorAbgr)) return 'colorAbgr: integer expected'
                            switch (e.weatherType) {
                              default:
                                return 'weatherType: enum value expected'
                              case 0:
                              case 1:
                              case 2:
                                break
                            }
                            return e.elongation != null && e.hasOwnProperty('elongation') && typeof e.elongation != 'number'
                              ? 'elongation: number expected'
                              : e.opacity != null && e.hasOwnProperty('opacity') && typeof e.opacity != 'number'
                              ? 'opacity: number expected'
                              : e.fogDensity != null && e.hasOwnProperty('fogDensity') && typeof e.fogDensity != 'number'
                              ? 'fogDensity: number expected'
                              : e.speed0 != null && e.hasOwnProperty('speed0') && typeof e.speed0 != 'number'
                              ? 'speed0: number expected'
                              : e.speed1 != null && e.hasOwnProperty('speed1') && typeof e.speed1 != 'number'
                              ? 'speed1: number expected'
                              : e.speed2 != null && e.hasOwnProperty('speed2') && typeof e.speed2 != 'number'
                              ? 'speed2: number expected'
                              : e.speed3 != null && e.hasOwnProperty('speed3') && typeof e.speed3 != 'number'
                              ? 'speed3: number expected'
                              : null
                          }),
                          (r.fromObject = function (e) {
                            if (e instanceof n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping) return e
                            var o = new n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping()
                            switch ((e.colorAbgr != null && (o.colorAbgr = e.colorAbgr >>> 0), e.weatherType)) {
                              case 'NO_PRECIPITATION':
                              case 0:
                                o.weatherType = 0
                                break
                              case 'RAIN':
                              case 1:
                                o.weatherType = 1
                                break
                              case 'SNOW':
                              case 2:
                                o.weatherType = 2
                                break
                            }
                            return (
                              e.elongation != null && (o.elongation = Number(e.elongation)),
                              e.opacity != null && (o.opacity = Number(e.opacity)),
                              e.fogDensity != null && (o.fogDensity = Number(e.fogDensity)),
                              e.speed0 != null && (o.speed0 = Number(e.speed0)),
                              e.speed1 != null && (o.speed1 = Number(e.speed1)),
                              e.speed2 != null && (o.speed2 = Number(e.speed2)),
                              e.speed3 != null && (o.speed3 = Number(e.speed3)),
                              o
                            )
                          }),
                          (r.toObject = function (e, o) {
                            o || (o = {})
                            var a = {}
                            return (
                              o.defaults &&
                                ((a.colorAbgr = 0),
                                (a.weatherType = o.enums === String ? 'NO_PRECIPITATION' : 0),
                                (a.elongation = 1),
                                (a.opacity = 0),
                                (a.fogDensity = 0),
                                (a.speed0 = 0),
                                (a.speed1 = 0),
                                (a.speed2 = 0),
                                (a.speed3 = 0)),
                              e.colorAbgr != null && e.hasOwnProperty('colorAbgr') && (a.colorAbgr = e.colorAbgr),
                              e.weatherType != null &&
                                e.hasOwnProperty('weatherType') &&
                                (a.weatherType =
                                  o.enums === String
                                    ? n.keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping.WeatherType[e.weatherType]
                                    : e.weatherType),
                              e.elongation != null &&
                                e.hasOwnProperty('elongation') &&
                                (a.elongation = o.json && !isFinite(e.elongation) ? String(e.elongation) : e.elongation),
                              e.opacity != null &&
                                e.hasOwnProperty('opacity') &&
                                (a.opacity = o.json && !isFinite(e.opacity) ? String(e.opacity) : e.opacity),
                              e.fogDensity != null &&
                                e.hasOwnProperty('fogDensity') &&
                                (a.fogDensity = o.json && !isFinite(e.fogDensity) ? String(e.fogDensity) : e.fogDensity),
                              e.speed0 != null &&
                                e.hasOwnProperty('speed0') &&
                                (a.speed0 = o.json && !isFinite(e.speed0) ? String(e.speed0) : e.speed0),
                              e.speed1 != null &&
                                e.hasOwnProperty('speed1') &&
                                (a.speed1 = o.json && !isFinite(e.speed1) ? String(e.speed1) : e.speed1),
                              e.speed2 != null &&
                                e.hasOwnProperty('speed2') &&
                                (a.speed2 = o.json && !isFinite(e.speed2) ? String(e.speed2) : e.speed2),
                              e.speed3 != null &&
                                e.hasOwnProperty('speed3') &&
                                (a.speed3 = o.json && !isFinite(e.speed3) ? String(e.speed3) : e.speed3),
                              a
                            )
                          }),
                          (r.prototype.toJSON = function () {
                            return this.constructor.toObject(this, d.util.toJSONOptions)
                          }),
                          (r.getTypeUrl = function (e) {
                            return (
                              e === void 0 && (e = 'type.googleapis.com'),
                              e + '/keyhole.dbroot.ClientOptionsProto.PrecipitationsOptions.WeatherMapping'
                            )
                          }),
                          (r.WeatherType = (function () {
                            var t = {},
                              e = Object.create(t)
                            return (e[(t[0] = 'NO_PRECIPITATION')] = 0), (e[(t[1] = 'RAIN')] = 1), (e[(t[2] = 'SNOW')] = 2), e
                          })()),
                          r
                        )
                      })()),
                      l
                    )
                  })()),
                  (i.CaptureOptions = (function () {
                    function l(r) {
                      if (r) for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.allowSaveAsImage = !0),
                      (l.prototype.maxFreeCaptureRes = 2400),
                      (l.prototype.maxPremiumCaptureRes = 4800),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.ClientOptionsProto.CaptureOptions(); t.pos < o; ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              a.allowSaveAsImage = t.bool()
                              break
                            }
                            case 2: {
                              a.maxFreeCaptureRes = t.int32()
                              break
                            }
                            case 3: {
                              a.maxPremiumCaptureRes = t.int32()
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        return a
                      }),
                      (l.verify = function (t) {
                        return typeof t != 'object' || t === null
                          ? 'object expected'
                          : t.allowSaveAsImage != null && t.hasOwnProperty('allowSaveAsImage') && typeof t.allowSaveAsImage != 'boolean'
                          ? 'allowSaveAsImage: boolean expected'
                          : t.maxFreeCaptureRes != null && t.hasOwnProperty('maxFreeCaptureRes') && !u.isInteger(t.maxFreeCaptureRes)
                          ? 'maxFreeCaptureRes: integer expected'
                          : t.maxPremiumCaptureRes != null && t.hasOwnProperty('maxPremiumCaptureRes') && !u.isInteger(t.maxPremiumCaptureRes)
                          ? 'maxPremiumCaptureRes: integer expected'
                          : null
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.ClientOptionsProto.CaptureOptions) return t
                        var e = new n.keyhole.dbroot.ClientOptionsProto.CaptureOptions()
                        return (
                          t.allowSaveAsImage != null && (e.allowSaveAsImage = !!t.allowSaveAsImage),
                          t.maxFreeCaptureRes != null && (e.maxFreeCaptureRes = t.maxFreeCaptureRes | 0),
                          t.maxPremiumCaptureRes != null && (e.maxPremiumCaptureRes = t.maxPremiumCaptureRes | 0),
                          e
                        )
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        return (
                          e.defaults && ((o.allowSaveAsImage = !0), (o.maxFreeCaptureRes = 2400), (o.maxPremiumCaptureRes = 4800)),
                          t.allowSaveAsImage != null && t.hasOwnProperty('allowSaveAsImage') && (o.allowSaveAsImage = t.allowSaveAsImage),
                          t.maxFreeCaptureRes != null && t.hasOwnProperty('maxFreeCaptureRes') && (o.maxFreeCaptureRes = t.maxFreeCaptureRes),
                          t.maxPremiumCaptureRes != null &&
                            t.hasOwnProperty('maxPremiumCaptureRes') &&
                            (o.maxPremiumCaptureRes = t.maxPremiumCaptureRes),
                          o
                        )
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.ClientOptionsProto.CaptureOptions'
                      }),
                      l
                    )
                  })()),
                  (i.MapsOptions = (function () {
                    function l(r) {
                      if (r) for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.enableMaps = !1),
                      (l.prototype.docsAutoDownloadEnabled = !1),
                      (l.prototype.docsAutoDownloadInterval = 0),
                      (l.prototype.docsAutoUploadEnabled = !1),
                      (l.prototype.docsAutoUploadDelay = 0),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.ClientOptionsProto.MapsOptions(); t.pos < o; ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              a.enableMaps = t.bool()
                              break
                            }
                            case 2: {
                              a.docsAutoDownloadEnabled = t.bool()
                              break
                            }
                            case 3: {
                              a.docsAutoDownloadInterval = t.int32()
                              break
                            }
                            case 4: {
                              a.docsAutoUploadEnabled = t.bool()
                              break
                            }
                            case 5: {
                              a.docsAutoUploadDelay = t.int32()
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        return a
                      }),
                      (l.verify = function (t) {
                        return typeof t != 'object' || t === null
                          ? 'object expected'
                          : t.enableMaps != null && t.hasOwnProperty('enableMaps') && typeof t.enableMaps != 'boolean'
                          ? 'enableMaps: boolean expected'
                          : t.docsAutoDownloadEnabled != null &&
                            t.hasOwnProperty('docsAutoDownloadEnabled') &&
                            typeof t.docsAutoDownloadEnabled != 'boolean'
                          ? 'docsAutoDownloadEnabled: boolean expected'
                          : t.docsAutoDownloadInterval != null &&
                            t.hasOwnProperty('docsAutoDownloadInterval') &&
                            !u.isInteger(t.docsAutoDownloadInterval)
                          ? 'docsAutoDownloadInterval: integer expected'
                          : t.docsAutoUploadEnabled != null &&
                            t.hasOwnProperty('docsAutoUploadEnabled') &&
                            typeof t.docsAutoUploadEnabled != 'boolean'
                          ? 'docsAutoUploadEnabled: boolean expected'
                          : t.docsAutoUploadDelay != null && t.hasOwnProperty('docsAutoUploadDelay') && !u.isInteger(t.docsAutoUploadDelay)
                          ? 'docsAutoUploadDelay: integer expected'
                          : null
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.ClientOptionsProto.MapsOptions) return t
                        var e = new n.keyhole.dbroot.ClientOptionsProto.MapsOptions()
                        return (
                          t.enableMaps != null && (e.enableMaps = !!t.enableMaps),
                          t.docsAutoDownloadEnabled != null && (e.docsAutoDownloadEnabled = !!t.docsAutoDownloadEnabled),
                          t.docsAutoDownloadInterval != null && (e.docsAutoDownloadInterval = t.docsAutoDownloadInterval | 0),
                          t.docsAutoUploadEnabled != null && (e.docsAutoUploadEnabled = !!t.docsAutoUploadEnabled),
                          t.docsAutoUploadDelay != null && (e.docsAutoUploadDelay = t.docsAutoUploadDelay | 0),
                          e
                        )
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        return (
                          e.defaults &&
                            ((o.enableMaps = !1),
                            (o.docsAutoDownloadEnabled = !1),
                            (o.docsAutoDownloadInterval = 0),
                            (o.docsAutoUploadEnabled = !1),
                            (o.docsAutoUploadDelay = 0)),
                          t.enableMaps != null && t.hasOwnProperty('enableMaps') && (o.enableMaps = t.enableMaps),
                          t.docsAutoDownloadEnabled != null &&
                            t.hasOwnProperty('docsAutoDownloadEnabled') &&
                            (o.docsAutoDownloadEnabled = t.docsAutoDownloadEnabled),
                          t.docsAutoDownloadInterval != null &&
                            t.hasOwnProperty('docsAutoDownloadInterval') &&
                            (o.docsAutoDownloadInterval = t.docsAutoDownloadInterval),
                          t.docsAutoUploadEnabled != null &&
                            t.hasOwnProperty('docsAutoUploadEnabled') &&
                            (o.docsAutoUploadEnabled = t.docsAutoUploadEnabled),
                          t.docsAutoUploadDelay != null && t.hasOwnProperty('docsAutoUploadDelay') && (o.docsAutoUploadDelay = t.docsAutoUploadDelay),
                          o
                        )
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.ClientOptionsProto.MapsOptions'
                      }),
                      l
                    )
                  })()),
                  i
                )
              })()),
              (c.FetchingOptionsProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.maxRequestsPerQuery = 1),
                  (i.prototype.forceMaxRequestsPerQuery = !1),
                  (i.prototype.sortBatches = !1),
                  (i.prototype.maxDrawable = 2),
                  (i.prototype.maxImagery = 2),
                  (i.prototype.maxTerrain = 5),
                  (i.prototype.maxQuadtree = 5),
                  (i.prototype.maxDioramaMetadata = 1),
                  (i.prototype.maxDioramaData = 0),
                  (i.prototype.maxConsumerFetchRatio = 1),
                  (i.prototype.maxProEcFetchRatio = 0),
                  (i.prototype.safeOverallQps = 0),
                  (i.prototype.safeImageryQps = 0),
                  (i.prototype.domainsForHttps = 'google.com gstatic.com'),
                  (i.prototype.hostsForHttp = ''),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.FetchingOptionsProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.maxRequestsPerQuery = r.int32()
                          break
                        }
                        case 12: {
                          o.forceMaxRequestsPerQuery = r.bool()
                          break
                        }
                        case 13: {
                          o.sortBatches = r.bool()
                          break
                        }
                        case 2: {
                          o.maxDrawable = r.int32()
                          break
                        }
                        case 3: {
                          o.maxImagery = r.int32()
                          break
                        }
                        case 4: {
                          o.maxTerrain = r.int32()
                          break
                        }
                        case 5: {
                          o.maxQuadtree = r.int32()
                          break
                        }
                        case 6: {
                          o.maxDioramaMetadata = r.int32()
                          break
                        }
                        case 7: {
                          o.maxDioramaData = r.int32()
                          break
                        }
                        case 8: {
                          o.maxConsumerFetchRatio = r.float()
                          break
                        }
                        case 9: {
                          o.maxProEcFetchRatio = r.float()
                          break
                        }
                        case 10: {
                          o.safeOverallQps = r.float()
                          break
                        }
                        case 11: {
                          o.safeImageryQps = r.float()
                          break
                        }
                        case 14: {
                          o.domainsForHttps = r.string()
                          break
                        }
                        case 15: {
                          o.hostsForHttp = r.string()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : r.maxRequestsPerQuery != null && r.hasOwnProperty('maxRequestsPerQuery') && !u.isInteger(r.maxRequestsPerQuery)
                      ? 'maxRequestsPerQuery: integer expected'
                      : r.forceMaxRequestsPerQuery != null &&
                        r.hasOwnProperty('forceMaxRequestsPerQuery') &&
                        typeof r.forceMaxRequestsPerQuery != 'boolean'
                      ? 'forceMaxRequestsPerQuery: boolean expected'
                      : r.sortBatches != null && r.hasOwnProperty('sortBatches') && typeof r.sortBatches != 'boolean'
                      ? 'sortBatches: boolean expected'
                      : r.maxDrawable != null && r.hasOwnProperty('maxDrawable') && !u.isInteger(r.maxDrawable)
                      ? 'maxDrawable: integer expected'
                      : r.maxImagery != null && r.hasOwnProperty('maxImagery') && !u.isInteger(r.maxImagery)
                      ? 'maxImagery: integer expected'
                      : r.maxTerrain != null && r.hasOwnProperty('maxTerrain') && !u.isInteger(r.maxTerrain)
                      ? 'maxTerrain: integer expected'
                      : r.maxQuadtree != null && r.hasOwnProperty('maxQuadtree') && !u.isInteger(r.maxQuadtree)
                      ? 'maxQuadtree: integer expected'
                      : r.maxDioramaMetadata != null && r.hasOwnProperty('maxDioramaMetadata') && !u.isInteger(r.maxDioramaMetadata)
                      ? 'maxDioramaMetadata: integer expected'
                      : r.maxDioramaData != null && r.hasOwnProperty('maxDioramaData') && !u.isInteger(r.maxDioramaData)
                      ? 'maxDioramaData: integer expected'
                      : r.maxConsumerFetchRatio != null && r.hasOwnProperty('maxConsumerFetchRatio') && typeof r.maxConsumerFetchRatio != 'number'
                      ? 'maxConsumerFetchRatio: number expected'
                      : r.maxProEcFetchRatio != null && r.hasOwnProperty('maxProEcFetchRatio') && typeof r.maxProEcFetchRatio != 'number'
                      ? 'maxProEcFetchRatio: number expected'
                      : r.safeOverallQps != null && r.hasOwnProperty('safeOverallQps') && typeof r.safeOverallQps != 'number'
                      ? 'safeOverallQps: number expected'
                      : r.safeImageryQps != null && r.hasOwnProperty('safeImageryQps') && typeof r.safeImageryQps != 'number'
                      ? 'safeImageryQps: number expected'
                      : r.domainsForHttps != null && r.hasOwnProperty('domainsForHttps') && !u.isString(r.domainsForHttps)
                      ? 'domainsForHttps: string expected'
                      : r.hostsForHttp != null && r.hasOwnProperty('hostsForHttp') && !u.isString(r.hostsForHttp)
                      ? 'hostsForHttp: string expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.FetchingOptionsProto) return r
                    var t = new n.keyhole.dbroot.FetchingOptionsProto()
                    return (
                      r.maxRequestsPerQuery != null && (t.maxRequestsPerQuery = r.maxRequestsPerQuery | 0),
                      r.forceMaxRequestsPerQuery != null && (t.forceMaxRequestsPerQuery = !!r.forceMaxRequestsPerQuery),
                      r.sortBatches != null && (t.sortBatches = !!r.sortBatches),
                      r.maxDrawable != null && (t.maxDrawable = r.maxDrawable | 0),
                      r.maxImagery != null && (t.maxImagery = r.maxImagery | 0),
                      r.maxTerrain != null && (t.maxTerrain = r.maxTerrain | 0),
                      r.maxQuadtree != null && (t.maxQuadtree = r.maxQuadtree | 0),
                      r.maxDioramaMetadata != null && (t.maxDioramaMetadata = r.maxDioramaMetadata | 0),
                      r.maxDioramaData != null && (t.maxDioramaData = r.maxDioramaData | 0),
                      r.maxConsumerFetchRatio != null && (t.maxConsumerFetchRatio = Number(r.maxConsumerFetchRatio)),
                      r.maxProEcFetchRatio != null && (t.maxProEcFetchRatio = Number(r.maxProEcFetchRatio)),
                      r.safeOverallQps != null && (t.safeOverallQps = Number(r.safeOverallQps)),
                      r.safeImageryQps != null && (t.safeImageryQps = Number(r.safeImageryQps)),
                      r.domainsForHttps != null && (t.domainsForHttps = String(r.domainsForHttps)),
                      r.hostsForHttp != null && (t.hostsForHttp = String(r.hostsForHttp)),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults &&
                        ((e.maxRequestsPerQuery = 1),
                        (e.maxDrawable = 2),
                        (e.maxImagery = 2),
                        (e.maxTerrain = 5),
                        (e.maxQuadtree = 5),
                        (e.maxDioramaMetadata = 1),
                        (e.maxDioramaData = 0),
                        (e.maxConsumerFetchRatio = 1),
                        (e.maxProEcFetchRatio = 0),
                        (e.safeOverallQps = 0),
                        (e.safeImageryQps = 0),
                        (e.forceMaxRequestsPerQuery = !1),
                        (e.sortBatches = !1),
                        (e.domainsForHttps = 'google.com gstatic.com'),
                        (e.hostsForHttp = '')),
                      r.maxRequestsPerQuery != null && r.hasOwnProperty('maxRequestsPerQuery') && (e.maxRequestsPerQuery = r.maxRequestsPerQuery),
                      r.maxDrawable != null && r.hasOwnProperty('maxDrawable') && (e.maxDrawable = r.maxDrawable),
                      r.maxImagery != null && r.hasOwnProperty('maxImagery') && (e.maxImagery = r.maxImagery),
                      r.maxTerrain != null && r.hasOwnProperty('maxTerrain') && (e.maxTerrain = r.maxTerrain),
                      r.maxQuadtree != null && r.hasOwnProperty('maxQuadtree') && (e.maxQuadtree = r.maxQuadtree),
                      r.maxDioramaMetadata != null && r.hasOwnProperty('maxDioramaMetadata') && (e.maxDioramaMetadata = r.maxDioramaMetadata),
                      r.maxDioramaData != null && r.hasOwnProperty('maxDioramaData') && (e.maxDioramaData = r.maxDioramaData),
                      r.maxConsumerFetchRatio != null &&
                        r.hasOwnProperty('maxConsumerFetchRatio') &&
                        (e.maxConsumerFetchRatio =
                          t.json && !isFinite(r.maxConsumerFetchRatio) ? String(r.maxConsumerFetchRatio) : r.maxConsumerFetchRatio),
                      r.maxProEcFetchRatio != null &&
                        r.hasOwnProperty('maxProEcFetchRatio') &&
                        (e.maxProEcFetchRatio = t.json && !isFinite(r.maxProEcFetchRatio) ? String(r.maxProEcFetchRatio) : r.maxProEcFetchRatio),
                      r.safeOverallQps != null &&
                        r.hasOwnProperty('safeOverallQps') &&
                        (e.safeOverallQps = t.json && !isFinite(r.safeOverallQps) ? String(r.safeOverallQps) : r.safeOverallQps),
                      r.safeImageryQps != null &&
                        r.hasOwnProperty('safeImageryQps') &&
                        (e.safeImageryQps = t.json && !isFinite(r.safeImageryQps) ? String(r.safeImageryQps) : r.safeImageryQps),
                      r.forceMaxRequestsPerQuery != null &&
                        r.hasOwnProperty('forceMaxRequestsPerQuery') &&
                        (e.forceMaxRequestsPerQuery = r.forceMaxRequestsPerQuery),
                      r.sortBatches != null && r.hasOwnProperty('sortBatches') && (e.sortBatches = r.sortBatches),
                      r.domainsForHttps != null && r.hasOwnProperty('domainsForHttps') && (e.domainsForHttps = r.domainsForHttps),
                      r.hostsForHttp != null && r.hasOwnProperty('hostsForHttp') && (e.hostsForHttp = r.hostsForHttp),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.FetchingOptionsProto'
                  }),
                  i
                )
              })()),
              (c.TimeMachineOptionsProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.serverUrl = ''),
                  (i.prototype.isTimemachine = !1),
                  (i.prototype.dwellTimeMs = 500),
                  (i.prototype.discoverabilityAltitudeMeters = 15e3),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.TimeMachineOptionsProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.serverUrl = r.string()
                          break
                        }
                        case 2: {
                          o.isTimemachine = r.bool()
                          break
                        }
                        case 3: {
                          o.dwellTimeMs = r.int32()
                          break
                        }
                        case 4: {
                          o.discoverabilityAltitudeMeters = r.int32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : r.serverUrl != null && r.hasOwnProperty('serverUrl') && !u.isString(r.serverUrl)
                      ? 'serverUrl: string expected'
                      : r.isTimemachine != null && r.hasOwnProperty('isTimemachine') && typeof r.isTimemachine != 'boolean'
                      ? 'isTimemachine: boolean expected'
                      : r.dwellTimeMs != null && r.hasOwnProperty('dwellTimeMs') && !u.isInteger(r.dwellTimeMs)
                      ? 'dwellTimeMs: integer expected'
                      : r.discoverabilityAltitudeMeters != null &&
                        r.hasOwnProperty('discoverabilityAltitudeMeters') &&
                        !u.isInteger(r.discoverabilityAltitudeMeters)
                      ? 'discoverabilityAltitudeMeters: integer expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.TimeMachineOptionsProto) return r
                    var t = new n.keyhole.dbroot.TimeMachineOptionsProto()
                    return (
                      r.serverUrl != null && (t.serverUrl = String(r.serverUrl)),
                      r.isTimemachine != null && (t.isTimemachine = !!r.isTimemachine),
                      r.dwellTimeMs != null && (t.dwellTimeMs = r.dwellTimeMs | 0),
                      r.discoverabilityAltitudeMeters != null && (t.discoverabilityAltitudeMeters = r.discoverabilityAltitudeMeters | 0),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.serverUrl = ''), (e.isTimemachine = !1), (e.dwellTimeMs = 500), (e.discoverabilityAltitudeMeters = 15e3)),
                      r.serverUrl != null && r.hasOwnProperty('serverUrl') && (e.serverUrl = r.serverUrl),
                      r.isTimemachine != null && r.hasOwnProperty('isTimemachine') && (e.isTimemachine = r.isTimemachine),
                      r.dwellTimeMs != null && r.hasOwnProperty('dwellTimeMs') && (e.dwellTimeMs = r.dwellTimeMs),
                      r.discoverabilityAltitudeMeters != null &&
                        r.hasOwnProperty('discoverabilityAltitudeMeters') &&
                        (e.discoverabilityAltitudeMeters = r.discoverabilityAltitudeMeters),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.TimeMachineOptionsProto'
                  }),
                  i
                )
              })()),
              (c.AutopiaOptionsProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.metadataServerUrl = 'http://cbk0.google.com/cbk'),
                  (i.prototype.depthmapServerUrl = 'http://cbk0.google.com/cbk'),
                  (i.prototype.coverageOverlayUrl = ''),
                  (i.prototype.maxImageryQps = 0),
                  (i.prototype.maxMetadataDepthmapQps = 0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.AutopiaOptionsProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.metadataServerUrl = r.string()
                          break
                        }
                        case 2: {
                          o.depthmapServerUrl = r.string()
                          break
                        }
                        case 3: {
                          o.coverageOverlayUrl = r.string()
                          break
                        }
                        case 4: {
                          o.maxImageryQps = r.float()
                          break
                        }
                        case 5: {
                          o.maxMetadataDepthmapQps = r.float()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : r.metadataServerUrl != null && r.hasOwnProperty('metadataServerUrl') && !u.isString(r.metadataServerUrl)
                      ? 'metadataServerUrl: string expected'
                      : r.depthmapServerUrl != null && r.hasOwnProperty('depthmapServerUrl') && !u.isString(r.depthmapServerUrl)
                      ? 'depthmapServerUrl: string expected'
                      : r.coverageOverlayUrl != null && r.hasOwnProperty('coverageOverlayUrl') && !u.isString(r.coverageOverlayUrl)
                      ? 'coverageOverlayUrl: string expected'
                      : r.maxImageryQps != null && r.hasOwnProperty('maxImageryQps') && typeof r.maxImageryQps != 'number'
                      ? 'maxImageryQps: number expected'
                      : r.maxMetadataDepthmapQps != null && r.hasOwnProperty('maxMetadataDepthmapQps') && typeof r.maxMetadataDepthmapQps != 'number'
                      ? 'maxMetadataDepthmapQps: number expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.AutopiaOptionsProto) return r
                    var t = new n.keyhole.dbroot.AutopiaOptionsProto()
                    return (
                      r.metadataServerUrl != null && (t.metadataServerUrl = String(r.metadataServerUrl)),
                      r.depthmapServerUrl != null && (t.depthmapServerUrl = String(r.depthmapServerUrl)),
                      r.coverageOverlayUrl != null && (t.coverageOverlayUrl = String(r.coverageOverlayUrl)),
                      r.maxImageryQps != null && (t.maxImageryQps = Number(r.maxImageryQps)),
                      r.maxMetadataDepthmapQps != null && (t.maxMetadataDepthmapQps = Number(r.maxMetadataDepthmapQps)),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults &&
                        ((e.metadataServerUrl = 'http://cbk0.google.com/cbk'),
                        (e.depthmapServerUrl = 'http://cbk0.google.com/cbk'),
                        (e.coverageOverlayUrl = ''),
                        (e.maxImageryQps = 0),
                        (e.maxMetadataDepthmapQps = 0)),
                      r.metadataServerUrl != null && r.hasOwnProperty('metadataServerUrl') && (e.metadataServerUrl = r.metadataServerUrl),
                      r.depthmapServerUrl != null && r.hasOwnProperty('depthmapServerUrl') && (e.depthmapServerUrl = r.depthmapServerUrl),
                      r.coverageOverlayUrl != null && r.hasOwnProperty('coverageOverlayUrl') && (e.coverageOverlayUrl = r.coverageOverlayUrl),
                      r.maxImageryQps != null &&
                        r.hasOwnProperty('maxImageryQps') &&
                        (e.maxImageryQps = t.json && !isFinite(r.maxImageryQps) ? String(r.maxImageryQps) : r.maxImageryQps),
                      r.maxMetadataDepthmapQps != null &&
                        r.hasOwnProperty('maxMetadataDepthmapQps') &&
                        (e.maxMetadataDepthmapQps =
                          t.json && !isFinite(r.maxMetadataDepthmapQps) ? String(r.maxMetadataDepthmapQps) : r.maxMetadataDepthmapQps),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.AutopiaOptionsProto'
                  }),
                  i
                )
              })()),
              (c.CSIOptionsProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.samplingPercentage = 0),
                  (i.prototype.experimentId = ''),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.CSIOptionsProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.samplingPercentage = r.int32()
                          break
                        }
                        case 2: {
                          o.experimentId = r.string()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : r.samplingPercentage != null && r.hasOwnProperty('samplingPercentage') && !u.isInteger(r.samplingPercentage)
                      ? 'samplingPercentage: integer expected'
                      : r.experimentId != null && r.hasOwnProperty('experimentId') && !u.isString(r.experimentId)
                      ? 'experimentId: string expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.CSIOptionsProto) return r
                    var t = new n.keyhole.dbroot.CSIOptionsProto()
                    return (
                      r.samplingPercentage != null && (t.samplingPercentage = r.samplingPercentage | 0),
                      r.experimentId != null && (t.experimentId = String(r.experimentId)),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.samplingPercentage = 0), (e.experimentId = '')),
                      r.samplingPercentage != null && r.hasOwnProperty('samplingPercentage') && (e.samplingPercentage = r.samplingPercentage),
                      r.experimentId != null && r.hasOwnProperty('experimentId') && (e.experimentId = r.experimentId),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.CSIOptionsProto'
                  }),
                  i
                )
              })()),
              (c.SearchTabProto = (function () {
                function i(l) {
                  if (((this.inputBox = []), l)) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.isVisible = !1),
                  (i.prototype.tabLabel = null),
                  (i.prototype.baseUrl = ''),
                  (i.prototype.viewportPrefix = ''),
                  (i.prototype.inputBox = u.emptyArray),
                  (i.prototype.requirement = null),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.SearchTabProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.isVisible = r.bool()
                          break
                        }
                        case 2: {
                          o.tabLabel = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 3: {
                          o.baseUrl = r.string()
                          break
                        }
                        case 4: {
                          o.viewportPrefix = r.string()
                          break
                        }
                        case 5: {
                          ;(o.inputBox && o.inputBox.length) || (o.inputBox = []),
                            o.inputBox.push(n.keyhole.dbroot.SearchTabProto.InputBoxInfo.decode(r, r.uint32()))
                          break
                        }
                        case 6: {
                          o.requirement = n.keyhole.dbroot.RequirementProto.decode(r, r.uint32())
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('isVisible')) throw u.ProtocolError("missing required 'isVisible'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (typeof r.isVisible != 'boolean') return 'isVisible: boolean expected'
                    if (r.tabLabel != null && r.hasOwnProperty('tabLabel')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.tabLabel)
                      if (t) return 'tabLabel.' + t
                    }
                    if (r.baseUrl != null && r.hasOwnProperty('baseUrl') && !u.isString(r.baseUrl)) return 'baseUrl: string expected'
                    if (r.viewportPrefix != null && r.hasOwnProperty('viewportPrefix') && !u.isString(r.viewportPrefix))
                      return 'viewportPrefix: string expected'
                    if (r.inputBox != null && r.hasOwnProperty('inputBox')) {
                      if (!Array.isArray(r.inputBox)) return 'inputBox: array expected'
                      for (var e = 0; e < r.inputBox.length; ++e) {
                        var t = n.keyhole.dbroot.SearchTabProto.InputBoxInfo.verify(r.inputBox[e])
                        if (t) return 'inputBox.' + t
                      }
                    }
                    if (r.requirement != null && r.hasOwnProperty('requirement')) {
                      var t = n.keyhole.dbroot.RequirementProto.verify(r.requirement)
                      if (t) return 'requirement.' + t
                    }
                    return null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.SearchTabProto) return r
                    var t = new n.keyhole.dbroot.SearchTabProto()
                    if ((r.isVisible != null && (t.isVisible = !!r.isVisible), r.tabLabel != null)) {
                      if (typeof r.tabLabel != 'object') throw TypeError('.keyhole.dbroot.SearchTabProto.tabLabel: object expected')
                      t.tabLabel = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.tabLabel)
                    }
                    if (
                      (r.baseUrl != null && (t.baseUrl = String(r.baseUrl)),
                      r.viewportPrefix != null && (t.viewportPrefix = String(r.viewportPrefix)),
                      r.inputBox)
                    ) {
                      if (!Array.isArray(r.inputBox)) throw TypeError('.keyhole.dbroot.SearchTabProto.inputBox: array expected')
                      t.inputBox = []
                      for (var e = 0; e < r.inputBox.length; ++e) {
                        if (typeof r.inputBox[e] != 'object') throw TypeError('.keyhole.dbroot.SearchTabProto.inputBox: object expected')
                        t.inputBox[e] = n.keyhole.dbroot.SearchTabProto.InputBoxInfo.fromObject(r.inputBox[e])
                      }
                    }
                    if (r.requirement != null) {
                      if (typeof r.requirement != 'object') throw TypeError('.keyhole.dbroot.SearchTabProto.requirement: object expected')
                      t.requirement = n.keyhole.dbroot.RequirementProto.fromObject(r.requirement)
                    }
                    return t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    if (
                      ((t.arrays || t.defaults) && (e.inputBox = []),
                      t.defaults && ((e.isVisible = !1), (e.tabLabel = null), (e.baseUrl = ''), (e.viewportPrefix = ''), (e.requirement = null)),
                      r.isVisible != null && r.hasOwnProperty('isVisible') && (e.isVisible = r.isVisible),
                      r.tabLabel != null &&
                        r.hasOwnProperty('tabLabel') &&
                        (e.tabLabel = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.tabLabel, t)),
                      r.baseUrl != null && r.hasOwnProperty('baseUrl') && (e.baseUrl = r.baseUrl),
                      r.viewportPrefix != null && r.hasOwnProperty('viewportPrefix') && (e.viewportPrefix = r.viewportPrefix),
                      r.inputBox && r.inputBox.length)
                    ) {
                      e.inputBox = []
                      for (var o = 0; o < r.inputBox.length; ++o)
                        e.inputBox[o] = n.keyhole.dbroot.SearchTabProto.InputBoxInfo.toObject(r.inputBox[o], t)
                    }
                    return (
                      r.requirement != null &&
                        r.hasOwnProperty('requirement') &&
                        (e.requirement = n.keyhole.dbroot.RequirementProto.toObject(r.requirement, t)),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.SearchTabProto'
                  }),
                  (i.InputBoxInfo = (function () {
                    function l(r) {
                      if (r) for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.label = null),
                      (l.prototype.queryVerb = ''),
                      (l.prototype.queryPrepend = ''),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.SearchTabProto.InputBoxInfo(); t.pos < o; ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              a.label = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 2: {
                              a.queryVerb = t.string()
                              break
                            }
                            case 3: {
                              a.queryPrepend = t.string()
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        if (!a.hasOwnProperty('label')) throw u.ProtocolError("missing required 'label'", { instance: a })
                        if (!a.hasOwnProperty('queryVerb')) throw u.ProtocolError("missing required 'queryVerb'", { instance: a })
                        return a
                      }),
                      (l.verify = function (t) {
                        if (typeof t != 'object' || t === null) return 'object expected'
                        {
                          var e = n.keyhole.dbroot.StringIdOrValueProto.verify(t.label)
                          if (e) return 'label.' + e
                        }
                        return u.isString(t.queryVerb)
                          ? t.queryPrepend != null && t.hasOwnProperty('queryPrepend') && !u.isString(t.queryPrepend)
                            ? 'queryPrepend: string expected'
                            : null
                          : 'queryVerb: string expected'
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.SearchTabProto.InputBoxInfo) return t
                        var e = new n.keyhole.dbroot.SearchTabProto.InputBoxInfo()
                        if (t.label != null) {
                          if (typeof t.label != 'object') throw TypeError('.keyhole.dbroot.SearchTabProto.InputBoxInfo.label: object expected')
                          e.label = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.label)
                        }
                        return (
                          t.queryVerb != null && (e.queryVerb = String(t.queryVerb)),
                          t.queryPrepend != null && (e.queryPrepend = String(t.queryPrepend)),
                          e
                        )
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        return (
                          e.defaults && ((o.label = null), (o.queryVerb = ''), (o.queryPrepend = '')),
                          t.label != null && t.hasOwnProperty('label') && (o.label = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.label, e)),
                          t.queryVerb != null && t.hasOwnProperty('queryVerb') && (o.queryVerb = t.queryVerb),
                          t.queryPrepend != null && t.hasOwnProperty('queryPrepend') && (o.queryPrepend = t.queryPrepend),
                          o
                        )
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.SearchTabProto.InputBoxInfo'
                      }),
                      l
                    )
                  })()),
                  i
                )
              })()),
              (c.CobrandProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.logoUrl = ''),
                  (i.prototype.xCoord = null),
                  (i.prototype.yCoord = null),
                  (i.prototype.tiePoint = 6),
                  (i.prototype.screenSize = 0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.CobrandProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.logoUrl = r.string()
                          break
                        }
                        case 2: {
                          o.xCoord = n.keyhole.dbroot.CobrandProto.Coord.decode(r, r.uint32())
                          break
                        }
                        case 3: {
                          o.yCoord = n.keyhole.dbroot.CobrandProto.Coord.decode(r, r.uint32())
                          break
                        }
                        case 4: {
                          o.tiePoint = r.int32()
                          break
                        }
                        case 5: {
                          o.screenSize = r.double()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('logoUrl')) throw u.ProtocolError("missing required 'logoUrl'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (!u.isString(r.logoUrl)) return 'logoUrl: string expected'
                    if (r.xCoord != null && r.hasOwnProperty('xCoord')) {
                      var t = n.keyhole.dbroot.CobrandProto.Coord.verify(r.xCoord)
                      if (t) return 'xCoord.' + t
                    }
                    if (r.yCoord != null && r.hasOwnProperty('yCoord')) {
                      var t = n.keyhole.dbroot.CobrandProto.Coord.verify(r.yCoord)
                      if (t) return 'yCoord.' + t
                    }
                    if (r.tiePoint != null && r.hasOwnProperty('tiePoint'))
                      switch (r.tiePoint) {
                        default:
                          return 'tiePoint: enum value expected'
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                          break
                      }
                    return r.screenSize != null && r.hasOwnProperty('screenSize') && typeof r.screenSize != 'number'
                      ? 'screenSize: number expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.CobrandProto) return r
                    var t = new n.keyhole.dbroot.CobrandProto()
                    if ((r.logoUrl != null && (t.logoUrl = String(r.logoUrl)), r.xCoord != null)) {
                      if (typeof r.xCoord != 'object') throw TypeError('.keyhole.dbroot.CobrandProto.xCoord: object expected')
                      t.xCoord = n.keyhole.dbroot.CobrandProto.Coord.fromObject(r.xCoord)
                    }
                    if (r.yCoord != null) {
                      if (typeof r.yCoord != 'object') throw TypeError('.keyhole.dbroot.CobrandProto.yCoord: object expected')
                      t.yCoord = n.keyhole.dbroot.CobrandProto.Coord.fromObject(r.yCoord)
                    }
                    switch (r.tiePoint) {
                      case 'TOP_LEFT':
                      case 0:
                        t.tiePoint = 0
                        break
                      case 'TOP_CENTER':
                      case 1:
                        t.tiePoint = 1
                        break
                      case 'TOP_RIGHT':
                      case 2:
                        t.tiePoint = 2
                        break
                      case 'MID_LEFT':
                      case 3:
                        t.tiePoint = 3
                        break
                      case 'MID_CENTER':
                      case 4:
                        t.tiePoint = 4
                        break
                      case 'MID_RIGHT':
                      case 5:
                        t.tiePoint = 5
                        break
                      case 'BOTTOM_LEFT':
                      case 6:
                        t.tiePoint = 6
                        break
                      case 'BOTTOM_CENTER':
                      case 7:
                        t.tiePoint = 7
                        break
                      case 'BOTTOM_RIGHT':
                      case 8:
                        t.tiePoint = 8
                        break
                    }
                    return r.screenSize != null && (t.screenSize = Number(r.screenSize)), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults &&
                        ((e.logoUrl = ''),
                        (e.xCoord = null),
                        (e.yCoord = null),
                        (e.tiePoint = t.enums === String ? 'BOTTOM_LEFT' : 6),
                        (e.screenSize = 0)),
                      r.logoUrl != null && r.hasOwnProperty('logoUrl') && (e.logoUrl = r.logoUrl),
                      r.xCoord != null && r.hasOwnProperty('xCoord') && (e.xCoord = n.keyhole.dbroot.CobrandProto.Coord.toObject(r.xCoord, t)),
                      r.yCoord != null && r.hasOwnProperty('yCoord') && (e.yCoord = n.keyhole.dbroot.CobrandProto.Coord.toObject(r.yCoord, t)),
                      r.tiePoint != null &&
                        r.hasOwnProperty('tiePoint') &&
                        (e.tiePoint = t.enums === String ? n.keyhole.dbroot.CobrandProto.TiePoint[r.tiePoint] : r.tiePoint),
                      r.screenSize != null &&
                        r.hasOwnProperty('screenSize') &&
                        (e.screenSize = t.json && !isFinite(r.screenSize) ? String(r.screenSize) : r.screenSize),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.CobrandProto'
                  }),
                  (i.Coord = (function () {
                    function l(r) {
                      if (r) for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.value = 0),
                      (l.prototype.isRelative = !1),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.CobrandProto.Coord(); t.pos < o; ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              a.value = t.double()
                              break
                            }
                            case 2: {
                              a.isRelative = t.bool()
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        if (!a.hasOwnProperty('value')) throw u.ProtocolError("missing required 'value'", { instance: a })
                        return a
                      }),
                      (l.verify = function (t) {
                        return typeof t != 'object' || t === null
                          ? 'object expected'
                          : typeof t.value != 'number'
                          ? 'value: number expected'
                          : t.isRelative != null && t.hasOwnProperty('isRelative') && typeof t.isRelative != 'boolean'
                          ? 'isRelative: boolean expected'
                          : null
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.CobrandProto.Coord) return t
                        var e = new n.keyhole.dbroot.CobrandProto.Coord()
                        return t.value != null && (e.value = Number(t.value)), t.isRelative != null && (e.isRelative = !!t.isRelative), e
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        return (
                          e.defaults && ((o.value = 0), (o.isRelative = !1)),
                          t.value != null && t.hasOwnProperty('value') && (o.value = e.json && !isFinite(t.value) ? String(t.value) : t.value),
                          t.isRelative != null && t.hasOwnProperty('isRelative') && (o.isRelative = t.isRelative),
                          o
                        )
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.CobrandProto.Coord'
                      }),
                      l
                    )
                  })()),
                  (i.TiePoint = (function () {
                    var l = {},
                      r = Object.create(l)
                    return (
                      (r[(l[0] = 'TOP_LEFT')] = 0),
                      (r[(l[1] = 'TOP_CENTER')] = 1),
                      (r[(l[2] = 'TOP_RIGHT')] = 2),
                      (r[(l[3] = 'MID_LEFT')] = 3),
                      (r[(l[4] = 'MID_CENTER')] = 4),
                      (r[(l[5] = 'MID_RIGHT')] = 5),
                      (r[(l[6] = 'BOTTOM_LEFT')] = 6),
                      (r[(l[7] = 'BOTTOM_CENTER')] = 7),
                      (r[(l[8] = 'BOTTOM_RIGHT')] = 8),
                      r
                    )
                  })()),
                  i
                )
              })()),
              (c.DatabaseDescriptionProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.databaseName = null),
                  (i.prototype.databaseUrl = ''),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.DatabaseDescriptionProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.databaseName = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 2: {
                          o.databaseUrl = r.string()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('databaseUrl')) throw u.ProtocolError("missing required 'databaseUrl'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.databaseName != null && r.hasOwnProperty('databaseName')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.databaseName)
                      if (t) return 'databaseName.' + t
                    }
                    return u.isString(r.databaseUrl) ? null : 'databaseUrl: string expected'
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.DatabaseDescriptionProto) return r
                    var t = new n.keyhole.dbroot.DatabaseDescriptionProto()
                    if (r.databaseName != null) {
                      if (typeof r.databaseName != 'object') throw TypeError('.keyhole.dbroot.DatabaseDescriptionProto.databaseName: object expected')
                      t.databaseName = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.databaseName)
                    }
                    return r.databaseUrl != null && (t.databaseUrl = String(r.databaseUrl)), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.databaseName = null), (e.databaseUrl = '')),
                      r.databaseName != null &&
                        r.hasOwnProperty('databaseName') &&
                        (e.databaseName = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.databaseName, t)),
                      r.databaseUrl != null && r.hasOwnProperty('databaseUrl') && (e.databaseUrl = r.databaseUrl),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.DatabaseDescriptionProto'
                  }),
                  i
                )
              })()),
              (c.ConfigScriptProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.scriptName = ''),
                  (i.prototype.scriptData = ''),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.ConfigScriptProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.scriptName = r.string()
                          break
                        }
                        case 2: {
                          o.scriptData = r.string()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('scriptName')) throw u.ProtocolError("missing required 'scriptName'", { instance: o })
                    if (!o.hasOwnProperty('scriptData')) throw u.ProtocolError("missing required 'scriptData'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : u.isString(r.scriptName)
                      ? u.isString(r.scriptData)
                        ? null
                        : 'scriptData: string expected'
                      : 'scriptName: string expected'
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.ConfigScriptProto) return r
                    var t = new n.keyhole.dbroot.ConfigScriptProto()
                    return (
                      r.scriptName != null && (t.scriptName = String(r.scriptName)), r.scriptData != null && (t.scriptData = String(r.scriptData)), t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.scriptName = ''), (e.scriptData = '')),
                      r.scriptName != null && r.hasOwnProperty('scriptName') && (e.scriptName = r.scriptName),
                      r.scriptData != null && r.hasOwnProperty('scriptData') && (e.scriptData = r.scriptData),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.ConfigScriptProto'
                  }),
                  i
                )
              })()),
              (c.SwoopParamsProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.startDistInMeters = 0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.SwoopParamsProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.startDistInMeters = r.double()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : r.startDistInMeters != null && r.hasOwnProperty('startDistInMeters') && typeof r.startDistInMeters != 'number'
                      ? 'startDistInMeters: number expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.SwoopParamsProto) return r
                    var t = new n.keyhole.dbroot.SwoopParamsProto()
                    return r.startDistInMeters != null && (t.startDistInMeters = Number(r.startDistInMeters)), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && (e.startDistInMeters = 0),
                      r.startDistInMeters != null &&
                        r.hasOwnProperty('startDistInMeters') &&
                        (e.startDistInMeters = t.json && !isFinite(r.startDistInMeters) ? String(r.startDistInMeters) : r.startDistInMeters),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.SwoopParamsProto'
                  }),
                  i
                )
              })()),
              (c.PostingServerProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.name = null),
                  (i.prototype.baseUrl = null),
                  (i.prototype.postWizardPath = null),
                  (i.prototype.fileSubmitPath = null),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.PostingServerProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.name = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 2: {
                          o.baseUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 3: {
                          o.postWizardPath = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 4: {
                          o.fileSubmitPath = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.name != null && r.hasOwnProperty('name')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.name)
                      if (t) return 'name.' + t
                    }
                    if (r.baseUrl != null && r.hasOwnProperty('baseUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.baseUrl)
                      if (t) return 'baseUrl.' + t
                    }
                    if (r.postWizardPath != null && r.hasOwnProperty('postWizardPath')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.postWizardPath)
                      if (t) return 'postWizardPath.' + t
                    }
                    if (r.fileSubmitPath != null && r.hasOwnProperty('fileSubmitPath')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.fileSubmitPath)
                      if (t) return 'fileSubmitPath.' + t
                    }
                    return null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.PostingServerProto) return r
                    var t = new n.keyhole.dbroot.PostingServerProto()
                    if (r.name != null) {
                      if (typeof r.name != 'object') throw TypeError('.keyhole.dbroot.PostingServerProto.name: object expected')
                      t.name = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.name)
                    }
                    if (r.baseUrl != null) {
                      if (typeof r.baseUrl != 'object') throw TypeError('.keyhole.dbroot.PostingServerProto.baseUrl: object expected')
                      t.baseUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.baseUrl)
                    }
                    if (r.postWizardPath != null) {
                      if (typeof r.postWizardPath != 'object') throw TypeError('.keyhole.dbroot.PostingServerProto.postWizardPath: object expected')
                      t.postWizardPath = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.postWizardPath)
                    }
                    if (r.fileSubmitPath != null) {
                      if (typeof r.fileSubmitPath != 'object') throw TypeError('.keyhole.dbroot.PostingServerProto.fileSubmitPath: object expected')
                      t.fileSubmitPath = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.fileSubmitPath)
                    }
                    return t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.name = null), (e.baseUrl = null), (e.postWizardPath = null), (e.fileSubmitPath = null)),
                      r.name != null && r.hasOwnProperty('name') && (e.name = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.name, t)),
                      r.baseUrl != null && r.hasOwnProperty('baseUrl') && (e.baseUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.baseUrl, t)),
                      r.postWizardPath != null &&
                        r.hasOwnProperty('postWizardPath') &&
                        (e.postWizardPath = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.postWizardPath, t)),
                      r.fileSubmitPath != null &&
                        r.hasOwnProperty('fileSubmitPath') &&
                        (e.fileSubmitPath = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.fileSubmitPath, t)),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.PostingServerProto'
                  }),
                  i
                )
              })()),
              (c.PlanetaryDatabaseProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.url = null),
                  (i.prototype.name = null),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.PlanetaryDatabaseProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.url = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 2: {
                          o.name = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('url')) throw u.ProtocolError("missing required 'url'", { instance: o })
                    if (!o.hasOwnProperty('name')) throw u.ProtocolError("missing required 'name'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.url)
                      if (t) return 'url.' + t
                    }
                    {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.name)
                      if (t) return 'name.' + t
                    }
                    return null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.PlanetaryDatabaseProto) return r
                    var t = new n.keyhole.dbroot.PlanetaryDatabaseProto()
                    if (r.url != null) {
                      if (typeof r.url != 'object') throw TypeError('.keyhole.dbroot.PlanetaryDatabaseProto.url: object expected')
                      t.url = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.url)
                    }
                    if (r.name != null) {
                      if (typeof r.name != 'object') throw TypeError('.keyhole.dbroot.PlanetaryDatabaseProto.name: object expected')
                      t.name = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.name)
                    }
                    return t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.url = null), (e.name = null)),
                      r.url != null && r.hasOwnProperty('url') && (e.url = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.url, t)),
                      r.name != null && r.hasOwnProperty('name') && (e.name = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.name, t)),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.PlanetaryDatabaseProto'
                  }),
                  i
                )
              })()),
              (c.LogServerProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.url = null),
                  (i.prototype.enable = !1),
                  (i.prototype.throttlingFactor = 1),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.LogServerProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.url = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 2: {
                          o.enable = r.bool()
                          break
                        }
                        case 3: {
                          o.throttlingFactor = r.int32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.url != null && r.hasOwnProperty('url')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.url)
                      if (t) return 'url.' + t
                    }
                    return r.enable != null && r.hasOwnProperty('enable') && typeof r.enable != 'boolean'
                      ? 'enable: boolean expected'
                      : r.throttlingFactor != null && r.hasOwnProperty('throttlingFactor') && !u.isInteger(r.throttlingFactor)
                      ? 'throttlingFactor: integer expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.LogServerProto) return r
                    var t = new n.keyhole.dbroot.LogServerProto()
                    if (r.url != null) {
                      if (typeof r.url != 'object') throw TypeError('.keyhole.dbroot.LogServerProto.url: object expected')
                      t.url = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.url)
                    }
                    return r.enable != null && (t.enable = !!r.enable), r.throttlingFactor != null && (t.throttlingFactor = r.throttlingFactor | 0), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.url = null), (e.enable = !1), (e.throttlingFactor = 1)),
                      r.url != null && r.hasOwnProperty('url') && (e.url = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.url, t)),
                      r.enable != null && r.hasOwnProperty('enable') && (e.enable = r.enable),
                      r.throttlingFactor != null && r.hasOwnProperty('throttlingFactor') && (e.throttlingFactor = r.throttlingFactor),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.LogServerProto'
                  }),
                  i
                )
              })()),
              (c.EndSnippetProto = (function () {
                function i(l) {
                  if (
                    ((this.mfeDomains = []),
                    (this.searchTab = []),
                    (this.cobrandInfo = []),
                    (this.validDatabase = []),
                    (this.configScript = []),
                    (this.planetaryDatabase = []),
                    (this.filmstripConfig = []),
                    l)
                  )
                    for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.model = null),
                  (i.prototype.authServerUrl = null),
                  (i.prototype.disableAuthentication = !1),
                  (i.prototype.mfeDomains = u.emptyArray),
                  (i.prototype.mfeLangParam = 'hl=$5Bhl5D'),
                  (i.prototype.adsUrlPatterns = ''),
                  (i.prototype.reverseGeocoderUrl = null),
                  (i.prototype.reverseGeocoderProtocolVersion = 3),
                  (i.prototype.skyDatabaseIsAvailable = !0),
                  (i.prototype.skyDatabaseUrl = null),
                  (i.prototype.defaultWebPageIntlUrl = null),
                  (i.prototype.numStartUpTips = 17),
                  (i.prototype.startUpTipsUrl = null),
                  (i.prototype.numProStartUpTips = 0),
                  (i.prototype.proStartUpTipsUrl = null),
                  (i.prototype.startupTipsIntlUrl = null),
                  (i.prototype.userGuideIntlUrl = null),
                  (i.prototype.supportCenterIntlUrl = null),
                  (i.prototype.businessListingIntlUrl = null),
                  (i.prototype.supportAnswerIntlUrl = null),
                  (i.prototype.supportTopicIntlUrl = null),
                  (i.prototype.supportRequestIntlUrl = null),
                  (i.prototype.earthIntlUrl = null),
                  (i.prototype.addContentUrl = null),
                  (i.prototype.sketchupNotInstalledUrl = null),
                  (i.prototype.sketchupErrorUrl = null),
                  (i.prototype.freeLicenseUrl = null),
                  (i.prototype.proLicenseUrl = null),
                  (i.prototype.tutorialUrl = null),
                  (i.prototype.keyboardShortcutsUrl = null),
                  (i.prototype.releaseNotesUrl = null),
                  (i.prototype.hideUserData = !1),
                  (i.prototype.useGeLogo = !0),
                  (i.prototype.dioramaDescriptionUrlBase = null),
                  (i.prototype.dioramaDefaultColor = 4291281607),
                  (i.prototype.dioramaBlacklistUrl = null),
                  (i.prototype.clientOptions = null),
                  (i.prototype.fetchingOptions = null),
                  (i.prototype.timeMachineOptions = null),
                  (i.prototype.csiOptions = null),
                  (i.prototype.searchTab = u.emptyArray),
                  (i.prototype.cobrandInfo = u.emptyArray),
                  (i.prototype.validDatabase = u.emptyArray),
                  (i.prototype.configScript = u.emptyArray),
                  (i.prototype.deauthServerUrl = null),
                  (i.prototype.swoopParameters = null),
                  (i.prototype.bbsServerInfo = null),
                  (i.prototype.dataErrorServerInfo = null),
                  (i.prototype.planetaryDatabase = u.emptyArray),
                  (i.prototype.logServer = null),
                  (i.prototype.autopiaOptions = null),
                  (i.prototype.searchConfig = null),
                  (i.prototype.searchInfo = null),
                  (i.prototype.elevationServiceBaseUrl = 'http://maps.google.com/maps/api/elevation/'),
                  (i.prototype.elevationProfileQueryDelay = 500),
                  (i.prototype.proUpgradeUrl = null),
                  (i.prototype.earthCommunityUrl = null),
                  (i.prototype.googleMapsUrl = null),
                  (i.prototype.sharingUrl = null),
                  (i.prototype.privacyPolicyUrl = null),
                  (i.prototype.doGplusUserCheck = !1),
                  (i.prototype.rocktreeDataProto = null),
                  (i.prototype.filmstripConfig = u.emptyArray),
                  (i.prototype.showSigninButton = !1),
                  (i.prototype.proMeasureUpsellUrl = null),
                  (i.prototype.proPrintUpsellUrl = null),
                  (i.prototype.starDataProto = null),
                  (i.prototype.feedbackUrl = null),
                  (i.prototype.oauth2LoginUrl = null),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.EndSnippetProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.model = n.keyhole.dbroot.PlanetModelProto.decode(r, r.uint32())
                          break
                        }
                        case 2: {
                          o.authServerUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 3: {
                          o.disableAuthentication = r.bool()
                          break
                        }
                        case 4: {
                          ;(o.mfeDomains && o.mfeDomains.length) || (o.mfeDomains = []),
                            o.mfeDomains.push(n.keyhole.dbroot.MfeDomainFeaturesProto.decode(r, r.uint32()))
                          break
                        }
                        case 5: {
                          o.mfeLangParam = r.string()
                          break
                        }
                        case 6: {
                          o.adsUrlPatterns = r.string()
                          break
                        }
                        case 7: {
                          o.reverseGeocoderUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 8: {
                          o.reverseGeocoderProtocolVersion = r.int32()
                          break
                        }
                        case 9: {
                          o.skyDatabaseIsAvailable = r.bool()
                          break
                        }
                        case 10: {
                          o.skyDatabaseUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 11: {
                          o.defaultWebPageIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 12: {
                          o.numStartUpTips = r.int32()
                          break
                        }
                        case 13: {
                          o.startUpTipsUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 51: {
                          o.numProStartUpTips = r.int32()
                          break
                        }
                        case 52: {
                          o.proStartUpTipsUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 64: {
                          o.startupTipsIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 14: {
                          o.userGuideIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 15: {
                          o.supportCenterIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 16: {
                          o.businessListingIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 17: {
                          o.supportAnswerIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 18: {
                          o.supportTopicIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 19: {
                          o.supportRequestIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 20: {
                          o.earthIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 21: {
                          o.addContentUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 22: {
                          o.sketchupNotInstalledUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 23: {
                          o.sketchupErrorUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 24: {
                          o.freeLicenseUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 25: {
                          o.proLicenseUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 48: {
                          o.tutorialUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 49: {
                          o.keyboardShortcutsUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 50: {
                          o.releaseNotesUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 26: {
                          o.hideUserData = r.bool()
                          break
                        }
                        case 27: {
                          o.useGeLogo = r.bool()
                          break
                        }
                        case 28: {
                          o.dioramaDescriptionUrlBase = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 29: {
                          o.dioramaDefaultColor = r.uint32()
                          break
                        }
                        case 53: {
                          o.dioramaBlacklistUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 30: {
                          o.clientOptions = n.keyhole.dbroot.ClientOptionsProto.decode(r, r.uint32())
                          break
                        }
                        case 31: {
                          o.fetchingOptions = n.keyhole.dbroot.FetchingOptionsProto.decode(r, r.uint32())
                          break
                        }
                        case 32: {
                          o.timeMachineOptions = n.keyhole.dbroot.TimeMachineOptionsProto.decode(r, r.uint32())
                          break
                        }
                        case 33: {
                          o.csiOptions = n.keyhole.dbroot.CSIOptionsProto.decode(r, r.uint32())
                          break
                        }
                        case 34: {
                          ;(o.searchTab && o.searchTab.length) || (o.searchTab = []),
                            o.searchTab.push(n.keyhole.dbroot.SearchTabProto.decode(r, r.uint32()))
                          break
                        }
                        case 35: {
                          ;(o.cobrandInfo && o.cobrandInfo.length) || (o.cobrandInfo = []),
                            o.cobrandInfo.push(n.keyhole.dbroot.CobrandProto.decode(r, r.uint32()))
                          break
                        }
                        case 36: {
                          ;(o.validDatabase && o.validDatabase.length) || (o.validDatabase = []),
                            o.validDatabase.push(n.keyhole.dbroot.DatabaseDescriptionProto.decode(r, r.uint32()))
                          break
                        }
                        case 37: {
                          ;(o.configScript && o.configScript.length) || (o.configScript = []),
                            o.configScript.push(n.keyhole.dbroot.ConfigScriptProto.decode(r, r.uint32()))
                          break
                        }
                        case 38: {
                          o.deauthServerUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 39: {
                          o.swoopParameters = n.keyhole.dbroot.SwoopParamsProto.decode(r, r.uint32())
                          break
                        }
                        case 40: {
                          o.bbsServerInfo = n.keyhole.dbroot.PostingServerProto.decode(r, r.uint32())
                          break
                        }
                        case 41: {
                          o.dataErrorServerInfo = n.keyhole.dbroot.PostingServerProto.decode(r, r.uint32())
                          break
                        }
                        case 42: {
                          ;(o.planetaryDatabase && o.planetaryDatabase.length) || (o.planetaryDatabase = []),
                            o.planetaryDatabase.push(n.keyhole.dbroot.PlanetaryDatabaseProto.decode(r, r.uint32()))
                          break
                        }
                        case 43: {
                          o.logServer = n.keyhole.dbroot.LogServerProto.decode(r, r.uint32())
                          break
                        }
                        case 44: {
                          o.autopiaOptions = n.keyhole.dbroot.AutopiaOptionsProto.decode(r, r.uint32())
                          break
                        }
                        case 54: {
                          o.searchConfig = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.decode(r, r.uint32())
                          break
                        }
                        case 45: {
                          o.searchInfo = n.keyhole.dbroot.EndSnippetProto.SearchInfoProto.decode(r, r.uint32())
                          break
                        }
                        case 46: {
                          o.elevationServiceBaseUrl = r.string()
                          break
                        }
                        case 47: {
                          o.elevationProfileQueryDelay = r.int32()
                          break
                        }
                        case 55: {
                          o.proUpgradeUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 56: {
                          o.earthCommunityUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 57: {
                          o.googleMapsUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 58: {
                          o.sharingUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 59: {
                          o.privacyPolicyUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 60: {
                          o.doGplusUserCheck = r.bool()
                          break
                        }
                        case 61: {
                          o.rocktreeDataProto = n.keyhole.dbroot.EndSnippetProto.RockTreeDataProto.decode(r, r.uint32())
                          break
                        }
                        case 62: {
                          ;(o.filmstripConfig && o.filmstripConfig.length) || (o.filmstripConfig = []),
                            o.filmstripConfig.push(n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.decode(r, r.uint32()))
                          break
                        }
                        case 63: {
                          o.showSigninButton = r.bool()
                          break
                        }
                        case 65: {
                          o.proMeasureUpsellUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 66: {
                          o.proPrintUpsellUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 67: {
                          o.starDataProto = n.keyhole.dbroot.EndSnippetProto.StarDataProto.decode(r, r.uint32())
                          break
                        }
                        case 68: {
                          o.feedbackUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 69: {
                          o.oauth2LoginUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.model != null && r.hasOwnProperty('model')) {
                      var t = n.keyhole.dbroot.PlanetModelProto.verify(r.model)
                      if (t) return 'model.' + t
                    }
                    if (r.authServerUrl != null && r.hasOwnProperty('authServerUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.authServerUrl)
                      if (t) return 'authServerUrl.' + t
                    }
                    if (r.disableAuthentication != null && r.hasOwnProperty('disableAuthentication') && typeof r.disableAuthentication != 'boolean')
                      return 'disableAuthentication: boolean expected'
                    if (r.mfeDomains != null && r.hasOwnProperty('mfeDomains')) {
                      if (!Array.isArray(r.mfeDomains)) return 'mfeDomains: array expected'
                      for (var e = 0; e < r.mfeDomains.length; ++e) {
                        var t = n.keyhole.dbroot.MfeDomainFeaturesProto.verify(r.mfeDomains[e])
                        if (t) return 'mfeDomains.' + t
                      }
                    }
                    if (r.mfeLangParam != null && r.hasOwnProperty('mfeLangParam') && !u.isString(r.mfeLangParam))
                      return 'mfeLangParam: string expected'
                    if (r.adsUrlPatterns != null && r.hasOwnProperty('adsUrlPatterns') && !u.isString(r.adsUrlPatterns))
                      return 'adsUrlPatterns: string expected'
                    if (r.reverseGeocoderUrl != null && r.hasOwnProperty('reverseGeocoderUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.reverseGeocoderUrl)
                      if (t) return 'reverseGeocoderUrl.' + t
                    }
                    if (
                      r.reverseGeocoderProtocolVersion != null &&
                      r.hasOwnProperty('reverseGeocoderProtocolVersion') &&
                      !u.isInteger(r.reverseGeocoderProtocolVersion)
                    )
                      return 'reverseGeocoderProtocolVersion: integer expected'
                    if (
                      r.skyDatabaseIsAvailable != null &&
                      r.hasOwnProperty('skyDatabaseIsAvailable') &&
                      typeof r.skyDatabaseIsAvailable != 'boolean'
                    )
                      return 'skyDatabaseIsAvailable: boolean expected'
                    if (r.skyDatabaseUrl != null && r.hasOwnProperty('skyDatabaseUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.skyDatabaseUrl)
                      if (t) return 'skyDatabaseUrl.' + t
                    }
                    if (r.defaultWebPageIntlUrl != null && r.hasOwnProperty('defaultWebPageIntlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.defaultWebPageIntlUrl)
                      if (t) return 'defaultWebPageIntlUrl.' + t
                    }
                    if (r.numStartUpTips != null && r.hasOwnProperty('numStartUpTips') && !u.isInteger(r.numStartUpTips))
                      return 'numStartUpTips: integer expected'
                    if (r.startUpTipsUrl != null && r.hasOwnProperty('startUpTipsUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.startUpTipsUrl)
                      if (t) return 'startUpTipsUrl.' + t
                    }
                    if (r.numProStartUpTips != null && r.hasOwnProperty('numProStartUpTips') && !u.isInteger(r.numProStartUpTips))
                      return 'numProStartUpTips: integer expected'
                    if (r.proStartUpTipsUrl != null && r.hasOwnProperty('proStartUpTipsUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.proStartUpTipsUrl)
                      if (t) return 'proStartUpTipsUrl.' + t
                    }
                    if (r.startupTipsIntlUrl != null && r.hasOwnProperty('startupTipsIntlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.startupTipsIntlUrl)
                      if (t) return 'startupTipsIntlUrl.' + t
                    }
                    if (r.userGuideIntlUrl != null && r.hasOwnProperty('userGuideIntlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.userGuideIntlUrl)
                      if (t) return 'userGuideIntlUrl.' + t
                    }
                    if (r.supportCenterIntlUrl != null && r.hasOwnProperty('supportCenterIntlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.supportCenterIntlUrl)
                      if (t) return 'supportCenterIntlUrl.' + t
                    }
                    if (r.businessListingIntlUrl != null && r.hasOwnProperty('businessListingIntlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.businessListingIntlUrl)
                      if (t) return 'businessListingIntlUrl.' + t
                    }
                    if (r.supportAnswerIntlUrl != null && r.hasOwnProperty('supportAnswerIntlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.supportAnswerIntlUrl)
                      if (t) return 'supportAnswerIntlUrl.' + t
                    }
                    if (r.supportTopicIntlUrl != null && r.hasOwnProperty('supportTopicIntlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.supportTopicIntlUrl)
                      if (t) return 'supportTopicIntlUrl.' + t
                    }
                    if (r.supportRequestIntlUrl != null && r.hasOwnProperty('supportRequestIntlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.supportRequestIntlUrl)
                      if (t) return 'supportRequestIntlUrl.' + t
                    }
                    if (r.earthIntlUrl != null && r.hasOwnProperty('earthIntlUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.earthIntlUrl)
                      if (t) return 'earthIntlUrl.' + t
                    }
                    if (r.addContentUrl != null && r.hasOwnProperty('addContentUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.addContentUrl)
                      if (t) return 'addContentUrl.' + t
                    }
                    if (r.sketchupNotInstalledUrl != null && r.hasOwnProperty('sketchupNotInstalledUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.sketchupNotInstalledUrl)
                      if (t) return 'sketchupNotInstalledUrl.' + t
                    }
                    if (r.sketchupErrorUrl != null && r.hasOwnProperty('sketchupErrorUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.sketchupErrorUrl)
                      if (t) return 'sketchupErrorUrl.' + t
                    }
                    if (r.freeLicenseUrl != null && r.hasOwnProperty('freeLicenseUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.freeLicenseUrl)
                      if (t) return 'freeLicenseUrl.' + t
                    }
                    if (r.proLicenseUrl != null && r.hasOwnProperty('proLicenseUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.proLicenseUrl)
                      if (t) return 'proLicenseUrl.' + t
                    }
                    if (r.tutorialUrl != null && r.hasOwnProperty('tutorialUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.tutorialUrl)
                      if (t) return 'tutorialUrl.' + t
                    }
                    if (r.keyboardShortcutsUrl != null && r.hasOwnProperty('keyboardShortcutsUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.keyboardShortcutsUrl)
                      if (t) return 'keyboardShortcutsUrl.' + t
                    }
                    if (r.releaseNotesUrl != null && r.hasOwnProperty('releaseNotesUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.releaseNotesUrl)
                      if (t) return 'releaseNotesUrl.' + t
                    }
                    if (r.hideUserData != null && r.hasOwnProperty('hideUserData') && typeof r.hideUserData != 'boolean')
                      return 'hideUserData: boolean expected'
                    if (r.useGeLogo != null && r.hasOwnProperty('useGeLogo') && typeof r.useGeLogo != 'boolean') return 'useGeLogo: boolean expected'
                    if (r.dioramaDescriptionUrlBase != null && r.hasOwnProperty('dioramaDescriptionUrlBase')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.dioramaDescriptionUrlBase)
                      if (t) return 'dioramaDescriptionUrlBase.' + t
                    }
                    if (r.dioramaDefaultColor != null && r.hasOwnProperty('dioramaDefaultColor') && !u.isInteger(r.dioramaDefaultColor))
                      return 'dioramaDefaultColor: integer expected'
                    if (r.dioramaBlacklistUrl != null && r.hasOwnProperty('dioramaBlacklistUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.dioramaBlacklistUrl)
                      if (t) return 'dioramaBlacklistUrl.' + t
                    }
                    if (r.clientOptions != null && r.hasOwnProperty('clientOptions')) {
                      var t = n.keyhole.dbroot.ClientOptionsProto.verify(r.clientOptions)
                      if (t) return 'clientOptions.' + t
                    }
                    if (r.fetchingOptions != null && r.hasOwnProperty('fetchingOptions')) {
                      var t = n.keyhole.dbroot.FetchingOptionsProto.verify(r.fetchingOptions)
                      if (t) return 'fetchingOptions.' + t
                    }
                    if (r.timeMachineOptions != null && r.hasOwnProperty('timeMachineOptions')) {
                      var t = n.keyhole.dbroot.TimeMachineOptionsProto.verify(r.timeMachineOptions)
                      if (t) return 'timeMachineOptions.' + t
                    }
                    if (r.csiOptions != null && r.hasOwnProperty('csiOptions')) {
                      var t = n.keyhole.dbroot.CSIOptionsProto.verify(r.csiOptions)
                      if (t) return 'csiOptions.' + t
                    }
                    if (r.searchTab != null && r.hasOwnProperty('searchTab')) {
                      if (!Array.isArray(r.searchTab)) return 'searchTab: array expected'
                      for (var e = 0; e < r.searchTab.length; ++e) {
                        var t = n.keyhole.dbroot.SearchTabProto.verify(r.searchTab[e])
                        if (t) return 'searchTab.' + t
                      }
                    }
                    if (r.cobrandInfo != null && r.hasOwnProperty('cobrandInfo')) {
                      if (!Array.isArray(r.cobrandInfo)) return 'cobrandInfo: array expected'
                      for (var e = 0; e < r.cobrandInfo.length; ++e) {
                        var t = n.keyhole.dbroot.CobrandProto.verify(r.cobrandInfo[e])
                        if (t) return 'cobrandInfo.' + t
                      }
                    }
                    if (r.validDatabase != null && r.hasOwnProperty('validDatabase')) {
                      if (!Array.isArray(r.validDatabase)) return 'validDatabase: array expected'
                      for (var e = 0; e < r.validDatabase.length; ++e) {
                        var t = n.keyhole.dbroot.DatabaseDescriptionProto.verify(r.validDatabase[e])
                        if (t) return 'validDatabase.' + t
                      }
                    }
                    if (r.configScript != null && r.hasOwnProperty('configScript')) {
                      if (!Array.isArray(r.configScript)) return 'configScript: array expected'
                      for (var e = 0; e < r.configScript.length; ++e) {
                        var t = n.keyhole.dbroot.ConfigScriptProto.verify(r.configScript[e])
                        if (t) return 'configScript.' + t
                      }
                    }
                    if (r.deauthServerUrl != null && r.hasOwnProperty('deauthServerUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.deauthServerUrl)
                      if (t) return 'deauthServerUrl.' + t
                    }
                    if (r.swoopParameters != null && r.hasOwnProperty('swoopParameters')) {
                      var t = n.keyhole.dbroot.SwoopParamsProto.verify(r.swoopParameters)
                      if (t) return 'swoopParameters.' + t
                    }
                    if (r.bbsServerInfo != null && r.hasOwnProperty('bbsServerInfo')) {
                      var t = n.keyhole.dbroot.PostingServerProto.verify(r.bbsServerInfo)
                      if (t) return 'bbsServerInfo.' + t
                    }
                    if (r.dataErrorServerInfo != null && r.hasOwnProperty('dataErrorServerInfo')) {
                      var t = n.keyhole.dbroot.PostingServerProto.verify(r.dataErrorServerInfo)
                      if (t) return 'dataErrorServerInfo.' + t
                    }
                    if (r.planetaryDatabase != null && r.hasOwnProperty('planetaryDatabase')) {
                      if (!Array.isArray(r.planetaryDatabase)) return 'planetaryDatabase: array expected'
                      for (var e = 0; e < r.planetaryDatabase.length; ++e) {
                        var t = n.keyhole.dbroot.PlanetaryDatabaseProto.verify(r.planetaryDatabase[e])
                        if (t) return 'planetaryDatabase.' + t
                      }
                    }
                    if (r.logServer != null && r.hasOwnProperty('logServer')) {
                      var t = n.keyhole.dbroot.LogServerProto.verify(r.logServer)
                      if (t) return 'logServer.' + t
                    }
                    if (r.autopiaOptions != null && r.hasOwnProperty('autopiaOptions')) {
                      var t = n.keyhole.dbroot.AutopiaOptionsProto.verify(r.autopiaOptions)
                      if (t) return 'autopiaOptions.' + t
                    }
                    if (r.searchConfig != null && r.hasOwnProperty('searchConfig')) {
                      var t = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.verify(r.searchConfig)
                      if (t) return 'searchConfig.' + t
                    }
                    if (r.searchInfo != null && r.hasOwnProperty('searchInfo')) {
                      var t = n.keyhole.dbroot.EndSnippetProto.SearchInfoProto.verify(r.searchInfo)
                      if (t) return 'searchInfo.' + t
                    }
                    if (r.elevationServiceBaseUrl != null && r.hasOwnProperty('elevationServiceBaseUrl') && !u.isString(r.elevationServiceBaseUrl))
                      return 'elevationServiceBaseUrl: string expected'
                    if (
                      r.elevationProfileQueryDelay != null &&
                      r.hasOwnProperty('elevationProfileQueryDelay') &&
                      !u.isInteger(r.elevationProfileQueryDelay)
                    )
                      return 'elevationProfileQueryDelay: integer expected'
                    if (r.proUpgradeUrl != null && r.hasOwnProperty('proUpgradeUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.proUpgradeUrl)
                      if (t) return 'proUpgradeUrl.' + t
                    }
                    if (r.earthCommunityUrl != null && r.hasOwnProperty('earthCommunityUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.earthCommunityUrl)
                      if (t) return 'earthCommunityUrl.' + t
                    }
                    if (r.googleMapsUrl != null && r.hasOwnProperty('googleMapsUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.googleMapsUrl)
                      if (t) return 'googleMapsUrl.' + t
                    }
                    if (r.sharingUrl != null && r.hasOwnProperty('sharingUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.sharingUrl)
                      if (t) return 'sharingUrl.' + t
                    }
                    if (r.privacyPolicyUrl != null && r.hasOwnProperty('privacyPolicyUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.privacyPolicyUrl)
                      if (t) return 'privacyPolicyUrl.' + t
                    }
                    if (r.doGplusUserCheck != null && r.hasOwnProperty('doGplusUserCheck') && typeof r.doGplusUserCheck != 'boolean')
                      return 'doGplusUserCheck: boolean expected'
                    if (r.rocktreeDataProto != null && r.hasOwnProperty('rocktreeDataProto')) {
                      var t = n.keyhole.dbroot.EndSnippetProto.RockTreeDataProto.verify(r.rocktreeDataProto)
                      if (t) return 'rocktreeDataProto.' + t
                    }
                    if (r.filmstripConfig != null && r.hasOwnProperty('filmstripConfig')) {
                      if (!Array.isArray(r.filmstripConfig)) return 'filmstripConfig: array expected'
                      for (var e = 0; e < r.filmstripConfig.length; ++e) {
                        var t = n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.verify(r.filmstripConfig[e])
                        if (t) return 'filmstripConfig.' + t
                      }
                    }
                    if (r.showSigninButton != null && r.hasOwnProperty('showSigninButton') && typeof r.showSigninButton != 'boolean')
                      return 'showSigninButton: boolean expected'
                    if (r.proMeasureUpsellUrl != null && r.hasOwnProperty('proMeasureUpsellUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.proMeasureUpsellUrl)
                      if (t) return 'proMeasureUpsellUrl.' + t
                    }
                    if (r.proPrintUpsellUrl != null && r.hasOwnProperty('proPrintUpsellUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.proPrintUpsellUrl)
                      if (t) return 'proPrintUpsellUrl.' + t
                    }
                    if (r.starDataProto != null && r.hasOwnProperty('starDataProto')) {
                      var t = n.keyhole.dbroot.EndSnippetProto.StarDataProto.verify(r.starDataProto)
                      if (t) return 'starDataProto.' + t
                    }
                    if (r.feedbackUrl != null && r.hasOwnProperty('feedbackUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.feedbackUrl)
                      if (t) return 'feedbackUrl.' + t
                    }
                    if (r.oauth2LoginUrl != null && r.hasOwnProperty('oauth2LoginUrl')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.oauth2LoginUrl)
                      if (t) return 'oauth2LoginUrl.' + t
                    }
                    return null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.EndSnippetProto) return r
                    var t = new n.keyhole.dbroot.EndSnippetProto()
                    if (r.model != null) {
                      if (typeof r.model != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.model: object expected')
                      t.model = n.keyhole.dbroot.PlanetModelProto.fromObject(r.model)
                    }
                    if (r.authServerUrl != null) {
                      if (typeof r.authServerUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.authServerUrl: object expected')
                      t.authServerUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.authServerUrl)
                    }
                    if ((r.disableAuthentication != null && (t.disableAuthentication = !!r.disableAuthentication), r.mfeDomains)) {
                      if (!Array.isArray(r.mfeDomains)) throw TypeError('.keyhole.dbroot.EndSnippetProto.mfeDomains: array expected')
                      t.mfeDomains = []
                      for (var e = 0; e < r.mfeDomains.length; ++e) {
                        if (typeof r.mfeDomains[e] != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.mfeDomains: object expected')
                        t.mfeDomains[e] = n.keyhole.dbroot.MfeDomainFeaturesProto.fromObject(r.mfeDomains[e])
                      }
                    }
                    if (
                      (r.mfeLangParam != null && (t.mfeLangParam = String(r.mfeLangParam)),
                      r.adsUrlPatterns != null && (t.adsUrlPatterns = String(r.adsUrlPatterns)),
                      r.reverseGeocoderUrl != null)
                    ) {
                      if (typeof r.reverseGeocoderUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.reverseGeocoderUrl: object expected')
                      t.reverseGeocoderUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.reverseGeocoderUrl)
                    }
                    if (
                      (r.reverseGeocoderProtocolVersion != null && (t.reverseGeocoderProtocolVersion = r.reverseGeocoderProtocolVersion | 0),
                      r.skyDatabaseIsAvailable != null && (t.skyDatabaseIsAvailable = !!r.skyDatabaseIsAvailable),
                      r.skyDatabaseUrl != null)
                    ) {
                      if (typeof r.skyDatabaseUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.skyDatabaseUrl: object expected')
                      t.skyDatabaseUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.skyDatabaseUrl)
                    }
                    if (r.defaultWebPageIntlUrl != null) {
                      if (typeof r.defaultWebPageIntlUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.defaultWebPageIntlUrl: object expected')
                      t.defaultWebPageIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.defaultWebPageIntlUrl)
                    }
                    if ((r.numStartUpTips != null && (t.numStartUpTips = r.numStartUpTips | 0), r.startUpTipsUrl != null)) {
                      if (typeof r.startUpTipsUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.startUpTipsUrl: object expected')
                      t.startUpTipsUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.startUpTipsUrl)
                    }
                    if ((r.numProStartUpTips != null && (t.numProStartUpTips = r.numProStartUpTips | 0), r.proStartUpTipsUrl != null)) {
                      if (typeof r.proStartUpTipsUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.proStartUpTipsUrl: object expected')
                      t.proStartUpTipsUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.proStartUpTipsUrl)
                    }
                    if (r.startupTipsIntlUrl != null) {
                      if (typeof r.startupTipsIntlUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.startupTipsIntlUrl: object expected')
                      t.startupTipsIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.startupTipsIntlUrl)
                    }
                    if (r.userGuideIntlUrl != null) {
                      if (typeof r.userGuideIntlUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.userGuideIntlUrl: object expected')
                      t.userGuideIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.userGuideIntlUrl)
                    }
                    if (r.supportCenterIntlUrl != null) {
                      if (typeof r.supportCenterIntlUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.supportCenterIntlUrl: object expected')
                      t.supportCenterIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.supportCenterIntlUrl)
                    }
                    if (r.businessListingIntlUrl != null) {
                      if (typeof r.businessListingIntlUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.businessListingIntlUrl: object expected')
                      t.businessListingIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.businessListingIntlUrl)
                    }
                    if (r.supportAnswerIntlUrl != null) {
                      if (typeof r.supportAnswerIntlUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.supportAnswerIntlUrl: object expected')
                      t.supportAnswerIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.supportAnswerIntlUrl)
                    }
                    if (r.supportTopicIntlUrl != null) {
                      if (typeof r.supportTopicIntlUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.supportTopicIntlUrl: object expected')
                      t.supportTopicIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.supportTopicIntlUrl)
                    }
                    if (r.supportRequestIntlUrl != null) {
                      if (typeof r.supportRequestIntlUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.supportRequestIntlUrl: object expected')
                      t.supportRequestIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.supportRequestIntlUrl)
                    }
                    if (r.earthIntlUrl != null) {
                      if (typeof r.earthIntlUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.earthIntlUrl: object expected')
                      t.earthIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.earthIntlUrl)
                    }
                    if (r.addContentUrl != null) {
                      if (typeof r.addContentUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.addContentUrl: object expected')
                      t.addContentUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.addContentUrl)
                    }
                    if (r.sketchupNotInstalledUrl != null) {
                      if (typeof r.sketchupNotInstalledUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.sketchupNotInstalledUrl: object expected')
                      t.sketchupNotInstalledUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.sketchupNotInstalledUrl)
                    }
                    if (r.sketchupErrorUrl != null) {
                      if (typeof r.sketchupErrorUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.sketchupErrorUrl: object expected')
                      t.sketchupErrorUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.sketchupErrorUrl)
                    }
                    if (r.freeLicenseUrl != null) {
                      if (typeof r.freeLicenseUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.freeLicenseUrl: object expected')
                      t.freeLicenseUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.freeLicenseUrl)
                    }
                    if (r.proLicenseUrl != null) {
                      if (typeof r.proLicenseUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.proLicenseUrl: object expected')
                      t.proLicenseUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.proLicenseUrl)
                    }
                    if (r.tutorialUrl != null) {
                      if (typeof r.tutorialUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.tutorialUrl: object expected')
                      t.tutorialUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.tutorialUrl)
                    }
                    if (r.keyboardShortcutsUrl != null) {
                      if (typeof r.keyboardShortcutsUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.keyboardShortcutsUrl: object expected')
                      t.keyboardShortcutsUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.keyboardShortcutsUrl)
                    }
                    if (r.releaseNotesUrl != null) {
                      if (typeof r.releaseNotesUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.releaseNotesUrl: object expected')
                      t.releaseNotesUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.releaseNotesUrl)
                    }
                    if (
                      (r.hideUserData != null && (t.hideUserData = !!r.hideUserData),
                      r.useGeLogo != null && (t.useGeLogo = !!r.useGeLogo),
                      r.dioramaDescriptionUrlBase != null)
                    ) {
                      if (typeof r.dioramaDescriptionUrlBase != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.dioramaDescriptionUrlBase: object expected')
                      t.dioramaDescriptionUrlBase = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.dioramaDescriptionUrlBase)
                    }
                    if ((r.dioramaDefaultColor != null && (t.dioramaDefaultColor = r.dioramaDefaultColor >>> 0), r.dioramaBlacklistUrl != null)) {
                      if (typeof r.dioramaBlacklistUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.dioramaBlacklistUrl: object expected')
                      t.dioramaBlacklistUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.dioramaBlacklistUrl)
                    }
                    if (r.clientOptions != null) {
                      if (typeof r.clientOptions != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.clientOptions: object expected')
                      t.clientOptions = n.keyhole.dbroot.ClientOptionsProto.fromObject(r.clientOptions)
                    }
                    if (r.fetchingOptions != null) {
                      if (typeof r.fetchingOptions != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.fetchingOptions: object expected')
                      t.fetchingOptions = n.keyhole.dbroot.FetchingOptionsProto.fromObject(r.fetchingOptions)
                    }
                    if (r.timeMachineOptions != null) {
                      if (typeof r.timeMachineOptions != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.timeMachineOptions: object expected')
                      t.timeMachineOptions = n.keyhole.dbroot.TimeMachineOptionsProto.fromObject(r.timeMachineOptions)
                    }
                    if (r.csiOptions != null) {
                      if (typeof r.csiOptions != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.csiOptions: object expected')
                      t.csiOptions = n.keyhole.dbroot.CSIOptionsProto.fromObject(r.csiOptions)
                    }
                    if (r.searchTab) {
                      if (!Array.isArray(r.searchTab)) throw TypeError('.keyhole.dbroot.EndSnippetProto.searchTab: array expected')
                      t.searchTab = []
                      for (var e = 0; e < r.searchTab.length; ++e) {
                        if (typeof r.searchTab[e] != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.searchTab: object expected')
                        t.searchTab[e] = n.keyhole.dbroot.SearchTabProto.fromObject(r.searchTab[e])
                      }
                    }
                    if (r.cobrandInfo) {
                      if (!Array.isArray(r.cobrandInfo)) throw TypeError('.keyhole.dbroot.EndSnippetProto.cobrandInfo: array expected')
                      t.cobrandInfo = []
                      for (var e = 0; e < r.cobrandInfo.length; ++e) {
                        if (typeof r.cobrandInfo[e] != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.cobrandInfo: object expected')
                        t.cobrandInfo[e] = n.keyhole.dbroot.CobrandProto.fromObject(r.cobrandInfo[e])
                      }
                    }
                    if (r.validDatabase) {
                      if (!Array.isArray(r.validDatabase)) throw TypeError('.keyhole.dbroot.EndSnippetProto.validDatabase: array expected')
                      t.validDatabase = []
                      for (var e = 0; e < r.validDatabase.length; ++e) {
                        if (typeof r.validDatabase[e] != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.validDatabase: object expected')
                        t.validDatabase[e] = n.keyhole.dbroot.DatabaseDescriptionProto.fromObject(r.validDatabase[e])
                      }
                    }
                    if (r.configScript) {
                      if (!Array.isArray(r.configScript)) throw TypeError('.keyhole.dbroot.EndSnippetProto.configScript: array expected')
                      t.configScript = []
                      for (var e = 0; e < r.configScript.length; ++e) {
                        if (typeof r.configScript[e] != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.configScript: object expected')
                        t.configScript[e] = n.keyhole.dbroot.ConfigScriptProto.fromObject(r.configScript[e])
                      }
                    }
                    if (r.deauthServerUrl != null) {
                      if (typeof r.deauthServerUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.deauthServerUrl: object expected')
                      t.deauthServerUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.deauthServerUrl)
                    }
                    if (r.swoopParameters != null) {
                      if (typeof r.swoopParameters != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.swoopParameters: object expected')
                      t.swoopParameters = n.keyhole.dbroot.SwoopParamsProto.fromObject(r.swoopParameters)
                    }
                    if (r.bbsServerInfo != null) {
                      if (typeof r.bbsServerInfo != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.bbsServerInfo: object expected')
                      t.bbsServerInfo = n.keyhole.dbroot.PostingServerProto.fromObject(r.bbsServerInfo)
                    }
                    if (r.dataErrorServerInfo != null) {
                      if (typeof r.dataErrorServerInfo != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.dataErrorServerInfo: object expected')
                      t.dataErrorServerInfo = n.keyhole.dbroot.PostingServerProto.fromObject(r.dataErrorServerInfo)
                    }
                    if (r.planetaryDatabase) {
                      if (!Array.isArray(r.planetaryDatabase)) throw TypeError('.keyhole.dbroot.EndSnippetProto.planetaryDatabase: array expected')
                      t.planetaryDatabase = []
                      for (var e = 0; e < r.planetaryDatabase.length; ++e) {
                        if (typeof r.planetaryDatabase[e] != 'object')
                          throw TypeError('.keyhole.dbroot.EndSnippetProto.planetaryDatabase: object expected')
                        t.planetaryDatabase[e] = n.keyhole.dbroot.PlanetaryDatabaseProto.fromObject(r.planetaryDatabase[e])
                      }
                    }
                    if (r.logServer != null) {
                      if (typeof r.logServer != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.logServer: object expected')
                      t.logServer = n.keyhole.dbroot.LogServerProto.fromObject(r.logServer)
                    }
                    if (r.autopiaOptions != null) {
                      if (typeof r.autopiaOptions != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.autopiaOptions: object expected')
                      t.autopiaOptions = n.keyhole.dbroot.AutopiaOptionsProto.fromObject(r.autopiaOptions)
                    }
                    if (r.searchConfig != null) {
                      if (typeof r.searchConfig != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.searchConfig: object expected')
                      t.searchConfig = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.fromObject(r.searchConfig)
                    }
                    if (r.searchInfo != null) {
                      if (typeof r.searchInfo != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.searchInfo: object expected')
                      t.searchInfo = n.keyhole.dbroot.EndSnippetProto.SearchInfoProto.fromObject(r.searchInfo)
                    }
                    if (
                      (r.elevationServiceBaseUrl != null && (t.elevationServiceBaseUrl = String(r.elevationServiceBaseUrl)),
                      r.elevationProfileQueryDelay != null && (t.elevationProfileQueryDelay = r.elevationProfileQueryDelay | 0),
                      r.proUpgradeUrl != null)
                    ) {
                      if (typeof r.proUpgradeUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.proUpgradeUrl: object expected')
                      t.proUpgradeUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.proUpgradeUrl)
                    }
                    if (r.earthCommunityUrl != null) {
                      if (typeof r.earthCommunityUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.earthCommunityUrl: object expected')
                      t.earthCommunityUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.earthCommunityUrl)
                    }
                    if (r.googleMapsUrl != null) {
                      if (typeof r.googleMapsUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.googleMapsUrl: object expected')
                      t.googleMapsUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.googleMapsUrl)
                    }
                    if (r.sharingUrl != null) {
                      if (typeof r.sharingUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.sharingUrl: object expected')
                      t.sharingUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.sharingUrl)
                    }
                    if (r.privacyPolicyUrl != null) {
                      if (typeof r.privacyPolicyUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.privacyPolicyUrl: object expected')
                      t.privacyPolicyUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.privacyPolicyUrl)
                    }
                    if ((r.doGplusUserCheck != null && (t.doGplusUserCheck = !!r.doGplusUserCheck), r.rocktreeDataProto != null)) {
                      if (typeof r.rocktreeDataProto != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.rocktreeDataProto: object expected')
                      t.rocktreeDataProto = n.keyhole.dbroot.EndSnippetProto.RockTreeDataProto.fromObject(r.rocktreeDataProto)
                    }
                    if (r.filmstripConfig) {
                      if (!Array.isArray(r.filmstripConfig)) throw TypeError('.keyhole.dbroot.EndSnippetProto.filmstripConfig: array expected')
                      t.filmstripConfig = []
                      for (var e = 0; e < r.filmstripConfig.length; ++e) {
                        if (typeof r.filmstripConfig[e] != 'object')
                          throw TypeError('.keyhole.dbroot.EndSnippetProto.filmstripConfig: object expected')
                        t.filmstripConfig[e] = n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.fromObject(r.filmstripConfig[e])
                      }
                    }
                    if ((r.showSigninButton != null && (t.showSigninButton = !!r.showSigninButton), r.proMeasureUpsellUrl != null)) {
                      if (typeof r.proMeasureUpsellUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.proMeasureUpsellUrl: object expected')
                      t.proMeasureUpsellUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.proMeasureUpsellUrl)
                    }
                    if (r.proPrintUpsellUrl != null) {
                      if (typeof r.proPrintUpsellUrl != 'object')
                        throw TypeError('.keyhole.dbroot.EndSnippetProto.proPrintUpsellUrl: object expected')
                      t.proPrintUpsellUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.proPrintUpsellUrl)
                    }
                    if (r.starDataProto != null) {
                      if (typeof r.starDataProto != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.starDataProto: object expected')
                      t.starDataProto = n.keyhole.dbroot.EndSnippetProto.StarDataProto.fromObject(r.starDataProto)
                    }
                    if (r.feedbackUrl != null) {
                      if (typeof r.feedbackUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.feedbackUrl: object expected')
                      t.feedbackUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.feedbackUrl)
                    }
                    if (r.oauth2LoginUrl != null) {
                      if (typeof r.oauth2LoginUrl != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.oauth2LoginUrl: object expected')
                      t.oauth2LoginUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.oauth2LoginUrl)
                    }
                    return t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    if (
                      ((t.arrays || t.defaults) &&
                        ((e.mfeDomains = []),
                        (e.searchTab = []),
                        (e.cobrandInfo = []),
                        (e.validDatabase = []),
                        (e.configScript = []),
                        (e.planetaryDatabase = []),
                        (e.filmstripConfig = [])),
                      t.defaults &&
                        ((e.model = null),
                        (e.authServerUrl = null),
                        (e.disableAuthentication = !1),
                        (e.mfeLangParam = 'hl=$5Bhl5D'),
                        (e.adsUrlPatterns = ''),
                        (e.reverseGeocoderUrl = null),
                        (e.reverseGeocoderProtocolVersion = 3),
                        (e.skyDatabaseIsAvailable = !0),
                        (e.skyDatabaseUrl = null),
                        (e.defaultWebPageIntlUrl = null),
                        (e.numStartUpTips = 17),
                        (e.startUpTipsUrl = null),
                        (e.userGuideIntlUrl = null),
                        (e.supportCenterIntlUrl = null),
                        (e.businessListingIntlUrl = null),
                        (e.supportAnswerIntlUrl = null),
                        (e.supportTopicIntlUrl = null),
                        (e.supportRequestIntlUrl = null),
                        (e.earthIntlUrl = null),
                        (e.addContentUrl = null),
                        (e.sketchupNotInstalledUrl = null),
                        (e.sketchupErrorUrl = null),
                        (e.freeLicenseUrl = null),
                        (e.proLicenseUrl = null),
                        (e.hideUserData = !1),
                        (e.useGeLogo = !0),
                        (e.dioramaDescriptionUrlBase = null),
                        (e.dioramaDefaultColor = 4291281607),
                        (e.clientOptions = null),
                        (e.fetchingOptions = null),
                        (e.timeMachineOptions = null),
                        (e.csiOptions = null),
                        (e.deauthServerUrl = null),
                        (e.swoopParameters = null),
                        (e.bbsServerInfo = null),
                        (e.dataErrorServerInfo = null),
                        (e.logServer = null),
                        (e.autopiaOptions = null),
                        (e.searchInfo = null),
                        (e.elevationServiceBaseUrl = 'http://maps.google.com/maps/api/elevation/'),
                        (e.elevationProfileQueryDelay = 500),
                        (e.tutorialUrl = null),
                        (e.keyboardShortcutsUrl = null),
                        (e.releaseNotesUrl = null),
                        (e.numProStartUpTips = 0),
                        (e.proStartUpTipsUrl = null),
                        (e.dioramaBlacklistUrl = null),
                        (e.searchConfig = null),
                        (e.proUpgradeUrl = null),
                        (e.earthCommunityUrl = null),
                        (e.googleMapsUrl = null),
                        (e.sharingUrl = null),
                        (e.privacyPolicyUrl = null),
                        (e.doGplusUserCheck = !1),
                        (e.rocktreeDataProto = null),
                        (e.showSigninButton = !1),
                        (e.startupTipsIntlUrl = null),
                        (e.proMeasureUpsellUrl = null),
                        (e.proPrintUpsellUrl = null),
                        (e.starDataProto = null),
                        (e.feedbackUrl = null),
                        (e.oauth2LoginUrl = null)),
                      r.model != null && r.hasOwnProperty('model') && (e.model = n.keyhole.dbroot.PlanetModelProto.toObject(r.model, t)),
                      r.authServerUrl != null &&
                        r.hasOwnProperty('authServerUrl') &&
                        (e.authServerUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.authServerUrl, t)),
                      r.disableAuthentication != null &&
                        r.hasOwnProperty('disableAuthentication') &&
                        (e.disableAuthentication = r.disableAuthentication),
                      r.mfeDomains && r.mfeDomains.length)
                    ) {
                      e.mfeDomains = []
                      for (var o = 0; o < r.mfeDomains.length; ++o)
                        e.mfeDomains[o] = n.keyhole.dbroot.MfeDomainFeaturesProto.toObject(r.mfeDomains[o], t)
                    }
                    if (
                      (r.mfeLangParam != null && r.hasOwnProperty('mfeLangParam') && (e.mfeLangParam = r.mfeLangParam),
                      r.adsUrlPatterns != null && r.hasOwnProperty('adsUrlPatterns') && (e.adsUrlPatterns = r.adsUrlPatterns),
                      r.reverseGeocoderUrl != null &&
                        r.hasOwnProperty('reverseGeocoderUrl') &&
                        (e.reverseGeocoderUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.reverseGeocoderUrl, t)),
                      r.reverseGeocoderProtocolVersion != null &&
                        r.hasOwnProperty('reverseGeocoderProtocolVersion') &&
                        (e.reverseGeocoderProtocolVersion = r.reverseGeocoderProtocolVersion),
                      r.skyDatabaseIsAvailable != null &&
                        r.hasOwnProperty('skyDatabaseIsAvailable') &&
                        (e.skyDatabaseIsAvailable = r.skyDatabaseIsAvailable),
                      r.skyDatabaseUrl != null &&
                        r.hasOwnProperty('skyDatabaseUrl') &&
                        (e.skyDatabaseUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.skyDatabaseUrl, t)),
                      r.defaultWebPageIntlUrl != null &&
                        r.hasOwnProperty('defaultWebPageIntlUrl') &&
                        (e.defaultWebPageIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.defaultWebPageIntlUrl, t)),
                      r.numStartUpTips != null && r.hasOwnProperty('numStartUpTips') && (e.numStartUpTips = r.numStartUpTips),
                      r.startUpTipsUrl != null &&
                        r.hasOwnProperty('startUpTipsUrl') &&
                        (e.startUpTipsUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.startUpTipsUrl, t)),
                      r.userGuideIntlUrl != null &&
                        r.hasOwnProperty('userGuideIntlUrl') &&
                        (e.userGuideIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.userGuideIntlUrl, t)),
                      r.supportCenterIntlUrl != null &&
                        r.hasOwnProperty('supportCenterIntlUrl') &&
                        (e.supportCenterIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.supportCenterIntlUrl, t)),
                      r.businessListingIntlUrl != null &&
                        r.hasOwnProperty('businessListingIntlUrl') &&
                        (e.businessListingIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.businessListingIntlUrl, t)),
                      r.supportAnswerIntlUrl != null &&
                        r.hasOwnProperty('supportAnswerIntlUrl') &&
                        (e.supportAnswerIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.supportAnswerIntlUrl, t)),
                      r.supportTopicIntlUrl != null &&
                        r.hasOwnProperty('supportTopicIntlUrl') &&
                        (e.supportTopicIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.supportTopicIntlUrl, t)),
                      r.supportRequestIntlUrl != null &&
                        r.hasOwnProperty('supportRequestIntlUrl') &&
                        (e.supportRequestIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.supportRequestIntlUrl, t)),
                      r.earthIntlUrl != null &&
                        r.hasOwnProperty('earthIntlUrl') &&
                        (e.earthIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.earthIntlUrl, t)),
                      r.addContentUrl != null &&
                        r.hasOwnProperty('addContentUrl') &&
                        (e.addContentUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.addContentUrl, t)),
                      r.sketchupNotInstalledUrl != null &&
                        r.hasOwnProperty('sketchupNotInstalledUrl') &&
                        (e.sketchupNotInstalledUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.sketchupNotInstalledUrl, t)),
                      r.sketchupErrorUrl != null &&
                        r.hasOwnProperty('sketchupErrorUrl') &&
                        (e.sketchupErrorUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.sketchupErrorUrl, t)),
                      r.freeLicenseUrl != null &&
                        r.hasOwnProperty('freeLicenseUrl') &&
                        (e.freeLicenseUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.freeLicenseUrl, t)),
                      r.proLicenseUrl != null &&
                        r.hasOwnProperty('proLicenseUrl') &&
                        (e.proLicenseUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.proLicenseUrl, t)),
                      r.hideUserData != null && r.hasOwnProperty('hideUserData') && (e.hideUserData = r.hideUserData),
                      r.useGeLogo != null && r.hasOwnProperty('useGeLogo') && (e.useGeLogo = r.useGeLogo),
                      r.dioramaDescriptionUrlBase != null &&
                        r.hasOwnProperty('dioramaDescriptionUrlBase') &&
                        (e.dioramaDescriptionUrlBase = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.dioramaDescriptionUrlBase, t)),
                      r.dioramaDefaultColor != null && r.hasOwnProperty('dioramaDefaultColor') && (e.dioramaDefaultColor = r.dioramaDefaultColor),
                      r.clientOptions != null &&
                        r.hasOwnProperty('clientOptions') &&
                        (e.clientOptions = n.keyhole.dbroot.ClientOptionsProto.toObject(r.clientOptions, t)),
                      r.fetchingOptions != null &&
                        r.hasOwnProperty('fetchingOptions') &&
                        (e.fetchingOptions = n.keyhole.dbroot.FetchingOptionsProto.toObject(r.fetchingOptions, t)),
                      r.timeMachineOptions != null &&
                        r.hasOwnProperty('timeMachineOptions') &&
                        (e.timeMachineOptions = n.keyhole.dbroot.TimeMachineOptionsProto.toObject(r.timeMachineOptions, t)),
                      r.csiOptions != null &&
                        r.hasOwnProperty('csiOptions') &&
                        (e.csiOptions = n.keyhole.dbroot.CSIOptionsProto.toObject(r.csiOptions, t)),
                      r.searchTab && r.searchTab.length)
                    ) {
                      e.searchTab = []
                      for (var o = 0; o < r.searchTab.length; ++o) e.searchTab[o] = n.keyhole.dbroot.SearchTabProto.toObject(r.searchTab[o], t)
                    }
                    if (r.cobrandInfo && r.cobrandInfo.length) {
                      e.cobrandInfo = []
                      for (var o = 0; o < r.cobrandInfo.length; ++o) e.cobrandInfo[o] = n.keyhole.dbroot.CobrandProto.toObject(r.cobrandInfo[o], t)
                    }
                    if (r.validDatabase && r.validDatabase.length) {
                      e.validDatabase = []
                      for (var o = 0; o < r.validDatabase.length; ++o)
                        e.validDatabase[o] = n.keyhole.dbroot.DatabaseDescriptionProto.toObject(r.validDatabase[o], t)
                    }
                    if (r.configScript && r.configScript.length) {
                      e.configScript = []
                      for (var o = 0; o < r.configScript.length; ++o)
                        e.configScript[o] = n.keyhole.dbroot.ConfigScriptProto.toObject(r.configScript[o], t)
                    }
                    if (
                      (r.deauthServerUrl != null &&
                        r.hasOwnProperty('deauthServerUrl') &&
                        (e.deauthServerUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.deauthServerUrl, t)),
                      r.swoopParameters != null &&
                        r.hasOwnProperty('swoopParameters') &&
                        (e.swoopParameters = n.keyhole.dbroot.SwoopParamsProto.toObject(r.swoopParameters, t)),
                      r.bbsServerInfo != null &&
                        r.hasOwnProperty('bbsServerInfo') &&
                        (e.bbsServerInfo = n.keyhole.dbroot.PostingServerProto.toObject(r.bbsServerInfo, t)),
                      r.dataErrorServerInfo != null &&
                        r.hasOwnProperty('dataErrorServerInfo') &&
                        (e.dataErrorServerInfo = n.keyhole.dbroot.PostingServerProto.toObject(r.dataErrorServerInfo, t)),
                      r.planetaryDatabase && r.planetaryDatabase.length)
                    ) {
                      e.planetaryDatabase = []
                      for (var o = 0; o < r.planetaryDatabase.length; ++o)
                        e.planetaryDatabase[o] = n.keyhole.dbroot.PlanetaryDatabaseProto.toObject(r.planetaryDatabase[o], t)
                    }
                    if (
                      (r.logServer != null &&
                        r.hasOwnProperty('logServer') &&
                        (e.logServer = n.keyhole.dbroot.LogServerProto.toObject(r.logServer, t)),
                      r.autopiaOptions != null &&
                        r.hasOwnProperty('autopiaOptions') &&
                        (e.autopiaOptions = n.keyhole.dbroot.AutopiaOptionsProto.toObject(r.autopiaOptions, t)),
                      r.searchInfo != null &&
                        r.hasOwnProperty('searchInfo') &&
                        (e.searchInfo = n.keyhole.dbroot.EndSnippetProto.SearchInfoProto.toObject(r.searchInfo, t)),
                      r.elevationServiceBaseUrl != null &&
                        r.hasOwnProperty('elevationServiceBaseUrl') &&
                        (e.elevationServiceBaseUrl = r.elevationServiceBaseUrl),
                      r.elevationProfileQueryDelay != null &&
                        r.hasOwnProperty('elevationProfileQueryDelay') &&
                        (e.elevationProfileQueryDelay = r.elevationProfileQueryDelay),
                      r.tutorialUrl != null &&
                        r.hasOwnProperty('tutorialUrl') &&
                        (e.tutorialUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.tutorialUrl, t)),
                      r.keyboardShortcutsUrl != null &&
                        r.hasOwnProperty('keyboardShortcutsUrl') &&
                        (e.keyboardShortcutsUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.keyboardShortcutsUrl, t)),
                      r.releaseNotesUrl != null &&
                        r.hasOwnProperty('releaseNotesUrl') &&
                        (e.releaseNotesUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.releaseNotesUrl, t)),
                      r.numProStartUpTips != null && r.hasOwnProperty('numProStartUpTips') && (e.numProStartUpTips = r.numProStartUpTips),
                      r.proStartUpTipsUrl != null &&
                        r.hasOwnProperty('proStartUpTipsUrl') &&
                        (e.proStartUpTipsUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.proStartUpTipsUrl, t)),
                      r.dioramaBlacklistUrl != null &&
                        r.hasOwnProperty('dioramaBlacklistUrl') &&
                        (e.dioramaBlacklistUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.dioramaBlacklistUrl, t)),
                      r.searchConfig != null &&
                        r.hasOwnProperty('searchConfig') &&
                        (e.searchConfig = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.toObject(r.searchConfig, t)),
                      r.proUpgradeUrl != null &&
                        r.hasOwnProperty('proUpgradeUrl') &&
                        (e.proUpgradeUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.proUpgradeUrl, t)),
                      r.earthCommunityUrl != null &&
                        r.hasOwnProperty('earthCommunityUrl') &&
                        (e.earthCommunityUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.earthCommunityUrl, t)),
                      r.googleMapsUrl != null &&
                        r.hasOwnProperty('googleMapsUrl') &&
                        (e.googleMapsUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.googleMapsUrl, t)),
                      r.sharingUrl != null &&
                        r.hasOwnProperty('sharingUrl') &&
                        (e.sharingUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.sharingUrl, t)),
                      r.privacyPolicyUrl != null &&
                        r.hasOwnProperty('privacyPolicyUrl') &&
                        (e.privacyPolicyUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.privacyPolicyUrl, t)),
                      r.doGplusUserCheck != null && r.hasOwnProperty('doGplusUserCheck') && (e.doGplusUserCheck = r.doGplusUserCheck),
                      r.rocktreeDataProto != null &&
                        r.hasOwnProperty('rocktreeDataProto') &&
                        (e.rocktreeDataProto = n.keyhole.dbroot.EndSnippetProto.RockTreeDataProto.toObject(r.rocktreeDataProto, t)),
                      r.filmstripConfig && r.filmstripConfig.length)
                    ) {
                      e.filmstripConfig = []
                      for (var o = 0; o < r.filmstripConfig.length; ++o)
                        e.filmstripConfig[o] = n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.toObject(r.filmstripConfig[o], t)
                    }
                    return (
                      r.showSigninButton != null && r.hasOwnProperty('showSigninButton') && (e.showSigninButton = r.showSigninButton),
                      r.startupTipsIntlUrl != null &&
                        r.hasOwnProperty('startupTipsIntlUrl') &&
                        (e.startupTipsIntlUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.startupTipsIntlUrl, t)),
                      r.proMeasureUpsellUrl != null &&
                        r.hasOwnProperty('proMeasureUpsellUrl') &&
                        (e.proMeasureUpsellUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.proMeasureUpsellUrl, t)),
                      r.proPrintUpsellUrl != null &&
                        r.hasOwnProperty('proPrintUpsellUrl') &&
                        (e.proPrintUpsellUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.proPrintUpsellUrl, t)),
                      r.starDataProto != null &&
                        r.hasOwnProperty('starDataProto') &&
                        (e.starDataProto = n.keyhole.dbroot.EndSnippetProto.StarDataProto.toObject(r.starDataProto, t)),
                      r.feedbackUrl != null &&
                        r.hasOwnProperty('feedbackUrl') &&
                        (e.feedbackUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.feedbackUrl, t)),
                      r.oauth2LoginUrl != null &&
                        r.hasOwnProperty('oauth2LoginUrl') &&
                        (e.oauth2LoginUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.oauth2LoginUrl, t)),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.EndSnippetProto'
                  }),
                  (i.SearchConfigProto = (function () {
                    function l(r) {
                      if (((this.searchServer = []), (this.oneboxService = []), r))
                        for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.searchServer = u.emptyArray),
                      (l.prototype.oneboxService = u.emptyArray),
                      (l.prototype.kmlSearchUrl = null),
                      (l.prototype.kmlRenderUrl = null),
                      (l.prototype.searchHistoryUrl = null),
                      (l.prototype.errorPageUrl = null),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto(); t.pos < o; ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              ;(a.searchServer && a.searchServer.length) || (a.searchServer = []),
                                a.searchServer.push(n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.decode(t, t.uint32()))
                              break
                            }
                            case 2: {
                              ;(a.oneboxService && a.oneboxService.length) || (a.oneboxService = []),
                                a.oneboxService.push(n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto.decode(t, t.uint32()))
                              break
                            }
                            case 3: {
                              a.kmlSearchUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 4: {
                              a.kmlRenderUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 6: {
                              a.searchHistoryUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 5: {
                              a.errorPageUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        return a
                      }),
                      (l.verify = function (t) {
                        if (typeof t != 'object' || t === null) return 'object expected'
                        if (t.searchServer != null && t.hasOwnProperty('searchServer')) {
                          if (!Array.isArray(t.searchServer)) return 'searchServer: array expected'
                          for (var e = 0; e < t.searchServer.length; ++e) {
                            var o = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.verify(t.searchServer[e])
                            if (o) return 'searchServer.' + o
                          }
                        }
                        if (t.oneboxService != null && t.hasOwnProperty('oneboxService')) {
                          if (!Array.isArray(t.oneboxService)) return 'oneboxService: array expected'
                          for (var e = 0; e < t.oneboxService.length; ++e) {
                            var o = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto.verify(t.oneboxService[e])
                            if (o) return 'oneboxService.' + o
                          }
                        }
                        if (t.kmlSearchUrl != null && t.hasOwnProperty('kmlSearchUrl')) {
                          var o = n.keyhole.dbroot.StringIdOrValueProto.verify(t.kmlSearchUrl)
                          if (o) return 'kmlSearchUrl.' + o
                        }
                        if (t.kmlRenderUrl != null && t.hasOwnProperty('kmlRenderUrl')) {
                          var o = n.keyhole.dbroot.StringIdOrValueProto.verify(t.kmlRenderUrl)
                          if (o) return 'kmlRenderUrl.' + o
                        }
                        if (t.searchHistoryUrl != null && t.hasOwnProperty('searchHistoryUrl')) {
                          var o = n.keyhole.dbroot.StringIdOrValueProto.verify(t.searchHistoryUrl)
                          if (o) return 'searchHistoryUrl.' + o
                        }
                        if (t.errorPageUrl != null && t.hasOwnProperty('errorPageUrl')) {
                          var o = n.keyhole.dbroot.StringIdOrValueProto.verify(t.errorPageUrl)
                          if (o) return 'errorPageUrl.' + o
                        }
                        return null
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.EndSnippetProto.SearchConfigProto) return t
                        var e = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto()
                        if (t.searchServer) {
                          if (!Array.isArray(t.searchServer))
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.searchServer: array expected')
                          e.searchServer = []
                          for (var o = 0; o < t.searchServer.length; ++o) {
                            if (typeof t.searchServer[o] != 'object')
                              throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.searchServer: object expected')
                            e.searchServer[o] = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.fromObject(t.searchServer[o])
                          }
                        }
                        if (t.oneboxService) {
                          if (!Array.isArray(t.oneboxService))
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.oneboxService: array expected')
                          e.oneboxService = []
                          for (var o = 0; o < t.oneboxService.length; ++o) {
                            if (typeof t.oneboxService[o] != 'object')
                              throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.oneboxService: object expected')
                            e.oneboxService[o] = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto.fromObject(t.oneboxService[o])
                          }
                        }
                        if (t.kmlSearchUrl != null) {
                          if (typeof t.kmlSearchUrl != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.kmlSearchUrl: object expected')
                          e.kmlSearchUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.kmlSearchUrl)
                        }
                        if (t.kmlRenderUrl != null) {
                          if (typeof t.kmlRenderUrl != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.kmlRenderUrl: object expected')
                          e.kmlRenderUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.kmlRenderUrl)
                        }
                        if (t.searchHistoryUrl != null) {
                          if (typeof t.searchHistoryUrl != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.searchHistoryUrl: object expected')
                          e.searchHistoryUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.searchHistoryUrl)
                        }
                        if (t.errorPageUrl != null) {
                          if (typeof t.errorPageUrl != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.errorPageUrl: object expected')
                          e.errorPageUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.errorPageUrl)
                        }
                        return e
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        if (
                          ((e.arrays || e.defaults) && ((o.searchServer = []), (o.oneboxService = [])),
                          e.defaults && ((o.kmlSearchUrl = null), (o.kmlRenderUrl = null), (o.errorPageUrl = null), (o.searchHistoryUrl = null)),
                          t.searchServer && t.searchServer.length)
                        ) {
                          o.searchServer = []
                          for (var a = 0; a < t.searchServer.length; ++a)
                            o.searchServer[a] = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.toObject(t.searchServer[a], e)
                        }
                        if (t.oneboxService && t.oneboxService.length) {
                          o.oneboxService = []
                          for (var a = 0; a < t.oneboxService.length; ++a)
                            o.oneboxService[a] = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto.toObject(t.oneboxService[a], e)
                        }
                        return (
                          t.kmlSearchUrl != null &&
                            t.hasOwnProperty('kmlSearchUrl') &&
                            (o.kmlSearchUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.kmlSearchUrl, e)),
                          t.kmlRenderUrl != null &&
                            t.hasOwnProperty('kmlRenderUrl') &&
                            (o.kmlRenderUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.kmlRenderUrl, e)),
                          t.errorPageUrl != null &&
                            t.hasOwnProperty('errorPageUrl') &&
                            (o.errorPageUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.errorPageUrl, e)),
                          t.searchHistoryUrl != null &&
                            t.hasOwnProperty('searchHistoryUrl') &&
                            (o.searchHistoryUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.searchHistoryUrl, e)),
                          o
                        )
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.EndSnippetProto.SearchConfigProto'
                      }),
                      (l.SearchServer = (function () {
                        function r(t) {
                          if (((this.suggestion = []), (this.searchlet = []), t))
                            for (var e = Object.keys(t), o = 0; o < e.length; ++o) t[e[o]] != null && (this[e[o]] = t[e[o]])
                        }
                        return (
                          (r.prototype.name = null),
                          (r.prototype.url = null),
                          (r.prototype.type = 0),
                          (r.prototype.htmlTransformUrl = null),
                          (r.prototype.kmlTransformUrl = null),
                          (r.prototype.supplementalUi = null),
                          (r.prototype.suggestion = u.emptyArray),
                          (r.prototype.searchlet = u.emptyArray),
                          (r.prototype.requirements = null),
                          (r.prototype.suggestServer = null),
                          (r.decode = function (e, o) {
                            e instanceof f || (e = f.create(e))
                            for (
                              var a = o === void 0 ? e.len : e.pos + o, p = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer();
                              e.pos < a;

                            ) {
                              var y = e.uint32()
                              switch (y >>> 3) {
                                case 1: {
                                  p.name = n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32())
                                  break
                                }
                                case 2: {
                                  p.url = n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32())
                                  break
                                }
                                case 3: {
                                  p.type = e.int32()
                                  break
                                }
                                case 4: {
                                  p.htmlTransformUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32())
                                  break
                                }
                                case 5: {
                                  p.kmlTransformUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32())
                                  break
                                }
                                case 6: {
                                  p.supplementalUi = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi.decode(
                                    e,
                                    e.uint32()
                                  )
                                  break
                                }
                                case 9: {
                                  ;(p.suggestion && p.suggestion.length) || (p.suggestion = []),
                                    p.suggestion.push(n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32()))
                                  break
                                }
                                case 7: {
                                  ;(p.searchlet && p.searchlet.length) || (p.searchlet = []),
                                    p.searchlet.push(
                                      n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.decode(e, e.uint32())
                                    )
                                  break
                                }
                                case 8: {
                                  p.requirements = n.keyhole.dbroot.RequirementProto.decode(e, e.uint32())
                                  break
                                }
                                case 10: {
                                  p.suggestServer = n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32())
                                  break
                                }
                                default:
                                  e.skipType(y & 7)
                                  break
                              }
                            }
                            return p
                          }),
                          (r.verify = function (e) {
                            if (typeof e != 'object' || e === null) return 'object expected'
                            if (e.name != null && e.hasOwnProperty('name')) {
                              var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.name)
                              if (o) return 'name.' + o
                            }
                            if (e.url != null && e.hasOwnProperty('url')) {
                              var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.url)
                              if (o) return 'url.' + o
                            }
                            if (e.type != null && e.hasOwnProperty('type'))
                              switch (e.type) {
                                default:
                                  return 'type: enum value expected'
                                case 0:
                                case 1:
                                  break
                              }
                            if (e.htmlTransformUrl != null && e.hasOwnProperty('htmlTransformUrl')) {
                              var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.htmlTransformUrl)
                              if (o) return 'htmlTransformUrl.' + o
                            }
                            if (e.kmlTransformUrl != null && e.hasOwnProperty('kmlTransformUrl')) {
                              var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.kmlTransformUrl)
                              if (o) return 'kmlTransformUrl.' + o
                            }
                            if (e.supplementalUi != null && e.hasOwnProperty('supplementalUi')) {
                              var o = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi.verify(e.supplementalUi)
                              if (o) return 'supplementalUi.' + o
                            }
                            if (e.suggestion != null && e.hasOwnProperty('suggestion')) {
                              if (!Array.isArray(e.suggestion)) return 'suggestion: array expected'
                              for (var a = 0; a < e.suggestion.length; ++a) {
                                var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.suggestion[a])
                                if (o) return 'suggestion.' + o
                              }
                            }
                            if (e.searchlet != null && e.hasOwnProperty('searchlet')) {
                              if (!Array.isArray(e.searchlet)) return 'searchlet: array expected'
                              for (var a = 0; a < e.searchlet.length; ++a) {
                                var o = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.verify(e.searchlet[a])
                                if (o) return 'searchlet.' + o
                              }
                            }
                            if (e.requirements != null && e.hasOwnProperty('requirements')) {
                              var o = n.keyhole.dbroot.RequirementProto.verify(e.requirements)
                              if (o) return 'requirements.' + o
                            }
                            if (e.suggestServer != null && e.hasOwnProperty('suggestServer')) {
                              var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.suggestServer)
                              if (o) return 'suggestServer.' + o
                            }
                            return null
                          }),
                          (r.fromObject = function (e) {
                            if (e instanceof n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer) return e
                            var o = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer()
                            if (e.name != null) {
                              if (typeof e.name != 'object')
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.name: object expected')
                              o.name = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.name)
                            }
                            if (e.url != null) {
                              if (typeof e.url != 'object')
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.url: object expected')
                              o.url = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.url)
                            }
                            switch (e.type) {
                              case 'RESULT_TYPE_KML':
                              case 0:
                                o.type = 0
                                break
                              case 'RESULT_TYPE_XML':
                              case 1:
                                o.type = 1
                                break
                            }
                            if (e.htmlTransformUrl != null) {
                              if (typeof e.htmlTransformUrl != 'object')
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.htmlTransformUrl: object expected')
                              o.htmlTransformUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.htmlTransformUrl)
                            }
                            if (e.kmlTransformUrl != null) {
                              if (typeof e.kmlTransformUrl != 'object')
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.kmlTransformUrl: object expected')
                              o.kmlTransformUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.kmlTransformUrl)
                            }
                            if (e.supplementalUi != null) {
                              if (typeof e.supplementalUi != 'object')
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.supplementalUi: object expected')
                              o.supplementalUi = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi.fromObject(
                                e.supplementalUi
                              )
                            }
                            if (e.suggestion) {
                              if (!Array.isArray(e.suggestion))
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.suggestion: array expected')
                              o.suggestion = []
                              for (var a = 0; a < e.suggestion.length; ++a) {
                                if (typeof e.suggestion[a] != 'object')
                                  throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.suggestion: object expected')
                                o.suggestion[a] = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.suggestion[a])
                              }
                            }
                            if (e.searchlet) {
                              if (!Array.isArray(e.searchlet))
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.searchlet: array expected')
                              o.searchlet = []
                              for (var a = 0; a < e.searchlet.length; ++a) {
                                if (typeof e.searchlet[a] != 'object')
                                  throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.searchlet: object expected')
                                o.searchlet[a] = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.fromObject(
                                  e.searchlet[a]
                                )
                              }
                            }
                            if (e.requirements != null) {
                              if (typeof e.requirements != 'object')
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.requirements: object expected')
                              o.requirements = n.keyhole.dbroot.RequirementProto.fromObject(e.requirements)
                            }
                            if (e.suggestServer != null) {
                              if (typeof e.suggestServer != 'object')
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.suggestServer: object expected')
                              o.suggestServer = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.suggestServer)
                            }
                            return o
                          }),
                          (r.toObject = function (e, o) {
                            o || (o = {})
                            var a = {}
                            if (
                              ((o.arrays || o.defaults) && ((a.searchlet = []), (a.suggestion = [])),
                              o.defaults &&
                                ((a.name = null),
                                (a.url = null),
                                (a.type = o.enums === String ? 'RESULT_TYPE_KML' : 0),
                                (a.htmlTransformUrl = null),
                                (a.kmlTransformUrl = null),
                                (a.supplementalUi = null),
                                (a.requirements = null),
                                (a.suggestServer = null)),
                              e.name != null && e.hasOwnProperty('name') && (a.name = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.name, o)),
                              e.url != null && e.hasOwnProperty('url') && (a.url = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.url, o)),
                              e.type != null &&
                                e.hasOwnProperty('type') &&
                                (a.type =
                                  o.enums === String ? n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.ResultType[e.type] : e.type),
                              e.htmlTransformUrl != null &&
                                e.hasOwnProperty('htmlTransformUrl') &&
                                (a.htmlTransformUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.htmlTransformUrl, o)),
                              e.kmlTransformUrl != null &&
                                e.hasOwnProperty('kmlTransformUrl') &&
                                (a.kmlTransformUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.kmlTransformUrl, o)),
                              e.supplementalUi != null &&
                                e.hasOwnProperty('supplementalUi') &&
                                (a.supplementalUi = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi.toObject(
                                  e.supplementalUi,
                                  o
                                )),
                              e.searchlet && e.searchlet.length)
                            ) {
                              a.searchlet = []
                              for (var p = 0; p < e.searchlet.length; ++p)
                                a.searchlet[p] = n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.toObject(
                                  e.searchlet[p],
                                  o
                                )
                            }
                            if (
                              (e.requirements != null &&
                                e.hasOwnProperty('requirements') &&
                                (a.requirements = n.keyhole.dbroot.RequirementProto.toObject(e.requirements, o)),
                              e.suggestion && e.suggestion.length)
                            ) {
                              a.suggestion = []
                              for (var p = 0; p < e.suggestion.length; ++p)
                                a.suggestion[p] = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.suggestion[p], o)
                            }
                            return (
                              e.suggestServer != null &&
                                e.hasOwnProperty('suggestServer') &&
                                (a.suggestServer = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.suggestServer, o)),
                              a
                            )
                          }),
                          (r.prototype.toJSON = function () {
                            return this.constructor.toObject(this, d.util.toJSONOptions)
                          }),
                          (r.getTypeUrl = function (e) {
                            return e === void 0 && (e = 'type.googleapis.com'), e + '/keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer'
                          }),
                          (r.ResultType = (function () {
                            var t = {},
                              e = Object.create(t)
                            return (e[(t[0] = 'RESULT_TYPE_KML')] = 0), (e[(t[1] = 'RESULT_TYPE_XML')] = 1), e
                          })()),
                          (r.SupplementalUi = (function () {
                            function t(e) {
                              if (e) for (var o = Object.keys(e), a = 0; a < o.length; ++a) e[o[a]] != null && (this[o[a]] = e[o[a]])
                            }
                            return (
                              (t.prototype.url = null),
                              (t.prototype.label = null),
                              (t.prototype.height = 160),
                              (t.decode = function (o, a) {
                                o instanceof f || (o = f.create(o))
                                for (
                                  var p = a === void 0 ? o.len : o.pos + a,
                                    y = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi();
                                  o.pos < p;

                                ) {
                                  var h = o.uint32()
                                  switch (h >>> 3) {
                                    case 1: {
                                      y.url = n.keyhole.dbroot.StringIdOrValueProto.decode(o, o.uint32())
                                      break
                                    }
                                    case 2: {
                                      y.label = n.keyhole.dbroot.StringIdOrValueProto.decode(o, o.uint32())
                                      break
                                    }
                                    case 3: {
                                      y.height = o.int32()
                                      break
                                    }
                                    default:
                                      o.skipType(h & 7)
                                      break
                                  }
                                }
                                return y
                              }),
                              (t.verify = function (o) {
                                if (typeof o != 'object' || o === null) return 'object expected'
                                if (o.url != null && o.hasOwnProperty('url')) {
                                  var a = n.keyhole.dbroot.StringIdOrValueProto.verify(o.url)
                                  if (a) return 'url.' + a
                                }
                                if (o.label != null && o.hasOwnProperty('label')) {
                                  var a = n.keyhole.dbroot.StringIdOrValueProto.verify(o.label)
                                  if (a) return 'label.' + a
                                }
                                return o.height != null && o.hasOwnProperty('height') && !u.isInteger(o.height) ? 'height: integer expected' : null
                              }),
                              (t.fromObject = function (o) {
                                if (o instanceof n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi) return o
                                var a = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi()
                                if (o.url != null) {
                                  if (typeof o.url != 'object')
                                    throw TypeError(
                                      '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi.url: object expected'
                                    )
                                  a.url = n.keyhole.dbroot.StringIdOrValueProto.fromObject(o.url)
                                }
                                if (o.label != null) {
                                  if (typeof o.label != 'object')
                                    throw TypeError(
                                      '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi.label: object expected'
                                    )
                                  a.label = n.keyhole.dbroot.StringIdOrValueProto.fromObject(o.label)
                                }
                                return o.height != null && (a.height = o.height | 0), a
                              }),
                              (t.toObject = function (o, a) {
                                a || (a = {})
                                var p = {}
                                return (
                                  a.defaults && ((p.url = null), (p.label = null), (p.height = 160)),
                                  o.url != null && o.hasOwnProperty('url') && (p.url = n.keyhole.dbroot.StringIdOrValueProto.toObject(o.url, a)),
                                  o.label != null &&
                                    o.hasOwnProperty('label') &&
                                    (p.label = n.keyhole.dbroot.StringIdOrValueProto.toObject(o.label, a)),
                                  o.height != null && o.hasOwnProperty('height') && (p.height = o.height),
                                  p
                                )
                              }),
                              (t.prototype.toJSON = function () {
                                return this.constructor.toObject(this, d.util.toJSONOptions)
                              }),
                              (t.getTypeUrl = function (o) {
                                return (
                                  o === void 0 && (o = 'type.googleapis.com'),
                                  o + '/keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SupplementalUi'
                                )
                              }),
                              t
                            )
                          })()),
                          (r.SearchletProto = (function () {
                            function t(e) {
                              if (e) for (var o = Object.keys(e), a = 0; a < o.length; ++a) e[o[a]] != null && (this[o[a]] = e[o[a]])
                            }
                            return (
                              (t.prototype.url = null),
                              (t.prototype.name = null),
                              (t.prototype.requirements = null),
                              (t.decode = function (o, a) {
                                o instanceof f || (o = f.create(o))
                                for (
                                  var p = a === void 0 ? o.len : o.pos + a,
                                    y = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto();
                                  o.pos < p;

                                ) {
                                  var h = o.uint32()
                                  switch (h >>> 3) {
                                    case 1: {
                                      y.url = n.keyhole.dbroot.StringIdOrValueProto.decode(o, o.uint32())
                                      break
                                    }
                                    case 2: {
                                      y.name = n.keyhole.dbroot.StringIdOrValueProto.decode(o, o.uint32())
                                      break
                                    }
                                    case 3: {
                                      y.requirements = n.keyhole.dbroot.RequirementProto.decode(o, o.uint32())
                                      break
                                    }
                                    default:
                                      o.skipType(h & 7)
                                      break
                                  }
                                }
                                return y
                              }),
                              (t.verify = function (o) {
                                if (typeof o != 'object' || o === null) return 'object expected'
                                if (o.url != null && o.hasOwnProperty('url')) {
                                  var a = n.keyhole.dbroot.StringIdOrValueProto.verify(o.url)
                                  if (a) return 'url.' + a
                                }
                                if (o.name != null && o.hasOwnProperty('name')) {
                                  var a = n.keyhole.dbroot.StringIdOrValueProto.verify(o.name)
                                  if (a) return 'name.' + a
                                }
                                if (o.requirements != null && o.hasOwnProperty('requirements')) {
                                  var a = n.keyhole.dbroot.RequirementProto.verify(o.requirements)
                                  if (a) return 'requirements.' + a
                                }
                                return null
                              }),
                              (t.fromObject = function (o) {
                                if (o instanceof n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto) return o
                                var a = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto()
                                if (o.url != null) {
                                  if (typeof o.url != 'object')
                                    throw TypeError(
                                      '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.url: object expected'
                                    )
                                  a.url = n.keyhole.dbroot.StringIdOrValueProto.fromObject(o.url)
                                }
                                if (o.name != null) {
                                  if (typeof o.name != 'object')
                                    throw TypeError(
                                      '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.name: object expected'
                                    )
                                  a.name = n.keyhole.dbroot.StringIdOrValueProto.fromObject(o.name)
                                }
                                if (o.requirements != null) {
                                  if (typeof o.requirements != 'object')
                                    throw TypeError(
                                      '.keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto.requirements: object expected'
                                    )
                                  a.requirements = n.keyhole.dbroot.RequirementProto.fromObject(o.requirements)
                                }
                                return a
                              }),
                              (t.toObject = function (o, a) {
                                a || (a = {})
                                var p = {}
                                return (
                                  a.defaults && ((p.url = null), (p.name = null), (p.requirements = null)),
                                  o.url != null && o.hasOwnProperty('url') && (p.url = n.keyhole.dbroot.StringIdOrValueProto.toObject(o.url, a)),
                                  o.name != null && o.hasOwnProperty('name') && (p.name = n.keyhole.dbroot.StringIdOrValueProto.toObject(o.name, a)),
                                  o.requirements != null &&
                                    o.hasOwnProperty('requirements') &&
                                    (p.requirements = n.keyhole.dbroot.RequirementProto.toObject(o.requirements, a)),
                                  p
                                )
                              }),
                              (t.prototype.toJSON = function () {
                                return this.constructor.toObject(this, d.util.toJSONOptions)
                              }),
                              (t.getTypeUrl = function (o) {
                                return (
                                  o === void 0 && (o = 'type.googleapis.com'),
                                  o + '/keyhole.dbroot.EndSnippetProto.SearchConfigProto.SearchServer.SearchletProto'
                                )
                              }),
                              t
                            )
                          })()),
                          r
                        )
                      })()),
                      (l.OneboxServiceProto = (function () {
                        function r(t) {
                          if (t) for (var e = Object.keys(t), o = 0; o < e.length; ++o) t[e[o]] != null && (this[e[o]] = t[e[o]])
                        }
                        return (
                          (r.prototype.serviceUrl = null),
                          (r.prototype.requirements = null),
                          (r.decode = function (e, o) {
                            e instanceof f || (e = f.create(e))
                            for (
                              var a = o === void 0 ? e.len : e.pos + o,
                                p = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto();
                              e.pos < a;

                            ) {
                              var y = e.uint32()
                              switch (y >>> 3) {
                                case 1: {
                                  p.serviceUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32())
                                  break
                                }
                                case 2: {
                                  p.requirements = n.keyhole.dbroot.RequirementProto.decode(e, e.uint32())
                                  break
                                }
                                default:
                                  e.skipType(y & 7)
                                  break
                              }
                            }
                            return p
                          }),
                          (r.verify = function (e) {
                            if (typeof e != 'object' || e === null) return 'object expected'
                            if (e.serviceUrl != null && e.hasOwnProperty('serviceUrl')) {
                              var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.serviceUrl)
                              if (o) return 'serviceUrl.' + o
                            }
                            if (e.requirements != null && e.hasOwnProperty('requirements')) {
                              var o = n.keyhole.dbroot.RequirementProto.verify(e.requirements)
                              if (o) return 'requirements.' + o
                            }
                            return null
                          }),
                          (r.fromObject = function (e) {
                            if (e instanceof n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto) return e
                            var o = new n.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto()
                            if (e.serviceUrl != null) {
                              if (typeof e.serviceUrl != 'object')
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto.serviceUrl: object expected')
                              o.serviceUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.serviceUrl)
                            }
                            if (e.requirements != null) {
                              if (typeof e.requirements != 'object')
                                throw TypeError('.keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto.requirements: object expected')
                              o.requirements = n.keyhole.dbroot.RequirementProto.fromObject(e.requirements)
                            }
                            return o
                          }),
                          (r.toObject = function (e, o) {
                            o || (o = {})
                            var a = {}
                            return (
                              o.defaults && ((a.serviceUrl = null), (a.requirements = null)),
                              e.serviceUrl != null &&
                                e.hasOwnProperty('serviceUrl') &&
                                (a.serviceUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.serviceUrl, o)),
                              e.requirements != null &&
                                e.hasOwnProperty('requirements') &&
                                (a.requirements = n.keyhole.dbroot.RequirementProto.toObject(e.requirements, o)),
                              a
                            )
                          }),
                          (r.prototype.toJSON = function () {
                            return this.constructor.toObject(this, d.util.toJSONOptions)
                          }),
                          (r.getTypeUrl = function (e) {
                            return (
                              e === void 0 && (e = 'type.googleapis.com'), e + '/keyhole.dbroot.EndSnippetProto.SearchConfigProto.OneboxServiceProto'
                            )
                          }),
                          r
                        )
                      })()),
                      l
                    )
                  })()),
                  (i.SearchInfoProto = (function () {
                    function l(r) {
                      if (r) for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.defaultUrl = 'http://maps.google.com/maps'),
                      (l.prototype.geocodeParam = 'q'),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.EndSnippetProto.SearchInfoProto(); t.pos < o; ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              a.defaultUrl = t.string()
                              break
                            }
                            case 2: {
                              a.geocodeParam = t.string()
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        return a
                      }),
                      (l.verify = function (t) {
                        return typeof t != 'object' || t === null
                          ? 'object expected'
                          : t.defaultUrl != null && t.hasOwnProperty('defaultUrl') && !u.isString(t.defaultUrl)
                          ? 'defaultUrl: string expected'
                          : t.geocodeParam != null && t.hasOwnProperty('geocodeParam') && !u.isString(t.geocodeParam)
                          ? 'geocodeParam: string expected'
                          : null
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.EndSnippetProto.SearchInfoProto) return t
                        var e = new n.keyhole.dbroot.EndSnippetProto.SearchInfoProto()
                        return (
                          t.defaultUrl != null && (e.defaultUrl = String(t.defaultUrl)),
                          t.geocodeParam != null && (e.geocodeParam = String(t.geocodeParam)),
                          e
                        )
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        return (
                          e.defaults && ((o.defaultUrl = 'http://maps.google.com/maps'), (o.geocodeParam = 'q')),
                          t.defaultUrl != null && t.hasOwnProperty('defaultUrl') && (o.defaultUrl = t.defaultUrl),
                          t.geocodeParam != null && t.hasOwnProperty('geocodeParam') && (o.geocodeParam = t.geocodeParam),
                          o
                        )
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.EndSnippetProto.SearchInfoProto'
                      }),
                      l
                    )
                  })()),
                  (i.RockTreeDataProto = (function () {
                    function l(r) {
                      if (r) for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.url = null),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.EndSnippetProto.RockTreeDataProto(); t.pos < o; ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              a.url = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        return a
                      }),
                      (l.verify = function (t) {
                        if (typeof t != 'object' || t === null) return 'object expected'
                        if (t.url != null && t.hasOwnProperty('url')) {
                          var e = n.keyhole.dbroot.StringIdOrValueProto.verify(t.url)
                          if (e) return 'url.' + e
                        }
                        return null
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.EndSnippetProto.RockTreeDataProto) return t
                        var e = new n.keyhole.dbroot.EndSnippetProto.RockTreeDataProto()
                        if (t.url != null) {
                          if (typeof t.url != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.RockTreeDataProto.url: object expected')
                          e.url = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.url)
                        }
                        return e
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        return (
                          e.defaults && (o.url = null),
                          t.url != null && t.hasOwnProperty('url') && (o.url = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.url, e)),
                          o
                        )
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.EndSnippetProto.RockTreeDataProto'
                      }),
                      l
                    )
                  })()),
                  (i.FilmstripConfigProto = (function () {
                    function l(r) {
                      if (((this.imageryType = []), r))
                        for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.requirements = null),
                      (l.prototype.alleycatUrlTemplate = null),
                      (l.prototype.fallbackAlleycatUrlTemplate = null),
                      (l.prototype.metadataUrlTemplate = null),
                      (l.prototype.thumbnailUrlTemplate = null),
                      (l.prototype.kmlUrlTemplate = null),
                      (l.prototype.featuredToursUrl = null),
                      (l.prototype.enableViewportFallback = !1),
                      (l.prototype.viewportFallbackDistance = 0),
                      (l.prototype.imageryType = u.emptyArray),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto(); t.pos < o; ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              a.requirements = n.keyhole.dbroot.RequirementProto.decode(t, t.uint32())
                              break
                            }
                            case 2: {
                              a.alleycatUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 9: {
                              a.fallbackAlleycatUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 3: {
                              a.metadataUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 4: {
                              a.thumbnailUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 5: {
                              a.kmlUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 6: {
                              a.featuredToursUrl = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            case 7: {
                              a.enableViewportFallback = t.bool()
                              break
                            }
                            case 8: {
                              a.viewportFallbackDistance = t.uint32()
                              break
                            }
                            case 10: {
                              ;(a.imageryType && a.imageryType.length) || (a.imageryType = []),
                                a.imageryType.push(
                                  n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.decode(t, t.uint32())
                                )
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        return a
                      }),
                      (l.verify = function (t) {
                        if (typeof t != 'object' || t === null) return 'object expected'
                        if (t.requirements != null && t.hasOwnProperty('requirements')) {
                          var e = n.keyhole.dbroot.RequirementProto.verify(t.requirements)
                          if (e) return 'requirements.' + e
                        }
                        if (t.alleycatUrlTemplate != null && t.hasOwnProperty('alleycatUrlTemplate')) {
                          var e = n.keyhole.dbroot.StringIdOrValueProto.verify(t.alleycatUrlTemplate)
                          if (e) return 'alleycatUrlTemplate.' + e
                        }
                        if (t.fallbackAlleycatUrlTemplate != null && t.hasOwnProperty('fallbackAlleycatUrlTemplate')) {
                          var e = n.keyhole.dbroot.StringIdOrValueProto.verify(t.fallbackAlleycatUrlTemplate)
                          if (e) return 'fallbackAlleycatUrlTemplate.' + e
                        }
                        if (t.metadataUrlTemplate != null && t.hasOwnProperty('metadataUrlTemplate')) {
                          var e = n.keyhole.dbroot.StringIdOrValueProto.verify(t.metadataUrlTemplate)
                          if (e) return 'metadataUrlTemplate.' + e
                        }
                        if (t.thumbnailUrlTemplate != null && t.hasOwnProperty('thumbnailUrlTemplate')) {
                          var e = n.keyhole.dbroot.StringIdOrValueProto.verify(t.thumbnailUrlTemplate)
                          if (e) return 'thumbnailUrlTemplate.' + e
                        }
                        if (t.kmlUrlTemplate != null && t.hasOwnProperty('kmlUrlTemplate')) {
                          var e = n.keyhole.dbroot.StringIdOrValueProto.verify(t.kmlUrlTemplate)
                          if (e) return 'kmlUrlTemplate.' + e
                        }
                        if (t.featuredToursUrl != null && t.hasOwnProperty('featuredToursUrl')) {
                          var e = n.keyhole.dbroot.StringIdOrValueProto.verify(t.featuredToursUrl)
                          if (e) return 'featuredToursUrl.' + e
                        }
                        if (
                          t.enableViewportFallback != null &&
                          t.hasOwnProperty('enableViewportFallback') &&
                          typeof t.enableViewportFallback != 'boolean'
                        )
                          return 'enableViewportFallback: boolean expected'
                        if (
                          t.viewportFallbackDistance != null &&
                          t.hasOwnProperty('viewportFallbackDistance') &&
                          !u.isInteger(t.viewportFallbackDistance)
                        )
                          return 'viewportFallbackDistance: integer expected'
                        if (t.imageryType != null && t.hasOwnProperty('imageryType')) {
                          if (!Array.isArray(t.imageryType)) return 'imageryType: array expected'
                          for (var o = 0; o < t.imageryType.length; ++o) {
                            var e = n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.verify(t.imageryType[o])
                            if (e) return 'imageryType.' + e
                          }
                        }
                        return null
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto) return t
                        var e = new n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto()
                        if (t.requirements != null) {
                          if (typeof t.requirements != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.requirements: object expected')
                          e.requirements = n.keyhole.dbroot.RequirementProto.fromObject(t.requirements)
                        }
                        if (t.alleycatUrlTemplate != null) {
                          if (typeof t.alleycatUrlTemplate != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.alleycatUrlTemplate: object expected')
                          e.alleycatUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.alleycatUrlTemplate)
                        }
                        if (t.fallbackAlleycatUrlTemplate != null) {
                          if (typeof t.fallbackAlleycatUrlTemplate != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.fallbackAlleycatUrlTemplate: object expected')
                          e.fallbackAlleycatUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.fallbackAlleycatUrlTemplate)
                        }
                        if (t.metadataUrlTemplate != null) {
                          if (typeof t.metadataUrlTemplate != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.metadataUrlTemplate: object expected')
                          e.metadataUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.metadataUrlTemplate)
                        }
                        if (t.thumbnailUrlTemplate != null) {
                          if (typeof t.thumbnailUrlTemplate != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.thumbnailUrlTemplate: object expected')
                          e.thumbnailUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.thumbnailUrlTemplate)
                        }
                        if (t.kmlUrlTemplate != null) {
                          if (typeof t.kmlUrlTemplate != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.kmlUrlTemplate: object expected')
                          e.kmlUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.kmlUrlTemplate)
                        }
                        if (t.featuredToursUrl != null) {
                          if (typeof t.featuredToursUrl != 'object')
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.featuredToursUrl: object expected')
                          e.featuredToursUrl = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.featuredToursUrl)
                        }
                        if (
                          (t.enableViewportFallback != null && (e.enableViewportFallback = !!t.enableViewportFallback),
                          t.viewportFallbackDistance != null && (e.viewportFallbackDistance = t.viewportFallbackDistance >>> 0),
                          t.imageryType)
                        ) {
                          if (!Array.isArray(t.imageryType))
                            throw TypeError('.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.imageryType: array expected')
                          e.imageryType = []
                          for (var o = 0; o < t.imageryType.length; ++o) {
                            if (typeof t.imageryType[o] != 'object')
                              throw TypeError('.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.imageryType: object expected')
                            e.imageryType[o] = n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.fromObject(
                              t.imageryType[o]
                            )
                          }
                        }
                        return e
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        if (
                          ((e.arrays || e.defaults) && (o.imageryType = []),
                          e.defaults &&
                            ((o.requirements = null),
                            (o.alleycatUrlTemplate = null),
                            (o.metadataUrlTemplate = null),
                            (o.thumbnailUrlTemplate = null),
                            (o.kmlUrlTemplate = null),
                            (o.featuredToursUrl = null),
                            (o.enableViewportFallback = !1),
                            (o.viewportFallbackDistance = 0),
                            (o.fallbackAlleycatUrlTemplate = null)),
                          t.requirements != null &&
                            t.hasOwnProperty('requirements') &&
                            (o.requirements = n.keyhole.dbroot.RequirementProto.toObject(t.requirements, e)),
                          t.alleycatUrlTemplate != null &&
                            t.hasOwnProperty('alleycatUrlTemplate') &&
                            (o.alleycatUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.alleycatUrlTemplate, e)),
                          t.metadataUrlTemplate != null &&
                            t.hasOwnProperty('metadataUrlTemplate') &&
                            (o.metadataUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.metadataUrlTemplate, e)),
                          t.thumbnailUrlTemplate != null &&
                            t.hasOwnProperty('thumbnailUrlTemplate') &&
                            (o.thumbnailUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.thumbnailUrlTemplate, e)),
                          t.kmlUrlTemplate != null &&
                            t.hasOwnProperty('kmlUrlTemplate') &&
                            (o.kmlUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.kmlUrlTemplate, e)),
                          t.featuredToursUrl != null &&
                            t.hasOwnProperty('featuredToursUrl') &&
                            (o.featuredToursUrl = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.featuredToursUrl, e)),
                          t.enableViewportFallback != null &&
                            t.hasOwnProperty('enableViewportFallback') &&
                            (o.enableViewportFallback = t.enableViewportFallback),
                          t.viewportFallbackDistance != null &&
                            t.hasOwnProperty('viewportFallbackDistance') &&
                            (o.viewportFallbackDistance = t.viewportFallbackDistance),
                          t.fallbackAlleycatUrlTemplate != null &&
                            t.hasOwnProperty('fallbackAlleycatUrlTemplate') &&
                            (o.fallbackAlleycatUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.fallbackAlleycatUrlTemplate, e)),
                          t.imageryType && t.imageryType.length)
                        ) {
                          o.imageryType = []
                          for (var a = 0; a < t.imageryType.length; ++a)
                            o.imageryType[a] = n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.toObject(
                              t.imageryType[a],
                              e
                            )
                        }
                        return o
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.EndSnippetProto.FilmstripConfigProto'
                      }),
                      (l.AlleycatImageryTypeProto = (function () {
                        function r(t) {
                          if (t) for (var e = Object.keys(t), o = 0; o < e.length; ++o) t[e[o]] != null && (this[e[o]] = t[e[o]])
                        }
                        return (
                          (r.prototype.imageryTypeId = 0),
                          (r.prototype.imageryTypeLabel = ''),
                          (r.prototype.metadataUrlTemplate = null),
                          (r.prototype.thumbnailUrlTemplate = null),
                          (r.prototype.kmlUrlTemplate = null),
                          (r.decode = function (e, o) {
                            e instanceof f || (e = f.create(e))
                            for (
                              var a = o === void 0 ? e.len : e.pos + o,
                                p = new n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto();
                              e.pos < a;

                            ) {
                              var y = e.uint32()
                              switch (y >>> 3) {
                                case 1: {
                                  p.imageryTypeId = e.int32()
                                  break
                                }
                                case 2: {
                                  p.imageryTypeLabel = e.string()
                                  break
                                }
                                case 3: {
                                  p.metadataUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32())
                                  break
                                }
                                case 4: {
                                  p.thumbnailUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32())
                                  break
                                }
                                case 5: {
                                  p.kmlUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.decode(e, e.uint32())
                                  break
                                }
                                default:
                                  e.skipType(y & 7)
                                  break
                              }
                            }
                            return p
                          }),
                          (r.verify = function (e) {
                            if (typeof e != 'object' || e === null) return 'object expected'
                            if (e.imageryTypeId != null && e.hasOwnProperty('imageryTypeId') && !u.isInteger(e.imageryTypeId))
                              return 'imageryTypeId: integer expected'
                            if (e.imageryTypeLabel != null && e.hasOwnProperty('imageryTypeLabel') && !u.isString(e.imageryTypeLabel))
                              return 'imageryTypeLabel: string expected'
                            if (e.metadataUrlTemplate != null && e.hasOwnProperty('metadataUrlTemplate')) {
                              var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.metadataUrlTemplate)
                              if (o) return 'metadataUrlTemplate.' + o
                            }
                            if (e.thumbnailUrlTemplate != null && e.hasOwnProperty('thumbnailUrlTemplate')) {
                              var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.thumbnailUrlTemplate)
                              if (o) return 'thumbnailUrlTemplate.' + o
                            }
                            if (e.kmlUrlTemplate != null && e.hasOwnProperty('kmlUrlTemplate')) {
                              var o = n.keyhole.dbroot.StringIdOrValueProto.verify(e.kmlUrlTemplate)
                              if (o) return 'kmlUrlTemplate.' + o
                            }
                            return null
                          }),
                          (r.fromObject = function (e) {
                            if (e instanceof n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto) return e
                            var o = new n.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto()
                            if (
                              (e.imageryTypeId != null && (o.imageryTypeId = e.imageryTypeId | 0),
                              e.imageryTypeLabel != null && (o.imageryTypeLabel = String(e.imageryTypeLabel)),
                              e.metadataUrlTemplate != null)
                            ) {
                              if (typeof e.metadataUrlTemplate != 'object')
                                throw TypeError(
                                  '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.metadataUrlTemplate: object expected'
                                )
                              o.metadataUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.metadataUrlTemplate)
                            }
                            if (e.thumbnailUrlTemplate != null) {
                              if (typeof e.thumbnailUrlTemplate != 'object')
                                throw TypeError(
                                  '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.thumbnailUrlTemplate: object expected'
                                )
                              o.thumbnailUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.thumbnailUrlTemplate)
                            }
                            if (e.kmlUrlTemplate != null) {
                              if (typeof e.kmlUrlTemplate != 'object')
                                throw TypeError(
                                  '.keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto.kmlUrlTemplate: object expected'
                                )
                              o.kmlUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.fromObject(e.kmlUrlTemplate)
                            }
                            return o
                          }),
                          (r.toObject = function (e, o) {
                            o || (o = {})
                            var a = {}
                            return (
                              o.defaults &&
                                ((a.imageryTypeId = 0),
                                (a.imageryTypeLabel = ''),
                                (a.metadataUrlTemplate = null),
                                (a.thumbnailUrlTemplate = null),
                                (a.kmlUrlTemplate = null)),
                              e.imageryTypeId != null && e.hasOwnProperty('imageryTypeId') && (a.imageryTypeId = e.imageryTypeId),
                              e.imageryTypeLabel != null && e.hasOwnProperty('imageryTypeLabel') && (a.imageryTypeLabel = e.imageryTypeLabel),
                              e.metadataUrlTemplate != null &&
                                e.hasOwnProperty('metadataUrlTemplate') &&
                                (a.metadataUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.metadataUrlTemplate, o)),
                              e.thumbnailUrlTemplate != null &&
                                e.hasOwnProperty('thumbnailUrlTemplate') &&
                                (a.thumbnailUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.thumbnailUrlTemplate, o)),
                              e.kmlUrlTemplate != null &&
                                e.hasOwnProperty('kmlUrlTemplate') &&
                                (a.kmlUrlTemplate = n.keyhole.dbroot.StringIdOrValueProto.toObject(e.kmlUrlTemplate, o)),
                              a
                            )
                          }),
                          (r.prototype.toJSON = function () {
                            return this.constructor.toObject(this, d.util.toJSONOptions)
                          }),
                          (r.getTypeUrl = function (e) {
                            return (
                              e === void 0 && (e = 'type.googleapis.com'),
                              e + '/keyhole.dbroot.EndSnippetProto.FilmstripConfigProto.AlleycatImageryTypeProto'
                            )
                          }),
                          r
                        )
                      })()),
                      l
                    )
                  })()),
                  (i.StarDataProto = (function () {
                    function l(r) {
                      if (r) for (var t = Object.keys(r), e = 0; e < t.length; ++e) r[t[e]] != null && (this[t[e]] = r[t[e]])
                    }
                    return (
                      (l.prototype.url = null),
                      (l.decode = function (t, e) {
                        t instanceof f || (t = f.create(t))
                        for (var o = e === void 0 ? t.len : t.pos + e, a = new n.keyhole.dbroot.EndSnippetProto.StarDataProto(); t.pos < o; ) {
                          var p = t.uint32()
                          switch (p >>> 3) {
                            case 1: {
                              a.url = n.keyhole.dbroot.StringIdOrValueProto.decode(t, t.uint32())
                              break
                            }
                            default:
                              t.skipType(p & 7)
                              break
                          }
                        }
                        return a
                      }),
                      (l.verify = function (t) {
                        if (typeof t != 'object' || t === null) return 'object expected'
                        if (t.url != null && t.hasOwnProperty('url')) {
                          var e = n.keyhole.dbroot.StringIdOrValueProto.verify(t.url)
                          if (e) return 'url.' + e
                        }
                        return null
                      }),
                      (l.fromObject = function (t) {
                        if (t instanceof n.keyhole.dbroot.EndSnippetProto.StarDataProto) return t
                        var e = new n.keyhole.dbroot.EndSnippetProto.StarDataProto()
                        if (t.url != null) {
                          if (typeof t.url != 'object') throw TypeError('.keyhole.dbroot.EndSnippetProto.StarDataProto.url: object expected')
                          e.url = n.keyhole.dbroot.StringIdOrValueProto.fromObject(t.url)
                        }
                        return e
                      }),
                      (l.toObject = function (t, e) {
                        e || (e = {})
                        var o = {}
                        return (
                          e.defaults && (o.url = null),
                          t.url != null && t.hasOwnProperty('url') && (o.url = n.keyhole.dbroot.StringIdOrValueProto.toObject(t.url, e)),
                          o
                        )
                      }),
                      (l.prototype.toJSON = function () {
                        return this.constructor.toObject(this, d.util.toJSONOptions)
                      }),
                      (l.getTypeUrl = function (t) {
                        return t === void 0 && (t = 'type.googleapis.com'), t + '/keyhole.dbroot.EndSnippetProto.StarDataProto'
                      }),
                      l
                    )
                  })()),
                  i
                )
              })()),
              (c.DbRootRefProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.url = ''),
                  (i.prototype.isCritical = !1),
                  (i.prototype.requirements = null),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.DbRootRefProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 2: {
                          o.url = r.string()
                          break
                        }
                        case 1: {
                          o.isCritical = r.bool()
                          break
                        }
                        case 3: {
                          o.requirements = n.keyhole.dbroot.RequirementProto.decode(r, r.uint32())
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('url')) throw u.ProtocolError("missing required 'url'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (!u.isString(r.url)) return 'url: string expected'
                    if (r.isCritical != null && r.hasOwnProperty('isCritical') && typeof r.isCritical != 'boolean')
                      return 'isCritical: boolean expected'
                    if (r.requirements != null && r.hasOwnProperty('requirements')) {
                      var t = n.keyhole.dbroot.RequirementProto.verify(r.requirements)
                      if (t) return 'requirements.' + t
                    }
                    return null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.DbRootRefProto) return r
                    var t = new n.keyhole.dbroot.DbRootRefProto()
                    if ((r.url != null && (t.url = String(r.url)), r.isCritical != null && (t.isCritical = !!r.isCritical), r.requirements != null)) {
                      if (typeof r.requirements != 'object') throw TypeError('.keyhole.dbroot.DbRootRefProto.requirements: object expected')
                      t.requirements = n.keyhole.dbroot.RequirementProto.fromObject(r.requirements)
                    }
                    return t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && ((e.isCritical = !1), (e.url = ''), (e.requirements = null)),
                      r.isCritical != null && r.hasOwnProperty('isCritical') && (e.isCritical = r.isCritical),
                      r.url != null && r.hasOwnProperty('url') && (e.url = r.url),
                      r.requirements != null &&
                        r.hasOwnProperty('requirements') &&
                        (e.requirements = n.keyhole.dbroot.RequirementProto.toObject(r.requirements, t)),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.DbRootRefProto'
                  }),
                  i
                )
              })()),
              (c.DatabaseVersionProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.quadtreeVersion = 0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.DatabaseVersionProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.quadtreeVersion = r.uint32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    if (!o.hasOwnProperty('quadtreeVersion')) throw u.ProtocolError("missing required 'quadtreeVersion'", { instance: o })
                    return o
                  }),
                  (i.verify = function (r) {
                    return typeof r != 'object' || r === null
                      ? 'object expected'
                      : u.isInteger(r.quadtreeVersion)
                      ? null
                      : 'quadtreeVersion: integer expected'
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.DatabaseVersionProto) return r
                    var t = new n.keyhole.dbroot.DatabaseVersionProto()
                    return r.quadtreeVersion != null && (t.quadtreeVersion = r.quadtreeVersion >>> 0), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults && (e.quadtreeVersion = 0),
                      r.quadtreeVersion != null && r.hasOwnProperty('quadtreeVersion') && (e.quadtreeVersion = r.quadtreeVersion),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.DatabaseVersionProto'
                  }),
                  i
                )
              })()),
              (c.DbRootProto = (function () {
                function i(l) {
                  if (
                    ((this.providerInfo = []),
                    (this.nestedFeature = []),
                    (this.styleAttribute = []),
                    (this.styleMap = []),
                    (this.translationEntry = []),
                    (this.dbrootReference = []),
                    l)
                  )
                    for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.databaseName = null),
                  (i.prototype.imageryPresent = !0),
                  (i.prototype.protoImagery = !1),
                  (i.prototype.terrainPresent = !1),
                  (i.prototype.providerInfo = u.emptyArray),
                  (i.prototype.nestedFeature = u.emptyArray),
                  (i.prototype.styleAttribute = u.emptyArray),
                  (i.prototype.styleMap = u.emptyArray),
                  (i.prototype.endSnippet = null),
                  (i.prototype.translationEntry = u.emptyArray),
                  (i.prototype.language = 'en'),
                  (i.prototype.version = 5),
                  (i.prototype.dbrootReference = u.emptyArray),
                  (i.prototype.databaseVersion = null),
                  (i.prototype.refreshTimeout = 0),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.DbRootProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 15: {
                          o.databaseName = n.keyhole.dbroot.StringIdOrValueProto.decode(r, r.uint32())
                          break
                        }
                        case 1: {
                          o.imageryPresent = r.bool()
                          break
                        }
                        case 14: {
                          o.protoImagery = r.bool()
                          break
                        }
                        case 2: {
                          o.terrainPresent = r.bool()
                          break
                        }
                        case 3: {
                          ;(o.providerInfo && o.providerInfo.length) || (o.providerInfo = []),
                            o.providerInfo.push(n.keyhole.dbroot.ProviderInfoProto.decode(r, r.uint32()))
                          break
                        }
                        case 4: {
                          ;(o.nestedFeature && o.nestedFeature.length) || (o.nestedFeature = []),
                            o.nestedFeature.push(n.keyhole.dbroot.NestedFeatureProto.decode(r, r.uint32()))
                          break
                        }
                        case 5: {
                          ;(o.styleAttribute && o.styleAttribute.length) || (o.styleAttribute = []),
                            o.styleAttribute.push(n.keyhole.dbroot.StyleAttributeProto.decode(r, r.uint32()))
                          break
                        }
                        case 6: {
                          ;(o.styleMap && o.styleMap.length) || (o.styleMap = []),
                            o.styleMap.push(n.keyhole.dbroot.StyleMapProto.decode(r, r.uint32()))
                          break
                        }
                        case 7: {
                          o.endSnippet = n.keyhole.dbroot.EndSnippetProto.decode(r, r.uint32())
                          break
                        }
                        case 8: {
                          ;(o.translationEntry && o.translationEntry.length) || (o.translationEntry = []),
                            o.translationEntry.push(n.keyhole.dbroot.StringEntryProto.decode(r, r.uint32()))
                          break
                        }
                        case 9: {
                          o.language = r.string()
                          break
                        }
                        case 10: {
                          o.version = r.int32()
                          break
                        }
                        case 11: {
                          ;(o.dbrootReference && o.dbrootReference.length) || (o.dbrootReference = []),
                            o.dbrootReference.push(n.keyhole.dbroot.DbRootRefProto.decode(r, r.uint32()))
                          break
                        }
                        case 13: {
                          o.databaseVersion = n.keyhole.dbroot.DatabaseVersionProto.decode(r, r.uint32())
                          break
                        }
                        case 16: {
                          o.refreshTimeout = r.int32()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.databaseName != null && r.hasOwnProperty('databaseName')) {
                      var t = n.keyhole.dbroot.StringIdOrValueProto.verify(r.databaseName)
                      if (t) return 'databaseName.' + t
                    }
                    if (r.imageryPresent != null && r.hasOwnProperty('imageryPresent') && typeof r.imageryPresent != 'boolean')
                      return 'imageryPresent: boolean expected'
                    if (r.protoImagery != null && r.hasOwnProperty('protoImagery') && typeof r.protoImagery != 'boolean')
                      return 'protoImagery: boolean expected'
                    if (r.terrainPresent != null && r.hasOwnProperty('terrainPresent') && typeof r.terrainPresent != 'boolean')
                      return 'terrainPresent: boolean expected'
                    if (r.providerInfo != null && r.hasOwnProperty('providerInfo')) {
                      if (!Array.isArray(r.providerInfo)) return 'providerInfo: array expected'
                      for (var e = 0; e < r.providerInfo.length; ++e) {
                        var t = n.keyhole.dbroot.ProviderInfoProto.verify(r.providerInfo[e])
                        if (t) return 'providerInfo.' + t
                      }
                    }
                    if (r.nestedFeature != null && r.hasOwnProperty('nestedFeature')) {
                      if (!Array.isArray(r.nestedFeature)) return 'nestedFeature: array expected'
                      for (var e = 0; e < r.nestedFeature.length; ++e) {
                        var t = n.keyhole.dbroot.NestedFeatureProto.verify(r.nestedFeature[e])
                        if (t) return 'nestedFeature.' + t
                      }
                    }
                    if (r.styleAttribute != null && r.hasOwnProperty('styleAttribute')) {
                      if (!Array.isArray(r.styleAttribute)) return 'styleAttribute: array expected'
                      for (var e = 0; e < r.styleAttribute.length; ++e) {
                        var t = n.keyhole.dbroot.StyleAttributeProto.verify(r.styleAttribute[e])
                        if (t) return 'styleAttribute.' + t
                      }
                    }
                    if (r.styleMap != null && r.hasOwnProperty('styleMap')) {
                      if (!Array.isArray(r.styleMap)) return 'styleMap: array expected'
                      for (var e = 0; e < r.styleMap.length; ++e) {
                        var t = n.keyhole.dbroot.StyleMapProto.verify(r.styleMap[e])
                        if (t) return 'styleMap.' + t
                      }
                    }
                    if (r.endSnippet != null && r.hasOwnProperty('endSnippet')) {
                      var t = n.keyhole.dbroot.EndSnippetProto.verify(r.endSnippet)
                      if (t) return 'endSnippet.' + t
                    }
                    if (r.translationEntry != null && r.hasOwnProperty('translationEntry')) {
                      if (!Array.isArray(r.translationEntry)) return 'translationEntry: array expected'
                      for (var e = 0; e < r.translationEntry.length; ++e) {
                        var t = n.keyhole.dbroot.StringEntryProto.verify(r.translationEntry[e])
                        if (t) return 'translationEntry.' + t
                      }
                    }
                    if (r.language != null && r.hasOwnProperty('language') && !u.isString(r.language)) return 'language: string expected'
                    if (r.version != null && r.hasOwnProperty('version') && !u.isInteger(r.version)) return 'version: integer expected'
                    if (r.dbrootReference != null && r.hasOwnProperty('dbrootReference')) {
                      if (!Array.isArray(r.dbrootReference)) return 'dbrootReference: array expected'
                      for (var e = 0; e < r.dbrootReference.length; ++e) {
                        var t = n.keyhole.dbroot.DbRootRefProto.verify(r.dbrootReference[e])
                        if (t) return 'dbrootReference.' + t
                      }
                    }
                    if (r.databaseVersion != null && r.hasOwnProperty('databaseVersion')) {
                      var t = n.keyhole.dbroot.DatabaseVersionProto.verify(r.databaseVersion)
                      if (t) return 'databaseVersion.' + t
                    }
                    return r.refreshTimeout != null && r.hasOwnProperty('refreshTimeout') && !u.isInteger(r.refreshTimeout)
                      ? 'refreshTimeout: integer expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.DbRootProto) return r
                    var t = new n.keyhole.dbroot.DbRootProto()
                    if (r.databaseName != null) {
                      if (typeof r.databaseName != 'object') throw TypeError('.keyhole.dbroot.DbRootProto.databaseName: object expected')
                      t.databaseName = n.keyhole.dbroot.StringIdOrValueProto.fromObject(r.databaseName)
                    }
                    if (
                      (r.imageryPresent != null && (t.imageryPresent = !!r.imageryPresent),
                      r.protoImagery != null && (t.protoImagery = !!r.protoImagery),
                      r.terrainPresent != null && (t.terrainPresent = !!r.terrainPresent),
                      r.providerInfo)
                    ) {
                      if (!Array.isArray(r.providerInfo)) throw TypeError('.keyhole.dbroot.DbRootProto.providerInfo: array expected')
                      t.providerInfo = []
                      for (var e = 0; e < r.providerInfo.length; ++e) {
                        if (typeof r.providerInfo[e] != 'object') throw TypeError('.keyhole.dbroot.DbRootProto.providerInfo: object expected')
                        t.providerInfo[e] = n.keyhole.dbroot.ProviderInfoProto.fromObject(r.providerInfo[e])
                      }
                    }
                    if (r.nestedFeature) {
                      if (!Array.isArray(r.nestedFeature)) throw TypeError('.keyhole.dbroot.DbRootProto.nestedFeature: array expected')
                      t.nestedFeature = []
                      for (var e = 0; e < r.nestedFeature.length; ++e) {
                        if (typeof r.nestedFeature[e] != 'object') throw TypeError('.keyhole.dbroot.DbRootProto.nestedFeature: object expected')
                        t.nestedFeature[e] = n.keyhole.dbroot.NestedFeatureProto.fromObject(r.nestedFeature[e])
                      }
                    }
                    if (r.styleAttribute) {
                      if (!Array.isArray(r.styleAttribute)) throw TypeError('.keyhole.dbroot.DbRootProto.styleAttribute: array expected')
                      t.styleAttribute = []
                      for (var e = 0; e < r.styleAttribute.length; ++e) {
                        if (typeof r.styleAttribute[e] != 'object') throw TypeError('.keyhole.dbroot.DbRootProto.styleAttribute: object expected')
                        t.styleAttribute[e] = n.keyhole.dbroot.StyleAttributeProto.fromObject(r.styleAttribute[e])
                      }
                    }
                    if (r.styleMap) {
                      if (!Array.isArray(r.styleMap)) throw TypeError('.keyhole.dbroot.DbRootProto.styleMap: array expected')
                      t.styleMap = []
                      for (var e = 0; e < r.styleMap.length; ++e) {
                        if (typeof r.styleMap[e] != 'object') throw TypeError('.keyhole.dbroot.DbRootProto.styleMap: object expected')
                        t.styleMap[e] = n.keyhole.dbroot.StyleMapProto.fromObject(r.styleMap[e])
                      }
                    }
                    if (r.endSnippet != null) {
                      if (typeof r.endSnippet != 'object') throw TypeError('.keyhole.dbroot.DbRootProto.endSnippet: object expected')
                      t.endSnippet = n.keyhole.dbroot.EndSnippetProto.fromObject(r.endSnippet)
                    }
                    if (r.translationEntry) {
                      if (!Array.isArray(r.translationEntry)) throw TypeError('.keyhole.dbroot.DbRootProto.translationEntry: array expected')
                      t.translationEntry = []
                      for (var e = 0; e < r.translationEntry.length; ++e) {
                        if (typeof r.translationEntry[e] != 'object') throw TypeError('.keyhole.dbroot.DbRootProto.translationEntry: object expected')
                        t.translationEntry[e] = n.keyhole.dbroot.StringEntryProto.fromObject(r.translationEntry[e])
                      }
                    }
                    if (
                      (r.language != null && (t.language = String(r.language)), r.version != null && (t.version = r.version | 0), r.dbrootReference)
                    ) {
                      if (!Array.isArray(r.dbrootReference)) throw TypeError('.keyhole.dbroot.DbRootProto.dbrootReference: array expected')
                      t.dbrootReference = []
                      for (var e = 0; e < r.dbrootReference.length; ++e) {
                        if (typeof r.dbrootReference[e] != 'object') throw TypeError('.keyhole.dbroot.DbRootProto.dbrootReference: object expected')
                        t.dbrootReference[e] = n.keyhole.dbroot.DbRootRefProto.fromObject(r.dbrootReference[e])
                      }
                    }
                    if (r.databaseVersion != null) {
                      if (typeof r.databaseVersion != 'object') throw TypeError('.keyhole.dbroot.DbRootProto.databaseVersion: object expected')
                      t.databaseVersion = n.keyhole.dbroot.DatabaseVersionProto.fromObject(r.databaseVersion)
                    }
                    return r.refreshTimeout != null && (t.refreshTimeout = r.refreshTimeout | 0), t
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    if (
                      ((t.arrays || t.defaults) &&
                        ((e.providerInfo = []),
                        (e.nestedFeature = []),
                        (e.styleAttribute = []),
                        (e.styleMap = []),
                        (e.translationEntry = []),
                        (e.dbrootReference = [])),
                      t.defaults &&
                        ((e.imageryPresent = !0),
                        (e.terrainPresent = !1),
                        (e.endSnippet = null),
                        (e.language = 'en'),
                        (e.version = 5),
                        (e.databaseVersion = null),
                        (e.protoImagery = !1),
                        (e.databaseName = null),
                        (e.refreshTimeout = 0)),
                      r.imageryPresent != null && r.hasOwnProperty('imageryPresent') && (e.imageryPresent = r.imageryPresent),
                      r.terrainPresent != null && r.hasOwnProperty('terrainPresent') && (e.terrainPresent = r.terrainPresent),
                      r.providerInfo && r.providerInfo.length)
                    ) {
                      e.providerInfo = []
                      for (var o = 0; o < r.providerInfo.length; ++o)
                        e.providerInfo[o] = n.keyhole.dbroot.ProviderInfoProto.toObject(r.providerInfo[o], t)
                    }
                    if (r.nestedFeature && r.nestedFeature.length) {
                      e.nestedFeature = []
                      for (var o = 0; o < r.nestedFeature.length; ++o)
                        e.nestedFeature[o] = n.keyhole.dbroot.NestedFeatureProto.toObject(r.nestedFeature[o], t)
                    }
                    if (r.styleAttribute && r.styleAttribute.length) {
                      e.styleAttribute = []
                      for (var o = 0; o < r.styleAttribute.length; ++o)
                        e.styleAttribute[o] = n.keyhole.dbroot.StyleAttributeProto.toObject(r.styleAttribute[o], t)
                    }
                    if (r.styleMap && r.styleMap.length) {
                      e.styleMap = []
                      for (var o = 0; o < r.styleMap.length; ++o) e.styleMap[o] = n.keyhole.dbroot.StyleMapProto.toObject(r.styleMap[o], t)
                    }
                    if (
                      (r.endSnippet != null &&
                        r.hasOwnProperty('endSnippet') &&
                        (e.endSnippet = n.keyhole.dbroot.EndSnippetProto.toObject(r.endSnippet, t)),
                      r.translationEntry && r.translationEntry.length)
                    ) {
                      e.translationEntry = []
                      for (var o = 0; o < r.translationEntry.length; ++o)
                        e.translationEntry[o] = n.keyhole.dbroot.StringEntryProto.toObject(r.translationEntry[o], t)
                    }
                    if (
                      (r.language != null && r.hasOwnProperty('language') && (e.language = r.language),
                      r.version != null && r.hasOwnProperty('version') && (e.version = r.version),
                      r.dbrootReference && r.dbrootReference.length)
                    ) {
                      e.dbrootReference = []
                      for (var o = 0; o < r.dbrootReference.length; ++o)
                        e.dbrootReference[o] = n.keyhole.dbroot.DbRootRefProto.toObject(r.dbrootReference[o], t)
                    }
                    return (
                      r.databaseVersion != null &&
                        r.hasOwnProperty('databaseVersion') &&
                        (e.databaseVersion = n.keyhole.dbroot.DatabaseVersionProto.toObject(r.databaseVersion, t)),
                      r.protoImagery != null && r.hasOwnProperty('protoImagery') && (e.protoImagery = r.protoImagery),
                      r.databaseName != null &&
                        r.hasOwnProperty('databaseName') &&
                        (e.databaseName = n.keyhole.dbroot.StringIdOrValueProto.toObject(r.databaseName, t)),
                      r.refreshTimeout != null && r.hasOwnProperty('refreshTimeout') && (e.refreshTimeout = r.refreshTimeout),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.DbRootProto'
                  }),
                  i
                )
              })()),
              (c.EncryptedDbRootProto = (function () {
                function i(l) {
                  if (l) for (var r = Object.keys(l), t = 0; t < r.length; ++t) l[r[t]] != null && (this[r[t]] = l[r[t]])
                }
                return (
                  (i.prototype.encryptionType = 0),
                  (i.prototype.encryptionData = u.newBuffer([])),
                  (i.prototype.dbrootData = u.newBuffer([])),
                  (i.decode = function (r, t) {
                    r instanceof f || (r = f.create(r))
                    for (var e = t === void 0 ? r.len : r.pos + t, o = new n.keyhole.dbroot.EncryptedDbRootProto(); r.pos < e; ) {
                      var a = r.uint32()
                      switch (a >>> 3) {
                        case 1: {
                          o.encryptionType = r.int32()
                          break
                        }
                        case 2: {
                          o.encryptionData = r.bytes()
                          break
                        }
                        case 3: {
                          o.dbrootData = r.bytes()
                          break
                        }
                        default:
                          r.skipType(a & 7)
                          break
                      }
                    }
                    return o
                  }),
                  (i.verify = function (r) {
                    if (typeof r != 'object' || r === null) return 'object expected'
                    if (r.encryptionType != null && r.hasOwnProperty('encryptionType'))
                      switch (r.encryptionType) {
                        default:
                          return 'encryptionType: enum value expected'
                        case 0:
                          break
                      }
                    return r.encryptionData != null &&
                      r.hasOwnProperty('encryptionData') &&
                      !((r.encryptionData && typeof r.encryptionData.length == 'number') || u.isString(r.encryptionData))
                      ? 'encryptionData: buffer expected'
                      : r.dbrootData != null &&
                        r.hasOwnProperty('dbrootData') &&
                        !((r.dbrootData && typeof r.dbrootData.length == 'number') || u.isString(r.dbrootData))
                      ? 'dbrootData: buffer expected'
                      : null
                  }),
                  (i.fromObject = function (r) {
                    if (r instanceof n.keyhole.dbroot.EncryptedDbRootProto) return r
                    var t = new n.keyhole.dbroot.EncryptedDbRootProto()
                    switch (r.encryptionType) {
                      case 'ENCRYPTION_XOR':
                      case 0:
                        t.encryptionType = 0
                        break
                    }
                    return (
                      r.encryptionData != null &&
                        (typeof r.encryptionData == 'string'
                          ? u.base64.decode(r.encryptionData, (t.encryptionData = u.newBuffer(u.base64.length(r.encryptionData))), 0)
                          : r.encryptionData.length >= 0 && (t.encryptionData = r.encryptionData)),
                      r.dbrootData != null &&
                        (typeof r.dbrootData == 'string'
                          ? u.base64.decode(r.dbrootData, (t.dbrootData = u.newBuffer(u.base64.length(r.dbrootData))), 0)
                          : r.dbrootData.length >= 0 && (t.dbrootData = r.dbrootData)),
                      t
                    )
                  }),
                  (i.toObject = function (r, t) {
                    t || (t = {})
                    var e = {}
                    return (
                      t.defaults &&
                        ((e.encryptionType = t.enums === String ? 'ENCRYPTION_XOR' : 0),
                        t.bytes === String
                          ? (e.encryptionData = '')
                          : ((e.encryptionData = []), t.bytes !== Array && (e.encryptionData = u.newBuffer(e.encryptionData))),
                        t.bytes === String
                          ? (e.dbrootData = '')
                          : ((e.dbrootData = []), t.bytes !== Array && (e.dbrootData = u.newBuffer(e.dbrootData)))),
                      r.encryptionType != null &&
                        r.hasOwnProperty('encryptionType') &&
                        (e.encryptionType =
                          t.enums === String ? n.keyhole.dbroot.EncryptedDbRootProto.EncryptionType[r.encryptionType] : r.encryptionType),
                      r.encryptionData != null &&
                        r.hasOwnProperty('encryptionData') &&
                        (e.encryptionData =
                          t.bytes === String
                            ? u.base64.encode(r.encryptionData, 0, r.encryptionData.length)
                            : t.bytes === Array
                            ? Array.prototype.slice.call(r.encryptionData)
                            : r.encryptionData),
                      r.dbrootData != null &&
                        r.hasOwnProperty('dbrootData') &&
                        (e.dbrootData =
                          t.bytes === String
                            ? u.base64.encode(r.dbrootData, 0, r.dbrootData.length)
                            : t.bytes === Array
                            ? Array.prototype.slice.call(r.dbrootData)
                            : r.dbrootData),
                      e
                    )
                  }),
                  (i.prototype.toJSON = function () {
                    return this.constructor.toObject(this, d.util.toJSONOptions)
                  }),
                  (i.getTypeUrl = function (r) {
                    return r === void 0 && (r = 'type.googleapis.com'), r + '/keyhole.dbroot.EncryptedDbRootProto'
                  }),
                  (i.EncryptionType = (function () {
                    var l = {},
                      r = Object.create(l)
                    return (r[(l[0] = 'ENCRYPTION_XOR')] = 0), r
                  })()),
                  i
                )
              })()),
              c
            )
          })()),
          b
        )
      })()),
      n.keyhole.dbroot
    )
  }
})()
