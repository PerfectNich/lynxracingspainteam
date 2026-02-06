import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { assetUrl } from "../../utils/assetUrl";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 1) {
    return (
      <img
        src={assetUrl(images[0])}
        alt={alt}
        className="w-full h-[220px] object-contain rounded-md mb-3"
        loading="lazy"
      />
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full">
      <img
        src={assetUrl(images[currentIndex])}
        alt={alt}
        className="w-full h-[220px] object-contain rounded-md mb-3 transition-opacity duration-300"
        loading="lazy"
      />
      <div className="flex justify-center items-center gap-4 mt-2">
        <button
          onClick={handlePrev}
          className="bg-lynx-orange text-lynx-dark border-none p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-orange-glow"
          aria-label="Previous"
        >
          <FaChevronLeft />
        </button>
        <span className="text-sm text-lynx-orange font-bold min-w-[40px] text-center">
          {currentIndex + 1}/{images.length}
        </span>
        <button
          onClick={handleNext}
          className="bg-lynx-orange text-lynx-dark border-none p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-orange-glow"
          aria-label="Next"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}
