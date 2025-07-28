import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'QuizApp - Test Your Brain & Level Up! 🧠⚡',
  description: 'Challenge yourself with fun quizzes on all topics! Compete, learn, and climb the leaderboard at QuizApp.',
  openGraph: {
    title: 'QuizApp - Test Your Brain & Level Up! 🧠⚡',
    description: 'Challenge yourself with fun quizzes on all topics! Compete, learn, and climb the leaderboard at QuizApp.',
    url: 'https://quizapp.buttnetworks.com',
    siteName: 'QuizApp',
    images: [
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QuizApp - Test Your Brain & Level Up! 🧠⚡',
    description: 'Challenge yourself with fun quizzes on all topics! Compete, learn, and climb the leaderboard at QuizApp.',
    images: ['https://quizapp.buttnetworks.com/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
