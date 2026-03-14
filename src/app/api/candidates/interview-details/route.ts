import { NextRequest, NextResponse } from 'next/server';
import { getInterviewDetails, saveInterviewDetails } from '@/lib/candidates';

export async function GET(req: NextRequest) {
    const applicationId = req.nextUrl.searchParams.get('applicationId');
    if (!applicationId) {
        return NextResponse.json({ error: 'Missing applicationId' }, { status: 400 });
    }
    const details = await getInterviewDetails(applicationId);
    return NextResponse.json(details);
}

export async function PUT(req: NextRequest) {
    try {
        const { applicationId, details } = await req.json();
        if (!applicationId || !details) {
            return NextResponse.json({ error: 'Missing applicationId or details' }, { status: 400 });
        }
        const success = await saveInterviewDetails(applicationId, details);
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
