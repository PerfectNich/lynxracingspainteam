import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import members from "../data/members.json";
import { ExpandCards } from "@/components/ui/expand-cards";
import type { ExpandCardItem } from "@/components/ui/expand-cards";
import { GradientDots } from "@/components/ui/gradient-dots";
import { TwitchEmbed } from "../components/roster/TwitchEmbed";
import { FaChevronDown, FaTwitch } from "react-icons/fa";
import type { Member } from "../types";
import { assetUrl } from "../utils/assetUrl";

const { management, drivers, twitchChannels } = members as {
  management: Member[];
  drivers: Member[];
  twitchChannels: string[];
};

const FLAG_MAP: Record<string, string> = {
  spain: assetUrl("/banderas/spain.png"),
  cat: assetUrl("/banderas/cat.jpg"),
  serbia: assetUrl("/banderas/serbia.jpg"),
  colombia: assetUrl("/banderas/colombia.png"),
  andalucia: assetUrl("/banderas/andalucia.png"),
  valencia: assetUrl("/banderas/valencia.png"),
};

const CUSTOM_PORTRAITS: Record<string, string> = {
  "Juan Serrano": assetUrl("/img/juan.png"),
  "Emiliano Sturniolo": assetUrl("/roster/emiliano-sturniolo.png"),
  "Xavier Sobrerroca": assetUrl("/img/xavi.png"),
  "Albert Gombau": assetUrl("/img/gombi.png"),
  "Gonzalo Sanchez": assetUrl("/img/lalo2.png"),
  "Relja Ljubobratovic": assetUrl("/img/relja.jpg"),
  "Antonio Balboa": assetUrl("/img/balboa.png"),
  "Antonio Castillo": assetUrl("/img/castillo.png"),
};

const DEFAULT_PORTRAITS = [
  assetUrl("/img/foto piloto.png"),
  assetUrl("/img/foto piloto1.png"),
  assetUrl("/img/foto piloto2.png"),
  assetUrl("/img/foto piloto3.png"),
];

const CUSTOM_PORTRAIT_POSITIONS: Record<string, string> = {
  "Juan Serrano": "center 18%",
  "Emiliano Sturniolo": "center 18%",
  "Xavier Sobrerroca": "center 22%",
  "Albert Gombau": "center 18%",
  "Gonzalo Sanchez": "center 18%",
  "Relja Ljubobratovic": "center 18%",
  "Antonio Balboa": "center 18%",
  "Antonio Castillo": "center 20%",
};

function portraitUrl(m: Member, globalIndex: number): string {
  if (CUSTOM_PORTRAITS[m.name]) {
    return CUSTOM_PORTRAITS[m.name];
  }

  return DEFAULT_PORTRAITS[globalIndex % DEFAULT_PORTRAITS.length];
}

function memberToCard(m: Member, globalIndex: number): ExpandCardItem {
  return {
    id: m.name,
    imageSrc: portraitUrl(m, globalIndex),
    imagePosition: CUSTOM_PORTRAIT_POSITIONS[m.name],
    flagSrc: FLAG_MAP[m.country] ?? assetUrl("/banderas/spain.png"),
    name: m.name,
    dorsal: m.dorsal,
  };
}

const managementCards = management.map((m, i) => memberToCard(m, i));
const driverCards = drivers.map((m, i) => memberToCard(m, management.length + i));
const mainChannel = "lynxracingspainteam";
const secondaryChannels = twitchChannels.filter((channel) => channel !== mainChannel);

// Split drivers into rows of 7
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}
const driverRows = chunkArray(driverCards, 7);

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-lynx-border bg-lynx-dark-card px-5 py-4 text-center shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
      <p
        className="text-3xl font-black text-white"
        style={{ fontFamily: "var(--font-orbitron)" }}
      >
        {value}
      </p>
      <p
        className="mt-2 text-xs uppercase tracking-[0.24em] text-lynx-text/60"
        style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
      >
        {label}
      </p>
    </div>
  );
}

