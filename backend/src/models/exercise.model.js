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
    videoUrl: {
      type: String,
      required: true,
    },
    caloriesPerMinute: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Exercise = mongoose.model('Exercise', exerciseSchema);

[
  {
    name: 'Treadmill Run',
    description: 'A classic cardio exercise on the treadmill.',
    image: 'https://example.com/treadmill-run.jpg',
  },
  {
    name: 'Jumping Jacks',
    description: 'A simple yet effective cardio exercise.',
    image: 'https://example.com/jumping-jacks.jpg',
  },
  {
    name: 'Burpees',
    description: 'A high-intensity cardio and strength exercise.',
    image: 'https://example.com/burpees.jpg',
  },
  {
    name: 'Squats',
    description: 'A fundamental strength training exercise for the lower body.',
    image: 'https://example.com/squats.jpg',
  },
  {
    name: 'Bicep Curls',
    description: 'A classic strength exercise for the biceps.',
    image: 'https://example.com/bicep-curls.jpg',
  },
  {
    name: 'Deadlifts',
    description: 'A compound strength exercise that targets multiple muscle groups.',
    image: 'https://example.com/deadlifts.jpg',
  },
  {
    name: 'Downward-Facing Dog',
    description:
      'A fundamental yoga pose that strengthens the upper body and stretches the hamstrings.',
    image: 'https://example.com/downward-facing-dog.jpg',
  },
  {
    name: "Child's Pose",
    description: 'A resting yoga pose that stretches the back and hips.',
    image: 'https://example.com/childs-pose.jpg',
  },
  {
    name: 'Warrior I',
    description:
      'A standing yoga pose that strengthens the legs and opens the hips.',
    image: 'https://example.com/warrior-i.jpg',
  },
  {
    name: 'Burpee Box Jumps',
    description: 'A high-intensity exercise that combines a burpee and a box jump.',
    image: 'https://example.com/burpee-box-jumps.jpg',
  },
  {
    name: 'Mountain Climbers',
    description: 'A high-intensity exercise that works the core and cardio.',
    image: 'https://example.com/mountain-climbers.jpg',
  },
  {
    name: 'Plyo Pushups',
    description:
      'A plyometric pushup exercise that builds upper body strength and power.',
    image: 'https://example.com/plyo-pushups.jpg',
  },
  {
    name: 'Hundred',
    description: 'A Pilates core exercise that strengthens the abdominal muscles.',
    image: 'https://example.com/hundred.jpg',
  },
  {
    name: 'Double-Leg Stretch',
    description: 'A Pilates exercise that works the abdominals and hip flexors.',
    image: 'https://example.com/double-leg-stretch.jpg',
  },
  {
    name: 'Roll-Up',
    description:
      'A Pilates exercise that strengthens the abdominal muscles and increases flexibility.',
    image: 'https://example.com/roll-up.jpg',
  },
  {
    name: 'Resistance Band Rows',
    description: 'A resistance training exercise that targets the back and biceps.',
    image: 'https://example.com/resistance-band-rows.jpg',
  },
  {
    name: 'Resistance Band Shoulder Press',
    description: 'A resistance training exercise that works the shoulders.',
    image: 'https://example.com/resistance-band-shoulder-press.jpg',
  },
  {
    name: 'Resistance Band Squats',
    description: 'A resistance training exercise that targets the lower body.',
    image: 'https://example.com/resistance-band-squats.jpg',
  },
];
