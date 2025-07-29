import nodemailer from 'nodemailer';

export default async function handler(req, res) {


  const { to, name } = req.body;

  if (!to || !name) {
    return res.status(400).json({ message: 'Missing fields 😵‍💫' });
  }

  try {
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

    res.status(200).json({ message: 'HTML email sent! 💌' });
  } catch (err) {
    console.error("📛 Email Error:", err);
    res.status(500).json({ message: 'Email failed to send 💥' });
  }
}
