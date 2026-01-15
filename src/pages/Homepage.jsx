import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../sections/HeroSection";
import Dashboard from "../sections/Dashboard";
import Footer from "../sections/Footer";

function Homepage() {
  return (
    <div>
      <div>
        {/* <Navbar /> */}
        <HeroSection />
         <Dashboard /> 
         <Footer />
      </div>
    </div>
  );
}

export default Homepage;
