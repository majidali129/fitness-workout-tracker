export class apiResponse {
  /**
   *
   * @param {number} statusCode
   * @param {object} data
   * @param {string} message
   *
   * @description commone JS class to handle responses at a centeral place.
   */
  constructor(statusCode, data, message) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.data = data;
    this.message = message;
  }
}
