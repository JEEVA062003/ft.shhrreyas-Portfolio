import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

const INSTAGRAM_URL = 'https://instagram.com/ft.shhrreyas';

export default function Contact() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const headerRef = useRef(null);
  const lineRef = useRef(null);
  const actionsRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { y: 44, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1,
        duration: 0.85,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 76%', scrub: reduced ? false : 0.6, end: 'top 40%' },
      });
      gsap.fromTo(actionsRef.current, { y: 32, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%', toggleActions: 'play none none none' },
      });
      gsap.fromTo(footerRef.current, { opacity: 0 }, {
        opacity: 1,
        duration: 0.7,
        scrollTrigger: { trigger: footerRef.current, start: 'top 92%', toggleActions: 'play none none none' },
      });
      if (!reduced && bgRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.4,
          onUpdate: (self) => {
            const y = (1 - self.progress) * 20;
            bgRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div ref={bgRef} className="contact__parallax-bg" aria-hidden />
      <div className="container">
        <div className="contact__inner">
          <div ref={headerRef} className="contact__header">
            <span className="contact__label">Get in touch</span>
            <h2 className="contact__title">Let's create something</h2>
            <span ref={lineRef} className="contact__accent-line" />
            <p className="contact__sub">
              For projects and collaborations, reach out via email, phone, or Instagram.
            </p>
          </div>
          <div ref={actionsRef} className="contact__actions">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="contact__btn contact__btn--primary"
              data-cursor-hover
            >
              <span>@ft.shhrreyas</span>
              <span className="contact__btn-arrow" />
            </a>
            <a href="tel:+919743824564" className="contact__btn contact__btn--secondary" data-cursor-hover>
              <span>+91 97438 24564</span>
              <span className="contact__btn-arrow" />
            </a>
            <a href="mailto:cmshreyasgowda@gmail.com" className="contact__btn contact__btn--secondary" data-cursor-hover>
              <span>cmshreyasgowda@gmail.com</span>
              <span className="contact__btn-arrow" />
            </a>
          </div>
        </div>
        <footer ref={footerRef} className="contact__footer">
          <span className="contact__copy">© {new Date().getFullYear()} Shreyas. All rights reserved.</span>
        </footer>
      </div>
    </section>
  );
}
