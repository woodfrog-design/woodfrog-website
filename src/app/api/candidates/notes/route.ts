import { NextResponse } from 'next/server';
import { getCandidateNotes, saveCandidateNote } from '@/lib/candidates';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const applicationId = searchParams.get('applicationId');

        if (!applicationId) {
            return NextResponse.json({ error: 'Missing applicationId' }, { status: 400 });
        }

        const notes = await getCandidateNotes(applicationId);
        return NextResponse.json(notes);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { applicationId, noteType, content } = body;

        if (!applicationId || !noteType) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const success = await saveCandidateNote(applicationId, noteType, content);
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
