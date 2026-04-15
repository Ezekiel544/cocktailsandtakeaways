"use client"

import Link from "next/link"
import { Facebook, Instagram, MapPin, ChevronDown } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-1">
              <span className="text-primary text-xl font-bold">C</span>
              <svg width="16" height="20" viewBox="0 0 20 24" fill="none" className="text-white">
                <path d="M10 0L20 6V18L10 24L0 18V6L10 0Z" fill="currentColor" />
                <circle cx="10" cy="8" r="3" fill="#e63946" />
                <path d="M6 14H14V16H6V14Z" fill="#e63946" />
                <path d="M4 18H16V20H4V18Z" fill="#e63946" />
              </svg>
              <span className="text-white text-xl font-bold tracking-tight">cktails</span>
            </div>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <Link href="#" className="text-white hover:text-primary transition-colors text-sm">
              Terms of Use
            </Link>
            <Link href="#" className="text-white hover:text-primary transition-colors text-sm">
              Cookies
            </Link>
            <Link href="#" className="text-white hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
          </nav>

          {/* Social & Location */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <Link href="#" className="w-8 h-8 rounded-full border border-border hover:border-primary flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-white" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-border hover:border-primary flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-border hover:border-primary flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </Link>
              <Link href="#" className="w-8 h-8 rounded-full border border-border hover:border-primary flex items-center justify-center transition-colors">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </Link>
            </div>

            {/* Location Selector */}
            <button className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2 hover:bg-secondary/80 transition-colors">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-white text-sm">Nigeria</span>
              <ChevronDown className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-muted-foreground text-xs md:text-sm">
            @ 2026 cocktailsandtakeaways, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
