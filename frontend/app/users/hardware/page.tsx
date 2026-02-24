"use client";

import { useState } from "react";
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

export default function HardwarePage() {
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const devices = [
    {
      name: "UFace800",
      tagline: "Multi‑biometric face & fingerprint terminal",
      image: "/devices/uface800.png", // placeholder
      specs: [
        "3,000 face templates",
        "4,000 fingerprint templates",
        "10,000 cards",
        "Access control",
      ],
      icon: CameraIcon,
    },
    {
      name: "MB-360",
      tagline: "Face + fingerprint + RFID",
      image: "/devices/mb360.png",
      specs: [
        "Multiple verification modes",
        "<1 sec verification",
        "Access control",
        "Password support",
      ],
      icon: FingerPrintIcon,
    },
    {
      name: "IN01-A",
      tagline: "Fingerprint with backup battery",
      image: "/devices/in01a.png",
      specs: [
        "Built‑in 200 mAh battery",
        "Power failure protection",
        "Time & attendance",
        "Access control",
      ],
      icon: BoltIcon,
    },
    {
      name: "F-21",
      tagline: "SilkID technology & live finger detection",
      image: "/devices/f21.png",
      specs: [
        "SilkID for wet/dry fingers",
        "Live finger detection",
        "Photo capture",
        "Face + fingerprint + RFID",
      ],
      icon: ShieldCheckIcon,
    },
  ];

  const features = [
    {
      icon: DevicePhoneMobileIcon,
      title: "Seamless Integration",
      desc: "Automatically syncs with FlowHCM software",
    },
    {
      icon: ChartBarIcon,
      title: "Real‑time Reports",
      desc: "Instant attendance data at your fingertips",
    },
    {
      icon: ShieldCheckIcon,
      title: "High Security",
      desc: "Multi‑factor authentication options",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Biometric Attendance Machines
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Get security identification and authentication easily from a
              biometric attendance machine & software that is automatically
              integrated with FlowHCM. Impetus Systems Pvt Ltd is the sole
              distributor of the latest biometric devices all according to your
              company’s needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/request-demo"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                Request a Quote
                <ArrowTopRightOnSquareIcon className="w-5 h-5 ml-2" />
              </a>
              <a
                href="#products"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center"
              >
                Explore Devices
              </a>
            </div>
          </div>
        </div>
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

          {/* Feature highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-center hover:shadow-md transition"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Products Grid */}
          <div id="products" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {devices.map((device, index) => (
              <div
                key={device.name}
                className="group bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-square bg-gray-100 relative flex items-center justify-center p-4">
                  {/* Placeholder for device image */}
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg flex items-center justify-center">
                    <device.icon className="w-12 h-12 text-blue-300" />
                  </div>
                  {/* Optional: hover overlay */}
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
            ))}
          </div>
        </div>
      </section>

      {/* Integration / Distributor Note */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Sole Distributor of ZK biometric devices in Pakistan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Impetus Systems is the authorized distributor for ZK biometric
            devices, ensuring genuine products and full support.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Contact Us for Bulk Orders
          </a>
        </div>
      </section>

      {/* Address Strip (similar to screenshot) */}
      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-2">United States</h4>
              <p className="text-gray-400">
                3200 Wilcrest Drive Suite 575<br />
                Houston, TX 77042
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Pakistan (Karachi)</h4>
              <p className="text-gray-400">
                Office No. 401, 4th Floor, Business Arcade<br />
                Near Lal Kothi, PECHS Block VI, Shahrah-e-Faisal, Karachi-75400
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Pakistan (Lahore)</h4>
              <p className="text-gray-400">
                House Number 114-G4, Johar Town, Lahore
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Saudi Arabia</h4>
              <p className="text-gray-400">
                Building No. 7783, Ibn Katheer St, King Abdul Aziz, Riyadh 13334
              </p>
            </div>
            <div className="lg:col-span-4">
              <h4 className="font-semibold text-white mb-2">Tanzania</h4>
              <p className="text-gray-400">
                Dymax Technologies, P.O. Box 123, Dar es Salaam, Tanzania
              </p>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm border-t border-gray-800 pt-6">
            <p>Welcome to our site, if you need help simply reply to this message, we are online and ready to help.</p>
          </div>
        </div>
      </section>

      {/* Floating Chat / CTA Button (optional) */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>

      {/* Modal for quote (simple demo) */}
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