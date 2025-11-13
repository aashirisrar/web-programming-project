"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

interface TagProps {
  title: string;
  popular?: boolean;
}

const Tag: React.FC<TagProps> = ({ title, popular }) => {
  return (
    <motion.div
      animate={{
        backgroundPositionX: "-100%",
      }}
      transition={{
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
        duration: 1,
      }}
      className={cn(
        "w-fit h-fit leading-[160%] font-medium border border-[#222222]/10 inline-flex px-3 py-2 rounded-full gap-2 shadow-lg items-center justify-center",
        popular
          ? "bg-clip-text text-transparent bg-[linear-gradient(to_right,#DD7DDF,#E1CD86,#8BCB92,#71C2EF,#3BFFFF,#DD7DDF,#E1CD86,#8BCB92,#71C2EF,#3BFFFF,#DD7DDF)] [background-size:200%] border-white/20"
          : ""
      )}
    >
      {!popular && <HiSparkles className="w-5 h-5 text-blue-500" />}

      <span>{title}</span>
    </motion.div>
  );
};

export default Tag;
