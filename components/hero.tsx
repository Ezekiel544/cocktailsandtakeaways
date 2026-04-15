"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Concert from "./img/concert.png"
const slides = [
  {
    artist: "OLIVIA RODRIGO",
    description: "Don't miss Olivia Rodrigo's hits live! Secure your seats today for an unforgettable night of music, emotion, and energy!",
    cta: "Ticket On Sale Now",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6WJVL8hVjnllbJHIIukg4WXM3Cv0mE.png"
  },
  {
    artist: "ED SHEERAN",
    description: "Experience the magic of Ed Sheeran live! Get ready for an intimate evening of acoustic perfection and chart-topping hits!",
    cta: "Get Tickets",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KajcLy3sbBOnRmWQIeGVVxb66ndAwK.png"
  },
  {
    artist: "THE WEEKND",
    description: "After Hours Til Dawn Tour! Witness The Weeknd's spectacular visual performance and iconic soundscapes!",
    cta: "Book Now",
    image: Concert
  }
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
        setIsTransitioning(false)
      }, 500)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSlideChange = (index: number) => {
    if (index === currentSlide) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentSlide(index)
      setIsTransitioning(false)
    }, 300)
  }

  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-16 lg:pt-20">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.artist}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          {/* Dark overlay that blends with black */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80" />
          <div className="absolute inset-0 bg-background/30" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <div className={`max-w-4xl mx-auto transition-all duration-500 ${
          isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
        }`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4 md:mb-6 tracking-wide text-balance drop-shadow-lg">
            {slides[currentSlide].artist}
          </h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 md:mb-8 px-4 text-pretty drop-shadow-md">
            {slides[currentSlide].description}
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg font-semibold shadow-lg"
          >
            {slides[currentSlide].cta}
          </Button>

          {/* Slide indicators */}
          <div className="flex items-center justify-center gap-2 mt-8 md:mt-12">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? "bg-primary w-4 sm:w-6" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
