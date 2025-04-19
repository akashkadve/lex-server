import { z } from "zod";

const userSchema = z.object({
  fullName: z
    .string({ required_error: "Full Name is required." })
    .trim()
    .min(3, { message: "Full Name must be at least 3 characters." })
    .max(255, { message: "Full Name must not be more than 255 characters." }),

  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email({ message: "Invalid email address." }),
  phone: z
    .string({ required_error: "Phone Number is required." })
    .trim()
    .refine((value) => /^\d{10}$/.test(value), {
      message: "Phone must be exactly 10 digits and contain only numbers.",
    }),
  subject: z
    .string({ required_error: "subject is required." })
    .trim()
    .min(3, { message: "subject must be at least 3 characters." })
    .max(255, { message: "subject must not be more than 255 characters." }),

  message: z
    .string({ required_error: "Message is required." })
    .trim()
    .min(3, { message: "Message must be at least 3 characters." })
    .max(255, { message: "Message must not be more than 255 characters." }),
});

export default userSchema;
