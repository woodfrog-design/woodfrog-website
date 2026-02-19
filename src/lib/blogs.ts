'use server';

import { supabase } from './supabase';

export interface Author {
    name: string;
    avatar: string;
}

export interface BlogContent {
    type: 'paragraph' | 'heading' | 'image' | 'code' | 'list' | 'image-text' | 'text-image' | 'table' | 'heading-paragraph' | 'paragraph-heading';
    content?: string;
    text?: string;
    level?: number;
    src?: string;
    alt?: string;
    items?: string[];
    language?: string;
    rows?: string[][];
}

export interface Blog {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    date: string;
    author: Author;
    categories: string[];
    isFeatured: boolean;
    content: BlogContent[];
    subtitle?: string;
    caseStudy?: string;
    viewCount: number;
}

// Map Supabase database row to local Blog interface
const mapBlogFromDb = (row: any): Blog => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    coverImage: row.cover_image,
    date: row.date,
    author: {
        name: row.author_name,
        avatar: row.author_avatar
    },
    categories: row.categories || [],
    isFeatured: row.is_featured,
    content: row.content as BlogContent[],
    subtitle: row.subtitle,
    caseStudy: row.case_study,
    viewCount: row.view_count || 0
});

export async function getBlogs(): Promise<Blog[]> {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }

    return data.map(mapBlogFromDb);
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') { // Not found error code for single()
            console.error('Error fetching blog by slug:', error);
        }
        return undefined;
    }

    return mapBlogFromDb(data);
}

export async function getFeaturedBlogs(): Promise<Blog[]> {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_featured', true)
        .order('date', { ascending: false });

    if (error) {
        console.error('Error fetching featured blogs:', error);
        return [];
    }

    return data.map(mapBlogFromDb);
}

export async function getRecentBlogs(limit: number = 3): Promise<Blog[]> {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('date', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Error fetching recent blogs:', error);
        return [];
    }

    return data.map(mapBlogFromDb);
}

export async function incrementBlogViewCount(id: string): Promise<void> {
    // Note: In production, use a dedicated RPC for atomic increment
    const { data: current } = await supabase.from('blogs').select('view_count').eq('id', id).single();
    if (current) {
        await supabase.from('blogs').update({ view_count: (current.view_count || 0) + 1 }).eq('id', id);
    }
}
