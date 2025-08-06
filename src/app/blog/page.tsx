export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "How OCR Technology is Revolutionizing Document Processing",
      excerpt: "Discover how Optical Character Recognition (OCR) technology is transforming the way businesses handle document processing and data extraction.",
      date: "January 15, 2025",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "The Future of Image-to-Text Conversion",
      excerpt: "Explore the latest advancements in image-to-text conversion technology and what the future holds for OCR applications.",
      date: "January 10, 2025",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Best Practices for High-Quality OCR Results",
      excerpt: "Learn the essential tips and techniques to achieve the best possible results when converting images to text using OCR technology.",
      date: "January 5, 2025",
      readTime: "6 min read"
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
          <article key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              Read more →
            </button>
          </article>
        ))}
      </div>
    </div>
  );
} 