import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Custom Analytics",
};

export default function CustomAnalyticsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
