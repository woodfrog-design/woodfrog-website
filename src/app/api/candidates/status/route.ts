import { NextResponse } from 'next/server';
import { updateApplicationStatus } from '@/lib/candidates';

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { applicationId, status } = body;

        if (!applicationId || !status) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const success = await updateApplicationStatus(applicationId, status);
        return NextResponse.json({ success });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
