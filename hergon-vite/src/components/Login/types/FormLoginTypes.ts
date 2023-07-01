import { z } from "zod";
import { FormLoginSchema } from "../schema/FormLoginSchema";

export type FormLoginData = z.infer<typeof FormLoginSchema>;