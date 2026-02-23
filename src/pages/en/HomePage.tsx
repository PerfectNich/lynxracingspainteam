import { PageHeader } from "../../components/common/PageHeader";
import { Section } from "../../components/common/Section";
import { SectionTitle } from "../../components/common/SectionTitle";

export function HomePageEN() {
  return (
    <>
      <PageHeader title="Home - Lynx Racing" subtitle="Official team site" />

      <Section>
        <SectionTitle>About the Team</SectionTitle>
        <p className="text-lg md:text-xl leading-relaxed">
          Lynx Racing Spain Team is a group of sim racers competing in Assetto
          Corsa Competizione, iRacing and other platforms. We organise events and
          race regularly.
        </p>
      </Section>
    </>
  );
}
