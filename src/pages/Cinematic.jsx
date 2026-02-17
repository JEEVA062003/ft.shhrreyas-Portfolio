import { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cinematicVideos } from '../data/cinematic';
import './Cinematic.css';

export default function Cinematic() {
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
    <div className="cinematic-page">
      <header className="cinematic-header">
        <div className="cinematic-header__inner">
          <Link to="/#works" className="cinematic-header__back" data-cursor-hover>
            <span className="cinematic-header__back-arrow" aria-hidden />
            Back to Works
          </Link>
          <h1 className="cinematic-header__title">Cinematic</h1>
        </div>
      </header>
      <main className="cinematic-main">
        <div className="cinematic-grid">
          {cinematicVideos.map((src, i) => (
            <article
              key={i}
              className="cinematic-card"
              onClick={() => setPreviewSrc(src)}
              onKeyDown={(e) => e.key === 'Enter' && setPreviewSrc(src)}
              role="button"
              tabIndex={0}
              data-cursor-hover
            >
              <div className="cinematic-card__frame">
                <video
                  src={src}
                  preload="metadata"
                  muted
                  loop
                  playsInline
                  className="cinematic-card__video"
                  aria-label={`Cinematic video ${i + 1}`}
                />
              </div>
            </article>
          ))}
        </div>
      </main>

      {previewSrc && (
        <div
          className="cinematic-preview"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label="Video preview"
        >
          <button
            type="button"
            className="cinematic-preview__close"
            onClick={closePreview}
            aria-label="Close preview"
          />
          <div className="cinematic-preview__content" onClick={(e) => e.stopPropagation()}>
            <video
              ref={previewVideoRef}
              src={previewSrc}
              controls
              autoPlay
              className="cinematic-preview__video"
            />
          </div>
        </div>
      )}
    </div>
  );
}
