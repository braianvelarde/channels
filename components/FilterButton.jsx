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
          ? "snap-start rounded-full dark:bg-[#ededed] dark:text-black font-semibold text-white bg-neutral-700 py-2 px-4 hover:scale-95 transition-scale duration-200"
          : "snap-start rounded-full dark:bg-[#39393b] bg-neutral-300 hover:dark:bg-[#47474a] py-2 px-4 hover:scale-95 transition-scale duration-200"
      }
    >
      {children}
    </button>
  );
}
