import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getJobs } from '@/lib/jobs';

export async function POST(request: Request) {
    try {
        const job = await request.json();

        const dbJob = {
            id: job.id,
            title: job.title,
            slug: job.slug,
            location: job.location,
            department: job.department,
            employment_type: job.employmentType,
            experience_level: job.experienceLevel,
            work_mode: job.workMode,
            description: job.description,
            description_sections: job.descriptionSections,
            form_fields: job.formFields,
            is_active: job.isActive
        };

        const { data, error } = await supabase
            .from('jobs')
            .upsert(dbJob, { onConflict: 'slug' });

        if (error) {
            console.error('Supabase upsert error:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Error saving job to Supabase:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const jobs = await getJobs();
        return NextResponse.json(jobs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
