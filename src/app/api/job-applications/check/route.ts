import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get('jobId');
        const email = searchParams.get('email');

        if (!jobId || !email) {
            return NextResponse.json({ error: 'Missing jobId or email' }, { status: 400 });
        }

        // Check if an application exists with matching job_id and candidate email
        const { data, error } = await supabase
            .from('job_applications')
            .select('id, status, created_at')
            .eq('job_id', jobId)
            .eq('candidate_email', email)
            .maybeSingle();

        if (error) {
            console.error('Error checking application:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (data) {
            return NextResponse.json({
                applied: true,
                applicationId: data.id,
                status: data.status,
                appliedAt: data.created_at,
            });
        }

        return NextResponse.json({ applied: false });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
