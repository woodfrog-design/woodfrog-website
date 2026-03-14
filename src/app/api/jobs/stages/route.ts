import { NextResponse } from 'next/server';
import { getStagesForJob, saveStage, deleteStage } from '@/lib/candidates';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get('jobId');

        if (!jobId) {
            return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
        }

        const stages = await getStagesForJob(jobId);
        return NextResponse.json(stages);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { jobId, name, orderIndex, feedbackFormFields, id } = body;

        if (!jobId || !name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const success = await saveStage({
            id,
            jobId,
            name,
            orderIndex: orderIndex || 0,
            feedbackFormFields: feedbackFormFields || [],
        });
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const stageId = searchParams.get('stageId');

        if (!stageId) {
            return NextResponse.json({ error: 'Missing stageId' }, { status: 400 });
        }

        const success = await deleteStage(stageId);
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
