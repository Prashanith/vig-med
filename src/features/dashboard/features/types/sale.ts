import { z } from "zod";

export const SaleSchema = z
  .object({
    id: z.string().uuid(),
    date: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
    netAmount: z
      .number()
      .min(0, { message: "Net amount must be non-negative" }),
    categoryBreakdown: z.object({
      medicine: z.number().min(0, { message: "Must be non-negative" }),
      general: z.number().min(0, { message: "Must be non-negative" }),
    }),
  })
  .superRefine((data, ctx) => {
    const { medicine, general } = data.categoryBreakdown;
    const total = medicine + general;
    if (data.netAmount !== total) {
      ctx.addIssue({
        path: ["netAmount"],
        code: z.ZodIssueCode.custom,
        message: "Net amount must equal sum of category breakdown",
      });
    }
  });

export type Sale = z.infer<typeof SaleSchema>;
