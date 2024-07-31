import Image from "next/image";
import { useState } from "react";

const VideoCard = ({ videoSrc, title, description, likesCount, avatarSrc }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(likesCount);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="relative">
        <video className="w-full h-[350px]" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute top-2 right-2 flex flex-col items-center space-y-2">
          <button onClick={handleLike} className="text-white">
            {isLiked ? (
              <svg
                className="w-6 h-6 fill-current text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 fill-current text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            )}
          </button>
          <p className="text-white">{likes}</p>
        </div>
      </div>
      {/* <div className="px-6 py-4">
        <div className="flex items-center">
          <Image
            src={avatarSrc}
            alt="Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="ml-4">
            <div className="font-bold text-xl mb-2">{title}</div>
            <p className="text-gray-700 text-base">{description}</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default VideoCard;
