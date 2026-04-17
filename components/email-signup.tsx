"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, User, ArrowRight, Check } from "lucide-react"

export function EmailSignup() {
  const [firstName, setFirstName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !email) return

    setIsLoading(true)
    setError("")

    try {
      const res = await fetch("/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.")
        return
      }

      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        setFirstName("")
        setEmail("")
      }, 4000)

    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-6 sm:p-8 md:p-10 border border-border shadow-xl">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6 md:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                    Be the First to Know
                  </h2>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    Join our exclusive list and get early access to tickets, special offers, and event announcements.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-10 h-12 sm:h-14 bg-secondary border-border text-white placeholder:text-muted-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 sm:h-14 bg-secondary border-border text-white placeholder:text-muted-foreground rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 sm:h-14 bg-primary hover:bg-primary/90 text-white font-semibold text-base sm:text-lg rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Joining...
                      </span>
                    ) : (
                      <>
                        Join the List
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>

                <p className="text-center text-muted-foreground text-xs sm:text-sm mt-4">
                  By signing up, you agree to receive email updates. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the List!</h3>
                <p className="text-muted-foreground">
                  Thanks for signing up, {firstName}! We&apos;ll keep you updated on the latest events.
                </p>
                <p className="text-muted-foreground/50 text-xs mt-4">
                  This form will reset in a few seconds...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}