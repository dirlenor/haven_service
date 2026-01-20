import Link from "next/link";

export default function LineCTA({ href = "/contact", label = "ติดต่อเรา", className = "" }) {
  return (
    <Link
      href={href}
      className={`btn h-10 px-5 text-sm inline-flex items-center gap-2 text-white shadow-lg ${className}`}
      style={{ backgroundColor: "#3ace00" }}
    >
      <img
        src="/assets/images/—Pngtree—%20chat%20icon_3584855.png"
        alt="Line"
        className="h-8 w-8 object-contain"
      />
      {label}
    </Link>
  );
}
