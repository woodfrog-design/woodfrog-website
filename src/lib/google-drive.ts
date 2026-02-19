import { google } from 'googleapis';
import { Readable } from 'stream';

const SCOPES = ['https://www.googleapis.com/auth/drive'];

async function getDriveService() {
    console.log('Initializing Google Drive Service...');
    try {
        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        let privateKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY;

        if (!clientEmail || !privateKey) {
            throw new Error('Google Drive credentials missing in environment variables');
        }

        // Handle potential double quotes if shell/env didn't strip them
        if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
            privateKey = privateKey.substring(1, privateKey.length - 1);
        }

        // Unescape literal \n if present
        privateKey = privateKey.replace(/\\n/g, '\n');

        console.log('Service Account Email:', clientEmail);
        console.log('Private Key length:', privateKey.length);
        console.log('Private Key starts with:', privateKey.substring(0, 30));

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: SCOPES,
        });

        const drive = google.drive({ version: 'v3', auth });
        console.log('Google Drive Service initialized');
        return drive;
    } catch (error) {
        console.error('Failed to initialize Google Drive service:', error);
        throw error;
    }
}

export async function uploadFileToDrive(file: File | Blob, fileName: string) {
    try {
        const drive = await getDriveService();
        console.log('Drive service obtained');

        // Convert File/Blob to Buffer then to Stream
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const stream = Readable.from(buffer);
        console.log('File converted to stream');

        const fileMetadata = {
            name: fileName,
            parents: [process.env.GOOGLE_DRIVE_FOLDER_ID!],
        };

        const media = {
            mimeType: 'application/pdf',
            body: stream,
        };

        const response = await drive.files.create({
            requestBody: fileMetadata,
            media: media,
            fields: 'id, webViewLink, webContentLink',
            supportsAllDrives: true,
        } as any);

        // Set permissions to anyone with the link can view
        await drive.permissions.create({
            fileId: response.data.id!,
            requestBody: {
                role: 'reader',
                type: 'anyone',
            },
            supportsAllDrives: true,
        } as any);

        return {
            fileId: response.data.id,
            webViewLink: response.data.webViewLink,
            webContentLink: response.data.webContentLink,
        };
    } catch (error) {
        console.error('Error uploading to Google Drive:', error);
        throw error;
    }
}
