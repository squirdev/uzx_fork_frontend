export default function CoinItemButton({
  index,
  text,
  activeIndex,
  setActive,
}) {
  return (
    <button
      onClick={() => setActive(index)}
      className={`rounded-full py-[2px] px-3 border border-[#d2d2d2] ${index == activeIndex ? "bg-black" : "bg-[#f5f5f5]"}`}
    >
      <span
        className={`text-sm ${index == activeIndex ? "text-white" : "text-[#939393]"}`}
      >
        {text}
      </span>
    </button>
  );
}
