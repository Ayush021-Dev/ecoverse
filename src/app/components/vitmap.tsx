export default function VitMap() {
  return (
    <section id="vit-map" className="relative z-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
              VENUE
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            VIT Chennai Campus
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Address</h3>
            <div className="space-y-4 text-gray-300">
              <p><strong className="text-emerald-400">VIT Chennai</strong></p>
              <p>Vandalur - Kelambakkam Road</p>
              <p>Chennai, Tamil Nadu 600127</p>
              <p>India</p>
              
              <div className="mt-6">
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-800/50 to-green-800/50 border-2 border-emerald-400/30 rounded-3xl h-96 flex items-center justify-center">
            <div className="text-center text-emerald-400">
              <div className="text-4xl mb-4">🗺️</div>
              <p className="text-sm">Interactive Map</p>
              <p className="text-xs text-gray-400 mt-2">Google Maps Integration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
