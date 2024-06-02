import { body } from 'express-validator';

export const workoutCommentValidator = () => {
  return [
    body('comment').notEmpty().withMessage('comment message is required').trim(),
  ];
};
