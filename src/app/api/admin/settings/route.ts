import { NextRequest, NextResponse } from 'next/server';
import { getSmtpConfig, saveSmtpConfig } from '@/lib/smtp';
import nodemailer from 'nodemailer';

export async function GET() {
    try {
        const config = await getSmtpConfig();
        // Return config but mask the password
        return NextResponse.json({
            host: config.host,
            port: config.port,
            user: config.user,
            pass: config.pass ? '••••••••' : '',
            senderName: config.senderName || 'Woodfrog',
            hasPassword: !!config.pass,
        });
    } catch (error: any) {
        console.error('Error fetching SMTP settings:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { host, port, user, pass, senderName, testConnection } = body;

        if (testConnection) {
            // Test the SMTP connection without saving
            try {
                const transporter = nodemailer.createTransport({
                    host,
                    port: Number(port) || 587,
                    secure: Number(port) === 465,
                    auth: { user, pass },
                });

                await transporter.verify();
                return NextResponse.json({ success: true, message: 'SMTP connection successful!' });
            } catch (err: any) {
                return NextResponse.json(
                    { success: false, message: `Connection failed: ${err.message}` },
                    { status: 400 }
                );
            }
        }

        // Save SMTP config
        if (!host || !user || !pass) {
            return NextResponse.json(
                { error: 'Host, user, and password are required.' },
                { status: 400 }
            );
        }

        const success = await saveSmtpConfig({
            host,
            port: Number(port) || 587,
            user,
            pass,
            senderName: senderName || 'Woodfrog',
        });

        if (success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
        }
    } catch (error: any) {
        console.error('Error saving SMTP settings:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
