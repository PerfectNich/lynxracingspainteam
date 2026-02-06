import { useRef, useState, useEffect, useCallback } from "react";
import sponsors from "../../data/sponsors.json";
import type { Sponsor } from "../../types";

export function SponsorCarousel() {
  const sponsorList = sponsors as Sponsor[];
  const duplicatedSponsors = [...sponsorList, ...sponsorList, ...sponsorList];

  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animationRef = useRef<number | null>(null);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Wrap translateX so it stays within one section, creating infinite loop
  const wrapTranslateX = useCallback((x: number) => {
    if (!innerRef.current) return x;
    const sectionWidth = innerRef.current.scrollWidth / 3;
    if (sectionWidth === 0) return x;
    let wrapped = x % sectionWidth;
    if (wrapped > 0) wrapped -= sectionWidth;
    return wrapped;
  }, []);

  // Get current animation translateX value
  const getCurrentTranslate = useCallback(() => {
    if (!innerRef.current) return 0;
    const style = window.getComputedStyle(innerRef.current);
    const matrix = new DOMMatrix(style.transform);
    return matrix.m41;
  }, []);

  // Schedule resume of animation
  const scheduleResume = useCallback(() => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  }, []);

  // Handle touch/mouse start
  const handleStart = (clientX: number) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);

    // Capture current position from CSS animation
    const currentX = getCurrentTranslate();
    setTranslateX(currentX);
    setIsPaused(true);
    setIsDragging(true);

    lastX.current = clientX;
    lastTime.current = Date.now();
    velocity.current = 0;
  };

  // Handle touch/mouse move
  const handleMove = (clientX: number) => {
    if (!isDragging) return;

    const now = Date.now();
    const dt = now - lastTime.current;
    const dx = clientX - lastX.current;

    if (dt > 0) {
      velocity.current = dx / dt * 16;
    }

    lastX.current = clientX;
    lastTime.current = now;
    setTranslateX((prev) => wrapTranslateX(prev + dx));
  };

  // Handle touch/mouse end - apply inertia
  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const applyInertia = () => {
      velocity.current *= 0.95; // friction

      if (Math.abs(velocity.current) < 0.5) {
        velocity.current = 0;
        scheduleResume();
        return;
      }

      setTranslateX((prev) => wrapTranslateX(prev + velocity.current));
      animationRef.current = requestAnimationFrame(applyInertia);
    };

    if (Math.abs(velocity.current) > 0.5) {
      animationRef.current = requestAnimationFrame(applyInertia);
    } else {
      scheduleResume();
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    };
  }, []);

  return (
    <div
      className="overflow-x-clip overflow-y-visible w-full my-8 py-4 cursor-grab active:cursor-grabbing select-none"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}
      onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
      ref={containerRef}
    >
      <div
        ref={innerRef}
        className={`flex gap-6 md:gap-16 items-center w-max ${!isPaused ? 'animate-scroll-mobile md:animate-scroll' : ''}`}
        style={isPaused ? { transform: `translateX(${translateX}px)` } : undefined}
      >
        {duplicatedSponsors.map((sponsor, index) => {
          const content = (
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="max-h-[82px] w-auto object-contain flex-shrink-0 transition-transform duration-300 hover:scale-125 hover:cursor-pointer"
              loading="lazy"
              draggable={false}
            />
          );

          return sponsor.url ? (
            <a
              key={`${sponsor.name}-${index}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0"
              onClick={(e) => Math.abs(velocity.current) > 1 && e.preventDefault()}
            >
              {content}
            </a>
          ) : (
            <div key={`${sponsor.name}-${index}`} className="flex-shrink-0">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
