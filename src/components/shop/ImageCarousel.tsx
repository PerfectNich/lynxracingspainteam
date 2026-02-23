import { assetUrl } from "../../utils/assetUrl";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  currentIndex: number;
}

export function ImageCarousel({ images, alt, currentIndex }: ImageCarouselProps) {
  // simple image display; navigation is handled by parent for control placement
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

  return (
    <div className="relative w-full">
      <img
        src={assetUrl(images[currentIndex])}
        alt={alt}
        className="w-full h-[220px] object-contain rounded-md mb-3 transition-opacity duration-300"
        loading="lazy"
      />
    </div>
  );
}
