import { z } from "zod";

export const departmentSchema = z.object({
  label: z.string(),
  value: z.string(),
});