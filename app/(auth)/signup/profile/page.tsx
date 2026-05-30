"use client";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ROUTES } from "@/constants/routes";
import {
  profileSchema,
  ProfileInput,
} from "@/features/auth/validations/profile.schema";

import { useUpdateProfile } from "@/features/auth/hooks/use-update-profile";

export default function ProfilePage() {
  const router = useRouter();

  const mutation = useUpdateProfile();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
  });

  async function onSubmit(data: ProfileInput) {
    await mutation.mutateAsync(data);

    router.push(ROUTES.SIGNUP_BROKERAGE);
  }
  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="h-[60px] border-b border-black/10 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="flex items-end">
            <div className="mb-[2px] mr-1 h-[10px] w-[10px] rounded-full bg-[#7ac943]" />

            <span className="text-[26px] font-bold tracking-[-0.045em]">
              dealflix
            </span>
          </div>

          <div className="ml-auto text-xs text-zinc-500">
            <span className="font-bold text-black">3</span> of 6
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="h-[2px] bg-black/5">
        <div className="h-full w-[50%] bg-black" />
      </div>

      {/* Content */}
      <main className="flex min-h-[calc(100vh-62px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-[480px]">
          <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">
            About You
          </div>

          <h1 className="text-[36px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[42px]">
            A few quick things.
          </h1>

          <p className="mb-8 mt-4 font-serif text-[16px] italic leading-relaxed text-zinc-600">
            We verify every broker before your page goes live. This takes about
            30 seconds.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                Your Name
              </label>

              <input
                {...register("full_name")}
                placeholder="Cameron Free"
                className="
                h-14
                w-full
                rounded-xl
                border
                border-black/10
                bg-white
                px-4
                text-base
                outline-none
                transition
                focus:border-black
              "
              />

              {errors.full_name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.full_name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                Mobile
              </label>

              <input
                {...register("phone")}
                placeholder="(713) 555-0142"
                className="
                h-14
                w-full
                rounded-xl
                border
                border-black/10
                bg-white
                px-4
                text-base
                outline-none
                transition
                focus:border-black
              "
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}

              <p className="mt-2 text-xs text-zinc-500">
                For account security only. Never shared.
              </p>
            </div>

            {/* License */}
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                Real Estate License #
              </label>

              <input
                {...register("license_no")}
                placeholder="123456"
                className="
                h-14
                w-full
                rounded-xl
                border
                border-black/10
                bg-white
                px-4
                text-base
                outline-none
                transition
                focus:border-black
              "
              />

              {errors.license_no && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.license_no.message}
                </p>
              )}

              <p className="mt-2 text-xs text-zinc-500">
                We confirm with your state.
              </p>
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="
              flex
              h-14
              w-full
              items-center
              justify-center
              rounded-full
              bg-black
              text-[15px]
              font-bold
              text-white
              transition
              hover:bg-zinc-800
            "
            >
              {mutation.isPending ? "Saving..." : "Continue →"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
