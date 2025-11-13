"use client";

import { cn } from "@/lib/utils";

import { BiCheck } from "react-icons/bi";
import Button from "./Button";
import Tag from "./Tag";
import useRegisterModal from "@/app/hooks/useRegisterModal";

interface PricingCardProps {
  popular?: boolean;
  data: {
    title: string;
    monthlyPrice: number;
    buttonText: string;
    popular: boolean;
    inverse: boolean;
    features: string[];
  };
}

const PricingCard: React.FC<PricingCardProps> = ({ data, popular }) => {
  const registerModal = useRegisterModal();

  return (
    <div
      key={data.title}
      className={cn(
        "w-[320px] p-10 rounded-3xl border",
        popular ? "border-blue-500 shadow-blue-100 shadow-lg" : ""
      )}
    >
      <div className="flex flex-col gap-[30px]">
        <div className="flex justify-between">
          <div
            className={cn(
              "leading-[28px]  font-bold text-[18px] text-[#000000]/50",
              popular ? "text-blue-500" : ""
            )}
          >
            {data?.title}
          </div>
          {popular && (
            <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium">
              Most Popular
            </div>
          )}
        </div>
        <div className="inline-flex items-end gap-1">
          <div
            className={cn(
              "font-bold text-4xl leading-[36px] tracking-tighter",
              popular ? "text-black" : ""
            )}
          >
            ${data?.monthlyPrice}
          </div>
          <span
            className={cn(
              "text-[16px] font-bold leading-6 text-[#000000]/50",
              popular ? "text-black/50" : ""
            )}
          >
            /month
          </span>
        </div>
        <div>
          <Button
            className={cn(
              "w-full bg-white hover:bg-gray-50 transition text-black",
              popular ? "bg-blue-600 text-white hover:bg-blue-600/90 transition" : "border"
            )}
            title={data?.buttonText}
            onClick={() => registerModal.onOpen()}
          />
        </div>
      </div>
      <div
        className={cn(
          "pt-[32px] flex flex-col justify-center gap-5",
          popular ? "" : ""
        )}
      >
        {data.features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <BiCheck className="w-6 h-6 text-blue-500" />
            <span className="text-[14px] leading-5">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
