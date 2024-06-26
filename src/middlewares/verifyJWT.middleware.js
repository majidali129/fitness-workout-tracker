import jwt from 'jsonwebtoken';

import { apiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (req.cookies?.accessToken || req.headers.authorization.startsWith('Beared')) {
      token =
        req.cookies.accessToken || req.headers.authorization.replace('Bearer ', '');
    }

    if (!token) return next(new apiError(401, 'invalid access token'));
    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const registedUser = await User.findById(decoded._id).select(
      '-password -refreshToken'
    );
    if (!registedUser) return next(new apiError(401, 'user no longer exist'));

    req.user = registedUser;
    next();
  } catch (error) {
    console.log(error);
    return next(new apiError(401, 'invalid access'));
  }
});
