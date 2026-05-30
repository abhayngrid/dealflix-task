import { z } from "zod";

export const serverEnv = z
  .object({
    RESEND_API_KEY: z.string().min(1),

    EMAIL_FROM: z.string().email(),
  })
  .parse({
    RESEND_API_KEY: process.env.RESEND_API_KEY,

    EMAIL_FROM: process.env.EMAIL_FROM,
  });
