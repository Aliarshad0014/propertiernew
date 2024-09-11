import React from "react";
import Link from "next/link";
import Image from "next/image";
import noImg from "@/image/noImg.svg";
const HotSale = ({ data }) => {
  // console.log(data);
  return (
    <div className=" flex items-center justify-center relative z-10">
      <div className="flex flex-col items-center">
        <div className="p-8 pt-0 text-start">
          <h2 className="text-3xl font-bold mb-10 text-start text-[#FFCE58]">
            Blazing Deals!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
            {data?.slice(0, 4).map((property, index) => (
              <Link key={index} href={`/properties/${property?.id}`} passHref>
                <div className="relative cursor-pointer w-[300px] h-[370px] bg-white rounded-md shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-48 w-full">
                    {property?.image_url ? (
                      <Image
                        src={property?.image_url}
                        alt={property?.image_url}
                        layout="fill"
                        // className="object-cover"
                      />
                    ) : (
                      <Image
                        src={noImg}
                        alt={noImg}
                        layout="fill"
                        // className="object-cover"
                      />
                    )}

                    <div className="absolute top-2 right-2 bg-[#FFCE58] text-black text-xs font-regular p-1">
                      {property?.purpose}
                    </div>
                    <div className="absolute bottom-2 bg-black text-white text-xs font-bold p-1 rounded-sm">
                      {property?.type}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between mb-5">
                      <span className="text-yellow-500 font-bold text-xl">
                        {property?.price} PKR
                      </span>
                    </div>
                    {/* <hr className="border-gray-500 bottom-1" /> */}

                    <div className="flex flex-col justify-end">
                      <h3 className="text-md font-semibold text-black mb-2">
                        {property?.title}
                      </h3>
                      <p className="text-sm text-gray-600">{property?.city}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-5 z-10">
          <Link
            href="/properties"
            className="bg-yellow-400 hover:bg-black transition-all text-black hover:text-white py-2 px-4 rounded-md shadow-lg">
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotSale;
