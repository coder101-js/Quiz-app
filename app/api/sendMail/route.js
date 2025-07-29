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
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Welcome to QuizApp</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f9fafb;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="padding: 40px 0;">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); overflow: hidden;">
              <tr>
                <td align="center" style="padding: 40px 30px 10px 30px; font-family: 'Segoe UI', sans-serif;">
                  <h1 style="font-size: 28px; color: #1d4ed8; margin: 0;">Welcome to QuizApp, ${name} 🧠</h1>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 0 30px 20px 30px; font-family: 'Segoe UI', sans-serif;">
                  <p style="font-size: 16px; color: #374151; line-height: 1.5; margin-top: 10px;">
                    We're super pumped you just signed up to QuizApp! 🎉<br /><br />
                    Get ready to test your brainpower, compete with others, and level up your skills with epic quizzes made just for you.
                  </p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px;">
                  <a href="https://quizapp.buttnetworks.com/home" style="display: inline-block; padding: 14px 28px; background-color: #1d4ed8; color: #ffffff; font-size: 16px; font-weight: 600; border-radius: 8px; text-decoration: none;">
                    🧩 Start Your First Quiz
                  </a>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 30px; font-family: 'Segoe UI', sans-serif;">
                  <p style="font-size: 12px; color: #9ca3af;">
                    Didn’t sign up? No worries — just ignore this email.
                  </p>
                </td>
              </tr>
            </table>
            <p style="font-size: 11px; color: #9ca3af; margin-top: 20px;">© ${new Date().getFullYear()} QuizApp by ButtNetworks. All rights reserved.</p>
          </td>
        </tr>
      </table>
    </body>
  </html>
`;


        await transporter.sendMail({
            from: `"Butt networks" <${process.env.GMAIL_USER}>`,
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
