import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const handler: Handler = async (event) => {
  try {
    const formData = JSON.parse(event.body || '{}');

    const slackWebhook = process.env.SLACK_WEBHOOK_URL;

    const slackPayload = {
      text: `📨 *New Contact Form Submission*\n\n*Name:* ${formData.firstName} ${formData.lastName}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`
    };

    const response = await fetch(slackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackPayload)
    });

    if (!response.ok) {
      throw new Error(`Slack webhook failed with status ${response.status}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error: any) {
    console.error('Notification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

export { handler };