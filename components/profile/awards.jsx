import React, { useState, useEffect } from "react";
import url from "@/config/axios";
import moment from "moment";

const AwardsComponent = () => {
  const [allAwardsServices, setAllAwardsServices] = useState([]);
  const [btnLoad, setBtnLoad] = useState(false);

  useEffect(() => {
    getAwardsServices();
  }, []);

  const getAwardsServices = async () => {
    setBtnLoad(true);
    url
      .get(`/properties/awards/`)
      .then(async (res) => {
        setAllAwardsServices(res.data);
        setBtnLoad(false);
      })
      .catch((e) => {
        console.log(e);
        setBtnLoad(false);
      });
  };

  return (
    <div className="bg-white min-h-screen py-8">
      {/* Banners Section */}
      <div className="flex flex-col items-center mb-8">
        {/* Feature Ads Banner */}
        <div className="relative w-full mb-4">
          <div className="w-full h-36 bg-blue-100 rounded-t-lg shadow-md flex items-center justify-center">
            <button className="hover:bg-white w-44 text-blue-500 px-4 py-2 rounded bg-blue-200 transition duration-300">
              Feature Ads
            </button>
          </div>
        </div>

        {/* Banner Ads Banner */}
        <div className="relative w-full mb-4">
          <div className="w-full h-36 bg-green-100 rounded-t-lg shadow-md flex items-center justify-center">
            <button className="hover:bg-white w-44 text-green-500 px-4 py-2 rounded bg-green-200 transition duration-300">
              Banner Ads
            </button>
          </div>
        </div>

        {/* Blazing Deals Banner */}
        <div className="relative w-full">
          <div className="w-full h-36 bg-yellow-100 rounded-t-lg shadow-md flex items-center justify-center">
            <button className="hover:bg-white w-44 text-yellow-500 px-4 py-2 rounded bg-yellow-200 transition duration-300">
              Add Blazing Deals
            </button>
          </div>
        </div>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map through demo data to render each award */}
        {allAwardsServices.map((award) => (
          <div
            key={award.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div className="flex flex-col h-full">
              <div>
                <h3 className="text-lg font-semibold mb-2">{award?.title}</h3>
                <p className="text-gray-600 mb-2">{award?.description}</p>
              </div>
              <div className="mt-auto">
                <p className="text-gray-500 text-sm">
                  {moment(award?.date).format("MMMM YYYY")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsComponent;
