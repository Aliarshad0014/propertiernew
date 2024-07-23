import React, { useState } from "react";
import Image from "next/image";
import { GrNext, GrPrevious } from "react-icons/gr";

const CRMFeatures = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const features = [
    "Streamline Your Business Smoothly",
    " Tell Your Property's Story Beautifully",
    "Hassle-Free Hosting Brilliance",
    "Illuminate Your Brand Proudly",
    "Transparent Financial Interactions",
    "Operational Ease with Automation",
    "Enchanting Customer Relationships",
    " Elevate Property Showcases",
    " Scalability Beyond Adaptation",
    "Brilliant Support Every Step",
    "Stay Linked to Innovation",
    "Visual Symphony for Real Estate",
    "Strategic Insights for Brilliance",
    "Tailored Brilliance Journey",
  ];

  const handleImageClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <h1 className="text-4xl font-bold text-center text-yellow-500 mb-10">
      Customer Relationship Management             </h1>
      <div className="max-w-4xl mx-auto mb-10 p-4 lg:p-0">
        <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-lg">
          <div className="relative h-full">
            <Image
              src={images[currentIndex]}
              alt={`ERP Feature ${currentIndex + 1}`}
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className="absolute top-0 right-0 mt-2 mr-2 flex space-x-2">
            <button
              className="p-2 rounded-full bg-gray-800 bg-opacity-50 text-white"
              onClick={handlePrev}
            >
              <GrPrevious size={20} />
            </button>
            <button
              className="p-2 rounded-full bg-gray-800 bg-opacity-50 text-white"
              onClick={handleNext}
            >
              <GrNext size={20} />
            </button>
          </div>
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageClick(index)}
              className={`w-16 h-16 overflow-hidden rounded-lg shadow-md ${index === currentIndex ? "border-2 border-yellow-500" : ""
                }`}
            >
              <Image
                src={image}
                alt={`ERP Feature ${index + 1}`}
                width={64}
                height={64}
                objectFit="cover"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="max-w-4xl mx-auto p-4 lg:p-0">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Key Features</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start space-x-3 text-lg text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-6 h-6 text-yellow-500 flex-shrink-0"
              >
                <path
                  fillRule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CRMFeatures;
