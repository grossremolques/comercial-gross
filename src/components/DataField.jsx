
export function DataField({icon, label, value, className}) {
  return (
    <div className="flex justify-between mb-2 gap-4 text-gray-700">
      <span className="w-35 flex-none flex items-center">
        <span className="mr-1.5">{icon}</span>
        {label}:
      </span>
      <span className="bg-gray-100 rounded px-5 py-0.5 w-full text-right">
        {value}
      </span>
    </div>
  );
}
