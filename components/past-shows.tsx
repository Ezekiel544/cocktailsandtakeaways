"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"

// ─── Types ────────────────────────────────────────────────────────────────────

interface Show {
  title: string
  description: string
  channel: string
  subscribers: string
  src: string
  poster: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SHOWS: Show[] = [
  {
    title: "Wireless Festival Middle East After Music.",
    description:
      "Music event promises to be an exhilarating continuation of the vibrant energy that defines the Wireless Festival. This after-party celebrates the very best of live music culture in the region.",
    channel: "Live Nation Middle East",
    subscribers: "375k subscribers",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
  },
  {
    title: "Imagine Dragons Live At Etihad Arena.",
    description:
      "Etihad Arena promises to be a monumental concert night as Imagine Dragons take the stage for an unforgettable performance filled with emotion and raw energy.",
    channel: "Live Nation Middle East",
    subscribers: "375k subscribers",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    poster: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=250&fit=crop",
  },
  {
    title: "Imagine Dragons Live — Night Two.",
    description:
      "This concert is set to be a night of music, emotion, and celebration as Imagine Dragons deliver their signature anthems to a roaring crowd at full capacity.",
    channel: "Live Nation Middle East",
    subscribers: "375k subscribers",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=250&fit=crop",
  },
  {
    title: "Backstreet Boys Live At Etihad Arena.",
    description:
      "Etihad Arena promises to be a monumental concert as the Backstreet Boys bring their legendary pop harmonies to an ecstatic Middle East crowd.",
    channel: "Live Nation Middle East",
    subscribers: "375k subscribers",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=250&fit=crop",
  },
]

const N = SHOWS.length

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec < 10 ? "0" : ""}${sec}`
}

function getSideIndices(main: number): number[] {
  return [1, 2, 3].map((i) => (main + i) % N)
}

// ─── PlayIcon ─────────────────────────────────────────────────────────────────

function PlayIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}

// ─── PastShows ────────────────────────────────────────────────────────────────

export function PastShows() {
  const [current, setCurrent] = useState(0)
  const [animState, setAnimState] = useState<"idle" | "out-left" | "out-right" | "in-right" | "in-left">("idle")
  const [sideAnim, setSideAnim] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeDisplay, setTimeDisplay] = useState("0:00")
  const [busy, setBusy] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)

  // ── load new video whenever current changes ────────────────────────────────
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.src = SHOWS[current].src
    v.load()
    setIsPlaying(false)
    setTimeDisplay("0:00")
  }, [current])

  // ── time update ───────────────────────────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => {
      if (v.duration) {
        setTimeDisplay(`${formatTime(v.currentTime)} / ${formatTime(v.duration)}`)
      }
    }
    const onEnded = () => setIsPlaying(false)
    v.addEventListener("timeupdate", onTime)
    v.addEventListener("ended", onEnded)
    return () => {
      v.removeEventListener("timeupdate", onTime)
      v.removeEventListener("ended", onEnded)
    }
  }, [])

  // ── swap logic ────────────────────────────────────────────────────────────
  const swapTo = useCallback(
    (newIdx: number, dir: "forward" | "backward") => {
      if (busy || newIdx === current) return
      setBusy(true)
      setSideAnim(false)

      // 1. slide current main OUT
      setAnimState(dir === "forward" ? "out-left" : "out-right")

      setTimeout(() => {
        // 2. switch data + prepare entry side
        setCurrent(newIdx)
        setAnimState(dir === "forward" ? "in-right" : "in-left")

        // tiny frame gap so the new position registers before transition
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setAnimState("idle")
            setSideAnim(true)
            setTimeout(() => setBusy(false), 420)
          })
        })
      }, 280)
    },
    [busy, current]
  )

  const handlePrev = () => swapTo((current - 1 + N) % N, "backward")
  const handleNext = () => swapTo((current + 1) % N, "forward")

  const handleSideClick = (idx: number) => swapTo(idx, "forward")

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setIsPlaying(true)
    } else {
      v.pause()
      setIsPlaying(false)
    }
  }

  // ── derive animation classes ───────────────────────────────────────────────
  const mainTransformClass: Record<typeof animState, string> = {
    idle: "translate-x-0 opacity-100",
    "out-left": "-translate-x-16 opacity-0",
    "out-right": "translate-x-16 opacity-0",
    "in-right": "translate-x-16 opacity-0",
    "in-left": "-translate-x-16 opacity-0",
  }

  const show = SHOWS[current]
  const sideIndices = getSideIndices(current)

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 md:mb-16 tracking-wide">
          OUR PAST SHOWS
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">

          {/* ── Main Panel ───────────────────────────────────────────────── */}
          <div>
            {/* animated wrapper */}
            <div
              className={`transition-all duration-300 ease-in-out ${mainTransformClass[animState]}`}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Thumbnail / Video */}
              <div
                className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group bg-black"
                onClick={togglePlay}
              >
                <video
                  ref={videoRef}
                  preload="metadata"
                  playsInline
                  muted
                  loop
                  poster={show.poster}
                  className="w-full h-full object-cover"
                />

                {/* Play overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/35 transition-colors">
                      <PlayIcon size={22} />
                    </div>
                  </div>
                )}

                {/* Live dot */}
                <span className="absolute top-4 right-4 w-3 h-3 rounded-full bg-primary animate-pulse" />

                {/* Duration */}
                <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {timeDisplay}
                </span>
              </div>

              {/* Channel row */}
              <div className="flex items-center gap-3 mt-3 mb-2">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  LIVE
                </div>
                <div>
                  <p className="text-white font-semibold text-sm md:text-base">{show.channel}</p>
                  <p className="text-muted-foreground text-xs md:text-sm">{show.subscribers}</p>
                </div>
              </div>

              {/* Description card */}
              <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
                <h3 className="text-white font-semibold text-base md:text-lg mb-2">{show.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {show.description}{" "}
                  <span className="text-primary cursor-pointer hover:underline">Read More</span>
                </p>
              </div>
            </div>

            {/* Nav buttons — outside animated wrapper so they don't jump */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handlePrev}
                disabled={busy}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card text-white text-sm font-medium hover:border-primary/60 hover:bg-card/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                ← Prev
              </button>
              <button
                onClick={handleNext}
                disabled={busy}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card text-white text-sm font-medium hover:border-primary/60 hover:bg-card/80 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next →
              </button>
              <span className="ml-auto text-muted-foreground text-xs">
                {current + 1} / {N}
              </span>
            </div>
          </div>

          {/* ── Side List ────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            {sideIndices.map((vi, pos) => {
              const v = SHOWS[vi]
              return (
                <div
                  key={vi}
                  onClick={() => handleSideClick(vi)}
                  className="flex gap-4 bg-card rounded-xl p-3 md:p-4 border border-border hover:border-primary/50 transition-all cursor-pointer group"
                  style={
                    sideAnim
                      ? {
                          animation: `sideIn 0.38s ease both`,
                          animationDelay: `${pos * 75}ms`,
                        }
                      : {}
                  }
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 sm:w-32 md:w-40 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-black">
                    <Image
                      src={v.poster}
                      alt={v.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <PlayIcon size={14} />
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-semibold text-sm md:text-base mb-1 line-clamp-2">
                      {v.title}
                    </h4>
                    <p className="text-muted-foreground text-xs md:text-sm line-clamp-2">
                      {v.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>

      {/* Keyframe for side cards stagger-in */}
      <style>{`
        @keyframes sideIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}