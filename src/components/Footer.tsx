import Link from 'next/link';
import { Home, HelpCircle, Mail, Info, FileText, Shield } from 'lucide-react';

export default function Footer() {
  const footerSections = [
    {
      title: 'Features',
      items: [
        { href: '/', label: 'Home', icon: Home },
        { href: '/services', label: 'Our Services', icon: FileText },
      ]
    },
    {
      title: 'Others',
      items: [
        { href: '/faq', label: 'FAQ', icon: HelpCircle },
        { href: '/privacy', label: 'Privacy Policy', icon: Shield },
      ]
    },
    {
      title: 'Contact Us',
      items: [
        { href: '/about', label: 'About Us', icon: Info },
        { href: '/contact', label: 'Contact Us', icon: Mail },
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Footer Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          {/* Disclaimer */}
          <div className="text-sm text-gray-600 mb-4 leading-relaxed">
            Our online img2word tool is provided &quot;as is&quot;, free of charge, and without any warranty or guarantee. Each tool is carefully developed and rigorously tested, and our content is well-sourced, but despite our best effort it is possible they contain errors. We are not to be held responsible for any resulting damages from proper or improper use of the service. See our full terms of service.
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-gray-500 text-center">
            Copyright © 2025 image2word.com
          </div>
        </div>
      </div>
    </footer>
  );
} 