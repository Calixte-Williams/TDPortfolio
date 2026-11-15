import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Calendar, Film } from 'lucide-react';
import { PAST_FILMS } from '../data/portfolioData';

const CARDS_PER_PAGE = 6; // 3 columns × 2 rows

function FilmCard({ film, onSelect }) {
  return (
    <motion.article
      onClick={() => onSelect(film)}
      whileHover={{ scale: 1.035, y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      className="group relative cursor-pointer overflow-hidden rounded-md bg-slate border-2 border-gold shadow-gold-glow hover:shadow-gold-intense transition-shadow duration-300 h-56 sm:h-60"
      role="button"
      tabIndex={0}
      aria-label={`${film.title} — ${film.releaseDate}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(film);
        }
      }}
    >
      {/* Cover Art */}
      <img
        src={film.poster}
        alt={film.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Vignette & Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/30 to-transparent" />

      {/* Top Metadata Strip */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
        <span className="px-2 py-0.5 bg-pitch/85 border border-gold/60 text-[10px] font-mono uppercase tracking-[0.16em] text-gold truncate">
          {film.tag}
        </span>
        <span className="w-8 h-8 rounded-full bg-pitch/85 border border-gold flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-pitch transition-colors shrink-0">
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        </span>
      </div>

      {/* Bottom Title & Date */}
      <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-gold/90">
          {film.category}
        </p>
        <h3 className="font-sans font-extrabold text-sm sm:text-base uppercase tracking-[0.1em] text-cream drop-shadow leading-tight">
          {film.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.16em] text-cream/75">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3 h-3 text-gold" />
            {film.releaseDate}
          </span>
          <span className="text-gold/70">{film.duration}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function FilmsSection({ onSelectFilm }) {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < PAST_FILMS.length; i += CARDS_PER_PAGE) {
      chunks.push(PAST_FILMS.slice(i, i + CARDS_PER_PAGE));
    }
    return chunks;
  }, []);

  const totalPages = pages.length;

  const scrollToPage = (pageIndex) => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return;
    const clamped = Math.max(0, Math.min(totalPages - 1, pageIndex));
    const targetPage = el.children[clamped];
    el.scrollTo({ left: targetPage.offsetLeft, behavior: 'smooth' });
    setPage(clamped);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || el.children.length === 0) return;
    const pageEls = Array.from(el.children);
    const current = pageEls.reduce((best, pageEl, idx) => {
      return Math.abs(pageEl.offsetLeft - el.scrollLeft) < Math.abs(pageEls[best].offsetLeft - el.scrollLeft)
        ? idx
        : best;
    }, 0);
    if (current !== page) setPage(current);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <section
      id="films"
      className="relative bg-pitch text-cream py-20 md:py-28 border-t border-gold/20 overflow-hidden scroll-mt-16 film-grain"
    >
      {/* Atmospheric Forest Green Spotlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/3 w-[620px] h-[620px] rounded-full bg-forest/50 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 w-[460px] h-[460px] rounded-full bg-forest/40 blur-[130px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.26em] text-gold mb-2">
              <Film className="w-4 h-4" />
              <span>Past Works • Feature & Short Film Archive</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-[0.12em] text-gold">
              Films
            </h2>
          </div>

          {/* Scroll Controls */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-cream/60">
              {String(page + 1).padStart(2, '0')} / {String(totalPages).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => scrollToPage(page - 1)}
                disabled={page === 0}
                aria-label="Scroll Films Backward"
                className="w-10 h-10 rounded-full border border-gold/60 bg-slate text-gold flex items-center justify-center hover:bg-gold hover:text-pitch transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-gold-glow"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToPage(page + 1)}
                disabled={page === totalPages - 1}
                aria-label="Scroll Films Forward"
                className="w-10 h-10 rounded-full border border-gold/60 bg-slate text-gold flex items-center justify-center hover:bg-gold hover:text-pitch transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-gold-glow"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Snap-Scroll Track: 3 Columns × 2 Rows Per Viewport */}
        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth py-3 px-1 -my-3 -mx-1 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {pages.map((pageFilms, pageIndex) => (
            <div
              key={pageIndex}
              className="w-full shrink-0 snap-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
              style={{ scrollSnapAlign: 'start' }}
            >
              {pageFilms.map((film) => (
                <FilmCard key={film.id} film={film} onSelect={onSelectFilm} />
              ))}
            </div>
          ))}
        </div>

        {/* Page Indicator Dots */}
        <div className="mt-4 flex items-center justify-center gap-2.5">
          {pages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToPage(idx)}
              aria-label={`Go to Films page ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                idx === page
                  ? 'w-8 bg-gold shadow-gold-glow'
                  : 'w-3 bg-cream/25 hover:bg-gold/60'
              }`}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-[11px] font-mono uppercase tracking-[0.22em] text-cream/55">
          Click any film to open its expanded YouTube trailer card — drag, swipe, or use the arrows to browse the archive
        </p>
      </div>
    </section>
  );
}
