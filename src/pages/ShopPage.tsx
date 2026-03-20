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
  const [idx, setIdx] = useState(0);
  const total = product.images.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="group flex flex-col bg-lynx-dark-card border border-lynx-border rounded-2xl overflow-hidden hover:border-lynx-orange transition-colors duration-300"
    >
      {/* Imagen */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '1 / 1' }}>
        <img
          src={assetUrl(product.images[idx])}
          alt={t(product.nameKey)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Flechas de carousel */}
        {total > 1 && (
          <>
            <button
              onClick={() => setIdx((i) => (i - 1 + total) % total)}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-lynx-orange hover:text-black"
              aria-label="Anterior"
            >
              <FaChevronLeft size={12} />
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % total)}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-lynx-orange hover:text-black"
              aria-label="Siguiente"
            >
              <FaChevronRight size={12} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === idx ? 'bg-lynx-orange w-3' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div className="flex-1">
          <h3
            className="text-white font-bold text-base leading-tight"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            {t(product.nameKey)}
          </h3>
          <p
            className="text-lynx-orange text-2xl font-black mt-2"
            style={{ fontFamily: 'var(--font-orbitron)' }}
          >
            {product.price.toFixed(2)}<span className="text-base font-normal text-lynx-orange/70">€</span>
          </p>
        </div>

        <button
          className="w-full py-2.5 rounded-full border border-lynx-orange text-lynx-orange text-sm tracking-widest hover:bg-lynx-orange hover:text-black transition-all duration-300"
          style={{ fontFamily: 'var(--font-orbitron)', fontSize: '0.7rem' }}
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
      {/* Header */}
      <div className="relative overflow-hidden py-24 px-6 text-center border-b border-lynx-border">
        <div className="absolute inset-0 opacity-15">
          <GradientDots dotSize={5} spacing={14} duration={35} colorCycleDuration={7} backgroundColor="#0b0b0b" />
        </div>
        <div className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,106,0,0.5) 0%, transparent 70%)' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p className="text-lynx-orange text-xs tracking-[0.4em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-rajdhani)', fontWeight: 700 }}>
            Merchandising oficial
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: 'var(--font-orbitron)' }}>
            {t("shop.page_title")}
          </h1>
          <p className="text-lynx-text/60 mt-3"
            style={{ fontFamily: 'var(--font-rajdhani)', fontSize: '1.05rem' }}>
            {t("shop.subtitle")}
          </p>
        </motion.div>
      </div>

      {/* Grid de productos */}
      <section className="py-14 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
