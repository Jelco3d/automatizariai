export const config = { matcher: ['/((?!assets/|lovable-uploads/|api/|.*\\.[a-zA-Z0-9]+$).*)'] };

const SITE = 'https://aiautomatizari.ro';
const DEFAULT_IMAGE = `${SITE}/og-image.png`;
const SKIP_HEADER = 'x-ai-mw-shell';

// Titles/descriptions mirror src/components/seo/RouteMeta.tsx.
const STATIC_META: Record<string, { title: string; description: string }> = {
  '/': { title: 'AI Automatizări — Automatizări cu AI pentru IMM-uri în 5 zile sau mai puțin', description: 'Implementăm automatizări cu AI pentru IMM-uri din România în 5 zile sau mai puțin. Recuperează 20+ ore pe săptămână din taskuri repetitive.' },
  '/services': { title: 'Servicii de automatizare AI pentru firme | AI Automatizări', description: 'Agenți AI, automatizări CRM, chatboți și integrări personalizate pentru IMM-uri. Vezi toate serviciile și ce poți automatiza.' },
  '/about': { title: 'Despre noi — Povestea AI Automatizări', description: 'Cine suntem, cum lucrăm și de ce ne-am specializat în automatizări cu AI pentru antreprenorii din România.' },
  '/portfolio': { title: 'Portofoliu și studii de caz | AI Automatizări', description: 'Povești de succes și rezultate reale obținute de clienții noștri prin automatizări cu AI.' },
  '/contact': { title: 'Contact | AI Automatizări', description: 'Contactează-ne pentru o discuție despre automatizarea afacerii tale cu AI. Telefon, email și programare directă.' },
  '/terms': { title: 'Termeni și condiții | AI Automatizări', description: 'Termenii și condițiile de utilizare a site-ului și serviciilor AI Automatizări.' },
  '/gdpr': { title: 'Politica GDPR | AI Automatizări', description: 'Cum respectăm Regulamentul GDPR și ce drepturi ai asupra datelor tale personale.' },
  '/privacy': { title: 'Politica de confidențialitate | AI Automatizări', description: 'Ce date colectăm, de ce le folosim și cum le protejăm.' },
  '/cookies': { title: 'Politica de cookie-uri | AI Automatizări', description: 'Ce cookie-uri folosește site-ul AI Automatizări și cum le poți gestiona.' },
  '/blog': { title: 'Blog AI și automatizări pentru firme | AI Automatizări', description: 'Articole practice despre AI și automatizări pentru firme din România: ghiduri, costuri reale, agenți AI și exemple pe care le poți aplica imediat.' },
};

// Other app routes (served normally with status 200, no injected tags).
const OTHER_ROUTES = [/^\/acas(ă|%C4%83)$/i, /^\/business-card$/, /^\/linktree$/, /^\/fidelizare-pacienti$/, /^\/cerere-oferta$/, /^\/auth$/, /^\/admin(\/.*)?$/, /^\/business-dashboard(\/.*)?$/, /^\/contract-signature\/[^/]+$/, /^\/index$/];

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
  if (request.method !== 'GET' || request.headers.get(SKIP_HEADER)) return undefined;
  const pathname = new URL(request.url).pathname;
  const match = pathname.match(/^\/blog\/([a-z0-9-]+)$/);
  if (!match) return handleOther(request, pathname);
  const slug = match[1];
  try {
    const [shell, result] = await Promise.all([
      fetchTimed(new URL('/', request.url), { [SKIP_HEADER]: '1' }),
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

function injectHead(html: string, meta: { title: string; description: string; canonical: string; image: string; type: string }): string {
  const insert = (tag: string) => { html = html.replace(/<\/head\s*>/i, () => `${tag}\n</head>`); };
  const titleTag = `<title>${escapeHtml(meta.title)}</title>`;
  if (/<title\b[^>]*>[\s\S]*?<\/title>/i.test(html)) html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, () => titleTag);
  else insert(titleTag);
  const setMeta = (attribute: 'name' | 'property', key: string, value: string) => {
    const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}\\s*=\\s*["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'])[^>]*>`, 'gi');
    html = html.replace(pattern, '');
    insert(`<meta ${attribute}="${key}" content="${escapeHtml(value)}">`);
  };
  setMeta('name', 'description', meta.description);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:url', meta.canonical);
  setMeta('property', 'og:type', meta.type);
  setMeta('property', 'og:image', meta.image);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', meta.description);
  setMeta('name', 'twitter:image', meta.image);
  html = html.replace(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi, '');
  insert(`<link rel="canonical" href="${escapeHtml(meta.canonical)}">`);
  return html;
}

async function handleOther(request: Request, rawPath: string): Promise<Response | undefined> {
  const path = rawPath.replace(/\/+$/, '') || '/';
  const meta = STATIC_META[path];
  const known = !!meta || OTHER_ROUTES.some((r) => r.test(path));
  if (known && !meta) return undefined;
  try {
    const shell = await fetchTimed(new URL('/', request.url), { [SKIP_HEADER]: '1' });
    if (!shell.ok || !shell.headers.get('content-type')?.includes('text/html')) return undefined;
    let html = await shell.text();
    if (!/<\/head\s*>/i.test(html)) return undefined;
    if (meta) {
      html = injectHead(html, { ...meta, canonical: path === '/' ? `${SITE}/` : `${SITE}${path}`, image: DEFAULT_IMAGE, type: 'website' });
      return new Response(html, { status: 200, headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
      } });
    }
    html = html.replace(/<meta\b(?=[^>]*\bname\s*=\s*["']robots["'])[^>]*>/gi, '');
    html = html.replace(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi, '');
    html = html.replace(/<\/head\s*>/i, () => '<meta name="robots" content="noindex">\n</head>');
    return new Response(html, { status: 404, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0, s-maxage=300' } });
  } catch { return undefined; }
}
