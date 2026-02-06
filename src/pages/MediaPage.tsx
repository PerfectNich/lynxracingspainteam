import mediaItems from "../data/media.json";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";
import { GalleryGrid } from "../components/media/GalleryGrid";
import type { MediaItem } from "../types";

export function MediaPage() {
  const items = mediaItems as MediaItem[];

  return (
    <>
      <PageHeader title="Multimedia" />

      <Section>
        <SectionTitle>Fotos y Videos del Equipo</SectionTitle>
        <GalleryGrid items={items} />
      </Section>
    </>
  );
}
