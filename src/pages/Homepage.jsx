import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "../sections/HeroSection";
import Dashboard from "../sections/Dashboard";
import Footer from "../sections/Footer";

function Homepage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    const id = hash.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash]);

  return (
    <main className="flex flex-col space-y-16 sm:space-y-20 lg:space-y-28">
      {/* HERO */}
      <section id="hero">
        <HeroSection />
      </section>

      {/* DASHBOARD */}
      <section id="dashboard">
        <Dashboard />
      </section>

      {/* FOOTER */}
      <section>
        <Footer />
      </section>
    </main>
  );
}

export default Homepage;
