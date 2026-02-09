const fs = require("fs");
const path = require("path");

const collectLegacyHtmlClasses = () => {
  const legacyDir = path.join(__dirname, "legacy", "html");
  if (!fs.existsSync(legacyDir)) {
    return [];
  }

  const classNames = new Set();
  const files = fs.readdirSync(legacyDir).filter((file) => file.endsWith(".html"));

  for (const file of files) {
    const fullPath = path.join(legacyDir, file);
    const html = fs.readFileSync(fullPath, "utf8");
    const classRegex = /class=("|')([^"']+)(\1)/gi;
    let match;

    while ((match = classRegex.exec(html)) !== null) {
      const raw = match[2] || "";
      for (const className of raw.split(/\s+/)) {
        if (className) {
          classNames.add(className);
        }
      }
    }
  }

  return [...classNames];
};

const legacySafelist = collectLegacyHtmlClasses();

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}"
  ],
  safelist: legacySafelist,
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
