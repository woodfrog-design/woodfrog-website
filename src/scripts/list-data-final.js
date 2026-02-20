const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const path = require('path');

config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listData() {
    const { data: blogs } = await supabase
        .from('blogs')
        .select('id, title, slug, categories, is_featured')
        .order('date', { ascending: false });

    console.log('JSON_START_BLOGS');
    console.log(JSON.stringify(blogs));
    console.log('JSON_END_BLOGS');

    const { data: jobs } = await supabase
        .from('jobs')
        .select('id, title, slug, is_active')
        .order('created_at', { ascending: false });

    console.log('JSON_START_JOBS');
    console.log(JSON.stringify(jobs));
    console.log('JSON_END_JOBS');
}

listData();
