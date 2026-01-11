"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadImageToS3, deleteImageFromS3 } from '@/lib/actions/s3-actions'
import { toast } from 'sonner'
import { Upload, X, Loader2, Link2, Eye } from 'lucide-react'
import Image from 'next/image'

interface ImageUploaderProps {
  value?: string
  onChange: (url: string, file?: File) => void
  onDelete?: () => void
  folder?: string
  maxSizeMB?: number
  disabled?: boolean
  showUrlInput?: boolean
  label?: string
  aspectRatio?: "video" | "square" | "auto"
}

export function ImageUploader({
  value,
  onChange,
  onDelete,
  folder = "images",
  maxSizeMB = 10,
  disabled = false,
  showUrlInput = true,
  label = "Gambar",
  aspectRatio = "video"
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showUrlPreview, setShowUrlPreview] = useState(false)

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Harap unggah file gambar')
      return
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`Ukuran file harus kurang dari ${maxSizeMB}MB`)
      return
    }

    setIsUploading(true)

    try {
      // Delete old image from S3 if exists
      if (value) {
        await deleteImageFromS3(value)
      }

      // Upload new image
      const result = await uploadImageToS3(file, folder)

      if (!result.success || !result.url) {
        throw new Error(result.error || 'Gagal mengunggah gambar')
      }

      onChange(result.url, file)
      toast.success('Gambar berhasil diunggah')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error(error instanceof Error ? error.message : 'Gagal mengunggah gambar')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!value) return

    try {
      // Delete from S3
      const deleteResult = await deleteImageFromS3(value)
      if (!deleteResult.success) {
        throw new Error(deleteResult.error || 'Gagal menghapus gambar')
      }

      onChange('')
      onDelete?.()
      toast.success('Gambar dihapus')
    } catch (error) {
      console.error('Delete image error:', error)
      toast.error('Gagal menghapus gambar')
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (disabled) return

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "video":
        return "aspect-video"
      case "square":
        return "aspect-square"
      default:
        return ""
    }
  }

  const copyToClipboard = async () => {
    if (value) {
      await navigator.clipboard.writeText(value)
      toast.success('URL berhasil disalin')
    }
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      {!value ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-primary/50'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={disabled || isUploading}
          />
          
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            {isUploading ? (
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            ) : (
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
            )}
            <p className="text-sm font-medium text-gray-700 mb-1">
              {isUploading ? 'Mengunggah...' : 'Klik untuk unggah atau seret gambar ke sini'}
            </p>
            <p className="text-xs text-gray-500">
              Maksimal {maxSizeMB}MB - Format: JPG, PNG, GIF, WebP
            </p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`relative rounded-lg overflow-hidden border border-gray-200 ${getAspectClass()}`}>
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={handleDelete}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {showUrlInput && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">URL Gambar S3</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUrlPreview(!showUrlPreview)}
                  className="h-6 px-2"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  {showUrlPreview ? 'Sembunyikan' : 'Tampilkan'}
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={value}
                    readOnly
                    className="pl-9 font-mono text-xs bg-gray-50"
                    onClick={(e) => e.currentTarget.select()}
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                >
                  Salin URL
                </Button>
              </div>

              {showUrlPreview && (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs font-medium text-gray-700 mb-2">Preview URL:</p>
                  <div className="relative w-full h-48 rounded-md overflow-hidden">
                    <Image
                      src={value}
                      alt="URL Preview"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 break-all">{value}</p>
                </div>
              )}
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('image-upload')?.click()}
            disabled={disabled}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            Ganti Gambar
          </Button>
        </div>
      )}
    </div>
  )
}