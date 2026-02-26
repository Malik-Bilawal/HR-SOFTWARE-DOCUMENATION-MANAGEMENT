"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  UserGroupIcon,
  ClockIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
  ArrowRightOnRectangleIcon,
  BriefcaseIcon,
  ChartBarIcon,
  LifebuoyIcon,
  ReceiptPercentIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  UserIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { FaLinkedin, FaTwitter, FaFacebookF } from "react-icons/fa";

// Types for the API responses
interface HeroData {
  heading: string;
  description: string;
  primary_button_text: string;
  primary_button_link: string;
  secondary_button_text: string;
  secondary_button_link: string;
  background_image: string | null;
}

interface StatData {
  value: string;
  label: string;
}

interface TestimonialData {
  quote: string;
  author_name: string;
  author_title: string;
  author_image: string | null;
}

interface CertificationData {
  name: string;
  image: string;
}

interface AwardData {
  name: string;
  image: string;
}

interface ClientData {
  name: string;
  logo: string | null;
}

interface IntegrationData {
  name: string;
  logo: string | null;
}

interface ModuleData {
  id: number;
  name: string;
  slug: string;
  hero_heading: string;
  hero_description: string;
  featured_image: string | null;
  icon_name: string;
}

interface HomeData {
  hero: HeroData;
  why_choose_features: string[];
  app_features: string[];
  stats: StatData[];
  testimonials: TestimonialData[];
  certifications: CertificationData[];
  awards: AwardData[];
  clients: ClientData[];
  integrations?: IntegrationData[]; // optional, if you add the model
}

// Mapping from icon name string to Heroicon component
import * as HeroIcons from "@heroicons/react/24/outline";

