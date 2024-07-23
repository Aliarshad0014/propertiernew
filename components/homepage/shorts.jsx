import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { GrPrevious, GrNext } from "react-icons/gr";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";

/**
 * @typedef {Object} VideoData
 * @property {string} short_video - The URL of the short video.
 */

/**
 * @typedef {Object} HotSaleProps
 */

/**
 * @param {HotSaleProps} props - Component props.
 */
const VideoShorts = ({ data }) => {
  const [playingIndex, setPlayingIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);

  const videoRefs = useRef(Array(data.length).fill(null));

  useEffect(() => {
    videoRefs.current = videoRefs.current.slice(0, data.length);
  }, [data]);

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

  const handlePrev = () => {
    setPlayingIndex((prev) => (prev > 0 ? prev - 1 : data.length - 1));
  };

  const handleNext = () => {
    setPlayingIndex((prev) => (prev < data.length - 1 ? prev + 1 : 0));
  };

  const handleVideoClick = (index) => {
    setPlayingIndex(index);
    const video = videoRefs.current[index];
    if (video.paused) {
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }
  };

  const handleLikeClick = async (index) => {
    try {
      const { id, agent } = data[index]; // Assuming data[index] contains the property details

      // Check if the video is already liked
      const isLiked = likedVideos.includes(index);

      if (isLiked) {
        // Unlike video
        const response = await axios.post("https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/LikeOrUnlike/", {
          agent_id: agent.id,
          property_id: id,
        });
        console.log("Unlike action response:", response.data);

        setLikedVideos((prevLikedVideos) => prevLikedVideos.filter((item) => item !== index));
      } else {
        // Like video
        const response = await axios.post("https://propertier-p2wwcx3okq-em.a.run.app/api/mob/v1/LikeOrUnlike/", {
          agent_id: agent.id,
          property_id: id,
          action: "like", // Adjust based on your API's requirements
        });
        console.log("Like action response:", response.data);

        setLikedVideos((prevLikedVideos) => [...prevLikedVideos, index]);
      }
      console.log("Data fetched for index", index, ":", data[index]);
    } catch (error) {
      console.error("Error while liking video:", error);
    }
  };

  return (
    <div className="relative flex flex-col w-full min-h-screen items-center justify-center p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mt-10 mb-4 text-yellow-500">Short Videos</h1>
      <div className="relative flex items-center w-full md:w-4/5">
        <button
          className="absolute left-4 md:-left-8 top-1/2 transform -translate-y-1/2 rounded-full border-none p-2 md:p-3 cursor-pointer text-lg md:text-2xl transition-transform duration-300 z-10 bg-custom-color text-white"
          onClick={handlePrev}
        >
          <GrPrevious size={24} />
        </button>
        <div className="flex items-center w-full overflow-x-scroll md:overflow-hidden space-x-2 md:space-x-4">
          {data.map((item, index) => (
            <div
              key={index}
              className={`relative flex-none w-[40%] max-w-[40%] md:w-[30%] md:max-w-[30%] mx-1 md:mx-2 transition-transform duration-300 ${index === playingIndex ? "scale-90 md:scale-80 shadow-lg" : "scale-85 md:scale-90"}`}
              style={{ display: showAll || (index >= playingIndex - 1 && index <= playingIndex + 1) ? 'block' : 'none' }}
              onClick={() => handleVideoClick(index)}
            >
              <video
                ref={(el) => {
                  if (el) {
                    videoRefs.current[index] = el;
                  }
                }}
                src={item.short_video}
                className={`w-full h-auto cursor-pointer object-cover rounded-lg transition-opacity duration-300 ${index === playingIndex ? "opacity-100" : "opacity-70"}`}
              />
              <div className="absolute bottom-4 right-4 flex flex-col space-y-2 md:space-y-4">
                <button className="bg-none border-none cursor-pointer transform transition-transform hover:scale-110" onClick={() => handleLikeClick(index)}>
                  {likedVideos.includes(index) ? (
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
          ))}
        </div>
        <button
          className="absolute right-4 md:right-4 top-1/2 transform -translate-y-1/2 rounded-full border-none p-2 md:p-3 cursor-pointer text-lg md:text-2xl transition-transform duration-300 z-10 bg-custom-color text-white"
          onClick={handleNext}
        >
          <GrNext size={24} />
        </button>
      </div>
      <a
        href="/shorts"
        className="mt-4 mb-10 px-4 py-2 bg-yellow-500 hover:bg-black transition-all text-white rounded-md block text-center"
      >
        Show More
      </a>
    </div>
  );
};

export default VideoShorts;
