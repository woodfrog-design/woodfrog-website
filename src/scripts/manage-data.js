const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const path = require('path');

config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function manageData() {
    console.log('--- STARTING DATA MANAGEMENT ---');

    // 1. Delete Blogs
    const blogsToDelete = [
        "edd18ee3-1a5a-4ff1-a8ea-6832bbc7b00b", // Autonomous agents in enterprise
        "7c474117-5829-4722-827d-e6470973d3e1", // The 8 pillars of digital success
        "f3d4d1ae-4873-4d1c-818f-5121f210b78c", // Managed ROI for Complex Apps
        "e17d6dc9-03bc-47c5-acc0-2b23171de91d", // Human-Centric Data Design
        "5c119036-72d7-4019-84c0-78da06b72487", // Unified Data Ecosystem Blueprint
        "675543bf-6fad-45d9-8c1c-7ab7e95e882d"  // The 2026 Intelligence Manifesto
    ];

    console.log(`Deleting ${blogsToDelete.length} blogs...`);
    const { error: deleteError } = await supabase
        .from('blogs')
        .delete()
        .in('id', blogsToDelete);

    if (deleteError) console.error('Error deleting blogs:', deleteError);
    else console.log('Specified blogs deleted successfully.');

    // 2. Update Remaining Blogs (Tags and Featured)
    const blogUpdates = [
        { id: "ff2b1eed-316d-4873-9e0c-bfeeda31be1e", categories: ["Energy", "Predictive Maintenance"], is_featured: false },
        { id: "21c3f4ce-f718-4d37-b734-c2dc4572475c", categories: ["Manufacturing", "AI"], is_featured: false },
        { id: "3d3fdc36-65c5-420c-80f6-e0231d9ab9a3", categories: ["Smart Factory", "Optimization"], is_featured: true },
        { id: "9bf6b621-1f9b-4ba2-a993-4392df3fb3c6", categories: ["Healthcare", "Forecasting"], is_featured: false },
        { id: "8207733b-20e4-4199-be6c-6120baab6972", categories: ["Quality Control", "Manufacturing"], is_featured: false },
        { id: "71b1e5bd-4255-4b2d-9f50-b928ca1898b3", categories: ["Telecom", "Customer Experience"], is_featured: false },
        { id: "9c1d0d8e-1187-4385-a89e-e92701920b38", categories: ["Healthcare", "Diagnostics"], is_featured: true },
        { id: "74914aba-504c-4595-a4e4-574757ee12d7", categories: ["Insurance", "Personalization"], is_featured: false },
        { id: "92cdaf69-b564-4eb3-908b-5aea133bcb70", categories: ["Telecom", "Predictive Maintenance"], is_featured: false },
        { id: "33ec95ff-e2b3-45d3-bc98-d7a3bbaad516", categories: ["Data Insights", "Manufacturing"], is_featured: false },
        { id: "2f3d6eda-044b-438e-bb9c-07fcc8666780", categories: ["AI Governance", "Ethics"], is_featured: false }
    ];

    console.log(`Updating ${blogUpdates.length} blogs...`);
    for (const update of blogUpdates) {
        const { error: updateError } = await supabase
            .from('blogs')
            .update({ categories: update.categories, is_featured: update.is_featured })
            .eq('id', update.id);
        if (updateError) console.error(`Error updating blog ${update.id}:`, updateError);
    }
    console.log('Blogs updated successfully.');

    // 3. Deactivate Jobs (Deactivate all currently active jobs)
    console.log('Deactivating all active jobs...');
    const { error: jobError } = await supabase
        .from('jobs')
        .update({ is_active: false })
        .eq('is_active', true);

    if (jobError) console.error('Error deactivating jobs:', jobError);
    else console.log('All active jobs deactivated successfully.');

    // 4. Delete "Scaling trust in AI Governance"
    console.log('Deleting Scaling trust in AI Governance...');
    await supabase.from('blogs').delete().eq('id', '2f3d6eda-044b-438e-bb9c-07fcc8666780');

    // 5. Remove dashboard images (convert text-image/image-text to paragraphs)
    console.log('Converting dashboard image blocks to simple text paragraphs...');

    const blogIdsToConvert = [
        'ff2b1eed-316d-4873-9e0c-bfeeda31be1e', // Smart Monitoring
        '21c3f4ce-f718-4d37-b734-c2dc4572475c', // Predictive Maintenance (Aluminium)
        '9bf6b621-1f9b-4ba2-a993-4392df3fb3c6', // Inventory Healthcare
        '8207733b-20e4-4199-be6c-6120baab6972', // Microbial Contamination
        '71b1e5bd-4255-4b2d-9f50-b928ca1898b3'  // Telecom Churn
    ];

    for (const id of blogIdsToConvert) {
        await convertToParagraph(id, 'ti1');
    }

    console.log('Operations completed!');

    console.log('Operations completed!');
    console.log('--- DATA MANAGEMENT COMPLETE ---');
}

async function convertToParagraph(blogId, blockId) {
    const { data } = await supabase.from('blogs').select('content').eq('id', blogId).single();
    if (!data) return;

    const content = data.content.map(block => {
        if (block.id === blockId) {
            // Convert to paragraph, preserving content but removing image fields
            return {
                id: block.id,
                type: 'paragraph',
                content: block.content || block.text
            };
        }
        return block;
    });

    await supabase.from('blogs').update({ content }).eq('id', blogId);
}

manageData();
