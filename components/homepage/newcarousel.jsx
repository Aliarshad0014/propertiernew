import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../app/globals.css';
import { Input } from "@material-tailwind/react";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CustomDot = ({ onClick, active }) => {
  return (
    <li
      className={`custom-dot ${active ? 'active' : ''}`}
      onClick={onClick}
    />
  );
};

const CustomCarousel = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-black">Corporate Services</h1>
      <div className="carousel-container max-w-6xl w-full">
        <Carousel
          responsive={responsive}
          showDots
          customDot={<CustomDot onClick={() => {}} active={false} />} // Handle state and props accordingly
          infinite
          autoPlay
          autoPlaySpeed={4000}
          renderButtonGroupOutside
        >
          <div className="relative carousel-item min-h-screen text-white rounded-lg">
            <img className="w-full h-full" src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className="absolute rounded-md top-32 right-10 bg-red-500 text-center text-white px-4 py-2 m-2 w-1/6 z-10 font-semibold">
              10% off
            </div>
            <div className="absolute inset-0 w-full flex flex-col justify-center items-center min-h-screen">
              <h2 className="text-2xl font-bold mb-4 text-white z-10">Property Title 1</h2>
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <form className="relative bg-white w-1/2 bg-opacity-50 p-6 rounded-lg shadow-md space-y-4 z-10">
                <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded" />
                <textarea placeholder="Detail" className="w-full p-2 border rounded h-24 resize-none"></textarea>
                <div className="flex justify-center">
                  <button type="submit" className="w-1/2 p-2 bg-black hover:bg-yellow-500 transition-all text-white rounded">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className="relative carousel-item h-full text-white">
            <img className="w-full h-full" src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className="absolute top-32 right-10 w-1/6 text-center bg-red-500 text-white px-4 py-2 m-2 rounded-lg z-10 font-semibold">
              20% off
            </div>
            <div className="absolute inset-0 w-full flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4 text-white z-10">Property Title 2</h2>
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <form className="relative bg-white w-1/2 bg-opacity-50 p-6 rounded-lg shadow-md space-y-4 z-10">
                <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded" />
                <textarea placeholder="Detail" className="w-full p-2 border rounded h-24 resize-none"></textarea>
                <div className="flex justify-center">
                  <button type="submit" className="w-1/2 p-2 bg-black hover:bg-yellow-500 transition-all  text-white rounded">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className="relative carousel-item h-full text-white">
            <img className="w-full h-full" src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className="absolute top-32 right-10 bg-red-500 text-center text-white px-4 py-2 m-2 w-1/6 rounded-md z-10 font-semibold">
              10% off
            </div>
            <div className="absolute inset-0 w-full flex flex-col justify-center items-center">
              <h2 className="text-2xl font-bold mb-4 text-white z-10">Property Title 3</h2>
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <form className="relative bg-white w-1/2 bg-opacity-50 p-6 rounded-lg shadow-md space-y-4 z-10">
                <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded" />
                <textarea placeholder="Detail" className="w-full p-2 border rounded h-24 resize-none"></textarea>
                <div className="flex justify-center">
                  <button type="submit" className="w-1/2 p-2 bg-black hover:bg-yellow-500 transition-all  text-white rounded">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </Carousel>
        <ul className="custom-dots"></ul>
      </div>
    </div>
  );
};

export default CustomCarousel;
