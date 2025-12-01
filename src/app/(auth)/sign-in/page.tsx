import { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GoogleSignIn } from "@/components/google-signin";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { AuthLoading } from "@/components/auth/auth-loading";

// Extend Next-Auth types
declare module "next-auth" {
  interface User {
    role?: string;
  }
  
  interface Session {
    user?: User;
  }
}

export const metadata: Metadata = {
  title: "Masuk",
  description: "Silahkan masuk ke akun Anda untuk melanjutkan.",
};

export default async function SignInPage() {
  const session = await auth();

  // Check if user is authenticated
  if (session?.user) {
    // Check user role and redirect accordingly
    if (session.user.role === "ADMIN") {
      redirect("/admin");
    } else {
      redirect("/"); // Regular users go to home page
    }
  }
  
  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Suspense fallback={<AuthLoading />}>
      <main className="w-full max-w-md mx-auto space-y-6 row-start-2 p-8 rounded-xl shadow-lg">
        <div className="space-y-2 text-center">
          <div className="pb-6 flex items-center justify-center md:justify-start space-x-6">
              <Link 
              href="https://undana.ac.id">
              <Image
                src="/images/Logo_Undana.png"
                alt="Logo UNDANA"
                width={100}
                height={100}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"

              />
              </Link>
              <Link
              href="https://bioscience.undana.ac.id">
              <Image
                src="/images/logo-biosains-undana.jpeg"
                alt="Logo Biosains"
                width={100}
                height={100}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
              </Link>
              <Image 
                src="/images/logo-kan-transp.png"
                alt="Logo KAN"
                width={150}
                height={150}
                className="object-contain opacity-80 hover:opacity-100 transition-opacity"
              />

        </div>
          <h1 className="text-3xl font-bold mb-1">Selamat Datang</h1>
          <h2 className="text-lg">SI Peminjaman dan Inventaris <br></br>UPT Lab Terpadu Universitas Nusa Cendana</h2>
          <p className="text-sm text-muted-foreground mt-2">Untuk melanjutkan, silakan masuk ke akun Anda.</p>
        </div>

        <div className="flex justify-center">
          <GoogleSignIn />
        </div>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 text-muted-foreground">
              Atau masuk dengan Email dan Password
            </span>
          </div>
        </div>
         <LoginForm />
      </main>
      </Suspense>
    </div>
  );
}