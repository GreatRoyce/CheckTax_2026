import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import TaxCalculator from "./pages/TaxCalculator";
import TaxGuide from "./pages/TaxGuide";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQs";
import Legal from "./pages/Legal";


function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}


function BlankLayout({ children }) {
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* NEED navbar */}
        <Route
          element={
            <MainLayout>
              <Homepage />
            </MainLayout>
          }
          path="/"
        />

        <Route
          element={
            <MainLayout>
              <Homepage />
            </MainLayout>
          }
          path="/home"
        />

        <Route
          element={
            <MainLayout>
              <TaxCalculator />
            </MainLayout>
          }
          path="/tax-calculator"
        />

        <Route
          element={
            <MainLayout>
              <TaxGuide />
            </MainLayout>
          }
          path="/tax-guide"
        />

        <Route
          element={
            <MainLayout>
              <FAQ />
            </MainLayout>
          }
          path="/FAQs"
        />

        <Route
          element={
            <MainLayout>
              <Legal />
            </MainLayout>
          }
          path="/legal"
        />

        {/* Catch-all 404 with NO navbar */}
        <Route
          path="*"
          element={
            <BlankLayout>
              <NotFound />
            </BlankLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
