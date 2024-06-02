import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { User } from '../models/user.model.js';
import { validationResult } from 'express-validator';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

const generateAccessRefreshToken = async (userId) => {
  const user = await User.findById(userId);
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};
const registerUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  console.log(errors);
  const { username, fullName, email, password } = req.body;
  // get user data
  // validate request => done by validator
  // check for existing user => done by validator as well
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser)
    return next(new apiError(400, 'user with credentials already exists'));

  // check for avatar => required
  const avatarLocalPath = req?.file?.path;
  if (!avatarLocalPath)
    return next(new apiError(400, 'avatar (from localpath) is required'));

  const avatar = await uploadToCloudinary(avatarLocalPath);
  if (!avatar)
    return next(new apiError(400, 'avatar (from cloudinary) is required'));
  // save avatar to cloudinary and get url
  // encrypt password => via pre middleware
  // create new user object
  const userToBeSave = {
    username,
    fullName,
    email,
    password,
    avatar: avatar?.url,
  };
  // save user to DB

  const createdUser = await User.create(userToBeSave);
  if (!createdUser)
    return next(new apiError(500, 'something went wrong while creating new user'));
  // send response
  createdUser.password = undefined;

  res
    .status(201)
    .json(new apiResponse(201, createdUser, 'user registered successfully'));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!(email || password))
    return next(new apiError(400, 'email password is required'));

  const user = await User.findOne({ email }).select('-refreshToken');
  if (!user) return next(new apiError(404, 'user not found'));
  console.log(user);

  const isPasswordValid = await user.isPasswordCorrect(password, user.password);
  if (!isPasswordValid)
    return next(
      new apiError(400, 'invalid request or user may changed his password.')
    );

  const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);
  user.password = undefined;

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .status(200)
    .json(
      new apiResponse(
        200,
        { user, accessToken, refreshToken },
        'user loged in successfully'
      )
    );
});

const getCurrentUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .json(new apiResponse(200, req.user, 'current user fetched successfully'));
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new apiError(404, 'user not found for that ID'));
  const deletedUser = await User.findByIdAndDelete(req.params.id).select(
    '-password -refreshToken'
  );
  if (!deletedUser)
    return next(
      new apiError(500, 'facing issue while deleting user. try again later')
    );

  res
    .status(200)
    .json(new apiResponse(200, deletedUser, 'user deleted successfully'));
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new apiError(404, 'user not found for that ID'));

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }).select('-password -refreshToken');

  res
    .status(200)
    .json(new apiResponse(200, updatedUser, 'user profile updated successfully'));
});

export { registerUser, loginUser, updateUserProfile, deleteUser, getCurrentUser };
