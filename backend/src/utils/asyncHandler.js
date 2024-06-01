/**
 *
 * @param {function} requestHandler
 * @returns promise
 *
 * @description typical handler function, responsible to catch asynchronous error and to farword to globla error handler of expressJS
 */

export const asyncHandler = (requestHandler) => (req, res, next) => {
  return Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
}
