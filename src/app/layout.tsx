import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = new URL("https://image2word.com");

const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://image2word.com/#organization",
  name: "image2word.com",
  url: "https://image2word.com",
  description: "Free online image to text converter with powerful OCR technology.",
};

const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://image2word.com/#website",
  name: "image2word.com",
  url: "https://image2word.com",
  publisher: {
    "@id": "https://image2word.com/#organization",
  },
  inLanguage: "en",
};

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: "Image to Text Converter Online Free | OCR Tool | image2word.com",
  description: "Free online image to text converter with powerful OCR technology. Convert images to text, Word, and PDF instantly. Support multiple languages including English, Chinese, Japanese, Korean and more. No registration required.",
  keywords: "image to text converter online free, OCR online free, image convert tools online free, image to word converter, image to pdf converter, free OCR tool, text extraction, image recognition, image2word.com, optical character recognition",
  authors: [{ name: "image2word.com" }],
  creator: "image2word.com",
  publisher: "image2word.com",
  applicationName: "image2word.com",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Image to Text Converter Online Free | OCR Tool",
    description: "Free online image to text converter with powerful OCR technology. Convert images to text, Word, and PDF instantly.",
    url: siteUrl,
    siteName: "image2word.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Image to Text Converter Online Free",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Text Converter Online Free | OCR Tool",
    description: "Free online image to text converter with powerful OCR technology. Convert images to text, Word, and PDF instantly.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "Ka5DkT4dDLshQxB_xQNYa9Yml99sJA4enevi1RDRxeg",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "/",
  },
  other: {
    "google-adsense-account": "ca-pub-8115477477403051",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <Script
          id="adsense-script"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8115477477403051"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        <Script
          id="cropper-script"
          src="https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.2/cropper.min.js"
          strategy="afterInteractive"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
