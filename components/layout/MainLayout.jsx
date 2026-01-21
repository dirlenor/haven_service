"use client";

import Navbar from "./Navbar";
import SectionIndicator from "./SectionIndicator";
import FooterSection from "../sections/FooterSection";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <FooterSection />
      <SectionIndicator />
    </>
  );
}
