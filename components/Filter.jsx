import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FilterButton from "./FilterButton";

export default function Filter({
  setFilteredChannels,
  activePack,
  setActivePack,
  channels,
  filteredChannels,
}) {
  const filtersRef = useRef(null);

  function horizontalWheel(e) {
    e.preventDefault();
    e.stopPropagation();
    filtersRef.current.scrollLeft += e.deltaY;
  }

  useEffect(() => {
    let newChannels;
    switch (activePack) {
      case "adultos":
        newChannels = [
          ...channels.filter((channel) => channel.pack === "adultos"),
        ];

        setFilteredChannels(newChannels);
        break;
      case "basico":
        newChannels = [
          ...channels.filter((channel) => channel.pack === "basico"),
        ];

        setFilteredChannels(newChannels);
        break;
      case "All":
        setFilteredChannels(channels);
    }
  }, [activePack, channels, setFilteredChannels]);

  return (
    <div className="grid grid-cols-3 lg:flex justify-center items-center space-x-4 text-white font-semibold text-xl">
      <p className="pl-4">Cantidad de canales: {filteredChannels.length}</p>
      <div
        ref={filtersRef}
        onWheel={(e) => horizontalWheel(e)}
        className="pl-4 col-start-2 col-span-2 flex overflow-x-scroll scrollbar-hide space-x-2 snap-mandatory snap-x"
      >
        <FilterButton
          activePack={activePack}
          setActivePack={setActivePack}
          pack="All"
        >
          Todos
        </FilterButton>
        <FilterButton
          activePack={activePack}
          setActivePack={setActivePack}
          pack="basico"
        >
          Básico
        </FilterButton>
        <FilterButton
          activePack={activePack}
          setActivePack={setActivePack}
          pack="hbo"
        >
          HBO
        </FilterButton>
        <FilterButton
          activePack={activePack}
          setActivePack={setActivePack}
          pack="star"
        >
          Star
        </FilterButton>
        <FilterButton
          activePack={activePack}
          setActivePack={setActivePack}
          pack="futbol"
        >
          Fútbol
        </FilterButton>
        <FilterButton
          activePack={activePack}
          setActivePack={setActivePack}
          pack="adultos"
        >
          Adultos
        </FilterButton>
      </div>
    </div>
  );
}
