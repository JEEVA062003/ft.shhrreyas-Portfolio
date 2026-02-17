import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Showreel.css';

export default function Showreel() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 48, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          end: 'top 45%',
          toggleActions: reduced ? 'play none none none' : 'play none none none',
        },
      });
      gsap.fromTo(playerRef.current, { y: 56, opacity: 0, scale: 0.98 }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          end: 'top 40%',
          toggleActions: 'play none none none',
        },
      });
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1,
        duration: 1,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'top 35%',
          scrub: reduced ? false : 0.8,
        },
      });
      if (!reduced && bgRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const y = (1 - self.progress) * 30;
            bgRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="showreel" id="showreel">
      <div ref={bgRef} className="showreel__parallax-bg" aria-hidden />
      <div className="container">
        <div ref={headerRef} className="showreel__header">
          <span className="showreel__label">Featured</span>
          <h2 className="showreel__title">Showreel</h2>
          <span ref={lineRef} className="showreel__accent-line" />
        </div>
        <div ref={playerRef} className="showreel__player-wrap">
          <div className="showreel__aspect">
            {/* Add your showreel video: <video src="/your-showreel.mp4" ... /> */}
            <div className="showreel__placeholder">
              <span className="showreel__placeholder-text">Add your showreel video</span>
              <span className="showreel__placeholder-hint">Drop your MP4 in public/ and set src in Showreel.jsx</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
