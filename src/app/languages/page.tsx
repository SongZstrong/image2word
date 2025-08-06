export default function LanguagesPage() {
  const languages = [
    { code: 'eng', name: 'English', flag: '🇺🇸' },
    { code: 'spa', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fra', name: 'French', flag: '🇫🇷' },
    { code: 'deu', name: 'German', flag: '🇩🇪' },
    { code: 'ita', name: 'Italian', flag: '🇮🇹' },
    { code: 'por', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'rus', name: 'Russian', flag: '🇷🇺' },
    { code: 'jpn', name: 'Japanese', flag: '🇯🇵' },
    { code: 'kor', name: 'Korean', flag: '🇰🇷' },
    { code: 'chi_sim', name: 'Chinese (Simplified)', flag: '🇨🇳' },
    { code: 'chi_tra', name: 'Chinese (Traditional)', flag: '🇹🇼' },
    { code: 'ara', name: 'Arabic', flag: '🇸🇦' },
    { code: 'hin', name: 'Hindi', flag: '🇮🇳' },
    { code: 'tha', name: 'Thai', flag: '🇹🇭' },
    { code: 'vie', name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'tur', name: 'Turkish', flag: '🇹🇷' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Supported Languages</h1>
        <p className="text-lg text-gray-600">
          Our OCR tool supports multiple languages for text extraction from images
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languages.map((language) => (
          <div key={language.code} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{language.flag}</span>
              <div>
                <h3 className="font-semibold text-gray-900">{language.name}</h3>
                <p className="text-sm text-gray-500">{language.code}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Language Detection</h2>
        <p className="text-gray-600">
          Our advanced OCR technology can automatically detect the language in your images, 
          but for best results, we recommend selecting the appropriate language when uploading your image.
        </p>
      </div>
    </div>
  );
} 