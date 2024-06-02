import { body } from 'express-validator';

const workoutTypes = [
  'cardio',
  'strength_training',
  'yoga',
  'hiit',
  'pilates',
  'resistance_training',
];

const workoutIntensity = ['low', 'medium', 'high'];

export const addNewWorkoutValidator = () => {
  return [
    body('workoutType')
      .notEmpty()
      .withMessage('workout type is required')
      .trim()
      .custom((value) => {
        if (!value) return true;
        if (workoutTypes.some((type) => value !== type)) {
          return Promise.reject(
            `workout type can be any of these ${workoutTypes.join(' ')}`
          );
        }
      }),
    body('workoutIntensity')
      .notEmpty()
      .withMessage('workout intensity is required')
      .custom((value) => {
        if (!value) return true;
        if (workoutIntensity.some((el) => value !== el)) {
          return Promise.reject(
            `workout intensity can be any of ${workoutIntensity.join(' ')}`
          );
        }
      }),
    body('startTime')
      .notEmpty()
      .withMessage('workout start time is required')
      .isISO8601()
      .withMessage('time must be in ISO 8601 format (e.g., "PT30M" for 30 minutes)'),
    body('endTime')
      .notEmpty()
      .withMessage('workout start time is required')
      .isISO8601()
      .withMessage('time must be in ISO 8601 format (e.g., "PT30M" for 30 minutes)'),
    body('durationInMinutes')
      .isNumeric()
      .withMessage('duration must be a number')
      .notEmpty()
      .withMessage('duration is required'),
    body('caloriesBurned')
      .isNumeric()
      .withMessage('enter calaries in number')
      .notEmpty()
      .withMessage('calories field is required'),
    body('isCompleted')
      .isBoolean()
      .withMessage('enter workout status in true or false'),
  ];
};
