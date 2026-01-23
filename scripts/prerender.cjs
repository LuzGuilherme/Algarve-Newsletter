/**
 * Pre-rendering script for Algarve Newsletter
 *
 * This script generates static HTML files for all routes to ensure
 * Google can properly index the content without needing JavaScript execution.
 *
 * It uses Puppeteer to render each page and extract the fully hydrated HTML.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const GENERATED_DIR = path.join(PUBLIC_DIR, 'generated');
const DATA_DIR = path.join(PUBLIC_DIR, 'data');

// Base URL for the site
const BASE_URL = 'https://algarvenewsletter.pt';

/**
 * Get all routes that need to be pre-rendered
 */
function getAllRoutes() {
  const routes = [
    // Main pages
    '/',
    '/blog',
    '/beaches',
    '/contact',
    '/privacy',
    '/terms',
  ];

  // Get blog article routes
  const blogIndexPath = path.join(GENERATED_DIR, 'blog-index.json');
  if (fs.existsSync(blogIndexPath)) {
    const blogIndex = JSON.parse(fs.readFileSync(blogIndexPath, 'utf-8'));
    blogIndex.articles.forEach(article => {
      routes.push(`/blog/${article.slug}`);
    });

    // Add category filter pages
    blogIndex.categories.forEach(category => {
      routes.push(`/blog?category=${category.slug}`);
    });
  }

  // Get beach routes
  const beachesPath = path.join(DATA_DIR, 'beaches.json');
  if (fs.existsSync(beachesPath)) {
    const beachesData = JSON.parse(fs.readFileSync(beachesPath, 'utf-8'));
    beachesData.beaches.forEach(beach => {
      routes.push(`/beaches/${beach.slug}`);
    });

    // Add beach filter pages
    routes.push('/beaches?activity=surfing');
    routes.push('/beaches?vibe=family-friendly');
    routes.push('/beaches?vibe=hidden-gem');
    routes.push('/beaches?region=western');
    routes.push('/beaches?region=central');
    routes.push('/beaches?region=eastern');
  }

  return routes;
}

/**
 * Get pre-rendered content for a route (for SEO - visible to crawlers)
 */
