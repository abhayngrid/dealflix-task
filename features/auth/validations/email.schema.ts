import { z } from "zod";

export const emailSchema = z.object({
  email: z.email("Please enter a valid email"),
});

export type EmailInput = z.infer<typeof emailSchema>;
