import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

export default function About() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const imgRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const contentRef = useRef(null);
  const leadRef = useRef(null);
  const bodyRef = useRef(null);
  const toolsRef = useRef(null);

  useEffect(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(visualRef.current, { x: -40, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      if (!reduced && imgRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            const y = (1 - self.progress) * 25;
            imgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(1.02)`;
          },
        });
      }
      gsap.fromTo(headerRef.current, { x: 44, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1,
        duration: 0.85,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', scrub: reduced ? false : 0.6, end: 'top 35%' },
      });
      const contentEls = [leadRef.current, bodyRef.current, toolsRef.current].filter(Boolean);
      gsap.fromTo(contentEls, { x: 36, opacity: 0 }, {
        x: 0,
        opacity: 1,
        duration: 0.75,
        stagger: reduced ? 0 : 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="container">
        <div className="about__grid">
          <div ref={visualRef} className="about__visual">
            <div className="about__frame">
              <img ref={imgRef} src="/sh1.png" alt="" className="about__img" loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="about__text">
            <div ref={headerRef} className="about__header">
              <span className="about__label">About</span>
              <h2 className="about__title">Craft meets vision</h2>
              <span ref={lineRef} className="about__accent-line" />
            </div>
            <div ref={contentRef} className="about__content">
              <p ref={leadRef} className="about__lead">
                I'm Shreyas. The magic I chase is making the visuals breathe — creating cinematic
                and aesthetic edits that connect.
              </p>
              <p ref={bodyRef} className="about__body">
                With experience across commercials, documentaries, and branded content,
                I partner with agencies and filmmakers to deliver premium post-production that
                elevates every frame.
              </p>
              <p ref={toolsRef} className="about__tools">
                CapCut · Lightroom · Snapseed · Canva · PicsArt
              </p>
              <img
                src="/shreyas-banner.png"
                alt=""
                className="about__banner"
                loading="lazy"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
