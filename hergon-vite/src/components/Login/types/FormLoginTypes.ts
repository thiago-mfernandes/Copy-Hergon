import { z } from "zod";
import { FormLoginSchema } from "../schema/FormLoginSchema";

export type FormLoginTypes = z.infer<typeof FormLoginSchema>;