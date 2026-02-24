"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Users,
  BarChart3,
  Globe2,
  ShieldCheck,
  ChevronRight,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

// --- Types ---
interface Category {
  id: number;
  name: string;
}

interface Client {
  id: number;
  name: string;
  logo: string | null;
  category_id: number | null;
}

export default function ClientsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  // Fetch categories on mount
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/categories/");
      const data = await res.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  // Fetch all clients (no filter)
  const fetchAllClients = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/clients/");
      const data = await res.json();
      setAllClients(data);
      setFilteredClients(data); // initially show all
    } catch (error) {
      console.error("Failed to fetch clients", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch clients by category ID
  const fetchClientsByCategory = async (categoryId: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8000/api/clients/?category=${categoryId}`
      );
      const data = await res.json();
      setFilteredClients(data);
    } catch (error) {
      console.error("Failed to fetch clients by category", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle category click
  const handleCategoryClick = (catName: string, catId?: number) => {
    setActiveCategory(catName);
    if (catName === "ALL") {
      fetchAllClients();
    } else if (catId) {
      fetchClientsByCategory(catId);
    }
  };

  // Build category list with "ALL" prepended
  const allCategories = [{ id: 0, name: "ALL" }, ...categories];

  // For the marquee, take first 20 client names (or a subset)
  const marqueeClients = allClients.slice(0, 20).map((c) => c.name);

  return (
    <main className="bg-white selection:bg-blue-100 selection:text-blue-900">
      {/* --- HERO SECTION (unchanged) --- */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z' fill='%23000'/%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            data-aos="fade-down"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-blue-700 uppercase">
              Pakistan's #1 HR Engine
            </span>
          </div>

          <h1
            data-aos="fade-up"
            className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8"
          >
            Trusted by the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Industry Giants.
            </span>
          </h1>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="max-w-2xl mx-auto relative px-10 py-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-blue-500/5 italic text-xl text-slate-600"
          >
            <span className="absolute top-2 left-6 text-7xl text-blue-100 serif select-none opacity-50">
              “
            </span>
            "Having great clients is the key to investment success."
            <footer className="mt-4 text-sm font-bold not-italic text-slate-400 tracking-widest uppercase">
              — Seth Klarman
            </footer>
          </div>
        </div>

        {/* --- SMART STATS BAR (unchanged) --- */}
        <div className="max-w-5xl mx-auto mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          {[
            { label: "Enterprise Clients", value: "500+", icon: Users },
            { label: "Industries", value: "12+", icon: BarChart3 },
            { label: "Global Offices", value: "5+", icon: Globe2 },
            { label: "Trust Score", value: "99%", icon: ShieldCheck },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-slate-50/50 rounded-2xl border border-white hover:border-blue-100 hover:bg-white transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 text-blue-500 mx-auto mb-3" />
              <div className="text-3xl font-black text-slate-900 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- MARQUEE STRIP (dynamic) --- */}
      {marqueeClients.length > 0 && (
        <div className="py-12 bg-slate-900 overflow-hidden relative border-y border-white/10">
          <div className="flex animate-marquee whitespace-nowrap items-center">
            {[...marqueeClients, ...marqueeClients].map((name, i) => (
              <div key={i} className="flex items-center mx-10">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-4 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
                <span className="text-lg font-bold text-white/40 hover:text-white transition-colors uppercase tracking-tighter">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- INTERACTIVE CATEGORIES (dynamic) --- */}
      <section className="sticky top-0 z-40 py-6 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex justify-start md:justify-center items-center gap-2 min-w-max">
            {allCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.name, cat.id === 0 ? undefined : cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.name
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- CLIENTS GRID (dynamic) --- */}
      <section className="py-20 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading clients...</div>
          ) : filteredClients.length === 0 ? (
            <div className="text-center py-20 text-slate-500">
              No clients found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredClients.map((client, index) => (
                <div
                  key={client.id}
                  data-aos="fade-up"
                  data-aos-delay={index % 6 * 50}
                  className="group relative bg-white border border-slate-200 rounded-2xl p-6 h-32 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-500/50"
                >
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  </div>

                  {/* Logo or placeholder */}
                  {client.logo ? (
                    <div className="relative w-12 h-12 mb-2">
                      <Image
                        src={`http://localhost:8000${client.logo}`}
                        alt={client.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-slate-100 rounded-full mb-2 flex items-center justify-center text-slate-400 text-[8px] font-bold">
                      No logo
                    </div>
                  )}

                  <span className="text-slate-400 font-bold text-xs text-center group-hover:text-slate-900 transition-colors uppercase tracking-tight">
                    {client.name}
                  </span>
                  <div className="mt-2 text-[8px] font-bold text-blue-500 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest">
                    Verified Partner
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- CALL TO ACTION (unchanged) --- */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Ready to streamline your HR?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Join the hundreds of companies that have already transformed their people
            operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-xl">
              Book a Demo
            </button>
            <button className="bg-blue-700 text-white border border-blue-500 px-10 py-4 rounded-xl font-bold hover:bg-blue-800 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER (unchanged, but you can make module links dynamic later) --- */}
      <footer className="bg-slate-950 text-slate-400 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            <div className="lg:col-span-4">
              <h3 className="text-2xl font-black text-white mb-6 italic tracking-tighter uppercase">
                Flow<span className="text-blue-500">HCM</span>
              </h3>
              <p className="text-sm leading-relaxed mb-8 pr-10">
                The fastest growing human capital management platform in the region.
                Purpose-built for complexity, scale, and the modern workforce.
              </p>
              <div className="flex gap-4">
                {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all border border-slate-800"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 underline decoration-blue-500 decoration-2 underline-offset-8">
                Modules
              </h4>
              <ul className="space-y-3 text-xs font-medium">
                {["Payroll", "Leave", "Performance", "Expense", "HR Letters", "Help Desk"].map(
                  (m) => (
                    <li
                      key={m}
                      className="hover:text-blue-400 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <ChevronRight size={10} /> {m} Management
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 underline decoration-blue-500 decoration-2 underline-offset-8">
                Navigate
              </h4>
              <ul className="space-y-3 text-xs font-medium">
                {["About", "Clients", "Blogs", "Contact", "Resellers", "Privacy"].map((n) => (
                  <li key={n} className="hover:text-blue-400 transition-colors cursor-pointer">
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4">
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-6 underline decoration-blue-500 decoration-2 underline-offset-8">
                Quick Connect
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <PhoneIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-white text-xs font-bold">+92 347 0213620</p>
                    <p className="text-[10px]">Sales & Inquiry</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <EnvelopeIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-white text-xs font-bold">sales@flowhcm.com</p>
                    <p className="text-[10px]">Support 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Global Presence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-slate-900 text-[11px]">
            {[
              { city: "Houston, US", addr: "3200 Wilcrest Drive Suite 575" },
              { city: "Karachi, PK", addr: "Office 401, Business Arcade, Faisal" },
              { city: "Riyadh, SA", addr: "Building 7783, Ibn Katheer St" },
              { city: "Dar es Salaam, TZ", addr: "Millennium Towers Phase II" },
            ].map((loc) => (
              <div
                key={loc.city}
                className="bg-slate-900/50 p-4 rounded-xl border border-slate-900 hover:border-slate-800 transition-all"
              >
                <p className="text-white font-bold mb-1">{loc.city}</p>
                <p className="text-slate-500 uppercase leading-tight">{loc.addr}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-[10px] font-bold tracking-[0.3em] uppercase text-slate-700">
            © 2026 Impetus Systems (Pvt) Ltd. Engineered for Excellence.
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 60s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}