import React from "react";
import serviceImg from "@/image/serviceImg.png";
import Image from "next/image";
import ElectricityIcon from "@/icons/ElectricityIcon";
export default function ServicesCard() {
  return (
    <div className="mb-8 ">
      {" "}
      <div className="max-w-sm mx-auto  relative ">
        <div>
          <Image src={serviceImg} alt="Electricity" width={310} height={310} />
        </div>
        <div className="w-full flex justify-center absolute -mt-7 ">
          <div className="flex items-center p-4  w-[90%] bg-white rounded-lg shadow-md hover:bg-[#FFCE58] hover:text-white cursor-pointer">
            <div className="w-full flex justify-between items-center ">
              <span className="ml-2 text-gray-700 font-medium ">
                Electricity
              </span>
              <ElectricityIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
