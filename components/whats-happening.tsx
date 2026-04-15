"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import Djimg  from "./img/dj.png"
const artists = [
  {
    name: "Ed Sheeran",
    venue: "Live At Coca - Cola Arena",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  },
  {
    name: "Selena Gomez",
    venue: "Live At Etihad Arena",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop"
  },
  {
    name: "Dj Snake",
    venue: "Live At Coca - Cola Arena",
    image: Djimg 
  }
]

export function WhatsHappening() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    const resetCards = () => {
      cards.forEach(card => {
        card.style.opacity = "0"
        card.style.transform = "translateY(60px)"
        card.style.transitionDelay = "0ms"
      })
    }

    const animateCards = () => {
      cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 350}ms`
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
      })
    }

    resetCards()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCards()
        } else {
          resetCards()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px"
      }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 md:mb-16 tracking-wide">
          WHAT&apos;S HAPPENING?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {artists.map((artist, index) => (
            <div
              key={index}
              ref={el => { cardRefs.current[index] = el }}
              style={{
                opacity: 0,
                transform: "translateY(60px)",
                transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
              }}
              className="group relative bg-card rounded-xl md:rounded-2xl p-6 md:p-8 border border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              {/* Vinyl Record Effect */}
              <div className="relative w-full aspect-square mb-6">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-xl">
                  <div className="absolute inset-4 rounded-full border border-zinc-700/30" />
                  <div className="absolute inset-8 rounded-full border border-zinc-700/30" />
                  <div className="absolute inset-12 rounded-full border border-zinc-700/30" />
                  <div className="absolute inset-16 rounded-full border border-zinc-700/30" />
                  <div className="absolute inset-20 rounded-full border border-zinc-700/30" />
                  <div className="absolute top-[15%] right-[20%] w-1 h-1 bg-primary rounded-full" />
                  <div className="absolute bottom-[20%] left-[15%] w-1 h-1 bg-primary rounded-full" />
                  <div className="absolute top-[25%] left-[25%] w-0.5 h-0.5 bg-primary rounded-full" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[45%] h-[45%] rounded-full overflow-hidden relative shadow-2xl group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{artist.name}</h3>
              <p className="text-muted-foreground text-sm md:text-base">{artist.venue}</p>

              <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}