import type { Product } from "../../types";
import { ImageCarousel } from "./ImageCarousel";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-lynx-dark-card border border-lynx-border rounded-lg overflow-hidden text-center p-4 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,106,0,0.6)]">
      <ImageCarousel images={product.images} alt={product.name} />
      <h3 className="text-lynx-orange text-xl my-2">{product.name}</h3>
      <p className="text-lynx-text text-base my-2">
        {product.price.toFixed(2)}€
      </p>
      <button className="bg-lynx-orange text-lynx-dark border-none px-4 py-2.5 rounded font-bold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-orange-glow">
        Comprar
      </button>
    </div>
  );
}
