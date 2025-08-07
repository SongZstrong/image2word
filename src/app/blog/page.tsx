import Image from 'next/image';
import Link from 'next/link';

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "How OCR Technology is Revolutionizing Document Processing",
      excerpt: "Discover how Optical Character Recognition (OCR) technology is transforming the way businesses handle document processing and data extraction.",
      date: "January 15, 2025",
      readTime: "5 min read",
      coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "The Future of Image-to-Text Conversion",
      excerpt: "Explore the latest advancements in image-to-text conversion technology and what the future holds for OCR applications.",
      date: "January 10, 2025",
      readTime: "4 min read",
      coverImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Best Practices for High-Quality OCR Results",
      excerpt: "Learn the essential tips and techniques to achieve the best possible results when converting images to text using OCR technology.",
      date: "January 5, 2025",
      readTime: "6 min read",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=center"
    },
    {
      id: 4,
      title: "Why I Switched to Online OCR Tools",
      excerpt: "After years of struggling with manual data entry, I finally found a better way. Here's my honest take on using online OCR tools for everyday tasks.",
      date: "January 20, 2025",
      readTime: "3 min read",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center"
    },
    {
      id: 5,
      title: "The Hidden Costs of Manual Text Extraction",
      excerpt: "Think manual data entry is cheap? Think again. Here's what I learned about the real costs of doing things the old-fashioned way.",
      date: "January 18, 2025",
      readTime: "4 min read",
      coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&crop=center"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-lg text-gray-600">
          Latest insights and updates about OCR technology and image processing
        </p>
      </div>

      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="relative h-48 md:h-full">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
              <div className="md:w-2/3 p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 