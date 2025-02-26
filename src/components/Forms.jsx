import React from "react";
const stylebases = "rounded-md border-gray-200 shadow-xs sm:text-sm disabled:bg-gray-100";

export const Label = ({ label, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {" "}
      {label}{" "}
    </label>
  );
};
export const Input = React.forwardRef(
  (
    { onChange, onBlur, name, placeholder, onClick, type = "text", onInput, readOnly , className, disabled},
    ref
  ) => {
    return (
      <input
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onClick={onClick}
        type={type}
        onInput={onInput}
        readOnly={readOnly}
        disabled={disabled}
        autoComplete="off"
        className={`w-full ${stylebases} ${className}`}
      />
    );
  }
);
export const Textarea = React.forwardRef(
  (
    {
      onChange,
      onBlur,
      name,
      placeholder,
      onClick,
      onInput,
      className,
      rows = 3,
      disabled
    },
    ref
  ) => {
    return (
      <textarea
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        onClick={onClick}
        rows={rows}
        ref={ref}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full ${stylebases} ${className}`}
      ></textarea>
    );
  }
);
export const Select = React.forwardRef(
  ({ onChange, onBlur, name, placeholder, onClick, onInput, disabled, className, children},
    ref) => {
    return (
      <select
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        ref={ref}
        placeholder={placeholder}
        onClick={onClick}
        onInput={onInput}
        disabled={disabled}
        className={`w-full ${stylebases} ${className}`}
      >
        <option value=''>{placeholder}</option>
        {children}
        
      </select>
    );
  }
);
export const InputComponent = ({ label, htmlFor, children, someClass }) => {
  return (
    <div className={someClass}>
      <Label label={label} htmlFor={htmlFor} />
      {children}
    </div>
  );
};

export const Button = ({ children }) => {
  return (
    <button
      type="submit"
      className="px-2 rounded-md text-gray-400 border border-gray-400 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer mt-1"
    >
      {children}
    </button>
  );
};
export const SelectGroup = React.forwardRef(
  ({ data, name, onChange, onClickButton, children, value, input }, ref) => {
    return (
      <span className="w-full mt-1.5 inline-flex -space-x-px overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm">
        <select
          ref={ref}
          name={name}
          onChange={onChange}
          className="inline-block px-4 py-2 text-sm text-gray-700 border-none hover:bg-gray-50 grow"
        >
          <option value={""}>{""}</option>
          {data.map((item) => (
            <option key={item[value]} value={item[value]}>
              {item[input]}
            </option>
          ))}
        </select>
        <button
          onClick={onClickButton}
          type="button"
          className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-indigo-100 border-l border-gray-200 cursor-pointer"
        >
          {children}
        </button>
      </span>
    );
  }
);
export const TextInvalidate = ({message}) => {
  return (
    <div className="mt-1 text-xs text-red-500">
      {message}
    </div>
  );
}
