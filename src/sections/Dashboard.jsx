import React from "react";
import { MdRefresh } from "react-icons/md";
import { GoGraph } from "react-icons/go";

function Dashboard() {
  return (
    <div id="dashboard" className="border w-4/5 p-4 text-center h-[100vh] mx-auto">
      <header className="py-8">
        <h2>Dashboard</h2>
        <h4>Your Tax Overview</h4>
      </header>
      <main className="shadow-lg h-[86vh] rounded-lg border">
        <nav className="h-12 pt-2 px-4 flex justify-between items-center border-b-2 border-footercolor">
          <div className="flex ">
            <GoGraph className="h-6 w-6" />
            <h4 className="text-xl">Tax Impact Forecast</h4>
          </div>
          <button>
            <MdRefresh className="opacity-50 transition-all duration-300 ease-in-out active:opacity-100 h-10  w-10" />
          </button>
        </nav>
        <section className=" justify-center py-4 space-y-2 border-2 border-black items-center h-[74vh]">
          <div className="bg-green-800 border-2 border-black h-2/5"></div>
          <div className="bg-footercolor border-2 border-black h-3/5 grid grid-cols-[3fr_1fr] gap-6 p-4">
            {/* shorter height */}
            <div className="bg-btnprimary/10 border h-4/5 rounded-lg"> </div>
            {/* taller height */}
            <div className="bg-btnprimary/10 h-5/5 border grid grid-rows-1 space-y-2 rounded-lg">
              {/* stats */}
              <div className="border-b border-gray-400">
                <div className="grid grid-rows-1 justify-between border-b-2 border-gray-400 px-4 py-2">
                  <h4 className="text-left mr-20">Current Year</h4>
                  <h4 className="font-bold text-xl text-primary ml-20 justify-end border text-right">
                    ₦129,950
                  </h4>
                </div>

                <div className="grid grid-rows-1 justify-between border-b-2 border-gray-400 px-4 py-2">
                  <h4 className="text-left mr-20">
                    Next Year <br /> (Projected):
                  </h4>
                  <h4 className="font-bold text-xl text-primary ml-20 justify-end border text-right">
                    ₦136,448
                  </h4>
                </div>

                <div className="grid grid-rows-1 justify-between px-4 pt-2">
                  <h4 className="text-left mr-20">Difference</h4>
                  <h4 className="font-bold text-xl text-primary ml-20 justify-end border text-right">
                    ₦6,498
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
