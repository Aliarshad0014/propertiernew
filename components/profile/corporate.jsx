import React, { useState } from "react";
import FooterSection from "../footer";
import Image from "next/image";

const CorporateServices = () => {
  const [formValues, setFormValues] = useState({
    projectName: "",
    discount: "",
    startDate: "",
    endDate: "",
    flyer: null,
    appliedOn: "",
  });

  const [showBanner, setShowBanner] = useState(false);
  const [activeTab, setActiveTab] = useState("addNew"); // State to manage active tab

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFormValues({
      ...formValues,
      flyer: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formValues);
    // Reset form after submission
    setFormValues({
      projectName: "",
      discount: "",
      startDate: "",
      endDate: "",
      flyer: null,
      appliedOn: "",
    });
  };

  const toggleSection = () => {
    setShowBanner(!showBanner);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowBanner(tab === "corporateMarketing"); // Show banner based on tab click
  };

  return (
    <div className="mt-6">
      <div className="flex flex-wrap justify-center md:justify-start space-x-2 lg:space-y-0  space-y-2 mb-4 text-gray-600">
        <button
          className={`px-4 py-2 ${
            activeTab === "addNew"
              ? "bg-[#FFCE58] text-black"
              : "bg-gray-200 hover:bg-gray-300"
          } rounded`}
          onClick={() => handleTabClick("addNew")}
        >
          Add New
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "corporateMarketing"
              ? "bg-[#FFCE58] text-black"
              : "bg-gray-200 hover:bg-gray-300"
          } rounded`}
          onClick={() => handleTabClick("corporateMarketing")}
        >
          Corporate Marketing with Propertier
        </button>
      </div>

      {!showBanner && (
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formValues.projectName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="discount"
                  className="block text-sm font-medium text-gray-700"
                >
                  Discount
                </label>
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  value={formValues.discount}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Offer Starts From
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formValues.startDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Offer Ends On
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formValues.endDate}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="flyer"
                  className="block text-sm font-medium text-gray-700"
                >
                  Upload Flyer
                </label>
                <input
                  type="file"
                  id="flyer"
                  name="flyer"
                  onChange={handleFileUpload}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="appliedOn"
                  className="block text-sm font-medium text-gray-700"
                >
                  Applied On
                </label>
                <select
                  id="appliedOn"
                  name="appliedOn"
                  value={formValues.appliedOn}
                  onChange={handleInputChange}
                  className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select</option>
                  <option value="Website">Website</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Email">Email</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {showBanner && (
        <div className="rounded-md p-4 mt-4">
          <div className="bg-cover bg-center h-72 relative">
            <Image
              width={100}
              height={100}
              className="absolute inset-0 w-full h-full object-cover"
              src="https://via.placeholder.com/150"
              alt="Banner Image"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="bg-[#FFCE58] text-black px-4 py-2 rounded">
                Feature Your Ad
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorporateServices;
