"use client";
import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBanner from "../../TopBanner/TopBanner";
import ServicesCard from "../Sub-Services/ServicesCard";
import url from "@/config/axios";
import BounceLoader from "react-spinners/BounceLoader";
import ImageGallery from "./ImageGallery";
import VideoCard from "../ShortVideo/VideoCard";
import Tags from "./Tags";
import Recommender from "./Recommender";
import VideoTour from "./VideoTour";
import WarningIcon from "@/icons/WarningIcon";

export default function SubCategoryDetial({ paramsID }) {
  const [allService, setAllService] = useState("Electricity");
  const [allSubServices, setAllSubServices] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allFixedServices, setAllFixedServices] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    getSubServices();
  }, []);

  const getSubServices = async () => {
    setBtnLoad(true);
    url
      .get(`/services/sub-services/${paramsID}`)
      .then(async (res) => {
        setAllSubServices(res.data);
        setBtnLoad(false);
      })
      .catch((e) => {
        setBtnLoad(false);

        console.log(e);
      });
  };

  useEffect(() => {
    getFixedServices();
  }, []);

  const getFixedServices = async () => {
    setBtnLoad(true);
    url
      .get(`/services/filtered-services/`)
      .then(async (res) => {
        setAllFixedServices(res.data);
        setBtnLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setBtnLoad(false);
      });
  };

  console.log(allSubServices);
  const handleChange = (event) => {
    setAllService(event.target.value);
  };
  return (
    <div>
      <TopBanner
        title={"Services"}
        firstCrumb={"Services"}
        firstCrumbLink={"/services"}
        secondCrumb={allSubServices?.parent_service_name}
      />

      <div className="bg-[#ffffff] mt-5 flex flex-col items-center text-black">
        <div className="flex flex-col items-center w-[80%]">
          <div className="text-3xl font-bold text-black mb-5 mt-10">
            {allSubServices?.parent_service_name}
          </div>
          <div
            className="my-5 text-sm text-center w-[200px] bg-[#FECE55] px-4 py-2 cursor-pointer"
            onClick={toggleModal}
          >
            GET SERVICE
          </div>

          {btnLoad ? (
            <BounceLoader color="#eab308" />
          ) : (
            <div className="flex flex-col mb-10">
              <div className="w-full flex gap-7">
                <div className="w-[70%]">
                  <ImageGallery images={allSubServices?.image_urls} />
                </div>
                <div className="flex w-[30%] justify-center items-center">
                  <VideoCard
                    videoSrc={allSubServices?.short_video_url}
                    title="Fan Repairing"
                    description="Lorem ipsum dolor sit amet consectetur. Euismod purus."
                    likesCount={50}
                    avatarSrc="/path/to/avatar.jpg"
                  />
                </div>
              </div>

              <div className="flex gap-7 justify-between mt-5">
                <div className="w-[70%]">
                  <div className="text-black font-semibold text-xl my-2">
                    Description
                  </div>
                  <div className="text-justify">
                    {allSubServices?.description}
                  </div>
                  <Tags Tags={allSubServices?.tags} />
                </div>
                <div className="w-[30%]">
                  <Recommender allFixedServices={allFixedServices} />
                </div>
              </div>

              <div>
                <VideoTour video_url={allSubServices?.video_url} />
              </div>
            </div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <WarningIcon className="w-5 h-5 mr-3" />
                Please Install Our Vendor App
              </h2>
              <p className="mb-6">
                To enhance your experience and access our full range of
                services, we recommend installing our vendor app. The app offers
                easy access to our services, timely updates, and seamless
                communication with our support team. Stay connected and get the
                most out of our offerings by downloading the app today.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={toggleModal}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button className="bg-yellow-500 text-white py-2 px-4 rounded">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
