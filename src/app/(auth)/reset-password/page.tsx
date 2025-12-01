import {ResetPasswordForm} from "@/components/auth/resetpass-form";
import { LockKeyhole } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Reset Password",
  description: "Silahkan atur ulang password Anda.",
};

export default function ResetPasswordPage() {
  
  return (
    <div className="grid w-full grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="w-full max-w-sm mx-auto space-y-6 row-start-2">
        <div className="flex justify-center mb-6">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <LockKeyhole className="h-6 w-6 text-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">Reset Password</h1>
        <Suspense fallback={<p className="text-center text-muted-foreground mb-6">Loading...</p>}>
        <ResetPasswordForm />
        </Suspense>
        
      </main>
    </div>
  );
};
