import type { Product } from "../../types";
import { ImageCarousel } from "./ImageCarousel";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
  };

  return (
    <div className="bg-lynx-dark-card border border-lynx-border rounded-lg overflow-hidden text-center p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,106,0,0.6)] flex flex-col">
      <ImageCarousel images={product.images} alt={product.name} currentIndex={currentIndex} />
      {/* space between details and button to push buy to bottom */}
      <div className="flex-1 flex flex-col justify-between mt-2">
        <div>
          <h3 className="text-lynx-orange text-xl my-2 min-h-[2.5rem] whitespace-pre-line">
            {product.name.replace(" ", "\n")}
          </h3>
          <p className="text-lynx-text text-base my-2">
            {product.price.toFixed(2)}€
          </p>
        </div>
        {/* controls moved below details */}
        {product.images.length > 1 && (
          <div className="flex justify-center items-center gap-4 mt-2">
            <button
              onClick={handlePrev}
              className="bg-lynx-orange text-lynx-dark border-none p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-orange-glow"
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>
            <span className="text-sm text-lynx-orange font-bold min-w-[40px] text-center">
              {currentIndex + 1}/{product.images.length}
            </span>
            <button
              onClick={handleNext}
              className="bg-lynx-orange text-lynx-dark border-none p-2 rounded-full cursor-pointer transition-all duration-200 hover:scale-110 hover:shadow-orange-glow"
              aria-label="Next"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
        <button className="bg-lynx-orange text-lynx-dark border-none px-4 py-2.5 rounded font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-orange-glow mt-4">
          Comprar
        </button>
      </div>
    </div>
  );
}
