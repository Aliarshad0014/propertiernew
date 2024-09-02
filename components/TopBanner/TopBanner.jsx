import React from "react";
import servicesbg from "@/image/properties.png";
import Image from "next/image";
import Link from "next/link";

export default function TopBanner({
  title,
  firstCrumb,
  firstCrumbLink,
  secondCrumb,
  coverImg,
}) {
  // console.log(coverImg);
  return (
    <div className="relative">
      <div className="relative h-[50vh]">
        <Image
          src={coverImg ? coverImg : servicesbg}
          alt="servicesbg"
          className="h-full w-full object-cover"
        />
        {/* Overlay for darkening the image */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
        {/* Content on top of the image */}
        <div className="absolute top-[30%] left-[45%] flex flex-col gap-3 items-center z-10 text-white">
          <div className="text-[#FFE42B] font-semibold text-lg">Propertier</div>
          <div className="text-2xl font-bold">{title}</div>
          <div>
            <Link href={"/"}> Home </Link>/{" "}
            <Link href={firstCrumbLink ?? "/"}> {firstCrumb} </Link>
            {secondCrumb ? "/ " + secondCrumb : null}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
