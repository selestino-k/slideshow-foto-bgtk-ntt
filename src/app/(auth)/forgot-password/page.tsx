"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Mail } from "lucide-react";

const ForgetPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleResetPassword = async (formData: FormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      const email = formData.get('email') as string;
      
      // Validate email
      if (!email) {
        setError("Email wajib diisi");
        toast.error("Email wajib diisi");
        setIsSubmitting(false);
        return;
      }
      
      // Email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Format email tidak valid");
        toast.error("Format email tidak valid");
        setIsSubmitting(false);
        return;
      }
      
      console.log("Submitting reset password request for:", email);
      
      // Here you would call your API to send a reset password email
      // For now, we'll simulate a successful response
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setShowSuccess(true);
      toast.success("Instruksi reset password telah dikirim ke email Anda");
      
      // Wait 3 seconds before redirecting
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
      
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Terjadi kesalahan. Silakan coba lagi.");
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-sm mx-auto space-y-6 row-start-2">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Mail className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
        <p className="text-center text-muted-foreground mb-6">
          Masukkan email Anda dan kami akan mengirimkan instruksi untuk reset password
        </p>
        
        {showSuccess && (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Instruksi reset password telah dikirim ke email Anda. Silakan periksa kotak masuk Anda.
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Email Reset Form */}
        {!showSuccess && (
          <form
            className="space-y-4"
            action={handleResetPassword}
          >
            <div className="space-y-2">
              <Input
                name="email"
                placeholder="Email"
                type="email"
                required
                autoComplete="email"
                disabled={isSubmitting}
                className="cursor-text"
                style={{ caretColor: 'auto' }}
              />
              <p className="text-xs text-muted-foreground">
                Kami akan mengirimkan tautan untuk reset password ke email yang Anda masukkan
              </p>
            </div>
            
            <Button 
              className="w-full" 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Instruksi Reset"}
            </Button>
          </form>
        )}

        <div className="text-center">
          <Button asChild variant="link" disabled={isSubmitting}>
            <Link href="/sign-in">Kembali ke halaman login</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ForgetPasswordPage;