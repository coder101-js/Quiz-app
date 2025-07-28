import { NextResponse } from 'next/server';
import connectDB from '@/utils/db';
import {Review} from '@/models/review';

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { name, review: ReviewText } = body;

    if (!Name || !ReviewText) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const newReview = new Review({ Name, Review: ReviewText });
    await newReview.save();

    return NextResponse.json({ message: '✅ Review submitted successfully!' }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: '❌ Server error.' }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();

  try {
    const allReviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json(allReviews, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: '❌ Failed to fetch reviews.' }, { status: 500 });
  }
}
