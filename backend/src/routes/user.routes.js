/**
 * User-related Routes:TODO:
POST /users/register - User registration
POST /users/login - User login
GET /users/me - Get the current user's profile
PUT /users/me - Update the current user's profile
 */

import express from 'express';
import {
  loginUserValidator,
  registerUserValidator,
  updateUserProfileValidator,
} from '../validators/user.validators.js';
import { mongoIdFromPathValidator } from '../validators/mongodb.validator.js';
import {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUser,
  getCurrentUser,
} from '../controllers/auth.controller.js';
import { upload } from '../middlewares/multer.middleware.js';
import { validate } from '../validators/validate.js';
import { verifyJWT } from '../middlewares/verifyJWT.middleware.js';

const router = express.Router();

router
  .route('/register')
  .post(registerUserValidator, upload.single('avatar'), registerUser);
router.route('/login').post(loginUserValidator, validate, loginUser);
router.route('/me').get(verifyJWT, getCurrentUser);
router
  .route('/:id')
  .patch(
    updateUserProfileValidator,
    mongoIdFromPathValidator('id'),
    updateUserProfile
  )
  .delete(mongoIdFromPathValidator('id'), deleteUser);

export default router;
