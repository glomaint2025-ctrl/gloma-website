// Plays a YouTube link, a Facebook/other link, or an uploaded video file.

export function youtubeEmbed(url) {
  if (!url) return null
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/)
  return yt ? `https://www.youtube.com/embed/${yt[1]}` : null
}

export function isVideoFile(url) {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url || '')
}

export default function VideoPlayer({ url, className = '' }) {
  const embed = youtubeEmbed(url)
  if (embed) {
    return (
      <iframe
        src={embed}
        title="video"
        className={`w-full h-full ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }
  if (isVideoFile(url)) {
    return <video src={url} controls playsInline className={`w-full h-full object-cover ${className}`} />
  }
  return (
    <a href={url} target="_blank" rel="noreferrer"
      className="w-full h-full flex flex-col items-center justify-center text-white/70 hover:text-gold">
      <div className="text-5xl mb-2">▶️</div>
      <span className="text-sm">Watch video</span>
    </a>
  )
}
