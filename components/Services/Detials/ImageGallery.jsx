import { useState } from "react";
import Image from "next/image";
import noimg from "@/image/noimg.svg";

const ImageGallery = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  const [erroredImages, setErroredImages] = useState({});
  const [mainImageError, setMainImageError] = useState(false);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
    setMainImageError(false); // Reset the main image error state
  };

  const handleImageError = (index) => {
    setErroredImages((prev) => ({ ...prev, [index]: true }));
  };

  const handleMainImageError = () => {
    setMainImageError(true);
  };

  const getImageSrc = (src, index) => {
    return erroredImages[index] ? noimg : src;
  };

  return (
    <div className="container mx-auto ">
      <div className="main-image mb-4">
        <div className="w-auto h-64 relative">
          <Image
            src={mainImageError ? noimg : selectedImage}
            alt="Selected"
            layout="fill"
            // objectFit="cover"
            className="rounded-lg"
            onError={handleMainImageError}
          />
        </div>
      </div>
      <div className="thumbnails flex justify-start space-x-4">
        {images?.map((image, index) => (
          <div
            key={index}
            className="thumbnail cursor-pointer"
            onClick={() => handleThumbnailClick(image)}
          >
            <div className="w-24 h-24 relative">
              <Image
                src={getImageSrc(image, index)}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
                onError={() => handleImageError(index)}
                className={`rounded-lg ${
                  selectedImage === image ? "border-2 border-yellow-500" : ""
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
