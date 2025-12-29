import type { BlogPostSection } from '@/lib/blog';

type BlogPostContentProps = {
  sections: BlogPostSection[];
};

export default function BlogPostContent({ sections }: BlogPostContentProps) {
  if (sections.length === 0) {
    return <div className="text-gray-600">Content coming soon.</div>;
  }

  return (
    <div className="prose prose-lg max-w-none space-y-8">
      {sections.map((section, index) => (
        <section key={`${section.heading ?? 'section'}-${index}`} className="space-y-4">
          {section.heading ? <h2>{section.heading}</h2> : null}
          {section.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={`${index}-${paragraphIndex}`}>{paragraph}</p>
          ))}
        </section>
      ))}
    </div>
  );
}
