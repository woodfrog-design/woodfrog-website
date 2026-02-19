import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getBlogs } from '@/lib/blogs';

export async function POST(request: Request) {
    try {
        const blog = await request.json();

        // Map local Blog object to Supabase column names
        const dbBlog = {
            id: blog.id,
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            cover_image: blog.coverImage,
            date: blog.date || new Date().toISOString(),
            author_name: blog.author.name,
            author_avatar: blog.author.avatar,
            categories: blog.categories,
            is_featured: blog.isFeatured,
            content: blog.content,
            subtitle: blog.subtitle,
            case_study: blog.caseStudy
        };

        const { data, error } = await supabase
            .from('blogs')
            .upsert(dbBlog, { onConflict: 'id' });

        if (error) {
            console.error('Supabase upsert error:', error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('Error saving blog to Supabase:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        const blogs = await getBlogs();
        return NextResponse.json(blogs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
