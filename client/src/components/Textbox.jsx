import React from "react";
import clsx from "clsx";

const Textbox = React.forwardRef(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-blue-300 font-medium">
            {label}
          </label>
        )}

        <div>
          <input
            type={type}
            id={name}
            placeholder={placeholder}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-[#0f172a] text-blue-100 px-3 py-2.5 2xl:py-3 border border-blue-700/50 placeholder-blue-400 outline-none text-base rounded-lg focus:ring-2 ring-blue-400 shadow-md shadow-blue-600/20",
              className
            )}
          />
        </div>
        {error && (
          <span className="text-xs text-red-500 mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

export default Textbox;
