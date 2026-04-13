import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getSmtpConfig } from '@/lib/smtp';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { to, subject, body: emailBody, attachmentUrl, attachmentName } = body;

        if (!to || !subject || !emailBody) {
            return NextResponse.json({ error: 'Missing fields: to, subject, body' }, { status: 400 });
        }

        const smtpConfig = await getSmtpConfig();

        if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.pass) {
            console.error('SMTP not configured');
            return NextResponse.json({ error: 'SMTP is not configured. Please set up SMTP in Admin Settings.' }, { status: 500 });
        }

        const transporter = nodemailer.createTransport({
            host: smtpConfig.host,
            port: smtpConfig.port,
            secure: smtpConfig.secure,
            auth: {
                user: smtpConfig.user,
                pass: smtpConfig.pass,
            },
        });

        await transporter.verify();

        // Build mail options
        const mailOptions: any = {
            from: `"${smtpConfig.senderName || 'Woodfrog'} Careers" <${smtpConfig.user}>`,
            to,
            subject,
            html: emailBody,
        };

        // Attach resume if URL provided
        if (attachmentUrl) {
            mailOptions.attachments = [{
                filename: attachmentName || 'Resume.pdf',
                path: attachmentUrl,
            }];
        }

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Candidate email error:', error);
        return NextResponse.json(
            { error: 'Failed to send email.' },
            { status: 500 }
        );
    }
}
