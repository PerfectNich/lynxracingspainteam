import members from "../../data/members.json";
import { PageHeader } from "../../components/common/PageHeader";
import { Section } from "../../components/common/Section";
import { SectionTitle } from "../../components/common/SectionTitle";
import { MemberCard } from "../../components/roster/MemberCard";
import { TwitchEmbed } from "../../components/roster/TwitchEmbed";
import type { Member } from "../../types";

export function RosterPage() {
  const { management, drivers, twitchChannels } = members as {
    management: Member[];
    drivers: Member[];
    twitchChannels: string[];
  };

  return (
    <>
      <PageHeader title="Plantilla del equipo" />

      <Section>
        <SectionTitle>Dirección</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
          {management.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Pilotos</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
          {drivers.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Directos del equipo</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
          {twitchChannels.map((channel) => (
            <TwitchEmbed key={channel} channel={channel} />
          ))}
        </div>
      </Section>
    </>
  );
}
