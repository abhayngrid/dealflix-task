import { createClient } from "@/lib/db/client";

import { ProfileInput } from "../validations/profile.schema";

export async function updateProfile(data: ProfileInput) {
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
      full_name: data.full_name,

      phone: data.phone,

      license_no: data.license_no,

      onboarding_step: "brokerage",
    })
    .eq("id", user.id);

  if (error) {
    throw error;
  }
}
