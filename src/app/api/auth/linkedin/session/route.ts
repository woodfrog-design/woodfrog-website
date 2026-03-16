import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get('linkedin_session');

    if (!session?.value) {
        return NextResponse.json({ authenticated: false });
    }

    try {
        const decoded = JSON.parse(Buffer.from(session.value, 'base64').toString('utf-8'));
        return NextResponse.json({
            authenticated: true,
            name: decoded.name,
            email: decoded.email,
            linkedinProfileUrl: decoded.linkedinProfileUrl || '',
            picture: decoded.picture || '',
        });
    } catch {
        return NextResponse.json({ authenticated: false });
    }
}

export async function DELETE() {
    const cookieStore = await cookies();
    cookieStore.delete('linkedin_session');
    return NextResponse.json({ success: true });
}
