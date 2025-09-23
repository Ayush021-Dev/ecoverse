export default function Tracks() {
  
  const tracks = [
    {
      id: "01",
      title: "Sustainable Environment & Resource Management",
      sdgs: ["SDG 7", "SDG 13", "SDG 6", "SDG 12", "SDG 14", "SDG 15"],
      description: "Focuses on renewable energy, climate action, water conservation, sustainable consumption, marine and terrestrial ecosystems.",
      details: "Problem statements may include challenges in energy efficiency, waste reduction, water conservation, biodiversity protection, or climate resilience."
    },
    {
      id: "02", 
      title: "Society, Partnerships & Governance",
      sdgs: ["SDG 1", "SDG 2", "SDG 4", "SDG 5", "SDG 10", "SDG 8", "SDG 16", "SDG 17"],
      description: "Focuses on poverty alleviation, food security, education, gender equality, reduced inequalities, decent work, peace, justice, and global partnerships.",
      details: "Problem statements may involve inclusive educational platforms, women empowerment initiatives, community welfare models, digital governance, or fostering equitable economic opportunities."
    },
    {
      id: "03",
      title: "Quality of Life & Human Empowerment", 
      sdgs: ["SDG 9", "SDG 11", "SDG 3"],
      description: "Focuses on industry and innovation, sustainable cities, healthcare, and overall well-being.",
      details: "Problem statements under this stream may focus on medical technology, smart city solutions, affordable healthcare, urban mobility, or digital tools that enhance everyday living."
    }
  ]

  return (
    
    <section id="tracks" className="relative z-10">
      <div className="relative z-10 min-h-screen">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0">
          

          {/* Floating Background Elements */}
          <div className="absolute top-20 right-20 w-32 h-32 border-2 border-emerald-400/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-32 left-16 w-24 h-24 bg-gradient-to-r from-green-400/20 to-emerald-600/20 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-lime-500/20 clip-triangle animate-bounce"></div>
          
          {/* Left Side Subtle Elements */}
          <div className="absolute top-40 left-10 w-60 h-60 bg-gradient-to-br from-emerald-500/10 via-green-400/5 to-transparent rounded-full blur-3xl animate-glow-pulse"></div>
          <div className="absolute top-2/3 left-20 w-32 h-32 bg-gradient-to-r from-emerald-400/15 to-lime-400/10 rounded-2xl rotate-12 animate-drift-left blur-sm"></div>
        </div>

        {/* Main Content */}
        <main className="relative z-10 px-6 py-12 pt-24">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
                  INNOVATION
                </span>
              </h1>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                TRACKS
              </h2>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-300 leading-relaxed">
                Choose your path to create sustainable solutions that address global challenges and drive meaningful change.
              </p>
              <div className="flex items-center justify-center space-x-4 mt-6">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400"></div>
                <span className="text-emerald-400 font-semibold">3 Tracks Available</span>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-400"></div>
              </div>
            </div>
          </div>

          {/* Tracks Grid */}
          <div className="max-w-6xl mx-auto space-y-8">
            {tracks.map((track) => (
              <div key={track.id} className="group">
                {/* Track Card - Matching Your Image Style */}
                <div className="relative bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 transform hover:scale-[1.02]">
                  
                  {/* Track Number Badge */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-gradient-to-r from-lime-400 to-emerald-500 text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                      TRACK {track.id}
                    </div>
                  </div>

                  {/* Corner Decorative Lines */}
                  <div className="absolute top-4 right-4 w-8 h-8">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-emerald-400/60 rounded-full"></div>
                    <div className="absolute top-0 right-0 w-0.5 h-full bg-emerald-400/60 rounded-full"></div>
                  </div>
                  <div className="absolute bottom-4 left-4 w-8 h-8">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400/60 rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-0.5 h-full bg-emerald-400/60 rounded-full"></div>
                  </div>

                  {/* Content */}
                  <div className="relative p-8 md:p-12 pt-20">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 mt-6 leading-tight">
                      {track.title}
                    </h3>

                    {/* SDG Tags - Matching Your Image Style */}
                    <div className="flex flex-wrap gap-3 mb-8">
                      {track.sdgs.map((sdg) => (
                        <span key={sdg} className="px-4 py-2 border-2 border-emerald-400/60 text-emerald-300 rounded-full text-sm font-medium hover:bg-emerald-400/10 transition-colors duration-300">
                          {sdg}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-gray-200 text-lg leading-relaxed mb-6">
                      {track.description}
                    </p>

                    {/* Details */}
                    <p className="text-gray-300 leading-relaxed mb-10">
                      {track.details}
                    </p>

                    {/* Action Buttons - Matching Your Image Style */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="group/btn relative px-8 py-3 bg-gradient-to-r from-lime-400 to-emerald-500 text-black font-bold rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        <span className="relative z-10">Explore Problems</span>
                      </button>
                      
                      <button className="group/btn relative px-8 py-3 border-2 border-emerald-400 text-emerald-300 font-bold rounded-full overflow-hidden hover:bg-emerald-400/10 transition-all duration-300 transform hover:scale-105">
                        <span className="relative z-10">View Examples</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
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
      </div>
    </section>
  )
}
