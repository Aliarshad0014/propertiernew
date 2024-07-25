"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const Page = ({ params }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <video width="100%" height="400" controls className="w-full h-auto rounded">
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <div className="container mx-auto p-6 bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 lg:ml-44">{data.Property?.title || 'Property Title'}</h1>
      <div className="flex flex-col lg:flex-row gap-6 justify-center">
        {/* Left Column */}
        <div className="lg:w-3/6">
          {/* Property Pictures Section */}
          <div className="mb-6">
            <Image
              src={data.Property?.image_url || "https://via.placeholder.com/600x400"}
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
            <p className="mt-2">{data.Property?.description || 'No description available'}</p>
          </div>
          {/* Property Details Section */}
          <div className="mb-6">
            <hr className="my-4" />
            <h2 className="text-xl font-semibold">Details</h2>
            <div className="flex justify-between mt-4">
              {/* Add appropriate details here if available */}
            </div>
          </div>
          {/* Other Features Section */}
          <div className="mb-6">
            <h3 className="mt-4 text-lg font-semibold text-black">Other Features</h3>
            <hr className="my-4" />
            <ul className="list-disc list-inside mt-2">
              {data.Features && renderFeatures(data.Features)}
            </ul>
          </div>
          {/* More Details Section */}
          <div className="mb-6">
            <h3 className="mt-4 text-lg font-semibold text-black">More Details</h3>
            <hr className="my-4" />
            <ul className="list-disc list-inside mt-2">
              {data.Features && renderFeatures(data.Features)}
            </ul>
          </div>
          {/* Video Tour Section */}
          <div className="mb-6">
            <h3 className="mt-4 text-lg font-semibold text-black">Video Tour</h3>
            <hr className="my-4" />
            {data.Property?.video ? renderVideo(data.Property.video) : <p>No video available</p>}
            <div className="mt-6">
              <button className="lg:flex hidden justify-center lg:w-1/4 w-1/2 py-2 px-4 border border-yellow-500 text-black transition-all rounded hover:bg-yellow-500">
                Talk to Seller
              </button>
            </div>
          </div>
        </div>
        {/* Right Column */}
        <div className="lg:w-1/4">
          {/* Short Video Section */}
          <div className="mb-6">
            {data.Property?.short_video ? renderVideo(data.Property.short_video) : <p>No short video available</p>}
          </div>
          {/* Recommended Section */}
          <div>
            <h2 className="text-xl font-semibold text-black text-start">Recommended for you</h2>
            <div className="flex flex-col gap-4 mt-4">
              {data.Related_Properties?.map((recommendation, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <Image
                    src={recommendation.image_url || "https://via.placeholder.com/300x200"}
                    width={300}
                    height={200}
                    alt="Recommended Property"
                    style={{ objectFit: "cover" }}
                    className="w-full h-auto rounded"
                  />
                  <div className="mt-2">
                    <h3 className="text-lg font-semibold">{recommendation.title || 'Recommended Property'}</h3>
                    <p>{recommendation.price || 'PKR'}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="lg:hidden flex justify-center lg:w-1/4 w-1/2 py-2 px-4 border border-yellow-500 text-black transition-all rounded hover:bg-yellow-500">
                Talk to Seller
              </button>
          </div>
        </div>
      </div>
      <button
        className="fixed bottom-6 right-6 bg-yellow-500 text-white transition-all py-3 px-6 rounded-full shadow-lg hover:bg-black focus:outline-none"
        onClick={() => {
          // Add your contact logic here
          alert('Contact Now');
        }}
      >
        Contact Now
      </button>
    </div>
  );
};

export default Page;
