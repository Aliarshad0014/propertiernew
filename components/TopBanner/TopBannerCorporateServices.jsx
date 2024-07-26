import React from "react";
import servicesbg from "@/image/Services-bg.svg";
import Image from "next/image";
export default function TopBanner() {
  return (
    <div>
      <div className="relative">
        <Image src={servicesbg} alt="servicesbg" />
        <div className="absolute top-[30%] left-[42%] flex flex-col gap-3 items-center">
          <div className="text-[#FFE42B] font-semibold text-lg">Propertier</div>
          <div className="text-2xl font-bold">Corporate Services</div>
          <div>Home / Corporate Services </div>
        </div>
      </div>
    </div>
  );
}
