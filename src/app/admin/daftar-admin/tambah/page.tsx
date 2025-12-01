"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { createAdmin } from "@/lib/actions/admin/admin-actions"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Eye, EyeOff } from "lucide-react"

// Form validation schema
const adminFormSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }),
  email: z.string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" })
    .refine(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
      message: "Format email tidak valid"
    }),
  password: z.string()
    .min(8, { message: "Password minimal 8 karakter" })
    .refine(password => /[A-Z]/.test(password), {
      message: "Password harus memiliki minimal 1 huruf kapital"
    })
    .refine(password => /[0-9]/.test(password), {
      message: "Password harus memiliki minimal 1 angka"
    }),
  role: z.enum(["ADMIN", "USER"], {
    required_error: "Role wajib dipilih",
  }),
});

type AddFormValues = z.infer<typeof adminFormSchema>;

export default function CreateAdminPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  // Initialize form with empty values
  const form = useForm<AddFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "ADMIN"
    },
  });
 
  async function onSubmit(values: AddFormValues) {
    setIsSubmitting(true);
     
    try {
      const result = await createAdmin(values);
      
      if (result.success) {
        toast.success("Admin berhasil ditambahkan");
        // Navigate back to the admin list
        router.push("/admin/daftar-admin");
        router.refresh();
      } else {
        toast.error("Gagal menambahkan admin");
      }
    } catch (error) {
      console.error("Failed to add admin:", error);
      toast.error("Gagal menambahkan admin");
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="grid w-full grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex w-full flex-col gap-3 row-start-1 items-center sm:items-start">
        <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight mb-6">
          Tambah Admin Baru
        </h2>
        
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Informasi Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Admin</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Nama admin" 
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail Admin</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="contoh@email.com" 
                          type="email"
                          {...field} 
                          className="cursor-text"
                          style={{ caretColor: 'auto' }}
                        />
                      </FormControl>
                      <FormDescription>
                        Email harus dalam format yang valid
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />      
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            placeholder="Password" 
                            type={showPassword ? "text" : "password"}
                            {...field} 
                            className="cursor-text pr-10"
                            style={{ caretColor: 'auto' }}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Password minimal 8 karakter, 1 huruf kapital, dan 1 angka
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />      
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                          <SelectItem value="USER">USER</SelectItem>
                        </SelectContent>
                      </Select>
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
    </div>
  );
}