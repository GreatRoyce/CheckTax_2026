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
    ...dataPoints.map((d) => Math.max(d.oldTax, d.newTax))
  );
  const maxIncome = 12000000;

  // Scale functions for SVG
  const scaleX = (value) => (value / maxIncome) * 100;
  const scaleY = (value) => 100 - (value / maxTax) * 100;

  return (
    <div className="p-4 h-full">
      <h4 className="text-lg font-semibold mb-4 text-gray-700">
        Tax Comparison Over Income Range
      </h4>
      <div className="relative h-64 w-full">
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
        <div className="absolute bottom-2 left-2 flex flex-col gap-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-500"></div>
            <span className="text-gray-600">2025 Tax</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-green-500"></div>
            <span className="text-gray-600">2026 Tax</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-0.5 bg-blue-500"
              style={{ strokeDasharray: "3,3" }}
            ></div>
            <span className="text-gray-600">Current Income</span>
          </div>
        </div>

        {/* Axis labels */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
          Annual Income (₦ millions)
        </div>
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -rotate-90 text-xs text-gray-500 whitespace-nowrap">
          Monthly Tax (₦)
        </div>
      </div>

      {/* Income markers */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>₦0</span>
        <span>₦6M</span>
        <span>₦12M</span>
      </div>

      {/* Tax markers */}
      {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
        <div className="text-right">₦{maxTax.toLocaleString()}</div>
        <div className="mt-16 text-right">₦0</div>
      </div> */}
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
    <div className="w-4/5 p-4 text-center h-screen mx-auto">
      <header className="py-8">
        <h2>Dashboard</h2>
        <h4>Your Tax Overview</h4>
      </header>

      <main className="shadow-lg h-[88.5vh] rounded-lg border">
        {/* NAV */}
        <nav className="h-12 px-4 flex justify-between items-center border-b-2 border-footercolor">
          <div className="flex items-center gap-2">
            <GoGraph className="h-6 w-6" />
            <h4 className="text-xl">Tax Impact Forecast</h4>
          </div>

          <button onClick={reset} title="Reset">
            <MdRefresh className="h-10 w-10 opacity-60 hover:opacity-100 active:rotate-180 transition-all duration-300" />
          </button>
        </nav>

        {/* BODY */}
        <section className="pt-4 pb-4 h-[65vh]">
          {/* SLIDER */}
          <div className="px-5 mb-8 h-1/5">
            <label className="font-semibold text-xl text-left text-black/80 block mb-6">
              Annual Income: ₦{income.toLocaleString()}
            </label>

            <input
              type="range"
              min={0}
              max={12000000}
              step={100000}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>₦0</span>
              <span>₦{income.toLocaleString()}</span>
              <span>₦12M</span>
            </div>
          </div>

          {/* RESULTS */}
          <div className="h-3/5 grid grid-cols-[3fr_1fr] gap-6 p-4">
            <div className="bg-btnprimary/10 rounded-lg">
              <TaxGraph income={income} oldTax={oldTax} newTax={newTax} />
            </div>
            <div className="bg-btnprimary/10 rounded-lg p-4 space-y-4">
              <Stat label="2026 Tax (Monthly)" value={newTax} />
              <Stat label="2025 Tax (Monthly)" value={oldTax} />
              <Stat
                label="Difference"
                value={difference}
                highlight={difference < 0 ? "green" : "red"}
              />
              <div className="pt-4 text-sm text-gray-600">
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
    <div className="border-b border-gray-400 pb-2">
      <h4 className="font-semibold">{label}</h4>
      <p
        className={`text-lg font-bold ${
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
