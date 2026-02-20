import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Animations",
};

export default function AIAnimationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
