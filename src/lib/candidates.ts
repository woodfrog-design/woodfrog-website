import { supabase } from './supabase';

// ─── Interfaces ────────────────────────────────────────────────

export interface CandidateNote {
    id: string;
    applicationId: string;
    noteType: 'important_info' | 'overall_experience' | 'future_fit';
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface InterviewStage {
    id: string;
    jobId: string;
    name: string;
    orderIndex: number;
    feedbackFormFields: FeedbackFormField[];
    createdAt: string;
}

export interface FeedbackFormField {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'rating' | 'select';
    required: boolean;
    options?: string[];
}

export interface InterviewFeedback {
    id: string;
    applicationId: string;
    stageId: string;
    stageName?: string;
    interviewerName: string;
    responses: Record<string, any>;
    rating: number;
    comments: string;
    createdAt: string;
}

export const PIPELINE_STATUSES = [
    'Application Received',
    'Screening',
    'Technical Round',
    'Final Round',
    'Selected',
    'Rejected',
] as const;

export type PipelineStatus = typeof PIPELINE_STATUSES[number];

// ─── Mappers ───────────────────────────────────────────────────

const mapNoteFromDb = (row: any): CandidateNote => ({
    id: row.id,
    applicationId: row.application_id,
    noteType: row.note_type,
    content: row.content,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
});

const mapStageFromDb = (row: any): InterviewStage => ({
    id: row.id,
    jobId: row.job_id,
    name: row.name,
    orderIndex: row.order_index,
    feedbackFormFields: row.feedback_form_fields || [],
    createdAt: row.created_at,
});

const mapFeedbackFromDb = (row: any): InterviewFeedback => ({
    id: row.id,
    applicationId: row.application_id,
    stageId: row.stage_id,
    stageName: row.stage_name,
    interviewerName: row.interviewer_name,
    responses: row.responses || {},
    rating: row.rating,
    comments: row.comments,
    createdAt: row.created_at,
});

// ─── Notes CRUD ────────────────────────────────────────────────

export async function getCandidateNotes(applicationId: string): Promise<CandidateNote[]> {
    const { data, error } = await supabase
        .from('candidate_notes')
        .select('*')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching candidate notes:', error);
        return [];
    }
    return data.map(mapNoteFromDb);
}

export async function getAllCandidateNotes(): Promise<CandidateNote[]> {
    const { data, error } = await supabase
        .from('candidate_notes')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching all candidate notes:', error);
        return [];
    }
    return data.map(mapNoteFromDb);
}

export async function saveCandidateNote(
    applicationId: string,
    noteType: CandidateNote['noteType'],
    content: string
): Promise<boolean> {
    // Upsert — one note per type per application
    const { error } = await supabase
        .from('candidate_notes')
        .upsert(
            {
                application_id: applicationId,
                note_type: noteType,
                content,
                updated_at: new Date().toISOString(),
            },
            { onConflict: 'application_id,note_type' }
        );

    if (error) {
        console.error('Error saving candidate note:', error);
        return false;
    }
    return true;
}

// ─── Interview Stages CRUD ─────────────────────────────────────

export async function getStagesForJob(jobId: string): Promise<InterviewStage[]> {
    const { data, error } = await supabase
        .from('interview_stages')
        .select('*')
        .eq('job_id', jobId)
        .order('order_index', { ascending: true });

    if (error) {
        console.error('Error fetching interview stages:', error);
        return [];
    }
    return data.map(mapStageFromDb);
}

export async function saveStage(stage: Partial<InterviewStage> & { jobId: string }): Promise<boolean> {
    const dbStage: any = {
        job_id: stage.jobId,
        name: stage.name,
        order_index: stage.orderIndex,
        feedback_form_fields: stage.feedbackFormFields || [],
    };

    if (stage.id) {
        dbStage.id = stage.id;
    }

    const { error } = await supabase
        .from('interview_stages')
        .upsert(dbStage);

    if (error) {
        console.error('Error saving interview stage:', error);
        return false;
    }
    return true;
}

export async function deleteStage(stageId: string): Promise<boolean> {
    const { error } = await supabase
        .from('interview_stages')
        .delete()
        .eq('id', stageId);

    if (error) {
        console.error('Error deleting interview stage:', error);
        return false;
    }
    return true;
}

// ─── Feedback CRUD ─────────────────────────────────────────────

export async function getFeedbackForCandidate(applicationId: string): Promise<InterviewFeedback[]> {
    const { data, error } = await supabase
        .from('interview_feedback')
        .select('*, interview_stages(name)')
        .eq('application_id', applicationId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching interview feedback:', error);
        return [];
    }
    return data.map((row: any) => mapFeedbackFromDb({
        ...row,
        stage_name: row.interview_stages?.name || 'Unknown Stage',
    }));
}

export async function submitFeedback(feedback: Omit<InterviewFeedback, 'id' | 'createdAt' | 'stageName'>): Promise<boolean> {
    const { error } = await supabase
        .from('interview_feedback')
        .insert({
            application_id: feedback.applicationId,
            stage_id: feedback.stageId,
            interviewer_name: feedback.interviewerName,
            responses: feedback.responses,
            rating: feedback.rating,
            comments: feedback.comments,
        });

    if (error) {
        console.error('Error submitting interview feedback:', error);
        return false;
    }
    return true;
}

// ─── Application Status ────────────────────────────────────────

export async function updateApplicationStatus(applicationId: string, status: string): Promise<boolean> {
    const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', applicationId);

    if (error) {
        console.error('Error updating application status:', error);
        return false;
    }
    return true;
}

// ─── Interview Details (per-stage meet link, datetime, etc.) ───

export interface StageInterviewDetails {
    meetLink?: string;
    dateTime?: string;
    interviewerName?: string;
    mailSent?: boolean;
    mailPending?: boolean;
}

export async function getInterviewDetails(applicationId: string): Promise<Record<string, StageInterviewDetails>> {
    const { data, error } = await supabase
        .from('job_applications')
        .select('interview_details')
        .eq('id', applicationId)
        .single();

    if (error) {
        console.error('Error fetching interview details:', error);
        return {};
    }
    return data?.interview_details || {};
}

export async function saveInterviewDetails(applicationId: string, details: Record<string, StageInterviewDetails>): Promise<boolean> {
    const { error } = await supabase
        .from('job_applications')
        .update({ interview_details: details })
        .eq('id', applicationId);

    if (error) {
        console.error('Error saving interview details:', error);
        return false;
    }
    return true;
}
