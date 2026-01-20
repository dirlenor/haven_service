import Script from "next/script";
import Navbar from "../components/layout/Navbar";
import SectionIndicator from "../components/layout/SectionIndicator";
import FooterSection from "../components/sections/FooterSection";
import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";

export const metadata = {
  title: "Thai Haven Service"
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

const tailwindConfig = `
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#d46211",
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
  plugins: [
    function({ addComponents }) {
      addComponents({
        ".btn": {
          "@apply inline-flex items-center justify-center rounded-lg font-bold transition-all active:scale-95 cursor-pointer": {}
        },
        ".btn-primary": {
          "@apply bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90": {}
        },
        ".btn-outline": {
          "@apply border-2 border-primary text-primary hover:bg-primary/5": {}
        },
        ".card": {
          "@apply bg-white dark:bg-[#251c16] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-[#3d2b1d]": {}
        },
        ".card-hover": {
          "@apply hover:shadow-xl transition-all duration-300": {}
        }
      });
    }
  ]
};
`;

export default function RootLayout({ children }) {
  return (
    <html lang="th" className="light">
      <head>
        <Script
          id="tailwind-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: tailwindConfig }}
        />
        <Script
          src="https://cdn.tailwindcss.com?plugins=forms,container-queries"
          strategy="beforeInteractive"
        />
        <Script
          id="tw-ready"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('tw-ready');"
          }}
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-[#181411] dark:text-white">
        <Navbar />
        <SectionIndicator />
        {children}
        <FooterSection />
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
