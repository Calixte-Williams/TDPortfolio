import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClapperboardIntro({ onComplete }) {
  const [phase, setPhase] = useState('open'); // 'open' -> 'snap' -> 'split'

  useEffect(() => {
    const snapTimer = setTimeout(() => {
      setPhase('snap');
    }, 520);

    const splitTimer = setTimeout(() => {
      setPhase('split');
    }, 980);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 1480);

    return () => {
      clearTimeout(snapTimer);
      clearTimeout(splitTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        key="clapper-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden pointer-events-auto"
        aria-label="Opening Clapperboard Intro"
      >
        {/* Top split shutter */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: phase === 'split' ? '-102%' : '0%' }}
          transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 top-0 h-1/2 bg-slate border-b border-gold/40"
        />

        {/* Bottom split shutter */}
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: phase === 'split' ? '102%' : '0%' }}
          transition={{ duration: 0.48, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-x-0 bottom-0 h-1/2 bg-slate border-t border-gold/40"
        />

        {/* Skip Intro Button */}
        <button
          type="button"
          onClick={onComplete}
          className="fixed top-6 right-6 z-[110] px-4 py-2 rounded-full bg-pitch/80 border border-gold/60 text-cream hover:bg-gold hover:text-pitch transition-all duration-200 text-xs font-mono uppercase tracking-[0.22em] shadow-gold-glow"
        >
          Skip Intro →
        </button>

        {/* Center SVG Clapperboard */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{
            scale: phase === 'snap' ? [1, 1.04, 1] : phase === 'split' ? 1.12 : 1,
            opacity: phase === 'split' ? 0 : 1,
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative z-[105] flex flex-col items-center px-6"
        >
          {/* Flash burst on snap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{
              opacity: phase === 'snap' ? [0, 0.75, 0] : 0,
              scale: phase === 'snap' ? [0.8, 1.35, 1.6] : 0.8,
            }}
            transition={{ duration: 0.4 }}
            className="absolute -inset-12 rounded-full bg-gold/25 blur-2xl pointer-events-none"
          />

          <svg
            width="320"
            height="250"
            viewBox="0 0 320 250"
            className="w-[270px] sm:w-[320px] h-auto drop-shadow-[0_18px_40px_rgba(0,0,0,0.9)]"
            role="img"
            aria-label="Director Terrel Deligny Clapperboard"
          >
            {/* Hinged Top Clap Stick */}
            <motion.g
              initial={{ rotate: -26 }}
              animate={{ rotate: phase === 'open' ? -26 : 0 }}
              transition={{
                type: 'spring',
                stiffness: 520,
                damping: 22,
              }}
              style={{ originX: '28px', originY: '72px' }}
            >
              <rect
                x="20"
                y="42"
                width="280"
                height="30"
                rx="4"
                fill="#1A2020"
                stroke="#FFD700"
                strokeWidth="2.5"
              />
              {/* Diagonal Gold Stripes */}
              <path d="M55 42 L75 72 L98 72 L78 42 Z" fill="#FFD700" />
              <path d="M115 42 L135 72 L158 72 L138 42 Z" fill="#FFD700" />
              <path d="M175 42 L195 72 L218 72 L198 42 Z" fill="#FFD700" />
              <path d="M235 42 L255 72 L278 72 L258 42 Z" fill="#FFD700" />
            </motion.g>

            {/* Fixed Lower Clap Bar */}
            <rect
              x="20"
              y="72"
              width="280"
              height="24"
              rx="2"
              fill="#1A2020"
              stroke="#FFD700"
              strokeWidth="2.5"
            />
            <path d="M55 96 L75 72 L98 72 L78 96 Z" fill="#FFD700" />
            <path d="M115 96 L135 72 L158 72 L138 96 Z" fill="#FFD700" />
            <path d="M175 96 L195 72 L218 72 L198 96 Z" fill="#FFD700" />
            <path d="M235 96 L255 72 L278 72 L258 96 Z" fill="#FFD700" />

            {/* Hinge Joint */}
            <circle
              cx="32"
              cy="72"
              r="9"
              fill="#0B3D30"
              stroke="#FFD700"
              strokeWidth="2.5"
            />
            <circle cx="32" cy="72" r="3" fill="#FFD700" />

            {/* Main Slate Body */}
            <rect
              x="20"
              y="96"
              width="280"
              height="134"
              rx="8"
              fill="#1A2020"
              stroke="#FFD700"
              strokeWidth="2.5"
            />

            {/* Slate Inner Grid Lines */}
            <line
              x1="20"
              y1="142"
              x2="300"
              y2="142"
              stroke="#FFD700"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <line
              x1="20"
              y1="186"
              x2="300"
              y2="186"
              stroke="#FFD700"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <line
              x1="125"
              y1="186"
              x2="125"
              y2="230"
              stroke="#FFD700"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <line
              x1="215"
              y1="186"
              x2="215"
              y2="230"
              stroke="#FFD700"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />

            {/* Slate Typography */}
            <text
              x="36"
              y="114"
              fill="#FFD700"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="2"
            >
              PRODUCTION
            </text>
            <text
              x="36"
              y="132"
              fill="#F5F5DC"
              fontSize="15"
              fontWeight="700"
              fontFamily="Cormorant Garamond, Georgia, serif"
              letterSpacing="2"
            >
              TERREL DELIGNY • PORTFOLIO REEL
            </text>

            <text
              x="36"
              y="160"
              fill="#FFD700"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="2"
            >
              DIRECTOR / DOP
            </text>
            <text
              x="36"
              y="177"
              fill="#F5F5DC"
              fontSize="13"
              fontWeight="600"
              fontFamily="Plus Jakarta Sans, sans-serif"
              letterSpacing="1.5"
            >
              TERREL DELIGNY
            </text>

            <text
              x="36"
              y="203"
              fill="#FFD700"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1.6"
            >
              SCENE
            </text>
            <text
              x="36"
              y="220"
              fill="#F5F5DC"
              fontSize="14"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
            >
              01A
            </text>

            <text
              x="140"
              y="203"
              fill="#FFD700"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1.6"
            >
              TAKE
            </text>
            <text
              x="140"
              y="220"
              fill="#F5F5DC"
              fontSize="14"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
            >
              01
            </text>

            <text
              x="230"
              y="203"
              fill="#FFD700"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              letterSpacing="1.6"
            >
              FPS
            </text>
            <text
              x="230"
              y="220"
              fill="#FFD700"
              fontSize="14"
              fontWeight="700"
              fontFamily="JetBrains Mono, monospace"
            >
              24.00
            </text>
          </svg>

          <div className="mt-3 flex items-center gap-3 text-xs font-mono tracking-[0.28em] uppercase text-cream/80">
            <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
            <span>{phase === 'open' ? 'ROLLING CAMERA' : 'MARKER • ACTION'}</span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
