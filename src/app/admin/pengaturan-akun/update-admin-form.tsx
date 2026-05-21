"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
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
import { updateUser } from "@/lib/actions/user-actions"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { CircleLoader } from "@/components/circle-loader"
import { User } from "next-auth"
import { Eye, EyeOff } from "lucide-react"

// Form validation schema
const userFormSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }),
  email: z.email({ message: "Email tidak valid" }),
  password: z.string().optional(), // Make password optional for updates
  
});

type UpdateFormValues = z.infer<typeof userFormSchema>;

interface UpdateAdminFormProps {
  user: User
}

export default function UpdateAdminForm({ user }: UpdateAdminFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Initialize form
  const form = useForm<UpdateFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      password: "",
    },
  });
  
  // Populate form with user data when session is loaded
  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      console.log("Session user:", session.user); // Debug session data
      form.reset({
        name: session.user.name || "",
        email: session.user.email || "",
        password: "", // Leave password field empty by default
      });
    }
  }, [session, status, form]);

  async function onSubmit(values: UpdateFormValues) {

    setIsSubmitting(true);
    
    try {
      const updatedValues = {
        ...values,
        id: user.id || "", 
      };

      const dataToUpdate = values.password?.trim()
        ? updatedValues 
        : { 
            id: updatedValues.id,
            name: updatedValues.name,
            email: updatedValues.email,
          };
      
      await updateUser(dataToUpdate);
      toast.success("Profil admin berhasil diperbarui");
      
      router.refresh();
    } catch (error) {
      toast.error(`Gagal memperbarui profil: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (status === "loading") {
    return (
      <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center h-screen p-8 pb-20 gap-16 sm:p-20 font-montserrat">
        <div className="flex justify-center items-center h-screen">
          <CircleLoader size="xl" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-montserrat">
      <main className="flex w-full flex-col gap-3 row-start-2 items-center sm:items-start">
        <h2 className="text-5xl font-semibold mb-6 pl-8 text-primary">
          Pengaturan Profil Admin
        </h2>
        
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <div className="text-sm text-gray-500 mb-4">
              Perbarui informasi profil dan kata sandi Admin
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Admin" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="E-mail" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password Baru (kosongkan jika tidak ingin mengubah)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Kosongkan jika tidak ingin mengubah" 
                            {...field} 
                            disabled={isSubmitting}
                            className="pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isSubmitting}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Eye className="h-4 w-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
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
    </div>
  );
}


