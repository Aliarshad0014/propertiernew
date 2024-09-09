"use client";
import Image from "next/image";
import React, { useState, useEffect, useContext } from "react";
import { RiCloseLine, RiMenu3Line, RiAccountCircleFill } from "react-icons/ri";
import Link from "next/link";
import logo from "@/image/logo.png";
import LoginModal from "./login/LoginModal";
import { ChatContext } from "@/Contexts/ChatContext";
import SignupModal from "./login/SignupModal";
import { usePathname } from "next/navigation";

const Header = () => {
  const { isUser, setIsUser } = useContext(ChatContext);
  // console.log(isUser);
  const [navBar, setNavBar] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState("");
  const [open, setOpen] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const Pathname = usePathname();

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const onNavClick = () => {
    setNavBar((prevState) => !prevState);
    setAnimate(!animate);
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setNavBar(false);
    localStorage.setItem("activeLink", link);
  };

  useEffect(() => {
    const storedLink = localStorage.getItem("activeLink");
    if (storedLink) {
      setActiveLink(storedLink);
    }
  }, []);

  return (
    <nav
      style={{
        transform: showHeader ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
      className="fixed top-0 left-0 h-10 right-0 flex items-center justify-between text-black px-4 py-5 shadow-teal-500 z-50 bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <Link href="/" onClick={() => handleLinkClick("/")}>
          <Image
            width={100}
            height={100}
            src={logo}
            alt="Logo"
            className="h-6 w-full cursor-pointer"
          />
        </Link>
      </div>
      <div className="hidden lg:flex justify-center space-x-6 font-light text-md">
        {[
          { href: "/", text: "HOME" },
          { href: "/properties", text: "PROPERTIES" },
          { href: "/services-list", text: "SERVICES" },
          { href: "/corporateservices", text: "CORPORATE" },
          { href: "/material", text: "MATERIAL" },
        ].map(({ href, text }) => (
          <Link
            key={href}
            href={href}
            className={`hover:text-yellow-500 ${
              Pathname === href || (href !== "/" && Pathname.startsWith(href))
                ? "text-yellow-500 font-bold"
                : "text-white font-regular"
            } h-9 rounded-md ease-in-out duration-500 transition-all flex items-center`}
            onClick={() => handleLinkClick(href)}>
            {text}
          </Link>
        ))}

        <div
          className="relative text-left flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <button
            type="button"
            className="justify-center w-full rounded-md h-9 ease-in-out duration-500 font-regular text-white hover:text-white flex items-center">
            OTHERS
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <div
              className="origin-top-right top-8 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-black ring-1 ring-black ring-opacity-5 "
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}>
              <div className="py-1" role="none">
                {[
                  { href: "/shorts", text: "Short Videos" },
                  { href: "/corporateservices", text: "Corporate Services" },
                  // { href: "/option3", text: "Profile" },
                ].map(({ href, text }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`text-white block px-4 py-2 text-sm hover:text-yellow-500`}
                    role="menuitem"
                    tabIndex={-1}>
                    {text}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {isUser && (
          <Link href="/add-properties" className="text-white flex items-center">
            <button className="bg-[#FFCE58] text-black font-medium p-1 text-xs w-32 rounded-md hover:bg-yellow-600">
              Add Properties
            </button>
          </Link>
        )}
        <div className="relative">
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white flex items-center cursor-pointer">
            <RiAccountCircleFill size={30} />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-black rounded-md shadow-lg z-50">
              <div className="py-1">
                {isUser ? (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      onClick={() => setDropdownOpen(!dropdownOpen)}>
                      Profile
                    </Link>
                    <Link
                      href="/"
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700"
                      onClick={() => {
                        setIsUser(false);
                        // window.location.reload();
                        handleLinkClick("/");
                        localStorage.removeItem("user");
                        setDropdownOpen(!dropdownOpen);
                      }}>
                      Logout
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                      onClick={() => {
                        setOpen(true);
                        setDropdownOpen(false);
                      }}>
                      Login
                    </button>
                    <button
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                      onClick={() => {
                        setOpenSignup(true);
                        setDropdownOpen(false);
                      }}>
                      Signup
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        {open && (
          <LoginModal open={open} setOpen={setOpen} setIsUser={setIsUser} />
        )}
        {openSignup && (
          <SignupModal
            open={openSignup}
            setOpen={setOpenSignup}
            setIsUser={setIsUser}
          />
        )}
        <div
          onClick={onNavClick}
          className="lg:hidden flex mt-1 top-0 z-50 text-gray-500 cursor-pointer">
          {navBar ? <RiCloseLine size={30} /> : <RiMenu3Line size={30} />}
        </div>
      </div>
      {navBar && (
        <ul
          className={`h-[100vh] text-black phone-view lg:hidden flex flex-col justify-center items-center absolute top-0 left-0 w-full bg-white bg-opacity-70 backdrop-blur-lg ${
            animate ? "slideIn" : ""
          }`}>
          {[
            { href: "/home", text: "HOME" },
            { href: "/properties", text: "PROPERTIES" },
            { href: "/services", text: "SERVICES" },
            { href: "/corporate", text: "CORPORATE" },
            { href: "/material", text: "MATERIAL" },
          ].map(({ href, text }) => (
            <Link
              key={href}
              className={`px-4 py-6 ${
                activeLink === href ? "text-yellow-500 font-bold" : ""
              } hover:text-yellow-500`}
              href={href}
              onClick={() => handleLinkClick(href)}>
              {text}
            </Link>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Header;
