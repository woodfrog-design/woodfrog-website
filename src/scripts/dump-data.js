const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');

config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listData() {
    const { data: blogs } = await supabase
        .from('blogs')
        .select('id, title, slug, categories, is_featured, content')
        .order('date', { ascending: false });

    const { data: jobs } = await supabase
        .from('jobs')
        .select('id, title, slug, is_active')
        .order('created_at', { ascending: false });

    const output = {
        blogs: blogs || [],
        jobs: jobs || []
    };

    fs.writeFileSync(path.resolve(process.cwd(), 'src/scripts/data-dump.json'), JSON.stringify(output, null, 2));
    console.log('Data dumped to src/scripts/data-dump.json');
}

listData();
