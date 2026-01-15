import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./pages/Homepage";
import TaxCalculator from "./pages/TaxCalculator";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

// Wrapper to conditionally show Navbar
function Layout({ children }) {
  const location = useLocation();

  // Hide Navbar on NotFound route
  const hideNavbar = location.pathname === "/404" || location.pathname === "*";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Homepage />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} />
          {/* NotFound route */}
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
