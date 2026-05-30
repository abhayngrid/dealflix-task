import { redirect } from "next/navigation";

import { createClient } from "@/lib/db/server";

import { ROUTES } from "@/constants/routes";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(ROUTES.DASHBOARD);
  }

  redirect(ROUTES.SIGNUP);
}
