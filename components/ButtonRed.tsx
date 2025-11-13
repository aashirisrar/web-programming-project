"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`border-2 font-semibold px-1 relative disabled:opacity-70 flex gap-1 items-center justify-center
    disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
      outline ? "bg-white" : "bg-rose-500"
    } ${outline ? "border-black" : "border-rose-500"} ${
        outline ? "text-black" : "text-white"
      } ${small ? "py-1" : "py-3"} ${small ? "text-sm" : "text-sm md:text-md"}
   `}
    >
      {Icon && <Icon size={24} />}
      <div>{label}</div>
    </button>
  );
};

export default Button;
