import { z } from "zod";

// Schema do select/options das empresas
export const companiesSchema = z.object({
  label: z.string(),
  value: z.string(),
});