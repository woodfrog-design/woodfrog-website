import { config } from 'dotenv';
import path from 'path';

// Load .env.local
config({ path: path.resolve(process.cwd(), '.env.local') });

import { getBlogs } from '../lib/blogs';
import { getJobs } from '../lib/jobs';

async function listData() {
    console.log('--- BLOGS ---');
    try {
        const blogs = await getBlogs();
        console.log(JSON.stringify(blogs.map(b => ({
            id: b.id,
            title: b.title,
            slug: b.slug,
            categories: b.categories,
            isFeatured: b.isFeatured
        })), null, 2));
    } catch (e) {
        console.error('Error fetching blogs:', e);
    }

    console.log('\n--- JOBS ---');
    try {
        const jobs = await getJobs();
        console.log(JSON.stringify(jobs.map(j => ({
            id: j.id,
            title: j.title,
            slug: j.slug,
            isActive: j.isActive
        })), null, 2));
    } catch (e) {
        console.error('Error fetching jobs:', e);
    }
}

listData().catch(console.error);
