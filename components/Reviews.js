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
      const response = await fetch(`${apiBase}/review`);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
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

    if (!formData.name || !formData.review || formData.rating === 0) {
      toast.error('Fill out all fields + give a rating ⭐');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${apiBase}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          review: formData.review.trim(),
          rating: formData.rating,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Review submitted 🎉');
        setFormData({ name: '', review: '', rating: 0 });
        fetchReviews();
      } else {
        toast.error(result.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Toaster position="top-center" />
      <h2 className="text-3xl font-bold mb-6 text-center">User Reviews 💬</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* View Reviews */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">What people are saying 👇</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet 😶 Be the first!</p>
          ) : (
            reviews.map((rev, i) => (
              <div key={i} className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{rev.name}</span>
                  <span className="text-yellow-400">
                    {'⭐'.repeat(rev.rating)}{' '}
                    {'☆'.repeat(5 - rev.rating)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{rev.review}</p>
              </div>
            ))
          )}
        </div>

        {/* Submit Review */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md space-y-4"
        >
          <h3 className="text-2xl font-semibold mb-2">Leave a Review ✍️</h3>

          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="review"
            placeholder="Write your thoughts..."
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800"
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
                  formData.rating >= num
                    ? 'text-yellow-400 scale-110'
                    : 'text-gray-300'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
