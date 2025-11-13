"use client";

import { cn } from "@/lib/utils";
import { BsArrowRight } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi2";

interface ButtonProps {
  title: string;
  onClick: () => void;
  className?: string;
  arrow?: boolean;
  magic?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  className,
  arrow,
  magic,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "bg-[#7C5CFC] transition hover:bg-[#7053e0] text-white px-5 py-3 group rounded-[30px] inline-flex items-center justify-center",
        className
      )}
    >
      <div className="px-2">{title}</div>
      {arrow && (
        <span className="group-hover:translate-x-1 transition">
          <BsArrowRight className="h-6 w-6" />
        </span>
      )}
      {magic && (
        <span>
          <HiSparkles className="h-6 w-6" />
        </span>
      )}
    </button>
  );
};

export default Button;
