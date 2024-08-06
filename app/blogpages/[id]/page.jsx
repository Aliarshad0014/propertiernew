"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarAlt,
  faUser,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FooterSection from "@/components/footer";

const Page = ({ params }) => {
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog post data
        const blogResponse = await axios.get(
          `https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/blogposts/${params.id}`
        );
        setBlogData(blogResponse.data);

        // Fetch comments data
        const commentsResponse = await axios.get(
          `https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/comments/${params.id}/`
        );

        // Normalize comments into an array
        const fetchedComments = commentsResponse.data;
        setComments(
          Array.isArray(fetchedComments) ? fetchedComments : [fetchedComments]
        );
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

  const { title, content, image_url, author, cover_photo_url } = blogData;

  // Format the created_at date
  const formattedDate = new Date(author.created_at).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const latestPosts = [
    {
      title: "5 Marla House for sale",
      time: "20 minutes ago",
      author: "Admin",
    },
    {
      title: "5 Marla House for sale",
      time: "20 minutes ago",
      author: "Admin",
    },
    {
      title: "5 Marla House for sale",
      time: "20 minutes ago",
      author: "Admin",
    },
    {
      title: "5 Marla House for sale",
      time: "20 minutes ago",
      author: "Admin",
    },
  ]; // Mock data for latest posts
  const categories = [
    { name: "Houses on Rent" },
    { name: "Lorem ipsum" },
    { name: "Lorem ipsum" },
    { name: "Lorem ipsum" },
    { name: "Lorem ipsum" },
    { name: "Lorem ipsum" },
  ]; // Mock data for categories

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div className="flex-grow max-w-6xl mx-auto p-4 mt-10 md:p-6 bg-white flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12 text-black">
        <div className="left-content flex-1">
          <Image
            width={100}
            height={100}
            src="https://dummyimage.com/200x200"
            alt={title}
            className="w-full h-1/2 lg:h-1/5 object-cover rounded-lg mb-6"
          />
          <h1 className="text-lg md:text-lg font-bold mb-2 mt-2">{title}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-2 justify-between">
            <span className="flex items-center mr-2">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="mr-1 text-yellow-500"
              />
              {formattedDate}
            </span>{" "}
            |
            <span className="flex items-center ml-1">
              <FontAwesomeIcon icon={faUser} className="mr-1 text-yellow-500" />
              {author.name}
            </span>
            <button className="ml-auto bg-[#FFCE58] hover:bg-red-500 transition-all text-white px-2 py-1 rounded text-xs">
              Follow
            </button>
          </div>
          <div className="blog-content text-sm md:text-sm leading-relaxed">
            {content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
          {/* Share Section */}
          <div className="share-section flex items-center justify-between mt-6 bg-gray-100 p-2">
            <span className="text-gray-600 mr-2">Share:</span>
            <div className="flex space-x-2">
              <a href="#" className="text-blue-600">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="text-blue-400">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="text-blue-600">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
          {/* Comments Section */}
          <div className="comments-section mt-8">
            <h2 className="text-xl font-bold mb-4">Comments</h2>
            {comments.length === 0 ? (
              <p>No comments available.</p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="mb-4 pb-10 border-b border-gray-200"
                >
                  <div className="flex items-center mb-2">
                    <Image
                      width={40}
                      height={40}
                      src={
                        comment.author.profile_picture_url ||
                        "https://via.placeholder.com/40"
                      }
                      alt={comment.author.name}
                      className="rounded-full"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold">{comment.author.name}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p>{comment.content}</p>
                </div>
              ))
            )}
          </div>
          {/* Post a Comment Form */}
          <div className="post-comment-form mt-8 ">
            <h2 className="text-xl font-bold mb-4">Post a Comment</h2>
            <form className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 p-2 bg-gray-100 rounded"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 p-2 bg-gray-100 rounded"
                />
              </div>
              <textarea
                placeholder="Your Comment Here"
                className="w-full p-2 bg-gray-100 rounded lg:h-60 h-36 resize-none"
              ></textarea>
              <button
                type="submit"
                className="bg-[#FFCE58] text-white px-4 py-2 rounded"
              >
                Post A Comment
              </button>
            </form>
          </div>
        </div>
        <div className="right-content w-full lg:w-1/3 space-y-8">
          {/* Latest Posts */}
          <div className="latest-posts bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-yellow-500">
              Recent Posts
            </h2>
            {latestPosts.map((post, index) => (
              <div
                key={index}
                className="mb-4 pb-4 border-b border-gray-200 flex items-center"
              >
                <Image
                  width={50}
                  height={50}
                  src="https://dummyimage.com/50x50"
                  alt={post.title}
                  className="object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="text-md font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-500">{post.time}</p>
                  <p className="text-sm text-gray-500">By {post.author}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Categories */}
          <div className="categories bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-4 border-b-2 border-yellow-500">
              Categories
            </h2>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="text-md text-gray-700 flex items-center"
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className=" text-gray-500"
                  />
                  <span className="ml-2">{category.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
