import { NextResponse } from 'next/server';
import { LinkedInAuth } from '@/lib/linkedinAuth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state'); // This is our job slug
    const error = searchParams.get('error');

    if (error) {
        console.error('LinkedIn Auth Error:', error);
        return NextResponse.redirect(new URL(`/careers/${state}?error=linkedin_denied`, request.url));
    }

    if (!code || !state) {
        return NextResponse.redirect(new URL('/careers', request.url));
    }

    try {
        const tokenData = await LinkedInAuth.getAccessToken(code);
        const profile = await LinkedInAuth.getProfile(tokenData.access_token);

        // Encode profile data to pass back to the job page
        // In a real app, you might use a session or temp database record
        // For simplicity here, we use base64 encoded params
        const profileData = Buffer.from(JSON.stringify({
            name: profile.name,
            email: profile.email,
            id: profile.sub
        })).toString('base64');

        const redirectUrl = new URL(`/careers/${state}`, request.url);
        redirectUrl.searchParams.set('linkedin_data', profileData);

        return NextResponse.redirect(redirectUrl);
    } catch (err: any) {
        console.error('LinkedIn Callback Error:', err);
        return NextResponse.redirect(new URL(`/careers/${state}?error=linkedin_failed`, request.url));
    }
}
