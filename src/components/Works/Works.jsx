import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css';

const projects = [
  { id: 1, title: 'Photography', slug: 'photography', thumbnail: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80' },
  { id: 2, title: 'Freelancing', slug: 'freelancing', thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  { id: 3, title: 'Cinematic', slug: 'cinematic', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80' },
  { id: 4, title: 'Reel Videos', slug: 'reel-videos', thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80' },
];

export default function Works() {
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
      const cards = gridRef.current?.querySelectorAll('.works__card');
      if (cards?.length) {
        gsap.fromTo(cards, { y: 56, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: reduced ? 0 : 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: gridRef.current, start: 'top 88%', toggleActions: 'play none none none' },
        });
      }
      if (!reduced && gridRef.current) {
        const inners = gridRef.current.querySelectorAll('.works__card-media-inner');
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.4,
          onUpdate: (self) => {
            inners.forEach((el, i) => {
              const row = Math.floor(i / 2);
              const y = (1 - self.progress) * (12 + row * 8);
              el.style.transform = `translate3d(0, ${y}px, 0)`;
            });
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="works" id="works">
      <div className="container">
        <div ref={headerRef} className="works__header">
          <span className="works__label">Selected</span>
          <h2 className="works__title">Works</h2>
          <span ref={lineRef} className="works__accent-line" />
        </div>
        <div ref={gridRef} className="works__grid">
          {projects.map((project) => {
            const cardContent = (
              <>
                <div className="works__card-media">
                  <div className="works__card-media-inner">
                    <img src={project.thumbnail} alt="" loading="lazy" className="works__card-img" />
                  </div>
                  <div className="works__card-overlay" />
                </div>
                <div className="works__card-info">
                  <h3 className="works__card-title">{project.title}</h3>
                </div>
              </>
            );
            if (project.slug === 'photography') {
              return (
                <Link key={project.id} to="/photography" className="works__card" data-cursor-hover>
                  {cardContent}
                </Link>
              );
            }
            if (project.slug === 'freelancing') {
              return (
                <Link key={project.id} to="/freelancing" className="works__card" data-cursor-hover>
                  {cardContent}
                </Link>
              );
            }
            if (project.slug === 'cinematic') {
              return (
                <Link key={project.id} to="/cinematic" className="works__card" data-cursor-hover>
                  {cardContent}
                </Link>
              );
            }
            if (project.slug === 'reel-videos') {
              return (
                <Link key={project.id} to="/reel-videos" className="works__card" data-cursor-hover>
                  {cardContent}
                </Link>
              );
            }
            return (
              <a key={project.id} href="#" className="works__card" data-cursor-hover>
                {cardContent}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
