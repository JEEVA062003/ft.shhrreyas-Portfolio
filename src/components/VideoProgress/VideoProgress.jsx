import { useEffect, useState } from 'react';
import './VideoProgress.css';

const SECTION_IDS = ['hero', 'showreel', 'works', 'about', 'services', 'contact'];
const LABELS = ['Hero', 'Showreel', 'Works', 'About', 'Services', 'Contact'];

export default function VideoProgress({ currentIndex, nextInMs, cancelled }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || cancelled) return null;

  return (
    <div className="video-progress" aria-hidden>
      <div className="video-progress__track">
        {SECTION_IDS.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`video-progress__dot ${i === currentIndex ? 'video-progress__dot--active' : ''} ${i < currentIndex ? 'video-progress__dot--passed' : ''}`}
            onClick={() => {
              const el = document.getElementById(SECTION_IDS[i]);
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            aria-label={`Go to ${LABELS[i]}`}
            title={LABELS[i]}
          />
        ))}
      </div>
      {nextInMs > 0 && nextInMs <= 5000 && (
        <div className="video-progress__next">
          Next in {Math.ceil(nextInMs / 1000)}s
        </div>
      )}
    </div>
  );
}
