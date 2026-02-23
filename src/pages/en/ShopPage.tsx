import products from "../../data/en/products.json";
import { PageHeader } from "../../components/common/PageHeader";
import { Section } from "../../components/common/Section";
import { ProductCard } from "../../components/shop/ProductCard";
import type { Product } from "../../types";

export function ShopPageEN() {
  const productList = products as Product[];

  return (
    <>
      <PageHeader
        title="Official Lynx Racing Shop"
        subtitle="Merch and team products"
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
