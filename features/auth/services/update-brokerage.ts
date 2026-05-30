import { createClient } from "@/lib/db/client";

interface UpdateBrokerageInput {
  brokerage_id: string | null;
  brokerage_name: string | null;
  is_independent: boolean;
}

export async function updateBrokerage(data: UpdateBrokerageInput) {
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
      brokerage_id: data.brokerage_id,
      brokerage_name: data.brokerage_name,
      is_independent: data.is_independent,
      onboarding_step: "handle",
    })
    .eq("id", user.id);

  if (error) {
    throw error;
  }
}
