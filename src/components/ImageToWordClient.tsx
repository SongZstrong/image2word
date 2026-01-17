'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Download, Loader2, FileText } from 'lucide-react';
import Image from 'next/image';

export default function ImageToWordClient() {
  const [image, setImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('eng');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('preferred_language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const processImage = useCallback(async () => {
    if (!image) return;
    
    setIsProcessing(true);

    try {
      // 使用Tesseract.js进行OCR识别
      const Tesseract = await import('tesseract.js');
      
      // 从当前显示的图片URL创建File对象
      const response = await fetch(image);
      const imageBlob = await response.blob();
      const file = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' });
      
      const result = await Tesseract.default.recognize(file, selectedLanguage);
      const extractedText = result.data.text;
      
      // 使用docx库生成真正的Word文档
      const { Document, Packer, Paragraph, TextRun } = await import('docx');
      
      // 将识别的文字按行分割
      const lines = extractedText.split('\n').filter(line => line.trim() !== '');
      
      // 创建文档段落
      const children = lines.map(line => 
        new Paragraph({
          children: [
            new TextRun({
              text: line.trim(),
              size: 24, // 12pt
            }),
          ],
        })
      );
      
      // 创建Word文档
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: children,
          },
        ],
      });
      
      // 生成Word文档
      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer as BlobPart], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = `extracted_text_${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [image, selectedLanguage]);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  const clearAll = () => {
    setImage(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLanguage(value);
    window.localStorage.setItem('preferred_language', value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Image to Word Converter
        </h1>
        <p className="text-lg text-gray-600">
          Convert images to Word documents online free. Upload an image and download as a Word file instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Upload Image</h3>

          {/* Language Selection - Step 1 */}
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h4 className="font-semibold text-yellow-900">Select Text Language (Required)</h4>
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="language-select" className="text-sm font-medium text-yellow-800">
                Language:
              </label>
              <select
                id="language-select"
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="px-3 py-2 border-2 border-yellow-400 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
              >
              <option value="eng">🇺🇸 English</option>
              <option value="chi_sim">🇨🇳 Chinese (Simplified)</option>
              <option value="chi_tra">🇹🇼 Chinese (Traditional)</option>
              <option value="jpn">🇯🇵 Japanese</option>
              <option value="kor">🇰🇷 Korean</option>
              <option value="spa">🇪🇸 Spanish</option>
              <option value="fra">🇫🇷 French</option>
              <option value="deu">🇩🇪 German</option>
              <option value="ita">🇮🇹 Italian</option>
              <option value="por">🇵🇹 Portuguese</option>
              <option value="rus">🇷🇺 Russian</option>
              <option value="ara">🇸🇦 Arabic</option>
              <option value="hin">🇮🇳 Hindi</option>
              <option value="tha">🇹🇭 Thai</option>
              <option value="vie">🇻🇳 Vietnamese</option>
              <option value="tur">🇹🇷 Turkish</option>
            </select>
          </div>
        </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors flex-1 flex flex-col justify-center ${
              dragActive
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="relative">
                <Image
                  src={image}
                  alt="Uploaded image"
                  width={400}
                  height={300}
                  className="mx-auto rounded-lg max-w-full h-auto"
                />
                <button
                  onClick={clearAll}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop an image here, or{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    browse
                  </button>
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, GIF, BMP up to 10MB
                </p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>

        <div className="flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Word Document</h3>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-end mb-4 h-10">
            {image && !isProcessing && (
              <div className="flex space-x-2">
                <button
                  onClick={processImage}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FileText className="h-4 w-4" />
                  <span>Convert to Word</span>
                </button>
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-300 rounded-lg p-4 flex-1 flex flex-col min-h-[400px]">
            {isProcessing ? (
              <div className="flex items-center justify-center flex-1">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">Converting image to Word document...</p>
                </div>
              </div>
            ) : image ? (
              <div className="text-center flex-1 flex items-center justify-center">
                <div>
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Image uploaded successfully</p>
                  <p className="text-sm text-gray-500">Click &quot;Convert to Word&quot; to generate your document</p>
                </div>
              </div>
            ) : (
              <div className="text-gray-500 text-center flex-1 flex items-center justify-center">
                Upload an image to convert to Word document
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Step Instructions - Between upload and features */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4 text-center">📋 How to Use - Follow These Steps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Select Text Language</h3>
              <p className="text-sm text-blue-700">
                <span className="font-semibold text-red-600">⚠️ IMPORTANT:</span> Choose the correct language of the text in your image. 
                Wrong language selection will cause recognition errors!
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div>
              <h3 className="font-medium text-green-900 mb-1">Upload Image</h3>
              <p className="text-sm text-green-700">
                Drag and drop your image or click to browse. Supports JPG, PNG, GIF, BMP up to 10MB.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Our Image to Word Converter?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Free Online Tool</h3>
            <p className="text-sm text-gray-600">No registration required, completely free to use</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Download className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Instant Download</h3>
            <p className="text-sm text-gray-600">Convert and download your Word document immediately</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Upload className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Easy Upload</h3>
            <p className="text-sm text-gray-600">Simple drag and drop interface for quick conversion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
