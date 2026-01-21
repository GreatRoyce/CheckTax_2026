import React, { useState, useEffect, useMemo } from "react";
import { MdRefresh } from "react-icons/md";
import { GoGraph } from "react-icons/go";

/* ---------------- TAX TABLES ---------------- */

const OLD_TAX = [
  { max: 300000, monthly: 1750 },
  { max: 500000, monthly: 3583 },
  { max: 800000, monthly: 7000 },
  { max: 1000000, monthly: 9500 },
  { max: 1200000, monthly: 12333 },
  { max: 1500000, monthly: 17083 },
  { max: 1800000, monthly: 22333 },
  { max: 2000000, monthly: 25833 },
  { max: 2400000, monthly: 32833 },
  { max: 3000000, monthly: 43167 },
  { max: 3600000, monthly: 72000 },
  { max: 4800000, monthly: 96000 },
  { max: 6000000, monthly: 120000 },
  { max: 7200000, monthly: 144000 },
  { max: 8400000, monthly: 168000 },
  { max: 9600000, monthly: 192000 },
  { max: 10800000, monthly: 261000 },
  { max: 12000000, monthly: 240000 },
];

const NEW_TAX = [
  { max: 800000, monthly: 0 },
  { max: 1000000, monthly: 2500 },
  { max: 1200000, monthly: 5000 },
  { max: 1500000, monthly: 8750 },
  { max: 1800000, monthly: 12500 },
  { max: 2000000, monthly: 15000 },
  { max: 2400000, monthly: 20000 },
  { max: 3000000, monthly: 27500 },
  { max: 3600000, monthly: 36500 },
  { max: 4800000, monthly: 54500 },
  { max: 6000000, monthly: 72500 },
  { max: 7200000, monthly: 90500 },
  { max: 8400000, monthly: 108500 },
  { max: 9600000, monthly: 126500 },
  { max: 10800000, monthly: 144500 },
  { max: 12000000, monthly: 162500 },
];

function resolveTax(income, table) {
  for (let band of table) {
    if (income <= band.max) return band.monthly;
  }
  return table.at(-1).monthly;
}

