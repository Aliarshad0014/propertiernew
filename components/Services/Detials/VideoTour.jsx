// pages/VideoTour.js
import HeartIcon from "@/icons/HeartIcon";
import ShareIcon from "@/icons/ShareIcon";
import Image from "next/image";
import { useState } from "react";

export default function VideoTour({ videoSrc }) {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Comment submitted: " + comment);
  };

  return (
    <div className="mt-5 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 flex justify-start w-full">
        Video Tour
      </h1>
      <div className="flex w-full gap-7">
        <div className="flex w-[70%]">
          <div className="relative w-full">
            <video className="w-full h-[350px]" controls>
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex justify-center items-center">
              <button className="bg-white p-2 rounded-full shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.5-11.5a.5.5 0 01.832-.374L13 10l-3.668 3.874A.5.5 0 0110 14V6.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-[30%]">
          <h2 className="text-xl font-bold mb-4">Ask Your Question</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Comment*"
              rows={7}
              className="w-full h-full p-2 border border-gray-300 rounded mb-4"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-white py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="flex mt-6 justify-start w-full">
        <button className="bg-yellow-500 text-white py-2 px-4 rounded mr-2">
          GET SERVICE
        </button>
        <button className="bg-yellow-100 text-yellow-500 py-2 px-4 rounded mr-2">
          <HeartIcon />
        </button>
        <button className="bg-yellow-100 text-yellow-500 py-2 px-4 rounded">
          <ShareIcon />
        </button>
      </div>
    </div>
  );
}
