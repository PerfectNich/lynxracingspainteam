import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import members from "../data/members.json";
import { ExpandCards } from "@/components/ui/expand-cards";
import type { ExpandCardItem } from "@/components/ui/expand-cards";
import { GradientDots } from "@/components/ui/gradient-dots";
import { TwitchEmbed } from "../components/roster/TwitchEmbed";
import type { Member } from "../types";

const { management, drivers, twitchChannels } = members as {
  management: Member[];
  drivers: Member[];
  twitchChannels: string[];
};

const FLAG_MAP: Record<string, string> = {
  spain: 'https://flagcdn.com/w80/es.png',
  cat: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Catalonia.svg/80px-Flag_of_Catalonia.svg.png',
  serbia: 'https://flagcdn.com/w80/rs.png',
  colombia: 'https://flagcdn.com/w80/co.png',
  andalucia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Flag_of_Andalusia.svg/80px-Flag_of_Andalusia.svg.png',
  valencia: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Flag_of_the_Valencian_Community_%28official%29.svg/80px-Flag_of_the_Valencian_Community_%28official%29.svg.png',
};

// Retratos deterministas: mujer para Aida Bueno, hombre para el resto
const FEMALE_NAMES = ['Aida'];

function portraitUrl(m: Member, globalIndex: number): string {
  const firstName = m.name.split(' ')[0];
  if (FEMALE_NAMES.includes(firstName)) {
    return `https://randomuser.me/api/portraits/women/${(globalIndex % 70) + 1}.jpg`;
  }
  return `https://randomuser.me/api/portraits/men/${(globalIndex % 90) + 1}.jpg`;
}

function memberToCard(m: Member, globalIndex: number): ExpandCardItem {
  return {
    id: m.name,
    imageSrc: portraitUrl(m, globalIndex),
    flagSrc: FLAG_MAP[m.country] ?? 'https://flagcdn.com/w80/es.png',
    name: m.name,
    dorsal: m.dorsal,
  };
}

const managementCards = management.map((m, i) => memberToCard(m, i));
const driverCards = drivers.map((m, i) => memberToCard(m, management.length + i));

// Split drivers into rows of 7
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
const driverRows = chunkArray(driverCards, 7);


export function RosterPage() {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <div className="relative overflow-hidden py-24 px-6 text-center border-b border-lynx-border">
        <div className="absolute inset-0 opacity-15">
          <GradientDots
            dotSize={5}
            spacing={14}
            duration={35}
            colorCycleDuration={7}
            backgroundColor="#0b0b0b"
          />
        </div>
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,106,0,0.5) 0%, transparent 70%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10"
        >
          <p
            className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}
          >
            Lynx Racing Spain
          </p>
          <h1
            className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            {t("roster.page_title")}
          </h1>
        </motion.div>
      </div>

      {/* Management */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-10">
            <p
              className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-2"
              style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}
            >
              Equipo directivo
            </p>
            <h2
              className="text-2xl md:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {t("roster.management")}
            </h2>
          </div>
          <div className="overflow-x-auto">
            <ExpandCards
              items={managementCards}
              cardHeight={300}
              expandedWidth={320}
              collapsedWidth={80}
            />
          </div>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="h-px max-w-5xl mx-auto bg-lynx-border mx-6" />

      {/* Drivers */}
      <section className="py-16 px-4 bg-lynx-dark-card">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-10">
            <p
              className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-2"
              style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}
            >
              {drivers.length} pilotos
            </p>
            <h2
              className="text-2xl md:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {t("roster.drivers")}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {driverRows.map((row, rowIdx) => (
              <div key={rowIdx} className="overflow-x-auto">
                <ExpandCards
                  items={row}
                  cardHeight={240}
                  expandedWidth={280}
                  collapsedWidth={68}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Streams */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-10">
            <p
              className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-2"
              style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}
            >
              En directo
            </p>
            <h2
              className="text-2xl md:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {t("roster.streams")}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {twitchChannels.map((channel) => (
              <TwitchEmbed key={channel} channel={channel} />
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
