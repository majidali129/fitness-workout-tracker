/**
 Workout-related Routes: TODO:
POST /workouts - Create a new workout for the current user
GET /workouts - Get all the workouts for the current user, sorted by date
GET /workouts/:id - Get the details of a specific workout
PUT /workouts/:id - Update an existing workout (e.g., mark exercises as completed, add comments)
DELETE /workouts/:id - Delete a workout (for admin users)
 */

import express from 'express';
import { mongoIdFromPathValidator } from '../validators/mongodb.validator.js';
import { addNewWorkoutValidator } from '../validators/workout.validators.js';
import workoutCommentRouter from './workout-comment.routes.js';
import {
  addNewWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkout,
  getAllWorkouts,
  getAllWorkoutsReport,
} from '../controllers/workout.controller.js';
import { verifyJWT } from '../middlewares/verifyJWT.middleware.js';

const router = express.Router();
router.use('/:workoutId/comments', workoutCommentRouter);
router.use('/:workoutId/comments/:commentId', workoutCommentRouter);

router.use(verifyJWT);

router.route('/').get(getAllWorkouts);
router.route('/progress').get(getAllWorkoutsReport);
router.route('/newWorkout').post(addNewWorkoutValidator(), addNewWorkout);
router
  .route('/:id')
  .patch(addNewWorkoutValidator(), mongoIdFromPathValidator('id'), updateWorkout)
  .delete(mongoIdFromPathValidator('id'), deleteWorkout)
  .get(getWorkout);

export default router;
