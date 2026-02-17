import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

const services = [
  { id: 1, title: 'Editing & Post', description: 'Full post-production — cutting, pacing, and narrative structure for film and commercial.' },
  { id: 2, title: 'Color Grading', description: 'Cinematic color science and look development to match your creative vision.' },
  { id: 3, title: 'Sound Design', description: 'Dialogue, music, and SFX integration for a polished, immersive finish.' },
  { id: 4, title: 'Motion & Titles', description: 'Motion graphics and title design that complement the story.' },
];

export default function Services() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 44, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1,
        duration: 0.9,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', scrub: reduced ? false : 0.6, end: 'top 38%' },
      });
      const cards = gridRef.current?.querySelectorAll('.services__card');
      if (cards?.length) {
        gsap.fromTo(cards, { y: 40, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: reduced ? 0 : 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', toggleActions: 'play none none none' },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="services" id="services">
      <div className="container">
        <div ref={headerRef} className="services__header">
          <span className="services__label">What I do</span>
          <h2 className="services__title">Services</h2>
          <span ref={lineRef} className="services__accent-line" />
        </div>
        <div ref={gridRef} className="services__grid">
          {services.map((service) => (
            <div key={service.id} className="services__card" data-cursor-hover>
              <span className="services__card-num">0{service.id}</span>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
