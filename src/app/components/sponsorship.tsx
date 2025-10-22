import Image from 'next/image'

export default function Sponsorship() {
  const communityPartners = [
    {
      name: 'Dreamers Den (D3)',
      logo: '/D3.jpg',
      alt: 'D3 Logo',
      isSquare: true,
      url: 'https://www.linkedin.com/posts/biosphere-club-vit-chennai_ecoverse-digitaldreamersden-communitypartner-activity-7386674625704951808-GYWz' 
    },
    {
      name: 'Start the Up',
      logo: '/STU1.jpg',
      alt: 'Start the Up Logo',
      isSquare: true,
      url: 'https://www.linkedin.com/company/biosphere-club-vit-chennai/posts/?feedView=all' 
    }
  ]

  const sponsors = [
    {
      name: 'K7 Security',
      logo: '/K7_Sec.png',
      alt: 'K7 Security Logo',
      isSquare: false,
      url: 'https://www.linkedin.com/posts/biosphere-club-vit-chennai_ecoverse-k7security-sponsorship-activity-7386667196036329472-LESp' 
    }
  ]

  return (
    <section id="sponsorship" className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-lime-300 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-gradient-x">
              PARTNERS & SPONSORS
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Partnering with industry leaders and innovators for sustainable impact
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-16 md:gap-24 relative">

          {/* Community Partners (Left) */}
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-lime-300 via-emerald-400 to-green-400 bg-clip-text text-transparent">
              Community Partners
            </h3>

            <div className={`grid ${communityPartners.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 md:grid-cols-2'} gap-20 justify-items-center w-full`}>
              {communityPartners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8 text-center w-64 md:w-72 hover:border-emerald-300/60 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">{partner.name}</h4>
                  <div className="bg-white/95 border-2 border-emerald-400/30 rounded-2xl h-32 flex items-center justify-center p-0">
                    <Image
                      src={partner.logo}
                      alt={partner.alt}
                      width={partner.isSquare ? 180 : 250}
                      height={partner.isSquare ? 180 : 80}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Divider Line (Full Height) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-lime-300 via-emerald-400 to-green-400"></div>

          {/* Sponsors (Right) */}
          <div className="flex-1 flex flex-col items-center">
            <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-lime-300 via-emerald-400 to-green-400 bg-clip-text text-transparent">
              Sponsors
            </h3>

            <div className={`grid ${sponsors.length === 1 ? 'grid-cols-1 justify-items-center' : 'grid-cols-1 md:grid-cols-2'} gap-20 justify-items-center w-full`}>
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8 text-center w-64 md:w-72 hover:border-emerald-300/60 hover:scale-105 transition-all duration-300 cursor-pointer"
                >
                  <h4 className="text-xl font-bold text-emerald-400 mb-4">{sponsor.name}</h4>
                  <div className="bg-white/95 border-2 border-emerald-400/30 rounded-2xl h-32 flex items-center justify-center p-4">
                    <div className={sponsor.isSquare ? "h-full aspect-square" : "w-full h-full"}>
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.alt}
                        width={sponsor.isSquare ? 120 : 250}
                        height={sponsor.isSquare ? 120 : 80}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}