import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  userEmail: z.string().min(6, 'Digite um email válido.'),
});