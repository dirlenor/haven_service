import Script from "next/script";
import MainLayout from "../components/layout/MainLayout";
import "../styles/globals.css";
import "react-quill/dist/quill.snow.css";

export const metadata = {
  title: "Thai Haven Service"
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

const legacyContactSafelist =
  "bg-background-light dark:bg-background-dark font-display text-[#181411] dark:text-[#f8f7f6] relative flex min-h-screen w-full flex-col overflow-x-hidden flex-1 max-w-[1280px] mx-auto px-6 lg:px-10 py-10 mb-10 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4 text-[#897261] dark:text-[#b09e90] text-lg max-w-2xl font-normal grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-stretch h-full bg-center bg-no-repeat bg-cover rounded-xl object-cover shadow-lg border border-[#e6e0db] dark:border-[#3d2e23] overflow-hidden bg-white dark:bg-[#2d2118] p-8 justify-center text-2xl font-bold mb-6 items-center gap-2 material-symbols-outlined text-primary text-3xl space-y-6 pb-6 border-b font-medium leading-relaxed items-start gap-4 bg-primary/10 p-3 rounded-lg flex-shrink-0 text-xl text-sm uppercase tracking-wider mb-2 text-base rounded-2xl mb-8 space-y-5 md:grid-cols-2 gap-5 dark:bg-[#221810] h-12 focus:ring-primary focus:border-primary bg-primary hover:bg-opacity-90 text-white py-4 shadow-md transition-all text-xs text-center mt-4 italic border-t border-gray-100 dark:border-gray-800 mt-20 py-16 md:grid-cols-4 gap-12 gap-6 gap-3 size-8 dark:text-gray-400 size-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white hover:text-primary transition-colors mt-16 pt-8 md:flex-row justify-between dark:text-gray-500 hover:underline fixed bottom-8 right-8 z-[100] items-end px-4 py-2 shadow-xl border-[#f4f2f0] dark:border-[#3a2d23] hidden md:block bg-[#00B900] hover:scale-110 active:scale-95 w-14 h-14 md:w-16 md:h-16 shadow-2xl duration-300 group w-8 h-8 md:w-10 md:h-10 fill-current absolute right-full mr-4 py-1 px-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap";

const tailwindConfig = `
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: "class",
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

const tailwindReady = `
function markTailwindReady() {
  document.documentElement.classList.add("tw-ready");
}

if (document.readyState === "complete") {
  markTailwindReady();
} else {
  window.addEventListener("load", markTailwindReady, { once: true });
  setTimeout(markTailwindReady, 500);
}
`;

export default function RootLayout({ children }) {
  return (
    <html lang="th" className="light" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/assets/css/style.css" />
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
          id="tailwind-ready"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: tailwindReady }}
        />
        <Script
          id="scroll-restoration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: "if ('scrollRestoration' in window.history) { window.history.scrollRestoration = 'manual'; }"
          }}
        />
      </head>
      <body className="bg-background-light dark:bg-background-dark font-display text-[#181411] dark:text-white">
        <div
          className={legacyContactSafelist}
          style={{ display: "none" }}
          aria-hidden="true"
        />
        <MainLayout>{children}</MainLayout>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
          strategy="afterInteractive"
        />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
