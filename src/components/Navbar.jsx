import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Film, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Upcoming', href: '#upcoming' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
  { label: 'Sponsor', href: '#sponsor' },
];

export default function Navbar({ onReplayIntro }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate/95 backdrop-blur-md border-b border-gold/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-pitch/85 backdrop-blur-sm border-b border-gold/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand Emblem */}
        <a
          href="#top"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <span className="w-9 h-9 rounded bg-forest border border-gold/70 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
            <Film className="w-4 h-4 text-gold" />
          </span>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-[0.18em] text-cream group-hover:text-gold transition-colors">
              TERREL DELIGNY
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-gold/80 -mt-1">
              Director • Cinematographer
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary Navigation">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-mono uppercase tracking-[0.24em] text-cream/80 hover:text-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold hover:after:w-full after:transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onReplayIntro}
            title="Replay Clapperboard Intro"
            className="px-3 py-1.5 rounded border border-gold/40 bg-pitch/60 text-[11px] font-mono uppercase tracking-[0.16em] text-cream/80 hover:text-gold hover:border-gold transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-gold" />
            Slate Intro
          </button>
          <a
            href="#contact"
            className="px-4 py-2 rounded bg-gold text-pitch font-sans font-extrabold text-xs uppercase tracking-[0.18em] hover:bg-cream transition-all shadow-gold-glow"
          >
            Book Project
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2 rounded border border-gold/50 bg-slate text-gold hover:bg-forest transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-slate border-b border-gold/40"
            aria-label="Mobile Navigation"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="text-sm font-mono uppercase tracking-[0.24em] text-cream hover:text-gold py-1.5 border-b border-cream/10"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  onClick={handleNavClick}
                  className="flex-1 text-center py-2.5 rounded bg-gold text-pitch font-extrabold text-xs uppercase tracking-[0.2em]"
                >
                  Book Project
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onReplayIntro();
                  }}
                  className="px-4 py-2.5 rounded border border-gold/50 text-xs font-mono uppercase tracking-[0.18em] text-gold"
                >
                  Replay Intro
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
