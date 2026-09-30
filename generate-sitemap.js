import fs from 'fs';
import path from 'path';
import { FONTS_DATA } from './src/data/fonts.ts';

const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

const baseUrl = 'https://fontora.vercel.app';

let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const staticPages = ['', 'fonts', 'categories', 'favorites', 'about'];
staticPages.forEach(page => {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/${page}</loc>\n`;
  xml += `    <changefreq>daily</changefreq>\n`;
  xml += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
  xml += `  </url>\n`;
});

FONTS_DATA.forEach(font => {
  xml += `  <url>\n`;
  xml += `    <loc>${baseUrl}/fonts/${font.slug}</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.9</priority>\n`;
  xml += `  </url>\n`;
});

xml += `</urlset>`;

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml);

const robots = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;
fs.writeFileSync(path.join(distDir, 'robots.txt'), robots);

console.log('Static sitemap.xml and robots.txt generated successfully in dist/');
