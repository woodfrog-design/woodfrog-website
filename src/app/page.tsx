import { Metadata } from "next";
import { DemoOne } from "@/components/demos/etheral-shadow-demo";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "WoodFrog",
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <DemoOne initialProducts={products} />
    </main>
  );
}
