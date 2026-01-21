import React, { useState } from "react";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HeroData } from "../Data/HeroData";
import BarChart from "../components/BarChart";
import { HashLink as Hashlink } from "react-router-hash-link";


function HeroSection() {
  const [heroData] = useState({
    labels: HeroData.map((data) => data.year),
    datasets: [
      {
        label: "Tax Revenue Projection(2025 vs 2026",
        data: HeroData.map((data) => data.value),
        borderWidth: 1,
        barThickness: 50,
        maxBarThickness: 80,
        borderRadius: 2,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top,
          );
          gradient.addColorStop(0, "#006944");
          gradient.addColorStop(1, "#00b37a");
          return gradient;
        },
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 10,
        },
      },
    },

    scales: {
      y: {
        title: {
          display: true,
          text: "Revenue (%)",
          padding: 10,
        },
        beginAtZero: true,
        min: 0,
        max: 12.0, // REAL vertical space
        ticks: {
          stepSize: 2, // more space between grid lines
          padding: 10,
        },
      },
      x: {
        barPercentage: 0.6,
        categoryPercentage: 0.7,
      },
    },
  };

  const [activebtn, setActivebtn] = useState("check");

  return (
    <div className="w-full min-h-screen md:h-[84vh] pt-12 md:pt-20 bg-primary/5">
      <div className="w-full md:w-4/5 h-full mx-auto px-4 md:px-0 flex flex-col lg:flex-row">
        {/* LEFT SECTION */}
        <div className="w-full lg:w-3/5 h-full order-1">
          <div className="h-full mt-6 md:mt-11 grid grid-rows-[auto_auto] lg:grid-rows-2">
            <div className="pl-0 md:pl-10 text-center md:text-left">
              <h1 className="text-btnprimary mb-2 w-full md:w-4/5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Navigate the 2026 Tax Reform with Confidence
              </h1>
              <h4 className="p-2 text-sm sm:text-base md:text-md">
                A citizen-first digital platform created to make sense of
                Nigeria’s 2026 tax reforms, helping individuals and businesses
                understand what applies to them, estimate tax obligations
                accurately, and approach compliance with confidence and clarity.
              </h4>
            </div>

            <div className="grid grid-rows-[auto_auto] mt-6 md:mt-0">
              <div className="flex flex-col sm:flex-row justify-center items-center pb-6 gap-4 sm:gap-6">
                <button
                  className={`w-full sm:w-auto px-4 py-3 sm:py-2 rounded-md font-bold transition-colors duration-300 ease-in-out border-2 ${
                    activebtn === "check"
                      ? "bg-primary text-secondary hover:bg-primary/90 active:text-primary active:bg-secondary border-primary"
                      : "bg-secondary text-btnprimary hover:bg-secondary/90 active:text-secondary active:bg-btnprimary border-btnprimary"
                  }`}
                  onClick={() => setActivebtn("check")}
                >
                  <Hashlink
                    to="/tax-calculator"
                    className="flex justify-center gap-2 sm:gap-4 items-center"
                  >
                    Calculate Tax <FaArrowRight className="h-5 w-5" />
                  </Hashlink>
                </button>
                <Hashlink smooth to="/tax-guide"
                  className={`w-full  sm:w-auto px-4 py-3 sm:py-2 rounded-md font-bold transition-colors duration-300 ease-in-out border-2 ${
                    activebtn === "submit"
                      ? "bg-primary text-secondary hover:bg-primary/90 active:text-primary active:bg-secondary border-primary"
                      : "bg-secondary text-btnprimary hover:bg-secondary/90 active:text-secondary active:bg-btnprimary border-btnprimary"
                  }`}
                  onClick={() => setActivebtn("submit")}
                >
                  <span className="flex justify-center gap-2 sm:gap-2 items-center">
                    Learn More <IoInformationCircle className="h-5 w-5" />
                  </span>
                </Hashlink>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center pb-2">
                <div>
                  <h1 className="text-btnprimary text-2xl sm:text-4xl md:text-5xl">
                    80%
                  </h1>
                  <h6 className="text-xs sm:text-sm md:text-base">
                    Target Compliance
                  </h6>
                </div>
                <div>
                  <h1 className="text-btnprimary text-2xl sm:text-4xl md:text-5xl">
                    ₦11.5T
                  </h1>
                  <h6 className="text-xs sm:text-sm md:text-base">
                    Projected Revenue
                  </h6>
                </div>
                <div>
                  <h1 className="text-btnprimary text-2xl sm:text-4xl md:text-5xl">
                    90%
                  </h1>
                  <h6 className="text-xs sm:text-sm md:text-base">
                    Digital Filing Target
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRAPH AREA */}
        <div className="w-full lg:w-[38%] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-secondary shadow-lg order-2 lg:order-2 mt-6 lg:mt-0">
          <div className="w-full h-full p-4 sm:p-6">
            <BarChart
              style={{ width: "100%", height: "100%" }}
              chartData={heroData}
              chartOptions={chartOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
