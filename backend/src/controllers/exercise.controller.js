import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { Exercise } from '../models/exercise.model.js';
import { uploadToCloudinary } from '../utils/uploadToCloudinary.js';

const addNewExercise = asyncHandler(async (req, res, next) => {
  const { name, description, difficultyLevel, muscleGroups, caloriesPerMinute } =
    req.body;
  // find if exercise already exists
  const existingExercise = await Exercise.findOne({ name });
  if (existingExercise) return next(new apiError(400, 'exercise already exists'));
  // check for cover image
  const exerciseCoverImageLocalPath = req.file.path;
  console.log(exerciseCoverImageLocalPath);
  // const exerciseVideoLocalPath = req?.files['exerciseVideo'][0];
  if (!exerciseCoverImageLocalPath)
    return next(new apiError(400, 'exercise cover image is required'));
  // if (!exerciseVideoLocalPath)
  //   return next(new apiError(400, 'exercise video is required'));
  // upload image to cloudinary
  const coverImage = await uploadToCloudinary(exerciseCoverImageLocalPath);
  // const video = await uploadToCloudinary(exerciseVideoLocalPath);
  // create new object to save
  const newExercise = {
    name,
    description,
    difficultyLevel,
    caloriesPerMinute,
    muscleGroups,
    image: coverImage?.url,
    // videoUrl: video?.url,
  };
  // store to db
  const createdExercise = await Exercise.create(newExercise);
  if (!createdExercise)
    return next(
      new apiError(500, 'facing issue while adding new exercise. try again later')
    );
  // send response
  res
    .status(201)
    .json(new apiResponse(201, createdExercise, 'new exercese added successfully'));
});

const updateExercise = asyncHandler(async (req, res, next) => {
  const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedExercise)
    return next(new apiError(404, 'exercise not found for that ID'));

  res
    .status(200)
    .json(new apiResponse(200, updatedExercise, 'exercise updated successfully'));
});

const deleteExercise = asyncHandler(async (req, res, next) => {
  const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
  if (!deletedExercise)
    return next(new apiError(404, 'exercise not found for that ID'));

  res
    .status(200)
    .json(new apiResponse(200, deletedExercise, 'exercise deleted successfully'));
});

const getAllExercises = asyncHandler(async (req, res, next) => {
  console.log('called');
  const exerceses = await Exercise.find();

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { results: exerceses.length, exerceses },
        'all exercises fetched successfully'
      )
    );
});

const getExercise = asyncHandler(async (req, res, next) => {});

export {
  addNewExercise,
  updateExercise,
  deleteExercise,
  getExercise,
  getAllExercises,
};
