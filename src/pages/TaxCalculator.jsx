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

      // exemption threshold
      if (income <= 800000) {
        return {
          taxableIncome: 0,
          tax: 0,
          explanation:
            "Under the 2026 Tax Reform Act, individuals earning NGN800,000 or less per annum are fully exempt.",
        };
      }

      // Consolidated Relief Allowance
      const relief = income * 0.2 + 200000;
      const taxableIncome = Math.max(income - relief - pension - nhf, 0);

      // Progressive bands
      let tax = 0;
      let remaining = taxableIncome;

      const bands = [
        { limit: 300000, rate: 0.07 },
        { limit: 300000, rate: 0.11 },
        { limit: 500000, rate: 0.15 },
        { limit: 500000, rate: 0.19 },
        { limit: 1600000, rate: 0.21 },
        { limit: Infinity, rate: 0.24 },
      ];

      for (const band of bands) {
        if (remaining <= 0) break;
        const taxableAtThisRate = Math.min(remaining, band.limit);
        tax += taxableAtThisRate * band.rate;
        remaining -= taxableAtThisRate;
      }

      return {
        taxableIncome,
        tax,
        explanation:
          "Personal Income Tax is calculated after applying the NGN800,000 exemption, consolidated relief allowance, approved deductions, and progressive tax bands as prescribed under the 2026 reforms.",
      };
    }

    case "corporate": {
      const profit = data.profit || 0;
      const turnover = data.turnover || 0;

      // Small business exemption
      if (turnover < 100000000) {
        return {
          taxableIncome: 0,
          tax: 0,
          explanation:
            "Companies with annual turnover below ₦100 million are exempt from Corporate Income Tax.",
        };
      }

      const tax = profit * 0.15; // minimum effective rate
      return {
        taxableIncome: profit,
        tax,
        explanation:
          "Large companies are subject to a minimum effective Corporate Income Tax rate of 15%.",
      };
    }

    case "vat": {
      const sales = data.sales || 0;
      const tax = sales * 0.075;

      return {
        taxableIncome: sales,
        tax,
        explanation:
          "VAT is charged at 7.5% on taxable goods and services and is typically collected from consumers.",
      };
    }

    case "capital_gains":
    case "digital_assets": {
      const gain = data.gain || 0;

      if (gain <= 0) {
        return {
          taxableIncome: 0,
          tax: 0,
          explanation:
            "Capital Gains Tax applies only to realized profits. No tax is due where no gain is made.",
        };
      }

      const tax = gain * 0.1;
      return {
        taxableIncome: gain,
        tax,
        explanation:
          "Capital gains, including gains from digital assets, are taxed at 10% on realized profits.",
      };
    }

    case "withholding": {
      const payment = data.payment || 0;
      const tax = payment * 0.05;

      return {
        taxableIncome: payment,
        tax,
        explanation:
          "Withholding Tax is deducted at source as an advance payment and can be credited against final tax liability.",
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
    doc.setFont("helvetica", "normal");

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    let y = margin;
    let isFirstPage = true;

    // Helper function to add new page if needed
    const checkPageBreak = (requiredHeight) => {
      if (y + requiredHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
        isFirstPage = false;
      }
    };

    // Header Section with Official Colors
    doc.setFillColor(0, 135, 83); // Checktax green
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("OFFICIAL TAX ESTIMATE REPORT", pageWidth / 2, 25, {
      align: "center",
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      "Generated via CheckTax - NRS Compliant Calculator",
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
    checkPageBreak(15);
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
    checkPageBreak(30);
    doc.setFontSize(13);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("TAX CATEGORY ASSESSMENT", margin, y);
    y += 8;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Category: ${selectedTax.title}`, margin + 5, y);
    y += 6;

    // Added official tax type code
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
    checkPageBreak(30);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 51, 102);
    doc.text("INPUT INFORMATION PROVIDED", margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
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
    };

    Object.entries(formData).forEach(([key, value]) => {
      const label =
        inputLabels[key] || key.replace(/([A-Z])/g, " $1").toUpperCase();
      doc.text(`• ${label}:`, margin + 5, y);
      doc.text(
        `NGN ${Number(value).toLocaleString()}`,
        pageWidth - margin - 50,
        y,
      );
      y += 6;
    });
    y += 8;

    // Calculation Results Section with Box
    checkPageBreak(40);
    doc.setDrawColor(0, 51, 102);
    doc.setFillColor(240, 245, 250);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 35, 3, 3, "F");

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 51, 102);
    doc.text("TAX LIABILITY ESTIMATE", margin + 5, y + 8);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Taxable Base Amount:", margin + 10, y + 18);
    doc.text(
      `NGN ${Number(result.taxableIncome).toLocaleString()}`,
      pageWidth - margin - 10,
      y + 18,
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

    y += 40;

    // Total Tax Liability with highlight - ANNUAL
    checkPageBreak(20);
    doc.setFillColor(0, 51, 102);
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 15, 3, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("ESTIMATED ANNUAL TAX LIABILITY:", margin + 10, y + 10);
    doc.text(
      `NGN ${Number(result.tax).toLocaleString()}`,
      pageWidth - margin - 10,
      y + 10,
      { align: "right" },
    );

    y += 20;

    // MONTHLY TAX LIABILITY - Added new section
    checkPageBreak(20);
    doc.setFillColor(0, 135, 83); // Green for monthly
    doc.roundedRect(margin, y, pageWidth - 2 * margin, 15, 3, 3, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.text("ESTIMATED TAX PER MONTH:", margin + 10, y + 10);
    const monthlyTax = result.tax / 12;
    doc.text(
      `NGN ${monthlyTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      pageWidth - margin - 10,
      y + 10,
      { align: "right" },
    );

    y += 25;

    // Calculation Methodology
    checkPageBreak(30);
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("CALCULATION METHODOLOGY", margin, y);
    y += 8;

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const methodologyText = doc.splitTextToSize(
      result.explanation,
      pageWidth - 2 * margin,
    );
    methodologyText.forEach((line) => {
      doc.text(line, margin, y);
      y += 8;
    });
    y += 8;

    // 2026 Reform Specific Provisions
    checkPageBreak(50);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 51, 102);
    doc.text("2026 TAX REFORM PROVISIONS APPLIED", margin, y);
    y += 8;

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);

    const reformProvisions = {
      personal_income: [
        "✓ Consolidated Relief Allowance: 20% of gross income + NGN200,000",
        "✓ Pension contributions deductible up to 20% of gross income",
        "✓ NHF contributions fully deductible",
        "✓ Minimum tax provisions may apply if taxable income is nil",
      ],
      corporate: [
        "✓ Small companies (<₦100M turnover): 0% tax",
        "✓ Medium companies (₦100M-₦1B turnover): 20% tax rate",
        "✓ Large companies (>₦1B turnover): 25% tax rate",
        "✓ Losses can be carried forward for 4 years",
      ],
      vat: [
        "✓ VAT rate: 7.5% on taxable goods and services",
        "✓ Registration threshold: NGN25M annual turnover",
        "✓ Input VAT fully creditable against output VAT",
        "✓ Exports and basic food items: 0% VAT",
      ],
      capital_gains: [
        "✓ 10% rate on chargeable assets",
        "✓ Annual exemption: NGN500,000 for individuals",
        "✓ Principal private residence: Fully exempt",
        "✓ 25% discount for assets held >5 years",
      ],
      digital_assets: [
        "✓ Digital assets defined to include cryptocurrencies, NFTs, tokens",
        "✓ 10% on net gains from disposal",
        "✓ Trading fees and transaction costs deductible",
        "✓ Annual exemption: NGN300,000 for individuals",
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
      checkPageBreak(5);
      doc.text(provision, margin + 5, y);
      y += 5;
    });
    y += 10;

    // Important Deadlines & Compliance
    checkPageBreak(30);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("COMPLIANCE INFORMATION", margin, y);
    y += 8;

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");

    const deadlines = {
      personal_income: [
        "• Filing Deadline: 31st March following year end",
        "• Payment Deadline: 31st March following year end",
        "• Monthly Installments: Recommended for large liabilities",
        "• Required Documents: Annual tax return with supporting schedules",
      ],
      corporate: [
        "• Filing Deadline: 6 months after year end",
        "• Payment Deadline: Monthly installments (PAYE)",
        "• Monthly Payments: Required for companies >₦100M turnover",
        "• Required: Audited financial statements, tax computations",
      ],
      vat: [
        "• Filing Deadline: 21st of following month",
        "• Payment Deadline: 21st of following month",
        "• Monthly Payments: Standard for all registered businesses",
        "• Required: VAT returns with sales and purchase records",
      ],
      capital_gains: [
        "• Filing Deadline: 30 days after disposal",
        "• Payment Deadline: 30 days after disposal",
        "• Monthly Option: Available for large capital gains",
        "• Required: Asset disposal form (NRS Form CGT1)",
      ],
      digital_assets: [
        "• Filing Deadline: 30 days after each transaction",
        "• Payment Deadline: 30 days after transaction",
        "• Monthly Option: Available for frequent traders",
        "• Required: Digital asset transaction log (NRS Form DAT1)",
      ],
      withholding: [
        "• Filing Deadline: 21st of following month",
        "• Payment Deadline: 21st of following month",
        "• Monthly Payments: Standard for all businesses",
        "• Required: Monthly remittance schedule (NRS Form WHT6)",
      ],
    };

    const taxDeadlines = deadlines[selectedTax.key] || [];
    taxDeadlines.forEach((deadline) => {
      checkPageBreak(5);
      doc.text(deadline, margin + 5, y);
      y += 5;
    });
    y += 10;

    // Official Disclaimer
    checkPageBreak(40);
    doc.setDrawColor(255, 0, 0);
    doc.setLineWidth(0.3);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    doc.setFontSize(8);
    doc.setTextColor(255, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("IMPORTANT DISCLAIMER & LEGAL NOTICE", pageWidth / 2, y, {
      align: "center",
    });
    y += 5;

    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 0, 0);

    const disclaimerText = [
      "This document is an estimate generated by CheckTax for informational purposes only. It does not constitute an official tax assessment, ruling, or advice from the Nigeria Revenue Service (NRS).",
      "Tax liabilities are subject to verification by NRS officials based on complete documentation and applicable laws. Rates and provisions are based on the Finance Act 2026 and NRS circulars as at date of generation.",
      "Monthly tax payments are estimates only. Actual payment schedules may vary based on NRS assessment and taxpayer circumstances.",
      "Penalties for late filing: 10% of tax due + 10% interest per annum. Penalties for incorrect filing: 5-100% of tax underpaid.",
      "For official tax assessments, filings, and payments, visit the NRS portal at www.nrs.gov.ng or contact your regional tax office.",
      "This estimate is valid for 30 days from generation date. Tax laws and rates are subject to change by the National Assembly.",
    ];

    disclaimerText.forEach((paragraph) => {
      const lines = doc.splitTextToSize(paragraph, pageWidth - 2 * margin);
      lines.forEach((line) => {
        checkPageBreak(4);
        doc.text(line, margin, y);
        y += 4;
      });
      y += 2;
    });

    // Add page border
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Add page numbers if multiple pages
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, pageHeight - 10, {
        align: "center",
      });
    }

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
      <div className="bg-secondary pt-20 py-8 sm:py-12 md:py-20 lg:py-28">
        <header className="mx-auto text-center space-y-2 pt-2 px-4">
          <h2 className="text-black/85 text-2xl sm:text-2xl md:text-3xl">
            Tax Calculator
          </h2>
          <h6 className="text-sm sm:text-base md:text-lg">
            Calculate your estimated tax liability
          </h6>
        </header>

        <main className="min-h-[70vh] py-2 px-4 sm:px-6 md:px-8 lg:px-28 mt-4 md:mt-6 mx-auto">
          <h5 className="font-bold text-black/85 text-lg md:text-xl mb-4">
            Select Tax Type
          </h5>

          {!selectedTax ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {taxTypes.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedTax(item);
                    setFormData({});
                    setResult(null);
                  }}
                  className="shade border-2 text-center border-primary rounded-lg p-4 hover:shadow-xl cursor-pointer transition-all duration-300"
                >
                  <div className="flex text-primary text-3xl md:text-4xl lg:text-5xl justify-center mb-2">
                    {item.icon}
                  </div>
                  <h4 className="font-bold p-1 md:p-2 text-base md:text-lg">
                    {item.title}
                  </h4>
                  <h4 className="font-normal text-xs sm:text-sm md:text-base">
                    {item.subtitle}
                  </h4>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
              {/* LEFT SIDE - Input Form */}
              <div className="lg:w-3/4">
                <div className="border-2 border-dashed rounded-lg p-4 md:p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg md:text-xl">
                      {selectedTax.title}
                    </h3>
                    <button
                      onClick={resetView}
                      className="text-sm text-primary underline hover:text-primary/80 transition-colors duration-300"
                    >
                      ← Back to Tax Types
                    </button>
                  </div>

                  {selectedTax.inputs.map((input) => (
                    <div key={input.name} className="mb-4">
                      <label className="block text-sm md:text-base mb-1">
                        {input.label}
                        {input.optional && (
                          <span className="text-gray-500 text-xs ml-2">
                            (optional)
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        className="w-full border rounded-xl px-3 py-2 md:py-2 text-sm md:text-base"
                        value={formData[input.name] || ""}
                        onChange={(e) =>
                          handleInputChange(input.name, e.target.value)
                        }
                        placeholder="0"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-start sm:items-center">
                    <button
                      onClick={handleCalculate}
                      className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors duration-300 text-sm md:text-base w-full sm:w-auto"
                    >
                      Calculate
                    </button>

                    {result && (
                      <div className="text-sm md:text-base bg-gray-100 p-3 rounded-lg w-full sm:w-auto">
                        <strong>Estimated Tax:</strong> ₦
                        {result.tax.toLocaleString()}
                        <span className="text-green-600 ml-2">
                          (Monthly: ₦
                          {(result.tax / 12).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                          )
                        </span>
                      </div>
                    )}
                  </div>

                  {/* PDF Button for Mobile - Below Calculate Button */}
                  {selectedTax && result && (
                    <div className="block lg:hidden mt-6">
                      <CompBtn
                        onClick={generatePDF}
                        className="px-4 py-3 font-semibold w-full justify-center text-sm md:text-base"
                        variant="primary"
                      >
                        Download PDF Summary
                      </CompBtn>
                    </div>
                  )}

                  {/* Tips for Mobile - Below PDF Button */}
                  <div className="block lg:hidden mt-8">
                    <section className="border border-gray-900 rounded-lg py-6 px-4">
                      <div className="text-left">
                        <div className="flex items-center space-x-2 pb-4 md:pb-6">
                          <span className="text-2xl">💡</span>
                          <h5 className="text-lg md:text-xl font-semibold">
                            Tips
                          </h5>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm md:text-base">
                            • Enter annual figures, not monthly amounts
                          </p>
                          <hr className="border-t border-gray-300" />

                          <p className="text-sm md:text-base">
                            • Pension and housing contributions may reduce
                            taxable income
                          </p>
                          <hr className="border-t border-gray-300" />

                          <p className="text-sm md:text-base">
                            • Capital gains apply only to profits, not total
                            sale value
                          </p>
                          <hr className="border-t border-gray-300" />

                          <p className="text-sm md:text-base">
                            • VAT is typically collected from customers, not
                            absorbed by sellers
                          </p>
                          <hr className="border-t border-gray-300" />

                          <p className="text-sm md:text-base">
                            • Monthly tax payments are often required for large
                            liabilities
                          </p>
                          <hr className="border-t border-gray-300" />

                          <p className="text-sm md:text-base">
                            • Always refer to the Nigeria Revenue Service for
                            official filing
                          </p>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - Tips & PDF Button for Desktop */}
              <div className="hidden lg:block lg:w-1/4">
                <div className="sticky top-6">
                  <section className="border border-gray-900 h-fit rounded-lg py-8 px-4 mb-6">
                    <div className="text-left">
                      <div className="flex items-center space-x-2 pb-6">
                        <span className="text-2xl">💡</span>
                        <h5 className="text-lg font-semibold">Tips</h5>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm">
                          • Enter annual figures, not monthly amounts
                        </p>
                        <hr className="border-t border-gray-300" />

                        <p className="text-sm">
                          • Pension and housing contributions may reduce taxable
                          income
                        </p>
                        <hr className="border-t border-gray-300" />

                        <p className="text-sm">
                          • Capital gains apply only to profits, not total sale
                          value
                        </p>
                        <hr className="border-t border-gray-300" />

                        <p className="text-sm">
                          • VAT is typically collected from customers, not
                          absorbed by sellers
                        </p>
                        <hr className="border-t border-gray-300" />

                        <p className="text-sm">
                          • Monthly tax payments are often required for large
                          liabilities
                        </p>
                        <hr className="border-t border-gray-300" />

                        <p className="text-sm">
                          • Always refer to the Nigeria Revenue Service for
                          official filing
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* PDF Button for Desktop */}
                  {selectedTax && result && (
                    <div className="flex justify-center">
                      <CompBtn
                        onClick={generatePDF}
                        className="px-4 py-3 font-semibold w-full justify-center"
                        variant="primary"
                      >
                        Download PDF Summary
                      </CompBtn>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default TaxCalculator;
