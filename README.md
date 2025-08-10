# Image2Word - Online OCR Tool

A free, privacy-focused online OCR (Optical Character Recognition) tool that converts images to text using advanced AI technology.

## 🌟 Features

- **Multi-language Support**: Supports 16+ languages including English, Chinese, Japanese, Korean, Spanish, French, German, and more
- **Privacy-First**: All processing happens locally in your browser - your images never leave your device
- **Free & Unlimited**: No usage limits, no hidden fees, completely free to use
- **Easy to Use**: Simple drag-and-drop interface with real-time processing
- **High Accuracy**: Powered by Tesseract.js for excellent text recognition
- **Export Options**: Copy to clipboard or download as text file

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd img2text
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **OCR Engine**: Tesseract.js
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📱 Usage

1. **Select Language**: Choose the language of the text in your image
2. **Upload Image**: Drag and drop an image or click to browse
3. **Process**: The tool will automatically extract text from your image
4. **Export**: Copy the text to clipboard or download as a file

## 🌍 Supported Languages

- 🇺🇸 English
- 🇨🇳 Chinese (Simplified)
- 🇹🇼 Chinese (Traditional)
- 🇯🇵 Japanese
- 🇰🇷 Korean
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German
- 🇮🇹 Italian
- 🇵🇹 Portuguese
- 🇷🇺 Russian
- 🇸🇦 Arabic
- 🇮🇳 Hindi
- 🇹🇭 Thai
- 🇻🇳 Vietnamese
- 🇹🇷 Turkish

## 📁 Project Structure

```
img2text/
├── src/
│   ├── app/
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog page
│   │   ├── contact/        # Contact page
│   │   ├── faq/            # FAQ page
│   │   ├── languages/      # Languages page
│   │   ├── privacy/        # Privacy policy
│   │   ├── services/       # Services page
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Main OCR page
│   │   └── globals.css     # Global styles
│   └── components/
│       ├── Navigation.tsx  # Navigation component
│       └── Footer.tsx      # Footer component
├── public/                 # Static assets
└── package.json           # Dependencies
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables required - the tool works entirely client-side.

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 🔍 SEO Optimization

This project includes comprehensive SEO optimization:

### Technical SEO
- **Sitemap**: Automatically generated sitemap.xml
- **Robots.txt**: Properly configured for search engines
- **Meta Tags**: Optimized titles, descriptions, and Open Graph tags
- **Structured Data**: JSON-LD schema markup for better search understanding
- **Security Headers**: XSS protection, frame options, and content type headers

### Page Optimization
- **Unique Titles**: Each page has descriptive, keyword-rich titles
- **Meta Descriptions**: Compelling descriptions for search results
- **Canonical URLs**: Prevents duplicate content issues
- **Open Graph**: Optimized social media sharing

### Performance
- **Image Optimization**: Next.js automatic image optimization
- **Compression**: Enabled gzip compression
- **Caching**: ETags and browser caching headers
- **Analytics**: Vercel Analytics and Speed Insights integration

### SEO Checklist
See [SEO-CHECKLIST.md](./SEO-CHECKLIST.md) for a complete optimization checklist and next steps.

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tesseract.js](https://github.com/naptha/tesseract.js) - OCR engine
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icons

## 📞 Contact

- Website: [image2word.com](https://image2word.com)
- Email: support@image2word.com

---

Made with ❤️ for the open source community
