import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Mail, MapPin, Film } from 'lucide-react';

export default function ContactSection({ selectedTier }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: 'Narrative Feature / Short',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative bg-forest/95 text-cream py-20 md:py-28 border-t border-gold/30 overflow-hidden scroll-mt-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[750px] h-[350px] rounded-full bg-pitch/70 blur-[130px]"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center space-y-3 mb-12">
          <p className="text-xs font-mono uppercase tracking-[0.28em] text-gold">
            Directorial Representation &amp; Bookings
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-[0.1em] text-gold">
            Connect With The Vision
          </h2>
          <p className="text-sm sm:text-base text-cream/85 max-w-xl mx-auto">
            For film project inquiries, commercial treatments, cinematography
            bookings, or creative collaborations, get in touch directly.
          </p>
        </div>

        {/* Gold-Framed Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="rounded-lg bg-pitch/90 border-2 border-gold shadow-gold-intense p-6 sm:p-10"
        >
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-gold mx-auto" />
              <h3 className="font-display text-3xl font-bold text-cream">
                Inquiry Logged On The Slate
              </h3>
              <p className="text-sm text-cream/80 max-w-md mx-auto">
                Thank you, <span className="text-gold font-semibold">{formData.name || 'Partner'}</span>.
                Terrel’s production desk has received your brief and will respond
                within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    projectType: 'Narrative Feature / Short',
                    message: '',
                  });
                }}
                className="mt-4 px-6 py-2.5 rounded bg-gold text-pitch font-sans font-extrabold text-xs uppercase tracking-[0.2em]"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {selectedTier && (
                <div className="p-3.5 rounded bg-forest border border-gold text-xs font-mono text-gold flex items-center justify-between">
                  <span>Selected Sponsorship Tier Inquiry: {selectedTier}</span>
                  <Film className="w-4 h-4" />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[11px] font-mono uppercase tracking-[0.2em] text-cream/75 mb-2"
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Full Name or Studio"
                    className="w-full px-4 py-3 rounded bg-slate border border-cream/25 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-[11px] font-mono uppercase tracking-[0.2em] text-cream/75 mb-2"
                  >
                    Phone / Production Line
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 / +81 / +1"
                    className="w-full px-4 py-3 rounded bg-slate border border-cream/25 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-[11px] font-mono uppercase tracking-[0.2em] text-cream/75 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="producer@studio.com"
                    className="w-full px-4 py-3 rounded bg-slate border border-cream/25 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-project-type"
                    className="block text-[11px] font-mono uppercase tracking-[0.2em] text-cream/75 mb-2"
                  >
                    Inquiry Scope
                  </label>
                  <select
                    id="contact-project-type"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded bg-slate border border-cream/25 text-cream text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                  >
                    <option>Narrative Feature / Short</option>
                    <option>Commercial / Brand Film</option>
                    <option>Documentary Commission</option>
                    <option>Cinematography / DOP Booking</option>
                    <option>Sponsorship &amp; Executive Backing</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-[11px] font-mono uppercase tracking-[0.2em] text-cream/75 mb-2"
                >
                  Project Brief, Shoot Dates &amp; Locations *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share logline, target shoot window, location, camera expectations, or sponsorship interest..."
                  className="w-full px-4 py-3 rounded bg-slate border border-cream/25 text-cream placeholder:text-cream/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded bg-gold text-pitch font-sans font-extrabold text-xs sm:text-sm uppercase tracking-[0.24em] hover:bg-cream transition-all shadow-gold-glow flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Inquiry
              </button>
            </form>
          )}

          {/* Direct Production Contacts */}
          <div className="mt-8 pt-6 border-t border-gold/25 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-cream/75">
            <span className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold" />
              bookings@terreldeligny.film
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              London • Tokyo • Worldwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
