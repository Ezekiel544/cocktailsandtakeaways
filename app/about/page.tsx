import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-wide mb-6">
            ABOUT <span className="text-primary">US</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto">
            We bring the best live experiences to life — from sold-out concerts to intimate shows, we are your gateway to unforgettable nights.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-20 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Story</h2>
              <p className="text-muted-foreground text-base md:text-lg mb-4 leading-relaxed">
                Cocktails & Takeaways was born out of a simple idea — great music deserves a great experience. What started as a small events crew has grown into one of the most exciting live event platforms around.
              </p>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                We curate, organise and promote live concerts, tours, and festivals featuring both local and international acts. Every event we touch is designed to leave you wanting more.
              </p>
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-border">
              <img
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop"
                alt="Concert crowd"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Live First", desc: "Nothing beats the energy of a live show. We exist to create those moments." },
              { title: "Community", desc: "We build spaces where music lovers come together and connect." },
              { title: "Authenticity", desc: "Every artist we work with is handpicked for their genuine talent and stage presence." },
              { title: "Access", desc: "Great live music should be accessible to everyone, not just the few." },
              { title: "Experience", desc: "From the venue to the setlist, every detail of your night matters to us." },
              { title: "Culture", desc: "We celebrate the full spectrum of music culture — local and global." },
            ].map((item, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Events Hosted" },
              { number: "1M+", label: "Tickets Sold" },
              { number: "200+", label: "Artists Featured" },
              { number: "15+", label: "Cities Reached" },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-white/70 text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}