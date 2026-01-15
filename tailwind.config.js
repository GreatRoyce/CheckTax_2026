/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#008753",
        btnprimary: "#006641",
        secondary: "#f3f4f6",
        accent: "#10B981",
        bgcolor: "#F8F9FB",
        icon: "#fefd4d",
        footercolor: "#eaeaea",
        "divider": "#6B7280",
        footed: "#f2f2f2",
      },
    },
  },
  plugins: [],
};
