import React, { useState } from "react";
import axios from "@/config/axios"; // Assuming you have axios configured in your project
import Swal from "sweetalert2";
import ScaleLoader from "react-spinners/ScaleLoader";

const NewListingComponent = ({ handleSectionChange }) => {
  const [purpose, setPurpose] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [bedroom, setBedroom] = useState(1); // Changed from bedrooms
  const [bathroom, setBathroom] = useState(1); // Changed from bathrooms
  const [city, setCity] = useState("");
  const [citySlug, setCitySlug] = useState(""); // New field
  const [address, setAddress] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [videoLink, setVideoLink] = useState("");
  const [shortVideo, setShortVideo] = useState(null);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [slug, setSlug] = useState(""); // New field
  const [btnLoad, setBtnLoad] = useState(false);

  const hasWindow = typeof window !== "undefined";
  let user;

  if (hasWindow) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const handleFeatureChange = (feature) => {
    setFeatures((prevFeatures) =>
      prevFeatures.includes(feature)
        ? prevFeatures.filter((f) => f !== feature)
        : [...prevFeatures, feature]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("agent_id", user?.id); // Assuming you have a user object with an id
    formData.append("purpose", purpose);
    formData.append("type", propertyType); // Update according to your actual field name in API
    formData.append("title", title);
    formData.append("price", price);
    formData.append("bedroom", bedroom);
    formData.append("bathroom", bathroom);
    formData.append("city", city);
    formData.append("city_slug", citySlug);
    formData.append("address", address);
    formData.append("area", area);
    formData.append("description", description);
    formData.append("slug", slug);
    formData.append("status", 1); // Assuming status is always set to 1
    features.forEach((feature) => formData.append("features[]", feature));
    if (videoLink) formData.append("video", videoLink); // Assuming video field for the video link
    if (shortVideo) formData.append("short_video", shortVideo); // Using "short_video" to match your data
    if (featuredImage) formData.append("image", featuredImage); // Assuming "image_url" for the featured image

    setBtnLoad(true);
    axios
      .post("/properties/properties/", formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        setBtnLoad(false);

        // Reset form fields after successful submission
        setPurpose("");
        setPropertyType("");
        setTitle("");
        setPrice("");
        setBedroom("");
        setBathroom("");
        setCity("");
        setCitySlug("");
        setAddress("");
        setArea("");
        setDescription("");
        setFeatures([]);
        setVideoLink("");
        setShortVideo(null);
        setFeaturedImage(null);
        setSlug("");

        handleSectionChange("Properties");
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
          title: "Property Added Successfully",
        });
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
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
      });
  };

  return (
    <div className="bg-white min-h-screen pb-8">
      <div className="container mx-auto px-4 pb-8 bg-white text-black max-w-7xl">
        <h2 className="text-2xl font-bold mb-8">Create Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row lg:space-x-4">
            {/* Left Form Section */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <label htmlFor="purpose" className="block text-gray-700">
                  Select Purpose
                </label>
                <select
                  id="purpose"
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins">
                  <option value="">Select Purpose</option>
                  <option value="sale">Sale</option>
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div>
                <label htmlFor="propertyType" className="block text-gray-700">
                  Type of Property
                </label>
                <select
                  id="propertyType"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins">
                  <option value="">Select Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                </select>
              </div>
              <div>
                <label htmlFor="title" className="block text-gray-700">
                  Property Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="slug" className="block text-gray-700">
                  Property Slug
                </label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="price" className="block text-gray-700">
                  Price
                </label>
                <input
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="bedroom" className="block text-gray-700">
                  Bedrooms
                </label>
                <input
                  id="bedroom"
                  type="number"
                  value={bedroom}
                  onChange={(e) => setBedroom(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="bathroom" className="block text-gray-700">
                  Bathrooms
                </label>
                <input
                  id="bathroom"
                  type="number"
                  value={bathroom}
                  onChange={(e) => setBathroom(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-gray-700">
                  City
                </label>
                <select
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins">
                  <option value="">Select City</option>
                  <option value="miami">Miami</option>
                  <option value="new-york">New York</option>
                  <option value="los-angeles">Los Angeles</option>
                </select>
              </div>
              <div>
                <label htmlFor="citySlug" className="block text-gray-700">
                  City Slug
                </label>
                <input
                  id="citySlug"
                  type="text"
                  value={citySlug}
                  onChange={(e) => setCitySlug(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-gray-700">
                  Area
                </label>
                <input
                  id="area"
                  type="number" // Changed to number input
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <label htmlFor="features" className="block text-gray-700">
                  Features
                </label>
                <div className="flex flex-wrap">
                  {["Air Conditioning", "Swimming Pool", "Gym"].map(
                    (feature) => (
                      <div key={feature} className="mr-4">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={features.includes(feature)}
                            onChange={() => handleFeatureChange(feature)}
                            className="form-checkbox"
                          />
                          <span className="ml-2">{feature}</span>
                        </label>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="videoLink" className="block text-gray-700">
                  Video Link
                </label>
                <input
                  id="videoLink"
                  type="text"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="shortVideo" className="block text-gray-700">
                  Short Video
                </label>
                <input
                  id="shortVideo"
                  type="file"
                  accept="video/*"
                  onChange={(e) => setShortVideo(e.target.files[0])}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
              <div>
                <label htmlFor="featuredImage" className="block text-gray-700">
                  Upload Featured Image
                </label>
                <input
                  id="featuredImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFeaturedImage(e.target.files[0])}
                  className="w-full px-4 py-2 border rounded-md poppins"
                />
              </div>
            </div>
          </div>
          {btnLoad ? (
            <div className="flex justify-center items-center">
              <ScaleLoader color="#eab308" />
            </div>
          ) : (
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md poppins">
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewListingComponent;
