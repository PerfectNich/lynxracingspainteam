import mediaItems from "../../data/en/media.json";
import { PageHeader } from "../../components/common/PageHeader";
import { Section } from "../../components/common/Section";
import { SectionTitle } from "../../components/common/SectionTitle";
import { GalleryGrid } from "../../components/media/GalleryGrid";
import type { MediaItem } from "../../types";

const hiddenGames = ["AMS2", "RRE"];

export function MediaPageEN() {
  const items = (mediaItems as MediaItem[]).filter(
    (item) => !hiddenGames.includes(item.game ?? "")
  );

  return (
    <>
      <PageHeader title="Media" />

      <Section>
        <SectionTitle>Team Photos & Videos</SectionTitle>
        <GalleryGrid items={items} />
      </Section>
    </>
  );
}