function getContentForRoute(route) {
  // Home page
  if (route === '/') {
    return `
      <main>
        <h1>Algarve Newsletter - Discover. Connect. Explore.</h1>
        <p>Get our weekly curated list of secret spots, local events, and authentic experiences delivered straight to your inbox. No spam, just pure Algarve magic.</p>
        <p>The local friend you've been looking for. Curated events and hidden secrets, delivered to your inbox.</p>
        <h2>Join the Local Inner Circle</h2>
        <p>Get the best of Algarve delivered to your inbox every Thursday.</p>
      </main>
    `;
  }

  // Blog index
  if (route === '/blog') {
    const blogIndexPath = path.join(GENERATED_DIR, 'blog-index.json');
    if (fs.existsSync(blogIndexPath)) {
      const blogIndex = JSON.parse(fs.readFileSync(blogIndexPath, 'utf-8'));
      const articleLinks = blogIndex.articles.slice(0, 20).map(article =>
        `<li><a href="/blog/${article.slug}">${article.title}</a> - ${article.description}</li>`
      ).join('\n');
      return `
        <main>
          <h1>Algarve Travel Blog - Tips, Guides & Local Secrets</h1>
          <p>Discover the best of the Algarve with our travel guides, hidden gems, and local tips. From beaches to hiking trails, we cover it all.</p>
          <h2>Latest Articles</h2>
          <ul>
            ${articleLinks}
          </ul>
        </main>
      `;
    }
    return `
      <main>
        <h1>Algarve Travel Blog</h1>
        <p>Discover the best of the Algarve with our travel guides, hidden gems, and local tips.</p>
      </main>
    `;
  }

  // Individual blog article
  if (route.startsWith('/blog/') && !route.includes('?')) {
    const slug = route.replace('/blog/', '');
    const articlePath = path.join(GENERATED_DIR, 'articles', `${slug}.json`);

    if (fs.existsSync(articlePath)) {
      const article = JSON.parse(fs.readFileSync(articlePath, 'utf-8'));
      return `
        <article>
          <header>
            <h1>${article.title}</h1>
            <p><strong>By ${article.author || 'Algarve Newsletter Team'}</strong> | ${article.date} | ${article.readingTime} min read</p>
            <p>${article.description}</p>
          </header>
          <div class="article-content">
            ${article.content}
          </div>
        </article>
      `;
    }
  }

  // Beaches index
  if (route === '/beaches') {
    const beachesPath = path.join(DATA_DIR, 'beaches.json');
    if (fs.existsSync(beachesPath)) {
      const beachesData = JSON.parse(fs.readFileSync(beachesPath, 'utf-8'));
      const beachLinks = beachesData.beaches.slice(0, 30).map(beach =>
        `<li><a href="/beaches/${beach.slug}">${beach.name}</a> - ${beach.location}. ${beach.description.substring(0, 150)}...</li>`
      ).join('\n');
      return `
        <main>
          <h1>Algarve Beach Finder - 50+ Beaches with Photos & Details</h1>
          <p>Find your perfect Algarve beach. Filter by region, activities, and vibe. 50+ beaches with photos, maps, and insider tips.</p>
          <h2>All Beaches</h2>
          <ul>
            ${beachLinks}
          </ul>
        </main>
      `;
    }
    return `
      <main>
        <h1>Algarve Beach Finder</h1>
        <p>Find your perfect Algarve beach. Filter by region, activities, and vibe.</p>
      </main>
    `;
  }

  // Individual beach page
  if (route.startsWith('/beaches/') && !route.includes('?')) {
    const slug = route.replace('/beaches/', '');
    const beachesPath = path.join(DATA_DIR, 'beaches.json');

    if (fs.existsSync(beachesPath)) {
      const beachesData = JSON.parse(fs.readFileSync(beachesPath, 'utf-8'));
      const beach = beachesData.beaches.find(b => b.slug === slug);

      if (beach) {
        const facilities = beach.facilities ? beach.facilities.join(', ') : '';
        const activities = beach.activities ? beach.activities.join(', ') : '';
        return `
          <article>
            <h1>${beach.name}</h1>
            <p><strong>Location:</strong> ${beach.location}, ${beach.region} Algarve</p>
            <p>${beach.description}</p>
            ${beach.longDescription ? `<div>${beach.longDescription}</div>` : ''}
            ${facilities ? `<p><strong>Facilities:</strong> ${facilities}</p>` : ''}
            ${activities ? `<p><strong>Activities:</strong> ${activities}</p>` : ''}
            ${beach.bestTime ? `<p><strong>Best Time to Visit:</strong> ${beach.bestTime}</p>` : ''}
            ${beach.parking ? `<p><strong>Parking:</strong> ${beach.parking}</p>` : ''}
          </article>
        `;
      }
    }
  }

  // Contact page
  if (route === '/contact') {
    return `
      <main>
        <h1>Contact Us</h1>
        <p>Get in touch with the Algarve Newsletter team. We'd love to hear from you about tips, suggestions, or collaborations.</p>
        <p>Email us or fill out the contact form below.</p>
      </main>
    `;
  }

  // Privacy page
  if (route === '/privacy') {
    return `
      <main>
        <h1>Privacy Policy</h1>
        <p>Learn how Algarve Newsletter collects, uses, and protects your personal information.</p>
      </main>
    `;
  }

  // Terms page
  if (route === '/terms') {
    return `
      <main>
        <h1>Terms of Use</h1>
        <p>Read the terms and conditions for using the Algarve Newsletter website and services.</p>
      </main>
    `;
  }

  // Default fallback
  return `
    <main>
      <h1>Algarve Newsletter</h1>
      <p>Discover. Connect. Explore.</p>
    </main>
  `;
}

/**
 * Generate a complete HTML page with proper meta tags for a route
 */
