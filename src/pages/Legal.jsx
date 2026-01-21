import React from "react";
import { MdPrivacyTip } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import { GrCompliance } from "react-icons/gr";
import { FcDisclaimer } from "react-icons/fc";

function Legal() {
  return (
    <div className="bg-secondary min-h-screen pt-20 py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 lg:space-y-20">
        {/* PAGE HEADER */}
        <header className="text-center space-y-4 sm:space-y-6">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black/85">
              Legal Information
            </h1>
            <p className="text-sm sm:text-base md:text-md text-black/60 max-w-3xl mx-auto px-4">
              Please review the sections below for details on how CheckTax
              operates, protects users, and complies with applicable
              regulations.
            </p>
          </div>

          {/* Quick Navigation - Mobile Only */}
          <div className="block lg:hidden">
            <div className="flex flex-wrap justify-center gap-2">
              <a
                href="#privacy"
                className="px-3 py-2 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="px-3 py-2 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors"
              >
                Terms
              </a>
              <a
                href="#compliance"
                className="px-3 py-2 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors"
              >
                Compliance
              </a>
              <a
                href="#disclaimer"
                className="px-3 py-2 bg-primary/10 text-primary rounded-md text-sm hover:bg-primary/20 transition-colors"
              >
                Disclaimer
              </a>
            </div>
          </div>
        </header>

        {/* Main Content with Sidebar Navigation for Desktop */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar Navigation - Desktop Only */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="sticky top-24 space-y-4">
              <h3 className="font-semibold text-lg text-black/70 mb-4">
                Quick Navigation
              </h3>
              <nav className="space-y-3">
                <a
                  href="#privacy"
                  className="block px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-lg text-black/70 hover:text-primary transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms"
                  className="block px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-lg text-black/70 hover:text-primary transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="#compliance"
                  className="block px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-lg text-black/70 hover:text-primary transition-colors duration-200"
                >
                  Compliance
                </a>
                <a
                  href="#disclaimer"
                  className="block px-4 py-3 bg-primary/5 hover:bg-primary/10 rounded-lg text-black/70 hover:text-primary transition-colors duration-200"
                >
                  Disclaimer
                </a>
              </nav>

              {/* Contact Info Box */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-sm text-black/80 mb-2">
                  Need Help?
                </h4>
                <p className="text-xs text-black/60 mb-3">
                  For specific legal questions, consult with a qualified tax
                  professional.
                </p>
                <a
                  href="https://www.nrs.gov.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Visit NRS Website →
                </a>
              </div>
            </div>
          </div>

          {/* Legal Content */}
          <div className="lg:w-3/4 space-y-10 sm:space-y-12 lg:space-y-16">
            {/* PRIVACY POLICY */}
            <section
              id="privacy"
              className="scroll-mt-32 space-y-4 sm:space-y-6"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="text-primary font-bold text-lg">
                    <MdPrivacyTip />
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black/80">
                  Privacy Policy
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    CheckTax respects your privacy and is committed to
                    protecting your personal information. We do not sell, rent,
                    or trade user data.
                  </p>
                </div>

                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    Information entered into the tax calculator is processed
                    locally within your session and is not stored on our servers
                    unless explicitly required for a requested service.
                  </p>
                </div>

                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    We may collect minimal technical data such as browser type
                    or device information to improve platform performance and
                    security.
                  </p>
                </div>
              </div>
            </section>

            {/* TERMS OF SERVICE */}
            <section id="terms" className="scroll-mt-32 space-y-4 sm:space-y-6">
              <div className="flex items-start sm:items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="text-primary font-bold text-lg">
                    <FaFilePen />
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black/80">
                  Terms of Service
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    By using CheckTax, you agree to use the platform solely for
                    lawful and informational purposes. The platform provides
                    estimates only and does not replace official filings or
                    professional tax advice.
                  </p>
                </div>

                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    Users are responsible for the accuracy of all information
                    entered. CheckTax is not liable for decisions made based on
                    generated estimates.
                  </p>
                </div>

                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    We reserve the right to update, suspend, or discontinue any
                    part of the service without prior notice.
                  </p>
                </div>
              </div>
            </section>

            {/* COMPLIANCE */}
            <section
              id="compliance"
              className="scroll-mt-32 space-y-4 sm:space-y-6"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="text-primary font-bold text-lg">
                    <GrCompliance />
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-black/80">
                  Compliance
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    CheckTax is designed to align with Nigeria's 2026 Tax Reform
                    framework and relevant Nigeria Revenue Service guidelines as
                    published at the time of development.
                  </p>
                </div>

                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    Calculations are based on publicly available legislation,
                    finance acts, and regulatory circulars. Actual liabilities
                    are subject to review and confirmation by the Nigeria
                    Revenue Service.
                  </p>
                </div>

                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    This platform does not submit returns or make payments on
                    behalf of users.
                  </p>
                </div>
              </div>
            </section>

            {/* DISCLAIMER */}
            <section
              id="disclaimer"
              className="scroll-mt-32 space-y-4 sm:space-y-6"
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <span className="text-primary font-bold text-lg">
                    <FcDisclaimer />
                  </span>
                </div>
                <h2 className="text-xl sm:text-xl md:text-2xl font-semibold text-black/80">
                  Disclaimer
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-5">
                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    All results generated by CheckTax are estimates provided for
                    informational purposes only.
                  </p>
                </div>

                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    This platform does not constitute legal, financial, or tax
                    advice. Users are advised to consult licensed professionals
                    or the Nigeria Revenue Service for official guidance.
                  </p>
                </div>

                <div className="bg-white/50 p-4 sm:p-5 rounded-lg">
                  <p className="text-sm sm:text-base md:text-md leading-relaxed text-black/70">
                    CheckTax shall not be held responsible for penalties,
                    losses, or disputes arising from the use of this platform.
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 sm:p-8 mt-12">
              <div className="text-center space-y-4">
                <h3 className="text-lg sm:text-xl font-semibold text-black/80">
                  Still Have Questions?
                </h3>
                <p className="text-sm sm:text-base text-black/60 max-w-2xl mx-auto">
                  For specific legal inquiries or official tax guidance, please
                  contact the Nigeria Revenue Service directly or consult with a
                  qualified tax professional.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <a
                    href="https://www.nrs.gov.ng/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium text-sm sm:text-base"
                  >
                    Visit Official NRS Website
                  </a>
                  <button disabled
                    href="/contact"
                    className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors duration-300 font-medium text-sm sm:text-base"
                  >
                    Contact CheckTax Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Legal;
