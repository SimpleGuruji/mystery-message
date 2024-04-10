import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters long.")
  .max(30, "Username must not exceed 30 characters in length.")
  .regex(
    /^[a-zA-Z0-9_]{4,20}$/,
    "Username must not contain special character other than underscore."
  );

export const signUpSchema = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "Email is invalid." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
});
