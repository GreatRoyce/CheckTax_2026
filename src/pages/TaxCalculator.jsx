import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Footer from "../sections/Footer";
import CompBtn from "../components/CompBtn";
import { CgProfile } from "react-icons/cg";
import { FaNewspaper, FaBitcoinSign } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { GiFamilyHouse } from "react-icons/gi";

/* ---------------- TAX CONFIG ---------------- */

const taxTypes = [
  {
    id: 1,
    key: "personal_income",
    icon: <CgProfile />,
    title: "Personal Income Tax",
    subtitle:
      "Tax on individual earnings such as salaries, wages, professional fees, and self-employment income.",
    inputs: [
      { name: "annualIncome", label: "Annual Gross Income (₦)" },
      { name: "pension", label: "Pension Contribution (₦)", optional: true },
      { name: "nhf", label: "Housing Fund Contribution (₦)", optional: true },
    ],
  },
  {
    id: 2,
    key: "corporate",
    icon: <FaNewspaper />,
    title: "Corporate Tax",
    subtitle: "Tax on the profits earned by registered companies.",
    inputs: [{ name: "profit", label: "Annual Profit (₦)" }],
  },
  {
    id: 3,
    key: "vat",
    icon: <BsCart4 />,
    title: "Value Added Tax (VAT)",
    subtitle:
      "Consumption tax applied to goods and services at each stage of production and distribution.",
    inputs: [{ name: "sales", label: "Total Taxable Sales (₦)" }],
  },
  {
    id: 4,
    key: "capital_gains",
    icon: <VscGraph />,
    title: "Capital Gains Tax",
    subtitle:
      "Tax on profits from the sale of assets such as property or investments.",
    inputs: [{ name: "gain", label: "Capital Gain (₦)" }],
  },
  {
    id: 5,
    key: "digital_assets",
    icon: <FaBitcoinSign />,
    title: "Digital Asset / Crypto Tax",
    subtitle:
      "Tax on profits from digital asset or cryptocurrency transactions.",
    inputs: [{ name: "gain", label: "Digital Asset Gain (₦)" }],
  },
  {
    id: 6,
    key: "withholding",
    icon: <GiFamilyHouse />,
    title: "Withholding Tax",
    subtitle:
      "Tax deducted at source from certain payments as advance income tax.",
    inputs: [{ name: "payment", label: "Gross Payment Amount (₦)" }],
  },
];

/* ---------------- CALCULATION ENGINE ---------------- */

const calculateTax = (taxKey, data) => {
  switch (taxKey) {
    case "personal_income": {
      const income = data.annualIncome || 0;
      const pension = data.pension || 0;
      const nhf = data.nhf || 0;

      const relief = income * 0.2 + 200000;
      const taxableIncome = Math.max(income - relief - pension - nhf, 0);

      const tax = taxableIncome * 0.15; // flat reform-style rate
      return {
        taxableIncome,
        tax,
        explanation:
          "Personal income tax is calculated after applying statutory reliefs and approved deductions.",
      };
    }

    case "corporate": {
      const tax = (data.profit || 0) * 0.25;
      return {
        taxableIncome: data.profit,
        tax,
        explanation:
          "Corporate tax is applied to net annual profit at the reform rate.",
      };
    }

    case "vat": {
      const tax = (data.sales || 0) * 0.075;
      return {
        taxableIncome: data.sales,
        tax,
        explanation:
          "VAT is charged on taxable sales and is typically collected from consumers.",
      };
    }

    case "capital_gains":
    case "digital_assets": {
      const tax = (data.gain || 0) * 0.1;
      return {
        taxableIncome: data.gain,
        tax,
        explanation:
          "Capital gains tax applies to profits made from asset disposals.",
      };
    }

    case "withholding": {
      const tax = (data.payment || 0) * 0.05;
      return {
        taxableIncome: data.payment,
        tax,
        explanation:
          "Withholding tax is deducted at source and credited against final tax liability.",
      };
    }

    default:
      return null;
  }
};

