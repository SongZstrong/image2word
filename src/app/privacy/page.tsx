export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-lg text-gray-600">
          Last updated: January 2025
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Our image-to-text conversion tool processes images locally in your browser. We do not collect, store, or transmit your images to our servers. The only information we may collect includes:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
            <li>Usage analytics to improve our service</li>
            <li>Technical information about your browser and device</li>
            <li>Error logs for troubleshooting purposes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Any information we collect is used solely to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
            <li>Improve the functionality and performance of our tool</li>
            <li>Analyze usage patterns to enhance user experience</li>
            <li>Identify and fix technical issues</li>
            <li>Ensure the security and reliability of our service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We implement appropriate security measures to protect any information we collect. Since your images are processed locally in your browser, they never leave your device, ensuring maximum privacy and security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed">
            Our tool uses Tesseract.js, an open-source OCR library that runs entirely in your browser. No third-party services have access to your images or extracted text.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
          <p className="text-gray-600 leading-relaxed">
            We may use essential cookies to improve your experience on our website. These cookies do not track your personal information or browsing history on other websites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
            <li>Access any personal information we may have about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt out of any non-essential data collection</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this privacy policy from time to time. We will notify users of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this privacy policy or our data practices, please contact us through our contact page.
          </p>
        </section>
      </div>
    </div>
  );
} 