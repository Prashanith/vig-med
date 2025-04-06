import { z } from "zod";
import { ProductSchema } from "./product";

export const InvoiceSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  invoiceNumber: z.string().min(1, { message: "Invoice Number is required" }),
  totalAmount: z.number().default(0),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  products: z.array(ProductSchema),
});

export type Invoice = z.infer<typeof InvoiceSchema>;
