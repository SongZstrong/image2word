import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import BlogShareButton from '@/components/BlogShareButton';
import BlogPostContent from '@/components/BlogPostContent';
import { getBlogPostById, getBlogPosts } from '@/lib/blog.server';
import { formatBlogDate, formatReadTime } from '@/lib/blog';

type BlogPostPageProps = {
  params: Promise<{ id: string }>;
};

const baseUrl = "https://image2word.com";

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const postId = Number.parseInt(id, 10);

  if (Number.isNaN(postId)) {
    return {
      title: "Blog Post Not Found | image2word.com",
      description: "The blog post you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
      alternates: {
        canonical: `${baseUrl}/blog`,
      },
    };
  }

  const post = await getBlogPostById(postId);

  if (!post) {
    return {
      title: "Blog Post Not Found | image2word.com",
      description: "The blog post you are looking for does not exist.",
      robots: {
        index: false,
        follow: false,
      },
      alternates: {
        canonical: `${baseUrl}/blog`,
      },
    };
  }

  return {
    title: `${post.title} | image2word.com`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${post.id}`,
      type: "article",
      images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
    alternates: {
      canonical: `${baseUrl}/blog/${post.id}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const postId = Number.parseInt(id, 10);

  if (Number.isNaN(postId)) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const [post, blogPosts] = await Promise.all([
    getBlogPostById(postId),
    getBlogPosts(),
  ]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: "image2word.com",
    },
    publisher: {
      "@type": "Organization",
      name: "image2word.com",
      url: baseUrl,
    },
    mainEntityOfPage: `${baseUrl}/blog/${post.id}`,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <article>
        <div className="mb-8">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatBlogDate(post.publishedAt)}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {formatReadTime(post.readTimeMinutes)}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BlogShareButton title={post.title} excerpt={post.excerpt} />
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        {/* Article Content */}
        <BlogPostContent sections={post.sections} />
      </article>

      {/* Related Posts */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogPosts
            .filter(p => p.id !== post.id)
            .slice(0, 2)
            .map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.id}`}
                className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  {relatedPost.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{relatedPost.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{formatBlogDate(relatedPost.publishedAt)}</span>
                  <span>{formatReadTime(relatedPost.readTimeMinutes)}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
} 
