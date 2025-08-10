import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Image to Text Converter Online Free | OCR Tool | image2word.com",
  description: "Free online image to text converter with powerful OCR technology. Convert images to text, Word, and PDF instantly. Support multiple languages including English, Chinese, Japanese, Korean and more. No registration required.",
  keywords: "image to text converter online free, OCR online free, image convert tools online free, image to word converter, image to pdf converter, free OCR tool, text extraction, image recognition, image2word.com, optical character recognition",
  authors: [{ name: "image2word.com" }],
  creator: "image2word.com",
  publisher: "image2word.com",
  robots: "index, follow",
  openGraph: {
    title: "Image to Text Converter Online Free | OCR Tool",
    description: "Free online image to text converter with powerful OCR technology. Convert images to text, Word, and PDF instantly.",
    url: "https://image2word.com",
    siteName: "image2word.com",
    images: [
      {
        url: "https://image2word.com/og-image.jpg",
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
    images: ["https://image2word.com/og-image.jpg"],
  },
  verification: {
    google: "Ka5DkT4dDLshQxB_xQNYa9Yml99sJA4enevi1RDRxeg",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://image2word.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
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