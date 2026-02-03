import React from 'react';

interface ArticleContentProps {
  content: string;
  children?: React.ReactNode;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content, children }) => {
  // Insert children (like InlineSignup) after 40% of content
  const insertChildrenAtPercentage = (htmlContent: string, percentage: number) => {
    if (!children) return htmlContent;

    const paragraphs = htmlContent.split('</p>');
    const insertIndex = Math.floor(paragraphs.length * percentage);

    // We'll mark where to insert the children
    paragraphs.splice(insertIndex, 0, '<!-- CHILDREN_PLACEHOLDER -->');
    return paragraphs.join('</p>');
  };

  const processedContent = insertChildrenAtPercentage(content, 0.4);
  const [beforeChildren, afterChildren] = processedContent.split('<!-- CHILDREN_PLACEHOLDER -->');

  return (
    <article className="prose prose-lg prose-slate max-w-none">
      <style>{`
        .prose h1 {
          font-size: 2.25rem;
          font-weight: 900;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          color: #0f172a;
        }
        .prose h2 {
          font-size: 1.75rem;
          font-weight: 800;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: #0f172a;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e2e8f0;
        }
        .prose h3 {
          font-size: 1.25rem;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }
        .prose p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          color: #475569;
        }
        .prose ul, .prose ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .prose li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
          color: #475569;
        }
        .prose strong {
          color: #0f172a;
          font-weight: 700;
        }
        .prose a {
          color: #0891b2;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose a:hover {
          color: #0e7490;
        }
        .prose hr {
          margin: 2.5rem 0;
          border-color: #e2e8f0;
        }
        .prose code {
          background: #f1f5f9;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: #0f172a;
        }
        .prose pre {
          background: #1e293b;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin-bottom: 1.25rem;
        }
        .prose pre code {
          background: transparent;
          padding: 0;
          color: #e2e8f0;
        }
        .prose .article-image {
          margin: 2rem 0;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        }
        .prose .article-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .prose .article-image figcaption {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>

      <div dangerouslySetInnerHTML={{ __html: beforeChildren }} />

      {children}

      {afterChildren && (
        <div dangerouslySetInnerHTML={{ __html: afterChildren }} />
      )}
    </article>
  );
};

export default ArticleContent;
