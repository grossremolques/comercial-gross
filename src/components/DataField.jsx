
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
export const NoDataComponent = ({title, text, children}) => {
  return (
    <div className="flex flex-col items-center justify-center text-neutral-700 gap-4 my-6">
      <p className="text-xl font bold">{title}</p>
      <p>{text}</p>
      {children}
    </div>
  );
};
