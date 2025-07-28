import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('✅ MongoDB connected!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
}
