"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { NextPage } from 'next'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Sponsors', href: '#sponsorship' },
  { label: 'About', href: '#about' },  
  { label: 'More Info', href: '#coordinators' },
]

const Navbar: NextPage = () => {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      
      // If near top, set home as active
      if (scrollY < 200) {
        setActiveSection('home')
        return
      }

      const sections = ['about', 'timeline', 'tracks', 'sponsorship', 'coordinators']
      
      sections.forEach((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = window.scrollY + rect.top
          
          if (scrollY >= elementTop - 200 && scrollY < elementTop + element.offsetHeight - 200) {
            setActiveSection(section)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 md:p-6 backdrop-blur-sm max-w-7xl mx-auto">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 relative overflow-hidden">
          <Image
            src="/vitlogo.png"
            alt="VIT Chennai Logo"
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
        <div>
          <span className="text-emerald-400 font-bold text-xl tracking-wide">EcoVerse</span>
          <div className="text-gray-400 text-xs">VIT Chennai</div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-8 text-gray-300">
        {navItems.map(({ label, href }) => {
          const sectionId = href.replace('#', '')
          const isActive = activeSection === sectionId

          return (
            <Link
              key={href}
              href={href}
              className={`transition-all duration-300 border-b-2 border-transparent hover:text-emerald-400 hover:border-emerald-400 ${
                isActive ? 'text-emerald-400 border-emerald-400' : ''
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* CTA Button */}
      <Link href="#contact">
        <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 font-semibold shadow-lg shadow-emerald-500/25">
          Register Now
        </button>
      </Link>
    </header>
  )
}

export default Navbar