import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
  },
  score: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite in dev (hot reload safe)
export const QuizResult =
  mongoose.models.QuizResult || mongoose.model('QuizResult', quizResultSchema);
