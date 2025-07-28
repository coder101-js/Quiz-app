import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  Name:   { type: String },
  Review: { type: String },
  Rating: { type: Number },
});

// Hot reload safe for Next.js dev server
export const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
