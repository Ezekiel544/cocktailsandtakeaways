"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Globe, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/tour", label: "Tour" },
  { href: "/podcast", label: "Podcast" },
  { href: "/patreon", label: "Patreon" },
  { href: "/merch", label: "Merch" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center gap-1">
              <span className="text-primary text-2xl font-bold">C</span>
              <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="text-white">
                <path d="M10 0L20 6V18L10 24L0 18V6L10 0Z" fill="currentColor" />
                <circle cx="10" cy="8" r="3" fill="#e63946" />
                <path d="M6 14H14V16H6V14Z" fill="#e63946" />
                <path d="M4 18H16V20H4V18Z" fill="#e63946" />
              </svg>
              <span className="text-white text-2xl font-bold tracking-tight">cktails</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-white hover:text-primary transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full border border-border hover:border-primary transition-colors">
              <Search className="w-5 h-5 text-white" />
            </button> */}
            <button className="hidden md:flex w-10 h-10 items-center justify-center rounded-full border border-border hover:border-primary transition-colors">
              <Globe className="w-5 h-5 text-white" />
            </button>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 hidden md:flex">
              Get ticket
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-white hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                {/* <button className="w-10 h-10 flex items-center justify-center rounded-full border border-border">
                  <Search className="w-5 h-5 text-white" />
                </button> */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-border">
                  <Globe className="w-5 h-5 text-white" />
                </button>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 flex-1">
                  Get ticket
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
