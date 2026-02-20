'use server';

export interface ProductContent {
    type: 'paragraph' | 'heading' | 'list' | 'image' | 'image-text-left' | 'image-text-right' | 'image-labeling' | 'table' | 'charts' | 'text';
    title?: string;
    content?: string;
    items?: string[];
    src?: string;
    alt?: string;
    labels?: { x: number; y: number; text: string; color?: string }[];
    tableData?: { headers: string[]; rows: string[][] };
    chartData?: { type: 'area' | 'bar' | 'pie' | 'line'; data: any[] };
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    tagline: string;
    coverImage: string;
    date: string;
    categories: string[];
    isFeatured: boolean;
    blocks: ProductContent[];
    capabilities: string[];
}

const PRODUCTS_DATA: Product[] = [
    {
        id: 'glimvia',
        title: 'Glimvia',
        slug: 'glimvia',
        tagline: 'Mobile-First KPI Alerting Built on Superset',
        coverImage: '/images/products/glimvia.png',
        date: '2024-02-17',
        categories: ['Analytics', 'Real-time Alerts'],
        isFeatured: true,
        capabilities: [
            'Connects directly with Superset dashboards',
            'Supports KPI-based rule creation',
            'Enables threshold-driven alerting',
            'Real-time mobile push notifications',
            'Alert history for tracking and audit'
        ],
        blocks: [
            {
                type: 'heading',
                title: 'Overview',
            },
            {
                type: 'paragraph',
                content: 'Glimvia is a mobile-first analytics alerting platform built on top of Superset. It transforms passive dashboards into proactive intelligence by allowing users to define KPI-based thresholds and receive real-time mobile notifications. Instead of manually checking dashboards, decision-makers get alerted the moment something important changes.'
            },
            {
                type: 'heading',
                title: 'What Problem It Solves',
            },
            {
                type: 'paragraph',
                content: 'Most organizations build dashboards but rarely monitor them continuously. As a result, critical deviations go unnoticed. Glimvia ensures leaders stay informed by converting key metrics into automated alerts.'
            }
        ]
    },
    {
        id: 'antvia',
        title: 'Antvia',
        slug: 'antvia',
        tagline: 'Unified Data & AI Platform',
        coverImage: '/images/products/antvia.png',
        date: '2024-02-17',
        categories: ['Data Platform', 'AI Ready'],
        isFeatured: true,
        capabilities: [
            'Multi-source connectors',
            'Centralized storage',
            'Structured transformation pipelines',
            'Dashboard integration',
            'AI/ML-ready outputs'
        ],
        blocks: [
            {
                type: 'heading',
                title: 'Overview',
            },
            {
                type: 'paragraph',
                content: 'Antvia is WoodFrog’s unified data platform designed to centralize, clean, and prepare data for analytics and AI. It allows organizations to connect multiple data sources into one system, apply structured Bronze–Silver–Gold transformation layers, and expose a clean, reliable single source of truth for dashboards, AI agents, and machine learning frameworks.'
            },
            {
                type: 'heading',
                title: 'Architecture & Approach',
            },
            {
                type: 'paragraph',
                content: 'Antvia follows a modern layered data architecture. Raw data is ingested and stored in the Bronze layer, refined and structured in the Silver layer, and business-ready datasets are prepared in the Gold layer. These curated datasets are then made available for dashboards and AI/ML frameworks such as MLflow, ensuring consistency across reporting and intelligent systems.'
            }
        ]
    },
    {
        id: 'letmeknow',
        title: 'LetMeKnow',
        slug: 'letmeknow',
        tagline: 'Intelligent Monitoring Platform',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
        date: '2024-02-17',
        categories: ['Monitoring', 'Notifications'],
        isFeatured: false,
        capabilities: [
            'Rule-based monitoring across multiple domains',
            'Real-time trigger detection',
            'Personalized watchlists',
            'Mobile notifications'
        ],
        blocks: [
            {
                type: 'heading',
                title: 'Overview',
            },
            {
                type: 'paragraph',
                content: 'LetMeKnow is a lightweight intelligent monitoring platform that allows users to define custom rules for events, metrics, and signals they care about. Instead of constantly checking websites or dashboards, users receive instant notifications when predefined conditions are met.'
            },
            {
                type: 'heading',
                title: 'Use Cases',
            },
            {
                type: 'list',
                items: [
                    'Notify me if a stock falls below a certain value',
                    'Alert me if a cricket asking rate exceeds a threshold',
                    'Inform me when a specific YouTube trailer is released',
                    'Notify me when a price drops'
                ]
            }
        ]
    },
    {
        id: 'pre-deployment-ai-assurance',
        title: 'Pre-Deployment AI Assurance',
        slug: 'pre-deployment-ai-assurance',
        tagline: 'Evaluate & Benchmark AI',
        coverImage: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000',
        date: '2024-02-17',
        categories: ['AI Governance', 'Quality Assurance'],
        isFeatured: false,
        capabilities: [
            'Structured model testing',
            'Performance comparison',
            'Evidence storage for results'
        ],
        blocks: [
            {
                type: 'heading',
                title: 'Overview',
            },
            {
                type: 'paragraph',
                content: 'This solution enables organizations to benchmark and evaluate AI applications before deploying them into production. It provides structured model testing, performance comparison, and database-locked evidence storage for evaluation results.'
            },
            {
                type: 'heading',
                title: 'Business Value',
            },
            {
                type: 'paragraph',
                content: 'By validating AI systems before launch, organizations can reduce deployment risks, improve reliability, and ensure evidence-backed model selection. It supports objective comparison between multiple LLMs and AI systems.'
            }
        ]
    },
    {
        id: 'post-deployment-ai-governance',
        title: 'Post-Deployment AI Governance',
        slug: 'post-deployment-ai-governance',
        tagline: 'Control & Policy Enforcement',
        coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
        date: '2024-02-17',
        categories: ['AI Governance', 'Policy Control'],
        isFeatured: false,
        capabilities: [
            'Execution policy definition',
            'Compliance maintenance',
            'Secure agent-server communication',
            'Infrastructure protection'
        ],
        blocks: [
            {
                type: 'heading',
                title: 'Overview',
            },
            {
                type: 'paragraph',
                content: 'This solution provides governance and policy enforcement between AI agents and MCP servers. It ensures that AI systems operate within defined boundaries and prevents misuse of agents or unauthorized interactions.'
            },
            {
                type: 'heading',
                title: 'Business Value',
            },
            {
                type: 'paragraph',
                content: 'Organizations can define execution policies, maintain compliance, secure agent-server communication, and protect AI infrastructure from abuse. This is particularly valuable for enterprises operating AI systems at scale.'
            }
        ]
    }
];

import { supabase } from './supabase';

const mapProductFromDb = (row: any): Product => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    tagline: row.tagline,
    coverImage: row.cover_image,
    date: row.created_at,
    categories: row.categories || [],
    isFeatured: row.is_featured || false,
    blocks: row.blocks || [],
    capabilities: row.capabilities || []
});

export async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching products:', error);
        return PRODUCTS_DATA; // Fallback to hardcoded data if table doesn't exist yet
    }

    return data.map(mapProductFromDb);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        if (error.code !== 'PGRST116') {
            console.error('Error fetching product by slug:', error);
        }
        return PRODUCTS_DATA.find(p => p.slug === slug);
    }

    return mapProductFromDb(data);
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching featured products:', error);
        return PRODUCTS_DATA.filter(p => p.isFeatured);
    }

    return data.map(mapProductFromDb);
} function getProductsFallback(): Product[] {
    return PRODUCTS_DATA;
}
