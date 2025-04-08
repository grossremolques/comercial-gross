export default function Badge({ children, variant }) {
  const baseClasses = "rounded-full px-2.5 py-0.5 text-sm whitespace-nowrap";
  const variants = {
    purple: "bg-purple-100 text-purple-700",
    yellow: "bg-yellow-100 text-yellow-700",
    pink: "bg-pink-100 text-pink-700",
    green: "bg-green-100 text-green-700",
    gray: "bg-gray-100 text-gray-700",
  };
  return <span className={`${baseClasses} ${variants[variant]}`}>{children}</span>;
}
