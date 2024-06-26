import { param, body } from 'express-validator';

export const mongoIdFromPathValidator = (idName) => {
  return [
    param(idName)
      .notEmpty()
      .withMessage('target id for exercise is required')
      .isMongoId()
      .withMessage(`Invalid ID ${idName}`),
  ];
};

export const mongoIdFromBodyValidator = (idName) => {
  return [
    body(idName)
      .notEmpty()
      .withMessage('target id for exercise is required')
      .isMongoId()
      .withMessage(`Invalid ID ${idName}`),
  ];
};
