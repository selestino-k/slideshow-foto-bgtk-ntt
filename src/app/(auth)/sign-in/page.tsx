import { Metadata } from "next";
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

    
}

export const metadata: Metadata = {
    title: "Masuk | Panel Admin CMS BGTK NTT",
    description: "Silahkan masuk ke akun Anda untuk melanjutkan.",
};

export default async function SignInPage() {
    return (
        <div className="relative grid w-full min-h-screen">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/intro-web.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-95 blur-xs dark:opacity-40"
                    priority
                />
            </div>
            <Suspense fallback={<AuthLoading />}>
                <main className="relative z-10 w-full max-w-md mx-auto my-auto space-y-6 p-8 rounded-xl shadow-lg bg-white/90 dark:bg-gray-900/90">
                    <div className="space-y-2 text-center">
                        <div className="pb-6 flex items-center justify-center space-x-6">
                            <Link href="/">
                                <Image
                                    src="/logo/logo-web-bgtk-ntt.png"
                                    alt="Logo BGTK NTT"
                                    width={300}
                                    height={100}
                                    className="object-contain opacity-100 hover:opacity-80 transition-opacity"
                                />
                            </Link>
                        </div>
                        <h1 className="text-3xl font-geist font-bold text-primary mb-1">Selamat Datang</h1>
                        <h2 className="text-md">Panel Admin CMS <br />BGTK Provinsi NTT</h2>
                    </div>

                    <LoginForm />
                </main>
            </Suspense>
        </div>
    );
}