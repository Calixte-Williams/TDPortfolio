import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, Check, Sparkles, ArrowRight } from 'lucide-react';
import { SPONSOR_TIERS, PARTNER_LOGOS } from '../data/portfolioData';

export default function SponsorshipSection({ onChooseTier }) {
  const [deckDownloaded, setDeckDownloaded] = useState(false);

  const handleDownloadDeck = () => {
    const deckSummary = `TERREL DELIGNY — 2026/2027 SPONSORSHIP & PATRON DECK
====================================================================
Director & Cinematographer | London & Tokyo

ACTIVE SLATE:
1. IRON RAIN — Large Format Neo-Noir Feature (London / Osaka)
2. THE SALT ARCHIVE — 35mm Coastal Mystery Feature
3. ZERO LIGHT — High-Altitude Documentary Feature

CONTRIBUTION & PARTNERSHIP TIERS:
- Project Backer ($1,500 - $5,000): End-roller credit, private lookbooks, screening room access.
- Gear Sponsor ($7,500 - $20,000 / In-Kind): Official Equipment Partner slate placement, camera test reels, press case study.
- Executive Producer Circle ($25,000+): Main-on-end Executive Producer credit, set visit in London/Tokyo, VIP festival passes.

Direct Desk: bookings@terreldeligny.film
`;
    const blob = new Blob([deckSummary], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Terrel-Deligny-Sponsorship-Deck-2026.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDeckDownloaded(true);
  };

  return (
    <section
      id="sponsor"
      className="relative bg-pitch text-cream py-20 md:py-28 border-t border-gold/30 scroll-mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
        {/* Framed Dark Slate Sponsorship Banner */}
        <div className="rounded-xl bg-slate border-2 border-gold shadow-gold-intense p-6 sm:p-10 md:p-12 relative overflow-hidden">
          <div className="absolute inset-3 border border-cream/10 rounded-lg pointer-events-none" />

          {/* Header & Primary CTAs */}
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-gold/25">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.26em] text-gold">
                <Sparkles className="w-4 h-4" />
                <span>Support &amp; Sponsorship Banner</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-bold text-cream tracking-wide">
                Back The Next Slate of Independent Cinema
              </h2>
              <p className="text-sm sm:text-base text-cream/85 leading-relaxed">
                Inviting production companies, camera &amp; optics brands, and
                private patrons to underwrite upcoming narrative features, 16mm/35mm
                film stock, and international festival finishing.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <a
                href="#contact"
                onClick={() => onChooseTier('Executive / Custom Sponsor')}
                className="px-6 py-4 rounded bg-gold text-pitch font-sans font-extrabold text-xs uppercase tracking-[0.22em] hover:bg-cream transition-all shadow-gold-glow inline-flex items-center gap-2"
              >
                Become a Sponsor
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={handleDownloadDeck}
                className="px-5 py-4 rounded bg-forest border border-gold text-gold hover:bg-gold hover:text-pitch font-mono text-xs uppercase tracking-[0.18em] transition-all inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {deckDownloaded ? 'Deck Downloaded ✓' : 'Download Sponsorship Deck'}
              </button>
            </div>
          </div>

          {/* 3 Contribution Tiers */}
          <div className="relative z-10 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SPONSOR_TIERS.map((tier) => (
              <motion.div
                key={tier.id}
                whileHover={{ y: -5 }}
                className={`rounded-lg p-6 flex flex-col justify-between border transition-all ${
                  tier.featured
                    ? 'bg-forest/90 border-2 border-gold shadow-gold-glow'
                    : 'bg-pitch/75 border-gold/45 hover:border-gold'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded bg-pitch/80 border border-gold/50 text-[10px] font-mono uppercase tracking-[0.2em] text-gold">
                      {tier.badge}
                    </span>
                    <Award className="w-4 h-4 text-gold" />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-cream">
                      {tier.name}
                    </h3>
                    <p className="text-sm font-mono font-bold text-gold mt-1">
                      {tier.contribution}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-cream/85 leading-relaxed">
                    {tier.description}
                  </p>

                  <ul className="space-y-2.5 pt-2 border-t border-gold/20">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 text-xs text-cream/90"
                      >
                        <Check className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  onClick={() => onChooseTier(tier.name)}
                  className={`mt-6 w-full py-3 rounded text-center font-sans font-extrabold text-xs uppercase tracking-[0.2em] transition-all ${
                    tier.featured
                      ? 'bg-gold text-pitch hover:bg-cream shadow-gold-glow'
                      : 'bg-slate border border-gold text-gold hover:bg-gold hover:text-pitch'
                  }`}
                >
                  Select {tier.name}
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Partner & Hardware Ecosystem Strip (Matching Reference Bottom Banner) */}
        <div className="text-center space-y-6">
          <p className="text-xs font-mono uppercase tracking-[0.28em] text-gold">
            Sponsor, Festival &amp; Cinema Partner Ecosystem
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center py-6 px-4 rounded-lg bg-slate/60 border border-gold/25">
            {PARTNER_LOGOS.map((partner) => (
              <div
                key={partner.name}
                className="text-cream/75 hover:text-gold transition-colors select-none"
              >
                <span className={partner.style}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
