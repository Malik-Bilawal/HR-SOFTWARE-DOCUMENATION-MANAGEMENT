"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FingerPrintIcon,
  CameraIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  BoltIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  CheckBadgeIcon,
  ClockIcon,
  UserGroupIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp, FaPhone } from "react-icons/fa";

// Map icon names to components
const iconMap: Record<string, React.ElementType> = {
  CameraIcon,
  FingerPrintIcon,
  BoltIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  IdentificationIcon,
  ClockIcon,
  UserGroupIcon,
  WifiIcon,
  CheckBadgeIcon,
};

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

interface Device {
  name: string;
  tagline: string;
  image: string | null;
  specs: string[];
  icon: string;
  price_range?: string;
}

interface Distributor {
  heading: string;
  description: string;
  button_text: string;
  button_link: string;
}

interface Office {
  location_name: string;
  address_line1: string;
  address_line2: string;
  city_state_zip: string;
  phone?: string;
  email?: string;
}

interface HardwareData {
  features: Feature[];
  devices: Device[];
  distributor: Distributor;
  offices: Office[];
  stats?: {
    devices_sold: string;
    happy_clients: string;
    support_hours: string;
    warranty_years: string;
  };
}

export default function HardwarePage() {
  const [data, setData] = useState<HardwareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      offset: 50,
      easing: 'ease-out-cubic'
    });
    
    fetch("http://localhost:8000/api/hardware/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load hardware data", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        AOS.refresh();
      }, 100);
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="mt-4 text-slate-600">Loading hardware solutions...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load content.</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white">
      {/* Hero Section with Enhanced AOS */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <div 
              data-aos="fade-down"
              className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 mb-8"
            >
              <BoltIcon className="w-4 h-4" />
              <span className="text-sm font-medium tracking-wider">ENTERPRISE GRADE HARDWARE</span>
            </div>
            
            <h1 
              data-aos="fade-right"
              data-aos-delay="100"
              className="text-5xl md:text-7xl font-black mb-6 leading-tight"
            >
              Biometric <span className="text-yellow-300">Security</span> & <br />
              Attendance Solutions
            </h1>
            
            <p 
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-xl text-blue-100 mb-8 max-w-2xl"
            >
              Pakistan's largest distributor of ZK biometric devices. 
              Trusted by 500+ organizations for workforce management.
            </p>
            
            <div 
              data-aos="fade-up"
              data-aos-delay="300"
              className="flex flex-wrap gap-4"
            >
              <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl flex items-center gap-2">
                <FaWhatsapp className="w-5 h-5" />
                Chat on WhatsApp
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all transform hover:scale-105 flex items-center gap-2">
                <FaPhone className="w-4 h-4" />
                Call for Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Devices Sold", value: "10,000+", icon: DevicePhoneMobileIcon, delay: "100" },
              { label: "Happy Clients", value: "500+", icon: UserGroupIcon, delay: "200" },
              { label: "Support Hours", value: "24/7", icon: ClockIcon, delay: "300" },
              { label: "Warranty", value: "3 Years", icon: ShieldCheckIcon, delay: "400" },
            ].map((stat, i) => (
              <div
                key={i}
                data-aos="zoom-in"
                data-aos-delay={stat.delay}
                className="text-center p-6 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all hover:shadow-lg group"
              >
                <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One Stop Solution */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-aos="fade-up"
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              One Stop Solution For All Attendance Needs
            </h2>
            <p className="text-lg text-gray-600">
              There are several biometric attendance machines in Pakistan being
              designed & used globally, however, the most popular choice remains
              Fingerprint + Face Recognition combined into a single unit. Such
              terminals provide the convenience of use through Fingerprint / Face
              Recognition & even RFID.
            </p>
          </div>

          {/* Feature highlights (dynamic) */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {data.features.map((feature, idx) => {
              const IconComponent = iconMap[feature.icon] || DevicePhoneMobileIcon;
              return (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="bg-gray-50 p-8 rounded-xl border border-gray-100 text-center hover:shadow-xl transition-all hover:-translate-y-1 group"
                >
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-blue-600 transition-all">
                    <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Products Grid (dynamic) */}
          <div 
            data-aos="fade-up"
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Biometric Devices</h3>
          </div>

          <div id="products" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.devices.map((device, index) => {
              const IconComponent = iconMap[device.icon] || CameraIcon;
              return (
                <div
                  key={device.name}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative flex items-center justify-center p-6">
                    {device.image ? (
                      <Image
                        src={`http://localhost:8000${device.image}`}
                        alt={device.name}
                        width={160}
                        height={160}
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl flex items-center justify-center">
                        <IconComponent className="w-16 h-16 text-blue-300" />
                      </div>
                    )}
                    
                    {/* Badge */}
                    <div className="absolute top-3 right-3">
                      <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        In Stock
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {device.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{device.tagline}</p>
                    
                    <ul className="space-y-2 mb-4">
                      {device.specs.map((spec, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckBadgeIcon className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => setSelectedDevice(device.name)}
                      className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                    >
                      Request Quote
                      <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration / Distributor Note (dynamic) */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
        
        <div 
          data-aos="zoom-in"
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {data.distributor.heading}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {data.distributor.description}
          </p>
          <a
            href={data.distributor.button_link}
            className="inline-flex items-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-xl gap-2"
          >
            {data.distributor.button_text}
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Address Strip with Map Integration (dynamic) */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-aos="fade-up"
            className="text-center mb-12"
          >
            <h3 className="text-2xl font-bold mb-2">Global Presence</h3>
            <p className="text-gray-400">We're everywhere you need us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.offices.map((office, idx) => (
              <div
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:translate-y-[-4px] hover:shadow-xl group"
              >
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <h4 className="font-bold text-white mb-2 text-lg">{office.location_name}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {office.address_line1}<br />
                      {office.address_line2 && <>{office.address_line2}<br /></>}
                      {office.city_state_zip}
                    </p>
                    {office.phone && (
                      <p className="mt-3 text-sm text-gray-400 flex items-center gap-2">
                        <PhoneIcon className="w-4 h-4" />
                        {office.phone}
                      </p>
                    )}
                    {office.email && (
                      <p className="mt-1 text-sm text-gray-400 flex items-center gap-2">
                        <EnvelopeIcon className="w-4 h-4" />
                        {office.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div 
            data-aos="fade-up"
            className="mt-12 text-center text-gray-500 text-sm border-t border-gray-800 pt-8"
          >
            <p className="flex items-center justify-center gap-2">
              <WifiIcon className="w-4 h-4" />
              Welcome to our site, if you need help simply reply to this message, we are online and ready to help.
            </p>
          </div>
        </div>
      </section>

      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 hover:rotate-12">
          <FaWhatsapp className="w-6 h-6" />
        </button>
      </div>

      {/* Floating Call Button */}
      <div className="fixed bottom-6 right-24 z-50">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110">
          <FaPhone className="w-6 h-6" />
        </button>
      </div>

      {/* Modal */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div 
            data-aos="zoom-in"
            className="bg-white rounded-2xl max-w-md w-full p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Request Quote for {selectedDevice}
            </h3>
            <p className="text-gray-600 mb-6">
              Our team will contact you within 24 hours with pricing, availability, and bulk discounts.
            </p>
            
            <div className="space-y-4 mb-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input 
                type="tel" 
                placeholder="Phone Number" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedDevice(null)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Submit Request
              </button>
              <button
                onClick={() => setSelectedDevice(null)}
                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}