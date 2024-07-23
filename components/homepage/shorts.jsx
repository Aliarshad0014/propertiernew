import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { GrPrevious, GrNext } from "react-icons/gr";
import { AiFillHeart, AiOutlineHeart, AiOutlineShareAlt } from "react-icons/ai";
import '../../app/globals.css';

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
    <div className="flex flex-col min-h-[50vh] items-center justify-center lg:min-h-[100vh]">
      <h1 className="text-4xl font-bold mt-20 text-yellow-500">Short Videos</h1>
      <div className="video-shorts-wrapper flex justify-center items-center w-full">
        <button className="prev-button rounded-full" onClick={handlePrev}>
          <GrPrevious size={30} color="#eaab0c" />
        </button>
        <div className="video-shorts-container flex justify-center items-center space-x-4">
          {data.map((item, index) => (
            <div
              key={index}
              className={`video-box relative ${index === playingIndex ? "focused" : ""}`}
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
                className={`video-element ${index === playingIndex ? "playing" : ""}`}
                style={{
                  transform: index === playingIndex ? 'scale(1.1)' : 'scale(0.9)',
                  boxShadow: index === playingIndex ? '0 10px 15px rgba(0, 0, 0, 0.5)' : 'none'
                }}
              />
              <div className="absolute bottom-10 right-6 flex flex-col space-y-4">
                <button className="heart-button" onClick={() => handleLikeClick(index)}>
                  {likedVideos.includes(index) ? (
                    <AiFillHeart size={30} color="red" />
                  ) : (
                    <AiOutlineHeart size={30} color="white" />
                  )}
                </button>
                <button className="share-button">
                  <AiOutlineShareAlt size={30} color="white" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="next-button rounded-full" onClick={handleNext}>
          <GrNext size={30} color="#eaab0c" />
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
