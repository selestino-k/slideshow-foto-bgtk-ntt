"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPhoto } from "@/lib/actions/photo-actions"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUploader } from "@/components/image-uploader"
import { ArrowLeft, Save, Loader2, Link2, Image as ImageIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AddPhotoPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [useExternalUrl, setUseExternalUrl] = useState(false)
  const [externalUrl, setExternalUrl] = useState("")
  const [formData, setFormData] = useState({
    photoName: "",
    description: "",
    timelineDate: "",
    imageUrl: "",
    imageFile: null as File | null,
  })

  const handleImageChange = (url: string, file?: File) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
      imageFile: file || null,
    }))
  }

  const handleExternalUrlChange = (url: string) => {
    setExternalUrl(url)
    setFormData(prev => ({
      ...prev,
      imageUrl: url,
      imageFile: null,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.photoName || !formData.timelineDate) {
      toast.error("Harap isi semua field yang wajib")
      return
    }

    if (!formData.imageFile && !externalUrl) {
      toast.error("Harap unggah gambar atau masukkan URL eksternal")
      return
    }

    setIsSubmitting(true)

    try {
      const submitData = new FormData()
      submitData.append("photoName", formData.photoName)
      submitData.append("description", formData.description)
      submitData.append("timelineDate", formData.timelineDate)
      
      if (formData.imageFile) {
        submitData.append("file", formData.imageFile)
      } else if (externalUrl) {
        // If using external URL, we need to handle it differently
        // For now, we'll store the external URL directly
        submitData.append("externalUrl", externalUrl)
      }

      const result = await createPhoto(submitData)

      if (!result.success) {
        throw new Error(result.error || "Gagal menambahkan foto")
      }

      toast.success("Foto berhasil ditambahkan")
      router.push("/admin/daftar-foto")
      router.refresh()
    } catch (error) {
      console.error("Error adding photo:", error)
      toast.error(error instanceof Error ? error.message : "Gagal menambahkan foto")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/daftar-foto">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tambah Foto Baru</h1>
            <p className="text-muted-foreground">Unggah foto baru untuk slideshow</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Informasi Foto</CardTitle>
              <CardDescription>
                Isi detail foto yang akan ditambahkan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="photoName">
                  Nama Foto <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="photoName"
                  placeholder="Masukkan nama foto"
                  value={formData.photoName}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, photoName: e.target.value }))
                  }
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timelineDate">
                  Tanggal Foto <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="timelineDate"
                  type="date"
                  value={formData.timelineDate}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, timelineDate: e.target.value }))
                  }
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  placeholder="Masukkan deskripsi foto (opsional)"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, description: e.target.value }))
                  }
                  disabled={isSubmitting}
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Label>Sumber Gambar <span className="text-red-500">*</span></Label>
                  <Button
                    type="button"
                    variant={useExternalUrl ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      setUseExternalUrl(!useExternalUrl)
                      setExternalUrl("")
                      setFormData(prev => ({ ...prev, imageUrl: "", imageFile: null }))
                    }}
                    disabled={isSubmitting}
                  >
                    {useExternalUrl ? <ImageIcon className="h-4 w-4 mr-2" /> : <Link2 className="h-4 w-4 mr-2" />}

                    {useExternalUrl ? "Gunakan Upload" : "Gunakan URL Eksternal"}
                  </Button>
                </div>
                {!useExternalUrl ? (
                  <ImageUploader
                    value={formData.imageUrl}
                    onChange={handleImageChange}
                    folder="slideshow"
                    maxSizeMB={10}
                    disabled={isSubmitting}
                    showUrlInput={true}
                    label="Upload Foto"
                    aspectRatio="auto"
                  />
                ) : (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="https://example.com/image.jpg"
                          value={externalUrl}
                          onChange={(e) => handleExternalUrlChange(e.target.value)}
                          className="pl-9"
                          disabled={isSubmitting}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleExternalUrlChange(externalUrl)}
                        disabled={!externalUrl || isSubmitting}
                      >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                    
                    {externalUrl && (
                      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-xs font-medium text-gray-700 mb-2">Preview Gambar External:</p>
                        <div className="relative w-full h-64 rounded-md overflow-hidden bg-white">
                          <Image
                            src={externalUrl}
                            alt="External URL Preview"
                            fill
                            className="object-contain"
                            onError={(e) => {
                              toast.error("URL gambar tidak valid")
                              e.currentTarget.src = "/images/placeholder.svg"
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 break-all">{externalUrl}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting || (!formData.imageFile && !externalUrl)}
                  className="min-w-[150px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Simpan Foto
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin/daftar-foto")}
                  disabled={isSubmitting}
                >
                  Batal
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
}