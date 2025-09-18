"use client"

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { NextPage } from 'next'

interface NavItem {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/navitems/about' },
  { label: 'Tracks', href: '/navitems/tracks' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Register', href: '#register' },
]

const Navbar: NextPage = () => {
  const pathname = usePathname()
  const [hash, setHash] = useState('')

  useEffect(() => {
    setHash(window.location.hash)
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
          const isActive = href.startsWith('#') ? pathname + hash === href : pathname === href

          return (
            <Link
              key={href}
              href={href}
              className={`transition-all duration-300 border-b-2 border-transparent hover:text-emerald-400 hover:border-emerald-400 ${
                isActive ? 'text-emerald-400 border-emerald-400 font-semibold' : ''
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      {/* CTA Button */}
      <button className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full hover:from-emerald-600 hover:to-green-700 transition-all transform hover:scale-105 font-semibold shadow-lg shadow-emerald-500/25">
        Register Now
      </button>
    </header>
  )
}

export default Navbar
