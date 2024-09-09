import React, { useEffect, useState } from "react";
import axios from "@/config/axios";
import NoData from "@/icons/NoData";
import ScaleLoader from "react-spinners/ScaleLoader";

const ShortVideosGridComponent = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasWindow = typeof window !== "undefined";
  let user;

  if (hasWindow) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  useEffect(() => {
    axios
      .get(`/properties/user-short-videos/${user?.id}`)
      .then((response) => {
        setVideos(response.data); // Assuming the API returns an array of videos
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="">
        <h2 className="text-2xl font-bold mb-8">Your Short Videos</h2>
        {loading ? (
          <div className="flex justify-center items-center">
            <ScaleLoader color="#eab308" />
          </div>
        ) : videos?.length === 0 ? (
          <NoData />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
            {videos.map((video) => (
              <div key={video.id} className="p-4 rounded-sm">
                <video
                  controls
                  className="w-auto h-96 object-cover rounded-md mb-2"
                  style={{ width: "225px", height: "400px" }}>
                  <source src={video?.short_video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortVideosGridComponent;
