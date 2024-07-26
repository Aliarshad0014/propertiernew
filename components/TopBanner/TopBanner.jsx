import React from "react";
import servicesbg from "@/image/Services-bg.svg";
import Image from "next/image";
import Link from "next/link";
export default function TopBanner({
  title,
  firstCrumb,
  firstCrumbLink,
  secondCrumb,
}) {
  return (
    <div>
      <div className="relative">
        <Image src={servicesbg} alt="servicesbg" />
        <div className="absolute top-[30%] left-[45%] flex flex-col gap-3 items-center">
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
