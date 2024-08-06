import React, { useState } from "react";
import AdsComponent from "./ads";
import FloatingButton from "./floatingbutton";

const Franchise = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Property 1",
      email: "property1@example.com",
      phoneNumber: "+1234567890",
      city: "City 1",
      location: "Location 1",
      price: "$100,000",
      area: "1000 sqft",
      propertyType: "Apartment",
      note: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      name: "Property 2",
      email: "property2@example.com",
      phoneNumber: "+1987654321",
      city: "City 2",
      location: "Location 2",
      price: "$150,000",
      area: "1200 sqft",
      propertyType: "House",
      note: "Consectetur adipiscing elit",
    },
    {
      id: 3,
      name: "Property 3",
      email: "property3@example.com",
      phoneNumber: "+1122334455",
      city: "City 3",
      location: "Location 3",
      price: "$120,000",
      area: "800 sqft",
      propertyType: "Villa",
      note: "Sed do eiusmod tempor",
    },
    // Add more properties as needed
  ]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showRequestedProperties, setShowRequestedProperties] = useState(false);
  const [showRequestOfProperties, setShowRequestOfProperties] = useState(false);
  const [activeTab, setActiveTab] = useState("");

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const requestOfProperties = () => {
    setShowRequestOfProperties(true);
    setShowRequestedProperties(false);
    setActiveTab("requests");
  };

  const showRequestedPropertiesTable = () => {
    setShowRequestedProperties(true);
    setShowRequestOfProperties(false);
    setActiveTab("requests");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowDropdown(false);
    setShowRequestedProperties(false);
    setShowRequestOfProperties(false);
  };

  return (
    <div className="mt-6">
      <div className="flex flex-col md:flex-row md:justify-start md:space-x-4 mb-4 text-gray-600">
        <button
          className={`px-4 py-2 w-full md:w-auto ${
            activeTab === "requests" ? "bg-[#FFCE58]" : "bg-gray-200"
          } hover:bg-[#FFCE58] rounded mb-2 md:mb-0`}
          onClick={() => handleTabClick("requests")}
        >
          Requests
        </button>
        <button
          className={`px-4 py-2 w-full md:w-auto ${
            activeTab === "ads" ? "bg-[#FFCE58]" : "bg-gray-200"
          } hover:bg-[#FFCE58] rounded mb-2 md:mb-0`}
          onClick={() => handleTabClick("ads")}
        >
          Ads
        </button>
        <button
          className={`px-4 py-2 w-full md:w-auto ${
            activeTab === "propertyManagement" ? "bg-[#FFCE58]" : "bg-gray-200"
          } hover:bg-[#FFCE58] rounded mb-2 md:mb-0`}
          onClick={() => handleTabClick("propertyManagement")}
        >
          Property Management
        </button>
        <button
          className={`px-4 py-2 w-full md:w-auto ${
            activeTab === "societiesUpdate" ? "bg-[#FFCE58]" : "bg-gray-200"
          } hover:bg-[#FFCE58] rounded mb-2 md:mb-0`}
          onClick={() => handleTabClick("societiesUpdate")}
        >
          Societies Update
        </button>
        <button
          className={`px-4 py-2 w-full md:w-auto ${
            activeTab === "biddingControl" ? "bg-[#FFCE58]" : "bg-gray-200"
          } hover:bg-[#FFCE58] rounded mb-2 md:mb-0`}
          onClick={() => handleTabClick("biddingControl")}
        >
          Bidding Control
        </button>
        <button
          className={`px-4 py-2 w-full md:w-auto ${
            activeTab === "sellForMe" ? "bg-[#FFCE58]" : "bg-gray-200"
          } hover:bg-[#FFCE58] rounded mb-2 md:mb-0`}
          onClick={() => handleTabClick("sellForMe")}
        >
          Sell for Me
        </button>
      </div>
      {activeTab === "requests" && (
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 mb-4">
          <button
            className={`px-4 py-2 w-full md:w-1/2 ${
              showRequestOfProperties ? "bg-[#FFCE58]" : "bg-gray-200"
            } hover:bg-[#FFCE58] rounded md:mr-2`}
            onClick={requestOfProperties}
          >
            Request of Properties
          </button>
          <button
            className={`px-4 py-2 w-full md:w-1/2 ${
              showRequestedProperties ? "bg-[#FFCE58]" : "bg-gray-200"
            } hover:bg-[#FFCE58] rounded`}
            onClick={showRequestedPropertiesTable}
          >
            Requested Properties
          </button>
        </div>
      )}
      {showRequestedProperties && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-2 px-4">ID</th>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">Email</th>
                <th className="text-left py-2 px-4">Phone Number</th>
                <th className="text-left py-2 px-4">City</th>
                <th className="text-left py-2 px-4">Location</th>
                <th className="text-left py-2 px-4">Price</th>
                <th className="text-left py-2 px-4">Area</th>
                <th className="text-left py-2 px-4">Property Type</th>
                <th className="text-left py-2 px-4">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="text-left py-2 px-4">{property.id}</td>
                  <td className="text-left py-2 px-4">{property.name}</td>
                  <td className="text-left py-2 px-4">{property.email}</td>
                  <td className="text-left py-2 px-4">
                    {property.phoneNumber}
                  </td>
                  <td className="text-left py-2 px-4">{property.city}</td>
                  <td className="text-left py-2 px-4">{property.location}</td>
                  <td className="text-left py-2 px-4">{property.price}</td>
                  <td className="text-left py-2 px-4">{property.area}</td>
                  <td className="text-left py-2 px-4">
                    {property.propertyType}
                  </td>
                  <td className="text-left py-2 px-4">{property.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showRequestOfProperties && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-2 px-4">Name</th>
                <th className="text-left py-2 px-4">ID</th>
                <th className="text-left py-2 px-4">City</th>
                <th className="text-left py-2 px-4">Location</th>
                <th className="text-left py-2 px-4">Price</th>
                <th className="text-left py-2 px-4">Area</th>
                <th className="text-left py-2 px-4">Property Type</th>
                <th className="text-left py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {properties.map((property) => (
                <tr key={property.id}>
                  <td className="text-left py-2 px-4">{property.name}</td>
                  <td className="text-left py-2 px-4">{property.id}</td>
                  <td className="text-left py-2 px-4">{property.city}</td>
                  <td className="text-left py-2 px-4">{property.location}</td>
                  <td className="text-left py-2 px-4">{property.price}</td>
                  <td className="text-left py-2 px-4">{property.area}</td>
                  <td className="text-left py-2 px-4">
                    {property.propertyType}
                  </td>
                  <td className="text-left py-2 px-4">
                    <button className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded">
                      Action
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "ads" && (
        <div>
          <AdsComponent />
        </div>
      )}
      {activeTab === "propertyManagement" && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2">Property Management Section</h2>
          <p className="text-gray-600">
            Add your property management content here.
          </p>
        </div>
      )}
      {activeTab === "societiesUpdate" && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2">Societies Update Section</h2>
          <p className="text-gray-600">
            Add your societies update content here.
          </p>
        </div>
      )}
      {activeTab === "biddingControl" && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2">Bidding Control Section</h2>
          <p className="text-gray-600">
            Add your bidding control content here.
          </p>
        </div>
      )}
      {activeTab === "sellForMe" && (
        <div className="mt-4">
          <h2 className="text-2xl mb-2">Sell for Me Section</h2>
          <p className="text-gray-600">Add your sell for me content here.</p>
        </div>
      )}
      <FloatingButton />
    </div>
  );
};

export default Franchise;
