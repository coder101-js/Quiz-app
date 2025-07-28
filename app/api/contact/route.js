import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongo';
import { Contact } from '@/models/contact';
import { isBot } from '@/lib/botProtection'; 

export async function POST(req) {
  try {
    await connectDB();

    if (isBot(req)) {
      return NextResponse.json({ message: 'Access denied for bots.' }, { status: 403 });
    }

    const { Name, Email, Phone, Message } = await req.json();

    if (!Name || !Email || !Phone || !Message) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    await Contact.create({ Name, Email, Phone, Message });

    return NextResponse.json({ message: '✅ Message sent successfully!' }, { status: 200 });
  } catch (err) {
    console.error('❌ Contact form error:', err.message);
    return NextResponse.json({ message: '❌ Server error.' }, { status: 500 });
  }
}
