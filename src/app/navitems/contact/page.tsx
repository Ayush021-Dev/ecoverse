export default function Contact() {
  return (
    <section id="contact" className="relative z-10 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
              CONTACT
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Get in touch with us for any queries
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-emerald-400 mr-4">📧</span>
                <span className="text-gray-300">ecoverse@vit.ac.in</span>
              </div>
              <div className="flex items-center">
                <span className="text-emerald-400 mr-4">📱</span>
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <span className="text-emerald-400 mr-4">🌐</span>
                <span className="text-gray-300">@biosphere_vit_chennai</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Quick Links</h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg transition-all">
                Registration Guidelines
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg transition-all">
                Event Brochure
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-emerald-400 hover:bg-emerald-900/30 rounded-lg transition-all">
                FAQs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
