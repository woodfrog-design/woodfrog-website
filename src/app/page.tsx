import { Metadata } from "next";
import { DemoOne } from "@/components/demos/etheral-shadow-demo";

export const metadata: Metadata = {
  title: "WoodFrog",
};

export default function Home() {
  return (
    <main>
      <DemoOne />
    </main>
  );
}
