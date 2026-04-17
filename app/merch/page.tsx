import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingBag } from "lucide-react"
import Concertimg from '../img/concert.png'
import Concerttwo from '../img/concerttwo.png'
import Concertthree from '../img/concertthree.png'
import Concertfour from '../img/concertfour.png'
import Concertfive from '../img/concertfive.png'
import Concertsix from '../img/concertsix.png'
import Concertseven from '../img/concertseven.png'
const products = [
  {
    name: "Classic Logo Tee",
    price: "$35",
    category: "T-Shirts",
    image: Concertfive.src,
    badge: "Bestseller",
  },
  {
    name: "Festival Hoodie",
    price: "$65",
    category: "Hoodies",
    image: Concerttwo.src,
    badge: "New",
  },
  {
    name: "Tour Cap",
    price: "$28",
    category: "Accessories",
    image: Concertsix.src,
    badge: null,
  },
  {
    name: "Event Poster Print",
    price: "$20",
    category: "Prints",
    image: Concertthree.src,
    badge: "Limited",
  },
  {
    name: "C&T Tote Bag",
    price: "$18",
    category: "Accessories",
    image: Concertfour.src,
    badge: null,
  },
  {
    name: "Vinyl Collector Box",
    price: "$85",
    category: "Collectibles",
    image: Concertseven.src,
    badge: "Limited",
  },
]

export default function MerchPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-card border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-wide mb-6">
            THE <span className="text-primary">MERCH STORE</span>
          </h1>
          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto">
            Wear the culture. Official Cocktails & Takeaways gear — limited drops, quality pieces.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors group cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full ${
                      product.badge === "New"
                        ? "bg-primary text-white"
                        : product.badge === "Limited"
                        ? "bg-yellow-500/90 text-black"
                        : "bg-white text-black"
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-muted-foreground text-xs">{product.category}</span>
                  <h3 className="text-white font-semibold text-sm md:text-base mt-1 mb-3">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-base md:text-lg">{product.price}</span>
                    <button className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary flex items-center justify-center transition-colors group">
                      <ShoppingBag className="w-4 h-4 text-primary group-hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Free Shipping on Orders Over $75</h2>
          <p className="text-white/80 mb-6">Limited edition drops sell out fast. Don't sleep on it.</p>
          <button className="px-8 py-3 rounded-full bg-white text-primary font-semibold hover:bg-white/90 transition-colors">
            Shop All Merch
          </button>
        </div>
      </section>

      <Footer />
    </main>
  )
}