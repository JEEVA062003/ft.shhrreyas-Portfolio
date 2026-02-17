import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Works.css';

const projects = [
  { id: 1, title: 'Brand Film', category: 'Commercial', thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80', videoUrl: null },
  { id: 2, title: 'Documentary', category: 'Film', thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80', videoUrl: null },
  { id: 3, title: 'Music Video', category: 'Music', thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80', videoUrl: null },
  { id: 4, title: 'Fashion Editorial', category: 'Fashion', thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80', videoUrl: null },
  { id: 5, title: 'Short Film', category: 'Narrative', thumbnail: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80', videoUrl: null },
  { id: 6, title: 'Event Recap', category: 'Events', thumbnail: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&q=80', videoUrl: null },
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
              const row = Math.floor(i / 3);
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
          {projects.map((project) => (
            <a key={project.id} href="#" className="works__card" data-cursor-hover>
              <div className="works__card-media">
                <div className="works__card-media-inner">
                  <img src={project.thumbnail} alt="" loading="lazy" className="works__card-img" />
                </div>
                <div className="works__card-overlay" />
              </div>
              <div className="works__card-info">
                <span className="works__card-category">{project.category}</span>
                <h3 className="works__card-title">{project.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
