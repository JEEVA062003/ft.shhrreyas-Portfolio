import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const navLinks = [
  { href: '#showreel', label: 'Showreel' },
  { href: '#works', label: 'Works' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`header ${scrolled ? 'header--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="header__inner">
        <a href="#hero" className="header__logo" data-cursor-hover>
          ft.shhrreyas
        </a>
        <nav className={`header__nav ${mobileOpen ? 'header__nav--open' : ''}`} aria-hidden={!mobileOpen}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="header__link"
              data-cursor-hover
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
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
    </motion.header>
  );
}
