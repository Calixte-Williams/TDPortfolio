import React from 'react';
import { ArrowUp, Instagram, Linkedin, Video, Film } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate text-cream border-t border-gold/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <span className="w-10 h-10 rounded bg-forest border border-gold flex items-center justify-center shadow-gold-glow">
            <Film className="w-5 h-5 text-gold" />
          </span>
          <div>
            <p className="font-display text-xl font-bold tracking-[0.16em] text-cream">
              TERREL DELIGNY
            </p>
            <p className="text-xs font-mono text-cream/65">
              © {new Date().getFullYear()} Terrel Deligny. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Anchor Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-[0.22em]">
          <a href="#projects" className="text-cream/80 hover:text-gold transition-colors">
            Projects
          </a>
          <a href="#about" className="text-cream/80 hover:text-gold transition-colors">
            About
          </a>
          <a href="#reviews" className="text-cream/80 hover:text-gold transition-colors">
            Reviews
          </a>
          <a href="#contact" className="text-cream/80 hover:text-gold transition-colors">
            Contact
          </a>
          <a href="#sponsor" className="text-cream/80 hover:text-gold transition-colors">
            Sponsor
          </a>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded bg-pitch/70 border border-gold/40 flex items-center justify-center text-cream hover:text-pitch hover:bg-gold transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href="https://vimeo.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Vimeo"
            className="w-10 h-10 rounded bg-pitch/70 border border-gold/40 flex items-center justify-center text-cream hover:text-pitch hover:bg-gold transition-colors"
          >
            <Video className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="w-10 h-10 rounded bg-pitch/70 border border-gold/40 flex items-center justify-center text-cream hover:text-pitch hover:bg-gold transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={scrollToTop}
            className="ml-2 px-4 py-2.5 rounded-full bg-forest border border-gold text-gold hover:bg-gold hover:text-pitch font-mono text-xs uppercase tracking-[0.18em] transition-all inline-flex items-center gap-1.5 shadow-gold-glow"
          >
            Top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
