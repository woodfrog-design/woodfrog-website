import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Superset Analytics",
};

export default function SupersetAnalyticsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
