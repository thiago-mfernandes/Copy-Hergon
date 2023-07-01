import { z } from "zod";
import { RegisterFormSchema } from "../schema/RegisterFormSchema";

// tipagem de dados
export type RegisterFormData = z.infer<typeof RegisterFormSchema>;