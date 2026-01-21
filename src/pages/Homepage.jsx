import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../sections/HeroSection";
import Dashboard from "../sections/Dashboard";
import Footer from "../sections/Footer";

function Homepage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <div>
      <div id="home">
        <HeroSection id="hero" />
        <Dashboard id="dashboard" />
        <Footer />
      </div>
    </div>
  );
}

export default Homepage;
