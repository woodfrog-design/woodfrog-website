import { NextRequest, NextResponse } from 'next/server';
import oauth2Client from '@/lib/googleAuth';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code');
    if (!code) {
        return NextResponse.json({ error: 'Missing code' }, { status: 400 });
    }

    try {
        const { tokens } = await oauth2Client.getToken(code);
        
        // Save tokens to Supabase admin_settings table
        const { error } = await supabase
            .from('admin_settings')
            .upsert({ 
                key: 'google_calendar_tokens', 
                value: tokens 
            });

        if (error) throw error;

        // Redirect back to admin dashboard
        return new NextResponse(`
            <html>
                <body>
                    <p>Authentication successful! You can close this window now.</p>
                    <script>
                        setTimeout(() => window.close(), 2000);
                    </script>
                </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html' } });
    } catch (error: any) {
        console.error('OAuth Callback Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
