"use client";

import { useState, useEffect } from "react";
import { BoltIcon, ArrowRightIcon, ChatBubbleLeftIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { MapPinIcon, PhoneIcon, ClockIcon } from "@heroicons/react/24/outline";

interface ContactInfo {
  address_line1: string;
  address_line2: string;
  city_state_zip: string;
  sales_phone: string;
  support_phone: string;
  info_email: string;
  support_email: string;
  hours_weekday: string;
  hours_saturday: string;
  hours_sunday: string;
  map_embed_url: string;
}

export default function ContactPage() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Fetch contact info
  useEffect(() => {
    fetch("http://localhost:8000/api/contact-info/")
      .then((res) => res.json())
      .then((data) => {
        setContactInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load contact info", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const res = await fetch("http://localhost:8000/api/contact-message/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setSubmitError(data.error || "Something went wrong");
      }
    } catch (error) {
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading contact information...</div>;
  }

  return (
    <main className="bg-white">
      {/* Hero Section (unchanged) */}
      <section className="relative isolate overflow-hidden bg-[#fafbfc] py-24 sm:py-32">
        {/* Smart Gradient Mesh Background */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#9333ea] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-16 gap-y-16 lg:max-w-none lg:grid-cols-2 lg:items-center">

            {/* Left: Content & Intelligence */}
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 rounded-full bg-blue-600/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600/10 mb-6">
                <BoltIcon className="h-4 w-4" />
                <span>Smart Support Active</span>
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-7xl">
                Solutions for <br />
                <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Complex People Ops.</span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600 max-w-md">
                Skip the queue. Our smart routing connects you directly with a specialist based on your organization size and technical needs.
              </p>

              <div className="mt-10 flex flex-col gap-y-4 sm:flex-row sm:items-center sm:gap-x-6">
                <button className="rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                  Start a Conversation <ArrowRightIcon className="h-4 w-4" />
                </button>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                  <div className="flex -space-x-1">
                    {[1, 2, 3].map(i => <div key={i} className="h-6 w-6 rounded-full bg-slate-200 border-2 border-white" />)}
                  </div>
                  <span>Experts online now</span>
                </div>
              </div>

              {/* Integration Logos (Social Proof) */}
              <div className="mt-16">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Integrates with your stack</p>
                <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                  {/* Replace with actual SVG logos */}
                  <div className="h-6 w-20 bg-slate-300 rounded" />
                  <div className="h-6 w-20 bg-slate-300 rounded" />
                  <div className="h-6 w-20 bg-slate-300 rounded" />
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-500 hover:shadow-xl">
                <div>
                  <ChatBubbleLeftIcon className="h-8 w-8 text-blue-600" />
                  <h3 className="mt-4 font-bold text-slate-900 text-lg">Live Chat</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">Best for technical troubleshooting and quick feature questions.</p>
                </div>
                <p className="mt-6 text-xs font-bold text-blue-600 uppercase tracking-wider">Avg Response: 2m</p>
              </div>

              <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-500 hover:shadow-xl lg:translate-y-6">
                <div>
                  <EnvelopeIcon className="h-8 w-8 text-purple-600" />
                  <h3 className="mt-4 font-bold text-slate-900 text-lg">Sales & Partnerships</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">Discuss custom pricing, enterprise security, or OEM partnerships.</p>
                </div>
                <p className="mt-6 text-xs font-bold text-purple-600 uppercase tracking-wider">Available 24/7</p>
              </div>

              <div className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-blue-500 hover:shadow-xl">
                <div>
                  <PhoneIcon className="h-8 w-8 text-indigo-600" />
                  <h3 className="mt-4 font-bold text-slate-900 text-lg">Schedule a Demo</h3>
                  <p className="mt-2 text-sm text-slate-500 leading-relaxed">Book a personalized walkthrough with a product architect.</p>
                </div>
                <p className="mt-6 text-xs font-bold text-indigo-600 uppercase tracking-wider">Book Calendar</p>
              </div>

              <div className="relative flex flex-col justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 p-8 lg:translate-y-6">
                <p className="text-center text-sm font-medium text-slate-400">
                  Self-service <br />
                  <a href="#" className="text-blue-600 underline">Help Center</a>
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Let's Talk
              </h2>
              <p className="text-gray-600 mb-8">
                We're here to answer any questions you may have about our HRMS
                solutions. Feel free to reach out via phone, email, or visit
                our office.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPinIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office Address</h3>
                    <p className="text-gray-600">
                      {contactInfo?.address_line1}<br />
                      {contactInfo?.address_line2 && <>{contactInfo.address_line2}<br /></>}
                      {contactInfo?.city_state_zip}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <PhoneIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">
                      Sales: {contactInfo?.sales_phone}<br />
                      Support: {contactInfo?.support_phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">
                      {contactInfo?.info_email}<br />
                      {contactInfo?.support_email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ClockIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: {contactInfo?.hours_weekday}<br />
                      Saturday: {contactInfo?.hours_saturday}<br />
                      Sunday: {contactInfo?.hours_sunday}
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              {contactInfo?.map_embed_url ? (
                <div className="mt-10 h-64 w-full rounded-xl overflow-hidden">
                  <iframe
                    src={contactInfo.map_embed_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              ) : (
                <div className="mt-10 bg-gray-200 rounded-xl h-64 w-full flex items-center justify-center text-gray-500">
                  <span>Google Map Integration</span>
                </div>
              )}
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              {submitSuccess && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                  Thank you! Your message has been sent.
                </div>
              )}
              {submitError && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {submitError}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Optional CTA Section (unchanged) */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prefer to talk?
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Call our sales team directly at <span className="font-semibold">{contactInfo?.sales_phone}</span>
          </p>
          <a
            href="/request-demo"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Request a Demo
          </a>
        </div>
      </section>
    </main>
  );
}