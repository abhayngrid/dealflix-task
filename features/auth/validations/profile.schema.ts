import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().min(2),

  phone: z.string().min(10),

  license_no: z.string().min(3),
});

export type ProfileInput = z.infer<typeof profileSchema>;
