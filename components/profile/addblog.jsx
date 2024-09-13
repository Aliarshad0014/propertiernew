import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "@/config/axios"; // Import Axios
import Swal from "sweetalert2";
import ScaleLoader from "react-spinners/ScaleLoader";

const AddBlogsComponent = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [view, setView] = useState("addBlog");
  const [tagsOptions, setTagsOptions] = useState([]);
  const [categoriesOptions, setCategoriesOptions] = useState([]);
  const [userBlog, setUserBlog] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);

  const hasWindow = typeof window !== "undefined";
  let user;

  if (hasWindow) {
    user = JSON.parse(localStorage.getItem("user"));
  }

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

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleSlugChange = (e) => setSlug(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleTagsChange = (e) => setTags(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  useEffect(() => {
    // Fetch Blog Tags
    const fetchTags = async () => {
      try {
        const response = await axios.get("/properties/blog-tags/");
        setTagsOptions(response.data);
      } catch (error) {
        console.error("Error fetching tags: ", error);
      }
    };

    // Fetch Blog Categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/mob/v1/blog-categories/");
        setCategoriesOptions(response.data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(
          `properties/user-blogposts/${user?.id}/`
        );
        setUserBlog(response.data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchTags();
    fetchCategories();
    fetchUserBlogs();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Store the actual file object
  };

  const generateSlug = (title) => {
    return title
      .trim() // Trim leading and trailing spaces
      .toLowerCase() // Convert to lowercase
      .replace(/[^a-z0-9_-]+/g, "-") // Replace invalid characters with hyphen
      .replace(/--+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Remove leading or trailing hyphens
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoad(true);
    const slugGenerted = generateSlug(title);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slugGenerted); // Generate slug from title
    formData.append("category_id", category);
    formData.append("author_id", user?.id); // Example static author_id
    formData.append("content", description);
    formData.append("image", image);
    formData.append("tag_ids", tags); // Assuming tags are a single string for simplicity

    try {
      const response = await axios.post("/properties/blogposts/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBtnLoad(false);
      setTitle("");
      setImage(null);
      setDescription("");
      setTags("");
      setCategory("");
      setView("currentBlogDetails");
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Blog Added Successfully",
      });
      // console.log("Blog posted successfully: ", response.data);
    } catch (error) {
      setBtnLoad(false);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      if (error.response) {
        if (error.response.status === 413) {
          // Handle 413 Payload Too Large error
          Toast.fire({
            icon: "error",
            title:
              "Payload too large. Please reduce the size of the files you are uploading.",
          });
        } else if (error.response.data) {
          const errorData = error.response.data;

          // If errorData is an object with multiple errors, show them one by one
          if (typeof errorData === "object") {
            Object.entries(errorData).forEach(([key, message]) => {
              Toast.fire({
                icon: "error",
                title: `${key}: ${message}`,
              });
            });
          } else {
            // If the errorData is a string or a single message, show it directly
            Toast.fire({
              icon: "error",
              title: errorData,
            });
          }
        } else {
          if (error.response.status === 413) {
            // Handle 413 Payload Too Large error
            Toast.fire({
              icon: "error",
              title:
                "Payload too large. Please reduce the size of the files you are uploading.",
            });
          }
          // Fallback in case the error response doesn't contain data
          else {
            Toast.fire({
              icon: "error",
              title: "An unexpected error occurred.",
            });
          }
        }
      } else {
        // Handle other types of errors
        Toast.fire({
          icon: "error",
          title: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-autopy-8 bg-white text-black max-w-4xl">
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setView("addBlog")}
            className={`px-4 py-2 rounded-md shadow-sm transition-all ${
              view === "addBlog"
                ? "bg-[#FFCE58] text-white"
                : "bg-gray-200 text-black"
            }`}>
            Add Blog
          </button>
          <button
            onClick={() => setView("currentBlogDetails")}
            className={`px-4 py-2 rounded-md shadow-sm transition-all ${
              view === "currentBlogDetails"
                ? "bg-[#FFCE58] text-white"
                : "bg-gray-200 text-black"
            }`}>
            Current Blog Details
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
                value={title}
                onChange={handleTitleChange}
                className="mt-1 block w-full rounded-none border p-2 border-gray-300 shadow-sm"
              />
            </div>
            {/* <div>
              <label className="block text-gray-700">Blog Slug</label>
              <input
                type="text"
                value={slug}
                onChange={handleSlugChange}
                className="mt-1 block w-full rounded-none border p-2 border-gray-300 shadow-sm"
              />
            </div> */}
            <div>
              <label className="block text-gray-700">Blog Image</label>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/jpeg"
                className="mt-1 block w-full rounded-none border p-2 border-gray-300 shadow-sm"
              />
              {image && (
                <Image
                  width={100}
                  height={100}
                  src={URL.createObjectURL(image)} // Use URL.createObjectURL to display the image preview
                  alt="Blog"
                  className="mt-2 w-full h-64 object-cover"
                />
              )}
            </div>
            <div>
              <label className="block text-gray-700">Blog Description</label>
              <textarea
                value={description}
                onChange={handleDescriptionChange}
                className="mt-1 block w-full rounded-none border p-2 border-gray-300 shadow-sm"
                rows="5"
              />
            </div>
            <div>
              <label className="block text-gray-700">Blog Tags</label>
              <select
                name="tags"
                value={tags}
                onChange={handleTagsChange}
                className="mt-1 block w-full rounded-none border p-2 border-gray-300 shadow-sm">
                <option value="">Select a tag</option>
                {tagsOptions.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Blog Category</label>
              <select
                name="category"
                value={category}
                onChange={handleCategoryChange}
                className="mt-1 block w-full rounded-none border p-2 border-gray-300 shadow-sm">
                <option value="">Select a category</option>
                {categoriesOptions.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {btnLoad ? (
                <div className="flex justify-center items-center">
                  <ScaleLoader color="#eab308" />
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 transition-all">
                  Add Blog
                </button>
              )}
            </div>
          </form>
        ) : (
          view === "currentBlogDetails" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoBlogs.map((blog, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden">
                  <div
                    className="bg-cover bg-center h-48"
                    style={{ backgroundImage: `url(${blog.image})` }}>
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
          )
        )}
      </div>
    </div>
  );
};

export default AddBlogsComponent;
