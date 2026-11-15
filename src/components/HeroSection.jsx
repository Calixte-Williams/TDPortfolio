import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Award, ArrowUpRight, Film } from 'lucide-react';
import { HERO_FILMS, UPCOMING_SLATE } from '../data/portfolioData';

function MosaicFilmTile({
  film,
  isActive,
  isTouchDevice,
  onActivate,
  onDeactivate,
  onOpenModal,
  className = '',
}) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isActive) {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isActive]);

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      onActivate(film.id);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      onDeactivate(film.id);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();
    if (isTouchDevice) {
      if (isActive) {
        onOpenModal(film);
      } else {
        onActivate(film.id);
      }
    } else {
      onOpenModal(film);
    }
  };

  return (
    <motion.article
      layout
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.045, zIndex: 30 }}
      animate={{
        scale: isActive ? 1.04 : 1,
        zIndex: isActive ? 30 : 1,
      }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`group relative cursor-pointer overflow-hidden bg-slate border-2 border-gold transition-shadow duration-300 ${
        isActive ? 'shadow-gold-intense ring-2 ring-gold/70' : 'shadow-gold-glow'
      } ${className}`}
      role="button"
      tabIndex={0}
      aria-label={`${film.title} - ${film.category}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenModal(film);
        }
      }}
    >
      {/* Poster Image */}
      <img
        src={film.poster}
        alt={film.title}
        loading="lazy"
        className={`w-full h-full object-cover transition-all duration-700 ${
          isActive ? 'scale-110 opacity-35' : 'scale-100 opacity-80 group-hover:scale-105'
        }`}
      />

      {/* Lightweight Looping Video Preview */}
      <video
        ref={videoRef}
        src={film.previewVideo}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isActive ? 'opacity-95' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Vignette & Forest Tint */}
      <div className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/35 to-transparent" />

      {/* Top Metadata Strip */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
        <span className="px-2 py-0.5 bg-pitch/85 border border-gold/60 text-[10px] font-mono uppercase tracking-[0.18em] text-gold">
          {film.tag}
        </span>
        <span className="w-7 h-7 rounded-full bg-pitch/80 border border-gold flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-pitch transition-colors">
          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
        </span>
      </div>

      {/* Bottom Title & Interactive Hint */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex flex-col justify-end">
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold/90">
          {film.category}
        </p>
        <h3 className="font-sans font-extrabold text-xs sm:text-sm md:text-base tracking-[0.12em] uppercase text-cream drop-shadow">
          {film.title}
        </h3>

        <motion.div
          initial={false}
          animate={{
            height: isActive ? 'auto' : 0,
            opacity: isActive ? 1 : 0,
          }}
          className="overflow-hidden"
        >
          <p className="mt-1.5 text-[11px] text-cream/85 line-clamp-2 leading-snug">
            {film.logline}
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-[0.2em] text-gold font-semibold">
            {isTouchDevice ? 'Tap Again For Full Trailer' : 'Click For Full Trailer'}
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}

function AccentCalloutTile({ labelTop, labelBottom, badge, onClick, className = '' }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden bg-slate/95 hover:bg-forest border-2 border-gold shadow-gold-glow hover:shadow-gold-intense transition-all p-3 flex flex-col items-center justify-center text-center ${className}`}
    >
      <div className="absolute inset-1 border border-cream/15 pointer-events-none" />
      {badge && (
        <span className="mb-1 text-[9px] font-mono uppercase tracking-[0.22em] text-gold/90 flex items-center gap-1">
          <Award className="w-3 h-3 text-gold" />
          {badge}
        </span>
      )}
      <span className="font-sans font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.16em] text-cream group-hover:text-gold transition-colors">
        {labelTop}
      </span>
      {labelBottom && (
        <span className="font-sans font-extrabold text-[11px] sm:text-xs uppercase tracking-[0.16em] text-cream/90 mt-0.5">
          {labelBottom}
        </span>
      )}
    </motion.button>
  );
}

