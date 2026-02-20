import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Agents",
};

export default function AIAgentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
