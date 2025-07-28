import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import { User } from '@/models/user';
import { compare } from '@/lib/hash';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await connectDB();
    const { email, password, hcaptchaToken } = await req.json();

    if (!email || !password || !hcaptchaToken) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Optionally: hCaptcha verification logic here

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const match = await compare(password, user.password);
    if (!match) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful.', token }, { status: 200 });
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
