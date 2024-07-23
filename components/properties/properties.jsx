"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import FooterSection from "@/components/footer";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredPropertyId, setHoveredPropertyId] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null); // State for selected property

  const images = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/ComputerHomePage"
        );
        const result = await response.json();
        setProperties(result.Data.properties); // Assuming 'properties' is in result.Data
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleMouseEnter = (id) => {
    setHoveredPropertyId(id);
  };

  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  return (
    <div className="min-h-screen  overflow-hidden bg-gray-100 relative">
      <div className="min-h-screen relative bg-white">
        {/* Background slider image */}
        <div className="absolute inset-0 z-0 h-[50vh] w-full overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image}
                alt={`Background Image ${index + 1}`}
                fill
                quality={100}
                priority
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-opacity-50 text-white p-2 rounded-full z-50"
            onClick={handlePrev}
          >
            <GrPrevious size={30} color="#eaab0c" />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 hover:scale-100 bg-opacity-50 text-white p-2 rounded-full z-50"
            onClick={handleNext}
          >
            <GrNext size={30} color="#eaab0c" />
          </button>
        </div>

        {/* Content overlay */}
        <div className="relative z-40 flex flex-col items-center justify-center min-h-screen inset-y-32">
          {/* Search Box */}
          <div className="absolute lg:bottom-64 bottom-48 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-100 backdrop-blur-sm p-8 rounded-xl shadow-lg w-auto flex flex-col justify-center items-center h-1/12">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
              <div className="flex flex-col items-start">
                <h1 className="text-yellow-500 font-semibold mb-2">
                  Property Type
                </h1>
                <select className="w-60 bg-white px-4 py-2 border border-t-0 border-x-0 border-gray-500 shadow-sm text-black text-sm sm:text-base">
                  <option value="allProperties">All Properties</option>
                  <option value="rental">Rental</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-yellow-500 font-semibold mb-2">Country</h1>
                <select className="w-60 bg-white px-4 py-2 border border-t-0 border-x-0 border-gray-500 shadow-sm text-black text-sm sm:text-base">
                  <option value="pakistan">Pakistan</option>
                  <option value="china">China</option>
                  <option value="europe">Europe</option>
                  {/* Add options for countries here */}
                </select>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-yellow-500 font-semibold mb-2">City</h1>
                <select className="w-60 bg-white px-4 py-2 border border-t-0 border-x-0 border-gray-500 shadow-sm text-black text-sm sm:text-base">
                  <option value="islamabad">Islamabad</option>
                  <option value="karachi">Karachi</option>
                  <option value="peshawar">Peshawar</option>
                  {/* Add options for cities here */}
                </select>
              </div>
              <button className="flex items-center justify-center h-14 w-14 bg-custom-color text-white shadow-md rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FaSearch size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Properties grid */}
        <h1 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          Properties
        </h1>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl lg:grid-cols-4 gap-6 mb-20 p-4 lg:p-0">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-all cursor-pointer hover:shadow-xl"
                onClick={() => openPropertyDetails(property)}
              >
                <img
                  src={property.image_url} // Adjust this based on your property object structure
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-md text-start mb-4 font-bold text-black">
                    {property.title}
                  </h2>
                  <p className="text-gray-700">{property.city}</p>
                  <p className="text-yellow-500 font-semibold">
                    ${property.price}
                  </p>
                  <div className="flex justify-between mt-auto pt-4">
                  <a
                      href={`/properties/${property.id}`}
                      className="bg-white border border-yellow-500 text-black font-medium py-1 px-4 rounded-md hover:bg-yellow-500"
                      onMouseEnter={() => handleMouseEnter(property.id)}
                    >
                      Details
                    </a>
                    <button className="bg-white border border-yellow-500 text-black font-medium py-1 px-4 rounded-md hover:bg-yellow-500">
                      Talk
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popup for property details */}
        {selectedProperty && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
              <h2 className="text-xl font-bold mb-4">
                {selectedProperty.title}
              </h2>
              <p className="text-gray-700 mb-4">{selectedProperty.city}</p>
              <p className="text-yellow-500 font-semibold mb-4">
                ${selectedProperty.price}
              </p>
              <p className="text-gray-700">{selectedProperty.description}</p>
              <button
                className="mt-4 bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                onClick={closePropertyDetails}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      <FooterSection />
    </div>
  );
};

export default Properties;
