export default function Contact() {
  const contacts = [
    { name: "Raahul M", phone: "+91 8667302096" },
    { name: "Melvin", phone: "+91 9080059840" },
    { name: "Lakshanya M", phone: "+91 9043677271" },
    { name: "Praveshika M", phone: "+91 7358115724" }
  ];

  return (
    <section id="contact" className="relative z-10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-green-300 via-emerald-400 to-lime-400 bg-clip-text text-transparent animate-gradient-x">
              CONTACT
            </span>
          </h2>
          <p className="text-2xl text-gray-300">
            Get in touch with us for any queries
          </p>
        </div>

        {/* Contact Card */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

            <div className="space-y-4">

              {/* Email */}
              <a
                href="mailto:biosphereclubvitcc@gmail.com"
                className="flex flex-wrap items-center group hover:bg-emerald-900/30 p-3 rounded-lg transition-all"
              >
                <div className="bg-emerald-800/50 p-3 rounded-full mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-base text-gray-300 group-hover:text-emerald-400 transition-colors break-words">
                  biosphereclubvitcc@gmail.com
                </span>
              </a>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {contacts.map((contact, index) => (
                  <a
                    key={index}
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="flex flex-wrap items-center group hover:bg-emerald-900/30 p-3 rounded-lg transition-all"
                  >
                    <div className="bg-emerald-800/50 p-3 rounded-full mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-base text-gray-300 group-hover:text-emerald-400 transition-colors font-semibold whitespace-nowrap">{contact.phone}</span>
                      <span className="text-sm text-emerald-400/80 truncate">{contact.name}</span>
                    </div>
                  </a>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-emerald-400/20 my-5"></div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex flex-wrap gap-4">
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/biosphere_club_vitcc?igsh=b3U4ZnF6MDYyZTB4" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-emerald-800/50 p-4 rounded-full hover:bg-emerald-700/50 transition-all transform hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/company/biosphere-club-vit-chennai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-emerald-800/50 p-4 rounded-full hover:bg-emerald-700/50 transition-all transform hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>

                  {/* Website */}
                  <a 
                    href="https://biosphere-vit-chennai.example.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group bg-emerald-800/50 p-4 rounded-full hover:bg-emerald-700/50 transition-all transform hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
