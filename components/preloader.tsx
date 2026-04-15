"use client"

import { useState, useEffect } from "react"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // Start exit animation after 2.5 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true)
    }, 2500)

    // Remove preloader after exit animation
    const removeTimer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isLoading) return null

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white overflow-hidden">
          <span className="inline-block animate-text-reveal">
            {"cocktailsandtakeaways".split("").map((char, index) => (
              <span
                key={index}
                className="inline-block animate-letter-pop"
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>
        
        {/* Loading bar */}
        <div className="mt-8 w-48 sm:w-64 h-1 bg-border rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-loading-bar" />
        </div>
      </div>

      <style jsx>{`
        @keyframes letter-pop {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          50% {
            opacity: 1;
            transform: translateY(-5px) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes loading-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        
        .animate-letter-pop {
          animation: letter-pop 0.4s ease-out forwards;
          opacity: 0;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}
