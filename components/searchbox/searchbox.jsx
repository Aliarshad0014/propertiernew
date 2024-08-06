import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const [propertyType, setPropertyType] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="relative w-full bottom-20 flex flex-col items-center justify-center">
      <div className="mt-4 w-[50%] flex justify-center">
        <div className="bg-white bg-opacity-100 backdrop-blur-sm p-6 rounded-lg shadow flex flex-col justify-center items-center">
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
              <div className="flex flex-col items-start">
                <FormControl className="w-60" variant="outlined" size="small">
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    label="Property Type"
                    sx={{ backgroundColor: "white" }}
                  >
                    <MenuItem value="allProperties">All Properties</MenuItem>
                    <MenuItem value="rental">Rental</MenuItem>
                    <MenuItem value="sale">Sale</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col items-start">
                <FormControl
                  fullWidth
                  className="w-60"
                  variant="outlined"
                  size="small"
                >
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    label="Country"
                    className="w-60"
                    sx={{ backgroundColor: "white" }}
                  >
                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                    <MenuItem value="China">China</MenuItem>
                    <MenuItem value="Europe">Europe</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col items-start">
                <FormControl
                  fullWidth
                  className="w-60"
                  variant="outlined"
                  size="small"
                >
                  <InputLabel>City</InputLabel>
                  <Select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    label="City"
                    className="w-60"
                    sx={{ backgroundColor: "white" }}
                  >
                    <MenuItem value="Islamabad">Islamabad</MenuItem>
                    <MenuItem value="Karachi">Karachi</MenuItem>
                    <MenuItem value="Peshawar">Peshawar</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <button className="lg:flex hidden items-center justify-center h-12 w-12 bg-custom-color text-white shadow rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FaSearch size={20} />
              </button>
            </div>

            {showMore && (
              <div className="flex flex-col sm:flex-row items-center justify-start space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                <div className="flex flex-col items-start">
                  <FormControl
                    fullWidth
                    className="w-60"
                    variant="outlined"
                    size="small"
                  >
                    <InputLabel>Region</InputLabel>
                    <Select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      label="Region"
                      className="w-60"
                      sx={{ backgroundColor: "white" }}
                    >
                      <MenuItem value="North">North</MenuItem>
                      <MenuItem value="South">South</MenuItem>
                      <MenuItem value="East">East</MenuItem>
                      <MenuItem value="West">West</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl
                    fullWidth
                    className="w-60"
                    variant="outlined"
                    size="small"
                  >
                    <InputLabel>Price Range</InputLabel>
                    <Select
                      value={priceRange}
                      className="w-60"
                      onChange={(e) => setPriceRange(e.target.value)}
                      label="Price Range"
                      sx={{ backgroundColor: "white" }}
                    >
                      <MenuItem value="Below $50,000">Below $50,000</MenuItem>
                      <MenuItem value="$50,000 - $100,000">
                        $50,000 - $100,000
                      </MenuItem>
                      <MenuItem value="$100,000 - $200,000">
                        $100,000 - $200,000
                      </MenuItem>
                      <MenuItem value="Above $200,000">Above $200,000</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            )}
            <button
              onClick={handleShowMoreClick}
              className="text-yellow-500 hover:text-yellow-600 font-semibold mt-4 self-start"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
            <button className="lg:hidden flex items-center justify-center h-14 w-14 bg-custom-color text-white shadow rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <FaSearch size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
