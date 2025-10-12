import Image from 'next/image'

export default function Sponsorship() {
  const sponsors = [
    {
      tier: 'Cyber Security Sponsor',
      logo: '/K7_Sec.png', 
      alt: 'Title Sponsor Logo'
    },
    // {
    //   tier: 'Gold Sponsor',
    //   logo: '/sponsors/gold-sponsor.png', 
    //   alt: 'Gold Sponsor Logo'
    // },
    // {
    //   tier: 'Silver Sponsor',
    //   logo: '/sponsors/silver-sponsor.png', 
    //   alt: 'Silver Sponsor Logo'
    // }
  ]

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
        
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {sponsors.map((sponsor) => (
            <div key={sponsor.tier} className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8 text-center w-full md:w-80">
              <h3 className="text-xl font-bold text-emerald-400 mb-4">{sponsor.tier}</h3>
              <div className="bg-white/95 border-2 border-emerald-400/30 rounded-2xl h-32 flex items-center justify-center p-6">
                <Image 
                  src={sponsor.logo}
                  alt={sponsor.alt}
                  width={250}
                  height={80}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
   
      </div>
    </section>
  )
}