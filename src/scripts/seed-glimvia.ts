import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

const GLIMVIA_CONTENT = {
    id: 'glimvia',
    title: 'Glimvia',
    slug: 'glimvia',
    tagline: 'Mobile-First KPI Alerting Built on Superset',
    cover_image: '/images/products/glimvia.png',
    is_featured: true,
    categories: ['Analytics', 'Real-time Alerts'],
    blocks: [
        {
            type: 'image-text-left',
            title: 'Glimvia',
            content: '*Mobile-First KPI Alerting Built on Superset*\n\nGlimvia transforms passive dashboards into proactive intelligence systems. Instead of repeatedly checking dashboards, decision-makers receive real-time mobile alerts when KPIs cross defined thresholds.\n\nBuilt on top of Superset, Glimvia connects directly to existing dashboards and converts critical metrics into actionable notifications.',
            src: '/images/products/dashboard-overview.png',
            alt: 'Sales Dashboard Overview'
        },
        {
            type: 'heading',
            title: 'SECTION 2 - OVERVIEW'
        },
        {
            type: 'text',
            content: '**Overview**\n\nGlimvia is a mobile-first analytics alerting platform built on Superset. It allows organizations to define KPI-based rules and receive push notifications when thresholds are crossed.\n\nDashboards are no longer static reports. With Glimvia, they become active monitoring systems that continuously evaluate key business metrics.\n\n**What Glimvia Enables:**\n* Continuous KPI monitoring\n* Threshold-based rule creation\n* Real-time mobile notifications\n* Alert history tracking for audit and review'
        },
        {
            type: 'image-text-right',
            title: 'What Problem It Solves',
            content: 'Most organizations build dashboards but rarely monitor them continuously. As a result:\n* Critical deviations go unnoticed\n* Leadership reacts late to operational issues\n* KPI changes are discovered manually\n* There is no structured alert tracking\n\nGlimvia solves this by converting key dashboard metrics into automated alerts, ensuring leaders stay informed the moment something important changes.',
            src: '/images/products/full-dashboard.png',
            alt: 'Sales Dashboard Screen Image'
        },
        {
            type: 'image-text-left',
            title: 'Real-Time Mobile Alerting',
            content: 'When a KPI threshold is breached, Glimvia immediately sends a structured mobile notification including:\n* KPI name\n* Threshold value\n* Actual measured value\n* Timestamp\n* Severity indication\n\nThis ensures faster operational response without requiring manual dashboard checks.',
            src: '/images/products/notifications-screen.png',
            alt: 'Notifications Screen Image'
        },
        {
            type: 'image-text-right',
            title: 'AI-Generated Dashboard Summaries',
            content: 'Glimvia provides automated summaries based on recent dashboard activity.\n\nThese summaries highlight:\n* KPI variance compared to previous periods\n* Peak activity windows\n* Entities or stations requiring attention\n\nThis adds contextual intelligence on top of alert notifications.',
            src: '/images/products/ai-summary.png',
            alt: 'AI Summary Dashboard Screen Image'
        },
        {
            type: 'image-text-left',
            title: 'KPI-Based Rule Creation',
            content: 'Users define monitoring rules directly linked to Superset dashboards:\n* Set metric thresholds\n* Define trigger conditions\n* Configure monitoring periods\n* Control alert behavior\n\nGlimvia continuously evaluates these rules in real time and triggers alerts when conditions are met.',
            src: '/images/products/operational-dashboard.png',
            alt: 'Operational Dashboard Screen Image'
        },
        {
            type: 'table',
            title: 'Structured Alert History',
            tableData: {
                headers: ['Component', 'Description'],
                rows: [
                    ['KPI Name', 'The monitored metric'],
                    ['Threshold', 'Defined trigger limit'],
                    ['Actual Value', 'Recorded value at breach'],
                    ['Timestamp', 'Time of alert'],
                    ['Status', 'Active or resolved']
                ]
            }
        },
        {
            type: 'paragraph',
            content: 'Glimvia maintains alert history for tracking, review, and operational audits.'
        },
        {
            type: 'text',
            content: '**Key Capabilities**\n\n* Direct integration with Superset dashboards\n* KPI-based rule creation\n* Threshold-driven alert triggering\n* Real-time mobile push notifications\n* Alert history retention\n\nGlimvia ensures dashboards are no longer passive reports but active monitoring systems.'
        },
        {
            type: 'text',
            content: '**Business Impact**\n\n* Faster response to operational deviations\n* Improved decision-making speed\n* Reduced reliance on manual monitoring\n* Clear audit trail of KPI alerts\n\nBy converting dashboards into proactive alert systems, Glimvia enhances operational awareness across leadership teams.'
        }
    ]
};

async function seed() {
    console.log('Seeding Glimvia product...');

    // Check if products table exists (simplified check by just trying to insert)
    const { error: insertError } = await supabase
        .from('products')
        .upsert(GLIMVIA_CONTENT, { onConflict: 'slug' });

    if (insertError) {
        console.error('Error seeding Glimvia:', insertError);
        if (insertError.message.includes('relation "products" does not exist')) {
            console.error('CRITICAL: The "products" table does not exist in your Supabase database.');
            console.log('Please create the table with the following columns: id (uuid/text), title (text), slug (text, unique), tagline (text), cover_image (text), is_featured (boolean), categories (text[]), blocks (jsonb), capabilities (text[]), created_at (timestamptz).');
        }
    } else {
        console.log('Glimvia product seeded successfully!');
    }
}

seed();
