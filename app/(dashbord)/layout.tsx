import { redirect } from "next/navigation";

import { createClient } from "@/lib/db/server";

import { ROUTES } from "@/constants/routes";

import { DashboardShell } from "@/features/dashboard/components/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ROUTES.SIGNUP);
  }

  return <DashboardShell>{children}</DashboardShell>;
}
