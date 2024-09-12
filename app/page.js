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
import url from "@/config/axios";
import AdComponent from "@/components/AdComponent";
import AdComponent2 from "@/components/AdComponent2";
import AdBanner from "@/components/AdBanner";
import ScaleLoader from "react-spinners/ScaleLoader";

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
  const [btnLoad, setBtnLoad] = useState(false);
  const [silders, setSliders] = useState([]);

  useEffect(() => {
    getSliders();
  }, []);

  const getSliders = async () => {
    // setBtnLoad(true);
    try {
      const res = await url.get(`/properties/sliders/`);
      setSliders(res.data);
      // setBtnLoad(false);
    } catch (e) {
      console.error(e);
    } finally {
      // setBtnLoad(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setBtnLoad(true);

      try {
        const response = await fetch(
          "https://propertier-p2wwcx3okq-em.a.run.app/properties/ComputerHomePage"
        );
        const result = await response.json();
        setBtnLoad(false);

        setData(result?.Data);
      } catch (error) {
        setBtnLoad(false);

        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (silders.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % silders.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [silders]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % silders.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + silders.length) % silders.length
    );
  };

  return (
    <div className="min-h-screen relative w-full bg-white pt-10">
      <div className="relative z-0 h-[80vh] w-full overflow-hidden">
        {silders.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}>
            <Image
              src={image?.image_url}
              alt={`Background Image ${index + 1}`}
              // quality={100}
              className="w-full h-full "
              loading="eager"
              objectFit="cover"
              // layout="responsive"
              fill
              // width={100}
              // height={100}
            />
          </div>
        ))}
        <button
          className="absolute top-1/2 bg-slate-600 p-5 hover:bg-slate-800 rounded-full left-4 transform -translate-y-1/2 bg-opacity-50 text-white  z-50"
          onClick={handlePrev}>
          <GrPrevious size={30} color="#eaab0c" />
        </button>
        <button
          className="absolute top-1/2 right-4 hover:bg-slate-800 bg-slate-600 p-5 rounded-full  transform -translate-y-1/2 bg-opacity-50 text-white z-50"
          onClick={handleNext}>
          <GrNext size={30} color="#eaab0c" />
        </button>
      </div>
      {/* <div className="relative z-40 flex flex-col items-center justify-center">
        <SearchBox />
      </div> */}

      {/* <div className="pb-5 -mt-5"> */}
      <div className="pb-5 mt-10">
        {btnLoad ? (
          <div className="flex justify-center items-center">
            <ScaleLoader color="#eab308" />
          </div>
        ) : (
          <HotSale data={data?.properties} className="relative" />
        )}
      </div>
      {/* <AdBanner
        dataAdFormat="auto"
        dataFullWidthResponsive={true}
        dataAdSlot="1415523676"
      /> */}
      {/* <AdComponent /> */}
      <div className="py-5">
        {btnLoad ? (
          <div className="flex justify-center items-center">
            <ScaleLoader color="#eab308" />
          </div>
        ) : (
          <CustomCarousel data={data.materialRates} />
        )}
      </div>
      <div className="py-5">
        {btnLoad ? (
          <div className="flex justify-center items-center">
            <ScaleLoader color="#eab308" />
          </div>
        ) : (
          <VideoShorts data={data.shortVideos} />
        )}
      </div>
      <div className="py-5">
        <ServicesCarousel />
      </div>
      <div className="py-5">
        <CustommCarousel />
      </div>
      <div className="py-5">
        <UserReviews data={data.appFeedbacks} />
      </div>
      {/* <AdComponent2 /> */}
      <div className="py-5">
        <BlogComponent />
      </div>
      <div className="">
        <SearchForm />
      </div>
    </div>
  );
}