/* ---------------- GRAPH COMPONENT ---------------- */
const TaxGraph = ({ income, oldTax, newTax }) => {
  // Generate sample data points for the graph
  const dataPoints = useMemo(() => {
    const points = [];
    const step = 1000000; // 1 million intervals
    const maxIncome = 12000000;

    for (let i = 0; i <= maxIncome; i += step) {
      points.push({
        income: i,
        oldTax: resolveTax(i, OLD_TAX),
        newTax: resolveTax(i, NEW_TAX),
      });
    }
    return points;
  }, []);

  const maxTax = Math.max(
    ...dataPoints.map((d) => Math.max(d.oldTax, d.newTax)),
  );
  const maxIncome = 12000000;

  // Scale functions for SVG
  const scaleX = (value) => (value / maxIncome) * 100;
  const scaleY = (value) => 100 - (value / maxTax) * 100;

  return (
    <div className="p-2 sm:p-4 h-full border-3">
      <h4 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-gray-700">
        Tax Comparison Over Income Range
      </h4>
      <div className="relative h-48 sm:h-56 md:h-64 w-full">
        {/* SVG Graph */}
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 20, 40, 60, 80, 100].map((y) => (
            <line
              key={`grid-y-${y}`}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {[0, 25, 50, 75, 100].map((x) => (
            <line
              key={`grid-x-${x}`}
              x1={x}
              y1="0"
              x2={x}
              y2="100"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          {/* Old Tax Line */}
          <polyline
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
            points={dataPoints
              .map((d) => `${scaleX(d.income)},${scaleY(d.oldTax)}`)
              .join(" ")}
          />

          {/* New Tax Line */}
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            points={dataPoints
              .map((d) => `${scaleX(d.income)},${scaleY(d.newTax)}`)
              .join(" ")}
          />

          {/* Current income indicator */}
          <line
            x1={scaleX(income)}
            y1="0"
            x2={scaleX(income)}
            y2="100"
            stroke="#3b82f6"
            strokeWidth="1"
            strokeDasharray="3,3"
          />

          {/* Current income point for old tax */}
          <circle
            cx={scaleX(income)}
            cy={scaleY(oldTax)}
            r="2"
            fill="#ef4444"
            stroke="white"
            strokeWidth="1"
          />

          {/* Current income point for new tax */}
          <circle
            cx={scaleX(income)}
            cy={scaleY(newTax)}
            r="2"
            fill="#10b981"
            stroke="white"
            strokeWidth="1"
          />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-1 sm:bottom-2 right-0 sm:left-2 flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 sm:w-3 h-0.5 bg-red-500"></div>
            <span className="text-gray-600 text-xs">2025 Tax</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 sm:w-3 h-0.5 bg-green-500"></div>
            <span className="text-gray-600 text-xs">2026 Tax</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div
              className="w-2 sm:w-3 h-0.5 bg-blue-500"
              style={{ strokeDasharray: "3,3" }}
            ></div>
            <span className="text-gray-600 text-xs">Current Income</span>
          </div>
        </div>

        {/* Axis labels */}
        <div className="absolute bottom-0 left-0 sm:left-1/2 sm:transform-translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
          Annual Income (₦ millions)
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500 whitespace-nowrap origin-left">
          Monthly Tax (₦)
        </div>
      </div>

      {/* Income markers */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>₦0</span>
        <span>₦6M</span>
        <span>₦12M</span>
      </div>
    </div>
  );
};

function Dashboard() {
  const [income, setIncome] = useState(800000);
  const [oldTax, setOldTax] = useState(0);
  const [newTax, setNewTax] = useState(0);

  useEffect(() => {
    setOldTax(resolveTax(income, OLD_TAX));
    setNewTax(resolveTax(income, NEW_TAX));
  }, [income]);

  const reset = () => {
    setIncome(800000);
  };

  const difference = newTax - oldTax;

  return (
    <div className="w-full lg:w-4/5 p-3 sm:p-4 mb-8 sm:mb-32 text-center h-auto min-h-screen mx-auto">
      <header className="py-4 pt-10 sm:pt-16 sm:mt-10">
        <h2 className="text-xl sm:text-2xl md:text-3xl">Dashboard</h2>
        <h4 className="text-sm sm:text-base md:text-lg">Your Tax Overview</h4>
      </header>

      <main className="shadow-lg h-auto min-h-[84vh] sm:h-[100vh] rounded-lg border">
        {/* NAV */}
        <nav className="h-10 sm:h-12 px-3 sm:px-4 flex justify-between items-center border-b-2 border-footercolor">
          <div className="flex items-center gap-1 sm:gap-2">
            <GoGraph className="h-4 w-4 sm:h-6 sm:w-6" />
            <h4 className="text-sm sm:text-xl">Tax Impact Forecast</h4>
          </div>

          <button onClick={reset} title="Reset" className="p-1 sm:p-0">
            <MdRefresh className="h-6 w-6 sm:h-10 sm:w-10 opacity-60 hover:opacity-100 active:rotate-180 transition-all duration-300" />
          </button>
        </nav>

        {/* BODY */}
        <section className="pt-2 sm:pt-4 pb-2 sm:pb-4 h-auto min-h-[80vh] sm:h-[85vh]">
          {/* SLIDER */}
          <div className="px-3 sm:px-5 mb-4 sm:mb-8 h-auto">
            <label className="font-semibold text-base sm:text-xl text-left text-black/80 block mb-3 sm:mb-6">
              Annual Income: ₦{income.toLocaleString()}
            </label>

            <input
              type="range"
              min={0}
              max={12000000}
              step={100000}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full accent-primary h-2"
            />
            <div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-2">
              <span>₦0</span>
              <span className="truncate max-w-[120px] sm:max-w-none">
                ₦{income.toLocaleString()}
              </span>
              <span>₦12M</span>
            </div>
          </div>

          {/* RESULTS */}
          <div className="h-auto grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-3 sm:gap-6 p-2 sm:p-4">
            <div className="bg-btnprimary/10 rounded-lg h-64 sm:h-72 md:h-80 lg:h-85">
              <TaxGraph income={income} oldTax={oldTax} newTax={newTax} />
            </div>
            <div className="bg-btnprimary/10 rounded-lg p-3 sm:p-4 space-y-3 sm:space-y-4">
              <Stat label="2026 Tax (Monthly)" value={newTax} />
              <Stat label="2025 Tax (Monthly)" value={oldTax} />
              <Stat
                label="Difference"
                value={difference}
                highlight={difference < 0 ? "green" : "red"}
              />
              <div className="pt-2 sm:pt-4 text-xs sm:text-sm text-gray-600">
                <p className="font-semibold">Key Insight:</p>
                <p className="mt-1">
                  {difference < 0
                    ? "✓ You'll pay less tax in 2026!"
                    : difference > 0
                      ? "⚠ You'll pay more tax in 2026"
                      : "Tax remains the same"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------- SMALL STAT COMPONENT ---------------- */

function Stat({ label, value, highlight }) {
  return (
    <div className="border-b border-gray-400 pb-1 sm:pb-2">
      <h4 className="font-semibold text-sm sm:text-base">{label}</h4>
      <p
        className={`text-base sm:text-lg font-bold ${
          highlight === "green"
            ? "text-green-600"
            : highlight === "red"
              ? "text-red-600"
              : "text-black/80"
        }`}
      >
        ₦{value.toLocaleString()}
      </p>
    </div>
  );
}

export default Dashboard;
