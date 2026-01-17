import ImageToWordClient from "@/components/ImageToWordClient";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to Word Converter",
  description: "Convert images to Word documents online free. Upload an image and download as a Word file instantly.",
  url: "https://image2word.com/image-to-word",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  publisher: {
    "@type": "Organization",
    name: "image2word.com",
    url: "https://image2word.com",
  },
};

export default function ImageToWordPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ImageToWordClient />
    </>
  );
}
