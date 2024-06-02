/**
 Workout Comment-related Routes:TODO:
POST /workouts/:id/comments - Add a new comment to a specific workout
GET /workouts/:id/comments - Get all the comments for a specific workout
PUT /workouts/:id/comments/:commentId - Update an existing workout comment
DELETE /workouts/:id/comments/:commentId - Delete a workout comment
 */

import express from 'express';
import { mongoIdFromPathValidator } from '../validators/mongodb.validator.js';
import { workoutCommentValidator } from '../validators/workout-comment.validators.js';
import {
  addNewComment,
  updateComment,
  deleteComment,
  getAllComments,
} from '../controllers/workout-comment.controller.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllComments).post(workoutCommentValidator(), addNewComment);
router
  .route('/:commentId')
  .patch(
    mongoIdFromPathValidator('commentId'),
    workoutCommentValidator(),
    updateComment
  );

router
  .route('/:commentId')
  .delete(mongoIdFromPathValidator('commentId'), deleteComment);

export default router;
