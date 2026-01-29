import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();
        const role = profile?.role;
        const redirectPath =
          role === "admin" || role === "platform_admin"
            ? "/dashboard/admin"
            : role === "mt"
              ? "/dashboard"
              : next;
        return NextResponse.redirect(new URL(redirectPath, requestUrl.origin));
      }
    }
  }

  return NextResponse.redirect(new URL("/auth/v2/login", requestUrl.origin));
}
