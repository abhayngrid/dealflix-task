import { createClient } from "@/lib/db/client";

export async function checkHandle(handle: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("handle", handle)
    .limit(1);

  if (error) {
    throw error;
  }

  return {
    available: !data || data.length === 0,
  };
}
