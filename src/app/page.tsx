import { Metadata } from "next";
import { DemoOne } from "@/components/demos/etheral-shadow-demo";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Woodfrog",
  description: "Discover how Woodfrog uncovers deep insights and optimizes processes through tailored AI agents and advanced analytics.",
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <DemoOne initialProducts={products} />
    </main>
  );
}
