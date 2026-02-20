import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Data Visualization",
};

export default function DataVisualizationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
