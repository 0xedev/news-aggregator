/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2294ed",
        secondary: "#577592",
        neutral: "#183b56",
        background: "#f5f5f5",
        navbar: "#f3faff",
      },
    },
  },
  plugins: [],
};
