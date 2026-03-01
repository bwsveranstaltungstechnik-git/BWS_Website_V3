const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split(/\r?\n/).forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
        const parts = line.split('=');
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
        env[key] = value;
    }
});

const anonClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const adminClient = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function test() {
    console.log('Testing revenue_jobs...');
    const { data: anonData, error: anonErr } = await anonClient.from('revenue_jobs').select('id').limit(1);
    console.log('Anon Result:', anonData ? anonData.length : 0, 'Error:', anonErr ? anonErr.message : 'none');

    const { data: adminData, error: adminErr } = await adminClient.from('revenue_jobs').select('id').limit(1);
    console.log('Admin Result:', adminData ? adminData.length : 0, 'Error:', adminErr ? adminErr.message : 'none');

    console.log('\nTesting revenue_purchases...');
    const { data: anonDataP, error: anonErrP } = await anonClient.from('revenue_purchases').select('id').limit(1);
    console.log('Anon Result:', anonDataP ? anonDataP.length : 0, 'Error:', anonErrP ? anonErrP.message : 'none');

    const { data: adminDataP, error: adminErrP } = await adminClient.from('revenue_purchases').select('id').limit(1);
    console.log('Admin Result:', adminDataP ? adminDataP.length : 0, 'Error:', adminErrP ? adminErrP.message : 'none');
}

test();
