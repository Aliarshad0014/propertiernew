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
import noImg from "@/image/noImg.svg";
import moment from "moment";

const Page = ({ params }) => {
  const [blogData, setBlogData] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        // Fetch blog post data
        const blogResponse = await axios.get(
          `https://propertier-p2wwcx3okq-em.a.run.app/properties/blogposts/${params.id}`
        );
        setBlogData(blogResponse.data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setError((prevError) => ({
          ...prevError,
          blogError: "Failed to load blog data.",
        }));
      } finally {
        setLoading(false);
      }
    };

    const fetchLatestPosts = async () => {
      try {
        // Fetch latest posts data
        const latestPostsResponse = await axios.get(
          `https://propertier-p2wwcx3okq-em.a.run.app/properties/blogposts`
        );
        setLatestPosts(latestPostsResponse.data.slice(0, 5)); // Get the latest 5 posts
      } catch (error) {
        console.error("Error fetching latest posts:", error);
      }
    };

    fetchBlogData();
    fetchLatestPosts();
  }, [params.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (!blogData) {
    return (
      <div className="h-screen flex items-center justify-center text-black">
        No blog data available
      </div>
    );
  }

  const { title, content, image_url, author, tags, category } = blogData;

  // Format the created_at date
  const formattedDate = new Date(author.created_at).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      <div className="flex-grow max-w-6xl mx-auto p-4 mt-10 md:p-6 bg-white flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-12 text-black">
        <div className="left-content flex-1">
          <Image
            width={100}
            height={100}
            src={image_url || "https://dummyimage.com/200x200"}
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
                  className="mb-4 pb-10 border-b border-gray-200">
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
        </div>
        {/* Right Sidebar */}
        <div className="right-content w-full lg:w-1/3 space-y-8">
          {/* Author Section */}
          <div className="author-section bg-gray-50 p-4 rounded-md text-center">
            <Image
              width={100}
              height={100}
              src={
                author?.profile_picture_url
                  ? author?.profile_picture_url
                  : noImg
              }
              alt={author.name}
              className="rounded-full mx-auto mb-4"
            />
            <h2 className="text-lg font-bold">{author.name}</h2>
            <p className="text-sm text-gray-500">{author.about}</p>
            <p className="text-sm text-gray-500 mt-2">{author.address}</p>
            <p className="text-sm text-gray-500 mt-2">{author.phone_number}</p>
          </div>
          {/* Tags Section */}
          <div className="tags-section bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-yellow-200 text-yellow-700 px-2 py-1 rounded-full text-xs">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
          {/* Category Section */}
          <div className="category-section bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Category</h2>
            <div className="flex items-center space-x-4">
              <Image
                width={50}
                height={50}
                src={category?.image_url ? category?.image_url : noImg}
                alt={category.name}
                className="rounded-full"
              />
              <div>
                <h3 className="text-sm font-bold">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
            </div>
          </div>
          {/* Latest Posts Section */}
          <div className="latest-posts-section bg-gray-50 p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Latest Posts</h2>
            <ul className="space-y-7">
              {latestPosts.map((post) => (
                <li key={post.id} className="flex items-center space-x-4">
                  <Image
                    width={50}
                    height={50}
                    src={post?.image_url ? post?.image_url : noImg}
                    alt={post.title}
                    className="rounded-md"
                  />
                  <div>
                    <h3 className="text-sm font-bold">{post.title}</h3>
                    <p className="text-sm text-gray-500">
                      {/* {new Date(post.created_at).toLocaleDateString()} */}
                      {moment(post.created_at).format("DD MMM YYYY")}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ml-auto text-gray-400"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* <FooterSection /> */}
    </div>
  );
};

export default Page;
