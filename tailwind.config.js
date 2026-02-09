/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d32f2f",
        "background-light": "#f8f7f6",
        "background-dark": "#221810",
        "industrial-black": "#1a1a1a",
        "industrial-white": "#FFFFFF",
        "industrial-gray": "#F9F9F9",
        "border-gray": "#E5E5E5"
      },
      fontFamily: {
        display: ["Anuphan", "sans-serif"],
        thai: ["Anuphan", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")]
};
