import React from "react";
import logo from "../assets/logo.jpeg";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Chatbot from "../components/Chatbot";

function Footer() {
  const [face, setFace] = useState(false);

  return (
    <div className="w-full">
      <div className="relative mt-16 mx-auto justify-center items-center min-h-[62vh] sm:h-[72vh] md:h-[82vh] flex px-4 sm:px-6 lg:px-0">
        <div className="grid grid-rows-[auto_auto] w-full lg:w-4/5 px-4 sm:px-8 lg:px-20 mx-auto bg-divider/10 shadow-inner shadow-gray-400 rounded-t-xl pt-4 sm:pt-4">
          {/* Logo and links */}
          <div className="flex flex-col lg:flex-row py-4 sm:py-4 lg:py-6 justify-between items-start lg:items-center gap-8 lg:gap-4">
            {/* Left: Logo and description */}
            <div className="w-full lg:w-1/3 space-y-2 text-left lg:text-left">
              <div
                title="Nigeria Tax Reform Portal"
                className="bg-contain h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 bg-center bg-no-repeat justify-center items-center mx-auto lg:mx-0"
                style={{ backgroundImage: `url(${logo})` }}
              ></div>
              <h4 className="w-full lg:w-3/4 font-normal text-sm sm:text-base mx-auto lg:mx-0">
                Simplifying tax compliance for Nigerians through technology and
                education.
              </h4>

              {/* socials */}
              <div className="flex pt-4 w-full lg:w-2/4 justify-center lg:justify-start space-x-4 items-center">
                <FaLinkedin className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-150 active:scale-125 transition-all duration-300 ease-in-out shadow-lg" />
                <FaSquareXTwitter className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-150 active:scale-125 transition-all duration-300 ease-in-out shadow-lg" />
                <FaFacebookSquare className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-150 active:scale-125 transition-all duration-300 ease-in-out shadow-lg" />
                <FaSquareInstagram className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-150 active:scale-125 transition-all duration-300 ease-in-out shadow-lg" />
              </div>

              {/* Chatbot trigger moved to left section */}
              <div className="pt-4 ">
                <button
                  onClick={() => setFace(!face)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors duration-300 font-medium text-sm sm:text-base"
                >
                  {face ? "Close Assistant" : "Ask Tax Assistant"}
                </button>
                {/* Chatbot renders within this div on mobile, absolute positioned on desktop */}
                {face && (
                  <div className="relative mt-4">
                    <Chatbot onClose={() => setFace(false)} />
                  </div>
                )}
              </div>
            </div>

            {/* Right: Navigation links */}
            <div className="w-full lg:w-2/3 pr-0 lg:pr-12 flex flex-col sm:flex-row justify-between lg:justify-end gap-6 sm:gap-4 lg:gap-8">
              {/* 1st Column */}
              <div className="p-2 sm:p-4">
                <h5 className="text-base sm:text-lg font-semibold">
                  Resources
                </h5>
                <ul className="pt-2 sm:pt-4 space-y-1 sm:space-y-2">
                  <li className="opacity-70 text-xs sm:text-sm hover:underline transition-all duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    <Link to="/tax-guide">Tax Guide</Link>
                  </li>
                  <li className="opacity-70 text-xs sm:text-sm hover:underline transition-all duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    <Link to="/tax-calculator">Tax Calculator</Link>
                  </li>
                  <li className="opacity-70 text-xs sm:text-sm hover:underline transition-all duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    FAQs
                  </li>
                </ul>
              </div>

              {/* 2nd Column */}
              <div className="p-2 sm:p-4">
                <h5 className="text-base sm:text-lg font-semibold">Legal</h5>
                <ul className="pt-2 sm:pt-4 space-y-1 sm:space-y-2">
                  <li className="opacity-70 text-xs sm:text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Privacy Policy
                  </li>
                  <li className="opacity-70 text-xs sm:text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Terms of Service
                  </li>
                  <li className="opacity-70 text-xs sm:text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Compliance
                  </li>
                  <li className="opacity-70 text-xs sm:text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Disclaimer
                  </li>
                </ul>
              </div>

              {/* 3rd Column */}
              <div className="p-2 sm:p-4">
                <h5 className="text-base sm:text-lg font-semibold">
                  Help Center
                </h5>
                <ul className="pt-2 sm:pt-4 space-y-1 sm:space-y-2">
                  <li className="opacity-70 text-xs sm:text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Contact Us
                  </li>
                  <li className="opacity-70 text-xs sm:text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Report Issue
                  </li>
                  <li className="opacity-70 text-xs sm:text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Live Support
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright section */}
          <div className="w-full mx-auto border-t-2 border-gray-400 pt-6 sm:pt-8">
            <div className="flex flex-col justify-center items-center text-center px-2">
              <div className="text-xs sm:text-sm md:text-base">
                ©CheckTax. An official platform for Nigeria's 2026 Tax Reform
                Act. All rights reserved. <br className="hidden sm:block" />
                This is a demonstration interface. For official information,
                please visit&nbsp;
                <a
                  className="text-primary hover:text-blue-600 hover:border-blue-600 transition-all duration-300 ease-in-out mt-2 mb-10 inline-block sm:inline"
                  href="https://www.nrs.gov.ng/"
                  target="_blank"
                  rel="noreferrer"
                >
                  the National Revenue Service (NRS) website.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
