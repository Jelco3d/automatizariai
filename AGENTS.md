
## Blog
- Blog posts live in the `blog_posts` table (HTML from the TipTap editor), always rendered through `sanitizeHtml` in `src/lib/blog.ts` — no articles as hardcoded components, so admins can edit them.
- `/admin/*` routes are wrapped in `BlogStaffGuard` (checks `is_blog_staff` in the database) — never gate admin with client-only state.
- Blog images go to the private `blog-images` bucket with long-lived signed links, because the workspace blocks public buckets.
- Blog admin pages wrap content in `BlogAdminLayout` (or call `useApplyBlogAdminTheme` for full-screen pages like the editor), which puts the `blog-admin` token class on `<html>` so portaled dialogs/menus pick up the admin theme; style with semantic tokens only.
- Blog admin data goes through the react-query hooks in `src/hooks/useBlogAdmin.ts` (keys under `["blog-admin", …]`); invalidate that prefix after mutations so sidebar badges and lists stay in sync.
