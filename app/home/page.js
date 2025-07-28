'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';

// Font Awesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';

const page = () => {
  return (
    <>
      <Navbar />

      {/* Quiz App Description Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-300 w-full py-16 px-4 cursor-pointer">
        <div className="max-w-4xl mx-auto bg-transparent rounded-2xl shadow-lg p-8 sm:p-12 text-gray-900">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-blue-200">
            What is Quiz App?
          </h1>
          <p className="text-base sm:text-lg font-medium leading-relaxed">
            A Quiz App is an interactive platform where users answer a series of questions to test their knowledge.
            It can be used for learning, fun, or assessments. Our app provides instant feedback, results at the end,
            and a smooth experience across all devices.
          </p>
          <Link href='/quiz'>
            <button className='bg-blue-900 rounded-[5px] font-extrabold 
              w-[200px] h-10 mt-3 text-white hover:bg-blue-800 transition text-[20px]'>
              Get Quiz
            </button>
          </Link>
        </div>
      </section>

      <Reviews />
      <Contact />

      {/* Footer with Icons */}
      <div className='bg-blue-600 w-full h-24 flex flex-col items-center justify-center text-white'>
        <h1 className='text-center font-bold text-gray-300 text-[18px]'>
          2025 &copy; created by Shahnawaz Saddam Butt
        </h1>

        <div className="flex items-center gap-4 mt-1">
          <span className="text-sm">Check On:</span>
          <a
            href="https://github.com/ShahanwazSaddam144/Quiz-App"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 text-xl"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.youtube.com/@Butt-Networks"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-400 text-xl"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        </div>
      </div>
    </>
  );
};

export default page;
