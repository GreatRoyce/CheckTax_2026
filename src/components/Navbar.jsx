import React from "react";
import CompBtn from "./CompBtn";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="relative">
      <nav className="border flex px-10 mb-10 justify-between items-center w-screen h-14 fixed z-50 shadow-md backdrop-blur-2xl">
        {/* Logo links to home */}

        <div
          id="#home"
          title="Nigeria Tax Reform Portal"
          className="cursor-pointer"
        >
          <Link to="/">
            <img src={logo} alt="checktax logo" className="h-12 w-24" />
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex gap-10 justify-between items-center text-md font-bold text-btnprimary">
          <li>
            <Link
              to="/home"
              className="cursor-pointer hover:underline active:scale-105 transition-transform duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tax-guide"
              className="cursor-pointer hover:underline active:scale-105 transition-transform duration-300 ease-in-out"
            >
              Tax Reform Guide
            </Link>
          </li>
          <li>
            <Link
              to="/tax-calculator"
              className="cursor-pointer hover:underline active:scale-105 transition-transform duration-300 ease-in-out"
            >
              Tax Calculator
            </Link>
          </li>
        </ul>

        {/* Buttons */}
        {/* <div className=" flex gap-5 justify-between items-center">
          <CompBtn variant="secondary">My Account</CompBtn>
          <CompBtn variant="primary">File Return</CompBtn>
        </div> */}
      </nav>
    </div>
  );
}

export default Navbar;
