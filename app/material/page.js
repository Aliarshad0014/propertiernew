import React from "react";
import comingsoon from "@/image/comingsoon.svg";
import Image from "next/image";
export default function page() {
  return (
    <div className="h-screen flex items-center justify-center text-black">
      {/* <div className="flex items-center justify-center"> */}
      <Image
        src={comingsoon}
        alt="coming soon"
        width={100}
        height={100}
        className="w-full h-full object-cover"
      />
      {/* </div> */}
    </div>
  );
}
