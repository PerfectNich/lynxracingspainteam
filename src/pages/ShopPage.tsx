import { useTranslation } from "react-i18next";
import products from "../data/products.json";
import { PageHeader } from "../components/common/PageHeader";
import { Section } from "../components/common/Section";
import { ProductCard } from "../components/shop/ProductCard";
import type { Product } from "../types";

export function ShopPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader
        title={t("shop.page_title")}
        subtitle={t("shop.subtitle")}
      />

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1600px] mx-auto">
          {(products as Product[]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>
    </>
  );
}
