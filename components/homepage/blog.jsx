import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import noimg from "@/image/noImg.svg";

const BlogComponent = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get(
          "https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/blogposts/"
        );
        setBlogPosts(response.data.slice(0, 3)); // Get only the first 3 blog posts
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  // Function to truncate text to a maximum number of words
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="max-w-7xl mx-auto mb-20 lg:p-0 p-4">
      <h1 className="text-3xl font-semibold text-center mb-8 text-[#FFCE58]">
        Blogs
      </h1>
      <div className="grid grid-cols-1 lg:gap-6 gap-10 sm:grid-cols-3">
        {blogPosts.map((post) => (
          <div key={post.id} className="border rounded-lg flex flex-col h-full">
            <div
              className="w-full h-64 mb-4 overflow-hidden"
              style={{ width: "414px", height: "254px" }}
            >
              <Image
                src={post.image_url ?? noimg}
                alt={post.title}
                className="w-full h-full object-contain"
                width={414}
                height={254}
                onError={(e) => {
                  e.currentTarget.src = noimg;
                }}
              />
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-600">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {truncateText(post.content, 50)}
                  {post.content.split(" ").length > 50 && (
                    <Link href={`/blogpages/${post.id}`}>
                      <div className="text-blue-500 hover:underline">
                        {" "}
                        ...see more
                      </div>
                    </Link>
                  )}
                </p>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <p className="text-gray-700 font-semibold">
                  By {post.author.name}
                </p>
                <Link href={`/blogpages/${post.id}`}>
                  <div className="mt-2 bg-[#FFCE58] hover:bg-black transition-all text-white font-semibold py-2 px-4 rounded">
                    Read More
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/blogpages" className="flex w-fill justify-center">
          <div className="bg-[#FFCE58] w-fit text-white py-2 px-4 rounded-lg hover:bg-black transition-all">
            View All Blogs
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BlogComponent;
