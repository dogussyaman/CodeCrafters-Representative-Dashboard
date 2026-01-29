"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { LoginCredentialsForm } from "./login-credentials-form";
import { createClient } from "@/lib/supabase/client";

const FormSchema = z.object({
  email: z.string().email({ message: "Lütfen geçerli bir e-posta adresi girin." }),
  password: z.string().min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
  remember: z.boolean().optional(),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setError(null);
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      if (authError) throw authError;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Oturum alınamadı");

      const { data: profile } = await supabase
        .from("profiles")
        .select("role, must_change_password")
        .eq("id", user.id)
        .single();

      if (profile?.must_change_password) {
        router.push("/auth/sifre-degistir?first_login=true");
        return;
      }

      const role = profile?.role;
      if (role === "admin" || role === "platform_admin") {
        router.push("/dashboard/admin");
        router.refresh();
        return;
      }
      if (role === "mt") {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      setError("Bu panele erişim yetkiniz yok. Sadece yönetici veya müşteri temsilcisi giriş yapabilir.");
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Giriş yapılamadı. E-posta ve şifrenizi kontrol edin.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && (
        <div className="mb-4 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      <Form {...form}>
        <LoginCredentialsForm
          control={form.control}
          onSubmit={form.handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </Form>
    </div>
  );
}
