import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import './Header.css';

const navLinks = [
  { href: '#showreel', label: 'Showreel' },
  { href: '#works', label: 'Works' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

function NavLinks({ onNavigate }) {
  return (
    <>
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="header__link"
          data-cursor-hover
          onClick={onNavigate}
        >
          {link.label}
        </a>
      ))}
    </>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 900px)');
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  const mobileNavPanel = isMobile && mobileOpen && (
    <nav
      className="header__nav header__nav--open header__nav--portal"
      aria-hidden={false}
    >
      <button
        type="button"
        className="header__close"
        aria-label="Close menu"
        onClick={closeMenu}
      >
        <span className="header__close-x" aria-hidden />
      </button>
      <NavLinks onNavigate={closeMenu} />
    </nav>
  );

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          <motion.a
            href="#hero"
            className="header__logo"
            data-cursor-hover
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            ft.shhrreyas
          </motion.a>
          {!isMobile ? (
            <nav className="header__nav" aria-hidden={false}>
              <NavLinks onNavigate={() => {}} />
            </nav>
          ) : !mobileOpen ? (
            <nav className="header__nav" aria-hidden={true}>
              <NavLinks onNavigate={closeMenu} />
            </nav>
          ) : null}
          <button
            type="button"
            className={`header__burger ${mobileOpen ? 'header__burger--open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className="header__burger-line" />
            <span className="header__burger-line" />
            <span className="header__burger-line" />
          </button>
        </div>
      </header>
      {mobileNavPanel && createPortal(mobileNavPanel, document.body)}
    </>
  );
}
