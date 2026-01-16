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
    .map((rawSection) => {
      if (!rawSection || typeof rawSection !== 'object') {
        return null;
      }

      const sectionData = rawSection as Record<string, unknown>;
      const heading = typeof sectionData.heading === 'string' ? sectionData.heading : undefined;
      const paragraphsRaw = Array.isArray(sectionData.paragraphs) ? sectionData.paragraphs : [];
      const paragraphs = paragraphsRaw.filter(
        (paragraph: unknown): paragraph is string => typeof paragraph === 'string'
      );

      if (!heading && paragraphs.length === 0) {
        return null;
      }

      const normalizedSection: BlogPostSection = { paragraphs };

      if (heading !== undefined) {
        normalizedSection.heading = heading;
      }

      return normalizedSection;
    })
    .filter((section): section is BlogPostSection => section !== null);
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
