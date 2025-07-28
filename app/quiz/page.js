"use client";

import React, { useEffect, useState } from "react";

const questions = [
  {
    question: "What is Next.Js?",
    options: ["Only Name", "Library", "Framework", "Language"],
    correct: "Framework",
  },
  {
    question: "Which language runs in a browser?",
    options: ["Python", "C", "Java", "JavaScript"],
    correct: "JavaScript",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Home Tool Markup",
      "HyperTool Multi Language",
      "Hyper Type Multi Language",
    ],
    correct: "HyperText Markup Language",
  },
  {
    question: "What is Tailwind?",
    options: ["Library", "CSS Framework", "None", "A,B"],
    correct: "CSS Framework",
  },
  {
    question: "What is the return value of the getDay()?",
    options: [
      "A number between 1 and 31",
      "A number between 0 and 30",
      "A number between 1 and 7",
      "A number between 0 and 6",
    ],
    correct: "A number between 0 and 6",
  },
];

const Quiz = () => {
  const [username, setUsername] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizOver, setQuizOver] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (e, selected) => {
    const btn = e.target;
    const isCorrect = selected === currentQuestion.correct;

    btn.style.backgroundColor = isCorrect ? "green" : "red";
    btn.style.color = "white";

    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      btn.style.backgroundColor = "";
      btn.style.color = "";

      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setQuizOver(true);
      }
    }, 800);
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setQuizOver(false);
    setStartQuiz(false);
  };

  // Submit score to backend
  useEffect(() => {
    if (quizOver && username.trim()) {
      fetch(`/api/quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          score,
          total: questions.length,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("✅ Saved:", data))
        .catch((err) => console.error("❌ Error sending result:", err));
    }
  }, [quizOver, username, score]);

  // Show name input
  if (!startQuiz) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-blue-200">
        <div className="bg-white p-10 rounded-xl shadow-xl text-center w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            👋 Enter Your Name to Start
          </h1>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Name"
            className="w-full border border-gray-300 p-3 rounded-lg mb-6"
          />
          <button
            onClick={() => {
              if (username.trim()) {
                setStartQuiz(true);
              } else {
                alert("⚠️ Please enter your name to start the quiz.");
              }
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            🚀 Start Quiz
          </button>
        </div>
      </section>
    );
  }

  // Show final score
  if (quizOver) {
    return (
      <section className="flex justify-center items-center min-h-screen bg-green-100">
        <div className="bg-white p-10 rounded-xl shadow-xl text-center">
          <h1 className="text-4xl font-bold text-green-700">
            🎉 Quiz Completed!
          </h1>
          <p className="text-xl mt-4 mb-2">
            Hi <strong>{username}</strong>, you scored <strong>{score}</strong>{" "}
            / {questions.length}
          </p>
          <p className="mb-6 text-gray-600">
            {score === questions.length
              ? "💯 Excellent!"
              : score >= questions.length / 3
              ? "👍 Good job!"
              : "📘 Keep practicing!"}
          </p>
          <button
            onClick={restartQuiz}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            🔁 Restart Quiz
          </button>
        </div>
      </section>
    );
  }

  // Quiz in progress
  return (
    <section className="flex justify-center items-center min-h-screen bg-blue-200">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-8">
          Quiz App
        </h1>

        <div className="bg-blue-100 rounded-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-2">
            Question {currentIndex + 1}:
          </h2>
          <p className="text-lg font-medium">{currentQuestion.question}</p>
        </div>

        <div className="grid gap-4">
          {currentQuestion.options.map((option, i) => (
            <button
              key={i}
              onClick={(e) => handleAnswer(e, option)}
              className="w-full bg-white border border-blue-400 rounded-lg p-4 text-left hover:bg-blue-50 hover:border-blue-600 transition"
            >
              {String.fromCharCode(65 + i)}: {option}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Quiz;
