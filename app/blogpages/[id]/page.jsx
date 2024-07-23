"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Page = ({ params }) => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/blogposts/${params.id}`
        );
        setBlogData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!blogData) {
    return <div>No blog data available</div>;
  }

  const { title, content, image_url, author,cover_photo_url } = blogData;
  const latestPosts = [
    { title: "Post 1" },
    { title: "Post 2" },
    { title: "Post 3" }
  ]; // Mock data for latest posts
  const categories = [
    { name: "Category 1", image_url: "https://dummyimage.com/200x200", count: 5 },
    { name: "Category 2", image_url: "https://dummyimage.com/200x200", count: 10 }
  ]; // Mock data for categories

  return (
    <div className="bg-white min-h-screen p-4 md:p-8">
      <div className="blog-read-page max-w-6xl mx-auto p-4 md:p-6 bg-white flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12 text-black">
        <div className="left-content flex-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-gray-600 mb-4">by {author.name}</p>
          <Image
          width={100}
          height={100}
            src={cover_photo_url}
            alt={title}
            className="w-full h-auto lg:h-1/6 object-cover rounded-lg mb-6"
          />
          <div className="blog-content text-base md:text-lg leading-relaxed">
            {content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="right-content w-full lg:w-1/4">
          <div className="latest-posts mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Latest Posts</h2>
            <ul className="list-disc list-inside">
              {latestPosts.map((post, index) => (
                <li key={index} className="mb-2">
                  {post.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="categories">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Categories</h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <Image
                    width={100}
                    height={100}
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-between items-end p-4">
                    <h3 className="text-white font-bold">{category.name}</h3>
                    <span className="text-white bg-blue-600 rounded-full px-2 py-1 text-sm">{category.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
