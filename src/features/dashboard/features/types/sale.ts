import { z } from "zod";

export const SaleSchema = z.object({
  id: z.string().uuid(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  netAmount: z.number().nonnegative(),
  categoryBreakdown: z.object({
    medicine: z.number().nonnegative(),
    general: z.number().nonnegative(),
  }),
});

export type Sale = z.infer<typeof SaleSchema>;
