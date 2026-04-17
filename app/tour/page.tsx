import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MapPin } from "lucide-react"

const tours = [
  { date: "07 June", title: "Shongololo Shuffle: Desert Edition", venue: "Millennium Al Rawdah Hotel", city: "Abu Dhabi", status: "Available" },
  { date: "10 June", title: "Amr Diab Live", venue: "Coca-Cola Arena", city: "Dubai", status: "Available" },
  { date: "25 June", title: "The Ocean", venue: "P7 Arena Media One Hotel", city: "Dubai", status: "Selling Fast" },
  { date: "05 July", title: "Summer Beats Festival", venue: "Audi 2", city: "New Delhi", status: "Available" },
  { date: "14 July", title: "Matt Rife: ProbleMATTic World Tour", venue: "Millennium Al Rawdah Hotel", city: "Abu Dhabi", status: "Sold Out" },
  { date: "22 August", title: "Afrobeats Night Live", venue: "Eko Convention Centre", city: "Lagos", status: "Available" },
  { date: "30 August", title: "Urban Sound Festival", venue: "Tafawa Balewa Square", city: "Lagos", status: "Selling Fast" },
]

export default function TourPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-wide mb-6">
            TOUR <span className="text-primary">DATES</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto">
            Find a show near you. From intimate venues to massive arenas — we've got a night for every music lover.
          </p>
        </div>
      </section>

      {/* Tour List */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-4">
            {tours.map((tour, index) => (
              <div
                key={index}
                className="bg-card rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-border hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-primary text-xl md:text-2xl font-bold w-20 flex-shrink-0">{tour.date}</span>
                  <div>
                    <h3 className="text-white font-bold text-base md:text-lg">{tour.title}</h3>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{tour.venue}, {tour.city}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    tour.status === "Sold Out"
                      ? "bg-red-500/20 text-red-400"
                      : tour.status === "Selling Fast"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-primary/20 text-primary"
                  }`}>
                    {tour.status}
                  </span>
                  <button
                    disabled={tour.status === "Sold Out"}
                    className="flex-1 sm:flex-none px-6 py-2 rounded-full border-2 border-primary/30 hover:border-primary text-primary hover:bg-primary hover:text-white transition-all text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-primary"
                  >
                    {tour.status === "Sold Out" ? "Sold Out" : "Get Ticket"}
                  </button>
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