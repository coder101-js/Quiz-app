import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import { User } from '@/models/user';
import { hash } from '@/lib/hash';

export async function POST(req) {
  try {
    await connectDB();
    const { name, email, password, hcaptchaToken } = await req.json();

    if (!name || !email || !password || !hcaptchaToken) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // Optionally: verify hCaptcha here using a fetch request to their API

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
    }

    const hashedPassword = await hash(password);

    await User.create({ name, email, password: hashedPassword });

    return NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
