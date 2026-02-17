import { useEffect, useRef, useState } from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Showreel from './components/Showreel/Showreel';
import Works from './components/Works/Works';
import About from './components/About/About';
import Services from './components/Services/Services';
import Contact from './components/Contact/Contact';
import CustomCursor from './components/CustomCursor/CustomCursor';

const SECTION_IDS = ['hero', 'showreel', 'works', 'about', 'services', 'contact'];
const HERO_DURATION_MS = 3000;
const SECTION_DURATION_MS = 3000;

function App() {
  const [cancelled, setCancelled] = useState(false);
  const currentIndexRef = useRef(0);
  const nextAdvanceAtRef = useRef(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion');
    }
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouch) {
      document.body.classList.add('cursor-custom');
    }
    return () => {
      document.body.classList.remove('cursor-custom', 'reduce-motion');
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || cancelled) return;

    const scrollToSection = (index) => {
      if (index >= SECTION_IDS.length) return;
      const el = document.getElementById(SECTION_IDS[index]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        currentIndexRef.current = index;
      }
    };

    const startCountdown = (durationMs) => {
      nextAdvanceAtRef.current = Date.now() + durationMs;
    };

    const advance = () => {
      const next = (currentIndexRef.current + 1) % SECTION_IDS.length;
      scrollToSection(next);
      scheduleNext();
    };

    const scheduleNext = () => {
      const delay = currentIndexRef.current === 0 ? HERO_DURATION_MS : SECTION_DURATION_MS;
      startCountdown(delay);
      timeoutRef.current = setTimeout(advance, delay);
    };

    startCountdown(HERO_DURATION_MS);

    timeoutRef.current = setTimeout(() => {
      scrollToSection(1);
      currentIndexRef.current = 1;
      scheduleNext();
    }, HERO_DURATION_MS);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [cancelled]);

  useEffect(() => {
    const onUserInteract = () => setCancelled(true);
    window.addEventListener('wheel', onUserInteract, { passive: true });
    window.addEventListener('touchmove', onUserInteract, { passive: true });
    window.addEventListener('keydown', onUserInteract);
    return () => {
      window.removeEventListener('wheel', onUserInteract);
      window.removeEventListener('touchmove', onUserInteract);
      window.removeEventListener('keydown', onUserInteract);
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Showreel />
        <Works />
        <About />
        <Services />
        <Contact />
      </main>
    </>
  );
}

export default App;
