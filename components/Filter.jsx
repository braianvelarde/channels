import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FilterButton from "./FilterButton";

const Filter = ({
  setFilteredChannels,
  activePack,
  setActivePack,
  channels,
  filteredChannels,
}) => {
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
      case "hbo":
        newChannels = [...channels.filter((channel) => channel.pack === "hbo")];

        setFilteredChannels(newChannels);
        break;
      case "star":
        newChannels = [
          ...channels.filter((channel) => channel.pack === "star"),
        ];

        setFilteredChannels(newChannels);
        break;
      case "basico":
        newChannels = [
          ...channels.filter((channel) => channel.pack === "basico"),
        ];

        setFilteredChannels(newChannels);
        break;
      case "futbol":
        newChannels = [
          ...channels.filter((channel) => channel.pack === "futbol"),
        ];

        setFilteredChannels(newChannels);
        break;
      case "All":
        setFilteredChannels(channels);
    }
  }, [activePack, channels, setFilteredChannels]);

  return (
    <div className="pl-4 grid grid-flow-row items-center justify-center space-y-4  font-semibold text-xl overflow-hidden">
      <h2>Cantidad de canales: {filteredChannels.length}</h2>
      <h4 className="text-sm">Seleccione un pack:</h4>
      <div
        ref={filtersRef}
        onWheel={(e) => horizontalWheel(e)}
        className="flex overflow-x-scroll scrollbar-hide space-x-2 snap-mandatory snap-x"
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
};

export default Filter;
