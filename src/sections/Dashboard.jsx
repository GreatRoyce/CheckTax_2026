import React, { useState, useEffect } from "react";
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
    <div className=" w-4/5 p-4 text-center h-screen mx-auto">
      <header className="py-8">
        <h2>Dashboard</h2>
        <h4>Your Tax Overview</h4>
      </header>

      <main className="shadow-lg h-[86vh] rounded-lg border">
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
        <section className="pt-10 space-y-4 h-[74vh]">
          {/* SLIDER */}
          <div className="px-5 h-2/5">
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
          </div>

          {/* RESULTS */}
          <div className=" h-3/5 grid grid-cols-[3fr_1fr] gap-6 p-4">
            <div className="bg-btnprimary/10 rounded-lg" />

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
