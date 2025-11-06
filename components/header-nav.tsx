"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export default function HeaderNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            MC
          </div>
          <span className="text-lg font-bold text-gray-900">Merit Portal</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-gray-600 hover:text-gray-900 transition">
            Features
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-gray-900 transition">
            About
          </Link>
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login?role=student">
            <Button variant="outline">Student Login</Button>
          </Link>
          <Link href="/auth/signup?role=student">
            <Button className="bg-blue-600 hover:bg-blue-700">Student Sign Up</Button>
          </Link>
          <Link href="/auth/login?role=teacher">
            <Button variant="outline">Teacher Login</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="#features" className="block text-gray-600 hover:text-gray-900">
              Features
            </Link>
            <Link href="#about" className="block text-gray-600 hover:text-gray-900">
              About
            </Link>
            <div className="space-y-2 pt-4 border-t">
              <Link href="/auth/login?role=student" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Student Login
                </Button>
              </Link>
              <Link href="/auth/signup?role=student" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Student Sign Up</Button>
              </Link>
              <Link href="/auth/login?role=teacher" className="block">
                <Button variant="outline" className="w-full bg-transparent">
                  Teacher Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
