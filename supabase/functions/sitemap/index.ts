import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

const baseUrl = 'https://aiautomatizari.ro';
const staticPages = [
  ['/', 'weekly', '1.0'],
  ['/services', 'weekly', '0.9'],
  ['/about', 'monthly', '0.8'],
  ['/portfolio', 'weekly', '0.9'],
  ['/blog', 'daily', '0.9'],
  ['/contact', 'monthly', '0.7'],
  ['/cerere-oferta', 'monthly', '0.8'],
  ['/fidelizare-pacienti', 'monthly', '0.8'],
  ['/business-card', 'monthly', '0.5'],
  ['/linktree', 'monthly', '0.5'],
  ['/terms', 'yearly', '0.3'],
  ['/gdpr', 'yearly', '0.3'],
  ['/privacy', 'yearly', '0.3'],
  ['/cookies', 'yearly', '0.3'],
];

function escapeXml(value: string): string {
  return value.replace(/[<>&"']/g, (character) => {
    const entities: Record<string, string> = {
      '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
    };
    return entities[character] ?? character;
  });
}

function dateOnly(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString().slice(0, 10);
}

function urlEntry(loc: string, lastmod: string | undefined, changefreq: string, priority: string): string {
  return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

Deno.serve(async (req: Request) => {
  const headers = { ...corsHeaders, 'Access-Control-Allow-Origin': '*' };
  if (req.method === 'OPTIONS') return new Response('ok', { headers });
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405, headers: { ...headers, Allow: 'GET, OPTIONS' } });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    if (!supabaseUrl || !serviceRoleKey) throw new Error('Missing server configuration');

    const client = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: posts, error } = await client
      .from('blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });
    if (error) throw error;

    const publishedPosts = posts ?? [];
    const newestUpdate = publishedPosts.reduce<string | undefined>((newest, post) => {
      const updated = dateOnly(post.updated_at);
      return updated && (!newest || updated > newest) ? updated : newest;
    }, undefined);
    const entries = staticPages.map(([path, changefreq, priority]) =>
      urlEntry(`${baseUrl}${path}`, path === '/blog' ? newestUpdate : '2026-04-20', changefreq, priority)
    );
    for (const post of publishedPosts) {
      entries.push(urlEntry(`${baseUrl}/blog/${post.slug}`, dateOnly(post.updated_at || post.published_at), 'weekly', '0.8'));
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
    return new Response(xml, {
      headers: {
        ...headers,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=600, s-maxage=600',
      },
    });
  } catch {
    return new Response('Unable to generate sitemap', {
      status: 500,
      headers: { ...headers, 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
});