export function RosterPage() {
  const { t } = useTranslation();
  const [otherChannelsOpen, setOtherChannelsOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState(mainChannel);
  const totalCountries = new Set([...management, ...drivers].map((member) => member.country)).size;
  const stats = [
    { value: String(management.length), label: t("roster.stats.management") },
    { value: String(drivers.length), label: t("roster.stats.drivers") },
    { value: String(twitchChannels.length), label: t("roster.stats.streams") },
    { value: String(totalCountries), label: t("roster.stats.countries") },
  ];

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
            {t("roster.hero_label")}
          </p>
          <h1
            className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            {t("roster.page_title")}
          </h1>
          <p
            className="mx-auto mt-4 max-w-3xl text-lynx-text/65"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.05rem" }}
          >
            {t("roster.hero_intro")}
          </p>
        </motion.div>
      </div>

      <section className="px-6 py-10">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </section>

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
              {t("roster.management_label")}
            </p>
            <h2
              className="text-2xl md:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {t("roster.management")}
            </h2>
            <p
              className="mx-auto mt-3 max-w-2xl text-lynx-text/60"
              style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1rem" }}
            >
              {t("roster.management_intro")}
            </p>
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
              {t("roster.drivers_label", { count: drivers.length })}
            </p>
            <h2
              className="text-2xl md:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {t("roster.drivers")}
            </h2>
            <p
              className="mx-auto mt-3 max-w-2xl text-lynx-text/60"
              style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1rem" }}
            >
              {t("roster.drivers_intro")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {driverRows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="overflow-x-auto rounded-[1.5rem] border border-lynx-border/80 bg-black/10 p-2"
              >
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
              {t("roster.streams_label")}
            </p>
            <h2
              className="text-2xl md:text-4xl font-black text-white"
              style={{ fontFamily: 'var(--font-orbitron)' }}
            >
              {t("roster.streams")}
            </h2>
            <p
              className="mx-auto mt-3 max-w-2xl text-lynx-text/60"
              style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1rem" }}
            >
              {t("roster.streams_intro")}
            </p>
          </div>
          <div className="max-w-4xl mx-auto rounded-2xl border border-lynx-border bg-lynx-dark-card overflow-hidden">
            <div className="p-5 space-y-5">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#9146ff]/15 border border-[#9146ff]/30 flex-shrink-0">
                  <FaTwitch className="text-[#9146ff] text-lg" />
                </div>
                <div className="min-w-0">
                  <p
                    className="text-white font-bold"
                    style={{ fontFamily: 'var(--font-orbitron)' }}
                  >
                    Canal principal
                  </p>
                  <p
                    className="text-sm text-lynx-text/65"
                    style={{ fontFamily: 'var(--font-rajdhani)' }}
                  >
                    Directo principal de Lynx con acceso compacto al resto de pilotos.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedChannel(mainChannel)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                  selectedChannel === mainChannel
                    ? "border-[#9146ff] bg-[#9146ff]/15 text-white"
                    : "border-lynx-border text-lynx-text/80 hover:border-[#9146ff]/40 hover:text-white"
                }`}
              >
                <span
                  className="block font-bold"
                  style={{ fontFamily: 'var(--font-orbitron)', fontSize: '0.92rem' }}
                >
                  {mainChannel}
                </span>
                <span
                  className="block text-sm text-lynx-text/65 mt-1"
                  style={{ fontFamily: 'var(--font-rajdhani)' }}
                >
                  Directo principal del equipo
                </span>
              </button>

              {selectedChannel && (
                <TwitchEmbed channel={selectedChannel} height={320} />
              )}

              <div className="rounded-xl border border-lynx-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOtherChannelsOpen((open) => !open)}
                  className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left hover:bg-white/3 transition-colors"
                >
                  <div>
                    <p
                      className="text-white font-bold"
                      style={{ fontFamily: 'var(--font-orbitron)', fontSize: '0.85rem' }}
                    >
                      Otros canales
                    </p>
                    <p
                      className="text-sm text-lynx-text/60 mt-1"
                      style={{ fontFamily: 'var(--font-rajdhani)' }}
                    >
                      {secondaryChannels.length} canales disponibles
                    </p>
                  </div>
                  <FaChevronDown
                    className={`text-lynx-orange transition-transform duration-300 ${otherChannelsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {otherChannelsOpen && (
                  <div className="border-t border-lynx-border p-4">
                    <div className="flex flex-wrap gap-2">
                      {secondaryChannels.map((channel) => {
                        const active = channel === selectedChannel;

                        return (
                          <button
                            key={channel}
                            type="button"
                            onClick={() => setSelectedChannel(channel)}
                            className={`px-3 py-2 rounded-full border text-sm transition-all ${
                              active
                                ? "border-[#9146ff] bg-[#9146ff]/15 text-white"
                                : "border-lynx-border text-lynx-text/70 hover:border-[#9146ff]/40 hover:text-white"
                            }`}
                            style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}
                          >
                            {channel}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
