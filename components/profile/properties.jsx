import Image from "next/image";
import React, { useState, useEffect } from "react";
import url from "@/config/axios";
import noImg from "../../image/noImg.svg";
import Swal from "sweetalert2";
import ScaleLoader from "react-spinners/ScaleLoader";
import NoData from "@/icons/NoData";

const PropertiesComponent = () => {
  const [allProperties, setAllProperties] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [newPrice, setNewPrice] = useState("");

  const hasWindow = typeof window !== "undefined";
  let user;

  if (hasWindow) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  console.log(selectedProperty);
  useEffect(() => {
    Properties();
  }, []);

  const Properties = async () => {
    setBtnLoad(true);
    url
      .get(`/properties/user-properties/${user?.id}`)
      .then(async (res) => {
        setAllProperties(res.data);
        setBtnLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setBtnLoad(false);
      });
  };

  const FeaturedProperties = async (id, featured, property) => {
    let editProperty = {
      ...property,
      is_featured: !property.is_featured,
      agent_id: property.agent.id,
    };

    let body = {
      ...editProperty,
    };

    url
      .put(`/properties/properties/${id}/`, body)
      .then(async (res) => {
        Properties();
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
          icon: "info",
          title: editProperty?.is_featured
            ? "Property is now Featured"
            : "Property is now Unfeatured",
        });
      })
      .catch((e) => {
        console.log(e);
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
          title: "Something went wrong",
        });
      });
  };

  const PriceChanged = async (id, price, property) => {
    let editProperty = {
      ...property,
      price: price,
      agent_id: property.agent.id,
    };

    let body = {
      ...editProperty,
    };

    url
      .put(`/properties/properties/${id}/`, body)
      .then(async (res) => {
        Properties();
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
          icon: "info",
          title: "Price Updated",
        });
      })
      .catch((e) => {
        console.log(e);
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
          title: "Something went wrong",
        });
      });
  };

  const DeleteProperty = async (id) => {
    url
      .delete(`/properties/properties/${id}/`)
      .then(async (res) => {
        Properties();
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
          title: "Property SuccessFully Detected",
        });
      })
      .catch((e) => {
        console.log(e);
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
          title: "Something went wrong",
        });
      });
  };

  const handleDetailClick = (property) => {
    setSelectedProperty(property);
  };

  const handleClosePopup = () => {
    setSelectedProperty(null);
  };

  const handleEditPriceClick = (property) => {
    // setSelectedProperty(property);
    setNewPrice(property.price); // Set the default price
    setShowPriceModal(true); // Show the price modal
  };

  const handleClosePriceModal = () => {
    setShowPriceModal(false);
    setNewPrice("");
  };

  const handleSavePrice = (selectedProperty) => {
    // Logic to save the new price
    console.log("New Price:", newPrice);
    handleClosePriceModal();
    PriceChanged(selectedProperty.id, newPrice, selectedProperty);
  };

  return (
    <div className="bg-white min-h-full py-8">
      {/* Properties Grid */}

      {btnLoad ? (
        <div className="flex justify-center items-center">
          <ScaleLoader color="#eab308" />
        </div>
      ) : allProperties?.length === 0 ? (
        <NoData />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {allProperties?.map((property) => (
            <div
              key={property.id}
              className="bg-white p-4 rounded-lg shadow-md relative border border-gray-200"
            >
              {property?.image_url ? (
                <Image
                  width={100}
                  height={100}
                  src={property?.image_url}
                  alt="Property Image"
                  className="w-full h-40  rounded-md mb-4"
                />
              ) : (
                <Image
                  width={100}
                  height={100}
                  src={noImg}
                  alt="No Image Available"
                  className="w-full h-40  rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-semibold mb-2 line-clamp-1">
                {property?.title}
              </h3>
              <button
                className={`absolute top-0 right-0 mt-2 mr-2 px-3 py-1 rounded ${
                  property?.is_featured === true
                    ? "bg-gray-500"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                onClick={() => {
                  FeaturedProperties(
                    property.id,
                    property?.is_featured,
                    property
                  );
                }}
              >
                {property?.is_featured === true ? "Featured" : "Make Featured"}
              </button>
              <div className="mb-4">
                <div className="text-gray-700 ">
                  <p className="text-lg font-medium">
                    Price: ${property?.price ?? "-"}
                  </p>
                  <p>Type: {property?.type ?? "-"}</p>
                  <p>Purpose: {property?.purpose ?? "-"}</p>
                </div>
                <div className="text-gray-600 ">
                  <p>
                    Area: {property?.area ?? "-"} {property?.area_unit ?? "-"} (
                    {property?.area_type ?? "-"})
                  </p>
                  <p>Total Likes: {property?.likes ?? "0"}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="border border-yellow-500 text-black hover:bg-yellow-100 transition-all px-4 py-2 rounded"
                  onClick={() => handleDetailClick(property)}
                >
                  Detail
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 transition-all text-white px-4 py-2 rounded"
                  onClick={() => handleEditPriceClick(property)}
                >
                  Edit Price
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 transition-all text-white px-4 py-2 rounded"
                  onClick={() => {
                    DeleteProperty(property.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Popup for Property Details */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 h-[90vh] overflow-scroll rounded-lg w-1/2 max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleClosePopup}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {selectedProperty.title}
            </h3>
            <div className="mb-4">
              {selectedProperty?.image_url ? (
                <Image
                  width={200}
                  height={200}
                  src={selectedProperty?.image_url}
                  alt="Property Image"
                  className="  rounded-md mb-4"
                />
              ) : (
                <Image
                  width={100}
                  height={100}
                  src={noImg}
                  alt="No Image Available"
                  className="w-full h-40  rounded-md mb-4"
                />
              )}
              <p className="text-gray-700 mb-2">
                <strong>Price:</strong> ${selectedProperty?.price ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Location:</strong> {selectedProperty?.address ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>City:</strong> {selectedProperty?.city ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Type:</strong> {selectedProperty?.type ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Purpose:</strong> {selectedProperty?.purpose ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Bedrooms:</strong> {selectedProperty?.bedroom ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Bathrooms:</strong> {selectedProperty?.bathroom ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Area:</strong> {selectedProperty?.area ?? "-"}{" "}
                {selectedProperty?.area_unit ?? "-"} (
                {selectedProperty?.area_type ?? "-"})
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Nearby:</strong> {selectedProperty?.nearby ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong>{" "}
                {selectedProperty?.description ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Agent:</strong>{" "}
                {selectedProperty?.agent?.full_name ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone Number:</strong>{" "}
                {selectedProperty?.agent?.phone_number ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Company:</strong>{" "}
                {selectedProperty?.agent?.company ?? "-"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Total Likes:</strong> {selectedProperty?.likes ?? "0"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Price */}
      {showPriceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleClosePriceModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-xl font-semibold mb-4">Edit Price</h3>
            <input
              type="text"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="border p-2 w-full rounded"
              placeholder="Enter new price"
            />
            <div className="flex justify-end mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  handleSavePrice(selectedProperty);
                }}
              >
                Save
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                onClick={handleClosePriceModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesComponent;
