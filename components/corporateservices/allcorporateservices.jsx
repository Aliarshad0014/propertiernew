"use client";
import { useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import VerticalCarousel from "@/components/corporateservices/verticalcarousel";
import SearchBox from "@/components/searchbox/searchbox"; // Import the SearchBox component
import TopBanner from "../TopBanner/TopBannerShowAllServices";
import FooterSection from "../footer";

const VerticalCarouselPage = () => {
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
    <div className="min-h-screen overflow-hidden bg-gray-100 relative">
      <div className="min-h-screen relative bg-white">
        {/* TopBanner Component */}
        <TopBanner />

        {/* SearchBox Component */}
        <div className="flex flex-col items-center justify-center bottom-10">
          <SearchBox />
        </div>

        <div className="bg-gray-50 py-10">
          <VerticalCarousel />
        </div>
      </div>
    </div>
  );
};

export default VerticalCarouselPage;
