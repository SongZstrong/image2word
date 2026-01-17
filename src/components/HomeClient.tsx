'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, Download, Copy, Loader2, FileText } from 'lucide-react';
import Tesseract from 'tesseract.js';
import Image from 'next/image';

type CropperInstance = {
  getCroppedCanvas: () => HTMLCanvasElement;
  destroy: () => void;
};

type CropperConstructor = new (
  image: HTMLImageElement,
  options: {
    viewMode?: number;
    autoCropArea?: number;
    responsive?: boolean;
    background?: boolean;
  }
) => CropperInstance;

export default function HomeClient() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('eng');
  const [pasteMessage, setPasteMessage] = useState<string | null>(null);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [cropImageUrl, setCropImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropImageRef = useRef<HTMLImageElement>(null);
  const cropperRef = useRef<CropperInstance | null>(null);
  const pasteTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('preferred_language');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (pasteTimeoutRef.current) {
        window.clearTimeout(pasteTimeoutRef.current);
      }
    };
  }, []);

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

  const applyFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        processImage(file);
      };
      reader.readAsDataURL(file);
    }
  }, [processImage]);

  const closeCropModal = useCallback(() => {
    setIsCropOpen(false);
    if (cropImageUrl) {
      URL.revokeObjectURL(cropImageUrl);
    }
    setCropImageUrl(null);
    if (cropperRef.current) {
      cropperRef.current.destroy();
      cropperRef.current = null;
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [cropImageUrl]);

  const handleFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      if (cropImageUrl) {
        URL.revokeObjectURL(cropImageUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      setCropImageUrl(objectUrl);
      setIsCropOpen(true);
    }
  }, [cropImageUrl]);

  const handleCropConfirm = useCallback(() => {
    const cropper = cropperRef.current;
    if (!cropper) return;
    const canvas = cropper.getCroppedCanvas();
    canvas.toBlob((blob) => {
      if (!blob) return;
      const croppedFile = new File(
        [blob],
        `cropped-${Date.now()}.png`,
        { type: blob.type || 'image/png' }
      );
      applyFile(croppedFile);
      closeCropModal();
    }, 'image/png');
  }, [applyFile, closeCropModal]);

  useEffect(() => {
    if (!isCropOpen || !cropImageUrl || !cropImageRef.current) return;
    const Cropper = (window as unknown as { Cropper?: CropperConstructor }).Cropper;
    if (!Cropper) {
      console.error('Cropper.js is not available. Make sure it is loaded.');
      return;
    }
    if (cropperRef.current) {
      cropperRef.current.destroy();
    }
    cropperRef.current = new Cropper(cropImageRef.current, {
      viewMode: 1,
      autoCropArea: 1,
      responsive: true,
      background: false,
    });

    return () => {
      if (cropperRef.current) {
        cropperRef.current.destroy();
        cropperRef.current = null;
      }
    };
  }, [isCropOpen, cropImageUrl]);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      if (isCropOpen) return;
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.indexOf('image') !== -1) {
          const file = item.getAsFile();
          if (file) {
            handleFile(file);
            setPasteMessage('Image pasted from clipboard');
            if (pasteTimeoutRef.current) {
              window.clearTimeout(pasteTimeoutRef.current);
            }
            pasteTimeoutRef.current = window.setTimeout(() => {
              setPasteMessage(null);
            }, 2000);
          }
          break;
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => {
      document.removeEventListener('paste', handlePaste);
    };
  }, [handleFile, isCropOpen]);

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
    closeCropModal();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedLanguage(value);
    window.localStorage.setItem('preferred_language', value);
  };

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }

      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
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
    <>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Image to Text Converter Online Free
          </h1>
          <p className="text-lg text-gray-600">
            Free OCR online tool to convert images to text. Extract exact text from image online free using our powerful image to text converter. Best image convert tools online free.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-4">Import Image</h3>
            
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

            {pasteMessage && (
              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700 text-center">
                {pasteMessage}
              </div>
            )}
            
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
            
            <div className="bg-white border border-gray-300 rounded-lg p-4 flex-1 flex flex-col min-h-[400px]">
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Our Image to Text Converter?</h2>
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
              <p className="text-sm text-gray-600">Convert and download your text immediately</p>
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

      {isCropOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-lg p-6 shadow-sm max-w-3xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Crop Image</h3>
              <button
                onClick={closeCropModal}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-center">
              {cropImageUrl ? (
                <img
                  ref={cropImageRef}
                  src={cropImageUrl}
                  alt="Crop preview"
                  className="max-h-[60vh] w-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-gray-500 text-center">No image selected</div>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              <button
                onClick={closeCropModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCropConfirm}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Confirm &amp; Convert
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
