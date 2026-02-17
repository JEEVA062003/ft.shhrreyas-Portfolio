import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { reelVideos } from '../data/reel';
import './Reel.css';

export default function Reel() {
  const [previewSrc, setPreviewSrc] = useState(null);
  const previewVideoRef = useRef(null);

  const closePreview = useCallback(() => {
    if (previewVideoRef.current) {
      previewVideoRef.current.pause();
    }
    setPreviewSrc(null);
  }, []);

  useEffect(() => {
    if (!previewSrc) return;
    const onKey = (e) => e.key === 'Escape' && closePreview();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previewSrc, closePreview]);

  return (
    <div className="reel-page">
      <header className="reel-header">
        <div className="reel-header__inner">
          <Link to="/#works" className="reel-header__back" data-cursor-hover>
            <span className="reel-header__back-arrow" aria-hidden />
            Back to Works
          </Link>
          <h1 className="reel-header__title">Reel Videos</h1>
        </div>
      </header>
      <main className="reel-main">
        <div className="reel-grid">
          {reelVideos.map((src, i) => (
            <article
              key={i}
              className="reel-card"
              onClick={() => setPreviewSrc(src)}
              onKeyDown={(e) => e.key === 'Enter' && setPreviewSrc(src)}
              role="button"
              tabIndex={0}
              data-cursor-hover
            >
              <div className="reel-card__frame">
                <video
                  src={src}
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  className="reel-card__video"
                  aria-label={`Reel video ${i + 1}`}
                />
              </div>
            </article>
          ))}
        </div>
      </main>

      {previewSrc && (
        <div
          className="reel-preview"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label="Video preview"
        >
          <button
            type="button"
            className="reel-preview__close"
            onClick={closePreview}
            aria-label="Close preview"
          />
          <div className="reel-preview__content" onClick={(e) => e.stopPropagation()}>
            <video
              ref={previewVideoRef}
              src={previewSrc}
              controls
              autoPlay
              className="reel-preview__video"
            />
          </div>
        </div>
      )}
    </div>
  );
}
