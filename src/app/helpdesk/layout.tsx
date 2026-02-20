import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Helpdesk",
};

export default function HelpdeskLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
