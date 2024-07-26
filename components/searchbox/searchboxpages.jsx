import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SearchBox = () => {
  const [propertyType, setPropertyType] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [region, setRegion] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="relative bottom-20 flex flex-col items-center justify-center">
      <div className="mt-4 w-1/2 flex justify-center">
        <div className="bg-gray-900 bg-opacity-100 backdrop-blur-sm p-6 rounded-lg shadow flex flex-col justify-center items-center">
          <div className="flex flex-col items-center space-y-4 w-full">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 w-full">
              <div className="flex flex-col items-start">
                <FormControl className="w-60" variant="outlined" size="small">
                  <InputLabel>Property Type</InputLabel>
                  <Select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    label="Property Type"
                    sx={{ backgroundColor: 'white', height: '40px' }}
                  >
                    <MenuItem value="allProperties">All Properties</MenuItem>
                    <MenuItem value="rental">Rental</MenuItem>
                    <MenuItem value="sale">Sale</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col items-start">
                <FormControl fullWidth className="w-60" variant="outlined" size="small">
                  <InputLabel>Country</InputLabel>
                  <Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    label="Country"
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                    <MenuItem value="China">China</MenuItem>
                    <MenuItem value="Europe">Europe</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col items-start">
                <FormControl fullWidth className="w-60" variant="outlined" size="small">
                  <InputLabel>City</InputLabel>
                  <Select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    label="City"
                    sx={{ backgroundColor: 'white' }}
                  >
                    <MenuItem value="Islamabad">Islamabad</MenuItem>
                    <MenuItem value="Karachi">Karachi</MenuItem>
                    <MenuItem value="Peshawar">Peshawar</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <button
              // onClick={handleSearch}
              className="hidden lg:flex py-2 px-10 bg-yellow-500 text-gray-900 rounded-md "
            >
              Search
            </button>
              {/* <button className="lg:flex hidden items-center justify-center w-24 h-24 bg-custom-color text-white shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-none">
                Search
              </button> */}
            </div>

            {showMore && (
              <div className="flex flex-col sm:flex-row items-center justify-start space-y-4 sm:space-y-0 sm:space-x-4 w-full">
                <div className="flex flex-col items-start">
                  <FormControl fullWidth className="w-60" variant="outlined">
                    <InputLabel>Region</InputLabel>
                    <Select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      label="Region"
                      sx={{ backgroundColor: 'white' }}
                    >
                      <MenuItem value="North">North</MenuItem>
                      <MenuItem value="South">South</MenuItem>
                      <MenuItem value="East">East</MenuItem>
                      <MenuItem value="West">West</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col items-start">
                  <FormControl fullWidth className="w-60" variant="outlined">
                    <InputLabel>Price Range</InputLabel>
                    <Select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      label="Price Range"
                      sx={{ backgroundColor: 'white' }}
                    >
                      <MenuItem value="Below $50,000">Below $50,000</MenuItem>
                      <MenuItem value="$50,000 - $100,000">$50,000 - $100,000</MenuItem>
                      <MenuItem value="$100,000 - $200,000">$100,000 - $200,000</MenuItem>
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
            <button
              // onClick={handleSearch}
              className="lg:hidden flex justify-start items-start py-2 px-10  bg-yellow-500 text-gray-900 rounded-md "
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
