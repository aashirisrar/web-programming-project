"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface TestimonialCardColumnProps {
  movementDuration?: number;
  className?: string;
  testimonials: {
    text: string;
    imageSrc: any;
    name: string;
    username: string;
  }[];
}

const TestimonialCardColumn: React.FC<TestimonialCardColumnProps> = ({
  testimonials,
  className,
  movementDuration,
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: movementDuration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.username}
                className="shadow-md w-[325px] p-10 border border-[#222222]/10 rounded-3xl"
              >
                <div>{testimonial.text}</div>
                <div className="pt-[20px] flex gap-3">
                  <div className="relative min-h-[40px] min-w-[40px]">
                    <Image
                      alt={testimonial.username}
                      fill
                      src={testimonial?.imageSrc}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-medium leading-[20px] tracking-tight">
                      {testimonial.name}
                    </div>
                    <div className="leading-[20px] tracking-tight">
                      {testimonial.username}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialCardColumn;
