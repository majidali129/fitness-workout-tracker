import mongoose, { Schema } from 'mongoose';

const workoutCommentSchema = Schema(
  {
    workout: {
      type: Schema.Types.ObjectId,
      ref: 'Workout',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const WorkoutComment = mongoose.model('WorkoutComment', workoutCommentSchema);
