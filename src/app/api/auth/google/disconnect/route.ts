import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE() {
    try {
        const { error } = await supabase
            .from('admin_settings')
            .delete()
            .eq('key', 'google_calendar_tokens');

        if (error) throw error;

        return NextResponse.json({ success: true, message: 'Google Calendar disconnected successfully.' });
    } catch (error: any) {
        console.error('Google disconnect error:', error);
        return NextResponse.json(
            { error: 'Failed to disconnect Google Calendar', details: error?.message },
            { status: 500 }
        );
    }
}
