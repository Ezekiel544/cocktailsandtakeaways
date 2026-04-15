"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

const releases = [
  {
    name: "Zayn Malik",
    song: "Still Got Time - Etihad Arena",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop"
  },
  {
    name: "Neha Kakkar",
    song: "Puchda Hi Nahin - Etihad Arena",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop"
  },
  {
    name: "Justin Bieber",
    song: "Under The Mistletoe - Etihad Arena",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  }
]

const wobbleKeyframes = `
  @keyframes wobble {
    0%   { transform: rotate(0deg); }
    10%  { transform: rotate(-4deg); }
    20%  { transform: rotate(4deg); }
    30%  { transform: rotate(-3deg); }
    40%  { transform: rotate(3deg); }
    50%  { transform: rotate(-2deg); }
    60%  { transform: rotate(2deg); }
    70%  { transform: rotate(-1deg); }
    80%  { transform: rotate(1deg); }
    100% { transform: rotate(0deg); }
  }
  .vinyl-shaking {
    animation: wobble 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
  }
`

export function NewReleases() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Inject keyframes into the document head once
    const styleTag = document.createElement("style")
    styleTag.innerHTML = wobbleKeyframes
    document.head.appendChild(styleTag)

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const vinyls = sectionRef.current?.querySelectorAll<HTMLElement>(".vinyl-wrap")
    if (!vinyls) return

    const shake = (el: HTMLElement) => {
      el.classList.remove("vinyl-shaking")
      void el.offsetWidth
      el.classList.add("vinyl-shaking")
      el.addEventListener("animationend", () => el.classList.remove("vinyl-shaking"), { once: true })
    }

    const observers: IntersectionObserver[] = []

    vinyls.forEach((vinyl) => {
      if (isMobile) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                shake(vinyl)
              } else {
                vinyl.classList.remove("vinyl-shaking")
              }
            })
          },
          { threshold: 0.5 }
        )
        observer.observe(vinyl)
        observers.push(observer)
      } else {
        const onEnter = () => shake(vinyl)
        const onLeave = () => vinyl.classList.remove("vinyl-shaking")
        vinyl.addEventListener("mouseenter", onEnter)
        vinyl.addEventListener("mouseleave", onLeave)
      }
    })

    return () => {
      observers.forEach((o) => o.disconnect())
      document.head.removeChild(styleTag)
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-secondary/30">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-10 md:mb-16 tracking-wide">
          NEW RELEASES MUSIC
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {releases.map((release, index) => (
            <div key={index} className="flex flex-col items-center text-center group cursor-pointer">
              <div className="vinyl-wrap relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-2xl">
                  <div className="absolute inset-4 rounded-full border border-zinc-700/20" />
                  <div className="absolute inset-8 rounded-full border border-zinc-700/20" />
                  <div className="absolute inset-12 rounded-full border border-zinc-700/20" />
                  <div className="absolute inset-16 rounded-full border border-zinc-700/20" />
                  <div className="absolute top-[12%] right-[18%] w-1.5 h-1.5 bg-primary rounded-full" />
                  <div className="absolute bottom-[18%] left-[12%] w-1.5 h-1.5 bg-primary rounded-full" />
                  <div className="absolute top-[50%] right-[8%] w-1 h-1 bg-primary rounded-full" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[50%] h-[50%] rounded-full overflow-hidden relative shadow-2xl group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={release.image}
                      alt={release.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {release.name}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">{release.song}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}