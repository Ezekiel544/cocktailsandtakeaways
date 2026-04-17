import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Play, Clock, Calendar } from "lucide-react"
import Concerttwo from '../img/concert.png'

const episodes = [
  {
    number: "EP 12",
    title: "Behind The Stage: How Live Events Really Work",
    guest: "With Femi Kuti",
    duration: "1hr 12min",
    date: "Apr 2026",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400&h=400&fit=crop"
  },
  {
    number: "EP 11",
    title: "From Underground to Arena: The African Music Rise",
    guest: "With Burna Boy's Manager",
    duration: "58min",
    date: "Mar 2026",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop"
  },
  {
    number: "EP 10",
    title: "Festival Culture & What Fans Really Want",
    guest: "With DJ Neptune",
    duration: "1hr 4min",
    date: "Mar 2026",
    image: Concerttwo.src,
  },
  {
    number: "EP 09",
    title: "Touring Across Africa: Challenges & Wins",
    guest: "With Tiwa Savage",
    duration: "1hr 20min",
    date: "Feb 2026",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop"
  },
  {
    number: "EP 08",
    title: "The Business of Music Ticketing",
    guest: "With Industry Insiders",
    duration: "47min",
    date: "Feb 2026",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=400&fit=crop"
  },
  {
    number: "EP 07",
    title: "Crowd Energy & Stage Presence",
    guest: "With Davido",
    duration: "1hr 35min",
    date: "Jan 2026",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=400&fit=crop"
  },
]

export default function PodcastPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-wide mb-6">
            THE <span className="text-background">PODCAST</span>
          </h1>
          <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto mb-8">
            Deep conversations about live music, culture, and the business behind the stage. New episodes every two weeks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["Spotify", "Apple Podcasts", "YouTube"].map((platform) => (
              <button key={platform} className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/20">
                Listen on {platform}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">All Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {episodes.map((ep, index) => (
              <div key={index} className="bg-card rounded-2xl p-5 border border-border hover:border-primary/50 transition-colors group flex gap-4">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-primary text-xs font-bold">{ep.number}</span>
                  <h3 className="text-white font-semibold text-sm md:text-base mt-1 mb-1 line-clamp-2">{ep.title}</h3>
                  <p className="text-muted-foreground text-xs mb-3">{ep.guest}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{ep.duration}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{ep.date}</span>
                    </div>
                    <button className="ml-auto w-8 h-8 rounded-full bg-primary/20 hover:bg-primary flex items-center justify-center transition-colors group">
                      <Play className="w-3 h-3 text-primary group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}