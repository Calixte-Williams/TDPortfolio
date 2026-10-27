import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Instagram, ExternalLink, CheckCircle2 } from 'lucide-react';
import { INSTAGRAM_REVIEWS } from '../data/portfolioData';

export default function ReviewsSection() {
  const [filter, setFilter] = useState('ALL');

  const films = ['ALL', 'ECHOES OF SILENCE', 'CHASING SHADOWS', 'THE FORGOTTEN PATH'];
  const visibleReviews =
    filter === 'ALL'
      ? INSTAGRAM_REVIEWS
      : INSTAGRAM_REVIEWS.filter((item) => item.film === filter);

  return (
    <section
      id="reviews"
      className="relative bg-pitch text-cream py-20 md:py-28 overflow-hidden scroll-mt-16 film-grain"
    >
      {/* Subtle Forest Green Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-forest/40 blur-[140px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.26em] text-gold mb-2">
              <Instagram className="w-4 h-4" />
              <span>Cached Instagram Dispatch • Press &amp; Audience</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold uppercase tracking-[0.12em] text-gold">
              Critical Views
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-forest/70 border border-gold/40 text-[11px] font-mono uppercase tracking-[0.18em] text-cream">
              <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
              Instant Cached Feed
            </span>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-gold text-xs font-mono uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-pitch transition-all shadow-gold-glow"
            >
              @terreldeligny
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {films.map((filmName) => {
            const active = filter === filmName;
            return (
              <button
                key={filmName}
                type="button"
                onClick={() => setFilter(filmName)}
                className={`px-4 py-2 rounded text-xs font-mono uppercase tracking-[0.2em] transition-all border ${
                  active
                    ? 'bg-gold text-pitch border-gold font-bold shadow-gold-glow'
                    : 'bg-slate/90 text-cream/80 border-gold/35 hover:border-gold hover:text-gold'
                }`}
              >
                {filmName}
              </button>
            );
          })}
        </div>

        {/* 3x2 / 3x3 Gold-Framed Review Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {visibleReviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              whileHover={{ y: -6 }}
              className="group rounded-lg bg-slate border-2 border-gold shadow-gold-glow hover:shadow-gold-intense overflow-hidden flex flex-col justify-between transition-all"
            >
              {/* Still Image + Rating Badge */}
              <div>
                <div className="relative h-48 overflow-hidden bg-pitch">
                  <img
                    src={review.image}
                    alt={review.film}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate via-pitch/25 to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-pitch/85 border border-gold/50 text-[10px] font-mono uppercase tracking-[0.18em] text-cream">
                    {review.film}
                  </span>

                  <span className="absolute top-3 right-3 px-3 py-1 rounded bg-gold text-pitch font-mono font-extrabold text-xs tracking-wider shadow">
                    {review.score}
                  </span>
                </div>

                {/* Star Row & Pull Quote */}
                <div className="p-6 text-center space-y-3">
                  <div
                    className="flex items-center justify-center gap-1"
                    aria-label={`${review.stars} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < review.stars
                            ? 'text-gold fill-gold'
                            : 'text-cream/25'
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="font-sans font-extrabold text-sm sm:text-base tracking-wide text-cream leading-snug">
                    {review.quote}
                  </blockquote>

                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-gold/90">
                    — {review.source}
                  </p>
                </div>
              </div>

              {/* Instagram Post Footer Link */}
              <div className="px-6 py-3.5 bg-pitch/65 border-t border-gold/25 flex items-center justify-between text-[11px] font-mono">
                <span className="text-cream/65 truncate">{review.handle}</span>
                <a
                  href={review.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold hover:text-cream uppercase tracking-[0.16em] inline-flex items-center gap-1 shrink-0 font-semibold"
                >
                  View Post <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom View All Link */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.28em] text-gold border-b border-gold pb-1 hover:text-cream hover:border-cream transition-colors"
          >
            View Full Dispatch on Instagram
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
