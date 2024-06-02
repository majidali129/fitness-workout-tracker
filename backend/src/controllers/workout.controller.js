import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { Workout } from '../models/workout.model.js';

const addNewWorkout = asyncHandler(async (req, res, next) => {});
const updateWorkout = asyncHandler(async (req, res, next) => {});
const deleteWorkout = asyncHandler(async (req, res, next) => {});
const getAllWorkouts = asyncHandler(async (req, res, next) => {});
const getWorkout = asyncHandler(async (req, res, next) => {});
const getAllWorkoutsReport = asyncHandler(async (req, res, next) => {});

export {
  addNewWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkout,
  getAllWorkouts,
  getAllWorkoutsReport,
};
