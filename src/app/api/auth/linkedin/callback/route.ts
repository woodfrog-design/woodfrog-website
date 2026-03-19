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

        const sessionPayload = {
            name: profile.name,
            email: profile.email,
            id: profile.sub,
            linkedinProfileUrl: profile.linkedinProfileUrl,
            picture: profile.picture || '',
        };

        // Encode profile data to pass back to the job page via URL
        const profileData = Buffer.from(JSON.stringify(sessionPayload)).toString('base64');

        const redirectUrl = new URL(`/careers/${state}`, request.url);

        const response = NextResponse.redirect(redirectUrl);

        // Set a persistent HTTP-only cookie so user stays logged in for 30 days
        response.cookies.set('linkedin_session', profileData, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: '/',
        });

        return response;
    } catch (err: any) {
        console.error('LinkedIn Callback Error:', err);
        return NextResponse.redirect(new URL(`/careers/${state}?error=linkedin_failed`, request.url));
    }
}
