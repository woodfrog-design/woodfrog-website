const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const path = require('path');

config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkWorkModeColumn() {
    console.log('Checking if work_mode column exists in jobs table...');

    const { error } = await supabase
        .from('jobs')
        .select('work_mode, description_sections')
        .limit(1);

    if (error && (error.message.includes('column "work_mode" does not exist') || error.message.includes('column "description_sections" does not exist'))) {
        console.log('\n⚠️  Database columns are MISSING.\n');
        console.log('Please run this SQL in the Supabase SQL Editor:\n');
        console.log('  ALTER TABLE jobs ADD COLUMN work_mode TEXT DEFAULT \'Remote\';');
        console.log('  ALTER TABLE jobs ADD COLUMN description_sections JSONB DEFAULT \'[]\'::jsonb;');
        console.log('\nAfter running the above, your changes will be fully functional.');
    } else if (error) {
        console.error('Error checking schema:', error);
    } else {
        console.log('✅ Column "work_mode" already exists. No action needed.');
    }
}

checkWorkModeColumn();
