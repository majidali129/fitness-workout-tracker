import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { User } from '../models/user.model.js';

const registerUser = asyncHandler(async (req, res, next) => {});
const loginUser = asyncHandler(async (req, res, next) => {});
const deleteUser = asyncHandler(async (req, res, next) => {});
const getAllUsers = asyncHandler(async (req, res, next) => {});
const getCurrentUser = asyncHandler(async (req, res, next) => {});
const updateUserProfile = asyncHandler(async (req, res, next) => {});

export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUser,
  getCurrentUser,
  getAllUsers,
};
