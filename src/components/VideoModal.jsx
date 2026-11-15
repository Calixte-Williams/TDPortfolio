import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ExternalLink, Film, Camera, Aperture, Calendar, MapPin, Award } from 'lucide-react';

export default function VideoModal({ film, onClose }) {
  useEffect(() => {
    if (!film) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [film, onClose]);

  return (
    <AnimatePresence>
      {film && (
        <motion.div
          key="video-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-pitch/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-film-title"
        >
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-lg bg-slate border-2 border-gold shadow-gold-intense overflow-hidden my-auto"
          >
            {/* Top Modal Bar */}
            <div className="flex items-center justify-between px-5 sm:px-8 py-4 bg-pitch/90 border-b border-gold/30">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-forest border border-gold/60 text-[11px] font-mono uppercase tracking-[0.2em] text-gold">
                  {film.category}
                </span>
                <span className="text-xs font-mono text-cream/70 hidden sm:inline">
                  {film.duration} • {film.aspectRatio}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Trailer Modal"
                className="p-2 rounded-full bg-slate border border-gold/50 text-cream hover:bg-gold hover:text-pitch transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player Area — Embedded YouTube or Native HTML5 Preview */}
            <div className="relative aspect-video w-full bg-pitch overflow-hidden border-b border-gold/30">
              {film.youtubeId ? (
                <iframe
                  key={film.id}
                  src={`https://www.youtube.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={`${film.title} — Official Trailer`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  key={film.id}
                  src={film.previewVideo}
                  poster={film.poster}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}
              <div className="pointer-events-none absolute top-4 left-4 px-3 py-1 rounded bg-pitch/75 border border-gold/40 text-[11px] font-mono uppercase tracking-[0.2em] text-gold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                Official Director’s Cut Preview
              </div>
            </div>

            {/* Film Details & Technical Specs */}
            <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-gradient-to-b from-slate to-pitch">
              {/* Left Column: Narrative & Director Note */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-gold">
                  <Award className="w-4 h-4" />
                  <span>{film.accolade}</span>
                </div>

                <h3
                  id="modal-film-title"
                  className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-cream"
                >
                  {film.title}
                </h3>

                {film.releaseDate && (
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-cream/70">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span>
                      Made <span className="text-gold font-semibold">{film.releaseDate}</span>
                    </span>
                  </div>
                )}

                <p className="text-base sm:text-lg text-cream/90 font-medium leading-relaxed">
                  {film.logline}
                </p>

                <p className="text-sm text-cream/75 leading-relaxed">
                  {film.synopsis}
                </p>

                <div className="p-4 rounded bg-forest/60 border-l-4 border-gold">
                  <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-gold mb-1">
                    Director’s Note — Terrel Deligny
                  </p>
                  <p className="text-xs sm:text-sm italic text-cream/90">
                    “{film.directorNote}”
                  </p>
                </div>
              </div>

              {/* Right Column: Camera & Technical Package + CTA */}
              <div className="lg:col-span-5 flex flex-col justify-between bg-pitch/75 border border-gold/30 rounded-lg p-5 space-y-5">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-[0.24em] text-gold border-b border-gold/25 pb-2.5 mb-4">
                    Technical Specifications
                  </h4>

                  <dl className="space-y-3 text-xs sm:text-sm">
                    <div className="flex items-start gap-3">
                      <Camera className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <dt className="text-[10px] font-mono uppercase tracking-widest text-cream/55">
                          Camera Package
                        </dt>
                        <dd className="text-cream font-semibold">{film.camera}</dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Aperture className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <dt className="text-[10px] font-mono uppercase tracking-widest text-cream/55">
                          Optics / Lenses
                        </dt>
                        <dd className="text-cream font-semibold">{film.lens}</dd>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Film className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      <div>
                        <dt className="text-[10px] font-mono uppercase tracking-widest text-cream/55">
                          Capture & Color Pipeline
                        </dt>
                        <dd className="text-cream font-semibold">{film.format}</dd>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] font-mono uppercase tracking-widest text-cream/55">
                            Release
                          </dt>
                          <dd className="text-cream font-semibold">{film.year}</dd>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <div>
                          <dt className="text-[10px] font-mono uppercase tracking-widest text-cream/55">
                            Location
                          </dt>
                          <dd className="text-cream font-semibold">{film.location}</dd>
                        </div>
                      </div>
                    </div>
                  </dl>
                </div>

                <div className="pt-3 border-t border-gold/20 flex flex-col sm:flex-row gap-3">
                  <a
                    href={film.fullFilmUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded bg-gold text-pitch font-sans font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-cream transition-all shadow-gold-glow"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    Watch Full Film
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-3 rounded border border-gold/40 text-xs font-mono uppercase tracking-[0.18em] text-cream hover:border-gold hover:text-gold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
