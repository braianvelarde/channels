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
        <Image
          layout="fill"
          objectFit="contain"
          src={image}
          alt={`${name} logo`}
        ></Image>
      </div>
      <div className="flex flex-col justify-between flex-grow px-5">
        <h2 className="text-lg font-bold">{name}</h2>
        <p>{number}</p>
      </div>
    </motion.article>
  );
}
