create table if not exists public.img2word_blog_posts (
  id integer primary key,
  title text not null,
  excerpt text not null,
  cover_image_url text not null,
  read_time_minutes integer not null,
  published_at timestamptz not null,
  sections jsonb not null,
  created_at timestamptz not null default now()
);

alter table if exists public.img2word_blog_posts
  alter column published_at type timestamptz
  using published_at::timestamptz;

alter table if exists public.img2word_blog_posts
  drop column if exists content_html;

alter table if exists public.img2word_blog_posts
  add column if not exists sections jsonb not null default '[]'::jsonb;

alter table public.img2word_blog_posts enable row level security;

drop policy if exists "Public read access to img2word_blog_posts"
  on public.img2word_blog_posts;

create policy "Public read access to img2word_blog_posts"
  on public.img2word_blog_posts
  for select
  using (true);

insert into public.img2word_blog_posts (
  id,
  title,
  excerpt,
  cover_image_url,
  read_time_minutes,
  published_at,
  sections
) values
  (
    1,
    $$How OCR Technology is Revolutionizing Document Processing$$,
    $$Discover how Optical Character Recognition (OCR) technology is transforming the way businesses handle document processing and data extraction.$$,
    $$https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&crop=center$$,
    5,
    '2025-01-15T09:00:00Z',
    $$
[
  {
    "heading": "Introduction",
    "paragraphs": [
      "Document processing has always been a bottleneck in business operations. For years, companies relied on manual data entry, a process that was not only time-consuming but also prone to errors. Enter OCR technology - a game-changer that's transforming how we handle documents."
    ]
  },
  {
    "heading": "What is OCR Technology?",
    "paragraphs": [
      "Optical Character Recognition, or OCR, is a technology that converts different types of documents, such as scanned paper documents, PDF files, or images captured by a digital camera, into editable and searchable data."
    ]
  },
  {
    "heading": "The Business Impact",
    "paragraphs": [
      "Companies using OCR technology report significant improvements in efficiency. What used to take hours of manual work can now be completed in minutes. The accuracy rates have improved dramatically, reducing errors that could cost businesses thousands of dollars."
    ]
  },
  {
    "heading": "Real-World Applications",
    "paragraphs": [
      "From invoice processing to form digitization, OCR is everywhere. Banks use it to process checks, healthcare providers digitize patient records, and retail businesses automate receipt processing. The applications are endless."
    ]
  },
  {
    "heading": "Looking Ahead",
    "paragraphs": [
      "As AI and machine learning continue to advance, OCR technology is becoming even more sophisticated. We're seeing improvements in handwriting recognition, multi-language support, and the ability to understand document context.",
      "The future of document processing is here, and it's powered by OCR technology."
    ]
  }
]
    $$::jsonb
  ),
  (
    2,
    $$The Future of Image-to-Text Conversion$$,
    $$Explore the latest advancements in image-to-text conversion technology and what the future holds for OCR applications.$$,
    $$https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=400&fit=crop&crop=center$$,
    4,
    '2025-01-10T14:30:00Z',
    $$
[
  {
    "heading": "Introduction",
    "paragraphs": [
      "Image-to-text conversion has come a long way since its inception. What started as basic character recognition has evolved into sophisticated AI-powered systems that can understand context, recognize handwriting, and even translate languages on the fly."
    ]
  },
  {
    "heading": "Current State of Technology",
    "paragraphs": [
      "Today's image-to-text converters are incredibly accurate, often achieving 99%+ accuracy rates on clear, printed text. They can handle multiple languages, different fonts, and even some handwriting styles."
    ]
  },
  {
    "heading": "AI and Machine Learning Integration",
    "paragraphs": [
      "The integration of AI and machine learning has revolutionized this field. Modern systems can learn from their mistakes, improve over time, and adapt to new document types and formats."
    ]
  },
  {
    "heading": "Mobile Revolution",
    "paragraphs": [
      "With the rise of smartphones, image-to-text conversion has become more accessible than ever. Users can now capture documents with their phone cameras and convert them to text instantly."
    ]
  },
  {
    "heading": "Future Possibilities",
    "paragraphs": [
      "Looking ahead, we can expect even more advanced features: real-time translation, voice-to-text integration, and the ability to understand complex document layouts and structures.",
      "The future is bright for image-to-text technology, and we're just getting started."
    ]
  }
]
    $$::jsonb
  ),
  (
    3,
    $$Best Practices for High-Quality OCR Results$$,
    $$Learn the essential tips and techniques to achieve the best possible results when converting images to text using OCR technology.$$,
    $$https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=center$$,
    6,
    '2025-01-05T08:45:00Z',
    $$
[
  {
    "heading": "Introduction",
    "paragraphs": [
      "Getting the best results from OCR technology isn't just about using the right tool - it's about preparing your documents properly and understanding how the technology works."
    ]
  },
  {
    "heading": "Image Quality Matters",
    "paragraphs": [
      "The quality of your input image directly affects OCR accuracy. High-resolution images with good contrast work best. Avoid blurry, low-resolution, or poorly lit images."
    ]
  },
  {
    "heading": "Document Preparation",
    "paragraphs": [
      "Before scanning or photographing documents, ensure they're clean and flat. Remove any staples, folds, or marks that might interfere with text recognition."
    ]
  },
  {
    "heading": "Language Selection",
    "paragraphs": [
      "Always select the correct language for your document. OCR tools work much better when they know what language to expect. Mixed-language documents may require multiple passes."
    ]
  },
  {
    "heading": "Post-Processing",
    "paragraphs": [
      "Even the best OCR results benefit from human review. Check for common errors like misread numbers or letters, and correct any formatting issues."
    ]
  },
  {
    "heading": "Advanced Techniques",
    "paragraphs": [
      "For complex documents, consider using specialized OCR tools designed for specific document types like invoices, forms, or handwritten text.",
      "Following these best practices will significantly improve your OCR results and save you time in the long run."
    ]
  }
]
    $$::jsonb
  ),
  (
    4,
    $$Why I Switched to Online OCR Tools$$,
    $$After years of struggling with manual data entry, I finally found a better way. Here's my honest take on using online OCR tools for everyday tasks.$$,
    $$https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center$$,
    3,
    '2025-01-20T11:15:00Z',
    $$
[
  {
    "heading": "Introduction",
    "paragraphs": [
      "Let me be honest - I used to think online OCR tools were just another tech gimmick. I was perfectly happy with my manual data entry routine, even though it took forever and drove me crazy with typos."
    ]
  },
  {
    "heading": "The Breaking Point",
    "paragraphs": [
      "It all changed when I had to process 50 handwritten receipts for expense reports. After spending three hours typing them up, I realized there had to be a better way. That's when I discovered online OCR tools."
    ]
  },
  {
    "heading": "First Impressions",
    "paragraphs": [
      "I was skeptical at first. How could a free online tool possibly be better than my careful manual work? But the results were eye-opening. What took me 10 minutes to type, the OCR tool processed in 30 seconds."
    ]
  },
  {
    "heading": "Real Benefits I Found",
    "paragraphs": [
      "The biggest surprise was accuracy. With good quality images, the tools were actually more accurate than my tired eyes after hours of typing. Plus, I could process multiple documents at once."
    ]
  },
  {
    "heading": "Time Savings",
    "paragraphs": [
      "What used to take me hours now takes minutes. I can process a stack of documents while my coffee is still brewing. The time savings alone made the switch worthwhile."
    ]
  },
  {
    "heading": "My Advice",
    "paragraphs": [
      "If you're still doing manual data entry, give online OCR tools a try. Start with a simple document to see the difference. You might be surprised by how much time you can save."
    ]
  }
]
    $$::jsonb
  ),
  (
    5,
    $$The Hidden Costs of Manual Text Extraction$$,
    $$Think manual data entry is cheap? Think again. Here's what I learned about the real costs of doing things the old-fashioned way.$$,
    $$https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&crop=center$$,
    4,
    '2025-01-18T16:05:00Z',
    $$
[
  {
    "heading": "Introduction",
    "paragraphs": [
      "When I first started looking into OCR solutions, my boss asked me to calculate the real cost of our current manual data entry process. What I found shocked everyone in the office."
    ]
  },
  {
    "heading": "The Obvious Costs",
    "paragraphs": [
      "We were paying $15 per hour for data entry work. With 40 hours per week, that's $600 per week, $2,400 per month. But that's just the tip of the iceberg."
    ]
  },
  {
    "heading": "The Hidden Costs",
    "paragraphs": [
      "Error correction was eating up another 20% of our time. Every typo meant someone had to find it, fix it, and verify the correction. That's an additional $480 per month in hidden costs."
    ]
  },
  {
    "heading": "Opportunity Costs",
    "paragraphs": [
      "While our team was stuck typing, they couldn't work on more valuable tasks like analysis, customer service, or process improvement. This opportunity cost was harder to measure but potentially much larger."
    ]
  },
  {
    "heading": "Turnaround Time",
    "paragraphs": [
      "Manual processing meant delays. Documents that could be processed instantly with OCR were taking days to complete. This affected our customer satisfaction and internal workflow."
    ]
  },
  {
    "heading": "The ROI Calculation",
    "paragraphs": [
      "When I compared the monthly cost of manual processing ($2,880) to the cost of OCR tools (around $100), the decision was obvious. We could save over $2,700 per month while improving accuracy and speed."
    ]
  },
  {
    "heading": "Lessons Learned",
    "paragraphs": [
      "The real cost of manual data entry isn't just the hourly rate - it's the errors, delays, and missed opportunities. Modern OCR tools aren't just convenient; they're essential for staying competitive.",
      "Sometimes the 'cheap' option ends up being the most expensive choice."
    ]
  }
]
    $$::jsonb
  )
on conflict (id) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  cover_image_url = excluded.cover_image_url,
  read_time_minutes = excluded.read_time_minutes,
  published_at = excluded.published_at,
  sections = excluded.sections;
