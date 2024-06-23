import mongoose, { Schema } from 'mongoose';

const exerciseSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    image: {
      type: String,
      // required: true,
    },
    difficultyLevel: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'level can be easy medium or hard',
        default: 'easy',
      },
      required: true,
    },
    muscleGroups: {
      type: [String],
      required: true,
    },
    // videoUrl: {
    //   type: String,
    //   required: true,
    // },
    caloriesPerMinute: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Exercise = mongoose.model('Exercise', exerciseSchema);
