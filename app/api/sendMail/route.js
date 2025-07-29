// app/api/sendMail/route.js

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json();
        const { to, name } = body;

        if (!to || !name) {
            return NextResponse.json({ message: 'Missing fields 😵‍💫' }, { status: 400 });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const subject = `👋 Welcome, ${name}!`;
        const text = `Hey ${name}, welcome to the squad! 🚀`;

        const html = `
      <div style="font-family: sans-serif; padding: 20px; background: #f4f4f4;">
        <h2 style="color: #1d4ed8;">Hey ${name} 👋</h2>
        <p>We're excited to have you on board! This is your first step into greatness ✨</p>
        <p>Start building at <a href="https://quizapp.buttnetworks.com/home">your dashboard</a></p>
      </div>
    `;

        await transporter.sendMail({
            from: `"Your App" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });

        return NextResponse.json({ message: 'HTML email sent! 💌' }, { status: 200 });
    } catch (err) {
        console.error('📛 Email send failed:', err);
        return NextResponse.json({ message: 'Email failed to send 💥' }, { status: 500 });
    }
}