const iconMap: { [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>> } = {
  UserGroupIcon: HeroIcons.UserGroupIcon,
  ClockIcon: HeroIcons.ClockIcon,
  CalendarDaysIcon: HeroIcons.CalendarDaysIcon,
  CurrencyDollarIcon: HeroIcons.CurrencyDollarIcon,
  ArrowRightOnRectangleIcon: HeroIcons.ArrowRightOnRectangleIcon,
  BriefcaseIcon: HeroIcons.BriefcaseIcon,
  ChartBarIcon: HeroIcons.ChartBarIcon,
  LifebuoyIcon: HeroIcons.LifebuoyIcon,
  ReceiptPercentIcon: HeroIcons.ReceiptPercentIcon,
  DocumentTextIcon: HeroIcons.DocumentTextIcon,
  AcademicCapIcon: HeroIcons.AcademicCapIcon,
  UserIcon: HeroIcons.UserIcon,
  // add more as needed
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [modules, setModules] = useState<ModuleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Fetch home data and modules
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/home/`).then(res => res.json()),
      fetch(`${API_BASE_URL}/api/modules/`).then(res => res.json())
    ])
      .then(([home, mods]) => {
        setHomeData(home);
        setModules(mods);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load data", err);
        setLoading(false);
      });
  }, []);

  // Scroll to top logic
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!homeData) {
    return <div className="text-center py-20">Failed to load content.</div>;
  }

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {homeData.hero.heading}
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            {homeData.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={homeData.hero.primary_button_link}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              {homeData.hero.primary_button_text}
            </a>
            <a
              href={homeData.hero.secondary_button_link}
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              {homeData.hero.secondary_button_text}
            </a>
          </div>
        </div>
      </section>

      {/* Client Logos Strip */}
      <section className="py-10 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm uppercase tracking-wider text-gray-500 mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {homeData.clients.map((client, idx) => (
              <div key={idx} className="transition duration-300">
                {client.logo ? (
                  <div className="relative w-20 h-10">
                    <Image
                      src={`${API_BASE_URL}${client.logo}`}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-gray-400 font-medium">{client.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            FlowHCM TOP MODULES
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Everything you need to manage your workforce efficiently
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {modules.map((module) => {
              const IconComponent = iconMap[module.icon_name] || HeroIcons.BriefcaseIcon;
              return (
                <a
                  key={module.slug}
                  href={`/modules/${module.slug}`}
                  className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{module.name}</h3>
                  <p className="text-sm text-gray-500">{module.hero_description || "Description coming soon"}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations Section (dynamic if integrations exist) */}
      {homeData.integrations && homeData.integrations.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              FLOWHCM EASILY INTEGRATES WITH
            </h2>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {homeData.integrations.map((integration, idx) => (
                <div key={idx} className="bg-white px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition">
                  {integration.logo ? (
                    <Image
                      src={`${API_BASE_URL}${integration.logo}`}
                      alt={integration.name}
                      width={120}
                      height={40}
                      className="object-contain"
                    />
                  ) : (
                    <span className="text-gray-700 font-medium">{integration.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose FlowHCM */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose FlowHCM
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                FlowHCM stands out due to its comprehensive HRMS features designed to streamline human resource management. It offers robust functionalities for managing employee data, payroll processing, and performance evaluations, all within a user-friendly interface. With its emphasis on scalability and efficiency, FlowHCM empowers organizations to optimize their HR processes and enhance overall productivity seamlessly.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {homeData.why_choose_features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-50 rounded-2xl p-8 shadow-inner">
                <div className="aspect-video bg-white rounded-lg shadow-lg flex items-center justify-center text-gray-400">
                  Dashboard Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employee Self-Service Mobile App */}
      <section className="bg-blue-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                FlowHCM EMPLOYEE SELF-SERVICE (ESS) MOBILE APP
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Empower your employees with the FlowHCM ESS Mobile Application. Downloaded by over 300K+ users worldwide, this application supports voice functions such as sign-in and sign-out.
              </p>
              <ul className="space-y-3">
                {homeData.app_features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="text-blue-600 font-bold">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-white flex items-center justify-center">
                  <span className="text-gray-400">App Screenshot</span>
                </div>
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-20 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">CERTIFICATIONS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Our certifications serve as evidence of our commitment to delivering high-quality business solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {homeData.certifications.map((cert, idx) => (
              <div key={idx} className="w-28 h-28 bg-white rounded-2xl shadow-md flex items-center justify-center p-4">
                {cert.image ? (
                  <Image
                    src={`${API_BASE_URL}${cert.image}`}
                    alt={cert.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {homeData.stats.map((stat, idx) => (
              <div key={idx} className="text-center text-white">
                <div className="text-5xl font-bold mb-4">{stat.value}</div>
                <p className="text-xl text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognitions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            AWARDS & RECOGNITIONS
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">
            FlowHCM has always been at the forefront in the HR Information Systems market and its footprint now covers the international market through rapidly growing HR Software implementations. FlowHCM is recognized across Pakistan and outside Pakistan as the most user-friendly HR Software.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {homeData.awards.map((award, idx) => (
              <div key={idx} className="w-40 h-24 bg-white rounded-xl shadow-md flex items-center justify-center">
                {award.image ? (
                  <Image
                    src={`${API_BASE_URL}${award.image}`}
                    alt={award.name}
                    width={120}
                    height={60}
                    className="object-contain"
                  />
                ) : (
                  <div className="w-32 h-16 bg-gray-200 rounded"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What Our Clients Say
          </h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            {homeData.testimonials.length > 0 ? (
              homeData.testimonials.map((testimonial, idx) => (
                <div key={idx} className="mb-8 last:mb-0">
                  <p className="text-gray-700 text-lg italic">"{testimonial.quote}"</p>
                  <div className="mt-6 flex items-center gap-4">
                    {testimonial.author_image ? (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={`${API_BASE_URL}${testimonial.author_image}`}
                          alt={testimonial.author_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author_name}</p>
                      <p className="text-gray-500">{testimonial.author_title}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No testimonials yet.</p>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FlowHCM</h3>
              <p className="text-gray-400 text-sm">Streamlining HR management for modern businesses.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF size={20} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
            © {new Date().getFullYear()} FlowHCM. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all z-50"
          aria-label="Scroll to top"
        >
          <ChevronUpIcon className="w-5 h-5" />
        </button>
      )}
    </main>
  );
}