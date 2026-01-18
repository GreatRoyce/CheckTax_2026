import React from "react";
import { 
  FaBullseye, 
  FaMoneyBillAlt, 
  FaHome, 
  FaBuilding, 
  FaCoins, 
  FaUsers, 
  FaExclamationTriangle, 
  FaCheck,
  FaChartLine,
  FaUserTie,
  FaBusinessTime,
  FaCity,
  FaWallet,
  FaLandmark,
  FaArrowRight,
  FaFileAlt
} from "react-icons/fa";
import { 
  MdOutlineBusinessCenter,
  MdOutlineRealEstateAgent
} from "react-icons/md";
import { 
  HiOutlineGlobeAlt
} from "react-icons/hi";
import { 
  TbBuildingSkyscraper,
  TbCurrencyNaira
} from "react-icons/tb";
import Footer from "../sections/Footer";

function TaxGuide() {
  return (
    <div>

    <div className="w-full min-h-screen bg-footed px-4 sm:px-6 md:px-20 py-8 sm:py-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mt-16 mb-10">
      
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Nigeria's 2026 Tax Reforms Guide
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Clear explanations of the 2026 tax reforms, written in plain language for individuals and businesses in Nigeria.
          </p>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-3">
              <TbCurrencyNaira className="text-primary text-2xl" />
              <div className="text-3xl font-bold text-primary">₦800k</div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Tax-free income threshold
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-3">
              <MdOutlineBusinessCenter className="text-primary text-2xl" />
              <div className="text-3xl font-bold text-primary">₦100M</div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Small business exemption
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FaHome className="text-primary text-2xl" />
              <div className="text-3xl font-bold text-primary">20%</div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Rent relief rate
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-5 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-center gap-3 mb-3">
              <TbBuildingSkyscraper className="text-primary text-2xl" />
              <div className="text-3xl font-bold text-primary">15%</div>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              Corporate tax minimum
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Purpose Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaBullseye className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className=" font-bold text-gray-900 mb-2">
                    Purpose of the Tax Reforms
                  </h3>
                  <h4 className=" text-gray-600">
                    Understanding why the tax system needed reform
                  </h4>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-gray-700 font-normal leading-relaxed">
                  Nigeria's tax system has been historically complicated, with multiple agencies and overlapping regulations. This created confusion for taxpayers about what taxes applied to them and how much they should pay.
                </h4>
                
                <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary">
                  <h4 className="text-gray-700 font-normal leading-relaxed">
                    The 2026 reforms were designed to create a simpler, fairer, and more transparent tax system that encourages compliance while expanding the tax base.
                  </h4>
                </div>
              </div>
            </div>

            {/* Personal Tax & Rent Relief */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Income Tax */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FaMoneyBillAlt className="text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900">Personal Income Tax</h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    Annual income below <span className="font-bold text-primary">₦800,000</span> is exempt from personal income tax. Income above this amount follows progressive tax bands.
                  </p>
                  
                  <div className="text-sm bg-gray-50 rounded p-3">
                    <p className="font-medium text-gray-700 mb-1">Tax Brackets:</p>
                    <ul className="text-gray-600 space-y-1">
                      <li>• ₦800,001 - ₦2,000,000: 10%</li>
                      <li>• ₦2,000,001 - ₦5,000,000: 15%</li>
                      <li>• Above ₦5,000,000: Up to 25%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Rent Relief */}
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FaHome className="text-primary" />
                  </div>
                  <h3 className="font-bold text-gray-900">Rent Relief</h3>
                </div>
                
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-primary">20%</span> of annual rent is deductible, with a maximum limit of ₦500,000 per year.
                  </p>
                  
                  <div className="text-sm bg-gray-50 rounded p-3">
                    <p className="font-medium text-gray-700 mb-2">Other Deductions:</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-primary text-xs" />
                        <span className="text-gray-600">Pension contributions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-primary text-xs" />
                        <span className="text-gray-600">NHIS contributions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaCheck className="text-primary text-xs" />
                        <span className="text-gray-600">Life insurance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Tax Changes */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaBuilding className="text-primary text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Business Tax Changes
                  </h2>
                  <h4 className="text-gray-600">
                    Different rules for small and large businesses
                  </h4>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheck className="text-green-600" />
                    </div>
                    <h4 className="font-bold text-gray-900">Small Businesses</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Annual turnover below ₦100 million exempt from Corporate Income Tax, VAT, and development levy.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaChartLine className="text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900">Large Companies</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Minimum 15% effective tax rate with anti-profit shifting measures.
                  </p>
                </div>
              </div>
            </div>

            {/* Digital Assets & Property */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaCoins className="text-primary text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Digital Assets & Property
                  </h2>
                  <h4 className="text-gray-600">
                    New rules for modern assets
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <FaWallet className="text-primary text-sm" />
                    </div>
                    <h4 className="font-medium text-gray-900">Digital Assets</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Crypto and digital asset profits are taxable upon realization. Holding assets does not trigger tax.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <MdOutlineRealEstateAgent className="text-primary text-sm" />
                    </div>
                    <h4 className="font-medium text-gray-900">Property</h4>
                  </div>
                  <p className="text-sm text-gray-700">
                    Capital gains on property sales are taxable. Personal residences and small personal items are exempt.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Who It Affects */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-primary" />
                </div>
                <h3 className="font-bold text-gray-900">Who It Affects</h3>
              </div>

              <div className="space-y-3">
                {[
                  { text: "Individual taxpayers", icon: <FaUserTie className="text-primary" /> },
                  { text: "Salaried employees", icon: <FaUserTie className="text-primary" /> },
                  { text: "Small businesses", icon: <FaBusinessTime className="text-primary" /> },
                  { text: "Large corporations", icon: <FaCity className="text-primary" /> },
                  { text: "Crypto investors", icon: <FaWallet className="text-primary" /> },
                  { text: "Property owners", icon: <FaLandmark className="text-primary" /> }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Impact varies by group. Some benefit from new exemptions, others face clearer obligations.
                </p>
              </div>
            </div>

            {/* Official Reference */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 border-primary/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FaExclamationTriangle className="text-primary" />
                </div>
                <h3 className="font-bold text-gray-900">Official Reference</h3>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm text-gray-700">
                  For official tax filing, disputes, penalties, and legal interpretations, contact the Nigeria Revenue Service.
                </h4>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HiOutlineGlobeAlt className="text-primary" />
                    <p className="font-medium text-primary text-sm">Official Guidance</p>
                  </div>
                  <h4 className=" font-normal text-gray-600">
                    Always verify information with the official NRS website for the most current regulations.
                  </h4>
                </div>

                <a
                  href="https://www.nrs.gov.ng/"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full bg-primary hover:bg-btnprimary text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Visit NRS Website</span>
                    <FaArrowRight className="h-3 w-3" />
                  </div>
                </a>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h4 className="font-bold text-gray-900 text-sm mb-2">Important Note</h4>
              <h4 className=" text-gray-600 leading-relaxed">
                This guide provides general information about the 2026 tax reforms. It is not legal or professional tax advice. For specific tax situations, consult a qualified tax professional or the Nigeria Revenue Service.
              </h4>
              
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className="">
          <Footer />
      </div>
    </div>

  );
}

export default TaxGuide;
