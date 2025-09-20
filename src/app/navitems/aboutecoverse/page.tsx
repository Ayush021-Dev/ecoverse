export default function AboutEcoverse() {
  return (
    <section id="about-ecoverse" className="relative z-10 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
              ABOUT ECOVERSE
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A 48-hour sustainability hackathon bringing together innovators to solve real-world environmental challenges.
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">What is EcoVerse?</h3>
              <p className="text-gray-200 mb-4">
                EcoVerse 2025 is VIT Chennai's flagship sustainability hackathon that challenges participants to develop innovative solutions for environmental problems.
              </p>
              <p className="text-gray-200">
                Join 500+ participants in creating technology-driven solutions that align with UN Sustainable Development Goals.
              </p>
            </div>
            <div className="bg-gradient-to-br from-emerald-800/50 to-green-800/50 border-2 border-emerald-400/30 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center text-emerald-400">
                <div className="text-4xl mb-2">🌍</div>
                <p className="text-sm">EcoVerse Event</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
