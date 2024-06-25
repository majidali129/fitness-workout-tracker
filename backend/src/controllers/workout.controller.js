import { asyncHandler } from '../utils/asyncHandler.js';
import { apiError } from '../utils/apiError.js';
import { apiResponse } from '../utils/apiResponse.js';
import { Workout } from '../models/workout.model.js';
import { Exercise } from '../models/exercise.model.js';

const addNewWorkout = asyncHandler(async (req, res, next) => {
  // NOTE: startTime and endTime must be in ( 2019-09-18T02:10:00.000Z ) formate. from client
  const {
    exercises,
    workoutType,
    workoutIntensity,
    startTime,
    endTime,
    durationInMinutes,
    caloriesBurned,
    isCompleted,
  } = req.body;

  const existingWorkout = await Workout.findOne({
    user: req.user._id,
    $and: [
      {
        startTime: { $gte: startTime },
        endTime: { $gte: endTime },
        isCompleted: false,
      },
    ],
  });

  // if (existingWorkout)
  //   return next(
  //     new apiError(
  //       400,
  //       'You already have a workout within this start and end time. Please select some other duration'
  //     )
  //   );

  // GET IDs OF EXERCISES, SELECTED BY CLIENT
  const exercisesIds = await Exercise.find(
    {
      name: {
        $in: exercises,
      },
    },
    { _id: 1 }
  );

  const newWorkout = {
    user: req.user._id,
    workoutType,
    exercises: exercisesIds,
    workoutIntensity,
    // startTime: formatISO(
    //   new Date(
    //     2019,
    //     8,
    //     18,
    //     Number(startTime.split(' ')[0]),
    //     Number(startTime.split(' ')[1]),
    //     0
    //   )
    // ),
    // endTime: formatISO(
    //   new Date(
    //     2019,
    //     8,
    //     18,
    //     Number(endTime.split(' ')[0]),
    //     Number(endTime.split(' ')[1]),
    //     0
    //   )
    // ),

    startTime,
    endTime,
    durationInMinutes,
    caloriesBurned,
    isCompleted,
  };

  const newlyCreatedWorkout = await Workout.create(newWorkout);
  if (!newlyCreatedWorkout)
    return next(new apiError(500, 'new workout not created. try again later'));

  res
    .status(200)
    .json(
      new apiResponse(201, newlyCreatedWorkout, 'new workout created successfully')
    );
});

const updateWorkout = asyncHandler(async (req, res, next) => {
  const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedWorkout)
    return next(new apiError(404, 'no workout found for that ID'));

  res
    .status(200)
    .json(new apiResponse(200, updatedWorkout, 'workout updated successfully'));
});

const deleteWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) return next(new apiError(404, 'no workout found for that ID'));

  res
    .status(200)
    .json(new apiResponse(200, workout, 'workout deleted successfully'));
});

const getAllWorkouts = asyncHandler(async (req, res, next) => {
  const workouts = await Workout.find();

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        { results: workouts.length, workouts },
        'all workouts fetched successfully'
      )
    );
});

const getWorkout = asyncHandler(async (req, res, next) => {
  const workout = await Workout.findById(req.params.id).populate('exercises');
  if (!workout) return next(new apiError(404, 'no workout found for that ID'));

  res
    .status(200)
    .json(new apiResponse(200, workout, 'workout fetched successfully'));
});

// AGGREGATION PIPELINES FOR REPORT DATA
async function getAllCompleted() {
  const allCompleted = await Workout.aggregate([
    {
      $match: {
        isCompleted: true,
      },
    },
  ]);

  return allCompleted;
}
async function getAllPending() {
  const allPending = await Workout.aggregate([
    {
      $match: {
        isCompleted: false,
        startTime: {
          $gt: new Date(),
        },
      },
    },
    {
      $sort: {
        startTime: 1,
      },
    },
    {
      $limit: 3,
    },
  ]);

  return allPending;
}

async function getAllWeeklyCompleted() {
  const weeklyCompleted = await Workout.aggregate([
    {
      $match: {
        isCompleted: true,
        $and: [
          {
            endTime: {
              $gte: new Date(new Date().setDate(new Date().getDate() - 7)),
              $lt: new Date(),
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        totalCompleted: {
          $sum: 1,
        },
        workoutsOfWeek: {
          $push: '$$ROOT',
        },
      },
    },
  ]);

  return weeklyCompleted;
}
async function getAllCompletedFromLast3Days() {
  const weeklyCompleted = await Workout.aggregate([
    {
      $match: {
        isCompleted: true,
        $and: [
          {
            endTime: {
              $gte: new Date(new Date().setDate(new Date().getDate() - 3)),
              $lt: new Date(),
            },
          },
        ],
      },
    },
    {
      $group: {
        _id: null,
        totalCompleted: {
          $sum: 1,
        },
        workoutsOfWeek: {
          $push: '$$ROOT',
        },
      },
    },
  ]);

  return weeklyCompleted;
}

const getAllWorkoutsReport = asyncHandler(async (req, res, next) => {
  const [
    allWorkouts,
    completedWorkouts,
    weeklyCompleted,
    threeDaysCompleted,
    nextPending,
  ] = await Promise.all([
    Workout.find(),
    getAllCompleted(),
    getAllWeeklyCompleted(),
    getAllCompletedFromLast3Days(),
    getAllPending(),
  ]);
  const percentage = ((completedWorkouts.length / allWorkouts.length) * 100).toFixed(
    2
  );
  const finalReportData = {
    owner: req.user,
    allWorkouts,
    percentageByComplete: +percentage,
    completedWorkouts,
    weeklyCompleted,
    threeDaysCompleted,
    nextPending,
  };

  res
    .status(200)
    .json(
      new apiResponse(
        200,
        finalReportData,
        'report data for workouts fetched successfully'
      )
    );
});

export {
  addNewWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkout,
  getAllWorkouts,
  getAllWorkoutsReport,
};
