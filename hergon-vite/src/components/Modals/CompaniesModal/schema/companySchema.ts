import { z } from "zod";

export const companySchema = z.object({
  companyName: z.string().min(2, "O nome da empresa é obrigatório e deve conter no mínimo 2 caracteres.")
});