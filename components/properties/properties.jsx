"use client";
import { useEffect, useState } from "react";
import TopBanner from "../TopBanner/TopBannerProperties";
import SearchBox from "../searchbox/searchboxpages";
import Image from "next/image";
import noimg from "@/image/noImg.svg";
import BounceLoader from "react-spinners/BounceLoader";
import Logo from "@/icons/Logo";
import Link from "next/link";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [btnLoad, setBtnLoad] = useState(false);

  useEffect(() => {
    setBtnLoad(true);

    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://propertier-p2wwcx3okq-em.a.run.app/properties/ComputerHomePage"
        );
        const result = await response.json();
        setProperties(result.Data.properties);
        setBtnLoad(false);
      } catch (error) {
        console.error("Error fetching properties:", error);
        setBtnLoad(false);
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

  const handleError = (e) => {
    e.target.src = noimg;
  };
  console.log(selectedProperty);
  return (
    <div className="min-h-screen overflow-hidden bg-gray-100 relative">
      <TopBanner />
      <SearchBox />

      <h1 className="text-3xl font-bold text-center text-yellow-500 mb-10">
        Properties
      </h1>

      <div className="flex justify-center">
        {btnLoad ? (
          <BounceLoader color="#eab308" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-6xl lg:grid-cols-4 gap-6 mb-20 p-4 lg:p-0">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-all cursor-pointer hover:shadow-xl"
              >
                <Image
                  src={property.image_url || noimg}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                  onError={handleError}
                  width={414}
                  height={254}
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
                    <Link
                      href={`/properties/${property.id}`}
                      className="bg-white border border-yellow-500 text-black font-medium py-1 px-4 rounded-md hover:bg-[#FFCE58]"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => openPropertyDetails(property)}
                      className="bg-white border border-yellow-500 text-black font-medium py-1 px-4 rounded-md hover:bg-[#FFCE58]"
                    >
                      Talk
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedProperty && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
            <div className="w-full flex justify-center">
              <Logo />
            </div>
            <h2 className="text-xl font-bold mb-4 text-black mt-2">
              {selectedProperty.title}
            </h2>
            <div className="flex flex-wrap mb-4">
              <span className="font-semibold text-black w-1/3">City:</span>
              <span className="text-gray-700 w-2/3">
                {selectedProperty.city}
              </span>
            </div>
            <div className="flex flex-wrap mb-4">
              <span className="font-semibold text-black w-1/3">Price:</span>
              <span className="text-yellow-500 font-semibold w-2/3">
                Rs {selectedProperty.price}
              </span>
            </div>
            <div className="flex flex-wrap mb-4">
              <span className="font-semibold text-black w-1/3">
                Description:
              </span>
              <span className="text-gray-700 w-2/3">
                {selectedProperty.description}
              </span>
            </div>
            <div className="flex flex-wrap mt-3 mb-4">
              <span className="font-semibold text-black w-1/3">
                Agent Phone:
              </span>
              <span className="text-gray-700 w-2/3">
                {selectedProperty.agent?.phone_number_country_code +
                  selectedProperty.agent?.phone_number}
              </span>
            </div>
            <div className="w-full flex justify-end">
              <button
                className="mt-4 bg-[#FFCE58] text-white py-2 px-4 rounded-md hover:bg-yellow-600"
                onClick={closePropertyDetails}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* <FooterSection /> */}
    </div>
  );
};

export default Properties;
