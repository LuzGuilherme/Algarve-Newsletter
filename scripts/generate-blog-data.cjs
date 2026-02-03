const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const readingTime = require('reading-time');

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'blog');
const OUTPUT_DIR = path.join(__dirname, '..', 'generated');
const ARTICLES_DIR = path.join(OUTPUT_DIR, 'articles');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extractHeadings(content) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    headings.push({ id, text, level });
  }

  return headings;
}

// Simple markdown to HTML converter
function markdownToHtml(content) {
  let html = content;

  // Code blocks (must be done first to avoid processing code content)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers - capture and create proper IDs
  html = html.replace(/^### (.+)$/gm, (match, text) => {
    const id = slugify(text);
    return `<h3 id="${id}">${text}</h3>`;
  });
  html = html.replace(/^## (.+)$/gm, (match, text) => {
    const id = slugify(text);
    return `<h2 id="${id}">${text}</h2>`;
  });
  html = html.replace(/^# (.+)$/gm, (match, text) => {
    const id = slugify(text);
    return `<h1 id="${id}">${text}</h1>`;
  });

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Images (must be before links to avoid conflict)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="article-image"><img src="$2" alt="$1" loading="lazy" /><figcaption>$1</figcaption></figure>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr>');

  // Process lists and paragraphs
  const lines = html.split('\n');
  const result = [];
  let inList = false;
  let listItems = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Empty line
    if (!trimmedLine) {
      if (inList) {
        result.push('<ul>' + listItems.join('') + '</ul>');
        listItems = [];
        inList = false;
      }
      result.push('');
      continue;
    }

    // List item
    if (trimmedLine.startsWith('- ')) {
      inList = true;
      listItems.push(`<li>${trimmedLine.slice(2)}</li>`);
      continue;
    }

    // Numbered list item
    if (/^\d+\.\s/.test(trimmedLine)) {
      if (!inList) {
        inList = true;
        listItems = [];
      }
      listItems.push(`<li>${trimmedLine.replace(/^\d+\.\s/, '')}</li>`);
      continue;
    }

    // If we were in a list, close it
    if (inList) {
      result.push('<ul>' + listItems.join('') + '</ul>');
      listItems = [];
      inList = false;
    }

    // Skip if already a block-level HTML tag (h1-h6, figure, pre, hr, ul, ol)
    if (trimmedLine.match(/^<(h[1-6]|figure|pre|hr|ul|ol|div|blockquote)/i)) {
      result.push(line);
      continue;
    }

    // Wrap in paragraph (including inline tags like <strong>, <em>, <a>)
    result.push(`<p>${trimmedLine}</p>`);
  }

  // Close any remaining list
  if (inList) {
    result.push('<ul>' + listItems.join('') + '</ul>');
  }

  return result.join('\n');
}

function processArticle(filename) {
  const filePath = path.join(CONTENT_DIR, filename);
  const fileContents = fs.readFileSync(filePath, 'utf-8');

  const { data: frontmatter, content } = matter(fileContents);

  // Skip drafts in production
  if (frontmatter.draft && process.env.NODE_ENV === 'production') {
    return null;
  }

  // Convert markdown to HTML
  const htmlContent = markdownToHtml(content);

  // Calculate reading time
  const stats = readingTime(content);

  // Extract headings for TOC
  const headings = extractHeadings(content);

  // Create excerpt (first 160 chars of content, stripped of markdown)
  const excerpt = content
    .replace(/^#.*$/gm, '')
    .replace(/[#*_\[\]`]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, 160) + '...';

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    slug: frontmatter.slug,
    author: frontmatter.author || 'Algarve Newsletter Team',
    keywords: frontmatter.keywords || [],
    ogImage: frontmatter.ogImage || '/blog/images/default-hero.jpg',
    lastModified: frontmatter.lastModified || frontmatter.date,
    categories: frontmatter.categories || [],
    tags: frontmatter.tags || [],
    featured: frontmatter.featured || false,
    draft: frontmatter.draft || false,
    hasMap: frontmatter.hasMap || false,
    mapDataFile: frontmatter.mapDataFile || null,
    content: htmlContent,
    excerpt,
    readingTime: Math.ceil(stats.minutes),
    wordCount: stats.words,
    headings
  };
}

function aggregateCategories(articles) {
  const counts = {};
  articles.forEach(article => {
    article.categories.forEach(cat => {
      if (!counts[cat]) {
        counts[cat] = { name: cat, slug: slugify(cat), count: 0 };
      }
      counts[cat].count++;
    });
  });
  return Object.values(counts).sort((a, b) => b.count - a.count);
}

function aggregateTags(articles) {
  const counts = {};
  articles.forEach(article => {
    article.tags.forEach(tag => {
      if (!counts[tag]) {
        counts[tag] = { name: tag, slug: slugify(tag), count: 0 };
      }
      counts[tag].count++;
    });
  });
  return Object.values(counts).sort((a, b) => b.count - a.count);
}

function generateBlogData() {
  console.log('Generating blog data...');

  // Check if content directory exists
  if (!fs.existsSync(CONTENT_DIR)) {
    console.log('No content/blog directory found. Creating empty blog index.');
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'blog-index.json'),
      JSON.stringify({ articles: [], categories: [], tags: [] })
    );
    return;
  }

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

  if (files.length === 0) {
    console.log('No markdown files found. Creating empty blog index.');
    fs.writeFileSync(
      path.join(OUTPUT_DIR, 'blog-index.json'),
      JSON.stringify({ articles: [], categories: [], tags: [] })
    );
    return;
  }

  console.log(`Found ${files.length} markdown files`);

  const articles = [];
  for (const file of files) {
    const article = processArticle(file);
    if (article) {
      articles.push(article);
      console.log(`  Processed: ${article.slug}`);
    }
  }

  // Sort by date descending
  articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Write individual article files
  articles.forEach(article => {
    const articlePath = path.join(ARTICLES_DIR, `${article.slug}.json`);
    fs.writeFileSync(articlePath, JSON.stringify(article, null, 2));
  });

  // Create metadata-only version for index (without full content)
  const articleMetas = articles.map(({ content, headings, ...meta }) => meta);

  // Write blog index
  const indexData = {
    articles: articleMetas,
    categories: aggregateCategories(articles),
    tags: aggregateTags(articles)
  };

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'blog-index.json'),
    JSON.stringify(indexData, null, 2)
  );

  console.log(`\nBlog data generated successfully!`);
  console.log(`  ${articles.length} articles`);
  console.log(`  ${indexData.categories.length} categories`);
  console.log(`  ${indexData.tags.length} tags`);
}

generateBlogData();
