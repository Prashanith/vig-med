import { z } from "zod";
import { ProductSchema } from "./product";

export const BillSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  invoiceNumber: z.string().min(1, { message: "Invoice Number is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  products: z.array(ProductSchema),
});

export type Bill = z.infer<typeof BillSchema>;
