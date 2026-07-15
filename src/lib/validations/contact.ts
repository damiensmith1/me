import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters")
    .max(5000),
  // Honeypot field — real users never fill this in. Deliberately unconstrained
  // so a filled-in value still parses; the route handler decides what to do
  // with it (silently accept, so bots don't learn they were detected).
  company: z.string().optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
