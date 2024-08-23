import React, { useRef, useEffect } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
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
const VerticalVideoShorts = ({
  data,
  playingIndex,
  setPlayingIndex,
  likedVideos,
  setLikedVideos,
}) => {
  const videoRefs = useRef(Array(data.length).fill(null));

  useEffect(() => {
    const handleVideoChange = () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === playingIndex) {
            video.play();
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    };

    handleVideoChange();
  }, [playingIndex]);

  const handleNext = () => {
    setPlayingIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setPlayingIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  };

  const handleLikeClick = async (e, index) => {
    e.stopPropagation();
    try {
      const { id, agent } = data[index];
      const isLiked = likedVideos.includes(index);

      if (isLiked) {
        await axios.post(
          "https://propertier-p2wwcx3okq-em.a.run.app/properties/LikeOrUnlike/",
          {
            agent_id: agent.id,
            property_id: id,
          }
        );
        setLikedVideos((prevLikedVideos) =>
          prevLikedVideos.filter((item) => item !== index)
        );
      } else {
        await axios.post(
          "https://propertier-p2wwcx3okq-em.a.run.app/properties/LikeOrUnlike/",
          {
            agent_id: agent.id,
            property_id: id,
            action: "like",
          }
        );
        setLikedVideos((prevLikedVideos) => [...prevLikedVideos, index]);
      }
    } catch (error) {
      console.error("Error while liking video:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen p-10 bg-white text-white">
      <h1 className="text-3xl font-bold mt-10 text-black">Short Videos</h1>
      <div className="flex flex-col items-center w-full max-w-md mx-auto space-y-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`relative w-full mx-auto cursor-pointer ${
              index === playingIndex ? "block" : "hidden"
            }`}
            style={{
              height: "100vh",
            }}
          >
            <video
              ref={(el) => {
                if (el) {
                  videoRefs.current[index] = el;
                }
              }}
              src={item.short_video}
              className="w-full h-full object-cover rounded-lg"
              loop
              playsInline
            />
            <div className="absolute bottom-8 right-4 flex flex-col space-y-2">
              <button
                className="bg-none border-none cursor-pointer transform transition-transform hover:scale-110"
                onClick={(e) => handleLikeClick(e, index)}
              >
                {likedVideos.includes(index) ? (
                  <AiFillHeart size={24} className="text-red-500" />
                ) : (
                  <AiOutlineHeart size={24} />
                )}
              </button>
              <button className="bg-none border-none cursor-pointer transform transition-transform hover:scale-110">
                <AiOutlineShareAlt size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-4">
        <button
          className="bg-white text-black rounded-full p-2"
          onClick={handlePrev}
        >
          <FaArrowUp size={24} />
        </button>
        <button
          className="bg-white text-black rounded-full p-2"
          onClick={handleNext}
        >
          <FaArrowDown size={24} />
        </button>
      </div>
    </div>
  );
};

export default VerticalVideoShorts;
