import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { freelancingVideos } from '../data/freelancing';
import './Freelancing.css';

export default function Freelancing() {
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
    <div className="freelancing-page">
      <header className="freelancing-header">
        <div className="freelancing-header__inner">
          <Link to="/#works" className="freelancing-header__back" data-cursor-hover>
            <span className="freelancing-header__back-arrow" aria-hidden />
            Back to Works
          </Link>
          <h1 className="freelancing-header__title">Freelancing</h1>
        </div>
      </header>
      <main className="freelancing-main">
        <div className="freelancing-grid">
          {freelancingVideos.map((src, i) => (
            <article
              key={i}
              className="freelancing-card"
              onClick={() => setPreviewSrc(src)}
              onKeyDown={(e) => e.key === 'Enter' && setPreviewSrc(src)}
              role="button"
              tabIndex={0}
              data-cursor-hover
            >
              <div className="freelancing-card__frame">
                <video
                  src={src}
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  className="freelancing-card__video"
                  aria-label={`Freelancing video ${i + 1}`}
                />
              </div>
            </article>
          ))}
        </div>
      </main>

      {previewSrc && (
        <div
          className="freelancing-preview"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label="Video preview"
        >
          <button
            type="button"
            className="freelancing-preview__close"
            onClick={closePreview}
            aria-label="Close preview"
          />
          <div className="freelancing-preview__content" onClick={(e) => e.stopPropagation()}>
            <video
              ref={previewVideoRef}
              src={previewSrc}
              controls
              autoPlay
              className="freelancing-preview__video"
            />
          </div>
        </div>
      )}
    </div>
  );
}
