"use client"

import { useState } from "react"
import Image from "next/image"
import Djimg from "./img/dj.png"
import Divido from "./img/divido.png"
import Wizkid from "./img/wizkid.png"

const comedians = [
  { number: "01", name: "Davido", date: "12 June", image: Divido },
  { number: "02", name: "Wizkid", date: "15 June", image: Wizkid },
  { number: "03", name: "Burnaboy", date: "15 June", image: Djimg },
  { number: "04", name: "Dave Chappelle", date: "20 June", image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=400&fit=crop" },
  { number: "05", name: "Tommy & Bridgesman", date: "24 June", image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop" }
]

export function HomeOfComedy() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            THE HOME OF MUSIC
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-sm md:text-base">
            Iconic venues like the Comedy have launched the careers of countless comedians, Chris Rock, and Amy Schumer.
          </p>
        </div>

        {/* Mobile Image — shows above list on small screens */}
        <div className="lg:hidden flex justify-center mb-8">
          <div className="relative w-44 h-52 rounded-xl overflow-hidden shadow-2xl transition-all duration-300"
            style={{ transform: `rotate(${4 + activeIndex * 2}deg)` }}
          >
            <Image
              src={comedians[activeIndex].image}
              alt={comedians[activeIndex].name}
              fill
              className="object-cover transition-all duration-300"
            />
            <div className="absolute inset-0 border-4 border-white rounded-xl" />
          </div>
        </div>

        {/* List */}
        <div className="relative">
          {/* Desktop Floating Image */}
          <div
            className="hidden lg:block absolute right-[20%] top-1/2 -translate-y-1/2 w-48 h-56 md:w-56 md:h-64 rounded-xl overflow-hidden shadow-2xl z-10 transition-all duration-300"
            style={{ transform: `translateY(-50%) rotate(${6 + activeIndex * 2}deg)` }}
          >
            <Image
              src={comedians[activeIndex].image}
              alt={comedians[activeIndex].name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 border-4 border-white rounded-xl" />
          </div>

          {/* List Items */}
          <div className="space-y-0">
            {comedians.map((comedian, index) => (
              <div
                key={index}
                className={`border-b border-white/20 py-4 md:py-6 flex items-center justify-between cursor-pointer transition-colors px-2 md:px-4 -mx-2 md:-mx-4 rounded ${
                  activeIndex === index ? "bg-white/10" : "hover:bg-white/5"
                }`}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-white/60 text-xs md:text-sm w-6 md:w-8">{comedian.number}</span>
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide">
                    {comedian.name}
                  </h3>
                </div>
                <span className="text-white/80 text-sm md:text-base">{comedian.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}