import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverableEnter = () => setIsHovering(true);
    const handleHoverableLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updatePosition);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]');
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverableEnter);
      el.addEventListener('mouseleave', handleHoverableLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverableEnter);
        el.removeEventListener('mouseleave', handleHoverableLeave);
      });
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400 }}
      />
      <motion.div
        className="cursor-ring"
        animate={{
          x: position.x,
          y: position.y,
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      />
    </>
  );
}
