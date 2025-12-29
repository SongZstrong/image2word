'use client';

import { Share2 } from 'lucide-react';

type BlogShareButtonProps = {
  title: string;
  excerpt: string;
};

export default function BlogShareButton({ title, excerpt }: BlogShareButtonProps) {
  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({
        title,
        text: excerpt,
        url,
      });
      return;
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
      return;
    }

    window.prompt('Copy this link:', url);
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
    >
      <Share2 className="h-4 w-4 mr-1" />
      Share
    </button>
  );
}
