export type BlogPostListItem = {
  id: number;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  readTimeMinutes: number;
  publishedAt: string;
};

export type BlogPostSection = {
  heading?: string;
  paragraphs: string[];
};

export type BlogPost = BlogPostListItem & {
  sections: BlogPostSection[];
};

export type NewBlogPost = {
  id: number;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  readTimeMinutes: number;
  publishedAt: string;
  sections: BlogPostSection[];
};

export const formatBlogDate = (dateString: string): string => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }).format(date);
};

export const formatReadTime = (minutes: number): string => {
  if (!Number.isFinite(minutes)) {
    return '';
  }

  return `${minutes} min read`;
};
