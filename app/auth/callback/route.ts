import { NextResponse } from "next/server";
import { ROUTES } from "@/constants/routes";
import { createClient } from "@/lib/db/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(`${requestUrl.origin}${ROUTES.SIGNUP}`);
  }

  const supabase = await createClient();

  await supabase.auth.exchangeCodeForSession(code);

  return NextResponse.redirect(`${requestUrl.origin}${ROUTES.SIGNUP_PROFILE}`);
}

