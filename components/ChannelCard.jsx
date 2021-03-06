import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const ChannelCard = ({ name, number, image }) => {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="flex flex-col dark:bg-[#39393b] bg-neutral-100 rounded-xl  py-2 shadow-md space-y-2 cursor-pointer"
    >
      <div className="relative self-center h-12 w-2/3">
        <BluredImage src={image} alt={`${name} logo`}></BluredImage>
      </div>
      <div className="flex flex-col justify-between flex-grow px-5">
        <h5 className="text-lg font-bold">{name}</h5>
        <p>{number}</p>
      </div>
    </motion.article>
  );
};

export default React.memo(ChannelCard);

function BluredImage({ src, alt }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      src={src}
      alt={alt}
      sizes="50vw"
      objectFit="contain"
      layout="fill"
      className={
        "duration-500 ease-in-out" +
        (isLoading ? " blur-2xl scale-120" : " blur-0 scale-100")
      }
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
}
