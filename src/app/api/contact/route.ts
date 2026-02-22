import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { lastName, firstName, email, phone, organization, lookingFor, message, specifyService } = body;

    // Validate required fields
    if (!lastName || !firstName || !lookingFor) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    if (lookingFor.includes('None of the above / Other') && !specifyService) {
      return NextResponse.json(
        { error: 'Please mention the service.' },
        { status: 400 }
      );
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

    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'hello@woodfrog.tech';

    console.log('Attempting to send contact form email...', {
      to: recipientEmail,
      from: firstName + ' ' + lastName,
      email: email,
      lookingFor: lookingFor
    });

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #1a1a1a; border-bottom: 2px solid #E8501A; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; width: 140px; vertical-align: top;">Name</td>
            <td style="padding: 10px; color: #1a1a1a;">${firstName} ${lastName}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Email</td>
            <td style="padding: 10px; color: #1a1a1a;">${email || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Phone</td>
            <td style="padding: 10px; color: #1a1a1a;">${phone || 'Not provided'}</td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Organization</td>
            <td style="padding: 10px; color: #1a1a1a;">${organization || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Looking for</td>
            <td style="padding: 10px; color: #1a1a1a;">
              ${lookingFor}
              ${specifyService ? `<br/><span style="color: #666; font-size: 0.9em;">Specified: ${specifyService}</span>` : ''}
            </td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
            <td style="padding: 10px; color: #1a1a1a; white-space: pre-wrap;">${message || 'No message'}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">
          This email was sent from the Woodfrog website contact form.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Woodfrog Contact Form" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `New Contact: ${firstName} ${lastName} — ${lookingFor}`,
      html: htmlBody,
      replyTo: email || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
