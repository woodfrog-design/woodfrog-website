export interface LinkedInProfile {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    linkedinProfileUrl: string;
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

        return `${process.env.LINKEDIN_AUTH_URL}?${params.toString()}`;
    }

    static async getAccessToken(code: string) {
        const params = new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            client_id: this.clientId || '',
            client_secret: this.clientSecret || '',
            redirect_uri: this.redirectUri || '',
        });

        const response = await fetch(process.env.LINKEDIN_TOKEN_URL || 'https://www.linkedin.com/oauth/v2/accessToken', {
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
        const response = await fetch(process.env.LINKEDIN_USERINFO_URL || 'https://api.linkedin.com/v2/userinfo', {
            headers: { 'Authorization': `Bearer ${accessToken}` },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch LinkedIn profile');
        }

        const profile = await response.json();

        // LinkedIn OIDC Standard Tier does not expose vanity name or profile URL.
        // The `sub` is a pairwise opaque ID and cannot be used to find the profile.
        // Best we can do: construct a LinkedIn people search URL from the user's full name.
        const nameQuery = encodeURIComponent(profile.name || '');
        const linkedinProfileUrl = nameQuery
            ? `https://www.linkedin.com/search/results/people/?keywords=${nameQuery}`
            : '';

        return { ...profile, linkedinProfileUrl };
    }
}
