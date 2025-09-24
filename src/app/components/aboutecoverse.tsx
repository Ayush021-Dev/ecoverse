import Image from 'next/image'

export default function AboutEcoverse() {
  return (
    <section id="about-ecoverse" className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
              ABOUT ECOVERSE
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A 24-hour sustainability hackathon bringing together innovators to solve real-world environmental challenges.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Square Logo Container */}
            <div className="relative group">
              {/* Animated Background Circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute w-72 h-72 border-2 border-emerald-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                <div className="absolute w-60 h-60 border border-green-400/15 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
                <div className="absolute w-80 h-80 border border-lime-400/10 rounded-full animate-pulse"></div>
              </div>
              
              {/* Glowing Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-lime-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-emerald-800/50 to-green-800/50 
                border-2 border-emerald-400/30 rounded-2xl w-64 aspect-square 
                flex items-center justify-center backdrop-blur-sm 
                group-hover:border-emerald-400/50 transition-all duration-300 mx-auto">
                
                {/* Logo with Enhanced Effects */}
                <div className="relative">
                  {/* Glowing backdrop for logo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
                  
                  {/* Logo Image */}
                  <div className="relative transform group-hover:scale-110 transition-all duration-500">
                    <Image
                      src="/Ecoverse2.png"
                      alt="EcoVerse Logo"
                      width={256}
                      height={256}
                      className="w-64 h-64 object-contain drop-shadow-2xl"
                    />
                    
                    {/* Sparkle Effects */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-30" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/4 -right-4 w-2 h-2 bg-lime-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                  </div>
                </div>
                
                {/* Floating particles */}
                <div className="absolute top-8 left-8 w-2 h-2 bg-emerald-400/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute bottom-12 right-12 w-1.5 h-1.5 bg-green-400/60 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-16 right-8 w-1 h-1 bg-lime-400/60 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
              </div>
            </div>
            
            {/* Right Content */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">What is EcoVerse?</h3>
              <p className="text-gray-200 mb-4">
                EcoVerse 2025 is VIT Chennai&apos;s flagship sustainability hackathon that challenges participants to develop innovative solutions for environmental problems.
              </p>
              <p className="text-gray-200">
                Join 500+ participants in creating technology-driven solutions that align with UN Sustainable Development Goals.
              </p>
              
              {/* Key Features */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center text-emerald-300">
                  <span className="text-emerald-400 mr-3">🌱</span>
                  <span className="text-sm">24-hour intensive hackathon</span>
                </div>
                <div className="flex items-center text-emerald-300">
                  <span className="text-emerald-400 mr-3">👥</span>
                  <span className="text-sm">500+ participants from across India</span>
                </div>
                <div className="flex items-center text-emerald-300">
                  <span className="text-emerald-400 mr-3">🎯</span>
                  <span className="text-sm">Focus on UN SDGs alignment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}