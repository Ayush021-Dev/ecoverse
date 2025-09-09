export default function Home() {
  return (
    <div className="min-h-screen eco-gradient pattern-bg">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 backdrop-blur-sm bg-slate-900/50 border-b border-emerald-400/20">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-slate-900 font-bold text-lg">17</span>
          </div>
          <h1 className="text-emerald-400 text-xl font-bold">EcoVerse</h1>
        </div>
        
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-white hover:text-emerald-400 transition-colors">Home</a>
          <a href="#about" className="text-white hover:text-emerald-400 transition-colors">About</a>
          <a href="#schedule" className="text-white hover:text-emerald-400 transition-colors">Schedule</a>
          <a href="#sponsors" className="text-white hover:text-emerald-400 transition-colors">Sponsors</a>
          <a href="#register" className="text-white hover:text-emerald-400 transition-colors">Register</a>
        </div>
        
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all glow-green">
          Register Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          {/* Tree Icon Placeholder */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6 glow-green">
            <div className="text-slate-900 text-3xl">🌱</div>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-emerald-400 mb-4">
          BIOSPHERE CLUB
        </h1>
        <p className="text-white/70 text-xl mb-2">presents</p>
        
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
          ECO<span className="text-emerald-400">VERSE</span>
        </h2>
        
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className="h-0.5 w-16 bg-gradient-to-r from-transparent to-emerald-400"></div>
          <span className="text-emerald-400 text-2xl">2025</span>
          <div className="h-0.5 w-16 bg-gradient-to-l from-transparent to-emerald-400"></div>
        </div>
        
        <div className="text-3xl md:text-4xl text-white font-light mb-12">
          5th - 6th<br />
          <span className="text-emerald-400">NOVEMBER</span>
        </div>
        
        <div className="inline-block bg-slate-800/50 backdrop-blur-sm border border-emerald-400/30 rounded-2xl p-8 mb-12 glow-green">
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">SUSTAINABILITY</h3>
          <p className="text-xl text-white">MEETS</p>
          <h3 className="text-2xl md:text-3xl font-bold text-emerald-400">INNOVATION</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all glow-green">
            Register for Hackathon
          </button>
          <button className="border border-emerald-400 text-emerald-400 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-400/10 transition-all">
            Learn More
          </button>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-6 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-slate-900 text-xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">SDG 17 Focus</h3>
            <p className="text-white/70">Partnership for sustainable development goals</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-6 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-slate-900 text-xl">💡</span>
            </div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">Innovation</h3>
            <p className="text-white/70">Cutting-edge solutions for environmental challenges</p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-emerald-400/20 rounded-xl p-6 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-slate-900 text-xl">🌍</span>
            </div>
            <h3 className="text-xl font-bold text-emerald-400 mb-2">Global Impact</h3>
            <p className="text-white/70">Solutions that make a difference worldwide</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-400/20 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg"></div>
                <span className="text-emerald-400 text-lg font-bold">EcoVerse</span>
              </div>
              <p className="text-white/70 text-sm">Sustainability meets innovation</p>
            </div>
            
            <div>
              <h4 className="text-emerald-400 font-semibold mb-4">Event</h4>
              <ul className="space-y-2 text-white/70 text-sm">
                <li>Schedule</li>
                <li>Tracks</li>
                <li>Prizes</li>
                <li>Rules</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-emerald-400 font-semibold mb-4">Contact</h4>
              <a href="#" className="flex items-center space-x-3 text-white/70 hover:text-emerald-400 transition-colors group">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}