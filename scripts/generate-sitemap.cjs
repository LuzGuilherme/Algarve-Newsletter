/**
 * Sitemap Generator for Algarve Newsletter
 *
 * This script automatically generates a complete sitemap.xml by scanning
 * the dist folder for all HTML files. This ensures no pages are missed
 * from the sitemap, which is critical for Google Search Console indexing.
 *
 * Run after build: npm run build
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BASE_URL = 'https://algarvenewsletter.pt';

// Priority mapping for different page types
const PRIORITY_MAP = {
  'index': 1.0,
  'blog': 0.9,
  'beaches': 0.9,
  'contact': 0.5,
  'privacy': 0.3,
  'terms': 0.3,
};

// Change frequency mapping
const CHANGEFREQ_MAP = {
  'index': 'weekly',
  'blog': 'daily',
  'beaches': 'weekly',
  'contact': 'monthly',
  'privacy': 'monthly',
  'terms': 'monthly',
};

/**
 * Get the current date in YYYY-MM-DD format
 */
function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get file modification date in YYYY-MM-DD format
 */
function getFileModDate(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return getCurrentDate();
  }
}

/**
 * Convert file path to URL
 */
function filePathToUrl(filePath) {
  let relativePath = path.relative(DIST_DIR, filePath);

  // Remove .html extension
  relativePath = relativePath.replace(/\.html$/, '');

  // Handle index files
  if (relativePath === 'index') {
    return '/';
  }

  // Convert backslashes to forward slashes (Windows compatibility)
  relativePath = relativePath.replace(/\\/g, '/');

  return '/' + relativePath;
}

/**
 * Get priority for a URL
 */
function getPriority(url) {
  if (url === '/') return PRIORITY_MAP['index'];
  if (url === '/blog') return PRIORITY_MAP['blog'];
  if (url === '/beaches') return PRIORITY_MAP['beaches'];
  if (url === '/contact') return PRIORITY_MAP['contact'];
  if (url === '/privacy') return PRIORITY_MAP['privacy'];
  if (url === '/terms') return PRIORITY_MAP['terms'];
  if (url.startsWith('/blog/')) return 0.8;
  if (url.startsWith('/beaches/')) return 0.7;
  return 0.5;
}

/**
 * Get change frequency for a URL
 */
function getChangeFreq(url) {
  if (url === '/') return CHANGEFREQ_MAP['index'];
  if (url === '/blog') return CHANGEFREQ_MAP['blog'];
  if (url === '/beaches') return CHANGEFREQ_MAP['beaches'];
  if (url === '/contact') return CHANGEFREQ_MAP['contact'];
  if (url === '/privacy') return CHANGEFREQ_MAP['privacy'];
  if (url === '/terms') return CHANGEFREQ_MAP['terms'];
  if (url.startsWith('/blog/')) return 'monthly';
  if (url.startsWith('/beaches/')) return 'monthly';
  return 'monthly';
}

/**
 * Recursively find all HTML files in a directory
 */
function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Skip assets and other non-content directories
      if (!['assets', 'icons', 'images', 'data', 'generated'].includes(item)) {
        findHtmlFiles(fullPath, files);
      }
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Generate sitemap XML content
 */
function generateSitemapXml(urls) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Sort URLs: main pages first, then by path
  urls.sort((a, b) => {
    const priorityA = getPriority(a.url);
    const priorityB = getPriority(b.url);
    if (priorityA !== priorityB) return priorityB - priorityA;
    return a.url.localeCompare(b.url);
  });

  for (const entry of urls) {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${entry.url}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    xml += `    <priority>${entry.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  return xml;
}

/**
 * Main sitemap generation function
 */
function generateSitemap() {
  console.log('🗺️  Starting sitemap generation...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Error: dist directory not found. Run build first.');
    process.exit(1);
  }

  // Find all HTML files
  const htmlFiles = findHtmlFiles(DIST_DIR);
  console.log(`📄 Found ${htmlFiles.length} HTML pages\n`);

  // Convert to URL entries
  const urls = htmlFiles.map(filePath => {
    const url = filePathToUrl(filePath);
    return {
      url,
      lastmod: getFileModDate(filePath),
      changefreq: getChangeFreq(url),
      priority: getPriority(url),
    };
  });

  // Generate XML
  const sitemapXml = generateSitemapXml(urls);

  // Write to both dist and public directories
  const distSitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  const publicSitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');

  fs.writeFileSync(distSitemapPath, sitemapXml);
  console.log(`✅ Written: ${distSitemapPath}`);

  fs.writeFileSync(publicSitemapPath, sitemapXml);
  console.log(`✅ Written: ${publicSitemapPath}`);

  // Print summary
  console.log('\n📊 Sitemap Summary:');
  console.log(`   Total URLs: ${urls.length}`);
  console.log(`   Main pages: ${urls.filter(u => ['/', '/blog', '/beaches', '/contact', '/privacy', '/terms'].includes(u.url)).length}`);
  console.log(`   Beach pages: ${urls.filter(u => u.url.startsWith('/beaches/') && u.url !== '/beaches').length}`);
  console.log(`   Blog pages: ${urls.filter(u => u.url.startsWith('/blog/') && u.url !== '/blog').length}`);

  console.log('\n🎉 Sitemap generation complete!\n');
}

// Run the generator
generateSitemap();
