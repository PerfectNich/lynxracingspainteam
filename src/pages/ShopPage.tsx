import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { assetUrl } from "../utils/assetUrl";
import { GradientDots } from "@/components/ui/gradient-dots";
import productsData from "../data/products.json";
import type { Product } from "../types";

const products = productsData as Product[];

function ProductCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const total = product.images.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-lynx-border bg-lynx-dark-card transition-colors duration-300 hover:border-lynx-orange"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
        <img
          src={assetUrl(product.images[index])}
          alt={t(product.nameKey)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {total > 1 && (
          <>
            <button
              onClick={() => setIndex((value) => (value - 1 + total) % total)}
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white opacity-0 transition-opacity duration-200 hover:bg-lynx-orange hover:text-black group-hover:opacity-100"
              aria-label="Anterior"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={() => setIndex((value) => (value + 1) % total)}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white opacity-0 transition-opacity duration-200 hover:bg-lynx-orange hover:text-black group-hover:opacity-100"
              aria-label="Siguiente"
            >
              <FaChevronRight size={12} />
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
              {product.images.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  onClick={() => setIndex(dotIndex)}
                  className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                    dotIndex === index ? "w-3 bg-lynx-orange" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex-1">
          <h3
            className="text-base font-bold leading-tight text-white"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t(product.nameKey)}
          </h3>
          <p
            className="mt-2 text-2xl font-black text-lynx-orange"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {product.price.toFixed(2)}
            <span className="text-base font-normal text-lynx-orange/70">€</span>
          </p>
        </div>

        <button
          className="w-full rounded-full border border-lynx-orange py-2.5 text-sm tracking-widest text-lynx-orange transition-all duration-300 hover:bg-lynx-orange hover:text-black"
          style={{ fontFamily: "var(--font-orbitron)", fontSize: "0.7rem" }}
        >
          {t("shop.buy")}
        </button>
      </div>
    </motion.div>
  );
}

export function ShopPage() {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-hidden">
      <div className="relative overflow-hidden border-b border-lynx-border px-6 py-24 text-center">
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
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,106,0,0.5) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p
            className="mb-3 text-xs uppercase tracking-[0.4em] text-lynx-orange"
            style={{ fontFamily: "var(--font-rajdhani)", fontWeight: 700 }}
          >
            Merchandising oficial
          </p>
          <h1
            className="text-4xl font-black text-white md:text-6xl"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            {t("shop.page_title")}
          </h1>
          <p
            className="mt-3 text-lynx-text/60"
            style={{ fontFamily: "var(--font-rajdhani)", fontSize: "1.05rem" }}
          >
            {t("shop.subtitle")}
          </p>
        </motion.div>
      </div>

      <section className="px-6 py-14">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
