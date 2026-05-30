import { redirect } from "next/navigation";

import { createClient } from "@/lib/db/server";
import { ROUTES } from "@/constants/routes";
import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";

// Map each incomplete onboarding step to the page that should handle it.
const ONBOARDING_STEP_ROUTES: Record<string, string> = {
  profile: ROUTES.SIGNUP_PROFILE,
  brokerage: ROUTES.SIGNUP_BROKERAGE,
  handle: ROUTES.SIGNUP_HANDLE,
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in at all → back to signup
  if (!user) {
    redirect(ROUTES.SIGNUP);
  }

  // Check the public profile row for onboarding progress
  const { data: profile } = await supabase
    .from("users")
    .select("onboarding_step")
    .eq("id", user.id)
    .single();

  const step = profile?.onboarding_step ?? "profile";

  // If onboarding isn't complete, redirect to the right step
  if (step !== "complete") {
    redirect(ONBOARDING_STEP_ROUTES[step] ?? ROUTES.SIGNUP_PROFILE);
  }

  return <DashboardShell>{children}</DashboardShell>;
}
