import Image from 'next/image'

export default function Coordinators() {
  const coordinators = [
    { name: "Dr. Umayal C", role: "Faculty Coordinator", dept: "School of Electrical Engineering", image: "/faculty.jpg" },
    { name: "Raahul M", role: "Secretary", dept: "Biosphere Club", image: "/Raahul.jpg" },
    { name: "Praveshika M", role: "Member", dept: "Biosphere Club", image: "/Praveshika.jpg" },
    { name: "Lakshanya M", role: "Member", dept: "Biosphere Club", image: "/Lakshanya.jpg" }
  ]

  return (
    <section id="coordinators" className="relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-emerald-300 via-green-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
              COORDINATORS
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Meet the team driving EcoVerse 2025
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coordinators.map((coord, index) => (
            <div key={index} className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-6 text-center">
              <div className="relative bg-gradient-to-br from-emerald-800/50 to-green-800/50 border-2 border-emerald-400/30 rounded-2xl h-32 w-32 mx-auto mb-4 overflow-hidden">
                <Image 
                  src={coord.image} 
                  alt={coord.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{coord.name}</h3>
              <p className="text-emerald-400 text-sm mb-1">{coord.role}</p>
              <p className="text-gray-400 text-xs">{coord.dept}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}