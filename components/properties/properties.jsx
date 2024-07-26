"use client";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import FooterSection from "@/components/footer";
import TopBanner from "../TopBanner/TopBannerProperties";
import SearchBox from "../searchbox/searchboxpages";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/ComputerHomePage"
        );
        const result = await response.json();
        setProperties(result.Data.properties);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const openPropertyDetails = (property) => {
    setSelectedProperty(property);
  };

  const closePropertyDetails = () => {
    setSelectedProperty(null);
  };

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 relative">
      <TopBanner />
      <SearchBox/>

      <h1 className="text-3xl font-bold text-center text-yellow-500 mt-10 mb-10">
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
                src={property.image_url}
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

      <FooterSection />
    </div>
  );
};

export default Properties;
