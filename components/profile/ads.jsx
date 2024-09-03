import Image from "next/image";
import React, { useState } from "react";

const AdsComponent = () => {
  const [ads, setAds] = useState([
    {
      id: 1,
      title: "Ad Title 1",
      region: "Region A",
      sponsored: false,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Ad Title 2",
      region: "Region B",
      sponsored: true,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Ad Title 3",
      region: "Region C",
      sponsored: false,
      imageUrl: "https://via.placeholder.com/150",
    },
    // Add more ads as needed
  ]);

  const handleSponsoredToggle = (id) => {
    const updatedAds = ads.map((ad) => {
      if (ad.id === id) {
        // Toggle the current ad's sponsored status
        const updatedAd = { ...ad, sponsored: !ad.sponsored };

        // Check if trying to set as sponsored
        if (updatedAd.sponsored) {
          // Check if another ad is already sponsored
          const isAnotherSponsored = ads.some(
            (ad) => ad.id !== id && ad.sponsored
          );
          if (isAnotherSponsored) {
            // Show error message or handle as needed
            alert("Error: Only one ad can be sponsored at a time.");
            return ad; // Keep current state without updating
          }
        }

        return updatedAd; // Update the ad's sponsored status
      }
      return ad; // Keep other ads unchanged
    });

    setAds(updatedAds);
  };

  const handleRegionSelect = (id, region) => {
    const updatedAds = ads.map((ad) =>
      ad.id === id ? { ...ad, region: region } : ad
    );
    setAds(updatedAds);
  };

  return (
    <div className="ads-component">
      {/* <h2>Ads Component</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ads.map((ad) => (
          <div key={ad.id} className="ad-card bg-white rounded-lg shadow-md">
            <Image
              width={100}
              height={100}
              src={ad.imageUrl}
              alt={ad.title}
              className=" h-60 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{ad.title}</h3>
              <p className="mb-2">Region: {ad.region}</p>
              <p className="mb-4">Sponsored: {ad.sponsored ? "Yes" : "No"}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleSponsoredToggle(ad.id)}
                  className={`px-4 py-2 ${
                    ad.sponsored ? "bg-red-500" : "bg-blue-500"
                  } text-white rounded-md hover:bg-blue-600`}
                >
                  {ad.sponsored ? "Sponsored" : "Make Sponsored"}
                </button>
                <select
                  value={ad.region}
                  onChange={(e) => handleRegionSelect(ad.id, e.target.value)}
                  className="px-4 py-2 bg-gray-200 rounded-md focus:outline-none"
                >
                  <option value="Region A">Region A</option>
                  <option value="Region B">Region B</option>
                  <option value="Region C">Region C</option>
                  {/* Add more regions as needed */}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdsComponent;
