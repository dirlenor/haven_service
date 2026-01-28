import Navbar from "./Navbar";
import Breadcrumbs from "./Breadcrumbs";
import FooterSection from "../sections/FooterSection";
import FloatingContactButton from "../ui/FloatingContactButton";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      {children}
      <FloatingContactButton />
      <FooterSection />
    </>
  );
}
