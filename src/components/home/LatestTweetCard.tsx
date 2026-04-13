import { motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";
import latestXPost from "../../data/latest-x-post.json";

type LatestXPost = {
  account: string;
  dateLabel: string;
  text: string;
  url: string;
  source: "api" | "fallback";
};

const post = latestXPost as LatestXPost;

export function LatestTweetCard() {
  const isFallback = post.source !== "api";
  const visibleDate = isFallback ? "Cuenta oficial del equipo" : post.dateLabel;
  const visibleText = isFallback
    ? "Sigue nuestras novedades, resultados, carreras y contenido del equipo en la cuenta oficial de X."
    : post.text;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-6 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="rounded-[1.5rem] border border-lynx-border bg-[linear-gradient(135deg,rgba(20,20,20,0.98),rgba(12,12,12,0.94))] overflow-hidden shadow-[0_18px_60px_rgba(0,0,0,0.32)]">
          <div className="flex flex-col md:flex-row md:items-stretch">
            <div className="md:w-44 lg:w-48 border-b md:border-b-0 md:border-r border-lynx-border bg-[radial-gradient(circle_at_top,rgba(255,106,0,0.22),transparent_70%)] p-5 md:p-6">
              <p
                className="text-lynx-orange text-xs tracking-[0.35em] uppercase mb-3"
                style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
              >
                Ultima hora
              </p>
              <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/4 flex items-center justify-center text-white text-xl mb-4">
                <FaXTwitter />
              </div>
              <p
                className="text-sm text-lynx-text/55"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                Sigue la actividad del equipo
              </p>
            </div>

            <div className="flex-1 p-5 md:p-6 lg:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div>
                  <p
                    className="text-white font-bold"
                    style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.95rem" }}
                  >
                    {post.account}
                  </p>
                  <p
                    className="text-sm text-lynx-text/55"
                    style={{ fontFamily: "var(--font-rajdhani)" }}
                  >
                    {visibleDate}
                  </p>
                </div>

                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-lynx-orange px-4 py-2 text-xs tracking-[0.22em] uppercase text-lynx-orange hover:bg-lynx-orange hover:text-black transition-all duration-300"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  Ver en X
                </a>
              </div>

              <p
                className="text-base md:text-lg leading-relaxed text-lynx-text/82"
                style={{ fontFamily: "var(--font-rajdhani)" }}
              >
                {visibleText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
