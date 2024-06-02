/**
 * User-related Routes:TODO:
POST /users/register - User registration
POST /users/login - User login
GET /users/me - Get the current user's profile
PUT /users/me - Update the current user's profile
 */

import express from 'express';
import { registerUserValidator } from '../validators/user.validators.js';
import { mongoIdFromPathValidator } from '../validators/mongodb.validator.js';
import {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUser,
  getCurrentUser,
  getAllUsers,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/me').get(getCurrentUser);
router.route('/register').post(registerUserValidator(), registerUser);
router.route('/login').post(loginUserValidator(), loginUser);
router
  .route('/:id')
  .patch(registerUserValidator(), mongoIdFromPathValidator('id'), updateUserProfile)
  .delete(mongoIdFromPathValidator('id'), deleteUser);

export default router;