/* ---------------- COMPONENT ---------------- */

function TaxCalculator() {
  const [selectedTax, setSelectedTax] = useState(null);
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: Number(value),
    }));
  };

  const handleCalculate = () => {
    const calc = calculateTax(selectedTax.key, formData);
    setResult(calc);
  };

  const generatePDF = () => {
    if (!result) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    let y = margin;

    // Header Section with Official Colors
    doc.setFillColor(0, 51, 102); // NRS blue
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("TAX ESTIMATE REPORT", pageWidth / 2, 25, {
      align: "center",
    });

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.text(
      "Generated via CheckTax -  Tax Compliant Calculator",
      pageWidth / 2,
      33,
      { align: "center" },
    );

    y = 50;
    doc.setTextColor(0, 0, 0);

    // Document Reference
    doc.setFontSize(8);
    doc.text(`Document Reference: CT-${Date.now()}`, margin, y);
    doc.text(
      `Generation Date: ${new Date().toLocaleDateString("en-NG")}`,
      pageWidth - margin,
      y,
      { align: "right" },
    );
    y += 10;

    // Tax Reform Context Header
    doc.setDrawColor(255, 193, 7); // Gold accent
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    doc.setFontSize(11);
    doc.setTextColor(0, 51, 102);
    doc.text(
      "NIGERIA REVENUE SERVICE - 2026 TAX REFORM FRAMEWORK",
      pageWidth / 2,
      y,
      { align: "center" },
    );
    y += 6;

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Based on Finance Act 2026 & NRS Circulars NT/2026/01-04",
      pageWidth / 2,
      y,
      { align: "center" },
    );
    y += 12;

    // Tax Category with Official Classification
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "bold");
    doc.text("TAX CATEGORY ASSESSMENT", margin, y);
    y += 8;

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text(`Category: ${selectedTax.title}`, margin + 5, y);
    y += 6;

    // Add official tax type code if available
    const taxCodes = {
      personal_income: "PIT-01",
      corporate: "CIT-01",
      vat: "VAT-07.5",
      capital_gains: "CGT-10",
      digital_assets: "DAT-10",
      withholding: "WHT-05",
    };

    doc.text(
      `NRS Tax Code: ${taxCodes[selectedTax.key] || "N/A"}`,
      margin + 5,
      y,
    );
    y += 6;

    // Add applicable legislation
    const legislation = {
      personal_income:
        "Personal Income Tax Act (PITA) Cap. P8 LFN 2004 (as amended 2026)",
      corporate:
        "Companies Income Tax Act (CITA) Cap. C21 LFN 2004 (as amended 2026)",
      vat: "Value Added Tax Act (VATA) Cap. V1 LFN 2004 (as amended 2026)",
      capital_gains: "Capital Gains Tax Act (CGTA) Cap. C1 LFN 2004",
      digital_assets: "Finance Act 2026, Section 45A - Digital Assets Taxation",
      withholding: "Withholding Tax Regulations 2026",
    };

    doc.text(
      `Governing Legislation: ${legislation[selectedTax.key]}`,
      margin + 5,
      y,
    );
    y += 10;

    // Input Information Section
    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 51, 102);
    doc.text("INPUT INFORMATION PROVIDED", margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    doc.setTextColor(0, 0, 0);

    // Format input labels properly
    const inputLabels = {
      annualIncome: "Annual Gross Income",
      pension: "Pension Contribution (RSA)",
      nhf: "National Housing Fund (NHF)",
      profit: "Annual Profit Before Tax",
      sales: "Total Taxable Sales (VATable)",
      gain: "Capital Gain Realized",
      payment: "Gross Payment Amount",
      vatCredit: "Input VAT Credit",
      lossRelief: "Loss Relief Carried Forward",
      exemptAmount: "Annual Exempt Amount",
    };

    Object.entries(formData).forEach(([key, value]) => {
      const label =
        inputLabels[key] || key.replace(/([A-Z])/g, " $1").toUpperCase();
      doc.text(`• ${label}:`, margin + 5, y);
      doc.text(
        `₦${Number(value).toLocaleString()}`,
        pageWidth - margin - 50,
        y,
      );
      y += 6;
    });
    y += 8;

    // Calculation Results Section with Box
    doc.setDrawColor(0, 51, 102);
    doc.setFillColor(240, 245, 250);
    // doc.roundedRect(margin, y, pageWidth - 1 * margin, 30, 3, 3, "F");

    doc.setFontSize(12);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 51, 102);
    doc.text("TAX LIABILITY ESTIMATE", margin + 5, y + 8);

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.text("Taxable Base Amount:", margin + 10, y + 18);

    doc.text(
      `₦${Number(result.tax).toLocaleString()}`,
      pageWidth - margin - 10,
      y + 10,
      { align: "right" },
    );

    // Add applicable rate
    const taxRates = {
      personal_income: "15%",
      corporate: "25%",
      vat: "7.5%",
      capital_gains: "10%",
      digital_assets: "10%",
      withholding: "5%",
    };

    doc.text(
      `Applicable Tax Rate (${taxRates[selectedTax.key]}):`,
      margin + 10,
      y + 25,
    );
    doc.text(taxRates[selectedTax.key], pageWidth - margin - 10, y + 25, {
      align: "right",
    });

    y += 35;

    // Total Tax Liability with highlight
    doc.setFillColor(0, 51, 102);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 15, 3, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont(undefined, "bold");
    doc.text("ESTIMATED TAX LIABILITY:", margin + 10, y + 10);
    doc.text(
      `₦${Number(result.tax).toLocaleString()}`,
      pageWidth - margin - 10,
      y + 10,
      { align: "right" },
    );

    y += 25;

    // Calculation Methodology
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, "bold");
    doc.text("CALCULATION METHODOLOGY", margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, "normal");
    const methodologyText = doc.splitTextToSize(
      result.explanation,
      pageWidth - 2 * margin,
    );
    methodologyText.forEach((line) => {
      doc.text(line, margin, y);
      y += 6;
    });
    y += 8;

    // 2026 Reform Specific Provisions
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.setTextColor(0, 51, 102);
    doc.text("2026 TAX REFORM PROVISIONS APPLIED", margin, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont(undefined, "normal");
    doc.setTextColor(60, 60, 60);

    const reformProvisions = {
      personal_income: [
        "✓ Consolidated Relief Allowance: 20% of gross income + ₦200,000",
        "✓ Pension contributions deductible up to 20% of gross income",
        "✓ NHF contributions fully deductible",
        "✓ Minimum tax provisions may apply if taxable income is nil",
      ],
      corporate: [
        "✓ Small companies (<₦25M turnover): 0% first ₦100M profit",
        "✓ Medium companies: 20% tax rate",
        "✓ Large companies: 25% tax rate",
        "✓ Losses can be carried forward for 4 years",
      ],
      vat: [
        "✓ VAT rate: 7.5% on taxable goods and services",
        "✓ Registration threshold: ₦25M annual turnover",
        "✓ Input VAT fully creditable against output VAT",
        "✓ Exports and basic food items: 0% VAT",
      ],
      capital_gains: [
        "✓ 10% rate on chargeable assets",
        "✓ Annual exemption: ₦500,000 for individuals",
        "✓ Principal private residence: Fully exempt",
        "✓ 25% discount for assets held >5 years",
      ],
      digital_assets: [
        "✓ Digital assets defined to include cryptocurrencies, NFTs, tokens",
        "✓ 10% on net gains from disposal",
        "✓ Trading fees and transaction costs deductible",
        "✓ Annual exemption: ₦300,000 for individuals",
      ],
      withholding: [
        "✓ Rates vary by transaction type (5-10%)",
        "✓ Contract payments: 5%",
        "✓ Dividends: 10%",
        "✓ Interest, royalties, directors' fees: 10%",
        "✓ Credit available against final tax liability",
      ],
    };

    const provisions = reformProvisions[selectedTax.key] || [];
    provisions.forEach((provision) => {
      doc.text(provision, margin + 5, y);
      y += 5;
    });
    y += 10;

    // Important Deadlines & Compliance
    doc.setFontSize(11);
    doc.setFont(undefined, "bold");
    doc.text("COMPLIANCE INFORMATION", margin, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont(undefined, "normal");

    const deadlines = {
      personal_income: [
        "• Filing Deadline: 31st March following year end",
        "• Payment Deadline: 31st March following year end",
        "• Required Documents: Annual tax return with supporting schedules",
      ],
      corporate: [
        "• Filing Deadline: 6 months after year end",
        "• Payment Deadline: Monthly installments (PAYE)",
        "• Required: Audited financial statements, tax computations",
      ],
      vat: [
        "• Filing Deadline: 21st of following month",
        "• Payment Deadline: 21st of following month",
        "• Required: VAT returns with sales and purchase records",
      ],
      capital_gains: [
        "• Filing Deadline: 30 days after disposal",
        "• Payment Deadline: 30 days after disposal",
        "• Required: Asset disposal form (NRS Form CGT1)",
      ],
      digital_assets: [
        "• Filing Deadline: 30 days after each transaction",
        "• Payment Deadline: 30 days after transaction",
        "• Required: Digital asset transaction log (NRS Form DAT1)",
      ],
      withholding: [
        "• Filing Deadline: 21st of following month",
        "• Payment Deadline: 21st of following month",
        "• Required: Monthly remittance schedule (NRS Form WHT6)",
      ],
    };

    const taxDeadlines = deadlines[selectedTax.key] || [];
    taxDeadlines.forEach((deadline) => {
      doc.text(deadline, margin + 5, y);
      y += 5;
    });
    y += 10;

    // Official Disclaimer
    doc.setDrawColor(255, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    doc.setFontSize(8);
    doc.setTextColor(255, 0, 0);
    doc.setFont(undefined, "bold");
    doc.text("IMPORTANT DISCLAIMER & LEGAL NOTICE", pageWidth / 2, y, {
      align: "center",
    });
    y += 5;

    doc.setFontSize(7);
    doc.setFont(undefined, "normal");
    doc.setTextColor(100, 0, 0);

    const disclaimerText = [
      "This document is an estimate generated by CheckTax for informational purposes only. It does not constitute an official tax assessment, ruling, or advice from the Nigeria Revenue Service (NRS).",
      "Tax liabilities are subject to verification by NRS officials based on complete documentation and applicable laws. Rates and provisions are based on the Finance Act 2026 and NRS circulars as at date of generation.",
      "Penalties for late filing: 10% of tax due + 10% interest per annum. Penalties for incorrect filing: 5-100% of tax underpaid.",
      "For official tax assessments, filings, and payments, visit the NRS portal at www.nrs.gov.ng or contact your regional tax office.",
      "This estimate is valid for 30 days from generation date. Tax laws and rates are subject to change by the National Assembly.",
    ];

    disclaimerText.forEach((paragraph) => {
      const lines = doc.splitTextToSize(paragraph, pageWidth - 2 * margin);
      lines.forEach((line) => {
        doc.text(line, margin, y);
        y += 4;
      });
      y += 2;
    });

    // Footer with NRS Reference
    doc.setFontSize(6);
    doc.setTextColor(100, 100, 100);
    doc.text(
      "CheckTax v2.1 • NRS Compliant Calculator • Generated: " +
        new Date().toLocaleString(),
      pageWidth / 2,
      285,
      { align: "center" },
    );
    doc.text(
      "© 2026 CheckTax. All rights reserved. This tool follows NRS Circular NT/2026/CALC/01",
      pageWidth / 2,
      288,
      { align: "center" },
    );
    doc.text(
      "Page 1 of 1 • Document ID: CT-" + Date.now(),
      pageWidth / 2,
      291,
      { align: "center" },
    );

    // Add page border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, 275);

    doc.save(
      `NRS-Tax-Estimate-${selectedTax.key.toUpperCase()}-${Date.now()}.pdf`,
    );
  };

  const resetView = () => {
    setSelectedTax(null);
    setFormData({});
    setResult(null);
  };

  return (
    <div>
      <div className="bg-secondary py-28">
        <header className="mx-auto text-center space-y-2 pt-2">
          <h2 className="text-black/85">Tax Calculator</h2>
          <h6>Calculate your estimated tax liability</h6>
        </header>

        <main className="h-[70vh] py-2 px-28 mt-6 mx-auto">
          <h5 className="font-bold text-black/85">Select Tax Type</h5>

          <div className="grid grid-cols-[3fr_1.2fr] gap-10">
            <section className="pt-6">
              {!selectedTax ? (
                <div className="grid grid-cols-3 gap-6">
                  {taxTypes.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedTax(item);
                        setFormData({});
                        setResult(null);
                      }}
                      className="shade border-2 text-center border-primary rounded-lg p-4 hover:shadow-xl cursor-pointer"
                    >
                      <div className="flex text-primary text-5xl justify-center">
                        {item.icon}
                      </div>
                      <h4 className="font-bold p-2">{item.title}</h4>
                      <h4 className="font-normal">{item.subtitle}</h4>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-6">
                  <h3 className="font-bold mb-4">{selectedTax.title}</h3>

                  {selectedTax.inputs.map((input) => (
                    <div key={input.name} className="mb-4">
                      <label className="block text-sm mb-1">
                        {input.label}
                      </label>
                      <input
                        type="number"
                        className="w-3/4 border rounded-xl px-3 py-2"
                        value={formData[input.name] || ""}
                        onChange={(e) =>
                          handleInputChange(input.name, e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <div className="flex gap-4 items-center">
                    <button
                      onClick={handleCalculate}
                      className="bg-primary text-white px-4 py-2 rounded"
                    >
                      Calculate
                    </button>

                    {result && (
                      <div className="text-sm">
                        <strong>Estimated Tax:</strong> ₦
                        {result.tax.toLocaleString()}
                      </div>
                    )}

                    <button
                      onClick={resetView}
                      className="text-sm text-primary underline"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}
            </section>
            {/* RIGHT SIDE – TIPS */}
            <div className="grid grid-rows-[4fr_1fr]">
              <section className="border border-gray-900 h-fit rounded-lg py-8 px-4">
                <div className="text-left">
                  <div className="flex items-center space-x-2 pb-6">
                    <span className="text-2xl">💡</span>
                    <h5>Tips</h5>
                  </div>

                  <p className="mb-2">
                    • Enter annual figures, not monthly amounts
                  </p>
                  <hr className="border-t border-gray-300 my-2" />

                  <p className="mb-2">
                    • Pension and housing contributions may reduce taxable
                    income
                  </p>
                  <hr className="border-t border-gray-300 my-2" />

                  <p className="mb-2">
                    • Capital gains apply only to profits, not total sale value
                  </p>
                  <hr className="border-t border-gray-300 my-2" />

                  <p className="mb-2">
                    • VAT is typically collected from customers, not absorbed by
                    sellers
                  </p>
                  <hr className="border-t border-gray-300 my-2" />

                  <p className="mb-2">
                    • Always refer to the Nigeria Revenue Service for official
                    filing
                  </p>
                </div>
              </section>

              <div className="flex justify-center items-center">
                {selectedTax && result && (
                  <CompBtn
                    onClick={generatePDF}
                    className="px-4 py-2 font-semibold"
                    variant="primary"
                  >
                    Download PDF Summary
                  </CompBtn>
                )}
              </div>
            </div>

            {/* <div className="flex items-end justify-center">
              {selectedTax && result && (
                <CompBtn
                  onClick={generatePDF}
                  className="px-4 py-2 font-semibold"
                  variant="primary"
                >
                  Download PDF Summary
                </CompBtn>
              )}
            </div> */}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default TaxCalculator;
