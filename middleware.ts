export const config = { matcher: '/blog/:slug' };

const publicKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dXRkc2t1eWtkb3NtYmdqa3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzcyOTcsImV4cCI6MjA3NDc1MzI5N30.1UFcL1voItB0K0ilcgCvSVdaoOBfwaRc2I5K1LjngKY';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);
}

async function fetchTimed(url: URL | string, headers?: HeadersInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2500);
  try {
    const response = await fetch(url, { headers, signal: controller.signal });
    // Consume the body within the timeout, not just the response headers.
    const body = await response.arrayBuffer();
    return new Response(body, { status: response.status, headers: response.headers });
  } finally { clearTimeout(timer); }
}

export default async function middleware(request: Request): Promise<Response | undefined> {
  const match = new URL(request.url).pathname.match(/^\/blog\/([a-z0-9-]+)$/);
  if (!match || request.method !== 'GET') return undefined;
  const slug = match[1];
  try {
    const [shell, result] = await Promise.all([
      fetchTimed(new URL('/', request.url)),
      fetchTimed(`https://ututdskuykdosmbgjkzh.supabase.co/rest/v1/blog_posts?slug=eq.${slug}&status=eq.published&select=slug,title,seo_title,seo_description,excerpt,og_image,cover_image&limit=1`, {
        apikey: publicKey, Authorization: `Bearer ${publicKey}`,
      }),
    ]);
    if (!shell.ok || !result.ok || !shell.headers.get('content-type')?.includes('text/html')) return undefined;
    const posts = await result.json();
    const post = Array.isArray(posts) ? posts[0] : undefined;
    if (!post || typeof post.title !== 'string') return undefined;
    let html = await shell.text();
    if (!/<\/head\s*>/i.test(html)) return undefined;
    const title = post.seo_title || post.title;
    const description = post.seo_description || post.excerpt || '';
    const canonical = `https://aiautomatizari.ro/blog/${slug}`;
    const insert = (tag: string) => { html = html.replace(/<\/head\s*>/i, () => `${tag}\n</head>`); };
    const titleTag = `<title>${escapeHtml(title)}</title>`;
    if (/<title\b[^>]*>[\s\S]*?<\/title>/i.test(html)) html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, () => titleTag);
    else insert(titleTag);
    const setMeta = (attribute: 'name' | 'property', key: string, value: string) => {
      const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}\\s*=\\s*["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'])[^>]*>`, 'gi');
      html = html.replace(pattern, '');
      insert(`<meta ${attribute}="${key}" content="${escapeHtml(value)}">`);
    };
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:type', 'article');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    const image = post.og_image || post.cover_image;
    if (image) {
      const absoluteImage = new URL(image, 'https://aiautomatizari.ro').href;
      setMeta('property', 'og:image', absoluteImage);
      setMeta('name', 'twitter:image', absoluteImage);
    }
    html = html.replace(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi, '');
    insert(`<link rel="canonical" href="${escapeHtml(canonical)}">`);
    return new Response(html, { status: 200, headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    } });
  } catch { return undefined; }
}