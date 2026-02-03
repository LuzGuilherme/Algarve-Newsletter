import React, { useState } from 'react';
import { Twitter, Facebook, Link, MessageCircle } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);

  const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const buttonClass = "p-3 rounded-full bg-slate-100 hover:bg-cyan-100 transition-all hover:scale-110 active:scale-95";
  const iconClass = "w-5 h-5 text-slate-600";

  return (
    <div className="flex items-center gap-4 py-8 border-t border-b border-slate-100 my-8">
      <span className="text-slate-500 text-sm font-semibold">Share this article:</span>

      <div className="flex items-center gap-3">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          title="Share on Twitter"
        >
          <Twitter className={iconClass} />
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          title="Share on Facebook"
        >
          <Facebook className={iconClass} />
        </a>

        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
          title="Share on WhatsApp"
        >
          <MessageCircle className={iconClass} />
        </a>

        <button
          onClick={copyToClipboard}
          className={buttonClass}
          title="Copy link"
        >
          <Link className={iconClass} />
        </button>

        {copied && (
          <span className="text-emerald-600 text-sm font-semibold animate-pulse">
            Link copied!
          </span>
        )}
      </div>
    </div>
  );
};

export default ShareButtons;
