import React, { useState } from "react";
import logo from "../assets/logo.jpeg";
import { FaLinkedin, FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import Chatbot from "../components/Chatbot";

function Footer() {
  const [face, setFace] = useState(false);

  return (
    <footer className="w-full mt-16">
      <div className="relative mx-auto flex justify-center px-4 sm:px-6 lg:px-0">
        <div className="w-full lg:w-4/5 bg-divider/10 shadow-inner shadow-gray-400 rounded-t-xl px-4 sm:px-8 lg:px-20 pt-6 pb-10">
          {/* TOP SECTION */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 lg:gap-6">
            {/* LEFT */}
            <div className="w-full lg:w-1/3 space-y-3 text-left">
              <div
                title="Nigeria Tax Reform Portal"
                className="h-24 w-24 sm:h-28 sm:w-28 lg:h-32 lg:w-32 bg-center bg-no-repeat bg-contain mx-auto lg:mx-0"
                style={{ backgroundImage: `url(${logo})` }}
              />

              <p className="text-sm sm:text-base lg:w-4/5">
                Simplifying tax compliance for Nigerians through technology and
                education.
              </p>

              {/* SOCIALS */}
              <div className="flex pt-3 gap-4 justify-center lg:justify-start">
                <FaLinkedin className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-125 transition" />
                <FaSquareXTwitter className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-125 transition" />
                <FaFacebookSquare className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-125 transition" />
                <FaSquareInstagram className="h-5 w-5 sm:h-6 sm:w-6 cursor-pointer hover:scale-125 transition" />
              </div>

              {/* CHATBOT */}
              <div className="pt-4">
                <button
                  onClick={() => setFace(!face)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition text-sm sm:text-base"
                >
                  {face ? "Close Assistant" : "Ask Tax Assistant"}
                </button>

                {face && (
                  <div className="relative mt-4 max-w-full">
                    <Chatbot onClose={() => setFace(false)} />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full mt-4 gap-10 sm:mt-10 lg:w-2/3 flex flex-col sm:flex-row sm:gap-14 lg:gap-32">
              {/* RESOURCES */}
              <FooterColumn title="Resources">
                <HashLink smooth to="/tax-guide#">Tax Guide</HashLink>
                <HashLink smooth to="/tax-calculator#">Tax Calculator</HashLink>
                <HashLink smooth to="/faqs#">FAQs</HashLink>
              </FooterColumn>

              {/* LEGAL */}
              <FooterColumn title="Legal">
                <HashLink smooth to="/legal#privacy">Privacy Policy</HashLink>
                <HashLink smooth to="/legal#terms">Terms of Service</HashLink>
                <HashLink smooth to="/legal#compliance">Compliance</HashLink>
                <HashLink smooth to="/legal#disclaimer">Disclaimer</HashLink>
              </FooterColumn>

              {/* HELP */}
              <FooterColumn title="Help Center">
                <span>Contact Us</span>
                <span>Report Issue</span>
                <span>Live Support</span>
              </FooterColumn>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="border-t border-gray-400 mt-10 pt-6 text-center">
            <p className="text-xs sm:text-sm md:text-base">
              © CheckTax. An official platform for Nigeria's 2026 Tax Reform Act.
              All rights reserved.
              <br className="hidden sm:block" />
              This is a demonstration interface. For official information, visit{" "}
              <a
                href="https://www.nrs.gov.ng/"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                the National Revenue Service (NRS) website
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* SMALL HELPER COMPONENT */

const FooterColumn = ({ title, children }) => (
  <div className="space-y-2">
    <h5 className="text-base sm:text-lg font-semibold">{title}</h5>
    <ul className="space-y-3 text-sm sm:text-sm opacity-80">
      {React.Children.map(children, (child, i) => (
        <li key={i} className="hover:underline cursor-pointer">
          {child}
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;
