import Script from 'next/script';

interface SEOProps {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article' | 'tool';
  image?: string;
  keywords?: string[];
}

export default function SEO({ 
  title, 
  description, 
  url, 
  type = 'website',
  image = 'https://image2word.com/og-image.jpg',
  keywords = []
}: SEOProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'tool' ? 'WebApplication' : 'WebPage',
    "name": title,
    "description": description,
    "url": url,
    "image": image,
    "keywords": keywords.join(', '),
    "author": {
      "@type": "Organization",
      "name": "image2word.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "image2word.com",
      "url": "https://image2word.com"
    },
    ...(type === 'tool' && {
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    })
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
