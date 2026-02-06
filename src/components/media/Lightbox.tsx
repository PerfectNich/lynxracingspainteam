import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import type { MediaItem } from "../../types";
import { assetUrl } from "../../utils/assetUrl";

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ items, currentIndex, onClose, onNavigate }: LightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const item = items[currentIndex];
  const minSwipeDistance = 50;

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
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play();
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
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const lightboxContent = (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 bg-black/95 flex justify-center items-center"
      style={{ zIndex: 99999, touchAction: "none" }}
      onClick={handleClose}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-lynx-orange transition-colors z-10"
        aria-label="Close"
      >
        <FaTimes />
      </button>

      {/* Prev button - desktop only */}
      <button
        onClick={(e) => { e.stopPropagation(); handlePrev(); }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-lynx-orange transition-colors z-10 bg-black/50 p-3 rounded-full"
        aria-label="Previous"
      >
        <FaChevronLeft />
      </button>

      {/* Next button - desktop only */}
      <button
        onClick={(e) => { e.stopPropagation(); handleNext(); }}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-lynx-orange transition-colors z-10 bg-black/50 p-3 rounded-full"
        aria-label="Next"
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
    </div>
  );

  // Render using portal to escape any parent transforms
  return createPortal(lightboxContent, document.body);
}
