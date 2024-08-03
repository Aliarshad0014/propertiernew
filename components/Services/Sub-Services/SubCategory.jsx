"use client";
import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TopBanner from "../../TopBanner/TopBanner";
import ServicesCard from "./ServicesCard";
import url from "@/config/axios";
import BounceLoader from "react-spinners/BounceLoader";
import OtherServices from "./OtherServices";
import OurPartners from "./OurPartners";
import FeaturedCard from "../Serviceslist/FeaturedCard";

export default function SubCategory({ paramsID }) {
  const [allService, setAllService] = useState([]);
  const [allSubServices, setAllSubServices] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);

  useEffect(() => {
    getSubServices();
    getFixedServices();
  }, []);

  const getSubServices = async () => {
    setBtnLoad(true);
    url
      // .get(`/services/service/${paramsID}/sub-services/`)

      .get(
        `/services/vendor-services-with-pagination/?page=1&limit=20&service_id=${paramsID}`
      )
      .then(async (res) => {
        setAllSubServices(res.data);
        setBtnLoad(false);
      })
      .catch((e) => {
        setBtnLoad(false);

        console.log(e);
      });
  };

  const getFixedServices = async () => {
    setBtnLoad(true);
    url
      .get(`/services/fixed-services/`)
      .then(async (res) => {
        setAllService(res.data);
        setBtnLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setBtnLoad(false);
      });
  };

  // console.log(allSubServices?.results[0]?.service?.title);
  return (
    <div>
      <TopBanner
        title={"Services"}
        firstCrumb={"Services"}
        firstCrumbLink={"/services"}
        secondCrumb={allSubServices?.results?.[0]?.service?.title}
      />
      {/* <div className="w-full flex justify-center  -mt-10 absolute">
        <div className="bg-[#131A22] h-[90px] flex w-[70%] rounded-md">
          <div className="flex items-center bg-gray-900 px-4 gap-3 w-full rounded-lg">
            <Box sx={{ minWidth: 120, width: "100%" }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={allService}
                  onChange={handleChange}
                  sx={{
                    background: "white",
                    color: "black",
                    width: "100%",
                    height: "40px",
                  }}
                >
                  <MenuItem value={"Electricity"}>Electricity</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <button
              // onClick={handleSearch}
              className="py-2 px-10 bg-yellow-500 text-gray-900 rounded-md "
            >
              Search
            </button>
          </div>
        </div>
      </div> */}

      <div className="bg-[#ffffff] mt-20 flex flex-col items-center text-black">
        <div className="flex flex-col items-center w-[70%]">
          <div className="text-3xl font-bold text-black mb-5 mt-10">
            {allSubServices?.results?.[0]?.service?.title}
          </div>

          <div className="my-4 mb-10 flex flex-wrap gap-7 justify-center">
            {btnLoad ? (
              <BounceLoader color="#eab308" />
            ) : (
              allSubServices?.results?.map((e, i) => {
                return <FeaturedCard allService={e} subCategory={true} />;
              })
            )}
          </div>
        </div>
      </div>

      <main>
        <OtherServices allService={allService} />
        {/* <OurPartners /> */}
      </main>
    </div>
  );
}
