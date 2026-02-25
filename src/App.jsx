import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Philosophy from './components/Philosophy'
import Protocol from './components/Protocol'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

function App() {
  return (
    <div className="min-h-screen bg-cream text-charcoal">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}

export default App
