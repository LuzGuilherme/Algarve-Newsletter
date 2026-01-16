export interface BlogArticle {
  // Frontmatter fields
  title: string;
  description: string;
  date: string;
  slug: string;
  author: string;
  keywords: string[];
  ogImage: string;
  lastModified: string;
  categories: string[];
  tags: string[];
  featured: boolean;
  draft: boolean;

  // Generated at build time
  content: string;
  excerpt: string;
  readingTime: number;
  wordCount: number;
  headings: TableOfContentsItem[];
}

export interface BlogArticleMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  author: string;
  ogImage: string;
  readingTime: number;
  categories: string[];
  tags: string[];
  featured: boolean;
}

export interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogIndexData {
  articles: BlogArticleMeta[];
  categories: CategoryCount[];
  tags: TagCount[];
}

export interface CategoryCount {
  name: string;
  slug: string;
  count: number;
}

export interface TagCount {
  name: string;
  slug: string;
  count: number;
}
