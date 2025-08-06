export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          Learn more about our mission and the team behind img2word
        </p>
      </div>

      <div className="space-y-12">
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At img2word, we believe that information should be accessible to everyone. Our mission is to provide a free, 
            reliable, and user-friendly tool that converts images to text, making digital content more accessible and 
            searchable for users worldwide.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We are committed to leveraging cutting-edge OCR technology to help individuals, students, researchers, 
            and businesses extract valuable text from images quickly and accurately.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">What We Do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Image-to-Text Conversion</h3>
              <p className="text-gray-600">
                Our advanced OCR technology can extract text from various types of images, including scanned documents, 
                photos, screenshots, and more.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Multi-Language Support</h3>
              <p className="text-gray-600">
                We support multiple languages, making our tool accessible to users from different linguistic backgrounds.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy-First Approach</h3>
              <p className="text-gray-600">
                All processing happens locally in your browser, ensuring your data never leaves your device.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Free and Accessible</h3>
              <p className="text-gray-600">
                We provide our service completely free of charge, with no hidden fees or limitations.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Values</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously explore and implement the latest technologies to improve our OCR capabilities and user experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We believe in making technology accessible to everyone, regardless of their technical background or financial means.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy</h3>
              <p className="text-gray-600">
                We prioritize user privacy and data security, ensuring that sensitive information remains protected.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliability</h3>
              <p className="text-gray-600">
                We strive to provide a reliable and consistent service that users can depend on for their text extraction needs.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Technology</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our platform is built using modern web technologies and leverages Tesseract.js, an open-source OCR engine 
            that provides excellent text recognition capabilities. We&apos;ve optimized the technology to work seamlessly 
            in web browsers, ensuring fast and accurate results.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We are committed to staying at the forefront of OCR technology and continuously improving our algorithms 
            to provide better accuracy and support for more languages and text formats.
          </p>
        </section>
      </div>
    </div>
  );
} 