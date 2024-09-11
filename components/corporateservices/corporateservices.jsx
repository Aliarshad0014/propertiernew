"use client";
import { useState } from "react";
import FooterSection from "@/components/footer";
import ERPFeatures from "@/components/corporateservices/erpfeatures";
import HRMFeatures from "@/components/corporateservices/hrmfeatures";
import Packages from "@/components/corporateservices/packages";
import ContactUs from "@/components/corporateservices/contactus";
import CRMFeatures from "@/components/corporateservices/crmfeatures";
import CMSFeatures from "@/components/corporateservices/cmsfeatures";
import LogoCarousel from "@/components/logocarousel";

import Link from "next/link";
import TopBanner from "../TopBanner/TopBanner";
import SearchBox from "../searchbox/searchboxpages";
import propertyImg from "@/image/corporate.png";

const CorporateServices = () => {
  return (
    <div className="min-h-screen overflow-hidden relative bg-white">
      {/* TopBanner Component */}
      {/* <TopBanner /> */}
      <TopBanner
        title={"Corporate Services"}
        firstCrumb={"Corporate Services"}
        firstCrumbLink={"/corporateservices"}
        coverImg={propertyImg}
      />

      {/* SearchBox Component */}
      {/* <div className="flex flex-col items-center justify-center bottom-10">
        <SearchBox />
      </div> */}

      <div className="py-4 mt-10">
        <Packages />
      </div>
      <div className="py-4">
        <ERPFeatures />
      </div>
      <div className="py-4">
        <HRMFeatures />
      </div>
      <div className="py-4">
        <CRMFeatures />
      </div>
      <div className="py-4">
        <CMSFeatures />
      </div>
      <div className="bg-gray-50 py-4">
        <ContactUs />
      </div>
      <div className="py-4">
        <LogoCarousel />
      </div>
      <div className="text-center bg-white py-4">
        <h2 className="text-2xl text-gray-700 font-semibold mb-6">
          Looking for more Services?
        </h2>
        <Link href="/allcorporateservices">
          <button className="bg-[#FFCE58] text-white py-2 px-4 transition-all rounded-md hover:bg-yellow-600">
            Show All Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CorporateServices;
