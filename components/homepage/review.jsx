import React, { useState } from "react";

const UserReviews = ({ data }) => {
  const [currentReview, setCurrentReview] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "left") {
      setCurrentReview((prev) => (prev === data.length - 1 ? 0 : prev + 1));
    } else if (direction === "right") {
      setCurrentReview((prev) => (prev === 0 ? data.length - 1 : prev - 1));
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.97 0 1.371 1.24.588 1.81l-3.379 2.455a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.379-2.455a1 1 0 00-1.175 0l-3.379 2.455c-.784.57-1.84-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.3 9.397c-.784-.57-.382-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 p-6 mb-10">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Client Review</h1>
      <h2 className="text-lg font-regular mb-20 text-gray-500">What our clients say about us?</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:w-2/3 bg-none rounded-lg">
        {data.slice(0, 3).map((review) => (
          <div key={review.id} className="relative bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div className="absolute top-0 left-16 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={review.user_profile_picture}
                alt="Image"
                className="rounded-full h-24 w-24 border-4 border-yellow-500 bg-black text-center justify-center items-center flex text-xs shadow-lg"
              />
            </div>
            <div className="mt-20 flex-grow">
              <p className="text-gray-500 p-3">{review.description}</p>
            </div>
            <div className="pt-4 flex justify-between items-center bg-gray-100 rounded-md p-4">
              <p className="text-gray-900 text-sm">{review.user_name}</p>
              <div className="flex w-24">{renderStars(review.rating)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a href="/" className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-black transition-all">
          View All Reviews
        </a>
      </div>
    </div>
  );
};

export default UserReviews;
