import { createClient } from "@/lib/db/client";

export async function getCurrentUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  // .single() sets error (PGRST116) when no row is found instead of
  // returning null — surface it so callers get a clear failure rather
  // than undefined fields cascading silently through the app.
  if (error || !data) {
    throw new Error("User profile not found");
  }

  return data;
}
