import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  Name:    { type: String, required: true },
  Email:   { type: String, required: true },
  Phone:   { type: String },
  Message: { type: String, required: true },
  date:    { type: Date, default: Date.now },
});

// Prevent model overwrite in dev (Next.js hot reload)
export const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
