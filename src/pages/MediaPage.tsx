import { useLocation } from "react-router-dom";
import mediaItems from "../data/media.json";
import mediaItemsEn from "../data/en/media.json";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";
import { GalleryGrid } from "../components/media/GalleryGrid";
import type { MediaItem } from "../types";

// TODO: re-enable when media files are available
const hiddenGames = ["AMS2", "RRE"];

export function MediaPage() {
  const location = useLocation();
  const source = (location.pathname.startsWith("/en") ? (mediaItemsEn as MediaItem[]) : (mediaItems as MediaItem[]));
  const items = source.filter((item) => !hiddenGames.includes(item.game ?? ""));

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
