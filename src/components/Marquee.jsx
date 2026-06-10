// An endless horizontal scrolling row. Pass any array of items.
export default function Marquee({ items }) {
  // We render the list twice so the loop is seamless.
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee-track gap-4">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="shrink-0 px-7 py-3 rounded-full glass-dark text-white/90 font-medium tracking-wide whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
