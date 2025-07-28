import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  name:   { type: String },
  review: { type: String },
  rating: { type: Number },
});

// Hot reload safe for Next.js dev server
export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
