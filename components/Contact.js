'use client';

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Message: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Name, Email, Phone, Message } = formData;

    if (!Name || !Email || !Phone || !Message) {
      toast.error('Please fill in all fields 😬');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to send message');

      toast.success('✅ Message sent successfully!');
      setFormData({ Name: '', Email: '', Phone: '', Message: '' });
    } catch (err) {
      toast.error('❌ Something went wrong. Try again!');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-blue-800 mb-8">
          Contact Us 📬
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
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-md transition ${
              loading
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
