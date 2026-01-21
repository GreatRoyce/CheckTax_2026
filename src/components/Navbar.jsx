import React, { useState } from "react";
import CompBtn from "./CompBtn";
import logo from "../assets/logo.jpeg";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="relative">
      <nav className="border flex px-4 sm:px-6 md:px-10 mb-10 justify-between items-center w-screen h-14 fixed z-50 shadow-md backdrop-blur-2xl bg-white/90">
        {/* Logo links to home */}
        <div
          id="#hero"
          title="Nigeria Tax Reform Portal"
          className="cursor-pointer"
        >
          <HashLink smooth to="/home#" onClick={closeMenu}>
            <img
              src={logo}
              alt="checktax logo"
              className="h-10 w-20 sm:h-12 sm:w-24"
            />
          </HashLink>
        </div>

        {/* Desktop Navigation Links - Hidden on mobile */}
        <ul className="hidden md:flex gap-6 lg:gap-10 justify-between items-center text-md font-bold text-btnprimary">
          <li>
            <Link
              to="/home#"
              className="cursor-pointer hover:underline active:scale-105 transition-transform duration-300 ease-in-out"
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/tax-guide#"
              className="cursor-pointer hover:underline active:scale-105 transition-transform duration-300 ease-in-out"
              onClick={closeMenu}
            >
              Tax Guide
            </Link>
          </li>
          <li>
            <Link
              to="/tax-calculator#"
              className="cursor-pointer hover:underline active:scale-105 transition-transform duration-300 ease-in-out"
              onClick={closeMenu}
            >
              Tax Calculator
            </Link>
          </li>
          <li>
            <Link
              to="/faqs#"
              className="cursor-pointer hover:underline active:scale-105 transition-transform duration-300 ease-in-out"
              onClick={closeMenu}
            >
              FAQs
            </Link>
          </li>
        </ul>

        {/* Desktop Buttons - Hidden on mobile */}
        {/* <div className="hidden md:flex gap-5 justify-between items-center">
          <CompBtn variant="secondary">My Account</CompBtn>
          <CompBtn variant="primary">File Return</CompBtn>
        </div> */}

        {/* Hamburger Menu Button - Visible only on mobile */}
        <button
          className="md:hidden text-btnprimary focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed top-14 left-0 right-0 bg-white shadow-lg transition-all duration-300 ease-in-out md:hidden ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="flex flex-col py-4 px-6 border-t">
            {/* Mobile Navigation Links */}
            <ul className="flex flex-col gap-4 text-lg font-semibold text-btnprimary">
              <li>
                <Link
                  to="/home"
                  className="block py-2 px-4 hover:bg-primary/10 rounded-md transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/tax-guide"
                  className="block py-2 px-4 hover:bg-primary/10 rounded-md transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Tax Reform Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/tax-calculator"
                  className="block py-2 px-4 hover:bg-primary/10 rounded-md transition-colors duration-200"
                  onClick={closeMenu}
                >
                  Tax Calculator
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="block py-2 px-4 hover:bg-primary/10 rounded-md transition-colors duration-200"
                  onClick={closeMenu}
                >
                  FAQs
                </Link>
              </li>
          
            </ul>

            {/* Mobile Buttons */}
            {/* <div className="flex flex-col gap-3 mt-6">
              <CompBtn variant="secondary" fullWidth onClick={closeMenu}>
                My Account
              </CompBtn>
              <CompBtn variant="primary" fullWidth onClick={closeMenu}>
                File Return
              </CompBtn>
            </div> */}
          </div>
        </div>

        {/* Backdrop for mobile menu */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
      </nav>
    </div>
  );
}

export default Navbar;
