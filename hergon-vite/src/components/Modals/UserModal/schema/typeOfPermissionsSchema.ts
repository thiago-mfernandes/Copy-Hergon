import { z } from "zod";

// Schema dos tipos de permissoes
export const typeOfPermissionsSchema = z.object({
  label: z.string(),
  value: z.string(),
});