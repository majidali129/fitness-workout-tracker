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
import { mongoIdFromPathValidator } from '../validators/mongodb.validator.js';
import {
  addNewExercise,
  updateExercise,
  deleteExercise,
  getExercise,
  getAllExercises,
} from '../controllers/exercise.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.route('/addExercise').post(upload.single('image'), addNewExercise);
// router.route('/addExercise').post(
//   addNewExerciseValidator(),
//   upload.fields([
//     {
//       name: 'coverImage',
//       maxCount: 1,
//     },
//     {
//       name: 'exerciseVideo',
//       maxCount: 1,
//     },
//   ]),
//   addNewExercise
// );
router
  .route('/:id')
  .patch(mongoIdFromPathValidator('id'), updateExercise)
  .delete(mongoIdFromPathValidator('id'), deleteExercise)
  .get(mongoIdFromPathValidator('id'), getExercise);

router.route('/').get(getAllExercises);

export default router;
