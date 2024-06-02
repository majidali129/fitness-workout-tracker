import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { Exercise } from '../models/exercise.model.js';

const addNewExercise = asyncHandler(async (req, res, next) => {});
const updateExercise = asyncHandler(async (req, res, next) => {});
const deleteExercise = asyncHandler(async (req, res, next) => {});
const getAllExercises = asyncHandler(async (req, res, next) => {});
const getExercise = asyncHandler(async (req, res, next) => {});

export {
  addNewExercise,
  updateExercise,
  deleteExercise,
  getExercise,
  getAllExercises,
};
