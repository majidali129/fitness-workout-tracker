import { body } from 'express-validator';

const difficultyLevels = ['easy', 'medium', 'hard'];
const max_file_size = 0.8 * 1024 * 1024;

export const addNewExerciseValidator = () => {
  return [
    body('name').notEmpty().trim().withMessage('exercise name is required'),
    body('image')
      .notEmpty()
      .withMessage('image for exercise is required')
      .custom((value) => {
        if (!value) return true;
        if (value.size > max_file_size) {
          return Promise.reject('image size must be less than 800 kb');
        }
      }),
    body('difficultyLevel')
      .notEmpty()
      .withMessage('exercise difficulty level is required')
      .trim()
      .custom((value) => {
        if (!value) return true;
        if (difficultyLevels.some((level) => value !== level)) {
          return Promise.reject(
            'difficulty level can be either eary, medium or hard'
          );
        }
      }),
    body('muscleGroup')
      .isString()
      .notEmpty()
      .withMessage('please select muscle group for exercise'),
    // body('videoUrl')
    //   .isString()
    //   .optional()
    //   .notEmpty()
    //   .withMessage('exercise video source is required'),
    body('caloriesPerMinute')
      .notEmpty()
      .withMessage('calories field is required')
      .isNumeric()
      .withMessage('enter calories in number'),
  ];
};
