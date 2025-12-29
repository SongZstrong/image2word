import 'server-only';

import { supabase } from './supabaseClient';
import type { BlogPost, BlogPostListItem, BlogPostSection } from './blog';

type BlogPostRow = {
  id: number;
  title: string;
  excerpt: string;
  cover_image_url: string;
  read_time_minutes: number;
  published_at: string;
  sections?: unknown;
};

const listFields = 'id,title,excerpt,cover_image_url,read_time_minutes,published_at';
const detailFields = `${listFields},sections`;

const mapSections = (sections: unknown): BlogPostSection[] => {
  if (!Array.isArray(sections)) {
    return [];
  }

  return sections
    .map((section) => {
      if (!section || typeof section !== 'object') {
        return null;
      }

      const heading =
        'heading' in section && typeof section.heading === 'string'
          ? section.heading
          : undefined;

      const paragraphs =
        'paragraphs' in section && Array.isArray(section.paragraphs)
          ? section.paragraphs.filter((paragraph) => typeof paragraph === 'string')
          : [];

      if (!heading && paragraphs.length === 0) {
        return null;
      }

      return {
        heading,
        paragraphs,
      };
    })
    .filter((section): section is BlogPostSection => Boolean(section));
};

const mapListRow = (row: BlogPostRow): BlogPostListItem => ({
  id: row.id,
  title: row.title,
  excerpt: row.excerpt,
  coverImageUrl: row.cover_image_url,
  readTimeMinutes: row.read_time_minutes,
  publishedAt: row.published_at,
});

const mapDetailRow = (row: BlogPostRow): BlogPost => ({
  ...mapListRow(row),
  sections: mapSections(row.sections),
});

export const getBlogPosts = async (): Promise<BlogPostListItem[]> => {
  const { data, error } = await supabase
    .from('img2word_blog_posts')
    .select(listFields)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch blog posts.', error);
    return [];
  }

  return (data ?? []).map(mapListRow);
};

export const getBlogPostById = async (id: number): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('img2word_blog_posts')
    .select(detailFields)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Failed to fetch blog post.', error);
    return null;
  }

  return data ? mapDetailRow(data) : null;
};
