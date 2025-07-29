// /pages/api/sendMail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed 🚫' });
  }

  const { to, name } = req.body;

  if (!to || !name) {
    return res.status(400).json({ message: 'Missing fields 😵‍💫' });
  }

  try {
    // Set up transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const subject = `👋 Welcome, ${name}!`;
    const text = `Hey ${name}, welcome to our platform! Let’s build something amazing together.`;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #f9fafb; border-radius: 10px; box-shadow: 0 5px 15px rgba(0,0,0,0.05);">
        <h2 style="color: #1d4ed8;">Welcome to the Squad, ${name} 👋</h2>
        <p style="font-size: 16px; color: #111827;">
          Thanks for signing up! We're hyped to have you on board.
          <br /><br />
          This is just the beginning. Build cool stuff, connect with others, and let's make magic happen! ✨
        </p>
        <a href="https://your-app-url.com/home" style="display:inline-block;margin-top:20px;padding:12px 20px;background:#1d4ed8;color:white;text-decoration:none;border-radius:8px;">
          👉 Go to Dashboard
        </a>
        <p style="margin-top: 40px; font-size: 12px; color: #6b7280;">
          If you didn’t sign up for this, you can ignore this email.
        </p>
      </div>
    `;

    const mailOptions = {
      from: `"Your App Team 🚀" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'HTML email sent! 💌' });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ message: 'Failed to send email 💥' });
  }
}
