const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const path = require('path');

config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listData() {
    console.log('--- BLOGS ---');
    const { data: blogs, error: blogError } = await supabase
        .from('blogs')
        .select('id, title, slug, categories, is_featured')
        .order('date', { ascending: false });

    if (blogError) {
        console.error('Error fetching blogs:', blogError);
    } else {
        console.log(JSON.stringify(blogs, null, 2));
    }

    console.log('\n--- JOBS ---');
    const { data: jobs, error: jobError } = await supabase
        .from('jobs')
        .select('id, title, slug, is_active')
        .order('created_at', { ascending: false });

    if (jobError) {
        console.error('Error fetching jobs:', jobError);
    } else {
        console.log(JSON.stringify(jobs, null, 2));
    }
}

listData();
