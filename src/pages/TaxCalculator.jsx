import React from "react";
import Footer from "../sections/Footer";
import CompBtn from "../components/CompBtn";
import { CgProfile } from "react-icons/cg";
import { FaNewspaper } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { FaFileDownload } from "react-icons/fa";

const box = [
  {
    id: 1,
    icon: <CgProfile />,
    title: "Personal Income Tax",
    subtitle: "For Employed Individuals",
  },
  {
    id: 2,
    icon: <FaNewspaper />,
    title: "Corporate Tax",
    subtitle: "For Businesses and Companies",
  },
  {
    id: 3,
    icon: <BsCart4 />,
    title: "Value Added Tax (VAT)",
    subtitle: "For Goods and Services",
  },
  {
    id: 4,
    icon: <VscGraph />,
    title: "Capital Gains Tax",
    subtitle: "For Investment Profits",
  },
  {
    id: 5,
    icon: "",
    title: "Withholding Tax",
    subtitle: "For Specific Payments",
  },
  { id: 6, icon: "", title: "Stamp Duty", subtitle: "For Legal Documents" },
];

function TaxCalculator() {
  return (
    <div>
      <div className="bg-secondary">
        <header className="mx-auto text-center space-y-2 pt-24">
          <h2 className=" text-black/85">Tax Calculator</h2>
          <h6>Calculate your tax liability</h6>
        </header>

        <main className=" h-[70vh] rounded-lg py-2 px-28 mt-6 mx-auto ">
          <h5 className="font-bold text-black/85">Select Tax Type</h5>
          <div className="grid grid-cols-[3fr_1.2fr] gap-10">
            <section className="grid grid-cols-3 pt-6 gap-6">
              {box.map((item) => (
                <div
                  key={item.id}
                  className="shade border-2 text-center border-primary rounded-lg p-4 my-4 hover:shadow-xl cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <div className="flex text-primary text-center text-5xl justify-center items-center mx-auto">
                    {item.icon}
                  </div>
                  <h4 className="font-bold p-2">{item.title}</h4>
                  <p>{item.subtitle}</p>
                </div>
              ))}
            </section>

            <div className=" grid grid-rows-[4fr_1fr]">
              <section className="border border-gray-900  h-full rounded-lg pt-8 px-4">
                <div className=" text-left">
                  <div className="flex items-center space-x-2 pb-8">
                    <i class=" text-black ml-[-6px] text-2xl fa-solid fa-lightbulb"></i>
                    <h5>Tips</h5>
                  </div>

                  <div className=" flex space-x-2">
                    <i class=" text-yellow-400 fa-solid fa-lightbulb"></i>

                    <h6 className=""> Remember to include allowances</h6>
                  </div>
                  <hr className="border-t-2 border-gray-300 w-5/6 mx-auto my-2 py-1" />

                  <div className=" flex space-x-2">
                    <i class=" text-yellow-400 fa-solid fa-lightbulb"></i>
                    <h6 className="">
                      {" "}
                      Pension contributions reduce taxable income{" "}
                    </h6>
                  </div>
                  <hr className="border-t-2 border-gray-300  w-5/6 mx-auto my-2 py-1" />

                  <div className=" flex space-x-2">
                    <i class=" text-yellow-400 fa-solid fa-lightbulb"></i>
                    <h6 className=""> Keep record of all deductions</h6>
                  </div>
                  <hr className="border-t-2 border-gray-300  w-5/6 mx-auto my-2 py-1" />

                  <div className=" flex space-x-2">
                    <i class=" text-yellow-400 fa-solid fa-lightbulb"></i>
                    <h6 className="">
                      {" "}
                      File before March 31st to avoid penalties
                    </h6>
                  </div>
                  <hr className="border-t-2 border-gray-300  w-5/6 mx-auto my-2 py-1" />
                </div>
              </section>
              <div className="flex justify-center items-center">
                <CompBtn
                  className="m-5 items-center px-4 py-2 font-semibold"
                  variant="primary"
                >
          
                  <span>Download Tax Estimation</span>
                </CompBtn>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default TaxCalculator;
