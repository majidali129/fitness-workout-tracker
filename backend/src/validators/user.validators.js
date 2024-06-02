import { body } from 'express-validator';
import { User } from '../models/user.model';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
export const registerUserValidator = () => {
  return [
    body('username')
      .notEmpty()
      .trim()
      .withMessage('username is required')
      .isLength({ min: 6, max: 14 })
      .withMessage(
        'username must be equal or graster than 6 and less than 14 characters'
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
    body('avatar')
      .notEmpty()
      .withMessage('avatar is required')
      .custom(async (value) => {
        if (!value) return true;
        if (value.size > MAX_FILE_SIZE) {
          return Promise.reject('Avatar file size must be less than 2MB');
        }
      }),
  ];
};

export const loginUserValidator = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('email passowrd is required')
      .isEmail()
      .withMessage('invalid or email password'),
    body('password').notEmpty().withMessage('email password is required'),
  ];
};

export const updateUserProfileValidator = () => {
  return [
    body('username').notEmpty().withMessage('username is required'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email is not valid'),
    body('avatar').notEmpty().withMessage('avatar is required'),
  ];
};
