"use client";

import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Message: ''
  });

  const [responseMsg, setResponseMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setResponseMsg(data.message || '✅ Sent!');
    } catch (err) {
      setResponseMsg('❌ Error sending message.');
    }

    setTimeout(() => setResponseMsg(''), 3000);
  };

  return (
    <section id='contact' className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="Name"
            placeholder="Your Name"
            onChange={handleChange}
            value={formData.Name}
            required
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 px-2 py-2 outline-none transition duration-200"
          />

          <input
            name="Email"
            type="email"
            placeholder="Your Email"
            onChange={handleChange}
            value={formData.Email}
            required
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 px-2 py-2 outline-none transition duration-200"
          />

          <input
            name="Phone"
            placeholder="Your Phone"
            onChange={handleChange}
            value={formData.Phone}
            required
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 px-2 py-2 outline-none transition duration-200"
          />

          <textarea
            name="Message"
            placeholder="Your Message"
            onChange={handleChange}
            value={formData.Message}
            required
            rows="4"
            className="w-full border-b-2 border-gray-300 focus:border-blue-500 px-2 py-2 outline-none transition duration-200 resize-none"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>

        {responseMsg && (
          <p className="mt-6 text-center text-sm text-green-600 font-medium">
            {responseMsg}
          </p>
        )}
      </div>
    </section>
  );
};

export default Contact;

