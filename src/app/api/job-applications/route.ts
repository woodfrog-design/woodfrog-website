import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getApplicationsForJob, submitApplication } from '@/lib/jobs';

import { uploadFileToDrive } from '@/lib/google-drive';

export async function POST(request: Request) {
    console.log('--- Job Application Submission Started ---');
    try {
        const formData = await request.formData();
        console.log('Form data received');

        const jobId = formData.get('jobId') as string;
        const jobTitle = formData.get('jobTitle') as string;
        const candidateName = formData.get('candidateName') as string;
        const candidateEmail = formData.get('candidateEmail') as string;
        const candidatePhone = formData.get('candidatePhone') as string;
        const candidateAddress = formData.get('candidateAddress') as string;
        const responsesJson = formData.get('responses') as string;
        const responses = JSON.parse(responsesJson || '{}');
        
        const resumeFile = formData.get('resume') as File | null;
        let resumeUrl = '';

        if (resumeFile) {
            console.log('Resume file detected:', resumeFile.name, 'Size:', resumeFile.size);
            
            // Format: Name-job post name -Resume -Date
            const dateStr = new Date().toISOString().split('T')[0];
            const cleanCandidateName = candidateName.replace(/[^a-zA-Z0-9\s]/g, '').trim();
            const cleanJobTitle = (jobTitle || 'Position').replace(/[^a-zA-Z0-9\s]/g, '').trim();
            const fileName = `${cleanCandidateName}-${cleanJobTitle}-Resume-${dateStr}.pdf`;
            
            console.log('Uploading to Google Drive with filename:', fileName);
            const uploadResult = await uploadFileToDrive(resumeFile, fileName);
            console.log('Google Drive upload successful:', uploadResult.fileId);
            resumeUrl = uploadResult.webViewLink || '';
        }

        const success = await submitApplication({
            jobId,
            candidateName,
            candidateEmail,
            candidatePhone,
            candidateAddress,
            responses,
            resumeUrl
        });

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
        }
    } catch (error: any) {
        console.error('Job application submission error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const jobId = searchParams.get('jobId');

        if (!jobId) {
            return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });
        }

        const apps = await getApplicationsForJob(jobId);
        return NextResponse.json(apps);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
