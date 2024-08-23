import React, { useRef, useState, useEffect } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import axios from "axios";

/**
 * @typedef {Object} VideoData
 * @property {string} short_video - The URL of the short video.
 */

/**
 * @param {Object} props
 * @param {VideoData[]} props.data - Array of video data objects.
 * @param {number} props.playingIndex - Index of the currently playing video.
 * @param {function(number): void} props.setPlayingIndex - Function to set the currently playing video index.
 * @param {number[]} props.likedVideos - Array of indices of liked videos.
 * @param {function(number): void} props.setLikedVideos - Function to set liked videos.
 */
const SmallScreenVideoShorts = ({
  data,
  playingIndex,
  setPlayingIndex,
  likedVideos,
  setLikedVideos,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    // Pause all other videos
    const handleVideoChange = () => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    };

    handleVideoChange();
  }, [playingIndex]);

  const handlePrev = () => {
    setPlayingIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  };

  const handleNext = () => {
    setPlayingIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleLikeClick = async (e) => {
    e.stopPropagation();
    try {
      const { id, agent } = data[playingIndex];

      const isLiked = likedVideos.includes(playingIndex);

      if (isLiked) {
        const response = await axios.post(
          "https://propertier-p2wwcx3okq-em.a.run.app/properties/LikeOrUnlike/",
          {
            agent_id: agent.id,
            property_id: id,
          }
        );
        console.log("Unlike action response:", response.data);

        setLikedVideos((prevLikedVideos) =>
          prevLikedVideos.filter((item) => item !== playingIndex)
        );
      } else {
        const response = await axios.post(
          "https://propertier-p2wwcx3okq-em.a.run.app/properties/LikeOrUnlike/",
          {
            agent_id: agent.id,
            property_id: id,
            action: "like",
          }
        );
        console.log("Like action response:", response.data);

        setLikedVideos((prevLikedVideos) => [...prevLikedVideos, playingIndex]);
      }
    } catch (error) {
      console.error("Error while liking video:", error);
    }
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen items-center justify-center p-4 bg-white">
      <h1 className="text-3xl font-bold mt-10 mb-4 text-yellow-500">
        Short Videos
      </h1>
      <div className="relative flex flex-col items-center w-full">
        <div className="relative flex-none w-full mx-1">
          <video
            ref={videoRef}
            src={data[playingIndex]?.short_video}
            className="w-full h-auto cursor-pointer object-cover rounded-lg"
            onClick={handleVideoClick}
            webkit-playsinline
            playsinline
          />
          <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
            <button
              className="bg-none border-none cursor-pointer transform transition-transform hover:scale-110"
              onClick={handleLikeClick}
            >
              {likedVideos.includes(playingIndex) ? (
                <AiFillHeart size={24} className="text-red-500" />
              ) : (
                <AiOutlineHeart size={24} className="text-white" />
              )}
            </button>
            <button className="bg-none border-none cursor-pointer transform transition-transform hover:scale-110">
              <AiOutlineShareAlt size={24} className="text-white" />
            </button>
          </div>
        </div>
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full border-none p-2 cursor-pointer text-lg transition-transform duration-300 z-10 text-yellow-500 bg-gray-100"
          onClick={handlePrev}
        >
          <GrPrevious size={24} />
        </button>
        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full border-none p-2 cursor-pointer text-lg transition-transform duration-300 z-10 text-yellow-500 bg-gray-100"
          onClick={handleNext}
        >
          <GrNext size={24} />
        </button>
      </div>
    </div>
  );
};

export default SmallScreenVideoShorts;