export default function HeroSection({ onSelectFilm }) {
  const [activeTileId, setActiveTileId] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const touchMatch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches;
    setIsTouchDevice(touchMatch);
  }, []);

  const echoes = HERO_FILMS[0];
  const shadows = HERO_FILMS[1];
  const forgotten = HERO_FILMS[2];
  const nocturne = HERO_FILMS[3];
  const monolith = HERO_FILMS[4];
  const velvet = HERO_FILMS[5];
  const ironRain = HERO_FILMS[6];

  const scrollToSection = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="top"
      onClick={() => {
        if (isTouchDevice && activeTileId) setActiveTileId(null);
      }}
      className="relative bg-pitch text-cream overflow-hidden pt-8 pb-20 md:pt-14 md:pb-28 diamond-lattice"
    >
      {/* Atmospheric Deep Forest Green Radial Spotlights on Pitch Black Canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[680px] h-[680px] rounded-full bg-forest/55 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[38%] -left-32 w-[520px] h-[520px] rounded-full bg-forest/45 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-12 right-1/4 w-[420px] h-[420px] rounded-full bg-gold/10 blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* MAIN HERO: Left Off-Centered Title + Surrounding Asymmetrical Floating Tile Mosaic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* Off-Centered Left Typography Column */}
          <div className="lg:col-span-5 space-y-6 text-left lg:pr-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-forest/80 border border-gold/60 shadow-gold-glow">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-cream">
                Directorial & Cinematography Portfolio
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-semibold tracking-tight text-cream leading-[0.98]">
                Terrel Deligny
              </h1>
              <p className="font-sans text-sm sm:text-base md:text-lg font-bold uppercase tracking-[0.28em] text-cream/90 pt-1">
                Director <span className="text-gold px-1">|</span> Cinematographer
              </p>
            </div>

            <div className="h-[2px] w-44 bg-gradient-to-r from-gold via-gold/60 to-transparent" />

            <p className="text-sm sm:text-base text-cream/80 leading-relaxed max-w-md">
              Visualizing stories with deeper meanings to bring topics to light that 
              are overlooked while experimenting with different genres like {' '}
              <span className="text-gold font-semibold">Horror</span> and{' '}
              <span className="text-gold font-semibold">Comedy</span>.
            </p>

            {/* Interactive Controls */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onSelectFilm(echoes)}
                className="px-6 py-3.5 rounded bg-gold text-pitch font-sans font-extrabold text-xs uppercase tracking-[0.22em] hover:bg-cream transition-all shadow-gold-glow flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Play Featured Reel
              </button>
              <a
                href="#sponsor"
                className="px-5 py-3.5 rounded bg-slate/90 border border-gold text-cream hover:bg-forest hover:text-gold font-mono text-xs uppercase tracking-[0.2em] transition-all"
              >
                Sponsorship Deck
              </a>
            </div>

            {/* Interaction Legend */}
            <div className="pt-3 flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-cream/65">
              <span className="w-2 h-2 rounded-full bg-gold" />
              <span>
                {isTouchDevice
                  ? 'Tap once to preview clip • Tap twice for full film modal'
                  : 'Hover any Gold-framed tile to expand preview • Click for full trailer'}
              </span>
            </div>
          </div>

          {/* Right / Surrounding Asymmetrical Floating Tile Mosaic */}
          <div id="projects" className="lg:col-span-7 scroll-mt-24">
            {/* Desktop & Tablet Organic Cluster */}
            <div className="hidden sm:grid grid-cols-12 auto-rows-[74px] gap-3.5 items-stretch">
              {/* Top Crown Accent Tile */}
              <AccentCalloutTile
                labelTop="35MM • 16MM"
                labelBottom="LARGE FORMAT"
                badge="KODAK & ARRI"
                onClick={() => onSelectFilm(monolith)}
                className="col-start-5 col-span-3 row-start-1 row-span-2"
              />

              {/* Small Doc 2023 Badge */}
              <AccentCalloutTile
                labelTop="DOC |"
                labelBottom="2023"
                onClick={() => onSelectFilm(monolith)}
                className="col-start-2 col-span-2 row-start-2 row-span-1"
              />

              {/* Bio & Philosophy Tile */}
              <AccentCalloutTile
                labelTop="BIO &"
                labelBottom="PHILOSOPHY"
                onClick={() => scrollToSection('#about')}
                className="col-start-3 col-span-2 row-start-3 row-span-2"
              />

              {/* Featured Film 1: ECHOES OF SILENCE */}
              <MosaicFilmTile
                film={echoes}
                isActive={activeTileId === echoes.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-start-5 col-span-4 row-start-3 row-span-3"
              />

              {/* Small BAFTA Laurel Tile */}
              <AccentCalloutTile
                labelTop="BAFTA"
                labelBottom="SHORTLIST"
                badge="LAUREL"
                onClick={() => onSelectFilm(echoes)}
                className="col-start-9 col-span-2 row-start-2 row-span-1"
              />

              {/* Awards & Acclaim Tile */}
              <AccentCalloutTile
                labelTop="AWARDS &"
                labelBottom="ACCLAIM"
                onClick={() => scrollToSection('#reviews')}
                className="col-start-9 col-span-3 row-start-3 row-span-2"
              />

              {/* Featured Film 2: CHASING SHADOWS */}
              <MosaicFilmTile
                film={shadows}
                isActive={activeTileId === shadows.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-start-9 col-span-4 row-start-5 row-span-3"
              />

              {/* Center Bridge Tile: Nocturne in Amber */}
              <MosaicFilmTile
                film={nocturne}
                isActive={activeTileId === nocturne.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-start-5 col-span-4 row-start-6 row-span-2"
              />

              {/* Left Secondary Bio & Craft Tile */}
              <MosaicFilmTile
                film={monolith}
                isActive={activeTileId === monolith.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-start-1 col-span-4 row-start-5 row-span-3"
              />

              {/* Featured Film 3: THE FORGOTTEN PATH */}
              <MosaicFilmTile
                film={forgotten}
                isActive={activeTileId === forgotten.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-start-3 col-span-5 row-start-8 row-span-3"
              />

              {/* Trailers & Docs Tile */}
              <MosaicFilmTile
                film={velvet}
                isActive={activeTileId === velvet.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-start-8 col-span-3 row-start-8 row-span-2"
              />

              {/* Feature 2024 Callout */}
              <AccentCalloutTile
                labelTop="FEATURE |"
                labelBottom="2024"
                badge="TIFF"
                onClick={() => onSelectFilm(shadows)}
                className="col-start-11 col-span-2 row-start-8 row-span-2"
              />

              {/* Bottom Anchor Tile: IRON RAIN */}
              <MosaicFilmTile
                film={ironRain}
                isActive={activeTileId === ironRain.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-start-8 col-span-5 row-start-10 row-span-2"
              />

              {/* Bottom Left Mini Tile */}
              <AccentCalloutTile
                labelTop="TRAILER |"
                labelBottom="2025"
                onClick={() => onSelectFilm(echoes)}
                className="col-start-1 col-span-2 row-start-8 row-span-2"
              />
            </div>

            {/* Mobile Responsive Asymmetrical Grid */}
            <div className="grid sm:hidden grid-cols-2 gap-3.5">
              <MosaicFilmTile
                film={echoes}
                isActive={activeTileId === echoes.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-span-2 h-64"
              />
              <MosaicFilmTile
                film={shadows}
                isActive={activeTileId === shadows.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-span-1 h-48"
              />
              <MosaicFilmTile
                film={forgotten}
                isActive={activeTileId === forgotten.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-span-1 h-48"
              />
              <MosaicFilmTile
                film={nocturne}
                isActive={activeTileId === nocturne.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-span-1 h-44"
              />
              <MosaicFilmTile
                film={velvet}
                isActive={activeTileId === velvet.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-span-1 h-44"
              />
              <MosaicFilmTile
                film={ironRain}
                isActive={activeTileId === ironRain.id}
                isTouchDevice={isTouchDevice}
                onActivate={setActiveTileId}
                onDeactivate={() => setActiveTileId(null)}
                onOpenModal={onSelectFilm}
                className="col-span-2 h-52"
              />
            </div>
          </div>
        </div>

        {/* EXPLORE THE WORK BANNER STATEMENT */}
        <div className="mt-20 md:mt-28 text-center space-y-2">
          <p className="font-sans text-lg sm:text-2xl font-extrabold uppercase tracking-[0.22em] text-gold">
            Explore The Work <span className="text-cream">|</span>
          </p>
          <p className="font-sans text-base sm:text-xl md:text-2xl font-semibold uppercase tracking-[0.18em] text-cream">
            Cinematic Stories Told With Precision
          </p>
        </div>

        {/* UPCOMING WORK CLUSTER (Matching Reference) */}
        <div id="upcoming" className="mt-16 md:mt-20 scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold uppercase tracking-[0.14em] text-gold">
              Upcoming Work
            </h2>
            <p className="mt-2 text-xs font-mono uppercase tracking-[0.24em] text-cream/65">
              2026–2027 Development & Pre-Production Slate
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {UPCOMING_SLATE.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -4, scale: 1.02 }}
                onClick={() => onSelectFilm(ironRain)}
                className={`cursor-pointer p-6 bg-slate/95 border-2 border-gold transition-all ${
                  item.featured
                    ? 'md:col-span-6 shadow-gold-intense bg-gradient-to-b from-forest/80 to-slate py-10'
                    : 'md:col-span-3 shadow-gold-glow'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-gold mb-2">
                  <span>{item.code}</span>
                  <Film className="w-3.5 h-3.5 text-gold" />
                </div>
                <h3 className="font-display text-2xl font-bold text-cream tracking-wide">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-mono uppercase tracking-[0.18em] text-gold/90">
                  Stage: {item.stage}
                </p>
                <p className="mt-3 text-xs sm:text-sm text-cream/80 leading-relaxed">
                  {item.detail}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.2em] text-gold">
                  Preview Concept Reel <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
