/**
 * SEO Configuration
 * Centralized configuration for SEO-related constants
 */

export const SITE_DOMAIN = 'https://algarvenewsletter.pt';

export const SEO_CONFIG = {
  domain: SITE_DOMAIN,
  sitemapUrl: `${SITE_DOMAIN}/sitemap.xml`,
  robotsUrl: `${SITE_DOMAIN}/robots.txt`,

  // Social media and verification
  facebookPageId: '879119607828644',
  googleAnalyticsId: 'G-84V94EQ9LB',

  // Organization info
  organization: {
    name: 'Algarve Newsletter',
    url: SITE_DOMAIN,
    logo: `${SITE_DOMAIN}/favicon.png`,
  },

  // Default meta tags
  defaultTitle: 'Algarve Newsletter | Discover. Connect. Explore.',
  defaultDescription: 'Get our weekly curated list of secret spots, local events, and authentic experiences delivered straight to your inbox. No spam, just pure Algarve magic.',

  // URL builders
  buildCanonicalUrl: (path: string) => {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_DOMAIN}${cleanPath}`;
  },

  buildBlogUrl: (slug: string) => `${SITE_DOMAIN}/blog/${slug}`,
  buildBeachUrl: (slug: string) => `${SITE_DOMAIN}/beaches/${slug}`,
  buildBeachFinderUrl: (filter?: string) => {
    if (filter) {
      return `${SITE_DOMAIN}/beaches/${filter}`;
    }
    return `${SITE_DOMAIN}/beaches`;
  },
};

export default SEO_CONFIG;
