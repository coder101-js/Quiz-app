'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });
  const [loading, setLoading] = useState(false);

  const apiBase = '/api';

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${apiBase}/review`);
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to load reviews');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (num) => {
    setFormData((prev) => ({ ...prev, rating: num }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, review, rating } = formData;

    if (!name.trim() || !review.trim() || rating === 0) {
      toast.error('Please fill in all fields and give a rating ⭐');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          review: review.trim(),
          rating,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Error submitting review');
      }

      toast.success('Review submitted 🎉');
      setFormData({ name: '', review: '', rating: 0 });
      fetchReviews();
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Toaster position="top-center" />
      <h2 className="text-4xl font-bold mb-8 text-center text-black">User Reviews 💬</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left: Display Reviews */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-black">What people are saying 👇</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No reviews yet 😶 Be the first!</p>
          ) : (
            reviews.map((rev, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg shadow-sm bg-blue-700 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between mb-2 bg-blue-600">
                  <span className="font-semibold text-gray-900 dark:text-white">{rev.name || 'Anonymous'}</span>
                  <span className="text-yellow-400 text-lg">
                    {'⭐'.repeat(rev.rating)}{' '}
                    <span className="text-gray-300 dark:text-gray-700">{'☆'.repeat(5 - rev.rating)}</span>
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{rev.review}</p>
              </div>
            ))
          )}
        </div>

        {/* Right: Submit Review */}
        <form
          onSubmit={handleSubmit}
          className=" dark:bg-blue-900 p-6 rounded-xl shadow-md space-y-5 border"
        >
          <h3 className="text-2xl font-semibold text-blue-200 dark:text-white mb-4">Leave a Review ✍️</h3>

          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="review"
            placeholder="Write your thoughts..."
            className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            value={formData.review}
            onChange={handleChange}
          ></textarea>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                onClick={() => handleRating(num)}
                className={`text-2xl cursor-pointer transition-transform duration-200 ${
                  formData.rating >= num ? 'text-yellow-400 scale-110' : 'text-gray-300'
                } hover:scale-125`}
              >
                ⭐
              </span>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
