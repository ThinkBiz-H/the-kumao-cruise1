import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Emits robots.txt and sitemap.xml at build time from VITE_SITE_URL,
 * so crawl files always point at the deployed domain.
 */
function seoFiles(siteUrl) {
  return {
    name: 'kumaon-crest-seo-files',
    apply: 'build',
    generateBundle() {
      if (!siteUrl) {
        this.warn('VITE_SITE_URL is not set — robots.txt and sitemap.xml were not generated.');
        return;
      }
      const base = siteUrl.replace(/\/$/, '');
      const today = new Date().toISOString().slice(0, 10);

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${base}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  return {
    plugins: [react(), tailwindcss(), seoFiles(env.VITE_SITE_URL)],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      sourcemap: false,
    },
  };
});
