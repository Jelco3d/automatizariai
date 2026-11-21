export const config = { matcher: ['/((?!assets/|lovable-uploads/|api/|.*\\.[a-zA-Z0-9]+$).*)'] };

const SITE = 'https://aiautomatizari.ro';
const DEFAULT_IMAGE = `${SITE}/og-image.png`;
const SKIP_HEADER = 'x-ai-mw-shell';

// Titles/descriptions mirror src/components/seo/RouteMeta.tsx.
const STATIC_META: Record<string, { title: string; description: string }> = {
  '/': { title: 'AI Automatizări — Automatizări cu AI pentru IMM-uri în 5 zile sau mai puțin', description: 'Implementăm automatizări cu AI pentru IMM-uri din România în 5 zile sau mai puțin. Recuperează 20+ ore pe săptămână din taskuri repetitive.' },
  '/acasă': { title: 'Erdelean Jelco — Automatizări cu AI pentru firme', description: 'Află cum Erdelean Jelco ajută firmele din România să automatizeze vânzările, suportul și operațiunile cu agenți AI.' },
  '/services': { title: 'Servicii de automatizare AI pentru firme | AI Automatizări', description: 'Agenți AI, automatizări CRM, chatboți și integrări personalizate pentru IMM-uri. Vezi toate serviciile și ce poți automatiza.' },
  '/about': { title: 'Despre noi — Povestea AI Automatizări', description: 'Cine suntem, cum lucrăm și de ce ne-am specializat în automatizări cu AI pentru antreprenorii din România.' },
  '/portfolio': { title: 'Portofoliu și studii de caz | AI Automatizări', description: 'Povești de succes și rezultate reale obținute de clienții noștri prin automatizări cu AI.' },
  '/contact': { title: 'Contact | AI Automatizări', description: 'Contactează-ne pentru o discuție despre automatizarea afacerii tale cu AI. Telefon, email și programare directă.' },
  '/cerere-oferta': { title: 'Cerere ofertă personalizată | AI Automatizări', description: 'Completează formularul și primești o ofertă personalizată de automatizare AI pentru afacerea ta.' },
  '/fidelizare-pacienti': { title: 'Sistem de fidelizare automată pentru clinici dentare', description: 'Cum pot clinicile dentare să-și crească programările cu un sistem automat de fidelizare a pacienților, fără reclame.' },
  '/business-card': { title: 'Card de vizită digital — Jelco, AI Automatizări', description: 'Cardul de vizită digital al lui Jelco: date de contact, rețele sociale și servicii AI Automatizări.' },
  '/linktree': { title: 'Profil și linkuri — Jelco, AI Automatizări', description: 'Toate linkurile importante: website, servicii, portofoliu, rețele sociale și contact direct.' },
  '/terms': { title: 'Termeni și condiții | AI Automatizări', description: 'Termenii și condițiile de utilizare a site-ului și serviciilor AI Automatizări.' },
  '/gdpr': { title: 'Politica GDPR | AI Automatizări', description: 'Cum respectăm Regulamentul GDPR și ce drepturi ai asupra datelor tale personale.' },
  '/privacy': { title: 'Politica de confidențialitate | AI Automatizări', description: 'Ce date colectăm, de ce le folosim și cum le protejăm.' },
  '/cookies': { title: 'Politica de cookie-uri | AI Automatizări', description: 'Ce cookie-uri folosește site-ul AI Automatizări și cum le poți gestiona.' },
  '/blog': { title: 'Blog AI și automatizări pentru firme | AI Automatizări', description: 'Articole practice despre AI și automatizări pentru firme din România: ghiduri, costuri reale, agenți AI și exemple pe care le poți aplica imediat.' },
};

// Other app routes (served normally with status 200, no injected tags).
const OTHER_ROUTES = [/^\/auth$/, /^\/admin(\/.*)?$/, /^\/business-dashboard(\/.*)?$/, /^\/contract-signature\/[^/]+$/, /^\/index$/];

const publicKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dXRkc2t1eWtkb3NtYmdqa3poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzcyOTcsImV4cCI6MjA3NDc1MzI5N30.1UFcL1voItB0K0ilcgCvSVdaoOBfwaRc2I5K1LjngKY';

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);
}

function decodeEntities(value: string): string {
  const named: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code: string) => {
    if (code[0] !== '#') return named[code.toLowerCase()] ?? entity;
    const radix = code[1]?.toLowerCase() === 'x' ? 16 : 10;
    const number = Number.parseInt(code.slice(radix === 16 ? 2 : 1), radix);
    return Number.isFinite(number) && number >= 0 && number <= 0x10ffff ? String.fromCodePoint(number) : entity;
  });
}

