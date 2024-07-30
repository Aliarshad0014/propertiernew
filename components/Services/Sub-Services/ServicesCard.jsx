import React, { useState } from "react";
import serviceImg from "@/image/serviceImg.png";
import Image from "next/image";
import ElectricityIcon from "@/icons/ElectricityIcon";
import Link from "next/link";
export default function ServicesCard({ allService, subCategory }) {
  const [imgSrc, setImgSrc] = useState(
    allService?.cover_image_url || serviceImg
  );

  const handleError = () => {
    setImgSrc(serviceImg);
  };
  return (
    <div className="mb-8 ">
      {" "}
      <div className="max-w-sm mx-auto  relative ">
        <div>
          <Image
            src={imgSrc}
            alt="Electricity"
            width={310}
            height={310}
            onError={handleError}
          />
        </div>
        <div className="w-full flex justify-center absolute -mt-7 ">
          <div className="flex items-center p-4  w-[90%] bg-white rounded-lg shadow-md hover:bg-[#FFCE58] hover:text-white cursor-pointer">
            <Link
              href={
                subCategory
                  ? `/services/sub-category/detial/${allService?.id}`
                  : `/services/sub-category/${allService?.id}`
              }
              className="w-full flex justify-between items-center "
            >
              <div className="w-full flex justify-between items-center ">
                <span className="ml-2 text-gray-700 font-medium ">
                  {allService?.title}
                </span>

                {allService?.image_url ? (
                  <Image
                    src={allService?.image_url}
                    alt="Electricity"
                    width={20}
                    height={20}
                  />
                ) : (
                  <ElectricityIcon />
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
