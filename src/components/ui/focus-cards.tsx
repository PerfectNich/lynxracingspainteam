import React, { useState } from "react";
import { cn } from "@/lib/utils";

type CardType = {
  title: string;
  src: string;
};

const FocusCard = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: CardType;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-lynx-dark-card overflow-hidden h-60 md:h-80 w-full transition-all duration-300 ease-out",
        // Al hacer hover en otra tarjeta, esta se oscurece más
        hovered !== null && hovered !== index && "scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      {/* Overlay oscuro por defecto, desaparece al hacer hover */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          hovered === index ? "opacity-0" : "bg-black/55 opacity-100"
        )}
      />
    </div>
  )
);

FocusCard.displayName = "FocusCard";

export function FocusCards({ cards }: { cards: CardType[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto w-full">
      {cards.map((card, index) => (
        <FocusCard
          key={card.src}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
