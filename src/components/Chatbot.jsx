import React, { useState, useRef, useEffect } from "react";
import aibot from "../assets/aibot.png";

const SYSTEM_RESPONSES = {
  greeting:
    "Hello. I can help explain Nigeria’s 2026 tax reforms in plain language. What would you like to know?",

  fallback:
    "This specific issue is handled directly by the Nigeria Revenue Service. For the most accurate and up-to-date guidance, please visit the official NRS website.",

  taxFree:
    "Under the 2026 tax reforms, income up to ₦800,000 per year is tax-free. If your total income is below this threshold, personal income tax does not apply.",

  smallBusiness:
    "Businesses with annual turnover below ₦100 million are exempt from Corporate Income Tax, VAT, and the development levy under the 2026 tax reforms.",

  rentRelief:
    "Rent relief under the 2026 reforms is set at 20%, capped at ₦500,000 per year. It applies only where eligibility conditions are met and properly documented.",

  digitalAssets:
    "Gains from digital assets, including crypto, may be taxable under the 2026 reforms when profit is made. Simply holding an asset does not automatically create a tax obligation.",

  corporateTax:
    "Large companies are subject to Corporate Income Tax under the 2026 reforms. A minimum effective tax rate of 15% applies, along with anti-profit shifting rules.",

  purpose:
    "The 2026 tax reforms aim to simplify Nigeria’s tax system, remove duplicate taxes, improve fairness, and expand the tax base through clearer and more digital processes.",
};

function Chatbot({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "bot", text: SYSTEM_RESPONSES.greeting },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getResponse = (text) => {
    const message = text.toLowerCase();

    if (message.includes("800") || message.includes("tax free")) {
      return SYSTEM_RESPONSES.taxFree;
    }

    if (message.includes("small business") || message.includes("turnover")) {
      return SYSTEM_RESPONSES.smallBusiness;
    }

    if (message.includes("rent")) {
      return SYSTEM_RESPONSES.rentRelief;
    }

    if (
      message.includes("crypto") ||
      message.includes("digital asset") ||
      message.includes("bitcoin")
    ) {
      return SYSTEM_RESPONSES.digitalAssets;
    }

    if (message.includes("corporate") || message.includes("company")) {
      return SYSTEM_RESPONSES.corporateTax;
    }

    if (message.includes("purpose") || message.includes("why")) {
      return SYSTEM_RESPONSES.purpose;
    }

    return SYSTEM_RESPONSES.fallback;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "bot", text: getResponse(input) },
    ]);

    setInput("");
  };

  return (
    <div
      className="
        fixed inset-0 
        md:inset-auto md:bottom-28 md:right-10 
        w-full md:w-96 
        h-full md:h-[550px]
        bg-white border border-gray-200 shadow-xl 
        rounded-none md:rounded-xl 
        flex flex-col z-50 overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#008069] text-white sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 rounded-full bg-white/20 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${aibot})` }}
          />
          <div>
            <p className="font-semibold text-sm">CheckTax Assistant</p>
            <p className="text-xs opacity-80">Online • Tax Reform Guide</p>
          </div>
        </div>

        <button onClick={onClose} className="hover:opacity-80">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-[#efeae2] overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[90%] sm:max-w-[85%] md:max-w-[75%] px-4 py-3 rounded-2xl text-sm ${
                msg.role === "user"
                  ? "bg-[#d9fdd3] rounded-tr-none"
                  : "bg-white rounded-tl-none"
              }`}
            >
              {msg.text}
              <div className="text-[10px] text-gray-400 mt-1 text-right">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="sticky bottom-0 p-3 bg-gray-100 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask about the tax reforms..."
            className="flex-1 px-4 py-2 text-sm rounded-full border focus:outline-none"
          />
          <button
            onClick={handleSend}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              input.trim()
                ? "bg-[#008069] text-white"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            Send
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-2">
          Answers are based on published 2026 tax reform guidance
        </p>
      </div>
    </div>
  );
}

export default Chatbot;
