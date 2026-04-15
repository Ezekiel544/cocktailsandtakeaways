import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { EmailSignup } from "@/components/email-signup"
import { UpcomingEvents } from "@/components/upcoming-events"
import { WhatsHappening } from "@/components/whats-happening"
import { PastShows } from "@/components/past-shows"
import { NewReleases } from "@/components/new-releases"
import { HomeOfComedy } from "@/components/home-of-comedy"
import { TicketCTA } from "@/components/ticket-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden w-full">
      <Header />
      <Hero />
      <EmailSignup />
      <UpcomingEvents />
      <WhatsHappening />
      <PastShows />
      <NewReleases />
      <HomeOfComedy />
      <TicketCTA />
      <Footer />
    </main>
  )
}
