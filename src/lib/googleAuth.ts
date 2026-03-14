import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '332480491234-ee5qatrs8hiihg1lpkrk956prsh572re.apps.googleusercontent.com',
    process.env.GOOGLE_CLIENT_SECRET || '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',
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/google/callback'
);

export default oauth2Client;

export const GOOGLE_SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
];
