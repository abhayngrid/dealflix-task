"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "@/constants/routes";
import {
  profileSchema,
  ProfileInput,
} from "@/features/auth/validations/profile.schema";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useUpdateProfile } from "@/features/auth/hooks/use-update-profile";

import { OnboardingShell } from "@/components/onboarding/onboarding-shell";
import { FormField, FormInput } from "@/components/ui/form-field";
import { OnboardingButton } from "@/components/ui/onboarding-button";

export default function ProfilePage() {
  const router = useRouter();

  const { data: user } = useCurrentUser();
  const mutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  // Pre-fill the form with data already saved in Supabase so the user
  // sees their previous answers when navigating back to this step.
  useEffect(() => {
    if (!user) return;

    reset({
      full_name: user.full_name ?? "",
      phone: user.phone ?? "",
      license_no: user.license_no ?? "",
    });
  }, [user, reset]);

  function onSubmit(data: ProfileInput) {
    // Navigate immediately — the DB update runs in the background.
    router.push(ROUTES.SIGNUP_BROKERAGE);
    mutation.mutate(data);
  }

  return (
    <OnboardingShell step={3}>
      <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
        About You
      </div>

      <h1 className="text-[36px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[42px]">
        A few quick things.
      </h1>

      <p className="mb-8 mt-4 font-serif text-[16px] italic leading-relaxed text-zinc-600">
        We verify every broker before your page goes live. This takes about 30
        seconds.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          label="Your Name"
          error={errors.full_name?.message}
        >
          <FormInput
            {...register("full_name")}
            placeholder="Cameron Free"
          />
        </FormField>

        <FormField
          label="Mobile"
          error={errors.phone?.message}
          hint="For account security only. Never shared."
        >
          <FormInput
            {...register("phone")}
            placeholder="(713) 555-0142"
          />
        </FormField>

        <FormField
          label="Real Estate License #"
          error={errors.license_no?.message}
          hint="We confirm with your state."
        >
          <FormInput
            {...register("license_no")}
            placeholder="123456"
          />
        </FormField>

        <OnboardingButton type="submit">
          Continue →
        </OnboardingButton>
      </form>
    </OnboardingShell>
  );
}
