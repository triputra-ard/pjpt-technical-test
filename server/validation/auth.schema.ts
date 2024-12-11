import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username must be a string",
    })
    .min(1, "Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(50, "Username must not exceed 50 characters"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(1, "Password is required")
    .min(4, "Password must be at least 4 characters")
    .max(50, "Password must not exceed 50 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;
