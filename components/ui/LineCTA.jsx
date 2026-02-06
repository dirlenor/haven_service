import Link from "next/link";

export default function LineCTA({
  href = "https://lin.ee/BCoNWSL",
  label = "ติดต่อเรา",
  className = "",
  color = "#3ace00"
}) {
  return (
    <Link
      href={href}
      className={`btn h-10 px-5 text-sm inline-flex items-center gap-2 text-white shadow-lg ${className}`}
      style={{ backgroundColor: color }}
    >
      <img
        src="https://api.iconify.design/simple-icons/line.svg?color=%23ffffff"
        alt="Line"
        className="h-5 w-5 object-contain"
      />
      {label}
    </Link>
  );
}
