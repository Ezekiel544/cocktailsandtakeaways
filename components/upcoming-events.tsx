"use client"

import Image from "next/image"
import { MapPin } from "lucide-react"
import { useEffect, useRef } from "react"

const events = {
  "June 2026": [
    {
      day: "07", dayName: "June, Friday",
      title: "Shongololo Shuffle: Desert Edition",
      artists: "Dewald Wasserfall, Ampie, Early B, Eloff",
      venue: "Millennium Al Rawdah Hotel | Abu Dhabi",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
    },
    {
      day: "10", dayName: "June, Monday",
      title: "Amr Diab", artists: "Amr Diab",
      venue: "Coca-Cola Arena | Dubai",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&h=200&fit=crop"
    },
    {
      day: "25", dayName: "June, Tuesday",
      title: "The Ocean", artists: "The Ocean",
      venue: "P7 Arena Media One Hotel, Dubai",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=300&h=200&fit=crop"
    }
  ],
  "July 2026": [
    {
      day: "05", dayName: "July, Friday",
      title: "Summer Beats Festival", artists: "Various Artists",
      venue: "Audi 2 | New Delhi",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=200&fit=crop"
    },
    {
      day: "14", dayName: "July, Sunday",
      title: "Matt Rife: ProbleMATTic World Tour", artists: "Matt Rife",
      venue: "Millennium Al Rawdah Hotel | Abu Dhabi",
      image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=300&h=200&fit=crop"
    }
  ]
}

export function UpcomingEvents() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[]

    const observers = cards.map((card) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            card.style.opacity = "1"
            card.style.transform = "translateX(0)"
          } else {
            card.style.opacity = "0"
            const isRight = card.dataset.direction === "right"
            card.style.transform = isRight ? "translateX(60px)" : "translateX(-60px)"
          }
        },
        {
          threshold: 0.5,
          rootMargin: "0px 0px -80px 0px"
        }
      )
      observer.observe(card)
      return observer
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  let cardIndex = 0

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-10 md:mb-16 tracking-wide">
          OUR UPCOMING EVENTS
        </h2>

        {Object.entries(events).map(([month, monthEvents]) => (
          <div key={month} className="mb-8 md:mb-12">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-4 md:mb-6">{month}</h3>
            <div className="space-y-4 md:space-y-6">
              {monthEvents.map((event, index) => {
                const direction = cardIndex % 2 === 0 ? "left" : "right"
                const currentIndex = cardIndex
                cardIndex++

                return (
                  <div
                    key={index}
                    ref={el => { cardRefs.current[currentIndex] = el }}
                    data-direction={direction}
                    style={{
                      opacity: 0,
                      transform: direction === "right" ? "translateX(60px)" : "translateX(-60px)",
                      transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
                    }}
                    className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 border border-border hover:border-primary/50 transition-colors group"
                  >
                    <div className="relative w-full sm:w-32 md:w-40 h-40 sm:h-24 md:h-28 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, 160px"
                        loading="lazy"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-1 md:mb-2">
                        <span className="text-primary text-2xl md:text-3xl font-bold">{event.day}</span>
                        <span className="text-muted-foreground text-sm md:text-base">{event.dayName}</span>
                      </div>
                      <h4 className="text-white text-lg md:text-xl font-semibold mb-1 truncate">{event.title}</h4>
                      <p className="text-muted-foreground text-xs md:text-sm mb-2">{event.artists}</p>
                      <div className="flex items-center gap-1 text-muted-foreground text-xs md:text-sm">
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>

                    <div className="w-full sm:w-auto flex-shrink-0 mt-2 sm:mt-0">
                      <button className="w-full sm:w-20 md:w-24 lg:w-28 h-12 sm:h-20 md:h-24 lg:h-28 rounded-full border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center sm:flex-col gap-1">
                        <span className="text-xs md:text-sm font-medium">Get Your</span>
                        <span className="text-xs md:text-sm font-medium">Ticket</span>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}