function plainText(value: string): string[] {
  return decodeEntities(value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(?:p|li|blockquote|tr|div|section)>/gi, '\n')
    .replace(/<[^>]+>/g, ''))
    .split(/\n+/).map((line) => line.trim()).filter(Boolean);
}

type ContentBlock = { tag: 'h2' | 'h3' | 'p'; text: string };

function articleBlocks(value: string): ContentBlock[] {
  const safe = value.replace(/<(script|style|iframe|object|embed|form)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
  const blocks: ContentBlock[] = [];
  const appendText = (part: string) => plainText(part).forEach((text) => blocks.push({ tag: 'p', text }));
  const heading = /<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi;
  let cursor = 0;
  for (let match = heading.exec(safe); match; match = heading.exec(safe)) {
    appendText(safe.slice(cursor, match.index));
    plainText(match[2]).forEach((text) => blocks.push({ tag: Number(match[1]) <= 2 ? 'h2' : 'h3', text }));
    cursor = match.index + match[0].length;
  }
  appendText(safe.slice(cursor));
  return blocks;
}

function injectRoot(html: string, content: string): string {
  return html.replace(/(<div\b(?=[^>]*\bid\s*=\s*["']root["'])[^>]*>)\s*<\/div>/i, (_match, opening: string) => `${opening}${content}</div>`);
}

function navigationHtml(): string {
  return '<nav aria-label="Navigare principală"><ul><li><a href="/">Acasă</a></li><li><a href="/services">Servicii</a></li><li><a href="/blog">Blog</a></li><li><a href="/contact">Contact</a></li></ul></nav>';
}

function staticFallback(path: string, meta: { title: string; description: string }): string {
  let extra = '';
  if (path === '/linktree') {
    extra = '<ul><li><a href="/">Website Principal — Soluții de automatizare și dezvoltare web</a></li><li><a href="/services">Servicii — Vedeți toate serviciile noastre</a></li><li><a href="/portfolio">Portofoliu — Proiecte realizate și case studies</a></li><li><a href="/contact">Contact Direct — Contactați-mă pentru consultanță</a></li></ul><address><a href="tel:+40754274528">+40754274528</a><br><a href="mailto:contact@aiautomatizari.ro">contact@aiautomatizari.ro</a></address>';
  } else if (path === '/business-card') {
    extra = '<section><h2>Jelco — AI Automatizări</h2><p>Automatizare &amp; Dezvoltare Web</p><address><a href="tel:+40754274528">+40754274528</a><br><a href="mailto:contact@aiautomatizari.ro">contact@aiautomatizari.ro</a></address><p><a href="/linktree">Vezi profilul și toate linkurile</a></p></section>';
  }
  return `${navigationHtml()}<main style="max-width:46rem;margin:2rem auto;padding:0 1rem"><h1>${escapeHtml(meta.title)}</h1><p>${escapeHtml(meta.description)}</p>${extra}</main>`;
}

function renderBlogIndex(meta: { title: string; description: string }, posts: Array<{ slug: string; title: string; excerpt: string | null }>): string {
  const items = posts.map((post) => `<li><article><h2><a href="/blog/${encodeURIComponent(post.slug)}">${escapeHtml(post.title)}</a></h2>${post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : ''}</article></li>`).join('');
  return `${navigationHtml()}<main style="max-width:46rem;margin:2rem auto;padding:0 1rem"><h1>${escapeHtml(meta.title)}</h1><p>${escapeHtml(meta.description)}</p><ul>${items}</ul></main>`;
}

function renderArticle(post: { title: string; excerpt?: string | null; content?: string; author_name?: string | null; published_at?: string | null; cover_image?: string | null; og_image?: string | null }): string {
  const description = post.excerpt ? `<p>${escapeHtml(post.excerpt)}</p>` : '';
  const author = escapeHtml(post.author_name || 'AI Automatizări');
  const date = post.published_at && !Number.isNaN(Date.parse(post.published_at))
    ? `<time datetime="${escapeHtml(post.published_at)}">${escapeHtml(post.published_at.slice(0, 10))}</time>` : '';
  const imageValue = post.og_image || post.cover_image;
  let image = '';
  if (imageValue) {
    try {
      const source = new URL(imageValue, SITE).href;
      image = `<img src="${escapeHtml(source)}" alt="${escapeHtml(post.title)}">`;
    } catch { /* Ignore an invalid cover URL in the no-JavaScript fallback. */ }
  }
  const body = articleBlocks(post.content || '').map((block) => `<${block.tag}>${escapeHtml(block.text)}</${block.tag}>`).join('');
  return `${navigationHtml()}<main style="max-width:46rem;margin:2rem auto;padding:0 1rem"><p><a href="/blog">Toate articolele</a></p><article><header><h1>${escapeHtml(post.title)}</h1>${description}<p>${author}${date ? ` · ${date}` : ''}</p>${image}</header>${body}</article></main>`;
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
      fetchTimed(`https://ututdskuykdosmbgjkzh.supabase.co/rest/v1/blog_posts?slug=eq.${slug}&status=eq.published&published_at=lte.${encodeURIComponent(new Date().toISOString())}&select=slug,title,seo_title,seo_description,excerpt,content,author_name,published_at,og_image,cover_image&limit=1`, {
        apikey: publicKey, Authorization: `Bearer ${publicKey}`,
      }),
    ]);
    if (!shell.ok || !result.ok || !shell.headers.get('content-type')?.includes('text/html')) return undefined;
    const posts = await result.json();
    const post = Array.isArray(posts) ? posts[0] : undefined;
    let html = await shell.text();
    if (!/<\/head\s*>/i.test(html)) return undefined;
    if (!post || typeof post.title !== 'string') {
      return new Response(notFoundHtml(html), { status: 404, headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, s-maxage=300',
      } });
    }
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
    setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
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
    html = injectRoot(html, renderArticle(post));
    return new Response(html, { status: 200, headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
    } });
  } catch { return undefined; }
}

