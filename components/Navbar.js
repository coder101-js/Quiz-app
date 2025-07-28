"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 h-auto shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-[20px] lg:text-[35px] font-bold">
          Quiz App
        </h1>

        {/* Hamburger Toggle */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖️" : "☰"}
        </button>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex space-x-8">
          <li>
            <Link
              href="#about"
              className="hover:bg-blue-500 px-3 py-1 rounded-md transition"

            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/quiz"
              className="hover:bg-blue-500 px-3 py-1 rounded-md transition"

            >
              Quiz
            </Link>
          </li>
          <li>
            <Link
              href="#reviews"
              className="hover:bg-blue-500 px-3 py-1 rounded-md transition"

            >
              Reviews
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="hover:bg-blue-500 px-3 py-1 rounded-md transition"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Navigation */}
      <ul
        className={`lg:hidden flex flex-col mt-4 space-y-2 transition-all duration-300 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {[
          { name: "About", href: "#about" },
          { name: "Quiz", href: "/Quiz-App" },
          { name: "Reviews", href: "#reviews" },
          { name: "Contact", href: "#contact" }
        ].map((item) => (
          <li key={item.name} className="w-full text-center">
            <Link
              href={item.href}
              className="hover:bg-blue-500 px-3 py-1 rounded-md transition"

            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
