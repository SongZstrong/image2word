'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';

// 博客文章数据
const blogPosts = [
  {
    id: 1,
    title: "How OCR Technology is Revolutionizing Document Processing",
    excerpt: "Discover how Optical Character Recognition (OCR) technology is transforming the way businesses handle document processing and data extraction.",
    date: "January 15, 2025",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center",
    content: `
      <p>Document processing has always been a bottleneck in business operations. For years, companies relied on manual data entry, a process that was not only time-consuming but also prone to errors. Enter OCR technology – a game-changer that's transforming how we handle documents.</p>
      
      <h2>What is OCR Technology?</h2>
      <p>Optical Character Recognition, or OCR, is a technology that converts different types of documents, such as scanned paper documents, PDF files, or images captured by a digital camera, into editable and searchable data.</p>
      
      <h2>The Business Impact</h2>
      <p>Companies using OCR technology report significant improvements in efficiency. What used to take hours of manual work can now be completed in minutes. The accuracy rates have improved dramatically, reducing errors that could cost businesses thousands of dollars.</p>
      
      <h2>Real-World Applications</h2>
      <p>From invoice processing to form digitization, OCR is everywhere. Banks use it to process checks, healthcare providers digitize patient records, and retail businesses automate receipt processing. The applications are endless.</p>
      
      <h2>Looking Ahead</h2>
      <p>As AI and machine learning continue to advance, OCR technology is becoming even more sophisticated. We're seeing improvements in handwriting recognition, multi-language support, and the ability to understand document context.</p>
      
      <p>The future of document processing is here, and it's powered by OCR technology.</p>
    `
  },
  {
    id: 2,
    title: "The Future of Image-to-Text Conversion",
    excerpt: "Explore the latest advancements in image-to-text conversion technology and what the future holds for OCR applications.",
    date: "January 10, 2025",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop&crop=center",
    content: `
      <p>Image-to-text conversion has come a long way since its inception. What started as basic character recognition has evolved into sophisticated AI-powered systems that can understand context, recognize handwriting, and even translate languages on the fly.</p>
      
      <h2>Current State of Technology</h2>
      <p>Today's image-to-text converters are incredibly accurate, often achieving 99%+ accuracy rates on clear, printed text. They can handle multiple languages, different fonts, and even some handwriting styles.</p>
      
      <h2>AI and Machine Learning Integration</h2>
      <p>The integration of AI and machine learning has revolutionized this field. Modern systems can learn from their mistakes, improve over time, and adapt to new document types and formats.</p>
      
      <h2>Mobile Revolution</h2>
      <p>With the rise of smartphones, image-to-text conversion has become more accessible than ever. Users can now capture documents with their phone cameras and convert them to text instantly.</p>
      
      <h2>Future Possibilities</h2>
      <p>Looking ahead, we can expect even more advanced features: real-time translation, voice-to-text integration, and the ability to understand complex document layouts and structures.</p>
      
      <p>The future is bright for image-to-text technology, and we're just getting started.</p>
    `
  },
  {
    id: 3,
    title: "Best Practices for High-Quality OCR Results",
    excerpt: "Learn the essential tips and techniques to achieve the best possible results when converting images to text using OCR technology.",
    date: "January 5, 2025",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=center",
    content: `
      <p>Getting the best results from OCR technology isn't just about using the right tool – it's about preparing your documents properly and understanding how the technology works.</p>
      
      <h2>Image Quality Matters</h2>
      <p>The quality of your input image directly affects OCR accuracy. High-resolution images with good contrast work best. Avoid blurry, low-resolution, or poorly lit images.</p>
      
      <h2>Document Preparation</h2>
      <p>Before scanning or photographing documents, ensure they're clean and flat. Remove any staples, folds, or marks that might interfere with text recognition.</p>
      
      <h2>Language Selection</h2>
      <p>Always select the correct language for your document. OCR tools work much better when they know what language to expect. Mixed-language documents may require multiple passes.</p>
      
      <h2>Post-Processing</h2>
      <p>Even the best OCR results benefit from human review. Check for common errors like misread numbers or letters, and correct any formatting issues.</p>
      
      <h2>Advanced Techniques</h2>
      <p>For complex documents, consider using specialized OCR tools designed for specific document types like invoices, forms, or handwritten text.</p>
      
      <p>Following these best practices will significantly improve your OCR results and save you time in the long run.</p>
    `
  },
  {
    id: 4,
    title: "Why I Switched to Online OCR Tools",
    excerpt: "After years of struggling with manual data entry, I finally found a better way. Here's my honest take on using online OCR tools for everyday tasks.",
    date: "January 20, 2025",
    readTime: "3 min read",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center",
    content: `
      <p>Let me be honest – I used to think online OCR tools were just another tech gimmick. I was perfectly happy with my manual data entry routine, even though it took forever and drove me crazy with typos.</p>
      
      <h2>The Breaking Point</h2>
      <p>It all changed when I had to process 50 handwritten receipts for expense reports. After spending three hours typing them up, I realized there had to be a better way. That&apos;s when I discovered online OCR tools.</p>
      
      <h2>First Impressions</h2>
      <p>I was skeptical at first. How could a free online tool possibly be better than my careful manual work? But the results were eye-opening. What took me 10 minutes to type, the OCR tool processed in 30 seconds.</p>
      
      <h2>Real Benefits I Found</h2>
      <p>The biggest surprise was accuracy. With good quality images, the tools were actually more accurate than my tired eyes after hours of typing. Plus, I could process multiple documents at once.</p>
      
      <h2>Time Savings</h2>
      <p>What used to take me hours now takes minutes. I can process a stack of documents while my coffee is still brewing. The time savings alone made the switch worthwhile.</p>
      
      <h2>My Advice</h2>
      <p>If you&apos;re still doing manual data entry, give online OCR tools a try. Start with a simple document to see the difference. You might be surprised by how much time you can save.</p>

    `
  },
  {
    id: 5,
    title: "The Hidden Costs of Manual Text Extraction",
    excerpt: "Think manual data entry is cheap? Think again. Here's what I learned about the real costs of doing things the old-fashioned way.",
    date: "January 18, 2025",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&crop=center",
    content: `
      <p>When I first started looking into OCR solutions, my boss asked me to calculate the &quot;real cost&quot; of our current manual data entry process. What I found shocked everyone in the office.</p>
      
      <h2>The Obvious Costs</h2>
      <p>We were paying $15 per hour for data entry work. With 40 hours per week, that&apos;s $600 per week, $2,400 per month. But that&apos;s just the tip of the iceberg.</p>
      
      <h2>The Hidden Costs</h2>
      <p>Error correction was eating up another 20% of our time. Every typo meant someone had to find it, fix it, and verify the correction. That&apos;s an additional $480 per month in hidden costs.</p>
      
      <h2>Opportunity Costs</h2>
      <p>While our team was stuck typing, they couldn&apos;t work on more valuable tasks like analysis, customer service, or process improvement. This opportunity cost was harder to measure but potentially much larger.</p>
      
      <h2>Turnaround Time</h2>
      <p>Manual processing meant delays. Documents that could be processed instantly with OCR were taking days to complete. This affected our customer satisfaction and internal workflow.</p>
      
      <h2>The ROI Calculation</h2>
      <p>When I compared the monthly cost of manual processing ($2,880) to the cost of OCR tools (around $100), the decision was obvious. We could save over $2,700 per month while improving accuracy and speed.</p>
      
      <h2>Lessons Learned</h2>
      <p>The real cost of manual data entry isn&apos;t just the hourly rate – it&apos;s the errors, delays, and missed opportunities. Modern OCR tools aren&apos;t just convenient; they&apos;re essential for staying competitive.</p>
      
      <p>Sometimes the &quot;cheap&quot; option ends up being the most expensive choice.</p>
    `
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  
  const post = blogPosts.find(p => p.id === postId);
  
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{post.excerpt}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleShare}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
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
                  <span>{relatedPost.date}</span>
                  <span>{relatedPost.readTime}</span>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
} 