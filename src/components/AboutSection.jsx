import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Compass, Eye, Sparkles } from 'lucide-react';
import { PHILOSOPHY_PILLARS } from '../data/portfolioData';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative bg-forest text-cream py-20 md:py-28 border-y border-gold/30 overflow-hidden scroll-mt-16"
    >
      {/* Subtle Dark Slate & Gold atmospheric accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-pitch/45 blur-[130px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 space-y-20">
        {/* TOP SPLIT BANNER: Candid Camera Image + Bio Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-slate/90 border-2 border-gold/70 shadow-gold-glow rounded-lg overflow-hidden">
          {/* Candid On-Set Camera Portrait */}
          <div className="lg:col-span-6 relative h-[360px] sm:h-[440px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=85"
              alt="Terrel Deligny operating a cinema camera on location"
              loading="lazy"
              className="w-full h-full object-cover object-center contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pitch/20 to-slate/95 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate via-transparent to-transparent lg:hidden" />

            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded bg-pitch/85 border border-gold/60 text-[11px] font-mono uppercase tracking-[0.2em] text-gold flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-gold" />
              On Set • 35mm & Large Format Digital
            </div>
          </div>

          {/* Director Introduction Copy */}
          <div className="lg:col-span-6 p-6 sm:p-10 space-y-5">
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-gold">
              About The Director
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-wide text-cream">
              TERREL DELIGNY
            </h2>
            <p className="text-sm sm:text-base text-cream/90 leading-relaxed">
              Terrel Deligny is a visionary director and cinematographer known for
              his precise, atmospheric visual storytelling. With a passion for
              excavating the human condition in unexpected places, his work across
              narrative features, commercial films, and documentary portraiture has
              garnered international festival acclaim.
            </p>
            <p className="text-sm sm:text-base text-cream/80 leading-relaxed">
              His eye for natural shadow ratios, motivated tungsten light, and
              patient camera choreography brings tactile emotional weight to every
              frame.
            </p>

            {/* Signature Pillars Badges */}
            <div className="pt-2 flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded bg-forest border border-gold text-xs font-mono uppercase tracking-[0.2em] text-cream shadow-gold-glow">
                Authenticity
              </span>
              <span className="px-4 py-2 rounded bg-forest border border-gold text-xs font-mono uppercase tracking-[0.2em] text-cream shadow-gold-glow">
                Collaboration
              </span>
              <span className="px-4 py-2 rounded bg-forest border border-gold text-xs font-mono uppercase tracking-[0.2em] text-cream shadow-gold-glow">
                Risk-Taking
              </span>
            </div>
          </div>
        </div>

        {/* SECOND EDITORIAL BLOCK: THE VISION & THE WAY / ABOUT THE PHILOSOPHY */}
        <div className="space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-gold">
              Director & Craft
            </p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-[0.1em] text-gold">
              The Vision &amp; The Way
            </h2>
            <p className="text-sm sm:text-base text-cream/85">
              “The frame should feel inevitable — lit by motive, moved by character,
              and cut with emotional clarity.”
            </p>
          </div>

          {/* Wide Gold-Framed Behind-The-Scenes Banner */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-lg overflow-hidden border-2 border-gold shadow-gold-intense bg-slate"
          >
            <div className="aspect-[16/7] w-full relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1600&q=85"
                alt="Behind the scenes night shoot in the forest with cinema lighting"
                loading="lazy"
                className="w-full h-full object-cover contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pitch via-pitch/35 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="px-3 py-1 rounded bg-forest/90 border border-gold text-[11px] font-mono uppercase tracking-[0.22em] text-gold">
                    Location Study • Night Exterior
                  </span>
                  <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-cream">
                    Sculpting Atmosphere With Practical Light &amp; Shadow
                  </h3>
                </div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-cream/80 bg-pitch/80 px-3 py-1.5 rounded border border-gold/40">
                  Based Between London &amp; Tokyo
                </span>
              </div>
            </div>
          </motion.div>

          {/* Secondary BTS Image + Philosophy Deep Forest Green Containers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Secondary Framed BTS Card */}
            <div className="lg:col-span-5 rounded-lg overflow-hidden border-2 border-gold shadow-gold-glow bg-slate flex flex-col justify-between">
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=85"
                  alt="Cinema camera lens and matte box closeup on set"
                  loading="lazy"
                  className="w-full h-full object-cover contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate via-transparent to-transparent" />
              </div>
              <div className="p-6 bg-slate border-t border-gold/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-gold">
                  <Compass className="w-4 h-4" />
                  <span>Visual Grammar</span>
                </div>
                <p className="text-sm text-cream/90 leading-relaxed">
                  Combining vintage anamorphic glass with disciplined negative space
                  so every close-up lands with visceral weight.
                </p>
              </div>
            </div>

            {/* Right Deep Forest Green Philosophy Containers */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="p-6 sm:p-8 rounded-lg bg-pitch/65 border border-gold/60 shadow-gold-glow space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.24em] text-gold">
                  <Eye className="w-4 h-4" />
                  <span>ABOUT THE PHILOSOPHY</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-cream">
                  Human-Led Cinema Built on Patience, Texture, and Intent
                </h3>
                <p className="text-sm sm:text-base text-cream/85 leading-relaxed">
                  Whether directing an intimate two-hander in a rain-drenched Tokyo
                  apartment or scaling a ridge in the Scottish Highlands with a
                  16mm camera, Terrel treats the lens as an empathetic observer—never
                  an intrusion.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PHILOSOPHY_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-5 rounded-lg bg-forest border border-gold/60 hover:border-gold shadow-gold-glow transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2.5 h-2.5 bg-gold inline-block" />
                        <h4 className="font-sans text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
                          {pillar.title}
                        </h4>
                      </div>
                      <p className="text-xs font-mono text-cream/75 mb-2">
                        {pillar.subtitle}
                      </p>
                      <p className="text-xs text-cream/90 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-2 border-t border-gold/20 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-gold/80">
                      <span>Core Tenet</span>
                      <Sparkles className="w-3 h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
