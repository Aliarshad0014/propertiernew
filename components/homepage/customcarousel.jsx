import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../app/globals.css';

const CustomCarousel = ({ data }) => {
  const { cementRates, steelRates, brickRates, trGardarRates } = data;
  const [selectedFilter, setSelectedFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [slidesToShow, setSlidesToShow] = useState(6); // Default number of slides

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
    setSearchTerm(""); // Reset search term when filter changes
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedFilter(""); // Reset selected filter when search term changes
  };

  const renderRates = () => {
    let ratesToRender = [];

    switch (selectedFilter) {
      case "filter1":
        ratesToRender = cementRates;
        break;
      case "filter2":
        ratesToRender = steelRates;
        break;
      case "filter3":
        ratesToRender = brickRates;
        break;
      default:
        // Show all rates if no filter is selected
        ratesToRender = [
          ...cementRates,
          ...steelRates,
          ...brickRates,
          ...trGardarRates,
        ];
        break;
    }

    // Filter rates by search term
    if (searchTerm.trim() !== "") {
      ratesToRender = ratesToRender.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return ratesToRender.map((item) => (
      <div key={item.id} className="p-2">
        <div className="relative h-28 flex flex-col justify-center items-center bg-white shadow-md rounded-md">
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4 rounded-md">
            <h3 className="font-bold lg:text-md text-sm">{item.name}</h3>
            <p className="font-bold lg:text-md text-sm">{item.price}</p>
          </div>
        </div>
      </div>
    ));
  };

  const settings = {
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    // dots: true,
  };

  const getBackgroundImage = () => {
    switch (selectedFilter) {
      case "filter1":
        return "url('https://images.unsplash.com/photo-1520420253244-9ff6536abf60?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2VtZW50fGVufDB8fDB8fHww')";
      case "filter2":
        return "url('https://images.unsplash.com/photo-1678794792900-5abfe053682e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
      case "filter3":
        return "url('https://images.unsplash.com/photo-1460602692976-8eab38c11f9d?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
      default:
        return "url('https://media.istockphoto.com/id/184321625/photo/3d-architecture-abstract.jpg?s=2048x2048&w=is&k=20&c=4r_LhPqtCgYB2xxaELmcG19KB-Qf5Bt01E74s9XJFf8=')";
    }
  };

  useEffect(() => {
    // Update slidesToShow based on window width
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(6);
      }
    };

    // Call initially and on resize
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => {
      window.removeEventListener("resize", updateSlidesToShow);
    };
  }, []);

  return (
    <div
      className="mainContainer w-screen p-8 relative bg-cover bg-center"
      style={{ backgroundImage: getBackgroundImage() }}
    >
      <div className="overlay absolute inset-0 bg-gray-500 opacity-50"></div>
      <div className="flex justify-between items-center mb-4 relative z-40">
        <div className="flex-1">
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="p-2 w-1/2 border text-sm lg:text-md lg:w-1/4 border-gray-50 bg-white text-gray-600 rounded-lg shadow-sm cursor-pointer focus:outline-none"
          >
            <option value="">All Rates</option>
            <option value="filter1">Cement Rates</option>
            <option value="filter2">Steel Rates</option>
            <option value="filter3">Brick Rates</option>
          </select>
        </div>
        <div className="flex-1 text-right">  
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="lg:w-1/4 w-full p-2 cursor-pointer rounded-lg shadow-sm mr-4 focus:outline-none focus:ring text-black focus:ring-yellow-500"
          />
        </div>
      </div>
      <h2 className="text-white font-bold text-xl mb-4 relative z-40">
        {selectedFilter === "filter1"
          ? "Cement Rates Today"
          : selectedFilter === "filter2"
          ? "Steel Rates Today"
          : selectedFilter === "filter3"
          ? "Brick Rates Today"
          : "Market Rate Today"}
      </h2>
      <Slider {...settings} className="relative z-40">
        {renderRates()}
      </Slider>
    </div>
  );
};

export default CustomCarousel;
