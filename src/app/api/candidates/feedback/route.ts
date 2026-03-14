import { NextResponse } from 'next/server';
import { getFeedbackForCandidate, submitFeedback } from '@/lib/candidates';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const applicationId = searchParams.get('applicationId');

        if (!applicationId) {
            return NextResponse.json({ error: 'Missing applicationId' }, { status: 400 });
        }

        const feedback = await getFeedbackForCandidate(applicationId);
        return NextResponse.json(feedback);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { applicationId, stageId, interviewerName, responses, rating, comments } = body;

        if (!applicationId || !stageId || !interviewerName) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const success = await submitFeedback({
            applicationId,
            stageId,
            interviewerName,
            responses: responses || {},
            rating: rating || 0,
            comments: comments || '',
        });
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
