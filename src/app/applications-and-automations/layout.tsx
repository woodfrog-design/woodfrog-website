import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Applications and Automations",
};

export default function ApplicationsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
