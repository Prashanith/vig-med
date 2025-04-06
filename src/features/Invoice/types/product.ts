import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number().min(1),
  name: z.string().min(2),
  hsn: z.string().min(2),
  batchNumber: z.string().min(2),
  expiry: z.string().min(2),
  mrp: z.number().default(0),
  quantity: z.number().min(1).default(1),
  freeQuantity: z.number().default(0),
  rate: z.number().default(0),
  amount: z.number().default(0),
  discount: z.number().default(0),
  cgst: z.number().default(0),
  sgst: z.number().default(0),
});

export type Product = z.infer<typeof ProductSchema>;
