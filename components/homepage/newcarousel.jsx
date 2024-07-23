import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import '../../app/globals.css';

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
      className={`inline-block w-5 h-5 mx-2 rounded-full border-2 border-gold cursor-pointer ${active ? 'bg-white' : 'bg-transparent hover:bg-yellow-500'}`}
      onClick={onClick}
    />
  );
};

const CustomCarousel = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-8">
      <h1 className="text-4xl font-bold mb-6 text-black">Corporate Services</h1>
      <div className="relative w-full max-w-6xl">
        <Carousel
          responsive={responsive}
          showDots
          customDot={<CustomDot onClick={() => {}} active={false} />}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          renderButtonGroupOutside
        >
          <div className="relative min-h-screen text-white rounded-lg">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className="absolute top-32 right-10 bg-red-500 text-center text-white px-4 py-2 m-2 rounded-lg z-10 font-semibold">
              10% off
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 min-h-screen">
              <h2 className="text-2xl font-bold mb-4 text-white z-10">Property Title 1</h2>
              <form className="relative bg-white w-4/5 md:w-1/2 bg-opacity-50 p-6 rounded-lg shadow-md space-y-4 z-10">
                <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded" />
                <textarea placeholder="Detail" className="w-full p-2 border rounded h-24 resize-none"></textarea>
                <div className="flex justify-center">
                  <button type="submit" className="w-1/2 p-2 bg-black hover:bg-yellow-500 transition-all text-white rounded">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className="relative min-h-screen text-white rounded-lg">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className="absolute top-32 right-10 bg-red-500 text-center text-white px-4 py-2 m-2 rounded-lg z-10 font-semibold">
              20% off
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 min-h-screen">
              <h2 className="text-2xl font-bold mb-4 text-white z-10">Property Title 2</h2>
              <form className="relative bg-white w-4/5 md:w-1/2 bg-opacity-50 p-6 rounded-lg shadow-md space-y-4 z-10">
                <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded" />
                <textarea placeholder="Detail" className="w-full p-2 border rounded h-24 resize-none"></textarea>
                <div className="flex justify-center">
                  <button type="submit" className="w-1/2 p-2 bg-black hover:bg-yellow-500 transition-all text-white rounded">Submit</button>
                </div>
              </form>
            </div>
          </div>
          <div className="relative min-h-screen text-white rounded-lg">
            <img className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            <div className="absolute top-32 right-10 bg-red-500 text-center text-white px-4 py-2 m-2 rounded-lg z-10 font-semibold">
              10% off
            </div>
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-30 min-h-screen">
              <h2 className="text-2xl font-bold mb-4 text-white z-10">Property Title 3</h2>
              <form className="relative bg-white w-4/5 md:w-1/2 bg-opacity-50 p-6 rounded-lg shadow-md space-y-4 z-10">
                <input type="text" placeholder="Full Name" className="w-full p-2 border rounded" />
                <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded" />
                <textarea placeholder="Detail" className="w-full p-2 border rounded h-24 resize-none"></textarea>
                <div className="flex justify-center">
                  <button type="submit" className="w-1/2 p-2 bg-black hover:bg-yellow-500 transition-all text-white rounded">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </Carousel>
        <div className="mt-8 text-center">
          <a href="/" className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-black transition-all">
            All Corporate Services
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
