import React from "react";

export const Input = React.forwardRef(
  (
    { onChange, onBlur, name, placeholder, onClick, type = "text", onInput, readOnly , className},
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
        className={`mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm read-only:bg-gray-100 ${className}`}
      />
    );
  }
);

export const Select = React.forwardRef(
  ({ onChange, onBlur, name, placeholder, onClick, onInput, disabled, children},
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
        className="mt-1 w-full rounded-md border-gray-200 text-gray-700 sm:text-sm shadow-sm disabled:bg-gray-100"
      >
        <option value=''>{placeholder}</option>
        {children}
        
      </select>
    );
  }
);
export const Label = ({ label, htmlFor }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700"
    >
      {" "}
      {label}{" "}
    </label>
  );
};
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
    <div className="mt-1 text-sm text-red-500">
      {message}
    </div>
  );
}
