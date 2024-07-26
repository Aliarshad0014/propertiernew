"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import FooterSection from "../footer";
import Link from "next/link";

const BlogPage = () => {
  const [mainBlog, setMainBlog] = useState(null);
  const [staffPicks, setStaffPicks] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          "https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/blogposts/"
        );
        const data = response.data;

        setMainBlog(data[0]);
        setStaffPicks(data.slice(1, 5));
        setBlogs(data.slice(5));
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return `${formattedTime} | ${formattedDate}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-yellow-500 mt-10">
          Recent Blogs
        </h2>
        <div className="flex flex-col md:flex-row gap-1">
          <div className="w-full md:w-1/2">
            {mainBlog && (
              <Link href={`/blogpages/${mainBlog.id}`}>
                <div className="h-80 w-full relative cursor-pointer hover:shadow-lg">
                  <Image
                    src={mainBlog.image_url}
                    alt={mainBlog.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-0 w-full bg-gray-700 bg-opacity-30 p-4">
                    <h2 className="text-xl font-semibold text-white">
                      {mainBlog.title}
                    </h2>
                    <p className="text-sm text-gray-300">
                      {formatDate(mainBlog.published_date)}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="w-full md:w-1/2 grid grid-cols-2 sm:grid-cols-2 gap-1 h-80">
            {staffPicks.map((pick, index) => (
              <Link key={index} href={`/blogpages/${pick.id}`}>
                <div className="relative cursor-pointer h-full hover:shadow-lg transition-all">
                  <Image
                    src={pick.image_url}
                    alt={pick.title}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-0 w-full bg-gray-700 bg-opacity-30 p-2 group-hover:bg-opacity-50 transition-all">
                    <h3 className="lg:text-sm text-xs font-semibold text-white truncate">
                      {pick.title}
                    </h3>
                    <p className="lg:text-sm text-xs text-gray-300">
                      {formatDate(pick.published_date)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-6 text-yellow-500 mt-10">
          Latest Blogs
        </h2>

        <div className=" flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((post) => (
              <Link key={post.id} href={`/blogpages/${post.id}`}>
                <div className="relative cursor-pointer ">
                  <div className="relative h-60 w-full overflow-hidden hover:shadow-lg">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      quality={100}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="pt-4">
                    <p className="text-xs font-medium text-yellow-500">
                      {formatDate(post.published_date)}
                    </p>
                    <h3 className="text-base font-semibold mt-2 text-gray-700">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="w-full lg:w-1/4 p-4 bg-gray-100 text-black">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Advertisements
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
