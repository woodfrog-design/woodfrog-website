import { Metadata } from 'next";
import { getJobBySlug } from "@/lib/jobs";

interface Props {
    params: Promise<{ slug: string }>;
    children: React.ReactNode;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const job = await getJobBySlug(slug);
    return {
        title: job?.title || "Job Opening",
    };
}

export default function JobLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
