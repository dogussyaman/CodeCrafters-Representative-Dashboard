import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const redirectUrl = new URL("/auth/v2/login", request.nextUrl.origin);
  return NextResponse.redirect(redirectUrl, { status: 302 });
}
