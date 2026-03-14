export interface LinkedInProfile {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
}

export class LinkedInAuth {
    private static clientId = process.env.LINKEDIN_CLIENT_ID;
    private static clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
    private static redirectUri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;

    static getAuthorizationUrl(state: string) {
        const scopes = ['openid', 'profile', 'email'];
        const params = new URLSearchParams({
            response_type: 'code',
            client_id: this.clientId || '',
            redirect_uri: this.redirectUri || '',
            state: state,
            scope: scopes.join(' '),
        });

        return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
    }

    static async getAccessToken(code: string) {
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: this.clientId || '',
            client_secret: this.clientSecret || '',
            redirect_uri: this.redirectUri || '',
        });

        const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error_description || 'Failed to get access token');
        }

        return await response.json();
    }

    static async getProfile(accessToken: string): Promise<LinkedInProfile> {
        const response = await fetch('https://api.linkedin.com/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch LinkedIn profile');
        }

        return await response.json();
    }
}
