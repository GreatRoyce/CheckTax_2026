import React from "react";

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center  bg-primary/10 px-4">
      <div className="text-center max-w-xl">
        {/* 404 */}
        <h1 className="font-bold text-[30vw] sm:text-[20rem] leading-none text-primary/80">
          404
        </h1>

        {/* Title */}
        <h2 className="text-lg sm:text-2xl  font-semibold mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm sm:text-base text-black/70">
          The address you entered does not match any page on this platform.
        </p>

        {/* Back link */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center text-sm sm:text-base text-blue-600 hover:text-blue-500 transition"
        >
          ← Go back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
