import mongoose, { Schema } from 'mongoose';

const workoutTypeEnum = {
  CARDIO: 'cardio',
  STRENGTH_TRAINING: 'strength_training',
  YOGA: 'yoga',
  HIIT: 'hiit',
  PILATES: 'pilates',
  RESISTANCE_TRAINING: 'resistance_training',
};
const workoutSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    exercises: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Exercise',
        },
      ],
    },
    workoutType: {
      type: String,
      enum: {
        values: Object.values(workoutTypeEnum),
        required: true,
        message: `workout type can be only one of these ${Object.values(
          workoutTypeEnum
        ).join(' ')}`,
      },
    },
    workoutIntensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      required: true,
      default: 'low',
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    durationInMinutes: {
      type: Number,
      required: true,
      default: 0,
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    comments: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'WorkoutComment',
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const Workout = mongoose.model('Workout', workoutSchema);
