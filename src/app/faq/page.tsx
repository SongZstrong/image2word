export default function FAQPage() {
  const faqs = [
    {
      question: "What is OCR technology?",
      answer: "OCR (Optical Character Recognition) is a technology that converts images containing text into machine-readable text data. It can recognize and extract text from scanned documents, photos, and other image files."
    },
    {
      question: "What image formats are supported?",
      answer: "Our tool supports all common image formats including JPEG, PNG, GIF, BMP, TIFF, and WebP. For best results, we recommend using high-quality images with clear, readable text."
    },
    {
      question: "How accurate is the text extraction?",
      answer: "The accuracy depends on the quality of the input image. Clear, high-resolution images with good contrast typically achieve 95%+ accuracy. Handwritten text or low-quality images may have lower accuracy."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security seriously. Images are processed locally in your browser and are not stored on our servers. The extracted text is only available to you and is not saved."
    },
    {
      question: "What languages are supported?",
      answer: "Our OCR tool supports multiple languages including English, Spanish, French, German, Italian, Portuguese, Russian, Japanese, Korean, Chinese, Arabic, Hindi, Thai, Vietnamese, and Turkish."
    },
    {
      question: "Is this service free?",
      answer: "Yes, our image-to-text conversion tool is completely free to use. There are no hidden fees or limitations on the number of images you can process."
    },
    {
      question: "Can I extract text from handwritten documents?",
      answer: "While our tool primarily works best with printed text, it can attempt to recognize some handwritten text. However, accuracy will be significantly lower compared to printed text."
    },
    {
      question: "How do I get the best results?",
      answer: "For optimal results, ensure your image has good lighting, high resolution, clear contrast between text and background, and the text is properly oriented. Avoid blurry or distorted images."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600">
          Find answers to common questions about our image-to-text conversion tool
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {faq.question}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Still have questions?</h2>
        <p className="text-gray-600 mb-4">
          If you couldn&apos;t find the answer you&apos;re looking for, feel free to contact us.
        </p>
        <a
          href="/contact"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
} 