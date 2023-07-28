import { z } from "zod";

export const areaSchema = z.object({
  label: z.string(),
  value: z.string(),
});