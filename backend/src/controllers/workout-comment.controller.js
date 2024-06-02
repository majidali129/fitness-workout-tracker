import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { WorkoutComment } from '../models/workout-comment.model.js';

const addNewComment = asyncHandler(async (req, res, next) => {});
const updateComment = asyncHandler(async (req, res, next) => {});
const deleteComment = asyncHandler(async (req, res, next) => {});

export { addNewComment, updateComment, deleteComment };
