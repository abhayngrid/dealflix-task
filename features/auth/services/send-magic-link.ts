import { createClient } from "@/lib/db/client";
import { ROUTES } from "@/constants/routes";
export async function sendMagicLink(email: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}${ROUTES.AUTH_CALLBACK}`,
    },
  });

  if (error) {
    throw error;
  }
}
