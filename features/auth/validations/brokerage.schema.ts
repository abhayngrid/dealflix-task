import { z } from "zod";

export const brokerageSchema = z.object({
  brokerage_id: z.string(),
  brokerage_name: z.string(),
});

export type BrokerageInput = z.infer<typeof brokerageSchema>;
