import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Fan",
    price: "$5",
    period: "/ month",
    description: "For the casual fan who wants to stay in the loop.",
    perks: [
      "Early access to event announcements",
      "Monthly newsletter",
      "Behind-the-scenes content",
      "Patron-only Discord access",
    ],
    highlight: false,
  },
  {
    name: "Superfan",
    price: "$15",
    period: "/ month",
    description: "For the die-hard who never misses a show.",
    perks: [
      "Everything in Fan",
      "Priority ticket access",
      "Exclusive podcast episodes",
      "Monthly Q&A with the team",
      "10% merch discount",
    ],
    highlight: true,
  },
  {
    name: "VIP",
    price: "$35",
    period: "/ month",
    description: "The full experience — backstage and beyond.",
    perks: [
      "Everything in Superfan",
      "VIP meet & greet passes",
      "Signed merch drops",
      "Name in event credits",
      "Private group chat with artists",
    ],
    highlight: false,
  },
]

export default function PatreonPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-wide mb-6">
            SUPPORT <span className="text-primary">THE MOVEMENT</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto">
            Join our Patreon and get exclusive access to content, events, and experiences you won't find anywhere else.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 md:p-8 border transition-colors flex flex-col ${
                  tier.highlight
                    ? "bg-primary border-primary shadow-2xl shadow-primary/20 scale-105"
                    : "bg-card border-border hover:border-primary/50"
                }`}
              >
                {tier.highlight && (
                  <span className="text-xs font-bold bg-white text-primary px-3 py-1 rounded-full self-start mb-4">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-white text-2xl font-bold mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className={tier.highlight ? "text-white/70" : "text-muted-foreground"}>{tier.period}</span>
                </div>
                <p className={`text-sm mb-6 ${tier.highlight ? "text-white/80" : "text-muted-foreground"}`}>
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? "text-white" : "text-primary"}`} />
                      <span className={`text-sm ${tier.highlight ? "text-white/90" : "text-muted-foreground"}`}>{perk}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold text-sm transition-all ${
                    tier.highlight
                      ? "bg-white text-primary hover:bg-white/90"
                      : "border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  Join as {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why support */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Your Support Matters</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-4">
            Every membership directly funds the events, production, and artists that make this platform possible. Without supporters like you, the shows don't happen.
          </p>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            You're not just a fan — you're part of the crew.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}