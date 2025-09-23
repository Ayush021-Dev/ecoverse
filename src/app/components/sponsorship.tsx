export default function Sponsorship() {
  return (
    <section id="sponsorship" className="relative z-10">
      <div className="max-w-7xl mx-auto px-6"><br/> <br/> <br/> 
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-lime-300 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-gradient-x">
              SPONSORS
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Partnering with industry leaders for sustainable innovation
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {['Title Sponsor', 'Gold Sponsor', 'Silver Sponsor'].map((tier) => (
            <div key={tier} className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8 text-center">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">{tier}</h3>
              <div className="bg-gradient-to-br from-emerald-800/50 to-green-800/50 border-2 border-emerald-400/30 rounded-2xl h-32 flex items-center justify-center">
                <p className="text-gray-400">Logo Placeholder</p>
              </div>
              <p className="text-gray-300 mt-4 text-sm">Coming Soon</p>
            </div>
          ))}
        </div>
   
      </div>
    </section>
  )
}
