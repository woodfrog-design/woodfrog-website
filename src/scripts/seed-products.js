const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const PRODUCTS = [
    {
        id: 'antvia',
        title: 'Antvia',
        slug: 'antvia',
        tagline: 'Unified Data & AI Platform',
        cover_image: '/images/products/antvia.png',
        is_featured: true,
        categories: ['Data Platform', 'AI Ready'],
        capabilities: [
            'Multi-source connectors',
            'Centralized storage',
            'Structured transformation pipelines',
            'Dashboard integration',
            'AI/ML-ready outputs'
        ],
        blocks: [
            { type: 'heading', title: 'Overview' },
            { type: 'paragraph', content: 'Antvia is WoodFrog’s unified data platform designed to centralize, clean, and prepare data for analytics and AI. It allows organizations to connect multiple data sources into one system, apply structured Bronze–Silver–Gold transformation layers, and expose a clean, reliable single source of truth for dashboards, AI agents, and machine learning frameworks.' },
            { type: 'heading', title: 'Architecture & Approach' },
            { type: 'paragraph', content: 'Antvia follows a modern layered data architecture. Raw data is ingested and stored in the Bronze layer, refined and structured in the Silver layer, and business-ready datasets are prepared in the Gold layer. These curated datasets are then made available for dashboards and AI/ML frameworks such as MLflow, ensuring consistency across reporting and intelligent systems.' }
        ]
    },
    {
        id: 'letmeknow',
        title: 'LetMeKnow',
        slug: 'letmeknow',
        tagline: 'Intelligent Monitoring Platform',
        cover_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000',
        is_featured: false,
        categories: ['Monitoring', 'Notifications'],
        capabilities: [
            'Rule-based monitoring across multiple domains',
            'Real-time trigger detection',
            'Personalized watchlists',
            'Mobile notifications'
        ],
        blocks: [
            { type: 'heading', title: 'Overview' },
            { type: 'paragraph', content: 'LetMeKnow is a lightweight intelligent monitoring platform that allows users to define custom rules for events, metrics, and signals they care about. Instead of constantly checking websites or dashboards, users receive instant notifications when predefined conditions are met.' },
            { type: 'heading', title: 'Use Cases' },
            {
                type: 'list', items: [
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
        cover_image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=2000',
        is_featured: false,
        categories: ['AI Governance', 'Quality Assurance'],
        capabilities: [
            'Structured model testing',
            'Performance comparison',
            'Evidence storage for results'
        ],
        blocks: [
            { type: 'heading', title: 'Overview' },
            { type: 'paragraph', content: 'This solution enables organizations to benchmark and evaluate AI applications before deploying them into production. It provides structured model testing, performance comparison, and database-locked evidence storage for evaluation results.' },
            { type: 'heading', title: 'Business Value' },
            { type: 'paragraph', content: 'By validating AI systems before launch, organizations can reduce deployment risks, improve reliability, and ensure evidence-backed model selection. It supports objective comparison between multiple LLMs and AI systems.' }
        ]
    },
    {
        id: 'post-deployment-ai-governance',
        title: 'Post-Deployment AI Governance',
        slug: 'post-deployment-ai-governance',
        tagline: 'Control & Policy Enforcement',
        cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000',
        is_featured: false,
        categories: ['AI Governance', 'Policy Control'],
        capabilities: [
            'Execution policy definition',
            'Compliance maintenance',
            'Secure agent-server communication',
            'Infrastructure protection'
        ],
        blocks: [
            { type: 'heading', title: 'Overview' },
            { type: 'paragraph', content: 'This solution provides governance and policy enforcement between AI agents and MCP servers. It ensures that AI systems operate within defined boundaries and prevents misuse of agents or unauthorized interactions.' },
            { type: 'heading', title: 'Business Value' },
            { type: 'paragraph', content: 'Organizations can define execution policies, maintain compliance, secure agent-server communication, and protect AI infrastructure from abuse. This is particularly valuable for enterprises operating AI systems at scale.' }
        ]
    }
];

async function seed() {
    console.log(`Seeding ${PRODUCTS.length} products...`);

    for (const product of PRODUCTS) {
        console.log(`Upserting ${product.title}...`);
        const { error } = await supabase
            .from('products')
            .upsert(product, { onConflict: 'slug' });

        if (error) {
            console.error(`Error seeding ${product.title}:`, error);
        } else {
            console.log(`${product.title} seeded successfully!`);
        }
    }
}

seed();
