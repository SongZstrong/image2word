import HomeClient from "@/components/HomeClient";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to Text Converter Online Free",
  description: "Free online image to text converter with powerful OCR technology. Convert images to text, Word, and PDF instantly.",
  url: "https://image2word.com",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD"
  },
  featureList: [
    "Image to Text Conversion",
    "Multi-Language Support",
    "Image to PDF Conversion",
    "Image to Word Conversion",
    "Privacy-First Processing",
    "Free and Unlimited Access"
  ],
  author: {
    "@type": "Organization",
    name: "image2word.com"
  },
  publisher: {
    "@type": "Organization",
    name: "image2word.com",
    url: "https://image2word.com"
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <HomeClient />
    </>
  );
}
