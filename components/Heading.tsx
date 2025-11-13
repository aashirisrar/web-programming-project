"use client";

import Tag from "./Tag";

interface HeadingProps {
  heading: string;
  subHeading: string;
  tagTitle?: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  tagTitle,
  className,
  heading,
  subHeading,
}) => {
  return (
    <div className="md:w-[540px] md:mx-auto flex flex-col gap-[20px] items-center justify-center text-center">
      {tagTitle && <Tag title={tagTitle} />}
      <div className="md:text-[54px] md:leading-[60px] text-4xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text">
        {heading}
      </div>
      <div className="text-[22px] text-[#010D3E] tracking-tight leading-[30px]">
        {subHeading}
      </div>
    </div>
  );
};

export default Heading;
