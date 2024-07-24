"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
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

const images = [
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export default function Home() {
  const [activeButton, setActiveButton] = useState(null);
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
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/ComputerHomePage');
        const result = await response.json();
        console.log('Fetched data:', result);
        setData(result.Data);
      } catch (error) {
        console.error('Error fetching data:', error);
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

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType === activeButton ? null : buttonType);
  };

  const handleNext = () => {
    console.log("Next clicked");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    console.log("Prev clicked");
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="min-h-screen relative w-full bg-white">
      <div className="absolute inset-0 z-0 h-[80vh] w-full overflow-hidden">
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

      <div className="relative z-40 flex flex-col items-center justify-center min-h-screen inset-y-48">
        <div className="absolute lg:bottom-64 bottom-48 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-100 backdrop-blur-sm p-8 rounded-xl shadow-lg w-auto flex flex-col justify-center items-center h-1/12">
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
              <div className="flex flex-col items-start">
                <h1 className="text-yellow-500 font-semibold mb-2">Property Type</h1>
                <select className="w-60 bg-white poppins px-4 py-2 border border-t-0 border-x-0 border-gray-500 shadow-sm text-black text-sm sm:text-base">
                  <option value="allProperties">All Properties</option>
                  <option value="rental">Rental</option>
                  <option value="sale">Sale</option>
                </select>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-yellow-500 font-semibold mb-2">Country</h1>
                <select className="w-60 poppins bg-white px-4 py-2 border border-t-0 border-x-0 border-gray-500 shadow-sm text-black text-sm sm:text-base">
                  <option value="country">Pakistan</option>
                  <option value="country">China</option>
                  <option value="country">Europe</option>
                </select>
              </div>
              <div className="flex flex-col items-start">
                <h1 className="text-yellow-500 font-semibold mb-2">City</h1>
                <select className="w-60 poppins bg-white px-4 py-2 border border-t-0 border-x-0 border-gray-500 shadow-sm text-black text-sm sm:text-base">
                  <option value="city">Islamabad</option>
                  <option value="city">Karachi</option>
                  <option value="city">Peshawar</option>
                </select>
              </div>
              <button className="flex items-center justify-center h-14 w-14 bg-custom-color text-white shadow-md rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FaSearch size={20} />
              </button>
            </div>

            {showMore && (
              <div className="flex flex-col sm:flex-row items-center justify-start space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                <div className="flex flex-col items-start">
                  <h1 className="text-yellow-500 font-semibold mb-2">Region</h1>
                  <select className="w-60 poppins bg-white px-4 py-2 border border-t-0 border-x-0 border-gray-500 shadow-sm text-black text-sm sm:text-base">
                    <option value="region">North</option>
                    <option value="region">South</option>
                    <option value="region">East</option>
                    <option value="region">West</option>
                  </select>
                </div>
                <div className="flex flex-col items-start">
                  <h1 className="text-yellow-500 font-semibold mb-2">Price Range</h1>
                  <select className="w-60 poppins bg-white px-4 py-2 border border-t-0 border-x-0 border-gray-500 shadow-sm text-black text-sm sm:text-base">
                    <option value="priceRange">Below $50,000</option>
                    <option value="priceRange">$50,000 - $100,000</option>
                    <option value="priceRange">$100,000 - $200,000</option>
                    <option value="priceRange">Above $200,000</option>
                  </select>
                </div>
              </div>
            )}
            <button
              onClick={handleShowMoreClick}
              className="text-yellow-500 text-start font-semibold mt-4"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>

          </div>
        </div>
      </div>


        <div className="py-10">
          <HotSale data={data.properties} className='relative' />
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
          <div className="py-10">
        <SearchForm />
          </div>
          <div className="py-10">
        <FooterSection/>
          </div>
      </div>

  );
}
