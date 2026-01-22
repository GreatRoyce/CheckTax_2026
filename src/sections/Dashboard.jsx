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

/* ---------------- GRAPH ---------------- */

const TaxGraph = ({ income, oldTax, newTax }) => {
  const dataPoints = useMemo(() => {
    const points = [];
    const step = 1_000_000;
    const maxIncome = 12_000_000;

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

  const scaleX = (v) => (v / 12_000_000) * 100;
  const scaleY = (v) => 100 - (v / maxTax) * 100;

  return (
    <div className="p-3 h-full">
      {/* <h4 className="text-sm sm:text-lg font-semibold mb-2 text-gray-700">
        Tax Comparison Over Income Range
      </h4> */}

      <div className="relative h-full w-full">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {[0, 20, 40, 60, 80, 100].map((y) => (
            <line
              key={y}
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
              key={x}
              x1={x}
              y1="0"
              x2={x}
              y2="100"
              stroke="#e5e7eb"
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          ))}

          <polyline
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
            points={dataPoints
              .map((d) => `${scaleX(d.income)},${scaleY(d.oldTax)}`)
              .join(" ")}
          />

          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            points={dataPoints
              .map((d) => `${scaleX(d.income)},${scaleY(d.newTax)}`)
              .join(" ")}
          />

          <line
            x1={scaleX(income)}
            y1="0"
            x2={scaleX(income)}
            y2="100"
            stroke="#3b82f6"
            strokeDasharray="3,3"
          />

          <circle
            cx={scaleX(income)}
            cy={scaleY(oldTax)}
            r="2"
            fill="#ef4444"
          />
          <circle
            cx={scaleX(income)}
            cy={scaleY(newTax)}
            r="2"
            fill="#10b981"
          />
        </svg>

        <div className="absolute bottom-2 left-2 text-xs space-y-1">
          <Legend color="bg-red-500" label="2025 Tax" />
          <Legend color="bg-green-500" label="2026 Tax" />
          <Legend color="bg-blue-500" label="Current Income" />
        </div>
      </div>
    </div>
  );
};

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-3 h-0.5 ${color}`} />
    <span className="text-gray-600">{label}</span>
  </div>
);

/* ---------------- DASHBOARD ---------------- */

function Dashboard() {
  const [income, setIncome] = useState(800000);
  const [oldTax, setOldTax] = useState(0);
  const [newTax, setNewTax] = useState(0);

  useEffect(() => {
    setOldTax(resolveTax(income, OLD_TAX));
    setNewTax(resolveTax(income, NEW_TAX));
  }, [income]);

  const difference = newTax - oldTax;

  return (
    <div className="w-full lg:w-4/5 sm:mt-0 lg:mt-0 md:mt-96  p-4  mx-auto text-center">
      <header className="py-6">
        <h2 className="text-2xl sm:text-3xl">Dashboard</h2>
        <h4 className="text-sm sm:text-lg text-gray-600">Your Tax Overview</h4>
      </header>

      <main className="shadow-lg rounded-lg border flex flex-col">
        <nav className="h-12 px-4 flex justify-between items-center border-b">
          <div className="flex items-center gap-2">
            <GoGraph className="h-5 w-5" />
            <h4 className="text-sm sm:text-lg">Tax Impact Forecast</h4>
          </div>

          <button onClick={() => setIncome(800000)}>
            <MdRefresh className="h-7 w-7 opacity-60 hover:opacity-100 transition" />
          </button>
        </nav>

        <section className="p-4 flex-1">
          <label className="block font-semibold mb-3">
            Annual Income: ₦{income.toLocaleString()}
          </label>

          <input
            type="range"
            min={0}
            max={12_000_000}
            step={100_000}
            value={income}
            onChange={(e) => setIncome(+e.target.value)}
            className="w-full accent-primary"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6 mt-6">
            <div className="bg-btnprimary/10 rounded-lg h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px]">
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------------- STAT ---------------- */

function Stat({ label, value, highlight }) {
  return (
    <div className="border-b-4 border-black/30 pb-2">
      <h4 className="text-sm font-semibold">{label}</h4>
      <p
        className={`text-lg font-bold ${
          highlight === "green"
            ? "text-green-600"
            : highlight === "red"
              ? "text-red-600"
              : "text-gray-800"
        }`}
      >
        ₦{value.toLocaleString()}
      </p>
    </div>
  );
}

export default Dashboard;
