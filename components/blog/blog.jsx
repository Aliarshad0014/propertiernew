"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const BlogPage = () => {
  const [mainBlog, setMainBlog] = useState(null);
  const [staffPicks, setStaffPicks] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get('https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/blogposts/');
        const data = response.data;

        // Assuming the first blog post is the main blog
        setMainBlog(data[0]);

        // Assuming the next four blog posts are staff picks
        setStaffPicks(data.slice(1, 5));

        // The remaining blog posts
        setBlogs(data.slice(5));
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogData();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <main className="max-w-7xl mx-auto p-6">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          <div className="lg:col-span-2 bg-white shadow-lg rounded-lg">
            {mainBlog && (
              <>
                <Image
                  src={mainBlog.image_url}
                  width={100}
                  height={100}
                  alt="Main Blog"
                  className="w-full object-cover"
                  style={{ width: '514px', height: '500px' }}
                  priority
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-black">{mainBlog.title}</h2>
                </div>
              </>
            )}
          </div>
          <aside className="p-4 rounded-lg text-black">
            <h3 className="font-semibold mb-4">Staff Picks</h3>
            <ul className="space-y-4">
              {staffPicks.map((pick, index) => (
                <li key={index} className="hover:bg-gray-100 p-6 rounded-md">
                  <h4 className="text-sm font-bold">{pick.title}</h4>
                </li>
              ))}
            </ul>
          </aside>
        </section>
        <section className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-gray-100 rounded-lg hover:shadow-xl shadow-md">
              <Image
                src={blog.image_url}
                alt={`Blog ${index + 1}`}
                width={100}
                height={100}
                className="w-full object-cover"
                style={{ width: '290px', height: '178px' }}
              />
              <div className="p-4">
                <span className="text-gray-500 block">Blog Title</span>
                <h3 className="mt-2 text-lg font-semibold">{blog.title}</h3>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
