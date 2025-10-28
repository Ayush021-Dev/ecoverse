import Image from 'next/image'
import Link from 'next/link'
import Navbar from './components/Navbar/Navbar'
import AboutEcoverse from './components/aboutecoverse'
import Sponsorship from './components/sponsorship'
import Coordinators from './components/coordinators'
import Contact from './components/contact'
import Vitmap from './components/vitmap'
import Tracks from './components/tracks'
import About from './components/about'
import Timeline from './components/timeline'

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-emerald-950 to-black relative overflow-hidden">
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" className="animate-pulse">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10b981" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-emerald-400/30 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-lime-500/20 clip-triangle animate-bounce"></div>

        {/* Additional floating elements for longer page */}
        <div className="absolute" style={{ top: '150vh', left: '10%' }}>
          <div className="w-20 h-20 border border-emerald-400/20 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute" style={{ top: '250vh', right: '15%' }}>
          <div className="w-16 h-16 bg-green-400/10 rotate-12 animate-drift-left"></div>
        </div>
        <div className="absolute" style={{ top: '350vh', left: '20%' }}>
          <div className="w-12 h-12 border-2 border-lime-400/20 rotate-45 animate-spin-slow"></div>
        </div>
        <div className="absolute" style={{ top: '450vh', right: '25%' }}>
          <div className="w-14 h-14 bg-emerald-400/10 rounded-full animate-pulse"></div>
        </div>
      </div>

      <Navbar />

      {/* Hero Section with top padding to account for fixed header */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24">

        {/* Innovative Tree Icon */}
        <div className="mb-6 relative w-80 h-80 mx-auto flex items-center justify-center">
          <div className="absolute w-full h-full rounded-full bg-white/15 blur-2xl z-0"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg z-10">
            <Image
              src="/club-logo.png"
              alt="Biosphere Logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
        </div>

        {/* BIOSPHERE CLUB Text */}
        <div className="mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-300 tracking-wider text-center">
            BIOSPHERE CLUB
          </h2>
          <div className="flex items-center justify-center space-x-4 mt-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-emerald-400"></div>
            <span className="text-sm text-emerald-300 font-light italic">presents</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-emerald-400"></div>
          </div>
        </div>

        {/* Modern Title with Gradient */}
        <div className="text-center mb-8">
          <h1 className="text-7xl md:text-9xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
              ECO
            </span>
            <span className="bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 bg-clip-text text-transparent animate-gradient-x-reverse">
              VERSE
            </span>
          </h1>

          <div className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wider">
            <span className="text-emerald-400">20</span>25
          </div>
        </div>

        {/* Modern Date Display */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 backdrop-blur-lg border border-emerald-400/30 rounded-3xl px-12 py-6 shadow-2xl">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-emerald-300 mb-2">
                5th - 6th NOVEMBER
              </div>
              <div className="text-gray-400 text-sm">
                24 Hours of Innovation
              </div>
            </div>
          </div>
        </div>

        {/* Theme Box - Ultra Modern */}
        <div className="mb-8 group">
          <div className="relative bg-gradient-to-r from-emerald-950/80 to-green-950/80 backdrop-blur-xl border-2 border-emerald-400/50 rounded-3xl p-8 md:p-12 max-w-4xl shadow-2xl shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-green-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative text-center">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-wide">
                SUSTAINABILITY
              </h2>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-emerald-400"></div>
                <span className="text-xl text-emerald-300 font-light">MEETS</span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-emerald-400"></div>
              </div>
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-300 to-lime-400 bg-clip-text text-transparent tracking-wide">
                INNOVATION
              </h2>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400/50"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400/50"></div>
          </div>
        </div>

        {/* Registration Fees */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-emerald-900/50 to-green-900/50 backdrop-blur-lg border border-emerald-400/30 rounded-2xl px-8 py-6 max-w-2xl mx-auto shadow-xl">
            <div className="text-center">
              <div className="text-gray-300 text-sm mb-2 tracking-wide">REGISTRATION FEE</div>
              <div className="text-4xl md:text-5xl font-black text-emerald-400 mb-2">
                ₹200
              </div>
              <div className="text-gray-400 text-xs">Per Team (2-4 members)</div>
            </div>
          </div>
        </div>

        {/* Modern CTA Buttons */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-8 w-full max-w-md md:max-w-none mx-auto md:justify-center">
          <Link href="/create-team" passHref className="w-full md:w-auto">
            <button className="w-full group relative px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full overflow-hidden shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10">Register Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>

          <Link href="#tracks" passHref className="w-full md:w-auto">
            <button className="w-full group relative px-10 py-4 border-2 border-emerald-400 text-emerald-400 font-bold rounded-full overflow-hidden hover:text-black transition-all duration-300 transform hover:scale-105">
              <span className="relative z-10">Explore Tracks</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 md:gap-16 mb-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400">300+</div>
            <div className="text-gray-400 text-xs md:text-sm">Participants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-green-400">10+</div>
            <div className="text-gray-400 text-xs md:text-sm">Internships</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-lime-400">24</div>
            <div className="text-gray-400 text-xs md:text-sm">Hours</div>
          </div>
        </div>


      </main>

      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-${i % 3 + 1}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div className="w-1 h-1 bg-emerald-400 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Enhanced Background Pattern with Left Side Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg width="100%" height="100%" className="animate-pulse">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#10b981" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Large Glowing Orb - Top Left */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-green-400/5 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>

        {/* Small Accent Dots - Left Side */}
        <div className="absolute top-32 left-32 w-4 h-4 bg-emerald-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-48 left-8 w-2 h-2 bg-green-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-64 left-24 w-3 h-3 bg-lime-400/35 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Hexagon Shape - Left Middle */}
        <div className="absolute top-1/2 left-4 w-12 h-12 animate-drift-left" style={{ animationDelay: '3s' }}>
          <svg viewBox="0 0 24 24" className="w-full h-full opacity-20">
            <path d="M17.5 3.5L22 12L17.5 20.5H6.5L2 12L6.5 3.5H17.5Z" stroke="#10b981" strokeWidth="1" fill="rgba(16, 185, 129, 0.05)" />
          </svg>
        </div>
      </div>

      <div className="space-y--12"> 
        <AboutEcoverse />
        <Tracks />
        <Timeline />
        <Sponsorship />
        <About />
        <Coordinators />
        <Vitmap />
        <Contact />
      </div>

      {/* Footer */}
      <div className="text-center text-gray-500 text-sm">
        <p>Organized by <span className="text-emerald-400 font-semibold">Biosphere Club</span> • VIT Chennai</p>
      </div>

    </div>


  )
}