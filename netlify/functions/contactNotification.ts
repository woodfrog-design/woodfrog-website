// import { Handler } from '@netlify/functions';
// import fetch from 'node-fetch';

// const handler: Handler = async (event) => {
//   try {
//     const formData = JSON.parse(event.body || '{}');

//     const slackWebhook = process.env.SLACK_WEBHOOK_URL;

//     const slackPayload = {
//       text: `📨 *New Contact Form Submission*\n\n*Name:* ${formData.firstName} ${formData.lastName}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Message:* ${formData.message}`
//     };

//     const response = await fetch(slackWebhook, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(slackPayload)
//     });

//     if (!response.ok) {
//       throw new Error(`Slack webhook failed with status ${response.status}`);
//     }

//     return {
//       statusCode: 200,
//       body: JSON.stringify({ success: true })
//     };
//   } catch (error: unknown) {
//     console.error('Notification error:', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error) })
//     };
//   }
// };

// export { handler };

// import { Handler } from '@netlify/functions';
// import fetch from 'node-fetch';

// const handler: Handler = async (event) => {
//   try {
//     // The event body from the frontend form submission
//     const formData = JSON.parse(event.body || '{}');

//     // Your Slack webhook URL from Netlify's environment variables
//     const slackWebhook = process.env.SLACK_WEBHOOK_URL;

//     if (!slackWebhook) {
//       throw new Error('Slack webhook URL is not configured in environment variables.');
//     }

//     // --- UPDATED: Added the 'Service' field to the message ---
//     const slackPayload = {
//       text: `📨 *New Contact Form Submission*\\n\\n*Name:* ${formData.firstName} ${formData.lastName}\\n*Email:* ${formData.email}\\n*Phone:* ${formData.phone || 'Not provided'}\\n*Organization:* ${formData.organization || 'Not provided'}\\n*Service:* ${formData.service || 'Not selected'}\\n*Message:* ${formData.message}`,
//     };

//     // Sending the data to your Slack channel
//     const response = await fetch(slackWebhook, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(slackPayload),
//     });

//     if (!response.ok) {
//       throw new Error(`Slack webhook failed with status ${response.status}`);
//     }

//     // Return a success response to the frontend
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ success: true }),
//     };
//   } catch (error: unknown) {
//     console.error('Notification error:', error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error) }),
//     };
//   }
// };

// export { handler };

import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';

const handler: Handler = async (event) => {
  try {
    // The event body from the frontend form submission
    const formData = JSON.parse(event.body || '{}');

    // Your Slack webhook URL from Netlify's environment variables
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;

    if (!slackWebhook) {
      throw new Error('Slack webhook URL is not configured in environment variables.');
    }

    // This is the final version that includes all fields
    const slackPayload = {
      text: `📨 *New Contact Form Submission*\\n\\n*Name:* ${formData.firstName} ${formData.lastName}\\n*Email:* ${formData.email}\\n*Phone:* ${formData.phone || 'Not provided'}\\n*Organization:* ${formData.organization || 'Not provided'}\\n*Service:* ${formData.service || 'Not selected'}\\n*Message:* ${formData.message}`,
    };

    // Sending the data to your Slack channel
    const response = await fetch(slackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      throw new Error(`Slack webhook failed with status ${response.status}`);
    }

    // Return a success response to the frontend
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error: unknown) {
    console.error('Notification error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: typeof error === 'object' && error !== null && 'message' in error ? (error as any).message : String(error) }),
    };
  }
};

export { handler };