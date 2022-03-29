import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ChannelCard({ name, number, image }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col bg-[#39393b] text-white rounded-sm  py-2 shadow-md space-y-2 cursor-pointer hover:translate-y-1 transition-transform duration-150"
    >
      <div className="relative self-center h-12 w-2/3">
        <BluredImage src={image} alt={`${name} logo`}></BluredImage>
      </div>
      <div className="flex flex-col justify-between flex-grow px-5">
        <h2 className="text-lg font-bold">{name}</h2>
        <p>{number}</p>
      </div>
    </motion.article>
  );
}

function BluredImage({ src, alt }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Image
      src={src}
      alt={alt}
      objectFit="contain"
      layout="fill"
      className={
        "duration-500 ease-out" +
        (isLoading
          ? "grayscale blur-2xl scale-120"
          : "grayscale-0 blur-0 scale-100")
      }
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
}
