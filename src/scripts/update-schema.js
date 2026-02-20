const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const path = require('path');

config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for schema changes if possible, else just try with anon if RLS allows or if it's just a query

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function updateSchema() {
    console.log('Updating blogs schema...');

    // We can't easily add columns via JS client without a custom RPC or using the SQL editor.
    // However, we can try to perform a migration by fetching data, deleting, and recreating or just upserting with new fields.
    // Alternatively, if we have the service role key, we can try to use it.

    // Let's check if the column exists by trying to select it.
    const { error } = await supabase
        .from('blogs')
        .select('is_active')
        .limit(1);

    if (error && error.message.includes('column "is_active" does not exist')) {
        console.log('Column "is_active" missing. You need to add it via Supabase SQL Editor:');
        console.log('ALTER TABLE blogs ADD COLUMN is_active BOOLEAN DEFAULT true;');
    } else if (error) {
        console.error('Error checking schema:', error);
    } else {
        console.log('Column "is_active" already exists.');
    }
}

updateSchema();
