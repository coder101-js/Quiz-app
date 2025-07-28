import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import { QuizResult } from '@/models/quizResult';
import { isBot } from '@/lib/botProtection'; 

export async function POST(req) {
  try {
    await connectDB();

    if (isBot(req)) {
      return NextResponse.json({ message: 'Access denied for bots.' }, { status: 403 });
    }

    const { name = 'Anonymous', score, total } = await req.json();

    if (score === undefined || total === undefined) {
      return NextResponse.json({ message: 'Score and total are required.' }, { status: 400 });
    }

    const result = await QuizResult.create({ name, score, total });

    return NextResponse.json({
      message: 'Quiz result saved!',
      result,
    }, { status: 200 });
  } catch (err) {
    console.error('❌ Error saving result:', err.message);
    return NextResponse.json({ message: 'Failed to save result.' }, { status: 500 });
  }
}
