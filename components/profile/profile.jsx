"use client";
import React, { useState } from "react";
import { FaBell } from "react-icons/fa"; // Import the bell icon
import AwardsComponent from "@/components/profile/awards";
import Properties from "@/components/profile/properties";
import NewListingComponent from "@/components/profile/newlisting";
import ShortVideosGridComponent from "@/components/profile/shortvideos";
import AddBlogsComponent from "@/components/profile/addblog";
import CorporateServices from "@/components/profile/corporate";
import Franchise from "@/components/profile/franchise";
import "../../app/globals.css";

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("Awards"); // State for active section

  // Example user data (replace with actual data)
  const userData = {
    name: "John Doe",
    profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    following: 500,
    followers: 178,
    totalAds: 20,
    appreciations: 100,
    address: "123 Main St, Cityville",
    since: "January 2020",
  };

  // Content for each section (replace with actual content)
  const sectionContent = {
    Awards: <AwardsComponent />,
    Properties: <Properties />,
    "New Listing": <NewListingComponent />,
    "Short Videos": <ShortVideosGridComponent />,
    Franchise: <Franchise />,
    "Corporate Services": <CorporateServices />,
    "Add Blogs": <AddBlogsComponent />,
  };

  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  // Placeholder function for handling notifications
  const handleNotifications = () => {
    // Add logic for displaying notifications
    alert("Notifications feature is under development.");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 bg-white text-black max-w-7xl">
        {/* Cover Photo and Buttons Section */}
        <div className="mb-4">
          <div className="relative">
            <img
              src="https://propertier.com.pk/storage/user/2024-06-26-667c071dabb45.jpg"
              alt="Cover"
              className="w-full h-64 object-fill rounded-lg shadow-md"
            />
            <div className="absolute top-0 right-0 flex justify-end mt-2 mr-4 space-x-2">
              <button className="bg-[#FFCE58] hover:bg-yellow-600 transition-all text-white px-4 py-2 rounded">
                Support
              </button>
              <button className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded">
                Logout
              </button>
              <button className="bg-gray-500 hover:bg-gray-600 transition-all text-white px-4 py-2 rounded">
                Edit Cover Photo
              </button>
              {/* Bell icon for notifications */}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          {/* Left Div - User Info */}
          <div className="w-full lg:w-1/3 bg-gray-50 shadow-lg flex flex-col items-center p-8 min-h-screen">
            <div className="sticky top-0 pt-8 mb-4">
              <div className="flex justify-between">
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-md shadow-md"
                />
                <button
                  className="text-red-500 flex top-0 hover:text-black focus:outline-none"
                  onClick={handleNotifications}
                >
                  <FaBell size={24} />
                </button>
              </div>
              <h2 className="text-xl font-bold mt-2 text-start">
                {userData.name}
              </h2>
              <div className="mt-2">
                <button className="bg-[#FFCE58] hover:bg-black transition-all text-white px-4 py-2 rounded w-full lg:w-auto">
                  Edit Your Profile
                </button>
              </div>
              <div className="mt-4 text-left bg-gray-100 font-light shadow-lg rounded-md space-y-2 p-4 lg:p-2">
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {userData.phoneNumber}
                </p>
                <p className="hover:underline cursor-pointer text-green-500">
                  <strong>Following:</strong> {userData.following}
                </p>
                <p className="hover:underline cursor-pointer text-green-500">
                  <strong>Followers:</strong> {userData.followers}
                </p>
                <p>
                  <strong>Total Ads:</strong> {userData.totalAds}
                </p>
                <p>
                  <strong>Appreciations:</strong> {userData.appreciations}
                </p>
                <p>
                  <strong>Address:</strong> {userData.address}
                </p>
                <p>
                  <strong>Since:</strong> {userData.since}
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
          <div className="w-full lg:w-2/3 p-6 bg-white shadow-xl overflow-y-auto">
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
                  onClick={() => handleSectionChange(section)}
                >
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
