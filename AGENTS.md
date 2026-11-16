
## Blog
- Blog posts live in the `blog_posts` table (HTML from the TipTap editor), always rendered through `sanitizeHtml` in `src/lib/blog.ts` — no articles as hardcoded components, so admins can edit them.
- `/admin/*` routes are wrapped in `BlogStaffGuard` (checks `is_blog_staff` in the database) — never gate admin with client-only state.
- Blog images go to the private `blog-images` bucket with long-lived signed links, because the workspace blocks public buckets.
