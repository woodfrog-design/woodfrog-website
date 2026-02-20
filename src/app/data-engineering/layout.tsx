import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Data Engineering",
};

export default function DataEngineeringLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
