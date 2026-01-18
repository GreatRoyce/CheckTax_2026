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

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (text) => {
    const message = text.toLowerCase();

    if (
      message.includes("800") ||
      message.includes("tax free") ||
      message.includes("no tax")
    ) {
      return SYSTEM_RESPONSES.taxFree;
    }

    if (
      message.includes("small business") ||
      message.includes("100") ||
      message.includes("turnover")
    ) {
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

    if (
      message.includes("company tax") ||
      message.includes("corporate") ||
      message.includes("large company")
    ) {
      return SYSTEM_RESPONSES.corporateTax;
    }

    if (
      message.includes("why") ||
      message.includes("purpose") ||
      message.includes("reform about")
    ) {
      return SYSTEM_RESPONSES.purpose;
    }

    return SYSTEM_RESPONSES.fallback;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const botMessage = {
      role: "bot",
      text: getResponse(input),
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="absolute top-0 bottom-4 right-4 md:bottom-28 md:right-10 w-[calc(100%-2rem)] md:w-96 h-[600px] md:h-[550px] bg-white border border-gray-200 shadow-xl rounded-2xl md:rounded-xl flex flex-col z-50 overflow-hidden">
      {/* Header - WhatsApp-like */}
      <div className="flex items-center justify-between p-4 bg-[#008069] text-white">
        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center bg-red-900 bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url(${aibot})` }}
          ></div>

          <div>
            <span className="font-semibold text-base">CheckTax Assistant</span>
            <p className="text-xs opacity-80">Online • Tax Reform Expert</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="hover:opacity-80 transition-opacity"></button>
          <button
            onClick={onClose}
            className="hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Chat Background */}
      <div className="flex-1 bg-[#efeae2] bg-opacity-60 overflow-hidden relative">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        {/* Messages Container */}
        <div className="h-full overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-[#d9fdd3] rounded-tr-none shadow-sm"
                    : "bg-white rounded-tl-none shadow-sm"
                }`}
                style={{
                  boxShadow:
                    msg.role === "user"
                      ? "0 1px 0.5px rgba(0,0,0,0.13)"
                      : "0 1px 0.5px rgba(0,0,0,0.07)",
                }}
              >
                <div className="text-sm text-gray-800 leading-relaxed">
                  {msg.text}
                </div>
                <div
                  className={`text-xs mt-1.5 ${
                    msg.role === "user"
                      ? "text-right text-gray-500"
                      : "text-gray-400"
                  }`}
                >
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
      </div>

      {/* Input Area - WhatsApp-like */}
      <div className="p-3 bg-gray-100 border-t border-gray-300">
        <div className="flex items-center space-x-2">
          <button className="p-2.5 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-200 transition-colors"></button>
          <div className="flex-1 bg-white rounded-full border border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="w-full px-4 py-2.5 bg-transparent border-0 focus:outline-none text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
          <button
            onClick={handleSend}
            className={`p-2.5 rounded-full transition-all ${
              input.trim()
                ? "bg-[#008069] text-white hover:bg-[#007a63]"
                : "bg-gray-300 text-gray-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <p className="text-xs text-center text-gray-500 mt-2 px-2">
          Ask about tax reforms, exemptions, rates, or other tax-related queries
        </p>
      </div>
    </div>
  );
}

export default Chatbot;
