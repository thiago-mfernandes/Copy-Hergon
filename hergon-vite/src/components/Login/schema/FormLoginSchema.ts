import { z } from "zod";

export const FormLoginSchema = z.object({
  userEmail: z.string().min(6, 'Digite um email válido.'),
  userPassword: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres.')
});