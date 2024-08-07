"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import BounceLoader from "react-spinners/BounceLoader";

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [properties, setProperties] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/GetPropertiesDetail?property_id=${params.id}`
        );
        setData(response.data.DetailDataModel);
        console.log(response.data.DetailDataModel);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  useEffect(() => {
    setBtnLoad(true);

    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/ComputerHomePage"
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  const renderFeatures = (features) => {
    return features.map((feature, index) => (
      <li key={index}>{feature.feature_id.name}</li>
    ));
  };

  const renderVideo = (url) => {
    const isYouTube = url.includes("youtube.com") || url.includes("youtu.be");
    return isYouTube ? (
      <iframe
        width="100%"
        height="400"
        src={url.replace("watch?v=", "embed/")}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    ) : (
      <video
        width="100%"
        height="400"
        controls
        className="w-full h-auto rounded"
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };
  console.log(properties);
  return btnLoad ? (
    <div className="flex h-screen justify-center items-center">
      <BounceLoader color="#eab308" />
    </div>
  ) : (
    <>
      <div className="container mx-auto p-6 bg-white text-black min-h-screen mt-10 w-full flex flex-col justify-center items-center">
        <div className="flex flex-col lg:flex-row gap-6 justify-center w-[80%]">
          {/* Left Column */}
          <div className="w-[70%] flex flex-col">
            <div className="text-3xl font-bold mb-6 ">
              {data.Property?.title || "Property Title"}
            </div>
            {/* Property Pictures Section */}
            <div className="mb-6">
              <Image
                src={
                  data.Property?.image_url ||
                  "https://via.placeholder.com/600x400"
                }
                width={600}
                height={400}
                alt="Property"
                className="w-full h-72 object-cover rounded"
              />
              <div className="flex gap-2 mt-4">
                {data.Gallery_images?.map((image, index) => (
                  <Image
                    key={index}
                    width={100}
                    height={100}
                    src={image.image_url}
                    alt={`Thumbnail ${index + 1}`}
                    style={{ objectFit: "cover" }}
                    className="w-24 h-24 rounded "
                  />
                ))}
              </div>
            </div>
            {/* Property Description Section */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="mt-2">
                {data.Property?.description || "No description available"}
              </p>
            </div>
            {/* Property Details Section */}
            <div className="mb-6">
              <hr className="my-4" />
              <h2 className="text-xl font-semibold">Details</h2>
              <div className="flex justify-between mt-4">
                <div>
                  <div>Type : {data.Property?.type ?? "-"}</div>
                  <div>Area : {data.Property?.area ?? "-"}</div>
                  <div>Area Unit : {data.Property?.area_unit ?? "-"}</div>
                  <div>Bathroom : {data.Property?.bathroom ?? "-"}</div>
                  <div>Bedroom : {data.Property?.bedroom ?? "-"}</div>
                  <div>Floor : {data.Property?.floor ?? "-"}</div>
                </div>
                {/* Add appropriate details here if available */}
              </div>
            </div>
            {/* Other Features Section */}
            <div className="mb-6">
              <h3 className="mt-4 text-lg font-semibold text-black">
                Other Features
              </h3>
              <hr className="my-4" />
              <ul className="list-disc list-inside mt-2">
                {data.Features?.length !== 0
                  ? renderFeatures(data.Features)
                  : "No Features Available"}
              </ul>
            </div>
            {/* More Details Section */}
            <div className="mb-6">
              <h3 className="mt-4 text-lg font-semibold text-black">
                More Details
              </h3>
              <hr className="my-4" />
              <ul className="list-disc list-inside mt-2">
                <div> City : {data.Property?.city} </div>
                <div className="text-lg font-semibold my-3">Agent Details</div>
                <div> Agent Name : {data.Property?.agent?.name} </div>
                {/* <div> Agent Name : {data.Property?.agent?.name} </div> */}
              </ul>
            </div>
            {/* Video Tour Section */}
            <div className="mb-6">
              <h3 className="mt-4 text-lg font-semibold text-black">
                Video Tour
              </h3>
              <hr className="my-4" />
              {data.Property?.video ? (
                renderVideo(data.Property.video)
              ) : (
                <p>No video available</p>
              )}
              <div className="mt-6">
                <button className="lg:flex hidden justify-center lg:w-1/4 w-1/2 py-2 px-4 border border-yellow-500 text-black transition-all rounded hover:bg-[#FFCE58]">
                  Talk to Seller
                </button>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="w-[30%] ">
            {/* Short Video Section */}
            <div className="flex mb-5 justify-between">
              <div className="bg-[#FFCE58] p-2 text-sm rounded-md w-fit">
                For {data.Property?.purpose}
              </div>
              <div className="bg-[#FFCE58] p-2 text-sm rounded-md w-fit font-semibold">
                Rs {data.Property?.price}
              </div>
            </div>
            <div className="mb-6">
              {data.Property?.short_video ? (
                renderVideo(data.Property.short_video)
              ) : (
                <p>No short video available</p>
              )}
            </div>
            {/* Recommended Section */}
            <div>
              <h2 className="text-xl font-semibold text-black text-start">
                Recommended for you
              </h2>
              <div className="flex flex-col gap-4 mt-4">
                {properties?.slice(0, 5)?.map((recommendation, index) => (
                  <Link href={`/properties/${recommendation.id}`}>
                    <div key={index} className="bg-white p-4 rounded shadow">
                      <Image
                        src={
                          recommendation.image_url ||
                          "https://via.placeholder.com/300x200"
                        }
                        width={200}
                        height={100}
                        alt="Recommended Property"
                        style={{ objectFit: "cover" }}
                        className="w-full h-[100px] rounded"
                      />
                      <div className="mt-2">
                        <h3 className="text-lg font-semibold">
                          {recommendation.title || "Recommended Property"}
                        </h3>
                        <p>{recommendation.price || "PKR"}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <button className="lg:hidden flex justify-center lg:w-1/4 w-1/2 py-2 px-4 border border-yellow-500 text-black transition-all rounded hover:bg-[#FFCE58]">
                Talk to Seller
              </button>
            </div>
          </div>
        </div>
        <button
          className="fixed bottom-6 right-6 bg-[#FFCE58] text-white transition-all py-3 px-6 rounded-full shadow-lg hover:bg-black focus:outline-none"
          onClick={() => {
            // Add your contact logic here
            alert("Contact Now");
          }}
        >
          Contact Now
        </button>
      </div>
    </>
  );
};

export default Page;
