"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

import "../../app/globals.css";
import LargeScreenVideoShorts from "./largescreenshortscomponent";
import SmallScreenVideoShorts from "./smallscreenvideoshorts";

const AllShortsPage = () => {
  const [data, setData] = useState([]);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://propertier-p2wwcx3okq-em.a.run.app/properties/ComputerHomePage"
        );
        setData(response.data.Data.properties);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLikeClick = async (index) => {
    try {
      const { id, agent } = data[index]; // Assuming data[index] contains the property details

      // Check if the video is already liked
      const isLiked = likedVideos.includes(index);

      if (isLiked) {
        // Unlike video
        const response = await axios.post(
          "https://propertier-p2wwcx3okq-em.a.run.app/properties/LikeOrUnlike/",
          {
            agent_id: agent.id,
            property_id: id,
          }
        );
        console.log("Unlike action response:", response.data);

        setLikedVideos((prevLikedVideos) =>
          prevLikedVideos.filter((item) => item !== index)
        );
      } else {
        // Like video
        const response = await axios.post(
          "https://propertier-p2wwcx3okq-em.a.run.app/properties/LikeOrUnlike/",
          {
            agent_id: agent.id,
            property_id: id,
            action: "like", // Adjust based on your API's requirements
          }
        );
        console.log("Like action response:", response.data);

        setLikedVideos((prevLikedVideos) => [...prevLikedVideos, index]);
      }
      console.log("Data fetched for index", index, ":", data[index]);
    } catch (error) {
      console.error("Error while liking video:", error);
    }
  };

  return isSmallScreen ? (
    <SmallScreenVideoShorts
      data={data}
      playingIndex={playingIndex}
      setPlayingIndex={setPlayingIndex}
      likedVideos={likedVideos}
      setLikedVideos={setLikedVideos}
    />
  ) : (
    <LargeScreenVideoShorts
      data={data}
      playingIndex={playingIndex}
      setPlayingIndex={setPlayingIndex}
      likedVideos={likedVideos}
      setLikedVideos={setLikedVideos}
    />
  );
};

export default AllShortsPage;
