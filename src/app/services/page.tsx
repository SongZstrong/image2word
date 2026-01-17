import type { Metadata } from "next";
import SEO from "@/components/SEO";

export const metadata: Metadata = {
  title: "OCR Services - Image to Text Conversion | image2word.com",
  description: "Explore our comprehensive OCR services including image-to-text conversion, multi-language support, privacy-first processing, and free unlimited access.",
  keywords: "OCR services, image to text conversion, multi-language OCR, privacy-first processing, free OCR tools, text recognition services",
  openGraph: {
    title: "OCR Services - Image to Text Conversion",
    description: "Explore our comprehensive OCR services including image-to-text conversion and multi-language support.",
    url: "https://image2word.com/services",
  },
  alternates: {
    canonical: "https://image2word.com/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <SEO
        title="OCR Services - Image to Text Conversion | image2word.com"
        description="Explore our comprehensive OCR services including image-to-text conversion, multi-language support, privacy-first processing, and free unlimited access."
        url="https://image2word.com/services"
        keywords={[
          "OCR services",
          "image to text conversion",
          "multi-language OCR",
          "privacy-first processing",
          "free OCR tools",
        ]}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h1>
          <p className="text-lg text-gray-600">
            Discover the comprehensive range of OCR services we offer
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Image-to-Text Conversion</h3>
            <p className="text-gray-600 mb-4">
              Convert any image containing text into editable, searchable text format using our advanced OCR technology.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Support for multiple image formats</li>
              <li>• High accuracy text recognition</li>
              <li>• Real-time preview</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Language OCR</h3>
            <p className="text-gray-600 mb-4">
              Extract text from images in various languages with our comprehensive language support system.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Support for 16+ languages</li>
              <li>• Automatic language detection</li>
              <li>• Specialized character recognition</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy-First Processing</h3>
            <p className="text-gray-600 mb-4">
              All processing happens locally in your browser, ensuring your data never leaves your device.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Local browser processing</li>
              <li>• No data transmission</li>
              <li>• Secure and private</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Free and Unlimited</h3>
            <p className="text-gray-600 mb-4">
              Access all our OCR features completely free of charge with no limitations or hidden fees.
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• 100% free to use</li>
              <li>• No usage limits</li>
              <li>• No advertisements</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
