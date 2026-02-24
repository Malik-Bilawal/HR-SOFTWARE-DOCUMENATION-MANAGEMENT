"use client"; // Needed for useState/useEffect if we add interactivity

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
import { FaLinkedin, FaTwitter, FaFacebookF } from "react-icons/fa"; // Social icons

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll-to-top button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const modules = [
    { name: "Employee", icon: UserGroupIcon, desc: "Streamline Workflow Data and Operations" },
    { name: "Attendance", icon: ClockIcon, desc: "Efficiently Track Employee Attendance" },
    { name: "Leave", icon: CalendarDaysIcon, desc: "Simplify Leave Tracking and Approval" },
    { name: "Payroll", icon: CurrencyDollarIcon, desc: "Efficient Payroll Processing & Reporting" },
    { name: "Separation", icon: ArrowRightOnRectangleIcon, desc: "Smooth Employee Departures" },
    { name: "Recruitment", icon: BriefcaseIcon, desc: "Elevate Your Hiring Process" },
    { name: "Performance", icon: ChartBarIcon, desc: "Quick & Easy Appraisal Management" },
    { name: "Help Desk", icon: LifebuoyIcon, desc: "Simplify Internal Support Processes" },
    { name: "Expense", icon: ReceiptPercentIcon, desc: "Control and Track Expenses" },
    { name: "HR Letters", icon: DocumentTextIcon, desc: "Efficient HR Communication" },
    { name: "Training", icon: AcademicCapIcon, desc: "Streamline Employee Skill Development" },
    { name: "Manager", icon: UserIcon, desc: "Efficient Workforce Planning and Budgeting" },
  ];

  const whyFeatures = [
    "Fastest Growing HR Software",
    "Single Click Payroll",
    "Customized User Role",
    "Automated Alerts & Notifications",
    "On-Cloud & On-premises Mobile Application",
    "Dynamic Workflow & Approvals",
    "Employee Self Service",
    "Dynamic & Customizable Reports",
    "Analytical & Dynamic HR Dashboards",
    "AI Based Voice Drive HCMS/HRMS",
  ];

  const appFeatures = [
    "Review attendance and leave summaries on the home dashboard.",
    "Access HR policies at your fingertips.",
    "Get essential notifications to ensure a seamless process.",
    "Easily apply for leaves from any time, anywhere.",
    "Share important news with push notifications to everyone.",
    "Access essential reports for the users and their subordinates.",
    "Access your paylists in real-time.",
    "Approve employee requests with one touch quickly.",
  ];

  // Placeholder logos – replace with actual image paths
  const certifications = [
    { name: "ISO 27001", image: "/cert1.png" },
    { name: "GDPR Compliant", image: "/cert2.png" },
    { name: "SOC 2 Type II", image: "/cert3.png" },
  ];

  const awards = [
    { name: "Best HR Software 2024", image: "/award1.png" },
    { name: "Top Rated HRMS", image: "/award2.png" },
  ];

  const clients = [
    "Microsoft", "Oracle", "SAP", "Deloitte", "PwC", "Accenture"
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Best HR Software To Manage Your Employees
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            A complete HR software & highly regarded On-Cloud & On-Premise HCMS that covers nearly the entire scope of HR management while being strictly compliant with both local and global Best HR Practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/request-demo"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Request a Demo
            </a>
            <a
              href="/modules"
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Explore Modules
            </a>
          </div>
        </div>
      </section>

      {/* Client Logos Strip */}
      <section className="py-10 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm uppercase tracking-wider text-gray-500 mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clients.map((client) => (
              <div key={client} className="grayscale hover:grayscale-0 transition duration-300">
                <span className="text-gray-400 font-medium">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Modules */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            FlowHCM TOP MODULES
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Everything you need to manage your workforce efficiently
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {modules.map((module) => (
              <div
                key={module.name}
                className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <module.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{module.name}</h3>
                <p className="text-sm text-gray-500">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            FLOWHCM EASILY INTEGRATES WITH
          </h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {["Microsoft Dynamics 365", "Oracle", "SAP"].map((name) => (
              <div key={name} className="bg-white px-6 py-4 rounded-xl shadow-sm hover:shadow-md transition">
                <span className="text-gray-700 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                {whyFeatures.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-50 rounded-2xl p-8 shadow-inner">
                {/* Placeholder for a dashboard preview image */}
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
                {appFeatures.map((feature, idx) => (
                  <li key={idx} className="flex gap-3 text-gray-700">
                    <span className="text-blue-600 font-bold">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-[500px] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-100">
                {/* Placeholder for phone screen mockup */}
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
            {certifications.map((cert) => (
              <div key={cert.name} className="w-28 h-28 bg-white rounded-2xl shadow-md flex items-center justify-center p-4">
                <div className="w-full h-full bg-gray-200 rounded"></div>
                {/* Replace with <Image src={cert.image} alt={cert.name} width={80} height={80} /> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="text-5xl font-bold mb-4">1,300+</div>
          <p className="text-xl text-blue-100">ORGANIZATIONS RELY ON FLOWHCM</p>
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
            {awards.map((award) => (
              <div key={award.name} className="w-40 h-24 bg-white rounded-xl shadow-md flex items-center justify-center">
                <div className="w-32 h-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What Our Clients Say
          </h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <p className="text-gray-700 text-lg italic">
              "We were searching for a robust HR solution for our growing company and found a well-reputed FlowHCM that offers great flexibility and control. The system is user-friendly and we have no hesitation in recommending this employee-friendly FlowHCM."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-semibold text-gray-900">Alex Morgan</p>
                <p className="text-gray-500">CTO, TechStart Inc.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/modules" className="hover:text-white">Modules</a></li>
                <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/integrations" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/blogs" className="hover:text-white">Blog</a></li>
                <li><a href="/tutorials" className="hover:text-white">Tutorials</a></li>
                <li><a href="/support" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/about" className="hover:text-white">About Us</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
                <li><a href="/terms" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 FlowHCM. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white"><FaLinkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF size={20} /></a>
            </div>
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