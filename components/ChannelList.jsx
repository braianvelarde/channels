import React from "react";
import { FixedSizeList } from "react-window";
import ChannelCard from "./ChannelCard";

export default function ChannelList({ channels }) {
  return (
    <FixedSizeList
      height={500}
      width={500}
      itemSize={120}
      itemData={channels}
      itemCount={channels.length}
    >
      {({ data, index, style }) => {
        return (
          <ChannelCard
            style={style}
            name={data[index].name}
            number={data[index].number}
            image={data[index].image.url}
          ></ChannelCard>
        );
      }}
    </FixedSizeList>
  );
}
