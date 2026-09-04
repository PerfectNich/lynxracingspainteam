import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FaTimes, FaTwitch } from "react-icons/fa";
import type { Member } from "../../types";
import type { ExpandCardItem } from "../ui/expand-cards";
import { raceResults } from "../../data/race-results";
import teamEvent from "../../data/team-event";
import { pilotNameKey } from "../../utils/pilotName";

export function PilotProfile({ member, card, onClose }: {
  member: Member; card: ExpandCardItem; onClose: () => void;
}) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const results = raceResults.filter((result) => result.drivers.some((name) => pilotNameKey(name) === pilotNameKey(member.name)))
    .sort((a, b) => b.year - a.year);
  const entries = teamEvent.entries.filter((entry) => entry.drivers.some((name) => pilotNameKey(name) === pilotNameKey(member.name)));
  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <dialog ref={dialogRef} aria-labelledby="pilot-name"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-y-auto rounded-lg border border-lynx-border bg-lynx-dark-card p-0 text-white backdrop:bg-black/80">
      <div className="relative p-5 sm:p-8">
        <button type="button" onClick={onClose} aria-label={t("profile.close")}
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-black/80 text-white hover:text-lynx-orange"><FaTimes /></button>
        <div className="grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)]">
          <img src={card.imageSrc} alt={member.name} className="aspect-[4/5] w-32 rounded-lg object-cover sm:w-40"
            style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined} />
          <div className="min-w-0 self-center">
            <div className="mb-3 flex items-center gap-3">
              {card.flagSrc && <img src={card.flagSrc} alt={t(`profile.regions.${member.country}`)} className="h-6 w-9 object-contain" />}
              {member.dorsal && <span className="text-2xl font-bold text-lynx-orange">#{member.dorsal}</span>}
            </div>
            <h2 id="pilot-name" className="break-words text-2xl font-bold">{member.name}</h2>
            {member.twitch && <a href={`https://www.twitch.tv/${member.twitch}`} target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-lynx-border px-4 py-3"><FaTwitch />{member.twitch}</a>}
          </div>
        </div>
        {entries.length > 0 && <section className="mt-6 border-t border-lynx-border pt-5">
          <h3 className="font-bold text-lynx-orange">{t(teamEvent.status === "completed" ? "calendar.completed" : "racing.upcoming")}</h3>
          <p className="mt-2 font-semibold">{teamEvent.title}</p>
          {entries.map((entry) => <p key={entry.name} className="mt-1 text-sm text-lynx-text/80">{entry.name} · {entry.car || entry.category}{entry.result ? ` · ${entry.result}` : ""}</p>)}
        </section>}
        <section className="mt-6 border-t border-lynx-border pt-5">
          <h3 className="mb-3 font-bold">{t("profile.results")}</h3>
          {results.length ? <ul className="divide-y divide-lynx-border">
            {results.map((result) => <li key={result.id} className="flex items-start gap-3 py-3">
              <span className="font-black text-lynx-orange">P{result.pos}</span>
              <div><p className="font-semibold">{result.event}</p><p className="mt-1 text-sm text-lynx-text/65">{result.year} · {result.simulator} · <span className="uppercase">{result.car}</span></p></div>
            </li>)}
          </ul> : <p className="text-sm text-lynx-text/65">{t("profile.empty")}</p>}
        </section>
      </div>
    </dialog>, document.body
  );
}
