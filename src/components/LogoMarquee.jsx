// Infinite scrolling row of client logos.
export default function LogoMarquee({ clients }) {
  if (!clients?.length) return null
  const doubled = [...clients, ...clients]

  return (
    <div className="overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee-track gap-6 items-center">
        {doubled.map((c, i) => {
          const inner = c.logo_url ? (
            <img src={c.logo_url} alt={c.name}
              className="h-16 md:h-20 w-auto object-contain rounded-2xl opacity-70 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0 hover:scale-110" />
          ) : (
            <span className="text-lg font-semibold text-white/40 hover:text-white transition-colors whitespace-nowrap">
              {c.name}
            </span>
          )
          return (
            <div key={i} className="shrink-0 px-8 grid place-items-center h-24">
              {c.website ? (
                <a href={c.website} target="_blank" rel="noreferrer">{inner}</a>
              ) : inner}
            </div>
          )
        })}
      </div>
    </div>
  )
}
