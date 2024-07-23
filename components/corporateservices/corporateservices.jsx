"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { GrNext, GrPrevious } from "react-icons/gr";
import Link from 'next/link';
import FooterSection from "@/components/footer";
import ERPFeatures from "@/components/corporateservices/erpfeatures";
import HRMFeatures from "@/components/corporateservices/hrmfeatures";
import Packages from "@/components/corporateservices/packages";
import ContactUs from "@/components/corporateservices/contactus";
import CRMFeatures from "@/components/corporateservices/crmfeatures";
import CMSFeatures from "@/components/corporateservices/cmsfeatures";
import LogoCarousel from "@/components/logocarousel";

const CorporateServices = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      <div className="min-h-screen relative bg-white">
        {/* Background slider image */}
        <div className="absolute inset-0 z-0 h-[50vh] w-full overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <Image
                src={image}
                alt={`Background Image ${index + 1}`}
                fill
                objectFit="cover"
                quality={100}
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

        <div className="py-10">
          <Packages />
        </div>
        <div className="py-10">
          <ERPFeatures />
        </div>

        <div className="py-10">
          <HRMFeatures />
        </div>
        <div className="py-10">
          <CRMFeatures />
        </div>
        <div className="py-10">
          <CMSFeatures />
        </div>

        <div className="bg-gray-50 z-0 py-10">
          <ContactUs />
        </div>

        <div className="py-10">
          <LogoCarousel />
        </div>

        <div className="text-center bg-white py-10">
  <h2 className="text-2xl text-gray-700 font-semibold mb-6">Looking for more Services?</h2>
  <Link href="/allcorporateservices">
    <button className="bg-yellow-500 text-white py-2 px-4 transition-all rounded-md hover:bg-yellow-600">
      Show All Services
    </button>
  </Link>
</div>
      </div>
    </div>
  );
};

export default CorporateServices;
