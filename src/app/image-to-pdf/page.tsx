import ImageToPdfClient from "@/components/ImageToPdfClient";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Image to PDF Converter",
  description: "Convert multiple images to PDF documents online free. Upload, arrange, rotate images and create PDFs instantly.",
  url: "https://image2word.com/image-to-pdf",
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

export default function ImageToPdfPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <ImageToPdfClient />
    </>
  );
}
