
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "@prerenderer/rollup-plugin";

const PRERENDER_ROUTES = [
  "/",
  "/services",
  "/about",
  "/portfolio",
  "/blog",
  "/contact",
  "/audit-gratuit",
  "/cerere-oferta",
  "/showroom-vsl",
  "/fidelizare-pacienti",
  "/whatsapp-demo",
  "/business-card",
  "/linktree",
  "/terms",
  "/gdpr",
  "/privacy",
  "/cookies",
];

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" &&
      prerender({
        routes: PRERENDER_ROUTES,
        renderer: "@prerenderer/renderer-puppeteer",
        rendererOptions: {
          maxConcurrentRoutes: 2,
          renderAfterTime: 8000,
          headless: true,
          timeout: 90000,
        },
        postProcess(renderedRoute: {
          route: string;
          html: string;
          originalRoute?: string;
          outputPath?: string;
        }) {
          renderedRoute.html = renderedRoute.html.replace(
            /<script src="https:\/\/cdn\.gpteng\.co\/gptengineer\.js"[^>]*><\/script>/g,
            ""
          );
          return renderedRoute;
        },
      }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
