import React, { useState } from "react";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HeroData } from "../Data/HeroData";
import BarChart from "../components/BarChart";

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
    <div className="w-full h-[84vh] pt-20 bg-primary/5 ">
      <div className="w-4/5 h-full mx-auto flex">
        {/* LEFT SECTION */}
        <div className="w-3/5 h-full">
          <div className="h-full mt-11 grid grid-rows-[3fr_2fr]">
            <div className="pl-10">
              <h1 className="text-btnprimary mb-2 w-4/5">
                Navigate the 2026 Tax Reform with Confidence
              </h1>
              <h4 className="p-2">
                Your official digital companion for understanding, calculating,
                and complying with Nigeria's 2026 Tax Reform Act.
              </h4>
            </div>

            <div className="grid grid-rows-[1fr_2fr]">
              <div className="flex justify-center items-center pb-6 gap-6">
                <button
                  className={
                    activebtn === "check"
                      ? "px-4 py-2 rounded-md font-bold bg-primary text-secondary hover:bg-primary/90 active:text-primary active:bg-secondary transition-colors duration-300 ease-in-out border-2 border-primary"
                      : "px-4 py-2 rounded-md font-bold bg-secondary text-btnprimary hover:bg-secondary/90 active:text-secondary active:bg-btnprimary transition-colors duration-300 ease-in-out border-2 border-btnprimary"
                  }
                  onClick={() => setActivebtn("check")}
                >
                  {" "}
                  <Link
                    to="/tax-calculator"
                    className="flex justify-between gap-4 items-center"
                  >
                    {" "}
                    Get Started <FaArrowRight className="h-5 w-5" />{" "}
                  </Link>{" "}
                </button>{" "}
                <button
                  className={
                    activebtn === "submit"
                      ? "px-4 py-2 rounded-md font-bold bg-primary text-secondary hover:bg-primary/90 active:text-primary active:bg-secondary transition-colors duration-300 ease-in-out border-2 border-primary"
                      : "px-4 py-2 rounded-md font-bold bg-secondary text-btnprimary hover:bg-secondary/90 active:text-secondary active:bg-btnprimary transition-colors duration-300 ease-in-out border-2 border-btnprimary"
                  }
                  onClick={() => setActivebtn("submit")}
                >
                  {" "}
                  <span className="flex justify-between gap-2 items-center">
                    {" "}
                    Learn More <FaPlayCircle className="h-5 w-5" />{" "}
                  </span>{" "}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center pb-2">
                <div>
                  <h1 className="text-btnprimary">80%</h1>
                  <h6>Target Compliance</h6>
                </div>
                <div>
                  <h1 className="text-btnprimary">₦11.5T</h1>
                  <h6>Projected Revenue</h6>
                </div>
                <div>
                  <h1 className="text-btnprimary">90%</h1>
                  <h6>Digital Filing Target</h6>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GRAPH AREA — THIS IS THE FIX */}
        <div className="w-[38%] h-[450px] bg-secondary shadow-lg">
          <div className="w-full h-full p-6">
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
