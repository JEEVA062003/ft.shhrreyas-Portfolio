import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { photographyImages } from '../data/photography';
import './Photography.css';

export default function Photography() {
  const [previewSrc, setPreviewSrc] = useState(null);

  const closePreview = useCallback(() => setPreviewSrc(null), []);

  useEffect(() => {
    if (!previewSrc) return;
    const onKey = (e) => e.key === 'Escape' && closePreview();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previewSrc, closePreview]);

  return (
    <div className="photography-page">
      <header className="photography-header">
        <div className="photography-header__inner">
          <Link to="/#works" className="photography-header__back" data-cursor-hover>
            <span className="photography-header__back-arrow" aria-hidden />
            Back to Works
          </Link>
          <h1 className="photography-header__title">Photography</h1>
        </div>
      </header>
      <main className="photography-main">
        <div className="photography-grid">
          {photographyImages.map((src, i) => (
            <article
              key={i}
              className="photography-card"
              onClick={() => setPreviewSrc(src)}
              onKeyDown={(e) => e.key === 'Enter' && setPreviewSrc(src)}
              role="button"
              tabIndex={0}
              data-cursor-hover
            >
              <div className="photography-card__frame">
                <img src={src} alt={`Photography ${i + 1}`} loading="lazy" className="photography-card__img" />
              </div>
            </article>
          ))}
        </div>
      </main>

      {previewSrc && (
        <div
          className="photography-preview"
          onClick={closePreview}
          onKeyDown={(e) => e.key === 'Escape' && closePreview()}
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
        >
          <button
            type="button"
            className="photography-preview__close"
            onClick={closePreview}
            aria-label="Close preview"
          />
          <div className="photography-preview__content" onClick={(e) => e.stopPropagation()}>
            <img src={previewSrc} alt="Preview" className="photography-preview__img" />
          </div>
        </div>
      )}
    </div>
  );
}
