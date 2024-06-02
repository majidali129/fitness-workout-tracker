import { body } from 'express-validator';
import { User } from '../models/user.model.js';

// const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const registerUserValidator = [
  body('username')
    .notEmpty()
    .trim()
    .withMessage('username is required')
    .isLength({ min: 6, max: 14 })
    .withMessage(
      'username must be equal or grater than 6 and less than 14 characters'
    ),
  body('fullName').notEmpty().trim().withMessage('fullName field is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email address is not valid')
    .toLowerCase()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) return Promise.reject('user with this email already exists');
      return true;
    }),
  body('password')
    .isString()
    .withMessage('password must be string')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('password must be 8 characters long'),
];

export const loginUserValidator = [
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email'),
  body('password').notEmpty().withMessage('password is required'),
];

export const updateUserProfileValidator = [
  body('username').notEmpty().withMessage('username is required'),
  body('fullName').notEmpty().withMessage('fullName is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email is not valid'),
];
