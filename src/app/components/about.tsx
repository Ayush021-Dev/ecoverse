import Image from 'next/image'

export default function About() {
  return (
    <section id="about" className="relative z-10">

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
                ABOUT
              </span>
            </h1>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              US
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-gray-300 leading-relaxed">
              Discover the vision and mission behind EcoVerse 2025 and meet the organizations driving sustainable innovation.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-emerald-400"></div>
              <span className="text-emerald-400 font-semibold">Excellence in Education & Environment</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-emerald-400"></div>
            </div>
          </div>
        </div>

        {/* About VIT Section */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl overflow-hidden shadow-2xl">

            {/* Section Header */}
            <div className="relative p-8 md:p-12 border-b border-emerald-400/30">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-lime-400 to-emerald-500 text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  INSTITUTION
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                About VIT Chennai
              </h3>
              <p className="text-lg text-emerald-300 font-medium">
                Transforming life through excellence in education and research
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="space-y-6">
                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/vit.jpg"
                    alt="VIT Chennai Campus"
                    width={800}
                    height={500}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-950/50 border border-emerald-400/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400">13K+</div>
                    <div className="text-gray-300 text-sm">Students</div>
                  </div>
                  <div className="bg-emerald-950/50 border border-emerald-400/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-lime-400">508</div>
                    <div className="text-gray-300 text-sm">Faculty</div>
                  </div>
                  <div className="bg-emerald-950/50 border border-emerald-400/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">A++</div>
                    <div className="text-gray-300 text-sm">NAAC Grade</div>
                  </div>
                  <div className="bg-emerald-950/50 border border-emerald-400/30 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-emerald-400">2010</div>
                    <div className="text-gray-300 text-sm">Established</div>
                  </div>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="space-y-6">
                <p className="text-gray-200 leading-relaxed">
                  VIT Chennai was established in 2010 and has since become a beacon of excellence in higher education.
                  Strategically located in the capital city of Tamil Nadu, VIT Chennai is a globally engaged,
                  competitive, and research-enriched institution.
                </p>

                <p className="text-gray-200 leading-relaxed">
                  Under the visionary leadership of <span className="text-emerald-400 font-semibold">Dr. G. V. Selvam</span> (Vice President),
                  <span className="text-emerald-400 font-semibold"> Dr. V. S. Kanchana Bhaaskaran</span> (Vice Chancellor), and
                  <span className="text-emerald-400 font-semibold"> Dr. T. Thyagarajan</span> (Pro Vice Chancellor),
                  VIT Chennai has rapidly evolved into a hub of innovation and academic distinction.
                </p>

                {/* Vision & Mission */}
                <div className="bg-emerald-950/30 border border-emerald-400/20 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-emerald-300 mb-3">Our Vision</h4>
                  <p className="text-gray-300 text-sm mb-4">
                    Transforming life through excellence in education and research.
                  </p>

                  <h4 className="text-lg font-bold text-emerald-300 mb-3">Key Highlights</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                      Cosmopolitan atmosphere with global student community
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                      192.13 acres of state-of-the-art campus
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></span>
                      Strong industry partnerships and placements
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 right-4 w-8 h-8">
              <div className="absolute top-0 right-0 w-full h-0.5 bg-emerald-400/60 rounded-full"></div>
              <div className="absolute top-0 right-0 w-0.5 h-full bg-emerald-400/60 rounded-full"></div>
            </div>
            <div className="absolute bottom-4 left-4 w-8 h-8">
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400/60 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-0.5 h-full bg-emerald-400/60 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* About Biosphere Section */}
        <section className="max-w-7xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-green-900/90 to-lime-900/90 backdrop-blur-xl border-2 border-lime-400/40 rounded-3xl overflow-hidden shadow-2xl">

            {/* Section Header */}
            <div className="relative p-8 md:p-12 border-b border-lime-400/30">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-gradient-to-r from-emerald-400 to-lime-500 text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                  ORGANIZER
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                About Biosphere Club
              </h3>
              <p className="text-lg text-lime-300 font-medium">
                Creating awareness and building a sustainable environment for future generations
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left Column - Content */}
              <div className="space-y-6">
                <p className="text-gray-200 leading-relaxed">
                  The Biosphere Club at VIT Chennai was created with the vision to create awareness among people
                  and make impact by realizing how real the global warming and climate changes are. We encourage
                  active participation and spread hope that small changes do matter.
                </p>

                <p className="text-gray-200 leading-relaxed">
                  Under the guidance of <span className="text-lime-400 font-semibold">Dr. Umayal C</span>
                  (Faculty Coordinator), School of Electrical Engineering, the club focuses on respecting,
                  observing and understanding plants, animals, places and culture while getting knowledge
                  and finding new ways to heal the planet.
                </p>

                {/* Mission Points */}
                <div className="bg-lime-950/30 border border-lime-400/20 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-lime-300 mb-4">Our Mission</h4>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Environmental awareness and climate action initiatives</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Sustainable practices and community engagement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Building a better planet for future generations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Research and innovation in environmental solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Promoting climate change awareness and mitigation strategies</span>
                    </li>

                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Waste-to-wealth initiatives and circular economy practices</span>
                    </li>

                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Water conservation and rainwater harvesting projects</span>
                    </li>

                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Biodiversity protection through campus plantation drives</span>
                    </li>

                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Green technology development and renewable energy advocacy</span>
                    </li>

                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Community outreach programs for environmental education</span>
                    </li>

                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-lime-400 rounded-full mr-3 mt-2"></span>
                      <span className="text-sm">Collaboration with industry for sustainable development goals</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column - Image Placeholder & Activities */}
              <div className="space-y-6">
                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                  <Image
                    src="/members.jpg"
                    alt="Biosphere Club Members"
                    width={800}
                    height={500}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>


                {/* Activities Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-lime-950/50 border border-lime-400/30 rounded-xl p-4">
                    <h5 className="font-bold text-lime-400 text-sm mb-2">Plantation Drives</h5>
                    <p className="text-gray-300 text-xs">Century plantation initiatives across campus</p>
                  </div>
                  <div className="bg-lime-950/50 border border-lime-400/30 rounded-xl p-4">
                    <h5 className="font-bold text-lime-400 text-sm mb-2">Awareness Campaigns</h5>
                    <p className="text-gray-300 text-xs">Education on climate change and sustainability</p>
                  </div>
                  <div className="bg-lime-950/50 border border-lime-400/30 rounded-xl p-4">
                    <h5 className="font-bold text-lime-400 text-sm mb-2">Community Service</h5>
                    <p className="text-gray-300 text-xs">Books, clothes and essentials distribution</p>
                  </div>
                  <div className="bg-lime-950/50 border border-lime-400/30 rounded-xl p-4">
                    <h5 className="font-bold text-lime-400 text-sm mb-2">Research Projects</h5>
                    <p className="text-gray-300 text-xs">Environmental conservation research</p>
                  </div>
                </div>

                {/* Join Us CTA */}
                <div className="bg-lime-950/30 border border-lime-400/20 rounded-xl p-6 text-center">
                  <p className="text-lime-300 font-medium mb-3">Join Our Mission</p>
                  <p className="text-gray-300 text-sm mb-4">
                    Be part of the change and help us build a sustainable future through innovation and action.
                  </p>
                  <button className="px-6 py-2 bg-gradient-to-r from-lime-400 to-emerald-500 text-black font-bold rounded-full hover:from-lime-500 hover:to-emerald-600 transition-all transform hover:scale-105 text-sm shadow-lg">
                    Learn More
                  </button> {/* Biosphere website link*/}
                </div>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-4 right-4 w-8 h-8">
              <div className="absolute top-0 right-0 w-full h-0.5 bg-lime-400/60 rounded-full"></div>
              <div className="absolute top-0 right-0 w-0.5 h-full bg-lime-400/60 rounded-full"></div>
            </div>
            <div className="absolute bottom-4 left-4 w-8 h-8">
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-lime-400/60 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-0.5 h-full bg-lime-400/60 rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <div className="text-center mt-20 mb-12">
          <div className="bg-gradient-to-r from-emerald-950/80 to-green-950/80 backdrop-blur-xl border-2 border-emerald-400/50 rounded-3xl p-8 md:p-12 max-w-4xl mx-auto shadow-2xl shadow-emerald-500/10">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              Ready to Make an Impact?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join 500+ innovators in building solutions for a sustainable future
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 justify-center">
  <a href="/register" className="group relative px-10 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-full overflow-hidden shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 text-center">
    <span className="relative z-10">Register Your Team</span>
    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </a>

  <a href="/brochure.pdf" download className="group relative px-10 py-4 border-2 border-emerald-400 text-emerald-400 font-bold rounded-full overflow-hidden hover:text-black transition-all duration-300 transform hover:scale-105 text-center">
    <span className="relative z-10">Download Brochure</span>
    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
  </a>
</div>
          </div>
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
    </section>
  )
}