function notFoundHtml(html: string): string {
  html = html.replace(/<meta\b(?=[^>]*\bname\s*=\s*["']robots["'])[^>]*>/gi, '');
  html = html.replace(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi, '');
  html = html.replace(/<\/head\s*>/i, () => '<meta name="robots" content="noindex">\n</head>');
  return injectRoot(html, '<main><h1>Pagina nu a fost găsită</h1><p>Adresa pe care ai accesat-o nu există sau a fost mutată.</p><p><a href="/">Înapoi la pagina principală</a></p></main>');
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
  let decodedPath = rawPath;
  try { decodedPath = decodeURI(rawPath); } catch { /* Keep the original path for the 404 response. */ }
  const path = decodedPath.replace(/\/+$/, '') || '/';
  const meta = STATIC_META[path];
  const known = !!meta || OTHER_ROUTES.some((r) => r.test(path));
  if (known && !meta) return undefined;
  try {
    const [shell, postsResult] = await Promise.all([
      fetchTimed(new URL('/', request.url), { [SKIP_HEADER]: '1' }),
      path === '/blog'
        ? fetchTimed(`https://ututdskuykdosmbgjkzh.supabase.co/rest/v1/blog_posts?status=eq.published&published_at=lte.${encodeURIComponent(new Date().toISOString())}&select=slug,title,excerpt,published_at&order=published_at.desc`, {
          apikey: publicKey, Authorization: `Bearer ${publicKey}`,
        })
        : Promise.resolve(null),
    ]);
    if (!shell.ok || !shell.headers.get('content-type')?.includes('text/html')) return undefined;
    let html = await shell.text();
    if (!/<\/head\s*>/i.test(html)) return undefined;
    if (meta) {
      const canonical = path === '/' ? `${SITE}/` : `${SITE}${encodeURI(path)}`;
      html = injectHead(html, { ...meta, canonical, image: DEFAULT_IMAGE, type: 'website' });
      let content = staticFallback(path, meta);
      if (path === '/blog' && postsResult?.ok) {
        const posts = await postsResult.json();
        if (Array.isArray(posts)) content = renderBlogIndex(meta, posts);
      }
      html = injectRoot(html, content);
      return new Response(html, { status: 200, headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=600',
      } });
    }
    html = html.replace(/<meta\b(?=[^>]*\bname\s*=\s*["']robots["'])[^>]*>/gi, '');
    html = html.replace(/<link\b(?=[^>]*\brel\s*=\s*["']canonical["'])[^>]*>/gi, '');
    html = html.replace(/<\/head\s*>/i, () => '<meta name="robots" content="noindex">\n</head>');
    html = injectRoot(html, '<main><h1>Pagina nu a fost găsită</h1><p>Adresa pe care ai accesat-o nu există sau a fost mutată.</p><p><a href="/">Înapoi la pagina principală</a></p></main>');
    return new Response(html, { status: 404, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'public, max-age=0, s-maxage=300' } });
  } catch { return undefined; }
}
