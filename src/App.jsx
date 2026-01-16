import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import TaxCalculator from "./pages/TaxCalculator";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

// Layout wrapper
function Layout({ children }) {
  const location = useLocation();

  // Hide Navbar ONLY on NotFound
  const hideNavbar = location.pathname === "/404";

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
          <Route path="/home" element={<Homepage />} />
          <Route path="/tax-calculator" element={<TaxCalculator />} />

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
