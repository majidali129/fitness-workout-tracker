/**
 Exercise-related Routes:TODO:
GET /exercises - Get the list of all predefined exercises
GET /exercises/:id - Get the details of a specific exercise
POST /exercises - Create a new exercise (for admin users)
PUT /exercises/:id - Update an existing exercise (for admin users)
DELETE /exercises/:id - Delete an exercise (for admin users)
 */

import express from 'express';
import { addNewExerciseValidator } from '../validators/exercise.validators.js';

const router = express.Router();

router.route('/').get(getAllExercises);
router.route('/register').post(addNewExerciseValidator(), addNewExercise);
router
  .route('/:id')
  .patch(addNewExerciseValidator(), mongoIdFromPathValidator('id'), updateExercise)
  .delete(mongoIdFromPathValidator('id'), deleteExercise)
  .get(getExercise);

export default router;
