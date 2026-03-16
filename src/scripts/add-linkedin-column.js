const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const path = require('path');

config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addLinkedinColumn() {
    console.log('Checking if linkedin_profile_url column exists...');

    const { error } = await supabase
        .from('job_applications')
        .select('linkedin_profile_url')
        .limit(1);

    if (error && error.message.includes('column "linkedin_profile_url" does not exist')) {
        console.log('\n⚠️  Column "linkedin_profile_url" is MISSING.\n');
        console.log('Please run this SQL in the Supabase SQL Editor:\n');
        console.log('  ALTER TABLE job_applications ADD COLUMN linkedin_profile_url TEXT DEFAULT \'\';');
        console.log('\nAfter running the above, re-run this script to confirm.');
    } else if (error) {
        console.error('Error checking schema:', error);
    } else {
        console.log('✅ Column "linkedin_profile_url" already exists. No action needed.');
    }
}

addLinkedinColumn();
