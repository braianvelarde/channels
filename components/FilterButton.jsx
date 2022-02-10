export default function FilterButton({
  children,
  setActivePack,
  pack,
  activePack,
}) {
  return (
    <button
      onClick={() => setActivePack(pack)}
      className={
        pack === activePack
          ? "snap-start rounded-full bg-[#ededed] text-black py-2 px-4 hover:scale-95 transition-all duration-150"
          : "snap-start rounded-full bg-[#39393b] hover:bg-[#47474a] py-2 px-4 hover:scale-95 transition-all duration-150"
      }
    >
      {children}
    </button>
  );
}
