import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HeroData } from "../Data/HeroData";
import BarChart from "../components/BarChart";
import { MdHeight } from "react-icons/md";

function HeroSection() {
  const [heroData, setHeroData] = useState({
    labels: HeroData.map((data) => data.year),
    datasets: [
      {
        label: "Tax Revenue Projection (2025 vs 2026)",
        data: HeroData.map((data) => data.value),
        borderWidth: 1,

        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return null; // prevents initial render bug

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );

          gradient.addColorStop(0, "#006944"); // bottom
          gradient.addColorStop(1, "#00b37a"); // top

          return gradient;
        },

        barThickness: 50,
        borderRadius: 1,
        maxBarThickness: 100,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },

    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 10,
        },
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 50000,

        ticks: {
          padding: 6,
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
    <div>
      <div className=" w-screen h-[84vh] pt-20 bg-primary/5">
        <div className=" w-4/5 flex mx-auto h-[90%]">
          <div className=" w-3/5 h-full">
            <div className="h-5/6 mt-11 grid grid-rows-[3fr_2fr]">
              <div className=" pl-10 mx-auto ">
                <h1 className="text-btnprimary mb-2 text-pretty w-4/5">
                  Navigate the 2026 Tax Reform with Confidence
                </h1>
                <h4 className=" p-2 text-pretty">
                  Your official digital companion for understanding,
                  calculating, and complying with Nigeria's 2026 Tax Reform Act.
                  Simplifying complex changes for the individuals and
                  businesses.
                </h4>
              </div>

              {/* Active and inactive button styles updated */}

              <div className="grid grid-rows-[1fr_2fr]">
                <div className=" mx-auto text-center justify-center items-center flex pt-5 space-x-6">
                  <button
                    className={
                      activebtn === "check"
                        ? "px-4 py-2 rounded-md font-bold bg-primary text-secondary hover:bg-primary/90 active:text-primary active:bg-secondary transition-colors duration-300 ease-in-out border-2 border-primary"
                        : "px-4 py-2 rounded-md font-bold bg-secondary text-btnprimary hover:bg-secondary/90 active:text-secondary active:bg-btnprimary transition-colors duration-300 ease-in-out border-2 border-btnprimary"
                    }
                    onClick={() => setActivebtn("check")}
                  >
                    <Link
                      to="/tax-calculator"
                      className="flex justify-between gap-4 items-center"
                    >
                      Get Started <FaArrowRight className="h-5 w-5" />
                    </Link>
                  </button>

                  <button
                    className={
                      activebtn === "submit"
                        ? "px-4 py-2 rounded-md font-bold bg-primary text-secondary hover:bg-primary/90 active:text-primary active:bg-secondary transition-colors duration-300 ease-in-out border-2 border-primary"
                        : "px-4 py-2 rounded-md font-bold bg-secondary text-btnprimary hover:bg-secondary/90 active:text-secondary active:bg-btnprimary transition-colors duration-300 ease-in-out border-2 border-btnprimary"
                    }
                    onClick={() => setActivebtn("submit")}
                  >
                    <span className="flex justify-between gap-2 items-center">
                      Learn More <FaPlayCircle className="h-5 w-5" />{" "}
                    </span>
                  </button>
                </div>

                <div className=" grid grid-cols-3 gap-4 mx-auto justify-center items-center  py-2">
                  <div className=" flex flex-col text-center">
                    <h1 className="text-btnprimary ">20%</h1>
                    <h6>Target Compliance</h6>
                  </div>
                  <div className=" flex flex-col text-center">
                    <h1 className="text-btnprimary">₦4.2T</h1>
                    <h6>Projected Revenue</h6>
                  </div>
                  <div className=" flex flex-col text-center ">
                    <h1 className="text-btnprimary">85%</h1>
                    <h6>Digital Filing Target</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* GRAPHIC AREA */}
          <div className="w-2/5 h-full bg-secondary shadow-lg z-1">
            <div className="w-full h-full p-6">
              <BarChart chartData={heroData} chartOptions={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
