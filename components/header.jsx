"use client";
import Image from "next/image";

import React, { useState, useEffect } from "react";
import { RiCloseLine, RiMenu3Line, RiAccountCircleFill } from "react-icons/ri";
import logo from "../components/logo.png";

const Header = () => {
  const [navBar, setNavBar] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle navbar visibility and animate state
  const onNavClick = () => {
    setNavBar((prevState) => !prevState);
    setAnimate(!animate);
  };

  // Handle scroll event to show/hide header
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setShowHeader(false); // Scrolling down, hide header
    } else {
      setShowHeader(true); // Scrolling up, show header
    }
    setLastScrollY(currentScrollY);
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]); // Update effect when lastScrollY changes

  return (
    <nav
      style={{
        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
      className="absolute top-0 left-0 h-10 right-0 flex items-center justify-between text-black px-4 py-5 shadow-teal-500 z-50 bg-black bg-opacity-70 backdrop-blur-sm"
    >
      <div className="flex items-center space-x-4">
        {/* Logo */}
        <a href="/">
          <Image width={100} height={100} src="https://propertier.com.pk/assets/img/footer-logo-n.png" alt="Logo" className="h-6 w-full cursor-pointer" />
        </a>
      </div>
      <div className="hidden lg:flex justify-center space-x-6  font-light text-md">
        {/* Centered navigation buttons */}
        <a href="#home" className="hover:text-white text-yellow-500 font-semibold h-9 rounded-md ease-in-out duration-500 transition-all flex items-center">
          HOME
        </a>
        <a href="/properties" className="hover:text-yellow-500 text-white font-regular h-9 rounded-md ease-in-out duration-500 transition-all flex items-center">
          PROPERTIES
        </a>
        <a href="#services" className="hover:text-yellow-500 text-white h-9 font-regular rounded-md ease-in-out duration-500 transition-all flex items-center">
          SERVICES
        </a>
        <a href="#corporate" className="hover:text-yellow-500 text-white h-9 font-regular rounded-md ease-in-out duration-500 transition-all flex items-center">
          CORPORATE
        </a>
        <a href="#material" className="hover:text-yellow-500 text-white h-9 font-regular rounded-md ease-in-out duration-500 transition-all flex items-center">
          MATERIAL
        </a>
        <div className="relative inline-block text-left flex items-center">
          <div className="group">
            <button type="button" className="inline-flex justify-center w-full rounded-md h-9 ease-in-out duration-500 font-regular text-white hover:text-white flex items-center">
              OTHERS
              <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="hidden group-hover:block origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 opacity-70 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
              <div className="py-1" role="none">
                <a href="#option1" className="text-white block px-4 py-2 text-sm hover:text-yellow-500" role="menuitem" tabIndex={-1} id="menu-item-0">Short Videos</a>
                <a href="#option2" className="text-white block px-4 py-2 text-sm hover:text-yellow-500" role="menuitem" tabIndex={-1} id="menu-item-1">Corporate Services</a>
                <a href="#option3" className="text-white block px-4 py-2 text-sm hover:text-yellow-500" role="menuitem" tabIndex={-1} id="menu-item-2">Profile</a>
                {/* <a href="#option4" className="text-black block px-4 py-2 text-sm hover:text-yellow-500" role="menuitem" tabIndex={-1} id="menu-item-3">Option 4</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#add-properties" className="text-white flex items-center">
          <button className="bg-yellow-500 text-black font-medium p-1 text-xs w-32 rounded-md hover:bg-yellow-600">
            Add Properties
          </button>
        </a>
        <a href="#login" className="text-white flex items-center">
          <RiAccountCircleFill size={30} />
        </a>
        <div
          onClick={onNavClick}
          className="lg:hidden flex mt-1 top-0 z-50 text-gray-500 cursor-pointer"
        >
          {navBar ? <RiCloseLine size={30} /> : <RiMenu3Line size={30} />}
        </div>
      </div>
      {navBar && (
        <ul
          className={`h-[100vh] text-black phone-view lg:hidden flex flex-col justify-center items-center absolute top-0 left-0 w-full bg-white bg-opacity-70 backdrop-blur-lg ${
            animate ? "slideIn" : ""
          }`}
        >
          <a
            className={`px-4 capitalize py-6 text-2xl ${
              animate ? "slideIn" : ""
            }`}
            href="#home"
            onClick={onNavClick}
          >
            HOME
          </a>
          <a
            className={`px-4 capitalize py-6 text-2xl ${
              animate ? "slideIn" : ""
            }`}
            href="#properties"
            onClick={onNavClick}
          >
            PROPERTIES
          </a>
          <a
            className={`px-4 capitalize py-6 text-2xl ${
              animate ? "slideIn" : ""
            }`}
            href="#services"
            onClick={onNavClick}
          >
            SERVICES
          </a>
          <a
            className={`px-4 capitalize py-6 text-2xl ${
              animate ? "slideIn" : ""
            }`}
            href="#corporate"
            onClick={onNavClick}
          >
            CORPORATE
          </a>
          <a
            className={`px-4 capitalize py-6 text-2xl ${
              animate ? "slideIn" : ""
            }`}
            href="#material"
            onClick={onNavClick}
          >
            MATERIAL
          </a>
        </ul>
      )}
    </nav>
  );
};

export default Header;
