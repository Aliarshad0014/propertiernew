"use client";
import React, { useRef, useState, useEffect, useContext } from "react";
import { FaBell } from "react-icons/fa";
import AwardsComponent from "@/components/profile/awards";
import Properties from "@/components/profile/properties";
import NewListingComponent from "@/components/profile/newlisting";
import ShortVideosGridComponent from "@/components/profile/shortvideos";
import AddBlogsComponent from "@/components/profile/addblog";
import CorporateServices from "@/components/profile/corporate";
import Franchise from "@/components/profile/franchise";
import "../../app/globals.css";
import propertyImg from "@/image/corporate.png";
import Image from "next/image";
import noImg from "@/image/noImg.svg";
import moment from "moment";
import url from "@/config/axios";
import { ChatContext } from "@/Contexts/ChatContext";

const UserProfile = () => {
  const { setIsUser } = useContext(ChatContext);

  const [activeSection, setActiveSection] = useState("Awards");
  const [coverPhoto, setCoverPhoto] = useState();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false); // State for upload status

  const hasWindow = typeof window !== "undefined";
  let user;

  if (hasWindow) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const sectionContent = {
    Awards: <AwardsComponent />,
    Properties: <Properties />,
    "New Listing": (
      <NewListingComponent handleSectionChange={handleSectionChange} />
    ),
    "Short Videos": <ShortVideosGridComponent />,
    "Add Blogs": <AddBlogsComponent />,
  };

  useEffect(() => {
    setCoverPhoto(user?.cover_photo_url ? user.cover_photo_url : propertyImg);
  }, [user]);

  const handleEditCoverPhoto = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCoverPhotoChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true); // Start uploading state
      const formData = new FormData();
      formData.append("cover_photo", file);
      formData.append("firebase_id", user?.firebase_id);
      formData.append("email", user?.email);
      formData.append("type", user?.type);

      try {
        const response = await url.put(
          `accounts/customers/${user.id}/`,
          formData,
          {
            headers: {
              // Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Ensure content type is set
            },
          }
        );

        // Ensure response is successful
        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem("user", JSON.stringify(data));

          console.log("Upload successful:", data);
          setCoverPhoto(data.cover_photo_url); // Update cover photo with the new URL
        } else {
          console.error("Unexpected response status:", response.status);
          alert("Failed to upload cover photo. Please try again.");
        }
      } catch (error) {
        // Enhanced error logging
        console.error("Error uploading cover photo:", error);
        if (error.response) {
          // Server responded with a status other than 200
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
          alert(
            `Failed to upload cover photo: ${
              error.response.data.message || "Please try again."
            }`
          );
        } else if (error.request) {
          // No response was received
          console.error(
            "Request made but no response received:",
            error.request
          );
          alert("No response from server. Please try again later.");
        } else {
          // Something else happened
          console.error("Error:", error.message);
          alert(`Error: ${error.message}`);
        }
      } finally {
        setIsUploading(false); // End uploading state
      }
    }
  };

  const handleNotifications = () => {
    alert("Notifications feature is under development.");
  };
  // const file = event.target.files[0];
  return (
    <div className="bg-white min-h-screen w-full mt-5">
      <div className="container mx-auto px-2 py-8 bg-white text-black max-w-[95%]">
        <div className="mb-4">
          <div className="relative">
            <Image
              src={coverPhoto}
              alt="Cover"
              layout="responsive" // Maintain aspect ratio and ensure clarity
              width={1000} // Set a larger width in pixels to improve resolution
              height={250}
              className="w-full !h-[250px] object-cover rounded-lg shadow-md"
            />
            <div className="absolute top-0 right-0 flex justify-end mt-2 mr-4 space-x-2">
              <button className="bg-[#FFCE58] hover:bg-yellow-600 transition-all text-white px-4 py-2 rounded">
                Support
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 cursor-pointer transition-all text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsUser(false);
                  localStorage.removeItem("user");
                }}>
                Logout
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 transition-all text-white px-4 py-2 rounded"
                onClick={handleEditCoverPhoto}>
                Edit Cover Photo
              </button>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleCoverPhotoChange}
                disabled={isUploading}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row lg:space-x-2">
          {/* Left Div - User Info */}
          <div className="w-full md:w-[30%] bg-gray-50 shadow-lg flex flex-col items-center p-8 min-h-screen">
            <div className="sticky top-0 pt-8 mb-4">
              <div className="flex justify-between">
                <Image
                  src={
                    user?.profile_picture_url
                      ? user?.profile_picture_url
                      : noImg
                  }
                  width={100}
                  height={100}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-md shadow-md"
                />
                <button
                  className="text-red-500 flex top-0 hover:text-black focus:outline-none"
                  onClick={handleNotifications}>
                  <FaBell size={24} />
                </button>
              </div>
              <h2 className="text-xl font-bold mt-2 text-start">
                {user?.name}
              </h2>
              <div className="mt-2">
                <button className="bg-[#FFCE58] hover:bg-black transition-all text-white px-4 py-2 rounded w-full lg:w-auto">
                  Edit Your Profile
                </button>
              </div>
              <div className="mt-4 text-left bg-gray-100 font-light shadow-lg rounded-md space-y-2 p-4 lg:p-2">
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {user?.phone_number ?? "-"}
                </p>
                <p className="hover:underline cursor-pointer text-green-500">
                  <strong>Followers:</strong>{" "}
                  {user?.followers?.length === 0 ? 0 : user?.followers?.length}
                </p>
                <p>
                  <strong>Address:</strong> {user?.address}
                </p>
                <p>
                  <strong>Since:</strong>{" "}
                  {moment(user?.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap justify-center lg:justify-start">
                <button className="bg-[#FFCE58] hover:bg-black transition-all text-white px-4 py-2 rounded mr-2 mt-2">
                  Manage HRM
                </button>
                <button className="bg-[#FFCE58] hover:bg-black transition-all text-white px-4 py-2 rounded mr-2 mt-2">
                  Manage CRM
                </button>
                <button className="bg-[#FFCE58] hover:bg-black transition-all text-white px-4 py-2 rounded mt-2 mr-2">
                  Manage ERP
                </button>
                <button className="bg-black hover:bg-[#FFCE58] transition-all text-white px-4 py-2 rounded mt-2">
                  Your Website
                </button>
              </div>
            </div>
          </div>

          {/* Right Div - Sections based on Headings (Horizontal Layout) */}
          <div className="w-full md:w-[70%] p-6 bg-white shadow-xl overflow-y-auto">
            <div className="flex mb-4 flex-wrap">
              {/* Render all sections based on headings */}
              {Object.keys(sectionContent).map((section) => (
                <button
                  key={section}
                  className={`text-md font-regular mr-8 mb-4 ${
                    activeSection === section
                      ? "font-bold text-yellow-500"
                      : "text-black"
                  }`}
                  onClick={() => handleSectionChange(section)}>
                  {section}
                </button>
              ))}
            </div>
            {/* Render section content based on active section */}
            <div>{sectionContent[activeSection]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