function generateStaticHTML(route, metadata) {
  const { title, description, ogImage, canonicalUrl, structuredData } = metadata;

  // Read the base index.html template
  const templatePath = path.join(DIST_DIR, 'index.html');
  let html = fs.readFileSync(templatePath, 'utf-8');

  // Update title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  // Update meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(description)}" />`
  );

  // Update OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(description)}" />`
  );
  if (ogImage) {
    html = html.replace(
      /<meta property="og:image" content="[^"]*" \/>/,
      `<meta property="og:image" content="${ogImage}" />`
    );
  }
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // Add or update canonical URL
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    );
  } else {
    html = html.replace(
      '</head>',
      `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`
    );
  }

  // Add structured data if provided
  if (structuredData) {
    const existingSchemaMatch = html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g);
    if (existingSchemaMatch) {
      // Replace last schema script with new one
      const lastIndex = html.lastIndexOf('</script>', html.indexOf('</head>'));
      html = html.slice(0, lastIndex + 9) +
        `\n  <script type="application/ld+json">\n${JSON.stringify(structuredData, null, 2)}\n  </script>` +
        html.slice(lastIndex + 9);
    }
  }

  // Inject pre-rendered content into the root div for SEO
  // This content will be replaced by React on hydration but gives Google something to index
  const content = getContentForRoute(route);

  // For blog articles, also embed the article data so React doesn't need to fetch it
  let embeddedData = '';
  if (route.startsWith('/blog/') && !route.includes('?')) {
    const slug = route.replace('/blog/', '');
    const articlePath = path.join(GENERATED_DIR, 'articles', `${slug}.json`);
    if (fs.existsSync(articlePath)) {
      const articleData = fs.readFileSync(articlePath, 'utf-8');
      embeddedData = `<script id="__PRELOADED_ARTICLE__" type="application/json">${articleData}</script>\n`;
    }
  }

  // For beach pages, embed the beach data
  if (route.startsWith('/beaches/') && !route.includes('?')) {
    const slug = route.replace('/beaches/', '');
    const beachesPath = path.join(DATA_DIR, 'beaches.json');
    if (fs.existsSync(beachesPath)) {
      const beachesData = JSON.parse(fs.readFileSync(beachesPath, 'utf-8'));
      const beach = beachesData.beaches.find(b => b.slug === slug);
      if (beach) {
        embeddedData = `<script id="__PRELOADED_BEACH__" type="application/json">${JSON.stringify(beach)}</script>\n`;
      }
    }
  }

  // Use regex that matches both empty root div and root div with existing content
  html = html.replace(
    /<div id="root">[\s\S]*?<\/div>\s*<\/body>/,
    `${embeddedData}<div id="root">${content}</div>\n</body>`
  );

  return html;
}

/**
 * Escape HTML entities
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Get metadata for a specific route
 */
