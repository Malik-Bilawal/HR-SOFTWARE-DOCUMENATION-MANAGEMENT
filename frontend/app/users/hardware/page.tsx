"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FingerPrintIcon,
  CameraIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  BoltIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

// Map icon names to components
const iconMap: Record<string, React.ElementType> = {
  CameraIcon,
  FingerPrintIcon,
  BoltIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
  ChartBarIcon,
  // add more if needed
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
}

interface HardwareData {
  features: Feature[];
  devices: Device[];
  distributor: Distributor;
  offices: Office[];
}

export default function HardwarePage() {
  const [data, setData] = useState<HardwareData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  useEffect(() => {
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

  if (loading) {
    return <div className="text-center py-20">Loading hardware...</div>;
  }

  if (!data) {
    return <div className="text-center py-20">Failed to load content.</div>;
  }

  return (
    <main className="bg-white">
      {/* Hero Section (unchanged static content) */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        {/* ... keep as is ... */}
      </section>

      {/* One Stop Solution */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
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
                  className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:shadow-md transition"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Products Grid (dynamic) */}
          <div id="products" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.devices.map((device, index) => {
              const IconComponent = iconMap[device.icon] || CameraIcon;
              return (
                <div
                  key={device.name}
                  className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-square bg-gray-100 relative flex items-center justify-center p-4">
                    {device.image ? (
                      <Image
                        src={`http://localhost:8000${device.image}`}
                        alt={device.name}
                        width={128}
                        height={128}
                        className="object-contain"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-12 h-12 text-blue-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors"></div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {device.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{device.tagline}</p>
                    <ul className="space-y-1 mb-4">
                      {device.specs.map((spec, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-600 mt-1">•</span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setSelectedDevice(device.name)}
                      className="w-full bg-blue-50 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors"
                    >
                      Request Quote
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration / Distributor Note (dynamic) */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {data.distributor.heading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {data.distributor.description}
          </p>
          <a
            href={data.distributor.button_link}
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {data.distributor.button_text}
          </a>
        </div>
      </section>

      {/* Address Strip (dynamic) */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            {data.offices.map((office, idx) => (
              <div key={idx}>
                <h4 className="font-semibold text-white mb-2">{office.location_name}</h4>
                <p className="text-gray-400">
                  {office.address_line1}<br />
                  {office.address_line2 && <>{office.address_line2}<br /></>}
                  {office.city_state_zip}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
            <p>Welcome to our site, if you need help simply reply to this message, we are online and ready to help.</p>
          </div>
        </div>
      </section>

      {/* Floating Chat Button (unchanged) */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* Modal (unchanged) */}
      {selectedDevice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Request Quote for {selectedDevice}
            </h3>
            <p className="text-gray-600 mb-4">
              Our team will contact you shortly with pricing and availability.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedDevice(null)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                OK
              </button>
              <button
                onClick={() => setSelectedDevice(null)}
                className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
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