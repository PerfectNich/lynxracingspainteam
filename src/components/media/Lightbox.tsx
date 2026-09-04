import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import type { MediaItem } from "../../types";
import { assetUrl } from "../../utils/assetUrl";

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const item = items[currentIndex];
  const minSwipeDistance = 50;

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => {
      dialog?.close();
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  const handlePrev = useCallback(() => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  }, [currentIndex, items.length, onNavigate]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLVideoElement) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); handlePrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); handleNext(); }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      void videoRef.current.play().catch(() => { /* Native controls remain available if autoplay is blocked. */ });
    }
  }, [item]);

  const handleClose = () => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    onClose();
  };

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const lightboxContent = (
    <dialog
      ref={dialogRef}
      aria-label={t("media.page_title")}
      onCancel={(event) => { event.preventDefault(); handleClose(); }}
      className="fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none border-0 bg-black/95 p-0 text-white open:flex justify-center items-center"
      style={{ zIndex: 99999, touchAction: "none" }}
      onClick={handleClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={(event) => { event.stopPropagation(); handleClose(); }}
        className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-white text-2xl hover:text-lynx-orange transition-colors z-10"
        aria-label={t("media.close_lightbox")}
      >
        <FaTimes />
      </button>

      {/* Prev button - desktop only */}
      <button
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white text-xl hover:text-lynx-orange transition-colors z-10 bg-black/70 rounded-full md:left-4"
        aria-label={t("media.previous_item")}
      >
        <FaChevronLeft />
      </button>

      {/* Next button - desktop only */}
      <button
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-white text-xl hover:text-lynx-orange transition-colors z-10 bg-black/70 rounded-full md:right-4"
        aria-label={t("media.next_item")}
      >
        <FaChevronRight />
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
        {currentIndex + 1} / {items.length}
      </div>

      {/* Content */}
      {item.type === "image" ? (
        <img
          src={assetUrl(item.src)}
          alt={item.alt || item.game}
          className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-orange-glow"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <video
          ref={videoRef}
          src={assetUrl(item.src)}
          controls
          className="max-w-[90vw] max-h-[80vh] object-contain rounded-lg shadow-orange-glow"
          onClick={(e) => e.stopPropagation()}
        />
      )}
    </dialog>
  );

  // Render using portal to escape any parent transforms
  return createPortal(lightboxContent, document.body);
}
