import { supabase } from './supabase';

export interface SmtpConfig {
    host: string;
    port: number;
    user: string;
    pass: string;
    secure: boolean;
    senderName?: string;
}

/**
 * Get SMTP configuration for a given purpose.
 * @param purpose - 'careers' for interview/candidate emails, 'contact' for inbound contact form emails
 * Priority: Supabase admin_settings → Environment variables
 */
export async function getSmtpConfig(purpose: 'careers' | 'contact' = 'careers'): Promise<SmtpConfig> {
    const dbKey = purpose === 'contact' ? 'smtp_contact_config' : 'smtp_config';

    try {
        const { data, error } = await supabase
            .from('admin_settings')
            .select('value')
            .eq('key', dbKey)
            .maybeSingle();

        if (!error && data?.value) {
            const config = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;

            // Validate required fields are present and non-empty
            if (config.host && config.user && config.pass) {
                console.log(`Using ${purpose} SMTP config from database (key: ${dbKey})`);
                return {
                    host: config.host,
                    port: Number(config.port) || 587,
                    user: config.user,
                    pass: config.pass,
                    secure: config.secure ?? (Number(config.port) === 465),
                    senderName: config.senderName || 'Woodfrog',
                };
            }
        }
    } catch (err) {
        console.warn(`Could not fetch ${purpose} SMTP config from DB, falling back to env vars:`, err);
    }

    // Fallback to environment variables
    console.log(`Using ${purpose} SMTP config from environment variables`);
    return {
        host: process.env.SMTP_HOST || '',
        port: Number(process.env.SMTP_PORT) || 587,
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
        secure: Number(process.env.SMTP_PORT) === 465,
        senderName: 'Woodfrog',
    };
}

/**
 * Save SMTP configuration to Supabase.
 * @param config - The SMTP settings to save
 * @param purpose - 'careers' for interview/candidate emails, 'contact' for inbound contact form emails
 */
export async function saveSmtpConfig(config: Partial<SmtpConfig>, purpose: 'careers' | 'contact' = 'careers'): Promise<boolean> {
    const dbKey = purpose === 'contact' ? 'smtp_contact_config' : 'smtp_config';

    try {
        const { error } = await supabase
            .from('admin_settings')
            .upsert(
                {
                    key: dbKey,
                    value: config,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: 'key' }
            );

        if (error) {
            console.error(`Error saving ${purpose} SMTP config:`, error);
            return false;
        }
        return true;
    } catch (err) {
        console.error(`Error saving ${purpose} SMTP config:`, err);
        return false;
    }
}
