// Script to add linkedin_id column to job_applications table
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function addLinkedinIdColumn() {
    console.log('Adding linkedin_id column to job_applications...');
    
    const { error } = await supabase.rpc('exec_sql', {
        sql: `ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS linkedin_id TEXT;`
    });

    if (error) {
        console.log('RPC exec_sql not available, trying direct SQL via REST...');
        // Try using the SQL editor approach - use fetch directly
        const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`;
        console.log('Attempting URL:', url);
        console.log('Error details:', error.message);
        console.log('');
        console.log('Please run this SQL manually in your Supabase SQL Editor:');
        console.log('');
        console.log('  ALTER TABLE job_applications ADD COLUMN IF NOT EXISTS linkedin_id TEXT;');
        console.log('');
    } else {
        console.log('Successfully added linkedin_id column!');
    }
}

addLinkedinIdColumn();
