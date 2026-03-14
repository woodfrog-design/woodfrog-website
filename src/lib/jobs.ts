'use server';

import { supabase } from './supabase';

export interface FormField {
    id: string;
    label: string;
    type: string;
    required: boolean;
    options?: string[];
    maxSize?: number;
    acceptedTypes?: string;
}

export interface Job {
    id: string;
    title: string;
    slug: string;
    location: string;
    department: string;
    employmentType: string;
    experienceLevel: string;
    description: string;
    formFields: FormField[];
    isActive: boolean;
    viewCount: number;
    applicantCount?: number;
    newApplicantCount?: number;
    createdAt: string;
}

export interface JobApplication {
    id: string;
    jobId: string;
    candidateName: string;
    candidateEmail: string;
    candidatePhone: string;
    candidateAddress: string;
    responses: Record<string, any>;
    resumeUrl: string;
    status: string;
    createdAt: string;
}

const mapJobFromDb = (row: any): Job => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location,
    department: row.department,
    employmentType: row.employment_type,
    experienceLevel: row.experience_level,
    description: row.description,
    formFields: row.form_fields || [],
    isActive: row.is_active,
    viewCount: row.view_count || 0,
    applicantCount: row.applicant_count || 0,
    newApplicantCount: row.new_applicant_count || 0,
    createdAt: row.created_at
});

const mapApplicationFromDb = (row: any): JobApplication => ({
    id: row.id,
    jobId: row.job_id,
    candidateName: row.candidate_name,
    candidateEmail: row.candidate_email,
    candidatePhone: row.candidate_phone,
    candidateAddress: row.candidate_address,
    responses: row.responses || {},
    resumeUrl: row.resume_url,
    status: row.status,
    createdAt: row.created_at
});

export async function getJobs(): Promise<Job[]> {
    // Fetch jobs with application statuses for counting
    const { data, error } = await supabase
        .from('jobs')
        .select('*, job_applications(status)')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }

    return data.map(row => {
        const apps = row.job_applications || [];
        return mapJobFromDb({
            ...row,
            applicant_count: apps.length,
            new_applicant_count: apps.filter((a: any) => a.status === 'New').length
        });
    });
}

export async function getAllApplications(): Promise<(JobApplication & { jobTitle: string })[]> {
    const { data, error } = await supabase
        .from('job_applications')
        .select('*, jobs(title)')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all applications:', error);
        return [];
    }

    return data.map(row => ({
        ...mapApplicationFromDb(row),
        jobTitle: row.jobs?.title || 'Unknown Job'
    }));
}

export async function getActiveJobs(): Promise<Job[]> {
    const { data, error } = await supabase
        .from('jobs')
        .select('*, job_applications(status)')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching active jobs:', error);
        return [];
    }

    return data.map(row => {
        const apps = row.job_applications || [];
        return mapJobFromDb({
            ...row,
            applicant_count: apps.length,
            new_applicant_count: apps.filter((a: any) => a.status === 'New').length
        });
    });
}

export async function getJobBySlug(slug: string): Promise<Job | undefined> {
    const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') {
            console.error('Error fetching job by slug:', error);
        }
        return undefined;
    }

    return mapJobFromDb(data);
}

export async function getApplicationsForJob(jobId: string): Promise<JobApplication[]> {
    const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .eq('job_id', jobId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching applications:', error);
        return [];
    }

    return data.map(mapApplicationFromDb);
}

export async function submitApplication(app: Partial<JobApplication>): Promise<boolean> {
    const { error } = await supabase
        .from('job_applications')
        .insert({
            job_id: app.jobId,
            candidate_name: app.candidateName,
            candidate_email: app.candidateEmail,
            candidate_phone: app.candidatePhone,
            candidate_address: app.candidateAddress,
            responses: app.responses,
            resume_url: app.resumeUrl,
            status: 'New'
        });

    if (error) {
        console.error('Error submitting application:', error);
        return false;
    }

    return true;
}

export async function incrementJobViewCount(id: string): Promise<void> {
    const { data: current } = await supabase.from('jobs').select('view_count').eq('id', id).single();
    if (current) {
        await supabase.from('jobs').update({ view_count: (current.view_count || 0) + 1 }).eq('id', id);
    }
}

export async function updateJobStatus(id: string, isActive: boolean): Promise<boolean> {
    const { error } = await supabase
        .from('jobs')
        .update({ is_active: isActive })
        .eq('id', id);

    if (error) {
        console.error('Error updating job status:', error);
        return false;
    }
    return true;
}
