import React, { useState } from "react";

const AddBlogsComponent = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    image: "",
    description: "",
    tags: "",
    category: "",
  });

  const [view, setView] = useState("addBlog");

  const demoBlogs = [
    {
      title: "Sample Blog 1",
      image: "https://via.placeholder.com/300",
      description: "This is a description for sample blog 1.",
      views: 1234,
      earnings: "$500",
      comments: 56,
      likes: 78,
    },
    {
      title: "Sample Blog 2",
      image: "https://via.placeholder.com/300",
      description: "This is a description for sample blog 2.",
      views: 2345,
      earnings: "$600",
      comments: 67,
      likes: 89,
    },
  ];

  const payoutData = {
    balance: "$2000",
    withdrawalDate: "2024-07-15",
    withdrawalAmount: "$1000",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBlogData({
      ...blogData,
      image: file ? URL.createObjectURL(file) : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog Data Submitted: ", blogData);
  };

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4 py-8 bg-white text-black max-w-4xl">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setView("addBlog")}
            className={`px-4 py-2 rounded-md shadow-sm transition-all ${
              view === "addBlog"
                ? "bg-[#FFCE58] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Add Blog
          </button>
          <button
            onClick={() => setView("currentBlogDetails")}
            className={`px-4 py-2 rounded-md shadow-sm transition-all ${
              view === "currentBlogDetails"
                ? "bg-[#FFCE58] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Current Blog Details
          </button>
          <button
            onClick={() => setView("payoutDetails")}
            className={`px-4 py-2 rounded-md shadow-sm transition-all ${
              view === "payoutDetails"
                ? "bg-[#FFCE58] text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            Payout
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-8">
          {view === "addBlog"
            ? "Add Blog"
            : view === "currentBlogDetails"
            ? "Current Blog Details"
            : "Payout"}
        </h2>
        {view === "addBlog" ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Blog Title</label>
              <input
                type="text"
                name="title"
                value={blogData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-none border-b border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Blog Image</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="mt-1 block w-full rounded-none border-b border-gray-300 shadow-sm"
              />
              {blogData.image && (
                <img
                  src={blogData.image}
                  alt="Blog"
                  className="mt-2 w-full h-64 object-cover"
                />
              )}
            </div>
            <div>
              <label className="block text-gray-700">Blog Description</label>
              <textarea
                name="description"
                value={blogData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-none border-b border-gray-300 shadow-sm"
                rows="5"
              />
            </div>
            <div>
              <label className="block text-gray-700">Blog Tags</label>
              <input
                type="text"
                name="tags"
                value={blogData.tags}
                onChange={handleChange}
                className="mt-1 block w-full rounded-none border-b border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-gray-700">Blog Category</label>
              <input
                type="text"
                name="category"
                value={blogData.category}
                onChange={handleChange}
                className="mt-1 block w-full rounded-none border-b border-gray-300 shadow-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-all"
              >
                Add Blog
              </button>
            </div>
          </form>
        ) : view === "currentBlogDetails" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demoBlogs.map((blog, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div
                  className="bg-cover bg-center h-48"
                  style={{ backgroundImage: `url(${blog.image})` }}
                >
                  <div className="bg-black bg-opacity-50 h-full flex items-center justify-center text-white text-xl font-bold">
                    {blog.title}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-700">{blog.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <p>Views: {blog.views}</p>
                      <p>Earnings: {blog.earnings}</p>
                    </div>
                    <div>
                      <p>Comments: {blog.comments}</p>
                      <p>Likes: {blog.likes}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-700 space-y-2">
            <p className="text-lg">Balance: {payoutData.balance}</p>
            <p className="text-lg">
              Withdrawal Date: {payoutData.withdrawalDate}
            </p>
            <p className="text-lg">
              Withdrawal Amount: {payoutData.withdrawalAmount}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlogsComponent;
