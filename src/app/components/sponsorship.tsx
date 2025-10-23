import Image from 'next/image'

export default function Sponsorship() {
  const sponsors = [
    {
      name: 'K7 Security',
      logo: '/K7_Sec.png',
      alt: 'K7 Security Logo',
      isSquare: false,
      url: 'https://www.linkedin.com/posts/biosphere-club-vit-chennai_ecoverse-k7security-sponsorship-activity-7386667196036329472-LESp'
    },
  ]

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
    },
    {
      name: 'CodeCrafters.io',
      logo: '/codecrafters.png',
      alt: 'CodeCrafters.io Logo',
      isSquare: true,
      url: 'https://www.linkedin.com/company/biosphere-club-vit-chennai/posts/?feedView=all'
    }
  ]

  return (
    <section id="sponsorship" className="relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-lime-300 via-emerald-400 to-green-400 bg-clip-text text-transparent animate-gradient-x">
              SPONSORS & PARTNERS
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Partnering with industry leaders and innovators for sustainable impact
          </p>
        </div>

        {/* ===== Sponsors Section ===== */}
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-lime-300 via-emerald-400 to-green-400 bg-clip-text text-transparent">
            Sponsors
          </h3>

          <div className="flex flex-wrap justify-center gap-12 w-full">
            {sponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl 
                           border-2 border-emerald-400/40 rounded-3xl p-10 text-center 
                           w-72 md:w-80 hover:border-emerald-300/60 hover:scale-105 
                           transition-all duration-300 cursor-pointer"
              >
                <h4 className="text-2xl font-bold text-emerald-400 mb-6">{sponsor.name}</h4>
                <div className="bg-white/95 border-2 border-emerald-400/30 rounded-2xl h-40 flex items-center justify-center p-4">
                  <div className={sponsor.isSquare ? "h-full aspect-square" : "w-full h-full"}>
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.alt}
                      width={sponsor.isSquare ? 160 : 280}
                      height={sponsor.isSquare ? 160 : 100}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ===== Community Partners Section ===== */}
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-lime-300 via-emerald-400 to-green-400 bg-clip-text text-transparent">
            Community Partners
          </h3>

          <div className="flex flex-wrap justify-center gap-12 w-full">
            {communityPartners.map((partner) => (
              <a
                key={partner.name}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl 
                           border-2 border-emerald-400/40 rounded-3xl p-10 text-center 
                           w-72 md:w-80 hover:border-emerald-300/60 hover:scale-105 
                           transition-all duration-300 cursor-pointer"
              >
                <h4 className="text-2xl font-bold text-emerald-400 mb-6">{partner.name}</h4>
                <div className="bg-white/95 border-2 border-emerald-400/30 rounded-2xl h-40 flex items-center justify-center p-2">
                  <Image
                    src={partner.logo}
                    alt={partner.alt}
                    width={partner.isSquare ? 160 : 280}
                    height={partner.isSquare ? 160 : 100}
                    className="object-contain w-full h-full"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
