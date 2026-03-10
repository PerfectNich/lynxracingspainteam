import { useTranslation } from "react-i18next";
import mediaItems from "../data/media.json";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { SectionTitle } from "../components/common/SectionTitle";
import { GalleryGrid } from "../components/media/GalleryGrid";
import type { MediaItem } from "../types";

// TODO: re-enable when media files are available
const hiddenGames = ["AMS2", "RRE"];

export function MediaPage() {
  const { t } = useTranslation();
  const items = (mediaItems as MediaItem[]).filter((item) => !hiddenGames.includes(item.game ?? ""));

  return (
    <>
      <PageHeader title={t("media.page_title")} />

      <Section>
        <SectionTitle>{t("media.gallery_title")}</SectionTitle>
        <GalleryGrid items={items} />
      </Section>
    </>
  );
}
