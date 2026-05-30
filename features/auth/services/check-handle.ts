import { createClient } from "@/lib/db/client";

export async function checkHandle(handle: string) {
  const supabase = createClient();

  // Get the current user so we can exclude their own row from the check.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("users")
    .select("id")
    .eq("handle", handle)
    .limit(1);

  // If the user is logged in, exclude their own record so their
  // auto-generated handle is never falsely shown as "taken".
  if (user?.id) {
    query = query.neq("id", user.id);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return {
    available: !data || data.length === 0,
  };
}
