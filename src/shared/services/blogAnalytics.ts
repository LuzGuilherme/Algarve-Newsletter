import { trackEvent } from './analytics';

export const trackArticleView = (slug: string, title: string) => {
  trackEvent('article_view', 'blog', title);

  // GA4 enhanced measurement
  if ((window as any).gtag) {
    (window as any).gtag('event', 'page_view', {
      page_title: title,
      page_location: window.location.href,
      content_type: 'article',
      article_slug: slug
    });
  }
};

export const trackScrollDepth = (slug: string): (() => void) => {
  const thresholds = [25, 50, 75, 90, 100];
  const triggered = new Set<number>();
  const startTime = Date.now();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    thresholds.forEach(threshold => {
      if (scrollPercent >= threshold && !triggered.has(threshold)) {
        triggered.add(threshold);
        trackEvent('scroll_depth', 'blog', slug, threshold);

        if ((window as any).gtag) {
          (window as any).gtag('event', 'scroll', {
            percent_scrolled: threshold,
            article_slug: slug
          });
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', handleScroll);

    // Track total read time on unmount
    const readTimeSeconds = Math.round((Date.now() - startTime) / 1000);
    trackEvent('read_time', 'blog', slug, readTimeSeconds);

    if ((window as any).gtag) {
      (window as any).gtag('event', 'article_read_time', {
        article_slug: slug,
        read_time_seconds: readTimeSeconds
      });
    }
  };
};

export const trackSignupFromArticle = (slug: string) => {
  trackEvent('blog_signup_conversion', 'blog', slug);

  if ((window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      source: 'blog_article',
      article_slug: slug
    });
  }

  // Facebook Pixel
  if ((window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      content_name: slug,
      content_category: 'blog_article'
    });
  }
};
