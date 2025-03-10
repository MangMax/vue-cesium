define(['exports', './defaultValue-fe22d8c0'], function (exports, defaultValue) {
  'use strict'

  /**
   * Constructs an exception object that is thrown due to an error that can occur at runtime, e.g.,
   * out of memory, could not compile shader, etc.  If a function may throw this
   * exception, the calling code should be prepared to catch it.
   * <br /><br />
   * On the other hand, a {@link DeveloperError} indicates an exception due
   * to a developer error, e.g., invalid argument, that usually indicates a bug in the
   * calling code.
   *
   * @alias RuntimeError
   * @constructor
   * @extends Error
   *
   * @param {string} [message] The error message for this exception.
   *
   * @see DeveloperError
   */
  function RuntimeError(message) {
    /**
     * 'RuntimeError' indicating that this exception was thrown due to a runtime error.
     * @type {string}
     * @readonly
     */
    this.name = 'RuntimeError'

    /**
     * The explanation for why this exception was thrown.
     * @type {string}
     * @readonly
     */
    this.message = message

    //Browsers such as IE don't have a stack property until you actually throw the error.
    let stack
    try {
      throw new Error()
    } catch (e) {
      stack = e.stack
    }

    /**
     * The stack trace of this exception, if available.
     * @type {string}
     * @readonly
     */
    this.stack = stack
  }

  if (defaultValue.defined(Object.create)) {
    RuntimeError.prototype = Object.create(Error.prototype)
    RuntimeError.prototype.constructor = RuntimeError
  }

  RuntimeError.prototype.toString = function () {
    let str = `${this.name}: ${this.message}`

    if (defaultValue.defined(this.stack)) {
      str += `\n${this.stack.toString()}`
    }

    return str
  }

  exports.RuntimeError = RuntimeError
})
