import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { request, GraphQLClient, gql } from "graphql-request";
import ChannelCard from "../components/ChannelCard";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";

export default function Home({ channels }) {
  const dm = useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("darkMode")) {
        setIsDarkMode(JSON.parse(window.localStorage.getItem("darkMode")));
      } else {
        window.localStorage.setItem("darkMode", JSON.stringify(true));
        setIsDarkMode(true);
      }
    }
  }, []);

  const [filteredChannels, setFilteredChannels] = useState(channels);
  const [activePack, setActivePack] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(() => dm);

  const handleDarkMode = () => {
    if (!isDarkMode) {
      setIsDarkMode(true);
      window.localStorage.setItem("darkMode", JSON.stringify(true));
    } else if (isDarkMode) {
      setIsDarkMode(false);
      window.localStorage.setItem("darkMode", JSON.stringify(false));
    }
  };

  return (
    <div className={(isDarkMode ? "dark" : "") + " h-screen flex flex-col"}>
      <div className=" dark:bg-[#303032] text-[#1f1f20] dark:text-white bg-neutral-100 pt-4 pb-4 flex-grow">
        <Head>
          <title>Grilla de canales</title>
          <meta
            name="theme-color"
            content={isDarkMode ? "#303032" : "#f5f5f5"}
          ></meta>
          <meta
            name="description"
            content="Grilla de señales de tv de RSO, Carilo Digital, Lobos Digital y Rpereznet"
          />
          <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
          <meta name="google" content="notranslate" key="notranslate" />
        </Head>
        <div className="flex space-x-4 justify-center items-center pt-2 pb-6">
          <h1 className="text-2xl font-semibold">Grilla de señales</h1>
          <button
            onClick={() => handleDarkMode()}
            className={
              "bg-[#303032] h-6 w-12 rounded-xl relative cursor-pointer dark:bg-white shadow-sm"
            }
          >
            <span
              className={
                (isDarkMode
                  ? "translate-x-full bg-[#303032] border-white "
                  : "translate-x-0 bg-white border-[#303032]") +
                " rounded-full absolute flex items-center justify-center border-2 top-0 left-0 shadow-sm h-full w-6  transition-transform duration-200"
              }
            >
              {isDarkMode ? (
                <Image src="/moon.svg" alt="moon icon" layout="fill" />
              ) : (
                <Image src="/sun.svg" alt="sun icon" layout="fill" />
              )}
            </span>
          </button>
        </div>
        <Filter
          setActivePack={setActivePack}
          setFilteredChannels={setFilteredChannels}
          activePack={activePack}
          channels={channels}
          filteredChannels={filteredChannels}
        />
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div className="grid grid-cols-2  grid-rows-4 md:grid-cols-4 md:grid-rows-4 xl:grid-cols-9 xl:grid-rows-4 auto-rows-fr gap-4 pt-4 px-4">
            {filteredChannels &&
              filteredChannels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  name={channel.name}
                  image={channel.image.url}
                  number={channel.number}
                />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const query = gql`
    query Channels {
      channels(first: 200, orderBy: number_ASC) {
        id
        name
        number
        category
        pack
        image {
          url
        }
      }
    }
  `;
  const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT);
  const { channels } = await client.request(query);
  return {
    props: {
      channels,
    },
    revalidate: 86400, // will be passed to the page component as props
  };
}
