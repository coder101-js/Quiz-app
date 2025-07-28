import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import { Review } from '@/models/review';

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { name, review: ReviewText, rating } = body;

    if (!name || !ReviewText || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ message: 'All fields are required and rating must be between 1-5.' }, { status: 400 });
    }

    const newReview = new Review({
      name,
      review: ReviewText,
      rating, 
    });

    await newReview.save();

    return NextResponse.json({ message: '✅ Review submitted successfully!' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: '❌ Server error.' }, { status: 500 });
  }
}
