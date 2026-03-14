import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import oauth2Client from '@/lib/googleAuth';
import { supabase } from '@/lib/supabase';

export async function HEAD() {
    try {
        const { data, error } = await supabase.from('admin_settings').select('key').eq('key', 'google_calendar_tokens').single();
        if (error || !data) return new NextResponse(null, { status: 401 });
        return new NextResponse(null, { status: 200 });
    } catch {
        return new NextResponse(null, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { summary, dateTime, duration } = await req.json();

        // 1. Fetch tokens from DB
        const { data: settings, error: dbError } = await supabase
            .from('admin_settings')
            .select('value')
            .eq('key', 'google_calendar_tokens')
            .single();

        if (dbError || !settings?.value) {
            return NextResponse.json(
                { error: 'Google Calendar not connected. Please connect your account in admin settings.' },
                { status: 401 }
            );
        }

        const tokens = settings.value;
        oauth2Client.setCredentials(tokens);

        // Handle token refresh if needed
        oauth2Client.on('tokens', async (newTokens) => {
            await supabase
                .from('admin_settings')
                .update({ value: { ...tokens, ...newTokens } })
                .eq('key', 'google_calendar_tokens');
        });

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        // Calculate start and end times
        const startTime = dateTime
            ? new Date(dateTime).toISOString()
            : new Date().toISOString();

        const durationMins = parseInt(duration) || 60;
        const endTime = new Date(
            new Date(startTime).getTime() + durationMins * 60 * 1000
        ).toISOString();

        const event = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: {
                summary: summary || 'Interview - Woodfrog',
                start: { dateTime: startTime, timeZone: 'Asia/Kolkata' },
                end: { dateTime: endTime, timeZone: 'Asia/Kolkata' },
                conferenceData: {
                    createRequest: {
                        requestId: `wf-${Date.now()}`,
                        conferenceSolutionKey: { type: 'hangoutsMeet' },
                    },
                },
            },
            conferenceDataVersion: 1,
        });

        const meetLink = event.data.hangoutLink || '';

        return NextResponse.json({
            meetLink,
            eventId: event.data.id,
            htmlLink: event.data.htmlLink,
        });
    } catch (error: any) {
        console.error('Google Meet creation error:', error?.message || error);
        return NextResponse.json(
            { error: 'Failed to create Google Meet link', details: error?.message },
            { status: 500 }
        );
    }
}
