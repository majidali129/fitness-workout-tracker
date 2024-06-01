export class apiError extends Error {
  /**
   *
   * @param {number} statusCode
   * @param {string} message
   * @param {object} errors
   * @param {Array} stack
   */
  constructor(statusCode, message, errors = [], stack) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.data = null;
    this.errors = errors;
    this.message = message;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrack(this, this.constructor);
    }
  }
}
