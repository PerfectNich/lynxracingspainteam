import type { ExpandCardItem } from "../ui/expand-cards";

export function PilotGrid({ items, onSelect }: { items: ExpandCardItem[]; onSelect: (item: ExpandCardItem) => void }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:hidden">
      {items.map((item) => (
        <li key={item.id} className="min-w-0 overflow-hidden rounded-lg border border-lynx-border bg-lynx-dark-card">
          <button type="button" onClick={() => onSelect(item)} aria-haspopup="dialog" className="block h-full w-full text-left">
          <img src={item.imageSrc} alt={item.name ?? ""} loading="lazy"
            className="aspect-[4/5] w-full object-cover"
            style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined} />
          <div className="p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              {item.flagSrc && <img src={item.flagSrc} alt="" className="h-5 w-8 object-contain" />}
              {item.dorsal && <span className="font-bold text-lynx-orange">#{item.dorsal}</span>}
            </div>
            <p className="break-words text-sm font-bold leading-snug text-white">{item.name}</p>
          </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
