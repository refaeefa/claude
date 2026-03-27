import { writeFileSync, readFileSync, existsSync } from 'fs';

const ACCESS_TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const ORG_ID       = 'nrzcmcmctfnwufkyygjg';
const PROJECT_NAME = 'dc-machines-lab';

if (!ACCESS_TOKEN) {
  console.error('❌ Missing SUPABASE_ACCESS_TOKEN');
  console.error('   Add it in Netlify: Site Settings > Environment Variables');
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

// ── Check if project already exists ──────────────────────────────
async function findExistingProject() {
  const res      = await fetch(`${BASE}/v1/projects`, { headers: HEADERS });
  const projects = await res.json();
  return projects.find(p => p.name === PROJECT_NAME);
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
    console.error('❌ Failed to create project:', await res.text());
    process.exit(1);
  }
  const project = await res.json();
  console.log(`✅ Project created: ${project.id}`);
  return project;
}

async function waitForProject(projectId) {
  console.log('⏳ Waiting for project to be ready (up to 5 min)...');
  for (let i = 0; i < 40; i++) {
    const res     = await fetch(`${BASE}/v1/projects/${projectId}`, { headers: HEADERS });
    const project = await res.json();
    if (project.status === 'ACTIVE_HEALTHY') {
      console.log('✅ Project is ready!');
      return project;
    }
    console.log(`   Status: ${project.status} (${i + 1}/40)`);
    await sleep(7500);
  }
  console.error('❌ Timeout: project did not become ready');
  process.exit(1);
}

async function getAnonKey(projectId) {
  const res  = await fetch(`${BASE}/v1/projects/${projectId}/api-keys`, { headers: HEADERS });
  const keys = await res.json();
  return keys.find(k => k.name === 'anon')?.api_key;
}

async function runSQL(projectId, sql) {
  console.log('🗄️  Applying SQL schema...');
  const res = await fetch(`${BASE}/v1/projects/${projectId}/database/query`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ query: sql })
  });
  if (!res.ok) {
    console.error('❌ SQL failed:', await res.text());
    process.exit(1);
  }
  console.log('✅ Schema applied');
}

function injectCredentials(url, key) {
  if (!existsSync('index.html')) return;
  let html = readFileSync('index.html', 'utf8');
  html = html
    .replace(/%%SUPABASE_URL%%/g,      url)
    .replace(/%%SUPABASE_ANON_KEY%%/g, key);
  writeFileSync('index.html', html);
  console.log('✅ Credentials injected into index.html');
}

// ── SQL Schema ────────────────────────────────────────────────────
const SQL_SCHEMA = `
-- Create table
CREATE TABLE IF NOT EXISTS lab_readings (
  id           BIGSERIAL PRIMARY KEY,
  student_name TEXT        NOT NULL,
  voltage      NUMERIC     NOT NULL,
  current      NUMERIC     NOT NULL,
  speed        NUMERIC     NOT NULL,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE lab_readings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous SELECT
CREATE POLICY "anon_select" ON lab_readings
  FOR SELECT TO anon USING (true);

-- Allow anonymous INSERT
CREATE POLICY "anon_insert" ON lab_readings
  FOR INSERT TO anon WITH CHECK (true);
`;
// ─────────────────────────────────────────────────────────────────

async function main() {
  // Check if project already exists (re-deploy safety)
  let project = await findExistingProject();

  if (project) {
    console.log(`♻️  Project already exists: ${project.id} (${project.status})`);
    if (project.status !== 'ACTIVE_HEALTHY') {
      await waitForProject(project.id);
    }
  } else {
    project = await createProject();
    await waitForProject(project.id);
    await runSQL(project.id, SQL_SCHEMA);
  }

  const anonKey     = await getAnonKey(project.id);
  const supabaseUrl = `https://${project.id}.supabase.co`;

  injectCredentials(supabaseUrl, anonKey);

  console.log('');
  console.log('🎉 Setup complete!');
  console.log(`   URL : ${supabaseUrl}`);
  console.log(`   Key : ${anonKey?.substring(0, 30)}...`);
}

main().catch(err => {
  console.error('❌ Fatal:', err.message);
  process.exit(1);
});
