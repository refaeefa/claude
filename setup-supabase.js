import { writeFileSync, readFileSync, existsSync } from 'fs';

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const ORG_ID       = 'nrzcmcmctfnwufkyygjg';
const PROJECT_NAME = 'score-counter';

if (!ACCESS_TOKEN) {
  console.error('❌ Missing SUPABASE_ACCESS_TOKEN');
  console.error('   Add it: Netlify → Site Settings → Environment Variables');
  process.exit(1);
}

const BASE    = 'https://api.supabase.com';
const HEADERS = {
  'Authorization': `Bearer ${ACCESS_TOKEN}`,
  'Content-Type':  'application/json'
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%';
  return Array.from({ length: 20 }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}

async function createProject() {
  console.log(`🚀 Creating Supabase project: ${PROJECT_NAME}...`);
  const res = await fetch(`${BASE}/v1/projects`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      name:            PROJECT_NAME,
      organization_id: ORG_ID,
      plan:            'free',
      region:          'eu-central-1',
      db_pass:         generatePassword()
    })
  });
  if (!res.ok) {
    console.error('❌ Failed:', await res.text());
    process.exit(1);
  }
  const p = await res.json();
  console.log(`✅ Project created: ${p.id}`);
  return p;
}

async function waitForProject(id) {
  console.log('⏳ Waiting for project (up to 5 min)...');
  for (let i = 0; i < 40; i++) {
    const res = await fetch(`${BASE}/v1/projects/${id}`, { headers: HEADERS });
    const p   = await res.json();
    if (p.status === 'ACTIVE_HEALTHY') { console.log('✅ Ready!'); return p; }
    console.log(`   ${p.status} (${i+1}/40)`);
    await sleep(7500);
  }
  console.error('❌ Timeout'); process.exit(1);
}

async function getAnonKey(id) {
  const res  = await fetch(`${BASE}/v1/projects/${id}/api-keys`, { headers: HEADERS });
  const keys = await res.json();
  return keys.find(k => k.name === 'anon')?.api_key;
}

async function runSQL(id, sql) {
  console.log('🗄️  Applying schema...');
  const res = await fetch(`${BASE}/v1/projects/${id}/database/query`, {
    method: 'POST', headers: HEADERS,
    body: JSON.stringify({ query: sql })
  });
  if (!res.ok) { console.error('❌ SQL error:', await res.text()); process.exit(1); }
  console.log('✅ Schema applied');
}

function inject(url, key) {
  if (!existsSync('index.html')) return;
  let html = readFileSync('index.html', 'utf8');
  html = html
    .replace(/%%SUPABASE_URL%%/g,      url)
    .replace(/%%SUPABASE_ANON_KEY%%/g, key);
  writeFileSync('index.html', html);
  console.log('✅ Credentials injected');
}

const SQL = `
create table if not exists scores (
  id         uuid default gen_random_uuid() primary key,
  value      integer not null default 0,
  delta      integer not null default 0,
  note       text,
  created_at timestamptz default now()
);
alter table scores enable row level security;
create policy "allow all" on scores for all using (true);
`;

async function main() {
  const project = await createProject();
  await waitForProject(project.id);
  const key = await getAnonKey(project.id);
  const url = `https://${project.id}.supabase.co`;
  await runSQL(project.id, SQL);
  inject(url, key);
  console.log('\n🎉 Done!');
  console.log(`   URL: ${url}`);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
