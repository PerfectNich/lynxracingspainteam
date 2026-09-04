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
    onClick,
  }: {
    card: CardType;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    onClick?: () => void;
  }) => (
    <button
      type="button"
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(index)}
      onBlur={() => setHovered(null)}
      onClick={onClick}
      className={cn(
        "rounded-lg relative bg-lynx-dark-card overflow-hidden h-60 md:h-80 w-full transition-all duration-300 ease-out border-0 p-0 cursor-pointer",
        hovered !== null && hovered !== index && "scale-[0.98]"
      )}
    >
      <img
        src={card.src}
        alt={card.title}
        loading="lazy"
        decoding="async"
        className="object-cover absolute inset-0 w-full h-full"
      />
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          hovered === index ? "opacity-0" : "bg-black/10 opacity-100"
        )}
      />
    </button>
  )
);

FocusCard.displayName = "FocusCard";

export function FocusCards({
  cards,
  onCardClick,
}: {
  cards: CardType[];
  onCardClick?: (index: number) => void;
}) {
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
          onClick={onCardClick ? () => onCardClick(index) : undefined}
        />
      ))}
    </div>
  );
}
