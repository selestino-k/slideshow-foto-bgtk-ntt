"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { createInstrumen } from "@/lib/actions/admin/instrument-actions"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/admin/image-upload";


// Form validation schema
const instrumentFormSchema = z.object({
  nama_instrumen: z.string().min(1, { message: "Nama instrumen wajib diisi" }),
  merk_instrumen: z.string().min(1, { message: "Merk instrumen wajib diisi" }),
  tipe_instrumen: z.string().min(1, { message: "Tipe instrumen wajib diisi" }),
  layanan: z.string().min(1, { message: "Layanan wajib diisi" }),
  status: z.string().min(1, { message: "Status wajib diisi" }),
  image_url: z.string().optional(),
});

type AddFormValues = z.infer<typeof instrumentFormSchema>;

export default function TambahInstrumenPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with empty values
  const form = useForm<AddFormValues>({
    resolver: zodResolver(instrumentFormSchema),
    defaultValues: {
      nama_instrumen: "",
      merk_instrumen: "",
      tipe_instrumen: "",
      layanan: "",
      status: "TERSEDIA",
      image_url: "",
    },
  });

  
  

  async function onSubmit(values: AddFormValues) {
    setIsSubmitting(true);
    
    try {
      await createInstrumen(values);
      toast.success("Instrumen berhasil ditambahkan");
      
      // Navigate back to the instrument list
      router.push("/admin/daftar-instrumen");
      router.refresh();
    } catch (error) {
      console.error("Failed to add instrument:", error);
      toast.error("Gagal menambahkan instrumen");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <div className="grid w-full grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-1 items-center sm:items-start">
        <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6">
          Tambah Instrumen Baru
        </h2>
        
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="nama_instrumen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Instrumen</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Nama instrumen" 
                          {...field} 
                          className="cursor-text"
                          style={{ caretColor: 'auto' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="merk_instrumen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Merk</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Merk instrumen" 
                          {...field} 
                          className="cursor-text"
                          style={{ caretColor: 'auto' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tipe_instrumen"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipe</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Tipe instrumen" 
                          {...field} 
                          className="cursor-text"
                          style={{ caretColor: 'auto' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="layanan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Layanan</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Layanan" 
                          {...field} 
                          className="cursor-text"
                          style={{ caretColor: 'auto' }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="TERSEDIA">TERSEDIA</SelectItem>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="TIDAK TERSEDIA">TIDAK TERSEDIA</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gambar Instrumen</FormLabel>
                      <FormControl>
                        <ImageUpload
                          value={field.value || ''}
                          onChange={field.onChange}
                          resourceType="instrumen"
                          description="Upload gambar instrumen untuk ditampilkan di halaman katalog"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => router.back()} 
                    disabled={isSubmitting}
                  >
                    Batal
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Menyimpan..." : "Simpan"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}


