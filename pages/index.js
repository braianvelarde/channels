import Head from "next/head";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import { request, GraphQLClient, gql } from "graphql-request";
import ChannelCard from "../components/ChannelCard";
import { useState } from "react";
import Filter from "../components/Filter";

export default function Home({ channels }) {
  const [filteredChannels, setFilteredChannels] = useState(channels);
  const [activePack, setActivePack] = useState(null);

  return (
    <div className="bg-[#303032] pt-4 ">
      <Head>
        <title>Grilla de canales</title>
        <meta
          name="description"
          content="Grilla de señales de tv de RSO, Carilo Digital, Lobos Digital y Rpereznet"
        />
        <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
      </Head>
      <div className="text-center pt-2 pb-4">
        <h1 className="text-xl text-white font-semibold">Grilla de señales</h1>
      </div>
      <Filter
        setActivePack={setActivePack}
        setFilteredChannels={setFilteredChannels}
        activePack={activePack}
        channels={channels}
        filteredChannels={filteredChannels}
      />
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div className="grid grid-cols-2  grid-rows-4 md:grid-cols-4 md:grid-rows-4 xl:grid-cols-9 xl:grid-rows-4 gap-4 pt-4 px-4">
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
  );
}

export async function getStaticProps(context) {
  const query = gql`
    query Channels {
      channels(orderBy: number_ASC) {
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
    }, // will be passed to the page component as props
  };
}
