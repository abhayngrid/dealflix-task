import { createClient } from "@/lib/db/client";

export async function updateHandle(handle: string) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("users")
    .update({
      handle,
      onboarding_step: "complete",
    })
    .eq("id", user.id);

  if (error) {
    throw error;
  }
}
