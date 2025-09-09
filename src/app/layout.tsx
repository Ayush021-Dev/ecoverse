import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcoVerse 2025 - Sustainability Meets Innovation',
  description: 'Join us for EcoVerse 2025 hackathon organized by Biosphere - November 5th-6th',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900`}>
        {children}
      </body>
    </html>
  )
}