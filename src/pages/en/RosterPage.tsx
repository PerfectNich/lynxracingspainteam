import members from "../../data/en/members.json";
import { PageHeader } from "../../components/common/PageHeader";
import { Section } from "../../components/common/Section";
import { SectionTitle } from "../../components/common/SectionTitle";
import { MemberCard } from "../../components/roster/MemberCard";
import { TwitchEmbed } from "../../components/roster/TwitchEmbed";
import type { Member } from "../../types";

export function RosterPageEN() {
  const { management, drivers, twitchChannels } = members as {
    management: Member[];
    drivers: Member[];
    twitchChannels: string[];
  };

  return (
    <>
      <PageHeader title="Team Roster" />

      <Section>
        <SectionTitle>Management</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
          {management.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Drivers</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
          {drivers.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle>Team Streams</SectionTitle>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
          {twitchChannels.map((channel) => (
            <TwitchEmbed key={channel} channel={channel} />
          ))}
        </div>
      </Section>
    </>
  );
}
