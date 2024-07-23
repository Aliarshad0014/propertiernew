import React, { useState, useEffect } from "react";
import LargeScreenVideoShorts from "./largescreenshortscomponent"; // Import your existing large screen component
import SmallScreenVideoShorts from "./smallscreenvideoshorts"; // Import the new small screen component

const VideoShorts = ({ data }) => {
  const [playingIndex, setPlayingIndex] = useState(0);
  const [likedVideos, setLikedVideos] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Set initial screen size
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

export default VideoShorts;
