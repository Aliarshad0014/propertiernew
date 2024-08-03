"use client";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";
import TopBanner from "../../TopBanner/TopBanner";
import axios from "@/config/axios"; // Assuming you're using axios for API calls
import BounceLoader from "react-spinners/BounceLoader";
import FeaturedCard from "./FeaturedCard";
import Link from "next/link";

export default function ServicesList() {
  const [selectedService, setSelectedService] = useState("");
  const [allFixedServices, setAllFixedServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);
  const [page, setPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages

  useEffect(() => {
    getFilteredServices();
    getFixedServices();
  }, [page, selectedService]); // Fetch services when page or selectedService changes

  const getFilteredServices = async () => {
    setBtnLoad(true);
    axios
      .get(`/services/vendor-services-with-pagination/`, {
        params: {
          page: page,
          limit: 20,
          service_id: selectedService ? selectedService : "",
        },
      })
      .then((res) => {
        setAllFixedServices(res.data.results);
        setTotalPages(res.data.total_pages);
        setBtnLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setBtnLoad(false);
      });
  };

  const getFixedServices = async () => {
    setBtnLoad(true);
    axios
      .get(`/services/fixed-services/`)
      .then((res) => {
        setAllServices(res.data);
        setBtnLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setBtnLoad(false);
      });
  };

  const handleChange = (event) => {
    setSelectedService(event.target.value);
  };

  const getServiceTitleById = (id) => {
    const service = allServices.find((service) => service.id === id);
    return service ? service.title : "Select Service";
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <TopBanner
        title={"Services"}
        firstCrumb={"Services"}
        firstCrumbLink={"/services"}
      />
      <div className="w-full flex justify-center -mt-10 absolute">
        <div className="bg-[#131A22] h-[90px] flex w-[50%] rounded-md">
          <div className="flex items-center bg-gray-900 px-4 gap-3 w-full rounded-lg">
            <Box sx={{ minWidth: 120, width: "100%" }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedService}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(value) => getServiceTitleById(value)}
                  sx={{
                    background: "white",
                    color: "black",
                    width: "100%",
                    height: "40px",
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Service
                  </MenuItem>
                  {allServices?.map((e, i) => (
                    <MenuItem key={i} value={e.id}>
                      {e.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <button
              onClick={getFilteredServices}
              className="py-2 px-10 bg-yellow-500 text-gray-900 rounded-md"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#ffffff] mt-20 flex flex-col items-center text-black">
        <div className="flex flex-col items-center w-[70%]">
          <div className="w-full flex justify-center font-semibold">
            <Link href={"/services"}>
              <button className="py-2 px-10 bg-yellow-500 text-gray-900 rounded-md">
                Explore More Services
              </button>
            </Link>
          </div>
          <div className="text-3xl font-bold text-black mb-5 mt-10">
            Services
          </div>
          <div className="my-5 text-sm text-center">
            At Propertier, we offer a comprehensive suite of real estate and
            construction services to meet all your property needs. Our team of
            experts specializes in document verification, property valuation,
            architectural design, and a wide range of surveying and engineering
            services. We also provide skilled labor, machinery rental, and
            property maintenance. Trust Propertier for top-notch solutions and
            expert guidance in every aspect of property management and
            development.
          </div>

          <div className="my-4 flex flex-wrap gap-7 justify-center">
            {btnLoad ? (
              <BounceLoader color="#eab308" />
            ) : (
              allFixedServices?.map((e, i) => (
                <FeaturedCard key={i} allService={e} />
              ))
            )}
          </div>
          <div className="my-5">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
