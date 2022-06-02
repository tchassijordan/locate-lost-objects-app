import React from "react";

export default function Button({ Icon, placeholder, type }: TProps) {
  return (
    <button
      type={type}
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition"
    >
      {Icon && (
        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
          {Icon}
        </span>
      )}
      {placeholder}
    </button>
  );
}

type TProps = {
  Icon: JSX.Element,
  placeholder: string,
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
}