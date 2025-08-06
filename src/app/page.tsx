'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, Copy, Loader2 } from 'lucide-react';
import Tesseract from 'tesseract.js';
import Image from 'next/image';

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('eng');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(async (file: File) => {
    setIsProcessing(true);
    setText('');

    try {
      const result = await Tesseract.recognize(file, selectedLanguage);
      setText(result.data.text);
    } catch (error) {
      console.error('Error processing image:', error);
      setText('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [selectedLanguage]);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        processImage(file);
      };
      reader.readAsDataURL(file);
    }
  }, [processImage]);

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
    setText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  const downloadText = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Convert Image to Text
        </h1>
        <p className="text-lg text-gray-600">
          Upload an image and extract exact text from image online free using our free OCR tool
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col h-full">
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Import Image</h3>
          
          {/* Language Selection */}
          <div className="flex items-center justify-center space-x-4 mb-4 h-10">
            <label htmlFor="language-select" className="text-sm font-medium text-gray-700">
              Language:
            </label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            {!image ? (
              <div className="space-y-4">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drop your image here
                  </p>
                  <p className="text-gray-500">or click to browse</p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Choose File
                </button>
              </div>
            ) : (
              <div className="relative">
                <Image
                  src={image}
                  alt="Uploaded"
                  width={400}
                  height={300}
                  className="max-w-full h-auto rounded-lg"
                />
                <button
                  onClick={clearAll}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
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
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Extracted Text</h3>
          
          {/* Action Buttons - Same height as language selection */}
          <div className="flex items-center justify-end mb-4 h-10">
            {text && (
              <div className="flex space-x-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={downloadText}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-white border border-gray-300 rounded-lg p-4 flex-1 flex flex-col">
            {isProcessing ? (
              <div className="flex items-center justify-center flex-1">
                <div className="text-center">
                  <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600 mb-2" />
                  <p className="text-gray-600">Processing image...</p>
                </div>
              </div>
            ) : text ? (
              <div className="whitespace-pre-wrap text-gray-900 flex-1 overflow-auto">{text}</div>
            ) : (
              <div className="text-gray-500 text-center flex-1 flex items-center justify-center">
                Upload an image to extract text
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
