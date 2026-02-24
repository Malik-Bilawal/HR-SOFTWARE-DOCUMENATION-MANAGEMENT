"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

interface Module {
  id: number;
  name: string;
  slug: string;
}

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const [modules, setModules] = useState<Module[]>([]);

  // Fetch modules from Django
  useEffect(() => {
    fetch("http://localhost:8000/api/modules/")
      .then((res) => res.json())
      .then((data) => setModules(data))
      .catch((err) => console.error("Failed to load modules", err));
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tight">
              HRMS<span className="text-gray-800">Docs</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>

            {/* Modules Dropdown */}
            <div className="relative group">
              <button className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
                Modules
                <svg
                  className="w-4 h-4 mt-0.5 group-hover:rotate-180 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-2">
                  {modules.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/users/module/${item.slug}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/blogs" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Blogs
            </Link>
            <Link href="/tutorials" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Tutorials
            </Link>
            <Link href="/users/clients" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Clients
            </Link>
            <Link href="/users/hardware" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Hardware
            </Link>
            <Link href="/users/contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Contact
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/request-demo"
              className="bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Request a Demo
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4 space-y-4">
          {/* Mobile Modules Accordion */}
          <div>
            <button
              onClick={() => setIsModulesOpen(!isModulesOpen)}
              className="flex justify-between items-center w-full text-left text-gray-600 font-medium py-2"
            >
              Modules
              <svg
                className={`w-4 h-4 transition-transform ${isModulesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isModulesOpen && (
              <div className="pl-4 space-y-2 mt-1">
                {modules.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/modules/${item.slug}`}
                    className="block py-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blogs"
            className="block py-2 text-gray-600 hover:text-blue-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Blogs
          </Link>
          <Link
            href="/tutorials"
            className="block py-2 text-gray-600 hover:text-blue-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Tutorials
          </Link>
          <Link
            href="/clients"
            className="block py-2 text-gray-600 hover:text-blue-600 font-medium"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Clients
          </Link>

          {/* Mobile action buttons */}
          <div className="pt-4 space-y-3">
            <Link
              href="/request-demo"
              className="block w-full text-center bg-blue-600 text-white px-5 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Request a Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}