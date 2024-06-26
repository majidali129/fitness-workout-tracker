import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { WorkoutComment } from '../models/workout-comment.model.js';
import { Workout } from '../models/workout.model.js';

const addNewComment = asyncHandler(async (req, res, next) => {
  const { workout, comment } = req.body;

  let existingWorkout = await Workout.findOne({ workoutType: workout });

  if (!existingWorkout)
    return next(new apiError(404, 'no workout found for your selected type.'));

  const createdComment = await WorkoutComment.create({
    workout: existingWorkout._id,
    user: req.user._id,
    comment,
  });

  if (!createdComment)
    return next(
      new apiError(500, 'facing issue while adding comment. try later again')
    );

  existingWorkout.comments.push(createdComment._id);
  await existingWorkout.save({ validateBeforeSave: true });

  res
    .status(201)
    .json(new apiResponse(201, createdComment, 'comment added successfully'));
});

const updateComment = asyncHandler(async (req, res, next) => {
  console.log('update comment called');
  const updatedComment = await WorkoutComment.findByIdAndUpdate(
    req.params.commentId,
    req.body,
    { new: true }
  );

  res
    .status(200)
    .json(new apiResponse(200, updatedComment, 'comment updated successfully'));
});

const deleteComment = asyncHandler(async (req, res, next) => {
  const deletedComment = await WorkoutComment.findByIdAndDelete(
    req.params.commentId
  );
  if (!deletedComment)
    return next(new apiError(404, 'no comment found for that ID'));

  res
    .status(200)
    .json(new apiResponse(200, deletedComment, 'comment deleted successfully'));
});

export { addNewComment, updateComment, deleteComment };
