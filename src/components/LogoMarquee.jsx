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
              className="h-12 md:h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
          ) : (
            <span className="text-lg font-semibold text-ink/50 hover:text-navy transition-colors whitespace-nowrap">
              {c.name}
            </span>
          )
          return (
            <div key={i} className="shrink-0 px-8 grid place-items-center h-20">
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
