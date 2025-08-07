'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Image as ImageIcon, FileText, Globe } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'image to text ', icon: ImageIcon },
    { href: '/image-to-word', label: 'image to word', icon: FileText },
    { href: '/image-to-pdf', label: 'image to pdf', icon: FileText },
    { href: '/blog', label: 'blog', icon: FileText },
    { href: '/languages', label: 'languages', icon: Globe },
  ];

  return (
    <nav className="bg-blue-600 shadow-sm border-b border-blue-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <ImageIcon className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">image2word</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-blue-600 bg-white'
                      : 'text-white hover:text-blue-200 hover:bg-blue-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
} 