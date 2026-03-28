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
 * Get SMTP configuration.
 * Priority: Supabase admin_settings → Environment variables
 */
export async function getSmtpConfig(): Promise<SmtpConfig> {
    try {
        const { data, error } = await supabase
            .from('admin_settings')
            .select('value')
            .eq('key', 'smtp_config')
            .maybeSingle();

        if (!error && data?.value) {
            const config = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;

            // Validate required fields are present and non-empty
            if (config.host && config.user && config.pass) {
                console.log('Using SMTP config from database');
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
        console.warn('Could not fetch SMTP config from DB, falling back to env vars:', err);
    }

    // Fallback to environment variables
    console.log('Using SMTP config from environment variables');
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
 */
export async function saveSmtpConfig(config: Partial<SmtpConfig>): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('admin_settings')
            .upsert(
                {
                    key: 'smtp_config',
                    value: config,
                    updated_at: new Date().toISOString(),
                },
                { onConflict: 'key' }
            );

        if (error) {
            console.error('Error saving SMTP config:', error);
            return false;
        }
        return true;
    } catch (err) {
        console.error('Error saving SMTP config:', err);
        return false;
    }
}
