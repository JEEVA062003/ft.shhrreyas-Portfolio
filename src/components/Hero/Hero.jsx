import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);
  const orb3Ref = useRef(null);
  const linesRef = useRef(null);
  const overlayRef = useRef(null);
  const grainRef = useRef(null);
  const greetingRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const headingLineRef = useRef(null);
  const subRef = useRef(null);
  const ctaRef = useRef(null);
  const heroImageRef = useRef(null);
  const heroFrameRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const typewriterStagger = prefersReducedMotion ? 0 : 0.055;
    const typewriterDuration = prefersReducedMotion ? 0 : 0.2;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(overlayRef.current, { opacity: 1 }, { opacity: 0.85, duration: 1.4 }, 0)
        .fromTo(grainRef.current, { opacity: 0 }, { opacity: 0.35, duration: 1.2 }, 0.3)
        .fromTo(greetingRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.4)
        .fromTo(
          line1Ref.current.querySelectorAll('.char'),
          { opacity: 0 },
          { opacity: 1, duration: typewriterDuration, stagger: typewriterStagger, ease: 'power2.out' },
          0.5
        )
        .fromTo(
          line2Ref.current.querySelectorAll('.char'),
          { opacity: 0 },
          { opacity: 1, duration: typewriterDuration, stagger: typewriterStagger, ease: 'power2.out' },
          prefersReducedMotion ? 0.6 : '-=0.1'
        )
        .fromTo(headingLineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.out' }, '-=0.3')
        .fromTo(subRef.current, { y: 24, opacity: 0, filter: 'blur(8px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }, 1.08)
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, 1.35)
        .fromTo(heroFrameRef.current, { scale: 0.96, opacity: 0, rotation: -2 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.85, ease: 'power2.out' }, 0.85)
        .fromTo(heroImageRef.current, { x: 32, opacity: 0 }, { x: 0, opacity: 1, duration: 0.75, ease: 'power2.out' }, 0.9);
    }, sectionRef);

    gsap.set(orb1Ref.current, { xPercent: -50, yPercent: -50 });
    gsap.set(orb2Ref.current, { xPercent: 50, yPercent: -50 });
    gsap.set(orb3Ref.current, { xPercent: -50, yPercent: 50 });

    const orbTl = gsap.timeline({ repeat: -1 });
    orbTl
      .to(orb1Ref.current, {
        xPercent: -38,
        yPercent: -58,
        scale: 1.12,
        duration: 9,
        ease: 'sine.inOut',
      })
      .to(orb1Ref.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 1,
        duration: 9,
        ease: 'sine.inOut',
      })
      .to(orb2Ref.current, {
        xPercent: 32,
        yPercent: -38,
        scale: 1.18,
        duration: 11,
        ease: 'sine.inOut',
      }, 0)
      .to(orb2Ref.current, {
        xPercent: 50,
        yPercent: -50,
        scale: 1,
        duration: 11,
        ease: 'sine.inOut',
      }, 5.5)
      .to(orb3Ref.current, {
        xPercent: -40,
        yPercent: 68,
        scale: 1.08,
        duration: 13,
        ease: 'sine.inOut',
      }, 0)
      .to(orb3Ref.current, {
        xPercent: -50,
        yPercent: 50,
        scale: 1,
        duration: 13,
        ease: 'sine.inOut',
      }, 6.5);

    if (linesRef.current) {
      gsap.to(linesRef.current.querySelectorAll('.hero__bg-line'), {
        scaleY: 1,
        duration: 1.8,
        stagger: 0.06,
        ease: 'power4.out',
        delay: 0.4,
      });
    }

    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        if (bgRef.current) {
          const y = -self.progress * 80;
          bgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(${1 + self.progress * 0.04})`;
        }
      },
    });

    return () => {
      orbTl.kill();
      st.kill();
      ctx.revert();
    };
  }, []);

  const headingLine1 = 'Video Editor';
  const headingLine2 = '& Cinematographer.';

  const renderChars = (text) =>
    text.split('').map((char, i) => (
      <span key={i} className="char">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));

  return (
    <section ref={sectionRef} className="hero" id="hero">
      <div ref={bgRef} className="hero__bg">
        <div className="hero__bg-image" aria-hidden />
        <div className="hero__bg-aurora" aria-hidden />
        <div className="hero__bg-base" />
        <div ref={orb1Ref} className="hero__bg-orb hero__bg-orb--1" aria-hidden />
        <div ref={orb2Ref} className="hero__bg-orb hero__bg-orb--2" aria-hidden />
        <div ref={orb3Ref} className="hero__bg-orb hero__bg-orb--3" aria-hidden />
        <div ref={linesRef} className="hero__bg-lines" aria-hidden>
          {[...Array(8)].map((_, i) => (
            <span key={i} className="hero__bg-line" style={{ '--i': i }} />
          ))}
        </div>
        <div className="hero__bg-streak hero__bg-streak--1" aria-hidden />
        <div className="hero__bg-streak hero__bg-streak--2" aria-hidden />
      </div>
      <div ref={overlayRef} className="hero__overlay" aria-hidden />
      <div ref={grainRef} className="hero__grain" aria-hidden />
      <div className="hero__content">
        <div className="hero__text">
          <p ref={greetingRef} className="hero__greeting">
            Hello 👋 I'm Shreyas
          </p>
          <h1 className="hero__heading">
            <span ref={line1Ref} className="hero__line hero__line--typewriter">
              {renderChars(headingLine1)}
            </span>
            <span ref={line2Ref} className="hero__line hero__line--typewriter">
              {renderChars(headingLine2)}
            </span>
            <span ref={headingLineRef} className="hero__heading-line" aria-hidden />
          </h1>
          <p ref={subRef} className="hero__sub">
            The magic I chase is making the visuals to breathe. I'm Shreyas - creating cinematic and aesthetic edits that connects.
          </p>
          <a
            ref={ctaRef}
            href="#showreel"
            className="hero__cta"
            data-cursor-hover
          >
            <span className="hero__cta-text">Watch the showreel</span>
            <span className="hero__cta-line" />
          </a>
        </div>
        <div className="hero__visual">
          <div className="hero__visual-glow" aria-hidden />
          <div ref={heroFrameRef} className="hero__frame-wrap">
            <div className="hero__frame-float">
            <div className="hero__frame">
              <div className="hero__frame-overlay" aria-hidden />
              <img
                ref={heroImageRef}
                src="/Main.png"
                alt=""
                className="hero__img"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="hero__frame-corners" aria-hidden>
              <span className="hero__corner hero__corner--tl" />
              <span className="hero__corner hero__corner--tr" />
              <span className="hero__corner hero__corner--br" />
              <span className="hero__corner hero__corner--bl" />
            </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hero__scroll-hint" aria-hidden>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
