import type { Member } from "../../types";
import { assetUrl } from "../../utils/assetUrl";

interface MemberCardProps {
  member: Member;
}

const countryFlags: Record<string, string> = {
  spain: "banderas/spain.png",
  cat: "banderas/cat.jpg",
  serbia: "banderas/serbia.jpg",
  valencia: "banderas/valencia.png",
  colombia: "banderas/colombia.png",
  andalucia: "banderas/andalucia.png",
};

export function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 bg-lynx-dark-card p-3 rounded-md border-l-4 border-lynx-orange text-center transition-all duration-300 hover:scale-105 hover:rotate-y-[10deg] hover:shadow-[0_8px_20px_rgba(255,106,0,0.4)]">
      <div className="flex items-center gap-2">
        <span className="text-lynx-orange font-bold">
          {member.dorsal ? `#${member.dorsal}` : "-"}
        </span>
        <img
          src={assetUrl(countryFlags[member.country] || countryFlags.spain)}
          alt={member.country}
          className="w-6 h-4 border border-lynx-border rounded-sm"
        />
      </div>
      {member.twitch ? (
        <a
          href={`https://www.twitch.tv/${member.twitch}`}
          target="_blank"
          rel="noopener noreferrer"
          className="member-link text-social-twitch font-bold hover:text-white transition-colors"
        >
          {member.name}
        </a>
      ) : (
        <span className="text-lynx-text font-bold">{member.name}</span>
      )}
    </div>
  );
}
