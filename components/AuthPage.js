"use client";

import React, { useEffect, useState } from "react";

let captchaToken = "";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onCaptchaSolved = (token) => {
        captchaToken = token;
        console.log("Captcha solved:", token);
      };

      window.onCaptchaLoad = () => {
        renderHCaptcha();
      };

      const scriptExists = document.querySelector(
        "script[src='https://js.hcaptcha.com/1/api.js?onload=onCaptchaLoad&render=explicit']"
      );

      if (!scriptExists) {
        const script = document.createElement("script");
        script.src =
          "https://js.hcaptcha.com/1/api.js?onload=onCaptchaLoad&render=explicit";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      } else {
        renderHCaptcha();
      }
    }
  }, []);

  useEffect(() => {
    captchaToken = "";
    setTimeout(() => {
      renderHCaptcha();
    }, 100);
  }, [isLogin]);

  const renderHCaptcha = () => {
    if (typeof window !== "undefined" && window.hcaptcha) {
      const container = document.getElementById("hcaptcha-container");
      if (container) {
        container.innerHTML = "";
        window.hcaptcha.render("hcaptcha-container", {
          sitekey: "fe6efd1a-9376-4e3a-8380-4b74578ed896",
          callback: "onCaptchaSolved",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msgEl = document.getElementById("message");
    msgEl.textContent = "";
    msgEl.className = "";

    const name = !isLogin ? document.getElementById("name").value : null;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!captchaToken) {
      msgEl.textContent = "❌ Please complete the captcha.";
      msgEl.className = "text-red-500 text-sm text-center mt-2";
      return;
    }

    try {
      const endpoint = `/api/auth/${isLogin ? "login" : "signup"}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isLogin
            ? { email, password, hcaptchaToken: captchaToken }
            : { name, email, password, hcaptchaToken: captchaToken }
        ),
      });

      const data = await res.json();

      if (res.ok) {
        msgEl.textContent = "✅ " + data.message;
        msgEl.className = "text-green-500 text-sm text-center mt-2";


        if (!isLogin) {
          await fetch("/api/sendMail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: email, name }),
          });
        }

        setTimeout(() => (window.location.href = "/home"), 2000);
      } else {
        msgEl.textContent = "❌ " + data.message;
        msgEl.className = "text-red-500 text-sm text-center mt-2";
      }
    } catch (error) {
      console.error("Error:", error);
      msgEl.textContent = "❌ Request failed.";
      msgEl.className = "text-red-500 text-sm text-center mt-2";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6 tracking-wide">
          {isLogin ? "Welcome Back!" : "Create Account"}
        </h1>

        <div id="message" className="min-h-[1.5rem]" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
            />
          )}
          <input
            id="email"
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-300 outline-none"
          />

          <div className="flex justify-center pt-1">
            <div id="hcaptcha-container" />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline font-medium"
          >
            {isLogin ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
