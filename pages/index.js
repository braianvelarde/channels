import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { GraphQLClient, gql } from "graphql-request";
import ChannelCard from "../components/ChannelCard";
import { useState, useEffect } from "react";
import Filter from "../components/Filter";
import Script from "next/script";

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

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <div
      className={
        (isDarkMode ? "dark" : "") + " h-screen flex flex-col scroll-smooth"
      }
    >
      <button
        aria-label="scroll to top"
        onClick={scrollToTop}
        className="h-14 w-14 flex items-center justify-center rounded-full bg-[#303032] hover:opacity-90 active:scale-95 transition-transform duration-200 dark:text-[#303032] shadow-md text-neutral-100 dark:bg-neutral-100 fixed bottom-5 right-5 z-10 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <div className=" dark:bg-[#303032] text-[#1f1f20] dark:text-white bg-neutral-100 pt-4 pb-4 flex-grow">
        <Head>
          <title>
            Grilla de canales de tv RSO, Carilo Digital, Lobos Digital,
            Rpereznet
          </title>
          <meta name="viewport" content="width=device-width"></meta>
          <meta
            name="theme-color"
            content={isDarkMode ? "#303032" : "#f5f5f5"}
          ></meta>
          <meta
            name="description"
            content="Grilla de señales de tv de RSO, Carilo Digital, Lobos Digital y Rpereznet.  Canales Rso, Carilo Digital, Lobos Digital y Rpereznet"
          />
          <meta property="og:type" content="article" />
          <meta property="og:title" content="Grilla de señales de TV." />
          <meta property="og:image" content="/Logo-RSO.png" />
          <meta
            property="og:description"
            content="Grilla de señales de tv de RSO, Carilo Digital, Lobos Digital y Rpereznet. Canales Rso, Carilo Digital, Lobos Digital y Rpereznet"
          />
          <meta property="og:url" content="https://canales-rso.vercel.app/" />
          <meta property="og:site_name" content="Grilla de señales" />
          <meta name="twitter:title" content="Grilla de señales de TV" />
          <meta
            name="twitter:description"
            content="Grilla de señales de tv de RSO, Carilo Digital, Lobos Digital y Rpereznet. Canales Rso, Carilo Digital, Lobos Digital y Rpereznet"
          />
          <meta name="twitter:image" content="/Logo-RSO.png" />
          <meta name="twitter:site" content="@braianvelarde" />
          <meta name="twitter:creator" content="@braianvelarde" />
          <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
          <meta name="google" content="notranslate" key="notranslate" />
        </Head>
        <Script
          id="google tag manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-T9MZ4DX');`,
          }}
        />
        <div className="flex space-x-4 justify-center items-center pt-2 pb-6">
          <h1 className="text-2xl font-semibold flex space-x-2">
            <span>Grilla de señales de TV de:</span>
            <a
              rel="external noreferrer tag"
              target="_blank"
              href="http://www.rsonet.com.ar/"
              className="hover:underline cursor-pointer"
            >
              RSO
            </a>
            <a
              rel="external noreferrer"
              target="_blank"
              href="http://www.carilodigital.com.ar/"
              className="hover:underline cursor-pointer"
            >
              Carilo Digital
            </a>
            <a
              rel="external noreferrer tag"
              target="_blank"
              href="https://www.lobosdigital.com.ar/"
              className="hover:underline cursor-pointer"
            >
              Lobos Digital
            </a>
            <a
              rel="external noreferrer tag"
              target="_blank"
              href="https://rpereznetonline.com.ar/"
              className="hover:underline cursor-pointer"
            >
              Rpereznet
            </a>
          </h1>
          <button
            onClick={() => handleDarkMode()}
            className={
              "bg-[#303032] h-6 w-12 rounded-xl relative cursor-pointer dark:bg-white shadow-md"
            }
          >
            <span
              className={
                (isDarkMode
                  ? "translate-x-full bg-[#303032] border-white "
                  : "translate-x-0 bg-white border-[#303032]") +
                " rounded-full absolute flex items-center justify-center border-2 top-0 left-0 shadow-md h-full w-6  transition-transform duration-200"
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
          <motion.section>
            <h4 className="text-center py-4">
              Lista de canales para decodificador.
            </h4>
            <div className="grid grid-cols-2  grid-rows-4 md:grid-cols-4 md:grid-rows-4 xl:grid-cols-9 xl:grid-rows-4 auto-rows-fr gap-4 pt-4 px-4">
              {filteredChannels
                ? filteredChannels.map((channel) => (
                    <ChannelCard
                      key={channel.id}
                      name={channel.name}
                      image={channel.image.url}
                      number={channel.number}
                    />
                  ))
                : null}
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}

export async function getStaticProps() {
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
  };
}
