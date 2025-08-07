'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Download, Loader2, FileText, RotateCw, GripVertical } from 'lucide-react';
import Image from 'next/image';

interface ImageItem {
  id: string;
  file: File;
  url: string;
  rotation: number;
}

export default function ImageToPdfPage() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImages = useCallback(async () => {
    if (images.length === 0) return;
    
    setIsProcessing(true);

    try {
      // 使用jsPDF库来生成PDF
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF();
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        // 创建canvas来处理图片旋转
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new window.Image();
        
        await new Promise((resolve) => {
          img.onload = () => {
            // 根据旋转角度设置canvas尺寸
            const isRotated = image.rotation === 90 || image.rotation === 270;
            canvas.width = isRotated ? img.height : img.width;
            canvas.height = isRotated ? img.width : img.height;
            
            if (ctx) {
              ctx.save();
              ctx.translate(canvas.width / 2, canvas.height / 2);
              ctx.rotate((image.rotation * Math.PI) / 180);
              ctx.drawImage(img, -img.width / 2, -img.height / 2);
              ctx.restore();
            }
            resolve(true);
          };
          img.src = image.url;
        });

        // 将canvas转换为图片数据
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        
        // 计算PDF页面尺寸
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // 计算图片在PDF中的尺寸，保持宽高比
        const imgAspectRatio = canvas.width / canvas.height;
        const pdfAspectRatio = pdfWidth / pdfHeight;
        
        let imgWidth, imgHeight;
        if (imgAspectRatio > pdfAspectRatio) {
          imgWidth = pdfWidth - 20;
          imgHeight = imgWidth / imgAspectRatio;
        } else {
          imgHeight = pdfHeight - 20;
          imgWidth = imgHeight * imgAspectRatio;
        }
        
        // 居中放置图片
        const x = (pdfWidth - imgWidth) / 2;
        const y = (pdfHeight - imgHeight) / 2;
        
        // 添加图片到PDF
        pdf.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight);
        
        // 如果不是最后一页，添加新页面
        if (i < images.length - 1) {
          pdf.addPage();
        }
      }
      
      // 下载PDF
      pdf.save(`images_to_pdf_${Date.now()}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [images]);

  const handleFiles = useCallback((files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    // 检查总数限制
    if (images.length + imageFiles.length > 10) {
      alert(`You can only upload up to 10 images. You currently have ${images.length} images and trying to add ${imageFiles.length} more.`);
      return;
    }
    
    const newImages: ImageItem[] = [];
    let processedCount = 0;
    
    imageFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage: ImageItem = {
          id: `${Date.now()}_${index}_${Math.random().toString(36).substr(2, 9)}`,
          file,
          url: e.target?.result as string,
          rotation: 0,
        };
        newImages.push(newImage);
        processedCount++;
        
        if (processedCount === imageFiles.length) {
          setImages(prev => [...prev, ...newImages]);
          // 重置文件输入框，允许重复选择相同文件
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }, [images.length]);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const rotateImage = (id: string) => {
    setImages(prev => prev.map(img => 
      img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img
    ));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    setImages(prev => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      return newImages;
    });
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropImage = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetId) {
      const fromIndex = images.findIndex(img => img.id === draggedItem);
      const toIndex = images.findIndex(img => img.id === targetId);
      moveImage(fromIndex, toIndex);
    }
    setDraggedItem(null);
  };

  const clearAll = () => {
    setImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Privacy Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Privacy Protection</h3>
            <p className="text-sm text-blue-700 mt-1">
              All image processing happens locally in your browser. Your images never leave your device, ensuring complete privacy and security.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Image to PDF Converter
        </h1>
        <p className="text-lg text-gray-600">
          Convert multiple images to PDF documents online free. Upload, arrange, and rotate images before creating your PDF.
        </p>
      </div>

      {/* Upload Area */}
      <div className="mb-8">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">
            Drag and drop multiple images here, or{' '}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              browse
            </button>
          </p>
                     <p className="text-sm text-gray-500">
             Supports JPG, PNG up to 10MB each. You can upload up to 10 images at once.
           </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Image List */}
      {images.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Images ({images.length})
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={clearAll}
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={processImages}
                disabled={isProcessing}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                <span>{isProcessing ? 'Generating PDF...' : 'Generate PDF'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image.id}
                draggable
                onDragStart={(e) => handleDragStart(e, image.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDropImage(e, image.id)}
                className={`relative bg-white border-2 rounded-lg p-2 transition-all h-48 ${
                  draggedItem === image.id ? 'border-blue-500 opacity-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Image Number Badge */}
                <div className="absolute top-1 left-1 z-10 bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                  #{index + 1}
                </div>
                
                <div className="relative w-full h-32 overflow-hidden rounded">
                  <Image
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    width={200}
                    height={150}
                    className="w-full h-full object-contain"
                    style={{
                      transform: `rotate(${image.rotation}deg)`,
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  
                  {/* Drag Handle */}
                  <div className="absolute top-1 left-8 bg-black bg-opacity-50 text-white p-1 rounded cursor-move">
                    <GripVertical className="h-3 w-3" />
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  
                  {/* Rotate Button */}
                  <button
                    onClick={() => rotateImage(image.id)}
                    className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-1 hover:bg-blue-600 transition-colors"
                  >
                    <RotateCw className="h-3 w-3" />
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 mt-2 truncate">
                  {image.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section */}
      <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Our Image to PDF Converter?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Multiple Images</h3>
            <p className="text-sm text-gray-600">Upload and combine multiple images into one PDF</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <GripVertical className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Drag & Drop</h3>
            <p className="text-sm text-gray-600">Reorder images by dragging them around</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <RotateCw className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Image Rotation</h3>
            <p className="text-sm text-gray-600">Rotate images before creating PDF</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
              <Download className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Instant Download</h3>
            <p className="text-sm text-gray-600">Generate and download PDF immediately</p>
          </div>
        </div>
      </div>
    </div>
  );
}
