import React, { useState } from "react";
import { ChevronDown, ChevronUp, Download, ExternalLink } from "lucide-react";
import { HashLink } from 'react-router-hash-link';

function FAQs() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: "What is CheckTax?",
      answer:
        "CheckTax is a citizen-first tool that explains Nigeria's 2026 tax reforms in plain language. It helps people understand what changed, whether the reforms apply to them, what they should be aware of, and where to go next. It does not file taxes or replace government systems.",
    },
    {
      question:
        "Is CheckTax an official Nigeria Revenue Service platform?",
      answer:
        "No. CheckTax is an independent explainer tool. It is not owned, run, or endorsed by the Nigeria Revenue Service. For official filings, disputes, or enforcement matters, the NRS remains the authority.",
    },
    {
      question: "Who is CheckTax for?",
      answer:
        "CheckTax is built for individual Nigerian taxpayers, salaried workers, professionals, small business owners, startups, large corporations, lawyers, tax advisors, digital asset holders, and property owners. Different users see different information based on what applies to them.",
    },
    {
      question: "What tax laws does CheckTax cover?",
      answer:
        "CheckTax focuses on Nigeria's 2026 tax reforms, including new personal income tax bands, tax-free income thresholds, rent relief and deductions, small business exemptions, corporate tax rules, digital asset taxation, property-related tax rules, and consolidated levies. It does not cover older tax regimes or unrelated laws.",
    },
    {
      question: "If I earn less than ₦800,000 a year, do I pay tax?",
      answer:
        "No. Under the 2026 reforms, income up to ₦800,000 per year is tax-free. If your total income falls below this threshold, personal income tax does not apply.",
    },
    {
      question: "Are small businesses really exempt from multiple taxes?",
      answer:
        "Yes, if they qualify. Businesses with annual turnover below ₦100 million are exempt from Corporate Income Tax (CIT), VAT, and Development levy. This is meant to reduce compliance pressure on small businesses.",
    },
    {
      question: "Does CheckTax calculate my exact tax bill?",
      answer:
        "No. CheckTax shows applicable tax bands, high-level impact, and possible deductions and exemptions. Final tax calculations depend on official filings and assessments.",
    },
    {
      question: "What about crypto and digital assets?",
      answer:
        "Gains from digital assets may be taxable under the reforms. Tax applies when profit is made, not simply because an asset is held. The exact treatment depends on how and when gains are realized. For official interpretation, refer to the Nigeria Revenue Service.",
    },
    {
      question: "Is rent relief automatic?",
      answer:
        "No. Rent relief is capped at 20% with a maximum of ₦500,000 per year, and applies only if conditions are met and documented. Not all rent qualifies automatically.",
    },
    {
      question: "Can I rely on CheckTax for legal or professional advice?",
      answer:
        "No. CheckTax explains the law as written. It does not provide legal opinions, tax planning strategies, or dispute advice. If your situation involves audits, disputes, penalties, appeals, or complex structures, you should consult the Nigeria Revenue Service or a qualified professional.",
    },
    {
      question: "Why does CheckTax sometimes refer me to the NRS website?",
      answer:
        "Some matters can only be handled by the Nigeria Revenue Service, such as filing procedures, official interpretations, enforcement actions, and regulatory updates. When this happens, CheckTax will clearly point you to the NRS website instead of guessing or giving unreliable answers. This is intentional.",
    },
    {
      question: "Does CheckTax store my data?",
      answer:
        "No. At the MVP stage, no accounts are required, no financial documents are uploaded, and inputs are session-based only. CheckTax is designed to minimize data collection.",
    },
    {
      question: "Can I download or save information from CheckTax?",
      answer:
        "Yes. Users can download a PDF version of relevant explanations for reference purposes. This is for personal understanding, not official submission.",
    },
    {
      question: "How often is the information updated?",
      answer:
        "CheckTax reflects the reform framework as currently understood. Tax laws and interpretations can change. For the most up-to-date and official guidance, always refer to the Nigeria Revenue Service.",
    },
    {
      question: "What is the goal of CheckTax?",
      answer:
        "The goal is simple: reduce confusion, improve understanding, and support informed compliance. No fear tactics. No unnecessary complexity. Just clearer information.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };



  return (
    <div className="min-h-screen pt-16" style={{ backgroundColor: "#F8F9FB" }}>
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold mb-2 text-black/85">
            Frequently Asked Questions (FAQs)
          </h2>
          <p className="text-sm italic" style={{ color: "#006641" }}>
            CheckTax — 2026 Nigerian Tax Reform Guide
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
    
            <a
              href="https://www.nrs.gov.ng/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-sm font-medium flex items-center gap-2 border"
              style={{ borderColor: "#008753", color: "#008753" }}
            >
              <ExternalLink size={18} />
              Visit NRS Official Site
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - FAQ list */}
          <div className="lg:col-span-2 space-y-6">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  style={{
                    backgroundColor: openIndex === index ? "#f3f4f6" : "white",
                  }}
                >
                  <span
                    className="font-semibold text-md pr-4 w-3/4"
                    style={{ color: "#006641" }}
                  >
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp size={24} style={{ color: "#008753" }} />
                  ) : (
                    <ChevronDown size={24} style={{ color: "#008753" }} />
                  )}
                </button>

                {openIndex === index && (
                  <div className="px-6 pb-6 pt-2 border-t">
                    <p className="text-gray-700 text-[14px] leading-relaxed">
                      {item.answer}
                    </p>

                    {/* Action buttons for specific FAQs */}
                    {index === 1 && (
                      <div className="mt-4 pt-4 border-t">
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 text-sm font-medium"
                          style={{ color: "#008753" }}
                        >
                          <ExternalLink size={16} />
                          Verify official NRS contacts and portals
                        </a>
                      </div>
                    )}

                    {index === 4 && (
                      <div
                        className="mt-4 p-4 rounded-lg"
                        style={{ backgroundColor: "#f3f4f6" }}
                      >
                        <p
                          className="text-sm font-medium mb-1"
                          style={{ color: "#006641" }}
                        >
                          Tax-Free Threshold
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: "#008753" }}
                        >
                          ₦800,000/year
                        </p>
                      </div>
                    )}

                    {index === 5 && (
                      <div
                        className="mt-4 p-4 rounded-lg"
                        style={{ backgroundColor: "#f3f4f6" }}
                      >
                        <p
                          className="text-sm font-medium mb-1"
                          style={{ color: "#006641" }}
                        >
                          Small Business Exemption Limit
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ color: "#008753" }}
                        >
                          ₦100M turnover
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right column - Key highlights */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Key Features Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#006641" }}
                >
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {[
                    "Plain language explanations",
                    "No account required",
                    "Session-based only",
                    "PDF downloads available",
                    "Free to use",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#10B981" }}
                      ></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Disclaimer Card */}
              <div
                className="bg-white rounded-xl shadow-sm p-6 border-l-4"
                style={{ borderLeftColor: "#fefd4d" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: "rgba(254, 253, 77, 0.2)" }}
                  >
                    <span className="font-bold" style={{ color: "#006641" }}>
                      !
                    </span>
                  </div>
                  <h4 className="font-bold" style={{ color: "#006641" }}>
                    Important Disclaimer
                  </h4>
                </div>
                <p className="text-sm text-gray-600">
                  CheckTax is an independent tool and is not affiliated with or
                  endorsed by the Nigeria Revenue Service. Always verify with
                  official sources.
                </p>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "#006641" }}
                >
                  Quick Links
                </h3>
                <div className="space-y-3">
                  <a
                    href="/tax-calculator#"
                    className="block p-3 rounded-lg border hover:shadow-sm transition-shadow"
                    style={{ borderColor: "#f3f4f6" }}
                  >
                    <span className="font-medium" style={{ color: "#008753" }}>
                      Tax Band Calculator
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      Estimate your tax bracket
                    </p>
                  </a>
                  <HashLink smooth to="/home#"
                    className="block p-3 rounded-lg border hover:shadow-sm transition-shadow"
                    style={{ borderColor: "#f3f4f6" }}
                  >
                    <span className="font-medium" style={{ color: "#008753" }}>
                      Small Business Check
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      See if you qualify for exemptions
                    </p>
                  </HashLink>
                  
                </div>
              </div>

              {/* Support Section */}
              <div
                className="text-center p-6 rounded-xl"
                style={{ backgroundColor: "#008753" }}
              >
                <p className="text-white font-medium mb-3">Need more help?</p>
                <button disabled
                  className="px-6 py-2 bg-white rounded-lg font-medium"
                  style={{ color: "#008753" }}
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

  
      </div>
    </div>
  );
}

export default FAQs;
