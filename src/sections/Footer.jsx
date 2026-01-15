import React from "react";
import logo from "../assets/logo.jpeg";
import { useState } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

function Footer() {
  const [face, setFace] = useState(false);

  return (
    <div>
      <div className="mt-28 h-[80vh] w-screen flex mb-10">
        <div className="grid grid-rows-[3fr_1fr_1fr] w-4/5 px-20 mx-auto border bg-divider/10 shadow-inner shadow-gray-400 rounded-t-lg pt-4 ">
          {/* Log and titles */}

          <div className="flex justify-between items-center">
            {/* left: Logo */}
            <div className=" w-1/3">
              <div
                title="Nigeria Tax Reform Portal"
                className=" bg-contain h-32 w-32 bg-center bg-no-repeat justify-center items-center "
                style={{ backgroundImage: `url(${logo})` }}
              ></div>
              <h4 className="w-3/4 font-normal ">
                Simplifying tax compiance for Nigerians through technology and
                education.
              </h4>

              {/* socials */}
              <div className="flex pt-4 w-2/4 justify-cente text-left space-x-4 items-center  ">
                <FaLinkedin className="h-6 w-6 cursor-pointer hover:scale-110 active:scale-125 transition-all duration-300 ease-in-out" />
                <FaSquareXTwitter className="h-6 w-6 cursor-pointer hover:scale-110 active:scale-125 transition-all duration-300 ease-in-out" />
                <FaFacebookSquare className="h-6 w-6 cursor-pointer hover:scale-110 active:scale-125 transition-all duration-300 ease-in-out" />
                <FaSquareInstagram className="h-6 w-6 cursor-pointer hover:scale-110 active:scale-125 transition-all duration-300 ease-in-out" />
              </div>
            </div>
            {/* right: Titles */}

            <div className=" pr-12 space-x-8 flex ">
              {/* 1st Column */}
              <div className="p-4 ">
                <h5>Resources</h5>
                <ul className=" pt-4 space-y-2">
                  <li className="opacity-70 text-sm hover:underline transition-all duration-300 ease-in-out active:opacity-100 cursor-pointer ">
                    Policy Explorer
                  </li>
                  <li className="opacity-70 text-sm hover:underline transition-all duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Tax Calculator
                  </li>
                  <li className="opacity-70 text-sm hover:underline transition-all duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    FAQs
                  </li>
                </ul>
              </div>
              {/* 2nd Column */}
              <div className=" p-4 ">
                <h5>Legal</h5>
                <ul className=" pt-4 space-y-2">
                  <li className="opacity-70 text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer ">
                    Privacy Policy
                  </li>
                  <li className="opacity-70 text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Terms of Service
                  </li>
                  <li className="opacity-70 text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Compliance
                  </li>
                  <li className="opacity-70 text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Disclaimer
                  </li>
                </ul>
              </div>
              {/* 3rd Column */}
              <div className=" p-4 ">
                <h5>Help Center</h5>
                <ul className=" pt-4 space-y-2">
                  <li className="opacity-70 text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer ">
                    Contact Us
                  </li>
                  <li className="opacity-70 text-sm transition-all hover:underline duration-300 ease-in-out active:opacity-100 cursor-pointer">
                    Report Issue
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ai 
            Chatbot */}
          <div className=" ml-[80%] justify-center items-center ">
            <button
              onClick={() => setFace(!face)}
              className={
                face
                  ? "faced h-28 w-28 text-center justify-center items-center"
                  : "face h-28 w-28 text-center justify-center items-center"
              }
            >
              {/* Chat bot */}
            </button>
          </div>
          <div className="w-full h-10 mx-auto border-t-2 border-gray-400 pt-8 ">
            <div className="flex flex-col justify-center items-center text-center">
              <div className="text-center ">
                ©CheckTax. An official platform for Nigeria's 2026 Tax Reform
                Act. All rights reserved. <br />
                This is a demonstration interface. For official information,
                please visit&nbsp;
                <a
                  className="text-primary hover:text-blue-600 hover:border-blue-600 transition-all duration-300 ease-in-out mt-2 mb-10"
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
