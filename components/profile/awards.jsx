import React, { useState, useEffect } from "react";
import url from "@/config/axios";
import moment from "moment";
import Swal from "sweetalert2";

const AwardsComponent = () => {
  const [allAwardsServices, setAllAwardsServices] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalBlazingVisible, setIsModalBlazingVisible] = useState(false);
  const [formData, setFormData] = useState({
    property_id: "",
    feature_package_id: "",
    status: "active",
  });
  const [file, setFile] = useState(null);

  // Mock data for dropdowns - replace with actual data fetching
  const [properties, setProperties] = useState([]);
  const [featurePackages, setFeaturePackages] = useState([]);
  const [isModalBannerVisible, setIsModalBannerVisible] = useState(false);
  const [formBannerData, setFormBannerData] = useState({
    feature_package_id: "",
    title: " ",
    description: "",
    image: null,
    is_mobile: "false",
    link: "",
  });

  const hasWindow = typeof window !== "undefined";
  let user;

  if (hasWindow) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    getAwardsServices();
    getProperties();
    getFeaturePackages();
  }, []);

  const getAwardsServices = async () => {
    setBtnLoad(true);
    try {
      const response = await url.get(`/properties/awards/`);
      setAllAwardsServices(response.data);
    } catch (error) {
      console.error(error);
    }
    setBtnLoad(false);
  };

  const getProperties = async () => {
    try {
      const response = await url.get(`properties/user-properties/${user?.id}`);
      setProperties(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(properties);

  const getFeaturePackages = async () => {
    try {
      const response = await url.get(`/properties/feature-packages/`);
      setFeaturePackages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(featurePackages);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showModalBlazing = () => {
    setIsModalBlazingVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsModalBlazingVisible(false);

    setFormData({
      property_id: "",
      feature_package_id: "",
      status: "active",
    });
    setFile(null);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = new FormData();
    requestData.append("property_id", formData.property_id);
    requestData.append("feature_package_id", formData.feature_package_id);
    requestData.append("status", formData.status);
    if (file) {
      requestData.append("cover_image", file);
    }

    try {
      await url.post(`/properties/featured-properties/`, requestData);
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
        title: "Featured property added successfully!",
      });
      closeModal();
    } catch (error) {
      console.error(error);
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
        icon: "error",
        title: "Failed to add featured property.",
      });
    }
  };

  const handleBannerInputChange = (e) => {
    const { name, value } = e.target;
    setFormBannerData({ ...formBannerData, [name]: value });
  };

  // Handle file change
  const handleBannerFileChange = (e) => {
    setBannerFormData({ ...formBannerData, image: e.target.files[0] });
  };

  // Show the modal
  const showBannerModal = () => {
    setIsModalBannerVisible(true);
  };

  // Close the modal
  const closeBannerModal = () => {
    setIsModalBannerVisible(false);
    setFormBannerData({
      feature_package_id: "",
      title: "",
      description: "",
      image: null,
      is_mobile: "false",
      link: "",
    });
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    // Prepare form data
    const data = new FormData();
    data.append("feature_package_id", formBannerData.feature_package_id);
    data.append("title", formBannerData.title);
    data.append("description", formBannerData.description);
    if (formBannerData.image) {
      data.append("image", formBannerData.image);
    }
    data.append("is_mobile", formBannerData.is_mobile);
    data.append("link", formBannerData.link);

    try {
      await url.post(`/properties/featured-sliders/`, data);
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
        title: "Featured Banner added successfully!",
      });
      closeBannerModal();
    } catch (error) {
      console.error(error);
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
        icon: "error",
        title: "Failed to add featured Banner.",
      });
    }
  };

  return (
    <div className="bg-white min-h-screen py-8 px-4">
      {/* Banners Section */}
      <div className="flex flex-col items-center mb-8">
        {/* Feature Ads Banner */}
        <div className="relative w-full mb-4">
          <div className="w-full h-36 bg-blue-100 rounded-t-lg shadow-md flex items-center justify-center">
            <button
              onClick={showModal}
              className="hover:bg-white w-44 text-blue-500 px-4 py-2 rounded bg-blue-200 transition duration-300">
              Feature Ads
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Feature Ads</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Property ID Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Property ID
                  </label>
                  <select
                    name="property_id"
                    value={formData.property_id}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required>
                    <option value="">Select Property</option>
                    {properties?.map((property) => {
                      return (
                        <option key={property.id} value={property.id}>
                          {property?.title}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {/* Feature Package ID Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Feature Package ID
                  </label>
                  <select
                    name="feature_package_id"
                    value={formData.feature_package_id}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required>
                    <option value="">Select Feature Package</option>
                    {featurePackages
                      ?.filter(
                        (packageItem) => packageItem.priority_type === "normal"
                      ) // Filter by priority_type "blazing"
                      .map((packageItem) => (
                        <option key={packageItem.id} value={packageItem.id}>
                          {packageItem?.title} ({packageItem?.price}) PKR
                        </option>
                      ))}
                  </select>
                </div>

                {/* Status Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                  </select>
                </div>

                {/* Cover Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      cursor-pointer"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Banner Ads Banner */}
        <div className="relative w-full mb-4">
          <div className="w-full h-36 bg-green-100 rounded-t-lg shadow-md flex items-center justify-center">
            <button
              onClick={showBannerModal}
              className="hover:bg-white w-44 text-green-500 px-4 py-2 rounded bg-green-200 transition duration-300">
              Banner Ads
            </button>
          </div>
        </div>

        {isModalBannerVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Create Banner Post</h2>
              <form onSubmit={handleBannerSubmit} className="space-y-4">
                {/* Feature Package ID */}

                {/* Feature Package ID Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Feature Package ID
                  </label>
                  <select
                    name="feature_package_id"
                    value={formBannerData.feature_package_id}
                    onChange={handleBannerInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required>
                    <option value="">Select Feature Package</option>
                    {featurePackages.map((packageItem) => (
                      <option key={packageItem.id} value={packageItem.id}>
                        {packageItem?.title} ({packageItem?.priority_type}) (
                        {packageItem?.price}) PKR
                      </option>
                    ))}
                  </select>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formBannerData.title}
                    onChange={handleBannerInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formBannerData.description}
                    onChange={handleBannerInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows="3"
                    required
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleBannerFileChange}
                    className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    cursor-pointer"
                  />
                </div>

                {/* Is Mobile */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Is Mobile
                  </label>
                  <select
                    name="is_mobile"
                    value={formBannerData.is_mobile}
                    onChange={handleBannerInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                    <option value="false">False</option>
                    <option value="true">True</option>
                  </select>
                </div>

                {/* Link */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    value={formBannerData.link}
                    onChange={handleBannerInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeBannerModal}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Blazing Deals Banner */}
        <div className="relative w-full">
          <div className="w-full h-36 bg-yellow-100 rounded-t-lg shadow-md flex items-center justify-center">
            <button
              onClick={showModalBlazing}
              className="hover:bg-white w-44 text-yellow-500 px-4 py-2 rounded bg-yellow-200 transition duration-300">
              Add Blazing Deals
            </button>
          </div>
        </div>
      </div>

      {isModalBlazingVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Blazing Ads</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Property ID Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property ID
                </label>
                <select
                  name="property_id"
                  value={formData.property_id}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required>
                  <option value="">Select Property</option>
                  {properties?.map((property) => {
                    return (
                      <option key={property.id} value={property.id}>
                        {property?.title}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Feature Package ID Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Feature Package ID
                </label>
                <select
                  name="feature_package_id"
                  value={formData.feature_package_id}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required>
                  <option value="">Select Feature Package</option>
                  {featurePackages
                    ?.filter(
                      (packageItem) => packageItem.priority_type === "blazing"
                    ) // Filter by priority_type "blazing"
                    .map((packageItem) => (
                      <option key={packageItem.id} value={packageItem.id}>
                        {packageItem?.title} ({packageItem?.price}) PKR
                      </option>
                    ))}
                </select>
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formBannerData.status}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cover Image
                </label>
                <input
                  type="file"
                  onChange={handleBannerFileChange}
                  className="mt-1 block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      cursor-pointer"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Awards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map through demo data to render each award */}
        {allAwardsServices.map((award) => (
          <div
            key={award.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between">
            <div className="flex flex-col h-full">
              <div>
                <h3 className="text-lg font-semibold mb-2">{award?.title}</h3>
                <p className="text-gray-600 mb-2">{award?.description}</p>
              </div>
              <div className="mt-auto">
                <p className="text-gray-500 text-sm">
                  {moment(award?.date).format("MMMM YYYY")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsComponent;
