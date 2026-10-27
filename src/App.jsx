import React, { useState, useEffect, useCallback } from 'react';
import ClapperboardIntro from './components/ClapperboardIntro';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import SponsorshipSection from './components/SponsorshipSection';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';

const INTRO_STORAGE_KEY = 'td_portfolio_intro_seen_v1';

export default function App() {
  const [showIntro, setShowIntro] = useState(false);
  const [activeModalFilm, setActiveModalFilm] = useState(null);
  const [selectedSponsorTier, setSelectedSponsorTier] = useState('');

  useEffect(() => {
    try {
      const hasSeenIntro = sessionStorage.getItem(INTRO_STORAGE_KEY);
      if (!hasSeenIntro) {
        setShowIntro(true);
      }
    } catch {
      setShowIntro(true);
    }
  }, []);

  const handleCompleteIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, 'true');
    } catch {
      // ignore storage errors
    }
    setShowIntro(false);
  }, []);

  const handleReplayIntro = useCallback(() => {
    setShowIntro(true);
  }, []);

  return (
    <div className="min-h-screen bg-pitch text-cream flex flex-col selection:bg-gold selection:text-pitch">
      {showIntro && <ClapperboardIntro onComplete={handleCompleteIntro} />}

      <Navbar onReplayIntro={handleReplayIntro} />

      <main className="flex-1">
        <HeroSection onSelectFilm={setActiveModalFilm} />
        <AboutSection />
        <ReviewsSection />
        <ContactSection selectedTier={selectedSponsorTier} />
        <SponsorshipSection onChooseTier={setSelectedSponsorTier} />
      </main>

      <Footer />

      <VideoModal
        film={activeModalFilm}
        onClose={() => setActiveModalFilm(null)}
      />
    </div>
  );
}
