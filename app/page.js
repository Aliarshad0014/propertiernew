"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { GrPrevious, GrNext } from "react-icons/gr";
import HotSale from "@/components/homepage/hotsale";
import CustomCarousel from "@/components/homepage/customcarousel";
import VideoShorts from "@/components/homepage/shorts";
import CustommCarousel from "@/components/homepage/newcarousel";
import UserReviews from "@/components/homepage/review";
import SearchForm from "@/components/searching";
import ServicesCarousel from "@/components/homepage/services";
import BlogComponent from "@/components/homepage/blog";
import FooterSection from "@/components/footer";
import SearchBox from "@/components/searchbox/searchbox";

const images = [
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState({
    properties: [],
    materialRates: {
      cementRates: [],
      steelRates: [],
      brickRates: [],
      trGardarRates: [],
    },
    shortVideos: [],
    appFeedbacks: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/ComputerHomePage"
        );
        const result = await response.json();
        console.log("Fetched data:", result);
        setData(result.Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen relative w-full bg-white">
      <div className="relative z-0 h-[80vh] w-full overflow-hidden">
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
              style={{ objectFit: "cover" }}
              quality={100}
              priority
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
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-opacity-50 text-white p-2 rounded-full z-50"
          onClick={handleNext}
        >
          <GrNext size={30} color="#eaab0c" />
        </button>
      </div>
      <div className="relative z-40 flex flex-col items-center justify-center">
        
          <SearchBox />
        
      </div>

      <div className="py-10">
        <HotSale data={data.properties} className="relative" />
      </div>
      <div className="py-10">
        <CustomCarousel data={data.materialRates} />
      </div>
      <div className="py-10">
        <VideoShorts data={data.shortVideos} />
      </div>
      <div className="py-10">
        <ServicesCarousel />
      </div>
      <div className="py-10">
        <CustommCarousel />
      </div>
      <div className="py-10">
        <UserReviews data={data.appFeedbacks} />
      </div>
      <div className="py-10">
        <BlogComponent />
      </div>
      <div className="">
        <SearchForm />
      </div>
    </div>
  );
}
