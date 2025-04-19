import { z } from "zod";

export const AuthenticationSchema = z.object({
  email: z.string().email("Invalid Email").min(2),
  password: z.string().min(2, "Invalid Password"),
});

export type Authentication= z.infer<typeof AuthenticationSchema>;
