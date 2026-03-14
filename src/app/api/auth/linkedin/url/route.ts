import { NextResponse } from 'next/server';
import { LinkedInAuth } from '@/lib/linkedinAuth';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
        return NextResponse.json({ error: 'Missing job slug' }, { status: 400 });
    }

    // Pass the slug in the state so we know where to redirect back
    const authUrl = LinkedInAuth.getAuthorizationUrl(slug);
    
    return NextResponse.json({ url: authUrl });
}
