import { useLocation } from "react-router-dom";
import products from "../../data/products.json";
import productsEn from "../../data/en/products.json";
import { PageHeader } from "../../components/common/PageHeader";
import { Section } from "../../components/common/Section";
import { ProductCard } from "../../components/shop/ProductCard";
import type { Product } from "../../types";

export function ShopPage() {
  const location = useLocation();
  const productList = (location.pathname.startsWith("/en") ? (productsEn as Product[]) : (products as Product[]));

  return (
    <>
      <PageHeader
        title="Tienda Oficial Lynx Racing"
        subtitle="Merchandising y productos del equipo"
      />

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-[1600px] mx-auto">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Section>
    </>
  );
}
