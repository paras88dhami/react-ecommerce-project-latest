import { z } from "zod";

export const userSchema = z
  .object({
    email: z.string(),
    password: z
      .string()
      .min(2, "Password too short")
    // .regex(/[A-Z]/, "Must have uppercase letter")
    // .regex(/[a-z]/, "Must have lowercase letter")
    // .regex(/[0-9]/, "Must have a number")
    // .regex(/[@$!%*?&]/, "Must have special character"),

    // confirmPassword: z.string(),
  })
// .superRefine((data, ctx) => {
//   if (data.password !== data.confirmPassword) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Passwords do not match",
//       path: ["confirmPassword"],
//     });
//   }
// });

export type UserInputs = z.infer<typeof userSchema>;
