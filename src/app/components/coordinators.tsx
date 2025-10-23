'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function Coordinators() {
  const [showOtherCoords, setShowOtherCoords] = useState(false)

  const faculty = {
    name: "Dr. Umayal C",
    role: "Faculty Coordinator",
    dept: "School of Electrical Engineering",
    image: "/faculty.jpg"
  }

  const leadership = [
    { name: "Meera", role: "President", image: "/meera.jpg" },
    { name: "Melvin", role: "Vice President", image: "/melvin.jpg" }
  ]

  const studentCoords = [
    { name: "Raahul M", role: "Student Coordinator", image: "/Raahul.jpg" },
    { name: "Praveshika M", role: "Student Coordinator", image: "/Praveshika.jpg" },
    { name: "Lakshanya M", role: "Student Coordinator", image: "/Lakshanya.jpg" }
  ]

  const otherCoords = [
    { name: "Ayush", role: "Technical Lead", image: "/ayush.jpg" },
    { name: "Pragadeeshwaran R V", role: "Technical Lead", image: "/pragadeesh.jpg" },
    { name: "Adithiaya Murugan K S", role: "WebDev Coordinator", image: "/adithiaya.jpg" },
    //{ name: "Sukrati Verma", role: "Design Lead", image: "/sukrati.jpg" },
    { name: "Hemasri C", role: "Photo and videography lead", image: "/hema.jpg" },
    //{ name: "Yuvashree", role: "Coordinator", image: "/yuvashree.jpg" },
    { name: "Rinuvarshini", role: "Coordinator", image: "/rinu2.png" },
    { name: "Archit Rajesh", role: "Coordinator", image: "/archit.jpg" },
    { name: "Santhosh Balaganesh S", role: "Coordinator", image: "/Santhosh.jpg" },
    { name: "Manjari Muthukumaran", role: "Coordinator", image: "/Manjari.jpeg" },
    { name: "Joshita K", role: "Coordinator", image: "/joshitaK.jpg" },
    { name: "Joshitha A", role: "Coordinator", image: "/JoshithaA.jpg" },
    { name: "Ayushi Tewari", role: "Coordinator", image: "/ayushi.jpg" }
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
        
        {/* Faculty Coordinator */}
        <div className="flex justify-center mb-12">
          <div className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-6 text-center w-72">
            <div className="relative bg-gradient-to-br from-emerald-800/50 to-green-800/50 border-2 border-emerald-400/30 rounded-2xl h-40 w-40 mx-auto mb-4 overflow-hidden">
              <Image 
                src={faculty.image} 
                alt={faculty.name}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{faculty.name}</h3>
            <p className="text-emerald-400 text-sm mb-1">{faculty.role}</p>
            <p className="text-gray-400 text-xs">{faculty.dept}</p>
          </div>
        </div>

        {/* President & Vice President */}
        <div className="flex justify-center gap-8 mb-12 flex-wrap">
          {leadership.map((leader, index) => (
            <div key={index} className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-6 text-center w-72">
              <div className="relative bg-gradient-to-br from-emerald-800/50 to-green-800/50 border-2 border-emerald-400/30 rounded-2xl h-40 w-40 mx-auto mb-4 overflow-hidden">
                <Image 
                  src={leader.image} 
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{leader.name}</h3>
              <p className="text-emerald-400 text-sm">{leader.role}</p>
            </div>
          ))}
        </div>

        {/* Student Coordinators */}
        <div className="flex justify-center gap-8 flex-wrap max-w-5xl mx-auto">
          {studentCoords.map((coord, index) => (
            <div key={index} className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-6 text-center w-72">
              <div className="relative bg-gradient-to-br from-emerald-800/50 to-green-800/50 border-2 border-emerald-400/30 rounded-2xl h-40 w-40 mx-auto mb-4 overflow-hidden">
                <Image 
                  src={coord.image} 
                  alt={coord.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{coord.name}</h3>
              <p className="text-emerald-400 text-sm">{coord.role}</p>
            </div>
          ))}
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setShowOtherCoords(!showOtherCoords)}
            className="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-full shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 flex items-center gap-3"
          >
            <span>{showOtherCoords ? 'Show Less' : 'Other Coordinators'}</span>
            <svg 
              className={`w-5 h-5 transition-transform duration-300 ${showOtherCoords ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Other Coordinators - Collapsible */}
        <div className={`overflow-hidden transition-all duration-500 ${showOtherCoords ? 'max-h-[2000px] opacity-100 mt-12' : 'max-h-0 opacity-0'}`}>
          <div className="flex justify-center gap-8 flex-wrap max-w-5xl mx-auto">
            {otherCoords.map((coord, index) => (
              <div key={index} className="bg-gradient-to-br from-emerald-900/90 to-green-900/90 backdrop-blur-xl border-2 border-emerald-400/40 rounded-3xl p-6 text-center w-72">
                <div className="relative bg-gradient-to-br from-emerald-800/50 to-green-800/50 border-2 border-emerald-400/30 rounded-2xl h-40 w-40 mx-auto mb-4 overflow-hidden">
                  <Image 
                    src={coord.image} 
                    alt={coord.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{coord.name}</h3>
                <p className="text-emerald-400 text-sm">{coord.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}