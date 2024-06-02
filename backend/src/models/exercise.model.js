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
      required: true,
    },
  },
  { timestamps: true }
);

export const Exercise = mongoose.model('Exercise', exerciseSchema);
