import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { to, subject, body: emailBody } = body;

        if (!to || !subject || !emailBody) {
            return NextResponse.json({ error: 'Missing fields: to, subject, body' }, { status: 400 });
        }

        const missingVars = [];
        if (!process.env.SMTP_HOST) missingVars.push('SMTP_HOST');
        if (!process.env.SMTP_USER) missingVars.push('SMTP_USER');
        if (!process.env.SMTP_PASS) missingVars.push('SMTP_PASS');

        if (missingVars.length > 0) {
            console.error('Missing SMTP environment variables:', missingVars.join(', '));
            return NextResponse.json({ error: `Server config error: Missing [${missingVars.join(', ')}]` }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: Number(process.env.SMTP_PORT) === 465,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.verify();

        await transporter.sendMail({
            from: `"Woodfrog Careers" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html: emailBody,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Candidate email error:', error);
        return NextResponse.json(
            { error: 'Failed to send email.' },
            { status: 500 }
        );
    }
}