function getMetadataForRoute(route) {
  const canonicalUrl = `${BASE_URL}${route.split('?')[0]}`;

  // Home page
  if (route === '/') {
    return {
      title: 'Algarve Newsletter | Discover. Connect. Explore.',
      description: 'Get our weekly curated list of secret spots, local events, and authentic experiences delivered straight to your inbox. No spam, just pure Algarve magic.',
      ogImage: `${BASE_URL}/favicon.png`,
      canonicalUrl: BASE_URL,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Algarve Newsletter',
        url: BASE_URL,
        description: 'Get our weekly curated list of secret spots, local events, and authentic experiences delivered straight to your inbox.'
      }
    };
  }

  // Blog index
  if (route === '/blog' || route.startsWith('/blog?')) {
    return {
      title: 'Algarve Travel Blog | Tips, Guides & Local Secrets',
      description: 'Discover the best of the Algarve with our travel guides, hidden gems, and local tips. From beaches to hiking trails, we cover it all.',
      ogImage: `${BASE_URL}/header-bg.jpg`,
      canonicalUrl: `${BASE_URL}/blog`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Algarve Newsletter Blog',
        url: `${BASE_URL}/blog`,
        description: 'Discover the best of the Algarve with our travel guides, hidden gems, and local tips.'
      }
    };
  }

  // Individual blog article
  if (route.startsWith('/blog/') && !route.includes('?')) {
    const slug = route.replace('/blog/', '');
    const articlePath = path.join(GENERATED_DIR, 'articles', `${slug}.json`);

    if (fs.existsSync(articlePath)) {
      const article = JSON.parse(fs.readFileSync(articlePath, 'utf-8'));
      return {
        title: `${article.title} | Algarve Newsletter`,
        description: article.description,
        ogImage: article.ogImage.startsWith('http') ? article.ogImage : `${BASE_URL}${article.ogImage}`,
        canonicalUrl: `${BASE_URL}/blog/${slug}`,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: article.title,
          description: article.description,
          image: article.ogImage.startsWith('http') ? article.ogImage : `${BASE_URL}${article.ogImage}`,
          datePublished: article.date,
          dateModified: article.lastModified || article.date,
          author: {
            '@type': 'Organization',
            name: article.author || 'Algarve Newsletter Team'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Algarve Newsletter',
            logo: {
              '@type': 'ImageObject',
              url: `${BASE_URL}/favicon.png`
            }
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${BASE_URL}/blog/${slug}`
          }
        }
      };
    }
  }

  // Beaches index
  if (route === '/beaches' || route.startsWith('/beaches?')) {
    const regionMatch = route.match(/region=(\w+)/);
    const region = regionMatch ? regionMatch[1] : null;
    const regionNames = { western: 'Western', central: 'Central', eastern: 'Eastern' };

    return {
      title: region
        ? `${regionNames[region]} Algarve Beaches | Beach Finder`
        : 'Algarve Beach Finder | 50+ Beaches with Photos & Details',
      description: region
        ? `Discover the best beaches in ${regionNames[region]} Algarve. Find hidden gems, family-friendly beaches, and surfing spots with detailed guides.`
        : 'Find your perfect Algarve beach. Filter by region, activities, and vibe. 50+ beaches with photos, maps, and insider tips.',
      ogImage: `${BASE_URL}/beaches.jpg`,
      canonicalUrl: `${BASE_URL}/beaches`,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Algarve Beach Finder',
        url: `${BASE_URL}/beaches`,
        description: 'Find your perfect Algarve beach. Filter by region, activities, and vibe.'
      }
    };
  }

  // Individual beach page
  if (route.startsWith('/beaches/') && !route.includes('?')) {
    const slug = route.replace('/beaches/', '');
    const beachesPath = path.join(DATA_DIR, 'beaches.json');

    if (fs.existsSync(beachesPath)) {
      const beachesData = JSON.parse(fs.readFileSync(beachesPath, 'utf-8'));
      const beach = beachesData.beaches.find(b => b.slug === slug);

      if (beach) {
        return {
          title: beach.metaTitle,
          description: beach.metaDescription,
          ogImage: beach.image.startsWith('http') ? beach.image : `${BASE_URL}${beach.image}`,
          canonicalUrl: `${BASE_URL}/beaches/${slug}`,
          structuredData: {
            '@context': 'https://schema.org',
            '@type': 'Beach',
            name: beach.name,
            description: beach.description,
            url: `${BASE_URL}/beaches/${slug}`,
            image: beach.image.startsWith('http') ? beach.image : `${BASE_URL}${beach.image}`,
            geo: {
              '@type': 'GeoCoordinates',
              latitude: beach.coordinates.lat,
              longitude: beach.coordinates.lng
            },
            amenityFeature: beach.facilities.map(f => ({
              '@type': 'LocationFeatureSpecification',
              name: f
            }))
          }
        };
      }
    }
  }

  // Contact page
  if (route === '/contact') {
    return {
      title: 'Contact Us | Algarve Newsletter',
      description: 'Get in touch with the Algarve Newsletter team. We\'d love to hear from you about tips, suggestions, or collaborations.',
      ogImage: `${BASE_URL}/favicon.png`,
      canonicalUrl: `${BASE_URL}/contact`
    };
  }

  // Privacy page
  if (route === '/privacy') {
    return {
      title: 'Privacy Policy | Algarve Newsletter',
      description: 'Learn how Algarve Newsletter collects, uses, and protects your personal information.',
      ogImage: `${BASE_URL}/favicon.png`,
      canonicalUrl: `${BASE_URL}/privacy`
    };
  }

  // Terms page
  if (route === '/terms') {
    return {
      title: 'Terms of Use | Algarve Newsletter',
      description: 'Read the terms and conditions for using the Algarve Newsletter website and services.',
      ogImage: `${BASE_URL}/favicon.png`,
      canonicalUrl: `${BASE_URL}/terms`
    };
  }

  // Default fallback
  return {
    title: 'Algarve Newsletter | Discover. Connect. Explore.',
    description: 'Get our weekly curated list of secret spots, local events, and authentic experiences delivered straight to your inbox.',
    ogImage: `${BASE_URL}/favicon.png`,
    canonicalUrl
  };
}

/**
 * Convert route to file path
 */
function routeToFilePath(route) {
  // Handle query string routes - create clean directory structure
  if (route.includes('?')) {
    // For filter pages, we'll skip them as they're variations of the main page
    // Google will still see them via the main page's JavaScript
    return null;
  }

  let filePath = route;
  if (filePath === '/') {
    filePath = '/index';
  }

  return path.join(DIST_DIR, `${filePath}.html`);
}

/**
 * Main pre-rendering function
 */
function prerender() {
  console.log('🚀 Starting pre-rendering process...\n');

  const routes = getAllRoutes();
  console.log(`📄 Found ${routes.length} routes to process\n`);

  let generated = 0;
  let skipped = 0;

  for (const route of routes) {
    const filePath = routeToFilePath(route);

    if (!filePath) {
      console.log(`⏭️  Skipping filter page: ${route}`);
      skipped++;
      continue;
    }

    // Create directory structure
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Get metadata and generate HTML
    const metadata = getMetadataForRoute(route);
    const html = generateStaticHTML(route, metadata);

    // Write the file
    fs.writeFileSync(filePath, html);
    console.log(`✅ Generated: ${route} -> ${path.relative(DIST_DIR, filePath)}`);
    generated++;
  }

  console.log(`\n🎉 Pre-rendering complete!`);
  console.log(`   Generated: ${generated} pages`);
  console.log(`   Skipped: ${skipped} filter pages\n`);
}

// Run the pre-renderer
prerender();
