import 'server-only';

import { supabaseAdmin } from './supabaseAdmin';
import type { BlogPost, BlogPostSection, NewBlogPost } from './blog';

type BlogPostRow = {
  id: number;
  title: string;
  excerpt: string;
  cover_image_url: string;
  read_time_minutes: number;
  published_at: string;
  sections?: unknown;
};

const detailFields = 'id,title,excerpt,cover_image_url,read_time_minutes,published_at,sections';

const mapSections = (sections: unknown): BlogPostSection[] => {
  if (!Array.isArray(sections)) {
    return [];
  }

  const result: BlogPostSection[] = [];

  for (const rawSection of sections) {
    if (!rawSection || typeof rawSection !== 'object') {
      continue;
    }

    const section = rawSection as Record<string, unknown>;
    const heading = typeof section.heading === 'string' ? section.heading : undefined;
    const paragraphsRaw = Array.isArray(section.paragraphs) ? section.paragraphs : [];
    const paragraphs = paragraphsRaw.filter(
      (paragraph: unknown): paragraph is string => typeof paragraph === 'string'
    );

    if (!heading && paragraphs.length === 0) {
      continue;
    }

    result.push({
      heading,
      paragraphs,
    });
  }

  return result;
};

const mapDetailRow = (row: BlogPostRow): BlogPost => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt,
  coverImageUrl: row.cover_image_url,
  readTimeMinutes: row.read_time_minutes,
  publishedAt: row.published_at,
  sections: mapSections(row.sections),
});

export const createBlogPost = async (input: NewBlogPost): Promise<BlogPost | null> => {
  const { data, error } = await supabaseAdmin
    .from('img2word_blog_posts')
    .insert({
      id: input.id,
      title: input.title,
      excerpt: input.excerpt,
      cover_image_url: input.coverImageUrl,
      read_time_minutes: input.readTimeMinutes,
      published_at: input.publishedAt,
      sections: input.sections,
    })
    .select(detailFields)
    .single();

  if (error) {
    console.error('Failed to create blog post.', error);
    return null;
  }

  return mapDetailRow(data);
};
